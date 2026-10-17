// ============================================================================
// 1. BASE DE DATOS DE PROYECTOS (¡FÁCIL DE EDITAR!)
// ============================================================================
/*
 * ¿CÓMO AGREGAR UN PROYECTO NUEVO EN EL FUTURO?
 * Copiá desde la llave { hasta la llave }, agregá una coma al anterior y pegalo abajo.
 * - Si tenés una captura de pantalla en tu carpeta, poné la ruta en `image: 'img/mi-app.png'`
 *   y cambiá `useLiveMockup: false`.
 */
const projects = [
    {
        title: 'Analizer IA local v1.3',
        subtitle: 'Análisis Algorítmico de Audio & Puntuación de Energía con IA Local',
        badge: 'Python + IA Local + Data Sync',
        description: 'Aplicación de escritorio desarrollada en Python que analiza colecciones masivas de música electrónica (MP3, FLAC, WAV, AIFF, M4A) usando multiprocesamiento GPU/CPU. Evalúa el tema completo midiendo Drop e intensidad sostenida, calibra según el género musical y clasifica la energía de 1 a 5 estrellas con Inteligencia Artificial local, sincronizando resultados y backups directo en la base de datos master.db de Rekordbox.',
        metrics: [
            { label: 'Procesamiento', value: 'Multiproceso GPU/CPU' },
            { label: 'Base de Datos', value: 'Sync master.db' },
            { label: 'Precisión', value: '100% Calibrado por Género' }
        ],
        tags: ['Python', 'Inteligencia Artificial Local', 'Análisis de Datos de Audio', 'Bases de Datos (master.db)', 'Multiprocessing'],
        liveUrl: 'https://tomasanfo.github.io/Analizer.IA/',
        liveBtnText: 'Visitar Web de Analizer IA',
        useLiveMockup: true, // Dibuja la réplica exacta de tu app en código para máxima nitidez
        image: ''            // Si algún día preferís usar un archivo de imagen, poné useLiveMockup: false y acá la ruta
    }
];

// ============================================================================
// 2. BASE DE DATOS DE CERTIFICADOS (¡SOLO AGREGÁS UN RENGLÓN ACÁ!)
// ============================================================================
/*
 * ¿CÓMO AGREGAR UN CERTIFICADO NUEVO?
 * Solo agregá un objeto nuevo al listado de abajo siguiendo este formato:
 * {
 *   title: 'Nombre del Curso',
 *   issuer: 'UTN' | 'Fundación YPF' | 'Santander Open Academy' | 'Instituto Vaca Muerta',
 *   badgeText: 'UTN' | 'YPF' | 'Santander' | 'IVM',
 *   badgeClass: 'utn' | 'ypf' | 'santander' | 'ivm',
 *   date: 'Mes Año',
 *   group: 'datos' | 'ia' | 'seguridad',   // <-- Define en qué pestaña de filtro entra
 *   image: 'certificados/nombre-del-archivo.jpg'
 * }
 * ¡No hace falta tocar nada en index.html! Los contadores y tarjetas se actualizan solos.
 */
