/*
 * Who decides the Islamic calendar in each country, and how. Shown on country pages, city pages,
 * the Hijri calendar and the Islamic date pages. Types:
 *   uq: follows the Umm al-Qura calendar (Saudi Arabia); sight: months begin when {authority} announces
 *   the moon sighting; mixed: calculation plus an official sighting session; calc: a calendar published in
 *   advance that the site follows (Turkey, src/hijri-diyanet.js); varies: communities follow different
 *   announcements; anything not listed uses the generic line.
 * Authority names: English, plus the country's own language where given.
 */
'use strict';

var VARIES = ['uk', 'usa', 'canada', 'australia', 'new-zealand', 'ireland', 'germany', 'france', 'netherlands', 'belgium', 'luxembourg',
  'switzerland', 'austria', 'italy', 'spain', 'portugal', 'sweden', 'norway', 'denmark', 'finland', 'iceland', 'south-africa', 'brazil',
  'argentina', 'mexico', 'japan', 'south-korea', 'china'];

var AUTH = {
  'saudi-arabia': { type: 'uq' },
  pakistan: { type: 'sight', name: { en: 'the Central Ruet-e-Hilal Committee', ur: 'مرکزی رویت ہلال کمیٹی', hi: 'केंद्रीय रुअत-ए-हिलाल कमेटी' } },
  india: { type: 'sight', name: { en: 'local Ruet-e-Hilal committees', hi: 'स्थानीय रुअत-ए-हिलाल कमेटियाँ', ur: 'مقامی رویت ہلال کمیٹیاں' } },
  bangladesh: { type: 'sight', name: { en: 'the National Moon Sighting Committee', bn: 'জাতীয় চাঁদ দেখা কমিটি' } },
  morocco: { type: 'sight', name: { en: 'the Ministry of Habous and Islamic Affairs', ar: 'وزارة الأوقاف والشؤون الإسلامية', fr: 'le ministère des Habous et des Affaires islamiques' } },
  egypt: { type: 'sight', name: { en: 'Dar al-Ifta', ar: 'دار الإفتاء المصرية' } },
  iran: { type: 'sight', name: { en: 'the Office of the Supreme Leader', fa: 'دفتر رهبری' } },
  nigeria: { type: 'sight', name: { en: 'the Sultan of Sokoto', ha: 'Sarkin Musulmi (Sultan na Sokoto)' } },
  turkey: { type: 'calc', name: { en: 'the Presidency of Religious Affairs (Diyanet)', tr: 'Diyanet İşleri Başkanlığı', de: 'das Präsidium für Religionsangelegenheiten (Diyanet)', fr: 'la Présidence des affaires religieuses (Diyanet)', ar: 'رئاسة الشؤون الدينية التركية (ديانت)' } },
  indonesia: { type: 'mixed', name: { en: 'the Ministry of Religious Affairs', id: 'Kementerian Agama' } },
  malaysia: { type: 'mixed', name: { en: 'the Keeper of the Rulers’ Seal', ms: 'Penyimpan Mohor Besar Raja-Raja' } },
};
VARIES.forEach(function (c) { AUTH[c] = { type: 'varies' }; });

