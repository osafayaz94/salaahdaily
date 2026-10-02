/*
 * Browser behaviour. Every page is pre-rendered by build.js; this script keeps it live:
 * countdown, sect picker, settings, month navigation, city search and "near me".
 */
(function () {
  'use strict';

  var C = window.Core;
  var dataEl = document.getElementById('page-data');
  if (!C || !dataEl) return;
  var P = JSON.parse(dataEl.textContent);

  /* ---------- Per-browser preferences ---------- */
  var KEY = 'namaz.settings.v2';
  function load(key, fallback) {
    try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage unavailable */ }
  }
  var DEFAULTS = { sect: null, method: 'auto', hour12: null, hijriAdj: 0 };
  var S = Object.assign({}, DEFAULTS, load(KEY, {}));
  if (C.SECTS.indexOf(S.sect) === -1) S.sect = null; // null = use the country's default sect
  if (S.method !== 'auto' && C.SELECTABLE.indexOf(S.method) === -1) S.method = 'auto';
  if (typeof S.hour12 !== 'boolean') S.hour12 = null;
  S.hijriAdj = [-2, -1, 0, 1, 2].indexOf(Number(S.hijriAdj)) === -1 ? 0 : Number(S.hijriAdj);

  function ctx() {
    return {
      lang: P.lang, L: P.L, t: P.t, g: P.g,
      sect: S.sect || P.defaultSect || 'hanafi',
      method: S.method,
      hour12: S.hour12 === null ? P.L.hour12 : S.hour12,
      hijriAdj: S.hijriAdj,
    };
  }
  function $(id) { return document.getElementById(id); }

  /* ---------- Live prayer times ---------- */
  var loc = P.loc || null;
  var h1 = P.h1 || '';
  var nextAt = 0, monthOffset = 0, timer = null;

  function renderMonth() {
    var c = ctx(), today = C.partsInTz(new Date(), loc.tz);
    var base = new Date(Date.UTC(today.y, today.m - 1 + monthOffset, 1));
    // The page arrives with this month already drawn for the default settings: keep it when nothing differs.
    var key = monthOffset ? '' : today.y + '-' + today.m + '-' + today.d + '|' + c.sect + '|' + c.method + '|' + c.hour12 + '|' + c.hijriAdj;
    if (key && $('monthTable').getAttribute('data-k') === key) return;
    var r = C.renderMonth(loc, c, base.getUTCFullYear(), base.getUTCMonth() + 1, today);
    $('monthTitle').textContent = r.title;
    $('monthSub').textContent = r.sub;
    $('monthTable').innerHTML = r.table;
    $('monthTable').setAttribute('data-k', key);
  }
  // Country pages: refresh every city's five times in place (sect, settings and today's date).
  function renderRows() {
    if (!P.rows) return;
    var c = ctx(), now = new Date();
    document.querySelectorAll('tr[data-i]').forEach(function (tr) {
      var r = P.rows[+tr.getAttribute('data-i')];
      var times = C.cityRowTimes({ lat: r[0], lng: r[1], tz: r[2], method: r[3] || P.method, jafariMethod: P.jafariMethod }, c, now);
      tr.querySelectorAll('td bdi').forEach(function (cell, i) { cell.textContent = times[i]; });
      markNext(tr, { lat: r[0], lng: r[1], tz: r[2], method: r[3] || P.method, jafariMethod: P.jafariMethod }, c, now);
    });
  }
  var FIVE = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
  function markNext(tr, l, c, now) {
    var s = C.snapshot(l, c, now), cells = tr.querySelectorAll('td'), next = -1;
    for (var i = 0; i < FIVE.length; i++) if (s.times[FIVE[i]] > now) { next = i; break; }
    for (var j = 0; j < cells.length; j++) cells[j].classList.toggle('is-next', j === next);
  }
  if (P.rows) setInterval(renderRows, 60000);

  /* ---------- Home: live city cards ---------- */
  function liveCards() {
    var box = $('liveCards');
    if (!box || !P.live) return;
    var cards = [];
    box.querySelectorAll('[data-live]').forEach(function (a) {
      var r = P.live[+a.getAttribute('data-live')];
      cards.push({ el: a, loc: { lat: r[0], lng: r[1], tz: r[2], method: r[3], jafariMethod: r[4] || undefined }, sect: r[5] });
    });
    // The visitor's last city comes first (unless it is already one of the cards).
    var saved = lastLoc();
    if (saved && cards.length && !box.querySelector('a[href="' + saved.url + '"]')) {
      var li = box.firstElementChild.cloneNode(true), a = li.querySelector('a');
      a.href = saved.url;
      a.removeAttribute('data-live');
      a.querySelector('.cc-name').textContent = saved.loc.name;
      a.querySelector('.muted').textContent = '';
      box.insertBefore(li, box.firstElementChild);
      cards.unshift({ el: a, loc: saved.loc, sect: saved.loc.defaultSect });
    }
    function draw(card, now) {
      var c = ctx();
      c.sect = S.sect || card.sect;
      if (!card.next || now >= card.next.at) {
        var s = C.snapshot(card.loc, c, now);
        card.next = s.next;
        var name = s.next.tomorrow ? P.t.prayers.fajr + ' ' + P.t.tomorrow : P.t.prayers[s.next.key];
        card.el.querySelector('.lc-next').textContent = name;
        card.el.querySelector('.lc-at').textContent = C.fmtTime(s.next.at, card.loc.tz, c);
        card.el.querySelector('.lc-label').textContent = C.tpl(P.t.nextIn, { prayer: P.t.prayers[s.next.key] });
        card.el.querySelector('.lc-in').hidden = false;
      }
      card.el.querySelector('.lc-clock').textContent = C.fmtTime(now, card.loc.tz, c);
      card.el.querySelector('.lc-cd').textContent = C.countdown(card.next.at - now, c);
    }
    var more = $('liveAll');
    if (more) more.addEventListener('click', function () { box.classList.add('open'); more.parentNode.hidden = true; });
    function all() { var now = new Date(); cards.forEach(function (card) { draw(card, now); }); }
    all();
    setInterval(all, 1000);
    // A new school in Settings changes Asr: start each card over.
    liveCards.reset = function () { cards.forEach(function (card) { card.next = null; }); all(); };
  }

  function renderAll() {
    syncPickers();
    renderRows();
    if (P.ram && $('ramTable')) {
      var rr = C.renderRamadan(P.rl, ctx(), P.ram, new Date());
      $('ramLede').innerHTML = rr.lede;
      $('ramTable').innerHTML = rr.table;
    }
    if (!loc) return;
    var now = new Date(), c = ctx();
    var r = C.renderToday(loc, c, now, h1);
    $('today').innerHTML = r.html;
    if ($('nafl')) $('nafl').innerHTML = C.renderNafl(loc, c, now);
    if ($('faq')) $('faq').innerHTML = C.renderFaq(loc, c, now);
    if ($('jumuah')) $('jumuah').innerHTML = C.renderJumuah(loc, c, now);
    nextAt = r.nextAt;
    renderMonth();
  }
  function tick() {
    var now = Date.now();
    if (now >= nextAt) { renderAll(); return; }
    var c = ctx(), cd = $('countdown'), ck = $('clock');
    // Nafl windows (e.g. Ishraq) change between the five prayers, so refresh them each minute.
    if (now % 60000 < 1000 && $('nafl')) $('nafl').innerHTML = C.renderNafl(loc, c, new Date(now));
    if (cd) cd.textContent = C.countdown(nextAt - now, c);
    if (ck) ck.textContent = C.fmtTime(new Date(now), loc.tz, c, true);
  }
  function start() {
    renderAll();
    if (!timer) timer = setInterval(tick, 1000);
  }
  function syncPickers() {
    var sect = ctx().sect;
    document.querySelectorAll('[data-sect]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-sect') === sect));
    });
  }

  /* ---------- Settings dialog ---------- */
  var dialog = $('settingsDialog');
  function syncForm() {
    var c = ctx();
    $('setMethod').value = S.method;
    if ($('setHour12')) $('setHour12').value = String(c.hour12);
    $('setHijri').value = String(S.hijriAdj);
  }
  function openSettings() {
    syncForm();
    if (dialog.showModal) dialog.showModal(); else dialog.setAttribute('open', '');
  }
  function apply() { save(KEY, S); renderAll(); if (liveCards.reset) liveCards.reset(); }

  if (dialog) {
    $('settingsForm').addEventListener('change', function (e) {
      var el = e.target;
      if (el.name === 'hour12') S.hour12 = el.value === 'true';
      else if (el.name === 'hijriAdj') S.hijriAdj = Number(el.value);
      else if (el.name === 'method') S.method = el.value;
      apply();
    });
    $('resetSettings').addEventListener('click', function () {
      S = Object.assign({}, DEFAULTS);
      syncForm();
      apply();
    });
  }

  // Footer suggestion form: send in the background and say whether it worked (the page URL goes with it).
  var sg = document.querySelector('form[data-suggest]');
  if (sg && window.fetch) sg.addEventListener('submit', function (e) {
    e.preventDefault();
    var status = sg.querySelector('.sg-status'), btn = sg.querySelector('button');
    var fd = new FormData(sg);
    fd.append('page', location.href);
    btn.disabled = true;
    fetch(sg.action, { method: 'POST', body: fd, headers: { Accept: 'application/json' } })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        if (!j.success) throw new Error('send');
        status.textContent = status.getAttribute('data-ok');
        sg.reset();
      })
      .catch(function () { status.textContent = status.getAttribute('data-err'); })
      .then(function () { btn.disabled = false; });
  });

  // The language menu is a <details>: close it on a click anywhere outside it, or on Escape.
  function closeMenus(except) {
    document.querySelectorAll('details.lang-menu[open]').forEach(function (d) { if (d !== except) d.removeAttribute('open'); });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var open = document.querySelector('details.lang-menu[open]');
    if (open) { open.removeAttribute('open'); open.querySelector('summary').focus(); }
  });

  document.addEventListener('click', function (e) {
    closeMenus(e.target.closest('details.lang-menu'));
    var sectBtn = e.target.closest('[data-sect]');
    if (sectBtn) {
      S.sect = sectBtn.getAttribute('data-sect');
      apply();
      var again = document.querySelector('[data-sect="' + S.sect + '"]');
      if (again) again.focus(); // keep keyboard focus after the hero re-renders
      return;
    }
    if (e.target.closest('[data-open-settings]')) { openSettings(); return; }
    if (e.target.closest('[data-locate]') || (P.kind === 'near' && e.target.closest('a[href$="#locate"]'))) {
      e.preventDefault();
      locate();
      return;
    }
    var id = e.target.closest('button') && e.target.closest('button').id;
    if (id === 'prevMonth') { monthOffset--; renderMonth(); }
    else if (id === 'nextMonth') { monthOffset++; renderMonth(); }
    else if (id === 'thisMonth') { monthOffset = 0; renderMonth(); }
    else if (id === 'printBtn') { window.print(); }
  });

  /* ---------- City search ---------- */
  var input = $('citySearch');
  // Country pages filter their own table rows.
  function filterRows(q) {
    var any = false;
    document.querySelectorAll('[data-region]').forEach(function (region) {
      var shown = 0;
      region.querySelectorAll('[data-name]').forEach(function (row) {
        var match = !q || row.getAttribute('data-name').indexOf(q) !== -1;
        row.hidden = !match;
        if (match) shown++;
      });
      region.hidden = shown === 0;
      if (shown) any = true;
    });
    if ($('emptySearch')) $('emptySearch').hidden = any;
  }
  // The home page searches every city, loading the index on first use: [name, country, url, search text].
  var index = null, loading = false;
  function loadIndex(then) {
    if (index) { then(); return; }
    if (loading) return;
    loading = true;
    fetch(P.searchUrl).then(function (r) { return r.json(); }).then(function (d) { index = d; then(); })
      .catch(function () { loading = false; });
  }
  function showResults(q) {
    var list = $('searchResults');
    if (!q) { list.hidden = true; list.innerHTML = ''; return; }
    var hits = index.filter(function (row) { return row[3].indexOf(q) !== -1; }).slice(0, 8);
    list.innerHTML = hits.length ? hits.map(function (row) {
      return '<li><a href="' + C.esc(row[2]) + '"><span>' + C.esc(row[0]) + '</span><span class="muted">' + C.esc(row[1]) + '</span></a></li>';
    }).join('') : '<li class="muted">' + C.esc(P.t.noMatch) + '</li>';
    list.hidden = false;
  }
  function query() { return input.value.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  if (input) {
    var onInput = function () {
      if (P.searchUrl) loadIndex(function () { showResults(query()); });
      else filterRows(query());
    };
    input.addEventListener('input', onInput);
    if (P.searchUrl) input.addEventListener('focus', function () { loadIndex(function () {}); });
    input.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter') return;
      var first = document.querySelector('#searchResults a, [data-region]:not([hidden]) [data-name]:not([hidden]) a');
      if (first) location.href = first.getAttribute('href');
    });
  }

  /* ---------- Last city visited ---------- */
  var LAST = 'namaz.last.' + P.lang;
  if (P.kind === 'city' && loc) {
    save(LAST, { url: location.pathname, name: loc.name, loc: {
      lat: loc.lat, lng: loc.lng, tz: loc.tz, method: loc.method, jafariMethod: loc.jafariMethod, defaultSect: P.defaultSect,
    } });
  }
  // A saved city is only trusted if every field is one this site could have written.
  // Only a path on this site: "/pakistan/lahore/", never "//other-site.com" or "/\other-site.com".
  function validPath(u) { return typeof u === 'string' && /^\/[a-z0-9-]+(\/[a-z0-9-]+)*\/$/.test(u); }
  function lastLoc() {
    var last = load(LAST, null), l = last && last.loc;
    if (!l || !validPath(last.url) || typeof last.name !== 'string') return null;
    if (typeof l.lat !== 'number' || typeof l.lng !== 'number' || Math.abs(l.lat) > 90 || Math.abs(l.lng) > 180) return null;
    if (!C.METHOD_EN[l.method] || (l.jafariMethod && !C.METHOD_EN[l.jafariMethod]) || C.SECTS.indexOf(l.defaultSect) === -1) return null;
    try { new Intl.DateTimeFormat('en', { timeZone: l.tz }); } catch (e) { return null; }
    return { url: last.url, loc: { name: last.name, lat: l.lat, lng: l.lng, tz: l.tz, method: l.method, jafariMethod: l.jafariMethod, defaultSect: l.defaultSect } };
  }

  // Prayer pages: show the prayer's window for the visitor's last city (or the page's default city).
  if (P.kind === 'prayer' && $('prayerLive')) {
    var saved = lastLoc(), pl = saved ? saved.loc : P.pl;
    P.defaultSect = pl.defaultSect;
    $('prayerLive').innerHTML = C.renderPrayerLive(pl, ctx(), P.prayer, new Date());
    if (saved && $('prayerCity')) {
      $('prayerCity').href = saved.url;
      $('prayerCity').textContent = C.tpl(P.g.seeCity, { city: saved.loc.name });
    }
  }
  // Hijri calendar: month grid (any month and year), the year's months table, and the two converters.
  if (P.kind === 'hijri' && $('hgTable')) (function () {
    var hc = P.hc, cx = ctx(), zone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    var tp = C.partsInTz(new Date(), zone), th = C.hijriParts(tp.y, tp.m, tp.d, 0), gy = th.y, gm = th.m;
    var clamp = function (y) { return Math.min(P.hMax, Math.max(P.hMin, y)); };
    function drawGrid() {
      var r = C.renderHijriGrid(gy, gm, cx, th, P.firstDay);
      if (!r) return;
      $('hgTitle').textContent = r.title; $('hgSub').textContent = r.sub; $('hgTable').innerHTML = r.table; $('hgYear').value = gy;
    }
    function drawYear() {
      var rows = '';
      for (var m = 1; m <= 12; m++) {
        var s = C.hijriToGregorian(gy, m, 1);
        if (!s) continue;
        rows += '<tr' + (gy === th.y && m === th.m ? ' class="is-today"' : '') + '><th scope="row">' + C.esc(cx.t.hijriMonths[m - 1]) + '</th><td>' +
          C.esc(C.gregorian(s.y, s.m, s.d, 'full', cx)) + '</td><td>' + C.esc(C.num(C.hijriMonthDays(gy, m), cx)) + '</td></tr>';
      }
      if ($('hMonths')) $('hMonths').innerHTML = rows;
      if ($('hMonthsH2')) $('hMonthsH2').textContent = C.tpl(hc.monthsH2, { year: C.num(gy, cx) + ' ' + cx.t.hijriEra });
    }
    function go(dm) {
      gm += dm;
      if (gm < 1) { gm = 12; gy--; } else if (gm > 12) { gm = 1; gy++; }
      if (gy < P.hMin || gy > P.hMax) { gy = clamp(gy); gm = dm < 0 ? 1 : 12; }
      var yearChanged = String(gy) !== $('hgYear').value;
      drawGrid(); if (yearChanged) drawYear();
    }
    $('hgPrev').addEventListener('click', function () { go(-1); });
    $('hgNext').addEventListener('click', function () { go(1); });
    $('hgToday').addEventListener('click', function () { gy = th.y; gm = th.m; drawGrid(); drawYear(); });
    $('hgYear').addEventListener('change', function () {
      var y = parseInt($('hgYear').value, 10);
      if (isNaN(y)) return;
      gy = clamp(y); drawGrid(); drawYear();
    });
    drawGrid();
    $('h2gM').value = String(th.m); $('h2gD').value = String(th.d);
    $('g2h').addEventListener('submit', function (e) {
      e.preventDefault();
      var v = $('g2hDate').value.split('-'), y = +v[0], m = +v[1], d = +v[2];
      if (!y || !m || !d) return;
      var h = C.hijriParts(y, m, d, 0);
      $('g2hOut').textContent = h.y < P.hMin || h.y > P.hMax ? C.tpl(hc.range, { a: C.num(P.hMin, cx), b: C.num(P.hMax, cx) })
        : C.tpl(hc.res, { from: C.gregorian(y, m, d, 'full', cx), to: C.hijriText(h.y, h.m, h.d, cx) });
    });
    $('h2g').addEventListener('submit', function (e) {
      e.preventDefault();
      var y = parseInt($('h2gY').value, 10), m = +$('h2gM').value, d = +$('h2gD').value;
      if (isNaN(y) || y < P.hMin || y > P.hMax) { $('h2gOut').textContent = C.tpl(hc.range, { a: C.num(P.hMin, cx), b: C.num(P.hMax, cx) }); return; }
      var g = C.hijriToGregorian(y, m, d);
      $('h2gOut').textContent = !g ? hc.bad : C.tpl(hc.res, { from: C.hijriText(y, m, d, cx), to: C.gregorian(g.y, g.m, g.d, 'full', cx) });
    });
  })();

  // Islamic date pages: days left until the event, counted in the visitor's own time zone.
  if (P.kind === 'event' && $('evDays') && P.evDate) {
    var ez = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC', et = C.partsInTz(new Date(), ez), ed = P.evDate.split('-');
    var left = Math.round((Date.UTC(+ed[0], +ed[1] - 1, +ed[2]) - Date.UTC(et.y, et.m - 1, et.d)) / 864e5);
    if (left >= 0) $('evDays').textContent = left === 0 ? P.evToday : C.tpl(P.evDays, { n: C.num(left, ctx()) });
  }
  // Hijri calendar: today's date in the visitor's own time zone, with their Hijri adjustment.
  if (P.kind === 'hijri' && $('hijriToday')) {
    var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC', td = C.partsInTz(new Date(), tz), hc = ctx();
    $('hijriToday').textContent = C.tpl(P.g.hToday, { hijri: C.hijri(td.y, td.m, td.d, hc, 'full'), date: C.gregorian(td.y, td.m, td.d, 'full', hc) });
  }

  var lastSlot = $('lastSlot');
  if (lastSlot) {
    var last = load(LAST, null);
    if (last && validPath(last.url) && last.url !== location.pathname) {
      var a = document.createElement('a');
      a.className = 'continue';
      a.href = last.url;
      a.textContent = C.tpl(P.t.openLast, { city: String(last.name) });
      lastSlot.appendChild(a);
    }
  }

  /* ---------- Near me ---------- */
  function status(msg) { var el = $('nearStatus'); if (el) el.textContent = msg; }

  function locate() {
    if (P.kind !== 'near') { location.href = P.nearUrl + '#locate'; return; }
    if (!navigator.geolocation) { status(P.t.noGeo); return; }
    status(P.t.locating);
    navigator.geolocation.getCurrentPosition(function (pos) {
      showNear(pos.coords.latitude, pos.coords.longitude);
    }, function () {
      status(P.t.geoBlocked);
    }, { enableHighAccuracy: false, timeout: 15000, maximumAge: 600000 });
  }

  function showNear(lat, lng) {
    fetch(P.citiesUrl).then(function (r) { return r.json(); }).then(function (data) {
      var best = null;
      data.cities.forEach(function (row) {
        var km = C.distanceKm(lat, lng, row[2], row[3]);
        if (!best || km < best.km) best = { row: row, km: km };
      });
      var country = best && data.countries[best.row[0]];
      // Within 60 km of a listed city: open that city's page in the current language.
      if (best && best.km <= 60) {
        location.replace(P.prefix + best.row[0] + '/' + best.row[1] + '/');
        return;
      }
      var browserTz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
      var sameCountry = best && best.km <= 400 && (best.row[4] || country.tz) === browserTz;
      loc = {
        name: P.t.yourArea, lat: lat, lng: lng, tz: browserTz,
        method: sameCountry ? (best.row[5] ? best.row[5][0] : country.method) : 'MuslimWorldLeague',
        jafariMethod: sameCountry ? country.jafariMethod : undefined,
        extraCalendar: sameCountry ? country.extraCalendar : undefined,
      };
      if (sameCountry) P.defaultSect = best.row[5] ? best.row[5][1] : country.defaultSect;
      h1 = P.t.yourLocation;
      status('');
      if (!$('today')) $('nearResult').innerHTML = P.skeleton;
      $('nearResult').hidden = false;
      $('qiblaCard').innerHTML = C.qiblaCard(lat, lng, ctx());
      $('mosquesSlot').innerHTML = C.mosquesCard(lat, lng, P.t.mosquesNearYou, ctx());
      start();
      $('nearResult').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }).catch(function () { status(P.t.geoBlocked); });
  }

  if (P.kind === 'near') {
    if (location.hash === '#locate') locate();
    window.addEventListener('hashchange', function () { if (location.hash === '#locate') locate(); });
  }

  /* ---------- Start ---------- */
  /* ---------- Qibla finder ---------- */
  if (P.kind === 'qibla' && $('qbFind')) {
    $('qbFind').addEventListener('click', function () {
      var st = $('qbStatus');
      if (!navigator.geolocation) { st.textContent = P.t.noGeo; return; }
      st.textContent = P.t.locating;
      navigator.geolocation.getCurrentPosition(function (pos) {
        st.textContent = '';
        $('qiblaResult').innerHTML = C.qiblaCard(pos.coords.latitude, pos.coords.longitude, ctx());
        $('qiblaResult').hidden = false;
      }, function () { st.textContent = P.t.geoBlocked; }, { enableHighAccuracy: false, timeout: 15000, maximumAge: 600000 });
    });
  }

  /* ---------- Mosque widget builder ---------- */
  if (P.kind === 'widget' && $('wCity')) {
    var updateWidget = function () {
      var sel = $('wCity'), c = sel.value, sect = $('wSect').value, name = sel.options[sel.selectedIndex].text;
      var q = '?c=' + c + (sect ? '&s=' + sect : '');
      var credit = C.tpl(P.credit, { city: name }).replace(/&/g, '&amp;').replace(/</g, '&lt;');
      $('wCode').value = '<iframe src="' + P.site + P.embedUrl + q + '" title="' + credit.replace(/"/g, '&quot;') + '" width="100%" height="330" style="border:0;max-width:380px" loading="lazy"></iframe>\n' +
        '<p><a href="' + P.site + P.prefix + c + '/">' + credit + '</a></p>';
      // The preview loads after the page itself, so it never slows the first paint.
      if (document.readyState === 'complete') $('wFrame').src = P.embedUrl + q;
      else window.addEventListener('load', function () { $('wFrame').src = P.embedUrl + q; }, { once: true });
    };
    $('wCity').addEventListener('change', updateWidget);
    $('wSect').addEventListener('change', updateWidget);
    $('wCopy').addEventListener('click', function () {
      var btn = this, done = function () { btn.textContent = btn.getAttribute('data-done'); };
      if (navigator.clipboard) navigator.clipboard.writeText($('wCode').value).then(done, function () { $('wCode').select(); });
      else { $('wCode').select(); document.execCommand('copy'); done(); }
    });
    updateWidget();
  }

  /* ---------- Embedded widget (inside a mosque's website) ---------- */
  if (P.kind === 'embed') {
    var qs = new URLSearchParams(location.search), cp = qs.get('c') || '', sp = qs.get('s');
    var box = $('embed');
    if (/^[a-z0-9-]+\/[a-z0-9-]+$/.test(cp)) {
      Promise.all([fetch(P.citiesUrl).then(function (r) { return r.json(); }), fetch(P.searchUrl).then(function (r) { return r.json(); })])
        .then(function (res) {
          var data = res[0], idx = res[1], parts = cp.split('/'), row = null, name = null, href = P.prefix + cp + '/';
          data.cities.forEach(function (r) { if (r[0] === parts[0] && r[1] === parts[1]) row = r; });
          idx.forEach(function (e) { if (e[2] === href) name = e[0]; });
          if (!row || !name) return;
          var country = data.countries[row[0]];
          var eloc = { name: name, lat: row[2], lng: row[3], tz: row[4] || country.tz, method: row[5] ? row[5][0] : country.method, jafariMethod: country.jafariMethod };
          // The widget's school comes from its code, never from this browser's saved settings.
          S = Object.assign({}, DEFAULTS, { sect: C.SECTS.indexOf(sp) !== -1 ? sp : country.defaultSect });
          var draw = function () {
            var c = ctx(), now = new Date(), snap = C.snapshot(eloc, c, now), d = snap.date;
            box.innerHTML = '<a class="embed-city" href="' + href + '" target="_blank" rel="noopener">' + C.esc(name) + '</a>' +
              '<p class="embed-date">' + C.esc(C.gregorian(d.y, d.m, d.d, 'full', c)) + ' · ' + C.esc(C.hijri(d.y, d.m, d.d, c, 'full')) + '</p><ol class="embed-times">' +
              C.PRAYERS.map(function (k) {
                var next = !snap.next.tomorrow && snap.next.key === k;
                return '<li' + (next ? ' class="is-next"' : '') + '><span>' + C.esc(c.t.prayers[k]) + '</span><bdi>' + C.esc(C.fmtTime(snap.times[k], eloc.tz, c)) + '</bdi></li>';
              }).join('') + '</ol><p class="embed-credit">' + C.esc(c.t.sects[c.sect]) + ' · <a href="/" target="_blank" rel="noopener">SalaahDaily</a></p>';
          };
          draw();
          setInterval(draw, 60000);
        });
    }
  }

  if (loc) start(); else renderAll();
  liveCards();
})();
