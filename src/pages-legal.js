/*
 * Contact, privacy and terms pages (English only), plus their footer link labels in every language.
 * Each page is a list of [heading, paragraph, ...] sections. {contact} becomes a link to the Contact page
 * (or "the suggestion form below" when there is none), {google} and {web3forms} link to those policies.
 * Only describe what the site really does: no accounts, no adverts, no analytics, settings in localStorage.
 * Change POLICY_DATE whenever the wording of the privacy policy or the terms changes.
 */
'use strict';

var POLICY_DATE = '2026-10-01';

// [contact, privacy, terms]
var LABELS = {
  en: ['Contact', 'Privacy policy', 'Terms of use'],
  ur: ['رابطہ', 'پرائیویسی پالیسی', 'استعمال کی شرائط'],
  hi: ['संपर्क', 'गोपनीयता नीति', 'उपयोग की शर्तें'],
  bn: ['যোগাযোগ', 'গোপনীয়তা নীতি', 'ব্যবহারের শর্তাবলি'],
  id: ['Kontak', 'Kebijakan privasi', 'Ketentuan penggunaan'],
  ms: ['Hubungi kami', 'Dasar privasi', 'Terma penggunaan'],
  fa: ['تماس', 'حریم خصوصی', 'شرایط استفاده'],
  ps: ['اړیکه', 'د محرمیت تګلاره', 'د کارونې شرایط'],
  es: ['Contacto', 'Privacidad', 'Términos de uso'],
  fr: ['Contact', 'Confidentialité', 'Conditions d’utilisation'],
  ar: ['اتصل بنا', 'سياسة الخصوصية', 'شروط الاستخدام'],
  tr: ['İletişim', 'Gizlilik politikası', 'Kullanım koşulları'],
  ha: ['Tuntuɓe mu', 'Manufar sirri', 'Sharuɗɗan amfani'],
  de: ['Kontakt', 'Datenschutz', 'Nutzungsbedingungen'],
  pt: ['Contato', 'Privacidade', 'Termos de uso'],
  it: ['Contatti', 'Privacy', 'Termini d’uso'],
  ja: ['お問い合わせ', 'プライバシーポリシー', '利用規約'],
  ko: ['문의', '개인정보 처리방침', '이용약관'],
};

var CONTACT = {
  title: 'Contact SalaahDaily: Report a Wrong Time or Missing City',
  desc: 'Tell us about a wrong prayer time, a missing city, a translation that reads badly, or an idea for the site. We read every message.',
  h1: 'Contact SalaahDaily',
  lede: 'Found a prayer time that does not match your masjid, a city that is missing, or a translation that reads badly? Tell us. We read every message.',
  tipsH: 'Reporting a wrong time',
  tips: 'Please include the city, the date, the prayer, and the timetable or masjid you compared with. If your country publishes an official timetable, a link to it helps most: we fit our calculations to official timetables wherever they exist.',
  formH: 'Send a message',
  formLabel: 'Your message',
  emailH: 'Email',
  emailP: 'You can also write to',
};

var PRIVACY = {
  title: 'Privacy Policy | SalaahDaily',
  desc: 'SalaahDaily has no accounts, no adverts and no tracking. Your settings stay in your browser and your location never leaves your device.',
  h1: 'Privacy policy',
  lede: 'SalaahDaily shows prayer times. It has no accounts, no adverts, and no analytics or tracking scripts. This page explains the little data that is involved when you use it.',
  sections: [
    ['What stays on your device',
      'Your settings (school of thought, calculation method, 12 or 24 hour clock, Hijri date adjustment) and the last city you opened are saved in your browser’s local storage, so the site remembers them next time. They are not sent to us. You can remove them at any time by clearing this site’s data in your browser.'],
    ['Your location',
      'The “near me” button asks your browser for your location only when you press it. The nearest city is worked out inside your browser, from the city list the page has already loaded. Your coordinates are not sent to us and are not stored. You can refuse or withdraw the permission in your browser settings.'],
    ['Cookies',
      'SalaahDaily does not set cookies of its own. Our hosting provider’s security service may set a short-lived cookie to check that a visitor is a real browser and not an automated attack.'],
    ['Server logs',
      'Like every website, our hosting provider (Hostinger) receives standard technical data with each request: your IP address, the page requested, the time, and your browser’s user agent. This is used to deliver the site and to protect it from abuse. We do not combine it with anything else to identify you.'],
    ['Fonts',
      'Pages load their fonts from Google Fonts, so your browser connects to Google’s servers, which receive your IP address. See {google}.'],
    ['Messages you send us',
      'If you use the contact or suggestion form, your message, the page you sent it from, and the email address you choose to give (it is optional) are delivered to our inbox by Web3Forms. We use them only to read and answer your message. See {web3forms}.'],
    ['The mosque widget',
      'When a mosque or another website shows our prayer times widget, your browser loads it from salaahdaily.com, and the notes above about server logs and fonts apply in the same way. The widget sets no cookies.'],
    ['What we never do',
      'We do not sell or rent personal data, we do not show adverts, and we do not build profiles of visitors.'],
    ['Changes',
      'If this policy changes, the new version will be posted on this page with a new date.'],
    ['Questions',
      'For any question about privacy, use {contact}.'],
  ],
};

var TERMS = {
  title: 'Terms of Use | SalaahDaily',
  desc: 'The terms for using SalaahDaily: a free service, prayer times that are calculations, and how you may share and embed them.',
  h1: 'Terms of use',
  lede: 'By using SalaahDaily you agree to these terms. They are short.',
  sections: [
    ['A free service',
      'SalaahDaily is free to use and needs no account. We may change, add or remove features, cities or languages at any time.'],
    ['Prayer times are calculations',
      'Times are calculated from the sun’s position using published calculation methods and, where they exist, fitted to official timetables. They can differ from your local masjid or religious authority by a few minutes, and in places far north in summer they follow a juristic rule rather than the sky. For your prayers and your fast, follow your local masjid or religious authority. Hijri dates are calculated and can differ by a day from moon sighting; for the start of Ramadan and the Eids, follow the announcement in your country.'],
    ['No warranty',
      'The site is provided as it is, without any guarantee of accuracy, availability or fitness for a particular purpose. To the extent the law allows, SalaahDaily is not liable for any loss that comes from using the site or relying on its times.'],
    ['Sharing and embedding',
      'You may link to any page and share the times freely with family, friends and your masjid. Mosques and other websites may embed the free prayer times widget, keeping its credit link. You may not copy the site in bulk, scrape it in a way that burdens the service, or present its pages as your own.'],
    ['Links to other websites',
      'Links to other websites are there for your convenience. We are not responsible for their content.'],
    ['Changes',
      'We may update these terms. The new version will be posted on this page with a new date, and using the site after that means you accept it.'],
    ['Questions',
      'For any question about these terms, use {contact}.'],
  ],
};

if (typeof module === 'object' && module.exports) module.exports = { POLICY_DATE: POLICY_DATE, LABELS: LABELS, CONTACT: CONTACT, PRIVACY: PRIVACY, TERMS: TERMS };
