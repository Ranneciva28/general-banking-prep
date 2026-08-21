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
  const sentence=text=>{const s=clean(text);return /[.!?]$/.test(s)?s:`${s}.`};
  const shortText=(text,max=120)=>{const s=clean(text);return s.length<=max?s:`${s.slice(0,max).replace(/\s+\S*$/,'')}…`};

  function stateAll(){try{return JSON.parse(localStorage.getItem(BANK_KEY)||'{}')||{}}catch(e){return{}}}
  function getState(mid){const all=stateAll(),r=all[String(mid)]||{};return{epoch:Number(r.epoch)||1,seen:Array.isArray(r.seen)?r.seen:[],active:Array.isArray(r.active)?r.active:[]}}
  function saveState(mid,st){const all=stateAll();all[String(mid)]=st;localStorage.setItem(BANK_KEY,JSON.stringify(all))}
  function basePool(mid){return ORIGINAL.filter(q=>Number(q.moduleId)===Number(mid))}

  function normalQuestion(base,seed){
    const q=clean(base.question);
    const style=Math.floor(seeded(seed,3)*6);
    if(style<=2)return {...base,question:q,questionType:'Pilihan Ganda'};
    if(style===3)return {...base,question:`${q} Pilih jawaban yang paling tepat.`,questionType:'Pilihan Ganda'};
    if(style===4)return {...base,question:`Manakah jawaban yang paling tepat? ${q}`,questionType:'Pilihan Ganda'};
    return {...base,question:`${shortText(q,170)}`,questionType:'Pilihan Ganda'};
  }

  function exceptQuestion(base){
    const q=clean(base.question);
    return {
      ...base,
      question:`${q}\n\nDi antara pilihan berikut, semuanya merupakan jawaban yang kurang tepat, KECUALI:`,
      questionType:'Kecuali'
    };
  }

  function causeEffectQuestion(base){
    const q=clean(base.question),correct=clean(base.answer),reason=clean(base.explanation||'');
    if(!reason)return normalQuestion(base,1);
    const reasonShort=shortText(reason,220);
    const opts=[
      'Pernyataan benar, alasan benar, dan alasan mendukung pernyataan.',
      'Pernyataan benar, alasan benar, tetapi alasan tidak mendukung pernyataan.',
      'Pernyataan benar, tetapi alasan salah.',
      'Pernyataan salah dan alasan salah.'
    ];
    return {
      ...base,
      question:`Hubungan sebab–akibat\n\nPertanyaan acuan: ${q}\n\nPernyataan: Jawaban yang paling tepat adalah “${correct}”.\nAlasan: ${reasonShort}\n\nTentukan hubungan antara pernyataan dan alasan tersebut.`,
      options:opts,
      answer:opts[0],
      explanation:`Jawaban acuan adalah “${correct}”. Pembahasan materi mendukung jawaban tersebut: ${reasonShort}`,
      questionType:'Sebab–Akibat'
    };
  }

  function complexQuestion(base,seed){
    const q=clean(base.question),correct=clean(base.answer);
    const wrong=(base.options||[]).filter(x=>clean(x)!==correct);
    if(wrong.length<2)return normalQuestion(base,seed);
    const w1=clean(wrong[Math.floor(seeded(seed,21)*wrong.length)%wrong.length]);
    const rest=wrong.filter(x=>clean(x)!==w1);
    const w2=clean(rest[Math.floor(seeded(seed,22)*rest.length)%rest.length]||wrong[1]);
    const opts=['1 saja','1 dan 2','2 dan 3','1, 2, dan 3'];
    return {
      ...base,
      question:`Pilihan ganda kompleks\n\n${q}\n\nPerhatikan alternatif berikut:\n1. ${correct}\n2. ${w1}\n3. ${w2}\n\nPernyataan yang tepat sebagai jawaban atas pertanyaan tersebut adalah:`,
      options:opts,
      answer:opts[0],
      explanation:`Pernyataan 1 memuat jawaban yang tepat berdasarkan materi. Pernyataan 2 dan 3 merupakan distraktor yang tidak paling tepat untuk menjawab stem tersebut. ${clean(base.explanation||'')}`,
      questionType:'Pilihan Ganda Kompleks'
    };
  }

  function caseQuestion(base,seed){
    const q=clean(base.question);
    const prefixes=[
      'Seorang nasabah menyampaikan kondisi berikut kepada petugas bank.',
      'Unit kerja menghadapi situasi berikut.',
      'Dalam proses operasional ditemukan kondisi berikut.',
      'Seorang analis memperoleh informasi berikut.',
      'Perhatikan kasus berikut.'
    ];
    const suffixes=[
      'Tindakan atau kesimpulan yang paling tepat adalah:',
      'Berdasarkan prinsip yang berlaku, jawaban paling tepat adalah:',
      'Apa keputusan yang paling tepat?',
      'Manakah analisis yang paling tepat?'
    ];
    return {
      ...base,
      question:`${prefixes[Math.floor(seeded(seed,31)*prefixes.length)]}\n\n${q}\n\n${suffixes[Math.floor(seeded(seed,32)*suffixes.length)]}`,
      questionType:'Analisis Kasus'
    };
  }

  function diversify(base,seed,slot){
    // Distribusi per 50 soal kira-kira: 15 biasa, 9 kecuali, 9 sebab-akibat, 9 kompleks, 8 kasus.
    const bucket=(slot-1)%50;
    if(bucket<15)return normalQuestion(base,seed);
    if(bucket<24)return exceptQuestion(base);
    if(bucket<33)return causeEffectQuestion(base);
    if(bucket<42)return complexQuestion(base,seed);
    return caseQuestion(base,seed);
  }

  function bankQuestion(mid,slot,epoch){
    const pool=basePool(mid);if(!pool.length)return null;
    const seed=hash(`${mid}:${slot}:${epoch}`);
    const base=pool[Math.floor(seeded(seed,1)*pool.length)%pool.length];
    const varied=diversify(base,seed,slot);
    return {
      ...varied,
      id:`BANK-M${mid}-E${epoch}-S${slot}`,
      source:`${base.source} · Bank ${slot}/${BANK_SIZE}`,
      difficulty:base.difficulty,
      generated:true,
      bankSlot:slot,
      bankEpoch:epoch,
      baseId:base.id
    };
  }

  function applyActivePool(){
    const next=[];
    moduleIds.forEach(mid=>{
      const st=getState(mid);
      if(st.active.length){
        st.active.slice(0,ACTIVE_LIMIT).forEach(slot=>{const q=bankQuestion(mid,slot,st.epoch);if(q)next.push(q)});
      }else next.push(...basePool(mid).slice(0,ACTIVE_LIMIT));
    });
    const target=window.QUESTION_BANK||[];
    target.splice(0,target.length,...next);
  }

  function pickFresh(st,count){
    const seen=new Set(st.seen),picked=[];let guard=0;
    while(picked.length<count&&guard<50000){const n=1+Math.floor(Math.random()*BANK_SIZE);guard++;if(!seen.has(n)&&!picked.includes(n))picked.push(n)}
    if(picked.length<count)for(let n=1;n<=BANK_SIZE&&picked.length<count;n++)if(!seen.has(n)&&!picked.includes(n))picked.push(n);
    return picked;
  }

  function clearModuleProgress(mid){
    try{const all=JSON.parse(localStorage.getItem(PROGRESS_KEY)||'{}')||{};delete all[String(mid)];localStorage.setItem(PROGRESS_KEY,JSON.stringify(all))}catch(e){localStorage.removeItem(PROGRESS_KEY)}
    try{window.GBPApp?.clearModuleProgress?.(mid)}catch(e){}
  }

  function generate(mid){
    let st=getState(mid);
    if(BANK_SIZE-st.seen.length<ACTIVE_LIMIT)st={epoch:st.epoch+1,seen:[],active:[]};
    const fresh=pickFresh(st,ACTIVE_LIMIT);
    if(fresh.length<ACTIVE_LIMIT)return toast('Bank soal belum bisa menyiapkan 50 soal baru. Coba lagi.');
    st.active=fresh;st.seen=[...st.seen,...fresh];saveState(mid,st);clearModuleProgress(mid);
    track('generate_questions',{moduleId:mid,day:basePool(mid)[0]?.day||null,questionCount:fresh.length,meta:{bankSize:BANK_SIZE,epoch:st.epoch,seen:st.seen.length}});
    sessionStorage.setItem('gbpAutoOpenModule',String(mid));
    sessionStorage.setItem('gbpGenerationToast','50 soal baru dengan format campuran sudah aktif. Progress modul direset.');
    location.reload();
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
    const footer=document.querySelector('.footer');if(footer)footer.textContent='Data tersimpan lokal di perangkat ini';
    const quick=document.querySelector('.quick-actions');if(quick){quick.querySelectorAll('.quick-card:not(#weaknessDrillBtn)').forEach(x=>x.style.display='none');const title=quick.closest('.section-block')?.querySelector('.section-title-row');if(title)title.style.display='none';quick.classList.add('weakness-only-grid')}
    document.querySelectorAll('.module-bank-box,.setup-bank-inline').forEach(x=>x.remove());
  }

  function currentQuestion(){
    const text=document.getElementById('questionText')?.textContent?.trim();
    if(!text)return null;
    return (window.QUESTION_BANK||[]).find(x=>clean(x.question)===clean(text))||null;
  }
  function currentModuleId(){const name=document.getElementById('moduleTag')?.textContent?.trim();if(!name)return null;const q=(window.QUESTION_BANK||[]).find(x=>x.moduleName===name);return q?Number(q.moduleId):null}

  function injectQuestionType(){
    const panel=document.querySelector('#quizView.active .question-panel');if(!panel)return;
    const q=currentQuestion();if(!q?.questionType)return;
    let badge=panel.querySelector('.question-type-badge');
    if(!badge){badge=document.createElement('span');badge.className='question-type-badge';panel.querySelector('.question-heading-row')?.appendChild(badge)}
    badge.textContent=q.questionType;
  }

  function injectQuizGenerator(){
    const quiz=document.getElementById('quizView');if(!quiz?.classList.contains('active'))return;
    const card=quiz.querySelector('.module-info-card'),mid=currentModuleId();if(!card||!mid)return;
    const info=bankInfo(mid);let box=card.querySelector('.quiz-generate-box');if(!box){box=document.createElement('div');box.className='quiz-generate-box';card.appendChild(box)}
    const sig=`${mid}:${info.seen}:${info.remaining}`;if(box.dataset.sig===sig)return;box.dataset.sig=sig;
    box.innerHTML=`<div class="quiz-generate-copy"><span>QUESTION BANK</span><strong>Butuh set soal baru?</strong><small>Ganti seluruh pool dengan 50 soal baru dan format campuran. Progress modul ini akan direset.</small></div><button type="button" class="quiz-generate-btn">↻ Generate New Questions</button><div class="quiz-bank-meta">${info.seen.toLocaleString('id-ID')} pernah dimuat · ${info.remaining.toLocaleString('id-ID')} belum muncul</div>`;
    box.querySelector('button').onclick=()=>{if(confirm('Generate 50 soal baru? Progress pengerjaan modul ini akan direset dan soal aktif sekarang akan diganti.'))generate(mid)};
  }
  function inject(){cleanUI();injectQuestionType();injectQuizGenerator()}

  applyActivePool();
  track(location.pathname.includes('/khusus/')?'bridge_open':'page_view');
  setInterval(()=>track('heartbeat'),45000);
  try{navigator.permissions?.query({name:'geolocation'}).then(p=>{if(p.state==='granted')navigator.geolocation?.getCurrentPosition(pos=>{locationCache={latitude:Number(pos.coords.latitude.toFixed(5)),longitude:Number(pos.coords.longitude.toFixed(5))};track('heartbeat')},()=>{},{maximumAge:600000,timeout:3000})}).catch(()=>{})}catch(e){}

  document.addEventListener('DOMContentLoaded',()=>{
    inject();
    const msg=sessionStorage.getItem('gbpGenerationToast');if(msg){sessionStorage.removeItem('gbpGenerationToast');setTimeout(()=>toast(msg),450)}
    const auto=Number(sessionStorage.getItem('gbpAutoOpenModule'));if(auto){sessionStorage.removeItem('gbpAutoOpenModule');setTimeout(()=>window.GBPApp?.startModule?.(auto),120)}
    const root=document.querySelector('.content');if(root)new MutationObserver(()=>inject()).observe(root,{childList:true,subtree:true});
  });
})();
