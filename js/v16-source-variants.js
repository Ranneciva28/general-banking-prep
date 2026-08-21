(() => {
  const bank=window.__GBP_SOURCE_BANK__||window.QUESTION_BANK||[];
  if(!Array.isArray(bank)||!bank.length)return;
  const lowerFirst=s=>{s=String(s||'');return s?s.charAt(0).toLocaleLowerCase('id-ID')+s.slice(1):s};
  const normalize=s=>String(s||'').toLocaleLowerCase('id-ID').replace(/[^a-z0-9à-öø-ÿ]+/giu,' ').replace(/\s+/g,' ').trim();
  const leads={
    1:['Dalam fungsi intermediasi,','Dalam kegiatan bank,','Dalam struktur perbankan,','Dalam peran bank terhadap ekonomi,'],
    2:['Dalam penghimpunan dana,','Pada produk simpanan,','Dalam pengelolaan dana nasabah,','Pada sisi funding bank,'],
    3:['Dalam penyaluran kredit,','Pada proses pembiayaan,','Dalam analisis kredit,','Pada sisi lending bank,'],
    4:['Dalam penerapan regulasi perbankan,','Pada pengawasan industri perbankan,','Dalam kewenangan otoritas,','Pada kepatuhan terhadap regulasi,'],
    5:['Dalam suatu ekosistem bisnis,','Pada hubungan antar pelaku usaha,','Dalam pemetaan ekosistem,','Pada pengelolaan hubungan bisnis,'],
    6:['Dalam perkembangan layanan perbankan,','Pada transformasi perbankan,','Dalam inovasi layanan keuangan,','Pada masa depan industri perbankan,'],
    7:['Saat menyampaikan informasi produk,','Dalam pelayanan informasi kepada nasabah,','Ketika fitur produk dijelaskan,','Saat manfaat produk diterangkan,'],
    8:['Saat memberikan edukasi kepada nasabah,','Dalam edukasi keuangan,','Ketika meningkatkan pemahaman nasabah,','Pada proses edukasi nasabah,'],
    9:['Saat menangani pengaduan nasabah,','Dalam penyelesaian keluhan,','Ketika pengaduan diterima,','Pada tindak lanjut pengaduan,'],
    10:['Saat memproses pembukaan rekening,','Dalam penutupan rekening,','Ketika data rekening diverifikasi,','Pada administrasi rekening nasabah,'],
    11:['Saat memproses transaksi nasabah,','Dalam transaksi tunai dan non tunai,','Ketika instruksi transaksi dijalankan,','Pada proses transaksi keuangan,'],
    12:['Dalam administrasi perbankan,','Saat dokumen administrasi diproses,','Ketika pencatatan operasional dilakukan,','Pada pengelolaan dokumen bank,'],
    13:['Dalam transaksi valuta asing,','Saat layanan valas diproses,','Ketika mata uang asing ditransaksikan,','Pada pengelolaan transaksi valas,'],
    14:['Dalam trade service dan trade finance,','Saat transaksi perdagangan diproses,','Ketika dokumen trade diperiksa,','Pada pembiayaan perdagangan,'],
    15:['Dalam akuntansi perusahaan,','Saat transaksi perusahaan dicatat,','Ketika laporan keuangan disusun,','Pada pencatatan akuntansi perusahaan,'],
    16:['Dalam akuntansi perbankan,','Saat transaksi bank dibukukan,','Ketika laporan keuangan bank disusun,','Pada pencatatan akuntansi bank,'],
    17:['Dalam pengelolaan risiko,','Saat risiko bank dinilai,','Ketika budaya risiko diterapkan,','Pada proses manajemen risiko,'],
    18:['Dalam pencegahan fraud,','Saat indikasi fraud ditemukan,','Ketika strategi anti-fraud diterapkan,','Pada pengendalian risiko fraud,'],
    19:['Dalam business continuity management,','Saat gangguan operasional terjadi,','Ketika kesiapsiagaan kerja diterapkan,','Pada penerapan K3 dan kontinuitas bisnis,'],
    20:['Dalam pelindungan data pribadi,','Saat data nasabah diproses,','Ketika informasi pribadi dikelola,','Pada pengamanan data pribadi,'],
    21:['Dalam penerapan KYC,','Saat identitas nasabah diverifikasi,','Ketika profil nasabah dinilai,','Pada proses mengenali nasabah,'],
    22:['Dalam aspek hukum perbankan,','Saat ketentuan hukum diterapkan,','Ketika dokumen hukum ditelaah,','Pada pengelolaan risiko hukum,'],
    23:['Dalam penerapan three lines of defense,','Pada pembagian fungsi pengendalian,','Saat peran lini pertahanan dijalankan,','Dalam tata kelola pengendalian internal,'],
    24:['Dalam penerapan APU/PPT/PPSPM,','Saat transaksi mencurigakan dianalisis,','Ketika kewajiban APU/PPT dijalankan,','Pada pencegahan pencucian uang,'],
    25:['Dalam situasi operasional tersebut,','Pada kondisi perbankan tersebut,','Dalam keputusan yang harus diambil,','Pada kasus yang sedang dianalisis,'],
    26:['Saat nasabah meminta informasi produk,','Dalam penyampaian informasi produk,','Ketika fitur produk dijelaskan,','Pada saat manfaat produk diterangkan,'],
    27:['Saat melakukan edukasi kepada nasabah,','Dalam kegiatan edukasi keuangan,','Ketika pemahaman produk dijelaskan,','Pada saat memberikan edukasi,'],
    28:['Saat menangani pengaduan nasabah,','Dalam proses penyelesaian pengaduan,','Ketika keluhan nasabah diterima,','Pada saat menindaklanjuti pengaduan,'],
    29:['Saat memproses pembukaan rekening,','Dalam proses penutupan rekening,','Ketika data rekening diproses,','Pada tahap pembukaan atau penutupan rekening,'],
    30:['Saat memproses transaksi nasabah,','Dalam transaksi tunai dan non tunai,','Ketika instruksi transaksi diterima,','Pada tahap pemrosesan transaksi,'],
    31:['Dalam pengelolaan administrasi perbankan,','Saat dokumen administrasi diproses,','Ketika administrasi operasional diperiksa,','Pada proses administrasi perbankan,'],
    32:['Saat memproses transaksi valuta asing,','Dalam layanan transaksi valas,','Ketika transaksi mata uang asing diproses,','Pada proses valuta asing,'],
    33:['Dalam layanan trade service dan trade finance,','Saat dokumen trade diproses,','Ketika transaksi perdagangan internasional diproses,','Pada proses trade finance,'],
    34:['Dalam pencatatan akuntansi,','Saat transaksi dibukukan,','Ketika laporan akuntansi disusun,','Pada proses akuntansi perbankan,'],
    35:['Dalam penanganan aspek hukum perbankan,','Saat dokumen hukum ditelaah,','Ketika ketentuan hukum diterapkan,','Pada proses legal perbankan,']
  };

  const original=[...bank];
  const additions=[];
  const existing=new Set(original.map(q=>normalize(q.question)));
  for(const q of original){
    const mid=Number(q.moduleId),ls=leads[mid];if(!ls?.length)continue;
    for(let i=0;i<ls.length;i++){
      const stem=`${ls[i]} ${lowerFirst(q.question)}`;
      const key=normalize(stem);if(!key||existing.has(key))continue;
      existing.add(key);
      additions.push({...q,id:`${q.id}-UV${i+1}`,question:stem,generatedVariant:true,variantSourceId:q.id});
    }
  }
  bank.push(...additions);
  window.__GBP_SOURCE_BANK__=bank;
})();