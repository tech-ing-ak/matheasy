/* ═══════════════════════════════════════════════════════════════
   themes.js  —  MathEasy
   Sistema de temas: define variables CSS, aplica y persiste
═══════════════════════════════════════════════════════════════ */

const THEMES = {

    // ── Dark (default) ────────────────────────────────────────
    dark: {
        label:   'Dark',
        emoji:   '🌑',
        vars: {
            '--bg':           '#1e1e1e',
            '--bg2':          '#1a1a1a',
            '--bg3':          '#121212',
            '--surface':      '#252525',
            '--surface2':     '#2d2d2d',
            '--border':       '#333333',
            '--border2':      '#3d3d3d',
            '--text':         '#ffffff',
            '--text2':        '#aaaaaa',
            '--text3':        '#666666',
            '--accent':       '#7f6ef5',
            '--accent2':      '#a594ff',
            '--accent-glow':  'rgba(127,110,245,.35)',
            '--success':      '#27c93f',
            '--error':        '#ff5f56',
            '--gold':         '#dea123',
            // teclado
            '--kb-num-bg':    '#2a2a2a',
            '--kb-num-text':  '#f0f0f0',
            '--kb-num-bdr':   '#3a3a3a',
            '--kb-op-bg':     '#2e2040',
            '--kb-op-text':   '#a594ff',
            '--kb-op-bdr':    '#433060',
            '--kb-fn-bg':     '#1e2030',
            '--kb-fn-text':   '#7f9cf5',
            '--kb-fn-bdr':    '#2a3050',
            '--kb-ac-bg':     '#3a1a1a',
            '--kb-ac-text':   '#f87171',
            '--kb-del-bg':    '#28240f',
            '--kb-del-text':  '#fbbf24',
            '--kb-spec-bg':   '#1a2820',
            '--kb-spec-text': '#6ee7b7',
            '--kb-eq-from':   '#7f6ef5',
            '--kb-eq-to':     '#5a4ec4',
        }
    },

    // ── Purple Night ──────────────────────────────────────────
    purple: {
        label: 'Purple Night',
        emoji: '🟣',
        vars: {
            '--bg':           '#0f0b1e',
            '--bg2':          '#130e24',
            '--bg3':          '#0a0714',
            '--surface':      '#1c1630',
            '--surface2':     '#261f3e',
            '--border':       '#2e255a',
            '--border2':      '#3d3270',
            '--text':         '#ede8ff',
            '--text2':        '#9d8fd4',
            '--text3':        '#5a4e8a',
            '--accent':       '#b06ef5',
            '--accent2':      '#cf9fff',
            '--accent-glow':  'rgba(176,110,245,.4)',
            '--success':      '#7ee8a2',
            '--error':        '#ff6b8a',
            '--gold':         '#e8a840',
            '--kb-num-bg':    '#1c1630',
            '--kb-num-text':  '#ede8ff',
            '--kb-num-bdr':   '#2e255a',
            '--kb-op-bg':     '#2a1850',
            '--kb-op-text':   '#cf9fff',
            '--kb-op-bdr':    '#4a2e80',
            '--kb-fn-bg':     '#180f3a',
            '--kb-fn-text':   '#a080f5',
            '--kb-fn-bdr':    '#2a1860',
            '--kb-ac-bg':     '#3a0f28',
            '--kb-ac-text':   '#ff8aaa',
            '--kb-del-bg':    '#2a2010',
            '--kb-del-text':  '#ffcc60',
            '--kb-spec-bg':   '#0f2030',
            '--kb-spec-text': '#80e8d0',
            '--kb-eq-from':   '#b06ef5',
            '--kb-eq-to':     '#7040c0',
        }
    },

    // ── Ocean ─────────────────────────────────────────────────
    ocean: {
        label: 'Ocean',
        emoji: '🌊',
        vars: {
            '--bg':           '#0a1628',
            '--bg2':          '#0d1c32',
            '--bg3':          '#060e1a',
            '--surface':      '#102040',
            '--surface2':     '#162848',
            '--border':       '#1e3858',
            '--border2':      '#2a4a6e',
            '--text':         '#d0eeff',
            '--text2':        '#7aa8cc',
            '--text3':        '#3a6080',
            '--accent':       '#2e9cff',
            '--accent2':      '#70c0ff',
            '--accent-glow':  'rgba(46,156,255,.35)',
            '--success':      '#30e8b0',
            '--error':        '#ff6060',
            '--gold':         '#f0b840',
            '--kb-num-bg':    '#102040',
            '--kb-num-text':  '#d0eeff',
            '--kb-num-bdr':   '#1e3858',
            '--kb-op-bg':     '#0e2850',
            '--kb-op-text':   '#70c0ff',
            '--kb-op-bdr':    '#1a3e70',
            '--kb-fn-bg':     '#081828',
            '--kb-fn-text':   '#50a8e8',
            '--kb-fn-bdr':    '#103050',
            '--kb-ac-bg':     '#280e1a',
            '--kb-ac-text':   '#ff8888',
            '--kb-del-bg':    '#1e1c08',
            '--kb-del-text':  '#f0d060',
            '--kb-spec-bg':   '#081e28',
            '--kb-spec-text': '#40d8b8',
            '--kb-eq-from':   '#2e9cff',
            '--kb-eq-to':     '#1060c0',
        }
    },

    // ── Forest ────────────────────────────────────────────────
    forest: {
        label: 'Forest',
        emoji: '🌿',
        vars: {
            '--bg':           '#0c1a10',
            '--bg2':          '#0e1e12',
            '--bg3':          '#080f0a',
            '--surface':      '#142018',
            '--surface2':     '#1c2e20',
            '--border':       '#1e3824',
            '--border2':      '#2a4a30',
            '--text':         '#d4f0d8',
            '--text2':        '#7aaa88',
            '--text3':        '#3a6044',
            '--accent':       '#3ed870',
            '--accent2':      '#70f0a0',
            '--accent-glow':  'rgba(62,216,112,.35)',
            '--success':      '#40e880',
            '--error':        '#ff6868',
            '--gold':         '#e8c840',
            '--kb-num-bg':    '#142018',
            '--kb-num-text':  '#d4f0d8',
            '--kb-num-bdr':   '#1e3824',
            '--kb-op-bg':     '#102818',
            '--kb-op-text':   '#70f0a0',
            '--kb-op-bdr':    '#1c4028',
            '--kb-fn-bg':     '#0c1e10',
            '--kb-fn-text':   '#50c870',
            '--kb-fn-bdr':    '#183020',
            '--kb-ac-bg':     '#280e0e',
            '--kb-ac-text':   '#ff8888',
            '--kb-del-bg':    '#201c08',
            '--kb-del-text':  '#f0d050',
            '--kb-spec-bg':   '#0e2818',
            '--kb-spec-text': '#60e8c0',
            '--kb-eq-from':   '#3ed870',
            '--kb-eq-to':     '#20a040',
        }
    },

    // ── Sunset ────────────────────────────────────────────────
    sunset: {
        label: 'Sunset',
        emoji: '🌅',
        vars: {
            '--bg':           '#1a0e0a',
            '--bg2':          '#1e1008',
            '--bg3':          '#100806',
            '--surface':      '#2a1810',
            '--surface2':     '#362018',
            '--border':       '#4a2818',
            '--border2':      '#603020',
            '--text':         '#ffe8d8',
            '--text2':        '#cc9878',
            '--text3':        '#804840',
            '--accent':       '#ff7040',
            '--accent2':      '#ff9870',
            '--accent-glow':  'rgba(255,112,64,.35)',
            '--success':      '#60e890',
            '--error':        '#ff4060',
            '--gold':         '#ffcc40',
            '--kb-num-bg':    '#2a1810',
            '--kb-num-text':  '#ffe8d8',
            '--kb-num-bdr':   '#4a2818',
            '--kb-op-bg':     '#3a1808',
            '--kb-op-text':   '#ff9870',
            '--kb-op-bdr':    '#602818',
            '--kb-fn-bg':     '#201008',
            '--kb-fn-text':   '#ff7858',
            '--kb-fn-bdr':    '#401808',
            '--kb-ac-bg':     '#300808',
            '--kb-ac-text':   '#ff6060',
            '--kb-del-bg':    '#281c04',
            '--kb-del-text':  '#ffcc50',
            '--kb-spec-bg':   '#101e10',
            '--kb-spec-text': '#60e8b0',
            '--kb-eq-from':   '#ff7040',
            '--kb-eq-to':     '#cc3010',
        }
    },

    // ── Light ─────────────────────────────────────────────────
    light: {
        label: 'Light',
        emoji: '☀️',
        vars: {
            '--bg':           '#f5f5f8',
            '--bg2':          '#eeeeف2',
            '--bg3':          '#e8e8ec',
            '--surface':      '#ffffff',
            '--surface2':     '#f0f0f4',
            '--border':       '#d0d0da',
            '--border2':      '#b8b8c8',
            '--text':         '#1a1a2e',
            '--text2':        '#505070',
            '--text3':        '#9090b0',
            '--accent':       '#6050e0',
            '--accent2':      '#7060f0',
            '--accent-glow':  'rgba(96,80,224,.2)',
            '--success':      '#18a040',
            '--error':        '#e03020',
            '--gold':         '#c08010',
            '--kb-num-bg':    '#f0f0f4',
            '--kb-num-text':  '#1a1a2e',
            '--kb-num-bdr':   '#d0d0da',
            '--kb-op-bg':     '#e8e4ff',
            '--kb-op-text':   '#6050e0',
            '--kb-op-bdr':    '#c0b8f0',
            '--kb-fn-bg':     '#e8f0ff',
            '--kb-fn-text':   '#4060c0',
            '--kb-fn-bdr':    '#b8c8f0',
            '--kb-ac-bg':     '#ffe8e8',
            '--kb-ac-text':   '#c02020',
            '--kb-del-bg':    '#fff8e0',
            '--kb-del-text':  '#a06010',
            '--kb-spec-bg':   '#e8fff4',
            '--kb-spec-text': '#208060',
            '--kb-eq-from':   '#6050e0',
            '--kb-eq-to':     '#4030b0',
        }
    },

};

