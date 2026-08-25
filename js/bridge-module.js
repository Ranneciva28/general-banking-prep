(() => {
  const bank=window.QUESTION_BANK||[];
  if(!Array.isArray(bank)||!bank.length)return;

  const SOURCE='SERTIFIKASI GB 4 PPT BRIDGE_compressed (2) (1).pdf';
  const MODULE_ID=25;
  const MODULE_NAME='BRIDGE Module Full Version';
  const DAY=7;

  for(let i=bank.length-1;i>=0;i--)if(Number(bank[i]?.moduleId)===MODULE_ID)bank.splice(i,1);

  // Full BRIDGE is the cross-competency pool. It is built only from the original
  // General Banking roots that are represented inside the uploaded consolidated
  // BRIDGE deck. No hand-written filler questions are added just to inflate count.
  const source=bank.filter(q=>Number(q.moduleId)>=1&&Number(q.moduleId)<=24);
  const additions=source.map((q,i)=>({
    ...q,
    id:`BRIDGE-FULL-${String(i+1).padStart(4,'0')}-${q.id}`,
    moduleId:MODULE_ID,
    moduleName:MODULE_NAME,
    day:DAY,
    category:'BRIDGE Module',
    source:`${SOURCE} · Full Version · ${q.moduleName}`,
    bridgeSourceDeck:SOURCE,
    bridgeFullVersion:true,
    rootQuestionId:`BRIDGE-FULL|${q.rootQuestionId||q.baseId||q.id}`,
    baseId:`BRIDGE-FULL|${q.rootQuestionId||q.baseId||q.id}`,
    conceptSignature:`bridge-full|${q.conceptSignature||q.rootQuestionId||q.baseId||q.id}`
  }));
  bank.push(...additions);

  window.BRIDGE_FULL={id:MODULE_ID,name:MODULE_NAME,day:DAY,source:SOURCE,maxBank:500};
  window.__GBP_SOURCE_BANK__=bank.map(q=>({...q,options:Array.isArray(q.options)?[...q.options]:q.options}));
})();
