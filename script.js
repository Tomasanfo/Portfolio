// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========================================
// MOBILE MENU
// ========================================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// ========================================
// SMOOTH SCROLL
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// SCROLL TO TOP
// ========================================
const scrollTopBtn = document.getElementById('scroll-top');

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// CERTIFICATE DATA
// ========================================
const certificates = [
    { title: 'Ciberseguridad', issuer: 'Fundación YPF', date: 'Febrero 2026', category: 'Ciberseguridad', image: 'certificados/ciberseguridad-ypf.jpg' },
    { title: 'Domina la IA con Gemini', issuer: 'Santander Open Academy', date: 'Febrero 2026', category: 'Inteligencia Artificial', image: 'certificados/gemini-santander.jpg' },
    { title: 'Introducción a Excel', issuer: 'Fundación YPF', date: 'Febrero 2026', category: 'Productividad', image: 'certificados/excel-ypf.jpg' },
    { title: 'Python', issuer: 'Santander Open Academy', date: 'Febrero 2026', category: 'Programación', image: 'certificados/Python-Santander-ANFOSSITOMAS.jpg' },
    { title: 'Introducción a IA', issuer: 'Fundación YPF', date: 'Febrero 2026', category: 'Inteligencia Artificial', image: 'certificados/ia-ypf.jpg' },
    { title: 'Introducción a Power BI', issuer: 'Fundación YPF', date: 'Febrero 2026', category: 'Data Analytics', image: 'certificados/powerbi-ypf.jpg' },
    { title: 'Prompting Responsable', issuer: 'Santander Open Academy', date: 'Febrero 2026', category: 'Inteligencia Artificial', image: 'certificados/prompting-santander.jpg' },
    { title: 'Seguridad Digital', issuer: 'Santander Open Academy', date: 'Febrero 2026', category: 'Ciberseguridad', image: 'certificados/seguridad-santander.jpg' },
    { title: 'Copilot', issuer: 'Santander Open Academy', date: 'Marzo 2026', category: 'Productividad', image: 'certificados/Copilot-Santander-ANFOSSI_TOMAS_page-0001.jpg' },
    { title: 'Ciencia de Datos', issuer: 'Santander Open Academy', date: 'Marzo 2026', category: 'Data Science', image: 'certificados/Introducción a la Ciencia de Datos-Santander-Anfossi_Tomas_page-0001.jpg' }
];

// ========================================
// CERTIFICATE MODAL
// ========================================
const modal = document.getElementById('cert-modal');
const modalClose = document.getElementById('modal-close');
const modalTitle = document.getElementById('modal-title');
const modalIssuer = document.getElementById('modal-issuer');
const modalPrev = document.getElementById('modal-prev');
const modalNext = document.getElementById('modal-next');
const modalDots = document.getElementById('modal-dots');

let currentCertIndex = 0;

// Open modal
document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('click', () => {
        currentCertIndex = parseInt(card.dataset.cert);
        updateModal();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close modal
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Update modal content
function updateModal() {
    const cert = certificates[currentCertIndex];
    modalTitle.textContent = cert.title;
    modalIssuer.textContent = `${cert.issuer} • ${cert.date}`;
    
    // Update image
    const modalImage = document.getElementById('modal-image');
    if (modalImage && cert.image) {
        modalImage.src = cert.image;
        modalImage.alt = `${cert.title} - ${cert.issuer}`;
    }
    
    // Update buttons
    modalPrev.disabled = currentCertIndex === 0;
    modalNext.disabled = currentCertIndex === certificates.length - 1;
    
    // Update dots
    updateModalDots();
}

// Update modal dots
function updateModalDots() {
    modalDots.innerHTML = '';
    certificates.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `modal-dot ${index === currentCertIndex ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Certificado ${index + 1}`);
        dot.addEventListener('click', () => {
            currentCertIndex = index;
            updateModal();
        });
        modalDots.appendChild(dot);
    });
}

// Navigation
modalPrev.addEventListener('click', () => {
    if (currentCertIndex > 0) {
        currentCertIndex--;
        updateModal();
    }
});

modalNext.addEventListener('click', () => {
    if (currentCertIndex < certificates.length - 1) {
        currentCertIndex++;
        updateModal();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft' && currentCertIndex > 0) {
        currentCertIndex--;
        updateModal();
    }
    if (e.key === 'ArrowRight' && currentCertIndex < certificates.length - 1) {
        currentCertIndex++;
        updateModal();
    }
});

// ========================================
// CONTACT FORM
// ========================================
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
            <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="20"/>
        </svg>
        Enviando...
    `;
    
    setTimeout(() => {
        contactForm.classList.add('hidden');
        formSuccess.classList.remove('hidden');
        
        // Reset after 3 seconds
        setTimeout(() => {
            contactForm.reset();
            contactForm.classList.remove('hidden');
            formSuccess.classList.add('hidden');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }, 3000);
    }, 1500);
});

// ========================================
// INTERSECTION OBSERVER - ANIMATIONS
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.skill-card, .cert-card, .highlight-card, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Add animation class styles
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    .spin {
        animation: spin 1s linear infinite;
    }
`;
document.head.appendChild(style);

// ========================================
// STAGGER ANIMATIONS
// ========================================
const staggerElements = document.querySelectorAll('.skills-grid .skill-card, .cert-grid .cert-card');
staggerElements.forEach((el, index) => {
    el.style.transitionDelay = `${index * 0.05}s`;
});

// ========================================
// ACTIVE NAV LINK
// ========================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========================================
// CONSOLE MESSAGE
// ========================================
console.log('%c👋 ¡Hola! Bienvenido al portfolio de Tomás Anfossi', 'color: #0a66c2; font-size: 16px; font-weight: bold;');
console.log('%c¿Buscando un desarrollador? ¡Hablemos!', 'color: #666; font-size: 12px;');