// ─────────────────────────────────────────────────────────────
//  Aplicar tema
// ─────────────────────────────────────────────────────────────
function applyTheme(name) {
    const theme = THEMES[name];
    if (!theme) return;

    const root = document.documentElement;

    // Aplicar variables CSS
    Object.entries(theme.vars).forEach(([k, v]) => {
        root.style.setProperty(k, v);
    });

    // Actualizar colores que van en style.css (background del container, sidebar, etc.)
    // Lo hacemos con una hoja de estilos dinámica
    const id = 'theme-override';
    let sheet = document.getElementById(id);
    if (!sheet) {
        sheet = document.createElement('style');
        sheet.id = id;
        document.head.appendChild(sheet);
    }

    const bg      = theme.vars['--bg'];
    const bg2     = theme.vars['--bg2'];
    const bg3     = theme.vars['--bg3'];
    const surface = theme.vars['--surface'];
    const surface2= theme.vars['--surface2'];
    const border  = theme.vars['--border'];
    const border2 = theme.vars['--border2'];
    const text    = theme.vars['--text'];
    const text2   = theme.vars['--text2'];
    const text3   = theme.vars['--text3'];
    const accent  = theme.vars['--accent'];
    const accent2 = theme.vars['--accent2'];
    const gold    = theme.vars['--gold'];
    const err     = theme.vars['--error'];
    const ok      = theme.vars['--success'];

    sheet.textContent = `
        .container          { background-color: ${bg}  !important; border-color: ${border2} !important; }
        .title-bar          { background: ${bg2} !important; border-bottom-color: ${border} !important; }
        .sidebar            { background-color: ${bg2} !important; border-right-color: ${border} !important; }
        .main-content       { background-color: ${bg}  !important; }
        .white-text         { color: ${text} !important; }
        .titleh3            { color: ${text} !important; }
        h3.white-text       { color: ${text} !important; }
        h4                  { color: ${gold} !important; }
        hr                  { border-color: ${border} !important; }
        button              { background-color: ${surface2} !important; color: ${text} !important; border-color: ${border2} !important; }
        button:hover        { background-color: ${surface} !important; filter: brightness(1.1); }
        input               { background-color: ${bg3} !important; border-color: ${border} !important; color: ${text} !important; }

        .tab-item           { color: ${text2} !important; }
        .tab-item:hover     { background: ${surface2} !important; color: ${text} !important; }
        .tab-item.active    { background: color-mix(in srgb, ${accent} 15%, transparent) !important;
                              border-color: color-mix(in srgb, ${accent} 35%, transparent) !important;
                              color: ${accent2} !important; }

        .integral-preview   { background: ${surface} !important; border-color: ${border2} !important; color: ${text} !important; }
        .integral-preview::after { background: linear-gradient(90deg, transparent, ${accent}, transparent) !important; }

        .mode-selector      { background: ${bg3} !important; border-color: ${border} !important; }
        .mode-selector button { background: transparent !important; color: ${text2} !important; border: none !important; }
        .mode-selector button.active { background: ${accent} !important; color: #fff !important; }

        .limits-panel       { background: ${bg3} !important; border-color: ${border} !important; }
        .limits-panel-title { color: ${accent2} !important; }
        .lim-label          { color: ${text2} !important; }
        .lim-input          { background: ${surface} !important; border-color: ${border} !important; color: ${text} !important; }
        .lim-input:focus    { border-color: ${accent} !important; }
        .limits-wrap        { }

        .input-full         { background: ${bg3} !important; border-color: ${border} !important; color: ${text} !important; }
        .input-full:focus   { border-color: ${accent} !important; }
        .var-input          { background: ${bg3} !important; border-color: ${border} !important; color: ${text} !important; }
        .var-label          { color: ${text2} !important; }

        .sec-label          { color: ${text3} !important; }
        .sym-scroll         { }
        .sym-chip           { background: ${surface} !important; border-color: ${border2} !important; color: ${text2} !important; }
        .sym-chip:hover     { background: color-mix(in srgb, ${accent} 15%, transparent) !important;
                              border-color: ${accent} !important; color: ${accent2} !important; }

        .resultado-box      { background: ${surface} !important; border-left-color: ${border2} !important; }
        .resultado-box.ok   { border-left-color: ${ok} !important; }
        .resultado-box.error{ border-left-color: ${err} !important; }
        #resultado_area     { color: ${text} !important; }
        #resultado_area.error-text { color: ${err} !important; }

        .hist-item          { color: ${text3} !important; }
        .hist-item:hover    { color: ${text2} !important; background: ${surface2} !important; }
        .ej-btn             { background: ${bg3} !important; border-color: ${border} !important; color: ${text3} !important; }
        .ej-btn:hover       { color: ${accent2} !important; border-color: ${accent} !important; }
        #btn-copy           { border-color: ${border} !important; color: ${text3} !important; }
        #btn-copy:hover     { color: ${text2} !important; border-color: ${border2} !important; }

        /* Teclado calculadora */
        .calc-key.num  { background: var(--kb-num-bg)  !important; color: var(--kb-num-text)  !important; border-color: var(--kb-num-bdr)  !important; }
        .calc-key.op   { background: var(--kb-op-bg)   !important; color: var(--kb-op-text)   !important; border-color: var(--kb-op-bdr)   !important; }
        .calc-key.fn   { background: var(--kb-fn-bg)   !important; color: var(--kb-fn-text)   !important; border-color: var(--kb-fn-bdr)   !important; }
        .calc-key.ac   { background: var(--kb-ac-bg)   !important; color: var(--kb-ac-text)   !important; border-color: var(--kb-ac-bg)    !important; }
        .calc-key.del  { background: var(--kb-del-bg)  !important; color: var(--kb-del-text)  !important; border-color: var(--kb-del-bg)   !important; }
        .calc-key.spec { background: var(--kb-spec-bg) !important; color: var(--kb-spec-text) !important; border-color: var(--kb-spec-bg)  !important; }
        .calc-key.igual{ background: linear-gradient(135deg, var(--kb-eq-from), var(--kb-eq-to)) !important;
                         box-shadow: 0 4px 16px color-mix(in srgb, var(--kb-eq-from) 45%, transparent) !important; }
        .kb-sep        { background: ${border} !important; }

        /* Panel de temas */
        .theme-panel        { background: ${bg2} !important; border-color: ${border} !important; }
        .theme-card         { background: ${surface} !important; border-color: ${border2} !important; }
        .theme-card:hover   { border-color: ${accent} !important; }
        .theme-card.active  { border-color: ${accent} !important; background: color-mix(in srgb, ${accent} 12%, ${surface}) !important; }
        .theme-card-label   { color: ${text2} !important; }

        /* input.css border effect — mantener pero adaptar colores */
        /*.border { box-shadow: -20px -8px 24px -4px color-mix(in srgb, ${accent} 40%, transparent),
                               20px -8px 24px -4px color-mix(in srgb, ${accent2} 40%, transparent),
                               20px  8px 24px -4px color-mix(in srgb, ${gold} 30%, transparent),
                              -20px  8px 24px -4px color-mix(in srgb, ${accent} 30%, transparent) !important; }*/
        .input  { background-color: ${bg3} !important; color: ${text} !important; }
    `;

    // Marcar tema activo en las cards
    document.querySelectorAll('.theme-card').forEach(c => {
        c.classList.toggle('active', c.dataset.theme === name);
    });

    // Persistir en localStorage
    localStorage.setItem('matheasy_theme', name);
}

