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
     6. FORMULÁRIO DE CONTATO (ENVIO DIRETO VIA API FORM SUBMIT COM TEMPLATE)
     ========================================================================= */
  const contactForm = document.getElementById('contact-form');
  const contactStatus = document.getElementById('contact-status');

  if (contactForm) {
    const showStatus = (htmlContent, type) => {
      if (!contactStatus) return;
      contactStatus.className = `form-status ${type}`;
      contactStatus.innerHTML = htmlContent;
      contactStatus.style.display = 'flex';
      contactStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const messageInput = document.getElementById('form-message');
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) {
        showStatus(`
          <div class="status-content">
            <strong>Campos incompletos</strong>
            <p>Por favor, preencha nome, e-mail e mensagem antes de enviar.</p>
          </div>
        `, 'error');
        return;
      }

      // Validação de formato de e-mail
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showStatus(`
          <div class="status-content">
            <strong>E-mail inválido</strong>
            <p>Por favor, forneça um endereço de e-mail válido para que eu possa responder.</p>
          </div>
        `, 'error');
        return;
      }

      // Estado de envio visual no botão
      const originalBtnHTML = submitBtn ? submitBtn.innerHTML : 'Enviar Mensagem';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add('btn-loading');
        submitBtn.innerHTML = `
          <svg class="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
          </svg>
          <span>Enviando mensagem...</span>
        `;
      }

      if (contactStatus) {
        contactStatus.style.display = 'none';
      }

      // Payload enriquecido com template 'box', ícones e rodapé de assinatura
      const now = new Date();
      const formattedDate = now.toLocaleDateString('pt-BR') + ' às ' + now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

      const payload = {
        _subject: `🌟 [Portfólio] Nova Mensagem de ${name}`,
        _template: 'box',
        _captcha: 'false',
        _replyto: email,
        '💼 Notificação Oficial': 'Nova Mensagem Recebida via Portfólio Web',
        '👤 Nome do Remetente': name,
        '✉️ E-mail para Resposta': email,
        '💬 Mensagem Completa': message,
        '🕒 Data e Horário do Envio': formattedDate,
        '🌐 Origem do Envio': 'Portfólio Web Oficial • https://militaomatheus.github.io',
        '🛡️ Rodapé do Portfólio': 'Matheus Militão • Engenheiro de Software | Soluções Web, Mobile & Cloud • https://github.com/MilitaoMatheus'
      };

      try {
        const response = await fetch('https://formsubmit.co/ajax/matheussmilitao@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok && (data.success === true || data.success === 'true')) {
          showStatus(`
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22" style="flex-shrink: 0; margin-top: 2px;">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <div class="status-content">
              <strong>Mensagem enviada com sucesso!</strong>
              <p>Obrigado pelo contato, ${name}! Sua mensagem foi encaminhada diretamente para meu e-mail pessoal e responderei o mais breve possível.</p>
            </div>
          `, 'success');
          contactForm.reset();
        } else {
          throw new Error(data.message || 'Erro ao processar envio do formulário.');
        }
      } catch (err) {
        console.error('Erro no envio direto:', err);
        showStatus(`
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22" style="flex-shrink: 0; margin-top: 2px;">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <div class="status-content">
            <strong>Não foi possível enviar automaticamente agora.</strong>
            <p>Você pode me enviar diretamente através do e-mail: <a href="mailto:${emailTarget}?subject=Contato%20Portf%C3%B3lio%20-%20${encodeURIComponent(name)}&body=${encodeURIComponent(message)}" class="status-fallback-link">${emailTarget}</a></p>
          </div>
        `, 'error');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.classList.remove('btn-loading');
          submitBtn.innerHTML = originalBtnHTML;
        }
      }
    });
  }

});
