(() => {
  const normalize=s=>String(s||'').toLocaleLowerCase('id-ID').replace(/[^a-z0-9à-öø-ÿ]+/giu,' ').replace(/\s+/g,' ').trim();
  const bank=window.QUESTION_BANK||[];
  if(!Array.isArray(bank)||!bank.length)return;
  const seen=new Set(),unique=[];
  for(const q of bank){
    const key=`${Number(q?.moduleId)||0}|${normalize(q.question)}`;
    if(!normalize(q.question)||seen.has(key))continue;
    seen.add(key);unique.push(q);
  }
  if(unique.length!==bank.length)bank.splice(0,bank.length,...unique);

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
})();