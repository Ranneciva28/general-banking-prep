(() => {
  const BANK_KEY='generalBankingQuestionBankV6';
  const PROGRESS_KEY='generalBankingModuleProgressV1';
  const BANK_SIZE=5000;
  const ACTIVE_LIMIT=50;
  const ORIGINAL=[...(window.QUESTION_BANK||[])];
  const moduleIds=[...new Set(ORIGINAL.map(q=>Number(q.moduleId)))].filter(Boolean);

  const SUPA_URL='https://pnisrktkkbzspolkfkag.supabase.co';
  const SUPA_KEY='sb_publishable_ClLcjnxymypzS2O6x1TzwA_c9y7-j1Y';
  const SESSION_KEY='gbpAnalyticsSessionV1';
  const sessionId=(()=>{let x=localStorage.getItem(SESSION_KEY);if(!x){x=`${Date.now().toString(36)}-${crypto.getRandomValues(new Uint32Array(2)).join('-')}`;localStorage.setItem(SESSION_KEY,x)}return x})();
  let analyticsCtx={page:'dashboardView',moduleId:null,day:null};
  let locationCache=null;

  const hash=str=>{let h=2166136261;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
  const seeded=(seed,salt=0)=>{let x=(seed+Math.imul(salt+1,0x9e3779b1))>>>0;x^=x<<13;x^=x>>>17;x^=x<<5;return(x>>>0)/4294967296};
  const clean=text=>String(text||'').replace(/\s+/g,' ').trim();
  const shortText=(text,max=120)=>{const s=clean(text);return s.length<=max?s:`${s.slice(0,max).replace(/\s+\S*$/,'')}…`};
  const diffRank=q=>({Sedang:1,'Sedang-Sulit':2,Sulit:3,Challenge:4,Expert:5}[q?.difficulty]||3);
  const learningOrder=arr=>[...arr].sort((a,b)=>diffRank(a)-diffRank(b)||clean(a.question).length-clean(b.question).length||String(a.id).localeCompare(String(b.id)));

  let BANK_STATE={};
  try{BANK_STATE=JSON.parse(localStorage.getItem(BANK_KEY)||'{}')||{}}catch(e){BANK_STATE={}}
  function getState(mid){const r=BANK_STATE[String(mid)]||{};return{epoch:Number(r.epoch)||1,seen:Array.isArray(r.seen)?r.seen:[],active:Array.isArray(r.active)?r.active:[]}}
  function saveState(mid,st){BANK_STATE[String(mid)]=st;localStorage.setItem(BANK_KEY,JSON.stringify(BANK_STATE))}
  function basePool(mid){return ORIGINAL.filter(q=>Number(q.moduleId)===Number(mid))}

  function normalQuestion(base,seed){
    const q=shortText(base.question,135),style=Math.floor(seeded(seed,3)*5);
    if(style<=2)return {...base,question:q,questionType:'Pilihan Ganda'};
    if(style===3)return {...base,question:`${q} Pilih jawaban yang paling tepat.`,questionType:'Pilihan Ganda'};
    return {...base,question:`Manakah jawaban yang paling tepat? ${q}`,questionType:'Pilihan Ganda'};
  }

  function exceptQuestion(base){
    return {...base,question:`${shortText(base.question,120)}\n\nSemua pilihan berikut tidak tepat, KECUALI:`,questionType:'Kecuali'};
  }

  function causeEffectQuestion(base){
    const q=shortText(base.question,105),correct=shortText(base.answer,95),reason=shortText(base.explanation||'',135);
    if(!reason)return normalQuestion(base,1);
    const opts=[
      'Pernyataan benar, alasan benar, dan berhubungan sebab–akibat.',
      'Pernyataan benar, alasan benar, tetapi tidak berhubungan sebab–akibat.',
      'Pernyataan benar, tetapi alasan salah.',
      'Pernyataan salah dan alasan salah.'
    ];
    return {...base,question:`Pertanyaan acuan: ${q}\n\nPernyataan: “${correct}” merupakan jawaban yang tepat.\nAlasan: ${reason}\n\nTentukan hubungan pernyataan dan alasan.`,options:opts,answer:opts[0],explanation:`Jawaban acuan adalah “${clean(base.answer)}”. ${shortText(base.explanation||'',180)}`,questionType:'Sebab–Akibat'};
  }

  function complexQuestion(base,seed){
    const q=shortText(base.question,100),correct=shortText(base.answer,90),wrong=(base.options||[]).filter(x=>clean(x)!==clean(base.answer));
    if(wrong.length<2)return normalQuestion(base,seed);
    const w1=shortText(wrong[Math.floor(seeded(seed,21)*wrong.length)%wrong.length],90),rest=wrong.filter(x=>clean(x)!==clean(w1)),w2=shortText(rest[Math.floor(seeded(seed,22)*rest.length)%rest.length]||wrong[1],90);
    const opts=['1 saja','1 dan 2','2 dan 3','1, 2, dan 3'];
    return {...base,question:`${q}\n\n1. ${correct}\n2. ${w1}\n3. ${w2}\n\nPernyataan yang tepat adalah:`,options:opts,answer:opts[0],explanation:`Pernyataan 1 merupakan jawaban yang tepat. ${shortText(base.explanation||'',170)}`,questionType:'Pilihan Ganda Kompleks'};
  }

  function caseQuestion(base,seed){
    const q=shortText(base.question,145);
    const prefixes=['Seorang nasabah mengalami kondisi berikut.','Unit kerja menghadapi kondisi berikut.','Ditemukan kondisi operasional berikut.','Seorang analis menemukan kondisi berikut.','Perhatikan kasus berikut.'];
    const suffixes=['Tindakan paling tepat adalah:','Kesimpulan paling tepat adalah:','Apa keputusan yang paling tepat?','Manakah analisis yang paling tepat?'];
    return {...base,question:`${prefixes[Math.floor(seeded(seed,31)*prefixes.length)]}\n\n${q}\n\n${suffixes[Math.floor(seeded(seed,32)*suffixes.length)]}`,questionType:'Analisis Kasus'};
  }

  function diversify(base,seed,slot){
    const bucket=(slot-1)%50;
    if(bucket<18)return normalQuestion(base,seed);
    if(bucket<27)return exceptQuestion(base);
    if(bucket<35)return causeEffectQuestion(base);
    if(bucket<43)return complexQuestion(base,seed);
    return caseQuestion(base,seed);
  }

  function bankQuestion(mid,slot,epoch){
    const pool=basePool(mid);if(!pool.length)return null;
    const seed=hash(`${mid}:${slot}:${epoch}`),base=pool[Math.floor(seeded(seed,1)*pool.length)%pool.length],varied=diversify(base,seed,slot);
    return {...varied,id:`BANK-M${mid}-E${epoch}-S${slot}`,source:`${base.source} · Bank ${slot}/${BANK_SIZE}`,difficulty:base.difficulty,generated:true,bankSlot:slot,bankEpoch:epoch,baseId:base.id};
  }

  function applyActivePool(){
    const next=[];
    moduleIds.forEach(mid=>{
      const st=getState(mid);
      const pool=st.active.length?st.active.slice(0,ACTIVE_LIMIT).map(slot=>bankQuestion(mid,slot,st.epoch)).filter(Boolean):basePool(mid).slice(0,ACTIVE_LIMIT);
      next.push(...learningOrder(pool));
    });
    const target=window.QUESTION_BANK||[];target.splice(0,target.length,...next);
  }

  function pickFresh(st,count){
    const seen=new Set(st.seen),picked=[],pickedSet=new Set();let guard=0;
    while(picked.length<count&&guard<10000){const n=1+Math.floor(Math.random()*BANK_SIZE);guard++;if(!seen.has(n)&&!pickedSet.has(n)){picked.push(n);pickedSet.add(n)}}
    if(picked.length<count)for(let n=1;n<=BANK_SIZE&&picked.length<count;n++)if(!seen.has(n)&&!pickedSet.has(n)){picked.push(n);pickedSet.add(n)}
    return picked;
  }

  function clearModuleProgress(mid){
    try{const all=JSON.parse(localStorage.getItem(PROGRESS_KEY)||'{}')||{};delete all[String(mid)];localStorage.setItem(PROGRESS_KEY,JSON.stringify(all))}catch(e){localStorage.removeItem(PROGRESS_KEY)}
    try{window.GBPApp?.clearModuleProgress?.(mid)}catch(e){}
  }

  function generate(mid){
    const btn=document.querySelector('.quiz-generate-btn');if(btn){btn.disabled=true;btn.textContent='Menyiapkan soal baru…'}
    setTimeout(()=>{
      let st=getState(mid);
      if(BANK_SIZE-st.seen.length<ACTIVE_LIMIT)st={epoch:st.epoch+1,seen:[],active:[]};
      const fresh=pickFresh(st,ACTIVE_LIMIT);
      if(fresh.length<ACTIVE_LIMIT){if(btn){btn.disabled=false;btn.textContent='↻ Generate New Questions'}return toast('Bank soal belum bisa menyiapkan 50 soal baru. Coba lagi.')}
      st.active=fresh;st.seen=[...st.seen,...fresh];saveState(mid,st);clearModuleProgress(mid);
      track('generate_questions',{moduleId:mid,day:basePool(mid)[0]?.day||null,questionCount:fresh.length,meta:{bankSize:BANK_SIZE,epoch:st.epoch,seen:st.seen.length}});
      sessionStorage.setItem('gbpAutoOpenModule',String(mid));
      sessionStorage.setItem('gbpGenerationToast','50 soal baru sudah aktif. Urutan dimulai dari yang lebih mudah dan ringkas.');
      location.reload();
    },30);
  }

  function bankInfo(mid){const st=getState(mid);return{active:st.active.length,seen:st.seen.length,remaining:Math.max(0,BANK_SIZE-st.seen.length)}}
  function toast(msg){const el=document.getElementById('toast');if(!el)return;el.textContent=msg;el.classList.remove('hidden');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.add('hidden'),3000)}

  function deviceInfo(){const ua=navigator.userAgent||'';return{device:/Android|iPhone|iPad|Mobile/i.test(ua)?'Mobile':'Desktop',browser:/Edg\//.test(ua)?'Edge':/Chrome\//.test(ua)?'Chrome':/Safari\//.test(ua)&&!/Chrome\//.test(ua)?'Safari':/Firefox\//.test(ua)?'Firefox':'Other',os:/Windows/i.test(ua)?'Windows':/Android/i.test(ua)?'Android':/iPhone|iPad|iOS/i.test(ua)?'iOS':/Mac OS/i.test(ua)?'macOS':/Linux/i.test(ua)?'Linux':'Other'}}
  async function track(type,extra={}){const d=deviceInfo();try{await fetch(`${SUPA_URL}/rest/v1/rpc/gbp_track_event`,{method:'POST',headers:{'Content-Type':'application/json','apikey':SUPA_KEY},body:JSON.stringify({p_session_id:sessionId,p_event_type:type,p_page:extra.page??analyticsCtx.page,p_module_id:extra.moduleId??analyticsCtx.moduleId,p_day:extra.day??analyticsCtx.day,p_question_count:Math.min(50,Math.max(0,Number(extra.questionCount)||0)),p_device_type:d.device,p_browser:d.browser,p_os:d.os,p_language:navigator.language||null,p_timezone:Intl.DateTimeFormat().resolvedOptions().timeZone||null,p_screen:`${screen.width}x${screen.height}`,p_latitude:locationCache?.latitude??null,p_longitude:locationCache?.longitude??null,p_referrer:document.referrer||null,p_meta:extra.meta||{}}),keepalive:true})}catch(e){}}
  window.GBPAnalytics={track,setContext:(next={})=>{analyticsCtx={...analyticsCtx,...next};track('view_change',next)},sessionId};
  window.GBPQuestionBank={generate,bankInfo,BANK_SIZE,ACTIVE_LIMIT};

  function cleanUI(){
    const bridge=document.getElementById('bridgeLockedNav');if(bridge)bridge.style.display='none';
    const side=document.querySelector('.sidebar-study-card');if(side)side.style.display='none';
    const profile=document.querySelector('.profile-chip');if(profile)profile.style.display='none';
    const footer=document.querySelector('.footer');if(footer&&footer.textContent!=='Data tersimpan lokal di perangkat ini')footer.textContent='Data tersimpan lokal di perangkat ini';
    const quick=document.querySelector('.quick-actions');if(quick){quick.querySelectorAll('.quick-card:not(#weaknessDrillBtn)').forEach(x=>x.style.display='none');const title=quick.closest('.section-block')?.querySelector('.section-title-row');if(title)title.style.display='none';quick.classList.add('weakness-only-grid')}
    document.querySelectorAll('.module-bank-box,.setup-bank-inline').forEach(x=>x.remove());
  }

  function currentQuestion(){const text=document.getElementById('questionText')?.textContent?.trim();if(!text)return null;return (window.QUESTION_BANK||[]).find(x=>clean(x.question)===clean(text))||null}
  function currentModuleId(){const name=document.getElementById('moduleTag')?.textContent?.trim();if(!name)return null;const q=(window.QUESTION_BANK||[]).find(x=>x.moduleName===name);return q?Number(q.moduleId):null}

  function injectQuestionType(){
    const quiz=document.querySelector('#quizView.active');if(!quiz)return;
    const q=currentQuestion(),status=quiz.querySelector('.quiz-status');if(!status)return;
    let badge=status.querySelector('.question-type-status');
    if(!q?.questionType){if(badge)badge.remove();return}
    if(!badge){
      badge=document.createElement('div');
      badge.className='question-type-status';
      const timer=status.querySelector('.status-metric');
      if(timer)status.insertBefore(badge,timer);else status.appendChild(badge);
    }
    if(badge.dataset.type===q.questionType)return;
    badge.dataset.type=q.questionType;
    badge.innerHTML=`<small>Jenis Soal</small><strong>${q.questionType}</strong>`;
  }

  function injectQuizGenerator(){
    const quiz=document.getElementById('quizView');if(!quiz?.classList.contains('active'))return;
    const card=quiz.querySelector('.module-info-card'),mid=currentModuleId();if(!card||!mid)return;
    const info=bankInfo(mid);let box=card.querySelector('.quiz-generate-box');if(!box){box=document.createElement('div');box.className='quiz-generate-box';card.appendChild(box)}
    const sig=`${mid}:${info.seen}:${info.remaining}`;if(box.dataset.sig===sig)return;box.dataset.sig=sig;
    box.innerHTML=`<div class="quiz-generate-copy"><span>QUESTION BANK</span><strong>Butuh set soal baru?</strong><small>Ganti seluruh pool dengan 50 soal baru. Progress modul ini akan direset.</small></div><button type="button" class="quiz-generate-btn">↻ Generate New Questions</button><div class="quiz-bank-meta">${info.seen.toLocaleString('id-ID')} pernah dimuat · ${info.remaining.toLocaleString('id-ID')} belum muncul</div>`;
    box.querySelector('button').onclick=()=>{if(confirm('Generate 50 soal baru? Progress pengerjaan modul ini akan direset dan soal aktif sekarang akan diganti.'))generate(mid)};
  }

  applyActivePool();
  // Modul dipelajari berurutan: mudah/ringkas lebih dulu. User tetap bisa mengaktifkan randomisasi manual dari Quiz Setup.
  const shuffleToggle=document.getElementById('shuffleQuestions');if(shuffleToggle)shuffleToggle.checked=false;
  track(location.pathname.includes('/khusus/')?'bridge_open':'page_view');
  setInterval(()=>track('heartbeat'),45000);
  try{navigator.permissions?.query({name:'geolocation'}).then(p=>{if(p.state==='granted')navigator.geolocation?.getCurrentPosition(pos=>{locationCache={latitude:Number(pos.coords.latitude.toFixed(5)),longitude:Number(pos.coords.longitude.toFixed(5))};track('heartbeat')},()=>{},{maximumAge:600000,timeout:3000})}).catch(()=>{})}catch(e){}

  document.addEventListener('DOMContentLoaded',()=>{
    cleanUI();injectQuestionType();injectQuizGenerator();
    const msg=sessionStorage.getItem('gbpGenerationToast');if(msg){sessionStorage.removeItem('gbpGenerationToast');setTimeout(()=>toast(msg),450)}
    const auto=Number(sessionStorage.getItem('gbpAutoOpenModule'));if(auto){sessionStorage.removeItem('gbpAutoOpenModule');setTimeout(()=>window.GBPApp?.startModule?.(auto),120)}
    const qText=document.getElementById('questionText'),mTag=document.getElementById('moduleTag');
    if(qText)new MutationObserver(()=>requestAnimationFrame(injectQuestionType)).observe(qText,{childList:true,characterData:true,subtree:true});
    if(mTag)new MutationObserver(()=>requestAnimationFrame(injectQuizGenerator)).observe(mTag,{childList:true,characterData:true,subtree:true});
    document.addEventListener('click',e=>{if(e.target.closest('[data-module-start],#startQuizBtn,[data-view="quizView"]'))setTimeout(()=>{injectQuestionType();injectQuizGenerator()},80)},{passive:true});
  });
})();
