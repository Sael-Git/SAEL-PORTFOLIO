/* =============================================
   SAMUEL OWINO PORTFOLIO — APP.JS
   Pure Vanilla JavaScript — No Libraries
   ============================================= */

'use strict';

/* ============================================
   SVG GRADIENT DEFS FOR PROGRESS RINGS
   ============================================ */
(function injectSVGDefs() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'svg-defs');
  svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML = `
    <defs>
      <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#00D4FF"/>
        <stop offset="50%" style="stop-color:#8B5CF6"/>
        <stop offset="100%" style="stop-color:#06FFA5"/>
      </linearGradient>
    </defs>
  `;
  document.body.appendChild(svg);
})();

/* ============================================
   LOADING SCREEN
   ============================================ */
(function initLoadingScreen() {
  const screen = document.getElementById('loadingScreen');
  const bar    = document.getElementById('loadingBar');
  const pct    = document.getElementById('loadingPercentage');
  const txt    = document.getElementById('loadingText');

  const messages = [
    'Initializing Samuel\'s Universe...',
    'Loading Particles...',
    'Compiling Creativity...',
    'Connecting to Africa\'s Future...',
    'Ready.'
  ];

  let progress  = 0;
  let msgIndex  = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 12 + 3;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        screen.classList.add('fade-out');
        setTimeout(() => {
          screen.style.display = 'none';
          document.body.style.overflow = '';
        }, 600);
      }, 300);
    }

    bar.style.width = progress + '%';
    pct.textContent = Math.floor(progress) + '%';

    const newIdx = Math.floor((progress / 100) * messages.length);
    if (newIdx !== msgIndex && newIdx < messages.length) {
      msgIndex = newIdx;
      txt.textContent = messages[msgIndex];
    }
  }, 60);

  document.body.style.overflow = 'hidden';
})();

/* ============================================
   CUSTOM CURSOR
   ============================================ */
(function initCursor() {
  const dot     = document.getElementById('cursorDot');
  const outline = document.getElementById('cursorOutline');

  if (!dot || !outline) return;

  let mouseX = 0, mouseY = 0;
  let outlineX = 0, outlineY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    outline.style.left = outlineX + 'px';
    outline.style.top  = outlineY + 'px';
    requestAnimationFrame(animateOutline);
  }
  animateOutline();

  const hoverables = 'a, button, .btn, .skill-card, .project-card, .filter-btn, .social-icon, .carousel-btn, .dot, .back-to-top, input, textarea';
  document.querySelectorAll(hoverables).forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.classList.add('hovering');
      outline.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
      dot.classList.remove('hovering');
      outline.classList.remove('hovering');
    });
  });
})();

/* ============================================
   SCROLL PROGRESS BAR
   ============================================ */
