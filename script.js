// ===== Reveal on scroll =====
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObs.observe(el));

// ===== Counter animation =====
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = Number(el.getAttribute('data-count'));
    if (Number.isNaN(target)) return;

    let current = 0;
    const durationMs = 900; // fast & snappy
    const steps = Math.max(20, Math.min(90, target || 60));
    const stepValue = target / steps;
    const stepTime = Math.floor(durationMs / steps);

    const t = setInterval(() => {
      current += stepValue;
      const shown = Math.round(current);
      el.textContent = shown > target ? target : shown;
      if (shown >= target) clearInterval(t);
    }, stepTime);
  });
}
animateCounters();

// ===== Smooth scroll for in-page links =====
document.querySelectorAll('[data-scroll]').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ===== Briefing modal =====
const modal = document.getElementById('briefingModal');
const openBriefing = document.getElementById('openBriefing');
const openBriefing2 = document.getElementById('openBriefing2');
const closeBtns = modal ? modal.querySelectorAll('[data-close]') : [];

function setModal(open) {
  if (!modal) return;
  modal.classList.toggle('open', open);
  modal.setAttribute('aria-hidden', String(!open));
  document.body.style.overflow = open ? 'hidden' : '';
}

if (openBriefing) openBriefing.addEventListener('click', () => setModal(true));
if (openBriefing2) openBriefing2.addEventListener('click', () => setModal(true));
closeBtns.forEach(btn => btn.addEventListener('click', () => setModal(false)));

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setModal(false);
});

// ===== Generate mailto from briefing form =====
const form = document.getElementById('briefingForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);

    const name = (data.get('name') || '').toString().trim();
    const org = (data.get('org') || '').toString().trim();
    const purpose = (data.get('purpose') || '').toString().trim();
    const msg = (data.get('msg') || '').toString().trim();

    const subject = `Request Briefing — ${purpose || 'Inquiry'}`;
    const body =
`Hello Yuiitsre Team,

Name: ${name || '—'}
Organization: ${org || '—'}
Purpose: ${purpose || '—'}

Message:
${msg || '—'}

Regards,
${name || ''}`.trim();

    const url = `mailto:contact@yuiitsre.me?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(url, '_blank', 'noopener');
    setModal(false);
    form.reset();
  });
}
