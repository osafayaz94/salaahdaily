/*
 * National Hijri calendars: when each month actually began in countries that announce it (moon sighting
 * or their own published calendar). Pages for these countries show these dates instead of Umm al-Qura.
 * Rows: [Hijri year, Hijri month, Gregorian year, month, day] = the first day of that month there.
 * open: true means the newest month's end is not announced yet; it is shown as up to 30 days until the
 * next row is added. Outside the rows, the site falls back to the Umm al-Qura calendar.
 * Update after each announcement (a scheduled task checks and prepares this for review).
 *
 * Sources (announcements reported in national media):
 *   Pakistan, Central Ruet-e-Hilal Committee: Rabi I 1448 from Sat 15 Aug 2026
 *     (geo.tv/latest/677497), Rabi II 1448 from Mon 14 Sep 2026 (nation.com.pk 13-Sep-2026, brecorder.com/news/40268405)
 *   Bangladesh, National Moon Sighting Committee: Rabi I 1448 from 15 Aug 2026 (thedailystar.net, Eid-e-Miladunnabi
 *     on 26 Aug), Rabi II 1448 from 13 Sep 2026 (bssnews.net/others/424041, Fateha-e-Yazdaham on 23 Sep)
 *   Morocco, Ministry of Habous: Rabi II 1448 from Sun 13 Sep 2026 after a 30-day Rabi I (fr.hespress.com/488096)
 *   Indonesia, Kemenag calendar: Rabiul Akhir 1448 from Sun 13 Sep 2026, 12 Sep being 30 Rabiul Awal
 *     (sumsel.tribunnews.com/lifestyle/1028408)
 *   Malaysia, JAKIM calendar: Rabiulakhir 1448 from Sun 13 Sep 2026 (taqwa.my/kalendar-islam-2026)
 *   Turkey: src/hijri-diyanet.js (published in advance)
 */
'use strict';

var { DIYANET } = require('./hijri-diyanet');

var NATIONAL = {
  turkey: { rows: DIYANET, open: false, by: 'Diyanet' },
  pakistan: { rows: [[1448, 3, 2026, 8, 15], [1448, 4, 2026, 9, 14]], open: true, by: 'Central Ruet-e-Hilal Committee' },
  bangladesh: { rows: [[1448, 3, 2026, 8, 15], [1448, 4, 2026, 9, 13]], open: true, by: 'National Moon Sighting Committee' },
  morocco: { rows: [[1448, 3, 2026, 8, 14], [1448, 4, 2026, 9, 13]], open: true, by: 'Ministry of Habous and Islamic Affairs' },
  indonesia: { rows: [[1448, 3, 2026, 8, 14], [1448, 4, 2026, 9, 13]], open: true, by: 'Kemenag' },
  malaysia: { rows: [[1448, 4, 2026, 9, 13]], open: true, by: 'JAKIM' },
};

// Rows ready for Core.useCalendar: an open month gets a provisional end 30 days after it began.
function calendarRows(slug) {
  var n = NATIONAL[slug];
  if (!n) return null;
  var rows = n.rows.slice();
  if (n.open) {
    var last = rows[rows.length - 1], end = new Date(Date.UTC(last[2], last[3] - 1, last[4] + 30));
    var hm = last[1] === 12 ? 1 : last[1] + 1, hy = last[1] === 12 ? last[0] + 1 : last[0];
    rows.push([hy, hm, end.getUTCFullYear(), end.getUTCMonth() + 1, end.getUTCDate()]);
  }
  return rows;
}

if (typeof module === 'object' && module.exports) module.exports = { NATIONAL: NATIONAL, calendarRows: calendarRows };
