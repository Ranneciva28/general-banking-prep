(() => {
  const URL='https://pnisrktkkbzspolkfkag.supabase.co';
  const KEY='sb_publishable_ClLcjnxymypzS2O6x1TzwA_c9y7-j1Y';
  const TOKEN_KEY='cenaAnalyticsToken';
  const moduleNames={1:'Peran & Jenis Perbankan',2:'Produk & Jasa Dana',3:'Produk & Jasa Kredit',4:'Regulasi & Otoritas',5:'Business Ecosystem',6:'Future of Banking',7:'Informasi Produk & Jasa',8:'Edukasi Nasabah',9:'Pengaduan Nasabah',10:'Buka/Tutup Rekening',11:'Transaksi Tunai/Non Tunai',12:'Administrasi Perbankan',13:'Valuta Asing',14:'Trade Services & Finance',15:'Akuntansi Perusahaan',16:'Akuntansi Perbankan',17:'Risk Management & Culture',18:'Strategi Anti Fraud',19:'BCM & K3',20:'Pelindungan Data Pribadi',21:'KYC',22:'Aspek Hukum',23:'Three Lines of Defense',24:'APU/PPT/PPSPM',25:'BRIDGE Module',26:'Pelayanan Informasi Produk & Jasa',27:'Edukasi Nasabah & Calon Nasabah',28:'Pengaduan Nasabah',29:'Pembukaan & Penutupan Rekening',30:'Transaksi Tunai & Non Tunai',31:'Administrasi Perbankan',32:'Valuta Asing',33:'Trade Service & Trade Finance',34:'Mengelola Akuntansi',35:'Aspek-Aspek Hukum'};
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fmt=n=>Number(n||0).toLocaleString('id-ID');

  async function rpc(token){
    const r=await fetch(`${URL}/rest/v1/rpc/gbp_admin_learning_insights`,{method:'POST',cache:'no-store',headers:{'Content-Type':'application/json','apikey':KEY},body:JSON.stringify({p_token:token})});
    if(!r.ok)throw new Error(await r.text());return r.json();
  }
  function ensure(){
    if(document.getElementById('learningInsights'))return;
    const main=document.querySelector('.dashboard main');if(!main)return;
    const anchor=document.querySelector('.dashboard footer');
    const wrap=document.createElement('section');wrap.id='learningInsights';wrap.className='learning-insights';
    wrap.innerHTML=`
      <div class="insight-kpis"><article><span>Jawaban tercatat</span><strong id="liAnswered">0</strong><small>mulai setelah tracking aktif</small></article><article><span>Total salah</span><strong id="liWrong">0</strong><small>jawaban salah user</small></article></div>
      <section class="grid two">
        <article class="panel"><div class="panel-head"><h2>Soal Paling Banyak Salah</h2><span>global users</span></div><div id="liWrongQuestions" class="rows"></div></article>
        <article class="panel"><div class="panel-head"><h2>Modul Terlemah Global</h2><span>berdasarkan akurasi</span></div><div id="liWeakModules" class="rows"></div></article>
      </section>
      <section class="panel"><div class="panel-head"><h2>Kelemahan per Pengguna</h2><span>browser ID × module</span></div><div class="table-wrap"><table><thead><tr><th>User</th><th>Module</th><th>Dijawab</th><th>Salah</th><th>Benar</th><th>Akurasi</th></tr></thead><tbody id="liUsers"></tbody></table></div></section>`;
    main.insertBefore(wrap,anchor||null);
  }
  function render(d){
    ensure();
    document.getElementById('liAnswered').textContent=fmt(d.answered_total);
    document.getElementById('liWrong').textContent=fmt(d.wrong_total);
    document.getElementById('liWrongQuestions').innerHTML=(d.top_wrong_questions||[]).map((x,i)=>`<div class="row insight-question"><strong>#${i+1} · M${x.module_id} · ${esc(x.question)}</strong><span>${fmt(x.wrong_count)} salah / ${fmt(x.answer_count)} jawab</span><small>${x.wrong_rate??0}% · ${fmt(x.wrong_users)} user</small></div>`).join('')||'<div class="row"><span>Belum ada jawaban salah tercatat.</span></div>';
    document.getElementById('liWeakModules').innerHTML=(d.weak_modules_global||[]).map((x,i)=>`<div class="row"><strong>#${i+1} · M${x.module_id} ${esc(moduleNames[x.module_id]||'Module')}</strong><span>${x.accuracy??0}% akurasi</span><small>${fmt(x.wrong_count)} salah · ${fmt(x.users)} user</small></div>`).join('')||'<div class="row"><span>Belum ada data.</span></div>';
    document.getElementById('liUsers').innerHTML=(d.user_weakness||[]).map(x=>`<tr><td>${esc(x.user_id)}</td><td>M${x.module_id} · ${esc(moduleNames[x.module_id]||'Module')}</td><td>${fmt(x.answer_count)}</td><td>${fmt(x.wrong_count)}</td><td>${fmt(x.correct_count)}</td><td>${x.accuracy??0}%</td></tr>`).join('')||'<tr><td colspan="6">Belum ada jawaban user yang tercatat.</td></tr>';
  }
  async function refresh(){const token=sessionStorage.getItem(TOKEN_KEY);if(!token)return;try{render(await rpc(token))}catch(e){}}
  const observer=new MutationObserver(()=>{if(!document.getElementById('dashboardView')?.classList.contains('hidden'))refresh()});
  document.addEventListener('DOMContentLoaded',()=>{observer.observe(document.body,{attributes:true,subtree:true,attributeFilter:['class']});setInterval(refresh,30000);refresh()});
})();