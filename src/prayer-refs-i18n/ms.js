'use strict';
// Malay: same shape as EN in src/prayer-refs.js.
var MLYF = 'Man La Yahdhuruhu al-Faqih, jilid 1, bab waktu solat';
var W46 = 'Wasa’il asy-Syi‘ah, jilid 4, hlm. 46';
module.exports = {
  label: 'Dalil',
  title: '{prayer}: Dalil Al-Quran dan Hadis tentang Waktu, Keutamaan dan Rakaat | SalaahDaily',
  h1: '{prayer}: Al-Quran dan Hadis',
  desc: 'Ayat dan hadis tentang waktu solat {prayer}, keutamaannya dan jumlah rakaat, pandangan mazhab Sunni dan mazhab Syiah (Ja‘fari) bersebelahan.',
  lede: 'Dalil dari Al-Quran dan hadis, pandangan Sunni (Hanafi, Syafi‘i, Maliki, Hanbali) dan pandangan Syiah (Ja‘fari) bersebelahan.',
  sunniH: 'Pandangan Sunni (Hanafi, Syafi‘i, Maliki, Hanbali)',
  shiaH: 'Pandangan Syiah (Ja‘fari)',
  timeH: 'Waktu solat {prayer}',
  virtueH: 'Keutamaan solat {prayer}',
  prayerH: 'Solat {prayer}: rakaat',
  note: 'Nombor hadis mengikut sunnah.com. Sumber Ja‘fari dinyatakan dengan nama kitab, jilid dan bab.',
  otherH: 'Dalil solat lainnya',
  items: {
    fajr: {
      time: {
        s: [
          ['Al-Quran 2:187', 'Makan dan minumlah hingga jelas bagimu benang putih dari benang hitam, yaitu fajar. Subuh dimulai dengan fajar shadiq ini.'],
          ['Al-Quran 17:78', 'Dirikanlah solat … dan bacaan di waktu fajar.'],
          ['Sahih Muslim 612', 'Waktu Subuh dari terbit fajar hingga matahari terbit.'],
          ['Abu Daud 393, Tirmizi 149', 'Jibril mengimami Subuh ketika fajar menyingsing pada hari pertama, dan ketika sudah terang pada hari kedua, lalu berkata waktunya di antara keduanya.'],
          ['Sahih al-Bukhari 578, Sahih Muslim 645', 'Nabi ﷺ solat Subuh ketika masih gelap. Mazhab Syafi‘i, Maliki dan Hanbali mengutamakan awal waktu.'],
          ['Tirmizi 154, Abu Daud 424', 'Solatlah Subuh ketika sudah terang, kerana pahalanya lebih besar. Mazhab Hanafi mengutamakan waktu terang (isfar).'],
        ],
        j: [
          ['Al-Quran 17:78', 'Dirikanlah solat … dan bacaan di waktu fajar.'],
          ['Man La Yahdhuruhu al-Faqih, jilid 1, bab mengenali fajar, hadis 1-2', 'Imam as-Sadiq: fajar shadiq membentang di ufuk seperti sungai putih, tidak memanjang ke atas seperti ekor serigala; waktu Subuh mulai ketika ia membentang dan menerangi langit.'],
          [MLYF + ', hadis 6', 'Imam as-Sadiq: solat di awal waktu adalah keridaan Allah; di akhir waktu hanya ampunan-Nya.'],
        ],
      },
      virtue: {
        s: [
          ['Al-Quran 17:78', 'Bacaan di waktu fajar itu disaksikan (oleh malaikat).'],
          ['Sahih Muslim 657', 'Sesiapa yang solat Subuh berada dalam jaminan Allah.'],
          ['Sahih al-Bukhari 574, Sahih Muslim 635', 'Sesiapa yang solat dua waktu yang sejuk (Subuh dan Asar) masuk syurga.'],
          ['Sahih Muslim 656', 'Sesiapa yang solat Subuh berjamaah, seakan ia solat semalam penuh.'],
          ['Sahih al-Bukhari 657, Sahih Muslim 651', 'Solat paling berat bagi orang munafik adalah Isyak dan Subuh; seandainya mereka tahu pahalanya, mereka akan datang walau merangkak.'],
        ],
        j: [
          ['Al-Quran 17:78', 'Bacaan di waktu fajar itu disaksikan (oleh malaikat).'],
          [MLYF + ', hadis 7', 'Imam as-Sadiq: solat di awal waktu lebih baik bagi orang beriman daripada anak dan hartanya.'],
        ],
      },
      prayer: {
        s: [
          ['', '2 rakaat fardu, didahului 2 rakaat sunat.'],
          ['Sahih Muslim 725', 'Dua rakaat sebelum Subuh lebih baik daripada dunia dan seisinya.'],
          ['Sahih al-Bukhari 1169, Sahih Muslim 724', 'Aisyah: Nabi ﷺ tidak menjaga solat sunat apa pun seperti dua rakaat sebelum Subuh.'],
          ['', 'Qunut: Syafi‘i dan Maliki membaca qunut di Subuh; Hanafi dan Hanbali tidak, kecuali ketika musibah.'],
        ],
        j: [
          ['', '2 rakaat wajib, didahului 2 rakaat nafilah.'],
          [W46, 'Imam as-Sadiq: solat harian 51 rakaat, 17 wajib dan 34 nafilah; dalam praktik Ja‘fari 2 nafilah dilakukan sebelum Subuh.'],
          ['', 'Qunut dibaca di rakaat kedua setiap solat, termasuk Subuh.'],
        ],
      },
    },
    dhuhr: {
      time: {
        s: [
          ['Al-Quran 17:78', 'Dirikanlah solat sejak matahari tergelincir hingga gelapnya malam.'],
          ['Abu Daud 393, Tirmizi 149', 'Jibril mengimami Zohor ketika matahari tergelincir, dan pada hari kedua ketika bayang-bayang sama panjang dengan bendanya.'],
          ['Sahih Muslim 618', 'Nabi ﷺ solat Zohor ketika matahari tergelincir.'],
          ['Sahih Muslim 612', 'Waktu Zohor hingga bayang-bayang seseorang sama dengan tingginya, selama Asar belum masuk.'],
          ['Sahih al-Bukhari 533, Sahih Muslim 615', 'Jika panas sangat terik, tundalah Zohor hingga agak sejuk. Kerana itu mazhab Hanafi menangguhkan Zohor di musim panas.'],
        ],
        j: [
          [MLYF + ', hadis 1-3', 'Imam as-Sadiq dan Imam al-Baqir: jika matahari tergelincir, masuklah waktu Zohor dan Asar bersama, Zohor dahulu, hingga matahari terbenam.'],
          [MLYF + ', hadis 4', 'Waktu utama Zohor hingga bayang-bayang dua kaki selepas tengah hari, dan Asar dua kaki seterusnya.'],
          [MLYF + ', hadis 27', 'Nabi ﷺ menyuruh muazin menangguhkan sedikit azan Zohor ketika panas terik.'],
          ['Sahih Muslim 705', 'Ibnu Abbas: Nabi ﷺ menjamakkan Zohor dan Asar di Madinah tanpa rasa takut dan hujan, supaya tidak menyusahkan umatnya.'],
        ],
      },
      virtue: {
        s: [
          ['Abu Daud 1269, Tirmizi 428', 'Sesiapa yang menjaga empat rakaat sebelum Zohor dan empat selepasnya, Allah mengharamkannya dari neraka.'],
          ['Tirmizi 478', 'Selepas matahari tergelincir pintu-pintu langit dibuka, dan Nabi ﷺ senang bila amal salehnya naik pada ketika itu.'],
        ],
        j: [
          [MLYF + ', hadis 5', 'Imam as-Sadiq: awal waktu solat, ketika matahari tergelincir, adalah waktu yang paling dicintai Allah dan paling utama.'],
        ],
      },
      prayer: {
        s: [
          ['', '4 rakaat fardu. Hanafi: 4 sunat sebelum dan 2 selepas. Syafi‘i dan Hanbali: 2 sebelum dan 2 selepas (4 sebelum juga sunat).'],
          ['Sahih al-Bukhari 1182', 'Aisyah: Nabi ﷺ tidak pernah meninggalkan empat rakaat sebelum Zohor.'],
          ['Sahih Muslim 728, Tirmizi 415', 'Dua belas rakaat sunat sehari membina rumah di syurga: di antaranya 4 sebelum Zohor dan 2 selepasnya.'],
          ['Sahih al-Bukhari 1180', 'Ibnu Umar mengingat 2 rakaat sebelum Zohor dan 2 selepasnya.'],
          ['Al-Quran 62:9', 'Pada hari Jumaat, solat Jumaat (2 rakaat selepas khutbah) menggantikan Zohor.'],
        ],
        j: [
          ['', '4 rakaat wajib, didahului 8 rakaat nafilah.'],
          [MLYF + ', hadis 1', 'Imam as-Sadiq: jika matahari tergelincir, waktu telah masuk; solatlah selepas selesai nafilahmu.'],
          [W46, 'Solat harian 51 rakaat, 17 wajib dan 34 nafilah.'],
          ['Al-Quran 62:9', 'Pada hari Jumaat, dalam mazhab Ja‘fari kini Jumaat dan Zohor sama-sama sah sebagai pilihan.'],
        ],
      },
    },
    asr: {
      time: {
        s: [
          ['Abu Daud 393, Tirmizi 149', 'Jibril mengimami Asar ketika bayang-bayang sama panjang dengan bendanya. Syafi‘i, Maliki dan Hanbali memulai Asar ketika itu.'],
          ['Sahih al-Bukhari 557', 'Waktu dari Asar hingga terbenam adalah bagian siang yang paling pendek. Dari sini Abu Hanifah berpendapat Asar mulai ketika bayang-bayang dua kali panjang bendanya.'],
          ['Sahih Muslim 612', 'Waktu Asar hingga matahari menguning.'],
          ['Sahih al-Bukhari 550', 'Nabi ﷺ solat Asar ketika matahari masih tinggi dan terang.'],
          ['Sahih Muslim 622', 'Menangguhkan Asar hingga matahari menguning adalah solatnya orang munafik.'],
        ],
        j: [
          [MLYF + ', hadis 2', 'Imam as-Sadiq: waktu Zohor dan Asar masuk bersama di tengah hari, Zohor sebelum Asar, hingga matahari terbenam.'],
          [MLYF + ', hadis 4', 'Waktu utama Asar ketika bayang-bayang bertambah dua kaki selepas waktu Zohor.'],
          [MLYF + ', hadis 9', 'Imam al-Baqir: solatlah Asar selagi matahari masih putih dan bersih.'],
        ],
      },
      virtue: {
        s: [
          ['Al-Quran 2:238, Sahih Muslim 627', 'Peliharalah semua solat dan solat wustha. Nabi ﷺ menyebut solat wustha adalah Asar.'],
          ['Sahih al-Bukhari 574, Sahih Muslim 635', 'Sesiapa yang solat dua waktu yang sejuk (Subuh dan Asar) masuk syurga.'],
          ['Sahih al-Bukhari 552, Sahih Muslim 626', 'Sesiapa yang terlewat solat Asar, seakan ia kehilangan keluarga dan hartanya.'],
          ['Sahih al-Bukhari 553', 'Sesiapa yang meninggalkan solat Asar, terhapuslah amalnya.'],
        ],
        j: [
          ['Al-Quran 2:238', 'Peliharalah semua solat dan solat wustha.'],
          [MLYF + ', hadis 9', 'Imam al-Baqir memperingatkan bahwa yang menyia-nyiakan Asar terhalang dari kebaikan di syurga.'],
        ],
      },
      prayer: {
        s: [
          ['', '4 rakaat fardu; 4 rakaat sebelumnya dianjurkan, tidak muakkad.'],
          ['Abu Daud 1271, Tirmizi 430', 'Semoga Allah merahmati orang yang solat empat rakaat sebelum Asar.'],
          ['Sahih al-Bukhari 350, Sahih Muslim 685', 'Solat awalnya diwajibkan dua rakaat dan tetap begitu ketika musafir, kerana itu musafir solat Asar 2 rakaat.'],
        ],
        j: [
          ['', '4 rakaat wajib, didahului 8 rakaat nafilah.'],
          [W46, 'Solat harian 51 rakaat, 17 wajib dan 34 nafilah.'],
          ['Al-Quran 4:101', 'Ketika musafir tidak mengapa mengqasar solat, maka Asar menjadi 2 rakaat.'],
        ],
      },
    },
    maghrib: {
      time: {
        s: [
          ['Sahih al-Bukhari 561, Sahih Muslim 636', 'Nabi ﷺ solat Maghrib begitu matahari terbenam dan menghilang.'],
          ['Sahih Muslim 612', 'Waktu Maghrib hingga mega hilang. Hanafi dan Hanbali berpegang pada ini; mazhab Maliki memberi Maghrib waktu yang singkat.'],
          ['Abu Daud 418', 'Umatku tetap dalam kebaikan selama tidak menangguhkan Maghrib hingga bintang-bintang bermunculan.'],
        ],
        j: [
          [MLYF + ', hadis 10', 'Imam al-Baqir: waktu Maghrib masuk ketika bundaran matahari menghilang.'],
          ['Wasa’il asy-Syi‘ah, bab awal waktu Maghrib', 'Terbenamnya matahari diketahui dengan hilangnya mega merah di timur, maka mazhab Ja‘fari menunggu beberapa menit selepas matahari terbenam.'],
          [MLYF + ', hadis 16', 'Imam as-Sadiq mencela penundaan Maghrib hingga bintang bermunculan.'],
          [MLYF + ', hadis 18', 'Imam as-Sadiq: ketika matahari terbenam boleh berbuka dan Maghrib wajib, dan waktu Isyak hingga tengah malam.'],
        ],
      },
      virtue: {
        s: [
          ['Abu Daud 418', 'Solat Maghrib tepat waktu menjaga umat tetap dalam kebaikan.'],
          ['Sahih Muslim 728, Tirmizi 415', '2 rakaat sunat selepas Maghrib termasuk dua belas rakaat yang membina rumah di syurga.'],
        ],
        j: [
          [MLYF + ', hadis 20', 'Imam as-Sadiq: dua rakaat selepas Maghrib dicatat di ‘Illiyyin, dan empat rakaat berpahala seperti haji yang diterima.'],
        ],
      },
      prayer: {
        s: [
          ['', '3 rakaat fardu, tidak diqasar ketika musafir, lalu 2 rakaat sunat.'],
          ['Sahih al-Bukhari 1183', 'Solatlah sebelum Maghrib, bagi yang mau: 2 rakaat ringan selepas azan dibolehkan.'],
        ],
        j: [
          ['', '3 rakaat wajib, tidak diqasar ketika musafir, lalu 4 rakaat nafilah.'],
          [W46, 'Solat harian 51 rakaat, 17 wajib dan 34 nafilah.'],
        ],
      },
    },
    isha: {
      time: {
        s: [
          ['Sahih Muslim 612', 'Waktu Isyak hingga tengah malam.'],
          ['Sahih Muslim 638, Tirmizi 167', 'Seandainya tidak menyusahkan umatku, aku akan menyuruh mereka menangguhkan Isyak hingga sepertiga malam.'],
          ['Sahih Muslim 681', 'Kelalaian adalah menangguhkan solat hingga masuk waktu solat seterusnya. Majoriti ulama berpendapat Isyak sah hingga Subuh, walaupun lebih utama sebelum tengah malam.'],
          ['', 'Majoriti ulama memulai Isyak ketika mega merah hilang; Abu Hanifah ketika mega putih hilang, yang lebih lambat.'],
        ],
        j: [
          [MLYF + ', hadis 13', 'Satu riwayat menyebut waktu Isyak hingga sepertiga malam.'],
          [MLYF + ', hadis 18', 'Waktu Isyak hingga tengah malam.'],
          [MLYF + ', hadis 14', 'Sesiapa yang tertidur hingga tengah malam tanpa solat Isyak, ia mengqadha dan berpuasa keesokan harinya.'],
        ],
      },
      virtue: {
        s: [
          ['Sahih Muslim 656', 'Sesiapa yang solat Isyak berjamaah, seakan ia solat setengah malam.'],
          ['Sahih al-Bukhari 657, Sahih Muslim 651', 'Solat paling berat bagi orang munafik adalah Isyak dan Subuh; seandainya mereka tahu pahalanya, mereka akan datang walau merangkak.'],
          ['Sahih al-Bukhari 568', 'Nabi ﷺ tidak suka tidur sebelum Isyak dan berbincang selepasnya.'],
        ],
        j: [
          [MLYF + ', hadis 19', 'Imam al-Baqir memperingatkan bahwa malaikat melaknat orang yang membiarkan Isyak hingga lewat tengah malam.'],
        ],
      },
      prayer: {
        s: [
          ['', '4 rakaat fardu, lalu 2 rakaat sunat, kemudian witir.'],
          ['Abu Daud 1422', 'Witir itu hak. Dalam mazhab Hanafi witir wajib, 3 rakaat.'],
          ['Sahih Muslim 752', 'Witir satu rakaat di akhir malam. Menurut Syafi‘i, Maliki dan Hanbali sunat, minimal 1 rakaat.'],
          ['Sahih al-Bukhari 998, Sahih Muslim 751', 'Jadikan witir sebagai akhir solat malammu.'],
        ],
        j: [
          ['', '4 rakaat wajib, lalu 2 rakaat nafilah sambil duduk.'],
          [W46, 'Imam as-Sadiq: 2 rakaat nafilah duduk selepas Isyak dihitung satu.'],
        ],
      },
    },
    ishraq: {
      time: {
        s: [
          ['Sahih Muslim 831, 832', 'Jangan solat ketika matahari terbit hingga ia meninggi, kerana itu Isyraq dimulai sekitar 15 menit selepas terbit.'],
          ['', 'Banyak ulama menganggap Isyraq sebagai awal waktu Dhuha.'],
        ],
        j: [['', 'Mazhab Ja‘fari tidak memiliki solat Isyraq tersendiri. Solat sunat boleh dilakukan selepas matahari meninggi.']],
      },
      virtue: {
        s: [['Tirmizi 586', 'Sesiapa yang solat Subuh berjamaah, lalu duduk berzikir hingga matahari terbit, kemudian solat dua rakaat, baginya pahala seperti haji dan umrah. Tirmizi menilainya hasan gharib; sebagian ulama menilainya lemah.']],
        j: [['', 'Mazhab Ja‘fari tidak berpegang pada riwayat tentang solat Isyraq tersendiri.']],
      },
      prayer: {
        s: [['', '2 rakaat, atau 4.']],
        j: [['', 'Tidak ada solat Isyraq tersendiri.']],
      },
    },
    chasht: {
      time: {
        s: [
          ['Sahih Muslim 748', 'Solat awwabin adalah ketika anak unta merasakan panas matahari: waktu terbaik Dhuha, sekitar seperempat siang.'],
          ['Sahih Muslim 831', 'Jangan solat ketika matahari tepat di atas hingga tergelincir, maka Dhuha berakhir sesaat sebelum Zohor.'],
        ],
        j: [['', 'Riwayat dari para Imam Ahlul Bait menyebut solat Dhuha sebagai bid‘ah, maka mazhab Ja‘fari tidak menghitungnya sebagai solat sunat.']],
      },
      virtue: {
        s: [
          ['Sahih Muslim 720', 'Setiap pagi ada sedekah atas setiap persendian, dan dua rakaat Dhuha sudah mencukupinya.'],
          ['Sahih al-Bukhari 1981, Sahih Muslim 721', 'Abu Hurairah: kekasihku ﷺ berwasiat kepadaku: puasa tiga hari setiap bulan, dua rakaat Dhuha, dan witir sebelum tidur.'],
        ],
        j: [['', 'Tidak termasuk solat sunat dalam mazhab Ja‘fari.']],
      },
      prayer: {
        s: [
          ['', 'Minimal 2 rakaat.'],
          ['Sahih Muslim 719', 'Aisyah: baginda ﷺ solat Dhuha empat rakaat dan menambah sesuai kehendak Allah.'],
          ['Sahih al-Bukhari 1176, Sahih Muslim 336', 'Ummu Hani: pada hari Pembukaan Makkah baginda ﷺ solat delapan rakaat di waktu Dhuha.'],
        ],
        j: [['', 'Tidak dilakukan sebagai solat tersendiri dalam mazhab Ja‘fari.']],
      },
    },
    awwabin: {
      time: {
        s: [
          ['Al-Quran 32:16, 51:17; Abu Daud 1322', 'Anas menafsirkan ayat-ayat tentang solat malam ini: mereka solat di antara Maghrib dan Isyak.'],
          ['Sahih Muslim 748', 'Dalam hadis ini nama “solat awwabin” dipakai untuk Dhuha; banyak ulama memakainya untuk solat di antara Maghrib dan Isyak.'],
        ],
        j: [
          ['Thawab al-A‘mal, hlm. 115', 'Saat lalai adalah di antara Maghrib dan Isyak (solat Ghufailah).'],
          ['al-‘Urwah al-Wuthqa, jilid 2, hlm. 246', 'Ghufailah dilakukan selepas Maghrib, sebelum mega merah barat hilang.'],
        ],
      },
      virtue: {
        s: [['Tirmizi 435', 'Enam rakaat selepas Maghrib setara ibadah dua belas tahun. Tirmizi dan ulama lain menilai riwayat ini sangat lemah.']],
        j: [
          ['Thawab al-A‘mal, hlm. 115', 'Nabi ﷺ: solat sunatlah di ketika lalai, walau dua rakaat ringan, kerana keduanya mengantar ke syurga.'],
          ['Wasa’il asy-Syi‘ah, jilid 8, hlm. 121', 'Imam as-Sadiq: sesiapa yang solat dua rakaat ini di antara Maghrib dan Isyak lalu memohon kepada Allah, Allah memberinya.'],
        ],
      },
      prayer: {
        s: [['', 'Umumnya 6 rakaat, dua-dua, selepas sunat Maghrib; jumlah ini bersandar pada riwayat lemah di atas.']],
        j: [['al-‘Urwah al-Wuthqa, jilid 2, hlm. 246-247', '2 rakaat: selepas al-Fatihah, rakaat pertama Al-Quran 21:87-88 dan rakaat kedua Al-Quran 6:59.']],
      },
    },
    tahajjud: {
      time: {
        s: [
          ['Sahih al-Bukhari 1145, Sahih Muslim 758', 'Tuhan kita turun ke langit dunia setiap malam ketika tersisa sepertiga malam terakhir, lalu berfirman: sesiapa yang berdoa kepada-Ku, akan Aku kabulkan?'],
          ['Sahih al-Bukhari 1131, Sahih Muslim 1159', 'Solat yang paling dicintai Allah adalah solat Dawud: ia tidur setengah malam, solat sepertiganya, lalu tidur seperenamnya.'],
          ['Al-Quran 73:20', 'Tuhanmu mengetahui bahwa engkau berdiri solat hampir dua pertiga malam, atau setengahnya, atau sepertiganya.'],
        ],
        j: [['Man La Yahdhuruhu al-Faqih, jilid 1, bab waktu solat malam', 'Nabi ﷺ tidak solat apa pun selepas Isyak hingga tengah malam; solat malam dari tengah malam hingga fajar, lebih utama mendekati fajar.']],
      },
      virtue: {
        s: [
          ['Al-Quran 17:79', 'Dan pada sebagian malam, bertahajudlah sebagai ibadah tambahan bagimu; semoga Tuhanmu mengangkatmu ke tempat yang terpuji.'],
          ['Al-Quran 51:17-18', 'Mereka sedikit sekali tidur di waktu malam, dan di akhir malam mereka memohon ampunan.'],
          ['Al-Quran 32:16', 'Lambung mereka jauh dari tempat tidur, mereka berdoa kepada Tuhannya dengan rasa takut dan harap.'],
          ['Sahih Muslim 1163', 'Solat paling utama selepas solat fardu adalah solat malam.'],
        ],
        j: [
          ['Al-Quran 17:79', 'Dan pada sebagian malam, bertahajudlah sebagai ibadah tambahan bagimu; semoga Tuhanmu mengangkatmu ke tempat yang terpuji.'],
          ['Al-Quran 73:1-4', 'Bangunlah untuk solat di malam hari, separuhnya atau kurang sedikit atau lebih, dan bacalah Al-Quran dengan tartil.'],
        ],
      },
      prayer: {
        s: [
          ['Sahih al-Bukhari 990, Sahih Muslim 749', 'Solat malam itu dua-dua, dan jika khawatir masuk Subuh, solatlah satu rakaat witir.'],
          ['Sahih al-Bukhari 1147, Sahih Muslim 738', 'Aisyah: baginda ﷺ tidak pernah solat malam lebih dari sebelas rakaat, baik di bulan Ramadhan maupun di luarnya.'],
        ],
        j: [
          ['', '11 rakaat: 8, lalu 2 (syaf‘), lalu 1 (witir).'],
          [W46, 'Solat harian 51 rakaat, 17 wajib dan 34 nafilah, termasuk solat malam.'],
        ],
      },
    },
  },
};
