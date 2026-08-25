(() => {
  const SUPA_URL='https://pnisrktkkbzspolkfkag.supabase.co';
  const SUPA_KEY='sb_publishable_ClLcjnxymypzS2O6x1TzwA_c9y7-j1Y';
  const SESSION_KEY='gbpAnalyticsSessionV1';
  const clean=text=>String(text||'').replace(/\s+/g,' ').trim();

  // Manual navigation compatibility guard. app.js historically advances Exam Mode
  // 120 ms after an answer. Suppress only that exact nextQuestion timer; all other
  // timers (toast, progress, analytics, etc.) continue to use the native scheduler.
  if(!window.__GBP_MANUAL_NEXT_V33__){
    const nativeSetTimeout=window.setTimeout.bind(window);
    window.setTimeout=function(handler,delay,...args){
      if(Number(delay)===120&&typeof handler==='function'&&handler.name==='nextQuestion')return 0;
      return nativeSetTimeout(handler,delay,...args);
    };
    window.__GBP_MANUAL_NEXT_V33__=true;
  }

  // V28 is the source of truth. This file only keeps analytics/UI helpers.
  const sessionId=(()=>{let x=localStorage.getItem(SESSION_KEY);if(!x){x=`${Date.now().toString(36)}-${crypto.getRandomValues(new Uint32Array(2)).join('-')}`;localStorage.setItem(SESSION_KEY,x)}return x})();
  let analyticsCtx={page:'dashboardView',moduleId:null,day:null};

  function deviceInfo(){
    const ua=navigator.userAgent||'';
    return{device:/Android|iPhone|iPad|Mobile/i.test(ua)?'Mobile':'Desktop',browser:/Edg\//.test(ua)?'Edge':/Chrome\//.test(ua)?'Chrome':/Safari\//.test(ua)&&!/Chrome\//.test(ua)?'Safari':/Firefox\//.test(ua)?'Firefox':'Other',os:/Windows/i.test(ua)?'Windows':/Android/i.test(ua)?'Android':/iPhone|iPad|iOS/i.test(ua)?'iOS':/Mac OS/i.test(ua)?'macOS':/Linux/i.test(ua)?'Linux':'Other'};
  }
  async function track(type,extra={}){
    const d=deviceInfo();
    try{await fetch(`${SUPA_URL}/rest/v1/rpc/gbp_track_event`,{method:'POST',headers:{'Content-Type':'application/json','apikey':SUPA_KEY},body:JSON.stringify({p_session_id:sessionId,p_event_type:type,p_page:extra.page??analyticsCtx.page,p_module_id:extra.moduleId??analyticsCtx.moduleId,p_day:extra.day??analyticsCtx.day,p_question_count:Math.min(50,Math.max(0,Number(extra.questionCount)||0)),p_device_type:d.device,p_browser:d.browser,p_os:d.os,p_language:navigator.language||null,p_timezone:Intl.DateTimeFormat().resolvedOptions().timeZone||null,p_screen:`${screen.width}x${screen.height}`,p_latitude:null,p_longitude:null,p_referrer:document.referrer||null,p_meta:extra.meta||{}}),keepalive:true});}catch(e){}
  }
  window.GBPAnalytics={track,setContext:(next={})=>{analyticsCtx={...analyticsCtx,...next};track('view_change',next)},sessionId};

  window.GBPQuestionBank=window.GBPQuestionBank||{generate:mid=>window.GBPDatabaseQuestionBank?.reserveNew?.(mid),bankInfo:mid=>window.GBPDatabaseQuestionBank?.bankInfo?.(mid)||{active:25,database:true},BANK_SIZE:0,ACTIVE_LIMIT:25};

  function ensureQuizNavStyle(){
    if(document.getElementById('gbpQuizTopNavStyle'))return;
    const style=document.createElement('style');style.id='gbpQuizTopNavStyle';
    style.textContent=`
      #quizView .question-panel>.quiz-bottom-nav.quiz-top-nav{position:sticky;top:10px;z-index:20;display:flex;align-items:center;justify-content:flex-end;gap:8px;margin:4px 0 18px;padding:10px;border:1px solid rgba(148,163,184,.28);border-radius:12px;background:color-mix(in srgb,var(--surface,#fff) 94%,transparent);backdrop-filter:blur(10px);box-shadow:0 8px 22px rgba(15,23,42,.07)}
      #quizView .quiz-top-nav .btn{min-width:118px;margin:0}
      #quizView .quiz-top-nav #nextBtn{order:1}
      #quizView .quiz-top-nav #skipBtn{order:2}
      #quizView .quiz-top-nav #prevBtn{order:3}
      @media(max-width:700px){#quizView .question-panel>.quiz-bottom-nav.quiz-top-nav{top:6px;gap:6px;padding:8px}#quizView .quiz-top-nav .btn{flex:1;min-width:0;padding-left:8px;padding-right:8px;font-size:12px}}
    `;
    document.head.appendChild(style);
  }
  function moveQuizNavigation(){
    const quiz=document.getElementById('quizView');if(!quiz)return;
    const panel=quiz.querySelector('.question-panel'),question=document.getElementById('questionText'),nav=quiz.querySelector('.quiz-bottom-nav');
    if(!panel||!question||!nav)return;
    ensureQuizNavStyle();
    nav.classList.add('quiz-top-nav');
    if(nav.parentElement!==panel||nav.nextElementSibling!==question)panel.insertBefore(nav,question);
    const prev=document.getElementById('prevBtn'),skip=document.getElementById('skipBtn'),next=document.getElementById('nextBtn');
    if(prev)prev.textContent='← Kembali';
    if(skip)skip.textContent='Lewati';
    // Keep app.js dynamic “Selesai →” label on the last question; otherwise normalize.
    if(next&&next.textContent.trim()!=='Selesai →')next.textContent='Selanjutnya →';
  }

  function cleanUI(){
    const bridge=document.getElementById('bridgeLockedNav');if(bridge)bridge.style.display='none';
    const side=document.querySelector('.sidebar-study-card');if(side)side.style.display='none';
    const profile=document.querySelector('.profile-chip');if(profile)profile.style.display='none';
    const footer=document.querySelector('.footer');if(footer&&footer.textContent!=='Data tersimpan lokal di perangkat ini')footer.textContent='Data tersimpan lokal di perangkat ini';
    const quick=document.querySelector('.quick-actions');if(quick){quick.querySelectorAll('.quick-card:not(#weaknessDrillBtn)').forEach(x=>x.style.display='none');const title=quick.closest('.section-block')?.querySelector('.section-title-row');if(title)title.style.display='none';quick.classList.add('weakness-only-grid');}
    document.querySelectorAll('.module-bank-box,.setup-bank-inline').forEach(x=>x.remove());
  }

  function currentQuestion(){const text=document.getElementById('questionText')?.textContent?.trim();if(!text)return null;return (window.QUESTION_BANK||[]).find(x=>clean(x.question)===clean(text))||null;}
  function currentModuleId(){const name=document.getElementById('moduleTag')?.textContent?.trim();if(!name)return null;const q=(window.QUESTION_BANK||[]).find(x=>x.moduleName===name);return q?Number(q.moduleId):null;}
  function injectQuestionType(){
    const quiz=document.querySelector('#quizView.active');if(!quiz)return;
    const q=currentQuestion(),status=quiz.querySelector('.quiz-status');if(!status)return;
    let badge=status.querySelector('.question-type-status');if(!q?.questionType){if(badge)badge.remove();return;}
    if(!badge){badge=document.createElement('div');badge.className='question-type-status';const timer=status.querySelector('.status-metric');if(timer)status.insertBefore(badge,timer);else status.appendChild(badge);}
    if(badge.dataset.type===q.questionType)return;badge.dataset.type=q.questionType;badge.innerHTML=`<small>Jenis Soal</small><strong>${q.questionType}</strong>`;
  }
  function injectQuizGenerator(force=false){
    const quiz=document.getElementById('quizView');if(!quiz?.classList.contains('active'))return;
    const card=quiz.querySelector('.module-info-card'),mid=currentModuleId();if(!card||!mid)return;
    const info=window.GBPDatabaseQuestionBank?.bankInfo?.(mid)||window.GBPQuestionBank?.bankInfo?.(mid)||{active:25,bankSize:0,remaining:0,maxBank:500};
    const total=Math.min(Number(info.bankSize)||0,500),remaining=Math.max(0,Number(info.remaining)||0),canGenerate=remaining>=25;
    let box=card.querySelector('.quiz-generate-box');if(!box){box=document.createElement('div');box.className='quiz-generate-box';card.appendChild(box);}
    const sig=`${mid}:${total}:${remaining}:${canGenerate}`;if(!force&&box.dataset.sig===sig)return;box.dataset.sig=sig;
    const title=canGenerate?'Generate 25 soal baru':'Seluruh materi unik sudah ter-cover';
    const desc=canGenerate?'Ambil 25 soal baru yang belum pernah muncul di module ini.':'GBP Ranneciva Engine tidak lagi punya cukup 25 soal baru yang benar-benar berbeda. Kamu masih bisa mengacak ulang urutan 25 soal aktif tanpa membuat variasi semu.';
    const buttonText=canGenerate?'↻ Generate 25 Soal Baru':'↻ Acak Ulang 25 Soal';
    box.innerHTML=`<div class="quiz-generate-copy"><span>QUESTION BANK</span><strong>${title}</strong><small>${desc}</small></div><button type="button" class="quiz-generate-btn">${buttonText}</button><div class="quiz-bank-meta">${remaining.toLocaleString('id-ID')} soal unik baru tersisa · ${total.toLocaleString('id-ID')} soal unik tersedia · maksimum 500/module</div>`;
  }

  let scheduled=false,forceNext=false;
  function refreshSoon(force=false){forceNext=forceNext||force;if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;const f=forceNext;forceNext=false;cleanUI();moveQuizNavigation();injectQuestionType();injectQuizGenerator(f);});}
  document.addEventListener('DOMContentLoaded',()=>{
    refreshSoon(true);
    const tag=document.getElementById('moduleTag');if(tag)new MutationObserver(()=>refreshSoon()).observe(tag,{childList:true,characterData:true,subtree:true});
    const q=document.getElementById('questionText');if(q)new MutationObserver(()=>refreshSoon()).observe(q,{childList:true,characterData:true,subtree:true});
    const quiz=document.getElementById('quizView');if(quiz)new MutationObserver(()=>refreshSoon()).observe(quiz,{attributes:true,attributeFilter:['class']});
  });
  document.addEventListener('gbp:bank-updated',()=>refreshSoon(true));
  document.addEventListener('click',()=>setTimeout(()=>refreshSoon(),0),{passive:true});
  window.GBPRefreshBankUI=()=>refreshSoon(true);
})();