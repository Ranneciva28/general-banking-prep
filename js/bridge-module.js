(() => {
  const bank = window.QUESTION_BANK || [];
  if (!Array.isArray(bank) || !bank.length) return;
  if (bank.some(q => Number(q.moduleId) === 25)) {
    window.__GBP_SOURCE_BANK__ = bank.map(q => ({...q, options:Array.isArray(q.options)?[...q.options]:q.options}));
    return;
  }

  const SOURCE = 'Full General Banking!!!.pdf';
  const MODULE_ID = 25;
  const MODULE_NAME = 'BRIDGE Modules';
  const DAY = 5;

  // BRIDGE Modules is a consolidated module. The existing General Banking cores
  // are remapped into one module, then supplemented with facts explicitly covered
  // in the Full General Banking material.
  const consolidated = bank
    .filter(q => Number(q.moduleId) >= 1 && Number(q.moduleId) <= 24)
    .map((q, i) => ({
      ...q,
      id: `BRIDGE-CORE-${String(i + 1).padStart(3, '0')}-${q.id}`,
      moduleId: MODULE_ID,
      moduleName: MODULE_NAME,
      day: DAY,
      source: `${SOURCE} · Konsolidasi ${q.moduleName}`,
      bridgeCore: true
    }));

  const extra = [
    {
      id:'BRIDGE-FGB-001', question:'Menurut UU No. 10 Tahun 1998, kegiatan utama bank adalah:',
      options:['Menghimpun simpanan dan menyalurkannya dalam bentuk kredit atau bentuk lain','Hanya menghimpun deposito berjangka','Hanya menyalurkan pembiayaan investasi','Mengelola seluruh transaksi pasar modal'],
      answer:'Menghimpun simpanan dan menyalurkannya dalam bentuk kredit atau bentuk lain',
      explanation:'Materi mendefinisikan bank sebagai badan usaha yang menghimpun dana masyarakat dalam bentuk simpanan dan menyalurkannya kembali dalam bentuk kredit dan/atau bentuk lainnya.',
      source:`${SOURCE} · hal. 27`, difficulty:'Sedang'
    },
    {
      id:'BRIDGE-FGB-002', question:'Fungsi khusus bank yang menekankan dasar kepercayaan dari dan kepada masyarakat adalah:',
      options:['Agent of Trust','Agent of Development','Agent of Services','Financial Market Maker'],
      answer:'Agent of Trust', explanation:'Agent of Trust menempatkan kepercayaan sebagai landasan hubungan bank dan masyarakat.',
      source:`${SOURCE} · hal. 29`, difficulty:'Sedang'
    },
    {
      id:'BRIDGE-FGB-003', question:'Dalam fungsi financial intermediary, unit surplus dihubungkan dengan:',
      options:['Unit defisit','Regulator','Pemegang saham bank','Auditor eksternal'],
      answer:'Unit defisit', explanation:'Perantara keuangan menghubungkan pihak yang kelebihan dana dengan pihak yang membutuhkan dana.',
      source:`${SOURCE} · hal. 30–31`, difficulty:'Sedang'
    },
    {
      id:'BRIDGE-FGB-004', question:'Kegiatan berikut yang tidak dilakukan BPR menurut materi adalah:',
      options:['Memberikan jasa dalam lalu lintas pembayaran','Menghimpun tabungan','Menghimpun deposito berjangka','Memberikan kredit'],
      answer:'Memberikan jasa dalam lalu lintas pembayaran', explanation:'Materi menegaskan BPR tidak memberikan jasa dalam lalu lintas pembayaran.',
      source:`${SOURCE} · hal. 42`, difficulty:'Sedang'
    },
    {
      id:'BRIDGE-FGB-005', question:'Perbedaan dasar bank konvensional dan bank syariah dalam materi adalah:',
      options:['Konvensional menggunakan bunga, syariah menggunakan prinsip syariah seperti bagi hasil atau murabahah','Konvensional hanya melayani korporasi, syariah hanya ritel','Konvensional tidak memiliki simpanan, syariah memiliki simpanan','Syariah tidak melakukan pembiayaan'],
      answer:'Konvensional menggunakan bunga, syariah menggunakan prinsip syariah seperti bagi hasil atau murabahah',
      explanation:'Materi membedakan sistem bunga pada bank konvensional dengan mekanisme berbasis prinsip syariah.',
      source:`${SOURCE} · hal. 44–46`, difficulty:'Sedang'
    },
    {
      id:'BRIDGE-FGB-006', question:'Tiga kelompok utama produk dan jasa bank pada materi adalah:',
      options:['Funding, lending, dan transaksi','Funding, audit, dan legal','Lending, pajak, dan treasury','Transaksi, procurement, dan SDM'],
      answer:'Funding, lending, dan transaksi', explanation:'Materi mengelompokkan produk bank menjadi funding, lending, dan transaksi.',
      source:`${SOURCE} · hal. 53`, difficulty:'Sedang'
    },
    {
      id:'BRIDGE-FGB-007', question:'Peningkatan NPL paling langsung berkaitan dengan sumber kerugian pada:',
      options:['Kualitas kredit','Promosi produk','Pengadaan aset tetap','Pengembangan jaringan kantor'],
      answer:'Kualitas kredit', explanation:'Peningkatan NPL tercantum sebagai salah satu sumber kerugian bank dan berkaitan dengan memburuknya kualitas kredit.',
      source:`${SOURCE} · hal. 55`, difficulty:'Sedang-Sulit'
    },
    {
      id:'BRIDGE-FGB-008', question:'Fungsi yang berhubungan langsung dengan nasabah seperti Teller, Customer Service, dan Sales/Marketing disebut:',
      options:['Front Office','Back Office','Internal Audit','Supporting Unit'],
      answer:'Front Office', explanation:'Front Office berinteraksi langsung dengan nasabah dan membentuk pengalaman layanan.',
      source:`${SOURCE} · hal. 66–67`, difficulty:'Sedang'
    },
    {
      id:'BRIDGE-FGB-009', question:'Rekonsiliasi dan settlement pada contoh pembagian fungsi operasional termasuk aktivitas:',
      options:['Back Office','Front Office','Marketing','Corporate Secretary'],
      answer:'Back Office', explanation:'Materi menempatkan rekonsiliasi dan settlement sebagai contoh aktivitas Back Office.',
      source:`${SOURCE} · hal. 68`, difficulty:'Sedang'
    },
    {
      id:'BRIDGE-FGB-010', question:'Fungsi cabang yang mencakup cross-selling dan up-selling adalah:',
      options:['Fungsi akuisisi','Fungsi transaksi','Fungsi edukasi','Fungsi pengawasan'],
      answer:'Fungsi akuisisi', explanation:'Promosi, penawaran produk, cross-selling, dan up-selling dikelompokkan dalam fungsi akuisisi cabang.',
      source:`${SOURCE} · hal. 69`, difficulty:'Sedang'
    },
    {
      id:'BRIDGE-FGB-011', question:'Dalam materi, cabang disebut sebagai sumber data dan pemahaman pasar lokal karena:',
      options:['Memiliki akses langsung terhadap dinamika sosial-ekonomi wilayah','Menetapkan seluruh regulasi industri','Menentukan kebijakan moneter','Menerbitkan standar akuntansi'],
      answer:'Memiliki akses langsung terhadap dinamika sosial-ekonomi wilayah',
      explanation:'Kedekatan cabang dengan wilayah membuatnya mampu membaca segmentasi, kebutuhan, perilaku, dan potensi mitra lokal.',
      source:`${SOURCE} · hal. 70`, difficulty:'Sedang-Sulit'
    },
    {
      id:'BRIDGE-FGB-012', question:'Lembaga yang mengatur dan mengawasi kegiatan sektor jasa keuangan secara terintegrasi adalah:',
      options:['OJK','LPS','Kementerian Perdagangan','Bursa Efek'],
      answer:'OJK', explanation:'Materi menjelaskan OJK menyelenggarakan pengaturan dan pengawasan terintegrasi atas sektor jasa keuangan.',
      source:`${SOURCE} · hal. 89`, difficulty:'Sedang'
    },
    {
      id:'BRIDGE-FGB-013', question:'Fungsi utama LPS yang disebut dalam materi adalah:',
      options:['Menjamin simpanan nasabah penyimpan dan turut memelihara stabilitas sistem perbankan','Menentukan suku bunga kredit setiap bank','Mengatur seluruh perdagangan efek','Mengelola rekening giro pemerintah'],
      answer:'Menjamin simpanan nasabah penyimpan dan turut memelihara stabilitas sistem perbankan',
      explanation:'Materi menegaskan fungsi penjaminan simpanan dan peran LPS dalam stabilitas sistem perbankan.',
      source:`${SOURCE} · hal. 89`, difficulty:'Sedang'
    },
    {
      id:'BRIDGE-FGB-014', question:'Business ecosystem dalam perbankan menekankan:',
      options:['Kolaborasi pelaku yang saling terhubung untuk menciptakan nilai bersama','Pemisahan total bank dari fintech','Penghapusan seluruh layanan pihak ketiga','Pembatasan transaksi hanya di kantor cabang'],
      answer:'Kolaborasi pelaku yang saling terhubung untuk menciptakan nilai bersama',
      explanation:'Ekosistem bisnis dijelaskan sebagai jaringan kolaboratif bank, fintech, perusahaan, pemerintah, UMKM, startup, konsumen, dan penyedia teknologi.',
      source:`${SOURCE} · hal. 90`, difficulty:'Sedang'
    },
    {
      id:'BRIDGE-FGB-015', question:'Peran bank sebagai trusted data custodian berarti bank:',
      options:['Dipercaya menyimpan data dan transaksi nasabah','Menjadi satu-satunya penyedia internet','Menggantikan fungsi regulator','Menjadi pemilik seluruh fintech'],
      answer:'Dipercaya menyimpan data dan transaksi nasabah',
      explanation:'Trusted Data Custodian merupakan salah satu peran bank dalam ekosistem.',
      source:`${SOURCE} · hal. 92`, difficulty:'Sedang'
    },
    {
      id:'BRIDGE-FGB-016', question:'Open Banking menggunakan API untuk:',
      options:['Membuka data atau layanan keuangan kepada pihak ketiga tepercaya dengan persetujuan nasabah','Menghapus proses persetujuan nasabah','Menutup integrasi bank dengan fintech','Menggantikan seluruh core banking'],
      answer:'Membuka data atau layanan keuangan kepada pihak ketiga tepercaya dengan persetujuan nasabah',
      explanation:'Materi mendefinisikan Open Banking sebagai pembukaan data/layanan melalui API kepada pihak ketiga tepercaya dengan persetujuan nasabah.',
      source:`${SOURCE} · hal. 95–96`, difficulty:'Sedang-Sulit'
    },
    {
      id:'BRIDGE-FGB-017', question:'Contoh dampak positif business ecosystem bagi bank adalah:',
      options:['Peningkatan fee-based income','Ketergantungan lebih tinggi pada partner','Tekanan margin','Risiko keamanan data'],
      answer:'Peningkatan fee-based income', explanation:'Materi memisahkan peningkatan fee-based income sebagai dampak positif, sedangkan tiga opsi lain termasuk tantangan/dampak negatif.',
      source:`${SOURCE} · hal. 91`, difficulty:'Sedang'
    },
    {
      id:'BRIDGE-FGB-018', question:'Pada transformasi digital perbankan, era 2018–2022 dalam materi ditandai oleh:',
      options:['Bank digital full online, Open Banking API, Big Data, AI, dan chatbot','Hanya penggunaan mesin ketik','Kembali ke transaksi manual','Penghapusan layanan mobile'],
      answer:'Bank digital full online, Open Banking API, Big Data, AI, dan chatbot',
      explanation:'Tahap Bank Digital & Open Banking memuat bank digital, Open Banking API, Big Data & AI, serta chatbot/virtual assistant.',
      source:`${SOURCE} · hal. 108`, difficulty:'Sedang'
    },
    {
      id:'BRIDGE-FGB-019', question:'Salah satu pendorong transformasi digital yang berasal dari perubahan perilaku nasabah adalah:',
      options:['Mobile-first dan cashless society','Standar emas','Pembatasan ATM','Penghapusan e-commerce'],
      answer:'Mobile-first dan cashless society', explanation:'Materi mencantumkan perilaku nasabah mobile-first dan cashless society sebagai pendorong transformasi digital.',
      source:`${SOURCE} · hal. 111`, difficulty:'Sedang'
    },
    {
      id:'BRIDGE-FGB-020', question:'Omni-channel berbeda dari sekadar multi-channel karena:',
      options:['Berbagai kanal terintegrasi dalam pengalaman yang berpusat pada nasabah','Setiap kanal berdiri sendiri tanpa integrasi','Hanya menggunakan satu kanal digital','Tidak menggunakan data nasabah'],
      answer:'Berbagai kanal terintegrasi dalam pengalaman yang berpusat pada nasabah',
      explanation:'Materi menjelaskan omni-channel sebagai layanan melalui banyak saluran yang terintegrasi dengan pendekatan customer-centric.',
      source:`${SOURCE} · hal. 115`, difficulty:'Sedang-Sulit'
    },
    {
      id:'BRIDGE-FGB-021', question:'Tujuan GCG yang disebut dalam materi antara lain:',
      options:['Mengoptimalkan nilai perusahaan dan mendukung pertumbuhan berkelanjutan','Menghilangkan seluruh fungsi pengawasan','Mengutamakan hasil jangka pendek tanpa mempertimbangkan pemangku kepentingan','Menghapus akuntabilitas manajemen'],
      answer:'Mengoptimalkan nilai perusahaan dan mendukung pertumbuhan berkelanjutan',
      explanation:'Materi GCG menekankan nilai perusahaan, kinerja, citra, daya saing, nilai jangka panjang, serta keberlanjutan.',
      source:`${SOURCE} · bagian Good Corporate Governance`, difficulty:'Sedang-Sulit'
    },
    {
      id:'BRIDGE-FGB-022', question:'Empat bagian Strategi Anti Fraud dalam materi adalah:',
      options:['Pencegahan; deteksi; investigasi, pelaporan & sanksi; pemantauan, evaluasi & tindak lanjut','Kredit; funding; treasury; pemasaran','Perencanaan; penjualan; akuisisi; promosi','Audit; pajak; investasi; procurement'],
      answer:'Pencegahan; deteksi; investigasi, pelaporan & sanksi; pemantauan, evaluasi & tindak lanjut',
      explanation:'Materi Strategi Anti Fraud membaginya ke empat bagian tersebut.',
      source:`${SOURCE} · bagian Strategi Anti Fraud`, difficulty:'Sedang-Sulit'
    },
    {
      id:'BRIDGE-FGB-023', question:'Administrasi perbankan dalam materi berfokus pada pengelolaan:',
      options:['Dokumen, transaksi, dan data keuangan secara sistematis','Hanya promosi produk','Hanya pengadaan gedung','Hanya penjualan kartu'],
      answer:'Dokumen, transaksi, dan data keuangan secara sistematis',
      explanation:'Konsep dasar administrasi perbankan adalah pengelolaan dokumen, transaksi, dan data keuangan untuk memastikan operasional akurat, aman, dan sesuai regulasi.',
      source:`${SOURCE} · bagian Administrasi Perbankan`, difficulty:'Sedang'
    },
    {
      id:'BRIDGE-FGB-024', question:'Transfer merupakan jasa bank untuk:',
      options:['Memindahkan sejumlah dana sesuai perintah pemberi amanat kepada penerima yang ditunjuk','Mengubah seluruh simpanan menjadi deposito','Menilai kualitas kredit','Menerbitkan laporan audit'],
      answer:'Memindahkan sejumlah dana sesuai perintah pemberi amanat kepada penerima yang ditunjuk',
      explanation:'Materi mendefinisikan transfer sebagai pemindahan dana sesuai perintah pemberi amanat untuk penerima transfer.',
      source:`${SOURCE} · bagian Jasa & Layanan Perbankan`, difficulty:'Sedang'
    }
  ].map(q => ({...q, moduleId:MODULE_ID, moduleName:MODULE_NAME, day:DAY, skill:'BRIDGE Consolidated'}));

  bank.push(...consolidated, ...extra);
  window.__GBP_SOURCE_BANK__ = bank.map(q => ({...q, options:Array.isArray(q.options)?[...q.options]:q.options}));
})();