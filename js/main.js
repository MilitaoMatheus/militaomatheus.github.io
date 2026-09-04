/**
 * Portfólio Profissional - Matheus Militão
 * Lógica de Interface conforme Briefing Oficial
 * Recursos: Navbar Scroll Spy, Mobile Drawer, Filtro de Projetos, Dark/Light Mode e Formulário
 */

document.addEventListener('DOMContentLoaded', () => {


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
     3.5 CARDS DE STACKS INTERATIVOS (MODAL OVERLAY EM EVIDÊNCIA COM BLUR)
     ========================================================================= */
  const stackCards = document.querySelectorAll('.stack-card');
  const modalBackdrop = document.getElementById('stack-modal-backdrop');
  const modalWrapper = document.getElementById('stack-modal-wrapper');
  const modalIcon = document.getElementById('modal-stack-icon');
  const modalNum = document.getElementById('modal-stack-num');
  const modalTitle = document.getElementById('modal-stack-title');
  const modalSummary = document.getElementById('modal-stack-summary');
  const modalBody = document.getElementById('modal-stack-body');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  const openStackModal = (card) => {
    const num = card.querySelector('.stack-num')?.textContent.trim() || '';
    const iconHtml = card.querySelector('.stack-main-icon')?.innerHTML || '';
    const title = card.querySelector('.stack-title')?.textContent.trim() || '';
    const summary = card.querySelector('.stack-summary')?.textContent.trim() || '';
    const itemsHtml = card.querySelector('.tech-items-grid')?.innerHTML || '';

    if (modalNum) modalNum.textContent = `STACK ${num}`;
    if (modalIcon) modalIcon.innerHTML = iconHtml;
    if (modalTitle) modalTitle.textContent = title;
    if (modalSummary) modalSummary.textContent = summary;
    if (modalBody) modalBody.innerHTML = `<div class="tech-items-grid">${itemsHtml}</div>`;

    modalBackdrop?.classList.add('open');
    modalWrapper?.classList.add('open');
    modalWrapper?.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  };

  const closeStackModal = () => {
    modalBackdrop?.classList.remove('open');
    modalWrapper?.classList.remove('open');
    modalWrapper?.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  };

  stackCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.tagName.toLowerCase() === 'a') return;
      openStackModal(card);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openStackModal(card);
      }
    });
  });

  modalCloseBtn?.addEventListener('click', closeStackModal);
  modalBackdrop?.addEventListener('click', closeStackModal);
  modalWrapper?.addEventListener('click', (e) => {
    if (e.target === modalWrapper) {
      closeStackModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalWrapper?.classList.contains('open')) {
      closeStackModal();
    }
  });

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
        const category = card.getAttribute('data-category') || '';
        const cats = category.split(' ');
        if (filter === 'all' || cats.includes(filter)) {
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
