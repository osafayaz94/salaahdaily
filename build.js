/*
 * Static site generator. Run `node build.js` (or `npm run build`); output goes to dist/.
 *
 * Every page exists in every site language. English has no prefix and is the x-default:
 *   /                     home (continents, country cards)      /ur/                  Urdu home
 *   /pakistan/            country (today's times, every city)    /ur/pakistan/
 *   /pakistan/lahore/     city                                   /ur/pakistan/lahore/
 *   /near-me/             geolocation page                       /ur/near-me/
 *   /about/               how the times are calculated           /ur/about/
 *
 * Every page is fully rendered HTML with today's times, so search and answer engines index real
 * content. Rebuild daily so that content stays current; visitors always get live times because the
 * browser recalculates on load.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const CONFIG = require('./site.config');
const Core = require('./src/core');
const { LANGS, STRINGS, EN_VARIANTS, COUNTRY_FAQ } = require('./src/i18n');
const RAW = require('./src/data').concat(require('./src/data-mea')).concat(require('./src/data-europe')).concat(require('./src/data-asia'));
const NAMES = require('./src/names');
const { GUIDES, WIKI } = require('./src/guides');
const GUIDE_PRAYERS = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha', 'jumuah'];

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');
const SITE = CONFIG.siteUrl.replace(/\/+$/, '');
const BRAND = CONFIG.siteName;                         // SalaahDaily (ends every title)
const BRAND_AR = CONFIG.siteNameAr;                    // أوقات الصلاة (Arabic tagline)
const BRAND_FULL = `${BRAND} · ${BRAND_AR}`;           // SalaahDaily · أوقات الصلاة
// Other names the same site has used or is searched by; schema lists them so engines join them to one entity.
const BRAND_ALT = [BRAND_AR, 'Awqat as-Salah', 'Salaah Daily'];
const LATIN = new Set(['en', 'id', 'ms', 'es', 'fr', 'tr', 'ha']);
const NOW = new Date();
const TODAY_ISO = NOW.toISOString().slice(0, 10);
const esc = Core.esc;
const tpl = Core.tpl;
const problems = [];
const CONTINENTS = ['asia', 'middleEast', 'africa', 'europe', 'northAmerica', 'oceania'];
const SECT_KEYS = Core.SECTS;

// Letters that have no accent to strip (ł, đ, ø...) are spelled out, so Łódź becomes "lodz", not "odz".
const PLAIN = { ł: 'l', đ: 'd', ø: 'o', æ: 'ae', ß: 'ss', ı: 'i', þ: 'th', ð: 'd', œ: 'oe' };
function slugify(s) {
  return s.toLowerCase().replace(/['’]/g, '').replace(/[łđøæßıþðœ]/g, (c) => PLAIN[c]).normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
// Search text ignores case and accents, so "merida" finds "Mérida" (non-Latin scripts are unaffected).
function searchText(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
function shortHash(content) { return crypto.createHash('sha256').update(content).digest('hex').slice(0, 10); }
function jsonForHtml(value) { return JSON.stringify(value).replace(/</g, '\\u003c'); }

/* ---------- Names ---------- */
// Inline names in data.js win; then src/names.js; then the fallbacks in nameIn().
function placeNames(en, inline) {
  const out = { en };
  const row = NAMES.places[en];
  if (row) NAMES.PLACE_LANGS.forEach((l, i) => { if (row[i]) out[l] = row[i]; });
  Object.assign(out, NAMES.latin[en] || {}, inline || {});
  // Arabic: a checked spelling where one exists, otherwise the Persian name in Arabic letters.
  if (!out.ar) out.ar = NAMES.arabic[en] || (out.fa ? NAMES.toArabic(out.fa) : undefined);
  if (!out.ar) delete out.ar;
  return out;
}
const FALLBACK = { prs: ['fa'], fa: ['prs'], ps: ['prs', 'fa'] };
// Latin-script languages fall back to the country's own Latin-script name (Ciudad de México on a
// French page, Jawa Barat on a Spanish page) and then to English. Dhivehi falls back to English.
function nameIn(names, lang, country) {
  if (names[lang]) return names[lang];
  const chain = FALLBACK[lang] || [];
  for (let i = 0; i < chain.length; i++) if (names[chain[i]]) return names[chain[i]];
  if (LATIN.has(lang) && country) {
    const local = country.langs.find((l) => l !== 'en' && LATIN.has(l) && names[l]);
    if (local) return names[local];
  }
  return names.en;
}

/* ---------- Data ---------- */
// Merge src/towns.js: towns join an existing region with the same English name, or form a new one.
const TOWNS = require('./src/towns');
Object.keys(TOWNS).forEach((slug) => {
  const country = RAW.find((c) => c.slug === slug);
  if (!country) { problems.push(`towns.js: unknown country ${slug}`); return; }
  TOWNS[slug].forEach((r) => {
    const existing = country.regions.find((x) => x.name.en === r.name.en);
    if (existing) existing.cities.push(...r.cities);
    else country.regions.push(r);
  });
});

const COUNTRIES = RAW.map((raw) => {
  const c = Object.assign({}, raw, { regions: [], cities: [] });
  c.name = Object.assign({}, NAMES.countries[raw.name.en] || {}, raw.name);
  raw.regions.forEach((r) => {
    // A region can override the country's method and default school (e.g. Dagestan in Russia).
    const region = { names: placeNames(r.name.en, r.name), cities: [], method: r.method || raw.method, defaultSect: r.defaultSect || raw.defaultSect };
    r.cities.forEach((row) => {
      const city = {
        names: placeNames(row[0], row[3]),
        slug: slugify(row[0]), lat: row[1], lng: row[2], tz: row[4] || raw.tz, country: c, region,
        method: region.method, defaultSect: region.defaultSect,
      };
      region.cities.push(city);
      c.cities.push(city);
    });
    c.regions.push(region);
  });
  return c;
});
const ALL_CITIES = COUNTRIES.flatMap((c) => c.cities);
const ALL_LANGS = Object.keys(LANGS);

// Catch data mistakes before anything is written.
const countrySlugs = new Set();
COUNTRIES.forEach((c) => {
  if (countrySlugs.has(c.slug)) problems.push(`duplicate country slug ${c.slug}`);
  countrySlugs.add(c.slug);
  if (!CONTINENTS.includes(c.continent)) problems.push(`${c.slug}: bad continent`);
  if (!SECT_KEYS.includes(c.defaultSect)) problems.push(`${c.slug}: bad defaultSect`);
  c.regions.forEach((r) => {
    if (!SECT_KEYS.includes(r.defaultSect)) problems.push(`${c.slug}: bad defaultSect in ${r.names.en}`);
    if (!Core.METHOD_EN[r.method]) problems.push(`${c.slug}: unknown method ${r.method} in ${r.names.en}`);
  });
  ALL_LANGS.forEach((l) => { if (!c.name[l] && l !== 'en') problems.push(`${c.slug}: missing ${l} country name`); });
  const slugs = new Set();
  c.cities.forEach((ci) => {
    if (slugs.has(ci.slug)) problems.push(`${c.slug}: duplicate city slug "${ci.slug}"`);
    slugs.add(ci.slug);
    try { new Intl.DateTimeFormat('en', { timeZone: ci.tz }); } catch (e) { problems.push(`${ci.names.en}: bad time zone ${ci.tz}`); }
    if (Math.abs(ci.lat) > 90 || Math.abs(ci.lng) > 180) problems.push(`${ci.names.en}: bad coordinates`);
  });
  // Every place needs a real name in Urdu, Hindi, Bengali and Persian, and in the country's own languages.
  const required = Array.from(new Set(NAMES.PLACE_LANGS.concat(c.langs.filter((l) => !LATIN.has(l)))));
  c.regions.forEach((r) => {
    required.forEach((l) => { if (nameIn(r.names, l, c) === r.names.en && !LATIN.has(l)) problems.push(`${c.slug}: missing ${l} name for region ${r.names.en}`); });
    r.cities.forEach((ci) => {
      required.forEach((l) => { if (nameIn(ci.names, l, c) === ci.names.en && !LATIN.has(l)) problems.push(`${c.slug}: missing ${l} name for city ${ci.names.en}`); });
    });
  });
});
ALL_LANGS.forEach((lang) => {
  const missing = Object.keys(STRINGS.en).filter((k) => !(k in STRINGS[lang]));
  if (missing.length) problems.push(`${lang}: missing strings ${missing.join(', ')}`);
});

ALL_LANGS.forEach((lang) => {
  const g = GUIDES[lang];
  if (!g) { problems.push(`${lang}: no guides.js block`); return; }
  const missing = Object.keys(GUIDES.en).filter((k) => !(k in g))
    .concat(GUIDE_PRAYERS.filter((k) => !(g.P[k] && g.P[k].length === 4 && g.P[k].every(Boolean))).map((k) => `P.${k}`))
    .concat(Object.keys(GUIDES.en.ev).filter((k) => !g.ev[k]).map((k) => `ev.${k}`));
  if (missing.length) problems.push(`${lang}: missing guide strings ${missing.join(', ')}`);
});

/* ---------- URLs and hreflang ---------- */
const pre = (lang) => (lang === 'en' ? '/' : `/${lang}/`);
const url = {
  home: (lang) => pre(lang),
  country: (lang, c) => `${pre(lang)}${c.slug}/`,
  city: (lang, ci) => `${pre(lang)}${ci.country.slug}/${ci.slug}/`,
  near: (lang) => `${pre(lang)}near-me/`,
  about: (lang) => `${pre(lang)}about/`,
  prayers: (lang) => `${pre(lang)}prayers/`,
  prayer: (lang, key) => `${pre(lang)}prayers/${key}/`,
  hijri: (lang) => `${pre(lang)}hijri-calendar/`,
  ramadan: (lang, ci) => `${pre(lang)}${ci.country.slug}/${ci.slug}/ramadan/`,
  methods: (lang) => `${pre(lang)}methods/`,
  method: (lang, key) => `${pre(lang)}methods/${Core.METHOD_SLUG[key]}/`,
  qibla: (lang) => `${pre(lang)}qibla/`,
  widget: (lang) => `${pre(lang)}mosque-widget/`,
  embed: (lang) => `${pre(lang)}embed/`,
};
const abs = (u) => SITE + u;
// A country's own languages get a region tag (ur-PK, es-MX); others the plain language. Dari is always fa-AF.
function langTag(lang, country) {
  if (lang === 'en') return 'en';
  if (lang === 'prs') return 'fa-AF';
  return country && country.langs.includes(lang) ? `${lang}-${country.cc}` : lang;
}
function ogLocale(tag, lang) { return tag.includes('-') ? tag.replace('-', '_') : LANGS[lang].og; }
const cluster = (fn, country) => ALL_LANGS.map((l) => ({ lang: l, tag: langTag(l, country), href: fn(l) }));

