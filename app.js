// Alotofads - Ad Display Manager
// This script manages the display and filtering of ad networks
// Sample ad networks data
const adNetworks = [
  {
    name: 'Google AdSense',
    topic: 'general',
    formats: ['banner', 'sidebar', 'video'],
    unitId: 'ca-pub-xxx',
  },
  {
    name: 'Ezoic',
    topic: 'general',
    formats: ['banner', 'sidebar', 'video'],
    unitId: 'ezoic-xxx',
  },
];
// Topics for dropdown
const topics = ['all', 'general', 'lifestyle', 'tech', 'fitness', 'cars'];
// State management
let selectedTopic = 'all';
let selectedFormats = ['banner', 'sidebar', 'video'];
let personalized = true;
// Initialize the application
function init() {
  populateTopicSelector();
  setupEventListeners();
  renderAds();
  updatePrivacyDashboard();
}
// Populate the topic selector dropdown
function populateTopicSelector() {
  const selector = document.getElementById('topicSelector');
  topics.forEach((topic) => {
    const option = document.createElement('option');
    option.value = topic;
    option.textContent = topic.charAt(0).toUpperCase() + topic.slice(1);
    if (topic === 'all') option.selected = true;
    selector.appendChild(option);
  });
}
// Setup event listeners for controls
function setupEventListeners() {
  // Search button
  document.getElementById('searchBtn').addEventListener('click', () => {
    const searchTerm = document.getElementById('searchInput').value;
    console.log('Searching for:', searchTerm);
    renderAds();
  });
  // Topic selector
  document.getElementById('topicSelector').addEventListener('change', (e) => {
    selectedTopic = e.target.value;
    renderAds();
  });
  // Clear button
  document.getElementById('clearBtn').addEventListener('click', () => {
    document.getElementById('searchInput').value = '';
    selectedTopic = 'all';
    document.getElementById('topicSelector').value = 'all';
    renderAds();
  });
  // Format filters
  document.getElementById('filterVideo').addEventListener('change', (e) => {
    updateFormats('video', e.target.checked);
  });
  document.getElementById('filterBanner').addEventListener('change', (e) => {
    updateFormats('banner', e.target.checked);
  });
  document.getElementById('filterSidebar').addEventListener('change', (e) => {
    updateFormats('sidebar', e.target.checked);
  });
  // Personalization toggle
  document.getElementById('togglePersonalized').addEventListener('change', (e) => {
    personalized = e.target.checked;
    updatePrivacyDashboard();
  });
}
// Update selected formats
function updateFormats(format, checked) {
  if (checked) {
    if (!selectedFormats.includes(format)) {
      selectedFormats.push(format);
    }
  } else {
    selectedFormats = selectedFormats.filter((f) => f !== format);
  }
  renderAds();
}
// Filter ads based on current selections
function getFilteredAds() {
  return adNetworks.filter((network) => {
    const topicMatch = selectedTopic === 'all' || network.topic === selectedTopic;
    const formatMatch = network.formats.some((fmt) => selectedFormats.includes(fmt));
    return topicMatch && formatMatch;
  });
}
// Render ads to the container
function renderAds() {
  const container = document.getElementById('adContainer');
  const filteredAds = getFilteredAds();
  if (filteredAds.length === 0) {
    container.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #999;">No ads match your current filters</div>';
    return;
  }
  container.innerHTML = filteredAds
    .map(
      (ad) => `
    <div class="ad-section">
      <h2>${ad.name}</h2>
      ${selectedFormats
        .map(
          (format) => `
        <div class="ad-format-group">
          <h3>${format.charAt(0).toUpperCase() + format.slice(1)}</h3>
          <div class="ad-placeholder"></div>
        </div>
      `
        )
        .join('')}
    </div>
  `
    )
    .join('');
}
// Update the privacy dashboard
function updatePrivacyDashboard() {
  const privacyText = document.getElementById('privacyText');
  const networksCount = adNetworks.length;
  const status = personalized ? 'Personalized ads enabled' : 'Personalized ads disabled';
  privacyText.textContent = `${networksCount} networks loaded. ${status}.`;
}
// Start the application when the DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
