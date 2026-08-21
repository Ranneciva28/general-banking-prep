(() => {
  const SUPA_URL='https://pnisrktkkbzspolkfkag.supabase.co';
  const SUPA_KEY='sb_publishable_ClLcjnxymypzS2O6x1TzwA_c9y7-j1Y';
  const EPOCH_KEY='gbpRemoteCacheEpochV1';
  const FALLBACK_SEEN_KEY='gbpFallbackQuestionSeenV16';
  const CHECK_EVERY=30000;
  let checking=false;

  const norm=s=>String(s||'').toLocaleLowerCase('id-ID').replace(/[^a-z0-9à-öø-ÿ]+/giu,' ').replace(/\s+/g,' ').trim();
  let fallbackSeen={};
  try{fallbackSeen=JSON.parse(localStorage.getItem(FALLBACK_SEEN_KEY)||'{}')||{}}catch(e){fallbackSeen={}}
  const remember=text=>{
    const k=norm(text);if(!k)return;
    fallbackSeen[k]=Date.now();
    const entries=Object.entries(fallbackSeen).sort((a,b)=>b[1]-a[1]).slice(0,12000);
    fallbackSeen=Object.fromEntries(entries);
    try{localStorage.setItem(FALLBACK_SEEN_KEY,JSON.stringify(fallbackSeen))}catch(e){}
  };

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
      method:'POST',cache:'no-store',headers:{'Content-Type':'application/json','apikey':SUPA_KEY},body:'{}'
    });
    if(!r.ok)throw new Error('cache-version-unavailable');
    const d=await r.json();return String(d?.epoch??'');
  }

  async function check(){
    if(checking)return;checking=true;
    try{
      const remote=await getRemoteEpoch();if(!remote)return;
      const local=localStorage.getItem(EPOCH_KEY);
      if(local===null){localStorage.setItem(EPOCH_KEY,remote);return}
      if(local!==remote){
        await clearRuntimeCache();localStorage.setItem(EPOCH_KEY,remote);
        const u=new URL(location.href);u.searchParams.set('_cache',remote);u.searchParams.set('_ts',Date.now().toString());location.replace(u.toString());
      }
    }catch(e){}finally{checking=false}
  }

  const nativeFetch=window.fetch.bind(window);
  const jsonResponse=data=>new Response(JSON.stringify(data),{status:200,headers:{'Content-Type':'application/json'}});
  window.fetch=async(input,init={})=>{
    const url=typeof input==='string'?input:String(input?.url||'');
    const isUsed=url.includes('/rest/v1/rpc/gbp_question_used_slots');
    const isRegister=url.includes('/rest/v1/rpc/gbp_question_register_batch');
    if(!isUsed&&!isRegister)return nativeFetch(input,init);

    let payload={};try{payload=typeof init?.body==='string'?JSON.parse(init.body):{}}catch(e){}
    if(isUsed){
      try{const r=await nativeFetch(input,init);if(r.ok)return r}catch(e){}
      return jsonResponse({module_id:Number(payload.p_module_id)||null,used:[],used_count:0,unused_count:5000,fallback:true});
    }

    const candidates=Array.isArray(payload.p_questions)?payload.p_questions:[];
    const requested=Math.max(1,Math.min(50,Number(payload.p_requested_count)||50));
    const bySlot=new Map(candidates.map(q=>[Number(q?.slot),q]));
    const buildSupplement=(accepted=[])=>{
      const slotSet=new Set(accepted);
      const textSet=new Set();
      for(const slot of accepted){const q=bySlot.get(Number(slot));const k=norm(q?.question);if(k){textSet.add(k);remember(q.question)}}
      const supplement=[];
      for(const q of candidates){
        const slot=Number(q?.slot),k=norm(q?.question);
        if(!slot||!k||slotSet.has(slot)||textSet.has(k)||fallbackSeen[k])continue;
        slotSet.add(slot);textSet.add(k);supplement.push(slot);remember(q.question);
        if(accepted.length+supplement.length>=requested)break;
      }
      return supplement;
    };

    try{
      const r=await nativeFetch(input,init);
      if(r.ok){
        const d=await r.clone().json().catch(()=>({}));
        const accepted=Array.isArray(d?.accepted_slots)?d.accepted_slots.map(Number).filter(Boolean):[];
        const supplement=buildSupplement(accepted);
        const all=[...accepted,...supplement];
        if(supplement.length===0&&accepted.length>=requested)return r;
        return jsonResponse({...d,ok:true,accepted_slots:all,accepted_count:all.length,requested_count:requested,fallback:supplement.length>0});
      }
    }catch(e){}

    const slots=buildSupplement([]);
    return jsonResponse({ok:true,batch_id:null,module_id:Number(payload.p_module_id)||null,accepted_count:slots.length,accepted_slots:slots,requested_count:requested,fallback:true});
  };

  check();setInterval(check,CHECK_EVERY);
  window.addEventListener('focus',check,{passive:true});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)check()},{passive:true});
  window.GBPCacheControl={check};
})();