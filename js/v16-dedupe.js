(() => {
  const normalize=s=>String(s||'').toLocaleLowerCase('id-ID').replace(/[^a-z0-9à-öø-ÿ]+/giu,' ').replace(/\s+/g,' ').trim();
  const bank=window.QUESTION_BANK||[];
  const source=window.__GBP_SOURCE_BANK__||[];
  if(!Array.isArray(bank)||!bank.length)return;

  const semanticStop=new Set(`yang dan atau untuk pada dalam dengan dari ke di ini itu tersebut sebuah suatu seorang adalah ialah merupakan sebagai agar serta paling lebih tepat sesuai apa apakah bagaimana mengapa manakah konsep kondisi konteks istilah merujuk mengacu dimaksud berarti memiliki menunjukkan menggambarkan mencerminkan menjelaskan peningkatan penurunan meningkat menurun dicatat mencatat sisi akun saldo normal transaksi nilai dokumen dilakukan melakukan terjadi ketika saat bank nasabah petugas unit proses fungsi prinsip peran keputusan tindakan jawaban pilihan`.split(' '));

  const rootKey=q=>String(q?.rootQuestionId||q?.baseId||q?.id||'');
  const textKey=q=>normalize(q?.question);
  const explicitConcept=q=>String(q?.conceptSignature||'').startsWith('material-concept:')?String(q.conceptSignature):'';
  function conceptTokens(q){
    const raw=`${q?.question||''} ${q?.answer||''}`;
    return [...new Set(normalize(raw).split(' ').filter(t=>t.length>2&&!semanticStop.has(t)))];
  }
  function overlap(a,b){
    const A=new Set(a),B=new Set(b);if(!A.size||!B.size)return{count:0,ratio:0};
    let count=0;for(const x of A)if(B.has(x))count++;
    return{count,ratio:count/Math.min(A.size,B.size)};
  }
  function semanticDuplicate(a,b){
    if(!a||!b)return false;
    if(rootKey(a)&&rootKey(a)===rootKey(b))return true;
    if(textKey(a)&&textKey(a)===textKey(b))return true;
    const ca=explicitConcept(a),cb=explicitConcept(b);
    if(ca&&cb&&ca===cb)return true;
    const A=conceptTokens(a),B=conceptTokens(b),o=overlap(A,B);
    // Conservative semantic guard: require at least two substantive anchors
    // and very high containment, so broad topics are not collapsed together.
    return o.count>=2&&o.ratio>=.8;
  }
  function canUse(q,chosen){
    if(!q||!textKey(q)||!Array.isArray(q.options)||q.options.length!==4)return false;
    return !chosen.some(old=>semanticDuplicate(q,old));
  }

  function rebalanceModule(mid){
    mid=Number(mid);if(!mid)return[];
    const current=bank.filter(q=>Number(q.moduleId)===mid);
    if(!current.length)return[];
    const desired=current.length;
    const chosen=[];
    const usedIds=new Set();
    const add=q=>{
      const id=String(q?.id||'');
      if(id&&usedIds.has(id))return false;
      if(!canUse(q,chosen))return false;
      chosen.push(q);if(id)usedIds.add(id);return true;
    };

    for(const q of current)add(q);
    const candidates=source.filter(q=>Number(q.moduleId)===mid);
    for(const q of candidates){if(chosen.length>=desired)break;add(q);}

    // Never make a module disappear. If a source genuinely has fewer distinct
    // learning objectives than the requested active size, preserve its count
    // and report it rather than deleting the module.
    if(chosen.length<desired){
      for(const q of current){
        if(chosen.length>=desired)break;
        const id=String(q?.id||'');if(id&&usedIds.has(id))continue;
        chosen.push(q);if(id)usedIds.add(id);
      }
      console.warn(`Semantic diversity shortfall M${mid}: ${chosen.length}/${desired}`);
    }

    const others=bank.filter(q=>Number(q.moduleId)!==mid);
    bank.splice(0,bank.length,...others,...chosen.slice(0,desired));
    return chosen.slice(0,desired);
  }

  // Exact-text cleanup first, then semantic balancing module by module.
  const seen=new Set(),unique=[];
  for(const q of bank){
    const key=`${Number(q?.moduleId)||0}|${textKey(q)}`;
    if(!textKey(q)||seen.has(key))continue;
    seen.add(key);unique.push(q);
  }
  if(unique.length!==bank.length)bank.splice(0,bank.length,...unique);
  [...new Set(bank.map(q=>Number(q.moduleId)).filter(Boolean))].forEach(rebalanceModule);

  document.addEventListener('DOMContentLoaded',()=>{
    const el=document.getElementById('questionText');
    if(!el)return;
    const keyName='gbpShownQuestionTextV25';
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

  window.GBPSemanticDedupe={semanticDuplicate,rebalanceModule,conceptTokens};
})();