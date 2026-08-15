(() => {
  const Q = window.QUESTION_BANK || [];
  const MODULES = [...new Map(Q.map(q => [q.moduleId, {name:q.moduleName,day:q.day}])).entries()].map(([id,v]) => ({
    id, name:v.name, day:v.day, count:Q.filter(q=>q.moduleId===id).length
  })).sort((a,b)=>a.id-b.id);
  const DAYS = [1,2,3,4,5].map(day=>({day, count:Q.filter(q=>q.day===day).length, modules:MODULES.filter(m=>m.day===day).length}));
  const STORAGE_KEY = 'generalBankingPrepV3';
  const LEGACY_KEY = 'generalBankingPrepV2';
  const iconMap = {1:'🏦',2:'💳',3:'💰',4:'⚖️',5:'◎',6:'🚀',7:'💬',8:'🎓',9:'🛎️',10:'🪪',11:'↔️',12:'🗂️',13:'💱',14:'🌐',15:'📊',16:'🏛️',17:'🛡️',18:'🔎',19:'⛑️',20:'🔐',21:'👤',22:'⚖️',23:'🧱',24:'🚨'};
  const dayLabels = {1:'Fundamental',2:'Customer & Ops',3:'Technical Banking',4:'Risk & Compliance',5:'Governance & AML'};

  const state = {
    selectedModules: new Set(MODULES.map(m => m.id)), selectedDay:1, setupDay:1, mode:'practice', quiz:[], index:0,
    answers:[], correct:0, currentOptions:[], selectedCurrent:null, answeredCurrent:false,
    flagged:new Set(), startedAt:null, elapsedSeconds:0, timerId:null, sourcePool:[], lastSession:null
  };

  const defaultData = () => ({
    answered:0, correct:0, wrongIds:[], bookmarks:[], byModule:{}, history:[], notes:{}, theme:'light', streak:1,
    lastStudyDate:null, lastSession:null, dailyAnswered:{}, sessionsCompleted:0
  });

  function loadData(){
    try{
      const current = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if(current) return {...defaultData(), ...current};
      const legacy = JSON.parse(localStorage.getItem(LEGACY_KEY) || 'null');
      if(legacy) return {...defaultData(), ...legacy};
    }catch(e){}
    return defaultData();
  }
  let data = loadData();
  const $ = id => document.getElementById(id);
  const pct = (a,b) => b ? Math.round((a/b)*100) : 0;
  const clamp = (n,min,max) => Math.max(min,Math.min(max,n));
  const shuffle = arr => { const a=[...arr]; for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };
  const dateKey = (d=new Date()) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  const formatDuration = sec => `${Math.floor(sec/60)}m ${sec%60}d`;
  const escapeHtml = str => String(str ?? '').replace(/[&<>"]/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[s]));

  function saveData(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
  function updateStreak(){
    const today=dateKey(), last=data.lastStudyDate;
    if(!last){ data.streak=1; data.lastStudyDate=today; saveData(); return; }
    if(last===today) return;
    const d1=new Date(last+'T00:00:00'), d2=new Date(today+'T00:00:00');
    const diff=Math.round((d2-d1)/86400000);
    data.streak=diff===1?(data.streak||1)+1:1; data.lastStudyDate=today; saveData();
  }
  updateStreak();

  function setTheme(theme){
    data.theme=theme; document.documentElement.dataset.theme=theme==='dark'?'dark':'';
    $('themeToggle').textContent=theme==='dark'?'☀':'☾'; saveData();
  }
  setTheme(data.theme||'light');

  function toast(msg){ const el=$('toast'); el.textContent=msg; el.classList.remove('hidden'); clearTimeout(toast.t); toast.t=setTimeout(()=>el.classList.add('hidden'),2200); }
  function setActiveNav(viewId){ document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.view===viewId)); }
  function showView(viewId){
    stopTimerIfLeaving(viewId);
    document.querySelectorAll('.view').forEach(v=>v.classList.remove('active')); const v=$(viewId); if(v) v.classList.add('active');
    setActiveNav(viewId); window.scrollTo({top:0,behavior:'smooth'}); closeSidebar();
    if(viewId==='dashboardView') renderDashboard();
    if(viewId==='quizSetupView') renderSetup();
    if(viewId==='reviewView') renderReviewPage();
    if(viewId==='bookmarksView') renderBookmarks();
    if(viewId==='statisticsView') renderStatistics();
  }
  function stopTimerIfLeaving(viewId){ if(viewId!=='quizView' && state.timerId){ clearInterval(state.timerId); state.timerId=null; } }
  function closeSidebar(){ $('sidebar').classList.remove('open'); $('sidebarBackdrop').classList.add('hidden'); }

  function moduleStats(mid){ const s=data.byModule?.[mid]||{answered:0,correct:0}; return {...s,accuracy:pct(s.correct,s.answered)}; }
  function weakestModule(){
    const withData=MODULES.map(m=>({...m,...moduleStats(m.id)})).filter(x=>x.answered>0);
    return withData.length?withData.sort((a,b)=>a.accuracy-b.accuracy)[0]:null;
  }
  function strongestModule(){
    const withData=MODULES.map(m=>({...m,...moduleStats(m.id)})).filter(x=>x.answered>0);
    return withData.length?withData.sort((a,b)=>b.accuracy-a.accuracy)[0]:null;
  }
  function avgDifficulty(mid){ const arr=Q.filter(q=>q.moduleId===mid); const map={Sedang:2,'Sedang-Sulit':2.5,Sulit:3,Challenge:4,Expert:5}; const avg=arr.reduce((sum,q)=>sum+(map[q.difficulty]||3),0)/(arr.length||1); return avg>=4.05?'Expert':avg>=3.35?'Challenge':avg>=2.75?'Sulit':'Sedang-Sulit'; }
  function diffDots(label){ const n=(label==='Challenge'||label==='Expert')?4:label.includes('Sulit')?3:2; return '●'.repeat(n)+'○'.repeat(4-n); }

  function renderDayTabs(containerId, activeDay, handler){
    const el=$(containerId); if(!el) return;
    el.innerHTML=DAYS.map(d=>`<button class="day-tab ${d.day===activeDay?'active':''}" data-daytab="${d.day}">Day ${d.day}<small>${d.modules} modul · ${d.count} soal</small></button>`).join('');
    el.querySelectorAll('[data-daytab]').forEach(b=>b.addEventListener('click',()=>handler(Number(b.dataset.daytab))));
  }
  function dayPool(day){ return Q.filter(q=>q.day===day); }
  function hardSample(pool,count){
    const src=[...pool], experts=shuffle(src.filter(q=>q.difficulty==='Expert')), challenges=shuffle(src.filter(q=>q.difficulty==='Challenge')), others=shuffle(src.filter(q=>q.difficulty!=='Expert'&&q.difficulty!=='Challenge'));
    const target=Math.min(count,src.length), expertTarget=Math.min(experts.length,Math.max(1,Math.ceil(target*0.4)));
    const picked=[...experts.slice(0,expertTarget)];
    const remaining=target-picked.length; picked.push(...challenges.slice(0,remaining));
    if(picked.length<target){ const used=new Set(picked.map(q=>q.id)); picked.push(...others.filter(q=>!used.has(q.id)).slice(0,target-picked.length)); }
    return shuffle(picked);
  }
  function renderDashboard(){
    const accuracy=pct(data.correct||0,data.answered||0), todayCount=data.dailyAnswered?.[dateKey()]||0, day=state.selectedDay;
    const dayQuestions=dayPool(day), dayModules=MODULES.filter(m=>m.day===day);
    $('sideQuestionCount').textContent=Q.length; $('heroTotalQuestions').textContent=Q.length; $('heroAnswered').textContent=data.answered||0;
    $('streakCount').textContent=data.streak||1; $('heroStreak').textContent=data.streak||1; $('dashboardAccuracy').textContent=accuracy+'%';
    $('accuracyProgress').style.width=accuracy+'%'; $('bookmarkCount').textContent=(data.bookmarks||[]).length;
    $('heroTitle').textContent=`General Banking · Day ${day}`; $('heroDescription').textContent=`${dayLabels[day]} · ${dayModules.length} modul, ${dayQuestions.length} soal. Mayoritas soal berbasis kasus, aplikasi, dan analisis.`;
    $('moduleSectionTitle').textContent=`Modul Day ${day}`;
    renderDayTabs('dayTabs',day,d=>{state.selectedDay=d;renderDashboard();});
    const target=25, progress=clamp(Math.round(todayCount/target*100),0,100); $('todayProgress').textContent=progress+'%'; $('todayDonut').style.setProperty('--pct',`${progress*3.6}deg`);
    $('dashboardModuleGrid').innerHTML=dayModules.map((m,i)=>{
      const ms=moduleStats(m.id), diff=avgDifficulty(m.id);
      return `<article class="module-display-card"><div class="module-card-top"><span class="module-number">D${day} · ${String(i+1).padStart(2,'0')}</span></div><div class="module-symbol m${((m.id-1)%6)+1}">${iconMap[m.id]||'📘'}</div><h3>${escapeHtml(m.name)}</h3><p>${m.count} Soal${ms.answered?` · ${ms.accuracy}% akurasi`:''}</p><div class="difficulty-mini"><span class="dots">${diffDots(diff)}</span>${diff}</div><button class="module-start" data-module-start="${m.id}">Mulai</button></article>`;
    }).join('');
    document.querySelectorAll('[data-module-start]').forEach(b=>b.addEventListener('click',()=>beginQuiz({pool:Q.filter(q=>q.moduleId===Number(b.dataset.moduleStart)),count:'all',mode:'practice'})));
    const weak=weakestModule();
    $('weakestModule').textContent=weak?`Day ${weak.day} · ${weak.name}`:'Belum ada data'; $('weakestDetail').textContent=weak?`Akurasi ${weak.accuracy}% · ${weak.correct}/${weak.answered} jawaban benar. Disarankan ulangi latihan modul ini.`:'Kerjakan beberapa soal untuk mendapatkan rekomendasi.';
    $('weaknessDrillBtn').disabled=!(data.wrongIds||[]).length; $('resultWeaknessBtn').disabled=!(data.wrongIds||[]).length;
    const histories=data.history||[]; $('accuracyDelta').textContent=histories.length>1?trendText(histories):'Mulai latihan untuk membangun data.'; renderMiniTrend(histories);
  }
  function trendText(hist){ const last=hist[0], prev=hist[1]; if(!last||!prev) return 'Data performa mulai terkumpul.'; const d=last.score-prev.score; return d===0?'Stabil dari sesi sebelumnya.':`${d>0?'↑':'↓'} ${Math.abs(d)}% dari sesi sebelumnya`; }
  function renderMiniTrend(hist){
    const el=$('miniTrend'); const vals=[...hist].slice(0,6).reverse().map(h=>h.score); if(vals.length<2){ el.innerHTML=''; return; }
    const pts=vals.map((v,i)=>`${(i/(vals.length-1))*100},${60-(v/100)*50}`).join(' '); el.innerHTML=`<svg viewBox="0 0 100 65" preserveAspectRatio="none"><polyline points="${pts}" fill="none" stroke="#2d62ee" stroke-width="2" vector-effect="non-scaling-stroke"/><circle cx="100" cy="${60-(vals.at(-1)/100)*50}" r="3" fill="#2d62ee"/></svg>`;
  }

  function renderSetup(){
    renderDayTabs('setupDayTabs',state.setupDay,d=>{state.setupDay=d;renderSetup();});
    const mods=MODULES.filter(m=>m.day===state.setupDay);
    $('moduleGrid').innerHTML=mods.map((m,i)=>`<button class="setup-module-card ${state.selectedModules.has(m.id)?'selected':''}" data-module="${m.id}"><span class="sm-symbol">${iconMap[m.id]||'📘'}</span><div><strong>${escapeHtml(m.name)}</strong><small>${m.count} soal · ${avgDifficulty(m.id)}</small></div><span class="checkmark">${state.selectedModules.has(m.id)?'✓':''}</span></button>`).join('');
    document.querySelectorAll('.setup-module-card').forEach(card=>card.addEventListener('click',()=>{ const id=Number(card.dataset.module); state.selectedModules.has(id)?state.selectedModules.delete(id):state.selectedModules.add(id); renderSetup(); }));
    const chosen=state.selectedModules.size; $('selectAllBtn').textContent=chosen===MODULES.length?'Kosongkan Semua':`Pilih Semua (${chosen}/${MODULES.length})`;
  }


  function beginQuiz({pool=null,count=null,mode=null}={}){
    let source=pool||Q.filter(q=>state.selectedModules.has(q.moduleId)); if(!source.length){ toast('Pilih minimal satu modul dulu.'); showView('quizSetupView'); return; }
    const chosenMode=mode||state.mode; let n=count??$('questionCount').value; if(n==='all') n=source.length; else n=Math.min(Number(n),source.length);
    const shuffleQ=$('shuffleQuestions')?.checked!==false; source=shuffleQ?shuffle(source):[...source];
    state.quiz=source.slice(0,n); state.sourcePool=[...source]; state.index=0; state.answers=[]; state.correct=0; state.mode=chosenMode; state.flagged=new Set(); state.startedAt=new Date(); state.elapsedSeconds=0;
    showView('quizView'); startTimer(); renderQuestion();
  }
  function startTimer(){ if(state.timerId) clearInterval(state.timerId); $('timerText').textContent='00:00'; state.timerId=setInterval(()=>{ state.elapsedSeconds++; const m=String(Math.floor(state.elapsedSeconds/60)).padStart(2,'0'), s=String(state.elapsedSeconds%60).padStart(2,'0'); $('timerText').textContent=`${m}:${s}`; },1000); }
  function answerFor(index){ return state.answers.find(a=>a.index===index); }

  function renderQuestion(){
    const q=state.quiz[state.index]; if(!q) return;
    const existing=answerFor(state.index); state.answeredCurrent=!!existing; state.selectedCurrent=existing?.selected||null;
    $('quizModeTitle').textContent=state.mode==='practice'?'Practice Mode':'Exam Mode'; $('quizModeSubtitle').textContent=state.mode==='practice'?'Belajar santai dengan feedback langsung':'Simulasi ujian tanpa feedback selama sesi';
    $('questionCounter').textContent=`Soal ${state.index+1} dari ${state.quiz.length}`; $('questionBadge').textContent=`Soal ${state.index+1}`; const prog=Math.round((state.index/state.quiz.length)*100); $('progressPercent').textContent=prog+'%'; $('progressBar').style.width=prog+'%';
    $('liveScore').textContent=pct(state.correct,state.answers.filter(a=>!a.skipped).length)+'%'; $('liveCorrect').textContent=`${state.correct} benar`;
    $('breadcrumbDay').textContent=`Day ${q.day}`; $('breadcrumbModule').textContent=q.moduleName; $('moduleTag').textContent=q.moduleName; const dayMods=MODULES.filter(m=>m.day===q.day); const pos=dayMods.findIndex(m=>m.id===q.moduleId)+1; $('modulePosition').textContent=`Day ${q.day} · Modul ${pos} dari ${dayMods.length}`; $('quizModuleIcon').textContent=iconMap[q.moduleId]||'📘';
    $('difficultyTag').textContent=q.difficulty||'Sedang'; $('difficultyDots').textContent=diffDots(q.difficulty||'Sedang'); $('questionText').textContent=q.question;
    $('markQuestionBtn').classList.toggle('active',state.flagged.has(state.index)); $('markQuestionBtn').innerHTML=state.flagged.has(state.index)?'◆ Ditandai':'♧ Tandai soal';
    const bookmarked=(data.bookmarks||[]).includes(q.id); $('bookmarkBtn').textContent=bookmarked?'★ Tersimpan':'♧ Bookmark';
    const shuffleOpt=$('shuffleOptions')?.checked!==false;
    if(!existing || !state.currentOptions.length || state.currentOptionsQ!==q.id){ state.currentOptions=shuffleOpt?shuffle(q.options):[...q.options]; state.currentOptionsQ=q.id; }
    $('optionsList').innerHTML=state.currentOptions.map((opt,i)=>`<button class="option-btn ${existing&&existing.selected===opt?'selected':''}" data-opt-index="${i}"><span class="option-letter">${String.fromCharCode(65+i)}</span><span>${escapeHtml(opt)}</span></button>`).join('');
    document.querySelectorAll('.option-btn').forEach(btn=>btn.addEventListener('click',()=>selectAnswer(state.currentOptions[Number(btn.dataset.optIndex)])));
    renderAnswerState(existing,q); renderNavigator(); loadNote(q.id); $('prevBtn').disabled=state.index===0; $('nextBtn').textContent=state.index===state.quiz.length-1?'Selesai →':'Selanjutnya →';
  }
  function renderAnswerState(existing,q){
    const fb=$('feedbackBox'); fb.className='feedback-panel hidden'; fb.innerHTML='';
    document.querySelectorAll('.option-btn').forEach(b=>{ b.disabled=false; b.classList.remove('correct','wrong'); });
    if(!existing) return;
    document.querySelectorAll('.option-btn').forEach((b,i)=>{ const opt=state.currentOptions[i]; b.disabled=true; if(state.mode==='practice'){ if(opt===q.answer)b.classList.add('correct'); if(opt===existing.selected&&!existing.isCorrect&&!existing.skipped)b.classList.add('wrong'); } });
    if(state.mode==='practice' && !existing.skipped){ fb.classList.remove('hidden'); fb.classList.add(existing.isCorrect?'correct':'wrong'); fb.innerHTML=`<strong>${existing.isCorrect?'✓ Benar':'✕ Belum tepat'}</strong><div><b>Jawaban:</b> ${escapeHtml(q.answer)}<br>${escapeHtml(q.explanation)}<br><small>${escapeHtml(q.source)}</small></div>`; }
  }
  function selectAnswer(selected){
    if(answerFor(state.index)) return;
    const q=state.quiz[state.index], isCorrect=selected===q.answer; if(isCorrect) state.correct++;
    state.answers.push({index:state.index,id:q.id,question:q.question,day:q.day,moduleId:q.moduleId,moduleName:q.moduleName,selected,correctAnswer:q.answer,isCorrect,skipped:false,explanation:q.explanation,source:q.source,difficulty:q.difficulty});
    recordStat(q,isCorrect); renderQuestion(); if(state.mode==='exam') setTimeout(nextQuestion,120);
  }
  function skipQuestion(){ if(!answerFor(state.index)){ const q=state.quiz[state.index]; state.answers.push({index:state.index,id:q.id,question:q.question,day:q.day,moduleId:q.moduleId,moduleName:q.moduleName,selected:'—',correctAnswer:q.answer,isCorrect:false,skipped:true,explanation:q.explanation,source:q.source,difficulty:q.difficulty}); } nextQuestion(); }
  function recordStat(q,isCorrect){
    data.answered=(data.answered||0)+1; if(isCorrect)data.correct=(data.correct||0)+1; data.byModule=data.byModule||{}; const ms=data.byModule[q.moduleId]||{answered:0,correct:0}; ms.answered++; if(isCorrect)ms.correct++; data.byModule[q.moduleId]=ms;
    data.wrongIds=data.wrongIds||[]; if(isCorrect)data.wrongIds=data.wrongIds.filter(id=>id!==q.id); else if(!data.wrongIds.includes(q.id))data.wrongIds.push(q.id);
    const today=dateKey(); data.dailyAnswered=data.dailyAnswered||{}; data.dailyAnswered[today]=(data.dailyAnswered[today]||0)+1; data.lastStudyDate=today; saveData();
  }
  function nextQuestion(){ if(state.index<state.quiz.length-1){ state.index++; state.currentOptions=[]; renderQuestion(); } else finishQuiz(); }
  function prevQuestion(){ if(state.index>0){ state.index--; state.currentOptions=[]; renderQuestion(); } }
  function goQuestion(idx){ if(idx>=0&&idx<state.quiz.length){ state.index=idx; state.currentOptions=[]; renderQuestion(); } }
  function renderNavigator(){ $('questionNavigator').innerHTML=state.quiz.map((q,i)=>`<button class="nav-q ${answerFor(i)?'answered':''} ${i===state.index?'current':''} ${state.flagged.has(i)?'flagged':''}" data-qnav="${i}">${i+1}</button>`).join(''); document.querySelectorAll('[data-qnav]').forEach(b=>b.addEventListener('click',()=>goQuestion(Number(b.dataset.qnav)))); }

  function finishQuiz(){
    if(state.timerId){ clearInterval(state.timerId); state.timerId=null; }
    for(let i=0;i<state.quiz.length;i++){ if(!answerFor(i)){ const q=state.quiz[i]; state.answers.push({index:i,id:q.id,question:q.question,day:q.day,moduleId:q.moduleId,moduleName:q.moduleName,selected:'—',correctAnswer:q.answer,isCorrect:false,skipped:true,explanation:q.explanation,source:q.source,difficulty:q.difficulty}); } }
    state.answers.sort((a,b)=>a.index-b.index); const score=pct(state.correct,state.quiz.length), skipped=state.answers.filter(a=>a.skipped).length, wrong=state.quiz.length-state.correct-skipped;
    const moduleBreakdown={}; state.answers.filter(a=>!a.skipped).forEach(a=>{ const x=moduleBreakdown[a.moduleId]||{name:a.moduleName,day:a.day,total:0,correct:0}; x.total++; if(a.isCorrect)x.correct++; moduleBreakdown[a.moduleId]=x; });
    const session={id:Date.now(),date:new Date().toISOString(),score,total:state.quiz.length,correct:state.correct,wrong,skipped,duration:state.elapsedSeconds,mode:state.mode,answers:state.answers,moduleBreakdown};
    data.history=data.history||[]; data.history.unshift(session); data.history=data.history.slice(0,30); data.lastSession=session; data.sessionsCompleted=(data.sessionsCompleted||0)+1; saveData(); state.lastSession=session;
    renderResult(session); showView('resultView');
  }
  function renderResult(s){
    $('resultScore').innerHTML=`${s.score}<span>/100</span>`; $('resultAccuracy').textContent=s.score+'%'; $('resultDonut').style.setProperty('--pct',`${s.score*3.6}deg`); $('resultCorrect').textContent=s.correct; $('resultWrong').textContent=s.wrong; $('resultSkipped').textContent=s.skipped; $('resultTime').textContent=formatDuration(s.duration);
    const label=s.score>=85?'Sangat Bagus':s.score>=70?'Bagus':s.score>=55?'Cukup':'Perlu Drill'; $('resultBadge').textContent=label; $('resultMessage').textContent=s.score>=85?'Fondasinya kuat. Pertahankan ritme dan lanjutkan ke topik yang lebih menantang.':s.score>=70?'Sudah bagus. Fokuskan sesi berikutnya ke modul dengan akurasi terendah.':'Gunakan review dan Weakness Drill untuk menguatkan konsep dasar.';
    $('resultDate').textContent=new Intl.DateTimeFormat('id-ID',{dateStyle:'medium',timeStyle:'short'}).format(new Date(s.date)); $('retryWrongBtn').disabled=!s.answers.some(a=>!a.isCorrect&&!a.skipped);
    $('reviewPreview').innerHTML=s.answers.slice(0,5).map((a,i)=>`<div class="review-preview-row"><span>${String(i+1).padStart(2,'0')}</span><span class="qtext">${escapeHtml(a.question)}</span><span class="topic">${escapeHtml(a.moduleName)}</span><span class="status-pill ${a.skipped?'skipped':a.isCorrect?'correct':'wrong'}">${a.skipped?'Dilewati':a.isCorrect?'Benar':'Salah'}</span></div>`).join('');
    const rows=Object.entries(s.moduleBreakdown).map(([id,x])=>({id:Number(id),...x,accuracy:pct(x.correct,x.total)}));
    $('resultModulePerformance').innerHTML=rows.length?rows.map(x=>`<div class="module-performance-row"><span>Day ${x.day} · ${escapeHtml(x.name)}</span><strong class="${x.accuracy>=80?'good':''}">${x.accuracy}%</strong><div class="bar"><span style="width:${x.accuracy}%"></span></div><span class="total">${x.correct}/${x.total}</span></div>`).join(''):'<div class="empty-state">Belum ada data modul.</div>';
    const strongest=rows.length?[...rows].sort((a,b)=>b.accuracy-a.accuracy)[0]:null, weakest=rows.length?[...rows].sort((a,b)=>a.accuracy-b.accuracy)[0]:null, answered=s.total-s.skipped, avg=answered?Math.round(s.duration/answered):0;
    $('resultInsights').innerHTML=`<article class="insight-card"><span>🏆</span><small>Modul Terkuat</small><strong>${strongest?escapeHtml(strongest.name):'—'}</strong><p>${strongest?`Akurasi ${strongest.accuracy}%`:'Belum ada data'}</p></article><article class="insight-card"><span>◎</span><small>Modul Terlemah</small><strong>${weakest?escapeHtml(weakest.name):'—'}</strong><p>${weakest?`Akurasi ${weakest.accuracy}%`:'Belum ada data'}</p></article><article class="insight-card"><span>◷</span><small>Rata-rata Waktu</small><strong>${avg} Detik / Soal</strong><p>${avg<=60?'Tempo cukup efisien':'Coba tingkatkan kecepatan'}</p></article><article class="insight-card"><span>▥</span><small>Tren Performa</small><strong>${trendText(data.history||[])}</strong><p>${data.sessionsCompleted||1} sesi selesai</p></article>`;
  }

  function renderReviewPage(){
    const s=data.lastSession; $('reviewLastMeta').textContent=s?`${new Intl.DateTimeFormat('id-ID',{dateStyle:'medium',timeStyle:'short'}).format(new Date(s.date))} · ${s.score}% · ${s.total} soal`:'Belum ada sesi latihan.'; renderReviewList();
  }
  function renderReviewList(){
    const s=data.lastSession, filter=$('reviewFilter').value; if(!s){ $('reviewList').innerHTML=empty('▤','Belum ada sesi untuk direview.'); return; }
    const arr=s.answers.filter(a=>filter==='all'||(filter==='wrong'&&!a.isCorrect&&!a.skipped)||(filter==='correct'&&a.isCorrect)||(filter==='skipped'&&a.skipped));
    $('reviewList').innerHTML=arr.length?arr.map((a,i)=>`<article class="review-detail"><div class="review-detail-head"><span class="status-pill ${a.skipped?'skipped':a.isCorrect?'correct':'wrong'}">${a.skipped?'Dilewati':a.isCorrect?'Benar':'Salah'}</span><small>${escapeHtml(a.source)}</small></div><h3>${i+1}. ${escapeHtml(a.question)}</h3><p class="answer-line">Jawaban kamu: <b>${escapeHtml(a.selected)}</b><br>Jawaban benar: <b>${escapeHtml(a.correctAnswer)}</b></p><p>${escapeHtml(a.explanation)}</p></article>`).join(''):empty('⌕','Tidak ada jawaban pada filter ini.');
  }
  function renderBookmarks(){
    const ids=data.bookmarks||[], items=Q.filter(q=>ids.includes(q.id)); $('bookmarksList').innerHTML=items.length?items.map(q=>`<article class="bookmark-item"><div><span class="question-badge">Day ${q.day} · Modul ${q.moduleId}</span><h3>${escapeHtml(q.question)}</h3><p>${escapeHtml(q.moduleName)} · ${escapeHtml(q.source)} · ${escapeHtml(q.difficulty)}</p></div><div class="bookmark-actions"><button class="btn btn-primary" data-bookmark-practice="${q.id}">Latih</button><button class="btn btn-soft" data-bookmark-remove="${q.id}">Hapus</button></div></article>`).join(''):empty('♧','Belum ada soal yang di-bookmark.');
    document.querySelectorAll('[data-bookmark-practice]').forEach(b=>b.addEventListener('click',()=>beginQuiz({pool:Q.filter(q=>q.id===b.dataset.bookmarkPractice),count:'all',mode:'practice'}))); document.querySelectorAll('[data-bookmark-remove]').forEach(b=>b.addEventListener('click',()=>{ data.bookmarks=data.bookmarks.filter(id=>id!==b.dataset.bookmarkRemove); saveData(); renderBookmarks(); renderDashboard(); }));
  }
  function renderStatistics(){
    const accuracy=pct(data.correct||0,data.answered||0), weak=weakestModule(); $('statisticsCards').innerHTML=`<article class="stat-big"><small>Total Dikerjakan</small><strong>${data.answered||0}</strong><p>Dari ${Q.length} bank soal Day 1–5.</p></article><article class="stat-big"><small>Akurasi Keseluruhan</small><strong>${accuracy}%</strong><p>${data.correct||0} jawaban benar.</p></article><article class="stat-big"><small>Sesi Selesai</small><strong>${data.sessionsCompleted||0}</strong><p>${data.streak||1} hari beruntun.</p></article><article class="stat-big"><small>Prioritas Belajar</small><strong style="font-size:16px">${weak?escapeHtml(weak.name):'Belum ada data'}</strong><p>${weak?`Akurasi ${weak.accuracy}%`:'Mulai latihan untuk analisis.'}</p></article>`;
    $('performanceList').innerHTML=MODULES.map(m=>{ const s=moduleStats(m.id); return `<div class="performance-item"><span>Day ${m.day} · ${escapeHtml(m.name)}</span><div class="perf-track"><div class="perf-fill" style="width:${s.accuracy}%"></div></div><div class="perf-value">${s.answered?`${s.accuracy}% · ${s.correct}/${s.answered}`:'—'}</div></div>`; }).join('');
    const hist=data.history||[]; $('historyList').innerHTML=hist.length?hist.map(h=>`<article class="history-item"><div><strong>${h.mode==='exam'?'Exam Mode':'Practice Mode'}</strong><small>${new Intl.DateTimeFormat('id-ID',{dateStyle:'medium',timeStyle:'short'}).format(new Date(h.date))}</small></div><strong>${h.score}%</strong><small>${h.correct}/${h.total} benar</small><small>${formatDuration(h.duration)}</small></article>`).join(''):empty('▥','Belum ada riwayat sesi.');
  }
  function empty(icon,text){ return `<div class="empty-state"><span>${icon}</span>${escapeHtml(text)}</div>`; }

  function globalSearch(query){
    const box=$('searchResults'), q=query.trim().toLowerCase(); if(q.length<2){ box.classList.add('hidden'); box.innerHTML=''; return; }
    const moduleHits=MODULES.filter(m=>m.name.toLowerCase().includes(q)).slice(0,3).map(m=>({type:'module',title:m.name,subtitle:`Day ${m.day} · ${m.count} soal`,moduleId:m.id}));
    const questionHits=Q.filter(x=>x.question.toLowerCase().includes(q)||x.moduleName.toLowerCase().includes(q)||x.options.some(o=>o.toLowerCase().includes(q))).slice(0,5).map(x=>({type:'question',title:x.question,subtitle:`${x.moduleName} · ${x.source}`,id:x.id}));
    const hits=[...moduleHits,...questionHits]; box.innerHTML=hits.length?hits.map((h,i)=>`<button class="search-result" data-search-index="${i}"><strong>${escapeHtml(h.title)}</strong><small>${escapeHtml(h.subtitle)}</small></button>`).join(''):empty('⌕','Tidak ada hasil.'); box.classList.remove('hidden');
    box._hits=hits; document.querySelectorAll('[data-search-index]').forEach(b=>b.addEventListener('click',()=>{ const h=box._hits[Number(b.dataset.searchIndex)]; box.classList.add('hidden'); $('globalSearch').value=''; if(h.type==='module') beginQuiz({pool:Q.filter(x=>x.moduleId===h.moduleId),count:'all',mode:'practice'}); else beginQuiz({pool:Q.filter(x=>x.id===h.id),count:'all',mode:'practice'}); }));
  }

  // Navigation
  document.querySelectorAll('[data-view]').forEach(el=>el.addEventListener('click',()=>showView(el.dataset.view)));
  document.querySelector('.brand').addEventListener('keydown',e=>{ if(e.key==='Enter')showView('dashboardView'); });
  $('mobileMenuBtn').addEventListener('click',()=>{ $('sidebar').classList.add('open'); $('sidebarBackdrop').classList.remove('hidden'); }); $('sidebarBackdrop').addEventListener('click',closeSidebar);
  $('themeToggle').addEventListener('click',()=>setTheme(data.theme==='dark'?'light':'dark')); $('settingsThemeBtn').addEventListener('click',()=>setTheme(data.theme==='dark'?'light':'dark'));
  $('globalSearch').addEventListener('input',e=>globalSearch(e.target.value)); document.addEventListener('click',e=>{ if(!e.target.closest('.search-wrap'))$('searchResults').classList.add('hidden'); }); document.addEventListener('keydown',e=>{ if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){ e.preventDefault(); $('globalSearch').focus(); } });

  // Dashboard actions
  $('allModulesBtn').addEventListener('click',()=>showView('quizSetupView')); $('continueLearningBtn').addEventListener('click',()=>{ const weak=weakestModule(); const pool=weak?Q.filter(q=>q.moduleId===weak.id):dayPool(state.selectedDay); beginQuiz({pool:hardSample(pool,10),count:'all',mode:'practice'}); });
  $('heroExamBtn').addEventListener('click',()=>beginQuiz({pool:hardSample(Q,50),count:'all',mode:'exam'})); $('practiceQuick').addEventListener('click',()=>{ state.mode='practice'; showView('quizSetupView'); syncModeUI(); }); $('examQuick').addEventListener('click',()=>{ state.mode='exam'; showView('quizSetupView'); syncModeUI(); });
  $('quickDrillBtn').addEventListener('click',()=>beginQuiz({pool:hardSample(dayPool(state.selectedDay),10),count:'all',mode:'practice'})); $('sideQuickBtn').addEventListener('click',()=>beginQuiz({pool:hardSample(dayPool(state.selectedDay),10),count:'all',mode:'practice'}));
  function startWeakness(){ const pool=Q.filter(q=>(data.wrongIds||[]).includes(q.id)); if(!pool.length){ toast('Belum ada soal salah. Kerjakan quiz dulu ya.'); return; } beginQuiz({pool,count:'all',mode:'practice'}); }
  $('weaknessDrillBtn').addEventListener('click',startWeakness); $('resultWeaknessBtn').addEventListener('click',startWeakness); $('weakestStartBtn').addEventListener('click',()=>{ const w=weakestModule(); w?beginQuiz({pool:Q.filter(q=>q.moduleId===w.id),count:'all',mode:'practice'}):showView('quizSetupView'); });

  // Setup
  $('selectAllBtn').addEventListener('click',()=>{ state.selectedModules=state.selectedModules.size===MODULES.length?new Set():new Set(MODULES.map(m=>m.id)); renderSetup(); });
  document.querySelectorAll('#modeSelector .segment').forEach(btn=>btn.addEventListener('click',()=>{ state.mode=btn.dataset.mode; syncModeUI(); }));
  function syncModeUI(){ document.querySelectorAll('#modeSelector .segment').forEach(x=>x.classList.toggle('active',x.dataset.mode===state.mode)); $('modeHelp').textContent=state.mode==='practice'?'Feedback + pembahasan muncul langsung setelah menjawab.':'Tidak ada feedback selama ujian; review muncul setelah selesai.'; }
  $('startQuizBtn').addEventListener('click',()=>beginQuiz());

  // Quiz actions
  $('prevBtn').addEventListener('click',prevQuestion); $('skipBtn').addEventListener('click',skipQuestion); $('nextBtn').addEventListener('click',()=>{ if(state.index===state.quiz.length-1) finishQuiz(); else nextQuestion(); });
  $('markQuestionBtn').addEventListener('click',()=>{ state.flagged.has(state.index)?state.flagged.delete(state.index):state.flagged.add(state.index); renderQuestion(); });
  $('bookmarkBtn').addEventListener('click',toggleBookmark); function toggleBookmark(){ const q=state.quiz[state.index]; data.bookmarks=data.bookmarks||[]; data.bookmarks.includes(q.id)?data.bookmarks=data.bookmarks.filter(id=>id!==q.id):data.bookmarks.push(q.id); saveData(); renderQuestion(); renderDashboard(); toast(data.bookmarks.includes(q.id)?'Soal disimpan ke bookmark.':'Bookmark dihapus.'); }
  $('explanationToggle').addEventListener('click',()=>$('notePanel').classList.toggle('hidden')); $('openNoteBtn').addEventListener('click',()=>{ $('notePanel').classList.remove('hidden'); $('questionNote').focus(); });
  function loadNote(id){ $('questionNote').value=data.notes?.[id]||''; }
  $('saveNoteBtn').addEventListener('click',()=>{ const q=state.quiz[state.index]; data.notes=data.notes||{}; data.notes[q.id]=$('questionNote').value.trim(); saveData(); toast('Catatan tersimpan.'); });

  // Result / review
  $('retryWrongBtn').addEventListener('click',()=>{ const s=state.lastSession||data.lastSession; const ids=s?.answers.filter(a=>!a.isCorrect&&!a.skipped).map(a=>a.id)||[]; if(ids.length)beginQuiz({pool:Q.filter(q=>ids.includes(q.id)),count:'all',mode:'practice'}); });
  $('backHomeBtn').addEventListener('click',()=>showView('dashboardView')); $('openFullReview').addEventListener('click',()=>showView('reviewView')); $('reviewFilter').addEventListener('change',renderReviewList);

  // Reset
  $('resetStatsBtn').addEventListener('click',()=>{ if(confirm('Reset semua statistik, riwayat, bookmark, weakness list, dan catatan di browser ini?')){ data=defaultData(); updateStreak(); setTheme('light'); saveData(); state.selectedModules=new Set(MODULES.map(m=>m.id)); state.selectedDay=1; state.setupDay=1; renderDashboard(); renderStatistics(); renderBookmarks(); toast('Semua progress telah direset.'); } });

  renderDashboard(); renderSetup(); syncModeUI(); renderStatistics(); renderBookmarks();
})();
