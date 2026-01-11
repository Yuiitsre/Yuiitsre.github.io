// COUNTER ANIMATION
document.querySelectorAll('[data-count]').forEach(el => {
  let target = +el.dataset.count;
  let count = 0;

  let interval = setInterval(() => {
    count++;
    el.textContent = count;
    if (count >= target) clearInterval(interval);
  }, 40);
});

// SCROLL REVEAL
const reveal = document.querySelectorAll('.card, .node, .stat');

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = 1;
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.2 });

reveal.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(40px)';
  el.style.transition = 'all 0.7s ease';
  observer.observe(el);
});
