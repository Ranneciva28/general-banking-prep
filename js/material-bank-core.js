(() => {
  const bank=window.QUESTION_BANK||[];
  if(!Array.isArray(bank)||!bank.length)return;
  const clean=s=>String(s??'').replace(/\s+/g,' ').trim();
  const norm=s=>clean(s).toLocaleLowerCase('id-ID').replace(/[^a-z0-9à-öø-ÿ]+/giu,' ').replace(/\s+/g,' ').trim();
  const hash=str=>{let h=2166136261;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
  const shuffle=(a,seed)=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=hash(`${seed}:${i}`)%(i+1);[a[i],a[j]]=[a[j],a[i]]}return a};

  const conceptStop=new Set(`yang dan atau untuk pada dalam dengan dari ke di ini itu tersebut sebuah suatu seorang adalah ialah merupakan sebagai agar serta paling lebih tepat sesuai apa apakah bagaimana mengapa manakah konsep kondisi konteks istilah merujuk mengacu dimaksud berarti memiliki menunjukkan menggambarkan mencerminkan menjelaskan peningkatan penurunan meningkat menurun dicatat mencatat sisi akun saldo normal transaksi nilai dokumen dilakukan melakukan terjadi ketika saat bank produk jenis kelompok`.split(' '));
  const clueStop=new Set(`yang dan atau untuk pada dalam dengan dari ke di ini itu tersebut sebuah suatu seorang adalah ialah merupakan sebagai agar serta paling lebih tepat sesuai bank nasabah transaksi kegiatan proses dapat digunakan menjadi salah satu materi`.split(' '));
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
    if(/^(USD|IDR|EUR|JPY|GBP|SGD|AUD|CNY|FX|KBMI|KPR|KKB|KTA|L\/C|LC|SKBDN|SWIFT|MT\d+|CKPN|RTO|RPO|BIA|BCP|DRP|DRC|CDD|EDD|PEP|OTP|PIN|QRIS|AML|KYC|CIF|RTGS|BI-RTGS)\b/.test(s))return s;
    return s.charAt(0).toLocaleLowerCase('id-ID')+s.slice(1);
  }
  function upperFirst(s){s=clean(s);return s?s.charAt(0).toLocaleUpperCase('id-ID')+s.slice(1):s;}
  function statement(raw){const s=stripTail(raw);return s?`${upperFirst(s)}.`:'';}

  const genericTails=[
    {family:'identify',text:'Konsep operasional yang dijelaskan adalah?'},
    {family:'practice',text:'Praktik tersebut merupakan penerapan dari?'},
    {family:'aspect',text:'Aspek yang diuji pada situasi tersebut adalah?'},
    {family:'recognize',text:'Situasi tersebut menggambarkan konsep apa?'},
    {family:'term',text:'Istilah yang digunakan untuk kondisi tersebut adalah?'},
    {family:'principle',text:'Prinsip yang diterapkan pada situasi tersebut adalah?'},
    {family:'classification',text:'Kondisi tersebut masuk ke kategori apa?'},
    {family:'purpose',text:'Tujuan operasional yang dijelaskan berkaitan dengan apa?'}
  ];

  function clueKind(raw){
    const s=norm(raw);
    if(/^(dokumen|formulir|surat|laporan|instrumen|warkat|rekening|produk|layanan|jasa)\b/.test(s))return'noun';
    if(/^(petugas|bank|nasabah|debitur|perusahaan|unit|penyelenggara|peserta|eksportir|importir|kontraktor)\b/.test(s))return'scenario';
    if(/\b(?:wajib|harus|tidak boleh|perlu|memastikan|memeriksa|memverifikasi|mencatat|menyimpan|menjaga)\b/.test(s))return'control';
    if(/\b(?:digunakan untuk|berfungsi untuk|bertujuan|agar|untuk membantu|untuk memastikan)\b/.test(s))return'purpose';
    if(/\b(?:sebelum|setelah|kemudian|tahap|langkah|proses|alur)\b/.test(s))return'process';
    return'concept';
  }

  function processQuestion(raw,seed){
    const s=stripTail(raw);
    if(/^tahap\b/i.test(s))return{family:'process-name',question:`${upperFirst(s)} merupakan proses yang dinamakan?`};
    const forms=[
      {family:'process-name',question:`${upperFirst(s)}. Tahap tersebut merupakan proses yang dinamakan?`},
      {family:'process-stage',question:`Dalam alur proses, ${lowerFirst(s)}. Nama tahap ini adalah?`},
      {family:'process-sequence',question:`${upperFirst(s)}. Tahap proses yang terjadi pada kondisi tersebut disebut?`}
    ];
    return forms[(seed>>>6)%forms.length];
  }

  function naturalQuestion(term,clue,mid,index){
    const t=norm(term),raw=stripTail(clue),lead=statement(raw),kind=clueKind(raw),seed=hash(`${mid}|${term}|${index}`);
    if(t==='kbmi 1')return{question:'Modal inti sebuah bank tepat Rp6 triliun. Bank tersebut masuk KBMI berapa?',family:'boundary'};
    if(t==='kbmi 2')return{question:'Modal inti sebuah bank tepat Rp14 triliun. Bank tersebut masuk KBMI berapa?',family:'boundary'};
    if(t==='kbmi 3')return{question:'Modal inti sebuah bank tepat Rp70 triliun. Bank tersebut masuk KBMI berapa?',family:'boundary'};
    if(t==='kbmi 4')return{question:'Modal inti sebuah bank Rp70,1 triliun. Bank tersebut masuk KBMI berapa?',family:'boundary'};

    let m=raw.match(/^Jenis bank yang\s+(.+)$/i);if(m)return{question:`Bank yang ${lowerFirst(m[1])} termasuk jenis apa?`,family:'direct-type'};
    m=raw.match(/^Produk dana yang\s+(.+)$/i);if(m)return{question:`Produk dana apa yang ${lowerFirst(m[1])}?`,family:'direct-product'};
    m=raw.match(/^Produk (?:dana )?yang\s+(.+)$/i);if(m)return{question:`Produk apa yang ${lowerFirst(m[1])}?`,family:'direct-product'};
    m=raw.match(/^Jasa bank (?:yang|untuk)\s+(.+)$/i);if(m)return{question:`Jasa bank apa yang ${lowerFirst(m[1])}?`,family:'direct-service'};
    m=raw.match(/^Layanan (?:bank |perbankan )?yang\s+(.+)$/i);if(m)return{question:`Layanan apa yang ${lowerFirst(m[1])}?`,family:'direct-service'};
    m=raw.match(/^Rasio (?:yang|untuk)\s+(.+)$/i);if(m)return{question:`Rasio apa yang ${lowerFirst(m[1])}?`,family:'direct-ratio'};
    m=raw.match(/^Laporan yang\s+(.+)$/i);if(m)return{question:`Laporan apa yang ${lowerFirst(m[1])}?`,family:'direct-report'};
    m=raw.match(/^Dokumen yang\s+(.+)$/i);if(m)return{question:`Dokumen apa yang ${lowerFirst(m[1])}?`,family:'direct-document'};
    m=raw.match(/^Instrumen yang\s+(.+)$/i);if(m)return{question:`Instrumen apa yang ${lowerFirst(m[1])}?`,family:'direct-instrument'};
    m=raw.match(/^Pihak yang\s+(.+)$/i);if(m)return{question:`Pihak yang ${lowerFirst(m[1])} disebut apa?`,family:'direct-party'};
    m=raw.match(/^Unsur analisis kredit yang\s+(.+)$/i);if(m)return{question:`Dalam analisis kredit, unsur yang ${lowerFirst(m[1])} adalah?`,family:'direct-credit'};
    m=raw.match(/^Risiko (?:akibat|karena|yang)\s+(.+)$/i);if(m)return{question:`Risiko akibat ${lowerFirst(m[1])} disebut apa?`,family:'direct-risk'};
    m=raw.match(/^Simpanan yang\s+(.+)$/i);if(m)return{question:`Simpanan yang ${lowerFirst(m[1])} disebut apa?`,family:'direct-funding'};

    const variants=genericTails,pick=variants[seed%variants.length];
    if(kind==='process')return processQuestion(raw,seed);
    if(kind==='scenario'){
      const scenarioForms=[
        {family:'scenario-action',question:`${lead} ${pick.text}`},
        {family:'scenario-context',question:`Dalam praktik perbankan, ${lowerFirst(raw)}. ${variants[(seed+3)%variants.length].text}`},
        {family:'scenario-read',question:`Perhatikan situasi berikut: ${lowerFirst(raw)}. ${variants[(seed+5)%variants.length].text}`}
      ];
      return scenarioForms[(seed>>>3)%scenarioForms.length];
    }
    if(kind==='control'){
      const forms=[
        {family:'control-why',question:`${lead} Kontrol atau prinsip yang diterapkan adalah?`},
        {family:'control-aspect',question:`${lead} Aspek pengendalian yang diuji adalah?`},
        {family:'control-practice',question:`Dalam proses tersebut, ${lowerFirst(raw)}. Praktik pengendalian yang diterapkan adalah?`}
      ];
      return forms[(seed>>>4)%forms.length];
    }
    if(kind==='purpose'){
      const forms=[
        {family:'purpose-direct',question:`${lead} Tujuan utamanya adalah?`},
        {family:'purpose-concept',question:`${lead} Konsep yang mendasari tujuan tersebut adalah?`},
        {family:'purpose-use',question:`Dalam praktiknya, ${lowerFirst(raw)}. Tujuan tindakan tersebut adalah?`}
      ];
      return forms[(seed>>>5)%forms.length];
    }
    if(kind==='noun'){
      const nounForms=[
        {family:'noun-identify',question:`${lead} Istilah yang dimaksud adalah?`},
        {family:'noun-use',question:`${lead} Jenis yang sesuai dengan karakteristik tersebut adalah?`},
        {family:'noun-classify',question:`${lead} Bentuk layanan atau instrumen tersebut disebut?`}
      ];
      return nounForms[(seed>>>7)%nounForms.length];
    }
    return{family:pick.family,question:`${lead} ${pick.text}`};
  }

  function familyKey(term,clue){
    const t=norm(term),c=norm(clue),all=`${t} ${c}`;
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
    if(['transparansi','akuntabilitas','pelindungan konsumen'].includes(t))return'service-principle';
    if(['cif','kyc','verifikasi identitas','kelengkapan dokumen','akurasi input sistem','otorisasi pejabat'].includes(t))return'onboarding-control';
    if(['dhn','cek kosong','bilyet giro kosong'].includes(t)||/cek.*bg.*kosong|daftar hitam nasional/.test(all))return'giro-sanction';
    if(/^penutupan\b/.test(t)||/rekening .*ditutup|menutup rekening|permohonan penutupan|pencairan deposito/.test(c))return'account-closure';
    if(/^pembukaan rekening\b/.test(t)||/membuka rekening|rekening .*dibuka/.test(c))return'account-opening';
    if(/\bratio\b|\brasio\b|margin|return on assets|debt to equity/.test(all))return'ratio';
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
  const optionSetKey=values=>(values||[]).map(norm).filter(Boolean).sort().join('|');
  function pickDistractors(catalog,index,seed,usedSets){
    const base=catalog[index],bf=familyKey(base.term,base.clue);
    const ranked=catalog.filter((_,i)=>i!==index).map(x=>({term:x.term,family:familyKey(x.term,x.clue),score:distractorScore(base,x,seed)})).sort((a,b)=>b.score-a.score||a.term.localeCompare(b.term,'id'));
    const same=ranked.filter(x=>bf&&x.family===bf);
    const preferred=same.length>=3?same.slice(0,6):[];
    const fallback=ranked.filter(x=>!preferred.some(p=>norm(p.term)===norm(x.term))).slice(0,6);
    const pool=[...preferred,...fallback].slice(0,10);
    const combos=[];
    for(let a=0;a<pool.length-2;a++)for(let b=a+1;b<pool.length-1;b++)for(let c=b+1;c<pool.length;c++){
      const trio=[pool[a],pool[b],pool[c]],sameCount=trio.filter(x=>bf&&x.family===bf).length;
      if(same.length>=3&&sameCount<2)continue;
      const score=trio.reduce((n,x)=>n+x.score,0)+sameCount*22+(hash(`${seed}|${trio.map(x=>x.term).join('|')}`)%1000)/100000;
      combos.push({trio,score,key:optionSetKey([base.term,...trio.map(x=>x.term)])});
    }
    combos.sort((a,b)=>b.score-a.score);
    const fresh=combos.find(x=>!usedSets?.has(x.key));
    if(fresh)return fresh.trio.map(x=>x.term);
    const best=combos[0];if(best)return best.trio.map(x=>x.term);
    return ranked.slice(0,3).map(x=>x.term);
  }

  function add(data,sourceMap={}){
    for(const [midRaw,itemsRaw] of Object.entries(data||{})){
      const mid=Number(midRaw),items=(itemsRaw||[]).filter(x=>Array.isArray(x)&&clean(x[0])&&clean(x[1]));
      if(!mid||!items.length)continue;
      const meta=bank.find(q=>Number(q.moduleId)===mid);if(!meta)continue;
      const existing=bank.filter(q=>Number(q.moduleId)===mid),existingIds=new Set(existing.map(q=>String(q.id))),usedOptionSets=new Set(existing.map(q=>optionSetKey(q.options)).filter(Boolean));
      const catalog=items.map(item=>({term:clean(item[0]),clue:clean(item[1]),customQ:clean(item[2]||''),customExp:clean(item[3]||'')}));
      catalog.forEach((entry,i)=>{
        const {term,clue,customQ,customExp}=entry,id=`MAT-M${String(mid).padStart(2,'0')}-${String(i+1).padStart(3,'0')}`;
        if(existingIds.has(id))return;
        const distractors=pickDistractors(catalog,i,`${mid}:${i}:d`,usedOptionSets);if(distractors.length<3)return;
        const options=shuffle([term,...distractors],`${mid}:${i}:o`),setKey=optionSetKey(options),wording=customQ?{question:customQ,family:'custom'}:naturalQuestion(term,clue,mid,i);
        usedOptionSets.add(setKey);
        bank.push({id,day:Number(meta.day)||1,moduleId:mid,moduleName:meta.moduleName,question:wording.question,options,answer:term,explanation:customExp||`${term}: ${clue}.`,source:sourceMap[mid]||`Materi General Banking · ${meta.moduleName}`,difficulty:'Challenge',skill:i%4===0?'Analisis Kasus':'Konsep',generated:false,materialGrounded:true,rootQuestionId:id,baseId:id,conceptSignature:conceptFingerprint(term,clue),distractorVersion:'same-family-v2-unique-set',optionSetSignature:setKey,wordingVersion:'natural-v4-explicit',wordingFamily:wording.family});
      });
    }
    window.__GBP_SOURCE_BANK__=bank.map(q=>({...q,options:Array.isArray(q.options)?[...q.options]:q.options}));
  }
  window.GBPAddMaterialQuestions=add;
})();