/*
 * Countries, regions and cities.
 *
 * Country fields:
 *   slug          URL segment (English, never translated, so links stay stable)
 *   cc            ISO country code, used in hreflang (ur-PK, hi-IN, ...)
 *   name          { lang: name } for every language in `langs`
 *   continent     'asia' | 'europe' | 'northAmerica' | 'oceania' (groups the home page)
 *   langs         the country's own languages; they get region-specific hreflang tags (ur-PK).
 *                 Every page is published in every site language regardless.
 *   tz            IANA time zone (a city can override it as its 5th value)
 *   method        calculation method for Hanafi, Shafi'i and Maliki
 *   jafariMethod  optional method for Jafria (default 'Jafari', Leva Institute, Qum)
 *   defaultSect   sect shown until the visitor picks one: the country's majority ('hanafi', 'shafii' or 'jafria')
 *   extraCalendar optional 'persian' to also show the Solar Hijri date
 *
 * City row: [English name, latitude, longitude, { lang: name }, optional time zone]
 * Latin-script languages (en, id, ms) fall back to the English name when none is given.
 */
module.exports = [
  {
    slug: 'pakistan',
    cc: 'PK',
    continent: 'asia',
    name: { en: 'Pakistan', ur: 'پاکستان' },
    langs: ['en', 'ur'],
    tz: 'Asia/Karachi',
    method: 'Karachi',
    defaultSect: 'hanafi',
    regions: [
      {
        name: { en: 'Punjab', ur: 'پنجاب' },
        cities: [
          ['Lahore', 31.5204, 74.3587, { ur: 'لاہور' }],
          ['Faisalabad', 31.4504, 73.1350, { ur: 'فیصل آباد' }],
          ['Rawalpindi', 33.5651, 73.0169, { ur: 'راولپنڈی' }],
          ['Multan', 30.1575, 71.5249, { ur: 'ملتان' }],
          ['Gujranwala', 32.1877, 74.1945, { ur: 'گوجرانوالہ' }],
          ['Sialkot', 32.4945, 74.5229, { ur: 'سیالکوٹ' }],
          ['Sargodha', 32.0740, 72.6861, { ur: 'سرگودھا' }],
          ['Bahawalpur', 29.3956, 71.6836, { ur: 'بہاولپور' }],
          ['Sheikhupura', 31.7167, 73.9850, { ur: 'شیخوپورہ' }],
          ['Rahim Yar Khan', 28.4202, 70.2952, { ur: 'رحیم یار خان' }],
          ['Jhang', 31.2681, 72.3181, { ur: 'جھنگ' }],
          ['Dera Ghazi Khan', 30.0561, 70.6403, { ur: 'ڈیرہ غازی خان' }],
          ['Gujrat', 32.5731, 74.0789, { ur: 'گجرات' }],
          ['Sahiwal', 30.6682, 73.1114, { ur: 'ساہیوال' }],
          ['Okara', 30.8138, 73.4534, { ur: 'اوکاڑہ' }],
          ['Kasur', 31.1187, 74.4507, { ur: 'قصور' }],
          ['Chiniot', 31.7200, 72.9789, { ur: 'چنیوٹ' }],
          ['Jhelum', 32.9425, 73.7257, { ur: 'جہلم' }],
        ],
      },
      {
        name: { en: 'Sindh', ur: 'سندھ' },
        cities: [
          ['Karachi', 24.8607, 67.0011, { ur: 'کراچی' }],
          ['Hyderabad', 25.3960, 68.3578, { ur: 'حیدرآباد' }],
          ['Sukkur', 27.7052, 68.8574, { ur: 'سکھر' }],
          ['Larkana', 27.5570, 68.2264, { ur: 'لاڑکانہ' }],
          ['Nawabshah', 26.2442, 68.4100, { ur: 'نوابشاہ' }],
          ['Mirpur Khas', 25.5276, 69.0111, { ur: 'میرپور خاص' }],
          ['Jacobabad', 28.2769, 68.4514, { ur: 'جیکب آباد' }],
          ['Thatta', 24.7461, 67.9243, { ur: 'ٹھٹھہ' }],
        ],
      },
      {
        name: { en: 'Khyber Pakhtunkhwa', ur: 'خیبر پختونخوا' },
        cities: [
          ['Peshawar', 34.0151, 71.5249, { ur: 'پشاور' }],
          ['Mardan', 34.2010, 72.0450, { ur: 'مردان' }],
          ['Abbottabad', 34.1688, 73.2215, { ur: 'ایبٹ آباد' }],
          ['Mingora', 34.7717, 72.3600, { ur: 'مینگورہ' }],
          ['Kohat', 33.5869, 71.4429, { ur: 'کوہاٹ' }],
          ['Dera Ismail Khan', 31.8314, 70.9019, { ur: 'ڈیرہ اسماعیل خان' }],
          ['Bannu', 32.9889, 70.6056, { ur: 'بنوں' }],
          ['Mansehra', 34.3302, 73.1968, { ur: 'مانسہرہ' }],
          ['Chitral', 35.8518, 71.7864, { ur: 'چترال' }],
        ],
      },
      {
        name: { en: 'Balochistan', ur: 'بلوچستان' },
        cities: [
          ['Quetta', 30.1798, 66.9750, { ur: 'کوئٹہ' }],
          ['Gwadar', 25.1264, 62.3225, { ur: 'گوادر' }],
          ['Turbat', 26.0023, 63.0440, { ur: 'تربت' }],
          ['Khuzdar', 27.8000, 66.6167, { ur: 'خضدار' }],
          ['Zhob', 31.3417, 69.4486, { ur: 'ژوب' }],
          ['Sibi', 29.5430, 67.8773, { ur: 'سبی' }],
          ['Chaman', 30.9210, 66.4597, { ur: 'چمن' }],
        ],
      },
      {
        name: { en: 'Islamabad Capital Territory', ur: 'اسلام آباد وفاقی دارالحکومت' },
        cities: [
          ['Islamabad', 33.6844, 73.0479, { ur: 'اسلام آباد' }],
        ],
      },
      {
        name: { en: 'Azad Kashmir', ur: 'آزاد کشمیر' },
        cities: [
          ['Muzaffarabad', 34.3700, 73.4711, { ur: 'مظفرآباد' }],
          ['Mirpur', 33.1478, 73.7517, { ur: 'میرپور' }],
          ['Rawalakot', 33.8578, 73.7604, { ur: 'راولاکوٹ' }],
        ],
      },
      {
        name: { en: 'Gilgit-Baltistan', ur: 'گلگت بلتستان' },
        cities: [
          ['Gilgit', 35.9208, 74.3080, { ur: 'گلگت' }],
          ['Skardu', 35.2971, 75.6333, { ur: 'سکردو' }],
          ['Hunza', 36.3167, 74.6500, { ur: 'ہنزہ' }],
        ],
      },
    ],
  },
  {
    slug: 'india',
    cc: 'IN',
    continent: 'asia',
    name: { en: 'India', hi: 'भारत', ur: 'بھارت' },
    langs: ['en', 'hi', 'ur'],
    tz: 'Asia/Kolkata',
    method: 'Karachi',
    defaultSect: 'hanafi',
    regions: [
      {
        name: { en: 'Delhi', hi: 'दिल्ली', ur: 'دہلی' },
        cities: [
          ['New Delhi', 28.6139, 77.2090, { hi: 'नई दिल्ली', ur: 'نئی دہلی' }],
        ],
      },
      {
        name: { en: 'Uttar Pradesh', hi: 'उत्तर प्रदेश', ur: 'اتر پردیش' },
        cities: [
          ['Lucknow', 26.8467, 80.9462, { hi: 'लखनऊ', ur: 'لکھنؤ' }],
          ['Kanpur', 26.4499, 80.3319, { hi: 'कानपुर', ur: 'کانپور' }],
          ['Agra', 27.1767, 78.0081, { hi: 'आगरा', ur: 'آگرہ' }],
          ['Aligarh', 27.8974, 78.0880, { hi: 'अलीगढ़', ur: 'علی گڑھ' }],
          ['Bareilly', 28.3670, 79.4304, { hi: 'बरेली', ur: 'بریلی' }],
          ['Moradabad', 28.8386, 78.7733, { hi: 'मुरादाबाद', ur: 'مرادآباد' }],
          ['Meerut', 28.9845, 77.7064, { hi: 'मेरठ', ur: 'میرٹھ' }],
          ['Varanasi', 25.3176, 82.9739, { hi: 'वाराणसी', ur: 'وارانسی' }],
          ['Saharanpur', 29.9680, 77.5552, { hi: 'सहारनपुर', ur: 'سہارنپور' }],
          ['Deoband', 29.6936, 77.6779, { hi: 'देवबंद', ur: 'دیوبند' }],
        ],
      },
      {
        name: { en: 'Maharashtra', hi: 'महाराष्ट्र', ur: 'مہاراشٹر' },
        cities: [
          ['Mumbai', 19.0760, 72.8777, { hi: 'मुंबई', ur: 'ممبئی' }],
          ['Pune', 18.5204, 73.8567, { hi: 'पुणे', ur: 'پونے' }],
          ['Nagpur', 21.1458, 79.0882, { hi: 'नागपुर', ur: 'ناگپور' }],
          ['Aurangabad', 19.8762, 75.3433, { hi: 'औरंगाबाद', ur: 'اورنگ آباد' }],
        ],
      },
      {
        name: { en: 'Telangana', hi: 'तेलंगाना', ur: 'تلنگانہ' },
        cities: [
          ['Hyderabad', 17.3850, 78.4867, { hi: 'हैदराबाद', ur: 'حیدرآباد' }],
        ],
      },
      {
        name: { en: 'Karnataka', hi: 'कर्नाटक', ur: 'کرناٹک' },
        cities: [
          ['Bengaluru', 12.9716, 77.5946, { hi: 'बेंगलुरु', ur: 'بنگلورو' }],
          ['Mysuru', 12.2958, 76.6394, { hi: 'मैसूरु', ur: 'میسور' }],
          ['Mangaluru', 12.9141, 74.8560, { hi: 'मंगलुरु', ur: 'منگلور' }],
        ],
      },
      {
        name: { en: 'Tamil Nadu', hi: 'तमिलनाडु', ur: 'تمل ناڈو' },
        cities: [
          ['Chennai', 13.0827, 80.2707, { hi: 'चेन्नई', ur: 'چنئی' }],
          ['Coimbatore', 11.0168, 76.9558, { hi: 'कोयंबटूर', ur: 'کوئمبٹور' }],
          ['Madurai', 9.9252, 78.1198, { hi: 'मदुरै', ur: 'مدورئی' }],
        ],
      },
      {
        name: { en: 'Kerala', hi: 'केरल', ur: 'کیرالا' },
        cities: [
          ['Kozhikode', 11.2588, 75.7804, { hi: 'कोझिकोड', ur: 'کوژیکوڈ' }],
          ['Malappuram', 11.0510, 76.0711, { hi: 'मलप्पुरम', ur: 'ملاپورم' }],
          ['Kochi', 9.9312, 76.2673, { hi: 'कोच्चि', ur: 'کوچی' }],
          ['Thiruvananthapuram', 8.5241, 76.9366, { hi: 'तिरुवनंतपुरम', ur: 'ترووننت پورم' }],
        ],
      },
      {
        name: { en: 'West Bengal', hi: 'पश्चिम बंगाल', ur: 'مغربی بنگال' },
        cities: [
          ['Kolkata', 22.5726, 88.3639, { hi: 'कोलकाता', ur: 'کولکاتا' }],
        ],
      },
      {
        name: { en: 'Bihar', hi: 'बिहार', ur: 'بہار' },
        cities: [
          ['Patna', 25.5941, 85.1376, { hi: 'पटना', ur: 'پٹنہ' }],
        ],
      },
      {
        name: { en: 'Gujarat', hi: 'गुजरात', ur: 'گجرات' },
        cities: [
          ['Ahmedabad', 23.0225, 72.5714, { hi: 'अहमदाबाद', ur: 'احمد آباد' }],
          ['Surat', 21.1702, 72.8311, { hi: 'सूरत', ur: 'سورت' }],
        ],
      },
      {
        name: { en: 'Rajasthan', hi: 'राजस्थान', ur: 'راجستھان' },
        cities: [
          ['Jaipur', 26.9124, 75.7873, { hi: 'जयपुर', ur: 'جے پور' }],
          ['Ajmer', 26.4499, 74.6399, { hi: 'अजमेर', ur: 'اجمیر' }],
        ],
      },
      {
        name: { en: 'Madhya Pradesh', hi: 'मध्य प्रदेश', ur: 'مدھیہ پردیش' },
        cities: [
          ['Bhopal', 23.2599, 77.4126, { hi: 'भोपाल', ur: 'بھوپال' }],
          ['Indore', 22.7196, 75.8577, { hi: 'इंदौर', ur: 'اندور' }],
        ],
      },
      {
        name: { en: 'Assam', hi: 'असम', ur: 'آسام' },
        cities: [
          ['Guwahati', 26.1445, 91.7362, { hi: 'गुवाहाटी', ur: 'گواہاٹی' }],
        ],
      },
      {
        name: { en: 'Jammu and Kashmir', hi: 'जम्मू और कश्मीर', ur: 'جموں و کشمیر' },
        cities: [
          ['Srinagar', 34.0837, 74.7973, { hi: 'श्रीनगर', ur: 'سری نگر' }],
          ['Jammu', 32.7266, 74.8570, { hi: 'जम्मू', ur: 'جموں' }],
        ],
      },
    ],
  },
  {
    slug: 'bangladesh',
    cc: 'BD',
    continent: 'asia',
    name: { en: 'Bangladesh', bn: 'বাংলাদেশ' },
    langs: ['en', 'bn'],
    tz: 'Asia/Dhaka',
    method: 'Karachi',
    defaultSect: 'hanafi',
    regions: [
      {
        name: { en: 'Dhaka Division', bn: 'ঢাকা বিভাগ' },
        cities: [
          ['Dhaka', 23.8103, 90.4125, { bn: 'ঢাকা' }],
          ['Narayanganj', 23.6238, 90.4990, { bn: 'নারায়ণগঞ্জ' }],
          ['Gazipur', 23.9999, 90.4203, { bn: 'গাজীপুর' }],
          ['Tangail', 24.2513, 89.9167, { bn: 'টাঙ্গাইল' }],
        ],
      },
      {
        name: { en: 'Chattogram Division', bn: 'চট্টগ্রাম বিভাগ' },
        cities: [
          ['Chattogram', 22.3569, 91.7832, { bn: 'চট্টগ্রাম' }],
          ['Cumilla', 23.4607, 91.1809, { bn: 'কুমিল্লা' }],
          ['Cox’s Bazar', 21.4272, 92.0058, { bn: 'কক্সবাজার' }],
          ['Feni', 23.0159, 91.3976, { bn: 'ফেনী' }],
        ],
      },
      {
        name: { en: 'Rajshahi Division', bn: 'রাজশাহী বিভাগ' },
        cities: [
          ['Rajshahi', 24.3745, 88.6042, { bn: 'রাজশাহী' }],
          ['Bogura', 24.8466, 89.3776, { bn: 'বগুড়া' }],
          ['Pabna', 24.0064, 89.2372, { bn: 'পাবনা' }],
        ],
      },
      {
        name: { en: 'Khulna Division', bn: 'খুলনা বিভাগ' },
        cities: [
          ['Khulna', 22.8456, 89.5403, { bn: 'খুলনা' }],
          ['Jashore', 23.1664, 89.2081, { bn: 'যশোর' }],
          ['Kushtia', 23.9013, 89.1205, { bn: 'কুষ্টিয়া' }],
        ],
      },
      {
        name: { en: 'Sylhet Division', bn: 'সিলেট বিভাগ' },
        cities: [
          ['Sylhet', 24.8949, 91.8687, { bn: 'সিলেট' }],
          ['Moulvibazar', 24.4829, 91.7774, { bn: 'মৌলভীবাজার' }],
        ],
      },
      {
        name: { en: 'Barishal Division', bn: 'বরিশাল বিভাগ' },
        cities: [
          ['Barishal', 22.7010, 90.3535, { bn: 'বরিশাল' }],
        ],
      },
      {
        name: { en: 'Rangpur Division', bn: 'রংপুর বিভাগ' },
        cities: [
          ['Rangpur', 25.7439, 89.2752, { bn: 'রংপুর' }],
          ['Dinajpur', 25.6217, 88.6354, { bn: 'দিনাজপুর' }],
        ],
      },
      {
        name: { en: 'Mymensingh Division', bn: 'ময়মনসিংহ বিভাগ' },
        cities: [
          ['Mymensingh', 24.7471, 90.4203, { bn: 'ময়মনসিংহ' }],
        ],
      },
    ],
  },
  {
    slug: 'afghanistan',
    cc: 'AF',
    continent: 'asia',
    name: { en: 'Afghanistan', ps: 'افغانستان', prs: 'افغانستان' },
    langs: ['en', 'ps', 'fa'],
    tz: 'Asia/Kabul',
    method: 'Karachi',
    defaultSect: 'hanafi',
    extraCalendar: 'persian',
    regions: [
      {
        name: { en: 'Kabul', ps: 'کابل', prs: 'کابل' },
        cities: [['Kabul', 34.5553, 69.2075, { ps: 'کابل', prs: 'کابل' }]],
      },
      {
        name: { en: 'Kandahar', ps: 'کندهار', prs: 'قندهار' },
        cities: [['Kandahar', 31.6289, 65.7372, { ps: 'کندهار', prs: 'قندهار' }]],
      },
      {
        name: { en: 'Herat', ps: 'هرات', prs: 'هرات' },
        cities: [['Herat', 34.3529, 62.2040, { ps: 'هرات', prs: 'هرات' }]],
      },
      {
        name: { en: 'Balkh', ps: 'بلخ', prs: 'بلخ' },
        cities: [['Mazar-i-Sharif', 36.7090, 67.1109, { ps: 'مزار شریف', prs: 'مزار شریف' }]],
      },
      {
        name: { en: 'Nangarhar', ps: 'ننګرهار', prs: 'ننگرهار' },
        cities: [['Jalalabad', 34.4415, 70.4361, { ps: 'جلال اباد', prs: 'جلال‌آباد' }]],
      },
      {
        name: { en: 'Kunduz', ps: 'کندز', prs: 'کندز' },
        cities: [['Kunduz', 36.7280, 68.8680, { ps: 'کندز', prs: 'کندز' }]],
      },
      {
        name: { en: 'Ghazni', ps: 'غزني', prs: 'غزنی' },
        cities: [['Ghazni', 33.5492, 68.4233, { ps: 'غزني', prs: 'غزنی' }]],
      },
      {
        name: { en: 'Bamyan', ps: 'بامیان', prs: 'بامیان' },
        cities: [['Bamyan', 34.8210, 67.8210, { ps: 'بامیان', prs: 'بامیان' }]],
      },
      {
        name: { en: 'Khost', ps: 'خوست', prs: 'خوست' },
        cities: [['Khost', 33.3395, 69.9204, { ps: 'خوست', prs: 'خوست' }]],
      },
      {
        name: { en: 'Helmand', ps: 'هلمند', prs: 'هلمند' },
        cities: [['Lashkar Gah', 31.5930, 64.3710, { ps: 'لښکرګاه', prs: 'لشکرگاه' }]],
      },
      {
        name: { en: 'Baghlan', ps: 'بغلان', prs: 'بغلان' },
        cities: [['Pul-e Khumri', 35.9446, 68.7151, { ps: 'پلخمري', prs: 'پل خمری' }]],
      },
      {
        name: { en: 'Takhar', ps: 'تخار', prs: 'تخار' },
        cities: [['Taloqan', 36.7361, 69.5345, { ps: 'تالقان', prs: 'تالقان' }]],
      },
      {
        name: { en: 'Badakhshan', ps: 'بدخشان', prs: 'بدخشان' },
        cities: [['Fayzabad', 37.1166, 70.5800, { ps: 'فیض اباد', prs: 'فیض‌آباد' }]],
      },
      {
        name: { en: 'Jowzjan', ps: 'جوزجان', prs: 'جوزجان' },
        cities: [['Sheberghan', 36.6650, 65.7520, { ps: 'شبرغان', prs: 'شبرغان' }]],
      },
      {
        name: { en: 'Farah', ps: 'فراه', prs: 'فراه' },
        cities: [['Farah', 32.3740, 62.1160, { ps: 'فراه', prs: 'فراه' }]],
      },
      {
        name: { en: 'Nimruz', ps: 'نیمروز', prs: 'نیمروز' },
        cities: [['Zaranj', 30.9590, 61.8600, { ps: 'زرنج', prs: 'زرنج' }]],
      },
    ],
  },
  {
    slug: 'maldives',
    cc: 'MV',
    continent: 'asia',
    name: { en: 'Maldives', dv: 'ދިވެހިރާއްޖެ' },
    langs: ['en'],
    tz: 'Indian/Maldives',
    method: 'MuslimWorldLeague',
    defaultSect: 'shafii',
    regions: [
      {
        name: { en: 'Greater Malé', dv: 'މާލެ' },
        cities: [
          ['Malé', 4.1755, 73.5093, { dv: 'މާލެ' }],
          ['Hulhumalé', 4.2105, 73.5402, { dv: 'ހުޅުމާލެ' }],
        ],
      },
      {
        name: { en: 'North', dv: 'އުތުރު ސަރަހައްދު' },
        cities: [
          ['Kulhudhuffushi', 6.6223, 73.0700, { dv: 'ކުޅުދުއްފުށި' }],
          ['Naifaru', 5.4440, 73.3660, { dv: 'ނައިފަރު' }],
          ['Eydhafushi', 5.1036, 73.0706, { dv: 'އޭދަފުށި' }],
        ],
      },
      {
        name: { en: 'South', dv: 'ދެކުނު ސަރަހައްދު' },
        cities: [
          ['Addu City', -0.6006, 73.0835, { dv: 'އައްޑޫ ސިޓީ' }],
          ['Fuvahmulah', -0.2985, 73.4240, { dv: 'ފުވައްމުލައް' }],
          ['Thinadhoo', 0.5303, 72.9967, { dv: 'ތިނަދޫ' }],
        ],
      },
    ],
  },
  {
    slug: 'iran',
    cc: 'IR',
    continent: 'middleEast',
    name: { en: 'Iran', fa: 'ایران' },
    langs: ['en', 'fa'],
    tz: 'Asia/Tehran',
    method: 'MuslimWorldLeague',
    jafariMethod: 'Tehran',
    defaultSect: 'jafria',
    extraCalendar: 'persian',
    regions: [
      { name: { en: 'Tehran', fa: 'تهران' }, cities: [['Tehran', 35.6892, 51.3890, { fa: 'تهران' }]] },
      { name: { en: 'Alborz', fa: 'البرز' }, cities: [['Karaj', 35.8400, 50.9391, { fa: 'کرج' }]] },
      { name: { en: 'Qom', fa: 'قم' }, cities: [['Qom', 34.6399, 50.8759, { fa: 'قم' }]] },
      { name: { en: 'Razavi Khorasan', fa: 'خراسان رضوی' }, cities: [['Mashhad', 36.2605, 59.6168, { fa: 'مشهد' }]] },
      {
        name: { en: 'Isfahan', fa: 'اصفهان' },
        cities: [
          ['Isfahan', 32.6546, 51.6680, { fa: 'اصفهان' }],
          ['Kashan', 33.9850, 51.4100, { fa: 'کاشان' }],
        ],
      },
      { name: { en: 'Fars', fa: 'فارس' }, cities: [['Shiraz', 29.5918, 52.5837, { fa: 'شیراز' }]] },
      { name: { en: 'East Azerbaijan', fa: 'آذربایجان شرقی' }, cities: [['Tabriz', 38.0962, 46.2738, { fa: 'تبریز' }]] },
      { name: { en: 'West Azerbaijan', fa: 'آذربایجان غربی' }, cities: [['Urmia', 37.5527, 45.0761, { fa: 'ارومیه' }]] },
      { name: { en: 'Ardabil', fa: 'اردبیل' }, cities: [['Ardabil', 38.2498, 48.2933, { fa: 'اردبیل' }]] },
      { name: { en: 'Khuzestan', fa: 'خوزستان' }, cities: [['Ahvaz', 31.3183, 48.6706, { fa: 'اهواز' }]] },
      { name: { en: 'Kermanshah', fa: 'کرمانشاه' }, cities: [['Kermanshah', 34.3142, 47.0650, { fa: 'کرمانشاه' }]] },
      { name: { en: 'Kurdistan', fa: 'کردستان' }, cities: [['Sanandaj', 35.3219, 46.9862, { fa: 'سنندج' }]] },
      { name: { en: 'Hamadan', fa: 'همدان' }, cities: [['Hamadan', 34.7992, 48.5146, { fa: 'همدان' }]] },
      { name: { en: 'Gilan', fa: 'گیلان' }, cities: [['Rasht', 37.2808, 49.5832, { fa: 'رشت' }]] },
      { name: { en: 'Mazandaran', fa: 'مازندران' }, cities: [['Sari', 36.5633, 53.0601, { fa: 'ساری' }]] },
      { name: { en: 'Golestan', fa: 'گلستان' }, cities: [['Gorgan', 36.8427, 54.4439, { fa: 'گرگان' }]] },
      { name: { en: 'Yazd', fa: 'یزد' }, cities: [['Yazd', 31.8974, 54.3569, { fa: 'یزد' }]] },
      { name: { en: 'Kerman', fa: 'کرمان' }, cities: [['Kerman', 30.2839, 57.0834, { fa: 'کرمان' }]] },
      { name: { en: 'Hormozgan', fa: 'هرمزگان' }, cities: [['Bandar Abbas', 27.1832, 56.2666, { fa: 'بندرعباس' }]] },
      {
        name: { en: 'Sistan and Baluchestan', fa: 'سیستان و بلوچستان' },
        cities: [
          ['Zahedan', 29.4963, 60.8629, { fa: 'زاهدان' }],
          ['Chabahar', 25.2919, 60.6430, { fa: 'چابهار' }],
        ],
      },
    ],
  },
  {
    slug: 'indonesia',
    cc: 'ID',
    continent: 'asia',
    name: { en: 'Indonesia', id: 'Indonesia' },
    langs: ['en', 'id'],
    tz: 'Asia/Jakarta',
    method: 'Kemenag',
    defaultSect: 'shafii',
    regions: [
      { name: { en: 'Jakarta', id: 'DKI Jakarta' }, cities: [['Jakarta', -6.2088, 106.8456]] },
      {
        name: { en: 'West Java', id: 'Jawa Barat' },
        cities: [
          ['Bandung', -6.9175, 107.6191],
          ['Bekasi', -6.2383, 106.9756],
          ['Bogor', -6.5950, 106.8166],
          ['Depok', -6.4025, 106.7942],
        ],
      },
      {
        name: { en: 'Banten', id: 'Banten' },
        cities: [
          ['Tangerang', -6.1783, 106.6319],
          ['Serang', -6.1200, 106.1503],
        ],
      },
      {
        name: { en: 'Central Java', id: 'Jawa Tengah' },
        cities: [
          ['Semarang', -6.9667, 110.4167],
          ['Surakarta', -7.5755, 110.8243],
        ],
      },
      { name: { en: 'Yogyakarta', id: 'DI Yogyakarta' }, cities: [['Yogyakarta', -7.7956, 110.3695]] },
      {
        name: { en: 'East Java', id: 'Jawa Timur' },
        cities: [
          ['Surabaya', -7.2575, 112.7521],
          ['Malang', -7.9666, 112.6326],
        ],
      },
      { name: { en: 'Aceh', id: 'Aceh' }, cities: [['Banda Aceh', 5.5483, 95.3238]] },
      { name: { en: 'North Sumatra', id: 'Sumatera Utara' }, cities: [['Medan', 3.5952, 98.6722]] },
      { name: { en: 'West Sumatra', id: 'Sumatera Barat' }, cities: [['Padang', -0.9471, 100.4172]] },
      { name: { en: 'Riau', id: 'Riau' }, cities: [['Pekanbaru', 0.5071, 101.4478]] },
      { name: { en: 'South Sumatra', id: 'Sumatera Selatan' }, cities: [['Palembang', -2.9761, 104.7754]] },
      { name: { en: 'Lampung', id: 'Lampung' }, cities: [['Bandar Lampung', -5.3971, 105.2668]] },
      { name: { en: 'West Kalimantan', id: 'Kalimantan Barat' }, cities: [['Pontianak', -0.0263, 109.3425, {}, 'Asia/Pontianak']] },
      { name: { en: 'South Kalimantan', id: 'Kalimantan Selatan' }, cities: [['Banjarmasin', -3.3186, 114.5944, {}, 'Asia/Makassar']] },
      {
        name: { en: 'East Kalimantan', id: 'Kalimantan Timur' },
        cities: [
          ['Samarinda', -0.5022, 117.1536, {}, 'Asia/Makassar'],
          ['Balikpapan', -1.2379, 116.8529, {}, 'Asia/Makassar'],
        ],
      },
      { name: { en: 'Bali', id: 'Bali' }, cities: [['Denpasar', -8.6705, 115.2126, {}, 'Asia/Makassar']] },
      { name: { en: 'West Nusa Tenggara', id: 'Nusa Tenggara Barat' }, cities: [['Mataram', -8.5833, 116.1167, {}, 'Asia/Makassar']] },
      { name: { en: 'South Sulawesi', id: 'Sulawesi Selatan' }, cities: [['Makassar', -5.1477, 119.4327, {}, 'Asia/Makassar']] },
      { name: { en: 'North Sulawesi', id: 'Sulawesi Utara' }, cities: [['Manado', 1.4748, 124.8421, {}, 'Asia/Makassar']] },
      { name: { en: 'Maluku', id: 'Maluku' }, cities: [['Ambon', -3.6954, 128.1814, {}, 'Asia/Jayapura']] },
      { name: { en: 'Papua', id: 'Papua' }, cities: [['Jayapura', -2.5337, 140.7181, {}, 'Asia/Jayapura']] },
    ],
  },
  {
    slug: 'malaysia',
    cc: 'MY',
    continent: 'asia',
    name: { en: 'Malaysia', ms: 'Malaysia' },
    langs: ['en', 'ms'],
    tz: 'Asia/Kuala_Lumpur',
    method: 'JAKIM',
    defaultSect: 'shafii',
    regions: [
      { name: { en: 'Kuala Lumpur' }, cities: [['Kuala Lumpur', 3.1390, 101.6869]] },
      { name: { en: 'Putrajaya' }, cities: [['Putrajaya', 2.9264, 101.6964]] },
      {
        name: { en: 'Selangor' },
        cities: [
          ['Shah Alam', 3.0733, 101.5185],
          ['Petaling Jaya', 3.1073, 101.6067],
          ['Klang', 3.0449, 101.4456],
        ],
      },
      { name: { en: 'Johor' }, cities: [['Johor Bahru', 1.4927, 103.7414]] },
      { name: { en: 'Penang', ms: 'Pulau Pinang' }, cities: [['George Town', 5.4141, 100.3288]] },
      { name: { en: 'Perak' }, cities: [['Ipoh', 4.5975, 101.0901]] },
      { name: { en: 'Kedah' }, cities: [['Alor Setar', 6.1248, 100.3678]] },
      { name: { en: 'Kelantan' }, cities: [['Kota Bharu', 6.1254, 102.2381]] },
      { name: { en: 'Terengganu' }, cities: [['Kuala Terengganu', 5.3296, 103.1370]] },
      { name: { en: 'Pahang' }, cities: [['Kuantan', 3.8077, 103.3260]] },
      { name: { en: 'Negeri Sembilan' }, cities: [['Seremban', 2.7297, 101.9381]] },
      { name: { en: 'Melaka' }, cities: [['Melaka', 2.1896, 102.2501]] },
      { name: { en: 'Perlis' }, cities: [['Kangar', 6.4414, 100.1986]] },
      { name: { en: 'Sabah' }, cities: [['Kota Kinabalu', 5.9804, 116.0735, {}, 'Asia/Kuching']] },
      { name: { en: 'Sarawak' }, cities: [['Kuching', 1.5535, 110.3593, {}, 'Asia/Kuching']] },
      { name: { en: 'Labuan' }, cities: [['Labuan', 5.2831, 115.2308, {}, 'Asia/Kuching']] },
    ],
  },
  {
    slug: 'brunei',
    cc: 'BN',
    continent: 'asia',
    name: { en: 'Brunei', ms: 'Brunei' },
    langs: ['en', 'ms'],
    tz: 'Asia/Brunei',
    method: 'Brunei',
    defaultSect: 'shafii',
    regions: [
      { name: { en: 'Brunei-Muara' }, cities: [['Bandar Seri Begawan', 4.9031, 114.9398]] },
      { name: { en: 'Tutong' }, cities: [['Tutong', 4.8030, 114.6490]] },
      {
        name: { en: 'Belait' },
        cities: [
          ['Kuala Belait', 4.5836, 114.2312],
          ['Seria', 4.6064, 114.3250],
        ],
      },
      { name: { en: 'Temburong' }, cities: [['Bangar', 4.7092, 115.0740]] },
    ],
  },
  {
    slug: 'usa',
    cc: 'US',
    continent: 'northAmerica',
    name: { en: 'USA' },
    langs: ['en'],
    tz: 'America/New_York',
    method: 'NorthAmerica',
    defaultSect: 'hanafi',
    regions: [
      {
        name: { en: 'New York' },
        cities: [['New York', 40.7128, -74.0060]],
      },
      {
        name: { en: 'New Jersey' },
        cities: [
          ['Paterson', 40.9168, -74.1718],
          ['Jersey City', 40.7178, -74.0431],
        ],
      },
      { name: { en: 'Pennsylvania' }, cities: [['Philadelphia', 39.9526, -75.1652]] },
      { name: { en: 'District of Columbia' }, cities: [['Washington', 38.9072, -77.0369]] },
      { name: { en: 'Massachusetts' }, cities: [['Boston', 42.3601, -71.0589]] },
      { name: { en: 'Georgia' }, cities: [['Atlanta', 33.7490, -84.3880]] },
      {
        name: { en: 'Florida' },
        cities: [
          ['Miami', 25.7617, -80.1918],
          ['Orlando', 28.5383, -81.3792],
        ],
      },
      { name: { en: 'North Carolina' }, cities: [['Charlotte', 35.2271, -80.8431]] },
      { name: { en: 'Ohio' }, cities: [['Columbus', 39.9612, -82.9988]] },
      {
        name: { en: 'Michigan' },
        cities: [
          ['Detroit', 42.3314, -83.0458, {}, 'America/Detroit'],
          ['Dearborn', 42.3223, -83.1763, {}, 'America/Detroit'],
        ],
      },
      { name: { en: 'Illinois' }, cities: [['Chicago', 41.8781, -87.6298, {}, 'America/Chicago']] },
      { name: { en: 'Minnesota' }, cities: [['Minneapolis', 44.9778, -93.2650, {}, 'America/Chicago']] },
      {
        name: { en: 'Texas' },
        cities: [
          ['Houston', 29.7604, -95.3698, {}, 'America/Chicago'],
          ['Dallas', 32.7767, -96.7970, {}, 'America/Chicago'],
        ],
      },
      { name: { en: 'Colorado' }, cities: [['Denver', 39.7392, -104.9903, {}, 'America/Denver']] },
      { name: { en: 'Arizona' }, cities: [['Phoenix', 33.4484, -112.0740, {}, 'America/Phoenix']] },
      {
        name: { en: 'California' },
        cities: [
          ['Los Angeles', 34.0522, -118.2437, {}, 'America/Los_Angeles'],
          ['Anaheim', 33.8366, -117.9143, {}, 'America/Los_Angeles'],
          ['San Francisco', 37.7749, -122.4194, {}, 'America/Los_Angeles'],
          ['San Jose', 37.3382, -121.8863, {}, 'America/Los_Angeles'],
        ],
      },
      { name: { en: 'Washington' }, cities: [['Seattle', 47.6062, -122.3321, {}, 'America/Los_Angeles']] },
    ],
  },
  {
    slug: 'uk',
    cc: 'GB',
    continent: 'europe',
    name: { en: 'UK' },
    langs: ['en'],
    tz: 'Europe/London',
    method: 'MoonsightingCommittee',
    defaultSect: 'hanafi',
    regions: [
      {
        name: { en: 'England' },
        cities: [
          ['London', 51.5074, -0.1278],
          ['Birmingham', 52.4862, -1.8904],
          ['Manchester', 53.4808, -2.2426],
          ['Bradford', 53.7960, -1.7594],
          ['Leeds', 53.8008, -1.5491],
          ['Leicester', 52.6369, -1.1398],
          ['Sheffield', 53.3811, -1.4701],
          ['Liverpool', 53.4084, -2.9916],
          ['Bristol', 51.4545, -2.5879],
          ['Luton', 51.8787, -0.4200],
          ['Blackburn', 53.7486, -2.4875],
          ['Oldham', 53.5409, -2.1114],
          ['Nottingham', 52.9548, -1.1581],
          ['Newcastle upon Tyne', 54.9783, -1.6178],
          ['Coventry', 52.4068, -1.5197],
          ['Slough', 51.5105, -0.5950],
        ],
      },
      {
        name: { en: 'Scotland' },
        cities: [
          ['Glasgow', 55.8642, -4.2518],
          ['Edinburgh', 55.9533, -3.1883],
        ],
      },
      { name: { en: 'Wales' }, cities: [['Cardiff', 51.4816, -3.1791]] },
      { name: { en: 'Northern Ireland' }, cities: [['Belfast', 54.5973, -5.9301]] },
    ],
  },
  {
    slug: 'canada',
    cc: 'CA',
    continent: 'northAmerica',
    name: { en: 'Canada' },
    langs: ['en', 'fr'],
    tz: 'America/Toronto',
    method: 'NorthAmerica',
    defaultSect: 'hanafi',
    regions: [
      {
        name: { en: 'Ontario' },
        cities: [
          ['Toronto', 43.6532, -79.3832],
          ['Mississauga', 43.5890, -79.6441],
          ['Brampton', 43.7315, -79.7624],
          ['Ottawa', 45.4215, -75.6972],
          ['Hamilton', 43.2557, -79.8711],
          ['London', 42.9849, -81.2453],
          ['Windsor', 42.3149, -83.0364],
        ],
      },
      {
        name: { en: 'Quebec' },
        cities: [
          ['Montreal', 45.5017, -73.5673],
          ['Quebec City', 46.8139, -71.2080],
        ],
      },
      {
        name: { en: 'British Columbia' },
        cities: [
          ['Vancouver', 49.2827, -123.1207, {}, 'America/Vancouver'],
          ['Surrey', 49.1913, -122.8490, {}, 'America/Vancouver'],
        ],
      },
      {
        name: { en: 'Alberta' },
        cities: [
          ['Calgary', 51.0447, -114.0719, {}, 'America/Edmonton'],
          ['Edmonton', 53.5461, -113.4938, {}, 'America/Edmonton'],
        ],
      },
      { name: { en: 'Manitoba' }, cities: [['Winnipeg', 49.8951, -97.1384, {}, 'America/Winnipeg']] },
      {
        name: { en: 'Saskatchewan' },
        cities: [
          ['Regina', 50.4452, -104.6189, {}, 'America/Regina'],
          ['Saskatoon', 52.1332, -106.6700, {}, 'America/Regina'],
        ],
      },
      { name: { en: 'Nova Scotia' }, cities: [['Halifax', 44.6488, -63.5752, {}, 'America/Halifax']] },
    ],
  },
  {
    slug: 'australia',
    cc: 'AU',
    continent: 'oceania',
    name: { en: 'Australia' },
    langs: ['en'],
    tz: 'Australia/Sydney',
    method: 'MuslimWorldLeague',
    defaultSect: 'hanafi',
    regions: [
      {
        name: { en: 'New South Wales' },
        cities: [
          ['Sydney', -33.8688, 151.2093],
          ['Newcastle', -32.9283, 151.7817],
        ],
      },
      { name: { en: 'Victoria' }, cities: [['Melbourne', -37.8136, 144.9631, {}, 'Australia/Melbourne']] },
      {
        name: { en: 'Queensland' },
        cities: [
          ['Brisbane', -27.4698, 153.0251, {}, 'Australia/Brisbane'],
          ['Gold Coast', -28.0167, 153.4000, {}, 'Australia/Brisbane'],
        ],
      },
      { name: { en: 'Western Australia' }, cities: [['Perth', -31.9505, 115.8605, {}, 'Australia/Perth']] },
      { name: { en: 'South Australia' }, cities: [['Adelaide', -34.9285, 138.6007, {}, 'Australia/Adelaide']] },
      { name: { en: 'Australian Capital Territory' }, cities: [['Canberra', -35.2809, 149.1300]] },
      { name: { en: 'Tasmania' }, cities: [['Hobart', -42.8821, 147.3272, {}, 'Australia/Hobart']] },
      { name: { en: 'Northern Territory' }, cities: [['Darwin', -12.4634, 130.8456, {}, 'Australia/Darwin']] },
    ],
  },

  /* ---------- Rest of North America (ISNA method; Hanafi default, matching the USA and Canada) ---------- */
  {
    slug: 'mexico', cc: 'MX', continent: 'northAmerica', name: { en: 'Mexico' }, langs: ['es'],
    tz: 'America/Mexico_City', method: 'NorthAmerica', defaultSect: 'hanafi',
    regions: [
      { name: { en: 'Mexico City', es: 'Ciudad de México' }, cities: [['Mexico City', 19.4326, -99.1332, { es: 'Ciudad de México' }]] },
      { name: { en: 'Jalisco' }, cities: [['Guadalajara', 20.6597, -103.3496]] },
      { name: { en: 'Nuevo León' }, cities: [['Monterrey', 25.6866, -100.3161, {}, 'America/Monterrey']] },
      { name: { en: 'Puebla' }, cities: [['Puebla', 19.0414, -98.2063]] },
      { name: { en: 'Baja California' }, cities: [['Tijuana', 32.5149, -117.0382, {}, 'America/Tijuana']] },
      { name: { en: 'Quintana Roo' }, cities: [['Cancún', 21.1619, -86.8515, {}, 'America/Cancun']] },
      { name: { en: 'Yucatán' }, cities: [['Mérida', 20.9674, -89.5926, {}, 'America/Merida']] },
      { name: { en: 'Coahuila' }, cities: [['Torreón', 25.5428, -103.4068, {}, 'America/Monterrey']] },
    ],
  },
  {
    slug: 'guatemala', cc: 'GT', continent: 'northAmerica', name: { en: 'Guatemala' }, langs: ['es'],
    tz: 'America/Guatemala', method: 'NorthAmerica', defaultSect: 'hanafi',
    regions: [
      { name: { en: 'Guatemala' }, cities: [['Guatemala City', 14.6349, -90.5069, { es: 'Ciudad de Guatemala' }]] },
      { name: { en: 'Quetzaltenango' }, cities: [['Quetzaltenango', 14.8347, -91.5180]] },
    ],
  },
  {
    slug: 'belize', cc: 'BZ', continent: 'northAmerica', name: { en: 'Belize' }, langs: ['en'],
    tz: 'America/Belize', method: 'NorthAmerica', defaultSect: 'hanafi',
    regions: [
      { name: { en: 'Belize District' }, cities: [['Belize City', 17.5046, -88.1962]] },
      { name: { en: 'Cayo District' }, cities: [['Belmopan', 17.2510, -88.7590]] },
    ],
  },
  {
    slug: 'honduras', cc: 'HN', continent: 'northAmerica', name: { en: 'Honduras' }, langs: ['es'],
    tz: 'America/Tegucigalpa', method: 'NorthAmerica', defaultSect: 'hanafi',
    regions: [
      { name: { en: 'Francisco Morazán' }, cities: [['Tegucigalpa', 14.0723, -87.1921]] },
      { name: { en: 'Cortés' }, cities: [['San Pedro Sula', 15.5042, -88.0250]] },
    ],
  },
  {
    slug: 'el-salvador', cc: 'SV', continent: 'northAmerica', name: { en: 'El Salvador' }, langs: ['es'],
    tz: 'America/El_Salvador', method: 'NorthAmerica', defaultSect: 'hanafi',
    regions: [
      { name: { en: 'San Salvador' }, cities: [['San Salvador', 13.6929, -89.2182]] },
      { name: { en: 'Santa Ana' }, cities: [['Santa Ana', 13.9942, -89.5597]] },
    ],
  },
  {
    slug: 'nicaragua', cc: 'NI', continent: 'northAmerica', name: { en: 'Nicaragua' }, langs: ['es'],
    tz: 'America/Managua', method: 'NorthAmerica', defaultSect: 'hanafi',
    regions: [
      { name: { en: 'Managua' }, cities: [['Managua', 12.1150, -86.2362]] },
      { name: { en: 'León' }, cities: [['León', 12.4379, -86.8780]] },
    ],
  },
  {
    slug: 'costa-rica', cc: 'CR', continent: 'northAmerica', name: { en: 'Costa Rica' }, langs: ['es'],
    tz: 'America/Costa_Rica', method: 'NorthAmerica', defaultSect: 'hanafi',
    regions: [
      { name: { en: 'San José' }, cities: [['San José', 9.9281, -84.0907]] },
      { name: { en: 'Limón' }, cities: [['Limón', 9.9907, -83.0359]] },
    ],
  },
  {
    slug: 'panama', cc: 'PA', continent: 'northAmerica', name: { en: 'Panama' }, langs: ['es'],
    tz: 'America/Panama', method: 'NorthAmerica', defaultSect: 'hanafi',
    regions: [
      { name: { en: 'Panamá' }, cities: [['Panama City', 8.9824, -79.5199, { es: 'Ciudad de Panamá' }]] },
      { name: { en: 'Colón' }, cities: [['Colón', 9.3547, -79.9001]] },
    ],
  },
  {
    slug: 'cuba', cc: 'CU', continent: 'northAmerica', name: { en: 'Cuba' }, langs: ['es'],
    tz: 'America/Havana', method: 'NorthAmerica', defaultSect: 'hanafi',
    regions: [
      { name: { en: 'Havana', es: 'La Habana' }, cities: [['Havana', 23.1136, -82.3666, { es: 'La Habana' }]] },
      { name: { en: 'Santiago de Cuba' }, cities: [['Santiago de Cuba', 20.0247, -75.8219]] },
    ],
  },
  {
    slug: 'jamaica', cc: 'JM', continent: 'northAmerica', name: { en: 'Jamaica' }, langs: ['en'],
    tz: 'America/Jamaica', method: 'NorthAmerica', defaultSect: 'hanafi',
    regions: [
      { name: { en: 'Kingston' }, cities: [['Kingston', 17.9712, -76.7936]] },
      { name: { en: 'Saint James' }, cities: [['Montego Bay', 18.4762, -77.8939]] },
    ],
  },
  {
    slug: 'haiti', cc: 'HT', continent: 'northAmerica', name: { en: 'Haiti' }, langs: ['fr'],
    tz: 'America/Port-au-Prince', method: 'NorthAmerica', defaultSect: 'hanafi',
    regions: [
      { name: { en: 'West', fr: 'Ouest' }, cities: [['Port-au-Prince', 18.5944, -72.3074]] },
      { name: { en: 'North', fr: 'Nord' }, cities: [['Cap-Haïtien', 19.7580, -72.2046]] },
    ],
  },
  {
    slug: 'dominican-republic', cc: 'DO', continent: 'northAmerica', name: { en: 'Dominican Republic' }, langs: ['es'],
    tz: 'America/Santo_Domingo', method: 'NorthAmerica', defaultSect: 'hanafi',
    regions: [
      { name: { en: 'National District', es: 'Distrito Nacional' }, cities: [['Santo Domingo', 18.4861, -69.9312]] },
      { name: { en: 'Santiago' }, cities: [['Santiago de los Caballeros', 19.4517, -70.6970]] },
    ],
  },
  {
    slug: 'bahamas', cc: 'BS', continent: 'northAmerica', name: { en: 'Bahamas' }, langs: ['en'],
    tz: 'America/Nassau', method: 'NorthAmerica', defaultSect: 'hanafi',
    regions: [
      { name: { en: 'New Providence' }, cities: [['Nassau', 25.0443, -77.3504]] },
      { name: { en: 'Grand Bahama' }, cities: [['Freeport', 26.5333, -78.7000]] },
    ],
  },
  {
    slug: 'barbados', cc: 'BB', continent: 'northAmerica', name: { en: 'Barbados' }, langs: ['en'],
    tz: 'America/Barbados', method: 'NorthAmerica', defaultSect: 'hanafi',
    regions: [{ name: { en: 'Saint Michael' }, cities: [['Bridgetown', 13.0975, -59.6167]] }],
  },
  {
    slug: 'trinidad-and-tobago', cc: 'TT', continent: 'northAmerica', name: { en: 'Trinidad and Tobago' }, langs: ['en'],
    tz: 'America/Port_of_Spain', method: 'NorthAmerica', defaultSect: 'hanafi',
    regions: [
      {
        name: { en: 'Trinidad' },
        cities: [
          ['Port of Spain', 10.6549, -61.5019],
          ['San Fernando', 10.2796, -61.4589],
          ['Chaguanas', 10.5168, -61.4115],
        ],
      },
    ],
  },
  {
    slug: 'grenada', cc: 'GD', continent: 'northAmerica', name: { en: 'Grenada' }, langs: ['en'],
    tz: 'America/Grenada', method: 'NorthAmerica', defaultSect: 'hanafi',
    regions: [{ name: { en: 'Saint George' }, cities: [['St. George’s', 12.0561, -61.7488]] }],
  },
  {
    slug: 'saint-lucia', cc: 'LC', continent: 'northAmerica', name: { en: 'Saint Lucia' }, langs: ['en'],
    tz: 'America/St_Lucia', method: 'NorthAmerica', defaultSect: 'hanafi',
    regions: [{ name: { en: 'Castries' }, cities: [['Castries', 14.0101, -60.9875]] }],
  },
  {
    slug: 'saint-vincent-and-the-grenadines', cc: 'VC', continent: 'northAmerica', name: { en: 'Saint Vincent and the Grenadines' }, langs: ['en'],
    tz: 'America/St_Vincent', method: 'NorthAmerica', defaultSect: 'hanafi',
    regions: [{ name: { en: 'Saint George' }, cities: [['Kingstown', 13.1600, -61.2248]] }],
  },
  {
    slug: 'antigua-and-barbuda', cc: 'AG', continent: 'northAmerica', name: { en: 'Antigua and Barbuda' }, langs: ['en'],
    tz: 'America/Antigua', method: 'NorthAmerica', defaultSect: 'hanafi',
    regions: [{ name: { en: 'Saint John' }, cities: [['St. John’s', 17.1274, -61.8468]] }],
  },
  {
    slug: 'dominica', cc: 'DM', continent: 'northAmerica', name: { en: 'Dominica' }, langs: ['en'],
    tz: 'America/Dominica', method: 'NorthAmerica', defaultSect: 'hanafi',
    regions: [{ name: { en: 'Saint George' }, cities: [['Roseau', 15.3010, -61.3870]] }],
  },
  {
    slug: 'saint-kitts-and-nevis', cc: 'KN', continent: 'northAmerica', name: { en: 'Saint Kitts and Nevis' }, langs: ['en'],
    tz: 'America/St_Kitts', method: 'NorthAmerica', defaultSect: 'hanafi',
    regions: [{ name: { en: 'Saint Kitts' }, cities: [['Basseterre', 17.3026, -62.7177]] }],
  },
];
