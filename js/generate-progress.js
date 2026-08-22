(() => {
  const PROGRESS_KEY='generalBankingModuleProgressV1';
  let overlay=null,fill=null,percentEl=null,stageEl=null,titleEl=null;
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));

  function ensureOverlay(){
    if(overlay)return overlay;
    const style=document.createElement('style');
    style.textContent=`
      #gbpGenerateProgress{position:fixed;inset:0;z-index:100000;background:rgba(15,23,42,.58);backdrop-filter:blur(4px);display:none;align-items:center;justify-content:center;padding:20px;font-family:inherit}
      #gbpGenerateProgress.show{display:flex}
      #gbpGenerateProgress .gp-card{width:min(500px,100%);background:#fff;border:1px solid rgba(148,163,184,.24);border-radius:20px;padding:22px;box-shadow:0 24px 70px rgba(15,23,42,.25)}
      #gbpGenerateProgress .gp-top{display:flex;align-items:center;gap:14px;margin-bottom:16px}
      #gbpGenerateProgress .gp-icon{width:44px;height:44px;border-radius:13px;background:#eef4ff;color:#2454e6;display:grid;place-items:center;font-size:21px;font-weight:900}
      #gbpGenerateProgress .gp-copy{min-width:0;flex:1}
      #gbpGenerateProgress .gp-copy h3{margin:0 0 4px;font-size:17px;color:#0f172a}
      #gbpGenerateProgress .gp-copy p,#gbpGenerateProgress .gp-stage{margin:0;color:#64748b;font-size:12px;line-height:1.45}
      #gbpGenerateProgress .gp-value{font-size:13px;font-weight:900;color:#2454e6;min-width:40px;text-align:right}
      #gbpGenerateProgress .gp-track{height:9px;background:#e8edf5;border-radius:999px;overflow:hidden}
      #gbpGenerateProgress .gp-fill{height:100%;width:0;background:linear-gradient(90deg,#2454e6,#4f7cff);border-radius:inherit;transition:width .16s ease}
      #gbpGenerateProgress .gp-stage{margin-top:9px;min-height:17px}
      #gbpGenerateProgress.done .gp-icon{background:#ecfdf3;color:#059669}
      #gbpGenerateProgress.done .gp-value{color:#059669}
    `;
    document.head.appendChild(style);
    overlay=document.createElement('div');
    overlay.id='gbpGenerateProgress';
    overlay.setAttribute('role','status');
    overlay.setAttribute('aria-live','polite');
    overlay.innerHTML=`<div class="gp-card"><div class="gp-top"><div class="gp-icon">↻</div><div class="gp-copy"><h3>Menyiapkan 25 soal baru…</h3><p>Memilih set baru dan mengecek substansi.</p></div><div class="gp-value">0%</div></div><div class="gp-track"><div class="gp-fill"></div></div><div class="gp-stage">Memulai generator…</div></div>`;
    document.body.appendChild(overlay);
    fill=overlay.querySelector('.gp-fill');
    percentEl=overlay.querySelector('.gp-value');
    stageEl=overlay.querySelector('.gp-stage');
    titleEl=overlay.querySelector('.gp-copy h3');
    return overlay;
  }

  function setProgress(value,stage){
    ensureOverlay();
    const p=Math.max(0,Math.min(100,Math.round(value)));
    fill.style.width=`${p}%`;
    percentEl.textContent=`${p}%`;
    if(stage)stageEl.textContent=stage;
  }

  function showProgress(){
    ensureOverlay();
    overlay.classList.remove('done');
    overlay.classList.add('show');
    document.documentElement.style.overflow='hidden';
    titleEl.textContent='Menyiapkan 25 soal baru…';
    setProgress(18,'Memilih set soal baru…');
  }

  function hideProgress(){
    overlay?.classList.remove('show','done');
    document.documentElement.style.overflow='';
  }

  function toast(msg){
    const el=document.getElementById('toast');
    if(!el)return;
    el.textContent=msg;
    el.classList.remove('hidden');
    clearTimeout(toast.t);
    toast.t=setTimeout(()=>el.classList.add('hidden'),3200);
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
    try{
      setProgress(42,'Membandingkan struktur dan learning objective…');
      const activeSlots=await api.reserveNew(mid);
      const active=(window.QUESTION_BANK||[]).filter(q=>Number(q.moduleId)===Number(mid));
      clearModuleProgress(mid);
      setProgress(82,'Memasang 25 soal yang benar-benar berbeda…');
      try{window.GBPAnalytics?.track?.('generate_questions',{moduleId:mid,questionCount:active.length||activeSlots.length,meta:{databaseBank:true,engine:'v26-distinct-structure',replaceAll25:true,noReload:true,semanticDiversity:true,numberOnlyChangesBlocked:true}});}catch(e){}
      await sleep(120);
      const app=window.GBPApp;
      if(app?.startModule){
        app.startModule(mid);
        await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
        overlay.classList.add('done');
        titleEl.textContent='25 soal baru siap';
        setProgress(100,'Selesai. Angka saja tidak dihitung sebagai soal baru.');
        await sleep(180);
        hideProgress();
        window.scrollTo({top:0,behavior:'smooth'});
        toast('25 soal baru aktif dengan struktur dan substansi berbeda.');
      }else{
        sessionStorage.setItem('gbpAutoOpenModule',String(mid));
        sessionStorage.setItem('gbpGenerationToast','25 soal baru sudah aktif.');
        location.reload();
      }
    }catch(err){
      console.error(err);
      hideProgress();
      if(button){button.disabled=false;button.textContent=oldText;}
      toast('Belum tersedia 25 soal baru yang benar-benar berbeda secara substansi.');
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

  window.GBPGenerateProgress={show:showProgress,set:setProgress,hide:hideProgress};
})();