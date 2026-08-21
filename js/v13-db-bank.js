(() => {
  const SUPA_URL='https://pnisrktkkbzspolkfkag.supabase.co';
  const SUPA_KEY='sb_publishable_ClLcjnxymypzS2O6x1TzwA_c9y7-j1Y';
  const SESSION_KEY='gbpAnalyticsSessionV1';
  const STATE_KEY='gbpDbBankV13';
  const PROGRESS_KEY='generalBankingModuleProgressV1';
  const BANK_SIZE=5000, ACTIVE_LIMIT=50, SHORT_TARGET=45, LONG_TARGET=5;
  const SOURCE=[...(window.__GBP_SOURCE_BANK__||[])];
  if(!SOURCE.length)return;

  const clean=s=>String(s??'').replace(/\s+/g,' ').trim();
  const lower=s=>clean(s).toLocaleLowerCase('id-ID');
  const hash=s=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
  const rnd=(seed,salt=0)=>{let x=(seed+Math.imul(salt+1,0x9e3779b1))>>>0;x^=x<<13;x^=x>>>17;x^=x<<5;return(x>>>0)/4294967296};
  const cap=s=>String(s??'').replace(/^(\s*[^A-Za-zÀ-ÖØ-öø-ÿ]*)([a-zà-öø-ÿ])/u,(_,a,b)=>a+b.toLocaleUpperCase('id-ID'));
  const rank=q=>({Sedang:1,'Sedang-Sulit':2,Sulit:3,Challenge:4,Expert:5}[q?.difficulty]||3);
  const order=a=>[...a].sort((x,y)=>rank(x)-rank(y)||clean(x.question).length-clean(y.question).length||String(x.id).localeCompare(String(y.id)));
  const pool=mid=>SOURCE.filter(q=>Number(q.moduleId)===Number(mid));
  const moduleIds=[...new Set(SOURCE.map(q=>Number(q.moduleId)))].filter(Boolean).sort((a,b)=>a-b);
  const firstSentence=s=>{const x=clean(s),m=x.match(/^.*?[.!?](?=\s|$)/);return m?m[0].trim():x};
  const conceptKey=base=>`${lower(base?.question)}|${lower(base?.answer)}`;

  function splitStem(raw){
    const q=clean(raw);
    const qm=q.lastIndexOf('?');
    if(qm<0)return{context:'',prompt:q};
    const before=q.slice(0,qm+1);
    const boundaries=[...before.matchAll(/[.!?]\s+/g)];
    const start=boundaries.length?boundaries[boundaries.length-1].index+boundaries[boundaries.length-1][0].length:0;
    const prompt=clean(before.slice(start));
    const context=clean(q.slice(0,start));
    return{context,prompt};
  }
  function concisePrompt(raw,max=180){
    const {context,prompt}=splitStem(raw);
    if(prompt&&prompt.length<=max)return{context:context.length<=190?context:firstSentence(context),prompt};
    const q=clean(raw);
    if(q.length<=max)return{context:'',prompt:q};
    const f=firstSentence(q);
    return{context:'',prompt:f.length<=max?f:q.slice(0,max).replace(/\s+\S*$/,'').trim()+'?'};
  }
  function naturalContext(base,max=185){
    const x=splitStem(base.question).context;
    if(x&&x.length<=max)return x;
    if(x)return firstSentence(x);
    const q=clean(base.question);
    if(!q.includes('?')&&q.length<=max)return q;
    return '';
  }

  const clientId=(()=>{let x=localStorage.getItem(SESSION_KEY);if(!x){x=`${Date.now().toString(36)}-${crypto.getRandomValues(new Uint32Array(2)).join('-')}`;localStorage.setItem(SESSION_KEY,x)}return x})();
  let state={};try{state=JSON.parse(localStorage.getItem(STATE_KEY)||'{}')||{}}catch(e){state={}}
  const getState=mid=>{const r=state[String(mid)]||{};return{active:Array.isArray(r.active)?r.active.map(Number):[],synced:!!r.synced,updatedAt:Number(r.updatedAt)||0}};
  const saveState=(mid,v)=>{state[String(mid)]={...getState(mid),...v};localStorage.setItem(STATE_KEY,JSON.stringify(state))};

  const isLongSlot=slot=>slot%10===0;
  const typeFor=slot=>{const x=hash(`type-v13:${slot}`)%100;return x<38?'normal':x<55?'except':x<70?'cause':x<85?'complex':'case'};
  const facetFor=(mid,slot)=>hash(`facet-v13:${mid}:${slot}`)%64;
  function baseFor(mid,slot){
    const all=pool(mid);if(!all.length)return null;
    const shortPool=all.filter(q=>{const {prompt}=concisePrompt(q.question,190);return prompt.length>=15&&prompt.length<=190});
    const p=isLongSlot(slot)||!shortPool.length?all:shortPool;
    const seed=hash(`base-v13:${mid}:${slot}`);
    return p[Math.floor(rnd(seed,11)*p.length)%p.length];
  }

  function normalQ(base,mid,slot){
    const {context,prompt}=concisePrompt(base.question,190),f=facetFor(mid,slot)%5;
    if(context){
      const forms=[`${context} ${prompt}`,`${context} Berdasarkan kondisi tersebut, ${prompt.charAt(0).toLocaleLowerCase('id-ID')+prompt.slice(1)}`,`${context} Dalam kondisi ini, ${prompt.charAt(0).toLocaleLowerCase('id-ID')+prompt.slice(1)}`,`${context} ${prompt}`,`${context} ${prompt}`];
      return {...base,question:cap(forms[f]),questionType:'Pilihan Ganda'};
    }
    const forms=[prompt,`Dalam praktik perbankan, ${prompt.charAt(0).toLocaleLowerCase('id-ID')+prompt.slice(1)}`,`Berdasarkan ketentuan yang berlaku, ${prompt.charAt(0).toLocaleLowerCase('id-ID')+prompt.slice(1)}`,prompt,prompt];
    return {...base,question:cap(forms[f]),questionType:'Pilihan Ganda'};
  }

  function exceptQ(base,mid,slot){
    const context=naturalContext(base,190);
    const tails=['Semua pilihan berikut tidak tepat, KECUALI:','Manakah satu pilihan yang benar?','Semua pernyataan berikut keliru, KECUALI:','Pilih satu pernyataan yang tepat:'];
    const tail=tails[facetFor(mid,slot)%tails.length];
    const lead=context?`${context} ${tail}`:`Terkait konsep yang diuji pada soal ini, ${tail.charAt(0).toLocaleLowerCase('id-ID')+tail.slice(1)}`;
    return {...base,question:cap(lead),questionType:'Kecuali'};
  }

  function causeQ(base,mid,slot){
    const reason=firstSentence(base.explanation||'');
    if(!reason||reason.length>200)return normalQ(base,mid,slot);
    const opts=['Pernyataan benar, alasan benar, dan berhubungan sebab–akibat.','Pernyataan benar, alasan benar, tetapi tidak berhubungan sebab–akibat.','Pernyataan benar, tetapi alasan salah.','Pernyataan salah dan alasan salah.'];
    const asks=['Bagaimana hubungan pernyataan dan alasan tersebut?','Manakah penilaian yang tepat atas pernyataan dan alasan itu?','Tentukan hubungan sebab–akibat yang benar.'];
    const statement=clean(base.answer).replace(/[.!?]+$/,'');
    return {...base,question:cap(`Pernyataan: ${statement}. Alasan: ${reason} ${asks[facetFor(mid,slot)%asks.length]}`),options:opts,answer:opts[0],explanation:`${statement} merupakan jawaban acuan. ${clean(base.explanation||'')}`,questionType:'Sebab–Akibat'};
  }

  function complexQ(base,mid,slot){
    const wrong=(base.options||[]).filter(x=>lower(x)!==lower(base.answer));if(wrong.length<2)return normalQ(base,mid,slot);
    const seed=hash(`complex-v13:${mid}:${slot}`),ci=1+Math.floor(rnd(seed,2)*3);
    const w1=clean(wrong[Math.floor(rnd(seed,3)*wrong.length)%wrong.length]);
    const rest=wrong.filter(x=>lower(x)!==lower(w1)),w2=clean(rest[Math.floor(rnd(seed,4)*rest.length)%rest.length]||wrong[1]);
    const items=[w1,w2];items.splice(ci-1,0,clean(base.answer));
    const answer=`${ci} saja`,all=['1 saja','2 saja','3 saja','1 dan 2','1 dan 3','2 dan 3','1, 2, dan 3'];
    const distractors=all.filter(x=>x!==answer).map((x,i)=>({x,k:rnd(seed,20+i)})).sort((a,b)=>a.k-b.k).map(x=>x.x).slice(0,3);
    const context=naturalContext(base,150),asks=['Pernyataan yang tepat adalah:','Pilih pernyataan yang benar:','Manakah pernyataan yang tepat?'];
    const stem=`${context?context+' ':''}1. ${items[0]} 2. ${items[1]} 3. ${items[2]} ${asks[facetFor(mid,slot)%asks.length]}`;
    return {...base,question:cap(stem),options:[answer,...distractors],answer,explanation:`Pernyataan ${ci} tepat. ${clean(base.explanation||'')}`,questionType:'Pilihan Ganda Kompleks'};
  }

  function caseQ(base,mid,slot){
    const {context,prompt}=concisePrompt(base.question,175);
    if(context)return {...base,question:cap(`${context} ${prompt}`),questionType:'Analisis Kasus'};
    const actors=['Seorang nasabah','Petugas layanan','Relationship manager','Analis kredit','Petugas operasional','Tim kepatuhan','Supervisor cabang','Petugas KYC'];
    const bridges=['menghadapi kondisi berikut','perlu mengambil keputusan atas kondisi berikut','menilai situasi berikut','harus menentukan tindakan berdasarkan kondisi berikut'];
    const seed=hash(`case-v13:${mid}:${slot}`),a=actors[Math.floor(rnd(seed,1)*actors.length)],b=bridges[Math.floor(rnd(seed,2)*bridges.length)];
    return {...base,question:cap(`${a} ${b}: ${prompt}`),questionType:'Analisis Kasus'};
  }

  function longQ(base,mid,slot){
    const {context,prompt}=splitStem(base.question),reason=firstSentence(base.explanation||'');
    const ctx=context||clean(base.question).replace(/\?$/,'');
    const extra=reason&&reason.length<=220&&!lower(ctx).includes(lower(reason).slice(0,35))?` ${reason}`:'';
    const finalPrompt=prompt||['Apa tindakan yang paling tepat?','Apa kesimpulan yang paling tepat?','Keputusan mana yang paling sesuai?'][facetFor(mid,slot)%3];
    return {...base,question:cap(`${ctx}${extra} ${finalPrompt}`),questionType:'Analisis Kasus'};
  }

  function question(mid,slot){
    const base=baseFor(mid,slot);if(!base)return null;
    const t=isLongSlot(slot)?'long':typeFor(slot);
    let q=t==='long'?longQ(base,mid,slot):t==='normal'?normalQ(base,mid,slot):t==='except'?exceptQ(base,mid,slot):t==='cause'?causeQ(base,mid,slot):t==='complex'?complexQ(base,mid,slot):caseQ(base,mid,slot);
    q.question=cap(clean(q.question));
    const kind=isLongSlot(slot)?'long':'short',facet=facetFor(mid,slot);
    const structureKey=`${conceptKey(base)}|${q.questionType}|${kind}|facet-${facet}`;
    return {...q,id:`DB-M${mid}-V13-S${slot}`,source:`${base.source} · DB Bank ${slot}/${BANK_SIZE}`,generated:true,bankSlot:slot,bankEpoch:1,baseId:base.id,isLong:isLongSlot(slot),structureKey};
  }

  function replaceModule(mid,slots){const target=window.QUESTION_BANK||[],others=target.filter(q=>Number(q.moduleId)!==Number(mid)),qs=order(slots.map(s=>question(mid,s)).filter(Boolean));target.splice(0,target.length,...others,...qs)}
  function previewSlots(mid){
    const st=getState(mid);if(st.active.length===ACTIVE_LIMIT)return st.active;
    const shorts=[],longs=[],start=((mid*191)%BANK_SIZE)+1;
    for(let i=0;i<BANK_SIZE&&(shorts.length<SHORT_TARGET||longs.length<LONG_TARGET);i++){
      const s=((start-1+i*107)%BANK_SIZE)+1,target=isLongSlot(s)?longs:shorts,need=isLongSlot(s)?LONG_TARGET:SHORT_TARGET;
      if(target.length<need)target.push(s);
    }
    return [...shorts,...longs];
  }
  function applyPreviews(){const target=window.QUESTION_BANK||[],next=[];for(const mid of moduleIds)next.push(...order(previewSlots(mid).map(s=>question(mid,s)).filter(Boolean)));target.splice(0,target.length,...next)}

  async function rpc(name,body){const r=await fetch(`${SUPA_URL}/rest/v1/rpc/${name}`,{method:'POST',cache:'no-store',headers:{'Content-Type':'application/json','apikey':SUPA_KEY},body:JSON.stringify(body||{})});if(!r.ok)throw new Error(await r.text()||name);return r.json()}
  async function dbUsed(mid){const d=await rpc('gbp_question_used_slots',{p_client_id:clientId,p_module_id:mid});return new Set((d?.used||[]).map(Number))}
  function candidates(mid,used,attempted,longFlag,limit=240){
    const out=[],start=1+Math.floor(Math.random()*BANK_SIZE),step=107;
    for(let i=0;i<BANK_SIZE&&out.length<limit;i++){
      const s=((start-1+i*step)%BANK_SIZE)+1;if(isLongSlot(s)!==longFlag||used.has(s)||attempted.has(s))continue;attempted.add(s);
      const q=question(mid,s);if(!q)continue;if(!longFlag&&clean(q.question).length>280)continue;
      out.push(s);
    }
    return out;
  }
  function payload(mid,slots){return slots.map(s=>{const q=question(mid,s);return{slot:s,question:q.question,options:q.options,answer:q.answer,explanation:q.explanation,source:q.source,baseId:q.baseId,questionType:q.questionType,difficulty:q.difficulty,structureKey:q.structureKey}})}
  async function reserveKind(mid,used,accepted,want,longFlag){
    const attempted=new Set();
    for(let round=0;round<12&&accepted.length<want;round++){
      const cand=candidates(mid,used,attempted,longFlag,240);if(!cand.length)break;
      const d=await rpc('gbp_question_register_batch',{p_client_id:clientId,p_module_id:mid,p_questions:payload(mid,cand),p_requested_count:want-accepted.length});
      for(const s of (d?.accepted_slots||[]).map(Number))if(!accepted.includes(s)){accepted.push(s);used.add(s)}
    }
  }
  async function reserveNew(mid){
    const used=await dbUsed(mid),shorts=[],longs=[];await reserveKind(mid,used,shorts,SHORT_TARGET,false);await reserveKind(mid,used,longs,LONG_TARGET,true);
    if(shorts.length!==SHORT_TARGET||longs.length!==LONG_TARGET)throw new Error(`unique-mix-${shorts.length}-${longs.length}`);
    const active=[...shorts,...longs];saveState(mid,{active,synced:true,updatedAt:Date.now()});replaceModule(mid,active);return active;
  }
  async function ensureModule(mid){const st=getState(mid);if(st.synced&&st.active.length===ACTIVE_LIMIT){replaceModule(mid,st.active);return st.active}return reserveNew(mid)}

  function clearProgress(mid){try{const all=JSON.parse(localStorage.getItem(PROGRESS_KEY)||'{}')||{};delete all[String(mid)];localStorage.setItem(PROGRESS_KEY,JSON.stringify(all))}catch(e){localStorage.removeItem(PROGRESS_KEY)}try{window.GBPApp?.clearModuleProgress?.(mid)}catch(e){}}
  const toast=msg=>{const el=document.getElementById('toast');if(!el)return;el.textContent=msg;el.classList.remove('hidden');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.add('hidden'),4000)};
  const setBusy=(btn,on)=>{if(!btn)return;btn.disabled=on;btn.dataset.oldText=btn.dataset.oldText||btn.textContent;btn.textContent=on?'Menyiapkan soal baru…':btn.dataset.oldText};
  async function generate(mid,button){setBusy(button,true);try{await reserveNew(mid);clearProgress(mid);try{window.GBPAnalytics?.track?.('generate_questions',{moduleId:mid,day:pool(mid)[0]?.day||null,questionCount:50,meta:{databaseBank:true,engine:'v13',noRepeat:true,fullUnique:true,short:45,long:5,naturalStem:true}})}catch(e){}sessionStorage.setItem('gbpAutoOpenModule',String(mid));sessionStorage.setItem('gbpGenerationToast','50 soal baru aktif tanpa mengulang set sebelumnya.');location.reload()}catch(e){console.error(e);toast('Belum tersedia 50 soal yang lolos filter uniqueness. Coba lagi.');setBusy(button,false)}}
  function midFromStart(btn){return Number(btn?.dataset?.moduleStart||btn?.dataset?.specialStart||btn?.dataset?.nupmkStart||0)||null}
  async function prepareSetup(button){const mids=[...document.querySelectorAll('.setup-module-card.selected')].map(x=>Number(x.dataset.module)).filter(Boolean);if(!mids.length)return false;setBusy(button,true);for(const mid of mids)await ensureModule(mid);setBusy(button,false);return true}

  document.addEventListener('click',e=>{
    const gen=e.target.closest?.('.quiz-generate-btn');if(gen){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();const name=document.getElementById('moduleTag')?.textContent?.trim(),q=(window.QUESTION_BANK||[]).find(x=>x.moduleName===name),mid=q?Number(q.moduleId):null;if(mid&&confirm('Generate 50 soal baru? Soal yang sudah dipakai tetap tercatat dan tidak akan dipilih kembali.'))generate(mid,gen);return}
    const setup=e.target.closest?.('#startQuizBtn');if(setup&&setup.dataset.dbPrepared!=='1'){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();prepareSetup(setup).then(ok=>{if(!ok){setBusy(setup,false);return}setup.dataset.dbPrepared='1';setup.click();setTimeout(()=>delete setup.dataset.dbPrepared,0)}).catch(err=>{console.error(err);setBusy(setup,false);toast('Koneksi bank soal database gagal. Silakan coba lagi.')});return}
    const start=e.target.closest?.('[data-module-start],[data-special-start],[data-nupmk-start]');if(!start||start.dataset.dbPrepared==='1')return;const mid=midFromStart(start);if(!mid)return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();setBusy(start,true);ensureModule(mid).then(()=>{setBusy(start,false);start.dataset.dbPrepared='1';start.click();setTimeout(()=>delete start.dataset.dbPrepared,0)}).catch(err=>{console.error(err);setBusy(start,false);toast('Koneksi bank soal database gagal. Silakan coba lagi.')});
  },true);

  applyPreviews();
  document.addEventListener('DOMContentLoaded',()=>{if(window.GBPQuestionBank){window.GBPQuestionBank.generate=mid=>generate(mid,document.querySelector('.quiz-generate-btn'));window.GBPQuestionBank.bankInfo=mid=>{const st=getState(mid);return{active:st.active.length||50,seen:null,remaining:null,database:true,engine:'v13'}}}window.GBPDatabaseQuestionBank={engine:'v13',bankSize:BANK_SIZE,ensureModule,reserveNew,clientId}});
})();