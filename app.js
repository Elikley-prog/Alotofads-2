// AdSense Publisher ID
const ADSENSE_CLIENT = "ca-pub-3293304771986381";

// Array of 70 real numeric slot IDs
const adSlotIds = [
  "7643176552", "7643176553", "7643176554", "7643176555", "7643176556",
  "7643176557", "7643176558", "7643176559", "7643176560", "7643176561",
  "7643176562", "7643176563", "7643176564", "7643176565", "7643176566",
  "7643176567", "7643176568", "7643176569", "7643176570", "7643176571",
  "7643176572", "7643176573", "7643176574", "7643176575", "7643176576",
  "7643176577", "7643176578", "7643176579", "7643176580", "7643176581",
  "7643176582", "7643176583", "7643176584", "7643176585", "7643176586",
  "7643176587", "7643176588", "7643176589", "7643176590", "7643176591",
  "7643176592", "7643176593", "7643176594", "7643176595", "7643176596",
  "7643176597", "7643176598", "7643176599", "7643176600", "7643176601",
  "7643176602", "7643176603", "7643176604", "7643176605", "7643176606",
  "7643176607", "7643176608", "7643176609", "7643176610", "7643176611",
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

function getNextSlotId() {
  const id = adSlotIds[slotIndex % adSlotIds.length];
  slotIndex++;
  return id;
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('adContainer');
  if (!container) return;
  container.innerHTML = '';
  slotIndex = 0;

  Object.values(networksConfig).forEach((network) => {
    const networkCard = document.createElement('section');
    networkCard.className = 'ad-network-card';
    const header = document.createElement('div');
    header.className = 'ad-network-header';
    header.innerHTML = `<h2>${network.name}</h2>`;
    networkCard.appendChild(header);
    Object.entries(network.formats).forEach(([formatName, formatInfo]) => {
      const formatCard = document.createElement('div');
      formatCard.className = 'ad-format-card';
      formatCard.setAttribute('data-format', formatName);
      const title = document.createElement('h3');
      title.className = 'ad-format-title';
      title.textContent = formatName;
      formatCard.appendChild(title);
      const wrapper = document.createElement('div');
      wrapper.className = 'ad-slots-wrapper';
      for (let i = 1; i <= 3; i++) {
        const id = getNextSlotId();
        const slot = document.createElement('div');
        slot.className = 'ad-slot';
        slot.style.height = formatInfo.height + 'px';
        let html = '';
        if (formatInfo.format === 'display' || formatInfo.format === 'responsive') {
          html = `
            <ins class="adsbygoogle"
            style="display:block"
            data-ad-client="${ADSENSE_CLIENT}"
            data-ad-slot="${id}"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
          `;
        }
        else if (formatInfo.format === 'in-feed') {
          html = `
            <ins class="adsbygoogle"
            style="display:block"
            data-ad-client="${ADSENSE_CLIENT}"
            data-ad-slot="${id}"
            data-ad-format="fluid"
            data-ad-layout="image-top"></ins>
          `;
        }
        else if (formatInfo.format === 'in-article') {
          html = `
            <ins class="adsbygoogle"
            style="display:block;text-align:center;"
            data-ad-layout="in-article"
            data-ad-format="fluid"
            data-ad-client="${ADSENSE_CLIENT}"
            data-ad-slot="${id}"></ins>
          `;
        }
        else if (formatInfo.format === 'multiplex') {
          html = `
            <ins class="adsbygoogle"
            style="display:block"
            data-ad-format="autorelaxed"
            data-ad-client="${ADSENSE_CLIENT}"
            data-ad-slot="${id}"></ins>
          `;
        }
        else if (formatInfo.format === 'anchor' || formatInfo.format === 'vignette') {
          html = `<div class="notice">This ad type is auto-managed by Google AdSense</div>`;
        }
        slot.innerHTML = html;
        wrapper.appendChild(slot);
      }
      formatCard.appendChild(wrapper);
      networkCard.appendChild(formatCard);
    });
    container.appendChild(networkCard);
  });
  setTimeout(() => {
    try {
      (adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, 200);
});
