(() => {
  const PROGRESS_KEY='generalBankingModuleProgressV1';
  let overlay=null,fill=null,percentEl=null,stageEl=null,titleEl=null,timer=null,current=0;
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));

  function ensureOverlay(){
    if(overlay)return overlay;
    const style=document.createElement('style');
    style.textContent=`
      #gbpGenerateProgress{position:fixed;inset:0;z-index:100000;background:rgba(15,23,42,.64);backdrop-filter:blur(5px);display:none;align-items:center;justify-content:center;padding:20px;font-family:inherit}
      #gbpGenerateProgress.show{display:flex}
      #gbpGenerateProgress .gp-card{width:min(520px,100%);background:#fff;border:1px solid rgba(148,163,184,.28);border-radius:22px;padding:24px;box-shadow:0 30px 90px rgba(15,23,42,.28)}
      #gbpGenerateProgress .gp-top{display:flex;align-items:center;gap:14px;margin-bottom:18px}
      #gbpGenerateProgress .gp-icon{width:46px;height:46px;border-radius:14px;background:#eef4ff;color:#2454e6;display:grid;place-items:center;font-size:22px;font-weight:900;flex:0 0 auto}
      #gbpGenerateProgress .gp-copy{min-width:0;flex:1}
      #gbpGenerateProgress .gp-copy h3{margin:0 0 5px;font-size:18px;line-height:1.3;color:#0f172a}
      #gbpGenerateProgress .gp-copy p{margin:0;color:#64748b;font-size:12px;line-height:1.45}
      #gbpGenerateProgress .gp-value{font-size:13px;font-weight:900;color:#2454e6;min-width:40px;text-align:right}
      #gbpGenerateProgress .gp-track{height:10px;background:#e8edf5;border-radius:999px;overflow:hidden;position:relative}
      #gbpGenerateProgress .gp-fill{height:100%;width:0%;background:linear-gradient(90deg,#2454e6,#4f7cff);border-radius:inherit;transition:width .28s ease}
      #gbpGenerateProgress .gp-stage{margin-top:10px;color:#475569;font-size:12px;min-height:18px}
      #gbpGenerateProgress.done .gp-icon{background:#ecfdf3;color:#059669}
      #gbpGenerateProgress.done .gp-value{color:#059669}
      #gbpGenerateProgress.done .gp-fill{background:linear-gradient(90deg,#10b981,#34d399)}
      @media(max-width:640px){#gbpGenerateProgress .gp-card{padding:20px;border-radius:18px}#gbpGenerateProgress .gp-copy h3{font-size:16px}}
    `;
    document.head.appendChild(style);

    overlay=document.createElement('div');
    overlay.id='gbpGenerateProgress';
    overlay.setAttribute('role','status');
    overlay.setAttribute('aria-live','polite');
    overlay.setAttribute('aria-busy','true');
    overlay.innerHTML=`
      <div class="gp-card">
        <div class="gp-top">
          <div class="gp-icon">↻</div>
          <div class="gp-copy">
            <h3>Generating new questions, please wait....</h3>
            <p>We’re preparing 25 new questions and checking for duplicate patterns.</p>
          </div>
          <div class="gp-value">0%</div>
        </div>
        <div class="gp-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
          <div class="gp-fill"></div>
        </div>
        <div class="gp-stage">Starting question generator…</div>
      </div>`;
    document.body.appendChild(overlay);
    fill=overlay.querySelector('.gp-fill');
    percentEl=overlay.querySelector('.gp-value');
    stageEl=overlay.querySelector('.gp-stage');
    titleEl=overlay.querySelector('.gp-copy h3');
    return overlay;
  }

  function stageFor(p){
    if(p<24)return 'Selecting 25 distinct questions…';
    if(p<48)return 'Checking duplicate and near-duplicate patterns…';
    if(p<70)return 'Validating question quality and answer choices…';
    if(p<90)return 'Replacing the previous 25-question set…';
    return 'Finalizing your new question set…';
  }

  function setProgress(value,stage){
    ensureOverlay();
    current=Math.max(0,Math.min(100,Math.round(value)));
    fill.style.width=`${current}%`;
    percentEl.textContent=`${current}%`;
    stageEl.textContent=stage||stageFor(current);
    overlay.querySelector('.gp-track')?.setAttribute('aria-valuenow',String(current));
  }

  function showProgress(){
    ensureOverlay();
    clearInterval(timer);
    overlay.classList.remove('done');
    overlay.classList.add('show');
    overlay.setAttribute('aria-busy','true');
    document.documentElement.style.overflow='hidden';
    titleEl.textContent='Generating new questions, please wait....';
    current=6;
    setProgress(current,'Starting question generator…');
    timer=setInterval(()=>{
      if(current>=88)return;
      const step=current<35?5:current<65?3:2;
      setProgress(Math.min(88,current+step));
    },180);
  }

  async function finishProgress(){
    clearInterval(timer);
    setProgress(96,'Saving the new question set…');
    await sleep(220);
    overlay.classList.add('done');
    overlay.setAttribute('aria-busy','false');
    titleEl.textContent='25 new questions are ready';
    setProgress(100,'Done. Opening the refreshed module…');
    await sleep(420);
  }

  function hideProgress(){
    clearInterval(timer);
    if(overlay)overlay.classList.remove('show','done');
    document.documentElement.style.overflow='';
  }

  function toast(msg){
    const el=document.getElementById('toast');
    if(!el)return;
    el.textContent=msg;el.classList.remove('hidden');
    clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.add('hidden'),4500);
  }

  function clearModuleProgress(mid){
    try{
      const all=JSON.parse(localStorage.getItem(PROGRESS_KEY)||'{}')||{};
      delete all[String(mid)];
      localStorage.setItem(PROGRESS_KEY,JSON.stringify(all));
    }catch(e){localStorage.removeItem(PROGRESS_KEY);}
    try{window.GBPApp?.clearModuleProgress?.(mid);}catch(e){}
  }

  function moduleIdFromCurrentView(){
    const name=document.getElementById('moduleTag')?.textContent?.trim();
    if(!name)return null;
    const q=(window.QUESTION_BANK||[]).find(x=>x.moduleName===name);
    return q?Number(q.moduleId):null;
  }

  async function runGenerate(mid,button){
    const api=window.GBPDatabaseQuestionBank;
    if(!api?.reserveNew){toast('Question generator belum siap. Refresh halaman lalu coba lagi.');return;}
    const oldText=button?.textContent||'Generate Questions';
    if(button){button.disabled=true;button.textContent='Generating…';}
    showProgress();
    const minimum=sleep(1350);
    try{
      const active=await api.reserveNew(mid);
      clearModuleProgress(mid);
      try{window.GBPAnalytics?.track?.('generate_questions',{moduleId:mid,questionCount:active.length,meta:{databaseBank:true,engine:'v25-distinct-root',replaceAll25:true,progressNotification:true}});}catch(e){}
      await minimum;
      await finishProgress();
      sessionStorage.setItem('gbpAutoOpenModule',String(mid));
      sessionStorage.setItem('gbpGenerationToast','25 soal lama sudah diganti penuh dengan 25 soal baru yang berbeda.');
      location.reload();
    }catch(err){
      console.error(err);
      await sleep(300);
      hideProgress();
      if(button){button.disabled=false;button.textContent=oldText;}
      toast('Belum tersedia 25 soal baru yang benar-benar berbeda. Coba generate kembali.');
    }
  }

  document.addEventListener('click',e=>{
    const button=e.target.closest?.('.quiz-generate-btn');
    if(!button)return;
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    const mid=moduleIdFromCurrentView();
    if(!mid){toast('Module tidak terdeteksi. Refresh halaman lalu coba lagi.');return;}
    if(!confirm('Ganti seluruh 25 soal aktif dengan 25 soal baru yang berbeda?'))return;
    runGenerate(mid,button);
  },true);

  window.GBPGenerateProgress={show:showProgress,set:setProgress,finish:finishProgress,hide:hideProgress};
})();