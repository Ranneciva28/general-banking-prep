# General Banking Prep — Learning Module Edition

Static quiz web app untuk persiapan **General Banking Program Day 1–5**. Dibuat untuk GitHub Pages tanpa backend, npm, atau build step.

## Isi V3

- **5 hari** pembelajaran General Banking
- **24 modul**
- **432 soal** total, masing-masing modul 18 soal
- 72 soal berlabel **Expert** + bank soal Sulit/Challenge
- Day 1 direwrite agar distractor lebih masuk akal dan tidak mudah ditebak dari pola bahasa
- Opsi jawaban diaudit agar posisi A/B/C/D tersebar dan panjang jawaban benar tidak menjadi shortcut
- Quick Drill & Exam Simulation menggunakan **hard-biased sampling**: porsi Expert + Challenge lebih tinggi
- Pembahasan + sumber modul/halaman pada setiap soal

### Pembagian bank soal

- Day 1: 108 soal — Fundamental General Banking
- Day 2: 90 soal — Customer Service & Operational Transaction
- Day 3: 90 soal — Administration, FX, Trade & Accounting
- Day 4: 108 soal — Risk, Fraud, BCM/K3, PDP, KYC & Legal
- Day 5: 36 soal — Three Lines of Defense & APU/PPT/PPSPM

## Fitur

- Dashboard 5-Day dengan tab per hari
- Learning Module berisi 10 unit kompetensi sertifikasi General Banking Level 4
- Halaman detail per unit: glossary, checklist penguasaan, titik kritis, prediksi pertanyaan, dan sumber halaman PDF
- Pencarian materi lintas unit kompetensi
- Practice Mode dan Exam Mode
- Hard-biased Quick Drill 10 soal
- Weakness Drill berdasarkan soal yang pernah salah
- Pilihan jumlah 10 / 25 / 50 / seluruh soal
- Randomisasi soal dan pilihan jawaban
- Navigator soal, tandai soal, bookmark, dan catatan
- Review jawaban + pembahasan
- Statistik per modul dan riwayat sesi
- Search
- Light / Dark mode
- Progress disimpan di `localStorage`
- Responsive desktop/tablet/mobile

## Update website GitHub Pages yang sudah live

Replace isi repository dengan file/folder dari paket ini, lalu commit ke branch yang dipakai GitHub Pages. Untuk update Learning Module, file baru utamanya adalah:

```text
index.html
css/style.css
css/learning-module.css
js/questions.js
js/app.js
js/learning-module.js
version.json
README.md
```

GitHub Pages akan melakukan deploy ulang setelah commit.

## Struktur

```text
index.html
css/
  style.css
  learning-module.css
js/
  app.js
  questions.js
  learning-module.js
README.md
```