const certificates = [
    // --- PRIORIDAD 1: ANÁLISIS DE DATOS, BI & EXCEL ---
    {
        title: 'Análisis de Datos y Dashboards con Tableau',
        issuer: 'UTN',
        badgeText: 'UTN',
        badgeClass: 'utn',
        date: 'Junio 2026',
        group: 'datos',
        image: 'certificados/UTNanalisisdatos.png'
    },
    {
        title: 'Introducción a Power BI',
        issuer: 'Fundación YPF',
        badgeText: 'YPF',
        badgeClass: 'ypf',
        date: 'Febrero 2026',
        group: 'datos',
        image: 'certificados/powerbi-ypf.jpg'
    },
    {
        title: 'Ciencia de Datos',
        issuer: 'Santander Open Academy',
        badgeText: 'Santander',
        badgeClass: 'santander',
        date: 'Marzo 2026',
        group: 'datos',
        image: 'certificados/Introducción a la Ciencia de Datos-Santander-Anfossi_Tomas_page-0001.jpg'
    },
    {
        title: 'Introducción a Excel',
        issuer: 'Fundación YPF',
        badgeText: 'YPF',
        badgeClass: 'ypf',
        date: 'Febrero 2026',
        group: 'datos',
        image: 'certificados/excel-ypf.jpg'
    },

    // --- PRIORIDAD 2: PYTHON & INTELIGENCIA ARTIFICIAL ---
    {
        title: 'Python',
        issuer: 'Santander Open Academy',
        badgeText: 'Santander',
        badgeClass: 'santander',
        date: 'Febrero 2026',
        group: 'ia',
        image: 'certificados/Python-Santander-ANFOSSITOMAS.jpg'
    },
    {
        title: 'Domina la IA con Gemini',
        issuer: 'Santander Open Academy',
        badgeText: 'Santander',
        badgeClass: 'santander',
        date: 'Febrero 2026',
        group: 'ia',
        image: 'certificados/gemini-santander.jpg'
    },
    {
        title: 'Prompting Responsable',
        issuer: 'Santander Open Academy',
        badgeText: 'Santander',
        badgeClass: 'santander',
        date: 'Febrero 2026',
        group: 'ia',
        image: 'certificados/prompting-santander.jpg'
    },
    {
        title: 'Copilot',
        issuer: 'Santander Open Academy',
        badgeText: 'Santander',
        badgeClass: 'santander',
        date: 'Marzo 2026',
        group: 'ia',
        image: 'certificados/Copilot-Santander-ANFOSSI_TOMAS_page-0001.jpg'
    },
    {
        title: 'Introducción a IA',
        issuer: 'Fundación YPF',
        badgeText: 'YPF',
        badgeClass: 'ypf',
        date: 'Febrero 2026',
        group: 'ia',
        image: 'certificados/ia-ypf.jpg'
    },

    // --- PRIORIDAD 3: CIBERSEGURIDAD & SEGURIDAD OPERATIVA ---
    {
        title: 'Ciberseguridad',
        issuer: 'Fundación YPF',
        badgeText: 'YPF',
        badgeClass: 'ypf',
        date: 'Febrero 2026',
        group: 'seguridad',
        image: 'certificados/ciberseguridad-ypf.jpg'
    },
    {
        title: 'Seguridad Digital',
        issuer: 'Santander Open Academy',
        badgeText: 'Santander',
        badgeClass: 'santander',
        date: 'Febrero 2026',
        group: 'seguridad',
        image: 'certificados/seguridad-santander.jpg'
    },
    {
        title: 'Seguridad Operativa en Yacimientos',
        issuer: 'Instituto de Formación Técnica Vaca Muerta',
        badgeText: 'IVM',
        badgeClass: 'ivm',
        date: 'Agosto 2026',
        group: 'seguridad',
        image: 'certificados/IVM.jpg'
    }
];

