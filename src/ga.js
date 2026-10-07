/*
 * Google Analytics 4, loaded only when site.config.js has ga4Id (build.js puts the id in for __GA_ID__).
 * - Not loaded at all for visitors whose device time zone is in the EEA, the UK or Switzerland, or unknown:
 *   there is no consent banner yet (it comes with AdSense, as a Google-certified one).
 * - Advertising storage is denied everywhere; only analytics cookies are allowed.
 * - gtag.js is fetched after the page has loaded, so it never delays the prayer times.
 * A separate file because the Content-Security-Policy allows no inline scripts.
 */
(function () {
  'use strict';
  var id = '__GA_ID__';
  var tz = '';
  try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) { /* old browser: treated as unknown */ }
  // Europe/* minus the zones only used outside the EEA, UK and Switzerland (Turkey, Russia, Belarus, Ukraine, Moldova).
  var europeOutside = /^Europe\/(Istanbul|Moscow|Kaliningrad|Samara|Volgograd|Saratov|Ulyanovsk|Astrakhan|Kirov|Minsk|Kiev|Kyiv|Simferopol|Chisinau)$/;
  // EEA or UK zones outside Europe/*: Iceland, Spanish and Portuguese islands, Ceuta, Cyprus, Svalbard, the French overseas regions.
  var eeaOther = /^(Atlantic\/(Reykjavik|Canary|Madeira|Azores|Faroe)|Africa\/Ceuta|Asia\/(Nicosia|Famagusta)|Arctic\/Longyearbyen|Indian\/(Reunion|Mayotte)|America\/(Guadeloupe|Martinique|Cayenne|St_Barthelemy|Marigot))$/;
  if (!tz || (/^Europe\//.test(tz) && !europeOutside.test(tz)) || eeaOther.test(tz)) return;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'granted' });
  gtag('js', new Date());
  gtag('config', id);

  function load() {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(s);
  }
  if (document.readyState === 'complete') setTimeout(load, 0);
  else window.addEventListener('load', function () { setTimeout(load, 0); });
})();
