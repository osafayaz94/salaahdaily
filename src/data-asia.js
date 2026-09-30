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
  // Phase A2 (2026-09-30): Singapore (MUIS: adhan's Singapore method matches MUIS's 2026 timetable on
  // data.gov.sg within 1 min on 359 of 365 days), Thailand, Philippines, Cambodia (Shafi'i), Myanmar (Hanafi):
  // no official data found, MWL.
  {
    slug: 'singapore', cc: 'SG', continent: 'asia', name: { en: 'Singapore' }, langs: ['en'],
    tz: 'Asia/Singapore', method: 'Singapore', defaultSect: 'shafii',
    regions: [
      R('Singapore', 'سنگاپور|सिंगापुर|সিঙ্গাপুর|سنگاپور', { ar: 'سنغافورة', tr: 'Singapur', es: 'Singapur', fr: 'Singapour', ms: 'Singapura', id: 'Singapura' }, [
        T('Singapore', 1.3521, 103.8198, 'سنگاپور شہر|सिंगापुर शहर|সিঙ্গাপুর শহর|شهر سنگاپور', { ps: 'د سینګاپور ښار', prs: 'شهر سنگاپور', ar: 'مدينة سنغافورة', tr: 'Singapur', es: 'Singapur', fr: 'Singapour', ms: 'Singapura', id: 'Singapura' }),
      ]),
    ],
  },
  {
    slug: 'thailand', cc: 'TH', continent: 'asia', name: { en: 'Thailand' }, langs: ['en'],
    tz: 'Asia/Bangkok', method: 'MuslimWorldLeague', defaultSect: 'shafii',
    regions: [
      R('Bangkok', 'بنکاک|बैंकॉक|ব্যাংকক|بانکوک', { ar: 'بانكوك', tr: 'Bangkok', es: 'Bangkok', fr: 'Bangkok' }, [
        T('Bangkok', 13.7563, 100.5018, 'بنکاک|बैंकॉक|ব্যাংকক|بانکوک', { ar: 'بانكوك' }),
      ]),
      R('Deep South', 'انتہائی جنوب|सुदूर दक्षिण|দক্ষিণাঞ্চল|جنوب دور', { ar: 'أقصى الجنوب', tr: 'Derin Güney', es: 'Sur profundo', fr: 'Extrême Sud', ms: 'Selatan Thai', id: 'Thailand Selatan' }, [
        T('Pattani', 6.8696, 101.2501, 'پتانی|पट्टानी|পাত্তানি|پاتانی', { ar: 'فطاني', tr: 'Patani', ms: 'Patani', id: 'Patani' }),
        T('Yala', 6.5411, 101.2804, 'یالا|याला|ইয়ালা|یالا', { ar: 'يالا', ms: 'Jala', id: 'Yala' }),
        T('Narathiwat', 6.4254, 101.8253, 'نراتھیوات|नराथिवात|নারাথিওয়াত|ناراتیوات', { ar: 'ناراتيوات', ms: 'Menara', id: 'Narathiwat' }),
      ]),
      R('Songkhla', 'سونگکھلا|सोंगख्ला|সংখলা|سونگکلا', { ar: 'سونغكلا', tr: 'Songkhla', es: 'Songkhla', fr: 'Songkhla', ms: 'Singgora', id: 'Songkhla' }, [
        T('Hat Yai', 7.0086, 100.4747, 'ہات یائی|हाट याई|হাত ইয়াই|هات‌یای', { ar: 'هات ياي' }),
        T('Songkhla', 7.1898, 100.5954, 'سونگکھلا|सोंगख्ला|সংখলা|سونگکلا', { ar: 'سونغكلا', ms: 'Singgora' }),
      ]),
      R('Andaman Coast', 'انڈمان ساحل|अंडमान तट|আন্দামান উপকূল|سواحل آندامان', { ar: 'ساحل أندامان', tr: 'Andaman Kıyısı', es: 'Costa de Andamán', fr: 'Côte d’Andaman' }, [
        T('Satun', 6.6238, 100.0674, 'ستون|सातून|সাতুন|ساتون', { ar: 'ساتون', ms: 'Setul', id: 'Satun' }),
        T('Krabi', 8.0863, 98.9063, 'کرابی|क्राबी|ক্রাবি|کرابی', { ar: 'كرابي' }),
        T('Phuket', 7.8804, 98.3923, 'پھوکٹ|फुकेत|ফুকেট|پوکت', { ar: 'بوكيت' }),
      ]),
      R('Central and Northern Thailand', 'وسطی و شمالی تھائی لینڈ|मध्य और उत्तरी थाईलैंड|মধ্য ও উত্তর থাইল্যান্ড|تایلند مرکزی و شمالی', { ar: 'وسط وشمال تايلاند', tr: 'Orta ve Kuzey Tayland', es: 'Tailandia central y norte', fr: 'Thaïlande centrale et du Nord' }, [
        T('Nonthaburi', 13.8621, 100.5144, 'نونتھابوری|नोंथाबुरी|নন্থাবুরি|نونتابوری', { ar: 'نونثابوري' }),
        T('Ayutthaya', 14.3532, 100.5689, 'ایوتھایا|अयुत्थाया|আয়ুথায়া|آیوتایا', { ar: 'أيوتايا' }),
        T('Chiang Mai', 18.7883, 98.9853, 'چیانگ مائی|चियांग माई|চিয়াং মাই|چیانگ‌مای', { ar: 'شيانغ ماي' }),
      ]),
    ],
  },
  {
    slug: 'philippines', cc: 'PH', continent: 'asia', name: { en: 'Philippines' }, langs: ['en'],
    tz: 'Asia/Manila', method: 'MuslimWorldLeague', defaultSect: 'shafii',
    regions: [
      R('Metro Manila', 'میٹرو منیلا|मेट्रो मनीला|মেট্রো ম্যানিলা|مانیل بزرگ', { ar: 'مترو مانيلا', tr: 'Metro Manila', es: 'Gran Manila', fr: 'Grand Manille' }, [
        T('Manila', 14.5995, 120.9842, 'منیلا|मनीला|ম্যানিলা|مانیل', { ar: 'مانيلا', tr: 'Manila', es: 'Manila', fr: 'Manille' }),
        T('Quezon City', 14.6760, 121.0437, 'کیوزون سٹی|क्वेज़ोन सिटी|কুইজন সিটি|کزون‌سیتی', { ar: 'مدينة كيزون' }),
      ]),
      R('Bangsamoro', 'بنگسامورو|बांगसामोरो|বাংসামোরো|بانگسامورو', { ar: 'بانغسامورو', tr: 'Bangsamoro', es: 'Bangsamoro', fr: 'Bangsamoro' }, [
        T('Cotabato City', 7.2236, 124.2464, 'کوٹاباٹو|कोटाबाटो|কোটাবাটো|کوتاباتو', { ar: 'كوتاباتو' }),
        T('Marawi', 8.0034, 124.2839, 'ماراوی|मारावी|মারাভি|ماراوی', { ar: 'ماراوي' }),
        T('Jolo', 6.0535, 121.0022, 'جولو|जोलो|জোলো|جولو', { ar: 'جولو' }),
        T('Bongao', 5.0292, 119.7731, 'بونگاؤ|बोंगाओ|বোঙ্গাও|بونگائو', { ar: 'بونغاو' }),
        T('Lamitan', 6.6503, 122.1356, 'لامیتان|लामितान|লামিতান|لامیتان', { ar: 'لاميتان' }),
      ]),
      R('Zamboanga Peninsula', 'زامبوانگا جزیرہ نما|ज़ाम्बोआंगा प्रायद्वीप|জাম্বোয়াঙ্গা উপদ্বীপ|شبه‌جزیره زامبوانگا', { ar: 'شبه جزيرة زامبوانغا', tr: 'Zamboanga Yarımadası', es: 'Península de Zamboanga', fr: 'Péninsule de Zamboanga' }, [
        T('Zamboanga City', 6.9214, 122.0790, 'زامبوانگا|ज़ाम्बोआंगा|জাম্বোয়াঙ্গা|زامبوانگا', { ar: 'زامبوانغا' }),
      ]),
      R('Northern and Southern Mindanao', 'شمالی و جنوبی منڈاناؤ|उत्तरी और दक्षिणी मिंडानाओ|উত্তর ও দক্ষিণ মিন্দানাও|میندانائو شمالی و جنوبی', { ar: 'شمال وجنوب مينداناو', tr: 'Kuzey ve Güney Mindanao', es: 'Norte y sur de Mindanao', fr: 'Nord et Sud de Mindanao' }, [
        T('Iligan', 8.2280, 124.2452, 'ایلیگن|इलिगन|ইলিগান|ایلیگان', { ar: 'إليغان' }),
        T('Davao City', 7.1907, 125.4553, 'داواؤ|दावाओ|দাভাও|داوائو', { ar: 'دافاو' }),
        T('General Santos', 6.1164, 125.1716, 'جنرل سانتوس|जनरल सैंटोस|জেনারেল সান্তোস|ژنرال سانتوس', { ar: 'جنرال سانتوس' }),
      ]),
    ],
  },
  {
    slug: 'myanmar', cc: 'MM', continent: 'asia', name: { en: 'Myanmar' }, langs: ['en'],
    tz: 'Asia/Yangon', method: 'MuslimWorldLeague', defaultSect: 'hanafi',
    regions: [
      R('Yangon Region', 'ینگون علاقہ|यांगून क्षेत्र|ইয়াঙ্গুন অঞ্চল|منطقه یانگون', { ar: 'منطقة يانغون', tr: 'Yangon Bölgesi', es: 'Región de Rangún', fr: 'Région de Rangoun' }, [
        T('Yangon', 16.8409, 96.1735, 'ینگون|यांगून|ইয়াঙ্গুন|یانگون', { ar: 'يانغون', tr: 'Yangon', es: 'Rangún', fr: 'Rangoun' }),
      ]),
      R('Mandalay Region', 'منڈالے علاقہ|मांडले क्षेत्र|মান্দালয় অঞ্চল|منطقه ماندالی', { ar: 'منطقة ماندالاي', tr: 'Mandalay Bölgesi', es: 'Región de Mandalay', fr: 'Région de Mandalay' }, [
        T('Mandalay', 21.9588, 96.0891, 'منڈالے|मांडले|মান্দালয়|ماندالی', { ar: 'ماندالاي' }),
      ]),
      R('Naypyidaw', 'نیپیداو|नेपीडॉ|নেপিদো|نای‌پی‌دا', { ar: 'نايبيداو', tr: 'Naypyidaw', es: 'Naipyidó', fr: 'Naypyidaw' }, [
        T('Naypyidaw', 19.7633, 96.0785, 'نیپیداو|नेपीडॉ|নেপিদো|نای‌پی‌دا', { ar: 'نايبيداو', es: 'Naipyidó' }),
      ]),
      R('Rakhine State', 'راکھین ریاست|राखीन राज्य|রাখাইন রাজ্য|ایالت راخین', { ar: 'ولاية راخين', tr: 'Rakhine Eyaleti', es: 'Estado de Rakáin', fr: 'État d’Arakan' }, [
        T('Sittwe', 20.1462, 92.8983, 'ستوے|सित्तवे|সিত্তে|سیتوه', { ar: 'سيتوي' }),
        T('Maungdaw', 20.8167, 92.3667, 'مونگڈو|मौंगडॉ|মংডু|مانگدا', { ar: 'مونغداو' }),
      ]),
      R('Mon State', 'مون ریاست|मोन राज्य|মন রাজ্য|ایالت مون', { ar: 'ولاية مون', tr: 'Mon Eyaleti', es: 'Estado Mon', fr: 'État Môn' }, [
        T('Mawlamyine', 16.4905, 97.6283, 'مولامیائن|मॉलम्याइन|মওলামাইন|مولامیاین', { ar: 'مولامين' }),
      ]),
    ],
  },
  {
    slug: 'cambodia', cc: 'KH', continent: 'asia', name: { en: 'Cambodia' }, langs: ['en'],
    tz: 'Asia/Phnom_Penh', method: 'MuslimWorldLeague', defaultSect: 'shafii',
    regions: [
      R('Phnom Penh', 'نوم پنہ|नोम पेन्ह|নম পেন|پنوم‌پن', { ar: 'بنوم بنه', tr: 'Phnom Penh', es: 'Nom Pen', fr: 'Phnom Penh' }, [
        T('Phnom Penh', 11.5564, 104.9282, 'نوم پنہ|नोम पेन्ह|নম পেন|پنوم‌پن', { ar: 'بنوم بنه', es: 'Nom Pen' }),
      ]),
      R('Central Cambodia', 'وسطی کمبوڈیا|मध्य कंबोडिया|মধ্য কম্বোডিয়া|کامبوج مرکزی', { ar: 'وسط كمبوديا', tr: 'Orta Kamboçya', es: 'Camboya central', fr: 'Cambodge central' }, [
        T('Kampong Cham', 11.9934, 105.4635, 'کامپونگ چام|कम्पोंग चाम|কাম্পং চাম|کامپونگ چام', { ar: 'كامبونغ تشام' }),
      ]),
      R('Southern and Western Cambodia', 'جنوبی و مغربی کمبوڈیا|दक्षिणी और पश्चिमी कंबोडिया|দক্ষিণ ও পশ্চিম কম্বোডিয়া|کامبوج جنوبی و غربی', { ar: 'جنوب وغرب كمبوديا', tr: 'Güney ve Batı Kamboçya', es: 'Camboya meridional y occidental', fr: 'Cambodge du Sud et de l’Ouest' }, [
        T('Kampot', 10.6104, 104.1815, 'کامپوٹ|कम्पोट|কাম্পোট|کامپوت', { ar: 'كامبوت' }),
        T('Battambang', 13.0957, 103.2022, 'بٹامبانگ|बट्टमबांग|বাত্তামবাং|باتامبانگ', { ar: 'باتامبانغ' }),
        T('Siem Reap', 13.3671, 103.8448, 'سیم ریپ|सिएम रीप|সিয়েম রিপ|سیم‌ریپ', { ar: 'سيام ريب' }),
      ]),
    ],
  },
  // Phase A3 (2026-09-30): Sri Lanka (ACJU monthly tables for Colombo, Jan and Jun 2026: 19.8/18.2, +1 min,
  // within 1 min), Shafi'i. Nepal and Bhutan follow India (Karachi, Hanafi): no official data found.
  {
    slug: 'sri-lanka', cc: 'LK', continent: 'asia', name: { en: 'Sri Lanka' }, langs: ['en'],
    tz: 'Asia/Colombo', method: 'ACJU', defaultSect: 'shafii',
    regions: [
      R('Western Province', 'مغربی صوبہ|पश्चिमी प्रांत|পশ্চিম প্রদেশ|استان غربی', { ar: 'المقاطعة الغربية', tr: 'Batı Eyaleti', es: 'Provincia Occidental', fr: 'Province de l’Ouest' }, [
        T('Colombo', 6.9271, 79.8612, 'کولمبو|कोलंबो|কলম্বো|کلمبو', { ar: 'كولومبو', tr: 'Kolombo', es: 'Colombo', fr: 'Colombo' }),
        T('Negombo', 7.2008, 79.8737, 'نیگومبو|नेगोंबो|নেগম্বো|نگومبو', { ar: 'نيغومبو' }),
        T('Beruwala', 6.4788, 79.9828, 'بیروالا|बेरुवाला|বেরুওয়ালা|بروالا', { ar: 'بيروالا' }),
      ]),
      R('Central Province', 'وسطی صوبہ|मध्य प्रांत|মধ্য প্রদেশ|استان مرکزی', { ar: 'المقاطعة الوسطى', tr: 'Orta Eyalet', es: 'Provincia Central', fr: 'Province du Centre' }, [
        T('Kandy', 7.2906, 80.6337, 'کینڈی|कैंडी|ক্যান্ডি|کندی', { ar: 'كاندي' }),
      ]),
      R('Southern Province', 'جنوبی صوبہ|दक्षिणी प्रांत|দক্ষিণ প্রদেশ|استان جنوبی', { ar: 'المقاطعة الجنوبية', tr: 'Güney Eyaleti', es: 'Provincia del Sur', fr: 'Province du Sud' }, [
        T('Galle', 6.0535, 80.2210, 'گال|गाले|গল|گال', { ar: 'غالي' }),
      ]),
      R('Eastern Province', 'مشرقی صوبہ|पूर्वी प्रांत|পূর্ব প্রদেশ|استان شرقی', { ar: 'المقاطعة الشرقية', tr: 'Doğu Eyaleti', es: 'Provincia Oriental', fr: 'Province de l’Est' }, [
        T('Batticaloa', 7.7102, 81.6924, 'بٹیکلوا|बट्टिकलोआ|বাত্তিকালোয়া|باتیکالوآ', { ar: 'باتيكالوا' }),
        T('Kattankudy', 7.6781, 81.7303, 'کاتانکوڈی|कात्तानकुडी|কাত্তানকুডি|کاتانکودی', { ar: 'كاتانكودي' }),
        T('Kalmunai', 7.4167, 81.8167, 'کلمونائی|कल्मुनई|কালমুনাই|کالمونای', { ar: 'كالموناي' }),
        T('Trincomalee', 8.5874, 81.2152, 'ترنکومالی|त्रिंकोमाली|ত্রিঙ্কোমালি|ترینکومالی', { ar: 'ترينكومالي' }),
      ]),
      R('Northern and North Western Provinces', 'شمالی و شمال مغربی صوبے|उत्तरी और उत्तर-पश्चिमी प्रांत|উত্তর ও উত্তর-পশ্চিম প্রদেশ|استان‌های شمالی و شمال غربی', { ar: 'المقاطعتان الشمالية والشمالية الغربية', tr: 'Kuzey ve Kuzeybatı Eyaletleri', es: 'Provincias del Norte y del Noroeste', fr: 'Provinces du Nord et du Nord-Ouest' }, [
        T('Jaffna', 9.6615, 80.0255, 'جافنا|जाफ़ना|জাফনা|جافنا', { ar: 'جافنا' }),
        T('Puttalam', 8.0362, 79.8283, 'پتلم|पुत्तलम|পুত্তলম|پوتالام', { ar: 'بوتالام' }),
      ]),
    ],
  },
  {
    slug: 'nepal', cc: 'NP', continent: 'asia', name: { en: 'Nepal' }, langs: ['en'],
    tz: 'Asia/Kathmandu', method: 'Karachi', defaultSect: 'hanafi',
    regions: [
      R('Bagmati Province', 'باگمتی صوبہ|बागमती प्रदेश|বাগমতী প্রদেশ|استان باگماتی', { ar: 'مقاطعة باغماتي', tr: 'Bagmati Eyaleti', es: 'Provincia de Bagmati', fr: 'Province de Bagmati' }, [
        T('Kathmandu', 27.7172, 85.3240, 'کٹھمنڈو|काठमांडू|কাঠমান্ডু|کاتماندو', { ar: 'كاتماندو', tr: 'Katmandu', es: 'Katmandú', fr: 'Katmandou' }),
      ]),
      R('Madhesh Province', 'مدھیش صوبہ|मधेश प्रदेश|মধেশ প্রদেশ|استان مدهش', { ar: 'مقاطعة ماديش', tr: 'Madheş Eyaleti', es: 'Provincia de Madhesh', fr: 'Province de Madhesh' }, [
        T('Birgunj', 27.0104, 84.8770, 'بیرگنج|बीरगंज|বীরগঞ্জ|بیرگنج', { ar: 'بيرغنج' }),
        T('Janakpur', 26.7288, 85.9263, 'جنکپور|जनकपुर|জনকপুর|جنکپور', { ar: 'جانكبور' }),
      ]),
      R('Lumbini Province', 'لمبنی صوبہ|लुम्बिनी प्रदेश|লুম্বিনী প্রদেশ|استان لومبینی', { ar: 'مقاطعة لومبيني', tr: 'Lumbini Eyaleti', es: 'Provincia de Lumbini', fr: 'Province de Lumbini' }, [
        T('Nepalgunj', 28.0500, 81.6167, 'نیپال گنج|नेपालगंज|নেপালগঞ্জ|نپال‌گنج', { ar: 'نيبالغنج' }),
      ]),
      R('Koshi Province', 'کوشی صوبہ|कोशी प्रदेश|কোশী প্রদেশ|استان کوشی', { ar: 'مقاطعة كوشي', tr: 'Koşi Eyaleti', es: 'Provincia de Koshi', fr: 'Province de Koshi' }, [
        T('Biratnagar', 26.4525, 87.2718, 'بیرات نگر|बिराटनगर|বিরাটনগর|بیراتناگار', { ar: 'بيراتناغار' }),
      ]),
      R('Gandaki Province', 'گنڈکی صوبہ|गंडकी प्रदेश|গণ্ডকী প্রদেশ|استان گندکی', { ar: 'مقاطعة غانداكي', tr: 'Gandaki Eyaleti', es: 'Provincia de Gandaki', fr: 'Province de Gandaki' }, [
        T('Pokhara', 28.2096, 83.9856, 'پوکھرا|पोखरा|পোখরা|پوخارا', { ar: 'بوخارا' }),
      ]),
    ],
  },
  {
    slug: 'bhutan', cc: 'BT', continent: 'asia', name: { en: 'Bhutan' }, langs: ['en'],
    tz: 'Asia/Thimphu', method: 'Karachi', defaultSect: 'hanafi',
    regions: [
      R('Thimphu', 'تھمپو|थिम्फू|থিম্পু|تیمفو', { ar: 'تيمفو', tr: 'Thimphu', es: 'Timbu', fr: 'Thimphou' }, [
        T('Thimphu', 27.4728, 89.6390, 'تھمپو|थिम्फू|থিম্পু|تیمفو', { ar: 'تيمفو', es: 'Timbu', fr: 'Thimphou' }),
      ]),
      R('Chukha', 'چوکھا|चुखा|চুখা|چوخا', { ar: 'تشوكا', tr: 'Chukha', es: 'Chukha', fr: 'Chukha' }, [
        T('Phuntsholing', 26.8516, 89.3884, 'پھنشولنگ|फुंत्शोलिंग|ফুন্টশোলিং|پونتشولینگ', { ar: 'فونتشولينغ' }),
      ]),
    ],
  },
];
