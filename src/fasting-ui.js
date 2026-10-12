'use strict';
// "Sehri and iftar today" on every city page: heading, the answer sentence (redrawn in the browser with the
// visitor's school) and the link to the fasting guide. Searches: "sehri time today {city}", "iftar time {city}",
// "موعد السحور والإفطار", "ساعت سحری و افطار", "waktu sahur dan berbuka", "sahur ve iftar vakti".
module.exports = {
  en: { h: 'Sehri and iftar time today in {city}', answer: 'Today in {city}, sehri ends at {sehri} and iftar is at {iftar}.', fastLink: 'Sunnah fasting days: Monday and Thursday, the White Days and more' },
  ur: { h: '{city} میں آج سحری اور افطاری کا وقت', answer: 'آج {city} میں سحری کا وقت {sehri} پر ختم ہوتا ہے اور افطاری {iftar} پر ہے۔', fastLink: 'نفلی روزوں کے دن: پیر اور جمعرات، ایامِ بیض اور مزید' },
  hi: { h: '{city} में आज सहरी और इफ़्तार का समय', answer: 'आज {city} में सहरी {sehri} पर ख़त्म होती है और इफ़्तार {iftar} पर है।', fastLink: 'सुन्नत रोज़ों के दिन: सोमवार और गुरुवार, अय्याम-ए-बीज़ और बहुत कुछ' },
  bn: { h: '{city}-এ আজ সেহরি ও ইফতারের সময়', answer: 'আজ {city}-এ সেহরির শেষ সময় {sehri} এবং ইফতার {iftar}।', fastLink: 'সুন্নত রোজার দিন: সোমবার ও বৃহস্পতিবার, আইয়ামে বিজ ও আরও' },
  id: { h: 'Waktu sahur dan berbuka hari ini di {city}', answer: 'Hari ini di {city}, sahur berakhir pukul {sehri} dan berbuka pukul {iftar}.', fastLink: 'Hari-hari puasa sunah: Senin dan Kamis, Ayyamul Bidh, dan lainnya' },
  ms: { h: 'Waktu sahur dan berbuka hari ini di {city}', answer: 'Hari ini di {city}, sahur berakhir pada {sehri} dan berbuka pada {iftar}.', fastLink: 'Hari-hari puasa sunat: Isnin dan Khamis, Hari Putih dan lain-lain' },
  fa: { h: 'ساعت سحری و افطار امروز در {city}', answer: 'امروز در {city} سحری تا ساعت {sehri} است و افطار ساعت {iftar}.', fastLink: 'روزه‌های مستحب: دوشنبه و پنجشنبه، ایام البیض و بیشتر' },
  ps: { h: 'نن په {city} کې د پېشمني او روژه ماتي وخت', answer: 'نن په {city} کې پېشمنی تر {sehri} پورې دی او روژه ماتی په {iftar} کې.', fastLink: 'د سنتو روژو ورځې: دوشنبه او پنجشنبه، سپینې ورځې او نور' },
  es: { h: 'Hora del suhur y del iftar hoy en {city}', answer: 'Hoy en {city}, el suhur termina a las {sehri} y el iftar es a las {iftar}.', fastLink: 'Días de ayuno sunna: lunes y jueves, los Días Blancos y más' },
  fr: { h: 'Heure du sahur et de l’iftar aujourd’hui à {city}', answer: 'Aujourd’hui à {city}, le sahur se termine à {sehri} et l’iftar est à {iftar}.', fastLink: 'Jours de jeûne sunna : lundi et jeudi, les Jours blancs et plus' },
  de: { h: 'Sahur- und Iftar-Zeit heute in {city}', answer: 'Heute in {city} endet das Sahur um {sehri}, und das Iftar ist um {iftar}.', fastLink: 'Sunna-Fastentage: Montag und Donnerstag, die Weißen Tage und mehr' },
  pt: { h: 'Hora do suhur e do iftar hoje em {city}', answer: 'Hoje em {city}, o suhur termina às {sehri} e o iftar é às {iftar}.', fastLink: 'Dias de jejum sunnah: segunda e quinta, os Dias Brancos e mais' },
  it: { h: 'Orari di suhur e iftar oggi a {city}', answer: 'Oggi a {city} il suhur termina alle {sehri} e l’iftar è alle {iftar}.', fastLink: 'Giorni di digiuno sunna: lunedì e giovedì, i Giorni Bianchi e altro' },
  ja: { h: '今日の{city}のスフールとイフタールの時刻', answer: '今日の{city}では、スフールは{sehri}まで、イフタールは{iftar}です。', fastLink: 'スンナの断食日：月曜と木曜、白い日々など' },
  ko: { h: '오늘 {city}의 사후르와 이프타르 시간', answer: '오늘 {city}에서 사후르는 {sehri}에 끝나고 이프타르는 {iftar}입니다.', fastLink: '순나 단식일: 월요일과 목요일, 흰 날들 등' },
  ar: { h: 'موعد السحور والإفطار اليوم في {city}', answer: 'اليوم في {city} ينتهي السحور الساعة {sehri}، والإفطار الساعة {iftar}.', fastLink: 'أيام صيام التطوع: الاثنين والخميس والأيام البيض وغيرها' },
  tr: { h: 'Bugün {city} sahur ve iftar vakti', answer: 'Bugün {city} için sahur (imsak) {sehri}, iftar {iftar}.', fastLink: 'Sünnet oruç günleri: pazartesi ve perşembe, eyyam-ı bîz ve daha fazlası' },
  ha: { h: 'Lokacin sahur da buɗa baki yau a {city}', answer: 'Yau a {city}, sahur yana ƙarewa da {sehri}, kuma buɗa baki da {iftar}.', fastLink: 'Ranakun azumin sunna: Litinin da Alhamis, Ranakun Fari da sauransu' },
};
