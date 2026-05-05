/* ═══════════════════════════════════════════════════════════════
   app.js  —  MathEasy
   Lógica completa: tabs, símbolos, preview, fetch, historial
═══════════════════════════════════════════════════════════════ */

/* ──────────────────────────────────────────────────────────────
   1. WebChannel Qt ↔ JS
   ui es un Proxy que encola llamadas hasta que el canal esté listo.
   Así initDrag() puede llamar ui.start_drag() sin importar el timing.
────────────────────────────────────────────────────────────── */
var _uiReal = null;
var _uiQueue = [];

// Proxy: si ui aún no está listo, encola la llamada
var ui = new Proxy({}, {
    get(_, method) {
        return function(...args) {
            if (_uiReal && typeof _uiReal[method] === 'function') {
                _uiReal[method](...args);
            } else {
                _uiQueue.push({ method, args });
            }
        };
    }
});

function _flushUiQueue() {
    _uiQueue.forEach(({ method, args }) => {
        if (_uiReal && typeof _uiReal[method] === 'function')
            _uiReal[method](...args);
    });
    _uiQueue = [];
}

if (typeof QWebChannel !== 'undefined' && typeof qt !== 'undefined') {
    new QWebChannel(qt.webChannelTransport, function(channel) {
        _uiReal = channel.objects.pyobj;
        _flushUiQueue();
    });
}

/* ──────────────────────────────────────────────────────────────
   2. Estado global
────────────────────────────────────────────────────────────── */
let tabActual  = 'simple';
let modoSimple = 'indefinida';
let lastLatex  = '';
let historial  = [];

/* ──────────────────────────────────────────────────────────────
   3. Definición de símbolos
────────────────────────────────────────────────────────────── */
const SIMP = [
    { l: 'sin',   c: 'sin()'  }, { l: 'cos',   c: 'cos()'  },
    { l: 'tan',   c: 'tan()'  }, { l: 'eˣ',    c: 'exp()'  },
    { l: 'ln',    c: 'log()'  }, { l: '√',     c: 'sqrt()' },
    { l: 'π',     c: 'pi'     }, { l: '∞',     c: 'oo'     },
    { l: 'x²',    c: '**2'    }, { l: 'xⁿ',    c: '**'     },
    { l: '|x|',   c: 'Abs()'  }, { l: 'asin',  c: 'asin()' },
    { l: 'acos',  c: 'acos()' }, { l: 'atan',  c: 'atan()' },
];

const POLAR_SYMS = [
    { l: 'sin(θ)', c: 'sin(theta)' }, { l: 'cos(θ)', c: 'cos(theta)' },
    { l: 'tan(θ)', c: 'tan(theta)' }, { l: 'θ',      c: 'theta'      },
    { l: 'π',      c: 'pi'         }, { l: '2π',     c: '2*pi'       },
    { l: 'π/2',    c: 'pi/2'       }, { l: 'r²',     c: '**2'        },
    { l: '√',      c: 'sqrt()'     }, { l: '∞',      c: 'oo'         },
];

const EJEMPLOS_POLAR = [
    { l: 'Cardioide',      r1: '0', r2: '1 + cos(theta)',           ta: '0',     tb: '2*pi'  },
    { l: 'Círculo r=2',    r1: '0', r2: '2',                        ta: '0',     tb: '2*pi'  },
    { l: 'Rosa 4 pétalos', r1: '0', r2: 'cos(2*theta)',             ta: '0',     tb: '2*pi'  },
    { l: 'Caracol',        r1: '0', r2: '1 + 2*sin(theta)',         ta: '0',     tb: '2*pi'  },
    { l: 'Lemniscata',     r1: '0', r2: 'sqrt(Abs(cos(2*theta)))', ta: '-pi/4', tb: 'pi/4'  },
];

const EJEMPLOS_DOBLE_POLAR = [
    { l: 'Anillo',        r1: '1', r2: '2',                ta: '0', tb: '2*pi' },
    { l: 'Semicírculo',   r1: '0', r2: '3',                ta: '0', tb: 'pi'   },
    { l: 'Cardioide',     r1: '0', r2: '1 + cos(theta)',   ta: '0', tb: '2*pi' },
    { l: 'Entre círculos',r1: '1', r2: '1+cos(theta)',     ta: '0', tb: 'pi'   },
];

/* ──────────────────────────────────────────────────────────────
   4. Construir barras de chips de símbolos
────────────────────────────────────────────────────────────── */
function buildBar(barId, syms, targetId) {
    const bar = document.getElementById(barId);
    if (!bar) return;
    syms.forEach(s => {
        const b = document.createElement('button');
        b.className   = 'sym-chip';
        b.textContent = s.l;
        b.onclick     = () => ins(targetId, s.c);
        bar.appendChild(b);
    });
}

