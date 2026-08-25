(() => {
  const notes = 'General Banking Certification';
  const deck = 'SERTIFIKASI GB 4 PPT BRIDGE';

  window.GBPLearningDeep = {
    'K.64GEB00.001.1': {
      core: [
        ['CIF sebagai single customer view','CIF menyatukan identitas, profil risiko, hubungan rekening, kewenangan, dan histori pemeliharaan data. Sebelum membuat CIF baru, petugas harus mencari kecocokan berdasarkan identitas resmi dan data pembanding.',['Hindari CIF ganda','Perubahan data harus berjejak','Seluruh rekening harus terhubung ke profil yang benar']],
        ['KYC dan uji tuntas berbasis risiko','KYC tidak berhenti pada fotokopi identitas. Bank memahami tujuan hubungan usaha, sumber dana, beneficial owner, pekerjaan/usaha, perkiraan transaksi, dan red flag untuk menentukan CDD atau EDD.',['Identitas + profil + tujuan','EDD untuk risiko lebih tinggi','Monitoring berlangsung sepanjang hubungan']],
        ['Produk, persyaratan, dan suitability','Dokumen serta kontrol berbeda menurut nasabah perorangan/nonperorangan dan jenis rekening seperti tabungan, giro, deposito, rekening dana, atau rekening kredit. Pilihan produk harus sesuai kebutuhan dan kemampuan.',['Gunakan ketentuan produk terbaru','Jelaskan biaya, risiko, dan fasilitas','Catat alasan pemilihan produk']],
        ['Kewenangan dan pola pengoperasian','Bank harus membedakan pemilik manfaat, pemilik rekening, pihak yang diberi kuasa, pengurus badan usaha, anggota joint account, dan orang tua/wali pada rekening QQ.',['Periksa dasar kewenangan','Terapkan mandat AND/OR','Simpan specimen yang valid']],
        ['Pemeliharaan hingga penutupan','Perubahan data, aktivasi dormant, penggantian fasilitas, dan penutupan merupakan kelanjutan kontrol onboarding. Penutupan baru final setelah identitas, kewajiban, saldo, blokir, standing instruction, serta media transaksi diselesaikan.',['Verifikasi ulang','Approval sesuai limit','Dokumentasi dan audit trail lengkap']]
      ],
      flow: [
        ['1','Gali tujuan dan kebutuhan','Tentukan siapa calon nasabah, tujuan pembukaan, produk yang dibutuhkan, dan pola penggunaan yang diperkirakan.','Jangan langsung input sebelum kebutuhan dan jenis hubungan jelas.'],
        ['2','Terima dan periksa dokumen','Cocokkan identitas asli, legalitas badan, NPWP bila relevan, alamat, pekerjaan/usaha, serta dokumen pendukung.','Uji keaslian, masa berlaku, konsistensi, dan kelengkapan.'],
        ['3','Cari atau bentuk CIF','Lakukan pencarian menyeluruh; gunakan CIF yang ada bila identitas sama dan mutakhirkan datanya.','CIF baru hanya bila benar-benar nasabah baru.'],
        ['4','Lakukan KYC/CDD/EDD','Identifikasi beneficial owner, sumber dana, tujuan hubungan, profil risiko, dan kewajaran transaksi.','Red flag harus didokumentasikan dan dieskalasikan.'],
        ['5','Tentukan produk dan mandat','Cocokkan kebutuhan dengan fitur, biaya, risiko, pola tanda tangan, dan pihak berwenang.','Pastikan suitability dan pemahaman nasabah.'],
        ['6','Input, verifikasi, dan approval','Petugas maker menginput; checker membandingkan dengan dokumen lalu pejabat berwenang menyetujui.','Tidak boleh self-approval untuk aktivitas kritikal.'],
        ['7','Aktivasi dan serahkan fasilitas','Aktifkan rekening, terima setoran awal bila disyaratkan, serahkan media transaksi, dan edukasi keamanan.','PIN, password, OTP, kartu, token, dan cek/BG harus aman.'],
        ['8','Filing dan ongoing monitoring','Indeks dokumen, simpan bukti, pantau kesesuaian transaksi, serta lakukan pengkinian data berkala/berdasarkan trigger.','Rekening tidak boleh lepas dari monitoring setelah dibuka.'],
        ['9','Proses penutupan bila diminta','Verifikasi kewenangan; selesaikan saldo, biaya, kewajiban, fasilitas, blokir, dan standing instruction; lalu approval dan arsipkan.','Jangan menutup hanya berdasarkan permintaan lisan.']
      ],
      glossary: [
        ['Beneficial Owner','Orang yang pada akhirnya memiliki, mengendalikan, menerima manfaat, atau menjadi sumber instruksi di balik rekening/transaksi.','Nama pada formulir belum tentu pihak yang sebenarnya mengendalikan dana.'],
        ['Authorized Person','Pihak yang secara sah diberi kewenangan untuk bertindak atas nama pemilik rekening atau badan.','Identitas yang valid tidak otomatis membuktikan kewenangan.'],
        ['Rekening QQ','Rekening yang dibuka untuk kepentingan pihak lain, misalnya orang tua untuk anak, dengan pola kewenangan sesuai ketentuan.','Harus jelas siapa pemilik manfaat dan siapa yang mengoperasikan.'],
        ['Mandat AND / OR','AND mensyaratkan tindakan bersama sesuai mandat; OR memungkinkan salah satu pihak berwenang bertindak sendiri.','Menentukan keabsahan instruksi pada joint account.'],
        ['Account Maintenance','Pemeliharaan data/fasilitas rekening seperti perubahan alamat, nomor kontak, pengurus, specimen, atau kanal transaksi.','Perubahan harus diverifikasi, disetujui, dan meninggalkan audit trail.'],
        ['Ongoing Due Diligence','Pemantauan berkelanjutan atas profil dan aktivitas nasabah setelah onboarding.','Memastikan transaksi tetap masuk akal terhadap profil terkini.'],
        ['Trigger Event','Peristiwa yang memicu pengkinian data atau review, misalnya perubahan pengurus, transaksi menyimpang, atau dokumen kedaluwarsa.','KYC tidak hanya diperbarui berdasarkan kalender.'],
        ['Exit / Rejection Criteria','Kondisi yang menjadi dasar bank menolak atau mengakhiri hubungan sesuai kebijakan dan hukum.','Keputusan harus objektif, berwenang, terdokumentasi, dan tidak diskriminatif.']
      ],
      critical: [
        ['Nama sama belum tentu orang sama','Gunakan nomor identitas, tanggal lahir, alamat, biometrik/data pembanding, dan dokumen resmi sebelum menggabungkan CIF.','Decision rule: gabungkan hanya setelah keyakinan identitas memadai; bila ragu, eskalasi.'],
        ['Pemilik rekening ≠ beneficial owner','Struktur badan, rekening untuk pihak lain, atau instruksi pihak ketiga dapat menyembunyikan pengendali sebenarnya.','Decision rule: jangan lanjut bila BO dan sumber dana belum dapat dijelaskan.'],
        ['Aktivasi dormant berisiko impersonation','Rekening lama mungkin memiliki data kontak dan specimen yang tidak mutakhir.','Decision rule: lakukan verifikasi kuat dan pengkinian data sebelum aktivasi/transaksi.']
      ],
      cases: [
        ['CIF ganda karena ejaan berbeda','Nasabah lama datang membuka deposito. Sistem menemukan CIF dengan nama tanpa gelar dan alamat lama. Petugas hendak membuat CIF baru agar cepat.','Cocokkan identitas utama dan data pembanding, gunakan CIF lama bila orangnya sama, mutakhirkan data dengan bukti, serta dokumentasikan perubahan. Membuat CIF baru akan memecah profil dan monitoring.'],
        ['Penutupan giro dengan cek beredar','Direktur perusahaan meminta giro ditutup, tetapi masih ada blanko cek dan perubahan direksi belum diperbarui.','Verifikasi kewenangan berdasarkan dokumen perusahaan terbaru, tarik/administrasikan media cek, cek kewajiban dan transaksi tertunda, selesaikan saldo/fasilitas, baru proses approval penutupan.']
      ],
      questions: [
        ['Analisis','Kapan CDD perlu ditingkatkan menjadi EDD?','Ketika profil, pihak, negara, produk, struktur kepemilikan, atau pola transaksi menunjukkan risiko lebih tinggi/red flag; lakukan pemeriksaan tambahan dan approval sesuai kebijakan.'],
        ['Alur','Jelaskan kontrol dari calon nasabah datang sampai rekening siap digunakan.','Need assessment → dokumen → CIF → KYC/BO → product suitability → input maker → verifikasi/checker → approval → aktivasi/edukasi → filing/monitoring.']
      ],
      sources:{core:`${notes}, hlm. 1–9; ${deck}, hlm. 359–418.`,flow:`${deck}, hlm. 359–418; ${notes}, hlm. 1–9.`,cases:`${notes}, hlm. 76–77 dan 92–103; ${deck}, hlm. 359–418.`}
    },

    'K.64GEB00.002.2': {
      core: [
        ['Kontrol awal hari','Operasional dimulai dengan briefing, pemeriksaan area/perangkat, pembukaan vault secara dual control, serah terima kas, dan penetapan limit teller.',['Kunci dan kombinasi terpisah','Kas dihitung saat serah terima','Akses tercatat']],
        ['Transaksi tunai','Setoran dan penarikan diproses melalui identifikasi, pemeriksaan warkat, penghitungan uang, pengecekan keaslian, input, otorisasi, dan penyerahan bukti.',['Hitung di hadapan nasabah','Periksa pecahan dan keaslian','Konfirmasi sebelum nasabah pergi']],
        ['Transaksi non-tunai','Transfer, pemindahbukuan, kliring, BI-FAST, dan RTGS dipilih berdasarkan nominal, urgensi, cut-off, beneficiary, mata uang, biaya, dan finality.',['Validasi tujuan','Perhatikan cut-off','Jelaskan status dan biaya']],
        ['Pengamanan kas dan warkat','Kas, specimen, blanko, surat berharga, override, serta media validasi adalah controlled items yang memerlukan custody dan kewenangan jelas.',['Dual control','Cash limit','Register serah terima']],
        ['Balancing dan akhir hari','Kas fisik, saldo sistem, warkat, jurnal, dan laporan harus cocok. Selisih, transaksi gagal, atau item tertunda dicatat sebagai exception dan ditindaklanjuti.',['Tidak menutup selisih pribadi','Telusuri audit trail','Eskalasi tepat waktu']]
      ],
      flow: [
        ['1','Buka operasional secara dual control','Periksa keamanan area, buka vault, hitung kas utama, dan dokumentasikan serah terima.','Kunci/kombinasi tidak dikuasai satu orang.'],
        ['2','Alokasikan kas dan alat kerja','Serahkan cash box sesuai limit, cek mesin hitung/UV, stempel, sistem, dan controlled stationery.','Jumlah awal harus cocok dengan sistem/register.'],
        ['3','Terima nasabah dan warkat','Pahami jenis transaksi; periksa rekening, nominal, tanggal, tanda tangan, beneficiary, serta dokumen pendukung.','Warkat tidak lengkap dikembalikan sebelum diproses.'],
        ['4','Identifikasi dan verifikasi','Cocokkan identitas/kewenangan, specimen, saldo, limit, status rekening, dan red flag.','Transaksi pihak ketiga memerlukan perhatian tambahan.'],
        ['5','Hitung dan periksa uang','Hitung per pecahan, uji keaslian/kelayakan, dan konfirmasi jumlah.','Uang mencurigakan ditangani sesuai prosedur, bukan dikembalikan sembarang.'],
        ['6','Input dan otorisasi','Masukkan data persis dari warkat; lakukan override/approval bila melewati limit atau memenuhi trigger.','Maker tidak mengesahkan pekerjaannya sendiri.'],
        ['7','Validasi dan serahkan bukti','Cetak/validasi bukti, hitung ulang kas keluar, dan konfirmasi transaksi di hadapan nasabah.','Final check sebelum nasabah meninggalkan counter.'],
        ['8','Balancing berkala dan cash remise','Pantau posisi kas, setor/ambil kas ke vault bila melampaui kebutuhan atau limit.','Perpindahan kas harus dihitung dan dicatat dua pihak.'],
        ['9','Rekonsiliasi akhir hari','Cocokkan fisik, sistem, warkat, jurnal, transaksi antar-kanal, dan daftar exception.','Short/over, reversal, dan item gagal harus transparan.'],
        ['10','Tutup dan amankan','Kembalikan kas/controlled items, buat laporan, tutup sistem, dan amankan vault.','Pastikan tidak ada transaksi atau dokumen tertinggal.']
      ],
      glossary: [
        ['Cash Supply / Remise','Penambahan atau pengurangan kas teller dari/ke vault atau unit kas untuk menjaga kebutuhan dan limit.','Perpindahan fisik harus dual control dan tercatat.'],
        ['Short / Over Cash','Selisih ketika kas fisik kurang/lebih dibanding saldo yang seharusnya menurut sistem.','Wajib ditelusuri, dibukukan, dan dilaporkan.'],
        ['Teller Balancing','Pencocokan posisi kas, transaksi, warkat, dan saldo sistem oleh teller.','Mendeteksi salah input, salah bayar, atau transaksi belum lengkap.'],
        ['Cut-off Time','Batas waktu penerimaan/pemrosesan transaksi untuk memperoleh tanggal valuta atau settlement tertentu.','Transaksi setelah cut-off dapat diproses hari berikutnya.'],
        ['Override','Persetujuan elektronik/operasional oleh pejabat yang memiliki limit lebih tinggi atau hak khusus.','Bukan cara melewati kontrol; alasan dan pemberi approval harus tercatat.'],
        ['Reversal','Pembalikan pencatatan transaksi yang salah/gagal melalui proses berwenang tanpa menghapus histori.','Menjaga buku benar sekaligus mempertahankan audit trail.'],
        ['Finality','Kepastian bahwa settlement telah final dan tidak dapat dibatalkan sepihak setelah titik tertentu.','Penting ketika memilih kanal dan menjelaskan status dana.'],
        ['Controlled Items','Kas, kunci, blanko, stempel, token, surat berharga, atau media lain yang akses dan penggunaannya dibatasi.','Kehilangan/penyalahgunaan dapat menimbulkan fraud dan kerugian.']
      ],
      critical: [
        ['Warkat lengkap belum tentu sah','Selain seluruh kolom terisi, periksa specimen, kewenangan, saldo, tanggal efektif, koreksi, dan indikasi manipulasi.','Decision rule: proses hanya jika lengkap, valid, authorized, dan dananya tersedia.'],
        ['Reversal tidak boleh menghapus jejak','Kesalahan diperbaiki dengan transaksi koreksi/pembalikan dan approval, bukan mengedit histori diam-diam.','Decision rule: dokumentasikan sebab, referensi transaksi asal, dan pejabat penyetuju.'],
        ['Uang diduga palsu bukan sekadar ditolak','Petugas mengikuti prosedur identifikasi, pengamanan, berita acara/pelaporan, dan komunikasi yang tepat.','Decision rule: jangan mengedarkan kembali uang yang dicurigai.']
      ],
      cases: [
        ['Selisih kas saat closing','Saldo sistem menunjukkan Rp105 juta, tetapi kas fisik hanya Rp104,5 juta. Teller ingin menutup selisih dengan uang pribadi.','Larangan menutupi selisih. Hitung ulang, cocokkan seluruh warkat/jurnal, telusuri transaksi dan bukti, lapor atasan, bukukan short sesuai prosedur, lalu tindak lanjut investigasi.'],
        ['Transfer besar mendekati cut-off','Nasabah meminta transfer bernilai besar dan mendesak; data beneficiary baru diberikan beberapa menit sebelum cut-off.','Validasi identitas, rekening tujuan, dana, kewenangan, dokumen, dan kanal. Jelaskan risiko melewati cut-off; jangan mengorbankan kontrol demi mengejar waktu.']
      ],
      questions: [
        ['Kontrol','Apa beda balancing dengan rekonsiliasi?','Balancing memastikan posisi teller/kas cocok; rekonsiliasi mempertemukan data antar-sumber seperti fisik, sistem, jurnal, warkat, dan settlement.'],
        ['Studi kasus','Bagaimana menangani transaksi yang salah input tetapi sudah tervalidasi?','Hentikan dampak bila memungkinkan, lapor, lakukan reversal/koreksi berwenang, hubungkan dengan transaksi asal, komunikasikan bila perlu, dan pertahankan audit trail.']
      ],
      sources:{core:`${notes}, hlm. 10–14; ${deck}, hlm. 419–480.`,flow:`${deck}, hlm. 419–480; ${notes}, hlm. 10–14.`,cases:`${notes}, hlm. 92, 96, 101 dan 108–110; ${deck}, hlm. 419–480.`}
    },

    'K.64GEB00.003.2': {
      core: [
        ['Perspektif kurs bank','Kurs selalu dibaca dari posisi bank: bank membeli valas memakai kurs beli dan menjual valas memakai kurs jual. Nilai transaksi = nominal valas × kurs yang relevan.',['Tentukan siapa menyerahkan valas','Pilih kurs dari sisi bank','Tambahkan biaya bila disebutkan']],
        ['Jenis transaksi dan value date','Same day, tomorrow, spot, forward, dan swap dibedakan terutama oleh tanggal penyelesaian dan struktur transaksi.',['Spot lazim hingga dua hari kerja','Forward melewati spot','Swap terdiri dari dua kaki transaksi']],
        ['Deal dan dokumentasi','Sebelum rate dikunci, bank memeriksa pihak berwenang, dana/limit, jenis transaksi, underlying, nominal, valuta, serta value date; kemudian membuat konfirmasi/deal ticket.',['Rate sensitif waktu','Konfirmasi harus presisi','Jejak komunikasi disimpan']],
        ['Underlying dan tujuan hedging','Kebutuhan valas harus dikaitkan dengan aktivitas ekonomi dan dokumen yang relevan sesuai nilai/ketentuan. Forward atau swap digunakan untuk mengelola risiko arus kas, bukan spekulasi tanpa dasar.',['Cocokkan nominal dan tenor','Periksa dokumen pendukung','Hindari over-hedging']],
        ['Risiko transaksi valas','Perubahan kurs menimbulkan risiko pasar; kegagalan lawan transaksi menimbulkan counterparty/settlement risk; salah booking menimbulkan risiko operasional.',['Limit posisi','Konfirmasi independen','Rekonsiliasi settlement']]
      ],
      flow: [
        ['1','Identifikasi kebutuhan valas','Tentukan apakah nasabah membeli/menjual valas, tujuan ekonomi, nominal, valuta, dan tanggal kebutuhan.','Gunakan perspektif bank sejak awal.'],
        ['2','Pilih jenis transaksi','Tentukan cabang/same day/tom/spot/forward/swap berdasarkan value date dan tujuan.','Produk harus sesuai kebutuhan, bukan prediksi rate semata.'],
        ['3','Verifikasi pihak, dana, dan limit','Periksa authorized person, rekening settlement, ketersediaan dana, limit, serta profil transaksi.','Transaksi di luar profil membutuhkan klarifikasi/escalation.'],
        ['4','Periksa underlying','Cocokkan dokumen, nilai, tujuan, dan tenor dengan ketentuan transaksi valas.','Dokumen tidak boleh digunakan melampaui nilai yang mendasarinya.'],
        ['5','Minta quotation','Cabang/nasabah meminta rate kepada treasury/dealing room dengan spesifikasi lengkap.','Sebut buy/sell, pair, amount, dan value date secara tegas.'],
        ['6','Konfirmasi deal','Nasabah menyetujui rate; petugas mengulang nominal, valuta, arah, rate, value date, dan rekening settlement.','Kesepakatan harus unequivocal dan terekam/tercatat.'],
        ['7','Booking dan approval','Masukkan deal ke sistem, buat deal ticket/confirmation, dan lakukan checker/approval.','Pisahkan dealing, confirmation, dan settlement bila diwajibkan.'],
        ['8','Settlement','Debit/kredit rekening sesuai tanggal nilai dan kirim/terima valuta melalui jalur yang ditetapkan.','Pantau dana masuk, cut-off, dan kegagalan settlement.'],
        ['9','Rekonsiliasi dan monitoring','Cocokkan deal, confirmation, posisi, rekening nostro/internal, dan laporan exception.','Perbedaan rate, amount, atau value date segera diselidiki.']
      ],
      glossary: [
        ['Quotation / Quote','Penawaran kurs untuk pasangan mata uang, arah transaksi, nominal, dan value date tertentu pada saat tertentu.','Rate dapat berubah cepat dan tidak berdiri tanpa parameter deal.'],
        ['Bid / Offer','Bid adalah harga pihak pemberi quote membeli base currency; offer adalah harga menjualnya.','Padanannya membantu memahami kurs beli/jual dan spread.'],
        ['Value Date','Tanggal efektif pertukaran dan penyelesaian dana antar-mata uang.','Membedakan same day, tomorrow, spot, dan forward.'],
        ['Deal Ticket','Catatan resmi rincian transaksi: counterparty, buy/sell, pair, amount, rate, value date, dan instruksi settlement.','Menjadi dasar confirmation, settlement, accounting, dan audit.'],
        ['Counterparty Risk','Risiko pihak lawan tidak memenuhi kewajiban pembayaran/penyerahan valuta.','Perlu limit, collateral/netting bila relevan, dan monitoring exposure.'],
        ['Settlement Risk','Risiko satu pihak telah menyerahkan mata uang tetapi tidak menerima mata uang lawan.','Timing, cut-off, dan mekanisme settlement sangat penting.'],
        ['Hedging','Penggunaan transaksi untuk mengurangi ketidakpastian nilai kewajiban atau penerimaan valas.','Tujuannya stabilitas arus kas, bukan mengejar keuntungan spekulatif.'],
        ['Market Position','Eksposur bersih bank terhadap pergerakan mata uang setelah memperhitungkan transaksi beli/jual.','Perlu limit posisi dan pengendalian risiko pasar.']
      ],
      critical: [
        ['Quote tidak berlaku tanpa detail','Rate untuk USD/IDR spot tidak otomatis berlaku untuk nominal, arah, atau value date lain.','Decision rule: ulangi seluruh parameter sebelum nasabah menyatakan deal.'],
        ['Underlying harus match','Dokumen harus selaras dengan pihak, tujuan, nominal, valuta, serta jangka waktu transaksi.','Decision rule: jangan booking hedging melebihi kebutuhan yang dapat dibuktikan.'],
        ['Deal bersifat mengikat','Setelah rate disepakati, perubahan pasar bukan alasan membatalkan secara informal.','Decision rule: koreksi/cancel hanya melalui prosedur dan kewenangan resmi.']
      ],
      cases: [
        ['Importir membeli USD','Importir perlu USD 20.000 untuk pembayaran invoice dan bank mengutip kurs beli 15.450 serta kurs jual 15.650.','Karena bank menjual USD kepada nasabah, gunakan kurs jual: 20.000 × 15.650 = Rp313.000.000 sebelum biaya. Verifikasi invoice/underlying dan value date.'],
        ['Forward tanpa kebutuhan pasti','Nasabah ingin forward USD enam bulan karena yakin rupiah melemah, tetapi tidak dapat menunjukkan kewajiban valas.','Jangan memperlakukan produk sebagai spekulasi. Gali kebutuhan riil, cek ketentuan underlying dan suitability; bila tidak memenuhi, jangan lanjutkan deal.']
      ],
      questions: [
        ['Alur','Apa yang wajib diulang saat deal confirmation?','Arah buy/sell dari sisi bank, currency pair, nominal, rate, value date, counterparty, dan rekening/instruksi settlement.'],
        ['Risiko','Bedakan market, counterparty, settlement, dan operational risk pada transaksi valas.','Market: perubahan kurs; counterparty: gagal memenuhi kewajiban; settlement: pertukaran dana tidak simultan; operational: salah input/proses/sistem.']
      ],
      sources:{core:`${notes}, hlm. 15–18; ${deck}, hlm. 267–295.`,flow:`${deck}, hlm. 267–295; materi remittance hlm. 251–252.`,cases:`${notes}, hlm. 77 dan 92–95; ${deck}, hlm. 280–289.`}
    },

    'K.64GEB00.007.1': {
      core: [
        ['Literasi, inklusi, dan perlindungan','Literasi membangun pengetahuan, keterampilan, keyakinan, sikap, dan perilaku; inklusi memastikan akses serta penggunaan layanan yang sesuai. Keduanya harus mendorong keputusan aman, bukan sekadar penjualan.',['Edukasi bukan promosi','Akses harus bertanggung jawab','Risiko dan hak wajib dijelaskan']],
        ['Analisis sasaran','Karakter audiens—usia, pekerjaan, tingkat pemahaman, akses digital, bahasa, dan masalah keuangan—menentukan topik, contoh, media, serta kedalaman materi.',['Audience first','Gunakan konteks sehari-hari','Perhatikan kelompok rentan/3T']],
        ['Perencanaan program','Rencana memuat tujuan belajar, peserta, materi, metode, media, jadwal, wilayah, PIC, anggaran, indikator, risiko pelaksanaan, serta bukti yang akan dikumpulkan.',['Selaras rencana bisnis','Tujuan harus terukur','PIC dan timeline jelas']],
        ['Pelaksanaan pembelajaran','Metode dapat berupa sosialisasi, workshop, simulasi, konsultasi, pendampingan, permainan, webinar, atau media digital. Fasilitator menghubungkan konsep dengan tindakan nyata.',['Bahasa sederhana','Latihan berbasis kasus','Konfirmasi pemahaman']],
        ['Evaluasi dan perbaikan','Keberhasilan dinilai dari jangkauan sekaligus perubahan pemahaman, keterampilan, keyakinan, atau perilaku. Hasil dilaporkan dan dipakai memperbaiki program berikutnya.',['Pre/post assessment','Feedback peserta','Outcome, bukan hanya attendance']]
      ],
      flow: [
        ['1','Petakan masalah dan audiens','Cari kebutuhan nyata, baseline pemahaman, karakter, hambatan akses, dan risiko peserta.','Jangan memulai dari produk yang ingin dijual.'],
        ['2','Tetapkan tujuan belajar','Rumuskan kemampuan yang harus dapat dilakukan peserta setelah program.','Gunakan tujuan spesifik dan dapat diukur.'],
        ['3','Pilih topik dan ruang lingkup','Prioritaskan materi yang relevan: pengelolaan uang, produk, hak, risiko, fraud, atau kanal digital.','Hindari materi terlalu luas untuk waktu yang tersedia.'],
        ['4','Rancang metode dan media','Pilih tatap muka/digital, simulasi, diskusi, demonstrasi, leaflet, video, atau kemitraan.','Sesuaikan aksesibilitas dan tingkat literasi.'],
        ['5','Siapkan sumber daya','Tetapkan PIC, narasumber, lokasi/platform, jadwal, anggaran, materi, alat evaluasi, dan mitigasi.','Materi harus akurat dan versi terkini.'],
        ['6','Laksanakan secara interaktif','Bangun konteks, jelaskan konsep, demonstrasikan, beri latihan, dan jawab pertanyaan.','Bedakan fakta edukasi dari penawaran produk.'],
        ['7','Konfirmasi pemahaman','Gunakan teach-back, kuis, simulasi, atau demonstrasi tindakan oleh peserta.','Pertanyaan “sudah paham?” saja tidak cukup.'],
        ['8','Evaluasi hasil','Bandingkan baseline dan hasil, kumpulkan feedback, ukur jangkauan serta perubahan perilaku bila memungkinkan.','Pisahkan output kegiatan dari outcome belajar.'],
        ['9','Laporkan dan perbaiki','Simpan attendance/bukti, temuan, hasil evaluasi, kendala, dan rencana perbaikan.','Laporan harus dapat ditelusuri.']
      ],
      glossary: [
        ['3T','Daerah tertinggal, terdepan, dan terluar yang sering memerlukan pendekatan akses serta edukasi khusus.','Menentukan kanal, mitra, bahasa, dan logistik program.'],
        ['Learning Objective','Pernyataan kemampuan spesifik yang diharapkan dimiliki peserta setelah pembelajaran.','Menjadi dasar materi, aktivitas, dan evaluasi.'],
        ['Baseline','Kondisi awal pengetahuan, keterampilan, akses, atau perilaku peserta sebelum intervensi.','Tanpa baseline, dampak program sulit dibuktikan.'],
        ['Teach-back','Metode meminta peserta menjelaskan kembali atau mempraktikkan materi dengan kata-kata sendiri.','Lebih kuat daripada sekadar menanyakan apakah peserta paham.'],
        ['Output / Outcome','Output adalah hasil langsung seperti jumlah sesi/peserta; outcome adalah perubahan pemahaman, kemampuan, atau perilaku.','Mencegah program dinilai hanya dari keramaian.'],
        ['Sosialisasi / Lokakarya / Pendampingan','Sosialisasi menyebarkan informasi; lokakarya melibatkan latihan; pendampingan memberi dukungan berkelanjutan.','Pilih metode sesuai kedalaman perubahan yang dituju.'],
        ['TPAKD','Forum koordinasi percepatan akses keuangan daerah yang dapat menjadi mitra program inklusi/literasi.','Kemitraan memperluas jangkauan dan relevansi lokal.'],
        ['Kelompok Rentan','Peserta dengan hambatan akses, kemampuan, usia, disabilitas, ekonomi, atau digital yang membutuhkan desain inklusif.','Perlakuan setara dapat memerlukan dukungan yang berbeda.']
      ],
      critical: [
        ['Output tinggi belum berarti outcome','Seribu peserta tidak otomatis membuktikan peningkatan kemampuan atau perubahan perilaku.','Decision rule: ukur setidaknya satu indikator pemahaman/keterampilan selain attendance.'],
        ['Materi harus bebas konflik tujuan','Edukasi yang disisipi tekanan penjualan dapat mengurangi objektivitas dan kepercayaan.','Decision rule: sebut manfaat, biaya, risiko, dan alternatif secara seimbang.'],
        ['Bahasa sederhana ≠ informasi dipangkas','Penyederhanaan mengubah cara menjelaskan, bukan menghilangkan risiko atau hak penting.','Decision rule: gunakan contoh/visual lalu lakukan teach-back.']
      ],
      cases: [
        ['Edukasi keamanan untuk pensiunan','Cabang melihat peningkatan korban social engineering di segmen pensiunan.','Tetapkan tujuan tindakan aman; gunakan simulasi telepon palsu, larangan berbagi PIN/OTP, pengenalan kanal resmi, latihan pelaporan, materi besar-mudah dibaca, teach-back, dan evaluasi sebelum/sesudah.'],
        ['Program UMKM terlalu umum','Materi program hanya menjelaskan produk tabungan, sedangkan peserta kesulitan memisahkan uang usaha dan pribadi.','Ubah fokus menjadi cash-flow, pencatatan sederhana, rekening terpisah, keamanan digital, biaya/risiko layanan, lalu gunakan studi kasus dan tindak lanjut.']
      ],
      questions: [
        ['Desain','Apa beda output dan outcome dalam evaluasi edukasi?','Output mengukur kegiatan/jangkauan; outcome mengukur perubahan pengetahuan, keterampilan, keyakinan, atau perilaku.'],
        ['Studi kasus','Bagaimana merancang program untuk masyarakat dengan akses internet terbatas?','Gunakan analisis lokal, mitra komunitas, tatap muka/media sederhana, contoh relevan, bahasa yang dipahami, simulasi, alat evaluasi, dan tindak lanjut.']
      ],
      sources:{core:`${notes}, hlm. 19–22; ${deck}, hlm. 696–718.`,flow:`${deck}, hlm. 701–718; ${notes}, hlm. 19–22.`,cases:`${notes}, hlm. 78 dan 83–84; ${deck}, hlm. 709–718.`}
    },

    'K.64GEB00.009.1': {
      core: [
        ['Sumber informasi dan product knowledge','Penjelasan harus berasal dari kebijakan, tarif, ringkasan produk, dan ketentuan versi terbaru. Petugas memahami fitur, manfaat, syarat, biaya, risiko, limit, pajak, prosedur, dan konsekuensi.',['Gunakan sumber resmi','Cek effective date','Jangan menebak jawaban']],
        ['Consultative selling','Siklus dimulai dengan prospecting dan approaching, dilanjutkan probing, presenting, handling objection, negosiasi win-win, dan closing. Rekomendasi muncul setelah kebutuhan dipahami.',['Need before product','Pertanyaan terbuka dan tertutup','Solusi relevan, bukan product pushing']],
        ['Transparansi seimbang','Nasabah menerima informasi manfaat, biaya, risiko, hak, kewajiban, pembatasan, dan mekanisme pengaduan dalam bahasa yang mudah dipahami.',['Tidak misleading','Tidak menyembunyikan biaya','Materi promosi konsisten dengan perjanjian']],
        ['Suitability dan pilihan nasabah','Produk dinilai terhadap tujuan, horizon, kemampuan membayar, likuiditas, pengalaman, dan toleransi risiko nasabah. Keputusan akhir tetap pada nasabah tanpa tekanan.',['Bandingkan alternatif','Jelaskan trade-off','Hormati waktu berpikir']],
        ['Confirmation dan dokumentasi','Petugas menguji kembali pemahaman, merangkum poin kunci, mencatat consent yang disyaratkan, dan menyimpan bukti penjelasan.',['Teach-back/summary','No blank signing','Audit trail penawaran']]
      ],
      flow: [
        ['1','Prospecting dan preparation','Kenali segmen, siapkan sumber informasi terbaru, dan pahami tujuan pertemuan.','Jangan menggunakan materi tarif kedaluwarsa.'],
        ['2','Approaching','Bangun rapport, jelaskan tujuan interaksi, dan dapatkan izin untuk menggali kebutuhan.','Hindari langsung menawarkan produk.'],
        ['3','Probing','Gali situasi, tujuan, masalah, prioritas, kemampuan, pengalaman, horizon, dan toleransi risiko.','Gunakan pertanyaan serta dengarkan jawaban secara aktif.'],
        ['4','Simpulkan kebutuhan','Ulangi kebutuhan dan minta konfirmasi agar tidak salah memahami.','Pisahkan kebutuhan utama dari keinginan sesaat.'],
        ['5','Presenting solusi','Jelaskan produk yang relevan, cara kerja, manfaat, biaya, risiko, syarat, proses, pajak, dan alternatif.','Gunakan ilustrasi wajar, bukan janji hasil.'],
        ['6','Handling objection','Dengarkan keberatan, klarifikasi penyebab, jawab dengan fakta, dan akui bila produk tidak cocok.','Jangan mendebat atau menekan.'],
        ['7','Negosiasi win-win','Bahas pilihan dalam batas kebijakan dan kewenangan tanpa memberi janji di luar ketentuan.','Tidak boleh mengubah syarat secara informal.'],
        ['8','Confirmation of understanding','Minta nasabah merangkum kembali biaya, risiko, kewajiban, dan konsekuensi utama.','Tanda tangan bukan pengganti pemahaman.'],
        ['9','Closing dan dokumentasi','Konfirmasi pilihan sukarela, selesaikan dokumen, berikan salinan/ringkasan, serta jelaskan kanal bantuan/pengaduan.','Simpan bukti disclosure dan consent.']
      ],
      glossary: [
        ['Prospecting','Identifikasi calon nasabah/segmen yang berpotensi membutuhkan solusi berdasarkan kriteria yang etis.','Menentukan fokus tanpa melakukan diskriminasi atau spam.'],
        ['Approaching','Tahap membuka interaksi, membangun kepercayaan, dan memperoleh izin menggali kebutuhan.','Kesan awal memengaruhi kualitas informasi yang dibagikan nasabah.'],
        ['Presenting','Penyampaian solusi yang menghubungkan fitur dengan kebutuhan serta menjelaskan biaya dan risiko.','Bukan membacakan brosur atau hanya menonjolkan benefit.'],
        ['Handling Objection','Proses memahami dan menjawab kekhawatiran nasabah dengan fakta, empati, dan pilihan yang relevan.','Keberatan dapat menunjukkan informasi belum jelas atau produk tidak cocok.'],
        ['Win-win Negotiation','Pencarian pilihan yang memenuhi kebutuhan nasabah dan kebijakan bank tanpa manipulasi.','Mencegah janji diskon, rate, atau pengecualian tanpa kewenangan.'],
        ['Closing','Tahap mengonfirmasi keputusan sukarela dan langkah berikutnya setelah pemahaman memadai.','Closing bukan memaksa tanda tangan.'],
        ['Product Disclosure','Pengungkapan fakta material produk: fitur, manfaat, biaya, risiko, syarat, hak, kewajiban, dan konsekuensi.','Mengurangi information asymmetry dan mis-selling.'],
        ['Confirmation of Understanding','Pengujian bahwa nasabah benar-benar memahami poin material sebelum memutuskan.','Lebih bermakna daripada checkbox administratif.']
      ],
      critical: [
        ['Fitur bukan manfaat','Fitur adalah karakter produk; manfaat adalah nilai fitur bagi kebutuhan spesifik nasabah.','Decision rule: hubungkan setiap rekomendasi ke kebutuhan yang telah dikonfirmasi.'],
        ['Ilustrasi bukan janji','Proyeksi, contoh return, atau simulasi pembayaran bergantung asumsi dan tidak boleh disampaikan sebagai kepastian.','Decision rule: jelaskan asumsi, skenario buruk, biaya, dan risiko.'],
        ['Versi lama = informasi salah','Tarif, limit, syarat, atau promosi dapat berubah sehingga hafalan petugas tidak cukup.','Decision rule: validasi sumber dan tanggal berlaku sebelum memberi kepastian.']
      ],
      cases: [
        ['Deposito untuk kebutuhan darurat','Nasabah membutuhkan dana sewaktu-waktu, tetapi petugas menawarkan deposito tenor panjang hanya karena target.','Gali kebutuhan likuiditas, jelaskan penalti/konsekuensi pencairan, bandingkan alternatif, dan rekomendasikan berdasarkan suitability—bukan target penjualan.'],
        ['Nasabah tidak memahami biaya','Nasabah siap menandatangani formulir kartu, tetapi mengira seluruh biaya gratis selamanya.','Hentikan proses, jelaskan jenis dan kondisi biaya, risiko, limit, kewajiban, masa promo, lakukan teach-back, lalu dokumentasikan keputusan.']
      ],
      questions: [
        ['Urutan','Sebutkan alur consultative selling.','Prospecting/preparation → approaching → probing → simpulkan kebutuhan → presenting → handling objection → win-win negotiation → confirmation → closing.'],
        ['Etika','Apa yang dilakukan bila pertanyaan nasabah belum diketahui jawabannya?','Jangan menebak; akui, rujuk sumber resmi/pejabat berwenang, beri jawaban terverifikasi, lalu dokumentasikan bila material.']
      ],
      sources:{core:`${notes}, hlm. 23–25; ${deck}, hlm. 614–695.`,flow:`${deck}, hlm. 614–695; ${notes}, hlm. 23–25.`,cases:`${notes}, hlm. 82–84 dan 102; ${deck}, hlm. 680–695.`}
    },

    'K.64GEB00.010.1': {
      core: [
        ['Prinsip penanganan pengaduan','Pengaduan ditangani dengan mudah diakses, cepat, objektif, rahasia, adil, tanpa biaya yang tidak semestinya, dan tanpa memperburuk posisi nasabah.',['Empati tanpa janji palsu','Data dilindungi','Nasabah mendapat status']],
        ['Penerimaan dan registrasi','Petugas membedakan inquiry, request, dan complaint; memverifikasi identitas/kewenangan, mencatat kronologi, kanal, bukti, kerugian, serta memberikan nomor referensi.',['Satu sumber data kasus','Tanggal penerimaan jelas','Bukti tidak hilang']],
        ['Klasifikasi dan eskalasi','Kasus dikategorikan menurut produk, dampak, kompleksitas, fraud, hukum, reputasi, atau risiko keamanan untuk menentukan unit penyelesaian dan prioritas.',['Urgent containment','SLA sesuai kategori','Conflict of interest dihindari']],
        ['Investigasi dan remediasi','Unit penyelesaian mengumpulkan bukti, rekaman, log, dokumen, dan keterangan; menilai akar masalah; lalu menentukan koreksi, kompensasi, atau penolakan beralasan.',['Berbasis fakta','Approval sesuai kewenangan','Perbaiki dampak dan penyebab']],
        ['Komunikasi, closure, dan learning','Jawaban memuat hasil, alasan, solusi, timeline, serta jalur lanjutan. Kasus ditutup setelah tindakan selesai dan hasilnya masuk analisis tren/root cause.',['Konfirmasi penerimaan solusi','Simpan audit trail','Gunakan data untuk pencegahan']]
      ],
      flow: [
        ['1','Dengarkan dan tunjukkan empati','Biarkan nasabah menjelaskan, rangkum masalah, dan pisahkan emosi dari fakta.','Empati tidak berarti mengakui kesalahan sebelum investigasi.'],
        ['2','Amankan risiko mendesak','Blokir kanal/kartu bila ada fraud, hentikan transaksi lanjutan bila mungkin, atau eskalasi keselamatan/data.','Containment didahulukan bila kerugian bisa bertambah.'],
        ['3','Verifikasi pihak','Pastikan identitas, kewenangan, kontak, dan hak pihak untuk memperoleh informasi kasus.','Jangan membuka data kepada pihak yang tidak berwenang.'],
        ['4','Catat dan registrasikan','Rekam kronologi, tanggal, produk, nominal, bukti, harapan nasabah, kanal, dan beri nomor pengaduan.','Catatan harus faktual dan lengkap.'],
        ['5','Klasifikasi dan tetapkan PIC','Nilai kategori, severity, fraud/legal/reputation indicator, SLA, dan unit penyelesaian.','Kasus sensitif tidak diselesaikan sendiri tanpa kewenangan.'],
        ['6','Investigasi','Kumpulkan log, jurnal, rekaman, dokumen, keterangan petugas/pihak lain, dan cocokkan timeline.','Jaga chain of evidence dan objektivitas.'],
        ['7','Putuskan dan remediasi','Tentukan valid/tidak, koreksi, refund/kompensasi bila berhak, tindakan disiplin/proses, dan perbaikan kontrol.','Keputusan mengikuti bukti dan kewenangan.'],
        ['8','Komunikasikan hasil','Sampaikan hasil, alasan, solusi, waktu implementasi, serta jalur keberatan/penyelesaian lanjutan.','Gunakan bahasa jelas dan hindari defensif.'],
        ['9','Konfirmasi dan tutup','Pastikan tindakan telah dieksekusi, dokumentasi lengkap, dan status penutupan jelas.','Jangan tutup hanya karena jawaban telah dikirim.'],
        ['10','Analisis tren dan akar masalah','Kelompokkan kasus berulang, identifikasi root cause, tetapkan corrective/preventive action, dan monitor efektivitas.','Pengaduan adalah input perbaikan sistem.']
      ],
      glossary: [
        ['Inquiry / Request / Complaint','Inquiry meminta informasi; request meminta layanan; complaint menyatakan ketidakpuasan atas produk, layanan, atau kerugian.','Klasifikasi menentukan SLA, bukti, dan jalur penyelesaian.'],
        ['Hard / Soft Complaint','Pengelompokan operasional menurut kompleksitas/dampak; soft lazim dapat diselesaikan cepat, hard membutuhkan investigasi/escalation.','Istilah dan batas mengikuti kebijakan bank.'],
        ['Complaint Register','Daftar terpusat berisi identitas kasus, kronologi, kategori, PIC, SLA, status, hasil, dan bukti.','Mencegah kasus hilang dan memungkinkan monitoring tren.'],
        ['SLA','Batas waktu dan standar layanan untuk respons/penyelesaian menurut kategori dan ketentuan.','Keterlambatan harus dimonitor, dijelaskan, dan dieskalasikan.'],
        ['Containment','Tindakan cepat membatasi kerugian atau risiko sebelum akar masalah selesai diinvestigasi.','Contoh: blokir kartu/kanal pada dugaan fraud.'],
        ['Remediation','Tindakan memulihkan hak/kondisi nasabah dan memperbaiki akibat masalah.','Dapat berupa koreksi, refund, kompensasi, atau pemulihan layanan.'],
        ['Root Cause Analysis','Analisis penyebab mendasar yang memungkinkan masalah terjadi, bukan hanya gejala langsung.','Menjadi dasar preventive action.'],
        ['Dispute Resolution','Mekanisme penyelesaian ketika nasabah tidak menerima hasil internal, melalui jalur lanjutan sesuai ketentuan.','Nasabah perlu diberi informasi hak dan kanalnya.']
      ],
      critical: [
        ['Empati ≠ mengakui liability','Petugas dapat meminta maaf atas pengalaman nasabah tanpa menyimpulkan kesalahan atau kompensasi sebelum fakta diperiksa.','Decision rule: empati sekarang, keputusan setelah investigasi berwenang.'],
        ['Respons ≠ penyelesaian','Acknowledgement cepat penting, tetapi kasus belum selesai sampai tindakan koreksi/remediasi dijalankan.','Decision rule: status closed hanya bila seluruh action item dan komunikasi final selesai.'],
        ['Fraud indicator mengubah prioritas','Pengaduan transaksi tidak dikenal memerlukan containment dan pengamanan bukti, bukan antrean biasa.','Decision rule: amankan akses/dana, eskalasi fraud, lalu investigasi.']
      ],
      cases: [
        ['Transaksi kartu tidak dikenal','Nasabah panik karena beberapa transaksi baru terus muncul dan petugas hanya menyuruh mengisi formulir.','Lakukan containment segera, verifikasi, registrasi, kumpulkan detail, eskalasi fraud, beri referensi/status dan timeline, investigasi, remediasi sesuai hasil, lalu RCA bila pola berulang.'],
        ['Pengaduan berulang karena biaya','Banyak nasabah mengeluhkan biaya yang sebenarnya tercantum tetapi tidak pernah dijelaskan saat penjualan.','Selesaikan kasus individual berbasis bukti, lalu identifikasi root cause pada disclosure/training/script, perbaiki proses, dan monitor apakah complaint rate menurun.']
      ],
      questions: [
        ['Alur','Kapan pengaduan boleh dinyatakan selesai?','Setelah investigasi dan keputusan berwenang, tindakan koreksi/remediasi selesai, hasil dikomunikasikan, bukti lengkap, serta status dan hak lanjutan jelas.'],
        ['Analisis','Mengapa root cause berbeda dari penyebab langsung?','Penyebab langsung menjelaskan kejadian saat itu; root cause menjelaskan kelemahan proses/sistem yang memungkinkan kejadian dan perlu dicegah berulang.']
      ],
      sources:{core:`${notes}, hlm. 26–30; ${deck}, hlm. 721–773.`,flow:`${deck}, hlm. 724–758; ${notes}, hlm. 26–30.`,cases:`${notes}, hlm. 29–30 dan 101; ${deck}, hlm. 731–772.`}
    },

    'K.64GEB00.016.1': {
      core: [
        ['Persamaan dan saldo normal','Aset = liabilitas + ekuitas. Aset dan beban bertambah di debit; liabilitas, ekuitas, dan pendapatan bertambah di kredit. Perspektif yang dipakai adalah buku bank.',['Debit bukan selalu uang masuk','Simpanan nasabah = liabilitas','Setiap jurnal harus balance']],
        ['Double entry dan bukti transaksi','Setiap kejadian yang memenuhi pengakuan dicatat minimal pada dua akun berdasarkan bukti sah, tanggal, nominal, rekening, dan otorisasi yang benar.',['Bukti sebelum posting','Chart of accounts tepat','Maker-checker']],
        ['Jurnal transaksi bank','Setoran/penarikan memengaruhi kas dan liabilitas simpanan; kredit memengaruhi aset pinjaman, kas/rekening nasabah, pendapatan bunga, provisi, dan cadangan.',['Gunakan perspektif bank','Pisahkan pokok dan bunga','Perhatikan accrual']],
        ['Siklus akuntansi','Bukti dikumpulkan, dijurnal, diposting ke buku besar, direkonsiliasi, disesuaikan, diringkas dalam trial balance, lalu disajikan sebagai laporan keuangan.',['Closing period','Adjusting entry','Review dan distribusi']],
        ['Estimasi, CKPN, dan laporan','Pendapatan/beban diakui sesuai periode; aset keuangan dievaluasi untuk penurunan nilai/CKPN. Hasil akhirnya meliputi posisi keuangan, laba rugi, perubahan ekuitas, arus kas, dan catatan.',['Accrual/matching','Prudence','Data dapat ditelusuri']]
      ],
      flow: [
        ['1','Terima bukti transaksi','Pastikan dokumen sumber tersedia dan transaksi benar-benar terjadi.','Tanpa bukti yang memadai, jangan posting.'],
        ['2','Validasi elemen dan otorisasi','Cek tanggal, nominal, pihak, rekening, tujuan, tanda tangan/approval, dan periode.','Pisahkan kesalahan dokumen dari kesalahan pencatatan.'],
        ['3','Tentukan akun dan perlakuan','Identifikasi aset/liabilitas/ekuitas/pendapatan/beban serta debit-kreditnya.','Gunakan chart of accounts dan kebijakan akuntansi.'],
        ['4','Buat jurnal','Catat debit dan kredit dengan referensi bukti serta deskripsi memadai.','Total debit harus sama dengan total kredit.'],
        ['5','Posting ke buku besar','Pindahkan jurnal ke akun terkait secara akurat dan tepat periode.','Kontrol interface dan batch posting.'],
        ['6','Rekonsiliasi','Cocokkan sub-ledger, general ledger, kas, rekening antar-unit/nostro, dan sumber eksternal.','Outstanding item diberi owner dan aging.'],
        ['7','Buat adjusting entry','Catat accrual, amortisasi, penyusutan, impairment/CKPN, atau koreksi cut-off.','Estimasi harus memiliki dasar dan approval.'],
        ['8','Susun trial balance dan laporan','Pastikan saldo seimbang, klasifikasi benar, lalu bentuk laporan keuangan dan catatan.','Balance belum menjamin tidak ada salah klasifikasi.'],
        ['9','Review, closing, dan distribusi','Lakukan analytical review, approval, lock period, serta distribusi kepada pihak berwenang.','Perubahan setelah closing harus melalui governance.']
      ],
      glossary: [
        ['Accrual Basis','Pendapatan dan beban diakui ketika hak/kewajiban timbul, bukan hanya saat kas diterima/dibayar.','Membuat kinerja periode lebih tepat.'],
        ['Matching Principle','Beban diakui pada periode yang sama dengan pendapatan/manfaat terkait sejauh dapat ditentukan.','Mencegah laba periode terdistorsi.'],
        ['Prudence','Kehati-hatian dalam menghadapi ketidakpastian tanpa sengaja membesar-besarkan aset/pendapatan.','Relevan pada estimasi dan penurunan nilai.'],
        ['General Ledger','Buku besar yang merangkum seluruh mutasi dan saldo akun dari jurnal/sub-ledger.','Menjadi basis trial balance dan laporan.'],
        ['Trial Balance','Daftar saldo akun untuk menguji total debit dan kredit serta menyiapkan laporan.','Seimbang tidak selalu berarti seluruh transaksi benar.'],
        ['Adjusting Entry','Jurnal penyesuaian akhir periode untuk accrual, deferral, estimasi, penyusutan, atau koreksi.','Memastikan cut-off dan measurement benar.'],
        ['Reversing Entry','Jurnal awal periode yang membalik penyesuaian tertentu agar pencatatan transaksi reguler tidak ganda.','Tidak semua adjusting entry perlu dibalik.'],
        ['Outstanding / Suspense Item','Selisih atau transaksi belum teridentifikasi/terselesaikan yang sementara dipantau pada rekonsiliasi/akun penampung.','Harus punya bukti, owner, aging, dan penyelesaian; bukan tempat menyembunyikan error.'],
        ['CKPN','Cadangan Kerugian Penurunan Nilai untuk estimasi kerugian kredit atas aset keuangan sesuai metodologi yang berlaku.','Mempengaruhi nilai aset, beban, laba, dan kecukupan data risiko.']
      ],
      critical: [
        ['Buku bank, bukan buku nasabah','Simpanan adalah utang bank kepada nasabah sehingga bertambah di kredit.','Decision rule: selalu tentukan siapa entitas pelapor sebelum memilih jurnal.'],
        ['Jurnal balance bisa tetap salah','Debit dan kredit yang sama dapat memakai akun, nasabah, periode, atau nominal yang salah.','Decision rule: validasi substansi dan bukti, bukan hanya keseimbangan angka.'],
        ['Suspense bukan solusi permanen','Akun penampung hanya sementara sambil item diidentifikasi dan diselesaikan.','Decision rule: setiap item wajib memiliki referensi, owner, aging, dan target closure.']
      ],
      cases: [
        ['Setoran tunai giro','Nasabah menyetor Rp10 juta ke giro pada bank.','Dari perspektif bank: kas sebagai aset naik → Debit Kas Rp10 juta; kewajiban giro naik → Kredit Giro Nasabah Rp10 juta.'],
        ['Biaya belum dibayar','Jasa vendor bulan Desember telah diterima, tetapi invoice baru dibayar Januari.','Dengan accrual basis, akui beban dan kewajiban pada Desember berdasarkan estimasi/bukti memadai; pembayaran Januari melunasi kewajiban, bukan mencatat ulang beban.']
      ],
      questions: [
        ['Analisis','Mengapa trial balance seimbang belum membuktikan laporan benar?','Kesalahan akun, periode, pihak, klasifikasi, atau transaksi yang sama-sama didebit/dikredit dapat tetap menghasilkan total seimbang.'],
        ['Alur','Jelaskan siklus akuntansi bank.','Bukti → validasi → analisis akun → jurnal → posting → rekonsiliasi → adjustment → trial balance → laporan → review/closing.']
      ],
      sources:{core:`${notes}, hlm. 44–53; ${deck}, hlm. 990–1078.`,flow:`${deck}, hlm. 994–1078; ${notes}, hlm. 44–53.`,cases:`${notes}, hlm. 75, 80, 100 dan 109–110; ${deck}, hlm. 1002–1013.`}
    },

    'K.64GEB00.014.2': {
      core: [
        ['Spektrum pembayaran perdagangan','Advance payment, open account, documentary collection, dan documentary credit membagi risiko buyer/seller secara berbeda. Pemilihan mempertimbangkan kepercayaan, negara, barang, tenor, dan biaya.',['Risiko tidak hilang—hanya dialokasikan','Cocokkan metode dengan hubungan dagang','Pahami kapan bank memberi komitmen']],
        ['Trade service, finance, dan guarantee','Service memproses instrumen/dokumen dan menghasilkan fee; finance menyediakan dana/exposure; guarantee memberi undertaking bila pihak terjamin gagal memenuhi kewajiban.',['Bedakan fee dan credit exposure','Analisis kredit untuk pembiayaan','Syarat klaim jaminan penting']],
        ['Pihak dan komitmen LC/SKBDN','Applicant meminta penerbitan; issuing bank memberi undertaking; advising bank mengautentikasi/meneruskan; beneficiary mempresentasikan dokumen; bank lain dapat menominasikan, mengonfirmasi, menegosiasi, atau mereimburse.',['Peran tidak otomatis sama','Confirmation menambah undertaking','Instruksi harus jelas']],
        ['Dokumen dan examination','Bank memeriksa presentasi berdasarkan syarat credit dan rules seperti UCP/ISBP yang relevan. Invoice, transport document, insurance, packing list, certificate, dan draft harus konsisten.',['Bank deal with documents','Perhatikan latest shipment/presentation','Identifikasi discrepancy']],
        ['Settlement dan pembiayaan','Dokumen comply dapat dibayar sight atau diterima untuk usance/deferred payment. Import/export financing, cash cover, atau fasilitas non-cash membawa risiko kredit, negara, operasional, fraud, dan dokumen.',['Waiver bukan otomatis compliance','Monitor maturity','Rekonsiliasi fees dan settlement']]
      ],
      flow: [
        ['1','Sepakati kontrak dagang','Buyer dan seller menyepakati barang, nilai, incoterms, dokumen, waktu, dan metode pembayaran.','LC tidak menggantikan kontrak jual beli.'],
        ['2','Applicant mengajukan penerbitan','Bank memeriksa aplikasi, legalitas, limit/cash cover, underlying, compliance, dan syarat credit.','Syarat harus jelas dan documentable.'],
        ['3','Issuing bank menerbitkan','LC/SKBDN dikirim secara autentik kepada advising bank sesuai instruksi.','Pastikan amount, expiry, shipment, documents, dan availability.'],
        ['4','Advising bank mengadvis','Bank memeriksa apparent authenticity dan meneruskan credit kepada beneficiary.','Advising saja tidak berarti menjamin pembayaran.'],
        ['5','Beneficiary review dan shipment','Seller menilai workable terms, meminta amendment bila perlu, lalu mengirim barang.','Jangan shipment jika syarat mustahil dipenuhi.'],
        ['6','Presentasi dokumen','Beneficiary menyerahkan dokumen dalam batas waktu ke nominated/advising/issuing bank.','Perhatikan expiry dan presentation period.'],
        ['7','Examination','Bank memeriksa dokumen terhadap credit dan rules, lalu menentukan comply atau discrepancy.','Keputusan berdasarkan dokumen, bukan barang.'],
        ['8','Discrepancy handling','Jika discrepancy, bank memberi notice dan dapat meminta waiver applicant tanpa kehilangan kontrol.','Waiver harus jelas dan berwenang.'],
        ['9','Honor/negotiation/acceptance','Dokumen comply diproses sesuai sight, usance, deferred, atau negotiation; kewajiban jatuh tempo dicatat.','Pisahkan pembayaran sekarang dan maturity mendatang.'],
        ['10','Settlement dan release documents','Bank menyelesaikan reimbursement/debit applicant, menyerahkan dokumen sesuai kontrol, membukukan fee/financing, dan merekonsiliasi.','Jaga title documents dan pastikan exposure tertutup.']
      ],
      glossary: [
        ['Confirming Bank','Bank yang atas otorisasi issuing bank menambahkan undertaking pembayaran sendiri di samping issuing bank.','Mengurangi risiko issuing bank/negara bagi beneficiary, tetapi menambah biaya/exposure.'],
        ['Nominated / Negotiating Bank','Nominated bank diberi kewenangan melakukan fungsi tertentu; negotiating bank membeli draft/dokumen yang comply sesuai credit.','Nominasi tidak selalu mewajibkan bank bertindak kecuali disepakati.'],
        ['Reimbursing Bank','Bank yang membayar klaim reimbursement bank lain atas instruksi issuing bank.','Mengatur jalur settlement antarbank.'],
        ['UCP 600','Aturan ICC yang lazim mengatur documentary credits bila diinkorporasikan ke dalam LC.','Menjadi kerangka definisi, examination, notice, dan tanggung jawab bank.'],
        ['ISBP','Praktik perbankan internasional standar yang membantu menerapkan UCP saat memeriksa dokumen.','Menjelaskan praktik detail yang tidak selalu tertulis di credit.'],
        ['Draft / Bill of Exchange','Instrumen tertulis yang memerintahkan pembayaran sejumlah tertentu, dapat sight atau tenor.','Relevan pada usance dan acceptance.'],
        ['Document of Title','Dokumen tertentu yang mewakili hak atas barang, misalnya jenis bill of lading tertentu.','Kontrol dokumen dapat melindungi posisi bank/buyer.'],
        ['Waiver','Persetujuan applicant untuk menerima discrepancy tertentu yang dimintakan oleh issuing bank.','Tidak menghapus kebutuhan dokumentasi dan keputusan bank.'],
        ['Cash Cover / Non-Cash Loan','Cash cover adalah dana jaminan tunai; fasilitas LC/BG non-cash menimbulkan contingent exposure sebelum pencairan.','Keduanya memengaruhi risiko, limit, dan pencatatan berbeda.']
      ],
      critical: [
        ['Kontrak dan LC terpisah','Sengketa mutu barang pada kontrak tidak otomatis mengubah kewajiban bank atas dokumen comply.','Decision rule: nilai presentasi berdasarkan instrumen dan rules; sengketa barang ditangani pada jalur kontrak.'],
        ['Advising bukan confirming','Meneruskan credit secara autentik tidak sama dengan menambah undertaking pembayaran.','Decision rule: sebut bank sebagai confirming hanya bila confirmation benar-benar ditambahkan.'],
        ['Waiver bukan hak beneficiary','Applicant dapat menerima discrepancy, tetapi bank tetap mempertimbangkan instrumen, otorisasi, fraud, dan risiko.','Decision rule: jangan menganggap dokumen discrepant otomatis dibayar setelah komunikasi informal.']
      ],
      cases: [
        ['Dokumen comply, barang bermasalah','Applicant mengklaim barang rusak dan meminta issuing bank tidak membayar, sementara presentasi tampak comply.','Bank memisahkan transaksi dokumen dari barang/kontrak. Periksa fraud/injunction bila ada dasar sah, tetapi sengketa kualitas saja tidak otomatis mengalahkan undertaking atas dokumen comply.'],
        ['LC berisi syarat tidak documentable','Applicant meminta syarat “barang harus berkualitas terbaik” tanpa dokumen pembuktian.','Ubah menjadi syarat dokumen yang objektif, misalnya certificate dari pihak yang disepakati. Syarat non-documentary menimbulkan ketidakpastian examination.']
      ],
      questions: [
        ['Peran','Bedakan issuing, advising, dan confirming bank.','Issuing menerbitkan undertaking; advising mengautentikasi/meneruskan; confirming menambahkan undertaking sendiri bila diotorisasi.'],
        ['Alur','Apa yang terjadi ketika bank menemukan discrepancy?','Catat dan beri notice tepat waktu, jelaskan discrepancy, tahan/return sesuai keputusan, dapat minta waiver applicant, lalu putuskan berdasarkan rules, risiko, dan otorisasi.']
      ],
      sources:{core:`${notes}, hlm. 31–43; ${deck}, hlm. 296–344.`,flow:`${deck}, hlm. 296–344; ${notes}, hlm. 31–43.`,cases:`${notes}, hlm. 79, 99 dan 106; ${deck}, hlm. 301–344.`}
    },

    'K.64GEB00.015.1': {
      core: [
        ['Siklus hidup dokumen','Dokumen dibuat/diterima, diverifikasi, diklasifikasi, diindeks, disetujui, dicatat, disimpan, dipinjam/dikembalikan, dipertahankan sesuai retensi, lalu diarsipkan atau dimusnahkan.',['Owner dan status jelas','Versi terkendali','Lokasi dapat dilacak']],
        ['Kualitas dan keabsahan','Administrasi menguji authenticity, accuracy, completeness, authority, relevance, dan compliance. Dokumen rapi tetapi tidak sah tetap tidak dapat menjadi dasar transaksi.',['Checklist berbasis risiko','Bukti sumber','Exception dicatat']],
        ['Keamanan dan akses','Dokumen fisik/digital diklasifikasikan, diberi hak akses need-to-know, dilindungi dari perubahan/kehilangan, memiliki backup, dan tercatat saat berpindah tangan.',['Confidentiality','Integrity','Availability']],
        ['Administrasi pembayaran dan aset','Pembayaran memerlukan vendor/bukti, kewenangan, anggaran, pajak, jurnal, serta rekonsiliasi. Data kualitas aset dan CKPN harus lengkap agar klasifikasi/cadangan tidak salah.',['Maker-checker','No duplicate payment','Data risiko dapat ditelusuri']],
        ['Monitoring dan pelaporan','Laporan menunjukkan volume, status, aging, missing documents, mismatch, exception, risiko, owner, deadline, dan tindak lanjut—bukan hanya item selesai.',['Dashboard aging','Escalation overdue','Audit trail']]
      ],
      flow: [
        ['1','Terima atau ciptakan dokumen','Catat tanggal, sumber, tujuan, jenis, dan owner sejak awal.','Dokumen tanpa asal/owner mudah hilang.'],
        ['2','Verifikasi','Uji authenticity, accuracy, completeness, authority, dan compliance terhadap checklist.','Pisahkan temuan minor dan critical.'],
        ['3','Klasifikasi dan indeks','Beri kode unik, kategori, metadata, nama file, serta hubungan dengan nasabah/transaksi.','Gunakan standar konsisten agar pencarian dapat diandalkan.'],
        ['4','Approval dan recording','Dapatkan persetujuan sesuai kewenangan, catat ke register/sistem, dan kunci versi final.','Maker-checker serta tanggal efektif harus jelas.'],
        ['5','Simpan dan lindungi','Tempatkan pada lokasi fisik/digital yang ditetapkan dengan akses, backup, enkripsi/keamanan yang relevan.','Need-to-know dan segregasi dokumen sensitif.'],
        ['6','Kelola penggunaan/perpindahan','Catat peminjaman, pengiriman, scan, perubahan, pengembalian, dan chain of custody.','Tidak ada dokumen keluar tanpa penerima dan due date.'],
        ['7','Monitor exception dan aging','Pantau dokumen kurang, kedaluwarsa, mismatch, approval tertunda, atau item belum kembali.','Setiap exception punya owner dan target.'],
        ['8','Retensi dan legal hold','Pertahankan dokumen sesuai jadwal; hentikan pemusnahan jika ada sengketa, audit, atau kebutuhan hukum.','Legal hold mengalahkan jadwal pemusnahan biasa.'],
        ['9','Arsip/pemusnahan dan laporan','Setelah approval, arsipkan permanen atau musnahkan secara aman; buat bukti dan laporan.','Pemusnahan harus irreversible dan tercatat.']
      ],
      glossary: [
        ['Record Lifecycle','Tahapan dokumen sejak dibuat/diterima sampai disposisi akhir.','Kontrol berbeda dibutuhkan pada setiap fase.'],
        ['Metadata','Data yang menjelaskan dokumen seperti kode, nasabah, tanggal, jenis, versi, owner, dan status.','Membuat pencarian, monitoring, dan audit lebih akurat.'],
        ['Version Control','Pengendalian agar pengguna mengetahui dokumen mana yang berlaku dan histori perubahan tetap tersedia.','Mencegah pemrosesan memakai formulir/kebijakan lama.'],
        ['Chain of Custody','Jejak penguasaan dan perpindahan dokumen/bukti dari satu pihak/lokasi ke pihak lain.','Menjaga integritas dan kekuatan bukti.'],
        ['Exception Register','Daftar terstruktur atas kekurangan, mismatch, keterlambatan, atau penyimpangan beserta owner dan tindak lanjut.','Membuat risiko yang belum selesai terlihat.'],
        ['Aging','Umur item sejak dibuat/jatuh tempo sampai diselesaikan, biasanya dikelompokkan dalam bucket hari.','Membantu prioritas dan escalation.'],
        ['Legal Hold','Instruksi mempertahankan dokumen yang relevan terhadap sengketa, investigasi, audit, atau proses hukum.','Menunda pemusnahan meski retensi normal berakhir.'],
        ['Need-to-Know','Prinsip akses hanya bagi pihak yang memerlukan informasi untuk tugas resminya.','Melindungi data pribadi dan rahasia bank.'],
        ['Disaster Recovery / Backup','Kemampuan memulihkan dokumen dan sistem setelah gangguan melalui salinan, lokasi alternatif, serta uji pemulihan.','Backup tanpa pengujian belum menjamin data dapat dipakai.']
      ],
      critical: [
        ['Scan bukan otomatis bukti yang andal','Kualitas, kelengkapan halaman, keterbacaan, metadata, integritas, dan hubungan dengan asli harus dikendalikan.','Decision rule: verifikasi hasil scan sebelum dokumen asli dipindahkan/dimusnahkan.'],
        ['Retensi bukan “simpan selamanya”','Terlalu cepat memusnahkan berisiko hukum; menyimpan tanpa batas meningkatkan biaya dan paparan data.','Decision rule: ikuti jadwal, legal hold, dan approval disposisi.'],
        ['Laporan hijau dapat menipu','Volume selesai tinggi bisa menyembunyikan dokumen kritis yang overdue atau tidak sah.','Decision rule: laporkan aging, severity, dan exception—bukan hanya persentase selesai.']
      ],
      cases: [
        ['Dokumen kredit tidak ditemukan','Saat audit, dokumen pengikatan ada di meja petugas tanpa register peminjaman dan scan di sistem tidak lengkap.','Amankan dokumen, catat chain of custody, verifikasi kelengkapan, perbarui indeks/scan, investigasi breach proses, dan perbaiki kontrol checkout-return serta audit berkala.'],
        ['Pembayaran vendor ganda','Invoice yang sama dibayar dua kali karena nomor dokumen ditulis berbeda dan checker hanya memeriksa nominal.','Lakukan recovery/escalation, cocokkan vendor-invoice-PO-bukti penerimaan, gunakan unique reference/duplicate check, maker-checker substantif, dan rekonsiliasi exception.']
      ],
      questions: [
        ['Alur','Jelaskan lifecycle dokumen perbankan.','Receive/create → verify → classify/index → approve/record → store/protect → use/track → monitor → retain/legal hold → archive/destroy/report.'],
        ['Kontrol','Apa yang harus ada dalam exception register?','Referensi item, jenis kekurangan, severity/risiko, tanggal/aging, owner, penyebab, action, deadline, escalation, status, dan bukti closure.']
      ],
      sources:{core:`${notes}, hlm. 54–59; ${deck}, hlm. 481–613.`,flow:`${deck}, hlm. 481–613; ${notes}, hlm. 54–59.`,cases:`${notes}, hlm. 57–59, 98, 100 dan 103; ${deck}, hlm. 483–613.`}
    },

    'K.64GEB00.017.1': {
      core: [
        ['Hubungan hukum dan posisi para pihak','Pada simpanan bank berutang kepada nasabah; pada kredit nasabah/debitur berutang kepada bank; pada jasa bank menjalankan mandat/layanan sesuai perjanjian. Hak, kewajiban, standar kehati-hatian, dan tanggung jawab mengikuti hubungan tersebut.',['Tentukan produk dan posisi','Baca kontrak dan aturan','Identifikasi hak pihak ketiga']],
        ['Subjek, kapasitas, dan kewenangan','Orang, badan hukum, serta entitas bukan badan hukum memiliki dokumen dan mekanisme perwakilan berbeda. Kecakapan pribadi tidak sama dengan kewenangan mewakili perusahaan.',['Periksa status hukum','Dokumen pendirian/perubahan','Board/shareholder approval bila perlu']],
        ['Keabsahan perjanjian','Kesepakatan, kecakapan, objek tertentu, dan causa halal harus terpenuhi. Cacat syarat subjektif menimbulkan dapat dibatalkan; cacat objektif menimbulkan batal demi hukum.',['Consent bebas cacat','Objek jelas','Tujuan tidak melanggar hukum']],
        ['Dokumen dan kekuatan bukti','Akta otentik, akta bawah tangan, legalisasi, waarmerking, surat kuasa, dan dokumen pengikatan memiliki fungsi serta kekuatan berbeda. Formalitas dipilih menurut transaksi dan risiko.',['Identitas penandatangan','Tanggal dan kewenangan','Original/copy serta custody']],
        ['Rahasia bank dan risiko hukum','Data hanya dibuka berdasarkan dasar, kewenangan, ruang lingkup, prosedur, dan approval yang sah. Risiko hukum berasal dari tuntutan atau kelemahan yuridis dan dimitigasi melalui legal review, dokumentasi, serta escalation.',['No informal disclosure','Data minimization','Monitor perubahan regulasi']]
      ],
      flow: [
        ['1','Identifikasi transaksi dan hubungan hukum','Tentukan produk, tujuan, pihak, hak/kewajiban, aset, dan potensi pihak ketiga.','Jangan mulai dari template kontrak.'],
        ['2','Verifikasi subjek dan status hukum','Periksa identitas orang atau akta/status entitas serta dokumen perubahannya.','Pastikan dokumen masih berlaku dan konsisten.'],
        ['3','Uji kecakapan dan kewenangan','Tentukan siapa boleh bertindak, dasar jabatan/kuasa, batas nilai, masa berlaku, dan persetujuan internal.','Identitas benar tidak cukup tanpa authority.'],
        ['4','Uji syarat sah dan objek','Periksa consent, kecakapan, objek tertentu, causa halal, serta larangan/regulasi terkait.','Bedakan cacat subjektif dan objektif.'],
        ['5','Rancang/review dokumen','Pastikan definisi, kewajiban, kondisi, representations, event of default, dispute, data, dan termination jelas.','Klausul tidak boleh bertentangan dengan hukum/perlindungan konsumen.'],
        ['6','Dapatkan approval dan legal clearance','Gunakan kewenangan bisnis, risiko, compliance, dan legal sesuai materialitas.','Exception harus dinyatakan dan disetujui.'],
        ['7','Signing dan formalitas','Verifikasi penandatangan, halaman/lampiran, tanggal, saksi/notaris, legalisasi/waarmerking bila relevan.','Hindari blank signing dan dokumen tidak lengkap.'],
        ['8','Perfection dan pencatatan','Selesaikan pengikatan/pendaftaran jaminan atau formalitas lain agar hak dapat dipertahankan terhadap pihak lain.','Perjanjian kredit saja belum selalu menyempurnakan jaminan.'],
        ['9','Custody dan monitoring','Simpan original, indeks, monitor expiry/covenant/perubahan pengurus, serta tangani permintaan data secara sah.','Legal risk berlanjut setelah signing.']
      ],
      glossary: [
        ['Syarat Subjektif / Objektif','Kesepakatan dan kecakapan adalah subjektif; objek tertentu dan causa halal adalah objektif.','Menentukan akibat hukum ketika syarat tidak terpenuhi.'],
        ['Dapat Dibatalkan / Batal Demi Hukum','Cacat subjektif memungkinkan pembatalan oleh pihak berhak; cacat objektif membuat perjanjian dianggap tidak sah sejak awal.','Akibatnya tidak boleh dipertukarkan.'],
        ['Freedom of Contract','Kebebasan para pihak menentukan isi perjanjian dalam batas hukum, ketertiban umum, kesusilaan, dan perlindungan yang berlaku.','Kebebasan tidak berarti bank boleh memakai klausul apa pun.'],
        ['Wanprestasi','Tidak dipenuhinya kewajiban kontraktual, terlambat, tidak sempurna, atau melakukan hal yang dilarang perjanjian.','Menjadi dasar remedial seperti tuntutan pemenuhan/ganti rugi sesuai syarat.'],
        ['Novasi','Pembaruan utang/perikatan yang mengganti kewajiban atau pihak berdasarkan kesepakatan yang sah.','Dapat memengaruhi jaminan dan hak aksesori sehingga perlu legal review.'],
        ['Surat Kuasa','Pemberian kewenangan dari pemberi kuasa kepada penerima untuk tindakan tertentu.','Periksa lingkup, masa berlaku, hak substitusi, dan pencabutan.'],
        ['Legal Perfection','Pemenuhan formalitas agar hak/jaminan efektif dan dapat dipertahankan terhadap pihak lain, misalnya pendaftaran tertentu.','Dokumen ditandatangani belum selalu berarti hak bank sempurna.'],
        ['Legal Review','Penilaian struktur, pihak, kewenangan, dokumen, klausul, kepatuhan, enforceability, dan mitigasi risiko hukum.','Harus dilakukan sebelum komitmen ketika material.'],
        ['Data Minimization','Pembukaan/penggunaan data dibatasi pada informasi yang benar-benar diperlukan untuk tujuan sah.','Mengurangi pelanggaran kerahasiaan dan privasi.']
      ],
      critical: [
        ['Direktur tidak selalu bebas bertindak','Anggaran dasar, perubahan pengurus, pembatasan nilai, persetujuan komisaris/RUPS, atau benturan kepentingan dapat membatasi kewenangan.','Decision rule: cocokkan tindakan dengan dokumen korporasi terbaru dan approval yang diwajibkan.'],
        ['Kuasa umum belum tentu cukup','Tindakan material atau spesifik mungkin memerlukan kuasa khusus dan formalitas tertentu.','Decision rule: periksa tindakan, objek, nilai, masa berlaku, substitusi, dan autentisitas kuasa.'],
        ['Perjanjian ≠ jaminan sempurna','Hak atas agunan dapat memerlukan dokumen, pendaftaran, notifikasi, atau penguasaan tambahan.','Decision rule: jangan anggap collateral enforceable sebelum perfection checklist selesai.']
      ],
      cases: [
        ['Direktur baru menandatangani kredit','Nama direktur ada pada kartu identitas, tetapi perubahan pengurus belum didukung dokumen korporasi dan persetujuan nilai transaksi belum terlihat.','Tunda signing, verifikasi akta/perubahan dan penerimaan/pencatatan yang relevan, cek pembatasan anggaran dasar serta approval organ perusahaan, lalu lakukan legal clearance.'],
        ['Keluarga meminta saldo nasabah','Anak nasabah membawa kartu keluarga dan meminta saldo untuk kebutuhan medis tanpa kuasa.','Hubungan keluarga bukan otomatis dasar pembukaan rahasia. Periksa kewenangan/kuasa atau pengecualian hukum yang sah, minimalkan data, approval, dan dokumentasikan.']
      ],
      questions: [
        ['Alur','Apa checklist legal sebelum kontrak ditandatangani?','Transaksi/hubungan → status pihak → kecakapan/kewenangan → syarat sah/objek → legal/regulatory review → klausul → approval → signing formalities → perfection → custody/monitoring.'],
        ['Studi kasus','Apa risiko menerima kuasa tanpa memeriksa ruang lingkupnya?','Penerima dapat bertindak di luar authority sehingga transaksi dapat disengketakan, hak bank lemah, data terbuka secara tidak sah, dan timbul kerugian/reputasi.']
      ],
      sources:{core:`${notes}, hlm. 60–71; ${deck}, hlm. 1168–1300.`,flow:`${deck}, hlm. 1174–1299; ${notes}, hlm. 60–71.`,cases:`${notes}, hlm. 62–71, 95, 99 dan 101; ${deck}, hlm. 1195–1293.`}
    }
  };
})();
