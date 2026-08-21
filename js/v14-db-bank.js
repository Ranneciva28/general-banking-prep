(() => {
  const SUPA_URL='https://pnisrktkkbzspolkfkag.supabase.co';
  const SUPA_KEY='sb_publishable_ClLcjnxymypzS2O6x1TzwA_c9y7-j1Y';
  const SESSION_KEY='gbpAnalyticsSessionV1';
  const STATE_KEY='gbpDbBankV14';
  const PROGRESS_KEY='generalBankingModuleProgressV1';
  const LOCAL_SEEN_KEY='gbpQuestionTextSeenV17';
  const BANK_SIZE=5000, ACTIVE_LIMIT=50, SHORT_TARGET=45, LONG_TARGET=5;
  const SOURCE=[...(window.__GBP_SOURCE_BANK__||[])];
  if(!SOURCE.length)return;

  const clean=s=>String(s??'').replace(/\s+/g,' ').trim();
  const lower=s=>clean(s).toLocaleLowerCase('id-ID');
  const textKey=q=>lower(q?.question||'').replace(/[^a-z0-9à-öø-ÿ]+/giu,' ').replace(/\s+/g,' ').trim();
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
    const q=clean(raw),qm=q.lastIndexOf('?');
    if(qm<0)return{context:'',prompt:q};
    const before=q.slice(0,qm+1),boundaries=[...before.matchAll(/[.!?]\s+/g)];
    const start=boundaries.length?boundaries[boundaries.length-1].index+boundaries[boundaries.length-1][0].length:0;
    return{context:clean(q.slice(0,start)),prompt:clean(before.slice(start))};
  }
  function concisePrompt(raw,max=180){
    const {context,prompt}=splitStem(raw);
    if(prompt&&prompt.length<=max)return{context:context.length<=190?context:firstSentence(context),prompt};
    const q=clean(raw);if(q.length<=max)return{context:'',prompt:q};
    const f=firstSentence(q);return{context:'',prompt:f.length<=max?f:q.slice(0,max).replace(/\s+\S*$/,'').trim()+'?'};
  }
  function naturalContext(base,max=185){
    const x=splitStem(base.question).context;if(x&&x.length<=max)return x;if(x)return firstSentence(x);
    const q=clean(base.question);if(!q.includes('?')&&q.length<=max)return q;return '';
  }
  function isDirectPrompt(raw){const q=clean(raw);return q.includes('?')||/\.{2,}\s*$/.test(q)||/\b(disebut|berapa|apa|siapa|kapan|dimana|mengapa|bagaimana|manakah)\b/i.test(q)}

  const clientId=(()=>{let x=localStorage.getItem(SESSION_KEY);if(!x){x=`${Date.now().toString(36)}-${crypto.getRandomValues(new Uint32Array(2)).join('-')}`;localStorage.setItem(SESSION_KEY,x)}return x})();
  let state={};try{state=JSON.parse(localStorage.getItem(STATE_KEY)||'{}')||{}}catch(e){state={}}
  let localSeen={};try{localSeen=JSON.parse(localStorage.getItem(LOCAL_SEEN_KEY)||'{}')||{}}catch(e){localSeen={}}
  const getState=mid=>{const r=state[String(mid)]||{};return{active:Array.isArray(r.active)?r.active.map(Number):[],synced:!!r.synced,updatedAt:Number(r.updatedAt)||0}};
  const saveState=(mid,v)=>{state[String(mid)]={...getState(mid),...v};localStorage.setItem(STATE_KEY,JSON.stringify(state))};
  const saveSeen=()=>{try{const rows=Object.entries(localSeen).sort((a,b)=>b[1]-a[1]).slice(0,15000);localSeen=Object.fromEntries(rows);localStorage.setItem(LOCAL_SEEN_KEY,JSON.stringify(localSeen))}catch(e){}};

  try{const mk='gbpLocalFirstV17';if(!localStorage.getItem(mk)){localStorage.removeItem(STATE_KEY);state={};localStorage.setItem(mk,'1')}}catch(e){}

  const isLongSlot=slot=>slot%10===0;
  const typeFor=slot=>{const x=hash(`type-v14:${slot}`)%100;return x<55?'normal':x<75?'except':'case'};
  const facetFor=(mid,slot)=>hash(`facet-v14:${mid}:${slot}`)%64;
  function baseFor(mid,slot){
    const all=pool(mid);if(!all.length)return null;
    const shortPool=all.filter(q=>{const {prompt}=concisePrompt(q.question,190);return prompt.length>=15&&prompt.length<=190});
    const p=isLongSlot(slot)||!shortPool.length?all:shortPool,seed=hash(`base-v14:${mid}:${slot}`);
    return p[Math.floor(rnd(seed,11)*p.length)%p.length];
  }
  function normalQ(base,mid,slot){
    const raw=clean(base.question),{context,prompt}=concisePrompt(raw,190);
    if(raw.length<=280&&isDirectPrompt(raw))return {...base,question:cap(raw),questionType:'Pilihan Ganda'};
    if(context&&prompt)return {...base,question:cap(`${context} ${prompt}`),questionType:'Pilihan Ganda'};
    return {...base,question:cap(prompt||raw),questionType:'Pilihan Ganda'};
  }
  function exceptQ(base,mid,slot){
    const raw=clean(base.question);if(isDirectPrompt(raw))return normalQ(base,mid,slot);
    const context=naturalContext(base,190)||raw,tails=['Semua pilihan berikut tidak tepat, KECUALI:','Semua pernyataan berikut keliru, KECUALI:'];
    return {...base,question:cap(`${context} ${tails[facetFor(mid,slot)%tails.length]}`),questionType:'Kecuali'};
  }
  function caseQ(base,mid,slot){
    const raw=clean(base.question),{context,prompt}=concisePrompt(raw,175);
    if(isDirectPrompt(raw))return {...base,question:cap(raw),questionType:'Analisis Kasus'};
    if(context)return {...base,question:cap(`${context} ${prompt}`),questionType:'Analisis Kasus'};
    const actors=['Seorang nasabah','Petugas layanan','Relationship manager','Analis kredit','Petugas operasional','Tim kepatuhan','Supervisor cabang','Petugas KYC'];
    const bridges=['menghadapi kondisi berikut','perlu mengambil keputusan atas kondisi berikut','menilai situasi berikut','harus menentukan tindakan berdasarkan kondisi berikut'];
    const seed=hash(`case-v14:${mid}:${slot}`),a=actors[Math.floor(rnd(seed,1)*actors.length)],b=bridges[Math.floor(rnd(seed,2)*bridges.length)];
    return {...base,question:cap(`${a} ${b}: ${prompt}`),questionType:'Analisis Kasus'};
  }
  function longQ(base,mid,slot){
    const raw=clean(base.question);if(isDirectPrompt(raw)&&raw.length<=500)return {...base,question:cap(raw),questionType:'Analisis Kasus'};
    const {context,prompt}=splitStem(raw),reason=firstSentence(base.explanation||''),ctx=context||raw.replace(/\?$/,'');
    const extra=reason&&reason.length<=220&&!lower(ctx).includes(lower(reason).slice(0,35))?` ${reason}`:'';
    const finalPrompt=prompt||['Apa tindakan yang paling tepat?','Apa kesimpulan yang paling tepat?','Keputusan mana yang paling sesuai?'][facetFor(mid,slot)%3];
    return {...base,question:cap(`${ctx}${extra} ${finalPrompt}`),questionType:'Analisis Kasus'};
  }
  function question(mid,slot){
    const base=baseFor(mid,slot);if(!base)return null;
    const t=isLongSlot(slot)?'long':typeFor(slot);
    let q=t==='long'?longQ(base,mid,slot):t==='normal'?normalQ(base,mid,slot):t==='except'?exceptQ(base,mid,slot):caseQ(base,mid,slot);
    q.question=cap(clean(q.question));
    const kind=isLongSlot(slot)?'long':'short',facet=facetFor(mid,slot),structureKey=`${conceptKey(base)}|${q.questionType}|${kind}|facet-${facet}`;
    return {...q,id:`DB-M${mid}-V17-S${slot}`,source:`${base.source} · DB Bank ${slot}/${BANK_SIZE}`,generated:true,bankSlot:slot,bankEpoch:1,baseId:base.id,isLong:isLongSlot(slot),structureKey};
  }

  function replaceModule(mid,slots){
    const target=window.QUESTION_BANK||[],others=target.filter(q=>Number(q.moduleId)!==Number(mid)),seen=new Set(),qs=[];
    for(const slot of slots){const q=question(mid,slot),k=textKey(q);if(!q||!k||seen.has(k))continue;seen.add(k);qs.push(q)}
    target.splice(0,target.length,...others,...order(qs));
  }
  function previewSlots(mid){
    const st=getState(mid);if(st.active.length===ACTIVE_LIMIT)return st.active;
    const shorts=[],longs=[],seen=new Set(),start=((mid*191)%BANK_SIZE)+1;
    for(let i=0;i<BANK_SIZE&&(shorts.length<SHORT_TARGET||longs.length<LONG_TARGET);i++){
      const s=((start-1+i*107)%BANK_SIZE)+1,q=question(mid,s),k=textKey(q);if(!q||!k||seen.has(k))continue;
      const target=isLongSlot(s)?longs:shorts,need=isLongSlot(s)?LONG_TARGET:SHORT_TARGET;if(target.length>=need)continue;
      seen.add(k);target.push(s);
    }
    return [...shorts,...longs];
  }
  function applyPreviews(){
    const target=window.QUESTION_BANK||[],next=[],globalSeen=new Set();
    for(const mid of moduleIds){for(const s of previewSlots(mid)){const q=question(mid,s),k=textKey(q);if(!q||!k||globalSeen.has(k))continue;globalSeen.add(k);next.push(q)}}
    target.splice(0,target.length,...order(next));
  }

  async function rpc(name,body){const r=await fetch(`${SUPA_URL}/rest/v1/rpc/${name}`,{method:'POST',cache:'no-store',headers:{'Content-Type':'application/json','apikey':SUPA_KEY},body:JSON.stringify(body||{})});if(!r.ok)throw new Error(await r.text()||name);return r.json()}
  function payload(mid,slots){return slots.map(s=>{const q=question(mid,s);return{slot:s,question:q.question,options:q.options,answer:q.answer,explanation:q.explanation,source:q.source,baseId:q.baseId,questionType:q.questionType,difficulty:q.difficulty,structureKey:q.structureKey}})}

  function pickLocalUnique(mid){
    const shorts=[],longs=[],seen=new Set(),start=1+Math.floor(Math.random()*BANK_SIZE),step=109;
    const scan=(ignoreHistory=false)=>{
      for(let i=0;i<BANK_SIZE&&(shorts.length<SHORT_TARGET||longs.length<LONG_TARGET);i++){
        const slot=((start-1+i*step)%BANK_SIZE)+1,q=question(mid,slot),k=textKey(q);if(!q||!k||seen.has(k)||(!ignoreHistory&&localSeen[k]))continue;
        const target=isLongSlot(slot)?longs:shorts,need=isLongSlot(slot)?LONG_TARGET:SHORT_TARGET;if(target.length>=need)continue;
        seen.add(k);target.push(slot);
      }
    };
    scan(false);if(shorts.length<SHORT_TARGET||longs.length<LONG_TARGET)scan(true);
    const active=[...shorts,...longs];
    if(active.length<ACTIVE_LIMIT){for(const s of previewSlots(mid)){const q=question(mid,s),k=textKey(q);if(!q||!k||seen.has(k))continue;seen.add(k);active.push(s);if(active.length===ACTIVE_LIMIT)break}}
    for(const s of active){const k=textKey(question(mid,s));if(k)localSeen[k]=Date.now()}
    saveSeen();saveState(mid,{active,synced:false,updatedAt:Date.now()});replaceModule(mid,active);return active;
  }
  async function syncActive(mid,active){
    if(!active?.length)return;
    try{await rpc('gbp_question_register_batch',{p_client_id:clientId,p_module_id:mid,p_questions:payload(mid,active),p_requested_count:Math.min(50,active.length)});saveState(mid,{active,synced:true,updatedAt:Date.now()})}catch(e){console.warn('Background database sync skipped',e)}
  }
  async function reserveNew(mid){const active=pickLocalUnique(mid);setTimeout(()=>syncActive(mid,active),0);return active}
  async function ensureModule(mid){
    const st=getState(mid);
    if(st.active.length===ACTIVE_LIMIT){const seen=new Set();let valid=true;for(const slot of st.active){const k=textKey(question(mid,slot));if(!k||seen.has(k)){valid=false;break}seen.add(k)}if(valid){replaceModule(mid,st.active);if(!st.synced)setTimeout(()=>syncActive(mid,st.active),0);return st.active}}
    return reserveNew(mid);
  }

  function clearProgress(mid){try{const all=JSON.parse(localStorage.getItem(PROGRESS_KEY)||'{}')||{};delete all[String(mid)];localStorage.setItem(PROGRESS_KEY,JSON.stringify(all))}catch(e){localStorage.removeItem(PROGRESS_KEY)}try{window.GBPApp?.clearModuleProgress?.(mid)}catch(e){}}
  const toast=msg=>{const el=document.getElementById('toast');if(!el)return;el.textContent=msg;el.classList.remove('hidden');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.add('hidden'),4000)};
  const setBusy=(btn,on)=>{if(!btn)return;btn.disabled=on;btn.dataset.oldText=btn.dataset.oldText||btn.textContent;btn.textContent=on?'Menyiapkan soal baru…':btn.dataset.oldText};
  async function generate(mid,button){
    setBusy(button,true);
    try{const active=await reserveNew(mid);clearProgress(mid);try{window.GBPAnalytics?.track?.('generate_questions',{moduleId:mid,day:pool(mid)[0]?.day||null,questionCount:active.length,meta:{databaseBank:true,engine:'v17-local-first',noRepeat:true,fullUnique:true,short:45,long:5,naturalStem:true}})}catch(e){}sessionStorage.setItem('gbpAutoOpenModule',String(mid));sessionStorage.setItem('gbpGenerationToast','50 soal baru aktif tanpa duplikasi stem.');location.reload()}
    catch(e){console.error(e);setBusy(button,false);toast('Bank soal lokal belum dapat disiapkan. Silakan coba lagi.')}
  }
  function midFromStart(btn){return Number(btn?.dataset?.moduleStart||btn?.dataset?.specialStart||btn?.dataset?.nupmkStart||0)||null}
  async function prepareSetup(button){const mids=[...document.querySelectorAll('.setup-module-card.selected')].map(x=>Number(x.dataset.module)).filter(Boolean);if(!mids.length)return false;setBusy(button,true);for(const mid of mids)await ensureModule(mid);setBusy(button,false);return true}

  document.addEventListener('click',e=>{
    const gen=e.target.closest?.('.quiz-generate-btn');
    if(gen){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();const name=document.getElementById('moduleTag')?.textContent?.trim(),q=(window.QUESTION_BANK||[]).find(x=>x.moduleName===name),mid=q?Number(q.moduleId):null;if(mid&&confirm('Generate 50 soal baru? Soal yang sudah dipakai tetap tercatat dan tidak akan dipilih kembali.'))generate(mid,gen);return}
    const setup=e.target.closest?.('#startQuizBtn');
    if(setup&&setup.dataset.dbPrepared!=='1'){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();prepareSetup(setup).then(ok=>{if(!ok){setBusy(setup,false);return}setup.dataset.dbPrepared='1';setup.click();setTimeout(()=>delete setup.dataset.dbPrepared,0)}).catch(err=>{console.error(err);setBusy(setup,false);setup.dataset.dbPrepared='1';setup.click();setTimeout(()=>delete setup.dataset.dbPrepared,0)});return}
    const start=e.target.closest?.('[data-module-start],[data-special-start],[data-nupmk-start]');if(!start||start.dataset.dbPrepared==='1')return;const mid=midFromStart(start);if(!mid)return;
    e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();setBusy(start,true);ensureModule(mid).then(()=>{setBusy(start,false);start.dataset.dbPrepared='1';start.click();setTimeout(()=>delete start.dataset.dbPrepared,0)}).catch(err=>{console.error(err);setBusy(start,false);start.dataset.dbPrepared='1';start.click();setTimeout(()=>delete start.dataset.dbPrepared,0)});
  },true);

  applyPreviews();
  document.addEventListener('DOMContentLoaded',()=>{if(window.GBPQuestionBank){window.GBPQuestionBank.generate=mid=>generate(mid,document.querySelector('.quiz-generate-btn'));window.GBPQuestionBank.bankInfo=mid=>{const st=getState(mid);return{active:st.active.length||50,seen:null,remaining:null,database:true,engine:'v17-local-first'}}}window.GBPDatabaseQuestionBank={engine:'v17-local-first',bankSize:BANK_SIZE,ensureModule,reserveNew,clientId}});
})();