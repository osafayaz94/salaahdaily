/*
 * Europe, added in phases. Same format as data-mea.js: T(english, lat, lng, 'ur|hi|bn|fa', { ar, tr, ... }, tz).
 * Turkish (tr) names are given where Turkish has its own historical name (Saraybosna, Üsküp, Manastır...).
 *
 * Phase 1 (2026-09-29): Bosnia and Herzegovina, Albania, Kosovo, North Macedonia.
 *   Bosnia: the Islamic Community's own method, fitted to vaktija.ba; its takvim uses the first Asr time.
 *   Kosovo: fitted to the BIK takvim (one reference table for the country); also the first Asr time.
 *   Albania, North Macedonia: no official timetable found online, so Muslim World League and Hanafi.
 * Phase 2 (2026-09-29): France, Germany. Phase 3: Netherlands, Belgium, Luxembourg, Switzerland, Austria.
 */
function split(s) {
  if (!s) return {};
  var p = s.split('|');
  return { ur: p[0], hi: p[1], bn: p[2], fa: p[3] };
}
function T(en, lat, lng, names, extra, tz) { return [en, lat, lng, Object.assign(split(names), extra || {}), tz]; }
function R(en, names, extra, cities) { return { name: Object.assign({ en: en }, split(names), extra || {}), cities: cities }; }
// "<name> County" in each script, for Albania's twelve counties (qarqe).
function county(en, ur, hi, bn, fa, ar, tr) { return R(en + ' County', ur + ' کاؤنٹی|' + hi + ' काउंटी|' + bn + ' কাউন্টি|شهرستان ' + fa, { ar: 'مقاطعة ' + ar, tr: tr + ' ili' }, []); }

