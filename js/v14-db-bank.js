(() => {
  const SUPA_URL='https://pnisrktkkbzspolkfkag.supabase.co';
  const SUPA_KEY='sb_publishable_ClLcjnxymypzS2O6x1TzwA_c9y7-j1Y';
  const SESSION_KEY='gbpAnalyticsSessionV1';
  const STATE_KEY='gbpDbBankV28';
  const PROGRESS_KEY='generalBankingModuleProgressV1';
  const LOCAL_SEEN_KEY='gbpQuestionSeenV28';
  const ACTIVE_LIMIT=25;
  const BANK_LIMIT=500;
  const SOURCE=[...(window.__GBP_SOURCE_BANK__||[])];
  if(!SOURCE.length)return;

  const clean=s=>String(s??'').replace(/\s+/g,' ').trim();
  const norm=s=>clean(s).toLocaleLowerCase('id-ID').replace(/[^a-z0-9à-öø-ÿ]+/giu,' ').replace(/\s+/g,' ').trim();
  const hash=str=>{let h=2166136261;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};

  const TEXT_CACHE=new Map(),STRUCT_CACHE=new Map(),CORE_CACHE=new Map(),TOKEN_CACHE=new Map(),BIGRAM_CACHE=new Map();
  const textKey=q=>{const raw=String(q?.question||'');if(TEXT_CACHE.has(raw))return TEXT_CACHE.get(raw);const v=norm(raw);TEXT_CACHE.set(raw,v);return v;};
  const rootKey=q=>String(q?.rootQuestionId||q?.baseId||q?.id||'');
  const semanticKey=q=>norm(q?.conceptSignature||`${q?.moduleId||''}|${rootKey(q)}`);
  const rank=q=>({Sedang:1,'Sedang-Sulit':2,Sulit:3,Challenge:4,Expert:5}[q?.difficulty]||3);
  const order=a=>[...a].sort((x,y)=>rank(y)-rank(x)||String(x.id).localeCompare(String(y.id)));
  const clientId=(()=>{let x=localStorage.getItem(SESSION_KEY);if(!x){x=`${Date.now().toString(36)}-${crypto.getRandomValues(new Uint32Array(2)).join('-')}`;localStorage.setItem(SESSION_KEY,x)}return x})();

  const currency=/\b(?:USD|IDR|EUR|JPY|GBP|SGD|AUD|CNY|CNH|HKD|CHF|MYR|THB|VND|KRW)\b/gi;
  const month=/\b(?:januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember)\b/gi;
  const weekday=/\b(?:senin|selasa|rabu|kamis|jumat|jum'at|sabtu|minggu)\b/gi;
  function neutralizeValues(raw){
    return clean(raw)
      .replace(/\bPT\s+[A-Z][A-Za-z0-9._-]*\b/g,' perusahaan ')
      .replace(/\b(?:Nasabah|Debitur|Perusahaan)\s+[A-Z]\b/g,m=>m.split(/\s+/)[0])
      .replace(currency,' currency ')
      .replace(month,' month ')
      .replace(weekday,' weekday ')
      .replace(/\b(?:Rp|US\$|USD|IDR)?\s*\d+(?:[.,/]\d+)*(?:\s*(?:ribu|juta|miliar|triliun))?\s*(?:%|bps|bp)?\b/gi,' value ')
      .replace(/\bT\s*\+\s*\d+\b/gi,' tvalue ')
      .replace(/\b\d+\s*(?:hari|bulan|tahun|jam|menit)\b/gi,' period ');
  }
  const structureKey=q=>{const raw=String(q?.question||'');if(STRUCT_CACHE.has(raw))return STRUCT_CACHE.get(raw);const v=norm(neutralizeValues(raw));STRUCT_CACHE.set(raw,v);return v;};

  const stop=new Set('yang dan atau untuk pada dalam dengan dari ke di ini itu tersebut sebuah suatu seorang adalah ialah merupakan sebagai agar serta paling lebih tepat sesuai analisis keputusan tindakan kesimpulan jawaban pilihan manakah apakah apa bagaimana mengapa berikut kondisi kasus situasi bank nasabah unit petugas proses dilakukan melakukan saat ketika jika maka perlu harus dapat akan mana berdasarkan terhadap terkait konteks value currency month weekday tvalue period perusahaan istilah konsep menggambarkan menunjukkan merujuk dimaksud dikenal sebutan peningkatan penurunan meningkat menurun dicatat mencatat sisi akun saldo normal memiliki mempunyai bertambah berkurang naik turun'.split(' '));
  const promptTail=/(?:[.!?…]\s*)?(?:analisis|keputusan|tindakan|kesimpulan|jawaban|pilihan|fungsi|konsep|produk|risiko|transformasi|langkah|kontrol|prinsip|peran|istilah|kategori|aspek)\s+(?:apa|mana|yang)?\s*(?:paling\s+)?(?:tepat|sesuai|relevan|benar|utama|dominan|baik)?\s*(?:adalah)?\s*[.?…]*$/i;
  const genericAsk=/(?:[.!?…]\s*)?(?:manakah|apakah|apa|bagaimana|mengapa)\b[^.!?…]{0,95}[?…]*$/i;
  function coreStem(q){
    const raw=String(q?.question||'');if(CORE_CACHE.has(raw))return CORE_CACHE.get(raw);
    let s=clean(neutralizeValues(raw)).replace(promptTail,'').trim();
    const stripped=s.replace(genericAsk,'').trim();if(stripped.length>=45)s=stripped;
    const v=norm(s);CORE_CACHE.set(raw,v);return v;
  }
  function sigTokens(q){const raw=String(q?.question||'');if(TOKEN_CACHE.has(raw))return TOKEN_CACHE.get(raw);const v=coreStem(q).split(' ').filter(t=>t.length>2&&!stop.has(t)&&!/^[0-9]+$/.test(t));TOKEN_CACHE.set(raw,v);return v;}
  function jaccard(a,b){const A=new Set(a),B=new Set(b);if(!A.size||!B.size)return 0;let n=0;for(const x of A)if(B.has(x))n++;return n/(A.size+B.size-n);}
  function bigrams(tokens){const key=tokens.join('\u0001');if(BIGRAM_CACHE.has(key))return BIGRAM_CACHE.get(key);const out=[];for(let i=0;i<tokens.length-1;i++)out.push(`${tokens[i]} ${tokens[i+1]}`);BIGRAM_CACHE.set(key,out);return out;}
  function prefixMatch(a,b,n=10){if(a.length<n||b.length<n)return false;let same=0;for(let i=0;i<n;i++)if(a[i]===b[i])same++;return same>=Math.ceil(n*.8);}
  function conceptKey(q){
    const explicit=String(q?.conceptSignature||'');
    if(explicit.startsWith('material-concept:'))return norm(explicit);
    const answer=norm(q?.answer||'');
    const anchors=[...new Set(sigTokens(q))].sort().slice(0,12).join('|');
    return `${answer}|${anchors}`;
  }
  function nearDuplicate(a,b,threshold=.76){
    if(!a||!b)return false;
    if(rootKey(a)&&rootKey(a)===rootKey(b))return true;
    const ta=textKey(a),tb=textKey(b);if(ta&&ta===tb)return true;
    const sa=structureKey(a),sb=structureKey(b);if(sa&&sb&&sa===sb&&sa.length>=18)return true;
    const ea=String(a.conceptSignature||''),eb=String(b.conceptSignature||'');
    if(ea&&eb&&ea===eb&&(ea.startsWith('material-concept:')||eb.startsWith('material-concept:')))return true;
    const ca=coreStem(a),cb=coreStem(b);if(ca.length>=28&&ca===cb)return true;
    const A=sigTokens(a),B=sigTokens(b),min=Math.min(A.length,B.length);
    if(min>=5&&jaccard(A,B)>=threshold)return true;
    if(min>=7&&prefixMatch(A,B,Math.min(10,min))&&jaccard(bigrams(A),bigrams(B))>=.55)return true;
    if(Math.min(bigrams(A).length,bigrams(B).length)>=4&&jaccard(bigrams(A),bigrams(B))>=.68)return true;
    return false;
  }
  function validQuestion(q){return !!(q&&textKey(q)&&rootKey(q)&&Array.isArray(q.options)&&q.options.length===4&&new Set(q.options.map(norm)).size===4&&q.options.some(x=>clean(x)===clean(q.answer)));}

  // Honest maximum-500 bank: never manufacture paraphrases just to hit the cap.
  const POOLS=new Map();
  const rawByModule=new Map();
  for(const q of SOURCE){const mid=Number(q?.moduleId)||0;if(!mid||!validQuestion(q))continue;let arr=rawByModule.get(mid);if(!arr){arr=[];rawByModule.set(mid,arr);}arr.push(q);}
  for(const [mid,candidates] of rawByModule){
    const chosen=[],roots=new Set(),structures=new Set(),concepts=new Set();
    for(const q of candidates){
      if(chosen.length>=BANK_LIMIT)break;
      const rk=rootKey(q),sk=structureKey(q),ck=conceptKey(q);
      if(roots.has(rk)||structures.has(sk)||concepts.has(ck))continue;
      roots.add(rk);structures.add(sk);concepts.add(ck);chosen.push(q);
    }
    if(chosen.length)POOLS.set(mid,chosen);
  }
  const moduleIds=[...POOLS.keys()].sort((a,b)=>a-b);
  const pool=mid=>POOLS.get(Number(mid))||[];

  let state={};try{state=JSON.parse(localStorage.getItem(STATE_KEY)||'{}')||{}}catch(e){state={}}
  let localSeen={};try{localSeen=JSON.parse(localStorage.getItem(LOCAL_SEEN_KEY)||'{}')||{}}catch(e){localSeen={}}
  const getState=mid=>{const r=state[String(mid)]||{};return{active:Array.isArray(r.active)?r.active.map(Number):[],displayOrder:Array.isArray(r.displayOrder)?r.displayOrder.map(Number):[],synced:!!r.synced,updatedAt:Number(r.updatedAt)||0}};
  const saveState=(mid,v)=>{state[String(mid)]={...getState(mid),...v};localStorage.setItem(STATE_KEY,JSON.stringify(state))};
  const saveSeen=()=>{try{const rows=Object.entries(localSeen).sort((a,b)=>b[1]-a[1]).slice(0,50000);localSeen=Object.fromEntries(rows);localStorage.setItem(LOCAL_SEEN_KEY,JSON.stringify(localSeen))}catch(e){}};
  try{
    const mk='gbpHonest500BankV28';
    if(!localStorage.getItem(mk)){
      ['gbpDbBankV14','gbpDbBankV20','gbpDbBankV24','gbpDbBankV25','gbpDbBankV26','gbpQuestionSeenV20','gbpQuestionSeenV24','gbpQuestionSeenV25','gbpQuestionSeenV26'].forEach(k=>localStorage.removeItem(k));
      localStorage.removeItem(STATE_KEY);localStorage.removeItem(LOCAL_SEEN_KEY);state={};localSeen={};localStorage.setItem(mk,'1');
    }
  }catch(e){}

  function seenKey(kind,mid,value){return `${kind}:${Number(mid)}:${value}`;}
  function question(mid,slot){const p=pool(mid),base=p[Number(slot)-1];if(!base)return null;return {...base,id:base.id||`V28-M${mid}-S${slot}`,bankSlot:Number(slot),bankEpoch:28,generated:true,baseId:rootKey(base),structureKey:structureKey(base)};}
  function shuffledSlots(mid,seedOffset=0){const p=pool(mid);return Array.from({length:p.length},(_,i)=>i+1).sort((a,b)=>hash(`${mid}:${seedOffset}:${a}`)-hash(`${mid}:${seedOffset}:${b}`));}
  function isSeen(mid,q){return !!(localSeen[seenKey('r',mid,rootKey(q))]||localSeen[seenKey('s',mid,structureKey(q))]||localSeen[seenKey('c',mid,conceptKey(q))]);}
  function remainingUnique(mid){let n=0;for(const q of pool(mid))if(!isSeen(mid,q))n++;return n;}

  function canAdd(q,chosen,excluded,threshold){if(!validQuestion(q))return false;for(const old of excluded)if(nearDuplicate(q,old,.78))return false;for(const old of chosen)if(nearDuplicate(q,old,threshold))return false;return true;}
  function buildSet(mid,{respectHistory=true,seedOffset=0,excludeSlots=[],excludeQuestions=[]}={}){
    const p=pool(mid),active=[],chosen=[],chosenRoots=new Set(),chosenStructures=new Set(),familyCounts=new Map();if(!p.length)return active;
    const excludedSlots=new Set((excludeSlots||[]).map(Number)),excluded=(excludeQuestions||[]).filter(Boolean);
    const excludedRoots=new Set(excluded.map(rootKey).filter(Boolean)),excludedStructures=new Set(excluded.map(structureKey).filter(Boolean));
    const slots=shuffledSlots(mid,seedOffset);
    const scan=(threshold,familyLimit)=>{
      for(const slot of slots){
        if(active.length>=ACTIVE_LIMIT)break;if(excludedSlots.has(slot)||active.includes(slot))continue;
        const q=question(mid,slot);if(!q)continue;
        const rk=rootKey(q),stk=structureKey(q),family=String(q.wordingFamily||'');
        if(chosenRoots.has(rk)||excludedRoots.has(rk)||chosenStructures.has(stk)||excludedStructures.has(stk))continue;
        if(respectHistory&&isSeen(mid,q))continue;
        if(family&&familyLimit&&(familyCounts.get(family)||0)>=familyLimit)continue;
        if(!canAdd(q,chosen,excluded,threshold))continue;
        chosenRoots.add(rk);chosenStructures.add(stk);chosen.push(q);active.push(slot);if(family)familyCounts.set(family,(familyCounts.get(family)||0)+1);
      }
    };
    scan(.74,6);if(active.length<ACTIVE_LIMIT)scan(.82,9);if(active.length<ACTIVE_LIMIT)scan(.86,0);
    return active.slice(0,ACTIVE_LIMIT);
  }

  function validateSlots(mid,slots){if(!Array.isArray(slots)||slots.length!==ACTIVE_LIMIT)return false;const chosen=[];for(const slot of slots){const q=question(mid,slot);if(!canAdd(q,chosen,[],.86))return false;chosen.push(q);}return true;}
  function sameSlotSet(a,b){if(a.length!==b.length)return false;const A=[...a].sort((x,y)=>x-y),B=[...b].sort((x,y)=>x-y);return A.every((x,i)=>x===B[i]);}
  function moduleDisplaySlots(mid,slots){const st=getState(mid);return st.displayOrder.length===slots.length&&sameSlotSet(st.displayOrder,slots)?st.displayOrder:slots;}
  function replaceModule(mid,slots){
    const target=window.QUESTION_BANK||[],others=target.filter(q=>Number(q.moduleId)!==Number(mid)),chosen=[],qs=[];
    for(const slot of slots){const q=question(mid,slot);if(!canAdd(q,chosen,[],.86))continue;chosen.push(q);qs.push(q);}
    if(qs.length!==ACTIVE_LIMIT)throw new Error(`invalid-active-set-${mid}-${qs.length}`);
    const bySlot=new Map(qs.map(q=>[Number(q.bankSlot),q]));
    const display=moduleDisplaySlots(mid,slots).map(slot=>bySlot.get(Number(slot))).filter(Boolean);
    target.splice(0,target.length,...others,...(display.length===ACTIVE_LIMIT?display:order(qs)));
  }
  function previewSlots(mid){const st=getState(mid);if(validateSlots(mid,st.active))return st.active;const slots=buildSet(mid,{respectHistory:false,seedOffset:mid*31});if(slots.length!==ACTIVE_LIMIT)console.error(`Module ${mid} has only ${slots.length}/${ACTIVE_LIMIT} sufficiently distinct active questions`,{bank:pool(mid).length});return slots;}
  function applyPreviews(){
    const target=window.QUESTION_BANK||[],original=[...target],next=[];
    for(const mid of moduleIds){
      const slots=previewSlots(mid);
      if(slots.length===ACTIVE_LIMIT){const bySlot=new Map(slots.map(slot=>[Number(slot),question(mid,slot)]));const display=moduleDisplaySlots(mid,slots);for(const slot of display){const q=bySlot.get(Number(slot));if(q)next.push(q);}continue;}
      const fallback=original.filter(q=>Number(q.moduleId)===Number(mid)).slice(0,ACTIVE_LIMIT);if(fallback.length)next.push(...fallback);
    }
    if(next.length)target.splice(0,target.length,...next);
  }

  async function rpc(name,body){const r=await fetch(`${SUPA_URL}/rest/v1/rpc/${name}`,{method:'POST',cache:'no-store',headers:{'Content-Type':'application/json','apikey':SUPA_KEY},body:JSON.stringify(body||{})});if(!r.ok)throw new Error(await r.text()||name);return r.json();}
  function payload(mid,slots){return slots.map(slot=>{const q=question(mid,slot);return{slot,question:q.question,options:q.options,answer:q.answer,explanation:q.explanation,source:q.source,baseId:q.baseId,questionType:q.questionType||'Analisis Kasus',difficulty:q.difficulty||'Challenge',structureKey:q.structureKey};});}
  async function syncActive(mid,active){if(!active?.length)return;try{const d=await rpc('gbp_question_register_batch',{p_client_id:clientId,p_module_id:mid,p_questions:payload(mid,active),p_requested_count:active.length});saveState(mid,{active,synced:Number(d?.accepted_count||0)>=active.length,updatedAt:Date.now()});}catch(e){console.warn('Background database sync skipped',e);}}
  function markSeen(mid,active){const now=Date.now();for(const slot of active){const q=question(mid,slot);if(!q)continue;localSeen[seenKey('r',mid,rootKey(q))]=now;localSeen[seenKey('s',mid,structureKey(q))]=now;localSeen[seenKey('c',mid,conceptKey(q))]=now;}saveSeen();}

  function pickLocalUnique(mid,{replaceCurrent=false}={}){
    const previous=getState(mid).active.filter(Boolean),previousQuestions=previous.map(slot=>question(mid,slot)).filter(Boolean);
    if(replaceCurrent&&remainingUnique(mid)<ACTIVE_LIMIT)throw new Error(`unique-bank-exhausted-${mid}-${remainingUnique(mid)}`);
    const active=buildSet(mid,{respectHistory:replaceCurrent,seedOffset:Math.floor(Math.random()*1e9),excludeSlots:replaceCurrent?previous:[],excludeQuestions:replaceCurrent?previousQuestions:[]});
    if(active.length<ACTIVE_LIMIT)throw new Error(`insufficient-distinct-bank-${mid}-${active.length}`);
    markSeen(mid,active);saveState(mid,{active,displayOrder:[],synced:false,updatedAt:Date.now()});replaceModule(mid,active);return active;
  }
  async function reserveNew(mid){const active=pickLocalUnique(mid,{replaceCurrent:true});setTimeout(()=>syncActive(mid,active),0);return active;}
  async function ensureModule(mid){
    const st=getState(mid);
    if(validateSlots(mid,st.active)){replaceModule(mid,st.active);if(!st.synced)setTimeout(()=>syncActive(mid,st.active),0);return st.active;}
    const active=buildSet(mid,{respectHistory:false,seedOffset:mid*97});if(active.length!==ACTIVE_LIMIT)throw new Error(`module-bank-too-small-${mid}-${active.length}`);
    markSeen(mid,active);saveState(mid,{active,displayOrder:[],synced:false,updatedAt:Date.now()});replaceModule(mid,active);setTimeout(()=>syncActive(mid,active),0);return active;
  }
  function reshuffleActive(mid){
    const st=getState(mid),active=st.active.filter(Boolean);
    if(active.length!==ACTIVE_LIMIT||!validateSlots(mid,active))throw new Error(`cannot-reshuffle-${mid}`);
    const current=moduleDisplaySlots(mid,active),next=[...current];
    for(let i=next.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[next[i],next[j]]=[next[j],next[i]];}
    if(next.every((x,i)=>x===current[i]))next.push(next.shift());
    saveState(mid,{displayOrder:next,updatedAt:Date.now()});replaceModule(mid,active);
    return next;
  }

  function bankInfo(mid){const total=pool(mid).length,remaining=remainingUnique(mid),st=getState(mid);return{active:st.active.length||ACTIVE_LIMIT,bankSize:total,remaining,maxBank:BANK_LIMIT,canGenerateNew:remaining>=ACTIVE_LIMIT,canReshuffle:st.active.length===ACTIVE_LIMIT,database:true,engine:'v28-honest-500'};}
  function clearProgress(mid){try{const all=JSON.parse(localStorage.getItem(PROGRESS_KEY)||'{}')||{};delete all[String(mid)];localStorage.setItem(PROGRESS_KEY,JSON.stringify(all));}catch(e){localStorage.removeItem(PROGRESS_KEY);}try{window.GBPApp?.clearModuleProgress?.(mid);}catch(e){}}
  const toast=msg=>{const el=document.getElementById('toast');if(!el)return;el.textContent=msg;el.classList.remove('hidden');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.add('hidden'),4000);};
  const setBusy=(btn,on)=>{if(!btn)return;btn.disabled=on;btn.dataset.oldText=btn.dataset.oldText||btn.textContent;btn.textContent=on?'Menyiapkan 25 soal baru…':btn.dataset.oldText;};
  async function generate(mid,button){setBusy(button,true);try{const active=await reserveNew(mid);clearProgress(mid);try{window.GBPAnalytics?.track?.('generate_questions',{moduleId:mid,day:pool(mid)[0]?.day||null,questionCount:active.length,meta:{engine:'v28-honest-500',bankLimit:BANK_LIMIT,bankSize:pool(mid).length,remaining:remainingUnique(mid)}});}catch(e){}sessionStorage.setItem('gbpAutoOpenModule',String(mid));sessionStorage.setItem('gbpGenerationToast','25 soal baru sudah aktif.');location.reload();}catch(e){console.error(e);setBusy(button,false);toast(remainingUnique(mid)<ACTIVE_LIMIT?'Tidak tersisa 25 soal unik baru. Gunakan mode acak ulang jika ingin mengulang module ini.':'Belum tersedia 25 soal baru yang cukup berbeda secara substansi.');}}
  function midFromStart(btn){return Number(btn?.dataset?.moduleStart||btn?.dataset?.specialStart||btn?.dataset?.nupmkStart||0)||null;}
  async function prepareSetup(button){const mids=[...document.querySelectorAll('.setup-module-card.selected')].map(x=>Number(x.dataset.module)).filter(Boolean);if(!mids.length)return false;setBusy(button,true);for(const mid of mids)await ensureModule(mid);setBusy(button,false);return true;}

  document.addEventListener('click',e=>{
    const gen=e.target.closest?.('.quiz-generate-btn');if(gen){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();return;}
    const setup=e.target.closest?.('#startQuizBtn');if(setup&&setup.dataset.dbPrepared!=='1'){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();prepareSetup(setup).then(ok=>{if(!ok){setBusy(setup,false);return;}setup.dataset.dbPrepared='1';setup.click();setTimeout(()=>delete setup.dataset.dbPrepared,0);}).catch(err=>{console.error(err);setBusy(setup,false);setup.dataset.dbPrepared='1';setup.click();setTimeout(()=>delete setup.dataset.dbPrepared,0);});return;}
    const start=e.target.closest?.('[data-module-start],[data-special-start],[data-nupmk-start]');if(!start||start.dataset.dbPrepared==='1')return;const mid=midFromStart(start);if(!mid)return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();setBusy(start,true);ensureModule(mid).then(()=>{setBusy(start,false);start.dataset.dbPrepared='1';start.click();setTimeout(()=>delete start.dataset.dbPrepared,0);}).catch(err=>{console.error(err);setBusy(start,false);toast('Module ini belum memiliki 25 soal yang lolos quality gate.');});
  },true);

  applyPreviews();
  window.GBPDatabaseQuestionBank={engine:'v28-honest-500',bankLimit:BANK_LIMIT,bankSize:Math.max(...moduleIds.map(mid=>pool(mid).length),0),ensureModule,reserveNew,reshuffleActive,nearDuplicate,structureKey,bankInfo,clientId};
  document.addEventListener('DOMContentLoaded',()=>{if(window.GBPQuestionBank){window.GBPQuestionBank.generate=mid=>generate(mid,document.querySelector('.quiz-generate-btn'));window.GBPQuestionBank.bankInfo=bankInfo;window.GBPQuestionBank.BANK_SIZE=BANK_LIMIT;window.GBPQuestionBank.ACTIVE_LIMIT=ACTIVE_LIMIT;}});
})();