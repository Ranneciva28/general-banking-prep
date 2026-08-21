(() => {
  const ACTIVE_KEY='gbpSpecialCategoryActiveV2';
  const PROGRESS_KEY='generalBankingModuleProgressV1';
  const units=()=>window.NUPMK_UNITS||[];
  const qbank=()=>window.QUESTION_BANK||[];
  const esc=s=>String(s??'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));
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

  document.addEventListener('DOMContentLoaded',()=>{
    ensureTabs();labelQuiz();
    const tabs=document.getElementById('dayTabs');if(tabs)new MutationObserver(()=>ensureTabs()).observe(tabs,{childList:true});
    const tag=document.getElementById('moduleTag');if(tag)new MutationObserver(()=>requestAnimationFrame(labelQuiz)).observe(tag,{childList:true,characterData:true,subtree:true});
    document.addEventListener('click',e=>{
      if(e.target.closest('[data-view="dashboardView"]'))setTimeout(()=>{ensureTabs();const active=sessionStorage.getItem(ACTIVE_KEY);if(active)renderCategory(active)},80);
    },{passive:true});
  });
})();
