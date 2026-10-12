'use strict';
/*
 * "About" section on the Islamic date pages (/events/<slug>/): what the day is and how it is observed, with sources.
 * Hadith numbers follow sunnah.com and were checked there on 12 Oct 2026 (gradings as shown there).
 * Where Muslims differ (Mawlid, Shab-e-Barat, Isra and Mi'raj dates), both practices are described without taking a side.
 * Same shape in every language: { h, refsH, items: { <event key>: { p: [paragraphs], refs: [[source, text]] } } }.
 */
module.exports = {
  h: 'About {event}',
  refsH: 'Sources',
  items: {
    ramadan: {
      p: [
        'Fasting in Ramadan is one of the five pillars of Islam. From true dawn (Fajr) until sunset, those who fast leave food, drink and marital relations. The sick, travellers and others with a valid reason may make up the days later.',
        'The month begins and ends with the sighting of the new crescent. Some countries follow a local or national sighting, others the Umm al-Qura calendar or astronomical calculation, so the first day can differ by a day between countries. The nights are spent in extra prayer (Tarawih), and the last ten nights include Laylat al-Qadr.',
      ],
      refs: [
        ['Quran 2:183', 'Fasting is prescribed for you as it was prescribed for those before you, so that you may be mindful of God.'],
        ['Quran 2:185', 'The month of Ramadan is the month in which the Quran was sent down. Whoever is ill or on a journey makes up the same number of other days.'],
        ['Sahih al-Bukhari 1909', 'Start fasting when you see the crescent and stop when you see it. If the sky is overcast, complete thirty days of Sha‘ban.'],
        ['Sahih al-Bukhari 38', 'Whoever fasts Ramadan out of faith and hoping for reward has their past sins forgiven.'],
      ],
    },
    laylatQadr: {
      p: [
        'The Quran names this night in Surah al-Qadr: the Quran was sent down in it, it is better than a thousand months, and the angels descend in it until dawn. Its exact date is not known. The Prophet ﷺ told Muslims to seek it in the odd nights of the last ten nights of Ramadan (the 21st, 23rd, 25th, 27th and 29th), and the 27th is the night most widely observed.',
        'Muslims spend these nights in prayer, Quran recitation and supplication. Aisha asked what to say if she knew which night it was, and was taught: “Allahumma innaka ‘afuwwun tuhibbul ‘afwa fa‘fu ‘anni” (O Allah, You are Pardoning and love to pardon, so pardon me).',
      ],
      refs: [
        ['Quran 97:1-5', 'We sent it down on the Night of Power. The Night of Power is better than a thousand months. In it the angels and the Spirit descend. Peace it is until the rising of dawn.'],
        ['Sahih al-Bukhari 2017', 'Seek the Night of Qadr in the odd nights of the last ten days of Ramadan.'],
        ['Sahih al-Bukhari 1901', 'Whoever stands in prayer on the Night of Qadr out of faith and hoping for reward has their past sins forgiven.'],
        ['Jami‘ at-Tirmidhi 3513 (graded sahih)', 'The supplication Aisha was taught for the Night of Qadr: O Allah, You are Pardoning and love to pardon, so pardon me.'],
      ],
    },
    fitr: {
      p: [
        'Eid al-Fitr, on 1 Shawwal, ends the month of fasting, and fasting on this day is not allowed. Before the Eid prayer, every Muslim who is able gives Zakat al-Fitr for themselves and their dependants, so that people in need can celebrate too.',
        'The Eid prayer is two rak‘ahs in congregation in the morning, followed by a sermon. It is Sunnah to eat something before leaving for the prayer: the Prophet ﷺ ate an odd number of dates.',
      ],
      refs: [
        ['Sahih al-Bukhari 1503', 'Zakat al-Fitr, one sa‘ of dates or barley, is due on every Muslim, young or old, and is to be paid before people go out to the Eid prayer.'],
        ['Sahih al-Bukhari 953', 'The Prophet ﷺ did not go out on the day of Eid al-Fitr until he had eaten some dates, an odd number.'],
        ['Sahih al-Bukhari 1990', 'The Prophet ﷺ forbade fasting on the day you end the fast of Ramadan and on the day you eat from your sacrifice.'],
      ],
    },
    arafah: {
      p: [
        'On 9 Dhul Hijjah pilgrims stand on the plain of Arafat from after midday until sunset. This standing is the heart of the Hajj: the Prophet ﷺ said, “The Hajj is Arafah.”',
        'For those not on Hajj, fasting this day is a recommended Sunnah: the Prophet ﷺ said he hoped it would expiate the sins of the year before and the year after. Muslims also spend the day in supplication and remembrance of God.',
      ],
      refs: [
        ['Jami‘ at-Tirmidhi 889 (graded sahih)', 'The Hajj is Arafah.'],
        ['Sahih Muslim 1162', 'I hope from Allah that fasting on the day of Arafah expiates the sins of the year before it and the year after it.'],
        ['Jami‘ at-Tirmidhi 3585 (graded weak by Darussalam)', 'The best supplication is the supplication of the day of Arafah.'],
      ],
    },
    adha: {
      p: [
        'Eid al-Adha, on 10 Dhul Hijjah, recalls the Prophet Ibrahim’s readiness to sacrifice his son at God’s command, and the ram given in his place. It falls during the Hajj, on the day the pilgrims offer their sacrifice.',
        'After the morning Eid prayer, those who can afford it sacrifice a sheep, goat, cow or camel (qurbani or udhiyah) and share the meat with family, neighbours and people in need. The sacrifice can be made on Eid day and the days that follow; the schools differ on whether the last day is 12 or 13 Dhul Hijjah. The days of Tashriq (11 to 13 Dhul Hijjah) are days of eating and drinking, and fasting on them is not allowed.',
      ],
      refs: [
        ['Quran 37:102-107', 'Ibrahim told his son of his dream that he was sacrificing him, and both submitted to God’s will. And We ransomed him with a great sacrifice.'],
        ['Sahih al-Bukhari 5545', 'The first thing we do on this day of ours is pray, then return and sacrifice. Whoever does so has followed our Sunnah.'],
        ['Sahih Muslim 1141', 'The days of Tashriq are days of eating and drinking.'],
        ['Sahih al-Bukhari 1990', 'The Prophet ﷺ forbade fasting on the day you end the fast of Ramadan and on the day you eat from your sacrifice.'],
      ],
    },
    newYear: {
      p: [
        '1 Muharram begins the Islamic (Hijri) year. The calendar counts from the Hijrah, the Prophet’s migration from Makkah to Madinah in 622 CE, and was adopted under the Caliph Umar ibn al-Khattab. It is a lunar calendar, so each year is about 11 days shorter than the solar year and the months move through the seasons.',
        'Muharram is one of the four sacred months named in the Quran. There is no special prayer for the new year, but fasting in Muharram is praised: the Prophet ﷺ called it the best fasting after Ramadan.',
      ],
      refs: [
        ['Quran 9:36', 'The number of months with God is twelve in the Book of God, since the day He created the heavens and the earth; four of them are sacred.'],
        ['Sahih Muslim 1163', 'The best fasting after Ramadan is in God’s month, al-Muharram.'],
      ],
    },
    ashura: {
      p: [
        'Ashura is 10 Muharram. When the Prophet ﷺ came to Madinah, he found the Jews fasting this day because God saved Moses and the Children of Israel on it. He fasted it and told Muslims to fast it, and he intended to fast the 9th as well, so many Muslims fast the 9th and 10th.',
        'Ashura is also the day Imam Husayn, the grandson of the Prophet ﷺ, was killed at Karbala in 61 AH (680 CE). Shia Muslims mark it with gatherings of mourning (majalis) and processions, and Muslims of every school remember his sacrifice.',
      ],
      refs: [
        ['Sahih al-Bukhari 2004', 'The Prophet ﷺ found the Jews of Madinah fasting on Ashura, the day God saved Moses. He said, “We have more claim to Moses than you,” fasted it and told the Muslims to fast it.'],
        ['Sahih Muslim 1162', 'I hope from Allah that fasting on the day of Ashura expiates the sins of the year before it.'],
        ['Sahih Muslim 1134', 'If I live until next year, I will also fast the 9th.'],
      ],
    },
    mawlid: {
      p: [
        'The Prophet Muhammad ﷺ was born in Makkah in Rabi al-Awwal, in the Year of the Elephant (around 570 CE). 12 Rabi al-Awwal is the most widely used date, and many Shia Muslims mark 17 Rabi al-Awwal. Asked about fasting on Mondays, he said, “That is the day I was born.”',
        'Many Muslims mark the day with gatherings, readings from his life (sirah), salawat and charity. Others, including many scholars, hold that the early generations did not observe it and do not celebrate it. Both stress love for the Prophet ﷺ and following his Sunnah.',
      ],
      refs: [
        ['Sahih Muslim 1162', 'Asked about fasting on Monday, the Prophet ﷺ said: That is the day I was born, and the day revelation came to me.'],
        ['Quran 21:107', 'We have sent you only as a mercy to the worlds.'],
      ],
    },
    israMiraj: {
      p: [
        'The Isra was the Prophet’s night journey from al-Masjid al-Haram in Makkah to al-Masjid al-Aqsa in Jerusalem. The Mi‘raj was his ascension through the heavens, where he met earlier prophets. The five daily prayers were prescribed on this night: first fifty, reduced to five.',
        'The Quran and the hadith do not give the date. 27 Rajab is the date most widely observed, and other dates are also reported. Some Muslims mark the night with worship and lectures, while others do not single it out.',
      ],
      refs: [
        ['Quran 17:1', 'Glory be to Him who took His servant by night from al-Masjid al-Haram to al-Masjid al-Aqsa, whose surroundings We have blessed.'],
        ['Sahih al-Bukhari 349', 'The Prophet ﷺ described his ascension and meeting Adam, Idris, Moses, Jesus and Abraham; fifty prayers were enjoined and reduced to five.'],
      ],
    },
    shabBarat: {
      p: [
        'Shab-e-Barat (Laylat al-Bara’ah, Nisf Sha‘ban) is the night before 15 Sha‘ban. A hadith says that on this night Allah looks to His creation and forgives everyone except one who associates partners with Him or holds enmity. Its grading is disputed: some grade it weak, while other scholars accept it through its several chains.',
        'Many Muslims, especially in South and Southeast Asia, spend the night in prayer and remembrance and fast the next day, while others do not single it out. The Prophet ﷺ fasted more in Sha‘ban than in any month except Ramadan. Many Shia Muslims also mark 15 Sha‘ban as the birth of Imam Muhammad al-Mahdi.',
      ],
      refs: [
        ['Sunan Ibn Majah 1390 (graded weak by Darussalam)', 'Allah looks down on the night of the middle of Sha‘ban and forgives all His creation except the idolater and the one who holds enmity.'],
        ['Sahih al-Bukhari 1969', 'Aisha: I never saw him fast a whole month except Ramadan, and I never saw him fast more in any month than in Sha‘ban.'],
      ],
    },
  },
};
