(() => {
  const bank=window.QUESTION_BANK||[];
  if(!Array.isArray(bank))return;
  for(const q of bank){
    if(Number(q.moduleId)!==25)continue;
    q.moduleName='BRIDGE Module Full Version';
    q.day=7;
    q.category='BRIDGE Module';
    q.bridgeFullVersion=true;
  }
  window.__GBP_SOURCE_BANK__=bank.map(q=>({...q,options:Array.isArray(q.options)?[...q.options]:q.options}));
})();
