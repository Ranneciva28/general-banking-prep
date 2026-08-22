(() => {
  const PROGRESS_KEY='generalBankingModuleProgressV1';
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));
  let overlay=null,fill=null,valueEl=null,stageEl=null;

  function ensureOverlay(){
    if(overlay)return overlay;
    const style=document.createElement('style');
    style.textContent=`
      #gbpGenerateProgress{position:fixed;inset:0;z-index:100000;background:rgba(15,23,42,.55);backdrop-filter:blur(3px);display:none;align-items:center;justify-content:center;padding:20px;font-family:inherit}
      #gbpGenerateProgress.show{display:flex}#gbpGenerateProgress .gp-card{width:min(480px,100%);background:#fff;border-radius:20px;padding:22px;box-shadow:0 24px 70px rgba(15,23,42,.24)}
      #gbpGenerateProgress .gp-row{display:flex;gap:12px;align-items:center}.gp-copy{flex:1}.gp-copy h3{margin:0 0 5px;font-size:17px;color:#0f172a}.gp-copy p{margin:0;color:#64748b;font-size:12px}
      #gbpGenerateProgress .gp-value{font-size:13px;font-weight:900;color:#2454e6}.gp-track{height:9px;background:#e8edf5;border-radius:999px;overflow:hidden;margin-top:16px}.gp-fill{height:100%;width:0;background:#2454e6;border-radius:inherit;transition:width .16s ease}.gp-stage{margin-top:9px;color:#475569;font-size:12px}`;
    document.head.appendChild(style);
    overlay=document.createElement('div');overlay.id='gbpGenerateProgress';overlay.setAttribute('role','status');overlay.setAttribute('aria-live','polite');
    overlay.innerHTML=`<div class="gp-card"><div class="gp-row"><div class="gp-copy"><h3>Menyiapkan 25 soal baru</h3><p>Memilih soal unik dan memblokir near-duplicate.</p></div><div class="gp-value">0%</div></div><div class="gp-track"><div class="gp-fill"></div></div><div class="gp-stage">Memilih kandidat…</div></div>`;
    document.body.appendChild(overlay);fill=overlay.querySelector('.gp-fill');valueEl=overlay.querySelector('.gp-value');stageEl=overlay.querySelector('.gp-stage');return overlay;
  }
  function progress(n,stage){ensureOverlay();n=Math.max(0,Math.min(100,Math.round(n)));fill.style.width=`${n}%`;valueEl.textContent=`${n}%`;if(stage)stageEl.textContent=stage}
  function show(){ensureOverlay();overlay.classList.add('show');document.documentElement.style.overflow='hidden';progress(12,'Memilih 25 kandidat unik…')}
  function hide(){if(overlay)overlay.classList.remove('show');document.documentElement.style.overflow=''}
  function toast(msg){const el=document.getElementById('toast');if(!el)return;el.textContent=msg;el.classList.remove('hidden');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.add('hidden'),3500)}
  function clearModuleProgress(mid){
    try{const all=JSON.parse(localStorage.getItem(PROGRESS_KEY)||'{}')||{};delete all[String(mid)];localStorage.setItem(PROGRESS_KEY,JSON.stringify(all))}catch(e){localStorage.removeItem(PROGRESS_KEY)}
    try{window.GBPApp?.clearModuleProgress?.(Number(mid))}catch(e){}
  }
  function moduleIdFromCurrentView(){
    const name=document.getElementById('moduleTag')?.textContent?.trim();if(!name)return null;
    const q=(window.QUESTION_BANK||[]).find(x=>x.moduleName===name);return q?Number(q.moduleId):null;
  }
  const nextPaint=()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));

  async function runGenerate(mid,button){
    const api=window.GBPDatabaseQuestionBank,app=window.GBPApp;
    if(!api?.reserveNew||!app?.startModule){toast('Question generator belum siap. Refresh sekali lalu coba lagi.');return}
    const oldText=button?.textContent||'↻ Generate New Questions';if(button){button.disabled=true;button.textContent='Generating…'}
    show();
    try{
      const [active]=await Promise.all([api.reserveNew(Number(mid)),sleep(220)]);
      progress(72,'Menerapkan set baru tanpa reload…');clearModuleProgress(mid);
      window.GBPAnalytics?.track?.('generate_questions',{moduleId:Number(mid),questionCount:active.length,meta:{engine:api.engine||'v26-indexed-lite',replaceAll25:true,inPlaceRefresh:true}});
      app.startModule(Number(mid));await nextPaint();window.scrollTo({top:0,behavior:'auto'});
      progress(100,'Selesai. Tetap di module yang sama.');await sleep(150);hide();
      if(button){button.disabled=false;button.textContent=oldText}injectGenerator();toast('25 soal baru sudah aktif. Tidak ada reload halaman.');
    }catch(err){console.error(err);hide();if(button){button.disabled=false;button.textContent=oldText}toast('Belum tersedia 25 soal baru yang benar-benar berbeda. Coba generate kembali.')}
  }

  function injectGenerator(){
    const quiz=document.getElementById('quizView');if(!quiz?.classList.contains('active'))return;
    const card=quiz.querySelector('.module-info-card'),mid=moduleIdFromCurrentView(),api=window.GBPDatabaseQuestionBank;if(!card||!mid||!api)return;
    const info=api.bankInfo?.(mid)||{};let box=card.querySelector('.quiz-generate-box');if(!box){box=document.createElement('div');box.className='quiz-generate-box';card.appendChild(box)}
    const sig=`${mid}:${info.active||25}:${info.candidates||api.bankSize||0}`;if(box.dataset.sig===sig)return;box.dataset.sig=sig;
    box.innerHTML=`<div class="quiz-generate-copy"><span>QUESTION BANK</span><strong>Butuh set soal baru?</strong><small>Ganti 25 soal aktif dengan 25 soal berbeda tanpa reload halaman.</small></div><button type="button" class="quiz-generate-btn">↻ Generate New Questions</button><div class="quiz-bank-meta">${Number(info.active||25).toLocaleString('id-ID')} aktif · ${Number(info.candidates||api.bankSize||0).toLocaleString('id-ID')} kandidat module</div>`;
  }

  document.addEventListener('click',e=>{
    const button=e.target.closest?.('.quiz-generate-btn');if(!button)return;
    e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();const mid=moduleIdFromCurrentView();
    if(!mid){toast('Module tidak terdeteksi.');return}if(!confirm('Ganti seluruh 25 soal aktif dengan 25 soal baru yang berbeda?'))return;runGenerate(mid,button);
  },true);

  document.addEventListener('DOMContentLoaded',()=>{
    injectGenerator();
    const tag=document.getElementById('moduleTag');if(tag)new MutationObserver(()=>requestAnimationFrame(injectGenerator)).observe(tag,{childList:true,characterData:true,subtree:true});
    document.addEventListener('click',e=>{if(e.target.closest('[data-module-start],#startQuizBtn,[data-view="quizView"]'))setTimeout(injectGenerator,40)},{passive:true});
  },{once:true});

  window.GBPGenerateProgress={show,hide,set:progress,run:runGenerate,refresh:injectGenerator};
})();