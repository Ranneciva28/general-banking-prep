(() => {
  const SRC = {
    notes: 'General Banking Certification',
    deck: 'SERTIFIKASI GB 4 PPT BRIDGE'
  };

  const modules = [
    {
      code:'K.64GEB00.001.1', icon:'🏦', title:'Memproses Pembukaan dan Penutupan Rekening',
      summary:'Alur end-to-end pembukaan, verifikasi nasabah, pemeliharaan CIF, sampai penutupan rekening secara sah dan terdokumentasi.',
      tags:['CIF & KYC','Joint Account','Dormant','Penutupan'],
      glossary:[
        ['CIF (Customer Information File)','Data induk nasabah yang menjadi referensi identitas, profil, dan hubungan nasabah dengan bank. Satu nasabah idealnya memiliki satu CIF yang konsisten.','Sering diuji lewat kasus CIF ganda, perubahan data, atau CIF utama pada joint account.'],
        ['KYC','Proses mengenali dan memastikan identitas, profil, tujuan hubungan usaha, serta kewajaran aktivitas nasabah.','Menjadi fondasi sebelum rekening dibuka dan selama rekening digunakan.'],
        ['CDD / EDD','CDD adalah uji tuntas standar. EDD adalah pemeriksaan lebih mendalam untuk profil atau transaksi berisiko lebih tinggi.','Penguji dapat memberi red flag lalu meminta level uji tuntas yang tepat.'],
        ['Joint Account','Rekening yang dimiliki lebih dari satu pihak. Pengoperasian mengikuti mandat tanda tangan, misalnya AND atau OR.','Bedakan pemilik CIF utama, anggota, dan kewenangan transaksi.'],
        ['Specimen Tanda Tangan','Contoh tanda tangan resmi sebagai pembanding saat bank memverifikasi instruksi atau warkat nasabah.','Kesesuaian specimen adalah kontrol otorisasi, bukan formalitas administrasi.'],
        ['Dormant','Status rekening yang tidak aktif bertransaksi dalam periode tertentu sesuai ketentuan produk/bank.','Aktivasi kembali membutuhkan verifikasi dan prosedur pengamanan.'],
        ['DHN','Daftar Hitam Nasional terkait penarikan cek/bilyet giro kosong sesuai ketentuan yang berlaku.','Dapat menjadi dasar pembatasan penggunaan cek/BG dan pertimbangan penutupan giro.'],
        ['Penutupan Rekening','Pengakhiran hubungan rekening atas permintaan nasabah atau alasan internal yang sah, setelah kewajiban, saldo, fasilitas, dan dokumen diselesaikan.','Urutan kontrolnya sering dijadikan soal prosedural.']
      ],
      mastery:[
        'Menjelaskan alur satpam/frontliner → pemeriksaan dokumen → input CIF/rekening → verifikasi → approval → penyerahan fasilitas.',
        'Membedakan persyaratan perorangan, nonperorangan, rekening dana, giro, deposito, dan rekening kredit.',
        'Memeriksa identitas, beneficial owner, sumber dana, tujuan pembukaan, profil risiko, dan kewajaran informasi.',
        'Menentukan mekanisme joint account, rekening anak/QQ, nasabah berkebutuhan khusus, serta pihak yang berwenang.',
        'Menjelaskan alasan penolakan atau penutupan yang sah tanpa mengabaikan perlindungan konsumen.',
        'Melakukan checklist, indexing, approval, filing, dan audit trail dokumen pembukaan/penutupan.'
      ],
      critical:[
        ['CIF bukan sekadar nomor','Kesalahan data induk dapat menyebar ke seluruh rekening dan proses monitoring nasabah.','Jebakan: membuka CIF baru hanya karena ejaan nama berbeda.'],
        ['KYC bersifat berkelanjutan','Profil harus diperbarui ketika ada perubahan pekerjaan, alamat, penghasilan, pengurus, atau pola transaksi.','Jebakan: menganggap KYC selesai saat rekening dibuka.'],
        ['Tutup setelah semua clear','Periksa saldo, kewajiban, cek/BG, kartu, standing instruction, blokir, dan alasan penutupan sebelum finalisasi.','Jebakan: langsung menutup rekening hanya karena ada permintaan lisan.']
      ],
      questions:[
        ['Studi kasus','Data pekerjaan nasabah tidak mutakhir dan transaksi tidak sesuai profil. Apa tindakan petugas?','Verifikasi ulang, update profil/CIF, lakukan CDD/EDD sesuai risiko, dokumentasikan, dan eskalasi bila terdapat red flag.'],
        ['Prosedur','Apa urutan kontrol ketika nasabah ingin menutup rekening giro?','Validasi identitas dan kewenangan, cek saldo/kewajiban serta media cek/BG, selesaikan fasilitas terkait, approval, dokumentasi, lalu tutup.'],
        ['Perbandingan','Apa perbedaan joint account AND dan OR?','AND memerlukan persetujuan seluruh pihak sesuai mandat; OR dapat dioperasikan oleh salah satu pihak yang diberi kewenangan.'],
        ['Konsep','Mengapa satu nasabah sebaiknya tidak memiliki CIF ganda?','Agar profil, exposure, monitoring transaksi, KYC, dan pelaporan nasabah terbaca utuh dan konsisten.']
      ],
      sources:{glossary:`${SRC.notes}, hlm. 1–9; ${SRC.deck}, hlm. 359–418.`, mastery:`${SRC.deck}, hlm. 359–418; ${SRC.notes}, hlm. 1–10.`, critical:`${SRC.notes}, hlm. 1–9 dan 76–77; ${SRC.deck}, hlm. 359–418.`, questions:`${SRC.notes}, hlm. 72, 76, 92–103 (kisi-kisi/studi kasus).`}
    },
    {
      code:'K.64GEB00.002.2', icon:'⇄', title:'Memproses Transaksi Keuangan Tunai dan Non Tunai',
      summary:'Kontrol awal hari, transaksi teller, transfer/kliring, rekonsiliasi, pengamanan kas, dan penyelesaian akhir hari.',
      tags:['Teller','Dual Control','Transfer','Rekonsiliasi'],
      glossary:[
        ['Dual Control','Aktivitas kritikal dilakukan atau diawasi minimal oleh dua pihak berwenang untuk mencegah kesalahan dan penyalahgunaan.','Berlaku pada kunci, brankas, kas, override, dan proses sensitif lainnya.'],
        ['Cash Limit','Batas maksimal kas yang boleh dikelola teller/unit sesuai kewenangan dan kebutuhan operasional.','Kelebihan kas harus segera ditangani sesuai prosedur.'],
        ['Cash Box / Vault','Media penyimpanan uang teller dan ruang penyimpanan kas utama dengan kontrol akses serta pertanggungjawaban yang jelas.','Sering diuji bersama prinsip pemegang kunci dan serah terima kas.'],
        ['Warkat','Dokumen dasar transaksi, misalnya slip setoran/penarikan, cek, bilyet giro, atau formulir transfer.','Harus diuji kelengkapan, keabsahan, kebenaran, dan otorisasinya.'],
        ['BI-FAST / Transfer Online','Kanal transfer ritel cepat; pilihan kanal mengikuti kebutuhan nominal, waktu, tujuan, biaya, dan ketentuan terbaru.','Jangan memilih kanal hanya dari satu faktor.'],
        ['SKNBI / Kliring','Sistem pemindahan dana dan/atau kliring warkat melalui mekanisme Bank Indonesia.','Bedakan karakter batch/ritel dengan kanal real-time atau nilai besar.'],
        ['RTGS','Sistem penyelesaian dana secara gross dan real time yang lazim digunakan untuk transaksi bernilai besar atau kritikal.','Fokus pada finality, nominal, urgensi, dan cut-off.'],
        ['Rekonsiliasi Akhir Hari','Pencocokan kas fisik, saldo sistem, jurnal, warkat, dan laporan sebelum operasional ditutup.','Selisih harus ditelusuri, dicatat, dan dieskalasikan; tidak boleh ditutup-tutupi.']
      ],
      mastery:[
        'Menjelaskan persiapan awal hari: briefing, pembukaan vault, alokasi kas, perangkat, surat berharga, dan kontrol akses.',
        'Memproses setor/tarik tunai dengan identifikasi, verifikasi warkat, hitung uang, input, validasi, dan penyerahan bukti.',
        'Memilih kanal transfer berdasarkan nominal, urgensi, cut-off, mata uang, beneficiary, biaya, dan finality.',
        'Mengenali uang tidak layak edar/palsu, transaksi tidak wajar, dan kondisi yang membutuhkan escalation.',
        'Menangani pembatalan/koreksi transaksi tanpa menghapus audit trail atau melanggar kewenangan.',
        'Melakukan balancing teller dan rekonsiliasi akhir hari atas kas, sistem, jurnal, serta dokumen.'
      ],
      critical:[
        ['Nasabah masih di banking hall','Konfirmasi hitungan dan bukti transaksi saat serah terima untuk mencegah sengketa jumlah.','Jebakan: mengandalkan ingatan setelah transaksi selesai.'],
        ['Kanal bukan sekadar biaya','Nominal, waktu, cut-off, jenis instrumen, tujuan, dan risiko settlement menentukan kanal.','Jebakan: selalu memilih kanal termurah.'],
        ['Selisih wajib transparan','Short/over harus dicari sumbernya, dibuatkan administrasi, dan dilaporkan sesuai kewenangan.','Jebakan: menutup selisih dengan uang pribadi tanpa pelaporan.']
      ],
      questions:[
        ['Urutan','Jelaskan alur setor tunai dari warkat diterima sampai transaksi selesai.','Identifikasi → verifikasi → hitung/cek uang → input → otorisasi bila perlu → validasi → serahkan bukti → filing.'],
        ['Studi kasus','Kas fisik teller lebih kecil dari saldo sistem saat akhir hari. Apa yang dilakukan?','Hitung ulang, telusuri jurnal/warkat/CCTV sesuai prosedur, lapor atasan, dokumentasikan short cash, dan tindak lanjut resmi.'],
        ['Pemilihan kanal','Kapan mempertimbangkan RTGS dibanding kanal ritel?','Ketika nominal besar, urgensi/finality tinggi, dan masih dalam cut-off serta sesuai ketentuan bank.'],
        ['Kontrol','Mengapa dual control penting pada vault?','Mengurangi risiko satu orang mengakses, memindahkan, atau memanipulasi kas tanpa deteksi.']
      ],
      sources:{glossary:`${SRC.notes}, hlm. 10–14; ${SRC.deck}, hlm. 419–480.`, mastery:`${SRC.deck}, hlm. 419–480; ${SRC.notes}, hlm. 10–14.`, critical:`${SRC.notes}, hlm. 11–14 dan 92–108.`, questions:`${SRC.notes}, hlm. 73–74, 92, 96, 101, 108–110 (kisi-kisi).`}
    },
    {
      code:'K.64GEB00.003.2', icon:'💱', title:'Memproses Valuta Asing',
      summary:'Perspektif kurs bank, transaksi cabang/dealing room, dokumen underlying, risiko pasar, serta produk treasury dasar.',
      tags:['Kurs','Spot','Forward','FX Swap'],
      glossary:[
        ['Kurs Beli','Harga ketika bank membeli valuta asing dari nasabah. Nasabah menyerahkan valas dan menerima rupiah.','Soal paling umum menguji sudut pandang bank, bukan nasabah.'],
        ['Kurs Jual','Harga ketika bank menjual valuta asing kepada nasabah. Nasabah membayar rupiah dan menerima valas.','Dipakai ketika importir atau traveler membeli valas dari bank.'],
        ['Spread','Selisih antara kurs jual dan kurs beli yang mencerminkan margin serta faktor risiko/biaya transaksi.','Jangan tertukar dengan keuntungan nasabah.'],
        ['Deal Kurs','Kesepakatan rate transaksi antara pihak berwenang dengan nasabah/cabang/dealing room sebelum settlement.','Perhatikan authorized person, dana, limit, dan konfirmasi deal.'],
        ['Spot','Transaksi jual beli valas dengan penyelesaian sesuai standar pasar spot, umumnya paling lambat dua hari kerja.','Bedakan dari same day, tomorrow, dan forward.'],
        ['FX Forward','Kontrak jual/beli valas dengan rate ditetapkan sekarang dan settlement lebih dari dua hari kerja kemudian.','Alat lindung nilai kewajiban/penerimaan masa depan.'],
        ['FX Swap','Kombinasi dua transaksi valas berlawanan pada dua tanggal settlement berbeda.','Digunakan untuk kebutuhan likuiditas atau pengelolaan posisi valas.'],
        ['Underlying Transaction','Aktivitas ekonomi yang mendasari kebutuhan valas, dibuktikan dengan dokumen sesuai jenis, nilai, dan ketentuan.','Penguji sering memberi transaksi lalu menanyakan dokumen pendukung.']
      ],
      mastery:[
        'Menentukan kurs jual atau beli dari sudut pandang bank dan menghitung nilai rupiah transaksi.',
        'Menjelaskan alur nasabah → cabang → treasury/dealing room → konfirmasi deal → settlement.',
        'Membedakan transaksi cabang, spot, forward, swap, dan tujuan lindung nilainya.',
        'Memeriksa authorized person, ketersediaan dana, limit, kelaziman transaksi, dan dokumen underlying.',
        'Menghubungkan inflasi, suku bunga, supply-demand, kondisi politik, dan sentimen pasar dengan pergerakan kurs.',
        'Mengenali risiko pasar, settlement, counterparty, operasional, dokumentasi, serta mis-selling.'
      ],
      critical:[
        ['Selalu pakai perspektif bank','Bank membeli valas = kurs beli; bank menjual valas = kurs jual.','Jebakan: importir “membeli USD” lalu memilih kurs beli bank.'],
        ['Hedging bukan spekulasi','Forward/swap harus dikaitkan dengan kebutuhan arus kas dan underlying yang jelas.','Jebakan: memilih produk hanya karena berharap kurs menguntungkan.'],
        ['Deal harus dapat ditelusuri','Rate, waktu, pihak, nominal, valuta, value date, dan konfirmasi perlu terdokumentasi.','Jebakan: menganggap percakapan informal sudah cukup.']
      ],
      questions:[
        ['Hitungan','Importir membeli USD 5.000 ketika kurs jual Rp15.700. Berapa rupiah yang dibayar?','USD 5.000 × Rp15.700 = Rp78.500.000, sebelum biaya lain bila ada.'],
        ['Hitungan','Nasabah menjual USD 3.000 ketika kurs beli Rp15.500. Berapa rupiah diterima?','USD 3.000 × Rp15.500 = Rp46.500.000, sebelum biaya lain bila ada.'],
        ['Perbandingan','Bedakan FX Forward dan FX Swap.','Forward satu transaksi settlement masa depan; swap dua transaksi berlawanan pada dua tanggal berbeda.'],
        ['Risiko','Perubahan kurs menimbulkan risiko apa?','Risiko pasar; pengelolaannya dapat melibatkan limit posisi dan hedging yang sesuai underlying.']
      ],
      sources:{glossary:`${SRC.notes}, hlm. 15–18; ${SRC.deck}, hlm. 267–295.`, mastery:`${SRC.deck}, hlm. 267–295; ${SRC.notes}, hlm. 15–18.`, critical:`${SRC.deck}, hlm. 270–289.`, questions:`${SRC.deck}, hlm. 280–289; ${SRC.notes}, hlm. 77 dan 92–95.`}
    },
    {
      code:'K.64GEB00.007.1', icon:'🎓', title:'Memberikan Edukasi Nasabah dan Calon Nasabah',
      summary:'Perencanaan, penyampaian, evaluasi, dan pelaporan program literasi serta inklusi keuangan yang relevan bagi sasaran.',
      tags:['Literasi','Inklusi','RBB','Evaluasi'],
      glossary:[
        ['Literasi Keuangan','Pengetahuan, keterampilan, keyakinan, sikap, dan perilaku yang membantu pengambilan keputusan serta pengelolaan keuangan.','Tidak sama dengan sekadar memiliki rekening.'],
        ['Inklusi Keuangan','Ketersediaan akses masyarakat terhadap lembaga, produk, dan layanan keuangan yang sesuai kebutuhan dan kemampuan.','Akses harus disertai penggunaan yang aman dan bertanggung jawab.'],
        ['PUJK','Pelaku Usaha Jasa Keuangan, termasuk bank, yang memiliki kewajiban perlindungan dan edukasi konsumen.','Pihak yang merencanakan, menjalankan, dan melaporkan program.'],
        ['RBB','Rencana Bisnis Bank; rencana kegiatan literasi dimasukkan dengan tujuan, sasaran, metode, materi, jadwal, wilayah, dan indikator.','Menghubungkan edukasi dengan tata kelola dan akuntabilitas.'],
        ['Segmentasi Peserta','Pengelompokan audiens, misalnya pelajar, UMKM, pekerja, pensiunan, atau masyarakat 3T.','Materi dan kanal harus disesuaikan dengan kebutuhan segmen.'],
        ['Edukasi Langsung','Penyampaian melalui workshop, pelatihan, konsultasi, simulasi, sosialisasi, atau pendampingan.','Cocok untuk interaksi dan pengukuran pemahaman langsung.'],
        ['Edukasi Digital/Kemitraan','Penyampaian melalui aplikasi, web, media sosial, webinar, sekolah, kampus, pemerintah, atau komunitas.','Memperluas jangkauan dan efisiensi program.'],
        ['Evaluasi Program','Pengukuran ketercapaian tujuan, perubahan pemahaman/perilaku, jangkauan, dan kualitas pelaksanaan.','Bukan hanya menghitung jumlah peserta.']
      ],
      mastery:[
        'Membedakan literasi dan inklusi keuangan serta menjelaskan hubungan keduanya dengan perlindungan konsumen.',
        'Menentukan tujuan, sasaran, topik, materi, metode, media, waktu, tempat, PIC, anggaran, dan indikator.',
        'Menyesuaikan bahasa, contoh, produk, risiko, kewajiban, perpajakan, dan kanal dengan karakter audiens.',
        'Memberikan edukasi saat onboarding, peluncuran produk, perubahan ketentuan, atau munculnya tren risiko baru.',
        'Mengukur efektivitas melalui pre/post test, umpan balik, observasi perilaku, dan tindak lanjut.',
        'Menyusun bukti pelaksanaan serta laporan berkala yang dapat ditelusuri dan dipertanggungjawabkan.'
      ],
      critical:[
        ['Edukasi ≠ promosi','Tujuannya meningkatkan kemampuan mengambil keputusan, bukan hanya mendorong penjualan.','Jebakan: hanya menjelaskan keunggulan produk.'],
        ['Audience first','Topik keamanan digital untuk pelajar dan cash-flow untuk UMKM membutuhkan pendekatan berbeda.','Jebakan: satu materi dipakai untuk semua segmen.'],
        ['Harus terukur','Tujuan spesifik dan indikator hasil membuat program dapat dievaluasi serta diperbaiki.','Jebakan: sukses diukur hanya dari banyaknya peserta.']
      ],
      questions:[
        ['Perbandingan','Apa beda literasi dan inklusi keuangan?','Literasi adalah kemampuan memahami/mengelola; inklusi adalah akses dan penggunaan layanan yang sesuai.'],
        ['Perencanaan','Apa saja elemen rencana program edukasi nasabah?','Tujuan, audiens, topik, metode, media, jadwal/lokasi, PIC, anggaran, indikator, evaluasi, dan pelaporan.'],
        ['Studi kasus','Susun edukasi keamanan transaksi bagi pensiunan.','Gunakan bahasa sederhana, simulasi modus, larangan berbagi PIN/OTP, kanal resmi, latihan respons, dan evaluasi pemahaman.'],
        ['Implementasi','Apa yang dilakukan petugas saat edukasi di kantor cabang?','Tanya tujuan kunjungan, ukur pemahaman, beri panduan yang sesuai, jelaskan manfaat-biaya-risiko, lalu konfirmasi pemahaman.']
      ],
      sources:{glossary:`${SRC.notes}, hlm. 19–22; ${SRC.deck}, hlm. 696–718.`, mastery:`${SRC.deck}, hlm. 701–718; ${SRC.notes}, hlm. 19–22.`, critical:`${SRC.deck}, hlm. 700–715.`, questions:`${SRC.notes}, hlm. 78 dan 83–84; ${SRC.deck}, hlm. 709–718.`}
    },
    {
      code:'K.64GEB00.009.1', icon:'💬', title:'Memberikan Pelayanan Informasi Produk dan Jasa Perbankan',
      summary:'Informasi produk yang transparan, akurat, mudah dipahami, sesuai kebutuhan, dan tidak menyesatkan.',
      tags:['Transparansi','Product Knowledge','Biaya & Risiko','Suitability'],
      glossary:[
        ['Product Knowledge','Pemahaman utuh atas fitur, manfaat, syarat, biaya, risiko, limit, proses, pajak, dan perubahan produk.','Petugas tidak boleh menjelaskan hanya bagian yang menarik.'],
        ['Transparansi','Penyampaian informasi secara benar, jelas, akurat, jujur, mudah diakses, dan tidak menyesatkan.','Merupakan inti perlindungan konsumen dan pencegahan mis-selling.'],
        ['Ringkasan Informasi Produk','Dokumen/ringkasan yang membantu nasabah memahami karakteristik utama sebelum mengambil keputusan.','Gunakan sebagai alat penjelasan, bukan sekadar dokumen tanda tangan.'],
        ['Manfaat–Biaya–Risiko','Tiga dimensi minimum yang harus dijelaskan agar keputusan nasabah seimbang.','Penguji sering menghilangkan salah satu unsur untuk menguji transparansi.'],
        ['Suitability','Kesesuaian produk dengan kebutuhan, tujuan, kemampuan, profil, dan toleransi risiko nasabah.','Produk terbaik bagi bank belum tentu sesuai bagi nasabah.'],
        ['Consultative Selling','Pendekatan menjual solusi dengan menggali situasi dan kebutuhan sebelum mempresentasikan produk.','Mencegah pola “product pushing”.'],
        ['Probing','Pertanyaan terstruktur untuk menggali kebutuhan, masalah, kemampuan, prioritas, dan kriteria keputusan nasabah.','Menjadi dasar rekomendasi yang relevan.'],
        ['Mis-selling','Penjualan karena informasi keliru, tidak lengkap, berlebihan, atau produk tidak sesuai kebutuhan/profil.','Berpotensi menimbulkan kerugian, pengaduan, sanksi, dan risiko reputasi.']
      ],
      mastery:[
        'Menggali kebutuhan nasabah sebelum menawarkan produk melalui approaching dan probing yang etis.',
        'Menjelaskan manfaat, biaya, risiko, syarat, limit, prosedur, konsekuensi, dan pajak dengan bahasa sederhana.',
        'Membandingkan alternatif secara fair tanpa menyembunyikan kekurangan atau memaksa keputusan.',
        'Memastikan sumber informasi resmi dan menggunakan versi ketentuan produk yang terbaru.',
        'Memberikan waktu yang cukup bagi nasabah untuk memahami perjanjian dan bertanya.',
        'Melakukan confirmation of understanding dan mendokumentasikan penjelasan/consent yang diwajibkan.'
      ],
      critical:[
        ['Jelas belum tentu lengkap','Bahasa sederhana harus tetap memuat syarat, biaya, risiko, dan konsekuensi penting.','Jebakan: penjelasan mudah dipahami tetapi menghilangkan penalty.'],
        ['Jangan menjanjikan hasil','Gunakan informasi resmi dan hindari klaim yang tidak dijamin oleh karakteristik produk.','Jebakan: menyamakan proyeksi dengan kepastian.'],
        ['Rekomendasi harus cocok','Gali kebutuhan dan kemampuan sebelum membandingkan produk.','Jebakan: menawarkan produk bermargin tinggi tanpa suitability.']
      ],
      questions:[
        ['Konsep','Informasi minimum apa yang harus disampaikan tentang produk?','Fitur/manfaat, syarat, biaya, risiko, limit, proses, hak-kewajiban, konsekuensi, dan pajak bila relevan.'],
        ['Studi kasus','Nasabah mengeluh karena penalty deposito tidak pernah dijelaskan. Apa masalahnya?','Transparansi tidak memadai dan berpotensi mis-selling; verifikasi bukti penjelasan, tangani pengaduan, dan perbaiki proses.'],
        ['Proses','Bagaimana consultative selling mengurangi mis-selling?','Karena rekomendasi didasarkan pada kebutuhan, kemampuan, tujuan, dan pemahaman nasabah, bukan sekadar target produk.'],
        ['Kontrol','Bagaimana memastikan nasabah benar-benar paham?','Gunakan teach-back/konfirmasi ulang, beri kesempatan bertanya, rangkum poin penting, dan dokumentasikan consent.']
      ],
      sources:{glossary:`${SRC.notes}, hlm. 23–25; ${SRC.deck}, hlm. 680–695.`, mastery:`${SRC.deck}, hlm. 614–695; ${SRC.notes}, hlm. 23–25.`, critical:`${SRC.deck}, hlm. 684–695.`, questions:`${SRC.notes}, hlm. 82–84 dan 102; ${SRC.deck}, hlm. 680–695.`}
    },
    {
      code:'K.64GEB00.010.1', icon:'🎧', title:'Menangani Pengaduan Nasabah',
      summary:'Penerimaan, verifikasi, investigasi, penyelesaian, komunikasi, administrasi, dan analisis tren pengaduan.',
      tags:['Complaint Handling','SLA','Register','Root Cause'],
      glossary:[
        ['Pengaduan Nasabah','Ungkapan ketidakpuasan karena potensi kerugian atau dugaan kesalahan/kelalaian pada produk dan layanan bank.','Bedakan pengaduan dari pertanyaan informasi biasa.'],
        ['Hard Complaint','Komplain dengan emosi/eskalasi tinggi atau dampak serius yang membutuhkan pengendalian komunikasi dan penanganan lebih intensif.','Tetap fokus pada fakta, keamanan, dan prosedur.'],
        ['Register Pengaduan','Catatan terstruktur tentang identitas, tanggal, kanal, produk, kronologi, bukti, PIC, status, SLA, dan hasil penyelesaian.','Menjadi audit trail dan sumber analisis tren.'],
        ['SLA','Batas waktu layanan/penyelesaian. Materi membedakan respons pengaduan lisan dan tertulis serta kondisi perpanjangan.','Gunakan ketentuan internal/regulator terbaru saat praktik.'],
        ['Verifikasi','Pemeriksaan identitas, kewenangan, kronologi, bukti, transaksi, dan konsistensi informasi sebelum tindak lanjut.','Melindungi nasabah sekaligus mencegah social engineering.'],
        ['Remediasi','Tindakan memperbaiki dampak, proses, transaksi, informasi, atau layanan setelah akar masalah dipastikan.','Tidak selalu berupa penggantian uang.'],
        ['Root Cause Analysis','Analisis penyebab mendasar agar masalah tidak hanya selesai per kasus tetapi tidak berulang.','Hubungkan pengaduan dengan perbaikan sistem/proses/edukasi.'],
        ['Dispute Resolution','Mekanisme penyelesaian perselisihan melalui unit internal dan, bila perlu, mekanisme eksternal sesuai ketentuan.','Eskalasi dilakukan setelah jalur dan kewenangan internal dipenuhi.']
      ],
      mastery:[
        'Menerima pengaduan dengan empati, tidak defensif, menjaga keamanan data, dan tidak menjanjikan hasil prematur.',
        'Memverifikasi identitas/kewenangan, kronologi, transaksi, bukti, kanal, dan dampak finansial/nonfinansial.',
        'Mencatat pengaduan lengkap, memberikan nomor registrasi, status, kanal follow-up, dan ekspektasi waktu.',
        'Mengkoordinasikan unit penerima, penyelesaian, e-channel/dispute, fraud, legal, dan pihak terkait sesuai kasus.',
        'Memberikan tanggapan yang jelas, beralasan, tepat waktu, serta mengonfirmasi penerimaan/kejelasan hasil.',
        'Menganalisis volume, produk, penyebab, status, SLA, tren, dan rekomendasi perbaikan.'
      ],
      critical:[
        ['Empati bukan mengakui salah','Akui ketidaknyamanan dan jelaskan proses, tetapi jangan menyimpulkan liability sebelum investigasi.','Jebakan: meminta maaf dengan pengakuan kesalahan yang belum terbukti.'],
        ['Data minim tetap dicatat','Ambil informasi yang tersedia, jelaskan kekurangan bukti, dan bantu nasabah melengkapinya.','Jebakan: menolak tanpa registrasi karena bukti belum lengkap.'],
        ['Selesai ≠ closed loop','Pastikan hasil disampaikan, bukti tersimpan, nasabah diberi jalur lanjut, dan akar masalah diperbaiki.','Jebakan: menutup tiket saat unit internal selesai bekerja.']
      ],
      questions:[
        ['Urutan','Apa alur complaint handling yang baik?','Terima & empati → verifikasi → registrasi → klasifikasi → investigasi/koordinasi → solusi → komunikasi → konfirmasi → analisis perbaikan.'],
        ['Studi kasus','Kartu hilang dan nasabah minta blokir. Apa prioritasnya?','Verifikasi aman, blokir segera sesuai prosedur, cek transaksi terkait, dokumentasikan, lalu bantu penggantian/penanganan transaksi disputed.'],
        ['SLA','Apa yang dilakukan bila penyelesaian membutuhkan pihak lain dan melewati waktu standar?','Dokumentasikan alasan yang sah, beri tahu nasabah sesuai ketentuan, perbarui status, dan lanjutkan monitoring.'],
        ['Analisis','Apa manfaat laporan tren pengaduan?','Mengidentifikasi produk/kanal bermasalah, penyebab dominan, kepatuhan SLA, dan prioritas perbaikan.' ]
      ],
      sources:{glossary:`${SRC.notes}, hlm. 26–30; ${SRC.deck}, hlm. 721–773.`, mastery:`${SRC.deck}, hlm. 724–758; ${SRC.notes}, hlm. 26–30.`, critical:`${SRC.deck}, hlm. 731–756.`, questions:`${SRC.notes}, hlm. 14, 29–30, 101; ${SRC.deck}, hlm. 731–772.`}
    },
    {
      code:'K.64GEB00.016.1', icon:'🧾', title:'Mengelola Akuntansi',
      summary:'Prinsip akuntansi, saldo normal, jurnal transaksi bank, validasi warkat, rekonsiliasi, dan laporan keuangan.',
      tags:['Debit/Kredit','Jurnal','Warkat','Laporan Keuangan'],
      glossary:[
        ['Persamaan Akuntansi','Aset = Liabilitas + Ekuitas; setiap transaksi menjaga keseimbangan persamaan melalui pencatatan berpasangan.','Dasar untuk menilai dampak jurnal.'],
        ['Saldo Normal','Aset dan beban normalnya debit; liabilitas, ekuitas, dan pendapatan normalnya kredit.','Kunci menjawab soal debit/kredit dengan cepat.'],
        ['Double Entry','Setiap transaksi memengaruhi minimal dua akun dengan total debit sama dengan total kredit.','Debit/kredit bukan berarti selalu masuk/keluar uang.'],
        ['Warkat Transaksi','Bukti dasar yang mendukung pencatatan, misalnya slip, cek, BG, atau formulir transfer.','Jurnal tanpa bukti yang sah merusak integritas pembukuan.'],
        ['Akrual','Pendapatan/beban diakui saat hak/kewajiban timbul, tidak selalu saat kas berpindah.','Muncul dalam bunga yang masih harus diterima/dibayar.'],
        ['Rekonsiliasi','Pencocokan catatan sistem, buku besar, rekening perantara, warkat, dan bukti eksternal.','Menemukan selisih, duplikasi, salah akun, atau transaksi tertunda.'],
        ['CKPN','Cadangan Kerugian Penurunan Nilai atas eksposur sesuai penilaian risiko dan standar akuntansi yang berlaku.','Menghubungkan kehati-hatian, kualitas aset, dan laporan laba rugi.'],
        ['Laporan Keuangan','Neraca/posisi keuangan, laba rugi, perubahan ekuitas, arus kas, dan catatan atas laporan keuangan.','Pahami pertanyaan yang dijawab masing-masing laporan.']
      ],
      mastery:[
        'Menentukan saldo normal serta dampak penambahan/pengurangan setiap kelompok akun.',
        'Menyusun jurnal sederhana untuk setoran, penarikan, transfer, penempatan dana, angsuran, bunga, dan biaya.',
        'Memeriksa kelengkapan, kebenaran, keabsahan, otorisasi, dan duplikasi warkat sebelum pembukuan.',
        'Menelusuri siklus bukti → jurnal → buku besar → neraca saldo → penyesuaian → laporan.',
        'Membedakan basis kas dan akrual serta memahami matching, prudence, consistency, dan going concern.',
        'Menjelaskan hubungan kualitas aset, CKPN, pendapatan bunga, laba, dan posisi keuangan.'
      ],
      critical:[
        ['Pakai sudut pandang bank','Setoran giro menambah kas (debit) dan kewajiban giro bank (kredit).','Jebakan: menganggap saldo nasabah sebagai aset bank.'],
        ['Debit bukan selalu bertambah','Aset/beban bertambah di debit; liabilitas/ekuitas/pendapatan bertambah di kredit.','Jebakan: menghafal debit = uang masuk.'],
        ['Validasi sebelum posting','Data, tanda tangan, nominal, rekening, tanggal, dan otorisasi harus sesuai bukti.','Jebakan: koreksi setelah posting dianggap sama aman dengan kontrol preventif.']
      ],
      questions:[
        ['Jurnal','Nasabah menyetor tunai Rp10 juta ke giro. Jurnal bank?','Debit Kas Rp10 juta; Kredit Giro Nasabah Rp10 juta.'],
        ['Jurnal','Nasabah menarik Rp5 juta dari tabungan. Jurnal bank?','Debit Tabungan Nasabah Rp5 juta; Kredit Kas Rp5 juta.'],
        ['Konsep','Mengapa penambahan liabilitas dicatat kredit?','Karena saldo normal liabilitas adalah kredit dalam sistem double entry.'],
        ['Laporan','Laporan mana yang menunjukkan kas masuk dan keluar menurut aktivitas?','Laporan arus kas: aktivitas operasi, investasi, dan pendanaan.']
      ],
      sources:{glossary:`${SRC.notes}, hlm. 44–53; ${SRC.deck}, hlm. 990–1078.`, mastery:`${SRC.deck}, hlm. 994–1078; ${SRC.notes}, hlm. 44–53.`, critical:`${SRC.deck}, hlm. 998–1030.`, questions:`${SRC.notes}, hlm. 75, 80, 100, 109–110; ${SRC.deck}, hlm. 1002–1013.`}
    },
    {
      code:'K.64GEB00.014.2', icon:'🌐', title:'Memproses Trade Service dan Trade Finance',
      summary:'Instrumen perdagangan domestik/internasional, pihak-pihak, dokumen, risiko, settlement, dan pembiayaan perdagangan.',
      tags:['LC/SKBDN','Dokumen','Trade Finance','Bank Garansi'],
      glossary:[
        ['Trade Service','Jasa bank memproses transaksi dan dokumen perdagangan tanpa selalu memberikan pembiayaan.','Contoh: LC/SKBDN, collection, remittance, dan pemeriksaan dokumen.'],
        ['Trade Finance','Pembiayaan yang melekat pada siklus perdagangan untuk importir, eksportir, supplier, atau buyer.','Bedakan fee-based service dari financing exposure.'],
        ['LC','Komitmen issuing bank untuk membayar beneficiary sepanjang presentasi dokumen sesuai syarat documentary credit.','Bank berurusan dengan dokumen, bukan kondisi fisik barang.'],
        ['SKBDN','Instrumen documentary credit untuk transaksi perdagangan dalam negeri sesuai ketentuan yang berlaku.','Strukturnya mirip LC tetapi konteks domestik.'],
        ['Applicant / Beneficiary','Applicant meminta penerbitan LC/SKBDN; beneficiary adalah pihak yang berhak atas pembayaran bila dokumen comply.','Biasanya buyer/importir versus seller/eksportir.'],
        ['Issuing / Advising Bank','Issuing bank menerbitkan komitmen; advising bank meneruskan dan mengautentikasi instrumen kepada beneficiary.','Advising tidak otomatis menambah jaminan pembayaran.'],
        ['Sight / Usance / Deferred','Sight dibayar setelah dokumen comply sesuai proses; usance berjangka dengan draft; deferred berjangka tanpa draft.','Sering diuji sebagai perbandingan metode pembayaran.'],
        ['Discrepancy','Ketidaksesuaian dokumen dengan syarat LC/SKBDN atau rules yang berlaku.','Dapat menunda/menolak pembayaran atau membutuhkan waiver applicant.']
      ],
      mastery:[
        'Membedakan trade service, trade finance, dan guarantee dari tujuan, risiko, serta pendapatan bank.',
        'Memetakan applicant, beneficiary, issuing, advising, confirming, nominated/negotiating, dan reimbursing bank.',
        'Menjelaskan alur penerbitan, advising, shipment, presentasi, examination, acceptance/waiver, dan settlement.',
        'Memeriksa invoice, transport document, insurance, packing list, draft, certificate, serta jadwal presentasi.',
        'Membedakan advance payment, open account, documentary collection, dan documentary credit dari distribusi risiko.',
        'Menjelaskan cash cover, non-cash loan, bank guarantee, counter guarantee, serta jenis jaminan proyek.'
      ],
      critical:[
        ['Dokumen, bukan barang','Bank menentukan compliance berdasarkan dokumen yang dipresentasikan.','Jebakan: meminta bank memastikan kualitas fisik barang.'],
        ['LC bukan bebas risiko','Applicant, beneficiary, bank, negara, dokumen, dan fraud tetap memiliki risiko masing-masing.','Jebakan: menganggap LC menjamin barang pasti sesuai.'],
        ['Service vs finance','Pemrosesan dokumen menghasilkan fee; pembiayaan menambah exposure dan membutuhkan analisis kredit.','Jebakan: semua transaksi LC dianggap kredit tunai.']
      ],
      questions:[
        ['Perbandingan','Apa beda trade service dan trade finance?','Service memfasilitasi transaksi/dokumen; finance menyediakan pembiayaan atau exposure pada siklus perdagangan.'],
        ['Peran','Apa fungsi issuing bank dalam LC?','Menerbitkan komitmen pembayaran kepada beneficiary bila dokumen yang disyaratkan comply.'],
        ['Dokumen','Mengapa bill of lading penting?','Membuktikan penerimaan/pengapalan barang dan dapat berfungsi sebagai document of title sesuai jenisnya.'],
        ['Metode','Urutkan risiko seller pada advance payment, LC, collection, dan open account.','Seller umumnya paling terlindungi pada advance payment; open account paling berisiko. Posisi LC/collection bergantung struktur dan syarat.']
      ],
      sources:{glossary:`${SRC.notes}, hlm. 31–43; ${SRC.deck}, hlm. 296–344.`, mastery:`${SRC.deck}, hlm. 296–344; ${SRC.notes}, hlm. 31–43.`, critical:`${SRC.deck}, hlm. 299–344.`, questions:`${SRC.notes}, hlm. 79, 99, 106; ${SRC.deck}, hlm. 301–344.`}
    },
    {
      code:'K.64GEB00.015.1', icon:'🗂️', title:'Mengelola Administrasi Perbankan',
      summary:'Pengelolaan dokumen, pembayaran, kualitas aset, cadangan, risiko administrasi, serta laporan yang dapat diaudit.',
      tags:['Filing','Retensi','Audit Trail','Kualitas Aset'],
      glossary:[
        ['Authenticity','Jaminan bahwa dokumen asli/valid dan benar berasal dari pihak atau proses yang semestinya.','Salah satu makna utama dokumen “diverifikasi”.'],
        ['Accuracy','Kesesuaian data dengan fakta, dokumen sumber, transaksi, dan pencatatan sistem.','Nominal atau rekening yang salah dapat menjadi risiko operasional dan hukum.'],
        ['Completeness','Seluruh elemen, lampiran, approval, tanda tangan, dan bukti yang diwajibkan telah tersedia.','Dokumen lengkap belum tentu valid; tiga dimensi harus diuji bersama.'],
        ['Classification & Indexing','Pengelompokan serta pemberian identitas agar dokumen mudah dicari, dipantau, dan dikembalikan.','Mendukung SLA, audit, dan keamanan arsip.'],
        ['Retention','Jangka waktu dan cara penyimpanan dokumen fisik/digital sesuai jenis serta ketentuan.','Termasuk perlindungan, pemusnahan, dan legal hold bila relevan.'],
        ['Audit Trail','Jejak siapa melakukan apa, kapan, atas dokumen/transaksi mana, dan dengan approval siapa.','Perubahan tidak boleh menghilangkan histori.'],
        ['Kualitas Aset','Penilaian atas kolektibilitas dan risiko aset produktif untuk menentukan pemantauan serta pencadangan.','Administrasi data yang buruk dapat menyebabkan klasifikasi keliru.'],
        ['Imprest','Metode dana kas kecil dengan saldo tetap; pengisian kembali sebesar pengeluaran yang didukung bukti.','Sering diuji bersama administrasi pembayaran/biaya.']
      ],
      mastery:[
        'Merancang checklist, kode referensi, klasifikasi, label, foldering, penamaan file, indeks, dan lokasi penyimpanan.',
        'Memverifikasi authenticity, accuracy, completeness, approval, serta kesesuaian kebijakan/regulasi.',
        'Mengelola dokumen masuk/keluar, peminjaman/pengembalian, akses, retensi, backup, dan pemusnahan.',
        'Merekonsiliasi bukti pembayaran dengan kewenangan, anggaran, jurnal, vendor, dan supporting documents.',
        'Menilai kualitas aset dan memastikan data pendukung CKPN/cadangan dapat ditelusuri.',
        'Menyusun laporan administrasi berisi status, aging, exception, penyebab, risiko, dan tindak lanjut.'
      ],
      critical:[
        ['Mudah dicari adalah kontrol','Indexing yang konsisten menekan risiko dokumen hilang, SLA lewat, dan keputusan tanpa data.','Jebakan: filing dianggap hanya pekerjaan kerapian.'],
        ['Akses harus need-to-know','Arsip fisik/digital menyimpan data pribadi dan rahasia bank.','Jebakan: semua pegawai diberi akses untuk alasan efisiensi.'],
        ['Exception harus terlihat','Dokumen kurang, approval terlambat, atau mismatch harus masuk register dan dimonitor.','Jebakan: laporan hanya menampilkan pekerjaan yang sudah selesai.']
      ],
      questions:[
        ['Konsep','Apa arti dokumen telah diverifikasi?','Keaslian, akurasi, kelengkapan, otorisasi, dan kesesuaian ketentuan telah diuji serta dibuktikan.'],
        ['Prosedur','Bagaimana menatausahakan dokumen agar cepat ditemukan?','Checklist, kode unik, klasifikasi, label, indeks, struktur folder, hak akses, register lokasi/peminjaman, dan audit berkala.'],
        ['Risiko','Apa mitigasi kehilangan dokumen akibat bencana atau human error?','Backup, penyimpanan terpisah, akses terbatas, digitalisasi, DR/BCP, register, dan uji pemulihan.'],
        ['Kas kecil','Bagaimana mekanisme imprest?','Tetapkan saldo tetap, bayar hanya dengan bukti sah, catat pengeluaran, lalu replenish sebesar bukti yang disetujui.']
      ],
      sources:{glossary:`${SRC.notes}, hlm. 54–59; ${SRC.deck}, hlm. 481–613.`, mastery:`${SRC.deck}, hlm. 481–613; ${SRC.notes}, hlm. 54–59.`, critical:`${SRC.notes}, hlm. 55–59; ${SRC.deck}, hlm. 483–613.`, questions:`${SRC.notes}, hlm. 57–59, 98, 100, 103 (kisi-kisi).`}
    },
    {
      code:'K.64GEB00.017.1', icon:'⚖️', title:'Mengelola Aspek-Aspek Hukum',
      summary:'Hubungan hukum bank–nasabah, subjek hukum, perjanjian, akta, rahasia bank, landasan hukum, dan mitigasi risiko hukum.',
      tags:['Subjek Hukum','Perjanjian','Rahasia Bank','Risiko Hukum'],
      glossary:[
        ['Hubungan Bank–Nasabah','Hubungan kontraktual dan kewajiban hukum antara bank dengan penyimpan, debitur, pengguna jasa, atau pihak lain.','Hak/kewajiban berbeda menurut produk dan kedudukan pihak.'],
        ['Subjek Hukum','Pihak yang dapat menyandang hak dan kewajiban: orang serta badan hukum; entitas bukan badan hukum memiliki karakter tanggung jawab berbeda.','Tentukan siapa yang sah mewakili dan batas kewenangannya.'],
        ['Kecakapan Hukum','Kemampuan melakukan perbuatan hukum; materi mengaitkan usia, perkawinan, dan kondisi pengampuan.','Syarat subjektif perjanjian.'],
        ['Pasal 1320 KUHPerdata','Syarat sah: kesepakatan, kecakapan, objek tertentu, dan causa yang halal.','Dua syarat subjektif vs dua syarat objektif memiliki akibat berbeda.'],
        ['Pacta Sunt Servanda','Perjanjian yang dibuat sah berlaku sebagai undang-undang bagi para pihak.','Dasar kekuatan mengikat kontrak.'],
        ['Akta Otentik / Bawah Tangan','Akta otentik dibuat oleh/di hadapan pejabat berwenang; bawah tangan dibuat para pihak tanpa pejabat umum.','Kekuatan pembuktian dan prosedurnya berbeda.'],
        ['Legalisasi / Waarmerking','Legalisasi mengesahkan tanda tangan dan kepastian tanggal; waarmerking mencatat keberadaan dokumen yang sudah ditandatangani.','Sering tertukar pada soal definisi dan urutan kekuatan bukti.'],
        ['Rahasia Bank','Informasi mengenai nasabah penyimpan dan simpanannya serta ruang lingkup lain sesuai ketentuan yang berlaku.','Pembukaan hanya untuk dasar/pengecualian yang sah dan wajib terdokumentasi.']
      ],
      mastery:[
        'Menentukan kedudukan bank dan nasabah pada simpanan, kredit, jasa, serta transaksi lain.',
        'Membedakan orang, badan hukum, bukan badan hukum, dokumen pendirian, pengurus, dan kewenangan bertindak.',
        'Menguji syarat sah perjanjian serta akibat: dapat dibatalkan versus batal demi hukum.',
        'Membedakan akta otentik, bawah tangan, legalisasi, waarmerking, surat kuasa, dan dokumen pengikatan.',
        'Menentukan apakah informasi termasuk rahasia bank serta apakah permintaan memenuhi pengecualian yang sah.',
        'Mengidentifikasi tuntutan/kelemahan yuridis dan memitigasi melalui SOP, legal review, dokumentasi, serta escalation.'
      ],
      critical:[
        ['Kewenangan lebih dari identitas','Dokumen identitas benar belum membuktikan seseorang berwenang mewakili badan atau pihak lain.','Jebakan: hanya memeriksa KTP direksi tanpa anggaran dasar/keputusan terbaru.'],
        ['Akibat syarat berbeda','Cacat subjektif → dapat dibatalkan; cacat objektif → batal demi hukum.','Jebakan: semua pelanggaran Pasal 1320 dianggap akibatnya sama.'],
        ['Rahasia bank ada prosedurnya','Dasar hukum, kewenangan peminta, ruang lingkup data, approval, dan dokumentasi harus diuji.','Jebakan: membuka data hanya karena peminta adalah keluarga/aparat.']
      ],
      questions:[
        ['Konsep','Apa akibat tidak terpenuhinya syarat subjektif dan objektif perjanjian?','Subjektif: perjanjian dapat dibatalkan. Objektif: perjanjian batal demi hukum.'],
        ['Perbandingan','Apa beda legalisasi dan waarmerking?','Legalisasi mengesahkan tanda tangan/tanggal di hadapan notaris; waarmerking mencatat dokumen yang sebelumnya telah ditandatangani.'],
        ['Studi kasus','Keluarga nasabah meminta saldo tanpa kuasa. Bolehkah diberikan?','Tidak hanya karena hubungan keluarga; harus ada dasar pengecualian, kuasa/kewenangan, verifikasi, dan prosedur yang sah.'],
        ['Risiko','Apa sumber risiko hukum operasional bank?','Tuntutan hukum dan kelemahan yuridis: dokumen tidak lengkap, kewenangan cacat, perjanjian lemah, salah transaksi, atau proses tidak sesuai ketentuan.']
      ],
      sources:{glossary:`${SRC.notes}, hlm. 60–71; ${SRC.deck}, hlm. 1168–1300.`, mastery:`${SRC.deck}, hlm. 1174–1299; ${SRC.notes}, hlm. 60–71.`, critical:`${SRC.deck}, hlm. 1195–1293.`, questions:`${SRC.notes}, hlm. 62–71, 95, 99, 101 (kisi-kisi).`}
    }
  ];

  const deepContent = window.GBPLearningDeep || {};
  modules.forEach(module => {
    const deep = deepContent[module.code];
    if (!deep) return;
    module.core = deep.core || [];
    module.flow = deep.flow || [];
    module.cases = deep.cases || [];
    module.glossary = [...module.glossary, ...(deep.glossary || [])];
    module.critical = [...module.critical, ...(deep.critical || [])];
    module.questions = [...module.questions, ...(deep.questions || [])];
    module.sources = {...module.sources, ...(deep.sources || {})};
  });

  const expertContent = window.GBPLearningExpert || {};
  modules.forEach(module => {
    const expert = expertContent[module.code] || {};
    module.expert = expert.chapters || [];
    module.expertNote = expert.note || '';
    module.glossary = [...module.glossary, ...(expert.glossary || [])];
  });

  const root = document.getElementById('learningModuleRoot');
  if (!root) return;

  const esc = value => String(value ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  const sourceNote = text => `<p class="lm-source">${esc(text)}</p>`;
  const sectionHead = (icon, title, subtitle) => `<div class="lm-section-head"><span>${icon}</span><div><h2>${esc(title)}</h2><p>${esc(subtitle)}</p></div></div>`;

  function renderIndex(query='') {
    const needle = query.trim().toLowerCase();
    const filtered = modules.filter(m => !needle || [
      m.code,m.title,m.summary,...m.tags,...m.glossary.flat(),
      ...(m.core || []).flat(2), ...(m.flow || []).flat(), ...(m.cases || []).flat(),
      ...(m.expert || []).flatMap(chapter => [chapter.title, chapter.lead, ...chapter.rows.flat()])
    ].join(' ').toLowerCase().includes(needle));
    root.innerHTML = `<div class="lm-shell">
      <section class="lm-hero"><div class="lm-hero-row"><div class="lm-hero-copy"><span class="lm-kicker">◫ Learning Module · General Banking Level 4</span><h1>10 Unit Kompetensi</h1><p>Materi belajar sampai level teknis: klasifikasi produk/transaksi, parameter waktu dan nominal, formulir, jurnal, kode SWIFT, standar, pasal hukum, alur kontrol, mini case, dan prediksi pertanyaan.</p><div class="lm-stats"><span><b>200</b> technical references</span><span><b>220+</b> istilah</span><span><b>90+</b> langkah proses</span><span><b>20</b> mini case</span></div></div><div class="lm-count"><strong>10</strong><span>sub-module kompetensi</span></div></div></section>
      <div class="lm-toolbar"><label class="lm-search"><span>⌕</span><input id="lmSearch" type="search" placeholder="Cari unit, istilah, atau topik…" value="${esc(query)}" autocomplete="off"></label><div class="lm-source-summary">Sumber utama: 2 PDF · 1.626 halaman</div></div>
      <div class="lm-grid">${filtered.length ? filtered.map((m,i) => `<button class="lm-card" data-lm-open="${modules.indexOf(m)}"><span class="lm-card-num">${String(modules.indexOf(m)+1).padStart(2,'0')}</span><span><small class="lm-card-code">${esc(m.code)}</small><h2>${esc(m.title)}</h2><p>${esc(m.summary)}</p><span class="lm-card-tags">${m.tags.map(t=>`<span>${esc(t)}</span>`).join('')}</span></span><span class="lm-card-arrow">›</span></button>`).join('') : '<div class="lm-empty">Tidak ada materi yang cocok dengan pencarian.</div>'}</div>
    </div>`;
    const input = document.getElementById('lmSearch');
    input?.addEventListener('input', e => { const pos=e.target.selectionStart; renderIndex(e.target.value); const next=document.getElementById('lmSearch'); next?.focus(); next?.setSelectionRange(pos,pos); });
    root.querySelectorAll('[data-lm-open]').forEach(btn => btn.addEventListener('click', () => renderDetail(Number(btn.dataset.lmOpen))));
  }

  function renderDetail(index) {
    const m = modules[index];
    if (!m) return renderIndex();
    root.innerHTML = `<article class="lm-detail">
      <div class="lm-breadcrumb"><button id="lmBackTop">Learning Module</button><span>›</span><span>Unit ${index+1}</span></div>
      <header class="lm-detail-hero"><div class="lm-detail-icon">${m.icon}</div><div><span class="lm-unit-label">Unit Kompetensi ${String(index+1).padStart(2,'0')}</span><h1>${esc(m.title)}</h1><p>${esc(m.summary)}</p></div><span class="lm-detail-code">${esc(m.code)}</span></header>
      <nav class="lm-jumpbar" aria-label="Navigasi isi unit"><button data-jump="lmCore">Core Materi</button><button data-jump="lmExpert">Technical Deep Dive</button><button data-jump="lmFlow">Alur Proses</button><button data-jump="lmGlossary">Kamus / Glossary</button><button data-jump="lmMastery">Wajib Dikuasai</button><button data-jump="lmCritical">Titik Kritis</button><button data-jump="lmCases">Mini Case</button><button data-jump="lmQuestions">Prediksi Pertanyaan</button></nav>
      <section class="lm-section" id="lmCore">${sectionHead('◆','Core Materi','Fondasi konsep dan hubungan antar-topik yang harus dipahami sebelum menghafal prosedur.')}<div class="lm-core-grid">${m.core.map((item,i)=>`<article class="lm-core-card"><span class="lm-core-no">${String(i+1).padStart(2,'0')}</span><h3>${esc(item[0])}</h3><p>${esc(item[1])}</p><ul>${item[2].map(point=>`<li>${esc(point)}</li>`).join('')}</ul></article>`).join('')}</div>${sourceNote(m.sources.core)}</section>
      <section class="lm-section lm-expert-section" id="lmExpert">${sectionHead('⌁','Technical Deep Dive','Detail teknis, angka, jenis, dokumen, kode, standar, dan rujukan yang membedakan jawaban umum dari jawaban kompeten.')}<div class="lm-expert-alert"><b>Catatan penggunaan</b><span>${esc(m.expertNote)}</span></div><div class="lm-expert-list">${m.expert.map((chapter,i)=>`<article class="lm-expert-chapter"><header><span>Deep Dive ${String(i+1).padStart(2,'0')}</span><h3>${esc(chapter.title)}</h3><p>${esc(chapter.lead)}</p></header><div class="lm-expert-table-wrap"><table class="lm-expert-table"><thead><tr><th>Istilah / Referensi</th><th>Detail Teknis</th><th>Implikasi Operasional / Ujian</th></tr></thead><tbody>${chapter.rows.map(row=>`<tr><td>${esc(row[0])}</td><td>${esc(row[1])}</td><td>${esc(row[2])}</td></tr>`).join('')}</tbody></table></div>${sourceNote(chapter.source)}</article>`).join('')}</div></section>
      <section class="lm-section" id="lmFlow">${sectionHead('→','Alur Proses End-to-End','Urutan kerja, tujuan setiap langkah, dan kontrol yang tidak boleh dilewati.')}<div class="lm-flow">${m.flow.map(item=>`<article class="lm-flow-step"><span class="lm-flow-number">${esc(item[0])}</span><div class="lm-flow-body"><h3>${esc(item[1])}</h3><p>${esc(item[2])}</p><div class="lm-flow-control"><b>Kontrol:</b> ${esc(item[3])}</div></div></article>`).join('')}</div>${sourceNote(m.sources.flow)}</section>
      <section class="lm-section" id="lmGlossary">${sectionHead('A','Kamus / Glossary','Istilah inti yang perlu dipahami, bukan sekadar dihafal.')}<div class="lm-glossary-wrap"><table class="lm-glossary"><thead><tr><th>Istilah</th><th>Makna operasional</th><th>Mengapa penting</th></tr></thead><tbody>${m.glossary.map(row=>`<tr><td>${esc(row[0])}</td><td>${esc(row[1])}</td><td>${esc(row[2])}</td></tr>`).join('')}</tbody></table></div>${sourceNote(m.sources.glossary)}</section>
      <section class="lm-section" id="lmMastery">${sectionHead('✓','Apa yang Wajib Dikuasai','Checklist kemampuan sebelum masuk ke latihan soal.')}<div class="lm-mastery">${m.mastery.map(item=>`<div class="lm-master-item"><span>✓</span><div>${esc(item)}</div></div>`).join('')}</div>${sourceNote(m.sources.mastery)}</section>
      <section class="lm-section" id="lmCritical">${sectionHead('!','Titik Penting & Jebakan','Konsep yang mudah tertukar atau sering menghasilkan keputusan keliru.')}<div class="lm-critical">${m.critical.map(item=>`<article class="lm-critical-card"><b>${esc(item[0])}</b><p>${esc(item[1])}</p><em>${esc(item[2])}</em></article>`).join('')}</div>${sourceNote(m.sources.critical)}</section>
      <section class="lm-section" id="lmCases">${sectionHead('▣','Mini Case & Cara Berpikir','Latihan membaca situasi, menemukan risiko, dan menyusun keputusan yang dapat dipertanggungjawabkan.')}<div class="lm-case-grid">${m.cases.map((item,i)=>`<article class="lm-case"><div class="lm-case-top"><span>Case ${String(i+1).padStart(2,'0')}</span><h3>${esc(item[0])}</h3></div><div class="lm-case-scenario"><b>Situasi</b><p>${esc(item[1])}</p></div><div class="lm-case-answer"><b>Cara berpikir & jawaban</b><p>${esc(item[2])}</p></div></article>`).join('')}</div>${sourceNote(m.sources.cases)}</section>
      <section class="lm-section" id="lmQuestions">${sectionHead('?','Yang Diekspektasikan untuk Ditanya','Pola pertanyaan dan inti jawaban yang harus muncul.')}<div class="lm-questions">${m.questions.map(item=>`<article class="lm-question"><span class="lm-qtype">${esc(item[0])}</span><div><h3>${esc(item[1])}</h3><p><b>Inti jawaban:</b> ${esc(item[2])}</p></div></article>`).join('')}</div>${sourceNote(m.sources.questions)}</section>
      <footer class="lm-footer-nav"><button id="lmPrev" ${index===0?'disabled':''}>← Unit sebelumnya</button><button id="lmAll">Lihat 10 unit</button><button id="lmNext" ${index===modules.length-1?'disabled':''}>Unit berikutnya →</button></footer>
    </article>`;
    document.getElementById('lmBackTop')?.addEventListener('click',()=>renderIndex());
    document.getElementById('lmAll')?.addEventListener('click',()=>renderIndex());
    document.getElementById('lmPrev')?.addEventListener('click',()=>{ if(index>0){renderDetail(index-1); window.scrollTo({top:0,behavior:'smooth'});} });
    document.getElementById('lmNext')?.addEventListener('click',()=>{ if(index<modules.length-1){renderDetail(index+1); window.scrollTo({top:0,behavior:'smooth'});} });
    root.querySelectorAll('[data-jump]').forEach(btn=>btn.addEventListener('click',()=>document.getElementById(btn.dataset.jump)?.scrollIntoView({behavior:'smooth',block:'start'})));
    window.scrollTo({top:0,behavior:'smooth'});
  }

  renderIndex();
  window.GBPLearningModules = { modules, open: renderDetail, showAll: renderIndex };
})();