/* ──────────────────────────────────────────────────────────────
   5. Construir botones de ejemplos
────────────────────────────────────────────────────────────── */
function buildEjemplos(wrapperId, ejemplos, campos) {
    const wrap = document.getElementById(wrapperId);
    if (!wrap) return;
    ejemplos.forEach(ej => {
        const b = document.createElement('button');
        b.className   = 'ej-btn';
        b.textContent = ej.l;
        b.onclick     = () => {
            Object.entries(campos).forEach(([key, id]) => {
                const el = document.getElementById(id);
                if (el) el.value = ej[key] ?? '';
            });
            // Disparar preview del panel activo
            actualizarPreviewActual();
        };
        wrap.appendChild(b);
    });
}

/* ──────────────────────────────────────────────────────────────
   6. Generar límites triple por JS
────────────────────────────────────────────────────────────── */
function buildTripleLimits() {
    const wrap = document.getElementById('triple-limits');
    if (!wrap) return;
    ['x', 'y', 'z'].forEach(v => {
        const d = document.createElement('div');
        d.className        = 'limits-panel';
        d.style.marginBottom = '10px';
        d.innerHTML = `
            <div class="limits-panel-title">Límites de ${v}</div>
            <div class="limits-row">
                <span class="lim-label">desde:</span>
                <input class="lim-input" type="text" id="tr-a${v}" placeholder="0">
                <span class="lim-label">hasta:</span>
                <input class="lim-input" type="text" id="tr-b${v}" placeholder="1">
            </div>`;
        wrap.appendChild(d);
    });
}

/* ──────────────────────────────────────────────────────────────
   7. Insertar símbolo en input (mantiene cursor)
────────────────────────────────────────────────────────────── */
// Compatibilidad con tu función add() original
function add(val) { ins('funcion', val); }

function ins(id, val) {
    const inp = document.getElementById(id);
    if (!inp) return;
    const start = inp.selectionStart ?? inp.value.length;
    const end   = inp.selectionEnd   ?? start;
    inp.value = inp.value.slice(0, start) + val + inp.value.slice(end);
    inp.focus();
    inp.selectionStart = inp.selectionEnd = start + val.length;
    inp.dispatchEvent(new Event('input'));
}

function borrar(id) {
    const inp = document.getElementById(id);
    if (!inp) return;
    const pos = inp.selectionStart;
    if (pos > 0) {
        inp.value = inp.value.slice(0, pos - 1) + inp.value.slice(inp.selectionEnd ?? pos);
        inp.selectionStart = inp.selectionEnd = pos - 1;
    }
    inp.focus();
    inp.dispatchEvent(new Event('input'));
}

/* ──────────────────────────────────────────────────────────────
   8. Navegación de tabs
────────────────────────────────────────────────────────────── */
const TAB_INDEX = { simple: 0, doble: 1, triple: 2, polar: 3, doble_polar: 4 };

function setTab(tab) {
    tabActual = tab;
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-item').forEach(b => b.classList.remove('active'));

    const panel = document.getElementById('panel-' + tab);
    if (panel) panel.classList.add('active');

    const idx = TAB_INDEX[tab];
    const btns = document.querySelectorAll('.tab-item');
    if (btns[idx]) btns[idx].classList.add('active');

    actualizarPreviewActual();
}

/* ──────────────────────────────────────────────────────────────
   9. Modo indefinida / definida  (simple)
────────────────────────────────────────────────────────────── */
// Compatibilidad con tu setMode() original
function setMode(mode) { setModo(mode.toLowerCase()); }

function setModo(modo) {
    modoSimple = modo;
    document.getElementById('btn-indef')?.classList.toggle('active', modo === 'indefinida');
    document.getElementById('btn-def')?.classList.toggle('active',   modo === 'definida');
    document.getElementById('limits-wrap')?.classList.toggle('visible', modo === 'definida');
    updatePreviewSimple();
}

/* ──────────────────────────────────────────────────────────────
   10. Previews dinámicos
────────────────────────────────────────────────────────────── */
function updatePreviewSimple() {
    const e = document.getElementById('funcion')?.value || 'f(x)';
    const v = document.getElementById('s-var')?.value   || 'x';
    const p = document.getElementById('preview-simple');
    if (!p) return;
    if (modoSimple === 'definida') {
        const a = document.getElementById('s-a')?.value || 'a';
        const b = document.getElementById('s-b')?.value || 'b';
        p.textContent = `∫  ${a} → ${b}   ${e}  d${v}`;
    } else {
        p.textContent = `∫  ${e}  d${v}`;
    }
}

