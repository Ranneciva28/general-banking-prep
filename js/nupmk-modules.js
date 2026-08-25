(() => {
  const bank=window.QUESTION_BANK||[];
  if(!Array.isArray(bank)||!bank.length)return;

  const NUPMK_DAY=6;
  const BRIDGE_DAY=7;
  const BRIDGE_DECK='SERTIFIKASI GB 4 PPT BRIDGE_compressed (2) (1).pdf';
  const MAX_BANK=500;
  const clean=s=>String(s??'').replace(/\s+/g,' ').trim();
  const norm=s=>clean(s).toLocaleLowerCase('id-ID').replace(/[^a-z0-9à-öø-ÿ]+/giu,' ').replace(/\s+/g,' ').trim();

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

  // Curated from the BRIDGE deck, using the uploaded 25-question quiz only as a quality benchmark.
  // Each item tests a different fact/application and intentionally uses a distinct option set.
  const bridgeOpenCloseGold=[
    ['Rekening bank pada dasarnya merupakan...',['Catatan keuangan nasabah yang dikelola bank untuk merekam aktivitas keuangan','Database profil nasabah yang hanya berisi data identitas','Instrumen pembayaran yang dapat dipindahtangankan kepada pihak lain','Fasilitas pinjaman yang mencatat seluruh kewajiban debitur'],'Catatan keuangan nasabah yang dikelola bank untuk merekam aktivitas keuangan','Rekening merupakan catatan keuangan nasabah di bank untuk mencatat penyimpanan, penarikan, transfer, dan aktivitas keuangan lainnya.','Konsep'],
    ['Manfaat rekening yang paling spesifik dari sudut pandang bank adalah...',['Menjadi alat identifikasi dan pengelolaan data nasabah','Menjadi bukti pembayaran pribadi bagi pemilik rekening','Menjadi sarana menerima dana dari pihak lain','Menjadi dasar aktivasi layanan dompet digital nasabah'],'Menjadi alat identifikasi dan pengelolaan data nasabah','Bagi bank, rekening membantu identifikasi, pengelolaan data, pelacakan transaksi, manajemen risiko, integrasi core banking, dan pelaporan.','Aplikasi'],
    ['Simpanan yang dapat ditarik setiap saat menggunakan Cek, Bilyet Giro, atau pemindahbukuan adalah...',['Giro','Tabungan','Deposito berjangka','Sertifikat deposito'],'Giro','Karakteristik Giro adalah dapat ditarik setiap saat antara lain menggunakan Cek, Bilyet Giro, atau pemindahbukuan.','Konsep'],
    ['Produk simpanan yang penarikannya mengikuti jangka waktu yang diperjanjikan dengan bank adalah...',['Deposito berjangka','Tabungan berencana','Rekening giro','Tabungan transaksi'],'Deposito berjangka','Deposito ditarik sesuai jangka waktu tertentu berdasarkan perjanjian nasabah dengan bank.','Konsep'],
    ['Seorang WNI membuka rekening tabungan individu. Kombinasi dokumen utama yang paling sesuai adalah...',['KTP atau identitas resmi dan NPWP sesuai ketentuan','Akta pendirian dan NIB perusahaan','KTP serta proposal investasi dan RAB','Slip gaji serta dokumen agunan kendaraan'],'KTP atau identitas resmi dan NPWP sesuai ketentuan','Pembukaan rekening individu mensyaratkan identitas resmi dan dokumen perpajakan sesuai ketentuan, bukan dokumen badan usaha atau dokumen kredit.','Aplikasi'],
    ['Calon nasabah individu ingin membuka rekening Giro. Persyaratan usia yang sesuai materi adalah...',['Minimal 21 tahun atau telah menikah','Minimal 18 tahun tanpa pengecualian','Minimal 17 tahun dan sudah memiliki NPWP','Minimal 25 tahun untuk seluruh calon nasabah'],'Minimal 21 tahun atau telah menikah','Materi menetapkan persyaratan individu untuk pembukaan Giro minimal 21 tahun atau telah menikah.','Konsep'],
    ['Nominal minimal pembukaan deposito melalui unit kerja BRI adalah...',['Rp10.000.000','Rp5.000.000','Rp25.000.000','Rp50.000.000'],'Rp10.000.000','Pembukaan deposito melalui unit kerja fisik BRI minimal Rp10 juta.','Numerik'],
    ['Nasabah membuka deposito melalui Internet Banking BRI. Batas minimal penempatannya adalah...',['Rp5.000.000','Rp2.500.000','Rp7.500.000','Rp15.000.000'],'Rp5.000.000','Materi menyebut pembukaan deposito melalui Internet Banking BRI minimal Rp5 juta dan maksimal Rp100 juta.','Numerik'],
    ['Dalam prosedur pembukaan rekening kredit, aplikasi dan dokumen pendukung sudah diserahkan ke bank. Tahap berikutnya adalah...',['Analisis kredit','Persetujuan kredit','Pembukaan rekening kredit','Penerbitan surat lunas'],'Analisis kredit','Sesudah penyerahan aplikasi, bank menganalisis riwayat kredit, kemampuan membayar, dan profil risiko sebelum keputusan.','Urutan Proses'],
    ['Dokumen yang paling khas untuk Kredit Investasi dibanding kredit konsumtif adalah...',['Proposal investasi dan Rencana Anggaran Biaya','Slip gaji dan surat keterangan kerja','Surat pemesanan rumah dan dokumen BPKB','Tagihan kartu kredit lain dan rekening tabungan tiga bulan'],'Proposal investasi dan Rencana Anggaran Biaya','Kredit Investasi membutuhkan dokumen seperti proposal investasi dan RAB selain dokumen dasar lainnya.','Aplikasi'],
    ['Kepanjangan CIF yang digunakan dalam proses pembukaan rekening adalah...',['Customer Information File','Customer Identification Framework','Central Information Facility','Core Identity Folder'],'Customer Information File','CIF adalah Customer Information File, yaitu basis informasi terpusat mengenai identitas dan profil nasabah.','Konsep'],
    ['Data manakah yang paling tepat ditempatkan pada kelompok data pekerjaan dan penghasilan di CIF?',['Jabatan dan lama bekerja','Tempat lahir dan tanggal lahir','Nomor identitas kependudukan','Status kewarganegaraan dan jenis kelamin'],'Jabatan dan lama bekerja','Jabatan dan lama bekerja termasuk informasi pekerjaan, sedangkan opsi lain merupakan data pribadi atau identitas.','Klasifikasi'],
    ['Mengapa CIF menjadi fondasi penting dalam operasional bank modern?',['CIF menjadi identitas terpusat yang dipakai lintas layanan dan sistem bank','CIF menggantikan seluruh pencatatan transaksi pada rekening koran','CIF hanya dibutuhkan ketika nasabah mencetak buku tabungan','CIF digunakan khusus untuk menghitung bunga deposito'],'CIF menjadi identitas terpusat yang dipakai lintas layanan dan sistem bank','CIF menjadi dasar identifikasi unik nasabah dan dipakai dalam berbagai aktivitas layanan serta integrasi sistem.','Analisis'],
    ['KYC merupakan singkatan dari...',['Know Your Customer','Know Your Clientele','Key Yield Control','Know Your Credit'],'Know Your Customer','KYC adalah Know Your Customer, prinsip mengenali nasabah pada saat membangun hubungan usaha.','Konsep'],
    ['Tujuan penerapan KYC yang paling erat dengan pengendalian risiko kepatuhan adalah...',['Mengenali identitas dan profil nasabah agar aktivitas mencurigakan dapat dideteksi','Menentukan suku bunga simpanan yang paling menguntungkan nasabah','Mempercepat pemberian plafon kredit tanpa analisis tambahan','Menghilangkan kebutuhan pembaruan data nasabah setelah rekening aktif'],'Mengenali identitas dan profil nasabah agar aktivitas mencurigakan dapat dideteksi','KYC membantu bank memahami nasabah, memverifikasi profil, dan mendeteksi aktivitas yang tidak sesuai termasuk indikasi pencucian uang.','Analisis'],
    ['Urutan kegiatan inti KYC yang paling tepat adalah...',['Identifikasi, verifikasi, dan pemantauan','Registrasi, aktivasi, dan settlement','Pengajuan, analisis, dan pencairan','Pencatatan, rekonsiliasi, dan pelaporan'],'Identifikasi, verifikasi, dan pemantauan','KYC mencakup identifikasi nasabah, verifikasi kebenaran informasi, dan pemantauan hubungan/transaksi.','Urutan Proses'],
    ['Nasabah memecah satu transaksi besar menjadi banyak transaksi kecil agar tidak melewati threshold pelaporan. Pola ini disebut...',['Structuring atau smurfing','Layering antarproduk','Dormant reactivation','Account sweeping'],'Structuring atau smurfing','Pemecahan transaksi untuk menghindari threshold merupakan red flag struktur transaksi yang dikenal sebagai structuring/smurfing.','Kasus'],
    ['Profil calon nasabah menunjukkan penghasilan bulanan rendah, tetapi sejak awal ia memperkirakan transaksi masuk bernilai sangat besar tanpa sumber yang jelas. Red flag utamanya adalah...',['Ketidaksesuaian profil penghasilan dengan aktivitas transaksi','Frekuensi transaksi yang tinggi pada rekening aktif','Penggunaan kanal digital untuk menerima transfer','Kepemilikan lebih dari satu produk perbankan'],'Ketidaksesuaian profil penghasilan dengan aktivitas transaksi','Ketidaksesuaian antara profil ekonomi dan pola transaksi merupakan indikator risiko yang perlu ditelaah.','Kasus'],
    ['Rekening tabungan tidak memiliki transaksi dari nasabah selama enam bulan berturut-turut. Status yang paling sesuai adalah...',['Rekening pasif atau dormant','Rekening diblokir permanen','Rekening ditutup otomatis karena DHN','Rekening berubah menjadi deposito'],'Rekening pasif atau dormant','Materi menjelaskan rekening dapat berstatus pasif/dormant setelah periode tidak bertransaksi yang ditentukan.','Kasus'],
    ['Nasabah tercantum dalam Daftar Hitam Nasional karena penarikan Cek/BG kosong. Sanksi utama yang berlaku adalah...',['Pembekuan hak penggunaan Cek/BG secara nasional selama satu tahun','Pemblokiran seluruh tabungan dan deposito selama enam bulan','Penghapusan otomatis seluruh fasilitas kredit yang masih berjalan','Penyitaan saldo seluruh rekening oleh bank tertarik'],'Pembekuan hak penggunaan Cek/BG secara nasional selama satu tahun','Materi menjelaskan pembekuan penggunaan Cek/BG seluruh rekening Giro di seluruh bank selama satu tahun.','Konsep'],
    ['Dalam enam bulan, seorang pemilik rekening pada bank yang sama menerbitkan tiga Cek/BG kosong dengan nilai masing-masing di bawah Rp500 juta. Implikasinya adalah...',['Memenuhi salah satu kriteria pencantuman dalam DHN','Hanya memperoleh teguran lisan tanpa konsekuensi DHN','Rekening langsung berubah menjadi dormant','Hanya satu Cek terakhir yang diperhitungkan untuk sanksi'],'Memenuhi salah satu kriteria pencantuman dalam DHN','Tiga lembar atau lebih Cek/BG kosong, masing-masing di bawah Rp500 juta pada bank tertarik yang sama dalam enam bulan, merupakan kriteria DHN.','Kasus'],
    ['Satu Cek kosong bernilai Rp500 juta atau lebih diterbitkan oleh pemilik rekening. Berdasarkan kriteria DHN, kondisi tersebut...',['Sudah dapat memenuhi kriteria pencantuman DHN','Belum relevan karena harus ada minimal dua Cek kosong','Baru relevan jika terjadi tiga kali dalam satu tahun','Hanya mengakibatkan rekening menjadi pasif'],'Sudah dapat memenuhi kriteria pencantuman DHN','Satu lembar Cek/BG kosong dengan nominal sekurang-kurangnya Rp500 juta merupakan salah satu kriteria pencantuman DHN.','Kasus'],
    ['Penarik Cek/BG kosong diberi kesempatan menyelesaikan pembayarannya sebelum Surat Peringatan diterbitkan. Batas waktu yang disebut materi adalah...',['7 hari','5 hari kerja','10 hari kalender','14 hari kerja'],'7 hari','Materi memberikan waktu tujuh hari untuk menyelesaikan pembayaran Cek/BG kosong sebelum Surat Peringatan.','Numerik'],
    ['Nasabah ingin menutup rekening tabungan atas permintaan sendiri. Langkah awal yang paling tepat adalah...',['Datang ke cabang pengelola dan mengajukan penutupan melalui prosedur yang berlaku','Menarik saldo hingga nol lalu menganggap rekening otomatis tertutup','Memindahkan seluruh dana ke rekening lain tanpa menghubungi bank','Meminta bank penerima transfer menutup rekening asal'],'Datang ke cabang pengelola dan mengajukan penutupan melalui prosedur yang berlaku','Penutupan atas permintaan sendiri dilakukan melalui kantor/cabang pengelola dengan formulir dan penyelesaian administrasi yang dipersyaratkan.','Urutan Proses'],
    ['Dokumen transaksi keuangan pada umumnya disimpan sesuai masa retensi yang disebut dalam materi, yaitu...',['Sekitar 5–10 tahun tergantung jenis dokumen','Sekitar 1–2 tahun untuk seluruh dokumen','Maksimal 3 tahun tanpa pengecualian','Selamanya untuk setiap jenis transaksi'],'Sekitar 5–10 tahun tergantung jenis dokumen','Masa retensi dokumen bergantung pada jenisnya dan pada materi dicontohkan dalam rentang sekitar lima sampai sepuluh tahun.','Konsep'],
    ['Format nama file hasil scanning yang paling mendukung filing sistematis menurut materi adalah...',['Tahun_Bulan_NamaNasabah_JenisRekening.pdf','NamaNasabah_NomorUrut.pdf','NomorCabang_TanggalCetak.pdf','JenisDokumen_InisialPetugas.pdf'],'Tahun_Bulan_NamaNasabah_JenisRekening.pdf','Format yang memuat tahun, bulan, nama nasabah, dan jenis rekening memudahkan pencarian kembali dokumen digital.','Aplikasi'],
    ['Nasabah memiliki dana Rp7 juta dan memenuhi persyaratan lain untuk membuka deposito. Berdasarkan batas minimum pada materi, pilihan kanal yang memungkinkan adalah...',['Internet Banking BRI, tetapi belum memenuhi minimum pembukaan melalui unit kerja','Unit kerja BRI, tetapi belum memenuhi minimum Internet Banking','Keduanya karena minimum kedua kanal sama-sama Rp5 juta','Tidak keduanya karena seluruh deposito minimal Rp10 juta'],'Internet Banking BRI, tetapi belum memenuhi minimum pembukaan melalui unit kerja','Minimum Internet Banking Rp5 juta, sedangkan minimum melalui unit kerja Rp10 juta.','Kasus Numerik'],
    ['Urutan yang benar setelah aplikasi kredit diserahkan adalah...',['Analisis kredit → persetujuan → pembukaan rekening kredit','Persetujuan → analisis kredit → pembukaan rekening kredit','Pembukaan rekening → analisis kredit → persetujuan','Pencairan → pembukaan rekening → analisis kredit'],'Analisis kredit → persetujuan → pembukaan rekening kredit','Materi menempatkan analisis sesudah penyerahan aplikasi, kemudian persetujuan, baru pembukaan rekening kredit.','Urutan Proses'],
    ['Fungsi utama rekening kredit dalam materi adalah...',['Menampung pencairan pinjaman dan mencatat kewajiban pembayaran kembali','Menjadi rekening transaksi harian bebas terkait tujuan pinjaman','Menjadi instrumen penyimpanan dana berjangka dengan bunga tetap','Menggantikan seluruh fungsi rekening giro perusahaan'],'Menampung pencairan pinjaman dan mencatat kewajiban pembayaran kembali','Rekening kredit dipakai untuk transaksi yang terkait fasilitas pinjaman, terutama disbursement dan repayment.','Konsep'],
    ['Mengapa proses KYC pada rekening kredit umumnya lebih mendalam dibanding rekening dana sederhana?',['Karena mencakup analisis kelayakan dan profil risiko terkait pemberian pinjaman','Karena setiap rekening kredit wajib menggunakan Cek dan Bilyet Giro','Karena rekening kredit tidak memerlukan identitas nasabah','Karena rekening kredit selalu dibuka tanpa proses seleksi'],'Karena mencakup analisis kelayakan dan profil risiko terkait pemberian pinjaman','Materi menyebut KYC rekening kredit lebih mendalam karena terkait seleksi, kelayakan, kemampuan bayar, dan profil risiko.','Analisis'],
    ['Dokumen yang lazim diminta pada pengajuan Kredit Modal Kerja badan usaha adalah...',['Laporan keuangan, mutasi rekening, legalitas usaha, dan dokumen agunan bila ada','Proposal investasi, RAB, dan gambar teknis tanpa dokumen usaha','Slip gaji, SK pegawai, dan surat pemesanan rumah','Bilyet deposito, buku tabungan, dan formulir penutupan rekening'],'Laporan keuangan, mutasi rekening, legalitas usaha, dan dokumen agunan bila ada','KMK menggunakan dokumen usaha dan finansial seperti legalitas, laporan keuangan, mutasi rekening, serta agunan bila ada.','Aplikasi'],
    ['Untuk kredit konsumtif seperti KPR/KKB, kombinasi dokumen yang paling sesuai adalah...',['KTP/KK/NPWP, slip gaji, rekening koran, dan dokumen agunan atau pemesanan terkait','Akta pendirian, laporan keuangan dua tahun, dan SIUP seluruhnya wajib','Proposal investasi, proyeksi arus kas, dan kontrak buyer','Bilyet Giro, cek yang belum terpakai, dan surat lunas'],'KTP/KK/NPWP, slip gaji, rekening koran, dan dokumen agunan atau pemesanan terkait','Dokumen kredit konsumtif menitikberatkan identitas, bukti penghasilan, mutasi/rekening koran, pekerjaan, dan dokumen objek/agunan.','Aplikasi'],
    ['Pada pengajuan kartu kredit atau personal loan oleh pegawai, dokumen yang paling relevan untuk membuktikan kapasitas penghasilan adalah...',['Slip gaji atau bukti penghasilan dan surat keterangan kerja','RAB proyek dan gambar teknis bangunan','Akta perubahan perusahaan dan kontrak buyer','Bilyet deposito asli dan surat kuasa pencairan'],'Slip gaji atau bukti penghasilan dan surat keterangan kerja','Kartu kredit/personal loan menggunakan bukti penghasilan dan pekerjaan untuk menilai kemampuan bayar.','Aplikasi'],
    ['Seorang nasabah memiliki tabungan, deposito, dan fasilitas kredit di bank yang sama. Peran CIF adalah...',['Menghubungkan identitas dan profil nasabah secara terpusat di berbagai layanan tersebut','Membuat satu nomor rekening yang sama untuk seluruh produk','Menggantikan pencatatan saldo pada masing-masing rekening','Menghapus kebutuhan verifikasi identitas pada pembukaan produk berikutnya'],'Menghubungkan identitas dan profil nasabah secara terpusat di berbagai layanan tersebut','CIF merupakan identitas terpusat nasabah yang digunakan lintas aktivitas dan produk, bukan pengganti nomor rekening atau proses verifikasi.','Analisis'],
    ['Dalam penutupan rekening Giro, masih ada Cek/BG yang sedang dalam proses pencairan. Tindakan yang paling tepat sebelum penutupan diselesaikan adalah...',['Menyelesaikan atau mematangkan transaksi Cek/BG yang masih pending sesuai prosedur','Mengabaikan transaksi pending karena rekening akan ditutup','Mengubah seluruh Cek/BG pending menjadi deposito otomatis','Memindahkan kewajiban Cek/BG ke rekening tabungan nasabah'],'Menyelesaikan atau mematangkan transaksi Cek/BG yang masih pending sesuai prosedur','Materi penutupan Giro mensyaratkan penyelesaian transaksi Cek/BG yang masih pending sebelum proses penutupan selesai.','Kasus'],
    ['Sebelum rekening Giro atas permintaan sendiri benar-benar ditutup, nasabah juga perlu...',['Menyerahkan sisa Cek/Bilyet Giro yang belum digunakan','Menyerahkan seluruh kartu ATM dari rekening lain','Membatalkan seluruh deposito yang dimiliki','Membuat CIF baru untuk menggantikan CIF lama'],'Menyerahkan sisa Cek/Bilyet Giro yang belum digunakan','Sisa Cek/BG merupakan bagian dari administrasi yang harus diserahkan dalam penutupan Giro.','Urutan Proses'],
    ['Nasabah masih tercantum dalam DHN tetapi rekening Giro rupiahnya belum ditutup. Konsekuensi yang paling tepat adalah...',['Hak menggunakan Cek/BG dibekukan meskipun rekening Giro masih dapat tetap ada sesuai kondisi materi','Nasabah bebas menggunakan Cek/BG selama saldo rekening mencukupi','Seluruh deposito nasabah otomatis ikut dibekukan','Nasabah wajib mengubah Giro menjadi tabungan dalam tujuh hari'],'Hak menggunakan Cek/BG dibekukan meskipun rekening Giro masih dapat tetap ada sesuai kondisi materi','Materi membedakan keberadaan rekening Giro dengan hak menggunakan Cek/BG selama sanksi DHN.','Analisis'],
    ['Saat masih tercantum dalam DHN, nasabah kembali menarik Cek kosong. Konsekuensi yang disebut materi adalah...',['Seluruh rekening Giro rupiah pada bank tertarik ditutup dan hak memiliki Giro rupiah dibatasi','Sanksi DHN langsung berakhir karena terjadi transaksi baru','Hanya Cek terakhir yang dibatalkan tanpa dampak pada rekening','Rekening Giro otomatis berubah menjadi deposito berjangka'],'Seluruh rekening Giro rupiah pada bank tertarik ditutup dan hak memiliki Giro rupiah dibatasi','Penarikan Cek kosong kembali selama masih tercantum dalam DHN menimbulkan konsekuensi penutupan Giro rupiah pada bank tertarik sesuai materi.','Kasus'],
    ['Nasabah akan mencairkan deposito di cabang. Dokumen inti yang perlu dibawa untuk verifikasi adalah...',['Bilyet deposito asli dan identitas asli pihak yang berwenang','Buku tabungan dan kartu kredit aktif','Cek kosong terakhir dan rekening koran Giro','Proposal investasi dan laporan keuangan'],'Bilyet deposito asli dan identitas asli pihak yang berwenang','Materi mensyaratkan bilyet asli dan identitas pihak yang berwenang untuk pencairan deposito.','Aplikasi'],
    ['Dana hasil pencairan deposito menurut materi seharusnya dikreditkan ke...',['Rekening atas nama pemilik deposito','Rekening petugas yang melakukan verifikasi','Rekening pihak ketiga yang tidak terkait tanpa otorisasi','Rekening suspense permanen bank'],'Rekening atas nama pemilik deposito','Salah satu syarat pencairan adalah hasil pencairan dikreditkan ke rekening atas nama pemilik deposito.','Konsep'],
    ['Kondisi yang dapat menjadi alasan pencairan atau penutupan deposito adalah...',['Jatuh tempo, eksekusi sebagai agunan, atau deposan meninggal dunia sesuai prosedur','Rekening tidak memiliki transaksi kartu debit selama satu bulan','Nasabah tercantum dalam DHN atas rekening Giro','Perubahan nomor telepon nasabah tanpa perubahan identitas'],'Jatuh tempo, eksekusi sebagai agunan, atau deposan meninggal dunia sesuai prosedur','Materi menyebut beberapa alasan pencairan deposito antara lain jatuh tempo, eksekusi agunan kredit, dan deposan meninggal dunia.','Konsep'],
    ['Tahap awal ketika nasabah meminta rekening kredit ditutup merupakan proses yang dinamakan...',['Pengajuan permohonan penutupan','Verifikasi kewajiban','Pembayaran pelunasan akhir','Penerbitan surat lunas'],'Pengajuan permohonan penutupan','Alur penutupan rekening kredit dimulai ketika nasabah mengajukan permohonan penutupan.','Urutan Proses'],
    ['Setelah permohonan penutupan rekening kredit diterima, bank memeriksa apakah masih ada kewajiban yang belum diselesaikan. Tahap ini dinamakan...',['Verifikasi kewajiban','Pelunasan akhir','Pengembalian jaminan','Penutupan rekening di sistem'],'Verifikasi kewajiban','Setelah permohonan, alur materi menempatkan verifikasi kewajiban sebelum pembayaran pelunasan akhir.','Urutan Proses'],
    ['Kewajiban rekening kredit telah diverifikasi dan jumlah yang harus diselesaikan sudah diketahui. Tahap berikutnya adalah...',['Pembayaran pelunasan akhir','Penerbitan surat lunas','Pengembalian dokumen dan jaminan','Pembukaan fasilitas kredit baru'],'Pembayaran pelunasan akhir','Sesudah verifikasi kewajiban, nasabah menyelesaikan pelunasan akhir.','Urutan Proses'],
    ['Pelunasan akhir kredit telah diterima bank. Dokumen yang selanjutnya diterbitkan adalah...',['Surat lunas','Surat penolakan kredit','Bilyet deposito','Cek perjalanan'],'Surat lunas','Setelah pelunasan akhir, bank menerbitkan surat lunas sebagai bagian dari alur penutupan rekening kredit.','Urutan Proses'],
    ['Setelah surat lunas diterbitkan, tindakan berikut yang sesuai alur penutupan kredit adalah...',['Mengembalikan dokumen dan jaminan kepada nasabah sesuai ketentuan','Melakukan analisis kredit dari awal tanpa permohonan baru','Menerbitkan Cek/BG baru untuk nasabah','Mengubah saldo kredit menjadi deposito otomatis'],'Mengembalikan dokumen dan jaminan kepada nasabah sesuai ketentuan','Alur materi menempatkan pengembalian dokumen dan jaminan setelah surat lunas dan sebelum penutupan final di sistem.','Urutan Proses'],
    ['Dalam restrukturisasi tertentu, rekening kredit lama dapat ditutup karena...',['Kredit akan dibuka kembali dalam skema baru','Nasabah ingin mengubah tabungan menjadi Giro','Bank hendak mengganti nomor CIF tanpa perubahan fasilitas','Deposito nasabah memasuki masa jatuh tempo'],'Kredit akan dibuka kembali dalam skema baru','Materi menyebut restrukturisasi sebagai salah satu alasan penutupan kredit untuk kemudian dibuka dalam skema baru.','Konsep'],
    ['Fungsi utama daftar dokumen atau checklist dalam administrasi pembukaan dan penutupan rekening adalah...',['Memastikan kelengkapan dokumen sebelum filing','Menentukan tingkat bunga seluruh produk nasabah','Menggantikan proses verifikasi identitas','Menentukan posisi jawaban pada formulir aplikasi'],'Memastikan kelengkapan dokumen sebelum filing','Checklist membantu menjamin seluruh dokumen yang diwajibkan sudah tersedia dan dapat ditelusuri.','Aplikasi'],
    ['Filing numerik paling tepat menggunakan indeks...',['Nomor CIF atau nomor rekening','Nama nasabah secara alfabetis','Tanggal transaksi secara kronologis','Jenis pekerjaan nasabah tanpa nomor referensi'],'Nomor CIF atau nomor rekening','Materi menjelaskan filing numerik berdasarkan nomor CIF atau nomor rekening.','Klasifikasi'],
    ['Jika dokumen perlu dicari kembali berdasarkan urutan waktu kejadian, teknik filing yang paling tepat adalah...',['Kronologis berdasarkan tanggal transaksi','Alfabetis berdasarkan nama nasabah','Numerik berdasarkan nomor rekening','Acak berdasarkan petugas pemroses'],'Kronologis berdasarkan tanggal transaksi','Filing kronologis menggunakan tanggal transaksi sebagai dasar pengurutan dokumen.','Aplikasi'],
    ['Dokumen pembukaan dan penutupan harus dapat menjadi bukti autentik saat pemeriksaan internal maupun eksternal. Tujuan administrasi yang paling terkait adalah...',['Keperluan audit dan pelacakan transaksi','Penetapan harga produk simpanan','Peningkatan plafon kredit otomatis','Penghapusan kewajiban retensi dokumen'],'Keperluan audit dan pelacakan transaksi','Administrasi yang baik menyediakan bukti autentik dan jejak transaksi untuk audit serta penelusuran.','Analisis']
  ];

  function makeGold(unit,row,idx){
    const [question,options,answer,explanation,skill]=row,id=`BRIDGE-GOLD-${unit.id}-${String(idx+1).padStart(3,'0')}`;
    return{id,day:BRIDGE_DAY,moduleId:unit.id,moduleName:`BRIDGE · ${unit.name}`,unitCode:unit.code,category:'BRIDGE Unit Kompetensi',question,options:[...options],answer,explanation,source:`${BRIDGE_DECK} · ${unit.section}`,difficulty:idx%5===0?'Expert':'Challenge',skill:skill||'Analisis',generated:false,materialGrounded:true,bridgeSourceDeck:BRIDGE_DECK,bridgeSourceSection:unit.section,bridgeSourceValidated:true,bridgeUnit:true,bridgeUnitIndex:1,goldenQuality:true,rootQuestionId:id,baseId:id,conceptSignature:`bridge-gold:${unit.id}:${idx+1}`,wordingFamily:`gold-${skill||'analisis'}`};
  }

  try{
    const mk='gbpCompetencySourcesV33';
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

  for(const unit of bridgeUnits){
    if(unit.id===36)bank.push(...bridgeOpenCloseGold.map((row,idx)=>makeGold(unit,row,idx)));
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

  function rewriteAmbiguous(raw){
    let q=clean(raw);
    q=q.replace(/^(.+?)\.\s*Bagian proses yang sedang dijelaskan adalah\?$/i,(_,lead)=>`${clean(lead)} merupakan proses yang dinamakan?`);
    q=q.replace(/^(.+?)\.\s*Tahap atau prinsip yang dimaksud adalah\?$/i,(_,lead)=>`${clean(lead)} merupakan tahap yang dinamakan?`);
    q=q.replace(/^(.+?)\.\s*Hal ini paling terkait dengan apa\?$/i,(_,lead)=>`${clean(lead)}. Aspek yang diuji pada kondisi tersebut adalah?`);
    return q;
  }
  bank.forEach(q=>{q.question=rewriteAmbiguous(q.question)});

  const optionSetSig=q=>Array.isArray(q?.options)?q.options.map(norm).sort().join('|'):'';
  const byModuleRaw=new Map();
  for(const q of bank){const mid=Number(q?.moduleId)||0;if(!mid)continue;const arr=byModuleRaw.get(mid)||[];arr.push(q);byModuleRaw.set(mid,arr);}
  const optionUnique=[];
  for(const [mid,rows] of byModuleRaw){
    const ordered=[...rows].sort((a,b)=>Number(!!b.goldenQuality)-Number(!!a.goldenQuality));
    const seenSets=new Set();
    for(const q of ordered){const sig=optionSetSig(q);if(sig&&seenSets.has(sig))continue;if(sig)seenSets.add(sig);optionUnique.push({...q,optionSetGuard:'v33-unique-per-module'});}
  }
  if(optionUnique.length)bank.splice(0,bank.length,...optionUnique);

  const shortcutStop=new Set(`yang dan atau untuk pada dalam dengan dari ke di ini itu tersebut sebuah suatu seorang adalah ialah merupakan sebagai agar serta paling lebih tepat sesuai bank nasabah calon debitur perusahaan petugas unit proses transaksi kegiatan layanan produk jasa perbankan dilakukan melakukan harus dapat akan mana apa apakah bagaimana mengapa manakah berdasarkan terkait kondisi kasus situasi berikut pilihan jawaban tindakan keputusan langkah konsep istilah`.split(' '));
  const robotPrompt=/^(?:apa\s+istilah\s+yang\s+tepat|istilah\s+yang\s+tepat|konsep\s+apa\s+yang\s+tepat|apa\s+yang\s+dimaksud|manakah\s+istilah\s+yang\s+tepat)\b/i;
  const ambiguousTail=/\b(?:bagian proses yang sedang dijelaskan adalah|hal ini paling terkait dengan apa|yang dimaksud adalah|ini termasuk apa)\??$/i;
  const shortcutTokens=raw=>norm(raw).split(' ').filter(t=>t.length>2&&!shortcutStop.has(t)&&!/^[0-9]+$/.test(t));
  const overlap=(question,option)=>{const Q=new Set(shortcutTokens(question)),O=[...new Set(shortcutTokens(option))];if(!O.length)return 0;let n=0;for(const t of O)if(Q.has(t))n++;return n/O.length;};
  const answerIndex=q=>Array.isArray(q.options)?q.options.findIndex(x=>norm(x)===norm(q.answer)):-1;
  function uniqueAnswerClues(q){const ai=answerIndex(q);if(ai<0)return 0;const Q=new Set(shortcutTokens(q.question)),A=[...new Set(shortcutTokens(q.options[ai]))],others=new Set(q.options.filter((_,i)=>i!==ai).flatMap(shortcutTokens));return A.filter(t=>Q.has(t)&&!others.has(t)).length;}
  function phraseLeak(q){const stem=norm(q.question),a=norm(q.answer),at=shortcutTokens(q.answer);if(!stem||!a)return false;if(at.length>=2&&a.length>=8&&stem.includes(a))return true;for(let i=0;i<at.length-1;i++){const p=`${at[i]} ${at[i+1]}`;if(p.length>=8&&stem.includes(p))return true;}return false;}
  function shortcutRisk(q){const ai=answerIndex(q);if(ai<0)return 1;const scores=q.options.map(o=>overlap(q.question,o)),correct=scores[ai],bestOther=Math.max(...scores.filter((_,i)=>i!==ai),0),unique=uniqueAnswerClues(q);if(phraseLeak(q))return 1;if(unique>=2&&correct>=.45&&correct-bestOther>=.25)return .95;if(unique>=1&&correct>=.60&&bestOther<=.20)return .9;if(correct>=.75&&correct-bestOther>=.40)return .85;return Math.max(0,correct-bestOther*.65);}

  const byModule=new Map();
  for(const q of bank){const mid=Number(q?.moduleId)||0;if(!mid)continue;const arr=byModule.get(mid)||[];arr.push({q,risk:shortcutRisk(q),robot:robotPrompt.test(clean(q.question)),ambiguous:ambiguousTail.test(clean(q.question))});byModule.set(mid,arr);}
  const filtered=[],audit={};
  for(const [mid,rows] of byModule){
    const safe=rows.filter(x=>x.risk<.85&&!x.robot&&!x.ambiguous),nonLeak=rows.filter(x=>x.risk<.85&&!x.ambiguous),chosen=safe.length>=25?safe:nonLeak;
    filtered.push(...chosen.map(x=>({...x.q,shortcutRisk:Number(x.risk.toFixed(3)),shortcutGuard:'v33'})));
    audit[mid]={raw:rows.length,safe:safe.length,kept:chosen.length,rejectedLeak:rows.filter(x=>x.risk>=.85).length,rejectedRobot:rows.filter(x=>x.robot).length,rejectedAmbiguous:rows.filter(x=>x.ambiguous).length};
  }
  if(filtered.length)bank.splice(0,bank.length,...filtered);

  window.NUPMK_UNITS=nupmkUnits.map(u=>({...u,day:NUPMK_DAY,maxBank:MAX_BANK}));
  window.BRIDGE_UNITS=bridgeUnits.map((u,i)=>({...u,index:i+1,moduleName:`BRIDGE · ${u.name}`,day:BRIDGE_DAY,maxBank:MAX_BANK,sourceDeck:BRIDGE_DECK}));
  window.BRIDGE_SOURCE_DECK=BRIDGE_DECK;
  window.__GBP_SHORTCUT_AUDIT__=audit;
  window.__GBP_SHORTCUT_GUARD_VERSION__='V33-context-options-explicit-stems';
  window.__GBP_SOURCE_BANK__=bank.map(q=>({...q,options:Array.isArray(q.options)?[...q.options]:q.options}));
})();