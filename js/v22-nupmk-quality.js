// Strict NUPMK HOTS layer: each unit inherits only its core GB competency.
(() => {
  const bank=window.__GBP_SOURCE_BANK__||[];
  if(!Array.isArray(bank)||!bank.length)return;
  const clean=s=>String(s??'').replace(/\s+/g,' ').trim();
  const norm=s=>clean(s).toLocaleLowerCase('id-ID').replace(/[^a-z0-9à-öø-ÿ]+/giu,' ').replace(/\s+/g,' ').trim();
  const cap=s=>String(s??'').replace(/^(\s*[^A-Za-zÀ-ÖØ-öø-ÿ]*)([a-zà-öø-ÿ])/u,(_,a,b)=>a+b.toLocaleUpperCase('id-ID'));
  const stripMeta=s=>clean(String(s??'').replace(/\b(?:materi|slide|modul)\b/gi,'').replace(/\s+([,.!?;:])/g,'$1'));
  const mappings={
    26:{source:7,name:'Memberikan Pelayanan Informasi Produk dan Jasa Perbankan',actors:['customer service','petugas layanan','supervisor layanan'],scenes:['nasabah meminta penjelasan sebelum memilih produk','fitur dan biaya produk perlu dijelaskan tanpa menyesatkan','nasabah membandingkan beberapa layanan dengan kebutuhan yang berbeda'],pressure:'informasi harus akurat, lengkap, mudah dipahami, dan dapat dipertanggungjawabkan',objective:'memberikan informasi produk secara tepat sekaligus memastikan kebutuhan nasabah dipahami'},
    27:{source:8,name:'Memberikan Edukasi Nasabah dan Calon Nasabah',actors:['petugas edukasi','customer service','supervisor layanan'],scenes:['nasabah belum memahami manfaat dan risiko layanan','kelompok nasabah memiliki tingkat literasi yang berbeda','nasabah perlu memahami konsekuensi sebelum mengambil keputusan'],pressure:'edukasi tidak boleh berubah menjadi sekadar promosi atau penyampaian istilah teknis',objective:'membangun pemahaman yang dapat digunakan nasabah untuk mengambil keputusan'},
    28:{source:9,name:'Menangani Pengaduan Nasabah',actors:['complaint officer','customer service','supervisor pengaduan'],scenes:['keluhan transaksi membutuhkan verifikasi sebelum jawaban final','nasabah meminta penyelesaian segera sementara fakta belum lengkap','hasil investigasi harus diterjemahkan menjadi respons yang jelas'],pressure:'kecepatan respons tidak boleh mengorbankan fairness, dokumentasi, atau ketepatan investigasi',objective:'menyelesaikan pengaduan secara terukur dan dapat ditelusuri'},
    29:{source:10,name:'Memproses Pembukaan dan Penutupan Rekening',actors:['customer service','petugas pembukaan rekening','supervisor operasional'],scenes:['permintaan pembukaan rekening belum seluruhnya tervalidasi','penutupan rekening memerlukan pemeriksaan status dan kewajiban','data nasabah perlu dipastikan konsisten sebelum proses disahkan'],pressure:'target layanan cepat tidak boleh menggantikan verifikasi dan otorisasi yang diwajibkan',objective:'memastikan pembukaan atau penutupan rekening sah, akurat, dan lengkap'},
    30:{source:11,name:'Memproses Transaksi Keuangan Tunai dan Non Tunai',actors:['teller','petugas operasional','supervisor transaksi'],scenes:['transaksi bernilai material harus diproses di tengah antrean tinggi','instruksi transfer perlu dicocokkan dengan bukti dan kewenangan','transaksi akan dieksekusi tetapi terdapat informasi yang belum konsisten'],pressure:'kecepatan layanan tidak boleh mengurangi validasi, ketepatan nominal, maupun keabsahan instruksi',objective:'mengeksekusi transaksi secara akurat, sah, dan memiliki bukti yang jelas'},
    31:{source:12,name:'Mengelola Administrasi Perbankan',actors:['back office officer','petugas administrasi','supervisor operasional'],scenes:['dokumen pendukung harus ditelusuri kembali setelah proses selesai','pencatatan fisik dan elektronik menunjukkan perbedaan','volume dokumen tinggi berpotensi membuat jejak administrasi terputus'],pressure:'penyelesaian pekerjaan tidak boleh menghilangkan bukti, konsistensi, atau jejak audit',objective:'menjaga administrasi lengkap, konsisten, dan mudah ditelusuri'},
    32:{source:13,name:'Memproses Valuta Asing',actors:['petugas valuta asing','treasury officer','supervisor operasional'],scenes:['kebutuhan valas nasabah harus diproses saat kurs bergerak','jenis transaksi valas belum tentu sesuai dengan tujuan nasabah','instruksi dan kurs perlu dikonfirmasi sebelum transaksi final'],pressure:'kecepatan eksekusi harus tetap mempertimbangkan tujuan transaksi, kurs, dan risiko nilai tukar',objective:'memproses transaksi valuta asing sesuai kebutuhan dan risiko'},
    33:{source:14,name:'Memproses Trade Service dan Trade Finance',actors:['trade finance officer','trade service officer','supervisor trade'],scenes:['dokumen perdagangan menunjukkan potensi discrepancy','deadline presentasi dokumen semakin dekat','keputusan pembayaran atau pembiayaan bergantung pada pemenuhan syarat dokumen'],pressure:'deadline tidak boleh membuat ketidaksesuaian dokumen atau kewenangan transaksi diabaikan',objective:'menjaga proses trade service dan trade finance sesuai syarat, dokumen, dan risiko'},
    34:{source:16,name:'Mengelola Akuntansi',actors:['akuntan bank','finance officer','reviewer laporan'],scenes:['transaksi harus diklasifikasikan sebelum periode pelaporan ditutup','jurnal perlu direview karena substansi transaksi berbeda dari label administratif','pencatatan berpotensi memengaruhi saldo dan rasio laporan'],pressure:'target pelaporan tidak boleh mengorbankan ketepatan pengakuan, klasifikasi, dan bukti transaksi',objective:'menghasilkan pencatatan dan laporan yang mencerminkan substansi transaksi'},
    35:{source:22,name:'Mengelola Aspek-Aspek Hukum',actors:['legal officer','petugas administrasi','pimpinan unit'],scenes:['dokumen akan menimbulkan hak dan kewajiban bagi bank','otoritas penandatangan perlu dipastikan sebelum tindakan dilakukan','potensi sengketa muncul akibat kelemahan dokumentasi'],pressure:'kepentingan bisnis harus tetap memiliki dasar hukum, kewenangan, dan bukti yang memadai',objective:'melindungi posisi hukum bank dan mengurangi risiko sengketa'}
  };
  const lenses=[
    {id:'verify',prompt:'Supervisor meminta bukti yang cukup sebelum proses diteruskan.',wrap:c=>`Memverifikasi ${c} terhadap bukti dan data yang relevan, mencatat hasil pemeriksaan, lalu meneruskan proses hanya bila hasilnya konsisten`},
    {id:'sequence',prompt:'Urutan langkah menjadi penting karena kesalahan di awal akan memengaruhi tahap berikutnya.',wrap:c=>`Menempatkan ${c} sebagai langkah awal, menyelesaikan validasi yang terkait, lalu baru melanjutkan ke tahap berikutnya`},
    {id:'authorize',prompt:'Keputusan tidak boleh melewati batas kewenangan petugas yang menangani proses.',wrap:c=>`Memastikan ${c} terpenuhi, menguji kewenangan yang berlaku, lalu meminta otorisasi pada level yang tepat sebelum eksekusi`},
    {id:'exception',prompt:'Salah satu prasyarat belum terpenuhi sehingga pengecualian tidak boleh diproses seperti kondisi normal.',wrap:c=>`Menahan proses bila ${c} belum terpenuhi, melakukan klarifikasi atau eskalasi, lalu melanjutkan hanya setelah exception terselesaikan`},
    {id:'document',prompt:'Pekerjaan harus tetap dapat direkonstruksi saat dilakukan review setelah transaksi selesai.',wrap:c=>`Menguji ${c}, merekam dasar keputusan dan bukti pendukung, lalu menyimpan jejak administrasi sebelum proses ditutup`},
    {id:'control',prompt:'Unit ingin mencegah kesalahan yang sama berulang pada transaksi atau pekerjaan berikutnya.',wrap:c=>`Menjadikan ${c} sebagai titik kontrol kunci, menetapkan pemeriksaan sebelum otorisasi, lalu memantau hasil penerapannya`},
    {id:'reconcile',prompt:'Terdapat perbedaan antara informasi utama dan bukti pendukung yang harus diselesaikan.',wrap:c=>`Merekonsiliasi ${c} dengan dokumen atau catatan terkait, menyelesaikan perbedaan, lalu mengonfirmasi hasil sebelum proses diteruskan`},
    {id:'review',prompt:'Supervisor harus menentukan apakah pekerjaan layak disahkan atau perlu dikembalikan untuk perbaikan.',wrap:c=>`Mereview ${c} terhadap kriteria kerja, mengembalikan proses bila ada gap material, lalu memberi persetujuan hanya setelah gap ditutup`}
  ];
  function cue(q){
    const exp=stripMeta(q.explanation||'');
    const sentences=exp.split(/(?<=[.!?])\s+/).map(clean).filter(Boolean);
    const raw=sentences.find(x=>!/pilihan terbaik berpusat/i.test(x)&&x.length>20)||sentences[0]||'terdapat fakta yang perlu divalidasi sebelum proses dilanjutkan';
    return raw.replace(/^dalam kasus ini,?\s*/i,'').replace(/pendekatan tersebut/gi,'langkah yang dipilih');
  }
  const fresh=bank.filter(q=>Number(q.moduleId)<26||Number(q.moduleId)>35),additions=[];
  for(const [targetId,cfg] of Object.entries(mappings)){
    const tid=Number(targetId),source=bank.filter(q=>Number(q.moduleId)===cfg.source).slice(0,120);
    source.forEach((q,i)=>{
      const concepts=Array.isArray(q.optionConcepts)&&q.optionConcepts.length===4?q.optionConcepts:[q.answer,...(q.options||[]).filter(x=>norm(x)!==norm(q.answer)).slice(0,3)];
      if(concepts.length!==4)return;
      const lens=lenses[i%lenses.length],actor=cfg.actors[i%cfg.actors.length],scene=cfg.scenes[(i+Math.floor(i/3))%cfg.scenes.length],fact=cue(q);
      const question=`${cap(actor)} sedang ${scene}. Hasil pemeriksaan menunjukkan bahwa ${fact.charAt(0).toLocaleLowerCase('id-ID')+fact.slice(1)} ${lens.prompt} Pada saat yang sama, ${cfg.pressure}. Langkah kerja mana yang paling tepat agar ${cfg.objective}?`;
      const options=concepts.map(lens.wrap),answer=options[0];
      if(new Set(options.map(norm)).size!==4)return;
      additions.push({...q,id:`NUPMK-V23-${tid}-${i+1}-${q.id}`,moduleId:tid,moduleName:cfg.name,day:6,question,options,answer,explanation:`Pilihan terbaik menempatkan ${clean(concepts[0])} dalam urutan kerja yang benar. Kualitas unjuk kerja dinilai dari keputusan, bukti, kewenangan, dan dokumentasi yang dapat ditelusuri.`,questionType:'Analisis Kasus',difficulty:i%4===0?'Expert':'Challenge',skill:'Unjuk Kerja & Keputusan',rootQuestionId:`NUPMK-${tid}-${q.rootQuestionId||q.baseId||q.id}`,qualityGenerated:true,qualityTier:'HOTS-NUPMK',variantMode:`nupmk-${lens.id}-${q.variantMode||'case'}-${i%5}`,optionConcepts:concepts,conceptSignature:`NUPMK-${tid}|${q.conceptSignature||q.id}|${lens.id}|${i%5}`,nupmkSourceModule:cfg.source,nupmkCoreAligned:true});
    });
  }
  bank.splice(0,bank.length,...fresh,...additions);
  window.__GBP_SOURCE_BANK__=bank;
})();