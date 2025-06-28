const API_URL = 'http://192.168.1.4:5000/api/auth';

function showLogin() {
  document.getElementById('login-form').style.display = 'flex';
  document.getElementById('register-form').style.display = 'none';
  document.getElementById('login-toggle').classList.add('active-toggle');
  document.getElementById('register-toggle').classList.remove('active-toggle');
}

function showRegister() {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('register-form').style.display = 'flex';
  document.getElementById('login-toggle').classList.remove('active-toggle');
  document.getElementById('register-toggle').classList.add('active-toggle');
}

async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  if (!email || !password) {
    showMessage('Please enter both email and password');
    return;
  }

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = 'dashboard.html';
    } else {
      showMessage(data.message || 'Login failed');
    }
  } catch (err) {
    console.error('Login error:', err);
    showMessage('Something went wrong. Please try again.');
  }
}

async function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('register-name').value.trim();
  const email = document.getElementById('register-email').value.trim();
  const password = document.getElementById('register-password').value;

  if (!name || !email || !password) {
    showMessage('Please fill all fields');
    return;
  }

  try {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = 'dashboard.html';
    } else {
      showMessage(data.message || 'Registration failed');
    }
  } catch (err) {
    console.error('Register error:', err);
    showMessage('Something went wrong. Please try again.');
  }
}

function showMessage(msg) {
  const msgEl = document.getElementById('message');
  msgEl.innerText = msg;
  msgEl.style.display = 'block';

  setTimeout(() => {
    msgEl.innerText = '';
    msgEl.style.display = 'none';
  }, 4000);
}

