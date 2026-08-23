(() => {
  const PROGRESS_KEY='generalBankingModuleProgressV1';
  let overlay=null,fill=null,percentEl=null,stageEl=null,titleEl=null;
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));
  const SUPA_URL='https://pnisrktkkbzspolkfkag.supabase.co';
  const SUPA_KEY='sb_publishable_ClLcjnxymypzS2O6x1TzwA_c9y7-j1Y';

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
    overlay=document.createElement('div');overlay.id='gbpGenerateProgress';overlay.setAttribute('role','status');overlay.setAttribute('aria-live','polite');
    overlay.innerHTML=`<div class="gp-card"><div class="gp-top"><div class="gp-icon">↻</div><div class="gp-copy"><h3>Menyiapkan 25 soal baru…</h3><p>Memilih dari bank unik module ini.</p></div><div class="gp-value">0%</div></div><div class="gp-track"><div class="gp-fill"></div></div><div class="gp-stage">Memulai generator…</div></div>`;
    document.body.appendChild(overlay);fill=overlay.querySelector('.gp-fill');percentEl=overlay.querySelector('.gp-value');stageEl=overlay.querySelector('.gp-stage');titleEl=overlay.querySelector('.gp-copy h3');return overlay;
  }
  function setProgress(value,stage){ensureOverlay();const p=Math.max(0,Math.min(100,Math.round(value)));fill.style.width=`${p}%`;percentEl.textContent=`${p}%`;if(stage)stageEl.textContent=stage;}
  function showProgress(){ensureOverlay();overlay.classList.remove('done');overlay.classList.add('show');document.documentElement.style.overflow='hidden';titleEl.textContent='Menyiapkan 25 soal baru…';setProgress(18,'Mengecek soal yang belum pernah muncul…');}
  function hideProgress(){overlay?.classList.remove('show','done');document.documentElement.style.overflow='';}
  function toast(msg){const el=document.getElementById('toast');if(!el)return;el.textContent=msg;el.classList.remove('hidden');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.add('hidden'),3600);}
  function setButtonReady(button,text){if(!button)return;button.disabled=false;button.textContent=text||'↻ Generate 25 Soal Baru';button.removeAttribute('aria-busy');}
  function announceBankUpdate(mid,info){try{document.dispatchEvent(new CustomEvent('gbp:bank-updated',{detail:{moduleId:Number(mid),info:info||null}}));}catch(e){}}
  const norm=s=>String(s??'').toLocaleLowerCase('id-ID').replace(/[^a-z0-9à-öø-ÿ]+/giu,' ').replace(/\s+/g,' ').trim();
  const rootKey=q=>String(q?.rootQuestionId||q?.baseId||q?.id||'');
  function remoteConceptKey(q,api){
    const explicit=String(q?.conceptSignature||'');if(explicit)return norm(explicit);
    const structure=api?.structureKey?.(q)||norm(q?.question||'');
    return `${norm(q?.answer||'')}|${structure}`;
  }
  async function syncGeneratedV28(mid,questions,api,attempt=1){
    if(!api?.clientId||!Array.isArray(questions)||!questions.length)return false;
    const payload=questions.slice(0,25).map(q=>({
      question:q.question,
      answer:q.answer,
      rootKey:rootKey(q),
      conceptKey:remoteConceptKey(q,api),
      structureKey:api?.structureKey?.(q)||norm(q.question)
    }));
    try{
      const r=await fetch(`${SUPA_URL}/rest/v1/rpc/gbp_question_register_batch_v28`,{
        method:'POST',cache:'no-store',headers:{'Content-Type':'application/json','apikey':SUPA_KEY},
        body:JSON.stringify({p_client_id:api.clientId,p_module_id:Number(mid),p_questions:payload,p_requested_count:payload.length,p_source_reason:'generate'}),
        keepalive:true
      });
      if(!r.ok)throw new Error(await r.text()||'v28-sync-failed');
      const data=await r.json();
      try{document.dispatchEvent(new CustomEvent('gbp:bank-sync',{detail:{moduleId:Number(mid),ok:true,data}}));}catch(e){}
      return true;
    }catch(err){
      console.warn('V28 generated-question sync failed',err);
      if(attempt<2){await sleep(850);return syncGeneratedV28(mid,questions,api,attempt+1);}
      try{document.dispatchEvent(new CustomEvent('gbp:bank-sync',{detail:{moduleId:Number(mid),ok:false}}));}catch(e){}
      return false;
    }
  }

  function clearModuleProgress(mid){try{const all=JSON.parse(localStorage.getItem(PROGRESS_KEY)||'{}')||{};delete all[String(mid)];localStorage.setItem(PROGRESS_KEY,JSON.stringify(all));}catch(e){localStorage.removeItem(PROGRESS_KEY);}try{window.GBPApp?.clearModuleProgress?.(mid);}catch(e){}}
  function moduleIdFromCurrentView(){const name=document.getElementById('moduleTag')?.textContent?.trim();if(!name)return null;const q=(window.QUESTION_BANK||[]).find(x=>x.moduleName===name);return q?Number(q.moduleId):null;}

  function wordingDiversity(questions){
    const material=questions.filter(q=>q?.wordingFamily);if(material.length<8)return{ok:true,material:material.length,maxFamily:0,families:0};
    const counts=new Map();for(const q of material){const f=String(q.wordingFamily||'other');counts.set(f,(counts.get(f)||0)+1);}
    const maxFamily=Math.max(...counts.values(),0),families=counts.size,allowed=Math.max(6,Math.ceil(material.length*.36));
    return{ok:maxFamily<=allowed,material:material.length,maxFamily,families,allowed};
  }

  async function runGenerate(mid,button){
    const api=window.GBPDatabaseQuestionBank;if(!api?.reserveNew){toast('Question generator belum siap. Refresh halaman lalu coba lagi.');return;}
    const before=api.bankInfo?.(mid)||{remaining:0,bankSize:0,maxBank:500};
    if(Number(before.remaining)<25){toast('Tersisa kurang dari 25 soal unik. Generate baru tidak tersedia untuk module ini.');return;}
    const oldText=button?.textContent||'↻ Generate 25 Soal Baru';
    if(button){button.disabled=true;button.textContent='Generating 25…';button.setAttribute('aria-busy','true');}
    showProgress();
    try{
      setProgress(40,'Membandingkan learning objective, struktur, dan substansi…');
      const activeSlots=await api.reserveNew(mid);
      const active=(window.QUESTION_BANK||[]).filter(q=>Number(q.moduleId)===Number(mid));
      const diversity=wordingDiversity(active);if(!diversity.ok)console.warn('Wording diversity warning',diversity);
      clearModuleProgress(mid);setProgress(82,'Memasang tepat 25 soal baru…');
      const after=api.bankInfo?.(mid)||before;

      announceBankUpdate(mid,after);
      // Remote history is best-effort and never blocks the UI. Local V28 history
      // has already been committed by reserveNew before this point.
      void syncGeneratedV28(mid,active,api);

      try{window.GBPAnalytics?.track?.('generate_questions',{moduleId:mid,questionCount:active.length||activeSlots.length,meta:{engine:'v28-honest-500',replaceAll25:true,noReload:true,bankLimit:500,bankSize:after.bankSize,remaining:after.remaining,numberOnlyChangesBlocked:true,semanticDiversity:true,remoteTracking:'v28'}});}catch(e){}
      await sleep(100);
      const app=window.GBPApp;
      if(app?.startModule){
        app.startModule(mid);await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
        announceBankUpdate(mid,after);setButtonReady(button,oldText);
        overlay.classList.add('done');titleEl.textContent='25 soal baru siap';setProgress(100,`${after.remaining} soal unik masih belum pernah muncul.`);await sleep(170);hideProgress();window.scrollTo({top:0,behavior:'smooth'});
        toast(`25 soal baru aktif · ${after.remaining} soal unik masih tersedia.`);
      }else{
        setButtonReady(button,oldText);sessionStorage.setItem('gbpAutoOpenModule',String(mid));sessionStorage.setItem('gbpGenerationToast','25 soal baru sudah aktif.');location.reload();
      }
    }catch(err){
      console.error(err);hideProgress();setButtonReady(button,oldText);
      const info=api.bankInfo?.(mid);announceBankUpdate(mid,info);
      toast(info&&info.remaining<25?'Bank soal unik module ini sudah tidak punya 25 soal baru lagi.':'Belum tersedia 25 soal baru yang cukup berbeda secara substansi.');
    }
  }

  document.addEventListener('click',e=>{
    const button=e.target.closest?.('.quiz-generate-btn');if(!button)return;
    e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
    const mid=moduleIdFromCurrentView();if(!mid){toast('Module tidak terdeteksi. Refresh halaman lalu coba lagi.');return;}
    const info=window.GBPDatabaseQuestionBank?.bankInfo?.(mid)||{remaining:0,bankSize:0};
    if(info.remaining<25){toast('Tersisa kurang dari 25 soal unik di module ini.');return;}
    if(!confirm(`Generate 25 soal baru?\n\nBank unik: ${info.bankSize} soal (maks. 500)\nBelum pernah muncul: ${info.remaining} soal`))return;
    runGenerate(mid,button);
  },true);

  window.GBPGenerateProgress={show:showProgress,set:setProgress,hide:hideProgress,wordingDiversity,runGenerate};
})();