(() => {
  const SOURCE=[...(window.__GBP_SOURCE_BANK__||window.QUESTION_BANK||[])];
  if(!SOURCE.length)return;

  const clean=s=>String(s??'').replace(/\s+/g,' ').trim();
  const norm=s=>clean(s).toLocaleLowerCase('id-ID').replace(/[^a-z0-9à-öø-ÿ]+/giu,' ').replace(/\s+/g,' ').trim();
  const cap=s=>String(s??'').replace(/^(\s*[^A-Za-zÀ-ÖØ-öø-ÿ]*)([a-zà-öø-ÿ])/u,(_,a,b)=>a+b.toLocaleUpperCase('id-ID'));
  const rootId=q=>String(q?.rootQuestionId||q?.baseId||q?.id||'');
  const banned=/\b(?:pernyataan\s*:|alasan\s*:|sebab\s*[–-]?\s*akibat|pilih pernyataan yang benar|manakah satu pilihan yang benar|pilih satu pernyataan yang tepat|pertanyaan acuan)\b/i;

  const lowerMidSentenceWords=[
    'Merujuk','Menunjukkan','Menggambarkan','Mencerminkan','Menjelaskan','Mengindikasikan','Mengacu','Menandakan',
    'Termasuk','Merupakan','Adalah','Menjadi','Berkaitan','Berhubungan','Digunakan','Diperlukan','Diterapkan','Dilakukan',
    'Memiliki','Memberikan','Menyebabkan','Menghasilkan','Meningkatkan','Menurunkan','Mengurangi','Mendorong','Memengaruhi',
    'Apa','Apakah','Bagaimana','Mengapa','Manakah','Siapa','Kapan','Di mana'
  ];

  function normalizeBoilerplate(s){
    return clean(s)
      .replace(/\b(?:dalam|pada|untuk)\s+konteks\s+(?:modul|materi)(?:\s+ini)?\s*,?\s*/gi,'')
      .replace(/\b(?:dalam|pada)\s+(?:modul|materi)\s+ini\s*,?\s*/gi,'')
      .replace(/\bberdasarkan\s+(?:konteks\s+)?(?:modul|materi)(?:\s+ini)?\s*,?\s*/gi,'')
      .replace(/\bsesuai\s+(?:dengan\s+)?(?:konteks\s+)?(?:modul|materi)(?:\s+ini)?\s*,?\s*/gi,'')
      .replace(/\bberdasarkan materi,?\s*/gi,'')
      .replace(/\bmenurut materi,?\s*/gi,'')
      .replace(/\s+dalam materi\b/gi,'')
      .replace(/\s+dalam modul\b/gi,'');
  }

  function normalizeEYD(raw){
    let s=clean(raw)
      .replace(/\s+([,.!?;:])/g,'$1')
      .replace(/([,.!?;:])(?=[A-Za-zÀ-ÖØ-öø-ÿ])/g,'$1 ')
      .replace(/\s*,\s*,+/g,', ')
      .replace(/\s*\?\s*\?+/g,'?')
      .replace(/\s*\.\s*\.\s*\.+/g,'…')
      .replace(/\bdi\s+mana\b/gi,'di mana')
      .replace(/\bke\s+mana\b/gi,'ke mana');

    for(const word of lowerMidSentenceWords){
      const escaped=word.replace(/[.*+?^${}()|[\]\\]/g,'\\$&').replace(/\s+/g,'\\s+');
      const re=new RegExp(`([a-zà-öø-ÿ0-9),;:]\\s+)${escaped}\\b`,'giu');
      s=s.replace(re,(m,prefix)=>prefix+word.toLocaleLowerCase('id-ID'));
    }

    // Capitalize only the actual beginning of the question after cleanup.
    return cap(clean(s));
  }

  function cleanOption(raw){
    return normalizeEYD(normalizeBoilerplate(clean(raw)
      .replace(/\s+[—–-]\s+dalam konteks\b.*$/i,'')
      .replace(/\s*\(\s*dalam konteks\b.*\)\s*$/i,'')
      .replace(/\s+[—–-]\s+sesuai konteks\b.*$/i,'')));
  }

  function tidy(raw){
    let s=normalizeBoilerplate(raw)
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
      .replace(/\byang paling tepat\b/gi,'yang tepat')
      .replace(/\byang paling relevan\b/gi,'yang relevan')
      .replace(/\byang paling dominan\b/gi,'yang dominan');

    const rules=[
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
    ];
    for(const [r,v] of rules)s=s.replace(r,v);
    return normalizeEYD(clean(s).replace(/\s*\.\.\.\?$/,'?'));
  }

  function compact(raw){return tidy(raw);}

  const seenRoots=new Set(),seenStems=new Set(),out=[];
  for(const base of SOURCE){
    if(!base||!Array.isArray(base.options)||base.options.length!==4||banned.test(clean(base.question)))continue;
    const root=rootId(base),mid=Number(base.moduleId)||0;
    const rootKey=`${mid}|${root}`;
    if(!root||!mid||seenRoots.has(rootKey))continue;
    const answerIndex=base.options.findIndex(x=>norm(x)===norm(base.answer));if(answerIndex<0)continue;
    const options=base.options.map(cleanOption);if(new Set(options.map(norm)).size!==4)continue;
    const question=compact(base.question),stem=norm(question),stemKey=`${mid}|${stem}`;
    if(!stem||banned.test(question)||seenStems.has(stemKey))continue;
    seenRoots.add(rootKey);seenStems.add(stemKey);
    out.push({...base,id:`V25-M${mid}-${root}`,question,options,answer:options[answerIndex],questionType:/\bKECUALI\b/i.test(question)?'Kecuali':(base.skill==='Analisis Kasus'?'Analisis Kasus':'Pilihan Ganda'),rootQuestionId:root,baseId:root,variantMode:'full-root-eyd',conceptSignature:`m${mid}|root:${root}`,generated:!!base.generated,qualityVersion:'V25-full-stem-eyd'});
  }

  if(out.length){
    window.__GBP_SOURCE_BANK__=out;
    window.__GBP_QUALITY_BANK_VERSION__='V25-full-stem-eyd';
  }
})();