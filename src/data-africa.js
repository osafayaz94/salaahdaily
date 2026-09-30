/*
 * Africa beyond Egypt and Nigeria (2026-09-30 onwards). Same row helpers as data-europe.js.
 * Phase F1, North Africa, all Maliki: Morocco fitted to the Ministry of Habous (Rabat), Algeria to the Ministry
 * of Religious Affairs' 1448 calendar (Algiers). Tunisia, Libya, Sudan, Mauritania: no official data, MWL.
 */
'use strict';

function split(s) { const [ur, hi, bn, fa] = s.split('|'); return { ur, hi, bn, fa }; }
function T(en, lat, lng, names, extra, tz) { return [en, lat, lng, Object.assign(split(names), extra || {}), tz]; }
function R(en, names, extra, cities) { return { name: Object.assign({ en: en }, split(names), extra || {}), cities: cities }; }

module.exports = [
  {
    slug: 'morocco', cc: 'MA', continent: 'africa', name: { en: 'Morocco' }, langs: ['ar'],
    tz: 'Africa/Casablanca', method: 'Morocco', defaultSect: 'maliki',
    regions: [
      R('Rabat-Salé-Kénitra', 'رباط-سلا-قنیطرہ|रबात-सले-केनित्रा|রাবাত-সালে-কেনিত্রা|رباط-سلا-قنیطره', { ar: 'الرباط سلا القنيطرة', tr: 'Rabat-Sale-Kenitra', es: 'Rabat-Salé-Kenitra', fr: 'Rabat-Salé-Kénitra' }, [
        T('Rabat', 34.0209, -6.8416, 'رباط|रबात|রাবাত|رباط', { ar: 'الرباط', tr: 'Rabat', es: 'Rabat', fr: 'Rabat' }),
        T('Salé', 34.0531, -6.7985, 'سلا|सले|সালে|سلا', { ar: 'سلا', es: 'Salé', fr: 'Salé' }),
        T('Kenitra', 34.2610, -6.5802, 'قنیطرہ|केनित्रा|কেনিত্রা|قنیطره', { ar: 'القنيطرة', fr: 'Kénitra' }),
      ]),
      R('Casablanca-Settat', 'کاسابلانکا-سطات|कासाब्लांका-सेत्तात|কাসাব্লাঙ্কা-সেত্তাত|کازابلانکا-سطات', { ar: 'الدار البيضاء سطات', tr: 'Kazablanka-Settat', es: 'Casablanca-Settat', fr: 'Casablanca-Settat' }, [
        T('Casablanca', 33.5731, -7.5898, 'کاسابلانکا|कासाब्लांका|কাসাব্লাঙ্কা|کازابلانکا', { ar: 'الدار البيضاء', tr: 'Kazablanka', es: 'Casablanca', fr: 'Casablanca' }),
      ]),
      R('Fès-Meknès', 'فاس-مکناس|फ़ेस-मेकनेस|ফেস-মেকনেস|فاس-مکناس', { ar: 'فاس مكناس', tr: 'Fes-Meknes', es: 'Fez-Mequinez', fr: 'Fès-Meknès' }, [
        T('Fez', 34.0331, -5.0003, 'فاس|फ़ेस|ফেস|فاس', { ar: 'فاس', tr: 'Fes', es: 'Fez', fr: 'Fès' }),
        T('Meknes', 33.8935, -5.5473, 'مکناس|मेकनेस|মেকনেস|مکناس', { ar: 'مكناس', es: 'Mequinez', fr: 'Meknès' }),
      ]),
      R('Marrakesh-Safi', 'مراکش-آسفی|मराकेश-साफ़ी|মারাকেশ-সাফি|مراکش-آسفی', { ar: 'مراكش آسفي', tr: 'Marakeş-Safi', es: 'Marrakech-Safí', fr: 'Marrakech-Safi' }, [
        T('Marrakesh', 31.6295, -7.9811, 'مراکش|मराकेश|মারাকেশ|مراکش', { ar: 'مراكش', tr: 'Marakeş', es: 'Marrakech', fr: 'Marrakech' }),
        T('Safi', 32.2994, -9.2372, 'آسفی|साफ़ी|সাফি|آسفی', { ar: 'آسفي', es: 'Safí' }),
      ]),
      R('Tanger-Tétouan-Al Hoceïma', 'طنجہ-تطوان-الحسیمہ|तांजीयर-तेतुआन-अल होसेइमा|তাঞ্জিয়ার-তেতুয়ান-আল হোসেইমা|طنجه-تطوان-الحسیمه', { ar: 'طنجة تطوان الحسيمة', tr: 'Tanca-Tetuan-El Huseyme', es: 'Tánger-Tetuán-Alhucemas', fr: 'Tanger-Tétouan-Al Hoceïma' }, [
        T('Tangier', 35.7595, -5.8340, 'طنجہ|तांजीयर|তাঞ্জিয়ার|طنجه', { ar: 'طنجة', tr: 'Tanca', es: 'Tánger', fr: 'Tanger' }),
        T('Tetouan', 35.5889, -5.3626, 'تطوان|तेतुआन|তেতুয়ান|تطوان', { ar: 'تطوان', es: 'Tetuán', fr: 'Tétouan' }),
      ]),
      R('Souss-Massa', 'سوس-ماسہ|सूस-मासा|সুস-মাসা|سوس-ماسه', { ar: 'سوس ماسة', tr: 'Sus-Masa', es: 'Sus-Masa', fr: 'Souss-Massa' }, [
        T('Agadir', 30.4278, -9.5981, 'اگادیر|अगादीर|আগাদির|آگادیر', { ar: 'أكادير', tr: 'Agadir' }),
      ]),
      R('Oriental', 'مشرقی علاقہ|पूर्वी क्षेत्र|প্রাচ্য অঞ্চল|منطقه شرقی', { ar: 'جهة الشرق', tr: 'Doğu Bölgesi', es: 'Oriental', fr: 'L’Oriental' }, [
        T('Oujda', 34.6814, -1.9086, 'وجدہ|उज्दा|উজদা|وجده', { ar: 'وجدة', tr: 'Vecde' }),
        T('Nador', 35.1681, -2.9335, 'ناظور|नाडोर|নাদোর|ناظور', { ar: 'الناظور' }),
      ]),
    ],
  },
  {
    slug: 'algeria', cc: 'DZ', continent: 'africa', name: { en: 'Algeria' }, langs: ['ar'],
    tz: 'Africa/Algiers', method: 'Algeria', defaultSect: 'maliki',
    regions: [
      R('North Central Algeria', 'شمالی وسطی الجزائر|उत्तर-मध्य अल्जीरिया|উত্তর-মধ্য আলজেরিয়া|شمال مرکزی الجزایر', { ar: 'الشمال الأوسط', tr: 'Kuzey Orta Cezayir', es: 'Argelia centro-norte', fr: 'Centre-Nord algérien' }, [
        T('Algiers', 36.7538, 3.0588, 'الجزائر شہر|अल्जीयर्स|আলজিয়ার্স|شهر الجزیره', { ar: 'الجزائر العاصمة', tr: 'Cezayir', es: 'Argel', fr: 'Alger' }),
        T('Blida', 36.4700, 2.8277, 'بلیدہ|ब्लिदा|ব্লিদা|بلیده', { ar: 'البليدة' }),
        T('Béjaïa', 36.7509, 5.0567, 'بجایہ|बेजाया|বেজাইয়া|بجایه', { ar: 'بجاية', tr: 'Bicaye', fr: 'Béjaïa' }),
      ]),
      R('Western Algeria', 'مغربی الجزائر|पश्चिमी अल्जीरिया|পশ্চিম আলজেরিয়া|غرب الجزایر', { ar: 'الغرب الجزائري', tr: 'Batı Cezayir', es: 'Argelia occidental', fr: 'Ouest algérien' }, [
        T('Oran', 35.6969, -0.6331, 'وہران|ओरान|ওরান|وهران', { ar: 'وهران', tr: 'Vahran', es: 'Orán', fr: 'Oran' }),
        T('Tlemcen', 34.8783, -1.3150, 'تلمسان|त्लेमसेन|ত্লেমসেন|تلمسان', { ar: 'تلمسان', tr: 'Tilimsan' }),
      ]),
      R('Eastern Algeria', 'مشرقی الجزائر|पूर्वी अल्जीरिया|পূর্ব আলজেরিয়া|شرق الجزایر', { ar: 'الشرق الجزائري', tr: 'Doğu Cezayir', es: 'Argelia oriental', fr: 'Est algérien' }, [
        T('Constantine', 36.3650, 6.6147, 'قسنطینہ|कॉन्स्टेंटाइन|কনস্টান্টাইন|قسنطینه', { ar: 'قسنطينة', tr: 'Kostantin', es: 'Constantina', fr: 'Constantine' }),
        T('Annaba', 36.9000, 7.7667, 'عنابہ|अन्नाबा|আন্নাবা|عنابه', { ar: 'عنابة' }),
        T('Sétif', 36.1911, 5.4137, 'سطیف|सेतिफ़|সেতিফ|سطیف', { ar: 'سطيف', fr: 'Sétif' }),
        T('Batna', 35.5559, 6.1741, 'باتنہ|बात्ना|বাতনা|باتنه', { ar: 'باتنة' }),
      ]),
      R('Highlands and Sahara', 'پہاڑی علاقے اور صحارا|पठार और सहारा|উচ্চভূমি ও সাহারা|فلات و صحرا', { ar: 'الهضاب والصحراء', tr: 'Yaylalar ve Sahra', es: 'Altiplanos y Sáhara', fr: 'Hauts Plateaux et Sahara' }, [
        T('Djelfa', 34.6704, 3.2630, 'جلفہ|जेल्फ़ा|জেলফা|جلفه', { ar: 'الجلفة' }),
        T('Biskra', 34.8500, 5.7333, 'بسکرہ|बिस्करा|বিস্করা|بسکره', { ar: 'بسكرة' }),
        T('Ghardaïa', 32.4909, 3.6734, 'غردایہ|ग़र्दाया|গারদাইয়া|غردایه', { ar: 'غرداية', fr: 'Ghardaïa' }),
        T('Ouargla', 31.9493, 5.3250, 'ورقلہ|वरगला|ওয়ারগলা|ورقله', { ar: 'ورقلة' }),
        T('Adrar', 27.8743, -0.2939, 'ادرار|अद्रार|আদ্রার|ادرار', { ar: 'أدرار' }),
        T('Tamanrasset', 22.7850, 5.5228, 'تمنراست|तमनरासेत|তামানরাসেত|تمنراست', { ar: 'تمنراست' }),
      ]),
    ],
  },
  {
    slug: 'tunisia', cc: 'TN', continent: 'africa', name: { en: 'Tunisia' }, langs: ['ar'],
    tz: 'Africa/Tunis', method: 'MuslimWorldLeague', defaultSect: 'maliki',
    regions: [
      R('Greater Tunis', 'تیونس کبریٰ|वृहत ट्यूनिस|বৃহত্তর তিউনিস|تونس بزرگ', { ar: 'تونس الكبرى', tr: 'Büyük Tunus', es: 'Gran Túnez', fr: 'Grand Tunis' }, [
        T('Tunis', 36.8065, 10.1815, 'تیونس شہر|ट्यूनिस शहर|তিউনিস শহর|شهر تونس', { ps: 'د تونس ښار', prs: 'شهر تونس', ar: 'مدينة تونس', tr: 'Tunus', es: 'Túnez', fr: 'Tunis' }),
      ]),
      R('Northern Tunisia', 'شمالی تیونس|उत्तरी ट्यूनीशिया|উত্তর তিউনিসিয়া|تونس شمالی', { ar: 'الشمال التونسي', tr: 'Kuzey Tunus', es: 'Túnez septentrional', fr: 'Nord tunisien' }, [
        T('Bizerte', 37.2744, 9.8739, 'بنزرت|बिज़र्ट|বিজার্ট|بنزرت', { ar: 'بنزرت', fr: 'Bizerte' }),
      ]),
      R('Sahel', 'ساحل|साहेल|সাহেল|ساحل', { ar: 'الساحل', tr: 'Sahil', es: 'Sahel', fr: 'Sahel' }, [
        T('Sousse', 35.8256, 10.6084, 'سوسہ|सूस|সুসে|سوسه', { ar: 'سوسة', fr: 'Sousse' }),
        T('Monastir', 35.7643, 10.8113, 'منستیر|मोनास्तिर|মোনাস্তির|منستیر', { ar: 'المنستير' }),
      ]),
      R('Central Tunisia', 'وسطی تیونس|मध्य ट्यूनीशिया|মধ্য তিউনিসিয়া|تونس مرکزی', { ar: 'الوسط التونسي', tr: 'Orta Tunus', es: 'Túnez central', fr: 'Centre tunisien' }, [
        T('Kairouan', 35.6781, 10.0963, 'قیروان|कैरवान|কাইরুয়ান|قیروان', { ar: 'القيروان', tr: 'Kayrevan', es: 'Cairuán', fr: 'Kairouan' }),
        T('Sfax', 34.7406, 10.7603, 'صفاقس|स्फ़ाक्स|স্ফাক্স|صفاقس', { ar: 'صفاقس', tr: 'Sfaks' }),
      ]),
      R('Southern Tunisia', 'جنوبی تیونس|दक्षिणी ट्यूनीशिया|দক্ষিণ তিউনিসিয়া|تونس جنوبی', { ar: 'الجنوب التونسي', tr: 'Güney Tunus', es: 'Túnez meridional', fr: 'Sud tunisien' }, [
        T('Gabès', 33.8815, 10.0982, 'قابس|गाबेस|গাবেস|قابس', { ar: 'قابس', fr: 'Gabès' }),
        T('Gafsa', 34.4250, 8.7842, 'قفصہ|गफ़सा|গাফসা|قفصه', { ar: 'قفصة' }),
        T('Djerba', 33.8076, 10.8451, 'جربہ|जेरबा|জেরবা|جربه', { ar: 'جربة', es: 'Yerba', fr: 'Djerba' }),
      ]),
    ],
  },
  {
    slug: 'libya', cc: 'LY', continent: 'africa', name: { en: 'Libya' }, langs: ['ar'],
    tz: 'Africa/Tripoli', method: 'MuslimWorldLeague', defaultSect: 'maliki',
    regions: [
      R('Tripolitania', 'طرابلس الغرب|त्रिपोलितानिया|ত্রিপোলিতানিয়া|طرابلس غرب', { ar: 'طرابلس الغرب', tr: 'Trablusgarp', es: 'Tripolitania', fr: 'Tripolitaine' }, [
        T('Tripoli', 32.8872, 13.1913, 'طرابلس|त्रिपोली|ত্রিপোলি|طرابلس', { ar: 'طرابلس', tr: 'Trablus', es: 'Trípoli', fr: 'Tripoli' }),
        T('Misrata', 32.3754, 15.0925, 'مصراتہ|मिसराता|মিসরাতা|مصراته', { ar: 'مصراتة' }),
        T('Zawiya', 32.7571, 12.7278, 'زاویہ|ज़ाविया|জাভিয়া|زاویه', { ar: 'الزاوية' }),
        T('Sirte', 31.2089, 16.5887, 'سرت|सिर्त|সির্তে|سرت', { ar: 'سرت', es: 'Sirte', fr: 'Syrte' }),
      ]),
      R('Cyrenaica', 'برقہ|साइरेनेका|সাইরেনাইকা|برقه', { ar: 'برقة', tr: 'Bingazi bölgesi', es: 'Cirenaica', fr: 'Cyrénaïque' }, [
        T('Benghazi', 32.1167, 20.0667, 'بن غازی|बेनग़ाज़ी|বেনগাজি|بنغازی', { ar: 'بنغازي', tr: 'Bingazi', es: 'Bengasi', fr: 'Benghazi' }),
        T('Bayda', 32.7627, 21.7551, 'بیضاء|बैदा|বাইদা|البیضاء', { ar: 'البيضاء' }),
        T('Tobruk', 32.0836, 23.9764, 'طبرق|तोब्रुक|তোবরুক|طبرق', { ar: 'طبرق' }),
      ]),
      R('Fezzan', 'فزان|फ़ज़्ज़ान|ফেজ্জান|فزان', { ar: 'فزان', tr: 'Fizan', es: 'Fezán', fr: 'Fezzan' }, [
        T('Sabha', 27.0377, 14.4283, 'سبہا|सबहा|সাবহা|سبها', { ar: 'سبها' }),
      ]),
    ],
  },
  {
    slug: 'sudan', cc: 'SD', continent: 'africa', name: { en: 'Sudan' }, langs: ['ar'],
    tz: 'Africa/Khartoum', method: 'MuslimWorldLeague', defaultSect: 'maliki',
    regions: [
      R('Khartoum State', 'خرطوم ریاست|ख़ार्तूम राज्य|খার্তুম রাজ্য|ایالت خارطوم', { ar: 'ولاية الخرطوم', tr: 'Hartum Eyaleti', es: 'Estado de Jartum', fr: 'État de Khartoum' }, [
        T('Khartoum', 15.5007, 32.5599, 'خرطوم|ख़ार्तूम|খার্তুম|خارطوم', { ar: 'الخرطوم', tr: 'Hartum', es: 'Jartum', fr: 'Khartoum' }),
        T('Omdurman', 15.6445, 32.4777, 'ام درمان|ओमदुरमान|ওমদুরমান|ام‌درمان', { ar: 'أم درمان', tr: 'Ümmüdürman' }),
      ]),
      R('Eastern Sudan', 'مشرقی سوڈان|पूर्वी सूडान|পূর্ব সুদান|سودان شرقی', { ar: 'شرق السودان', tr: 'Doğu Sudan', es: 'Sudán oriental', fr: 'Soudan oriental' }, [
        T('Port Sudan', 19.6158, 37.2164, 'پورٹ سوڈان|पोर्ट सूडान|পোর্ট সুদান|بندر سودان', { ar: 'بورتسودان', tr: 'Port Sudan', es: 'Puerto Sudán', fr: 'Port-Soudan' }),
        T('Kassala', 15.4510, 36.4000, 'کسلا|कसाला|কাসালা|کسلا', { ar: 'كسلا' }),
      ]),
      R('Central and Northern Sudan', 'وسطی و شمالی سوڈان|मध्य और उत्तरी सूडान|মধ্য ও উত্তর সুদান|سودان مرکزی و شمالی', { ar: 'وسط وشمال السودان', tr: 'Orta ve Kuzey Sudan', es: 'Sudán central y septentrional', fr: 'Soudan central et du Nord' }, [
        T('Wad Madani', 14.4012, 33.5199, 'ود مدنی|वाद मदनी|ওয়াদ মাদানি|ود مدنی', { ar: 'ود مدني' }),
        T('Atbara', 17.7022, 33.9870, 'عطبرہ|अतबारा|আতবারা|عطبره', { ar: 'عطبرة' }),
      ]),
      R('Kordofan', 'کردفان|कोर्डोफ़ान|কর্দোফান|کردفان', { ar: 'كردفان', tr: 'Kordofan', es: 'Kordofán', fr: 'Kordofan' }, [
        T('El Obeid', 13.1843, 30.2167, 'الابیض|अल-ओबेद|আল-ওবেইদ|الابیض', { ar: 'الأبيض' }),
      ]),
      R('Darfur', 'دارفور|दारफ़ूर|দারফুর|دارفور', { ar: 'دارفور', tr: 'Darfur', es: 'Darfur', fr: 'Darfour' }, [
        T('Nyala', 12.0500, 24.8833, 'نیالا|न्याला|নিয়ালা|نیالا', { ar: 'نيالا' }),
        T('El Fasher', 13.6280, 25.3494, 'الفاشر|अल फ़ाशर|আল ফাশির|الفاشر', { ar: 'الفاشر' }),
      ]),
    ],
  },
  {
    slug: 'mauritania', cc: 'MR', continent: 'africa', name: { en: 'Mauritania' }, langs: ['ar'],
    tz: 'Africa/Nouakchott', method: 'MuslimWorldLeague', defaultSect: 'maliki',
    regions: [
      R('Nouakchott', 'نواکشوط|नुआकशॉट|নুয়াকশট|نواکشوت', { ar: 'نواكشوط', tr: 'Nuakşot', es: 'Nuakchot', fr: 'Nouakchott' }, [
        T('Nouakchott', 18.0735, -15.9582, 'نواکشوط|नुआकशॉट|নুয়াকশট|نواکشوت', { ar: 'نواكشوط', tr: 'Nuakşot', es: 'Nuakchot' }),
      ]),
      R('Northern Mauritania', 'شمالی موریطانیہ|उत्तरी मॉरिटानिया|উত্তর মৌরিতানিয়া|موریتانی شمالی', { ar: 'شمال موريتانيا', tr: 'Kuzey Moritanya', es: 'Mauritania septentrional', fr: 'Nord mauritanien' }, [
        T('Nouadhibou', 20.9310, -17.0347, 'نواذیبو|नुआधिबू|নুয়াধিবু|نواذیبو', { ar: 'نواذيبو', es: 'Nuadibú' }),
        T('Atar', 20.5169, -13.0499, 'اطار|अतार|আতার|آتار', { ar: 'أطار' }),
        T('Zouérat', 22.7354, -12.4715, 'زویرات|ज़ुएरात|জুয়েরাত|زویرات', { ar: 'الزويرات' }),
      ]),
      R('Southern Mauritania', 'جنوبی موریطانیہ|दक्षिणी मॉरिटानिया|দক্ষিণ মৌরিতানিয়া|موریتانی جنوبی', { ar: 'جنوب موريتانيا', tr: 'Güney Moritanya', es: 'Mauritania meridional', fr: 'Sud mauritanien' }, [
        T('Rosso', 16.5138, -15.8050, 'روسو|रोसो|রোসো|روسو', { ar: 'روصو' }),
        T('Kaédi', 16.1500, -13.5000, 'کائدی|काएदी|কায়েদি|کائدی', { ar: 'كيهيدي' }),
        T('Kiffa', 16.6200, -11.4000, 'کیفہ|किफ़ा|কিফা|کیفه', { ar: 'كيفة' }),
      ]),
    ],
  },
];
