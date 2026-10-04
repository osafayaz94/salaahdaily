/*
 * Crescent visibility prediction: where the new moon can be seen on the evenings after conjunction.
 * Moon from Meeus, Astronomical Algorithms ch. 47 (main terms, about 0.01 degree), Sun from ch. 25.
 * Visibility from Odeh (2004), "New criterion for lunar crescent visibility", Experimental Astronomy 18:
 * V = ARCV - (7.1651 - 6.3226 W + 0.7319 W^2 - 0.1018 W^3), at sunset + 4/9 of the moon's lag.
 *   V >= 5.65 visible to the naked eye (A); 2 <= V < 5.65 needs optical aid, could be seen by eye (B);
 *   -0.96 <= V < 2 only with optical aid (C); below that not visible (D).
 * Loaded only on the Hijri calendar page.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.Moon = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  var R = Math.PI / 180, MIN = 6e4, TT = 69e3; // TT - UT, about 69 s in the 2020s
  function sin(x) { return Math.sin(x * R); }
  function cos(x) { return Math.cos(x * R); }
  function norm(x) { x %= 360; return x < 0 ? x + 360 : x; }
  function jd(ms) { return ms / 864e5 + 2440587.5; }

  // [D, M, M', F, longitude (1e-6 deg), distance (1e-3 km)]
  var LR = [
    [0, 0, 1, 0, 6288774, -20905355], [2, 0, -1, 0, 1274027, -3699111], [2, 0, 0, 0, 658314, -2955968],
    [0, 0, 2, 0, 213618, -569925], [0, 1, 0, 0, -185116, 48888], [0, 0, 0, 2, -114332, -3149],
    [2, 0, -2, 0, 58793, 246158], [2, -1, -1, 0, 57066, -152138], [2, 0, 1, 0, 53322, -170733],
    [2, -1, 0, 0, 45758, -204586], [0, 1, -1, 0, -40923, -129620], [1, 0, 0, 0, -34720, 108743],
    [0, 1, 1, 0, -30383, 104755], [2, 0, 0, -2, 15327, 10321], [0, 0, 1, 2, -12528, 0],
    [0, 0, 1, -2, 10980, 79661], [4, 0, -1, 0, 10675, -34782], [0, 0, 3, 0, 10034, -23210],
    [4, 0, -2, 0, 8548, -21636], [2, 1, -1, 0, -7888, 24208], [2, 1, 0, 0, -6766, 30824],
    [1, 0, -1, 0, -5163, -8379], [1, 1, 0, 0, 4987, -16675], [2, -1, 1, 0, 4036, -12831],
    [2, 0, 2, 0, 3994, -10445], [4, 0, 0, 0, 3861, -11650], [2, 0, -3, 0, 3665, 14403],
    [0, 1, -2, 0, -2689, -7003], [2, 0, -1, 2, -2602, 0], [2, -1, -2, 0, 2390, 10056],
    [1, 0, 1, 0, -2348, 6322], [2, -2, 0, 0, 2236, -9884],
  ];
  // [D, M, M', F, latitude (1e-6 deg)]
  var B = [
    [0, 0, 0, 1, 5128122], [0, 0, 1, 1, 280602], [0, 0, 1, -1, 277693], [2, 0, 0, -1, 173237],
    [2, 0, -1, 1, 55413], [2, 0, -1, -1, 46271], [2, 0, 0, 1, 32573], [0, 0, 2, 1, 17198],
    [2, 0, 1, -1, 9266], [0, 0, 2, -1, 8822], [2, -1, 0, -1, 8216], [2, 0, -2, -1, 4324],
    [2, 0, 1, 1, 4200], [2, 1, 0, -1, -3359], [2, -1, -1, 1, 2463], [2, -1, 0, 1, 2211],
    [2, -1, -1, -1, 2065], [0, 1, -1, -1, -1870], [4, 0, -1, -1, 1828], [0, 1, 0, 1, -1794],
    [0, 0, 0, 3, -1749], [0, 1, -1, 1, -1565], [1, 0, 0, 1, -1491], [0, 1, 1, 1, -1475],
    [0, 1, 1, -1, -1410], [0, 1, 0, -1, -1344], [1, 0, 0, -1, -1335], [0, 0, 3, 1, 1107],
  ];

  // Geocentric ecliptic longitude, latitude (degrees) and distance (km) of the Moon and the Sun.
  function bodies(ms) {
    var T = (jd(ms + TT) - 2451545) / 36525;
    var Lp = 218.3164477 + 481267.88123421 * T, D = 297.8501921 + 445267.1114034 * T,
      M = 357.5291092 + 35999.0502909 * T, Mp = 134.9633964 + 477198.8675055 * T, F = 93.272095 + 483202.0175233 * T,
      E = 1 - 0.002516 * T - 0.0000074 * T * T, A1 = 119.75 + 131.849 * T, A2 = 53.09 + 479264.29 * T, A3 = 313.45 + 481266.484 * T;
    var sl = 0, sr = 0, sb = 0, i, t, e, a;
    for (i = 0; i < LR.length; i++) {
      t = LR[i]; e = Math.pow(E, Math.abs(t[1])); a = t[0] * D + t[1] * M + t[2] * Mp + t[3] * F;
      sl += t[4] * e * sin(a); sr += t[5] * e * cos(a);
    }
    for (i = 0; i < B.length; i++) {
      t = B[i]; e = Math.pow(E, Math.abs(t[1]));
      sb += t[4] * e * sin(t[0] * D + t[1] * M + t[2] * Mp + t[3] * F);
    }
    sl += 3958 * sin(A1) + 1962 * sin(Lp - F) + 318 * sin(A2);
    sb += -2235 * sin(Lp) + 382 * sin(A3) + 175 * sin(A1 - F) + 175 * sin(A1 + F) + 127 * sin(Lp - Mp) - 115 * sin(Lp + Mp);
    var Ms = 357.52911 + 35999.05029 * T, C = (1.914602 - 0.004817 * T) * sin(Ms) + (0.019993 - 0.000101 * T) * sin(2 * Ms) + 0.000289 * sin(3 * Ms);
    return {
      T: T, eps: 23.4392911 - 0.0130042 * T,
      moon: { lon: norm(Lp + sl / 1e6), lat: sb / 1e6, dist: 385000.56 + sr / 1000 },
      sun: { lon: norm(280.46646 + 36000.76983 * T + C - 0.00569), lat: 0 },
    };
  }
  // Altitude and azimuth (degrees) of an ecliptic position at a place, airless and geocentric.
  function horizon(p, eps, ms, lat, lng) {
    var ra = Math.atan2(sin(p.lon) * cos(eps) - Math.tan(p.lat * R) * sin(eps), cos(p.lon)) / R,
      dec = Math.asin(sin(p.lat) * cos(eps) + cos(p.lat) * sin(eps) * sin(p.lon)) / R,
      d = jd(ms) - 2451545, gmst = 280.46061837 + 360.98564736629 * d, H = norm(gmst + lng - ra);
    var alt = Math.asin(sin(lat) * sin(dec) + cos(lat) * cos(dec) * cos(H)) / R,
      az = norm(Math.atan2(sin(H), cos(H) * sin(lat) - Math.tan(dec * R) * cos(lat)) / R + 180);
    return { alt: alt, az: az };
  }
  // Sun and Moon as seen from the place: the Moon with parallax, its semi-diameter in arcminutes.
  function sky(ms, lat, lng) {
    var b = bodies(ms), s = horizon(b.sun, b.eps, ms, lat, lng), m = horizon(b.moon, b.eps, ms, lat, lng);
    var par = Math.asin(6378.14 / b.moon.dist) / R, alt = m.alt - par * cos(m.alt);
    return { sun: s, moon: { alt: alt, az: m.az, sd: 0.2725076 * par * 60 * (1 + sin(alt) * sin(par)) }, elong: norm(b.moon.lon - b.sun.lon) };
  }
  // First moment in [from, to] when f(ms) turns from >= 0 to < 0 (5 minute steps, then halving to a few seconds).
  function crossDown(f, from, to) {
    var a = from, fa = f(a);
    for (var b = from + 5 * MIN; b <= to; b += 5 * MIN) {
      var fb = f(b);
      if (fa >= 0 && fb < 0) {
        while (b - a > 5000) { var c = (a + b) / 2; if (f(c) >= 0) a = c; else b = c; }
        return b;
      }
      a = b; fa = fb;
    }
    return null;
  }
  // The new moon (conjunction in longitude) next after the given time.
  function conjunction(after) {
    var e = function (ms) { var x = bodies(ms); return norm(x.moon.lon - x.sun.lon); };
    var a = after, ea = e(a);
    for (var b = after + 6 * 36e5; b < after + 32 * 864e5; b += 6 * 36e5) {
      var eb = e(b);
      if (eb < ea) { // elongation wrapped from about 360 to 0
        while (b - a > 1000) { var c = (a + b) / 2; if (e(c) < ea) b = c; else a = c; }
        return b;
      }
      a = b; ea = eb;
    }
    return null;
  }
  // One evening at the place. day: UTC milliseconds of that calendar date (00:00), lng east positive.
  function evening(day, lat, lng, conj) {
    var noon = day + 12 * 36e5 - lng / 15 * 36e5;
    var sunset = crossDown(function (ms) { return sky(ms, lat, lng).sun.alt + 0.833; }, noon, noon + 14 * 36e5);
    if (sunset == null) return { zone: 'none' };
    var out = { sunset: sunset };
    if (sunset < conj) { out.zone = 'pre'; return out; }
    var s0 = sky(sunset, lat, lng);
    if (s0.moon.alt < -0.5667 - s0.moon.sd / 60) { out.zone = 'set'; return out; }
    var moonset = crossDown(function (ms) { var k = sky(ms, lat, lng); return k.moon.alt + 0.5667 + k.moon.sd / 60; }, sunset, sunset + 8 * 36e5);
    out.moonset = moonset;
    var best = sunset + (moonset ? (moonset - sunset) * 4 / 9 : 0), k = sky(best, lat, lng);
    var arcv = k.moon.alt - k.sun.alt, daz = k.moon.az - k.sun.az;
    var arcl = Math.acos(cos(arcv) * cos(daz)) / R, w = k.moon.sd * (1 - cos(arcl));
    var v = arcv - (7.1651 - 6.3226 * w + 0.7319 * w * w - 0.1018 * w * w * w);
    out.v = v; out.age = (best - conj) / 36e5;
    out.zone = v >= 5.65 ? 'A' : v >= 2 ? 'B' : v >= -0.96 ? 'C' : 'D';
    return out;
  }
  // The next crescent for a place: the new moon after `from` and the first two evenings after it.
  // dayOf(ms) gives the place's calendar date at that moment as UTC midnight milliseconds.
  function crescent(from, lat, lng, dayOf) {
    var conj = conjunction(from);
    if (conj == null) return null;
    var nights = [], day = dayOf(conj);
    for (var i = 0; i < 4 && nights.length < 2; i++, day += 864e5) {
      var ev = evening(day, lat, lng, conj);
      ev.day = day;
      if (ev.zone !== 'pre') nights.push(ev);
    }
    return { conj: conj, nights: nights };
  }
  // The result as HTML. s: strings for the language (src/strings-moon.js); f: { time(ms), date(dayMs), esc }.
  function html(res, s, f) {
    if (!res) return '';
    return '<p>' + f.esc(s.conj.replace('{time}', f.date(res.conj) + ', ' + f.time(res.conj))) + '</p><ul class="mc-list">' +
      res.nights.map(function (n) {
        var times = n.moonset ? '<span class="muted small">' + f.esc(s.times.replace('{sun}', f.time(n.sunset)).replace('{moon}', f.time(n.moonset))) + '</span>' : '';
        return '<li><strong>' + f.esc(s.eve.replace('{date}', f.date(n.day))) + '</strong> <span class="mc-z mc-' + n.zone + '">' +
          f.esc(s[n.zone === 'none' ? 'none' : n.zone]) + '</span>' + times + '</li>';
      }).join('') + '</ul>';
  }
  return { crescent: crescent, conjunction: conjunction, evening: evening, sky: sky, html: html };
});
