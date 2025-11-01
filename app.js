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

const popularTopics = ['fitness', 'cars', 'technology', 'travel', 'finance', 'pets', 'fashion'];

const state = {
  topic: '',
  personalized: true,
  filters: {
    minHeight: 0,
    maxHeight: 650
  }
};

// Hybrid Layout Generator: ad-network-card > ad-format-card > ad-slots-wrapper > ad-slot
function generateHybridLayout() {
  const container = document.getElementById('ad-container');
  container.innerHTML = '';

  Object.entries(networksConfig).forEach(([networkKey, networkData]) => {
    // Create ad-network-card (outer layer)
    const networkCard = document.createElement('div');
    networkCard.className = 'ad-network-card';

    // Create ad-network-header
    const networkHeader = document.createElement('div');
    networkHeader.className = 'ad-network-header';
    
    const networkTitle = document.createElement('h2');
    networkTitle.textContent = networkData.name;
    networkHeader.appendChild(networkTitle);
    networkCard.appendChild(networkHeader);

    // Iterate through ad formats
    Object.entries(networkData.formats).forEach(([formatName, formatConfig]) => {
      // Create ad-format-card (subcard)
      const formatCard = document.createElement('div');
      formatCard.className = 'ad-format-card';

      // Add format title
      const formatTitle = document.createElement('h3');
      formatTitle.textContent = formatName;
      formatCard.appendChild(formatTitle);

      // Create ad-slots-wrapper
      const slotsWrapper = document.createElement('div');
      slotsWrapper.className = 'ad-slots-wrapper';

      // Create 3 ad slots for each format
      for (let i = 1; i <= 3; i++) {
        const adSlot = document.createElement('div');
        adSlot.className = 'ad-slot';
        adSlot.setAttribute('data-network', networkKey);
        adSlot.setAttribute('data-format', formatName);
        adSlot.setAttribute('data-slot', i);
        adSlot.textContent = `${formatName} #${i}`;
        slotsWrapper.appendChild(adSlot);
      }

      formatCard.appendChild(slotsWrapper);
      networkCard.appendChild(formatCard);
    });

    container.appendChild(networkCard);
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  generateHybridLayout();
});

// Re-render when state changes
function renderAds() {
  generateHybridLayout();
}
