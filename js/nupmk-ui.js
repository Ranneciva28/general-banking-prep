(() => {
  const ACTIVE_KEY='gbpSpecialCategoryActiveV2';
  const PROGRESS_KEY='generalBankingModuleProgressV1';
  const units=()=>window.NUPMK_UNITS||[];
  const qbank=()=>window.QUESTION_BANK||[];
  const esc=s=>String(s??'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));
  const clean=s=>String(s??'').replace(/\s+/g,' ').trim();
  const diffRank=q=>({Sedang:1,'Sedang-Sulit':2,Sulit:3,Challenge:4,Expert:5}[q?.difficulty]||3);
  const diffLabel=mid=>{
    const p=qbank().filter(q=>Number(q.moduleId)===Number(mid));
    const avg=p.reduce((a,q)=>a+diffRank(q),0)/(p.length||1);
    return avg>=4.05?'Expert':avg>=3.35?'Challenge':avg>=2.75?'Sulit':'Sedang-Sulit';
  };
  const dots=l=>{const n=(l==='Challenge'||l==='Expert')?4:String(l).includes('Sulit')?3:2;return'●'.repeat(n)+'○'.repeat(4-n)};
  const progress=mid=>{try{return (JSON.parse(localStorage.getItem(PROGRESS_KEY)||'{}')||{})[String(mid)]||null}catch(e){return null}};
  const dataStats=mid=>{try{const d=JSON.parse(localStorage.getItem('generalBankingPrepV3')||'{}')||{};const s=d.byModule?.[mid]||{};return{answered:Number(s.answered)||0,correct:Number(s.correct)||0}}catch(e){return{answered:0,correct:0}}};

  function bindDayTabs(tabs){
    tabs.querySelectorAll('[data-daytab]').forEach(b=>{
      if(b.dataset.specialBound)return;
      b.dataset.specialBound='1';
      b.addEventListener('click',()=>sessionStorage.removeItem(ACTIVE_KEY),{capture:true});
    });
  }

  function categoryButton(kind,label,small){
    const b=document.createElement('button');
    b.type='button';b.className=`day-tab special-category-tab ${kind}-tab`;b.dataset.specialCategory=kind;
    b.innerHTML=`<span>${label}</span><small>${small}</small>`;
    b.addEventListener('click',()=>{sessionStorage.setItem(ACTIVE_KEY,kind);renderCategory(kind)});
    return b;
  }

  function ensureTabs(){
    const tabs=document.getElementById('dayTabs');if(!tabs)return;
    bindDayTabs(tabs);
    if(!tabs.querySelector('[data-special-category="bridge"]'))tabs.appendChild(categoryButton('bridge','BRIDGE Module','1 modul · 50 soal'));
    if(!tabs.querySelector('[data-special-category="nupmk"]'))tabs.appendChild(categoryButton('nupmk','NUPMK Unit Kompetensi','10 modul · 500 soal'));
    const active=sessionStorage.getItem(ACTIVE_KEY);
    if(active==='bridge'||active==='nupmk')requestAnimationFrame(()=>renderCategory(active));
  }

  function card(mid,title,index,label){
    const pool=qbank().filter(q=>Number(q.moduleId)===Number(mid)),ap=progress(mid),s=dataStats(mid),acc=s.answered?Math.round(s.correct/s.answered*100):0,diff=diffLabel(mid);
    const answered=Array.isArray(ap?.answers)?ap.answers.length:0;
    const p=ap?` · ${ap.completed?'Selesai':`${answered}/${pool.length} dikerjakan`}`:'';
    return `<article class="module-display-card special-module-card"><div class="module-card-top"><span class="module-number">${label}</span></div><div class="module-symbol m${((index)%6)+1}">▣</div><h3>${esc(title)}</h3><p>${pool.length} Soal${p}${s.answered?` · ${acc}% akurasi`:''}</p><div class="difficulty-mini"><span class="dots">${dots(diff)}</span>${diff}</div><button class="module-start" data-special-start="${mid}">${ap?'Lanjutkan':'Mulai'}</button></article>`;
  }

  function renderCategory(kind){
    const dashboard=document.getElementById('dashboardView');if(!dashboard?.classList.contains('active'))return;
    const tabs=document.getElementById('dayTabs');if(!tabs)return;
    tabs.querySelectorAll('.day-tab').forEach(x=>x.classList.toggle('active',x.dataset.specialCategory===kind));
    const heroTitle=document.getElementById('heroTitle'),heroDescription=document.getElementById('heroDescription'),title=document.getElementById('moduleSectionTitle'),grid=document.getElementById('dashboardModuleGrid');
    if(!grid)return;

    if(kind==='bridge'){
      if(heroTitle)heroTitle.textContent='BRIDGE Module';
      if(heroDescription)heroDescription.textContent='1 modul konsolidasi · 50 soal aktif · berbasis materi General Banking.';
      if(title)title.textContent='BRIDGE Module';
      grid.innerHTML=card(25,'BRIDGE Module',0,'BRIDGE');
    }else{
      if(heroTitle)heroTitle.textContent='NUPMK Unit Kompetensi';
      if(heroDescription)heroDescription.textContent='10 unit kompetensi · 50 soal aktif per modul · berbasis materi General Banking Day 1–5.';
      if(title)title.textContent='NUPMK Unit Kompetensi';
      grid.innerHTML=units().map((u,i)=>card(u.id,u.name,i,`UNIT ${String(i+1).padStart(2,'0')}`)).join('');
    }
    grid.querySelectorAll('[data-special-start]').forEach(b=>b.addEventListener('click',()=>window.GBPApp?.startModule?.(Number(b.dataset.specialStart))));
  }

  function labelQuiz(){
    const tag=document.getElementById('moduleTag');if(!tag)return;
    const name=tag.textContent.trim(),pos=document.getElementById('modulePosition'),crumb=document.getElementById('breadcrumbDay');
    if(name==='BRIDGE Module'){
      if(pos)pos.textContent='BRIDGE Module';
      if(crumb)crumb.textContent='BRIDGE Module';
      return;
    }
    const u=units().find(x=>x.name===name);if(!u)return;
    if(pos)pos.textContent='NUPMK Unit Kompetensi';
    if(crumb)crumb.textContent='NUPMK Unit Kompetensi';
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
    if(n.includes('peran & jenis')||n.includes('peran dan jenis'))return'Dalam memahami struktur dan peran industri perbankan';
    if(n.includes('kredit'))return'Dalam proses analisis dan pemberian kredit';
    if(n.includes('service excellence')||n.includes('pelayanan nasabah'))return'Dalam memberikan pelayanan kepada nasabah';
    if(n.includes('customer due diligence')||n.includes('know your customer')||n.includes('kyc')||n.includes('cdd'))return'Dalam proses identifikasi dan verifikasi nasabah';
    if(n.includes('sistem pembayaran')||n.includes('payment'))return'Dalam memproses layanan dan sistem pembayaran';
    if(n.includes('anti fraud')||n.includes('fraud'))return'Dalam penerapan strategi anti-fraud';
    if(n.includes('business continuity')||n.includes('bcm')||n.includes('k3'))return'Dalam penerapan business continuity dan keselamatan kerja';
    if(n.includes('keamanan informasi')||n.includes('cyber')||n.includes('information security'))return'Dalam menjaga keamanan informasi perbankan';
    if(n.includes('tata kelola')||n.includes('governance')||n.includes('gcg'))return'Dalam penerapan tata kelola perbankan';
    if(n.includes('kepatuhan')||n.includes('compliance'))return'Dalam penerapan kepatuhan perbankan';
    if(n.includes('pencucian uang')||n.includes('pendanaan terorisme')||n.includes('aml')||n.includes('tppu')||n.includes('ppt'))return'Dalam penerapan program anti pencucian uang dan pencegahan pendanaan terorisme';
    if(n.includes('risiko'))return'Dalam penerapan manajemen risiko perbankan';
    return'Dalam praktik operasional perbankan';
  }

  function lowerSentenceStart(text){
    const s=clean(text);if(!s)return s;
    // Lowercase only an ordinary Title-case first word. Acronyms such as FX,
    // USD, KBMI, RTO, KPR, or PT stay intact.
    if(/^[A-ZÀ-ÖØ-Þ][a-zà-öø-ÿ]/u.test(s))return s.charAt(0).toLocaleLowerCase('id-ID')+s.slice(1);
    return s;
  }

  function applyExamQuestionContext(){
    const mode=document.getElementById('quizModeTitle')?.textContent?.trim();
    if(mode!=='Exam Mode')return;
    const qEl=document.getElementById('questionText'),tag=document.getElementById('moduleTag');
    if(!qEl||!tag)return;
    const original=clean(qEl.textContent),moduleName=clean(tag.textContent);
    if(!original||!moduleName)return;
    const prefix=examContextFor(moduleName);
    if(original.toLocaleLowerCase('id-ID').startsWith(prefix.toLocaleLowerCase('id-ID')))return;
    qEl.textContent=`${prefix}, ${lowerSentenceStart(original)}`;
    qEl.dataset.examContext='1';
  }

  document.addEventListener('DOMContentLoaded',()=>{
    ensureTabs();labelQuiz();applyExamQuestionContext();
    const tabs=document.getElementById('dayTabs');if(tabs)new MutationObserver(()=>ensureTabs()).observe(tabs,{childList:true});
    const tag=document.getElementById('moduleTag');if(tag)new MutationObserver(()=>requestAnimationFrame(()=>{labelQuiz();applyExamQuestionContext()})).observe(tag,{childList:true,characterData:true,subtree:true});
    const question=document.getElementById('questionText');if(question)new MutationObserver(()=>requestAnimationFrame(applyExamQuestionContext)).observe(question,{childList:true,characterData:true,subtree:true});
    const mode=document.getElementById('quizModeTitle');if(mode)new MutationObserver(()=>requestAnimationFrame(applyExamQuestionContext)).observe(mode,{childList:true,characterData:true,subtree:true});
    document.addEventListener('click',e=>{
      if(e.target.closest('[data-view="dashboardView"]'))setTimeout(()=>{ensureTabs();const active=sessionStorage.getItem(ACTIVE_KEY);if(active)renderCategory(active)},80);
    },{passive:true});
  });

  window.GBPExamContext={contextFor:examContextFor,apply:applyExamQuestionContext};
})();