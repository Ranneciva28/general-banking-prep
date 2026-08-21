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

  check();
  setInterval(check,CHECK_EVERY);
  window.addEventListener('focus',check,{passive:true});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)check()},{passive:true});
  window.GBPCacheControl={check};
})();
