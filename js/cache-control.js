(() => {
  const SUPA_URL='https://pnisrktkkbzspolkfkag.supabase.co';
  const SUPA_KEY='sb_publishable_ClLcjnxymypzS2O6x1TzwA_c9y7-j1Y';
  const EPOCH_KEY='gbpRemoteCacheEpochV1';
  const CHECK_EVERY=30000;
  let checking=false;

  async function clearRuntimeCache(){
    try{
      if('serviceWorker' in navigator){
        const regs=await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map(r=>r.unregister()));
      }
    }catch(e){}
    try{
      if('caches' in window){
        const names=await caches.keys();
        await Promise.all(names.map(n=>caches.delete(n)));
      }
    }catch(e){}
  }

  async function getRemoteEpoch(){
    const r=await fetch(`${SUPA_URL}/rest/v1/rpc/gbp_cache_version?t=${Date.now()}`,{
      method:'POST',
      cache:'no-store',
      headers:{'Content-Type':'application/json','apikey':SUPA_KEY},
      body:'{}'
    });
    if(!r.ok)throw new Error('cache-version-unavailable');
    const d=await r.json();
    return String(d?.epoch??'');
  }

  async function check(){
    if(checking)return;
    checking=true;
    try{
      const remote=await getRemoteEpoch();
      if(!remote)return;
      const local=localStorage.getItem(EPOCH_KEY);
      if(local===null){
        localStorage.setItem(EPOCH_KEY,remote);
        return;
      }
      if(local!==remote){
        await clearRuntimeCache();
        localStorage.setItem(EPOCH_KEY,remote);
        const u=new URL(location.href);
        u.searchParams.set('_cache',remote);
        u.searchParams.set('_ts',Date.now().toString());
        location.replace(u.toString());
      }
    }catch(e){}
    finally{checking=false}
  }

  // Question-bank RPCs are best-effort. Quiz loading must never be blocked just because
  // Supabase rejects too many candidates, is slow, or temporarily cannot be reached.
  // We still call the real database first; the fallback only completes the local active set.
  const nativeFetch=window.fetch.bind(window);
  const jsonResponse=data=>new Response(JSON.stringify(data),{status:200,headers:{'Content-Type':'application/json'}});
  window.fetch=async(input,init={})=>{
    const url=typeof input==='string'?input:String(input?.url||'');
    const isUsed=url.includes('/rest/v1/rpc/gbp_question_used_slots');
    const isRegister=url.includes('/rest/v1/rpc/gbp_question_register_batch');
    if(!isUsed&&!isRegister)return nativeFetch(input,init);

    let payload={};
    try{payload=typeof init?.body==='string'?JSON.parse(init.body):{}}catch(e){}

    if(isUsed){
      try{
        const r=await nativeFetch(input,init);
        if(r.ok)return r;
      }catch(e){}
      return jsonResponse({module_id:Number(payload.p_module_id)||null,used:[],used_count:0,unused_count:5000,fallback:true});
    }

    const candidates=Array.isArray(payload.p_questions)?payload.p_questions:[];
    const requested=Math.max(1,Math.min(50,Number(payload.p_requested_count)||50));
    try{
      const r=await nativeFetch(input,init);
      if(r.ok){
        const d=await r.clone().json().catch(()=>({}));
        const accepted=Array.isArray(d?.accepted_slots)?d.accepted_slots.map(Number).filter(Boolean):[];
        if(accepted.length>=requested)return r;
        const set=new Set(accepted);
        const supplement=[];
        for(const q of candidates){
          const slot=Number(q?.slot);
          if(!slot||set.has(slot))continue;
          set.add(slot);supplement.push(slot);
          if(accepted.length+supplement.length>=requested)break;
        }
        return jsonResponse({...d,ok:true,accepted_slots:[...accepted,...supplement],accepted_count:accepted.length+supplement.length,requested_count:requested,fallback:true});
      }
    }catch(e){}

    const slots=[];
    for(const q of candidates){
      const slot=Number(q?.slot);if(!slot||slots.includes(slot))continue;
      slots.push(slot);if(slots.length>=requested)break;
    }
    return jsonResponse({ok:true,batch_id:null,module_id:Number(payload.p_module_id)||null,accepted_count:slots.length,accepted_slots:slots,requested_count:requested,fallback:true});
  };

  check();
  setInterval(check,CHECK_EVERY);
  window.addEventListener('focus',check,{passive:true});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)check()},{passive:true});
  window.GBPCacheControl={check};
})();
