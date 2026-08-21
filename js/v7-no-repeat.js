(() => {
  const BANK_KEY='generalBankingQuestionBankV6';
  const PROGRESS_KEY='generalBankingModuleProgressV1';
  const BANK_SIZE=5000;
  const ACTIVE_LIMIT=50;
  const SOURCE=[...(window.__GBP_SOURCE_BANK__||[])];
  if(!SOURCE.length)return;

  const moduleIds=[...new Set(SOURCE.map(q=>Number(q.moduleId)))].filter(Boolean);
  const hash=str=>{let h=2166136261;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
  const seeded=(seed,salt=0)=>{let x=(seed+Math.imul(salt+1,0x9e3779b1))>>>0;x^=x<<13;x^=x>>>17;x^=x<<5;return(x>>>0)/4294967296};
  const clean=text=>String(text||'').replace(/\s+/g,' ').trim();
  const shortText=(text,max=118)=>{const s=clean(text);return s.length<=max?s:`${s.slice(0,max).replace(/\s+\S*$/,'')}…`};
  const diffRank=q=>({Sedang:1,'Sedang-Sulit':2,Sulit:3,Challenge:4,Expert:5}[q?.difficulty]||3);
  const learningOrder=arr=>[...arr].sort((a,b)=>diffRank(a)-diffRank(b)||clean(a.question).length-clean(b.question).length||String(a.id).localeCompare(String(b.id)));
  const fp=q=>String(hash(clean(q?.question).toLowerCase()));
  const basePool=mid=>SOURCE.filter(q=>Number(q.moduleId)===Number(mid));

  let STORE={};
  try{STORE=JSON.parse(localStorage.getItem(BANK_KEY)||'{}')||{}}catch(e){STORE={}}
  const getState=mid=>{
    const r=STORE[String(mid)]||{};
    return {
      epoch:Number(r.epoch)||1,
      seen:Array.isArray(r.seen)?r.seen.map(Number):[],
      active:Array.isArray(r.active)?r.active.map(Number):[],
      used:Array.isArray(r.used)?r.used:[],
      activeEngine:r.activeEngine||'legacy'
    };
  };
  const saveState=(mid,st)=>{STORE[String(mid)]={...(STORE[String(mid)]||{}),...st};localStorage.setItem(BANK_KEY,JSON.stringify(STORE))};

  function legacyNormal(base,seed){
    const q=shortText(base.question,135),style=Math.floor(seeded(seed,3)*5);
    if(style<=2)return {...base,question:q,questionType:'Pilihan Ganda'};
    if(style===3)return {...base,question:`${q} Pilih jawaban yang paling tepat.`,questionType:'Pilihan Ganda'};
    return {...base,question:`Manakah jawaban yang paling tepat? ${q}`,questionType:'Pilihan Ganda'};
  }
  const legacyExcept=base=>({...base,question:`${shortText(base.question,120)}\n\nSemua pilihan berikut tidak tepat, KECUALI:`,questionType:'Kecuali'});
  function legacyCause(base){
    const q=shortText(base.question,105),correct=shortText(base.answer,95),reason=shortText(base.explanation||'',135);
    if(!reason)return legacyNormal(base,1);
    const opts=['Pernyataan benar, alasan benar, dan berhubungan sebab–akibat.','Pernyataan benar, alasan benar, tetapi tidak berhubungan sebab–akibat.','Pernyataan benar, tetapi alasan salah.','Pernyataan salah dan alasan salah.'];
    return {...base,question:`Pertanyaan acuan: ${q}\n\nPernyataan: “${correct}” merupakan jawaban yang tepat.\nAlasan: ${reason}\n\nTentukan hubungan pernyataan dan alasan.`,options:opts,answer:opts[0],explanation:`Jawaban acuan adalah “${clean(base.answer)}”. ${shortText(base.explanation||'',180)}`,questionType:'Sebab–Akibat'};
  }
  function legacyComplex(base,seed){
    const q=shortText(base.question,100),correct=shortText(base.answer,90),wrong=(base.options||[]).filter(x=>clean(x)!==clean(base.answer));
    if(wrong.length<2)return legacyNormal(base,seed);
    const w1=shortText(wrong[Math.floor(seeded(seed,21)*wrong.length)%wrong.length],90),rest=wrong.filter(x=>clean(x)!==clean(w1)),w2=shortText(rest[Math.floor(seeded(seed,22)*rest.length)%rest.length]||wrong[1],90);
    const opts=['1 saja','1 dan 2','2 dan 3','1, 2, dan 3'];
    return {...base,question:`${q}\n\n1. ${correct}\n2. ${w1}\n3. ${w2}\n\nPernyataan yang tepat adalah:`,options:opts,answer:opts[0],explanation:`Pernyataan 1 merupakan jawaban yang tepat. ${shortText(base.explanation||'',170)}`,questionType:'Pilihan Ganda Kompleks'};
  }
  function legacyCase(base,seed){
    const q=shortText(base.question,145);
    const prefixes=['Seorang nasabah mengalami kondisi berikut.','Unit kerja menghadapi kondisi berikut.','Ditemukan kondisi operasional berikut.','Seorang analis menemukan kondisi berikut.','Perhatikan kasus berikut.'];
    const suffixes=['Tindakan paling tepat adalah:','Kesimpulan paling tepat adalah:','Apa keputusan yang paling tepat?','Manakah analisis yang paling tepat?'];
    return {...base,question:`${prefixes[Math.floor(seeded(seed,31)*prefixes.length)]}\n\n${q}\n\n${suffixes[Math.floor(seeded(seed,32)*suffixes.length)]}`,questionType:'Analisis Kasus'};
  }
  const slotType=slot=>{const b=(slot-1)%50;return b<18?'normal':b<27?'except':b<35?'cause':b<43?'complex':'case'};
  function legacyQuestion(mid,slot,epoch){
    const pool=basePool(mid);if(!pool.length)return null;
    const seed=hash(`${mid}:${slot}:${epoch}`),base=pool[Math.floor(seeded(seed,1)*pool.length)%pool.length],type=slotType(slot);
    const varied=type==='normal'?legacyNormal(base,seed):type==='except'?legacyExcept(base):type==='cause'?legacyCause(base):type==='complex'?legacyComplex(base,seed):legacyCase(base,seed);
    return {...varied,id:`BANK-M${mid}-E${epoch}-S${slot}`,source:`${base.source} · Bank ${slot}/${BANK_SIZE}`,difficulty:base.difficulty,generated:true,bankSlot:slot,bankEpoch:epoch,baseId:base.id};
  }

  const prefixes=['','Dalam konteks perbankan,','Pada praktik perbankan,','Dalam penerapan di bank,','Pada kegiatan operasional bank,','Dalam proses bisnis bank,','Dalam layanan kepada nasabah,','Berdasarkan prinsip yang berlaku,','Dalam pengambilan keputusan bank,','Pada pengelolaan aktivitas bank,','Dalam pelaksanaan layanan bank,','Dalam pengendalian aktivitas bank,','Pada proses perbankan tersebut,','Dalam penerapan ketentuan perbankan,','Dalam aktivitas layanan keuangan,','Dalam kegiatan bank sehari-hari,','Pada proses kerja di bank,','Dalam evaluasi aktivitas perbankan,','Dalam konteks layanan keuangan,','Pada pelaksanaan proses bank,','Dalam praktik layanan finansial,','Pada aktivitas perbankan,','Dalam konteks operasional,','Dalam pengelolaan layanan bank,','Pada penerapan prinsip bank,'];
  const closers=['','Pilih jawaban paling tepat.','Manakah pilihan yang paling tepat?','Tentukan jawaban yang benar.','Pilih alternatif yang paling sesuai.','Manakah pernyataan yang tepat?','Tentukan pilihan yang paling sesuai.','Pilih jawaban yang paling akurat.','Manakah jawaban yang paling sesuai?','Tentukan opsi yang paling tepat.','Pilih pernyataan yang paling benar.','Manakah alternatif yang paling tepat?','Pilih jawaban yang sesuai konsep.','Tentukan jawaban yang paling sesuai prinsip.','Manakah opsi yang paling akurat?','Pilih jawaban yang paling relevan.','Tentukan pilihan yang paling benar.','Manakah jawaban yang sesuai ketentuan?','Pilih opsi yang paling sesuai.','Tentukan jawaban yang paling dapat dipertanggungjawabkan.','Manakah pilihan yang sesuai prinsip?','Pilih alternatif yang benar.','Tentukan opsi yang paling relevan.','Manakah jawaban yang paling presisi?','Pilih pilihan yang paling tepat.'];
  function examVariant(stem,seed){
    const s=shortText(stem,108),p=prefixes[Math.floor(seeded(seed,71)*prefixes.length)],c=closers[Math.floor(seeded(seed,72)*closers.length)];
    return `${p?`${p} `:''}${s}${c?` ${c}`:''}`.trim();
  }

  function v7Normal(base,seed){return {...base,question:examVariant(base.question,seed),questionType:'Pilihan Ganda'}}
  function v7Except(base,seed){
    const endings=['Semua pilihan berikut tidak tepat, KECUALI:','Pilih satu alternatif yang merupakan pengecualian:','Manakah pilihan yang TIDAK termasuk pernyataan yang keliru?','Semua opsi berikut salah, KECUALI:'];
    return {...base,question:`${shortText(examVariant(base.question,seed),112)}\n\n${endings[Math.floor(seeded(seed,12)*endings.length)]}`,questionType:'Kecuali'};
  }
  function v7Cause(base,seed){
    const reason=shortText(base.explanation||'',112);
    if(!reason)return v7Normal(base,seed);
    const opts=['Pernyataan benar, alasan benar, dan berhubungan sebab–akibat.','Pernyataan benar, alasan benar, tetapi tidak berhubungan sebab–akibat.','Pernyataan benar, tetapi alasan salah.','Pernyataan salah dan alasan salah.'];
    const intros=['Nilai hubungan pernyataan dan alasan berikut.','Tentukan hubungan sebab–akibat berikut.','Analisis pernyataan dan alasan berikut.','Pilih hubungan yang paling tepat.'];
    return {...base,question:`${intros[Math.floor(seeded(seed,13)*intros.length)]}\n\nPernyataan: “${shortText(base.answer,76)}” menjawab tepat pertanyaan “${shortText(base.question,82)}”.\nAlasan: ${reason}`,options:opts,answer:opts[0],explanation:`Jawaban acuan adalah “${clean(base.answer)}”. ${shortText(base.explanation||'',160)}`,questionType:'Sebab–Akibat'};
  }
  function v7Complex(base,seed){
    const wrong=(base.options||[]).filter(x=>clean(x)!==clean(base.answer));
    if(wrong.length<2)return v7Normal(base,seed);
    const correct=shortText(base.answer,72),w1=shortText(wrong[Math.floor(seeded(seed,21)*wrong.length)%wrong.length],72),rest=wrong.filter(x=>clean(x)!==clean(w1)),w2=shortText(rest[Math.floor(seeded(seed,22)*rest.length)%rest.length]||wrong[1],72);
    const ci=1+Math.floor(seeded(seed,23)*3),statements=[w1,w2];statements.splice(ci-1,0,correct);
    const correctLabel=`${ci} saja`,all=['1 saja','2 saja','3 saja','1 dan 2','1 dan 3','2 dan 3','1, 2, dan 3'],distractors=all.filter(x=>x!==correctLabel);
    const keyed=distractors.map((x,i)=>({x,k:seeded(seed,40+i)})).sort((a,b)=>a.k-b.k).map(x=>x.x);
    return {...base,question:`${shortText(base.question,86)}\n\n1. ${statements[0]}\n2. ${statements[1]}\n3. ${statements[2]}\n\nPernyataan yang tepat adalah:`,options:[correctLabel,...keyed.slice(0,3)],answer:correctLabel,explanation:`Pernyataan ${ci} merupakan jawaban yang tepat. ${shortText(base.explanation||'',145)}`,questionType:'Pilihan Ganda Kompleks'};
  }
  function v7Case(base,seed){
    const ps=['Seorang nasabah menghadapi kondisi berikut.','Sebuah unit kerja menghadapi kondisi berikut.','Ditemukan kondisi operasional berikut.','Seorang analis menemukan kondisi berikut.','Perhatikan situasi berikut.','Sebuah cabang menangani situasi berikut.','Dalam pelayanan ditemukan kondisi berikut.','Tim bank mengevaluasi situasi berikut.'];
    const ss=['Tindakan paling tepat adalah:','Kesimpulan paling tepat adalah:','Apa keputusan yang paling tepat?','Manakah analisis yang paling tepat?','Respons yang paling sesuai adalah:','Pilihan terbaik adalah:'];
    return {...base,question:`${ps[Math.floor(seeded(seed,31)*ps.length)]}\n\n${shortText(base.question,108)}\n\n${ss[Math.floor(seeded(seed,32)*ss.length)]}`,questionType:'Analisis Kasus'};
  }
  function v7Question(mid,slot,epoch){
    const pool=basePool(mid);if(!pool.length)return null;
    const seed=hash(`v7:${mid}:${slot}:${epoch}`),base=pool[Math.floor(seeded(seed,1)*pool.length)%pool.length],type=slotType(slot);
    const varied=type==='normal'?v7Normal(base,seed):type==='except'?v7Except(base,seed):type==='cause'?v7Cause(base,seed):type==='complex'?v7Complex(base,seed):v7Case(base,seed);
    return {...varied,id:`BANK-M${mid}-E${epoch}-S${slot}`,source:`${base.source} · Bank ${slot}/${BANK_SIZE}`,difficulty:base.difficulty,generated:true,bankSlot:slot,bankEpoch:epoch,baseId:base.id};
  }

  function rebuildActiveV7Modules(){
    const current=[...(window.QUESTION_BANK||[])],next=[];
    moduleIds.forEach(mid=>{
      const st=getState(mid);
      if(st.activeEngine==='v7')next.push(...learningOrder(st.active.slice(0,ACTIVE_LIMIT).map(slot=>v7Question(mid,slot,st.epoch)).filter(Boolean)));
      else next.push(...current.filter(q=>Number(q.moduleId)===mid));
    });
    const target=window.QUESTION_BANK||[];target.splice(0,target.length,...next);
  }

  function migrateUsed(mid,st){
    const used=new Set(st.used);
    if(!st.used.length){for(const slot of st.seen){const q=legacyQuestion(mid,slot,st.epoch);if(q)used.add(fp(q))}}
    for(const q of (window.QUESTION_BANK||[]).filter(x=>Number(x.moduleId)===mid))used.add(fp(q));
    st.used=[...used];saveState(mid,st);return st;
  }

  const quota={normal:18,except:9,cause:8,complex:8,case:7};
  function pickUnique(mid,st,count){
    st=migrateUsed(mid,st);
    const seen=new Set(st.seen),used=new Set(st.used),picked=[],newFp=[],pickedSet=new Set(),pickedFp=new Set(),per={normal:0,except:0,cause:0,complex:0,case:0};
    const start=1+Math.floor(Math.random()*BANK_SIZE),step=97;
    for(let i=0;i<BANK_SIZE&&picked.length<count;i++){
      const slot=((start-1+i*step)%BANK_SIZE)+1;
      if(seen.has(slot)||pickedSet.has(slot))continue;
      const type=slotType(slot);if(per[type]>=quota[type])continue;
      const q=v7Question(mid,slot,st.epoch);if(!q)continue;
      const f=fp(q);if(used.has(f)||pickedFp.has(f))continue;
      picked.push(slot);pickedSet.add(slot);pickedFp.add(f);newFp.push(f);per[type]++;
    }
    if(picked.length<count){
      for(let slot=1;slot<=BANK_SIZE&&picked.length<count;slot++){
        if(seen.has(slot)||pickedSet.has(slot))continue;
        const q=v7Question(mid,slot,st.epoch);if(!q)continue;
        const f=fp(q);if(used.has(f)||pickedFp.has(f))continue;
        picked.push(slot);pickedSet.add(slot);pickedFp.add(f);newFp.push(f);
      }
    }
    return {st,slots:picked,fingerprints:newFp};
  }

  function clearProgress(mid){
    try{const all=JSON.parse(localStorage.getItem(PROGRESS_KEY)||'{}')||{};delete all[String(mid)];localStorage.setItem(PROGRESS_KEY,JSON.stringify(all))}catch(e){localStorage.removeItem(PROGRESS_KEY)}
    try{window.GBPApp?.clearModuleProgress?.(mid)}catch(e){}
  }
  const toast=msg=>{const el=document.getElementById('toast');if(!el)return;el.textContent=msg;el.classList.remove('hidden');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.add('hidden'),3200)};

  function generateNoRepeat(mid){
    const btn=document.querySelector('.quiz-generate-btn');if(btn){btn.disabled=true;btn.textContent='Menyiapkan soal baru…'}
    setTimeout(()=>{
      const result=pickUnique(mid,getState(mid),ACTIVE_LIMIT);
      if(result.slots.length<ACTIVE_LIMIT){if(btn){btn.disabled=false;btn.textContent='↻ Generate New Questions'}return toast('Bank unik tersisa kurang dari 50 soal. Soal yang pernah muncul tidak akan dipakai ulang.')}
      const st=result.st;
      st.active=result.slots;st.seen=[...new Set([...st.seen,...result.slots])];st.used=[...new Set([...st.used,...result.fingerprints])];st.activeEngine='v7';saveState(mid,st);clearProgress(mid);
      try{window.GBPAnalytics?.track?.('generate_questions',{moduleId:mid,day:basePool(mid)[0]?.day||null,questionCount:50,meta:{noRepeat:true,seen:st.seen.length,bankSize:BANK_SIZE}})}catch(e){}
      sessionStorage.setItem('gbpAutoOpenModule',String(mid));sessionStorage.setItem('gbpGenerationToast','50 soal baru aktif. Set lama sudah dipensiunkan dan tidak akan muncul lagi.');location.reload();
    },30);
  }

  function currentModule(){const name=document.getElementById('moduleTag')?.textContent?.trim();const q=(window.QUESTION_BANK||[]).find(x=>x.moduleName===name);return q?Number(q.moduleId):null}

  rebuildActiveV7Modules();

  document.addEventListener('click',e=>{
    const btn=e.target.closest?.('.quiz-generate-btn');if(!btn)return;
    e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
    const mid=currentModule();if(!mid)return;
    if(confirm('Generate 50 soal baru? Progress modul ini akan direset. Seluruh soal pada set sekarang dipensiunkan dan tidak akan muncul lagi di perangkat ini.'))generateNoRepeat(mid);
  },true);

  if(window.GBPQuestionBank)window.GBPQuestionBank.generate=generateNoRepeat;
  window.GBPNoRepeat={generate:generateNoRepeat,bankSize:BANK_SIZE};
})();