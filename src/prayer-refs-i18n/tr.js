'use strict';
// Turkish: same shape as EN in src/prayer-refs.js.
var MLYF = 'Men lâ yahduruhu’l-fakîh, c. 1, namaz vakitleri bölümü';
var W46 = 'Vesâilü’ş-Şîa, c. 4, s. 46';
module.exports = {
  label: 'Kaynak',
  title: '{prayer}: Vakti, Fazileti ve Rekâtları Hakkında Kur’an ve Hadis | SalaahDaily',
  h1: '{prayer}: Kur’an ve Hadis',
  desc: '{prayer} namazının vakti, fazileti ve rekâtları hakkında ayet ve hadisler; Sünnî mezhepler ve Şiî (Caferî) mezhep yan yana.',
  lede: 'Kur’an ve hadisten kaynaklar; Sünnî görüş (Hanefî, Şâfiî, Mâlikî, Hanbelî) ve Şiî görüş (Caferî) yan yana.',
  sunniH: 'Sünnî görüş (Hanefî, Şâfiî, Mâlikî, Hanbelî)',
  shiaH: 'Şiî görüş (Caferî)',
  timeH: '{prayer} namazının vakti',
  virtueH: '{prayer} namazının fazileti',
  prayerH: '{prayer} namazı: rekâtlar',
  note: 'Hadis numaraları sunnah.com’a göredir. Caferî kaynaklar kitap, cilt ve bölüm adıyla verilmiştir.',
  otherH: 'Diğer namazların kaynakları',
  items: {
    fajr: {
      time: {
        s: [
          ['Kur’an 2:187', 'Fecrin beyaz ipliği siyah iplikten ayırt edilinceye kadar yiyin için. Sabah vakti bu fecr-i sâdık ile başlar.'],
          ['Kur’an 17:78', 'Namazı kıl … sabah namazını da.'],
          ['Sahih Müslim 612', 'Sabah vakti fecrin doğuşundan güneş doğana kadardır.'],
          ['Ebû Dâvûd 393, Tirmizî 149', 'Cebrâil ilk gün sabahı fecir doğunca, ikinci gün ortalık aydınlanınca kıldırdı ve vaktin bu ikisi arası olduğunu söyledi.'],
          ['Sahih Buhârî 578, Sahih Müslim 645', 'Peygamber ﷺ sabahı henüz karanlıkta kılardı. Şâfiî, Mâlikî ve Hanbelî mezhepleri erken kılmayı tercih eder.'],
          ['Tirmizî 154, Ebû Dâvûd 424', 'Sabahı ortalık aydınlanınca kılın, sevabı daha büyüktür. Hanefî mezhebi aydınlıkta (isfar) kılmayı tercih eder.'],
        ],
        j: [
          ['Kur’an 17:78', 'Namazı kıl … sabah namazını da.'],
          ['Men lâ yahduruhu’l-fakîh, c. 1, fecri tanıma bölümü, hadis 1-2', 'İmam Câfer es-Sâdık: fecr-i sâdık ufukta beyaz bir nehir gibi yayılır, kurt kuyruğu gibi yukarı uzanmaz; sabah vakti o yayılıp aydınlatınca başlar.'],
          [MLYF + ', hadis 6', 'İmam Câfer es-Sâdık: vaktin başı Allah’ın rızası, sonu yalnızca O’nun affıdır.'],
        ],
      },
      virtue: {
        s: [
          ['Kur’an 17:78', 'Sabah namazı (meleklerin) şahitlik ettiği bir namazdır.'],
          ['Sahih Müslim 657', 'Sabah namazını kılan Allah’ın himayesindedir.'],
          ['Sahih Buhârî 574, Sahih Müslim 635', 'İki serin vakit namazını (sabah ve ikindi) kılan cennete girer.'],
          ['Sahih Müslim 656', 'Sabahı cemaatle kılan, bütün geceyi namazla geçirmiş gibidir.'],
          ['Sahih Buhârî 657, Sahih Müslim 651', 'Münafıklara en ağır gelen namazlar yatsı ve sabahtır; sevabını bilselerdi emekleyerek de olsa gelirlerdi.'],
        ],
        j: [
          ['Kur’an 17:78', 'Sabah namazı (meleklerin) şahitlik ettiği bir namazdır.'],
          [MLYF + ', hadis 7', 'İmam Câfer es-Sâdık: namazı ilk vaktinde kılmak mümin için çocuklarından ve malından daha hayırlıdır.'],
        ],
      },
      prayer: {
        s: [
          ['', '2 rekât farz, öncesinde 2 rekât sünnet.'],
          ['Sahih Müslim 725', 'Sabahın iki rekât sünneti dünyadan ve içindekilerden daha hayırlıdır.'],
          ['Sahih Buhârî 1169, Sahih Müslim 724', 'Hz. Âişe: Peygamber ﷺ hiçbir nafileye sabahın iki rekâtı kadar devam etmezdi.'],
          ['', 'Kunut: Şâfiî ve Mâlikîler sabahta kunut okur; Hanefî ve Hanbelîler musibet zamanları dışında okumaz.'],
        ],
        j: [
          ['', '2 rekât farz, öncesinde 2 rekât nafile.'],
          [W46, 'İmam Câfer es-Sâdık: günlük namazlar 51 rekâttır, 17 farz ve 34 nafile; Caferî uygulamada sabahtan önce 2 rekât nafile vardır.'],
          ['', 'Kunut, sabah dahil her namazın ikinci rekâtında okunur.'],
        ],
      },
    },
    dhuhr: {
      time: {
        s: [
          ['Kur’an 17:78', 'Güneşin batıya kaymasından gecenin karanlığına kadar namazı kıl.'],
          ['Ebû Dâvûd 393, Tirmizî 149', 'Cebrâil öğleyi güneş zevale erince, ikinci gün gölge cismin boyu kadar olunca kıldırdı.'],
          ['Sahih Müslim 618', 'Peygamber ﷺ öğleyi güneş zevale erince kılardı.'],
          ['Sahih Müslim 612', 'Öğlenin vakti, ikindi girmedikçe kişinin gölgesi boyu kadar olana dektir.'],
          ['Sahih Buhârî 533, Sahih Müslim 615', 'Sıcak şiddetlenince öğleyi serinlikte kılın. Hanefî mezhebi bu yüzden yazın öğleyi geciktirir.'],
        ],
        j: [
          [MLYF + ', hadis 1-3', 'İmam Câfer es-Sâdık ve İmam Bâkır: güneş zevale erince öğle ve ikindinin vakti birlikte girer, önce öğle, güneş batana kadar sürer.'],
          [MLYF + ', hadis 4', 'Öğlenin faziletli vakti zevalden sonra gölge iki ayak oluncaya kadar, ikindininki bundan sonraki iki ayaktır.'],
          [MLYF + ', hadis 27', 'Peygamber ﷺ şiddetli sıcakta müezzine öğleyi biraz geciktirmesini söyledi.'],
          ['Sahih Müslim 705', 'İbn Abbâs: Peygamber ﷺ Medine’de korku ve yağmur olmadan öğle ile ikindiyi birleştirdi; ümmetini zora sokmamak için.'],
        ],
      },
      virtue: {
        s: [
          ['Ebû Dâvûd 1269, Tirmizî 428', 'Öğleden önce dört ve sonra dört rekâta devam edeni Allah ateşe haram kılar.'],
          ['Tirmizî 478', 'Zevalden sonra göğün kapıları açılır; Peygamber ﷺ o saatte salih bir amelinin yükselmesini severdi.'],
        ],
        j: [
          [MLYF + ', hadis 5', 'İmam Câfer es-Sâdık: namazın ilk vakti, güneşin zevali, Allah’ın en sevdiği ve en faziletli vakittir.'],
        ],
      },
      prayer: {
        s: [
          ['', '4 rekât farz. Hanefî: önce 4 sünnet, sonra 2. Şâfiî ve Hanbelî: önce 2, sonra 2 (önce 4 de sünnettir).'],
          ['Sahih Buhârî 1182', 'Hz. Âişe: Peygamber ﷺ öğleden önceki dört rekâtı hiç bırakmazdı.'],
          ['Sahih Müslim 728, Tirmizî 415', 'Günde on iki rekât sünnet cennette ev yapar: aralarında öğleden önce 4, sonra 2 vardır.'],
          ['Sahih Buhârî 1180', 'İbn Ömer öğleden önce 2 ve sonra 2 rekâtı hatırlıyordu.'],
          ['Kur’an 62:9', 'Cuma günü öğlenin yerine cuma (hutbeden sonra 2 rekât) kılınır.'],
        ],
        j: [
          ['', '4 rekât farz, öncesinde 8 rekât nafile.'],
          [MLYF + ', hadis 1', 'İmam Câfer es-Sâdık: güneş zevale erince vakit girmiştir; nafileni bitirince namazı kıl.'],
          [W46, 'Günlük namazlar 51 rekâttır, 17 farz ve 34 nafile.'],
          ['Kur’an 62:9', 'Cuma günü Caferî mezhebinde bugün cuma ve öğle ikisi de geçerli seçenektir.'],
        ],
      },
    },
    asr: {
      time: {
        s: [
          ['Ebû Dâvûd 393, Tirmizî 149', 'Cebrâil ikindiyi gölge cismin boyu kadar olunca kıldırdı. Şâfiî, Mâlikî ve Hanbelîler ikindiyi bu vakitte başlatır.'],
          ['Sahih Buhârî 557', 'İkindiden güneş batana kadarki süre günün en kısa kısmıdır. Ebû Hanîfe bundan ikindinin gölge iki katı olunca başladığını anlamıştır.'],
          ['Sahih Müslim 612', 'İkindinin vakti güneş sararıncaya kadardır.'],
          ['Sahih Buhârî 550', 'Peygamber ﷺ ikindiyi güneş henüz yüksek ve parlakken kılardı.'],
          ['Sahih Müslim 622', 'İkindiyi güneş sararıncaya kadar geciktirmek münafığın namazıdır.'],
        ],
        j: [
          [MLYF + ', hadis 2', 'İmam Câfer es-Sâdık: öğle ve ikindinin vakti öğlen birlikte girer, öğle ikindiden önce, güneş batana kadar.'],
          [MLYF + ', hadis 4', 'İkindinin faziletli vakti öğle vaktinden sonra gölgenin iki ayak daha uzamasıdır.'],
          [MLYF + ', hadis 9', 'İmam Bâkır: ikindiyi güneş henüz beyaz ve parlakken kıl.'],
        ],
      },
      virtue: {
        s: [
          ['Kur’an 2:238, Sahih Müslim 627', 'Namazlara ve orta namaza devam edin. Peygamber ﷺ orta namazın ikindi olduğunu söyledi.'],
          ['Sahih Buhârî 574, Sahih Müslim 635', 'İki serin vakit namazını (sabah ve ikindi) kılan cennete girer.'],
          ['Sahih Buhârî 552, Sahih Müslim 626', 'İkindi namazını kaçıran, ailesini ve malını kaybetmiş gibidir.'],
          ['Sahih Buhârî 553', 'İkindi namazını terk edenin ameli boşa gider.'],
        ],
        j: [
          ['Kur’an 2:238', 'Namazlara ve orta namaza devam edin.'],
          [MLYF + ', hadis 9', 'İmam Bâkır, ikindiyi zayi edenin cennetteki hayırdan mahrum kalacağı konusunda uyardı.'],
        ],
      },
      prayer: {
        s: [
          ['', '4 rekât farz; öncesindeki 4 rekât sünnet müstehaptır, müekked değildir.'],
          ['Ebû Dâvûd 1271, Tirmizî 430', 'İkindiden önce dört rekât kılana Allah rahmet etsin.'],
          ['Sahih Buhârî 350, Sahih Müslim 685', 'Namaz önce iki rekât farz kılındı ve yolculukta öyle kaldı; bu yüzden yolcu ikindiyi 2 rekât kılar.'],
        ],
        j: [
          ['', '4 rekât farz, öncesinde 8 rekât nafile.'],
          [W46, 'Günlük namazlar 51 rekâttır, 17 farz ve 34 nafile.'],
          ['Kur’an 4:101', 'Yolculukta namazı kısaltmanın sakıncası yoktur; ikindi 2 rekât olur.'],
        ],
      },
    },
    maghrib: {
      time: {
        s: [
          ['Sahih Buhârî 561, Sahih Müslim 636', 'Peygamber ﷺ akşamı güneş batıp gözden kaybolur kaybolmaz kılardı.'],
          ['Sahih Müslim 612', 'Akşamın vakti şafak kaybolana kadardır. Hanefî ve Hanbelîler buna göredir; Mâlikî mezhebi akşama kısa bir vakit verir.'],
          ['Ebû Dâvûd 418', 'Ümmetim akşamı yıldızlar görününceye kadar geciktirmedikçe hayır üzere kalır.'],
        ],
        j: [
          [MLYF + ', hadis 10', 'İmam Bâkır: akşamın vakti güneş kursu kaybolunca girer.'],
          ['Vesâilü’ş-Şîa, akşam vaktinin başlangıcı bölümü', 'Gün batımı doğudaki kızıllığın kaybolmasıyla anlaşılır; Caferî mezhebi bu yüzden güneş battıktan birkaç dakika sonrasını bekler.'],
          [MLYF + ', hadis 16', 'İmam Câfer es-Sâdık akşamı yıldızlar görününceye kadar geciktirmeyi kınadı.'],
          [MLYF + ', hadis 18', 'İmam Câfer es-Sâdık: güneş batınca iftar helal, akşam farz olur; yatsının vakti gece yarısına kadardır.'],
        ],
      },
      virtue: {
        s: [
          ['Ebû Dâvûd 418', 'Akşamı vaktinde kılmak ümmeti hayır üzere tutar.'],
          ['Sahih Müslim 728, Tirmizî 415', 'Akşamdan sonraki 2 rekât sünnet, cennette ev yapan on iki rekâttandır.'],
        ],
        j: [
          [MLYF + ', hadis 20', 'İmam Câfer es-Sâdık: akşamdan sonraki iki rekât illiyyîne yazılır, dört rekât makbul bir hac sevabındadır.'],
        ],
      },
      prayer: {
        s: [
          ['', '3 rekât farz, yolculukta da kısaltılmaz; sonrasında 2 rekât sünnet.'],
          ['Sahih Buhârî 1183', 'Akşamdan önce namaz kılın, dileyen için: ezandan sonra 2 kısa nafile caizdir.'],
        ],
        j: [
          ['', '3 rekât farz, yolculukta da kısaltılmaz; sonrasında 4 rekât nafile.'],
          [W46, 'Günlük namazlar 51 rekâttır, 17 farz ve 34 nafile.'],
        ],
      },
    },
    isha: {
      time: {
        s: [
          ['Sahih Müslim 612', 'Yatsının vakti gece yarısına kadardır.'],
          ['Sahih Müslim 638, Tirmizî 167', 'Ümmetime zor gelmeseydi yatsıyı gecenin üçte birine kadar geciktirmelerini emrederdim.'],
          ['Sahih Müslim 681', 'Kusur, namazı bir sonraki namazın vakti girene kadar geciktirmektir. Âlimlerin çoğuna göre yatsı sabaha kadar kılınabilir, fakat gece yarısından önce daha faziletlidir.'],
          ['', 'Âlimlerin çoğuna göre yatsı kırmızı şafak kaybolunca başlar; Ebû Hanîfe’ye göre beyaz şafak kaybolunca, bu da daha geçtir.'],
        ],
        j: [
          [MLYF + ', hadis 13', 'Bir rivayette yatsının vakti gecenin üçte birine kadardır.'],
          [MLYF + ', hadis 18', 'Yatsının vakti gece yarısına kadardır.'],
          [MLYF + ', hadis 14', 'Yatsıyı kılmadan gece yarısına kadar uyuyan kaza eder ve ertesi gün oruç tutar.'],
        ],
      },
      virtue: {
        s: [
          ['Sahih Müslim 656', 'Yatsıyı cemaatle kılan, gecenin yarısını namazla geçirmiş gibidir.'],
          ['Sahih Buhârî 657, Sahih Müslim 651', 'Münafıklara en ağır gelen namazlar yatsı ve sabahtır; sevabını bilselerdi emekleyerek de olsa gelirlerdi.'],
          ['Sahih Buhârî 568', 'Peygamber ﷺ yatsıdan önce uyumayı ve sonra konuşmayı hoş görmezdi.'],
        ],
        j: [
          [MLYF + ', hadis 19', 'İmam Bâkır, yatsıyı gece yarısından sonraya bırakana bir meleğin lanet ettiğini söyleyerek uyardı.'],
        ],
      },
      prayer: {
        s: [
          ['', '4 rekât farz, sonra 2 rekât sünnet, ardından vitir.'],
          ['Ebû Dâvûd 1422', 'Vitir haktır. Hanefî mezhebinde vitir vaciptir, 3 rekâttır.'],
          ['Sahih Müslim 752', 'Vitir gecenin sonunda bir rekâttır. Şâfiî, Mâlikî ve Hanbelîlere göre sünnettir, en az 1 rekât.'],
          ['Sahih Buhârî 998, Sahih Müslim 751', 'Gece namazınızın sonunu vitir yapın.'],
        ],
        j: [
          ['', '4 rekât farz, sonrasında oturarak 2 rekât nafile.'],
          [W46, 'İmam Câfer es-Sâdık: yatsıdan sonra oturarak kılınan 2 rekât nafile 1 sayılır.'],
        ],
      },
    },
    ishraq: {
      time: {
        s: [
          ['Sahih Müslim 831, 832', 'Güneş doğarken, yükselinceye kadar namaz kılmayın; bu yüzden işrak doğuştan yaklaşık 15 dakika sonra başlar.'],
          ['', 'Birçok âlim işrakı kuşluk vaktinin başı sayar.'],
        ],
        j: [['', 'Caferî mezhebinde ayrı bir işrak namazı yoktur. Güneş yükseldikten sonra müstehap namaz kılınabilir.']],
      },
      virtue: {
        s: [['Tirmizî 586', 'Sabahı cemaatle kılıp güneş doğana kadar oturarak Allah’ı zikreden, sonra iki rekât kılana hac ve umre sevabı vardır. Tirmizî hasen garîb demiştir; bazı âlimler zayıf sayar.']],
        j: [['', 'Caferî mezhebinde ayrı bir işrak namazı hakkındaki rivayete dayanılmaz.']],
      },
      prayer: {
        s: [['', '2 rekât veya 4.']],
        j: [['', 'Ayrı bir işrak namazı yoktur.']],
      },
    },
    chasht: {
      time: {
        s: [
          ['Sahih Müslim 748', 'Evvâbîn namazı, deve yavrularının sıcağı hissettiği vakittir: kuşluğun en faziletli vakti, günün yaklaşık dörtte biri.'],
          ['Sahih Müslim 831', 'Güneş tam tepedeyken zevale kadar namaz kılmayın; bu yüzden kuşluk öğleden biraz önce sona erer.'],
        ],
        j: [['', 'Ehl-i Beyt imamlarından gelen rivayetler kuşluk namazını bid’at olarak niteler; bu yüzden Caferî mezhebi onu müstehap namazlardan saymaz.']],
      },
      virtue: {
        s: [
          ['Sahih Müslim 720', 'Her sabah her eklem için sadaka gerekir; kuşluk vaktinde kılınan iki rekât buna yeter.'],
          ['Sahih Buhârî 1981, Sahih Müslim 721', 'Ebû Hüreyre: Dostum ﷺ bana her ay üç gün oruç tutmayı, iki rekât kuşluk namazını ve uyumadan önce vitir kılmayı tavsiye etti.'],
        ],
        j: [['', 'Caferî mezhebinde müstehap namazlardan değildir.']],
      },
      prayer: {
        s: [
          ['', 'En az 2 rekât.'],
          ['Sahih Müslim 719', 'Hz. Âişe: O ﷺ kuşluğu dört rekât ve Allah’ın dilediği kadar fazla kılardı.'],
          ['Sahih Buhârî 1176, Sahih Müslim 336', 'Ümmü Hânî: Mekke’nin fethi günü kuşluk vakti sekiz rekât kıldı.'],
        ],
        j: [['', 'Caferî mezhebinde ayrı bir namaz olarak kılınmaz.']],
      },
    },
    awwabin: {
      time: {
        s: [
          ['Kur’an 32:16, 51:17; Ebû Dâvûd 1322', 'Enes gece namazıyla ilgili bu ayetleri şöyle açıkladı: onlar akşam ile yatsı arasında namaz kılarlardı.'],
          ['Sahih Müslim 748', 'Bu hadiste “evvâbîn namazı” adı kuşluk için kullanılır; birçok âlim bu adı akşam ile yatsı arasındaki namaz için kullanır.'],
        ],
        j: [
          ['Sevâbü’l-A’mâl, s. 115', 'Gaflet saati akşam ile yatsı arasıdır (Gufeyle namazı).'],
          ['el-Urvetü’l-Vüská, c. 2, s. 246', 'Gufeyle akşamdan sonra, batıdaki kızıllık kaybolmadan kılınır.'],
        ],
      },
      virtue: {
        s: [['Tirmizî 435', 'Akşamdan sonra altı rekât on iki yıllık ibadete denktir. Tirmizî ve başkaları bu rivayeti çok zayıf saymıştır.']],
        j: [
          ['Sevâbü’l-A’mâl, s. 115', 'Peygamber ﷺ: gaflet saatinde nafile kılın, hafif iki rekât da olsa; onlar cennete götürür.'],
          ['Vesâilü’ş-Şîa, c. 8, s. 121', 'İmam Câfer es-Sâdık: akşam ile yatsı arasında bu iki rekâtı kılıp Allah’tan isteyene Allah istediğini verir.'],
        ],
      },
      prayer: {
        s: [['', 'Genellikle akşamın sünnetinden sonra ikişer ikişer 6 rekât; bu sayı yukarıdaki zayıf rivayete dayanır.']],
        j: [['el-Urvetü’l-Vüská, c. 2, s. 246-247', '2 rekât: birincide Fâtiha’dan sonra Kur’an 21:87-88, ikincide Kur’an 6:59.']],
      },
    },
    tahajjud: {
      time: {
        s: [
          ['Sahih Buhârî 1145, Sahih Müslim 758', 'Rabbimiz her gece, gecenin son üçte biri kaldığında dünya semasına iner ve buyurur: Bana kim dua eder ki ona icabet edeyim?'],
          ['Sahih Buhârî 1131, Sahih Müslim 1159', 'Allah’a en sevimli namaz Dâvûd’un namazıdır: gecenin yarısını uyur, üçte birini namazla geçirir, altıda birini uyurdu.'],
          ['Kur’an 73:20', 'Rabbin, senin gecenin üçte ikisine yakınını, yarısını ve üçte birini namazla geçirdiğini bilir.'],
        ],
        j: [['Men lâ yahduruhu’l-fakîh, c. 1, gece namazının vakti bölümü', 'Peygamber ﷺ yatsıdan sonra gece yarısına kadar namaz kılmazdı; gece namazı gece yarısından fecre kadardır, fecre yakın olanı daha faziletlidir.']],
      },
      virtue: {
        s: [
          ['Kur’an 17:79', 'Gecenin bir kısmında da sana mahsus nafile olarak teheccüd kıl; umulur ki Rabbin seni övülmüş bir makama ulaştırır.'],
          ['Kur’an 51:17-18', 'Geceleri az uyurlardı, seher vakitlerinde bağışlanma dilerlerdi.'],
          ['Kur’an 32:16', 'Yanları yataklardan uzaklaşır, Rablerine korku ve ümitle dua ederler.'],
          ['Sahih Müslim 1163', 'Farzlardan sonra en faziletli namaz gece namazıdır.'],
        ],
        j: [
          ['Kur’an 17:79', 'Gecenin bir kısmında da sana mahsus nafile olarak teheccüd kıl; umulur ki Rabbin seni övülmüş bir makama ulaştırır.'],
          ['Kur’an 73:1-4', 'Geceleyin namaza kalk, yarısını ya da biraz azını veya fazlasını; Kur’an’ı tane tane oku.'],
        ],
      },
      prayer: {
        s: [
          ['Sahih Buhârî 990, Sahih Müslim 749', 'Gece namazı ikişer ikişerdir; sabahın girmesinden korkarsan bir rekât vitir kıl.'],
          ['Sahih Buhârî 1147, Sahih Müslim 738', 'Hz. Âişe: O ﷺ ne Ramazan’da ne başka zamanda geceleri on bir rekâttan fazla kılmazdı.'],
        ],
        j: [
          ['', '11 rekât: 8, sonra 2 (şef’), sonra 1 (vitir).'],
          [W46, 'Günlük namazlar 51 rekâttır, 17 farz ve 34 nafile; gece namazı da bunlardandır.'],
        ],
      },
    },
  },
};
