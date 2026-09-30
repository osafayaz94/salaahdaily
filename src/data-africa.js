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
  // West Africa (2026-10-01): no official timetable data found; MWL + Maliki, the region's school.
  {
    slug: 'senegal', cc: 'SN', continent: 'africa', name: { en: 'Senegal' }, langs: ['fr'],
    tz: 'Africa/Dakar', method: 'MuslimWorldLeague', defaultSect: 'maliki',
    regions: [
      R('Dakar', 'ڈاکار|डकार|ডাকার|داکار', { ar: 'داكار', tr: 'Dakar', es: 'Dakar', fr: 'Dakar' }, [
        T('Dakar', 14.7167, -17.4677, 'ڈاکار|डकार|ডাকার|داکار', { ar: 'داكار' }),
      ]),
      R('Central Senegal', 'وسطی سینیگال|मध्य सेनेगल|মধ্য সেনেগাল|سنگال مرکزی', { ar: 'وسط السنغال', tr: 'Orta Senegal', es: 'Senegal central', fr: 'Centre du Sénégal' }, [
        T('Touba', 14.8500, -15.8833, 'طوبیٰ|तूबा|তুবা|طوبی', { ar: 'طوبى' }),
        T('Thiès', 14.7910, -16.9359, 'تیاس|तिएस|থিয়েস|تیس', { ar: 'تياس', fr: 'Thiès' }),
        T('Kaolack', 14.1520, -16.0726, 'کاولاک|काओलाक|কাওলাক|کائولاک', { ar: 'كاولاك' }),
      ]),
      R('Northern and Southern Senegal', 'شمالی و جنوبی سینیگال|उत्तरी और दक्षिणी सेनेगल|উত্তর ও দক্ষিণ সেনেগাল|سنگال شمالی و جنوبی', { ar: 'شمال وجنوب السنغال', tr: 'Kuzey ve Güney Senegal', es: 'Norte y sur de Senegal', fr: 'Nord et Sud du Sénégal' }, [
        T('Saint-Louis', 16.0179, -16.4896, 'سینٹ لوئس|सेंट-लुई|সেন্ট-লুই|سن‌لویی', { ar: 'سان لويس', fr: 'Saint-Louis' }),
        T('Ziguinchor', 12.5681, -16.2719, 'زیگنشور|ज़िगिंचोर|জিগিনশোর|زیگنشور', { ar: 'زيغينشور' }),
      ]),
    ],
  },
  {
    slug: 'mali', cc: 'ML', continent: 'africa', name: { en: 'Mali' }, langs: ['fr'],
    tz: 'Africa/Bamako', method: 'MuslimWorldLeague', defaultSect: 'maliki',
    regions: [
      R('Bamako', 'بماکو|बमाको|বামাকো|باماکو', { ar: 'باماكو', tr: 'Bamako', es: 'Bamako', fr: 'Bamako' }, [
        T('Bamako', 12.6392, -8.0029, 'بماکو|बमाको|বামাকো|باماکو', { ar: 'باماكو' }),
      ]),
      R('Southern Mali', 'جنوبی مالی|दक्षिणी माली|দক্ষিণ মালি|مالی جنوبی', { ar: 'جنوب مالي', tr: 'Güney Mali', es: 'Malí meridional', fr: 'Sud du Mali' }, [
        T('Ségou', 13.4317, -6.2157, 'سیگو|सेगू|সেগু|سگو', { ar: 'سيغو', fr: 'Ségou' }),
        T('Kayes', 14.4469, -11.4450, 'کائیس|काये|কায়েস|کایس', { ar: 'كاي' }),
        T('Mopti', 14.4843, -4.1830, 'موپتی|मोप्ती|মোপ্তি|موپتی', { ar: 'موبتي' }),
      ]),
      R('Northern Mali', 'شمالی مالی|उत्तरी माली|উত্তর মালি|مالی شمالی', { ar: 'شمال مالي', tr: 'Kuzey Mali', es: 'Malí septentrional', fr: 'Nord du Mali' }, [
        T('Timbuktu', 16.7666, -3.0026, 'ٹمبکٹو|टिम्बकटू|টিম্বাকটু|تیمبوکتو', { ar: 'تمبكتو', tr: 'Timbuktu', es: 'Tombuctú', fr: 'Tombouctou' }),
        T('Gao', 16.2717, -0.0447, 'گاؤ|गाओ|গাও|گائو', { ar: 'غاو' }),
      ]),
    ],
  },
  {
    slug: 'niger', cc: 'NE', continent: 'africa', name: { en: 'Niger' }, langs: ['fr', 'ha'],
    tz: 'Africa/Niamey', method: 'MuslimWorldLeague', defaultSect: 'maliki',
    regions: [
      R('Niamey', 'نیامے|नियामे|নিয়ামে|نیامی', { ar: 'نيامي', tr: 'Niamey', es: 'Niamey', fr: 'Niamey', ha: 'Yamai' }, [
        T('Niamey', 13.5116, 2.1254, 'نیامے|नियामे|নিয়ামে|نیامی', { ar: 'نيامي', ha: 'Yamai' }),
      ]),
      R('Southern Niger', 'جنوبی نائجر|दक्षिणी नाइजर|দক্ষিণ নাইজার|نیجر جنوبی', { ar: 'جنوب النيجر', tr: 'Güney Nijer', es: 'Níger meridional', fr: 'Sud du Niger', ha: 'Kudancin Nijar' }, [
        T('Zinder', 13.8069, 8.9881, 'زِندر|ज़िंदर|জিন্ডার|زیندر', { ar: 'زيندر', ha: 'Damagaram' }),
        T('Maradi', 13.5000, 7.1017, 'مارادی|मरादी|মারাদি|مارادی', { ar: 'مارادي', ha: 'Maraɗi' }),
        T('Tahoua', 14.8888, 5.2692, 'تاہوا|ताहुआ|তাহুয়া|تاهوا', { ar: 'تاوا', ha: 'Tawa' }),
      ]),
      R('Agadez', 'آگادیز|अगादेज़|আগাদেজ|آگادز', { ar: 'أغاديز', tr: 'Agadez', es: 'Agadez', fr: 'Agadez', ha: 'Agadas' }, [
        T('Agadez', 16.9733, 7.9911, 'آگادیز|अगादेज़|আগাদেজ|آگادز', { ar: 'أغاديز', ha: 'Agadas' }),
      ]),
    ],
  },
  {
    slug: 'burkina-faso', cc: 'BF', continent: 'africa', name: { en: 'Burkina Faso' }, langs: ['fr'],
    tz: 'Africa/Ouagadougou', method: 'MuslimWorldLeague', defaultSect: 'maliki',
    regions: [
      R('Centre', 'وسط|केंद्र|কেন্দ্র|مرکز', { ar: 'الوسط', tr: 'Merkez', es: 'Centro', fr: 'Centre' }, [
        T('Ouagadougou', 12.3714, -1.5197, 'واگادوگو|वागादुगू|ওয়াগাডুগু|واگادوگو', { ar: 'واغادوغو', tr: 'Vagadugu', es: 'Uagadugú' }),
      ]),
      R('Western and Northern Burkina Faso', 'مغربی و شمالی برکینا فاسو|पश्चिमी और उत्तरी बुर्किना फ़ासो|পশ্চিম ও উত্তর বুর্কিনা ফাসো|بورکینافاسو غربی و شمالی', { ar: 'غرب وشمال بوركينا فاسو', tr: 'Batı ve Kuzey Burkina Faso', es: 'Oeste y norte de Burkina Faso', fr: 'Ouest et Nord du Burkina Faso' }, [
        T('Bobo-Dioulasso', 11.1771, -4.2979, 'بوبو دیولاسو|बोबो-डिउलासो|বোবো-দিউলাসো|بوبو-دیولاسو', { ar: 'بوبو ديولاسو' }),
        T('Dori', 14.0354, -0.0345, 'دوری|डोरी|দোরি|دوری', { ar: 'دوري' }),
      ]),
    ],
  },
  {
    slug: 'guinea', cc: 'GN', continent: 'africa', name: { en: 'Guinea' }, langs: ['fr'],
    tz: 'Africa/Conakry', method: 'MuslimWorldLeague', defaultSect: 'maliki',
    regions: [
      R('Conakry', 'کوناکری|कोनाक्री|কোনাক্রি|کوناکری', { ar: 'كوناكري', tr: 'Konakri', es: 'Conakri', fr: 'Conakry' }, [
        T('Conakry', 9.6412, -13.5784, 'کوناکری|कोनाक्री|কোনাক্রি|کوناکری', { ar: 'كوناكري', tr: 'Konakri', es: 'Conakri' }),
      ]),
      R('Upper and Middle Guinea', 'بالائی و وسطی گنی|ऊपरी और मध्य गिनी|উচ্চ ও মধ্য গিনি|گینه علیا و میانه', { ar: 'غينيا العليا والوسطى', tr: 'Yukarı ve Orta Gine', es: 'Alta y Media Guinea', fr: 'Haute et Moyenne-Guinée' }, [
        T('Kankan', 10.3854, -9.3057, 'کنکن|कनकन|কানকান|کانکان', { ar: 'كانكان' }),
        T('Labé', 11.3182, -12.2833, 'لابے|लाबे|লাবে|لابه', { ar: 'لابي', fr: 'Labé' }),
        T('Kindia', 10.0569, -12.8658, 'کندیا|किंडिया|কিন্দিয়া|کیندیا', { ar: 'كينديا' }),
      ]),
    ],
  },
  {
    slug: 'gambia', cc: 'GM', continent: 'africa', name: { en: 'Gambia' }, langs: ['en'],
    tz: 'Africa/Banjul', method: 'MuslimWorldLeague', defaultSect: 'maliki',
    regions: [
      R('Greater Banjul', 'عظیم تر بانجول|बृहत बंजुल|বৃহত্তর বানজুল|بانجول بزرگ', { ar: 'بانجول الكبرى', tr: 'Büyük Banjul', es: 'Gran Banjul', fr: 'Grand Banjul' }, [
        T('Banjul', 13.4549, -16.5790, 'بانجول|बंजुल|বানজুল|بانجول', { ar: 'بانجول' }),
        T('Serekunda', 13.4381, -16.6781, 'سیریکنڈا|सेरेकुंडा|সেরেকুন্ডা|سرکوندا', { ar: 'سيريكوندا' }),
        T('Brikama', 13.2715, -16.6489, 'بریکاما|ब्रिकामा|ব্রিকামা|بریکاما', { ar: 'بريكاما' }),
      ]),
    ],
  },
  {
    slug: 'sierra-leone', cc: 'SL', continent: 'africa', name: { en: 'Sierra Leone' }, langs: ['en'],
    tz: 'Africa/Freetown', method: 'MuslimWorldLeague', defaultSect: 'maliki',
    regions: [
      R('Western Area', 'مغربی علاقہ|पश्चिमी क्षेत्र|পশ্চিমাঞ্চল|منطقه غربی', { ar: 'المنطقة الغربية', tr: 'Batı Bölgesi', es: 'Área Occidental', fr: 'Zone Ouest' }, [
        T('Freetown', 8.4657, -13.2317, 'فری ٹاؤن|फ़्रीटाउन|ফ্রিটাউন|فری‌تاون', { ar: 'فريتاون' }),
      ]),
      R('Provinces', 'صوبے|प्रांत|প্রদেশসমূহ|استان‌ها', { ar: 'الأقاليم', tr: 'Eyaletler', es: 'Provincias', fr: 'Provinces' }, [
        T('Bo', 7.9647, -11.7383, 'بو|बो|বো|بو', { ar: 'بو' }),
        T('Kenema', 7.8767, -11.1875, 'کینیما|केनेमा|কেনেমা|کنما', { ar: 'كينيما' }),
        T('Makeni', 8.8833, -12.0500, 'ماکینی|माकेनी|মাকেনি|ماکنی', { ar: 'ماكيني' }),
      ]),
    ],
  },
  {
    slug: 'liberia', cc: 'LR', continent: 'africa', name: { en: 'Liberia' }, langs: ['en'],
    tz: 'Africa/Monrovia', method: 'MuslimWorldLeague', defaultSect: 'maliki',
    regions: [
      R('Montserrado', 'مونٹسیراڈو|मोंटसेराडो|মন্টসেরাডো|مونتسرادو', { ar: 'مونتسيرادو', tr: 'Montserrado', es: 'Montserrado', fr: 'Montserrado' }, [
        T('Monrovia', 6.3156, -10.8074, 'منروویا|मोनरोविया|মনরোভিয়া|مونروویا', { ar: 'مونروفيا' }),
      ]),
    ],
  },
  {
    slug: 'ivory-coast', cc: 'CI', continent: 'africa', name: { en: 'Ivory Coast' }, langs: ['fr'],
    tz: 'Africa/Abidjan', method: 'MuslimWorldLeague', defaultSect: 'maliki',
    regions: [
      R('Abidjan', 'ابیجان|आबिदजान|আবিজান|آبیجان', { ar: 'أبيدجان', tr: 'Abidjan', es: 'Abiyán', fr: 'Abidjan' }, [
        T('Abidjan', 5.3600, -4.0083, 'ابیجان|आबिदजान|আবিজান|آبیجان', { ar: 'أبيدجان', es: 'Abiyán' }),
      ]),
      R('Central Ivory Coast', 'وسطی آئیوری کوسٹ|मध्य आइवरी कोस्ट|মধ্য আইভরি কোস্ট|ساحل عاج مرکزی', { ar: 'وسط ساحل العاج', tr: 'Orta Fildişi Sahili', es: 'Costa de Marfil central', fr: 'Centre de la Côte d’Ivoire' }, [
        T('Yamoussoukro', 6.8276, -5.2893, 'یاموسوکرو|यामूसूक्रो|ইয়ামুসুক্রো|یاموسوکرو', { ar: 'ياموسوكرو' }),
        T('Bouaké', 7.6906, -5.0391, 'بواکے|बुआके|বুয়াকে|بواکه', { ar: 'بواكيه', fr: 'Bouaké' }),
      ]),
      R('Northern Ivory Coast', 'شمالی آئیوری کوسٹ|उत्तरी आइवरी कोस्ट|উত্তর আইভরি কোস্ট|ساحل عاج شمالی', { ar: 'شمال ساحل العاج', tr: 'Kuzey Fildişi Sahili', es: 'Norte de Costa de Marfil', fr: 'Nord de la Côte d’Ivoire' }, [
        T('Korhogo', 9.4580, -5.6296, 'کورہوگو|कोरहोगो|কোরহোগো|کورهوگو', { ar: 'كورهوغو' }),
      ]),
    ],
  },
  {
    slug: 'ghana', cc: 'GH', continent: 'africa', name: { en: 'Ghana' }, langs: ['en'],
    tz: 'Africa/Accra', method: 'MuslimWorldLeague', defaultSect: 'maliki',
    regions: [
      R('Greater Accra', 'عظیم تر اکرا|बृहत अक्रा|বৃহত্তর আক্রা|آکرای بزرگ', { ar: 'أكرا الكبرى', tr: 'Büyük Akra', es: 'Gran Acra', fr: 'Grand Accra' }, [
        T('Accra', 5.6037, -0.1870, 'اکرا|अक्रा|আক্রা|آکرا', { ar: 'أكرا', tr: 'Akra', es: 'Acra' }),
      ]),
      R('Ashanti', 'اشانتی|अशांति|আশান্তি|آشانتی', { ar: 'أشانتي', tr: 'Aşanti', es: 'Ashanti', fr: 'Ashanti' }, [
        T('Kumasi', 6.6885, -1.6244, 'کماسی|कुमासी|কুমাসি|کوماسی', { ar: 'كوماسي' }),
      ]),
      R('Northern Ghana', 'شمالی گھانا|उत्तरी घाना|উত্তর ঘানা|غنای شمالی', { ar: 'شمال غانا', tr: 'Kuzey Gana', es: 'Norte de Ghana', fr: 'Nord du Ghana' }, [
        T('Tamale', 9.4008, -0.8393, 'تمالے|तमाले|তামালে|تامله', { ar: 'تامالي' }),
        T('Wa', 10.0601, -2.5099, 'وا|वा|ওয়া|وا', { ar: 'وا' }),
      ]),
    ],
  },
  {
    slug: 'togo', cc: 'TG', continent: 'africa', name: { en: 'Togo' }, langs: ['fr'],
    tz: 'Africa/Lome', method: 'MuslimWorldLeague', defaultSect: 'maliki',
    regions: [
      R('Maritime', 'ساحلی علاقہ|तटीय क्षेत्र|উপকূলীয় অঞ্চল|منطقه ساحلی', { ar: 'المنطقة البحرية', tr: 'Kıyı Bölgesi', es: 'Marítima', fr: 'Maritime' }, [
        T('Lomé', 6.1375, 1.2123, 'لومے|लोमे|লোমে|لومه', { ar: 'لومي', fr: 'Lomé' }),
      ]),
      R('Centrale', 'وسطی علاقہ|मध्य क्षेत्र|মধ্যাঞ্চল|منطقه مرکزی', { ar: 'المنطقة الوسطى', tr: 'Orta Bölge', es: 'Central', fr: 'Centrale' }, [
        T('Sokodé', 8.9833, 1.1333, 'سوکودے|सोकोदे|সোকোদে|سوکوده', { ar: 'سوكودي', fr: 'Sokodé' }),
      ]),
    ],
  },
  {
    slug: 'benin', cc: 'BJ', continent: 'africa', name: { en: 'Benin' }, langs: ['fr'],
    tz: 'Africa/Porto-Novo', method: 'MuslimWorldLeague', defaultSect: 'maliki',
    regions: [
      R('Southern Benin', 'جنوبی بینن|दक्षिणी बेनिन|দক্ষিণ বেনিন|بنین جنوبی', { ar: 'جنوب بنين', tr: 'Güney Benin', es: 'Benín meridional', fr: 'Sud du Bénin' }, [
        T('Cotonou', 6.3703, 2.3912, 'کوٹونو|कोटोनू|কোতোনু|کوتونو', { ar: 'كوتونو' }),
        T('Porto-Novo', 6.4969, 2.6289, 'پورٹو نووو|पोर्टो-नोवो|পোর্তো-নোভো|پورتو-نوو', { ar: 'بورتو نوفو' }),
      ]),
      R('Northern Benin', 'شمالی بینن|उत्तरी बेनिन|উত্তর বেনিন|بنین شمالی', { ar: 'شمال بنين', tr: 'Kuzey Benin', es: 'Benín septentrional', fr: 'Nord du Bénin' }, [
        T('Parakou', 9.3372, 2.6303, 'پاراکو|पाराकू|পারাকু|پاراکو', { ar: 'باراكو' }),
        T('Djougou', 9.7085, 1.6660, 'جوگو|जूगू|জুগু|جوگو', { ar: 'جوغو' }),
      ]),
    ],
  },
  {
    slug: 'guinea-bissau', cc: 'GW', continent: 'africa', name: { en: 'Guinea-Bissau' }, langs: ['pt'],
    tz: 'Africa/Bissau', method: 'MuslimWorldLeague', defaultSect: 'maliki',
    regions: [
      R('Bissau', 'بساؤ|बिसाऊ|বিসাউ|بیسائو', { ar: 'بيساو', tr: 'Bissau', es: 'Bisáu', fr: 'Bissau' }, [
        T('Bissau', 11.8817, -15.6178, 'بساؤ|बिसाऊ|বিসাউ|بیسائو', { ar: 'بيساو', es: 'Bisáu' }),
      ]),
      R('Gabú', 'گابو|गाबू|গাবু|گابو', { ar: 'غابو', tr: 'Gabú', es: 'Gabú', fr: 'Gabú' }, [
        T('Gabú', 12.2833, -14.2167, 'گابو|गाबू|গাবু|گابو', { ar: 'غابو' }),
      ]),
    ],
  },
  {
    slug: 'cape-verde', cc: 'CV', continent: 'africa', name: { en: 'Cape Verde' }, langs: ['pt'],
    tz: 'Atlantic/Cape_Verde', method: 'MuslimWorldLeague', defaultSect: 'maliki',
    regions: [
      R('Santiago', 'سانتیاگو|सैंटियागो|সান্তিয়াগো|سانتیاگو', { ar: 'سانتياغو', tr: 'Santiago', es: 'Santiago', fr: 'Santiago' }, [
        T('Praia', 14.9330, -23.5133, 'پرایا|प्राया|প্রাইয়া|پرایا', { ar: 'برايا' }),
      ]),
    ],
  },
  // East, Central and Southern Africa (2026-10-01): no official timetable data found; MWL. Shafi'i on the Horn
  // and the Swahili coast; Maliki in Central Africa; Hanafi where South Asian communities are the majority
  // (Mauritius, Zambia, Zimbabwe, Botswana...); South Africa Hanafi except the Western Cape (Cape Malay, Shafi'i).
  {
    slug: 'somalia', cc: 'SO', continent: 'africa', name: { en: 'Somalia' }, langs: ['ar'],
    tz: 'Africa/Mogadishu', method: 'MuslimWorldLeague', defaultSect: 'shafii',
    regions: [
      R('Banaadir', 'بنادر|बनादिर|বানাদির|بنادر', { ar: 'بنادر', tr: 'Benadir', es: 'Banaadir', fr: 'Banaadir' }, [
        T('Mogadishu', 2.0469, 45.3182, 'موغادیشو|मोगादिशु|মোগাদিশু|موگادیشو', { ar: 'مقديشو', tr: 'Mogadişu', es: 'Mogadiscio', fr: 'Mogadiscio' }),
      ]),
      R('Northern Somalia', 'شمالی صومالیہ|उत्तरी सोमालिया|উত্তর সোমালিয়া|سومالی شمالی', { ar: 'شمال الصومال', tr: 'Kuzey Somali', es: 'Somalia septentrional', fr: 'Nord de la Somalie' }, [
        T('Hargeisa', 9.5600, 44.0650, 'ہرگیسا|हरगेसा|হারগেইসা|هرگیسا', { ar: 'هرجيسا', tr: 'Hargeysa' }),
        T('Bosaso', 11.2842, 49.1816, 'بوصاصو|बोसासो|বোসাসো|بوصاصو', { ar: 'بوصاصو' }),
      ]),
      R('Southern Somalia', 'جنوبی صومالیہ|दक्षिणी सोमालिया|দক্ষিণ সোমালিয়া|سومالی جنوبی', { ar: 'جنوب الصومال', tr: 'Güney Somali', es: 'Somalia meridional', fr: 'Sud de la Somalie' }, [
        T('Kismayo', -0.3582, 42.5454, 'کسمایو|किस्मायो|কিসমায়ো|کیسمایو', { ar: 'كيسمايو' }),
        T('Baidoa', 3.1136, 43.6498, 'بیدوا|बैदोआ|বাইদোয়া|بیدوا', { ar: 'بيدوا' }),
      ]),
    ],
  },
  {
    slug: 'djibouti', cc: 'DJ', continent: 'africa', name: { en: 'Djibouti' }, langs: ['fr'],
    tz: 'Africa/Djibouti', method: 'MuslimWorldLeague', defaultSect: 'shafii',
    regions: [
      R('Djibouti', 'جبوتی|जिबूती|জিবুতি|جیبوتی', { ar: 'جيبوتي', tr: 'Cibuti', es: 'Yibuti', fr: 'Djibouti' }, [
        T('Djibouti City', 11.5721, 43.1456, 'جبوتی شہر|जिबूती शहर|জিবুতি শহর|شهر جیبوتی', { ps: 'د جیبوتي ښار', prs: 'شهر جیبوتی', ar: 'مدينة جيبوتي', tr: 'Cibuti şehri', es: 'Ciudad de Yibuti', fr: 'Djibouti-ville' }),
      ]),
    ],
  },
  {
    slug: 'eritrea', cc: 'ER', continent: 'africa', name: { en: 'Eritrea' }, langs: ['en'],
    tz: 'Africa/Asmara', method: 'MuslimWorldLeague', defaultSect: 'shafii',
    regions: [
      R('Central and Northern Red Sea', 'وسطی اور شمالی بحیرہ احمر|मध्य और उत्तरी लाल सागर|মধ্য ও উত্তর লোহিত সাগর|مرکزی و دریای سرخ شمالی', { ar: 'المركزية والبحر الأحمر الشمالي', tr: 'Merkez ve Kuzey Kızıldeniz', es: 'Central y Mar Rojo Septentrional', fr: 'Centre et Mer Rouge septentrionale' }, [
        T('Asmara', 15.3229, 38.9251, 'اسمارا|अस्मारा|আসমারা|اسمره', { ar: 'أسمرة', tr: 'Asmara' }),
        T('Massawa', 15.6079, 39.4500, 'مصوع|मसावा|মাসাওয়া|مصوع', { ar: 'مصوع', tr: 'Massava' }),
        T('Keren', 15.7778, 38.4511, 'کرن|केरेन|কেরেন|کرن', { ar: 'كرن' }),
      ]),
    ],
  },
  {
    slug: 'ethiopia', cc: 'ET', continent: 'africa', name: { en: 'Ethiopia' }, langs: ['en'],
    tz: 'Africa/Addis_Ababa', method: 'MuslimWorldLeague', defaultSect: 'shafii',
    regions: [
      R('Addis Ababa', 'ادیس ابابا|अदीस अबाबा|আদ্দিস আবাবা|آدیس‌آبابا', { ar: 'أديس أبابا', tr: 'Addis Ababa', es: 'Adís Abeba', fr: 'Addis-Abeba' }, [
        T('Addis Ababa', 9.0300, 38.7400, 'ادیس ابابا|अदीस अबाबा|আদ্দিস আবাবা|آدیس‌آبابا', { ar: 'أديس أبابا', es: 'Adís Abeba', fr: 'Addis-Abeba' }),
      ]),
      R('Eastern Ethiopia', 'مشرقی ایتھوپیا|पूर्वी इथियोपिया|পূর্ব ইথিওপিয়া|اتیوپی شرقی', { ar: 'شرق إثيوبيا', tr: 'Doğu Etiyopya', es: 'Etiopía oriental', fr: 'Est de l’Éthiopie' }, [
        T('Harar', 9.3126, 42.1227, 'ہرر|हरार|হারার|هرر', { ar: 'هرر', tr: 'Harar' }),
        T('Dire Dawa', 9.6009, 41.8501, 'دیرے داوا|दिरे दावा|দিরে দাওয়া|دیره‌داوا', { ar: 'دير داوا' }),
      ]),
      R('Oromia and Amhara', 'اوروومیا اور امہرا|ओरोमिया और अमहारा|ওরোমিয়া ও আমহারা|اورومیا و امهره', { ar: 'أوروميا وأمهرة', tr: 'Oromiya ve Amhara', es: 'Oromía y Amhara', fr: 'Oromia et Amhara' }, [
        T('Jimma', 7.6734, 36.8344, 'جیما|जिम्मा|জিম্মা|جیما', { ar: 'جيما' }),
        T('Dessie', 11.1333, 39.6333, 'دیسی|देसी|দেসি|دسی', { ar: 'ديسي' }),
      ]),
    ],
  },
  {
    slug: 'kenya', cc: 'KE', continent: 'africa', name: { en: 'Kenya' }, langs: ['en'],
    tz: 'Africa/Nairobi', method: 'MuslimWorldLeague', defaultSect: 'shafii',
    regions: [
      R('Nairobi', 'نیروبی|नैरोबी|নাইরোবি|نایروبی', { ar: 'نيروبي', tr: 'Nairobi', es: 'Nairobi', fr: 'Nairobi' }, [
        T('Nairobi', -1.2921, 36.8219, 'نیروبی|नैरोबी|নাইরোবি|نایروبی', { ar: 'نيروبي' }),
      ]),
      R('Coast', 'ساحلی علاقہ|तटीय क्षेत्र|উপকূল|ساحل', { ar: 'الساحل', tr: 'Kıyı', es: 'Costa', fr: 'Côte' }, [
        T('Mombasa', -4.0435, 39.6682, 'ممباسا|मोम्बासा|মোম্বাসা|مومباسا', { ar: 'مومباسا', tr: 'Mombasa' }),
        T('Malindi', -3.2175, 40.1191, 'مالندی|मालिंदी|মালিন্দি|مالیندی', { ar: 'ماليندي' }),
        T('Lamu', -2.2717, 40.9020, 'لامو|लामू|লামু|لامو', { ar: 'لامو' }),
      ]),
      R('North Eastern and Western Kenya', 'شمال مشرقی و مغربی کینیا|उत्तर-पूर्वी और पश्चिमी केन्या|উত্তর-পূর্ব ও পশ্চিম কেনিয়া|کنیای شمال شرقی و غربی', { ar: 'شمال شرق وغرب كينيا', tr: 'Kuzeydoğu ve Batı Kenya', es: 'Noreste y oeste de Kenia', fr: 'Nord-Est et Ouest du Kenya' }, [
        T('Garissa', -0.4532, 39.6461, 'گاریسا|गरीसा|গারিসা|گاریسا', { ar: 'غاريسا' }),
        T('Kisumu', -0.0917, 34.7680, 'کسومو|किसुमू|কিসুমু|کیسومو', { ar: 'كيسومو' }),
      ]),
    ],
  },
  {
    slug: 'tanzania', cc: 'TZ', continent: 'africa', name: { en: 'Tanzania' }, langs: ['en'],
    tz: 'Africa/Dar_es_Salaam', method: 'MuslimWorldLeague', defaultSect: 'shafii',
    regions: [
      R('Dar es Salaam', 'دار السلام|दार एस सलाम|দার এস সালাম|دارالسلام', { ar: 'دار السلام', tr: 'Darüsselam', es: 'Dar es-Salam', fr: 'Dar es Salam' }, [
        T('Dar es Salaam', -6.7924, 39.2083, 'دار السلام|दार एस सलाम|দার এস সালাম|دارالسلام', { ar: 'دار السلام', tr: 'Darüsselam', es: 'Dar es-Salam', fr: 'Dar es Salam' }),
      ]),
      R('Zanzibar', 'زنجبار|ज़ांज़ीबार|জাঞ্জিবার|زنگبار', { ar: 'زنجبار', tr: 'Zanzibar', es: 'Zanzíbar', fr: 'Zanzibar' }, [
        T('Zanzibar City', -6.1659, 39.2026, 'زنجبار شہر|ज़ांज़ीबार शहर|জাঞ্জিবার শহর|شهر زنگبار', { ar: 'مدينة زنجبار', tr: 'Zanzibar şehri', es: 'Ciudad de Zanzíbar', fr: 'Zanzibar-ville' }),
      ]),
      R('Mainland Tanzania', 'تنزانیہ کا بر اعظمی حصہ|मुख्य भूमि तंज़ानिया|তানজানিয়ার মূল ভূখণ্ড|سرزمین اصلی تانزانیا', { ar: 'البر الرئيسي لتنزانيا', tr: 'Anakara Tanzanya', es: 'Tanzania continental', fr: 'Tanzanie continentale' }, [
        T('Tanga', -5.0689, 39.0988, 'تانگا|तांगा|টাঙ্গা|تانگا', { ar: 'تانغا' }),
        T('Dodoma', -6.1630, 35.7516, 'ڈوڈوما|डोडोमा|ডোডোমা|دودوما', { ar: 'دودوما' }),
        T('Arusha', -3.3869, 36.6830, 'اروشا|अरूशा|আরুশা|آروشا', { ar: 'أروشا' }),
      ]),
    ],
  },
  {
    slug: 'uganda', cc: 'UG', continent: 'africa', name: { en: 'Uganda' }, langs: ['en'],
    tz: 'Africa/Kampala', method: 'MuslimWorldLeague', defaultSect: 'shafii',
    regions: [
      R('Central Region', 'وسطی علاقہ|मध्य क्षेत्र|মধ্যাঞ্চল|منطقه مرکزی', { ar: 'المنطقة الوسطى', tr: 'Orta Bölge', es: 'Región Central', fr: 'Région centrale' }, [
        T('Kampala', 0.3476, 32.5825, 'کمپالا|कंपाला|কাম্পালা|کامپالا', { ar: 'كمبالا' }),
      ]),
      R('Eastern Region', 'مشرقی علاقہ|पूर्वी क्षेत्र|পূর্বাঞ্চল|منطقه شرقی', { ar: 'المنطقة الشرقية', tr: 'Doğu Bölgesi', es: 'Región Oriental', fr: 'Région orientale' }, [
        T('Jinja', 0.4244, 33.2042, 'جنجا|जिंजा|জিনজা|جینجا', { ar: 'جينجا' }),
        T('Mbale', 1.0806, 34.1753, 'مبالے|म्बाले|এমবালে|مباله', { ar: 'مبالي' }),
      ]),
    ],
  },
  {
    slug: 'rwanda', cc: 'RW', continent: 'africa', name: { en: 'Rwanda' }, langs: ['en'],
    tz: 'Africa/Kigali', method: 'MuslimWorldLeague', defaultSect: 'shafii',
    regions: [
      R('Kigali', 'کیگالی|किगाली|কিগালি|کیگالی', { ar: 'كيغالي', tr: 'Kigali', es: 'Kigali', fr: 'Kigali' }, [
        T('Kigali', -1.9441, 30.0619, 'کیگالی|किगाली|কিগালি|کیگالی', { ar: 'كيغالي' }),
      ]),
    ],
  },
  {
    slug: 'burundi', cc: 'BI', continent: 'africa', name: { en: 'Burundi' }, langs: ['fr'],
    tz: 'Africa/Bujumbura', method: 'MuslimWorldLeague', defaultSect: 'shafii',
    regions: [
      R('Burundi', 'برونڈی|बुरुंडी|বুরুন্ডি|بوروندی', { ar: 'بوروندي', tr: 'Burundi', es: 'Burundi', fr: 'Burundi' }, [
        T('Bujumbura', -3.3614, 29.3599, 'بوجمبورا|बुजुम्बुरा|বুজুম্বুরা|بوجومبورا', { ar: 'بوجمبورا' }),
        T('Gitega', -3.4271, 29.9246, 'گیٹیگا|गितेगा|গিতেগা|گیتگا', { ar: 'جيتيجا' }),
      ]),
    ],
  },
  {
    slug: 'south-sudan', cc: 'SS', continent: 'africa', name: { en: 'South Sudan' }, langs: ['en'],
    tz: 'Africa/Juba', method: 'MuslimWorldLeague', defaultSect: 'maliki',
    regions: [
      R('Central Equatoria', 'وسطی استوائیہ|मध्य इक्वेटोरिया|মধ্য ইকুয়েটোরিয়া|استوایی مرکزی', { ar: 'الاستوائية الوسطى', tr: 'Orta Ekvatorya', es: 'Ecuatoria Central', fr: 'Équatoria-Central' }, [
        T('Juba', 4.8594, 31.5713, 'جوبا|जूबा|জুবা|جوبا', { ar: 'جوبا' }),
      ]),
    ],
  },
  {
    slug: 'comoros', cc: 'KM', continent: 'africa', name: { en: 'Comoros' }, langs: ['fr'],
    tz: 'Indian/Comoro', method: 'MuslimWorldLeague', defaultSect: 'shafii',
    regions: [
      R('Grande Comore and Anjouan', 'گرانڈ کومور اور انجوان|ग्रांड कोमोर और अंजुआन|গ্রান্দ কোমোর ও আনজুয়ান|کومور بزرگ و آنژوان', { ar: 'القمر الكبرى وأنجوان', tr: 'Büyük Komor ve Anjuan', es: 'Gran Comora y Anjouan', fr: 'Grande Comore et Anjouan' }, [
        T('Moroni', -11.7172, 43.2473, 'مورونی|मोरोनी|মোরোনি|مورونی', { ar: 'موروني' }),
        T('Mutsamudu', -12.1675, 44.3994, 'متسامودو|मुत्सामुदु|মুৎসামুদু|موتسامودو', { ar: 'موتسامودو' }),
      ]),
    ],
  },
  {
    slug: 'seychelles', cc: 'SC', continent: 'africa', name: { en: 'Seychelles' }, langs: ['en'],
    tz: 'Indian/Mahe', method: 'MuslimWorldLeague', defaultSect: 'shafii',
    regions: [
      R('Mahé', 'ماہے|माहे|মাহে|ماهه', { ar: 'ماهي', tr: 'Mahé', es: 'Mahé', fr: 'Mahé' }, [
        T('Victoria', -4.6191, 55.4513, 'وکٹوریا|विक्टोरिया|ভিক্টোরিয়া|ویکتوریا', { ar: 'فيكتوريا' }),
      ]),
    ],
  },
  {
    slug: 'madagascar', cc: 'MG', continent: 'africa', name: { en: 'Madagascar' }, langs: ['fr'],
    tz: 'Indian/Antananarivo', method: 'MuslimWorldLeague', defaultSect: 'shafii',
    regions: [
      R('Analamanga', 'انالامانگا|अनालामांगा|আনালামাঙ্গা|آنالامانگا', { ar: 'أنالامانغا', tr: 'Analamanga', es: 'Analamanga', fr: 'Analamanga' }, [
        T('Antananarivo', -18.8792, 47.5079, 'انتاناناریوو|अंतानानारिवो|আন্তানানারিভো|آنتاناناریوو', { ar: 'أنتاناناريفو', tr: 'Antananarivo' }),
      ]),
      R('Coastal Madagascar', 'ساحلی مڈغاسکر|तटीय मेडागास्कर|উপকূলীয় মাদাগাস্কার|ماداگاسکار ساحلی', { ar: 'ساحل مدغشقر', tr: 'Kıyı Madagaskar', es: 'Madagascar costero', fr: 'Madagascar côtier' }, [
        T('Mahajanga', -15.7167, 46.3167, 'ماہاجانگا|महाजांगा|মাহাজাঙ্গা|ماهاجانگا', { ar: 'ماهاجانغا' }),
        T('Toamasina', -18.1492, 49.4023, 'توآماسینا|तोआमासिना|তোয়ামাসিনা|توآماسینا', { ar: 'تواماسينا' }),
      ]),
    ],
  },
  {
    slug: 'mauritius', cc: 'MU', continent: 'africa', name: { en: 'Mauritius' }, langs: ['en'],
    tz: 'Indian/Mauritius', method: 'MuslimWorldLeague', defaultSect: 'hanafi',
    regions: [
      R('Mauritius', 'ماریشس|मॉरीशस|মরিশাস|موریس', { ar: 'موريشيوس', tr: 'Mauritius', es: 'Mauricio', fr: 'Maurice' }, [
        T('Port Louis', -20.1609, 57.5012, 'پورٹ لوئس|पोर्ट लुई|পোর্ট লুই|پورت لوئیس', { ar: 'بورت لويس', fr: 'Port-Louis' }),
        T('Curepipe', -20.3162, 57.5166, 'کیورپائپ|क्यूरपाइप|কিউরপাইপ|کورپیپ', { ar: 'كوريبايب' }),
      ]),
    ],
  },
  {
    slug: 'chad', cc: 'TD', continent: 'africa', name: { en: 'Chad' }, langs: ['fr'],
    tz: 'Africa/Ndjamena', method: 'MuslimWorldLeague', defaultSect: 'maliki',
    regions: [
      R('N’Djamena', 'انجامینا|न्जामेना|এনজামেনা|انجامنا', { ar: 'نجامينا', tr: 'Encamina', es: 'Yamena', fr: 'N’Djamena' }, [
        T('N’Djamena', 12.1348, 15.0557, 'انجامینا|न्जामेना|এনজামেনা|انجامنا', { ar: 'نجامينا', tr: 'Encamina', es: 'Yamena' }),
      ]),
      R('Eastern and Southern Chad', 'مشرقی و جنوبی چاڈ|पूर्वी और दक्षिणी चाड|পূর্ব ও দক্ষিণ চাদ|چاد شرقی و جنوبی', { ar: 'شرق وجنوب تشاد', tr: 'Doğu ve Güney Çad', es: 'Este y sur de Chad', fr: 'Est et Sud du Tchad' }, [
        T('Abéché', 13.8292, 20.8324, 'ابیشے|अबेशे|আবেশে|ابشه', { ar: 'أبشة', fr: 'Abéché' }),
        T('Moundou', 8.5667, 16.0833, 'موندو|मूंडू|মুন্ডু|موندو', { ar: 'موندو' }),
      ]),
    ],
  },
  {
    slug: 'cameroon', cc: 'CM', continent: 'africa', name: { en: 'Cameroon' }, langs: ['fr'],
    tz: 'Africa/Douala', method: 'MuslimWorldLeague', defaultSect: 'maliki',
    regions: [
      R('Centre and Littoral', 'وسط اور ساحلی|केंद्र और तटीय|কেন্দ্র ও উপকূল|مرکز و ساحل', { ar: 'الوسط والساحل', tr: 'Merkez ve Kıyı', es: 'Centro y Litoral', fr: 'Centre et Littoral' }, [
        T('Yaoundé', 3.8480, 11.5021, 'یاؤنڈے|याउंडे|ইয়াউন্দে|یائونده', { ar: 'ياوندي', tr: 'Yaunde', es: 'Yaundé', fr: 'Yaoundé' }),
        T('Douala', 4.0511, 9.7679, 'دوالا|डुआला|দুয়ালা|دوآلا', { ar: 'دوالا' }),
      ]),
      R('Northern Cameroon', 'شمالی کیمرون|उत्तरी कैमरून|উত্তর ক্যামেরুন|کامرون شمالی', { ar: 'شمال الكاميرون', tr: 'Kuzey Kamerun', es: 'Norte de Camerún', fr: 'Nord du Cameroun' }, [
        T('Maroua', 10.5956, 14.3247, 'مارووا|मारुआ|মারুয়া|ماروآ', { ar: 'ماروا' }),
        T('Garoua', 9.3017, 13.3921, 'گاروا|गारुआ|গারুয়া|گاروآ', { ar: 'غاروا' }),
        T('Ngaoundéré', 7.3167, 13.5833, 'نگاؤنڈیرے|न्गाउंडेरे|এনগাউন্দেরে|انگائوندره', { ar: 'نغاونديري', fr: 'Ngaoundéré' }),
      ]),
    ],
  },
  {
    slug: 'central-african-republic', cc: 'CF', continent: 'africa', name: { en: 'Central African Republic' }, langs: ['fr'],
    tz: 'Africa/Bangui', method: 'MuslimWorldLeague', defaultSect: 'maliki',
    regions: [
      R('Bangui', 'بانگی|बांगी|বাঙ্গুই|بانگی', { ar: 'بانغي', tr: 'Bangui', es: 'Bangui', fr: 'Bangui' }, [
        T('Bangui', 4.3947, 18.5582, 'بانگی|बांगी|বাঙ্গুই|بانگی', { ar: 'بانغي' }),
      ]),
    ],
  },
  {
    slug: 'gabon', cc: 'GA', continent: 'africa', name: { en: 'Gabon' }, langs: ['fr'],
    tz: 'Africa/Libreville', method: 'MuslimWorldLeague', defaultSect: 'maliki',
    regions: [
      R('Estuaire', 'ایسٹوائر|एस्तुएर|এস্তুয়ের|استوئر', { ar: 'المصب', tr: 'Estuaire', es: 'Estuario', fr: 'Estuaire' }, [
        T('Libreville', 0.4162, 9.4673, 'لیبرویل|लिब्रेविल|লিব্রেভিল|لیبرویل', { ar: 'ليبرفيل' }),
      ]),
    ],
  },
  {
    slug: 'congo', cc: 'CG', continent: 'africa', name: { en: 'Congo' }, langs: ['fr'],
    tz: 'Africa/Brazzaville', method: 'MuslimWorldLeague', defaultSect: 'maliki',
    regions: [
      R('Congo', 'کانگو|कांगो|কঙ্গো|کنگو', { ar: 'الكونغو', tr: 'Kongo', es: 'Congo', fr: 'Congo' }, [
        T('Brazzaville', -4.2634, 15.2429, 'برازاویل|ब्राज़्ज़ाविल|ব্রাজাভিল|برازاویل', { ar: 'برازافيل' }),
        T('Pointe-Noire', -4.7692, 11.8664, 'پوانت نوار|पॉइंट-नुआर|পয়েন্ট-নোয়ার|پوانت-نوار', { ar: 'بوانت نوار' }),
      ]),
    ],
  },
  {
    slug: 'dr-congo', cc: 'CD', continent: 'africa', name: { en: 'DR Congo' }, langs: ['fr'],
    tz: 'Africa/Kinshasa', method: 'MuslimWorldLeague', defaultSect: 'maliki',
    regions: [
      R('Kinshasa', 'کنشاسا|किंशासा|কিনশাসা|کینشاسا', { ar: 'كينشاسا', tr: 'Kinşasa', es: 'Kinsasa', fr: 'Kinshasa' }, [
        T('Kinshasa', -4.4419, 15.2663, 'کنشاسا|किंशासा|কিনশাসা|کینشاسا', { ar: 'كينشاسا', tr: 'Kinşasa', es: 'Kinsasa' }),
      ]),
      R('Eastern DR Congo', 'مشرقی جمہوری کانگو|पूर्वी डीआर कांगो|পূর্ব ডিআর কঙ্গো|شرق کنگو دموکراتیک', { ar: 'شرق الكونغو الديمقراطية', tr: 'Doğu Demokratik Kongo', es: 'Este de la RD del Congo', fr: 'Est de la RD Congo' }, [
        T('Lubumbashi', -11.6647, 27.4794, 'لوبمباشی|लुबुम्बाशी|লুবুম্বাশি|لوبومباشی', { ar: 'لوبومباشي' }, 'Africa/Lubumbashi'),
        T('Kisangani', 0.5153, 25.1910, 'کسنگانی|किसानगानी|কিসাঙ্গানি|کیسانگانی', { ar: 'كيسنغاني' }, 'Africa/Lubumbashi'),
        T('Goma', -1.6792, 29.2228, 'گوما|गोमा|গোমা|گوما', { ar: 'غوما' }, 'Africa/Lubumbashi'),
      ]),
    ],
  },
  {
    slug: 'equatorial-guinea', cc: 'GQ', continent: 'africa', name: { en: 'Equatorial Guinea' }, langs: ['es'],
    tz: 'Africa/Malabo', method: 'MuslimWorldLeague', defaultSect: 'maliki',
    regions: [
      R('Bioko', 'بیوکو|बियोको|বিয়োকো|بیوکو', { ar: 'بيوكو', tr: 'Bioko', es: 'Bioko', fr: 'Bioko' }, [
        T('Malabo', 3.7504, 8.7371, 'مالابو|मालाबो|মালাবো|مالابو', { ar: 'مالابو' }),
      ]),
    ],
  },
  {
    slug: 'sao-tome-and-principe', cc: 'ST', continent: 'africa', name: { en: 'São Tomé and Príncipe' }, langs: ['pt'],
    tz: 'Africa/Sao_Tome', method: 'MuslimWorldLeague', defaultSect: 'maliki',
    regions: [
      R('São Tomé Island', 'ساؤ ٹومے جزیرہ|साओ टोमे द्वीप|সাও তোমে দ্বীপ|جزیره سائوتومه', { ar: 'جزيرة ساو تومي', tr: 'São Tomé Adası', es: 'Isla de Santo Tomé', fr: 'Île de São Tomé' }, [
        T('São Tomé', 0.3365, 6.7273, 'ساؤ ٹومے|साओ टोमे|সাও তোমে|سائوتومه', { ar: 'ساو تومي', es: 'Santo Tomé' }),
      ]),
    ],
  },
  {
    slug: 'south-africa', cc: 'ZA', continent: 'africa', name: { en: 'South Africa' }, langs: ['en'],
    tz: 'Africa/Johannesburg', method: 'MuslimWorldLeague', defaultSect: 'hanafi',
    regions: [
      R('Gauteng', 'گاؤٹینگ|गौतेंग|গাউটেং|گوتنگ', { ar: 'خاوتنغ', tr: 'Gauteng', es: 'Gauteng', fr: 'Gauteng' }, [
        T('Johannesburg', -26.2041, 28.0473, 'جوہانسبرگ|जोहान्सबर्ग|জোহানেসবার্গ|ژوهانسبورگ', { ar: 'جوهانسبرغ', tr: 'Johannesburg', es: 'Johannesburgo', fr: 'Johannesbourg' }),
        T('Pretoria', -25.7479, 28.2293, 'پریٹوریا|प्रिटोरिया|প্রিটোরিয়া|پرتوریا', { ar: 'بريتوريا' }),
      ]),
      R('KwaZulu-Natal', 'کوازولو ناتال|क्वाज़ुलु-नटाल|কোয়াজুলু-নাটাল|کوازولو-ناتال', { ar: 'كوازولو ناتال', tr: 'KwaZulu-Natal', es: 'KwaZulu-Natal', fr: 'KwaZulu-Natal' }, [
        T('Durban', -29.8587, 31.0218, 'ڈربن|डरबन|ডারবান|دوربان', { ar: 'ديربان' }),
        T('Pietermaritzburg', -29.6006, 30.3794, 'پیٹرماریٹزبرگ|पीटरमैरिट्ज़बर्ग|পিটারমারিৎজবার্গ|پیترماریتزبورگ', { ar: 'بيترماريتزبرغ' }),
      ]),
      Object.assign(R('Western Cape', 'مغربی کیپ|पश्चिमी केप|পশ্চিম কেপ|کیپ غربی', { ar: 'الكاب الغربية', tr: 'Batı Kap', es: 'Cabo Occidental', fr: 'Cap-Occidental' }, [
        T('Cape Town', -33.9249, 18.4241, 'کیپ ٹاؤن|केप टाउन|কেপ টাউন|کیپ‌تاون', { ar: 'كيب تاون', tr: 'Cape Town', es: 'Ciudad del Cabo', fr: 'Le Cap' }),
      ]), { defaultSect: 'shafii' }),
      R('Eastern Cape', 'مشرقی کیپ|पूर्वी केप|পূর্ব কেপ|کیپ شرقی', { ar: 'الكاب الشرقية', tr: 'Doğu Kap', es: 'Cabo Oriental', fr: 'Cap-Oriental' }, [
        T('Gqeberha', -33.9608, 25.6022, 'گقیبرہا|गकेबर्हा|গকেবেরহা|گکبرها', { ar: 'غكيبيرها', fr: 'Gqeberha' }),
      ]),
    ],
  },
  {
    slug: 'mozambique', cc: 'MZ', continent: 'africa', name: { en: 'Mozambique' }, langs: ['pt'],
    tz: 'Africa/Maputo', method: 'MuslimWorldLeague', defaultSect: 'shafii',
    regions: [
      R('Maputo', 'ماپوتو|मापुतो|মাপুতো|ماپوتو', { ar: 'مابوتو', tr: 'Maputo', es: 'Maputo', fr: 'Maputo' }, [
        T('Maputo', -25.9692, 32.5732, 'ماپوتو|मापुतो|মাপুতো|ماپوتو', { ar: 'مابوتو' }),
      ]),
      R('Northern Mozambique', 'شمالی موزمبیق|उत्तरी मोज़ाम्बिक|উত্তর মোজাম্বিক|موزامبیک شمالی', { ar: 'شمال موزمبيق', tr: 'Kuzey Mozambik', es: 'Norte de Mozambique', fr: 'Nord du Mozambique' }, [
        T('Nampula', -15.1165, 39.2666, 'نامپولا|नामपुला|নামপুলা|نامپولا', { ar: 'نامبولا' }),
        T('Pemba', -12.9740, 40.5178, 'پیمبا|पेम्बा|পেম্বা|پمبا', { ar: 'بيمبا' }),
        T('Island of Mozambique', -15.0342, 40.7358, 'جزیرہ موزمبیق|मोज़ाम्बिक द्वीप|মোজাম্বিক দ্বীপ|جزیره موزامبیک', { ar: 'جزيرة موزمبيق', tr: 'Mozambik Adası', es: 'Isla de Mozambique', fr: 'Île de Mozambique' }),
      ]),
    ],
  },
  {
    slug: 'malawi', cc: 'MW', continent: 'africa', name: { en: 'Malawi' }, langs: ['en'],
    tz: 'Africa/Blantyre', method: 'MuslimWorldLeague', defaultSect: 'shafii',
    regions: [
      R('Malawi', 'ملاوی|मलावी|মালাউই|مالاوی', { ar: 'ملاوي', tr: 'Malavi', es: 'Malaui', fr: 'Malawi' }, [
        T('Lilongwe', -13.9626, 33.7741, 'لیلونگوے|लिलोंग्वे|লিলংওয়ে|لیلونگوه', { ar: 'ليلونغوي' }),
        T('Blantyre', -15.7861, 35.0058, 'بلانٹائر|ब्लैंटायर|ব্লান্টায়ার|بلانتایر', { ar: 'بلانتاير' }),
        T('Zomba', -15.3833, 35.3333, 'زومبا|ज़ोम्बा|জোম্বা|زومبا', { ar: 'زومبا' }),
        T('Mangochi', -14.4782, 35.2645, 'مانگوچی|मंगोची|মাঙ্গোচি|مانگوچی', { ar: 'مانغوتشي' }),
      ]),
    ],
  },
  {
    slug: 'zambia', cc: 'ZM', continent: 'africa', name: { en: 'Zambia' }, langs: ['en'],
    tz: 'Africa/Lusaka', method: 'MuslimWorldLeague', defaultSect: 'hanafi',
    regions: [
      R('Zambia', 'زیمبیا|ज़ाम्बिया|জাম্বিয়া|زامبیا', { ar: 'زامبيا', tr: 'Zambiya', es: 'Zambia', fr: 'Zambie' }, [
        T('Lusaka', -15.3875, 28.3228, 'لوساکا|लुसाका|লুসাকা|لوساکا', { ar: 'لوساكا' }),
        T('Chipata', -13.6333, 32.6500, 'چیپاٹا|चिपाटा|চিপাতা|چیپاتا', { ar: 'تشيباتا' }),
      ]),
    ],
  },
  {
    slug: 'zimbabwe', cc: 'ZW', continent: 'africa', name: { en: 'Zimbabwe' }, langs: ['en'],
    tz: 'Africa/Harare', method: 'MuslimWorldLeague', defaultSect: 'hanafi',
    regions: [
      R('Zimbabwe', 'زمبابوے|ज़िम्बाब्वे|জিম্বাবুয়ে|زیمبابوه', { ar: 'زيمبابوي', tr: 'Zimbabve', es: 'Zimbabue', fr: 'Zimbabwe' }, [
        T('Harare', -17.8292, 31.0522, 'ہرارے|हरारे|হারারে|هراره', { ar: 'هراري' }),
        T('Bulawayo', -20.1325, 28.6265, 'بلاوایو|बुलावायो|বুলাওয়ায়ো|بولاوایو', { ar: 'بولاوايو' }),
      ]),
    ],
  },
  {
    slug: 'botswana', cc: 'BW', continent: 'africa', name: { en: 'Botswana' }, langs: ['en'],
    tz: 'Africa/Gaborone', method: 'MuslimWorldLeague', defaultSect: 'hanafi',
    regions: [
      R('South-East District', 'جنوب مشرقی ضلع|दक्षिण-पूर्व ज़िला|দক্ষিণ-পূর্ব জেলা|ناحیه جنوب شرقی', { ar: 'المنطقة الجنوبية الشرقية', tr: 'Güneydoğu Bölgesi', es: 'Distrito Sudeste', fr: 'District du Sud-Est' }, [
        T('Gaborone', -24.6282, 25.9231, 'گیبورون|गैबोरोन|গ্যাবোরোন|گابورونه', { ar: 'غابورون' }),
      ]),
    ],
  },
  {
    slug: 'namibia', cc: 'NA', continent: 'africa', name: { en: 'Namibia' }, langs: ['en'],
    tz: 'Africa/Windhoek', method: 'MuslimWorldLeague', defaultSect: 'hanafi',
    regions: [
      R('Khomas', 'خوماس|खोमास|খোমাস|خوماس', { ar: 'خوماس', tr: 'Khomas', es: 'Khomas', fr: 'Khomas' }, [
        T('Windhoek', -22.5609, 17.0658, 'ونڈہوک|विंडहोक|উইন্ডহোক|ویندهوک', { ar: 'ويندهوك' }),
      ]),
    ],
  },
  {
    slug: 'angola', cc: 'AO', continent: 'africa', name: { en: 'Angola' }, langs: ['pt'],
    tz: 'Africa/Luanda', method: 'MuslimWorldLeague', defaultSect: 'maliki',
    regions: [
      R('Luanda', 'لوانڈا|लुआंडा|লুয়ান্ডা|لوآندا', { ar: 'لواندا', tr: 'Luanda', es: 'Luanda', fr: 'Luanda' }, [
        T('Luanda', -8.8390, 13.2894, 'لوانڈا|लुआंडा|লুয়ান্ডা|لوآندا', { ar: 'لواندا' }),
      ]),
    ],
  },
  {
    slug: 'lesotho', cc: 'LS', continent: 'africa', name: { en: 'Lesotho' }, langs: ['en'],
    tz: 'Africa/Maseru', method: 'MuslimWorldLeague', defaultSect: 'hanafi',
    regions: [
      R('Maseru District', 'ماسیرو ضلع|मसेरू ज़िला|মাসেরু জেলা|ناحیه ماسرو', { ar: 'مقاطعة ماسيرو', tr: 'Maseru Bölgesi', es: 'Distrito de Maseru', fr: 'District de Maseru' }, [
        T('Maseru', -29.3151, 27.4869, 'ماسیرو|मसेरू|মাসেরু|ماسرو', { ar: 'ماسيرو' }),
      ]),
    ],
  },
  {
    slug: 'eswatini', cc: 'SZ', continent: 'africa', name: { en: 'Eswatini' }, langs: ['en'],
    tz: 'Africa/Mbabane', method: 'MuslimWorldLeague', defaultSect: 'hanafi',
    regions: [
      R('Eswatini', 'ایسواتینی|इस्वातिनी|এসোয়াতিনি|اسواتینی', { ar: 'إسواتيني', tr: 'Esvatini', es: 'Esuatini', fr: 'Eswatini' }, [
        T('Mbabane', -26.3054, 31.1367, 'مبابانے|म्बाबाने|এমবাবানে|مبابانه', { ar: 'مباباني' }),
        T('Manzini', -26.4833, 31.3667, 'منزینی|मंज़िनी|মানজিনি|مانزینی', { ar: 'مانزيني' }),
      ]),
    ],
  },
];
