(() => {
  const CODE='K.64GEB00.014.2';
  const SOURCE='2 Produk dan Jasa Perbankan - Dana.pdf · Jenis Letter of Credit';
  const expert=window.GBPLearningExpert||{};
  const deep=window.GBPLearningDeep||{};
  const ex=expert[CODE] ||= {note:'',chapters:[],glossary:[]};
  const dp=deep[CODE] ||= {core:[],flow:[],glossary:[],critical:[],cases:[],questions:[],sources:{}};
  const norm=s=>String(s||'').trim().toLowerCase();
  const upsertChapter=(title,lead,rows)=>{
    ex.chapters=(ex.chapters||[]).filter(ch=>norm(ch?.title)!==norm(title));
    ex.chapters.unshift({title,lead,rows,source:SOURCE});
  };
  const merge=(target,key,rows)=>{
    target[key] ||= [];
    const seen=new Set(target[key].map(r=>norm(r?.[0])));
    for(const row of rows){const k=norm(row?.[0]);if(k&&!seen.has(k)){target[key].push(row);seen.add(k);}}
  };

  upsertChapter(
    'Jenis-jenis Letter of Credit (L/C)',
    'Bedakan jenis L/C berdasarkan sifat komitmen, tambahan jaminan bank, hak transfer, pola pemakaian, dan fasilitas uang muka. Jangan menghafal nama saja; pahami apa yang berubah pada hak beneficiary, kewajiban bank, dan struktur transaksinya.',
    [
      ['Revocable L/C','L/C yang dapat diubah atau dibatalkan sewaktu-waktu tanpa pemberitahuan terlebih dahulu kepada beneficiary.','Kata kunci konseptualnya bukan sekadar “bisa dibatalkan”, tetapi rendahnya kepastian bagi beneficiary karena komitmen dapat berubah tanpa persetujuannya.'],
      ['Irrevocable L/C','L/C yang tidak dapat diubah atau dibatalkan tanpa persetujuan para pihak yang berkepentingan.','Memberikan kepastian lebih kuat kepada beneficiary karena perubahan tidak dapat dilakukan sepihak.'],
      ['Confirmed Irrevocable L/C','Irrevocable L/C yang mendapat tambahan konfirmasi/komitmen dari bank lain selain issuing bank.','Dipakai ketika beneficiary menghendaki tambahan kepastian pembayaran di luar komitmen issuing bank.'],
      ['Transferable L/C','L/C yang memberi hak kepada beneficiary untuk meminta agar seluruh atau sebagian hak atas kredit dialihkan kepada satu atau lebih pihak ketiga.','Relevan ketika beneficiary pertama bertindak sebagai intermediary dan perlu meneruskan hak L/C kepada supplier/second beneficiary.'],
      ['Back-to-Back L/C','L/C kedua yang dibuka dengan menggunakan L/C pertama sebagai dasar dalam transaksi melalui pedagang perantara.','Berbeda dari Transferable L/C: bukan memindahkan hak pada L/C yang sama, melainkan membuat L/C baru yang didukung oleh L/C pertama.'],
      ['Red Clause L/C','L/C dengan klausul yang memungkinkan pembayaran/uang muka kepada beneficiary sebelum pengapalan barang.','Fokus pada fasilitas advance sebelum shipment. Risiko bank meningkat karena dana diberikan sebelum dokumen pengapalan lengkap.'],
      ['Green Ink Clause L/C','Serupa dengan Red Clause karena dapat memberikan uang muka sebelum pengapalan, dengan persyaratan pendukung yang lebih kuat sesuai struktur L/C.','Jangan disamakan mentah dengan Red Clause; keduanya sama-sama advance, tetapi Green Clause biasanya mengaitkan advance dengan bukti penyimpanan/dukungan barang yang lebih ketat.'],
      ['Revolving L/C','L/C yang dipakai untuk rangkaian transaksi yang berlangsung berulang dan teratur menurut waktu dan/atau jumlah.','Cocok untuk hubungan dagang berulang sehingga limit/availability dapat kembali tersedia sesuai mekanisme yang disepakati.'],
      ['Standby L/C','Instrumen jaminan yang “stand by” dan baru ditarik apabila pihak yang dijamin gagal memenuhi kewajibannya.','Secara fungsi lebih dekat ke guarantee daripada alat pembayaran perdagangan rutin: beneficiary melakukan drawing ketika terjadi default sesuai syarat.']
    ]
  );

  upsertChapter(
    'Decision map: membedakan jenis L/C yang sering tertukar',
    'Mulai dari kebutuhan transaksi, bukan dari nama produk. Tanyakan: apakah yang dibutuhkan kepastian komitmen, tambahan bank penjamin, pengalihan ke supplier, L/C kedua, uang muka, transaksi berulang, atau jaminan default?',
    [
      ['Butuh perubahan hanya dengan persetujuan pihak terkait','Irrevocable L/C','Fokusnya adalah ketidakmampuan mengubah/membatalkan secara sepihak.'],
      ['Beneficiary ingin tambahan komitmen dari bank lain','Confirmed Irrevocable L/C','Ada confirmation bank yang menambah undertaking atas L/C irrevocable.'],
      ['Beneficiary pertama ingin meneruskan hak L/C ke supplier','Transferable L/C','Hak pada kredit yang sama dialihkan ke second beneficiary sesuai ketentuan.'],
      ['Trader menerima master L/C lalu perlu membuka L/C lain ke supplier','Back-to-Back L/C','Terjadi dua L/C terpisah: master L/C dan second L/C.'],
      ['Eksportir membutuhkan dana sebelum shipment','Red Clause / Green Ink Clause','Keduanya memberi advance sebelum shipment; bedakan syarat pendukungnya.'],
      ['Pembelian dilakukan berulang tiap periode','Revolving L/C','Availability berulang sesuai waktu/jumlah yang disepakati.'],
      ['Instrumen hanya ditarik jika applicant gagal memenuhi kewajiban','Standby L/C','Fungsi utamanya sebagai fallback guarantee, bukan pembayaran normal setiap shipment.']
    ]
  );

  merge(ex,'glossary',[
    ['Revocable L/C','L/C yang dapat diubah/dibatalkan tanpa pemberitahuan lebih dahulu kepada beneficiary.','Kenali implikasinya terhadap kepastian beneficiary.'],
    ['Irrevocable L/C','L/C yang tidak dapat diubah/dibatalkan tanpa persetujuan pihak berkepentingan.','Merupakan konsep dasar komitmen L/C yang lebih kuat.'],
    ['Confirmed L/C','L/C yang mendapat tambahan undertaking dari confirming bank.','Confirmation menambah sumber risiko bank yang ditanggung beneficiary.'],
    ['Transferable L/C','L/C yang haknya dapat dialihkan dari first beneficiary kepada second beneficiary.','Jangan tertukar dengan back-to-back.'],
    ['Back-to-Back L/C','Second L/C yang dibuka dengan master L/C sebagai dasar.','Ada dua L/C terpisah.'],
    ['Red Clause L/C','L/C yang memungkinkan advance sebelum shipment.','Fokus pada pre-shipment advance.'],
    ['Green Ink Clause L/C','Varian advance L/C dengan dukungan/persyaratan lebih kuat terkait barang.','Mirip Red Clause tetapi tidak identik.'],
    ['Revolving L/C','L/C untuk transaksi berulang secara periodik/berkelanjutan.','Availability kembali tersedia sesuai struktur.'],
    ['Standby L/C','Instrumen jaminan yang ditarik ketika pihak yang dijamin default.','Lebih dekat ke fungsi guarantee daripada payment L/C reguler.']
  ]);

  merge(dp,'critical',[
    ['Transferable ≠ Back-to-Back','Transferable menggunakan satu L/C yang haknya dialihkan; back-to-back menggunakan master L/C untuk mendukung pembukaan second L/C.','Decision rule: tanyakan apakah hak dialihkan pada L/C yang sama atau bank menerbitkan L/C kedua.'],
    ['Confirmed ≠ Advising','Advising bank meneruskan/authenticate L/C, sedangkan confirming bank menambahkan undertaking pembayarannya sendiri.','Decision rule: cari apakah ada tambahan komitmen pembayaran dari bank kedua.'],
    ['Red/Green Clause ≠ pembayaran biasa','Advance diberikan sebelum shipment, sehingga kontrol terhadap underlying dan persyaratan advance menjadi krusial.','Decision rule: cari timing pencairan relatif terhadap shipment.'],
    ['Standby L/C ≠ commercial L/C biasa','Standby umumnya ditarik saat default/non-performance, bukan sebagai mekanisme pembayaran rutin setelah presentasi dokumen perdagangan normal.','Decision rule: cari trigger drawing—performance normal atau default.'],
    ['Revolving ≠ L/C baru setiap shipment','Revolving dirancang agar availability kembali tersedia berdasarkan waktu/jumlah yang disepakati.','Decision rule: cari mekanisme replenishment dalam satu arrangement.']
  ]);

  merge(dp,'cases',[
    ['Trader Indonesia menerima L/C dari buyer luar negeri, tetapi supplier barang adalah perusahaan lain dan trader ingin meneruskan hak atas L/C yang sama.','Transferable L/C lebih tepat bila terms mengizinkan transfer kepada second beneficiary.','Jangan otomatis memilih back-to-back; back-to-back membutuhkan second L/C terpisah.'],
    ['Eksportir ragu pada country/bank risk issuing bank dan meminta bank yang dipercaya menambahkan komitmen pembayaran.','Confirmed Irrevocable L/C.','Kebutuhannya bukan sekadar advising, tetapi additional undertaking.'],
    ['Buyer melakukan pembelian komoditas dengan nominal relatif tetap setiap bulan selama setahun.','Revolving L/C dapat relevan karena transaksi berulang dan teratur.','Nilai manfaatnya ada pada replenishment availability, bukan sekadar tenor panjang.'],
    ['Supplier membutuhkan dana sebelum barang dikapalkan.','Red Clause atau Green Ink Clause, bergantung persyaratan advance dan dokumen pendukung yang disepakati.','Pahami peningkatan risiko akibat pre-shipment financing.'],
    ['Perusahaan hanya membutuhkan instrumen yang dapat dicairkan beneficiary bila kontraktor gagal memenuhi kontrak.','Standby L/C.','Trigger-nya default/non-performance, sehingga fungsinya menyerupai jaminan.']
  ]);

  merge(dp,'questions',[
    ['Apa pembeda substantif Transferable L/C dan Back-to-Back L/C?','Transferable mengalihkan hak pada L/C yang sama, sedangkan Back-to-Back menggunakan L/C pertama sebagai dasar penerbitan L/C kedua.'],
    ['Mengapa confirmed L/C memberi proteksi tambahan bagi beneficiary?','Karena bank lain menambahkan undertaking pembayarannya sendiri di samping komitmen issuing bank.'],
    ['Apa sinyal utama bahwa suatu kebutuhan cocok dengan Revolving L/C?','Adanya transaksi berulang/teratur yang memerlukan availability kembali tersedia menurut waktu atau jumlah tertentu.'],
    ['Kapan Standby L/C pada umumnya ditarik?','Ketika pihak yang dijamin gagal memenuhi kewajiban sesuai syarat standby.'],
    ['Apa kesamaan Red Clause dan Green Ink Clause?','Keduanya memungkinkan advance kepada beneficiary sebelum shipment; perbedaannya terletak pada struktur/persyaratan pendukung advance.']
  ]);

  dp.sources={...(dp.sources||{}),lcTypes:SOURCE};
  if(!String(ex.note||'').includes('jenis L/C')) ex.note=`${ex.note?ex.note+' ':''}Bagian jenis L/C mengikuti materi sumber General Banking yang memuat Revocable, Irrevocable, Confirmed Irrevocable, Transferable, Back-to-Back, Red Clause, Green Ink Clause, Revolving, dan Standby L/C.`;
  window.GBPLearningExpert=expert;
  window.GBPLearningDeep=deep;
  window.__GBP_TRADE_LC_VERSION__='V43-lc-types';
})();