/* ---------- Assets ---------- */
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
// Safe, dependency-free minifiers for our own code (no comment markers inside strings in these files).
function minifyCss(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ')
    .replace(/\s*([{};,>])\s*/g, '$1').replace(/;}/g, '}').trim();
}
function minifyJs(js) {
  return js.replace(/\/\*[\s\S]*?\*\//g, '').split('\n')
    .map((line) => line.trim()).filter((line) => line && !line.startsWith('//')).join('\n');
}
// The CSS is inlined in every page: no render-blocking stylesheet request.
const CSS = minifyCss(read('src/style.css'));
const JS = [read('src/vendor/adhan.umd.min.js'), minifyJs(read('src/core.js')), minifyJs(read('src/client.js'))].join('\n;\n');
// Pages that never calculate times (home, about, 404) skip the adhan library.
const JS_LITE = [minifyJs(read('src/core.js')), minifyJs(read('src/client.js'))].join('\n;\n');
const CITIES_JSON = JSON.stringify({
  countries: Object.fromEntries(COUNTRIES.map((c) => [c.slug, {
    tz: c.tz, method: c.method, jafariMethod: c.jafariMethod, defaultSect: c.defaultSect, extraCalendar: c.extraCalendar,
  }])),
  // 5th value only when the city's time zone differs from its country's.
  // 6th value only when the city's method or default school differs from its country's: [method, sect].
  cities: ALL_CITIES.map((ci) => {
    const row = [ci.country.slug, ci.slug, ci.lat, ci.lng];
    const own = ci.method !== ci.country.method || ci.defaultSect !== ci.defaultSect;
    if (ci.tz !== ci.country.tz || own) row.push(ci.tz === ci.country.tz ? 0 : ci.tz);
    if (own) row.push([ci.method, ci.defaultSect]);
    return row;
  }),
});
// Home-page search index per language, loaded only when someone starts typing.
const SEARCH = {};
ALL_LANGS.forEach((lang) => {
  const json = JSON.stringify(ALL_CITIES.map((ci) => {
    const local = nameIn(ci.names, lang, ci.country);
    const text = searchText(Array.from(new Set(Object.values(ci.names).concat([local]))).join(' '));
    return [local, nameIn(ci.country.name, lang), url.city(lang, ci), text];
  }));
  SEARCH[lang] = { json, path: `/assets/search-${lang}.${shortHash(json)}.json` };
});
const ASSET = {
  js: `/assets/app.${shortHash(JS)}.js`,
  jsLite: `/assets/lite.${shortHash(JS_LITE)}.js`,
  cities: `/assets/cities.${shortHash(CITIES_JSON)}.json`,
};
const HAYYA_AR = 'حَيَّ عَلَى الصَّلَاةِ، حَيَّ عَلَى الْفَلَاحِ';
const AMIRI_TEXT = Array.from(new Set(Array.from(Core.BISMILLAH + Object.values(Core.ARABIC).join('') + BRAND_AR + HAYYA_AR))).join('');

/* ---------- Shared pieces ---------- */
const ICON = {
  brand: '<svg viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="8" class="brand-bg"/><path d="M20 7a10 10 0 1 0 5 17A8 8 0 1 1 20 7z" class="brand-moon"/></svg>',
  locate: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/><circle cx="12" cy="12" r="7"/></svg>',
  globe: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z"/></svg>',
  settings: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/></svg>',
  search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
};

function ctxFor(lang, sect) {
  const L = LANGS[lang];
  return { lang, L, t: STRINGS[lang], g: GUIDES[lang], sect, method: 'auto', hour12: L.hour12, hijriAdj: 0 };
}
function locOf(ci, lang) {
  const c = ci.country;
  return { name: nameIn(ci.names, lang, c), lat: ci.lat, lng: ci.lng, tz: ci.tz, method: ci.method, jafariMethod: c.jafariMethod, extraCalendar: c.extraCalendar };
}
// Only the strings the browser script renders; titles, descriptions and static copy stay out of the page data.
const CLIENT_KEYS = ['sects', 'prayers', 'sectLabel', 'nextIn', 'tomorrow', 'localTime', 'next', 'now', 'methodLine',
  'asrTwice', 'asrOnce', 'sameTimes', 'maghribAngle', 'changeMethod', 'summary', 'monthTitle', 'range', 'colDate', 'colHijri',
  'qibla', 'qiblaFrom', 'kaaba', 'hijriMonths', 'hijriEra', 'openLast', 'noGeo', 'geoBlocked', 'locating', 'yourLocation',
  'methods', 'months', 'weekdays', 'solarMonths', 'solarEra', 'mapsHl', 'mosquesNearYou', 'mosquesLede', 'openInMaps',
  'nafl', 'naflH2', 'laylH2', 'naflNote', 'laylNote', 'yourArea', 'noMatch',
  'faqH2', 'qTimes', 'aTimes', 'qFajr', 'aFajr', 'qMaghrib', 'aMaghrib', 'qNafl', 'aNafl', 'qLayl', 'aLayl', 'qQibla', 'aQibla', 'qMethod', 'aMethod'];
function clientStrings(lang) {
  const out = {};
  CLIENT_KEYS.forEach((k) => { if (k in STRINGS[lang]) out[k] = STRINGS[lang][k]; });
  return out;
}
function clientData(lang, extra) {
  const L = LANGS[lang];
  return Object.assign({
    lang,
    L: {
      locale: L.locale, timeLocale: L.timeLocale, hour12: L.hour12, force24: !!L.force24, arabicScript: !!L.arabicScript,
      digits: L.digits || null, decimal: L.decimal || null, dir: L.dir, am: L.am || null, pm: L.pm || null,
    },
    t: clientStrings(lang),
    g: ['jH2', 'jNote', 'qJ', 'aJ', 'todayIn', 'fridayIn', 'seeCity', 'hToday', 'ramLede', 'colDay', 'colSehri', 'colIftar'].reduce((o, k) => { o[k] = GUIDES[lang][k]; return o; }, {}),
    nearUrl: url.near(lang),
    prefix: pre(lang),
  }, extra);
}
function listJoin(lang, items) {
  const locale = LANGS[lang].locale;
  if (!locale || items.length < 2) return items.join(LANGS[lang].dir === 'rtl' ? '، ' : ', ');
  return new Intl.ListFormat(locale, { style: 'long', type: 'conjunction' }).format(items);
}

// Fonts load without blocking the first paint: text shows in a system font, then swaps in.
// FONT_ONLOAD is the site's only inline script; the Content-Security-Policy allows it by hash.
const FONT_ONLOAD = "this.media='all'";
function fontLinks(lang) {
  const fams = ['Manrope:wght@400;600;700;800'];
  if (LANGS[lang].gfont) fams.push(LANGS[lang].gfont);
  const sheets = [
    `https://fonts.googleapis.com/css2?${fams.map((f) => `family=${f}`).join('&amp;')}&amp;display=swap`,
    `https://fonts.googleapis.com/css2?family=Amiri&amp;display=swap&amp;text=${encodeURIComponent(AMIRI_TEXT)}`,
  ];
  return '<link rel="preconnect" href="https://fonts.googleapis.com">' +
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
    sheets.map((h) => `<link rel="stylesheet" href="${h}" media="print" onload="${FONT_ONLOAD}">`).join('') +
    `<noscript>${sheets.map((h) => `<link rel="stylesheet" href="${h}">`).join('')}</noscript>`;
}

function settingsDialog(lang) {
  const t = STRINGS[lang], L = LANGS[lang], c = ctxFor(lang, 'hanafi');
  const methodOptions = Core.SELECTABLE.map((k) => `<option value="${k}">${esc(Core.methodLabel(k, c))}</option>`).join('');
  return `<dialog id="settingsDialog" class="settings" aria-labelledby="settingsTitle"><form method="dialog" id="settingsForm">` +
    `<div class="settings-head"><h2 id="settingsTitle">${esc(t.settingsTitle)}</h2><button value="close" class="icon-btn" aria-label="${esc(t.close)}">✕</button></div>` +
    `<label class="field"><span>${esc(t.methodLabel)}</span><select name="method" id="setMethod"><option value="auto">${esc(t.methodAuto)}</option>${methodOptions}</select><small>${esc(t.methodHelp)}</small></label>` +
    (L.force24 ? '' : `<label class="field"><span>${esc(t.timeFormat)}</span><select name="hour12" id="setHour12"><option value="true">${esc(t.h12)}</option><option value="false">${esc(t.h24)}</option></select></label>`) +
    `<label class="field"><span>${esc(t.hijriAdj)}</span><select name="hijriAdj" id="setHijri">` +
    ['-2', '-1', '0', '1', '2'].map((v) => `<option value="${v}">${esc(t.adj[v])}</option>`).join('') +
    `</select><small>${esc(t.hijriHelp)}</small></label>` +
    `<div class="settings-actions"><button type="button" class="btn-link" id="resetSettings">${esc(t.reset)}</button><button value="close" class="btn-primary">${esc(t.done)}</button></div>` +
    '</form></dialog>';
}

function langMenu(lang, alternates) {
  if (!alternates || alternates.length < 2) return '';
  const t = STRINGS[lang], L = LANGS[lang];
  return `<details class="lang-menu"><summary class="btn-ghost" aria-label="${esc(t.language)}: ${esc(L.name)}">${ICON.globe}<span class="hide-sm">${esc(L.name)}</span></summary><ul>` +
    alternates.map((a) => `<li><a href="${a.href}" hreflang="${a.tag}" lang="${a.tag}" dir="${LANGS[a.lang].dir}"${a.lang === lang ? ' aria-current="true"' : ''}>${esc(LANGS[a.lang].name)}</a></li>`).join('') +
    '</ul></details>';
}

function footer(lang) {
  const t = STRINGS[lang];
  const countries = COUNTRIES.map((c) => `<li><a href="${url.country(lang, c)}">${esc(nameIn(c.name, lang))}</a></li>`).join('');
  const langs = ALL_LANGS.map((l) => `<li><a href="${pre(l)}" hreflang="${langTag(l)}" lang="${langTag(l)}">${esc(LANGS[l].name)}</a></li>`).join('');
  return '<footer class="site-footer"><div class="wrap">' +
    '<div class="footer-nav">' +
      `<nav aria-labelledby="fnCountries"><h2 id="fnCountries">${esc(t.countriesNav)}</h2><ul>${countries}</ul></nav>` +
      `<nav aria-labelledby="fnLangs"><h2 id="fnLangs">${esc(t.languagesNav)}</h2><ul>${langs}</ul></nav>` +
      `<nav aria-labelledby="fnLearn"><h2 id="fnLearn">${esc(GUIDES[lang].learnNav)}</h2><ul>` +
        `<li><a href="${url.prayers(lang)}">${esc(GUIDES[lang].prayersNav)}</a></li>` +
        GUIDE_PRAYERS.map((k) => `<li><a href="${url.prayer(lang, k)}">${esc(t.prayers[k])}</a></li>`).join('') +
        `<li><a href="${url.hijri(lang)}">${esc(GUIDES[lang].hijriNav)}</a></li>` +
        `<li><a href="${url.qibla(lang)}">${esc(GUIDES[lang].qbNav)}</a></li>` +
        `<li><a href="${url.methods(lang)}">${esc(GUIDES[lang].mNav)}</a></li>` +
        `<li><a href="${url.widget(lang)}">${esc(GUIDES[lang].wNav)}</a></li>` +
        `<li><a href="${url.about(lang)}">${esc(t.aboutLink)}</a></li></ul></nav>` +
    '</div>' +
    suggestForm(lang) +
    `<p>${esc(t.footer1)} <a href="${url.about(lang)}">${esc(t.aboutLink)}</a></p><p>${esc(t.footer2)}</p>` +
    `<p class="muted">© ${NOW.getUTCFullYear()} ${esc(BRAND)} · <span lang="ar" dir="rtl">${esc(BRAND_AR)}</span></p>` +
    '</div></footer>';
}

// Suggestion form: posts to Web3Forms, which emails the site owner (their address never appears here).
// botcheck is a honeypot that people never see; bots that fill it are dropped.
function suggestForm(lang) {
  if (!CONFIG.web3formsKey) return '';
  const g = GUIDES[lang];
  return `<form class="suggest" data-suggest action="https://api.web3forms.com/submit" method="post" aria-labelledby="sgH">` +
    `<h2 id="sgH">${esc(g.sgH)}</h2>` +
    `<input type="hidden" name="access_key" value="${esc(CONFIG.web3formsKey)}">` +
    `<input type="hidden" name="subject" value="SalaahDaily suggestion (${lang})">` +
    `<input type="hidden" name="from_name" value="SalaahDaily">` +
    `<input type="checkbox" name="botcheck" class="sr-only" tabindex="-1" autocomplete="off" aria-hidden="true">` +
    `<label for="sgMsg">${esc(g.sgLabel)}</label><textarea id="sgMsg" name="message" rows="3" maxlength="2000" required></textarea>` +
    `<label for="sgMail">${esc(g.sgEmail)}</label><input id="sgMail" name="email" type="email" maxlength="120" autocomplete="email">` +
    `<button type="submit" class="btn-primary">${esc(g.sgSend)}</button><p class="sg-status" role="status" data-ok="${esc(g.sgThanks)}" data-err="${esc(g.sgError)}"></p></form>`;
}

function breadcrumbs(items) {
  return '<nav class="crumbs" aria-label="Breadcrumb"><ol>' + items.map((it, i) => {
    const last = i === items.length - 1;
    if (last) return `<li><span aria-current="page">${esc(it.name)}</span></li>`;
    return it.href ? `<li><a href="${it.href}">${esc(it.name)}</a></li>` : `<li><span>${esc(it.name)}</span></li>`;
  }).join('') + '</ol></nav>';
}
function breadcrumbLd(items) {
  const linked = items.filter((it) => it.href);
  return {
    '@type': 'BreadcrumbList',
    itemListElement: linked.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.href) })),
  };
}
// sameAs and contactPoint are left out until the site has real social profiles and a public address.
const ORG = {
  '@type': 'Organization', '@id': `${SITE}/#org`, name: BRAND, alternateName: BRAND_ALT, url: `${SITE}/`,
  logo: { '@type': 'ImageObject', url: `${SITE}/logo.png`, width: 512, height: 512 },
  image: `${SITE}/og/home.jpg`, foundingDate: '2026-09-28',
};
const WEBSITE = (lang) => ({ '@type': 'WebSite', '@id': `${SITE}/#website`, name: BRAND, alternateName: BRAND_ALT, url: `${SITE}/`, publisher: { '@id': `${SITE}/#org` }, inLanguage: ALL_LANGS.map((l) => langTag(l)) });

