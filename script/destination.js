const mobileMenu = document.getElementById('mobile-menu');
const openMenuBtn = document.querySelector('button[aria-label="Open Menu"]');
const closeMenuBtn = document.querySelector('button[aria-label="Close Menu"]');
const hamburgerIcon = document.getElementById('open-menu-btn');

openMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('translate-x-full');
    mobileMenu.classList.add('translate-x-0');
    hamburgerIcon.classList.add('hidden');
});

closeMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('translate-x-0');
    mobileMenu.classList.add('translate-x-full');
    hamburgerIcon.classList.remove('hidden');
});

const image = document.getElementById('destination-image');
const title = document.getElementById('destination-title');
const description = document.getElementById('destination-description');
const distance = document.getElementById('destination-distance');
const travel = document.getElementById('destination-travel-time');
const tabs = document.querySelectorAll('.tab');
const content = document.getElementById('destination-content');


let destinations = [];
let currentIndex = 0;

function renderDestination(dest) {
  image.src = dest.images.png;
  image.alt = dest.name;
  title.textContent = dest.name;
  description.textContent = dest.description;
  distance.textContent = dest.distance;
  travel.textContent = dest.travel;
}

function updateDestinationDisplay() {
  content.classList.add('opacity-0');
  setTimeout(() => {
    renderDestination(destinations[currentIndex]);
    tabs.forEach((t, i) => {
      t.setAttribute('aria-selected', i === currentIndex ? 'true' : 'false');
      t.classList.toggle('border-b-2', i === currentIndex);
      t.classList.toggle('border-white', i === currentIndex);
    });
    content.classList.remove('opacity-0');
  }, 300);
}

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    destinations = data.destinations;
    updateDestinationDisplay();
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        currentIndex = index;
        updateDestinationDisplay();
      });
    });
  });




// If you see this code and have no idea what it is, 
// I just implemented a touch swipe feature for mobile/tablet :] 
// **NOT** the code above ⬆️⬆️⬆️⬆️ but the one below ⬇️⬇️⬇️⬇️ 


let startX = 0;
let endX = 0;

content.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

content.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  if (endX < startX - 30) {
    if (currentIndex < destinations.length - 1) {
      currentIndex++;
      updateDestinationDisplay();
    }
  } else if (endX > startX + 30) {
    if (currentIndex > 0) {
      currentIndex--;
      updateDestinationDisplay();
    }
  }
}
