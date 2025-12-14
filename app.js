// Lightweight safe ad placeholder renderer
(function () {
  'use strict';

  const adContainer = document.getElementById('adContainer');
  if (!adContainer) {
    console.warn('adContainer not found — skipping ad rendering.');
    return;
  }

  // Replace the slot values below with your real ad slot ids from AdSense.
  // If you don't have slots yet, leave data-ad-slot empty or remove the attribute.
  const adDefinitions = [
    { id: 'ad-1', client: 'ca-pub-3293304771986381', slot: '' }
    // <-- add your slot id here
  ];

  function createAdNode(def) {
    const wrapper = document.createElement('div');
    wrapper.className = 'ad-wrapper';
    wrapper.id = def.id;

    const ins = document.createElement('ins');
    ins.className = 'adsbygoogle';
    ins.style.display = 'block';
    ins.setAttribute('data-ad-client', def.client);
    if (def.slot) ins.setAttribute('data-ad-slot', def.slot);
    ins.setAttribute('data-ad-format', 'auto');
    ins.setAttribute('data-full-width-responsive', 'true');

    wrapper.appendChild(ins);
    return wrapper;
  }

  adDefinitions.forEach(def => {
    try {
      const node = createAdNode(def);
      adContainer.appendChild(node);

      // Only push if the adsbygoogle library is loaded
      if (window && window.adsbygoogle) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (pushErr) {
          console.warn('adsbygoogle.push failed:', pushErr);
        }
      } else {
        // library not loaded yet — that's okay, AdSense will initialize later
        console.info('adsbygoogle library not available at render time; ad will load when library initializes.');
      }
    } catch (err) {
      console.error('Failed to create ad node for', def.id, err);
    }
  });
})();
