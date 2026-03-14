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

document.querySelectorAll('a, button, .skill-chip, .project-card').forEach(el => {
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
const roles  = ['Flutter Developer', 'Mobile Engineer', 'UI/UX Enthusiast', 'CS Student'];
const roleEl = document.getElementById('heroRole');
let ri = 0, ci = 0, deleting = false;

function type() {
  const word = roles[ri];
  if (!deleting) {
    ci++;
    roleEl.innerHTML = word.slice(0, ci) + ' <span>◆</span> CS Student <span>◆</span> Egypt';
    if (ci === word.length) {
      deleting = true;
      setTimeout(type, 2200);
      return;
    }
  } else {
    ci--;
    roleEl.innerHTML = word.slice(0, ci) + ' <span>◆</span> CS Student <span>◆</span> Egypt';
    if (ci === 0) {
      deleting = false;
      ri = (ri + 1) % roles.length;
    }
  }
  setTimeout(type, deleting ? 55 : 95);
}

setTimeout(type, 1600);