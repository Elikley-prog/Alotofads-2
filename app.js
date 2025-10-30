// Alotofads - Ad Display Manager
// This script manages the display of ad networks
// Sample ad networks data with real-world ad formats
const adNetworks = [
  {
    name: 'Google AdSense',
    topic: 'general',
    formats: ['Leaderboard', 'Large Rectangle', 'Medium Rectangle', 'Mobile Banner', 'Wide Skyscraper', 'Multiplex Ads', 'Related Search Ads', 'Video Ads'],
    unitId: 'ca-pub-xxx',
  },
  {
    name: 'Ezoic',
    topic: 'general',
    formats: ['Display Ads', 'Native Ads', 'Video Ads', 'Anchor Ads', 'Sticky Sidebar Ads', 'Vignette Ads', 'Side Rails Ads', 'Rewarded Ads'],
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
      formatHeading.textContent = format + ' Ads';
      formatGroup.appendChild(formatHeading);
      const placeholder = document.createElement('div');
      placeholder.className = 'ad-placeholder';
      placeholder.textContent = `[${format.toUpperCase()} AD]`;
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
