const popularTopics = [
  'fitness',
  'cars',
  'technology',
  'travel',
  'finance',
  'pets',
  'fashion'
];

// DOM helper
function $(id) {
  return document.getElementById(id);
}

// Initialize UI
function init() {
  const selector = $('topicSelector');

  popularTopics.forEach(topic => {
    const option = document.createElement('option');
    option.value = topic;
    option.textContent = topic;
    selector.appendChild(option);
  });

  selector.addEventListener('change', e => {
    document.title = `alotofads.com — ${e.target.value}`;
  });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', init);
