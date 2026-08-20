(() => {
  const BANK_SIZE = 5000;
  const LOAD_LIMIT = 50;
  const STATE_KEY = 'generalBankingVirtualBankV6';
  const Q = window.QUESTION_BANK || [];
  const sourceTemplates = Q.map(q => ({...q, options:[...q.options]}));
  const moduleIds = [...new Set(sourceTemplates.map(q => q.moduleId))].sort((a,b)=>a-b);
  const templatesByModule = Object.fromEntries(moduleIds.map(id => [id, sourceTemplates.filter(q => q.moduleId === id)]));

  // BRIDGE tetap hanya di /khusus/ dan tidak pernah muncul/ditautkan di UI utama.
  const bridgeTeaser = document.getElementById('bridgeLockedNav');
  if (bridgeTeaser) bridgeTeaser.remove();

  let bankState = { epoch:{}, seen:{}, loaded:{} };
  try {
    const saved = JSON.parse(localStorage.getItem(STATE_KEY) || 'null');
    if (saved && typeof saved === 'object') bankState = {epoch:saved.epoch||{}, seen:saved.seen||{}, loaded:saved.loaded||{}};
  } catch (e) {}

  const contexts = [
    'Dalam assessment operasional bank, fokuskan jawaban hanya pada fakta yang relevan.',
    'Seorang reviewer meminta keputusan yang paling dapat dipertanggungjawabkan.',
    'Kasus berikut sengaja memuat informasi pengalih perhatian.',
    'Dalam second-check, empat alternatif terlihat masuk akal pada pandangan pertama.',
    'Pada simulasi BRIDGE-style reasoning, jawaban harus dipilih berdasarkan konsep inti.',
    'Tim kontrol melakukan challenge terhadap keputusan awal unit bisnis.',
    'Seorang analis diminta membedakan dua konsep yang sangat berdekatan.',
    'Dalam quality review, hindari memilih opsi hanya karena terdengar paling lengkap.',
    'Anggap fakta yang tidak disebutkan bersifat netral.',
    'Pada evaluasi akhir, hanya satu opsi yang paling presisi secara konsep.',
    'Kasus ini menguji aplikasi konsep, bukan hafalan kata kunci.',
    'Dalam diskusi komite, jawaban harus tetap benar walaupun diuji ulang oleh reviewer.',
    'Perhatikan detail yang mengubah keputusan, bukan panjang pendeknya opsi.',
    'Beberapa opsi benar secara umum, tetapi hanya satu yang paling tepat untuk konteks ini.',
    'Gunakan prinsip utama modul sebelum mempertimbangkan detail sekunder.',
    'Kasus berikut dibuat untuk menguji miskonsepsi yang sering terjadi.',
    'Seorang pejabat bank harus memilih tindakan yang paling defensible.',
    'Dalam review kepatuhan, pilih jawaban yang paling tepat dan paling spesifik.',
    'Jangan mengasumsikan informasi tambahan di luar yang disebutkan.',
    'Bandingkan opsi berdasarkan substansi, bukan gaya bahasa.'
  ];

  const closings = [
    'Pilih jawaban paling tepat.',
    'Manakah keputusan yang paling kuat?',
    'Pilih opsi yang paling konsisten dengan materi.',
    'Manakah kesimpulan yang paling defensible?',
    'Tentukan jawaban yang paling presisi.',
    'Pilih respons yang paling sesuai.',
    'Manakah opsi yang seharusnya diprioritaskan?',
    'Pilih jawaban setelah menyingkirkan distraktor yang tampak meyakinkan.',
    'Tentukan opsi yang tetap benar jika diuji ulang.',
    'Manakah pilihan yang paling sesuai dengan prinsip modul?'
  ];

  function hash(n) {
    let x = n >>> 0;
    x ^= x << 13; x ^= x >>> 17; x ^= x << 5;
    return x >>> 0;
  }

  function saveBankState(){
    try { localStorage.setItem(STATE_KEY, JSON.stringify(bankState)); } catch (e) {}
  }

  function epochFor(moduleId){ return Number(bankState.epoch[moduleId] || 1); }
  function seenSet(moduleId){ return new Set((bankState.seen[moduleId] || []).map(Number)); }

  function buildQuestion(moduleId, slot, epoch = epochFor(moduleId)) {
    const templates = templatesByModule[moduleId] || [];
    if (!templates.length) return null;
    const seed = hash((moduleId * 1000003) ^ (slot * 9176) ^ (epoch * 7919));
    const base = templates[seed % templates.length];
    const context = contexts[(seed >>> 3) % contexts.length];
    const closing = closings[(seed >>> 9) % closings.length];
    const caseNo = 1000 + ((seed + slot * 37) % 9000);
    return {
      ...base,
      id: `VB-M${moduleId}-E${epoch}-S${slot}`,
      question: `${context} [Case ${caseNo}] ${base.question} ${closing}`,
      options: [...base.options],
      source: `${base.source} · Virtual Bank ${slot}/${BANK_SIZE}`,
      generated: true,
      bankSlot: slot,
      bankEpoch: epoch,
      baseId: base.id,
      skill: base.skill || 'Generated Variant'
    };
  }

  function unseenSlots(moduleId) {
    const seen = seenSet(moduleId);
    const slots = [];
    for (let i=1;i<=BANK_SIZE;i++) if (!seen.has(i)) slots.push(i);
    return slots;
  }

  function chooseSlots(moduleId, forceNew=false) {
    let candidates = unseenSlots(moduleId);
    if (candidates.length < LOAD_LIMIT) {
      bankState.epoch[moduleId] = epochFor(moduleId) + 1;
      bankState.seen[moduleId] = [];
      candidates = Array.from({length:BANK_SIZE},(_,i)=>i+1);
    }

    const current = Array.isArray(bankState.loaded[moduleId]) ? bankState.loaded[moduleId].map(Number) : [];
    if (!forceNew && current.length === LOAD_LIMIT && current.every(x => candidates.includes(x))) return current;

    const picked = [];
    const pool = [...candidates];
    while (picked.length < LOAD_LIMIT && pool.length) {
      const idx = Math.floor(Math.random() * pool.length);
      picked.push(pool.splice(idx,1)[0]);
    }
    bankState.loaded[moduleId] = picked;
    saveBankState();
    return picked;
  }

  function rebuildActiveBank(moduleId=null, forceNew=false) {
    const ids = moduleId == null ? moduleIds : [moduleId];
    const replacements = new Map();
    ids.forEach(id => {
      const slots = chooseSlots(id, forceNew);
      replacements.set(id, slots.map(slot => buildQuestion(id, slot)).filter(Boolean));
    });

    if (moduleId == null) {
      Q.splice(0, Q.length, ...moduleIds.flatMap(id => replacements.get(id) || []));
    } else {
      const keep = Q.filter(q => q.moduleId !== moduleId);
      Q.splice(0, Q.length, ...keep, ...(replacements.get(moduleId) || []));
      Q.sort((a,b)=>a.moduleId-b.moduleId || String(a.id).localeCompare(String(b.id)));
    }
    rebuildTextIndex();
  }

  let textToQuestion = new Map();
  function rebuildTextIndex(){ textToQuestion = new Map(Q.map(q => [q.question, q])); }

  function markSeenByQuestionText(text) {
    const q = textToQuestion.get(text);
    if (!q || !q.generated || !q.bankSlot) return;
    const id = q.moduleId;
    const set = seenSet(id);
    if (set.has(Number(q.bankSlot))) return;
    set.add(Number(q.bankSlot));
    bankState.seen[id] = [...set];
    saveBankState();
  }

  // Hanya 50 soal aktif per modul; 5.000 slot tersedia secara virtual per modul.
  rebuildActiveBank(null, false);

  function toast(msg) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.remove('hidden');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => el.classList.add('hidden'), 2600);
  }

  function generateModule(moduleId) {
    rebuildActiveBank(moduleId, true);
    injectControls();
    const seen = seenSet(moduleId).size;
    toast(`50 soal baru dimuat dari bank 5.000 soal modul ini. ${seen} soal sudah pernah muncul dan tidak akan dipilih lagi.`);
  }

  function addGenerateToDashboard(card) {
    const start = card.querySelector('[data-module-start]');
    if (!start) return;
    const moduleId = Number(start.dataset.moduleStart);
    let actions = card.querySelector('.module-card-actions');
    if (!actions) {
      actions = document.createElement('div');
      actions.className = 'module-card-actions';
      start.parentNode.insertBefore(actions,start);
      actions.appendChild(start);
    }
    if (!actions.querySelector('.module-generate')) {
      const btn = document.createElement('button');
      btn.className = 'module-generate';
      btn.type = 'button';
      btn.textContent = '＋ Generate New Questions';
      btn.addEventListener('click', e => { e.stopPropagation(); generateModule(moduleId); });
      actions.appendChild(btn);
    }
    const p = card.querySelector('p');
    if (p) p.textContent = `50 loaded · Bank 5.000 soal`;
  }

  function addGenerateInsideSetup(card) {
    const moduleId = Number(card.dataset.module);
    if (!moduleId || card.querySelector('.setup-generate-inline')) return;
    const control = document.createElement('span');
    control.className = 'setup-generate-inline';
    control.setAttribute('role','button');
    control.setAttribute('tabindex','0');
    control.textContent = '＋ Generate New Questions';
    const run = e => { e.preventDefault(); e.stopPropagation(); generateModule(moduleId); };
    control.addEventListener('click',run);
    control.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ run(e); } });
    card.appendChild(control);
    const small = card.querySelector('small');
    if (small) small.textContent = `${LOAD_LIMIT} loaded · Bank 5.000 soal · ${small.textContent.split('·').pop().trim()}`;
  }

  function cleanUi() {
    ['practiceQuick','examQuick','quickDrillBtn'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
    const quick = document.querySelector('.quick-actions');
    if (quick) quick.classList.add('weakness-only');
    const section = quick?.closest('.section-block');
    const heading = section?.querySelector('.section-title-row h2');
    if (heading) heading.textContent = 'Weakness Drill';
    document.querySelectorAll('.profile-chip').forEach(el => el.style.display='none');
  }

  function injectControls() {
    document.querySelectorAll('.module-display-card').forEach(addGenerateToDashboard);
    document.querySelectorAll('.setup-module-card').forEach(addGenerateInsideSetup);
    cleanUi();
  }

  document.addEventListener('DOMContentLoaded', () => {
    // App utama memasang event handler dulu; cleanup dilakukan di task berikutnya agar tidak memutus inisialisasi.
    setTimeout(() => {
      injectControls();

      const dashboardGrid = document.getElementById('dashboardModuleGrid');
      const setupGrid = document.getElementById('moduleGrid');
      [dashboardGrid,setupGrid].filter(Boolean).forEach(grid => {
        const observer = new MutationObserver(() => {
          observer.disconnect();
          injectControls();
          observer.observe(grid,{childList:true});
        });
        observer.observe(grid,{childList:true});
      });

      const questionText = document.getElementById('questionText');
      if (questionText) {
        const seenObserver = new MutationObserver(() => markSeenByQuestionText(questionText.textContent.trim()));
        seenObserver.observe(questionText,{childList:true,subtree:true,characterData:true});
        markSeenByQuestionText(questionText.textContent.trim());
      }
    },0);
  });
})();
