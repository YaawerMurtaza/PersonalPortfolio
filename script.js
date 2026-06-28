/* ============================================================
   CURTAIN INTRO ANIMATION — PIRATE FANTASY EDITION
============================================================ */
(function initCurtain() {
  const curtain = document.getElementById('curtain');
  if (!curtain) return;

  const HOLD_MS    = 2500;  /* how long curtain stays visible   */
  const SLIDE_MS   = 1300;  /* must match CSS transition        */
  const CLEANUP_MS = SLIDE_MS + 100;

  /* ── spawn twinkling stars in top panel ── */
  const starsWrap = document.getElementById('c-stars');
  if (starsWrap) {
    for (let i = 0; i < 55; i++) {
      const s = document.createElement('div');
      s.className = 'c-star';
      const size = Math.random() * 2.5 + 0.8;
      s.style.cssText = [
        `width:${size}px`,
        `height:${size}px`,
        `left:${Math.random() * 100}%`,
        `top:${Math.random() * 100}%`,
        `animation-duration:${(Math.random() * 2.5 + 1.2).toFixed(2)}s`,
        `animation-delay:${(Math.random() * 3).toFixed(2)}s`,
      ].join(';');
      starsWrap.appendChild(s);
    }
  }

  /* ── spawn floating coins in bottom panel ── */
  const coinsWrap = document.getElementById('c-coins');
  if (coinsWrap) {
    for (let i = 0; i < 18; i++) {
      const c = document.createElement('div');
      c.className = 'c-coin';
      const size = Math.random() * 6 + 5;
      c.style.cssText = [
        `width:${size}px`,
        `height:${size}px`,
        `left:${Math.random() * 100}%`,
        `bottom:${Math.random() * 30}%`,
        `animation-duration:${(Math.random() * 4 + 3).toFixed(2)}s`,
        `animation-delay:${(Math.random() * 2.5).toFixed(2)}s`,
      ].join(';');
      coinsWrap.appendChild(c);
    }
  }

  /* ── lock scroll during animation ── */
  document.body.style.overflow = 'hidden';

  /* ── trigger slide after hold ── */
  window.addEventListener('load', function () {
    setTimeout(function () {
      curtain.classList.add('open');
      setTimeout(function () {
        curtain.classList.add('done');
        document.body.style.overflow = '';
      }, CLEANUP_MS);
    }, HOLD_MS);
  });
})();


/* ============================================================
   TYPED TEXT
============================================================ */
(function initTyped() {
  const el    = document.getElementById('typed');
  if (!el) return;

  const phrases = [
    'Shopify Developer',
    'WordPress Expert',
    'Custom Web Developer',
    'Graphic Designer',
    'UI / UX Designer',
  ];

  let pi = 0, ci = 0, deleting = false;

  function tick() {
    const phrase = phrases[pi];
    el.textContent = deleting ? phrase.slice(0, ci--) : phrase.slice(0, ci++);

    let delay = deleting ? 55 : 90;

    if (!deleting && ci > phrase.length) {
      delay = 1800;
      deleting = true;
    } else if (deleting && ci < 0) {
      deleting = false;
      ci = 0;
      pi = (pi + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(tick, delay);
  }

  tick();
})();


/* ============================================================
   NAV — scroll-based active link + scrolled class
============================================================ */
(function initNav() {
  const navbar  = document.getElementById('navbar');
  const links   = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');
  const backTop = document.getElementById('back-top');

  function onScroll() {
    const y = window.scrollY;

    /* Scrolled style */
    navbar && navbar.classList.toggle('scrolled', y > 40);

    /* Back-to-top visibility */
    backTop && backTop.classList.toggle('visible', y > 400);

    /* Active nav link */
    let current = '';
    sections.forEach(sec => {
      if (y >= sec.offsetTop - 120) current = sec.id;
    });
    links.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


/* ============================================================
   HAMBURGER MOBILE MENU
============================================================ */
(function initMobile() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    menu.classList.toggle('open');
  });

  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      menu.classList.remove('open');
    });
  });
})();


/* ============================================================
   THEME TOGGLE
============================================================ */
(function initTheme() {
  const btn  = document.getElementById('theme-toggle');
  const html = document.documentElement;
  if (!btn) return;

  const saved = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', saved);
  btn.innerHTML = saved === 'dark' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';

  btn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    btn.innerHTML = next === 'dark' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
  });
})();


/* ============================================================
   SCROLL REVEAL
============================================================ */
(function initReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!els.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => io.observe(el));
})();


/* ============================================================
   COUNTER ANIMATION
============================================================ */
(function initCounters() {
  const nums = document.querySelectorAll('.stat-num[data-count]');
  if (!nums.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el  = e.target;
      const end = parseInt(el.dataset.count, 10);
      if (isNaN(end) || end === 0) { el.textContent = '0+'; io.unobserve(el); return; }

      let start = 0;
      const step = Math.ceil(end / 40);
      const id = setInterval(() => {
        start = Math.min(start + step, end);
        el.textContent = start + '+';
        if (start >= end) clearInterval(id);
      }, 40);

      io.unobserve(el);
    });
  }, { threshold: 0.5 });

  nums.forEach(n => io.observe(n));
})();


/* ============================================================
   GLOW CARD — mouse-tracking radial gradient
============================================================ */
(function initGlow() {
  document.querySelectorAll('.glow-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top)  + 'px');
    });
  });
})();


/* ============================================================
   PARTICLES
============================================================ */
(function initParticles() {
  const wrap = document.getElementById('particles');
  if (!wrap) return;

  const COUNT = 22;
  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    p.style.cssText = [
      `width:${size}px`,
      `height:${size}px`,
      `left:${Math.random() * 100}%`,
      `bottom:${Math.random() * -20}%`,
      `animation-duration:${Math.random() * 12 + 8}s`,
      `animation-delay:${Math.random() * 8}s`,
      `opacity:${Math.random() * 0.5 + 0.1}`,
    ].join(';');
    wrap.appendChild(p);
  }
})();


/* ============================================================
   PROJECT TABS
============================================================ */
(function initTabs() {
  const tabs   = document.querySelectorAll('.proj-tab');
  const panels = document.querySelectorAll('.proj-panel');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t   => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById('tab-' + tab.dataset.tab);
      if (target) target.classList.add('active');
    });
  });
})();


/* ============================================================
   CONTACT FORM (front-end only — shows success message)
============================================================ */
(function initForm() {
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name    = document.getElementById('f-name')?.value.trim();
    const email   = document.getElementById('f-email')?.value.trim();
    const subject = document.getElementById('f-subject')?.value.trim();
    const message = document.getElementById('f-message')?.value.trim();

    if (!name || !email || !subject || !message) {
      alert('Please fill in all required fields.');
      return;
    }

    /* Swap button to sending state */
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
    btn.disabled  = true;

    /* Simulate async send */
    setTimeout(() => {
      form.reset();
      btn.innerHTML = orig;
      btn.disabled  = false;
      if (success) { success.classList.add('show'); setTimeout(() => success.classList.remove('show'), 5000); }
    }, 1200);
  });
})();


/* ============================================================
   FOOTER YEAR
============================================================ */
(function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();