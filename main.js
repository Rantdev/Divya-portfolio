/* ============================================================
   PORTFOLIO — UI/UX Designer  |  main.js
   All interactive behaviours: navbar, mobile menu,
   scroll animations, active nav links, contact form
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. NAVBAR — add shadow on scroll ─────────────────────── */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 16);
  }, { passive: true });


  /* ── 2. HAMBURGER — mobile menu toggle ────────────────────── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    mobileMenu.classList.toggle('open', isOpen);
    // Prevent background scroll when menu is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu when any mobile nav link is clicked
  document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });


  /* ── 3. SCROLL REVEAL — fade/slide elements in on scroll ──── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Unobserve after reveal so it only fires once
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -32px 0px'
    }
  );

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    .forEach(el => revealObserver.observe(el));


  /* ── 4. ACTIVE NAV LINK — highlight current section ───────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === '#' + entry.target.id;
            link.style.color = isActive ? 'var(--text)' : '';
          });
        }
      });
    },
    { threshold: 0.45 }
  );

  sections.forEach(section => sectionObserver.observe(section));


  /* ── 5. CONTACT FORM — simulated submit with success state ── */
  const form       = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('.btn-send');

      // Show loading state
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled    = true;

      // Simulate async network request (replace with real fetch/API call)
      setTimeout(() => {
        form.reset();
        submitBtn.style.display = 'none';
        successMsg.style.display = 'block';
      }, 1400);
    });
  }


  /* ── 6. SMOOTH SCROLL — for any internal anchor links ─────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href').slice(1);
      const target   = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
