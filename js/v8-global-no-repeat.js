(() => {
  const BANK_KEY='generalBankingQuestionBankV6';
  const GLOBAL_KEY='gbpGlobalQuestionFingerprintsV8';
  const PROGRESS_KEY='generalBankingModuleProgressV1';
  const BANK_SIZE=5000, ACTIVE_LIMIT=50;
  const SOURCE=[...(window.__GBP_SOURCE_BANK__||[])];
  if(!SOURCE.length)return;

  const clean=s=>String(s||'').replace(/\s+/g,' ').trim();
  const short=(s,n=105)=>{const x=clean(s);return x.length<=n?x:`${x.slice(0,n).replace(/\s+\S*$/,'')}…`};
  const hash=s=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
  const fp=q=>String(hash(clean(q?.question).toLowerCase()));
  const rnd=(seed,salt=0)=>{let x=(seed+Math.imul(salt+1,0x9e3779b1))>>>0;x^=x<<13;x^=x>>>17;x^=x<<5;return(x>>>0)/4294967296};
  const rank=q=>({Sedang:1,'Sedang-Sulit':2,Sulit:3,Challenge:4,Expert:5}[q?.difficulty]||3);
  const order=a=>[...a].sort((x,y)=>rank(x)-rank(y)||clean(x.question).length-clean(y.question).length||String(x.id).localeCompare(String(y.id)));
  const pool=mid=>SOURCE.filter(q=>Number(q.moduleId)===Number(mid));
  const typeFor=slot=>{const b=(slot-1)%50;return b<18?'normal':b<27?'except':b<35?'cause':b<43?'complex':'case'};

  let STORE={};try{STORE=JSON.parse(localStorage.getItem(BANK_KEY)||'{}')||{}}catch(e){STORE={}}
  let GLOBAL=[];try{GLOBAL=JSON.parse(localStorage.getItem(GLOBAL_KEY)||'[]')||[]}catch(e){GLOBAL=[]}
  const globalSet=new Set(Array.isArray(GLOBAL)?GLOBAL:[]);
  const state=mid=>{const r=STORE[String(mid)]||{};return{epoch:1,seen:Array.isArray(r.seen)?r.seen.map(Number):[],active:Array.isArray(r.active)?r.active.map(Number):[],used:Array.isArray(r.used)?r.used:[],activeEngine:r.activeEngine||'legacy'}};
  const save=(mid,st)=>{STORE[String(mid)]={...(STORE[String(mid)]||{}),...st};localStorage.setItem(BANK_KEY,JSON.stringify(STORE))};
  const saveGlobal=()=>localStorage.setItem(GLOBAL_KEY,JSON.stringify([...globalSet]));

  const prefixes=['','Pada layanan bank,','Pada aktivitas perbankan,','Dalam proses operasional,','Pada pengelolaan transaksi,','Dalam penerapan ketentuan,','Pada pelayanan nasabah,','Dalam proses bisnis bank,','Pada pengendalian bank,','Dalam praktik perbankan,','Pada kegiatan cabang,','Dalam pengelolaan risiko,','Pada administrasi bank,','Dalam evaluasi layanan,','Pada transaksi keuangan,','Dalam kegiatan perbankan,','Pada proses layanan,','Dalam operasional cabang,','Pada penerapan prinsip bank,','Dalam layanan keuangan,'];
  const closers=['','Pilih jawaban paling tepat.','Manakah pilihan yang benar?','Tentukan jawaban yang paling sesuai.','Manakah opsi yang paling tepat?','Pilih pernyataan yang benar.','Tentukan alternatif terbaik.','Manakah jawaban yang paling akurat?','Pilih opsi yang sesuai.','Tentukan pilihan yang benar.','Manakah pernyataan paling tepat?'];

  function normal(base,seed){const p=prefixes[Math.floor(rnd(seed,2)*prefixes.length)],c=closers[Math.floor(rnd(seed,3)*closers.length)];return{...base,question:`${p?`${p} `:''}${short(base.question,102)}${c?` ${c}`:''}`.trim(),questionType:'Pilihan Ganda'}}
  function except(base,seed){const tails=['Semua pilihan berikut salah, KECUALI:','Pilih alternatif yang menjadi pengecualian:','Semua opsi berikut tidak tepat, KECUALI:','Manakah pilihan yang merupakan pengecualian?'];return{...base,question:`${short(base.question,96)}\n\n${tails[Math.floor(rnd(seed,4)*tails.length)]}`,questionType:'Kecuali'}}
  function cause(base,seed){const reason=short(base.explanation||'',100);if(!reason)return normal(base,seed);const opts=['Pernyataan benar, alasan benar, dan berhubungan sebab–akibat.','Pernyataan benar, alasan benar, tetapi tidak berhubungan sebab–akibat.','Pernyataan benar, tetapi alasan salah.','Pernyataan salah dan alasan salah.'];return{...base,question:`Tentukan hubungan pernyataan dan alasan.\n\nPernyataan: “${short(base.answer,68)}” tepat untuk “${short(base.question,72)}”.\nAlasan: ${reason}`,options:opts,answer:opts[0],explanation:`Jawaban acuan: “${clean(base.answer)}”. ${short(base.explanation||'',145)}`,questionType:'Sebab–Akibat'}}
  function complex(base,seed){const wrong=(base.options||[]).filter(x=>clean(x)!==clean(base.answer));if(wrong.length<2)return normal(base,seed);const ci=1+Math.floor(rnd(seed,5)*3),w1=short(wrong[Math.floor(rnd(seed,6)*wrong.length)%wrong.length],65),rest=wrong.filter(x=>clean(x)!==clean(w1)),w2=short(rest[Math.floor(rnd(seed,7)*rest.length)%rest.length]||wrong[1],65),items=[w1,w2];items.splice(ci-1,0,short(base.answer,65));const answer=`${ci} saja`,all=['1 saja','2 saja','3 saja','1 dan 2','1 dan 3','2 dan 3','1, 2, dan 3'],d=all.filter(x=>x!==answer).map((x,i)=>({x,k:rnd(seed,20+i)})).sort((a,b)=>a.k-b.k).map(x=>x.x);return{...base,question:`${short(base.question,76)}\n\n1. ${items[0]}\n2. ${items[1]}\n3. ${items[2]}\n\nPernyataan yang tepat adalah:`,options:[answer,...d.slice(0,3)],answer,explanation:`Pernyataan ${ci} tepat. ${short(base.explanation||'',130)}`,questionType:'Pilihan Ganda Kompleks'}}
  function caseQ(base,seed){const ps=['Seorang nasabah menghadapi situasi berikut.','Sebuah cabang menghadapi situasi berikut.','Ditemukan kondisi berikut.','Tim bank mengevaluasi situasi berikut.','Perhatikan kasus berikut.'],ss=['Tindakan paling tepat adalah:','Kesimpulan paling tepat adalah:','Apa keputusan yang tepat?','Manakah analisis terbaik?','Respons yang paling sesuai adalah:'];return{...base,question:`${ps[Math.floor(rnd(seed,8)*ps.length)]}\n\n${short(base.question,96)}\n\n${ss[Math.floor(rnd(seed,9)*ss.length)]}`,questionType:'Analisis Kasus'}}

  function question(mid,slot){const p=pool(mid);if(!p.length)return null;const seed=hash(`v8:${mid}:${slot}`),base=p[Math.floor(rnd(seed,1)*p.length)%p.length],t=typeFor(slot),v=t==='normal'?normal(base,seed):t==='except'?except(base,seed):t==='cause'?cause(base,seed):t==='complex'?complex(base,seed):caseQ(base,seed);return{...v,id:`BANK-M${mid}-V8-S${slot}`,source:`${base.source} · Bank ${slot}/${BANK_SIZE}`,generated:true,bankSlot:slot,bankEpoch:1,baseId:base.id}}

  function rebuild(){
    const current=[...(window.QUESTION_BANK||[])],ids=[...new Set(SOURCE.map(q=>Number(q.moduleId)))].filter(Boolean),next=[];
    ids.forEach(mid=>{const st=state(mid);if(st.activeEngine==='v8')next.push(...order(st.active.slice(0,ACTIVE_LIMIT).map(s=>question(mid,s)).filter(Boolean)));else next.push(...current.filter(q=>Number(q.moduleId)===mid))});
    const target=window.QUESTION_BANK||[];target.splice(0,target.length,...next);
  }

  function retireCurrent(){for(const q of (window.QUESTION_BANK||[]))globalSet.add(fp(q));saveGlobal()}
  function clearProgress(mid){try{const all=JSON.parse(localStorage.getItem(PROGRESS_KEY)||'{}')||{};delete all[String(mid)];localStorage.setItem(PROGRESS_KEY,JSON.stringify(all))}catch(e){localStorage.removeItem(PROGRESS_KEY)};try{window.GBPApp?.clearModuleProgress?.(mid)}catch(e){}}
  const toast=msg=>{const e=document.getElementById('toast');if(!e)return;e.textContent=msg;e.classList.remove('hidden');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.add('hidden'),3300)};
  const currentModule=()=>{const name=document.getElementById('moduleTag')?.textContent?.trim();const q=(window.QUESTION_BANK||[]).find(x=>x.moduleName===name);return q?Number(q.moduleId):null};

  function choose(mid,count){
    const st=state(mid),seen=new Set(st.seen),picked=[],pickedFp=new Set(),per={normal:0,except:0,cause:0,complex:0,case:0},quota={normal:18,except:9,cause:8,complex:8,case:7};
    const start=1+Math.floor(Math.random()*BANK_SIZE),step=97;
    const trySlot=slot=>{if(seen.has(slot)||picked.includes(slot))return false;const t=typeFor(slot);if(per[t]>=quota[t])return false;const q=question(mid,slot);if(!q)return false;const f=fp(q);if(globalSet.has(f)||pickedFp.has(f))return false;picked.push(slot);pickedFp.add(f);per[t]++;return true};
    for(let i=0;i<BANK_SIZE&&picked.length<count;i++)trySlot(((start-1+i*step)%BANK_SIZE)+1);
    if(picked.length<count){for(let s=1;s<=BANK_SIZE&&picked.length<count;s++){if(seen.has(s)||picked.includes(s))continue;const q=question(mid,s);if(!q)continue;const f=fp(q);if(globalSet.has(f)||pickedFp.has(f))continue;picked.push(s);pickedFp.add(f)}}
    return{st,picked,fps:[...pickedFp]};
  }

  function generate(mid){
    const btn=document.querySelector('.quiz-generate-btn');if(btn){btn.disabled=true;btn.textContent='Menyiapkan soal baru…'}
    setTimeout(()=>{
      retireCurrent();
      const r=choose(mid,ACTIVE_LIMIT);
      if(r.picked.length<ACTIVE_LIMIT){if(btn){btn.disabled=false;btn.textContent='↻ Generate New Questions'}return toast('Bank soal unik tersisa kurang dari 50. Soal lama tidak akan didaur ulang.')}
      r.st.active=r.picked;r.st.seen=[...new Set([...r.st.seen,...r.picked])];r.st.used=[...new Set([...r.st.used,...r.fps])];r.st.activeEngine='v8';save(mid,r.st);r.fps.forEach(x=>globalSet.add(x));saveGlobal();clearProgress(mid);
      try{window.GBPAnalytics?.track?.('generate_questions',{moduleId:mid,day:pool(mid)[0]?.day||null,questionCount:50,meta:{globalNoRepeat:true,bankSize:BANK_SIZE,seen:r.st.seen.length}})}catch(e){}
      sessionStorage.setItem('gbpAutoOpenModule',String(mid));sessionStorage.setItem('gbpGenerationToast','50 soal baru aktif. Set sebelumnya dipensiunkan dan tidak akan muncul lagi.');location.reload();
    },25);
  }

  // Registered before V7: this capture handler owns the Generate button and prevents legacy generators from running.
  document.addEventListener('click',e=>{const b=e.target.closest?.('.quiz-generate-btn');if(!b)return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();const mid=currentModule();if(!mid)return;if(confirm('Generate 50 soal baru? Progress modul ini akan direset. Soal pada set lama dipensiunkan dan tidak akan muncul kembali di perangkat ini.'))generate(mid)},true);

  document.addEventListener('DOMContentLoaded',()=>{rebuild();retireCurrent();if(window.GBPQuestionBank){window.GBPQuestionBank.generate=generate;window.GBPQuestionBank.bankInfo=mid=>{const st=state(mid);return{active:st.active.length||50,seen:st.seen.length,remaining:Math.max(0,BANK_SIZE-st.seen.length)}}}window.GBPGlobalNoRepeat={generate,bankSize:BANK_SIZE}});
})();
