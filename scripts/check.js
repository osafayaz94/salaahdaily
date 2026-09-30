/*
 * SEO and link audit for dist/. Run after the build: `npm run check`.
 * Fails (exit 1) on errors; prints warnings separately.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const CONFIG = require('../site.config');

const DIST = path.join(__dirname, '..', 'dist');
const SITE = CONFIG.siteUrl.replace(/\/+$/, '');
const errors = [];
const warnings = [];
// Windows can briefly refuse to open a file that was just written (antivirus scan): retry before failing.
function readFile(file, enc) {
  for (let i = 0; ; i++) {
    try { return fs.readFileSync(file, enc); } catch (e) {
      if (i >= 5 || e.code !== 'UNKNOWN') throw e;
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 200);
    }
  }
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    return d.isDirectory() ? walk(p) : [p];
  });
}
const files = walk(DIST);
const htmlFiles = files.filter((f) => f.endsWith('.html'));
const toUrlPath = (file) => {
  const rel = '/' + path.relative(DIST, file).split(path.sep).join('/');
  return rel.endsWith('/index.html') ? rel.slice(0, -'index.html'.length) : rel;
};
// Cached: most pages share the same assets and navigation links.
const existsCache = new Map();
const exists = (urlPath) => {
  const clean = urlPath.split('#')[0].split('?')[0];
  if (!existsCache.has(clean)) existsCache.set(clean, existsUncached(clean));
  return existsCache.get(clean);
};
const existsUncached = (clean) => {
  const p = path.join(DIST, decodeURIComponent(clean));
  return clean.endsWith('/') ? fs.existsSync(path.join(p, 'index.html')) : fs.existsSync(p);
};
const all = (re, s) => Array.from(s.matchAll(re));
// A copy that doesn't keep the whole page alive (V8 substrings point into their parent string).
const own = (s) => (s == null ? s : Buffer.from(s, 'utf8').toString('utf8'));
const attr = (tag, name) => { const m = tag.match(new RegExp(`\\s${name}="([^"]*)"`)); return m ? m[1] : null; };
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

// Each page is read once: checks that need the HTML run here, and only the facts later checks use are kept
// (holding 40,000 pages of HTML in memory runs out of heap).
const zlib = require('zlib');
const pages = {};
const sizes = [];
htmlFiles.forEach((file) => {
  const raw = readFile(file);
  // Transfer size once the server compresses it (gzip; Brotli is smaller still).
  sizes.push(zlib.gzipSync(raw).length);
  const html = raw.toString('utf8');
  const u = toUrlPath(file);
  const p = { u };
  if (/<h[1-6][^>]*>\s*<\/h[1-6]>/.test(html)) errors.push(`${u}: empty heading`);
  if (/\s(?:href|src)=""/.test(html)) errors.push(`${u}: empty href or src`);
  // JSON-LD must parse.
  all(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g, html).forEach((m) => {
    try { JSON.parse(m[1]); } catch (e) { errors.push(`${u}: invalid JSON-LD`); }
  });
  // Internal links and assets must exist.
  all(/\s(?:href|src)="(\/[^"]*)"/g, html).forEach((m) => {
    if (!exists(decode(m[1]))) errors.push(`${u}: broken link ${m[1]}`);
  });
  // Search engines drop the #fragment, so /near-me/#locate counts as a link to /near-me/.
  p.links = Array.from(new Set(all(/<a [^>]*href="(\/[^"#?]*)[^"]*"/g, html).map((m) => own(m[1]))));
  p.noindex = /<meta name="robots" content="noindex/.test(html);
  p.title = own((html.match(/<title>([^<]*)<\/title>/) || [])[1]);
  p.desc = own((html.match(/<meta name="description" content="([^"]*)">/) || [])[1]);
  p.canonical = own((html.match(/<link rel="canonical" href="([^"]*)">/) || [])[1]);
  p.lang = own((html.match(/<html lang="([^"]+)"/) || [])[1]);
  p.dir = own((html.match(/<html lang="[^"]+" dir="([^"]+)"/) || [])[1]);
  p.h1 = all(/<h1[\s>]/g, html).length;
  p.alts = all(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)">/g, html).map((m) => ({ tag: own(m[1]), href: own(m[2]) }));
  pages[u] = p;
});

const titles = {}, descs = {};
Object.values(pages).forEach((p) => {
  const where = p.u;
  if (!p.lang) errors.push(`${where}: missing <html lang>`);
  if (!p.dir) errors.push(`${where}: missing dir attribute`);
  if (p.h1 !== 1) errors.push(`${where}: has ${p.h1} <h1> elements`);
  if (!p.title) errors.push(`${where}: missing <title>`);
  if (!p.desc) errors.push(`${where}: missing meta description`);
  if (/[—–]/.test(p.title || '') || /[—–]/.test(p.desc || '')) warnings.push(`${where}: dash in title or description`);

  if (p.noindex) return;

  // Latin-script length guidance (non-Latin scripts are measured differently by Google).
  if (/^(en|id|ms|es|fr)/.test(p.lang)) {
    if (p.title.length > 65) warnings.push(`${where}: title ${p.title.length} chars`);
    if (decode(p.desc).length > 165) warnings.push(`${where}: description ${decode(p.desc).length} chars`);
  }
  (titles[p.title] = titles[p.title] || []).push(where);
  (descs[p.desc] = descs[p.desc] || []).push(where);

  if (p.canonical !== SITE + p.u) errors.push(`${where}: canonical ${p.canonical} does not match its own URL`);

  // hreflang: self-reference, x-default, targets exist and link back (reciprocity).
  const tags = p.alts.map((a) => a.tag);
  if (new Set(tags).size !== tags.length) errors.push(`${where}: duplicate hreflang values`);
  if (!p.alts.some((a) => a.href === SITE + p.u)) errors.push(`${where}: hreflang set does not include itself`);
  if (!tags.includes('x-default')) errors.push(`${where}: no x-default hreflang`);
  const self = p.alts.find((a) => a.href === SITE + p.u);
  if (self && self.tag !== p.lang) errors.push(`${where}: hreflang ${self.tag} differs from html lang ${p.lang}`);
  p.alts.forEach((a) => {
    const targetPath = a.href.slice(SITE.length);
    const target = pages[targetPath];
    if (!target) { errors.push(`${where}: hreflang target missing ${a.href}`); return; }
    if (target.noindex) errors.push(`${where}: hreflang points to noindex page ${a.href}`);
    if (!target.alts.some((b) => b.href === SITE + p.u)) errors.push(`${where}: ${a.href} does not link back`);
  });
});
Object.entries(titles).forEach(([t, list]) => { if (list.length > 1) errors.push(`Duplicate title "${t}" on ${list.join(', ')}`); });
Object.entries(descs).forEach(([d, list]) => { if (list.length > 1) errors.push(`Duplicate description on ${list.join(', ')}`); });

// Sitemap lists exactly the indexable pages.
// sitemap.xml may be a sitemap index pointing at one sitemap per language.
const rootMap = fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8');
let sitemap = rootMap;
if (/<sitemapindex/.test(rootMap)) {
  sitemap = all(/<loc>([^<]+)<\/loc>/g, rootMap).map((m) => {
    const rel = m[1].slice(SITE.length);
    if (!exists(rel)) { errors.push(`Sitemap index lists a missing file ${rel}`); return ''; }
    return fs.readFileSync(path.join(DIST, rel), 'utf8');
  }).join('\n');
}
const locs = new Set(all(/<loc>([^<]+)<\/loc>/g, sitemap).map((m) => m[1]));
const indexable = new Set(Object.values(pages).filter((p) => !p.noindex).map((p) => SITE + p.u));
indexable.forEach((u) => { if (!locs.has(u)) errors.push(`Sitemap is missing ${u}`); });
locs.forEach((u) => { if (!indexable.has(u)) errors.push(`Sitemap lists a non-page ${u}`); });
if (!/Sitemap: /.test(fs.readFileSync(path.join(DIST, 'robots.txt'), 'utf8'))) errors.push('robots.txt has no Sitemap line');

// Crawl like a search engine from the home page: every indexable page must be reachable (no orphans).
const depth = { '/': 0 };
const queue = ['/'];
while (queue.length) {
  const u = queue.shift();
  const page = pages[u];
  if (!page) continue;
  page.links.forEach((l) => {
    if (!(l in depth)) { depth[l] = depth[u] + 1; queue.push(l); }
  });
}
const orphans = Object.values(pages).filter((p) => !p.noindex && !(p.u in depth)).map((p) => p.u);
orphans.forEach((u) => errors.push(`Orphan page (no internal links reach it): ${u}`));
const maxDepth = Math.max(...Object.values(pages).filter((p) => !p.noindex && p.u in depth).map((p) => depth[p.u]));
if (maxDepth > 3) warnings.push(`Deepest page is ${maxDepth} clicks from the home page`);

const avgKb = (sizes.reduce((a, b) => a + b, 0) / sizes.length / 1024).toFixed(1);
const maxKb = (Math.max(...sizes) / 1024).toFixed(1);

console.log(`Checked ${htmlFiles.length} HTML pages, ${locs.size} sitemap URLs.`);
console.log(`Every indexable page is reachable from / in at most ${maxDepth} clicks. Compressed HTML: ${avgKb} KB average, ${maxKb} KB largest.`);
if (warnings.length) console.log(`\n${warnings.length} warning(s):\n  ` + warnings.slice(0, 40).join('\n  '));
if (errors.length) {
  console.error(`\n${errors.length} error(s):\n  ` + errors.slice(0, 60).join('\n  '));
  process.exit(1);
}
console.log('No errors.');
