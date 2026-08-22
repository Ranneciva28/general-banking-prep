(() => {
  const SOURCE=[...(window.__GBP_SOURCE_BANK__||window.QUESTION_BANK||[])];
  if(!SOURCE.length)return;

  const MAX_STEM=205;
  const clean=s=>String(s??'').replace(/\s+/g,' ').trim();
  const norm=s=>clean(s).toLocaleLowerCase('id-ID').replace(/[^a-z0-9à-öø-ÿ]+/giu,' ').replace(/\s+/g,' ').trim();
  const cap=s=>String(s??'').replace(/^(\s*[^A-Za-zÀ-ÖØ-öø-ÿ]*)([a-zà-öø-ÿ])/u,(_,a,b)=>a+b.toLocaleUpperCase('id-ID'));
  const rootId=q=>String(q?.rootQuestionId||q?.baseId||q?.id||'');
  const banned=/\b(?:pernyataan\s*:|alasan\s*:|sebab\s*[–-]?\s*akibat|pilih pernyataan yang benar|manakah satu pilihan yang benar|pilih satu pernyataan yang tepat|pertanyaan acuan)\b/i;
  const stop=new Set('yang dan atau untuk pada dalam dengan dari ke di ini itu tersebut sebuah suatu seorang adalah ialah merupakan sebagai agar serta paling lebih tepat sesuai analisis keputusan tindakan kesimpulan jawaban pilihan manakah apakah apa bagaimana mengapa berikut kondisi kasus situasi bank nasabah unit petugas proses dilakukan melakukan saat ketika jika maka perlu harus dapat akan mana berdasarkan terhadap terkait konteks'.split(' '));
  const promptTail=/(?:[.!?…]\s*)?(?:analisis|keputusan|tindakan|kesimpulan|jawaban|pilihan|fungsi|konsep|produk|risiko|transformasi|langkah|kontrol|prinsip|peran)\s+(?:apa|mana|yang)?\s*(?:paling\s+)?(?:tepat|sesuai|relevan|benar|utama|dominan|baik)?\s*(?:adalah)?\s*[.?…]*$/i;
  const genericAsk=/(?:[.!?…]\s*)?(?:manakah|apakah|apa|bagaimana|mengapa)\b[^.!?…]{0,95}[?…]*$/i;

  function cleanOption(raw){
    return clean(raw)
      .replace(/\s+[—–-]\s+dalam konteks\b.*$/i,'')
      .replace(/\s*\(\s*dalam konteks\b.*\)\s*$/i,'')
      .replace(/\s+[—–-]\s+sesuai konteks\b.*$/i,'')
      .trim();
  }

  function tidy(raw){
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
      .replace(/\byang paling tepat\b/gi,'yang tepat')
      .replace(/\byang paling relevan\b/gi,'yang relevan')
      .replace(/\byang paling dominan\b/gi,'yang dominan')
      .replace(/\s+([,.!?;:])/g,'$1');

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
    return cap(clean(s).replace(/\s*\.\.\.\?$/,'?').replace(/\s+([,.!?;:])/g,'$1'));
  }

  function promptStart(s){
    const m=s.match(/\b(?:Apa|Mengapa|Bagaimana|Manakah|Fungsi|Transformasi|Prinsip|Produk|Risiko|Tindakan|Keputusan|Kombinasi|Peran|Klasifikasi|Posisi|Kesimpulan|Rencana)\b[^.!?]{0,125}(?:\?|\.{2,})$/i);
    return m?m.index:-1;
  }
  function wordClip(s,n){s=clean(s);if(s.length<=n)return s;const x=s.slice(0,n).replace(/\s+\S*$/,'').replace(/[,:;.-]+$/,'').trim();return `${x}…`;}
  function compact(raw){
    let s=tidy(raw);if(s.length<=MAX_STEM)return s;
    const sentences=s.split(/(?<=[.!?])\s+/).filter(Boolean);
    if(sentences.length>1){
      const prompt=sentences.pop();let context=clean(sentences.join(' '));
      if(context.length>120){const clauses=context.split(/[,;]\s+/).filter(Boolean);if(clauses.length>=3)context=clean(`${clauses[0]}, ${clauses.slice(-1)[0]}`);if(context.length>120)context=wordClip(context,120);}
      const candidate=clean(`${context} ${prompt}`);if(candidate.length<=MAX_STEM)return candidate;s=candidate;
    }
    const p=promptStart(s);if(p>35){const prompt=s.slice(p),budget=Math.max(70,MAX_STEM-prompt.length-1);return clean(`${wordClip(s.slice(0,p),budget)} ${prompt}`);}
    return wordClip(s,MAX_STEM);
  }

  function coreText(q){let s=clean(q?.question||'').replace(promptTail,'').trim();const stripped=s.replace(genericAsk,'').trim();if(stripped.length>=45)s=stripped;return norm(s);}
  function sig(q){return coreText(q).split(' ').filter(t=>t.length>2&&!stop.has(t));}
  function jac(a,b){const A=new Set(a),B=new Set(b);if(!A.size||!B.size)return 0;let n=0;for(const x of A)if(B.has(x))n++;return n/(A.size+B.size-n);}
  function bigrams(a){const x=[];for(let i=0;i<a.length-1;i++)x.push(`${a[i]} ${a[i+1]}`);return x;}
  function near(a,b){
    if(!a||!b)return false;
    if(rootId(a)&&rootId(a)===rootId(b))return true;
    const ca=coreText(a),cb=coreText(b);if(ca.length>=28&&ca===cb)return true;
    const A=sig(a),B=sig(b),min=Math.min(A.length,B.length);
    if(min>=6&&jac(A,B)>=.84)return true;
    if(Math.min(bigrams(A).length,bigrams(B).length)>=5&&jac(bigrams(A),bigrams(B))>=.78)return true;
    return false;
  }

  const seenRoots=new Set(),seenStems=new Set(),acceptedByModule=new Map(),out=[];
  for(const base of SOURCE){
    if(!base||!Array.isArray(base.options)||base.options.length!==4||banned.test(clean(base.question)))continue;
    const root=rootId(base),mid=Number(base.moduleId)||0,rootKey=`${mid}|${root}`;
    if(!root||!mid||seenRoots.has(rootKey))continue;
    const answerIndex=base.options.findIndex(x=>norm(x)===norm(base.answer));if(answerIndex<0)continue;
    const options=base.options.map(cleanOption);if(new Set(options.map(norm)).size!==4)continue;
    const question=compact(base.question),stem=norm(question),stemKey=`${mid}|${stem}`;
    if(!stem||banned.test(question)||seenStems.has(stemKey))continue;
    const candidate={
      ...base,
      id:`V25-M${mid}-${root}`,
      question,
      options,
      answer:options[answerIndex],
      questionType:/\bKECUALI\b/i.test(question)?'Kecuali':(base.skill==='Analisis Kasus'?'Analisis Kasus':'Pilihan Ganda'),
      rootQuestionId:root,
      baseId:root,
      variantMode:'concise-root',
      conceptSignature:`m${mid}|root:${root}`,
      generated:!!base.generated,
      qualityVersion:'V25-distinct-root'
    };
    const peers=acceptedByModule.get(mid)||[];
    if(peers.some(x=>near(candidate,x)))continue;
    peers.push(candidate);acceptedByModule.set(mid,peers);
    seenRoots.add(rootKey);seenStems.add(stemKey);out.push(candidate);
  }

  if(out.length){
    window.__GBP_SOURCE_BANK__=out;
    window.__GBP_QUALITY_BANK_VERSION__='V25-distinct-root';
  }
})();