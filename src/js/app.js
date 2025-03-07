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




  // Inicializar Swiper
  const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: {
      delay: 5000,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
  });

  // Acordeón interactivo
  document.querySelectorAll('.culture-card').forEach(card => {
    card.addEventListener('click', () => {
      const content = card.querySelector('.card-content');
      content.style.display = content.style.display === 'block' ? 'none' : 'block';
      card.classList.toggle('active');
    });
  });

  // Animación al hacer scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  });

  document.querySelectorAll('.culture-card, .gallery-carousel').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
  });

});
