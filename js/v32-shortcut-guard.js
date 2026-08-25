(() => {
  const SOURCE=[...(window.__GBP_SOURCE_BANK__||[])];
  if(!SOURCE.length)return;

  const clean=s=>String(s??'').replace(/\s+/g,' ').trim();
  const norm=s=>clean(s).toLocaleLowerCase('id-ID').replace(/[^a-z0-9à-öø-ÿ]+/giu,' ').replace(/\s+/g,' ').trim();
  const stop=new Set(`yang dan atau untuk pada dalam dengan dari ke di ini itu tersebut sebuah suatu seorang adalah ialah merupakan sebagai agar serta paling lebih tepat sesuai bank nasabah calon debitur perusahaan petugas unit proses transaksi kegiatan layanan produk jasa perbankan dilakukan melakukan harus dapat akan mana apa apakah bagaimana mengapa manakah berdasarkan terkait kondisi kasus situasi berikut pilihan jawaban tindakan keputusan langkah konsep istilah`.split(' '));
  const robot=/^(?:apa\s+istilah\s+yang\s+tepat|istilah\s+yang\s+tepat|konsep\s+apa\s+yang\s+tepat|apa\s+yang\s+dimaksud|manakah\s+istilah\s+yang\s+tepat)\b/i;

  function tokens(raw){return norm(raw).split(' ').filter(t=>t.length>2&&!stop.has(t)&&!/^[0-9]+$/.test(t));}
  function overlap(question,option){const Q=new Set(tokens(question)),O=[...new Set(tokens(option))];if(!O.length)return 0;let n=0;for(const t of O)if(Q.has(t))n++;return n/O.length;}
  function answerIndex(q){return Array.isArray(q.options)?q.options.findIndex(x=>norm(x)===norm(q.answer)):-1;}
  function uniqueAnswerClues(q){
    const ai=answerIndex(q);if(ai<0)return 0;
    const qTokens=new Set(tokens(q.question)),answerTokens=[...new Set(tokens(q.options[ai]))];
    const otherTokens=new Set(q.options.filter((_,i)=>i!==ai).flatMap(tokens));
    return answerTokens.filter(t=>qTokens.has(t)&&!otherTokens.has(t)).length;
  }
  function phraseLeak(q){
    const a=norm(q.answer),stem=norm(q.question);if(!a||!stem)return false;
    const at=tokens(q.answer);
    if(at.length>=2&&a.length>=8&&stem.includes(a))return true;
    for(let i=0;i<at.length-1;i++){const phrase=`${at[i]} ${at[i+1]}`;if(phrase.length>=8&&stem.includes(phrase))return true;}
    return false;
  }
  function shortcutRisk(q){
    const ai=answerIndex(q);if(ai<0)return 1;
    const scores=q.options.map(o=>overlap(q.question,o)),correct=scores[ai],others=scores.filter((_,i)=>i!==ai),bestOther=Math.max(...others,0),unique=uniqueAnswerClues(q);
    if(phraseLeak(q))return 1;
    if(unique>=2&&correct>=.45&&correct-bestOther>=.25)return .95;
    if(unique>=1&&correct>=.60&&bestOther<=.20)return .9;
    if(correct>=.75&&correct-bestOther>=.40)return .85;
    return Math.max(0,correct-bestOther*.65);
  }
  function robotPrompt(q){return robot.test(clean(q.question));}

  const byModule=new Map();
  for(const q of SOURCE){const mid=Number(q?.moduleId)||0;if(!mid)continue;const row={q,risk:shortcutRisk(q),robot:robotPrompt(q)};const arr=byModule.get(mid)||[];arr.push(row);byModule.set(mid,arr);}

  const out=[],audit={};
  for(const [mid,rows] of byModule){
    // Hard-reject obvious answer leakage. Robotic prompt forms are rejected when the
    // module still has enough clean material; otherwise only the non-leaking rows survive.
    const safe=rows.filter(x=>x.risk<.85&&!x.robot);
    const nonLeak=rows.filter(x=>x.risk<.85);
    const chosen=safe.length>=25?safe:nonLeak;
    out.push(...chosen.map(x=>({...x.q,shortcutRisk:Number(x.risk.toFixed(3)),shortcutGuard:'v32'})));
    audit[mid]={raw:rows.length,safe:safe.length,nonLeak:nonLeak.length,kept:chosen.length,rejectedLeak:rows.filter(x=>x.risk>=.85).length,rejectedRobot:rows.filter(x=>x.robot).length};
  }

  if(out.length){
    window.__GBP_SOURCE_BANK__=out;
    window.__GBP_SHORTCUT_AUDIT__=audit;
    window.__GBP_SHORTCUT_GUARD_VERSION__='V32-no-keyword-shortcut';
  }

  // Source ordering changed after the quality gate. Reset slot-based V28 state once,
  // otherwise an old slot number could point to a different question after this update.
  try{
    const mk='gbpShortcutGuardMigrationV32';
    if(!localStorage.getItem(mk)){
      localStorage.removeItem('gbpDbBankV28');
      localStorage.removeItem('gbpQuestionSeenV28');
      localStorage.setItem(mk,'1');
    }
  }catch(e){}
})();
