// Configuration for ad networks and formats
const networksConfig = {
  google: {
    name: 'Google AdSense',
    formats: {
      'Leaderboard': { height: 100 },
      'Large Rectangle': { height: 290 },
      'Medium Rectangle': { height: 260 },
      'Mobile Banner': { height: 60 },
      'Wide Skyscraper': { height: 610 },
      'Multiplex Ads': { height: 310 },
      'Related Search Ads': { height: 100 },
      'Video Ads': { height: 325 }
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

// Hybrid Layout Generator: ad-network-card > ad-format-card > ad-slots-wrapper > ad-slot
function generateHybridLayout() {
  const container = document.getElementById('ad-container');
  if (!container) return;
  container.innerHTML = '';
  Object.entries(networksConfig).forEach(([networkKey, networkData]) => {
    // Ad Network Card
    const networkCard = document.createElement('div');
    networkCard.className = 'ad-network-card';

    // Ad Network Header
    const networkHeader = document.createElement('div');
    networkHeader.className = 'ad-network-header';
    const networkTitle = document.createElement('h2');
    networkTitle.textContent = networkData.name;
    networkHeader.appendChild(networkTitle);
    networkCard.appendChild(networkHeader);

    // Ad Formats (subcards)
    Object.entries(networkData.formats).forEach(([formatName, formatConfig]) => {
      const formatCard = document.createElement('div');
      formatCard.className = 'ad-format-card';

      // Format Subheading
      const formatTitle = document.createElement('h3');
      formatTitle.textContent = formatName;
      formatCard.appendChild(formatTitle);

      // Ad Slots Wrapper
      const slotsWrapper = document.createElement('div');
      slotsWrapper.className = 'ad-slots-wrapper';
      for (let i = 1; i <= 3; i++) {
        const adSlot = document.createElement('div');
        adSlot.className = 'ad-slot';
        adSlot.setAttribute('data-network', networkKey);
        adSlot.setAttribute('data-format', formatName);
        adSlot.setAttribute('data-slot', i);
        adSlot.style.height = formatConfig.height + 'px'; // Per-format height!
        adSlot.textContent = `${formatName} #${i}`;
        slotsWrapper.appendChild(adSlot);
      }
      formatCard.appendChild(slotsWrapper);
      networkCard.appendChild(formatCard);
    });
    container.appendChild(networkCard);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  generateHybridLayout();
});

function renderAds() {
  generateHybridLayout();
}
