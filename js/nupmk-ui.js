(() => {
  const ACTIVE_KEY='gbpNupmkCategoryActiveV1';
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

  function ensureTab(){
    const tabs=document.getElementById('dayTabs');if(!tabs)return;
    if(!tabs.querySelector('[data-nupmk-tab]')){
      const b=document.createElement('button');b.type='button';b.className='day-tab nupmk-tab';b.dataset.nupmkTab='1';
      b.innerHTML='<span>NUPMK Unit Kompetensi</span><small>10 modul · 500 soal</small>';
      b.addEventListener('click',()=>{sessionStorage.setItem(ACTIVE_KEY,'1');renderNupmk()});
      tabs.appendChild(b);
    }
    tabs.querySelectorAll('[data-daytab]').forEach(b=>{if(!b.dataset.nupmkBound){b.dataset.nupmkBound='1';b.addEventListener('click',()=>sessionStorage.removeItem(ACTIVE_KEY),{capture:true})}});
    if(sessionStorage.getItem(ACTIVE_KEY)==='1') requestAnimationFrame(renderNupmk);
  }

  function renderNupmk(){
    const dashboard=document.getElementById('dashboardView');if(!dashboard?.classList.contains('active'))return;
    const tabs=document.getElementById('dayTabs');if(!tabs)return;
    tabs.querySelectorAll('.day-tab').forEach(x=>x.classList.toggle('active',!!x.dataset.nupmkTab));
    const heroTitle=document.getElementById('heroTitle');if(heroTitle)heroTitle.textContent='NUPMK Unit Kompetensi';
    const heroDescription=document.getElementById('heroDescription');if(heroDescription)heroDescription.textContent='10 unit kompetensi · 50 soal aktif per modul · berbasis materi General Banking Day 1–5.';
    const title=document.getElementById('moduleSectionTitle');if(title)title.textContent='NUPMK Unit Kompetensi';
    const grid=document.getElementById('dashboardModuleGrid');if(!grid)return;
    grid.innerHTML=units().map((u,i)=>{
      const pool=qbank().filter(q=>Number(q.moduleId)===u.id),ap=progress(u.id),s=dataStats(u.id),acc=s.answered?Math.round(s.correct/s.answered*100):0,diff=diffLabel(u.id);
      const answered=Array.isArray(ap?.answers)?ap.answers.length:0;
      const p=ap?` · ${ap.completed?'Selesai':`${answered}/${pool.length} dikerjakan`}`:'';
      return `<article class="module-display-card nupmk-module-card"><div class="module-card-top"><span class="module-number">UNIT ${String(i+1).padStart(2,'0')}</span><span class="nupmk-code">${esc(u.code)}</span></div><div class="module-symbol m${((i)%6)+1}">▣</div><h3>${esc(u.name)}</h3><p>${pool.length} Soal${p}${s.answered?` · ${acc}% akurasi`:''}</p><div class="difficulty-mini"><span class="dots">${dots(diff)}</span>${diff}</div><button class="module-start" data-nupmk-start="${u.id}">${ap?'Lanjutkan':'Mulai'}</button></article>`;
    }).join('');
    grid.querySelectorAll('[data-nupmk-start]').forEach(b=>b.addEventListener('click',()=>window.GBPApp?.startModule?.(Number(b.dataset.nupmkStart))));
  }

  function labelQuiz(){
    const tag=document.getElementById('moduleTag');if(!tag)return;
    const u=units().find(x=>x.name===tag.textContent.trim());if(!u)return;
    const pos=document.getElementById('modulePosition');if(pos)pos.textContent=`NUPMK Unit Kompetensi · ${u.code}`;
    const crumb=document.getElementById('breadcrumbDay');if(crumb)crumb.textContent='NUPMK Unit Kompetensi';
  }

  document.addEventListener('DOMContentLoaded',()=>{
    ensureTab();labelQuiz();
    const tabs=document.getElementById('dayTabs');if(tabs)new MutationObserver(()=>ensureTab()).observe(tabs,{childList:true});
    const tag=document.getElementById('moduleTag');if(tag)new MutationObserver(()=>requestAnimationFrame(labelQuiz)).observe(tag,{childList:true,characterData:true,subtree:true});
    document.addEventListener('click',e=>{
      if(e.target.closest('[data-view="dashboardView"]'))setTimeout(()=>{ensureTab();if(sessionStorage.getItem(ACTIVE_KEY)==='1')renderNupmk()},80);
    },{passive:true});
  });
})();
