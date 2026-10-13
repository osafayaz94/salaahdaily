'use strict';
// "Prayer times through the year in {city}": the earliest and latest Fajr, the shortest and longest fast and the length of
// the fast in the next Ramadan, all calculated with the same method as the city's daily times.
// h heading; earliest/latest (Fajr), shortest/longest (fast); fast: row label; ram: Ramadan row label ({year}); first/last: day.
module.exports = {
  en: { h: 'Prayer times through the year in {city}', earliest: 'earliest', latest: 'latest', shortest: 'shortest', longest: 'longest', fast: 'Fast, dawn to sunset', ram: 'Ramadan {year}', first: 'first day', last: 'last day' },
  ur: { h: 'پورے سال {city} میں نماز کے اوقات', earliest: 'سب سے جلد', latest: 'سب سے دیر', shortest: 'سب سے مختصر', longest: 'سب سے طویل', fast: 'روزہ، فجر سے غروب تک', ram: 'رمضان {year}', first: 'پہلا دن', last: 'آخری دن' },
  hi: { h: 'पूरे साल {city} में नमाज़ का समय', earliest: 'सबसे जल्दी', latest: 'सबसे देर', shortest: 'सबसे छोटा', longest: 'सबसे लंबा', fast: 'रोज़ा, सुबह से सूर्यास्त तक', ram: 'रमज़ान {year}', first: 'पहला दिन', last: 'आख़िरी दिन' },
  bn: { h: 'সারা বছর {city}-এ নামাজের সময়', earliest: 'সবচেয়ে আগে', latest: 'সবচেয়ে দেরিতে', shortest: 'সবচেয়ে ছোট', longest: 'সবচেয়ে দীর্ঘ', fast: 'রোজা, ভোর থেকে সূর্যাস্ত', ram: 'রমজান {year}', first: 'প্রথম দিন', last: 'শেষ দিন' },
  id: { h: 'Waktu sholat sepanjang tahun di {city}', earliest: 'paling awal', latest: 'paling akhir', shortest: 'tersingkat', longest: 'terlama', fast: 'Puasa, fajar hingga matahari terbenam', ram: 'Ramadan {year}', first: 'hari pertama', last: 'hari terakhir' },
  ms: { h: 'Waktu solat sepanjang tahun di {city}', earliest: 'paling awal', latest: 'paling lewat', shortest: 'paling singkat', longest: 'paling panjang', fast: 'Puasa, fajar hingga matahari terbenam', ram: 'Ramadan {year}', first: 'hari pertama', last: 'hari terakhir' },
  fa: { h: 'اوقات شرعی در طول سال در {city}', earliest: 'زودترین', latest: 'دیرترین', shortest: 'کوتاه‌ترین', longest: 'طولانی‌ترین', fast: 'روزه، از اذان صبح تا غروب', ram: 'رمضان {year}', first: 'روز اول', last: 'روز آخر' },
  ps: { h: 'په {city} کې د ټول کال د لمانځه وختونه', earliest: 'تر ټولو وختي', latest: 'تر ټولو ناوخته', shortest: 'تر ټولو لنډ', longest: 'تر ټولو اوږد', fast: 'روژه، له سهار تر لمر پرېواته', ram: 'رمضان {year}', first: 'لومړۍ ورځ', last: 'وروستۍ ورځ' },
  es: { h: 'Horarios de oración durante el año en {city}', earliest: 'más temprano', latest: 'más tarde', shortest: 'más corto', longest: 'más largo', fast: 'Ayuno, del alba al ocaso', ram: 'Ramadán {year}', first: 'primer día', last: 'último día' },
  fr: { h: 'Horaires de prière au fil de l’année à {city}', earliest: 'le plus tôt', latest: 'le plus tard', shortest: 'le plus court', longest: 'le plus long', fast: 'Jeûne, de l’aube au coucher du soleil', ram: 'Ramadan {year}', first: 'premier jour', last: 'dernier jour' },
  de: { h: 'Gebetszeiten im Jahresverlauf in {city}', earliest: 'am frühesten', latest: 'am spätesten', shortest: 'am kürzesten', longest: 'am längsten', fast: 'Fasten, Morgendämmerung bis Sonnenuntergang', ram: 'Ramadan {year}', first: 'erster Tag', last: 'letzter Tag' },
  it: { h: 'Orari di preghiera durante l’anno a {city}', earliest: 'più presto', latest: 'più tardi', shortest: 'più breve', longest: 'più lungo', fast: 'Digiuno, dall’alba al tramonto', ram: 'Ramadan {year}', first: 'primo giorno', last: 'ultimo giorno' },
  pt: { h: 'Horários de oração ao longo do ano em {city}', earliest: 'mais cedo', latest: 'mais tarde', shortest: 'mais curto', longest: 'mais longo', fast: 'Jejum, do amanhecer ao pôr do sol', ram: 'Ramadã {year}', first: 'primeiro dia', last: 'último dia' },
  tr: { h: 'Yıl boyunca {city} namaz vakitleri', earliest: 'en erken', latest: 'en geç', shortest: 'en kısa', longest: 'en uzun', fast: 'Oruç, imsaktan akşama', ram: 'Ramazan {year}', first: 'ilk gün', last: 'son gün' },
  ar: { h: 'مواقيت الصلاة على مدار السنة في {city}', earliest: 'أبكر وقت', latest: 'آخر وقت', shortest: 'أقصر مدة', longest: 'أطول مدة', fast: 'الصيام من الفجر إلى الغروب', ram: 'رمضان {year}', first: 'اليوم الأول', last: 'اليوم الأخير' },
  ko: { h: '연중 {city} 예배 시간', earliest: '가장 이른', latest: '가장 늦은', shortest: '가장 짧은', longest: '가장 긴', fast: '금식, 새벽부터 일몰까지', ram: '라마단 {year}', first: '첫째 날', last: '마지막 날' },
  ja: { h: '{city}の年間礼拝時刻', earliest: '最も早い', latest: '最も遅い', shortest: '最も短い', longest: '最も長い', fast: '断食（夜明けから日没）', ram: 'ラマダン{year}', first: '初日', last: '最終日' },
  ha: { h: 'Lokutan sallah a cikin shekara a {city}', earliest: 'mafi wuri', latest: 'mafi jinkiri', shortest: 'mafi gajarta', longest: 'mafi tsawo', fast: 'Azumi, daga asuba zuwa faɗuwar rana', ram: 'Ramadan {year}', first: 'rana ta farko', last: 'rana ta ƙarshe' },
};
