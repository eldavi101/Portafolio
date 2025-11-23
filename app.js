// Año dinámico en el footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mostrar/ocultar secciones al hacer clic en el header
const navLinks = document.querySelectorAll('.nav a');
const portfolioSection = document.getElementById('portfolio');
const serviciosSection = document.getElementById('servicios');
const contactoSection = document.getElementById('contacto');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href').substring(1);
    
    // Ocultar todas las secciones excepto contacto (siempre visible)
    if (targetId === 'portfolio') {
      portfolioSection.classList.toggle('hidden');
      serviciosSection.classList.add('hidden');
    } else if (targetId === 'servicios') {
      serviciosSection.classList.toggle('hidden');
      portfolioSection.classList.add('hidden');
    }
  });
});

// Filtros por evento y tipo
const gallery = document.getElementById('gallery');
const chipsEvent = document.querySelectorAll('[data-filter-event]');
const chipsType  = document.querySelectorAll('[data-filter-type]');

let activeEvent = 'all';
let activeType  = 'all';

function applyFilters(){
  const cards = gallery.querySelectorAll('.card');
  cards.forEach(card=>{
    const ev  = card.dataset.event;
    const typ = card.dataset.type;

    const matchEvent = (activeEvent === 'all' || ev === activeEvent);
    const matchType  = (activeType  === 'all' || typ === activeType);

    card.style.display = (matchEvent && matchType) ? '' : 'none';
  });
}

chipsEvent.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    chipsEvent.forEach(b=>b.classList.remove('is-active'));
    btn.classList.add('is-active');
    activeEvent = btn.dataset.filterEvent;
    applyFilters();
  });
});

chipsType.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    chipsType.forEach(b=>b.classList.remove('is-active'));
    btn.classList.add('is-active');
    activeType = btn.dataset.filterType;
    applyFilters();
  });
});

// Demo de envío de formulario (sólo feedback visual)
const sendBtn = document.getElementById('sendDemo');
const formMsg = document.getElementById('formMsg');

sendBtn.addEventListener('click', ()=>{
  formMsg.textContent = '¡Gracias! Tu mensaje fue registrado. Te responderemos a la brevedad.';
  setTimeout(()=> formMsg.textContent = '', 5000);
});
