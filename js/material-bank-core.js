(() => {
  const bank=window.QUESTION_BANK||[];
  if(!Array.isArray(bank)||!bank.length)return;
  const clean=s=>String(s??'').replace(/\s+/g,' ').trim();
  const norm=s=>clean(s).toLocaleLowerCase('id-ID').replace(/[^a-z0-9à-öø-ÿ]+/giu,' ').replace(/\s+/g,' ').trim();
  const hash=str=>{let h=2166136261;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
  const shuffle=(a,seed)=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=hash(`${seed}:${i}`)%(i+1);[a[i],a[j]]=[a[j],a[i]]}return a};

  const conceptStop=new Set(`yang dan atau untuk pada dalam dengan dari ke di ini itu tersebut sebuah suatu seorang adalah ialah merupakan sebagai agar serta paling lebih tepat sesuai apa apakah bagaimana mengapa manakah konsep kondisi konteks istilah merujuk mengacu dimaksud berarti memiliki menunjukkan menggambarkan mencerminkan menjelaskan peningkatan penurunan meningkat menurun dicatat mencatat sisi akun saldo normal transaksi nilai dokumen dilakukan melakukan terjadi ketika saat bank produk jenis kelompok`.split(' '));
  const clueStop=new Set(`yang dan atau untuk pada dalam dengan dari ke di ini itu tersebut sebuah suatu seorang adalah ialah merupakan sebagai agar serta paling lebih tepat sesuai bank nasabah transaksi kegiatan proses dapat digunakan menjadi salah satu sesuai materi`.split(' '));
  function tokens(s){return norm(s).split(' ').filter(t=>t.length>2&&!clueStop.has(t));}
  function jaccard(a,b){const A=new Set(a),B=new Set(b);if(!A.size||!B.size)return 0;let n=0;for(const x of A)if(B.has(x))n++;return n/(A.size+B.size-n);}
  function conceptFingerprint(term,clue){
    const ts=norm(`${term} ${clue}`).split(' ').filter(t=>t.length>2&&!conceptStop.has(t));
    const key=[...new Set(ts)].sort();
    if(key.length>=2)return `material-concept:${key.join('|')}`;
    return `material-concept:${norm(term)}|${norm(clue)}`;
  }
  function stripTail(s){return clean(s).replace(/[.?!:;…]+$/,'');}
  function lowerFirst(s){
    s=clean(s);if(!s)return s;
    if(/^(USD|IDR|EUR|JPY|GBP|SGD|AUD|CNY|FX|KBMI|KPR|KKB|KTA|L\/C|LC|SKBDN|SWIFT|MT\d+|CKPN|RTO|RPO|BIA|BCP|DRP|DRC|CDD|EDD|PEP|OTP|PIN|QRIS)\b/.test(s))return s;
    return s.charAt(0).toLocaleLowerCase('id-ID')+s.slice(1);
  }
  function upperFirst(s){
    s=clean(s);if(!s)return s;
    return s.charAt(0).toLocaleUpperCase('id-ID')+s.slice(1);
  }
  function statement(raw){
    const s=stripTail(raw);
    return s?`${upperFirst(s)}.`:'';
  }

  function serviceInformationQuestion(term,clue,index){
    const raw=stripTail(clue),lead=statement(raw),seed=hash(`${term}|${index}`)%5;
    const tails=[
      'Aspek pelayanan informasi yang dimaksud adalah?',
      'Aspek layanan apa yang paling sesuai?',
      'Hal ini paling tepat menggambarkan aspek pelayanan apa?',
      'Dalam pelayanan informasi produk, aspek yang diuji adalah?',
      'Praktik tersebut berkaitan dengan aspek layanan apa?'
    ];
    if(seed===3)return`Dalam pelayanan informasi produk, ${lowerFirst(raw)}. Aspek yang diuji adalah?`;
    return`${lead} ${tails[seed]}`;
  }

  function naturalQuestion(term,clue,mid,index){
    const t=norm(term),raw=stripTail(clue);
    if(t==='kbmi 1')return'Modal inti sebuah bank tepat Rp6 triliun. Bank tersebut masuk KBMI berapa?';
    if(t==='kbmi 2')return'Modal inti sebuah bank tepat Rp14 triliun. Bank tersebut masuk KBMI berapa?';
    if(t==='kbmi 3')return'Modal inti sebuah bank tepat Rp70 triliun. Bank tersebut masuk KBMI berapa?';
    if(t==='kbmi 4')return'Modal inti sebuah bank Rp70,1 triliun. Bank tersebut masuk KBMI berapa?';

    // Module pelayanan informasi memakai situasi nyata sebagai pembuka. Ini juga
    // terbawa ke NUPMK unit kompetensi yang bersumber dari module 7.
    if(Number(mid)===7)return serviceInformationQuestion(term,clue,index);

    let m=raw.match(/^Jenis bank yang\s+(.+)$/i);if(m)return`Bank yang ${lowerFirst(m[1])} termasuk jenis apa?`;
    m=raw.match(/^Produk dana yang\s+(.+)$/i);if(m)return`Produk dana apa yang ${lowerFirst(m[1])}?`;
    m=raw.match(/^Produk (?:dana )?yang\s+(.+)$/i);if(m)return`Produk apa yang ${lowerFirst(m[1])}?`;
    m=raw.match(/^Jasa bank (?:yang|untuk)\s+(.+)$/i);if(m)return`Jasa bank apa yang ${lowerFirst(m[1])}?`;
    m=raw.match(/^Layanan (?:bank |perbankan )?yang\s+(.+)$/i);if(m)return`Layanan apa yang ${lowerFirst(m[1])}?`;
    m=raw.match(/^Rasio (?:yang|untuk)\s+(.+)$/i);if(m)return`Rasio apa yang ${lowerFirst(m[1])}?`;
    m=raw.match(/^Laporan yang\s+(.+)$/i);if(m)return`Laporan apa yang ${lowerFirst(m[1])}?`;
    m=raw.match(/^Dokumen yang\s+(.+)$/i);if(m)return`Dokumen apa yang ${lowerFirst(m[1])}?`;
    m=raw.match(/^Instrumen yang\s+(.+)$/i);if(m)return`Instrumen apa yang ${lowerFirst(m[1])}?`;
    m=raw.match(/^Pihak yang\s+(.+)$/i);if(m)return`Pihak yang ${lowerFirst(m[1])} disebut apa?`;
    m=raw.match(/^Unsur analisis kredit yang\s+(.+)$/i);if(m)return`Dalam analisis kredit, unsur yang ${lowerFirst(m[1])} adalah?`;
    m=raw.match(/^Risiko (?:akibat|karena|yang)\s+(.+)$/i);if(m)return`Risiko akibat ${lowerFirst(m[1])} disebut apa?`;
    m=raw.match(/^Simpanan yang\s+(.+)$/i);if(m)return`Simpanan yang ${lowerFirst(m[1])} disebut apa?`;
    m=raw.match(/^Bank yang\s+(.+)$/i);if(m)return`Bank yang ${lowerFirst(m[1])} disebut apa?`;

    // Fallback: selalu mulai dari fakta/situasi, bukan dari template pertanyaan.
    // Variasi ekor mencegah satu set terasa seperti hasil copy-paste mesin.
    const lead=statement(raw),variant=hash(`${mid}|${term}|${index}`)%4;
    if(variant===0)return`${lead} Istilah yang sesuai adalah?`;
    if(variant===1)return`${lead} Hal ini dikenal sebagai?`;
    if(variant===2)return`Dalam praktik perbankan, ${lowerFirst(raw)}. Istilah yang dimaksud adalah?`;
    return`${lead} Apa sebutan yang tepat?`;
  }

  function familyKey(term,clue){
    const t=norm(term),c=norm(clue);
    if(/^kbmi\s+\d/.test(t))return'kbmi';
    if(/^agent of\s+/.test(t))return'agent-of';
    if(/^fx\s+/.test(t))return'fx-product';
    if(/^kurs\s+/.test(t))return'kurs';
    if(/^risiko\s+/.test(t))return'risiko';
    if(/^mt\d+/.test(t))return'swift-message';
    if(/^laporan\s+/.test(t))return'laporan';
    if(/^arus kas\s+/.test(t))return'arus-kas';
    if(['character','capacity','capital','collateral','condition'].includes(t))return'5c';
    if(['aset','liabilitas','ekuitas','pendapatan','beban'].includes(t))return'accounting-element';
    if(/\bratio\b|\brasio\b|margin|return on assets|debt to equity/.test(`${t} ${c}`))return'ratio';
    if(/unsur analisis kredit/.test(c))return'5c';
    if(/pesan swift|swift code|kode .*swift/.test(c))return'swift-message';
    if(/bank garansi/.test(c)&&/(bond|guarantee|garansi)/.test(t))return'bank-guarantee';
    if(/kredit konsumtif|pembiayaan rumah|pembiayaan kendaraan|tanpa agunan/.test(c))return'consumer-credit';
    if(/simpanan/.test(c)&&['giro','tabungan','deposito','deposito berjangka'].includes(t))return'funding';
    const words=t.split(' ');
    return words.length>1?`prefix:${words[0]}`:'';
  }
  function distractorScore(base,candidate,seed){
    const bt=norm(base.term),ct=norm(candidate.term);
    const bf=familyKey(base.term,base.clue),cf=familyKey(candidate.term,candidate.clue);
    const bWords=bt.split(' '),cWords=ct.split(' ');
    const clueSimilarity=jaccard(tokens(base.clue),tokens(candidate.clue));
    let score=clueSimilarity*40;
    if(bf&&cf&&bf===cf)score+=100;
    if(bWords[0]&&bWords[0]===cWords[0])score+=18;
    if(bWords.length>1&&cWords.length>1&&bWords.slice(0,2).join(' ')===cWords.slice(0,2).join(' '))score+=24;
    if(/^[A-Z0-9 -]+$/.test(base.term)&&/^[A-Z0-9 -]+$/.test(candidate.term))score+=5;
    score-=Math.abs(base.term.length-candidate.term.length)*.04;
    score+=(hash(`${seed}|${candidate.term}`)%1000)/100000;
    return score;
  }
  function pickDistractors(catalog,index,seed){
    const base=catalog[index];
    return catalog
      .filter((_,i)=>i!==index)
      .map(x=>({term:x.term,score:distractorScore(base,x,seed)}))
      .sort((a,b)=>b.score-a.score||a.term.localeCompare(b.term,'id'))
      .slice(0,3)
      .map(x=>x.term);
  }

  function add(data,sourceMap={}){
    for(const [midRaw,itemsRaw] of Object.entries(data||{})){
      const mid=Number(midRaw),items=(itemsRaw||[]).filter(x=>Array.isArray(x)&&clean(x[0])&&clean(x[1]));
      if(!mid||!items.length)continue;
      const meta=bank.find(q=>Number(q.moduleId)===mid);
      if(!meta)continue;
      const existingIds=new Set(bank.filter(q=>Number(q.moduleId)===mid).map(q=>String(q.id)));
      const catalog=items.map(item=>({term:clean(item[0]),clue:clean(item[1]),customQ:clean(item[2]||''),customExp:clean(item[3]||'')}));
      catalog.forEach((entry,i)=>{
        const {term,clue,customQ,customExp}=entry;
        const id=`MAT-M${String(mid).padStart(2,'0')}-${String(i+1).padStart(3,'0')}`;
        if(existingIds.has(id))return;
        const distractors=pickDistractors(catalog,i,`${mid}:${i}:d`);
        if(distractors.length<3)return;
        const options=shuffle([term,...distractors],`${mid}:${i}:o`);
        const question=customQ||naturalQuestion(term,clue,mid,i);
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
          difficulty:'Challenge',
          skill:i%4===0?'Analisis Kasus':'Konsep',
          generated:false,
          materialGrounded:true,
          rootQuestionId:id,
          baseId:id,
          conceptSignature:conceptFingerprint(term,clue),
          distractorVersion:'same-family-v1',
          wordingVersion:'natural-v2'
        });
      });
    }
    window.__GBP_SOURCE_BANK__=bank.map(q=>({...q,options:Array.isArray(q.options)?[...q.options]:q.options}));
  }
  window.GBPAddMaterialQuestions=add;
})();