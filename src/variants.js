/*
 * Regional wording for city pages in languages other than English (English has EN_VARIANTS in i18n.js):
 * the phrases people actually search with, from Search Console and keyword research.
 * Each group: countries ('*' = every country), and optionally cityTitle, cityDesc, faq and faqByCountry.
 * FAQ placeholders: {city} {date} {fajr} {sunrise} {dhuhr} {asr} {maghrib} {isha} {sect}
 * and tomorrow's {dateTomorrow} {fajrTomorrow} {sunriseTomorrow}.
 * Only real calculated times go in the answers.
 */
'use strict';

var VARIANTS = {
  ar: {
    all: {
      countries: '*',
      // Arabic searches ask for the adhan ("اذان الفجر" + city) more than for "prayer times".
      cityTitle: 'مواقيت الصلاة في {city} اليوم وأذان الفجر، {country} | SalaahDaily',
      faq: [
        ['متى أذان الفجر في {city} اليوم؟', 'أذان الفجر في {city} اليوم ({date}) الساعة {fajr}، والشروق الساعة {sunrise}.'],
        ['متى أذان المغرب في {city} اليوم؟', 'أذان المغرب في {city} اليوم الساعة {maghrib}، وأذان العشاء الساعة {isha}.'],
        ['متى الشروق غدًا في {city}؟', 'الشروق غدًا ({dateTomorrow}) في {city} الساعة {sunriseTomorrow}، وأذان الفجر الساعة {fajrTomorrow}.'],
      ],
      faqByCountry: {
        // Egyptian wording: "مواعيد الصلاة" and the spoken "الساعة كام".
        egypt: [
          ['ما هي مواعيد الصلاة في {city} اليوم؟', 'مواعيد الصلاة في {city} اليوم ({date}): الفجر {fajr}، الظهر {dhuhr}، العصر {asr}، المغرب {maghrib}، العشاء {isha}.'],
          ['الفجر بيأذن الساعة كام في {city} النهارده؟', 'الفجر بيأذن في {city} النهارده الساعة {fajr}، والشروق الساعة {sunrise}.'],
        ],
      },
    },
  },
  fa: {
    all: {
      countries: '*',
      // Persian searches ask for sunrise, today and tomorrow ("طلوع فردا").
      faq: [
        ['طلوع آفتاب فردا در {city} چه ساعتی است؟', 'طلوع آفتاب فردا ({dateTomorrow}) در {city} ساعت {sunriseTomorrow} است و اذان صبح ساعت {fajrTomorrow}.'],
        ['طلوع آفتاب امروز در {city} چه ساعتی است؟', 'طلوع آفتاب امروز ({date}) در {city} ساعت {sunrise} است.'],
      ],
    },
  },
  id: {
    all: {
      countries: '*',
      // Indonesian searches ask "jam berapa".
      faq: [
        ['Subuh di {city} jam berapa hari ini?', 'Hari ini ({date}) Subuh di {city} pukul {fajr} dan matahari terbit pukul {sunrise}.'],
        ['Magrib di {city} jam berapa hari ini?', 'Hari ini Magrib di {city} pukul {maghrib} dan Isya pukul {isha}.'],
      ],
    },
  },
  ms: {
    all: {
      countries: '*',
      faq: [
        ['Subuh di {city} pukul berapa hari ini?', 'Hari ini ({date}) Subuh di {city} pada pukul {fajr} dan syuruk pada pukul {sunrise}.'],
        ['Maghrib di {city} pukul berapa hari ini?', 'Hari ini Maghrib di {city} pada pukul {maghrib} dan Isyak pada pukul {isha}.'],
      ],
    },
  },
};

if (typeof module === 'object' && module.exports) module.exports = { VARIANTS: VARIANTS };
