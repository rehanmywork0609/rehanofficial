/* ============================================================
   DIGITAL MARKETING PORTFOLIO — script.js
   Particles | Typing | Scroll | Counters | Modals | Form
   ============================================================ */

/* ── 1. Loader ─────────────────────────────────────────────── */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hidden'), 1200);
});

/* ── 2. Custom Cursor Glow ─────────────────────────────────── */
const cursorGlow = document.getElementById('cursor-glow');
document.addEventListener('mousemove', e => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top  = e.clientY + 'px';
});

/* ── 3. Scroll Progress Bar ────────────────────────────────── */
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total    = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (scrolled / total * 100) + '%';
});

/* ── 4. Sticky Navbar ──────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── 5. Mobile Hamburger ───────────────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* ── 6. Particle Canvas ────────────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  const ctx    = canvas.getContext('2d');
  let   W, H, particles;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); initP(); });

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x   = Math.random() * W;
      this.y   = Math.random() * H;
      this.r   = Math.random() * 1.5 + 0.3;
      this.vx  = (Math.random() - 0.5) * 0.3;
      this.vy  = (Math.random() - 0.5) * 0.3;
      this.a   = Math.random() * 0.6 + 0.1;
      this.col = Math.random() < 0.6 ? '#00f5c4' : '#7c5cfc';
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.col;
      ctx.globalAlpha = this.a;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  function initP() {
    const count = Math.floor((W * H) / 12000);
    particles = Array.from({ length: count }, () => new Particle());
  }
  initP();

  // Draw connecting lines between nearby particles
  function drawLines() {
    const maxDist = 100;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < maxDist) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = 'rgba(0,245,196,' + (1 - d / maxDist) * 0.12 + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animate);
  }
  animate();
})();

/* ── 7. Typing Animation ───────────────────────────────────── */
(function initTyping() {
  const texts = [
    'Digital Marketing Specialist',
    'SEO Expert',
    'SEM Strategist',
    'Social Media Marketer',
    'Google Ads Specialist',
    'Content Marketing Strategist'
  ];
  const el   = document.getElementById('typed-text');
  let   ti   = 0, ci = 0, deleting = false, pause = false;

  function type() {
    if (pause) return;
    const current = texts[ti];
    if (!deleting) {
      el.textContent = current.slice(0, ++ci);
      if (ci === current.length) { pause = true; setTimeout(() => { pause = false; deleting = true; }, 1800); }
    } else {
      el.textContent = current.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        ti = (ti + 1) % texts.length;
      }
    }
    setTimeout(type, deleting ? 55 : 90);
  }
  type();
})();

/* ── 8. Scroll Reveal ──────────────────────────────────────── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  const io  = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
})();

/* ── 9. Animated Counters ──────────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('.counter');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el     = e.target;
      const target = +el.dataset.target;
      const duration = 1200;
      const step   = target / (duration / 16);
      let current  = 0;
      const timer  = setInterval(() => {
        current += step;
        el.textContent = Math.min(Math.floor(current), target);
        if (current >= target) clearInterval(timer);
      }, 16);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => io.observe(c));
})();

/* ── 10. Skill Bar Animation ───────────────────────────────── */
(function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  const io    = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.width + '%';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  fills.forEach(f => io.observe(f));
})();

/* ── 11. Case Study Modal ──────────────────────────────────── */
const caseData = {
  seo1: {
    title: 'E-Commerce On-Page SEO Optimization',
    tag: 'On-Page SEO',
    desc: 'Performed a comprehensive on-page audit for an e-commerce website with 50+ product pages. Rewrote title tags, meta descriptions, H-tag structures, and optimized product copy with target keywords.',
    detail: 'Implemented schema markup for products and reviews, fixed internal linking architecture, and created an SEO-optimized blog cluster around buying intent keywords.',
    before: { Traffic: '1,200/mo', 'Avg Position': 18, 'Bounce Rate': '72%' },
    after:  { Traffic: '2,900/mo', 'Avg Position': 6, 'Bounce Rate': '49%' }
  },
  seo2: {
    title: 'Technical SEO Overhaul',
    tag: 'Technical SEO',
    desc: 'Conducted a full technical SEO audit and remediation for a service website. Fixed 45+ crawl errors, resolved duplicate content via canonical tags, and submitted an optimized XML sitemap.',
    detail: 'Optimized Core Web Vitals — reduced LCP from 5.2s to 1.8s, improved CLS from 0.28 to 0.02, and resolved 12 FID issues. HTTPS migration and robots.txt cleanup included.',
    before: { 'Crawl Errors': 47, LCP: '5.2s', PageSpeed: 41 },
    after:  { 'Crawl Errors': 2, LCP: '1.8s', PageSpeed: 94 }
  },
  seo3: {
    title: 'SaaS Keyword Strategy',
    tag: 'Keyword Research',
    desc: 'Developed an advanced keyword strategy for a B2B SaaS product targeting SMEs. Used SEMrush and Ahrefs to map 200+ keywords across 12 content clusters.',
    detail: 'Identified high-intent, low-competition opportunities worth over $50,000 in estimated monthly traffic value. Prioritized pillar-cluster content model for sustainable ranking growth.',
    before: { Keywords: 18, 'Traffic Value': '$800', Clusters: 2 },
    after:  { Keywords: 200, 'Traffic Value': '$50K', Clusters: 12 }
  },
  seo4: {
    title: 'Local Business SEO Audit',
    tag: 'Website Audit',
    desc: 'Conducted a 60-point SEO audit for a local plumbing business. Identified critical issues across technical, on-page, off-page, and local SEO dimensions.',
    detail: 'Fixed Google Business Profile inconsistencies, built 30+ local citations, optimized NAP data, and created location-specific landing pages. GBP views increased 3x in 90 days.',
    before: { 'Audit Score': 42, GBP: 'Unoptimised', Citations: 5 },
    after:  { 'Audit Score': 87, GBP: 'Optimised', Citations: 38 }
  },
  seo5: {
    title: 'Google Search Console Performance Analysis',
    tag: 'GSC Analysis',
    desc: 'Analysed 6 months of GSC data to uncover hidden ranking opportunities. Identified 80+ pages with high impressions but low CTR due to poor title tags.',
    detail: 'Rewrote title and meta tags for target pages; submitted missing pages for indexing (300+ pages indexed). Average CTR increased from 1.8% to 2.6% within 60 days.',
    before: { CTR: '1.8%', Impressions: '120K', 'Indexed Pages': 210 },
    after:  { CTR: '2.6%', Impressions: '360K', 'Indexed Pages': 510 }
  },
  seo6: {
    title: 'PageSpeed & Core Web Vitals Optimization',
    tag: 'PageSpeed',
    desc: 'Optimized a WordPress site's PageSpeed score from 41 to 94 through image optimization, lazy loading, caching, and code minification.',
    detail: 'Converted images to WebP, implemented browser caching and GZIP compression, deferred non-critical JS, and switched to a lightweight theme. Bounce rate dropped 28% as a result.',
    before: { 'PageSpeed Score': 41, LCP: '6.1s', 'Load Time': '7.2s' },
    after:  { 'PageSpeed Score': 94, LCP: '1.2s', 'Load Time': '1.4s' }
  }
};

