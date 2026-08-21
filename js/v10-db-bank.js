(() => {
  const SUPA_URL='https://pnisrktkkbzspolkfkag.supabase.co';
  const SUPA_KEY='sb_publishable_ClLcjnxymypzS2O6x1TzwA_c9y7-j1Y';
  const SESSION_KEY='gbpAnalyticsSessionV1';
  const STATE_KEY='gbpDbBankV11';
  const PROGRESS_KEY='generalBankingModuleProgressV1';
  const BANK_SIZE=5000, ACTIVE_LIMIT=50;
  const SOURCE=[...(window.__GBP_SOURCE_BANK__||[])];
  if(!SOURCE.length)return;

  const clean=s=>String(s??'').replace(/\s+/g,' ').trim();
  const hash=s=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
  const rnd=(seed,salt=0)=>{let x=(seed+Math.imul(salt+1,0x9e3779b1))>>>0;x^=x<<13;x^=x>>>17;x^=x<<5;return(x>>>0)/4294967296};
  const rank=q=>({Sedang:1,'Sedang-Sulit':2,Sulit:3,Challenge:4,Expert:5}[q?.difficulty]||3);
  const order=a=>[...a].sort((x,y)=>rank(x)-rank(y)||clean(x.question).length-clean(y.question).length||String(x.id).localeCompare(String(y.id)));
  const pool=mid=>SOURCE.filter(q=>Number(q.moduleId)===Number(mid));
  const moduleIds=[...new Set(SOURCE.map(q=>Number(q.moduleId)))].filter(Boolean).sort((a,b)=>a-b);
  const firstSentence=s=>{const x=clean(s);const m=x.match(/^.*?[.!?](?=\s|$)/);return m?m[0].trim():x};
  const clientId=(()=>{let x=localStorage.getItem(SESSION_KEY);if(!x){x=`${Date.now().toString(36)}-${crypto.getRandomValues(new Uint32Array(2)).join('-')}`;localStorage.setItem(SESSION_KEY,x)}return x})();

  let state={};
  try{state=JSON.parse(localStorage.getItem(STATE_KEY)||'{}')||{}}catch(e){state={}}
  const getState=mid=>{const r=state[String(mid)]||{};return{active:Array.isArray(r.active)?r.active.map(Number):[],synced:!!r.synced,updatedAt:Number(r.updatedAt)||0}};
  const saveState=(mid,v)=>{state[String(mid)]={...getState(mid),...v};localStorage.setItem(STATE_KEY,JSON.stringify(state))};

  const roles=[
    'Relationship manager','Petugas customer service','Analis operasional','Supervisor layanan','Pejabat cabang','Tim kepatuhan','Staf back office','Pimpinan unit kerja','Petugas teller','Petugas layanan nasabah',
    'Petugas administrasi','Analis risiko','Tim bisnis','Petugas treasury','Analis kredit','Petugas trade finance','Tim akuntansi','Petugas KYC','Tim anti-fraud','Pengelola layanan digital',
    'Auditor internal','Petugas funding','Petugas lending','Analis transaksi','Koordinator operasional','Manajer layanan','Reviewer kredit','Petugas settlement','Analis compliance','Tim kontrol internal',
    'Petugas vault','Petugas dokumentasi','Pejabat pemutus','Tim quality assurance','Petugas rekonsiliasi','Analis produk','Petugas remittance','Tim legal','Petugas monitoring','Manajer risiko'
  ];
  const settings=[
    'saat briefing pagi di cabang','ketika melakukan review transaksi','dalam evaluasi layanan nasabah','pada pemeriksaan dokumen','ketika memverifikasi data','dalam rapat operasional','saat menilai kebutuhan nasabah','ketika mengevaluasi risiko','dalam proses rekonsiliasi','saat menindaklanjuti transaksi',
    'ketika menelaah permohonan','dalam review berkala','saat memeriksa kesesuaian prosedur','ketika melakukan analisis awal','dalam pembahasan kasus nasabah','saat menguji kontrol','ketika menilai kelengkapan informasi','dalam evaluasi keputusan','saat melakukan validasi','ketika menelaah hasil monitoring',
    'dalam proses eskalasi','saat menyusun rekomendasi','ketika melakukan pengecekan silang','dalam sesi coaching tim','saat mengkaji temuan','ketika menilai opsi yang tersedia','dalam proses persetujuan','saat melakukan tindak lanjut','ketika memeriksa anomali','dalam evaluasi akhir'
  ];
  const tasks=[
    'harus menentukan langkah yang paling tepat','perlu memilih keputusan yang sesuai','diminta mengidentifikasi prinsip yang berlaku','harus menilai pilihan yang tersedia','perlu menetapkan respons yang benar','diminta menguji kesesuaian tindakan','harus membedakan alternatif yang mirip','perlu menentukan prioritas keputusan','diminta mengevaluasi implikasi tindakan','harus memastikan penerapan ketentuan yang tepat',
    'perlu mengidentifikasi risiko utama','diminta menentukan perlakuan yang sesuai','harus memilih analisis yang paling akurat','perlu memutuskan tindakan lanjutan','diminta menilai kecukupan proses','harus menentukan kesimpulan yang tepat','perlu menguji pemahaman atas situasi','diminta membandingkan dua pendekatan','harus memilih opsi yang paling dapat dipertanggungjawabkan','perlu menentukan respons operasional',
    'diminta menilai kepatuhan tindakan','harus memeriksa konsistensi keputusan','perlu menentukan kontrol yang relevan','diminta memilih solusi yang paling sesuai','harus menilai dampak keputusan','perlu menetapkan tindakan mitigasi','diminta memeriksa kualitas keputusan','harus menentukan posisi yang tepat','perlu menilai fakta yang paling relevan','diminta memilih jawaban yang paling kuat'
  ];
  const qualifiers=[
    'Gunakan fakta yang tersedia tanpa menambah asumsi baru.','Pilih jawaban yang paling konsisten dengan prinsip perbankan.','Utamakan ketepatan konsep dan urutan proses.','Perhatikan perbedaan kecil antarpilihan.','Gunakan logika operasional dan kepatuhan secara bersamaan.',
    'Nilai opsi berdasarkan fakta yang disebutkan.','Pertimbangkan tujuan proses dan risiko yang muncul.','Gunakan alasan yang paling langsung menjawab persoalan.','Perhatikan siapa yang memiliki kewenangan dalam situasi tersebut.','Bedakan antara tujuan, prosedur, dan kontrol.',
    'Pertimbangkan dampak keputusan terhadap nasabah dan bank.','Gunakan prinsip yang paling spesifik terhadap kondisi tersebut.','Pilih opsi yang paling tepat, bukan sekadar yang masih mungkin.','Perhatikan titik keputusan utama dalam kasus.','Nilai kesesuaian tindakan terhadap konteks yang diberikan.',
    'Gunakan hubungan sebab dan akibat secara hati-hati.','Perhatikan apakah tindakan bersifat pencegahan, deteksi, atau koreksi.','Utamakan jawaban yang menjelaskan inti persoalan.','Pertimbangkan urutan tindakan sebelum menentukan hasil akhir.','Nilai jawaban dari sudut risiko, layanan, dan kepatuhan.'
  ];

  function lead(mid,slot){
    const seed=hash(`lead-v11:${mid}:${slot}`);
    const r=roles[Math.floor(rnd(seed,101)*roles.length)];
    const st=settings[Math.floor(rnd(seed,102)*settings.length)];
    const t=tasks[Math.floor(rnd(seed,103)*tasks.length)];
    const q=qualifiers[Math.floor(rnd(seed,104)*qualifiers.length)];
    const style=Math.floor(rnd(seed,105)*8);
    if(style===0)return `${st}, ${r} ${t}. ${q}`;
    if(style===1)return `${r} ${st} dan ${t}. ${q}`;
    if(style===2)return `${st}, muncul situasi yang membuat ${r.toLowerCase()} ${t}. ${q}`;
    if(style===3)return `${r} sedang bekerja ${st}. Dalam kondisi ini, ia ${t}. ${q}`;
    if(style===4)return `Sebuah kasus muncul ${st}. ${r} ${t}. ${q}`;
    if(style===5)return `Dalam kondisi ${st.replace(/^saat |^ketika |^dalam |^pada /,'')}, ${r} ${t}. ${q}`;
    if(style===6)return `${st}, ${r} menemukan beberapa pilihan yang tampak sama-sama masuk akal. Ia ${t}. ${q}`;
    return `${r} menghadapi keputusan ${st}. Ia ${t}. ${q}`;
  }

  const typeFor=slot=>{const b=(slot-1)%50;return b<18?'normal':b<27?'except':b<35?'cause':b<43?'complex':'case'};
  const shapeFor=(mid,slot)=>hash(`shape-v11:${mid}:${slot}`)%512;
  function baseFor(mid,slot){const p=pool(mid);if(!p.length)return null;const seed=hash(`v11-base:${mid}:${slot}`);return p[Math.floor(rnd(seed,1)*p.length)%p.length]}

  function normal(base,mid,slot){
    const intro=lead(mid,slot),style=shapeFor(mid,slot)%5,q=clean(base.question);
    if(style===0)return {...base,question:`${intro}\n\n${q}`,questionType:'Pilihan Ganda'};
    if(style===1)return {...base,question:`${intro}\n\nPertanyaan yang harus dijawab: ${q}`,questionType:'Pilihan Ganda'};
    if(style===2)return {...base,question:`${intro}\n\nFokus analisisnya adalah pertanyaan berikut: ${q}`,questionType:'Pilihan Ganda'};
    if(style===3)return {...base,question:`${intro}\n\nDalam situasi tersebut, jawab pertanyaan berikut secara tepat: ${q}`,questionType:'Pilihan Ganda'};
    return {...base,question:`${intro}\n\nTentukan jawaban terbaik untuk pertanyaan ini: ${q}`,questionType:'Pilihan Ganda'};
  }
  function exceptQ(base,mid,slot){
    const tails=['Semua pilihan berikut tidak tepat, KECUALI:','Pilih satu jawaban yang menjadi pengecualian:','Manakah opsi yang justru tepat sebagai pengecualian?','Semua alternatif berikut keliru, KECUALI:','Tentukan satu opsi yang tidak termasuk kelompok jawaban keliru:'];
    return {...base,question:`${lead(mid,slot)}\n\n${clean(base.question)}\n\n${tails[shapeFor(mid,slot)%tails.length]}`,questionType:'Kecuali'};
  }
  function cause(base,mid,slot){
    const reason=firstSentence(base.explanation||'');if(!reason)return normal(base,mid,slot);
    const opts=['Pernyataan benar, alasan benar, dan berhubungan sebab–akibat.','Pernyataan benar, alasan benar, tetapi tidak berhubungan sebab–akibat.','Pernyataan benar, tetapi alasan salah.','Pernyataan salah dan alasan salah.'];
    const asks=['Tentukan hubungan antara pernyataan dan alasan.','Nilai kebenaran pernyataan, alasan, serta hubungan keduanya.','Pilih hubungan sebab–akibat yang paling tepat.','Tentukan kombinasi kebenaran pernyataan dan alasan berikut.'];
    return {...base,question:`${lead(mid,slot)}\n\nPernyataan: “${clean(base.answer)}” merupakan jawaban yang tepat untuk konteks “${clean(base.question)}”.\nAlasan: ${reason}\n\n${asks[shapeFor(mid,slot)%asks.length]}`,options:opts,answer:opts[0],explanation:`Jawaban acuan: “${clean(base.answer)}”. ${clean(base.explanation||'')}`,questionType:'Sebab–Akibat'};
  }
  function complex(base,mid,slot){
    const wrong=(base.options||[]).filter(x=>clean(x)!==clean(base.answer));if(wrong.length<2)return normal(base,mid,slot);
    const seed=hash(`v11-complex:${mid}:${slot}`),ci=1+Math.floor(rnd(seed,2)*3);
    const w1=clean(wrong[Math.floor(rnd(seed,3)*wrong.length)%wrong.length]);
    const rest=wrong.filter(x=>clean(x)!==w1),w2=clean(rest[Math.floor(rnd(seed,4)*rest.length)%rest.length]||wrong[1]);
    const items=[w1,w2];items.splice(ci-1,0,clean(base.answer));
    const answer=`${ci} saja`,all=['1 saja','2 saja','3 saja','1 dan 2','1 dan 3','2 dan 3','1, 2, dan 3'];
    const distractors=all.filter(x=>x!==answer).map((x,i)=>({x,k:rnd(seed,20+i)})).sort((a,b)=>a.k-b.k).map(x=>x.x).slice(0,3);
    const asks=['Pernyataan yang tepat adalah:','Kombinasi pernyataan yang benar adalah:','Pilih susunan pernyataan yang paling tepat:','Berdasarkan ketiga pernyataan tersebut, jawaban yang benar adalah:'];
    return {...base,question:`${lead(mid,slot)}\n\n${clean(base.question)}\n\n1. ${items[0]}\n2. ${items[1]}\n3. ${items[2]}\n\n${asks[shapeFor(mid,slot)%asks.length]}`,options:[answer,...distractors],answer,explanation:`Pernyataan ${ci} tepat. ${clean(base.explanation||'')}`,questionType:'Pilihan Ganda Kompleks'};
  }
  function caseQ(base,mid,slot){
    const endings=['Tindakan paling tepat adalah:','Kesimpulan paling tepat adalah:','Keputusan yang paling sesuai adalah:','Analisis yang paling tepat adalah:','Respons yang seharusnya dipilih adalah:','Langkah berikut yang paling tepat adalah:'];
    return {...base,question:`${lead(mid,slot)}\n\n${clean(base.question)}\n\n${endings[shapeFor(mid,slot)%endings.length]}`,questionType:'Analisis Kasus'};
  }
  function question(mid,slot){
    const base=baseFor(mid,slot);if(!base)return null;
    const t=typeFor(slot),q=t==='normal'?normal(base,mid,slot):t==='except'?exceptQ(base,mid,slot):t==='cause'?cause(base,mid,slot):t==='complex'?complex(base,mid,slot):caseQ(base,mid,slot);
    return {...q,id:`DB-M${mid}-V11-S${slot}`,source:`${base.source} · DB Bank ${slot}/${BANK_SIZE}`,generated:true,bankSlot:slot,bankEpoch:1,baseId:base.id};
  }

  function previewSlots(mid){
    const st=getState(mid);if(st.active.length===ACTIVE_LIMIT)return st.active;
    const offset=((mid*173)%BANK_SIZE)+1,out=[];
    for(let i=0;i<ACTIVE_LIMIT;i++)out.push(((offset-1+i*101)%BANK_SIZE)+1);
    return out;
  }
  function replaceModule(mid,slots){
    const target=window.QUESTION_BANK||[];
    const others=target.filter(q=>Number(q.moduleId)!==Number(mid));
    const qs=order(slots.map(s=>question(mid,s)).filter(Boolean));
    target.splice(0,target.length,...others,...qs);
  }
  function applyPreviews(){
    const target=window.QUESTION_BANK||[],next=[];
    for(const mid of moduleIds)next.push(...order(previewSlots(mid).map(s=>question(mid,s)).filter(Boolean)));
    target.splice(0,target.length,...next);
  }

  async function rpc(name,body){
    const r=await fetch(`${SUPA_URL}/rest/v1/rpc/${name}`,{method:'POST',cache:'no-store',headers:{'Content-Type':'application/json','apikey':SUPA_KEY},body:JSON.stringify(body||{})});
    if(!r.ok)throw new Error(await r.text()||name);
    return r.json();
  }
  async function dbUsed(mid){
    const d=await rpc('gbp_question_used_slots',{p_client_id:clientId,p_module_id:mid});
    return new Set((d?.used||[]).map(Number));
  }
  function candidateSlots(used,attempted,limit=220){
    const out=[],start=1+Math.floor(Math.random()*BANK_SIZE),step=101;
    for(let i=0;i<BANK_SIZE&&out.length<limit;i++){
      const s=((start-1+i*step)%BANK_SIZE)+1;
      if(used.has(s)||attempted.has(s))continue;
      out.push(s);attempted.add(s);
    }
    return out;
  }
  function payload(mid,slots){
    return slots.map(s=>{
      const q=question(mid,s),base=baseFor(mid,s),shape=shapeFor(mid,s);
      return {slot:s,question:q.question,options:q.options,answer:q.answer,explanation:q.explanation,source:q.source,baseId:q.baseId,questionType:q.questionType,difficulty:q.difficulty,structureKey:`${clean(base?.question||'')}|${q.questionType}|shape-${shape}`};
    });
  }

  async function reserveNew(mid,count=ACTIVE_LIMIT){
    const used=await dbUsed(mid),attempted=new Set(),accepted=[];
    for(let round=0;round<9&&accepted.length<count;round++){
      const candidates=candidateSlots(used,attempted,220);if(!candidates.length)break;
      const d=await rpc('gbp_question_register_batch',{p_client_id:clientId,p_module_id:mid,p_questions:payload(mid,candidates),p_requested_count:count-accepted.length});
      for(const s of (d?.accepted_slots||[]).map(Number))if(!accepted.includes(s)){accepted.push(s);used.add(s)}
    }
    if(accepted.length<count)throw new Error(`only-${accepted.length}-unique-questions`);
    const active=accepted.slice(0,count);saveState(mid,{active,synced:true,updatedAt:Date.now()});replaceModule(mid,active);return active;
  }
  async function ensureModule(mid){
    const st=getState(mid);
    if(st.synced&&st.active.length===ACTIVE_LIMIT){replaceModule(mid,st.active);return st.active}
    return reserveNew(mid,ACTIVE_LIMIT);
  }

  function clearProgress(mid){
    try{const all=JSON.parse(localStorage.getItem(PROGRESS_KEY)||'{}')||{};delete all[String(mid)];localStorage.setItem(PROGRESS_KEY,JSON.stringify(all))}catch(e){localStorage.removeItem(PROGRESS_KEY)}
    try{window.GBPApp?.clearModuleProgress?.(mid)}catch(e){}
  }
  const toast=msg=>{const el=document.getElementById('toast');if(!el)return;el.textContent=msg;el.classList.remove('hidden');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.add('hidden'),3800)};
  const setBusy=(btn,on)=>{if(!btn)return;btn.disabled=on;btn.dataset.oldText=btn.dataset.oldText||btn.textContent;btn.textContent=on?'Menyiapkan 50 soal unik…':btn.dataset.oldText};

  async function generate(mid,button){
    setBusy(button,true);
    try{
      await reserveNew(mid,ACTIVE_LIMIT);clearProgress(mid);
      try{window.GBPAnalytics?.track?.('generate_questions',{moduleId:mid,day:pool(mid)[0]?.day||null,questionCount:50,meta:{databaseBank:true,engine:'v11',noRepeat:true,fullUnique:true}})}catch(e){}
      sessionStorage.setItem('gbpAutoOpenModule',String(mid));
      sessionStorage.setItem('gbpGenerationToast','50 soal baru sudah aktif. Pertanyaan lama tetap tercatat dan tidak akan dipakai ulang.');
      location.reload();
    }catch(e){console.error(e);toast('Database belum berhasil menyiapkan 50 soal yang lolos pemeriksaan uniqueness. Coba lagi beberapa saat.');setBusy(button,false)}
  }

  function midFromStart(btn){return Number(btn?.dataset?.moduleStart||btn?.dataset?.specialStart||btn?.dataset?.nupmkStart||0)||null}
  async function prepareSetup(button){
    const mids=[...document.querySelectorAll('.setup-module-card.selected')].map(x=>Number(x.dataset.module)).filter(Boolean);
    if(!mids.length)return false;
    setBusy(button,true);
    for(const mid of mids)await ensureModule(mid);
    setBusy(button,false);return true;
  }

  document.addEventListener('click',e=>{
    const gen=e.target.closest?.('.quiz-generate-btn');
    if(gen){
      e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
      const name=document.getElementById('moduleTag')?.textContent?.trim();
      const q=(window.QUESTION_BANK||[]).find(x=>x.moduleName===name),mid=q?Number(q.moduleId):null;
      if(mid&&confirm('Generate 50 soal baru? Set lama tetap tercatat sebagai sudah dipakai dan tidak akan dipilih kembali untuk user ini.'))generate(mid,gen);
      return;
    }
    const setup=e.target.closest?.('#startQuizBtn');
    if(setup&&setup.dataset.dbPrepared!=='1'){
      e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
      prepareSetup(setup).then(ok=>{if(!ok){setBusy(setup,false);return}setup.dataset.dbPrepared='1';setup.click();setTimeout(()=>delete setup.dataset.dbPrepared,0)}).catch(err=>{console.error(err);setBusy(setup,false);toast('Koneksi bank soal database gagal. Silakan coba lagi.')});
      return;
    }
    const start=e.target.closest?.('[data-module-start],[data-special-start],[data-nupmk-start]');
    if(!start||start.dataset.dbPrepared==='1')return;
    const mid=midFromStart(start);if(!mid)return;
    e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();setBusy(start,true);
    ensureModule(mid).then(()=>{setBusy(start,false);start.dataset.dbPrepared='1';start.click();setTimeout(()=>delete start.dataset.dbPrepared,0)}).catch(err=>{console.error(err);setBusy(start,false);toast('Koneksi bank soal database gagal. Silakan coba lagi.')});
  },true);

  applyPreviews();

  document.addEventListener('DOMContentLoaded',()=>{
    if(window.GBPQuestionBank){
      window.GBPQuestionBank.generate=mid=>generate(mid,document.querySelector('.quiz-generate-btn'));
      window.GBPQuestionBank.bankInfo=mid=>{const st=getState(mid);return{active:st.active.length||50,seen:null,remaining:null,database:true,engine:'v11'}};
    }
    window.GBPDatabaseQuestionBank={engine:'v11',bankSize:BANK_SIZE,ensureModule,reserveNew,clientId};
  });
})();