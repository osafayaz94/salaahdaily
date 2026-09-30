/*
 * Share cards and logo, rendered with headless Chrome (or Edge) already on this machine:
 *   src/og/home.jpg, src/og/<country>.jpg  1200×630, used as og:image
 *   src/logo.png                           512×512, Organization logo and apple-touch-icon
 * Run after adding countries or changing the brand: `npm run og`. The build copies them into dist/.
 * The cards carry no prayer times: WhatsApp and Facebook cache a preview for weeks, so a time
 * printed on it would soon be wrong.
 */
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const CONFIG = require('../site.config');
const RAW = require('../src/data').concat(require('../src/data-mea')).concat(require('../src/data-europe')).concat(require('../src/data-asia'));
const TOWNS = require('../src/towns');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'src', 'og');
const BROWSERS = [
  process.env.CHROME_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  '/usr/bin/google-chrome', '/usr/bin/chromium', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean);
const BROWSER = BROWSERS.find((p) => fs.existsSync(p));
if (!BROWSER) { console.error('No Chrome or Edge found. Set CHROME_PATH.'); process.exit(1); }

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const MOON = '<svg viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#0c3a2d"/><path d="M20 7a10 10 0 1 0 5 17A8 8 0 1 1 20 7z" fill="#d9ad5b"/></svg>';
const host = new URL(CONFIG.siteUrl).host;

// City counts include the extra towns merged in by build.js.
const counts = {};
RAW.forEach((c) => {
  counts[c.slug] = c.regions.reduce((n, r) => n + r.cities.length, 0) +
    (TOWNS[c.slug] || []).reduce((n, r) => n + r.cities.length, 0);
});
const totalCities = Object.values(counts).reduce((a, b) => a + b, 0);

function card(title, line) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    html,body{margin:0;width:1200px;height:630px;overflow:hidden}
    body{background:radial-gradient(circle at 85% 15%,#1d5c47 0,#0c3a2d 55%,#082a20 100%);color:#f6f1e4;
      font-family:"Segoe UI",Arial,sans-serif;display:flex;flex-direction:column;justify-content:space-between;padding:64px 72px;box-sizing:border-box}
    .top{display:flex;align-items:center;gap:22px}
    .top svg{width:84px;height:84px}
    .brand{font-size:50px;font-weight:800;letter-spacing:-1px}
    .ar{font-family:"Segoe UI","Traditional Arabic",serif;color:#d9ad5b;font-size:40px;margin-left:22px}
    h1{font-size:${title.length > 22 ? 64 : 84}px;line-height:1.05;margin:0 0 18px;font-weight:800;letter-spacing:-1.5px}
    p{font-size:34px;margin:0;color:#e3d7b8}
    .foot{display:flex;justify-content:space-between;align-items:center;font-size:28px;color:#cfe3da}
    .pill{border:2px solid #d9ad5b;color:#d9ad5b;border-radius:999px;padding:8px 22px;font-weight:700}
  </style></head><body>
    <div class="top">${MOON}<div><span class="brand">${esc(CONFIG.siteName)}</span><span class="ar" dir="rtl">${esc(CONFIG.siteNameAr)}</span></div></div>
    <div><h1>${esc(title)}</h1><p>${esc(line)}</p></div>
    <div class="foot"><span>Fajr · Dhuhr · Asr · Maghrib · Isha</span><span class="pill">${esc(host)}</span></div>
  </body></html>`;
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'og-'));
function shoot(html, file, w, h) {
  const src = path.join(tmp, 'card.html');
  fs.writeFileSync(src, html);
  execFileSync(BROWSER, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', '--default-background-color=00000000',
    `--window-size=${w},${h}`, `--screenshot=${file}`, 'file:///' + src.replace(/\\/g, '/')], { stdio: 'ignore' });
  if (!fs.existsSync(file)) throw new Error('Screenshot failed: ' + file);
}

fs.mkdirSync(OUT, { recursive: true });
shoot(card('Prayer Times Today', `${totalCities} cities in ${RAW.length} countries · 15 languages`), path.join(OUT, 'home.jpg'), 1200, 630);
RAW.forEach((c) => {
  shoot(card(`${c.name.en} Prayer Times`, `Today's Fajr to Isha for ${counts[c.slug]} cities · Qibla · Hijri date`), path.join(OUT, `${c.slug}.jpg`), 1200, 630);
});
shoot(`<!doctype html><html><head><style>html,body{margin:0;width:512px;height:512px;overflow:hidden}svg{width:512px;height:512px;display:block}</style></head><body>${MOON}</body></html>`,
  path.join(ROOT, 'src', 'logo.png'), 512, 512);
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`Wrote ${RAW.length + 1} share cards to src/og/ and src/logo.png (${path.basename(BROWSER)}).`);
