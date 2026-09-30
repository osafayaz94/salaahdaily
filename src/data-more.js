/*
 * South America and Oceania (2026-10-01). Same row helpers as data-europe.js.
 * No official timetable data found. South America follows the rest of the Americas on the site (ISNA, Hanafi);
 * Oceania follows Australia (MWL, Hanafi: Indo-Fijian and South Asian communities are the largest).
 */
'use strict';

function split(s) { const [ur, hi, bn, fa] = s.split('|'); return { ur, hi, bn, fa }; }
function T(en, lat, lng, names, extra, tz) { return [en, lat, lng, Object.assign(split(names), extra || {}), tz]; }
function R(en, names, extra, cities) { return { name: Object.assign({ en: en }, split(names), extra || {}), cities: cities }; }

module.exports = [
  {
    slug: 'brazil', cc: 'BR', continent: 'southAmerica', name: { en: 'Brazil' }, langs: ['pt'],
    tz: 'America/Sao_Paulo', method: 'NorthAmerica', defaultSect: 'hanafi',
    regions: [
      R('Southeast', 'جنوب مشرقی برازیل|दक्षिण-पूर्व ब्राज़ील|দক্ষিণ-পূর্ব ব্রাজিল|جنوب شرقی برزیل', { ar: 'الجنوب الشرقي', tr: 'Güneydoğu', es: 'Sudeste', fr: 'Sud-Est' }, [
        T('São Paulo', -23.5505, -46.6333, 'ساؤ پاؤلو|साओ पाउलो|সাও পাওলো|سائوپائولو', { ar: 'ساو باولو', tr: 'São Paulo', es: 'São Paulo', fr: 'São Paulo' }),
        T('Rio de Janeiro', -22.9068, -43.1729, 'ریو ڈی جنیرو|रियो डी जनेरियो|রিও ডি জেনেইরো|ریودوژانیرو', { ar: 'ريو دي جانيرو', tr: 'Rio de Janeiro', es: 'Río de Janeiro', fr: 'Rio de Janeiro' }),
      ]),
      R('South', 'جنوبی برازیل|दक्षिणी ब्राज़ील|দক্ষিণ ব্রাজিল|جنوب برزیل', { ar: 'الجنوب', tr: 'Güney', es: 'Sur', fr: 'Sud' }, [
        T('Curitiba', -25.4284, -49.2733, 'کوریٹیبا|कूरितिबा|কুরিতিবা|کوریتیبا', { ar: 'كوريتيبا' }),
        T('Foz do Iguaçu', -25.5163, -54.5854, 'فوز دو اگواسو|फ़ोज़ दो इगुआसु|ফোজ দো ইগুয়াসু|فوز دو ایگواسو', { ar: 'فوز دو إيغواسو' }),
      ]),
      R('Centre-West and Northeast', 'وسطی مغربی اور شمال مشرقی|मध्य-पश्चिम और उत्तर-पूर्व|মধ্য-পশ্চিম ও উত্তর-পূর্ব|مرکز-غرب و شمال شرق', { ar: 'الوسط الغربي والشمال الشرقي', tr: 'Orta Batı ve Kuzeydoğu', es: 'Centro-Oeste y Nordeste', fr: 'Centre-Ouest et Nordeste' }, [
        T('Brasília', -15.7939, -47.8828, 'برازیلیا|ब्रासीलिया|ব্রাসিলিয়া|برازیلیا', { ar: 'برازيليا', tr: 'Brasília', es: 'Brasilia', fr: 'Brasilia' }),
        T('Salvador', -12.9777, -38.5016, 'سلواڈور|साल्वाडोर|সালভাদোর|سالوادور', { ar: 'سلفادور', tr: 'Salvador' }, 'America/Bahia'),
      ]),
      R('North', 'شمالی برازیل|उत्तरी ब्राज़ील|উত্তর ব্রাজিল|شمال برزیل', { ar: 'الشمال', tr: 'Kuzey', es: 'Norte', fr: 'Nord' }, [
        T('Manaus', -3.1190, -60.0217, 'ماناؤس|मनौस|মানাউস|مانائوس', { ar: 'ماناوس' }, 'America/Manaus'),
      ]),
    ],
  },
  {
    slug: 'argentina', cc: 'AR', continent: 'southAmerica', name: { en: 'Argentina' }, langs: ['es'],
    tz: 'America/Argentina/Buenos_Aires', method: 'NorthAmerica', defaultSect: 'hanafi',
    regions: [
      R('Buenos Aires', 'بیونس آئرس|ब्यूनस आयर्स|বুয়েনোস আইরেস|بوئنوس آیرس', { ar: 'بوينس آيرس', tr: 'Buenos Aires', es: 'Buenos Aires', fr: 'Buenos Aires' }, [
        T('Buenos Aires', -34.6037, -58.3816, 'بیونس آئرس|ब्यूनस आयर्स|বুয়েনোস আইরেস|بوئنوس آیرس', { ar: 'بوينس آيرس' }),
      ]),
      R('Interior', 'اندرونی ارجنٹائن|आंतरिक अर्जेंटीना|অভ্যন্তরীণ আর্জেন্টিনা|آرژانتین داخلی', { ar: 'الداخل الأرجنتيني', tr: 'İç Arjantin', es: 'Interior', fr: 'Intérieur' }, [
        T('Córdoba', -31.4201, -64.1888, 'قرطبہ|कॉर्डोबा|কর্দোবা|کوردوبا', { ar: 'قرطبة', tr: 'Córdoba', es: 'Córdoba', fr: 'Córdoba' }, 'America/Argentina/Cordoba'),
        T('Rosario', -32.9442, -60.6505, 'روزاریو|रोज़ारियो|রোজারিও|روساریو', { ar: 'روساريو' }),
        T('San Miguel de Tucumán', -26.8083, -65.2176, 'توکومان|तुकुमान|তুকুমান|توکومان', { ar: 'توكومان' }, 'America/Argentina/Tucuman'),
      ]),
    ],
  },
  {
    slug: 'colombia', cc: 'CO', continent: 'southAmerica', name: { en: 'Colombia' }, langs: ['es'],
    tz: 'America/Bogota', method: 'NorthAmerica', defaultSect: 'hanafi',
    regions: [
      R('Colombia', 'کولمبیا|कोलंबिया|কলম্বিয়া|کلمبیا', { ar: 'كولومبيا', tr: 'Kolombiya', es: 'Colombia', fr: 'Colombie' }, [
        T('Bogotá', 4.7110, -74.0721, 'بوگوٹا|बोगोटा|বোগোতা|بوگوتا', { ar: 'بوغوتا', tr: 'Bogota', es: 'Bogotá', fr: 'Bogota' }),
        T('Medellín', 6.2442, -75.5812, 'میڈیلن|मेडेलिन|মেদেলিন|مدلین', { ar: 'ميديلين', es: 'Medellín' }),
        T('Maicao', 11.3778, -72.2389, 'مائیکاؤ|माइकाओ|মাইকাও|مایکائو', { ar: 'مايكاو' }),
      ]),
    ],
  },
  {
    slug: 'venezuela', cc: 'VE', continent: 'southAmerica', name: { en: 'Venezuela' }, langs: ['es'],
    tz: 'America/Caracas', method: 'NorthAmerica', defaultSect: 'hanafi',
    regions: [
      R('Venezuela', 'وینزویلا|वेनेज़ुएला|ভেনেজুয়েলা|ونزوئلا', { ar: 'فنزويلا', tr: 'Venezuela', es: 'Venezuela', fr: 'Venezuela' }, [
        T('Caracas', 10.4806, -66.9036, 'کراکس|कराकास|কারাকাস|کاراکاس', { ar: 'كاراكاس' }),
        T('Maracaibo', 10.6427, -71.6125, 'ماراکائبو|माराकाइबो|মারাকাইবো|ماراکایبو', { ar: 'ماراكايبو' }),
        T('Porlamar', 10.9577, -63.8697, 'پورلامار|पोर्लामार|পোরলামার|پورلامار', { ar: 'بورلامار' }),
      ]),
    ],
  },
  {
    slug: 'peru', cc: 'PE', continent: 'southAmerica', name: { en: 'Peru' }, langs: ['es'],
    tz: 'America/Lima', method: 'NorthAmerica', defaultSect: 'hanafi',
    regions: [
      R('Lima', 'لیما|लीमा|লিমা|لیما', { ar: 'ليما', tr: 'Lima', es: 'Lima', fr: 'Lima' }, [
        T('Lima', -12.0464, -77.0428, 'لیما|लीमा|লিমা|لیما', { ar: 'ليما' }),
      ]),
    ],
  },
  {
    slug: 'chile', cc: 'CL', continent: 'southAmerica', name: { en: 'Chile' }, langs: ['es'],
    tz: 'America/Santiago', method: 'NorthAmerica', defaultSect: 'hanafi',
    regions: [
      R('Chile', 'چلی|चिली|চিলি|شیلی', { ar: 'تشيلي', tr: 'Şili', es: 'Chile', fr: 'Chili' }, [
        T('Santiago', -33.4489, -70.6693, 'سانتیاگو|सैंटियागो|সান্তিয়াগো|سانتیاگو', { ar: 'سانتياغو', es: 'Santiago de Chile' }),
        T('Iquique', -20.2307, -70.1357, 'ایکیکے|इकिके|ইকিকে|ایکیکه', { ar: 'إيكيكي' }),
      ]),
    ],
  },
  {
    slug: 'ecuador', cc: 'EC', continent: 'southAmerica', name: { en: 'Ecuador' }, langs: ['es'],
    tz: 'America/Guayaquil', method: 'NorthAmerica', defaultSect: 'hanafi',
    regions: [
      R('Ecuador', 'ایکواڈور|इक्वाडोर|ইকুয়েডর|اکوادور', { ar: 'الإكوادور', tr: 'Ekvador', es: 'Ecuador', fr: 'Équateur' }, [
        T('Quito', -0.1807, -78.4678, 'کیٹو|कीटो|কিটো|کیتو', { ar: 'كيتو' }),
        T('Guayaquil', -2.1709, -79.9224, 'گوایاکل|ग्वायाकिल|গুয়াইয়াকিল|گوایاکیل', { ar: 'غواياكيل' }),
      ]),
    ],
  },
  {
    slug: 'bolivia', cc: 'BO', continent: 'southAmerica', name: { en: 'Bolivia' }, langs: ['es'],
    tz: 'America/La_Paz', method: 'NorthAmerica', defaultSect: 'hanafi',
    regions: [
      R('Bolivia', 'بولیویا|बोलीविया|বলিভিয়া|بولیوی', { ar: 'بوليفيا', tr: 'Bolivya', es: 'Bolivia', fr: 'Bolivie' }, [
        T('La Paz', -16.4897, -68.1193, 'لا پاز|ला पाज़|লা পাজ|لاپاز', { ar: 'لاباز' }),
        T('Santa Cruz de la Sierra', -17.8146, -63.1561, 'سانتا کروز|सांता क्रूज़|সান্তা ক্রুজ|سانتا کروز', { ar: 'سانتا كروز' }),
      ]),
    ],
  },
  {
    slug: 'paraguay', cc: 'PY', continent: 'southAmerica', name: { en: 'Paraguay' }, langs: ['es'],
    tz: 'America/Asuncion', method: 'NorthAmerica', defaultSect: 'hanafi',
    regions: [
      R('Paraguay', 'پیراگوئے|पराग्वे|প্যারাগুয়ে|پاراگوئه', { ar: 'باراغواي', tr: 'Paraguay', es: 'Paraguay', fr: 'Paraguay' }, [
        T('Asunción', -25.2637, -57.5759, 'اسونسیون|असुनसियोन|আসুনসিওন|آسونسیون', { ar: 'أسونسيون', es: 'Asunción', fr: 'Asuncion' }),
        T('Ciudad del Este', -25.5097, -54.6111, 'سیوداد دیل استے|सियुदाद देल एस्टे|সিউদাদ দেল এস্তে|سیوداد دل استه', { ar: 'سيوداد ديل إستي' }),
      ]),
    ],
  },
  {
    slug: 'uruguay', cc: 'UY', continent: 'southAmerica', name: { en: 'Uruguay' }, langs: ['es'],
    tz: 'America/Montevideo', method: 'NorthAmerica', defaultSect: 'hanafi',
    regions: [
      R('Montevideo', 'مونٹیویڈیو|मोंटेवीडियो|মন্টেভিডিও|مونته‌ویدئو', { ar: 'مونتيفيديو', tr: 'Montevideo', es: 'Montevideo', fr: 'Montevideo' }, [
        T('Montevideo', -34.9011, -56.1645, 'مونٹیویڈیو|मोंटेवीडियो|মন্টেভিডিও|مونته‌ویدئو', { ar: 'مونتيفيديو' }),
      ]),
    ],
  },
  {
    slug: 'guyana', cc: 'GY', continent: 'southAmerica', name: { en: 'Guyana' }, langs: ['en'],
    tz: 'America/Guyana', method: 'NorthAmerica', defaultSect: 'hanafi',
    regions: [
      R('Demerara-Mahaica', 'ڈیمیرارا ماہائیکا|डेमेरारा-माहाइका|ডেমেরারা-মাহাইকা|دمرارا-ماهایکا', { ar: 'ديميرارا ماهايكا', tr: 'Demerara-Mahaica', es: 'Demerara-Mahaica', fr: 'Demerara-Mahaica' }, [
        T('Georgetown', 6.8013, -58.1551, 'جارج ٹاؤن|जॉर्जटाउन|জর্জটাউন|جورج‌تاون', { ar: 'جورج تاون' }),
      ]),
    ],
  },
  {
    slug: 'suriname', cc: 'SR', continent: 'southAmerica', name: { en: 'Suriname' }, langs: ['en'],
    tz: 'America/Paramaribo', method: 'NorthAmerica', defaultSect: 'hanafi',
    regions: [
      R('Paramaribo', 'پاراماریبو|पारामारिबो|পারামারিবো|پاراماریبو', { ar: 'باراماريبو', tr: 'Paramaribo', es: 'Paramaribo', fr: 'Paramaribo' }, [
        T('Paramaribo', 5.8520, -55.2038, 'پاراماریبو|पारामारिबो|পারামারিবো|پاراماریبو', { ar: 'باراماريبو' }),
      ]),
    ],
  },
  {
    slug: 'new-zealand', cc: 'NZ', continent: 'oceania', name: { en: 'New Zealand' }, langs: ['en'],
    tz: 'Pacific/Auckland', method: 'MuslimWorldLeague', defaultSect: 'hanafi',
    regions: [
      R('North Island', 'شمالی جزیرہ|उत्तरी द्वीप|উত্তর দ্বীপ|جزیره شمالی', { ar: 'الجزيرة الشمالية', tr: 'Kuzey Ada', es: 'Isla Norte', fr: 'Île du Nord' }, [
        T('Auckland', -36.8485, 174.7633, 'آکلینڈ|ऑकलैंड|অকল্যান্ড|اوکلند', { ar: 'أوكلاند' }),
        T('Wellington', -41.2866, 174.7756, 'ویلنگٹن|वेलिंगटन|ওয়েলিংটন|ولینگتون', { ar: 'ويلينغتون' }),
        T('Hamilton', -37.7870, 175.2793, 'ہیملٹن|हैमिल्टन|হ্যামিল্টন|همیلتون', { ar: 'هاملتون' }),
      ]),
      R('South Island', 'جنوبی جزیرہ|दक्षिणी द्वीप|দক্ষিণ দ্বীপ|جزیره جنوبی', { ar: 'الجزيرة الجنوبية', tr: 'Güney Ada', es: 'Isla Sur', fr: 'Île du Sud' }, [
        T('Christchurch', -43.5321, 172.6362, 'کرائسٹ چرچ|क्राइस्टचर्च|ক্রাইস্টচার্চ|کرایست‌چرچ', { ar: 'كرايستشرش' }),
      ]),
    ],
  },
  {
    slug: 'fiji', cc: 'FJ', continent: 'oceania', name: { en: 'Fiji' }, langs: ['en'],
    tz: 'Pacific/Fiji', method: 'MuslimWorldLeague', defaultSect: 'hanafi',
    regions: [
      R('Viti Levu', 'ویٹی لیوو|विती लेवु|ভিটি লেভু|ویتی لوو', { ar: 'فيتي ليفو', tr: 'Viti Levu', es: 'Viti Levu', fr: 'Viti Levu' }, [
        T('Suva', -18.1248, 178.4501, 'سووا|सुवा|সুভা|سووا', { ar: 'سوفا' }),
        T('Lautoka', -17.6167, 177.4500, 'لاؤٹوکا|लौटोका|লাউটোকা|لائوتوکا', { ar: 'لاوتوكا' }),
        T('Nadi', -17.7765, 177.4356, 'نندی|नांदी|নান্দি|نادی', { ar: 'نادي' }),
      ]),
      R('Vanua Levu', 'وانوا لیوو|वानुआ लेवु|ভানুয়া লেভু|وانوآ لوو', { ar: 'فانوا ليفو', tr: 'Vanua Levu', es: 'Vanua Levu', fr: 'Vanua Levu' }, [
        T('Labasa', -16.4333, 179.3667, 'لمباسا|लाबासा|লাবাসা|لاباسا', { ar: 'لاباسا' }),
      ]),
    ],
  },
  {
    slug: 'papua-new-guinea', cc: 'PG', continent: 'oceania', name: { en: 'Papua New Guinea' }, langs: ['en'],
    tz: 'Pacific/Port_Moresby', method: 'MuslimWorldLeague', defaultSect: 'hanafi',
    regions: [
      R('Papua New Guinea', 'پاپوا نیو گنی|पापुआ न्यू गिनी|পাপুয়া নিউ গিনি|پاپوآ گینه نو', { ar: 'بابوا غينيا الجديدة', tr: 'Papua Yeni Gine', es: 'Papúa Nueva Guinea', fr: 'Papouasie-Nouvelle-Guinée' }, [
        T('Port Moresby', -9.4438, 147.1803, 'پورٹ مورسبی|पोर्ट मोरेस्बी|পোর্ট মোরসবি|پورت مورسبی', { ar: 'بورت مورسبي' }),
        T('Lae', -6.7155, 146.9999, 'لائے|ला|লাই|لای', { ar: 'لاي' }),
      ]),
    ],
  },
  {
    slug: 'solomon-islands', cc: 'SB', continent: 'oceania', name: { en: 'Solomon Islands' }, langs: ['en'],
    tz: 'Pacific/Guadalcanal', method: 'MuslimWorldLeague', defaultSect: 'hanafi',
    regions: [
      R('Guadalcanal', 'گواڈالکنال|ग्वाडलकैनाल|গুয়াদালকানাল|گوادالکانال', { ar: 'غوادالكانال', tr: 'Guadalcanal', es: 'Guadalcanal', fr: 'Guadalcanal' }, [
        T('Honiara', -9.4456, 159.9729, 'ہونیارا|होनियारा|হোনিয়ারা|هونیارا', { ar: 'هونيارا' }),
      ]),
    ],
  },
  {
    slug: 'vanuatu', cc: 'VU', continent: 'oceania', name: { en: 'Vanuatu' }, langs: ['en'],
    tz: 'Pacific/Efate', method: 'MuslimWorldLeague', defaultSect: 'hanafi',
    regions: [
      R('Shefa', 'شیفا|शेफ़ा|শেফা|شفا', { ar: 'شيفا', tr: 'Shefa', es: 'Shefa', fr: 'Shéfa' }, [
        T('Port Vila', -17.7333, 168.3273, 'پورٹ ویلا|पोर्ट विला|পোর্ট ভিলা|پورت ویلا', { ar: 'بورت فيلا' }),
      ]),
    ],
  },
  {
    slug: 'samoa', cc: 'WS', continent: 'oceania', name: { en: 'Samoa' }, langs: ['en'],
    tz: 'Pacific/Apia', method: 'MuslimWorldLeague', defaultSect: 'hanafi',
    regions: [
      R('Upolu', 'اپولو|उपोलु|উপোলু|اوپولو', { ar: 'أوبولو', tr: 'Upolu', es: 'Upolu', fr: 'Upolu' }, [
        T('Apia', -13.8333, -171.7667, 'اپیا|आपिया|আপিয়া|آپیا', { ar: 'آبيا' }),
      ]),
    ],
  },
  {
    slug: 'tonga', cc: 'TO', continent: 'oceania', name: { en: 'Tonga' }, langs: ['en'],
    tz: 'Pacific/Tongatapu', method: 'MuslimWorldLeague', defaultSect: 'hanafi',
    regions: [
      R('Tongatapu', 'ٹونگاٹاپو|टोंगाटापु|টোঙ্গাটাপু|تونگاتاپو', { ar: 'تونغاتابو', tr: 'Tongatapu', es: 'Tongatapu', fr: 'Tongatapu' }, [
        T('Nukuʻalofa', -21.1394, -175.2018, 'نوکوالوفا|नुकुआलोफ़ा|নুকুয়ালোফা|نوکوآلوفا', { ar: 'نوكوالوفا' }),
      ]),
    ],
  },
  {
    slug: 'kiribati', cc: 'KI', continent: 'oceania', name: { en: 'Kiribati' }, langs: ['en'],
    tz: 'Pacific/Tarawa', method: 'MuslimWorldLeague', defaultSect: 'hanafi',
    regions: [
      R('Gilbert Islands', 'گلبرٹ جزائر|गिल्बर्ट द्वीप|গিলবার্ট দ্বীপপুঞ্জ|جزایر گیلبرت', { ar: 'جزر جيلبرت', tr: 'Gilbert Adaları', es: 'Islas Gilbert', fr: 'Îles Gilbert' }, [
        T('South Tarawa', 1.3290, 172.9790, 'جنوبی تراوا|दक्षिण तरावा|দক্ষিণ তারাওয়া|تاراوای جنوبی', { ar: 'تاراوا الجنوبية' }),
      ]),
    ],
  },
  {
    slug: 'tuvalu', cc: 'TV', continent: 'oceania', name: { en: 'Tuvalu' }, langs: ['en'],
    tz: 'Pacific/Funafuti', method: 'MuslimWorldLeague', defaultSect: 'hanafi',
    regions: [
      R('Funafuti Atoll', 'فونافوتی جزیرہ|फुनाफ़ुती प्रवालद्वीप|ফুনাফুতি প্রবালদ্বীপ|آتول فونافوتی', { ar: 'جزيرة فونافوتي', tr: 'Funafuti Atolü', es: 'Atolón de Funafuti', fr: 'Atoll de Funafuti' }, [
        T('Funafuti', -8.5211, 179.1983, 'فونافوتی|फुनाफ़ुती|ফুনাফুতি|فونافوتی', { ar: 'فونافوتي' }),
      ]),
    ],
  },
  {
    slug: 'nauru', cc: 'NR', continent: 'oceania', name: { en: 'Nauru' }, langs: ['en'],
    tz: 'Pacific/Nauru', method: 'MuslimWorldLeague', defaultSect: 'hanafi',
    regions: [
      R('Yaren District', 'یارین ضلع|यारेन ज़िला|ইয়ারেন জেলা|ناحیه یارن', { ar: 'مقاطعة يارين', tr: 'Yaren Bölgesi', es: 'Distrito de Yaren', fr: 'District de Yaren' }, [
        T('Yaren', -0.5477, 166.9209, 'یارین|यारेन|ইয়ারেন|یارن', { ar: 'يارين' }),
      ]),
    ],
  },
  {
    slug: 'palau', cc: 'PW', continent: 'oceania', name: { en: 'Palau' }, langs: ['en'],
    tz: 'Pacific/Palau', method: 'MuslimWorldLeague', defaultSect: 'hanafi',
    regions: [
      R('Koror', 'کورور|कोरोर|কোরোর|کورور', { ar: 'كورور', tr: 'Koror', es: 'Koror', fr: 'Koror' }, [
        T('Koror', 7.3419, 134.4792, 'کورور|कोरोर|কোরোর|کورور', { ar: 'كورور' }),
      ]),
    ],
  },
  {
    slug: 'micronesia', cc: 'FM', continent: 'oceania', name: { en: 'Micronesia' }, langs: ['en'],
    tz: 'Pacific/Pohnpei', method: 'MuslimWorldLeague', defaultSect: 'hanafi',
    regions: [
      R('Pohnpei', 'پونپے|पोनपेई|পোনপেই|پوهنپی', { ar: 'بونباي', tr: 'Pohnpei', es: 'Pohnpei', fr: 'Pohnpei' }, [
        T('Palikir', 6.9248, 158.1611, 'پالیکیر|पालिकिर|পালিকির|پالیکیر', { ar: 'باليكير' }),
      ]),
    ],
  },
  {
    slug: 'marshall-islands', cc: 'MH', continent: 'oceania', name: { en: 'Marshall Islands' }, langs: ['en'],
    tz: 'Pacific/Majuro', method: 'MuslimWorldLeague', defaultSect: 'hanafi',
    regions: [
      R('Majuro Atoll', 'ماجورو جزیرہ|माजुरो प्रवालद्वीप|মাজুরো প্রবালদ্বীপ|آتول ماجورو', { ar: 'جزيرة ماجورو', tr: 'Majuro Atolü', es: 'Atolón de Majuro', fr: 'Atoll de Majuro' }, [
        T('Majuro', 7.0897, 171.3803, 'ماجورو|माजुरो|মাজুরো|ماجورو', { ar: 'ماجورو' }),
      ]),
    ],
  },
];
