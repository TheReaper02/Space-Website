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
