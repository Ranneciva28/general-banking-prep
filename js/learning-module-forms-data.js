(() => {
  const V='2026.08.25.1918-learning-trade-lc-v43';
  const load=src=>new Promise((resolve,reject)=>{
    const existing=[...document.scripts].find(s=>s.src&&s.src.includes(src.split('?')[0]));
    if(existing){
      if(existing.dataset.gbpLoaded==='1')return resolve();
      existing.addEventListener('load',resolve,{once:true});
      existing.addEventListener('error',reject,{once:true});
      return;
    }
    const s=document.createElement('script');
    s.src=src;
    s.dataset.gbpLearningSuite='1';
    s.onload=()=>{s.dataset.gbpLoaded='1';resolve();};
    s.onerror=reject;
    document.head.appendChild(s);
  });
  const clean=s=>String(s??'').replace(/\s+/g,' ').trim().toLowerCase();
  const merge=(base,extra)=>{
    const out=Array.isArray(base)?base:[];
    const seen=new Set(out.map(r=>clean(r?.[0])));
    for(const row of extra||[]){const k=clean(row?.[0]);if(k&&!seen.has(k)){out.push(row);seen.add(k);}}
    return out;
  };
  function sync(){
    const runtime=window.GBPLearningModules?.modules;
    if(!Array.isArray(runtime))return;
    const expert=window.GBPLearningExpert||{},deep=window.GBPLearningDeep||{};
    for(const module of runtime){
      const ex=expert[module.code]||{},dp=deep[module.code]||{};
      if(Array.isArray(ex.chapters))module.expert=[...ex.chapters];
      module.glossary=merge(module.glossary,ex.glossary);
      module.critical=merge(module.critical,dp.critical);
      module.cases=merge(module.cases,dp.cases);
      module.questions=merge(module.questions,dp.questions);
      if(ex.note)module.expertNote=ex.note;
      if(dp.sources)module.sources={...(module.sources||{}),...dp.sources};
    }
    window.__GBP_LEARNING_FORMS_RUNTIME__='V43-suite';
    window.__GBP_LEARNING_LEGAL_RUNTIME__='V42-legal-2025';
    window.__GBP_LEARNING_TRADE_RUNTIME__='V43-lc-types';
    document.dispatchEvent(new CustomEvent('gbp:learning-suite-ready'));
  }
  (async()=>{
    await load(`js/learning-module-forms-data-v41.js?v=${V}`);
    await load(`js/learning-module-legal-2025-data.js?v=${V}`);
    await load(`js/learning-module-trade-lc-data.js?v=${V}`);
    sync();
  })().catch(err=>console.error('[GBP Learning Suite]',err));
})();