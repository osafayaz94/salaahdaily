'use strict';
/*
 * Fasting guide (/fasting/): the obligatory fast of Ramadan and the recommended (Sunnah) fasts by week, month and
 * Islamic month, the days not to fast, and the next White Days with their dates (computed in build.js).
 * Hadith numbers follow sunnah.com, checked there on 12 Oct 2026 with the gradings shown there.
 * months: one line per Hijri month (index 0 = Muharram); '' leaves the month out of the table.
 * Same shape in every language (src/fasting/<lang>.js).
 */
module.exports = {
  tab: 'Fasting',
  title: 'Islamic Fasting Days: Ramadan and Sunnah Fasts | SalaahDaily',
  h1: 'Fasting in Islam: Ramadan and the Sunnah Fasting Days',
  desc: 'When Muslims fast: Ramadan, Mondays and Thursdays, the White Days (13, 14, 15), six days of Shawwal, Arafah and Ashura, month by month, with the Quran and hadith, and the days not to fast.',
  lede: 'Fasting (sawm) means leaving food, drink and marital relations from true dawn until sunset with the intention of fasting for God. Ramadan is obligatory; the other fasts below are Sunnah, recommended by the Prophet ﷺ.',
  upcomingH: 'Next White Days (13, 14 and 15 of each Islamic month)',
  colHijri: 'Islamic month',
  colDates: 'Dates',
  upcomingNote: 'Dates follow the Umm al-Qura calendar; where the month starts on local moon sighting they can move by one day.',
  sections: [
    {
      h: 'Ramadan: the obligatory fast',
      p: [
        'Fasting the whole month of Ramadan is one of the five pillars of Islam, due on every adult Muslim who is able. The sick and travellers make up the missed days later, and those who cannot fast at all because of old age or lasting illness feed a poor person for each day.',
        'The month starts and ends with the sighting of the new crescent. Each fast begins at Fajr and ends at Maghrib (sunset).',
      ],
      refs: [
        ['Quran 2:183', 'Fasting is prescribed for you as it was prescribed for those before you, so that you may be mindful of God.'],
        ['Quran 2:184-185', 'Whoever is ill or on a journey makes up the same number of other days; for those who can fast only with great hardship, a ransom: feeding a poor person.'],
        ['Sahih al-Bukhari 1909', 'Start fasting when you see the crescent and stop when you see it. If the sky is overcast, complete thirty days of Sha‘ban.'],
        ['Sahih al-Bukhari 38', 'Whoever fasts Ramadan out of faith and hoping for reward has their past sins forgiven.'],
        ['Sahih al-Bukhari 1904', 'Allah said: Every deed of the son of Adam is for him except fasting; it is for Me and I reward it. Fasting is a shield.'],
      ],
    },
    {
      h: 'Suhoor and iftar',
      p: [
        'The pre-dawn meal (suhoor or sehri) is a Sunnah with blessing in it, and it ends when Fajr begins. The fast is broken (iftar) as soon as the sun has set, and hastening it is Sunnah.',
      ],
      refs: [
        ['Quran 2:187', 'Eat and drink until the white thread of dawn becomes distinct from the black thread, then complete the fast until night.'],
        ['Sahih al-Bukhari 1923', 'Take suhoor, for there is blessing in it.'],
        ['Sahih al-Bukhari 1957', 'People will remain on the right path as long as they hasten to break the fast.'],
      ],
    },
    {
      h: 'Every week: Monday and Thursday',
      p: [
        'The Prophet ﷺ used to fast on Mondays and Thursdays. He said deeds are presented on these two days and he liked his deeds to be presented while he was fasting, and of Monday he said it was the day he was born.',
      ],
      refs: [
        ['Jami‘ at-Tirmidhi 747 (graded hasan)', 'Deeds are presented on Monday and Thursday, and I love that my deeds are presented while I am fasting.'],
        ['Sahih Muslim 1162', 'Asked about fasting on Monday, he said: That is the day I was born, and the day revelation came to me.'],
      ],
    },
    {
      h: 'Every month: three days, the White Days',
      p: [
        'Fasting three days in every month is like fasting all year, because each good deed is rewarded tenfold. The Prophet ﷺ named the 13th, 14th and 15th of the Islamic month, the "White Days" (Ayyam al-Bid) when the moon is full, though he also fasted three days at other points of the month.',
        'In the Jafari school, the recommended three days are the first Thursday of the month, the first Wednesday of its middle ten days and its last Thursday.',
      ],
      refs: [
        ['Sunan an-Nasa’i 2420 (graded sahih)', 'Fasting three days of each month is fasting for a lifetime, and the White Days are the 13th, 14th and 15th.'],
        ['Jami‘ at-Tirmidhi 761 (graded hasan)', 'O Abu Dharr, when you fast three days of a month, fast the 13th, 14th and 15th.'],
        ['Sahih al-Bukhari 1976', 'Fast three days a month, for each good deed is rewarded ten times, and that equals fasting the whole year.'],
        ['Sahih al-Bukhari 1981', 'Abu Hurayra: my friend ﷺ advised me to fast three days every month, pray two rak‘ahs of Duha and pray Witr before sleeping.'],
        ['Sahih Muslim 1160', 'Aisha said he fasted three days every month and did not mind which days of the month he fasted.'],
      ],
    },
    {
      h: 'The fast of Dawud: every other day',
      p: [
        'The most a person can fast as Sunnah is one day on and one day off, the fast of the Prophet Dawud (David). The Prophet ﷺ did not allow fasting every day without a break.',
      ],
      refs: [
        ['Sahih al-Bukhari 1131', 'The most beloved fasting to Allah is the fasting of Dawud: he fasted on alternate days.'],
        ['Sahih al-Bukhari 1976', 'Fast one day and leave one day: that is the fasting of Dawud, and there is no better fasting than that.'],
        ['Sahih Muslim 1162', 'Asked about someone who fasts every day, he said: He has neither fasted nor broken his fast.'],
      ],
    },
  ],
  monthsH: 'Fasting days month by month',
  monthsLede: 'The Islamic months with fasts the Sunnah names in them. In every month, three days (best the 13th to 15th) and Mondays and Thursdays are also recommended.',
  colMonth: 'Month',
  colFast: 'Recommended fasting',
  colSource: 'Source',
  months: [
    ['The best fasting after Ramadan. Ashura (10th) with the 9th; in the Jafari school fasting on Ashura is discouraged, and many abstain from food until the afternoon in mourning instead.', 'Sahih Muslim 1163, 1162, 1134; Sahih al-Bukhari 2004'],
    '', '', '', '', '',
    ['A sacred month. Many Muslims fast in it, and the Jafari school especially recommends it; no authentic hadith singles out a particular day of Rajab.', 'Quran 9:36'],
    ['The Prophet ﷺ fasted more in Sha‘ban than in any month after Ramadan. Do not start fasting a day or two before Ramadan unless it is a fast you keep regularly.', 'Sahih al-Bukhari 1969, 1914'],
    ['The whole month, obligatory.', 'Quran 2:183-185'],
    ['Six days after Eid al-Fitr, together or apart: with Ramadan, like fasting the whole year. Not on the day of Eid.', 'Sahih Muslim 1164; Sahih al-Bukhari 1990'],
    ['A sacred month, with the usual monthly and weekly fasts.', 'Quran 9:36'],
    ['The first nine days, above all the Day of Arafah (9th), which expiates two years. Not on Eid al-Adha (10th) or the days of Tashriq (11th to 13th).', 'Sahih al-Bukhari 969; Sunan Abi Dawud 2437; Sahih Muslim 1162, 1141'],
  ],
  avoidH: 'Days not to fast',
  avoid: [
    ['Eid al-Fitr (1 Shawwal) and Eid al-Adha (10 Dhul Hijjah)', 'Sahih al-Bukhari 1990'],
    ['The days of Tashriq, 11 to 13 Dhul Hijjah: days of eating and drinking', 'Sahih Muslim 1141'],
    ['Friday on its own, unless you also fast the day before or after it', 'Sahih al-Bukhari 1985'],
    ['A day or two before Ramadan, unless it falls on a fast you keep regularly', 'Sahih al-Bukhari 1914'],
    ['Every day without a break', 'Sahih Muslim 1162'],
  ],
  note: 'Hadith numbers follow sunnah.com. The schools differ on some details; ask a scholar you trust about your own situation.',
  morePagesH: 'Related pages',
};
