// AdSense Publisher ID
const ADSENSE_CLIENT = "ca-pub-3293304771986381";

// New Format Definitions
const networksConfig = {
  google: {
    name: 'Google AdSense',
    formats: {
      'Display Banner': { height: 100, format: 'display' },
      'In-Feed Ads': { height: 290, format: 'in-feed' },
      'In-Article Ads': { height: 260, format: 'in-article' },
      'Multiplex Ads': { height: 310, format: 'multiplex' },
      'Anchor Ads': { height: 100, format: 'anchor' },
      'Vignette Ads': { height: 325, format: 'vignette' },
      'Responsive Display Ads': { height: 290, format: 'responsive' }
    }
  },
  ezoic: {
    name: 'Ezoic',
    formats: {
      'Display Ads': { height: 290 },
      'Native Ads': { height: 260 },
      'Video Ads': { height: 325 },
      'Anchor Ads': { height: 100 },
      'Sticky Sidebar Ads': { height: 610 },
      'Vignette Ads': { height: 325 },
      'Side Rails Ads': { height: 610 },
      'Rewarded Ads': { height: 325 }
    }
  }
};

// Slot ID generator
function slotId(name, num) {
  return (
    "slot-" +
    name.toLowerCase().replace(/\s+/g, "-") +
    "-" +
    num
  );
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('adContainer');
  if (!container) return;
  container.innerHTML = '';

  Object.values(networksConfig).forEach((network) => {
    const networkCard = document.createElement('section');
    networkCard.className = 'ad-network-card';

    const header = document.createElement('div');
    header.className = 'ad-network-header';
    header.innerHTML = `<h2>${network.name}</h2>`;
    networkCard.appendChild(header);

    Object.entries(network.formats).forEach(([formatName, formatInfo]) => {
      const formatCard = document.createElement('div');
      formatCard.className = 'ad-format-card';
      formatCard.setAttribute('data-format', formatName);

      const title = document.createElement('h3');
      title.className = 'ad-format-title';
      title.textContent = formatName;
      formatCard.appendChild(title);

      const wrapper = document.createElement('div');
      wrapper.className = 'ad-slots-wrapper';

      // Generate 3 slots per heading
      for (let i = 1; i <= 3; i++) {
        const id = slotId(formatName, i);
        const slot = document.createElement('div');
        slot.className = 'ad-slot';

        let html = '';

        // Responsive / Display
        if (formatInfo.format === 'display' || formatInfo.format === 'responsive') {
          html = `
            <ins class="adsbygoogle"
              style="display:block"
              data-ad-client="${ADSENSE_CLIENT}"
              data-ad-slot="${id}"
              data-ad-format="auto"
              data-full-width-responsive="true"></ins>
          `;
        }
        // In-Feed
        else if (formatInfo.format === 'in-feed') {
          html = `
            <ins class="adsbygoogle"
              style="display:block"
              data-ad-client="${ADSENSE_CLIENT}"
              data-ad-slot="${id}"
              data-ad-format="fluid"
              data-ad-layout="image-top"></ins>
          `;
        }
        // In-Article
        else if (formatInfo.format === 'in-article') {
          html = `
            <ins class="adsbygoogle"
              style="display:block;text-align:center;"
              data-ad-layout="in-article"
              data-ad-format="fluid"
              data-ad-client="${ADSENSE_CLIENT}"
              data-ad-slot="${id}"></ins>
          `;
        }
        // Multiplex
        else if (formatInfo.format === 'multiplex') {
          html = `
            <ins class="adsbygoogle"
              style="display:block"
              data-ad-format="autorelaxed"
              data-ad-client="${ADSENSE_CLIENT}"
              data-ad-slot="${id}"></ins>
          `;
        }
        // Anchor & Vignette (auto-managed by Google)
        else if (formatInfo.format === 'anchor' || formatInfo.format === 'vignette') {
          html = `<div class="notice">This ad type is auto-managed by Google AdSense</div>`;
        }

        slot.innerHTML = html;
        wrapper.appendChild(slot);
      }

      formatCard.appendChild(wrapper);
      networkCard.appendChild(formatCard);
    });

    container.appendChild(networkCard);
  });

  // Trigger AdSense
  setTimeout(() => {
    try {
      (adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, 200);
});
