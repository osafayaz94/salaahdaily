/*
 * Strings added after the 18 languages were in place, merged into GUIDES by build.js.
 * corrH, corrP: the Corrections section of the About page (it points to the suggestion form in the footer).
 * liveH: the home page section of city cards with the live local time and next prayer.
 * ramHomeH: the Ramadan section shown on the home page in the weeks before and during Ramadan.
 */
'use strict';

var EXTRA = {
  en: { liveH: "Prayer times now", corrH: 'Corrections', ramHomeH: 'Ramadan {year}: sehri and iftar timetables',
    corrP: 'If a time here does not match your official local timetable, tell us with the form at the bottom of this page, with the city, the date and the timetable you compared with. We check each report against the official source. When a correction is needed, we fix the calculation for the whole city or country, and the fix reaches every page with the next update. The site updates twice a day.' },
  ur: { liveH: "اس وقت نماز کے اوقات", corrH: 'تصحیحات', ramHomeH: 'رمضان {year}: سحری اور افطار کے ٹائم ٹیبل',
    corrP: 'اگر یہاں کوئی وقت آپ کے سرکاری مقامی ٹائم ٹیبل سے نہیں ملتا تو اس صفحے کے نیچے دیے گئے فارم سے ہمیں بتائیں، شہر، تاریخ اور اس ٹائم ٹیبل کے ساتھ جس سے آپ نے موازنہ کیا۔ ہم ہر رپورٹ کو سرکاری ماخذ سے جانچتے ہیں۔ اگر تصحیح ضروری ہو تو ہم پورے شہر یا ملک کا حساب درست کرتے ہیں، اور یہ تصحیح اگلی اپ ڈیٹ کے ساتھ ہر صفحے پر آ جاتی ہے۔ سائٹ دن میں دو بار اپ ڈیٹ ہوتی ہے۔' },
  hi: { liveH: "अभी नमाज़ का समय", corrH: 'सुधार', ramHomeH: 'रमज़ान {year}: सहरी और इफ़्तार का टाइम टेबल',
    corrP: 'अगर यहाँ कोई समय आपके आधिकारिक स्थानीय टाइम टेबल से मेल नहीं खाता, तो इस पेज के नीचे दिए फ़ॉर्म से हमें बताएँ: शहर, तारीख़ और वह टाइम टेबल जिससे आपने मिलान किया। हम हर रिपोर्ट को आधिकारिक स्रोत से जाँचते हैं। सुधार ज़रूरी हो तो हम पूरे शहर या देश की गणना ठीक करते हैं, और यह सुधार अगले अपडेट के साथ हर पेज पर पहुँच जाता है। साइट दिन में दो बार अपडेट होती है।' },
  bn: { liveH: "এখন নামাজের সময়", corrH: 'সংশোধন', ramHomeH: 'রমজান {year}: সেহরি ও ইফতারের সময়সূচি',
    corrP: 'এখানে কোনো সময় যদি আপনার সরকারি স্থানীয় সময়সূচির সাথে না মেলে, তাহলে এই পাতার নিচের ফর্মে আমাদের জানান: শহর, তারিখ এবং যে সময়সূচির সাথে মিলিয়েছেন। আমরা প্রতিটি রিপোর্ট সরকারি সূত্রের সাথে যাচাই করি। সংশোধন দরকার হলে আমরা পুরো শহর বা দেশের হিসাব ঠিক করি, এবং পরের আপডেটে তা প্রতিটি পাতায় পৌঁছে যায়। সাইটটি দিনে দুবার আপডেট হয়।' },
  id: { liveH: "Waktu sholat sekarang", corrH: 'Koreksi', ramHomeH: 'Ramadan {year}: jadwal imsakiyah sahur dan berbuka',
    corrP: 'Jika ada waktu di sini yang tidak sesuai dengan jadwal resmi setempat, beri tahu kami lewat formulir di bagian bawah halaman ini, sertakan kota, tanggal, dan jadwal yang Anda bandingkan. Kami memeriksa setiap laporan dengan sumber resminya. Jika perlu dikoreksi, kami memperbaiki perhitungan untuk seluruh kota atau negara, dan perbaikannya muncul di semua halaman pada pembaruan berikutnya. Situs ini diperbarui dua kali sehari.' },
  ms: { liveH: "Waktu solat sekarang", corrH: 'Pembetulan', ramHomeH: 'Ramadan {year}: jadual waktu sahur dan berbuka',
    corrP: 'Jika ada waktu di sini yang tidak sepadan dengan jadual rasmi tempatan anda, beritahu kami melalui borang di bahagian bawah halaman ini, bersama bandar, tarikh dan jadual yang anda bandingkan. Kami menyemak setiap laporan dengan sumber rasmi. Jika pembetulan diperlukan, kami membetulkan pengiraan untuk seluruh bandar atau negara, dan pembetulan itu sampai ke setiap halaman pada kemas kini seterusnya. Laman ini dikemas kini dua kali sehari.' },
  fa: { liveH: "اوقات نماز هم‌اکنون", corrH: 'اصلاحات', ramHomeH: 'رمضان {year}: جدول سحری و افطار',
    corrP: 'اگر وقتی در این سایت با جدول رسمی محلی شما یکی نیست، با فرم پایین همین صفحه به ما خبر دهید و شهر، تاریخ و جدولی را که با آن مقایسه کرده‌اید بنویسید. ما هر گزارش را با منبع رسمی بررسی می‌کنیم. اگر اصلاح لازم باشد، محاسبه را برای کل شهر یا کشور درست می‌کنیم و این اصلاح با به‌روزرسانی بعدی به همهٔ صفحه‌ها می‌رسد. سایت روزی دو بار به‌روز می‌شود.' },
  ps: { liveH: "اوس مهال د لمانځه وختونه", corrH: 'سمونې', ramHomeH: 'روژه {year}: د پېشمنۍ او روژه ماتي مهال‌وېش',
    corrP: 'که دلته کوم وخت ستاسو له رسمي سیمه‌ییز مهال‌وېش سره سمون نه خوري، د دې پاڼې لاندې فورمه کې یې موږ ته ووایاست: ښار، نېټه او هغه مهال‌وېش چې پرتله مو کړی. موږ هر راپور له رسمي سرچینې سره ګورو. که سمون ته اړتیا وي، د ټول ښار یا هېواد حساب سموو، او دا سمون په راتلونکي تازه کېدو سره هرې پاڼې ته رسېږي. سایټ په ورځ کې دوه ځله تازه کېږي.' },
  es: { liveH: "Horarios de oración ahora", corrH: 'Correcciones', ramHomeH: 'Ramadán {year}: horarios de suhur e iftar',
    corrP: 'Si una hora de este sitio no coincide con el horario oficial de tu localidad, avísanos con el formulario al pie de esta página e indica la ciudad, la fecha y el horario con el que la comparaste. Revisamos cada aviso con la fuente oficial. Cuando hace falta corregir, ajustamos el cálculo de toda la ciudad o el país, y la corrección llega a todas las páginas con la siguiente actualización. El sitio se actualiza dos veces al día.' },
  fr: { liveH: "Horaires de prière maintenant", corrH: 'Corrections', ramHomeH: 'Ramadan {year} : horaires du shour et de l’iftar',
    corrP: 'Si un horaire de ce site ne correspond pas au calendrier officiel de votre ville, signalez-le avec le formulaire en bas de cette page, en indiquant la ville, la date et le calendrier que vous avez comparé. Nous vérifions chaque signalement auprès de la source officielle. Si une correction est nécessaire, nous corrigeons le calcul pour toute la ville ou tout le pays, et la correction apparaît sur toutes les pages à la mise à jour suivante. Le site est mis à jour deux fois par jour.' },
  ar: { liveH: "مواقيت الصلاة الآن", corrH: 'التصحيحات', ramHomeH: 'رمضان {year}: مواعيد السحور والإفطار',
    corrP: 'إذا لم يطابق وقتٌ في هذا الموقع التقويمَ الرسمي في بلدك، فأخبرنا عبر النموذج أسفل هذه الصفحة، مع ذكر المدينة والتاريخ والتقويم الذي قارنت به. نراجع كل بلاغ مع المصدر الرسمي. وإذا لزم التصحيح، نصحّح الحساب للمدينة أو البلد كله، ويظهر التصحيح في جميع الصفحات مع التحديث التالي. يُحدَّث الموقع مرتين يوميًا.' },
  tr: { liveH: "Şu anda namaz vakitleri", corrH: 'Düzeltmeler', ramHomeH: 'Ramazan {year}: sahur ve iftar vakitleri',
    corrP: 'Buradaki bir vakit resmî yerel takviminizle uyuşmuyorsa, bu sayfanın altındaki formdan bize bildirin; şehri, tarihi ve karşılaştırdığınız takvimi yazın. Her bildirimi resmî kaynakla karşılaştırırız. Düzeltme gerekirse hesabı bütün şehir veya ülke için düzeltiriz ve düzeltme bir sonraki güncellemeyle bütün sayfalara yansır. Site günde iki kez güncellenir.' },
  ha: { liveH: "Lokutan sallah yanzu", corrH: 'Gyara', ramHomeH: 'Ramadan {year}: jadawalin sahur da buɗa baki',
    corrP: 'Idan wani lokaci a nan bai dace da jadawalin hukuma na yankinku ba, ku sanar da mu ta fom ɗin da ke ƙasan wannan shafi, tare da birnin, ranar da jadawalin da kuka kwatanta da shi. Muna duba kowane rahoto da tushen hukuma. Idan gyara ya zama dole, muna gyara lissafin dukan birnin ko ƙasar, kuma gyaran yana isa kowane shafi a sabuntawa ta gaba. Ana sabunta shafin sau biyu a rana.' },
  de: { liveH: "Gebetszeiten jetzt", corrH: 'Korrekturen', ramHomeH: 'Ramadan {year}: Zeiten für Sahur und Iftar',
    corrP: 'Wenn eine Zeit auf dieser Website nicht mit dem offiziellen Gebetskalender Ihres Ortes übereinstimmt, teilen Sie es uns über das Formular unten auf dieser Seite mit, mit Stadt, Datum und dem Kalender, mit dem Sie verglichen haben. Wir prüfen jede Meldung anhand der offiziellen Quelle. Ist eine Korrektur nötig, berichtigen wir die Berechnung für die ganze Stadt oder das ganze Land, und die Korrektur erscheint mit der nächsten Aktualisierung auf allen Seiten. Die Website wird zweimal täglich aktualisiert.' },
  pt: { liveH: "Horários de oração agora", corrH: 'Correções', ramHomeH: 'Ramadã {year}: horários do suhur e do iftar',
    corrP: 'Se um horário deste site não coincidir com o calendário oficial da sua cidade, avise-nos pelo formulário no fim desta página, indicando a cidade, a data e o calendário com que comparou. Verificamos cada aviso com a fonte oficial. Quando é preciso corrigir, ajustamos o cálculo de toda a cidade ou do país, e a correção chega a todas as páginas na atualização seguinte. O site é atualizado duas vezes por dia.' },
  it: { liveH: "Orari di preghiera ora", corrH: 'Correzioni', ramHomeH: 'Ramadan {year}: orari di suhur e iftar',
    corrP: 'Se un orario di questo sito non corrisponde al calendario ufficiale della tua città, segnalacelo con il modulo in fondo a questa pagina, indicando la città, la data e il calendario con cui lo hai confrontato. Verifichiamo ogni segnalazione con la fonte ufficiale. Quando serve una correzione, correggiamo il calcolo per tutta la città o il paese, e la correzione arriva su tutte le pagine con l’aggiornamento successivo. Il sito si aggiorna due volte al giorno.' },
  ja: { liveH: "現在の礼拝時刻", corrH: '訂正について', ramHomeH: 'ラマダン {year}：サフールとイフタールの時刻表',
    corrP: 'このサイトの時刻がお住まいの地域の公式時刻表と合わない場合は、このページ下部のフォームでお知らせください。都市名、日付、比較した時刻表を添えてください。報告はすべて公式の情報源と照合します。訂正が必要な場合は、その都市または国全体の計算を修正し、次回の更新ですべてのページに反映されます。サイトは1日2回更新されます。' },
  ko: { liveH: "지금의 기도 시간", corrH: '정정 안내', ramHomeH: '라마단 {year}: 수후르와 이프타르 시간표',
    corrP: '이 사이트의 시간이 지역의 공식 시간표와 맞지 않으면 이 페이지 아래의 양식으로 알려 주세요. 도시, 날짜, 비교한 시간표를 함께 적어 주세요. 모든 제보는 공식 자료와 대조해 확인합니다. 정정이 필요하면 해당 도시나 나라 전체의 계산을 고치며, 수정 내용은 다음 업데이트 때 모든 페이지에 반영됩니다. 사이트는 하루에 두 번 업데이트됩니다.' },
};

if (typeof module === 'object' && module.exports) module.exports = { EXTRA: EXTRA };
