// Año dinámico en el footer
document.getElementById('year').textContent = new Date().getFullYear();

// Sistema de portafolio dinámico
const gallery = document.getElementById('gallery');

if (gallery) {
  let portfolioData = {};
  let activeCategory = 'all';

  // Cargar datos del JSON
  fetch('portfolio-data.json')
    .then(response => response.json())
    .then(data => {
      portfolioData = data;
      renderGallery('all');
    })
    .catch(error => {
      console.error('Error cargando portfolio:', error);
      gallery.innerHTML = '<p class="error-message">Error al cargar el portafolio. Por favor, intenta más tarde.</p>';
    });

  // Función para renderizar la galería
  function renderGallery(category) {
    gallery.innerHTML = '';
    
    let itemsToShow = [];
    
    if (category === 'all') {
      // Mostrar todos los items de todas las categorías
      Object.values(portfolioData).forEach(categoryItems => {
        itemsToShow = itemsToShow.concat(categoryItems);
      });
    } else {
      // Mostrar solo items de la categoría seleccionada
      itemsToShow = portfolioData[category] || [];
    }

    if (itemsToShow.length === 0) {
      gallery.innerHTML = '<p class="empty-message">No hay trabajos en esta categoría aún. ¡Pronto agregaremos más!</p>';
      return;
    }

    // Crear tarjetas para cada item
    itemsToShow.forEach(item => {
      const card = createCard(item);
      gallery.appendChild(card);
    });
  }

  // Función para crear una tarjeta según el tipo
  function createCard(item) {
    const card = document.createElement('div');
    card.className = 'card';

    let content = '';

    switch(item.type) {
      case 'image':
        content = `
          <img src="${item.path}" alt="${item.title}" loading="lazy">
          <div class="card-body">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <span class="card-badge">📷 Imagen</span>
          </div>
        `;
        break;

      case 'video':
        content = `
          <video controls poster="${item.thumbnail || ''}" preload="metadata">
            <source src="${item.path}" type="video/mp4">
            Tu navegador no soporta video.
          </video>
          <div class="card-body">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <span class="card-badge">🎬 Video</span>
          </div>
        `;
        break;

      case 'pdf':
        content = `
          <div class="pdf-preview">
            <div class="pdf-icon">📄</div>
          </div>
          <div class="card-body">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <a href="${item.path}" target="_blank" class="btn btn-primary btn-small">Abrir PDF</a>
            <span class="card-badge">📄 PDF</span>
          </div>
        `;
        break;

      case 'link':
        content = `
          <div class="link-preview">
            <div class="link-icon">🔗</div>
          </div>
          <div class="card-body">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <a href="${item.path}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-small">Visitar sitio</a>
            <span class="card-badge">🔗 Enlace</span>
          </div>
        `;
        break;
    }

    card.innerHTML = content;
    return card;
  }

  // Event listeners para los botones de filtro
  const filterButtons = document.querySelectorAll('[data-filter-event]');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Actualizar botón activo
      filterButtons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      
      // Obtener categoría y renderizar
      activeCategory = btn.dataset.filterEvent;
      renderGallery(activeCategory);
    });
  });
}
