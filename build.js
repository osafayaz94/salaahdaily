/*
 * Static site generator. Run `node build.js` (or `npm run build`); output goes to dist/.
 *
 * Every page exists in every site language. English has no prefix and is the x-default:
 *   /                     home (continents, country cards)      /ur/                  Urdu home
 *   /pakistan/            country (today's times, every city)    /ur/pakistan/
 *   /pakistan/lahore/     city                                   /ur/pakistan/lahore/
 *   /near-me/             geolocation page                       /ur/near-me/
 *   /about/               how the times are calculated           /ur/about/
 *   /contact/ /privacy/ /terms/   English only, linked from every language's footer
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
const RAW = require('./src/data').concat(require('./src/data-mea')).concat(require('./src/data-europe')).concat(require('./src/data-asia')).concat(require('./src/data-africa')).concat(require('./src/data-more'));
const NAMES = require('./src/names');
const { GUIDES, WIKI } = require('./src/guides');
const LEGAL = require('./src/pages-legal');
// German, Portuguese, Italian, Japanese, Korean: English first, the translations on top (a gap shows English).
(function addLanguages() {
  const { MORE } = require('./src/i18n-more');
  const copy = (x) => JSON.parse(JSON.stringify(x));
  const over = (base, add) => {
    Object.keys(add).forEach((k) => {
      const v = add[k];
      if (v && typeof v === 'object' && !Array.isArray(v) && base[k] && typeof base[k] === 'object') over(base[k], v); else base[k] = v;
    });
    return base;
  };
  Object.keys(MORE).forEach((l) => {
    STRINGS[l] = over(copy(STRINGS.en), MORE[l].STRINGS);
    GUIDES[l] = over(copy(GUIDES.en), MORE[l].GUIDES);
    COUNTRY_FAQ[l] = MORE[l].COUNTRY_FAQ.slice();
  });
})();
// Hijri calendar converter and grid (src/strings-hijri.js), in every language.
const { HC } = require('./src/strings-hijri');
const { NATIONAL } = require('./src/hijri-national');
const Moon = require('./src/moon');
const { MOON } = require('./src/strings-moon');
Object.keys(LANGS).forEach((l) => { if (!MOON[l]) problems.push(`strings-moon.js: no strings for ${l}`); });
const { AUTH, AT, authLine } = require('./src/hijri-authority');
Object.keys(LANGS).forEach((l) => { if (!AT[l]) problems.push(`hijri-authority.js: no strings for ${l}`); });
// Countries with a national calendar (src/hijri-national.js: Diyanet's published one, or recorded moon-sighting
// announcements) use it while their pages are built, and the browser gets the same table.
// After the newest announced month, months are estimated: Umm al-Qura month starts moved by the country's last
// difference from it (at most one day), each month kept to 29 or 30 days. One month is added before the first row.
const ESTIMATE_MONTHS = 18;
function nationalCalendar(slug) {
  const n = NATIONAL[slug];
  if (!n) return null;
  Core.useCalendar(null);
  const dn = (r) => Date.UTC(r[2], r[3] - 1, r[4]) / 864e5;
  const uq = (hy, hm) => { const g = Core.hijriToGregorian(hy, hm, 1); return Date.UTC(g.y, g.m - 1, g.d) / 864e5; };
  const step = (hy, hm, k) => { const i = hy * 12 + hm - 1 + k; return [Math.floor(i / 12), (i % 12) + 1]; };
  const row = (hy, hm, d) => { const g = new Date(d * 864e5); return [hy, hm, g.getUTCFullYear(), g.getUTCMonth() + 1, g.getUTCDate()]; };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const rows = n.rows.slice();
  const first = rows[0], [py, pm] = step(first[0], first[1], -1), off0 = clamp(dn(first) - uq(first[0], first[1]), -1, 1);
  rows.unshift(row(py, pm, clamp(uq(py, pm) + off0, dn(first) - 30, dn(first) - 29)));
  if (n.open) {
    const last = rows[rows.length - 1], off = clamp(dn(last) - uq(last[0], last[1]), -1, 1);
    let prev = dn(last);
    for (let k = 1; k <= ESTIMATE_MONTHS; k++) {
      const [hy, hm] = step(last[0], last[1], k), d = clamp(uq(hy, hm) + off, prev + 29, prev + 30);
      rows.push(row(hy, hm, d)); prev = d;
    }
  }
  return rows;
}
const NATIONAL_CAL = {};
Object.keys(NATIONAL).forEach((c) => { NATIONAL_CAL[c] = nationalCalendar(c); });
let CURRENT_CAL = null;
const withCalendar = (rows, fn) => { CURRENT_CAL = rows; Core.useCalendar(rows); try { fn(); } finally { CURRENT_CAL = null; Core.useCalendar(null); } };
Object.keys(LANGS).forEach((l) => { if (!HC[l]) problems.push(`strings-hijri.js: no strings for ${l}`); });
// City page questions per prayer (src/strings-faq.js), in every language.
(function () {
  const { FAQ2 } = require('./src/strings-faq');
  Object.keys(LANGS).forEach((l) => { if (!FAQ2[l]) throw new Error(`strings-faq.js: no strings for ${l}`); Object.assign(STRINGS[l], FAQ2[l]); });
})();
// Strings added later (corrections, home page Ramadan section), in every language.
(function () {
  const { EXTRA } = require('./src/guides-extra');
  Object.keys(LANGS).forEach((l) => { if (!EXTRA[l]) throw new Error(`guides-extra.js: no strings for ${l}`); Object.assign(GUIDES[l], EXTRA[l]); });
})();
const GUIDE_PRAYERS = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha', 'jumuah'];
const { NAMES: ALLAH_NAMES, LEARN } = require('./src/learn');
fs.readdirSync(path.join(__dirname, 'src/learn-i18n')).forEach((f) => { LEARN[f.replace(/\.js$/, '')] = require('./src/learn-i18n/' + f); });
const NAFL_PAGES = ['tahajjud', 'ishraq', 'chasht'];
// Traditional recitation under each of the 99 Names (src/learn-wazifa.js), where a language has it.
const WAZIFA = require('./src/learn-wazifa');
// Names of the Prophet ﷺ (src/prophet-names.js, translations in src/prophet-names-i18n/).
const { NAMES: PROPHET_NAMES, PN } = require('./src/prophet-names');
if (fs.existsSync(path.join(__dirname, 'src/prophet-names-i18n'))) fs.readdirSync(path.join(__dirname, 'src/prophet-names-i18n')).forEach((f) => { PN[f.replace(/.js$/, '')] = require('./src/prophet-names-i18n/' + f); });
// Learn pages (src/learn.js, translations in src/learn-i18n/): only languages that have them get the pages and tabs.
// Quran and hadith under each prayer time (src/prayer-refs.js, translations in src/prayer-refs-i18n/), fetched when opened.
const TABS_MORE = require('./src/tabs-more');
const { REFS, REF_KEYS } = require('./src/prayer-refs');
if (fs.existsSync(path.join(__dirname, 'src/prayer-refs-i18n'))) fs.readdirSync(path.join(__dirname, 'src/prayer-refs-i18n')).forEach((f) => { REFS[f.replace(/\.js$/, '')] = require('./src/prayer-refs-i18n/' + f); });
// More Fajr hadith and the adhkar after each prayer (src/prayer-refs-more/), one file per language.
// Numbers pick from the Fajr adhkar (the first four are said after every prayer); names from daily/<lang>.js.
const AZKAR_OF = {
  fajr: { s: [0, 1, 2, 3, 'ainni', 'muawwidhat', 4, 5, 6, 7, 8, 9, 10, 11], j: [0, 1, 2] },
  dhuhr: { s: [0, 1, 2, 3, 'ainni', 'muawwidhat', 'zubayr'], j: [0, 2] },
  asr: { s: [0, 1, 2, 3, 'ainni', 'muawwidhat', 'sunset', 'amsayna', 11], j: [0, 2] },
  maghrib: { s: [0, 1, 2, 3, 'ainni', 'muawwidhat', 'amsayna', 'bikaM', 'kalimat', 9, 10], j: [0, 2] },
  isha: { s: [0, 1, 2, 3, 'ainni', 'muawwidhat', 'kursiBed', 'baqarah', 'quls', 'bismika', 'mulk', 'tasbihBed'], j: [0, 1, 2] },
};
Object.keys(REFS).forEach((l) => {
  const f = path.join(__dirname, 'src/prayer-refs-more', l + '.js');
  if (!fs.existsSync(f)) return;
  const m = require(f), daily = require(`./src/prayer-refs-more/daily/${l}`), fj = REFS[l].items.fajr;
  REFS[l].azkarH = m.azkarH;
  ['time', 'virtue', 'prayer'].forEach((k) => { fj[k] = { ...fj[k], s: fj[k].s.concat(m.add[k]) }; });
  Object.entries(AZKAR_OF).forEach(([key, pick]) => {
    REFS[l].items[key].azkar = {
      s: pick.s.map((x) => typeof x === 'number' ? m.azkar.s[x] : daily[x]),
      j: pick.j.map((x) => m.azkar.j[x]),
    };
  });
});
Object.keys(LANGS).forEach((l) => { STRINGS[l].refLabel = REFS[l] ? REFS[l].label : ''; });
// Jafria's night prayer is shown as "Tahajjud - Witr (Salat al-Layl)", under Ishraq and Chasht (src/layl-names.js).
const LAYL = require('./src/layl-names');
Object.keys(LANGS).forEach((l) => { if (LAYL[l]) { STRINGS[l].nafl = { ...STRINGS[l].nafl, layl: LAYL[l].layl }; STRINGS[l].laylH2 = LAYL[l].laylH2; } });
const REF_LINKS = require('./src/ref-links');
const AZKAR_KEYS = REF_KEYS.filter((k) => REFS.en.items[k].azkar);
Object.keys(LANGS).forEach((l) => { STRINGS[l].refLinks = REF_LINKS[l] && { ...REF_LINKS[l], az: AZKAR_KEYS }; });

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');
const SITE = CONFIG.siteUrl.replace(/\/+$/, '');
const BRAND = CONFIG.siteName;                         // SalaahDaily (ends every title)
const BRAND_AR = CONFIG.siteNameAr;                    // أوقات الصلاة (Arabic tagline)
const BRAND_FULL = `${BRAND} · ${BRAND_AR}`;           // SalaahDaily · أوقات الصلاة
// Other names the same site has used or is searched by; schema lists them so engines join them to one entity.
const BRAND_ALT = [BRAND_AR, 'Awqat as-Salah', 'Salaah Daily'];
const LATIN = new Set(['en', 'id', 'ms', 'es', 'fr', 'tr', 'ha', 'de', 'pt', 'it']);
const NOW = new Date();
const TODAY_ISO = NOW.toISOString().slice(0, 10);
const esc = Core.esc;
const tpl = Core.tpl;
const problems = [];
// Every translation must have the English shape: same keys, same list lengths (99 meanings, the same references).
{
  const shape = (o) => Array.isArray(o) ? `[${o.length}${o.length && typeof o[0] === 'object' ? ':' + shape(o[0]) : ''}]`
    : o && typeof o === 'object' ? `{${Object.keys(o).sort().map((k) => k + ':' + shape(o[k])).join(',')}}` : typeof o;
  const en = shape(LEARN.en);
  Object.keys(LANGS).forEach((l) => { if (!LEARN[l]) problems.push(`learn: no strings for ${l}`); else if (shape(LEARN[l]) !== en) problems.push(`learn-i18n/${l}.js: keys or list lengths differ from English`); });
  Object.keys(LANGS).forEach((l) => { if (!REF_LINKS[l]) problems.push(`ref-links.js: no labels for ${l}`); });
  Object.keys(REFS).forEach((l) => Object.entries(REFS[l].items).forEach(([k, it]) => {
    if (it.azkar && it.azkar.s.concat(it.azkar.j).some((x) => !Array.isArray(x))) problems.push(`prayer-refs-more/daily/${l}.js: an adhkar for ${k} is missing`);
  }));
  Object.keys(LANGS).forEach((l) => { if (!TABS_MORE[l] || ['hijri', 'ramadan', 'sehri'].some((k) => !TABS_MORE[l][k])) problems.push(`tabs-more.js: missing tabs for ${l}`); });
  Object.keys(PN).forEach((l) => { if (shape(PN[l]) !== shape(PN.en)) problems.push(`prophet-names-i18n/${l}.js: keys or list lengths differ from English`); });
  if (PN.en.meanings.length !== PROPHET_NAMES.length) problems.push('prophet-names.js: meanings and names differ in length');
  if (LEARN.en.names.meanings.length !== ALLAH_NAMES.length) problems.push('learn.js: meanings and names differ in length');
  const refEn = shape(REFS.en);
  Object.keys(REFS).forEach((l) => { if (shape(REFS[l]) !== refEn) problems.push(`prayer-refs-i18n/${l}.js: keys or list lengths differ from English`); });
}
const CONTINENTS = ['asia', 'middleEast', 'africa', 'europe', 'northAmerica', 'southAmerica', 'oceania'];
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
const FALLBACK = { ps: ['fa'] };
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
const TOWNS2 = require('./src/towns-2');
[require('./src/towns'), TOWNS2, require('./src/towns-3'), require('./src/towns-4')].forEach((TOWNS) => Object.keys(TOWNS).filter((k) => k === k.toLowerCase()).forEach((slug) => {
  const country = RAW.find((c) => c.slug === slug);
  if (!country) { problems.push(`towns.js: unknown country ${slug}`); return; }
  TOWNS[slug].forEach((r) => {
    const existing = country.regions.find((x) => x.name.en === r.name.en);
    if (existing) existing.cities.push(...r.cities);
    else country.regions.push(r);
  });
}));

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
Object.entries(TOWNS2.ALIASES).forEach(([key, alt]) => {
  const ci = ALL_CITIES.find((x) => `${x.country.slug}/${x.names.en}` === key);
  if (!ci) { problems.push(`towns-2.js: no city ${key} for its aliases`); return; }
  ci.names.alt = [ci.names.alt, alt].filter(Boolean).join(' ');
  if (TOWNS2.EN_SHOWN[key]) ci.shownEn = TOWNS2.EN_SHOWN[key];
});
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
  country: (lang, c) => `${pre(placeLang(lang, c))}${c.slug}/`,
  city: (lang, ci) => `${pre(placeLang(lang, ci.country))}${ci.country.slug}/${ci.slug}/`,
  near: (lang) => `${pre(lang)}near-me/`,
  about: (lang) => `${pre(lang)}about/`,
  prayers: (lang) => `${pre(lang)}prayers/`,
  prayer: (lang, key) => `${pre(lang)}prayers/${key}/`,
  hijri: (lang) => `${pre(lang)}hijri-calendar/`,
  ramadan: (lang, ci) => `${pre(placeLang(lang, ci.country))}${ci.country.slug}/${ci.slug}/ramadan/`,
  methods: (lang) => `${pre(lang)}methods/`,
  method: (lang, key) => `${pre(lang)}methods/${Core.METHOD_SLUG[key]}/`,
  qibla: (lang) => `${pre(lang)}qibla/`,
  mosques: (lang) => `${pre(lang)}mosques/`,
  event: (lang, slug) => `${pre(lang)}events/${slug}/`,
  widget: (lang) => `${pre(lang)}mosque-widget/`,
  embed: (lang) => `${pre(lang)}embed/`,
  contact: () => '/contact/',
  privacy: () => '/privacy/',
  terms: () => '/terms/',
};
// The Contact page exists once there is a way to reach us: the Web3Forms key and/or a public address.
const HAS_CONTACT = Boolean(CONFIG.web3formsKey || CONFIG.contactEmail);
const abs = (u) => SITE + u;
// A country's own languages get a region tag (ur-PK, es-MX); others the plain language. Dari is always fa-AF.
function langTag(lang, country) {
  if (lang === 'en') return 'en';
  return country && country.langs.includes(lang) ? `${lang}-${country.cc}` : lang;
}
function ogLocale(tag, lang) { return tag.includes('-') ? tag.replace('-', '_') : LANGS[lang].og; }
const cluster = (fn, country) => ALL_LANGS.map((l) => ({ lang: l, tag: langTag(l, country), href: fn(l) }));
// Index scope for the templated city and Ramadan pages: English plus the country's own languages.
// Other language copies are still built for visitors, but are noindex and left out of hreflang and the sitemaps.
// Communities that search in another language (Search Console, Oct 2026): their city pages are indexed too.
// Arabic in Western Europe (Maghreb and Syrian communities), Turkish in France, Persian in Iraq (pilgrims to
// Karbala, Najaf and Samarra), Bengali and Urdu in the Gulf (workers from Bangladesh and Pakistan).
const GULF_LANGS = ['bn', 'ur'];
const INDEX_ALSO = { france: ['ar', 'tr'], spain: ['ar'], italy: ['ar'], germany: ['ar'], netherlands: ['ar'], belgium: ['ar'], iraq: ['fa'],
  'saudi-arabia': GULF_LANGS, uae: GULF_LANGS, qatar: GULF_LANGS, kuwait: GULF_LANGS, bahrain: GULF_LANGS, oman: GULF_LANGS };
// Languages per country (Oct 2026): outside Europe, the USA, Canada and Russia, a country's city and country pages
// are built only in up to five of the site's languages that people there use. Links to any other language
// fall back to the English page. Europe, the USA, Canada and Russia keep every language.
const KEEP_ALL = (c) => c.continent === 'europe' || ['usa', 'canada', 'russia'].includes(c.slug);
const GULF5 = ['ar', 'en', 'ur', 'hi', 'bn'], ARAB = ['ar', 'en', 'fr'], LATAM = ['es', 'en', 'pt'];
const TOP_LANGS = {
  egypt: ['ar', 'en', 'fr', 'de', 'it'],
  'saudi-arabia': GULF5, uae: GULF5, qatar: GULF5, kuwait: GULF5, bahrain: GULF5, oman: GULF5,
  pakistan: ['ur', 'en', 'ps', 'ar', 'fa'], india: ['hi', 'en', 'bn', 'ar'], bangladesh: ['bn', 'en', 'ar', 'ur', 'hi'],
  afghanistan: ['fa', 'ps', 'en', 'ur', 'ar'], iran: ['fa', 'en', 'ar', 'tr', 'ur'], maldives: ['en', 'ar'],
  indonesia: ['id', 'en', 'ms', 'ar'], malaysia: ['ms', 'en', 'id', 'ar'], brunei: ['ms', 'en', 'id', 'ar'], singapore: ['en', 'ms', 'id', 'ar', 'hi'],
  turkey: ['tr', 'en', 'ar', 'de', 'fa'], cyprus: ['tr', 'en', 'ar'],
  iraq: ['ar', 'en', 'fa', 'tr', 'ur'], syria: ['ar', 'en', 'fr', 'tr'], lebanon: ARAB, jordan: ['ar', 'en'], palestine: ['ar', 'en'],
  israel: ['ar', 'en'], yemen: ['ar', 'en'],
  morocco: ['ar', 'fr', 'en', 'es'], algeria: ARAB, tunisia: ['ar', 'fr', 'en', 'it', 'de'], libya: ['ar', 'en', 'it'],
  mauritania: ['ar', 'fr', 'en'], sudan: ['ar', 'en'], somalia: ['ar', 'en'], djibouti: ['fr', 'ar', 'en'], comoros: ['fr', 'ar', 'en'],
  nigeria: ['en', 'ha', 'ar'], niger: ['fr', 'ha', 'ar', 'en'], ghana: ['en', 'ha', 'ar'], chad: ['fr', 'ar', 'ha', 'en'],
  cameroon: ['fr', 'en', 'ha', 'ar'],
  'south-africa': ['en', 'ar', 'ur', 'hi'], mauritius: ['en', 'fr', 'hi', 'ur', 'ar'], kenya: ['en', 'ar', 'hi'], tanzania: ['en', 'ar', 'hi'],
  ethiopia: ['en', 'ar'], eritrea: ['ar', 'en'],
  japan: ['ja', 'en', 'id', 'ur', 'bn'], 'south-korea': ['ko', 'en', 'id', 'ur', 'bn'], 'north-korea': ['ko', 'en'],
  china: ['en', 'ar', 'ur'], 'sri-lanka': ['en', 'ar', 'hi'], nepal: ['hi', 'en', 'ur'], bhutan: ['en', 'hi'], myanmar: ['en', 'bn', 'ar'],
  thailand: ['en', 'ms', 'ar'], philippines: ['en', 'ar', 'id'], kazakhstan: ['en', 'tr', 'ar'], uzbekistan: ['en', 'tr', 'fa', 'ar'],
  tajikistan: ['fa', 'en', 'ar'], kyrgyzstan: ['en', 'tr', 'ar'], turkmenistan: ['tr', 'en', 'fa', 'ar'],
  australia: ['en', 'ar', 'ur', 'tr', 'id'], 'new-zealand': ['en', 'ar', 'ur', 'hi'], fiji: ['en', 'hi', 'ur'],
  brazil: ['pt', 'en', 'es', 'ar'], 'trinidad-and-tobago': ['en', 'hi', 'ur'], guyana: ['en', 'hi', 'ur'], suriname: ['en', 'id', 'hi'],
};
const DEFAULT_EXTRA = { africa: ['ar', 'fr'], asia: ['ar', 'ur'], middleEast: ['ar'], northAmerica: ['es', 'ar'], southAmerica: LATAM.concat('ar'), oceania: ['ar', 'ur', 'id'] };
const LANGS_OF = new Map(COUNTRIES.map((c) => [c.slug, KEEP_ALL(c) ? null
  : Array.from(new Set(TOP_LANGS[c.slug] || ['en'].concat(c.langs, DEFAULT_EXTRA[c.continent] || []))).filter((l) => LANGS[l]).slice(0, 5)]));
Object.keys(TOP_LANGS).forEach((s) => { if (!LANGS_OF.has(s)) throw new Error(`TOP_LANGS: no country ${s}`); });
LANGS_OF.forEach((ls, s) => { if (ls && !ls.includes('en')) ls.push('en'); });
// Is this country's page built in this language?
function built(lang, c) { const ls = LANGS_OF.get(c.slug); return !ls || ls.includes(lang); }
const placeLang = (lang, c) => (built(lang, c) ? lang : 'en');
const inScope = (lang, country) => (KEEP_ALL(country) ? lang === 'en' || country.langs.includes(lang) || (INDEX_ALSO[country.slug] || []).includes(lang) : built(lang, country));
const scopedCluster = (fn, country) => cluster(fn, country).filter((a) => inScope(a.lang, country));

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
// Pages that never calculate times (about, contact, privacy, terms, 404) skip the adhan library.
const JS_LITE = [minifyJs(read('src/core.js')), minifyJs(read('src/client.js'))].join('\n;\n');
// The crescent prediction, only on the Hijri calendar page.
const JS_MOON = minifyJs(read('src/moon.js'));
const CITIES_JSON = JSON.stringify({
  countries: Object.fromEntries(COUNTRIES.map((c) => [c.slug, {
    tz: c.tz, method: c.method, jafariMethod: c.jafariMethod, defaultSect: c.defaultSect, extraCalendar: c.extraCalendar,
    l: LANGS_OF.get(c.slug) || undefined,
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
  moon: `/assets/moon.${shortHash(JS_MOON)}.js`,
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
const CLIENT_KEYS = ['refLabel', 'refLinks', 'qAt', 'aAt', 'qLeft', 'aLeft', 'sects', 'prayers', 'sectLabel', 'nextIn', 'tomorrow', 'localTime', 'next', 'now', 'methodLine',
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
  return Object.assign(CURRENT_CAL ? { cal: CURRENT_CAL } : {}, {
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

// Fonts are served from this site (src/fonts/, downloaded from Google Fonts, SIL Open Font License):
// no third-party connection before the first paint. Each page inlines the @font-face rules it needs and
// preloads the Latin face; font-display: optional means a font that is late is used from the next page on.
const FONT_DATA = JSON.parse(read('src/fonts/fonts.json'));
const FONT_FILES = {};
Object.values(FONT_DATA).flat().forEach((f) => {
  const buf = fs.readFileSync(path.join(ROOT, 'src', 'fonts', f.file));
  FONT_FILES[f.file] = { buf, url: `/assets/fonts/${f.file.replace(/\.woff2$/, '')}.${shortHash(buf)}.woff2` };
});
// Which downloaded family each language's script needs (Latin text uses Manrope everywhere).
const LANG_FONT = { ur: 'nastaliq', hi: 'devanagari', bn: 'bengali', fa: 'vazirmatn', ps: 'notoarabic', ar: 'notoarabic' };
Object.keys(LANGS).forEach((l) => { if (LANGS[l].gfont && !LANG_FONT[l]) problems.push(`fonts: no self-hosted font for ${l}`); });
const fontFace = (f) => `@font-face{font-family:'${f.family}';font-style:normal;font-weight:${f.weight};font-display:optional;` +
  `src:url(${FONT_FILES[f.file].url}) format('woff2')${f.range ? `;unicode-range:${f.range}` : ''}}`;
function fontLinks(lang) {
  const sets = ['manrope', 'amiri'].concat(LANG_FONT[lang] ? [LANG_FONT[lang]] : []);
  const latin = FONT_DATA.manrope.find((f) => f.file === 'manrope-latin.woff2');
  return `<link rel="preload" href="${FONT_FILES[latin.file].url}" as="font" type="font/woff2" crossorigin>` +
    `<style>${sets.map((k) => FONT_DATA[k].map(fontFace).join('')).join('')}</style>`;
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

// Footer: Learn on the left, languages on the right (countries are listed on the home page).
function footer(lang, kind) {
  const t = STRINGS[lang], lb = LEGAL.LABELS[lang];
  const enLink = (href, name) => `<a href="${href}"${lang === 'en' ? '' : ' hreflang="en"'}>${esc(name)}</a>`;
  const siteLinks = [`<a href="${url.about(lang)}">${esc(t.aboutLink)}</a>`]
    .concat(HAS_CONTACT ? [enLink(url.contact(), lb[0])] : [], [enLink(url.privacy(), lb[1]), enLink(url.terms(), lb[2])]);
  const langs = ALL_LANGS.map((l) => `<li><a href="${pre(l)}" hreflang="${langTag(l)}" lang="${langTag(l)}">${esc(LANGS[l].name)}</a></li>`).join('');
  return '<footer class="site-footer"><div class="wrap">' +
    '<div class="footer-nav">' +
      `<nav aria-labelledby="fnLearn"><h2 id="fnLearn">${esc(GUIDES[lang].learnNav)}</h2><ul>` +
        `<li><a href="${url.prayers(lang)}">${esc(GUIDES[lang].prayersNav)}</a></li>` +
        GUIDE_PRAYERS.map((k) => `<li><a href="${url.prayer(lang, k)}">${esc(t.prayers[k])}</a></li>`).join('') +
        `<li><a href="${url.hijri(lang)}">${esc(GUIDES[lang].hijriNav)}</a></li>` +
        `<li><a href="${url.qibla(lang)}">${esc(GUIDES[lang].qbNav)}</a></li>` +
        `<li><a href="${url.mosques(lang)}">${esc(LM_UI[lang].nav)}</a></li>` +
        `<li><a href="${url.methods(lang)}">${esc(GUIDES[lang].mNav)}</a></li>` +
        `<li><a href="${url.widget(lang)}">${esc(GUIDES[lang].wNav)}</a></li>` +
        (LEARN[lang] ? [['evidence', learnUrl.evidence], ['wudu', learnUrl.wudu], ['rakahs', learnUrl.rakahs], ['night', learnUrl.night], ['names', learnUrl.names]]
          .map(([k, fn]) => `<li><a href="${fn(lang)}">${esc(LEARN[lang].tabs[k])}</a></li>`).join('') : '') +
        (PN[lang] ? `<li><a href="${learnUrl.prophet(lang)}">${esc(PN[lang].tab)}</a></li>` : '') +
        `<li><a href="${url.about(lang)}">${esc(t.aboutLink)}</a></li></ul></nav>` +
      `<nav aria-labelledby="fnLangs"><h2 id="fnLangs">${esc(t.languagesNav)}</h2><ul>${langs}</ul></nav>` +
    '</div>' +
    (kind === 'contact' ? '' : suggestForm(lang)) +
    `<p>${esc(t.footer1)} <a href="${url.about(lang)}">${esc(t.aboutLink)}</a></p><p>${esc(t.footer2)}</p>` +
    `<p class="site-links">${siteLinks.join(' · ')}</p>` +
    `<p class="muted">© ${NOW.getUTCFullYear()} ${esc(BRAND)} · <span lang="ar" dir="rtl">${esc(BRAND_AR)}</span></p>` +
    '</div></footer>';
}

// Suggestion form: posts to Web3Forms, which emails the site owner (their address never appears here).
// botcheck is a honeypot that people never see; bots that fill it are dropped.
function suggestForm(lang, o = {}) {
  if (!CONFIG.web3formsKey) return '';
  const g = GUIDES[lang];
  return `<form class="suggest" data-suggest action="https://api.web3forms.com/submit" method="post" aria-labelledby="sgH">` +
    `<h2 id="sgH">${esc(o.heading || g.sgH)}</h2>` +
    `<input type="hidden" name="access_key" value="${esc(CONFIG.web3formsKey)}">` +
    `<input type="hidden" name="subject" value="${o.subject || `SalaahDaily suggestion (${lang})`}">` +
    `<input type="hidden" name="from_name" value="SalaahDaily">` +
    `<input type="checkbox" name="botcheck" class="sr-only" tabindex="-1" autocomplete="off" aria-hidden="true">` +
    `<label for="sgMsg">${esc(o.label || g.sgLabel)}</label><textarea id="sgMsg" name="message" rows="${o.rows || 3}" maxlength="2000" required></textarea>` +
    `<label for="sgMail">${esc(g.sgEmail)}</label><input id="sgMail" name="email" type="email" maxlength="120" autocomplete="email">` +
    `<button type="submit" class="btn-primary">${esc(o.send || g.sgSend)}</button><p class="sg-status" role="status" data-ok="${esc(g.sgThanks)}" data-err="${esc(g.sgError)}"></p></form>`;
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
  description: `Free daily prayer times for ${ALL_CITIES.length.toLocaleString('en')} cities in ${COUNTRIES.length} countries, in ${ALL_LANGS.length} languages, for the Hanafi, Shafi'i, Maliki, Hanbali and Jafria schools, calculated from each city's coordinates, with official timetables matched for many countries.`,
  ...(HAS_CONTACT ? { contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', url: `${SITE}/contact/`, ...(CONFIG.contactEmail ? { email: CONFIG.contactEmail } : {}), availableLanguage: 'en' } } : {}),
};
const WEBSITE = (lang) => ({ '@type': 'WebSite', '@id': `${SITE}/#website`, name: BRAND, alternateName: BRAND_ALT, url: `${SITE}/`, publisher: { '@id': `${SITE}/#org` }, inLanguage: ALL_LANGS.map((l) => langTag(l)) });

function monthCard(lang, month, key) {
  const t = STRINGS[lang];
  return '<section class="card month-card" aria-labelledby="monthTitle"><div class="month-head">' +
    `<div><h2 id="monthTitle">${esc(month.title)}</h2><p class="muted" id="monthSub">${esc(month.sub)}</p></div>` +
    '<div class="month-nav">' +
      `<button type="button" class="icon-btn" id="prevMonth" aria-label="${esc(t.prevMonth)}"><span class="flip" aria-hidden="true">‹</span></button>` +
      `<button type="button" class="btn-small" id="thisMonth">${esc(t.todayBtn)}</button>` +
      `<button type="button" class="icon-btn" id="nextMonth" aria-label="${esc(t.nextMonth)}"><span class="flip" aria-hidden="true">›</span></button>` +
      `<button type="button" class="btn-small" id="printBtn">${esc(t.print)}</button>` +
    '</div></div>' +
    `<div class="table-scroll"><table class="month-table" id="monthTable"${key ? ` data-k="${esc(key)}"` : ''}>${month.table}</table></div></section>`;
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
// Regional wording: English by country group (i18n.js), other languages in src/variants.js.
const { VARIANTS, LOCAL } = require('./src/variants');
// English pages: the local language of a country (or region) the site has no pages in.
const localFor = (ci) => LOCAL[`${ci.country.slug}/${ci.region.names.en}`] || LOCAL[ci.country.slug] || null;
function variantOf(lang, c) {
  const groups = lang === 'en' ? EN_VARIANTS : VARIANTS[lang];
  if (!groups) return null;
  return Object.values(groups).find((v) => v.countries === '*' || v.countries.includes(c.slug)) || null;
}
function fitDesc(desc) {
  if (desc.length <= DESC_MAX) return desc;
  const cut = desc.slice(0, DESC_MAX - 1);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,،.:;]+$/, '') + '…';
}

/* ---------- Page shell ---------- */
const pages = [];
const seenPaths = new Set(); // pages must never collide