// ============================================================================
// 3. RENDERIZADO AUTOMÁTICO DE PROYECTOS
// ============================================================================
function renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    container.innerHTML = projects.map(proj => {
        // Mockup interactivo exacto de tu captura de Analizer IA v1.3
        const previewHTML = proj.useLiveMockup ? `
            <div class="analizer-window">
                <div class="analizer-titlebar">
                    <div class="analizer-dots">
                        <span class="a-dot red"></span>
                        <span class="a-dot gray"></span>
                        <span class="a-dot gray"></span>
                    </div>
                    <div class="analizer-title">Analizer IA local v1.3 · by @tomasanfo</div>
                    <div class="analizer-gpu">Multiproceso + GPU/CPU Activo</div>
                </div>
                <div class="analizer-body">
                    <div class="analizer-top-bar">
                        <div class="analizer-path">
                            <span>C:\\Users\\Desktop\\...</span>
                            <span class="analizer-tracks-ok">✓ 1,840 pistas (MP3, FLAC, WAV, AIFF, M4A)</span>
                        </div>
                        <div class="analizer-btn-clean">🗑 Limpiar Estrellas</div>
                        <div class="analizer-btn-run">ANALIZAR / PAUSAR</div>
                    </div>
                    <div class="analizer-toggles">
                        <div class="a-toggle"><span class="a-switch"></span> Drop + Intensidad Sostenida</div>
                        <div class="a-toggle"><span class="a-switch"></span> Calibración por Género</div>
                        <div class="a-toggle"><span class="a-switch"></span> Sincronización Rekordbox (master.db)</div>
                        <div class="a-toggle"><span class="a-switch"></span> Respetar Género Original</div>
                    </div>
                    <div class="analizer-progress-info">
                        <span>Tu Colección: <strong>1,840</strong> · Procesadas en paralelo: <strong class="text-red">1,840 / 1,840</strong></span>
                        <span>100% Calibrado (v1.3)</span>
                    </div>
                    <div class="analizer-progress-bar"><div class="analizer-progress-fill"></div></div>
                    <div class="analizer-console">
                        <div class="c-info">[INFO] Analizando tema completo (Drop + Intensidad sostenida) y calibrando por género...</div>
                        <div class="c-line"><span class="c-genre">[Melodic Techno]</span> Anyma - Pictures Of You.mp3 → <strong>[🔥 85% | 5★ EXPLOSIVO] [Drop 3:12 · IA 0.81]</strong></div>
                        <div class="c-line"><span class="c-genre">[Indie Dance]</span> Adam Ten - High On.mp3 → <strong>[🔥 79% | 4★ POTENTE] [Drop 2:45 · IA 0.74]</strong></div>
                        <div class="c-line"><span class="c-genre">[House]</span> Disclosure - Latch.mp3 → [🔥 61% | 3★ SÓLIDO] [Drop 1:58 · IA 0.62]</div>
                        <div class="c-line"><span class="c-genre">[Deep House]</span> Solomun - Something We All Adore.mp3 → [🔥 38% | 2★ SUAVE] [Drop 4:10 · IA 0.41]</div>
                        <div class="c-sync">[✓ REKORDBOX SYNC] Backup de master.db creado. Rating, comentario y colores grabados con éxito.</div>
                    </div>
                </div>
            </div>
        ` : `<img src="${proj.image}" alt="${proj.title}" class="project-img">`;

        const metricsHTML = proj.metrics.map(m => `
            <div class="proj-metric">
                <span class="proj-metric-label">${m.label}</span>
                <strong class="proj-metric-val">${m.value}</strong>
            </div>
        `).join('');

        const tagsHTML = proj.tags.map(t => `<span class="proj-tag">${t}</span>`).join('');

        return `
            <article class="project-bento-card">
                <div class="project-info-col">
                    <div class="project-badge">${proj.badge}</div>
                    <h3 class="project-title">${proj.title}</h3>
                    <p class="project-subtitle">${proj.subtitle}</p>
                    <p class="project-desc">${proj.description}</p>
                    <div class="project-metrics-grid">${metricsHTML}</div>
                    <div class="project-tags">${tagsHTML}</div>
                    <div class="project-actions">
                        <a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-analizer">
                            ${proj.liveBtnText}
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                <polyline points="15 3 21 3 21 9"/>
                                <line x1="10" y1="14" x2="21" y2="3"/>
                            </svg>
                        </a>
                    </div>
                </div>
                <div class="project-preview-col">
                    <a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-preview-link" title="Abrir ${proj.title}">
                        ${previewHTML}
                    </a>
                </div>
            </article>
        `;
    }).join('');
}

// ============================================================================
// 4. RENDERIZADO AUTOMÁTICO DE CERTIFICADOS COMPACTOS + FILTROS
// ============================================================================
let currentFilteredIndices = certificates.map((_, i) => i);
let currentModalPos = 0;

function updateCertCounters() {
    const totalEl = document.getElementById('count-all');
    const heroTotalEl = document.getElementById('hero-cert-count');
    const datosEl = document.getElementById('count-datos');
    const iaEl = document.getElementById('count-ia');
    const segEl = document.getElementById('count-seguridad');

    if (totalEl) totalEl.textContent = certificates.length;
    if (heroTotalEl) heroTotalEl.textContent = certificates.length;
    if (datosEl) datosEl.textContent = certificates.filter(c => c.group === 'datos').length;
    if (iaEl) iaEl.textContent = certificates.filter(c => c.group === 'ia').length;
    if (segEl) segEl.textContent = certificates.filter(c => c.group === 'seguridad').length;
}

