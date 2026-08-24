(() => {
  const bank=window.QUESTION_BANK||[];
  if(!Array.isArray(bank)||!bank.length)return;
  const clean=s=>String(s??'').replace(/\s+/g,' ').trim();
  const norm=s=>clean(s).toLocaleLowerCase('id-ID').replace(/[^a-z0-9à-öø-ÿ]+/giu,' ').replace(/\s+/g,' ').trim();
  const hash=str=>{let h=2166136261;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
  const shuffle=(arr,seed)=>{const a=[...arr];for(let i=a.length-1;i>0;i--){const j=hash(`${seed}:${i}`)%(i+1);[a[i],a[j]]=[a[j],a[i]]}return a};
  const FULL_SOURCE='SERTIFIKASI GB 4 PPT BRIDGE_compressed (2) (1).pdf';
  const MAX_BANK=500;

  const units=[
    {id:36,nupmkId:26,code:'K.64GEB00.009.1',name:'Memberikan Pelayanan Informasi Produk dan Jasa Perbankan',source:'4. Consultative Selling BFLP BRI.pptx · Kebijakan Informasi Produk & Jasa Perbankan'},
    {id:37,nupmkId:27,code:'K.64GEB00.007.1',name:'Memberikan Edukasi Nasabah dan Calon Nasabah',source:'4. Consultative Selling BFLP BRI.pptx · Kebijakan Edukasi Nasabah & Calon Nasabah'},
    {id:38,nupmkId:28,code:'K.64GEB00.010.1',name:'Menangani Pengaduan Nasabah',source:'5. Pengelolaan Pengaduan Nasabah BFLP.pptx'},
    {id:39,nupmkId:29,code:'K.64GEB00.001.1',name:'Memproses Pembukaan dan Penutupan Rekening',source:'3a. Pembukaan dan Penutupan Rekening BFLP BRI.pdf'},
    {id:40,nupmkId:30,code:'K.64GEB00.002.2',name:'Memproses Transaksi Keuangan Tunai dan Non Tunai',source:'3b. Transaksi Keuangan Tunai & Non Tunai BFLP BRI.pptx'},
    {id:41,nupmkId:31,code:'K.64GEB00.015.1',name:'Mengelola Administrasi Perbankan',source:'3c. Administrasi Perbankan BFLP BRI.pptx'},
    {id:42,nupmkId:32,code:'K.64GEB00.003.2',name:'Memproses Valuta Asing',source:'2c. Jasa Layanan Perbankan BFLP BRI.pptx · Transaksi Jual Beli Valuta Asing & Treasury'},
    {id:43,nupmkId:33,code:'K.64GEB00.014.2',name:'Memproses Trade Service dan Trade Finance',source:'2c. Jasa Layanan Perbankan BFLP BRI.pptx · Trade Service & Trade Finance'},
    {id:44,nupmkId:34,code:'K.64GEB00.016.1',name:'Mengelola Akuntansi',source:'Akuntansi Perbankan.pdf'},
    {id:45,nupmkId:35,code:'K.64GEB00.017.1',name:'Mengelola Aspek-Aspek Hukum',source:'11. Aspek Hukum Perbankan BFLP BRI.pptx.pdf'}
  ];

  // Full Version is intentionally capped before V28. Select it round-robin from
  // source sections so 500 slots still represent the whole certification deck.
  function capFullVersion(){
    const rows=bank.filter(q=>Number(q.moduleId)===25);if(rows.length<=MAX_BANK)return;
    const groups=new Map();
    for(const q of rows){const key=clean(q.source||q.category||q.id).replace(/\s*·\s*hal\..*$/i,'');const arr=groups.get(key)||[];arr.push(q);groups.set(key,arr);}
    const queues=[...groups.entries()].map(([key,arr])=>shuffle(arr,`bridge-full:${key}`));
    const chosen=[];let cursor=0;
    while(chosen.length<MAX_BANK&&queues.some(q=>q.length)){
      const q=queues[cursor%queues.length];if(q?.length)chosen.push(q.shift());cursor++;
    }
    for(let i=bank.length-1;i>=0;i--)if(Number(bank[i]?.moduleId)===25)bank.splice(i,1);
    bank.push(...chosen);
  }
  capFullVersion();

  for(const q of bank){
    if(Number(q.moduleId)!==25)continue;
    q.moduleName='BRIDGE Module Full Version';q.category='BRIDGE Module';q.day=7;
    q.source=`${FULL_SOURCE} · Full Version`;q.bridgeFullVersion=true;
  }

  for(const unit of units){
    for(let i=bank.length-1;i>=0;i--)if(Number(bank[i]?.moduleId)===unit.id)bank.splice(i,1);
    const base=bank.filter(q=>Number(q.moduleId)===unit.nupmkId).slice(0,MAX_BANK);
    const additions=base.map((q,idx)=>({
      ...q,
      id:`BRIDGE-U${unit.id}-${String(idx+1).padStart(3,'0')}-${q.id}`,
      moduleId:unit.id,moduleName:`BRIDGE · ${unit.name}`,day:7,unitCode:unit.code,
      category:'BRIDGE Unit Kompetensi',source:unit.source,bridgeSourceDeck:unit.source,
      bridgeUnit:true,bridgeUnitIndex:unit.id-35,bridgeMappedFromNupmk:unit.nupmkId,
      rootQuestionId:`BRIDGE-${unit.id}-${q.rootQuestionId||q.baseId||q.id}`,
      baseId:`BRIDGE-${unit.id}-${q.rootQuestionId||q.baseId||q.id}`,
      conceptSignature:`bridge-u${unit.id}|${q.conceptSignature||q.rootQuestionId||q.baseId||q.id}`
    }));
    bank.push(...additions);
  }

  function family(value){
    const t=clean(value);
    if(/^KBMI\s+\d+/i.test(t))return'kbmi';
    if(/^MT\d{3}$/i.test(t))return'swift-mt';
    if(/^FX\s+/i.test(t)||/\b(?:Spot|Forward|Swap|Today|Tomorrow|Tod|Tom)\b/i.test(t))return'fx';
    if(/\b(?:First|Second|Third) Line(?: of Defense)?\b/i.test(t))return'3lod';
    if(/^Risiko\s+/i.test(t))return'risk';
    if(/^Laporan\s+/i.test(t))return'report';
    if(/^Arus Kas\s+/i.test(t))return'cashflow';
    if(/^Saldo normal\s+/i.test(t))return'normal-balance';
    if(/^(Giro|Tabungan|Deposito|Deposito Berjangka)$/i.test(t))return'funding';
    if(/^(Placement|Layering|Integration)$/i.test(t))return'aml-stage';
    if(/^(CDD|EDD|KYC|Know Your Customer|Customer Due Diligence|Enhanced Due Diligence)$/i.test(t))return'kyc';
    if(/^(Transparansi|Akuntabilitas|Responsibility|Independensi|Fairness)$/i.test(t))return'gcg';
    if(/^(Issuing Bank|Advising Bank|Confirming Bank|Negotiating Bank|Reimbursing Bank)$/i.test(t))return'trade-bank-role';
    if(/^(Applicant|Beneficiary|Importer|Exporter|Importir|Eksportir)$/i.test(t))return'trade-party';
    if(/^(Cek|Bilyet Giro|Nota Debet|DKE|Data Keuangan Elektronik)$/i.test(t))return'payment-instrument';
    if(/^(Aset|Liabilitas|Ekuitas|Pendapatan|Beban)$/i.test(t))return'account-class';
    if(/^(Debit|Kredit)$/i.test(t))return'debit-credit';
    if(/^(Lancar|Dalam Perhatian Khusus|Kurang Lancar|Diragukan|Macet)(?:\s|$)/i.test(t))return'collectibility';
    if(/^POJK\b|^UU\b|^PBI\b|^PADG\b/i.test(t))return'regulation';
    const n=norm(t),first=n.split(' ')[0];if(first&&first.length>=6)return`prefix:${first}`;return'';
  }

  function hardenOptions(mid){
    const rows=bank.filter(q=>Number(q.moduleId)===mid&&Array.isArray(q.options)&&q.options.length===4),groups=new Map();
    for(const q of rows){const f=family(q.answer);if(!f)continue;const arr=groups.get(f)||[];if(!arr.some(x=>norm(x)===norm(q.answer)))arr.push(clean(q.answer));groups.set(f,arr);}
    for(const q of rows){const f=family(q.answer),pool=f?groups.get(f):null;if(!pool||pool.length<4)continue;const candidates=pool.filter(x=>norm(x)!==norm(q.answer)),distractors=shuffle(candidates,`${mid}:${q.id}:bridge-plausible`).slice(0,3);if(distractors.length!==3)continue;q.options=shuffle([clean(q.answer),...distractors],`${mid}:${q.id}:bridge-options`);q.answer=clean(q.answer);q.distractorQuality='same-family-bridge';}
  }
  hardenOptions(25);for(const u of units)hardenOptions(u.id);

  for(let i=bank.length-1;i>=0;i--){const mid=Number(bank[i]?.moduleId);if(mid>=1&&mid<=24)bank.splice(i,1);}

  window.BRIDGE_UNITS=units.map((u,i)=>({...u,index:i+1,moduleName:`BRIDGE · ${u.name}`,day:7,maxBank:MAX_BANK}));
  window.BRIDGE_FULL={id:25,name:'BRIDGE Module Full Version',source:FULL_SOURCE,maxBank:MAX_BANK};
  window.__GBP_SOURCE_BANK__=bank.map(q=>({...q,options:Array.isArray(q.options)?[...q.options]:q.options}));
})();