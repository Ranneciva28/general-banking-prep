(() => {
  const SUPA_URL='https://pnisrktkkbzspolkfkag.supabase.co';
  const SUPA_KEY='sb_publishable_ClLcjnxymypzS2O6x1TzwA_c9y7-j1Y';
  const SESSION_KEY='gbpAnalyticsSessionV1';
  const STATE_KEY='gbpDbBankV25';
  const PROGRESS_KEY='generalBankingModuleProgressV1';
  const LOCAL_SEEN_KEY='gbpQuestionSeenV25';
  const ACTIVE_LIMIT=25;
  const SOURCE=[...(window.__GBP_SOURCE_BANK__||[])];
  if(!SOURCE.length)return;

  const clean=s=>String(s??'').replace(/\s+/g,' ').trim();
  const norm=s=>clean(s).toLocaleLowerCase('id-ID').replace(/[^a-z0-9à-öø-ÿ]+/giu,' ').replace(/\s+/g,' ').trim();
  const hash=str=>{let h=2166136261;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
  const textKey=q=>norm(q?.question);
  const semanticKey=q=>norm(q?.conceptSignature||`${q?.moduleId||''}|${q?.rootQuestionId||q?.baseId||q?.id||''}`);
  const rootKey=q=>String(q?.rootQuestionId||q?.baseId||q?.id||'');
  const rank=q=>({Sedang:1,'Sedang-Sulit':2,Sulit:3,Challenge:4,Expert:5}[q?.difficulty]||3);
  const order=a=>[...a].sort((x,y)=>rank(y)-rank(x)||String(x.id).localeCompare(String(y.id)));
  const pool=mid=>SOURCE.filter(q=>Number(q.moduleId)===Number(mid)).slice(0,3000);
  const moduleIds=[...new Set(SOURCE.map(q=>Number(q.moduleId)))].filter(Boolean).sort((a,b)=>a-b);
  const clientId=(()=>{let x=localStorage.getItem(SESSION_KEY);if(!x){x=`${Date.now().toString(36)}-${crypto.getRandomValues(new Uint32Array(2)).join('-')}`;localStorage.setItem(SESSION_KEY,x)}return x})();

  const stop=new Set('yang dan atau untuk pada dalam dengan dari ke di ini itu tersebut sebuah suatu seorang adalah ialah merupakan sebagai agar serta paling lebih tepat sesuai analisis keputusan tindakan kesimpulan jawaban pilihan manakah apakah apa bagaimana mengapa berikut kondisi kasus situasi bank nasabah unit petugas proses dilakukan melakukan saat ketika jika maka perlu harus dapat akan mana berdasarkan terhadap terkait konteks'.split(' '));
  const promptTail=/(?:[.!?…]\s*)?(?:analisis|keputusan|tindakan|kesimpulan|jawaban|pilihan|fungsi|konsep|produk|risiko|transformasi|langkah|kontrol|prinsip|peran)\s+(?:apa|mana|yang)?\s*(?:paling\s+)?(?:tepat|sesuai|relevan|benar|utama|dominan|baik)?\s*(?:adalah)?\s*[.?…]*$/i;
  const genericAsk=/(?:[.!?…]\s*)?(?:manakah|apakah|apa|bagaimana|mengapa)\b[^.!?…]{0,95}[?…]*$/i;
  function coreStem(q){
    let s=clean(q?.question||'').replace(promptTail,'').trim();
    const stripped=s.replace(genericAsk,'').trim();
    if(stripped.length>=45)s=stripped;
    return norm(s);
  }
  function sigTokens(q){return coreStem(q).split(' ').filter(t=>t.length>2&&!stop.has(t));}
  function jaccard(a,b){const A=new Set(a),B=new Set(b);if(!A.size||!B.size)return 0;let n=0;for(const x of A)if(B.has(x))n++;return n/(A.size+B.size-n);}
  function bigrams(tokens){const out=[];for(let i=0;i<tokens.length-1;i++)out.push(`${tokens[i]} ${tokens[i+1]}`);return out;}
  function prefixMatch(a,b,n=10){if(a.length<n||b.length<n)return false;let same=0;for(let i=0;i<n;i++)if(a[i]===b[i])same++;return same>=Math.ceil(n*.8);}
  function nearDuplicate(a,b,threshold=.76){
    if(!a||!b)return false;
    if(rootKey(a)&&rootKey(a)===rootKey(b))return true;
    const ta=textKey(a),tb=textKey(b);if(ta&&ta===tb)return true;
    const ca=coreStem(a),cb=coreStem(b);if(ca.length>=28&&ca===cb)return true;
    const A=sigTokens(a),B=sigTokens(b),min=Math.min(A.length,B.length);
    if(min>=6&&jaccard(A,B)>=threshold)return true;
    if(min>=8&&prefixMatch(A,B,Math.min(10,min))&&jaccard(bigrams(A),bigrams(B))>=.58)return true;
    if(Math.min(bigrams(A).length,bigrams(B).length)>=5&&jaccard(bigrams(A),bigrams(B))>=.72)return true;
    return false;
  }
  function validQuestion(q){return !!(q&&textKey(q)&&rootKey(q)&&semanticKey(q)&&Array.isArray(q.options)&&q.options.length===4&&new Set(q.options.map(norm)).size===4&&q.options.some(x=>clean(x)===clean(q.answer)));}
  function canAdd(q,chosen,excluded,threshold){if(!validQuestion(q))return false;for(const old of excluded)if(nearDuplicate(q,old,.84))return false;for(const old of chosen)if(nearDuplicate(q,old,threshold))return false;return true;}

  let state={};try{state=JSON.parse(localStorage.getItem(STATE_KEY)||'{}')||{}}catch(e){state={}}
  let localSeen={};try{localSeen=JSON.parse(localStorage.getItem(LOCAL_SEEN_KEY)||'{}')||{}}catch(e){localSeen={}}
  const getState=mid=>{const r=state[String(mid)]||{};return{active:Array.isArray(r.active)?r.active.map(Number):[],synced:!!r.synced,updatedAt:Number(r.updatedAt)||0}};
  const saveState=(mid,v)=>{state[String(mid)]={...getState(mid),...v};localStorage.setItem(STATE_KEY,JSON.stringify(state))};
  const saveSeen=()=>{try{const rows=Object.entries(localSeen).sort((a,b)=>b[1]-a[1]).slice(0,30000);localSeen=Object.fromEntries(rows);localStorage.setItem(LOCAL_SEEN_KEY,JSON.stringify(localSeen))}catch(e){}};
  try{const mk='gbpDistinctRootSelectorV25';if(!localStorage.getItem(mk)){['gbpDbBankV14','gbpDbBankV20','gbpDbBankV24','gbpQuestionSeenV20','gbpQuestionSeenV24'].forEach(k=>localStorage.removeItem(k));localStorage.removeItem(STATE_KEY);state={};localStorage.setItem(mk,'1')}}catch(e){}

  function question(mid,slot){const p=pool(mid),base=p[Number(slot)-1];if(!base)return null;return {...base,id:base.id||`V25-M${mid}-S${slot}`,bankSlot:Number(slot),bankEpoch:25,generated:true,baseId:base.rootQuestionId||base.baseId||base.id,structureKey:base.conceptSignature||`${mid}|${rootKey(base)}`};}
  function shuffledSlots(mid,seedOffset=0){const p=pool(mid);return Array.from({length:p.length},(_,i)=>i+1).sort((a,b)=>hash(`${mid}:${seedOffset}:${a}`)-hash(`${mid}:${seedOffset}:${b}`));}

  function buildSet(mid,{respectHistory=true,seedOffset=0,excludeSlots=[],excludeQuestions=[]}={}){
    const p=pool(mid),active=[],chosen=[],chosenRoots=new Set();if(!p.length)return active;
    const excludedSlots=new Set((excludeSlots||[]).map(Number));
    const excluded=(excludeQuestions||[]).filter(Boolean);
    const excludedRoots=new Set(excluded.map(rootKey).filter(Boolean));
    const slots=shuffledSlots(mid,seedOffset);
    const scan=(ignoreHistory,threshold)=>{
      for(const slot of slots){
        if(active.length>=ACTIVE_LIMIT)break;
        if(excludedSlots.has(slot))continue;
        const q=question(mid,slot);if(!q)continue;
        const rk=rootKey(q),sk=textKey(q),ck=semanticKey(q);
        if(chosenRoots.has(rk)||excludedRoots.has(rk))continue;
        if(!ignoreHistory&&respectHistory&&(localSeen['q:'+sk]||localSeen['c:'+ck]||localSeen['r:'+rk]))continue;
        if(!canAdd(q,chosen,excluded,threshold))continue;
        chosenRoots.add(rk);chosen.push(q);active.push(slot);
      }
    };
    scan(false,.76);
    if(active.length<ACTIVE_LIMIT)scan(true,.76);
    if(active.length<ACTIVE_LIMIT)scan(true,.88);
    return active.slice(0,ACTIVE_LIMIT);
  }

  function validateSlots(mid,slots){
    if(!Array.isArray(slots)||slots.length!==ACTIVE_LIMIT)return false;
    const chosen=[];
    for(const slot of slots){const q=question(mid,slot);if(!canAdd(q,chosen,[],.88))return false;chosen.push(q);}
    return true;
  }
  function replaceModule(mid,slots){
    const target=window.QUESTION_BANK||[],others=target.filter(q=>Number(q.moduleId)!==Number(mid)),chosen=[],qs=[];
    for(const slot of slots){const q=question(mid,slot);if(!canAdd(q,chosen,[],.88))continue;chosen.push(q);qs.push(q);}
    if(qs.length!==ACTIVE_LIMIT)throw new Error(`invalid-active-set-${mid}-${qs.length}`);
    target.splice(0,target.length,...others,...order(qs));
  }
  function previewSlots(mid){
    const st=getState(mid);if(validateSlots(mid,st.active))return st.active;
    const slots=buildSet(mid,{respectHistory:false,seedOffset:mid*31});
    if(slots.length!==ACTIVE_LIMIT)console.error(`Module ${mid} default bank only ${slots.length}/${ACTIVE_LIMIT}`,{pool:pool(mid).length});
    return slots;
  }
  function applyPreviews(){
    const target=window.QUESTION_BANK||[],next=[];
    for(const mid of moduleIds){
      const slots=previewSlots(mid);
      if(slots.length!==ACTIVE_LIMIT)continue;
      for(const slot of slots){const q=question(mid,slot);if(q)next.push(q);}
    }
    target.splice(0,target.length,...order(next));
    const counts=new Map();for(const q of target)counts.set(Number(q.moduleId),(counts.get(Number(q.moduleId))||0)+1);
    for(const mid of moduleIds)if((counts.get(mid)||0)!==ACTIVE_LIMIT)console.error(`DEFAULT_25_FAIL M${mid}: ${counts.get(mid)||0}`);
  }

  async function rpc(name,body){const r=await fetch(`${SUPA_URL}/rest/v1/rpc/${name}`,{method:'POST',cache:'no-store',headers:{'Content-Type':'application/json','apikey':SUPA_KEY},body:JSON.stringify(body||{})});if(!r.ok)throw new Error(await r.text()||name);return r.json();}
  function payload(mid,slots){return slots.map(slot=>{const q=question(mid,slot);return{slot,question:q.question,options:q.options,answer:q.answer,explanation:q.explanation,source:q.source,baseId:q.baseId,questionType:q.questionType||'Analisis Kasus',difficulty:q.difficulty||'Challenge',structureKey:q.structureKey};});}
  async function syncActive(mid,active){if(!active?.length)return;try{const d=await rpc('gbp_question_register_batch',{p_client_id:clientId,p_module_id:mid,p_questions:payload(mid,active),p_requested_count:active.length});saveState(mid,{active,synced:Number(d?.accepted_count||0)>=active.length,updatedAt:Date.now()});}catch(e){console.warn('Background database sync skipped',e);}}
  function markSeen(mid,active){for(const slot of active){const q=question(mid,slot);if(!q)continue;const sk=textKey(q),ck=semanticKey(q),rk=rootKey(q),now=Date.now();if(sk)localSeen['q:'+sk]=now;if(ck)localSeen['c:'+ck]=now;if(rk)localSeen['r:'+rk]=now;}saveSeen();}

  function pickLocalUnique(mid,{replaceCurrent=false}={}){
    const previous=getState(mid).active.filter(Boolean),previousQuestions=previous.map(slot=>question(mid,slot)).filter(Boolean);
    const active=buildSet(mid,{respectHistory:true,seedOffset:Math.floor(Math.random()*1e9),excludeSlots:replaceCurrent?previous:[],excludeQuestions:replaceCurrent?previousQuestions:[]});
    if(active.length<ACTIVE_LIMIT)throw new Error(`insufficient-distinct-bank-${mid}-${active.length}`);
    if(replaceCurrent){
      const newQuestions=active.map(slot=>question(mid,slot));
      for(const q of newQuestions)for(const old of previousQuestions)if(nearDuplicate(q,old,.84))throw new Error(`regeneration-overlap-${mid}`);
    }
    markSeen(mid,active);saveState(mid,{active,synced:false,updatedAt:Date.now()});replaceModule(mid,active);return active;
  }
  async function reserveNew(mid){const active=pickLocalUnique(mid,{replaceCurrent:true});setTimeout(()=>syncActive(mid,active),0);return active;}
  async function ensureModule(mid){const st=getState(mid);if(validateSlots(mid,st.active)){replaceModule(mid,st.active);if(!st.synced)setTimeout(()=>syncActive(mid,st.active),0);return st.active;}const active=pickLocalUnique(mid,{replaceCurrent:false});setTimeout(()=>syncActive(mid,active),0);return active;}

  function clearProgress(mid){try{const all=JSON.parse(localStorage.getItem(PROGRESS_KEY)||'{}')||{};delete all[String(mid)];localStorage.setItem(PROGRESS_KEY,JSON.stringify(all));}catch(e){localStorage.removeItem(PROGRESS_KEY);}try{window.GBPApp?.clearModuleProgress?.(mid);}catch(e){}}
  const toast=msg=>{const el=document.getElementById('toast');if(!el)return;el.textContent=msg;el.classList.remove('hidden');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.add('hidden'),4000);};
  const setBusy=(btn,on)=>{if(!btn)return;btn.disabled=on;btn.dataset.oldText=btn.dataset.oldText||btn.textContent;btn.textContent=on?'Menyiapkan 25 soal baru…':btn.dataset.oldText;};
  async function generate(mid,button){
    setBusy(button,true);
    try{
      const active=await reserveNew(mid);clearProgress(mid);
      try{window.GBPAnalytics?.track?.('generate_questions',{moduleId:mid,day:pool(mid)[0]?.day||null,questionCount:active.length,meta:{databaseBank:true,engine:'v25-distinct-root-lite',replaceAll25:true,zeroImmediateOverlap:true,nearDuplicateGuard:true}});}catch(e){}
      sessionStorage.setItem('gbpAutoOpenModule',String(mid));
      sessionStorage.setItem('gbpGenerationToast','25 soal lama diganti penuh dengan 25 soal berbeda. Soal satu-root dan near-duplicate diblokir.');
      location.reload();
    }catch(e){console.error(e);setBusy(button,false);toast('Belum tersedia 25 soal baru yang benar-benar berbeda untuk mengganti set ini.');}
  }
  function midFromStart(btn){return Number(btn?.dataset?.moduleStart||btn?.dataset?.specialStart||btn?.dataset?.nupmkStart||0)||null;}
  async function prepareSetup(button){const mids=[...document.querySelectorAll('.setup-module-card.selected')].map(x=>Number(x.dataset.module)).filter(Boolean);if(!mids.length)return false;setBusy(button,true);for(const mid of mids)await ensureModule(mid);setBusy(button,false);return true;}

  document.addEventListener('click',e=>{
    const gen=e.target.closest?.('.quiz-generate-btn');
    if(gen){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();const name=document.getElementById('moduleTag')?.textContent?.trim(),q=(window.QUESTION_BANK||[]).find(x=>x.moduleName===name),mid=q?Number(q.moduleId):null;if(mid&&confirm('Ganti seluruh 25 soal aktif dengan 25 soal baru yang berbeda?'))generate(mid,gen);return;}
    const setup=e.target.closest?.('#startQuizBtn');if(setup&&setup.dataset.dbPrepared!=='1'){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();prepareSetup(setup).then(ok=>{if(!ok){setBusy(setup,false);return;}setup.dataset.dbPrepared='1';setup.click();setTimeout(()=>delete setup.dataset.dbPrepared,0);}).catch(err=>{console.error(err);setBusy(setup,false);setup.dataset.dbPrepared='1';setup.click();setTimeout(()=>delete setup.dataset.dbPrepared,0);});return;}
    const start=e.target.closest?.('[data-module-start],[data-special-start],[data-nupmk-start]');if(!start||start.dataset.dbPrepared==='1')return;const mid=midFromStart(start);if(!mid)return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();setBusy(start,true);ensureModule(mid).then(()=>{setBusy(start,false);start.dataset.dbPrepared='1';start.click();setTimeout(()=>delete start.dataset.dbPrepared,0);}).catch(err=>{console.error(err);setBusy(start,false);toast('Module ini belum berhasil menyiapkan 25 soal default. Silakan refresh sekali.');});
  },true);

  applyPreviews();
  window.GBPDatabaseQuestionBank={engine:'v25-distinct-root-lite',bankSize:Math.max(...moduleIds.map(mid=>pool(mid).length),0),ensureModule,reserveNew,nearDuplicate,clientId};
  document.addEventListener('DOMContentLoaded',()=>{if(window.GBPQuestionBank){window.GBPQuestionBank.generate=mid=>generate(mid,document.querySelector('.quiz-generate-btn'));window.GBPQuestionBank.bankInfo=mid=>{const st=getState(mid);return{active:st.active.length||ACTIVE_LIMIT,database:true,engine:'v25-distinct-root-lite'};};}});
})();