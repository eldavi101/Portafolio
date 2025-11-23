// Año dinámico en el footer
document.getElementById('year').textContent = new Date().getFullYear();

// Filtros por evento y tipo (solo para portafolio.html)
const gallery = document.getElementById('gallery');

if (gallery) {
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
}
