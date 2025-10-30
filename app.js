// Alotofads - Ad Display Manager
// This script manages the display of ad networks
// Sample ad networks data with per-format height configuration
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
const topics = ['general', 'technology', 'business', 'lifestyle'];
// Helper function to add "Ads" suffix if not already present
function formatAdName(name) {
  return name.endsWith('Ads') ? name : name + ' Ads';
}
// Initialize the application
function initializeApp() {
  const networkSelector = document.getElementById('networkSelect');
  const mainContent = document.getElementById('mainContent');
  // Populate network selector
  adNetworks.forEach(network => {
    const option = document.createElement('option');
    option.value = network.name;
    option.textContent = network.name;
    networkSelector.appendChild(option);
  });
  // Load initial network
  loadNetwork('Google AdSense');
  // Event listeners
  networkSelector.addEventListener('change', (e) => loadNetwork(e.target.value));
  document.getElementById('addAdsBtn').addEventListener('click', addRandomAds);
  document.getElementById('removeAdsBtn').addEventListener('click', removeAllAds);
}
// Load network data and render ads
function loadNetwork(networkName) {
  const network = adNetworks.find(n => n.name === networkName);
  const mainContent = document.getElementById('mainContent');
  // Clear existing content
  const existingSection = mainContent.querySelector('section');
  if (existingSection) existingSection.remove();
  // Create network section
  const section = document.createElement('section');
  section.innerHTML = `<h2>${network.name}</h2>`;
  // Create ad units based on format configurations
  const adContainer = document.createElement('div');
  adContainer.id = 'adContainer';
  network.formats.forEach(format => {
    const adUnit = document.createElement('div');
    adUnit.className = 'ad-unit';
    adUnit.style.minHeight = format.height;
    adUnit.setAttribute('data-format', format.name);
    // Apply the formatAdName function to ensure "Ads" suffix
    const displayName = formatAdName(format.name);
    adUnit.textContent = `${displayName} (${format.height})`;
    adContainer.appendChild(adUnit);
  });
  section.appendChild(adContainer);
  mainContent.appendChild(section);
}
// Add random ads
function addRandomAds() {
  const adContainer = document.getElementById('adContainer');
  if (!adContainer) return;
  const newAd = document.createElement('div');
  newAd.className = 'ad-unit';
  newAd.textContent = 'New Random Ad';
  newAd.style.minHeight = '150px';
  adContainer.appendChild(newAd);
}
// Remove all ads
function removeAllAds() {
  const adContainer = document.getElementById('adContainer');
  if (!adContainer) return;
  adContainer.innerHTML = '';
}
// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
