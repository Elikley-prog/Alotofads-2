// Configuration for ad networks and formats
const networksConfig = {
  google: {
    name: 'Google AdSense',
    formats: {
      Leaderboard: { height: 100 },
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
    banner: true,
    video: false,
    sidebar: true
  }
};

// DOM helper
function $(id) {
  return document.getElementById(id);
}

// Initialize UI and event listeners
function init() {
  // Populate topic selector
  const selector = $('topicSelector');
  popularTopics.forEach(topic => {
    const option = document.createElement('option');
    option.value = topic;
    option.textContent = topic;
    selector.appendChild(option);
  });

  // Topic selector listener
  selector.addEventListener('change', e => {
    state.topic = e.target.value;
    renderAllAds();
  });

  // Filter listeners
  $('filterBanner').addEventListener('change', e => {
    state.filters.banner = e.target.checked;
    renderAllAds();
  });

  $('filterVideo').addEventListener('change', e => {
    state.filters.video = e.target.checked;
    renderAllAds();
  });

  $('filterSidebar').addEventListener('change', e => {
    state.filters.sidebar = e.target.checked;
    renderAllAds();
  });

  // Personalization toggle
  $('togglePersonalized').addEventListener('change', e => {
    state.personalized = e.target.checked;
    updatePrivacy();
  });

  renderAllAds();
}

// Determine if a format should be shown based on active filters
function shouldShowFormat(formatName) {
  const name = formatName.toLowerCase();
  
  if (name.includes('video')) return state.filters.video;
  if (name.includes('sidebar') || name.includes('skyscraper') || name.includes('rail') || name.includes('sticky')) {
    return state.filters.sidebar;
  }
  return state.filters.banner;
}

// Render all ad networks and formats
function renderAllAds() {
  const container = $('adContainer');
  container.innerHTML = '';

  for (const [networkKey, network] of Object.entries(networksConfig)) {
    const section = document.createElement('section');
    section.className = 'ad-network-section';
    
    const title = document.createElement('h2');
    title.textContent = network.name;
    section.appendChild(title);

    for (const [formatName, formatConfig] of Object.entries(network.formats)) {
      if (!shouldShowFormat(formatName)) continue;

      const formatGroup = document.createElement('div');
      formatGroup.className = 'ad-format-group';
      formatGroup.setAttribute('data-format', formatName);

      const formatTitle = document.createElement('h3');
      formatTitle.textContent = formatName;
      formatGroup.appendChild(formatTitle);

      const placeholder = document.createElement('div');
      placeholder.className = 'ad-placeholder';
      placeholder.textContent = `[${formatName}]`;
      formatGroup.appendChild(placeholder);

      section.appendChild(formatGroup);
    }

    container.appendChild(section);
  }

  updatePrivacy();
}

// Update privacy dashboard
function updatePrivacy() {
  const privacyText = $('privacyText');
  if (privacyText) {
    const networks = Object.keys(networksConfig).join(', ');
    const personalizedText = state.personalized ? 'Personalized' : 'Non-Personalized';
    privacyText.textContent = `Networks loaded: ${networks} | ${personalizedText} ads`;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);
