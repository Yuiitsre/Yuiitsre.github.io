// Auth JS

const params = new URLSearchParams(window.location.search);
if (params.get('mode') === 'register') switchAuthTab('register');
if (params.get('role')) { switchAuthTab('register'); selectRole(params.get('role')); }

let selectedRole = null;

function switchAuthTab(tab) {
  document.getElementById('loginForm').style.display = tab === 'login' ? 'block' : 'none';
  document.getElementById('registerForm').style.display = tab === 'register' ? 'block' : 'none';
  document.getElementById('loginTab').classList.toggle('active', tab === 'login');
  document.getElementById('registerTab').classList.toggle('active', tab === 'register');
  if (tab === 'register') { goStep1(); }
}

function selectRole(role) {
  selectedRole = role;
  document.querySelectorAll('.role-card').forEach(c => c.classList.remove('selected'));
  const card = document.getElementById('role-' + role);
  if (card) card.classList.add('selected');
  document.getElementById('step1Next').disabled = false;
}

function goStep1() {
  document.getElementById('step1').style.display = 'block';
  document.getElementById('step2').style.display = 'none';
  document.getElementById('step3').style.display = 'none';
}

function goStep2() {
  if (!selectedRole) { showToast('Please select who you are', 'error'); return; }
  document.getElementById('step1').style.display = 'none';
  document.getElementById('step2').style.display = 'block';
  document.getElementById('step3').style.display = 'none';
  // show relevant fields
  document.querySelectorAll('.role-fields').forEach(f => f.style.display = 'none');
  const fieldMap = { buyer: 'buyerFields', seller: 'sellerFields', worker: 'workerFields', hr: 'hrFields' };
  const el = document.getElementById(fieldMap[selectedRole]);
  if (el) el.style.display = 'block';
}

function goStep3() {
  const pwd = document.getElementById('reg-pwd').value;
  if (!pwd || pwd.length < 6) { showToast('Password must be at least 6 characters', 'error'); return; }
  document.getElementById('step2').style.display = 'none';
  document.getElementById('step3').style.display = 'block';
  setupOtpInputs();
}

function setupOtpInputs() {
  const boxes = document.querySelectorAll('.otp-box');
  boxes.forEach((box, i) => {
    box.value = '';
    box.addEventListener('input', () => {
      if (box.value && i < boxes.length - 1) boxes[i + 1].focus();
    });
    box.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !box.value && i > 0) boxes[i - 1].focus();
    });
  });
  boxes[0].focus();
}

function completeRegistration() {
  const otp = [...document.querySelectorAll('.otp-box')].map(b => b.value).join('');
  if (otp.length < 6) { showToast('Please enter the 6-digit OTP', 'error'); return; }

  // Get name from fields
  const nameMap = { buyer: 'b-name', seller: 's-name', worker: 'w-name', hr: 'h-name' };
  const nameEl = document.getElementById(nameMap[selectedRole]);
  const name = nameEl?.value || 'New User';

  const user = { role: selectedRole, name: name || 'New User', id: Date.now() };
  localStorage.setItem('il_user', JSON.stringify(user));
  showToast('Account created! Redirecting...', 'success');
  setTimeout(() => redirectToPortal(selectedRole), 1200);
}

function doLogin() {
  const id = document.getElementById('loginId').value;
  const pwd = document.getElementById('loginPwd').value;
  if (!id || !pwd) { showToast('Please enter your mobile/email and password', 'error'); return; }
  showToast('Logging in...', 'info');
  // Mock — detect role from stored data
  const user = getCurrentUser() || { role: 'buyer', name: 'Demo User' };
  setTimeout(() => redirectToPortal(user.role), 1000);
}

function demoLogin(role) {
  const names = { buyer: 'Ramesh Kumar (Buyer)', seller: 'Anil Sharma (Seller)', worker: 'Suresh Welder', hr: 'Mohammed HR Manager' };
  const user = { role, name: names[role], id: 'demo_' + role };
  localStorage.setItem('il_user', JSON.stringify(user));
  showToast('Logging in as ' + names[role] + '...', 'success');
  setTimeout(() => redirectToPortal(role), 1000);
}

function redirectToPortal(role) {
  const map = { buyer: 'buyer/dashboard.html', seller: 'seller/dashboard.html', worker: 'worker/dashboard.html', hr: 'hr/dashboard.html' };
  window.location.href = map[role] || 'buyer/dashboard.html';
}
