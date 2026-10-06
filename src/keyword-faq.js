'use strict';
/*
 * Questions in the words people search with (Search Console and keyword research, October 2026),
 * each answered with the page's own dates and times. {year} and {hijriYear} follow the next date,
 * so the questions stay right after the year turns.
 *
 * EVENTS[lang][event]: asked on the Islamic date pages, answered with that date.
 * RAMADAN[lang]: asked on each city's Ramadan timetable. Placeholders: {city} {year} {date} {sehri} {iftar}
 *   (first day), {lastDate} {lastSehri} {lastIftar} (last day), {date27} {sehri27} {iftar27} (27th), {eidDate}.
 * NAMES / PROPHET[lang]: asked on the 99 Names of Allah and the Names of the Prophet ﷺ pages.
 */
module.exports = {
  EVENTS: {
    en: {
      shabBarat: ['When is Shab e Barat in {year} (Shubh Raat, Sobrat)?', '{year} mein Shab-e-Barat (Shubh Raat) kab hai?'],
      ramadan: ['When does Ramzan {year} start?', 'Ramadan {year} kab hai?', 'When is the first roza of Ramadan {year}?', 'How many days are left until Ramadan {year}?'],
      fitr: ['When is Eid ul Fitr {year}?', 'When is Meethi Eid {year} (Chand Raat)?', 'Eid ul Fitr {year} kab hai?'],
      adha: ['When is Eid ul Adha {year} (Bakrid, Bakra Eid)?', 'When is Qurbani Eid {year}?', 'Bakrid {year} kab hai?'],
      arafah: ['When is the Day of Arafah {year} (the Arafah fast)?'],
      laylatQadr: ['When is Laylat al-Qadr {year} (Shab-e-Qadr)?'],
      newYear: ['When is the Islamic New Year {year} (1 Muharram {hijriYear})?'],
    },
    hi: {
      shabBarat: ['शबे बारात {year} में कब है?', 'शब ए बारात (सबे बारात, सुबरात) {year} की तारीख़ क्या है?'],
      ramadan: ['रमज़ान {year} कब से शुरू है?', 'पहला रोज़ा {year} कब है?'],
      fitr: ['ईद उल फितर {year} कब है?', 'मीठी ईद {year} कब है?'],
      adha: ['ईद उल अजहा {year} कब है?', 'बकरीद {year} कब है?'],
    },
    ur: {
      ramadan: ['رمضان {year} کب شروع ہوگا؟', 'پہلا روزہ {year} کب ہے؟'],
      fitr: ['عید الفطر {year} کب ہے؟', 'میٹھی عید {year} کب ہوگی؟'],
      adha: ['عید الاضحیٰ {year} کب ہے؟', 'بقرعید {year} کب ہے؟'],
      shabBarat: ['شب برات {year} کب ہے؟'],
    },
    bn: {
      shabBarat: ['শবে বরাত {year} কবে?'],
      ramadan: ['রমজান {year} কবে শুরু?', 'প্রথম রোজা {year} কবে?'],
      fitr: ['ঈদুল ফিতর {year} কবে?'],
      adha: ['ঈদুল আজহা {year} কবে?', 'কোরবানির ঈদ {year} কবে?'],
    },
    ar: {
      ramadan: ['متى يبدأ رمضان {year}؟', 'كم باقي على رمضان {year}؟'],
      fitr: ['متى عيد الفطر {year}؟'],
      adha: ['متى عيد الأضحى {year}؟'],
      arafah: ['متى وقفة عرفات {year}؟'],
    },
    fa: {
      adha: ['عید قربان {year} چه روزی است؟'],
      fitr: ['عید فطر {year} چه روزی است؟'],
      ramadan: ['ماه رمضان {year} از چه روزی شروع می‌شود؟'],
      arafah: ['روز عرفه {year} چه روزی است؟'],
    },
    id: {
      newYear: ['Tahun Baru Islam {year} jatuh pada tanggal berapa?', '1 Muharram {hijriYear} H berapa hari lagi?'],
      israMiraj: ['Isra Miraj {year} jatuh pada tanggal berapa?', 'Kapan Isra Miraj {hijriYear} H?', 'Berapa hari lagi Isra Miraj {year}?'],
      ramadan: ['Puasa Ramadan {year} mulai tanggal berapa?', 'Awal puasa {year} kapan?'],
      fitr: ['Idulfitri {year} jatuh pada tanggal berapa?', 'Lebaran {year} tanggal berapa?'],
      adha: ['Idul Adha {year} jatuh pada tanggal berapa?', 'Lebaran Haji {year} kapan?'],
      arafah: ['Hari Arafah {year} jatuh pada tanggal berapa?'],
    },
    ms: {
      shabBarat: ['Bila Nisfu Syaaban {year}?', 'Tarikh malam Nisfu Syaaban {year}?'],
      arafah: ['Bila wukuf di Arafah {year}?'],
      ramadan: ['Bila puasa {year} bermula?'],
      fitr: ['Bila Hari Raya Aidilfitri {year}?'],
      adha: ['Bila Hari Raya Haji (Aidiladha) {year}?'],
    },
    es: {
      adha: ['¿Cuándo es Eid al Adha {year} (3id al adha, Aid al Adha)?', 'Fiesta del Cordero {year}: ¿qué día es?'],
      arafah: ['¿Cuándo es Arafa {year}?'],
      ramadan: ['¿Qué día empieza el Ramadán {year}?'],
      fitr: ['¿Cuándo es Eid al Fitr {year}, el fin del Ramadán?'],
    },
    tr: {
      ramadan: ['Ramazan {year} ne zaman başlıyor?'],
      fitr: ['Ramazan Bayramı {year} ne zaman?'],
      adha: ['Kurban Bayramı {year} ne zaman?'],
    },
    fr: {
      ramadan: ['Quand commence le Ramadan {year} ?'],
      fitr: ['Quand est l’Aïd el-Fitr {year} ?'],
      adha: ['Quand est l’Aïd el-Kebir {year} (Aïd al-Adha) ?'],
    },
    de: {
      ramadan: ['Wann beginnt Ramadan {year}?'],
      fitr: ['Wann ist das Zuckerfest {year}?'],
      adha: ['Wann ist das Opferfest {year}?'],
    },
  },
  RAMADAN: {
    en: [
      ['Ramzan {year} timetable for {city}: what are the sehri and iftar times?', 'On the first day ({date}) sehri ends at {sehri} and iftar is at {iftar}; every day is in the timetable above.'],
      ['When is the first roza of {year} in {city}?', 'The first roza of Ramadan {year} in {city} is expected on {date}: sehri until {sehri}, iftar at {iftar}.'],
      ['What are the last sehri and iftar times of Ramadan {year} in {city}?', 'On the last day ({lastDate}) sehri ends at {lastSehri} and iftar is at {lastIftar}.'],
      ['What are the sehri and iftar times on the 27th of Ramadan in {city}?', 'On the 27th ({date27}) sehri ends at {sehri27} and iftar is at {iftar27}.'],
      ['When is Eid al-Fitr {year} in {city}?', 'Eid al-Fitr is expected on {eidDate}, the day after the last fast. Moon sighting can move it by a day.'],
    ],
    ur: [
      ['{city} میں رمضان {year} کی سحری و افطار کا ٹائم ٹیبل؟', 'پہلے دن ({date}) سحری {sehri} پر ختم اور افطار {iftar} پر ہے؛ ہر دن کے اوقات اوپر جدول میں ہیں۔'],
      ['{city} میں {year} کا پہلا روزہ کب ہے؟', '{city} میں رمضان {year} کا پہلا روزہ {date} کو متوقع ہے: سحری {sehri} تک، افطار {iftar} پر۔'],
      ['{city} میں رمضان {year} کی آخری سحری اور افطار کا وقت؟', 'آخری دن ({lastDate}) سحری {lastSehri} پر ختم اور افطار {lastIftar} پر ہے۔'],
      ['{city} میں 27 رمضان کو سحری و افطار کب ہے؟', '27 رمضان ({date27}) کو سحری {sehri27} پر ختم اور افطار {iftar27} پر ہے۔'],
      ['{city} میں عید الفطر {year} کب ہے؟', 'عید الفطر {eidDate} کو متوقع ہے، آخری روزے کے اگلے دن۔ چاند دیکھنے سے ایک دن آگے پیچھے ہو سکتی ہے۔'],
    ],
    hi: [
      ['{city} में रमज़ान {year} का सहरी और इफ़्तार टाइम टेबल?', 'पहले दिन ({date}) सहरी {sehri} पर ख़त्म और इफ़्तार {iftar} पर है; हर दिन का समय ऊपर तालिका में है।'],
      ['{city} में {year} का पहला रोज़ा कब है?', '{city} में रमज़ान {year} का पहला रोज़ा {date} को अपेक्षित है: सहरी {sehri} तक, इफ़्तार {iftar} पर।'],
      ['{city} में रमज़ान {year} की आख़िरी सहरी और इफ़्तार का समय?', 'आख़िरी दिन ({lastDate}) सहरी {lastSehri} पर ख़त्म और इफ़्तार {lastIftar} पर है।'],
      ['{city} में 27 रमज़ान को सहरी और इफ़्तार कब है?', '27 रमज़ान ({date27}) को सहरी {sehri27} पर ख़त्म और इफ़्तार {iftar27} पर है।'],
      ['{city} में ईद उल फितर {year} कब है?', 'ईद उल फितर {eidDate} को अपेक्षित है, आख़िरी रोज़े के अगले दिन। चाँद दिखने से एक दिन आगे-पीछे हो सकती है।'],
    ],
    bn: [
      ['{city}: রমজান {year} সেহরি ও ইফতারের সময়সূচি?', 'প্রথম দিন ({date}) সেহরি শেষ {sehri}, ইফতার {iftar}; প্রতিদিনের সময় উপরের সারণিতে।'],
      ['{city}: {year} সালের প্রথম রোজা কবে?', '{city}-এ রমজান {year}-এর প্রথম রোজা {date} তারিখে প্রত্যাশিত: সেহরি {sehri} পর্যন্ত, ইফতার {iftar}।'],
      ['{city}: রমজান {year}-এর শেষ সেহরি ও ইফতারের সময়?', 'শেষ দিন ({lastDate}) সেহরি শেষ {lastSehri}, ইফতার {lastIftar}।'],
      ['{city}: ২৭ রমজানে সেহরি ও ইফতার কখন?', '২৭ রমজান ({date27}) সেহরি শেষ {sehri27}, ইফতার {iftar27}।'],
      ['{city}: ঈদুল ফিতর {year} কবে?', 'ঈদুল ফিতর {eidDate} তারিখে প্রত্যাশিত, শেষ রোজার পরের দিন। চাঁদ দেখার ওপর এক দিন এদিক-ওদিক হতে পারে।'],
    ],
    ar: [
      ['إمساكية رمضان {year} في {city}: متى السحور والإفطار؟', 'في اليوم الأول ({date}) ينتهي السحور الساعة {sehri} والإفطار الساعة {iftar}، ومواعيد كل يوم في الجدول أعلاه.'],
      ['متى أول يوم صيام في {city} {year}؟', 'أول أيام رمضان {year} في {city} متوقع يوم {date}: السحور حتى {sehri} والإفطار {iftar}.'],
      ['متى آخر سحور وإفطار في رمضان {year} في {city}؟', 'في اليوم الأخير ({lastDate}) ينتهي السحور الساعة {lastSehri} والإفطار الساعة {lastIftar}.'],
      ['موعد السحور والإفطار ليلة 27 رمضان في {city}؟', 'يوم 27 رمضان ({date27}) ينتهي السحور الساعة {sehri27} والإفطار الساعة {iftar27}.'],
      ['متى عيد الفطر {year} في {city}؟', 'عيد الفطر متوقع يوم {eidDate}، بعد آخر يوم صيام، وقد تغيّره رؤية الهلال يومًا.'],
    ],
    id: [
      ['Jadwal imsakiyah Ramadan {year} {city}: jam berapa sahur dan berbuka?', 'Hari pertama ({date}) sahur berakhir pukul {sehri} dan berbuka pukul {iftar}; setiap hari ada di tabel di atas.'],
      ['Kapan puasa pertama {year} di {city}?', 'Puasa pertama Ramadan {year} di {city} diperkirakan {date}: sahur sampai {sehri}, berbuka {iftar}.'],
      ['Jam berapa sahur dan berbuka terakhir Ramadan {year} di {city}?', 'Hari terakhir ({lastDate}) sahur berakhir pukul {lastSehri} dan berbuka pukul {lastIftar}.'],
      ['Jam berapa sahur dan berbuka tanggal 27 Ramadan di {city}?', 'Tanggal 27 ({date27}) sahur berakhir pukul {sehri27} dan berbuka pukul {iftar27}.'],
      ['Kapan Idulfitri {year} di {city}?', 'Idulfitri diperkirakan {eidDate}, sehari setelah puasa terakhir. Rukyat hilal bisa menggesernya satu hari.'],
    ],
    ms: [
      ['Jadual imsak Ramadan {year} {city}: pukul berapa sahur dan berbuka?', 'Hari pertama ({date}) sahur tamat pukul {sehri} dan berbuka pukul {iftar}; setiap hari ada dalam jadual di atas.'],
      ['Bila puasa pertama {year} di {city}?', 'Puasa pertama Ramadan {year} di {city} dijangka pada {date}: sahur hingga {sehri}, berbuka {iftar}.'],
      ['Pukul berapa sahur dan berbuka terakhir Ramadan {year} di {city}?', 'Hari terakhir ({lastDate}) sahur tamat pukul {lastSehri} dan berbuka pukul {lastIftar}.'],
      ['Pukul berapa sahur dan berbuka 27 Ramadan di {city}?', '27 Ramadan ({date27}) sahur tamat pukul {sehri27} dan berbuka pukul {iftar27}.'],
      ['Bila Hari Raya Aidilfitri {year} di {city}?', 'Aidilfitri dijangka pada {eidDate}, sehari selepas puasa terakhir. Rukyah hilal boleh mengubahnya sehari.'],
    ],
  },
  NAMES: {
    en: [
      ['What are the 99 Names of Allah (Asma ul Husna)?', 'They are the names of Allah in the list of Tirmidhi 3507, given above in Arabic with their meanings, from Ar-Rahman (the Most Gracious) to As-Sabur (the Patient).'],
      ['What are the 99 Names of Allah with meaning in English?', 'Each name above has its English meaning, for example Ar-Rahman, the Most Gracious, and Ar-Rahim, the Most Merciful.'],
      ['Allah ke 99 naam kya hain?', 'Allah ke 99 naam (Asma ul Husna) upar Arabic aur matlab ke saath diye gaye hain.'],
    ],
    ur: [['اللہ کے 99 نام کون سے ہیں؟', 'اللہ کے 99 نام (اسماء الحسنیٰ) ترمذی 3507 کی فہرست کے مطابق اوپر عربی اور اردو معنی کے ساتھ دیے گئے ہیں۔']],
    hi: [['अल्लाह के 99 नाम कौन से हैं?', 'अल्लाह के 99 नाम (अस्मा उल हुस्ना) तिर्मिज़ी 3507 की सूची के अनुसार ऊपर अरबी और हिंदी अर्थ के साथ दिए गए हैं।']],
    bn: [['আল্লাহর ৯৯ নাম কী কী?', 'আল্লাহর ৯৯ নাম (আসমাউল হুসনা) তিরমিজি ৩৫০৭-এর তালিকা অনুযায়ী উপরে আরবি ও বাংলা অর্থসহ দেওয়া হয়েছে।']],
    ar: [['ما هي أسماء الله الحسنى التسعة والتسعون؟', 'هي الأسماء الواردة في رواية الترمذي 3507، مذكورة أعلاه مع معانيها.']],
    id: [['Apa saja 99 Asmaul Husna dan artinya?', 'Asmaul Husna menurut daftar Tirmidzi 3507 ada di atas, dalam bahasa Arab beserta artinya.']],
    ms: [['Apakah 99 Asmaul Husna dan maksudnya?', 'Asmaul Husna mengikut senarai Tirmizi 3507 ada di atas, dalam bahasa Arab bersama maksudnya.']],
    tr: [['Esmaü’l-Hüsna nedir, Allah’ın 99 ismi ve anlamları nelerdir?', 'Tirmizî 3507’deki listeye göre Allah’ın 99 ismi yukarıda Arapçası ve anlamıyla verilmiştir.']],
    fa: [['اسماء الحسنی، ۹۹ نام خدا چیست؟', 'نام‌های خدا طبق فهرست ترمذی ۳۵۰۷ در بالا با معنای فارسی آمده است.']],
    fr: [['Quels sont les 99 noms d’Allah et leur signification ?', 'Les 99 noms d’Allah, selon la liste de Tirmidhi 3507, sont donnés plus haut en arabe avec leur sens.']],
    es: [['¿Cuáles son los 99 nombres de Allah y su significado?', 'Los 99 nombres de Allah, según la lista de Tirmidhi 3507, aparecen arriba en árabe con su significado.']],
  },
  PROPHET: {
    en: [
      ['What are the 99 names of Prophet Muhammad ﷺ with meaning?', 'They are listed above in Arabic, with transliteration and meaning, from ‘Adil (the Just) to Miftah (the Key).'],
      ['What names of the Prophet ﷺ are in the Quran?', 'The Quran calls him Muhammad (48:29) and Ahmad (61:6), and describes him as a witness, a bearer of glad tidings, a warner and a light-giving lamp (33:45-46).'],
      ['Nabi ke 99 naam kya hain?', 'Nabi Muhammad ﷺ ke 99 naam upar Arabic aur matlab ke saath diye gaye hain.'],
    ],
    ur: [['نبی کریم ﷺ کے 99 نام کون سے ہیں؟', 'نبی کریم ﷺ کے 99 نام اوپر عربی اور اردو معنی کے ساتھ دیے گئے ہیں۔']],
    hi: [['नबी ﷺ के 99 नाम कौन से हैं?', 'नबी मुहम्मद ﷺ के 99 नाम ऊपर अरबी और हिंदी अर्थ के साथ दिए गए हैं।']],
    bn: [['নবী ﷺ-এর ৯৯ নাম কী কী?', 'নবী মুহাম্মদ ﷺ-এর ৯৯ নাম উপরে আরবি ও বাংলা অর্থসহ দেওয়া হয়েছে।']],
    ar: [['ما هي أسماء النبي محمد ﷺ؟', 'أسماؤه ﷺ مذكورة أعلاه مع معانيها، ومنها في القرآن محمد (الفتح 29) وأحمد (الصف 6).']],
    id: [['Apa saja nama-nama Nabi Muhammad ﷺ dan artinya?', 'Nama-nama Nabi Muhammad ﷺ ada di atas dalam bahasa Arab beserta artinya.']],
    ms: [['Apakah nama-nama Nabi Muhammad ﷺ dan maksudnya?', 'Nama-nama Nabi Muhammad ﷺ ada di atas dalam bahasa Arab bersama maksudnya.']],
    tr: [['Peygamber Efendimizin ﷺ isimleri nelerdir?', 'Hz. Muhammed’in ﷺ isimleri yukarıda Arapçası ve anlamıyla verilmiştir.']],
    fa: [['نام‌های پیامبر اکرم ﷺ چیست؟', 'نام‌های پیامبر ﷺ در بالا با معنای فارسی آمده است.']],
    fr: [['Quels sont les noms du Prophète Muhammad ﷺ ?', 'Les noms du Prophète ﷺ sont donnés plus haut en arabe avec leur sens.']],
    es: [['¿Cuáles son los nombres del Profeta Muhammad ﷺ?', 'Los nombres del Profeta ﷺ aparecen arriba en árabe con su significado.']],
  },
};
