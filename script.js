// ============================================
// FIVE GUINCHO - Interação & Animação
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // --- State Selector Logic ---
  const selector = document.getElementById('state-selector');
  const ctaSp = document.getElementById('cta-sp');
  const ctaOther = document.getElementById('cta-other');

  if (selector && ctaSp && ctaOther) {
    selector.addEventListener('change', (e) => {
      if (e.target.value === 'SP') {
        ctaSp.classList.remove('hidden');
        ctaSp.classList.add('cta-sp');
        ctaOther.classList.remove('active');
      } else {
        ctaSp.classList.add('hidden');
        ctaSp.classList.remove('cta-sp');
        ctaOther.classList.add('active');
      }
    });
  }

  // --- Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px 60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- Header scroll effect ---
  const header = document.querySelector('.site-header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });

  // --- WhatsApp link generation & Modal ---
  const whatsappNumber = '5511939138005';
  
  const modal = document.getElementById('express-modal');
  const modalCloseBtn = document.getElementById('modal-close');
  const expressForm = document.getElementById('express-form');
  const formLocal = document.getElementById('form-local');
  const formError = document.getElementById('form-error');
  const formFieldsExtended = document.getElementById('form-fields-extended');

  // Open modal on [data-whatsapp] click
  document.querySelectorAll('[data-whatsapp]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // prevent bg scroll
    });
  });

  // Close modal
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Handle Location change inside modal
  if (formLocal) {
    // Hide error initially via CSS rule or set style here just in case
    formError.style.display = 'none';

    formLocal.addEventListener('change', (e) => {
      if (e.target.value === 'SP') {
        formError.style.display = 'none';
        formFieldsExtended.style.display = 'block';
      } else {
        formError.style.display = 'flex';
        formFieldsExtended.style.display = 'none';
      }
    });
  }

  // Handle Form Submit
  if (expressForm) {
    expressForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nome = document.getElementById('form-nome').value;
      const local = formLocal.options[formLocal.selectedIndex].text;
      const tipo = document.getElementById('form-tipo').value;
      const fab = document.getElementById('form-fab').value;
      const cor = document.getElementById('form-cor').value;
      const placa = document.getElementById('form-placa').value;
      
      const cotacaoRadios = document.getElementsByName('cotacao');
      let cotacaoVal = '';
      for (const radio of cotacaoRadios) {
        if (radio.checked) {
          cotacaoVal = radio.value;
          break;
        }
      }

      const rawMsg = `Olá! Gostaria de solicitar um orçamento.\n*Nome:* ${nome}\n*Localização:* ${local}\n*Veículo:* ${tipo} - ${fab}\n*Cor:* ${cor}\n*Placa:* ${placa}\n*Status Cotação:* ${cotacaoVal}`;

      const whatsappMessage = encodeURIComponent(rawMsg);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
      
      window.open(whatsappUrl, '_blank');
      closeModal();
      expressForm.reset();
      
      // Reset form states
      formError.style.display = 'none';
      formFieldsExtended.style.display = 'block';
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // --- Year in footer ---
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
