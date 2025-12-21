// AdSense Publisher ID
const ADSENSE_CLIENT = "ca-pub-3293304771986381";

const adSlotIds = [
 // Multiplex Ads (10 units - 300px height)
 "7979191586", // Multiplex 1
 "1247080510", // Multiplex 2
 "3876295044", // Multiplex 3
 "3304792860", // Multiplex 4
 "9678629529", // Multiplex 5
 "2563213374", // Multiplex 6
 "1250131709", // Multiplex 7
 "4423908196", // Multiplex 8
 "7658970848", // Multiplex 9
 "2208808394", // Multiplex 10
 // Display Ads (9 units - 90px height)
 "7643176552", // Display 1
 "8933998846", // Display 2
 "6666109914", // Display 3
 "6345889173", // Display 4
 "7620917174", // Display 5
 "3903558666", // Display 6
 "9895726729", // Display 7
 "8582645056", // Display 8
 "7269563384", // Display 9
 "4997805023"  // Display 10
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
      'Anchor Ads': { height: 0, format: 'anchor' }, // Anchor - blank
      'Vignette Ads': { height: 0, format: 'vignette' }, // Vignette - blank
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
  
  // For each Google format, create ad slots in horizontal scroll
  Object.entries(networksConfig.google.formats).forEach(([formatName, formatInfo]) => {
    const formatCard = document.createElement('div');
    formatCard.className = 'ad-format-card';
    
    const formatTitle = document.createElement('div');
    formatTitle.className = 'ad-format-title';
    formatTitle.textContent = formatName;
    formatCard.appendChild(formatTitle);
    
    const slotsWrapper = document.createElement('div');
    slotsWrapper.className = 'ad-slots-wrapper';
    
    // For Anchor and Vignette: Just one placeholder (leave blank)
    // For other formats: Create single ad slot with the one real ID
    if (formatInfo.format === 'anchor' || formatInfo.format === 'vignette') {
      // Anchor/Vignette - leave blank (no ad code)
      const slot = document.createElement('div');
      slot.className = 'ad-slot';
      slot.style.backgroundColor = '#f0f0f0';
      slot.style.border = '1px solid #ddd';
      slot.innerHTML = `<div class="notice">Auto Ads only (not manual)</div>`;
      slotsWrapper.appendChild(slot);
    } else {
      // Create single ad slot for this format
      const slotId = getNextSlotId();
      if (slotId) {
        const slot = document.createElement('div');
        slot.className = 'ad-slot';
        if (formatInfo.height) {
          slot.style.height = formatInfo.height + 'px';
        }
        
        const html = `
          <ins class="adsbygoogle"
            style="display:inline-block;width:100%;${formatInfo.height ? 'height:' + formatInfo.height + 'px;' : ''}"
            data-ad-client="${ADSENSE_CLIENT}"
            data-ad-slot="${slotId}"
            data-ad-format="${formatInfo.format}"></ins>
        `;
        
        slot.innerHTML = html;
        slotsWrapper.appendChild(slot);
        
        // Push AdSense script for THIS SPECIFIC SLOT INDIVIDUALLY
        try {
          (adsbygoogle = window.adsbygoogle || []).push({});
          console.log('AdSense slot pushed for format: ' + formatName + ', slot ID: ' + slotId);
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
