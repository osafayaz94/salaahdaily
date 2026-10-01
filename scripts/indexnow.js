/*
 * Tell IndexNow search engines (Bing, Yandex, Seznam, Naver...) that every URL in the sitemap changed.
 * Run it only after the new build is live on your domain: `npm run indexnow`.
 * Google doesn't use IndexNow; it discovers changes through the sitemap in Search Console.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const CONFIG = require('../site.config');

const SITE = CONFIG.siteUrl.replace(/\/+$/, '');
const KEY = CONFIG.indexNowKey;

if (/example\.com/.test(SITE)) { console.error('Set siteUrl in site.config.js first.'); process.exit(1); }
if (!KEY) { console.error('Set indexNowKey in site.config.js first.'); process.exit(1); }

// sitemap.xml is an index; the page URLs are in the per-language sitemaps it lists.
const dir = path.join(__dirname, '..', 'dist', 'sitemaps');
const all = fs.readdirSync(dir).filter((f) => f.endsWith('.xml')).flatMap((f) =>
  Array.from(fs.readFileSync(path.join(dir, f), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g), (m) => m[1]));
// --ramadan: only the Ramadan timetables (sent before Ramadan; see the deploy workflow).
const urls = process.argv.includes('--ramadan') ? all.filter((u) => u.includes('/ramadan/')) : all;
console.log(`Found ${urls.length} page URLs.`);

(async () => {
  // The key file must be reachable on the live site, or the submission is rejected.
  const keyUrl = `${SITE}/${KEY}.txt`;
  const check = await fetch(keyUrl);
  if (!check.ok || (await check.text()).trim() !== KEY) {
    console.error(`${keyUrl} is not live yet. Upload dist/ first.`);
    process.exit(1);
  }
  for (let i = 0; i < urls.length; i += 10000) {
    const batch = urls.slice(i, i + 10000);
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: keyUrl, urlList: batch }),
    });
    console.log(`Submitted ${batch.length} URLs: HTTP ${res.status}`);
    if (res.status >= 400) process.exit(1);
  }
})();