(function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  function update() {
    const scrollTop    = window.scrollY;
    const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled     = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width    = scrolled + '%';
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ============================================
   NAVBAR SCROLL BEHAVIOR + ACTIVE STATES
   ============================================ */
(function initNavbar() {
  const navbar  = document.getElementById('navbar');
  const links   = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) {
        current = sec.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
})();

/* ============================================
   HAMBURGER MENU
   ============================================ */
(function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
})();

/* ============================================
   SMOOTH SCROLL
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ============================================
   TYPING ANIMATION
   ============================================ */
(function initTypingAnimation() {
  const el = document.getElementById('typingText');
  if (!el) return;

  const roles = [
    'Full Stack Engineer',
    'Data Analyst',
    'Statistician',
    'Tech Entrepreneur',
    'UI/UX Designer',
    'Open Source Builder',
    'Africa\'s Digital Future'
  ];

  let roleIdx  = 0;
  let charIdx  = 0;
  let deleting = false;
  let paused   = false;

  function type() {
    const current = roles[roleIdx];

    if (!deleting) {
      charIdx++;
      el.textContent = current.substring(0, charIdx);
      if (charIdx === current.length) {
        paused = true;
        setTimeout(() => { paused = false; deleting = true; }, 2000);
      }
    } else {
      charIdx--;
      el.textContent = current.substring(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        roleIdx  = (roleIdx + 1) % roles.length;
      }
    }

    if (!paused) {
      const speed = deleting ? 40 : 80;
      setTimeout(type, speed);
    } else {
      setTimeout(type, 100);
    }
  }

  setTimeout(type, 1200);
})();

/* ============================================
   PARTICLE SYSTEM
   ============================================ */
class ParticleSystem {
  constructor(canvasId) {
    this.canvas  = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx     = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse   = { x: null, y: null, radius: 120 };
    this.animId  = null;
    this.resize();
    this.initParticles();
    this.animate();
    this.bindEvents();
  }

  resize() {
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  initParticles() {
    this.particles = [];
    const count = Math.floor((this.canvas.width * this.canvas.height) / 9000);
    const total = Math.max(150, Math.min(count, 280));

    for (let i = 0; i < total; i++) {
      this.particles.push(this.createParticle());
    }
  }

  createParticle() {
    const colors = ['#00D4FF', '#8B5CF6', '#06FFA5', '#FFD700', '#ffffff'];
    return {
      x:     Math.random() * this.canvas.width,
      y:     Math.random() * this.canvas.height,
      vx:    (Math.random() - 0.5) * 0.6,
      vy:    (Math.random() - 0.5) * 0.6,
      size:  Math.random() * 2.5 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.6 + 0.2,
      originalX: 0,
      originalY: 0,
    };
  }

  drawParticle(p) {
    this.ctx.save();
    this.ctx.globalAlpha = p.alpha;
    this.ctx.fillStyle   = p.color;
    this.ctx.shadowBlur  = 8;
    this.ctx.shadowColor = p.color;
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();
  }

  drawConnections() {
    const maxDist = 120;
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const p1 = this.particles[i];
        const p2 = this.particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.25;
          this.ctx.save();
          this.ctx.globalAlpha = alpha;
          this.ctx.strokeStyle = '#00D4FF';
          this.ctx.lineWidth   = 0.6;
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
          this.ctx.restore();
        }
      }
    }
  }

  updateParticle(p) {
    // Mouse repulsion
    if (this.mouse.x !== null) {
      const dx = p.x - this.mouse.x;
      const dy = p.y - this.mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < this.mouse.radius) {
        const force = (this.mouse.radius - dist) / this.mouse.radius;
        p.vx += (dx / dist) * force * 0.8;
        p.vy += (dy / dist) * force * 0.8;
      }
    }

    // Velocity damping
    p.vx *= 0.99;
    p.vy *= 0.99;

    // Speed limit
    const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
    if (speed > 2) {
      p.vx = (p.vx / speed) * 2;
      p.vy = (p.vy / speed) * 2;
    }

    p.x += p.vx;
    p.y += p.vy;

    // Boundary wrap
    if (p.x < 0)                   p.x = this.canvas.width;
    if (p.x > this.canvas.width)   p.x = 0;
    if (p.y < 0)                   p.y = this.canvas.height;
    if (p.y > this.canvas.height)  p.y = 0;
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawConnections();
    this.particles.forEach(p => {
      this.updateParticle(p);
      this.drawParticle(p);
    });
    this.animId = requestAnimationFrame(() => this.animate());
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.initParticles();
    }, { passive: true });

    this.canvas.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }
}

// Initialize particle system
window.addEventListener('load', () => {
  new ParticleSystem('particleCanvas');
});


/* ============================================
   INTERSECTION OBSERVER — SCROLL REVEAL
   ============================================ */
(function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger delay for grid children
        const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
        const idx = siblings.indexOf(entry.target);
        const delay = Math.min(idx * 60, 400);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealEls.forEach(el => observer.observe(el));
})();

/* ============================================
   COUNTER ANIMATION
   ============================================ */
(function initCounters() {
  const counters = document.querySelectorAll('.stat-number, .metric-number');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        if (isNaN(target)) return;

        let start    = 0;
        const duration = 1800;
        const step   = 16;
        const increment = target / (duration / step);

        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            start = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(start);
        }, step);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
})();

/* ============================================
   SKILL PROGRESS RINGS ANIMATION
   ============================================ */
