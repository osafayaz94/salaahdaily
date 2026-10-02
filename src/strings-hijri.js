/*
 * Hijri calendar page: month grid and date converters. Merged into GUIDES (and sent to the browser).
 * conv: section heading; g2h/h2g: converter headings; dateL/dayL/monthL/yearL: field labels; go: button;
 * res: result line ({from} {to}); bad: a Hijri day that does not exist; range: allowed years ({a} {b});
 * gridH: grid heading for screen readers.
 */
'use strict';

var HC = {
  en: { conv: 'Hijri date converter', g2h: 'Gregorian to Hijri', h2g: 'Hijri to Gregorian', dateL: 'Date', dayL: 'Day', monthL: 'Month', yearL: 'Year', go: 'Convert',
    res: '{from} is {to}.', bad: 'That day does not exist in this Hijri month (it has 29 days).', range: 'Choose a Hijri year between {a} and {b}.', gridH: 'Hijri calendar by month' },
  ur: { conv: 'ہجری تاریخ کنورٹر', g2h: 'عیسوی سے ہجری', h2g: 'ہجری سے عیسوی', dateL: 'تاریخ', dayL: 'دن', monthL: 'مہینہ', yearL: 'سال', go: 'تبدیل کریں',
    res: '{from} = {to}', bad: 'یہ دن اس ہجری مہینے میں نہیں ہے (اس میں 29 دن ہیں)۔', range: '{a} سے {b} کے درمیان ہجری سال منتخب کریں۔', gridH: 'ماہ وار ہجری کیلنڈر' },
  hi: { conv: 'हिजरी तारीख़ कन्वर्टर', g2h: 'ईसवी से हिजरी', h2g: 'हिजरी से ईसवी', dateL: 'तारीख़', dayL: 'दिन', monthL: 'महीना', yearL: 'साल', go: 'बदलें',
    res: '{from} = {to}', bad: 'यह दिन इस हिजरी महीने में नहीं है (इसमें 29 दिन हैं)।', range: '{a} से {b} के बीच हिजरी साल चुनें।', gridH: 'महीनेवार हिजरी कैलेंडर' },
  bn: { conv: 'হিজরি তারিখ রূপান্তর', g2h: 'ইংরেজি থেকে হিজরি', h2g: 'হিজরি থেকে ইংরেজি', dateL: 'তারিখ', dayL: 'দিন', monthL: 'মাস', yearL: 'বছর', go: 'রূপান্তর করুন',
    res: '{from} = {to}', bad: 'এই হিজরি মাসে এই দিনটি নেই (মাসটি ২৯ দিনের)।', range: '{a} থেকে {b}-এর মধ্যে হিজরি বছর বেছে নিন।', gridH: 'মাসভিত্তিক হিজরি ক্যালেন্ডার' },
  id: { conv: 'Konversi tanggal Hijriah', g2h: 'Masehi ke Hijriah', h2g: 'Hijriah ke Masehi', dateL: 'Tanggal', dayL: 'Hari', monthL: 'Bulan', yearL: 'Tahun', go: 'Konversi',
    res: '{from} adalah {to}.', bad: 'Tanggal itu tidak ada di bulan Hijriah ini (hanya 29 hari).', range: 'Pilih tahun Hijriah antara {a} dan {b}.', gridH: 'Kalender Hijriah per bulan' },
  ms: { conv: 'Penukar tarikh Hijrah', g2h: 'Masihi ke Hijrah', h2g: 'Hijrah ke Masihi', dateL: 'Tarikh', dayL: 'Hari', monthL: 'Bulan', yearL: 'Tahun', go: 'Tukar',
    res: '{from} ialah {to}.', bad: 'Hari itu tiada dalam bulan Hijrah ini (ia 29 hari).', range: 'Pilih tahun Hijrah antara {a} dan {b}.', gridH: 'Kalendar Hijrah mengikut bulan' },
  fa: { conv: 'تبدیل تاریخ قمری', g2h: 'میلادی به قمری', h2g: 'قمری به میلادی', dateL: 'تاریخ', dayL: 'روز', monthL: 'ماه', yearL: 'سال', go: 'تبدیل',
    res: '{from} = {to}', bad: 'این روز در این ماه قمری نیست (این ماه ۲۹ روزه است).', range: 'سال قمری را میان {a} و {b} انتخاب کنید.', gridH: 'تقویم قمری ماه به ماه' },
  ps: { conv: 'د هجري نېټې اړونه', g2h: 'له میلادي هجري ته', h2g: 'له هجري میلادي ته', dateL: 'نېټه', dayL: 'ورځ', monthL: 'میاشت', yearL: 'کال', go: 'واړوئ',
    res: '{from} = {to}', bad: 'دا ورځ په دې هجري میاشت کې نشته (۲۹ ورځې لري).', range: 'د {a} او {b} ترمنځ هجري کال وټاکئ.', gridH: 'میاشتنی هجري کلیز' },
  es: { conv: 'Conversor de fechas de la Hégira', g2h: 'Gregoriano a Hégira', h2g: 'Hégira a gregoriano', dateL: 'Fecha', dayL: 'Día', monthL: 'Mes', yearL: 'Año', go: 'Convertir',
    res: '{from} es {to}.', bad: 'Ese día no existe en este mes de la Hégira (tiene 29 días).', range: 'Elige un año de la Hégira entre {a} y {b}.', gridH: 'Calendario de la Hégira por meses' },
  fr: { conv: 'Convertisseur de dates de l’Hégire', g2h: 'Grégorien vers Hégire', h2g: 'Hégire vers grégorien', dateL: 'Date', dayL: 'Jour', monthL: 'Mois', yearL: 'Année', go: 'Convertir',
    res: '{from} correspond au {to}.', bad: 'Ce jour n’existe pas dans ce mois de l’Hégire (il compte 29 jours).', range: 'Choisissez une année de l’Hégire entre {a} et {b}.', gridH: 'Calendrier de l’Hégire par mois' },
  ar: { conv: 'تحويل التاريخ الهجري', g2h: 'من الميلادي إلى الهجري', h2g: 'من الهجري إلى الميلادي', dateL: 'التاريخ', dayL: 'اليوم', monthL: 'الشهر', yearL: 'السنة', go: 'تحويل',
    res: '{from} يوافق {to}', bad: 'هذا اليوم غير موجود في هذا الشهر الهجري (عدد أيامه 29).', range: 'اختر سنة هجرية بين {a} و{b}.', gridH: 'التقويم الهجري شهرًا بشهر' },
  tr: { conv: 'Hicri tarih çevirici', g2h: 'Miladiden Hicriye', h2g: 'Hicriden Miladiye', dateL: 'Tarih', dayL: 'Gün', monthL: 'Ay', yearL: 'Yıl', go: 'Çevir',
    res: '{from} = {to}', bad: 'Bu gün bu Hicri ayda yok (ay 29 gündür).', range: '{a} ile {b} arasında bir Hicri yıl seçin.', gridH: 'Aylara göre Hicri takvim' },
  ha: { conv: 'Mai canza kwanan wata na Hijira', g2h: 'Daga Miladiyya zuwa Hijira', h2g: 'Daga Hijira zuwa Miladiyya', dateL: 'Kwanan wata', dayL: 'Rana', monthL: 'Wata', yearL: 'Shekara', go: 'Canza',
    res: '{from} shi ne {to}.', bad: 'Wannan rana ba ta cikin wannan watan Hijira (kwanaki 29 ne).', range: 'Zaɓi shekarar Hijira tsakanin {a} da {b}.', gridH: 'Kalandar Hijira wata-wata' },
  de: { conv: 'Hidschri-Datumsrechner', g2h: 'Gregorianisch zu Hidschri', h2g: 'Hidschri zu gregorianisch', dateL: 'Datum', dayL: 'Tag', monthL: 'Monat', yearL: 'Jahr', go: 'Umrechnen',
    res: '{from} entspricht {to}.', bad: 'Diesen Tag gibt es in diesem Hidschri-Monat nicht (er hat 29 Tage).', range: 'Wählen Sie ein Hidschri-Jahr zwischen {a} und {b}.', gridH: 'Hidschri-Kalender nach Monaten' },
  pt: { conv: 'Conversor de datas da Hégira', g2h: 'Gregoriano para Hégira', h2g: 'Hégira para gregoriano', dateL: 'Data', dayL: 'Dia', monthL: 'Mês', yearL: 'Ano', go: 'Converter',
    res: '{from} é {to}.', bad: 'Esse dia não existe neste mês da Hégira (ele tem 29 dias).', range: 'Escolha um ano da Hégira entre {a} e {b}.', gridH: 'Calendário da Hégira por mês' },
  it: { conv: 'Convertitore di date dell’Egira', g2h: 'Gregoriano in Egira', h2g: 'Egira in gregoriano', dateL: 'Data', dayL: 'Giorno', monthL: 'Mese', yearL: 'Anno', go: 'Converti',
    res: '{from} corrisponde a {to}.', bad: 'Questo giorno non esiste in questo mese dell’Egira (ha 29 giorni).', range: 'Scegli un anno dell’Egira tra {a} e {b}.', gridH: 'Calendario dell’Egira per mese' },
  ja: { conv: 'ヒジュラ暦の日付変換', g2h: '西暦からヒジュラ暦', h2g: 'ヒジュラ暦から西暦', dateL: '日付', dayL: '日', monthL: '月', yearL: '年', go: '変換',
    res: '{from}は{to}です。', bad: 'この日はこのヒジュラ暦の月にありません（29日間の月です）。', range: '{a}年から{b}年までのヒジュラ暦の年を選んでください。', gridH: '月ごとのヒジュラ暦' },
  ko: { conv: '히즈라력 날짜 변환', g2h: '양력을 히즈라력으로', h2g: '히즈라력을 양력으로', dateL: '날짜', dayL: '일', monthL: '월', yearL: '년', go: '변환',
    res: '{from}은 {to}입니다.', bad: '이 히즈라력 달에는 그 날이 없습니다(29일인 달입니다).', range: '{a}년에서 {b}년 사이의 히즈라력 연도를 고르세요.', gridH: '월별 히즈라력' },
};

if (typeof module === 'object' && module.exports) module.exports = { HC: HC };
