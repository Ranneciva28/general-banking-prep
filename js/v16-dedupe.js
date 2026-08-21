(() => {
  const normalize=s=>String(s||'').toLocaleLowerCase('id-ID').replace(/[^a-z0-9à-öø-ÿ]+/giu,' ').replace(/\s+/g,' ').trim();
  const bank=window.QUESTION_BANK||[];
  if(!Array.isArray(bank)||!bank.length)return;
  const seen=new Set();
  const unique=[];
  for(const q of bank){
    const key=normalize(q.question);
    if(!key||seen.has(key))continue;
    seen.add(key);unique.push(q);
  }
  if(unique.length!==bank.length)bank.splice(0,bank.length,...unique);

  document.addEventListener('DOMContentLoaded',()=>{
    const el=document.getElementById('questionText');
    if(!el)return;
    const keyName='gbpShownQuestionTextV16';
    let history={};try{history=JSON.parse(localStorage.getItem(keyName)||'{}')||{}}catch(e){history={}}
    const remember=()=>{
      const text=normalize(el.textContent);if(!text)return;
      history[text]=Date.now();
      const entries=Object.entries(history).sort((a,b)=>b[1]-a[1]).slice(0,8000);
      history=Object.fromEntries(entries);
      try{localStorage.setItem(keyName,JSON.stringify(history))}catch(e){}
    };
    new MutationObserver(remember).observe(el,{childList:true,characterData:true,subtree:true});
    remember();
  });
})();