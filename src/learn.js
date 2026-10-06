/*
 * "Learn" pages: the 99 Names, wudu, the number of rak'ahs, the night and forenoon prayers (Tahajjud,
 * Ishraq, Chasht), the Quran and Hadith behind each prayer time, and the basis line under the times.
 * English here; other languages in src/learn-i18n/<lang>.js with the same keys.
 *
 * References (checked, Oct 2026):
 *   Hadith numbers follow the sunnah.com numbering (Bukhari, Muslim: Fuad Abd al-Baqi; Abu Dawud; Tirmidhi).
 *   Jafari sources are cited by book and chapter: Man La Yahduruhu al-Faqih vol. 1, chapter on prayer times
 *   (zawal begins the time of Dhuhr and Asr together); Wasa'il al-Shi'a, chapter on the start of Maghrib
 *   (the eastern redness); Wasa'il al-Shi'a vol. 4 p. 46 (51 rak'ahs, Fudayl ibn Yasar); al-Kafi vol. 3,
 *   Book of Purity, chapters on the description of wudu and on wiping the head and feet; Man La Yahduruhu
 *   al-Faqih, chapter on the time of the night prayer.
 *   99 Names: Tirmidhi 3507, which al-Tirmidhi calls gharib; the list is the one in that narration.
 */
'use strict';

