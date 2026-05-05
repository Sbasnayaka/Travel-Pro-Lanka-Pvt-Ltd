/**
 * Travel Pro Lanka Pvt Ltd - Main JavaScript
 * Handles interactivity: Hero slider, Mobile navigation, and Scroll tracking.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Hero Slider Logic ---
  const slides = [
    {
      img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
      title: 'Golden beaches & island sunsets',
      text: 'Luxury, comfort and local expertise for every traveler.'
    },
    {
      img: 'https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?auto=format&fit=crop&w=1400&q=80',
      title: 'Hill country journeys',
      text: 'Tea plantations, mountain air, and slow scenic drives.'
    },
    {
      img: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1400&q=80',
      title: 'City comforts & heritage',
      text: 'Culture-rich experiences with modern travel ease.'
    }
  ];

  const heroImg = document.getElementById('heroSlideImg');
  const heroTitle = document.getElementById('heroSlideTitle');
  const heroText = document.getElementById('heroSlideText');
  let slideIndex = 0;

  if (heroImg && heroTitle && heroText) {
    setInterval(() => {
      slideIndex = (slideIndex + 1) % slides.length;
      const s = slides[slideIndex];
      
      // Smooth fade transition
      heroImg.style.opacity = 0;
      setTimeout(() => {
        heroImg.src = s.img;
        heroTitle.textContent = s.title;
        heroText.textContent = s.text;
        heroImg.style.opacity = 1;
      }, 350);
    }, 4200);
  }

  // --- Mobile Menu Toggle ---
  const menuBtn = document.getElementById('menuBtn');
  const navBar = document.getElementById('navBar');

  if (menuBtn && navBar) {
    menuBtn.addEventListener('click', () => {
      const open = navBar.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navBar.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Active Nav on Scroll (Intersection Observer) ---
  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.nav-links a')];

  if (sections.length > 0 && navLinks.length > 0) {
    const observerOptions = {
      rootMargin: '-40% 0px -45% 0px',
      threshold: 0.02
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(a => {
            const href = a.getAttribute('href');
            // Support both #id and index.html#id
            const isActive = href === `#${entry.target.id}` || href === `index.html#${entry.target.id}`;
            a.classList.toggle('active', isActive);
          });
        }
      });
    }, observerOptions);

    sections.forEach(s => observer.observe(s));
  } else {
    // If not on the main page, handle active state based on current URL
    const currentPath = window.location.pathname;
    navLinks.forEach(a => {
      const href = a.getAttribute('href');
      if (href && currentPath.includes(href)) {
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    });
  }

  // --- Gallery Lightbox ---
  const galleryImages = document.querySelectorAll('.gallery-page-grid img, .gallery-grid img');
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  if (galleryImages.length > 0 && lightbox && lightboxImg && lightboxClose) {
    galleryImages.forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
      });
    });

    const closeBox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    lightboxClose.addEventListener('click', closeBox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeBox();
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeBox();
    });
  }
});
