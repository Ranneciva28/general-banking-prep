// Final source-bank guard before 25-question selection.
(() => {
  const bank=window.__GBP_SOURCE_BANK__||[];
  if(!Array.isArray(bank)||!bank.length)return;
  const norm=s=>String(s??'').toLocaleLowerCase('id-ID').replace(/[^a-z0-9à-öø-ÿ]+/giu,' ').replace(/\s+/g,' ').trim();
  const perModule=new Map(),unique=[];
  for(const q of bank){
    const mid=Number(q?.moduleId),stem=norm(q?.question),opts=(Array.isArray(q?.options)?q.options:[]).map(norm).filter(Boolean).sort().join('|');
    if(!mid||!stem||!opts)continue;
    if(!perModule.has(mid))perModule.set(mid,{stems:new Set(),options:new Set()});
    const seen=perModule.get(mid);
    if(seen.stems.has(stem)||seen.options.has(opts))continue;
    seen.stems.add(stem);seen.options.add(opts);unique.push(q);
  }
  bank.splice(0,bank.length,...unique);
  window.__GBP_SOURCE_BANK__=bank;
})();