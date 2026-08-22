(() => {
  const bank=window.__GBP_SOURCE_BANK__||window.QUESTION_BANK||[];
  if(!Array.isArray(bank)||!bank.length)return;

  const MAX_PER_MODULE=120;
  const clean=s=>String(s??'').replace(/\s+/g,' ').trim();
  const norm=s=>clean(s).toLocaleLowerCase('id-ID').replace(/[^a-z0-9à-öø-ÿ]+/giu,' ').replace(/\s+/g,' ').trim();
  const hash=s=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
  const unique=a=>[...new Set((a||[]).map(clean).filter(Boolean))];
  const firstSentence=s=>{const x=clean(s),m=x.match(/^.*?[.!?](?=\s|$)/);return clean(m?m[0]:x)};
  const clip=(s,n=180)=>{s=clean(s);return s.length<=n?s:s.slice(0,n).replace(/\s+\S*$/,'').replace(/[,:;.-]+$/,'').trim()+'.'};
  const lowerFirst=s=>{s=clean(s);return s?s.charAt(0).toLocaleLowerCase('id-ID')+s.slice(1):s};
  const cap=s=>String(s??'').replace(/^(\s*[^A-Za-zÀ-ÖØ-öø-ÿ]*)([a-zà-öø-ÿ])/u,(_,a,b)=>a+b.toLocaleUpperCase('id-ID'));
  const rootId=q=>String(q?.rootQuestionId||q?.id||'');
  const metaReplace=/\b(?:materi|slide|modul|berdasarkan materi|dari materi|menurut materi)\b/gi;
  const metaTest=/\b(?:materi|slide|modul)\b/i;
  const badPrompt=/\b(?:apa itu|disebut apakah|manakah satu pilihan yang benar|pilih satu pernyataan yang tepat|pertanyaan acuan)\b/i;
  const stop=new Set('yang dan atau untuk pada dalam dengan dari ke di bank nasabah proses tahapan kerja suatu sebuah sebagai harus perlu paling tepat tersebut ini itu agar serta adalah dilakukan melakukan kondisi keputusan petugas tim unit saat karena ketika jika akan bisa dapat oleh menjadi sedang sebelum setelah merupakan memberikan memastikan'.split(' '));
  const tokens=s=>norm(s).split(' ').filter(x=>x.length>2&&!stop.has(x));
  const tokenSet=s=>new Set(tokens(s));
  const jac=(a,b)=>{const A=tokenSet(a),B=tokenSet(b);if(!A.size||!B.size)return 0;let n=0;for(const x of A)if(B.has(x))n++;return n/(A.size+B.size-n)};
  const copiedPhrase=(a,b,size=7)=>{const A=norm(a).split(' '),B=norm(b).split(' ');if(A.length<size||B.length<size)return false;const s=new Set();for(let i=0;i<=A.length-size;i++)s.add(A.slice(i,i+size).join(' '));for(let i=0;i<=B.length-size;i++)if(s.has(B.slice(i,i+size).join(' ')))return true;return false};
  const sanitize=s=>clean(String(s??'').replace(metaReplace,'').replace(/\bhal\.?\s*\d+(?:\s*[–-]\s*\d+)?\b/gi,'').replace(/\s+([,.!?;:])/g,'$1'));

  const replacements=[
    [/\bmerupakan\b/gi,'berfungsi sebagai'],[/\bmenunjukkan\b/gi,'mengindikasikan'],[/\bmemastikan\b/gi,'menjaga agar'],[/\bmelakukan\b/gi,'menjalankan'],
    [/\bmemberikan\b/gi,'menyediakan'],[/\bmengelola\b/gi,'mengendalikan'],[/\bmengurangi\b/gi,'menekan'],[/\bmembutuhkan\b/gi,'memerlukan'],
    [/\bharus\b/gi,'perlu'],[/\bsesuai\b/gi,'selaras dengan'],[/\bterkait\b/gi,'berkaitan dengan'],[/\bproses\b/gi,'alur kerja'],
    [/\brisiko\b/gi,'eksposur'],[/\bmenilai\b/gi,'mengevaluasi'],[/\bmemeriksa\b/gi,'menelaah'],[/\bmenentukan\b/gi,'menetapkan']
  ];
  function cueFrom(raw,answer){
    const source=sanitize(firstSentence(raw));let s=source,a=clean(answer);
    if(a.length>=4){try{s=s.replace(new RegExp(a.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'ig'),'pendekatan tersebut')}catch(e){}}
    for(const [r,v] of replacements)s=s.replace(r,v);
    s=clip(s,170);
    if(!s||copiedPhrase(s,source,6)){
      const answerTokens=new Set(tokens(a)),kw=[];
      for(const t of tokens(source)){if(answerTokens.has(t)||kw.includes(t))continue;kw.push(t);if(kw.length===6)break;}
      s=kw.length>=2?`indikator utama berkaitan dengan ${kw.join(', ')}`:`indikator utama belum mendukung penyelesaian secara otomatis`;
    }
    return s;
  }
  const choose=(arr,seed,count)=>{const pool=unique(arr),out=[];let n=0;while(pool.length&&out.length<count){const i=hash(`${seed}:${n++}`)%pool.length;out.push(pool.splice(i,1)[0])}return out};
  const optionKey=o=>unique(o||[]).map(norm).sort().join('|');

  const focus={
    1:['pimpinan cabang','menilai fungsi bank dalam aktivitas ekonomi','kepentingan komersial tidak boleh mengaburkan fungsi intermediasi','menjaga fungsi bank tetap tepat'],2:['funding officer','mencocokkan produk simpanan dengan kebutuhan dana','likuiditas dan tujuan penempatan harus dipertimbangkan bersamaan','memilih solusi funding yang sesuai kebutuhan'],3:['analis kredit','menilai kebutuhan pembiayaan dan kemampuan bayar','target ekspansi tidak boleh mengurangi kualitas analisis','menjaga keputusan kredit tetap prudent'],4:['compliance officer','menilai kepatuhan keputusan operasional','kecepatan layanan tidak menghapus kewajiban regulasi','menerapkan ketentuan yang tepat'],5:['ecosystem manager','memetakan hubungan antar pelaku usaha','peluang bisnis harus lahir dari kebutuhan ekosistem yang nyata','memilih intervensi bank yang memperkuat ekosistem'],6:['product manager digital','menilai prioritas transformasi layanan','teknologi harus memberi nilai tanpa melemahkan keamanan','memilih inovasi yang relevan'],7:['customer service','menjelaskan fitur, manfaat, biaya, dan risiko produk','target penjualan tidak boleh membuat informasi penting terlewat','membantu nasabah membuat keputusan yang informed'],8:['petugas edukasi','meningkatkan pemahaman nasabah','edukasi tidak boleh berubah menjadi sekadar promosi','mendorong keputusan nasabah yang lebih baik'],9:['complaint officer','menangani pengaduan dan menilai tindak lanjut','jawaban cepat tetap harus berbasis verifikasi','menyelesaikan keluhan secara adil dan terdokumentasi'],10:['customer service','memproses pembukaan atau penutupan rekening','kecepatan proses tidak boleh menggantikan verifikasi','menjaga rekening diproses secara sah dan akurat'],11:['supervisor transaksi','memproses transaksi tunai dan non tunai','antrean tinggi tidak boleh mempersingkat validasi','menjamin transaksi akurat, sah, dan tercatat'],12:['back office officer','mengelola dokumen dan administrasi perbankan','volume dokumen tinggi tetapi jejak audit harus lengkap','menjaga administrasi dapat ditelusuri'],13:['petugas valuta asing','menilai transaksi valuta asing','perubahan kurs membuat waktu dan tujuan transaksi sama-sama penting','menyesuaikan instrumen valas dengan kebutuhan'],14:['trade finance officer','menelaah dokumen trade service dan trade finance','deadline ketat tidak boleh membuat discrepancy diabaikan','menjaga keputusan trade sesuai syarat dokumen'],15:['akuntan perusahaan','menilai perlakuan akuntansi transaksi perusahaan','target pelaporan tidak boleh mengubah substansi transaksi','menyajikan laporan yang andal'],16:['akuntan bank','membukukan transaksi perbankan','volume transaksi tinggi tetapi klasifikasi akun harus konsisten','mencerminkan substansi transaksi bank secara tepat'],17:['risk officer','menilai eksposur sebelum keputusan bisnis','peluang bisnis harus tetap berada dalam appetite dan limit','memilih mitigasi yang proporsional'],18:['fraud risk officer','menelaah indikasi fraud dan kelemahan kontrol','tindakan cepat tidak boleh merusak bukti','menghentikan kerugian sekaligus menjaga integritas investigasi'],19:['BCM coordinator','menentukan prioritas pemulihan layanan','kecepatan pemulihan tidak boleh mengorbankan keselamatan','memulihkan proses kritikal secara aman'],20:['data protection officer','menilai penggunaan data pribadi','kebutuhan bisnis tidak otomatis membenarkan semua pemrosesan data','melindungi hak dan keamanan data pribadi'],21:['KYC analyst','memverifikasi profil dan tujuan hubungan usaha','target onboarding tidak boleh menjadikan KYC formalitas','mengenali nasabah secara memadai'],22:['legal officer','menelaah dasar hukum dan dokumen bank','kepentingan bisnis tetap memerlukan posisi hukum yang kuat','melindungi hak dan kewajiban bank'],23:['risk manager','menilai pembagian peran three lines of defense','fungsi kontrol tidak boleh menggantikan ownership risiko bisnis','menempatkan tanggung jawab pada lini yang tepat'],24:['AML analyst','menilai red flag dan pola transaksi','nominal saja tidak cukup untuk menilai kewajaran','menangani risiko APU/PPT berbasis profil dan pola'],25:['supervisor bisnis','menilai kasus operasional lintas fungsi','keputusan cepat tetap harus memiliki dasar yang dapat diuji','memilih respons paling defensible']
  };
  const nupmkMap={26:7,27:8,28:9,29:10,30:11,31:12,32:13,33:14,34:16,35:22};
  function ctx(mid){const base=focus[nupmkMap[mid]||mid]||focus[25];if(mid<26)return base;return['petugas pelaksana',`${base[1]} sebagai bagian dari tanggung jawab unit`,`${base[2]}; urutan kerja dan bukti pelaksanaan juga harus dapat ditelusuri`,`${base[3]} melalui langkah kerja yang benar dan terdokumentasi`];}

  const modes=['decision','priority','control','correction','review','remediation','next','evidence'];
  const lenses=['direct','verify','escalate','prevent'];
  const modeVerb={decision:'dasar keputusan',priority:'prioritas tindakan',control:'kontrol utama',correction:'koreksi keputusan',review:'inti temuan review',remediation:'tindakan remediasi',next:'langkah lanjutan',evidence:'dasar evaluasi'};
  function wrapConcept(mode,lens,c){
    if(lens==='verify')return `Memverifikasi ${c} melalui bukti yang relevan sebelum menetapkan ${modeVerb[mode]}`;
    if(lens==='escalate')return `Menahan proses dan mengeskalasi bila ${c} belum terpenuhi sebelum ${modeVerb[mode]} ditetapkan`;
    if(lens==='prevent')return `Menjadikan ${c} sebagai pengendalian berulang yang terdokumentasi untuk mendukung ${modeVerb[mode]}`;
    const direct={decision:`Menjadikan ${c} sebagai dasar keputusan sebelum proses dilanjutkan`,priority:`Memprioritaskan ${c} sebelum target lain dikejar`,control:`Menetapkan ${c} sebagai kontrol utama sebelum otorisasi`,correction:`Mengoreksi keputusan awal dengan menerapkan ${c}`,review:`Menetapkan ${c} sebagai inti temuan review`,remediation:`Menutup kelemahan proses melalui ${c}`,next:`Menjadikan ${c} sebagai langkah lanjutan sebelum keputusan final`,evidence:`Menggunakan ${c} sebagai dasar evaluasi yang paling menentukan`};
    return direct[mode];
  }
  const lensSentence={direct:'Fokus keputusan adalah tindakan yang paling tepat pada kondisi saat ini.',verify:'Supervisor meminta bukti yang cukup sebelum keputusan dapat dipertahankan saat direview.',escalate:'Prasyarat utama belum seluruhnya terpenuhi sehingga keputusan menahan atau mengeskalasi proses harus dipertimbangkan.',prevent:'Unit tidak hanya harus menyelesaikan kasus saat ini, tetapi juga mencegah pola kesalahan yang sama terulang.'};
  function stem(mode,lens,a,s,p,o,c){
    const core={decision:`${cap(a)} sedang ${s}. Telaah awal menunjukkan bahwa ${lowerFirst(c)} Pada saat yang sama, ${p}.`,priority:`${cap(a)} harus ${s} dengan waktu terbatas. Temuan yang paling material menunjukkan bahwa ${lowerFirst(c)} Karena ${p}.`,control:`Sebelum otorisasi, ${a} yang sedang ${s} menemukan bahwa ${lowerFirst(c)} Sementara ${p}.`,correction:`Keputusan awal saat ${a} ${s} ternyata tidak memadai. Review berikutnya menunjukkan bahwa ${lowerFirst(c)} Dengan kondisi ${p}.`,review:`Dalam quality review atas pekerjaan ketika ${a} ${s}, ditemukan bahwa ${lowerFirst(c)} Reviewer perlu membedakan akar masalah dari gejala, sementara ${p}.`,remediation:`Setelah masalah muncul ketika ${a} ${s}, analisis menunjukkan bahwa ${lowerFirst(c)} Agar masalah tidak berulang meski ${p}.`,next:`${cap(a)} telah menyelesaikan tahap awal saat ${s}. Temuan berikutnya menunjukkan bahwa ${lowerFirst(c)} Mengingat ${p}.`,evidence:`${cap(a)} menerima beberapa informasi yang saling bersaing ketika ${s}. Fakta paling relevan menunjukkan bahwa ${lowerFirst(c)} Karena ${p}.`}[mode];
    const ask={decision:`Keputusan mana yang paling dapat dipertanggungjawabkan agar ${o}?`,priority:`Tindakan apa yang harus didahulukan agar ${o}?`,control:`Kontrol apa yang paling relevan agar ${o}?`,correction:`Koreksi apa yang paling tepat agar ${o}?`,review:`Kesimpulan mana yang paling kuat agar ${o}?`,remediation:`Perbaikan apa yang paling efektif untuk ${o}?`,next:`Langkah lanjutan apa yang paling tepat agar ${o}?`,evidence:`Dasar evaluasi mana yang seharusnya paling menentukan agar ${o}?`}[mode];
    return `${core} ${lensSentence[lens]} ${ask}`;
  }

  const fallbackConcepts=['target kecepatan layanan sebagai satu-satunya dasar','persetujuan informal tanpa validasi memadai','penundaan proses tanpa analisis atas penyebab utama','eskalasi otomatis tanpa menilai kewenangan dan bukti','pengabaian kontrol karena transaksi dianggap rutin','penggunaan asumsi lama tanpa memperbarui informasi yang relevan'];
  try{const k='gbpHotsQualityV22';if(!localStorage.getItem(k)){localStorage.removeItem('gbpDbBankV14');localStorage.removeItem('gbpDbBankV20');localStorage.removeItem('gbpQuestionSeenV20');localStorage.setItem(k,'1')}}catch(e){}

  const authored=bank.filter(q=>!q.generatedVariant&&!q.substantiveVariant&&!q.qualityGenerated);
  const byModule=new Map();for(const q of authored){const mid=Number(q.moduleId);if(!byModule.has(mid))byModule.set(mid,[]);byModule.get(mid).push(q)}
  const output=[],globalStem=new Set(),globalOptions=new Set();
  function add(q,sourceQ,sourceE){
    q.question=cap(sanitize(q.question));q.options=(q.options||[]).map(x=>cap(sanitize(x)));q.answer=cap(sanitize(q.answer));q.explanation=cap(sanitize(q.explanation));
    if(q.question.length<145||q.question.length>560||badPrompt.test(q.question)||metaTest.test(q.question))return false;
    if(sourceQ&&(jac(q.question,sourceQ)>.60||copiedPhrase(q.question,sourceQ,7)))return false;
    if(sourceE&&copiedPhrase(q.question,sourceE,8))return false;
    if(q.options.length!==4||new Set(q.options.map(norm)).size!==4||!q.options.includes(q.answer))return false;
    const sk=norm(q.question),ok=optionKey(q.options);if(!sk||!ok||globalStem.has(sk)||globalOptions.has(ok))return false;
    globalStem.add(sk);globalOptions.add(ok);output.push(q);return true;
  }

  for(const [mid,items] of byModule){
    const [actor,scene,pressure,objective]=ctx(mid),answerPool=unique(items.map(q=>sanitize(q.answer))),wrongPool=unique(items.flatMap(q=>(q.options||[]).filter(x=>norm(x)!==norm(q.answer)).map(sanitize)));
    let made=0;
    for(const lens of lenses){
      for(const mode of modes){
        for(let r=0;r<items.length&&made<MAX_PER_MODULE;r++){
          const root=items[r],correct=sanitize(root.answer),sourceQ=clean(root.question),sourceE=clean(root.explanation||root.question),seed=`V22:${mid}:${rootId(root)}:${mode}:${lens}`;
          const cue=cueFrom(sourceE,correct);if(cue.length<25)continue;
          const candidates=unique([...choose((root.options||[]).filter(x=>norm(x)!==norm(root.answer)).map(sanitize),seed+':root',3),...choose(answerPool.filter(x=>norm(x)!==norm(correct)),seed+':ans',3),...choose(wrongPool.filter(x=>norm(x)!==norm(correct)),seed+':wrong',3),...choose(fallbackConcepts,seed+':fallback',3)]).filter(x=>norm(x)!==norm(correct));
          const distractors=candidates.slice(0,3);if(distractors.length<3)continue;
          const concepts=[correct,...distractors],options=concepts.map(c=>wrapConcept(mode,lens,c)),answer=wrapConcept(mode,lens,correct),question=stem(mode,lens,actor,scene,pressure,objective,cue);
          const explanation=`Pilihan terbaik berpusat pada ${correct}. ${cueFrom(sourceE,correct)} Dalam kasus ini, pendekatan tersebut paling konsisten dengan tujuan keputusan dan kontrol yang diuji.`;
          const q={...root,id:`V22-M${mid}-${rootId(root)}-${mode}-${lens}`,question,options,answer,explanation,questionType:'Analisis Kasus',difficulty:(hash(seed)%4===0)?'Expert':'Challenge',skill:'Analisis & Keputusan',rootQuestionId:rootId(root),qualityGenerated:true,qualityTier:'HOTS',variantMode:`${mode}-${lens}`,optionConcepts:concepts,conceptSignature:`${rootId(root)}|${mode}|${lens}|${concepts.map(norm).sort().join('|')}`,source:sanitize(root.source)};
          if(add(q,sourceQ,sourceE))made++;
        }
      }
    }
  }

  bank.splice(0,bank.length,...output);
  window.__GBP_SOURCE_BANK__=bank.map(q=>({...q,options:[...(q.options||[])],optionConcepts:[...(q.optionConcepts||[])]}));
})();