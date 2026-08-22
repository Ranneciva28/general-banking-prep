(() => {
  function cleanLegacyCacheParams(){
    try{
      const u=new URL(location.href);
      let changed=false;
      ['_build','_cache','_ts','_manualclear'].forEach(k=>{
        if(u.searchParams.has(k)){u.searchParams.delete(k);changed=true;}
      });
      if(changed)history.replaceState(history.state,'',`${u.pathname}${u.search}${u.hash}`);
    }catch(e){}
  }

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

  async function clearQuestionCache(){
    await clearRuntimeCache();
  }

  cleanLegacyCacheParams();
  window.GBPCacheControl={
    check:()=>Promise.resolve(),
    clearQuestionCache
  };
})();