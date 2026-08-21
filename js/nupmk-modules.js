(() => {
  const bank = window.QUESTION_BANK || [];
  if (!Array.isArray(bank) || !bank.length) return;

  const CATEGORY_DAY = 6;
  // Each competency draws from the complete General Banking Day 1–5 corpus that is relevant to that unit,
  // rather than only copying the similarly named legacy module.
  const units = [
    { id:26, code:'K.64GEB00.009.1', name:'Memberikan Pelayanan Informasi Produk dan Jasa Perbankan', source:[2,3,5,6,7] },
    { id:27, code:'K.64GEB00.007.1', name:'Memberikan Edukasi Nasabah dan Calon Nasabah', source:[2,3,5,6,8] },
    { id:28, code:'K.64GEB00.010.1', name:'Menangani Pengaduan Nasabah', source:[9,20,21,22,24] },
    { id:29, code:'K.64GEB00.001.1', name:'Memproses Pembukaan dan Penutupan Rekening', source:[10,20,21,22,24] },
    { id:30, code:'K.64GEB00.002.2', name:'Memproses Transaksi Keuangan Tunai dan Non Tunai', source:[11,13,14,20,21,24] },
    { id:31, code:'K.64GEB00.015.1', name:'Mengelola Administrasi Perbankan', source:[12,16,17,18,19,20,21,22,23,24] },
    { id:32, code:'K.64GEB00.003.2', name:'Memproses Valuta Asing', source:[13,17,21,24] },
    { id:33, code:'K.64GEB00.014.2', name:'Memproses Trade Service dan Trade Finance', source:[14,17,21,22,24] },
    { id:34, code:'K.64GEB00.016.1', name:'Mengelola Akuntansi', source:[15,16,17,22] },
    { id:35, code:'K.64GEB00.017.1', name:'Mengelola Aspek-Aspek Hukum', source:[4,17,20,21,22,23,24] }
  ];

  // Remove stale pre-generator NUPMK clones if this script is re-evaluated in the same page.
  for (let i = bank.length - 1; i >= 0; i--) {
    if (Number(bank[i]?.moduleId) >= 26 && Number(bank[i]?.moduleId) <= 35 && String(bank[i]?.id||'').startsWith('NUPMK-')) bank.splice(i,1);
  }

  const sourceSnapshot = bank.filter(q => Number(q.moduleId) >= 1 && Number(q.moduleId) <= 24);
  const additions = [];
  units.forEach(unit => {
    const pool = sourceSnapshot.filter(q => unit.source.includes(Number(q.moduleId)));
    pool.forEach((q, idx) => additions.push({
      ...q,
      id:`NUPMK-${unit.id}-${String(idx+1).padStart(3,'0')}-${q.id}`,
      moduleId:unit.id,
      moduleName:unit.name,
      day:CATEGORY_DAY,
      unitCode:unit.code,
      category:'NUPMK Unit Kompetensi',
      source:`${q.source} · NUPMK ${unit.code}`,
      nupmkSourceModule:Number(q.moduleId)
    }));
  });
  bank.push(...additions);

  window.NUPMK_UNITS = units.map(u => ({...u, day:CATEGORY_DAY}));
  window.__GBP_SOURCE_BANK__ = bank.map(q => ({...q, options:Array.isArray(q.options)?[...q.options]:q.options}));
})();
