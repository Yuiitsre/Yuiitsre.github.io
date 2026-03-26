// Landing page animations

// Animated stat counters
function animateCounters() {
  document.querySelectorAll('.stat-number[data-target]').forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = formatCounterValue(Math.floor(current), target);
      if (current >= target) clearInterval(timer);
    }, 16);
  });
}

function formatCounterValue(val, target) {
  if (target >= 100000) return val.toLocaleString('en-IN') + '+';
  if (target >= 1000) return val.toLocaleString('en-IN') + '+';
  if (target === 98) return val + '%';
  return val.toLocaleString('en-IN') + '+';
}

// Intersection observer for counters
const statsSection = document.getElementById('stats');
if (statsSection) {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) { animateCounters(); observer.disconnect(); }
  }, { threshold: 0.3 });
  observer.observe(statsSection);
}

// How It Works tabs
document.querySelectorAll('.how-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.how-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.how-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    const target = document.getElementById('how-' + tab.getAttribute('data-tab'));
    if (target) target.classList.add('active');
  });
});

// Scroll reveal
const revealEls = document.querySelectorAll('.cat-card, .why-card, .testimonial-card, .how-step');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.style.animation = 'fadeInUp 0.5s ease forwards'; }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => { el.style.opacity = '0'; revealObserver.observe(el); });
