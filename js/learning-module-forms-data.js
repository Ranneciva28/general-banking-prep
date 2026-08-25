(() => {
  const expert = window.GBPLearningExpert || {};
  const deep = window.GBPLearningDeep || {};
  const SOURCE = 'Catatan formulir operasional pengguna · unggahan 25 Agustus 2026';

  const norm = s => String(s || '').trim().toLowerCase();
  const ensureExpert = code => (expert[code] ||= {note:'', chapters:[], glossary:[]});
  const ensureDeep = code => (deep[code] ||= {core:[], flow:[], glossary:[], critical:[], cases:[], questions:[], sources:{}});

  function upsertChapter(code, title, lead, rows, source=SOURCE, front=true){
    const target = ensureExpert(code);
    target.chapters = (target.chapters || []).filter(ch => norm(ch?.title) !== norm(title));
    const chapter = {title, lead, rows, source};
    front ? target.chapters.unshift(chapter) : target.chapters.push(chapter);
  }

  function addGlossary(code, rows){
    const target = ensureExpert(code);
    const existing = new Set((target.glossary || []).map(r => norm(r?.[0])));
    target.glossary ||= [];
    for(const row of rows){
      if(!existing.has(norm(row?.[0]))){target.glossary.push(row);existing.add(norm(row?.[0]));}
    }
  }

  function addCritical(code, rows){
    const target = ensureDeep(code);
    const existing = new Set((target.critical || []).map(r => norm(r?.[0])));
    target.critical ||= [];
    for(const row of rows){
      if(!existing.has(norm(row?.[0]))){target.critical.push(row);existing.add(norm(row?.[0]));}
    }
  }

  function appendNote(code, text){
    const target = ensureExpert(code);
    if(!String(target.note || '').includes(text)) target.note = `${target.note ? target.note + ' ' : ''}${text}`;
  }

  // 1) PEMBUKAAN & PENUTUPAN REKENING
  upsertChapter('K.64GEB00.001.1',
    'Atlas formulir pembukaan, fasilitas, dan penutupan rekening',
    'Kode form harus dipahami sebagai bagian dari alur, bukan sekadar hafalan. Bedakan siapa nasabahnya, tujuan transaksi, jenis rekening, dan apakah aktivitasnya pembukaan, maintenance fasilitas, atau penutupan.',
    [
      ['AR-01 · Form Pembukaan Rekening Individu','Form untuk pembukaan rekening nasabah individu/perorangan.','Dipakai ketika hubungan rekening dibuka atas nama orang pribadi. Pastikan identitas, profil, produk, dan data yang diinput konsisten.'],
      ['AR-02 · Form Pembukaan Rekening Non-Individu','Form untuk pembukaan rekening badan/non-individu seperti PT atau CV.','Selain data badan, periksa legal standing, pengurus, pihak berwenang, beneficial owner, serta dasar kewenangan penandatangan.'],
      ['AR-04 · Form Penutupan Rekening','Form yang mendokumentasikan permintaan penutupan rekening.','Bukan satu-satunya syarat penutupan: saldo, kewajiban, standing instruction, media transaksi, blokir, dan approval tetap harus diselesaikan.'],
      ['FR-01 · Form Penambahan Fasilitas dalam Produk','Form untuk menambah fasilitas pada produk/rekening yang sudah ada.','Jangan diperlakukan sebagai pembukaan rekening baru. Pastikan fasilitas memang eligible, diminta pihak berwenang, dan approval sesuai ketentuan.'],
      ['SG-01 · Surat Permohonan Pembukaan Rekening Giro','Surat permohonan formal dari nasabah untuk membuka rekening Giro.','Menjadi dokumen pengajuan. Validasi identitas/kewenangan pemohon serta kelengkapan dokumen legal pendukung.'],
      ['SG-02 · Lembar Referensi Giro','Lembar rujukan/referensi dari nasabah yang telah memiliki rekening untuk mendukung pengajuan Giro baru.','Referensi tidak menggantikan KYC, verifikasi legal, DHN, atau analisis kelayakan pembukaan Giro.'],
      ['SG-03 · Perjanjian Pembukaan Rekening Giro','Perjanjian yang menjadi landasan hukum dan administrasi hubungan rekening Giro.','Memuat klausul, persyaratan, serta persetujuan nasabah. Pastikan pihak yang menandatangani berwenang dan memahami hak/kewajibannya.']
    ]
  );

  upsertChapter('K.64GEB00.001.1',
    'Decision map: form mana dipakai kapan?',
    'Pakai logika aktivitas. Form yang tepat mengikuti siapa nasabahnya dan apa yang sedang dilakukan pada rekening.',
    [
      ['Individu membuka rekening','AR-01','Fokus pada identitas individu, profil, KYC, dan produk yang dipilih.'],
      ['PT/CV atau badan membuka rekening','AR-02','Fokus pada legalitas badan, pengurus, beneficial owner, serta authority.'],
      ['Nasabah menambah fasilitas pada rekening/produk','FR-01','Pastikan ini maintenance fasilitas, bukan pembukaan rekening baru.'],
      ['Nasabah mengajukan Giro','SG-01 → SG-02 (bila dipersyaratkan) → SG-03','Permohonan, referensi pendukung, lalu perjanjian Giro memiliki fungsi berbeda dan tidak saling menggantikan.'],
      ['Nasabah menutup rekening','AR-04','Verifikasi kehendak dan kewenangan, lalu selesaikan saldo, kewajiban, fasilitas, dan approval sebelum final closing.']
    ]
  );

  addGlossary('K.64GEB00.001.1', [
    ['AR-01','Form pembukaan rekening individu.','Gunakan untuk nasabah perorangan; jangan tertukar dengan AR-02.'],
    ['AR-02','Form pembukaan rekening non-individu/badan.','Membutuhkan perhatian lebih pada legalitas dan kewenangan.'],
    ['AR-04','Form penutupan rekening.','Mendokumentasikan permintaan tetapi final closing tetap memerlukan seluruh kontrol penutupan.'],
    ['FR-01','Form penambahan fasilitas dalam produk/rekening.','Digunakan pada maintenance fasilitas, bukan pembukaan rekening baru.'],
    ['SG-01','Surat permohonan pembukaan rekening Giro.','Dokumen pengajuan awal Giro.'],
    ['SG-02','Lembar referensi untuk mendukung pembukaan Giro baru.','Referensi bukan pengganti KYC atau legal checking.'],
    ['SG-03','Perjanjian pembukaan rekening Giro.','Landasan kontraktual yang memuat klausul dan persetujuan nasabah.']
  ]);

  addCritical('K.64GEB00.001.1', [
    ['AR-01 dan AR-02 tidak interchangeable','Individu dan badan memiliki profil dokumen, pihak berwenang, serta risiko legal yang berbeda.','Decision rule: tentukan legal form nasabah dulu, baru pilih form pembukaan.'],
    ['SG-01, SG-02, dan SG-03 punya fungsi berbeda','Permohonan, referensi, dan perjanjian tidak boleh dianggap tiga nama untuk dokumen yang sama.','Decision rule: uji fungsi dokumen pada tiap tahap proses Giro.'],
    ['AR-04 bukan tombol tutup rekening','Form penutupan adalah bukti permintaan; rekening baru final setelah seluruh kewajiban dan fasilitas clear.','Decision rule: jangan final closing sebelum saldo, kewajiban, media transaksi, standing instruction, dan approval selesai.']
  ]);

  appendNote('K.64GEB00.001.1','Peta formulir V41 mengikuti catatan formulir operasional yang diunggah 25 Agustus 2026; selalu cocokkan kode/versi form dengan formulir efektif di unit kerja.');

  // 2) TRANSAKSI TUNAI & NON-TUNAI
  upsertChapter('K.64GEB00.002.2',
    'Kamus formulir operasional',
    'Pisahkan form transaksi nasabah dari form pergeseran kas internal. Mapping UM-01/UM-02 di bawah mengikuti catatan lapangan terbaru yang diunggah pengguna dan menggantikan mapping Learning Module sebelumnya.',
    [
      ['OPS-01 · Slip Penarikan','Form yang diisi nasabah untuk melakukan penarikan dana langsung dari rekening melalui teller.','Periksa rekening, nominal, terbilang, identitas/kewenangan, specimen, saldo, dan validasi sebelum pembayaran.'],
      ['OPS-02 · Slip Penyetoran','Form untuk transaksi penyetoran dana tunai ke rekening bank.','Periksa rekening tujuan, identitas penyetor bila relevan, nominal, pecahan, sumber dana, dan hasil hitung fisik.'],
      ['OPS-03 · Form transaksi antarbank/Kliring/RTGS','Catatan upload mengaitkan OPS-03 dengan transaksi antarbank melalui mekanisme BI seperti kliring/RTGS.','Pastikan beneficiary, kanal, nominal, cut-off, biaya, dan kelengkapan instruksi sesuai versi form yang berlaku.'],
      ['KU-1 · Form Tambahan Kas / Slip Permintaan Kas','Form internal untuk meminta tambahan kas dari khasanah/vault.','Pergeseran kas internal wajib dual control, dihitung, dicatat, disetujui, dan diserahterimakan secara jelas.'],
      ['UM-01 · Bukti Cash Out','Dokumen dasar pengeluaran/pergeseran uang dari kas; catatan upload menyebut fungsinya mirip KU-1 dan sebagai bukti awal pergeseran kas pada open branch.','Jangan tertukar dengan UM-02. Pastikan arah pergeseran kas, nominal, pihak menyerahkan/menerima, serta approval jelas.'],
      ['UM-02 · Bukti Cash In','Dokumen untuk setoran kas, termasuk sisa kas teller atau kas dari unit lain; digunakan untuk mencatat perubahan posisi fisik kas.','Rekonsiliasikan jumlah fisik dengan sistem/register dan pastikan serah terima terdokumentasi.'],
      ['UM-06 · Bukti Transaksi Pemindahbukuan','Digunakan untuk pemindahbukuan/transfer internal atau overbooking, termasuk kebutuhan pencatatan transaksi pendukung seperti premi asuransi sesuai catatan operasional.','Pastikan rekening debit-kredit, tujuan transaksi, dokumen pendukung, maker-checker, dan posting sistem konsisten.'],
      ['AR / FR / SG','Keluarga form untuk master data rekening, fasilitas, dan Giro.','Jangan memakai slip transaksi OPS/UM untuk mengubah data induk atau hubungan kontraktual rekening.'],
      ['KCTT / SVS','Media specimen tanda tangan untuk pembandingan kewenangan transaksi.','Specimen adalah alat verifikasi authority dan harus menggunakan versi yang valid.']
    ]
  );

  upsertChapter('K.64GEB00.002.2',
    'Decision map: transaksi nasabah vs pergeseran kas internal',
    'Cara cepat membedakan form adalah melihat siapa yang memulai aktivitas dan apakah uang bergerak sebagai transaksi nasabah atau sebagai posisi kas internal bank.',
    [
      ['Nasabah menarik uang di teller','OPS-01','Transaksi keluar dari rekening nasabah.'],
      ['Nasabah menyetor uang tunai','OPS-02','Transaksi masuk ke rekening nasabah.'],
      ['Instruksi transfer/antarbank melalui kanal BI','OPS-03 sesuai versi form efektif','Fokus pada beneficiary, kanal, cut-off, dan status settlement.'],
      ['Teller membutuhkan tambahan kas dari khasanah','KU-1','Permintaan internal; bukan transaksi rekening nasabah.'],
      ['Kas bergerak keluar dari posisi kas internal','UM-01','Bukti cash out/pergeseran kas keluar sesuai catatan lapangan terbaru.'],
      ['Kas bergerak masuk ke posisi kas internal','UM-02','Bukti cash in/setoran kas sesuai catatan lapangan terbaru.'],
      ['Pemindahbukuan/overbooking internal','UM-06','Gunakan dengan dokumen pendukung dan otorisasi yang sesuai.']
    ]
  );

  addGlossary('K.64GEB00.002.2', [
    ['OPS-01','Slip penarikan teller.','Nasabah menginstruksikan penarikan dana dari rekening.'],
    ['OPS-02','Slip penyetoran tunai.','Nasabah/penyetor menginstruksikan setoran ke rekening.'],
    ['OPS-03','Form transaksi antarbank/kliring/RTGS menurut catatan upload.','Cocokkan caption dan versi form efektif di unit kerja.'],
    ['KU-1','Slip permintaan tambahan kas dari khasanah.','Form internal untuk pengelolaan posisi kas.'],
    ['UM-01','Bukti cash out/pergeseran kas keluar menurut catatan upload terbaru.','Mapping ini menggantikan mapping lama di Learning Module.'],
    ['UM-02','Bukti cash in/setoran kas menurut catatan upload terbaru.','Dipakai untuk mencatat kas masuk/perubahan posisi fisik kas.'],
    ['UM-06','Bukti pemindahbukuan/overbooking internal.','Memerlukan rekening tujuan, dasar transaksi, dan dokumen pendukung yang jelas.']
  ]);

  addCritical('K.64GEB00.002.2', [
    ['OPS bukan UM/KU','OPS berhubungan dengan instruksi/transaksi nasabah, sedangkan KU/UM mengendalikan pergeseran atau pencatatan kas internal.','Decision rule: identifikasi siapa pemilik instruksi dan arah pergerakan dana sebelum memilih form.'],
    ['UM-01 vs UM-02 harus dibaca dari arah kas','Catatan lapangan terbaru menetapkan UM-01 sebagai cash out dan UM-02 sebagai cash in.','Decision rule: jangan hafal tanpa melihat arah fisik kas dan caption form efektif.'],
    ['Form internal tetap butuh dual control','Karena bukan transaksi nasabah bukan berarti kontrol boleh lebih longgar.','Decision rule: jumlah, pihak menyerahkan/menerima, approval, dan posting sistem harus dapat direkonsiliasi.']
  ]);

  appendNote('K.64GEB00.002.2','Mapping UM-01/UM-02 pada V41 diselaraskan dengan catatan lapangan upload 25 Agustus 2026: UM-01 = cash out dan UM-02 = cash in. Gunakan caption/versi form efektif di unit kerja bila terdapat perbedaan nomenklatur.');

  // 3) ADMINISTRASI PERBANKAN
  upsertChapter('K.64GEB00.015.1',
    'Formulir operasional sebagai record dan audit trail',
    'Di administrasi perbankan, fokusnya bukan hanya mengetahui fungsi form tetapi memastikan setiap form menjadi bukti yang autentik, lengkap, dapat ditelusuri, dan mudah ditemukan kembali.',
    [
      ['Keluarga AR','AR-01/AR-02 mendokumentasikan pembukaan rekening; AR-04 mendokumentasikan permintaan penutupan.','Indeks berdasarkan CIF/rekening, tanggal, jenis aktivitas, dan pihak berwenang.'],
      ['Keluarga FR','FR-01 mendokumentasikan penambahan fasilitas pada produk/rekening.','Hubungkan dengan rekening asal, approval, tanggal efektif, dan fasilitas yang diubah.'],
      ['Keluarga SG','SG-01 permohonan Giro, SG-02 referensi, SG-03 perjanjian Giro.','Ketiganya harus dapat ditelusuri sebagai satu rangkaian berkas Giro tanpa menghilangkan fungsi masing-masing.'],
      ['Keluarga OPS','OPS-01/02/03 menjadi dokumen transaksi teller/transfer sesuai aktivitas.','Filing harus memungkinkan rekonstruksi siapa memberi instruksi, nilai, waktu, dan hasil transaksi.'],
      ['KU-1 dan UM','KU-1 serta UM-01/02/06 mendokumentasikan permintaan/pergeseran kas dan pemindahbukuan internal.','Rekonsiliasikan terhadap register kas, posting sistem, pihak serah-terima, dan approval.'],
      ['Version control formulir','Kode form yang sama dapat memiliki versi/revisi berbeda dari waktu ke waktu.','Gunakan form efektif; hindari blanko obsolete dan simpan jejak versi bila prosedur mensyaratkan.'],
      ['Retention dan retrieval','Form bukan selesai ketika transaksi selesai; record harus disimpan sesuai jadwal retensi dan dapat ditemukan kembali.','Kualitas filing diuji saat audit, dispute, investigasi, dan kebutuhan legal.']
    ]
  );

  addCritical('K.64GEB00.015.1', [
    ['Form benar tetapi filing salah tetap berisiko','Dokumen yang tidak terindeks atau tidak dapat ditemukan kehilangan nilai operasional dan evidentiary.','Decision rule: pastikan kode, CIF/rekening, tanggal, jenis aktivitas, dan lokasi penyimpanan dapat ditelusuri.'],
    ['Versi formulir adalah bagian dari kontrol','Blanko lama dapat memuat field atau klausul yang tidak lagi sesuai.','Decision rule: gunakan template/form efektif dan kendalikan obsolete form.']
  ]);

  // 4) ASPEK HUKUM
  upsertChapter('K.64GEB00.017.1',
    'Form pembukaan dan penutupan sebagai bukti hubungan hukum',
    'Tidak semua form memiliki bobot hukum yang sama. Bedakan dokumen permohonan, dokumen pendukung, perjanjian, dan bukti kehendak penutupan.',
    [
      ['SG-01 · Surat Permohonan Giro','Merekam kehendak nasabah untuk mengajukan pembukaan Giro.','Permohonan belum sama dengan persetujuan bank atau lahirnya seluruh hak/kewajiban kontraktual.'],
      ['SG-02 · Lembar Referensi','Dokumen pendukung/referensi dalam proses pembukaan Giro.','Referensi tidak membuktikan kecakapan, kewenangan, beneficial ownership, atau kepatuhan KYC.'],
      ['SG-03 · Perjanjian Pembukaan Giro','Dokumen kontraktual yang memuat klausul serta persetujuan atas persyaratan dan aturan rekening Giro.','Periksa pihak, kewenangan tanda tangan, consent, klausul, dan bukti penerimaan syarat.'],
      ['AR-01 / AR-02','Mendokumentasikan data serta pernyataan pada pembukaan rekening individu/non-individu.','Keabsahan data tidak hanya dari tanda tangan; identitas, legal standing, dan authority tetap harus dibuktikan.'],
      ['AR-04','Mendokumentasikan kehendak untuk menutup rekening.','Hubungan rekening tidak boleh dianggap selesai bila kewajiban, saldo, fasilitas, atau sengketa terkait belum clear.']
    ]
  );

  addCritical('K.64GEB00.017.1', [
    ['Permohonan bukan perjanjian','SG-01 dan SG-03 memiliki fungsi hukum yang berbeda.','Decision rule: identifikasi apakah dokumen hanya menyatakan permohonan atau sudah memuat klausul dan persetujuan kontraktual.'],
    ['Referensi bukan jaminan legal','SG-02 mendukung proses tetapi tidak menggantikan pemeriksaan identitas, kewenangan, KYC, atau legal standing.','Decision rule: jangan menjadikan referensi sebagai satu-satunya dasar pembukaan Giro.']
  ]);

  window.GBPLearningExpert = expert;
  window.GBPLearningDeep = deep;
  window.__GBP_LEARNING_FORMS_VERSION__ = 'V41-form-atlas';
})();
