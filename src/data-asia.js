/*
 * Asia outside South Asia and the Middle East (2026-09-30 onwards). Same row helpers as data-europe.js.
 * Phase A1: Central Asia. Kazakhstan: QMDB's own timetable settings; Uzbekistan: Muslim Board calendar fit;
 * Kyrgyzstan: muftiyat.kg API fit. Tajikistan, Turkmenistan: no official data found, MWL. All Hanafi.
 */
'use strict';

function split(s) { const [ur, hi, bn, fa] = s.split('|'); return { ur, hi, bn, fa }; }
function T(en, lat, lng, names, extra, tz) { return [en, lat, lng, Object.assign(split(names), extra || {}), tz]; }
function R(en, names, extra, cities) { return { name: Object.assign({ en: en }, split(names), extra || {}), cities: cities }; }

module.exports = [
  {
    slug: 'kazakhstan', cc: 'KZ', continent: 'asia', name: { en: 'Kazakhstan' }, langs: ['en'],
    tz: 'Asia/Almaty', method: 'Kazakhstan', defaultSect: 'hanafi',
    regions: [
      R('Almaty', 'الماتی|अल्माटी|আলমাটি|آلماتی', { ar: 'ألماتي', tr: 'Almatı', es: 'Almaty', fr: 'Almaty' }, [
        T('Almaty', 43.2389, 76.8897, 'الماتی|अल्माटी|আলমাটি|آلماتی', { ar: 'ألماتي', tr: 'Almatı' }),
      ]),
      R('Astana', 'آستانہ|अस्ताना|আস্তানা|آستانه', { ar: 'أستانا', tr: 'Astana', es: 'Astaná', fr: 'Astana' }, [
        T('Astana', 51.1694, 71.4491, 'آستانہ|अस्ताना|আস্তানা|آستانه', { ar: 'أستانا', es: 'Astaná' }),
      ]),
      R('Southern Kazakhstan', 'جنوبی قازقستان|दक्षिणी कज़ाख़स्तान|দক্ষিণ কাজাখস্তান|قزاقستان جنوبی', { ar: 'جنوب كازاخستان', tr: 'Güney Kazakistan', es: 'Kazajistán meridional', fr: 'Kazakhstan méridional' }, [
        T('Shymkent', 42.3417, 69.5901, 'شیمکنت|शिमकेंट|শিমকেন্ত|شیمکنت', { ar: 'شيمكنت', tr: 'Çimkent' }),
        T('Turkistan', 43.2973, 68.2518, 'ترکستان|तुर्किस्तान|তুর্কিস্তান|ترکستان', { ar: 'تركستان', tr: 'Türkistan' }),
        T('Taraz', 42.9000, 71.3667, 'طراز|तराज़|তারাজ|طراز', { ar: 'طراز', tr: 'Taraz' }),
        T('Kyzylorda', 44.8488, 65.4823, 'قزل اوردا|क़िज़िलोर्दा|কিজিলর্দা|قزل‌اوردا', { ar: 'قيزيلوردا', tr: 'Kızılorda' }),
      ]),
      R('Western Kazakhstan', 'مغربی قازقستان|पश्चिमी कज़ाख़स्तान|পশ্চিম কাজাখস্তান|قزاقستان غربی', { ar: 'غرب كازاخستان', tr: 'Batı Kazakistan', es: 'Kazajistán occidental', fr: 'Kazakhstan occidental' }, [
        T('Aktobe', 50.2839, 57.1670, 'اکتوبے|अक्तोबे|আকতোবে|آقتوبه', { ar: 'أقتوبي', tr: 'Aktöbe' }),
        T('Atyrau', 47.0945, 51.9238, 'اتیراؤ|अतिराउ|আতিরাউ|آتیراو', { ar: 'أتيراو', tr: 'Atırau' }),
        T('Oral', 51.2333, 51.3667, 'اورال|ओराल|ওরাল|اورال', { ar: 'أورال', tr: 'Oral' }),
        T('Aktau', 43.6510, 51.1978, 'اکتاؤ|अक्ताउ|আকতাউ|آقتاو', { ar: 'أقتاو', tr: 'Aktav' }),
      ]),
      R('Northern and Central Kazakhstan', 'شمالی و وسطی قازقستان|उत्तरी और मध्य कज़ाख़स्तान|উত্তর ও মধ্য কাজাখস্তান|قزاقستان شمالی و مرکزی', { ar: 'شمال ووسط كازاخستان', tr: 'Kuzey ve Orta Kazakistan', es: 'Kazajistán septentrional y central', fr: 'Kazakhstan du Nord et du Centre' }, [
        T('Karaganda', 49.8047, 73.1094, 'قراغندا|कारागांडा|কারাগান্ডা|قره‌غندی', { ar: 'قاراغاندي', tr: 'Karağandı' }),
        T('Kostanay', 53.2144, 63.6246, 'کوستانائی|कोस्तानाय|কোস্তানাই|کوستانای', { ar: 'قوستاناي', tr: 'Kostanay' }),
        T('Petropavl', 54.8728, 69.1430, 'پیتروپاول|पेत्रोपाव्ल|পেত্রোপাভল|پتروپاول', { ar: 'بيتروبافل', tr: 'Petropavl' }),
        T('Pavlodar', 52.2873, 76.9674, 'پاولودار|पावलोदार|পাভলোদার|پاولودار', { ar: 'بافلودار', tr: 'Pavlodar' }),
      ]),
      R('Eastern Kazakhstan', 'مشرقی قازقستان|पूर्वी कज़ाख़स्तान|পূর্ব কাজাখস্তান|قزاقستان شرقی', { ar: 'شرق كازاخستان', tr: 'Doğu Kazakistan', es: 'Kazajistán oriental', fr: 'Kazakhstan oriental' }, [
        T('Oskemen', 49.9483, 82.6275, 'اوسکیمن|ओस्केमेन|ওস্কেমেন|اوسکمن', { ar: 'أوسكمن', tr: 'Öskemen' }),
        T('Semey', 50.4111, 80.2275, 'سیمے|सेमेय|সেমেই|سمی', { ar: 'سيمي', tr: 'Semey' }),
      ]),
    ],
  },
  {
    slug: 'uzbekistan', cc: 'UZ', continent: 'asia', name: { en: 'Uzbekistan' }, langs: ['en'],
    tz: 'Asia/Tashkent', method: 'Uzbekistan', defaultSect: 'hanafi',
    regions: [
      R('Tashkent', 'تاشقند|ताशकंद|তাশখন্দ|تاشکند', { ar: 'طشقند', tr: 'Taşkent', es: 'Taskent', fr: 'Tachkent' }, [
        T('Tashkent', 41.2995, 69.2401, 'تاشقند|ताशकंद|তাশখন্দ|تاشکند', { ar: 'طشقند', tr: 'Taşkent', es: 'Taskent', fr: 'Tachkent' }),
      ]),
      R('Samarkand Region', 'سمرقند علاقہ|समरकंद क्षेत्र|সমরকন্দ অঞ্চল|استان سمرقند', { ar: 'ولاية سمرقند', tr: 'Semerkant Vilayeti', es: 'Provincia de Samarcanda', fr: 'Région de Samarcande' }, [
        T('Samarkand', 39.6270, 66.9750, 'سمرقند|समरकंद|সমরকন্দ|سمرقند', { ar: 'سمرقند', tr: 'Semerkant', es: 'Samarcanda', fr: 'Samarcande' }, 'Asia/Samarkand'),
      ]),
      R('Bukhara Region', 'بخارا علاقہ|बुख़ारा क्षेत्र|বুখারা অঞ্চল|استان بخارا', { ar: 'ولاية بخارى', tr: 'Buhara Vilayeti', es: 'Provincia de Bujará', fr: 'Région de Boukhara' }, [
        T('Bukhara', 39.7747, 64.4286, 'بخارا|बुख़ारा|বুখারা|بخارا', { ar: 'بخارى', tr: 'Buhara', es: 'Bujará', fr: 'Boukhara' }, 'Asia/Samarkand'),
      ]),
      R('Fergana Valley', 'وادی فرغانہ|फ़रग़ाना घाटी|ফারগানা উপত্যকা|دره فرغانه', { ar: 'وادي فرغانة', tr: 'Fergana Vadisi', es: 'Valle de Fergana', fr: 'Vallée de Ferghana' }, [
        T('Andijan', 40.7821, 72.3442, 'اندیجان|अंदिजान|আন্দিজান|اندیجان', { ar: 'أنديجان', tr: 'Andican', fr: 'Andijan' }),
        T('Namangan', 40.9983, 71.6726, 'نمنگان|नमांगान|নামাঙ্গান|نمنگان', { ar: 'نمنغان', tr: 'Nemengen' }),
        T('Fergana', 40.3864, 71.7864, 'فرغانہ|फ़रग़ाना|ফারগানা|فرغانه', { ar: 'فرغانة', tr: 'Fergana', fr: 'Ferghana' }),
        T('Kokand', 40.5286, 70.9425, 'خوقند|कोकंद|কোকান্দ|خوقند', { ar: 'خوقند', tr: 'Hokand' }),
      ]),
      R('Karakalpakstan', 'قراقلپاقستان|काराकल्पाकस्तान|কারাকালপাকস্তান|قره‌قالپاقستان', { ar: 'قره قالباقستان', tr: 'Karakalpakistan', es: 'Karakalpakia', fr: 'Karakalpakie' }, [
        T('Nukus', 42.4531, 59.6103, 'نوکوس|नुकुस|নুকুস|نوکوس', { ar: 'نوكوس', tr: 'Nökis' }, 'Asia/Samarkand'),
      ]),
      R('Khorezm Region', 'خوارزم علاقہ|ख़्वारज़्म क्षेत्र|খোরেজম অঞ্চল|استان خوارزم', { ar: 'ولاية خوارزم', tr: 'Harezm Vilayeti', es: 'Provincia de Corasmia', fr: 'Région du Khorezm' }, [
        T('Urgench', 41.5500, 60.6333, 'ارگنج|उर्गेंच|উরগেঞ্চ|اورگنج', { ar: 'أورغنج', tr: 'Ürgenç' }, 'Asia/Samarkand'),
        T('Khiva', 41.3783, 60.3639, 'خیوہ|ख़ीवा|খিভা|خیوه', { ar: 'خيوة', tr: 'Hive', es: 'Jiva', fr: 'Khiva' }, 'Asia/Samarkand'),
      ]),
      R('Southern Uzbekistan', 'جنوبی ازبکستان|दक्षिणी उज़्बेकिस्तान|দক্ষিণ উজবেকিস্তান|ازبکستان جنوبی', { ar: 'جنوب أوزبكستان', tr: 'Güney Özbekistan', es: 'Uzbekistán meridional', fr: 'Ouzbékistan du Sud' }, [
        T('Qarshi', 38.8606, 65.7847, 'قرشی|क़र्शी|কারশি|قرشی', { ar: 'قارشي', tr: 'Karşı' }, 'Asia/Samarkand'),
        T('Termez', 37.2242, 67.2783, 'ترمذ|तिरमिज़|তিরমিজ|ترمذ', { ar: 'ترمذ', tr: 'Tirmiz', fr: 'Termez' }, 'Asia/Samarkand'),
      ]),
      R('Central Uzbekistan', 'وسطی ازبکستان|मध्य उज़्बेकिस्तान|মধ্য উজবেকিস্তান|ازبکستان مرکزی', { ar: 'وسط أوزبكستان', tr: 'Orta Özbekistan', es: 'Uzbekistán central', fr: 'Ouzbékistan central' }, [
        T('Jizzakh', 40.1158, 67.8422, 'جیزخ|जिज़्ज़ाख|জিজ্জাখ|جیزک', { ar: 'جيزاخ', tr: 'Cizzah' }, 'Asia/Samarkand'),
        T('Navoiy', 40.0844, 65.3792, 'نوائی|नवोई|নাভোই|نوایی', { ar: 'نوائي', tr: 'Nevai' }, 'Asia/Samarkand'),
        T('Gulistan', 40.4897, 68.7842, 'گلستان|गुलिस्तान|গুলিস্তান|گلستان', { ar: 'غولستان', tr: 'Gülistan' }),
      ]),
    ],
  },
  {
    slug: 'kyrgyzstan', cc: 'KG', continent: 'asia', name: { en: 'Kyrgyzstan' }, langs: ['en'],
    tz: 'Asia/Bishkek', method: 'Kyrgyzstan', defaultSect: 'hanafi',
    regions: [
      R('Bishkek', 'بشکیک|बिश्केक|বিশকেক|بیشکک', { ar: 'بيشكيك', tr: 'Bişkek', es: 'Biskek', fr: 'Bichkek' }, [
        T('Bishkek', 42.8746, 74.5698, 'بشکیک|बिश्केक|বিশকেক|بیشکک', { ar: 'بيشكيك', tr: 'Bişkek', es: 'Biskek', fr: 'Bichkek' }),
      ]),
      R('Chüy Region', 'چوئی علاقہ|चुई क्षेत्र|চুই অঞ্চল|استان چوی', { ar: 'منطقة تشوي', tr: 'Çüy bölgesi', es: 'Provincia de Chuy', fr: 'Province de Tchouï' }, [
        T('Tokmok', 42.8419, 75.3014, 'توکموک|तोकमोक|তোকমোক|توکموک', { ar: 'توكموك', tr: 'Tokmok' }),
      ]),
      R('Osh Region', 'اوش علاقہ|ओश क्षेत्र|ওশ অঞ্চল|استان اوش', { ar: 'منطقة أوش', tr: 'Oş bölgesi', es: 'Provincia de Osh', fr: 'Province d’Och' }, [
        T('Osh', 40.5283, 72.7985, 'اوش|ओश|ওশ|اوش', { ar: 'أوش', tr: 'Oş', fr: 'Och' }),
        T('Uzgen', 40.7699, 73.3007, 'ازگن|उज़्गेन|উজগেন|اوزگن', { ar: 'أوزغن', tr: 'Özgön' }),
      ]),
      R('Jalal-Abad Region', 'جلال آباد علاقہ|जलाल-आबाद क्षेत्र|জালাল-আবাদ অঞ্চল|استان جلال‌آباد', { ar: 'منطقة جلال آباد', tr: 'Celalabat bölgesi', es: 'Provincia de Jalal-Abad', fr: 'Province de Djalal-Abad' }, [
        T('Jalal-Abad', 40.9333, 73.0000, 'جلال آباد|जलाल-आबाद|জালাল-আবাদ|جلال‌آباد', { ar: 'جلال آباد', tr: 'Celalabat', fr: 'Djalal-Abad' }),
      ]),
      R('Issyk-Kul Region', 'ایسک کول علاقہ|इसिक-कुल क्षेत्र|ইসিক-কুল অঞ্চল|استان ایسیک‌کول', { ar: 'منطقة إيسيك كول', tr: 'Issık Göl bölgesi', es: 'Provincia de Issyk-Kul', fr: 'Province d’Issyk-Koul' }, [
        T('Karakol', 42.4907, 78.3936, 'قراقول|काराकोल|কারাকোল|قره‌قول', { ar: 'كاراكول', tr: 'Karakol' }),
      ]),
      R('Southern Kyrgyzstan', 'جنوبی کرغزستان|दक्षिणी किर्गिज़स्तान|দক্ষিণ কিরগিজস্তান|قرقیزستان جنوبی', { ar: 'جنوب قيرغيزستان', tr: 'Güney Kırgızistan', es: 'Kirguistán meridional', fr: 'Kirghizistan du Sud' }, [
        T('Batken', 40.0628, 70.8194, 'باتکن|बातकेन|বাতকেন|باتکن', { ar: 'باتكن', tr: 'Batken' }),
      ]),
      R('Northern Kyrgyzstan', 'شمالی کرغزستان|उत्तरी किर्गिज़स्तान|উত্তর কিরগিজস্তান|قرقیزستان شمالی', { ar: 'شمال قيرغيزستان', tr: 'Kuzey Kırgızistan', es: 'Kirguistán septentrional', fr: 'Kirghizistan du Nord' }, [
        T('Naryn', 41.4287, 75.9911, 'نارین|नारिन|নারিন|نارین', { ar: 'نارين', tr: 'Narın' }),
        T('Talas', 42.5228, 72.2428, 'طلاس|तलास|তালাস|طلاس', { ar: 'طلاس', tr: 'Talas' }),
      ]),
    ],
  },
  {
    slug: 'tajikistan', cc: 'TJ', continent: 'asia', name: { en: 'Tajikistan' }, langs: ['en'],
    tz: 'Asia/Dushanbe', method: 'MuslimWorldLeague', defaultSect: 'hanafi',
    regions: [
      R('Dushanbe', 'دوشنبے|दुशांबे|দুশান্বে|دوشنبه', { ar: 'دوشنبه', tr: 'Duşanbe', es: 'Dusambé', fr: 'Douchanbé' }, [
        T('Dushanbe', 38.5598, 68.7870, 'دوشنبے|दुशांबे|দুশান্বে|دوشنبه', { ar: 'دوشنبه', tr: 'Duşanbe', es: 'Dusambé', fr: 'Douchanbé' }),
      ]),
      R('Sughd Region', 'سغد علاقہ|सुग़्द क्षेत्र|সুগদ অঞ্চল|استان سغد', { ar: 'ولاية صغد', tr: 'Soğd Vilayeti', es: 'Provincia de Sughd', fr: 'Région de Sughd' }, [
        T('Khujand', 40.2826, 69.6222, 'خجند|ख़ुजंद|খুজান্দ|خجند', { ar: 'خجند', tr: 'Hucend', fr: 'Khodjent' }),
        T('Istaravshan', 39.9108, 69.0064, 'استروشن|इस्तरावशान|ইস্তারাভশান|استروشن', { ar: 'استروشنة', tr: 'İstaravşan' }),
        T('Panjakent', 39.4952, 67.6093, 'پنج کینت|पंजाकेंट|পাঞ্জাকেন্ত|پنجکنت', { ar: 'بنجكنت', tr: 'Pencikent' }),
      ]),
      R('Khatlon Region', 'ختلان علاقہ|ख़तलोन क्षेत्र|খাতলন অঞ্চল|استان ختلان', { ar: 'ولاية ختلان', tr: 'Hatlon Vilayeti', es: 'Provincia de Jatlón', fr: 'Région de Khatlon' }, [
        T('Kulob', 37.9146, 69.7845, 'کولاب|कुलोब|কুলোব|کولاب', { ar: 'كولاب', tr: 'Kulob' }),
        T('Bokhtar', 37.8364, 68.7803, 'بختر|बोख़्तर|বোখতার|بختر', { ar: 'بختر', tr: 'Bohtar' }),
      ]),
      R('Gorno-Badakhshan', 'گورنو بدخشاں|गोर्नो-बदख़्शान|গোর্নো-বাদাখশান|بدخشان کوهستانی', { ar: 'بدخشان الجبلية', tr: 'Dağlık Bedahşan', es: 'Alto Badajshán', fr: 'Haut-Badakhchan' }, [
        T('Khorog', 37.4897, 71.5531, 'خوروغ|ख़ोरोग|খোরোগ|خاروغ', { ar: 'خوروغ', tr: 'Horog' }),
      ]),
    ],
  },
  {
    slug: 'turkmenistan', cc: 'TM', continent: 'asia', name: { en: 'Turkmenistan' }, langs: ['en'],
    tz: 'Asia/Ashgabat', method: 'MuslimWorldLeague', defaultSect: 'hanafi',
    regions: [
      R('Ashgabat', 'اشک آباد|अश्गाबात|আশগাবাত|عشق‌آباد', { ar: 'عشق آباد', tr: 'Aşkabat', es: 'Asjabad', fr: 'Achgabat' }, [
        T('Ashgabat', 37.9601, 58.3261, 'اشک آباد|अश्गाबात|আশগাবাত|عشق‌آباد', { ar: 'عشق آباد', tr: 'Aşkabat', es: 'Asjabad', fr: 'Achgabat' }),
      ]),
      R('Lebap Region', 'لباپ علاقہ|लेबाप क्षेत्र|লেবাপ অঞ্চল|استان لب‌آب', { ar: 'ولاية لباب', tr: 'Lebap Vilayeti', es: 'Provincia de Lebap', fr: 'Province de Lebap' }, [
        T('Türkmenabat', 39.0733, 63.5786, 'ترکمن آباد|तुर्कमेनाबात|তুর্কমেনাবাত|ترکمن‌آباد', { ar: 'تركمن آباد', tr: 'Türkmenabat' }),
      ]),
      R('Daşoguz Region', 'داشوغوز علاقہ|दाशोगुज़ क्षेत्र|দাশোগুজ অঞ্চল|استان داش‌اوغوز', { ar: 'ولاية داشوغوز', tr: 'Daşoğuz Vilayeti', es: 'Provincia de Daşoguz', fr: 'Province de Daşoguz' }, [
        T('Daşoguz', 41.8363, 59.9666, 'داشوغوز|दाशोगुज़|দাশোগুজ|داش‌اوغوز', { ar: 'داشوغوز', tr: 'Daşoğuz' }),
      ]),
      R('Mary Region', 'مرو علاقہ|मारी क्षेत्र|মারি অঞ্চল|استان مرو', { ar: 'ولاية ماري', tr: 'Mari Vilayeti', es: 'Provincia de Mary', fr: 'Province de Mary' }, [
        T('Mary', 37.5936, 61.8303, 'مرو|मारी|মারি|مرو', { ar: 'مرو', tr: 'Mari' }),
      ]),
      R('Balkan Region', 'بلقان علاقہ|बाल्कन क्षेत्र|বালকান অঞ্চল|استان بالکان', { ar: 'ولاية بلقان', tr: 'Balkan Vilayeti', es: 'Provincia de Balkan', fr: 'Province de Balkan' }, [
        T('Balkanabat', 39.5108, 54.3671, 'بلقان آباد|बाल्कनाबात|বালকানাবাত|بالکان‌آباد', { ar: 'بلقان آباد', tr: 'Balkanabat' }),
        T('Türkmenbaşy', 40.0222, 52.9552, 'ترکمان باشی|तुर्कमेनबाशी|তুর্কমেনবাশি|ترکمن‌باشی', { ar: 'تركمانباشي', tr: 'Türkmenbaşı' }),
      ]),
    ],
  },
];

