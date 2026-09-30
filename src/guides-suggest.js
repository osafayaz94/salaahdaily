/*
 * Footer suggestion form, merged into GUIDES by src/guides.js.
 * sgH heading, sgLabel message label, sgEmail optional reply address, sgSend button,
 * sgThanks after sending, sgError when sending fails.
 */
'use strict';

var SG = {
  en: { sgH: 'Suggest a correction or idea', sgLabel: 'Your suggestion (a wrong time, a missing city, a translation...)', sgEmail: 'Your email, if you want a reply (optional)', sgSend: 'Send suggestion', sgThanks: 'Thank you. We read every suggestion.', sgError: 'Sorry, it could not be sent. Please try again later.' },
  ur: { sgH: 'تصحیح یا تجویز بھیجیں', sgLabel: 'آپ کی تجویز (غلط وقت، کوئی شہر جو موجود نہیں، ترجمہ...)', sgEmail: 'آپ کی ای میل، اگر جواب چاہیے (اختیاری)', sgSend: 'تجویز بھیجیں', sgThanks: 'شکریہ۔ ہم ہر تجویز پڑھتے ہیں۔', sgError: 'معذرت، یہ نہیں بھیجی جا سکی۔ براہ کرم بعد میں دوبارہ کوشش کریں۔' },
  hi: { sgH: 'सुधार या सुझाव भेजें', sgLabel: 'आपका सुझाव (ग़लत समय, कोई छूटा हुआ शहर, अनुवाद...)', sgEmail: 'आपका ईमेल, अगर जवाब चाहिए (वैकल्पिक)', sgSend: 'सुझाव भेजें', sgThanks: 'शुक्रिया। हम हर सुझाव पढ़ते हैं।', sgError: 'माफ़ कीजिए, यह भेजा नहीं जा सका। कृपया बाद में फिर कोशिश करें।' },
  bn: { sgH: 'সংশোধন বা পরামর্শ পাঠান', sgLabel: 'আপনার পরামর্শ (ভুল সময়, বাদ পড়া শহর, অনুবাদ...)', sgEmail: 'উত্তর চাইলে আপনার ইমেইল (ঐচ্ছিক)', sgSend: 'পরামর্শ পাঠান', sgThanks: 'ধন্যবাদ। আমরা প্রতিটি পরামর্শ পড়ি।', sgError: 'দুঃখিত, পাঠানো যায়নি। পরে আবার চেষ্টা করুন।' },
  id: { sgH: 'Kirim koreksi atau saran', sgLabel: 'Saran Anda (waktu yang salah, kota yang belum ada, terjemahan...)', sgEmail: 'Email Anda, jika ingin dibalas (opsional)', sgSend: 'Kirim saran', sgThanks: 'Terima kasih. Kami membaca setiap saran.', sgError: 'Maaf, gagal terkirim. Silakan coba lagi nanti.' },
  ms: { sgH: 'Hantar pembetulan atau cadangan', sgLabel: 'Cadangan anda (waktu yang salah, bandar yang tiada, terjemahan...)', sgEmail: 'E-mel anda, jika mahu jawapan (pilihan)', sgSend: 'Hantar cadangan', sgThanks: 'Terima kasih. Kami membaca setiap cadangan.', sgError: 'Maaf, tidak dapat dihantar. Sila cuba lagi nanti.' },
  fa: { sgH: 'پیشنهاد یا اصلاحیه بفرستید', sgLabel: 'پیشنهاد شما (وقت نادرست، شهری که نیست، ترجمه...)', sgEmail: 'ایمیل شما، اگر پاسخ می‌خواهید (اختیاری)', sgSend: 'ارسال پیشنهاد', sgThanks: 'سپاس. ما همه پیشنهادها را می‌خوانیم.', sgError: 'متأسفیم، ارسال نشد. لطفاً بعداً دوباره تلاش کنید.' },
  prs: { sgH: 'پیشنهاد یا اصلاحیه بفرستید', sgLabel: 'پیشنهاد شما (وقت نادرست، شهری که نیست، ترجمه...)', sgEmail: 'ایمیل شما، اگر جواب می‌خواهید (اختیاری)', sgSend: 'فرستادن پیشنهاد', sgThanks: 'تشکر. ما همه پیشنهادها را می‌خوانیم.', sgError: 'متأسفیم، فرستاده نشد. لطفاً بعداً دوباره کوشش کنید.' },
  ps: { sgH: 'سمون یا وړاندیز ولېږئ', sgLabel: 'ستاسو وړاندیز (ناسم وخت، کوم ښار چې نشته، ژباړه...)', sgEmail: 'ستاسو برېښنالیک، که ځواب غواړئ (اختیاري)', sgSend: 'وړاندیز ولېږئ', sgThanks: 'مننه. موږ هر وړاندیز لولو.', sgError: 'بښنه غواړو، ونه لېږل شو. وروسته بیا هڅه وکړئ.' },
  dv: { sgH: 'އިސްލާހެއް ނުވަތަ ހިޔާލެއް ފޮނުވާ', sgLabel: 'ތިބާގެ ހިޔާލު (ގޯސް ވަގުތެއް، ނެތް ސިޓީއެއް، ތަރުޖަމާ...)', sgEmail: 'ޖަވާބު ބޭނުންނަމަ ތިބާގެ އީމެއިލް (އިޚްތިޔާރީ)', sgSend: 'ހިޔާލު ފޮނުވާ', sgThanks: 'ޝުކުރިއްޔާ. ކޮންމެ ހިޔާލެއް އަހަރެމެން ކިޔަމެވެ.', sgError: 'މާފުކުރައްވާ، ފޮނުވޭކަށް ނެތް. ފަހުން އަލުން މަސައްކަތް ކުރައްވާ.' },
  es: { sgH: 'Envía una corrección o idea', sgLabel: 'Tu sugerencia (una hora incorrecta, una ciudad que falta, una traducción...)', sgEmail: 'Tu correo, si quieres respuesta (opcional)', sgSend: 'Enviar sugerencia', sgThanks: 'Gracias. Leemos cada sugerencia.', sgError: 'Lo sentimos, no se pudo enviar. Inténtalo más tarde.' },
  fr: { sgH: 'Proposez une correction ou une idée', sgLabel: 'Votre suggestion (un horaire erroné, une ville manquante, une traduction...)', sgEmail: 'Votre e-mail, si vous voulez une réponse (facultatif)', sgSend: 'Envoyer la suggestion', sgThanks: 'Merci. Nous lisons chaque suggestion.', sgError: 'Désolé, l’envoi a échoué. Réessayez plus tard.' },
  ar: { sgH: 'أرسل تصحيحًا أو اقتراحًا', sgLabel: 'اقتراحك (وقت غير صحيح، مدينة غير موجودة، ترجمة...)', sgEmail: 'بريدك الإلكتروني إن أردت ردًا (اختياري)', sgSend: 'أرسل الاقتراح', sgThanks: 'شكرًا لك. نقرأ كل اقتراح.', sgError: 'عذرًا، تعذّر الإرسال. حاول مرة أخرى لاحقًا.' },
  tr: { sgH: 'Düzeltme veya öneri gönderin', sgLabel: 'Öneriniz (yanlış bir vakit, eksik bir şehir, çeviri...)', sgEmail: 'Yanıt isterseniz e-postanız (isteğe bağlı)', sgSend: 'Öneriyi gönder', sgThanks: 'Teşekkürler. Her öneriyi okuyoruz.', sgError: 'Üzgünüz, gönderilemedi. Lütfen daha sonra tekrar deneyin.' },
  ha: { sgH: 'Aika gyara ko shawara', sgLabel: 'Shawararka (lokaci mara daidai, garin da babu, fassara...)', sgEmail: 'Imel ɗinka, idan kana son amsa (ba dole ba)', sgSend: 'Aika shawara', sgThanks: 'Na gode. Muna karanta kowace shawara.', sgError: 'Yi haƙuri, ba a iya aikawa ba. A sake gwadawa daga baya.' },
};

if (typeof module === 'object' && module.exports) module.exports = { SG: SG };
