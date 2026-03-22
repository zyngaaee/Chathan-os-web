/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ===== HAMBURGER MENU ===== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

function closeMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}

/* ===== HERO CARD MESSAGE ROTATION ===== */
const messages = ['msg1', 'msg2', 'msg3', 'msg4'];
let currentMsg = 0;

function rotateMessages() {
  const current = document.getElementById(messages[currentMsg]);
  if (current) current.classList.add('hidden');

  currentMsg = (currentMsg + 1) % messages.length;

  const next = document.getElementById(messages[currentMsg]);
  if (next) next.classList.remove('hidden');
}

setInterval(rotateMessages, 3000);

/* ===== INTERSECTION OBSERVER — Scroll Animations ===== */
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -50px 0px'
};

const featureObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const card = entry.target;
      const delay = parseInt(card.getAttribute('data-delay') || '0', 10);
      setTimeout(() => {
        card.classList.add('visible');
      }, delay);
      featureObserver.unobserve(card);
    }
  });
}, observerOptions);

document.querySelectorAll('.feature-card').forEach(card => {
  featureObserver.observe(card);
});

/* ===== PILLAR CARDS LINK SCROLL ===== */
document.querySelectorAll('.pillar-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

/* ===== COPY CONTACT HELPERS ===== */
document.querySelectorAll('[data-copy]').forEach(button => {
  button.addEventListener('click', async () => {
    const value = button.getAttribute('data-copy');
    if (!value) return;

    try {
      await navigator.clipboard.writeText(value);
      showToast(`Copied: ${value}`, 'info');
    } catch (error) {
      showToast('Copy failed. Please copy it manually.', 'info');
    }
  });
});

/* ===== SMOOTH NAV LINKS ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ===== INVITE / SUPPORT HANDLERS ===== */
function handleInvite(e) {
  e.preventDefault();
  showToast('🔗 Invite link not set yet — contact the bot developer!', 'info');
}

function handleSupport(e) {
  e.preventDefault();
  showToast('💬 Support server link not set yet — contact the bot developer!', 'info');
}

/* ===== TOAST NOTIFICATION ===== */
function showToast(message, type = 'info') {
  // Remove existing toast
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${message}</span>`;
  toast.style.cssText = `
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%) translateY(80px);
    background: #1a1a2e;
    border: 1px solid rgba(124,58,237,0.4);
    color: #f0f0ff;
    padding: 14px 24px;
    border-radius: 12px;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 500;
    z-index: 9999;
    box-shadow: 0 10px 40px rgba(0,0,0,0.5);
    transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.35s ease;
    opacity: 0;
    white-space: nowrap;
    max-width: 90vw;
    text-overflow: ellipsis;
    overflow: hidden;
  `;

  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.style.transform = 'translateX(-50%) translateY(0)';
      toast.style.opacity = '1';
    });
  });

  // Animate out
  setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(80px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 350);
  }, 4000);
}

/* ===== FLOATING PARTICLES BACKGROUND ===== */
function createParticles() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const bgCanvas = document.getElementById('bgCanvas');

  canvas.style.cssText = `
    position: absolute; top: 0; left: 0;
    width: 100%; height: 100%;
    opacity: 0.35;
  `;
  bgCanvas.appendChild(canvas);

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = Array.from({ length: 45 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.5 + 0.5,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    color: ['rgba(204,26,26,', 'rgba(255,50,50,', 'rgba(180,0,0,', 'rgba(220,220,220,'][Math.floor(Math.random() * 4)],
    alpha: Math.random() * 0.5 + 0.2
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.fill();
    });

    // Draw subtle connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(124,58,237,${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  draw();
}

createParticles();

/* ===== CARD TILT EFFECT ===== */
document.querySelectorAll('.pillar-card, .feature-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
