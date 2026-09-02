/**
 * Portfólio Matheus Militão - 2026 Redesign
 * Funcionalidades: Carrossel Interativo, Bento Grid Micro-Interactions,
 * Floating Dock, Dark/Light Mode & Terminal Simulado.
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
     2. FLOATING DOCK NAVBAR & MENU MOBILE
     ========================================================================= */
  const mobileToggle = document.querySelector('.dock-mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerLinks = document.querySelectorAll('.drawer-link');
  const dockLinks = document.querySelectorAll('.dock-link');
  const sections = document.querySelectorAll('section[id]');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileToggle.innerHTML = isOpen
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    drawerLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      });
    });
  }

  // Active Link Tracker no Scroll
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
     3. CARROSSEL INTERATIVO DE PROJETOS (TOUCH, SWIPE, ARROWS & FILTROS)
     ========================================================================= */
  const carouselTrack = document.getElementById('carousel-track');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const counterCurrent = document.getElementById('counter-current');
  const counterTotal = document.getElementById('counter-total');
  const paginationContainer = document.getElementById('carousel-pagination');
  const filterChips = document.querySelectorAll('.filter-chip');

  if (carouselTrack) {
    let slides = Array.from(carouselTrack.querySelectorAll('.carousel-slide'));
    let activeSlides = [...slides];
    let currentIndex = 0;

    // Constrói dots de paginação
    const setupPagination = () => {
      paginationContainer.innerHTML = '';
      activeSlides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = `pagination-dot ${idx === currentIndex ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Ir para projeto ${idx + 1}`);
        dot.addEventListener('click', () => scrollToIndex(idx));
        paginationContainer.appendChild(dot);
      });
      updateCounter();
    };

    const updateCounter = () => {
      const total = activeSlides.length;
      if (counterTotal) counterTotal.textContent = total < 10 ? `0${total}` : total;
      if (counterCurrent) {
        const currentDisplay = Math.min(currentIndex + 1, total);
        counterCurrent.textContent = currentDisplay < 10 ? `0${currentDisplay}` : currentDisplay;
      }
      
      // Atualiza estado das setas
      if (prevBtn) prevBtn.disabled = currentIndex === 0;
      if (nextBtn) nextBtn.disabled = currentIndex >= activeSlides.length - 1;

      // Atualiza dots ativos
      const dots = paginationContainer.querySelectorAll('.pagination-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    };

    const scrollToIndex = (index) => {
      if (index < 0 || index >= activeSlides.length) return;
      currentIndex = index;
      const targetSlide = activeSlides[currentIndex];
      if (targetSlide) {
        targetSlide.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start'
        });
      }
      updateCounter();
    };

    // Navegação por setas
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

    // Atualiza índice baseado no scroll do usuário (toque ou mouse)
    let scrollTimeout;
    carouselTrack.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
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
          updateCounter();
        }
      }, 60);
    }, { passive: true });

    // Filtragem por categoria
    filterChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        const filter = chip.getAttribute('data-filter');

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
        setupPagination();
        scrollToIndex(0);
      });
    });

    // Teclado (Setas Esquerda e Direita)
    window.addEventListener('keydown', (e) => {
      const projectsSection = document.getElementById('projetos');
      if (!projectsSection) return;
      const rect = projectsSection.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;

      if (inView) {
        if (e.key === 'ArrowLeft') {
          if (currentIndex > 0) scrollToIndex(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
          if (currentIndex < activeSlides.length - 1) scrollToIndex(currentIndex + 1);
        }
      }
    });

    // Inicialização da paginação
    setupPagination();
  }

  /* =========================================================================
     4. TERMINAL INTERATIVO NO HERO
     ========================================================================= */
  const terminalScreen = document.getElementById('terminal-screen');
  const termButtons = document.querySelectorAll('.term-btn');

  if (terminalScreen && termButtons.length > 0) {
    const appendTerminalCommand = (cmd, outputHtml) => {
      const line = document.createElement('div');
      line.className = 'term-line';
      line.style.marginTop = '0.75rem';
      line.innerHTML = `<span class="term-prompt">visitor@militao:~$</span> <span class="term-cmd">${cmd}</span>`;

      const out = document.createElement('div');
      out.className = 'term-output';
      out.innerHTML = outputHtml;

      terminalScreen.appendChild(line);
      terminalScreen.appendChild(out);
      terminalScreen.scrollTop = terminalScreen.scrollHeight;
    };

    termButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const cmd = btn.getAttribute('data-cmd');

        if (cmd === 'skills') {
          appendTerminalCommand('matheus --skills', `
            <span class="t-gold">Backend:</span> Java, Spring Boot, Python, PHP, C, Node.js<br>
            <span class="t-gold">Dados & Infra:</span> MySQL, SQLite, Linux Ubuntu, Git/GitHub, Apache<br>
            <span class="t-gold">Mobile/Front:</span> Flutter, Dart, Tailwind CSS, HTML5/CSS3<br>
            <span class="t-gold">Negócios:</span> Microsoft Power Platform, KPIs Operacionais
          `);
        } else if (cmd === 'xp') {
          appendTerminalCommand('matheus --experiencia', `
            <span class="t-green">[Atento Brasil]</span> Planejamento Operacional (1a 3m) - Análise de KPIs e Automação Power Platform<br>
            <span class="t-green">[The Schools Challenge]</span> Projeto Destaque com EadKids<br>
            <span class="t-green">[FATEC Osasco]</span> Graduação em Desenvolvimento Multiplataforma (em andamento)<br>
            <span class="t-green">[ETEC Basilides]</span> Técnico em Desenvolvimento de Sistemas (2024)
          `);
        } else if (cmd === 'clear') {
          terminalScreen.innerHTML = `
            <div class="term-line">
              <span class="term-prompt">visitor@militao:~$</span>
              <span class="term-cmd">clear</span>
            </div>
            <div class="term-output term-subtle">
              Terminal pronto. Clique nos botões abaixo ou explore o portfólio.
            </div>
          `;
        }
      });
    });
  }

  /* =========================================================================
     5. COPIAR E-MAIL COM FEEDBACK
     ========================================================================= */
  const copyBtn = document.getElementById('copy-email-btn');
  const copyFeedback = document.getElementById('copy-feedback');
  const emailAddress = 'matheussmilitao@gmail.com';

  if (copyBtn && copyFeedback) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(emailAddress);
        copyFeedback.style.display = 'inline-block';
        setTimeout(() => { copyFeedback.style.display = 'none'; }, 2800);
      } catch (err) {
        const textarea = document.createElement('textarea');
        textarea.value = emailAddress;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        copyFeedback.style.display = 'inline-block';
        setTimeout(() => { copyFeedback.style.display = 'none'; }, 2800);
      }
    });
  }

  /* =========================================================================
     6. FORMULÁRIO DE CONTATO (MAILTO INTELIGENTE)
     ========================================================================= */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const subject = document.getElementById('form-subject').value.trim() || 'Contato através do Portfólio';
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
      }

      const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
        `[Portfólio] ${subject} - ${name}`
      )}&body=${encodeURIComponent(
        `Olá Matheus,\n\nMeu nome é ${name} (${email}).\n\nMensagem:\n${message}\n\nEnviado pelo seu website de portfólio.`
      )}`;

      window.location.href = mailtoUrl;

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `<span>✓ Abrindo seu cliente de e-mail...</span>`;
        submitBtn.disabled = true;
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          contactForm.reset();
        }, 3500);
      }
    });
  }

});
