'use strict';
/*
 * Country-wide pages for one prayer: /{lang}/{country}/{prayer}/ (fajr, sunrise, dhuhr, asr, maghrib, isha).
 * They answer searches without a city ("موعد اذان الفجر" from all of Egypt, "وقت الشروق غدًا" from Iraq,
 * "fajr namaz time" from Pakistan): today's and tomorrow's time in every city of the country.
 * Search Console, Oct 2026: such searches showed one city's page at position ~10 and were hardly ever clicked.
 * Placeholders: {name} the prayer phrase below, {country}, {date}/{date2} today and tomorrow, {list}/{list2} the first
 * three cities with their times today and tomorrow, {c1} {t1} {tm1} the first city, {n} the number of cities,
 * {early} {te} {late} {tl} {mins} the earliest and latest city today (only for countries on one clock), {method}.
 */
var AR = {
  names: { fajr: 'أذان الفجر', sunrise: 'الشروق', dhuhr: 'أذان الظهر', asr: 'أذان العصر', maghrib: 'أذان المغرب', isha: 'أذان العشاء' },
  h1: 'موعد {name} اليوم في {country}',
  title: {
    fajr: 'موعد أذان الفجر اليوم في {country} وكل المدن', sunrise: 'وقت الشروق اليوم وغدًا في {country}: كل المدن',
    dhuhr: 'موعد أذان الظهر اليوم في {country} وكل المدن', asr: 'موعد أذان العصر اليوم في {country} وكل المدن',
    maghrib: 'موعد أذان المغرب اليوم في {country} وكل المدن', isha: 'موعد أذان العشاء اليوم في {country} وكل المدن',
  },
  lead: 'موعد {name} اليوم ({date}): {list}. وغدًا في {c1} الساعة {tm1}. يختلف الموعد من مدينة لأخرى، وتجد كل مدن {country} في الجدول.',
  listItem: '{city} الساعة {time}', listSep: '، ',
  desc: 'موعد {name} اليوم وغدًا في {n} مدينة في {country}: {list}. جدول كل المدن ومواقيت الصلاة كاملة.',
  tableH: 'موعد {name} في مدن {country}', colCity: 'المدينة', colToday: 'اليوم', colTomorrow: 'غدًا',
  faqH: 'أسئلة عن موعد {name} في {country}',
  qToday: 'متى موعد {name} اليوم في {c1}؟', aToday: 'موعد {name} اليوم ({date}) في {c1} الساعة {t1}.',
  qTomorrow: 'متى موعد {name} غدًا في {country}؟', aTomorrow: 'غدًا ({date2}): {list2}.',
  qSame: 'هل موعد {name} واحد في كل مدن {country}؟',
  aSame: 'لا، يختلف بحسب موقع المدينة. اليوم أبكر موعد في {early} الساعة {te}، وآخر موعد في {late} الساعة {tl}، بفارق {mins} دقيقة.',
  method: 'المواقيت محسوبة بطريقة {method} لكل مدينة من إحداثياتها، وقد تختلف دقيقة أو دقيقتين عن مسجدك.',
  otherH: 'مواقيت أخرى في {country}', countryLink: 'مواقيت الصلاة اليوم في {country}', chipsH: 'موعد كل صلاة في كل مدن {country}',
  inCountry: 'موعد {name} في كل مدن {country}',
};
// Egypt: the wording people search with ("الفجر بيأذن الساعة كام", "النهارده", "بكرة", "المحافظات").
var EG = Object.assign({}, AR, {
  title: {
    fajr: 'موعد أذان الفجر النهارده في مصر والمحافظات', sunrise: 'الشروق النهارده وبكرة في مصر والمحافظات',
    dhuhr: 'موعد أذان الظهر النهارده في مصر والمحافظات', asr: 'موعد أذان العصر النهارده في مصر والمحافظات',
    maghrib: 'موعد أذان المغرب النهارده في مصر والمحافظات', isha: 'موعد أذان العشاء النهارده في مصر والمحافظات',
  },
  lead: 'موعد {name} النهارده ({date}): {list}. وبكرة في {c1} الساعة {tm1}. الموعد بيختلف من محافظة للتانية، وكل مدن مصر في الجدول.',
  qToday: '{name} الساعة كام النهارده في {c1}؟', aToday: '{name} في {c1} النهارده ({date}) الساعة {t1}.',
  qTomorrow: '{name} بكرة الساعة كام في مصر؟', aTomorrow: 'بكرة ({date2}): {list2}.',
  qSame: 'هل {name} في نفس الوقت في كل المحافظات؟',
  aSame: 'لا، بيختلف حسب مكان المدينة. النهارده أبكر موعد في {early} الساعة {te}، وآخر موعد في {late} الساعة {tl}، بفرق {mins} دقيقة.',
  colToday: 'النهارده', colTomorrow: 'بكرة',
});
var FA = {
  names: { fajr: 'اذان صبح', sunrise: 'طلوع آفتاب', dhuhr: 'اذان ظهر', asr: 'اذان عصر', maghrib: 'اذان مغرب', isha: 'اذان عشا' },
  h1: '{name} امروز در شهرهای {country}',
  title: {
    fajr: 'اذان صبح امروز در {country}: ساعت اذان همه شهرها', sunrise: 'طلوع آفتاب امروز و فردا در {country}: همه شهرها',
    dhuhr: 'اذان ظهر امروز در {country}: ساعت اذان همه شهرها', asr: 'اذان عصر امروز در {country}: ساعت اذان همه شهرها',
    maghrib: 'اذان مغرب امروز در {country}: ساعت اذان همه شهرها', isha: 'اذان عشا امروز در {country}: ساعت اذان همه شهرها',
  },
  lead: '{name} امروز ({date}): {list}. فردا در {c1} ساعت {tm1}. ساعت هر شهر با شهر دیگر فرق دارد و همه شهرهای {country} در جدول آمده‌اند.',
  listItem: '{city} ساعت {time}', listSep: '، ',
  desc: '{name} امروز و فردا در {n} شهر {country}: {list}. جدول همه شهرها و اوقات شرعی کامل.',
  tableH: '{name} در شهرهای {country}', colCity: 'شهر', colToday: 'امروز', colTomorrow: 'فردا',
  faqH: 'پرسش‌ها درباره {name} در {country}',
  qToday: '{name} امروز در {c1} ساعت چند است؟', aToday: '{name} امروز ({date}) به افق {c1} ساعت {t1} است.',
  qTomorrow: '{name} فردا در {country} ساعت چند است؟', aTomorrow: 'فردا ({date2}): {list2}.',
  qSame: 'آیا ساعت {name} در همه شهرهای {country} یکی است؟',
  aSame: 'نه، به موقعیت شهر بستگی دارد. امروز زودترین زمان در {early} ساعت {te} و دیرترین در {late} ساعت {tl} است، با {mins} دقیقه فاصله.',
  method: 'اوقات به روش {method} و از مختصات هر شهر محاسبه شده و ممکن است یکی دو دقیقه با مسجد شما فرق داشته باشد.',
  otherH: 'اوقات دیگر در {country}', countryLink: 'اوقات شرعی امروز {country}', chipsH: 'ساعت اذان هر نماز در همه شهرهای {country}',
  inCountry: '{name} در همه شهرهای {country}',
};
var EN = {
  // "in the UK", not "in UK".
  theName: { uk: 'the UK', usa: 'the USA', uae: 'the UAE' },
  names: { fajr: 'Fajr', sunrise: 'Sunrise', dhuhr: 'Zuhr', asr: 'Asr', maghrib: 'Maghrib', isha: 'Isha' },
  h1: '{name} Time Today in {country}',
  title: {
    fajr: 'Fajr Time Today in {country}: All Cities', sunrise: 'Sunrise Time Today and Tomorrow in {country}',
    dhuhr: 'Zuhr Time Today in {country}: All Cities', asr: 'Asr Time Today in {country}: All Cities',
    maghrib: 'Maghrib Time Today in {country}: All Cities', isha: 'Isha Time Today in {country}: All Cities',
  },
  // South Asia searches say "namaz time".
  titleByCountry: Object.fromEntries(['pakistan', 'india', 'bangladesh'].map((c) => [c, {
    fajr: 'Fajr Namaz Time Today in {country}: All Cities', sunrise: 'Sunrise Time Today and Tomorrow in {country}',
    dhuhr: 'Zuhr Namaz Time Today in {country}: All Cities', asr: 'Asr Namaz Time Today in {country}: All Cities',
    maghrib: 'Maghrib Namaz Time Today in {country}: All Cities', isha: 'Isha Namaz Time Today in {country}: All Cities',
  }])),
  lead: '{name} today ({date}): {list}. Tomorrow in {c1}: {tm1}. The time changes from city to city, and every city in {country} is in the table below.',
  listItem: '{city} {time}', listSep: ', ',
  desc: '{name} time today and tomorrow in {n} cities in {country}: {list}. A table for every city, with the full prayer timetable.',
  tableH: '{name} time in every city of {country}', colCity: 'City', colToday: 'Today', colTomorrow: 'Tomorrow',
  faqH: 'Questions about {name} time in {country}',
  qToday: 'What time is {name} today in {c1}?', aToday: '{name} in {c1} today ({date}) is at {t1}.',
  qTomorrow: 'What time is {name} tomorrow in {country}?', aTomorrow: 'Tomorrow ({date2}): {list2}.',
  qSame: 'Is {name} at the same time all over {country}?',
  aSame: 'No, it depends on where the city is. Today the earliest is {early} at {te} and the latest is {late} at {tl}, {mins} minutes apart.',
  method: 'Each city’s time is calculated from its coordinates with the {method} method, and can differ by a minute or two from your mosque.',
  otherH: 'Other times in {country}', countryLink: 'Prayer times today in {country}', chipsH: 'Each prayer in every city of {country}',
  inCountry: '{name} time in every city of {country}',
};

module.exports = { ar: AR, eg: EG, fa: FA, en: EN };