// Lines per language ({country}, {authority}), and the controls on the Hijri calendar page.
var AT = {
  en: { uq: "{country}: Islamic dates follow the Umm al-Qura calendar used here, and the start of Ramadan and the Eids is confirmed by moon sighting.",
    sight: "{country}: Islamic months begin when {authority} announces the moon sighting. Dates here follow the Umm al-Qura calendar and may differ by a day.",
    mixed: "{country}: {authority} sets the start of Islamic months by calculation and an official sighting session. Dates here follow the Umm al-Qura calendar and may differ by a day.",
    calc: "{country}: {authority} publishes the Islamic calendar in advance, and the dates here follow it.",
    varies: "{country}: mosques and communities follow different announcements, some following Saudi Arabia and others local moon sighting. Dates here follow the Umm al-Qura calendar, so check with your mosque.",
    generic: "{country}: the start of each Islamic month is announced by the religious authorities, usually after moon sighting. Dates here follow the Umm al-Qura calendar and may differ by a day.",
    adj: 'Hijri dates are shifted by {n} in your Settings.', countryL: 'Your country', later: 'Our month began a day later', same: 'Same as Umm al-Qura', earlier: 'Our month began a day earlier', evAdj: 'With your Settings: {date}.' },
  ur: { uq: '{country} میں اسلامی تاریخیں یہاں استعمال ہونے والے ام القریٰ کیلنڈر کے مطابق ہیں، اور رمضان اور عیدوں کا آغاز رویتِ ہلال سے طے ہوتا ہے۔',
    sight: '{country} میں اسلامی مہینے اس وقت شروع ہوتے ہیں جب {authority} چاند نظر آنے کا اعلان کرتی ہے۔ یہاں تاریخیں ام القریٰ کیلنڈر کے مطابق ہیں اور ایک دن مختلف ہو سکتی ہیں۔',
    mixed: '{country} میں {authority} اسلامی مہینوں کا آغاز حساب اور سرکاری رویت کے اجلاس سے طے کرتی ہے۔ یہاں تاریخیں ام القریٰ کیلنڈر کے مطابق ہیں اور ایک دن مختلف ہو سکتی ہیں۔',
    calc: '{country} میں {authority} اسلامی کیلنڈر پہلے سے شائع کرتی ہے، اور یہاں کی تاریخیں اسی کے مطابق ہیں۔',
    varies: '{country} میں مساجد اور برادریاں مختلف اعلانات پر چلتی ہیں: کچھ سعودی عرب کے ساتھ، کچھ مقامی رویت کے ساتھ۔ یہاں تاریخیں ام القریٰ کیلنڈر کے مطابق ہیں، اس لیے اپنی مسجد سے تصدیق کریں۔',
    generic: '{country} میں ہر اسلامی مہینے کا آغاز دینی ادارے عموماً رویتِ ہلال کے بعد اعلان کرتے ہیں۔ یہاں تاریخیں ام القریٰ کیلنڈر کے مطابق ہیں اور ایک دن مختلف ہو سکتی ہیں۔',
    adj: 'آپ کی سیٹنگز میں ہجری تاریخیں {n} دن آگے پیچھے کی گئی ہیں۔', countryL: 'آپ کا ملک', later: 'ہمارا مہینہ ایک دن بعد شروع ہوا', same: 'ام القریٰ کے مطابق', earlier: 'ہمارا مہینہ ایک دن پہلے شروع ہوا', evAdj: 'آپ کی سیٹنگز کے مطابق: {date}۔' },
  hi: { uq: '{country} में इस्लामी तारीख़ें यहाँ इस्तेमाल होने वाले उम्म अल-क़ुरा कैलेंडर के अनुसार हैं, और रमज़ान और ईदों की शुरुआत चाँद देखकर तय होती है।',
    sight: '{country} में इस्लामी महीने तब शुरू होते हैं जब {authority} चाँद दिखने का ऐलान करती है। यहाँ तारीख़ें उम्म अल-क़ुरा कैलेंडर के अनुसार हैं और एक दिन अलग हो सकती हैं।',
    mixed: '{country} में {authority} इस्लामी महीनों की शुरुआत गणना और आधिकारिक चाँद-दर्शन बैठक से तय करती है। यहाँ तारीख़ें उम्म अल-क़ुरा कैलेंडर के अनुसार हैं और एक दिन अलग हो सकती हैं।',
    calc: '{country} में {authority} इस्लामी कैलेंडर पहले से प्रकाशित करती है, और यहाँ की तारीख़ें उसी के अनुसार हैं।',
    varies: '{country} में मस्जिदें और समुदाय अलग-अलग ऐलान मानते हैं: कुछ सऊदी अरब के साथ, कुछ स्थानीय चाँद देखकर। यहाँ तारीख़ें उम्म अल-क़ुरा कैलेंडर के अनुसार हैं, इसलिए अपनी मस्जिद से पुष्टि करें।',
    generic: '{country} में हर इस्लामी महीने की शुरुआत धार्मिक संस्थाएँ आम तौर पर चाँद देखने के बाद घोषित करती हैं। यहाँ तारीख़ें उम्म अल-क़ुरा कैलेंडर के अनुसार हैं और एक दिन अलग हो सकती हैं।',
    adj: 'आपकी सेटिंग्स में हिजरी तारीख़ें {n} दिन खिसकाई गई हैं।', countryL: 'आपका देश', later: 'हमारा महीना एक दिन बाद शुरू हुआ', same: 'उम्म अल-क़ुरा के अनुसार', earlier: 'हमारा महीना एक दिन पहले शुरू हुआ', evAdj: 'आपकी सेटिंग्स के अनुसार: {date}।' },
  bn: { uq: '{country}-এ ইসলামি তারিখ এখানে ব্যবহৃত উম্মুল কুরা ক্যালেন্ডার অনুযায়ী, আর রমজান ও ঈদের শুরু চাঁদ দেখে নিশ্চিত করা হয়।',
    sight: '{country}-এ ইসলামি মাস শুরু হয় যখন {authority} চাঁদ দেখার ঘোষণা দেয়। এখানের তারিখ উম্মুল কুরা ক্যালেন্ডার অনুযায়ী এবং এক দিন আলাদা হতে পারে।',
    mixed: '{country}-এ {authority} হিসাব ও সরকারি চাঁদ দেখা বৈঠকের মাধ্যমে ইসলামি মাসের শুরু ঠিক করে। এখানের তারিখ উম্মুল কুরা ক্যালেন্ডার অনুযায়ী এবং এক দিন আলাদা হতে পারে।',
    calc: '{country}-এ {authority} আগেই ইসলামি ক্যালেন্ডার প্রকাশ করে, আর এখানের তারিখ সেটিই অনুসরণ করে।',
    varies: '{country}-এ মসজিদ ও সম্প্রদায় ভিন্ন ভিন্ন ঘোষণা মানে: কেউ সৌদি আরব, কেউ স্থানীয় চাঁদ দেখা। এখানের তারিখ উম্মুল কুরা ক্যালেন্ডার অনুযায়ী, তাই আপনার মসজিদে জেনে নিন।',
    generic: '{country}-এ প্রতিটি ইসলামি মাসের শুরু ধর্মীয় কর্তৃপক্ষ সাধারণত চাঁদ দেখার পর ঘোষণা করে। এখানের তারিখ উম্মুল কুরা ক্যালেন্ডার অনুযায়ী এবং এক দিন আলাদা হতে পারে।',
    adj: 'আপনার সেটিংসে হিজরি তারিখ {n} দিন সরানো আছে।', countryL: 'আপনার দেশ', later: 'আমাদের মাস এক দিন পরে শুরু হয়েছে', same: 'উম্মুল কুরা অনুযায়ী', earlier: 'আমাদের মাস এক দিন আগে শুরু হয়েছে', evAdj: 'আপনার সেটিংস অনুযায়ী: {date}।' },
  id: { uq: 'Di {country}, tanggal Islam mengikuti kalender Umm al-Qura yang dipakai di sini, dan awal Ramadan serta hari raya dipastikan dengan rukyat.',
    sight: 'Di {country}, bulan Islam dimulai saat {authority} mengumumkan terlihatnya hilal. Tanggal di sini mengikuti kalender Umm al-Qura dan bisa berbeda satu hari.',
    mixed: 'Di {country}, {authority} menetapkan awal bulan Islam dengan hisab dan sidang isbat. Tanggal di sini mengikuti kalender Umm al-Qura dan bisa berbeda satu hari.',
    calc: 'Di {country}, {authority} menerbitkan kalender Islam lebih dulu, dan tanggal di sini mengikutinya.',
    varies: 'Di {country}, masjid dan komunitas mengikuti pengumuman yang berbeda: sebagian mengikuti Arab Saudi, sebagian rukyat setempat. Tanggal di sini mengikuti kalender Umm al-Qura, jadi tanyakan ke masjid Anda.',
    generic: 'Di {country}, awal setiap bulan Islam diumumkan oleh otoritas keagamaan, biasanya setelah rukyat. Tanggal di sini mengikuti kalender Umm al-Qura dan bisa berbeda satu hari.',
    adj: 'Tanggal Hijriah digeser {n} hari di Pengaturan Anda.', countryL: 'Negara Anda', later: 'Bulan kami mulai sehari lebih lambat', same: 'Sama dengan Umm al-Qura', earlier: 'Bulan kami mulai sehari lebih awal', evAdj: 'Dengan Pengaturan Anda: {date}.' },
  ms: { uq: 'Di {country}, tarikh Islam mengikut kalendar Umm al-Qura yang digunakan di sini, dan awal Ramadan serta hari raya disahkan dengan rukyah.',
    sight: 'Di {country}, bulan Islam bermula apabila {authority} mengumumkan anak bulan kelihatan. Tarikh di sini mengikut kalendar Umm al-Qura dan mungkin berbeza satu hari.',
    mixed: 'Di {country}, {authority} menetapkan awal bulan Islam melalui hisab dan rukyah rasmi. Tarikh di sini mengikut kalendar Umm al-Qura dan mungkin berbeza satu hari.',
    calc: 'Di {country}, {authority} menerbitkan kalendar Islam lebih awal, dan tarikh di sini mengikutinya.',
    varies: 'Di {country}, masjid dan komuniti mengikut pengumuman yang berbeza: sebahagian mengikut Arab Saudi, sebahagian rukyah tempatan. Tarikh di sini mengikut kalendar Umm al-Qura, jadi semak dengan masjid anda.',
    generic: 'Di {country}, awal setiap bulan Islam diumumkan oleh pihak berkuasa agama, biasanya selepas rukyah. Tarikh di sini mengikut kalendar Umm al-Qura dan mungkin berbeza satu hari.',
    adj: 'Tarikh Hijrah dianjakkan {n} hari dalam Tetapan anda.', countryL: 'Negara anda', later: 'Bulan kami bermula sehari kemudian', same: 'Sama dengan Umm al-Qura', earlier: 'Bulan kami bermula sehari lebih awal', evAdj: 'Mengikut Tetapan anda: {date}.' },
  fa: { uq: 'در {country} تاریخ‌های قمری بر پایهٔ تقویم ام‌القری است که اینجا به کار رفته، و آغاز رمضان و عیدها با رؤیت هلال تأیید می‌شود.',
    sight: 'در {country} ماه‌های قمری وقتی آغاز می‌شوند که {authority} رؤیت هلال را اعلام کند. تاریخ‌های اینجا بر پایهٔ تقویم ام‌القری است و ممکن است یک روز تفاوت داشته باشد.',
    mixed: 'در {country} {authority} آغاز ماه‌های قمری را با محاسبه و جلسهٔ رسمی رؤیت تعیین می‌کند. تاریخ‌های اینجا بر پایهٔ تقویم ام‌القری است و ممکن است یک روز تفاوت داشته باشد.',
    calc: 'در {country} {authority} تقویم قمری را از پیش منتشر می‌کند و تاریخ‌های اینجا از آن پیروی می‌کند.',
    varies: 'در {country} مساجد و جوامع از اعلام‌های گوناگون پیروی می‌کنند: برخی از عربستان، برخی از رؤیت محلی. تاریخ‌های اینجا بر پایهٔ تقویم ام‌القری است، پس از مسجد خود بپرسید.',
    generic: 'در {country} آغاز هر ماه قمری را مراجع دینی معمولاً پس از رؤیت هلال اعلام می‌کنند. تاریخ‌های اینجا بر پایهٔ تقویم ام‌القری است و ممکن است یک روز تفاوت داشته باشد.',
    adj: 'تاریخ‌های قمری در تنظیمات شما {n} روز جابه‌جا شده است.', countryL: 'کشور شما', later: 'ماه ما یک روز دیرتر آغاز شد', same: 'مطابق ام‌القری', earlier: 'ماه ما یک روز زودتر آغاز شد', evAdj: 'با تنظیمات شما: {date}.' },
  ps: { uq: 'په {country} کې اسلامي نېټې د ام القری له کلیز سره سمې دي چې دلته کارول کېږي، او د روژې او اخترونو پیل د میاشتې په لیدو تاییدېږي.',
    sight: 'په {country} کې اسلامي میاشتې هغه وخت پیلېږي چې {authority} د میاشتې د لیدو اعلان وکړي. دلته نېټې د ام القری له کلیز سره سمې دي او یوه ورځ توپیر کېدای شي.',
    mixed: 'په {country} کې {authority} د اسلامي میاشتو پیل په حساب او رسمي رؤیت ټاکي. دلته نېټې د ام القری له کلیز سره سمې دي او یوه ورځ توپیر کېدای شي.',
    calc: 'په {country} کې {authority} اسلامي کلیز مخکې خپروي، او دلته نېټې له هغه سره سمې دي.',
    varies: 'په {country} کې جوماتونه او ټولنې بېلابېل اعلانونه مني: ځینې سعودي عربستان، ځینې سیمه‌ییز رؤیت. دلته نېټې د ام القری له کلیز سره سمې دي، نو له خپل جومات وپوښتئ.',
    generic: 'په {country} کې د هرې اسلامي میاشتې پیل دیني ادارې معمولاً د میاشتې له لیدو وروسته اعلانوي. دلته نېټې د ام القری له کلیز سره سمې دي او یوه ورځ توپیر کېدای شي.',
    adj: 'ستاسو په تنظیماتو کې هجري نېټې {n} ورځې بدلې شوې دي.', countryL: 'ستاسو هېواد', later: 'زموږ میاشت یوه ورځ وروسته پیل شوه', same: 'د ام القری سره سم', earlier: 'زموږ میاشت یوه ورځ مخکې پیل شوه', evAdj: 'ستاسو د تنظیماتو له مخې: {date}.' },
  es: { uq: "{country}: las fechas islámicas siguen el calendario Umm al-Qura que se usa aquí, y el inicio del Ramadán y de los Eid se confirma por avistamiento de la luna.",
    sight: "{country}: los meses islámicos empiezan cuando {authority} anuncia el avistamiento de la luna. Las fechas de aquí siguen el calendario Umm al-Qura y pueden diferir en un día.",
    mixed: "{country}: {authority} fija el inicio de los meses islámicos por cálculo y una sesión oficial de avistamiento. Las fechas de aquí siguen el calendario Umm al-Qura y pueden diferir en un día.",
    calc: "{country}: {authority} publica el calendario islámico con antelación, y las fechas de aquí lo siguen.",
    varies: "{country}: mezquitas y comunidades siguen anuncios distintos; unas siguen a Arabia Saudí y otras el avistamiento local. Las fechas de aquí siguen el calendario Umm al-Qura, así que consulta con tu mezquita.",
    generic: "{country}: el inicio de cada mes islámico lo anuncian las autoridades religiosas, normalmente tras el avistamiento de la luna. Las fechas de aquí siguen el calendario Umm al-Qura y pueden diferir en un día.",
    adj: 'Las fechas de la Hégira están desplazadas {n} en tus Ajustes.', countryL: 'Tu país', later: 'Nuestro mes empezó un día después', same: 'Igual que Umm al-Qura', earlier: 'Nuestro mes empezó un día antes', evAdj: 'Con tus Ajustes: {date}.' },
  fr: { uq: "{country} : les dates islamiques suivent le calendrier Umm al-Qura utilisé ici, et le début du Ramadan et des Aïds est confirmé par l’observation du croissant.",
    sight: "{country} : les mois islamiques commencent quand {authority} annonce l’observation du croissant. Les dates ici suivent le calendrier Umm al-Qura et peuvent différer d’un jour.",
    mixed: "{country} : {authority} fixe le début des mois islamiques par le calcul et une séance officielle d’observation. Les dates ici suivent le calendrier Umm al-Qura et peuvent différer d’un jour.",
    calc: "{country} : {authority} publie le calendrier islamique à l’avance, et les dates ici le suivent.",
    varies: "{country} : mosquées et communautés suivent des annonces différentes, certaines l’Arabie saoudite, d’autres l’observation locale. Les dates ici suivent le calendrier Umm al-Qura, renseignez-vous auprès de votre mosquée.",
    generic: "{country} : le début de chaque mois islamique est annoncé par les autorités religieuses, en général après l’observation du croissant. Les dates ici suivent le calendrier Umm al-Qura et peuvent différer d’un jour.",
    adj: 'Les dates de l’Hégire sont décalées de {n} dans vos Réglages.', countryL: 'Votre pays', later: 'Notre mois a commencé un jour plus tard', same: 'Comme Umm al-Qura', earlier: 'Notre mois a commencé un jour plus tôt', evAdj: 'Avec vos Réglages : {date}.' },
  ar: { uq: 'في {country} تتبع التواريخ الهجرية تقويم أم القرى المستخدم هنا، ويُثبت دخول رمضان والعيدين بالرؤية.',
    sight: 'في {country} تبدأ الأشهر الهجرية عندما تعلن {authority} ثبوت رؤية الهلال. التواريخ هنا بحسب تقويم أم القرى وقد تختلف بيوم.',
    mixed: 'في {country} تحدد {authority} بداية الأشهر الهجرية بالحساب وجلسة رسمية للرؤية. التواريخ هنا بحسب تقويم أم القرى وقد تختلف بيوم.',
    calc: 'في {country} تنشر {authority} التقويم الهجري مسبقًا، والتواريخ هنا تتبعه.',
    varies: 'في {country} تتبع المساجد والجاليات إعلانات مختلفة: بعضها يتبع السعودية وبعضها الرؤية المحلية. التواريخ هنا بحسب تقويم أم القرى، فتأكد من مسجدك.',
    generic: 'في {country} تعلن الجهات الدينية بداية كل شهر هجري، غالبًا بعد رؤية الهلال. التواريخ هنا بحسب تقويم أم القرى وقد تختلف بيوم.',
    adj: 'التواريخ الهجرية مزاحة بمقدار {n} في إعداداتك.', countryL: 'بلدك', later: 'بدأ الشهر عندنا بعد يوم', same: 'مطابق لأم القرى', earlier: 'بدأ الشهر عندنا قبل يوم', evAdj: 'بحسب إعداداتك: {date}.' },
  tr: { uq: '{country} için Hicri tarihler burada kullanılan Ümmü’l-Kurâ takvimine göredir; Ramazan ve bayramların başlangıcı hilal gözlemiyle kesinleşir.',
    sight: '{country} için Hicri aylar, {authority} hilalin görüldüğünü duyurduğunda başlar. Buradaki tarihler Ümmü’l-Kurâ takvimine göredir ve bir gün farklı olabilir.',
    mixed: '{country} için {authority}, Hicri ayların başlangıcını hesap ve resmî rüyet toplantısıyla belirler. Buradaki tarihler Ümmü’l-Kurâ takvimine göredir ve bir gün farklı olabilir.',
    calc: '{country} için {authority} Hicri takvimi önceden yayımlar; buradaki tarihler bu takvime göredir.',
    varies: '{country} için camiler ve topluluklar farklı duyuruları izler: bazıları Suudi Arabistan’ı, bazıları yerel rüyeti. Buradaki tarihler Ümmü’l-Kurâ takvimine göredir; camiinize danışın.',
    generic: '{country} için her Hicri ayın başlangıcını dinî kurumlar, genellikle hilal gözleminden sonra duyurur. Buradaki tarihler Ümmü’l-Kurâ takvimine göredir ve bir gün farklı olabilir.',
    adj: 'Hicri tarihler Ayarlar’ınızda {n} gün kaydırılmış.', countryL: 'Ülkeniz', later: 'Ayımız bir gün sonra başladı', same: 'Ümmü’l-Kurâ ile aynı', earlier: 'Ayımız bir gün önce başladı', evAdj: 'Ayarlarınıza göre: {date}.' },
  ha: { uq: 'A {country}, kwanakin Musulunci suna bin kalandar Umm al-Qura da ake amfani da ita a nan, kuma ana tabbatar da farkon Ramadan da Sallah da ganin wata.',
    sight: 'A {country}, watannin Musulunci suna farawa idan {authority} ya sanar da ganin wata. Kwanakin nan suna bin kalandar Umm al-Qura kuma suna iya bambanta da kwana ɗaya.',
    mixed: 'A {country}, {authority} na tsara farkon watannin Musulunci ta lissafi da zaman ganin wata na hukuma. Kwanakin nan suna bin kalandar Umm al-Qura kuma suna iya bambanta da kwana ɗaya.',
    calc: 'A {country}, {authority} na wallafa kalandar Musulunci tun da wuri, kuma kwanakin nan suna bin ta.',
    varies: 'A {country}, masallatai da al’ummomi suna bin sanarwa daban-daban: wasu suna bin Saudiyya, wasu ganin wata na gida. Kwanakin nan suna bin kalandar Umm al-Qura, don haka ku tambayi masallacinku.',
    generic: 'A {country}, hukumomin addini ne ke sanar da farkon kowane watan Musulunci, yawanci bayan ganin wata. Kwanakin nan suna bin kalandar Umm al-Qura kuma suna iya bambanta da kwana ɗaya.',
    adj: 'An matsar da kwanakin Hijira da {n} a Saitunanku.', countryL: 'Ƙasarku', later: 'Watanmu ya fara bayan kwana ɗaya', same: 'Kamar Umm al-Qura', earlier: 'Watanmu ya fara kafin kwana ɗaya', evAdj: 'Bisa Saitunanku: {date}.' },
  de: { uq: "{country}: Die islamischen Daten folgen dem hier verwendeten Umm-al-Qura-Kalender; der Beginn des Ramadan und der Feste wird durch Mondsichtung bestätigt.",
    sight: "{country}: Die islamischen Monate beginnen, wenn {authority} die Mondsichtung verkündet. Die Daten hier folgen dem Umm-al-Qura-Kalender und können um einen Tag abweichen.",
    mixed: "{country}: {authority} legt den Beginn der islamischen Monate durch Berechnung und eine offizielle Sichtungssitzung fest. Die Daten hier folgen dem Umm-al-Qura-Kalender und können um einen Tag abweichen.",
    calc: "{country}: {authority} veröffentlicht den islamischen Kalender im Voraus, und die Daten hier folgen ihm.",
    varies: "{country}: Moscheen und Gemeinden folgen unterschiedlichen Ankündigungen, manche Saudi-Arabien, andere der örtlichen Mondsichtung. Die Daten hier folgen dem Umm-al-Qura-Kalender, fragen Sie daher in Ihrer Moschee nach.",
    generic: "{country}: Den Beginn jedes islamischen Monats verkünden die religiösen Stellen, meist nach der Mondsichtung. Die Daten hier folgen dem Umm-al-Qura-Kalender und können um einen Tag abweichen.",
    adj: 'Hidschri-Daten sind in Ihren Einstellungen um {n} verschoben.', countryL: 'Ihr Land', later: 'Unser Monat begann einen Tag später', same: 'Wie Umm al-Qura', earlier: 'Unser Monat begann einen Tag früher', evAdj: 'Mit Ihren Einstellungen: {date}.' },
  pt: { uq: "{country}: as datas islâmicas seguem o calendário Umm al-Qura usado aqui, e o início do Ramadã e dos Eids é confirmado pelo avistamento da lua.",
    sight: "{country}: os meses islâmicos começam quando {authority} anuncia o avistamento da lua. As datas aqui seguem o calendário Umm al-Qura e podem diferir em um dia.",
    mixed: "{country}: {authority} define o início dos meses islâmicos por cálculo e uma sessão oficial de avistamento. As datas aqui seguem o calendário Umm al-Qura e podem diferir em um dia.",
    calc: "{country}: {authority} publica o calendário islâmico com antecedência, e as datas aqui o seguem.",
    varies: "{country}: mesquitas e comunidades seguem anúncios diferentes, umas a Arábia Saudita e outras o avistamento local. As datas aqui seguem o calendário Umm al-Qura, então confirme com a sua mesquita.",
    generic: "{country}: o início de cada mês islâmico é anunciado pelas autoridades religiosas, em geral após o avistamento da lua. As datas aqui seguem o calendário Umm al-Qura e podem diferir em um dia.",
    adj: 'As datas da Hégira estão deslocadas {n} nas suas Configurações.', countryL: 'Seu país', later: 'Nosso mês começou um dia depois', same: 'Igual ao Umm al-Qura', earlier: 'Nosso mês começou um dia antes', evAdj: 'Com as suas Configurações: {date}.' },
  it: { uq: "{country}: le date islamiche seguono il calendario Umm al-Qura usato qui, e l’inizio del Ramadan e degli Eid è confermato dall’avvistamento della luna.",
    sight: "{country}: i mesi islamici iniziano quando {authority} annuncia l’avvistamento della luna. Le date qui seguono il calendario Umm al-Qura e possono differire di un giorno.",
    mixed: "{country}: {authority} stabilisce l’inizio dei mesi islamici con il calcolo e una seduta ufficiale di avvistamento. Le date qui seguono il calendario Umm al-Qura e possono differire di un giorno.",
    calc: "{country}: {authority} pubblica il calendario islamico in anticipo, e le date qui lo seguono.",
    varies: "{country}: moschee e comunità seguono annunci diversi, alcune l’Arabia Saudita, altre l’avvistamento locale. Le date qui seguono il calendario Umm al-Qura, quindi chiedi alla tua moschea.",
    generic: "{country}: l’inizio di ogni mese islamico è annunciato dalle autorità religiose, di solito dopo l’avvistamento della luna. Le date qui seguono il calendario Umm al-Qura e possono differire di un giorno.",
    adj: 'Le date dell’Egira sono spostate di {n} nelle tue Impostazioni.', countryL: 'Il tuo paese', later: 'Il nostro mese è iniziato un giorno dopo', same: 'Come Umm al-Qura', earlier: 'Il nostro mese è iniziato un giorno prima', evAdj: 'Con le tue Impostazioni: {date}.' },
  ja: { uq: '{country}では、イスラム暦の日付はここで使っているウンム・アル＝クラー暦に従い、ラマダンとイードの開始は新月の目視で確定します。',
    sight: '{country}では、{authority}が新月の目視を発表したときにイスラム暦の月が始まります。ここの日付はウンム・アル＝クラー暦に基づくため、1日異なることがあります。',
    mixed: '{country}では、{authority}が計算と公式の目視会議によってイスラム暦の月の始まりを決めます。ここの日付はウンム・アル＝クラー暦に基づくため、1日異なることがあります。',
    calc: '{country}では、{authority}がイスラム暦を事前に公表しており、ここの日付はそれに従っています。',
    varies: '{country}では、モスクや地域によって従う発表が異なります。サウジアラビアに従うところも、地元の目視に従うところもあります。ここの日付はウンム・アル＝クラー暦に基づくため、通っているモスクに確認してください。',
    generic: '{country}では、各イスラム暦の月の始まりは宗教当局が、通常は新月の目視の後に発表します。ここの日付はウンム・アル＝クラー暦に基づくため、1日異なることがあります。',
    adj: '設定でヒジュラ暦の日付を{n}日ずらしています。', countryL: 'あなたの国', later: 'こちらでは月の始まりが1日遅かった', same: 'ウンム・アル＝クラー暦と同じ', earlier: 'こちらでは月の始まりが1日早かった', evAdj: '設定に合わせると：{date}' },
  ko: { uq: '{country}에서는 이슬람력 날짜가 여기서 쓰는 움 알쿠라 달력을 따르며, 라마단과 명절의 시작은 초승달 관측으로 확정합니다.',
    sight: '{country}에서는 {authority}이 초승달 관측을 발표하면 이슬람력의 달이 시작됩니다. 여기 날짜는 움 알쿠라 달력을 따르므로 하루 다를 수 있습니다.',
    mixed: '{country}에서는 {authority}이 계산과 공식 관측 회의로 이슬람력 달의 시작을 정합니다. 여기 날짜는 움 알쿠라 달력을 따르므로 하루 다를 수 있습니다.',
    calc: '{country}에서는 {authority}이 이슬람력을 미리 발표하며, 여기 날짜는 그것을 따릅니다.',
    varies: '{country}에서는 모스크와 공동체마다 따르는 발표가 다릅니다. 사우디아라비아를 따르는 곳도, 현지 관측을 따르는 곳도 있습니다. 여기 날짜는 움 알쿠라 달력을 따르므로 다니는 모스크에 확인하세요.',
    generic: '{country}에서는 각 이슬람력 달의 시작을 종교 당국이 보통 초승달 관측 뒤에 발표합니다. 여기 날짜는 움 알쿠라 달력을 따르므로 하루 다를 수 있습니다.',
    adj: '설정에서 히즈라력 날짜를 {n}일 옮겼습니다.', countryL: '나의 국가', later: '우리 달은 하루 늦게 시작됨', same: '움 알쿠라와 같음', earlier: '우리 달은 하루 일찍 시작됨', evAdj: '설정 기준: {date}' },
};

