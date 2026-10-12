/*
 * Google AdSense loader, on content pages only (not legal pages, the home page or the widget), and only when site.config.js has
 * adsense.client and adsense.live (build.js puts the client id in for __AD_CLIENT__).
 * - adsbygoogle.js is fetched after the page has loaded, so it never delays the prayer times.
 * - Each <ins class="adsbygoogle"> slot (placed below the prayer times, with its height reserved in CSS) is filled once;
 *   with no slots on the page, Auto ads (if switched on in AdSense) places its own units.
 * - Consent in the EEA, the UK and Switzerland comes from Google's own consent message (AdSense > Privacy & messaging),
 *   which adsbygoogle.js shows by itself; no other banner is needed.
 * A separate file because the Content-Security-Policy allows no inline scripts.
 */
(function () {
  'use strict';
  var client = '__AD_CLIENT__';
  var slots = document.querySelectorAll('ins.adsbygoogle');
  function load() {
    var s = document.createElement('script');
    s.async = true;
    s.crossOrigin = 'anonymous';
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + encodeURIComponent(client);
    document.head.appendChild(s);
    window.adsbygoogle = window.adsbygoogle || [];
    for (var i = 0; i < slots.length; i++) window.adsbygoogle.push({});
  }
  if (document.readyState === 'complete') setTimeout(load, 0);
  else window.addEventListener('load', function () { setTimeout(load, 0); });
})();
