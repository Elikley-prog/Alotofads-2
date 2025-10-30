// app.js — updated to set per-format heights exactly as requested
const networksConfig = {
  google: {
    name: 'Google AdSense (placeholder)',
    enabled: true,
    formats: {
      leaderboard: { label: 'Leaderboard', height: 100, units: ['ca-pub-REPLACE/slot1', 'ca-pub-REPLACE/slot2'] },
      large_rectangle: { label: 'Large Rectangle', height: 290, units: ['ca-pub-REPLACE/large1'] },
      medium_rectangle: { label: 'Medium Rectangle', height: 260, units: ['ca-pub-REPLACE/medium1'] },
      mobile_banner: { label: 'Mobile Banner', height: 60, units: ['ca-pub-REPLACE/mobile1'] },
      wide_skyscraper: { label: 'Wide Skyscraper', height: 610, units: ['ca-pub-REPLACE/wide1'] },
      multiplex: { label: 'Multiplex Ads', height: 310, units: ['ca-pub-REPLACE/multiplex1'] },
      related_search: { label: 'Related Search Ads', height: 100, units: ['ca-pub-REPLACE/related1'] },
      video: { label: 'Video Ads', height: 325, units: ['ca-pub-REPLACE/v1'] }
    }
  },
  ezoic: {
    name: 'Ezoic (placeholder)',
    enabled: true,
    formats: {
      display: { label: 'Display Ads', height: 290, units: ['ezoic-b-1'] },
      native: { label: 'Native Ads', height: 260, units: ['ezoic-n-1'] },
      video: { label: 'Video Ads', height: 325, units: ['ezoic-v-1'] },
      anchor: { label: 'Anchor Ads', height: 100, units: ['ezoic-anchor-1'] },
      sticky_sidebar: { label: 'Sticky Sidebar Ads', height: 610, units: ['ezoic-sticky-1'] },
      vignette: { label: 'Vignette Ads', height: 325, units: ['ezoic-vig-1'] },
      siderails: { label: 'Side Rails Ads', height: 610, units: ['ezoic-rails-1'] },
      rewarded: { label: 'Rewarded Ads', height: 325, units: ['ezoic-reward-1'] }
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

function $(id) {
  return document.getElementById(id);
}

function init() {
  const sel = $('topicSelector');
  popularTopics.forEach(t => {
    const o = document.createElement('option');
    o.value = t; o.textContent = t;
    sel.appendChild(o);
  });

  $('topicSelector').addEventListener('change', (e) => {
    state.topic = e.target.value;
    renderAllAds();
  });

  $('videoFilter').addEventListener('change', (e) => {
    state.filters.video = e.target.checked;
    renderAllAds();
  });

  $('bannerFilter').addEventListener('change', (e) => {
    state.filters.banner = e.target.checked;
    renderAllAds();
  });

  $('sidebarFilter').addEventListener('change', (e) => {
    state.filters.sidebar = e.target.checked;
    renderAllAds();
  });

  $('personalizationToggle').addEventListener('change', (e) => {
    state.personalized = e.target.checked;
  });

  renderAllAds();
}

function matchesFilter(formatObj) {
  const label = (formatObj.label || '').toLowerCase();
  if (label.includes('video')) return state.filters.video;
  if (label.includes('mobile') || label.includes('leaderboard') || label.includes('display') || label.includes('related') || label.includes('anchor')) return state.filters.banner;
  if (label.includes('sidebar') || label.includes('side') || label.includes('skyscraper') || label.includes('rails') || label.includes('sticky')) return state.filters.sidebar;
  return true;
}

function renderAllAds() {
  const container = $('adContainer');
  container.innerHTML = '';
  for (const netKey of Object.keys(networksConfig)) {
    const net = networksConfig[netKey];
    if (!net.enabled) continue;
    const section = document.createElement('section');
    section.className = 'network-section';
    const header = document.createElement('div');
    header.className = 'network-header';
    header.innerHTML = `<strong>${net.name}</strong><div class="muted">topic: ${state.topic || 'general'}</div>`;
    section.appendChild(header);
    for (const [formatKey, formatObj] of Object.entries(net.formats)) {
      if (!matchesFilter(formatObj)) continue;
      const formatRow = document.createElement('div');
      formatRow.className = 'format-row';
      const ftitle = document.createElement('div');
      ftitle.className = 'format-title';
      ftitle.textContent = formatObj.label;
      formatRow.appendChild(ftitle);
      const adStrip = document.createElement('div');
      adStrip.className = 'ad-strip';
      // set CSS variable so stylesheet controls spacing
      adStrip.style.setProperty('--format-height', `${formatObj.height}px`);
      const slotsCount = 6;
      for (let i = 0; i < slotsCount; i++) {
        const slot = createAdSlot(netKey, formatObj, i, formatKey);
        adStrip.appendChild(slot);
      }
      formatRow.appendChild(adStrip);
      section.appendChild(formatRow);
    }
    container.appendChild(section);
  }
  renderPrivacy();
}

function createAdSlot(netKey, formatObj, slotIndex, formatKey) {
  const slot = document.createElement('div');
  slot.className = 'ad-slot';
  const unitId = formatObj.units[slotIndex % formatObj.units.length];
  slot.innerHTML = `<div>${unitId}</div><div class="meta">mock ad</div>`;
  return slot;
}

function renderPrivacy() {
  const footer = document.querySelector('footer');
  if (footer) {
    footer.innerHTML = `<small>Privacy settings: <strong>${state.personalized ? 'Personalized' : 'Non-Personalized'} Ads</strong></small>`;
  }
}

document.addEventListener('DOMContentLoaded', init);
