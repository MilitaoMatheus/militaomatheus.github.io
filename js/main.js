/**
 * Main Interactions & Logic
 * Matheus Militão - Portfólio Profissional
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navbar Scroll Effect & Active Section Tracker
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Tracker de seção ativa
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Menu Toggler
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileToggle.innerHTML = isOpen
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    // Fechar ao clicar em um link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      });
    });
  }

  // 3. Copiar E-mail para Área de Transferência com Feedback Visual
  const copyBtn = document.getElementById('copy-email-btn');
  const copyFeedback = document.getElementById('copy-feedback');
  const emailAddress = 'matheussmilitao@gmail.com';

  if (copyBtn && copyFeedback) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(emailAddress);
        copyFeedback.style.display = 'inline-block';
        copyFeedback.textContent = 'Copiado! ✓';
        setTimeout(() => {
          copyFeedback.style.display = 'none';
        }, 2800);
      } catch (err) {
        // Fallback caso clipboard API falhe
        const textarea = document.createElement('textarea');
        textarea.value = emailAddress;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        copyFeedback.style.display = 'inline-block';
        copyFeedback.textContent = 'Copiado! ✓';
        setTimeout(() => {
          copyFeedback.style.display = 'none';
        }, 2800);
      }
    });
  }

  // 4. Animação das Barras de Habilidades no Scroll (Intersection Observer)
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  if ('IntersectionObserver' in window && skillBars.length > 0) {
    const skillsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            const targetWidth = bar.getAttribute('data-width') || '85%';
            bar.style.width = targetWidth;
            observer.unobserve(bar);
          }
        });
      },
      { threshold: 0.25 }
    );

    skillBars.forEach((bar) => skillsObserver.observe(bar));
  } else {
    skillBars.forEach((bar) => {
      bar.style.width = bar.getAttribute('data-width') || '85%';
    });
  }

  // 5. Formulário de Contato com Validação & Ação Direta
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

      // Monta URI mailto com assunto e corpo codificados
      const mailtoUrl = `mailto:matheussmilitao@gmail.com?subject=${encodeURIComponent(
        `[Portfólio] ${subject} - ${name}`
      )}&body=${encodeURIComponent(
        `Olá Matheus,\n\nMeu nome é ${name} (${email}).\n\nMensagem:\n${message}\n\nEnviado através do seu website de portfólio.`
      )}`;

      // Redireciona com segurança
      window.location.href = mailtoUrl;

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `<span>✓ Abrindo seu gerenciador de e-mail...</span>`;
        submitBtn.disabled = true;
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          contactForm.reset();
        }, 4000);
      }
    });
  }

  // 6. Alternância de Tema (Dark / Light Mode) com Persistência
  const themeToggle = document.getElementById('theme-toggle');

  const updateTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      // Ignora erro se cookies/storage desabilitados
    }

    if (themeToggle) {
      const isLight = theme === 'light';
      themeToggle.setAttribute('title', isLight ? 'Alternar para Modo Escuro' : 'Alternar para Modo Claro');
      themeToggle.setAttribute('aria-label', isLight ? 'Alternar para Modo Escuro' : 'Alternar para Modo Claro');
    }
  };

  if (themeToggle) {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    updateTheme(currentTheme);

    themeToggle.addEventListener('click', () => {
      const active = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = active === 'light' ? 'dark' : 'light';
      updateTheme(nextTheme);
    });
  }
});
