(() => {
  const URL='https://pnisrktkkbzspolkfkag.supabase.co';
  const KEY='sb_publishable_ClLcjnxymypzS2O6x1TzwA_c9y7-j1Y';
  const SESSION_KEY='gbpAnalyticsSessionV1';
  const clientId=localStorage.getItem(SESSION_KEY);
  if(!clientId)return;
  const clean=s=>String(s??'').replace(/\s+/g,' ').trim();
  let lastId=null,busy=false;

  async function registerShown(){
    if(busy)return;
    const text=clean(document.getElementById('questionText')?.textContent);if(!text)return;
    const q=(window.QUESTION_BANK||[]).find(x=>clean(x.question)===text);
    if(!q?.bankSlot||!q?.moduleId||q.id===lastId)return;
    lastId=q.id;busy=true;
    try{
      await fetch(`${URL}/rest/v1/rpc/gbp_question_register_batch`,{
        method:'POST',cache:'no-store',headers:{'Content-Type':'application/json','apikey':KEY},
        body:JSON.stringify({
          p_client_id:clientId,p_module_id:Number(q.moduleId),p_requested_count:1,
          p_questions:[{
            slot:Number(q.bankSlot),question:q.question,options:q.options,answer:q.answer,
            explanation:q.explanation,source:q.source,baseId:q.baseId,
            questionType:q.questionType||'Pilihan Ganda',difficulty:q.difficulty||'Sedang-Sulit',
            structureKey:q.structureKey||`${clean(q.question)}|${q.questionType||'Pilihan Ganda'}|${q.isLong?'long':'short'}|shown`
          }]
        })
      });
    }catch(e){}finally{busy=false}
  }

  document.addEventListener('DOMContentLoaded',()=>{
    const el=document.getElementById('questionText');
    if(el)new MutationObserver(()=>queueMicrotask(registerShown)).observe(el,{childList:true,characterData:true,subtree:true});
    registerShown();
  });
})();