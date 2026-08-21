(() => {
  const bank=window.__GBP_SOURCE_BANK__||window.QUESTION_BANK||[];
  if(!Array.isArray(bank)||!bank.length)return;

  const clean=s=>String(s??'').replace(/\s+/g,' ').trim();
  const norm=s=>clean(s).toLocaleLowerCase('id-ID').replace(/[^a-z0-9à-öø-ÿ]+/giu,' ').replace(/\s+/g,' ').trim();
  const hash=s=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
  const clip=(s,max=145)=>{s=clean(s);if(s.length<=max)return s;return s.slice(0,max).replace(/\s+\S*$/,'').replace(/[,:;.-]+$/,'').trim()+'.'};
  const firstSentence=s=>{const x=clean(s),m=x.match(/^.*?[.!?](?=\s|$)/);return clip(m?m[0]:x)};
  const stripAnswer=(text,answer)=>{let x=clean(text),a=clean(answer);if(!x||!a)return x;try{x=x.replace(new RegExp(a.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'ig'),'konsep tersebut')}catch(e){}return clean(x)};
  const unique=a=>[...new Set(a.map(clean).filter(Boolean))];
  const choose=(arr,seed,count=3)=>{const pool=[...arr],out=[];let n=0;while(pool.length&&out.length<count){const idx=hash(`${seed}:${n++}`)%pool.length;out.push(pool.splice(idx,1)[0])}return out};
  const optionKey=o=>unique(o||[]).map(norm).sort().join('|');

  try{
    const MIGRATION='gbpSubstantiveVariantsV18b';
    if(!localStorage.getItem(MIGRATION)){
      localStorage.removeItem('gbpDbBankV14');
      localStorage.removeItem('gbpQuestionTextSeenV17');
      localStorage.setItem(MIGRATION,'1');
    }
  }catch(e){}

  const authored=bank.filter(q=>!q.generatedVariant&&!q.substantiveVariant);
  const byModule=new Map();
  for(const q of authored){const mid=Number(q.moduleId);if(!byModule.has(mid))byModule.set(mid,[]);byModule.get(mid).push(q)}

  const out=[];
  const globalStem=new Set(),globalOptions=new Set();
  const push=q=>{
    const sk=norm(q.question),ok=optionKey(q.options);
    if(!sk||!ok||globalStem.has(sk)||globalOptions.has(ok))return false;
    if(!Array.isArray(q.options)||q.options.length!==4||!q.options.some(x=>clean(x)===clean(q.answer)))return false;
    globalStem.add(sk);globalOptions.add(ok);out.push(q);return true;
  };

  const operationalLead={
    26:'Dalam pelayanan informasi produk,',27:'Dalam kegiatan edukasi nasabah,',28:'Dalam penanganan pengaduan,',29:'Dalam proses pembukaan atau penutupan rekening,',30:'Dalam pemrosesan transaksi tunai dan non tunai,',31:'Dalam administrasi perbankan,',32:'Dalam pemrosesan valuta asing,',33:'Dalam layanan trade service dan trade finance,',34:'Dalam pencatatan akuntansi,',35:'Dalam penanganan aspek hukum perbankan,'
  };

  for(const [mid,items] of byModule){
    const answerPool=unique(items.map(q=>q.answer));
    const explanationPool=unique(items.map(q=>firstSentence(q.explanation)).filter(x=>x.length>=24));
    const isNupmk=mid>=26&&mid<=35;

    // Main/general modules keep the authored item once. NUPMK does NOT clone it again,
    // so the same original question cannot appear in both the general and NUPMK module.
    if(!isNupmk){for(const q of items)push({...q,rootQuestionId:q.rootQuestionId||q.id,variantMode:'authored'})}

    for(const q of items){
      const desc=clip(stripAnswer(firstSentence(q.explanation),q.answer),155);
      const distractors=choose(answerPool.filter(x=>norm(x)!==norm(q.answer)),`${mid}:${q.id}:concept`,3);
      if(desc.length>=24&&distractors.length===3){
        const options=[clean(q.answer),...distractors];
        const stem=isNupmk?`${operationalLead[mid]||'Dalam pelaksanaan pekerjaan,'} ${desc.charAt(0).toLocaleLowerCase('id-ID')+desc.slice(1)} Tindakan atau konsep yang paling tepat adalah...`:`${desc} Hal tersebut paling tepat menggambarkan...`;
        push({...q,id:`${q.id}-V18-CONCEPT`,question:stem,options,answer:clean(q.answer),questionType:'Pilihan Ganda',rootQuestionId:q.rootQuestionId||q.id,substantiveVariant:true,variantMode:'concept-from-explanation'});
      }
    }

    for(const q of items){
      const correct=firstSentence(q.explanation);
      const distractors=choose(explanationPool.filter(x=>norm(x)!==norm(correct)),`${mid}:${q.id}:definition`,3);
      if(correct.length>=24&&distractors.length===3){
        const stem=isNupmk?`Dalam praktik pekerjaan, apa karakteristik yang paling tepat dari ${clean(q.answer)}?`:`Apa karakteristik yang paling tepat dari ${clean(q.answer)}?`;
        const options=[correct,...distractors];
        push({...q,id:`${q.id}-V18-DEFINE`,question:stem,options,answer:correct,explanation:`${clean(q.answer)}: ${clean(q.explanation)}`,questionType:'Pilihan Ganda',rootQuestionId:q.rootQuestionId||q.id,substantiveVariant:true,variantMode:'explanation-selection'});
      }
    }

    // A third substantive form is added as reserve capacity. It changes the tested task
    // from identifying the concept to choosing the correct implication/explanation, and
    // uses a different distractor combination from the definition variant.
    for(const q of items){
      const correct=firstSentence(q.explanation);
      const distractors=choose(explanationPool.filter(x=>norm(x)!==norm(correct)),`${mid}:${q.id}:application`,3);
      if(correct.length>=24&&distractors.length===3){
        const stem=isNupmk?`${operationalLead[mid]||'Dalam pelaksanaan pekerjaan,'} seorang petugas menerapkan ${clean(q.answer)}. Pernyataan yang paling sesuai dengan penerapan tersebut adalah...`:`Jika ${clean(q.answer)} diterapkan dengan tepat, pernyataan yang paling sesuai adalah...`;
        const options=[correct,...distractors];
        push({...q,id:`${q.id}-V18-APPLY`,question:stem,options,answer:correct,explanation:`${clean(q.answer)}: ${clean(q.explanation)}`,questionType:'Pilihan Ganda',rootQuestionId:q.rootQuestionId||q.id,substantiveVariant:true,variantMode:'application-explanation'});
      }
    }
  }

  bank.splice(0,bank.length,...out);
  window.__GBP_SOURCE_BANK__=bank.map(q=>({...q,options:[...(q.options||[])]}));
})();