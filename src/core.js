/*
 * Shared engine: prayer calculation, localized formatting and the HTML for the live parts of a page.
 * Runs in Node (build.js pre-renders every page) and in the browser (client.js keeps it live).
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(require('./vendor/adhan.umd.min.js'));
  else root.Core = factory(root.adhan);
}(typeof self !== 'undefined' ? self : this, function (A) {
  'use strict';

  var PRAYERS = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];
  var ARABIC = { fajr: 'الفجر', sunrise: 'الشروق', dhuhr: 'الظهر', asr: 'العصر', maghrib: 'المغرب', isha: 'العشاء', jumuah: 'الجمعة' };
  var BISMILLAH = 'بِسْمِ ٱللّٰهِ ٱلرَّحْمٰنِ ٱلرَّحِيمِ';
  var KAABA = { lat: 21.4225, lng: 39.8262 };
  var SECTS = ['hanafi', 'shafii', 'maliki', 'hanbali', 'jafria'];
  // Hanafi Asr starts when a shadow is twice an object's length; the others at one length.
  var SECT_ASR = { hanafi: 'Hanafi', shafii: 'Shafi', maliki: 'Shafi', hanbali: 'Shafi', jafria: 'Shafi' };

  var METHOD_EN = {
    Karachi: 'University of Islamic Sciences, Karachi',
    MuslimWorldLeague: 'Muslim World League',
    Egyptian: 'Egyptian General Authority of Survey',
    UmmAlQura: 'Umm al-Qura University, Makkah',
    Dubai: 'Dubai',
    Qatar: 'Qatar',
    Kuwait: 'Kuwait',
    MoonsightingCommittee: 'Moonsighting Committee Worldwide',
    NorthAmerica: 'ISNA (North America)',
    Singapore: 'MUIS, Singapore',
    Turkey: 'Diyanet, Turkey',
    Kemenag: 'Kemenag, Indonesia',
    JAKIM: 'JAKIM, Malaysia',
    Brunei: 'Brunei',
    Tehran: 'Institute of Geophysics, University of Tehran',
    Jafari: 'Jafari (Leva Institute, Qum)',
    Bosnia: 'Islamic Community of Bosnia and Herzegovina',
    Kosovo: 'Kosovo (fitted to the BIK takvim)',
    DiyanetEurope: 'Diyanet (DITIB), Europe',
    ParisGMP: 'Grande Mosquée de Paris (fitted to its calendar)',
    IGGO: 'IGGÖ, Islamic Religious Community in Austria',
    EMB: 'Muslim Executive of Belgium (fitted to its calendar)',
    Tatarstan: 'DUM RT, Spiritual Administration of Muslims of Tatarstan',
    Dagestan: 'Muftiate of the Republic of Dagestan (fitted to its timetable)',
    QMI: 'Caucasus Muslims Board (QMİ), Baku',
    DUMU: 'DUMU, Spiritual Administration of Muslims of Ukraine',
    Kazakhstan: 'Spiritual Administration of Muslims of Kazakhstan (QMDB)',
    ACJU: 'All Ceylon Jamiyyathul Ulama (fitted to its timetable)',
    Morocco: 'Ministry of Habous and Islamic Affairs, Morocco (fitted to its timetable)',
    Algeria: 'Ministry of Religious Affairs, Algeria (fitted to its calendar)',
    Uzbekistan: 'Muslim Board of Uzbekistan (fitted to its calendar)',
    Kyrgyzstan: 'Spiritual Administration of Muslims of Kyrgyzstan (fitted to its timetable)',
  };
  // Addresses of the method pages (/methods/<slug>/).
  var METHOD_SLUG = {
    Karachi: 'karachi', MuslimWorldLeague: 'muslim-world-league', NorthAmerica: 'isna', MoonsightingCommittee: 'moonsighting-committee',
    Kemenag: 'kemenag', JAKIM: 'jakim', Brunei: 'brunei', Tehran: 'tehran', Jafari: 'jafari', UmmAlQura: 'umm-al-qura',
    Dubai: 'dubai', Qatar: 'qatar', Kuwait: 'kuwait', Egyptian: 'egyptian', Turkey: 'diyanet',
    Bosnia: 'bosnia', Kosovo: 'kosovo', DiyanetEurope: 'diyanet-europe', ParisGMP: 'grande-mosquee-de-paris', IGGO: 'iggo-austria', EMB: 'emb-belgium',
    Tatarstan: 'dum-rt-tatarstan', Dagestan: 'muftiate-dagestan', QMI: 'qmi-caucasus', DUMU: 'dumu-ukraine',
    Singapore: 'muis-singapore', ACJU: 'acju-sri-lanka', Morocco: 'habous-morocco', Algeria: 'marw-algeria', Kazakhstan: 'qmdb-kazakhstan', Uzbekistan: 'muslim-board-uzbekistan', Kyrgyzstan: 'muftiyat-kyrgyzstan',
  };
  // Methods a visitor can pick in Settings for Hanafi, Shafi'i, Maliki and Hanbali.
  var SELECTABLE = ['Karachi', 'MuslimWorldLeague', 'Egyptian', 'UmmAlQura', 'Dubai', 'Qatar', 'Kuwait',
    'MoonsightingCommittee', 'NorthAmerica', 'Singapore', 'Turkey', 'Kemenag', 'JAKIM'];

  function angles(fajr, isha, maghrib, adjust) {
    return function () {
      var p = A.CalculationMethod.Other();
      p.fajrAngle = fajr;
      p.ishaAngle = isha;
      if (maghrib) p.maghribAngle = maghrib;
      if (adjust) p.methodAdjustments = adjust;
      return p;
    };
  }
  // Methods adhan doesn't ship, built from their published angles. The minute offsets are each
  // body's safety margin (ihtiyat), fitted to the official timetables in September 2026:
  //   JAKIM: 15 zone/date samples from e-solat.gov.my, all prayers within 1-2 min.
  //   Kemenag: Jakarta, Medan and Makassar (Kemenag data via api.myquran.com), within 1 min.
  var CUSTOM = {
    Kemenag: angles(20, 18, 0, { fajr: 2, sunrise: -3, dhuhr: 3, asr: 3, maghrib: 3, isha: 2 }),
    JAKIM: angles(18, 18, 0, { fajr: 2, sunrise: 0, dhuhr: 2, asr: 2, maghrib: 2, isha: 2 }),
    Brunei: angles(20, 18),
    Jafari: angles(16, 14, 4),
    // Islamic Community of BiH (vaktija.ba): 13 samples, 5 cities, 4 seasons, almost all within 1 min.
    Bosnia: angles(18, 16, 0, { fajr: 0, sunrise: -6, dhuhr: 1, asr: 0, maghrib: 6, isha: 0 }),
    // Not BIK's published method: the closest fit to its takvim (27 dates, Prishtina), Fajr and Isha within 3 min.
    Kosovo: angles(18.5, 16.5, 0, { fajr: -2, sunrise: -7, dhuhr: 4, asr: 6, maghrib: 8, isha: 13 }),
    // Diyanet: adhan's Turkey method with Asr and Maghrib offsets checked against Diyanet's own timetables
    // (Istanbul, Ankara, Berlin, Cologne, Munich, Hamburg, Paris, Lyon, Sept-Oct 2026): Asr +2 and Maghrib +1 on adhan's.
    Turkey: diyanet(0),
    // Diyanet's timetables for Europe (used by DITIB mosques) put Isha 5 min earlier than in Turkey.
    DiyanetEurope: diyanet(-5),
    // IGGÖ (Austria) unified calendar since 2023: the same numbers as Diyanet's European timetable
    // (Vienna, Graz, Bregenz, Sept 2026: within 1 min); its own entry so pages name the right authority.
    IGGO: diyanet(-5),
    // Muslim Executive of Belgium, fitted to its 2026 calendar: winter exact; in summer its Isha is up to
    // ~20 min earlier than this (its summer rule is not published).
    EMB: angles(18, 17, 0, { fajr: 0, sunrise: -2, dhuhr: 0, asr: 1, maghrib: 2, isha: 7 }),
    // Grande Mosquée de Paris: fitted to its September 2026 calendar (not a published method). Isha is always
    // 87 min after Maghrib; Fajr at 15.75° lands within 2 min; Asr by one shadow length.
    // DUM RT (Tatarstan): its 2026 timetable (dumrt.ru, 45 towns, every day of the year) is 18° and 15°, times
    // rounded up. On nights when the Sun never gets 18° below the horizon it prints Fajr 121 min before sunrise
    // and Isha 90 min after Maghrib (Kazan, 2 May to 8 Aug).
    Tatarstan: function () {
      var p = angles(18, 15, 0, { fajr: -1, sunrise: 0, dhuhr: 0, asr: 1, maghrib: 0, isha: 0 })();
      p.rounding = A.Rounding.Up;
      p.fixedSummer = { angle: 18, fajr: 121, isha: 90 };
      return p;
    },
    // DUMU (Spiritual Administration of Muslims of Ukraine): its 2026 calendars (islam.ua; Kyiv and Kharkiv, every
    // day) put Fajr 100 min before its sunrise and Isha 90 min after its Maghrib, 100 min from June to August
    // with a one-minute-a-day step in late May and early September. Sunrise -9, Maghrib +9: within 1-2 min.
    DUMU: function () {
      var p = angles(18, 17, 0, { fajr: 0, sunrise: -9, dhuhr: 5, asr: 5, maghrib: 9, isha: 0 })();
      p.fixedIntervals = {
        fajr: 100,
        isha: function (y, m, d) {
          var n = (Date.UTC(y, m - 1, d) - Date.UTC(y, 0, 1)) / 864e5; // 140 = 21 May, 243 = 1 Sep
          return n < 200 ? 90 + Math.min(10, Math.max(0, n - 140)) : 100 - Math.min(10, Math.max(0, n - 243));
        },
      };
      return p;
    },
    // Kazakhstan (QMDB): the settings in muftyat.kz's own timetable script: ISNA 15/15, twilight-angle rule at
    // high latitudes, sunrise -3 and Dhuhr, Asr, Maghrib +3 min (5 min north of 48°N).
    Kazakhstan: function (loc) {
      var m = loc && Math.abs(loc.lat) >= 48 ? 5 : 3;
      return angles(15, 15, 0, { fajr: 0, sunrise: -m, dhuhr: m, asr: m, maghrib: m, isha: 0 })();
    },
    // Muslim Board of Uzbekistan: fitted to its Tashkent calendar (praytime.uz, 30 Sep 2026), within 1 min.
    Uzbekistan: angles(15.5, 15.3, 0, { fajr: 0, sunrise: 0, dhuhr: 0, asr: 0, maghrib: 4, isha: 0 }),
    // Kyrgyzstan (muftiyat.kg API, Bishkek, 32 dates of 2026): 18/16, Maghrib 7 min after sunset, within 1-2 min.
    Kyrgyzstan: angles(18, 16, 0, { fajr: 0, sunrise: 0, dhuhr: 0, asr: 1, maghrib: 7, isha: 0 }),
    // All Ceylon Jamiyyathul Ulama: fitted to its 2026 Colombo tables (January and June), within 1 min.
    ACJU: angles(19.8, 18.2, 0, { fajr: 0, sunrise: 0, dhuhr: 1, asr: 1, maghrib: 1, isha: 0 }),
    // Morocco: fitted to the Ministry of Habous's Rabat table (Sept 2026), all within 1 min. The Ministry prints
    // GMT; these are clock times (GMT+1 outside Ramadan).
    Morocco: angles(19, 17, 0, { fajr: 0, sunrise: -3, dhuhr: 5, asr: 0, maghrib: 4, isha: 0 }),
    // Algeria: fitted to the Ministry of Religious Affairs' 1448 calendar for Algiers (June, July, December,
    // January), all within 1 min: MWL angles, Maghrib 3 min after sunset.
    Algeria: angles(18, 17, 0, { fajr: 0, sunrise: 0, dhuhr: 0, asr: 0, maghrib: 3, isha: 0 }),
    // Muftiate of Dagestan: fitted to its 2026 Makhachkala timetable (muftiyatrd.ru), every prayer within 1-2 min.
    Dagestan: angles(17.5, 15, 0, { fajr: 0, sunrise: -2, dhuhr: 5, asr: 1, maghrib: 5, isha: 0 }),
    // Caucasus Muslims Board (QMİ): its 2026 Baku calendar (qafqazislam.com, June and December) is Fajr 16°,
    // Maghrib 3.5°, Isha 15°, all within 1 min. Its Asr azan is at two shadow lengths for every school.
    QMI: function () {
      var p = angles(16, 15, 3.5)();
      p.asrMadhab = 'Hanafi';
      return p;
    },
    ParisGMP: function () {
      var p = A.CalculationMethod.Other();
      p.fajrAngle = 15.75;
      p.ishaAngle = 0;
      p.ishaInterval = 87;
      p.methodAdjustments = { fajr: 0, sunrise: 0, dhuhr: 5, asr: 0, maghrib: 3, isha: 3 };
      return p;
    },
  };
  function diyanet(isha) {
    return function () {
      var p = A.CalculationMethod.Turkey();
      p.methodAdjustments = { fajr: 0, sunrise: -7, dhuhr: 5, asr: 6, maghrib: 8, isha: isha };
      return p;
    };
  }
  // Methods whose own tables keep the true twilight angle whenever it exists (checked against Diyanet in
  // Germany): cap only when the angle is never reached, by the middle of the night.
  var MIDNIGHT_CAP = { Turkey: true, DiyanetEurope: true, IGGO: true, ParisGMP: true, Tatarstan: true };
  // EMB's calendar follows the twilight-angle rule in summer (Fajr within 3 min in July).
  var TWILIGHT_CAP = { EMB: true, Kazakhstan: true };
  // The Sun's declination (degrees) at noon UTC on a date, Spencer's series (error under 0.05°).
  function declination(y, m, d) {
    var n = (Date.UTC(y, m - 1, d) - Date.UTC(y, 0, 1)) / 864e5, g = 2 * Math.PI * n / 365;
    return (0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) + 0.000907 * Math.sin(2 * g) -
      0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g)) * 180 / Math.PI;
  }

  /* ---------- Small helpers ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function tpl(str, vars) {
    return str.replace(/\{(\w+)\}/g, function (m, k) { return Object.prototype.hasOwnProperty.call(vars, k) ? vars[k] : m; });
  }
  // Site path prefix for a language: "/" for English, "/ur/" for Urdu.
  function pre(ctx) { return ctx.lang === 'en' ? '/' : '/' + ctx.lang + '/'; }
  function pad(n, w) { n = String(n); while (n.length < w) n = '0' + n; return n; }

  var cache = {};
  function dtf(locale, opts) {
    var k = 'd' + locale + JSON.stringify(opts);
    return cache[k] || (cache[k] = new Intl.DateTimeFormat(locale, opts));
  }
  function nf(locale, opts) {
    var k = 'n' + locale + JSON.stringify(opts);
    return cache[k] || (cache[k] = new Intl.NumberFormat(locale, opts));
  }

  // Languages without Intl data (locale: null) write digits from their own `digits` table.
  function localDigits(s, ctx) {
    var d = ctx.L.digits;
    s = String(s);
    if (ctx.L.decimal) s = s.replace('.', ctx.L.decimal);
    return d ? s.replace(/[0-9]/g, function (c) { return d.charAt(+c); }) : s;
  }
  // Integers in the page's own digits (Persian, Bengali...). minDigits pads with zeros.
  function num(n, ctx, minDigits) {
    if (!ctx.L.locale) return localDigits(pad(n, minDigits || 1), ctx);
    return nf(ctx.L.locale, { minimumIntegerDigits: minDigits || 1, useGrouping: false }).format(n);
  }
  function numGrouped(n, ctx) {
    if (!ctx.L.locale) return localDigits(String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ','), ctx);
    return nf(ctx.L.locale, { maximumFractionDigits: 0 }).format(n);
  }
  function dec(n, ctx, digits) {
    var o = { minimumFractionDigits: digits, maximumFractionDigits: digits, useGrouping: false };
    if (!ctx.L.locale) return localDigits(n.toFixed(digits), ctx);
    return nf(ctx.L.locale, o).format(n);
  }
  function decShort(n, ctx) {
    if (!ctx.L.locale) return localDigits(String(n), ctx);
    return nf(ctx.L.locale, { maximumFractionDigits: 1, useGrouping: false }).format(n);
  }

  /* ---------- Dates ---------- */
  function partsInTz(date, tz) {
    var p = {};
    dtf('en-US', {
      timeZone: tz, year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric', hourCycle: 'h23',
    }).formatToParts(date).forEach(function (x) { p[x.type] = x.value; });
    return { y: +p.year, m: +p.month, d: +p.day, h: +p.hour % 24, min: +p.minute, s: +p.second };
  }
  function civil(y, m, d) { return new Date(Date.UTC(y, m - 1, d, 12)); }
  function addDays(y, m, d, n) {
    var t = new Date(Date.UTC(y, m - 1, d + n));
    return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate() };
  }
  function daysInMonth(y, m) { return new Date(Date.UTC(y, m, 0)).getUTCDate(); }
  function isFriday(y, m, d) { return civil(y, m, d).getUTCDay() === 5; }

  function fmtTime(date, tz, ctx, seconds) {
    if (!ctx.L.locale || ctx.L.force24) {
      var p = partsInTz(date, tz), sec = seconds ? ':' + num(p.s, ctx, 2) : '';
      // 12-hour clock for languages without Intl data that set their own am/pm words (Hausa).
      if (ctx.L.am && ctx.hour12) return num(p.h % 12 || 12, ctx) + ':' + num(p.min, ctx, 2) + sec + ' ' + (p.h < 12 ? ctx.L.am : ctx.L.pm);
      return num(p.h, ctx, 2) + ':' + num(p.min, ctx, 2) + sec;
    }
    var o = { timeZone: tz, hour: 'numeric', minute: '2-digit', hour12: ctx.hour12 };
    if (seconds) o.second = '2-digit';
    return dtf(ctx.L.timeLocale, o).format(date);
  }

  // style: 'full' | 'monthYear' | 'weekday'
  function gregorian(y, m, d, style, ctx) {
    var date = civil(y, m, d);
    if (!ctx.L.locale) {
      var wd = ctx.t.weekdays[date.getUTCDay()], mn = ctx.t.months[m - 1];
      if (style === 'full') return wd + (ctx.L.dir === 'rtl' ? '، ' : ', ') + num(d, ctx) + ' ' + mn + ' ' + num(y, ctx);
      if (style === 'monthYear') return mn + ' ' + num(y, ctx);
      if (style === 'short') return wd + ' ' + num(d, ctx) + ' ' + mn;
      return wd;
    }
    var o = style === 'full' ? { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
      : style === 'monthYear' ? { month: 'long', year: 'numeric' }
      : style === 'short' ? { weekday: 'short', day: 'numeric', month: 'short' } : { weekday: 'short' };
    o.timeZone = 'UTC';
    return dtf(ctx.L.locale + '-u-ca-gregory', o).format(date);
  }

  // Umm al-Qura calendar numbers from Intl, month names from our own translations.
  // A national calendar published in advance (Turkey: Diyanet), as month starts; null = Umm al-Qura only.
  // rows: [Hijri year, month, Gregorian year, month, day]; the last row only ends the month before it.
  var CAL = null;
  function useCalendar(rows) {
    CAL = rows && rows.length ? rows.map(function (r) { return [Date.UTC(r[2], r[3] - 1, r[4]) / 864e5, r[0], r[1]]; }) : null;
  }
  function calDay(dn) {
    if (!CAL || dn < CAL[0][0] || dn >= CAL[CAL.length - 1][0]) return null;
    for (var i = CAL.length - 2; i >= 0; i--) if (dn >= CAL[i][0]) return { d: dn - CAL[i][0] + 1, m: CAL[i][2], y: CAL[i][1] };
    return null;
  }
  function hijriParts(y, m, d, adj) {
    var c = calDay(Date.UTC(y, m - 1, d + (adj || 0)) / 864e5);
    if (c) return c;
    var o = {};
    dtf('en-u-ca-islamic-umalqura', { timeZone: 'UTC', day: 'numeric', month: 'numeric', year: 'numeric' })
      .formatToParts(new Date(Date.UTC(y, m - 1, d + (adj || 0), 12)))
      .forEach(function (p) { o[p.type] = p.value; });
    return { d: parseInt(o.day, 10), m: parseInt(o.month, 10), y: parseInt(o.year, 10) };
  }
  // style: 'full' | 'monthYear' | 'short'
  function hijri(y, m, d, ctx, style) {
    var h = hijriParts(y, m, d, ctx.hijriAdj), name = ctx.t.hijriMonths[h.m - 1];
    if (style === 'short') return num(h.d, ctx) + ' ' + name;
    if (style === 'monthYear') return name + ' ' + num(h.y, ctx) + ' ' + ctx.t.hijriEra;
    return num(h.d, ctx) + ' ' + name + ' ' + num(h.y, ctx) + ' ' + ctx.t.hijriEra;
  }
  function solarHijri(y, m, d, ctx) {
    if (!ctx.L.locale && !ctx.t.solarMonths) return ''; // e.g. Dhivehi: no Solar Hijri month names
    if (!ctx.L.locale) {
      var o = {};
      dtf('en-u-ca-persian', { timeZone: 'UTC', day: 'numeric', month: 'numeric', year: 'numeric' })
        .formatToParts(civil(y, m, d)).forEach(function (p) { o[p.type] = p.value; });
      return num(parseInt(o.day, 10), ctx) + ' ' + ctx.t.solarMonths[parseInt(o.month, 10) - 1] + ' ' + num(parseInt(o.year, 10), ctx) + ' ' + ctx.t.solarEra;
    }
    return dtf(ctx.L.locale + '-u-ca-persian', { timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric' }).format(civil(y, m, d));
  }

  /* ---------- Calculation ---------- */
  function methodKey(loc, ctx) {
    if (ctx.sect === 'jafria') return loc.jafariMethod || 'Jafari';
    return ctx.method && ctx.method !== 'auto' ? ctx.method : (loc.method || 'MuslimWorldLeague');
  }
  function methodLabel(key, ctx) { return (ctx.t.methods && ctx.t.methods[key]) || METHOD_EN[key] || key; }

  function paramsFor(loc, ctx) {
    var k = methodKey(loc, ctx);
    var p = CUSTOM[k] ? CUSTOM[k](loc) : A.CalculationMethod[k]();
    p.madhab = (p.asrMadhab || SECT_ASR[ctx.sect]) === 'Hanafi' ? A.Madhab.Hanafi : A.Madhab.Shafi;
    if (MIDNIGHT_CAP[k]) p.highLatitudeRule = A.HighLatitudeRule.MiddleOfTheNight;
    else if (TWILIGHT_CAP[k]) p.highLatitudeRule = A.HighLatitudeRule.TwilightAngle;
    else if (A.HighLatitudeRule && typeof A.HighLatitudeRule.recommended === 'function') {
      p.highLatitudeRule = A.HighLatitudeRule.recommended(new A.Coordinates(loc.lat, loc.lng));
    }
    // Arctic days with no sunrise or no sunset: times of the nearest latitude that still has both
    // (aqrab al-bilad, the Muslim World League Fiqh Council's ruling).
    if (A.PolarCircleResolution) p.polarCircleResolution = A.PolarCircleResolution.AqrabBalad;
    return p;
  }
  function inOrder(t) {
    for (var i = 0; i < PRAYERS.length; i++) {
      if (isNaN(t[PRAYERS[i]]) || (i > 0 && t[PRAYERS[i]] <= t[PRAYERS[i - 1]])) return false;
    }
    return true;
  }
  function timesFor(loc, ctx, y, m, d, params) {
    // adhan reads the calendar day from the Date's local components.
    var p = params || paramsFor(loc, ctx), f = p.fixedSummer;
    var t = new A.PrayerTimes(new A.Coordinates(loc.lat, loc.lng), new Date(y, m - 1, d), p);
    // Arctic days too short or too long for all five prayers (no sunset, no sunrise, or Asr never before
    // sunset): times of the nearest latitude, same longitude, where every prayer has its place (aqrab al-bilad).
    for (var lat = loc.lat; !inOrder(t) && Math.abs(lat) > 48;) {
      lat -= lat > 0 ? 0.5 : -0.5;
      t = new A.PrayerTimes(new A.Coordinates(lat, loc.lng), new Date(y, m - 1, d), p);
    }
    // Next to the date line adhan can put Fajr and Isha on midnight UTC for a day (noon falls at 00:01 UTC):
    // take them from the average of the day before and the day after.
    if (!inOrder(t)) {
      var dayMs = 864e5, before = new A.PrayerTimes(new A.Coordinates(loc.lat, loc.lng), new Date(y, m - 1, d - 1), p);
      var after = new A.PrayerTimes(new A.Coordinates(loc.lat, loc.lng), new Date(y, m - 1, d + 1), p);
      ['fajr', 'isha'].forEach(function (k) {
        if (!isNaN(before[k]) && !isNaN(after[k])) t[k] = new Date((before[k].getTime() + after[k].getTime()) / 2);
      });
      if (!inOrder(t) && inOrder(before)) PRAYERS.forEach(function (k) { t[k] = new Date(before[k].getTime() + dayMs); });
    }
    // Fixed intervals on nights the Sun never reaches the Fajr angle (lowest altitude = |lat| + declination - 90).
    if (f && Math.abs(loc.lat) + (loc.lat < 0 ? -1 : 1) * declination(y, m, d) - 90 > -f.angle) {
      t.fajr = new Date(t.sunrise.getTime() - f.fajr * 60000);
      t.isha = new Date(t.maghrib.getTime() + f.isha * 60000);
    }
    // Methods defined by minutes from sunrise and Maghrib all year (no twilight angle).
    if (p.fixedIntervals) {
      t.fajr = new Date(t.sunrise.getTime() - p.fixedIntervals.fajr * 60000);
      t.isha = new Date(t.maghrib.getTime() + p.fixedIntervals.isha(y, m, d) * 60000);
    }
    return t;
  }

  function snapshot(loc, ctx, now) {
    var t = partsInTz(now, loc.tz);
    var params = paramsFor(loc, ctx);
    var today = timesFor(loc, ctx, t.y, t.m, t.d, params);
    var next = null, current = null;
    for (var i = 0; i < PRAYERS.length; i++) {
      if (today[PRAYERS[i]] > now) { next = { key: PRAYERS[i], at: today[PRAYERS[i]], tomorrow: false }; break; }
      current = PRAYERS[i];
    }
    if (!next) {
      var tm = addDays(t.y, t.m, t.d, 1);
      next = { key: 'fajr', at: timesFor(loc, ctx, tm.y, tm.m, tm.d, params).fajr, tomorrow: true };
    }
    if (current === 'sunrise') current = null; // no obligatory prayer between sunrise and Dhuhr
    return { date: t, times: today, next: next, current: current, params: params };
  }

  function countdown(ms, ctx) {
    var s = Math.max(0, Math.floor(ms / 1000));
    return num(Math.floor(s / 3600), ctx, 2) + ':' + num(Math.floor((s % 3600) / 60), ctx, 2) + ':' + num(s % 60, ctx, 2);
  }
  // The same time left in words ("1 hour, 4 minutes and 23 seconds"), worded by the browser's Intl for the language.
  function countdownWords(ms, ctx) {
    var s = Math.max(0, Math.floor(ms / 1000)), h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    var loc = ctx.L.locale;
    if (!loc || typeof Intl === 'undefined' || !Intl.ListFormat || !Intl.NumberFormat.prototype.formatToParts) return countdown(ms, ctx);
    try {
      var parts = [];
      if (h) parts.push(['hour', h]);
      if (h || m) parts.push(['minute', m]);
      parts.push(['second', sec]);
      var words = parts.map(function (p) {
        return nf(loc, { style: 'unit', unit: p[0], unitDisplay: 'long' }).formatToParts(p[1])
          .map(function (x) { return x.type === 'integer' ? num(p[1], ctx) : x.value; }).join('');
      });
      var lk = 'l' + loc;
      return (cache[lk] || (cache[lk] = new Intl.ListFormat(loc, { style: 'long', type: 'conjunction' }))).format(words);
    } catch (e) { return countdown(ms, ctx); }
  }

  /* ---------- Qibla ---------- */
  function qibla(lat, lng) {
    if (A.Qibla) return A.Qibla(new A.Coordinates(lat, lng));
    var rad = Math.PI / 180;
    var y = Math.sin((KAABA.lng - lng) * rad);
    var x = Math.cos(lat * rad) * Math.tan(KAABA.lat * rad) - Math.sin(lat * rad) * Math.cos((KAABA.lng - lng) * rad);
    return (Math.atan2(y, x) / rad + 360) % 360;
  }
  function distanceKm(aLat, aLng, bLat, bLng) {
    var R = 6371, rad = Math.PI / 180;
    var dLat = (bLat - aLat) * rad, dLng = (bLng - aLng) * rad;
    var h = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(aLat * rad) * Math.cos(bLat * rad) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return 2 * R * Math.asin(Math.sqrt(h));
  }

  /* ---------- HTML ---------- */
  function sectPicker(ctx) {
    return '<div class="sect-row"><span class="sect-label" id="sectLabel">' + esc(ctx.t.sectLabel) + '</span>' +
      '<div class="sect-picker" role="group" aria-labelledby="sectLabel">' +
      SECTS.map(function (k) {
        return '<button type="button" data-sect="' + k + '" aria-pressed="' + (ctx.sect === k) + '">' + esc(ctx.t.sects[k]) + '</button>';
      }).join('') + '</div></div>';
  }

  // Why each time starts when it does, in the chosen school, with Quran and Hadith references (src/learn.js).
  // Escaped text with each reference number ("59:22-24", "7392") kept left to right inside right-to-left text.
  function ltrNums(s) {
    return esc(s).replace(/[0-9۰-۹০-৯][0-9۰-۹০-৯:.\-–]*[0-9۰-۹০-৯]/g, function (m) { return '<bdi dir="ltr">' + m + '</bdi>'; });
  }
  // Bullets under a prayer that open sections of its Quran and hadith page:
  // the signs of its time, its benefits, and the adhkar where the page has them.
  function refToggle(ctx, key) {
    var R = ctx.t.refLinks;
    if (!ctx.t.refLabel || !R) return '';
    var href = pre(ctx) + 'prayers/' + key + '/reference/#', name = { prayer: ctx.t.prayers[key] || ctx.t.nafl[key] };
    return '<ul class="p-ref">' +
      ['time', 'virtue'].concat(R.az.indexOf(key) !== -1 ? ['azkar'] : []).map(function (k) {
        return '<li><a href="' + href + k + '">' + esc(tpl(R[k], name)) + '</a></li>';
      }).join('') + '</ul>';
  }
  // When each prayer's time ends. Sunni: at the next prayer (Asr at sunset, Isha at the next Fajr).
  // Jafria: Dhuhr and Asr share the time until sunset, Maghrib and Isha until midnight (halfway from sunset to Fajr).
  function prayerEnds(times, nextFajr, ctx) {
    var midnight = new Date(times.sunset.getTime() + (nextFajr - times.sunset) / 2);
    var j = ctx.sect === 'jafria';
    return { fajr: times.sunrise, dhuhr: j ? times.sunset : times.asr, asr: times.sunset,
      maghrib: j ? midnight : times.isha, isha: j ? midnight : nextFajr };
  }
  // Inner HTML of the #today section. Returns { html, nextAt }.
  function renderToday(loc, ctx, now, h1) {
    var s = snapshot(loc, ctx, now), d = s.date, t = ctx.t;
    var fri = isFriday(d.y, d.m, d.d);
    function label(k) { return k === 'dhuhr' && fri ? t.prayers.jumuah : t.prayers[k]; }
    function arabic(k) { return k === 'dhuhr' && fri ? ARABIC.jumuah : ARABIC[k]; }
    var tm = addDays(d.y, d.m, d.d, 1);
    var ends = prayerEnds(s.times, timesFor(loc, ctx, tm.y, tm.m, tm.d, s.params).fajr, ctx), RL = t.refLinks;
    function range(k) {
      if (!RL || !ends[k]) return '';
      return '<span class="p-range"><span>' + esc(RL.start) + ' <bdi>' + esc(fmtTime(s.times[k], loc.tz, ctx)) + '</bdi></span>' +
        '<span>' + esc(RL.end) + ' <bdi>' + esc(fmtTime(ends[k], loc.tz, ctx)) + '</bdi></span></span>';
    }

    var cards = PRAYERS.map(function (k) {
      var at = s.times[k];
      var state = !s.next.tomorrow && s.next.key === k ? 'is-next' : (s.current === k ? 'is-current' : (at <= now ? 'is-past' : ''));
      return '<li class="prayer ' + state + (k === 'sunrise' ? ' is-sunrise' : '') + '">' +
        (ctx.L.arabicScript ? '' : '<span class="p-ar" lang="ar" dir="rtl">' + arabic(k) + '</span>') +
        '<span class="p-name">' + (k === 'sunrise' ? esc(label(k))
          : '<a href="' + (loc.pp && !(k === 'dhuhr' && fri) ? loc.pp + k : pre(ctx) + 'prayers/' + (k === 'dhuhr' && fri ? 'jumuah' : k)) + '/">' + esc(label(k)) + '</a>') + '</span>' +
        '<span class="p-time"><bdi>' + esc(fmtTime(at, loc.tz, ctx)) + '</bdi></span>' +
        (state === 'is-next' ? '<span class="p-badge">' + esc(t.next) + '</span>' : state === 'is-current' ? '<span class="p-badge">' + esc(t.now) + '</span>' : '') +
        range(k) + (k === 'sunrise' ? '' : refToggle(ctx, k)) +
        '</li>';
    }).join('');

    var nextName = s.next.tomorrow ? t.prayers.fajr + ' ' + t.tomorrow : label(s.next.key);
    var dateBits = [esc(gregorian(d.y, d.m, d.d, 'full', ctx))];
    var solar = loc.extraCalendar === 'persian' ? solarHijri(d.y, d.m, d.d, ctx) : '';
    if (solar) dateBits.push(esc(solar));
    dateBits.push('<a href="' + pre(ctx) + 'hijri-calendar/">' + esc(hijri(d.y, d.m, d.d, ctx, 'full')) + '</a>');

    var html = '' +
      '<div class="today-head">' +
        '<div><h1>' + esc(h1) + '</h1>' +
          '<p class="today-date">' + dateBits.join('<span class="dot" aria-hidden="true">•</span>') + '</p></div>' +
        '<div class="next-box">' +
          '<span class="next-label">' + esc(tpl(t.nextIn, { prayer: nextName })) + '</span>' +
          '<span class="next-count"><bdi id="countdown">' + esc(countdownWords(s.next.at - now, ctx)) + '</bdi></span>' +
          '<span class="next-clock">' + esc(t.localTime) + ' <bdi id="clock">' + esc(fmtTime(now, loc.tz, ctx, true)) + '</bdi></span>' +
        '</div>' +
      '</div>' +
      sectPicker(ctx) +
      '<ol class="prayers">' + cards + '</ol>';
    return { html: html, nextAt: s.next.at.getTime() };
  }

  // Monthly timetable. `today` is { y, m, d } in the location's time zone.
  function renderMonth(loc, ctx, y, m, today) {
    var t = ctx.t, n = daysInMonth(y, m), params = paramsFor(loc, ctx);
    var h1 = hijri(y, m, 1, ctx, 'monthYear'), h2 = hijri(y, m, n, ctx, 'monthYear');
    var rows = '';
    for (var d = 1; d <= n; d++) {
      var pt = timesFor(loc, ctx, y, m, d, params);
      var isToday = today && y === today.y && m === today.m && d === today.d;
      var cls = (isToday ? 'is-today ' : '') + (isFriday(y, m, d) ? 'is-friday' : '');
      rows += '<tr' + (cls ? ' class="' + cls.trim() + '"' : '') + '>' +
        '<td class="c-date"><strong>' + num(d, ctx) + '</strong> <span>' + esc(gregorian(y, m, d, 'weekday', ctx)) + '</span></td>' +
        '<td class="c-hijri">' + esc(hijri(y, m, d, ctx, 'short')) + '</td>' +
        PRAYERS.map(function (k) {
          return '<td' + (k === 'sunrise' ? ' class="c-sunrise"' : '') + '><bdi>' + esc(fmtTime(pt[k], loc.tz, ctx)) + '</bdi></td>';
        }).join('') + '</tr>';
    }
    return {
      title: tpl(t.monthTitle, { month: gregorian(y, m, 1, 'monthYear', ctx) }),
      sub: t.sects[ctx.sect] + ' · ' + (h1 === h2 ? h1 : tpl(t.range, { a: h1, b: h2 })),
      table: '<thead><tr><th scope="col">' + esc(t.colDate) + '</th><th scope="col" class="c-hijri">' + esc(t.colHijri) + '</th>' +
        PRAYERS.map(function (k) { return '<th scope="col"' + (k === 'sunrise' ? ' class="c-sunrise"' : '') + '>' + esc(t.prayers[k]) + '</th>'; }).join('') +
        '</tr></thead><tbody>' + rows + '</tbody>',
    };
  }

  function qiblaCard(lat, lng, ctx) {
    var q = qibla(lat, lng), t = ctx.t, ticks = '';
    for (var i = 0; i < 72; i++) {
      var major = i % 6 === 0;
      ticks += '<line x1="100" y1="8" x2="100" y2="' + (8 + (i % 18 === 0 ? 10 : major ? 7 : 4)) + '" class="' + (major ? 'c-tick-major' : 'c-tick') + '" transform="rotate(' + (i * 5) + ' 100 100)"/>';
    }
    var km = Math.round(distanceKm(lat, lng, KAABA.lat, KAABA.lng));
    return '<h2>' + esc(t.qibla) + '</h2>' +
      '<div class="compass" role="img" aria-label="' + esc(tpl(t.qiblaFrom, { deg: dec(q, ctx, 1) })) + '">' +
        '<svg viewBox="0 0 200 200" aria-hidden="true">' +
          '<circle cx="100" cy="100" r="92" class="c-ring"/><circle cx="100" cy="100" r="74" class="c-inner"/>' + ticks +
          '<text x="100" y="34" class="c-n">N</text>' +
          '<g transform="rotate(' + q.toFixed(2) + ' 100 100)">' +
            '<path d="M100 40 L108 100 L100 108 L92 100 Z" class="c-needle"/>' +
            '<rect x="92" y="26" width="16" height="16" rx="2" class="c-kaaba"/>' +
          '</g><circle cx="100" cy="100" r="5" class="c-hub"/>' +
        '</svg></div>' +
      '<p class="qibla-deg"><strong>' + esc(tpl(t.qiblaFrom, { deg: dec(q, ctx, 1) })) + '</strong></p>' +
      '<p class="muted small">' + esc(tpl(t.kaaba, { km: numGrouped(km, ctx) })) + '</p>';
  }

  // Nafl prayers. Returns the inner HTML of the #nafl card.
  //   Ishraq    sunrise + 15 min, until Chasht begins
  //   Chasht    sunrise + a quarter of the day (sunrise to sunset), until 10 min before Dhuhr
  //   Awwabin   Maghrib to Isha
  //   Tahajjud  last third of the night (Maghrib to Fajr), until Fajr
  //   Jafria: Ishraq and Chasht, then Salat al-Layl from midnight (halfway between sunset and Fajr) until Fajr.
  // Before today's Fajr, the night shown is the one still running (from yesterday evening).
  function naflRows(loc, ctx, now) {
    var MIN = 60000;
    var p = partsInTz(now, loc.tz), params = paramsFor(loc, ctx);
    var today = timesFor(loc, ctx, p.y, p.m, p.d, params);
    var night;
    if (now < today.fajr) {
      var yd = addDays(p.y, p.m, p.d, -1), yest = timesFor(loc, ctx, yd.y, yd.m, yd.d, params);
      night = { sunset: yest.sunset, maghrib: yest.maghrib, fajr: today.fajr };
    } else {
      var tm = addDays(p.y, p.m, p.d, 1);
      night = { sunset: today.sunset, maghrib: today.maghrib, fajr: timesFor(loc, ctx, tm.y, tm.m, tm.d, params).fajr };
    }
    var chasht = new Date(today.sunrise.getTime() + (today.sunset - today.sunrise) / 4);
    var day = [
      ['ishraq', new Date(today.sunrise.getTime() + 15 * MIN), chasht],
      ['chasht', chasht, new Date(today.dhuhr.getTime() - 10 * MIN)],
    ];
    if (ctx.sect === 'jafria') {
      return day.concat([['layl', new Date(night.sunset.getTime() + (night.fajr - night.sunset) / 2), night.fajr]]);
    }
    return day.concat([
      ['awwabin', today.maghrib, today.isha],
      ['tahajjud', new Date(night.fajr.getTime() - (night.fajr - night.maghrib) / 3), night.fajr],
    ]);
  }

  function renderNafl(loc, ctx, now) {
    var t = ctx.t, rows = naflRows(loc, ctx, now);
    var heading = tpl(ctx.sect === 'jafria' ? t.laylH2 : t.naflH2, { city: loc.name });
    // Languages with the learn pages link each prayer to its page (Tahajjud, Ishraq, Chasht).
    var page = { tahajjud: 'tahajjud', layl: 'tahajjud', ishraq: 'ishraq', chasht: 'chasht' };
    function naflName(k) {
      return page[k] ? '<a href="' + pre(ctx) + 'prayers/' + page[k] + '/">' + esc(t.nafl[k]) + '</a>' : esc(t.nafl[k]);
    }
    return '<h2 id="naflTitle">' + esc(heading) + '</h2><ul class="nafl-list">' +
      rows.map(function (r) {
        var active = now >= r[1] && now < r[2];
        return '<li class="nafl-item' + (active ? ' is-now' : '') + '"><span class="n-name">' + naflName(r[0]) + '</span>' +
          '<span class="n-time">' + tpl(esc(t.range), {
            a: '<bdi>' + esc(fmtTime(r[1], loc.tz, ctx)) + '</bdi>',
            b: '<bdi>' + esc(fmtTime(r[2], loc.tz, ctx)) + '</bdi>',
          }) + '</span>' + (active ? '<span class="p-badge">' + esc(t.now) + '</span>' : '') + refToggle(ctx, r[0] === 'layl' ? 'tahajjud' : r[0]) + '</li>';
      }).join('') + '</ul>';
  }

  // Quick answers: plain-text questions and answers with today's values (also used for FAQPage data).
  function faqItems(loc, ctx, now) {
    var t = ctx.t, s = snapshot(loc, ctx, now), d = s.date, tt = s.times;
    var f = function (x) { return fmtTime(x, loc.tz, ctx); };
    var city = loc.name, sect = t.sects[ctx.sect];
    var nafl = naflRows(loc, ctx, now);
    var q = qibla(loc.lat, loc.lng);
    var vars = {
      city: city, date: gregorian(d.y, d.m, d.d, 'full', ctx), fajr: f(tt.fajr), sunrise: f(tt.sunrise), dhuhr: f(tt.dhuhr),
      asr: f(tt.asr), maghrib: f(tt.maghrib), isha: f(tt.isha), sect: sect,
    };
    // Tomorrow's Fajr and sunrise, for the regional questions that ask about tomorrow.
    if (loc.v) {
      var tm = addDays(d.y, d.m, d.d, 1), t2 = timesFor(loc, ctx, tm.y, tm.m, tm.d, s.params);
      vars.dateTomorrow = gregorian(tm.y, tm.m, tm.d, 'full', ctx); vars.fajrTomorrow = f(t2.fajr); vars.sunriseTomorrow = f(t2.sunrise);
    }
    var items = [
      [tpl(t.qTimes, { city: city }), tpl(t.aTimes, vars)],
      [tpl(t.qFajr, { city: city }), tpl(t.aFajr, { fajr: f(tt.fajr), sunrise: f(tt.sunrise) })],
      [tpl(t.qMaghrib, { city: city }), tpl(t.aMaghrib, { maghrib: f(tt.maghrib), isha: f(tt.isha) })],
      ctx.sect === 'jafria'
        ? [tpl(t.qLayl, { city: city }), tpl(t.aLayl, { layl: f(nafl[0][1]), fajr: f(nafl[0][2]) })]
        : [tpl(t.qNafl, { city: city }), tpl(t.aNafl, { ishraq: f(nafl[0][1]), chasht: f(nafl[1][1]), tahajjud: f(nafl[3][1]) })],
      [tpl(t.qQibla, { city: city }), tpl(t.aQibla, { city: city, deg: dec(q, ctx, 1), km: numGrouped(Math.round(distanceKm(loc.lat, loc.lng, KAABA.lat, KAABA.lng)), ctx) })],
      [t.qMethod, tpl(t.aMethod, { method: methodLabel(methodKey(loc, ctx), ctx), sect: sect })],
    ];
    if (ctx.g) {
      var fr = fridays(loc, ctx, now, 1)[0];
      items.splice(3, 0, [tpl(ctx.g.qJ, { city: city }), tpl(ctx.g.aJ, { city: city, time: f(fr.at), date: gregorian(fr.y, fr.m, fr.d, 'full', ctx) })]);
    }
    // One question per prayer (start and end today), then how much time is left until the next one.
    if (t.qAt) {
      var ends = { fajr: tt.sunrise, dhuhr: tt.asr, asr: tt.maghrib, maghrib: tt.isha, isha: nafl[nafl.length - 1][2] };
      ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].forEach(function (k) {
        items.push([tpl(t.qAt, { prayer: t.prayers[k], city: city }), tpl(t.aAt, { prayer: t.prayers[k], city: city, start: f(tt[k]), end: f(ends[k]) })]);
      });
      nafl.forEach(function (r) {
        if (r[0] === 'awwabin') return;
        items.push([tpl(t.qAt, { prayer: t.nafl[r[0]], city: city }), tpl(t.aAt, { prayer: t.nafl[r[0]], city: city, start: f(r[1]), end: f(r[2]) })]);
      });
      var nk = s.next.key;
      items.push([tpl(t.qLeft, { city: city }), tpl(t.aLeft, { city: city, next: t.prayers[nk] || nk, time: f(s.next.at) })]);
    }
    // Regional questions go right after the first answer, where people look first.
    var extra = ((loc.v && loc.v.faq) || []).map(function (x) { return [tpl(x[0], vars), tpl(x[1], vars)]; });
    items.splice.apply(items, [1, 0].concat(extra));
    return items.map(function (x) { return { q: x[0], a: x[1] }; });
  }
  // Inner HTML of the #faq section.
  function renderFaq(loc, ctx, now) {
    return '<h2 id="faqTitle">' + esc(tpl(ctx.t.faqH2, { city: loc.name })) + '</h2>' +
      faqItems(loc, ctx, now).map(function (it) {
        return '<div class="faq-item"><h3>' + esc(it.q) + '</h3><p>' + esc(it.a) + '</p></div>';
      }).join('');
  }

  // The next n Fridays in the location's time zone (today counts until its Asr begins), with Dhuhr time.
  function fridays(loc, ctx, now, n) {
    var p = partsInTz(now, loc.tz), params = paramsFor(loc, ctx), out = [];
    var day = { y: p.y, m: p.m, d: p.d };
    for (var i = 0; out.length < n && i < 7 * n + 7; i++) {
      if (isFriday(day.y, day.m, day.d)) {
        var tt = timesFor(loc, ctx, day.y, day.m, day.d, params);
        if (i > 0 || now < tt.asr) out.push({ y: day.y, m: day.m, d: day.d, at: tt.dhuhr });
      }
      day = addDays(day.y, day.m, day.d, 1);
    }
    return out;
  }
  // Inner HTML of the #jumuah section on city pages. ctx.g holds the explainer strings (guides.js).
  function renderJumuah(loc, ctx, now) {
    var g = ctx.g;
    if (!g) return '';
    return '<h2 id="jumuahTitle">' + esc(tpl(g.jH2, { city: loc.name })) + '</h2><ul class="jumuah-list">' +
      fridays(loc, ctx, now, 4).map(function (f) {
        return '<li><span>' + esc(gregorian(f.y, f.m, f.d, 'full', ctx)) + '</span><strong><bdi>' + esc(fmtTime(f.at, loc.tz, ctx)) + '</bdi></strong></li>';
      }).join('') + '</ul><p class="muted small">' + esc(g.jNote) + '</p>';
  }
  // Live line on a prayer page: when that prayer starts and ends today at loc (Jumu'ah: next Friday).
  function prayerWindow(loc, ctx, key, now) {
    if (key === 'jumuah') { var f = fridays(loc, ctx, now, 1)[0]; return { a: f.at, day: f }; }
    var p = partsInTz(now, loc.tz), params = paramsFor(loc, ctx), tt = timesFor(loc, ctx, p.y, p.m, p.d, params);
    var ends = { fajr: 'sunrise', dhuhr: 'asr', asr: 'sunset', maghrib: 'isha' }[key]; // Asr ends at sunset (Jafari Maghrib is later)
    if (ends) return { a: tt[key], b: tt[ends] };
    var tm = addDays(p.y, p.m, p.d, 1);
    return { a: tt.isha, b: timesFor(loc, ctx, tm.y, tm.m, tm.d, params).fajr };
  }
  function renderPrayerLive(loc, ctx, key, now) {
    var g = ctx.g, w = prayerWindow(loc, ctx, key, now);
    if (key === 'jumuah') {
      return '<strong>' + esc(tpl(g.fridayIn, { city: loc.name })) + ':</strong> ' + esc(gregorian(w.day.y, w.day.m, w.day.d, 'full', ctx)) +
        ', <bdi>' + esc(fmtTime(w.a, loc.tz, ctx)) + '</bdi>';
    }
    return '<strong>' + esc(tpl(g.todayIn, { city: loc.name })) + ':</strong> ' + tpl(esc(ctx.t.range), {
      a: '<bdi>' + esc(fmtTime(w.a, loc.tz, ctx)) + '</bdi>', b: '<bdi>' + esc(fmtTime(w.b, loc.tz, ctx)) + '</bdi>',
    });
  }

  function renderRamadan(loc, ctx, ram, now) {
    var g = ctx.g, t = ctx.t, params = paramsFor(loc, ctx), start = addDays(ram.y, ram.m, ram.d, -(ctx.hijriAdj || 0));
    var today = now ? partsInTz(now, loc.tz) : null, rows = '', first = null;
    // Jafria: sehri (imsak) ends 10 minutes before true dawn, taken as the earlier of the Jafari and the Sunni Fajr.
    var jafria = ctx.sect === 'jafria', sctx = jafria ? Object.assign({}, ctx, { sect: 'hanafi' }) : null, sparams = jafria ? paramsFor(loc, sctx) : null;
    for (var i = 0; i < ram.n; i++) {
      var d = addDays(start.y, start.m, start.d, i), tt = timesFor(loc, ctx, d.y, d.m, d.d, params);
      if (jafria) {
        var sf = timesFor(loc, sctx, d.y, d.m, d.d, sparams).fajr;
        tt = Object.assign({}, tt, { fajr: new Date(Math.min(tt.fajr, sf) - 10 * 60000) });
      }
      if (!first) first = { d: d, tt: tt };
      var isToday = today && today.y === d.y && today.m === d.m && today.d === d.d;
      rows += '<tr' + (isToday ? ' class="is-today"' : '') + '><td>' + esc(num(i + 1, ctx) + ' ' + t.hijriMonths[8]) + '</td><td>' + esc(gregorian(d.y, d.m, d.d, 'full', ctx)) + '</td>' +
        '<td><bdi>' + esc(fmtTime(tt.fajr, loc.tz, ctx)) + '</bdi></td><td><strong><bdi>' + esc(fmtTime(tt.maghrib, loc.tz, ctx)) + '</bdi></strong></td></tr>';
    }
    return {
      lede: esc(tpl(g.ramLede, {
        hijri: num(ram.hy, ctx) + ' ' + t.hijriEra, city: loc.name, date: gregorian(first.d.y, first.d.m, first.d.d, 'full', ctx),
        sehri: fmtTime(first.tt.fajr, loc.tz, ctx), iftar: fmtTime(first.tt.maghrib, loc.tz, ctx),
      })),
      table: '<thead><tr><th scope="col">' + esc(g.colDay) + '</th><th scope="col">' + esc(t.colDate) + '</th><th scope="col">' + esc(g.colSehri) +
        '</th><th scope="col">' + esc(g.colIftar) + '</th></tr></thead><tbody>' + rows + '</tbody>',
      first: first,
    };
  }

  // Today's five times for one city (country-page tables).
  function cityRowTimes(loc, ctx, now) {
    var p = partsInTz(now, loc.tz), tt = timesFor(loc, ctx, p.y, p.m, p.d);
    return ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].map(function (k) { return fmtTime(tt[k], loc.tz, ctx); });
  }

  // Fajr and Isha angles for the "How we calculate" page.
  var METHOD_ANGLES = {
    Karachi: [18, 18], MuslimWorldLeague: [18, 17], NorthAmerica: [15, 15], MoonsightingCommittee: [18, 18],
    Kemenag: [20, 18], JAKIM: [18, 18], Brunei: [20, 18], Tehran: [17.7, 14], Jafari: [16, 14],
    // { min: n } = Isha a fixed n minutes after Maghrib
    UmmAlQura: [18.5, { min: 90 }], Dubai: [18.2, 18.2], Qatar: [18, { min: 90 }], Kuwait: [18, 17.5],
    Egyptian: [19.5, 17.5], Turkey: [18, 17], Bosnia: [18, 16], Kosovo: [18.5, 16.5], DiyanetEurope: [18, 17], ParisGMP: [15.75, { min: 87 }], IGGO: [18, 17], EMB: [18, 17], Tatarstan: [18, 15], Dagestan: [17.5, 15], QMI: [16, 15], DUMU: [{ before: 100 }, { min: '90-100' }], Singapore: [20, 18], ACJU: [19.8, 18.2], Morocco: [19, 17], Algeria: [18, 17], Kazakhstan: [15, 15], Uzbekistan: [15.5, 15.3], Kyrgyzstan: [18, 16],
  };

  /* ---------- Hijri calendar: conversion and month grid ---------- */
  // Gregorian date of an Umm al-Qura date, or null when that day does not exist (day 30 of a 29-day month).
  // Starts from the arithmetic Hijri calendar, then steps to the exact Umm al-Qura day.
  function hijriToGregorian(hy, hm, hd) {
    if (CAL) {
      for (var c = 0; c < CAL.length - 1; c++) {
        if (CAL[c][1] !== hy || CAL[c][2] !== hm) continue;
        if (hd > CAL[c + 1][0] - CAL[c][0]) return null;
        var cd = new Date((CAL[c][0] + hd - 1) * 864e5);
        return { y: cd.getUTCFullYear(), m: cd.getUTCMonth() + 1, d: cd.getUTCDate() };
      }
    }
    var jd = hd + Math.ceil(29.5 * (hm - 1)) + (hy - 1) * 354 + Math.floor((3 + 11 * hy) / 30) + 1948439;
    var base = (jd - 2440588) * 864e5, offs = [0, 1, -1, 2, -2, 3, -3];
    for (var k = 0; k < offs.length; k++) {
      var dt = new Date(base + offs[k] * 864e5), y = dt.getUTCFullYear(), m = dt.getUTCMonth() + 1, d = dt.getUTCDate();
      var h = hijriParts(y, m, d, 0);
      if (h.y === hy && h.m === hm && h.d === hd) return { y: y, m: m, d: d };
    }
    return null;
  }
  function hijriMonthDays(hy, hm) { return hijriToGregorian(hy, hm, 30) ? 30 : 29; }
  function hijriText(hy, hm, hd, ctx) { return num(hd, ctx) + ' ' + ctx.t.hijriMonths[hm - 1] + ' ' + num(hy, ctx) + ' ' + ctx.t.hijriEra; }
  function gMonthShort(y, m, ctx) {
    if (!ctx.L.locale) return ctx.t.months[m - 1];
    return dtf(ctx.L.locale + '-u-ca-gregory', { month: 'short', timeZone: 'UTC' }).format(civil(y, m, 1));
  }
  // A Hijri month as a week grid (first column = firstDay, 0 = Sunday), each day with its Gregorian date.
  function renderHijriGrid(hy, hm, ctx, today, firstDay, adj) {
    var s0 = hijriToGregorian(hy, hm, 1);
    if (!s0) return null;
    if (adj) { var sh = new Date(Date.UTC(s0.y, s0.m - 1, s0.d - adj)); s0 = { y: sh.getUTCFullYear(), m: sh.getUTCMonth() + 1, d: sh.getUTCDate() }; }
    var n = hijriMonthDays(hy, hm), start = civil(s0.y, s0.m, s0.d), lead = (start.getUTCDay() - firstDay + 7) % 7;
    var head = '<thead><tr>';
    for (var i = 0; i < 7; i++) head += '<th scope="col">' + esc(gregorian(2026, 1, 4 + (firstDay + i) % 7, 'weekday', ctx)) + '</th>';
    var cells = [];
    for (var b = 0; b < lead; b++) cells.push('<td></td>');
    var end = null;
    for (var d = 1; d <= n; d++) {
      var g = new Date(start.getTime() + (d - 1) * 864e5), gy = g.getUTCFullYear(), gm = g.getUTCMonth() + 1, gd = g.getUTCDate();
      var isToday = today && today.y === hy && today.m === hm && today.d === d;
      cells.push('<td' + (isToday ? ' class="is-today" aria-current="date"' : '') + '><span class="hg-h">' + esc(num(d, ctx)) + '</span>' +
        '<span class="hg-g">' + esc(num(gd, ctx)) + ' ' + esc(gMonthShort(gy, gm, ctx)) + '</span></td>');
      end = { y: gy, m: gm };
    }
    while (cells.length % 7) cells.push('<td></td>');
    var rows = '';
    for (var r = 0; r < cells.length; r += 7) rows += '<tr>' + cells.slice(r, r + 7).join('') + '</tr>';
    var a = gregorian(s0.y, s0.m, 1, 'monthYear', ctx), z = gregorian(end.y, end.m, 1, 'monthYear', ctx);
    return {
      title: ctx.t.hijriMonths[hm - 1] + ' ' + num(hy, ctx) + ' ' + ctx.t.hijriEra,
      sub: a === z ? a : a + ' – ' + z,
      table: head + '</tr></thead><tbody>' + rows + '</tbody>',
    };
  }

  // Mosques map: a "mosque" search pinned to exact coordinates (sll = search centre, ll = view centre).
  // Tested against text queries ("mosques near Lahore") and the key-based Maps Embed API: only this
  // form reliably shows several mosque pins in the right place for every country.
  function mosquesCard(lat, lng, heading, ctx) {
    var ll = lat.toFixed(4) + ',' + lng.toFixed(4);
    return '<section class="card mosques" aria-labelledby="mosquesTitle">' +
      '<h2 id="mosquesTitle">' + esc(heading) + '</h2>' +
      '<p class="muted">' + esc(ctx.t.mosquesLede) + '</p>' +
      '<div class="map-frame"><iframe title="' + esc(heading) + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen ' +
        'src="https://maps.google.com/maps?q=mosque&amp;sll=' + ll + '&amp;ll=' + ll + '&amp;z=15&amp;hl=' + ctx.t.mapsHl + '&amp;output=embed"></iframe></div>' +
      '<p class="map-link"><a href="https://www.google.com/maps/search/mosque/@' + ll + ',15z" target="_blank" rel="noopener">' + esc(ctx.t.openInMaps) + '</a></p>' +
      '</section>';
  }

  return {
    mosquesCard: mosquesCard, renderNafl: renderNafl, naflRows: naflRows, ltrNums: ltrNums, faqItems: faqItems, renderFaq: renderFaq,
    cityRowTimes: cityRowTimes, METHOD_ANGLES: METHOD_ANGLES, decShort: decShort, gregorian: gregorian,
    PRAYERS: PRAYERS, ARABIC: ARABIC, BISMILLAH: BISMILLAH, SECTS: SECTS, SELECTABLE: SELECTABLE, METHOD_EN: METHOD_EN,
    esc: esc, tpl: tpl, num: num, numGrouped: numGrouped, partsInTz: partsInTz, fmtTime: fmtTime, countdown: countdown, countdownWords: countdownWords,
    methodLabel: methodLabel, paramsFor: paramsFor, timesFor: timesFor, snapshot: snapshot,
    sectPicker: sectPicker, renderToday: renderToday, renderMonth: renderMonth, qiblaCard: qiblaCard,
    distanceKm: distanceKm, renderJumuah: renderJumuah, renderPrayerLive: renderPrayerLive, hijri: hijri, hijriParts: hijriParts,
    renderRamadan: renderRamadan, METHOD_SLUG: METHOD_SLUG, qibla: qibla, KAABA: KAABA, addDays: addDays, pre: pre,
    hijriToGregorian: hijriToGregorian, hijriMonthDays: hijriMonthDays, useCalendar: useCalendar, hijriText: hijriText, renderHijriGrid: renderHijriGrid,
  };
}));
