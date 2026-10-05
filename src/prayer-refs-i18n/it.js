'use strict';
// Italian: same shape as EN in src/prayer-refs.js.
var MLYF = 'Man La Yahduruhu al-Faqih, vol. 1, capitolo degli orari di preghiera';
var W46 = 'Wasa’il al-Shi‘a, vol. 4, p. 46';
module.exports = {
  label: 'Riferimenti',
  title: '{prayer}: Corano e hadith sull’orario, i meriti e le rak‘a | SalaahDaily',
  h1: '{prayer}: Corano e hadith',
  desc: 'I versetti e gli hadith sull’orario della preghiera di {prayer}, i suoi meriti e il numero di rak‘a, con le scuole sunnite e la scuola sciita (jafarita) affiancate.',
  lede: 'Riferimenti dal Corano e dagli hadith, con il parere sunnita (hanafita, shafiita, malikita, hanbalita) e quello sciita (jafarita) affiancati.',
  sunniH: 'Parere sunnita (hanafita, shafiita, malikita, hanbalita)',
  shiaH: 'Parere sciita (jafarita)',
  timeH: 'L’orario di {prayer}',
  virtueH: 'I meriti di {prayer}',
  prayerH: 'La preghiera di {prayer}: rak‘a',
  note: 'I numeri degli hadith seguono sunnah.com. Le fonti jafarite sono citate per libro, volume e capitolo.',
  otherH: 'Riferimenti delle altre preghiere',
  items: {
    fajr: {
      time: {
        s: [
          ['Corano 2:187', 'Mangiate e bevete finché non si distingua il filo bianco dell’alba dal filo nero. Il Fajr comincia con quest’alba vera.'],
          ['Corano 17:78', 'Esegui la preghiera … e la recitazione dell’alba.'],
          ['Sahih Muslim 612', 'Il tempo del Fajr va dall’alba al sorgere del sole.'],
          ['Abu Dawud 393, Tirmidhi 149', 'Jibril guidò il Fajr allo spuntare dell’alba il primo giorno e quando era chiaro il secondo, e disse che il tempo è tra i due.'],
          ['Sahih al-Bukhari 578, Sahih Muslim 645', 'Il Profeta ﷺ pregava il Fajr quando era ancora buio. Le scuole shafiita, malikita e hanbalita preferiscono pregarlo presto.'],
          ['Tirmidhi 154, Abu Dawud 424', 'Pregate il Fajr quando la luce si è diffusa, perché la ricompensa è maggiore. La scuola hanafita preferisce pregarlo nella luce (isfar).'],
        ],
        j: [
          ['Corano 17:78', 'Esegui la preghiera … e la recitazione dell’alba.'],
          ['Man La Yahduruhu al-Faqih, vol. 1, capitolo del riconoscere l’alba, hadith 1-2', 'Imam al-Sadiq: l’alba vera si stende sull’orizzonte come un fiume bianco, non verso l’alto come la coda di un lupo; il tempo del Fajr inizia quando si è stesa e ha illuminato il cielo.'],
          [MLYF + ', hadith 6', 'Imam al-Sadiq: pregare all’inizio del tempo porta il compiacimento di Allah; alla fine, solo il Suo perdono.'],
        ],
      },
      virtue: {
        s: [
          ['Corano 17:78', 'La recitazione dell’alba ha testimoni (gli angeli).'],
          ['Sahih Muslim 657', 'Chi prega il Fajr è sotto la protezione di Allah.'],
          ['Sahih al-Bukhari 574, Sahih Muslim 635', 'Chi prega le due preghiere fresche (Fajr e Asr) entrerà in Paradiso.'],
          ['Sahih Muslim 656', 'Chi prega il Fajr in congregazione è come se avesse pregato tutta la notte.'],
          ['Sahih al-Bukhari 657, Sahih Muslim 651', 'Le preghiere più pesanti per gli ipocriti sono l’Isha e il Fajr; se ne conoscessero la ricompensa, verrebbero anche carponi.'],
        ],
        j: [
          ['Corano 17:78', 'La recitazione dell’alba ha testimoni (gli angeli).'],
          [MLYF + ', hadith 7', 'Imam al-Sadiq: pregare nel primo tempo è meglio per il credente dei suoi figli e dei suoi beni.'],
        ],
      },
      prayer: {
        s: [
          ['', '2 rak‘a obbligatorie, precedute da 2 rak‘a sunna.'],
          ['Sahih Muslim 725', 'Le due rak‘a prima del Fajr sono migliori del mondo e di tutto ciò che contiene.'],
          ['Sahih al-Bukhari 1169, Sahih Muslim 724', 'Aisha: egli ﷺ non era assiduo in nessuna preghiera volontaria quanto nelle due rak‘a prima del Fajr.'],
          ['', 'Qunut: shafiiti e malikiti lo recitano nel Fajr; hanafiti e hanbaliti no, se non nei tempi di calamità.'],
        ],
        j: [
          ['', '2 rak‘a obbligatorie, precedute da 2 rak‘a di nafila.'],
          [W46, 'Imam al-Sadiq: le preghiere quotidiane sono 51 rak‘a, 17 obbligatorie e 34 di nafila; nella pratica jafarita 2 di nafila precedono il Fajr.'],
          ['', 'Il qunut si recita nella seconda rak‘a di ogni preghiera, Fajr compreso.'],
        ],
      },
    },
    dhuhr: {
      time: {
        s: [
          ['Corano 17:78', 'Esegui la preghiera dal declinare del sole fino all’oscurità della notte.'],
          ['Abu Dawud 393, Tirmidhi 149', 'Jibril guidò il Dhuhr quando il sole passò il meridiano, e il secondo giorno quando l’ombra eguagliò l’oggetto.'],
          ['Sahih Muslim 618', 'Il Profeta ﷺ pregava il Dhuhr quando il sole aveva passato il meridiano.'],
          ['Sahih Muslim 612', 'Il tempo del Dhuhr dura finché l’ombra di un uomo è pari alla sua altezza, finché non arriva l’Asr.'],
          ['Sahih al-Bukhari 533, Sahih Muslim 615', 'Quando il caldo è forte, rimandate il Dhuhr finché rinfresca. Per questo la scuola hanafita rimanda il Dhuhr d’estate.'],
        ],
        j: [
          [MLYF + ', hadith 1-3', 'Imam al-Sadiq e imam al-Baqir: quando il sole declina, inizia insieme il tempo del Dhuhr e dell’Asr, prima il Dhuhr, fino al tramonto.'],
          [MLYF + ', hadith 4', 'Il tempo preferito del Dhuhr va fino a due piedi d’ombra dopo mezzogiorno, e quello dell’Asr due piedi in più.'],
          [MLYF + ', hadith 27', 'Il Profeta ﷺ chiese al muezzin di attendere un po’ prima del Dhuhr nel gran caldo.'],
          ['Sahih Muslim 705', 'Ibn Abbas: il Profeta ﷺ unì il Dhuhr e l’Asr a Medina, senza paura né pioggia, per non mettere in difficoltà la sua comunità.'],
        ],
      },
      virtue: {
        s: [
          ['Abu Dawud 1269, Tirmidhi 428', 'Chi mantiene quattro rak‘a prima del Dhuhr e quattro dopo, Allah lo rende proibito al Fuoco.'],
          ['Tirmidhi 478', 'Dopo il mezzogiorno si aprono le porte del cielo, e al Profeta ﷺ piaceva che una sua buona opera salisse in quel momento.'],
        ],
        j: [
          [MLYF + ', hadith 5', 'Imam al-Sadiq: il primo tempo della preghiera, al declinare del sole, è il più amato da Allah e il migliore.'],
        ],
      },
      prayer: {
        s: [
          ['', '4 rak‘a obbligatorie. Hanafita: 4 sunna prima e 2 dopo. Shafiita e hanbalita: 2 prima e 2 dopo (anche 4 prima è sunna).'],
          ['Sahih al-Bukhari 1182', 'Aisha: egli ﷺ non lasciava mai le quattro rak‘a prima del Dhuhr.'],
          ['Sahih Muslim 728, Tirmidhi 415', 'Dodici rak‘a di sunna al giorno costruiscono una casa in Paradiso: tra esse 4 prima del Dhuhr e 2 dopo.'],
          ['Sahih al-Bukhari 1180', 'Ibn Umar ricordava 2 rak‘a prima del Dhuhr e 2 dopo.'],
          ['Corano 62:9', 'Il venerdì la preghiera del Jumu‘a (2 rak‘a dopo il sermone) sostituisce il Dhuhr.'],
        ],
        j: [
          ['', '4 rak‘a obbligatorie, precedute da 8 rak‘a di nafila.'],
          [MLYF + ', hadith 1', 'Imam al-Sadiq: quando il sole declina, è giunto il tempo; prega quando hai finito la tua nafila.'],
          [W46, 'Le preghiere quotidiane sono 51 rak‘a, 17 obbligatorie e 34 di nafila.'],
          ['Corano 62:9', 'Il venerdì, nella scuola jafarita oggi, il Jumu‘a e il Dhuhr sono entrambi scelte valide.'],
        ],
      },
    },
    asr: {
      time: {
        s: [
          ['Abu Dawud 393, Tirmidhi 149', 'Jibril guidò l’Asr quando l’ombra eguagliò l’oggetto. Shafiiti, malikiti e hanbaliti iniziano l’Asr allora.'],
          ['Sahih al-Bukhari 557', 'Il tempo dall’Asr al tramonto è la parte più breve del giorno. Da qui Abu Hanifa dedusse che l’Asr inizia quando l’ombra è il doppio dell’oggetto.'],
          ['Sahih Muslim 612', 'Il tempo dell’Asr dura finché il sole ingiallisce.'],
          ['Sahih al-Bukhari 550', 'Il Profeta ﷺ pregava l’Asr quando il sole era ancora alto e luminoso.'],
          ['Sahih Muslim 622', 'Rimandare l’Asr finché il sole ingiallisce è la preghiera dell’ipocrita.'],
        ],
        j: [
          [MLYF + ', hadith 2', 'Imam al-Sadiq: il tempo del Dhuhr e dell’Asr inizia insieme a mezzogiorno, il Dhuhr prima dell’Asr, fino al tramonto.'],
          [MLYF + ', hadith 4', 'Il tempo preferito dell’Asr è quando l’ombra è cresciuta di altri due piedi dopo il tempo del Dhuhr.'],
          [MLYF + ', hadith 9', 'Imam al-Baqir: prega l’Asr finché il sole è ancora bianco e limpido.'],
        ],
      },
      virtue: {
        s: [
          ['Corano 2:238, Sahih Muslim 627', 'Siate assidui alle preghiere, e alla preghiera di mezzo. Il Profeta ﷺ disse che la preghiera di mezzo è l’Asr.'],
          ['Sahih al-Bukhari 574, Sahih Muslim 635', 'Chi prega le due preghiere fresche (Fajr e Asr) entrerà in Paradiso.'],
          ['Sahih al-Bukhari 552, Sahih Muslim 626', 'Chi perde la preghiera dell’Asr è come se avesse perso la famiglia e i beni.'],
          ['Sahih al-Bukhari 553', 'Chi abbandona la preghiera dell’Asr, le sue opere vanno perdute.'],
        ],
        j: [
          ['Corano 2:238', 'Siate assidui alle preghiere, e alla preghiera di mezzo.'],
          [MLYF + ', hadith 9', 'L’imam al-Baqir avvertì che chi trascura l’Asr è privato del bene in Paradiso.'],
        ],
      },
      prayer: {
        s: [
          ['', '4 rak‘a obbligatorie; 4 prima sono raccomandate, senza essere fortemente sottolineate.'],
          ['Abu Dawud 1271, Tirmidhi 430', 'Allah abbia misericordia di chi prega quattro rak‘a prima dell’Asr.'],
          ['Sahih al-Bukhari 350, Sahih Muslim 685', 'La preghiera fu prescritta all’inizio in due rak‘a e rimase così in viaggio; per questo il viaggiatore prega l’Asr in 2.'],
        ],
        j: [
          ['', '4 rak‘a obbligatorie, precedute da 8 rak‘a di nafila.'],
          [W46, 'Le preghiere quotidiane sono 51 rak‘a, 17 obbligatorie e 34 di nafila.'],
          ['Corano 4:101', 'In viaggio non c’è colpa nell’accorciare la preghiera; l’Asr diventa di 2 rak‘a.'],
        ],
      },
    },
    maghrib: {
      time: {
        s: [
          ['Sahih al-Bukhari 561, Sahih Muslim 636', 'Il Profeta ﷺ pregava il Maghrib appena il sole tramontava e scompariva.'],
          ['Sahih Muslim 612', 'Il tempo del Maghrib dura finché scompare il crepuscolo. Hanafiti e hanbaliti seguono questo; la scuola malikita dà al Maghrib un tempo breve.'],
          ['Abu Dawud 418', 'La mia comunità resterà nel bene finché non rimanderà il Maghrib fino all’apparire delle stelle.'],
        ],
        j: [
          [MLYF + ', hadith 10', 'Imam al-Baqir: il tempo del Maghrib inizia quando il disco del sole è scomparso.'],
          ['Wasa’il al-Shi‘a, capitolo sull’inizio del Maghrib', 'Il tramonto si riconosce dal rosso che lascia il cielo a est; per questo la scuola jafarita attende alcuni minuti dopo il tramonto.'],
          [MLYF + ', hadith 16', 'L’imam al-Sadiq biasimò il rimandare il Maghrib fino all’apparire delle stelle.'],
          [MLYF + ', hadith 18', 'Imam al-Sadiq: al tramonto si può rompere il digiuno e il Maghrib è dovuto; il tempo dell’Isha segue fino a mezzanotte.'],
        ],
      },
      virtue: {
        s: [
          ['Abu Dawud 418', 'Pregare il Maghrib in orario mantiene la comunità nel bene.'],
          ['Sahih Muslim 728, Tirmidhi 415', 'Le 2 rak‘a sunna dopo il Maghrib fanno parte delle dodici rak‘a che costruiscono una casa in Paradiso.'],
        ],
        j: [
          [MLYF + ', hadith 20', 'Imam al-Sadiq: due rak‘a dopo il Maghrib sono scritte nei gradi più alti, e quattro valgono un Hajj accettato.'],
        ],
      },
      prayer: {
        s: [
          ['', '3 rak‘a obbligatorie, mai accorciate in viaggio, seguite da 2 rak‘a sunna.'],
          ['Sahih al-Bukhari 1183', 'Pregate prima del Maghrib, chi vuole: sono permesse 2 rak‘a brevi dopo l’adhan.'],
        ],
        j: [
          ['', '3 rak‘a obbligatorie, mai accorciate in viaggio, seguite da 4 rak‘a di nafila.'],
          [W46, 'Le preghiere quotidiane sono 51 rak‘a, 17 obbligatorie e 34 di nafila.'],
        ],
      },
    },
    isha: {
      time: {
        s: [
          ['Sahih Muslim 612', 'Il tempo dell’Isha dura fino a metà della notte.'],
          ['Sahih Muslim 638, Tirmidhi 167', 'Se non fosse gravoso per la mia comunità, ordinerei di rimandare l’Isha fino a un terzo della notte.'],
          ['Sahih Muslim 681', 'La negligenza è rimandare una preghiera fino al tempo della successiva. La maggior parte dei sapienti ritiene l’Isha valido fino al Fajr, ma meglio prima di mezzanotte.'],
          ['', 'La maggior parte dei sapienti inizia l’Isha quando scompare il crepuscolo rosso; Abu Hanifa quando scompare quello bianco, che è più tardi.'],
        ],
        j: [
          [MLYF + ', hadith 13', 'Un racconto dà il tempo dell’Isha fino a un terzo della notte.'],
          [MLYF + ', hadith 18', 'Il tempo dell’Isha dura fino a mezzanotte.'],
          [MLYF + ', hadith 14', 'Chi dorme fino a mezzanotte senza pregare l’Isha la recupera e digiuna il giorno dopo.'],
        ],
      },
      virtue: {
        s: [
          ['Sahih Muslim 656', 'Chi prega l’Isha in congregazione è come se avesse pregato metà della notte.'],
          ['Sahih al-Bukhari 657, Sahih Muslim 651', 'Le preghiere più pesanti per gli ipocriti sono l’Isha e il Fajr; se ne conoscessero la ricompensa, verrebbero anche carponi.'],
          ['Sahih al-Bukhari 568', 'Al Profeta ﷺ non piaceva dormire prima dell’Isha né conversare dopo.'],
        ],
        j: [
          [MLYF + ', hadith 19', 'L’imam al-Baqir avvertì che un angelo maledice chi lascia l’Isha a dopo mezzanotte.'],
        ],
      },
      prayer: {
        s: [
          ['', '4 rak‘a obbligatorie, poi 2 rak‘a sunna, poi il witr.'],
          ['Abu Dawud 1422', 'Il witr è un dovere. La scuola hanafita lo ritiene wajib, di 3 rak‘a.'],
          ['Sahih Muslim 752', 'Il witr è una rak‘a alla fine della notte. Per shafiiti, malikiti e hanbaliti è sunna, almeno 1 rak‘a.'],
          ['Sahih al-Bukhari 998, Sahih Muslim 751', 'Fate del witr l’ultima delle vostre preghiere notturne.'],
        ],
        j: [
          ['', '4 rak‘a obbligatorie, seguite da 2 rak‘a di nafila pregate seduti.'],
          [W46, 'Imam al-Sadiq: le 2 rak‘a di nafila pregate seduti dopo l’Isha contano come una.'],
        ],
      },
    },
    ishraq: {
      time: {
        s: [
          ['Sahih Muslim 831, 832', 'Non pregate mentre il sole sorge finché non si è alzato; per questo l’Ishraq inizia circa 15 minuti dopo l’alba.'],
          ['', 'Molti sapienti considerano l’Ishraq l’inizio del tempo del Duha.'],
        ],
        j: [['', 'La scuola jafarita non ha una preghiera di Ishraq a sé. Le preghiere raccomandate si possono fare dopo che il sole si è alzato.']],
      },
      virtue: {
        s: [['Tirmidhi 586', 'Chi prega il Fajr in congregazione, resta seduto ricordando Allah finché sorge il sole e poi prega due rak‘a, ha una ricompensa come quella di un Hajj e una Umra. Tirmidhi lo ha giudicato hasan gharib; alcuni sapienti lo ritengono debole.']],
        j: [['', 'La scuola jafarita non si basa su alcun racconto riguardo a una preghiera di Ishraq a sé.']],
      },
      prayer: {
        s: [['', '2 rak‘a, oppure 4.']],
        j: [['', 'Nessuna preghiera di Ishraq a sé.']],
      },
    },
    chasht: {
      time: {
        s: [
          ['Sahih Muslim 748', 'La preghiera di chi torna ad Allah (awwabin) è quando i cammellini sentono il caldo: il tempo migliore del Duha, verso un quarto del giorno.'],
          ['Sahih Muslim 831', 'Non pregate quando il sole è al punto più alto finché non declina; per questo il Duha finisce poco prima del Dhuhr.'],
        ],
        j: [['', 'Racconti degli imam della famiglia del Profeta definiscono la preghiera del Duha un’innovazione; per questo la scuola jafarita non la conta tra le preghiere raccomandate.']],
      },
      virtue: {
        s: [
          ['Sahih Muslim 720', 'Ogni mattina è dovuta un’elemosina per ogni articolazione, e due rak‘a di Duha bastano.'],
          ['Sahih al-Bukhari 1981, Sahih Muslim 721', 'Abu Hurayra: il mio amico ﷺ mi raccomandò di digiunare tre giorni al mese, pregare due rak‘a di Duha e fare il witr prima di dormire.'],
        ],
        j: [['', 'Non fa parte delle preghiere raccomandate nella scuola jafarita.']],
      },
      prayer: {
        s: [
          ['', 'Almeno 2 rak‘a.'],
          ['Sahih Muslim 719', 'Aisha: egli ﷺ pregava il Duha con quattro rak‘a, e di più quanto Allah voleva.'],
          ['Sahih al-Bukhari 1176, Sahih Muslim 336', 'Umm Hani: il giorno della conquista della Mecca pregò otto rak‘a in mattinata.'],
        ],
        j: [['', 'Non si prega come preghiera a sé nella scuola jafarita.']],
      },
    },
    awwabin: {
      time: {
        s: [
          ['Corano 32:16, 51:17; Abu Dawud 1322', 'Anas spiegò questi versetti su chi prega di notte: pregavano tra il Maghrib e l’Isha.'],
          ['Sahih Muslim 748', 'In questo hadith il nome «preghiera degli awwabin» è usato per il Duha; molti sapienti lo usano per le preghiere tra il Maghrib e l’Isha.'],
        ],
        j: [
          ['Thawab al-A‘mal, p. 115', 'L’ora della disattenzione è tra il Maghrib e l’Isha (preghiera di Ghufayla).'],
          ['al-‘Urwa al-Wuthqa, vol. 2, p. 246', 'La Ghufayla si prega dopo il Maghrib, prima che il rosso lasci il cielo a ovest.'],
        ],
      },
      virtue: {
        s: [['Tirmidhi 435', 'Sei rak‘a dopo il Maghrib equivalgono a dodici anni di adorazione. Tirmidhi e altri hanno giudicato questo racconto molto debole.']],
        j: [
          ['Thawab al-A‘mal, p. 115', 'Il Profeta ﷺ: pregate nell’ora della disattenzione, anche due rak‘a leggere, perché conducono al Paradiso.'],
          ['Wasa’il al-Shi‘a, vol. 8, p. 121', 'Imam al-Sadiq: chi prega queste due rak‘a tra il Maghrib e l’Isha e poi chiede ad Allah, Egli gli dà ciò che chiede.'],
        ],
      },
      prayer: {
        s: [['', 'Di solito 6 rak‘a, a due a due, dopo la sunna del Maghrib; il numero si basa sul racconto debole sopra.']],
        j: [['al-‘Urwa al-Wuthqa, vol. 2, p. 246-247', '2 rak‘a: dopo la Fatiha, Corano 21:87-88 nella prima e Corano 6:59 nella seconda.']],
      },
    },
    tahajjud: {
      time: {
        s: [
          ['Sahih al-Bukhari 1145, Sahih Muslim 758', 'Il nostro Signore scende ogni notte al cielo più vicino quando resta l’ultimo terzo della notte, e dice: chi Mi invoca, perché Io gli risponda?'],
          ['Sahih al-Bukhari 1131, Sahih Muslim 1159', 'La preghiera più amata da Allah è quella di Dawud: dormiva metà della notte, pregava un terzo e dormiva un sesto.'],
          ['Corano 73:20', 'Il tuo Signore sa che stai in piedi quasi due terzi della notte, o la metà, o un terzo.'],
        ],
        j: [['Man La Yahduruhu al-Faqih, vol. 1, capitolo sul tempo della preghiera notturna', 'Il Profeta ﷺ non pregava nulla dopo l’Isha fino a mezzanotte; la Salat al-Layl va da mezzanotte all’alba, migliore vicino all’alba.']],
      },
      virtue: {
        s: [
          ['Corano 17:79', 'E in parte della notte prega il Tahajjud, come preghiera supplementare per te; forse il tuo Signore ti innalzerà a un rango lodevole.'],
          ['Corano 51:17-18', 'Dormivano poco la notte, e prima dell’alba chiedevano perdono.'],
          ['Corano 32:16', 'I loro fianchi si staccano dai giacigli; invocano il loro Signore con timore e speranza.'],
          ['Sahih Muslim 1163', 'La preghiera migliore dopo quelle obbligatorie è la preghiera della notte.'],
        ],
        j: [
          ['Corano 17:79', 'E in parte della notte prega il Tahajjud, come preghiera supplementare per te; forse il tuo Signore ti innalzerà a un rango lodevole.'],
          ['Corano 73:1-4', 'Alzati a pregare di notte, la metà o poco meno o poco più, e recita il Corano lentamente.'],
        ],
      },
      prayer: {
        s: [
          ['Sahih al-Bukhari 990, Sahih Muslim 749', 'La preghiera della notte è a due a due, e se temi l’alba, prega una rak‘a di witr.'],
          ['Sahih al-Bukhari 1147, Sahih Muslim 738', 'Aisha: egli ﷺ non pregava più di undici rak‘a la notte, né in Ramadan né in altri mesi.'],
        ],
        j: [
          ['', '11 rak‘a: 8, poi 2 (shaf‘), poi 1 (witr).'],
          [W46, 'Le preghiere quotidiane sono 51 rak‘a, 17 obbligatorie e 34 di nafila, tra cui la preghiera della notte.'],
        ],
      },
    },
  },
};
