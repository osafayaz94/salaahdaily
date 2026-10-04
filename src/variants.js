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
      // The Maghreb searches "أوقات الصلاة" rather than "مواقيت الصلاة".
      // Egypt searches "موعد اذان الفجر" and "موعد اذان المغرب" most.
      cityTitleByCountry: Object.assign(Object.fromEntries(["morocco","algeria","tunisia","libya","mauritania"].map((c) => [c, 'أوقات الصلاة في {city} اليوم وأذان الفجر، {country} | SalaahDaily'])),
        { egypt: 'مواقيت الصلاة في {city} اليوم وموعد أذان الفجر والمغرب | SalaahDaily' }),
      faqByCountry: Object.assign(Object.fromEntries(["morocco","algeria","tunisia","libya","mauritania"].map((c) => [c, [
        ['ما هي أوقات الصلاة في {city} اليوم؟', 'أوقات الصلاة في {city} اليوم ({date}): الفجر {fajr}، الشروق {sunrise}، الظهر {dhuhr}، العصر {asr}، المغرب {maghrib}، العشاء {isha}.'],
      ]])), {
        // Egyptian wording: "مواعيد الصلاة" and the spoken "الساعة كام".
        egypt: [
          ['ما هي مواعيد الصلاة في {city} اليوم؟', 'مواعيد الصلاة في {city} اليوم ({date}): الفجر {fajr}، الظهر {dhuhr}، العصر {asr}، المغرب {maghrib}، العشاء {isha}.'],
          ['الفجر بيأذن الساعة كام في {city} النهارده؟', 'الفجر بيأذن في {city} النهارده الساعة {fajr}، والشروق الساعة {sunrise}.'],
          ['المغرب والعشاء بيأذنوا الساعة كام في {city} النهارده؟', 'المغرب بيأذن في {city} النهارده الساعة {maghrib}، والعشاء الساعة {isha}.'],
          ['الظهر والعصر بيأذنوا الساعة كام في {city} النهارده؟', 'الظهر بيأذن في {city} النهارده الساعة {dhuhr}، والعصر الساعة {asr}.'],
          ['الشروق الساعة كام في {city} بكرة؟', 'الشروق في {city} بكرة ({dateTomorrow}) الساعة {sunriseTomorrow}، والفجر بيأذن الساعة {fajrTomorrow}.'],
        ],
      }),
    },
  },
  fa: {
    all: {
      countries: '*',
      // Persian searches ask for sunrise, today and tomorrow ("طلوع فردا"); Afghanistan says "اوقات نماز".
      cityTitleByCountry: { afghanistan: 'اوقات نماز {city} امروز، {country} | SalaahDaily' },
      faq: [
        ['طلوع آفتاب فردا در {city} چه ساعتی است؟', 'طلوع آفتاب فردا ({dateTomorrow}) در {city} ساعت {sunriseTomorrow} است و اذان صبح ساعت {fajrTomorrow}.'],
        ['طلوع آفتاب امروز در {city} چه ساعتی است؟', 'طلوع آفتاب امروز ({date}) در {city} ساعت {sunrise} است.'],
      ],
    },
  },
  tr: {
    all: {
      countries: '*',
      // Turkish searches pair "namaz vakitleri" with "ezan vakti".
      cityTitle: '{city} Namaz Vakitleri ve Ezan Vakti Bugün, {country} | SalaahDaily',
      faq: [
        ['{city} için bugün ezan saat kaçta okunuyor?', '{city} için bugün ezan vakitleri: imsak {fajr}, güneş {sunrise}, öğle {dhuhr}, ikindi {asr}, akşam {maghrib}, yatsı {isha}.'],
      ],
    },
  },
  fr: {
    africa: {
      // North and West Africa search "heure de prière"; France keeps "horaires de prière".
      countries: ["morocco","algeria","tunisia","libya","mauritania","senegal","mali","niger","burkina-faso","guinea","cote-d-ivoire","chad","cameroon","djibouti","comoros","benin","togo","gabon"],
      cityTitle: 'Heure de prière {city} aujourd’hui, {country} | SalaahDaily',
      faq: [
        ['Quelle est l’heure de prière à {city} aujourd’hui ?', 'Heure de prière à {city} aujourd’hui : Fajr {fajr}, lever du soleil {sunrise}, Dhuhr {dhuhr}, Asr {asr}, Maghrib {maghrib}, Isha {isha}.'],
      ],
    },
  },
};