// ─────────────────────────────────────────────────────────────
//  Construir el panel de temas en el sidebar
// ─────────────────────────────────────────────────────────────
function buildThemePanel() {
    const wrap = document.getElementById('theme-panel-wrap');
    if (!wrap) return;

    // Inyectar estilos del panel
    const style = document.createElement('style');
    style.textContent = `
        .theme-panel {
            margin-top: 4px;
            border-radius: 10px;
            border: 1px solid #333;
            overflow: hidden;
            max-height: 0;
            transition: max-height .35s ease, opacity .3s;
            opacity: 0;
        }
        .theme-panel.open {
            max-height: 400px;
            opacity: 1;
        }
        .theme-panel-inner {
            padding: 10px 8px;
            display: flex;
            flex-direction: column;
            gap: 6px;
        }
        .theme-card {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 8px 10px;
            border-radius: 8px;
            border: 1px solid #3d3d3d;
            cursor: pointer;
            transition: border-color .15s, background .15s;
        }
        .theme-card.active {
            border-color: #7f6ef5;
            background: rgba(127,110,245,.12);
        }
        .theme-preview {
            display: flex;
            gap: 3px;
            flex-shrink: 0;
        }
        .theme-dot {
            width: 10px; height: 10px;
            border-radius: 50%;
        }
        .theme-card-label {
            font-size: 12px;
            color: #aaa;
            font-weight: 500;
        }
        .theme-toggle-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            width: 100%;
            padding: 9px 12px;
            border: 1px solid transparent !important;
            border-radius: 8px !important;
            background: transparent !important;
            color: #aaa !important;
            font-size: 14px;
            cursor: pointer;
            transition: background .15s, color .15s;
            text-align: left;
            margin-bottom: 2px;
        }
        .theme-toggle-btn:hover { background: #2d2d2d !important; color: white !important; }
        .theme-arrow {
            margin-left: auto;
            font-size: 10px;
            transition: transform .25s;
        }
        .theme-arrow.open { transform: rotate(180deg); }
    `;
    document.head.appendChild(style);

    // Colores de preview para cada tema
    const previews = {
        dark:    ['#7f6ef5', '#252525', '#1e1e1e'],
        purple:  ['#b06ef5', '#1c1630', '#0f0b1e'],
        ocean:   ['#2e9cff', '#102040', '#0a1628'],
        forest:  ['#3ed870', '#142018', '#0c1a10'],
        sunset:  ['#ff7040', '#2a1810', '#1a0e0a'],
        light:   ['#6050e0', '#ffffff', '#f5f5f8'],
    };

    let html = '<div class="theme-panel-inner">';
    Object.entries(THEMES).forEach(([key, theme]) => {
        const dots = (previews[key] || ['#888','#444','#222'])
            .map(c => `<div class="theme-dot" style="background:${c}"></div>`)
            .join('');
        html += `
            <div class="theme-card ${key === getCurrentTheme() ? 'active' : ''}"
                 data-theme="${key}"
                 onclick="applyTheme('${key}')">
                <div class="theme-preview">${dots}</div>
                <span class="theme-card-label">${theme.emoji} ${theme.label}</span>
            </div>`;
    });
    html += '</div>';

    wrap.innerHTML = `
        <button class="theme-toggle-btn" onclick="toggleThemePanel(this)">
            <span style="font-size:15px">🎨</span>
            <span class="white-text">Tema</span>
            <span class="theme-arrow" id="theme-arrow">▼</span>
        </button>
        <div class="theme-panel" id="theme-panel">
            ${html}
        </div>`;
}

function toggleThemePanel(btn) {
    const panel = document.getElementById('theme-panel');
    const arrow = document.getElementById('theme-arrow');
    if (!panel) return;
    panel.classList.toggle('open');
    arrow.classList.toggle('open');
}

function getCurrentTheme() {
    return localStorage.getItem('matheasy_theme') || 'dark';
}

// ─────────────────────────────────────────────────────────────
//  Init: construir panel y cargar tema guardado
// ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    buildThemePanel();
    applyTheme(getCurrentTheme());
});