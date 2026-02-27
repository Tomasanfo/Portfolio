// ========================================
// MATRIX RAIN EFFECT
// ========================================
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

let width, height;
const fontSize = 14;
const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const charArray = chars.split('');
let drops = [];
let speeds = [];
let colors = [];

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    const columns = Math.floor(width / fontSize);
    drops = [];
    speeds = [];
    colors = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
        speeds[i] = Math.random() * 2 + 1;
        colors[i] = Math.random() > 0.95 ? '#00f0ff' : '#00ff41';
    }
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let frameCount = 0;
function drawMatrix() {
    frameCount++;
    if (frameCount % 2 === 0) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, width, height);
        ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

        for (let i = 0; i < drops.length; i++) {
            const char = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillStyle = colors[i];
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);

            drops[i] += speeds[i] * 0.5;

            if (drops[i] * fontSize > height && Math.random() > 0.975) {
                drops[i] = 0;
                speeds[i] = Math.random() * 2 + 1;
                colors[i] = Math.random() > 0.95 ? '#00f0ff' : '#00ff41';
            }
        }
    }
    requestAnimationFrame(drawMatrix);
}

drawMatrix();

// ========================================
// LOADING SCREEN
// ========================================
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('hidden');
        startTypewriter();
    }, 2000);
});

// ========================================
// TYPEWRITER EFFECT
// ========================================
function startTypewriter() {
    const text = 'ANFOSSI_TOMAS';
    const element = document.getElementById('hero-typewriter');
    const cursor = document.getElementById('typewriter-cursor');
    let i = 0;

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, 80);
        } else {
            setTimeout(() => {
                cursor.style.display = 'none';
                typeSubtitle();
            }, 500);
        }
    }

    type();
}

function typeSubtitle() {
    const text = "Estudiante de Ciberseguridad | Desarrollo Web | IA & Automatización";
    const element = document.getElementById('hero-subtitle');
    let i = 0;

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, 30);
        } else {
            document.getElementById('hero-buttons').style.opacity = '1';
            document.getElementById('hero-buttons').style.transition = 'opacity 0.5s ease';
        }
    }

    type();
}

// ========================================
// NAVIGATION SCROLL EFFECT
// ========================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// ========================================
// LOGIN MODAL - CV DOWNLOAD
// ========================================
const modal = document.getElementById('login-modal');
const authBtn = document.getElementById('auth-btn');

function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    resetForm();
}

authBtn.addEventListener('click', openModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// Password toggle
function togglePassword() {
    const passwordInput = document.getElementById('password');
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
}

// Form submission
const loginForm = document.getElementById('login-form');
const modalError = document.getElementById('modal-error');
const modalSuccess = document.getElementById('modal-success');
const modalSubmit = document.getElementById('modal-submit');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    modalError.textContent = '';

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        modalError.textContent = 'ERROR: TODOS_LOS_CAMPOS_REQUERIDOS';
        return;
    }

    modalSubmit.disabled = true;
    modalSubmit.innerHTML = '<span>VERIFICANDO...</span>';

    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulamos descarga del CV
    loginForm.style.display = 'none';
    modalSuccess.style.display = 'block';

    setTimeout(() => {
        closeModal();
        showUserNotification('CV_DESCARGADO');
    }, 2000);
});

function resetForm() {
    loginForm.reset();
    loginForm.style.display = 'flex';
    modalSuccess.style.display = 'none';
    modalSubmit.disabled = false;
    modalSubmit.innerHTML = '<span>DESCARGAR_PDF</span>';
    modalError.textContent = '';
}

function showUserNotification(text) {
    const notification = document.getElementById('user-notification');
    const notificationText = document.getElementById('notification-text');
    notificationText.textContent = text;
    notification.style.display = 'flex';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 5000);
}

// ========================================
// SERVICES ACCORDION
// ========================================
function toggleService(header) {
    const content = header.nextElementSibling;
    const isActive = header.classList.contains('active');

    // Close all
    document.querySelectorAll('.service-header').forEach(h => h.classList.remove('active'));
    document.querySelectorAll('.service-content').forEach(c => c.classList.remove('active'));

    // Open clicked if wasn't active
    if (!isActive) {
        header.classList.add('active');
        content.classList.add('active');
    }
}

// ========================================
// CONTACT FORM
// ========================================
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('.form-submit');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>ENVIANDO...</span>';

    await new Promise(resolve => setTimeout(resolve, 2000));

    contactForm.style.display = 'none';
    successMessage.style.display = 'block';
});

// ========================================
// STATS COUNTER ANIMATION
// ========================================
const statItems = document.querySelectorAll('.stat-item-value');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseFloat(el.dataset.count);
            const suffix = el.dataset.suffix || '';
            const duration = 2000;
            const startTime = performance.now();

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                const current = target * easeProgress;

                if (target % 1 !== 0) {
                    el.textContent = current.toFixed(1) + suffix;
                } else {
                    el.textContent = Math.floor(current) + suffix;
                }

                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }

            requestAnimationFrame(update);
            statsObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

statItems.forEach(item => statsObserver.observe(item));

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================
const revealElements = document.querySelectorAll('.feature-card, .service-item, .stat-item');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

// ========================================
// KEYBOARD SHORTCUTS
// ========================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});