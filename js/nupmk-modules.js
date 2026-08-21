(() => {
  const bank = window.QUESTION_BANK || [];
  if (!Array.isArray(bank) || !bank.length) return;

  const CATEGORY_DAY = 6;
  const units = [
    { id:26, code:'K.64GEB00.009.1', name:'Memberikan Pelayanan Informasi Produk dan Jasa Perbankan', source:[7] },
    { id:27, code:'K.64GEB00.007.1', name:'Memberikan Edukasi Nasabah dan Calon Nasabah', source:[8] },
    { id:28, code:'K.64GEB00.010.1', name:'Menangani Pengaduan Nasabah', source:[9] },
    { id:29, code:'K.64GEB00.001.1', name:'Memproses Pembukaan dan Penutupan Rekening', source:[10] },
    { id:30, code:'K.64GEB00.002.2', name:'Memproses Transaksi Keuangan Tunai dan Non Tunai', source:[11] },
    { id:31, code:'K.64GEB00.015.1', name:'Mengelola Administrasi Perbankan', source:[12] },
    { id:32, code:'K.64GEB00.003.2', name:'Memproses Valuta Asing', source:[13] },
    { id:33, code:'K.64GEB00.014.2', name:'Memproses Trade Service dan Trade Finance', source:[14] },
    { id:34, code:'K.64GEB00.016.1', name:'Mengelola Akuntansi', source:[15,16] },
    { id:35, code:'K.64GEB00.017.1', name:'Mengelola Aspek-Aspek Hukum', source:[22] }
  ];

  try {
    const MIGRATION_KEY='gbpNupmkCoreOnlyV3';
    if (!localStorage.getItem(MIGRATION_KEY)) {
      localStorage.removeItem('gbpDbBankV14');
      localStorage.setItem(MIGRATION_KEY,'1');
    }
  } catch(e) {}

  for (let i = bank.length - 1; i >= 0; i--) {
    if (Number(bank[i]?.moduleId) >= 26 && Number(bank[i]?.moduleId) <= 35) bank.splice(i,1);
  }

  const sourceSnapshot = bank.filter(q => Number(q.moduleId) >= 1 && Number(q.moduleId) <= 24);
  const additions = [];
  units.forEach(unit => {
    const corePool = sourceSnapshot.filter(q => unit.source.includes(Number(q.moduleId)));
    corePool.forEach((q, idx) => additions.push({
      ...q,
      id:`NUPMK-${unit.id}-${String(idx+1).padStart(3,'0')}-${q.id}`,
      moduleId:unit.id,
      moduleName:unit.name,
      day:CATEGORY_DAY,
      unitCode:unit.code,
      category:'NUPMK Unit Kompetensi',
      source:q.source,
      nupmkSourceModule:Number(q.moduleId),
      nupmkCoreAligned:true,
      rootQuestionId:q.id
    }));
  });

  bank.push(...additions);
  window.NUPMK_UNITS = units.map(u => ({...u, day:CATEGORY_DAY}));
  window.__GBP_SOURCE_BANK__ = bank.map(q => ({...q, options:Array.isArray(q.options)?[...q.options]:q.options}));
})();