// Every page-type node links to the Organization as publisher (tightens the entity graph).
const PAGE_TYPES = new Set(['WebPage', 'CollectionPage', 'AboutPage', 'ContactPage']);
function withPublisher(ld) {
  (ld['@graph'] || [ld]).forEach((n) => { if (PAGE_TYPES.has(n['@type']) && !n.publisher) n.publisher = { '@id': `${SITE}/#org` }; });
  return true;
}
function addPage(o) {
  const lang = o.lang, L = LANGS[lang], t = STRINGS[lang];
  const script = ['about', '404', 'contact', 'privacy', 'terms', 'mosques', 'event', 'learn'].includes(o.data.kind) ? ASSET.jsLite : ASSET.js;
  const alternates = o.alternates || [];
  const showLocal = lang !== 'en' && t.brandLocal !== BRAND_AR;
  const canonical = abs(o.path);
  // x-default: the English page, or the only version when a page exists in one language.
  const xDefault = alternates.find((a) => a.lang === 'en') || (alternates.length === 1 ? alternates[0] : null);
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
    o.jsonld ? withPublisher(o.jsonld) && `<script type="application/ld+json">${jsonForHtml(Object.assign({ '@context': 'https://schema.org' }, o.jsonld))}</script>` : '',
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
    '</div></header>' + headerBar(lang, o.path, o.data.kind) +
    `<main id="main" class="wrap" tabindex="-1">${o.body}</main>` +
    settingsDialog(lang) +
    footer(lang, o.data.kind) +
    `<script id="page-data" type="application/json">${jsonForHtml(o.data)}</script>` +
    (o.data.kind === 'hijri' ? `<script src="${ASSET.moon}" defer></script>` : '') +
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
  const live = liveCities(lang);
  html += liveSection(lang, live);
  CONTINENTS.forEach((k) => {
    const list = COUNTRIES.filter((c) => c.continent === k);
    if (!list.length) return;
    html += `<section class="continent"><h2 class="section-title">${esc(t.continents[k])}</h2><ul class="country-grid">` +
      list.map((c) => `<li><a class="country-card" href="${url.country(lang, c)}"><span class="cc-name">${esc(nameIn(c.name, lang))}</span>` +
        `<span class="muted">${esc(tpl(t.citiesCount, { n: Core.num(c.cities.length, ctx) }))}</span></a></li>`).join('') +
      '</ul></section>';
  });
  html += ramadanHome(lang, ctx);
  html += `<section class="coming-soon"><h2>${esc(t.countryNotListed)}</h2>` +
    `<p><a class="btn-link" href="${url.near(lang)}#locate">${esc(t.showMyLocation)}</a>. ${esc(t.worksAnywhere)}</p></section>`;

  const pagePath = url.home(lang);
  addPage({
    lang, tag: langTag(lang), title, desc, path: pagePath, alternates: cluster(url.home), indexable: true, body: html,
    jsonld: { '@graph': [ORG, WEBSITE(lang), { '@type': 'WebPage', '@id': abs(pagePath), url: abs(pagePath), name: title, description: desc, inLanguage: langTag(lang), dateModified: TODAY_ISO, isPartOf: { '@id': `${SITE}/#website` } }] },
    data: clientData(lang, { kind: 'home', defaultSect: 'hanafi', searchUrl: SEARCH[lang].path,
      live: live.map((ci) => [ci.lat, ci.lng, ci.tz, ci.method, ci.country.jafariMethod || null, ci.defaultSect]) }),
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
  // "Fajr time in Kuwait today": the country's first (largest) city answers, named in the answer.
  const first = locOf(c.cities[0], lang), fq = Core.faqItems(first, ctx, NOW), other = tpl(t.cOther, { country });
  const atFirst = (k) => fq.find((it) => it.q === tpl(t.qAt, { prayer: t.prayers[k], city: first.name }));
  const perPrayer = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].map((k) => {
    const it = atFirst(k);
    return it && { q: tpl(t.qAt, { prayer: t.prayers[k], city: country }), a: `${it.a} ${other}` };
  }).filter(Boolean);
  if (perPrayer.length !== 5) problems.push(`country FAQ: per-prayer answers missing for ${c.slug} (${lang})`);
  faq.unshift({ q: tpl(t.qTimes, { city: country }), a: `${first.name}: ${fq[0].a} ${other}` }, ...perPrayer);
  html += `<section class="card faq" aria-labelledby="faqTitle"><h2 id="faqTitle">${esc(tpl(t.faqH2, { city: country }))}</h2>` +
    faq.map((it) => `<div class="faq-item"><h3>${esc(it.q)}</h3><p>${esc(it.a)}</p></div>`).join('') + '</section>';
  html += `<section class="coming-soon"><h2>${esc(t.cityNotListed)}</h2>` +
    `<p><a class="btn-link" href="${url.near(lang)}#locate">${esc(t.showMyLocation)}</a>. ${esc(t.worksAnywhere)}</p></section>`;

  const tag = langTag(lang, c);
  addPage({
    lang, tag, title, desc, path: pagePath, alternates: cluster((l) => url.country(l, c), c).filter((a) => built(a.lang, c)), indexable: true, body: html, og: c.slug,
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
  // English titles add the older spelling people still search with: "Bengaluru (Bangalore)".
  const titleName = lang === 'en' && ci.shownEn ? `${cityName} (${ci.shownEn})` : cityName;
  const variant = variantOf(lang, c), local = lang === 'en' ? localFor(ci) : null;
  if (variant || local) {
    loc.v = { summary: variant && variant.summary, faq: [].concat((variant && variant.faq) || [], (variant && variant.faqByCountry && variant.faqByCountry[c.slug]) || [], local ? [[local.q, local.a]] : []) };
  }
  // Title: a regional wording, else (English) the local search term when it is in Latin letters.
  const localTitle = local && local.latin && !(variant && variant.cityTitle) ? `{city} Prayer Times & ${local.term} Today, {country} | SalaahDaily` : null;
  const variantTitle = variant && ((variant.cityTitleByCountry && variant.cityTitleByCountry[c.slug]) || variant.cityTitle);
  // The H1 keeps the standard wording; a regional title adds the other search term ("Namaz Timings").
  const h1 = tpl(t.cityTitle, { city: titleName, country: countryName }).split(' | ')[0];
  const fullTitle = tpl(variantTitle || localTitle || t.cityTitle, { city: titleName, country: countryName });
  const title = fitTitle(fullTitle, lang, countryName, titleName);
  const pagePath = url.city(lang, ci);
  const ptimes = lang === 'ar' ? Core.cityRowTimes(loc, ctx, NOW) : null;
  const desc = ptimes ? tpl(AR_DESC, { city: cityName, fajr: ptimes[0], dhuhr: ptimes[1], asr: ptimes[2], maghrib: ptimes[3], isha: ptimes[4] })
    : tpl((variant && variant.cityDesc) || t.cityDesc, { city: titleName, country: countryName });
  if (hasPrayerPages(lang, ci)) loc.pp = pagePath;
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
    (loc.pp ? `<section class="card"><h2>${esc(tpl(ppStr(lang, ci).chipsH, { city: cityName }))}</h2>${linkList(EG_KEYS.map((k) => ({ name: tpl(ppStr(lang, ci).h1[k], { city: cityName }), href: `${pagePath}${k}/` })))}</section>` : '') +
    '<div class="layout">' +
      monthCard(lang, month, `${p.y}-${p.m}-${p.d}|${ctx.sect}|${ctx.method}|${ctx.hour12}|${ctx.hijriAdj}`) +
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
    landmarksNear(lang, ci, cityName, ctx) +
    Core.mosquesCard(ci.lat, ci.lng, tpl(t.mosquesH2, { city: cityName }), ctx) +
    `<p class="muted small updated">${esc(tpl(t.updated, { date: Core.gregorian(p.y, p.m, p.d, 'full', ctx) }))} · <a href="${url.about(lang)}">${esc(t.aboutLink)}</a></p>`;

  const tag = langTag(lang, c);
  addPage({
    lang, tag, title, desc, path: pagePath, alternates: scopedCluster((l) => url.city(l, ci), c), indexable: inScope(lang, c), body, og: c.slug,
    jsonld: {
      '@graph': [
        {
          '@type': 'WebPage', '@id': abs(pagePath), url: abs(pagePath), name: title, description: desc, inLanguage: tag,
          dateModified: TODAY_ISO, isPartOf: { '@id': `${SITE}/#website` },
          // Voice assistants read these parts aloud: the H1, the one-line answer and the five times.
          speakable: { '@type': 'SpeakableSpecification', cssSelector: ['#today h1', '.prayers'] },
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

/* ---------- Arab countries: one Arabic page per prayer per city ("موعد اذان المغرب في كفر الشيخ") ---------- */
// Search Console (Oct 2026): Arabic searches ask for one adhan at a time ("اذان الفجر", "متى يؤذن المغرب"),
// in Egypt in the spoken "الساعة كام". Egypt gets Egyptian wording, the other Arab countries standard Arabic.
const AR_DESC = 'مواعيد الصلاة في {city} اليوم: الفجر {fajr}، الظهر {dhuhr}، العصر {asr}، المغرب {maghrib}، العشاء {isha}. موعد الأذان الساعة كام، والجدول الشهري والقبلة.';
const EG_KEYS = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];
const PP_H1 = {
  fajr: 'موعد أذان الفجر في {city}', sunrise: 'موعد الشروق في {city}', dhuhr: 'موعد أذان الظهر في {city}',
  asr: 'موعد أذان العصر في {city}', maghrib: 'موعد أذان المغرب في {city}', isha: 'موعد أذان العشاء في {city}',
};
const PP_COMMON = {
  chipsH: 'موعد أذان كل صلاة في {city}', h1: PP_H1,
  tableH: 'موعد أذان {prayer} في {city} لمدة 30 يومًا', tableHSunrise: 'موعد الشروق في {city} لمدة 30 يومًا',
  colDate: 'التاريخ', colHijri: 'الهجري', colTime: 'الوقت',
  faqH: 'أسئلة عن موعد أذان {prayer} في {city}',
  q3: 'ما هي مواعيد الصلاة في {city} اليوم؟', a3: 'مواعيد الصلاة في {city} اليوم: الفجر {fajr}، الشروق {sunrise}، الظهر {dhuhr}، العصر {asr}، المغرب {maghrib}، العشاء {isha}.',
  otherH: 'مواعيد أخرى في {city}', nearH: 'موعد أذان {prayer} في مدن قريبة', nearHSunrise: 'موعد الشروق في مدن قريبة',
};
const EG = Object.assign({}, PP_COMMON, {
  title: {
    fajr: 'موعد أذان الفجر في {city} اليوم: الفجر بيأذن الساعة كام؟', sunrise: 'موعد الشروق في {city} اليوم وبكرة: الشروق الساعة كام؟',
    dhuhr: 'موعد أذان الظهر في {city} اليوم: الظهر بيأذن الساعة كام؟', asr: 'موعد أذان العصر في {city} اليوم: العصر بيأذن الساعة كام؟',
    maghrib: 'موعد أذان المغرب في {city} اليوم: المغرب بيأذن الساعة كام؟', isha: 'موعد أذان العشاء في {city} اليوم: العشاء بيأذن الساعة كام؟',
  },
  answer: '{prayer} بيأذن في {city} النهارده ({date}) الساعة {time}، وبكرة الساعة {tomorrow}.',
  answerSunrise: 'الشروق في {city} النهارده ({date}) الساعة {time}، وبكرة الساعة {tomorrow}.',
  desc: 'أذان {prayer} في {city} اليوم الساعة {time}، وبكرة الساعة {tomorrow}. موعد أذان {prayer} لكل أيام الشهر، ومواقيت الصلاة كاملة في {city}.',
  descSunrise: 'الشروق في {city} اليوم الساعة {time}، وبكرة الساعة {tomorrow}. موعد الشروق لكل أيام الشهر، ومواقيت الصلاة كاملة في {city}.',
  q1: '{prayer} بيأذن الساعة كام في {city} النهارده؟', a1: 'أذان {prayer} في {city} النهارده الساعة {time}.',
  q1s: 'الشروق الساعة كام في {city} النهارده؟', a1s: 'الشروق في {city} النهارده الساعة {time}.',
  q2: 'متى يؤذن {prayer} في {city} بكرة؟', a2: 'بكرة ({date}) أذان {prayer} في {city} الساعة {time}.',
  q2s: 'وقت الشروق بكرة في {city}؟', a2s: 'بكرة ({date}) الشروق في {city} الساعة {time}.',
  q4: 'ميعاد صلاة {prayer} النهارده في {city} على الساعة كام؟', a4: 'صلاة {prayer} في {city} النهارده الساعة {time}، وبكرة الساعة {tomorrow}.',
  q4s: 'الشروق على الساعة كام في {city}؟', a4s: 'الشروق في {city} النهارده الساعة {time}، وبكرة الساعة {tomorrow}.',
  method: () => 'المواقيت بطريقة الهيئة المصرية العامة للمساحة (الفجر 19.5°، العشاء 17.5°)، وقد تختلف دقيقة أو دقيقتين عن مسجدك.',
});
const MSA = Object.assign({}, PP_COMMON, {
  title: {
    fajr: 'موعد أذان الفجر في {city} اليوم: متى يؤذن الفجر؟', sunrise: 'موعد الشروق في {city} اليوم وغدًا: متى الشروق؟',
    dhuhr: 'موعد أذان الظهر في {city} اليوم: متى يؤذن الظهر؟', asr: 'موعد أذان العصر في {city} اليوم: متى يؤذن العصر؟',
    maghrib: 'موعد أذان المغرب في {city} اليوم: متى يؤذن المغرب؟', isha: 'موعد أذان العشاء في {city} اليوم: متى يؤذن العشاء؟',
  },
  answer: 'يؤذن {prayer} في {city} اليوم ({date}) الساعة {time}، وغدًا الساعة {tomorrow}.',
  answerSunrise: 'الشروق في {city} اليوم ({date}) الساعة {time}، وغدًا الساعة {tomorrow}.',
  desc: 'أذان {prayer} في {city} اليوم الساعة {time}، وغدًا الساعة {tomorrow}. موعد أذان {prayer} لكل أيام الشهر، ومواقيت الصلاة كاملة في {city}.',
  descSunrise: 'الشروق في {city} اليوم الساعة {time}، وغدًا الساعة {tomorrow}. موعد الشروق لكل أيام الشهر، ومواقيت الصلاة كاملة في {city}.',
  q1: 'متى يؤذن {prayer} في {city} اليوم؟', a1: 'أذان {prayer} في {city} اليوم الساعة {time}.',
  q1s: 'متى الشروق في {city} اليوم؟', a1s: 'الشروق في {city} اليوم الساعة {time}.',
  q2: 'كم الساعة أذان {prayer} غدًا في {city}؟', a2: 'غدًا ({date}) أذان {prayer} في {city} الساعة {time}.',
  q2s: 'وقت الشروق غدًا في {city}؟', a2s: 'غدًا ({date}) الشروق في {city} الساعة {time}.',
  q4: 'ما موعد صلاة {prayer} اليوم في {city}؟', a4: 'صلاة {prayer} في {city} اليوم الساعة {time}، وغدًا الساعة {tomorrow}.',
  q4s: 'الشروق الساعة كم في {city}؟', a4s: 'الشروق في {city} اليوم الساعة {time}، وغدًا الساعة {tomorrow}.',
  method: (m) => `المواقيت محسوبة بطريقة ${m}، وقد تختلف دقيقة أو دقيقتين عن مسجدك.`,
});
// Countries where Arabic is spoken and the Arabic site is built get the pages.
const PP_COUNTRIES = new Set(['egypt', 'saudi-arabia', 'uae', 'kuwait', 'qatar', 'bahrain', 'oman', 'yemen', 'iraq', 'syria', 'jordan', 'lebanon',
  'palestine', 'sudan', 'libya', 'tunisia', 'algeria', 'morocco', 'mauritania', 'somalia', 'djibouti', 'comoros']);
// Persian: Search Console, Iran (Oct 2026): "اذان صبح {city}", "اذان صبح به افق {city}", "نماز صبح ساعت چند است", "طلوع فردا".
const FA_PP = {
  chipsH: 'ساعت اذان هر نماز در {city}',
  h1: { fajr: 'اذان صبح {city}', sunrise: 'طلوع آفتاب {city}', dhuhr: 'اذان ظهر {city}', asr: 'اذان عصر {city}', maghrib: 'اذان مغرب {city}', isha: 'اذان عشا {city}' },
  title: {
    fajr: 'اذان صبح {city} امروز: نماز صبح ساعت چند است؟', sunrise: 'ساعت طلوع آفتاب {city} امروز و فردا',
    dhuhr: 'اذان ظهر {city} امروز: نماز ظهر ساعت چند است؟', asr: 'اذان عصر {city} امروز: نماز عصر ساعت چند است؟',
    maghrib: 'اذان مغرب {city} امروز: نماز مغرب ساعت چند است؟', isha: 'اذان عشا {city} امروز: نماز عشا ساعت چند است؟',
  },
  answer: 'اذان {prayer} به افق {city} امروز ({date}) ساعت {time} و فردا ساعت {tomorrow} است.',
  answerSunrise: 'طلوع آفتاب {city} امروز ({date}) ساعت {time} و فردا ساعت {tomorrow} است.',
  desc: 'اذان {prayer} به افق {city} امروز ساعت {time} و فردا ساعت {tomorrow}. ساعت اذان {prayer} در ۳۰ روز آینده و اوقات شرعی کامل {city}.',
  descSunrise: 'طلوع آفتاب {city} امروز ساعت {time} و فردا ساعت {tomorrow}. ساعت طلوع در ۳۰ روز آینده و اوقات شرعی کامل {city}.',
  tableH: 'اذان {prayer} به افق {city} در ۳۰ روز آینده', tableHSunrise: 'طلوع آفتاب {city} در ۳۰ روز آینده',
  colDate: 'تاریخ', colHijri: 'قمری', colTime: 'ساعت',
  faqH: 'پرسش‌ها درباره اذان {prayer} {city}',
  q1: 'نماز {prayer} امروز در {city} ساعت چند است؟', a1: 'اذان {prayer} امروز به افق {city} ساعت {time} است.',
  q1s: 'طلوع آفتاب امروز در {city} ساعت چند است؟', a1s: 'طلوع آفتاب امروز در {city} ساعت {time} است.',
  q2: 'اذان {prayer} فردا در {city} ساعت چند است؟', a2: 'فردا ({date}) اذان {prayer} به افق {city} ساعت {time} است.',
  q2s: 'طلوع فردا در {city} ساعت چند است؟', a2s: 'فردا ({date}) طلوع آفتاب در {city} ساعت {time} است.',
  q4: 'اذان {prayer} به وقت {city} چه ساعتی است؟', a4: 'اذان {prayer} به وقت {city} امروز ساعت {time} و فردا ساعت {tomorrow} است.',
  q4s: 'ساعت طلوع آفتاب {city} امروز و فردا چند است؟', a4s: 'طلوع آفتاب {city} امروز ساعت {time} و فردا ساعت {tomorrow} است.',
  q3: 'اوقات شرعی امروز {city} چیست؟', a3: 'اوقات شرعی امروز {city}: اذان صبح {fajr}، طلوع آفتاب {sunrise}، اذان ظهر {dhuhr}، عصر {asr}، اذان مغرب {maghrib}، عشا {isha}.',
  method: (m) => `اوقات به روش ${m} محاسبه شده و ممکن است یکی دو دقیقه با مسجد شما فرق داشته باشد.`,
  otherH: 'اوقات دیگر در {city}', nearH: 'اذان {prayer} در شهرهای نزدیک', nearHSunrise: 'طلوع آفتاب در شهرهای نزدیک',
};
const FA_PP_COUNTRIES = new Set(['iran', 'iraq', 'afghanistan']);
// Indonesian, Malay, Spanish and UK English (src/prayer-pages.js).
const PP_MORE = require('./src/prayer-pages');
const ppStr = (lang, ci) => (lang === 'fa' ? FA_PP : lang === 'ar' ? (ci.country.slug === 'egypt' ? EG : MSA) : PP_MORE[lang]);
const hasPrayerPages = (lang, ci) => built(lang, ci.country) && ((lang === 'ar' && PP_COUNTRIES.has(ci.country.slug)) ||
  (lang === 'fa' && FA_PP_COUNTRIES.has(ci.country.slug)) || (!!PP_MORE[lang] && PP_MORE[lang].countries.includes(ci.country.slug)));
function cityPrayerPage(lang, ci, key) {
  const t = STRINGS[lang], ctx = ctxFor(lang, ci.defaultSect), loc = locOf(ci, lang), city = loc.name;
  const base = url.city(lang, ci), pagePath = `${base}${key}/`, sun = key === 'sunrise';
  const params = Core.paramsFor(loc, ctx), p = Core.partsInTz(NOW, ci.tz);
  const day = (i) => { const d = Core.addDays(p.y, p.m, p.d, i); return { d, tt: Core.timesFor(loc, ctx, d.y, d.m, d.d, params) }; };
  const f = (x) => Core.fmtTime(x, ci.tz, ctx), g = (d) => Core.gregorian(d.y, d.m, d.d, 'full', ctx);
  const t0 = day(0), t1 = day(1), name = t.prayers[key], EG = ppStr(lang, ci);
  const ends = Core.prayerEnds(t0.tt, t1.tt.fajr, ctx);
  const v = { prayer: name, city, date: g(t0.d), time: f(t0.tt[key]), tomorrow: f(t1.tt[key]), end: ends[key] ? f(ends[key]) : '',
    ishraq: f(new Date(t0.tt.sunrise.getTime() + 15 * 60000)) };
  const all = Object.fromEntries(['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'].map((k) => [k, f(t0.tt[k])]));
  const faq = [
    { q: tpl(sun ? EG.q1s : EG.q1, v), a: tpl(sun ? EG.a1s : EG.a1, v) },
    { q: tpl(sun ? EG.q2s : EG.q2, v), a: tpl(sun ? EG.a2s : EG.a2, Object.assign({}, v, { date: g(t1.d), time: v.tomorrow })) },
    { q: tpl(sun ? EG.q4s : EG.q4, v), a: tpl(sun ? EG.a4s : EG.a4, v) },
    { q: tpl(EG.q3, v), a: tpl(EG.a3, Object.assign({ city }, all)) },
  ];
  if (EG.qEnd && !sun) faq.splice(2, 0, { q: tpl(EG.qEnd, v), a: tpl(EG.aEnd, v) });
  const rows = Array.from({ length: 30 }, (_, i) => day(i)).map(({ d, tt }, i) =>
    `<tr${i === 0 ? ' class="is-today"' : ''}><td>${esc(Core.gregorian(d.y, d.m, d.d, 'short', ctx))}</td><td class="c-hijri">${esc(Core.hijri(d.y, d.m, d.d, ctx, 'short'))}</td><td><bdi>${esc(f(tt[key]))}</bdi></td></tr>`).join('');
  const near = ALL_CITIES.filter((o) => o !== ci && o.country === ci.country)
    .map((o) => ({ o, km: Core.distanceKm(ci.lat, ci.lng, o.lat, o.lng) })).sort((a, b) => a.km - b.km).slice(0, 8);
  const crumbs = [{ name: t.home, href: url.home(lang) }, { name: nameIn(ci.country.name, lang), href: url.country(lang, ci.country) },
    { name: city, href: base }, { name: tpl(EG.h1[key], { city }), href: pagePath }];
  const body = breadcrumbs(crumbs) + '<article class="card about guide">' +
    `<h1>${esc(tpl(EG.h1[key], { city }))}</h1><p class="answer">${esc(tpl(sun ? EG.answerSunrise : EG.answer, v))}</p>` +
    `<p class="muted small">${esc(((m) => (typeof EG.method === 'function' ? EG.method(m) : tpl(EG.method, { method: m })))(Core.methodLabel(ci.defaultSect === 'jafria' ? (loc.jafariMethod || 'Jafari') : (loc.method || 'MuslimWorldLeague'), ctx)))}</p>` +
    `<h2>${esc(tpl(sun ? EG.tableHSunrise : EG.tableH, v))}</h2><div class="table-scroll"><table class="city-table">` +
    `<thead><tr><th scope="col">${EG.colDate}</th><th scope="col">${EG.colHijri}</th><th scope="col">${EG.colTime}</th></tr></thead><tbody>${rows}</tbody></table></div>` +
    `<h2>${esc(tpl(EG.faqH, v))}</h2>` + faq.map((it) => `<h3>${esc(it.q)}</h3><p>${esc(it.a)}</p>`).join('') +
    `<h2>${esc(tpl(EG.otherH, { city }))}</h2>` +
    linkList([{ name: tpl(t.cityTitle, { city, country: nameIn(ci.country.name, lang) }).split(' | ')[0], href: base }]
      .concat(EG_KEYS.filter((k) => k !== key).map((k) => ({ name: tpl(EG.h1[k], { city }), href: `${base}${k}/` })))) +
    `<h2>${esc(tpl(sun ? EG.nearHSunrise : EG.nearH, v))}</h2>` +
    linkList(near.map((n) => ({ name: nameIn(n.o.names, lang, n.o.country), href: `${url.city(lang, n.o)}${key}/` }))) +
    `<p class="muted small">${esc(tpl(t.updated, { date: g(t0.d) }))}</p></article>`;
  // Two cities with one Arabic name (Tripoli, صور) are told apart by their country.
  const tCity = nameCount[lang][city] > 1 ? `${city}${LANGS[lang].dir === 'rtl' ? '، ' : ', '}${nameIn(ci.country.name, lang)}` : city;
  const title = fitTitle(tpl(EG.title[key], { city: tCity }) + ' | SalaahDaily', lang);
  const desc = tpl(sun ? EG.descSunrise : EG.desc, v);
  addPage({
    lang, tag: langTag(lang, ci.country), title, desc, path: pagePath, alternates: [{ lang, tag: langTag(lang, ci.country), href: pagePath }], indexable: true, body, og: ci.country.slug,
    jsonld: { '@graph': [
      { '@type': 'WebPage', '@id': abs(pagePath), url: abs(pagePath), name: title, description: desc, inLanguage: langTag(lang, ci.country),
        dateModified: TODAY_ISO, isPartOf: { '@id': `${SITE}/#website` }, speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.guide h1', '.answer'] } },
      { '@type': 'FAQPage', '@id': `${abs(pagePath)}#faq`, inLanguage: langTag(lang, ci.country),
        mainEntity: faq.map((it) => ({ '@type': 'Question', name: it.q, acceptedAnswer: { '@type': 'Answer', text: it.a } })) },
      breadcrumbLd(crumbs),
    ] },
    data: clientData(lang, { kind: 'learn' }),
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
      (CONFIG.web3formsKey ? `<h2 id="corrections">${esc(GUIDES[lang].corrH)}</h2><p>${esc(GUIDES[lang].corrP)}</p>` : '') +
      `<p class="muted small">${esc(tpl(t.updated, { date: Core.gregorian(...ymd(NOW, 'UTC'), 'full', ctx) }))}</p>` +
    '</article>';
  addPage({
    lang, tag: langTag(lang), title: t.aboutTitle, desc: t.aboutDesc, path: pagePath, alternates: cluster(url.about), indexable: true, body,
    jsonld: { '@graph': [ORG, { '@type': 'AboutPage', '@id': abs(pagePath), url: abs(pagePath), name: t.aboutTitle, description: t.aboutDesc, inLanguage: langTag(lang), dateModified: TODAY_ISO, publisher: { '@id': `${SITE}/#org` } }] },
    data: clientData(lang, { kind: 'about', defaultSect: 'hanafi' }),
  });
}

/* ---------- Contact, privacy, terms (English) ---------- */
function legalText(text) {
  const link = (href, name) => `<a href="${href}">${esc(name)}</a>`;
  return esc(text)
    .replace('{contact}', HAS_CONTACT ? link(url.contact(), 'the Contact page') : 'the suggestion form at the foot of any page')
    .replace('{google}', link('https://policies.google.com/privacy', 'Google’s privacy policy'))
    .replace('{web3forms}', link('https://web3forms.com/privacy', 'the Web3Forms privacy policy'));
}
function infoPage(kind, P, pagePath, schemaType, inner) {
  const t = STRINGS.en, crumbs = [{ name: t.home, href: url.home('en') }, { name: P.h1, href: pagePath }];
  addPage({
    lang: 'en', tag: 'en', title: P.title, desc: P.desc, path: pagePath, indexable: true,
    alternates: [{ lang: 'en', tag: 'en', href: pagePath }],
    body: breadcrumbs(crumbs) + `<article class="card about legal"><h1>${esc(P.h1)}</h1><p class="legal-intro">${legalText(P.lede)}</p>${inner}</article>`,
    jsonld: { '@graph': [ORG, { '@type': schemaType, '@id': abs(pagePath), url: abs(pagePath), name: P.title, description: P.desc, inLanguage: 'en',
      isPartOf: { '@id': `${SITE}/#website` }, publisher: { '@id': `${SITE}/#org` }, ...(kind === 'contact' ? { about: { '@id': `${SITE}/#org` } } : { dateModified: LEGAL.POLICY_DATE }) },
      breadcrumbLd(crumbs)] },
    data: clientData('en', { kind, defaultSect: 'hanafi' }),
  });
}
function legalPages() {
  const dated = (P) => P.sections.map(([h, p]) => `<h2>${esc(h)}</h2><p>${legalText(p)}</p>`).join('') +
    `<p class="muted small">Last updated: ${Core.gregorian(...LEGAL.POLICY_DATE.split('-').map(Number), 'full', ctxFor('en', 'hanafi'))}</p>`;
  infoPage('privacy', LEGAL.PRIVACY, url.privacy(), 'WebPage', dated(LEGAL.PRIVACY));
  infoPage('terms', LEGAL.TERMS, url.terms(), 'WebPage', dated(LEGAL.TERMS));
  if (!HAS_CONTACT) { console.warn('Contact page skipped: set web3formsKey and/or contactEmail in site.config.js'); return; }
  const C = LEGAL.CONTACT, mail = CONFIG.contactEmail;
  infoPage('contact', C, url.contact(), 'ContactPage',
    `<h2>${esc(C.tipsH)}</h2><p>${esc(C.tips)}</p>` +
    suggestForm('en', { heading: C.formH, label: C.formLabel, subject: 'SalaahDaily contact', rows: 6, send: C.formSend }) +
    (mail ? `<h2>${esc(C.emailH)}</h2><p>${esc(CONFIG.web3formsKey ? C.emailP : C.emailOnly)} <a href="mailto:${esc(mail)}">${esc(mail)}</a>.</p>` : ''));
}

/* ---------- Explainers: the prayers and the Hijri calendar ---------- */
// The city whose times a prayer page shows before the visitor has picked one (then: their last city).
const DEFAULT_CITY = {
  en: 'saudi-arabia/makkah', ur: 'pakistan/karachi', hi: 'india/new-delhi', bn: 'bangladesh/dhaka', id: 'indonesia/jakarta',
  ms: 'malaysia/kuala-lumpur', fa: 'iran/tehran', ps: 'afghanistan/kabul',
  es: 'mexico/mexico-city', fr: 'saudi-arabia/makkah', ar: 'saudi-arabia/makkah', tr: 'turkey/istanbul', ha: 'nigeria/kano',
  de: 'germany/berlin', pt: 'brazil/sao-paulo', it: 'italy/rome', ja: 'japan/tokyo', ko: 'south-korea/seoul',
};
// Cities linked from each prayer page: a worldwide set for languages spoken in many countries, else the home country's first ten.
const GLOBAL_CITIES = ['saudi-arabia/makkah', 'saudi-arabia/madinah', 'pakistan/karachi', 'pakistan/lahore', 'bangladesh/dhaka',
  'indonesia/jakarta', 'turkey/istanbul', 'egypt/cairo', 'uk/london', 'usa/new-york'];
const cityByPath = (p) => ALL_CITIES.find((ci) => `${ci.country.slug}/${ci.slug}` === p);
Object.values(DEFAULT_CITY).concat(GLOBAL_CITIES).forEach((p) => { if (!cityByPath(p)) problems.push(`guides: unknown city ${p}`); });
function guideCities(lang) {
  if (['en', 'es', 'fr', 'pt'].includes(lang)) return GLOBAL_CITIES.map(cityByPath);
  return cityByPath(DEFAULT_CITY[lang]).country.cities.slice(0, 10);
}
// The live "today in <city>" line starts with the default city; the browser swaps in the last city visited.
function guideLoc(lang) {
  const ci = cityByPath(DEFAULT_CITY[lang]);
  return { ci, loc: Object.assign(locOf(ci, lang), { url: url.city(lang, ci), defaultSect: ci.defaultSect }) };
}
const linkList = (items) => `<ul class="chips">${items.map((it) => `<li><a href="${it.href}">${esc(it.name)}</a></li>`).join('')}</ul>`;
const aboutThing = (name, wiki) => ({ '@type': 'Thing', name, sameAs: wiki });


/* ---------- Learn: Quran and Hadith, wudu, rak'ahs, night and forenoon prayers, 99 Names ---------- */
const learnUrl = {
  evidence: (l) => `${pre(l)}prayers/evidence/`, wudu: (l) => `${pre(l)}wudu/`, rakahs: (l) => `${pre(l)}prayers/rakahs/`,
  night: (l) => `${pre(l)}prayers/tahajjud/`, names: (l) => `${pre(l)}names-of-allah/`, prophet: (l) => `${pre(l)}names-of-prophet/`,
};
const learnCluster = (fn) => cluster(fn).filter((a) => LEARN[a.lang]);
// Tabs under the header: prayer times and the learn pages.
function learnTabs(lang, current) {
  const L = LEARN[lang];
  if (!L) return '';
  const M = TABS_MORE[lang];
  // Sehri and iftar: the Ramadan timetable of the city this page is about, else the language's default city.
  const seg = current.replace(/^\/+/, '').split('/');
  if (LANGS[seg[0]]) seg.shift();
  const ci = cityByPath(`${seg[0]}/${seg[1]}`) || cityByPath(DEFAULT_CITY[lang]);
  const items = [[L.tabs.names, learnUrl.names(lang)]].concat(PN[lang] ? [[PN[lang].tab, learnUrl.prophet(lang)]] : [], ['rakahs', 'wudu'].map((k) => [L.tabs[k], learnUrl[k](lang)]))
    .concat([[M.hijri, url.hijri(lang)], [M.ramadan, url.event(lang, 'ramadan')], [M.sehri, url.ramadan(lang, ci)],
      [evName(lang, 'fitr'), url.event(lang, 'eid-al-fitr')], [evName(lang, 'adha'), url.event(lang, 'eid-al-adha')]]);
  return `<nav class="learn-tabs" aria-label="${esc(L.tabs.evidence)}"><ul>` + items.map(([name, href]) => {
    const on = current === href;
    return `<li><a href="${href}"${on ? ' aria-current="page"' : ''}>${esc(name)}</a></li>`;
  }).join('') + '</ul></nav>';
}
// The row under the header: the learn tabs, and a city search on every page except the home page (which has its own).
function headerBar(lang, current, kind) {
  const t = STRINGS[lang];
  const search = kind === 'home' ? '' :
    `<div class="search header-search" data-search="${SEARCH[lang].path}">${ICON.search}<input type="search" placeholder="${esc(t.searchLabel)}" autocomplete="off" aria-label="${esc(t.searchLabel)}">` +
    '<ul class="search-results" hidden></ul></div>';
  return `<div class="wrap header-bar">${learnTabs(lang, current)}${search}</div>`;
}
const refList = (items) => `<ul class="refs">${items.map(([r, x]) => `<li><span class="ref">${Core.ltrNums(r)}</span> ${Core.ltrNums(x)}</li>`).join('')}</ul>`;
function learnAdd(lang, o) {
  const t = STRINGS[lang], crumbs = [{ name: t.home, href: url.home(lang) }].concat(o.crumbs || [], [{ name: o.h1, href: o.path }]);
  const body = breadcrumbs(crumbs) + `<article class="card about guide learn"><h1>${esc(o.h1)}</h1>${o.body}` +
    `<p class="muted small">${esc(tpl(t.updated, { date: Core.gregorian(...ymd(NOW, 'UTC'), 'full', ctxFor(lang, 'hanafi')) }))}</p></article>`;
  const title = fitTitle(o.title, lang);
  addPage({
    lang, tag: langTag(lang), title, desc: o.desc, path: o.path, alternates: (o.cluster || learnCluster)(o.fn), indexable: true, body,
    jsonld: { '@graph': [
      { '@type': 'WebPage', '@id': abs(o.path), url: abs(o.path), name: title, description: o.desc, inLanguage: langTag(lang),
        dateModified: TODAY_ISO, isPartOf: { '@id': `${SITE}/#website` } },
      breadcrumbLd(crumbs),
    ] },
    data: clientData(lang, Object.assign({ kind: 'learn' }, o.data || {})),
  });
}
const prayersCrumb = (lang) => [{ name: GUIDES[lang].prayersNav, href: url.prayers(lang) }];
function evidencePage(lang) {
  const e = LEARN[lang].ev;
  const body = `<p class="answer">${esc(e.lede)}</p><h2>${esc(e.quranH)}</h2>${refList(e.quran)}<h2>${esc(e.hadithH)}</h2>${refList(e.hadith)}` +
    `<h2>${esc(e.schoolsH)}</h2>` + e.schools.map(([h, p]) => `<h3>${esc(h)}</h3><p>${esc(p)}</p>`).join('') +
    `<p class="muted small">${esc(e.note)}</p>` +
    linkList(GUIDE_PRAYERS.map((k) => ({ name: STRINGS[lang].prayers[k], href: url.prayer(lang, k) })));
  learnAdd(lang, { path: learnUrl.evidence(lang), fn: learnUrl.evidence, title: e.title, h1: e.h1, desc: e.desc, body, crumbs: prayersCrumb(lang) });
}
function wuduPage(lang) {
  const w = LEARN[lang].wudu;
  const ol = (a) => `<ol class="steps">${a.map((x) => `<li>${esc(x)}</li>`).join('')}</ol>`;
  const body = `<p class="answer">${esc(w.lede)}</p><h2>${esc(w.whyH)}</h2>${refList(w.why)}` +
    `<h2>${esc(w.stepsH)}</h2>${ol(w.steps)}<p class="muted small">${esc(w.stepsRef)} ${esc(w.feetRef)}</p>` +
    `<h2>${esc(w.jafariH)}</h2>${ol(w.jafari)}<p class="muted small">${esc(w.jafariRef)}</p>` +
    `<h2>${esc(w.diffH)}</h2>` + w.diff.map(([h, p]) => `<h3>${esc(h)}</h3><p>${esc(p)}</p>`).join('') +
    `<h2>${esc(w.breaksH)}</h2><p>${esc(w.breaks)}</p>`;
  learnAdd(lang, { path: learnUrl.wudu(lang), fn: learnUrl.wudu, title: w.title, h1: w.h1, desc: w.desc, body });
}
function rakahsPage(lang) {
  const r = LEARN[lang].rk, t = STRINGS[lang];
  const body = `<p class="answer">${esc(r.lede)}</p><div class="table-scroll"><table class="city-table">` +
    `<thead><tr><th scope="col">${esc(r.colPrayer)}</th><th scope="col">${esc(r.colFard)}</th><th scope="col">${esc(r.colSunni)}</th><th scope="col">${esc(r.colShafi)}</th><th scope="col">${esc(r.colJafari)}</th></tr></thead><tbody>` +
    ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].map((k) => `<tr><th scope="row"><a href="${url.prayer(lang, k)}">${esc(t.prayers[k])}</a></th>${r.rows[k].map((x) => `<td>${esc(x)}</td>`).join('')}</tr>`).join('') +
    `</tbody></table></div><p>${esc(r.night)}</p><h2>${esc(r.refsH)}</h2>${refList(r.refs)}`;
  learnAdd(lang, { path: learnUrl.rakahs(lang), fn: learnUrl.rakahs, title: r.title, h1: r.h1, desc: r.desc, body, crumbs: prayersCrumb(lang) });
}
function naflPage(lang, key) {
  const n = LEARN[lang].nafl, p = n.pages[key];
  const { ci, loc } = guideLoc(lang);
  const ctx = ctxFor(lang, ci.defaultSect);
  const fn = (l) => `${pre(l)}prayers/${key}/`, f = (x) => Core.fmtTime(x, loc.tz, ctx);
  const row = Core.naflRows(loc, ctx, NOW).find((r) => r[0] === key || (key === 'tahajjud' && r[0] === 'layl'));
  const live = row ? tpl(n.from, { start: f(row[1]), end: f(row[2]) }) : '';
  const body = `<section class="nafl-today"><h2 id="naflH">${esc(tpl(n.todayH, { city: loc.name }))}</h2>` +
    `<p class="answer" id="naflLive">${esc(live)}</p><p class="muted small">${esc(n.cityHint)}</p></section>` +
    `<h2>${esc(n.timeH)}</h2><p>${esc(p.time)}</p><h2>${esc(n.countH)}</h2><p>${esc(p.count)}</p>` +
    `<h2>${esc(n.refsH)}</h2>${refList(p.refs)}` +
    linkList(NAFL_PAGES.filter((k) => k !== key).map((k) => ({ name: n.pages[k].h1, href: `${pre(lang)}prayers/${k}/` }))
      .concat([{ name: LEARN[lang].tabs.rakahs, href: learnUrl.rakahs(lang) }, { name: LEARN[lang].tabs.evidence, href: learnUrl.evidence(lang) }]));
  learnAdd(lang, { path: fn(lang), fn, title: p.title, h1: p.h1, desc: p.desc, body, crumbs: prayersCrumb(lang),
    data: { kind: 'nafl', nafl: key, defaultSect: ci.defaultSect, pl: loc, naflT: { todayH: n.todayH, from: n.from } } });
}
// A prayer's Quran and hadith: timing, benefits and rak'ahs, Sunni and Shia side by side.
function refPage(lang, key) {
  const R = REFS[lang], t = STRINGS[lang], it = R.items[key];
  const name = t.prayers[key] || t.nafl[key];
  const fn = (l) => `${pre(l)}prayers/${key}/reference/`;
  const parent = GUIDE_PRAYERS.includes(key) ? { name, href: url.prayer(lang, key) }
    : NAFL_PAGES.includes(key) && LEARN[lang] ? { name: LEARN[lang].nafl.pages[key].h1, href: `${pre(lang)}prayers/${key}/` } : null;
  // In left-to-right languages the voweled Arabic of an adhkar gets its own direction so its words keep their order.
  const arRuns = LANGS[lang].dir === 'rtl' ? (h) => h : (h) => h.replace(/[\u0600-\u06FF][\u0600-\u06FF\s]*[\u0600-\u06FF]/g,
    (m) => /[\u064B-\u0652]/.test(m) ? `<bdi class="dhikr${m.split(/\s+/).length > 3 ? ' dhikr-line' : ''}" lang="ar" dir="rtl">${m}</bdi>` : m);
  // A full stop after an adhkar on its own line would sit alone on the next line, so it goes.
  const list = (items) => arRuns(refList(items)).replace(/(dhikr-line"[^>]*>[^<]*<\/bdi>)\s*[.。]\s*/g, '$1');
  const cols = (sec) => '<div class="ref-cols">' +
    `<section><h3>${esc(R.sunniH)}</h3>${list(sec.s)}</section><section><h3>${esc(R.shiaH)}</h3>${list(sec.j)}</section></div>`;
  // Benefits and adhkar are one list for everyone: each source once, without the unsourced notes on a school's view.
  const merged = (sec) => { const seen = new Set(); return list(sec.s.concat(sec.j).filter(([r]) => r && !seen.has(r) && seen.add(r))); };
  const section = (k) => (k === 'virtue' || k === 'azkar' ? merged : cols)(it[k]);
  const body = `<p class="answer">${esc(R.lede)}</p>` +
    [['time', R.timeH], ['virtue', R.virtueH], ['prayer', R.prayerH]].concat(it.azkar ? [['azkar', R.azkarH]] : []).map(([k, h]) => `<h2 id="${k}">${esc(tpl(h, { prayer: name }))}</h2>${section(k)}`).join('') +
    `<p class="muted small">${esc(R.note)}</p><h2>${esc(R.otherH)}</h2>` +
    linkList(REF_KEYS.filter((k) => k !== key).map((k) => ({ name: t.prayers[k] || t.nafl[k], href: fn(lang).replace(`/${key}/`, `/${k}/`) })));
  learnAdd(lang, { path: fn(lang), fn, title: tpl(R.title, { prayer: name }), h1: tpl(R.h1, { prayer: name }), desc: tpl(R.desc, { prayer: name }), body,
    crumbs: prayersCrumb(lang).concat(parent ? [parent] : []), cluster: (f) => cluster(f).filter((a) => REFS[a.lang]) });
}
const kwFaq = (items) => (items || []).map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join('');
// Names of the Prophet ﷺ: the same table as the Names of Allah.
function prophetNamesPage(lang) {
  const p = PN[lang], m = LEARN[lang].names, ctx = ctxFor(lang, 'hanafi');
  const body = `<p class="answer">${esc(p.lede)}</p>${refList(p.refs)}<div class="table-scroll"><table class="city-table names-table">` +
    `<thead><tr><th scope="col">${esc(m.colNo)}</th><th scope="col">${esc(m.colAr)}</th><th scope="col">${esc(m.colTr)}</th><th scope="col">${esc(m.colMean)}</th></tr></thead><tbody>` +
    PROPHET_NAMES.map(([ar, tr], i) => `<tr><td>${esc(Core.num(i + 1, ctx))}</td><td class="name-ar" lang="ar" dir="rtl">${esc(ar)}</td><td>${esc(tr)}</td><td>${esc(p.meanings[i])}</td></tr>`).join('') +
    `</tbody></table></div><p class="muted small">${esc(p.listNote)}</p>` + kwFaq(KW.PROPHET[lang]);
  learnAdd(lang, { path: learnUrl.prophet(lang), fn: learnUrl.prophet, title: p.title, h1: p.h1, desc: p.desc, body,
    cluster: (f) => cluster(f).filter((a) => PN[a.lang] && LEARN[a.lang]) });
}
function namesPage(lang) {
  const m = LEARN[lang].names, ctx = ctxFor(lang, 'hanafi'), wz = WAZIFA[lang];
  const body = `<p class="answer">${esc(m.lede)}</p>${refList(m.refs)}` + (wz ? `<p class="muted small"><strong>${esc(wz.h)}:</strong> ${esc(wz.note)}</p>` : '') +
    '<div class="table-scroll"><table class="city-table names-table">' +
    `<thead><tr><th scope="col">${esc(m.colNo)}</th><th scope="col">${esc(m.colAr)}</th><th scope="col">${esc(m.colTr)}</th><th scope="col">${esc(m.colMean)}</th></tr></thead><tbody>` +
    ALLAH_NAMES.map(([ar, tr], i) => `<tr><td>${esc(Core.num(i + 1, ctx))}</td><td class="name-ar" lang="ar" dir="rtl">${esc(ar)}</td><td>${esc(tr)}</td><td>${esc(m.meanings[i])}${wz ? `<span class="wazifa">${esc(wz.items[i])}</span>` : ''}</td></tr>`).join('') +
    `</tbody></table></div><p class="muted small">${esc(m.listNote)}</p>` + kwFaq(KW.NAMES[lang]);
  learnAdd(lang, { path: learnUrl.names(lang), fn: learnUrl.names, title: m.title, h1: m.h1, desc: m.desc, body });
}

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
  for (let i = -400; i <= 1160; i++) {
    const d = new Date(Date.UTC(p.y, p.m - 1, p.d + i));
    const gy = d.getUTCFullYear(), gm = d.getUTCMonth() + 1, gd = d.getUTCDate();
    const h = Core.hijriParts(gy, gm, gd, 0);
    const k = `${h.y}-${h.m}`;
    if (h.d === 1 && !HIJRI_START[k]) HIJRI_START[k] = { y: gy, m: gm, d: gd };
  }
})();
const EVENTS = [
  ['ramadan', 9, 1, 'ramadan', false, 'Ramadan'], ['laylatQadr', 9, 27, 'laylat-al-qadr', true, 'Laylat_al-Qadr'],
  ['fitr', 10, 1, 'eid-al-fitr', false, 'Eid_al-Fitr'], ['arafah', 12, 9, 'day-of-arafah', false, 'Day_of_Arafah'],
  ['adha', 12, 10, 'eid-al-adha', false, 'Eid_al-Adha'], ['newYear', 1, 1, 'islamic-new-year', false, 'Islamic_New_Year'],
  ['ashura', 1, 10, 'ashura', false, 'Ashura'], ['mawlid', 3, 12, 'mawlid', false, 'Mawlid'],
  ['israMiraj', 7, 27, 'isra-and-miraj', true, 'Isra_and_Mi%27raj'], ['shabBarat', 8, 15, 'shab-e-barat', true, 'Mid-Sha%27ban'],
];
const { EV } = require('./src/events');
Object.keys(LANGS).forEach((l) => {
  if (!EV[l]) { problems.push(`events.js: no strings for ${l}`); return; }
  EVENTS.forEach(([k]) => { if (!EV[l].desc[k]) problems.push(`events.js: no ${l} text for ${k}`); });
});
const evName = (lang, k) => GUIDES[lang].ev[k] || EV[lang].names[k];
function hijriToGregorian(hy, hm, hd) {
  const s0 = HIJRI_START[`${hy}-${hm}`];
  if (!s0) return null;
  const d = new Date(Date.UTC(s0.y, s0.m - 1, s0.d + hd - 1));
  return { y: d.getUTCFullYear(), m: d.getUTCMonth() + 1, d: d.getUTCDate() };
}

// Week starts: Saturday for Arabic, Persian and Pashto, Monday for European languages and Turkish, else Sunday.
const FIRST_DAY = { ar: 6, fa: 6, ps: 6, tr: 1, de: 1, fr: 1, es: 1, it: 1, pt: 1, ms: 1, id: 1 };
// Years the converter accepts (the Umm al-Qura tables cover these): about 1937 to 2077.
const HIJRI_MIN = 1356, HIJRI_MAX = 1500;
// Country picker data for the Hijri calendar and the Islamic date pages: names in this language and who decides.
function hijriCountryData(lang) {
  const names = {};
  COUNTRIES.forEach((c) => { names[c.slug] = nameIn(c.name, lang); });
  const auth = {};
  Object.keys(AUTH).forEach((k) => { auth[k] = [AUTH[k].type, AUTH[k].name ? (AUTH[k].name[lang] || AUTH[k].name.en) : '']; });
  return { cn: names, auth, authT: AT[lang], natCal: NATIONAL_CAL };
}
function hijriCountry(lang, defSlug) {
  const a = AT[lang], names = COUNTRIES.map((c) => [c.slug, nameIn(c.name, lang)]).sort((x, y) => x[1].localeCompare(y[1], LANGS[lang].locale || 'en'));
  return `<section class="hcountry" aria-labelledby="hcL"><label id="hcL">${esc(a.countryL)} <select id="hcCountry">` +
    names.map(([s, n]) => `<option value="${s}"${s === defSlug ? ' selected' : ''}>${esc(n)}</option>`).join('') + '</select></label>' +
    '</section>';
}
function hijriTools(lang, h, today, ctx) {
  const t = STRINGS[lang], c = HC[lang];
  const grid = Core.renderHijriGrid(h.y, h.m, ctx, h, FIRST_DAY[lang] || 0);
  const iso = `${today[0]}-${String(today[1]).padStart(2, '0')}-${String(today[2]).padStart(2, '0')}`;
  const opts = (n, f) => Array.from({ length: n }, (_, i) => `<option value="${i + 1}">${esc(f(i + 1))}</option>`).join('');
  return `<section class="hgrid" aria-label="${esc(c.gridH)}"><div class="month-head"><div><h2 id="hgTitle">${esc(grid.title)}</h2><p class="muted" id="hgSub">${esc(grid.sub)}</p></div>` +
    '<div class="month-nav">' +
      `<button type="button" class="icon-btn" id="hgPrev" aria-label="${esc(t.prevMonth)}"><span class="flip" aria-hidden="true">‹</span></button>` +
      `<button type="button" class="btn-small" id="hgToday">${esc(t.todayBtn)}</button>` +
      `<button type="button" class="icon-btn" id="hgNext" aria-label="${esc(t.nextMonth)}"><span class="flip" aria-hidden="true">›</span></button>` +
      `<label class="hg-year">${esc(c.yearL)} <input type="number" id="hgYear" min="${HIJRI_MIN}" max="${HIJRI_MAX}" value="${h.y}" inputmode="numeric"></label>` +
    '</div></div>' +
    `<div class="table-scroll"><table class="hijri-grid" id="hgTable">${grid.table}</table></div></section>` +
    `<section class="conv" aria-labelledby="convH"><h2 id="convH">${esc(c.conv)}</h2><div class="conv-grid">` +
      `<form id="g2h" class="conv-box"><h3>${esc(c.g2h)}</h3><label>${esc(c.dateL)} <input type="date" id="g2hDate" value="${iso}" required></label>` +
        `<button type="submit" class="btn-primary">${esc(c.go)}</button><p class="conv-out" id="g2hOut" role="status"></p></form>` +
      `<form id="h2g" class="conv-box"><h3>${esc(c.h2g)}</h3><div class="conv-row">` +
        `<label>${esc(c.dayL)} <select id="h2gD">${opts(30, (d) => Core.num(d, ctx))}</select></label>` +
        `<label>${esc(c.monthL)} <select id="h2gM">${opts(12, (m) => t.hijriMonths[m - 1])}</select></label>` +
        `<label>${esc(c.yearL)} <input type="number" id="h2gY" min="${HIJRI_MIN}" max="${HIJRI_MAX}" value="${h.y}" inputmode="numeric" required></label></div>` +
        `<button type="submit" class="btn-primary">${esc(c.go)}</button><p class="conv-out" id="h2gOut" role="status"></p></form>` +
    '</div></section>';
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
  const EVENT_SLUG = Object.fromEntries(EVENTS.map((e) => [e[0], e[3]]));
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
    hijriCountry(lang, ci.country.slug) +
    hijriTools(lang, h, today, ctx) +
    crescentSection(lang, ci, ctx) +
    `<h2>${esc(g.hEventsH2)}</h2><div class="table-scroll"><table class="city-table"><tbody>` +
    events.map((e) => `<tr><th scope="row"><a href="${url.event(lang, EVENT_SLUG[e.k])}">${esc(evName(lang, e.k))}</a></th><td>${esc(hijriText(e))}</td><td>${esc(gFull(e.gd))}</td></tr>`).join('') +
    '</tbody></table></div>' +
    `<h2 id="hMonthsH2">${esc(tpl(g.hMonthsH2, { year: yearText }))}</h2><div class="table-scroll"><table class="city-table">` +
    `<thead><tr><th scope="col">${esc(g.colMonth)}</th><th scope="col">${esc(g.colStarts)}</th><th scope="col">${esc(g.colDays)}</th></tr></thead><tbody id="hMonths">` +
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
    data: clientData(lang, Object.assign({ kind: 'hijri', defaultSect: ci.defaultSect, hc: Object.assign({ monthsH2: g.hMonthsH2 }, HC[lang]), firstDay: FIRST_DAY[lang] || 0, hMin: HIJRI_MIN, hMax: HIJRI_MAX, defCountry: ci.country.slug, moon: MOON[lang], ml: locOf(ci, lang) }, hijriCountryData(lang))),
  });
}

// Crescent prediction for the page's city; the browser redraws it for the visitor's last city.
function crescentSection(lang, ci, ctx) {
  const s = MOON[lang], loc = locOf(ci, lang), r = crescentFor(loc, NOW.getTime(), ctx, lang);
  return `<section class="crescent" aria-labelledby="mcH"><h2 id="mcH">${esc(r.h)}</h2>` +
    `<p class="muted" id="mcLoc">${esc(tpl(s.loc, { city: loc.name }))}</p><div id="mcOut">${r.html}</div><p class="muted small">${esc(s.note)}</p></section>`;
}
function crescentFor(loc, now, ctx, lang) {
  const s = MOON[lang], t = STRINGS[lang];
  const dayOf = (ms) => { const p = Core.partsInTz(new Date(ms), loc.tz); return Date.UTC(p.y, p.m - 1, p.d); };
  const res = Moon.crescent(now - 2 * 864e5, loc.lat, loc.lng, dayOf);
  const after = new Date(res.conj + 3 * 864e5), hm = Core.hijriParts(after.getUTCFullYear(), after.getUTCMonth() + 1, after.getUTCDate(), 0);
  const html = Moon.html(res, s, {
    esc, time: (ms) => Core.fmtTime(new Date(ms), loc.tz, ctx),
    date: (ms) => { const p = Core.partsInTz(new Date(ms), 'UTC'); return Core.gregorian(p.y, p.m, p.d, 'short', ctx); },
  });
  return { h: tpl(s.h, { month: `${t.hijriMonths[hm.m - 1]} ${Core.num(hm.y, ctx)}` }), html };
}

/* ---------- Islamic dates: one page per event ---------- */
// Questions in the words people search with (src/keyword-faq.js).
const KW = require('./src/keyword-faq');
const EV_ALIASES = KW.EVENTS;
function eventPage(lang, [k, hm, hd, slug, night, wiki]) {
  const t = STRINGS[lang], g = GUIDES[lang], e = EV[lang], pagePath = url.event(lang, slug);
  const { ci } = guideLoc(lang);
  const ctx = ctxFor(lang, ci.defaultSect);
  const today = ymd(NOW, ci.tz), h = Core.hijriParts(today[0], today[1], today[2], 0);
  const todayUtc = Date.UTC(today[0], today[1] - 1, today[2]);
  // The next three dates on or after today.
  const dates = [];
  for (let hy = h.y; hy <= h.y + 4 && dates.length < 3; hy++) {
    const gd = hijriToGregorian(hy, hm, hd);
    if (gd && Date.UTC(gd.y, gd.m - 1, gd.d) >= todayUtc) dates.push({ hy, gd });
  }
  if (!dates.length) { problems.push(`events: no date for ${k}`); return; }
  // The page names the event itself ("Ramadan"), where tables say "Ramadan begins".
  const next = dates[0], name = EV[lang].names[k] || evName(lang, k);
  const gFull = (x) => Core.gregorian(x.y, x.m, x.d, 'full', ctx);
  const hijriText = (hy) => `${Core.num(hd, ctx)} ${t.hijriMonths[hm - 1]} ${Core.num(hy, ctx)} ${t.hijriEra}`;
  const year = Core.num(next.gd.y, ctx);
  const daysTo = Math.round((Date.UTC(next.gd.y, next.gd.m - 1, next.gd.d) - todayUtc) / 864e5);
  const answer = tpl(e.answer, { event: name, hijri: hijriText(next.hy), date: gFull(next.gd) });
  const prev = night ? new Date(Date.UTC(next.gd.y, next.gd.m - 1, next.gd.d - 1)) : null;
  const nightLine = prev ? tpl(e.night, { prev: Core.gregorian(prev.getUTCFullYear(), prev.getUTCMonth() + 1, prev.getUTCDate(), 'full', ctx) }) : '';
  const crumbs = [{ name: t.home, href: url.home(lang) }, { name: g.hijriNav, href: url.hijri(lang) }, { name, href: pagePath }];
  // Ramadan: the whole month as a calendar, each day with its Gregorian date.
  const month = k === 'ramadan' ? Core.renderHijriGrid(next.hy, hm, ctx, null, FIRST_DAY[lang] || 0) : null;
  const monthHtml = month ? `<section class="hgrid ev-month" aria-labelledby="evMonthT"><h2 id="evMonthT">${esc(month.title + ' (' + TABS_MORE[lang].ksa + ')')}</h2>` +
    `<p class="muted" id="evMonthSub">${esc(month.sub)}</p><div class="table-scroll"><table class="hijri-grid" id="evMonth">${month.table}</table></div></section>` : '';
  const others = EVENTS.filter((x) => x[0] !== k).map((x) => ({ name: evName(lang, x[0]), href: url.event(lang, x[3]) }));
  const aliasQs = ((EV_ALIASES[lang] && EV_ALIASES[lang][k]) || []).map((q) => tpl(q, { year, hijriYear: Core.num(next.hy, ctx) }));
  const body = breadcrumbs(crumbs) + '<article class="card about guide event">' +
    `<h1>${esc(tpl(e.h1, { event: name, year }))}</h1><p class="answer" id="evAnswer">${esc(answer)}</p>` +
    (nightLine ? `<p>${esc(nightLine)}</p>` : '') +
    '<p id="evAdj" class="small" hidden></p>' +
    `<p class="ev-days" id="evDays">${esc(daysTo === 0 ? e.today : tpl(e.days, { n: Core.num(daysTo, ctx) }))}</p>` +
    `<p>${esc(e.desc[k])}</p>` + aliasQs.map((q) => `<h3>${esc(q)}</h3><p>${esc(`${answer} ${nightLine}`.trim())}</p>`).join('') + monthHtml +
    `<h2>${esc(tpl(e.years, { event: name }))}</h2><div class="table-scroll"><table class="city-table"><tbody>` +
    dates.map((x) => `<tr><th scope="row">${esc(hijriText(x.hy))}</th><td>${esc(gFull(x.gd))}</td></tr>`).join('') +
    '</tbody></table></div>' +
    `<p class="muted small">${esc(e.note)}</p>` +
    `<h2>${esc(e.more)}</h2>` + linkList(others.concat([{ name: g.hijriNav, href: url.hijri(lang) }])) +
    `<p class="muted small">${esc(tpl(t.updated, { date: Core.gregorian(...today, 'full', ctx) }))}</p></article>`;
  const title = fitTitle(tpl(e.title, { event: name, year }), lang);
  const desc = fitDesc(`${answer} ${e.desc[k]}`);
  addPage({
    lang, tag: langTag(lang), title, desc, path: pagePath, alternates: cluster((l) => url.event(l, slug)), indexable: true, body,
    jsonld: { '@graph': [
      { '@type': 'WebPage', '@id': abs(pagePath), url: abs(pagePath), name: title, description: desc, inLanguage: langTag(lang),
        dateModified: TODAY_ISO, isPartOf: { '@id': `${SITE}/#website` }, about: aboutThing(name, `https://en.wikipedia.org/wiki/${wiki}`),
        speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.guide h1', '#evAnswer'] } },
      { '@type': 'FAQPage', '@id': `${abs(pagePath)}#faq`, inLanguage: langTag(lang),
        mainEntity: [tpl(e.q, { event: name, year })].concat(aliasQs).map((q) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: `${answer} ${nightLine}`.trim() } })) },
      breadcrumbLd(crumbs),
    ] },
    data: clientData(lang, Object.assign({ kind: 'event', defaultSect: ci.defaultSect, evDate: `${next.gd.y}-${next.gd.m}-${next.gd.d}`, evH: [next.hy, hm, hd], firstDay: FIRST_DAY[lang] || 0, ksa: TABS_MORE[lang].ksa, evDays: e.days, evToday: e.today, defCountry: ci.country.slug }, hijriCountryData(lang))),
  });
}

/* ---------- Famous mosques and holy places ---------- */
// Facts and photos: src/landmarks.js, src/sites/ (credits.json), names: src/landmarks-names.json (Wikidata),
// descriptions: src/landmarks-i18n/<lang>.js, interface text: src/landmarks-ui.js.
const { LANDMARKS } = require('./src/landmarks');
const LM_NAMES = require('./src/landmarks-names.json');
const LM_GEO = require('./src/landmarks-geo.json');
const { UI: LM_UI } = require('./src/landmarks-ui');
const LM_CREDITS = JSON.parse(read('src/sites/credits.json'));
const LM_TEXT = {};
ALL_LANGS.forEach((l) => { if (l !== 'en') LM_TEXT[l] = require(`./src/landmarks-i18n/${l}`); });
// Each landmark belongs to the nearest city on the site (all are within 80 km of one).
LANDMARKS.forEach((lm) => {
  [lm.lat, lm.lng] = LM_GEO[lm.id] || [];
  if (lm.lat === undefined) { problems.push(`landmarks: no coordinates for ${lm.id}`); return; }
  let best = null;
  ALL_CITIES.forEach((ci) => { const km = Core.distanceKm(lm.lat, lm.lng, ci.lat, ci.lng); if (!best || km < best.km) best = { ci, km }; });
  lm.city = best.ci;
  if (best.km > 80) problems.push(`landmarks: ${lm.id} is ${Math.round(best.km)} km from the nearest city`);
  if (!LM_CREDITS[lm.id] || !fs.existsSync(path.join(ROOT, 'src', 'sites', `${lm.id}.jpg`))) problems.push(`landmarks: no photo or credit for ${lm.id}`);
  ALL_LANGS.forEach((l) => { if (l !== 'en' && !(LM_TEXT[l] || {})[lm.id]) problems.push(`landmarks: no ${l} text for ${lm.id}`); });
});
ALL_LANGS.forEach((l) => { if (!LM_UI[l]) problems.push(`landmarks-ui.js: no strings for ${l}`); });
const CITY_LANDMARKS = new Map();
LANDMARKS.forEach((lm) => { if (lm.city) CITY_LANDMARKS.set(lm.city, (CITY_LANDMARKS.get(lm.city) || []).concat(lm)); });
// Wikidata names; Pashto falls back to Persian, then English. Some labels start lower case ("mosquée Faisal").
function lmName(lm, lang) {
  const n = LM_NAMES[lm.id] || {}, name = n[lang] || (lang === 'ps' && n.fa) || n.en || lm.wiki;
  return name.charAt(0).toUpperCase() + name.slice(1);
}
const wikiUrl = (lm) => `https://en.wikipedia.org/wiki/${encodeURIComponent(lm.wiki.replace(/ /g, '_'))}`;
function landmarkCard(lang, lm, ctx, withCity) {
  const u = LM_UI[lang], cr = LM_CREDITS[lm.id], name = lmName(lm, lang);
  const text = lang === 'en' ? lm.en : LM_TEXT[lang][lm.id];
  const facts = [];
  if (lm.built) facts.push(`<span><b>${esc(u.built)}</b> ${esc(Core.num(lm.built, ctx))}</span>`);
  if (lm.cap) facts.push(`<span><b>${esc(u.cap)}</b> ${esc(tpl(u.capN, { n: Core.numGrouped(lm.cap, ctx) }))}</span>`);
  return `<article class="lm-card" id="${lm.id}"><img src="/sites/${lm.id}.jpg" alt="${esc(name)}" width="${cr.w}" height="${cr.h}" loading="lazy" decoding="async">` +
    `<div class="lm-body"><p class="lm-type">${esc(u.types[lm.type])}</p><h3>${esc(name)}</h3><p>${esc(text)}</p>` +
    (facts.length ? `<p class="lm-facts">${facts.join('')}</p>` : '') +
    (withCity ? `<p class="lm-links"><a href="${url.city(lang, lm.city)}">${esc(tpl(u.times, { city: nameIn(lm.city.names, lang, lm.city.country) }))}</a></p>` : '') +
    `<p class="lm-credit">${esc(u.photo)}: <a href="${esc(cr.page)}" rel="noopener nofollow" target="_blank">${esc(cr.artist)}</a>, ${esc(cr.license)} · ` +
    `<a href="${wikiUrl(lm)}" rel="noopener" target="_blank">${esc(u.source)}</a></p></div></article>`;
}
function landmarksNear(lang, ci, cityName, ctx) {
  const list = CITY_LANDMARKS.get(ci);
  if (!list) return '';
  const u = LM_UI[lang];
  return `<section class="card lm-near" aria-labelledby="lmNearH"><h2 id="lmNearH">${esc(tpl(u.near, { city: cityName }))}</h2>` +
    `<div class="lm-grid">${list.map((lm) => landmarkCard(lang, lm, ctx, false)).join('')}</div>` +
    `<p class="lm-all"><a href="${url.mosques(lang)}">${esc(u.all)}</a></p></section>`;
}
const lmSchemaType = (lm) => (/mosque|masjid|mezquita/i.test(lm.wiki) ? 'Mosque' : lm.type === 'shrine' ? 'PlaceOfWorship' : 'LandmarksOrHistoricalBuildings');
function mosquesPage(lang) {
  const t = STRINGS[lang], u = LM_UI[lang], ctx = ctxFor(lang, 'hanafi');
  const pagePath = url.mosques(lang);
  const crumbs = [{ name: t.home, href: url.home(lang) }, { name: u.h1, href: pagePath }];
  // Grouped by country, in the order of src/landmarks.js (Makkah and Madinah first).
  const groups = [];
  LANDMARKS.forEach((lm) => {
    let g = groups.find((x) => x.c === lm.city.country);
    if (!g) groups.push(g = { c: lm.city.country, items: [] });
    g.items.push(lm);
  });
  const body = breadcrumbs(crumbs) +
    `<article class="card about guide lm-head"><h1>${esc(u.h1)}</h1><p class="lede-text">${esc(u.lede)}</p></article>` +
    groups.map((g) => `<section class="lm-group" aria-labelledby="lm-${g.c.slug}"><h2 class="section-title" id="lm-${g.c.slug}">${esc(nameIn(g.c.name, lang))}</h2>` +
      `<div class="lm-grid">${g.items.map((lm) => landmarkCard(lang, lm, ctx, true)).join('')}</div></section>`).join('');
  addPage({
    lang, tag: langTag(lang), title: u.title, desc: u.desc, path: pagePath, alternates: cluster(url.mosques), indexable: true, body,
    jsonld: { '@graph': [
      { '@type': 'CollectionPage', '@id': abs(pagePath), url: abs(pagePath), name: u.title, description: u.desc, inLanguage: langTag(lang),
        dateModified: TODAY_ISO, isPartOf: { '@id': `${SITE}/#website` },
        mainEntity: { '@type': 'ItemList', numberOfItems: LANDMARKS.length, itemListElement: LANDMARKS.map((lm, i) => ({ '@type': 'ListItem', position: i + 1,
          item: { '@type': lmSchemaType(lm), name: lmName(lm, lang), image: abs(`/sites/${lm.id}.jpg`), sameAs: wikiUrl(lm),
            geo: { '@type': 'GeoCoordinates', latitude: lm.lat, longitude: lm.lng } } })) } },
      breadcrumbLd(crumbs),
    ] },
    data: clientData(lang, { kind: 'mosques', defaultSect: 'hanafi' }),
  });
}

/* ---------- Ramadan timetable per city ---------- */
// The home page features Ramadan timetables from this many days before Ramadan until it ends,
// and on the first of those days (and two weeks before) the deploy sends the Ramadan pages to IndexNow.
const RAMADAN_LEAD = +process.env.RAMADAN_LEAD || 70; // env override only for testing
function ramadanWindow() {
  if (!RAMADAN) return null;
  const start = Date.UTC(RAMADAN.y, RAMADAN.m - 1, RAMADAN.d), today = Date.UTC(...ymd(NOW, 'UTC').map((v, i) => (i === 1 ? v - 1 : v)));
  const daysTo = Math.round((start - today) / 864e5);
  return { daysTo, open: daysTo <= RAMADAN_LEAD && daysTo > -RAMADAN.n };
}
// Cities for the home section: English gets the worldwide list; other languages the main cities of the
// countries that speak them (pages that are indexed in that language).
// The main cities of the countries that speak a language, taken in turn from each country, largest first,
// skipping any city within 80 km of one already chosen (its times would be almost the same).
function spreadCities(lang, n) {
  const countries = COUNTRIES.filter((c) => c.langs.includes(lang));
  const out = [];
  for (let i = 0; out.length < n && countries.some((c) => c.cities[i]); i++) {
    countries.forEach((c) => {
      const ci = c.cities[i];
      if (ci && out.length < n && out.every((o) => Core.distanceKm(o.lat, o.lng, ci.lat, ci.lng) >= 80)) out.push(ci);
    });
  }
  return out;
}
function ramadanCities(lang) {
  if (lang === 'en') return GLOBAL_CITIES.map(cityByPath);
  return spreadCities(lang, 10);
}
// "Prayer times now": English gets cities around the world, other languages the main cities of the countries that speak them.
const LIVE_EN = ['saudi-arabia/makkah', 'saudi-arabia/madinah', 'uk/london', 'usa/new-york', 'pakistan/karachi', 'bangladesh/dhaka',
  'indonesia/jakarta', 'turkey/istanbul', 'egypt/cairo', 'uae/dubai', 'malaysia/kuala-lumpur', 'india/new-delhi',
  'saudi-arabia/riyadh', 'saudi-arabia/jeddah', 'pakistan/lahore', 'pakistan/islamabad', 'india/mumbai', 'india/hyderabad',
  'uae/abu-dhabi', 'qatar/doha', 'kuwait/kuwait-city', 'oman/muscat', 'bahrain/manama', 'jordan/amman', 'iraq/baghdad', 'iran/tehran',
  'turkey/ankara', 'egypt/alexandria', 'morocco/casablanca', 'algeria/algiers', 'tunisia/tunis', 'nigeria/lagos', 'nigeria/kano',
  'bangladesh/chattogram', 'afghanistan/kabul', 'uzbekistan/tashkent', 'uk/birmingham', 'france/paris', 'germany/berlin',
  'russia/moscow', 'usa/chicago', 'usa/houston', 'canada/toronto', 'australia/sydney', 'south-africa/johannesburg'];
// Cards shown before "See all cities" (the rest stay in the page, hidden until asked for).
LIVE_EN.forEach((p) => { if (!cityByPath(p)) problems.push(`live cards: unknown city ${p}`); });
function liveCities(lang) {
  if (lang === 'en') return LIVE_EN.map(cityByPath).filter(Boolean);
  return spreadCities(lang, 20);
}
// Each card: city, country, local time, next prayer and a countdown. Drawn here for the build time;
// the browser redraws them for the visitor's moment and ticks every second.
function liveSection(lang, cities) {
  if (!cities.length) return '';
  const g = GUIDES[lang], t = STRINGS[lang];
  const cards = cities.map((ci, i) => {
    const ctx = ctxFor(lang, ci.defaultSect), loc = locOf(ci, lang), s = Core.snapshot(loc, ctx, NOW);
    const name = s.next.tomorrow ? `${t.prayers.fajr} ${t.tomorrow}` : t.prayers[s.next.key];
    return `<li><a class="country-card live-card" href="${url.city(lang, ci)}" data-live="${i}">` +
      `<span class="cc-name">${esc(loc.name)}</span><span class="muted">${esc(nameIn(ci.country.name, lang))}</span>` +
      `<span class="lc-row"><span class="muted">${esc(t.localTime)}</span> <bdi class="lc-clock">${esc(Core.fmtTime(NOW, ci.tz, ctx))}</bdi></span>` +
      `<span class="lc-row"><span class="muted">${esc(t.next)}</span> <b class="lc-next">${esc(name)}</b> <bdi class="lc-at">${esc(Core.fmtTime(s.next.at, ci.tz, ctx))}</bdi></span>` +
      `<span class="lc-in" hidden><span class="lc-label"></span> <bdi class="lc-cd"></bdi></span></a></li>`;
  }).join('');
  return `<section class="continent live" aria-labelledby="liveH"><h2 class="section-title" id="liveH">${esc(g.liveH)}</h2><ul class="country-grid live-grid" id="liveCards">${cards}</ul></section>`;
}
function ramadanHome(lang, ctx) {
  const w = ramadanWindow();
  if (!w || !w.open) return '';
  const g = GUIDES[lang], t = STRINGS[lang], cities = ramadanCities(lang);
  if (!cities.length) return '';
  const first = Core.gregorian(RAMADAN.y, RAMADAN.m, RAMADAN.d, 'full', ctx);
  return '<section class="continent ramadan-home" aria-labelledby="ramHomeH">' +
    `<h2 class="section-title" id="ramHomeH">${esc(tpl(g.ramHomeH, { year: Core.num(RAMADAN.y, ctx) }))}</h2>` +
    `<p class="muted">${esc(tpl(g.aRamStart, { hijri: `${Core.num(RAMADAN.hy, ctx)} ${t.hijriEra}`, date: first }))}</p>` +
    '<ul class="country-grid">' + cities.map((ci) => `<li><a class="country-card" href="${url.ramadan(lang, ci)}"><span class="cc-name">${esc(nameIn(ci.names, lang, ci.country))}</span>` +
      `<span class="muted">${esc(nameIn(ci.country.name, lang))}</span></a></li>`).join('') + '</ul></section>';
}
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
  if (KW.RAMADAN[lang]) {
    const fd = (x) => Core.gregorian(x.d.y, x.d.m, x.d.d, 'full', ctx), ft = (x) => Core.fmtTime(x, loc.tz, ctx);
    const last = r.days[r.days.length - 1], d27 = r.days[Math.min(26, r.days.length - 1)], eid = Core.addDays(last.d.y, last.d.m, last.d.d, 1);
    const v = { city: cityName, year, date: firstDate, sehri: ft(r.first.tt.fajr), iftar: ft(r.first.tt.maghrib),
      lastDate: fd(last), lastSehri: ft(last.tt.fajr), lastIftar: ft(last.tt.maghrib), date27: fd(d27), sehri27: ft(d27.tt.fajr), iftar27: ft(d27.tt.maghrib),
      eidDate: Core.gregorian(eid.y, eid.m, eid.d, 'full', ctx) };
    KW.RAMADAN[lang].forEach(([q, a]) => faq.push({ q: tpl(q, v), a: tpl(a, v) }));
  }
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
    lang, tag, title, desc, path: pagePath, alternates: scopedCluster((l) => url.ramadan(l, ci), c), indexable: inScope(lang, c), body, og: c.slug,
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
    data: clientData(lang, { kind: 'widget', defaultSect: 'hanafi', site: SITE, embedUrl: url.embed(lang), credit: g.wCredit,
      cl: Object.fromEntries([...LANGS_OF].filter(([, v]) => v)) }),
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
  console.error('Build stopped:\n  ' + problems.slice(0, +(process.env.SHOW_PROBLEMS || 80)).join('\n  ') + (problems.length > 80 ? `\n  ...and ${problems.length - 80} more` : ''));
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
    if (!built(lang, c)) return;
    const pages = () => { countryPage(lang, c); c.cities.forEach((ci) => { cityPage(lang, ci); ramadanPage(lang, ci); if (hasPrayerPages(lang, ci)) EG_KEYS.forEach((k) => cityPrayerPage(lang, ci, k)); }); };
    if (NATIONAL_CAL[c.slug]) withCalendar(NATIONAL_CAL[c.slug], pages); else pages();
  });
  nearPage(lang);
  aboutPage(lang);
  prayersHub(lang);
  GUIDE_PRAYERS.forEach((k) => prayerPage(lang, k));
  if (REFS[lang]) REF_KEYS.forEach((k) => refPage(lang, k));
  if (LEARN[lang]) { evidencePage(lang); wuduPage(lang); rakahsPage(lang); NAFL_PAGES.forEach((k) => naflPage(lang, k)); namesPage(lang); if (PN[lang]) prophetNamesPage(lang); }
  hijriPage(lang);
  EVENTS.forEach((e) => eventPage(lang, e));
  methodsHub(lang);
  METHOD_KEYS.forEach((k) => methodPage(lang, k));
  qiblaPage(lang);
  mosquesPage(lang);
  widgetPage(lang);
  embedPage(lang);
});
legalPages();

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
Object.values(FONT_FILES).forEach((f) => write(f.url.slice(1), f.buf));
// Share cards and logo made by scripts/og-images.js (npm run og).
fs.readdirSync(path.join(ROOT, 'src', 'og')).forEach((f) => write(`og/${f}`, fs.readFileSync(path.join(ROOT, 'src', 'og', f))));
write('logo.png', fs.readFileSync(path.join(ROOT, 'src', 'logo.png')));
LANDMARKS.forEach((lm) => write(`sites/${lm.id}.jpg`, fs.readFileSync(path.join(ROOT, 'src', 'sites', `${lm.id}.jpg`))));
write(ASSET.jsLite.slice(1), JS_LITE);
write(ASSET.moon.slice(1), JS_MOON);
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
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'];
  pages.filter((p) => p.indexable && p.lang === lang).forEach((p) => {
    // hreflang lives in each page's HTML only; repeating it here made the sitemaps ~131 MB.
    // No lastmod: the build date is not a content change date, and a constant one gets ignored.
    lines.push('<url>', `<loc>${abs(p.path)}</loc>`, '</url>');
  });
  lines.push('</urlset>');
  const file = `sitemaps/${lang}.xml`;
  write(file, lines.join('\n') + '\n');
  sitemapFiles.push(file);
});
write('sitemap.xml', ['<?xml version="1.0" encoding="UTF-8"?>',
  '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sitemapFiles.map((f) => `<sitemap><loc>${SITE}/${f}</loc></sitemap>`),
  '</sitemapindex>', ''].join('\n'));

