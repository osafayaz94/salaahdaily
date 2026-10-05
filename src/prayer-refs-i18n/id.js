'use strict';
// Indonesian: same shape as EN in src/prayer-refs.js.
var MLYF = 'Man La Yahdhuruhu al-Faqih, jilid 1, bab waktu sholat';
var W46 = 'Wasa’il asy-Syi‘ah, jilid 4, hlm. 46';
module.exports = {
  label: 'Dalil',
  title: '{prayer}: Dalil Al-Qur’an dan Hadis tentang Waktu, Keutamaan dan Rakaat | SalaahDaily',
  h1: '{prayer}: Al-Qur’an dan Hadis',
  desc: 'Ayat dan hadis tentang waktu sholat {prayer}, keutamaannya dan jumlah rakaat, pandangan mazhab Sunni dan mazhab Syiah (Ja‘fari) berdampingan.',
  lede: 'Dalil dari Al-Qur’an dan hadis, pandangan Sunni (Hanafi, Syafi‘i, Maliki, Hanbali) dan pandangan Syiah (Ja‘fari) berdampingan.',
  sunniH: 'Pandangan Sunni (Hanafi, Syafi‘i, Maliki, Hanbali)',
  shiaH: 'Pandangan Syiah (Ja‘fari)',
  timeH: 'Waktu sholat {prayer}',
  virtueH: 'Keutamaan sholat {prayer}',
  prayerH: 'Sholat {prayer}: rakaat',
  note: 'Nomor hadis mengikuti sunnah.com. Sumber Ja‘fari disebut dengan nama kitab, jilid dan bab.',
  otherH: 'Dalil sholat lainnya',
  items: {
    fajr: {
      time: {
        s: [
          ['QS 2:187', 'Makan dan minumlah hingga jelas bagimu benang putih dari benang hitam, yaitu fajar. Subuh dimulai dengan fajar shadiq ini.'],
          ['QS 17:78', 'Dirikanlah sholat … dan bacaan di waktu fajar.'],
          ['Shahih Muslim 612', 'Waktu Subuh dari terbit fajar sampai matahari terbit.'],
          ['Abu Dawud 393, Tirmidzi 149', 'Jibril mengimami Subuh saat fajar menyingsing pada hari pertama, dan saat sudah terang pada hari kedua, lalu berkata waktunya di antara keduanya.'],
          ['Shahih al-Bukhari 578, Shahih Muslim 645', 'Nabi ﷺ sholat Subuh saat masih gelap. Mazhab Syafi‘i, Maliki dan Hanbali mengutamakan awal waktu.'],
          ['Tirmidzi 154, Abu Dawud 424', 'Sholatlah Subuh ketika sudah terang, karena pahalanya lebih besar. Mazhab Hanafi mengutamakan waktu terang (isfar).'],
        ],
        j: [
          ['QS 17:78', 'Dirikanlah sholat … dan bacaan di waktu fajar.'],
          ['Man La Yahdhuruhu al-Faqih, jilid 1, bab mengenali fajar, hadis 1-2', 'Imam ash-Shadiq: fajar shadiq membentang di ufuk seperti sungai putih, tidak memanjang ke atas seperti ekor serigala; waktu Subuh mulai saat ia membentang dan menerangi langit.'],
          [MLYF + ', hadis 6', 'Imam ash-Shadiq: sholat di awal waktu adalah keridaan Allah; di akhir waktu hanya ampunan-Nya.'],
        ],
      },
      virtue: {
        s: [
          ['QS 17:78', 'Bacaan di waktu fajar itu disaksikan (oleh malaikat).'],
          ['Shahih Muslim 657', 'Siapa yang sholat Subuh berada dalam jaminan Allah.'],
          ['Shahih al-Bukhari 574, Shahih Muslim 635', 'Siapa yang sholat dua waktu yang sejuk (Subuh dan Asar) masuk surga.'],
          ['Shahih Muslim 656', 'Siapa yang sholat Subuh berjamaah, seakan ia sholat semalam penuh.'],
          ['Shahih al-Bukhari 657, Shahih Muslim 651', 'Sholat paling berat bagi orang munafik adalah Isya dan Subuh; seandainya mereka tahu pahalanya, mereka akan datang walau merangkak.'],
        ],
        j: [
          ['QS 17:78', 'Bacaan di waktu fajar itu disaksikan (oleh malaikat).'],
          [MLYF + ', hadis 7', 'Imam ash-Shadiq: sholat di awal waktu lebih baik bagi orang beriman daripada anak dan hartanya.'],
        ],
      },
      prayer: {
        s: [
          ['', '2 rakaat fardhu, didahului 2 rakaat sunnah.'],
          ['Shahih Muslim 725', 'Dua rakaat sebelum Subuh lebih baik daripada dunia dan seisinya.'],
          ['Shahih al-Bukhari 1169, Shahih Muslim 724', 'Aisyah: Nabi ﷺ tidak menjaga sholat sunnah apa pun seperti dua rakaat sebelum Subuh.'],
          ['', 'Qunut: Syafi‘i dan Maliki membaca qunut di Subuh; Hanafi dan Hanbali tidak, kecuali saat musibah.'],
        ],
        j: [
          ['', '2 rakaat wajib, didahului 2 rakaat nafilah.'],
          [W46, 'Imam ash-Shadiq: sholat harian 51 rakaat, 17 wajib dan 34 nafilah; dalam praktik Ja‘fari 2 nafilah dikerjakan sebelum Subuh.'],
          ['', 'Qunut dibaca di rakaat kedua setiap sholat, termasuk Subuh.'],
        ],
      },
    },
    dhuhr: {
      time: {
        s: [
          ['QS 17:78', 'Dirikanlah sholat sejak matahari tergelincir sampai gelapnya malam.'],
          ['Abu Dawud 393, Tirmidzi 149', 'Jibril mengimami Zuhur saat matahari tergelincir, dan pada hari kedua saat bayangan sama panjang dengan bendanya.'],
          ['Shahih Muslim 618', 'Nabi ﷺ sholat Zuhur ketika matahari tergelincir.'],
          ['Shahih Muslim 612', 'Waktu Zuhur sampai bayangan seseorang sama dengan tingginya, selama Asar belum masuk.'],
          ['Shahih al-Bukhari 533, Shahih Muslim 615', 'Jika panas sangat terik, tundalah Zuhur sampai agak sejuk. Karena itu mazhab Hanafi menunda Zuhur di musim panas.'],
        ],
        j: [
          [MLYF + ', hadis 1-3', 'Imam ash-Shadiq dan Imam al-Baqir: jika matahari tergelincir, masuklah waktu Zuhur dan Asar bersama, Zuhur dahulu, sampai matahari terbenam.'],
          [MLYF + ', hadis 4', 'Waktu utama Zuhur sampai bayangan dua kaki setelah tengah hari, dan Asar dua kaki berikutnya.'],
          [MLYF + ', hadis 27', 'Nabi ﷺ menyuruh muazin menunda sedikit azan Zuhur saat panas terik.'],
          ['Shahih Muslim 705', 'Ibnu Abbas: Nabi ﷺ menjamak Zuhur dan Asar di Madinah tanpa rasa takut dan hujan, agar tidak memberatkan umatnya.'],
        ],
      },
      virtue: {
        s: [
          ['Abu Dawud 1269, Tirmidzi 428', 'Siapa yang menjaga empat rakaat sebelum Zuhur dan empat sesudahnya, Allah mengharamkannya dari neraka.'],
          ['Tirmidzi 478', 'Setelah matahari tergelincir pintu-pintu langit dibuka, dan Nabi ﷺ senang bila amal salehnya naik pada saat itu.'],
        ],
        j: [
          [MLYF + ', hadis 5', 'Imam ash-Shadiq: awal waktu sholat, saat matahari tergelincir, adalah waktu yang paling dicintai Allah dan paling utama.'],
        ],
      },
      prayer: {
        s: [
          ['', '4 rakaat fardhu. Hanafi: 4 sunnah sebelum dan 2 sesudah. Syafi‘i dan Hanbali: 2 sebelum dan 2 sesudah (4 sebelum juga sunnah).'],
          ['Shahih al-Bukhari 1182', 'Aisyah: Nabi ﷺ tidak pernah meninggalkan empat rakaat sebelum Zuhur.'],
          ['Shahih Muslim 728, Tirmidzi 415', 'Dua belas rakaat sunnah sehari membangun rumah di surga: di antaranya 4 sebelum Zuhur dan 2 sesudahnya.'],
          ['Shahih al-Bukhari 1180', 'Ibnu Umar mengingat 2 rakaat sebelum Zuhur dan 2 sesudahnya.'],
          ['QS 62:9', 'Pada hari Jumat, sholat Jumat (2 rakaat setelah khutbah) menggantikan Zuhur.'],
        ],
        j: [
          ['', '4 rakaat wajib, didahului 8 rakaat nafilah.'],
          [MLYF + ', hadis 1', 'Imam ash-Shadiq: jika matahari tergelincir, waktu telah masuk; sholatlah setelah selesai nafilahmu.'],
          [W46, 'Sholat harian 51 rakaat, 17 wajib dan 34 nafilah.'],
          ['QS 62:9', 'Pada hari Jumat, dalam mazhab Ja‘fari kini Jumat dan Zuhur sama-sama sah sebagai pilihan.'],
        ],
      },
    },
    asr: {
      time: {
        s: [
          ['Abu Dawud 393, Tirmidzi 149', 'Jibril mengimami Asar saat bayangan sama panjang dengan bendanya. Syafi‘i, Maliki dan Hanbali memulai Asar saat itu.'],
          ['Shahih al-Bukhari 557', 'Waktu dari Asar sampai terbenam adalah bagian siang yang paling pendek. Dari sini Abu Hanifah berpendapat Asar mulai saat bayangan dua kali panjang bendanya.'],
          ['Shahih Muslim 612', 'Waktu Asar sampai matahari menguning.'],
          ['Shahih al-Bukhari 550', 'Nabi ﷺ sholat Asar ketika matahari masih tinggi dan terang.'],
          ['Shahih Muslim 622', 'Menunda Asar sampai matahari menguning adalah sholatnya orang munafik.'],
        ],
        j: [
          [MLYF + ', hadis 2', 'Imam ash-Shadiq: waktu Zuhur dan Asar masuk bersama di tengah hari, Zuhur sebelum Asar, sampai matahari terbenam.'],
          [MLYF + ', hadis 4', 'Waktu utama Asar saat bayangan bertambah dua kaki setelah waktu Zuhur.'],
          [MLYF + ', hadis 9', 'Imam al-Baqir: sholatlah Asar selagi matahari masih putih dan bersih.'],
        ],
      },
      virtue: {
        s: [
          ['QS 2:238, Shahih Muslim 627', 'Peliharalah semua sholat dan sholat wustha. Nabi ﷺ menyebut sholat wustha adalah Asar.'],
          ['Shahih al-Bukhari 574, Shahih Muslim 635', 'Siapa yang sholat dua waktu yang sejuk (Subuh dan Asar) masuk surga.'],
          ['Shahih al-Bukhari 552, Shahih Muslim 626', 'Siapa yang terlewat sholat Asar, seakan ia kehilangan keluarga dan hartanya.'],
          ['Shahih al-Bukhari 553', 'Siapa yang meninggalkan sholat Asar, terhapuslah amalnya.'],
        ],
        j: [
          ['QS 2:238', 'Peliharalah semua sholat dan sholat wustha.'],
          [MLYF + ', hadis 9', 'Imam al-Baqir memperingatkan bahwa yang menyia-nyiakan Asar terhalang dari kebaikan di surga.'],
        ],
      },
      prayer: {
        s: [
          ['', '4 rakaat fardhu; 4 rakaat sebelumnya dianjurkan, tidak muakkad.'],
          ['Abu Dawud 1271, Tirmidzi 430', 'Semoga Allah merahmati orang yang sholat empat rakaat sebelum Asar.'],
          ['Shahih al-Bukhari 350, Shahih Muslim 685', 'Sholat awalnya diwajibkan dua rakaat dan tetap begitu saat safar, karena itu musafir sholat Asar 2 rakaat.'],
        ],
        j: [
          ['', '4 rakaat wajib, didahului 8 rakaat nafilah.'],
          [W46, 'Sholat harian 51 rakaat, 17 wajib dan 34 nafilah.'],
          ['QS 4:101', 'Dalam safar tidak mengapa mengqashar sholat, maka Asar menjadi 2 rakaat.'],
        ],
      },
    },
    maghrib: {
      time: {
        s: [
          ['Shahih al-Bukhari 561, Shahih Muslim 636', 'Nabi ﷺ sholat Magrib begitu matahari terbenam dan menghilang.'],
          ['Shahih Muslim 612', 'Waktu Magrib sampai mega hilang. Hanafi dan Hanbali berpegang pada ini; mazhab Maliki memberi Magrib waktu yang singkat.'],
          ['Abu Dawud 418', 'Umatku tetap dalam kebaikan selama tidak menunda Magrib sampai bintang-bintang bermunculan.'],
        ],
        j: [
          [MLYF + ', hadis 10', 'Imam al-Baqir: waktu Magrib masuk ketika bundaran matahari menghilang.'],
          ['Wasa’il asy-Syi‘ah, bab awal waktu Magrib', 'Terbenamnya matahari diketahui dengan hilangnya mega merah di timur, maka mazhab Ja‘fari menunggu beberapa menit setelah matahari terbenam.'],
          [MLYF + ', hadis 16', 'Imam ash-Shadiq mencela penundaan Magrib sampai bintang bermunculan.'],
          [MLYF + ', hadis 18', 'Imam ash-Shadiq: saat matahari terbenam boleh berbuka dan Magrib wajib, dan waktu Isya sampai tengah malam.'],
        ],
      },
      virtue: {
        s: [
          ['Abu Dawud 418', 'Sholat Magrib tepat waktu menjaga umat tetap dalam kebaikan.'],
          ['Shahih Muslim 728, Tirmidzi 415', '2 rakaat sunnah setelah Magrib termasuk dua belas rakaat yang membangun rumah di surga.'],
        ],
        j: [
          [MLYF + ', hadis 20', 'Imam ash-Shadiq: dua rakaat setelah Magrib dicatat di ‘Illiyyin, dan empat rakaat berpahala seperti haji yang diterima.'],
        ],
      },
      prayer: {
        s: [
          ['', '3 rakaat fardhu, tidak diqashar saat safar, lalu 2 rakaat sunnah.'],
          ['Shahih al-Bukhari 1183', 'Sholatlah sebelum Magrib, bagi yang mau: 2 rakaat ringan setelah azan dibolehkan.'],
        ],
        j: [
          ['', '3 rakaat wajib, tidak diqashar saat safar, lalu 4 rakaat nafilah.'],
          [W46, 'Sholat harian 51 rakaat, 17 wajib dan 34 nafilah.'],
        ],
      },
    },
    isha: {
      time: {
        s: [
          ['Shahih Muslim 612', 'Waktu Isya sampai tengah malam.'],
          ['Shahih Muslim 638, Tirmidzi 167', 'Seandainya tidak memberatkan umatku, aku akan menyuruh mereka menunda Isya sampai sepertiga malam.'],
          ['Shahih Muslim 681', 'Kelalaian adalah menunda sholat sampai masuk waktu sholat berikutnya. Mayoritas ulama berpendapat Isya sah sampai Subuh, meski lebih utama sebelum tengah malam.'],
          ['', 'Mayoritas ulama memulai Isya saat mega merah hilang; Abu Hanifah saat mega putih hilang, yang lebih lambat.'],
        ],
        j: [
          [MLYF + ', hadis 13', 'Satu riwayat menyebut waktu Isya sampai sepertiga malam.'],
          [MLYF + ', hadis 18', 'Waktu Isya sampai tengah malam.'],
          [MLYF + ', hadis 14', 'Siapa yang tertidur sampai tengah malam tanpa sholat Isya, ia mengqadha dan berpuasa keesokan harinya.'],
        ],
      },
      virtue: {
        s: [
          ['Shahih Muslim 656', 'Siapa yang sholat Isya berjamaah, seakan ia sholat setengah malam.'],
          ['Shahih al-Bukhari 657, Shahih Muslim 651', 'Sholat paling berat bagi orang munafik adalah Isya dan Subuh; seandainya mereka tahu pahalanya, mereka akan datang walau merangkak.'],
          ['Shahih al-Bukhari 568', 'Nabi ﷺ tidak suka tidur sebelum Isya dan berbincang setelahnya.'],
        ],
        j: [
          [MLYF + ', hadis 19', 'Imam al-Baqir memperingatkan bahwa malaikat melaknat orang yang membiarkan Isya sampai lewat tengah malam.'],
        ],
      },
      prayer: {
        s: [
          ['', '4 rakaat fardhu, lalu 2 rakaat sunnah, kemudian witir.'],
          ['Abu Dawud 1422', 'Witir itu hak. Dalam mazhab Hanafi witir wajib, 3 rakaat.'],
          ['Shahih Muslim 752', 'Witir satu rakaat di akhir malam. Menurut Syafi‘i, Maliki dan Hanbali sunnah, minimal 1 rakaat.'],
          ['Shahih al-Bukhari 998, Shahih Muslim 751', 'Jadikan witir sebagai akhir sholat malammu.'],
        ],
        j: [
          ['', '4 rakaat wajib, lalu 2 rakaat nafilah sambil duduk.'],
          [W46, 'Imam ash-Shadiq: 2 rakaat nafilah duduk setelah Isya dihitung satu.'],
        ],
      },
    },
    ishraq: {
      time: {
        s: [
          ['Shahih Muslim 831, 832', 'Jangan sholat saat matahari terbit sampai ia meninggi, karena itu Isyraq dimulai sekitar 15 menit setelah terbit.'],
          ['', 'Banyak ulama menganggap Isyraq sebagai awal waktu Dhuha.'],
        ],
        j: [['', 'Mazhab Ja‘fari tidak memiliki sholat Isyraq tersendiri. Sholat sunnah boleh dikerjakan setelah matahari meninggi.']],
      },
      virtue: {
        s: [['Tirmidzi 586', 'Siapa yang sholat Subuh berjamaah, lalu duduk berzikir sampai matahari terbit, kemudian sholat dua rakaat, baginya pahala seperti haji dan umrah. Tirmidzi menilainya hasan gharib; sebagian ulama menilainya lemah.']],
        j: [['', 'Mazhab Ja‘fari tidak berpegang pada riwayat tentang sholat Isyraq tersendiri.']],
      },
      prayer: {
        s: [['', '2 rakaat, atau 4.']],
        j: [['', 'Tidak ada sholat Isyraq tersendiri.']],
      },
    },
    chasht: {
      time: {
        s: [
          ['Shahih Muslim 748', 'Sholat awwabin adalah ketika anak unta merasakan panas matahari: waktu terbaik Dhuha, sekitar seperempat siang.'],
          ['Shahih Muslim 831', 'Jangan sholat saat matahari tepat di atas sampai tergelincir, maka Dhuha berakhir sesaat sebelum Zuhur.'],
        ],
        j: [['', 'Riwayat dari para Imam Ahlul Bait menyebut sholat Dhuha sebagai bid‘ah, maka mazhab Ja‘fari tidak menghitungnya sebagai sholat sunnah.']],
      },
      virtue: {
        s: [
          ['Shahih Muslim 720', 'Setiap pagi ada sedekah atas setiap persendian, dan dua rakaat Dhuha sudah mencukupinya.'],
          ['Shahih al-Bukhari 1981, Shahih Muslim 721', 'Abu Hurairah: kekasihku ﷺ berwasiat kepadaku: puasa tiga hari setiap bulan, dua rakaat Dhuha, dan witir sebelum tidur.'],
        ],
        j: [['', 'Tidak termasuk sholat sunnah dalam mazhab Ja‘fari.']],
      },
      prayer: {
        s: [
          ['', 'Minimal 2 rakaat.'],
          ['Shahih Muslim 719', 'Aisyah: beliau ﷺ sholat Dhuha empat rakaat dan menambah sesuai kehendak Allah.'],
          ['Shahih al-Bukhari 1176, Shahih Muslim 336', 'Ummu Hani: pada hari Fathu Makkah beliau ﷺ sholat delapan rakaat di waktu Dhuha.'],
        ],
        j: [['', 'Tidak dikerjakan sebagai sholat tersendiri dalam mazhab Ja‘fari.']],
      },
    },
    awwabin: {
      time: {
        s: [
          ['QS 32:16, 51:17; Abu Dawud 1322', 'Anas menafsirkan ayat-ayat tentang sholat malam ini: mereka sholat di antara Magrib dan Isya.'],
          ['Shahih Muslim 748', 'Dalam hadis ini nama “sholat awwabin” dipakai untuk Dhuha; banyak ulama memakainya untuk sholat di antara Magrib dan Isya.'],
        ],
        j: [
          ['Tsawab al-A‘mal, hlm. 115', 'Saat lalai adalah di antara Magrib dan Isya (sholat Ghufailah).'],
          ['al-‘Urwah al-Wutsqa, jilid 2, hlm. 246', 'Ghufailah dikerjakan setelah Magrib, sebelum mega merah barat hilang.'],
        ],
      },
      virtue: {
        s: [['Tirmidzi 435', 'Enam rakaat setelah Magrib setara ibadah dua belas tahun. Tirmidzi dan ulama lain menilai riwayat ini sangat lemah.']],
        j: [
          ['Tsawab al-A‘mal, hlm. 115', 'Nabi ﷺ: sholat sunnahlah di saat lalai, walau dua rakaat ringan, karena keduanya mengantar ke surga.'],
          ['Wasa’il asy-Syi‘ah, jilid 8, hlm. 121', 'Imam ash-Shadiq: siapa yang sholat dua rakaat ini di antara Magrib dan Isya lalu memohon kepada Allah, Allah memberinya.'],
        ],
      },
      prayer: {
        s: [['', 'Umumnya 6 rakaat, dua-dua, setelah sunnah Magrib; jumlah ini bersandar pada riwayat lemah di atas.']],
        j: [['al-‘Urwah al-Wutsqa, jilid 2, hlm. 246-247', '2 rakaat: setelah al-Fatihah, rakaat pertama QS 21:87-88 dan rakaat kedua QS 6:59.']],
      },
    },
    tahajjud: {
      time: {
        s: [
          ['Shahih al-Bukhari 1145, Shahih Muslim 758', 'Rabb kita turun ke langit dunia setiap malam ketika tersisa sepertiga malam terakhir, lalu berfirman: siapa yang berdoa kepada-Ku, akan Aku kabulkan?'],
          ['Shahih al-Bukhari 1131, Shahih Muslim 1159', 'Sholat yang paling dicintai Allah adalah sholat Dawud: ia tidur setengah malam, sholat sepertiganya, lalu tidur seperenamnya.'],
          ['QS 73:20', 'Tuhanmu mengetahui bahwa engkau berdiri sholat hampir dua pertiga malam, atau setengahnya, atau sepertiganya.'],
        ],
        j: [['Man La Yahdhuruhu al-Faqih, jilid 1, bab waktu sholat malam', 'Nabi ﷺ tidak sholat apa pun setelah Isya sampai tengah malam; sholat malam dari tengah malam sampai fajar, lebih utama mendekati fajar.']],
      },
      virtue: {
        s: [
          ['QS 17:79', 'Dan pada sebagian malam, bertahajudlah sebagai ibadah tambahan bagimu; semoga Tuhanmu mengangkatmu ke tempat yang terpuji.'],
          ['QS 51:17-18', 'Mereka sedikit sekali tidur di waktu malam, dan di akhir malam mereka memohon ampunan.'],
          ['QS 32:16', 'Lambung mereka jauh dari tempat tidur, mereka berdoa kepada Tuhannya dengan rasa takut dan harap.'],
          ['Shahih Muslim 1163', 'Sholat paling utama setelah sholat fardhu adalah sholat malam.'],
        ],
        j: [
          ['QS 17:79', 'Dan pada sebagian malam, bertahajudlah sebagai ibadah tambahan bagimu; semoga Tuhanmu mengangkatmu ke tempat yang terpuji.'],
          ['QS 73:1-4', 'Bangunlah untuk sholat di malam hari, separuhnya atau kurang sedikit atau lebih, dan bacalah Al-Qur’an dengan tartil.'],
        ],
      },
      prayer: {
        s: [
          ['Shahih al-Bukhari 990, Shahih Muslim 749', 'Sholat malam itu dua-dua, dan jika khawatir masuk Subuh, sholatlah satu rakaat witir.'],
          ['Shahih al-Bukhari 1147, Shahih Muslim 738', 'Aisyah: beliau ﷺ tidak pernah sholat malam lebih dari sebelas rakaat, baik di bulan Ramadhan maupun di luarnya.'],
        ],
        j: [
          ['', '11 rakaat: 8, lalu 2 (syaf‘), lalu 1 (witir).'],
          [W46, 'Sholat harian 51 rakaat, 17 wajib dan 34 nafilah, termasuk sholat malam.'],
        ],
      },
    },
  },
};
