/* ============================================
   project-script.js – Project Detail Pages JS
   ============================================ */

/* ── CURSOR ── */
let mx = 0, my = 0, rx = 0, ry = 0;
let cursorEl, ringEl;

function initCursor() {
  cursorEl = document.getElementById('cursor');
  ringEl   = document.getElementById('cursorRing');
  if (!cursorEl || !ringEl) return;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursorEl.style.left = mx + 'px';
    cursorEl.style.top  = my + 'px';
  });

  (function animRing() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ringEl.style.left = rx + 'px';
    ringEl.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  document.querySelectorAll('a, button, .screenshot-frame, .feature-card, .phone-frame').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorEl.style.width = cursorEl.style.height = '18px';
      ringEl.style.width   = ringEl.style.height   = '48px';
    });
    el.addEventListener('mouseleave', () => {
      cursorEl.style.width = cursorEl.style.height = '10px';
      ringEl.style.width   = ringEl.style.height   = '34px';
    });
  });
}

/* ── LIGHTBOX ── */
/*
  HOW THE LIGHTBOX WORKS:
  - Each .screenshot-frame and .phone-frame has:
      data-img="filename.jpg"   ← set this when you add a real image
      data-label="Screen Name"
      data-file="filename.jpg"  ← shown in placeholder hint
  - Until a real image is added (data-img is empty), a placeholder is shown.
  - Once you add the image: set data-img="yourfile.jpg" on the frame element.
*/
function openLightbox(imgSrc, label, filename) {
  const lb            = document.getElementById('lightbox');
  const lbImg         = document.getElementById('lightboxImg');
  const lbPlaceholder = document.getElementById('lightboxPlaceholder');
  const lbFilename    = document.getElementById('lightboxFilename');
  const lbLabel       = document.getElementById('lightboxLabel');

  if (lbLabel)    lbLabel.textContent    = label    || '';
  if (lbFilename) lbFilename.textContent = filename || 'screenshot.jpg';

  if (imgSrc) {
    lbImg.src = imgSrc;
    lbImg.style.display = 'block';
    if (lbPlaceholder) lbPlaceholder.style.display = 'none';
  } else {
    lbImg.style.display = 'none';
    if (lbPlaceholder) lbPlaceholder.style.display = 'flex';
  }

  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('open');
  document.body.style.overflow = '';
}

/* ── INIT ON DOM READY ── */
document.addEventListener('DOMContentLoaded', () => {
  // Start cursor
  initCursor();

  // Screenshot frames → lightbox
  document.querySelectorAll('.screenshot-frame').forEach(frame => {
    frame.addEventListener('click', () => {
      openLightbox(
        frame.dataset.img   || null,
        frame.dataset.label || '',
        frame.dataset.file  || 'screenshot.jpg'
      );
    });
  });

  // Phone frames in hero → lightbox
  document.querySelectorAll('.phone-frame').forEach(frame => {
    frame.addEventListener('click', () => {
      openLightbox(
        frame.dataset.img   || null,
        frame.dataset.label || '',
        frame.dataset.file  || 'screenshot.jpg'
      );
    });
  });

  // Lightbox backdrop click to close
  const lb = document.getElementById('lightbox');
  if (lb) {
    lb.addEventListener('click', e => {
      if (e.target === lb) closeLightbox();
    });
  }
});

// Keyboard: Escape closes lightbox
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});