(function initProgressRings() {
  const circumference = 2 * Math.PI * 32; // r=32

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card   = entry.target;
        const fill   = card.querySelector('.progress-fill');
        if (!fill) return;

        const percent  = parseFloat(fill.getAttribute('data-percent')) || 0;
        const offset   = circumference - (percent / 100) * circumference;

        fill.style.strokeDasharray  = circumference;
        fill.style.strokeDashoffset = circumference;
        fill.style.stroke = 'url(#progressGradient)';

        // Trigger animation after short delay
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            fill.style.strokeDashoffset = offset;
          });
        });

        observer.unobserve(card);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.skill-card').forEach(card => observer.observe(card));
})();

/* ============================================
   BAR CHART ANIMATION
   ============================================ */
(function initBarCharts() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const panel = entry.target;
        panel.querySelectorAll('.bar-fill').forEach((bar, i) => {
          const width = bar.getAttribute('data-width') || '0';
          setTimeout(() => {
            bar.style.width = width + '%';
          }, i * 120);
        });
        observer.unobserve(panel);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.data-chart-panel').forEach(el => observer.observe(el));
})();

/* ============================================
   3D TILT EFFECT ON PROJECT CARDS
   ============================================ */
(function initTiltEffect() {
  const cards = document.querySelectorAll('.tilt-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const cx     = rect.width  / 2;
      const cy     = rect.height / 2;
      const dx     = (x - cx) / cx;
      const dy     = (y - cy) / cy;
      const tiltX  = dy * -12;
      const tiltY  = dx *  12;

      card.style.transform    = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px) scale(1.02)`;
      card.style.transition   = 'transform 0.1s ease';

      // Dynamic highlight
      const shine = `radial-gradient(circle at ${x}px ${y}px, rgba(0,212,255,0.08), transparent 60%)`;
      card.style.backgroundImage = shine;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease';
      card.style.backgroundImage = '';
    });
  });
})();

/* ============================================
   PROJECT FILTER
   ============================================ */
(function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const categories = (card.getAttribute('data-category') || '').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
})();

/* ============================================
   TESTIMONIALS CAROUSEL
   ============================================ */
(function initCarousel() {
  const cards  = document.querySelectorAll('.testimonial-card');
  const dots   = document.querySelectorAll('.carousel-dots .dot');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');

  if (!cards.length) return;

  let current  = 0;
  let autoSlide = null;

  function goTo(idx) {
    cards[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (idx + cards.length) % cards.length;
    cards[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startAuto() {
    autoSlide = setInterval(next, 4000);
  }

  function resetAuto() {
    clearInterval(autoSlide);
    startAuto();
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { next(); resetAuto(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); resetAuto(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goTo(parseInt(dot.getAttribute('data-idx'), 10));
      resetAuto();
    });
  });

  startAuto();
})();

/* ============================================
   CONTACT FORM HANDLER
   ============================================ */
(function initContactForm() {
  const form    = document.getElementById('contactForm');
  const sendBtn = document.getElementById('sendBtn');

  if (!form || !sendBtn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btnText    = sendBtn.querySelector('.btn-text');
    const btnSuccess = sendBtn.querySelector('.btn-success');

    // Simulate sending
    sendBtn.disabled = true;
    sendBtn.style.opacity = '0.7';
    sendBtn.style.cursor  = 'not-allowed';

    if (btnText) btnText.style.display = 'none';
    if (btnSuccess) btnSuccess.style.display = 'flex';
    sendBtn.classList.add('success');

    setTimeout(() => {
      form.reset();
      if (btnText) btnText.style.display = 'flex';
      if (btnSuccess) btnSuccess.style.display = 'none';
      sendBtn.classList.remove('success');
      sendBtn.disabled     = false;
      sendBtn.style.opacity = '';
      sendBtn.style.cursor  = '';
    }, 3500);
  });
})();

/* ============================================
   BACK TO TOP BUTTON
   ============================================ */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ============================================
   TIMELINE SCROLL ANIMATION
   ============================================ */
(function initTimeline() {
  const nodes = document.querySelectorAll('.timeline-node');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.background = 'linear-gradient(135deg, #00D4FF, #06FFA5)';
        entry.target.style.boxShadow  = '0 0 24px rgba(0, 212, 255, 0.9), 0 0 48px rgba(0, 212, 255, 0.4)';
        entry.target.style.transform  = 'scale(1.3)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.8 });

  nodes.forEach(node => {
    node.style.transition = 'all 0.5s ease';
    observer.observe(node);
  });
})();

/* ============================================
   FLOATING LOADING PARTICLES (on loading screen)
   ============================================ */
(function initLoadingParticles() {
  const container = document.getElementById('loadingParticles');
  if (!container) return;

  for (let i = 0; i < 40; i++) {
    const p   = document.createElement('div');
    const size = Math.random() * 4 + 1;
    const x   = Math.random() * 100;
    const y   = Math.random() * 100;
    const dur = Math.random() * 6 + 4;
    const del = Math.random() * 4;
    const colors = ['#00D4FF', '#8B5CF6', '#06FFA5', '#FFD700'];
    const color  = colors[Math.floor(Math.random() * colors.length)];

    p.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: ${color};
      left: ${x}%;
      top: ${y}%;
      opacity: ${Math.random() * 0.6 + 0.2};
      box-shadow: 0 0 ${size * 3}px ${color};
      animation: loadingParticleFloat ${dur}s ${del}s ease-in-out infinite alternate;
    `;
    container.appendChild(p);
  }

  // Inject keyframe
  const style = document.createElement('style');
  style.textContent = `
    @keyframes loadingParticleFloat {
      from { transform: translate(0, 0) scale(1); }
      to   { transform: translate(${Math.random() > 0.5 ? '' : '-'}${Math.floor(Math.random()*30+10)}px, -${Math.floor(Math.random()*40+20)}px) scale(${Math.random() * 0.5 + 0.8}); }
    }
  `;
  document.head.appendChild(style);
})();

