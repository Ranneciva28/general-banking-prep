(() => {
  const normalize=s=>String(s||'').toLocaleLowerCase('id-ID').replace(/[^a-z0-9à-öø-ÿ]+/giu,' ').replace(/\s+/g,' ').trim();
  const bank=window.QUESTION_BANK||[];
  if(!Array.isArray(bank)||!bank.length)return;

  const currency=/\b(?:USD|IDR|EUR|JPY|GBP|SGD|AUD|CNY|CNH|HKD|CHF|MYR|THB|VND|KRW)\b/gi;
  function structureText(raw){
    return normalize(String(raw||'')
      .replace(/\bPT\s+[A-Z][A-Za-z0-9._-]*\b/g,' perusahaan ')
      .replace(/\b(?:Nasabah|Debitur|Perusahaan)\s+[A-Z]\b/g,m=>m.split(/\s+/)[0])
      .replace(currency,' currency ')
      .replace(/\b(?:Rp|US\$|USD|IDR)?\s*\d+(?:[.,/]\d+)*(?:\s*(?:ribu|juta|miliar|triliun))?\s*(?:%|bps|bp)?\b/gi,' value ')
      .replace(/\bT\s*\+\s*\d+\b/gi,' tvalue ')
      .replace(/\b\d+\s*(?:hari|bulan|tahun|jam|menit)\b/gi,' period '));
  }

  const rootKey=q=>String(q?.rootQuestionId||q?.baseId||q?.id||'');
  const textKey=q=>normalize(q?.question);
  const explicitConcept=q=>String(q?.conceptSignature||'').startsWith('material-concept:')?String(q.conceptSignature):'';
  const structureKey=q=>structureText(q?.question);
  function semanticDuplicate(a,b){
    if(!a||!b)return false;
    if(rootKey(a)&&rootKey(a)===rootKey(b))return true;
    if(textKey(a)&&textKey(a)===textKey(b))return true;
    if(structureKey(a)&&structureKey(a)===structureKey(b)&&structureKey(a).length>=18)return true;
    const ca=explicitConcept(a),cb=explicitConcept(b);
    return !!(ca&&cb&&ca===cb);
  }

  // Keep this layer non-destructive. V26 selector is the source of truth for
  // semantic/structural diversity so active-slot persistence stays in sync.
  const seen=new Set(),unique=[];
  for(const q of bank){
    const key=`${Number(q?.moduleId)||0}|${textKey(q)}`;
    if(!textKey(q)||seen.has(key))continue;
    seen.add(key);unique.push(q);
  }
  if(unique.length!==bank.length)bank.splice(0,bank.length,...unique);

  document.addEventListener('DOMContentLoaded',()=>{
    const el=document.getElementById('questionText');
    if(!el)return;
    const keyName='gbpShownQuestionTextV26';
    let history={};try{history=JSON.parse(localStorage.getItem(keyName)||'{}')||{}}catch(e){history={}}
    const remember=()=>{
      const text=normalize(el.textContent);if(!text)return;
      const moduleName=document.getElementById('moduleTag')?.textContent?.trim()||'';
      history[`${normalize(moduleName)}|${text}`]=Date.now();
      const entries=Object.entries(history).sort((a,b)=>b[1]-a[1]).slice(0,10000);
      history=Object.fromEntries(entries);
      try{localStorage.setItem(keyName,JSON.stringify(history))}catch(e){}
    };
    new MutationObserver(remember).observe(el,{childList:true,characterData:true,subtree:true});
    remember();
  });

  window.GBPSemanticDedupe={semanticDuplicate,structureKey};
})();