function monthCard(lang, month) {
  const t = STRINGS[lang];
  return '<section class="card month-card" aria-labelledby="monthTitle"><div class="month-head">' +
    `<div><h2 id="monthTitle">${esc(month.title)}</h2><p class="muted" id="monthSub">${esc(month.sub)}</p></div>` +
    '<div class="month-nav">' +
      `<button type="button" class="icon-btn" id="prevMonth" aria-label="${esc(t.prevMonth)}"><span class="flip" aria-hidden="true">‹</span></button>` +
      `<button type="button" class="btn-small" id="thisMonth">${esc(t.todayBtn)}</button>` +
      `<button type="button" class="icon-btn" id="nextMonth" aria-label="${esc(t.nextMonth)}"><span class="flip" aria-hidden="true">›</span></button>` +
      `<button type="button" class="btn-small" id="printBtn">${esc(t.print)}</button>` +
    '</div></div>' +
    `<div class="table-scroll"><table class="month-table" id="monthTable">${month.table}</table></div></section>`;
}

// h1 is plain text, or { html } for markup that is already escaped (the home page call to prayer).
function hero(lang, ctx, h1, searchPlaceholder, count) {
  const t = STRINGS[lang];
  return '<section class="home-hero pattern">' +
    `<p class="eyebrow" lang="ar" dir="rtl">${Core.BISMILLAH}</p>` +
    `<h1>${typeof h1 === 'string' ? esc(h1) : h1.html}</h1>` +
    (count ? `<p class="hero-count">${esc(count)}</p>` : '') +
    `<p class="lede">${esc(t.lede)}</p>` +
    Core.sectPicker(ctx) +
    '<div class="home-actions">' +
      `<div class="search">${ICON.search}<input id="citySearch" type="search" placeholder="${esc(searchPlaceholder)}" autocomplete="off" aria-label="${esc(t.searchLabel)}" aria-controls="searchResults"><ul id="searchResults" class="search-results" hidden></ul></div>` +
      `<a class="btn-gold" href="${url.near(lang)}#locate">${ICON.locate}${esc(t.showMyLocation)}</a>` +
    '</div>' +
    '<p id="lastSlot"></p>' +
  '</section>';
}

/* ---------- Titles and descriptions that fit search results ---------- */
const TITLE_MAX = 60, DESC_MAX = 160;
const reEsc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// City names used by more than one city in a language (London, Hyderabad) must keep their country.
const nameCount = {};
ALL_LANGS.forEach((lang) => {
  nameCount[lang] = {};
  ALL_CITIES.forEach((ci) => { const n = nameIn(ci.names, lang, ci.country); nameCount[lang][n] = (nameCount[lang][n] || 0) + 1; });
});
// Longest version that fits. The brand stays as long as possible: full, then (when the city name is
// unique) without the country, then without " | Brand", then without both.
function fitTitle(full, lang, countryName, cityName) {
  const dropBrand = (s) => s.replace(new RegExp(`\\s*\\|\\s*${reEsc(BRAND)}$`), '');
  const dropCountry = (s) => s.replace(new RegExp(`\\s*[,،]\\s*${reEsc(countryName)}(?=\\s*\\||$)`), '').trim();
  const canDropCountry = countryName && (!cityName || nameCount[lang][cityName] === 1);
  const options = [full];
  if (canDropCountry) options.push(dropCountry(full));
  options.push(dropBrand(full));
  if (canDropCountry) options.push(dropCountry(dropBrand(full)));
  return options.find((o) => o.length <= TITLE_MAX) || options[options.length - 1];
}
// Regional English wording for a country (EN_VARIANTS in i18n.js), or null.
function variantOf(lang, c) {
  if (lang !== 'en') return null;
  return Object.values(EN_VARIANTS).find((v) => v.countries.includes(c.slug)) || null;
}
function fitDesc(desc) {
  if (desc.length <= DESC_MAX) return desc;
  const cut = desc.slice(0, DESC_MAX - 1);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,،.:;]+$/, '') + '…';
}

/* ---------- Page shell ---------- */
const pages = [];
const seenPaths = new Set(); // pages must never collide

function addPage(o) {
  const lang = o.lang, L = LANGS[lang], t = STRINGS[lang];
  const script = ['home', 'about', '404'].includes(o.data.kind) ? ASSET.jsLite : ASSET.js;
  const alternates = o.alternates || [];
  const showLocal = lang !== 'en' && t.brandLocal !== BRAND_AR;
  const canonical = abs(o.path);
  const xDefault = alternates.find((a) => a.lang === 'en');
  const head = [
    '<!doctype html>',
    `<html lang="${o.tag}" dir="${L.dir}">`,
    '<head>',
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    `<title>${esc(o.title)}</title>`,
    `<meta name="description" content="${esc(o.desc = fitDesc(o.desc))}">`,
    o.indexable ? '<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">' : '<meta name="robots" content="noindex, follow">',
    o.indexable ? `<link rel="canonical" href="${canonical}">` : '',
    ...(o.indexable ? alternates.map((a) => `<link rel="alternate" hreflang="${a.tag}" href="${abs(a.href)}">`) : []),
    o.indexable && xDefault ? `<link rel="alternate" hreflang="x-default" href="${abs(xDefault.href)}">` : '',
    '<meta property="og:type" content="website">',
    `<meta property="og:site_name" content="${esc(BRAND)}">`,
    `<meta property="og:title" content="${esc(o.title)}">`,
    `<meta property="og:description" content="${esc(o.desc)}">`,
    `<meta property="og:url" content="${canonical}">`,
    `<meta property="og:locale" content="${ogLocale(o.tag, lang)}">`,
    // Share card (WhatsApp, Facebook, X): one per country, the home card elsewhere. See scripts/og-images.js.
    `<meta property="og:image" content="${abs(`/og/${o.og || 'home'}.jpg`)}">`,
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    '<meta name="twitter:card" content="summary_large_image">',
    '<meta name="theme-color" content="#0c3a2d">',
    '<link rel="icon" href="/favicon.svg" type="image/svg+xml">',
    '<link rel="apple-touch-icon" href="/logo.png">',
    `<style>${CSS}</style>`,
    fontLinks(lang),
    `<link rel="preload" href="${script}" as="script">`,
    o.jsonld ? `<script type="application/ld+json">${jsonForHtml(Object.assign({ '@context': 'https://schema.org' }, o.jsonld))}</script>` : '',
    '</head>',
  ].filter(Boolean).join('\n');

  const body = o.bare ? '<body class="bare">' + o.body +
    `<script id="page-data" type="application/json">${jsonForHtml(o.data)}</script><script src="${ASSET.js}" defer></script></body></html>\n` :
    '<body>' +
    `<a class="skip" href="#main">${esc(t.skip)}</a>` +
    '<header class="site-header"><div class="wrap header-inner">' +
      // SalaahDaily أوقات الصلاة | <Prayer Times in this language> · Prayer Times
      // Arabic pages skip the local part: it would repeat أوقات الصلاة.
      `<a href="${url.home(lang)}" class="brand" aria-label="${esc(BRAND_FULL)}${showLocal ? ` | ${esc(t.brandLocal)}` : ''}">${ICON.brand}` +
        '<span class="brand-text">' +
          `<span class="brand-main"><span class="brand-tr" lang="en" dir="ltr">${esc(BRAND)}</span> <span class="brand-ar" lang="ar" dir="rtl">${esc(BRAND_AR)}</span></span>` +
          '<span class="brand-sub"><span class="brand-sep" aria-hidden="true">|</span> ' +
            (showLocal ? `<span class="brand-local">${esc(t.brandLocal)}</span> <span class="brand-dot" aria-hidden="true">·</span> ` : '') +
            `<span class="brand-en" lang="en" dir="ltr">${esc(STRINGS.en.brandLocal)}</span>` +
          '</span>' +
        '</span></a>' +
      '<div class="header-nav">' +
        `<a class="btn-ghost" href="${url.near(lang)}#locate" aria-label="${esc(t.myLocation)}">${ICON.locate}<span class="hide-sm">${esc(t.myLocation)}</span></a>` +
        langMenu(lang, alternates) +
        `<button type="button" class="btn-ghost" data-open-settings aria-label="${esc(t.settings)}">${ICON.settings}<span class="hide-sm">${esc(t.settings)}</span></button>` +
      '</div>' +
    '</div></header>' +
    `<main id="main" class="wrap" tabindex="-1">${o.body}</main>` +
    settingsDialog(lang) +
    footer(lang) +
    `<script id="page-data" type="application/json">${jsonForHtml(o.data)}</script>` +
    `<script src="${script}" defer></script>` +
    '</body></html>\n';

  // Written straight to disk: holding every page's HTML in memory runs out of heap at this size.
  if (seenPaths.has(o.path)) problems.push(`Two pages share ${o.path}`);
  seenPaths.add(o.path);
  write(o.file || path.join(o.path, 'index.html'), head + '\n' + body);
  pages.push({ path: o.path, lang, indexable: o.indexable, alternates });
}

/* ---------- Home: continents with country cards ---------- */
function homePage(lang) {
  const t = STRINGS[lang], ctx = ctxFor(lang, 'hanafi');
  const nText = Core.num(ALL_CITIES.length, ctx);
  const place = tpl(t.nCountries, { k: Core.num(COUNTRIES.length, ctx) });
  const h1 = tpl(t.homeH1, { n: nText, place });
  const title = lang === 'en' ? tpl(t.homeTitle, { n: nText }) : tpl(t.homeTitle, { place });
  const desc = tpl(t.homeDesc, { n: nText, place, top: listJoin(lang, COUNTRIES.slice(0, 3).map((c) => nameIn(c.name, lang))) });
  const example = nameIn(COUNTRIES[0].cities[0].names, lang, COUNTRIES[0]);

  // Heading: the Arabic call to prayer, with its meaning in the page language (Arabic pages show it once).
  const call = `<span class="h1-ar" lang="ar" dir="rtl">${HAYYA_AR.split('، ').map((p, i, a) => `<span>${esc(p)}${i < a.length - 1 ? '،' : ''}</span>`).join(' ')}</span>` +
    (t.hayya ? `<span class="h1-tr">${esc(t.hayya)}</span>` : '');
  let html = hero(lang, ctx, { html: call }, tpl(t.searchPlaceholder, { x: example }), h1);
  CONTINENTS.forEach((k) => {
    const list = COUNTRIES.filter((c) => c.continent === k);
    if (!list.length) return;
    html += `<section class="continent"><h2 class="section-title">${esc(t.continents[k])}</h2><ul class="country-grid">` +
      list.map((c) => `<li><a class="country-card" href="${url.country(lang, c)}"><span class="cc-name">${esc(nameIn(c.name, lang))}</span>` +
        `<span class="muted">${esc(tpl(t.citiesCount, { n: Core.num(c.cities.length, ctx) }))}</span></a></li>`).join('') +
      '</ul></section>';
  });
  html += `<section class="coming-soon"><h2>${esc(t.countryNotListed)}</h2>` +
    `<p><a class="btn-link" href="${url.near(lang)}#locate">${esc(t.showMyLocation)}</a>. ${esc(t.worksAnywhere)}</p></section>`;

  const pagePath = url.home(lang);
  addPage({
    lang, tag: langTag(lang), title, desc, path: pagePath, alternates: cluster(url.home), indexable: true, body: html,
    jsonld: { '@graph': [ORG, WEBSITE(lang), { '@type': 'WebPage', '@id': abs(pagePath), url: abs(pagePath), name: title, description: desc, inLanguage: langTag(lang), dateModified: TODAY_ISO, isPartOf: { '@id': `${SITE}/#website` } }] },
    data: clientData(lang, { kind: 'home', defaultSect: 'hanafi', searchUrl: SEARCH[lang].path }),
  });
}

