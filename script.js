// ---- Tabs ----
const tabs = document.querySelectorAll('.tab');
const indicator = document.getElementById('tabIndicator');
const panels = document.querySelectorAll('.panel');

function setTab(name){
  tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === name));
  panels.forEach(p => p.classList.toggle('active', p.id === `panel-${name}`));
  const idx = [...tabs].findIndex(t => t.dataset.tab === name);
  indicator.style.transform = `translateX(${idx * 100}%)`;
}

tabs.forEach(tab => tab.addEventListener('click', () => setTab(tab.dataset.tab)));
setTab('pitch');

// ---- /start button just jumps to the app ----
document.getElementById('startBtn').addEventListener('click', () => {
  document.getElementById('app').scrollIntoView({ behavior: 'smooth' });
});

// ---- Unit toggle (m / yd) ----
const unitBtns = document.querySelectorAll('.unit-opt');
let currentUnit = 'm';

unitBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    currentUnit = btn.dataset.unit;
    unitBtns.forEach(b => b.classList.toggle('active', b === btn));
    document.querySelectorAll('.dim-table b').forEach(el => {
      el.textContent = el.dataset[currentUnit];
    });
    // refresh tooltip if it's showing a value
    const tooltip = document.getElementById('tooltip');
    if (tooltip.dataset.active === 'true') {
      tooltip.querySelector('.tooltip-value').textContent = tooltip.dataset[currentUnit];
    }
  });
});

// ---- Pitch hotspots ----
const tooltip = document.getElementById('tooltip');
const hotspots = document.querySelectorAll('.hotspot');

hotspots.forEach(spot => {
  spot.addEventListener('click', () => {
    hotspots.forEach(s => s.classList.remove('pressed'));
    spot.classList.add('pressed');
    tooltip.querySelector('.tooltip-name').textContent = spot.dataset.name;
    tooltip.querySelector('.tooltip-value').textContent =
      currentUnit === 'm' ? spot.dataset.m : spot.dataset.yd;
    tooltip.dataset.m = spot.dataset.m;
    tooltip.dataset.yd = spot.dataset.yd;
    tooltip.dataset.active = 'true';
  });
});

// ---- Rule cards flip ----
document.querySelectorAll('.ref-card').forEach(card => {
  card.addEventListener('click', () => card.classList.toggle('flipped'));
});

// ---- Optional: Telegram Mini App integration ----
// If this page is opened inside Telegram as a Mini App, this expands it
// and matches the app chrome to your palette. Safe to leave in even
// when opened as a normal website — it just won't run.
if (window.Telegram && window.Telegram.WebApp) {
  const tg = window.Telegram.WebApp;
  tg.ready();
  tg.expand();
  tg.setHeaderColor('#0F3D2E');
  tg.setBackgroundColor('#F5F3EA');
}