// The line for one country in one language ({country} is the country's name in that language).
function authLine(slug, countryName, lang) {
  var a = AUTH[slug] || { type: 'generic' }, t = AT[lang] || AT.en;
  var name = a.name ? (a.name[lang] || a.name.en) : '';
  return t[a.type].replace('{country}', countryName).replace('{authority}', name);
}


// Countries whose announced month starts are recorded (src/hijri-national.js): the "follows Umm al-Qura"
// sentence becomes "follows those announcements, later months estimated".
var UQ_NOTE = {
  en: 'Dates here follow the Umm al-Qura calendar and may differ by a day.',
  ur: 'یہاں تاریخیں ام القریٰ کیلنڈر کے مطابق ہیں اور ایک دن مختلف ہو سکتی ہیں۔',
  hi: 'यहाँ तारीख़ें उम्म अल-क़ुरा कैलेंडर के अनुसार हैं और एक दिन अलग हो सकती हैं।',
  bn: 'এখানের তারিখ উম্মুল কুরা ক্যালেন্ডার অনুযায়ী এবং এক দিন আলাদা হতে পারে।',
  id: 'Tanggal di sini mengikuti kalender Umm al-Qura dan bisa berbeda satu hari.',
  ms: 'Tarikh di sini mengikut kalendar Umm al-Qura dan mungkin berbeza satu hari.',
  fa: 'تاریخ‌های اینجا بر پایهٔ تقویم ام‌القری است و ممکن است یک روز تفاوت داشته باشد.',
  ps: 'دلته نېټې د ام القری له کلیز سره سمې دي او یوه ورځ توپیر کېدای شي.',
  es: 'Las fechas de aquí siguen el calendario Umm al-Qura y pueden diferir en un día.',
  fr: 'Les dates ici suivent le calendrier Umm al-Qura et peuvent différer d’un jour.',
  ar: 'التواريخ هنا بحسب تقويم أم القرى وقد تختلف بيوم.',
  tr: 'Buradaki tarihler Ümmü’l-Kurâ takvimine göredir ve bir gün farklı olabilir.',
  ha: 'Kwanakin nan suna bin kalandar Umm al-Qura kuma suna iya bambanta da kwana ɗaya.',
  de: 'Die Daten hier folgen dem Umm-al-Qura-Kalender und können um einen Tag abweichen.',
  pt: 'As datas aqui seguem o calendário Umm al-Qura e podem diferir em um dia.',
  it: 'Le date qui seguono il calendario Umm al-Qura e possono differire di un giorno.',
  ja: 'ここの日付はウンム・アル＝クラー暦に基づくため、1日異なることがあります。',
  ko: '여기 날짜는 움 알쿠라 달력을 따르므로 하루 다를 수 있습니다.',
};
var REC_NOTE = {
  en: 'Dates here follow its announcements, and months not announced yet are estimated and may differ by a day.',
  ur: 'یہاں تاریخیں انہی اعلانات کے مطابق ہیں، اور جن مہینوں کا اعلان ابھی نہیں ہوا ان کی تاریخیں اندازہ ہیں جو ایک دن مختلف ہو سکتی ہیں۔',
  hi: 'यहाँ तारीख़ें उन्हीं ऐलानों के अनुसार हैं, और जिन महीनों का ऐलान अभी नहीं हुआ उनकी तारीख़ें अनुमान हैं जो एक दिन अलग हो सकती हैं।',
  bn: 'এখানের তারিখ সেই ঘোষণা অনুযায়ী, আর যে মাসগুলোর ঘোষণা এখনো হয়নি সেগুলোর তারিখ আনুমানিক এবং এক দিন আলাদা হতে পারে।',
  id: 'Tanggal di sini mengikuti pengumuman tersebut, dan bulan yang belum diumumkan adalah perkiraan yang bisa berbeda satu hari.',
  ms: 'Tarikh di sini mengikut pengumuman tersebut, dan bulan yang belum diumumkan ialah anggaran yang mungkin berbeza satu hari.',
  fa: 'تاریخ‌های اینجا بر پایهٔ همین اعلام‌هاست و ماه‌هایی که هنوز اعلام نشده‌اند تخمینی‌اند و ممکن است یک روز تفاوت داشته باشند.',
  ps: 'دلته نېټې د همدې اعلانونو سره سمې دي، او هغه میاشتې چې لا نه دي اعلان شوې اټکلي دي او یوه ورځ توپیر کېدای شي.',
  es: 'Las fechas de aquí siguen esos anuncios, y los meses aún no anunciados son estimaciones que pueden diferir en un día.',
  fr: 'Les dates ici suivent ces annonces, et les mois pas encore annoncés sont des estimations qui peuvent différer d’un jour.',
  ar: 'التواريخ هنا بحسب هذه الإعلانات، والأشهر التي لم يُعلن عنها بعد تقديرية وقد تختلف بيوم.',
  tr: 'Buradaki tarihler bu duyurulara göredir; henüz duyurulmamış aylar tahminidir ve bir gün farklı olabilir.',
  ha: 'Kwanakin nan suna bin waɗannan sanarwoyi, kuma watannin da ba a sanar ba tukuna kiyasi ne da zai iya bambanta da kwana ɗaya.',
  de: 'Die Daten hier folgen diesen Bekanntgaben; noch nicht bekanntgegebene Monate sind geschätzt und können um einen Tag abweichen.',
  pt: 'As datas aqui seguem esses anúncios, e os meses ainda não anunciados são estimativas que podem diferir em um dia.',
  it: 'Le date qui seguono questi annunci, e i mesi non ancora annunciati sono stime che possono differire di un giorno.',
  ja: 'ここの日付はその発表に基づき、まだ発表されていない月は推定のため、1日異なることがあります。',
  ko: '여기 날짜는 그 발표를 따르며, 아직 발표되지 않은 달은 추정이므로 하루 다를 수 있습니다.',
};
Object.keys(AT).forEach(function (l) {
  ['sight', 'mixed'].forEach(function (k) {
    if (AT[l][k].slice(-UQ_NOTE[l].length) !== UQ_NOTE[l]) throw new Error('hijri-authority: ' + l + '.' + k + ' does not end with the Umm al-Qura note');
    AT[l][k + 'Rec'] = AT[l][k].slice(0, -UQ_NOTE[l].length) + REC_NOTE[l];
  });
});
var NATIONAL = require('./hijri-national').NATIONAL;
Object.keys(NATIONAL).forEach(function (c) {
  if (AUTH[c] && (AUTH[c].type === 'sight' || AUTH[c].type === 'mixed')) AUTH[c].type += 'Rec';
});

if (typeof module === 'object' && module.exports) module.exports = { AUTH: AUTH, AT: AT, authLine: authLine };
