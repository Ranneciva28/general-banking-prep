(() => {
  const bank=window.QUESTION_BANK||[];
  if(!Array.isArray(bank)||!bank.length)return;
  const clean=s=>String(s??'').replace(/\s+/g,' ').trim();
  const norm=s=>clean(s).toLocaleLowerCase('id-ID').replace(/[^a-z0-9à-öø-ÿ]+/giu,' ').replace(/\s+/g,' ').trim();
  const hash=str=>{let h=2166136261;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
  const uniq=a=>[...new Set((a||[]).map(clean).filter(Boolean))];
  const shuffle=(a,seed)=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=hash(`${seed}:${i}`)%(i+1);[a[i],a[j]]=[a[j],a[i]]}return a};
  const templates=[
    clue=>`${clue}. Istilah yang tepat?`,
    clue=>`${clue}. Konsep yang tepat?`,
    clue=>`${clue}. Apa yang dimaksud?`,
    clue=>`${clue}. Merujuk pada apa?`
  ];

  function tokens(s){return norm(s).split(' ').filter(Boolean)}
  function similarity(answer,candidate){
    const a=tokens(answer),b=tokens(candidate);if(!a.length||!b.length)return -99;
    let score=0;
    if(a[0]===b[0])score+=12;
    if(a.length>1&&b.length>1&&a[1]===b[1])score+=6;
    const A=new Set(a),B=new Set(b);let common=0;for(const x of A)if(B.has(x))common++;
    score+=common*3;
    const numsA=(answer.match(/\d+/g)||[]),numsB=(candidate.match(/\d+/g)||[]);
    if(numsA.length&&numsB.length)score+=5;
    if(/^([A-Z]{2,}|[A-Z]+\d+)/.test(answer)&&/^([A-Z]{2,}|[A-Z]+\d+)/.test(candidate))score+=3;
    const ratio=Math.min(answer.length,candidate.length)/Math.max(answer.length,candidate.length);score+=ratio*2;
    return score;
  }
  function distractorsFor(term,terms,seed){
    const ranked=terms.filter(x=>norm(x)!==norm(term)).map((x,i)=>({x,s:similarity(term,x),t:hash(`${seed}:${i}:${x}`)})).sort((a,b)=>b.s-a.s||a.t-b.t).map(x=>x.x);
    return uniq(ranked).slice(0,3);
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
        const distractors=distractorsFor(term,terms,`${mid}:${i}:d`);
        if(distractors.length<3)return;
        const options=shuffle([term,...distractors],`${mid}:${i}:o`);
        const question=(customQ||templates[i%templates.length](clue)).replace(/^Dalam konteks modul ini,\s*/i,'');
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