// ---------------- Tabs ------------------
const signupTab = document.getElementById('signupTab');
const loginTab = document.getElementById('loginTab');
const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');

signupTab.addEventListener('click', () => {
  signupTab.classList.add('active');
  loginTab.classList.remove('active');
  signupForm.style.display = 'block';
  loginForm.style.display = 'none';
});

loginTab.addEventListener('click', () => {
  loginTab.classList.add('active');
  signupTab.classList.remove('active');
  loginForm.style.display = 'block';
  signupForm.style.display = 'none';
});

// ---------------- Elements ------------------
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const togglePwd = document.getElementById('togglePwd');
const togglePwd2 = document.getElementById('togglePwd2');

// Password rules
const ruleLength = document.getElementById('rule-length');
const ruleUpper = document.getElementById('rule-upper');
const ruleLower = document.getElementById('rule-lower');
const ruleDigit = document.getElementById('rule-digit');
const ruleSpecial = document.getElementById('rule-special');

// ---------------- Show/Hide Password ------------------
togglePwd.addEventListener('click', () => {
  password.type = password.type === 'password' ? 'text' : 'password';
  togglePwd.textContent = password.type === 'password' ? 'Show' : 'Hide';
});
togglePwd2.addEventListener('click', () => {
  confirmPassword.type = confirmPassword.type === 'password' ? 'text' : 'password';
  togglePwd2.textContent = confirmPassword.type === 'password' ? 'Show' : 'Hide';
});

// ---------------- Live Password Rules ------------------
password.addEventListener('input', () => {
  const val = password.value;
  ruleLength.classList.toggle('valid', val.length >= 8);
  ruleUpper.classList.toggle('valid', /[A-Z]/.test(val));
  ruleLower.classList.toggle('valid', /[a-z]/.test(val));
  ruleDigit.classList.toggle('valid', /\d/.test(val));
  ruleSpecial.classList.toggle('valid', /[!@#$%^&*(),.?":{}|<>]/.test(val));
});

// ---------------- Sign-Up ------------------
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const emailVal = email.value.trim();
  const pwdVal = password.value;
  const confirmVal = confirmPassword.value;
  let isValid = true;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailVal || !emailPattern.test(emailVal)) { alert('Enter a valid email'); isValid = false; }

  if (pwdVal.length < 8 || !/[A-Z]/.test(pwdVal) || !/[a-z]/.test(pwdVal) || !/\d/.test(pwdVal) || !/[!@#$%^&*(),.?":{}|<>]/.test(pwdVal)) {
    alert('Password does not meet all requirements'); isValid = false;
  }

  if (pwdVal !== confirmVal) { alert('Passwords do not match'); isValid = false; }

  if (!isValid) return;

  // Save credentials
  localStorage.setItem('userEmail', emailVal);
  localStorage.setItem('userPassword', pwdVal);
  alert('Sign-Up Successful! Please login.');
  signupForm.reset();
  [ruleLength, ruleUpper, ruleLower, ruleDigit, ruleSpecial].forEach(r => r.classList.remove('valid'));
});

// ---------------- Login ------------------
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const toggleLoginPwd = document.getElementById('toggleLoginPwd');

toggleLoginPwd.addEventListener('click', () => {
  loginPassword.type = loginPassword.type === 'password' ? 'text' : 'password';
  toggleLoginPwd.textContent = loginPassword.type === 'password' ? 'Show' : 'Hide';
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const storedEmail = localStorage.getItem('userEmail');
  const storedPassword = localStorage.getItem('userPassword');

  if (loginEmail.value.trim() === storedEmail && loginPassword.value === storedPassword) {
    window.location.href = 'welcome.html';
  } else {
    alert('Invalid email or password');
  }
});