/*
 * English pages of countries whose language the site does not have: the local search term and one
 * question answered in the local language with the local prayer names. Keyed by country slug, or by
 * "country/Region" for a region only. term: shown in the English title when latin is true.
 * Placeholders as above; no date in the answer (it would be in English).
 */
function L(term, latin, q, a) { return { term: term, latin: latin, q: q, a: a }; }
var BS = L('Vaktija', true, 'Vaktija {city}: koja su namaska vremena danas?', 'Vaktija {city}, danas: zora {fajr}, izlazak sunca {sunrise}, podne {dhuhr}, ikindija {asr}, akšam {maghrib}, jacija {isha}.');
var SQ = L('Kohët e namazit', true, 'Cilat janë kohët e namazit në {city} sot?', 'Kohët e namazit në {city} sot: sabahu {fajr}, lindja e diellit {sunrise}, dreka {dhuhr}, ikindia {asr}, akshami {maghrib}, jacia {isha}.');
var RU = L('Время намаза', false, 'Какое время намаза на сегодня ({city})?', 'Время намаза на сегодня ({city}): фаджр {fajr}, восход {sunrise}, зухр {dhuhr}, аср {asr}, магриб {maghrib}, иша {isha}.');
var SW = L('Nyakati za sala', true, 'Nyakati za sala {city} leo ni saa ngapi?', 'Nyakati za sala {city} leo: alfajiri {fajr}, macheo {sunrise}, adhuhuri {dhuhr}, alasiri {asr}, magharibi {maghrib}, isha {isha}.');
var SO = L('Waqtiga salaadda', true, 'Waqtiga salaadda {city} maanta waa imisa?', 'Waqtiga salaadda {city} maanta: subax {fajr}, qorrax ka soo bax {sunrise}, duhur {dhuhr}, casar {asr}, maqrib {maghrib}, cishe {isha}.');
var TA = L('தொழுகை நேரம்', false, 'இன்று {city} தொழுகை நேரம் என்ன?', 'இன்று {city} தொழுகை நேரம்: ஃபஜ்ர் {fajr}, சூரிய உதயம் {sunrise}, ளுஹர் {dhuhr}, அஸர் {asr}, மஃரிப் {maghrib}, இஷா {isha}.');
var LOCAL = {
  'bosnia-and-herzegovina': BS, montenegro: BS, serbia: BS, croatia: BS, slovenia: BS,
  albania: SQ, kosovo: SQ, 'north-macedonia': SQ,
  azerbaijan: L('Namaz vaxtları', true, '{city} üçün bu gün namaz vaxtları nədir?', 'Bu gün {city} üçün namaz vaxtları: sübh {fajr}, günəş {sunrise}, zöhr {dhuhr}, əsr {asr}, məğrib {maghrib}, işa {isha}.'),
  russia: RU, belarus: RU,
  kazakhstan: L('Намаз уақыты', false, 'Бүгінгі намаз уақыты қандай ({city})?', 'Бүгінгі намаз уақыты ({city}): таң {fajr}, күн шығуы {sunrise}, бесін {dhuhr}, екінті {asr}, ақшам {maghrib}, құптан {isha}.'),
  kyrgyzstan: L('Намаз убактысы', false, 'Бүгүнкү намаз убактысы кандай ({city})?', 'Бүгүнкү намаз убактысы ({city}): багымдат {fajr}, күн чыгышы {sunrise}, бешим {dhuhr}, аср {asr}, шам {maghrib}, куптан {isha}.'),
  uzbekistan: L('Namoz vaqtlari', true, 'Bugun {city} uchun namoz vaqtlari qanday?', 'Bugun {city} uchun namoz vaqtlari: bomdod {fajr}, quyosh {sunrise}, peshin {dhuhr}, asr {asr}, shom {maghrib}, xufton {isha}.'),
  tajikistan: L('Вақти намоз', false, 'Вақти намоз имрӯз чанд аст ({city})?', 'Вақти намоз имрӯз ({city}): бомдод {fajr}, тулӯи офтоб {sunrise}, пешин {dhuhr}, аср {asr}, шом {maghrib}, хуфтан {isha}.'),
  turkmenistan: L('Namaz wagtlary', true, 'Şu gün {city} üçin namaz wagtlary näçede?', 'Şu gün {city} üçin namaz wagtlary: ertir {fajr}, gün dogýar {sunrise}, öýle {dhuhr}, ikindi {asr}, agşam {maghrib}, ýassy {isha}.'),
  ukraine: L('Час намазу', false, 'Який час намазу сьогодні ({city})?', 'Час намазу на сьогодні ({city}): фаджр {fajr}, схід сонця {sunrise}, зухр {dhuhr}, аср {asr}, магриб {maghrib}, іша {isha}.'),
  bulgaria: L('Време за намаз', false, 'Кога е времето за намаз днес ({city})?', 'Време за намаз днес ({city}): сабах {fajr}, изгрев {sunrise}, йойле {dhuhr}, икиндия {asr}, акшам {maghrib}, ятсъ {isha}.'),
  poland: L('Czasy modlitw', true, 'Czasy modlitw {city}: o której są dziś modlitwy?', 'Czasy modlitw {city} na dziś: fadżr {fajr}, wschód słońca {sunrise}, zuhr {dhuhr}, asr {asr}, maghrib {maghrib}, isza {isha}.'),
  netherlands: L('Gebedstijden', true, 'Wat zijn de gebedstijden in {city} vandaag?', 'Gebedstijden in {city} vandaag: fajr {fajr}, zonsopgang {sunrise}, dhuhr {dhuhr}, asr {asr}, maghrib {maghrib}, isha {isha}.'),
  belgium: L('Gebedstijden', true, 'Wat zijn de gebedstijden in {city} vandaag?', 'Gebedstijden in {city} vandaag: fajr {fajr}, zonsopgang {sunrise}, dhuhr {dhuhr}, asr {asr}, maghrib {maghrib}, isha {isha}.'),
  sweden: L('Bönetider', true, 'Vilka är bönetiderna i {city} idag?', 'Bönetider i {city} idag: fajr {fajr}, soluppgång {sunrise}, dhuhr {dhuhr}, asr {asr}, maghrib {maghrib}, isha {isha}.'),
  norway: L('Bønnetider', true, 'Hva er bønnetidene i {city} i dag?', 'Bønnetider i {city} i dag: fajr {fajr}, soloppgang {sunrise}, dhuhr {dhuhr}, asr {asr}, maghrib {maghrib}, isha {isha}.'),
  denmark: L('Bedetider', true, 'Hvad er bedetiderne i {city} i dag?', 'Bedetider i {city} i dag: fajr {fajr}, solopgang {sunrise}, dhuhr {dhuhr}, asr {asr}, maghrib {maghrib}, isha {isha}.'),
  finland: L('Rukousajat', true, 'Mitkä ovat rukousajat tänään ({city})?', 'Rukousajat tänään ({city}): fajr {fajr}, auringonnousu {sunrise}, dhuhr {dhuhr}, asr {asr}, maghrib {maghrib}, isha {isha}.'),
  kenya: SW, tanzania: SW,
  somalia: SO, djibouti: SO,
  'sri-lanka': TA, 'india/Tamil Nadu': TA,
  'india/Kerala': L('നിസ്കാര സമയം', false, 'ഇന്നത്തെ നിസ്കാര സമയം എപ്പോഴാണ് ({city})?', 'ഇന്നത്തെ നിസ്കാര സമയം ({city}): സുബ്ഹ് {fajr}, സൂര്യോദയം {sunrise}, ളുഹ്ർ {dhuhr}, അസ്ർ {asr}, മഗ്‌രിബ് {maghrib}, ഇശാ {isha}.'),
  'iraq/Kurdistan Region': L('کاتەکانی بانگ', false, 'کاتەکانی بانگ ئەمڕۆ لە {city} چەندە؟', 'کاتەکانی بانگ ئەمڕۆ لە {city}: بەیانی {fajr}، خۆرهەڵاتن {sunrise}، نیوەڕۆ {dhuhr}، عەسر {asr}، ئێوارە {maghrib}، خەوتنان {isha}.'),
  china: L('礼拜时间', false, '今天{city}的礼拜时间是几点？', '今天{city}的礼拜时间：晨礼 {fajr}，日出 {sunrise}，晌礼 {dhuhr}，晡礼 {asr}，昏礼 {maghrib}，宵礼 {isha}。'),
  thailand: L('เวลาละหมาด', false, 'เวลาละหมาดวันนี้ที่ {city} คือกี่โมง', 'เวลาละหมาดวันนี้ที่ {city}: ซุบฮิ {fajr} ดวงอาทิตย์ขึ้น {sunrise} ซุฮริ {dhuhr} อัศริ {asr} มัฆริบ {maghrib} อิชาอ์ {isha}'),
};

if (typeof module === 'object' && module.exports) module.exports = { VARIANTS: VARIANTS, LOCAL: LOCAL };