{
  const w = ramadanWindow(), flag = path.join(ROOT, '.indexnow-ramadan');
  if (w && (w.daysTo === RAMADAN_LEAD || w.daysTo === 14)) fs.writeFileSync(flag, String(w.daysTo)); else fs.rmSync(flag, { force: true });
}

// llms.txt: a plain summary for AI assistants and answer engines (https://llmstxt.org).
write('llms.txt', [
  `# ${BRAND_FULL}`, '',
  `> Daily prayer (namaz/salah) times for ${ALL_CITIES.length} cities in ${COUNTRIES.length} countries, in ${ALL_LANGS.length} languages, for the Hanafi, Shafi'i, Maliki, Hanbali and Jafria schools. Includes Ishraq, Chasht, Awwabin and Tahajjud (or Salat al-Layl), monthly timetables, Hijri dates and Qibla direction.`, '',
  'Times are calculated from the sun\'s position at each city\'s coordinates with the open-source adhan library. Methods and angles per country are listed on the methodology page. Local mosques may differ by a few minutes.', '',
  '## Key pages', '',
  `- [How the times are calculated](${SITE}${url.about('en')}): methods, angles, sect rules, Hijri calendar`,
  `- [All countries](${SITE}/): home page`,
  ...(HAS_CONTACT ? [`- [Contact](${SITE}${url.contact()}): report a wrong time or a missing city`] : []),
  `- [Prayer times near me](${SITE}${url.near('en')})`,
  `- [The five daily prayers and Jumu‘ah](${SITE}${url.prayers('en')}): when each prayer starts and ends, rak‘ahs, school differences`,
  ...GUIDE_PRAYERS.map((k) => `  - [${STRINGS.en.prayers[k]}](${SITE}${url.prayer('en', k)})`),
  `- [Islamic date today and Hijri calendar](${SITE}${url.hijri('en')}): Umm al-Qura months and upcoming Ramadan and Eid dates`,
  `- [Prayer time calculation methods](${SITE}${url.methods('en')}): Fajr and Isha angles and safety minutes of each method, and which countries use it`,
  `- Islamic dates: ${EVENTS.map((e) => `[${EV.en.names[e[0]] || GUIDES.en.ev[e[0]]}](${SITE}${url.event('en', e[3])})`).join(', ')} (next date, countdown, next three years)`,
  `- [Famous mosques and holy places](${SITE}${url.mosques('en')}): Masjid al-Haram, the Prophet's Mosque, Al-Aqsa and ${LANDMARKS.length - 3} more, with short histories and photos`,
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
// Security policy. Scripts, styles and fonts only from this site (plus inline <style>); JSON data
// blocks are never executed. The only frame is the
// Google Maps mosque embed; nothing may frame this site.
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
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
  // Dari and Dhivehi pages were retired on 1 Oct 2026: Dari to the same page in Persian, Dhivehi to English.
  `  RewriteRule ^prs/(.*)$ ${SITE}/fa/$1 [L,R=301]`,
  `  RewriteRule ^dv/(.*)$ ${SITE}/$1 [L,R=301]`,
  // Since 6 Oct 2026 a country's pages exist only in its own languages (outside Europe, the USA, Canada and Russia);
  // the other language copies go to the English page.
  ...[...LANGS_OF].filter(([, ls]) => ls).map(([slug, ls]) => {
    const gone = ALL_LANGS.filter((l) => l !== 'en' && !ls.includes(l));
    return gone.length ? `  RewriteRule ^(${gone.join('|')})/${slug}/(.*)$ ${SITE}/${slug}/$2 [L,R=301]` : '';
  }).filter(Boolean),
  '</IfModule>',
  'ErrorDocument 404 /404.html',
  'AddDefaultCharset utf-8',
  'AddType application/json .json',
  'AddType text/plain .txt',
  'AddType font/woff2 .woff2',
  '<IfModule mod_deflate.c>',
  '  AddOutputFilterByType DEFLATE text/html text/css text/plain text/xml application/javascript application/json application/xml image/svg+xml',
  '</IfModule>',
  '<IfModule mod_headers.c>',
  '  <FilesMatch "\\.[0-9a-f]{10}\\.(css|js|json|woff2)$">',
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
