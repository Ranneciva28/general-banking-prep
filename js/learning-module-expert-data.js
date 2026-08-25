(() => {
  const N = 'General Banking Certification';
  const B = 'SERTIFIKASI GB 4 PPT BRIDGE';
  const chapter = (title, lead, rows, source) => ({title, lead, rows, source});

  window.GBPLearningExpert = {
    'K.64GEB00.001.1': {
      note:'Angka setoran, nama formulir, menu, dan pejabat approval di bawah mengikuti materi sertifikasi. Dalam praktik, gunakan ketentuan produk dan limit kewenangan bank yang sedang berlaku.',
      chapters:[
        chapter('Matriks jenis rekening dan persyaratan','Pembukaan tidak memakai satu checklist universal; legal form, produk, tujuan, dan pihak yang mengoperasikan menentukan dokumennya.',[
          ['Tabungan/Giro perorangan','Form aplikasi, KTP/KITAS, NPWP atau surat keterangan, setoran awal, specimen, dan verifikasi identitas.','Giro menambah kontrol cek/BG, referensi/perjanjian giro, dan DHN.'],
          ['Nonperorangan','Status badan, NPWP, NIB/izin usaha, akta pendirian dan perubahan terakhir, AD, pengurus, surat kuasa, serta identitas wakil.','Periksa legal standing sekaligus authority orang yang hadir.'],
          ['Deposito','Harus memiliki rekening tabungan/giro sumber; identitas asli; instruksi nominal, tenor, bunga, ARO/non-ARO, rekening pencairan, dan pajak.','Materi mencantumkan setoran minimum berbeda menurut kanal; jangan digeneralisasi ke semua bank.'],
          ['Rekening kredit','Dibentuk sesudah permohonan, analisis, dan approval kredit; menampung disbursement serta repayment.','Onboarding kredit lebih panjang dan KYC/dokumennya lebih dalam.'],
          ['WIC','Walk-in customer menggunakan jasa bank tanpa memiliki rekening pada bank.','Identitas, formulir WIC, tujuan dan dokumen transaksi dapat tetap diwajibkan meskipun bukan nasabah rekening.']
        ],`${N}, hlm. 6–8 dan 55; ${B}, hlm. 359–418.`),
        chapter('Joint account, QQ, dan kapasitas khusus','Bedakan siapa pemilik dana, siapa pemilik CIF, siapa yang tampil pada rekening, dan siapa yang boleh memberi instruksi.',[
          ['CIF utama joint account','Satu CIF dipakai sebagai CIF induk; CIF anggota didaftarkan sebagai pemilik rekening. Nama CIF utama dapat tampil di depan nama rekening/header/e-channel.','CIF utama bukan berarti anggota lain kehilangan ownership.'],
          ['Mandat AND','Transaksi memerlukan tanda tangan/persetujuan bersama sesuai mandat.','Satu anggota datang sendiri tidak cukup untuk instruksi yang mensyaratkan AND.'],
          ['Mandat OR','Salah satu anggota dapat bertindak sendiri sesuai mandat dan limit yang disepakati.','Tetap verifikasi identitas, status rekening, dan ruang kewenangan.'],
          ['Rekening QQ','Rekening dioperasikan oleh orang tua/wali untuk kepentingan anak/pihak yang diwakili.','Periksa kapasitas, hubungan, dokumen anak, dan dasar perwakilan.'],
          ['Nasabah berkebutuhan khusus','Materi membedakan kondisi yang dapat dilayani seperti biasa dan kondisi yang memerlukan pendamping/wakil.','Jangan menyamakan disabilitas dengan ketidakcakapan hukum; fokus pada kemampuan menyatakan kehendak dan dasar perwakilan.']
        ],`${N}, hlm. 3–4; ${B}, hlm. 372–399.`),
        chapter('Dokumen rekening kredit per tujuan','Jenis kredit menjelaskan kebutuhan informasi dan bukti yang berbeda.',[
          ['KMK','Form permohonan, KTP/NPWP, NIB, akta, laporan keuangan 2 tahun, mutasi 3–6 bulan, agunan dan izin khusus bila relevan.','Menguji usaha berjalan dan kebutuhan modal kerja.'],
          ['KI','Seluruh dokumen KMK ditambah proposal investasi, proyeksi arus kas, RAB, kontrak buyer, dan dokumen teknis.','Fokus pada kelayakan proyek dan kemampuan cash flow masa depan.'],
          ['KPR/KKB','KTP, KK, NPWP, slip gaji, rekening koran, SK pegawai, sertifikat/BPKB, dan surat pemesanan.','Fokus pada repayment capacity serta objek/agunan.'],
          ['Kartu kredit','Identitas, bukti penghasilan/kerja, rekening 3 bulan, dokumen usaha bila wiraswasta, dan tagihan kartu lain.','Menilai kemampuan dan exposure revolving.'],
          ['Disbursement vs repayment','Disbursement adalah pencairan fasilitas; repayment adalah pembayaran kembali pokok/bunga/biaya.','Keduanya harus terhubung ke rekening dan perjanjian yang tepat.']
        ],`${N}, hlm. 7–8; ${B}, hlm. 390–406.`),
        chapter('Penutupan, restricted, dan DHN','Penutupan adalah proses kontrol, bukan sekadar perubahan status sistem.',[
          ['AFT/standing instruction masih aktif','Rekening tidak langsung ditutup bila ada instruksi otomatis atau transaksi terkait yang masih menggantung.','Batalkan/selesaikan linkage terlebih dahulu.'],
          ['AR-04 dan maker-checker-signer','Nasabah menandatangani formulir; CS memeriksa; pejabat berwenang memberi approval.','Tiga lapis peran menjaga bukti kehendak dan otorisasi.'],
          ['Rekening pasif/restricted','Materi menyebut pasif setelah 6 bulan tanpa transaksi, menjadi restricted, dapat diaktifkan melalui maintenance, dan ditutup sistem setelah saldo habis.','Parameter ini bersifat product/internal-policy reference.'],
          ['Pemicu DHN','Materi menyebut ≥3 cek/BG kosong masing-masing <Rp500 juta dalam 6 bulan pada bank yang sama, atau 1 lembar ≥Rp500 juta.','Pemilik kehilangan hak menggunakan cek/BG sesuai mekanisme DHN.'],
          ['Konsekuensi DHN','Pembekuan penggunaan cek/BG selama 1 tahun; penarikan kosong kembali saat masih DHN dapat memicu penutupan seluruh giro rupiah pada bank tertarik.','Materi juga menyebut kesempatan 7 hari untuk penyelesaian cek/BG kosong.']
        ],`${N}, hlm. 5–10; ${B}, hlm. 400–418.`)
      ],
      glossary:[
        ['AFT','Automatic Fund Transfer/transfer terjadwal yang terhubung ke rekening.','Harus diselesaikan atau dialihkan sebelum penutupan.'],
        ['AR-04','Formulir penutupan rekening pada materi operasional.','Menjadi bukti permintaan dan dasar maker-checker-signer.'],
        ['Restricted Account','Rekening yang dibatasi transaksinya karena status tertentu, misalnya pasif/dormant atau kontrol lain.','Aktivasi memerlukan maintenance dan verifikasi.'],
        ['KMK','Kredit Modal Kerja untuk kebutuhan siklus operasional usaha.','Dokumen fokus pada usaha berjalan dan cash conversion.'],
        ['KI','Kredit Investasi untuk pembiayaan aset/proyek jangka lebih panjang.','Memerlukan proposal, RAB, proyeksi, dan dokumen teknis.'],
        ['KCTT / SVS','Kartu Contoh Tanda Tangan atau Signature Verification System.','Media pembanding authority transaksi.']
      ]
    },

    'K.64GEB00.002.2': {
      note:'Tarif kanal, jam layanan, threshold, nama formulir, dan nama sistem di bawah merupakan reference dari materi. Cocokkan selalu dengan kebijakan dan tarif efektif bank.',
      chapters:[
        chapter('Siklus hari operasional cabang','Kegiatan teller dibagi menjadi start-of-day, service window, balancing, dan close branch.',[
          ['07.30–08.00 awal hari','Briefing, buka cabang di sistem, serah-terima kas, cek persediaan, agenda standing instruction/jatuh tempo, dan kebutuhan likuiditas.','Tidak ada pelayanan sebelum cash position dan sistem valid.'],
          ['08.00–15.00 layanan','Teller menerapkan TNT NaNo, konfirmasi, hitung uang, posting, validasi, dan filing.','Jam adalah acuan materi; cut-off kanal dapat berbeda.'],
          ['15.00–16.30 akhir hari','Cetak laporan, balancing, rekonsiliasi, kembalikan kas/controlled items, dan selesaikan pending.','Close branch hanya setelah cash on hand dan exception clear.'],
          ['Open branch control','VBI awal harus sama dengan hari sebelumnya, tanggal NDS cocok dengan komputer, dan tidak ada selisih kas.','Mencegah salah tanggal buku atau posisi kas awal.'],
          ['Close branch control','Semua user logout, semua transaksi approved, cash teller/supervisor nol, serta tidak ada selisih.','Pending transaction membuat closing tidak sah.']
        ],`${N}, hlm. 10–14; ${B}, hlm. 419–448.`),
        chapter('Kamus formulir operasional','Warna dan kode formulir membantu mengarahkan transaksi dan filing.',[
          ['OPS-01 merah','Slip penarikan dan pemindahbukuan.','Periksa rekening, nominal, terbilang, specimen, dan penerima.'],
          ['OPS-02 biru','Slip penyetoran.','Periksa penyetor, rekening tujuan, pecahan, jumlah, dan sumber dana.'],
          ['OPS-03 hijau','Slip pengiriman uang/overbooking.','Pastikan beneficiary dan kanal pemindahan.'],
          ['UM-01 / UM-02','UM-01 teller cash in (tambahan kas); UM-02 teller cash out/setoran kas.','Pergeseran kas harus denominasi, tanda tangan, approval, hitung ulang, dan posting sistem.'],
          ['AR/FR/SG/KCTT','AR-01/02 pembukaan/perubahan data; AR-03 relasi; AR-04 penutupan; FR-01/02 fasilitas; SG-02/03 giro; KCTT specimen.','Jangan memakai form transaksi untuk perubahan master data.']
        ],`${N}, hlm. 12–13; ${B}, hlm. 432–458.`),
        chapter('Kontrol tunai dan identitas transaksi','Teller memeriksa bentuk angka, kewenangan, keaslian uang, serta kewajaran.',[
          ['TNT NaNo','Tanggal, Nominal, Terbilang, Nama, dan Nomor rekening.','Mismatch satu elemen cukup untuk menghentikan posting.'],
          ['Stopping','Pemberian tanda pemisah/penutup pada nominal angka untuk mencegah penambahan digit.','Contoh materi: Rp23.|456.|100,-.'],
          ['Thickmark','Nominal ditulis dengan huruf/terbilang.','Harus konsisten dengan angka dan tidak menyisakan ruang manipulasi.'],
          ['Penarikan dengan kuasa','Konfirmasi kepada pemilik; materi tidak memperkenankan kuasa dipakai di luar cabang pengelola.','Periksa identitas, original kuasa, ruang lingkup, dan specimen.'],
          ['WIC dan transaksi besar','Materi mencantumkan form WIC + identitas pada Rp100 juta dan escalation/reporting pada akumulasi Rp500 juta.','Angka adalah acuan materi; penerapan mengikuti APU-PPT/internal rule terkini.']
        ],`${N}, hlm. 11–13 dan 55–56; ${B}, hlm. 448–470.`),
        chapter('Kanal non-tunai dan rekonsiliasi','Instrumen, kanal settlement, dan laporan akhir hari tidak boleh tertukar.',[
          ['Cek vs BG','Cek adalah perintah bayar; bilyet giro adalah perintah pemindahbukuan. Cek silang diproses melalui kliring.','Periksa tanggal efektif, dana, tanda tangan, koreksi, dan status DHN.'],
          ['SKNBI','Kanal kliring ritel/batch; materi mencontohkan biaya Rp2.900, 2–3 hari, maksimum Rp1 miliar.','Tarif/waktu/limit harus dilihat pada ketentuan efektif.'],
          ['RTGS','Gross real-time untuk nilai besar/urgent; materi mencontohkan biaya Rp30.000 dan minimum Rp100 juta.','Perhatikan cut-off, finality, beneficiary, dan kecukupan dana.'],
          ['Incoming/Outward remittance','Incoming menerima dana valas dari luar; outward mengirim dana dari dalam ke luar negeri.','Periksa SWIFT, charges, purpose, beneficiary, sanctions screening.'],
          ['AATR, TTIL, TTIH','AATR mencatat transaksi finansial/nonfinansial; TTIL local-KC dan TTIH host-Kanpus harus match.','Mismatch adalah exception yang wajib ditelusuri sebelum closing.']
        ],`${N}, hlm. 12–14; ${B}, hlm. 459–480.`)
      ],
      glossary:[
        ['TNT NaNo','Checklist Tanggal, Nominal, Terbilang, Nama, dan Nomor rekening.','Kontrol kelengkapan warkat sebelum posting.'],
        ['Stopping','Tanda penutup pada penulisan angka nominal.','Mencegah digit ditambahkan.'],
        ['Thickmark','Penulisan nominal secara terbilang.','Pembanding terhadap nominal angka.'],
        ['AATR','Laporan/arsip aktivitas transaksi finansial dan nonfinansial.','Wajib direkonsiliasi dan disimpan.'],
        ['TTIL / TTIH','Catatan transaksi local cabang dan host kantor pusat.','Selisih menunjukkan proses/interface perlu ditelusuri.'],
        ['Spectroline','Alat/metode bantu pemeriksaan unsur pengaman atau kesesuaian tanda tangan/dokumen pada materi.','Tidak menggantikan seluruh verifikasi authority.']
      ]
    },

    'K.64GEB00.003.2': {
      note:'Klasifikasi value date dan threshold di bawah mengikuti materi yang merujuk PBI 6/2024 dan PADG 11/2024. Regulasi pasar valas dinamis; gunakan sebagai materi ujian dan cek ketentuan BI terbaru untuk transaksi nyata.',
      chapters:[
        chapter('TOD, TOM, SPOT, dan FORWARD','Pembeda utama adalah tanggal penyerahan dana (value date), bukan sekadar kapan rate ditanyakan.',[
          ['FX TOD / Today','Deal dan settlement dilakukan pada hari kerja yang sama (T+0).','Cocok untuk kebutuhan dana sangat segera; cut-off dan likuiditas intraday krusial.'],
          ['FX TOM / Tomorrow','Settlement dilakukan satu hari kerja setelah deal (T+1).','Hari libur mata uang/negara dapat menggeser value date.'],
          ['FX SPOT','Settlement standar dua hari kerja setelah tanggal transaksi (T+2).','Bukan “transaksi langsung tunai”; rate dikunci saat deal, dana berpindah pada value date.'],
          ['FX FORWARD','Settlement lebih dari dua hari kerja; rate dan nominal disepakati pada trade date.','Mengunci nilai kewajiban/penerimaan masa depan.'],
          ['Bank Notes','Uang kertas fisik; materi menyatakan tidak diperlakukan sebagai spot dan wajib cek keaslian, keutuhan, emisi, serta denominasi marketable.','Kurs bank notes dapat berbeda dari devisa umum/nonfisik.']
        ],`${N}, hlm. 15–18; ${B}, hlm. 267–279.`),
        chapter('Derivatif dan struktur payoff','Produk treasury berbeda menurut delivery, hak/kewajiban, dan jumlah kaki transaksi.',[
          ['Deliverable Forward','Kedua mata uang benar-benar diserahkan pada maturity dengan rate kontrak.','Butuh rekening dan instruksi settlement.'],
          ['DNDF','Domestic Non-Deliverable Forward diselesaikan secara net dalam rupiah berdasarkan selisih rate kontrak dan fixing/reference rate.','Tidak terjadi penyerahan principal valas seperti deliverable forward.'],
          ['FX Swap','Kombinasi beli/jual valas pada near leg dan transaksi berlawanan pada far leg.','Mengelola likuiditas valuta dan timing, bukan directional bet semata.'],
          ['FX Option','Memberi hak, bukan kewajiban, membeli (call) atau menjual (put) pada strike price.','Buyer membayar premium; exercise bergantung nilai ekonomis dan terms.'],
          ['Early termination / unwind','Pengakhiran atau pembalikan posisi sebelum jatuh tempo.','Dapat menimbulkan mark-to-market gain/loss dan membutuhkan approval/dokumen.']
        ],`${N}, hlm. 16–18; ${B}, hlm. 274–289.`),
        chapter('Matriks threshold dan underlying','Nominal, arah transaksi, jenis produk, dan periode agregasi menentukan dokumen.',[
          ['Beli TOD/TOM/SPOT','Materi: tanpa underlying paling banyak USD100.000 ekuivalen per bulan per nasabah.','Sampai threshold tetap memakai pernyataan tertulis sesuai ketentuan.'],
          ['Beli Forward/DNDF','Materi: batas tanpa underlying USD100.000 ekuivalen per bulan per nasabah.','Tenor dan nominal tidak boleh melampaui underlying ketika diwajibkan.'],
          ['Beli FX Swap','Materi: batas tanpa underlying USD5.000.000 ekuivalen per transaksi.','Perhitungan memperhatikan leg transaksi sesuai ketentuan.'],
          ['Jual Forward/DNDF/Swap','Materi: batas tanpa underlying USD5.000.000 per transaksi; derivatif lain USD1.000.000 per transaksi.','Arah beli/jual dilihat dari pelaku terhadap bank sesuai wording ketentuan.'],
          ['Dokumen di atas threshold','Underlying final/prakiraan dan surat pernyataan kebenaran; nominal serta tenor transaksi harus match.','Dokumen yang sama tidak boleh dipakai melebihi nilai aktivitas ekonominya.']
        ],`${N}, hlm. 16–17; ${B}, hlm. 280–289.`),
        chapter('Quotation, market view, dan kontrol deal','Bahasa dealing harus presisi karena perbedaan satu kata mengubah posisi dan settlement.',[
          ['Bid / Offer','Bid adalah harga beli pemberi quote; offer adalah harga jualnya.','Customer membeli base currency menggunakan offer bank.'],
          ['Quoting / Asking','Quoting party memberikan harga; asking party meminta harga.','Catat siapa dealer/counterparty dan timestamp.'],
          ['Technical analysis','Membaca pola harga/volume historis dan indikator pasar.','Tidak menghapus kebutuhan underlying atau suitability.'],
          ['Fundamental analysis','Menilai suku bunga, inflasi, neraca perdagangan, kebijakan, dan kondisi ekonomi/politik.','Membantu view, tetapi rate deal tetap harus dikonfirmasi.'],
          ['Deal control','Ulangi buy/sell, pair, amount, rate, value date, settlement instruction, dan kode dealer.','Trade capture, confirmation, settlement, serta reconciliation idealnya tersegregasi.']
        ],`${N}, hlm. 15–18; ${B}, hlm. 267–295.`)
      ],
      glossary:[
        ['TOD (Today)','Transaksi cash dengan settlement pada hari yang sama/T+0.','Berbeda dari TOM dan SPOT pada value date.'],
        ['TOM (Tomorrow)','Transaksi cash dengan settlement satu hari kerja/T+1.','Perhatikan kalender hari kerja kedua mata uang.'],
        ['SPOT','Transaksi dengan settlement standar dua hari kerja/T+2.','Rate deal dikunci sebelum settlement.'],
        ['DNDF','Forward non-deliverable domestik yang diselesaikan net dalam rupiah terhadap fixing.','Tidak menyerahkan principal valas secara penuh.'],
        ['Strike Price','Harga yang disepakati untuk exercise option.','Menentukan nilai hak call/put.'],
        ['Unwind','Transaksi untuk menutup atau membalik posisi sebelum maturity.','Menimbulkan valuasi dan approval baru.']
      ]
    },

    'K.64GEB00.007.1': {
      note:'Target, frekuensi, dan format pelaporan dapat berubah mengikuti POJK. Materi teknis di bawah dipertahankan sebagai reference sertifikasi dan harus dibaca bersama ketentuan OJK yang berlaku.',
      chapters:[
        chapter('Fondasi kebijakan literasi dan inklusi','Program harus menunjukkan tujuan publik, tata kelola, target, dan hasil belajar.',[
          ['Masalah yang dijawab','Rendahnya pemahaman, tantangan wilayah 3T, akses layanan formal, risiko produk ilegal, dan perlindungan konsumen.','Need assessment harus mendahului desain program.'],
          ['Prinsip pelaksanaan','Terencana dan terukur, berorientasi pencapaian, serta berkelanjutan.','Satu event tanpa indikator dan follow-up belum cukup.'],
          ['Literasi','Pengetahuan, keterampilan, keyakinan, sikap, dan perilaku pengambilan keputusan.','Diukur lewat comprehension/action, bukan hanya kepemilikan produk.'],
          ['Inklusi','Akses dan penggunaan produk/layanan yang sesuai kebutuhan serta kemampuan.','Pembukaan akses tanpa edukasi risiko dapat menciptakan harm.'],
          ['Perlindungan','Informasi transparan, pengenalan fraud/produk ilegal, hak dan kanal pengaduan.','Edukasi tidak boleh berubah menjadi promosi sepihak.']
        ],`${N}, hlm. 19–20; ${B}, hlm. 696–706.`),
        chapter('Elemen RBB dan workplan edukasi','Rencana yang dapat diaudit harus menjawab apa, siapa, kapan, di mana, oleh siapa, dengan biaya berapa, dan bagaimana mengukurnya.',[
          ['Identitas kegiatan','Nama, tujuan, bentuk, dan metode pelaksanaan.','Tujuan harus berupa capability peserta, bukan slogan.'],
          ['Sasaran','Segmen, jumlah peserta, wilayah, kebutuhan, baseline, dan aksesibilitas.','Pelajar, UMKM, pensiunan, dan 3T memerlukan desain berbeda.'],
          ['Materi','Karakteristik sektor/produk, pengelolaan keuangan, risiko, perpajakan, keamanan, hak dan kewajiban.','Scope harus sesuai tujuan dan durasi.'],
          ['Sumber daya','PIC/SDM, mitra, media, lokasi/platform, perizinan, jadwal, frekuensi, serta biaya.','Tidak boleh ada activity tanpa owner.'],
          ['Indikator/evaluasi','Output, outcome, alat ukur, bukti, target, dan rencana tindak lanjut.','Cantumkan sejak planning, bukan dibuat setelah acara.']
        ],`${N}, hlm. 20–22; ${B}, hlm. 701–712.`),
        chapter('Taksonomi metode edukasi','Metode ditentukan oleh kedalaman kompetensi dan kondisi peserta.',[
          ['Sosialisasi','Penyebaran awareness/informasi ke audiens luas.','Cocok untuk pesan dasar; pemahaman mendalam perlu metode lanjutan.'],
          ['Lokakarya/pelatihan','Belajar aktif melalui diskusi, latihan, dan praktik.','Cocok untuk budgeting, simulasi produk, dan keamanan digital.'],
          ['Pendampingan/konsultasi','Dukungan individual/kelompok kecil secara berulang.','Cocok untuk perubahan perilaku UMKM atau kelompok rentan.'],
          ['Permainan/simulasi','Peserta mengambil keputusan dalam skenario yang aman.','Gunakan debrief agar peserta memahami prinsip, bukan hanya menang.'],
          ['Digital dan kemitraan','Website, aplikasi, media sosial, webinar, sekolah, kampus, pemerintah, komunitas.','Ukur reach, engagement, completion, dan comprehension.']
        ],`${N}, hlm. 21–22; ${B}, hlm. 707–715.`),
        chapter('Evaluasi dari output ke outcome','Bukti kegiatan dan bukti belajar adalah dua hal berbeda.',[
          ['Output','Jumlah sesi, peserta, wilayah, materi, jam, atau impressions.','Menjawab apa yang dilakukan.'],
          ['Immediate outcome','Perubahan skor pengetahuan, kemampuan simulasi, atau teach-back.','Menjawab apa yang dipahami.'],
          ['Behavioral outcome','Perubahan perilaku seperti penggunaan autentikasi aman, budgeting, atau pemilihan produk.','Memerlukan follow-up setelah kegiatan.'],
          ['Quality evidence','Pre/post test, rubric simulasi, feedback, observation, attendance, materi, foto, dan log digital.','Bukti harus terhubung ke kegiatan dan peserta/segmen.'],
          ['Laporan realisasi','Bandingkan target vs aktual, kendala, hasil, exception, lesson learned, dan corrective action.','Bukan hanya narasi acara.']
        ],`${N}, hlm. 20–22; ${B}, hlm. 712–718.`)
      ],
      glossary:[
        ['Rencana Literasi','Rencana tahunan kegiatan literasi yang memuat sasaran, aktivitas, sumber daya, dan indikator.','Menjadi komitmen yang dimonitor.'],
        ['Realisasi Literasi','Laporan pelaksanaan dibanding rencana beserta hasil dan deviasi.','Membuktikan akuntabilitas program.'],
        ['Lokakarya','Metode belajar partisipatif dengan latihan/praktik.','Lebih dalam daripada sosialisasi satu arah.'],
        ['Pendampingan','Dukungan berkelanjutan agar peserta menerapkan pengetahuan.','Cocok untuk outcome perilaku.'],
        ['Rubric','Kriteria penilaian performa pada simulasi atau tugas.','Mengubah evaluasi kualitatif menjadi konsisten.'],
        ['Accessibility','Desain materi/kanal agar dapat digunakan peserta dengan kebutuhan berbeda.','Bagian dari inklusi yang substantif.']
      ]
    },

    'K.64GEB00.009.1': {
      note:'Tarif, pajak, penalti, dan fitur produk di bawah mengikuti contoh materi. Petugas wajib menggunakan RIPLAY/ringkasan dan ketentuan produk versi efektif saat menjelaskan kepada nasabah.',
      chapters:[
        chapter('Anatomi informasi produk yang material','Informasi lengkap harus memungkinkan nasabah memahami trade-off dan membandingkan alternatif.',[
          ['Fitur','Cara kerja, tenor, limit, akses, mata uang, bunga/bagi hasil, dan fasilitas.','Fitur harus diterjemahkan menjadi manfaat yang relevan.'],
          ['Biaya','Administrasi, transaksi, provisi, notaris, appraisal, asuransi, pajak, penalti, atau biaya pihak ketiga.','Jelaskan nominal/rate, kapan dikenakan, dan apakah dapat berubah.'],
          ['Risiko','Likuiditas, bunga, nilai, kredit, keamanan, operasional, legal, dan konsekuensi default.','Gunakan skenario downside yang masuk akal.'],
          ['Syarat dan konsekuensi','Eligibility, dokumen, saldo minimum, covenant, jatuh tempo, early termination, pemblokiran, dan penutupan.','Poin material tidak boleh disembunyikan di fine print.'],
          ['Hak dan bantuan','Salinan perjanjian/ringkasan, privasi, kanal layanan, pengaduan, dan penyelesaian sengketa.','Nasabah harus tahu cara memperbaiki masalah.']
        ],`${N}, hlm. 22–25; ${B}, hlm. 680–695.`),
        chapter('Biaya dan risiko produk dana','Setiap produk dana memiliki risiko yang berbeda meskipun sama-sama disebut simpanan.',[
          ['Tabungan','Biaya administrasi, kartu/buku, dormant, ATM antarbank, dan penutupan; risiko bunga turun, penyalahgunaan, pembobolan, keamanan digital.','Cocok untuk transaksi/likuiditas, bukan selalu return maksimum.'],
          ['Giro','Biaya administrasi, cek/BG, penolakan, kliring/inkaso, rekening koran, stop payment; risiko dana tak cukup, pemalsuan, gagal kliring.','Cocok untuk pembayaran bisnis dengan kontrol warkat.'],
          ['Deposito','Penalti pencairan, pajak bunga, bilyet, transfer bunga; risiko opportunity cost, inflasi, dan kehilangan bilyet.','Tenor mengurangi fleksibilitas likuiditas.'],
          ['Bunga vs pajak/biaya','Return bruto tidak sama dengan hasil bersih.','Simulasi harus menunjukkan pajak dan biaya.'],
          ['Digital security','PIN, password, OTP, phishing, malware, SIM swap, dan social engineering.','Security disclosure adalah bagian product information.']
        ],`${N}, hlm. 23–25; ${B}, hlm. 684–692.`),
        chapter('Siklus dan economics produk kredit','Informasi kredit harus mengikuti seluruh lifecycle, bukan hanya rate awal.',[
          ['Tahap 1–2','Pengumpulan/verifikasi lalu analisis dan persetujuan.','Belum ada kepastian kredit sebelum approval berwenang.'],
          ['Tahap 3','Administrasi, perjanjian, pengikatan, pembukuan, dan pencairan.','Conditions precedent harus dipenuhi.'],
          ['Tahap 4–5','Monitoring, pembayaran, pelunasan, restrukturisasi/penyelamatan bila bermasalah.','Jelaskan kewajiban sepanjang tenor.'],
          ['Komponen biaya','Bunga, provisi, administrasi, notaris, appraisal, asuransi, materai, legalitas, pengikatan, dan early repayment bila ada.','Total cost lebih penting daripada headline rate.'],
          ['Risiko','Default, floating rate, eksekusi/penurunan nilai agunan, biaya tambahan, legal-document risk, perubahan pasar/regulasi.','Nasabah harus memahami dampak gagal memenuhi kewajiban.']
        ],`${N}, hlm. 24–25; ${B}, hlm. 680–695.`),
        chapter('Consultative selling sampai level percakapan','Setiap tahap memiliki output yang harus terlihat.',[
          ['Approach','Perkenalan, tujuan, izin menggali kebutuhan, dan rapport.','Output: nasabah bersedia berdialog.'],
          ['Probe','Situation, problem, implication, dan need-payoff/priority questions.','Output: kebutuhan, constraint, dan decision criteria.'],
          ['Present','Hubungkan fitur-benefit dengan kebutuhan; disclose biaya, risiko, syarat, dan alternatif.','Output: rekomendasi beralasan.'],
          ['Objection/negotiation','Listen, clarify, acknowledge, respond, confirm; negosiasi hanya dalam authority.','Output: keberatan terselesaikan atau produk dinyatakan tidak cocok.'],
          ['Close/confirm','Ringkas pilihan, teach-back, consent sukarela, dokumen, next step, dan after-sales channel.','Tanda tangan tanpa pemahaman bukan closing yang sehat.']
        ],`${B}, hlm. 614–695; ${N}, hlm. 23–25.`)
      ],
      glossary:[
        ['Provisi','Biaya atas penyediaan/persetujuan fasilitas kredit, lazim dihitung dari limit atau pencairan.','Berbeda dari bunga atas saldo terutang.'],
        ['Appraisal Fee','Biaya penilaian agunan/aset oleh pihak yang berwenang.','Mempengaruhi total acquisition cost.'],
        ['Floating Rate','Suku bunga yang dapat berubah mengikuti parameter/ketentuan.','Angsuran atau beban bunga dapat meningkat.'],
        ['Stop Payment','Instruksi penghentian pembayaran warkat dengan alasan dan prosedur sah.','Bukan jaminan warkat pasti tidak dibayar bila terlambat/tidak valid.'],
        ['Inkaso','Jasa penagihan warkat/dokumen kepada bank atau lokasi lain.','Memiliki waktu, biaya, dan risiko penolakan.'],
        ['Opportunity Cost','Manfaat alternatif yang hilang karena dana terikat pada pilihan tertentu.','Relevan pada deposito dan tenor kredit.']
      ]
    },

    'K.64GEB00.010.1': {
      note:'PDF memuat POJK 18/2018 dan SLA 5/20 hari. POJK 22/2023 kini menjadi payung pelindungan konsumen dan mencabut/mengubah sejumlah ketentuan lama; gunakan angka PDF untuk konteks ujian dan cek ketentuan OJK terkini untuk praktik.',
      chapters:[
        chapter('Klasifikasi pengaduan dan ownership','Jenis masalah menentukan prioritas, tim, bukti, dan SLA.',[
          ['Mechanical/technical','Gangguan mesin, aplikasi, kartu, jaringan, atau proses teknis.','Kumpulkan timestamp, device/channel, error, dan log.'],
          ['Attitudinal','Perilaku petugas seperti tidak sopan, diskriminatif, atau tidak empatik.','Bukti dapat berupa rekaman, saksi, CCTV, dan service standard.'],
          ['Service-related','Layanan lambat, informasi tidak jelas, proses gagal, atau hasil tidak sesuai.','Pisahkan service failure dari product terms.'],
          ['Unusual complaint','Keluhan yang terutama membutuhkan didengar/ditenangkan atau tidak cocok dengan kategori umum.','Tetap dicatat faktual dan jangan meremehkan.'],
          ['Fraud indicator','Transaksi tidak dikenal, account takeover, pemalsuan, atau kolusi.','Containment dan unit anti-fraud/internal audit diprioritaskan.']
        ],`${N}, hlm. 26–30; ${B}, hlm. 731–756.`),
        chapter('Penerimaan, bukti, dan SLA','Acknowledgement bukan penyelesaian; registrasi harus cukup untuk investigasi.',[
          ['Kanal','Langsung, telepon, email/surat, media sosial, website/call center.','Lisan dan tertulis harus diterima serta dicatat.'],
          ['Konfirmasi penerimaan','Nomor registrasi, tanggal, tanda terima, kontak status, dokumen yang kurang, dan ringkasan masalah.','Mencegah sengketa kapan SLA dimulai.'],
          ['SLA materi','Materi menyebut lisan paling lama 5 hari kerja dan tertulis 20 hari kerja.','Labeli sebagai ketentuan materi; validasi dengan aturan terkini.'],
          ['Perpanjangan','Harus diberitahukan tertulis; materi mengaitkan dengan kebutuhan tindak lanjut pihak lain.','Bukan perpanjangan otomatis karena backlog internal.'],
          ['Penolakan penanganan','Dokumen tidak dilengkapi, kasus telah selesai, tidak terkait kerugian/perjanjian, atau bukan transaksi/produk bank.','Penolakan tetap memerlukan dasar dan komunikasi yang jelas.']
        ],`${N}, hlm. 26–28; ${B}, hlm. 724–742.`),
        chapter('Tiga lapis unit pengaduan','Ownership bankwide mencegah kasus berputar tanpa PIC.',[
          ['Unit penerima','Seluruh uker/call center/kanal menerima, verifikasi awal, registrasi, dan meneruskan.','Tidak selalu berwenang memutus kompensasi.'],
          ['Unit penyelesaian','Unit pemilik domain produk/proses melakukan investigasi dan corrective action.','Harus bebas conflict of interest yang material.'],
          ['Unit pengelola','Fungsi khusus memonitor SLA, kualitas, register, tren, dan laporan bankwide.','Menjaga konsistensi antarunit.'],
          ['Unit fraud','Internal audit/anti-fraud dan unit terkait menangani indikasi fraud sesuai strategi anti-fraud.','Jaga bukti dan need-to-know.'],
          ['Legal/escalation','Kasus kompleks, berpotensi sengketa, regulator, atau reputasi dieskalasikan.','Frontliner tidak membuat legal conclusion sendiri.']
        ],`${N}, hlm. 28–30; ${B}, hlm. 742–766.`),
        chapter('Closure, trend, dan regulatory update','Pengaduan menghasilkan pemulihan nasabah sekaligus pembelajaran kontrol.',[
          ['Tanggapan','Berisi penjelasan masalah atau penawaran penyelesaian, konsisten dengan kanal dan bukti.','Hindari jawaban template tanpa reasoning.'],
          ['Closure evidence','Keputusan, approval, refund/koreksi, komunikasi, konfirmasi, dan status action item.','Case belum closed jika remediasi belum dieksekusi.'],
          ['Trend fields','Produk, kategori, jumlah, status, SLA, penyebab, kanal publikasi, dan kerugian.','Gunakan rate dan severity, bukan count saja.'],
          ['Root cause','People, process, system, policy, vendor, atau control design.','Corrective action memperbaiki kasus; preventive action mencegah ulang.'],
          ['Aturan terkini','POJK 22/2023 menggantikan POJK 6/2022 dan mencabut/mengubah bagian aturan lama termasuk pengaduan.','Catat perbedaan materi ujian dan ketentuan operasional terkini.']
        ],`${N}, hlm. 27–30; ${B}, hlm. 756–773; validasi regulasi: POJK 22/2023.`)
      ],
      glossary:[
        ['Acknowledgement','Konfirmasi bahwa pengaduan telah diterima dan diregistrasi.','Bukan keputusan atau closure.'],
        ['Severity','Ukuran dampak finansial, nasabah, hukum, data, fraud, dan reputasi.','Menentukan prioritas dan escalation.'],
        ['Corrective Action','Tindakan memperbaiki kasus/ketidaksesuaian yang sudah terjadi.','Berbeda dari preventive action.'],
        ['Preventive Action','Perubahan kontrol untuk mencegah kejadian berulang.','Harus diuji efektivitasnya.'],
        ['Case Aging','Umur kasus sejak diterima hingga sekarang/selesai.','Indikator backlog dan risiko SLA.'],
        ['LAPS SJK','Lembaga Alternatif Penyelesaian Sengketa Sektor Jasa Keuangan.','Jalur lanjutan ketika penyelesaian internal tidak mencapai kesepakatan.']
      ]
    },

    'K.64GEB00.016.1': {
      note:'Jurnal dan klasifikasi mengikuti materi akuntansi perbankan/PSAK yang diringkas. Kebijakan akun, materialitas, EIR, dan CKPN bank dapat lebih rinci.',
      chapters:[
        chapter('Saldo normal dan jurnal simpanan','Mulai dari perspektif entitas bank, lalu tentukan akun dan arah mutasinya.',[
          ['Setoran simpanan','Debit Kas/Rekening Bank; Kredit Giro/Tabungan/Deposito.','Kas aset naik, kewajiban kepada nasabah naik.'],
          ['Penarikan simpanan','Debit Giro/Tabungan/Deposito; Kredit Kas/Rekening Bank.','Kewajiban bank turun, kas turun.'],
          ['Accrued interest','Debit Beban bunga; Kredit bunga yang masih harus dibayar.','Beban diakui sebelum pembayaran kas.'],
          ['Pembayaran bunga','Debit bunga masih harus dibayar; Kredit rekening simpanan dan liabilitas segera-pajak.','Pisahkan bunga net kepada nasabah dan pajak.'],
          ['Biaya transaksi material','Dimasukkan ke amortised cost dan diamortisasi; jika tidak material dapat dibebankan sesuai policy.','Materiality memengaruhi timing expense.']
        ],`${N}, hlm. 44–47; ${B}, hlm. 998–1025.`),
        chapter('Kredit: recognition sampai repayment','Kredit adalah aset bank dan memiliki off-balance-sheet commitment sebelum ditarik.',[
          ['Provisi/biaya atribusi','Provisi mengurangi/menyesuaikan amortised cost; biaya atribusi menambah carrying amount sesuai perlakuan.','Diproses melalui EIR, bukan selalu pendapatan/beban sekaligus.'],
          ['Komitmen belum ditarik','Dicatat pada rekening administratif: lawan fasilitas vs kewajiban komitmen.','Exposure ada meski kas belum keluar.'],
          ['Pencairan','Debit Kredit-amortised cost; Kredit Kas/Rekening Debitur; kurangi komitmen administratif.','Pastikan kondisi pencairan dan limit.'],
          ['Pendapatan bunga','Debit bunga yang akan diterima dan penyesuaian amortised cost; Kredit pendapatan bunga.','Gunakan metode/perhitungan sesuai klasifikasi.'],
          ['Pembayaran debitur','Alokasikan ke bunga/biaya/pokok sesuai kontrak dan estimasi cash flow; pokok: Debit Kas, Kredit Kredit.','Urutan alokasi tidak boleh diputuskan sembarang.']
        ],`${N}, hlm. 47–50; ${B}, hlm. 1025–1052.`),
        chapter('Klasifikasi pengukuran aset keuangan','Model bisnis dan karakter arus kas kontraktual menentukan measurement category.',[
          ['Amortised Cost','Aset dikelola untuk memperoleh arus kas kontraktual yang memenuhi kriteria.','Menggunakan EIR dan impairment/CKPN.'],
          ['FVPL','Fair value through profit or loss; perubahan nilai wajar masuk laba rugi.','Volatilitas valuasi langsung memengaruhi laba.'],
          ['FVOCI','Fair value through other comprehensive income; perubahan tertentu masuk OCI.','Bunga/impairment dan recycling mengikuti klasifikasi.'],
          ['Adjusting entry','Accrual, amortisasi, pajak, nilai wajar, dan cadangan kerugian pada cut-off.','Harus memiliki basis estimasi dan approval.'],
          ['Jurnal balik bunga','Jika penerimaan bunga tidak lagi probable, materi menjelaskan reversal pengakuan.','Mencegah pendapatan dibesar-besarkan.']
        ],`${N}, hlm. 47–50; ${B}, hlm. 1030–1062.`),
        chapter('Laporan dan formula rasio','Rasio harus dibaca bersama definisi pembilang, penyebut, periode, dan benchmark.',[
          ['Current / Quick Ratio','CA/CL; (Cash + Marketable Securities + AR)/CL.','Mengukur likuiditas jangka pendek dengan tingkat konservatisme berbeda.'],
          ['DER / DAR','Total Debt/Equity; Total Debt/Assets.','Mengukur leverage dari dua perspektif.'],
          ['GPM / NPM','Gross Profit/Revenue; Net Income/Revenue.','Membedakan margin setelah HPP dan margin akhir.'],
          ['ROA / ROE','Net Income/Average Assets; Net Income/Average Equity.','Average balance lebih tepat untuk flow income sepanjang periode.'],
          ['Turnover','COGS/Average Inventory; Net Credit Sales/Average AR.','Mengukur efisiensi penggunaan aset operasional.']
        ],`${N}, hlm. 50–53; ${B}, hlm. 1055–1078.`)
      ],
      glossary:[
        ['EIR','Effective Interest Rate yang mendiskontokan estimasi arus kas menjadi carrying amount.','Dasar amortised cost dan income recognition.'],
        ['FVPL','Fair Value Through Profit or Loss.','Perubahan nilai wajar masuk laba rugi.'],
        ['FVOCI','Fair Value Through Other Comprehensive Income.','Perubahan tertentu masuk penghasilan komprehensif lain.'],
        ['Rekening Administratif','Catatan off-balance-sheet seperti komitmen fasilitas belum ditarik.','Exposure tetap perlu dimonitor.'],
        ['Understated Expense','Beban dicatat terlalu rendah.','Membuat laba dan aset/ekuitas terlihat terlalu tinggi.'],
        ['Prive','Pengambilan aset usaha oleh pemilik untuk kepentingan pribadi.','Bukan beban operasional perusahaan.']
      ]
    },

    'K.64GEB00.014.2': {
      note:'Rules ICC, SWIFT message, jenis LC, serta BG harus dibaca bersama wording instrumen. Nama rule berlaku hanya bila diinkorporasikan atau dipersyaratkan.',
      chapters:[
        chapter('Jenis LC menurut fungsi dan availability','Istilah LC tidak tunggal; fungsi, revocability, pembayaran, transfer, dan nominasi mengubah risikonya.',[
          ['Commercial vs Standby LC','Commercial membayar transaksi dagang reguler; standby dicairkan ketika applicant gagal memenuhi kewajiban.','Standby lebih menyerupai guarantee.'],
          ['Irrevocable','Tidak dapat diubah/dibatalkan tanpa persetujuan pihak yang dipersyaratkan.','UCP 600 memperlakukan credit sebagai irrevocable.'],
          ['Sight / Usance / Deferred','Sight dibayar setelah comply; usance memakai tenor/draft; deferred membayar pada tanggal masa depan tanpa draft.','Bedakan payment undertaking dan financing.'],
          ['UPAS / UPAU','UPAS: exporter menerima sight sementara importer mendapat tenor; UPAU melibatkan percepatan/diskonto pembayaran usance.','Biaya pembiayaan dan pihak penanggungnya harus jelas.'],
          ['Restricted / Unrestricted','Restricted hanya tersedia pada bank tertentu; unrestricted dapat dinegosiasikan melalui bank yang memenuhi terms.','Availability tidak sama dengan confirmation.']
        ],`${N}, hlm. 32–36; ${B}, hlm. 301–318.`),
        chapter('Rules dan SWIFT message','Rule menentukan examination; message type menentukan fungsi komunikasi.',[
          ['UCP 600 / ISBP','UCP mengatur documentary credit; ISBP memberi praktik pemeriksaan dokumen.','UCP berlaku bila LC menginkorporasikannya.'],
          ['URC 522 / URR 725','URC untuk collection; URR untuk bank-to-bank reimbursement documentary credit.','Jangan memakai UCP untuk semua instrumen trade.'],
          ['ISP98 / Guarantee rules','ISP lazim untuk standby; guarantee dapat tunduk rule seperti URDG sesuai wording.','Baca governing rules pada instrumen.'],
          ['MT700 / MT707','MT700 issuance documentary credit; MT707 amendment.','Amendment belum efektif bagi beneficiary sebelum acceptance bila dipersyaratkan.'],
          ['MT734 / MT760 / MT799','MT734 advice of refusal/discrepancy; MT760 guarantee/standby; MT799 free-format.','Free-format bukan pengganti undertaking yang seharusnya.']
        ],`${N}, hlm. 36–39; ${B}, hlm. 312–330.`),
        chapter('Dokumen dan examination','Bank membandingkan data antar-dokumen, credit, dan rules—not physical goods.',[
          ['Commercial invoice','Diterbitkan beneficiary dan menggambarkan barang, nilai, currency, terms.','Harus konsisten dengan credit dan dokumen lain.'],
          ['Transport document/Bill of Lading','Membuktikan receipt/shipment; jenis tertentu merupakan document of title.','Periksa carrier/signature, on-board, port, date, originals, dan clean clause.'],
          ['Insurance document','Diterbitkan insurer; materi merujuk UCP 600 art. 28.','Periksa coverage, amount, currency, risk, date, dan endorsement.'],
          ['Packing/weight/measurement list','Merinci kemasan, berat, atau ukuran.','Cross-check quantity/description tanpa menuntut mirror image.'],
          ['Discrepancy notice','Harus menyebut discrepancy secara jelas dan dalam waktu/rule yang berlaku.','Notice buruk dapat menghilangkan hak menolak.']
        ],`${N}, hlm. 37–40; ${B}, hlm. 318–337.`),
        chapter('Bank guarantee sampai level klaim','BG adalah undertaking dengan parties, expiry, claim condition, dan collateral yang spesifik.',[
          ['Parties','Applicant/principal, beneficiary/bowheer, dan issuer/guarantor.','Pisahkan underlying contract dari guarantee.'],
          ['Isi material','Judul, pihak, tanggal, nominal, transaksi dasar, expiry, claim terms, dan governing law/rules.','Materi menekankan irrevocable, unconditional, serta tanggal berakhir.'],
          ['Claim','Diajukan tertulis dengan asli BG dan dokumen/pernyataan default sesuai wording sebelum expiry.','Periksa timeliness dan strict wording.'],
          ['Collateral','Cash cover/blokir dana, non-cash loan facility, counter guarantee, atau kombinasi.','Menentukan credit exposure dan recovery.'],
          ['Jenis proyek','Bid bond, advance payment bond, performance bond, maintenance/retention bond.','Trigger dan nilai mengikuti kewajiban yang dijamin.']
        ],`${N}, hlm. 40–43; ${B}, hlm. 330–344.`)
      ],
      glossary:[
        ['UPAS','Usance Payable at Sight: beneficiary dibayar sight, applicant memperoleh tenor pembiayaan.','Memisahkan kebutuhan kas seller dan buyer.'],
        ['UPAU','Usance Payable at Usance dengan mekanisme percepatan/diskonto sesuai struktur.','Periksa siapa menanggung discount/interest.'],
        ['URC 522','Uniform Rules for Collections.','Rule collection, bukan LC.'],
        ['URR 725','Uniform Rules for Bank-to-Bank Reimbursements.','Mengatur reimbursement antarbank.'],
        ['MT734','SWIFT advice of refusal/discrepancy.','Kritis dalam documentary examination.'],
        ['MT760','SWIFT message untuk guarantee/standby.','Menyampaikan undertaking terstruktur.']
      ]
    },

    'K.64GEB00.015.1': {
      note:'Retensi, enkripsi, peminjaman, kualitas aset, dan kode laporan di bawah berasal dari materi. Perlakukan sebagai exam reference dan cocokkan dengan schedule/regulasi serta kebijakan bank terbaru.',
      chapters:[
        chapter('Standar dan 5C administrasi','Administrasi mengendalikan mutu record, bukan sekadar kerapian lemari.',[
          ['ISO 15489','Kerangka records management: authenticity, reliability, integrity, usability, lifecycle, dan controls.','Mendukung record sebagai bukti.'],
          ['ISO 9001','Sistem manajemen mutu dan konsistensi proses.','Fokusnya lebih luas daripada records management.'],
          ['Compliance','Dokumen/proses sesuai hukum, kebijakan, dan kewenangan.','Lengkap tetapi melanggar rule tetap tidak valid.'],
          ['Consistency / Completeness','Penamaan, klasifikasi, data, lampiran, dan approval konsisten serta utuh.','Mengurangi mismatch dan rework.'],
          ['Confidentiality / Communication','Akses need-to-know dan distribusi informasi kepada pihak yang tepat.','Kontrol privacy sekaligus workflow.']
        ],`${N}, hlm. 54–56; ${B}, hlm. 483–520.`),
        chapter('Lifecycle arsip dan istilah filing','Setiap langkah menghasilkan metadata dan jejak kontrol.',[
          ['Inspecting','Memeriksa kelengkapan dan kesiapan berkas.','Berkas incomplete tidak langsung difiling sebagai final.'],
          ['Indexing / coding','Menetapkan identitas pokok dan kode klasifikasi.','Menentukan bagaimana record ditemukan kembali.'],
          ['Cross-reference','Tunjuk silang saat satu record berkaitan dengan lebih dari satu masalah/berkas.','Mencegah duplikasi original.'],
          ['Sorting / labeling','Mengurutkan lalu memberi label folder/odner/tab guide.','Urutan fisik harus mengikuti indeks.'],
          ['Retrieval / return','Peminjaman tercatat, due date, perpanjangan, penerima, dan pengembalian.','Materi: maksimum 5 hari kerja, perpanjangan maksimal 3 kali.']
        ],`${N}, hlm. 57–58; ${B}, hlm. 520–568.`),
        chapter('Jenis arsip, retensi, dan keamanan','Nilai guna menentukan lokasi, perlindungan, dan disposisi.',[
          ['Aktif / inaktif','Aktif dipakai terus; inaktif frekuensinya menurun dan dikelola unit sentral.','Pemindahan bukan pemusnahan.'],
          ['Vital / statis','Vital diperlukan bagi kelangsungan bisnis; statis memiliki nilai sejarah.','Arsip vital memerlukan fire-resistant storage/DR.'],
          ['Retensi materi','Materi menyebut transaksi 5 tahun, kredit 10 tahun, dan exception sampai kasus selesai.','Legal hold dapat memperpanjang retensi.'],
          ['Fisik / digital','Fisik: klasifikasi, label, lemari; digital: NDS/ECM, access control, backup, integrity.','Materi mencontohkan enkripsi AES-256.'],
          ['Pemindahan','Materi: arsip masa retensi dipindah ke unit sentral 2x setahun; cabang baru setelah 2 tahun operasi.','Gunakan daftar serah terima dan rekonsiliasi box/file.']
        ],`${N}, hlm. 56–58; ${B}, hlm. 540–590.`),
        chapter('Kualitas aset dan laporan administrasi','Data administrasi yang salah dapat menghasilkan klasifikasi risiko dan cadangan yang salah.',[
          ['Lancar / DPK','Materi: Lancar 1% baki debet; DPK <90 hari 5%.','Angka adalah reference materi, bukan substitusi ketentuan CKPN terkini.'],
          ['KL / Diragukan / Macet','Materi: KL >90–120 hari 15%; Diragukan >120–180 hari 50%; Macet >180 hari 100% setelah pengurang agunan.','Periksa event, days past due, dan nilai agunan.'],
          ['Upgrade/downgrade','Perubahan kualitas harus didukung peristiwa/kondisi kemampuan bayar atau nilai agunan.','Tidak boleh hanya mengejar target NPL.'],
          ['Regulatory reports','Materi menyebut LBU, transaksi mencurigakan/PPATK, dan laporan KYC.','Kode/nama/frekuensi dapat berubah.'],
          ['Internal/financial reports','Kinerja cabang, transaksi harian, mutasi, rekening koran, aging, DPK; neraca, laba rugi, arus kas.','Setiap laporan memiliki owner, cut-off, dan reconciled source.']
        ],`${N}, hlm. 58–59; ${B}, hlm. 580–613.`)
      ],
      glossary:[
        ['Inspecting','Pemeriksaan awal kelengkapan berkas sebelum filing.','Mencegah incomplete record dianggap final.'],
        ['Cross-reference','Tunjuk silang antarberkas/masalah.','Memudahkan retrieval tanpa menggandakan original.'],
        ['Arsip Vital','Record yang kehilangan/kerusakannya mengganggu kelangsungan usaha.','Butuh proteksi dan recovery lebih tinggi.'],
        ['Arsip Statis','Record yang tidak aktif tetapi bernilai sejarah/permanen.','Tidak dimusnahkan seperti record biasa.'],
        ['ECM','Enterprise Content Management untuk penyimpanan dan workflow dokumen digital.','Mendukung version, access, search, dan audit trail.'],
        ['DOTT','Daftar orang/organisasi terduga teroris dan terorisme.','Screening APU-PPT bersama daftar relevan lain.']
      ]
    },

    'K.64GEB00.017.1': {
      note:'Koreksi penting: rujukan umur pada materi adalah Pasal 330 KUHPerdata, bukan KUHP. Standar usia/kecakapan juga dapat dipengaruhi undang-undang khusus dan kebijakan bank; jangan memakai satu pasal tanpa legal context.',
      chapters:[
        chapter('Peta pasal subjek dan kecakapan','Nomor pasal harus selalu disertai isu hukum dan akibat operasionalnya.',[
          ['Pasal 330 KUHPerdata','Materi mengaitkan belum dewasa dengan belum berumur 21 tahun dan belum pernah menikah. Ini bukan Pasal 330 KUHP.','Pada onboarding, cek usia, status perkawinan, wakil, serta aturan khusus/policy yang berlaku.'],
          ['Pasal 433 KUHPerdata','Materi mengaitkan pengampuan dengan kondisi tertentu termasuk gangguan daya pikir dan keborosan.','Bank memerlukan penetapan pengadilan dan identitas pengampu; jangan mendiagnosis sendiri.'],
          ['Anak dalam kandungan','Dianggap telah lahir bila kepentingannya menghendaki; bila lahir mati dianggap tidak pernah ada.','Relevan pada hak waris, bukan kewenangan bertransaksi langsung.'],
          ['Wali','Orang tua yang hidup terlama, wali berdasarkan wasiat/akta, atau wali yang ditetapkan pengadilan sesuai konteks.','Verifikasi dokumen dan scope perwakilan.'],
          ['Kurator pailit','Kewenangan kurator dibuktikan dengan putusan Pengadilan Niaga dan identitas.','Direksi/debitur tidak selalu bebas menguasai aset setelah pailit.']
        ],`${N}, hlm. 61–64; ${B}, hlm. 1174–1208.`),
        chapter('Pasal 1320, 1338, dan wanprestasi','Keabsahan, daya mengikat, serta pelanggaran kontrak adalah tiga analisis berbeda.',[
          ['Pasal 1320 KUHPerdata','Kesepakatan, kecakapan, objek tertentu, dan causa halal.','Dua pertama subjektif; dua terakhir objektif.'],
          ['Cacat subjektif','Paksaan/kekhilafan/penipuan atau pihak tidak cakap dapat membuat perjanjian dapat dibatalkan.','Perjanjian tidak otomatis dianggap tak pernah ada sebelum pembatalan.'],
          ['Cacat objektif','Objek tidak tertentu atau causa melanggar hukum/kesusilaan/ketertiban umum menimbulkan batal demi hukum.','Bank tidak boleh memperbaiki dengan approval internal saja.'],
          ['Pasal 1338 KUHPerdata','Perjanjian sah mengikat para pihak (pacta sunt servanda) dan dijalankan dengan itikad baik dalam konteks pasal.','Kebebasan kontrak tetap dibatasi hukum dan perlindungan konsumen.'],
          ['Wanprestasi','Tidak melakukan, melakukan tidak sesuai, terlambat, atau melakukan hal yang dilarang kontrak.','Tentukan obligation, due date, notice/somasi, cure period, dan remedy.']
        ],`${N}, hlm. 64–67; ${B}, hlm. 1208–1245.`),
        chapter('Akta dan hierarki kekuatan bukti','Notaris dapat terlibat dalam fungsi berbeda; hasilnya tidak boleh disebut sama.',[
          ['Akta otentik','Dibuat oleh/di hadapan pejabat berwenang dengan bentuk yang ditentukan; materi merujuk Pasal 1870 KUHPerdata dan Pasal 165 HIR.','Memiliki kekuatan pembuktian sempurna terhadap hal yang diterangkan sesuai batasnya.'],
          ['Akta bawah tangan','Dibuat para pihak tanpa pejabat umum; materi merujuk Pasal 1875–1877 KUHPerdata.','Kekuatan bergantung pengakuan dan pembuktian tanda tangan/isinya.'],
          ['Legalisasi','Para pihak menandatangani di hadapan notaris; notaris menjamin identitas, tanda tangan, dan tanggal, bukan kebenaran substansi bisnis.','Lebih kuat pada authentication daripada waarmerking.'],
          ['Waarmerking','Dokumen yang sudah ditandatangani didaftarkan/dibukukan untuk kepastian keberadaan/tanggal pendaftaran.','Notaris tidak menyaksikan penandatanganan.'],
          ['Juridical perfection','Perjanjian pokok dan dokumen agunan harus memenuhi formalitas pengikatan/pendaftaran yang relevan.','Dokumen kredit ditandatangani belum otomatis menyempurnakan jaminan.']
        ],`${N}, hlm. 65–68; ${B}, hlm. 1235–1270.`),
        chapter('UU Perbankan, rahasia bank, dan risiko hukum','Legal reference menghubungkan definisi, scope data, pengecualian, dan prosedur.',[
          ['Pasal 1 UU Perbankan','Materi memetakan angka 1 perbankan, angka 2 bank, angka 5 simpanan, angka 16 nasabah, angka 17 penyimpan, angka 18 debitur.','Definisi menentukan siapa dan produk apa yang dianalisis.'],
          ['Pasal 1 angka 28 / POJK 44/2024','Materi mendefinisikan rahasia bank mencakup keterangan nasabah penyimpan dan simpanannya serta konteks investor syariah.','Gunakan scope aturan terbaru, bukan asumsi “semua data = rahasia bank” tanpa analisis.'],
          ['Pengecualian','Peradilan pidana/perdata, pajak, kurator/likuidator, kuasa nasabah, ahli waris sah, antarbank, BI/LPS, dan dasar lain dalam materi.','Pengecualian tidak menghapus verifikasi authority dan documentation.'],
          ['UU Perlindungan Konsumen Pasal 18','Materi mengaitkan dengan pembatasan klausula baku.','Form standar bank tidak kebal dari larangan klausul tertentu.'],
          ['Risiko hukum','Tuntutan hukum atau kelemahan aspek yuridis: authority cacat, wording multitafsir, agunan tidak perfected, dokumen ahli waris kurang.','Mitigasi melalui SOP, SPH, legal review, maker-checker, dan custody.']
        ],`${N}, hlm. 60–71; ${B}, hlm. 1168–1300.`)
      ],
      glossary:[
        ['Pasal 330 KUHPerdata','Rujukan perdata mengenai kategori belum dewasa dalam materi; bukan KUHP.','Jangan salah menyebut kitab hukum.'],
        ['Pasal 433 KUHPerdata','Dasar pengampuan dalam materi.','Kewenangan pengampu dibuktikan dengan penetapan, bukan asumsi petugas.'],
        ['Pasal 1870 KUHPerdata','Rujukan kekuatan pembuktian akta otentik.','Dibaca bersama formalitas dan batas keterangan akta.'],
        ['Pasal 165 HIR','Rujukan pembuktian akta otentik dalam hukum acara perdata materi.','Menjelaskan bobot alat bukti tertulis.'],
        ['Positive Covenant','Kewajiban melakukan sesuatu.','Pelanggarannya dapat menjadi event of default.'],
        ['Negative Covenant','Kewajiban untuk tidak melakukan tindakan tertentu.','Memerlukan monitoring sepanjang tenor.'],
        ['Juridically Perfect','Hak/jaminan telah diikat dan dipenuhi formalitasnya agar efektif terhadap pihak terkait.','Berbeda dari sekadar dokumen ditandatangani.']
      ]
    }
  };
})();