function renderCertificates(filter = 'all') {
    const grid = document.getElementById('cert-grid');
    if (!grid) return;

    currentFilteredIndices = [];
    certificates.forEach((cert, index) => {
        const matchesGroup = cert.group === filter;
        const matchesIssuer = cert.issuer === filter;
        if (filter === 'all' || matchesGroup || matchesIssuer) {
            currentFilteredIndices.push(index);
        }
    });

    grid.innerHTML = currentFilteredIndices.map((certIndex, posInFilter) => {
        const cert = certificates[certIndex];
        const isData = cert.group === 'datos';
        return `
            <div class="cert-compact-card ${isData ? 'is-data-cert' : ''}" data-pos="${posInFilter}">
                <div class="cert-thumb-wrap">
                    <img src="${cert.image}" alt="${cert.title}" class="cert-thumb" loading="lazy">
                </div>
                <div class="cert-compact-body">
                    <div class="cert-compact-top">
                        <span class="cert-badge ${cert.badgeClass}">${cert.badgeText}</span>
                        <span class="cert-date-inline">${cert.date}</span>
                    </div>
                    <h4 class="cert-compact-title">${cert.title}</h4>
                    <p class="cert-compact-issuer">${cert.issuer}</p>
                </div>
                <div class="cert-compact-arrow" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                    </svg>
                </div>
            </div>
        `;
    }).join('');

    // Eventos de clic para abrir el modal
    grid.querySelectorAll('.cert-compact-card').forEach(card => {
        card.addEventListener('click', () => {
            currentModalPos = parseInt(card.dataset.pos, 10);
            updateModal();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
}

// Inicializar pestañas de filtro
document.querySelectorAll('#cert-filters .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('#cert-filters .filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderCertificates(btn.dataset.filter);
    });
});

// ============================================================================
// 5. MODAL DE CERTIFICADOS CON ZOOM
// ============================================================================
const modal = document.getElementById('cert-modal');
const modalClose = document.getElementById('modal-close');
const modalTitle = document.getElementById('modal-title');
const modalIssuer = document.getElementById('modal-issuer');
const modalImage = document.getElementById('modal-image');
const modalPrev = document.getElementById('modal-prev');
const modalNext = document.getElementById('modal-next');
const modalDots = document.getElementById('modal-dots');

function closeModal() {
    modal.classList.remove('active');
    if (modalImage) modalImage.classList.remove('zoomed');
    document.body.style.overflow = '';
}

if (modalClose) modalClose.addEventListener('click', closeModal);
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

if (modalImage) {
    modalImage.addEventListener('click', () => {
        modalImage.classList.toggle('zoomed');
    });
}

function updateModal() {
    const realIndex = currentFilteredIndices[currentModalPos];
    const cert = certificates[realIndex];
    if (!cert) return;

    modalTitle.textContent = cert.title;
    modalIssuer.textContent = `${cert.issuer} • ${cert.date}`;

    if (modalImage) {
        modalImage.classList.remove('zoomed');
        modalImage.src = cert.image;
        modalImage.alt = `${cert.title} - ${cert.issuer}`;
    }

    modalPrev.disabled = currentModalPos === 0;
    modalNext.disabled = currentModalPos === currentFilteredIndices.length - 1;

    modalDots.innerHTML = '';
    currentFilteredIndices.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = `modal-dot ${idx === currentModalPos ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Certificado ${idx + 1}`);
        dot.addEventListener('click', () => {
            currentModalPos = idx;
            updateModal();
        });
        modalDots.appendChild(dot);
    });
}

if (modalPrev) {
    modalPrev.addEventListener('click', () => {
        if (currentModalPos > 0) {
            currentModalPos--;
            updateModal();
        }
    });
}

if (modalNext) {
    modalNext.addEventListener('click', () => {
        if (currentModalPos < currentFilteredIndices.length - 1) {
            currentModalPos++;
            updateModal();
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (!modal || !modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft' && currentModalPos > 0) {
        currentModalPos--;
        updateModal();
    }
    if (e.key === 'ArrowRight' && currentModalPos < currentFilteredIndices.length - 1) {
        currentModalPos++;
        updateModal();
    }
});

// ============================================================================
// 6. TEMA CLARO / OSCURO, NAVBAR Y WHATSAPP
// ============================================================================
(function initTheme() {
    const root = document.documentElement;
    try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            root.setAttribute('data-theme', 'light');
        }
    } catch (e) {}
})();

const themeToggleBtn = document.getElementById('theme-toggle-btn');
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const root = document.documentElement;
        const isLight = root.getAttribute('data-theme') === 'light';
        if (isLight) {
            root.removeAttribute('data-theme');
        } else {
            root.setAttribute('data-theme', 'light');
        }
        try {
            localStorage.setItem('theme', isLight ? 'dark' : 'light');
        } catch (e) {}
    });
}

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.remove('active'));
    });
}

// Botón de WhatsApp en Contacto
const btnWhatsapp = document.getElementById('btn-whatsapp');
if (btnWhatsapp) {
    btnWhatsapp.addEventListener('click', function(e) {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();

        if (!nombre || !mensaje) {
            alert('Por favor completá tu nombre y el mensaje.');
            return;
        }

        const texto = `*Nuevo contacto desde el Portfolio*%0A%0A` +
            `👤 *Nombre:* ${nombre}%0A` +
            `📧 *Email:* ${email || 'No proporcionado'}%0A` +
            `📱 *Teléfono:* ${telefono || 'No proporcionado'}%0A%0A` +
            `💬 *Mensaje:*%0A${mensaje}`;

        const numero = '5492984333857';
        window.open(`https://wa.me/${numero}?text=${texto}`, '_blank');
    });
}

// Inicializar todo al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    updateCertCounters();
    renderCertificates('all');
});