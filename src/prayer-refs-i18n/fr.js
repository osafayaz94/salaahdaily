'use strict';
// French: same shape as EN in src/prayer-refs.js.
var MLYF = 'Man La Yahdhuruhu al-Faqih, vol. 1, chapitre des horaires de prière';
var W46 = 'Wasa’il al-Shi‘a, vol. 4, p. 46';
module.exports = {
  label: 'Références',
  title: '{prayer} : Coran et hadiths sur son heure, ses mérites et ses rak‘ats | SalaahDaily',
  h1: '{prayer} : Coran et hadiths',
  desc: 'Les versets et hadiths sur l’heure de la prière de {prayer}, ses mérites et son nombre de rak‘ats, avec les écoles sunnites et l’école chiite (jafarite) côte à côte.',
  lede: 'Références du Coran et des hadiths, avec l’avis sunnite (hanafite, chaféite, malikite, hanbalite) et l’avis chiite (jafarite) côte à côte.',
  sunniH: 'Avis sunnite (hanafite, chaféite, malikite, hanbalite)',
  shiaH: 'Avis chiite (jafarite)',
  timeH: 'L’heure de {prayer}',
  virtueH: 'Les mérites de {prayer}',
  prayerH: 'La prière de {prayer} : rak‘ats',
  note: 'Les numéros de hadith suivent sunnah.com. Les sources jafarites sont citées par livre, volume et chapitre.',
  otherH: 'Références des autres prières',
  items: {
    fajr: {
      time: {
        s: [
          ['Coran 2:187', 'Mangez et buvez jusqu’à ce que se distingue pour vous le fil blanc de l’aube du fil noir. Le Fajr commence à cette aube vraie.'],
          ['Coran 17:78', 'Accomplis la prière … et la récitation de l’aube.'],
          ['Sahih Muslim 612', 'Le temps du Fajr va de l’aube jusqu’au lever du soleil.'],
          ['Abou Daoud 393, Tirmidhi 149', 'Jibril a dirigé le Fajr dès l’aube le premier jour, et quand il faisait clair le second, puis a dit que le temps est entre les deux.'],
          ['Sahih al-Boukhari 578, Sahih Muslim 645', 'Le Prophète ﷺ priait le Fajr quand il faisait encore sombre. Les écoles chaféite, malikite et hanbalite préfèrent le prier tôt.'],
          ['Tirmidhi 154, Abou Daoud 424', 'Priez le Fajr quand la lumière s’est répandue, sa récompense est plus grande. L’école hanafite préfère le prier dans la clarté (isfar).'],
        ],
        j: [
          ['Coran 17:78', 'Accomplis la prière … et la récitation de l’aube.'],
          ['Man La Yahdhuruhu al-Faqih, vol. 1, chapitre de la reconnaissance de l’aube, hadiths 1-2', 'Imam al-Sadiq : l’aube vraie s’étend sur l’horizon comme un fleuve blanc, et non vers le haut comme une queue de loup ; le temps du Fajr commence quand elle s’est étendue et a éclairé le ciel.'],
          [MLYF + ', hadith 6', 'Imam al-Sadiq : prier au début du temps apporte l’agrément d’Allah ; à la fin, seulement Son pardon.'],
        ],
      },
      virtue: {
        s: [
          ['Coran 17:78', 'La récitation de l’aube a des témoins (les anges).'],
          ['Sahih Muslim 657', 'Celui qui prie le Fajr est sous la protection d’Allah.'],
          ['Sahih al-Boukhari 574, Sahih Muslim 635', 'Celui qui prie les deux prières fraîches (Fajr et Asr) entrera au Paradis.'],
          ['Sahih Muslim 656', 'Celui qui prie le Fajr en groupe, c’est comme s’il avait prié toute la nuit.'],
          ['Sahih al-Boukhari 657, Sahih Muslim 651', 'Les prières les plus lourdes pour les hypocrites sont l’Isha et le Fajr ; s’ils savaient leur récompense, ils viendraient même en rampant.'],
        ],
        j: [
          ['Coran 17:78', 'La récitation de l’aube a des témoins (les anges).'],
          [MLYF + ', hadith 7', 'Imam al-Sadiq : prier au premier temps vaut mieux pour le croyant que ses enfants et ses biens.'],
        ],
      },
      prayer: {
        s: [
          ['', '2 rak‘ats obligatoires, précédées de 2 rak‘ats sunna.'],
          ['Sahih Muslim 725', 'Les deux rak‘ats avant le Fajr valent mieux que le monde et tout ce qu’il contient.'],
          ['Sahih al-Boukhari 1169, Sahih Muslim 724', 'Aïcha : il ﷺ n’était assidu à aucune prière surérogatoire autant qu’aux deux rak‘ats avant le Fajr.'],
          ['', 'Qunut : les chaféites et les malikites le récitent au Fajr ; les hanafites et les hanbalites non, sauf en temps de malheur.'],
        ],
        j: [
          ['', '2 rak‘ats obligatoires, précédées de 2 rak‘ats de nafila.'],
          [W46, 'Imam al-Sadiq : les prières du jour font 51 rak‘ats, 17 obligatoires et 34 de nafila ; dans la pratique jafarite, 2 de nafila précèdent le Fajr.'],
          ['', 'Le qunut est récité à la deuxième rak‘a de chaque prière, Fajr compris.'],
        ],
      },
    },
    dhuhr: {
      time: {
        s: [
          ['Coran 17:78', 'Accomplis la prière du déclin du soleil jusqu’à l’obscurité de la nuit.'],
          ['Abou Daoud 393, Tirmidhi 149', 'Jibril a dirigé le Dhuhr quand le soleil a passé le zénith, et le second jour quand l’ombre égalait l’objet.'],
          ['Sahih Muslim 618', 'Le Prophète ﷺ priait le Dhuhr quand le soleil avait passé le zénith.'],
          ['Sahih Muslim 612', 'Le temps du Dhuhr dure jusqu’à ce que l’ombre d’un homme égale sa taille, tant que l’Asr n’est pas venu.'],
          ['Sahih al-Boukhari 533, Sahih Muslim 615', 'Quand la chaleur est forte, retardez le Dhuhr jusqu’à la fraîcheur. C’est pourquoi l’école hanafite retarde le Dhuhr en été.'],
        ],
        j: [
          [MLYF + ', hadiths 1-3', 'Imam al-Sadiq et imam al-Baqir : quand le soleil décline, le temps du Dhuhr et de l’Asr commence ensemble, le Dhuhr d’abord, jusqu’au coucher du soleil.'],
          [MLYF + ', hadith 4', 'Le temps préféré du Dhuhr va jusqu’à deux pieds d’ombre après midi, et celui de l’Asr deux pieds de plus.'],
          [MLYF + ', hadith 27', 'Le Prophète ﷺ a dit au muezzin d’attendre un peu avant le Dhuhr par forte chaleur.'],
          ['Sahih Muslim 705', 'Ibn Abbas : le Prophète ﷺ a regroupé Dhuhr et Asr à Médine, sans peur ni pluie, pour ne pas gêner sa communauté.'],
        ],
      },
      virtue: {
        s: [
          ['Abou Daoud 1269, Tirmidhi 428', 'Celui qui garde quatre rak‘ats avant le Dhuhr et quatre après, Allah l’interdit au Feu.'],
          ['Tirmidhi 478', 'Après le zénith, les portes du ciel s’ouvrent, et le Prophète ﷺ aimait qu’une bonne œuvre de sa part monte à ce moment.'],
        ],
        j: [
          [MLYF + ', hadith 5', 'Imam al-Sadiq : le premier temps de la prière, au déclin du soleil, est le plus aimé d’Allah et le meilleur.'],
        ],
      },
      prayer: {
        s: [
          ['', '4 rak‘ats obligatoires. Hanafite : 4 sunna avant et 2 après. Chaféite et hanbalite : 2 avant et 2 après (4 avant est aussi sunna).'],
          ['Sahih al-Boukhari 1182', 'Aïcha : il ﷺ ne délaissait jamais les quatre rak‘ats avant le Dhuhr.'],
          ['Sahih Muslim 728, Tirmidhi 415', 'Douze rak‘ats de sunna par jour bâtissent une maison au Paradis : dont 4 avant le Dhuhr et 2 après.'],
          ['Sahih al-Boukhari 1180', 'Ibn Omar se souvenait de 2 rak‘ats avant le Dhuhr et 2 après.'],
          ['Coran 62:9', 'Le vendredi, la prière du Joumou‘a (2 rak‘ats après le sermon) remplace le Dhuhr.'],
        ],
        j: [
          ['', '4 rak‘ats obligatoires, précédées de 8 rak‘ats de nafila.'],
          [MLYF + ', hadith 1', 'Imam al-Sadiq : quand le soleil décline, le temps est venu ; prie une fois ta nafila terminée.'],
          [W46, 'Les prières du jour font 51 rak‘ats, 17 obligatoires et 34 de nafila.'],
          ['Coran 62:9', 'Le vendredi, dans l’école jafarite aujourd’hui, le Joumou‘a et le Dhuhr sont tous deux des choix valables.'],
        ],
      },
    },
    asr: {
      time: {
        s: [
          ['Abou Daoud 393, Tirmidhi 149', 'Jibril a dirigé l’Asr quand l’ombre égalait l’objet. Les chaféites, malikites et hanbalites commencent l’Asr alors.'],
          ['Sahih al-Boukhari 557', 'Le temps de l’Asr au coucher du soleil est la plus courte partie du jour. Abou Hanifa en a déduit que l’Asr commence quand l’ombre atteint deux fois l’objet.'],
          ['Sahih Muslim 612', 'Le temps de l’Asr dure jusqu’à ce que le soleil jaunisse.'],
          ['Sahih al-Boukhari 550', 'Le Prophète ﷺ priait l’Asr quand le soleil était encore haut et vif.'],
          ['Sahih Muslim 622', 'Retarder l’Asr jusqu’à ce que le soleil jaunisse est la prière de l’hypocrite.'],
        ],
        j: [
          [MLYF + ', hadith 2', 'Imam al-Sadiq : le temps du Dhuhr et de l’Asr commence ensemble à midi, le Dhuhr avant l’Asr, jusqu’au coucher du soleil.'],
          [MLYF + ', hadith 4', 'Le temps préféré de l’Asr est quand l’ombre a gagné deux pieds de plus après le temps du Dhuhr.'],
          [MLYF + ', hadith 9', 'Imam al-Baqir : prie l’Asr tant que le soleil est encore blanc et clair.'],
        ],
      },
      virtue: {
        s: [
          ['Coran 2:238, Sahih Muslim 627', 'Soyez assidus aux prières, et à la prière médiane. Le Prophète ﷺ a dit que la prière médiane est l’Asr.'],
          ['Sahih al-Boukhari 574, Sahih Muslim 635', 'Celui qui prie les deux prières fraîches (Fajr et Asr) entrera au Paradis.'],
          ['Sahih al-Boukhari 552, Sahih Muslim 626', 'Celui qui manque la prière de l’Asr, c’est comme s’il avait perdu sa famille et ses biens.'],
          ['Sahih al-Boukhari 553', 'Celui qui délaisse la prière de l’Asr, ses œuvres sont perdues.'],
        ],
        j: [
          ['Coran 2:238', 'Soyez assidus aux prières, et à la prière médiane.'],
          [MLYF + ', hadith 9', 'L’imam al-Baqir a averti que celui qui néglige l’Asr est privé de bien au Paradis.'],
        ],
      },
      prayer: {
        s: [
          ['', '4 rak‘ats obligatoires ; 4 avant sont recommandées, sans être appuyées.'],
          ['Abou Daoud 1271, Tirmidhi 430', 'Qu’Allah fasse miséricorde à celui qui prie quatre rak‘ats avant l’Asr.'],
          ['Sahih al-Boukhari 350, Sahih Muslim 685', 'La prière fut d’abord prescrite en deux rak‘ats et l’est restée en voyage ; le voyageur prie donc l’Asr en 2.'],
        ],
        j: [
          ['', '4 rak‘ats obligatoires, précédées de 8 rak‘ats de nafila.'],
          [W46, 'Les prières du jour font 51 rak‘ats, 17 obligatoires et 34 de nafila.'],
          ['Coran 4:101', 'En voyage, il n’y a pas de mal à raccourcir la prière ; l’Asr devient 2 rak‘ats.'],
        ],
      },
    },
    maghrib: {
      time: {
        s: [
          ['Sahih al-Boukhari 561, Sahih Muslim 636', 'Le Prophète ﷺ priait le Maghrib dès que le soleil s’était couché et avait disparu.'],
          ['Sahih Muslim 612', 'Le temps du Maghrib dure jusqu’à la disparition du crépuscule. Les hanafites et hanbalites suivent cela ; l’école malikite donne au Maghrib un temps court.'],
          ['Abou Daoud 418', 'Ma communauté restera dans le bien tant qu’elle ne retardera pas le Maghrib jusqu’à l’apparition des étoiles.'],
        ],
        j: [
          [MLYF + ', hadith 10', 'Imam al-Baqir : le temps du Maghrib commence quand le disque du soleil a disparu.'],
          ['Wasa’il al-Shi‘a, chapitre du début du Maghrib', 'Le coucher se reconnaît à la rougeur qui quitte l’est ; l’école jafarite attend donc quelques minutes après le coucher.'],
          [MLYF + ', hadith 16', 'L’imam al-Sadiq a blâmé le fait de retarder le Maghrib jusqu’à l’apparition des étoiles.'],
          [MLYF + ', hadith 18', 'Imam al-Sadiq : au coucher du soleil, on peut rompre le jeûne et le Maghrib est dû ; le temps de l’Isha suit jusqu’à minuit.'],
        ],
      },
      virtue: {
        s: [
          ['Abou Daoud 418', 'Prier le Maghrib à l’heure garde la communauté dans le bien.'],
          ['Sahih Muslim 728, Tirmidhi 415', 'Les 2 rak‘ats sunna après le Maghrib font partie des douze rak‘ats qui bâtissent une maison au Paradis.'],
        ],
        j: [
          [MLYF + ', hadith 20', 'Imam al-Sadiq : deux rak‘ats après le Maghrib sont inscrites dans les plus hauts rangs, et quatre valent un Hajj accepté.'],
        ],
      },
      prayer: {
        s: [
          ['', '3 rak‘ats obligatoires, jamais raccourcies en voyage, suivies de 2 rak‘ats sunna.'],
          ['Sahih al-Boukhari 1183', 'Priez avant le Maghrib, pour qui le veut : 2 rak‘ats brèves après l’appel sont permises.'],
        ],
        j: [
          ['', '3 rak‘ats obligatoires, jamais raccourcies en voyage, suivies de 4 rak‘ats de nafila.'],
          [W46, 'Les prières du jour font 51 rak‘ats, 17 obligatoires et 34 de nafila.'],
        ],
      },
    },
    isha: {
      time: {
        s: [
          ['Sahih Muslim 612', 'Le temps de l’Isha dure jusqu’au milieu de la nuit.'],
          ['Sahih Muslim 638, Tirmidhi 167', 'Si ce n’était pas pénible pour ma communauté, je leur aurais fait retarder l’Isha jusqu’au tiers de la nuit.'],
          ['Sahih Muslim 681', 'La négligence, c’est retarder une prière jusqu’au temps de la suivante. La plupart des savants tiennent l’Isha pour valable jusqu’au Fajr, mais mieux avant minuit.'],
          ['', 'La plupart des savants commencent l’Isha à la disparition du crépuscule rouge ; Abou Hanifa à celle du crépuscule blanc, plus tardive.'],
        ],
        j: [
          [MLYF + ', hadith 13', 'Un récit donne le temps de l’Isha jusqu’au tiers de la nuit.'],
          [MLYF + ', hadith 18', 'Le temps de l’Isha dure jusqu’à minuit.'],
          [MLYF + ', hadith 14', 'Celui qui dort jusqu’à minuit sans prier l’Isha la rattrape et jeûne le lendemain.'],
        ],
      },
      virtue: {
        s: [
          ['Sahih Muslim 656', 'Celui qui prie l’Isha en groupe, c’est comme s’il avait prié la moitié de la nuit.'],
          ['Sahih al-Boukhari 657, Sahih Muslim 651', 'Les prières les plus lourdes pour les hypocrites sont l’Isha et le Fajr ; s’ils savaient leur récompense, ils viendraient même en rampant.'],
          ['Sahih al-Boukhari 568', 'Le Prophète ﷺ n’aimait pas dormir avant l’Isha ni parler après.'],
        ],
        j: [
          [MLYF + ', hadith 19', 'L’imam al-Baqir a averti qu’un ange maudit celui qui laisse l’Isha au-delà de minuit.'],
        ],
      },
      prayer: {
        s: [
          ['', '4 rak‘ats obligatoires, puis 2 rak‘ats sunna, puis le witr.'],
          ['Abou Daoud 1422', 'Le witr est un devoir. L’école hanafite le tient pour wajib, en 3 rak‘ats.'],
          ['Sahih Muslim 752', 'Le witr est une rak‘a à la fin de la nuit. Pour les chaféites, malikites et hanbalites il est sunna, au moins 1 rak‘a.'],
          ['Sahih al-Boukhari 998, Sahih Muslim 751', 'Faites du witr la dernière de vos prières de la nuit.'],
        ],
        j: [
          ['', '4 rak‘ats obligatoires, suivies de 2 rak‘ats de nafila priées assis.'],
          [W46, 'Imam al-Sadiq : les 2 rak‘ats de nafila priées assis après l’Isha comptent pour une.'],
        ],
      },
    },
    ishraq: {
      time: {
        s: [
          ['Sahih Muslim 831, 832', 'Ne priez pas pendant que le soleil se lève jusqu’à ce qu’il soit haut ; l’Ishraq commence donc environ 15 minutes après le lever.'],
          ['', 'Beaucoup de savants voient l’Ishraq comme le début du temps du Duha.'],
        ],
        j: [['', 'L’école jafarite n’a pas de prière d’Ishraq à part. Les prières recommandées peuvent être faites une fois le soleil levé.']],
      },
      virtue: {
        s: [['Tirmidhi 586', 'Celui qui prie le Fajr en groupe, reste assis à invoquer Allah jusqu’au lever du soleil, puis prie deux rak‘ats, a une récompense semblable à celle d’un Hajj et d’une Omra. Tirmidhi l’a jugé hasan gharib ; certains savants le jugent faible.']],
        j: [['', 'L’école jafarite ne s’appuie sur aucun récit concernant une prière d’Ishraq à part.']],
      },
      prayer: {
        s: [['', '2 rak‘ats, ou 4.']],
        j: [['', 'Pas de prière d’Ishraq à part.']],
      },
    },
    chasht: {
      time: {
        s: [
          ['Sahih Muslim 748', 'La prière des repentants (awwabin) est quand les jeunes chamelons sentent la chaleur : le meilleur temps du Duha, vers le quart du jour.'],
          ['Sahih Muslim 831', 'Ne priez pas quand le soleil est au plus haut jusqu’à ce qu’il décline ; le Duha se termine donc peu avant le Dhuhr.'],
        ],
        j: [['', 'Des récits des imams de la famille du Prophète qualifient la prière du Duha d’innovation ; l’école jafarite ne la compte donc pas parmi les prières recommandées.']],
      },
      virtue: {
        s: [
          ['Sahih Muslim 720', 'Chaque matin, une aumône est due pour chaque articulation, et deux rak‘ats de Duha y suffisent.'],
          ['Sahih al-Boukhari 1981, Sahih Muslim 721', 'Abou Hourayra : mon ami ﷺ m’a recommandé de jeûner trois jours par mois, de prier deux rak‘ats de Duha et de faire le witr avant de dormir.'],
        ],
        j: [['', 'Ne fait pas partie des prières recommandées dans l’école jafarite.']],
      },
      prayer: {
        s: [
          ['', 'Au moins 2 rak‘ats.'],
          ['Sahih Muslim 719', 'Aïcha : il ﷺ priait le Duha en quatre rak‘ats, et plus selon ce qu’Allah voulait.'],
          ['Sahih al-Boukhari 1176, Sahih Muslim 336', 'Oumm Hani : le jour de la conquête de La Mecque, il ﷺ a prié huit rak‘ats dans la matinée.'],
        ],
        j: [['', 'N’est pas priée comme une prière à part dans l’école jafarite.']],
      },
    },
    awwabin: {
      time: {
        s: [
          ['Coran 32:16, 51:17 ; Abou Daoud 1322', 'Anas a expliqué ces versets sur ceux qui prient la nuit : ils priaient entre le Maghrib et l’Isha.'],
          ['Sahih Muslim 748', 'Dans ce hadith, le nom « prière des awwabin » désigne le Duha ; beaucoup de savants l’emploient pour les prières entre le Maghrib et l’Isha.'],
        ],
        j: [
          ['Thawab al-A‘mal, p. 115', 'L’heure de l’insouciance est entre le Maghrib et l’Isha (prière de Ghufayla).'],
          ['al-‘Urwa al-Wuthqa, vol. 2, p. 246', 'La Ghufayla se prie après le Maghrib, avant que la rougeur ne quitte l’ouest.'],
        ],
      },
      virtue: {
        s: [['Tirmidhi 435', 'Six rak‘ats après le Maghrib équivalent à douze ans d’adoration. Tirmidhi et d’autres ont jugé ce récit très faible.']],
        j: [
          ['Thawab al-A‘mal, p. 115', 'Le Prophète ﷺ : priez à l’heure de l’insouciance, même deux rak‘ats légères, car elles mènent au Paradis.'],
          ['Wasa’il al-Shi‘a, vol. 8, p. 121', 'Imam al-Sadiq : celui qui prie ces deux rak‘ats entre le Maghrib et l’Isha puis demande à Allah, Il lui donne ce qu’il demande.'],
        ],
      },
      prayer: {
        s: [['', 'Le plus souvent 6 rak‘ats, deux par deux, après la sunna du Maghrib ; ce nombre repose sur le récit faible ci-dessus.']],
        j: [['al-‘Urwa al-Wuthqa, vol. 2, p. 246-247', '2 rak‘ats : après la Fatiha, Coran 21:87-88 dans la première et Coran 6:59 dans la seconde.']],
      },
    },
    tahajjud: {
      time: {
        s: [
          ['Sahih al-Boukhari 1145, Sahih Muslim 758', 'Notre Seigneur descend chaque nuit au ciel le plus proche quand reste le dernier tiers de la nuit, et dit : qui M’invoque, que Je lui réponde ?'],
          ['Sahih al-Boukhari 1131, Sahih Muslim 1159', 'La prière la plus aimée d’Allah est celle de Dawud : il dormait la moitié de la nuit, priait un tiers et dormait un sixième.'],
          ['Coran 73:20', 'Ton Seigneur sait que tu te tiens debout près des deux tiers de la nuit, ou sa moitié, ou son tiers.'],
        ],
        j: [['Man La Yahdhuruhu al-Faqih, vol. 1, chapitre du temps de la prière de nuit', 'Le Prophète ﷺ ne priait rien après l’Isha jusqu’à minuit ; la Salat al-Layl va de minuit à l’aube, meilleure près de l’aube.']],
      },
      virtue: {
        s: [
          ['Coran 17:79', 'Et de la nuit, consacre une partie au Tahajjud, prière surérogatoire pour toi ; peut-être ton Seigneur t’élèvera-t-Il à une station louable.'],
          ['Coran 51:17-18', 'Ils dormaient peu la nuit, et aux dernières heures ils imploraient le pardon.'],
          ['Coran 32:16', 'Leurs flancs s’arrachent de leurs couches, ils invoquent leur Seigneur avec crainte et espoir.'],
          ['Sahih Muslim 1163', 'La meilleure prière après les prières obligatoires est la prière de nuit.'],
        ],
        j: [
          ['Coran 17:79', 'Et de la nuit, consacre une partie au Tahajjud, prière surérogatoire pour toi ; peut-être ton Seigneur t’élèvera-t-Il à une station louable.'],
          ['Coran 73:1-4', 'Lève-toi pour prier la nuit, la moitié ou un peu moins ou un peu plus, et récite le Coran lentement.'],
        ],
      },
      prayer: {
        s: [
          ['Sahih al-Boukhari 990, Sahih Muslim 749', 'La prière de nuit se fait deux par deux, et si tu crains l’aube, prie une rak‘a de witr.'],
          ['Sahih al-Boukhari 1147, Sahih Muslim 738', 'Aïcha : il ﷺ ne priait pas plus de onze rak‘ats la nuit, en Ramadan ou en dehors.'],
        ],
        j: [
          ['', '11 rak‘ats : 8, puis 2 (shaf‘), puis 1 (witr).'],
          [W46, 'Les prières du jour font 51 rak‘ats, 17 obligatoires et 34 de nafila, dont la prière de nuit.'],
        ],
      },
    },
  },
};
