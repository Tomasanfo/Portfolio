/* Proyectos del portfolio: sistema de pedidos y análisis (panel interactivo expandible), sitio de la hamburguesería (vista en vivo) y Analizer IA (tarjeta compacta).
   Los datos del panel son de DEMOSTRACIÓN (no hay datos reales de clientes). Para editar textos/links, tocá el objeto CFG de abajo. */
(() => {
const CFG = {
  burgerUrl: 'https://tomasanfo.github.io/burgerANFO/',
  analizerUrl: 'https://tomasanfo.github.io/Analizer.IA/',
  analizerRepo: 'https://github.com/Tomasanfo/Analizer.IA'
};
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const money = n => '$' + Math.round(n).toLocaleString('es-AR');
const arrow = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>';

/* ---------- datos de demostración ---------- */
const BURG = [['Cheddar Bacon', 148], ['Clásica Doble', 126], ['Crispy Chicken', 97], ['Cheese Simple', 88], ['BBQ Onion', 63], ['Veggie Black Bean', 41]];
const PROMO_EXTRA = [34, 22, 0, 0, 9, 0]; // unidades que llegaron como "Super Promo" (cuentan x2 si se activa)
const H = [['19', 37], ['20', 83], ['21', 134], ['22', 106], ['23', 49], ['00', 14]];
const DIAS = [11, 12, 15, 22, 43, 59, 48, 11, 13, 16, 22, 43, 59, 49]; // pedidos por día, 14 días (arranca en lunes)
const DOW = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((d, i) => [d, DIAS[i] + DIAS[i + 7]]);
const TOTAL_PED = DOW.reduce((a, d) => a + d[1], 0);
const TICKET = 11800;
function split(k) { // reparte cada hora en k tramos con forma estable
  const out = [];
  H.forEach(([h, v], i) => {
    const w = Array.from({ length: k }, (_, j) => 1 + .4 * Math.sin((j + i * 2) * 1.9)), s = w.reduce((a, b) => a + b);
    w.forEach((x, j) => out.push([`${h}:${String(Math.round(60 / k * j)).padStart(2, '0')}`, Math.max(1, Math.round(v * x / s))]));
  });
  return out;
}
// [zona, envíos, lat, lon, dispersión en metros] · ubicaciones aproximadas de General Roca, cantidades de demostración (suman 288 = 68% de 423 pedidos)
const ZONAS = [['Centro', 110, -39.0334, -67.5826, 550], ['Zona Norte', 68, -39.0215, -67.5800, 650], ['Barrio Oeste', 52, -39.0350, -67.6040, 600], ['Zona Este', 34, -39.0310, -67.5530, 600], ['Zona Sur', 18, -39.0510, -67.5850, 500], ['Chacras', 6, -39.0130, -67.5620, 800]];
const LOCAL = [-39.0338, -67.5820];
const PTS = (() => { let q = 7; const r = () => (q = q * 16807 % 2147483647) / 2147483647, g = () => (r() + r() + r() - 1.5) * 2;
  return ZONAS.flatMap(([, c, la, lo, sd]) => Array.from({ length: c }, () => [la + g() * sd / 111320, lo + g() * sd / (111320 * Math.cos(la * Math.PI / 180))])); })();
let MAP = null, LEAF = null;
function loadLeaflet() { // se carga recién cuando se abre la pestaña Delivery
  if (window.L) return Promise.resolve();
  if (LEAF) return LEAF;
  return LEAF = new Promise((ok, ko) => {
    const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css'; document.head.appendChild(l);
    const j = document.createElement('script'); j.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js'; j.onload = ok; j.onerror = () => { LEAF = null; ko(); }; document.head.appendChild(j);
  });
}

/* ---------- piezas de gráfico ---------- */
const bars = (rows, { max, hi, fmt = v => v, h = 150 } = {}) => {
  const m = max || Math.max(...rows.map(r => r[1]));
  return `<div class="rx-vb" style="height:${h}px">${rows.map(([l, v], i) => `<div class="${i === hi ? 'top' : ''}" title="${l}: ${fmt(v)}"><b>${fmt(v)}</b><i style="height:${Math.max(2, v / m * 100)}%"></i><span>${l}</span></div>`).join('')}</div>`;
};
const hbars = (rows, fmt = v => v) => {
  const m = Math.max(...rows.map(r => r[1]));
  return rows.map(([n, v]) => `<div class="rx-hb"><span class="n">${n}</span><span class="t"><i style="width:${v / m * 100}%"></i></span><span class="v">${fmt(v)}</span></div>`).join('');
};
const chip = (v, l) => `<div class="rx-chip"><b>${v}</b>${l}</div>`;

/* ---------- pestañas del panel ---------- */
const TABS = {
  resumen: { t: 'Resumen', html: () => `
    <div class="rx-chips">${chip(TOTAL_PED, 'pedidos')}${chip(money(TOTAL_PED * TICKET), 'facturado')}${chip(money(TICKET), 'ticket promedio')}${chip('68%', 'con envío')}</div>
    <div class="rx-grid">
      <div class="rx-box"><h4>Hamburguesas más pedidas</h4><label class="rx-chk"><input type="checkbox" id="rx-promo" checked> Contar cada promo como 2 hamburguesas</label><div id="rx-burg"></div></div>
      <div class="rx-box"><h4>Ventas por día (últimos 14 días, en pesos)</h4>${bars(DIAS.map((v, i) => [String(i + 1), v * TICKET / 1000]), { fmt: v => v >= 1000 ? (v / 1000).toFixed(1).replace('.', ',') + 'M' : Math.round(v) + 'k', hi: 12, h: 190 })}</div>
    </div>`, init: () => {
      const draw = () => { const on = $('#rx-promo').checked; $('#rx-burg').innerHTML = hbars(BURG.map(([n, v], i) => [n, v + (on ? PROMO_EXTRA[i] : 0)]).sort((a, b) => b[1] - a[1])); };
      $('#rx-promo').onchange = draw; draw();
    } },
  horarios: { t: 'Horarios', html: () => `
    <div class="rx-row"><span class="rx-mu">Agrupar cada</span><div class="rx-seg" id="rx-g"><button data-k="1" class="on">1 h</button><button data-k="2">30 min</button><button data-k="4">15 min</button></div><span class="rx-mu rx-peak" id="rx-peak"></span></div>
    <div class="rx-box"><h4>¿A qué hora llegan más pedidos?</h4><div id="rx-hora"></div></div>
    <div class="rx-grid"><div class="rx-box"><h4>Por día de la semana</h4>${bars(DOW, { hi: 5, h: 170 })}</div>
    <div class="rx-box"><h4>Retiro vs. envío</h4>${hbars([['Envío', 68], ['Retiro en local', 32]], v => v + '%')}<p class="rx-mu">El tiempo de entrega se mide entre los botones “Cocinar” y “Lista” de cada comanda.</p>${chip('18 min', 'promedio entrada → lista')}</div></div>`,
    init: () => {
      const draw = k => { const r = split(k), m = Math.max(...r.map(x => x[1])), i = r.findIndex(x => x[1] === m);
        $('#rx-hora').innerHTML = bars(r, { hi: i, h: 190 }); $('#rx-peak').textContent = `Pico: ${r[i][0]} hs`; };
      $$('#rx-g button').forEach(b => b.onclick = () => { $$('#rx-g button').forEach(x => x.classList.remove('on')); b.classList.add('on'); draw(+b.dataset.k); });
      draw(1);
    } },
  delivery: { t: 'Delivery', html: () => `
    <div class="rx-row"><span class="rx-mu">Radio de calor</span><div class="rx-seg" id="rx-r"><button data-r="150">150 m</button><button data-r="250" class="on">250 m</button><button data-r="400">400 m</button></div><span class="rx-mu rx-peak">${PTS.length} envíos · General Roca</span></div>
    <div class="rx-grid rx-map"><div class="rx-box"><div id="rx-map" class="rx-leaflet" role="img" aria-label="Mapa de calor de envíos en General Roca (datos de demostración)"><p class="rx-mu rx-maploading">Cargando mapa de General Roca…</p></div>
      <div class="rx-leg"></div><div class="rx-legl"><span>menos pedidos</span><span>más pedidos</span></div></div>
    <div class="rx-box"><h4>Zonas más calientes <span class="rx-mu">(tocá una para verla)</span></h4>${ZONAS.map(([n, c], i) => `<button class="rx-zone" data-i="${i}">${hbars([[n, c]], v => v + ' env.')}</button>`).join('')}<p class="rx-mu">Las direcciones se geolocalizan con OpenStreetMap, se guardan en caché y se ordena un recorrido corto por repartidor. Ubicaciones de ejemplo.</p></div></div>`,
    init: async () => {
      const box = $('#rx-map');
      try { await loadLeaflet(); } catch (e) { box.innerHTML = '<p class="rx-mu rx-maploading">No se pudo cargar el mapa (hace falta conexión a internet).</p>'; return; }
      if (!$('#rx-map')) return; // cambió de pestaña mientras cargaba
      box.innerHTML = '';
      const map = MAP = L.map(box, { scrollWheelZoom: false }).setView([-39.0333, -67.5833], 13);
      const claro = document.documentElement.dataset.theme === 'light'; // mapa oscuro o claro según el tema del portfolio
      L.tileLayer(`https://{s}.basemaps.cartocdn.com/${claro ? 'light_all' : 'dark_all'}/{z}/{x}/{y}{r}.png`, { maxZoom: 18, subdomains: 'abcd', referrerPolicy: 'origin', attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/attributions">CARTO</a>' }).addTo(map);
      L.circleMarker(LOCAL, { radius: 7, color: '#fff', weight: 2, fillColor: '#38bdf8', fillOpacity: 1 }).bindTooltip('Local (ubicación de ejemplo)').addTo(map);
      const heat = L.layerGroup().addTo(map);
      const draw = r => { heat.clearLayers(); PTS.forEach(p => L.circle(p, { radius: r, stroke: false, fillColor: '#ef4444', fillOpacity: .12, interactive: false }).addTo(heat)); };
      $$('#rx-r button').forEach(b => b.onclick = () => { $$('#rx-r button').forEach(x => x.classList.remove('on')); b.classList.add('on'); draw(+b.dataset.r); });
      $$('.rx-zone').forEach(z => z.onclick = () => { const q = ZONAS[+z.dataset.i]; map.flyTo([q[2], q[3]], 14, { duration: .8 }); });
      draw(250); setTimeout(() => map.invalidateSize(), 60);
    } },
  ticket: { t: 'Comanda y ticket', html: () => `
    <div class="rx-row"><span class="rx-mu">Ticket</span><div class="rx-seg" id="rx-t"><button data-t="cocina" class="on">Cocina</button><button data-t="cliente">Caja / cliente</button></div></div>
    <div class="rx-grid rx-tk"><div class="rx-box"><h4>1 · Se pega el mensaje de WhatsApp</h4><pre class="rx-wa">Pedido Nº: 1042
Cliente: Cliente Demo
Modalidad: Envío
Dirección: Calle Demo 123
• 2 x Cheddar Bacon ($21.000)
   Sin cebolla
• 1 x Crispy Chicken ($9.800)
Aclaraciones: Timbre roto, llamar
Total: $30.800
Hora: 21:14 · 12/11/2026</pre><p class="rx-mu">2 · Un parser en Python (regex) separa cliente, productos, aclaraciones y total, asigna el día de jornada (de 00:00 a 06:00 cuenta como el día anterior) y 3 · genera el ticket ESC/POS para la impresora térmica por USB.</p></div>
    <div class="rx-box rx-paperbox"><div class="rx-paper" id="rx-paper"></div></div></div>`,
    init: () => {
      const T = {
        cocina: `<b class="big">COCINA</b><b class="big">N° 1042</b><b>DELIVERY</b>21:14 hs - 12/11/2026\nCliente Demo\n--------------------------------\n<b>2 x Cheddar Bacon</b>\n   &gt; Sin cebolla\n\n<b>1 x Crispy Chicken</b>\n\n--------------------------------\n<b>** ACLARACIONES **</b>\nTimbre roto, llamar\n--------------------------------\nImpreso 21:15`,
        cliente: `<b class="big">HAMBURGUESERÍA</b>PEDIDO\n<b class="big">N° 1042</b><b>DELIVERY</b><b>Cliente Demo</b>Calle Demo 123\n--------------------------------\n2x Cheddar Bacon\n   Sin cebolla\n1x Crispy Chicken\n--------------------------------\nNota: Timbre roto, llamar\n<b>TOTAL $30.800</b><b>** A COBRAR **</b>21:14 hs - 12/11/2026`
      };
      const draw = t => { $('#rx-paper').innerHTML = T[t].replace(/\n/g, '<br>'); };
      $$('#rx-t button').forEach(b => b.onclick = () => { $$('#rx-t button').forEach(x => x.classList.remove('on')); b.classList.add('on'); draw(b.dataset.t); });
      draw('cocina');
    } }
};

/* ---------- modal expandible ---------- */
let modal, last;
function buildModal() {
  modal = document.createElement('div');
  modal.className = 'modal rx-modal'; modal.setAttribute('role', 'dialog'); modal.setAttribute('aria-modal', 'true'); modal.setAttribute('aria-label', 'Panel de pedidos y análisis ampliado');
  modal.innerHTML = `<div class="modal-content rx-mc"><button class="modal-close" aria-label="Cerrar">✕</button>
    <div class="rx-bar"><div><h3>Panel de pedidos y análisis</h3><p>Datos de demostración · así se ve el sistema que corre en el local</p></div>
    <div class="rx-tabs" role="tablist">${Object.entries(TABS).map(([k, v], i) => `<button role="tab" data-tab="${k}" aria-selected="${i === 0}">${v.t}</button>`).join('')}</div></div>
    <div class="rx-body" id="rx-body" role="tabpanel"></div></div>`;
  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if (e.target === modal || e.target.closest('.modal-close')) closeM(); });
  $$('.rx-tabs button', modal).forEach(b => b.onclick = () => tab(b.dataset.tab));
  document.addEventListener('keydown', e => { if (modal.classList.contains('active') && e.key === 'Escape') closeM(); });
}
function tab(k) {
  if (MAP) { MAP.remove(); MAP = null; }
  $$('.rx-tabs button', modal).forEach(b => b.setAttribute('aria-selected', b.dataset.tab === k));
  $('#rx-body').innerHTML = TABS[k].html(); TABS[k].init();
}
function openM(from, k = 'resumen') {
  if (!modal) buildModal();
  last = from; tab(k); modal.classList.add('active'); document.body.style.overflow = 'hidden'; $('.modal-close', modal).focus();
}
function closeM() { if (MAP) { MAP.remove(); MAP = null; } modal.classList.remove('active'); document.body.style.overflow = ''; if (last) last.focus(); }

/* ---------- tarjetas ---------- */
const tags = a => a.map(t => `<span class="proj-tag">${t}</span>`).join('');
const metrics = a => a.map(([l, v]) => `<div class="proj-metric"><span class="proj-metric-label">${l}</span><strong class="proj-metric-val">${v}</strong></div>`).join('');

function render() {
  const c = $('#projects-container'); if (!c) return;
  c.innerHTML = `
  <article class="project-bento-card p-main">
    <div class="project-info-col">
      <div class="project-badge">Proyecto destacado · Python + SQLite + Docker</div>
      <h3 class="project-title">Sistema de pedidos y análisis para una hamburguesería</h3>
      <p class="project-subtitle">Del mensaje de WhatsApp a la comanda impresa y al dashboard</p>
      <p class="project-desc">Sistema que corre en local con Docker. Recibe el pedido pegado desde WhatsApp, lo convierte en comanda, imprime tickets en impresora térmica (ESC/POS por USB), organiza el delivery y analiza las ventas: horarios pico, productos, tiempos de cocina y mapa de calor de envíos. Incluye respaldo en CSV/ZIP con restauración y contraseña guardada con PBKDF2.</p>
      <div class="project-metrics-grid">${metrics([['Impresión', 'Térmica ESC/POS'], ['Análisis', 'Horarios, mapa, tiempos'], ['Despliegue', 'Docker local']])}</div>
      <div class="project-tags">${tags(['Python', 'SQLite', 'Docker', 'ESC/POS', 'Análisis de datos', 'JavaScript', 'OpenStreetMap', 'CSV / ZIP'])}</div>
      <div class="project-actions"><button class="btn-primary" data-open="resumen">Explorar el panel interactivo</button></div>
    </div>
    <div class="project-preview-col">
      <div class="rx-mini" role="button" tabindex="0" data-open="resumen" aria-label="Abrir el panel en tamaño grande">
        <div class="rx-mini-top"><span class="rx-dots"><i></i><i></i><i></i></span><span>Panel de análisis</span><em>Clic para expandir ⤢</em></div>
        <div class="rx-chips">${chip(TOTAL_PED, 'pedidos')}${chip(money(TOTAL_PED * TICKET), 'facturado')}${chip('21:00', 'hora pico')}</div>
        ${bars(H.map(([h, v]) => [h + ' h', v]), { hi: 2, h: 120 })}
        <div class="rx-mini-foot">${['Resumen', 'Horarios', 'Delivery', 'Ticket'].map(t => `<span>${t}</span>`).join('')}</div>
      </div>
    </div>
  </article>

  <div class="project-duo">
    <article class="proj-mini p-burger">
      <a class="rx-browser" href="${CFG.burgerUrl}" target="_blank" rel="noopener noreferrer" aria-label="Abrir la página de la hamburguesería">
        <div class="rx-mini-top"><span class="rx-dots"><i></i><i></i><i></i></span><span>tomasanfo.github.io/burgerANFO</span></div>
        <div class="rx-frame" id="rx-frame"><div class="rx-fb"><span>🍔 Cargando la página…</span></div>
          <iframe src="${CFG.burgerUrl}" title="Vista previa de la página de la hamburguesería" loading="lazy" tabindex="-1" sandbox="allow-scripts allow-same-origin"></iframe></div>
      </a>
      <div class="pm-body">
      <div class="project-badge badge-orange">Sitio web · HTML, CSS y JavaScript</div>
      <h3>Sitio web de la hamburguesería · para pedir</h3>
      <p class="project-desc">La cara pública del local: menú configurable (menu.json), fotos, panel de administración y pedido que sale armado como mensaje de WhatsApp. Es el que alimenta al sistema de arriba.</p>
      <div class="project-tags">${tags(['HTML5', 'CSS3', 'JavaScript', 'JSON', 'GitHub Pages'])}</div>
      <a href="${CFG.burgerUrl}" target="_blank" rel="noopener noreferrer" class="btn-secondary">Visitar la página ${arrow}</a>
      </div>
    </article>

    <article class="proj-mini p-analizer">
      <a class="rx-browser rx-small" href="${CFG.analizerUrl}" target="_blank" rel="noopener noreferrer" aria-label="Abrir la web de Analizer IA">
        <div class="analizer-window">
          <div class="analizer-titlebar"><div class="analizer-dots"><span class="a-dot red"></span><span class="a-dot gray"></span><span class="a-dot gray"></span></div><div class="analizer-title">Analizer IA local v1.3 · by @tomasanfo</div></div>
          <div class="analizer-body">
            <div class="analizer-toggles"><div class="a-toggle"><span class="a-switch"></span> Drop + Intensidad Sostenida</div><div class="a-toggle"><span class="a-switch"></span> Calibración por Género</div><div class="a-toggle"><span class="a-switch"></span> Sync Rekordbox</div></div>
            <div class="analizer-progress-info"><span>Tu Colección: <strong>1,840</strong> · en paralelo: <strong class="text-red">1,840 / 1,840</strong></span><span>100% Calibrado</span></div>
            <div class="analizer-progress-bar"><div class="analizer-progress-fill"></div></div>
            <div class="analizer-console">
              <div class="c-line"><span class="c-genre">[Melodic Techno]</span> Anyma - Pictures Of You → <strong>[🔥 85% | 5★ EXPLOSIVO]</strong></div>
              <div class="c-line"><span class="c-genre">[Indie Dance]</span> Adam Ten - High On → <strong>[🔥 79% | 4★ POTENTE]</strong></div>
              <div class="c-line"><span class="c-genre">[House]</span> Disclosure - Latch → [🔥 61% | 3★ SÓLIDO]</div>
              <div class="c-line"><span class="c-genre">[Deep House]</span> Solomun - Something We All Adore → [🔥 38% | 2★ SUAVE]</div>
              <div class="c-sync">[✓ REKORDBOX SYNC] Backup de master.db creado.</div>
            </div>
          </div>
        </div>
      </a>
      <div class="pm-body">
      <div class="project-badge badge-neutral">Aplicación de escritorio · Python + IA local</div>
      <h3>Analizer IA local v1.3</h3>
      <p class="project-subtitle">Motor de energía musical para DJs: puntúa cada tema de 1★ a 5★</p>
      <p class="project-desc">Programa para Windows que recorre las carpetas de música, mide qué tan fuerte es cada tema (en el drop y en todo su recorrido) y graba el resultado en los tags de los archivos y en la base de Rekordbox, para armar sets filtrando por energía. Todo corre en la PC: no sube nada a internet.</p>
      <div class="project-metrics-grid">${metrics([['Análisis', 'Señal + IA de apoyo'], ['Modelo', 'LAION-CLAP local'], ['Privacidad', '100% local']])}</div>
      <ol class="az-steps">
        <li><b>Elegís la carpeta</b> MP3, FLAC, WAV, AIFF y M4A</li>
        <li><b>Analiza cada tema</b> detecta el drop (ventana de 30 s) y mide la intensidad sostenida</li>
        <li><b>Calibra por género</b> compara cada track solo con los de su estilo</li>
        <li><b>Graba el resultado</b> en los tags y en master.db, con backup automático</li>
      </ol>
      <div class="az-colors" aria-label="Colores que se escriben en Rekordbox">${[['5★ Explosivo', '#ef4444'], ['4★ Potente', '#f97316'], ['3★ Sólido', '#eab308'], ['2★ Suave', '#22d3ee'], ['1★ Chill', '#3b82f6']].map(([t, c]) => `<span><i style="background:${c}"></i>${t}</span>`).join('')}</div>
      <ul class="az-notes">
        <li>Análisis en paralelo, con caché y pausa: retoma donde quedó y no repite temas.</li>
        <li>Botón “Limpiar estrellas” para deshacer lo que escribió, sin tocar género, título ni BPM.</li>
        <li>Instalador automático con entorno aislado (Python 3.10–3.13, usa NVIDIA si hay, o CPU).</li>
      </ul>
      <div class="project-tags">${tags(['Python', 'PyTorch', 'LAION-CLAP', 'DSP de audio', 'Multiprocessing', 'SQLite (master.db)'])}</div>
      <div class="az-actions"><a href="${CFG.analizerUrl}" target="_blank" rel="noopener noreferrer" class="btn-secondary">Ver la web ${arrow}</a><a href="${CFG.analizerRepo}" target="_blank" rel="noopener noreferrer" class="btn-secondary">GitHub ${arrow}</a></div>
      </div>
    </article>
  </div>`;

  $$('[data-open]', c).forEach(el => {
    el.addEventListener('click', () => openM(el, el.dataset.open));
    el.addEventListener('keydown', e => { if (e.target === el && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openM(el, el.dataset.open); } });
  });
  // escala la vista previa del sitio al ancho de la tarjeta
  const fr = $('#rx-frame'), f = $('iframe', fr);
  const fit = () => { const s = fr.clientWidth / 1200; f.style.transform = `scale(${s})`; fr.style.height = Math.round(750 * s) + 'px'; };
  fit(); new ResizeObserver(fit).observe(fr);
}
window.renderPortfolioProjects = render;
})();