// Countries whose default follows Diyanet's official timetable (Asr by one shadow length).
const DIYANET = new Set(['turkey', 'cyprus']);
// Countries whose official timetable (named here, as it names itself) also uses the first Asr time.
const NORDIC = new Set(['norway', 'sweden', 'denmark', 'finland', 'iceland']);
const OFFICIAL_ASR = { 'bosnia-and-herzegovina': 'Islamska zajednica u Bosni i Hercegovini', kosovo: 'Bashkësia Islame e Kosovës', germany: 'DITIB (Diyanet)',
  netherlands: 'Diyanet', luxembourg: 'Diyanet', switzerland: 'Diyanet', austria: 'IGGÖ (Islamische Glaubensgemeinschaft in Österreich)',
  serbia: 'Islamska zajednica', montenegro: 'Islamska zajednica', croatia: 'Islamska zajednica', slovenia: 'Islamska skupnost',
  bulgaria: 'Главно мюфтийство (Chief Mufti of Bulgaria)', denmark: 'Diyanet', finland: 'Diyanet', iceland: 'Diyanet', liechtenstein: 'Diyanet',
  ukraine: 'ДУМУ (Spiritual Administration of Muslims of Ukraine)', poland: 'Muzułmański Związek Religijny (MZR)', hungary: 'Magyarországi Muszlimok Egyháza (MME)' };

/* ---------- Country: today's times for every city ---------- */
function countryPage(lang, c) {
  const t = STRINGS[lang], ctx = ctxFor(lang, c.defaultSect);
  const country = nameIn(c.name, lang);
  const nText = Core.num(c.cities.length, ctx);
  const variant = variantOf(lang, c);
  const title = fitTitle(tpl((variant && variant.countryTitle) || t.countryTitle, { country }), lang);
  const desc = tpl(t.countryDesc, { n: nText, country });
  const pagePath = url.country(lang, c);
  const crumbItems = [{ name: t.home, href: url.home(lang) }, { name: country, href: pagePath }];
  const example = nameIn(c.cities[0].names, lang, c);
  const heads = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].map((k) => `<th scope="col">${esc(t.prayers[k])}</th>`).join('');
  const rows = [];

  let html = breadcrumbs(crumbItems) + hero(lang, ctx, tpl(t.homeH1, { n: nText, place: country }), tpl(t.searchPlaceholder, { x: example }));
  html += `<section class="country-block" data-country aria-label="${esc(country)}">`;
  c.regions.forEach((r) => {
    html += `<div class="region" data-region><h2>${esc(nameIn(r.names, lang, c))}</h2><div class="table-scroll"><table class="city-table">` +
      `<thead><tr><th scope="col">${esc(t.colCity)}</th>${heads}</tr></thead><tbody>`;
    r.cities.forEach((ci) => {
      const loc = locOf(ci, lang);
      const times = Core.cityRowTimes(loc, ctx, NOW);
      const search = searchText(Array.from(new Set(Object.values(ci.names))).join(' '));
      html += `<tr data-name="${esc(search)}" data-i="${rows.length}"><th scope="row"><a href="${url.city(lang, ci)}">${esc(loc.name)}</a></th>` +
        times.map((x) => `<td><bdi>${esc(x)}</bdi></td>`).join('') + '</tr>';
      rows.push(ci.method === c.method ? [ci.lat, ci.lng, ci.tz] : [ci.lat, ci.lng, ci.tz, ci.method]);
    });
    html += '</tbody></table></div></div>';
  });
  html += '</section>';
  html += `<p class="empty-search" id="emptySearch" hidden>${esc(t.noMatch)} <a class="btn-link" href="${url.near(lang)}#locate">${esc(t.showMyLocation)}</a></p>`;
  html += `<p class="muted small">${esc(tpl(t.methodLine, { m: Core.methodLabel(c.method, ctx) }))} · ${esc(tpl(t.updated, { date: Core.gregorian(...ymd(NOW, c.tz), 'full', ctx) }))}</p>`;
  // Every city's Ramadan timetable, one click from the country page.
  const ramYear = Core.num(RAMADAN.y, ctx);
  html += `<section class="card guide"><h2>${esc(tpl(GUIDES[lang].ramLink, { year: ramYear, city: country }))}</h2>` +
    linkList(c.cities.map((ci) => ({ name: nameIn(ci.names, lang, c), href: url.ramadan(lang, ci) }))) + '</section>';
  // Quick answers: the method, the default school and why Asr differs. Visible on the page and in FAQPage.
  const cf = COUNTRY_FAQ[lang], sectName = t.sects[c.defaultSect];
  const methodText = tpl(t.aMethod, { method: Core.methodLabel(c.defaultSect === 'jafria' ? (c.jafariMethod || 'Jafari') : c.method, ctx), sect: sectName });
  const faq = [
    { q: tpl(cf[0], { country }), a: DIYANET.has(c.slug) ? GUIDES[lang].diyanet
      : OFFICIAL_ASR[c.slug] ? tpl(GUIDES[lang].officialAsr, { body: OFFICIAL_ASR[c.slug] }) : tpl(cf[1], { sect: sectName }) },
    { q: t.qMethod, a: methodText },
    { q: cf[2], a: t.aboutSects },
  ];
  // Midnight sun and light summer nights: how the times are estimated, and the options scholars give.
  if (NORDIC.has(c.slug)) faq.push({ q: GUIDES[lang].nordicQ, a: GUIDES[lang].nordicA });
  html += `<section class="card faq" aria-labelledby="faqTitle"><h2 id="faqTitle">${esc(tpl(t.faqH2, { city: country }))}</h2>` +
    faq.map((it) => `<div class="faq-item"><h3>${esc(it.q)}</h3><p>${esc(it.a)}</p></div>`).join('') + '</section>';
  html += `<section class="coming-soon"><h2>${esc(t.cityNotListed)}</h2>` +
    `<p><a class="btn-link" href="${url.near(lang)}#locate">${esc(t.showMyLocation)}</a>. ${esc(t.worksAnywhere)}</p></section>`;

  const tag = langTag(lang, c);
  addPage({
    lang, tag, title, desc, path: pagePath, alternates: cluster((l) => url.country(l, c), c), indexable: true, body: html, og: c.slug,
    jsonld: {
      '@graph': [
        { '@type': 'WebPage', '@id': abs(pagePath), url: abs(pagePath), name: title, description: desc, inLanguage: tag, dateModified: TODAY_ISO,
          isPartOf: { '@id': `${SITE}/#website` }, about: { '@type': 'Country', name: country } },
        { '@type': 'FAQPage', '@id': `${abs(pagePath)}#faq`, inLanguage: tag,
          mainEntity: faq.map((it) => ({ '@type': 'Question', name: it.q, acceptedAnswer: { '@type': 'Answer', text: it.a } })) },
        breadcrumbLd(crumbItems),
      ],
    },
    data: clientData(lang, { kind: 'country', defaultSect: c.defaultSect, rows, method: c.method, jafariMethod: c.jafariMethod }),
  });
}
function ymd(date, tz) { const p = Core.partsInTz(date, tz); return [p.y, p.m, p.d]; }

/* ---------- City pages ---------- */
function cityPage(lang, ci) {
  const c = ci.country, t = STRINGS[lang], ctx = ctxFor(lang, ci.defaultSect);
  const loc = locOf(ci, lang);
  const cityName = loc.name, countryName = nameIn(c.name, lang);
  const variant = variantOf(lang, c);
  if (variant) {
    loc.v = { summary: variant.summary, faq: variant.faq.concat((variant.faqByCountry && variant.faqByCountry[c.slug]) || []) };
  }
  // The H1 keeps the standard wording; a regional title adds the other search term ("Namaz Timings").
  const h1 = tpl(t.cityTitle, { city: cityName, country: countryName }).split(' | ')[0];
  const fullTitle = tpl((variant && variant.cityTitle) || t.cityTitle, { city: cityName, country: countryName });
  const title = fitTitle(fullTitle, lang, countryName, cityName);
  const desc = tpl(t.cityDesc, { city: cityName, country: countryName });
  const pagePath = url.city(lang, ci);
  const today = Core.renderToday(loc, ctx, NOW, h1);
  const p = Core.partsInTz(NOW, ci.tz);
  const month = Core.renderMonth(loc, ctx, p.y, p.m, p);
  const faq = Core.faqItems(loc, ctx, NOW);

  const crumbItems = [
    { name: t.home, href: url.home(lang) },
    { name: countryName, href: url.country(lang, c) },
    { name: nameIn(ci.region.names, lang, c) },
    { name: cityName, href: pagePath },
  ];

  const nearby = ALL_CITIES
    .filter((o) => o !== ci)
    .map((o) => ({ o, km: Core.distanceKm(ci.lat, ci.lng, o.lat, o.lng) }))
    .sort((a, b) => a.km - b.km)
    .slice(0, 6);

  const body = breadcrumbs(crumbItems) +
    `<section class="today pattern" id="today">${today.html}</section>` +
    `<section class="card nafl" id="nafl" aria-labelledby="naflTitle">${Core.renderNafl(loc, ctx, NOW)}</section>` +
    '<div class="layout">' +
      monthCard(lang, month) +
      '<aside class="side">' +
        `<section class="card ramadan-link"><a href="${url.ramadan(lang, ci)}">${esc(tpl(GUIDES[lang].ramLink, { year: Core.num(RAMADAN.y, ctx), city: cityName }))}</a></section>` +
        `<section class="card qibla">${Core.qiblaCard(ci.lat, ci.lng, ctx)}<p class="small"><a href="${url.qibla(lang)}">${esc(GUIDES[lang].qbNav)}</a></p></section>` +
        `<section class="card nearby"><h2>${esc(t.nearby)}</h2><ul>` +
          nearby.map((n) => `<li><a href="${url.city(lang, n.o)}"><span>${esc(nameIn(n.o.names, lang, n.o.country))}</span><span class="muted">${esc(tpl(t.km, { n: Core.numGrouped(Math.round(n.km), ctx) }))}</span></a></li>`).join('') +
        '</ul></section>' +
      '</aside>' +
    '</div>' +
    `<section class="card jumuah" id="jumuah" aria-labelledby="jumuahTitle">${Core.renderJumuah(loc, ctx, NOW)}</section>` +
    `<section class="card faq" id="faq" aria-labelledby="faqTitle">${Core.renderFaq(loc, ctx, NOW)}</section>` +
    Core.mosquesCard(ci.lat, ci.lng, tpl(t.mosquesH2, { city: cityName }), ctx) +
    `<p class="muted small updated">${esc(tpl(t.updated, { date: Core.gregorian(p.y, p.m, p.d, 'full', ctx) }))} · <a href="${url.about(lang)}">${esc(t.aboutLink)}</a></p>`;

  const tag = langTag(lang, c);
  addPage({
    lang, tag, title, desc, path: pagePath, alternates: cluster((l) => url.city(l, ci), c), indexable: true, body, og: c.slug,
    jsonld: {
      '@graph': [
        {
          '@type': 'WebPage', '@id': abs(pagePath), url: abs(pagePath), name: title, description: desc, inLanguage: tag,
          dateModified: TODAY_ISO, isPartOf: { '@id': `${SITE}/#website` },
          // Voice assistants read these parts aloud: the H1, the one-line answer and the five times.
          speakable: { '@type': 'SpeakableSpecification', cssSelector: ['#today h1', '.today-summary', '.prayers'] },
          about: {
            '@type': 'City', name: cityName,
            geo: { '@type': 'GeoCoordinates', latitude: ci.lat, longitude: ci.lng },
            containedInPlace: { '@type': 'Country', name: countryName },
          },
        },
        { '@type': 'FAQPage', '@id': `${abs(pagePath)}#faq`, inLanguage: tag,
          mainEntity: faq.map((it) => ({ '@type': 'Question', name: it.q, acceptedAnswer: { '@type': 'Answer', text: it.a } })) },
        breadcrumbLd(crumbItems),
      ],
    },
    data: clientData(lang, { kind: 'city', defaultSect: ci.defaultSect, h1, loc }),
  });
}