// The 99 Names in the order of Tirmidhi 3507, with al-Ahad after al-Wahid: [Arabic, transliteration]. Meanings are per language.
var NAMES = [
  ['الله', 'Allah'], ['الرَّحْمَٰن', 'Ar-Rahman'], ['الرَّحِيم', 'Ar-Rahim'], ['المَلِك', 'Al-Malik'], ['القُدُّوس', 'Al-Quddus'],
  ['السَّلَام', 'As-Salam'], ['المُؤْمِن', 'Al-Mu’min'], ['المُهَيْمِن', 'Al-Muhaymin'], ['العَزِيز', 'Al-‘Aziz'], ['الجَبَّار', 'Al-Jabbar'],
  ['المُتَكَبِّر', 'Al-Mutakabbir'], ['الخَالِق', 'Al-Khaliq'], ['البَارِئ', 'Al-Bari’'], ['المُصَوِّر', 'Al-Musawwir'], ['الغَفَّار', 'Al-Ghaffar'],
  ['القَهَّار', 'Al-Qahhar'], ['الوَهَّاب', 'Al-Wahhab'], ['الرَّزَّاق', 'Ar-Razzaq'], ['الفَتَّاح', 'Al-Fattah'], ['العَلِيم', 'Al-‘Alim'],
  ['القَابِض', 'Al-Qabid'], ['البَاسِط', 'Al-Basit'], ['الخَافِض', 'Al-Khafid'], ['الرَّافِع', 'Ar-Rafi‘'], ['المُعِزّ', 'Al-Mu‘izz'],
  ['المُذِلّ', 'Al-Mudhill'], ['السَّمِيع', 'As-Sami‘'], ['البَصِير', 'Al-Basir'], ['الحَكَم', 'Al-Hakam'], ['العَدْل', 'Al-‘Adl'],
  ['اللَّطِيف', 'Al-Latif'], ['الخَبِير', 'Al-Khabir'], ['الحَلِيم', 'Al-Halim'], ['العَظِيم', 'Al-‘Azim'], ['الغَفُور', 'Al-Ghafur'],
  ['الشَّكُور', 'Ash-Shakur'], ['العَلِيّ', 'Al-‘Aliyy'], ['الكَبِير', 'Al-Kabir'], ['الحَفِيظ', 'Al-Hafiz'], ['المُقِيت', 'Al-Muqit'],
  ['الحَسِيب', 'Al-Hasib'], ['الجَلِيل', 'Al-Jalil'], ['الكَرِيم', 'Al-Karim'], ['الرَّقِيب', 'Ar-Raqib'], ['المُجِيب', 'Al-Mujib'],
  ['الوَاسِع', 'Al-Wasi‘'], ['الحَكِيم', 'Al-Hakim'], ['الوَدُود', 'Al-Wadud'], ['المَجِيد', 'Al-Majid'], ['البَاعِث', 'Al-Ba‘ith'],
  ['الشَّهِيد', 'Ash-Shahid'], ['الحَقّ', 'Al-Haqq'], ['الوَكِيل', 'Al-Wakil'], ['القَوِيّ', 'Al-Qawiyy'], ['المَتِين', 'Al-Matin'],
  ['الوَلِيّ', 'Al-Waliyy'], ['الحَمِيد', 'Al-Hamid'], ['المُحْصِي', 'Al-Muhsi'], ['المُبْدِئ', 'Al-Mubdi’'], ['المُعِيد', 'Al-Mu‘id'],
  ['المُحْيِي', 'Al-Muhyi'], ['المُمِيت', 'Al-Mumit'], ['الحَيّ', 'Al-Hayy'], ['القَيُّوم', 'Al-Qayyum'], ['الوَاجِد', 'Al-Wajid'],
  ['المَاجِد', 'Al-Majid'], ['الوَاحِد', 'Al-Wahid'], ['الأَحَد', 'Al-Ahad'], ['الصَّمَد', 'As-Samad'], ['القَادِر', 'Al-Qadir'], ['المُقْتَدِر', 'Al-Muqtadir'],
  ['المُقَدِّم', 'Al-Muqaddim'], ['المُؤَخِّر', 'Al-Mu’akhkhir'], ['الأَوَّل', 'Al-Awwal'], ['الآخِر', 'Al-Akhir'], ['الظَّاهِر', 'Az-Zahir'],
  ['البَاطِن', 'Al-Batin'], ['الوَالِي', 'Al-Wali'], ['المُتَعَالِي', 'Al-Muta‘ali'], ['البَرّ', 'Al-Barr'], ['التَّوَّاب', 'At-Tawwab'],
  ['المُنْتَقِم', 'Al-Muntaqim'], ['العَفُوّ', 'Al-‘Afuww'], ['الرَّءُوف', 'Ar-Ra’uf'], ['مَالِكُ المُلْك', 'Malik al-Mulk'], ['ذُو الجَلَالِ وَالإِكْرَام', 'Dhul-Jalali wal-Ikram'],
  ['المُقْسِط', 'Al-Muqsit'], ['الجَامِع', 'Al-Jami‘'], ['الغَنِيّ', 'Al-Ghaniyy'], ['المُغْنِي', 'Al-Mughni'], ['المَانِع', 'Al-Mani‘'],
  ['الضَّارّ', 'Ad-Darr'], ['النَّافِع', 'An-Nafi‘'], ['النُّور', 'An-Nur'], ['الهَادِي', 'Al-Hadi'], ['البَدِيع', 'Al-Badi‘'],
  ['البَاقِي', 'Al-Baqi'], ['الوَارِث', 'Al-Warith'], ['الرَّشِيد', 'Ar-Rashid'], ['الصَّبُور', 'As-Sabur'],
];

