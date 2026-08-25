(() => {
  const bank=window.QUESTION_BANK||[];
  if(!Array.isArray(bank)||!bank.length)return;

  const NUPMK_DAY=6;
  const BRIDGE_DAY=7;
  const BRIDGE_DECK='SERTIFIKASI GB 4 PPT BRIDGE_compressed (2) (1).pdf';
  const MAX_BANK=500;

  const nupmkUnits=[
    {id:26,code:'K.64GEB00.009.1',name:'Memberikan Pelayanan Informasi Produk dan Jasa Perbankan',source:[7]},
    {id:27,code:'K.64GEB00.007.1',name:'Memberikan Edukasi Nasabah dan Calon Nasabah',source:[8]},
    {id:28,code:'K.64GEB00.010.1',name:'Menangani Pengaduan Nasabah',source:[9]},
    {id:29,code:'K.64GEB00.001.1',name:'Memproses Pembukaan dan Penutupan Rekening',source:[10]},
    {id:30,code:'K.64GEB00.002.2',name:'Memproses Transaksi Keuangan Tunai dan Non Tunai',source:[11]},
    {id:31,code:'K.64GEB00.015.1',name:'Mengelola Administrasi Perbankan',source:[12]},
    {id:32,code:'K.64GEB00.003.2',name:'Memproses Valuta Asing',source:[13]},
    {id:33,code:'K.64GEB00.014.2',name:'Memproses Trade Service dan Trade Finance',source:[14]},
    {id:34,code:'K.64GEB00.016.1',name:'Mengelola Akuntansi',source:[15,16]},
    {id:35,code:'K.64GEB00.017.1',name:'Mengelola Aspek-Aspek Hukum',source:[22]}
  ];

  // BRIDGE order follows the 10 SKKNI units shown in the competency list.
  const bridgeUnits=[
    {id:36,code:'K.64GEB00.001.1',name:'Memproses Pembukaan dan Penutupan Rekening',source:[10],section:'Pembukaan & Penutupan Rekening · PDF hlm. 359–418'},
    {id:37,code:'K.64GEB00.002.2',name:'Memproses Transaksi Keuangan Tunai dan Non Tunai',source:[11],section:'Transaksi Tunai dan Non Tunai · PDF hlm. 419–480'},
    {id:38,code:'K.64GEB00.003.2',name:'Memproses Valuta Asing',source:[13],section:'Transaksi Jual Beli Valuta Asing & Treasury · PDF hlm. 267–295'},
    {id:39,code:'K.64GEB00.007.1',name:'Memberikan Edukasi Nasabah dan Calon Nasabah',source:[8],section:'Kebijakan Edukasi Nasabah & Calon Nasabah · PDF hlm. 697–720'},
    {id:40,code:'K.64GEB00.009.1',name:'Memberikan Pelayanan Informasi Produk dan Jasa Perbankan',source:[7],section:'Kebijakan Informasi Produk & Jasa Perbankan · PDF hlm. 681–696'},
    {id:41,code:'K.64GEB00.010.1',name:'Menangani Pengaduan Nasabah',source:[9],section:'Pengelolaan Pengaduan Nasabah · PDF hlm. 721–760'},
    {id:42,code:'K.64GEB00.016.1',name:'Mengelola Akuntansi',source:[15,16],section:'Akuntansi & Laporan Keuangan · PDF hlm. 990–1078'},
    {id:43,code:'K.64GEB00.014.2',name:'Memproses Trade Service dan Trade Finance',source:[14],section:'Trade Service & Trade Finance · PDF hlm. 296–344'},
    {id:44,code:'K.64GEB00.015.1',name:'Mengelola Administrasi Perbankan',source:[12],section:'Administrasi Perbankan · PDF hlm. 481–615'},
    {id:45,code:'K.64GEB00.017.1',name:'Mengelola Aspek-Aspek Hukum',source:[22],section:'Aspek Hukum Perbankan · PDF hlm. 1168–1279'}
  ];

  try{
    const mk='gbpCompetencySourcesV32';
    if(!localStorage.getItem(mk)){
      localStorage.removeItem('gbpDbBankV28');
      localStorage.removeItem('gbpQuestionSeenV28');
      localStorage.setItem(mk,'1');
    }
  }catch(e){}

  for(let i=bank.length-1;i>=0;i--){
    const mid=Number(bank[i]?.moduleId);
    if((mid>=26&&mid<=35)||(mid>=36&&mid<=45))bank.splice(i,1);
  }

  const sourceSnapshot=bank.filter(q=>Number(q.moduleId)>=1&&Number(q.moduleId)<=24);

  for(const unit of nupmkUnits){
    const base=sourceSnapshot.filter(q=>unit.source.includes(Number(q.moduleId)));
    bank.push(...base.slice(0,MAX_BANK).map((q,idx)=>({
      ...q,id:`NUPMK-${unit.id}-${String(idx+1).padStart(3,'0')}-${q.id}`,
      moduleId:unit.id,moduleName:unit.name,day:NUPMK_DAY,unitCode:unit.code,
      category:'NUPMK Unit Kompetensi',nupmkSourceModule:Number(q.moduleId),nupmkCoreAligned:true,
      rootQuestionId:`NUPMK-${unit.id}|${q.rootQuestionId||q.baseId||q.id}`,
      baseId:`NUPMK-${unit.id}|${q.rootQuestionId||q.baseId||q.id}`,
      conceptSignature:`nupmk-source:${unit.id}|${q.conceptSignature||q.rootQuestionId||q.baseId||q.id}`
    })));
  }

  // BRIDGE competency modules use the original roots directly, not NUPMK clones.
  // Their source metadata points to the exact section in the uploaded BRIDGE deck.
  for(const unit of bridgeUnits){
    const base=sourceSnapshot.filter(q=>unit.source.includes(Number(q.moduleId)));
    bank.push(...base.slice(0,MAX_BANK).map((q,idx)=>({
      ...q,id:`BRIDGE-U${unit.id}-${String(idx+1).padStart(3,'0')}-${q.id}`,
      moduleId:unit.id,moduleName:`BRIDGE · ${unit.name}`,day:BRIDGE_DAY,unitCode:unit.code,
      category:'BRIDGE Unit Kompetensi',source:`${BRIDGE_DECK} · ${unit.section}`,
      bridgeSourceDeck:BRIDGE_DECK,bridgeSourceSection:unit.section,bridgeSourceValidated:true,
      bridgeUnit:true,bridgeUnitIndex:bridgeUnits.indexOf(unit)+1,
      rootQuestionId:`BRIDGE-U${unit.id}|${q.rootQuestionId||q.baseId||q.id}`,
      baseId:`BRIDGE-U${unit.id}|${q.rootQuestionId||q.baseId||q.id}`,
      conceptSignature:`bridge-source:${unit.id}|${q.conceptSignature||q.rootQuestionId||q.baseId||q.id}`
    })));
  }

  // GLOBAL ANTI-KEYWORD-SHORTCUT GATE
  // Reject questions where the correct choice is substantially easier to spot only
  // because its distinctive words are echoed in the stem while distractors are not.
  const clean=s=>String(s??'').replace(/\s+/g,' ').trim();
  const norm=s=>clean(s).toLocaleLowerCase('id-ID').replace(/[^a-z0-9à-öø-ÿ]+/giu,' ').replace(/\s+/g,' ').trim();
  const shortcutStop=new Set(`yang dan atau untuk pada dalam dengan dari ke di ini itu tersebut sebuah suatu seorang adalah ialah merupakan sebagai agar serta paling lebih tepat sesuai bank nasabah calon debitur perusahaan petugas unit proses transaksi kegiatan layanan produk jasa perbankan dilakukan melakukan harus dapat akan mana apa apakah bagaimana mengapa manakah berdasarkan terkait kondisi kasus situasi berikut pilihan jawaban tindakan keputusan langkah konsep istilah`.split(' '));
  const robotPrompt=/^(?:apa\s+istilah\s+yang\s+tepat|istilah\s+yang\s+tepat|konsep\s+apa\s+yang\s+tepat|apa\s+yang\s+dimaksud|manakah\s+istilah\s+yang\s+tepat)\b/i;
  const shortcutTokens=raw=>norm(raw).split(' ').filter(t=>t.length>2&&!shortcutStop.has(t)&&!/^[0-9]+$/.test(t));
  const overlap=(question,option)=>{const Q=new Set(shortcutTokens(question)),O=[...new Set(shortcutTokens(option))];if(!O.length)return 0;let n=0;for(const t of O)if(Q.has(t))n++;return n/O.length;};
  const answerIndex=q=>Array.isArray(q.options)?q.options.findIndex(x=>norm(x)===norm(q.answer)):-1;
  function uniqueAnswerClues(q){const ai=answerIndex(q);if(ai<0)return 0;const Q=new Set(shortcutTokens(q.question)),A=[...new Set(shortcutTokens(q.options[ai]))],others=new Set(q.options.filter((_,i)=>i!==ai).flatMap(shortcutTokens));return A.filter(t=>Q.has(t)&&!others.has(t)).length;}
  function phraseLeak(q){const stem=norm(q.question),a=norm(q.answer),at=shortcutTokens(q.answer);if(!stem||!a)return false;if(at.length>=2&&a.length>=8&&stem.includes(a))return true;for(let i=0;i<at.length-1;i++){const p=`${at[i]} ${at[i+1]}`;if(p.length>=8&&stem.includes(p))return true;}return false;}
  function shortcutRisk(q){const ai=answerIndex(q);if(ai<0)return 1;const scores=q.options.map(o=>overlap(q.question,o)),correct=scores[ai],bestOther=Math.max(...scores.filter((_,i)=>i!==ai),0),unique=uniqueAnswerClues(q);if(phraseLeak(q))return 1;if(unique>=2&&correct>=.45&&correct-bestOther>=.25)return .95;if(unique>=1&&correct>=.60&&bestOther<=.20)return .9;if(correct>=.75&&correct-bestOther>=.40)return .85;return Math.max(0,correct-bestOther*.65);}

  const byModule=new Map();
  for(const q of bank){const mid=Number(q?.moduleId)||0;if(!mid)continue;const arr=byModule.get(mid)||[];arr.push({q,risk:shortcutRisk(q),robot:robotPrompt.test(clean(q.question))});byModule.set(mid,arr);}
  const filtered=[],audit={};
  for(const [mid,rows] of byModule){
    const safe=rows.filter(x=>x.risk<.85&&!x.robot),nonLeak=rows.filter(x=>x.risk<.85),chosen=safe.length>=25?safe:nonLeak;
    filtered.push(...chosen.map(x=>({...x.q,shortcutRisk:Number(x.risk.toFixed(3)),shortcutGuard:'v32'})));
    audit[mid]={raw:rows.length,safe:safe.length,kept:chosen.length,rejectedLeak:rows.filter(x=>x.risk>=.85).length,rejectedRobot:rows.filter(x=>x.robot).length};
  }
  if(filtered.length)bank.splice(0,bank.length,...filtered);

  window.NUPMK_UNITS=nupmkUnits.map(u=>({...u,day:NUPMK_DAY,maxBank:MAX_BANK}));
  window.BRIDGE_UNITS=bridgeUnits.map((u,i)=>({...u,index:i+1,moduleName:`BRIDGE · ${u.name}`,day:BRIDGE_DAY,maxBank:MAX_BANK,sourceDeck:BRIDGE_DECK}));
  window.BRIDGE_SOURCE_DECK=BRIDGE_DECK;
  window.__GBP_SHORTCUT_AUDIT__=audit;
  window.__GBP_SHORTCUT_GUARD_VERSION__='V32-no-keyword-shortcut';
  window.__GBP_SOURCE_BANK__=bank.map(q=>({...q,options:Array.isArray(q.options)?[...q.options]:q.options}));
})();