function updatePreviewDoble() {
    const e = document.getElementById('d-expr')?.value || 'f(x,y)';
    const p = document.getElementById('preview-doble');
    if (p) p.textContent = `∬  ${e}  dy dx`;
}

function updatePreviewPolar() {
    const r  = document.getElementById('p-r2')?.value  || 'r(θ)';
    const r1 = document.getElementById('p-r1')?.value  || '0';
    const ta = document.getElementById('p-ta')?.value  || 'α';
    const tb = document.getElementById('p-tb')?.value  || 'β';
    const p  = document.getElementById('preview-polar');
    if (p) p.textContent = `∫ ${ta}→${tb}  ∫ ${r1}→${r}  f·r  dr dθ`;
}

function updatePreviewDoblePolar() {
    const f  = document.getElementById('dp-funcion')?.value || 'f(r,θ)';
    const r1 = document.getElementById('dp-r1')?.value      || '0';
    const r2 = document.getElementById('dp-r2')?.value      || 'r₂';
    const ta = document.getElementById('dp-ta')?.value      || 'α';
    const tb = document.getElementById('dp-tb')?.value      || 'β';
    const p  = document.getElementById('preview-doble-polar');
    if (p) p.textContent = `∫ ${ta}→${tb}  ∫ ${r1}→${r2}  ${f}·r  dr dθ`;
}

function actualizarPreviewActual() {
    const map = {
        simple:      updatePreviewSimple,
        doble:       updatePreviewDoble,
        polar:       updatePreviewPolar,
        doble_polar: updatePreviewDoblePolar,
    };
    map[tabActual]?.();
}

/* ──────────────────────────────────────────────────────────────
   11. Calcular  (fetch a Flask)
────────────────────────────────────────────────────────────── */
const URL_MAP = {
    simple:      '/calcular/simple',
    doble:       '/calcular/doble',
    triple:      '/calcular/triple',
    polar:       '/calcular/polar',
    doble_polar: '/calcular/doble_polar',
};

const LOADER_MAP = {
    simple:      'loader-s',
    doble:       'loader-d',
    triple:      'loader-t',
    polar:       'loader-p',
    doble_polar: 'loader-dp',
};

function getBody(tipo) {
    const v = id => document.getElementById(id)?.value ?? '';
    switch (tipo) {
        case 'simple':
            return {
                funcion:  v('funcion'),
                variable: v('s-var') || 'x',
                a: modoSimple === 'definida' ? v('s-a') : '',
                b: modoSimple === 'definida' ? v('s-b') : '',
            };
        case 'doble':
            return {
                funcion: v('d-expr'),
                ax: v('d-ax'), bx: v('d-bx'),
                ay: v('d-ay'), by: v('d-by'),
            };
        case 'triple':
            return {
                funcion: v('t-expr'),
                ax: v('tr-ax'), bx: v('tr-bx'),
                ay: v('tr-ay'), by: v('tr-by'),
                az: v('tr-az'), bz: v('tr-bz'),
            };
        case 'polar':
            return {
                r_expr:  v('p-r2'),
                r_inner: v('p-r1') || '0',
                f_expr:  v('p-f')  || '1',
                ta: v('p-ta'), tb: v('p-tb'),
            };
        case 'doble_polar':
            return {
                funcion: v('dp-funcion') || '1',
                r1: v('dp-r1') || '0',
                r2: v('dp-r2'),
                ta: v('dp-ta'), tb: v('dp-tb'),
            };
        default:
            return {};
    }
}

async function calcular(tipo) {
    const loader = document.getElementById(LOADER_MAP[tipo]);
    loader?.classList.add('active');

    const area = document.getElementById('resultado_area');
    const box  = document.getElementById('resultado-box');
    area.innerHTML = 'Calculando...';
    area.classList.remove('error-text');

    try {
        const res  = await fetch(URL_MAP[tipo], {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify(getBody(tipo)),
        });
        const data = await res.json();

        if (data.success) {
            lastLatex      = data.resultado;
            area.innerHTML = data.resultado;
            area.classList.remove('error-text');
            box.classList.remove('error');
            box.classList.add('ok');
            MathJax.typesetPromise([area]);
            agregarHistorial(data.resultado, tipo);
        } else {
            area.textContent = '⚠  ' + data.error;
            area.classList.add('error-text');
            box.classList.remove('ok');
            box.classList.add('error');
            lastLatex = '';
        }
    } catch (err) {
        area.textContent = 'Error de conexión: ' + err.message;
        area.classList.add('error-text');
        box.classList.add('error');
    } finally {
        loader?.classList.remove('active');
    }
}

