/* =========================================
   KOSMUS STUDIO
   script.js
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ─── NAV: scroll state ────────────────────────────────
  const nav = document.getElementById('nav');

  const handleScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();


  // ─── NAV: mobile toggle ───────────────────────────────
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');
  const spans     = navToggle.querySelectorAll('span');

  const openNav = () => {
    navLinks.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    spans[0].style.transform = 'translateY(4px) rotate(45deg)';
    spans[1].style.transform = 'translateY(-4px) rotate(-45deg)';
  };

  const closeNav = () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    spans[0].style.transform = '';
    spans[1].style.transform = '';
  };

  navToggle.addEventListener('click', () => {
    navLinks.classList.contains('open') ? closeNav() : openNav();
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) closeNav();
  });


  // ─── SCROLL REVEAL ────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  revealEls.forEach(el => observer.observe(el));

  // Hero staggered load
  window.addEventListener('load', () => {
    const heroEls = document.querySelectorAll('.hero .reveal');
    heroEls.forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), 150 + i * 130);
    });
  });


  // ─── SMOOTH SCROLL ────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = nav.offsetHeight + 20;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  // ─── APPLY FORM ───────────────────────────────────────
  const form        = document.getElementById('applyForm');
  const formSuccess = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const fields = form.querySelectorAll('input[required], select[required], textarea[required]');
      let valid = true;

      fields.forEach(field => {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderBottomColor = '#8B3A3A';
          field.addEventListener('input', () => {
            field.style.borderBottomColor = '';
          }, { once: true });
        }
      });

      if (!valid) return;

      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.textContent = 'Submitting…';
      submitBtn.disabled = true;

      setTimeout(() => {
        form.style.transition = 'opacity 0.4s ease';
        form.style.opacity = '0';
        setTimeout(() => {
          form.style.display = 'none';
          formSuccess.classList.add('visible');
        }, 400);
      }, 900);
    });
  }

});