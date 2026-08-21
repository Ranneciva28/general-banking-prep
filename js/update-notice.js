(() => {
  const BUILD='2026.08.21.2310';
  const KEY=`gbpUpdateNotice-${BUILD}`;
  const show=()=>{
    if(sessionStorage.getItem(KEY))return;
    const wrap=document.createElement('div');
    wrap.id='gbpUpdateNotice';
    wrap.style.cssText='position:fixed;inset:0;z-index:99999;background:rgba(15,23,42,.72);display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(5px)';
    wrap.innerHTML=`<div style="width:min(560px,100%);background:#fff;color:#0f172a;border-radius:20px;padding:24px;box-shadow:0 24px 70px rgba(0,0,0,.28);font-family:inherit">
      <div style="font-size:12px;font-weight:800;letter-spacing:.08em;color:#2454e6;margin-bottom:8px">UPDATE BANK SOAL</div>
      <h2 style="margin:0 0 10px;font-size:22px">Mohon lakukan hard refresh</h2>
      <p style="margin:0 0 16px;line-height:1.55;color:#475569">Sistem bank soal dan proteksi soal duplikat baru saja diperbarui. Agar versi lama tidak tertahan di cache browser, lakukan hard refresh satu kali.</p>
      <div style="display:grid;gap:10px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:14px;margin-bottom:18px">
        <div><strong>Windows — Chrome / Edge / Firefox</strong><br><span style="color:#475569">Tekan <b>Ctrl + Shift + R</b></span></div>
        <div><strong>Mac — Chrome / Firefox</strong><br><span style="color:#475569">Tekan <b>Command (⌘) + Shift + R</b></span></div>
        <div><strong>Mac — Safari</strong><br><span style="color:#475569">Tekan <b>Option (⌥) + Command (⌘) + E</b>, lalu <b>Command (⌘) + R</b></span></div>
      </div>
      <button id="gbpUpdateNoticeOk" style="width:100%;border:0;border-radius:12px;background:#2454e6;color:#fff;padding:12px 16px;font:inherit;font-weight:800;cursor:pointer">Saya Mengerti</button>
    </div>`;
    document.body.appendChild(wrap);
    wrap.querySelector('#gbpUpdateNoticeOk')?.addEventListener('click',()=>{sessionStorage.setItem(KEY,'1');wrap.remove()});
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',show);else show();
})();