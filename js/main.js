/**
 * Portfólio Profissional - Matheus Militão
 * Lógica de Interface conforme Briefing Oficial
 * Recursos: Navbar Scroll Spy, Mobile Drawer, Filtro de Projetos, Dark/Light Mode e Formulário
 */

document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================================
     1. TEMA CLARO / ESCURO (DARK/LIGHT MODE COM PERSISTÊNCIA)
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
     2. NAVBAR: SCROLL EFFECT & SCROLL SPY
     ========================================================================= */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Efeito de sombra sutil na navbar ao rolar
    if (navbar) {
      if (scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Scroll Spy (Marca link ativo)
    let currentSectionId = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* =========================================================================
     3. MENU MOBILE (HAMBURGER DRAWER)
     ========================================================================= */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
      hamburgerBtn.innerHTML = isOpen
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        hamburgerBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      });
    });
  }

  /* =========================================================================
     4. FILTROS DE PROJETOS (SEÇÃO 17 DO BRIEFING)
     ========================================================================= */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* =========================================================================
     5. CÓPIA RÁPIDA DE E-MAIL COM FEEDBACK
     ========================================================================= */
  const copyBtn = document.getElementById('copy-email-btn');
  const copyToast = document.getElementById('copy-toast');
  const emailTarget = 'matheussmilitao@gmail.com';

  if (copyBtn && copyToast) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(emailTarget);
      } catch (err) {
        const temp = document.createElement('textarea');
        temp.value = emailTarget;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
      }

      copyToast.style.display = 'block';
      setTimeout(() => {
        copyToast.style.display = 'none';
      }, 3000);
    });
  }

  /* =========================================================================
     6. FORMULÁRIO DE CONTATO (SIMPLES - SEÇÃO 19 DO BRIEFING)
     ========================================================================= */
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        alert('Por favor, preencha todos os campos.');
        return;
      }

      const subject = `Contato Portfólio - ${name}`;
      const body = `Olá Matheus,\n\nMeu nome é ${name} (${email}).\n\nMensagem:\n${message}\n\nEnviado através do seu site de portfólio.`;

      const mailtoUrl = `mailto:${emailTarget}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '✓ Abrindo e-mail...';
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
