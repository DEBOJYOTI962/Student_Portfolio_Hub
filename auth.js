document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    const API_BASE = 'http://localhost:3000';

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email-login').value.trim();
            const password = document.getElementById('password-login').value;

            const btn = loginForm.querySelector('.btn.btn-primary');
            if (btn) btn.classList.add('loading');
            try {
                const res = await fetch(`${API_BASE}/api/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Login failed');
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                window.location.href = 'index.html';
            } catch (err) {
                alert(err.message);
            } finally {
                if (btn) btn.classList.remove('loading');
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            const btn = signupForm.querySelector('.btn.btn-primary');
            if (btn) btn.classList.add('loading');
            try {
                const res = await fetch(`${API_BASE}/api/auth/signup`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password })
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Signup failed');
                alert('Account created!');
                window.location.href = 'index.html';
            } catch (err) {
                alert(err.message);
            } finally {
                if (btn) btn.classList.remove('loading');
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Only initialize signup helpers if the signup form exists
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        initializeAuthForm();
        generateCaptcha();
    }
});

function initializeAuthForm() {
    const form = document.getElementById('signup-form');
    if (!form) return;
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const refreshCaptcha = document.getElementById('refreshCaptcha');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-eye');
                icon.classList.toggle('fa-eye-slash');
            }
        });
    }

    if (refreshCaptcha) {
        refreshCaptcha.addEventListener('click', generateCaptcha);
    }

    // Input animations
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}

function generateCaptcha() {
    const canvas = document.getElementById('captchaCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    // Match captcha.js expectations: only uppercase letters and digits (no 0/1 ambiguities)
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let captcha = '';
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Generate random string
    for (let i = 0; i < 6; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    // Set styles
    ctx.font = '24px Arial';
    ctx.fillStyle = '#ff6b6b';
    ctx.textAlign = 'center';
    
    // Add noise
    for (let i = 0; i < 5; i++) {
        ctx.strokeStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.3)`;
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.stroke();
    }
    
    // Draw text
    ctx.fillText(captcha, canvas.width / 2, canvas.height / 2 + 8);
    
    // Store captcha for validation (key must be 'code' to match captcha.js)
    canvas.dataset.code = captcha;
}

