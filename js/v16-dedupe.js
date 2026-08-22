(() => {
  // V26 performs exact, root-level, and near-duplicate checks inside the indexed bank engine.
  // Keep this file as a tiny compatibility marker because existing HTML still references it.
  window.__GBP_DEDUPE_VERSION__='v26-indexed-lite';
})();