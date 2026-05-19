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

const role = document.getElementById('crew-role');
const name = document.getElementById('crew-name');
const bio = document.getElementById('crew-bio');
const image = document.getElementById('crew-image');
const dots = document.getElementById('crew-dots');
const content = document.getElementById('crew-content');


let crewData = [];
let currentIndex = 0;

function renderCrew(member) {
  image.src = member.images.png;
  image.alt = member.name;
  role.textContent = member.role;
  name.textContent = member.name;
  bio.textContent = member.bio;
}

function updateCrewDisplay() {
  content.classList.add('opacity-0');
  setTimeout(() => {
    renderCrew(crewData[currentIndex]);
    
    const dotButtons = dots.querySelectorAll('button');
    dotButtons.forEach((d, i) => {
      d.classList.toggle('bg-white', i === currentIndex);
      d.classList.toggle('bg-white/30', i !== currentIndex);
    });
    content.classList.remove('opacity-0');
  }, 300);
}

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    crewData = data.crew;
    
    dots.innerHTML = crewData.map((_, i) =>
      `<button class="dot w-3 h-3 rounded-full bg-white/30 ${i === 0 ? 'bg-white' : ''}" aria-label="Show ${crewData[i].name}"></button>`
    ).join('');

    const dotButtons = dots.querySelectorAll('button');
    dotButtons.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateCrewDisplay();
      });
    });

    updateCrewDisplay(); 
  });


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
    if (currentIndex < crewData.length - 1) {
      currentIndex++;
      updateCrewDisplay();
    }
  } else if (endX > startX + 30) {
    if (currentIndex > 0) {
      currentIndex--;
      updateCrewDisplay();
    }
  }
}