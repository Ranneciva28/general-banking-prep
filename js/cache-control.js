(() => {
  const SUPA_URL='https://pnisrktkkbzspolkfkag.supabase.co';
  const SUPA_KEY='sb_publishable_ClLcjnxymypzS2O6x1TzwA_c9y7-j1Y';
  const EPOCH_KEY='gbpRemoteCacheEpochV1';
  const CHECK_EVERY=30000;
  let checking=false;
  const norm=s=>String(s||'').toLocaleLowerCase('id-ID').replace(/[^a-z0-9à-öø-ÿ]+/giu,' ').replace(/\s+/g,' ').trim();
  const reservationSeen=new Map();

  async function clearRuntimeCache(){
    try{if('serviceWorker' in navigator){const regs=await navigator.serviceWorker.getRegistrations();await Promise.all(regs.map(r=>r.unregister()));}}catch(e){}
    try{if('caches' in window){const names=await caches.keys();await Promise.all(names.map(n=>caches.delete(n)));}}catch(e){}
  }
  async function getRemoteEpoch(){
    const r=await fetch(`${SUPA_URL}/rest/v1/rpc/gbp_cache_version?t=${Date.now()}`,{method:'POST',cache:'no-store',headers:{'Content-Type':'application/json','apikey':SUPA_KEY},body:'{}'});
    if(!r.ok)throw new Error('cache-version-unavailable');const d=await r.json();return String(d?.epoch??'');
  }
  async function check(){
    if(checking)return;checking=true;
    try{const remote=await getRemoteEpoch();if(!remote)return;const local=localStorage.getItem(EPOCH_KEY);if(local===null){localStorage.setItem(EPOCH_KEY,remote);return}if(local!==remote){await clearRuntimeCache();localStorage.setItem(EPOCH_KEY,remote);const u=new URL(location.href);u.searchParams.set('_cache',remote);u.searchParams.set('_ts',Date.now().toString());location.replace(u.toString())}}catch(e){}finally{checking=false}
  }

  // Supabase remains the source of truth for usage/history, but a temporary DB rejection
  // must never block quiz loading. Fallback acceptance is scoped to one 50-question
  // reservation session and is deduped by normalized question text across all rounds.
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

    const mid=Number(payload.p_module_id)||0;
    const candidates=Array.isArray(payload.p_questions)?payload.p_questions:[];
    const requested=Math.max(1,Math.min(50,Number(payload.p_requested_count)||50));
    let session=reservationSeen.get(mid);
    if(!session||session.size>=50||(requested>=40&&session.size>0)){session=new Set();reservationSeen.set(mid,session)}
    const bySlot=new Map(candidates.map(q=>[Number(q?.slot),q]));
    const mergeUnique=(accepted=[])=>{
      const slots=[],slotSet=new Set();
      for(const slot0 of accepted){const slot=Number(slot0),q=bySlot.get(slot),k=norm(q?.question);if(!slot||!k||slotSet.has(slot)||session.has(k))continue;slotSet.add(slot);session.add(k);slots.push(slot);if(slots.length>=requested)return slots}
      for(const q of candidates){const slot=Number(q?.slot),k=norm(q?.question);if(!slot||!k||slotSet.has(slot)||session.has(k))continue;slotSet.add(slot);session.add(k);slots.push(slot);if(slots.length>=requested)break}
      return slots;
    };

    try{
      const r=await nativeFetch(input,init);
      if(r.ok){const d=await r.clone().json().catch(()=>({}));const accepted=Array.isArray(d?.accepted_slots)?d.accepted_slots:[];const slots=mergeUnique(accepted);return jsonResponse({...d,ok:true,accepted_slots:slots,accepted_count:slots.length,requested_count:requested,fallback:slots.length!==(Number(d?.accepted_count)||0)})}
    }catch(e){}
    const slots=mergeUnique([]);
    return jsonResponse({ok:true,batch_id:null,module_id:mid,accepted_count:slots.length,accepted_slots:slots,requested_count:requested,fallback:true});
  };

  // Global exact-stem guard for any bank assembled before app.js starts.
  document.addEventListener('DOMContentLoaded',()=>{
    const bank=window.QUESTION_BANK||[];if(!Array.isArray(bank))return;
    const seen=new Set(),unique=[];for(const q of bank){const k=norm(q?.question);if(!k||seen.has(k))continue;seen.add(k);unique.push(q)}
    if(unique.length!==bank.length)bank.splice(0,bank.length,...unique);
  },{once:true});

  // Update announcement for every active browser after cache epoch refresh.
  document.addEventListener('DOMContentLoaded',()=>{
    const key='gbpCacheNotice-20260821-2310';if(sessionStorage.getItem(key))return;
    const wrap=document.createElement('div');wrap.style.cssText='position:fixed;inset:0;z-index:99999;background:rgba(15,23,42,.72);display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(5px)';
    wrap.innerHTML=`<div style="width:min(560px,100%);background:#fff;color:#0f172a;border-radius:20px;padding:24px;box-shadow:0 24px 70px rgba(0,0,0,.28);font-family:inherit"><div style="font-size:12px;font-weight:800;letter-spacing:.08em;color:#2454e6;margin-bottom:8px">UPDATE BANK SOAL</div><h2 style="margin:0 0 10px;font-size:22px">Lakukan hard refresh satu kali</h2><p style="margin:0 0 16px;line-height:1.55;color:#475569">Bank soal dan proteksi soal duplikat baru saja diperbarui. Bersihkan cache halaman agar versi lama tidak tertahan.</p><div style="display:grid;gap:10px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:14px;margin-bottom:18px"><div><strong>Windows — Chrome / Edge / Firefox</strong><br><span style="color:#475569">Ctrl + Shift + R</span></div><div><strong>Mac — Chrome / Firefox</strong><br><span style="color:#475569">Command (⌘) + Shift + R</span></div><div><strong>Mac — Safari</strong><br><span style="color:#475569">Option (⌥) + Command (⌘) + E, lalu Command (⌘) + R</span></div></div><button style="width:100%;border:0;border-radius:12px;background:#2454e6;color:#fff;padding:12px 16px;font:inherit;font-weight:800;cursor:pointer">Saya Mengerti</button></div>`;
    document.body.appendChild(wrap);wrap.querySelector('button')?.addEventListener('click',()=>{sessionStorage.setItem(key,'1');wrap.remove()});
  },{once:true});

  check();setInterval(check,CHECK_EVERY);window.addEventListener('focus',check,{passive:true});document.addEventListener('visibilitychange',()=>{if(!document.hidden)check()},{passive:true});window.GBPCacheControl={check};
})();