(() => {
  const KEY = 'generalBankingGeneratedV5';
  const BASE = window.QUESTION_BANK || [];

  // BRIDGE tetap private di /khusus/ dan tidak ditampilkan/ditautkan dari UI utama.
  const bridgeTeaser = document.getElementById('bridgeLockedNav');
  if (bridgeTeaser) bridgeTeaser.remove();

  const baseIds = new Set(BASE.map(q => q.id));
  let generated = [];

  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || '[]');
    if (Array.isArray(saved)) generated = saved.filter(q => q && q.id && !baseIds.has(q.id));
  } catch (e) {}

  BASE.push(...generated);

  const frames = [
    ['Dalam simulasi assessment, abaikan detail yang tidak relevan dan tentukan keputusan paling tepat.', 'Pilih jawaban paling defensible berdasarkan konsep modul.'],
    ['Seorang pejabat bank melakukan second-check atas kasus berikut.', 'Tentukan respons paling tepat, bukan sekadar yang terdengar paling aman.'],
    ['Dalam rapat evaluasi, empat alternatif diperdebatkan dan hanya satu paling konsisten dengan prinsip yang berlaku.', 'Pilih alternatif terbaik.'],
    ['Kasus ini memuat beberapa informasi pengalih perhatian. Fokus pada inti masalah.', 'Manakah pilihan paling tepat?'],
    ['Pada BRIDGE-style reasoning, peserta harus membedakan konsep yang sangat mirip.', 'Pilih jawaban yang paling presisi.'],
    ['Dalam quality review, jawaban tidak boleh dipilih hanya karena paling panjang atau komprehensif.', 'Gunakan konsep inti untuk memilih jawaban.'],
    ['Kasus berikut menguji pemahaman substansi, bukan hafalan kata kunci.', 'Pilih opsi yang paling sesuai dengan prinsip modul.'],
    ['Anggap fakta yang tidak disebutkan bersifat netral dan evaluasi hanya informasi yang tersedia.', 'Apa keputusan paling tepat?'],
    ['Beberapa opsi terlihat sama-sama masuk akal pada pandangan pertama.', 'Pilih satu yang paling tepat setelah membedakan detailnya.'],
    ['Tim kontrol sedang melakukan challenge terhadap keputusan awal unit bisnis.', 'Manakah kesimpulan yang paling kuat?'],
    ['Jawaban harus dapat dipertanggungjawabkan apabila diuji kembali oleh reviewer.', 'Pilih jawaban terbaik.'],
    ['Distractor berasal dari konsep yang berdekatan.', 'Identifikasi jawaban yang paling tepat.']
  ];

  const shuffle = arr => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const rank = q => q.difficulty === 'Expert' ? 5 : q.difficulty === 'Challenge' ? 4 : String(q.difficulty).includes('Sulit') ? 3 : 2;
  const countFor = moduleId => generated.filter(q => q.moduleId === moduleId).length;

  function make(base, moduleId, i) {
    const frame = frames[Math.floor(Math.random() * frames.length)];
    const nonce = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    return {
      ...base,
      id: `GEN-M${moduleId}-${nonce}-${i}`,
      question: `${frame[0]} ${base.question} ${frame[1]}`,
      options: [...base.options],
      source: `${base.source} · Generated variant`,
      difficulty: rank(base) >= 4 ? base.difficulty : 'Sulit',
      skill: 'Generated Variant',
      generated: true,
      baseId: base.id
    };
  }

  function toast(msg) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.remove('hidden');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => el.classList.add('hidden'), 2400);
  }

  function inject() {
    document.querySelectorAll('.module-display-card').forEach(card => {
      const start = card.querySelector('[data-module-start]');
      if (!start) return;
      const moduleId = Number(start.dataset.moduleStart);

      let actions = card.querySelector('.module-card-actions');
      if (!actions) {
        actions = document.createElement('div');
        actions.className = 'module-card-actions';
        start.parentNode.insertBefore(actions, start);
        actions.appendChild(start);
      }

      let btn = actions.querySelector('.module-generate');
      if (!btn) {
        btn = document.createElement('button');
        btn.className = 'module-generate';
        btn.type = 'button';
        btn.textContent = '＋ Generate new questions';
        btn.addEventListener('click', e => {
          e.stopPropagation();
          generate(moduleId);
        });
        actions.appendChild(btn);
      }

      const generatedCount = countFor(moduleId);
      const top = card.querySelector('.module-card-top');
      if (top) {
        let badge = top.querySelector('.generated-badge');
        if (generatedCount > 0 && !badge) {
          badge = document.createElement('span');
          badge.className = 'generated-badge';
          top.appendChild(badge);
        }
        if (badge) {
          const next = `+${generatedCount} generated`;
          if (badge.textContent !== next) badge.textContent = next;
        }
      }

      const p = card.querySelector('p');
      if (p) {
        const total = BASE.filter(q => q.moduleId === moduleId).length;
        const next = p.textContent.replace(/^\d+ Soal/, `${total} Soal`);
        if (p.textContent !== next) p.textContent = next;
      }
    });
  }

  function generate(moduleId, amount = 12) {
    const current = countFor(moduleId);
    const limit = 180;
    if (current >= limit) return toast(`Batas ${limit} soal generated untuk modul ini sudah tercapai.`);

    const n = Math.min(amount, limit - current);
    const pool = BASE.filter(q => q.moduleId === moduleId && !q.generated).sort((a, b) => rank(b) - rank(a));
    if (!pool.length) return toast('Bank soal dasar modul tidak ditemukan.');

    const topPool = pool.slice(0, Math.max(6, Math.ceil(pool.length * 0.65)));
    const additions = [];
    for (let i = 0; i < n; i++) additions.push(make(topPool[i % topPool.length] || pool[i % pool.length], moduleId, current + i + 1));

    BASE.push(...additions);
    generated.push(...shuffle(additions));
    localStorage.setItem(KEY, JSON.stringify(generated));
    inject();
    toast(`${n} soal baru ditambahkan. Total generated modul ini: ${countFor(moduleId)}.`);
  }

  document.addEventListener('DOMContentLoaded', () => {
    inject();
    const grid = document.getElementById('dashboardModuleGrid');
    if (grid) {
      const observer = new MutationObserver(() => {
        observer.disconnect();
        inject();
        observer.observe(grid, { childList: true });
      });
      observer.observe(grid, { childList: true });
    }
  });
})();
