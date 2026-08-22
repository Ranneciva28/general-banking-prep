(() => {
  const bank=window.QUESTION_BANK||[];
  if(!Array.isArray(bank))return;
  const clean=s=>String(s??'').replace(/\s+/g,' ').trim();
  const norm=s=>clean(s).toLocaleLowerCase('id-ID').replace(/[^a-z0-9à-öø-ÿ]+/giu,' ').replace(/\s+/g,' ').trim();
  const hash=str=>{let h=2166136261;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
  const shuffle=(a,seed)=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=hash(`${seed}:${i}`)%(i+1);[a[i],a[j]]=[a[j],a[i]]}return a};
  const ACTIVE_IDS=new Set(Array.from({length:11},(_,i)=>25+i));

  function family(term){
    const t=clean(term);
    if(/^KBMI\s+\d+/i.test(t))return'kbmi';
    if(/^MT\d{3}$/i.test(t))return'swift-mt';
    if(/^FX\s+/i.test(t)||/\b(?:Spot|Forward|Swap|Today|Tomorrow)\b/i.test(t))return'fx';
    if(/\b(?:First|Second|Third) Line(?: of Defense)?\b/i.test(t))return'3lod';
    if(/^Risiko\s+/i.test(t))return'risk';
    if(/^Laporan\s+/i.test(t))return'report';
    if(/^Arus Kas\s+/i.test(t))return'cashflow';
    if(/^Saldo normal\s+/i.test(t))return'normal-balance';
    if(/^Kredit\s+/i.test(t)||/^KMK\s+/i.test(t))return'credit';
    if(/^(Giro|Tabungan|Deposito|Deposito berjangka)$/i.test(t))return'funding';
    if(/^(Transparansi|Akuntabilitas|Responsibility|Independensi|Fairness)$/i.test(t))return'gcg';
    if(/^(Placement|Layering|Integration)$/i.test(t))return'aml-stage';
    if(/^(CDD|EDD|KYC|Know Your Customer|Enhanced Due Diligence|Customer Due Diligence)$/i.test(t))return'kyc';
    if(/^(APU|PPT|PPSPM)$/i.test(t))return'aml-program';
    if(/^(Lancar 1%|DPK 5%|Kurang Lancar 15%|Diragukan 50%|Macet 100%)$/i.test(t))return'asset-quality';
    if(/^(Aset|Liabilitas|Ekuitas|Pendapatan|Beban)$/i.test(t))return'account-class';
    if(/^(Debit|Kredit)$/i.test(t))return'debit-credit';
    if(/^(Front Office|Back Office|Middle Office)$/i.test(t))return'office-role';
    return'';
  }

  function tightenOptions(rows){
    const groups=new Map();
    for(const q of rows){
      const f=family(q.answer);if(!f)continue;
      if(!groups.has(f))groups.set(f,[]);
      const arr=groups.get(f);if(!arr.some(x=>norm(x)===norm(q.answer)))arr.push(clean(q.answer));
    }
    for(const q of rows){
      const f=family(q.answer),pool=f?groups.get(f):null;
      if(!pool||pool.length<4)continue;
      const distractors=pool.filter(x=>norm(x)!==norm(q.answer));
      const chosen=shuffle(distractors,`${q.moduleId}:${q.id}:plausible`).slice(0,3);
      if(chosen.length!==3)continue;
      q.options=shuffle([clean(q.answer),...chosen],`${q.id}:options`);
      q.answer=clean(q.answer);
      q.distractorQuality='same-family';
    }
  }

  const lite=bank.filter(q=>ACTIVE_IDS.has(Number(q.moduleId)));
  for(const mid of ACTIVE_IDS)tightenOptions(lite.filter(q=>Number(q.moduleId)===mid));
  bank.splice(0,bank.length,...lite);

  const source=(window.__GBP_SOURCE_BANK__||[]).filter(q=>ACTIVE_IDS.has(Number(q.moduleId))).map(q=>({...q,options:Array.isArray(q.options)?[...q.options]:q.options}));
  for(const mid of ACTIVE_IDS)tightenOptions(source.filter(q=>Number(q.moduleId)===mid));
  window.__GBP_SOURCE_BANK__=source;
  window.GBP_LITE_MODE={enabled:true,moduleIds:[...ACTIVE_IDS],bankSlots:3000,activeQuestions:25,categories:['bridge','nupmk']};
})();