var EN = {
  // Tabs under the header, on every page.
  tabs: { times: 'Prayer times', evidence: 'Quran & Hadith', wudu: 'Wudu', rakahs: 'The Five Prayers', night: 'Tahajjud, Ishraq, Chasht', names: '99 Names of ALLAH' },
  ref: 'Reference',

  // Under today's times: why each time starts when it does, in the chosen school.
  basis: {
    sum: 'Basis for these times ({sect})',
    fajr: 'Fajr: from true dawn until sunrise. Quran 2:187, 17:78; Sahih Muslim 612.',
    dhuhr: 'Dhuhr: from just after the sun passes its highest point. Quran 17:78; Abu Dawud 393, Tirmidhi 149.',
    dhuhrJ: 'Dhuhr and Asr: one shared time from midday until sunset, Dhuhr first. Quran 17:78; Man La Yahduruhu al-Faqih, vol. 1, chapter on prayer times; Sahih Muslim 705.',
    asr1: 'Asr: when a shadow equals the length of its object, plus the noon shadow. Abu Dawud 393, Tirmidhi 149; Sahih Muslim 612.',
    asr2: 'Asr: when a shadow is twice the length of its object, plus the noon shadow (Abu Hanifa). Sahih al-Bukhari 557, 533.',
    maghrib: 'Maghrib: at sunset. Sahih al-Bukhari 561; Sahih Muslim 636.',
    maghribJ: 'Maghrib: when the redness has left the eastern sky, a few minutes after sunset. Wasa’il al-Shi‘a, chapter on the start of Maghrib.',
    isha: 'Isha: when the twilight has gone; best before a third of the night. Sahih Muslim 612, 638.',
    ishaJ: 'Isha: after Maghrib, sharing its time until midnight. Quran 17:78; Sahih Muslim 705.',
    more: 'Quran and Hadith for each prayer',
  },

  // /prayers/evidence/: the Quran and Hadith on prayer times, by school.
  ev: {
    title: 'Prayer Times in the Quran and Hadith, by School | SalaahDaily',
    h1: 'Prayer times in the Quran and Hadith',
    desc: 'The Quran verses and hadith behind the times of Fajr, Dhuhr, Asr, Maghrib and Isha, and why the Hanafi, Shafi‘i, Maliki, Hanbali and Jafari schools differ.',
    lede: 'The Quran says prayer is prescribed at set times, and the Prophet ﷺ showed those times by example. The schools agree on most of them and differ on a few points, mainly the start of Asr, the end of Maghrib and the shared times of the Jafari school.',
    quranH: 'In the Quran',
    quran: [
      ['Quran 4:103', 'Prayer has been prescribed for the believers at set times.'],
      ['Quran 17:78', 'Establish prayer from the decline of the sun until the darkness of the night, and the recitation at dawn.'],
      ['Quran 11:114', 'Establish prayer at the two ends of the day and in the early hours of the night.'],
      ['Quran 2:238', 'Guard the prayers, and the middle prayer. The Prophet ﷺ called the middle prayer the Asr prayer (Sahih Muslim 627).'],
      ['Quran 2:187', 'Eat and drink until the white thread of dawn becomes distinct from the black thread. Fajr begins at this true dawn.'],
    ],
    hadithH: 'In the Hadith',
    hadith: [
      ['Abu Dawud 393, Tirmidhi 149', 'Jibril led the Prophet ﷺ in prayer on two days at the Ka‘bah: on the first day at the start of each time, on the second near its end, and said the time of each prayer lies between the two.'],
      ['Sahih Muslim 612', 'The time of Dhuhr is from when the sun passes the meridian until a man’s shadow equals his height; Asr until the sun turns yellow; Maghrib until the twilight has gone; Isha until the middle of the night; Fajr from dawn until sunrise.'],
      ['Sahih Muslim 681', 'Negligence is only in delaying a prayer until the time of the next one comes. Most scholars take from this that Isha stays valid until Fajr, though it is best before midnight.'],
      ['Sahih Muslim 705', 'Ibn Abbas reported that the Prophet ﷺ combined Dhuhr with Asr and Maghrib with Isha in Madinah, without fear or rain, so as not to burden his community.'],
    ],
    schoolsH: 'Where the schools differ',
    schools: [
      ['Asr', 'The Shafi‘i, Maliki, Hanbali and Jafari schools start Asr when a shadow equals its object’s length (plus the noon shadow), from the hadith of Jibril. Abu Hanifa held that it starts at twice the length, reading Sahih al-Bukhari 557 (the time from Asr to sunset is the shortest part of the day) and 533 (delay Dhuhr in the heat) to mean Dhuhr lasts longer.'],
      ['Maghrib', 'The Sunni schools pray Maghrib at sunset (Sahih al-Bukhari 561). The Jafari school waits until the redness has left the eastern sky, from narrations of Imam al-Sadiq collected in al-Kafi and Wasa’il al-Shi‘a.'],
      ['Isha', 'Most scholars start Isha when the red twilight has gone. Abu Hanifa held that it starts when the white twilight has gone, which is later.'],
      ['Dhuhr and Asr, Maghrib and Isha', 'In the Jafari school, Dhuhr and Asr share one time from midday until sunset, and Maghrib and Isha share one time until midnight, each pair prayed in order. Imam al-Sadiq: when the sun passes the meridian, the time of both prayers begins (Man La Yahduruhu al-Faqih, vol. 1). The Sunni schools give each prayer its own time. The Shafi‘i, Maliki and Hanbali schools allow combining when travelling (the Hanbali school also for illness and other need); the Hanafi school only at Arafah and Muzdalifah during Hajj.'],
    ],
    note: 'Hadith numbers follow sunnah.com. Jafari sources are named by book and chapter.',
  },

  // /wudu/
  wudu: {
    title: 'How to Perform Wudu: Steps from the Quran and Hadith | SalaahDaily',
    h1: 'How to perform wudu',
    desc: 'The steps of wudu (ablution) from Quran 5:6 and the hadith, what breaks wudu, and how the Hanafi, Shafi‘i, Maliki, Hanbali and Jafari schools differ.',
    lede: 'Wudu is the washing before prayer. Its obligatory parts are in the Quran (5:6), and the Prophet’s ﷺ way of doing it was described by his Companions.',
    whyH: 'Why wudu is needed',
    why: [
      ['Quran 5:6', 'O you who believe, when you rise for prayer, wash your faces and your arms up to the elbows, wipe your heads, and your feet up to the ankles.'],
      ['Sahih al-Bukhari 135, Sahih Muslim 225', 'Allah does not accept the prayer of one who has broken his wudu until he performs wudu again.'],
      ['Sahih al-Bukhari 1', 'Actions are judged by intentions.'],
    ],
    stepsH: 'Steps (Sunni schools)',
    stepsRef: 'Uthman ibn Affan showed the Prophet’s ﷺ wudu this way: Sahih al-Bukhari 159, Sahih Muslim 226.',
    steps: [
      'Make the intention in your heart and say Bismillah.',
      'Wash both hands up to the wrists, three times.',
      'Rinse the mouth, three times.',
      'Rinse the nose: draw water in and blow it out, three times.',
      'Wash the face from the hairline to the chin and from ear to ear, three times.',
      'Wash the right arm up to and including the elbow, three times, then the left.',
      'Wipe the head with wet hands, then the ears.',
      'Wash the right foot up to and including the ankle, three times, then the left, between the toes too.',
    ],
    feetRef: 'Washing the feet: “Woe to the heels from the Fire” (Sahih al-Bukhari 60, Sahih Muslim 241).',
    jafariH: 'Jafari wudu',
    jafari: [
      'Intention, then wash the face from the hairline to the chin, from top to bottom.',
      'Wash the right arm from the elbow down to the fingertips, then the left.',
      'With the water left on the right hand, wipe the front of the head.',
      'With the water left on the hands, wipe the top of the right foot from the toes to the ankle, then the left.',
    ],
    jafariRef: 'Quran 5:6 is read as wiping the feet. Imam al-Baqir showed the Prophet’s ﷺ wudu, wiping the head and feet with the water left on his hands: al-Kafi, vol. 3, Book of Purity, chapters on the description of wudu and on wiping the head and feet.',
    diffH: 'Where the schools differ',
    diff: [
      ['Intention', 'A condition for a valid wudu in the Shafi‘i, Maliki, Hanbali and Jafari schools; a sunnah in the Hanafi school.'],
      ['Wiping the head', 'Hanafi: at least a quarter of the head (the Prophet ﷺ wiped his forelock, Sahih Muslim 274). Shafi‘i: any part. Maliki and Hanbali: the whole head (Sahih al-Bukhari 185, Sahih Muslim 235). Jafari: part of the front of the head.'],
      ['Feet', 'The Sunni schools wash the feet; the Jafari school wipes them.'],
      ['Order and continuity', 'Shafi‘i, Hanbali and Jafari: the order of Quran 5:6 is required. Maliki, Hanbali and Jafari: the parts must follow each other without a long break. Hanafi: both are sunnah.'],
    ],
    breaksH: 'What breaks wudu',
    breaks: 'All schools: using the toilet, passing wind, deep sleep and losing consciousness (Quran 5:6; Sahih al-Bukhari 135). The schools differ on bleeding, vomiting and touching the opposite sex, so follow your school.',
  },

  // /prayers/rakahs/
  rk: {
    title: 'How Many Rak‘ahs in Each Prayer? By School, with Hadith | SalaahDaily',
    h1: 'How many rak‘ahs in each prayer',
    desc: 'The fard, sunnah and witr rak‘ahs of Fajr, Dhuhr, Asr, Maghrib and Isha in the Hanafi, Shafi‘i, Maliki, Hanbali and Jafari schools, with the hadith behind them.',
    lede: 'All schools agree on 17 obligatory (fard) rak‘ahs a day. The voluntary prayers around them differ by school.',
    colPrayer: 'Prayer', colFard: 'Fard', colSunni: 'Sunnah (Hanafi)', colShafi: 'Sunnah (Shafi‘i, Hanbali)', colJafari: 'Nafilah (Jafari)',
    rows: {
      fajr: ['2', '2 before', '2 before', '2 before'],
      dhuhr: ['4', '4 before, 2 after', '2 before, 2 after', '8 before'],
      asr: ['4', '4 before (optional)', '4 before (optional)', '8 before'],
      maghrib: ['3', '2 after', '2 after', '4 after'],
      isha: ['4', '2 after, then 3 witr', '2 after, then witr', '2 after, sitting (count as 1)'],
    },
    night: 'Night prayer: Witr is 3 rak‘ahs and wajib in the Hanafi school; at least 1 rak‘ah and sunnah in the Shafi‘i, Maliki and Hanbali schools. In the Jafari school the night prayer is 11 rak‘ahs: 8, then 2 (shaf‘), then 1 (witr). The Maliki school holds similar sunnah prayers and stresses the 2 before Fajr.',
    refsH: 'References',
    refs: [
      ['Sahih al-Bukhari 350, Sahih Muslim 685', 'Aisha: prayer was first prescribed as two rak‘ahs; it stayed so when travelling and was increased when at home. This is why travellers shorten the 4-rak‘ah prayers to 2.'],
      ['Sahih Muslim 728, Tirmidhi 415', 'Twelve rak‘ahs of sunnah a day build a house in Paradise: 4 before Dhuhr and 2 after, 2 after Maghrib, 2 after Isha and 2 before Fajr.'],
      ['Sahih al-Bukhari 1180', 'Ibn Umar remembered ten rak‘ahs: 2 before Dhuhr and 2 after, 2 after Maghrib, 2 after Isha and 2 before Fajr.'],
      ['Abu Dawud 1271, Tirmidhi 430', 'May Allah have mercy on one who prays four rak‘ahs before Asr.'],
      ['Sahih Muslim 752', 'Witr is one rak‘ah at the end of the night.'],
      ['Wasa’il al-Shi‘a, vol. 4, p. 46', 'Imam al-Sadiq: the obligatory and voluntary prayers are 51 rak‘ahs: 17 obligatory and 34 voluntary, the 2 sitting after Isha counting as 1.'],
    ],
  },

  // /prayers/tahajjud/ etc.: a page each, with today's times for the visitor's city.
  nafl: {
    todayH: 'Today in {city}',
    from: '{start} to {end}',
    cityHint: 'Times for your last opened city. Open a city page to change it.',
    pages: {
      tahajjud: {
        title: 'Tahajjud Time Today: Start, End, Rak‘ahs and Hadith | SalaahDaily',
        h1: 'Tahajjud time',
        desc: 'When Tahajjud starts and ends tonight, how many rak‘ahs to pray, and the Quran and hadith on the night prayer, with the Jafari Salat al-Layl.',
        time: 'Tahajjud is prayed after Isha and before Fajr, after some sleep. The best time is the last third of the night, which SalaahDaily shows: from the start of the last third of the time between Maghrib and Fajr, until Fajr. In the Jafari school, Salat al-Layl is prayed from midnight until Fajr.',
        count: 'At least 2 rak‘ahs, in pairs. The Prophet ﷺ usually prayed 11 rak‘ahs including Witr, sometimes 13. In the Jafari school, 11 rak‘ahs: 8, then 2 (shaf‘), then 1 (witr).',
        refs: [
          ['Quran 17:79', 'And in part of the night, pray Tahajjud as an extra prayer for you.'],
          ['Quran 73:1-4, 73:20', 'Stand in prayer at night, half of it or a little less or more, and recite the Quran slowly.'],
          ['Quran 51:17-18', 'They used to sleep little of the night, and before dawn they asked forgiveness.'],
          ['Sahih al-Bukhari 1145, Sahih Muslim 758', 'Our Lord descends to the lowest heaven when the last third of the night remains, and says: who will call on Me, that I may answer him?'],
          ['Sahih Muslim 1163', 'The best prayer after the obligatory prayers is the prayer at night.'],
          ['Sahih al-Bukhari 1147, Sahih Muslim 738', 'Aisha: he did not pray more than eleven rak‘ahs at night, in Ramadan or at other times.'],
          ['Sahih al-Bukhari 990, Sahih Muslim 749', 'The night prayer is two by two, and when you fear dawn, pray one rak‘ah of Witr.'],
          ['Man La Yahduruhu al-Faqih, chapter on the time of the night prayer', 'The Prophet ﷺ prayed nothing after Isha until midnight; the night prayer is from midnight until dawn (Jafari).'],
        ],
      },
      ishraq: {
        title: 'Ishraq Time Today: When It Starts, Rak‘ahs and Hadith | SalaahDaily',
        h1: 'Ishraq time',
        desc: 'When the Ishraq prayer starts and ends today, how many rak‘ahs, and the hadith about sitting after Fajr until sunrise.',
        time: 'Ishraq is prayed once the sun has fully risen and is a little above the horizon, about 15 minutes after sunrise. Praying while the sun is rising is not allowed. Many scholars see Ishraq as the early part of the Duha time.',
        count: '2 rak‘ahs, or 4.',
        refs: [
          ['Tirmidhi 586', 'Whoever prays Fajr in congregation, sits remembering Allah until the sun rises, then prays two rak‘ahs, has a reward like that of Hajj and Umrah. Al-Tirmidhi graded it hasan gharib; some scholars consider it weak.'],
          ['Sahih Muslim 831, 832', 'Do not pray while the sun is rising until it has risen high.'],
        ],
      },
      chasht: {
        title: 'Chasht (Duha) Time Today: Start, End, Rak‘ahs and Hadith | SalaahDaily',
        h1: 'Chasht (Duha) time',
        desc: 'When Chasht (Salat al-Duha) starts and ends today, how many rak‘ahs to pray, and the hadith on the forenoon prayer.',
        time: 'Duha is prayed in the forenoon, from after Ishraq until shortly before Dhuhr. Its best time is when the day has grown hot, about a quarter of the way through the day, which SalaahDaily shows as Chasht. It ends 10 minutes before Dhuhr, before the sun reaches its highest point.',
        count: 'At least 2 rak‘ahs; the Prophet ﷺ also prayed 4, and 8 on the day of the conquest of Makkah. The Jafari school does not count Duha among the recommended prayers.',
        refs: [
          ['Sahih al-Bukhari 1981, Sahih Muslim 721', 'Abu Hurayra: my friend ﷺ advised me to fast three days each month, pray two rak‘ahs of Duha, and pray Witr before sleeping.'],
          ['Sahih Muslim 720', 'Charity is due on every joint each morning, and two rak‘ahs of Duha are enough for it.'],
          ['Sahih Muslim 748', 'The prayer of the oft-returning (awwabin) is when the young camels feel the heat of the sun.'],
          ['Sahih Muslim 719', 'Aisha: he prayed Duha four rak‘ahs and more, as Allah willed.'],
          ['Sahih al-Bukhari 1176, Sahih Muslim 336', 'Umm Hani: on the day of the conquest of Makkah he prayed eight rak‘ahs in the forenoon.'],
        ],
      },
    },
    timeH: 'When to pray it', countH: 'How many rak‘ahs', refsH: 'Quran and Hadith',
  },

  // /names-of-allah/
  names: {
    title: '99 Names of Allah: Arabic, Meaning and Hadith | SalaahDaily',
    h1: '99 Names of Allah (Asma ul Husna)',
    desc: 'All 99 Names of Allah in Arabic with transliteration and meaning, from the list in Tirmidhi 3507, with the Quran verses and hadith about the Names.',
    lede: 'Allah has the most beautiful names, and the Prophet ﷺ said that whoever learns and lives by ninety-nine of them will enter Paradise.',
    refs: [
      ['Quran 7:180', 'To Allah belong the most beautiful names, so call on Him by them.'],
      ['Quran 59:22-24', 'He is Allah, the Knower of the unseen and the seen, the Most Merciful, the Sovereign, the Holy, the Source of Peace. To Him belong the most beautiful names.'],
      ['Sahih al-Bukhari 7392, Sahih Muslim 2677', 'Allah has ninety-nine names, one hundred less one. Whoever counts them (learns and lives by them) will enter Paradise.'],
    ],
    listNote: 'The list follows Tirmidhi 3507. Al-Tirmidhi called this narration gharib, and many scholars hold that the list itself was added by a narrator, so other lists differ slightly. Allah has more names than these ninety-nine. Al-Ahad is added after al-Wahid, as in many lists.',
    colNo: 'No.', colAr: 'Arabic', colTr: 'Name', colMean: 'Meaning',
    meanings: [
      'Allah, the One God', 'The Most Gracious', 'The Most Merciful', 'The King', 'The Most Holy', 'The Source of Peace', 'The Giver of Faith and Security',
      'The Guardian', 'The Almighty', 'The Compeller, the Restorer', 'The Supreme in Greatness', 'The Creator', 'The Maker', 'The Fashioner of Forms',
      'The Ever-Forgiving', 'The All-Prevailing', 'The Bestower', 'The Provider', 'The Opener, the Judge', 'The All-Knowing', 'The Withholder',
      'The Extender', 'The Abaser', 'The Exalter', 'The Giver of Honour', 'The Giver of Disgrace', 'The All-Hearing', 'The All-Seeing', 'The Judge',
      'The Just', 'The Subtle, the Kind', 'The All-Aware', 'The Forbearing', 'The Magnificent', 'The All-Forgiving', 'The Appreciative', 'The Most High',
      'The Most Great', 'The Preserver', 'The Sustainer', 'The Reckoner', 'The Majestic', 'The Most Generous', 'The Watchful', 'The Responsive',
      'The All-Encompassing', 'The All-Wise', 'The Loving', 'The Most Glorious', 'The Resurrector', 'The Witness', 'The Truth', 'The Trustee',
      'The All-Strong', 'The Firm', 'The Protecting Friend', 'The Praiseworthy', 'The Accounter', 'The Originator', 'The Restorer', 'The Giver of Life',
      'The Bringer of Death', 'The Ever-Living', 'The Self-Subsisting', 'The Finder', 'The Noble', 'The One', 'The Unique, the Indivisible', 'The Eternal Refuge', 'The All-Capable',
      'The All-Powerful', 'The Expediter', 'The Delayer', 'The First', 'The Last', 'The Manifest', 'The Hidden', 'The Governor', 'The Most Exalted',
      'The Source of All Goodness', 'The Accepter of Repentance', 'The Avenger', 'The Pardoner', 'The Most Kind', 'Owner of All Sovereignty',
      'Lord of Majesty and Generosity', 'The Equitable', 'The Gatherer', 'The Self-Sufficient', 'The Enricher', 'The Preventer', 'The Distresser',
      'The Benefactor', 'The Light', 'The Guide', 'The Incomparable Originator', 'The Everlasting', 'The Inheritor', 'The Guide to the Right Path',
      'The Most Patient',
    ],
  },
};

if (typeof module === 'object' && module.exports) module.exports = { NAMES: NAMES, LEARN: { en: EN } };
