// Alotofads - Ad Display Manager
// This script manages the display of ad networks
// Sample ad networks data with real-world ad formats
const adNetworks = [
  {
    name: 'Google AdSense',
    topic: 'general',
    formats: [
      { name: 'Leaderboard', height: '100px' },
      { name: 'Large Rectangle', height: '290px' },
      { name: 'Medium Rectangle', height: '260px' },
      { name: 'Mobile Banner', height: '60px' },
      { name: 'Wide Skyscraper', height: '610px' },
      { name: 'Multiplex Ads', height: '310px' },
      { name: 'Related Search Ads', height: '100px' },
      { name: 'Video Ads', height: '325px' }
    ],
    unitId: 'ca-pub-xxx',
  },
  {
    name: 'Ezoic',
    topic: 'general',
    formats: [
      { name: 'Display Ads', height: '290px' },
      { name: 'Native Ads', height: '260px' },
      { name: 'Video Ads', height: '325px' },
      { name: 'Anchor Ads', height: '100px' },
      { name: 'Sticky Sidebar Ads', height: '610px' },
      { name: 'Vignette Ads', height: '325px' },
      { name: 'Side Rails Ads', height: '610px' },
      { name: 'Rewarded Ads', height: '325px' }
    ],
    unitId: 'ezoic-xxx',
  },
];
// Topics for dropdown
const topics = ['all', 'general', 'lifestyle', 'tech', 'fitness', 'cars'];
// State management
let selectedTopic = 'all';
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
    selector.appendChild(option);
  });
}
// Setup event listeners
function setupEventListeners() {
  document.getElementById('searchBtn').addEventListener('click', performSearch);
  document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
  });
  document.getElementById('topicSelector').addEventListener('change', (e) => {
    selectedTopic = e.target.value;
    renderAds();
  });
  document.getElementById('clearBtn').addEventListener('click', resetFilters);
  document.getElementById('togglePersonalized').addEventListener('change', (e) => {
    personalized = e.target.checked;
    updatePrivacyDashboard();
  });
}
// Perform search
function performSearch() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  if (!searchTerm) {
    renderAds();
    return;
  }
  // Filter ads based on search term
  renderAds(searchTerm);
}
// Reset filters
function resetFilters() {
  document.getElementById('searchInput').value = '';
  document.getElementById('topicSelector').value = 'all';
  selectedTopic = 'all';
  renderAds();
}
// Get filtered ads based on selected topic
function getFilteredAds(searchTerm = '') {
  return adNetworks.filter((network) => {
    const matchesTopic = selectedTopic === 'all' || network.topic === selectedTopic;
    const matchesSearch = searchTerm === '' || network.name.toLowerCase().includes(searchTerm);
    return matchesTopic && matchesSearch;
  });
}
// Render ads
function renderAds(searchTerm = '') {
  const container = document.getElementById('adContainer');
  const filteredAds = getFilteredAds(searchTerm);
  
  if (filteredAds.length === 0) {
    container.innerHTML = '<p style="text-align: center; padding: 20px;">No ads found for the selected criteria.</p>';
    return;
  }
  container.innerHTML = '';
  filteredAds.forEach((network) => {
    const section = document.createElement('section');
    section.className = 'ad-network-section';
    const heading = document.createElement('h2');
    heading.textContent = network.name;
    section.appendChild(heading);
    // Display all formats for this network
    network.formats.forEach((format) => {
      const formatGroup = document.createElement('div');
      formatGroup.className = 'ad-format-group';
      const formatHeading = document.createElement('h3');
      formatHeading.textContent = format.name.endsWith('Ads') ? format.name : format.name + ' Ads';
      formatGroup.appendChild(formatHeading);
      const placeholder = document.createElement('div');
      placeholder.className = 'ad-placeholder';
      placeholder.style.height = format.height;
      placeholder.textContent = `[${format.name.toUpperCase()} AD]`;
      formatGroup.appendChild(placeholder);
      section.appendChild(formatGroup);
    });
    container.appendChild(section);
  });
}
// Update privacy dashboard
function updatePrivacyDashboard() {
  const privacyText = document.getElementById('privacyText');
  const toggleCheckbox = document.getElementById('togglePersonalized');
  
  if (adNetworks.length > 0) {
    privacyText.textContent = personalized
      ? `${adNetworks.length} networks loaded. Personalized ads enabled.`
      : `${adNetworks.length} networks loaded. Personalized ads disabled.`;
  } else {
    privacyText.textContent = 'No networks loaded yet.';
  }
}
// Start the application when DOM is ready
document.addEventListener('DOMContentLoaded', init);
