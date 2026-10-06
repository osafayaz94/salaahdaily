'use strict';
// More Fajr references and the adhkar after Fajr (merged into src/prayer-refs.js items.fajr by build.js).
// Same keys in every language: add = extra items per section; azkar = new section; azkarH = its heading.
var D = require('./_dhikr');
var W = 'Wasa’il al-Shi‘a, vol. 4, p. 1024; Man La Yahduruhu al-Faqih, vol. 1, p. 320';
module.exports = {
  azkarH: 'Adhkar after {prayer}',
  add: {
    time: [
      ['Sahih al-Bukhari 617, Sahih Muslim 1092', 'Bilal calls the adhan while it is still night, so eat and drink until Ibn Umm Maktum calls it: the first light is not Fajr until the true dawn spreads.'],
    ],
    virtue: [
      ['Sahih al-Bukhari 555, Sahih Muslim 632', 'Angels of the night and of the day take turns among you and meet at Fajr and Asr. Allah asks how they left His servants, and they say: we left them praying and found them praying.'],
      ['Sahih al-Bukhari 554, Sahih Muslim 633', 'You will see your Lord as you see this full moon, so do not let anything keep you from the prayers before sunrise and before sunset.'],
      ['Sahih Muslim 634', 'Whoever prays before sunrise and before sunset (Fajr and Asr) will not enter the Fire.'],
    ],
    prayer: [
      ['Sahih Muslim 726', 'In the two sunnah rak‘ahs before Fajr he ﷺ recited al-Kafirun and al-Ikhlas.'],
      ['Sahih al-Bukhari 1160', 'After the two sunnah rak‘ahs of Fajr he ﷺ would lie down on his right side.'],
      ['Sahih al-Bukhari 891, Sahih Muslim 879', 'On Fridays he ﷺ recited Surah as-Sajdah and Surah al-Insan in Fajr.'],
      ['Sahih al-Bukhari 1002', 'Anas: the Prophet ﷺ usually said qunut before bowing; he said it after bowing for one month only, during a calamity.'],
      ['Sahih al-Bukhari 597, Sahih Muslim 684', 'Whoever forgets a prayer or sleeps through it should pray it as soon as he remembers; there is no other expiation.'],
      ['Sahih al-Bukhari 1144', 'Of a man who slept until morning without praying, the Prophet ﷺ said: Satan urinated in his ears.'],
    ],
  },
  azkar: {
    s: [
      ['Sahih Muslim 591', D.istighfar + ' (3 times), then: ' + D.salam + ' (O Allah, You are Peace and from You is peace; blessed are You, Owner of majesty and honour).'],
      ['Sahih al-Bukhari 844, Sahih Muslim 593', D.tahlil + '. ' + D.mani + ' (None can withhold what You give, none can give what You withhold, and no one’s wealth avails him against You).'],
      ['Sahih Muslim 597', D.subhan + ' 33 times, ' + D.hamd + ' 33 times, ' + D.akbar + ' 33 times, and to complete 100: ' + D.tahlil + '. His sins are forgiven even if they are like the foam of the sea.'],
      ['an-Nasa’i, as-Sunan al-Kubra 9848', 'Ayat al-Kursi (Quran 2:255) after every obligatory prayer: nothing but death stands between him and Paradise. Ibn Hibban graded it sahih.'],
      ['Tirmidhi 3474', 'After Fajr, still sitting and before speaking, 10 times: ' + D.tahlil10 + '. Ten good deeds are written, ten sins erased, ten ranks raised, and he is protected that day. Al-Tirmidhi graded it hasan gharib.'],
      ['Ibn Majah 925', 'After the salam of Fajr: ' + D.ilm + ' (O Allah, I ask You for beneficial knowledge, good provision and accepted deeds).'],
      ['Sahih Muslim 2723', 'In the morning: ' + D.asbahna + ' (We have entered the morning and the dominion belongs to Allah; praise be to Allah; there is no god but Allah alone, without partner).'],
      ['Tirmidhi 3391', 'In the morning: ' + D.bika + ' (O Allah, by You we enter the morning and the evening, by You we live and die, and to You is the return).'],
      ['Sahih al-Bukhari 6306', 'Sayyid al-Istighfar: ' + D.sayyid + '. Whoever says it in the day with certainty and dies before evening is among the people of Paradise.'],
      ['Abu Dawud 5088', '3 times in the morning and evening: ' + D.bismillah + ' (In the name of Allah, with whose name nothing on earth or in heaven can harm). No sudden affliction will strike him.'],
      ['Abu Dawud 5082', 'Al-Ikhlas, al-Falaq and an-Nas, 3 times each, morning and evening: they will suffice you against everything.'],
      ['Sahih Muslim 2692', D.bihamdihi + ' 100 times, morning and evening: no one brings anything better on the Day of Resurrection except one who said the same or more.'],
    ],
    j: [
      [W, 'Tasbih of Fatimah al-Zahra after every prayer, before changing position: ' + D.akbar + ' 34 times, ' + D.hamd + ' 33 times, ' + D.subhan + ' 33 times. Imam al-Sadiq: dearer to me than a thousand rak‘ahs of prayer every day.'],
      ['Sahih al-Bukhari 3113', 'The Prophet ﷺ taught Fatimah and Ali these same 34, 33 and 33 at bedtime, as better for them than a servant.'],
      ['', 'Ayat al-Kursi (Quran 2:255) and the prostration of thanks (sajdat al-shukr) are among the common ta‘qibat after every prayer in the Jafari school.'],
    ],
  },
};
