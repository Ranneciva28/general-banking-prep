(() => {
  const SUPA_URL='https://pnisrktkkbzspolkfkag.supabase.co';
  const SUPA_KEY='sb_publishable_ClLcjnxymypzS2O6x1TzwA_c9y7-j1Y';
  const SESSION_KEY='gbpAnalyticsSessionV1';
  const clean=text=>String(text||'').replace(/\s+/g,' ').trim();

  // V5 used to synthesize a 5,000-slot bank for every module at startup.
  // V26 is now the source of truth, so V5 only keeps compatibility/UI helpers.
  const sessionId=(()=>{let x=localStorage.getItem(SESSION_KEY);if(!x){x=`${Date.now().toString(36)}-${crypto.getRandomValues(new Uint32Array(2)).join('-')}`;localStorage.setItem(SESSION_KEY,x)}return x})();
  let analyticsCtx={page:'dashboardView',moduleId:null,day:null};

  function deviceInfo(){
    const ua=navigator.userAgent||'';
    return{
      device:/Android|iPhone|iPad|Mobile/i.test(ua)?'Mobile':'Desktop',
      browser:/Edg\//.test(ua)?'Edge':/Chrome\//.test(ua)?'Chrome':/Safari\//.test(ua)&&!/Chrome\//.test(ua)?'Safari':/Firefox\//.test(ua)?'Firefox':'Other',
      os:/Windows/i.test(ua)?'Windows':/Android/i.test(ua)?'Android':/iPhone|iPad|iOS/i.test(ua)?'iOS':/Mac OS/i.test(ua)?'macOS':/Linux/i.test(ua)?'Linux':'Other'
    };
  }
  async function track(type,extra={}){
    const d=deviceInfo();
    try{
      await fetch(`${SUPA_URL}/rest/v1/rpc/gbp_track_event`,{
        method:'POST',
        headers:{'Content-Type':'application/json','apikey':SUPA_KEY},
        body:JSON.stringify({
          p_session_id:sessionId,p_event_type:type,p_page:extra.page??analyticsCtx.page,
          p_module_id:extra.moduleId??analyticsCtx.moduleId,p_day:extra.day??analyticsCtx.day,
          p_question_count:Math.min(50,Math.max(0,Number(extra.questionCount)||0)),
          p_device_type:d.device,p_browser:d.browser,p_os:d.os,p_language:navigator.language||null,
          p_timezone:Intl.DateTimeFormat().resolvedOptions().timeZone||null,
          p_screen:`${screen.width}x${screen.height}`,p_latitude:null,p_longitude:null,
          p_referrer:document.referrer||null,p_meta:extra.meta||{}
        }),keepalive:true
      });
    }catch(e){}
  }
  window.GBPAnalytics={
    track,
    setContext:(next={})=>{analyticsCtx={...analyticsCtx,...next};track('view_change',next)},
    sessionId
  };

  // Compatibility object. V26 replaces generate/bankInfo after initialization.
  window.GBPQuestionBank=window.GBPQuestionBank||{
    generate:mid=>window.GBPDatabaseQuestionBank?.reserveNew?.(mid),
    bankInfo:mid=>window.GBPDatabaseQuestionBank?.bankInfo?.(mid)||{active:25,database:true},
    BANK_SIZE:0,
    ACTIVE_LIMIT:25
  };

  function cleanUI(){
    const bridge=document.getElementById('bridgeLockedNav');if(bridge)bridge.style.display='none';
    const side=document.querySelector('.sidebar-study-card');if(side)side.style.display='none';
    const profile=document.querySelector('.profile-chip');if(profile)profile.style.display='none';
    const footer=document.querySelector('.footer');if(footer&&footer.textContent!=='Data tersimpan lokal di perangkat ini')footer.textContent='Data tersimpan lokal di perangkat ini';
    const quick=document.querySelector('.quick-actions');
    if(quick){
      quick.querySelectorAll('.quick-card:not(#weaknessDrillBtn)').forEach(x=>x.style.display='none');
      const title=quick.closest('.section-block')?.querySelector('.section-title-row');if(title)title.style.display='none';
      quick.classList.add('weakness-only-grid');
    }
    document.querySelectorAll('.module-bank-box,.setup-bank-inline').forEach(x=>x.remove());
  }

  function currentQuestion(){
    const text=document.getElementById('questionText')?.textContent?.trim();if(!text)return null;
    return (window.QUESTION_BANK||[]).find(x=>clean(x.question)===clean(text))||null;
  }
  function currentModuleId(){
    const name=document.getElementById('moduleTag')?.textContent?.trim();if(!name)return null;
    const q=(window.QUESTION_BANK||[]).find(x=>x.moduleName===name);return q?Number(q.moduleId):null;
  }
  function injectQuestionType(){
    const quiz=document.querySelector('#quizView.active');if(!quiz)return;
    const q=currentQuestion(),status=quiz.querySelector('.quiz-status');if(!status)return;
    let badge=status.querySelector('.question-type-status');
    if(!q?.questionType){if(badge)badge.remove();return;}
    if(!badge){
      badge=document.createElement('div');badge.className='question-type-status';
      const timer=status.querySelector('.status-metric');if(timer)status.insertBefore(badge,timer);else status.appendChild(badge);
    }
    if(badge.dataset.type===q.questionType)return;
    badge.dataset.type=q.questionType;badge.innerHTML=`<small>Jenis Soal</small><strong>${q.questionType}</strong>`;
  }
  function injectQuizGenerator(){
    const quiz=document.getElementById('quizView');if(!quiz?.classList.contains('active'))return;
    const card=quiz.querySelector('.module-info-card'),mid=currentModuleId();if(!card||!mid)return;
    let box=card.querySelector('.quiz-generate-box');if(!box){box=document.createElement('div');box.className='quiz-generate-box';card.appendChild(box);}
    if(box.dataset.mid===String(mid))return;
    box.dataset.mid=String(mid);
    box.innerHTML=`<div class="quiz-generate-copy"><span>QUESTION BANK</span><strong>Butuh set soal baru?</strong><small>Ganti seluruh 25 soal aktif dengan set baru yang berbeda.</small></div><button type="button" class="quiz-generate-btn">↻ Generate New Questions</button><div class="quiz-bank-meta">25 soal aktif · V26 semantic & structure guard</div>`;
  }

  let scheduled=false;
  function refreshSoon(){
    if(scheduled)return;scheduled=true;
    requestAnimationFrame(()=>{scheduled=false;cleanUI();injectQuestionType();injectQuizGenerator();});
  }
  document.addEventListener('DOMContentLoaded',()=>{
    refreshSoon();
    const tag=document.getElementById('moduleTag');if(tag)new MutationObserver(refreshSoon).observe(tag,{childList:true,characterData:true,subtree:true});
    const q=document.getElementById('questionText');if(q)new MutationObserver(refreshSoon).observe(q,{childList:true,characterData:true,subtree:true});
    const quiz=document.getElementById('quizView');if(quiz)new MutationObserver(refreshSoon).observe(quiz,{attributes:true,attributeFilter:['class']});
  });
  document.addEventListener('click',()=>setTimeout(refreshSoon,0),{passive:true});
})();