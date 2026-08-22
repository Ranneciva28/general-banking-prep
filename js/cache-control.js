(() => {
  const SUPA_URL='https://pnisrktkkbzspolkfkag.supabase.co';
  const SUPA_KEY='sb_publishable_ClLcjnxymypzS2O6x1TzwA_c9y7-j1Y';
  const EPOCH_KEY='gbpRemoteCacheEpochV1';
  const CHECK_EVERY=120000;
  let checking=false;
  const norm=s=>String(s||'').toLocaleLowerCase('id-ID').replace(/[^a-z0-9à-öø-ÿ]+/giu,' ').replace(/\s+/g,' ').trim();
  const reservationSeen=new Map();

  function cleanLegacyCacheParams(){
    try{const u=new URL(location.href);let changed=false;['_build','_cache','_ts','_manualclear'].forEach(k=>{if(u.searchParams.has(k)){u.searchParams.delete(k);changed=true}});if(changed)history.replaceState(history.state,'',`${u.pathname}${u.search}${u.hash}`)}catch(e){}
  }
  cleanLegacyCacheParams();

  async function clearRuntimeCache(){
    try{if('serviceWorker' in navigator){const regs=await navigator.serviceWorker.getRegistrations();await Promise.all(regs.map(r=>r.unregister()))}}catch(e){}
    try{if('caches' in window){const names=await caches.keys();await Promise.all(names.map(n=>caches.delete(n)))}}catch(e){}
  }
  async function clearQuestionCache(){
    await clearRuntimeCache();
    try{['gbpDbBankV14','gbpDbBankV20','gbpDbBankV24','gbpDbBankV25','gbpQuestionSeenV20','gbpQuestionSeenV24','gbpQuestionSeenV25','gbpQuestionTextSeenV17','gbpFallbackQuestionSeenV16','generalBankingGeneratedV5','generalBankingQuestionBankV5','generalBankingQuestionBankV6'].forEach(k=>localStorage.removeItem(k))}catch(e){}
  }
  async function getRemoteEpoch(){const r=await fetch(`${SUPA_URL}/rest/v1/rpc/gbp_cache_version?t=${Date.now()}`,{method:'POST',cache:'no-store',headers:{'Content-Type':'application/json','apikey':SUPA_KEY},body:'{}'});if(!r.ok)throw new Error('cache-version-unavailable');const d=await r.json();return String(d?.epoch??'')}
  async function check(){
    if(checking)return;checking=true;
    try{const remote=await getRemoteEpoch();if(!remote)return;const local=localStorage.getItem(EPOCH_KEY);if(local===null){localStorage.setItem(EPOCH_KEY,remote);return}if(local!==remote){window.GBPBootLoading?.show('Refreshing learning data, please wait....');await clearQuestionCache();localStorage.setItem(EPOCH_KEY,remote);cleanLegacyCacheParams();location.reload()}}catch(e){}finally{checking=false}
  }

  const nativeFetch=window.fetch.bind(window);
  const jsonResponse=data=>new Response(JSON.stringify(data),{status:200,headers:{'Content-Type':'application/json'}});
  window.fetch=async(input,init={})=>{
    const url=typeof input==='string'?input:String(input?.url||'');
    const isUsed=url.includes('/rest/v1/rpc/gbp_question_used_slots');
    const isRegister=url.includes('/rest/v1/rpc/gbp_question_register_batch');
    if(!isUsed&&!isRegister)return nativeFetch(input,init);
    let payload={};try{payload=typeof init?.body==='string'?JSON.parse(init.body):{}}catch(e){}
    if(isUsed){try{const r=await nativeFetch(input,init);if(r.ok)return r}catch(e){}return jsonResponse({module_id:Number(payload.p_module_id)||null,used:[],used_count:0,unused_count:3000,fallback:true})}

    const mid=Number(payload.p_module_id)||0,candidates=Array.isArray(payload.p_questions)?payload.p_questions:[],requested=Math.max(1,Math.min(25,Number(payload.p_requested_count)||25));
    let session=reservationSeen.get(mid);if(!session||session.stems.size>=25||(requested>=20&&session.stems.size>0)){session={stems:new Set()};reservationSeen.set(mid,session)}
    const bySlot=new Map(candidates.map(q=>[Number(q?.slot),q]));
    const mergeUnique=(accepted=[])=>{const slots=[],slotSet=new Set();const take=(slot,q)=>{const sk=norm(q?.question);if(!slot||slot>3000||!sk||slotSet.has(slot)||session.stems.has(sk))return false;slotSet.add(slot);session.stems.add(sk);slots.push(slot);return true};for(const slot0 of accepted){const slot=Number(slot0),q=bySlot.get(slot);take(slot,q);if(slots.length>=requested)return slots}for(const q of candidates){const slot=Number(q?.slot);take(slot,q);if(slots.length>=requested)break}return slots};
    try{const r=await nativeFetch(input,init);if(r.ok){const d=await r.clone().json().catch(()=>({})),accepted=Array.isArray(d?.accepted_slots)?d.accepted_slots:[],slots=mergeUnique(accepted);return jsonResponse({...d,ok:true,accepted_slots:slots,accepted_count:slots.length,requested_count:requested,fallback:slots.length!==(Number(d?.accepted_count)||0)})}}catch(e){}
    const slots=mergeUnique([]);return jsonResponse({ok:true,batch_id:null,module_id:mid,accepted_count:slots.length,accepted_slots:slots,requested_count:requested,fallback:true});
  };

  document.addEventListener('DOMContentLoaded',()=>{const bank=window.QUESTION_BANK||[];if(!Array.isArray(bank))return;const stems=new Set(),unique=[];for(const q of bank){const sk=`${Number(q?.moduleId)||0}|${norm(q?.question)}`;if(!sk||stems.has(sk))continue;stems.add(sk);unique.push(q)}if(unique.length!==bank.length)bank.splice(0,bank.length,...unique)},{once:true});
  check();setInterval(check,CHECK_EVERY);window.addEventListener('focus',check,{passive:true});document.addEventListener('visibilitychange',()=>{if(!document.hidden)check()},{passive:true});window.GBPCacheControl={check,clearQuestionCache};
})();