/* ============================================
   DOWNLOAD RESUME (placeholder)
   ============================================ */
(function initResumeDownload() {
  const btn = document.getElementById('downloadResume');
  if (!btn) return;
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    // Placeholder: show a toast-like notification
    showToast('Resume download coming soon!');
  });

  document.querySelectorAll('.btn').forEach(btn => {
    if (btn.textContent.trim().includes('Download CV')) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('CV download coming soon!');
      });
    }
  });
})();

/* ============================================
   TOAST NOTIFICATION
   ============================================ */
function showToast(message) {
  let existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 32px;
    background: linear-gradient(135deg, #00D4FF, #8B5CF6);
    color: #fff;
    padding: 14px 24px;
    border-radius: 999px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    z-index: 99999;
    box-shadow: 0 8px 24px rgba(0,212,255,0.4);
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease;
    pointer-events: none;
  `;

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.style.opacity   = '1';
      toast.style.transform = 'translateY(0)';
    });
  });

  setTimeout(() => {
    toast.style.opacity   = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* ============================================
   NAVBAR MOBILE OVERLAY CLOSE ON OUTSIDE CLICK
   ============================================ */
document.addEventListener('click', (e) => {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  if (navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)) {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  }
});

/* ============================================
   FLOATING GEOMETRIC BACKGROUND SHAPES
   ============================================ */
(function initFloatingShapes() {
  const sections = ['#about', '#skills', '#experience'];
  sections.forEach(selector => {
    const section = document.querySelector(selector);
    if (!section) return;

    for (let i = 0; i < 3; i++) {
      const shape = document.createElement('div');
      const size  = Math.random() * 200 + 80;
      const x     = Math.random() * 90;
      const y     = Math.random() * 80;
      const dur   = Math.random() * 15 + 10;
      const del   = Math.random() * 5;
      const colors = ['rgba(0,212,255,0.03)', 'rgba(139,92,246,0.03)', 'rgba(6,255,165,0.02)'];
      const color  = colors[i % colors.length];

      shape.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: radial-gradient(circle, ${color}, transparent);
        left: ${x}%;
        top: ${y}%;
        pointer-events: none;
        z-index: 0;
        animation: shapeFloat ${dur}s ${del}s ease-in-out infinite alternate;
        filter: blur(40px);
      `;
      section.style.position = 'relative';
      section.style.overflow = 'hidden';
      section.appendChild(shape);
    }
  });

  const shapeStyle = document.createElement('style');
  shapeStyle.textContent = `
    @keyframes shapeFloat {
      from { transform: translate(0, 0) scale(1); }
      to   { transform: translate(30px, -30px) scale(1.1); }
    }
  `;
  document.head.appendChild(shapeStyle);
})();