function openModal(id) {
  const data  = caseData[id];
  if (!data) return;
  const modal = document.getElementById('case-modal');
  const box   = document.getElementById('modal-content');

  const beforeStats = Object.entries(data.before).map(([k,v]) =>
    `<div class="ms"><span class="ms-val" style="color:#ff6b6b">${v}</span><span class="ms-label">${k} (Before)</span></div>`).join('');
  const afterStats  = Object.entries(data.after).map(([k,v]) =>
    `<div class="ms"><span class="ms-val">${v}</span><span class="ms-label">${k} (After)</span></div>`).join('');

  box.innerHTML = `
    <span style="font-size:.75rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--accent);margin-bottom:8px;display:block">${data.tag}</span>
    <h2>${data.title}</h2>
    <p>${data.desc}</p>
    <p>${data.detail}</p>
    <h4 style="font-family:var(--font-head);font-size:.9rem;color:var(--text-muted);margin-bottom:8px">Before vs After</h4>
    <div class="modal-stats">${beforeStats}${afterStats}</div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(e) {
  const modal = document.getElementById('case-modal');
  if (!e || e.target === modal || e.currentTarget?.classList.contains('modal-close')) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Close on Escape key
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal({}); });

/* ── 12. Contact Form ──────────────────────────────────────── */
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn  = document.getElementById('send-btn');
  const note = document.getElementById('form-note');
  const name = document.getElementById('cf-name').value.trim();
  const email= document.getElementById('cf-email').value.trim();
  const msg  = document.getElementById('cf-message').value.trim();

  if (!name || !email || !msg) {
    note.textContent = 'Please fill in all required fields.';
    note.className   = 'form-note error';
    return;
  }

  btn.disabled = true;
  btn.querySelector('.send-text').textContent = 'Sending…';

  // Simulate sending (replace with real EmailJS / Formspree integration)
  setTimeout(() => {
    note.textContent = '✓ Message sent! I\'ll get back to you within 24 hours.';
    note.className   = 'form-note success';
    btn.querySelector('.send-text').textContent = 'Sent!';
    this.reset();
    setTimeout(() => {
      btn.disabled = false;
      btn.querySelector('.send-text').textContent = 'Send Message';
      note.textContent = '';
    }, 5000);
  }, 1500);
});

/* ── 13. Active nav link on scroll ────────────────────────── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 120;
    sections.forEach(sec => {
      const top    = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  });
})();

/* ── 14. Smooth scroll for all anchor links ────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── 15. Tooltip on tool cards ─────────────────────────────── */
document.querySelectorAll('.tool-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'all 0.35s cubic-bezier(0.4,0,0.2,1)';
  });
});

/* ── 16. Portfolio card hover tilt (subtle) ────────────────── */
document.querySelectorAll('.port-card, .sem-card, .edu-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ── 17. SEO growth mini-chart (canvas) ────────────────────── */
// If you add a canvas element with id="seo-chart", this draws a sparkline
(function drawSparkline() {
  const c = document.getElementById('seo-chart');
  if (!c) return;
  const ctx = c.getContext('2d');
  const data = [20, 35, 28, 55, 60, 72, 68, 85, 90, 95];
  const W = c.width, H = c.height;
  const step = W / (data.length - 1);
  const min = Math.min(...data), max = Math.max(...data);

  ctx.strokeStyle = '#00f5c4';
  ctx.lineWidth = 2;
  ctx.shadowBlur = 8;
  ctx.shadowColor = '#00f5c4';
  ctx.beginPath();
  data.forEach((v, i) => {
    const x = i * step;
    const y = H - ((v - min) / (max - min)) * (H - 10) - 5;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.stroke();
})();
