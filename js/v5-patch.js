(() => {
  const SUPA_URL='https://pnisrktkkbzspolkfkag.supabase.co';
  const SUPA_KEY='sb_publishable_ClLcjnxymypzS2O6x1TzwA_c9y7-j1Y';
  const SESSION_KEY='gbpAnalyticsSessionV1';
  const CLEANUP_KEY='gbpLightRuntimeV26';
  const clean=s=>String(s??'').replace(/\s+/g,' ').trim();

  const sessionId=(()=>{
    let x=localStorage.getItem(SESSION_KEY);
    if(!x){
      x=`${Date.now().toString(36)}-${crypto.getRandomValues(new Uint32Array(2)).join('-')}`;
      localStorage.setItem(SESSION_KEY,x);
    }
    return x;
  })();

  let analyticsCtx={page:'dashboardView',moduleId:null,day:null};
  async function track(type,extra={}){
    try{
      await fetch(`${SUPA_URL}/rest/v1/rpc/gbp_track_event`,{
        method:'POST',
        headers:{'Content-Type':'application/json','apikey':SUPA_KEY},
        keepalive:true,
        body:JSON.stringify({
          p_session_id:sessionId,
          p_event_type:type,
          p_page:extra.page??analyticsCtx.page,
          p_module_id:extra.moduleId??analyticsCtx.moduleId,
          p_day:extra.day??analyticsCtx.day,
          p_question_count:Math.min(50,Math.max(0,Number(extra.questionCount)||0)),
          p_device_type:/Android|iPhone|iPad|Mobile/i.test(navigator.userAgent||'')?'Mobile':'Desktop',
          p_browser:null,p_os:null,p_language:navigator.language||null,
          p_timezone:Intl.DateTimeFormat().resolvedOptions().timeZone||null,
          p_screen:`${screen.width}x${screen.height}`,
          p_latitude:null,p_longitude:null,p_referrer:document.referrer||null,
          p_meta:extra.meta||{}
        })
      });
    }catch(e){}
  }

  window.GBPAnalytics={
    track,
    setContext:(next={})=>{analyticsCtx={...analyticsCtx,...next};},
    sessionId
  };
  window.GBPQuestionBank=window.GBPQuestionBank||{};

  try{
    if(!localStorage.getItem(CLEANUP_KEY)){
      ['generalBankingQuestionBankV6','gbpShownQuestionTextV25'].forEach(k=>localStorage.removeItem(k));
      localStorage.setItem(CLEANUP_KEY,'1');
    }
  }catch(e){}

  function cleanUI(){
    const bridge=document.getElementById('bridgeLockedNav');if(bridge)bridge.style.display='none';
    const side=document.querySelector('.sidebar-study-card');if(side)side.style.display='none';
    const profile=document.querySelector('.profile-chip');if(profile)profile.style.display='none';
    const quick=document.querySelector('.quick-actions');
    if(quick){
      quick.querySelectorAll('.quick-card:not(#weaknessDrillBtn)').forEach(x=>x.style.display='none');
      const title=quick.closest('.section-block')?.querySelector('.section-title-row');if(title)title.style.display='none';
      quick.classList.add('weakness-only-grid');
    }
    document.querySelectorAll('.module-bank-box,.setup-bank-inline').forEach(x=>x.remove());
  }

  function currentQuestion(){
    const text=clean(document.getElementById('questionText')?.textContent);
    if(!text)return null;
    return (window.QUESTION_BANK||[]).find(x=>clean(x.question)===text)||null;
  }

  function injectQuestionType(){
    const quiz=document.querySelector('#quizView.active');if(!quiz)return;
    const q=currentQuestion(),status=quiz.querySelector('.quiz-status');if(!status)return;
    let badge=status.querySelector('.question-type-status');
    if(!q?.questionType){if(badge)badge.remove();return;}
    if(!badge){
      badge=document.createElement('div');badge.className='question-type-status';
      const timer=status.querySelector('.status-metric');
      if(timer)status.insertBefore(badge,timer);else status.appendChild(badge);
    }
    if(badge.dataset.type===q.questionType)return;
    badge.dataset.type=q.questionType;
    badge.innerHTML=`<small>Jenis Soal</small><strong>${q.questionType}</strong>`;
  }

  document.addEventListener('DOMContentLoaded',()=>{
    cleanUI();injectQuestionType();
    const qText=document.getElementById('questionText');
    if(qText)new MutationObserver(()=>requestAnimationFrame(injectQuestionType)).observe(qText,{childList:true,characterData:true,subtree:true});
    const idle=window.requestIdleCallback||((fn)=>setTimeout(fn,500));
    idle(()=>track(location.pathname.includes('/khusus/')?'bridge_open':'page_view'));
  },{once:true});
})();