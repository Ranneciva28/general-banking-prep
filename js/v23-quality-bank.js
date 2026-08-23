(() => {
  const SOURCE=[...(window.__GBP_SOURCE_BANK__||window.QUESTION_BANK||[])];
  if(!SOURCE.length)return;

  const MAX_STEM=320;
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
    return cap(clean(s));
  }

  function cleanOption(raw){
    return normalizeEYD(normalizeBoilerplate(clean(raw)
      .replace(/\s+[—–-]\s+dalam konteks\b.*$/i,'')
      .replace(/\s*\(\s*dalam konteks\b.*\)\s*$/i,'')
      .replace(/\s+[—–-]\s+sesuai konteks\b.*$/i,'')));
  }

  // Anti-answer-leak rule, applied to every module before the V28 bank is built.
  // When all four choices are parallel taxonomy labels followed by explanations,
  // keep only the labels. The explanation belongs in the stem/review, not inside
  // a choice where it can mirror the clue and reveal the answer.
  function parseOptionLabel(raw){
    const s=cleanOption(raw);
    let m=s.match(/^(.{2,48}?)(?:\s*:\s+|\s+[—–-]\s+)(.{6,})$/u);
    if(!m)m=s.match(/^(.{2,48}?)\s*\((.{8,})\)\s*$/u);
    if(!m)return null;
    const label=clean(m[1]),detail=clean(m[2]);
    const words=label.split(/\s+/).filter(Boolean).length;
    if(!label||!detail||words>6||label.length>48||/[.!?;]/.test(label))return null;
    return{label:normalizeEYD(label),detail};
  }
  function simplifyOptionSet(rawOptions){
    const cleaned=rawOptions.map(cleanOption);
    const parsed=cleaned.map(parseOptionLabel);
    if(parsed.some(x=>!x))return cleaned;
    const labels=parsed.map(x=>x.label),labelNorm=labels.map(norm);
    if(new Set(labelNorm).size!==4)return cleaned;
    const avgLabel=labels.reduce((n,x)=>n+x.length,0)/labels.length;
    const avgDetail=parsed.reduce((n,x)=>n+x.detail.length,0)/parsed.length;
    const conciseLabels=labels.every(x=>x.length<=42&&x.split(/\s+/).length<=6);
    if(!conciseLabels||avgDetail<Math.max(10,avgLabel*.65))return cleaned;
    return labels;
  }

  function naturalizeQuestion(raw){
    return clean(raw)
      .replace(/^Berdasarkan (?:informasi|data|kondisi|kasus|situasi) (?:di atas|tersebut),?\s*/i,'')
      .replace(/^Dengan memperhatikan (?:informasi|data|kondisi|kasus|situasi) (?:di atas|tersebut),?\s*/i,'')
      .replace(/^Dalam hal ini,?\s*/i,'')
      .replace(/^Pada kondisi ini,?\s*/i,'')
      .replace(/\buntuk dapat menjelaskan\b/gi,'untuk menjelaskan')
      .replace(/\bperlu untuk dilakukan\b/gi,'perlu dilakukan')
      .replace(/\bdapat digunakan untuk melakukan\b/gi,'dapat digunakan untuk')
      .replace(/\byang paling memungkinkan\b/gi,'yang memungkinkan')
      .replace(/\byang paling sesuai\b/gi,'yang sesuai')
      .replace(/\byang paling benar\b/gi,'yang benar');
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

    s=naturalizeQuestion(s);
    const rules=[
      [/Fungsi intermediasi yang (?:relevan|dominan)(?:\s+untuk[^.?!]+)?\s+adalah\.{2,}$/i,'Fungsi intermediasinya?'],
      [/Transformasi yang tepat adalah\.{2,}$/i,'Transformasinya?'],
      [/Fungsi khusus bank yang tepat adalah\.{2,}$/i,'Fungsi banknya?'],
      [/Prinsip ini (?:paling )?dekat dengan\.{2,}$/i,'Prinsipnya?'],
      [/Posisi bank yang tepat adalah\.{2,}$/i,'Peran banknya?'],
      [/kelompoknya adalah\.{2,}$/i,'Masuk kelompok apa?'],
      [/Pernyataan yang tepat adalah\.{2,}$/i,'Pernyataan yang benar?'],
      [/Manakah kombinasi kegiatan yang (?:paling )?(?:konsisten|sesuai)[^?]*\?$/i,'Kombinasi kegiatan yang sesuai?'],
      [/Manakah rencana yang (?:paling )?jelas bertentangan dengan karakter kegiatan BPR[^?]*\?$/i,'Rencana mana yang dilarang bagi BPR?'],
      [/Manakah tindakan yang (?:paling )?tepat[^?]*\?$/i,'Tindakan yang tepat?'],
      [/Manakah keputusan yang (?:paling )?tepat[^?]*\?$/i,'Keputusan yang tepat?'],
      [/Manakah produk yang (?:paling )?tepat[^?]*\?$/i,'Produk yang tepat?'],
      [/Manakah risiko yang (?:paling )?(?:utama|relevan)[^?]*\?$/i,'Risiko utamanya?']
    ];
    for(const [r,v] of rules)s=s.replace(r,v);
    s=clean(s).replace(/\s*\.\.\.\s*$/,'?').replace(/\s*…\s*$/,'?');
    return normalizeEYD(s);
  }

  // Never shorten by slicing characters. If a stem is too long, the selector
  // should use another question instead of showing a chopped sentence.
  function compact(raw){return tidy(raw);}

  const seenRoots=new Set(),seenStems=new Set(),out=[];
  for(const base of SOURCE){
    if(!base||!Array.isArray(base.options)||base.options.length!==4||banned.test(clean(base.question)))continue;
    const root=rootId(base),mid=Number(base.moduleId)||0;
    const rootKey=`${mid}|${root}`;
    if(!root||!mid||seenRoots.has(rootKey))continue;
    const answerIndex=base.options.findIndex(x=>norm(x)===norm(base.answer));if(answerIndex<0)continue;
    const options=simplifyOptionSet(base.options);if(new Set(options.map(norm)).size!==4)continue;
    const question=compact(base.question),stem=norm(question),stemKey=`${mid}|${stem}`;
    if(!stem||banned.test(question)||seenStems.has(stemKey))continue;
    if(question.length>MAX_STEM)continue;
    if(/…|\.{3,}/.test(question))continue;
    seenRoots.add(rootKey);seenStems.add(stemKey);
    const conceptSignature=String(base.conceptSignature||'').startsWith('material-concept:')?base.conceptSignature:`m${mid}|root:${root}`;
    out.push({...base,id:`V28-M${mid}-${root}`,question,options,answer:options[answerIndex],questionType:/\bKECUALI\b/i.test(question)?'Kecuali':(base.skill==='Analisis Kasus'?'Analisis Kasus':'Pilihan Ganda'),rootQuestionId:root,baseId:root,variantMode:'natural-full-stem-no-option-leak',conceptSignature,generated:!!base.generated,qualityVersion:'V28-natural-no-option-leak'});
  }

  if(out.length){
    window.__GBP_SOURCE_BANK__=out;
    window.__GBP_QUALITY_BANK_VERSION__='V28-natural-no-option-leak';
  }
})();