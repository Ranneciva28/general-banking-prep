(() => {
  const URL='https://pnisrktkkbzspolkfkag.supabase.co';
  const KEY='sb_publishable_ClLcjnxymypzS2O6x1TzwA_c9y7-j1Y';
  const TOKEN_KEY='cenaAnalyticsToken';
  const fmt=n=>Number(n||0).toLocaleString('id-ID');
  let timer=null;

  function ensureUI(){
    if(document.getElementById('questionBankDbPanel'))return;
    const kpis=document.querySelector('#dashboardView .kpis');if(!kpis)return;
    const style=document.createElement('style');style.textContent=`
      .bank-db-panel{margin-top:13px}.bank-db-kpis{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-top:12px}.bank-db-kpis div{border:1px solid #e5e7eb;border-radius:12px;padding:12px;background:#f8fafc}.bank-db-kpis span{display:block;font-size:8px;color:#6b7280;text-transform:uppercase}.bank-db-kpis strong{display:block;font-size:20px;margin-top:5px}.bank-db-modules{display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin-top:12px;max-height:220px;overflow:auto}.bank-db-module{padding:8px;border:1px solid #e5e7eb;border-radius:9px;font-size:8px}.bank-db-module b{display:block;font-size:9px;margin-bottom:3px}.bank-db-module span{color:#6b7280}@media(max-width:1050px){.bank-db-kpis{grid-template-columns:repeat(3,1fr)}.bank-db-modules{grid-template-columns:repeat(3,1fr)}}@media(max-width:700px){.bank-db-kpis,.bank-db-modules{grid-template-columns:1fr 1fr}}
    `;document.head.appendChild(style);
    const panel=document.createElement('section');panel.id='questionBankDbPanel';panel.className='panel bank-db-panel';
    panel.innerHTML=`<div class="panel-head"><h2>Question Bank Database</h2><span>Supabase · 5.000 slot/module</span></div><div class="bank-db-kpis"><div><span>Total slot</span><strong id="dbTotalSlots">—</strong></div><div><span>Sudah materialized</span><strong id="dbMaterialized">—</strong></div><div><span>Belum materialized</span><strong id="dbUnusedSlots">—</strong></div><div><span>Question served</span><strong id="dbServed">—</strong></div><div><span>User tercatat</span><strong id="dbClients">—</strong></div></div><div id="dbModuleRows" class="bank-db-modules"></div>`;
    kpis.parentNode.insertBefore(panel,kpis.nextSibling);
  }

  async function load(){
    const token=sessionStorage.getItem(TOKEN_KEY);if(!token)return;
    try{
      const r=await fetch(`${URL}/rest/v1/rpc/gbp_question_bank_admin_stats`,{method:'POST',cache:'no-store',headers:{'Content-Type':'application/json','apikey':KEY},body:JSON.stringify({p_token:token})});
      if(!r.ok)return;
      const d=await r.json();ensureUI();
      const total=Number(d.total_slots)||0,mat=Number(d.materialized)||0;
      document.getElementById('dbTotalSlots').textContent=fmt(total);
      document.getElementById('dbMaterialized').textContent=fmt(mat);
      document.getElementById('dbUnusedSlots').textContent=fmt(Math.max(0,total-mat));
      document.getElementById('dbServed').textContent=fmt(d.served_records);
      document.getElementById('dbClients').textContent=fmt(d.clients);
      document.getElementById('dbModuleRows').innerHTML=(d.modules||[]).map(x=>`<div class="bank-db-module"><b>M${x.module_id}</b><span>${fmt(x.materialized)} stored · ${fmt(x.served)} served</span></div>`).join('');
    }catch(e){}
  }

  document.addEventListener('DOMContentLoaded',()=>{
    const obs=new MutationObserver(()=>{if(!document.getElementById('dashboardView')?.classList.contains('hidden')){ensureUI();load()}});
    const d=document.getElementById('dashboardView');if(d)obs.observe(d,{attributes:true,attributeFilter:['class']});
    setTimeout(()=>{ensureUI();load()},800);
    timer=setInterval(load,30000);
  });
})();