(() => {
  const ACTIVE_KEY='gbpSpecialCategoryActiveV3';
  const PROGRESS_KEY='generalBankingModuleProgressV1';
  const units=()=>window.NUPMK_UNITS||[];
  const bridgeUnits=()=>window.BRIDGE_UNITS||[];
  const qbank=()=>window.QUESTION_BANK||[];
  const esc=s=>String(s??'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));
  const clean=s=>String(s??'').replace(/\s+/g,' ').trim();
  const diffRank=q=>({Sedang:1,'Sedang-Sulit':2,Sulit:3,Challenge:4,Expert:5}[q?.difficulty]||3);
  const diffLabel=mid=>{const p=qbank().filter(q=>Number(q.moduleId)===Number(mid));const avg=p.reduce((a,q)=>a+diffRank(q),0)/(p.length||1);return avg>=4.05?'Expert':avg>=3.35?'Challenge':avg>=2.75?'Sulit':'Sedang-Sulit'};
  const dots=l=>{const n=(l==='Challenge'||l==='Expert')?4:String(l).includes('Sulit')?3:2;return'●'.repeat(n)+'○'.repeat(4-n)};
  const progress=mid=>{try{return (JSON.parse(localStorage.getItem(PROGRESS_KEY)||'{}')||{})[String(mid)]||null}catch(e){return null}};
  const dataStats=mid=>{try{const d=JSON.parse(localStorage.getItem('generalBankingPrepV3')||'{}')||{};const s=d.byModule?.[mid]||{};return{answered:Number(s.answered)||0,correct:Number(s.correct)||0}}catch(e){return{answered:0,correct:0}}};
  const bankInfo=mid=>window.GBPDatabaseQuestionBank?.bankInfo?.(mid)||{active:qbank().filter(q=>Number(q.moduleId)===Number(mid)).length,bankSize:0,remaining:0,maxBank:500};

  function categoryButton(kind,label,small){
    const b=document.createElement('button');b.type='button';b.className=`day-tab special-category-tab ${kind}-tab`;b.dataset.specialCategory=kind;b.innerHTML=`<span>${label}</span><small>${small}</small>`;b.addEventListener('click',()=>{sessionStorage.setItem(ACTIVE_KEY,kind);renderCategory(kind)});return b;
  }

  function ensureTabs(){
    const tabs=document.getElementById('dayTabs');if(!tabs)return;
    const valid=tabs.children.length===2&&tabs.querySelector('[data-special-category="bridge"]')&&tabs.querySelector('[data-special-category="nupmk"]');
    if(!valid){tabs.innerHTML='';tabs.appendChild(categoryButton('bridge','BRIDGE Module','Full Version + 10 unit kompetensi'));tabs.appendChild(categoryButton('nupmk','NUPMK Unit Kompetensi','10 unit kompetensi'));}
    const active=sessionStorage.getItem(ACTIVE_KEY);if(active!=='bridge'&&active!=='nupmk')sessionStorage.setItem(ACTIVE_KEY,'bridge');
    requestAnimationFrame(()=>renderCategory(sessionStorage.getItem(ACTIVE_KEY)||'bridge'));
  }

  function card(mid,title,index,label,sourceLabel=''){
    const active=qbank().filter(q=>Number(q.moduleId)===Number(mid)),info=bankInfo(mid),ap=progress(mid),s=dataStats(mid),acc=s.answered?Math.round(s.correct/s.answered*100):0,diff=diffLabel(mid);
    const answered=Array.isArray(ap?.answers)?ap.answers.length:0,activeCount=Number(info.active)||active.length||25,bankSize=Number(info.bankSize)||active.length;
    const p=ap?` · ${ap.completed?'Selesai':`${answered}/${activeCount} dikerjakan`}`:'';
    const source=sourceLabel?`<small class="module-source-mini">${esc(sourceLabel)}</small>`:'';
    return `<article class="module-display-card special-module-card"><div class="module-card-top"><span class="module-number">${esc(label)}</span></div><div class="module-symbol m${((index)%6)+1}">▣</div><h3>${esc(title)}</h3><p>${activeCount} soal aktif · ${bankSize} soal unik di bank${p}${s.answered?` · ${acc}% akurasi`:''}</p>${source}<div class="difficulty-mini"><span class="dots">${dots(diff)}</span>${diff}</div><button class="module-start" data-special-start="${mid}">${ap?'Lanjutkan':'Mulai'}</button></article>`;
  }

  function renderCategory(kind){
    const dashboard=document.getElementById('dashboardView');if(!dashboard?.classList.contains('active'))return;
    const tabs=document.getElementById('dayTabs');if(!tabs)return;
    tabs.querySelectorAll('.day-tab').forEach(x=>x.classList.toggle('active',x.dataset.specialCategory===kind));
    const heroTitle=document.getElementById('heroTitle'),heroDescription=document.getElementById('heroDescription'),title=document.getElementById('moduleSectionTitle'),grid=document.getElementById('dashboardModuleGrid');if(!grid)return;

    if(kind==='bridge'){
      if(heroTitle)heroTitle.textContent='BRIDGE Module';
      if(heroDescription)heroDescription.textContent='1 Full Version + 10 sub-module sesuai unit kompetensi NUPMK. Seluruh bank soal BRIDGE bersumber dari deck BRIDGE yang diunggah.';
      if(title)title.textContent='BRIDGE Module';
      const full=card(25,'BRIDGE Module Full Version',0,'FULL VERSION','SERTIFIKASI GB 4 PPT BRIDGE');
      const parts=bridgeUnits().map((u,i)=>card(u.id,u.name,i+1,`UNIT ${String(i+1).padStart(2,'0')}`,u.source)).join('');
      grid.innerHTML=full+parts;
    }else{
      if(heroTitle)heroTitle.textContent='NUPMK Unit Kompetensi';
      if(heroDescription)heroDescription.textContent='10 unit kompetensi · bank soal terpisah berdasarkan materi General Banking Day 1–5.';
      if(title)title.textContent='NUPMK Unit Kompetensi';
      grid.innerHTML=units().map((u,i)=>card(u.id,u.name,i,`UNIT ${String(i+1).padStart(2,'0')}`)).join('');
    }
    grid.querySelectorAll('[data-special-start]').forEach(b=>b.addEventListener('click',()=>window.GBPApp?.startModule?.(Number(b.dataset.specialStart))));
  }

  function labelQuiz(){
    const tag=document.getElementById('moduleTag');if(!tag)return;const name=tag.textContent.trim(),pos=document.getElementById('modulePosition'),crumb=document.getElementById('breadcrumbDay');
    if(name==='BRIDGE Module Full Version'||name.startsWith('BRIDGE · ')){if(pos)pos.textContent='BRIDGE Module';if(crumb)crumb.textContent='BRIDGE Module';return;}
    const u=units().find(x=>x.name===name);if(!u)return;if(pos)pos.textContent='NUPMK Unit Kompetensi';if(crumb)crumb.textContent='NUPMK Unit Kompetensi';
  }

  function examContextFor(moduleName){
    const n=clean(moduleName).toLocaleLowerCase('id-ID');
    if(!n)return'Dalam praktik operasional perbankan';
    if(n.includes('valuta asing'))return'Dalam pengurusan transaksi valuta asing';
    if(n.includes('edukasi nasabah'))return'Dalam mengedukasi nasabah dan calon nasabah';
    if(n.includes('pelayanan informasi produk')||n.includes('produk dan jasa')||n.includes('produk & jasa'))return'Dalam memberikan informasi produk dan jasa perbankan';
    if(n.includes('pengaduan nasabah')||n.includes('complaint'))return'Dalam menangani pengaduan nasabah';
    if(n.includes('pembukaan dan penutupan rekening')||n.includes('pembukaan rekening'))return'Dalam memproses pembukaan dan penutupan rekening';
    if(n.includes('tunai dan non tunai')||n.includes('tunai & non tunai')||n.includes('transaksi keuangan'))return'Dalam memproses transaksi keuangan tunai dan non-tunai';
    if(n.includes('administrasi'))return'Dalam pengelolaan administrasi perbankan';
    if(n.includes('trade service')||n.includes('trade finance')||n.includes('trade services'))return'Dalam pengurusan trade service dan trade finance';
    if(n.includes('akuntansi'))return'Dalam pengelolaan akuntansi dan laporan keuangan';
    if(n.includes('aspek-aspek hukum')||n.includes('aspek hukum')||n.includes('legal'))return'Dalam pengelolaan aspek hukum perbankan';
    if(n.includes('kredit'))return'Dalam proses analisis dan pemberian kredit';
    if(n.includes('customer due diligence')||n.includes('know your customer')||n.includes('kyc')||n.includes('cdd'))return'Dalam proses identifikasi dan verifikasi nasabah';
    if(n.includes('anti fraud')||n.includes('fraud'))return'Dalam penerapan strategi anti-fraud';
    if(n.includes('business continuity')||n.includes('bcm')||n.includes('k3'))return'Dalam penerapan business continuity dan keselamatan kerja';
    if(n.includes('tata kelola')||n.includes('governance')||n.includes('gcg'))return'Dalam penerapan tata kelola perbankan';
    if(n.includes('pencucian uang')||n.includes('pendanaan terorisme')||n.includes('aml')||n.includes('tppu')||n.includes('ppt'))return'Dalam penerapan program anti pencucian uang dan pencegahan pendanaan terorisme';
    if(n.includes('risiko'))return'Dalam penerapan manajemen risiko perbankan';
    return'Dalam praktik operasional perbankan';
  }

  function lowerSentenceStart(text){const s=clean(text);if(!s)return s;if(/^[A-ZÀ-ÖØ-Þ][a-zà-öø-ÿ]/u.test(s))return s.charAt(0).toLocaleLowerCase('id-ID')+s.slice(1);return s;}
  function applyExamQuestionContext(){
    const mode=document.getElementById('quizModeTitle')?.textContent?.trim();if(mode!=='Exam Mode')return;
    const qEl=document.getElementById('questionText'),tag=document.getElementById('moduleTag');if(!qEl||!tag)return;
    const original=clean(qEl.textContent),moduleName=clean(tag.textContent);if(!original||!moduleName)return;
    const prefix=examContextFor(moduleName);if(original.toLocaleLowerCase('id-ID').startsWith(prefix.toLocaleLowerCase('id-ID')))return;
    qEl.textContent=`${prefix}, ${lowerSentenceStart(original)}`;qEl.dataset.examContext='1';
  }

  function hideLegacyDayUI(){
    document.querySelectorAll('.nav-item[data-view="quizSetupView"]').forEach(x=>x.style.display='none');
    const all=document.getElementById('allModulesBtn');if(all)all.style.display='none';
    const kicker=document.querySelector('.hero-kicker');if(kicker)kicker.textContent='BRIDGE + NUPMK';
  }

  document.addEventListener('DOMContentLoaded',()=>{
    hideLegacyDayUI();ensureTabs();labelQuiz();applyExamQuestionContext();
    const tabs=document.getElementById('dayTabs');if(tabs)new MutationObserver(()=>{const valid=tabs.children.length===2&&tabs.querySelector('[data-special-category="bridge"]')&&tabs.querySelector('[data-special-category="nupmk"]');if(!valid)ensureTabs();}).observe(tabs,{childList:true});
    const tag=document.getElementById('moduleTag');if(tag)new MutationObserver(()=>requestAnimationFrame(()=>{labelQuiz();applyExamQuestionContext()})).observe(tag,{childList:true,characterData:true,subtree:true});
    const question=document.getElementById('questionText');if(question)new MutationObserver(()=>requestAnimationFrame(applyExamQuestionContext)).observe(question,{childList:true,characterData:true,subtree:true});
    const mode=document.getElementById('quizModeTitle');if(mode)new MutationObserver(()=>requestAnimationFrame(applyExamQuestionContext)).observe(mode,{childList:true,characterData:true,subtree:true});
    document.addEventListener('click',e=>{if(e.target.closest('[data-view="dashboardView"]'))setTimeout(()=>{hideLegacyDayUI();ensureTabs()},60)},{passive:true});
  });

  window.GBPExamContext={contextFor:examContextFor,apply:applyExamQuestionContext};
})();