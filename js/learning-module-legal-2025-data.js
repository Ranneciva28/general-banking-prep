(() => {
  const CODE='K.64GEB00.017.1';
  const OPS='LEGAL BFLP - Aspek Hukum Operasional.pdf · Legal Group 2025';
  const CR='Legal BFLP - Aspek Hukum Kredit.pdf · Legal Group 2025';
  const BR='SERTIFIKASI GB 4 PPT BRIDGE · Hukum Perjanjian';
  const expert=window.GBPLearningExpert||(window.GBPLearningExpert={});
  const deep=window.GBPLearningDeep||(window.GBPLearningDeep={});
  const ex=expert[CODE]||(expert[CODE]={note:'',chapters:[],glossary:[]});
  const dp=deep[CODE]||(deep[CODE]={core:[],flow:[],glossary:[],critical:[],cases:[],questions:[],sources:{}});
  const norm=s=>String(s||'').trim().toLowerCase();

  function chapter(title,lead,rows,source,front=false){
    ex.chapters=(ex.chapters||[]).filter(x=>norm(x?.title)!==norm(title));
    const item={title,lead,rows,source};
    front?ex.chapters.unshift(item):ex.chapters.push(item);
  }
  function addUnique(target,rows){
    const seen=new Set((target||[]).map(r=>norm(r?.[0])));
    for(const row of rows){const k=norm(row?.[0]);if(k&&!seen.has(k)){target.push(row);seen.add(k);}}
  }

  chapter(
    'Hierarki kekuatan pembuktian dokumen',
    'Urutan ini mengikuti materi General Banking: dari bukti yang paling kuat sampai yang lebih lemah. Legalisasi dan waarmerking tidak mengubah akta di bawah tangan menjadi akta otentik; keduanya memperkuat aspek pembuktian tertentu pada dokumen bawah tangan.',
    [
      ['1 · Akta Otentik','Paling kuat dalam hierarki materi. Dibuat oleh atau di hadapan pejabat umum yang berwenang, dalam bentuk dan tata cara yang ditentukan undang-undang.','Kekuatan pembuktian sempurna; pihak yang menyangkal harus membuktikan ketidakbenarannya. Contoh: akta notaris, APHT oleh PPAT, akta jaminan fidusia, akta tertentu terkait tanah.'],
      ['2 · Akta di bawah tangan yang dilegalisasi','Dokumen dibuat para pihak, tetapi tanda tangan dilakukan/ditegaskan di hadapan pejabat berwenang dan tanggalnya memperoleh kepastian.','Legalisasi menguatkan siapa yang menandatangani dan kapan penandatanganan terjadi; substansi tetap berasal dari para pihak.'],
      ['3 · Akta di bawah tangan yang di-waarmerking','Dokumen sudah dibuat dan ditandatangani para pihak, kemudian dicatat/didaftarkan oleh notaris atau pejabat yang berwenang.','Waarmerking terutama membuktikan eksistensi dokumen pada saat pendaftaran; pejabat tidak menyaksikan proses penandatanganannya.'],
      ['4 · Akta di bawah tangan biasa','Dibuat dan ditandatangani tanpa perantaraan pejabat umum.','Memiliki kekuatan pembuktian apabila tanda tangan/isinya diakui atau dianggap diakui menurut hukum. Bila disangkal, pihak yang menggunakan akta perlu membuktikan kebenarannya.']
    ],
    `${BR}; ${CR}.`,
    true
  );

  chapter('Syarat sah perjanjian dan akibat bila tidak terpenuhi',
    'Pasal 1320 KUH Perdata dipakai sebagai decision framework: dua syarat subjektif menyangkut para pihak, dua syarat objektif menyangkut isi/tujuan perjanjian.',[
      ['Cakap hukum','Pihak mampu memikul akibat hukum dan tidak berada di bawah pengampuan sesuai konteks yang berlaku.','Dalam materi perkreditan BRI digunakan acuan 21 tahun/pernah menikah; materi juga membandingkan batas usia pada UU lain.'],
      ['Kesepakatan','Persesuaian kehendak tanpa kekhilafan, paksaan, atau penipuan.','Masuk kelompok syarat subjektif.'],
      ['Objek tertentu','Objek/prestasi yang diperjanjikan harus jelas, tegas, dan terukur.','Masuk kelompok syarat objektif.'],
      ['Sebab yang halal','Tujuan perjanjian tidak bertentangan dengan undang-undang, kepatutan, kesusilaan, dan ketertiban umum.','Masuk kelompok syarat objektif.'],
      ['Syarat subjektif tidak terpenuhi','Perjanjian dapat dibatalkan.','Perikatan tetap ada sampai dibatalkan melalui mekanisme yang sah.'],
      ['Syarat objektif tidak terpenuhi','Batal demi hukum.','Dalam materi dijelaskan seolah sejak awal perbuatan hukum dianggap tidak pernah ada.']
    ],`${OPS}; ${CR}.`);

  chapter('Subjek hukum, kecakapan, dan kewenangan bertindak',
    'Jangan menyamakan identitas, kecakapan, dan kewenangan. Ketiganya diuji terpisah sebelum seseorang atau pengurus boleh mengikat diri atau mewakili pihak lain.',[
      ['Orang perorangan','Subjek hukum berbentuk individu, dapat melakukan perbuatan hukum, serta dimintai pertanggungjawaban.','Dokumen identifikasi WNI dalam materi mencakup KTP, SIM, akta kelahiran, dan buku nikah/akta perkawinan sesuai kebutuhan.'],
      ['Badan hukum','Organisasi yang dipersamakan dengan manusia sebagai subjek hukum dan bertindak melalui pengurusnya.','Periksa kekayaan terpisah, tujuan, kepentingan sendiri, dan organisasi kepengurusan.'],
      ['Kecakapan','Kemampuan memikul tanggung jawab penuh atas tindakan hukum.','Materi kredit membandingkan KUH Perdata 21 tahun/sudah menikah, UU Perkawinan 19 tahun, dan UU Jabatan Notaris 18 tahun/sudah menikah.'],
      ['Pengampuan','Keadaan ketika orang dewasa berdasarkan putusan pengadilan dinilai tidak cakap mengurus kepentingannya sehingga diwakili pengampu.','Jangan menyimpulkan pengampuan hanya dari kondisi fisik/medis; dasar operasionalnya adalah status hukum/putusan.'],
      ['Kewenangan bertindak','Kemampuan bertindak karena dasar authority tertentu.','Contoh: kuasa, Anggaran Dasar, surat keputusan, peraturan daerah, atau dokumen penunjukan.'],
      ['WNA / bukan penduduk','Identitas, izin tinggal, status resident/non-resident, serta pembatasan transaksi harus diuji.','Materi kredit memuat pembatasan pemberian kredit kepada bukan penduduk beserta pengecualiannya.']
    ],`${OPS}; ${CR}.`);

  chapter('Hukum produk simpanan dan hubungan bank-nasabah',
    'Hubungan hukum lahir ketika ada perbuatan hukum yang menimbulkan hak dan kewajiban; dalam onboarding dibuktikan melalui persetujuan pada dokumen produk atau mekanisme persetujuan yang berlaku.',[
      ['Tabungan','Simpanan dengan penarikan menurut syarat tertentu yang disepakati dan tidak ditarik dengan cek/BG.','Bedakan dari giro dan deposito dari cara penarikannya.'],
      ['Giro','Simpanan yang dapat ditarik setiap saat melalui cek, BG, sarana pembayaran lain, atau pemindahbukuan.','Instrumen penarikan membawa konsekuensi legal tersendiri.'],
      ['Deposito','Simpanan yang penarikannya hanya pada waktu tertentu berdasarkan perjanjian nasabah dengan bank.','Tenor dan syarat pencairan menjadi bagian hubungan kontraktual.'],
      ['Formulir aplikasi rekening','Materi menyebut AR-01, AR-02, dan FR-01 sebagai dokumen yang memuat pernyataan, persetujuan syarat-ketentuan, underlying document, dan/atau kuasa.','Baca form sebagai perjanjian produk/layanan, bukan sekadar formulir administrasi.'],
      ['Rekening QQ','Digunakan untuk menerangkan hubungan ketika orang tua/wali bertindak bagi kepentingan anak/beneficial owner.','Bedakan pihak yang mengoperasikan rekening dengan pihak yang menerima manfaat.'],
      ['Penutupan rekening','Penutupan sistem atas permintaan nasabah/ahli waris dilakukan pada unit pengelola; unit transaksi dapat membantu verifikasi dan pengiriman dokumen.','Penutupan tidak boleh dikuasakan kepada pihak lain menurut materi operasional yang diberikan.']
    ],OPS);

  chapter('Instrumen penarikan: ATM, kartu debet, cek, BG, endosemen, dan cessie',
    'Instrumen penarikan memiliki karakter hukum yang berbeda. Fokuskan belajar pada fungsi, syarat formal, cara pengalihan, dan titik risiko.',[
      ['Kartu ATM','APMK untuk penarikan tunai dan/atau pemindahan dana.','Berbeda dengan kartu debet yang dipakai untuk pembayaran kewajiban transaksi ekonomi.'],
      ['Bilyet Giro','Sarana pemindahbukuan; tidak dapat dicairkan tunai dan tidak dapat dipindahtangankan.','Bank penerima memverifikasi bahwa pengunjuk adalah penerima atau pihak yang memperoleh kuasa dari penerima.'],
      ['Syarat formal BG','Nama/nomor BG, bank tertarik, perintah tanpa syarat, identitas penerima, bank penerima, jumlah, tanggal penarikan/efektif, tanda tangan dan nama jelas penarik.','Pisahkan elemen yang dipenuhi bank tertarik dan elemen yang dipenuhi penarik.'],
      ['Cek','Perintah tanpa syarat kepada bank untuk membayar sejumlah uang kepada pihak yang ditunjuk atau pembawa.','Syarat formal Pasal 178 KUHD meliputi kata cek, perintah bayar, bank tertarik, tempat bayar, tanggal/tempat penarikan, dan tanda tangan penarik.'],
      ['Endosemen','Pernyataan pada surat berharga untuk memindahkan hak tagih dari pemegang kepada orang lain.','Dipakai untuk jenis cek tertentu sesuai klausulnya.'],
      ['Cessie','Pengalihan piutang atas nama melalui akta otentik atau akta bawah tangan.','Bedakan cessie sebagai pengalihan piutang dengan endosemen sebagai pengalihan surat berharga tertentu.'],
      ['Cek mundur/postdated cheque','Walau bertanggal mendatang, materi menjelaskan cek tetap harus dibayar ketika diunjukkan jika dana tersedia.','Jika tidak didukung saldo cukup atau rekening telah ditutup, dapat dikategorikan cek kosong menurut materi.'],
      ['Tenggang waktu','Materi mencantumkan cek 70 hari sejak tanggal penerbitan dan ketentuan tersendiri untuk BG.','Jangan mencampur masa pengunjukan dengan daluwarsa.']
    ],OPS);

  chapter('Salah transfer dan larangan debet sepihak',
    'Kesalahan pembukuan tidak memberi bank kebebasan untuk menghapus jejak transaksi atau langsung mendebet rekening penerima tanpa dasar yang sah.',[
      ['Bank dilarang mendebet langsung','Materi menekankan bahwa bank tidak boleh menghilangkan/mengubah pencatatan secara sepihak.','Untuk pengembalian dana, mintakan persetujuan nasabah atau surat kuasa debet.'],
      ['Penerima wajib mengembalikan dana yang bukan haknya','UU Transfer Dana dalam materi melarang orang sengaja menguasai dana transfer yang diketahui/patut diketahui bukan haknya.','Nasabah dapat memberi persetujuan debet kembali atau mengembalikan sendiri dana kepada bank.'],
      ['Audit trail wajib utuh','Koreksi harus dilakukan dengan mekanisme yang meninggalkan histori.','Jangan menghapus transaksi asal untuk membuat pembukuan terlihat seolah kesalahan tidak pernah terjadi.']
    ],OPS);

  chapter('Tanda tangan, cap jempol, surrogate, dan KCTT',
    'Tanda tangan adalah penegasan identitas sekaligus pernyataan penerimaan isi dokumen; specimen dipakai sebagai alat pembanding authority pada transaksi.',[
      ['Tanda tangan','Mengidentifikasi penandatangan dan menghubungkan dirinya dengan isi dokumen.','Materi merujuk Pasal 1869–1875 KUH Perdata.'],
      ['Akta bawah tangan yang diakui','Tulisan bawah tangan yang diakui dapat menimbulkan bukti lengkap terhadap orang yang menandatanganinya.','Ini menjelaskan kenapa pengakuan tanda tangan sangat penting.'],
      ['Cap jempol','Dapat menjadi penegasan identitas dalam kondisi tertentu.','Kekuatan/validitasnya mengikuti bentuk serta prosedur yang diwajibkan.'],
      ['Surrogate','Jika penghadap tidak dapat menandatangani akta notaris, alasan ketidakmampuan dinyatakan tegas dalam akta sebagai pengganti tanda tangan sesuai ketentuan notaris.','Bukan sekadar notaris menandatangani menggantikan penghadap.'],
      ['KCTT','Kartu Contoh Tanda Tangan berisi specimen dan informasi kewenangan nasabah.','Nama pihak berwenang harus konsisten dengan AD/ART atau dasar kewenangan terbaru.'],
      ['Kolom tidak terpakai','Kolom kosong KCTT perlu dimatikan untuk mencegah penambahan tidak sah.','Perubahan authority membutuhkan KCTT baru dan specimen lama ditarik/dimusnahkan sesuai prosedur.']
    ],OPS);

  chapter('Surat kuasa, legalisasi dokumen luar negeri, dan apostille',
    'Kuasa adalah perjanjian pemberian kewenangan. Bank harus menguji siapa pemberi/penerima kuasa, ruang lingkup, pembatasan, masa berlaku, dan formalitas dokumennya.',[
      ['Pemberian kuasa','Seseorang memberi kekuasaan kepada orang lain untuk atas namanya menyelenggarakan suatu urusan.','Materi merujuk Pasal 1792 KUH Perdata.'],
      ['Minimum isi kuasa','Tertulis; identitas pemberi/penerima; hal yang dikuasakan; tanggal dan tempat.','Selain isi, verifikasi identitas dan tanda tangan kedua pihak.'],
      ['Pembatasan kuasa','Pastikan kuasa memang mencakup tindakan yang diminta dan tidak dibatasi oleh perjanjian/ketentuan lain.','Kuasa untuk satu tindakan tidak otomatis mencakup semua tindakan pada rekening.'],
      ['Berakhirnya kuasa','Materi mencantumkan penarikan/penghentian, meninggal, pengampuan, atau pailit sebagai keadaan yang dapat mengakhiri kuasa.','Status harus dicek saat kuasa digunakan, bukan hanya saat dibuat.'],
      ['Legalisasi dokumen luar negeri','Pengesahan berfokus pada tanda tangan/keaslian formal dokumen, bukan kebenaran seluruh substansi.','Jangan menafsirkan legalisasi sebagai jaminan isi dokumen benar.'],
      ['Apostille','Layanan sertifikasi dokumen publik asing berdasarkan konvensi yang telah diratifikasi Indonesia.','Materi memuat alur permohonan, verifikasi, pembayaran, dan penerbitan sertifikat apostille.']
    ],OPS);

  chapter('Bea meterai: fungsi, dokumen, dan e-meterai',
    'Meterai adalah pajak atas dokumen tertentu, bukan syarat sah perjanjian. Validitas perjanjian tetap diuji dari syarat sah perjanjian.',[
      ['Dokumen terutang bea meterai','Materi mencakup surat perjanjian, akta notaris/PPAT, surat berharga, dokumen pembuktian di pengadilan, dan dokumen tertentu yang memuat uang.','Klasifikasi mengikuti UU Bea Meterai yang disebut dalam materi.'],
      ['Meterai ≠ sahnya perjanjian','Pencantuman meterai tidak membuat perjanjian otomatis sah.','Tetap kembali ke cakap, sepakat, objek tertentu, dan sebab yang halal.'],
      ['Tanda tangan melintasi meterai','Digunakan untuk mematikan meterai tempel agar tidak digunakan ulang.','Fungsinya terkait pemenuhan bea, bukan menciptakan kesepakatan para pihak.'],
      ['Meterai elektronik','Label elektronik yang dibubuhkan melalui sistem tertentu pada dokumen yang terutang bea meterai.','Materi merujuk PMK 134/PMK.03/2021.']
    ],OPS);

  chapter('Ahli waris dan pencairan simpanan/SDB',
    'Bank harus memastikan status kematian, siapa ahli waris yang sah, apakah ada sengketa, siapa yang hadir, serta apakah ada kuasa di antara para ahli waris.',[
      ['Bentuk SKAW','Materi menerima beberapa bentuk: bawah tangan diketahui lurah/camat, notariil, Balai Harta Peninggalan, penetapan pengadilan, atau putusan pengadilan berkekuatan hukum tetap bila sengketa.','Bedakan dokumen deklaratif administratif dengan putusan pengadilan dalam sengketa.'],
      ['Pencairan simpanan','Dokumen antara lain bukti rekening, surat kematian, SKAW, identitas seluruh ahli waris, dan surat kuasa jika tidak semua hadir.','Materi menambahkan Surat Pernyataan Ahli Waris untuk threshold dana tertentu.'],
      ['Safe Deposit Box','Materi mensyaratkan dokumen ahli waris yang lebih terbatas/kuat, antara lain SKAW notariil/BHP/penetapan/putusan pengadilan.','Jangan otomatis memakai checklist simpanan untuk SDB.'],
      ['Ahli waris belum cakap hukum','Gunakan Kartu Keluarga dan dasar perwakilan/wali yang relevan.','Kewenangan perwakilan harus dapat dibuktikan.']
    ],OPS);

  chapter('Rahasia bank: ruang lingkup, pengecualian, dan prinsip minimal disclosure',
    'Materi mendefinisikan rahasia bank berfokus pada keterangan mengenai nasabah penyimpan dan simpanannya. Pembukaan informasi hanya dilakukan atas dasar kewenangan yang sah dan sebatas yang diminta.',[
      ['Ruang lingkup','Segala sesuatu yang berhubungan dengan keterangan nasabah penyimpan dan simpanannya.','Materi membedakan nasabah debitur yang juga tunduk pada kewajiban kerahasiaan jabatan/data.'],
      ['Pengecualian utama','Perpajakan, piutang negara, perkara pidana, perkara perdata bank-nasabah, tukar informasi antarbank, persetujuan/kuasa nasabah, dan ahli waris yang sah.','Masing-masing mempunyai dasar dan tata cara berbeda.'],
      ['Ketentuan tidak berlaku pada kondisi tertentu','Materi mencantumkan pemeriksaan BI/OJK, terorisme, TPPU dalam kondisi tertentu, KPK, pelaporan STR/CTR, BNN, serta akses perpajakan.','Jangan menganggap seluruh permintaan instansi otomatis dapat dipenuhi tanpa verifikasi dasar kewenangannya.'],
      ['Harta bersama dalam perceraian','Materi memuat Putusan MK No.64/PUU-X/2012 mengenai kepentingan peradilan atas harta bersama.','Periksa ruang lingkup putusan dan pihak yang disebut.'],
      ['Minimal disclosure','Informasi yang diberikan dibatasi pada data/keadaan keuangan yang disebut dalam perintah/izin atau dasar hukum.','Tidak boleh membuka informasi lebih luas hanya karena satu bagian informasi boleh dibuka.']
    ],OPS);

  chapter('Pemblokiran dan penyitaan rekening',
    'Pisahkan pemblokiran sebagai pembatasan transaksi dari penyitaan sebagai tindakan pengambilalihan/penguasaan untuk kepentingan proses hukum.',[
      ['Pemilik rekening','Dapat meminta pemblokiran atas rekeningnya sendiri sesuai prosedur.','Verifikasi identitas dan instruksi.'],
      ['Bank','Dapat melakukan pemblokiran bila telah diperjanjikan atau ada dasar internal/legal yang sah.','Harus ada dasar yang dapat ditelusuri.'],
      ['Lembaga/pejabat berwenang','Materi menyebut Kepolisian, Kejaksaan, KPK, Pengadilan Negeri, PUPN, Kantor Pajak, BNN, dan lembaga lain yang diberi kewenangan undang-undang.','Verifikasi surat, pejabat, objek, periode, dan ruang lingkup perintah.'],
      ['Penyitaan','Serangkaian tindakan penyidik untuk mengambil alih atau menyimpan benda bergerak/tidak bergerak, berwujud/tidak berwujud untuk pembuktian.','Materi merujuk Pasal 1 ayat 16 KUHAP.'],
      ['Audit trail','Tanggal penerimaan perintah, pejabat pemohon, rekening, nominal/status, eksekusi, dan komunikasi harus terdokumentasi.','Jangan melakukan blokir/sita hanya berdasarkan permintaan informal.']
    ],OPS);

  chapter('Legalitas usaha dan bentuk usaha calon debitur',
    'Legal review kredit dimulai dari identitas debitur, legalitas kegiatan usaha, bentuk badan, organ/pengurus, dan siapa yang sah menandatangani perjanjian kredit.',[
      ['NIB dan perizinan berbasis risiko','Risiko rendah menggunakan NIB; risiko menengah rendah/tinggi melibatkan Sertifikat Standar; risiko tinggi menggunakan NIB + izin sesuai materi.','Jangan menyamakan memiliki NIB dengan seluruh izin operasional telah terpenuhi.'],
      ['Firma','Sekutu bertanggung jawab pribadi untuk keseluruhan; akta pendirian dan pendaftaran mengikuti ketentuan dalam materi.','Authority dapat berbeda bila Anggaran Dasar mengatur lain.'],
      ['CV','Ada sekutu aktif dan sekutu komanditer/pasif. Sekutu aktif mengurus dan bertanggung jawab pribadi; sekutu pasif terbatas pada modal yang dimasukkan.','Penandatangan kredit fokus pada sekutu aktif dan persyaratan persetujuan sesuai AD/kebijakan.'],
      ['PT','Badan hukum dengan organ RUPS, Direksi, dan Komisaris.','Direksi mewakili perseroan sesuai Anggaran Dasar; cek pembatasan yang memerlukan persetujuan RUPS/Komisaris.'],
      ['Perseroan Perorangan','Badan hukum perorangan untuk kriteria UMK dalam materi.','Direktur/pendiri bertindak sesuai sertifikat pendaftaran.'],
      ['Koperasi','Rapat Anggota pemegang kekuasaan tertinggi; Pengurus mengurus dan mewakili; Pengawas mengawasi.','Periksa status badan hukum dan kewenangan Pengurus.'],
      ['Perkumpulan/Yayasan','Struktur nirlaba dengan aturan authority berbeda. Yayasan memiliki Pembina, Pengurus, Pengawas.','Materi membedakan aktivitas inti yayasan dan kegiatan komersial yang harus melalui badan usaha.'],
      ['Badan hukum publik','Kepala daerah dapat mewakili daerah; tindakan yang membebani keuangan daerah dapat membutuhkan persetujuan DPRD.','Authority bersumber dari undang-undang, peraturan, dan delegasi yang berlaku.']
    ],CR);

  chapter('Harta kekayaan debitur dan objek yang tidak layak/dilarang menjadi jaminan',
    'Sebelum menilai nilai ekonomis agunan, legal review memastikan objek dapat dimiliki, dialihkan, dan dibebani hak jaminan.',[
      ['Benda bergerak','Pada dasarnya dapat dipindahkan; termasuk benda berwujud/tidak berwujud tertentu.','Peralihan umumnya lebih sederhana, tetapi benda terdaftar seperti kendaraan tetap memerlukan registrasi.'],
      ['Benda tidak bergerak','Tanah dan benda yang karena sifat/tujuannya diperlakukan tidak bergerak.','Peralihan/pembebanan memerlukan prosedur terang di hadapan pejabat dan asas publisitas melalui pendaftaran.'],
      ['Benda wakaf','Materi menyatakan harta wakaf tidak boleh dijadikan jaminan, disita, dijual, diwariskan, atau dialihkan.','Reject sebagai agunan kredit.'],
      ['Benda sitaan perkara','Benda yang telah disita dalam perkara perdata/pidana tidak boleh dialihkan atau dibebani.','Pastikan status sita sebelum pengikatan.'],
      ['Barang milik negara/daerah','Materi menyatakan dilarang digadaikan/dijadikan jaminan untuk pinjaman.','Periksa kepemilikan publik sebelum menerima agunan.'],
      ['Kekayaan perusahaan pembiayaan/dana pensiun','Materi memuat pembatasan penjaminan untuk kewajiban pihak lain dan larangan tertentu bagi dana pensiun.','Jangan hanya melihat nilai aset.'],
      ['Kekayaan Yayasan','Dilarang dijaminkan untuk kepentingan utang pihak lain; materi membedakan bila untuk pinjaman yayasan sendiri.','Authority dan tujuan pemanfaatan kekayaan harus diperiksa.'],
      ['Hak manfaat pensiun dan tanah ulayat','Materi memuat pembatasan hak manfaat pensiun; tanah ulayat harus memperhatikan hak masyarakat adat dan kondisi daerah.','High legal-risk; jangan diproses seperti objek biasa.']
    ],CR);

  chapter('Putusan kredit, offering letter, dan perjanjian kredit',
    'Tahap keputusan kredit dan tahap lahirnya perikatan tidak boleh dicampur. Putusan internal, surat penawaran, dan perjanjian kredit memiliki fungsi hukum berbeda.',[
      ['Putusan kredit','Sah bila melalui prosedur internal/peraturan yang berlaku dan ditetapkan pejabat dengan PDWK.','PDWK didasarkan pada kualitas individu pejabat dan kondisi unit kerja, bukan otomatis karena jabatan.'],
      ['Offering Letter','Surat penawaran berisi gambaran umum syarat kredit.','Materi menegaskan offering letter belum selalu menimbulkan perikatan yang sempurna karena detail objek/syarat final dituangkan di PK.'],
      ['Perjanjian Kredit','Dokumen utama yang mengikat bank dan debitur mengenai jumlah, jangka waktu, pembayaran, dan syarat lain sesuai putusan kredit.','Harus melindungi kepentingan bank dan tunduk pada Buku III KUH Perdata tentang perikatan.'],
      ['Judul','Menjelaskan hal yang diperjanjikan.','Pastikan sesuai jenis transaksi.'],
      ['Komparisi','Menjelaskan identitas, kecakapan, dan kewenangan para pihak.','Untuk PT, cek siapa yang berwenang mewakili berdasarkan Anggaran Dasar.'],
      ['Premis','Menjelaskan latar belakang/maksud para pihak.','Menjadi konteks hubungan perjanjian.'],
      ['Batang tubuh','Memuat legal issues dan commercial issues.','Klausul harus konsisten dengan putusan kredit dan dokumen jaminan.'],
      ['Penutup','Memuat pemeteraian dan tanda tangan.','Meterai bukan syarat sah perjanjian; authority penandatangan tetap yang utama.']
    ],CR);

  chapter('Jaminan umum, agunan, dan lembaga jaminan kebendaan',
    'Jaminan tidak identik dengan agunan. Jaminan adalah keyakinan bank atas kemampuan dan kesanggupan debitur; agunan adalah jaminan tambahan yang diserahkan dalam pemberian fasilitas.',[
      ['Jaminan umum Pasal 1131 KUH Perdata','Seluruh kebendaan debitur, bergerak/tidak bergerak, yang ada dan yang akan ada, menjadi tanggungan perikatannya.','Hak kebendaan khusus diperlukan bila bank ingin kedudukan preferen atas objek tertentu.'],
      ['Gadai','Hak atas benda bergerak yang diserahkan dalam penguasaan kreditur dan memberi hak didahulukan.','Pengikatan: PK sebagai perjanjian pokok → perjanjian gadai → penyerahan/penguasaan objek kepada kreditur.'],
      ['Fidusia','Jaminan atas benda bergerak dengan penguasaan tetap pada pemberi fidusia.','Perjanjian jaminan dibuat dengan akta notaris dan didaftarkan untuk memperoleh Sertifikat Jaminan Fidusia.'],
      ['Hak Tanggungan','Jaminan atas hak atas tanah yang memberi kedudukan diutamakan kepada kreditur.','PK → APHT di hadapan PPAT → pendaftaran ke BPN → Sertifikat Hak Tanggungan.'],
      ['SKMHT','Surat Kuasa Membebankan Hak Tanggungan dipakai bila pembebanan belum dapat dilakukan langsung.','Materi memuat batas waktu berbeda untuk tanah terdaftar/belum terdaftar serta pengecualian kredit tertentu.'],
      ['Hipotek','Hak jaminan atas benda tidak bergerak tertentu; materi memberi contoh pengikatan pesawat udara melalui security agreement dan pencatatan pada register Kementerian Perhubungan.','Objek/prosedur berbeda dari Hak Tanggungan atas tanah.']
    ],CR);

  chapter('Critical point pengikatan agunan',
    'Nilai tinggi tidak cukup. Legal enforceability agunan ditentukan oleh ownership, authority, bentuk akta, registration/perfection, peringkat hak, dan kondisi objek.',[
      ['Ownership','Pastikan objek benar milik pemberi jaminan dan tidak sedang dialihkan/disita/dijaminkan secara tidak sah.','Cocokkan dokumen kepemilikan dengan identitas dan status perkawinan/badan hukum.'],
      ['Authority','Pihak yang menjaminkan harus cakap dan berwenang.','Untuk badan, cek AD/ART, persetujuan organ, serta larangan khusus.'],
      ['Perjanjian pokok dan accessoir','Dokumen jaminan menunjuk utang/perjanjian kredit yang dijamin.','Jangan sampai objek terikat pada kewajiban yang salah atau tidak jelas.'],
      ['Bentuk wajib otentik','APHT, akta jaminan fidusia, dan dokumen tertentu wajib dibuat dalam bentuk otentik menurut materi.','Akta bawah tangan tidak dapat menggantikan bentuk yang diwajibkan UU.'],
      ['Publisitas/pendaftaran','Hak tertentu lahir/sempurna setelah pendaftaran.','Dokumen akta saja belum selalu cukup.'],
      ['Peringkat dan preferensi','Periksa posisi bank sebagai pemegang hak jaminan dan nilai pengikatan.','Peringkat mempengaruhi prioritas pelunasan saat eksekusi.']
    ],CR);

  chapter('Addendum, novasi, subrogasi, dan delegasi',
    'Empat mekanisme ini sering tertukar. Kuncinya: apakah hanya klausul yang berubah, kreditur/debitur diganti, hutang lama hapus, atau hanya ada pihak tambahan.',[
      ['Addendum','Menambah, mengganti, atau menghapus bagian tertentu dari perjanjian tanpa menghapus perjanjian awal.','Merupakan satu kesatuan dengan PK dan pada prinsipnya tidak menghapus pengikatan jaminan accessoir.'],
      ['Novasi objektif','Pembaharuan yang mengubah objek/esensi perjanjian.','Perikatan lama diganti dengan perikatan baru sesuai ketentuan novasi.'],
      ['Novasi subjektif aktif','Kreditur lama diganti kreditur baru tanpa pelunasan oleh debitur.','Perlu ditegaskan pembebasan/penggantian hubungan lama.'],
      ['Novasi subjektif pasif','Debitur baru menggantikan debitur lama dan debitur lama dibebaskan dari perikatannya.','Ini pembeda penting dengan delegasi.'],
      ['Subrogasi','Pihak ketiga yang membayar utang masuk menggantikan kedudukan kreditur lama beserta hak-hak yang mengikuti sesuai mekanisme hukum.','Fokus pada pembayaran dan perpindahan hak kreditur.'],
      ['Delegasi','Debitur baru ditambahkan/ditunjuk untuk mengikatkan diri kepada kreditur tanpa membebaskan debitur lama.','Perjanjian lama dan hak jaminan tidak hapus hanya karena ada debitur tambahan.']
    ],CR);

  chapter('Penyelesaian kredit: sukarela dan melalui saluran hukum',
    'Ketika debitur wanprestasi, pilihan penyelesaian bergantung pada itikad baik, dokumen, jenis agunan, perfection jaminan, serta jalur eksekusi yang tersedia.',[
      ['Penyelesaian sukarela','Pelunasan dilakukan tanpa tindakan hukum/bantuan pengadilan.','Dapat dilakukan debitur, penanggung, hasil penjualan agunan di bawah tangan, atau pihak ketiga sesuai posisi hukumnya.'],
      ['Akibat pelunasan','PK dan perjanjian jaminan berakhir; bank mengembalikan agunan/dokumen serta memberikan dokumen pelunasan/roya yang diperlukan.','Jangan menahan dokumen tanpa dasar setelah kewajiban selesai.'],
      ['Parate Eksekusi','Penjualan agunan langsung melalui KPKNL tanpa bantuan pengadilan untuk objek dan kondisi yang memenuhi syarat.','Materi menyebut Hak Tanggungan, hipotek, dan fidusia; untuk HT posisi bank harus pemegang HT I.'],
      ['Fiat Eksekusi','Eksekusi berdasarkan titel eksekutorial melalui mekanisme pengadilan.','Titel eksekutorial memuat irah-irah “Demi Keadilan berdasarkan Ketuhanan Yang Maha Esa”.'],
      ['Grosse akta pengakuan hutang','Grosse tertentu memiliki titel eksekutorial sesuai persyaratan hukum.','Bedakan dari pengakuan hutang biasa di bawah tangan.'],
      ['Gugatan perdata','Digunakan untuk menagih prestasi/kerugian melalui putusan pengadilan.','Dokumen kontrak dan bukti wanprestasi menjadi sangat penting.'],
      ['Gugatan pailit','Saluran hukum berdasarkan syarat kepailitan.','Bukan sekadar karena kredit macet; harus memenuhi prasyarat kepailitan.'],
      ['Gugatan sederhana','Mekanisme penyelesaian perdata tertentu dengan prosedur lebih sederhana bila memenuhi syarat.','Tidak semua sengketa kredit masuk kategori ini.'],
      ['Paksa badan/gijzeling','Materi mencantumkannya sebagai salah satu opsi saluran hukum.','Penerapan harus mengikuti syarat hukum dan putusan/penetapan yang relevan.']
    ],CR);

  addUnique(ex.glossary||(ex.glossary=[]),[
    ['Akta Otentik','Akta yang dibuat oleh/di hadapan pejabat umum berwenang dalam bentuk yang ditentukan undang-undang.','Peringkat pembuktian tertinggi dalam hierarki materi.'],
    ['Legalisasi','Pengesahan tanda tangan dan kepastian tanggal pada akta bawah tangan melalui pejabat berwenang.','Tidak mengubah akta menjadi akta otentik.'],
    ['Waarmerking','Pendaftaran/pencatatan akta bawah tangan yang sebelumnya telah ditandatangani.','Memberi jejak eksistensi/tanggal pendaftaran, bukan verifikasi proses tanda tangan.'],
    ['Endosemen','Pernyataan untuk memindahkan hak tagih atas surat berharga tertentu.','Bedakan dengan cessie.'],
    ['Cessie','Pengalihan piutang atas nama melalui akta otentik atau bawah tangan.','Objeknya hak tagih/piutang atas nama.'],
    ['Apostille','Sertifikasi untuk penggunaan dokumen publik antarnegara peserta konvensi.','Menyederhanakan rantai legalisasi formal.'],
    ['KCTT','Kartu Contoh Tanda Tangan untuk specimen dan authority nasabah.','Harus mengikuti pihak berwenang terkini.'],
    ['PDWK','Putusan Delegasi Wewenang Kredit.','Menentukan pejabat yang berwenang memutus kredit.'],
    ['APHT','Akta Pemberian Hak Tanggungan.','Dibuat di hadapan PPAT dan didaftarkan ke BPN.'],
    ['SKMHT','Surat Kuasa Membebankan Hak Tanggungan.','Kuasa khusus yang digunakan bila HT belum dapat dibebankan langsung.'],
    ['Fidusia','Hak jaminan atas benda bergerak tertentu dengan penguasaan tetap pada pemberi fidusia.','Akta notaris + pendaftaran menjadi control utama.'],
    ['Parate Eksekusi','Eksekusi agunan tertentu atas kekuasaan sendiri melalui pelelangan umum tanpa proses gugatan biasa.','Ketersediaannya bergantung pada jenis/perfection jaminan.'],
    ['Fiat Eksekusi','Pelaksanaan titel eksekutorial melalui mekanisme pengadilan.','Berbeda dengan parate eksekusi.'],
    ['Addendum','Perubahan sebagian klausul yang menjadi satu kesatuan dengan perjanjian awal.','Tidak otomatis menghapus PK atau jaminan accessoir.'],
    ['Novasi','Pembaharuan utang/perikatan yang mengganti perikatan lama dengan yang baru.','Dapat objektif atau subjektif.'],
    ['Subrogasi','Pergantian kedudukan kreditur karena pembayaran oleh pihak ketiga sesuai hukum.','Hak kreditur beralih kepada pihak yang melakukan pembayaran.'],
    ['Delegasi','Penambahan/penggantian debitur tanpa membebaskan debitur lama dalam bentuk yang dijelaskan materi.','Berbeda dari novasi pasif.']
  ]);

  addUnique(dp.critical||(dp.critical=[]),[
    ['Hierarki pembuktian bukan hierarki jenis perjanjian','Akta otentik, legalisasi, waarmerking, dan akta bawah tangan dibedakan dari kekuatan pembuktiannya; legalisasi/waarmerking tetap treatment atas akta bawah tangan.','Decision rule: tanyakan “siapa membuat, siapa menyaksikan tanda tangan, kapan didaftarkan, dan apakah bentuk otentik diwajibkan UU?”.'],
    ['Meterai bukan syarat sah','Meterai berkaitan dengan bea atas dokumen, bukan lahirnya kesepakatan.','Decision rule: uji Pasal 1320 terlebih dahulu.'],
    ['Cakap ≠ berwenang','Orang yang dewasa dapat saja tidak berwenang mewakili PT/rekening/pihak lain.','Decision rule: setelah identitas dan kecakapan, selalu cek authority.'],
    ['Legalisasi tidak menjamin isi benar','Pejabat mengesahkan aspek formal tanda tangan/tanggal sesuai mekanisme, bukan seluruh substansi transaksi.','Decision rule: tetap lakukan legal review isi dan kewenangan para pihak.'],
    ['BG bukan cek','BG hanya pemindahbukuan dan tidak dapat dialihkan seperti surat berharga; cek memiliki karakter dan cara pengalihan berbeda.','Decision rule: identifikasi instrumen dulu sebelum menerapkan aturan pengunjukan/pengalihan.'],
    ['Salah transfer tidak boleh dihapus diam-diam','Dana bukan hak penerima, tetapi koreksi bank tetap memerlukan dasar dan audit trail.','Decision rule: gunakan persetujuan/kuasa debet atau mekanisme hukum yang sah.'],
    ['NIB belum tentu cukup','Jenis perizinan bergantung tingkat risiko dan sektor.','Decision rule: cocokkan KBLI/risiko dengan izin/sertifikat standar yang dipersyaratkan.'],
    ['Agunan bernilai tinggi belum tentu eligible','Objek wakaf, sitaan, aset negara, atau objek dengan larangan khusus tidak boleh diterima seperti agunan biasa.','Decision rule: legal eligibility mendahului appraisal value.'],
    ['Akta jaminan saja belum selalu melahirkan hak preferen','Fidusia dan HT memerlukan pendaftaran/perfection sesuai rezimnya.','Decision rule: cek akta + registrasi + sertifikat + peringkat.'],
    ['Delegasi berbeda dengan novasi pasif','Delegasi tidak membebaskan debitur lama; novasi pasif mengganti debitur dan membebaskan yang lama.','Decision rule: cari apakah debitur lama dibebaskan dari kewajibannya.'],
    ['Parate eksekusi tidak selalu tersedia','Harus dilihat jenis jaminan, peringkat, perfection, kondisi objek, dan persyaratan eksekusi.','Decision rule: jangan memilih parate hanya karena kredit telah macet.'],
    ['Rahasia bank memakai prinsip minimal disclosure','Adanya dasar pembukaan informasi tidak berarti seluruh data nasabah boleh dibuka.','Decision rule: berikan hanya data yang diminta dan diizinkan dasar hukum.']
  ]);

  addUnique(dp.cases||(dp.cases=[]),[
    ['Direktur PT menandatangani PK tetapi AD mensyaratkan persetujuan Komisaris','Direktur hadir dengan KTP dan tercatat sebagai Direksi, tetapi transaksi melebihi batas authority dalam Anggaran Dasar.','Identitas dan kecakapan belum cukup. Tahan penandatanganan sampai persetujuan organ yang diwajibkan dipenuhi.'],
    ['Debitur menyerahkan perjanjian bawah tangan yang sudah di-waarmerking','Dokumen didaftarkan di notaris setelah sebelumnya ditandatangani sendiri oleh para pihak.','Jangan menyebutnya akta otentik atau legalisasi. Waarmerking membuktikan pencatatan/eksistensi, bukan bahwa notaris menyaksikan tanda tangan.'],
    ['Bank salah kredit dana ke rekening nasabah','Dana sudah masuk rekening penerima dan bank menyadari salah posting.','Jaga audit trail dan minta persetujuan/kuasa debet atau gunakan mekanisme hukum yang sah; jangan menghapus transaksi asal diam-diam.'],
    ['Benda wakaf ditawarkan sebagai agunan bernilai tinggi','Appraisal menunjukkan nilai sangat tinggi dan lokasi strategis.','Reject secara legal meskipun nilai ekonominya baik karena materi menyatakan benda wakaf dilarang dijaminkan.'],
    ['Debitur baru masuk tanpa membebaskan debitur lama','Bank ingin pihak baru ikut menanggung kredit existing sementara debitur lama tetap bertanggung jawab.','Gunakan logika delegasi, bukan novasi pasif. Pastikan klausul penerimaan debitur baru dan eksistensi hak jaminan tetap jelas.'],
    ['Kredit macet dengan HT I yang telah sempurna','Debitur wanprestasi dan agunan tanah marketable; bank pemegang HT I.','Evaluasi parate eksekusi sesuai syarat materi, termasuk kondisi objek, calon pembeli, appraisal, dan nilai pengikatan.']
  ]);

  addUnique(dp.questions||(dp.questions=[]),[
    ['Urutan bukti','Urutkan Akta Otentik, Legalisasi, Waarmerking, dan Akta Bawah Tangan dari pembuktian terkuat.','Akta Otentik → Legalisasi → Waarmerking → Akta di bawah tangan.'],
    ['Analisis','Apakah akta bawah tangan yang dilegalisasi berubah menjadi akta otentik?','Tidak. Legalisasi menguatkan aspek tanda tangan dan tanggal, tetapi dokumen dasarnya tetap akta bawah tangan.'],
    ['Perjanjian','Apa akibat hukum jika syarat objektif Pasal 1320 tidak terpenuhi?','Batal demi hukum menurut materi.'],
    ['Authority','Apa beda cakap hukum dan berwenang bertindak?','Cakap adalah kapasitas hukum pribadi; berwenang adalah authority untuk tindakan tertentu/untuk mewakili pihak tertentu.'],
    ['Instrumen','Mengapa BG tidak dapat diperlakukan seperti cek atas pembawa?','BG adalah sarana pemindahbukuan, tidak dapat dicairkan tunai dan tidak dapat dipindahtangankan.'],
    ['Jaminan','Apa urutan inti pengikatan Hak Tanggungan?','Perjanjian kredit → APHT di hadapan PPAT → pendaftaran ke BPN → Sertifikat Hak Tanggungan.'],
    ['Perubahan PK','Apa beda addendum dan novasi?','Addendum mengubah sebagian klausul tanpa menghapus PK lama; novasi membentuk pembaharuan perikatan yang mengganti perikatan lama.'],
    ['Perubahan debitur','Apa beda novasi pasif dan delegasi?','Novasi pasif mengganti debitur lama dan membebaskannya; delegasi menambah/mengganti pihak baru tanpa membebaskan debitur lama sesuai materi.'],
    ['Eksekusi','Apa beda parate dan fiat eksekusi?','Parate dilakukan atas kekuasaan sendiri melalui pelelangan tanpa proses gugatan biasa bila syaratnya terpenuhi; fiat menggunakan titel eksekutorial melalui mekanisme pengadilan.'],
    ['Rahasia bank','Apa prinsip setelah bank memastikan permintaan informasi memiliki dasar hukum?','Berikan hanya informasi yang berada dalam ruang lingkup perintah/izin/dasar hukum; jangan membuka data lebih luas.']
  ]);

  ex.note=`${ex.note?ex.note+' ':''}Ekspansi Legal V42 bersumber dari dua materi Legal Group 2025 yang diunggah pengguna: Aspek Hukum Operasional dan Aspek Hukum Perkreditan. Angka threshold, nomenklatur internal, serta regulasi yang disebut dipertahankan sebagai exam/source reference; untuk praktik aktual gunakan ketentuan efektif terbaru.`;
  dp.sources={...(dp.sources||{}),legal2025:`${OPS}; ${CR}.`,proofHierarchy:`${BR}; ${CR}.`};

  window.__GBP_LEARNING_LEGAL_VERSION__='V42-legal-2025';
})();