/*
 * Reference pages (/prayers/<key>/reference/): the Quran and hadith for each prayer in three sections
 * (timing, benefits, the prayer itself), Sunni view (Hanafi, Shafi'i, Maliki, Hanbali) beside the Shia
 * (Jafari) view. Linked from "Reference" under each prayer time on city pages.
 * Items: [reference, text]; an empty reference is a plain statement of the school's view.
 * Hadith numbers follow sunnah.com. Jafari sources (checked Oct 2026 on thaqalayn and wikishia):
 *   Man La Yahduruhu al-Faqih vol. 1: chapter on prayer times (hadith 1-6, 9, 10, 13, 14, 16, 18-20, 27),
 *   chapter on recognizing the dawn (hadith 1-2), chapter on the time of the night prayer;
 *   Wasa'il al-Shi'a vol. 4 p. 46 (51 rak'ahs), vol. 8 p. 121 (Ghufayla); Thawab al-A'mal p. 115 (Ghufayla);
 *   al-'Urwa al-Wuthqa vol. 2 pp. 246-247 (how Ghufayla is prayed).
 * English here; translations in src/prayer-refs-i18n/<lang>.js with the same shape.
 */
'use strict';

var MLYF = 'Man La Yahduruhu al-Faqih, vol. 1, chapter on prayer times';
var W46 = 'Wasa’il al-Shi‘a, vol. 4, p. 46';

