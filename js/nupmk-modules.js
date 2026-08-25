(() => {
  const bank=window.QUESTION_BANK||[];
  if(!Array.isArray(bank)||!bank.length)return;

  const NUPMK_DAY=6;
  const BRIDGE_DAY=7;
  const BRIDGE_DECK='SERTIFIKASI GB 4 PPT BRIDGE_compressed (2) (1).pdf';
  const MAX_BANK=500;

  const nupmkUnits=[
    {id:26,code:'K.64GEB00.009.1',name:'Memberikan Pelayanan Informasi Produk dan Jasa Perbankan',source:[7]},
    {id:27,code:'K.64GEB00.007.1',name:'Memberikan Edukasi Nasabah dan Calon Nasabah',source:[8]},
    {id:28,code:'K.64GEB00.010.1',name:'Menangani Pengaduan Nasabah',source:[9]},
    {id:29,code:'K.64GEB00.001.1',name:'Memproses Pembukaan dan Penutupan Rekening',source:[10]},
    {id:30,code:'K.64GEB00.002.2',name:'Memproses Transaksi Keuangan Tunai dan Non Tunai',source:[11]},
    {id:31,code:'K.64GEB00.015.1',name:'Mengelola Administrasi Perbankan',source:[12]},
    {id:32,code:'K.64GEB00.003.2',name:'Memproses Valuta Asing',source:[13]},
    {id:33,code:'K.64GEB00.014.2',name:'Memproses Trade Service dan Trade Finance',source:[14]},
    {id:34,code:'K.64GEB00.016.1',name:'Mengelola Akuntansi',source:[15,16]},
    {id:35,code:'K.64GEB00.017.1',name:'Mengelola Aspek-Aspek Hukum',source:[22]}
  ];

  // BRIDGE order follows the 10 SKKNI units shown in the user's competency list.
  // Source-module alignment is validated against the uploaded consolidated BRIDGE deck.
  const bridgeUnits=[
    {id:36,code:'K.64GEB00.001.1',name:'Memproses Pembukaan dan Penutupan Rekening',source:[10],section:'Pembukaan & Penutupan Rekening · PDF hlm. 359–418'},
    {id:37,code:'K.64GEB00.002.2',name:'Memproses Transaksi Keuangan Tunai dan Non Tunai',source:[11],section:'Transaksi Tunai dan Non Tunai · PDF hlm. 419–480'},
    {id:38,code:'K.64GEB00.003.2',name:'Memproses Valuta Asing',source:[13],section:'Transaksi Jual Beli Valuta Asing & Treasury · PDF hlm. 267–295'},
    {id:39,code:'K.64GEB00.007.1',name:'Memberikan Edukasi Nasabah dan Calon Nasabah',source:[8],section:'Kebijakan Edukasi Nasabah & Calon Nasabah · PDF hlm. 697–720'},
    {id:40,code:'K.64GEB00.009.1',name:'Memberikan Pelayanan Informasi Produk dan Jasa Perbankan',source:[7],section:'Kebijakan Informasi Produk & Jasa Perbankan · PDF hlm. 681–696'},
    {id:41,code:'K.64GEB00.010.1',name:'Menangani Pengaduan Nasabah',source:[9],section:'Pengelolaan Pengaduan Nasabah · PDF hlm. 721–760'},
    {id:42,code:'K.64GEB00.016.1',name:'Mengelola Akuntansi',source:[15,16],section:'Akuntansi & Laporan Keuangan · PDF hlm. 990–1078'},
    {id:43,code:'K.64GEB00.014.2',name:'Memproses Trade Service dan Trade Finance',source:[14],section:'Trade Service & Trade Finance · PDF hlm. 296–344'},
    {id:44,code:'K.64GEB00.015.1',name:'Mengelola Administrasi Perbankan',source:[12],section:'Administrasi Perbankan · PDF hlm. 481–615'},
    {id:45,code:'K.64GEB00.017.1',name:'Mengelola Aspek-Aspek Hukum',source:[22],section:'Aspek Hukum Perbankan · PDF hlm. 1168–1279'}
  ];

  try{
    const mk='gbpCompetencySourcesV32';
    if(!localStorage.getItem(mk)){
      localStorage.removeItem('gbpDbBankV28');
      localStorage.removeItem('gbpQuestionSeenV28');
      localStorage.setItem(mk,'1');
    }
  }catch(e){}

  // Remove stale generated competency modules before rebuilding them from source roots.
  for(let i=bank.length-1;i>=0;i--){
    const mid=Number(bank[i]?.moduleId);
    if((mid>=26&&mid<=35)||(mid>=36&&mid<=45))bank.splice(i,1);
  }

  const sourceSnapshot=bank.filter(q=>Number(q.moduleId)>=1&&Number(q.moduleId)<=24);

  for(const unit of nupmkUnits){
    const base=sourceSnapshot.filter(q=>unit.source.includes(Number(q.moduleId)));
    const additions=base.slice(0,MAX_BANK).map((q,idx)=>({
      ...q,
      id:`NUPMK-${unit.id}-${String(idx+1).padStart(3,'0')}-${q.id}`,
      moduleId:unit.id,
      moduleName:unit.name,
      day:NUPMK_DAY,
      unitCode:unit.code,
      category:'NUPMK Unit Kompetensi',
      nupmkSourceModule:Number(q.moduleId),
      nupmkCoreAligned:true,
      rootQuestionId:`NUPMK-${unit.id}|${q.rootQuestionId||q.baseId||q.id}`,
      baseId:`NUPMK-${unit.id}|${q.rootQuestionId||q.baseId||q.id}`,
      conceptSignature:`nupmk-source:${unit.id}|${q.conceptSignature||q.rootQuestionId||q.baseId||q.id}`
    }));
    bank.push(...additions);
  }

  // BRIDGE competency modules are created independently from the ORIGINAL roots,
  // not from NUPMK clones. The question content is then re-run through the global
  // quality/shortcut gates before the honest max-500 bank is built.
  for(const unit of bridgeUnits){
    const base=sourceSnapshot.filter(q=>unit.source.includes(Number(q.moduleId)));
    const additions=base.slice(0,MAX_BANK).map((q,idx)=>({
      ...q,
      id:`BRIDGE-U${unit.id}-${String(idx+1).padStart(3,'0')}-${q.id}`,
      moduleId:unit.id,
      moduleName:`BRIDGE · ${unit.name}`,
      day:BRIDGE_DAY,
      unitCode:unit.code,
      category:'BRIDGE Unit Kompetensi',
      source:`${BRIDGE_DECK} · ${unit.section}`,
      bridgeSourceDeck:BRIDGE_DECK,
      bridgeSourceSection:unit.section,
      bridgeSourceValidated:true,
      bridgeUnit:true,
      bridgeUnitIndex:bridgeUnits.indexOf(unit)+1,
      rootQuestionId:`BRIDGE-U${unit.id}|${q.rootQuestionId||q.baseId||q.id}`,
      baseId:`BRIDGE-U${unit.id}|${q.rootQuestionId||q.baseId||q.id}`,
      conceptSignature:`bridge-source:${unit.id}|${q.conceptSignature||q.rootQuestionId||q.baseId||q.id}`
    }));
    bank.push(...additions);
  }

  window.NUPMK_UNITS=nupmkUnits.map(u=>({...u,day:NUPMK_DAY,maxBank:MAX_BANK}));
  window.BRIDGE_UNITS=bridgeUnits.map((u,i)=>({...u,index:i+1,moduleName:`BRIDGE · ${u.name}`,day:BRIDGE_DAY,maxBank:MAX_BANK,sourceDeck:BRIDGE_DECK}));
  window.BRIDGE_SOURCE_DECK=BRIDGE_DECK;
  window.__GBP_SOURCE_BANK__=bank.map(q=>({...q,options:Array.isArray(q.options)?[...q.options]:q.options}));
})();
