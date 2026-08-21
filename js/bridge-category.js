(() => {
  const bank = window.QUESTION_BANK || [];
  if (!Array.isArray(bank)) return;
  bank.forEach(q => {
    if (Number(q.moduleId) === 25) {
      q.moduleName = 'BRIDGE Module';
      q.day = 7;
      q.category = 'BRIDGE Module';
    }
  });
  window.__GBP_SOURCE_BANK__ = bank.map(q => ({...q, options:Array.isArray(q.options)?[...q.options]:q.options}));
})();
