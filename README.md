# SalaahDaily (أوقات الصلاة)

Live at https://salaahdaily.com. The header shows `SalaahDaily أوقات الصلاة | <Prayer Times in the page's language> · Prayer Times` (phones show only the brand and its Arabic tagline). Page titles end in `| SalaahDaily`; schema lists أوقات الصلاة and the old name Awqat as-Salah as alternate names. The name is set in `site.config.js` (`siteName`, `siteNameAr`).

Prayer times for 879 cities and towns in 51 countries, in 15 languages: English, Urdu, Hindi, Bengali, Indonesian, Malay, Persian, Dari, Pashto, Dhivehi, Spanish, French, Arabic, Turkish and Hausa. Every page exists in every language.

Countries covered:
- **Asia:** Pakistan, India, Bangladesh, Afghanistan, Maldives, Indonesia, Malaysia, Brunei.
- **Middle East:** Saudi Arabia, UAE, Qatar, Bahrain, Kuwait, Oman, Yemen, Iraq, Iran, Syria, Jordan, Lebanon, Palestine, Israel, Turkey, Cyprus.
- **Africa:** Egypt, Nigeria.
- **Europe:** UK.
- **Oceania:** Australia.
- **North America:** all 23 countries (USA, Canada, Mexico, Central America and the Caribbean).

## Commands

Build every page into `dist/` (about 27,600 pages and 1.8 GB; the upload zip is about 410 MB). Pages are written to disk as they are made, so memory stays flat:

```bash
npm run build
```

Audit `dist/` for SEO, hreflang, link and crawl problems (exits with an error if it finds any):

```bash
npm run check
```

Preview locally at http://localhost:5500:

```bash
npm run serve
```

Regenerate the share cards (`src/og/*.jpg`, one per country) and `src/logo.png` after adding a country or changing the brand. It uses the Chrome or Edge on this machine:

```bash
npm run og
```

Notify IndexNow engines (Bing, Yandex) after each upload:

```bash
npm run indexnow
```

## Before you deploy

1. Set your domain in `site.config.js`. Canonical URLs, hreflang links, sitemaps and `llms.txt` are all built from it.
2. Run `npm run build` and then `npm run check`.
3. Upload the **contents** of `dist/` to your web root (for Hostinger, `public_html`). The `.htaccess` file adds the 404 page, compression and caching.
4. Rebuild and re-upload **every day**. Live times update in the browser, but the times search engines read come from the build date.
5. Submit `https://your-domain/sitemap.xml` in Google Search Console and Bing Webmaster Tools, then run `npm run indexnow`.

## URLs

| Page | English (x-default) | Other languages |
|---|---|---|
| Home | `/` | `/ur/`, `/es/`… |
| Country | `/pakistan/` | `/ur/pakistan/` |
| City | `/pakistan/lahore/` | `/ur/pakistan/lahore/` |
| Near me | `/near-me/` | `/ur/near-me/` |
| How we calculate | `/about/` | `/ur/about/` |

## SEO, AEO and GEO

**Search engines (SEO):**
- **Real HTML:** every page is fully written, with today's times, a monthly timetable and quick answers already in the page.
- **Language tags:** each page links to all 15 language versions. A country's own languages get region tags (`ur-PK`, `es-MX`, `fr-CA`). Dari is `fa-AF`, and English is `x-default`.
- **Titles and descriptions:** unique on every page. Titles that would be cut off in search results drop the site name, then the country (only when the city name is unique).
- **Sitemaps:** one sitemap per language, listed in `sitemap.xml`, with hreflang alternates.
- **Structured data:** JSON-LD with Organization, WebSite, WebPage (`dateModified`), City coordinates, BreadcrumbList, FAQPage and AboutPage.
- **Snippets:** `max-snippet:-1` and `max-image-preview:large` allow full snippets.
- **Crawl depth:** every page is at most 3 clicks from the home page. `npm run check` fails on orphan pages.

**Answer engines (AEO):**
- **Quick answers:** every city page has 6 questions with direct answers ("When does Fajr end in Lahore today?"). Answers state the date they're for and use real values, marked up as FAQPage. The browser updates them to today and to the visitor's sect.
- **Summary sentence:** each city page opens with a one-line answer ("Today in Lahore, Fajr is at… and Maghrib is at…").
- **Country pages:** a table of today's five times for every city.

**Generative engines (GEO):**
- **Methodology page:** `/about/` explains the method and angles per country, the sect rules, the nafl rules and the Hijri calendar. Every city page links to it.
- **llms.txt:** a plain summary of the site, its coverage and URL patterns for AI assistants.
- **robots.txt:** explicitly allows search and AI crawlers (Googlebot, Bingbot, GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended).
- **Freshness:** every page carries a visible "Last updated" date and `dateModified` in its structured data.

## Speed

Lighthouse (mobile, slow 4G) scores 100 for Performance, Accessibility, Best Practices and SEO on the home, country, city and about pages. Largest paint is 1.1 to 1.3 s.

- **CSS:** inlined in each page. Fonts load in the background, and the one script is deferred.
- **Lighter script where possible:** the home and about pages skip the prayer-calculation library.
- **Lazy loading:** home search loads its city index only when someone types. The mosque map loads only when scrolled near.
- **Small pages:** they average 13.5 KB compressed.

Keep it this way: no render-blocking CSS or JS, and re-run Lighthouse after big changes.

## Sects

