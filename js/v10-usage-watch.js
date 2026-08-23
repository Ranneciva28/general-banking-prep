(() => {
  const URL='https://pnisrktkkbzspolkfkag.supabase.co';
  const KEY='sb_publishable_ClLcjnxymypzS2O6x1TzwA_c9y7-j1Y';
  const SESSION_KEY='gbpAnalyticsSessionV1';
  const clientId=localStorage.getItem(SESSION_KEY);
  const clean=s=>String(s??'').replace(/\s+/g,' ').trim();
  let lastId=null,busy=false,autoNextTimer=null;

  // Faster quiz flow: selecting an answer advances automatically. Practice mode
  // keeps a brief visual beat so the correct/wrong state is still visible;
  // Exam mode already advances itself in app.js, so this guard simply becomes
  // a no-op if the question has already changed.
  function scheduleAutoNext(){
    clearTimeout(autoNextTimer);
    const counter=document.getElementById('questionCounter')?.textContent||'';
    const question=document.getElementById('questionText')?.textContent||'';
    const exam=/exam/i.test(document.getElementById('quizModeTitle')?.textContent||'');
    const delay=exam?180:650;
    autoNextTimer=setTimeout(()=>{
      const quiz=document.getElementById('quizView');
      if(!quiz?.classList.contains('active'))return;
      if((document.getElementById('questionCounter')?.textContent||'')!==counter)return;
      if((document.getElementById('questionText')?.textContent||'')!==question)return;
      const options=[...document.querySelectorAll('#optionsList .option-btn')];
      // app.js disables all options only after the answer has been committed.
      // This prevents an early/double advance and also protects manual navigation.
      if(!options.length||options.some(b=>!b.disabled))return;
      document.getElementById('nextBtn')?.click();
    },delay);
  }

  document.addEventListener('click',e=>{
    if(e.target.closest?.('.option-btn'))scheduleAutoNext();
  },true);

  // Cancel any pending auto-next when the user explicitly navigates elsewhere.
  document.addEventListener('click',e=>{
    if(e.target.closest?.('#nextBtn,#prevBtn,#skipBtn,[data-qnav],[data-view]'))clearTimeout(autoNextTimer);
  },true);

  if(!clientId)return;

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

  async function markAnswer(q,isCorrect){
    try{
      await fetch(`${URL}/rest/v1/rpc/gbp_question_mark_answer`,{
        method:'POST',cache:'no-store',headers:{'Content-Type':'application/json','apikey':KEY},
        body:JSON.stringify({p_client_id:clientId,p_module_id:Number(q.moduleId),p_slot_no:Number(q.bankSlot),p_is_correct:!!isCorrect})
      });
    }catch(e){}
  }

  document.addEventListener('click',e=>{
    const btn=e.target.closest?.('.option-btn');if(!btn)return;
    const text=clean(document.getElementById('questionText')?.textContent);if(!text)return;
    const q=(window.QUESTION_BANK||[]).find(x=>clean(x.question)===text);if(!q?.bankSlot)return;
    const opt=clean(btn.querySelector('span:last-child')?.textContent||'');
    markAnswer(q,opt===clean(q.answer));
  },true);

  document.addEventListener('DOMContentLoaded',()=>{
    const el=document.getElementById('questionText');
    if(el)new MutationObserver(()=>queueMicrotask(registerShown)).observe(el,{childList:true,characterData:true,subtree:true});
    registerShown();
  });
})();