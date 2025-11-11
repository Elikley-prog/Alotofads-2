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

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('adContainer');
  if (!container) return;

  container.innerHTML = '';

  Object.entries(networksConfig).forEach(([networkKey, networkData]) => {
    // Outer card for each ad network
    const networkCard = document.createElement('section');
    networkCard.className = 'ad-network-card';

    const header = document.createElement('div');
    header.className = 'ad-network-header';
    header.innerHTML = `<h2>${networkData.name}</h2>`;
    networkCard.appendChild(header);

    // Each format (subcard)
    Object.entries(networkData.formats).forEach(([formatName, formatConfig]) => {
      const formatCard = document.createElement('div');
      formatCard.className = 'ad-format-card';
      formatCard.setAttribute('data-format', formatName);

      const title = document.createElement('h3');
      title.className = 'ad-format-title';
      title.textContent = formatName;
      formatCard.appendChild(title);

      const wrapper = document.createElement('div');
      wrapper.className = 'ad-slots-wrapper';

      // Generate 3 visible slots
      for (let i = 1; i <= 3; i++) {
        const slot = document.createElement('div');
        slot.className = 'ad-slot';
        slot.textContent = `${formatName} - Slot ${i}`;
        slot.style.height = `${formatConfig.height}px`;
        wrapper.appendChild(slot);
      }

      formatCard.appendChild(wrapper);
      networkCard.appendChild(formatCard);
    });

    container.appendChild(networkCard);
  });
});
