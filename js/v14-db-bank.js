(() => {
  const SUPA_URL='https://pnisrktkkbzspolkfkag.supabase.co';
  const SUPA_KEY='sb_publishable_ClLcjnxymypzS2O6x1TzwA_c9y7-j1Y';
  const SESSION_KEY='gbpAnalyticsSessionV1';
  const STATE_KEY='gbpDbBankV26';
  const LEGACY_STATE_KEY='gbpDbBankV25';
  const PROGRESS_KEY='generalBankingModuleProgressV1';
  const LOCAL_SEEN_KEY='gbpQuestionSeenV26';
  const LEGACY_SEEN_KEY='gbpQuestionSeenV25';
  const ACTIVE_LIMIT=25;
  const SOURCE=[...(window.__GBP_SOURCE_BANK__||[])];
  if(!SOURCE.length)return;

  const clean=s=>String(s??'').replace(/\s+/g,' ').trim();
  const norm=s=>clean(s).toLocaleLowerCase('id-ID').replace(/[^a-z0-9à-öø-ÿ]+/giu,' ').replace(/\s+/g,' ').trim();
  const hash=str=>{let h=2166136261;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
  const rank=q=>({Sedang:1,'Sedang-Sulit':2,Sulit:3,Challenge:4,Expert:5}[q?.difficulty]||3);
  const order=a=>[...a].sort((x,y)=>rank(y)-rank(x)||String(x.id).localeCompare(String(y.id)));
  const stop=new Set('yang dan atau untuk pada dalam dengan dari ke di ini itu tersebut sebuah suatu seorang adalah ialah merupakan sebagai agar serta paling lebih tepat sesuai analisis keputusan tindakan kesimpulan jawaban pilihan manakah apakah apa bagaimana mengapa berikut kondisi kasus situasi bank nasabah unit petugas proses dilakukan melakukan saat ketika jika maka perlu harus dapat akan mana berdasarkan terhadap terkait konteks'.split(' '));
  const promptTail=/(?:[.!?…]\s*)?(?:analisis|keputusan|tindakan|kesimpulan|jawaban|pilihan|fungsi|konsep|produk|risiko|transformasi|langkah|kontrol|prinsip|peran)\s+(?:apa|mana|yang)?\s*(?:paling\s+)?(?:tepat|sesuai|relevan|benar|utama|dominan|baik)?\s*(?:adalah)?\s*[.?…]*$/i;
  const genericAsk=/(?:[.!?…]\s*)?(?:manakah|apakah|apa|bagaimana|mengapa)\b[^.!?…]{0,95}[?…]*$/i;

  const POOLS=new Map();
  for(const q of SOURCE){
    const mid=Number(q?.moduleId)||0;if(!mid)continue;
    if(!POOLS.has(mid))POOLS.set(mid,[]);
    if(POOLS.get(mid).length<5000)POOLS.get(mid).push(q);
  }
  const moduleIds=[...POOLS.keys()].sort((a,b)=>a-b);
  const pool=mid=>POOLS.get(Number(mid))||[];
  const clientId=(()=>{let x=localStorage.getItem(SESSION_KEY);if(!x){x=`${Date.now().toString(36)}-${crypto.getRandomValues(new Uint32Array(2)).join('-')}`;localStorage.setItem(SESSION_KEY,x)}return x})();

  const META=new WeakMap();
  function qMeta(q){
    if(!q)return{text:'',semantic:'',root:'',core:'',tokens:[],bigrams:[]};
    const cached=META.get(q);if(cached)return cached;
    const text=norm(q.question),root=String(q.rootQuestionId||q.baseId||q.id||''),semantic=norm(q.conceptSignature||`${q.moduleId||''}|${root}`);
    let stem=clean(q.question||'').replace(promptTail,'').trim();
    const stripped=stem.replace(genericAsk,'').trim();if(stripped.length>=45)stem=stripped;
    const core=norm(stem),tokens=core.split(' ').filter(t=>t.length>2&&!stop.has(t)),bigrams=[];
    for(let i=0;i<tokens.length-1;i++)bigrams.push(`${tokens[i]} ${tokens[i+1]}`);
    const meta={text,root,semantic,core,tokens,bigrams};META.set(q,meta);return meta;
  }
  const jaccard=(a,b)=>{if(!a.length||!b.length)return 0;const A=new Set(a),B=new Set(b);let n=0;for(const x of A)if(B.has(x))n++;return n/(A.size+B.size-n)};
  const prefixMatch=(a,b,n=10)=>{if(a.length<n||b.length<n)return false;let same=0;for(let i=0;i<n;i++)if(a[i]===b[i])same++;return same>=Math.ceil(n*.8)};
  function nearDuplicate(a,b,threshold=.76){
    if(!a||!b)return false;const A=qMeta(a),B=qMeta(b);
    if(A.root&&A.root===B.root)return true;
    if(A.text&&A.text===B.text)return true;
    if(A.core.length>=28&&A.core===B.core)return true;
    const min=Math.min(A.tokens.length,B.tokens.length);
    if(min>=6&&jaccard(A.tokens,B.tokens)>=threshold)return true;
    if(min>=8&&prefixMatch(A.tokens,B.tokens,Math.min(10,min))&&jaccard(A.bigrams,B.bigrams)>=.58)return true;
    if(Math.min(A.bigrams.length,B.bigrams.length)>=5&&jaccard(A.bigrams,B.bigrams)>=.72)return true;
    return false;
  }
  function validQuestion(q){
    if(!q||!Array.isArray(q.options)||q.options.length!==4)return false;
    const m=qMeta(q);return !!(m.text&&m.root&&m.semantic&&new Set(q.options.map(norm)).size===4&&q.options.some(x=>clean(x)===clean(q.answer)));
  }
  function canAdd(q,chosen,excluded,threshold){
    if(!validQuestion(q))return false;
    for(const old of excluded)if(nearDuplicate(q,old,.84))return false;
    for(const old of chosen)if(nearDuplicate(q,old,threshold))return false;
    return true;
  }

  const parseStore=(key,fallback={})=>{try{return JSON.parse(localStorage.getItem(key)||'null')||fallback}catch(e){return fallback}};
  let state=parseStore(STATE_KEY,null)||parseStore(LEGACY_STATE_KEY,{});
  let localSeen=parseStore(LOCAL_SEEN_KEY,null)||parseStore(LEGACY_SEEN_KEY,{});
  const getState=mid=>{const r=state[String(mid)]||{};return{active:Array.isArray(r.active)?r.active.map(Number):[],synced:!!r.synced,updatedAt:Number(r.updatedAt)||0}};
  const saveState=(mid,v)=>{state[String(mid)]={...getState(mid),...v};try{localStorage.setItem(STATE_KEY,JSON.stringify(state))}catch(e){}};
  const saveSeen=()=>{try{const rows=Object.entries(localSeen).sort((a,b)=>b[1]-a[1]).slice(0,30000);localSeen=Object.fromEntries(rows);localStorage.setItem(LOCAL_SEEN_KEY,JSON.stringify(localSeen))}catch(e){}};

  const QUESTION_CACHE=new Map();
  function question(mid,slot){
    mid=Number(mid);slot=Number(slot);if(!QUESTION_CACHE.has(mid))QUESTION_CACHE.set(mid,new Map());
    const cache=QUESTION_CACHE.get(mid);if(cache.has(slot))return cache.get(slot);
    const base=pool(mid)[slot-1];if(!base)return null;
    const q={...base,id:base.id||`V26-M${mid}-S${slot}`,bankSlot:slot,bankEpoch:26,generated:true,baseId:base.rootQuestionId||base.baseId||base.id,structureKey:base.conceptSignature||`${mid}|${qMeta(base).root}`};
    cache.set(slot,q);return q;
  }
  function shuffledSlots(mid,seedOffset=0){
    return pool(mid).map((_,i)=>({slot:i+1,key:hash(`${mid}:${seedOffset}:${i+1}`)})).sort((a,b)=>a.key-b.key).map(x=>x.slot);
  }
  function buildSet(mid,{respectHistory=true,seedOffset=0,excludeSlots=[],excludeQuestions=[]}={}){
    const p=pool(mid),active=[],chosen=[],chosenRoots=new Set();if(!p.length)return active;
    const excludedSlotsSet=new Set((excludeSlots||[]).map(Number));
    const excluded=(excludeQuestions||[]).filter(Boolean),excludedRoots=new Set(excluded.map(q=>qMeta(q).root).filter(Boolean));
    const slots=shuffledSlots(mid,seedOffset);
    const scan=(ignoreHistory,threshold)=>{
      for(const slot of slots){
        if(active.length>=ACTIVE_LIMIT)break;if(excludedSlotsSet.has(slot))continue;
        const q=question(mid,slot);if(!q)continue;const m=qMeta(q);
        if(chosenRoots.has(m.root)||excludedRoots.has(m.root))continue;
        if(!ignoreHistory&&respectHistory&&(localSeen['q:'+m.text]||localSeen['c:'+m.semantic]||localSeen['r:'+m.root]))continue;
        if(!canAdd(q,chosen,excluded,threshold))continue;
        chosenRoots.add(m.root);chosen.push(q);active.push(slot);
      }
    };
    scan(false,.76);if(active.length<ACTIVE_LIMIT)scan(true,.76);if(active.length<ACTIVE_LIMIT)scan(true,.88);
    return active.slice(0,ACTIVE_LIMIT);
  }
  function validateSlots(mid,slots){
    if(!Array.isArray(slots)||slots.length!==ACTIVE_LIMIT)return false;
    const chosen=[];for(const slot of slots){const q=question(mid,slot);if(!canAdd(q,chosen,[],.88))return false;chosen.push(q)}return true;
  }

  const validated=new Set();
  function replaceModule(mid,slots){
    const target=window.QUESTION_BANK||[],others=target.filter(q=>Number(q.moduleId)!==Number(mid)),chosen=[],qs=[];
    for(const slot of slots){const q=question(mid,slot);if(!canAdd(q,chosen,[],.88))continue;chosen.push(q);qs.push(q)}
    if(qs.length!==ACTIVE_LIMIT)throw new Error(`invalid-active-set-${mid}-${qs.length}`);
    target.splice(0,target.length,...others,...order(qs));validated.add(Number(mid));
  }
  function previewSlots(mid){
    const st=getState(mid);if(validateSlots(mid,st.active)){validated.add(Number(mid));return st.active}
    const slots=buildSet(mid,{respectHistory:false,seedOffset:Number(mid)*31});
    if(slots.length!==ACTIVE_LIMIT)console.error(`Module ${mid} default bank only ${slots.length}/${ACTIVE_LIMIT}`,{pool:pool(mid).length});
    saveState(mid,{active:slots,synced:false,updatedAt:Date.now()});validated.add(Number(mid));return slots;
  }
  function applyPreviews(){
    const target=window.QUESTION_BANK||[],next=[];
    for(const mid of moduleIds){const slots=previewSlots(mid);if(slots.length!==ACTIVE_LIMIT)continue;for(const slot of slots){const q=question(mid,slot);if(q)next.push(q)}}
    target.splice(0,target.length,...order(next));
  }

  async function rpc(name,body){
    const r=await fetch(`${SUPA_URL}/rest/v1/rpc/${name}`,{method:'POST',cache:'no-store',headers:{'Content-Type':'application/json','apikey':SUPA_KEY},body:JSON.stringify(body||{})});
    if(!r.ok)throw new Error(await r.text()||name);return r.json();
  }
  function payload(mid,slots){return slots.map(slot=>{const q=question(mid,slot);return{slot,question:q.question,options:q.options,answer:q.answer,explanation:q.explanation,source:q.source,baseId:q.baseId,questionType:q.questionType||'Analisis Kasus',difficulty:q.difficulty||'Challenge',structureKey:q.structureKey}})};
  async function syncActive(mid,active){
    if(!active?.length)return;
    try{const d=await rpc('gbp_question_register_batch',{p_client_id:clientId,p_module_id:Number(mid),p_questions:payload(mid,active),p_requested_count:active.length});saveState(mid,{active,synced:Number(d?.accepted_count||0)>=active.length,updatedAt:Date.now()})}catch(e){console.warn('Background database sync skipped',e)}
  }
  function markSeen(mid,active){
    const now=Date.now();for(const slot of active){const q=question(mid,slot);if(!q)continue;const m=qMeta(q);if(m.text)localSeen['q:'+m.text]=now;if(m.semantic)localSeen['c:'+m.semantic]=now;if(m.root)localSeen['r:'+m.root]=now}saveSeen();
  }
  function pickLocalUnique(mid,{replaceCurrent=false}={}){
    const previous=getState(mid).active.filter(Boolean),previousQuestions=previous.map(slot=>question(mid,slot)).filter(Boolean);
    const active=buildSet(mid,{respectHistory:true,seedOffset:Math.floor(Math.random()*1e9),excludeSlots:replaceCurrent?previous:[],excludeQuestions:replaceCurrent?previousQuestions:[]});
    if(active.length<ACTIVE_LIMIT)throw new Error(`insufficient-distinct-bank-${mid}-${active.length}`);
    if(replaceCurrent){const next=active.map(slot=>question(mid,slot));for(const q of next)for(const old of previousQuestions)if(nearDuplicate(q,old,.84))throw new Error(`regeneration-overlap-${mid}`)}
    markSeen(mid,active);saveState(mid,{active,synced:false,updatedAt:Date.now()});replaceModule(mid,active);return active;
  }
  async function reserveNew(mid){const active=pickLocalUnique(Number(mid),{replaceCurrent:true});setTimeout(()=>syncActive(mid,active),0);return active}
  async function ensureModule(mid){
    mid=Number(mid);const st=getState(mid);
    if(validated.has(mid)&&st.active.length===ACTIVE_LIMIT){if(!st.synced)setTimeout(()=>syncActive(mid,st.active),0);return st.active}
    if(validateSlots(mid,st.active)){replaceModule(mid,st.active);if(!st.synced)setTimeout(()=>syncActive(mid,st.active),0);return st.active}
    const active=pickLocalUnique(mid,{replaceCurrent:false});setTimeout(()=>syncActive(mid,active),0);return active;
  }

  function clearProgress(mid){
    try{const all=JSON.parse(localStorage.getItem(PROGRESS_KEY)||'{}')||{};delete all[String(mid)];localStorage.setItem(PROGRESS_KEY,JSON.stringify(all))}catch(e){localStorage.removeItem(PROGRESS_KEY)}
    try{window.GBPApp?.clearModuleProgress?.(Number(mid))}catch(e){}
  }
  const toast=msg=>{const el=document.getElementById('toast');if(!el)return;el.textContent=msg;el.classList.remove('hidden');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.add('hidden'),3500)};
  const setBusy=(btn,on)=>{if(!btn)return;btn.disabled=on;btn.dataset.oldText=btn.dataset.oldText||btn.textContent;btn.textContent=on?'Menyiapkan 25 soal baru…':btn.dataset.oldText};
  async function generate(mid,button){
    setBusy(button,true);
    try{
      const active=await reserveNew(mid);clearProgress(mid);
      window.GBPAnalytics?.track?.('generate_questions',{moduleId:Number(mid),day:pool(mid)[0]?.day||null,questionCount:active.length,meta:{engine:'v26-indexed-lite',replaceAll25:true,inPlace:true}});
      window.GBPApp?.startModule?.(Number(mid));window.scrollTo({top:0,behavior:'auto'});setBusy(button,false);toast('25 soal baru sudah aktif tanpa reload halaman.');
    }catch(e){console.error(e);setBusy(button,false);toast('Belum tersedia 25 soal baru yang benar-benar berbeda untuk mengganti set ini.')}
  }
  function midFromStart(btn){return Number(btn?.dataset?.moduleStart||btn?.dataset?.specialStart||btn?.dataset?.nupmkStart||0)||null}
  async function prepareSetup(button){
    const mids=[...document.querySelectorAll('.setup-module-card.selected')].map(x=>Number(x.dataset.module)).filter(Boolean);if(!mids.length)return false;
    setBusy(button,true);for(const mid of mids)await ensureModule(mid);setBusy(button,false);return true;
  }
  function bankInfo(mid){const st=getState(mid),size=pool(mid).length;return{active:st.active.length||ACTIVE_LIMIT,candidates:size,database:true,engine:'v26-indexed-lite'}}

  document.addEventListener('click',e=>{
    const setup=e.target.closest?.('#startQuizBtn');
    if(setup&&setup.dataset.dbPrepared!=='1'){
      e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
      prepareSetup(setup).then(ok=>{if(!ok){setBusy(setup,false);return}setup.dataset.dbPrepared='1';setup.click();setTimeout(()=>delete setup.dataset.dbPrepared,0)}).catch(err=>{console.error(err);setBusy(setup,false);setup.dataset.dbPrepared='1';setup.click();setTimeout(()=>delete setup.dataset.dbPrepared,0)});return;
    }
    const start=e.target.closest?.('[data-module-start],[data-special-start],[data-nupmk-start]');if(!start||start.dataset.dbPrepared==='1')return;
    const mid=midFromStart(start);if(!mid)return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();setBusy(start,true);
    ensureModule(mid).then(()=>{setBusy(start,false);start.dataset.dbPrepared='1';start.click();setTimeout(()=>delete start.dataset.dbPrepared,0)}).catch(err=>{console.error(err);setBusy(start,false);toast('Module ini belum berhasil menyiapkan 25 soal default.')});
  },true);

  applyPreviews();
  const api={engine:'v26-indexed-lite',bankSize:Math.max(...moduleIds.map(mid=>pool(mid).length),0),ensureModule,reserveNew,nearDuplicate,clientId,bankInfo};
  window.GBPDatabaseQuestionBank=api;
  window.GBPQuestionBank={...(window.GBPQuestionBank||{}),generate:mid=>generate(Number(mid),document.querySelector('.quiz-generate-btn')),bankInfo,BANK_SIZE:api.bankSize,ACTIVE_LIMIT};
})();