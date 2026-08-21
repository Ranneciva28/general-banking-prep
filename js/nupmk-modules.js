(() => {
  const bank = window.QUESTION_BANK || [];
  if (!Array.isArray(bank) || !bank.length) return;

  const CATEGORY_DAY = 6;

  // NUPMK units must be sourced ONLY from the General Banking module(s) that directly
  // teach the competency. Adjacent compliance/risk topics are intentionally excluded.
  const units = [
    { id:26, code:'K.64GEB00.009.1', name:'Memberikan Pelayanan Informasi Produk dan Jasa Perbankan', source:[7], leads:['Saat nasabah meminta informasi produk,','Dalam penyampaian informasi produk,','Ketika fitur produk dijelaskan,','Pada saat manfaat produk diterangkan,'] },
    { id:27, code:'K.64GEB00.007.1', name:'Memberikan Edukasi Nasabah dan Calon Nasabah', source:[8], leads:['Saat melakukan edukasi kepada nasabah,','Dalam kegiatan edukasi keuangan,','Ketika pemahaman produk dijelaskan kepada nasabah,','Pada saat memberikan edukasi keuangan,'] },
    { id:28, code:'K.64GEB00.010.1', name:'Menangani Pengaduan Nasabah', source:[9], leads:['Saat menangani pengaduan nasabah,','Dalam proses penyelesaian pengaduan,','Ketika keluhan nasabah diterima,','Pada saat menindaklanjuti pengaduan,'] },
    { id:29, code:'K.64GEB00.001.1', name:'Memproses Pembukaan dan Penutupan Rekening', source:[10], leads:['Saat memproses pembukaan rekening,','Dalam proses penutupan rekening,','Ketika data rekening diproses,','Pada tahap pembukaan atau penutupan rekening,'] },
    { id:30, code:'K.64GEB00.002.2', name:'Memproses Transaksi Keuangan Tunai dan Non Tunai', source:[11], leads:['Saat memproses transaksi nasabah,','Dalam transaksi tunai dan non tunai,','Ketika instruksi transaksi diterima,','Pada tahap pemrosesan transaksi,'] },
    { id:31, code:'K.64GEB00.015.1', name:'Mengelola Administrasi Perbankan', source:[12], leads:['Dalam pengelolaan administrasi perbankan,','Saat dokumen administrasi diproses,','Ketika administrasi operasional diperiksa,','Pada proses administrasi perbankan,'] },
    { id:32, code:'K.64GEB00.003.2', name:'Memproses Valuta Asing', source:[13], leads:['Saat memproses transaksi valuta asing,','Dalam layanan transaksi valas,','Ketika transaksi mata uang asing diproses,','Pada proses valuta asing,'] },
    { id:33, code:'K.64GEB00.014.2', name:'Memproses Trade Service dan Trade Finance', source:[14], leads:['Dalam layanan trade service dan trade finance,','Saat dokumen trade diproses,','Ketika transaksi perdagangan internasional diproses,','Pada proses trade finance,'] },
    { id:34, code:'K.64GEB00.016.1', name:'Mengelola Akuntansi', source:[15,16], leads:['Dalam pencatatan akuntansi,','Saat transaksi dibukukan,','Ketika laporan akuntansi disusun,','Pada proses akuntansi perbankan,'] },
    { id:35, code:'K.64GEB00.017.1', name:'Mengelola Aspek-Aspek Hukum', source:[22], leads:['Dalam penanganan aspek hukum perbankan,','Saat dokumen hukum ditelaah,','Ketika ketentuan hukum diterapkan,','Pada proses legal perbankan,'] }
  ];

  const lowerFirst = text => {
    const s=String(text||'');
    return s ? s.charAt(0).toLocaleLowerCase('id-ID') + s.slice(1) : s;
  };

  // Clear only the cached active NUPMK set once for this corrected source-bank revision.
  // Supabase usage history is intentionally preserved for no-repeat tracking.
  try {
    const MIGRATION_KEY='gbpNupmkCoreFocusV2';
    if (!localStorage.getItem(MIGRATION_KEY)) {
      const stateKey='gbpDbBankV14';
      const state=JSON.parse(localStorage.getItem(stateKey)||'{}')||{};
      for(let id=26;id<=35;id++) delete state[String(id)];
      localStorage.setItem(stateKey,JSON.stringify(state));
      localStorage.setItem(MIGRATION_KEY,'1');
    }
  } catch(e) {}

  for (let i = bank.length - 1; i >= 0; i--) {
    if (Number(bank[i]?.moduleId) >= 26 && Number(bank[i]?.moduleId) <= 35 && String(bank[i]?.id||'').startsWith('NUPMK-')) bank.splice(i,1);
  }

  const sourceSnapshot = bank.filter(q => Number(q.moduleId) >= 1 && Number(q.moduleId) <= 24);
  const additions = [];

  units.forEach(unit => {
    const corePool = sourceSnapshot.filter(q => unit.source.includes(Number(q.moduleId)));
    corePool.forEach((q, idx) => {
      // Keep the original core question plus four concise, competency-specific framings.
      // The framing changes the stem identity without adding a second question or pulling
      // in topics outside the unit. This gives the DB enough genuinely distinct stems to
      // reserve a 50-question set while preserving the source answer/options/explanation.
      const variants=[
        {tag:'BASE', question:q.question},
        ...unit.leads.map((lead,n)=>({tag:`F${n+1}`,question:`${lead} ${lowerFirst(q.question)}`}))
      ];
      variants.forEach((variant,vIdx)=>additions.push({
        ...q,
        question:variant.question,
        id:`NUPMK-${unit.id}-${String(idx+1).padStart(3,'0')}-${variant.tag}-${q.id}`,
        moduleId:unit.id,
        moduleName:unit.name,
        day:CATEGORY_DAY,
        unitCode:unit.code,
        category:'NUPMK Unit Kompetensi',
        source:q.source,
        nupmkSourceModule:Number(q.moduleId),
        nupmkCoreAligned:true,
        nupmkVariant:vIdx
      }));
    });
  });

  bank.push(...additions);
  window.NUPMK_UNITS = units.map(({leads,...u}) => ({...u, day:CATEGORY_DAY}));
  window.__GBP_SOURCE_BANK__ = bank.map(q => ({...q, options:Array.isArray(q.options)?[...q.options]:q.options}));
})();