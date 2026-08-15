# General Banking Prep — Day 1

Static quiz web app untuk persiapan **General Banking Program — Day 1**. Versi ini didesain ulang dengan UX dashboard modern dan tetap bisa di-host gratis melalui GitHub Pages.

## Fitur

- 6 modul Day 1 dan 72 soal awal
- Dashboard progress, streak, statistik, weakest module
- Practice Mode: feedback + pembahasan langsung
- Exam Mode: feedback ditahan sampai sesi selesai
- Quick Drill 10 soal
- Weakness Drill dari soal yang pernah salah
- Pilihan 10 / 25 / 50 / seluruh soal
- Randomisasi soal dan pilihan jawaban
- Navigator soal + tandai soal
- Bookmark dan catatan per soal
- Review jawaban sesi terakhir
- Statistik akurasi per modul dan riwayat sesi
- Light / Dark mode
- Pencarian modul / soal
- Data tersimpan otomatis di `localStorage`
- Responsive untuk desktop, tablet, dan mobile

## Deploy ke GitHub Pages

1. Buat repository GitHub baru, misalnya `general-banking-prep`.
2. Upload **seluruh isi folder ini** ke root repository.
3. Masuk ke **Settings → Pages**.
4. Pada **Build and deployment**, pilih **Deploy from a branch**.
5. Pilih branch `main`, folder `/ (root)`, lalu **Save**.
6. Tunggu GitHub Pages menerbitkan URL website.

Tidak butuh backend, database, npm, ataupun build command.

## Struktur

```text
index.html
css/style.css
js/questions.js
js/app.js
README.md
```

## Menjalankan lokal

Bisa langsung buka `index.html`, atau jalankan local server:

```bash
python -m http.server 8000
```

Lalu buka `http://localhost:8000`.

## Menambah soal

Tambahkan objek baru pada `js/questions.js` dengan struktur yang sama. Engine quiz akan otomatis membaca modul dan jumlah soal.
