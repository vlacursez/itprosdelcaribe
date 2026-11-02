const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
  navigation.classList.toggle('open', !isOpen);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menú');
    navigation.classList.remove('open');
  });
});

const reelStage = document.querySelector('.reel-stage');
const reelBrands = [
  { name: 'Cisco', brand: 'cisco' },
  { name: 'Microsoft', brand: 'microsoft' },
  { name: 'Fortinet', brand: 'fortinet' },
  { name: 'Palo Alto Networks', brand: 'paloalto' },
  { name: 'VeloCloud', brand: 'velocloud' },
  { name: 'Check Point', brand: 'checkpoint' },
];
let reelIndex = 0;
let reelTimer;

function showReelBrand(nextIndex) {
  reelIndex = (nextIndex + reelBrands.length) % reelBrands.length;
  const label = document.createElement('span');
  label.className = 'reel-brand';
  label.textContent = reelBrands[reelIndex].name;
  reelStage.parentElement.dataset.brand = reelBrands[reelIndex].brand;
  reelStage.replaceChildren(label);
  requestAnimationFrame(() => label.classList.add('is-active'));
}

function restartReelTimer() {
  window.clearInterval(reelTimer);
  reelTimer = window.setInterval(() => showReelBrand(reelIndex + 1), 10000);
}

document.querySelectorAll('[data-reel-step]').forEach((button) => {
  button.addEventListener('click', () => {
    showReelBrand(reelIndex + Number(button.dataset.reelStep));
    restartReelTimer();
  });
});
restartReelTimer();
