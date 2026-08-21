(() => {
  const bank=window.__GBP_SOURCE_BANK__||window.QUESTION_BANK||[];
  if(!Array.isArray(bank)||!bank.length)return;

  const clean=s=>String(s??'').replace(/\s+/g,' ').trim();
  const norm=s=>clean(s).toLocaleLowerCase('id-ID').replace(/[^a-z0-9à-öø-ÿ]+/giu,' ').replace(/\s+/g,' ').trim();
  const hash=s=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
  const clip=(s,max=145)=>{s=clean(s);if(s.length<=max)return s;return s.slice(0,max).replace(/\s+\S*$/,'').replace(/[,:;.-]+$/,'').trim()+'.'};
  const firstSentence=s=>{const x=clean(s),m=x.match(/^.*?[.!?](?=\s|$)/);return clip(m?m[0]:x)};
  const stripAnswer=(text,answer)=>{
    let x=clean(text),a=clean(answer);if(!x||!a)return x;
    try{x=x.replace(new RegExp(a.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'ig'),'konsep tersebut')}catch(e){}
    return clean(x);
  };
  const unique=a=>[...new Set(a.map(clean).filter(Boolean))];
  const choose=(arr,seed,count=3)=>{
    const pool=[...arr],out=[];let n=0;
    while(pool.length&&out.length<count){const idx=hash(`${seed}:${n++}`)%pool.length;out.push(pool.splice(idx,1)[0])}
    return out;
  };
  const optionKey=o=>unique(o||[]).map(norm).sort().join('|');

  try{
    const MIGRATION='gbpSubstantiveVariantsV18';
    if(!localStorage.getItem(MIGRATION)){
      localStorage.removeItem('gbpDbBankV14');
      localStorage.removeItem('gbpQuestionTextSeenV17');
      localStorage.setItem(MIGRATION,'1');
    }
  }catch(e){}

  // Start only from authored/core questions. Previous generated/cosmetic variants are discarded.
  const authored=bank.filter(q=>!q.generatedVariant&&!q.substantiveVariant);
  const byModule=new Map();
  for(const q of authored){const mid=Number(q.moduleId);if(!byModule.has(mid))byModule.set(mid,[]);byModule.get(mid).push(q)}

  const out=[];
  const stemSeen=new Set(),optionSeen=new Set();
  const push=q=>{
    const sk=norm(q.question),ok=optionKey(q.options);
    if(!sk||!ok||stemSeen.has(sk)||optionSeen.has(ok))return false;
    if(!Array.isArray(q.options)||q.options.length!==4||!q.options.some(x=>clean(x)===clean(q.answer)))return false;
    stemSeen.add(sk);optionSeen.add(ok);out.push(q);return true;
  };

  for(const [mid,items] of byModule){
    const answerPool=unique(items.map(q=>q.answer));
    const explanationPool=unique(items.map(q=>firstSentence(q.explanation)).filter(x=>x.length>=24));

    // 1) Authored source question. Kept as one distinct item only.
    for(const q of items){push({...q,rootQuestionId:q.rootQuestionId||q.id,variantMode:'authored'})}

    // 2) Reverse-concept question: new stem from the explanation and a NEW option set
    // built from answers to other questions in the same module.
    for(const q of items){
      const desc=clip(stripAnswer(firstSentence(q.explanation),q.answer),155);
      const distractors=choose(answerPool.filter(x=>norm(x)!==norm(q.answer)),`${mid}:${q.id}:concept`,3);
      if(desc.length<24||distractors.length<3)continue;
      const options=[clean(q.answer),...distractors];
      const stem=`${desc} Konsep, produk, atau tindakan yang paling sesuai adalah...`;
      push({...q,id:`${q.id}-V18-CONCEPT`,question:stem,options,answer:clean(q.answer),questionType:'Pilihan Ganda',rootQuestionId:q.rootQuestionId||q.id,substantiveVariant:true,variantMode:'concept-from-explanation'});
    }

    // 3) Reverse-definition question: the target is the original answer, but the user must
    // choose the correct explanation. Both question and all four options differ from source.
    for(const q of items){
      const correct=firstSentence(q.explanation);
      const distractors=choose(explanationPool.filter(x=>norm(x)!==norm(correct)),`${mid}:${q.id}:definition`,3);
      if(correct.length<24||distractors.length<3)continue;
      const stem=`Pernyataan mana yang paling tepat menjelaskan ${clean(q.answer)}?`;
      const options=[correct,...distractors];
      push({...q,id:`${q.id}-V18-DEFINE`,question:stem,options,answer:correct,explanation:`${clean(q.answer)}: ${clean(q.explanation)}`,questionType:'Pilihan Ganda',rootQuestionId:q.rootQuestionId||q.id,substantiveVariant:true,variantMode:'explanation-selection'});
    }
  }

  bank.splice(0,bank.length,...out);
  window.__GBP_SOURCE_BANK__=bank.map(q=>({...q,options:[...(q.options||[])]}));
})();