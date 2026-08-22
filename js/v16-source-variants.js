(() => {
  const bank=window.__GBP_SOURCE_BANK__||window.QUESTION_BANK||[];
  if(!Array.isArray(bank)||!bank.length)return;

  const clean=s=>String(s??'').replace(/\s+/g,' ').trim();
  const norm=s=>clean(s).toLocaleLowerCase('id-ID').replace(/[^a-z0-9à-öø-ÿ]+/giu,' ').replace(/\s+/g,' ').trim();
  const hash=s=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
  const unique=a=>[...new Set((a||[]).map(clean).filter(Boolean))];
  const clip=(s,n=190)=>{s=clean(s);return s.length<=n?s:s.slice(0,n).replace(/\s+\S*$/,'').replace(/[,:;.-]+$/,'').trim()+'.'};
  const rootId=q=>String(q?.rootQuestionId||q?.id||'');
  const lowerFirst=s=>{s=clean(s);return s?s.charAt(0).toLocaleLowerCase('id-ID')+s.slice(1):s};
  const cap=s=>String(s??'').replace(/^(\s*[^A-Za-zÀ-ÖØ-öø-ÿ]*)([a-zà-öø-ÿ])/u,(_,a,b)=>a+b.toLocaleUpperCase('id-ID'));
  const metaRe=/\b(?:dari|berdasarkan|menurut|sesuai|di dalam)\s+(?:materi|slide|modul)|\bmateri\s+(?:ini|tersebut|menjelaskan|menempatkan|menyebutkan)|\bslide\s+(?:ini|tersebut)|\bmodul\s+(?:ini|tersebut)\b/gi;
  const badPromptRe=/\b(?:apa itu|disebut apakah|manakah satu pilihan yang benar|pilih satu pernyataan yang tepat|pertanyaan acuan|dari materi|berdasarkan materi)\b/i;
  const stop=new Set('yang dan atau untuk pada dalam dengan dari ke di bank nasabah proses tahapan kerja suatu sebuah sebagai harus perlu paling tepat tersebut ini itu agar serta adalah dilakukan melakukan kondisi keputusan petugas tim unit saat karena ketika jika akan bisa dapat oleh menjadi sedang sebelum setelah'.split(' '));
  const tokens=s=>new Set(norm(s).split(' ').filter(x=>x.length>2&&!stop.has(x)));
  const jac=(a,b)=>{const A=tokens(a),B=tokens(b);if(!A.size||!B.size)return 0;let n=0;for(const x of A)if(B.has(x))n++;return n/(A.size+B.size-n)};
  const copiedPhrase=(a,b,size=8)=>{const A=norm(a).split(' ').filter(Boolean),B=norm(b).split(' ').filter(Boolean);if(A.length<size||B.length<size)return false;const set=new Set();for(let i=0;i<=A.length-size;i++)set.add(A.slice(i,i+size).join(' '));for(let i=0;i<=B.length-size;i++)if(set.has(B.slice(i,i+size).join(' ')))return true;return false};
  const sanitize=s=>clean(String(s??'')
    .replace(metaRe,'')
    .replace(/\b(?:materi|slide|modul)\b/gi,'')
    .replace(/\bhal\.?\s*\d+(?:\s*[–-]\s*\d+)?\b/gi,'')
    .replace(/\s+([,.!?;:])/g,'$1'));
  const phraseMap=[
    [/\bmerupakan\b/gi,'berfungsi sebagai'],[/\bmenekankan\b/gi,'berfokus pada'],[/\bdigunakan\b/gi,'dipakai'],
    [/\bmenunjukkan\b/gi,'mengindikasikan'],[/\bmemastikan\b/gi,'menjaga agar'],[/\bmelaksanakan\b/gi,'menjalankan'],
    [/\bmemberikan\b/gi,'menyediakan'],[/\bmengelola\b/gi,'mengendalikan'],[/\bmengurangi\b/gi,'menekan'],
    [/\bmembutuhkan\b/gi,'memerlukan'],[/\bharus\b/gi,'perlu'],[/\bsesuai\b/gi,'selaras dengan'],
    [/\bterkait\b/gi,'berkaitan dengan'],[/\bproses\b/gi,'alur kerja'],[/\brisiko\b/gi,'eksposur'],
    [/\bmenilai\b/gi,'mengevaluasi'],[/\bmemeriksa\b/gi,'menelaah'],[/\bmenentukan\b/gi,'menetapkan']
  ];
  function paraphrase(raw,answer,seed){
    let s=sanitize(raw),a=clean(answer);
    if(a.length>=4){try{s=s.replace(new RegExp(a.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'ig'),'pendekatan tersebut')}catch(e){}}
    for(const [r,v] of phraseMap)s=s.replace(r,v);
    s=s.replace(/^\s*(?:jawaban|konsep|produk|tindakan|prinsip)\s+(?:yang\s+)?(?:tepat|benar)\s+(?:adalah|ialah)\s*[:,-]?\s*/i,'');
    const parts=s.split(/(?<=[.!?;])\s+/).map(clean).filter(Boolean);
    if(parts.length>1&&hash(seed)%2)s=[...parts.slice(1),parts[0]].join(' ');
    return clip(s,185);
  }
  const choose=(arr,seed,count)=>{const pool=unique(arr),out=[];let n=0;while(pool.length&&out.length<count){const idx=hash(`${seed}:${n++}`)%pool.length;out.push(pool.splice(idx,1)[0])}return out};

  const defaultProfile={
    actors:['supervisor cabang','petugas operasional','analis bisnis'],
    scenes:['menelaah transaksi yang memerlukan keputusan','memeriksa pekerjaan sebelum otorisasi','menilai permintaan yang harus segera ditindaklanjuti'],
    pressures:['target layanan tetap harus dipenuhi tanpa melemahkan kontrol','informasi yang tersedia belum seluruhnya konsisten','keputusan harus dapat dipertanggungjawabkan saat direview'],
    objectives:['menjaga ketepatan keputusan dan kualitas kontrol','menyelesaikan kebutuhan nasabah tanpa menambah risiko','memastikan langkah berikutnya selaras dengan tujuan proses']
  };
  const profiles={
    1:{actors:['pimpinan cabang','analis strategi perbankan','relationship manager'],scenes:['menilai peran bank dalam aktivitas ekonomi nasabah','membandingkan dampak beberapa fungsi perbankan','menentukan fungsi bank yang paling relevan bagi kebutuhan bisnis'],pressures:['target pertumbuhan tidak boleh mengorbankan fungsi intermediasi','dampak terhadap likuiditas dan kepercayaan harus dipertimbangkan bersamaan','pilihan yang terlihat komersial belum tentu paling sesuai dengan fungsi bank'],objectives:['menjaga fungsi intermediasi berjalan tepat','memilih peran bank yang paling sesuai dengan kebutuhan ekonomi','menyeimbangkan fungsi komersial dan kepercayaan publik']},
    2:{actors:['funding officer','customer service','pimpinan unit'],scenes:['menilai kebutuhan penempatan dana nasabah','mencocokkan karakteristik simpanan dengan kebutuhan nasabah','menelaah struktur dana sebelum menawarkan produk'],pressures:['nasabah menginginkan fleksibilitas tetapi tetap memperhatikan imbal hasil','likuiditas nasabah tidak boleh terganggu oleh pilihan produk','pilihan produk harus sesuai pola penggunaan dana'],objectives:['memilih produk dana berdasarkan kebutuhan riil','menjaga kecocokan tenor, likuiditas, dan tujuan penempatan','menghindari rekomendasi produk yang tidak sesuai profil kebutuhan']},
    3:{actors:['relationship manager','analis kredit','pemutus kredit'],scenes:['menilai kebutuhan pembiayaan debitur','menganalisis kemampuan bayar dan tujuan penggunaan dana','menelaah struktur kredit sebelum keputusan'],pressures:['target ekspansi harus tetap tunduk pada kualitas kredit','kebutuhan dana mendesak tidak menghilangkan kewajiban analisis','sumber pembayaran dan tujuan penggunaan harus konsisten'],objectives:['menetapkan struktur kredit yang prudent','memastikan pembiayaan sesuai kebutuhan dan kemampuan bayar','menjaga kualitas keputusan kredit']},
    4:{actors:['compliance officer','pimpinan cabang','petugas operasional'],scenes:['menentukan otoritas dan ketentuan yang berlaku','menilai kepatuhan suatu tindakan perbankan','memeriksa apakah keputusan operasional sejalan dengan regulasi'],pressures:['kecepatan layanan tidak boleh mengabaikan kewajiban regulator','ketentuan internal dan eksternal harus dibedakan secara tepat','keputusan harus tetap auditable'],objectives:['memastikan kepatuhan terhadap otoritas yang tepat','menerapkan regulasi secara proporsional','mencegah pelanggaran akibat salah memahami kewenangan']},
    5:{actors:['ecosystem manager','relationship manager','pimpinan cabang'],scenes:['memetakan hubungan antar pelaku dalam suatu ekosistem','menentukan titik masuk bank pada rantai transaksi','menilai peluang bisnis dari hubungan pemasok dan pembeli'],pressures:['peluang pendapatan harus dibedakan dari kebutuhan ekosistem yang nyata','solusi bank harus menghubungkan arus transaksi bukan sekadar menjual produk','ketergantungan antar pelaku harus diperhitungkan'],objectives:['memilih intervensi bank yang memperkuat ekosistem','menghubungkan kebutuhan transaksi dengan solusi bank','menemukan peluang yang lahir dari hubungan antar entitas']},
    6:{actors:['product manager digital','analis transformasi','pimpinan bisnis'],scenes:['menilai perubahan perilaku nasabah terhadap layanan digital','menentukan prioritas transformasi layanan perbankan','mengevaluasi inovasi sebelum diterapkan'],pressures:['adopsi teknologi harus tetap menghasilkan nilai bagi nasabah','efisiensi tidak boleh mengurangi keamanan dan kepercayaan','tren teknologi tidak selalu relevan dengan kebutuhan bisnis'],objectives:['memilih inovasi yang memberi nilai nyata','menyeimbangkan transformasi, keamanan, dan pengalaman nasabah','menghindari adopsi teknologi tanpa manfaat bisnis yang jelas']},
    7:{actors:['customer service','service supervisor','petugas frontliner'],scenes:['menjelaskan produk kepada calon nasabah','menanggapi pertanyaan tentang fitur dan biaya layanan','menilai informasi apa yang harus disampaikan sebelum nasabah memilih produk'],pressures:['penjelasan harus akurat sekaligus mudah dipahami','keinginan menutup penjualan tidak boleh membuat informasi penting terlewat','istilah teknis perlu diterjemahkan tanpa mengubah substansi'],objectives:['memberikan informasi yang lengkap dan dapat dipahami','membantu nasabah membuat keputusan yang informed','menghindari misleading information']},
    8:{actors:['petugas edukasi','customer service','supervisor layanan'],scenes:['memberikan edukasi kepada nasabah yang belum memahami produk','menilai apakah nasabah benar-benar memahami risiko dan manfaat','menentukan metode edukasi untuk kelompok nasabah berbeda'],pressures:['edukasi tidak boleh berubah menjadi sekadar promosi','tingkat literasi nasabah berbeda-beda','pesan harus dipahami bukan hanya disampaikan'],objectives:['meningkatkan pemahaman nasabah','menyesuaikan edukasi dengan kebutuhan penerima','memastikan nasabah mampu mengambil keputusan yang lebih baik']},
    9:{actors:['complaint officer','customer service','service supervisor'],scenes:['menangani keluhan atas transaksi atau layanan','menilai prioritas tindak lanjut pengaduan','memeriksa penyelesaian keluhan sebelum disampaikan kepada nasabah'],pressures:['nasabah meminta jawaban cepat sementara fakta masih diverifikasi','penyelesaian harus adil dan terdokumentasi','komunikasi empatik tidak boleh menggantikan investigasi'],objectives:['menyelesaikan pengaduan secara tepat dan terukur','menjaga fairness sekaligus kualitas investigasi','memberikan respons yang dapat dipertanggungjawabkan']},
    10:{actors:['customer service','supervisor operasional','petugas pembukaan rekening'],scenes:['memproses pembukaan rekening baru','menelaah permintaan penutupan rekening','memeriksa kelengkapan data sebelum rekening diaktifkan'],pressures:['nasabah meminta proses cepat tetapi persyaratan belum seluruhnya tervalidasi','akurasi data harus dijaga sejak awal','otorisasi tidak boleh dilakukan sebelum syarat utama terpenuhi'],objectives:['memastikan rekening diproses secara sah dan akurat','menjaga kelengkapan verifikasi sebelum aktivasi atau penutupan','menghindari kesalahan administrasi rekening']},
    11:{actors:['teller','petugas operasional','supervisor transaksi'],scenes:['memproses transaksi tunai bernilai material','menangani instruksi transfer non tunai','menelaah transaksi sebelum otorisasi akhir'],pressures:['antrean tinggi tetapi validasi transaksi tidak boleh dipersingkat','instruksi nasabah harus cocok dengan bukti dan kewenangan','kesalahan kecil dapat berdampak langsung pada dana nasabah'],objectives:['menjamin transaksi akurat, sah, dan tercatat','memilih kontrol transaksi yang relevan sebelum eksekusi','mencegah kesalahan operasional pada perpindahan dana']},
    12:{actors:['petugas administrasi','supervisor operasional','back office officer'],scenes:['mengelola dokumen dan pencatatan administrasi','menelusuri dokumen pendukung suatu transaksi','memeriksa konsistensi arsip sebelum proses ditutup'],pressures:['volume dokumen tinggi tetapi jejak audit harus tetap lengkap','dokumen fisik dan elektronik harus konsisten','penyelesaian cepat tidak boleh menghilangkan bukti administrasi'],objectives:['menjaga administrasi lengkap dan dapat ditelusuri','memastikan dokumentasi mendukung setiap tindakan operasional','mengurangi risiko akibat pencatatan yang tidak konsisten']},
    13:{actors:['petugas valuta asing','treasury officer','supervisor operasional'],scenes:['memproses kebutuhan valuta asing nasabah','menilai jenis transaksi valas yang sesuai kebutuhan','memeriksa kurs dan instruksi sebelum transaksi dilakukan'],pressures:['perubahan kurs membuat waktu keputusan menjadi penting','tujuan transaksi harus jelas sebelum instrumen dipilih','risiko nilai tukar tidak boleh diabaikan'],objectives:['memilih transaksi valas sesuai kebutuhan dan risiko','menjaga akurasi eksekusi valuta asing','menyesuaikan instrumen dengan tujuan transaksi']},
    14:{actors:['trade finance officer','trade service officer','supervisor trade'],scenes:['memeriksa dokumen transaksi perdagangan','menilai discrepancy sebelum dokumen diproses lebih lanjut','menentukan langkah atas fasilitas trade finance'],pressures:['deadline presentasi dokumen ketat tetapi ketidaksesuaian tidak boleh diabaikan','kepentingan importir dan eksportir harus dibaca melalui dokumen yang berlaku','keputusan pembayaran atau pembiayaan bergantung pada pemenuhan syarat'],objectives:['menjaga ketepatan proses trade berdasarkan dokumen','memilih tindakan yang tepat atas discrepancy dan kewajiban pembayaran','mengendalikan risiko pada trade service dan trade finance']},
    15:{actors:['akuntan perusahaan','finance manager','reviewer laporan'],scenes:['menilai pencatatan transaksi perusahaan','memeriksa dampak transaksi pada laporan keuangan','menentukan perlakuan akuntansi yang tepat'],pressures:['target pelaporan ketat tetapi klasifikasi akun harus benar','substansi transaksi harus lebih penting daripada label administratif','kesalahan pengakuan dapat mengubah gambaran kinerja'],objectives:['menyajikan transaksi secara tepat dalam laporan','menjaga konsistensi pengakuan dan klasifikasi','menghasilkan informasi keuangan yang andal']},
    16:{actors:['akuntan bank','finance officer','reviewer keuangan bank'],scenes:['membukukan transaksi perbankan','menilai dampak transaksi pada laporan bank','memeriksa pencatatan pendapatan, biaya, aset, atau kewajiban'],pressures:['volume transaksi tinggi tetapi klasifikasi harus konsisten','karakteristik produk bank memengaruhi pencatatan','kesalahan jurnal dapat memengaruhi laporan dan rasio'],objectives:['mencatat transaksi bank secara akurat','menjaga laporan keuangan bank mencerminkan substansi transaksi','menghindari salah klasifikasi akun perbankan']},
    17:{actors:['risk officer','business manager','risk champion'],scenes:['menilai risiko sebelum keputusan bisnis dijalankan','menentukan respons atas eksposur yang meningkat','mereview apakah kontrol sejalan dengan risk appetite'],pressures:['peluang bisnis menarik tetapi eksposur melampaui toleransi yang nyaman','kontrol yang terlalu lemah dan terlalu ketat sama-sama memiliki biaya','keputusan harus konsisten dengan budaya risiko'],objectives:['menjaga keputusan dalam appetite dan limit','memilih mitigasi yang proporsional terhadap risiko','membangun perilaku sadar risiko dalam keputusan bisnis']},
    18:{actors:['fraud investigator','supervisor operasional','fraud risk officer'],scenes:['menelaah indikasi fraud pada suatu transaksi','menentukan respons awal atas red flag','menilai kelemahan kontrol yang memungkinkan fraud'],pressures:['bukti awal belum lengkap tetapi potensi kerugian dapat membesar','kerahasiaan investigasi harus tetap terjaga','tindakan cepat tidak boleh merusak bukti'],objectives:['menghentikan potensi kerugian sekaligus menjaga integritas investigasi','mengidentifikasi kontrol pencegahan dan deteksi yang tepat','mencegah pola fraud berulang']},
    19:{actors:['BCM coordinator','pimpinan unit','petugas K3'],scenes:['merespons gangguan operasional yang menghambat layanan','menilai prioritas pemulihan proses kritikal','menentukan tindakan keselamatan sebelum operasi dilanjutkan'],pressures:['layanan penting harus pulih cepat tetapi keselamatan tidak boleh dikompromikan','sumber daya pemulihan terbatas','keputusan awal menentukan durasi gangguan'],objectives:['memulihkan layanan kritikal secara aman','menjaga kesinambungan bisnis dan keselamatan kerja','memilih prioritas pemulihan berdasarkan dampak']},
    20:{actors:['data protection officer','petugas operasional','supervisor layanan'],scenes:['menilai penggunaan data pribadi nasabah','memeriksa permintaan akses atau pembagian data','menentukan perlakuan atas data yang tidak lagi diperlukan'],pressures:['kebutuhan bisnis tidak otomatis menjadi dasar penggunaan seluruh data','akses internal tetap harus dibatasi sesuai kebutuhan','insiden kecil dapat berdampak pada hak subjek data'],objectives:['memproses data secara sah dan proporsional','membatasi penggunaan data pada tujuan yang valid','melindungi hak dan keamanan data pribadi']},
    21:{actors:['KYC analyst','customer service','compliance officer'],scenes:['memverifikasi profil calon nasabah','menilai konsistensi data identitas dan tujuan hubungan usaha','menentukan tindak lanjut atas informasi nasabah yang tidak memadai'],pressures:['target onboarding tinggi tetapi identifikasi tidak boleh bersifat formalitas','profil transaksi harus masuk akal terhadap informasi nasabah','ketidaksesuaian data memerlukan klarifikasi sebelum hubungan dilanjutkan'],objectives:['mengenali nasabah secara memadai','menjaga profil dan tujuan hubungan usaha konsisten','mencegah onboarding berbasis informasi yang tidak cukup']},
    22:{actors:['legal officer','pimpinan cabang','petugas administrasi kredit'],scenes:['menelaah dasar hukum suatu tindakan bank','memeriksa dokumen yang menimbulkan hak dan kewajiban','menentukan respons atas potensi sengketa'],pressures:['kepentingan bisnis harus tetap memiliki dasar hukum yang kuat','dokumen yang tidak tepat dapat melemahkan posisi bank','otoritas penandatangan dan keabsahan dokumen perlu dipastikan'],objectives:['menjaga tindakan bank memiliki dasar hukum','melindungi posisi hukum melalui dokumentasi yang tepat','mengurangi risiko sengketa dan kelemahan legal']},
    23:{actors:['business owner','risk manager','internal auditor'],scenes:['menilai pembagian peran pengendalian','menentukan siapa yang bertanggung jawab atas suatu risiko','mereview independensi fungsi assurance'],pressures:['fungsi pengendalian tidak boleh menggantikan kepemilikan risiko oleh bisnis','independensi assurance harus tetap terjaga','duplikasi kontrol dapat terjadi bila peran lini tidak jelas'],objectives:['menempatkan tanggung jawab pada lini yang tepat','menjaga independensi pengawasan dan assurance','mencegah gap atau tumpang tindih pengendalian']},
    24:{actors:['AML analyst','compliance officer','petugas operasional'],scenes:['menilai pola transaksi yang tidak sesuai profil','menentukan tindak lanjut atas red flag APU/PPT','mereview informasi sebelum keputusan pelaporan atau eskalasi'],pressures:['nominal transaksi saja tidak cukup untuk menilai kewajaran','indikator mencurigakan harus dianalisis dalam konteks profil dan pola','kerahasiaan proses analisis wajib dijaga'],objectives:['mengidentifikasi dan menangani transaksi mencurigakan secara tepat','menghubungkan red flag dengan profil dan pola transaksi','menjaga kepatuhan APU/PPT tanpa mengandalkan satu indikator']}
  };
  const nupmkMap={26:7,27:8,28:9,29:10,30:11,31:12,32:13,33:14,34:16,35:22};
  function profile(mid){const base=profiles[nupmkMap[mid]||mid]||defaultProfile;if(mid<26)return base;return{...base,pressures:[...base.pressures,'asesor menilai bukan hanya hasil akhir tetapi ketepatan langkah kerja'],objectives:[...base.objectives,'menunjukkan keputusan kerja yang memenuhi kriteria unjuk kerja']}}

  const wrappers={
    decision:[c=>`Menjadikan ${c} sebagai dasar keputusan sebelum langkah berikutnya`,c=>`Mengambil keputusan dengan bertumpu pada ${c}`,c=>`Mengalihkan penyelesaian ke ${c} sebelum proses diteruskan`],
    correction:[c=>`Mengoreksi keputusan awal dengan menerapkan ${c}`,c=>`Mengganti pendekatan awal dan menggunakan ${c}`,c=>`Membatalkan asumsi awal lalu beralih ke ${c}`],
    priority:[c=>`Memprioritaskan ${c} sebelum target lain dikejar`,c=>`Menempatkan ${c} sebagai tindakan pertama`,c=>`Mendahulukan ${c} sebelum proses dilanjutkan`],
    control:[c=>`Menetapkan ${c} sebagai kontrol utama`,c=>`Menggunakan ${c} sebagai titik pengendalian sebelum otorisasi`,c=>`Menerapkan ${c} untuk mengendalikan risiko utama`],
    review:[c=>`Menetapkan ${c} sebagai inti temuan review`,c=>`Menyimpulkan bahwa akar masalah berada pada ${c}`,c=>`Mengklasifikasikan isu utama sebagai ${c}`],
    remediation:[c=>`Memperbaiki proses dengan menerapkan ${c}`,c=>`Mencegah pengulangan melalui ${c}`,c=>`Menutup kelemahan utama dengan ${c}`],
    next:[c=>`Melanjutkan proses dengan ${c} sebagai langkah berikutnya`,c=>`Menetapkan ${c} sebagai langkah lanjutan yang diperlukan`,c=>`Melakukan ${c} sebelum keputusan final dibuat`],
    evidence:[c=>`Menggunakan ${c} sebagai dasar bukti yang paling menentukan`,c=>`Menilai ${c} sebagai informasi yang paling material`,c=>`Memastikan ${c} sebelum menyimpulkan keputusan`]
  };
  const modes=Object.keys(wrappers);

  try{
    const MIGRATION='gbpHotsQualityV20';
    if(!localStorage.getItem(MIGRATION)){
      localStorage.removeItem('gbpDbBankV14');
      localStorage.removeItem('gbpQuestionTextSeenV17');
      localStorage.setItem(MIGRATION,'1');
    }
  }catch(e){}

  const authored=bank.filter(q=>!q.generatedVariant&&!q.substantiveVariant&&!q.qualityGenerated);
  const byModule=new Map();
  for(const q of authored){const mid=Number(q.moduleId);if(!byModule.has(mid))byModule.set(mid,[]);byModule.get(mid).push(q)}

  const output=[];
  const exactStem=new Set(),exactOptions=new Set();
  const moduleStems=new Map();
  function add(q,sourceQ,sourceE){
    q.question=cap(sanitize(q.question));q.options=(q.options||[]).map(x=>cap(sanitize(x)));q.answer=cap(sanitize(q.answer));q.explanation=cap(sanitize(q.explanation));
    if(q.question.length<145||q.question.length>560||badPromptRe.test(q.question)||/\b(?:materi|slide|modul)\b/i.test(q.question))return false;
    if(sourceQ&&(jac(q.question,sourceQ)>.58||copiedPhrase(q.question,sourceQ,7)))return false;
    if(sourceE&&copiedPhrase(q.question,sourceE,8))return false;
    if(q.options.length!==4||new Set(q.options.map(norm)).size!==4||!q.options.includes(q.answer))return false;
    const sk=norm(q.question),ok=[...q.options].map(norm).sort().join('|');if(!sk||!ok||exactStem.has(sk)||exactOptions.has(ok))return false;
    const arr=moduleStems.get(Number(q.moduleId))||[];if(arr.some(x=>jac(x,q.question)>.78))return false;
    exactStem.add(sk);exactOptions.add(ok);arr.push(q.question);moduleStems.set(Number(q.moduleId),arr);output.push(q);return true;
  }

  for(const [mid,items] of byModule){
    const p=profile(mid);
    const conceptPool=unique(items.flatMap(q=>[q.answer,...(q.options||[])]).map(sanitize)).filter(x=>x.length>=2&&x.length<=120);
    for(let r=0;r<items.length;r++){
      const root=items[r],correct=sanitize(root.answer),sourceQ=clean(root.question),sourceE=clean(root.explanation||'');
      if(!correct)continue;
      for(let round=0;round<2;round++){
        for(let m=0;m<modes.length;m++){
          const mode=modes[m],seed=`V20:${mid}:${rootId(root)}:${mode}:${round}`;
          const cue=paraphrase(root.explanation||root.question,root.answer,seed);
          if(cue.length<35)continue;
          const other=items[(r+1+(hash(seed)%Math.max(1,items.length-1)))%items.length]||root;
          const tempting=sanitize(other.answer||'pendekatan alternatif');
          const rootWrong=unique((root.options||[]).filter(x=>norm(x)!==norm(root.answer)).map(sanitize));
          const external=conceptPool.filter(x=>norm(x)!==norm(correct)&&!rootWrong.some(y=>norm(y)===norm(x)));
          const ds=[...choose(rootWrong,seed+':rw',2),...choose(external,seed+':ex',2)].filter(x=>norm(x)!==norm(correct));
          const distractors=unique(ds).slice(0,3);
          if(distractors.length<3)continue;
          const concepts=[correct,...distractors],family=wrappers[mode],wrap=family[hash(seed+':wrap')%family.length];
          const options=concepts.map(wrap),answer=wrap(correct);
          const actor=p.actors[hash(seed+':a')%p.actors.length],scene=p.scenes[hash(seed+':s')%p.scenes.length],pressure=p.pressures[hash(seed+':p')%p.pressures.length],objective=p.objectives[hash(seed+':o')%p.objectives.length];
          const cueText=lowerFirst(cue),tv=hash(seed+':t')%3;
          const templates={
            decision:[
              `${cap(actor)} sedang ${scene}. Pemeriksaan awal mengindikasikan bahwa ${cueText} Pada saat yang sama, ${pressure}. Agar ${objective}, keputusan mana yang paling dapat dipertanggungjawabkan?`,
              `Dalam rapat keputusan, ${actor} harus ${scene}. Fakta yang paling menentukan adalah bahwa ${cueText} Sementara ${pressure}. Pilihan tindakan mana yang paling kuat jika tujuan utamanya ${objective}?`,
              `Sebelum keputusan dibuat, ${actor} yang ${scene} menemukan bahwa ${cueText} Kondisi menjadi lebih rumit karena ${pressure}. Apa keputusan terbaik agar ${objective}?`
            ],
            correction:[
              `${cap(actor)} sedang ${scene}. Rekannya lebih dahulu memilih ${tempting}, namun review berikutnya menunjukkan bahwa ${cueText} Dengan kondisi ${pressure}, koreksi apa yang paling tepat agar ${objective}?`,
              `Keputusan awal menggunakan ${tempting} ketika ${actor} ${scene}. Setelah fakta tambahan diperiksa, terlihat bahwa ${cueText} Jika ${pressure}, perubahan keputusan mana yang paling defensible untuk ${objective}?`,
              `Supervisor mempertanyakan penggunaan ${tempting} saat ${actor} ${scene}. Temuan utama justru menunjukkan bahwa ${cueText} Karena ${pressure}, koreksi apa yang seharusnya dilakukan supaya ${objective}?`
            ],
            priority:[
              `${cap(actor)} harus ${scene}, tetapi waktu penyelesaian terbatas. Temuan yang paling material adalah bahwa ${cueText} Selain itu, ${pressure}. Tindakan mana yang harus diprioritaskan terlebih dahulu agar ${objective}?`,
              `Beberapa tindakan tampak sama-sama masuk akal ketika ${actor} ${scene}. Namun hasil telaah menunjukkan bahwa ${cueText} Dengan tekanan bahwa ${pressure}, apa prioritas yang paling tepat untuk ${objective}?`,
              `Ketika ${actor} ${scene}, pekerjaan hampir dilanjutkan meski ditemukan bahwa ${cueText} Mengingat ${pressure}, apa yang paling perlu didahulukan agar ${objective}?`
            ],
            control:[
              `Sebuah unit sedang ${scene}. ${cap(actor)} menemukan bahwa ${cueText} Target tetap ketat dan ${pressure}. Kontrol apa yang paling relevan sebelum proses diteruskan agar ${objective}?`,
              `Saat ${actor} ${scene}, terdapat indikasi bahwa ${cueText} Manajemen meminta proses tetap berjalan, sementara ${pressure}. Respons kontrol mana yang paling tepat untuk ${objective}?`,
              `Proses mendekati otorisasi ketika ${actor} yang ${scene} menemukan bahwa ${cueText} Karena ${pressure}, kontrol apa yang seharusnya ditempatkan sebelum keputusan final agar ${objective}?`
            ],
            review:[
              `Reviewer menilai pekerjaan ketika ${actor} ${scene}. Beberapa gejala terlihat sama pentingnya, tetapi indikator utama menunjukkan bahwa ${cueText} Dengan mempertimbangkan bahwa ${pressure}, apa inti temuan yang paling tepat agar ${objective}?`,
              `Dalam quality review atas aktivitas ${scene}, ditemukan bahwa ${cueText} Reviewer harus membedakan akar masalah dari gejala, sementara ${pressure}. Kesimpulan mana yang paling kuat untuk mendukung ${objective}?`,
              `Hasil pemeriksaan ketika ${actor} ${scene} memperlihatkan bahwa ${cueText} Walaupun ada isu lain, ${pressure}. Akar masalah mana yang paling tepat jika sasaran review adalah ${objective}?`
            ],
            remediation:[
              `Pendekatan ${tempting} sudah digunakan ketika ${actor} ${scene}. Review kemudian menemukan bahwa ${cueText} Agar kesalahan tidak berulang dan ${pressure}, perbaikan mana yang paling tepat untuk ${objective}?`,
              `Setelah ${actor} memilih ${tempting} pada saat ${scene}, muncul temuan bahwa ${cueText} Mengingat ${pressure}, tindakan remediasi apa yang paling efektif supaya ${objective}?`,
              `Sebuah keputusan berbasis ${tempting} menghasilkan masalah saat ${actor} ${scene}. Analisis akar masalah menunjukkan bahwa ${cueText} Dengan kondisi ${pressure}, apa perbaikan paling tepat agar ${objective}?`
            ],
            next:[
              `${cap(actor)} telah menyelesaikan tahap awal ketika ${scene}. Temuan berikutnya menunjukkan bahwa ${cueText} Karena ${pressure}, langkah apa yang paling tepat dilakukan berikutnya agar ${objective}?`,
              `Dalam alur kerja ${scene}, ${actor} sudah menuntaskan pemeriksaan awal tetapi menemukan bahwa ${cueText} Jika ${pressure}, apa langkah lanjutan yang paling logis untuk ${objective}?`,
              `Sebelum proses bergerak ke tahap berikutnya, ${actor} yang ${scene} mengetahui bahwa ${cueText} Mengingat ${pressure}, tindakan selanjutnya apa yang paling tepat agar ${objective}?`
            ],
            evidence:[
              `${cap(actor)} sedang ${scene} dan menerima beberapa informasi yang saling bersaing. Temuan paling relevan menyatakan bahwa ${cueText} Sementara itu, ${pressure}. Dasar mana yang paling menentukan sebelum menyimpulkan keputusan agar ${objective}?`,
              `Dua alternatif keputusan masih terbuka ketika ${actor} ${scene}. Pemeriksaan tambahan menunjukkan bahwa ${cueText} Karena ${pressure}, informasi atau dasar apa yang paling material untuk ${objective}?`,
              `Saat ${actor} ${scene}, sebagian bukti mendukung pendekatan ${tempting}, tetapi temuan lain menunjukkan bahwa ${cueText} Dengan kondisi ${pressure}, dasar evaluasi mana yang seharusnya paling menentukan agar ${objective}?`
            ]
          };
          const stem=templates[mode][tv];
          const explanation=`Pilihan terbaik berpusat pada ${correct}. ${paraphrase(root.explanation||root.question,root.answer,seed+':explain')} Dalam konteks kasus, pendekatan itu paling konsisten dengan tujuan keputusan dan kontrol yang diuji.`;
          add({...root,id:`V20-M${mid}-${rootId(root)}-${mode}-${round}-${tv}`,question:stem,options,answer,explanation,questionType:'Analisis Kasus',difficulty:(m+round)%3===0?'Expert':'Challenge',skill:'Analisis & Keputusan',rootQuestionId:rootId(root),qualityGenerated:true,qualityTier:'HOTS',variantMode:mode,optionConcepts:concepts,conceptSignature:`${rootId(root)}|${mode}|${concepts.map(norm).sort().join('|')}`,source:sanitize(root.source)},sourceQ,sourceE);
        }
      }
    }
  }

  bank.splice(0,bank.length,...output);
  window.__GBP_SOURCE_BANK__=bank.map(q=>({...q,options:[...(q.options||[])],optionConcepts:[...(q.optionConcepts||[])]}));
})();