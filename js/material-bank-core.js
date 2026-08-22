(() => {
  const bank=window.QUESTION_BANK||[];
  if(!Array.isArray(bank)||!bank.length)return;
  const clean=s=>String(s??'').replace(/\s+/g,' ').trim();
  const norm=s=>clean(s).toLocaleLowerCase('id-ID').replace(/[^a-z0-9à-öø-ÿ]+/giu,' ').replace(/\s+/g,' ').trim();
  const hash=str=>{let h=2166136261;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
  const uniq=a=>[...new Set((a||[]).map(clean).filter(Boolean))];
  const shuffle=(a,seed)=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=hash(`${seed}:${i}`)%(i+1);[a[i],a[j]]=[a[j],a[i]]}return a};
  const templates=[
    clue=>`${clue} Istilah yang tepat?`,
    clue=>`${clue} Konsep yang tepat?`,
    clue=>`${clue} Apa yang dimaksud?`,
    clue=>`${clue} Merujuk pada apa?`
  ];

  function family(term){
    const t=clean(term),n=norm(term);
    if(/^kbmi\s+\d+/i.test(t))return'kbmi';
    if(/^mt\d{3}$/i.test(t))return'swift-mt';
    if(/^fx\s+/i.test(t)||/\b(?:spot|forward|swap|today|tomorrow)\b/i.test(t))return'fx';
    if(/\b(?:first|second|third) line(?: of defense)?\b/i.test(t))return'3lod';
    if(/^risiko\s+/i.test(t))return'risk';
    if(/^laporan\s+/i.test(t))return'report';
    if(/^arus kas\s+/i.test(t))return'cashflow';
    if(/^saldo normal\s+/i.test(t))return'normal-balance';
    if(/^kredit\s+/i.test(t)||/^kmk\s+/i.test(t)||/\bkredit\b/i.test(t))return'credit';
    if(/^(giro|tabungan|deposito|deposito berjangka)$/i.test(t))return'funding';
    if(/^(transparansi|akuntabilitas|responsibility|independensi|fairness)$/i.test(t))return'gcg';
    if(/^(placement|layering|integration)$/i.test(t))return'aml-stage';
    if(/^(cdd|edd|kyc|know your customer|enhanced due diligence|customer due diligence)$/i.test(t))return'kyc';
    if(/^(apu|ppt|ppspm)$/i.test(t))return'aml-program';
    if(/\b(?:ratio|margin|return on|current ratio|debt to equity|perputaran)\b/i.test(t))return'ratio';
    if(/^bank\s+/i.test(t)||/^(bpr|bank umum)$/i.test(t))return'bank-type';
    if(/^data\s+/i.test(t))return'data';
    if(/^kontrol\s+/i.test(t))return'control';
    if(/^pengaduan\s+/i.test(t))return'complaint';
    if(/^transaksi\s+/i.test(t))return'transaction';
    if(/^dokumen\s+/i.test(t))return'document';
    const first=n.split(' ')[0];
    return first&&first.length>4?`prefix:${first}`:'';
  }

  function chooseDistractors(items,i,term){
    const f=family(term),tn=norm(term),first=tn.split(' ')[0];
    const candidates=[];
    for(let j=0;j<items.length;j++){
      if(j===i)continue;
      const other=clean(items[j]?.[0]);
      if(!other||norm(other)===tn)continue;
      const d=Math.abs(j-i),of=family(other),on=norm(other),ofirst=on.split(' ')[0];
      let score=0;
      if(f&&of===f)score+=120;
      if(first&&first===ofirst)score+=34;
      if(d<=1)score+=42;else if(d===2)score+=30;else if(d===3)score+=22;else if(d<=5)score+=12;else score+=Math.max(0,8-d/4);
      if(on.includes(first)||tn.includes(ofirst))score+=8;
      score+=(hash(`${i}:${j}:${term}`)%1000)/100000;
      candidates.push({term:other,score});
    }
    candidates.sort((a,b)=>b.score-a.score);
    const sameFamily=f?candidates.filter(x=>family(x.term)===f):[];
    const picked=[];
    const take=list=>{for(const x of list){if(picked.length>=3)break;if(!picked.some(p=>norm(p)===norm(x.term)))picked.push(x.term)}};
    if(sameFamily.length>=3)take(sameFamily);
    else{take(sameFamily);take(candidates)}
    return picked.slice(0,3);
  }

  function add(data,sourceMap={}){
    for(const [midRaw,itemsRaw] of Object.entries(data||{})){
      const mid=Number(midRaw),items=(itemsRaw||[]).filter(x=>Array.isArray(x)&&clean(x[0])&&clean(x[1]));
      if(!mid||!items.length)continue;
      const meta=bank.find(q=>Number(q.moduleId)===mid);
      if(!meta)continue;
      const terms=uniq(items.map(x=>x[0]));
      const existingIds=new Set(bank.filter(q=>Number(q.moduleId)===mid).map(q=>String(q.id)));
      items.forEach((item,i)=>{
        const term=clean(item[0]),clue=clean(item[1]),customQ=clean(item[2]||''),customExp=clean(item[3]||'');
        const id=`MAT-M${String(mid).padStart(2,'0')}-${String(i+1).padStart(3,'0')}`;
        if(existingIds.has(id))return;
        let distractors=chooseDistractors(items,i,term);
        if(distractors.length<3){
          const fallback=terms.filter(x=>norm(x)!==norm(term)&&!distractors.some(d=>norm(d)===norm(x)));
          distractors=[...distractors,...shuffle(fallback,`${mid}:${i}:fallback`).slice(0,3-distractors.length)];
        }
        if(distractors.length<3)return;
        const options=shuffle([term,...distractors],`${mid}:${i}:o`);
        const question=customQ||templates[i%templates.length](clue);
        bank.push({
          id,
          day:Number(meta.day)||1,
          moduleId:mid,
          moduleName:meta.moduleName,
          question,
          options,
          answer:term,
          explanation:customExp||`${term}: ${clue}.`,
          source:sourceMap[mid]||`Materi General Banking · ${meta.moduleName}`,
          difficulty:i%7===0?'Challenge':i%3===0?'Sulit':'Sedang-Sulit',
          skill:i%4===0?'Analisis Kasus':'Konsep',
          generated:false,
          materialGrounded:true,
          rootQuestionId:id,
          baseId:id,
          conceptSignature:`material-root:${id}`
        });
      });
    }
    window.__GBP_SOURCE_BANK__=bank.map(q=>({...q,options:Array.isArray(q.options)?[...q.options]:q.options}));
  }
  window.GBPAddMaterialQuestions=add;
})();