// Año dinámico en el footer
document.getElementById('year').textContent = new Date().getFullYear();

// Sistema de galería dinámico
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
      console.error('Error cargando galería:', error);
      gallery.innerHTML = '<p class="error-message">Error al cargar la galería. Por favor, intenta más tarde.</p>';
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
    
    // Agregar evento click para abrir modal
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      // Si se hizo clic en un enlace o botón, no abrir modal
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
        return;
      }
      openModal(item);
    });
    
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

  // Sistema de Modal
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.querySelector('.modal-close');
  const modalOverlay = document.querySelector('.modal-overlay');

  function openModal(item) {
    let modalContent = '';

    switch(item.type) {
      case 'image':
        modalContent = `
          <img src="${item.path}" alt="${item.title}">
        `;
        break;

      case 'video':
        modalContent = `
          <video controls autoplay style="max-width: 90vw; max-height: 85vh;">
            <source src="${item.path}" type="video/mp4">
            Tu navegador no soporta video.
          </video>
        `;
        break;

      case 'pdf':
        modalContent = `
          <iframe src="${item.path}" style="width: 90vw; height: 85vh;"></iframe>
        `;
        break;

      case 'link':
        modalContent = `
          <div class="modal-info">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <a href="${item.path}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Visitar sitio web</a>
          </div>
        `;
        break;
    }

    modalBody.innerHTML = modalContent;
    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden'; // Prevenir scroll
  }

  function closeModal() {
    modal.classList.remove('is-active');
    document.body.style.overflow = ''; // Restaurar scroll
    
    // Limpiar contenido después de la animación
    setTimeout(() => {
      modalBody.innerHTML = '';
    }, 300);
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
  }

  // Cerrar modal con tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });
}
