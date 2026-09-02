/**
 * Portfólio Minimalista & Editorial - Matheus Militão
 * Interatividades: Carrossel Touch-Friendly, Floating Dock, Dark/Light Mode & Cópia de E-mail
 */

document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================================
     1. TEMA CLARO / ESCURO (DARK / LIGHT MODE COM PERSISTÊNCIA)
     ========================================================================= */
  const themeToggle = document.getElementById('theme-toggle');

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {}

    if (themeToggle) {
      const isLight = theme === 'light';
      themeToggle.setAttribute('title', isLight ? 'Alternar para Modo Escuro' : 'Alternar para Modo Claro');
      themeToggle.setAttribute('aria-label', isLight ? 'Alternar para Modo Escuro' : 'Alternar para Modo Claro');
    }
  };

  if (themeToggle) {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    setTheme(currentTheme);

    themeToggle.addEventListener('click', () => {
      const active = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = active === 'light' ? 'dark' : 'light';
      setTheme(nextTheme);
    });
  }

  /* =========================================================================
     2. FLOATING DOCK NAVBAR & GAVETA MOBILE
     ========================================================================= */
  const menuToggle = document.querySelector('.dock-menu-toggle');
  const drawer = document.getElementById('dock-drawer');
  const drawerItems = document.querySelectorAll('.drawer-item');
  const dockLinks = document.querySelectorAll('.dock-link');
  const sections = document.querySelectorAll('section[id]');

  if (menuToggle && drawer) {
    menuToggle.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      menuToggle.innerHTML = isOpen
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    drawerItems.forEach((item) => {
      item.addEventListener('click', () => {
        drawer.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      });
    });
  }

  // Active Link Tracker
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    dockLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  /* =========================================================================
     3. CARROSSEL INTERATIVO DE PROJETOS (SLIM, SWIPE & CONTROLS)
     ========================================================================= */
  const carouselTrack = document.getElementById('carousel-track');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const counterCurrent = document.getElementById('counter-current');
  const counterTotal = document.getElementById('counter-total');
  const dotsContainer = document.getElementById('carousel-dots');
  const filterTabs = document.querySelectorAll('.filter-tab');

  if (carouselTrack) {
    let slides = Array.from(carouselTrack.querySelectorAll('.carousel-card'));
    let activeSlides = [...slides];
    let currentIndex = 0;

    const setupDots = () => {
      dotsContainer.innerHTML = '';
      activeSlides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = `carousel-dot ${idx === currentIndex ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Ir para slide ${idx + 1}`);
        dot.addEventListener('click', () => scrollToIndex(idx));
        dotsContainer.appendChild(dot);
      });
      updateMeta();
    };

    const updateMeta = () => {
      const total = activeSlides.length;
      if (counterTotal) counterTotal.textContent = total < 10 ? `0${total}` : total;
      if (counterCurrent) {
        const currentDisplay = Math.min(currentIndex + 1, total);
        counterCurrent.textContent = currentDisplay < 10 ? `0${currentDisplay}` : currentDisplay;
      }

      if (prevBtn) prevBtn.disabled = currentIndex === 0;
      if (nextBtn) nextBtn.disabled = currentIndex >= activeSlides.length - 1;

      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    };

    const scrollToIndex = (index) => {
      if (index < 0 || index >= activeSlides.length) return;
      currentIndex = index;
      const target = activeSlides[currentIndex];
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start'
        });
      }
      updateMeta();
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) scrollToIndex(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentIndex < activeSlides.length - 1) scrollToIndex(currentIndex + 1);
      });
    }

    // Scroll listener para sincronizar contadores em arrastos por touch
    let scrollDebounce;
    carouselTrack.addEventListener('scroll', () => {
      clearTimeout(scrollDebounce);
      scrollDebounce = setTimeout(() => {
        const trackRect = carouselTrack.getBoundingClientRect();
        let closestIndex = 0;
        let minDiff = Infinity;

        activeSlides.forEach((slide, idx) => {
          const slideRect = slide.getBoundingClientRect();
          const diff = Math.abs(slideRect.left - trackRect.left);
          if (diff < minDiff) {
            minDiff = diff;
            closestIndex = idx;
          }
        });

        if (closestIndex !== currentIndex) {
          currentIndex = closestIndex;
          updateMeta();
        }
      }, 50);
    }, { passive: true });

    // Filtros de Categoria
    filterTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.getAttribute('data-filter');

        slides.forEach((slide) => {
          const category = slide.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            slide.classList.remove('hidden');
          } else {
            slide.classList.add('hidden');
          }
        });

        activeSlides = slides.filter(s => !s.classList.contains('hidden'));
        currentIndex = 0;
        setupDots();
        scrollToIndex(0);
      });
    });

    // Navegação via teclado
    window.addEventListener('keydown', (e) => {
      const projectsSection = document.getElementById('projetos');
      if (!projectsSection) return;
      const rect = projectsSection.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;

      if (inView) {
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
          scrollToIndex(currentIndex - 1);
        } else if (e.key === 'ArrowRight' && currentIndex < activeSlides.length - 1) {
          scrollToIndex(currentIndex + 1);
        }
      }
    });

    setupDots();
  }

  /* =========================================================================
     4. COPIAR E-MAIL (1 CLIQUE) COM FEEDBACK DISCRETO
     ========================================================================= */
  const copyHeroBtn = document.getElementById('copy-email-btn');
  const copyHeroText = document.getElementById('copy-btn-text');
  const emailLink = document.querySelector('.email-display-link');
  const copyToast = document.getElementById('copy-toast');
  const emailAddress = 'matheussmilitao@gmail.com';

  const copyEmail = async (elementTrigger) => {
    try {
      await navigator.clipboard.writeText(emailAddress);
    } catch (err) {
      const ta = document.createElement('textarea');
      ta.value = emailAddress;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }

    if (elementTrigger === 'hero' && copyHeroText) {
      copyHeroText.textContent = 'Copiado! ✓';
      setTimeout(() => { copyHeroText.textContent = 'Copiar E-mail'; }, 2500);
    }

    if (copyToast) {
      copyToast.style.display = 'inline-block';
      setTimeout(() => { copyToast.style.display = 'none'; }, 2500);
    }
  };

  if (copyHeroBtn) {
    copyHeroBtn.addEventListener('click', () => copyEmail('hero'));
  }

  if (emailLink) {
    emailLink.addEventListener('click', (e) => {
      // Se o usuário clicar com o botão esquerdo, copia e abre o cliente
      copyEmail('contact');
    });
  }

});