A sect picker appears on every page, and the visitor's choice is remembered. Until they choose, each country shows its majority school (`defaultSect` in `src/data.js`): Hanafi in South Asia, Afghanistan, Turkey, Cyprus, Syria and North America; Shafi'i in Southeast Asia, the Maldives, Egypt, Jordan, Lebanon, Palestine, Israel, Oman and Yemen; Maliki in the UAE, Kuwait and Nigeria; Hanbali in Saudi Arabia and Qatar; Jafria in Iran, Iraq and Bahrain.

| Sect | Method | Asr |
|---|---|---|
| Hanafi | Country method | Shadow twice the object's length |
| Shafi'i, Maliki, Hanbali | Country method | Shadow equal to the object's length (identical times) |
| Jafria | Jafari, Leva Institute, Qum (16°/14°, Maghrib 4°). In Iran: Tehran (17.7°/14°, Maghrib 4.5°) | Shadow equal to the object's length |

| Country | Method (Fajr/Isha) |
|---|---|
| Pakistan, India, Bangladesh, Afghanistan | Karachi (18°/18°) |
| Indonesia | Kemenag (20°/18°, plus 2-3 min ihtiyat; matches Kemenag within 1 min) |
| Malaysia | JAKIM (18°/18°, plus 2 min ihtiyat; matches e-solat.gov.my within 1-2 min) |
| Brunei | 20°/18° (not yet checked against an official timetable) |
| Iran, Maldives, Australia, Bahrain, Oman, Yemen, Iraq, Syria, Jordan, Lebanon, Palestine, Israel, Nigeria | Muslim World League (18°/17°) |
| Saudi Arabia | Umm al-Qura (18.5°, Isha 90 min after Maghrib) |
| UAE / Qatar / Kuwait | Dubai (18.2°/18.2°) / Qatar (18°, Isha 90 min) / Kuwait (18°/17.5°) |
| Egypt | Egyptian General Authority of Survey (19.5°/17.5°) |
| Turkey, Cyprus | Diyanet (18°/17°) |
| USA, Canada, Mexico, Central America, Caribbean | ISNA (15°/15°) |
| UK | Moonsighting Committee (seasonal, for high latitudes) |

## Nafl prayers

| Prayer | From | To |
|---|---|---|
| Ishraq | Sunrise + 15 minutes | Start of Chasht |
| Chasht (Duha) | Sunrise + a quarter of the day | Dhuhr − 10 minutes |
| Awwabin | Maghrib | Isha |
| Tahajjud | Last third of the night | Fajr |
| Salat al-Layl (Jafria only) | Midnight (halfway between sunset and Fajr) | Fajr |

## Explainer pages

Built from `src/guides.js` (one block per language; the build stops if any string is missing):

- `/prayers/` and `/prayers/{fajr,dhuhr,asr,maghrib,isha,jumuah}/`: when each prayer starts and ends, rak‘ahs, and where the schools differ (including Jafari timing). A live line shows the prayer's window for the visitor's last city, or a default city per language. FAQPage and speakable schema; `about` points to the Wikipedia article.
- `/hijri-calendar/`: today's Hijri date (visitor's time zone and Hijri adjustment), the months of the year with Gregorian start dates, and the next Ramadan, Eid, Arafah, New Year and Ashura, all from the Umm al-Qura calendar.
- City pages have a Jumu‘ah section (next 4 Fridays) and a Jumu‘ah quick answer; prayer names, the Hijri date and the Asr rule link to these pages, and every page's footer has a Learn column.
- Turkey and Cyprus default to the first Asr time, matching Diyanet's official timetable.

Build the upload zip with the Windows tar (Git Bash's tar does not compress): `C:WindowsSystem32	ar.exe -a -c -f site.zip -C dist .`

## Ramadan, methods, Qibla and the mosque widget

Strings are in `src/guides3.js` (merged into `GUIDES`).

- `/{country}/{city}/ramadan/` in all 15 languages: sehri (Fajr) and iftar (Maghrib) for every day of the next Ramadan, from the Umm al-Qura calendar, with a sect picker; the visitor's Hijri adjustment shifts the start. Linked from each city page and from each country page (so every page stays within 3 clicks).
- `/methods/` and `/methods/{slug}/`: angles, Isha interval, Maghrib angle and safety minutes are read from the engine (`Core.paramsFor`), so the pages always match the calculation. The about page and each city page's method line link here.
- `/qibla/`: Qibla from the visitor's location (button) and from each country's first city.
- `/mosque-widget/`: builder that writes an iframe plus a plain credit link (the backlink). The iframe shows `/embed/?c=<country>/<city>&s=<school>` (per language, `noindex`). `dist/<lang>/embed/.htaccess` lets any site frame that page; every other page still refuses framing.

## Mosques map

Each city page embeds a Google Map that searches "mosque" around the city's exact coordinates. It uses the keyless embed; the key-based Maps Embed API was tested and showed fewer pins.

## Editing content

- **Countries, regions and main cities** are in `src/data.js` and `src/data-mea.js` (Middle East, Egypt, Nigeria; Arabic and Turkish names inline).
- **Additional major towns** are in `src/towns.js`. Each line holds the name, coordinates and names in Urdu, Hindi, Bengali and Persian. A town joins the region with the same English name, or creates it.
- **Place names in other languages** are in `src/names.js`, keyed by English name. The build stops and names anything missing in Urdu, Hindi, Bengali or Persian. Arabic names come from the `arabic` map there, otherwise from the Persian name converted to Arabic letters (`toArabic`).
- **Interface text** is in `src/i18n.js`, one block per language.
- **Styles** are in `src/style.css`, and the engine is in `src/core.js` (shared by the build and the browser).
