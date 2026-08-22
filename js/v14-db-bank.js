(() => {
  const SUPA_URL='https://pnisrktkkbzspolkfkag.supabase.co';
  const SUPA_KEY='sb_publishable_ClLcjnxymypzS2O6x1TzwA_c9y7-j1Y';
  const SESSION_KEY='gbpAnalyticsSessionV1';
  const STATE_KEY='gbpDbBankV24';
  const PROGRESS_KEY='generalBankingModuleProgressV1';
  const LOCAL_SEEN_KEY='gbpQuestionSeenV24';
  const ACTIVE_LIMIT=25;
  const SOURCE=[...(window.__GBP_SOURCE_BANK__||[])];
  if(!SOURCE.length)return;

  const clean=s=>String(s??'').replace(/\s+/g,' ').trim();
  const norm=s=>clean(s).toLocaleLowerCase('id-ID').replace(/[^a-z0-9à-öø-ÿ]+/giu,' ').replace(/\s+/g,' ').trim();
  const textKey=q=>norm(q?.question);
  const optionKey=q=>(Array.isArray(q?.options)?q.options:[]).map(norm).filter(Boolean).sort().join('|');
  const semanticKey=q=>norm(q?.conceptSignature||`${q?.rootQuestionId||q?.baseId||q?.id||''}|${q?.variantMode||''}|${(q?.optionConcepts||[]).join('|')}`);
  const rootKey=q=>String(q?.rootQuestionId||q?.baseId||q?.id||'');
  const rank=q=>({Sedang:1,'Sedang-Sulit':2,Sulit:3,Challenge:4,Expert:5}[q?.difficulty]||3);
  const order=a=>[...a].sort((x,y)=>rank(y)-rank(x)||String(x.id).localeCompare(String(y.id)));
  const pool=mid=>SOURCE.filter(q=>Number(q.moduleId)===Number(mid)).slice(0,5000);
  const moduleIds=[...new Set(SOURCE.map(q=>Number(q.moduleId)))].filter(Boolean).sort((a,b)=>a-b);
  const clientId=(()=>{let x=localStorage.getItem(SESSION_KEY);if(!x){x=`${Date.now().toString(36)}-${crypto.getRandomValues(new Uint32Array(2)).join('-')}`;localStorage.setItem(SESSION_KEY,x)}return x})();

  let state={};try{state=JSON.parse(localStorage.getItem(STATE_KEY)||'{}')||{}}catch(e){state={}}
  let localSeen={};try{localSeen=JSON.parse(localStorage.getItem(LOCAL_SEEN_KEY)||'{}')||{}}catch(e){localSeen={}}
  const getState=mid=>{const r=state[String(mid)]||{};return{active:Array.isArray(r.active)?r.active.map(Number):[],synced:!!r.synced,updatedAt:Number(r.updatedAt)||0}};
  const saveState=(mid,v)=>{state[String(mid)]={...getState(mid),...v};localStorage.setItem(STATE_KEY,JSON.stringify(state))};
  const saveSeen=()=>{try{const rows=Object.entries(localSeen).sort((a,b)=>b[1]-a[1]).slice(0,25000);localSeen=Object.fromEntries(rows);localStorage.setItem(LOCAL_SEEN_KEY,JSON.stringify(localSeen))}catch(e){}};
  try{const mk='gbpConciseSelectorV24';if(!localStorage.getItem(mk)){localStorage.removeItem('gbpDbBankV14');localStorage.removeItem('gbpDbBankV20');localStorage.removeItem('gbpQuestionSeenV20');localStorage.removeItem(STATE_KEY);state={};localStorage.setItem(mk,'1')}}catch(e){}

  function question(mid,slot){const p=pool(mid),base=p[Number(slot)-1];if(!base)return null;return {...base,id:base.id||`V24-M${mid}-S${slot}`,bankSlot:Number(slot),bankEpoch:24,generated:true,baseId:base.rootQuestionId||base.baseId||base.id,structureKey:base.conceptSignature||`${rootKey(base)}|${base.variantMode||''}|${semanticKey(base)}`};}
  function validUnique(q,seenStem,seenOpt,seenSem){const sk=textKey(q),ok=optionKey(q),ck=semanticKey(q);return !!(q&&sk&&ok&&ck&&!seenStem.has(sk)&&!seenSem.has(ck)&&Array.isArray(q.options)&&q.options.length===4&&q.options.some(x=>clean(x)===clean(q.answer)));}

  function buildSet(mid,{respectHistory=true,seedOffset=0}={}){
    const p=pool(mid),active=[],seenStem=new Set(),seenOpt=new Set(),seenSem=new Set(),rootCounts=new Map();if(!p.length)return active;
    const start=Math.abs(Date.now()+seedOffset+mid*9973)%p.length,step=p.length>1?97:1;
    const scan=(maxRoot,ignoreHistory,ignoreRootHistory)=>{
      for(let i=0;i<p.length*3&&active.length<ACTIVE_LIMIT;i++){
        const slot=((start+i*step)%p.length)+1,q=question(mid,slot);if(!q||!validUnique(q,seenStem,seenOpt,seenSem))continue;
        const sk=textKey(q),ok=optionKey(q),ck=semanticKey(q),rk=rootKey(q);if((rootCounts.get(rk)||0)>=maxRoot)continue;
        if(respectHistory&&!ignoreHistory&&(localSeen['q:'+sk]||localSeen['c:'+ck]))continue;
        if(respectHistory&&!ignoreRootHistory&&localSeen['r:'+rk])continue;
        seenStem.add(sk);seenOpt.add(ok);seenSem.add(ck);rootCounts.set(rk,(rootCounts.get(rk)||0)+1);active.push(slot);
      }
    };
    scan(1,false,false);if(active.length<ACTIVE_LIMIT)scan(2,false,true);if(active.length<ACTIVE_LIMIT)scan(4,false,true);if(active.length<ACTIVE_LIMIT)scan(8,true,true);if(active.length<ACTIVE_LIMIT)scan(16,true,true);if(active.length<ACTIVE_LIMIT)scan(25,true,true);
    return active.slice(0,ACTIVE_LIMIT);
  }
  function replaceModule(mid,slots){const target=window.QUESTION_BANK||[],others=target.filter(q=>Number(q.moduleId)!==Number(mid)),seenStem=new Set(),seenOpt=new Set(),seenSem=new Set(),qs=[];for(const slot of slots){const q=question(mid,slot);if(!validUnique(q,seenStem,seenOpt,seenSem))continue;seenStem.add(textKey(q));seenOpt.add(optionKey(q));seenSem.add(semanticKey(q));qs.push(q)}target.splice(0,target.length,...others,...order(qs));}
  function previewSlots(mid){const st=getState(mid);if(st.active.length===ACTIVE_LIMIT)return st.active;return buildSet(mid,{respectHistory:false,seedOffset:mid*31});}
  function applyPreviews(){const target=window.QUESTION_BANK||[],next=[];for(const mid of moduleIds){for(const slot of previewSlots(mid)){const q=question(mid,slot);if(q)next.push(q)}}target.splice(0,target.length,...order(next));}

  async function rpc(name,body){const r=await fetch(`${SUPA_URL}/rest/v1/rpc/${name}`,{method:'POST',cache:'no-store',headers:{'Content-Type':'application/json','apikey':SUPA_KEY},body:JSON.stringify(body||{})});if(!r.ok)throw new Error(await r.text()||name);return r.json();}
  function payload(mid,slots){return slots.map(slot=>{const q=question(mid,slot);return{slot,question:q.question,options:q.options,answer:q.answer,explanation:q.explanation,source:q.source,baseId:q.baseId,questionType:q.questionType||'Analisis Kasus',difficulty:q.difficulty||'Challenge',structureKey:q.structureKey};});}
  async function syncActive(mid,active){if(!active?.length)return;try{const d=await rpc('gbp_question_register_batch',{p_client_id:clientId,p_module_id:mid,p_questions:payload(mid,active),p_requested_count:active.length});saveState(mid,{active,synced:Number(d?.accepted_count||0)>=active.length,updatedAt:Date.now()});}catch(e){console.warn('Background database sync skipped',e);}}
  function markSeen(mid,active){for(const slot of active){const q=question(mid,slot);if(!q)continue;const sk=textKey(q),ok=optionKey(q),ck=semanticKey(q),rk=rootKey(q),now=Date.now();if(sk)localSeen['q:'+sk]=now;if(ok)localSeen['o:'+ok]=now;if(ck)localSeen['c:'+ck]=now;if(rk)localSeen['r:'+rk]=now;}saveSeen();}
  function pickLocalUnique(mid){const active=buildSet(mid,{respectHistory:true,seedOffset:Math.floor(Math.random()*1e9)});if(active.length<ACTIVE_LIMIT)throw new Error(`insufficient-unique-bank-${mid}-${active.length}`);markSeen(mid,active);saveState(mid,{active,synced:false,updatedAt:Date.now()});replaceModule(mid,active);return active;}
  async function reserveNew(mid){const active=pickLocalUnique(mid);setTimeout(()=>syncActive(mid,active),0);return active;}
  async function ensureModule(mid){const st=getState(mid);if(st.active.length===ACTIVE_LIMIT){const seenStem=new Set(),seenOpt=new Set(),seenSem=new Set();let valid=true;for(const slot of st.active){const q=question(mid,slot);if(!validUnique(q,seenStem,seenOpt,seenSem)){valid=false;break;}seenStem.add(textKey(q));seenOpt.add(optionKey(q));seenSem.add(semanticKey(q));}if(valid){replaceModule(mid,st.active);if(!st.synced)setTimeout(()=>syncActive(mid,st.active),0);return st.active;}}return reserveNew(mid);}

  function clearProgress(mid){try{const all=JSON.parse(localStorage.getItem(PROGRESS_KEY)||'{}')||{};delete all[String(mid)];localStorage.setItem(PROGRESS_KEY,JSON.stringify(all));}catch(e){localStorage.removeItem(PROGRESS_KEY);}try{window.GBPApp?.clearModuleProgress?.(mid);}catch(e){}}
  const toast=msg=>{const el=document.getElementById('toast');if(!el)return;el.textContent=msg;el.classList.remove('hidden');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.add('hidden'),4000);};
  const setBusy=(btn,on)=>{if(!btn)return;btn.disabled=on;btn.dataset.oldText=btn.dataset.oldText||btn.textContent;btn.textContent=on?'Menyiapkan 25 soal baru…':btn.dataset.oldText;};
  async function generate(mid,button){setBusy(button,true);try{const active=await reserveNew(mid);clearProgress(mid);try{window.GBPAnalytics?.track?.('generate_questions',{moduleId:mid,day:pool(mid)[0]?.day||null,questionCount:active.length,meta:{databaseBank:true,engine:'v24-concise-grounded',noRepeat:true,uniqueStem:true,uniqueOptions:false,uniqueConcept:true,concise:true}});}catch(e){}sessionStorage.setItem('gbpAutoOpenModule',String(mid));sessionStorage.setItem('gbpGenerationToast','25 soal ringkas berbasis materi aktif. Stem dan konsep diprioritaskan belum pernah tampil.');location.reload();}catch(e){console.error(e);setBusy(button,false);toast('Belum tersedia 25 soal ringkas yang lolos filter kualitas. Coba generate kembali.');}}
  function midFromStart(btn){return Number(btn?.dataset?.moduleStart||btn?.dataset?.specialStart||btn?.dataset?.nupmkStart||0)||null;}
  async function prepareSetup(button){const mids=[...document.querySelectorAll('.setup-module-card.selected')].map(x=>Number(x.dataset.module)).filter(Boolean);if(!mids.length)return false;setBusy(button,true);for(const mid of mids)await ensureModule(mid);setBusy(button,false);return true;}

  document.addEventListener('click',e=>{
    const gen=e.target.closest?.('.quiz-generate-btn');if(gen){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();const name=document.getElementById('moduleTag')?.textContent?.trim(),q=(window.QUESTION_BANK||[]).find(x=>x.moduleName===name),mid=q?Number(q.moduleId):null;if(mid&&confirm('Generate 25 soal ringkas baru? Sistem akan memprioritaskan stem dan konsep yang belum pernah tampil.'))generate(mid,gen);return;}
    const setup=e.target.closest?.('#startQuizBtn');if(setup&&setup.dataset.dbPrepared!=='1'){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();prepareSetup(setup).then(ok=>{if(!ok){setBusy(setup,false);return;}setup.dataset.dbPrepared='1';setup.click();setTimeout(()=>delete setup.dataset.dbPrepared,0);}).catch(err=>{console.error(err);setBusy(setup,false);setup.dataset.dbPrepared='1';setup.click();setTimeout(()=>delete setup.dataset.dbPrepared,0);});return;}
    const start=e.target.closest?.('[data-module-start],[data-special-start],[data-nupmk-start]');if(!start||start.dataset.dbPrepared==='1')return;const mid=midFromStart(start);if(!mid)return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();setBusy(start,true);ensureModule(mid).then(()=>{setBusy(start,false);start.dataset.dbPrepared='1';start.click();setTimeout(()=>delete start.dataset.dbPrepared,0);}).catch(err=>{console.error(err);setBusy(start,false);start.dataset.dbPrepared='1';start.click();setTimeout(()=>delete start.dataset.dbPrepared,0);});
  },true);

  applyPreviews();
  window.GBPDatabaseQuestionBank={engine:'v24-concise-grounded',bankSize:Math.max(...moduleIds.map(mid=>pool(mid).length),0),ensureModule,reserveNew,clientId};
  document.addEventListener('DOMContentLoaded',()=>{if(window.GBPQuestionBank){window.GBPQuestionBank.generate=mid=>generate(mid,document.querySelector('.quiz-generate-btn'));window.GBPQuestionBank.bankInfo=mid=>{const st=getState(mid);return{active:st.active.length||ACTIVE_LIMIT,database:true,engine:'v24-concise-grounded'};};}});
})();