/* ---------- Near-me pages ---------- */
function nearPage(lang) {
  const t = STRINGS[lang], ctx = ctxFor(lang, 'hanafi');
  const title = t.nearTitle, desc = t.nearDesc, pagePath = url.near(lang);
  const skeleton = '<section class="today pattern" id="today"></section>' +
    '<section class="card nafl" id="nafl" aria-labelledby="naflTitle"></section><div class="layout">' +
    monthCard(lang, { title: '', sub: '', table: '' }) +
    '<aside class="side"><section class="card qibla" id="qiblaCard"></section></aside></div>' +
    '<div id="mosquesSlot"></div>';
  const body = '<section class="home-hero pattern">' +
    `<p class="eyebrow" lang="ar" dir="rtl">${Core.BISMILLAH}</p>` +
    `<h1>${esc(t.nearH1)}</h1><p class="lede">${esc(t.nearLede)}</p>` +
    `<button type="button" class="btn-gold" data-locate>${ICON.locate}${esc(t.showMyLocation)}</button>` +
    '<p class="near-status" id="nearStatus" role="status"></p>' +
    '</section><div id="nearResult" hidden></div>';
  addPage({
    lang, tag: langTag(lang), title, desc, path: pagePath, alternates: cluster(url.near), indexable: true, body,
    jsonld: { '@type': 'WebPage', url: abs(pagePath), name: title, description: desc, inLanguage: langTag(lang) },
    data: clientData(lang, { kind: 'near', defaultSect: ctx.sect, citiesUrl: ASSET.cities, skeleton }),
  });
}

/* ---------- How we calculate ---------- */
function aboutPage(lang) {
  const t = STRINGS[lang], ctx = ctxFor(lang, 'hanafi');
  const pagePath = url.about(lang);
  // Isha is either an angle or a fixed number of minutes after Maghrib (Umm al-Qura, Qatar).
  // Ukraine's DUMU uses minutes on both sides: Fajr before sunrise, Isha a range after Maghrib.
  const numText = (v) => String(v).replace(/\d+/g, (n) => Core.num(+n, ctx));
  const deg = (x) => (typeof x !== 'object' ? `${Core.decShort(x, ctx)}°`
    : x.before ? tpl(GUIDES[lang].fajrBefore, { n: numText(x.before) }) : tpl(t.ishaMinutes, { n: numText(x.min) }));
  const rows = COUNTRIES.map((c) => {
    const a = Core.METHOD_ANGLES[c.method];
    return `<tr><th scope="row"><a href="${url.country(lang, c)}">${esc(nameIn(c.name, lang))}</a></th><td><a href="${url.method(lang, c.method)}">${esc(Core.methodLabel(c.method, ctx))}</a></td>` +
      `<td><bdi>${deg(a[0])}</bdi></td><td><bdi>${deg(a[1])}</bdi></td></tr>`;
  }).join('');
  const body = breadcrumbs([{ name: t.home, href: url.home(lang) }, { name: t.aboutLink, href: pagePath }]) +
    '<article class="card about">' +
      `<h1>${esc(t.aboutH1)}</h1><p>${esc(t.aboutP1)}</p>` +
      `<h2>${esc(t.aboutMethodsH2)}</h2><div class="table-scroll"><table class="city-table">` +
        `<thead><tr><th scope="col">${esc(t.colCountry)}</th><th scope="col">${esc(t.colMethod)}</th><th scope="col">${esc(t.prayers.fajr)}</th><th scope="col">${esc(t.prayers.isha)}</th></tr></thead>` +
        `<tbody>${rows}</tbody></table></div>` +
      `<h2>${esc(t.aboutSectsH2)}</h2><p>${esc(t.aboutSects)}</p>` +
      `<h2>${esc(t.aboutNaflH2)}</h2><p>${esc(t.naflNote)} ${esc(t.laylNote)}</p>` +
      `<h2>${esc(t.aboutHijriH2)}</h2><p>${esc(t.aboutHijri)}</p>` +
      `<h2>${esc(t.aboutAccuracyH2)}</h2><p>${esc(t.aboutAccuracy)}</p>` +
      `<p class="muted small">${esc(tpl(t.updated, { date: Core.gregorian(...ymd(NOW, 'UTC'), 'full', ctx) }))}</p>` +
    '</article>';
  addPage({
    lang, tag: langTag(lang), title: t.aboutTitle, desc: t.aboutDesc, path: pagePath, alternates: cluster(url.about), indexable: true, body,
    jsonld: { '@graph': [ORG, { '@type': 'AboutPage', '@id': abs(pagePath), url: abs(pagePath), name: t.aboutTitle, description: t.aboutDesc, inLanguage: langTag(lang), dateModified: TODAY_ISO, publisher: { '@id': `${SITE}/#org` } }] },
    data: clientData(lang, { kind: 'about', defaultSect: 'hanafi' }),
  });
}

/* ---------- Explainers: the prayers and the Hijri calendar ---------- */
// The city whose times a prayer page shows before the visitor has picked one (then: their last city).
const DEFAULT_CITY = {
  en: 'saudi-arabia/makkah', ur: 'pakistan/karachi', hi: 'india/new-delhi', bn: 'bangladesh/dhaka', id: 'indonesia/jakarta',
  ms: 'malaysia/kuala-lumpur', fa: 'iran/tehran', prs: 'afghanistan/kabul', ps: 'afghanistan/kabul', dv: 'maldives/male',
  es: 'mexico/mexico-city', fr: 'saudi-arabia/makkah', ar: 'saudi-arabia/makkah', tr: 'turkey/istanbul', ha: 'nigeria/kano',
};
// Cities linked from each prayer page: a worldwide set for languages spoken in many countries, else the home country's first ten.
const GLOBAL_CITIES = ['saudi-arabia/makkah', 'saudi-arabia/madinah', 'pakistan/karachi', 'pakistan/lahore', 'bangladesh/dhaka',
  'indonesia/jakarta', 'turkey/istanbul', 'egypt/cairo', 'uk/london', 'usa/new-york'];
const cityByPath = (p) => ALL_CITIES.find((ci) => `${ci.country.slug}/${ci.slug}` === p);
Object.values(DEFAULT_CITY).concat(GLOBAL_CITIES).forEach((p) => { if (!cityByPath(p)) problems.push(`guides: unknown city ${p}`); });
function guideCities(lang) {
  if (['en', 'es', 'fr'].includes(lang)) return GLOBAL_CITIES.map(cityByPath);
  return cityByPath(DEFAULT_CITY[lang]).country.cities.slice(0, 10);
}
// The live "today in <city>" line starts with the default city; the browser swaps in the last city visited.
function guideLoc(lang) {
  const ci = cityByPath(DEFAULT_CITY[lang]);
  return { ci, loc: Object.assign(locOf(ci, lang), { url: url.city(lang, ci), defaultSect: ci.defaultSect }) };
}
const linkList = (items) => `<ul class="chips">${items.map((it) => `<li><a href="${it.href}">${esc(it.name)}</a></li>`).join('')}</ul>`;
const aboutThing = (name, wiki) => ({ '@type': 'Thing', name, sameAs: wiki });

function prayersHub(lang) {
  const t = STRINGS[lang], g = GUIDES[lang], pagePath = url.prayers(lang);
  const crumbs = [{ name: t.home, href: url.home(lang) }, { name: g.prayersNav, href: pagePath }];
  const body = breadcrumbs(crumbs) + '<article class="card about guide">' +
    `<h1>${esc(g.hubH1)}</h1><p class="lede-text">${esc(g.hubLede)}</p><ul class="guide-list">` +
    GUIDE_PRAYERS.map((k) => `<li><h2><a href="${url.prayer(lang, k)}">${esc(t.prayers[k])}</a> <span class="ar" lang="ar" dir="rtl">${Core.ARABIC[k]}</span></h2><p>${esc(g.P[k][0])}</p></li>`).join('') +
    '</ul>' + linkList([{ name: g.hijriNav, href: url.hijri(lang) }, { name: t.aboutLink, href: url.about(lang) }]) + '</article>';
  const title = fitTitle(g.hubTitle, lang);
  addPage({
    lang, tag: langTag(lang), title, desc: g.hubDesc, path: pagePath, alternates: cluster(url.prayers), indexable: true, body,
    jsonld: { '@graph': [
      { '@type': 'CollectionPage', '@id': abs(pagePath), url: abs(pagePath), name: title, description: g.hubDesc, inLanguage: langTag(lang),
        dateModified: TODAY_ISO, isPartOf: { '@id': `${SITE}/#website` }, about: aboutThing(g.prayersNav, WIKI.prayers),
        hasPart: GUIDE_PRAYERS.map((k) => ({ '@type': 'WebPage', name: t.prayers[k], url: abs(url.prayer(lang, k)) })) },
      breadcrumbLd(crumbs),
    ] },
    data: clientData(lang, { kind: 'prayers', defaultSect: 'hanafi' }),
  });
}

