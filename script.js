/* ============================================
   Fady Eshak Portfolio – script.js
   ============================================ */

/* ── CUSTOM CURSOR ── */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

(function animRing() {
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();

document.querySelectorAll('a, button, .skill-chip, .project-card, .cert-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width  = cursor.style.height = '18px';
    ring.style.width    = ring.style.height   = '48px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width  = cursor.style.height = '10px';
    ring.style.width    = ring.style.height   = '34px';
  });
});

/* ── SCROLL REVEAL ── */
const revealObserver = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  }),
  { threshold: 0.1 }
);
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── ACTIVE NAV LINK ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 130) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

/* ── TYPING EFFECT ── */
const roles  = ['Flutter Developer', 'Mobile Engineer', 'UI/UX Enthusiast', 'App Developer'];
const roleEl = document.getElementById('heroRole');
let ri = 0, ci = 0, deleting = false;

function type() {
  if (!roleEl) return;
  const word = roles[ri];
  if (!deleting) {
    ci++;
    roleEl.innerHTML = word.slice(0, ci) + ' <span>◆</span> Egypt';
    if (ci === word.length) {
      deleting = true;
      setTimeout(type, 2200);
      return;
    }
  } else {
    ci--;
    roleEl.innerHTML = word.slice(0, ci) + ' <span>◆</span> Egypt';
    if (ci === 0) {
      deleting = false;
      ri = (ri + 1) % roles.length;
    }
  }
  setTimeout(type, deleting ? 55 : 95);
}
setTimeout(type, 1600);

/* ── CERTIFICATE VIEWER ── */

/*
  HOW TO ADD YOUR CERTIFICATE IMAGES:
  ─────────────────────────────────────
  For each certificate, save the image in the same folder as index.html:
    - cert-route.jpg   → Flutter Mobile Development Diploma (Route IT)
    - cert-hcia.jpg    → HCIA Cloud Computing (Huawei ICT Academy)
    - cert-cib.jpg     → CIB Summer Program – The Green Leap

  Then in index.html, find the cert-modal for that certificate and:
  1. Delete the <div class="cert-placeholder"> block
  2. Uncomment the <img> tag below it
  The image will then display when you click the certificate card.
*/

const certData = [
  {
    id:     'cert-route',
    icon:   '📜',
    name:   'Flutter Mobile Development Diploma',
    issuer: 'Route IT Training Center · 2025',
    file:   'cert-route.jpg'
  },
  {
    id:     'cert-hcia',
    icon:   '🏅',
    name:   'HCIA – Cloud Computing',
    issuer: 'Huawei ICT Academy · 2025',
    file:   'cert-hcia.jpg'
  },
  {
    id:     'cert-cib',
    icon:   '🌿',
    name:   'CIB Summer Program – The Green Leap',
    issuer: 'Commercial International Bank · 2025',
    file:   'cert-cib.jpg'
  }
];

function openCertModal(index) {
  const c = certData[index];
  const modal = document.getElementById('certModal');

  // Set title and issuer
  document.getElementById('certModalName').textContent   = c.name;
  document.getElementById('certModalIssuer').textContent = c.issuer;

  // Show correct image panel — hide all, show the clicked one
  document.querySelectorAll('.cert-img-panel').forEach(p => p.style.display = 'none');
  const panel = document.getElementById(c.id + '-panel');
  if (panel) panel.style.display = 'flex';

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCertModal(e) {
  if (!e || e.target === document.getElementById('certModal')) {
    document.getElementById('certModal').classList.remove('open');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.getElementById('certModal').classList.remove('open');
    document.body.style.overflow = '';
  }
});