/* ============================================
   ACTIVE CURSOR RE-INIT ON DYNAMIC CONTENT
   ============================================ */
function refreshCursorHoverables() {
  const dot     = document.getElementById('cursorDot');
  const outline = document.getElementById('cursorOutline');
  if (!dot || !outline) return;

  const hoverables = document.querySelectorAll('a, button, .btn, .skill-card, .project-card, .filter-btn, .social-icon, .carousel-btn, .dot, .back-to-top, input, textarea');
  hoverables.forEach(el => {
    if (el._cursorBound) return;
    el._cursorBound = true;
    el.addEventListener('mouseenter', () => {
      dot.classList.add('hovering');
      outline.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
      dot.classList.remove('hovering');
      outline.classList.remove('hovering');
    });
  });
}

// Run once DOM settles
setTimeout(refreshCursorHoverables, 2800);

/* ============================================
   HERO SECTION: SECTION ENTRY ANIMATION
   ============================================ */
window.addEventListener('load', () => {
  // Add a subtle glow pulse to the hero badge after load
  const badge = document.querySelector('.hero-badge');
  if (badge) {
    setTimeout(() => {
      badge.style.animation = 'pulse 3s ease-in-out infinite';
    }, 2500);
  }
});

/* ============================================
   CONSOLE EASTER EGG
   ============================================ */
console.log('%c Samuel Owino Portfolio ', 'background: linear-gradient(135deg, #00D4FF, #8B5CF6); color: white; font-size: 16px; font-weight: bold; padding: 8px 16px; border-radius: 8px;');
console.log('%c Built with pure HTML, CSS & JavaScript — No Libraries! ', 'color: #06FFA5; font-size: 12px;');
console.log('%c © 2025 Samuel Owino | Luminary Labs ', 'color: #8B5CF6; font-size: 11px;');


/* ============================================
   DYNAMIC COPYRIGHT YEAR
   Starts from 2026, auto-updates every year
   ============================================ */
(function initDynamicYear() {
  const el = document.getElementById('footerYear');
  if (!el) return;
  const startYear = 2026;
  const currentYear = new Date().getFullYear();
  el.textContent = currentYear > startYear ? startYear + '–' + currentYear : String(startYear);
})();

/* ============================================
   PROFILE PHOTO — SMART LOADER
   Falls back gracefully if image not found
   ============================================ */
(function initProfilePhoto() {
  const img = document.getElementById('profilePhoto');
  if (!img) return;

  // Sources to try in order
  const sources = [
    'samuel.jpeg',
    'Samuel.jpeg',
    'samuel.jpg',
    'Samuel.jpg',
    'photo.jpg',
    'profile.jpg',
  ];

  let tried = 0;

  function tryNext() {
    if (tried >= sources.length) {
      // All failed — show the beautiful "SO" initials fallback
      const frame = document.getElementById('profilePhotoFrame');
      if (frame) frame.classList.add('photo-fallback');
      img.style.display = 'none';
      return;
    }
    img.src = sources[tried++];
  }

  img.addEventListener('error', tryNext);

  img.addEventListener('load', () => {
    // Smooth fade-in when photo loads
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.8s ease';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        img.style.opacity = '1';
      });
    });
    // Remove fallback class if it was set
    const frame = document.getElementById('profilePhotoFrame');
    if (frame) frame.classList.remove('photo-fallback');
    img.style.display = 'block';
  });

  // Start loading
  tryNext();
})();

/* ============================================
   HERO PHOTO IN VISUAL SPHERE (optional swap)
   Replace the sphere core with photo on mobile
   ============================================ */
(function initHeroPhotoReplace() {
  // On smaller screens, show photo in the hero visual instead of just sphere
  const sphereCore = document.querySelector('.sphere-core');
  if (!sphereCore) return;
  // Keep sphere as is — photo is in about section
})();
