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

const name = document.getElementById('tech-name');
const description = document.getElementById('tech-description');
const image = document.getElementById('tech-image');
const stepper = document.getElementById('tech-stepper');
const content = document.getElementById('tech-content');


let technologyData = [];
let currentIndex = 0;

function renderTechnology(tech) {
    image.src = tech.images.portrait;
    image.alt = tech.name;
    name.textContent = tech.name;
    description.textContent = tech.description;
}

function updateTechnologyDisplay() {
    content.classList.add('opacity-0');
    setTimeout(() => {
        renderTechnology(technologyData[currentIndex]);
        const stepButtons = stepper.querySelectorAll('button');
        stepButtons.forEach((b, i) => {
            b.classList.toggle('bg-white', i === currentIndex);
            b.classList.toggle('bg-transparent', i !== currentIndex);
        });
        content.classList.remove('opacity-0');
    }, 300);
}

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        technologyData = data.technology;
        function renderStepper() {
            stepper.innerHTML = technologyData.map((_, i) =>
                `<button class="w-10 h-10 rounded-full border-2 border-white font-bellefair text-xl flex items-center justify-center lg:w-16 lg:h-16 ${i === currentIndex ? 'bg-white' : 'bg-transparent'} transition-colors duration-300" aria-label="Show ${technologyData[i].name}"><span class="${i === currentIndex ? 'text-black' : 'text-white'}">${i + 1}</span></button>`
            ).join('');
            const stepButtons = stepper.querySelectorAll('button');
            stepButtons.forEach((button, index) => {
                button.addEventListener('click', () => {
                    if (currentIndex !== index) {
                        currentIndex = index;
                        updateTechnologyDisplay();
                        renderStepper();
                    }
                });
            });
        }
        renderStepper();
        renderTechnology(technologyData[currentIndex]);
        updateTechnologyDisplay = function() {
            content.classList.add('opacity-0');
            setTimeout(() => {
                renderTechnology(technologyData[currentIndex]);
                renderStepper();
                content.classList.remove('opacity-0');
            }, 300);
        };
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
