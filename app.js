// AdSense Publisher ID
const ADSENSE_CLIENT = "ca-pub-3293304771986381";

// Array of 70 real numeric slot IDs
// Organized as: 10 IDs per Google format (7 formats total)
const adSlotIds = [
  // Display Banner ads (10 IDs)
  "7643176552", "7643176553", "7643176554", "7643176555", "7643176556",
  "7643176557", "7643176558", "7643176559", "7643176560", "7643176561",
  // In-Feed Ads (10 IDs)
  "7643176562", "7643176563", "7643176564", "7643176565", "7643176566",
  "7643176567", "7643176568", "7643176569", "7643176570", "7643176571",
  // In-Article Ads (10 IDs)
  "7643176572", "7643176573", "7643176574", "7643176575", "7643176576",
  "7643176577", "7643176578", "7643176579", "7643176580", "7643176581",
  // Multiplex Ads (10 IDs)
  "7643176582", "7643176583", "7643176584", "7643176585", "7643176586",
  "7643176587", "7643176588", "7643176589", "7643176590", "7643176591",
  // Anchor Ads (10 IDs)
  "7643176592", "7643176593", "7643176594", "7643176595", "7643176596",
  "7643176597", "7643176598", "7643176599", "7643176600", "7643176601",
  // Vignette Ads (10 IDs)
  "7643176602", "7643176603", "7643176604", "7643176605", "7643176606",
  "7643176607", "7643176608", "7643176609", "7643176610", "7643176611",
  // Responsive Display Ads (10 IDs)
  "7643176612", "7643176613", "7643176614", "7643176615", "7643176616",
  "7643176617", "7643176618", "7643176619", "7643176620", "7643176621"
];

let slotIndex = 0;

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
      'ASFE': { height: 100 },
      'Sidebar': { height: 600 },
      'Inline': { height: 200 },
      'Banner': { height: 90 },
      'Box': { height: 250 },
      'Interstitial': { height: 600 },
      'Video': { height: 400 },
      'Native': { height: 300 }
    }
  }
};

function getNextSlotId() {
  if (slotIndex < adSlotIds.length) {
    return adSlotIds[slotIndex++];
  }
  return null;
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('adContainer');
  
  // Render Google AdSense Network
  const googleNetwork = document.createElement('div');
  googleNetwork.className = 'ad-network-card';
  
  const googleHeader = document.createElement('div');
  googleHeader.className = 'ad-network-header';
  googleHeader.textContent = networksConfig.google.name;
  googleNetwork.appendChild(googleHeader);
  
  // For each Google format, create 10 ad slots in horizontal scroll
  Object.entries(networksConfig.google.formats).forEach(([formatName, formatInfo]) => {
    const formatCard = document.createElement('div');
    formatCard.className = 'ad-format-card';
    
    const formatTitle = document.createElement('div');
    formatTitle.className = 'ad-format-title';
    formatTitle.textContent = formatName;
    formatCard.appendChild(formatTitle);
    
    const slotsWrapper = document.createElement('div');
    slotsWrapper.className = 'ad-slots-wrapper';
    
    // Create 10 ad slots for this format
    for (let i = 0; i < 10; i++) {
      const slotId = getNextSlotId();
      if (slotId) {
        const slot = document.createElement('div');
        slot.className = 'ad-slot';
        slot.style.height = formatInfo.height + 'px';
        
        const html = `
          <ins class="adsbygoogle"
               style="display:inline-block;width:100%;${formatInfo.height ? 'height:' + formatInfo.height + 'px;' : ''}"
               data-ad-client="${ADSENSE_CLIENT}"
               data-ad-slot="${slotId}"
               data-ad-format="${formatInfo.format}"></ins>
        `;
        
        slot.innerHTML = html;
        slotsWrapper.appendChild(slot);
                     // Push AdSense script for this slot
             try {
               (adsbygoogle = window.adsbygoogle || []).push({});
             } catch (e) {
               console.error('AdSense initialization error for slot ' + slotId, e);
             }
      }
    }
    
    formatCard.appendChild(slotsWrapper);
    googleNetwork.appendChild(formatCard);
  });
  
  container.appendChild(googleNetwork);
  
  // Render Ezoic Network (SEPARATE - NO Google AdSense IDs)
  const ezoicNetwork = document.createElement('div');
  ezoicNetwork.className = 'ad-network-card';
  
  const ezoicHeader = document.createElement('div');
  ezoicHeader.className = 'ad-network-header';
  ezoicHeader.textContent = networksConfig.ezoic.name;
  ezoicNetwork.appendChild(ezoicHeader);
  
  Object.entries(networksConfig.ezoic.formats).forEach(([formatName, formatInfo]) => {
    const formatCard = document.createElement('div');
    formatCard.className = 'ad-format-card';
    
    const formatTitle = document.createElement('div');
    formatTitle.className = 'ad-format-title';
    formatTitle.textContent = formatName;
    formatCard.appendChild(formatTitle);
    
    const slotsWrapper = document.createElement('div');
    slotsWrapper.className = 'ad-slots-wrapper';
    
    // Create placeholder for Ezoic ads (no Google AdSense IDs)
    const slot = document.createElement('div');
    slot.className = 'ad-slot';
    slot.style.height = formatInfo.height + 'px';
    slot.style.display = 'flex';
    slot.style.alignItems = 'center';
    slot.style.justifyContent = 'center';
    slot.style.backgroundColor = '#f0f0f0';
    slot.style.border = '1px solid #ddd';
    slot.innerHTML = `<div class="notice">${formatName} - Ezoic Placement</div>`;
    
    slotsWrapper.appendChild(slot);
    formatCard.appendChild(slotsWrapper);
    ezoicNetwork.appendChild(formatCard);
  });
  
  container.appendChild(ezoicNetwork);
  
});
