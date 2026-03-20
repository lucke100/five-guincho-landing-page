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
