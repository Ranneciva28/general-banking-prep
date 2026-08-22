(() => {
  const SOURCE=[...(window.__GBP_SOURCE_BANK__||window.QUESTION_BANK||[])];
  if(!SOURCE.length)return;

  const MAX_STEM=205;
  const clean=s=>String(s??'').replace(/\s+/g,' ').trim();
  const norm=s=>clean(s).toLocaleLowerCase('id-ID').replace(/[^a-z0-9à-öø-ÿ]+/giu,' ').replace(/\s+/g,' ').trim();
  const cap=s=>String(s??'').replace(/^(\s*[^A-Za-zÀ-ÖØ-öø-ÿ]*)([a-zà-öø-ÿ])/u,(_,a,b)=>a+b.toLocaleUpperCase('id-ID'));
  const rootId=q=>String(q?.rootQuestionId||q?.baseId||q?.id||'');
  const banned=/\b(?:pernyataan\s*:|alasan\s*:|sebab\s*[–-]?\s*akibat|pilih pernyataan yang benar|pertanyaan acuan)\b/i;

  function cleanOption(raw){
    return clean(raw)
      .replace(/\s+[—–-]\s+dalam konteks\b.*$/i,'')
      .replace(/\s*\(\s*dalam konteks\b.*\)\s*$/i,'')
      .replace(/\s+[—–-]\s+sesuai konteks\b.*$/i,'')
      .trim();
  }

  function tidy(raw,mode='a'){
    let s=clean(raw)
      .replace(/\bberdasarkan materi,?\s*/gi,'')
      .replace(/\bmenurut materi,?\s*/gi,'')
      .replace(/\s+dalam materi\b/gi,'')
      .replace(/\s+dalam modul\b/gi,'')
      .replace(/\bSebuah bank\b/g,'Bank')
      .replace(/\bSeorang nasabah\b/g,'Nasabah')
      .replace(/\bSeorang calon debitur\b/g,'Calon debitur')
      .replace(/\bSebuah perusahaan\b/g,'Perusahaan')
      .replace(/\bSebuah institusi\b/g,'Institusi')
      .replace(/\bSebuah unit kerja\b/g,'Unit kerja')
      .replace(/\bmayoritas portofolio kreditnya\b/gi,'mayoritas kreditnya')
      .replace(/\bportofolio kredit\b/gi,'kredit')
      .replace(/\bBerdasarkan (?:kondisi|kasus|situasi) tersebut,?\s*/gi,'')
      .replace(/\bDalam (?:kondisi|kasus|situasi) tersebut,?\s*/gi,'')
      .replace(/\buntuk menjelaskan praktik ini\b/gi,'')
      .replace(/\buntuk menjelaskan kondisi ini\b/gi,'')
      .replace(/\s+([,.!?;:])/g,'$1');

    if(mode==='a'){
      s=s.replace(/\byang paling tepat\b/gi,'yang tepat')
        .replace(/\byang paling relevan\b/gi,'yang relevan')
        .replace(/\byang paling dominan\b/gi,'yang dominan');
    }else{
      s=s.replace(/\byang paling tepat\b/gi,'yang paling sesuai')
        .replace(/\byang paling relevan\b/gi,'yang paling sesuai')
        .replace(/\byang paling dominan\b/gi,'yang paling menonjol');
    }

    const rules=mode==='a' ? [
      [/Fungsi intermediasi yang (?:relevan|dominan)(?:\s+untuk[^.?!]+)?\s+adalah\.{2,}$/i,'Fungsi intermediasinya?'],
      [/Transformasi yang tepat adalah\.{2,}$/i,'Transformasinya?'],
      [/Fungsi khusus bank yang tepat adalah\.{2,}$/i,'Fungsi banknya?'],
      [/Prinsip ini (?:paling )?dekat dengan\.{2,}$/i,'Prinsipnya?'],
      [/Posisi bank yang tepat adalah\.{2,}$/i,'Peran banknya?'],
      [/kelompoknya adalah\.{2,}$/i,'Masuk kelompok apa?'],
      [/Pernyataan yang tepat adalah\.{2,}$/i,'Kombinasi yang tepat?'],
      [/Manakah kombinasi kegiatan yang (?:paling )?(?:konsisten|sesuai)[^?]*\?$/i,'Kombinasi kegiatan yang sesuai?'],
      [/Manakah rencana yang (?:paling )?jelas bertentangan dengan karakter kegiatan BPR[^?]*\?$/i,'Rencana mana yang dilarang bagi BPR?'],
      [/Manakah tindakan yang (?:paling )?tepat[^?]*\?$/i,'Tindakan paling tepat?'],
      [/Manakah keputusan yang (?:paling )?tepat[^?]*\?$/i,'Keputusan paling tepat?'],
      [/Manakah produk yang (?:paling )?tepat[^?]*\?$/i,'Produk paling tepat?'],
      [/Manakah risiko yang (?:paling )?(?:utama|relevan)[^?]*\?$/i,'Risiko utama?']
    ] : [
      [/Fungsi intermediasi yang (?:paling sesuai|paling menonjol)(?:\s+untuk[^.?!]+)?\s+adalah\.{2,}$/i,'Apa fungsi intermediasinya?'],
      [/Transformasi yang (?:paling )?sesuai adalah\.{2,}$/i,'Transformasi apa yang terjadi?'],
      [/Fungsi khusus bank yang (?:paling )?sesuai adalah\.{2,}$/i,'Apa fungsi banknya?'],
      [/Prinsip ini (?:paling )?dekat dengan\.{2,}$/i,'Prinsip apa yang berlaku?'],
      [/Posisi bank yang (?:paling )?sesuai adalah\.{2,}$/i,'Apa peran banknya?'],
      [/kelompoknya adalah\.{2,}$/i,'Klasifikasinya?'],
      [/Pernyataan yang (?:paling )?sesuai adalah\.{2,}$/i,'Kombinasi mana yang sesuai?'],
      [/Manakah kombinasi kegiatan yang (?:paling )?(?:konsisten|sesuai)[^?]*\?$/i,'Kombinasi mana yang sesuai?'],
      [/Manakah rencana yang (?:paling )?jelas bertentangan dengan karakter kegiatan BPR[^?]*\?$/i,'Kegiatan apa yang tidak boleh dilakukan BPR?'],
      [/Manakah tindakan yang (?:paling )?(?:tepat|sesuai)[^?]*\?$/i,'Apa tindakan yang tepat?'],
      [/Manakah keputusan yang (?:paling )?(?:tepat|sesuai)[^?]*\?$/i,'Apa keputusan yang tepat?'],
      [/Manakah produk yang (?:paling )?(?:tepat|sesuai)[^?]*\?$/i,'Produk apa yang sesuai?'],
      [/Manakah risiko yang (?:paling )?(?:utama|relevan|sesuai)[^?]*\?$/i,'Apa risiko utamanya?']
    ];
    for(const [r,v] of rules)s=s.replace(r,v);

    s=clean(s)
      .replace(/\s*\.\.\.\?$/,'?')
      .replace(/\s+([,.!?;:])/g,'$1');
    return cap(s);
  }

  function promptStart(s){
    const m=s.match(/\b(?:Apa|Mengapa|Bagaimana|Manakah|Fungsi|Transformasi|Prinsip|Produk|Risiko|Tindakan|Keputusan|Kombinasi|Peran|Klasifikasi|Posisi|Kesimpulan|Rencana)\b[^.!?]{0,125}(?:\?|\.{2,})$/i);
    return m?m.index:-1;
  }

  function wordClip(s,n){
    s=clean(s);if(s.length<=n)return s;
    const x=s.slice(0,n).replace(/\s+\S*$/,'').replace(/[,:;.-]+$/,'').trim();
    return `${x}…`;
  }

  function compact(raw,mode='a'){
    let s=tidy(raw,mode);
    if(s.length<=MAX_STEM)return s;

    const sentences=s.split(/(?<=[.!?])\s+/).filter(Boolean);
    if(sentences.length>1){
      const prompt=sentences.pop();
      let context=clean(sentences.join(' '));
      if(context.length>120){
        const clauses=context.split(/[,;]\s+/).filter(Boolean);
        if(clauses.length>=3)context=clean(`${clauses[0]}, ${clauses.slice(-1)[0]}`);
        if(context.length>120)context=wordClip(context,120);
      }
      const candidate=clean(`${context} ${prompt}`);
      if(candidate.length<=MAX_STEM)return candidate;
      s=candidate;
    }

    const p=promptStart(s);
    if(p>35){
      const prompt=s.slice(p),budget=Math.max(70,MAX_STEM-prompt.length-1);
      return clean(`${wordClip(s.slice(0,p),budget)} ${prompt}`);
    }
    return wordClip(s,MAX_STEM);
  }

  function fallbackAlt(a){
    let s=a;
    const pairs=[
      [/\bFungsi intermediasinya\?$/i,'Apa fungsi intermediasinya?'],
      [/\bTransformasinya\?$/i,'Transformasi apa yang terjadi?'],
      [/\bFungsi banknya\?$/i,'Apa fungsi banknya?'],
      [/\bPrinsipnya\?$/i,'Prinsip apa yang berlaku?'],
      [/\bPeran banknya\?$/i,'Apa peran banknya?'],
      [/\bMasuk kelompok apa\?$/i,'Klasifikasinya?'],
      [/\bKombinasi yang tepat\?$/i,'Kombinasi mana yang sesuai?'],
      [/\bTindakan paling tepat\?$/i,'Apa tindakan yang tepat?'],
      [/\bKeputusan paling tepat\?$/i,'Apa keputusan yang tepat?'],
      [/\bProduk paling tepat\?$/i,'Produk apa yang sesuai?'],
      [/\bRisiko utama\?$/i,'Apa risiko utamanya?']
    ];
    for(const [r,v] of pairs){const x=s.replace(r,v);if(x!==s)return x;}
    if(/^Bank\b/.test(s))return s.replace(/^Bank\b/,'Suatu bank');
    if(/^Nasabah\b/.test(s))return s.replace(/^Nasabah\b/,'Seorang nasabah');
    if(/^Perusahaan\b/.test(s))return s.replace(/^Perusahaan\b/,'Suatu perusahaan');
    if(/^Unit kerja\b/.test(s))return s.replace(/^Unit kerja\b/,'Sebuah unit kerja');
    if(/\byang tepat\b/i.test(s))return s.replace(/\byang tepat\b/i,'yang paling sesuai');
    return s;
  }

  function variant(base,mode){
    if(!base||!Array.isArray(base.options)||base.options.length!==4||banned.test(clean(base.question)))return null;
    const answerIndex=base.options.findIndex(x=>norm(x)===norm(base.answer));
    if(answerIndex<0)return null;
    const options=base.options.map(cleanOption);
    if(new Set(options.map(norm)).size!==4)return null;
    const answer=options[answerIndex];
    let question=compact(base.question,mode);
    if(mode==='b'){
      const a=compact(base.question,'a');
      if(norm(question)===norm(a))question=fallbackAlt(a);
    }
    if(!question||banned.test(question))return null;
    const root=rootId(base);
    return {
      ...base,
      id:`V24-${root}-${mode.toUpperCase()}`,
      question,
      options,
      answer,
      questionType:/\bKECUALI\b/i.test(question)?'Kecuali':(base.skill==='Analisis Kasus'?'Analisis Kasus':'Pilihan Ganda'),
      rootQuestionId:root,
      baseId:root,
      variantMode:`concise-${mode}`,
      conceptSignature:`${root}|concise-${mode}`,
      generated:true,
      qualityVersion:'V24-concise-grounded'
    };
  }

  const out=[];
  for(const base of SOURCE){
    const a=variant(base,'a'),b=variant(base,'b');
    if(a)out.push(a);
    if(b&&(!a||norm(b.question)!==norm(a.question)))out.push(b);
  }

  if(out.length){
    window.__GBP_SOURCE_BANK__=out;
    window.__GBP_QUALITY_BANK_VERSION__='V24-concise-grounded';
  }
})();
