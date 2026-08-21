(() => {
  const BANK_KEY='generalBankingQuestionBankV6';
  const GLOBAL_KEY='gbpGlobalQuestionFingerprintsV9';
  const OLD_GLOBAL_KEY='gbpGlobalQuestionFingerprintsV8';
  const PROGRESS_KEY='generalBankingModuleProgressV1';
  const BANK_SIZE=5000, ACTIVE_LIMIT=50;
  const SOURCE=[...(window.__GBP_SOURCE_BANK__||[])];
  if(!SOURCE.length)return;

  const clean=s=>String(s||'').replace(/\s+/g,' ').trim();
  const short=(s,n=102)=>{const x=clean(s);return x.length<=n?x:`${x.slice(0,n).replace(/\s+\S*$/,'')}…`};
  const hash=s=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
  const fp=q=>String(hash(clean(q?.question).toLowerCase()));
  const rnd=(seed,salt=0)=>{let x=(seed+Math.imul(salt+1,0x9e3779b1))>>>0;x^=x<<13;x^=x>>>17;x^=x<<5;return(x>>>0)/4294967296};
  const rank=q=>({Sedang:1,'Sedang-Sulit':2,Sulit:3,Challenge:4,Expert:5}[q?.difficulty]||3);
  const order=a=>[...a].sort((x,y)=>rank(x)-rank(y)||clean(x.question).length-clean(y.question).length||String(x.id).localeCompare(String(y.id)));
  const pool=mid=>SOURCE.filter(q=>Number(q.moduleId)===Number(mid));
  const moduleIds=[...new Set(SOURCE.map(q=>Number(q.moduleId)))].filter(Boolean).sort((a,b)=>a-b);
  const typeFor=slot=>{const b=(slot-1)%50;return b<18?'normal':b<27?'except':b<35?'cause':b<43?'complex':'case'};
  const quota={normal:18,except:9,cause:8,complex:8,case:7};

  let STORE={};try{STORE=JSON.parse(localStorage.getItem(BANK_KEY)||'{}')||{}}catch(e){STORE={}}
  let GLOBAL=[];try{GLOBAL=JSON.parse(localStorage.getItem(GLOBAL_KEY)||'[]')||[]}catch(e){GLOBAL=[]}
  let OLD=[];try{OLD=JSON.parse(localStorage.getItem(OLD_GLOBAL_KEY)||'[]')||[]}catch(e){OLD=[]}
  const globalSet=new Set([...(Array.isArray(GLOBAL)?GLOBAL:[]),...(Array.isArray(OLD)?OLD:[])]);

  const state=mid=>{
    const r=STORE[String(mid)]||{};
    return {
      active:Array.isArray(r.active)?r.active.map(Number):[],
      used:Array.isArray(r.used)?r.used:[],
      v9Seen:Array.isArray(r.v9Seen)?r.v9Seen.map(Number):[],
      activeEngine:r.activeEngine||'legacy'
    };
  };
  const save=(mid,st)=>{STORE[String(mid)]={...(STORE[String(mid)]||{}),...st};localStorage.setItem(BANK_KEY,JSON.stringify(STORE))};
  const saveGlobal=()=>localStorage.setItem(GLOBAL_KEY,JSON.stringify([...globalSet]));

  const openers=['','Pada layanan bank,','Dalam operasional bank,','Pada transaksi bank,','Dalam pengelolaan bank,','Pada pelayanan nasabah,','Dalam penerapan ketentuan,','Pada aktivitas cabang,'];
  const closers=['','Pilih jawaban paling tepat.','Manakah jawaban yang benar?','Tentukan pilihan yang paling sesuai.','Manakah opsi yang paling tepat?'];

  function normal(base,seed){
    const p=openers[Math.floor(rnd(seed,2)*openers.length)],c=closers[Math.floor(rnd(seed,3)*closers.length)];
    return {...base,question:`${p?`${p} `:''}${short(base.question,96)}${c?` ${c}`:''}`.trim(),questionType:'Pilihan Ganda'};
  }
  function exceptQ(base,seed){
    const tails=['Semua pilihan berikut salah, KECUALI:','Pilih alternatif yang menjadi pengecualian:','Semua opsi berikut tidak tepat, KECUALI:','Manakah pilihan yang merupakan pengecualian?'];
    return {...base,question:`${short(base.question,90)}\n\n${tails[Math.floor(rnd(seed,4)*tails.length)]}`,questionType:'Kecuali'};
  }
  function cause(base,seed){
    const reason=short(base.explanation||'',92);if(!reason)return normal(base,seed);
    const opts=['Pernyataan benar, alasan benar, dan berhubungan sebab–akibat.','Pernyataan benar, alasan benar, tetapi tidak berhubungan sebab–akibat.','Pernyataan benar, tetapi alasan salah.','Pernyataan salah dan alasan salah.'];
    return {...base,question:`Tentukan hubungan pernyataan dan alasan.\n\nPernyataan: “${short(base.answer,62)}” tepat untuk “${short(base.question,66)}”.\nAlasan: ${reason}`,options:opts,answer:opts[0],explanation:`Jawaban acuan: “${clean(base.answer)}”. ${short(base.explanation||'',132)}`,questionType:'Sebab–Akibat'};
  }
  function complex(base,seed){
    const wrong=(base.options||[]).filter(x=>clean(x)!==clean(base.answer));if(wrong.length<2)return normal(base,seed);
    const ci=1+Math.floor(rnd(seed,5)*3),w1=short(wrong[Math.floor(rnd(seed,6)*wrong.length)%wrong.length],58),rest=wrong.filter(x=>clean(x)!==clean(w1)),w2=short(rest[Math.floor(rnd(seed,7)*rest.length)%rest.length]||wrong[1],58),items=[w1,w2];
    items.splice(ci-1,0,short(base.answer,58));
    const answer=`${ci} saja`,all=['1 saja','2 saja','3 saja','1 dan 2','1 dan 3','2 dan 3','1, 2, dan 3'],d=all.filter(x=>x!==answer).map((x,i)=>({x,k:rnd(seed,20+i)})).sort((a,b)=>a.k-b.k).map(x=>x.x);
    return {...base,question:`${short(base.question,70)}\n\n1. ${items[0]}\n2. ${items[1]}\n3. ${items[2]}\n\nPernyataan yang tepat adalah:`,options:[answer,...d.slice(0,3)],answer,explanation:`Pernyataan ${ci} tepat. ${short(base.explanation||'',118)}`,questionType:'Pilihan Ganda Kompleks'};
  }
  function caseQ(base,seed){
    const ps=['Seorang nasabah menghadapi situasi berikut.','Sebuah cabang menghadapi situasi berikut.','Ditemukan kondisi berikut.','Tim bank mengevaluasi situasi berikut.','Perhatikan kasus berikut.'],ss=['Tindakan paling tepat adalah:','Kesimpulan paling tepat adalah:','Apa keputusan yang tepat?','Manakah analisis terbaik?','Respons yang paling sesuai adalah:'];
    return {...base,question:`${ps[Math.floor(rnd(seed,8)*ps.length)]}\n\n${short(base.question,88)}\n\n${ss[Math.floor(rnd(seed,9)*ss.length)]}`,questionType:'Analisis Kasus'};
  }

  function question(mid,slot){
    const p=pool(mid);if(!p.length)return null;
    const seed=hash(`v9:${mid}:${slot}`),base=p[Math.floor(rnd(seed,1)*p.length)%p.length],t=typeFor(slot);
    const v=t==='normal'?normal(base,seed):t==='except'?exceptQ(base,seed):t==='cause'?cause(base,seed):t==='complex'?complex(base,seed):caseQ(base,seed);
    return {...v,id:`BANK-M${mid}-V9-S${slot}`,source:`${base.source} · Bank ${slot}/${BANK_SIZE}`,generated:true,bankSlot:slot,bankEpoch:1,baseId:base.id};
  }

  function choose(mid,count,avoid=new Set(),existingSeen=[]){
    const seen=new Set(existingSeen),picked=[],pickedFp=new Set(),per={normal:0,except:0,cause:0,complex:0,case:0};
    const start=1+Math.floor(Math.random()*BANK_SIZE),step=97;
    const trySlot=(slot,respectQuota=true)=>{
      if(seen.has(slot)||picked.includes(slot))return false;
      const t=typeFor(slot);if(respectQuota&&per[t]>=quota[t])return false;
      const q=question(mid,slot);if(!q)return false;
      const f=fp(q);if(avoid.has(f)||pickedFp.has(f))return false;
      picked.push(slot);pickedFp.add(f);per[t]++;return true;
    };
    for(let i=0;i<BANK_SIZE&&picked.length<count;i++)trySlot(((start-1+i*step)%BANK_SIZE)+1,true);
    if(picked.length<count)for(let s=1;s<=BANK_SIZE&&picked.length<count;s++)trySlot(s,false);
    return {slots:picked,fps:[...pickedFp]};
  }

  function activeQuestions(mid,st){return order(st.active.slice(0,ACTIVE_LIMIT).map(s=>question(mid,s)).filter(Boolean))}

  function ensureUniqueActivePools(){
    const occupied=new Set(),next=[];
    for(const mid of moduleIds){
      let st=state(mid),qs=[];
      let valid=st.activeEngine==='v9'&&st.active.length===ACTIVE_LIMIT;
      if(valid){
        qs=activeQuestions(mid,st);
        const local=new Set();
        for(const q of qs){const f=fp(q);if(local.has(f)||occupied.has(f)){valid=false;break}local.add(f)}
      }
      if(!valid){
        const avoid=new Set([...globalSet,...occupied]);
        const r=choose(mid,ACTIVE_LIMIT,avoid,st.activeEngine==='v9'?st.v9Seen:[]);
        if(r.slots.length<ACTIVE_LIMIT){console.error(`Unable to build 50 globally unique questions for module ${mid}`);continue}
        st.active=r.slots;st.v9Seen=[...new Set([...(st.v9Seen||[]),...r.slots])];st.used=[...new Set([...(st.used||[]),...r.fps])];st.activeEngine='v9';save(mid,st);
        qs=activeQuestions(mid,st);
      }
      for(const q of qs){const f=fp(q);occupied.add(f);globalSet.add(f)}
      next.push(...qs);
    }
    const target=window.QUESTION_BANK||[];target.splice(0,target.length,...next);
    saveGlobal();
  }

  function clearProgress(mid){
    try{const all=JSON.parse(localStorage.getItem(PROGRESS_KEY)||'{}')||{};delete all[String(mid)];localStorage.setItem(PROGRESS_KEY,JSON.stringify(all))}catch(e){localStorage.removeItem(PROGRESS_KEY)}
    try{window.GBPApp?.clearModuleProgress?.(mid)}catch(e){}
  }
  const toast=msg=>{const e=document.getElementById('toast');if(!e)return;e.textContent=msg;e.classList.remove('hidden');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.add('hidden'),3300)};
  const currentModule=()=>{const name=document.getElementById('moduleTag')?.textContent?.trim();const q=(window.QUESTION_BANK||[]).find(x=>x.moduleName===name);return q?Number(q.moduleId):null};

  function generate(mid){
    const btn=document.querySelector('.quiz-generate-btn');if(btn){btn.disabled=true;btn.textContent='Menyiapkan soal baru…'}
    setTimeout(()=>{
      const current=(window.QUESTION_BANK||[]).filter(q=>Number(q.moduleId)===mid);
      current.forEach(q=>globalSet.add(fp(q)));
      const otherActive=new Set((window.QUESTION_BANK||[]).filter(q=>Number(q.moduleId)!==mid).map(fp));
      const avoid=new Set([...globalSet,...otherActive]);
      const st=state(mid),r=choose(mid,ACTIVE_LIMIT,avoid,st.v9Seen);
      if(r.slots.length<ACTIVE_LIMIT){if(btn){btn.disabled=false;btn.textContent='↻ Generate New Questions'}return toast('Bank soal unik tersisa kurang dari 50. Soal yang pernah muncul tidak akan didaur ulang.')}
      st.active=r.slots;st.v9Seen=[...new Set([...st.v9Seen,...r.slots])];st.used=[...new Set([...st.used,...r.fps])];st.activeEngine='v9';save(mid,st);r.fps.forEach(x=>globalSet.add(x));saveGlobal();clearProgress(mid);
      try{window.GBPAnalytics?.track?.('generate_questions',{moduleId:mid,day:pool(mid)[0]?.day||null,questionCount:50,meta:{globalUnique:true,noRepeat:true,bankSize:BANK_SIZE,seen:st.v9Seen.length}})}catch(e){}
      sessionStorage.setItem('gbpAutoOpenModule',String(mid));sessionStorage.setItem('gbpGenerationToast','50 soal baru aktif. Set sebelumnya dipensiunkan dan tidak akan muncul kembali.');location.reload();
    },25);
  }

  ensureUniqueActivePools();

  document.addEventListener('click',e=>{
    const b=e.target.closest?.('.quiz-generate-btn');if(!b)return;
    e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
    const mid=currentModule();if(!mid)return;
    if(confirm('Generate 50 soal baru? Progress modul ini akan direset. Seluruh soal pada set lama dipensiunkan dan tidak akan muncul kembali di perangkat ini.'))generate(mid);
  },true);

  document.addEventListener('DOMContentLoaded',()=>{
    if(window.GBPQuestionBank){window.GBPQuestionBank.generate=generate;window.GBPQuestionBank.bankInfo=mid=>{const st=state(mid);return{active:st.active.length||50,seen:st.v9Seen.length,remaining:Math.max(0,BANK_SIZE-st.v9Seen.length)}}}
    window.GBPGlobalNoRepeat={generate,bankSize:BANK_SIZE,engine:'v9'};
  });
})();
