/*
 * Profile picture and cover images for social profiles (Facebook, X, YouTube, Pinterest, LinkedIn), in the
 * colours of the share cards, rendered with headless Chrome like og-images.js. Written to brand/ (not deployed).
 * Run: `node scripts/brand-images.js`. They carry no counts, so they do not go out of date.
 */
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const CONFIG = require('../site.config');

const OUT = path.join(__dirname, '..', 'brand');
const BROWSER = [
  process.env.CHROME_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  '/usr/bin/google-chrome', '/usr/bin/chromium', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean).find((p) => fs.existsSync(p));
if (!BROWSER) { console.error('No Chrome or Edge found. Set CHROME_PATH.'); process.exit(1); }

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const host = new URL(CONFIG.siteUrl).host;
const BG = 'radial-gradient(circle at 85% 15%,#1d5c47 0,#0c3a2d 55%,#082a20 100%)';
const CRESCENT = '<svg viewBox="0 0 32 32"><path d="M20 7a10 10 0 1 0 5 17A8 8 0 1 1 20 7z" fill="#d9ad5b"/></svg>';

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'brand-'));
function shoot(html, file, w, h) {
  const src = path.join(tmp, 'page.html');
  fs.writeFileSync(src, html);
  execFileSync(BROWSER, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
    `--window-size=${w},${h}`, `--screenshot=${file}`, 'file:///' + src.replace(/\\/g, '/')], { stdio: 'ignore', timeout: 60000 });
  if (!fs.existsSync(file)) throw new Error('Screenshot failed: ' + file);
}

// Square, full-bleed: platforms crop profile pictures to a circle.
function profile(size) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    html,body{margin:0;width:${size}px;height:${size}px;overflow:hidden}
    body{background:${BG};display:flex;align-items:center;justify-content:center}
    svg{width:${Math.round(size * 0.95)}px;height:${Math.round(size * 0.95)}px;flex:none;transform:translate(${-Math.round(size * 0.95 * 1.5 / 32)}px,${-Math.round(size * 0.95 / 32)}px)}
  </style></head><body>${CRESCENT}</body></html>`;
}

// Cover: everything inside a centred safe box (sw × sh), the rest is background the platforms may crop.
function cover(w, h, sw, sh, opts = {}) {
  const u = sh / 100; // type scales with the safe box height
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    html,body{margin:0;width:${w}px;height:${h}px;overflow:hidden}
    body{background:${BG};color:#f6f1e4;font-family:"Segoe UI",Arial,sans-serif;display:flex;align-items:center;justify-content:center}
    .safe{width:${sw}px;height:${sh}px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:${u * 4}px}
    .top{display:flex;align-items:center;gap:${u * 3}px}
    .top svg{width:${u * 20}px;height:${u * 20}px}
    .brand{font-size:${u * 17}px;font-weight:800;letter-spacing:-1px}
    .ar{font-family:"Segoe UI","Traditional Arabic",serif;color:#d9ad5b;font-size:${u * 13}px;margin-left:${u * 4}px}
    p{margin:0;font-size:${u * 8.5}px;color:#e3d7b8}
    .row{font-size:${u * 6.5}px;color:#cfe3da}
    .pill{border:${Math.max(2, u * 0.5)}px solid #d9ad5b;color:#d9ad5b;border-radius:999px;padding:${u * 1.2}px ${u * 4}px;font-weight:700;font-size:${u * 6.5}px}
  </style></head><body><div class="safe">
    <div class="top">${CRESCENT}<div><span class="brand">${esc(CONFIG.siteName)}</span><span class="ar" dir="rtl">${esc(CONFIG.siteNameAr)}</span></div></div>
    <p>Daily prayer times, Qibla and Hijri date for cities worldwide</p>
    ${opts.short ? '' : '<div class="row">Fajr · Dhuhr · Asr · Maghrib · Isha</div>'}
    <span class="pill">${esc(host)}</span>
  </div></body></html>`;
}

fs.mkdirSync(OUT, { recursive: true });
const jobs = [
  ['profile-1000.png', profile(1000), 1000, 1000],
  // Facebook page cover 1640×624; mobile shows only the middle, so the safe box is narrower.
  ['facebook-cover-1640x624.png', cover(1640, 624, 1200, 420), 1640, 624],
  // X header 1500×500; the profile picture covers the lower left corner.
  ['x-header-1500x500.png', cover(1500, 500, 1000, 330), 1500, 500],
  // YouTube banner 2560×1440; only the middle 1546×423 shows on every device.
  ['youtube-banner-2560x1440.png', cover(2560, 1440, 1546, 423), 2560, 1440],
  // Pinterest profile cover 16:9.
  ['pinterest-cover-1920x1080.png', cover(1920, 1080, 1500, 620), 1920, 1080],
  // LinkedIn company cover 1128×191.
  ['linkedin-cover-1128x191.png', cover(1128, 191, 900, 175, { short: true }), 1128, 191],
];
jobs.forEach(([name, html, w, h]) => shoot(html, path.join(OUT, name), w, h));
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`Wrote ${jobs.length} images to brand/ (${path.basename(BROWSER)}).`);
