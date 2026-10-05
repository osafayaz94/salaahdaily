'use strict';
// German: same shape as EN in src/prayer-refs.js.
var MLYF = 'Man La Yahduruhu al-Faqih, Bd. 1, Kapitel über die Gebetszeiten';
var W46 = 'Wasa’il al-Schi‘a, Bd. 4, S. 46';
module.exports = {
  label: 'Quellen',
  title: '{prayer}: Koran und Hadith zu Zeit, Vorzügen und Rak‘as | SalaahDaily',
  h1: '{prayer}: Koran und Hadith',
  desc: 'Die Koranverse und Hadithe zur Zeit des {prayer}-Gebets, seinen Vorzügen und der Zahl der Rak‘as, die sunnitischen Schulen und die schiitische (dschafaritische) Schule nebeneinander.',
  lede: 'Quellen aus Koran und Hadith, die sunnitische Sicht (hanafitisch, schafiitisch, malikitisch, hanbalitisch) und die schiitische Sicht (dschafaritisch) nebeneinander.',
  sunniH: 'Sunnitische Sicht (hanafitisch, schafiitisch, malikitisch, hanbalitisch)',
  shiaH: 'Schiitische Sicht (dschafaritisch)',
  timeH: 'Die Zeit des {prayer}',
  virtueH: 'Die Vorzüge des {prayer}',
  prayerH: 'Das {prayer}-Gebet: Rak‘as',
  note: 'Hadithnummern nach sunnah.com. Dschafaritische Quellen sind mit Buch, Band und Kapitel genannt.',
  otherH: 'Quellen der anderen Gebete',
  items: {
    fajr: {
      time: {
        s: [
          ['Koran 2:187', 'Esst und trinkt, bis sich für euch der weiße Faden der Morgendämmerung vom schwarzen Faden abhebt. Mit dieser echten Dämmerung beginnt Fadschr.'],
          ['Koran 17:78', 'Verrichte das Gebet … und die Lesung in der Morgendämmerung.'],
          ['Sahih Muslim 612', 'Die Zeit des Fadschr reicht von der Morgendämmerung bis Sonnenaufgang.'],
          ['Abu Dawud 393, Tirmidhi 149', 'Dschibril leitete Fadschr am ersten Tag beim Anbruch der Dämmerung und am zweiten, als es hell war, und sagte, die Zeit liege dazwischen.'],
          ['Sahih al-Buchari 578, Sahih Muslim 645', 'Der Prophet ﷺ betete Fadschr, als es noch dunkel war. Die schafiitische, malikitische und hanbalitische Schule ziehen das frühe Beten vor.'],
          ['Tirmidhi 154, Abu Dawud 424', 'Betet Fadschr, wenn sich das Licht ausgebreitet hat, denn der Lohn ist größer. Die hanafitische Schule zieht das Beten im Hellen (Isfar) vor.'],
        ],
        j: [
          ['Koran 17:78', 'Verrichte das Gebet … und die Lesung in der Morgendämmerung.'],
          ['Man La Yahduruhu al-Faqih, Bd. 1, Kapitel über das Erkennen der Dämmerung, Hadith 1-2', 'Imam al-Sadiq: Die echte Dämmerung breitet sich am Horizont wie ein weißer Fluss aus, nicht nach oben wie ein Wolfsschwanz; die Zeit des Fadschr beginnt, wenn sie sich ausgebreitet und den Himmel erhellt hat.'],
          [MLYF + ', Hadith 6', 'Imam al-Sadiq: Das Gebet am Anfang der Zeit bringt Allahs Wohlgefallen, an ihrem Ende nur Seine Vergebung.'],
        ],
      },
      virtue: {
        s: [
          ['Koran 17:78', 'Die Lesung in der Morgendämmerung wird bezeugt (von den Engeln).'],
          ['Sahih Muslim 657', 'Wer das Fadschr-Gebet verrichtet, steht unter Allahs Schutz.'],
          ['Sahih al-Buchari 574, Sahih Muslim 635', 'Wer die beiden kühlen Gebete (Fadschr und Asr) verrichtet, kommt ins Paradies.'],
          ['Sahih Muslim 656', 'Wer Fadschr in der Gemeinschaft betet, ist, als hätte er die ganze Nacht gebetet.'],
          ['Sahih al-Buchari 657, Sahih Muslim 651', 'Die schwersten Gebete für die Heuchler sind Ischa und Fadschr; wüssten sie um ihren Lohn, kämen sie selbst kriechend.'],
        ],
        j: [
          ['Koran 17:78', 'Die Lesung in der Morgendämmerung wird bezeugt (von den Engeln).'],
          [MLYF + ', Hadith 7', 'Imam al-Sadiq: Das Gebet zur ersten Zeit ist für den Gläubigen besser als seine Kinder und sein Besitz.'],
        ],
      },
      prayer: {
        s: [
          ['', '2 Pflicht-Rak‘as, davor 2 Sunna-Rak‘as.'],
          ['Sahih Muslim 725', 'Die zwei Rak‘as vor Fadschr sind besser als die Welt und alles, was in ihr ist.'],
          ['Sahih al-Buchari 1169, Sahih Muslim 724', 'Aischa: Er ﷺ hielt an keinem freiwilligen Gebet so fest wie an den zwei Rak‘as vor Fadschr.'],
          ['', 'Qunut: Schafiiten und Malikiten sprechen es im Fadschr; Hanafiten und Hanbaliten nicht, außer in Zeiten des Unheils.'],
        ],
        j: [
          ['', '2 Pflicht-Rak‘as, davor 2 Rak‘as Nafila.'],
          [W46, 'Imam al-Sadiq: Die täglichen Gebete sind 51 Rak‘as, 17 Pflicht und 34 Nafila; in der dschafaritischen Praxis kommen 2 Nafila vor Fadschr.'],
          ['', 'Das Qunut wird in der zweiten Rak‘a jedes Gebets gesprochen, auch im Fadschr.'],
        ],
      },
    },
    dhuhr: {
      time: {
        s: [
          ['Koran 17:78', 'Verrichte das Gebet vom Neigen der Sonne bis zur Dunkelheit der Nacht.'],
          ['Abu Dawud 393, Tirmidhi 149', 'Dschibril leitete Dhuhr, als die Sonne den Meridian überschritten hatte, und am zweiten Tag, als der Schatten dem Gegenstand glich.'],
          ['Sahih Muslim 618', 'Der Prophet ﷺ betete Dhuhr, wenn die Sonne den Meridian überschritten hatte.'],
          ['Sahih Muslim 612', 'Die Zeit des Dhuhr dauert, bis der Schatten eines Mannes seiner Größe gleicht, solange Asr nicht gekommen ist.'],
          ['Sahih al-Buchari 533, Sahih Muslim 615', 'Wenn die Hitze stark ist, verschiebt Dhuhr, bis es kühler ist. Deshalb verschiebt die hanafitische Schule Dhuhr im Sommer.'],
        ],
        j: [
          [MLYF + ', Hadith 1-3', 'Imam al-Sadiq und Imam al-Baqir: Wenn sich die Sonne neigt, beginnt die Zeit von Dhuhr und Asr zusammen, zuerst Dhuhr, bis Sonnenuntergang.'],
          [MLYF + ', Hadith 4', 'Die bevorzugte Zeit des Dhuhr reicht bis zwei Fuß Schatten nach Mittag, die des Asr zwei Fuß weiter.'],
          [MLYF + ', Hadith 27', 'Der Prophet ﷺ bat den Muezzin, bei großer Hitze vor Dhuhr etwas zu warten.'],
          ['Sahih Muslim 705', 'Ibn Abbas: Der Prophet ﷺ legte in Medina ohne Furcht und Regen Dhuhr und Asr zusammen, um seiner Gemeinschaft keine Härte aufzuerlegen.'],
        ],
      },
      virtue: {
        s: [
          ['Abu Dawud 1269, Tirmidhi 428', 'Wer an vier Rak‘as vor Dhuhr und vier danach festhält, den macht Allah für das Feuer verboten.'],
          ['Tirmidhi 478', 'Nach dem Mittag öffnen sich die Tore des Himmels, und der Prophet ﷺ liebte es, dass eine gute Tat von ihm dann aufsteigt.'],
        ],
        j: [
          [MLYF + ', Hadith 5', 'Imam al-Sadiq: Die erste Zeit des Gebets, wenn sich die Sonne neigt, ist Allah die liebste und die beste.'],
        ],
      },
      prayer: {
        s: [
          ['', '4 Pflicht-Rak‘as. Hanafitisch: 4 Sunna davor und 2 danach. Schafiitisch und hanbalitisch: 2 davor und 2 danach (auch 4 davor ist Sunna).'],
          ['Sahih al-Buchari 1182', 'Aischa: Er ﷺ ließ die vier Rak‘as vor Dhuhr nie aus.'],
          ['Sahih Muslim 728, Tirmidhi 415', 'Zwölf Sunna-Rak‘as am Tag bauen ein Haus im Paradies: darunter 4 vor Dhuhr und 2 danach.'],
          ['Sahih al-Buchari 1180', 'Ibn Umar erinnerte sich an 2 Rak‘as vor Dhuhr und 2 danach.'],
          ['Koran 62:9', 'Am Freitag ersetzt das Dschumu‘a-Gebet (2 Rak‘as nach der Predigt) das Dhuhr.'],
        ],
        j: [
          ['', '4 Pflicht-Rak‘as, davor 8 Rak‘as Nafila.'],
          [MLYF + ', Hadith 1', 'Imam al-Sadiq: Wenn sich die Sonne neigt, ist die Zeit gekommen; bete, wenn du deine Nafila beendet hast.'],
          [W46, 'Die täglichen Gebete sind 51 Rak‘as, 17 Pflicht und 34 Nafila.'],
          ['Koran 62:9', 'Am Freitag sind in der dschafaritischen Schule heute Dschumu‘a und Dhuhr beide gültige Wahlen.'],
        ],
      },
    },
    asr: {
      time: {
        s: [
          ['Abu Dawud 393, Tirmidhi 149', 'Dschibril leitete Asr, als der Schatten dem Gegenstand glich. Schafiiten, Malikiten und Hanbaliten beginnen Asr dann.'],
          ['Sahih al-Buchari 557', 'Die Zeit von Asr bis Sonnenuntergang ist der kürzeste Teil des Tages. Daraus schloss Abu Hanifa, dass Asr beginnt, wenn der Schatten doppelt so lang ist.'],
          ['Sahih Muslim 612', 'Die Zeit des Asr dauert, bis die Sonne gelb wird.'],
          ['Sahih al-Buchari 550', 'Der Prophet ﷺ betete Asr, als die Sonne noch hoch und hell stand.'],
          ['Sahih Muslim 622', 'Asr zu verschieben, bis die Sonne gelb wird, ist das Gebet des Heuchlers.'],
        ],
        j: [
          [MLYF + ', Hadith 2', 'Imam al-Sadiq: Die Zeit von Dhuhr und Asr beginnt gemeinsam am Mittag, Dhuhr vor Asr, bis Sonnenuntergang.'],
          [MLYF + ', Hadith 4', 'Die bevorzugte Zeit des Asr ist, wenn der Schatten nach der Dhuhr-Zeit um zwei weitere Fuß gewachsen ist.'],
          [MLYF + ', Hadith 9', 'Imam al-Baqir: Bete Asr, solange die Sonne noch weiß und klar ist.'],
        ],
      },
      virtue: {
        s: [
          ['Koran 2:238, Sahih Muslim 627', 'Haltet die Gebete ein und das mittlere Gebet. Der Prophet ﷺ nannte das mittlere Gebet das Asr-Gebet.'],
          ['Sahih al-Buchari 574, Sahih Muslim 635', 'Wer die beiden kühlen Gebete (Fadschr und Asr) verrichtet, kommt ins Paradies.'],
          ['Sahih al-Buchari 552, Sahih Muslim 626', 'Wem das Asr-Gebet entgeht, ist, als hätte er seine Familie und seinen Besitz verloren.'],
          ['Sahih al-Buchari 553', 'Wer das Asr-Gebet unterlässt, dessen Werke sind verloren.'],
        ],
        j: [
          ['Koran 2:238', 'Haltet die Gebete ein und das mittlere Gebet.'],
          [MLYF + ', Hadith 9', 'Imam al-Baqir warnte, dass wer Asr vernachlässigt, des Guten im Paradies beraubt wird.'],
        ],
      },
      prayer: {
        s: [
          ['', '4 Pflicht-Rak‘as; 4 davor sind empfohlen, aber nicht betont.'],
          ['Abu Dawud 1271, Tirmidhi 430', 'Allah erbarme sich dessen, der vor Asr vier Rak‘as betet.'],
          ['Sahih al-Buchari 350, Sahih Muslim 685', 'Das Gebet wurde zuerst mit zwei Rak‘as vorgeschrieben und blieb auf Reisen so; darum betet der Reisende Asr mit 2.'],
        ],
        j: [
          ['', '4 Pflicht-Rak‘as, davor 8 Rak‘as Nafila.'],
          [W46, 'Die täglichen Gebete sind 51 Rak‘as, 17 Pflicht und 34 Nafila.'],
          ['Koran 4:101', 'Auf Reisen ist es keine Sünde, das Gebet zu kürzen; Asr wird zu 2 Rak‘as.'],
        ],
      },
    },
    maghrib: {
      time: {
        s: [
          ['Sahih al-Buchari 561, Sahih Muslim 636', 'Der Prophet ﷺ betete Maghrib, sobald die Sonne untergegangen und verschwunden war.'],
          ['Sahih Muslim 612', 'Die Zeit des Maghrib dauert, bis die Dämmerung verschwindet. Hanafiten und Hanbaliten folgen dem; die malikitische Schule gibt dem Maghrib eine kurze Zeit.'],
          ['Abu Dawud 418', 'Meine Gemeinschaft bleibt beim Guten, solange sie Maghrib nicht verschiebt, bis die Sterne erscheinen.'],
        ],
        j: [
          [MLYF + ', Hadith 10', 'Imam al-Baqir: Die Zeit des Maghrib beginnt, wenn die Sonnenscheibe verschwunden ist.'],
          ['Wasa’il al-Schi‘a, Kapitel über den Beginn des Maghrib', 'Der Sonnenuntergang wird daran erkannt, dass die Röte den Osthimmel verlässt; deshalb wartet die dschafaritische Schule einige Minuten nach Sonnenuntergang.'],
          [MLYF + ', Hadith 16', 'Imam al-Sadiq tadelte es, Maghrib zu verschieben, bis die Sterne erscheinen.'],
          [MLYF + ', Hadith 18', 'Imam al-Sadiq: Bei Sonnenuntergang darf man das Fasten brechen und Maghrib ist fällig; die Zeit des Ischa folgt bis Mitternacht.'],
        ],
      },
      virtue: {
        s: [
          ['Abu Dawud 418', 'Maghrib pünktlich zu beten hält die Gemeinschaft beim Guten.'],
          ['Sahih Muslim 728, Tirmidhi 415', 'Die 2 Sunna-Rak‘as nach Maghrib gehören zu den zwölf Rak‘as, die ein Haus im Paradies bauen.'],
        ],
        j: [
          [MLYF + ', Hadith 20', 'Imam al-Sadiq: Zwei Rak‘as nach Maghrib werden in den höchsten Rängen verzeichnet, und vier gleichen einem angenommenen Haddsch.'],
        ],
      },
      prayer: {
        s: [
          ['', '3 Pflicht-Rak‘as, auf Reisen nie gekürzt, danach 2 Sunna-Rak‘as.'],
          ['Sahih al-Buchari 1183', 'Betet vor Maghrib, wer will: 2 kurze Rak‘as nach dem Adhan sind erlaubt.'],
        ],
        j: [
          ['', '3 Pflicht-Rak‘as, auf Reisen nie gekürzt, danach 4 Rak‘as Nafila.'],
          [W46, 'Die täglichen Gebete sind 51 Rak‘as, 17 Pflicht und 34 Nafila.'],
        ],
      },
    },
    isha: {
      time: {
        s: [
          ['Sahih Muslim 612', 'Die Zeit des Ischa dauert bis Mitternacht.'],
          ['Sahih Muslim 638, Tirmidhi 167', 'Wäre es für meine Gemeinschaft nicht schwer, würde ich sie Ischa bis zu einem Drittel der Nacht verschieben lassen.'],
          ['Sahih Muslim 681', 'Nachlässigkeit ist, ein Gebet bis zur Zeit des nächsten aufzuschieben. Die meisten Gelehrten halten Ischa bis Fadschr für gültig, besser jedoch vor Mitternacht.'],
          ['', 'Die meisten Gelehrten beginnen Ischa, wenn die rote Dämmerung verschwunden ist; Abu Hanifa, wenn die weiße verschwunden ist, was später ist.'],
        ],
        j: [
          [MLYF + ', Hadith 13', 'Eine Überlieferung gibt die Zeit des Ischa bis zu einem Drittel der Nacht an.'],
          [MLYF + ', Hadith 18', 'Die Zeit des Ischa dauert bis Mitternacht.'],
          [MLYF + ', Hadith 14', 'Wer bis Mitternacht schläft, ohne Ischa gebetet zu haben, holt es nach und fastet am nächsten Tag.'],
        ],
      },
      virtue: {
        s: [
          ['Sahih Muslim 656', 'Wer Ischa in der Gemeinschaft betet, ist, als hätte er die halbe Nacht gebetet.'],
          ['Sahih al-Buchari 657, Sahih Muslim 651', 'Die schwersten Gebete für die Heuchler sind Ischa und Fadschr; wüssten sie um ihren Lohn, kämen sie selbst kriechend.'],
          ['Sahih al-Buchari 568', 'Der Prophet ﷺ mochte es nicht, vor Ischa zu schlafen und danach zu plaudern.'],
        ],
        j: [
          [MLYF + ', Hadith 19', 'Imam al-Baqir warnte, dass ein Engel den verflucht, der Ischa bis nach Mitternacht liegen lässt.'],
        ],
      },
      prayer: {
        s: [
          ['', '4 Pflicht-Rak‘as, danach 2 Sunna-Rak‘as, dann Witr.'],
          ['Abu Dawud 1422', 'Witr ist eine Pflicht. Die hanafitische Schule hält Witr für wadschib, mit 3 Rak‘as.'],
          ['Sahih Muslim 752', 'Witr ist eine Rak‘a am Ende der Nacht. Für Schafiiten, Malikiten und Hanbaliten ist es Sunna, mindestens 1 Rak‘a.'],
          ['Sahih al-Buchari 998, Sahih Muslim 751', 'Macht Witr zum letzten eurer Gebete in der Nacht.'],
        ],
        j: [
          ['', '4 Pflicht-Rak‘as, danach 2 Rak‘as Nafila im Sitzen.'],
          [W46, 'Imam al-Sadiq: Die 2 Nafila-Rak‘as im Sitzen nach Ischa zählen als eine.'],
        ],
      },
    },
    ishraq: {
      time: {
        s: [
          ['Sahih Muslim 831, 832', 'Betet nicht, während die Sonne aufgeht, bis sie hoch steht; daher beginnt Ischraq etwa 15 Minuten nach Sonnenaufgang.'],
          ['', 'Viele Gelehrte sehen Ischraq als Beginn der Duha-Zeit.'],
        ],
        j: [['', 'Die dschafaritische Schule kennt kein eigenes Ischraq-Gebet. Empfohlene Gebete können verrichtet werden, sobald die Sonne aufgestiegen ist.']],
      },
      virtue: {
        s: [['Tirmidhi 586', 'Wer Fadschr in der Gemeinschaft betet, bis Sonnenaufgang sitzen bleibt und Allahs gedenkt und dann zwei Rak‘as betet, hat einen Lohn wie für Haddsch und Umra. Tirmidhi stufte ihn als hasan gharib ein; manche Gelehrte halten ihn für schwach.']],
        j: [['', 'Die dschafaritische Schule stützt sich auf keine Überlieferung über ein eigenes Ischraq-Gebet.']],
      },
      prayer: {
        s: [['', '2 Rak‘as, oder 4.']],
        j: [['', 'Kein eigenes Ischraq-Gebet.']],
      },
    },
    chasht: {
      time: {
        s: [
          ['Sahih Muslim 748', 'Das Gebet der sich Allah Zuwendenden (Awwabin) ist, wenn die jungen Kamele die Hitze spüren: die beste Zeit für Duha, etwa ein Viertel des Tages.'],
          ['Sahih Muslim 831', 'Betet nicht, wenn die Sonne im Zenit steht, bis sie sich neigt; daher endet Duha kurz vor Dhuhr.'],
        ],
        j: [['', 'Überlieferungen der Imame der Prophetenfamilie bezeichnen das Duha-Gebet als Neuerung; darum zählt die dschafaritische Schule es nicht zu den empfohlenen Gebeten.']],
      },
      virtue: {
        s: [
          ['Sahih Muslim 720', 'Jeden Morgen ist für jedes Gelenk eine Spende fällig, und zwei Rak‘as Duha genügen dafür.'],
          ['Sahih al-Buchari 1981, Sahih Muslim 721', 'Abu Huraira: Mein Freund ﷺ riet mir, jeden Monat drei Tage zu fasten, zwei Rak‘as Duha zu beten und vor dem Schlafen Witr zu beten.'],
        ],
        j: [['', 'Gehört in der dschafaritischen Schule nicht zu den empfohlenen Gebeten.']],
      },
      prayer: {
        s: [
          ['', 'Mindestens 2 Rak‘as.'],
          ['Sahih Muslim 719', 'Aischa: Er ﷺ betete Duha mit vier Rak‘as und mehr, so viel Allah wollte.'],
          ['Sahih al-Buchari 1176, Sahih Muslim 336', 'Umm Hani: Am Tag der Eroberung Mekkas betete er am Vormittag acht Rak‘as.'],
        ],
        j: [['', 'Wird in der dschafaritischen Schule nicht als eigenes Gebet verrichtet.']],
      },
    },
    awwabin: {
      time: {
        s: [
          ['Koran 32:16, 51:17; Abu Dawud 1322', 'Anas erklärte diese Verse über die, die nachts beten: Sie beteten zwischen Maghrib und Ischa.'],
          ['Sahih Muslim 748', 'In diesem Hadith wird der Name „Gebet der Awwabin“ für Duha gebraucht; viele Gelehrte gebrauchen ihn für die Gebete zwischen Maghrib und Ischa.'],
        ],
        j: [
          ['Thawab al-A‘mal, S. 115', 'Die Stunde der Achtlosigkeit liegt zwischen Maghrib und Ischa (Ghufayla-Gebet).'],
          ['al-‘Urwa al-Wuthqa, Bd. 2, S. 246', 'Ghufayla wird nach Maghrib gebetet, bevor die Röte den Westhimmel verlässt.'],
        ],
      },
      virtue: {
        s: [['Tirmidhi 435', 'Sechs Rak‘as nach Maghrib gleichen zwölf Jahren Gottesdienst. Tirmidhi und andere stuften diese Überlieferung als sehr schwach ein.']],
        j: [
          ['Thawab al-A‘mal, S. 115', 'Der Prophet ﷺ: Betet in der Stunde der Achtlosigkeit, und seien es zwei leichte Rak‘as, denn sie führen ins Paradies.'],
          ['Wasa’il al-Schi‘a, Bd. 8, S. 121', 'Imam al-Sadiq: Wer diese zwei Rak‘as zwischen Maghrib und Ischa betet und dann Allah bittet, dem gibt Er, worum er bittet.'],
        ],
      },
      prayer: {
        s: [['', 'Meist 6 Rak‘as, je zwei, nach der Sunna von Maghrib; die Zahl stützt sich auf die schwache Überlieferung oben.']],
        j: [['al-‘Urwa al-Wuthqa, Bd. 2, S. 246-247', '2 Rak‘as: nach der Fatiha in der ersten Koran 21:87-88 und in der zweiten Koran 6:59.']],
      },
    },
    tahajjud: {
      time: {
        s: [
          ['Sahih al-Buchari 1145, Sahih Muslim 758', 'Unser Herr steigt jede Nacht zum untersten Himmel herab, wenn das letzte Drittel der Nacht bleibt, und sagt: Wer ruft Mich an, damit Ich ihm antworte?'],
          ['Sahih al-Buchari 1131, Sahih Muslim 1159', 'Das Allah liebste Gebet ist das Gebet Dawuds: Er schlief die halbe Nacht, betete ein Drittel und schlief ein Sechstel.'],
          ['Koran 73:20', 'Dein Herr weiß, dass du fast zwei Drittel der Nacht stehst, oder die Hälfte, oder ein Drittel.'],
        ],
        j: [['Man La Yahduruhu al-Faqih, Bd. 1, Kapitel über die Zeit des Nachtgebets', 'Der Prophet ﷺ betete nach Ischa nichts bis Mitternacht; Salat al-Lail reicht von Mitternacht bis zur Morgendämmerung, am besten nahe der Dämmerung.']],
      },
      virtue: {
        s: [
          ['Koran 17:79', 'Und in einem Teil der Nacht bete Tahajjud als zusätzliches Gebet für dich; vielleicht erhebt dich dein Herr zu einer gelobten Stellung.'],
          ['Koran 51:17-18', 'Sie schliefen nur wenig in der Nacht, und vor der Morgendämmerung baten sie um Vergebung.'],
          ['Koran 32:16', 'Ihre Seiten weichen von den Lagern; sie rufen ihren Herrn in Furcht und Hoffnung an.'],
          ['Sahih Muslim 1163', 'Das beste Gebet nach den Pflichtgebeten ist das Gebet in der Nacht.'],
        ],
        j: [
          ['Koran 17:79', 'Und in einem Teil der Nacht bete Tahajjud als zusätzliches Gebet für dich; vielleicht erhebt dich dein Herr zu einer gelobten Stellung.'],
          ['Koran 73:1-4', 'Steh in der Nacht zum Gebet auf, die Hälfte davon oder etwas weniger oder mehr, und trage den Koran langsam vor.'],
        ],
      },
      prayer: {
        s: [
          ['Sahih al-Buchari 990, Sahih Muslim 749', 'Das Nachtgebet wird je zwei und zwei gebetet, und wenn du die Morgendämmerung fürchtest, bete eine Rak‘a Witr.'],
          ['Sahih al-Buchari 1147, Sahih Muslim 738', 'Aischa: Er ﷺ betete nachts nicht mehr als elf Rak‘as, weder im Ramadan noch sonst.'],
        ],
        j: [
          ['', '11 Rak‘as: 8, dann 2 (Schaf‘), dann 1 (Witr).'],
          [W46, 'Die täglichen Gebete sind 51 Rak‘as, 17 Pflicht und 34 Nafila, darunter das Nachtgebet.'],
        ],
      },
    },
  },
};
