/*
 * Turkey's official Hijri calendar: the first day of each month as published by Diyanet
 * (Presidency of Religious Affairs) in its yearly religious days lists:
 *   https://vakithesaplama.diyanet.gov.tr/icerik.php?icerik=153  (2026)
 *   https://vakithesaplama.diyanet.gov.tr/icerik.php?icerik=154  (2027)
 *   https://vakithesaplama.diyanet.gov.tr/icerik.php?icerik=185  (2028)
 * Rows: [Hijri year, Hijri month, Gregorian year, month, day]. The last row only marks where the
 * previous month ends; outside this range Turkish pages fall back to the Umm al-Qura calendar.
 * Add the next year's list when Diyanet publishes it.
 */
'use strict';

var DIYANET = [
  [1447, 8, 2026, 1, 20], [1447, 9, 2026, 2, 19], [1447, 10, 2026, 3, 20], [1447, 11, 2026, 4, 18], [1447, 12, 2026, 5, 18],
  [1448, 1, 2026, 6, 16], [1448, 2, 2026, 7, 15], [1448, 3, 2026, 8, 14], [1448, 4, 2026, 9, 12], [1448, 5, 2026, 10, 12],
  [1448, 6, 2026, 11, 10], [1448, 7, 2026, 12, 10], [1448, 8, 2027, 1, 9], [1448, 9, 2027, 2, 8], [1448, 10, 2027, 3, 9],
  [1448, 11, 2027, 4, 8], [1448, 12, 2027, 5, 7], [1449, 1, 2027, 6, 6], [1449, 2, 2027, 7, 5], [1449, 3, 2027, 8, 3],
  [1449, 4, 2027, 9, 2], [1449, 5, 2027, 10, 1], [1449, 6, 2027, 10, 31], [1449, 7, 2027, 11, 29], [1449, 8, 2027, 12, 29],
  [1449, 9, 2028, 1, 28], [1449, 10, 2028, 2, 26], [1449, 11, 2028, 3, 27], [1449, 12, 2028, 4, 26], [1450, 1, 2028, 5, 25],
  [1450, 2, 2028, 6, 24], [1450, 3, 2028, 7, 23], [1450, 4, 2028, 8, 21], [1450, 5, 2028, 9, 20], [1450, 6, 2028, 10, 19],
  [1450, 7, 2028, 11, 18], [1450, 8, 2028, 12, 17],
];

if (typeof module === 'object' && module.exports) module.exports = { DIYANET: DIYANET };
