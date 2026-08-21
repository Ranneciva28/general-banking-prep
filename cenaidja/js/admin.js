(() => {
  const URL='https://pnisrktkkbzspolkfkag.supabase.co';
  const KEY='sb_publishable_ClLcjnxymypzS2O6x1TzwA_c9y7-j1Y';
  const TOKEN_KEY='cenaAnalyticsToken';
  const $=id=>document.getElementById(id);
  let timer=null;
  const moduleNames={1:'Peran & Jenis Perbankan',2:'Produk & Jasa Dana',3:'Produk & Jasa Kredit',4:'Regulasi & Otoritas',5:'Business Ecosystem',6:'Future of Banking',7:'Informasi Produk & Jasa',8:'Edukasi Nasabah',9:'Pengaduan Nasabah',10:'Buka/Tutup Rekening',11:'Transaksi Tunai/Non Tunai',12:'Administrasi Perbankan',13:'Valuta Asing',14:'Trade Services & Finance',15:'Akuntansi Perusahaan',16:'Akuntansi Perbankan',17:'Risk Management & Culture',18:'Strategi Anti Fraud',19:'BCM & K3',20:'Pelindungan Data Pribadi',21:'KYC',22:'Aspek Hukum',23:'Three Lines of Defense',24:'APU/PPT/PPSPM',25:'BRIDGE Module',26:'Pelayanan Informasi Produk & Jasa',27:'Edukasi Nasabah & Calon Nasabah',28:'Pengaduan Nasabah',29:'Pembukaan & Penutupan Rekening',30:'Transaksi Tunai & Non Tunai',31:'Administrasi Perbankan',32:'Valuta Asing',33:'Trade Service & Trade Finance',34:'Mengelola Akuntansi',35:'Aspek-Aspek Hukum'};
  const fmt=n=>Number(n||0).toLocaleString('id-ID');
  const dt=s=>s?new Intl.DateTimeFormat('id-ID',{dateStyle:'short',timeStyle:'medium',timeZone:'Asia/Jakarta'}).format(new Date(s)):'—';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  async function rpc(name,body={}){
    const r=await fetch(`${URL}/rest/v1/rpc/${name}`,{method:'POST',cache:'no-store',headers:{'Content-Type':'application/json','apikey':KEY},body:JSON.stringify(body)});
    if(!r.ok)throw new Error(await r.text()||'request-failed');
    return r.json();
  }
  const load=token=>rpc('gbp_admin_dashboard',{p_token:token});
  const loadCacheVersion=()=>rpc('gbp_cache_version',{});
  const forceCacheClear=token=>rpc('gbp_admin_force_cache_clear',{p_token:token});

  function ensureCacheControl(){
    if($('forceCacheBtn'))return;
    const header=document.querySelector('.dashboard main header');
    if(!header)return;
    const refresh=$('refreshBtn');
    const actions=document.createElement('div');actions.className='admin-header-actions';
    const force=document.createElement('button');force.type='button';force.id='forceCacheBtn';force.className='force-cache-btn';force.textContent='⚡ Force Clear Cache';
    if(refresh){refresh.parentNode.insertBefore(actions,refresh);actions.appendChild(force);actions.appendChild(refresh)}else{header.appendChild(actions);actions.appendChild(force)}

    const panel=document.createElement('section');panel.className='panel cache-control-panel';panel.innerHTML='<div><span class="eyebrow">GLOBAL CACHE CONTROL</span><h2>Paksa semua user menerima update terbaru</h2><p>Browser user akan mendeteksi cache epoch baru, menghapus browser cache dan Service Worker, lalu reload. Progress belajar dan riwayat soal tidak dihapus.</p></div><div class="cache-epoch-box"><small>Cache epoch</small><strong id="cacheEpoch">—</strong><span id="cacheUpdated">Belum dimuat</span></div>';
    const kpis=document.querySelector('.kpis');if(kpis)kpis.parentNode.insertBefore(panel,kpis);
    const notice=document.createElement('div');notice.id='cacheNotice';notice.className='cache-notice hidden';panel.after(notice);
    force.addEventListener('click',handleForceCache);
  }

  async function refreshCacheStatus(){
    try{const d=await loadCacheVersion();if($('cacheEpoch'))$('cacheEpoch').textContent=fmt(d.epoch);if($('cacheUpdated'))$('cacheUpdated').textContent=`Update ${dt(d.updated_at)}`}catch(e){if($('cacheUpdated'))$('cacheUpdated').textContent='Status cache gagal dimuat'}
  }

  async function handleForceCache(){
    const token=sessionStorage.getItem(TOKEN_KEY);if(!token)return;
    if(!confirm('Paksa seluruh user clear cache dan reload ke versi terbaru? Progress belajar user TIDAK akan dihapus.'))return;
    const btn=$('forceCacheBtn'),notice=$('cacheNotice');
    if(btn){btn.disabled=true;btn.textContent='Memproses…'}
    try{
      const d=await forceCacheClear(token);
      if(notice){notice.className='cache-notice success';notice.textContent=`Force clear aktif. Cache epoch sekarang ${d.epoch}. User aktif akan menerima perintah reload maksimal sekitar 30 detik.`}
      await refreshCacheStatus();
    }catch(e){
      if(notice){notice.className='cache-notice error-notice';notice.textContent='Force clear cache gagal. Coba login ulang atau refresh dashboard.'}
    }finally{if(btn){btn.disabled=false;btn.textContent='⚡ Force Clear Cache'}}
  }

  function showDashboard(){$('loginView').classList.add('hidden');$('dashboardView').classList.remove('hidden');ensureCacheControl()}
  function showLogin(){$('dashboardView').classList.add('hidden');$('loginView').classList.remove('hidden')}
  async function refresh(){
    const token=sessionStorage.getItem(TOKEN_KEY);if(!token)return showLogin();
    try{const d=await load(token);showDashboard();render(d);refreshCacheStatus()}catch(e){sessionStorage.removeItem(TOKEN_KEY);showLogin();$('loginError').classList.remove('hidden')}
  }
  function render(d){
    $('lastUpdated').textContent=`Terakhir diperbarui ${dt(d.generated_at)}`;$('activeUsers').textContent=fmt(d.active_users);$('active5m').textContent=fmt(d.active_5m);$('usersToday').textContent=fmt(d.unique_users_today);$('visitsToday').textContent=fmt(d.visits_today);$('quizzesToday').textContent=fmt(d.quizzes_today);$('generatedToday').textContent=fmt(d.generated_today);$('generatedAll').textContent=`${fmt(d.generated_total)} total`;
    const days=d.daily_14||[],maxDay=Math.max(1,...days.map(x=>Number(x.visits)||0));$('dailyChart').innerHTML=days.map(x=>`<div class="barcol"><b>${fmt(x.visits)}</b><i style="height:${Math.max(2,(Number(x.visits)||0)/maxDay*150)}px"></i><span>${String(x.date).slice(5)}</span></div>`).join('');
    const hours=d.hourly_today||[],maxHour=Math.max(1,...hours.map(x=>Number(x.events)||0));$('hourChart').innerHTML=hours.map(x=>`<div class="hourcol"><b>${fmt(x.users)}</b><i style="height:${Math.max(2,(Number(x.events)||0)/maxHour*150)}px"></i><span>${String(x.hour).padStart(2,'0')}</span></div>`).join('');
    $('moduleTable').innerHTML=(d.top_modules||[]).map((x,i)=>`<div class="row"><strong>#${i+1} · M${x.module_id} ${esc(moduleNames[x.module_id]||'Module')}</strong><span>${fmt(x.events)} activity</span><small>${fmt(x.generated)} generated</small></div>`).join('')||'<div class="row"><span>Belum ada data.</span></div>';
    $('deviceRows').innerHTML=(d.devices||[]).map(x=>`<div class="row"><strong>${esc(x.device)}</strong><span>${fmt(x.users)}</span></div>`).join('');
    $('timezoneRows').innerHTML=(d.timezones||[]).map(x=>`<div class="row"><strong>${esc(x.timezone)}</strong><span>${fmt(x.users)}</span></div>`).join('');
    const sessions=d.active_sessions||[];$('activeLabel').textContent=`${sessions.length} sesi ≤ 10 menit`;$('sessionTable').innerHTML=sessions.map(x=>{const loc=x.latitude!=null&&x.longitude!=null?`<a target="_blank" rel="noreferrer" href="https://www.google.com/maps?q=${x.latitude},${x.longitude}">${Number(x.latitude).toFixed(3)}, ${Number(x.longitude).toFixed(3)}</a>`:esc(x.timezone||'—');return `<tr><td>${esc(x.session)}</td><td>${dt(x.last_seen)}</td><td>${esc(x.page||'—')}</td><td>${x.day?`D${x.day}`:'—'} / ${x.module_id?`M${x.module_id}`:'—'}</td><td>${esc(x.device||'—')} · ${esc(x.browser||'—')} · ${esc(x.os||'—')}</td><td>${loc}</td><td>${fmt(x.generated_total)}</td><td>${esc(x.last_event||'—')}</td></tr>`}).join('')||'<tr><td colspan="8">Tidak ada user aktif.</td></tr>';
    $('eventTable').innerHTML=(d.recent_events||[]).map(x=>`<tr><td>${dt(x.time)}</td><td>${esc(x.session)}</td><td>${esc(x.event)}</td><td>${x.day||'—'}</td><td>${x.module_id||'—'}</td><td>${fmt(x.question_count)}</td></tr>`).join('');
  }
  $('loginForm').addEventListener('submit',async e=>{e.preventDefault();$('loginError').classList.add('hidden');const token=$('tokenInput').value.trim();try{await load(token);sessionStorage.setItem(TOKEN_KEY,token);showDashboard();refresh();if(!timer)timer=setInterval(refresh,30000)}catch(err){$('loginError').classList.remove('hidden')}});
  $('refreshBtn').addEventListener('click',refresh);$('refreshSide').addEventListener('click',refresh);$('logoutBtn').addEventListener('click',()=>{sessionStorage.removeItem(TOKEN_KEY);location.reload()});
  if(sessionStorage.getItem(TOKEN_KEY)){refresh();timer=setInterval(refresh,30000)}
})();
