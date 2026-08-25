(() => {
  const bank=window.QUESTION_BANK||[];
  if(!Array.isArray(bank)||!bank.length)return;

  const SOURCE_DECK='SERTIFIKASI GB 4 PPT BRIDGE_compressed (2) (1).pdf';
  const DAY=7;
  const MAX_BANK=500;
  const units=[
    {id:36,code:'K.64GEB00.001.1',name:'Memproses Pembukaan dan Penutupan Rekening',sourceModules:[10],section:'Pembukaan & Penutupan Rekening · PDF hlm. 359–418'},
    {id:37,code:'K.64GEB00.002.2',name:'Memproses Transaksi Keuangan Tunai dan Non Tunai',sourceModules:[11],section:'Transaksi Tunai dan Non Tunai · PDF hlm. 419–480'},
    {id:38,code:'K.64GEB00.003.2',name:'Memproses Valuta Asing',sourceModules:[13],section:'Transaksi Jual Beli Valuta Asing & Treasury · PDF hlm. 267–295'},
    {id:39,code:'K.64GEB00.007.1',name:'Memberikan Edukasi Nasabah dan Calon Nasabah',sourceModules:[8],section:'Kebijakan Edukasi Nasabah & Calon Nasabah · PDF hlm. 697–720'},
    {id:40,code:'K.64GEB00.009.1',name:'Memberikan Pelayanan Informasi Produk dan Jasa Perbankan',sourceModules:[7],section:'Kebijakan Informasi Produk & Jasa Perbankan · PDF hlm. 681–696'},
    {id:41,code:'K.64GEB00.010.1',name:'Menangani Pengaduan Nasabah',sourceModules:[9],section:'Pengelolaan Pengaduan Nasabah · PDF hlm. 721–760'},
    {id:42,code:'K.64GEB00.016.1',name:'Mengelola Akuntansi',sourceModules:[15,16],section:'Akuntansi & Laporan Keuangan · PDF hlm. 990–1078'},
    {id:43,code:'K.64GEB00.014.2',name:'Memproses Trade Service dan Trade Finance',sourceModules:[14],section:'Trade Service & Trade Finance · PDF hlm. 296–344'},
    {id:44,code:'K.64GEB00.015.1',name:'Mengelola Administrasi Perbankan',sourceModules:[12],section:'Administrasi Perbankan · PDF hlm. 481–615'},
    {id:45,code:'K.64GEB00.017.1',name:'Mengelola Aspek-Aspek Hukum',sourceModules:[22],section:'Aspek Hukum Perbankan · PDF hlm. 1168–1279'}
  ];

  const clean=s=>String(s??'').replace(/\s+/g,' ').trim();
  const norm=s=>clean(s).toLocaleLowerCase('id-ID').replace(/[^a-z0-9à-öø-ÿ]+/giu,' ').replace(/\s+/g,' ').trim();

  // Build from the ORIGINAL aligned source modules. This intentionally does not
  // clone the NUPMK runtime modules. The uploaded BRIDGE deck contains these same
  // competency sections, and each copied root is tagged back to the deck section.
  const sourceSnapshot=bank.filter(q=>Number(q.moduleId)>=1&&Number(q.moduleId)<=24);
  for(const unit of units){
    for(let i=bank.length-1;i>=0;i--)if(Number(bank[i]?.moduleId)===unit.id)bank.splice(i,1);
    const seenRoots=new Set();
    const additions=[];
    const candidates=sourceSnapshot.filter(q=>unit.sourceModules.includes(Number(q.moduleId)));
    for(const q of candidates){
      const root=String(q.rootQuestionId||q.baseId||q.id||'');
      const rk=norm(root);if(!rk||seenRoots.has(rk))continue;seenRoots.add(rk);
      additions.push({
        ...q,
        id:`BRIDGE-U${unit.id}-${String(additions.length+1).padStart(3,'0')}-${q.id}`,
        moduleId:unit.id,
        moduleName:`BRIDGE · ${unit.name}`,
        day:DAY,
        category:'BRIDGE Unit Kompetensi',
        unitCode:unit.code,
        source:`${SOURCE_DECK} · ${unit.section}`,
        bridgeSourceDeck:SOURCE_DECK,
        bridgeSourceSection:unit.section,
        bridgeSourceValidated:true,
        bridgeUnit:true,
        bridgeUnitIndex:units.indexOf(unit)+1,
        rootQuestionId:`BRIDGE-U${unit.id}|${root}`,
        baseId:`BRIDGE-U${unit.id}|${root}`,
        conceptSignature:`bridge-source:${unit.id}|${q.conceptSignature||root}`
      });
      if(additions.length>=MAX_BANK)break;
    }
    bank.push(...additions);
  }

  window.BRIDGE_UNITS=units.map((u,i)=>({...u,index:i+1,moduleName:`BRIDGE · ${u.name}`,day:DAY,maxBank:MAX_BANK,sourceDeck:SOURCE_DECK}));
  window.BRIDGE_SOURCE_DECK=SOURCE_DECK;
  window.__GBP_SOURCE_BANK__=bank.map(q=>({...q,options:Array.isArray(q.options)?[...q.options]:q.options}));
})();
