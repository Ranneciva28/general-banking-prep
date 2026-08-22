(() => {
  const BANK_SIZE=3000;
  const ACTIVE_LIMIT=25;
  const SUPA_URL='https://pnisrktkkbzspolkfkag.supabase.co';
  const SUPA_KEY='sb_publishable_ClLcjnxymypzS2O6x1TzwA_c9y7-j1Y';
  const SESSION_KEY='gbpAnalyticsSessionV1';
  const clean=s=>String(s??'').replace(/\s+/g,' ').trim();
  const sessionId=(()=>{let x=localStorage.getItem(SESSION_KEY);if(!x){x=`${Date.now().toString(36)}-${crypto.getRandomValues(new Uint32Array(2)).join('-')}`;localStorage.setItem(SESSION_KEY,x)}return x})();
  let analyticsCtx={page:'dashboardView',moduleId:null,day:null};

  function deviceInfo(){const ua=navigator.userAgent||'';return{device:/Android|iPhone|iPad|Mobile/i.test(ua)?'Mobile':'Desktop',browser:/Edg\//.test(ua)?'Edge':/Chrome\//.test(ua)?'Chrome':/Safari\//.test(ua)&&!/Chrome\//.test(ua)?'Safari':/Firefox\//.test(ua)?'Firefox':'Other',os:/Windows/i.test(ua)?'Windows':/Android/i.test(ua)?'Android':/iPhone|iPad|iOS/i.test(ua)?'iOS':/Mac OS/i.test(ua)?'macOS':/Linux/i.test(ua)?'Linux':'Other'}}
  async function track(type,extra={}){const d=deviceInfo();try{await fetch(`${SUPA_URL}/rest/v1/rpc/gbp_track_event`,{method:'POST',headers:{'Content-Type':'application/json','apikey':SUPA_KEY},body:JSON.stringify({p_session_id:sessionId,p_event_type:type,p_page:extra.page??analyticsCtx.page,p_module_id:extra.moduleId??analyticsCtx.moduleId,p_day:extra.day??analyticsCtx.day,p_question_count:Math.min(25,Math.max(0,Number(extra.questionCount)||0)),p_device_type:d.device,p_browser:d.browser,p_os:d.os,p_language:navigator.language||null,p_timezone:Intl.DateTimeFormat().resolvedOptions().timeZone||null,p_screen:`${screen.width}x${screen.height}`,p_latitude:null,p_longitude:null,p_referrer:document.referrer||null,p_meta:extra.meta||{}}),keepalive:true})}catch(e){}}
  window.GBPAnalytics={track,setContext:(next={})=>{analyticsCtx={...analyticsCtx,...next};track('view_change',next)},sessionId};
  window.GBPQuestionBank={BANK_SIZE,ACTIVE_LIMIT,generate:()=>{},bankInfo:mid=>window.GBPDatabaseQuestionBank?.bankInfo?.(mid)||{active:25,seen:0,remaining:BANK_SIZE}};

  const toast=msg=>{const el=document.getElementById('toast');if(!el)return;el.textContent=msg;el.classList.remove('hidden');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.add('hidden'),3200)};
  function currentQuestion(){const text=document.getElementById('questionText')?.textContent?.trim();if(!text)return null;return (window.QUESTION_BANK||[]).find(x=>clean(x.question)===clean(text))||null}
  function currentModuleId(){const name=document.getElementById('moduleTag')?.textContent?.trim();if(!name)return null;const q=(window.QUESTION_BANK||[]).find(x=>x.moduleName===name);return q?Number(q.moduleId):null}

  function injectQuestionType(){
    const quiz=document.querySelector('#quizView.active');if(!quiz)return;
    const q=currentQuestion(),status=quiz.querySelector('.quiz-status');if(!status)return;
    let badge=status.querySelector('.question-type-status');
    if(!q?.questionType){badge?.remove();return}
    if(!badge){badge=document.createElement('div');badge.className='question-type-status';const timer=status.querySelector('.status-metric');if(timer)status.insertBefore(badge,timer);else status.appendChild(badge)}
    if(badge.dataset.type===q.questionType)return;
    badge.dataset.type=q.questionType;badge.innerHTML=`<small>Jenis Soal</small><strong>${q.questionType}</strong>`;
  }

  function injectQuizGenerator(){
    const quiz=document.getElementById('quizView');if(!quiz?.classList.contains('active'))return;
    const card=quiz.querySelector('.module-info-card'),mid=currentModuleId();if(!card||!mid||mid<25)return;
    let box=card.querySelector('.quiz-generate-box');if(!box){box=document.createElement('div');box.className='quiz-generate-box';card.appendChild(box)}
    const info=window.GBPDatabaseQuestionBank?.bankInfo?.(mid)||{active:25,remaining:BANK_SIZE};
    const sig=`${mid}:${info.active}:${info.remaining}`;if(box.dataset.sig===sig)return;box.dataset.sig=sig;
    box.innerHTML=`<div class="quiz-generate-copy"><span>QUESTION BANK</span><strong>Butuh set soal baru?</strong><small>Ganti seluruh 25 soal aktif dengan set baru yang berbeda.</small></div><button type="button" class="quiz-generate-btn">↻ Generate New Questions</button><div class="quiz-bank-meta">Kapasitas bank: ${BANK_SIZE.toLocaleString('id-ID')} slot · 25 soal aktif</div>`;
  }

  function cleanUI(){
    document.querySelector('.sidebar-study-card')?.remove();
    const profile=document.querySelector('.profile-chip');if(profile)profile.style.display='none';
    const footer=document.querySelector('.footer');if(footer)footer.textContent='Data progres tersimpan lokal di perangkat ini';
    document.querySelectorAll('.module-bank-box,.setup-bank-inline').forEach(x=>x.remove());
  }

  track('page_view',{meta:{liteMode:true,bankSize:BANK_SIZE,activeModules:11}});
  document.addEventListener('DOMContentLoaded',()=>{
    cleanUI();injectQuestionType();injectQuizGenerator();
    const msg=sessionStorage.getItem('gbpGenerationToast');if(msg){sessionStorage.removeItem('gbpGenerationToast');setTimeout(()=>toast(msg),350)}
    const auto=Number(sessionStorage.getItem('gbpAutoOpenModule'));if(auto>=25&&auto<=35){sessionStorage.removeItem('gbpAutoOpenModule');setTimeout(()=>window.GBPApp?.startModule?.(auto),80)}
    const qText=document.getElementById('questionText'),mTag=document.getElementById('moduleTag');
    if(qText)new MutationObserver(()=>requestAnimationFrame(injectQuestionType)).observe(qText,{childList:true,characterData:true,subtree:true});
    if(mTag)new MutationObserver(()=>requestAnimationFrame(injectQuizGenerator)).observe(mTag,{childList:true,characterData:true,subtree:true});
    document.addEventListener('click',e=>{if(e.target.closest('[data-module-start],[data-special-start]'))setTimeout(()=>{injectQuestionType();injectQuizGenerator()},60)},{passive:true});
  });
})();