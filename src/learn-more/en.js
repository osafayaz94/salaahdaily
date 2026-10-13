'use strict';
/*
 * Extra sections for the Wudu and Five Prayers (/prayers/rakahs/) pages, same shape in every language.
 * Sources use {B} Sahih al-Bukhari, {M} Sahih Muslim, {Q} Quran, {sep} the list separator; build.js fills them from `names`
 * (and writes the digits in the language's own numerals where `digits` is set).
 * Hadith numbers follow sunnah.com and were checked there on 14 Oct 2026; the Quran verse texts are plain translations.
 */
module.exports = {
  names: { B: 'Sahih al-Bukhari', M: 'Sahih Muslim', Q: 'Quran', sep: ', ', sp: ' ', digits: '' },
  wudu: {
    sunnahH: 'Recommended acts in wudu',
    sunnah: [
      ['{B} 887{sep}{M} 252', 'Use the siwak (toothstick). The Prophet ﷺ said that if it were not hard on his followers, he would have ordered it before every prayer.'],
      ['{B} 168{sep}{M} 268', 'Start with the right side. Aisha said the Prophet ﷺ liked to begin on the right when purifying himself.'],
      ['{B} 201{sep}{M} 325', 'Do not waste water. The Prophet ﷺ used to perform wudu with about one mudd of water, roughly what two cupped hands hold.'],
      ['{M} 246', 'Your faces, hands and feet will shine on the Day of Resurrection because of your wudu.'],
    ],
    socksH: 'Wiping over socks',
    socksP: 'The Sunni schools allow wiping over leather socks (khuffs) instead of washing the feet, and the Prophet ﷺ did so. In the hadith of Ali the limit is one day and one night for a resident and three days and three nights for a traveller. The schools differ on the conditions, and the Maliki school is known for not fixing a time limit. The Jafari school does not allow it in ordinary circumstances, so follow your school.',
    socksRefs: [
      ['{B} 203', 'Al-Mughira ibn Shu‘ba saw the Prophet ﷺ perform wudu and wipe over his khuffs.'],
      ['{M} 276', 'Ali: the Messenger of Allah ﷺ set three days and three nights for a traveller and one day and one night for a resident.'],
    ],
    tayH: 'When there is no water: tayammum',
    tayP: 'If there is no water, or using it would harm you, the Quran allows tayammum: wiping the face and hands with clean earth. It stands in for wudu, and for the full bath when that is needed. The details, such as how far up the arms to wipe, differ by school.',
    tay: [
      'Make the intention and say Bismillah.',
      'Strike both palms lightly on clean earth, sand or a dusty surface.',
      'Blow or shake off the extra dust.',
      'Wipe the face once, then the hands.',
    ],
    tayRefs: [
      ['{Q} 5:6', 'If you do not find water, then seek clean earth and wipe your faces and hands with it.'],
      ['{B} 338', 'Ammar ibn Yasir: the Prophet ﷺ struck the earth lightly with his hands, blew off the dust, and wiped his face and hands.'],
    ],
    duaH: 'What to say after wudu',
    duaP: 'When you have finished, say the testimony of faith. The Prophet ﷺ said that the eight gates of Paradise are opened for the one who does, to enter by whichever he wishes.',
    duaTr: 'I testify that there is no god but Allah, and that Muhammad is the servant of Allah and His Messenger.',
    duaRefs: [['{M} 234', 'Whoever performs wudu well and then says the testimony of faith, the eight gates of Paradise are opened for him.']],
  },
  rakahs: {
    stepsH: 'How one rak‘ah is prayed',
    stepsP: 'The Prophet ﷺ said, “Pray as you have seen me pray.” When a man prayed too fast, he taught him the steps below.',
    steps: [
      'Stand facing the Qibla and say Allahu Akbar.',
      'Recite al-Fatiha and a part of the Quran.',
      'Bow (ruku) until you are at ease.',
      'Stand up straight again.',
      'Prostrate (sujud) until you are at ease, sit up calmly, then prostrate a second time. That completes one rak‘ah.',
      'Stand for the next rak‘ah and repeat.',
      'Sit for the tashahhud at the end of the prayer, and also after the second rak‘ah in prayers of three or four rak‘ahs. Finish with the salam.',
    ],
    stepsRefs: [
      ['{B} 757{sep}{M} 397', 'A man who prayed too fast was told three times, “Go back and pray, for you have not prayed.” The Prophet ﷺ then taught him: say the takbir, recite from the Quran, bow until at ease, stand, prostrate until at ease, sit, and do the same in every rak‘ah.'],
      ['{B} 631', 'Pray as you have seen me praying.'],
    ],
    fardH: 'The five daily prayers are obligatory',
    fardRefs: [
      ['{Q} 4:103', 'Prayer has been decreed upon the believers at specified times.'],
      ['{B} 46{sep}{M} 11', 'A man asked what Allah has made obligatory for him. The Prophet ﷺ said: the five prayers in the day and night. The man asked if there was anything more, and he said: no, unless you wish to pray voluntarily.'],
    ],
    travelH: 'Shortening the prayer when travelling',
    travelP: 'A traveller prays the four-rak‘ah prayers (Dhuhr, Asr and Isha) as two rak‘ahs. Fajr and Maghrib stay as they are. The distance that counts as a journey and the other conditions differ by school.',
    travelRefs: [['{Q} 4:101', 'When you travel through the land, there is no blame on you for shortening the prayer.']],
    missedH: 'A missed prayer',
    missedP: 'If you forgot a prayer or slept through it, pray it as soon as you remember. The hadith says there is no expiation for it except to pray it.',
    missedRefs: [['{B} 597{sep}{M} 684', 'Whoever forgets a prayer should pray it when he remembers it. There is no expiation for it except that.']],
  },
};