var EN = {
  label: 'Reference',
  title: '{prayer}: Quran and Hadith on its Time, Benefits and Rak‘ahs | SalaahDaily',
  h1: '{prayer}: Quran and Hadith',
  desc: 'The Quran verses and hadith on the time of {prayer}, its benefits and how many rak‘ahs, from the Sunni schools and the Shia (Jafari) school side by side.',
  lede: 'References from the Quran and hadith, with the Sunni view (Hanafi, Shafi‘i, Maliki, Hanbali) and the Shia view (Jafari) side by side.',
  sunniH: 'Sunni view (Hanafi, Shafi‘i, Maliki, Hanbali)',
  shiaH: 'Shia view (Jafari)',
  timeH: 'Timing of {prayer}',
  virtueH: 'Benefits of {prayer}',
  prayerH: 'The {prayer} prayer: rak‘ahs',
  note: 'Hadith numbers follow sunnah.com. Jafari sources are named by book, volume and chapter.',
  otherH: 'References for the other prayers',
  items: {
    fajr: {
      time: {
        s: [
          ['Quran 2:187', 'Eat and drink until the white thread of dawn becomes distinct from the black thread. Fajr begins at this true dawn.'],
          ['Quran 17:78', 'Establish prayer … and the recitation at dawn.'],
          ['Sahih Muslim 612', 'The time of Fajr is from the rising of dawn until the sun rises.'],
          ['Abu Dawud 393, Tirmidhi 149', 'Jibril led Fajr when dawn broke on the first day, and when it had grown light on the second, and said the time lies between the two.'],
          ['Sahih al-Bukhari 578, Sahih Muslim 645', 'The Prophet ﷺ prayed Fajr while it was still dark. The Shafi‘i, Maliki and Hanbali schools prefer praying it early.'],
          ['Tirmidhi 154, Abu Dawud 424', 'Pray Fajr when the light has spread, for its reward is greater. The Hanafi school prefers praying it in the light (isfar).'],
        ],
        j: [
          ['Quran 17:78', 'Establish prayer … and the recitation at dawn.'],
          ['Man La Yahduruhu al-Faqih, vol. 1, chapter on recognizing the dawn, hadith 1-2', 'Imam al-Sadiq: the true dawn spreads across the horizon like a white river, not upward like a wolf’s tail, and the time of Fajr begins once it has spread and lit the sky.'],
          [MLYF + ', hadith 6', 'Imam al-Sadiq: praying at the start of a prayer’s time brings Allah’s pleasure; praying at its end brings only His forgiveness.'],
        ],
      },
      virtue: {
        s: [
          ['Quran 17:78', 'The recitation at dawn is witnessed.'],
          ['Sahih Muslim 657', 'Whoever prays Fajr is under the protection of Allah.'],
          ['Sahih al-Bukhari 574, Sahih Muslim 635', 'Whoever prays the two cool prayers (Fajr and Asr) will enter Paradise.'],
          ['Sahih Muslim 656', 'Whoever prays Fajr in congregation, it is as if he prayed the whole night.'],
          ['Sahih al-Bukhari 657, Sahih Muslim 651', 'The heaviest prayers on the hypocrites are Isha and Fajr; if they knew their reward, they would come even crawling.'],
        ],
        j: [
          ['Quran 17:78', 'The recitation at dawn is witnessed.'],
          [MLYF + ', hadith 7', 'Imam al-Sadiq: praying at the earliest time is better for the believer than his children and his wealth.'],
        ],
      },
      prayer: {
        s: [
          ['', '2 fard rak‘ahs, with 2 sunnah rak‘ahs before them.'],
          ['Sahih Muslim 725', 'The two rak‘ahs before Fajr are better than the world and all it contains.'],
          ['Sahih al-Bukhari 1169, Sahih Muslim 724', 'Aisha: he ﷺ was not more regular in any voluntary prayer than the two rak‘ahs before Fajr.'],
          ['', 'Qunut: the Shafi‘i and Maliki schools recite qunut in Fajr; the Hanafi and Hanbali schools do not, except in times of calamity.'],
        ],
        j: [
          ['', '2 obligatory rak‘ahs, with 2 nafilah rak‘ahs before them.'],
          [W46, 'Imam al-Sadiq: the daily prayers are 51 rak‘ahs, 17 obligatory and 34 nafilah; in Jafari practice 2 nafilah rak‘ahs come before Fajr.'],
          ['', 'Qunut is recited in the second rak‘ah of every prayer, Fajr included.'],
        ],
      },
    },
    dhuhr: {
      time: {
        s: [
          ['Quran 17:78', 'Establish prayer from the decline of the sun until the darkness of the night.'],
          ['Abu Dawud 393, Tirmidhi 149', 'Jibril led Dhuhr when the sun had passed the meridian, and on the second day when a shadow equalled its object.'],
          ['Sahih Muslim 618', 'The Prophet ﷺ prayed Dhuhr when the sun had passed the meridian.'],
          ['Sahih Muslim 612', 'The time of Dhuhr lasts until a man’s shadow equals his height, as long as Asr has not come.'],
          ['Sahih al-Bukhari 533, Sahih Muslim 615', 'When the heat is intense, delay Dhuhr until it is cooler. The Hanafi school delays Dhuhr in summer for this reason.'],
        ],
        j: [
          [MLYF + ', hadith 1-3', 'Imam al-Sadiq and Imam al-Baqir: when the sun declines, the time of Dhuhr and Asr begins together, Dhuhr first, and lasts until sunset.'],
          [MLYF + ', hadith 4', 'The preferred time of Dhuhr is until the shadow has grown two feet after midday, and of Asr two feet more.'],
          [MLYF + ', hadith 27', 'The Prophet ﷺ told the muezzin to wait a little before Dhuhr in strong heat.'],
          ['Sahih Muslim 705', 'Ibn Abbas: the Prophet ﷺ combined Dhuhr with Asr in Madinah without fear or rain, so as not to burden his community.'],
        ],
      },
      virtue: {
        s: [
          ['Abu Dawud 1269, Tirmidhi 428', 'Whoever keeps four rak‘ahs before Dhuhr and four after, Allah forbids him to the Fire.'],
          ['Tirmidhi 478', 'The gates of heaven are opened after the sun passes the meridian, and the Prophet ﷺ loved that a good deed of his should rise then.'],
        ],
        j: [
          [MLYF + ', hadith 5', 'Imam al-Sadiq: the first time of prayer, when the sun declines, is the time Allah loves most and the most excellent.'],
        ],
      },
      prayer: {
        s: [
          ['', '4 fard rak‘ahs. Hanafi: 4 sunnah before and 2 after. Shafi‘i and Hanbali: 2 before and 2 after (4 before is also sunnah).'],
          ['Sahih al-Bukhari 1182', 'Aisha: he ﷺ never left the four rak‘ahs before Dhuhr.'],
          ['Sahih Muslim 728, Tirmidhi 415', 'Twelve daily rak‘ahs of sunnah build a house in Paradise: among them 4 before Dhuhr and 2 after.'],
          ['Sahih al-Bukhari 1180', 'Ibn Umar remembered 2 rak‘ahs before Dhuhr and 2 after.'],
          ['Quran 62:9', 'On Friday, Jumu‘ah (2 rak‘ahs after the khutbah) is prayed in place of Dhuhr.'],
        ],
        j: [
          ['', '4 obligatory rak‘ahs, with 8 nafilah rak‘ahs before them.'],
          [MLYF + ', hadith 1', 'Imam al-Sadiq: when the sun declines, the time has come; pray once you have finished your nafilah.'],
          [W46, 'The daily prayers are 51 rak‘ahs, 17 obligatory and 34 nafilah.'],
          ['Quran 62:9', 'On Friday, Jumu‘ah and Dhuhr are both valid choices in the Jafari school today.'],
        ],
      },
    },
    asr: {
      time: {
        s: [
          ['Abu Dawud 393, Tirmidhi 149', 'Jibril led Asr when a shadow equalled its object. The Shafi‘i, Maliki and Hanbali schools start Asr then.'],
          ['Sahih al-Bukhari 557', 'The time from Asr to sunset is the shortest part of the day. From this Abu Hanifa held that Asr starts when a shadow is twice its object.'],
          ['Sahih Muslim 612', 'The time of Asr lasts until the sun turns yellow.'],
          ['Sahih al-Bukhari 550', 'The Prophet ﷺ prayed Asr while the sun was still high and bright.'],
          ['Sahih Muslim 622', 'Delaying Asr until the sun turns yellow is the prayer of the hypocrite.'],
        ],
        j: [
          [MLYF + ', hadith 2', 'Imam al-Sadiq: the time of Dhuhr and Asr begins together at midday, Dhuhr before Asr, and lasts until sunset.'],
          [MLYF + ', hadith 4', 'The preferred time of Asr is when the shadow has grown two feet more after the time of Dhuhr.'],
          [MLYF + ', hadith 9', 'Imam al-Baqir: pray Asr while the sun is still white and clear.'],
        ],
      },
      virtue: {
        s: [
          ['Quran 2:238, Sahih Muslim 627', 'Guard the prayers, and the middle prayer. The Prophet ﷺ called the middle prayer the Asr prayer.'],
          ['Sahih al-Bukhari 574, Sahih Muslim 635', 'Whoever prays the two cool prayers (Fajr and Asr) will enter Paradise.'],
          ['Sahih al-Bukhari 552, Sahih Muslim 626', 'Whoever misses the Asr prayer, it is as if he has lost his family and his wealth.'],
          ['Sahih al-Bukhari 553', 'Whoever leaves the Asr prayer, his deeds are lost.'],
        ],
        j: [
          ['Quran 2:238', 'Guard the prayers, and the middle prayer.'],
          [MLYF + ', hadith 9', 'Imam al-Baqir warned that whoever neglects Asr is deprived of good in Paradise.'],
        ],
      },
      prayer: {
        s: [
          ['', '4 fard rak‘ahs; 4 sunnah before are recommended but not stressed.'],
          ['Abu Dawud 1271, Tirmidhi 430', 'May Allah have mercy on one who prays four rak‘ahs before Asr.'],
          ['Sahih al-Bukhari 350, Sahih Muslim 685', 'Prayer was first prescribed as two rak‘ahs; it stayed so when travelling, which is why travellers pray Asr as 2.'],
        ],
        j: [
          ['', '4 obligatory rak‘ahs, with 8 nafilah rak‘ahs before them.'],
          [W46, 'The daily prayers are 51 rak‘ahs, 17 obligatory and 34 nafilah.'],
          ['Quran 4:101', 'When travelling there is no blame in shortening the prayer, so Asr becomes 2.'],
        ],
      },
    },
    maghrib: {
      time: {
        s: [
          ['Sahih al-Bukhari 561, Sahih Muslim 636', 'The Prophet ﷺ prayed Maghrib as soon as the sun had set and disappeared.'],
          ['Sahih Muslim 612', 'The time of Maghrib lasts until the twilight has gone. The Hanafi and Hanbali schools follow this; the Maliki school gives Maghrib a short time.'],
          ['Abu Dawud 418', 'My community will remain upon good as long as they do not delay Maghrib until the stars appear.'],
        ],
        j: [
          [MLYF + ', hadith 10', 'Imam al-Baqir: the time of Maghrib begins when the disk of the sun has disappeared.'],
          ['Wasa’il al-Shi‘a, chapter on the start of Maghrib', 'Sunset is known by the redness leaving the eastern sky, so the Jafari school waits a few minutes after sunset.'],
          [MLYF + ', hadith 16', 'Imam al-Sadiq condemned delaying Maghrib until the stars appear.'],
          [MLYF + ', hadith 18', 'Imam al-Sadiq: at sunset the fast may be broken and Maghrib is due, and the time of Isha follows until midnight.'],
        ],
      },
      virtue: {
        s: [
          ['Abu Dawud 418', 'Praying Maghrib on time keeps the community upon good.'],
          ['Sahih Muslim 728, Tirmidhi 415', 'The 2 sunnah rak‘ahs after Maghrib are among the twelve daily rak‘ahs that build a house in Paradise.'],
        ],
        j: [
          [MLYF + ', hadith 20', 'Imam al-Sadiq: two rak‘ahs prayed after Maghrib are recorded in the highest ranks, and four bring a reward like an accepted Hajj.'],
        ],
      },
      prayer: {
        s: [
          ['', '3 fard rak‘ahs, never shortened when travelling, with 2 sunnah rak‘ahs after.'],
          ['Sahih al-Bukhari 1183', 'Pray before Maghrib, for whoever wishes: 2 short voluntary rak‘ahs are allowed after the adhan.'],
        ],
        j: [
          ['', '3 obligatory rak‘ahs, never shortened when travelling, with 4 nafilah rak‘ahs after.'],
          [W46, 'The daily prayers are 51 rak‘ahs, 17 obligatory and 34 nafilah.'],
        ],
      },
    },
    isha: {
      time: {
        s: [
          ['Sahih Muslim 612', 'The time of Isha lasts until the middle of the night.'],
          ['Sahih Muslim 638, Tirmidhi 167', 'Were it not hard on my community, I would have them delay Isha to a third of the night.'],
          ['Sahih Muslim 681', 'Negligence is delaying a prayer until the next one is due. Most scholars hold that Isha stays valid until Fajr, though it is best before midnight.'],
          ['', 'Most scholars start Isha when the red twilight has gone; Abu Hanifa held it starts when the white twilight has gone, which is later.'],
        ],
        j: [
          [MLYF + ', hadith 13', 'One narration gives the time of Isha until a third of the night.'],
          [MLYF + ', hadith 18', 'The time of Isha lasts until midnight.'],
          [MLYF + ', hadith 14', 'Whoever sleeps past midnight without praying Isha makes it up, and fasts the next day.'],
        ],
      },
      virtue: {
        s: [
          ['Sahih Muslim 656', 'Whoever prays Isha in congregation, it is as if he prayed half the night.'],
          ['Sahih al-Bukhari 657, Sahih Muslim 651', 'The heaviest prayers on the hypocrites are Isha and Fajr; if they knew their reward, they would come even crawling.'],
          ['Sahih al-Bukhari 568', 'The Prophet ﷺ disliked sleeping before Isha and talking after it.'],
        ],
        j: [
          [MLYF + ', hadith 19', 'Imam al-Baqir warned that an angel curses whoever leaves Isha until after midnight.'],
        ],
      },
      prayer: {
        s: [
          ['', '4 fard rak‘ahs, with 2 sunnah rak‘ahs after, then Witr.'],
          ['Abu Dawud 1422', 'Witr is a duty. The Hanafi school holds Witr wajib, 3 rak‘ahs.'],
          ['Sahih Muslim 752', 'Witr is one rak‘ah at the end of the night. The Shafi‘i, Maliki and Hanbali schools hold it sunnah, at least 1 rak‘ah.'],
          ['Sahih al-Bukhari 998, Sahih Muslim 751', 'Make Witr the last of your prayers at night.'],
        ],
        j: [
          ['', '4 obligatory rak‘ahs, with 2 nafilah rak‘ahs after, prayed sitting.'],
          [W46, 'Imam al-Sadiq: the 2 nafilah rak‘ahs prayed sitting after Isha count as one.'],
        ],
      },
    },
    ishraq: {
      time: {
        s: [
          ['Sahih Muslim 831, 832', 'Do not pray while the sun is rising until it has risen high, which is why Ishraq starts about 15 minutes after sunrise.'],
          ['', 'Many scholars count Ishraq as the early part of the Duha time.'],
        ],
        j: [['', 'The Jafari school has no separate Ishraq prayer. Recommended prayers may be offered once the sun has risen.']],
      },
      virtue: {
        s: [['Tirmidhi 586', 'Whoever prays Fajr in congregation, sits remembering Allah until the sun rises, then prays two rak‘ahs, has a reward like that of Hajj and Umrah. Al-Tirmidhi graded it hasan gharib; some scholars consider it weak.']],
        j: [['', 'No narration on a separate Ishraq prayer is relied on in the Jafari school.']],
      },
      prayer: {
        s: [['', '2 rak‘ahs, or 4.']],
        j: [['', 'No separate Ishraq prayer.']],
      },
    },
    chasht: {
      time: {
        s: [
          ['Sahih Muslim 748', 'The prayer of the oft-returning (awwabin) is when the young camels feel the heat of the sun: the best time for Duha, about a quarter of the day.'],
          ['Sahih Muslim 831', 'Do not pray when the sun is at its highest until it passes the meridian, so Duha ends shortly before Dhuhr.'],
        ],
        j: [['', 'Narrations from the Imams of Ahl al-Bayt describe the Duha prayer as an innovation, so the Jafari school does not count it among the recommended prayers.']],
      },
      virtue: {
        s: [
          ['Sahih Muslim 720', 'Charity is due on every joint each morning, and two rak‘ahs of Duha are enough for it.'],
          ['Sahih al-Bukhari 1981, Sahih Muslim 721', 'Abu Hurayra: my friend ﷺ advised me to fast three days each month, pray two rak‘ahs of Duha, and pray Witr before sleeping.'],
        ],
        j: [['', 'Not counted among the recommended prayers in the Jafari school.']],
      },
      prayer: {
        s: [
          ['', 'At least 2 rak‘ahs.'],
          ['Sahih Muslim 719', 'Aisha: he ﷺ prayed Duha four rak‘ahs, and more as Allah willed.'],
          ['Sahih al-Bukhari 1176, Sahih Muslim 336', 'Umm Hani: on the day Makkah was conquered he ﷺ prayed eight rak‘ahs in the forenoon.'],
        ],
        j: [['', 'Not prayed as a separate prayer in the Jafari school.']],
      },
    },
    awwabin: {
      time: {
        s: [
          ['Quran 32:16, 51:17; Abu Dawud 1322', 'Anas explained these verses about those who pray at night: they used to pray between Maghrib and Isha.'],
          ['Sahih Muslim 748', 'In this hadith the name “prayer of the awwabin” is used for Duha; many scholars use it for the prayers between Maghrib and Isha.'],
        ],
        j: [
          ['Thawab al-A‘mal, p. 115', 'The hour of heedlessness is between Maghrib and Isha (Salat al-Ghufayla).'],
          ['al-‘Urwa al-Wuthqa, vol. 2, p. 246', 'Ghufayla is prayed after Maghrib, before the redness leaves the western sky.'],
        ],
      },
      virtue: {
        s: [['Tirmidhi 435', 'Six rak‘ahs after Maghrib equal twelve years of worship. Al-Tirmidhi and others graded this narration very weak.']],
        j: [
          ['Thawab al-A‘mal, p. 115', 'The Prophet ﷺ: pray in the hour of heedlessness, even two rak‘ahs, for they lead to Paradise.'],
          ['Wasa’il al-Shi‘a, vol. 8, p. 121', 'Imam al-Sadiq: whoever prays these two rak‘ahs between Maghrib and Isha and then asks Allah, He gives him what he asks.'],
        ],
      },
      prayer: {
        s: [['', 'Commonly 6 rak‘ahs in pairs after the sunnah of Maghrib; the number rests on the weak narration above.']],
        j: [['al-‘Urwa al-Wuthqa, vol. 2, pp. 246-247', '2 rak‘ahs: after al-Fatihah, recite Quran 21:87-88 in the first and Quran 6:59 in the second.']],
      },
    },
    tahajjud: {
      time: {
        s: [
          ['Sahih al-Bukhari 1145, Sahih Muslim 758', 'Our Lord descends to the lowest heaven when the last third of the night remains, and says: who will call on Me, that I may answer him?'],
          ['Sahih al-Bukhari 1131, Sahih Muslim 1159', 'The prayer most loved by Allah is the prayer of Dawud: he slept half the night, prayed a third and slept a sixth.'],
          ['Quran 73:20', 'Your Lord knows that you stand nearly two thirds of the night, or half of it, or a third.'],
        ],
        j: [['Man La Yahduruhu al-Faqih, vol. 1, chapter on the time of the night prayer', 'The Prophet ﷺ prayed nothing after Isha until midnight; Salat al-Layl is from midnight until dawn, best near dawn.']],
      },
      virtue: {
        s: [
          ['Quran 17:79', 'And in part of the night, pray Tahajjud as an extra prayer for you; perhaps your Lord will raise you to a praised station.'],
          ['Quran 51:17-18', 'They used to sleep little of the night, and before dawn they asked forgiveness.'],
          ['Quran 32:16', 'Their sides forsake their beds as they call on their Lord in fear and hope.'],
          ['Sahih Muslim 1163', 'The best prayer after the obligatory prayers is the prayer at night.'],
        ],
        j: [
          ['Quran 17:79', 'And in part of the night, pray Tahajjud as an extra prayer for you; perhaps your Lord will raise you to a praised station.'],
          ['Quran 73:1-4', 'Stand in prayer at night, half of it or a little less or more, and recite the Quran slowly.'],
        ],
      },
      prayer: {
        s: [
          ['Sahih al-Bukhari 990, Sahih Muslim 749', 'The night prayer is two by two, and when you fear dawn, pray one rak‘ah of Witr.'],
          ['Sahih al-Bukhari 1147, Sahih Muslim 738', 'Aisha: he ﷺ did not pray more than eleven rak‘ahs at night, in Ramadan or at other times.'],
        ],
        j: [
          ['', '11 rak‘ahs: 8, then 2 (shaf‘), then 1 (witr).'],
          [W46, 'The daily prayers are 51 rak‘ahs, 17 obligatory and 34 nafilah, the night prayer among them.'],
        ],
      },
    },
  },
};

if (typeof module === 'object' && module.exports) module.exports = { REFS: { en: EN }, REF_KEYS: ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha', 'ishraq', 'chasht', 'awwabin', 'tahajjud'] };