module.exports = [
  {
    slug: 'bosnia-and-herzegovina', cc: 'BA', continent: 'europe', name: { en: 'Bosnia and Herzegovina' }, langs: ['en'],
    tz: 'Europe/Sarajevo', method: 'Bosnia', defaultSect: 'shafii', // official takvim: first Asr time (like Diyanet)
    regions: [
      R('Federation of Bosnia and Herzegovina', 'وفاقِ بوسنیا و ہرزیگووینا|बोस्निया और हर्ज़ेगोविना संघ|বসনিয়া ও হার্জেগোভিনা ফেডারেশন|فدراسیون بوسنی و هرزگوین', { ar: 'اتحاد البوسنة والهرسك', tr: 'Bosna-Hersek Federasyonu' }, [
        T('Sarajevo', 43.8563, 18.4131, 'سرائیوو|सरायेवो|সারায়েভো|سارایوو', { ar: 'سراييفو', tr: 'Saraybosna' }),
        T('Tuzla', 44.5384, 18.6763, 'توزلا|तुज़्ला|তুজলা|توزلا', { ar: 'توزلا' }),
        T('Zenica', 44.2034, 17.9077, 'زینیتسا|ज़ेनित्सा|জেনিৎসা|زنیتسا', { ar: 'زينيتسا' }),
        T('Mostar', 43.3438, 17.8078, 'موستار|मोस्तार|মোস্তার|موستار', { ar: 'موستار' }),
        T('Bihać', 44.8169, 15.8708, 'بیہاچ|बिहाच|বিহাচ|بیهاچ', { ar: 'بيهاتش' }),
        T('Cazin', 44.9669, 15.9431, 'کازین|काज़िन|কাজিন|کازین', { ar: 'كازين' }),
        T('Velika Kladuša', 45.1842, 15.8053, 'ویلیکا کلادوشا|वेलिका क्लादुशा|ভেলিকা ক্লাদুশা|ولیکا کلادوشا', { ar: 'فيليكا كلادوشا' }),
        T('Travnik', 44.2264, 17.6658, 'ٹراونک|त्राव्निक|ত্রাভনিক|تراونیک', { ar: 'ترافنيك' }),
        T('Bugojno', 44.0572, 17.4508, 'بوگوینو|बुगोइनो|বুগোইনো|بوگوینو', { ar: 'بوغوينو' }),
        T('Visoko', 43.9889, 18.1781, 'ویسوکو|विसोको|ভিসোকো|ویسوکو', { ar: 'فيسوكو' }),
        T('Goražde', 43.6667, 18.9764, 'گوراژدے|गोराज़्दे|গোরাজদে|گوراژده', { ar: 'غوراجده' }),
        T('Konjic', 43.6519, 17.9611, 'کونیتس|कोन्यित्स|কোনিৎস|کونیتس', { ar: 'كونيتس' }),
        T('Gračanica', 44.7031, 18.3083, 'گراچانیتسا|ग्राचानित्सा|গ্রাচানিৎসা|گراچانیتسا', { ar: 'غراتشانيتسا' }),
        T('Živinice', 44.4494, 18.6497, 'ژیوینیتسے|ज़िविनित्से|জিভিনিৎসে|ژیوینیتسه', { ar: 'جيفينيتسه' }),
      ]),
      R('Republika Srpska', 'ریپبلیکا سرپسکا|रिपब्लिका सर्प्स्का|রিপাবলিকা সর্পস্কা|جمهوری صرپسکا', { ar: 'جمهورية صرب البوسنة', tr: 'Sırp Cumhuriyeti' }, [
        T('Banja Luka', 44.7722, 17.1910, 'بانیا لوکا|बान्या लूका|বানিয়া লুকা|بانیالوکا', { ar: 'بانيا لوكا' }),
        T('Bijeljina', 44.7569, 19.2161, 'بیئیلینا|बियेलिना|বিয়েলিনা|بیلینا', { ar: 'بييلينا' }),
        T('Doboj', 44.7349, 18.0843, 'دوبوئی|दोबोय|দোবোই|دوبوی', { ar: 'دوبوي' }),
        T('Prijedor', 44.9800, 16.7131, 'پریئیدور|प्रियेदोर|প্রিয়েদর|پریدور', { ar: 'بريدور' }),
        T('Zvornik', 44.3842, 19.1031, 'زوورنک|ज़्वोर्निक|জভোর্নিক|زوورنیک', { ar: 'زفورنيك' }),
        T('Srebrenica', 44.1061, 19.2972, 'سریبرینیتسا|स्रेब्रेनित्सा|স্রেব্রেনিৎসা|سربرنیتسا', { ar: 'سربرنيتسا' }),
        T('Foča', 43.5064, 18.7756, 'فوچا|फ़ोचा|ফোচা|فوچا', { ar: 'فوتشا' }),
      ]),
      R('Brčko District', 'ضلع برچکو|ब्रचको ज़िला|ব্রচকো জেলা|ناحیه برچکو', { ar: 'مقاطعة برتشكو', tr: 'Brčko Bölgesi' }, [
        T('Brčko', 44.8728, 18.8106, 'برچکو|ब्रचको|ব্রচকো|برچکو', { ar: 'برتشكو' }),
      ]),
    ],
  },
  {
    slug: 'albania', cc: 'AL', continent: 'europe', name: { en: 'Albania' }, langs: ['en'],
    tz: 'Europe/Tirane', method: 'MuslimWorldLeague', defaultSect: 'hanafi',
    regions: [
      Object.assign(county('Tirana', 'ترانہ', 'तिराना', 'তিরানা', 'تیرانا', 'تيرانا', 'Tiran'), { cities: [
        T('Tirana', 41.3275, 19.8187, 'ترانہ|तिराना|তিরানা|تیرانا', { ar: 'تيرانا', tr: 'Tiran' }),
      ] }),
      Object.assign(county('Durrës', 'دوریس', 'दुरेस', 'দুরেস', 'دورس', 'دوريس', 'Draç'), { cities: [
        T('Durrës', 41.3246, 19.4565, 'دوریس|दुरेस|দুরেস|دورس', { ar: 'دوريس', tr: 'Draç' }),
        T('Kavajë', 41.1856, 19.5569, 'کاوایا|कावाया|কাভায়া|کاوایه', { ar: 'كافايا' }),
      ] }),
      Object.assign(county('Elbasan', 'ایلباسان', 'एल्बासान', 'এলবাসান', 'الباسان', 'إلباسان', 'İlbasan'), { cities: [
        T('Elbasan', 41.1125, 20.0822, 'ایلباسان|एल्बासान|এলবাসান|الباسان', { ar: 'إلباسان', tr: 'İlbasan' }),
      ] }),
      Object.assign(county('Shkodër', 'شکودر', 'श्कोदेर', 'শকোদের', 'شکودر', 'شكودر', 'İşkodra'), { cities: [
        T('Shkodër', 42.0683, 19.5126, 'شکودر|श्कोदेर|শকোদের|شکودر', { ar: 'شكودر', tr: 'İşkodra' }),
      ] }),
      Object.assign(county('Vlorë', 'ولورا', 'व्लोरा', 'ভ্লোরা', 'ولورا', 'فلوره', 'Avlonya'), { cities: [
        T('Vlorë', 40.4667, 19.4897, 'ولورا|व्लोरा|ভ্লোরা|ولورا', { ar: 'فلوره', tr: 'Avlonya' }),
        T('Sarandë', 39.8756, 20.0053, 'سارندا|सारांदा|সারান্দা|ساراندا', { ar: 'ساراندا' }),
      ] }),
      Object.assign(county('Fier', 'فیئر', 'फ़िएर', 'ফিয়ের', 'فیر', 'فيير', 'Fier'), { cities: [
        T('Fier', 40.7239, 19.5561, 'فیئر|फ़िएर|ফিয়ের|فیر', { ar: 'فيير' }),
        T('Lushnjë', 40.9419, 19.7050, 'لوشنیا|लुश्न्या|লুশনিয়া|لوشنیه', { ar: 'لوشنيا' }),
      ] }),
      Object.assign(county('Korçë', 'کورچا', 'कोर्चा', 'কোর্চা', 'کورچه', 'كورتشا', 'Görice'), { cities: [
        T('Korçë', 40.6186, 20.7808, 'کورچا|कोर्चा|কোর্চা|کورچه', { ar: 'كورتشا', tr: 'Görice' }),
        T('Pogradec', 40.9025, 20.6525, 'پوگرادیتس|पोग्रादेत्स|পোগ্রাদেৎস|پوگرادتس', { ar: 'بوغراديتس' }),
      ] }),
      Object.assign(county('Berat', 'بیرات', 'बेरात', 'বেরাত', 'برات', 'بيرات', 'Berat'), { cities: [
        T('Berat', 40.7058, 19.9522, 'بیرات|बेरात|বেরাত|برات', { ar: 'بيرات' }),
      ] }),
      Object.assign(county('Dibër', 'دیبر', 'दिबेर', 'দিবের', 'دیبر', 'ديبر', 'Debre'), { cities: [
        T('Peshkopi', 41.6850, 20.4289, 'پیشکوپی|पेश्कोपी|পেশকোপি|پشکوپی', { ar: 'بيشكوبي' }),
      ] }),
      Object.assign(county('Kukës', 'کوکس', 'कुकेस', 'কুকেস', 'کوکس', 'كوكس', 'Kukës'), { cities: [
        T('Kukës', 42.0767, 20.4219, 'کوکس|कुकेस|কুকেস|کوکس', { ar: 'كوكس' }),
      ] }),
      Object.assign(county('Lezhë', 'لیژا', 'लेझा', 'লেজা', 'لژه', 'ليجا', 'Leş'), { cities: [
        T('Lezhë', 41.7836, 19.6436, 'لیژا|लेझा|লেজা|لژه', { ar: 'ليجا', tr: 'Leş' }),
      ] }),
      Object.assign(county('Gjirokastër', 'جیروکاستر', 'ग्यिरोकास्तर', 'জিরোকাস্তের', 'جیروکاستر', 'جيروكاستر', 'Ergiri'), { cities: [
        T('Gjirokastër', 40.0758, 20.1389, 'جیروکاستر|ग्यिरोकास्तर|জিরোকাস্তের|جیروکاستر', { ar: 'جيروكاستر', tr: 'Ergiri' }),
      ] }),
    ],
  },
  {
    slug: 'kosovo', cc: 'XK', continent: 'europe', name: { en: 'Kosovo' }, langs: ['en'],
    tz: 'Europe/Belgrade', method: 'Kosovo', defaultSect: 'shafii', // BIK takvim: first Asr time
    regions: [
      R('Pristina District', 'ضلع پرسٹینا|प्रिश्टीना ज़िला|প্রিস্টিনা জেলা|ناحیه پریشتینا', { ar: 'منطقة بريشتينا', tr: 'Priştine bölgesi' }, [
        T('Pristina', 42.6629, 21.1655, 'پرسٹینا|प्रिश्टीना|প্রিস্টিনা|پریشتینا', { ar: 'بريشتينا', tr: 'Priştine' }),
        T('Podujevo', 42.9106, 21.1933, 'پودوئیوو|पोदुयेवो|পোদুয়েভো|پودویوو', { ar: 'بودوييفو' }),
      ]),
      R('Prizren District', 'ضلع پریزرین|प्रिज़रेन ज़िला|প্রিজরেন জেলা|ناحیه پریزرن', { ar: 'منطقة بريزرن', tr: 'Prizren bölgesi' }, [
        T('Prizren', 42.2139, 20.7397, 'پریزرین|प्रिज़रेन|প্রিজরেন|پریزرن', { ar: 'بريزرن' }),
        T('Suhareka', 42.3589, 20.8250, 'سوہاریکا|सुहारेका|সুহারেকা|سوهارکا', { ar: 'سوهاريكا' }),
      ]),
      R('Peja District', 'ضلع پیجا|पेया ज़िला|পেয়া জেলা|ناحیه پیا', { ar: 'منطقة بيا', tr: 'İpek bölgesi' }, [
        T('Peja', 42.6593, 20.2887, 'پیجا|पेया|পেয়া|پیا', { ar: 'بيا', tr: 'İpek' }),
        T('Deçan', 42.5403, 20.2878, 'دیچان|देचान|দেচান|دچان', { ar: 'ديتشان' }),
      ]),
      R('Gjakova District', 'ضلع جیاکووا|ग्याकोवा ज़िला|জাকোভা জেলা|ناحیه جاکووا', { ar: 'منطقة جاكوفا', tr: 'Yakova bölgesi' }, [
        T('Gjakova', 42.3803, 20.4308, 'جیاکووا|ग्याकोवा|জাকোভা|جاکووا', { ar: 'جاكوفا', tr: 'Yakova' }),
        T('Rahovec', 42.3994, 20.6547, 'راہووتس|राहोवेत्स|রাহোভেৎস|راهووتس', { ar: 'راهوفيتس' }),
      ]),
      R('Mitrovica District', 'ضلع متروویتسا|मित्रोवित्सा ज़िला|মিত্রোভিৎসা জেলা|ناحیه میتروویتسا', { ar: 'منطقة ميتروفيتسا', tr: 'Mitroviça bölgesi' }, [
        T('Mitrovica', 42.8914, 20.8660, 'متروویتسا|मित्रोवित्सा|মিত্রোভিৎসা|میتروویتسا', { ar: 'ميتروفيتسا', tr: 'Mitroviça' }),
        T('Vushtrri', 42.8231, 20.9675, 'وشتری|वुश्त्री|ভুশত্রি|وشتری', { ar: 'فوشتري' }),
      ]),
      R('Ferizaj District', 'ضلع فیریزای|फ़ेरिज़ाई ज़िला|ফেরিজাই জেলা|ناحیه فریزای', { ar: 'منطقة فيريزاي', tr: 'Ferizovik bölgesi' }, [
        T('Ferizaj', 42.3700, 21.1553, 'فیریزای|फ़ेरिज़ाई|ফেরিজাই|فریزای', { ar: 'فيريزاي', tr: 'Ferizovik' }),
      ]),
      R('Gjilan District', 'ضلع جیلان|ग्यिलान ज़िला|জিলান জেলা|ناحیه جیلان', { ar: 'منطقة جيلان', tr: 'Gilan bölgesi' }, [
        T('Gjilan', 42.4636, 21.4694, 'جیلان|ग्यिलान|জিলান|جیلان', { ar: 'جيلان', tr: 'Gilan' }),
      ]),
    ],
  },
  {
    slug: 'north-macedonia', cc: 'MK', continent: 'europe', name: { en: 'North Macedonia' }, langs: ['en'],
    tz: 'Europe/Skopje', method: 'MuslimWorldLeague', defaultSect: 'hanafi',
    regions: [
      R('Skopje Region', 'اسکوپیے علاقہ|स्कोप्ये क्षेत्र|স্কোপিয়ে অঞ্চল|منطقه اسکوپیه', { ar: 'منطقة سكوبيه', tr: 'Üsküp bölgesi' }, [
        T('Skopje', 41.9981, 21.4254, 'اسکوپیے|स्कोप्ये|স্কোপিয়ে|اسکوپیه', { ar: 'سكوبيه', tr: 'Üsküp' }),
      ]),
      R('Polog Region', 'پولوگ علاقہ|पोलोग क्षेत्र|পোলোগ অঞ্চল|منطقه پولوگ', { ar: 'منطقة بولوغ', tr: 'Pologa bölgesi' }, [
        T('Tetovo', 42.0106, 20.9714, 'ٹیٹووو|तेतोवो|তেতোভো|تتوو', { ar: 'تيتوفو', tr: 'Kalkandelen' }),
        T('Gostivar', 41.7961, 20.9086, 'گوستیوار|गोस्तिवार|গোস্তিভার|گوستیوار', { ar: 'غوستيفار' }),
      ]),
      R('Northeastern Region', 'شمال مشرقی علاقہ|पूर्वोत्तर क्षेत्र|উত্তর-পূর্ব অঞ্চল|منطقه شمال شرقی', { ar: 'المنطقة الشمالية الشرقية', tr: 'Kuzeydoğu bölgesi' }, [
        T('Kumanovo', 42.1322, 21.7144, 'کومانووو|कुमानोवो|কুমানোভো|کومانوو', { ar: 'كومانوفو', tr: 'Kumanova' }),
      ]),
      R('Southwestern Region', 'جنوب مغربی علاقہ|दक्षिण-पश्चिमी क्षेत्र|দক্ষিণ-পশ্চিম অঞ্চল|منطقه جنوب غربی', { ar: 'المنطقة الجنوبية الغربية', tr: 'Güneybatı bölgesi' }, [
        T('Struga', 41.1778, 20.6783, 'اسٹروگا|स्त्रुगा|স্ত্রুগা|استروگا', { ar: 'ستروغا', tr: 'Ustruga' }),
        T('Ohrid', 41.1172, 20.8019, 'اوہرد|ओहरिद|ওহরিদ|اوهرید', { ar: 'أوهريد', tr: 'Ohri' }),
        T('Kičevo', 41.5128, 20.9589, 'کیچیوو|किचेवो|কিচেভো|کیچوو', { ar: 'كيتشيفو', tr: 'Kırçova' }),
        T('Debar', 41.5244, 20.5242, 'دیبار|देबार|দেবার|دبار', { ar: 'ديبار', tr: 'Debre' }),
      ]),
      R('Pelagonia Region', 'پیلاگونیا علاقہ|पेलागोनिया क्षेत्र|পেলাগোনিয়া অঞ্চল|منطقه پلاگونیا', { ar: 'منطقة بيلاغونيا', tr: 'Pelagonya bölgesi' }, [
        T('Bitola', 41.0314, 21.3347, 'بیتولا|बितोला|বিতোলা|بیتولا', { ar: 'بيتولا', tr: 'Manastır' }),
        T('Prilep', 41.3464, 21.5542, 'پریلیپ|प्रिलेप|প্রিলেপ|پریلپ', { ar: 'بريليب', tr: 'Pirlepe' }),
      ]),
      R('Vardar Region', 'وردار علاقہ|वरदार क्षेत्र|ভারদার অঞ্চল|منطقه واردار', { ar: 'منطقة فاردار', tr: 'Vardar bölgesi' }, [
        T('Veles', 41.7156, 21.7756, 'ویلیس|वेलेस|ভেলেস|ولس', { ar: 'فيليس', tr: 'Köprülü' }),
      ]),
      R('Eastern Region', 'مشرقی علاقہ|पूर्वी क्षेत्र|পূর্বাঞ্চল|منطقه شرقی', { ar: 'المنطقة الشرقية', tr: 'Doğu bölgesi' }, [
        T('Štip', 41.7458, 22.1958, 'شتیپ|श्तिप|শতিপ|اشتیپ', { ar: 'شتيب', tr: 'İştip' }),
      ]),
    ],
  },
  // Phase 2 (2026-09-29): France and Germany.
  //   France: fitted to the Grande Mosquée de Paris calendar; Maliki, the majority school (and the calendar's Asr).
  //   Germany: Diyanet's European timetable (DITIB mosques); first Asr time, as that timetable prints.
  {
    slug: 'france', cc: 'FR', continent: 'europe', name: { en: 'France', fr: 'France' }, langs: ['fr'],
    tz: 'Europe/Paris', method: 'ParisGMP', defaultSect: 'maliki',
    regions: [
      R('Île-de-France', 'ال دو فرانس|इल-द-फ़्रांस|ইল-দ্য-ফ্রঁস|ایل‌دوفرانس', { ar: 'إيل دو فرانس', fr: 'Île-de-France' }, [
        T('Paris', 48.8566, 2.3522, 'پیرس|पेरिस|প্যারিস|پاریس', { ar: 'باريس', tr: 'Paris', es: 'París', fr: 'Paris' }),
        T('Saint-Denis', 48.9362, 2.3574, 'سینٹ ڈینس|सेंट-डेनिस|স্যাঁ-দ্যনি|سن-دنی', { ar: 'سان دوني', fr: 'Saint-Denis' }),
        T('Argenteuil', 48.9472, 2.2467, 'ارژانتوئی|अर्जांतोई|আর্জঁতোই|آرژانتوی', { ar: 'أرجنتوي', fr: 'Argenteuil' }),
        T('Montreuil', 48.8638, 2.4485, 'مونتروئی|मोंत्रुई|মঁত্রোই|مونتروی', { ar: 'مونتروي', fr: 'Montreuil' }),
        T('Créteil', 48.7904, 2.4556, 'کریتئی|क्रेतेई|ক্রেতেই|کرتی', { ar: 'كريتاي', fr: 'Créteil' }),
        T('Nanterre', 48.8924, 2.2071, 'نانتیر|नांतेर|নঁতের|نانتر', { ar: 'نانتير', fr: 'Nanterre' }),
      ]),
      R('Provence-Alpes-Côte d’Azur', 'پرووانس-آلپس-کوت دازور|प्रोवांस-आल्प्स-कोत दाज़ूर|প্রোভঁস-আল্প-কোত দাজুর|پروانس-آلپ-کوت دازور', { ar: 'بروفنس ألب كوت دازور', fr: 'Provence-Alpes-Côte d’Azur' }, [
        T('Marseille', 43.2965, 5.3698, 'مارسے|मार्सेय|মার্সেই|مارسی', { ar: 'مرسيليا', tr: 'Marsilya', es: 'Marsella', fr: 'Marseille' }),
        T('Nice', 43.7102, 7.2620, 'نیس|नीस|নিস|نیس', { ar: 'نيس', es: 'Niza', fr: 'Nice' }),
        T('Toulon', 43.1242, 5.9280, 'تولوں|तूलों|তুলোঁ|تولون', { ar: 'تولون', es: 'Tolón', fr: 'Toulon' }),
        T('Avignon', 43.9493, 4.8055, 'آوینیوں|आविन्यों|আভিনিয়োঁ|آوینیون', { ar: 'أفينيون', es: 'Aviñón', fr: 'Avignon' }),
      ]),
      R('Auvergne-Rhône-Alpes', 'اوورنی-رون-آلپس|ओवेर्न्य-रोन-आल्प्स|ওভের্ন-রোন-আল্প|اوورن-رون-آلپ', { ar: 'أوفرن رون ألب', fr: 'Auvergne-Rhône-Alpes' }, [
        T('Lyon', 45.7640, 4.8357, 'لیوں|ल्यों|লিয়ঁ|لیون', { ar: 'ليون', fr: 'Lyon' }),
        T('Villeurbanne', 45.7719, 4.8902, 'ولیوربان|विलर्बान|ভিলরবান|ویلوربان', { ar: 'فيلوربان', fr: 'Villeurbanne' }),
        T('Grenoble', 45.1885, 5.7245, 'گرینوبل|ग्रेनोबल|গ্রনোব্ল|گرنوبل', { ar: 'غرونوبل', fr: 'Grenoble' }),
        T('Saint-Étienne', 45.4397, 4.3872, 'سینٹ ایتیین|सेंट-एतिएन|স্যাঁ-তেতিয়েন|سنت اتین', { ar: 'سانت إتيان', fr: 'Saint-Étienne' }),
        T('Clermont-Ferrand', 45.7772, 3.0870, 'کلیرموں فیراں|क्लेरमों-फ़ेरां|ক্লেরমঁ-ফেরঁ|کلرمون فران', { ar: 'كليرمون فيران', fr: 'Clermont-Ferrand' }),
      ]),
      R('Occitania', 'اوکسیتانی|ओक्सितानी|অক্সিতানি|اکسیتانی', { ar: 'أوكسيتانيا', fr: 'Occitanie', es: 'Occitania' }, [
        T('Toulouse', 43.6047, 1.4442, 'تولوز|तूलूज़|তুলুজ|تولوز', { ar: 'تولوز', tr: 'Tuluz', fr: 'Toulouse' }),
        T('Montpellier', 43.6108, 3.8767, 'مونپلیے|मोंपेलिए|মঁপেলিয়ে|مون‌پلیه', { ar: 'مونبلييه', fr: 'Montpellier' }),
        T('Nîmes', 43.8367, 4.3601, 'نیم|नीम|নিম|نیم', { ar: 'نيم', es: 'Nimes', fr: 'Nîmes' }),
        T('Perpignan', 42.6887, 2.8948, 'پرپینیاں|पेर्पिन्यां|পের্পিনিয়ঁ|پرپینیان', { ar: 'بربينيان', es: 'Perpiñán', fr: 'Perpignan' }),
      ]),
      R('Hauts-de-France', 'او-دو-فرانس|ओ-द-फ़्रांस|ও-দ্য-ফ্রঁস|او-دو-فرانس', { ar: 'أو دو فرانس', fr: 'Hauts-de-France' }, [
        T('Lille', 50.6292, 3.0573, 'لیل|लील|লিল|لیل', { ar: 'ليل', fr: 'Lille' }),
        T('Roubaix', 50.6942, 3.1746, 'روبے|रूबे|রুবে|روبه', { ar: 'روبيه', fr: 'Roubaix' }),
        T('Amiens', 49.8941, 2.2958, 'امیاں|आमियां|আমিয়াঁ|آمیان', { ar: 'أميان', fr: 'Amiens' }),
      ]),
      R('Grand Est', 'گراں ایست|ग्रां एस्त|গ্রঁ এস্ত|گرند است', { ar: 'الشرق الكبير', fr: 'Grand Est' }, [
        T('Strasbourg', 48.5734, 7.7521, 'اسٹراسبرگ|स्ट्रासबर्ग|স্ট্রাসবুর্গ|استراسبورگ', { ar: 'ستراسبورغ', tr: 'Strazburg', es: 'Estrasburgo', fr: 'Strasbourg' }),
        T('Mulhouse', 47.7508, 7.3359, 'مولوز|म्यूलूज़|মুলুজ|مولوز', { ar: 'مولوز', fr: 'Mulhouse' }),
        T('Reims', 49.2583, 4.0317, 'رینس|रैंस|র‍্যাঁস|رنس', { ar: 'ريمس', fr: 'Reims' }),
        T('Metz', 49.1193, 6.1757, 'میس|मेस|মেস|متز', { ar: 'ميتز', fr: 'Metz' }),
        T('Nancy', 48.6921, 6.1844, 'نانسی|नांसी|নঁসি|نانسی', { ar: 'نانسي', fr: 'Nancy' }),
      ]),
      R('Nouvelle-Aquitaine', 'نوول-اکیتین|नूवेल-अक्वितेन|নুভেল-আকিতেন|نوول-آکیتن', { ar: 'آكيتين الجديدة', fr: 'Nouvelle-Aquitaine' }, [
        T('Bordeaux', 44.8378, -0.5792, 'بورڈو|बोर्दो|বোর্দো|بوردو', { ar: 'بوردو', tr: 'Bordo', es: 'Burdeos', fr: 'Bordeaux' }),
        T('Limoges', 45.8336, 1.2611, 'لیموژ|लिमोज़|লিমোজ|لیموژ', { ar: 'ليموج', fr: 'Limoges' }),
        T('Poitiers', 46.5802, 0.3404, 'پواتیے|पुआतिए|পোয়াতিয়ে|پواتیه', { ar: 'بواتييه', fr: 'Poitiers' }),
      ]),
      R('Pays de la Loire', 'پے دا لا لوار|पे द ला लोआर|পে দ্য লা লোয়ার|پی دو لا لوار', { ar: 'بلاد اللوار', fr: 'Pays de la Loire' }, [
        T('Nantes', 47.2184, -1.5536, 'نانت|नांत|নঁত|نانت', { ar: 'نانت', fr: 'Nantes' }),
        T('Angers', 47.4784, -0.5632, 'آنژے|आंजे|আঁজে|آنژه', { ar: 'أنجيه', fr: 'Angers' }),
        T('Le Mans', 48.0061, 0.1996, 'لے ماں|ल मां|ল্য মঁ|لومان', { ar: 'لومان', fr: 'Le Mans' }),
      ]),
      R('Brittany', 'بریتانی|ब्रिटनी|ব্রিটানি|برتانی', { ar: 'بريتاني', fr: 'Bretagne', es: 'Bretaña' }, [
        T('Rennes', 48.1173, -1.6778, 'رین|रेन|রেন|رن', { ar: 'رين', fr: 'Rennes' }),
        T('Brest', 48.3904, -4.4861, 'بریسٹ|ब्रेस्ट|ব্রেস্ট|برست', { ar: 'بريست', fr: 'Brest' }),
      ]),
      R('Normandy', 'نارمنڈی|नॉरमंडी|নরম্যান্ডি|نرماندی', { ar: 'نورماندي', fr: 'Normandie', es: 'Normandía' }, [
        T('Rouen', 49.4432, 1.0999, 'روآں|रूआं|রুয়াঁ|روآن', { ar: 'روان', es: 'Ruan', fr: 'Rouen' }),
        T('Le Havre', 49.4944, 0.1079, 'لے آور|ल आव्र|ল্য আভ্র|لوهاور', { ar: 'لوهافر', es: 'El Havre', fr: 'Le Havre' }),
        T('Caen', 49.1829, -0.3707, 'کاں|कां|কঁ|کان', { ar: 'كان', fr: 'Caen' }),
      ]),
      R('Centre-Val de Loire', 'سانتر-وال دے لوار|सांत्र-वाल द लोआर|সঁত্র-ভাল দ্য লোয়ার|سانتر-وال دو لوار', { ar: 'سانتر فال دو لوار', fr: 'Centre-Val de Loire' }, [
        T('Tours', 47.3941, 0.6848, 'تور|तूर|তুর|تور', { ar: 'تور', fr: 'Tours' }),
        T('Orléans', 47.9030, 1.9093, 'اورلیاں|ओर्लेआं|অর্লেয়াঁ|اورلئان', { ar: 'أورليان', es: 'Orleans', fr: 'Orléans' }),
      ]),
      R('Bourgogne-Franche-Comté', 'بورگونی-فرانش-کونتے|बुर्गोन्य-फ़्रांश-कोंते|বুর্গোন্য-ফ্রঁশ-কোঁতে|بورگونی-فرانش-کنته', { ar: 'بورغونيا فرانش كونته', fr: 'Bourgogne-Franche-Comté' }, [
        T('Dijon', 47.3220, 5.0415, 'دیژوں|दीजों|দিজোঁ|دیژون', { ar: 'ديجون', fr: 'Dijon' }),
        T('Besançon', 47.2378, 6.0241, 'بیزانسوں|बेज़ांसों|বেজঁসঁ|بزانسون', { ar: 'بيزانسون', es: 'Besanzón', fr: 'Besançon' }),
      ]),
      R('Corsica', 'کورسیکا|कोर्सिका|কর্সিকা|کرس', { ar: 'كورسيكا', fr: 'Corse', es: 'Córcega' }, [
        T('Ajaccio', 41.9192, 8.7386, 'اجاکسیو|अजाच्चो|আজাচো|آژاکسیو', { ar: 'أجاكسيو', fr: 'Ajaccio' }),
      ]),
    ],
  },
  {
    slug: 'germany', cc: 'DE', continent: 'europe', name: { en: 'Germany' }, langs: ['en'],
    tz: 'Europe/Berlin', method: 'DiyanetEurope', defaultSect: 'shafii', // DITIB's timetable prints the first Asr time
    regions: [
      R('Berlin', 'برلن|बर्लिन|বার্লিন|برلین', { ar: 'برلين', es: 'Berlín' }, [
        T('Berlin', 52.5200, 13.4050, 'برلن|बर्लिन|বার্লিন|برلین', { ar: 'برلين', es: 'Berlín' }),
      ]),
      R('Hamburg', 'ہیمبرگ|हैम्बर्ग|হামবুর্গ|هامبورگ', { ar: 'هامبورغ', es: 'Hamburgo', fr: 'Hambourg' }, [
        T('Hamburg', 53.5511, 9.9937, 'ہیمبرگ|हैम्बर्ग|হামবুর্গ|هامبورگ', { ar: 'هامبورغ', es: 'Hamburgo', fr: 'Hambourg' }),
      ]),
      R('Bremen', 'بریمن|ब्रेमेन|ব্রেমেন|برمن', { ar: 'بريمن', fr: 'Brême' }, [
        T('Bremen', 53.0793, 8.8017, 'بریمن|ब्रेमेन|ব্রেমেন|برمن', { ar: 'بريمن', fr: 'Brême' }),
      ]),
      R('Bavaria', 'باویریا|बवेरिया|বাভারিয়া|بایرن', { ar: 'بافاريا', tr: 'Bavyera', es: 'Baviera', fr: 'Bavière' }, [
        T('Munich', 48.1351, 11.5820, 'میونخ|म्यूनिख़|মিউনিখ|مونیخ', { ar: 'ميونخ', tr: 'Münih', es: 'Múnich', fr: 'Munich' }),
        T('Nuremberg', 49.4521, 11.0767, 'نیورمبرگ|न्यूरेमबर्ग|নুরেমবার্গ|نورنبرگ', { ar: 'نورنبرغ', tr: 'Nürnberg', es: 'Núremberg', fr: 'Nuremberg' }),
        T('Augsburg', 48.3705, 10.8978, 'آؤگسبرگ|आउग्सबर्ग|আউগসবুর্গ|آگسبورگ', { ar: 'أوغسبورغ', es: 'Augsburgo', fr: 'Augsbourg' }),
        T('Ingolstadt', 48.7665, 11.4258, 'انگولشٹاٹ|इंगोलश्टाट|ইঙ্গোলস্টাট|اینگولشتات', { ar: 'إنغولشتات' }),
      ]),
      R('North Rhine-Westphalia', 'نارتھ رائن-ویسٹ فیلیا|नॉर्थ राइन-वेस्टफ़ेलिया|নর্থ রাইন-ওয়েস্টফালিয়া|نوردراین-وستفالن', { ar: 'شمال الراين وستفاليا', tr: 'Kuzey Ren-Vestfalya', es: 'Renania del Norte-Westfalia', fr: 'Rhénanie-du-Nord-Westphalie' }, [
        T('Cologne', 50.9375, 6.9603, 'کولون|कोलोन|কোলন|کلن', { ar: 'كولونيا', tr: 'Köln', es: 'Colonia', fr: 'Cologne' }),
        T('Düsseldorf', 51.2277, 6.7735, 'ڈسلڈورف|ड्यूसलडॉर्फ़|ডুসেলডর্ফ|دوسلدورف', { ar: 'دوسلدورف' }),
        T('Dortmund', 51.5136, 7.4653, 'ڈورٹمنڈ|डॉर्टमुंड|ডর্টমুন্ড|دورتموند', { ar: 'دورتموند' }),
        T('Essen', 51.4556, 7.0116, 'ایسن|एसेन|এসেন|اسن', { ar: 'إسن' }),
        T('Duisburg', 51.4344, 6.7623, 'ڈوئسبرگ|डुइसबर्ग|ডুইসবুর্গ|دویسبورگ', { ar: 'دويسبورغ' }),
        T('Bochum', 51.4818, 7.2162, 'بوخم|बोखुम|বোখুম|بوخوم', { ar: 'بوخوم' }),
        T('Wuppertal', 51.2562, 7.1508, 'ووپرٹال|वुपर्टाल|ভুপারটাল|ووپرتال', { ar: 'فوبرتال' }),
        T('Bielefeld', 52.0302, 8.5325, 'بیلیفیلڈ|बीलेफ़ेल्ड|বিলেফেল্ড|بیله‌فلد', { ar: 'بيلفيلد' }),
        T('Bonn', 50.7374, 7.0982, 'بون|बॉन|বন|بن', { ar: 'بون' }),
        T('Gelsenkirchen', 51.5177, 7.0857, 'گیلزنکرشن|गेल्सेनकिर्शन|গেলজেনকির্খেন|گلزنکیرشن', { ar: 'غلزنكيرشن' }),
        T('Münster', 51.9607, 7.6261, 'مونسٹر|म्युंस्टर|মুনস্টার|مونستر', { ar: 'مونستر' }),
        T('Aachen', 50.7753, 6.0839, 'آخن|आखेन|আখেন|آخن', { ar: 'آخن', es: 'Aquisgrán', fr: 'Aix-la-Chapelle' }),
      ]),
      R('Baden-Württemberg', 'باڈن-ورٹمبرگ|बाडेन-वुर्टेमबर्ग|বাডেন-ভুর্টেমবার্গ|بادن-وورتمبرگ', { ar: 'بادن فورتمبيرغ' }, [
        T('Stuttgart', 48.7758, 9.1829, 'اشٹٹگارٹ|स्टुटगार्ट|স্টুটগার্ট|اشتوتگارت', { ar: 'شتوتغارت' }),
        T('Mannheim', 49.4875, 8.4660, 'مان ہائم|मानहाइम|মানহাইম|مانهایم', { ar: 'مانهايم' }),
        T('Karlsruhe', 49.0069, 8.4037, 'کارلسروہے|कार्ल्सरूहे|কার্লসরুহে|کارلسروهه', { ar: 'كارلسروه' }),
        T('Freiburg', 47.9990, 7.8421, 'فرائیبرگ|फ़्राइबर्ग|ফ্রাইবুর্গ|فرایبورگ', { ar: 'فرايبورغ' }),
        T('Ulm', 48.4011, 9.9876, 'اولم|उल्म|উল্ম|اولم', { ar: 'أولم' }),
      ]),
      R('Hesse', 'ہیسے|हेसे|হেসে|هسن', { ar: 'هسن', tr: 'Hessen', es: 'Hesse', fr: 'Hesse' }, [
        T('Frankfurt', 50.1109, 8.6821, 'فرینکفرٹ|फ़्रैंकफ़र्ट|ফ্রাঙ্কফুর্ট|فرانکفورت', { ar: 'فرانكفورت', es: 'Fráncfort', fr: 'Francfort' }),
        T('Wiesbaden', 50.0782, 8.2398, 'ویزبادن|वीसबाडेन|ভিসবাডেন|ویسبادن', { ar: 'فيسبادن' }),
        T('Offenbach', 50.0956, 8.7761, 'اوفن باخ|ओफ़ेनबाख़|অফেনবাখ|اوفنباخ', { ar: 'أوفنباخ' }),
        T('Kassel', 51.3127, 9.4797, 'کاسل|कासेल|কাসেল|کاسل', { ar: 'كاسل' }),
      ]),
      R('Lower Saxony', 'لوئر سیکسنی|लोअर सैक्सनी|লোয়ার স্যাক্সনি|نیدرزاکسن', { ar: 'ساكسونيا السفلى', tr: 'Aşağı Saksonya', es: 'Baja Sajonia', fr: 'Basse-Saxe' }, [
        T('Hanover', 52.3759, 9.7320, 'ہینوور|हनोवर|হ্যানোভার|هانوفر', { ar: 'هانوفر', tr: 'Hannover', es: 'Hannover', fr: 'Hanovre' }),
        T('Brunswick', 52.2689, 10.5268, 'براؤنشوائگ|ब्राउनश्वाइग|ব্রাউনশভাইগ|براونشوایگ', { ar: 'براونشفايغ', tr: 'Braunschweig', es: 'Brunswick', fr: 'Brunswick' }),
        T('Osnabrück', 52.2799, 8.0472, 'اوسنابروک|ओस्नाब्रुक|অসনাব্রুক|اسنابروک', { ar: 'أوسنابروك' }),
        T('Oldenburg', 53.1435, 8.2146, 'اولڈنبرگ|ओल्डेनबर्ग|ওল্ডেনবুর্গ|اولدنبورگ', { ar: 'أولدنبورغ' }),
      ]),
      R('Saxony', 'سیکسنی|सैक्सनी|স্যাক্সনি|زاکسن', { ar: 'ساكسونيا', tr: 'Saksonya', es: 'Sajonia', fr: 'Saxe' }, [
        T('Leipzig', 51.3397, 12.3731, 'لائپزگ|लाइपज़िग|লাইপজিগ|لایپزیگ', { ar: 'لايبزيغ' }),
        T('Dresden', 51.0504, 13.7373, 'ڈریسڈن|ड्रेसडेन|ড্রেসডেন|درسدن', { ar: 'دريسدن', es: 'Dresde', fr: 'Dresde' }),
        T('Chemnitz', 50.8278, 12.9214, 'کیمنٹس|केमनित्ज़|কেমনিৎস|کمنیتس', { ar: 'كيمنتس' }),
      ]),
      R('Rhineland-Palatinate', 'رائن لینڈ-پیلاٹینیٹ|राइनलैंड-पैलेटिनेट|রাইনল্যান্ড-প্যালাটিনেট|راینلند-فالتس', { ar: 'راينلند بالاتينات', tr: 'Rheinland-Pfalz', es: 'Renania-Palatinado', fr: 'Rhénanie-Palatinat' }, [
        T('Mainz', 49.9929, 8.2473, 'مائنز|माइंज़|মাইনৎস|ماینتس', { ar: 'ماينتس', es: 'Maguncia', fr: 'Mayence' }),
        T('Ludwigshafen', 49.4774, 8.4452, 'لڈوگزہافن|लुडविग्सहाफ़ेन|লুডভিগসহাফেন|لودویگسهافن', { ar: 'لودفيغسهافن' }),
      ]),
      R('Schleswig-Holstein', 'شلیسوگ-ہولسٹائن|श्लेसविग-होल्सटाइन|শ্লেসভিগ-হলস্টাইন|شلسویگ-هولشتاین', { ar: 'شليسفيغ هولشتاين' }, [
        T('Kiel', 54.3233, 10.1228, 'کیل|कील|কিল|کیل', { ar: 'كيل' }),
        T('Lübeck', 53.8655, 10.6866, 'لیوبیک|ल्यूबेक|লুবেক|لوبک', { ar: 'لوبيك' }),
      ]),
      R('Saarland', 'زارلینڈ|ज़ारलैंड|জারল্যান্ড|زارلند', { ar: 'زارلاند', es: 'Sarre', fr: 'Sarre' }, [
        T('Saarbrücken', 49.2402, 6.9969, 'زاربروکن|ज़ारब्रुकेन|জারব্রুকেন|زاربروکن', { ar: 'زاربروكن', fr: 'Sarrebruck' }),
      ]),
      R('Thuringia', 'تھورنگیا|थुरिंगिया|থুরিঙ্গিয়া|تورینگن', { ar: 'تورينغن', tr: 'Thüringen', es: 'Turingia', fr: 'Thuringe' }, [
        T('Erfurt', 50.9848, 11.0299, 'ایرفرٹ|एर्फ़ुर्ट|এরফুর্ট|ارفورت', { ar: 'إرفورت' }),
      ]),
      R('Saxony-Anhalt', 'سیکسنی-آنہالٹ|सैक्सनी-अनहाल्ट|স্যাক্সনি-আনহাল্ট|زاکسن-آنهالت', { ar: 'ساكسونيا أنهالت', tr: 'Saksonya-Anhalt', es: 'Sajonia-Anhalt', fr: 'Saxe-Anhalt' }, [
        T('Magdeburg', 52.1205, 11.6276, 'میگڈےبرگ|माग्डेबुर्ग|মাগডেবুর্গ|ماگدبورگ', { ar: 'ماغدبورغ', es: 'Magdeburgo', fr: 'Magdebourg' }),
        T('Halle', 51.4969, 11.9688, 'ہالے|हाले|হালে|هاله', { ar: 'هاله' }),
      ]),
      R('Brandenburg', 'برانڈنبرگ|ब्रांडेनबुर्ग|ব্রান্ডেনবুর্গ|براندنبورگ', { ar: 'براندنبورغ', es: 'Brandeburgo', fr: 'Brandebourg' }, [
        T('Potsdam', 52.3906, 13.0645, 'پوٹسڈیم|पॉट्सडैम|পটসডাম|پوتسدام', { ar: 'بوتسدام' }),
      ]),
      R('Mecklenburg-Western Pomerania', 'میکلن برگ-مغربی پومیرانیا|मेक्लेनबर्ग-पश्चिमी पोमेरानिया|মেকলেনবুর্গ-পশ্চিম পোমেরানিয়া|مکلنبورگ-فورپومرن', { ar: 'مكلنبورغ فوربومرن', tr: 'Mecklenburg-Vorpommern', es: 'Mecklemburgo-Pomerania Occidental', fr: 'Mecklembourg-Poméranie-Occidentale' }, [
        T('Rostock', 54.0924, 12.0991, 'روسٹاک|रोस्टॉक|রস্টক|روستوک', { ar: 'روستوك' }),
      ]),
    ],
  },
  // Phase 3 (2026-09-29): Netherlands, Belgium, Luxembourg, Switzerland, Austria.
  //   Netherlands, Luxembourg, Switzerland: no national Islamic body; Diyanet's European timetable (within 1 min).
  //   Belgium: the Muslim Executive of Belgium (EMB) calendar, fitted; Maliki, the majority school.
  //   Austria: the IGGÖ unified calendar (same numbers as Diyanet's European timetable).
  {
    slug: 'netherlands', cc: 'NL', continent: 'europe', name: { en: 'Netherlands' }, langs: ['en'],
    tz: 'Europe/Amsterdam', method: 'DiyanetEurope', defaultSect: 'shafii', // Diyanet timetable: first Asr time
    regions: [
      R('North Holland', 'نارتھ ہالینڈ|नॉर्थ हॉलैंड|নর্থ হল্যান্ড|هلند شمالی', { ar: 'هولندا الشمالية', tr: 'Kuzey Hollanda', es: 'Holanda Septentrional', fr: 'Hollande-Septentrionale' }, [
        T('Amsterdam', 52.3676, 4.9041, 'ایمسٹرڈیم|एम्स्टर्डम|আমস্টারডাম|آمستردام', { ar: 'أمستردام', es: 'Ámsterdam' }),
        T('Haarlem', 52.3874, 4.6462, 'ہارلم|हार्लेम|হারলেম|هارلم', { ar: 'هارلم' }),
        T('Zaandam', 52.4420, 4.8292, 'زاندام|ज़ांडम|জানডাম|زاندام', { ar: 'زاندام' }),
      ]),
      R('South Holland', 'ساؤتھ ہالینڈ|साउथ हॉलैंड|সাউথ হল্যান্ড|هلند جنوبی', { ar: 'هولندا الجنوبية', tr: 'Güney Hollanda', es: 'Holanda Meridional', fr: 'Hollande-Méridionale' }, [
        T('Rotterdam', 51.9244, 4.4777, 'روٹرڈیم|रॉटरडैम|রটারডাম|روتردام', { ar: 'روتردام', es: 'Róterdam' }),
        T('The Hague', 52.0705, 4.3007, 'دی ہیگ|द हेग|দ্য হেগ|لاهه', { ar: 'لاهاي', tr: 'Lahey', es: 'La Haya', fr: 'La Haye' }),
        T('Leiden', 52.1601, 4.4970, 'لائیڈن|लाइडेन|লাইডেন|لیدن', { ar: 'لايدن', fr: 'Leyde' }),
        T('Dordrecht', 51.8133, 4.6901, 'ڈورڈریخٹ|डोर्ड्रेख्ट|ডর্ড্রেখট|دوردرخت', { ar: 'دوردريخت' }),
      ]),
      R('Utrecht', 'اوترخت|उट्रेख्ट|ইউট্রেখট|اوترخت', { ar: 'أوترخت' }, [
        T('Utrecht', 52.0907, 5.1214, 'اوترخت|उट्रेख्ट|ইউট্রেখট|اوترخت', { ar: 'أوترخت' }),
        T('Amersfoort', 52.1561, 5.3878, 'آمرزفورٹ|आमर्सफ़ोर्ट|আমার্সফোর্ট|آمرسفورت', { ar: 'أمرسفورت' }),
      ]),
      R('North Brabant', 'نارتھ برابانت|नॉर्थ ब्राबांट|নর্থ ব্রাবান্ট|برابانت شمالی', { ar: 'برابانت الشمالية', tr: 'Kuzey Brabant', es: 'Brabante Septentrional', fr: 'Brabant-Septentrional' }, [
        T('Eindhoven', 51.4416, 5.4697, 'آئندھوون|आइंडहोवन|আইন্ডহোভেন|آیندهوفن', { ar: 'آيندهوفن' }),
        T('Tilburg', 51.5555, 5.0913, 'ٹلبرگ|टिलबर्ग|টিলবার্গ|تیلبورخ', { ar: 'تيلبورغ' }),
        T('Breda', 51.5719, 4.7683, 'بریڈا|ब्रेडा|ব্রেডা|بردا', { ar: 'بريدا' }),
        T('’s-Hertogenbosch', 51.6978, 5.3037, 'ہیرٹوخنبوس|हेर्टोगेनबोस|হার্টোগেনবস|هرتوخنبوس', { ar: 'هيرتوخينبوس', fr: 'Bois-le-Duc' }),
      ]),
      R('Gelderland', 'خیلدرلینڈ|गेल्डरलैंड|গেল্ডারল্যান্ড|خلدرلند', { ar: 'خيلدرلاند', fr: 'Gueldre' }, [
        T('Arnhem', 51.9851, 5.8987, 'آرنہم|आर्नहेम|আর্নহেম|آرنهم', { ar: 'أرنهم' }),
        T('Nijmegen', 51.8126, 5.8372, 'نائمیخن|नाइमेगन|নাইমেগেন|نایمخن', { ar: 'نايميخن', fr: 'Nimègue' }),
        T('Apeldoorn', 52.2112, 5.9699, 'آپلڈورن|आपेलडोर्न|আপেলডর্ন|آپلدورن', { ar: 'أبلدورن' }),
      ]),
      R('Overijssel', 'اوورائسل|ओवरआइसेल|ওভারআইসেল|اوریسل', { ar: 'أوفرآيسل' }, [
        T('Enschede', 52.2215, 6.8937, 'انسخیدے|एन्सखेडे|এনসখেডে|انسخده', { ar: 'إنسخيده' }),
        T('Zwolle', 52.5168, 6.0830, 'زوولے|ज़्वोले|জভোলে|زووله', { ar: 'زفوله' }),
      ]),
      R('Limburg', 'لمبرخ|लिम्बर्ग|লিমবুর্গ|لیمبورگ', { ar: 'ليمبورخ' }, [
        T('Maastricht', 50.8514, 5.6910, 'ماسٹرخٹ|मास्ट्रिख्ट|মাস্ট্রিখট|ماستریخت', { ar: 'ماستريخت' }),
        T('Venlo', 51.3704, 6.1724, 'وینلو|वेन्लो|ভেনলো|ونلو', { ar: 'فينلو' }),
      ]),
      R('Groningen', 'خرونیخن|ग्रोनिंगन|গ্রোনিংগেন|خرونینگن', { ar: 'خرونينغن', fr: 'Groningue' }, [
        T('Groningen', 53.2194, 6.5665, 'خرونیخن|ग्रोनिंगन|গ্রোনিংগেন|خرونینگن', { ar: 'خرونينغن', fr: 'Groningue' }),
      ]),
      R('Friesland', 'فریز لینڈ|फ़्रीसलैंड|ফ্রিসল্যান্ড|فریسلند', { ar: 'فريسلاند', es: 'Frisia', fr: 'Frise' }, [
        T('Leeuwarden', 53.2012, 5.7999, 'لیوواردن|लीउवार्डन|লিউয়ার্ডেন|لیواردن', { ar: 'ليواردن' }),
      ]),
      R('Flevoland', 'فلیولینڈ|फ़्लेवोलैंड|ফ্লেভোল্যান্ড|فلوولند', { ar: 'فليفولاند' }, [
        T('Almere', 52.3508, 5.2647, 'المیرے|अल्मेरे|আলমেরে|آلمره', { ar: 'ألميره' }),
      ]),
      R('Zeeland', 'زیلینڈ|ज़ीलैंड|জিল্যান্ড|زیلند', { ar: 'زيلاند', es: 'Zelanda', fr: 'Zélande' }, [
        T('Middelburg', 51.4988, 3.6136, 'مڈلبرگ|मिडलबर्ग|মিডেলবুর্গ|میدلبورخ', { ar: 'ميدلبورخ' }),
      ]),
      R('Drenthe', 'ڈرینتے|ड्रेंटे|ড্রেন্টে|درنته', { ar: 'درينته' }, [
        T('Emmen', 52.7792, 6.9006, 'ایمن|एम्मेन|এমেন|امن', { ar: 'إمن' }),
      ]),
    ],
  },
  {
    slug: 'belgium', cc: 'BE', continent: 'europe', name: { en: 'Belgium', fr: 'Belgique' }, langs: ['en'], // multilingual: French names stay on French pages only
    tz: 'Europe/Brussels', method: 'EMB', defaultSect: 'maliki',
    regions: [
      R('Brussels-Capital Region', 'برسلز کیپیٹل ریجن|ब्रुसेल्स राजधानी क्षेत्र|ব্রাসেলস রাজধানী অঞ্চল|منطقه پایتخت بروکسل', { ar: 'منطقة بروكسل العاصمة', tr: 'Brüksel Başkent Bölgesi', es: 'Región de Bruselas-Capital', fr: 'Région de Bruxelles-Capitale' }, [
        T('Brussels', 50.8503, 4.3517, 'برسلز|ब्रुसेल्स|ব্রাসেলস|بروکسل', { ar: 'بروكسل', tr: 'Brüksel', es: 'Bruselas', fr: 'Bruxelles' }),
      ]),
      R('Flanders', 'فلینڈرز|फ़्लैंडर्स|ফ্ল্যান্ডার্স|فلاندر', { ar: 'فلاندرز', tr: 'Flaman Bölgesi', es: 'Flandes', fr: 'Flandre' }, [
        T('Antwerp', 51.2194, 4.4025, 'اینٹورپ|एंटवर्प|অ্যান্টওয়ার্প|آنتورپ', { ar: 'أنتويرب', tr: 'Anvers', es: 'Amberes', fr: 'Anvers' }),
        T('Ghent', 51.0543, 3.7174, 'گینٹ|गेंट|ঘেন্ট|گنت', { ar: 'غنت', tr: 'Gent', es: 'Gante', fr: 'Gand' }),
        T('Bruges', 51.2093, 3.2247, 'بروژ|ब्रूज़|ব্রুজ|بروژ', { ar: 'بروج', tr: 'Brugge', es: 'Brujas', fr: 'Bruges' }),
        T('Leuven', 50.8798, 4.7005, 'لوون|ल्यूवेन|লুভেন|لوون', { ar: 'لوفن', es: 'Lovaina', fr: 'Louvain' }),
        T('Mechelen', 51.0259, 4.4776, 'میخیلن|मेखेलेन|মেখেলেন|مخلن', { ar: 'ميخيلين', es: 'Malinas', fr: 'Malines' }),
        T('Genk', 50.9650, 5.5008, 'گینک|गेंक|গেঙ্ক|خنک', { ar: 'خنك', fr: 'Genk' }),
        T('Hasselt', 50.9307, 5.3325, 'ہاسلٹ|हासेल्ट|হাসেল্ট|هاسلت', { ar: 'هاسلت', fr: 'Hasselt' }),
        T('Kortrijk', 50.8280, 3.2649, 'کورٹرائک|कोर्ट्राइक|কোর্ট্রাইক|کورتریک', { ar: 'كورتريك', fr: 'Courtrai' }),
        T('Ostend', 51.2154, 2.9286, 'اوسٹینڈ|ओस्टेंड|অস্টেন্ড|اوستنده', { ar: 'أوستند', es: 'Ostende', fr: 'Ostende' }),
        T('Aalst', 50.9378, 4.0410, 'آلسٹ|आल्स्ट|আলস্ট|آلست', { ar: 'آلست', fr: 'Alost' }),
        T('Sint-Niklaas', 51.1650, 4.1437, 'سنٹ نکلاس|सिंट-निक्लास|সিন্ট-নিকলাস|سینت-نیکلاس', { ar: 'سينت نيكلاس', fr: 'Saint-Nicolas' }),
      ]),
      R('Wallonia', 'والونیا|वालोनिया|ওয়ালোনিয়া|والونی', { ar: 'والونيا', tr: 'Valon Bölgesi', es: 'Valonia', fr: 'Wallonie' }, [
        T('Liège', 50.6326, 5.5797, 'لیئژ|लीएज|লিয়েজ|لیژ', { ar: 'لييج', es: 'Lieja', fr: 'Liège' }),
        T('Charleroi', 50.4108, 4.4446, 'شارلروا|शार्लरोआ|শার্লরোয়া|شارلروا', { ar: 'شارلروا', fr: 'Charleroi' }),
        T('Namur', 50.4674, 4.8720, 'نامور|नामूर|নামুর|نامور', { ar: 'نامور', fr: 'Namur' }),
        T('Mons', 50.4542, 3.9523, 'مونس|मों|মঁস|مونس', { ar: 'مونس', fr: 'Mons' }),
        T('Verviers', 50.5891, 5.8622, 'ویرویئے|वेर्वीए|ভের্ভিয়ে|وروی‌یه', { ar: 'فيرفييه', fr: 'Verviers' }),
        T('La Louvière', 50.4796, 4.1874, 'لا لوویئر|ला लूवियेर|লা লুভিয়ের|لالوویر', { ar: 'لا لوفيير', fr: 'La Louvière' }),
        T('Tournai', 50.6056, 3.3878, 'تورنے|तुर्ने|তুর্নে|تورنه', { ar: 'تورناي', fr: 'Tournai' }),
      ]),
    ],
  },
  {
    slug: 'luxembourg', cc: 'LU', continent: 'europe', name: { en: 'Luxembourg', fr: 'Luxembourg' }, langs: ['fr'],
    tz: 'Europe/Luxembourg', method: 'DiyanetEurope', defaultSect: 'shafii', // Diyanet timetable: first Asr time
    regions: [
      R('Luxembourg Canton', 'لکسمبرگ کینٹن|लक्ज़मबर्ग कैंटन|লুক্সেমবার্গ ক্যান্টন|کانتون لوکزامبورگ', { ar: 'كانتون لوكسمبورغ', tr: 'Lüksemburg Kantonu', es: 'Cantón de Luxemburgo', fr: 'Canton de Luxembourg' }, [
        T('Luxembourg City', 49.6116, 6.1319, 'لکسمبرگ شہر|लक्ज़मबर्ग शहर|লুক্সেমবার্গ শহর|شهر لوکزامبورگ', { ar: 'مدينة لوكسمبورغ', tr: 'Lüksemburg', es: 'Luxemburgo', fr: 'Luxembourg' }),
      ]),
      R('Esch-sur-Alzette Canton', 'ایش سور آلزیٹ کینٹن|एश-सुर-अल्ज़ेट कैंटन|এশ-সুর-আলজেট ক্যান্টন|کانتون اش-سور-آلزت', { ar: 'كانتون إش سور ألزيت', fr: 'Canton d’Esch-sur-Alzette' }, [
        T('Esch-sur-Alzette', 49.4958, 5.9806, 'ایش سور آلزیٹ|एश-सुर-अल्ज़ेट|এশ-সুর-আলজেট|اش-سور-آلزت', { ar: 'إش سور ألزيت', fr: 'Esch-sur-Alzette' }),
        T('Differdange', 49.5242, 5.8914, 'ڈیفرڈانژ|डिफ़रडांज|ডিফারডাঞ্জ|دیفردانژ', { ar: 'ديفردانج', fr: 'Differdange' }),
      ]),
    ],
  },
  {
    slug: 'switzerland', cc: 'CH', continent: 'europe', name: { en: 'Switzerland', fr: 'Suisse' }, langs: ['en'], // multilingual: French names stay on French pages only
    tz: 'Europe/Zurich', method: 'DiyanetEurope', defaultSect: 'shafii', // Diyanet timetable: first Asr time
    regions: [
      R('Zurich', 'زیورخ|ज़्यूरिख़|জুরিখ|زوریخ', { ar: 'زيورخ', tr: 'Zürih', es: 'Zúrich', fr: 'Zurich' }, [
        T('Zurich', 47.3769, 8.5417, 'زیورخ|ज़्यूरिख़|জুরিখ|زوریخ', { ar: 'زيورخ', tr: 'Zürih', es: 'Zúrich', fr: 'Zurich' }),
        T('Winterthur', 47.5000, 8.7241, 'ونٹرتھور|विंटरथुर|ভিন্টারটুর|وینترتور', { ar: 'فينترتور', fr: 'Winterthour' }),
      ]),
      R('Geneva', 'جنیوا|जिनेवा|জেনেভা|ژنو', { ar: 'جنيف', tr: 'Cenevre', es: 'Ginebra', fr: 'Genève' }, [
        T('Geneva', 46.2044, 6.1432, 'جنیوا|जिनेवा|জেনেভা|ژنو', { ar: 'جنيف', tr: 'Cenevre', es: 'Ginebra', fr: 'Genève' }),
      ]),
      R('Basel-City', 'بازل شہر|बासेल-शहर|বাজেল-শহর|بازل-شهر', { ar: 'بازل المدينة', es: 'Basilea-Ciudad', fr: 'Bâle-Ville' }, [
        T('Basel', 47.5596, 7.5886, 'بازل|बासेल|বাজেল|بازل', { ar: 'بازل', es: 'Basilea', fr: 'Bâle' }),
      ]),
      R('Bern', 'برن|बर्न|বার্ন|برن', { ar: 'برن', es: 'Berna', fr: 'Berne' }, [
        T('Bern', 46.9480, 7.4474, 'برن|बर्न|বার্ন|برن', { ar: 'برن', es: 'Berna', fr: 'Berne' }),
        T('Biel/Bienne', 47.1368, 7.2467, 'بیل|बील|বিল|بیل', { ar: 'بيل', fr: 'Bienne' }),
      ]),
      R('Vaud', 'وو|वो|ভো|وو', { ar: 'فو', fr: 'Vaud' }, [
        T('Lausanne', 46.5197, 6.6323, 'لوزان|लोज़ान|লোজান|لوزان', { ar: 'لوزان', tr: 'Lozan', es: 'Lausana', fr: 'Lausanne' }),
      ]),
      R('Lucerne', 'لوسرن|ल्यूसर्न|লুসার্ন|لوسرن', { ar: 'لوسيرن', tr: 'Luzern', es: 'Lucerna', fr: 'Lucerne' }, [
        T('Lucerne', 47.0502, 8.3093, 'لوسرن|ल्यूसर्न|লুসার্ন|لوسرن', { ar: 'لوسيرن', tr: 'Luzern', es: 'Lucerna', fr: 'Lucerne' }),
      ]),
      R('St. Gallen', 'سینٹ گالن|सेंट गालेन|সেন্ট গালেন|سنت گالن', { ar: 'سانت غالن', es: 'San Galo', fr: 'Saint-Gall' }, [
        T('St. Gallen', 47.4245, 9.3767, 'سینٹ گالن|सेंट गालेन|সেন্ট গালেন|سنت گالن', { ar: 'سانت غالن', es: 'San Galo', fr: 'Saint-Gall' }),
      ]),
      R('Ticino', 'ٹیچینو|तिचीनो|তিচিনো|تیچینو', { ar: 'تيتشينو', es: 'Tesino', fr: 'Tessin' }, [
        T('Lugano', 46.0037, 8.9511, 'لوگانو|लुगानो|লুগানো|لوگانو', { ar: 'لوغانو', fr: 'Lugano' }),
      ]),
      R('Aargau', 'آرگاؤ|आर्गाउ|আরগাউ|آرگائو', { ar: 'أرغاو', es: 'Argovia', fr: 'Argovie' }, [
        T('Aarau', 47.3925, 8.0442, 'آراؤ|आराउ|আরাউ|آرائو', { ar: 'آراو', fr: 'Aarau' }),
      ]),
    ],
  },
  {
    slug: 'austria', cc: 'AT', continent: 'europe', name: { en: 'Austria' }, langs: ['en'],
    tz: 'Europe/Vienna', method: 'IGGO', defaultSect: 'shafii', // IGGÖ calendar: first Asr time
    regions: [
      R('Vienna', 'ویانا|वियना|ভিয়েনা|وین', { ar: 'فيينا', tr: 'Viyana', es: 'Viena', fr: 'Vienne' }, [
        T('Vienna', 48.2082, 16.3738, 'ویانا|वियना|ভিয়েনা|وین', { ar: 'فيينا', tr: 'Viyana', es: 'Viena', fr: 'Vienne' }),
      ]),
      R('Lower Austria', 'زیریں آسٹریا|निचला ऑस्ट्रिया|নিম্ন অস্ট্রিয়া|اتریش سفلی', { ar: 'النمسا السفلى', tr: 'Aşağı Avusturya', es: 'Baja Austria', fr: 'Basse-Autriche' }, [
        T('St. Pölten', 48.2047, 15.6256, 'سینٹ پولٹن|सेंट पोल्टेन|সেন্ট পোল্টেন|سنت پولتن', { ar: 'سانت بولتن' }),
        T('Wiener Neustadt', 47.8131, 16.2433, 'وینر نوئشٹاٹ|वीनर नॉयश्टाट|ভিনার নয়স্টাট|وینر نویشتات', { ar: 'فينر نويشتات' }),
      ]),
      R('Upper Austria', 'بالائی آسٹریا|ऊपरी ऑस्ट्रिया|ঊর্ধ্ব অস্ট্রিয়া|اتریش علیا', { ar: 'النمسا العليا', tr: 'Yukarı Avusturya', es: 'Alta Austria', fr: 'Haute-Autriche' }, [
        T('Linz', 48.3069, 14.2858, 'لنز|लिंज़|লিন্‌ৎস|لینتس', { ar: 'لينتس' }),
        T('Wels', 48.1575, 14.0289, 'ویلس|वेल्स|ভেলস|ولس', { ar: 'فيلس' }),
      ]),
      R('Styria', 'اسٹیریا|स्टीरिया|স্টাইরিয়া|اشتایرمارک', { ar: 'ستيريا', tr: 'Steiermark', es: 'Estiria', fr: 'Styrie' }, [
        T('Graz', 47.0707, 15.4395, 'گراز|ग्राज़|গ্রাৎস|گراتس', { ar: 'غراتس' }),
      ]),
      R('Salzburg', 'سالزبرگ|साल्ज़बर्ग|সালজবুর্গ|سالزبورگ', { ar: 'سالزبورغ', es: 'Salzburgo', fr: 'Salzbourg' }, [
        T('Salzburg', 47.8095, 13.0550, 'سالزبرگ|साल्ज़बर्ग|সালজবুর্গ|سالزبورگ', { ar: 'سالزبورغ', es: 'Salzburgo', fr: 'Salzbourg' }),
      ]),
      R('Tyrol', 'ٹائرول|टिरोल|টিরোল|تیرول', { ar: 'تيرول', tr: 'Tirol', es: 'Tirol', fr: 'Tyrol' }, [
        T('Innsbruck', 47.2692, 11.4041, 'انسبرک|इंसब्रुक|ইন্সব্রুক|اینسبروک', { ar: 'إنسبروك' }),
      ]),
      R('Vorarlberg', 'فورارلبرگ|फ़ोरार्लबर्ग|ফোরার্লবার্গ|فورآرلبرگ', { ar: 'فورارلبرغ' }, [
        T('Bregenz', 47.5031, 9.7471, 'بریگنز|ब्रेगेंज़|ব্রেগেন্‌ৎস|برگنتس', { ar: 'بريغنتس' }),
        T('Dornbirn', 47.4125, 9.7417, 'ڈورنبرن|डोर्नबिर्न|ডর্নবির্ন|دورنبیرن', { ar: 'دورنبيرن' }),
      ]),
      R('Carinthia', 'کارنتھیا|कैरिंथिया|ক্যারিন্থিয়া|کارینتیا', { ar: 'كارينثيا', tr: 'Karintiya', es: 'Carintia', fr: 'Carinthie' }, [
        T('Klagenfurt', 46.6365, 14.3122, 'کلاگن فورٹ|क्लागेनफ़ुर्ट|ক্লাগেনফুর্ট|کلاگنفورت', { ar: 'كلاغنفورت' }),
        T('Villach', 46.6103, 13.8558, 'فلاخ|फ़िलाख़|ফিলাখ|فیلاخ', { ar: 'فيلاخ' }),
      ]),
      R('Burgenland', 'بورگن لینڈ|बुर्गेनलैंड|বুর্গেনল্যান্ড|بورگنلند', { ar: 'بورغنلاند' }, [
        T('Eisenstadt', 47.8456, 16.5233, 'آئزن شٹاٹ|आइज़ेनश्टाट|আইজেনস্টাট|آیزنشتات', { ar: 'آيزنشتات' }),
      ]),
    ],
  },
  // Phase 5 (2026-09-30): Spain, Portugal, Italy, Malta, Greece. (Phase 4, the Nordic countries, is deferred.)
  //   No national timetable could be read (Madrid's Islamic centre is behind a bot wall), so Muslim World
  //   League and the majority school, except Greece: Diyanet (Thrace's Turkish minority), checked on Athens.
  {
    slug: 'spain', cc: 'ES', continent: 'europe', name: { en: 'Spain', es: 'España' }, langs: ['es'],
    tz: 'Europe/Madrid', method: 'MuslimWorldLeague', defaultSect: 'maliki',
    regions: [
      R('Community of Madrid', 'میڈرڈ کمیونٹی|मैड्रिड समुदाय|মাদ্রিদ সম্প্রদায়|جامعه مادرید', { ar: 'مجتمع مدريد', tr: 'Madrid Topluluğu', es: 'Comunidad de Madrid', fr: 'Communauté de Madrid' }, [
        T('Madrid', 40.4168, -3.7038, 'میڈرڈ|मैड्रिड|মাদ্রিদ|مادرید', { ar: 'مدريد', es: 'Madrid' }),
      ]),
      R('Catalonia', 'کیٹالونیا|कैटालोनिया|কাতালোনিয়া|کاتالونیا', { ar: 'كتالونيا', tr: 'Katalonya', es: 'Cataluña', fr: 'Catalogne' }, [
        T('Barcelona', 41.3874, 2.1686, 'بارسلونا|बार्सिलोना|বার্সেলোনা|بارسلونا', { ar: 'برشلونة', tr: 'Barselona', es: 'Barcelona', fr: 'Barcelone' }),
        T('Tarragona', 41.1189, 1.2445, 'تاراگونا|तारागोना|তারাগোনা|تاراگونا', { ar: 'طركونة', es: 'Tarragona', fr: 'Tarragone' }),
        T('Girona', 41.9794, 2.8214, 'خیرونا|जिरोना|জিরোনা|خیرونا', { ar: 'جرندة', es: 'Gerona', fr: 'Gérone' }),
        T('Lleida', 41.6176, 0.6200, 'لیئیدا|ल्येइदा|লেইদা|لیدا', { ar: 'لاردة', es: 'Lérida', fr: 'Lérida' }),
      ]),
      R('Andalusia', 'اندلس|आंदालूसिया|আন্দালুসিয়া|اندلس', { ar: 'أندلوسيا', tr: 'Endülüs', es: 'Andalucía', fr: 'Andalousie' }, [
        T('Seville', 37.3891, -5.9845, 'اشبیلیہ|सेविया|সেভিয়া|سویا', { ar: 'إشبيلية', tr: 'Sevilla', es: 'Sevilla', fr: 'Séville' }),
        T('Málaga', 36.7213, -4.4214, 'مالقہ|मलागा|মালাগা|مالاگا', { ar: 'مالقة', es: 'Málaga' }),
        T('Granada', 37.1773, -3.5986, 'غرناطہ|ग्रानादा|গ্রানাদা|غرناطه', { ar: 'غرناطة', tr: 'Gırnata', es: 'Granada', fr: 'Grenade' }),
        T('Córdoba', 37.8882, -4.7794, 'قرطبہ|कोर्दोबा|কর্দোবা|قرطبه', { ar: 'قرطبة', tr: 'Kurtuba', es: 'Córdoba', fr: 'Cordoue' }),
        T('Almería', 36.8340, -2.4637, 'المریہ|अल्मेरिया|আলমেরিয়া|آلمریا', { ar: 'ألمرية', es: 'Almería' }),
        T('Algeciras', 36.1408, -5.4562, 'الجزیرہ الخضراء|अल्जेसिरास|আলহেসিরাস|آلخسیراس', { ar: 'الجزيرة الخضراء', es: 'Algeciras' }),
      ]),
      R('Valencian Community', 'ویلنسیا کمیونٹی|वालेंसिया समुदाय|ভ্যালেন্সিয়া সম্প্রদায়|جامعه والنسیا', { ar: 'منطقة بلنسية', tr: 'Valensiya Topluluğu', es: 'Comunidad Valenciana', fr: 'Communauté valencienne' }, [
        T('Valencia', 39.4699, -0.3763, 'ویلنسیا|वालेंसिया|ভ্যালেন্সিয়া|والنسیا', { ar: 'بلنسية', tr: 'Valensiya', es: 'Valencia', fr: 'Valence' }),
        T('Alicante', 38.3452, -0.4810, 'الیکانتے|अलिकांते|আলিকান্তে|آلیکانته', { ar: 'لقنت', es: 'Alicante' }),
      ]),
      R('Region of Murcia', 'مرسیہ علاقہ|मुर्सिया क्षेत्र|মুরসিয়া অঞ্চল|منطقه مورسیا', { ar: 'إقليم مرسية', es: 'Región de Murcia', fr: 'Région de Murcie' }, [
        T('Murcia', 37.9922, -1.1307, 'مرسیہ|मुर्सिया|মুরসিয়া|مورسیا', { ar: 'مرسية', es: 'Murcia', fr: 'Murcie' }),
        T('Cartagena', 37.6257, -0.9966, 'کارتاخینا|कार्ताखेना|কার্তাহেনা|کارتاخنا', { ar: 'قرطاجنة', es: 'Cartagena', fr: 'Carthagène' }),
      ]),
      R('Basque Country', 'باسک ملک|बास्क देश|বাস্ক দেশ|سرزمین باسک', { ar: 'إقليم الباسك', tr: 'Bask Ülkesi', es: 'País Vasco', fr: 'Pays basque' }, [
        T('Bilbao', 43.2630, -2.9350, 'بلباؤ|बिलबाओ|বিলবাও|بیلبائو', { ar: 'بلباو', es: 'Bilbao' }),
      ]),
      R('Aragon', 'اراگون|आरागोन|আরাগন|آراگون', { ar: 'أراغون', es: 'Aragón' }, [
        T('Zaragoza', 41.6488, -0.8891, 'سرقسطہ|सारागोसा|সারাগোসা|ساراگوسا', { ar: 'سرقسطة', es: 'Zaragoza', fr: 'Saragosse' }),
      ]),
      R('Castile and León', 'کاستیل و لیون|कास्तील और लेओन|কাস্তিয়া ও লেওন|کاستیل و لئون', { ar: 'قشتالة وليون', es: 'Castilla y León', fr: 'Castille-et-León' }, [
        T('Valladolid', 41.6523, -4.7245, 'بایادولید|वायादोलिद|ভায়াদোলিদ|بایادولید', { ar: 'بلد الوليد', es: 'Valladolid' }),
      ]),
      R('Galicia', 'گالیسیا|गालिसिया|গালিসিয়া|گالیسیا', { ar: 'غاليسيا', es: 'Galicia', fr: 'Galice' }, [
        T('Vigo', 42.2406, -8.7207, 'ویگو|विगो|ভিগো|ویگو', { ar: 'بيغو', es: 'Vigo' }),
      ]),
      R('Balearic Islands', 'جزائر بلیارک|बेलिएरिक द्वीप|বালেয়ারিক দ্বীপপুঞ্জ|جزایر بالئار', { ar: 'جزر البليار', tr: 'Balear Adaları', es: 'Islas Baleares', fr: 'Îles Baléares' }, [
        T('Palma', 39.5696, 2.6502, 'پالما|पाल्मा|পালমা|پالما', { ar: 'بالما', es: 'Palma de Mallorca' }),
      ]),
      R('Canary Islands', 'جزائر کناری|कैनरी द्वीप|ক্যানারি দ্বীপপুঞ্জ|جزایر قناری', { ar: 'جزر الكناري', tr: 'Kanarya Adaları', es: 'Islas Canarias', fr: 'Îles Canaries' }, [
        T('Las Palmas', 28.1235, -15.4363, 'لاس پالماس|लास पाल्मास|লাস পালমাস|لاس پالماس', { ar: 'لاس بالماس', es: 'Las Palmas de Gran Canaria' }, 'Atlantic/Canary'),
      ]),
      R('Ceuta', 'سبتہ|सेउता|সেউটা|سبته', { ar: 'سبتة', tr: 'Septe', es: 'Ceuta' }, [
        T('Ceuta', 35.8894, -5.3213, 'سبتہ|सेउता|সেউটা|سبته', { ar: 'سبتة', tr: 'Septe', es: 'Ceuta' }),
      ]),
      R('Melilla', 'ملیلہ|मेलिया|মেলিয়া|ملیله', { ar: 'مليلية', es: 'Melilla' }, [
        T('Melilla', 35.2923, -2.9381, 'ملیلہ|मेलिया|মেলিয়া|ملیله', { ar: 'مليلية', es: 'Melilla' }),
      ]),
    ],
  },
  {
    slug: 'portugal', cc: 'PT', continent: 'europe', name: { en: 'Portugal' }, langs: ['en'],
    tz: 'Europe/Lisbon', method: 'MuslimWorldLeague', defaultSect: 'hanafi',
    regions: [
      R('Lisbon', 'لزبن|लिस्बन|লিসবন|لیسبون', { ar: 'لشبونة', tr: 'Lizbon', es: 'Lisboa', fr: 'Lisbonne' }, [
        T('Lisbon', 38.7223, -9.1393, 'لزبن|लिस्बन|লিসবন|لیسبون', { ar: 'لشبونة', tr: 'Lizbon', es: 'Lisboa', fr: 'Lisbonne' }),
        T('Setúbal', 38.5244, -8.8882, 'سیتوبال|सेतुबाल|সেতুবাল|ستوبال', { ar: 'سيتوبال' }),
      ]),
      R('North', 'شمالی علاقہ|उत्तर क्षेत्र|উত্তরাঞ্চল|منطقه شمال', { ar: 'الإقليم الشمالي', tr: 'Kuzey', es: 'Norte', fr: 'Nord' }, [
        T('Porto', 41.1579, -8.6291, 'پورٹو|पोर्टो|পোর্তো|پورتو', { ar: 'بورتو', es: 'Oporto' }),
        T('Braga', 41.5454, -8.4265, 'براگا|ब्रागा|ব্রাগা|براگا', { ar: 'براغا' }),
      ]),
      R('Centre', 'وسطی علاقہ|मध्य क्षेत्र|মধ্যাঞ্চল|منطقه مرکز', { ar: 'الإقليم الأوسط', tr: 'Orta', es: 'Centro', fr: 'Centre' }, [
        T('Coimbra', 40.2033, -8.4103, 'کوئمبرا|कोइम्ब्रा|কোইম্ব্রা|کویمبرا', { ar: 'قلمرية' }),
      ]),
      R('Algarve', 'الگاروے|अल्गार्वे|আলগার্ভে|آلگاروه', { ar: 'الغرب', es: 'Algarve' }, [
        T('Faro', 37.0194, -7.9322, 'فارو|फ़ारो|ফারো|فارو', { ar: 'فارو' }),
      ]),
      R('Madeira', 'مدیرا|मदीरा|মাদেইরা|مادیرا', { ar: 'ماديرا' }, [
        T('Funchal', 32.6669, -16.9241, 'فنچل|फ़ुंशाल|ফুঞ্চাল|فونشال', { ar: 'فونشال' }, 'Atlantic/Madeira'),
      ]),
      R('Azores', 'ازورس|अज़ोरेस|আজোরেস|آزور', { ar: 'الأزور', tr: 'Azor Adaları', es: 'Azores', fr: 'Açores' }, [
        T('Ponta Delgada', 37.7412, -25.6756, 'پونتا دیلگادا|पोंता देलगादा|পন্তা দেলগাদা|پونتا دلگادا', { ar: 'بونتا دلغادا' }, 'Atlantic/Azores'),
      ]),
    ],
  },
  {
    slug: 'italy', cc: 'IT', continent: 'europe', name: { en: 'Italy' }, langs: ['en'],
    tz: 'Europe/Rome', method: 'MuslimWorldLeague', defaultSect: 'maliki',
    regions: [
      R('Lazio', 'لاتسیو|लात्सियो|লাৎসিও|لاتسیو', { ar: 'لاتسيو', es: 'Lacio', fr: 'Latium' }, [
        T('Rome', 41.9028, 12.4964, 'روم|रोम|রোম|رم', { ar: 'روما', tr: 'Roma', es: 'Roma', fr: 'Rome' }),
      ]),
      R('Lombardy', 'لومبارڈی|लोम्बार्डी|লম্বার্ডি|لمباردی', { ar: 'لومبارديا', tr: 'Lombardiya', es: 'Lombardía', fr: 'Lombardie' }, [
        T('Milan', 45.4642, 9.1900, 'میلان|मिलान|মিলান|میلان', { ar: 'ميلانو', tr: 'Milano', es: 'Milán', fr: 'Milan' }),
        T('Brescia', 45.5416, 10.2118, 'بریشیا|ब्रेशिया|ব্রেশিয়া|برشا', { ar: 'بريشيا' }),
        T('Bergamo', 45.6983, 9.6773, 'برگامو|बेर्गामो|বেরগামো|برگامو', { ar: 'بيرغامو', es: 'Bérgamo' }),
      ]),
      R('Piedmont', 'پیدمونٹ|पीडमोंट|পিয়েমন্তে|پیه‌مونت', { ar: 'بييمونتي', es: 'Piamonte', fr: 'Piémont' }, [
        T('Turin', 45.0703, 7.6869, 'ٹیورن|तूरिन|তুরিন|تورین', { ar: 'تورينو', tr: 'Torino', es: 'Turín', fr: 'Turin' }),
      ]),
      R('Veneto', 'وینیٹو|वेनेतो|ভেনেতো|ونتو', { ar: 'فينيتو', es: 'Véneto', fr: 'Vénétie' }, [
        T('Venice', 45.4408, 12.3155, 'وینس|वेनिस|ভেনিস|ونیز', { ar: 'البندقية', tr: 'Venedik', es: 'Venecia', fr: 'Venise' }),
        T('Verona', 45.4384, 10.9916, 'ویرونا|वेरोना|ভেরোনা|ورونا', { ar: 'فيرونا', fr: 'Vérone' }),
        T('Padua', 45.4064, 11.8768, 'پاڈووا|पादुआ|পাদুয়া|پادووا', { ar: 'بادوفا', tr: 'Padova', es: 'Padua', fr: 'Padoue' }),
      ]),
      R('Emilia-Romagna', 'ایمیلیا-رومانیا|एमिलिया-रोमान्या|এমিলিয়া-রোমানিয়া|امیلیا-رومانیا', { ar: 'إميليا رومانيا', es: 'Emilia-Romaña', fr: 'Émilie-Romagne' }, [
        T('Bologna', 44.4949, 11.3426, 'بولونیا|बोलोन्या|বোলোনিয়া|بولونیا', { ar: 'بولونيا', es: 'Bolonia', fr: 'Bologne' }),
        T('Modena', 44.6471, 10.9252, 'موڈینا|मोदेना|মোদেনা|مودنا', { ar: 'مودينا', es: 'Módena', fr: 'Modène' }),
      ]),
      R('Tuscany', 'ٹسکنی|टस्कनी|তুসকানি|توسکانی', { ar: 'توسكانا', tr: 'Toskana', es: 'Toscana', fr: 'Toscane' }, [
        T('Florence', 43.7696, 11.2558, 'فلورنس|फ़्लोरेंस|ফ্লোরেন্স|فلورانس', { ar: 'فلورنسا', tr: 'Floransa', es: 'Florencia', fr: 'Florence' }),
      ]),
      R('Campania', 'کمپانیا|काम्पानिया|কাম্পানিয়া|کامپانیا', { ar: 'كامبانيا', fr: 'Campanie' }, [
        T('Naples', 40.8518, 14.2681, 'نیپلز|नेपल्स|নেপলস|ناپل', { ar: 'نابولي', tr: 'Napoli', es: 'Nápoles', fr: 'Naples' }),
      ]),
      R('Apulia', 'پولیا|अपुलिया|আপুলিয়া|پولیا', { ar: 'بوليا', es: 'Apulia', fr: 'Pouilles' }, [
        T('Bari', 41.1171, 16.8719, 'باری|बारी|বারি|باری', { ar: 'باري' }),
      ]),
      R('Sicily', 'سسلی|सिसिली|সিসিলি|سیسیل', { ar: 'صقلية', tr: 'Sicilya', es: 'Sicilia', fr: 'Sicile' }, [
        T('Palermo', 38.1157, 13.3615, 'پالرمو|पालेर्मो|পালেরমো|پالرمو', { ar: 'باليرمو', fr: 'Palerme' }),
        T('Catania', 37.5079, 15.0830, 'کاتانیا|कातानिया|কাতানিয়া|کاتانیا', { ar: 'كاتانيا', fr: 'Catane' }),
      ]),
      R('Liguria', 'لیگوریا|लिगुरिया|লিগুরিয়া|لیگوریا', { ar: 'ليغوريا', fr: 'Ligurie' }, [
        T('Genoa', 44.4056, 8.9463, 'جینوا|जेनोआ|জেনোয়া|جنوا', { ar: 'جنوة', tr: 'Cenova', es: 'Génova', fr: 'Gênes' }),
      ]),
      R('Sardinia', 'سارڈینیا|सार्डिनिया|সার্দিনিয়া|ساردینیا', { ar: 'سردينيا', tr: 'Sardinya', es: 'Cerdeña', fr: 'Sardaigne' }, [
        T('Cagliari', 39.2238, 9.1217, 'کالیاری|काल्यारी|কালিয়ারি|کالیاری', { ar: 'كالياري' }),
      ]),
    ],
  },
  {
    slug: 'malta', cc: 'MT', continent: 'europe', name: { en: 'Malta' }, langs: ['en'],
    tz: 'Europe/Malta', method: 'MuslimWorldLeague', defaultSect: 'maliki',
    regions: [
      R('Malta', 'مالٹا|माल्टा|মাল্টা|مالت', { ar: 'مالطا', es: 'Malta', fr: 'Malte' }, [
        T('Valletta', 35.8989, 14.5146, 'ویلیٹا|वालेटा|ভালেত্তা|والتا', { ar: 'فاليتا', tr: 'Valletta', es: 'La Valeta', fr: 'La Valette' }),
        T('Birkirkara', 35.8972, 14.4611, 'برکرکارا|बिर्किरकारा|বিরকিরকারা|بیرکیرکارا', { ar: 'بيركيركارا' }),
        T('Paola', 35.8731, 14.5075, 'پاؤلا|पाओला|পাওলা|پائولا', { ar: 'باولا' }),
      ]),
    ],
  },
  {
    slug: 'greece', cc: 'GR', continent: 'europe', name: { en: 'Greece' }, langs: ['en'],
    tz: 'Europe/Athens', method: 'Turkey', defaultSect: 'hanafi',
    regions: [
      R('Attica', 'اٹیکا|एटिका|অ্যাটিকা|آتیکا', { ar: 'أتيكا', es: 'Ática', fr: 'Attique' }, [
        T('Athens', 37.9838, 23.7275, 'ایتھنز|एथेंस|এথেন্স|آتن', { ar: 'أثينا', tr: 'Atina', es: 'Atenas', fr: 'Athènes' }),
        T('Piraeus', 37.9420, 23.6465, 'پیریوس|पिरेयस|পিরেউস|پیره', { ar: 'بيرايوس', tr: 'Pire', es: 'El Pireo', fr: 'Le Pirée' }),
      ]),
      R('Central Macedonia', 'وسطی مقدونیہ|मध्य मैसेडोनिया|মধ্য মেসিডোনিয়া|مقدونیه مرکزی', { ar: 'مقدونيا الوسطى', tr: 'Orta Makedonya', es: 'Macedonia Central', fr: 'Macédoine-Centrale' }, [
        T('Thessaloniki', 40.6401, 22.9444, 'تھیسالونیکی|थेसालोनिकी|থেসালোনিকি|تسالونیکی', { ar: 'سالونيك', tr: 'Selanik', es: 'Salónica', fr: 'Thessalonique' }),
      ]),
      R('Eastern Macedonia and Thrace', 'مشرقی مقدونیہ و تھریس|पूर्वी मैसेडोनिया और थ्रेस|পূর্ব মেসিডোনিয়া ও থ্রেস|مقدونیه شرقی و تراکیه', { ar: 'مقدونيا الشرقية وتراقيا', tr: 'Doğu Makedonya ve Trakya', es: 'Macedonia Oriental y Tracia', fr: 'Macédoine-Orientale-et-Thrace' }, [
        T('Komotini', 41.1224, 25.4066, 'کوموتینی|कोमोतिनी|কোমোতিনি|کوموتینی', { ar: 'كوموتيني', tr: 'Gümülcine' }),
        T('Xanthi', 41.1349, 24.8880, 'زانتھی|ज़ांथी|জানথি|کسانتی', { ar: 'إكسانثي', tr: 'İskeçe' }),
        T('Alexandroupoli', 40.8457, 25.8739, 'الیگزینڈروپولی|अलेक्सांद्रूपोली|আলেক্সান্দ্রুপোলি|آلکساندروپولی', { ar: 'ألكسندروبولي', tr: 'Dedeağaç' }),
      ]),
      R('Western Greece', 'مغربی یونان|पश्चिमी यूनान|পশ্চিম গ্রিস|یونان غربی', { ar: 'اليونان الغربية', tr: 'Batı Yunanistan', es: 'Grecia Occidental', fr: 'Grèce-Occidentale' }, [
        T('Patras', 38.2466, 21.7346, 'پتراس|पात्रास|পাত্রাস|پاترا', { ar: 'باتراس', tr: 'Ballıbadra' }),
      ]),
      R('Crete', 'کریٹ|क्रीट|ক্রিট|کرت', { ar: 'كريت', tr: 'Girit', es: 'Creta', fr: 'Crète' }, [
        T('Heraklion', 35.3387, 25.1442, 'ہیراکلیون|हेराक्लिओन|হেরাক্লিয়ন|هراکلیون', { ar: 'هيراكليون', tr: 'Kandiye', es: 'Heraclión', fr: 'Héraklion' }),
      ]),
      R('Thessaly', 'تھیسالی|थिसली|থেসালি|تسالی', { ar: 'ثيساليا', tr: 'Teselya', es: 'Tesalia', fr: 'Thessalie' }, [
        T('Larissa', 39.6390, 22.4191, 'لاریسا|लारिसा|লারিসা|لاریسا', { ar: 'لاريسا', tr: 'Yenişehir' }),
      ]),
    ],
  },
  // Phase 6 (2026-09-30): Serbia, Montenegro, Croatia, Slovenia, Bulgaria, Romania.
  //   Serbia, Montenegro, Croatia, Slovenia: the Bosnian Islamic Community's method (its vaktija covers Sandžak and
  //   northern Montenegro: within 1-3 min); first Asr time, as the vaktija prints.
  //   Bulgaria: the Chief Mufti's takvim is based on Diyanet; Diyanet's Bulgarian times fit its standard method.
  //   Romania: Diyanet's Romanian times fit its European method; Hanafi (Tatar and Turkish majority).
  {
    slug: 'serbia', cc: 'RS', continent: 'europe', name: { en: 'Serbia' }, langs: ['en'],
    tz: 'Europe/Belgrade', method: 'Bosnia', defaultSect: 'shafii',
    regions: [
      R('Sandžak', 'سنجاق|सांजाक|সানজাক|سنجاق', { ar: 'السنجق', tr: 'Sancak', es: 'Sandžak', fr: 'Sandjak' }, [
        T('Novi Pazar', 43.1367, 20.5122, 'نووی پازار|नोवी पाज़ार|নোভি পাজার|نووی پازار', { ar: 'نوفي بازار', tr: 'Yenipazar' }),
        T('Sjenica', 43.2731, 20.0025, 'سئینیتسا|स्येनित्सा|সিয়েনিৎসা|سینیتسا', { ar: 'سيينيتسا', tr: 'Seniçe' }),
        T('Tutin', 42.9900, 20.3383, 'توتن|तुतिन|তুতিন|توتین', { ar: 'توتين' }),
        T('Prijepolje', 43.3906, 19.6483, 'پریئیپولیے|प्रियेपोल्ये|প্রিয়েপোলিয়ে|پریپولیه', { ar: 'بريبوليه' }),
        T('Priboj', 43.5836, 19.5256, 'پریبوئی|प्रिबोय|প্রিবোই|پریبوی', { ar: 'بريبوي' }),
      ]),
      R('Belgrade', 'بلغراد|बेलग्रेड|বেলগ্রেড|بلگراد', { ar: 'بلغراد', tr: 'Belgrad', es: 'Belgrado', fr: 'Belgrade' }, [
        T('Belgrade', 44.7866, 20.4489, 'بلغراد|बेलग्रेड|বেলগ্রেড|بلگراد', { ar: 'بلغراد', tr: 'Belgrad', es: 'Belgrado', fr: 'Belgrade' }),
      ]),
      R('Vojvodina', 'وویوودینا|वोयवोदीना|ভয়ভোদিনা|وویوودینا', { ar: 'فويفودينا', tr: 'Voyvodina', es: 'Voivodina', fr: 'Voïvodine' }, [
        T('Novi Sad', 45.2671, 19.8335, 'نووی ساد|नोवी साद|নোভি সাদ|نووی ساد', { ar: 'نوفي ساد' }),
        T('Subotica', 46.1005, 19.6651, 'سوبوتیتسا|सुबोतित्सा|সুবোতিৎসা|سوبوتیتسا', { ar: 'سوبوتيتسا' }),
      ]),
      R('Pčinja', 'پچینیا|प्चिन्या|পচিনিয়া|پچینیا', { ar: 'بتشينيا' }, [
        T('Preševo', 42.3094, 21.6494, 'پریشیوو|प्रेशेवो|প্রেশেভো|پرشوو', { ar: 'بريشيفو', tr: 'Preşova' }),
        T('Bujanovac', 42.4611, 21.7669, 'بویانووتس|बुयानोवाट्स|বুয়ানোভাৎস|بویانوواتس', { ar: 'بويانوفاتس' }),
      ]),
      R('Central Serbia', 'وسطی سربیا|मध्य सर्बिया|মধ্য সার্বিয়া|صربستان مرکزی', { ar: 'وسط صربيا', tr: 'Orta Sırbistan', es: 'Serbia Central', fr: 'Serbie centrale' }, [
        T('Niš', 43.3209, 21.8958, 'نِش|निश|নিশ|نیش', { ar: 'نيش', tr: 'Niş' }),
        T('Kragujevac', 44.0128, 20.9114, 'کراگویواتس|क्रागुयेवाट्स|ক্রাগুয়েভাৎস|کراگویواتس', { ar: 'كراغوييفاتس' }),
      ]),
    ],
  },
  {
    slug: 'montenegro', cc: 'ME', continent: 'europe', name: { en: 'Montenegro' }, langs: ['en'],
    tz: 'Europe/Podgorica', method: 'Bosnia', defaultSect: 'shafii',
    regions: [
      R('Northern Region', 'شمالی علاقہ|उत्तरी क्षेत्र|উত্তরাঞ্চল|منطقه شمالی', { ar: 'المنطقة الشمالية', tr: 'Kuzey bölgesi', es: 'Región Norte', fr: 'Région du Nord' }, [
        T('Rožaje', 42.8404, 20.1665, 'روژایے|रोझाये|রোজায়ে|روژایه', { ar: 'روجايه', tr: 'Rožaje' }),
        T('Bijelo Polje', 43.0383, 19.7475, 'بیئیلو پولیے|बियेलो पोल्ये|বিয়েলো পোলিয়ে|بیلو پولیه', { ar: 'بييلو بوليه', tr: 'Akova' }),
        T('Pljevlja', 43.3567, 19.3584, 'پلیولیا|प्ल्येवल्या|প্লিয়েভলিয়া|پلیولیا', { ar: 'بليفليا', tr: 'Taşlıca' }),
        T('Plav', 42.5967, 19.9456, 'پلاو|प्लाव|প্লাভ|پلاو', { ar: 'بلاف' }),
        T('Gusinje', 42.5617, 19.8339, 'گوسینیے|गुसिन्ये|গুসিনিয়ে|گوسینیه', { ar: 'غوسينيه' }),
      ]),
      R('Central Region', 'وسطی علاقہ|मध्य क्षेत्र|মধ্যাঞ্চল|منطقه مرکزی', { ar: 'المنطقة الوسطى', tr: 'Orta bölge', es: 'Región Central', fr: 'Région centrale' }, [
        T('Podgorica', 42.4304, 19.2594, 'پوڈگوریتسا|पोडगोरित्सा|পডগোরিৎসা|پودگوریتسا', { ar: 'بودغوريتسا', tr: 'Podgoriçe' }),
      ]),
      R('Coastal Region', 'ساحلی علاقہ|तटीय क्षेत्र|উপকূলীয় অঞ্চল|منطقه ساحلی', { ar: 'المنطقة الساحلية', tr: 'Kıyı bölgesi', es: 'Región Costera', fr: 'Région côtière' }, [
        T('Ulcinj', 41.9294, 19.2244, 'اولتسن|उल्त्सिन्य|উলৎসিন|اولچین', { ar: 'أولتسين', tr: 'Ülgün' }),
        T('Bar', 42.0931, 19.1003, 'بار|बार|বার|بار', { ar: 'بار' }),
      ]),
    ],
  },
  {
    slug: 'croatia', cc: 'HR', continent: 'europe', name: { en: 'Croatia' }, langs: ['en'],
    tz: 'Europe/Zagreb', method: 'Bosnia', defaultSect: 'shafii',
    regions: [
      R('City of Zagreb', 'زغرب شہر|ज़ाग्रेब शहर|জাগরেব শহর|شهر زاگرب', { ar: 'مدينة زغرب', tr: 'Zagreb şehri', es: 'Ciudad de Zagreb', fr: 'Ville de Zagreb' }, [
        T('Zagreb', 45.8150, 15.9819, 'زغرب|ज़ाग्रेब|জাগরেব|زاگرب', { ar: 'زغرب', tr: 'Zagreb' }),
      ]),
      R('Primorje-Gorski Kotar', 'پریموریے-گورسکی کوتار|प्रिमोर्ये-गोर्स्की कोतार|প্রিমোরিয়ে-গোর্স্কি কোতার|پریموریه-گورسکی کوتار', { ar: 'بريموريه غورسكي كوتار' }, [
        T('Rijeka', 45.3271, 14.4422, 'رئیکا|रियेका|রিয়েকা|ریه‌کا', { ar: 'رييكا' }),
      ]),
      R('Split-Dalmatia', 'سپلٹ-ڈالمیشیا|स्प्लिट-डालमेशिया|স্প্লিট-ডালমেশিয়া|اسپلیت-دالماسی', { ar: 'سبليت دالماسيا', fr: 'Split-Dalmatie' }, [
        T('Split', 43.5081, 16.4402, 'سپلٹ|स्प्लिट|স্প্লিট|اسپلیت', { ar: 'سبليت', tr: 'Split' }),
      ]),
      R('Osijek-Baranja', 'اوسیئیک-بارانیا|ओसियेक-बरान्या|ওসিয়েক-বারানিয়া|اوسیک-بارانیا', { ar: 'أوسييك بارانيا' }, [
        T('Osijek', 45.5550, 18.6955, 'اوسیئیک|ओसियेक|ওসিয়েক|اوسیک', { ar: 'أوسييك', tr: 'Ösek' }),
      ]),
      R('Sisak-Moslavina', 'سیساک-موسلاوینا|सिसाक-मोस्लाविना|সিসাক-মোস্লাভিনা|سیساک-موسلاوینا', { ar: 'سيساك موسلافينا' }, [
        T('Sisak', 45.4870, 16.3754, 'سیساک|सिसाक|সিসাক|سیساک', { ar: 'سيساك' }),
      ]),
    ],
  },
  {
    slug: 'slovenia', cc: 'SI', continent: 'europe', name: { en: 'Slovenia' }, langs: ['en'],
    tz: 'Europe/Ljubljana', method: 'Bosnia', defaultSect: 'shafii',
    regions: [
      R('Central Slovenia', 'وسطی سلووینیا|मध्य स्लोवेनिया|মধ্য স্লোভেনিয়া|اسلوونی مرکزی', { ar: 'وسط سلوفينيا', tr: 'Orta Slovenya', es: 'Eslovenia Central', fr: 'Slovénie-Centrale' }, [
        T('Ljubljana', 46.0569, 14.5058, 'لیوبلیانا|ल्यूब्लियाना|লিউব্লিয়ানা|لیوبلیانا', { ar: 'ليوبليانا', tr: 'Lyubliyana', es: 'Liubliana' }),
      ]),
      R('Drava', 'دراوا|द्रावा|দ্রাভা|دراوا', { ar: 'درافا', fr: 'Drave' }, [
        T('Maribor', 46.5547, 15.6459, 'ماریبور|मारिबोर|মারিবোর|ماریبور', { ar: 'ماريبور' }),
      ]),
      R('Upper Carniola', 'بالائی کارنیولا|ऊपरी कार्निओला|ঊর্ধ্ব কার্নিওলা|کارنیولای علیا', { ar: 'كارنيولا العليا', es: 'Alta Carniola', fr: 'Haute-Carniole' }, [
        T('Jesenice', 46.4367, 14.0526, 'یسینیتسے|येसेनित्से|য়েসেনিৎসে|یسنیتسه', { ar: 'ييسينيتسه' }),
      ]),
    ],
  },
  {
    slug: 'bulgaria', cc: 'BG', continent: 'europe', name: { en: 'Bulgaria' }, langs: ['en'],
    tz: 'Europe/Sofia', method: 'Turkey', defaultSect: 'shafii',
    regions: [
      R('Sofia City', 'صوفیہ شہر|सोफ़िया शहर|সোফিয়া শহর|شهر صوفیه', { ar: 'مدينة صوفيا', tr: 'Sofya şehri', es: 'Ciudad de Sofía', fr: 'Ville de Sofia' }, [
        T('Sofia', 42.6977, 23.3219, 'صوفیہ|सोफ़िया|সোফিয়া|صوفیه', { ar: 'صوفيا', tr: 'Sofya', es: 'Sofía' }),
      ]),
      R('Kardzhali Province', 'کرجالی صوبہ|कर्जाली प्रांत|কার্দঝালি প্রদেশ|استان کرجالی', { ar: 'مقاطعة كارجالي', tr: 'Kırcaali ili' }, [
        T('Kardzhali', 41.6500, 25.3667, 'کرجالی|कर्जाली|কার্দঝালি|کرجالی', { ar: 'كارجالي', tr: 'Kırcaali' }),
        T('Momchilgrad', 41.5272, 25.4086, 'مومچلگراد|मोमचिलग्राद|মোমচিলগ্রাদ|مومچیلگراد', { ar: 'مومتشيلغراد', tr: 'Mestanlı' }),
      ]),
      R('Plovdiv Province', 'پلووڈیو صوبہ|प्लोवदिव प्रांत|প্লোভদিভ প্রদেশ|استان پلوودیو', { ar: 'مقاطعة بلوفديف', tr: 'Filibe ili' }, [
        T('Plovdiv', 42.1354, 24.7453, 'پلووڈیو|प्लोवदिव|প্লোভদিভ|پلوودیو', { ar: 'بلوفديف', tr: 'Filibe' }),
      ]),
      R('Varna Province', 'وارنا صوبہ|वार्ना प्रांत|ভার্না প্রদেশ|استان وارنا', { ar: 'مقاطعة فارنا', tr: 'Varna ili' }, [
        T('Varna', 43.2141, 27.9147, 'وارنا|वार्ना|ভার্না|وارنا', { ar: 'فارنا' }),
      ]),
      R('Shumen Province', 'شومن صوبہ|शुमेन प्रांत|শুমেন প্রদেশ|استان شومن', { ar: 'مقاطعة شومن', tr: 'Şumnu ili' }, [
        T('Shumen', 43.2712, 26.9361, 'شومن|शुमेन|শুমেন|شومن', { ar: 'شومن', tr: 'Şumnu' }),
      ]),
      R('Razgrad Province', 'رازگراد صوبہ|राज़ग्राद प्रांत|রাজগ্রাদ প্রদেশ|استان رازگراد', { ar: 'مقاطعة رازغراد', tr: 'Razgrad ili' }, [
        T('Razgrad', 43.5261, 26.5243, 'رازگراد|राज़ग्राद|রাজগ্রাদ|رازگراد', { ar: 'رازغراد', tr: 'Hezargrad' }),
      ]),
      R('Targovishte Province', 'ترگووشتے صوبہ|तर्गोविश्ते प्रांत|তারগোভিশতে প্রদেশ|استان ترگوویشته', { ar: 'مقاطعة تارغوفيشته', tr: 'Tırgovişte ili' }, [
        T('Targovishte', 43.2512, 26.5722, 'ترگووشتے|तर्गोविश्ते|তারগোভিশতে|ترگوویشته', { ar: 'تارغوفيشته', tr: 'Eski Cuma' }),
      ]),
      R('Ruse Province', 'روسے صوبہ|रूसे प्रांत|রুসে প্রদেশ|استان روسه', { ar: 'مقاطعة روسه', tr: 'Rusçuk ili' }, [
        T('Ruse', 43.8356, 25.9657, 'روسے|रूसे|রুসে|روسه', { ar: 'روسه', tr: 'Rusçuk' }),
      ]),
      R('Haskovo Province', 'خاسکوو صوبہ|हास्कोवो प्रांत|হাস্কোভো প্রদেশ|استان خاسکوو', { ar: 'مقاطعة هاسكوفو', tr: 'Hasköy ili' }, [
        T('Haskovo', 41.9344, 25.5554, 'خاسکوو|हास्कोवो|হাস্কোভো|خاسکوو', { ar: 'هاسكوفو', tr: 'Hasköy' }),
      ]),
      R('Burgas Province', 'برگاس صوبہ|बुर्गास प्रांत|বুর্গাস প্রদেশ|استان بورگاس', { ar: 'مقاطعة بورغاس', tr: 'Burgaz ili' }, [
        T('Burgas', 42.5048, 27.4626, 'برگاس|बुर्गास|বুর্গাস|بورگاس', { ar: 'بورغاس', tr: 'Burgaz' }),
      ]),
      R('Smolyan Province', 'سمولیان صوبہ|स्मोल्यान प्रांत|স্মোলিয়ান প্রদেশ|استان اسمولیان', { ar: 'مقاطعة سموليان', tr: 'Paşmaklı ili' }, [
        T('Smolyan', 41.5774, 24.7011, 'سمولیان|स्मोल्यान|স্মোলিয়ান|اسمولیان', { ar: 'سموليان', tr: 'Paşmaklı' }),
      ]),
      R('Blagoevgrad Province', 'بلاگوئیوگراد صوبہ|ब्लागोएवग्राद प्रांत|ব্লাগোয়েভগ্রাদ প্রদেশ|استان بلاگویفگراد', { ar: 'مقاطعة بلاغويفغراد', tr: 'Yukarı Cuma ili' }, [
        T('Blagoevgrad', 42.0209, 23.0943, 'بلاگوئیوگراد|ब्लागोएवग्राद|ব্লাগোয়েভগ্রাদ|بلاگویفگراد', { ar: 'بلاغويفغراد', tr: 'Yukarı Cuma' }),
        T('Gotse Delchev', 41.5733, 23.7275, 'گوتسے دیلچیو|गोत्से देल्चेव|গোৎসে দেলচেভ|گوتسه دلچف', { ar: 'غوتسه ديلتشيف', tr: 'Nevrekop' }),
      ]),
    ],
  },
  {
    slug: 'romania', cc: 'RO', continent: 'europe', name: { en: 'Romania' }, langs: ['en'],
    tz: 'Europe/Bucharest', method: 'DiyanetEurope', defaultSect: 'hanafi',
    regions: [
      R('Constanța County', 'کونسٹانٹسا کاؤنٹی|कोंस्तांत्सा काउंटी|কনস্তানৎসা কাউন্টি|شهرستان کنستانتا', { ar: 'مقاطعة كونستانتا', tr: 'Köstence ili', es: 'Distrito de Constanza', fr: 'Județ de Constanța' }, [
        T('Constanța', 44.1598, 28.6348, 'کونسٹانٹسا|कोंस्तांत्सा|কনস্তানৎসা|کنستانتا', { ar: 'كونستانتا', tr: 'Köstence', es: 'Constanza', fr: 'Constanța' }),
        T('Medgidia', 44.2500, 28.2833, 'میجیدیا|मेद्जिदिया|মেজিদিয়া|مجیدیا', { ar: 'ميدجيديا', tr: 'Mecidiye' }),
        T('Mangalia', 43.8175, 28.5828, 'مانگالیا|मंगालिया|মাঙ্গালিয়া|مانگالیا', { ar: 'مانغاليا', tr: 'Mankalya' }),
      ]),
      R('Tulcea County', 'تولچا کاؤنٹی|तुल्चेआ काउंटी|তুলচা কাউন্টি|شهرستان تولچا', { ar: 'مقاطعة تولتشا', tr: 'Tulça ili', es: 'Distrito de Tulcea', fr: 'Județ de Tulcea' }, [
        T('Tulcea', 45.1787, 28.8050, 'تولچا|तुल्चेआ|তুলচা|تولچا', { ar: 'تولتشا', tr: 'Tulça' }),
        T('Babadag', 44.8933, 28.7119, 'باباداغ|बाबादाग|বাবাদাগ|باباداغ', { ar: 'باباداغ', tr: 'Babadağ' }),
      ]),
      R('Bucharest', 'بخارسٹ|बुख़ारेस्ट|বুখারেস্ট|بخارست', { ar: 'بوخارست', tr: 'Bükreş', es: 'Bucarest', fr: 'Bucarest' }, [
        T('Bucharest', 44.4268, 26.1025, 'بخارسٹ|बुख़ारेस्ट|বুখারেস্ট|بخارست', { ar: 'بوخارست', tr: 'Bükreş', es: 'Bucarest', fr: 'Bucarest' }),
      ]),
      R('Cluj County', 'کلوج کاؤنٹی|क्लूज काउंटी|ক্লুজ কাউন্টি|شهرستان کلوژ', { ar: 'مقاطعة كلوج', tr: 'Kluj ili' }, [
        T('Cluj-Napoca', 46.7712, 23.6236, 'کلوج-ناپوکا|क्लूज-नापोका|ক্লুজ-নাপোকা|کلوژ-ناپوکا', { ar: 'كلوج نابوكا', tr: 'Kaloşvar' }),
      ]),
      R('Iași County', 'یاش کاؤنٹی|याश काउंटी|ইয়াশি কাউন্টি|شهرستان یاش', { ar: 'مقاطعة ياش', tr: 'Yaş ili' }, [
        T('Iași', 47.1585, 27.6014, 'یاش|याश|ইয়াশি|یاش', { ar: 'ياش', tr: 'Yaş' }),
      ]),
      R('Timiș County', 'تیمش کاؤنٹی|तिमिश काउंटी|তিমিশ কাউন্টি|شهرستان تیمیش', { ar: 'مقاطعة تيميش', tr: 'Tımışvar ili' }, [
        T('Timișoara', 45.7489, 21.2087, 'تیمشوارا|तिमिशोआरा|তিমিশোয়ারা|تیمیشوارا', { ar: 'تيميشوارا', tr: 'Temeşvar' }),
      ]),
    ],
  },
  // Phase 7 (2026-09-30): Russia and the Caucasus.
  //   Russia: DUM RT (Tatarstan) method, fitted to its 2026 timetable for every day of the year, incl. the fixed
  //   summer rule that makes it work at 55-61°N; Hanafi (Tatar and Bashkir majority). Dagestan, Chechnya and
  //   Ingushetia: the Dagestan Muftiate's timetable method and Shafi'i, their majority school.
  //   Azerbaijan: Jafria default (Shia majority) with the Caucasus Muslims Board (QMİ) calendar method;
  //   Sunni times by Diyanet. Georgia: Diyanet for Sunni times, QMİ for Jafria (Kvemo Kartli's Azerbaijanis).
  {
    slug: 'russia', cc: 'RU', continent: 'europe', name: { en: 'Russia' }, langs: ['en'],
    tz: 'Europe/Moscow', method: 'Tatarstan', defaultSect: 'hanafi',
    regions: [
      R('Moscow', 'ماسکو|मॉस्को|মস্কো|مسکو', { ar: 'موسكو', tr: 'Moskova', es: 'Moscú', fr: 'Moscou' }, [
        T('Moscow', 55.7558, 37.6173, 'ماسکو|मॉस्को|মস্কো|مسکو', { ar: 'موسكو', tr: 'Moskova', es: 'Moscú', fr: 'Moscou' }),
      ]),
      R('Saint Petersburg', 'سینٹ پیٹرزبرگ|सेंट पीटर्सबर्ग|সেন্ট পিটার্সবার্গ|سن پترزبورگ', { ar: 'سانت بطرسبورغ', tr: 'Sankt-Peterburg', es: 'San Petersburgo', fr: 'Saint-Pétersbourg' }, [
        T('Saint Petersburg', 59.9343, 30.3351, 'سینٹ پیٹرزبرگ|सेंट पीटर्सबर्ग|সেন্ট পিটার্সবার্গ|سن پترزبورگ', { ar: 'سانت بطرسبورغ', tr: 'Sankt-Peterburg', es: 'San Petersburgo', fr: 'Saint-Pétersbourg' }),
      ]),
      R('Tatarstan', 'تاتارستان|तातारस्तान|তাতারস্তান|تاتارستان', { ar: 'تتارستان', tr: 'Tataristan', es: 'Tartaristán', fr: 'Tatarstan' }, [
        T('Kazan', 55.7887, 49.1221, 'قازان|कज़ान|কাজান|قازان', { ar: 'قازان', tr: 'Kazan', es: 'Kazán' }),
        T('Naberezhnye Chelny', 55.7436, 52.3958, 'نابیریژنیے چلنی|नाबेरेज़्निये चेल्नी|নাবেরেঝনিয়ে চেলনি|نابرژنیه چلنی', { ar: 'نابيريجني تشيلني', tr: 'Yar Çallı' }),
        T('Nizhnekamsk', 55.6366, 51.8245, 'نژنیکامسک|निज़्नेकाम्स्क|নিঝনেকামস্ক|نیژنه‌کامسک', { ar: 'نيجنيكامسك', tr: 'Tübən Kama' }),
        T('Almetyevsk', 54.9014, 52.2973, 'المیتیفسک|अल्मेत्येव्स्क|আলমেতিয়েভস্ক|آلمتیفسک', { ar: 'ألميتيفسك', tr: 'Älmät' }),
        T('Bugulma', 54.5364, 52.7972, 'بوگلما|बुगुल्मा|বুগুলমা|بوگولما', { ar: 'بوغولما', tr: 'Bögelmä' }),
        T('Yelabuga', 55.7610, 52.0640, 'یلابوگا|येलाबुगा|ইয়েলাবুগা|یلابوگا', { ar: 'يلابوغا', tr: 'Alabuga' }),
      ]),
      R('Bashkortostan', 'باشقورتستان|बशकोर्तोस्तान|বাশকোর্তোস্তান|باشقیرستان', { ar: 'باشقورتوستان', tr: 'Başkurdistan', es: 'Baskortostán', fr: 'Bachkirie' }, [
        T('Ufa', 54.7388, 55.9721, 'اوفا|ऊफ़ा|উফা|اوفا', { ar: 'أوفا' }, 'Asia/Yekaterinburg'),
        T('Sterlitamak', 53.6300, 55.9500, 'سترلیتاماک|स्तेरलितामाक|স্তেরলিতামাক|استرلیتاماک', { ar: 'ستيرليتاماك' }, 'Asia/Yekaterinburg'),
        T('Salavat', 53.3617, 55.9244, 'سلاوات|सलावत|সালাভাত|سالاوات', { ar: 'سالافات' }, 'Asia/Yekaterinburg'),
        T('Neftekamsk', 56.0920, 54.2660, 'نیفتیکامسک|नेफ़्तेकाम्स्क|নেফতেকামস্ক|نفته‌کامسک', { ar: 'نيفتيكامسك' }, 'Asia/Yekaterinburg'),
      ]),
      Object.assign(R('Dagestan', 'داغستان|दागिस्तान|দাগেস্তান|داغستان', { ar: 'داغستان', tr: 'Dağıstan', es: 'Daguestán', fr: 'Daghestan' }, [
        T('Makhachkala', 42.9849, 47.5047, 'ماخاچ قلعہ|माखचकला|মাখাচকালা|ماخاچ‌قلعه', { ar: 'محج قلعة', tr: 'Mahaçkale' }),
        T('Derbent', 42.0578, 48.2889, 'دربند|देरबेंत|দেরবেন্ত|دربند', { ar: 'دربند', tr: 'Derbent' }),
        T('Khasavyurt', 43.2500, 46.5833, 'خاساویورت|खासाव्यूर्त|খাসাভিয়ুর্ত|خاساویورت', { ar: 'خاسافيورت', tr: 'Hasavyurt' }),
        T('Kaspiysk', 42.8816, 47.6389, 'کاسپیسک|कास्पीस्क|কাস্পিস্ক|کاسپیسک', { ar: 'كاسبيسك' }),
        T('Buynaksk', 42.8189, 47.1167, 'بویناکسک|बुइनाक्स्क|বুইনাকস্ক|بویناکسک', { ar: 'بويناكسك' }),
        T('Kizlyar', 43.8500, 46.7167, 'کزلیار|किज़्ल्यार|কিজলিয়ার|قیزلار', { ar: 'كيزليار', tr: 'Kızlar' }),
      ]), { method: 'Dagestan', defaultSect: 'shafii' }),
      Object.assign(R('Chechnya', 'چیچنیا|चेचन्या|চেচনিয়া|چچن', { ar: 'الشيشان', tr: 'Çeçenistan', es: 'Chechenia', fr: 'Tchétchénie' }, [
        T('Grozny', 43.3178, 45.6949, 'گروزنی|ग्रोज़्नी|গ্রোজনি|گروزنی', { ar: 'غروزني', tr: 'Grozni' }),
        T('Gudermes', 43.3500, 46.1000, 'گودرمیس|गुदेरमेस|গুদেরমেস|گودرمس', { ar: 'غوديرميس' }),
        T('Urus-Martan', 43.1333, 45.5333, 'اوروس مارتان|उरुस-मार्तान|উরুস-মার্তান|اوروس-مارتان', { ar: 'أوروس مارتان' }),
        T('Shali', 43.1500, 45.9000, 'شالی|शाली|শালি|شالی', { ar: 'شالي' }),
      ]), { method: 'Dagestan', defaultSect: 'shafii' }),
      Object.assign(R('Ingushetia', 'انگوشیتیا|इंगुशेतिया|ইঙ্গুশেতিয়া|اینگوش', { ar: 'إنغوشيا', tr: 'İnguşetya', es: 'Ingusetia', fr: 'Ingouchie' }, [
        T('Nazran', 43.2250, 44.7650, 'نزران|नाज़रान|নাজরান|نزران', { ar: 'نازران' }),
        T('Magas', 43.1667, 44.8000, 'ماگاس|मागास|মাগাস|ماگاس', { ar: 'ماغاس' }),
        T('Malgobek', 43.5083, 44.5875, 'مالگوبیک|मालगोबेक|মালগোবেক|مالگوبک', { ar: 'مالغوبيك' }),
      ]), { method: 'Dagestan', defaultSect: 'shafii' }),
      R('Kabardino-Balkaria', 'کباردینو-بلکاریا|काबर्दिनो-बल्कारिया|কাবার্দিনো-বালকারিয়া|کاباردینو-بالکاریا', { ar: 'قبردينو بلقاريا', tr: 'Kabardey-Balkarya', es: 'Kabardino-Balkaria', fr: 'Kabardino-Balkarie' }, [
        T('Nalchik', 43.4981, 43.6189, 'نالچک|नालचिक|নালচিক|نالچیک', { ar: 'نالتشيك', tr: 'Nalçik' }),
        T('Baksan', 43.6819, 43.5342, 'باکسان|बक्सान|বাকসান|باکسان', { ar: 'باكسان' }),
      ]),
      R('Karachay-Cherkessia', 'کراچے-چرکسیا|कराचाय-चेरकेसिया|কারাচাই-চের্কেসিয়া|قره‌چای-چرکسیا', { ar: 'قراتشاي تشيركيسيا', tr: 'Karaçay-Çerkesya', es: 'Karacháyevo-Cherkesia', fr: 'Karatchaïévo-Tcherkessie' }, [
        T('Cherkessk', 44.2233, 42.0578, 'چرکیسک|चेर्केस्क|চের্কেস্ক|چرکسک', { ar: 'تشيركيسك', tr: 'Çerkessk' }),
        T('Karachayevsk', 43.7731, 41.9143, 'کراچائیفسک|कराचायेव्स्क|কারাচায়েভস্ক|قره‌چایفسک', { ar: 'كاراتشايفسك', tr: 'Karaçayevsk' }),
      ]),
      R('Adygea', 'ادیغیا|अदिगेया|আদিগেয়া|آدیغه', { ar: 'الأديغيا', tr: 'Adıgey', es: 'Adiguesia', fr: 'Adyguée' }, [
        T('Maykop', 44.6098, 40.1006, 'مائکوپ|माइकोप|মাইকোপ|مایکوپ', { ar: 'مايكوب' }),
      ]),
      R('Astrakhan Oblast', 'آستراخان اوبلاست|अस्त्राख़ान ओब्लास्ट|আস্ত্রাখান ওব্লাস্ট|استان آستاراخان', { ar: 'أستراخان أوبلاست', tr: 'Astrahan Oblastı', es: 'Óblast de Astracán', fr: 'Oblast d’Astrakhan' }, [
        T('Astrakhan', 46.3497, 48.0408, 'آستراخان|अस्त्राख़ान|আস্ত্রাখান|آستاراخان', { ar: 'أستراخان', tr: 'Hacıtarhan', es: 'Astracán' }, 'Europe/Astrakhan'),
      ]),
      R('Volga Region', 'وولگا علاقہ|वोल्गा क्षेत्र|ভোলগা অঞ্চল|منطقه ولگا', { ar: 'منطقة الفولغا', tr: 'İdil bölgesi', es: 'Región del Volga', fr: 'Région de la Volga' }, [
        T('Nizhny Novgorod', 56.2965, 43.9361, 'نیژنی نووگورود|निज़्नी नोवगोरोद|নিঝনি নভগোরোদ|نیژنی نووگورود', { ar: 'نيجني نوفغورود', tr: 'Nijni Novgorod', es: 'Nizhni Nóvgorod', fr: 'Nijni Novgorod' }),
        T('Samara', 53.1959, 50.1002, 'سمارا|समारा|সামারা|سامارا', { ar: 'سامارا' }, 'Europe/Samara'),
        T('Tolyatti', 53.5303, 49.3461, 'تولیاتی|तोल्याती|তোলিয়াত্তি|تولیاتی', { ar: 'تولياتي' }, 'Europe/Samara'),
        T('Ulyanovsk', 54.3142, 48.4031, 'الیانوفسک|उल्यानोव्स्क|উলিয়ানোভস্ক|اولیانوفسک', { ar: 'أوليانوفسك' }, 'Europe/Ulyanovsk'),
        T('Penza', 53.1959, 45.0183, 'پینزا|पेन्ज़ा|পেনজা|پنزا', { ar: 'بينزا' }),
        T('Saratov', 51.5336, 46.0343, 'ساراتوف|सारातोव|সারাতোভ|ساراتوف', { ar: 'ساراتوف' }, 'Europe/Saratov'),
        T('Volgograd', 48.7080, 44.5133, 'وولگوگراد|वोल्गोग्राद|ভলগোগ্রাদ|ولگاگراد', { ar: 'فولغوغراد' }, 'Europe/Volgograd'),
        T('Izhevsk', 56.8526, 53.2045, 'ایژیفسک|इज़ेव्स्क|ইজেভস্ক|ایژفسک', { ar: 'إيجيفسك' }, 'Europe/Samara'),
      ]),
      R('Urals', 'یورال|यूराल|উরাল|اورال', { ar: 'الأورال', tr: 'Ural', es: 'Urales', fr: 'Oural' }, [
        T('Yekaterinburg', 56.8389, 60.6057, 'یکاترینبرگ|येकातेरिनबर्ग|ইয়েকাতেরিনবুর্গ|یکاترینبورگ', { ar: 'يكاترينبورغ', tr: 'Yekaterinburg', es: 'Ekaterimburgo', fr: 'Iekaterinbourg' }, 'Asia/Yekaterinburg'),
        T('Chelyabinsk', 55.1644, 61.4368, 'چیلیابنسک|चेल्याबिंस्क|চেলিয়াবিনস্ক|چلیابینسک', { ar: 'تشيليابينسك', tr: 'Çelyabinsk', fr: 'Tcheliabinsk' }, 'Asia/Yekaterinburg'),
        T('Orenburg', 51.7682, 55.0970, 'اورنبرگ|ओरेनबर्ग|ওরেনবুর্গ|اورنبورگ', { ar: 'أورنبورغ', tr: 'Orenburg', es: 'Oremburgo', fr: 'Orenbourg' }, 'Asia/Yekaterinburg'),
        T('Perm', 58.0105, 56.2502, 'پرم|पर्म|পার্ম|پرم', { ar: 'بيرم' }, 'Asia/Yekaterinburg'),
        T('Tyumen', 57.1522, 65.5272, 'تیومن|त्यूमेन|তিউমেন|تیومن', { ar: 'تيومين', tr: 'Tümen' }, 'Asia/Yekaterinburg'),
        T('Tobolsk', 58.2000, 68.2667, 'توبولسک|तोबोल्स्क|তোবোলস্ক|توبولسک', { ar: 'توبولسك' }, 'Asia/Yekaterinburg'),
        T('Surgut', 61.2540, 73.3962, 'سرگوت|सुरगुत|সুরগুত|سورگوت', { ar: 'سورغوت' }, 'Asia/Yekaterinburg'),
        T('Nizhnevartovsk', 60.9344, 76.5531, 'نیژنیوارتوفسک|निज़्नेवार्तोव्स्क|নিঝনেভার্তোভস্ক|نیژنه‌وارتوفسک', { ar: 'نيجنفارتوفسك' }, 'Asia/Yekaterinburg'),
      ]),
      R('Siberia', 'سائبیریا|साइबेरिया|সাইবেরিয়া|سیبری', { ar: 'سيبيريا', tr: 'Sibirya', es: 'Siberia', fr: 'Sibérie' }, [
        T('Omsk', 54.9885, 73.3242, 'اومسک|ओम्स्क|ওমস্ক|اومسک', { ar: 'أومسك' }, 'Asia/Omsk'),
        T('Novosibirsk', 55.0084, 82.9357, 'نووسیبرسک|नोवोसिबिर्स्क|নভোসিবিরস্ক|نووسیبیرسک', { ar: 'نوفوسيبيرسك' }, 'Asia/Novosibirsk'),
      ]),
    ],
  },
  {
    slug: 'azerbaijan', cc: 'AZ', continent: 'europe', name: { en: 'Azerbaijan' }, langs: ['en'],
    tz: 'Asia/Baku', method: 'Turkey', jafariMethod: 'QMI', defaultSect: 'jafria',
    regions: [
      R('Absheron', 'ابشیرون|अबशेरोन|আবশেরন|آبشوران', { ar: 'أبشرون', tr: 'Abşeron', es: 'Absherón', fr: 'Apchéron' }, [
        T('Baku', 40.4093, 49.8671, 'باکو|बाकू|বাকু|باکو', { ar: 'باكو', tr: 'Bakü', es: 'Bakú', fr: 'Bakou' }),
        T('Sumqayit', 40.5897, 49.6686, 'سمگائیت|सुमगायित|সুমগাইত|سومقاییت', { ar: 'سومقاييت', tr: 'Sumgayıt', fr: 'Soumgaït' }),
      ]),
      R('Ganja-Dashkasan', 'گنجہ-داشکسن|गांजा-दाशकसन|গাঞ্জা-দাশকাসান|گنجه-داشکسن', { ar: 'كنجه داشكسن', tr: 'Gence-Daşkesen' }, [
        T('Ganja', 40.6828, 46.3606, 'گنجہ|गांजा|গাঞ্জা|گنجه', { ar: 'كنجه', tr: 'Gence', es: 'Gəncə', fr: 'Gandja' }),
      ]),
      R('Central Aran', 'وسطی آران|मध्य अरान|মধ্য আরান|آران مرکزی', { ar: 'آران الوسطى', tr: 'Orta Aran', es: 'Arán Central', fr: 'Aran central' }, [
        T('Mingachevir', 40.7703, 47.0496, 'منگیچویر|मिंगाचेविर|মিঙ্গাচেভির|مینگه‌چویر', { ar: 'مينغاتشيفير', tr: 'Mingeçevir' }),
        T('Yevlakh', 40.6183, 47.1500, 'یولاخ|येव्लाख|ইয়েভলাখ|یولاخ', { ar: 'يفلاخ', tr: 'Yevlah' }),
        T('Barda', 40.3744, 47.1267, 'بردع|बर्दा|বার্দা|برده', { ar: 'برذعة', tr: 'Berde' }),
      ]),
      R('Shirvan-Salyan', 'شیروان-سالیان|शिरवान-सल्यान|শিরভান-সালিয়ান|شروان-سالیان', { ar: 'شروان سليان', tr: 'Şirvan-Salyan' }, [
        T('Shirvan', 39.9319, 48.9203, 'شیروان|शिरवान|শিরভান|شروان', { ar: 'شروان', tr: 'Şirvan' }),
      ]),
      R('Lankaran-Astara', 'لنکران-آستارا|लंकरान-अस्तारा|লঙ্করান-আস্তারা|لنکران-آستارا', { ar: 'لنكران أستارا', tr: 'Lenkeran-Astara' }, [
        T('Lankaran', 38.7536, 48.8511, 'لنکران|लंकरान|লঙ্করান|لنکران', { ar: 'لنكران', tr: 'Lenkeran' }),
      ]),
      R('Nakhchivan', 'نخجوان|नख़चिवान|নাখচিভান|نخجوان', { ar: 'نخجوان', tr: 'Nahçıvan', es: 'Najicheván', fr: 'Nakhitchevan' }, [
        T('Nakhchivan', 39.2089, 45.4122, 'نخجوان|नख़चिवान|নাখচিভান|نخجوان', { ar: 'نخجوان', tr: 'Nahçıvan', es: 'Najicheván', fr: 'Nakhitchevan' }),
      ]),
      R('Karabakh', 'قرہ باغ|कराबाख़|কারাবাখ|قره‌باغ', { ar: 'قره باغ', tr: 'Karabağ', es: 'Karabaj', fr: 'Karabagh' }, [
        T('Shusha', 39.7581, 46.7500, 'شوشا|शूशा|শুশা|شوشا', { ar: 'شوشا', tr: 'Şuşa', fr: 'Choucha' }),
        T('Aghdam', 39.9911, 46.9275, 'آغدام|अग़दाम|আগদাম|آغدام', { ar: 'أغدام', tr: 'Ağdam' }),
      ]),
      Object.assign(R('Shaki-Zagatala', 'شکی-زقاتالا|शेकी-ज़काताला|শেকি-জাকাতালা|شکی-زاکاتالا', { ar: 'شكي زاقاتالا', tr: 'Şeki-Zakatala' }, [
        T('Shaki', 41.1919, 47.1706, 'شکی|शेकी|শেকি|شکی', { ar: 'شكي', tr: 'Şeki', fr: 'Cheki' }),
        T('Zaqatala', 41.6336, 46.6433, 'زقاتالا|ज़काताला|জাকাতালা|زاکاتالا', { ar: 'زاقاتالا', tr: 'Zakatala' }),
      ]), { defaultSect: 'shafii' }),
      Object.assign(R('Guba-Khachmaz', 'قبا-خچماز|गुबा-ख़ाचमाज़|গুবা-খাচমাজ|قوبا-خاچماز', { ar: 'قوبا خاتشماز', tr: 'Kuba-Haçmaz' }, [
        T('Quba', 41.3611, 48.5125, 'قبا|कूबा|কুবা|قوبا', { ar: 'قوبا', tr: 'Kuba', fr: 'Kouba' }),
        T('Khachmaz', 41.4633, 48.8058, 'خچماز|ख़ाचमाज़|খাচমাজ|خاچماز', { ar: 'خاتشماز', tr: 'Haçmaz' }),
      ]), { defaultSect: 'shafii' }),
    ],
  },
  {
    slug: 'georgia', cc: 'GE', continent: 'europe', name: { en: 'Georgia' }, langs: ['en'],
    tz: 'Asia/Tbilisi', method: 'Turkey', jafariMethod: 'QMI', defaultSect: 'hanafi',
    regions: [
      R('Tbilisi', 'تبلیسی|त्बिलिसी|তিবিলিসি|تفلیس', { ar: 'تبليسي', tr: 'Tiflis', es: 'Tiflis', fr: 'Tbilissi' }, [
        T('Tbilisi', 41.7151, 44.8271, 'تبلیسی|त्बिलिसी|তিবিলিসি|تفلیس', { ar: 'تبليسي', tr: 'Tiflis', es: 'Tiflis', fr: 'Tbilissi' }),
      ]),
      R('Adjara', 'اجاریا|अजारिया|আজারিয়া|آجارستان', { ar: 'أجاريا', tr: 'Acara', es: 'Ayaria', fr: 'Adjarie' }, [
        T('Batumi', 41.6168, 41.6367, 'باتومی|बातूमी|বাতুমি|باتومی', { ar: 'باتومي', tr: 'Batum', es: 'Batumi', fr: 'Batoumi' }),
        T('Kobuleti', 41.8214, 41.7792, 'کوبولیتی|कोबुलेती|কোবুলেতি|کوبولتی', { ar: 'كوبوليتي', tr: 'Çürüksu' }),
        T('Khulo', 41.6431, 42.3103, 'خولو|ख़ुलो|খুলো|خولو', { ar: 'خولو', tr: 'Hulo' }),
      ]),
      Object.assign(R('Kvemo Kartli', 'کویمو کارتلی|क्वेमो कार्तली|কভেমো কার্তলি|کومو کارتلی', { ar: 'كفيمو كارتلي', tr: 'Kvemo Kartli', fr: 'Basse-Kartlie' }, [
        T('Marneuli', 41.4767, 44.8081, 'مارنیولی|मार्नेउली|মার্নেউলি|مارنئولی', { ar: 'مارنيولي', tr: 'Sarvan' }),
        T('Gardabani', 41.4608, 45.0917, 'گردبانی|गार्दाबानी|গার্দাবানি|گاردابانی', { ar: 'غاردباني', tr: 'Karayazı' }),
        T('Bolnisi', 41.4478, 44.5392, 'بولنیسی|बोल्निसी|বোলনিসি|بولنیسی', { ar: 'بولنيسي', tr: 'Bolus' }),
      ]), { defaultSect: 'jafria' }),
      Object.assign(R('Kakheti', 'کاخیتی|काख़ेती|কাখেতি|کاختی', { ar: 'كاخيتي', tr: 'Kaheti', es: 'Kajetia', fr: 'Kakhétie' }, [
        T('Duisi', 42.1333, 45.2500, 'دوئیسی|दुइसी|দুইসি|دویسی', { ar: 'دويسي' }),
        T('Telavi', 41.9198, 45.4731, 'تیلاوی|तेलावी|তেলাভি|تلاوی', { ar: 'تيلافي' }),
      ]), { defaultSect: 'shafii' }),
    ],
  },
  {
    slug: 'armenia', cc: 'AM', continent: 'europe', name: { en: 'Armenia' }, langs: ['en'],
    tz: 'Asia/Yerevan', method: 'MuslimWorldLeague', jafariMethod: 'Tehran', defaultSect: 'jafria',
    regions: [
      R('Yerevan', 'یریوان|येरेवान|ইয়েরেভান|ایروان', { ar: 'يريفان', tr: 'Erivan', es: 'Ereván', fr: 'Erevan' }, [
        T('Yerevan', 40.1792, 44.4991, 'یریوان|येरेवान|ইয়েরেভান|ایروان', { ar: 'يريفان', tr: 'Erivan', es: 'Ereván', fr: 'Erevan' }),
      ]),
      R('Syunik', 'سیونیک|स्यूनिक|সিউনিক|سیونیک', { ar: 'سيونيك', tr: 'Sünik' }, [
        T('Meghri', 38.9025, 46.2447, 'میغری|मेघरी|মেঘরি|مغری', { ar: 'ميغري', tr: 'Megri' }),
      ]),
    ],
  },
  // Phase 8 (2026-09-30): Ukraine, Belarus, Moldova, Poland, Czechia, Slovakia, Hungary.
  //   Ukraine: DUMU calendars (islam.ua), first Asr as printed; Crimea (listed under Ukraine, clock time as used
  //   there) Hanafi, the Crimean Tatars' school. Poland: MZR's own widget (MWL 18/17, first Asr). Hungary: MME's
  //   monthly tables (ISNA 15/15, first Asr). Belarus, Moldova, Czechia, Slovakia: no official timetable found,
  //   MWL + Hanafi.
  {
    slug: 'ukraine', cc: 'UA', continent: 'europe', name: { en: 'Ukraine' }, langs: ['en'],
    tz: 'Europe/Kyiv', method: 'DUMU', defaultSect: 'shafii',
    regions: [
      R('Kyiv', 'کیف|कीव|কিয়েভ|کی‌یف', { ar: 'كييف', tr: 'Kiev', es: 'Kiev', fr: 'Kiev' }, [
        T('Kyiv', 50.4501, 30.5234, 'کیف|कीव|কিয়েভ|کی‌یف', { ar: 'كييف', tr: 'Kiev', es: 'Kiev', fr: 'Kiev' }),
      ]),
      R('Kharkiv Oblast', 'خارکیف اوبلاست|ख़ारकीव ओब्लास्ट|খারকিভ ওব্লাস্ট|استان خارکیف', { ar: 'أوبلاست خاركيف', tr: 'Harkiv Oblastı', es: 'Óblast de Járkov', fr: 'Oblast de Kharkiv' }, [
        T('Kharkiv', 49.9935, 36.2304, 'خارکیف|ख़ारकीव|খারকিভ|خارکیف', { ar: 'خاركيف', tr: 'Harkiv', es: 'Járkov', fr: 'Kharkiv' }),
      ]),
      R('Odesa Oblast', 'اوڈیسا اوبلاست|ओडेसा ओब्लास्ट|ওডেসা ওব্লাস্ট|استان اودسا', { ar: 'أوبلاست أوديسا', tr: 'Odessa Oblastı', es: 'Óblast de Odesa', fr: 'Oblast d’Odessa' }, [
        T('Odesa', 46.4825, 30.7233, 'اوڈیسا|ओडेसा|ওডেসা|اودسا', { ar: 'أوديسا', tr: 'Odessa', es: 'Odesa', fr: 'Odessa' }),
      ]),
      R('Dnipropetrovsk Oblast', 'دنیپروپیتروفسک اوبلاست|द्नीप्रोपेत्रोव्स्क ओब्लास्ट|দ্নিপ্রোপেত্রোভস্ক ওব্লাস্ট|استان دنیپروپتروفسک', { ar: 'أوبلاست دنيبروبتروفسك', tr: 'Dnipropetrovsk Oblastı', es: 'Óblast de Dnipropetrovsk', fr: 'Oblast de Dnipropetrovsk' }, [
        T('Dnipro', 48.4647, 35.0462, 'دنیپرو|द्नीप्रो|দ্নিপ্রো|دنیپرو', { ar: 'دنيبرو', tr: 'Dnipro' }),
      ]),
      R('Zaporizhzhia Oblast', 'زاپوریژیا اوبلاست|ज़ापोरिज़्ज़िया ओब्लास्ट|জাপোরিঝঝিয়া ওব্লাস্ট|استان زاپوریژیا', { ar: 'أوبلاست زاباروجيا', tr: 'Zaporijya Oblastı', es: 'Óblast de Zaporiyia', fr: 'Oblast de Zaporijjia' }, [
        T('Zaporizhzhia', 47.8388, 35.1396, 'زاپوریژیا|ज़ापोरिज़्ज़िया|জাপোরিঝঝিয়া|زاپوریژیا', { ar: 'زاباروجيا', tr: 'Zaporijya', es: 'Zaporiyia', fr: 'Zaporijjia' }),
      ]),
      R('Lviv Oblast', 'لویو اوبلاست|ल्वीव ओब्लास्ट|লভিভ ওব্লাস্ট|استان لویو', { ar: 'أوبلاست لفيف', tr: 'Lviv Oblastı', es: 'Óblast de Leópolis', fr: 'Oblast de Lviv' }, [
        T('Lviv', 49.8397, 24.0297, 'لویو|ल्वीव|লভিভ|لویو', { ar: 'لفيف', tr: 'Lviv', es: 'Leópolis', fr: 'Lviv' }),
      ]),
      R('Mykolaiv Oblast', 'میکولائیف اوبلاست|मिकोलाइव ओब्लास्ट|মিকোলাইভ ওব্লাস্ট|استان میکولایف', { ar: 'أوبلاست ميكولايف', tr: 'Mıkolayiv Oblastı', es: 'Óblast de Mykolaiv', fr: 'Oblast de Mykolaïv' }, [
        T('Mykolaiv', 46.9750, 31.9946, 'میکولائیف|मिकोलाइव|মিকোলাইভ|میکولایف', { ar: 'ميكولايف', tr: 'Mıkolayiv', fr: 'Mykolaïv' }),
      ]),
      R('Kherson Oblast', 'خیرسون اوبلاست|ख़ेरसॉन ओब्लास्ट|খেরসন ওব্লাস্ট|استان خرسون', { ar: 'أوبلاست خيرسون', tr: 'Herson Oblastı', es: 'Óblast de Jersón', fr: 'Oblast de Kherson' }, [
        T('Kherson', 46.6354, 32.6169, 'خیرسون|ख़ेरसॉन|খেরসন|خرسون', { ar: 'خيرسون', tr: 'Herson', es: 'Jersón', fr: 'Kherson' }),
      ]),
      R('Central Ukraine', 'وسطی یوکرین|मध्य यूक्रेन|মধ্য ইউক্রেন|اوکراین مرکزی', { ar: 'وسط أوكرانيا', tr: 'Orta Ukrayna', es: 'Ucrania central', fr: 'Ukraine centrale' }, [
        T('Poltava', 49.5883, 34.5514, 'پولتاوا|पोल्टावा|পোলতাভা|پولتاوا', { ar: 'بولتافا' }),
        T('Cherkasy', 49.4444, 32.0598, 'چرکاسی|चेरकासी|চেরকাসি|چرکاسی', { ar: 'تشيركاسي', tr: 'Çerkası', es: 'Cherkasy', fr: 'Tcherkassy' }),
        T('Sumy', 50.9077, 34.7981, 'سومی|सूमी|সুমি|سومی', { ar: 'سومي' }),
      ]),
      Object.assign(R('Autonomous Republic of Crimea', 'خود مختار جمہوریہ کریمیا|क्रीमिया स्वायत्त गणराज्य|ক্রিমিয়া স্বায়ত্তশাসিত প্রজাতন্ত্র|جمهوری خودمختار کریمه', { ar: 'جمهورية القرم ذاتية الحكم', tr: 'Kırım Özerk Cumhuriyeti', es: 'República Autónoma de Crimea', fr: 'République autonome de Crimée' }, [
        T('Simferopol', 44.9521, 34.1024, 'سمفروپول|सिम्फ़ेरोपोल|সিমফেরোপোল|سیمفروپل', { ar: 'سيمفيروبول', tr: 'Akmescit' }, 'Europe/Simferopol'),
        T('Bakhchysarai', 44.7514, 33.8606, 'باغچہ سرائے|बख़चिसराय|বাখচিসারাই|باغچه‌سرای', { ar: 'باغجة سراي', tr: 'Bahçesaray', es: 'Bajchisarái', fr: 'Bakhtchyssaraï' }, 'Europe/Simferopol'),
        T('Yevpatoria', 45.1904, 33.3669, 'ییوپاتوریا|येवपतोरिया|ইয়েভপাতোরিয়া|یوپاتوریا', { ar: 'يفباتوريا', tr: 'Gözleve', es: 'Eupatoria', fr: 'Eupatoria' }, 'Europe/Simferopol'),
        T('Kerch', 45.3563, 36.4671, 'کرچ|केर्च|কের্চ|کرچ', { ar: 'كيرتش', tr: 'Kerç' }, 'Europe/Simferopol'),
      ]), { defaultSect: 'hanafi' }),
    ],
  },
  {
    slug: 'belarus', cc: 'BY', continent: 'europe', name: { en: 'Belarus' }, langs: ['en'],
    tz: 'Europe/Minsk', method: 'MuslimWorldLeague', defaultSect: 'hanafi',
    regions: [
      R('Minsk', 'منسک|मिन्स्क|মিনস্ক|مینسک', { ar: 'مينسك', tr: 'Minsk', es: 'Minsk', fr: 'Minsk' }, [
        T('Minsk', 53.9006, 27.5590, 'منسک|मिन्स्क|মিনস্ক|مینسک', { ar: 'مينسك' }),
      ]),
      R('Grodno Region', 'گرودنو علاقہ|ग्रोद्नो क्षेत्र|গ্রদনো অঞ্চল|منطقه گرودنو', { ar: 'منطقة غرودنو', tr: 'Grodno bölgesi', es: 'Región de Grodno', fr: 'Voblast de Hrodna' }, [
        T('Hrodna', 53.6694, 23.8131, 'ہرودنا|ह्रोद्ना|হ্রদনা|هرودنا', { ar: 'هرودنا', tr: 'Grodno', es: 'Grodno', fr: 'Hrodna' }),
        T('Iwye', 53.9294, 25.7725, 'ایویے|इव्ये|ইভিয়ে|ایویه', { ar: 'إيفيه' }),
        T('Navahrudak', 53.5942, 25.8191, 'نواہروداک|नवाह्रुदक|নাভাহ্রুদাক|ناواهروداک', { ar: 'نافاهروداك' }),
        T('Slonim', 53.0869, 25.3163, 'سلونیم|स्लोनिम|স্লোনিম|سلونیم', { ar: 'سلونيم' }),
      ]),
      R('Brest Region', 'بریسٹ علاقہ|ब्रेस्ट क्षेत्र|ব্রেস্ট অঞ্চল|منطقه برست', { ar: 'منطقة بريست', tr: 'Brest bölgesi', es: 'Región de Brest', fr: 'Voblast de Brest' }, [
        T('Brest', 52.0976, 23.7341, 'بریسٹ|ब्रेस्ट|ব্রেস্ট|برست', { ar: 'بريست' }),
      ]),
      R('Eastern Belarus', 'مشرقی بیلاروس|पूर्वी बेलारूस|পূর্ব বেলারুশ|بلاروس شرقی', { ar: 'شرق بيلاروس', tr: 'Doğu Belarus', es: 'Bielorrusia oriental', fr: 'Biélorussie orientale' }, [
        T('Homel', 52.4412, 30.9878, 'ہومیل|होमेल|হোমেল|هومل', { ar: 'غوميل', tr: 'Gomel', es: 'Gómel', fr: 'Homiel' }),
        T('Vitebsk', 55.1904, 30.2049, 'ویتیبسک|वितेब्स्क|ভিতেবস্ক|ویتبسک', { ar: 'فيتيبسك' }),
        T('Mogilev', 53.9007, 30.3314, 'موگیلیو|मोगिलेव|মোগিলেভ|موگیلف', { ar: 'موغيليف', fr: 'Moguilev' }),
      ]),
    ],
  },
  {
    slug: 'moldova', cc: 'MD', continent: 'europe', name: { en: 'Moldova' }, langs: ['en'],
    tz: 'Europe/Chisinau', method: 'MuslimWorldLeague', defaultSect: 'hanafi',
    regions: [
      R('Chișinău', 'کیشیناؤ|किशिनाउ|কিশিনাউ|کیشیناو', { ar: 'كيشيناو', tr: 'Kişinev', es: 'Chisináu', fr: 'Chișinău' }, [
        T('Chișinău', 47.0105, 28.8638, 'کیشیناؤ|किशिनाउ|কিশিনাউ|کیشیناو', { ar: 'كيشيناو', tr: 'Kişinev', es: 'Chisináu' }),
      ]),
      R('Northern Moldova', 'شمالی مالدووا|उत्तरी मोल्दोवा|উত্তর মলদোভা|مولداوی شمالی', { ar: 'شمال مولدوفا', tr: 'Kuzey Moldova', es: 'Moldavia del Norte', fr: 'Moldavie du Nord' }, [
        T('Bălți', 47.7617, 27.9289, 'بالتس|बाल्त्सी|বাল্টসি|بالتی', { ar: 'بالتسي', tr: 'Belçi' }),
      ]),
      R('Gagauzia', 'گاگاؤزیا|गागाउज़िया|গাগাউজিয়া|گاگائوزیا', { ar: 'غاغاوزيا', tr: 'Gagavuzya', es: 'Gagauzia', fr: 'Gagaouzie' }, [
        T('Comrat', 46.2956, 28.6550, 'کومرات|कोमरात|কোমরাত|کومرات', { ar: 'كومرات', tr: 'Komrat' }),
      ]),
    ],
  },
  {
    slug: 'poland', cc: 'PL', continent: 'europe', name: { en: 'Poland' }, langs: ['en'],
    tz: 'Europe/Warsaw', method: 'MuslimWorldLeague', defaultSect: 'shafii',
    regions: [
      R('Masovian Voivodeship', 'مازوویا صوبہ|माज़ोवियन प्रांत|মাজোভিয়া প্রদেশ|استان مازووی', { ar: 'مقاطعة مازوفيا', tr: 'Mazovya Voyvodalığı', es: 'Voivodato de Mazovia', fr: 'Voïvodie de Mazovie' }, [
        T('Warsaw', 52.2297, 21.0122, 'وارسا|वारसॉ|ওয়ারশ|ورشو', { ar: 'وارسو', tr: 'Varşova', es: 'Varsovia', fr: 'Varsovie' }),
      ]),
      R('Podlaskie Voivodeship', 'پودلاسکی صوبہ|पोडलास्की प्रांत|পোদলাস্কিয়ে প্রদেশ|استان پودلاسکی', { ar: 'مقاطعة بودلاسكي', tr: 'Podlaski Voyvodalığı', es: 'Voivodato de Podlaquia', fr: 'Voïvodie de Podlachie' }, [
        T('Białystok', 53.1325, 23.1688, 'بیالیستوک|बियालिस्तोक|বিয়ালিস্তক|بیالیستوک', { ar: 'بياويستوك', tr: 'Białystok' }),
        T('Kruszyniany', 53.1797, 23.7950, 'کروشینیانی|क्रुशिन्यानी|ক্রুশিনিয়ানি|کروشینیانی', { ar: 'كروشينياني' }),
        T('Bohoniki', 53.3931, 23.5461, 'بوہونیکی|बोहोनिकी|বোহোনিকি|بوهونیکی', { ar: 'بوهونيكي' }),
        T('Sokółka', 53.4064, 23.5031, 'سوکولکا|सोकुल्का|সোকুলকা|سوکولکا', { ar: 'سوكوفكا' }),
      ]),
      R('Pomeranian Voivodeship', 'پومیرانیا صوبہ|पोमेरेनियन प्रांत|পোমেরানিয়া প্রদেশ|استان پامرانی', { ar: 'مقاطعة بوميرانيا', tr: 'Pomeranya Voyvodalığı', es: 'Voivodato de Pomerania', fr: 'Voïvodie de Poméranie' }, [
        T('Gdańsk', 54.3520, 18.6466, 'گدانسک|ग्दान्स्क|গদানস্ক|گدانسک', { ar: 'غدانسك', tr: 'Gdańsk', es: 'Gdansk', fr: 'Gdańsk' }),
      ]),
      R('Lesser Poland Voivodeship', 'چھوٹا پولینڈ صوبہ|लघु पोलैंड प्रांत|লেসার পোল্যান্ড প্রদেশ|استان لهستان کوچک', { ar: 'مقاطعة بولندا الصغرى', tr: 'Küçük Polonya Voyvodalığı', es: 'Voivodato de Pequeña Polonia', fr: 'Voïvodie de Petite-Pologne' }, [
        T('Kraków', 50.0647, 19.9450, 'کراکوف|क्राकोव|ক্রাকুফ|کراکوف', { ar: 'كراكوف', tr: 'Krakov', es: 'Cracovia', fr: 'Cracovie' }),
      ]),
      R('Lower Silesian Voivodeship', 'زیریں سائلیشیا صوبہ|निचला सिलेसिया प्रांत|নিম্ন সাইলেশিয়া প্রদেশ|استان سیلزی سفلی', { ar: 'مقاطعة سيليزيا السفلى', tr: 'Aşağı Silezya Voyvodalığı', es: 'Voivodato de Baja Silesia', fr: 'Voïvodie de Basse-Silésie' }, [
        T('Wrocław', 51.1079, 17.0385, 'وروتسواف|व्रोत्सवाफ़|ভ্রোৎসোয়াফ|وروتسواف', { ar: 'فروتسواف', tr: 'Wrocław', es: 'Breslavia', fr: 'Wrocław' }),
      ]),
      R('Greater Poland Voivodeship', 'بڑا پولینڈ صوبہ|बृहत पोलैंड प्रांत|বৃহত্তর পোল্যান্ড প্রদেশ|استان لهستان بزرگ', { ar: 'مقاطعة بولندا الكبرى', tr: 'Büyük Polonya Voyvodalığı', es: 'Voivodato de Gran Polonia', fr: 'Voïvodie de Grande-Pologne' }, [
        T('Poznań', 52.4064, 16.9252, 'پوزنان|पोज़्नान|পোজনান|پوزنان', { ar: 'بوزنان', tr: 'Poznań', es: 'Poznan', fr: 'Poznań' }),
      ]),
      R('Central Poland', 'وسطی پولینڈ|मध्य पोलैंड|মধ্য পোল্যান্ড|لهستان مرکزی', { ar: 'وسط بولندا', tr: 'Orta Polonya', es: 'Polonia central', fr: 'Pologne centrale' }, [
        T('Łódź', 51.7592, 19.4560, 'ووج|वूच|উচ|ووچ', { ar: 'وودج', tr: 'Łódź', es: 'Lodz', fr: 'Łódź' }),
        T('Lublin', 51.2465, 22.5684, 'لوبلن|लुब्लिन|লুবলিন|لوبلین', { ar: 'لوبلين' }),
      ]),
      R('Silesian Voivodeship', 'سائلیشیا صوبہ|सिलेसियन प्रांत|সাইলেশিয়া প্রদেশ|استان سیلزی', { ar: 'مقاطعة سيليزيا', tr: 'Silezya Voyvodalığı', es: 'Voivodato de Silesia', fr: 'Voïvodie de Silésie' }, [
        T('Katowice', 50.2649, 19.0238, 'کاتوویتسے|कातोवित्से|কাতোভিৎসে|کاتوویتسه', { ar: 'كاتوفيتسه' }),
      ]),
      R('West Pomeranian Voivodeship', 'مغربی پومیرانیا صوبہ|पश्चिमी पोमेरेनियन प्रांत|পশ্চিম পোমেরানিয়া প্রদেশ|استان پامرانی غربی', { ar: 'مقاطعة بوميرانيا الغربية', tr: 'Batı Pomeranya Voyvodalığı', es: 'Voivodato de Pomerania Occidental', fr: 'Voïvodie de Poméranie-Occidentale' }, [
        T('Szczecin', 53.4285, 14.5528, 'شچیچن|श्चेचिन|শচেচিন|اشچین', { ar: 'شتشيتسين', tr: 'Szczecin', es: 'Szczecin', fr: 'Szczecin' }),
      ]),
    ],
  },
  {
    slug: 'czechia', cc: 'CZ', continent: 'europe', name: { en: 'Czechia' }, langs: ['en'],
    tz: 'Europe/Prague', method: 'MuslimWorldLeague', defaultSect: 'hanafi',
    regions: [
      R('Prague', 'پراگ|प्राग|প্রাগ|پراگ', { ar: 'براغ', tr: 'Prag', es: 'Praga', fr: 'Prague' }, [
        T('Prague', 50.0755, 14.4378, 'پراگ|प्राग|প্রাগ|پراگ', { ar: 'براغ', tr: 'Prag', es: 'Praga', fr: 'Prague' }),
      ]),
      R('South Moravian Region', 'جنوبی موراویا علاقہ|दक्षिण मोराविया क्षेत्र|দক্ষিণ মোরাভিয়া অঞ্চল|منطقه موراویای جنوبی', { ar: 'إقليم جنوب مورافيا', tr: 'Güney Moravya Bölgesi', es: 'Región de Moravia Meridional', fr: 'Région de Moravie-du-Sud' }, [
        T('Brno', 49.1951, 16.6068, 'برنو|ब्रनो|ব্রনো|برنو', { ar: 'برنو' }),
      ]),
      R('Bohemia', 'بوہیمیا|बोहेमिया|বোহেমিয়া|بوهم', { ar: 'بوهيميا', tr: 'Bohemya', es: 'Bohemia', fr: 'Bohême' }, [
        T('Teplice', 50.6404, 13.8245, 'ٹیپلیٹسے|तेप्लित्से|তেপলিৎসে|تپلیتسه', { ar: 'تبليتسه' }),
        T('Karlovy Vary', 50.2319, 12.8720, 'کارلووی واری|कार्लोवी वारी|কার্লোভি ভারি|کارلووی واری', { ar: 'كارلوفي فاري', fr: 'Karlovy Vary' }),
      ]),
      R('Moravian-Silesian Region', 'موراویا-سائلیشیا علاقہ|मोराविया-सिलेसिया क्षेत्र|মোরাভিয়া-সাইলেশিয়া অঞ্চল|منطقه موراوی-سیلزی', { ar: 'إقليم مورافيا وسيليزيا', tr: 'Moravya-Silezya Bölgesi', es: 'Región de Moravia-Silesia', fr: 'Région de Moravie-Silésie' }, [
        T('Ostrava', 49.8209, 18.2625, 'اوستراوا|ओस्त्रावा|অস্ট্রাভা|اوستراوا', { ar: 'أوسترافا' }),
      ]),
    ],
  },
  {
    slug: 'slovakia', cc: 'SK', continent: 'europe', name: { en: 'Slovakia' }, langs: ['en'],
    tz: 'Europe/Bratislava', method: 'MuslimWorldLeague', defaultSect: 'hanafi',
    regions: [
      R('Bratislava Region', 'براتیسلاوا علاقہ|ब्रातिस्लावा क्षेत्र|ব্রাতিস্লাভা অঞ্চল|منطقه براتیسلاوا', { ar: 'إقليم براتيسلافا', tr: 'Bratislava Bölgesi', es: 'Región de Bratislava', fr: 'Région de Bratislava' }, [
        T('Bratislava', 48.1486, 17.1077, 'براتیسلاوا|ब्रातिस्लावा|ব্রাতিস্লাভা|براتیسلاوا', { ar: 'براتيسلافا', tr: 'Bratislava', es: 'Bratislava', fr: 'Bratislava' }),
      ]),
      R('Košice Region', 'کوشیتسے علاقہ|कोशित्से क्षेत्र|কোশিৎসে অঞ্চল|منطقه کوشیتسه', { ar: 'إقليم كوشيتسه', tr: 'Košice Bölgesi', es: 'Región de Košice', fr: 'Région de Košice' }, [
        T('Košice', 48.7164, 21.2611, 'کوشیتسے|कोशित्से|কোশিৎসে|کوشیتسه', { ar: 'كوشيتسه', tr: 'Kassa' }),
      ]),
    ],
  },
  {
    slug: 'hungary', cc: 'HU', continent: 'europe', name: { en: 'Hungary' }, langs: ['en'],
    tz: 'Europe/Budapest', method: 'NorthAmerica', defaultSect: 'shafii',
    regions: [
      R('Budapest', 'بوڈاپسٹ|बुडापेस्ट|বুদাপেস্ট|بوداپست', { ar: 'بودابست', tr: 'Budapeşte', es: 'Budapest', fr: 'Budapest' }, [
        T('Budapest', 47.4979, 19.0402, 'بوڈاپسٹ|बुडापेस्ट|বুদাপেস্ট|بوداپست', { ar: 'بودابست', tr: 'Budapeşte' }),
      ]),
      R('Eastern Hungary', 'مشرقی ہنگری|पूर्वी हंगरी|পূর্ব হাঙ্গেরি|مجارستان شرقی', { ar: 'شرق المجر', tr: 'Doğu Macaristan', es: 'Hungría oriental', fr: 'Hongrie orientale' }, [
        T('Debrecen', 47.5316, 21.6273, 'ڈیبریسن|डेब्रेत्सेन|ডেব্রেৎসেন|دبرسن', { ar: 'دبرتسن', tr: 'Debrecen' }),
        T('Szeged', 46.2530, 20.1414, 'سیگید|सेगेद|সেগেদ|سگد', { ar: 'سيجد', tr: 'Segedin' }),
        T('Eger', 47.9025, 20.3772, 'ایگر|एगेर|এগের|اگر', { ar: 'إغر', tr: 'Eğri' }),
      ]),
      R('Western Hungary', 'مغربی ہنگری|पश्चिमी हंगरी|পশ্চিম হাঙ্গেরি|مجارستان غربی', { ar: 'غرب المجر', tr: 'Batı Macaristan', es: 'Hungría occidental', fr: 'Hongrie occidentale' }, [
        T('Pécs', 46.0727, 18.2323, 'پیچ|पेच|পেচ|پچ', { ar: 'بيتش', tr: 'Peçuy' }),
        T('Győr', 47.6875, 17.6504, 'جیور|ड्यॉर|জিওর|جور', { ar: 'جيور', tr: 'Yanıkkale' }),
      ]),
    ],
  },
  // Phase 9 (2026-09-30): Ireland, Estonia, Latvia, Lithuania. No official timetable data found (ICCI Dublin
  // publishes none; the Baltic Tatar muftiates none online): MWL + Hanafi, the UK's and the Tatars' school.
  {
    slug: 'ireland', cc: 'IE', continent: 'europe', name: { en: 'Ireland' }, langs: ['en'],
    tz: 'Europe/Dublin', method: 'MuslimWorldLeague', defaultSect: 'hanafi',
    regions: [
      R('Leinster', 'لینسٹر|लेनस्टर|লেইনস্টার|لینستر', { ar: 'لينستر', tr: 'Leinster', es: 'Leinster', fr: 'Leinster' }, [
        T('Dublin', 53.3498, -6.2603, 'ڈبلن|डबलिन|ডাবলিন|دوبلین', { ar: 'دبلن', tr: 'Dublin', es: 'Dublín', fr: 'Dublin' }),
      ]),
      R('Munster', 'منسٹر|मंस्टर|মুনস্টার|مانستر', { ar: 'مونستر', tr: 'Munster', es: 'Munster', fr: 'Munster' }, [
        T('Cork', 51.8985, -8.4756, 'کارک|कॉर्क|কর্ক|کورک', { ar: 'كورك' }),
        T('Limerick', 52.6638, -8.6267, 'لیمرک|लिमरिक|লিমেরিক|لیمریک', { ar: 'ليمريك' }),
        T('Waterford', 52.2593, -7.1101, 'واٹرفورڈ|वॉटरफ़ोर्ड|ওয়াটারফোর্ড|واترفورد', { ar: 'واترفورد' }),
      ]),
      R('Connacht', 'کوناخٹ|कोनाक्ट|কনাক্ট|کوناخت', { ar: 'كوناخت', tr: 'Connacht', es: 'Connacht', fr: 'Connacht' }, [
        T('Galway', 53.2707, -9.0568, 'گالوے|गॉलवे|গলওয়ে|گالوی', { ar: 'غالواي' }),
        T('Ballyhaunis', 53.7629, -8.7650, 'بالی ہونس|बैलीहॉनिस|বালিহনিস|بالی‌هانیس', { ar: 'باليهونيس' }),
      ]),
    ],
  },
  {
    slug: 'estonia', cc: 'EE', continent: 'europe', name: { en: 'Estonia' }, langs: ['en'],
    tz: 'Europe/Tallinn', method: 'MuslimWorldLeague', defaultSect: 'hanafi',
    regions: [
      R('Harju County', 'ہاریو کاؤنٹی|हार्यू काउंटी|হারইউ কাউন্টি|شهرستان هاریو', { ar: 'مقاطعة هاريو', tr: 'Harju ili', es: 'Condado de Harju', fr: 'Comté de Harju' }, [
        T('Tallinn', 59.4370, 24.7536, 'ٹالن|तालिन|তাল্লিন|تالین', { ar: 'تالين', tr: 'Tallinn', es: 'Tallin', fr: 'Tallinn' }),
      ]),
      R('Southern and Eastern Estonia', 'جنوبی و مشرقی ایسٹونیا|दक्षिणी और पूर्वी एस्टोनिया|দক্ষিণ ও পূর্ব এস্তোনিয়া|استونی جنوبی و شرقی', { ar: 'جنوب وشرق إستونيا', tr: 'Güney ve Doğu Estonya', es: 'Estonia meridional y oriental', fr: 'Estonie du Sud et de l’Est' }, [
        T('Tartu', 58.3780, 26.7290, 'تارتو|तार्तू|তার্তু|تارتو', { ar: 'تارتو' }),
        T('Narva', 59.3797, 28.1791, 'نروا|नार्वा|নারভা|نارفا', { ar: 'نارفا' }),
      ]),
    ],
  },
  {
    slug: 'latvia', cc: 'LV', continent: 'europe', name: { en: 'Latvia' }, langs: ['en'],
    tz: 'Europe/Riga', method: 'MuslimWorldLeague', defaultSect: 'hanafi',
    regions: [
      R('Riga', 'ریگا|रीगा|রিগা|ریگا', { ar: 'ريغا', tr: 'Riga', es: 'Riga', fr: 'Riga' }, [
        T('Riga', 56.9496, 24.1052, 'ریگا|रीगा|রিগা|ریگا', { ar: 'ريغا' }),
      ]),
      R('Latgale', 'لاتگالے|लातगाले|লাতগালে|لاتگاله', { ar: 'لاتغاله', tr: 'Latgale', es: 'Latgale', fr: 'Latgale' }, [
        T('Daugavpils', 55.8714, 26.5161, 'داؤگاوپلس|दाउगावपिल्स|দাউগাভপিলস|داوگاوپیلس', { ar: 'داوغافبيلس' }),
      ]),
    ],
  },
  {
    slug: 'lithuania', cc: 'LT', continent: 'europe', name: { en: 'Lithuania' }, langs: ['en'],
    tz: 'Europe/Vilnius', method: 'MuslimWorldLeague', defaultSect: 'hanafi',
    regions: [
      R('Vilnius County', 'ولنیئس کاؤنٹی|विल्नियस काउंटी|ভিলনিয়াস কাউন্টি|شهرستان ویلنیوس', { ar: 'مقاطعة فيلنيوس', tr: 'Vilnius ili', es: 'Condado de Vilna', fr: 'Apskritis de Vilnius' }, [
        T('Vilnius', 54.6872, 25.2797, 'ولنیئس|विल्नियस|ভিলনিয়াস|ویلنیوس', { ar: 'فيلنيوس', tr: 'Vilnius', es: 'Vilna', fr: 'Vilnius' }),
        T('Nemėžis', 54.6392, 25.3867, 'نیمیژیس|नेमेझिस|নেমেঝিস|نمژیس', { ar: 'نيميجيس' }),
      ]),
      R('Kaunas County', 'کاؤناس کاؤنٹی|काउनास काउंटी|কাউনাস কাউন্টি|شهرستان کاوناس', { ar: 'مقاطعة كاوناس', tr: 'Kaunas ili', es: 'Condado de Kaunas', fr: 'Apskritis de Kaunas' }, [
        T('Kaunas', 54.8985, 23.9036, 'کاؤناس|काउनास|কাউনাস|کاوناس', { ar: 'كاوناس' }),
      ]),
      R('Alytus County', 'الیتوس کاؤنٹی|अलीतुस काउंटी|আলিতুস কাউন্টি|شهرستان آلیتوس', { ar: 'مقاطعة أليتوس', tr: 'Alytus ili', es: 'Condado de Alytus', fr: 'Apskritis d’Alytus' }, [
        T('Raižiai', 54.4228, 24.1297, 'رائیژیائی|राइझियाई|রাইঝিয়াই|رایژیای', { ar: 'رايجياي' }),
        T('Alytus', 54.3963, 24.0459, 'الیتوس|अलीतुस|আলিতুস|آلیتوس', { ar: 'أليتوس' }),
      ]),
      R('Klaipėda County', 'کلائپیدا کاؤنٹی|क्लाइपेदा काउंटी|ক্লাইপেদা কাউন্টি|شهرستان کلایپدا', { ar: 'مقاطعة كلايبيدا', tr: 'Klaipėda ili', es: 'Condado de Klaipėda', fr: 'Apskritis de Klaipėda' }, [
        T('Klaipėda', 55.7033, 21.1443, 'کلائپیدا|क्लाइपेदा|ক্লাইপেদা|کلایپدا', { ar: 'كلايبيدا', tr: 'Klaipėda' }),
      ]),
    ],
  },
];