function prayerPage(lang, key) {
  const t = STRINGS[lang], g = GUIDES[lang], pagePath = url.prayer(lang, key), name = t.prayers[key];
  const { ci, loc } = guideLoc(lang);
  const ctx = ctxFor(lang, ci.defaultSect);
  const [starts, ends, rakahs, schools] = g.P[key];
  const faq = [
    { q: tpl(g.qStart, { prayer: name }), a: starts },
    { q: tpl(g.qEnd, { prayer: name }), a: ends },
    { q: tpl(g.qRakahs, { prayer: name }), a: rakahs },
  ];
  const crumbs = [{ name: t.home, href: url.home(lang) }, { name: g.prayersNav, href: url.prayers(lang) }, { name, href: pagePath }];
  const body = breadcrumbs(crumbs) + '<article class="card about guide">' +
    `<h1>${esc(tpl(g.pH1, { prayer: name }))} <span class="ar" lang="ar" dir="rtl">${Core.ARABIC[key]}</span></h1>` +
    `<p class="prayer-live"><span id="prayerLive">${Core.renderPrayerLive(loc, ctx, key, NOW)}</span> · <a id="prayerCity" href="${loc.url}">${esc(tpl(g.seeCity, { city: loc.name }))}</a></p>` +
    faq.map((it) => `<h2>${esc(it.q)}</h2><p>${esc(it.a)}</p>`).join('') +
    `<h2 id="schools">${esc(g.lSchools)}</h2><p>${esc(schools)}</p>` + (key === 'asr' ? `<p>${esc(t.aboutSects)}</p>` : '') +
    `<h2>${esc(tpl(g.otherCities, { prayer: name }))}</h2>` +
    linkList(guideCities(lang).map((o) => ({ name: nameIn(o.names, lang, o.country), href: url.city(lang, o) }))) +
    `<h2>${esc(g.otherPrayers)}</h2>` +
    linkList(GUIDE_PRAYERS.filter((k) => k !== key).map((k) => ({ name: t.prayers[k], href: url.prayer(lang, k) }))
      .concat([{ name: g.hijriNav, href: url.hijri(lang) }, { name: t.aboutLink, href: url.about(lang) }])) +
    `<p class="muted small">${esc(tpl(t.updated, { date: Core.gregorian(...ymd(NOW, 'UTC'), 'full', ctx) }))}</p></article>`;
  const title = fitTitle(tpl(g.pTitle, { prayer: name }), lang);
  const desc = tpl(g.pDesc, { prayer: name });
  addPage({
    lang, tag: langTag(lang), title, desc, path: pagePath, alternates: cluster((l) => url.prayer(l, key)), indexable: true, body,
    jsonld: { '@graph': [
      { '@type': 'WebPage', '@id': abs(pagePath), url: abs(pagePath), name: title, description: desc, inLanguage: langTag(lang),
        dateModified: TODAY_ISO, isPartOf: { '@id': `${SITE}/#website` }, about: aboutThing(name, WIKI[key]),
        speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.guide h1', '.guide h2 + p'] } },
      { '@type': 'FAQPage', '@id': `${abs(pagePath)}#faq`, inLanguage: langTag(lang),
        mainEntity: faq.map((it) => ({ '@type': 'Question', name: it.q, acceptedAnswer: { '@type': 'Answer', text: it.a } })) },
      breadcrumbLd(crumbs),
    ] },
    data: clientData(lang, { kind: 'prayer', prayer: key, defaultSect: ci.defaultSect, pl: loc }),
  });
}

// Hijri calendar from the Umm al-Qura calendar (the same one every page uses): the first day of each
// month, found by scanning the days around today.
const HIJRI_START = {};
(function () {
  const p = Core.partsInTz(NOW, 'Asia/Riyadh');
  for (let i = -400; i <= 760; i++) {
    const d = new Date(Date.UTC(p.y, p.m - 1, p.d + i));
    const gy = d.getUTCFullYear(), gm = d.getUTCMonth() + 1, gd = d.getUTCDate();
    const h = Core.hijriParts(gy, gm, gd, 0);
    const k = `${h.y}-${h.m}`;
    if (h.d === 1 && !HIJRI_START[k]) HIJRI_START[k] = { y: gy, m: gm, d: gd };
  }
})();
const EVENTS = [['ramadan', 9, 1], ['fitr', 10, 1], ['arafah', 12, 9], ['adha', 12, 10], ['newYear', 1, 1], ['ashura', 1, 10]];
function hijriToGregorian(hy, hm, hd) {
  const s0 = HIJRI_START[`${hy}-${hm}`];
  if (!s0) return null;
  const d = new Date(Date.UTC(s0.y, s0.m - 1, s0.d + hd - 1));
  return { y: d.getUTCFullYear(), m: d.getUTCMonth() + 1, d: d.getUTCDate() };
}

function hijriPage(lang) {
  const t = STRINGS[lang], g = GUIDES[lang], pagePath = url.hijri(lang);
  const { ci } = guideLoc(lang);
  const ctx = ctxFor(lang, ci.defaultSect);
  const today = ymd(NOW, ci.tz), h = Core.hijriParts(today[0], today[1], today[2], 0);
  const yearText = `${Core.num(h.y, ctx)} ${t.hijriEra}`;
  const gFull = (x) => Core.gregorian(x.y, x.m, x.d, 'full', ctx);
  const todayLine = tpl(g.hToday, { hijri: Core.hijri(today[0], today[1], today[2], ctx, 'full'), date: Core.gregorian(...today, 'full', ctx) });
  const months = [];
  for (let m = 1; m <= 12; m++) {
    const a = HIJRI_START[`${h.y}-${m}`], b = m < 12 ? HIJRI_START[`${h.y}-${m + 1}`] : HIJRI_START[`${h.y + 1}-1`];
    if (!a) { problems.push(`hijri: no start found for ${h.y}-${m}`); continue; }
    months.push({ m, a, days: b ? Math.round((Date.UTC(b.y, b.m - 1, b.d) - Date.UTC(a.y, a.m - 1, a.d)) / 864e5) : null });
  }
  // The next occurrence of each event, on or after today.
  const todayUtc = Date.UTC(today[0], today[1] - 1, today[2]);
  const events = EVENTS.map(([k, hm, hd]) => {
    for (const hy of [h.y, h.y + 1]) {
      const gd = hijriToGregorian(hy, hm, hd);
      if (gd && Date.UTC(gd.y, gd.m - 1, gd.d) >= todayUtc) return { k, hy, hm, hd, gd };
    }
    problems.push(`hijri: no date found for ${k}`);
    return null;
  }).filter(Boolean).sort((a, b) => Date.UTC(a.gd.y, a.gd.m - 1, a.gd.d) - Date.UTC(b.gd.y, b.gd.m - 1, b.gd.d));
  const hijriText = (e) => `${Core.num(e.hd, ctx)} ${t.hijriMonths[e.hm - 1]} ${Core.num(e.hy, ctx)} ${t.hijriEra}`;

  const crumbs = [{ name: t.home, href: url.home(lang) }, { name: g.hijriNav, href: pagePath }];
  const body = breadcrumbs(crumbs) + '<article class="card about guide">' +
    `<h1>${esc(g.hH1)}</h1><p class="answer" id="hijriToday">${esc(todayLine)}</p><p class="muted">${esc(t.aboutHijri)}</p>` +
    `<h2>${esc(g.hEventsH2)}</h2><div class="table-scroll"><table class="city-table"><tbody>` +
    events.map((e) => `<tr><th scope="row">${esc(g.ev[e.k])}</th><td>${esc(hijriText(e))}</td><td>${esc(gFull(e.gd))}</td></tr>`).join('') +
    '</tbody></table></div>' +
    `<h2>${esc(tpl(g.hMonthsH2, { year: yearText }))}</h2><div class="table-scroll"><table class="city-table">` +
    `<thead><tr><th scope="col">${esc(g.colMonth)}</th><th scope="col">${esc(g.colStarts)}</th><th scope="col">${esc(g.colDays)}</th></tr></thead><tbody>` +
    months.map((x) => `<tr${x.m === h.m ? ' class="is-today"' : ''}><th scope="row">${esc(t.hijriMonths[x.m - 1])}</th><td>${esc(gFull(x.a))}</td><td>${x.days ? esc(Core.num(x.days, ctx)) : ''}</td></tr>`).join('') +
    '</tbody></table></div>' +
    linkList([{ name: g.prayersNav, href: url.prayers(lang) }, { name: t.aboutLink, href: url.about(lang) }]) +
    `<p class="muted small">${esc(tpl(t.updated, { date: Core.gregorian(...today, 'full', ctx) }))}</p></article>`;
  const title = fitTitle(tpl(g.hTitle, { year: yearText }), lang);
  const desc = tpl(g.hDesc, { year: yearText });
  addPage({
    lang, tag: langTag(lang), title, desc, path: pagePath, alternates: cluster(url.hijri), indexable: true, body,
    jsonld: { '@graph': [
      { '@type': 'WebPage', '@id': abs(pagePath), url: abs(pagePath), name: title, description: desc, inLanguage: langTag(lang),
        dateModified: TODAY_ISO, isPartOf: { '@id': `${SITE}/#website` }, about: aboutThing(g.hijriNav, WIKI.hijri),
        speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.guide h1', '#hijriToday'] } },
      breadcrumbLd(crumbs),
    ] },
    data: clientData(lang, { kind: 'hijri', defaultSect: ci.defaultSect }),
  });
}

/* ---------- Ramadan timetable per city ---------- */
// The Ramadan to show: this one while it runs, else the next. Umm al-Qura start and length.
const RAMADAN = (function () {
  const p = Core.partsInTz(NOW, 'Asia/Riyadh'), h = Core.hijriParts(p.y, p.m, p.d, 0);
  const hy = h.m <= 9 ? h.y : h.y + 1;
  const a = HIJRI_START[`${hy}-9`], b = HIJRI_START[`${hy}-10`];
  if (!a || !b) { problems.push(`ramadan: no Umm al-Qura dates for ${hy}`); return null; }
  return { y: a.y, m: a.m, d: a.d, hy, n: Math.round((Date.UTC(b.y, b.m - 1, b.d) - Date.UTC(a.y, a.m - 1, a.d)) / 864e5) };
})();

function ramadanPage(lang, ci) {
  const c = ci.country, t = STRINGS[lang], g = GUIDES[lang], ctx = ctxFor(lang, ci.defaultSect);
  const loc = locOf(ci, lang), cityName = loc.name, countryName = nameIn(c.name, lang);
  const pagePath = url.ramadan(lang, ci), year = Core.num(RAMADAN.y, ctx), hijriYear = `${Core.num(RAMADAN.hy, ctx)} ${t.hijriEra}`;
  const r = Core.renderRamadan(loc, ctx, RAMADAN, NOW);
  const firstDate = Core.gregorian(r.first.d.y, r.first.d.m, r.first.d.d, 'full', ctx), sect = t.sects[ci.defaultSect];
  const faq = [
    { q: tpl(g.qRamStart, { year, city: cityName }), a: tpl(g.aRamStart, { hijri: hijriYear, date: firstDate }) },
    { q: tpl(g.qSehri, { city: cityName }), a: tpl(g.aSehri, { sehri: Core.fmtTime(r.first.tt.fajr, loc.tz, ctx), date: firstDate, sect }) },
    { q: tpl(g.qIftar, { city: cityName }), a: tpl(g.aIftar, { iftar: Core.fmtTime(r.first.tt.maghrib, loc.tz, ctx), date: firstDate, sect }) },
  ];
  const crumbs = [
    { name: t.home, href: url.home(lang) }, { name: countryName, href: url.country(lang, c) },
    { name: cityName, href: url.city(lang, ci) }, { name: tpl(g.ramLink, { year, city: cityName }), href: pagePath },
  ];
  const nearby = ALL_CITIES.filter((o) => o !== ci)
    .map((o) => ({ o, km: Core.distanceKm(ci.lat, ci.lng, o.lat, o.lng) })).sort((a, b) => a.km - b.km).slice(0, 6);
  const body = breadcrumbs(crumbs) +
    '<section class="card about guide ramadan">' +
      `<h1>${esc(tpl(g.ramH1, { year, city: cityName }))}</h1>` +
      `<p class="answer" id="ramLede">${r.lede}</p>` + Core.sectPicker(ctx) +
      `<div class="table-scroll"><table class="city-table ram-table" id="ramTable">${r.table}</table></div>` +
      `<p class="muted small">${esc(g.ramNote)}</p>` +
    '</section>' +
    `<section class="card faq" aria-labelledby="faqTitle"><h2 id="faqTitle">${esc(tpl(t.faqH2, { city: cityName }))}</h2>` +
      faq.map((it) => `<div class="faq-item"><h3>${esc(it.q)}</h3><p>${esc(it.a)}</p></div>`).join('') + '</section>' +
    `<section class="card guide"><h2>${esc(g.ramNearby)}</h2>` +
      linkList(nearby.map((n) => ({ name: nameIn(n.o.names, lang, n.o.country), href: url.ramadan(lang, n.o) }))) +
      linkList([{ name: tpl(g.seeCity, { city: cityName }), href: url.city(lang, ci) }, { name: t.prayers.fajr, href: url.prayer(lang, 'fajr') },
        { name: t.prayers.maghrib, href: url.prayer(lang, 'maghrib') }, { name: g.hijriNav, href: url.hijri(lang) }]) + '</section>';
  const tag = langTag(lang, c);
  // A city name used in two countries (London, Hyderabad) keeps its country in the title.
  const titleCity = nameCount[lang][cityName] > 1 ? cityName + (LANGS[lang].dir === 'rtl' ? '، ' : ', ') + countryName : cityName;
  const title = fitTitle(tpl(g.ramTitle, { year, city: titleCity }), lang);
  const desc = tpl(g.ramDesc, { year, hijri: hijriYear, city: titleCity });
  addPage({
    lang, tag, title, desc, path: pagePath, alternates: cluster((l) => url.ramadan(l, ci), c), indexable: true, body, og: c.slug,
    jsonld: { '@graph': [
      { '@type': 'WebPage', '@id': abs(pagePath), url: abs(pagePath), name: title, description: desc, inLanguage: tag, dateModified: TODAY_ISO,
        isPartOf: { '@id': `${SITE}/#website` }, about: aboutThing('Ramadan', 'https://en.wikipedia.org/wiki/Ramadan'),
        speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.ramadan h1', '#ramLede'] } },
      { '@type': 'FAQPage', '@id': `${abs(pagePath)}#faq`, inLanguage: tag,
        mainEntity: faq.map((it) => ({ '@type': 'Question', name: it.q, acceptedAnswer: { '@type': 'Answer', text: it.a } })) },
      breadcrumbLd(crumbs),
    ] },
    data: clientData(lang, { kind: 'ramadan', defaultSect: ci.defaultSect, rl: loc, ram: RAMADAN }),
  });
}

/* ---------- Calculation methods ---------- */
const METHOD_KEYS = Object.keys(Core.METHOD_SLUG);
// Countries whose main times use a method, and countries whose Jafria times use it.
function methodUse(key) {
  const main = COUNTRIES.filter((c) => c.cities.some((ci) => ci.method === key));
  const jafria = COUNTRIES.filter((c) => (c.jafariMethod || 'Jafari') === key);
  return { main, jafria };
}
METHOD_KEYS.forEach((k) => { const u = methodUse(k); if (!u.main.length && !u.jafria.length) problems.push(`methods: ${k} is used by no country`); });
function methodFacts(lang, key) {
  const t = STRINGS[lang], g = GUIDES[lang], ctx = ctxFor(lang, 'shafii');
  const p = Core.paramsFor({ method: key }, ctx), name = Core.methodLabel(key, ctx), d = (x) => Core.decShort(x, ctx);
  const fx = p.fixedIntervals, fxIsha = fx && [fx.isha(2026, 1, 1), fx.isha(2026, 7, 1)];
  const lede = fx ? tpl(g.mLedeFixed, { method: name, fajr: Core.num(fx.fajr, ctx), isha: Core.num(fxIsha[0], ctx), summer: Core.num(fxIsha[1], ctx) })
    : p.ishaInterval > 0 ? tpl(g.mLedeMin, { method: name, fajr: d(p.fajrAngle), n: Core.num(p.ishaInterval, ctx) })
    : tpl(g.mLedeAngle, { method: name, fajr: d(p.fajrAngle), isha: d(p.ishaAngle) });
  const adj = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'].filter((k) => p.methodAdjustments[k])
    .map((k) => `${t.prayers[k]} ${p.methodAdjustments[k] > 0 ? '+' : '−'}${Core.num(Math.abs(p.methodAdjustments[k]), ctx)}`);
  const lines = [];
  if (p.maghribAngle) lines.push(tpl(t.maghribAngle, { deg: d(p.maghribAngle) }));
  if (adj.length) lines.push(tpl(g.mAdjust, { list: listJoin(lang, adj) }));
  if (key === 'MoonsightingCommittee') lines.push(g.mSeasonal);
  if (p.fixedSummer) lines.push(tpl(g.mFixed, { deg: d(p.fixedSummer.angle), fajr: Core.num(p.fixedSummer.fajr, ctx), isha: Core.num(p.fixedSummer.isha, ctx) }));
  return { name, lede, lines, p };
}
function methodPage(lang, key) {
  const t = STRINGS[lang], g = GUIDES[lang], pagePath = url.method(lang, key), f = methodFacts(lang, key), use = methodUse(key);
  const crumbs = [{ name: t.home, href: url.home(lang) }, { name: g.mNav, href: url.methods(lang) }, { name: f.name, href: pagePath }];
  const usedLinks = use.main.map((c) => ({ name: nameIn(c.name, lang), href: url.country(lang, c) }))
    .concat(use.jafria.map((c) => ({ name: `${nameIn(c.name, lang)} (${t.sects.jafria})`, href: url.country(lang, c) })));
  // Today's Fajr and Isha in the first city that uses this method, with the matching school.
  const ex = use.main[0] || use.jafria[0], exCi = use.main[0] ? ex.cities.find((ci) => ci.method === key) : ex.cities[0];
  const exSect = use.main[0] ? (exCi.defaultSect === 'jafria' ? 'shafii' : exCi.defaultSect) : 'jafria';
  const exCtx = ctxFor(lang, exSect), exLoc = locOf(exCi, lang);
  const tt = Core.timesFor(exLoc, exCtx, ...ymd(NOW, exCi.tz));
  const example = `${tpl(g.todayIn, { city: exLoc.name })}: ${t.prayers.fajr} ${Core.fmtTime(tt.fajr, exCi.tz, exCtx)} · ${t.prayers.isha} ${Core.fmtTime(tt.isha, exCi.tz, exCtx)}`;
  const body = breadcrumbs(crumbs) + '<article class="card about guide">' +
    `<h1>${esc(tpl(g.mH1, { method: f.name }))}</h1><p class="answer">${esc(f.lede)}</p>` +
    f.lines.map((l) => `<p>${esc(l)}</p>`).join('') +
    `<p class="prayer-live"><a href="${url.city(lang, exCi)}">${esc(example)}</a></p>` +
    `<h2>${esc(g.mUsedBy)}</h2>` + linkList(usedLinks) +
    `<h2>${esc(g.mNav)}</h2>` + linkList(METHOD_KEYS.filter((k) => k !== key).map((k) => ({ name: Core.methodLabel(k, ctxFor(lang, 'shafii')), href: url.method(lang, k) }))) +
    '</article>';
  const title = fitTitle(tpl(g.mTitle, { method: f.name }), lang);
  const desc = tpl(g.mDesc, { method: f.name });
  addPage({
    lang, tag: langTag(lang), title, desc, path: pagePath, alternates: cluster((l) => url.method(l, key)), indexable: true, body,
    jsonld: { '@graph': [
      { '@type': 'WebPage', '@id': abs(pagePath), url: abs(pagePath), name: title, description: desc, inLanguage: langTag(lang), dateModified: TODAY_ISO,
        isPartOf: { '@id': `${SITE}/#website` }, speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.guide h1', '.guide .answer'] } },
      breadcrumbLd(crumbs),
    ] },
    data: clientData(lang, { kind: 'method', defaultSect: 'hanafi' }),
  });
}
function methodsHub(lang) {
  const t = STRINGS[lang], g = GUIDES[lang], pagePath = url.methods(lang), ctx = ctxFor(lang, 'shafii');
  const deg = (x) => `${Core.decShort(x, ctx)}°`;
  const rows = METHOD_KEYS.map((k) => {
    const f = methodFacts(lang, k), u = methodUse(k);
    const fx = f.p.fixedIntervals;
    const fajr = fx ? tpl(g.fajrBefore, { n: Core.num(fx.fajr, ctx) }) : deg(f.p.fajrAngle);
    const isha = fx ? tpl(t.ishaMinutes, { n: `${Core.num(fx.isha(2026, 1, 1), ctx)}-${Core.num(fx.isha(2026, 7, 1), ctx)}` })
      : f.p.ishaInterval > 0 ? tpl(t.ishaMinutes, { n: Core.num(f.p.ishaInterval, ctx) }) : deg(f.p.ishaAngle);
    const used = u.main.map((c) => nameIn(c.name, lang)).concat(u.jafria.length ? [`${t.sects.jafria} (${Core.num(u.jafria.length, ctx)})`] : []);
    return `<tr><th scope="row"><a href="${url.method(lang, k)}">${esc(f.name)}</a></th><td><bdi>${esc(fajr)}</bdi></td><td><bdi>${esc(isha)}</bdi></td><td>${esc(listJoin(lang, used))}</td></tr>`;
  }).join('');
  const crumbs = [{ name: t.home, href: url.home(lang) }, { name: g.mNav, href: pagePath }];
  const body = breadcrumbs(crumbs) + '<article class="card about guide">' +
    `<h1>${esc(g.mHubH1)}</h1><p class="lede-text">${esc(g.mHubLede)}</p>` +
    `<div class="table-scroll"><table class="city-table"><thead><tr><th scope="col">${esc(t.colMethod)}</th><th scope="col">${esc(t.prayers.fajr)}</th><th scope="col">${esc(t.prayers.isha)}</th><th scope="col">${esc(g.colUsedBy)}</th></tr></thead><tbody>${rows}</tbody></table></div>` +
    `<h2>${esc(g.whyH2)}</h2><ul class="why-list">${g.why.map((w) => `<li>${esc(w)}</li>`).join('')}</ul>` +
    linkList([{ name: t.aboutLink, href: url.about(lang) }, { name: g.prayersNav, href: url.prayers(lang) }]) + '</article>';
  const title = fitTitle(g.mHubTitle, lang);
  addPage({
    lang, tag: langTag(lang), title, desc: g.mHubDesc, path: pagePath, alternates: cluster(url.methods), indexable: true, body,
    jsonld: { '@graph': [
      { '@type': 'CollectionPage', '@id': abs(pagePath), url: abs(pagePath), name: title, description: g.mHubDesc, inLanguage: langTag(lang),
        dateModified: TODAY_ISO, isPartOf: { '@id': `${SITE}/#website` } },
      breadcrumbLd(crumbs),
    ] },
    data: clientData(lang, { kind: 'methods', defaultSect: 'hanafi' }),
  });
}

/* ---------- Qibla finder ---------- */
function qiblaPage(lang) {
  const t = STRINGS[lang], g = GUIDES[lang], pagePath = url.qibla(lang), ctx = ctxFor(lang, 'hanafi');
  const rows = COUNTRIES.map((c) => {
    const ci = c.cities[0], q = Core.qibla(ci.lat, ci.lng);
    const km = Math.round(Core.distanceKm(ci.lat, ci.lng, Core.KAABA.lat, Core.KAABA.lng));
    return `<tr><th scope="row"><a href="${url.city(lang, ci)}">${esc(nameIn(ci.names, lang, c))}</a> <span class="muted">${esc(nameIn(c.name, lang))}</span></th>` +
      `<td><bdi>${esc(tpl(t.qiblaFrom, { deg: Core.decShort(Math.round(q * 10) / 10, ctx) }))}</bdi></td><td><bdi>${esc(tpl(t.km, { n: Core.numGrouped(km, ctx) }))}</bdi></td></tr>`;
  }).join('');
  const crumbs = [{ name: t.home, href: url.home(lang) }, { name: g.qbNav, href: pagePath }];
  const body = breadcrumbs(crumbs) + '<article class="card about guide">' +
    `<h1>${esc(g.qbH1)}</h1><p class="lede-text">${esc(g.qbLede)}</p>` +
    `<p><button type="button" class="btn-gold" id="qbFind">${ICON.locate}${esc(g.qbBtn)}</button></p><p class="muted" id="qbStatus" role="status"></p>` +
    '<div class="qibla-result" id="qiblaResult" hidden></div>' +
    `<p>${esc(g.qbHow)}</p>` +
    `<h2>${esc(g.qbCities)}</h2><div class="table-scroll"><table class="city-table"><thead><tr><th scope="col">${esc(t.colCity)}</th><th scope="col">${esc(g.qbColDir)}</th><th scope="col">${esc(g.qbColDist)}</th></tr></thead><tbody>${rows}</tbody></table></div>` +
    '</article>';
  const title = fitTitle(g.qbTitle, lang);
  addPage({
    lang, tag: langTag(lang), title, desc: g.qbDesc, path: pagePath, alternates: cluster(url.qibla), indexable: true, body,
    jsonld: { '@graph': [
      { '@type': 'WebPage', '@id': abs(pagePath), url: abs(pagePath), name: title, description: g.qbDesc, inLanguage: langTag(lang), dateModified: TODAY_ISO,
        isPartOf: { '@id': `${SITE}/#website` }, about: aboutThing(g.qbNav, 'https://en.wikipedia.org/wiki/Qibla') },
      breadcrumbLd(crumbs),
    ] },
    data: clientData(lang, { kind: 'qibla', defaultSect: 'hanafi' }),
  });
}

/* ---------- Mosque widget: builder page and the embeddable page ---------- */
function widgetPage(lang) {
  const t = STRINGS[lang], g = GUIDES[lang], pagePath = url.widget(lang);
  const def = DEFAULT_CITY[lang];
  const options = COUNTRIES.map((c) => `<optgroup label="${esc(nameIn(c.name, lang))}">` +
    c.cities.map((ci) => { const v = `${c.slug}/${ci.slug}`; return `<option value="${v}"${v === def ? ' selected' : ''}>${esc(nameIn(ci.names, lang, c))}</option>`; }).join('') +
    '</optgroup>').join('');
  const sects = `<option value="">${esc(t.methodAuto)}</option>` + Core.SECTS.map((k) => `<option value="${k}">${esc(t.sects[k])}</option>`).join('');
  const crumbs = [{ name: t.home, href: url.home(lang) }, { name: g.wNav, href: pagePath }];
  const body = breadcrumbs(crumbs) + '<article class="card about guide widget-builder">' +
    `<h1>${esc(g.wH1)}</h1><p class="lede-text">${esc(g.wLede)}</p>` +
    '<div class="widget-grid"><div>' +
      `<label class="field"><span>${esc(g.wCity)}</span><select id="wCity">${options}</select></label>` +
      `<label class="field"><span>${esc(t.sectLabel)}</span><select id="wSect">${sects}</select></label>` +
      `<label class="field"><span>${esc(g.wCode)}</span><textarea id="wCode" rows="6" readonly></textarea></label>` +
      `<p><button type="button" class="btn-primary" id="wCopy" data-done="${esc(g.wCopied)}">${esc(g.wCopy)}</button></p>` +
      `<p class="muted small">${esc(g.wLangNote)}</p>` +
    '</div><div>' +
      `<h2>${esc(g.wPreview)}</h2><iframe id="wFrame" title="${esc(g.wPreview)}" width="100%" height="330"></iframe>` +
    '</div></div></article>';
  const title = fitTitle(g.wTitle, lang);
  addPage({
    lang, tag: langTag(lang), title, desc: g.wDesc, path: pagePath, alternates: cluster(url.widget), indexable: true, body,
    jsonld: { '@graph': [
      { '@type': 'WebPage', '@id': abs(pagePath), url: abs(pagePath), name: title, description: g.wDesc, inLanguage: langTag(lang), dateModified: TODAY_ISO,
        isPartOf: { '@id': `${SITE}/#website` } },
      breadcrumbLd(crumbs),
    ] },
    data: clientData(lang, { kind: 'widget', defaultSect: 'hanafi', site: SITE, embedUrl: url.embed(lang), credit: g.wCredit }),
  });
}
// The page mosques embed in an <iframe>: today's times for ?c=<country>/<city>&s=<school>. Not indexed.
function embedPage(lang) {
  addPage({
    lang, tag: langTag(lang), title: `${STRINGS[lang].prayers.fajr} · ${STRINGS[lang].prayers.isha} | ${BRAND}`, desc: GUIDES[lang].wDesc,
    path: url.embed(lang), alternates: [], indexable: false, bare: true, body: `<h1 class="sr-only">${esc(STRINGS[lang].brandLocal)}</h1><div id="embed" class="embed"></div>`,
    data: clientData(lang, { kind: 'embed', defaultSect: 'hanafi', citiesUrl: ASSET.cities, searchUrl: SEARCH[lang].path }),
  });
}

/* ---------- Build ---------- */
function stopIfProblems() {
  if (!problems.length) return;
  console.error('Build stopped:\n  ' + problems.slice(0, 80).join('\n  ') + (problems.length > 80 ? `\n  ...and ${problems.length - 80} more` : ''));
  process.exit(1);
}
function write(rel, content) {
  const file = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}
['home'].concat(COUNTRIES.map((c) => c.slug)).forEach((k) => { if (!fs.existsSync(path.join(ROOT, 'src', 'og', `${k}.jpg`))) problems.push(`src/og/${k}.jpg missing: run npm run og`); });
stopIfProblems(); // data and translation mistakes stop the build before dist/ is touched
fs.rmSync(DIST, { recursive: true, force: true });

ALL_LANGS.forEach((lang) => {
  homePage(lang);
  COUNTRIES.forEach((c) => {
    countryPage(lang, c);
    c.cities.forEach((ci) => { cityPage(lang, ci); ramadanPage(lang, ci); });
  });
  nearPage(lang);
  aboutPage(lang);
  prayersHub(lang);
  GUIDE_PRAYERS.forEach((k) => prayerPage(lang, k));
  hijriPage(lang);
  methodsHub(lang);
  METHOD_KEYS.forEach((k) => methodPage(lang, k));
  qiblaPage(lang);
  widgetPage(lang);
  embedPage(lang);
});

// 404: English, not indexed.
(function () {
  const t = STRINGS.en;
  addPage({
    lang: 'en', tag: 'en', title: `${t.notFoundH1} | ${BRAND}`, desc: t.notFoundBody, path: '/404.html', file: '404.html',
    alternates: [], indexable: false,
    body: `<section class="card notfound"><h1>${esc(t.notFoundH1)}</h1><p>${esc(t.notFoundBody)}</p><p><a class="btn-primary" href="/">${esc(t.seeAll)}</a></p></section>`,
    data: clientData('en', { kind: '404', defaultSect: 'hanafi' }),
  });
})();

stopIfProblems();
write(ASSET.js.slice(1), JS);
// Share cards and logo made by scripts/og-images.js (npm run og).
fs.readdirSync(path.join(ROOT, 'src', 'og')).forEach((f) => write(`og/${f}`, fs.readFileSync(path.join(ROOT, 'src', 'og', f))));
write('logo.png', fs.readFileSync(path.join(ROOT, 'src', 'logo.png')));
write(ASSET.jsLite.slice(1), JS_LITE);
write(ASSET.cities.slice(1), CITIES_JSON);
ALL_LANGS.forEach((lang) => write(SEARCH[lang].path.slice(1), SEARCH[lang].json));
write('favicon.svg', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#0c3a2d"/><path d="M20 7a10 10 0 1 0 5 17A8 8 0 1 1 20 7z" fill="#d9ad5b"/></svg>\n');
if (CONFIG.indexNowKey) write(`${CONFIG.indexNowKey}.txt`, CONFIG.indexNowKey);

// Search and AI crawlers are all welcome: the content is public, factual and meant to be cited.
write('robots.txt', [
  'User-agent: *', 'Allow: /', '',
  ...['Googlebot', 'Bingbot', 'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended']
    .flatMap((bot) => [`User-agent: ${bot}`, 'Allow: /', '']),
  `Sitemap: ${SITE}/sitemap.xml`, '',
].join('\n'));

// One sitemap per language, listed in a sitemap index.
const sitemapFiles = [];
ALL_LANGS.forEach((lang) => {
  const lines = ['<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'];
  pages.filter((p) => p.indexable && p.lang === lang).forEach((p) => {
    const en = p.alternates.find((a) => a.lang === 'en');
    lines.push('<url>', `<loc>${abs(p.path)}</loc>`, `<lastmod>${TODAY_ISO}</lastmod>`);
    p.alternates.forEach((a) => lines.push(`<xhtml:link rel="alternate" hreflang="${a.tag}" href="${abs(a.href)}"/>`));
    if (en) lines.push(`<xhtml:link rel="alternate" hreflang="x-default" href="${abs(en.href)}"/>`);
    lines.push('</url>');
  });
  lines.push('</urlset>');
  const file = `sitemaps/${lang}.xml`;
  write(file, lines.join('\n') + '\n');
  sitemapFiles.push(file);
});
write('sitemap.xml', ['<?xml version="1.0" encoding="UTF-8"?>',
  '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sitemapFiles.map((f) => `<sitemap><loc>${SITE}/${f}</loc><lastmod>${TODAY_ISO}</lastmod></sitemap>`),
  '</sitemapindex>', ''].join('\n'));

// llms.txt: a plain summary for AI assistants and answer engines (https://llmstxt.org).
write('llms.txt', [
  `# ${BRAND_FULL}`, '',
  `> Daily prayer (namaz/salah) times for ${ALL_CITIES.length} cities in ${COUNTRIES.length} countries, in ${ALL_LANGS.length} languages, for the Hanafi, Shafi'i, Maliki, Hanbali and Jafria schools. Includes Ishraq, Chasht, Awwabin and Tahajjud (or Salat al-Layl), monthly timetables, Hijri dates and Qibla direction.`, '',
  'Times are calculated from the sun\'s position at each city\'s coordinates with the open-source adhan library. Methods and angles per country are listed on the methodology page. Local mosques may differ by a few minutes.', '',
  '## Key pages', '',
  `- [How the times are calculated](${SITE}${url.about('en')}): methods, angles, sect rules, Hijri calendar`,
  `- [All countries](${SITE}/): home page`,
  `- [Prayer times near me](${SITE}${url.near('en')})`,
  `- [The five daily prayers and Jumu‘ah](${SITE}${url.prayers('en')}): when each prayer starts and ends, rak‘ahs, school differences`,
  ...GUIDE_PRAYERS.map((k) => `  - [${STRINGS.en.prayers[k]}](${SITE}${url.prayer('en', k)})`),
  `- [Islamic date today and Hijri calendar](${SITE}${url.hijri('en')}): Umm al-Qura months and upcoming Ramadan and Eid dates`,
  `- [Prayer time calculation methods](${SITE}${url.methods('en')}): Fajr and Isha angles and safety minutes of each method, and which countries use it`,
  `- [Qibla direction](${SITE}${url.qibla('en')}): Qibla bearing and distance from your location and from each country's main city`,
  `- Ramadan timetables: ${SITE}/{country}/{city}/ramadan/ (sehri and iftar for every day of Ramadan, every city)`,
  `- [Free prayer times widget for mosque websites](${SITE}${url.widget('en')})`, '',
  '## Countries', '',
  ...COUNTRIES.map((c) => `- [${c.name.en}](${SITE}${url.country('en', c)}): ${c.cities.length} cities, ${Core.METHOD_EN[c.method]} method, default school ${c.defaultSect}`), '',
  '## URL patterns', '',
  `- City: ${SITE}/{country}/{city}/ (English), ${SITE}/{lang}/{country}/{city}/ (${ALL_LANGS.filter((l) => l !== 'en').join(', ')})`,
  `- Sitemap: ${SITE}/sitemap.xml`, '',
].join('\n'));

// Apache / LiteSpeed (Hostinger, cPanel): 404 page, compression and long caching for hashed assets.
// One address per page: http and the other www form both redirect (301) to siteUrl.
const HOST = new URL(SITE).host;
const OTHER_HOST = HOST.startsWith('www.') ? HOST.slice(4) : `www.${HOST}`;
// Security policy. Scripts only from this site, plus the one inline font loader (by hash); JSON data
// blocks are never executed. Styles are inline (<style>) and from Google Fonts; the only frame is the
// Google Maps mosque embed; nothing may frame this site.
const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-hashes' 'sha256-${crypto.createHash('sha256').update(FONT_ONLOAD).digest('base64')}'`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src https://fonts.gstatic.com",
  "img-src 'self' data:",
  "connect-src 'self' https://api.web3forms.com",
  "frame-src 'self' https://maps.google.com https://www.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://api.web3forms.com",
  "frame-ancestors 'self'",
  'upgrade-insecure-requests',
].join('; ');
// The embed pages (/embed/, /ur/embed/…) may be shown inside any website's <iframe>.
ALL_LANGS.forEach((lang) => write(path.join(url.embed(lang).slice(1), '.htaccess'), [
  '<IfModule mod_headers.c>',
  `  Header always set Content-Security-Policy "${CSP.replace("frame-ancestors 'self'", 'frame-ancestors *')}"`,
  '  Header always unset X-Frame-Options',
  '</IfModule>',
  '',
].join('\n')));
write('.htaccess', [
  'Options -Indexes',
  '<IfModule mod_rewrite.c>',
  '  RewriteEngine On',
  '  RewriteCond %{HTTPS} off [OR]',
  `  RewriteCond %{HTTP_HOST} ^${OTHER_HOST.replace(/\./g, '\\.')}$ [NC]`,
  `  RewriteRule ^ ${SITE}%{REQUEST_URI} [L,R=301]`,
  // Never serve archives, backups, env or log files, even if one is left in public_html by mistake.
  '  RewriteRule \\.(zip|tar|gz|rar|7z|bak|old|sql|env|log|ini|sh|md)$ - [F,L,NC]',
  '  RewriteRule (^|/)\\.(?!well-known/) - [F,L]',
  '</IfModule>',
  'ErrorDocument 404 /404.html',
  'AddDefaultCharset utf-8',
  'AddType application/json .json',
  'AddType text/plain .txt',
  '<IfModule mod_deflate.c>',
  '  AddOutputFilterByType DEFLATE text/html text/css text/plain text/xml application/javascript application/json application/xml image/svg+xml',
  '</IfModule>',
  '<IfModule mod_headers.c>',
  '  <FilesMatch "\\.[0-9a-f]{10}\\.(css|js|json)$">',
  '    Header set Cache-Control "public, max-age=31536000, immutable"',
  '  </FilesMatch>',
  '  <FilesMatch "\\.(html|xml|txt)$">',
  '    Header set Cache-Control "public, max-age=3600"',
  '  </FilesMatch>',
  '  Header always set X-Content-Type-Options "nosniff"',
  '  Header always set Referrer-Policy "strict-origin-when-cross-origin"',
  `  Header always set Content-Security-Policy "${CSP}"`,
  '  Header always set X-Frame-Options "SAMEORIGIN"',
  '  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"',
  // Location is used by "near me" on this site only; nothing else is allowed.
  '  Header always set Permissions-Policy "geolocation=(self), camera=(), microphone=(), payment=(), usb=()"',
  '  Header always set Cross-Origin-Opener-Policy "same-origin"',
  '</IfModule>',
  '',
].join('\n'));

const indexable = pages.filter((p) => p.indexable).length;
console.log(`Built ${pages.length} pages (${indexable} indexable) for ${ALL_CITIES.length} cities in ${COUNTRIES.length} countries and ${ALL_LANGS.length} languages.`);
if (/example\.com/.test(SITE)) console.warn('Warning: siteUrl in site.config.js is still example.com. Set your real domain before deploying.');
