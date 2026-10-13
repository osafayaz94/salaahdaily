module.exports = {
  // Your live domain, with https and no trailing slash. Canonical URLs, hreflang links
  // and the sitemap are all built from this, so set it before deploying.
  siteUrl: 'https://salaahdaily.com',
  // Brand (matches the domain) and its Arabic tagline. The brand ends every page title.
  siteName: 'SalaahDaily',
  siteNameAr: 'أوقات الصلاة',
  // IndexNow key (Bing, Yandex and others). The build publishes it as /<key>.txt to prove
  // you own the site. It isn't secret; generate a new one any time.
  indexNowKey: '86f4b98784d822f1a3584cf393de3eb0',
  // Web3Forms access key for the footer suggestion form (web3forms.com). It is meant to be public: it only
  // lets a form send to the inbox chosen at sign-up. Leave empty to hide the form.
  web3formsKey: '1961dd7e-68b7-499e-85a7-ddf1d90d59aa',
  // Public contact address shown on the Contact page (optional). Leave empty to show the form only.
  contactEmail: 'team@salaahdaily.com',
  // Google Analytics 4 Measurement ID (G-...). Public by design. Leave empty for no Google Analytics.
  // Loaded from src/ga.js after the page loads; not loaded for time zones in the EEA, UK or Switzerland.
  ga4Id: 'G-1B7T4ZN88N',
  // Cloudflare Web Analytics token (dash.cloudflare.com > Web Analytics > manual JS snippet, the "token" value).
  // Public by design. Leave empty for no analytics. Cookieless, so no consent banner is needed.
  cfAnalyticsToken: '',
  // Site verification codes: only the content="..." value of the meta tag each service gives you. Leave empty if unused.
  pinterestVerification: '14b1b43dc48bb9d20347627fa8d205ac', // Pinterest > Settings > Claim > Websites > "Add HTML tag" (p:domain_verify)
  bingVerification: '', // Bing Webmaster Tools > Add site > HTML Meta Tag (msvalidate.01)
  // Official profile URLs (Facebook, X, Pinterest, YouTube, LinkedIn...). They go in the Organization schema as sameAs.
  sameAs: ['https://www.facebook.com/profile.php?id=61595367984247', 'https://www.pinterest.com/Salaahdaily/', 'https://www.instagram.com/salaahdaily/'],
  // Google AdSense. Nothing ad-related is output while client is empty.
  //   client: 'ca-pub-...' (AdSense > Account > Account information: Publisher ID, with "ca-" in front).
  //     Setting it adds ads.txt, the AdSense verification meta tag and the advertising section of the privacy policy,
  //     which the AdSense review needs. No ads are shown yet.
  //   live: true after AdSense approves the site: loads ads in the slots below the prayer times.
  //   slot: the ad unit id (AdSense > Ads > By ad unit > Display ad, "responsive"); empty uses Auto ads' in-page units.
  adsense: { client: '', live: false, slot: '' },
};