/* ──────────────────────────────────────────────────────────────
   12. Limpiar campos
────────────────────────────────────────────────────────────── */
function limpiar(tipo) {
    const clear = ids => ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });

    switch (tipo) {
        case 'simple':
            clear(['funcion', 's-a', 's-b']);
            updatePreviewSimple();
            break;
        case 'doble':
            clear(['d-expr', 'd-ax', 'd-bx', 'd-ay', 'd-by']);
            updatePreviewDoble();
            break;
        case 'triple':
            clear(['t-expr', 'tr-ax', 'tr-bx', 'tr-ay', 'tr-by', 'tr-az', 'tr-bz']);
            break;
        case 'polar':
            clear(['p-f', 'p-r2']);
            document.getElementById('p-r1').value  = '0';
            document.getElementById('p-ta').value  = '0';
            document.getElementById('p-tb').value  = '2*pi';
            updatePreviewPolar();
            break;
        case 'doble_polar':
            clear(['dp-funcion', 'dp-r2']);
            document.getElementById('dp-r1').value = '0';
            document.getElementById('dp-ta').value = '0';
            document.getElementById('dp-tb').value = '2*pi';
            updatePreviewDoblePolar();
            break;
    }
}

/* ──────────────────────────────────────────────────────────────
   13. Historial
────────────────────────────────────────────────────────────── */
const ICON_MAP = { simple:'∫', doble:'∬', triple:'∭', polar:'⊙', doble_polar:'∬⊙' };

function agregarHistorial(latex, tipo) {
    historial.unshift({ latex, tipo });
    if (historial.length > 8) historial.pop();

    const lista = document.getElementById('historial-lista');
    if (!lista) return;
    lista.innerHTML = '';

    historial.forEach((h, i) => {
        const d = document.createElement('div');
        d.className   = 'hist-item';
        d.textContent = `${ICON_MAP[h.tipo]}  Cálculo ${i + 1}`;
        d.title       = h.latex;
        d.onclick     = () => {
            const area = document.getElementById('resultado_area');
            area.innerHTML = h.latex;
            area.classList.remove('error-text');
            MathJax.typesetPromise([area]);
        };
        lista.appendChild(d);
    });
}

/* ──────────────────────────────────────────────────────────────
   14. Copiar LaTeX
────────────────────────────────────────────────────────────── */
function copiar() {
    if (!lastLatex) return;
    navigator.clipboard.writeText(lastLatex).then(() => {
        const b = document.getElementById('btn-copy');
        if (!b) return;
        b.textContent = '✓ Copiado';
        setTimeout(() => b.textContent = 'Copiar LaTeX', 1500);
    });
}

/* ──────────────────────────────────────────────────────────────
   15. Window management  —  drag, resize, snap Win+flechas
────────────────────────────────────────────────────────────── */

// ── Drag desde la title-bar ──────────────────────────────────
function initDrag() {
    const bar = document.getElementById('titlebar') || document.querySelector('.title-bar');
    if (!bar) return;

    let dragging = false;

    bar.addEventListener('mousedown', e => {
        if (e.target.closest('button')) return;
        if (e.button !== 0) return;
        dragging = true;
        // screenX/Y son coordenadas reales de pantalla — lo que Qt necesita
        ui.start_drag(Math.round(e.screenX), Math.round(e.screenY));
        e.preventDefault();
    });

    // mousemove en document para capturar aunque el mouse salga de la barra
    document.addEventListener('mousemove', e => {
        if (!dragging) return;
        ui.do_drag(Math.round(e.screenX), Math.round(e.screenY));
    });

    document.addEventListener('mouseup', e => {
        if (!dragging) return;
        dragging = false;
        ui.end_drag();
    });

    // Doble click = maximizar/restaurar
    bar.addEventListener('dblclick', e => {
        if (e.target.closest('button')) return;
        ui.snap('maximize');
    });
}

