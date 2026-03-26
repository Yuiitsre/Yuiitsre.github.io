// Global JS v2 — Mobile-First / Android App Style

// ===== TOAST =====
function showToast(message, type = 'info', duration = 3000) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span> <span>${message}</span>`;
  container.appendChild(toast);
  // Haptic feedback (where supported)
  if (window.navigator && window.navigator.vibrate) { navigator.vibrate(type === 'error' ? [50,30,50] : 30); }
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(30px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 280);
  }, duration);
}

// ===== MODAL — Bottom sheet =====
function openModal(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.add('active'); document.body.style.overflow = 'hidden'; }
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.remove('active'); document.body.style.overflow = ''; }
}
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
  }
  if (e.target.classList.contains('modal-close') || e.target.closest('.modal-close')) {
    const overlay = e.target.closest('.modal-overlay');
    if (overlay) { overlay.classList.remove('active'); document.body.style.overflow = ''; }
  }
});

// ===== SIDEBAR TOGGLE (mobile) =====
function openSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (sidebar) sidebar.classList.add('open');
  if (overlay) overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeSidebarFn() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}
document.addEventListener('DOMContentLoaded', () => {
  // Wire up menu button
  const menuBtn = document.querySelector('.topbar-menu-btn');
  if (menuBtn) menuBtn.addEventListener('click', openSidebar);
  // Wire up overlay
  const overlay = document.getElementById('sidebarOverlay');
  if (overlay) overlay.addEventListener('click', closeSidebarFn);
  // Close sidebar on nav item click (mobile)
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      if (window.innerWidth < 768) closeSidebarFn();
    });
  });
  // Animate stats numbers
  animateCounters();
});

// ===== COUNTER ANIMATION =====
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseFloat(el.getAttribute('data-count'));
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const isFloat = String(target).includes('.');
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();
    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease out
      const current = eased * target;
      el.textContent = prefix + (isFloat ? current.toFixed(1) : Math.floor(current).toLocaleString('en-IN')) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

// ===== NAVBAR SCROLL (landing page) =====
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== TABS (generic) =====
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-tab-group]').forEach(tabGroup => {
    const group = tabGroup.getAttribute('data-tab-group');
    tabGroup.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-tab]');
      if (!btn) return;
      const tab = btn.getAttribute('data-tab');
      document.querySelectorAll(`[data-tab-group="${group}"] [data-tab]`).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll(`[data-tab-content="${group}"]`).forEach(c => {
        c.classList.toggle('active', c.getAttribute('data-tab') === tab);
      });
    });
  });
});

// ===== AUTH =====
function getCurrentUser() {
  try { return JSON.parse(localStorage.getItem('il_user')); } catch { return null; }
}
function logout() {
  localStorage.removeItem('il_user');
  window.location.href = '../index.html';
}
function requireAuth(role) {
  const user = getCurrentUser();
  if (!user) { window.location.href = '../auth.html'; return null; }
  if (role && user.role !== role) { window.location.href = '../auth.html'; return null; }
  return user;
}

// ===== POPULATE USER UI =====
function populateUserInSidebar(user) {
  if (!user) return;
  document.querySelectorAll('.sidebar-user-name').forEach(el => el.textContent = user.name || 'User');
  document.querySelectorAll('.sidebar-user-role').forEach(el => el.textContent = getRoleLabel(user.role));
  document.querySelectorAll('.sidebar-user-initials').forEach(el => el.textContent = getInitials(user.name));
}
function getRoleLabel(role) {
  const map = { buyer: 'Buyer Account', seller: 'Supplier Account', worker: 'Worker Account', hr: 'HR Manager' };
  return map[role] || 'User';
}
function getInitials(name) {
  if (!name) return 'U';
  return name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
}

// ===== PRICE FORMATTER =====
function formatPrice(n) {
  if (n >= 10000000) return '₹' + (n / 10000000).toFixed(1) + ' Cr';
  if (n >= 100000) return '₹' + (n / 100000).toFixed(1) + 'L';
  if (n >= 1000) return '₹' + (n / 1000).toFixed(1) + 'K';
  return '₹' + n.toLocaleString('en-IN');
}

// ===== ACTIVE NAV HIGHLIGHT =====
function setActiveNav(itemId) {
  document.querySelectorAll('.nav-item, .bottom-nav-item').forEach(item => {
    item.classList.toggle('active', item.id === itemId || item.getAttribute('data-nav') === itemId);
  });
}

// ===== EXPOSE GLOBALS =====
window.showToast = showToast;
window.openModal = openModal;
window.closeModal = closeModal;
window.openSidebar = openSidebar;
window.closeSidebarFn = closeSidebarFn;
window.getCurrentUser = getCurrentUser;
window.logout = logout;
window.requireAuth = requireAuth;
window.populateUserInSidebar = populateUserInSidebar;
window.formatPrice = formatPrice;
window.animateCounters = animateCounters;
