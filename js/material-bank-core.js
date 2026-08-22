(() => {
  const bank=window.QUESTION_BANK||[];
  if(!Array.isArray(bank)||!bank.length)return;
  const clean=s=>String(s??'').replace(/\s+/g,' ').trim();
  const norm=s=>clean(s).toLocaleLowerCase('id-ID').replace(/[^a-z0-9à-öø-ÿ]+/giu,' ').replace(/\s+/g,' ').trim();
  const hash=str=>{let h=2166136261;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
  const uniq=a=>[...new Set((a||[]).map(clean).filter(Boolean))];
  const shuffle=(a,seed)=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=hash(`${seed}:${i}`)%(i+1);[a[i],a[j]]=[a[j],a[i]]}return a};

  const conceptStop=new Set(`yang dan atau untuk pada dalam dengan dari ke di ini itu tersebut sebuah suatu seorang adalah ialah merupakan sebagai agar serta paling lebih tepat sesuai apa apakah bagaimana mengapa manakah konsep kondisi konteks istilah merujuk mengacu dimaksud berarti memiliki menunjukkan menggambarkan mencerminkan menjelaskan peningkatan penurunan meningkat menurun dicatat mencatat sisi akun saldo normal transaksi nilai dokumen dilakukan melakukan terjadi ketika saat`.split(' '));
  function conceptFingerprint(term,clue){
    const tokens=norm(`${term} ${clue}`).split(' ').filter(t=>t.length>2&&!conceptStop.has(t));
    const key=[...new Set(tokens)].sort();
    if(key.length>=2)return `material-concept:${key.join('|')}`;
    return `material-concept:${norm(term)}|${norm(clue)}`;
  }
  function directQuestion(clue){
    let s=clean(clue).replace(/[.?!:;]+$/,'');
    if(!s)return '';
    return `${s} adalah?`;
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
        const pool=terms.filter(x=>norm(x)!==norm(term));
        const distractors=shuffle(pool,`${mid}:${i}:d`).slice(0,3);
        if(distractors.length<3)return;
        const options=shuffle([term,...distractors],`${mid}:${i}:o`);
        // Material definitions are deliberately asked directly. Avoid vague wrappers
        // such as “Konsep apa yang sesuai dengan kondisi ini” or “merujuk pada apa”.
        const question=customQ||directQuestion(clue);
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
          conceptSignature:conceptFingerprint(term,clue)
        });
      });
    }
    window.__GBP_SOURCE_BANK__=bank.map(q=>({...q,options:Array.isArray(q.options)?[...q.options]:q.options}));
  }
  window.GBPAddMaterialQuestions=add;
})();