// ── Resize desde los bordes ──────────────────────────────────
function initResize() {
    const MARGIN = 6;   // px desde el borde donde se activa resize
    let resizing  = false;
    let resizeDir = '';
    let startX, startY, startW, startH, startL, startT;

    // Detectar dirección según posición del mouse
    document.addEventListener('mousemove', e => {
        if (resizing) {
            doResize(e);
            return;
        }
        const x = e.clientX, y = e.clientY;
        const W = window.innerWidth, H = window.innerHeight;
        const m = MARGIN;

        let dir = '';
        if (y < m)       dir += 'n';
        if (y > H - m)   dir += 's';
        if (x < m)       dir += 'w';
        if (x > W - m)   dir += 'e';

        const cursorMap = {
            n:'n-resize', s:'s-resize', w:'w-resize', e:'e-resize',
            nw:'nw-resize', ne:'ne-resize', sw:'sw-resize', se:'se-resize',
        };
        document.body.style.cursor = cursorMap[dir] || '';
    });

    document.addEventListener('mousedown', e => {
        if (e.button !== 0) return;
        const x = e.clientX, y = e.clientY;
        const W = window.innerWidth, H = window.innerHeight;
        const m = MARGIN;

        let dir = '';
        if (y < m)       dir += 'n';
        if (y > H - m)   dir += 's';
        if (x < m)       dir += 'w';
        if (x > W - m)   dir += 'e';

        if (!dir) return;

        resizing  = true;
        resizeDir = dir;
        startX    = e.screenX;
        startY    = e.screenY;

        // Pedimos la geometría actual a Python
        // (la guardamos en data-attrs del body al arrancar)
        startW = parseInt(document.body.dataset.winW || window.outerWidth);
        startH = parseInt(document.body.dataset.winH || window.outerHeight);
        startL = parseInt(document.body.dataset.winX || 0);
        startT = parseInt(document.body.dataset.winY || 0);

        e.preventDefault();
    });

    document.addEventListener('mouseup', () => {
        resizing = false;
        resizeDir = '';
        document.body.style.cursor = '';
    });

    function doResize(e) {
        const dx = e.screenX - startX;
        const dy = e.screenY - startY;

        let newX = startL, newY = startT;
        let newW = startW, newH = startH;

        if (resizeDir.includes('e')) newW = Math.max(480, startW + dx);
        if (resizeDir.includes('s')) newH = Math.max(360, startH + dy);
        if (resizeDir.includes('w')) { newW = Math.max(480, startW - dx); newX = startL + (startW - newW); }
        if (resizeDir.includes('n')) { newH = Math.max(360, startH - dy); newY = startT + (startH - newH); }

        if (typeof ui !== 'undefined' && ui)
            ui.resize_window(newX, newY, newW, newH);
    }
}

// ── Snap Win+flechas desde teclado (respaldo JS) ─────────────
function initKeySnap() {
    document.addEventListener('keydown', e => {
        // Solo si Meta (Win) está presionado
        if (!e.metaKey) return;
        const map = {
            ArrowLeft:  'left',
            ArrowRight: 'right',
            ArrowUp:    'up',
            ArrowDown:  'down',
        };
        const dir = map[e.key];
        if (!dir) return;
        e.preventDefault();
        if (typeof ui !== 'undefined' && ui)
            ui.snap(dir);
    });
}

// ── Sync tamaño de ventana para resize ───────────────────────
function syncWindowSize() {
    document.body.dataset.winW = window.outerWidth;
    document.body.dataset.winH = window.outerHeight;
    // La posición real la conoce Qt, no podemos leerla desde JS
    // Para resize desde borde west/north necesitamos que Python
    // confirme la posición — se maneja en main.py
}

/* ──────────────────────────────────────────────────────────────
   16. Init  —  se ejecuta cuando el DOM está listo
────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

    // Barras de símbolos
    buildBar('sym-simple',      SIMP,       'funcion');
    buildBar('sym-doble',       SIMP,       'd-expr');
    buildBar('sym-triple',      SIMP,       't-expr');
    buildBar('sym-polar',       POLAR_SYMS, 'p-r2');
    buildBar('sym-doble-polar', POLAR_SYMS, 'dp-funcion');

    // Ejemplos
    buildEjemplos('ejemplos-polar', EJEMPLOS_POLAR, {
        r2: 'p-r2', r1: 'p-r1', ta: 'p-ta', tb: 'p-tb'
    });
    buildEjemplos('ejemplos-doble-polar', EJEMPLOS_DOBLE_POLAR, {
        r1: 'dp-r1', r2: 'dp-r2', ta: 'dp-ta', tb: 'dp-tb'
    });

    // Límites triple generados dinámicamente
    buildTripleLimits();

    // Previews iniciales
    updatePreviewSimple();
    updatePreviewDoble();
    updatePreviewPolar();
    updatePreviewDoblePolar();

    // Window management
    initDrag();
    initResize();
    initKeySnap();
    syncWindowSize();
    window.addEventListener('resize', syncWindowSize);
});