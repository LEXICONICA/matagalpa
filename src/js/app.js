document.addEventListener("DOMContentLoaded", () => {
  // Constante para el intervalo
  const INTERVAL = 5000;

  // Inicializar carrusel del Hero (si existe)
  const heroCarouselEl = document.getElementById("heroCarousel");
  if (heroCarouselEl) {
    const myCarousel = new bootstrap.Carousel(heroCarouselEl, {
      interval: INTERVAL,
      wrap: true,
      pause: false,
    });
    heroCarouselEl.addEventListener("slid.bs.carousel", () => myCarousel.cycle());
  }

  // Datos de las cards
  const cardsData = [
    {
      img: "src/img/Cafe-Matagalpa.jpg",
      title: "Cafetales",
      text: "Conoce el proceso de producción del café en las famosas fincas matagalpinas.",
    },
    {
      img: "src/img/Cascada-La-Luna.jpg",
      title: "Cascadas",
      text: "Descubre impresionantes caídas de agua en medio de la naturaleza.",
    },
    {
      img: "src/img/cerro_apante.jpg",
      title: "Cerro Apante",
      text: "Disfruta de impresionantes vistas desde el mirador natural de la ciudad.",
    },
    {
      img: "src/img/Pueblo-colonial.jpg",
      title: "Pueblos Coloniales",
      text: "Explora la arquitectura tradicional de los pueblos aledaños.",
    },
    {
      img: "src/img/Reserva-natural.jpg",
      title: "Reserva Natural",
      text: "Adéntrate en los senderos de nuestras áreas protegidas.",
    },
    {
      img: "src/img/Selva-Negra.jpg",
      title: "Selva negra",
      text: "Donde se puede tener la oportunidad de observar su variedad de fauna y flora.",
    },
  ];

  const template = document.getElementById("cardTemplate");
  const carouselInner = document.querySelector("#cardsCarousel .carousel-inner");

  // Función para agrupar los datos según items por slide
  const groupItems = (data, itemsPerSlide) => {
    const grouped = [];
    for (let i = 0; i < data.length; i += itemsPerSlide) {
      grouped.push(data.slice(i, i + itemsPerSlide));
    }
    return grouped;
  };

  // Crear slides de cards
  const buildSlides = () => {
    const groupedData = groupItems(cardsData, 3);
    groupedData.forEach((group, index) => {
      const slide = document.createElement("div");
      slide.className = `carousel-item ${index === 0 ? "active" : ""}`;

      const row = document.createElement("div");
      row.className = "row g-4 flex-nowrap";

      group.forEach(card => {
        const clone = template.content.cloneNode(true);
        const img = clone.querySelector("img");
        if (img) {
          img.src = card.img;
          img.alt = card.title;
        }
        const titleEl = clone.querySelector(".card-title");
        if (titleEl) titleEl.textContent = card.title;
        const textEl = clone.querySelector(".card-text");
        if (textEl) textEl.textContent = card.text;
        row.appendChild(clone);
      });

      slide.appendChild(row);
      carouselInner.appendChild(slide);
    });
  };

  buildSlides();

  // Inicializar carrusel de cards (si existe)
  const cardsCarouselEl = document.getElementById("cardsCarousel");
  if (cardsCarouselEl) {
    new bootstrap.Carousel(cardsCarouselEl, {
      interval: INTERVAL,
      wrap: true,
      touch: true,
    });
  }

  // Función para ajustar la retícula responsiva
  const adjustCarouselRows = () => {
    const items = window.innerWidth < 768 ? 1 : 3;
    document.querySelectorAll(".carousel-item .row").forEach(row => {
      row.classList.remove("flex-nowrap");
      row.querySelectorAll(".col").forEach(col => {
        col.style.flex = `0 0 ${100 / items}%`;
        col.style.maxWidth = `${100 / items}%`;
      });
      row.classList.add("flex-nowrap");
    });
  };

  window.addEventListener("resize", adjustCarouselRows);
  adjustCarouselRows(); // Ajuste inicial

  document.querySelectorAll('.culture-card').forEach(card => {
    card.addEventListener('click', function () {
      const content = this.querySelector('.card-content');
      const toggle = this.querySelector('.toggle-icon');

      // Alterna la visualización del contenido
      if (content.style.display === 'block') {
        content.style.display = 'none';
        toggle.textContent = '+';
      } else {
        // Cierra otros contenidos abiertos
        document.querySelectorAll('.card-content').forEach(c => c.style.display = 'none');
        document.querySelectorAll('.toggle-icon').forEach(t => t.textContent = '+');
        content.style.display = 'block';
        toggle.textContent = '–';
      }
    });
  });
  const galleryCarousel = document.querySelector(".gallery-carousel");
  if (galleryCarousel) {
    const items = galleryCarousel.querySelectorAll(".carousel-item");
    const dots = galleryCarousel.querySelectorAll(".carousel-pagination .dot");
    const prevButton = galleryCarousel.querySelector(".carousel-control.prev");
    const nextButton = galleryCarousel.querySelector(".carousel-control.next");
    let currentIndex = 0;
    const intervalTime = 5000;
    let carouselInterval;

    function showSlide(index) {
      items.forEach((item, i) => {
        item.classList.toggle("active", i === index);
      });
      if (dots.length) {
        dots.forEach((dot, i) => {
          dot.classList.toggle("active", i === index);
        });
      }
      currentIndex = index;
    }

    function nextSlide() {
      let nextIndex = (currentIndex + 1) % items.length;
      showSlide(nextIndex);
    }

    function prevSlide() {
      let prevIndex = (currentIndex - 1 + items.length) % items.length;
      showSlide(prevIndex);
    }

    // Eventos para los botones
    if (nextButton) {
      nextButton.addEventListener("click", () => {
        nextSlide();
        resetInterval();
      });
    }
    if (prevButton) {
      prevButton.addEventListener("click", () => {
        prevSlide();
        resetInterval();
      });
    }

    // Eventos para la paginación
    if (dots.length) {
      dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
          showSlide(i);
          resetInterval();
        });
      });
    }

    function resetInterval() {
      clearInterval(carouselInterval);
      carouselInterval = setInterval(nextSlide, intervalTime);
    }

    // Iniciar autoplay
    carouselInterval = setInterval(nextSlide, intervalTime);

    // Mostrar el primer slide
    showSlide(0);
  }

  /*** Tradiciones */
  // Funcionalidad para "Leer más"
  document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(button.dataset.target);
      target.classList.toggle('d-none');
      button.textContent = target.classList.contains('d-none') ? 'Leer más...' : 'Mostrar menos';
    });
  });

  // Animación al hacer scroll
  const tradicionesSection = document.getElementById('tradiciones');
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.tradicion-card').forEach((card, index) => {
          setTimeout(() => {
            card.style.opacity = 1;
            card.style.transform = 'translateY(0)';
          }, index * 150);
        });
      }
    });
  }, observerOptions);

  observer.observe(tradicionesSection);

  // Inicializar animaciones
  document.querySelectorAll('.tradicion-card').forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease';
  });
});
