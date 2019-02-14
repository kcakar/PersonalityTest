const models=require('../models');

console.log("INITTTT")
console.log("INITTTT")
console.log("INITTTT")
console.log("INITTTT")
console.log("INITTTT")
console.log("INITTTT")
console.log("INITTTT")
console.log("INITTTT")
console.log("INITTTT")
console.log("INITTTT")
console.log("INITTTT")
console.log("INITTTT")
console.log("INITTTT")
console.log("INITTTT")
console.log("INITTTT")
console.log("INITTTT")
console.log("INITTTT")
console.log("INITTTT")
console.log("INITTTT")
const shuffled = [{
    "text": "Melankoli hiç yabancısı olmadığım ve zaman zaman yaşamaktan haz aldığım bir haldir.",
    "order": 1,
    "personalityType": 4,
    "language":"tr"
}, {
    "text": "İnsanların çoğu bana sığ ve duygu derinliğinden yoksun görünür bu yüzden kendimi çoğu zaman yabancı ve uyumsuz hissederim.",
    "order": 2,
    "personalityType": 4,
    "language":"tr"
}, {
    "text": "Duygularımın ve ilişkilerimin hedeflerime ulaşmaktan beni alıkoymasına izin vermem.",
    "order": 3,
    "personalityType": 3,
    "language":"tr"
}, {
    "text": "Bir grup içinde uyumu bozmamak adına çoğunluğuna uymayı tercih ederim.",
    "order": 4,
    "personalityType": 9,
    "language":"tr"
}, {
    "text": "Daha fazla zaman alsa da yaptığım işi tam ve kusursuz olarak yaparım.",
    "order": 5,
    "personalityType": 1,
    "language":"tr"
}, {
    "text": "Çevremde duygusal desteğe ihtiyaç duyan insanlar benim onlara yardımcı olacağımı bilirler.",
    "order": 6,
    "personalityType": 2,
    "language":"tr"
}, {
    "text": "Hedefime ulaşmak konusunda sürekli şartları değerlendirip kendimi buna göre kolayca şekillendiririm.",
    "order": 7,
    "personalityType": 3,
    "language":"tr"
}, {
    "text": "İlişkilerinde kontrolcü olmayan, insanları olduğu gibi kabullenen, sakin ve geçinilmesi kolay biriyim.",
    "order": 8,
    "personalityType": 9,
    "language":"tr"
}, {
    "text": "İnsanların ihtiyaçlarına karşı çok duyarlıyım, yardım ve destek konusunda elimden ne geliyorsa yaparım.",
    "order": 9,
    "personalityType": 2,
    "language":"tr"
}, {
    "text": "Oldukça kaygılı ve düşünceli olup desteksiz ve yalnız kalmaktan korkarım.",
    "order": 10,
    "personalityType": 6,
    "language":"tr"
}, {
    "text": "Huzurumu bozup ve gerilim yaratmaktansa uyumlu ve taviz vermeye eğilimli biriyim.",
    "order": 11,
    "personalityType": 9,
    "language":"tr"
}, {
    "text": "Pratik zekâm ve hazır cevap olmam nedeniyle bulunduğum ortama neşe ve canlılık katmakta yetenekliyim.",
    "order": 12,
    "personalityType": 7,
    "language":"tr"
}, {
    "text": "Çevremdekileri mutlu etmek için elimden geleni yaparım, aynı samimiyet ve duyarlılığı bulamadığımda duygusal olarak kırılırım.",
    "order": 13,
    "personalityType": 2,
    "language":"tr"
}, {
    "text": "Sıkıcı ve monoton hale gelen ortamları hemen terk etmek veya hareketlendirmek isterim.",
    "order": 14,
    "personalityType": 7,
    "language":"tr"
}, {
    "text": "Aklıma takılan her konuda işin kaynağına ulaşıp derinlemesine analiz ederek kendi sonuçlarımı elde ederim.",
    "order": 15,
    "personalityType": 5,
    "language":"tr"
}, {
    "text": "Bana zararı dokunsa da objektif değerlendirip olması gerekeni yaparım.",
    "order": 16,
    "personalityType": 1,
    "language":"tr"
}, {
    "text": "İnsanlara güvenmek istesem de çoğunlukla onların niyetlerini sorguluyorum.",
    "order": 17,
    "personalityType": 6,
    "language":"tr"
}, {
    "text": "Arkadaşlarımla olsam bile çoğunlukla kendimi yalnız ve tam olarak anlaşılmamış hissederim.",
    "order": 18,
    "personalityType": 4,
    "language":"tr"
}, {
    "text": "Hakkımı ve sevdiklerimi korumak benim için çok önemlidir. Bunun için her türlü çatışmaya girmekten çekinmem.",
    "order": 19,
    "personalityType": 8,
    "language":"tr"
}, {
    "text": "Duygularımı ifade etmeyi severim, ifade etmeyen insanlardan hoşlanmam.",
    "order": 20,
    "personalityType": 2,
    "language":"tr"
}, {
    "text": "Küçük bir terslik ve olumsuzluk olduğunda en kötü senaryoları zihnimde canlandırırım.",
    "order": 21,
    "personalityType": 6,
    "language":"tr"
}, {
    "text": "Zihnim çok hızlı çalışır farklı konular arasında bağlantılar kurar ve hızlı geçişler yapabilirim.",
    "order": 22,
    "personalityType": 7,
    "language":"tr"
}, {
    "text": "Çevremdeki insanlara oranla daha öfkeli ve zorlayıcı olmaya eğilimliyim. Dobra ve sözünü esirgemeyen biriyim.",
    "order": 23,
    "personalityType": 8,
    "language":"tr"
}, {
    "text": "Duygusallığı ve insanlardaki duygusal değişimleri anlamakta zorlanırım.",
    "order": 24,
    "personalityType": 5,
    "language":"tr"
}, {
    "text": "Kararsızlığa çokça meyilli biriyim, gerilimli durumlarda karar vermektense ertelemeyi tercih ederim.",
    "order": 25,
    "personalityType": 9,
    "language":"tr"
}, {
    "text": "Herhangi bir tehlike ve zorlayıcı durumda mücadeleden ve çatışmaktan asla çekinmeden korkusuzca olayın üstüne giderim.",
    "order": 26,
    "personalityType": 8,
    "language":"tr"
}, {
    "text": "Bulunduğum ortamda lider yok ya da  zayıf ise, idareyi hemen ele alırım.",
    "order": 27,
    "personalityType": 8,
    "language":"tr"
}, {
    "text": "İstemediğim bir şey olduğunda bunun için çatışma ve yüzleşmeyi değil, uzlaşmayı veya kendimi izole etmeyi tercih ederim.",
    "order": 28,
    "personalityType": 9,
    "language":"tr"
}, {
    "text": "Olabildiğince detaylı plan yapar adım adım ilerlerim, aksaklık çıktığında kızgınlık hissederim.",
    "order": 29,
    "personalityType": 1,
    "language":"tr"
}, {
    "text": "Yardımsever, merhametli, çabuk duygulanan, sahiplenici birisiyim.",
    "order": 30,
    "personalityType": 2,
    "language":"tr"
}, {
    "text": "Birkaç şeyi aynı anda düşünüp birkaç şeyi aynı anda yapabilirim.",
    "order": 31,
    "personalityType": 7,
    "language":"tr"
}, {
    "text": "Sevdiğim ve önemsediğim arkadaşlarıma benim için ne kadar kıymetli olduklarını nasıl hissettirebileceğimi bilir ve gösteririm.",
    "order": 32,
    "personalityType": 2,
    "language":"tr"
}, {
    "text": "Çok akılcı, mantık odaklı ve duygusallıktan uzak biriyim.",
    "order": 33,
    "personalityType": 5,
    "language":"tr"
}, {
    "text": "İş konusunda (benden bekleneni) bana düşeni yapmak, kendi inisiyatifimle adım atıp risk almaktan daha güvende hissettirir.",
    "order": 34,
    "personalityType": 6,
    "language":"tr"
}, {
    "text": "Sosyal ortamlarda gözlemci olmayı ve analiz etmeyi tercih ederim, mecbur kalmadıkça müdahale etmem.",
    "order": 35,
    "personalityType": 5,
    "language":"tr"
}, {
    "text": "Yaptığım işleri etkileyici bir şekilde sunmakta ve hayranlık uyandırmakta oldukça yetenekliyimdir.",
    "order": 36,
    "personalityType": 3,
    "language":"tr"
}, {
    "text": "Yaptığım şeylere kendi estetik bakış açımı katıp sıradanlıktan kurtarmak isterim.",
    "order": 37,
    "personalityType": 4,
    "language":"tr"
}, {
    "text": "Hata ve eksiklerden rahatsız olurum mümkünse mutlaka düzeltirim.",
    "order": 38,
    "personalityType": 1,
    "language":"tr"
}, {
    "text": "İnsanları etkilemek ve iyi izlenim bırakmaktan hoşlanırım ve bu konuda nasıl başarılı olacağımı iyi bilirim.",
    "order": 39,
    "personalityType": 3,
    "language":"tr"
}, {
    "text": "Acıdan kaçmak yerine o hali tümüyle yaşar, o durumlardan kendime ve hayata dair anlamlar çıkarmaya çalışırım.",
    "order": 40,
    "personalityType": 4,
    "language":"tr"
}, {
    "text": "Hızlı harekete geçmekte zorlanan, yavaş ve sakin biriyim. İşleri ertelemeye eğilimli bir yapım var ancak son ana geldiğimde harekete geçerim.",
    "order": 41,
    "personalityType": 9,
    "language":"tr"
}, {
    "text": "Hayatta başarılarımla var olduğuma inanırım, başarısız olmayı kabul edemem.",
    "order": 42,
    "personalityType": 3,
    "language":"tr"
}, {
    "text": "Hayatı keyifli ve neşeli yaşamak varken neden sıkıntı ve acı çekeyim.",
    "order": 43,
    "personalityType": 7,
    "language":"tr"
}, {
    "text": "Pasif, kararsız ve çekingen insanları ciddiye almam. Kolay kolay pes etmeyen, güçlü ve bağımsız insanlara saygı duyarım.",
    "order": 44,
    "personalityType": 8,
    "language":"tr"
}, {
    "text": "Eleştirildiğimde aşırı gerginleşirim, o anda tehlikede olduğumu hisseder ve savunmaya geçerim.",
    "order": 45,
    "personalityType": 6,
    "language":"tr"
}, {
    "text": "Sıra dışı, ilginç ve yeni şeyleri deneyip keşfederek yaşamıma heyecan, macera ve keyif katarım.",
    "order": 46,
    "personalityType": 7,
    "language":"tr"
}, {
    "text": "Başarı için çalışmak kadar imaj da önemlidir.",
    "order": 47,
    "personalityType": 3,
    "language":"tr"
}, {
    "text": "Başkaları için değil olması gereken ideal ve standartlara ulaşmak için kendimi geliştiririm.",
    "order": 48,
    "personalityType": 1,
    "language":"tr"
}, {
    "text": "Gerektiğinde hislerimi gizlemek ve gereken his neyse onu gösterme konusunda yetenekliyimdir ve bunu kolaylıkla yaparım.",
    "order": 49,
    "personalityType": 3,
    "language":"tr"
}, {
    "text": "Bir şey ilgimi çektiğinde anlayana kadar derinlemesine araştırırım.",
    "order": 50,
    "personalityType": 5,
    "language":"tr"
}, {
    "text": "Uzun süre aynı şeye odaklanmakta zorlanan, konudan konuya atlayabilen biriyim.",
    "order": 51,
    "personalityType": 7,
    "language":"tr"
}, {
    "text": "İnsanların acizlik ve duygusal zayıflık göstermelerine tahammül edemem.",
    "order": 52,
    "personalityType": 8,
    "language":"tr"
}, {
    "text": "İlgi, sevgi ve değer görmekten çok hoşlanırım, bulamadığımda bu beni rahatsız eder.",
    "order": 53,
    "personalityType": 2,
    "language":"tr"
}, {
    "text": "Hızlı ve pratik düşünen, heyecanlı yaşayıp hayatın tadını çıkarmayı seven biriyim.",
    "order": 54,
    "personalityType": 7,
    "language":"tr"
}, {
    "text": "İnsanları anlamak ve kendimi anlatmak benim için önemlidir ancak bu durum beni durum zaman zaman beni çok yorar.",
    "order": 55,
    "personalityType": 4,
    "language":"tr"
}, {
    "text": "Beni zorlamadıkları sürece doğru bulmasam da, herkesi olduğu gibi kabul ederim.",
    "order": 56,
    "personalityType": 9,
    "language":"tr"
}, {
    "text": "Ufak bir ima ve olumsuzluk sezdiğim zaman insanların asıl niyetleri konusunda şüphelenirim ve temkinli davranırırım.",
    "order": 57,
    "personalityType": 6,
    "language":"tr"
}, {
    "text": "Himayesindeki kişilere koruyucu ve yönlendirici olan, her tür zorluklara dayanıklı, hızlı ve cesur kararlar alan biriyim.",
    "order": 58,
    "personalityType": 8,
    "language":"tr"
}, {
    "text": "Zamanımı ve enerjimi çoğunlukla kendime ayırırım, çevremdekilerden beklentim yok denecek kadar azdır.",
    "order": 59,
    "personalityType": 5,
    "language":"tr"
}, {
    "text": "Kural ve prosedürleri önemserim, insanların bu konudaki duyarsızlığından çok rahatsız olurum.",
    "order": 60,
    "personalityType": 1,
    "language":"tr"
}, {
    "text": "Kendimi bulmak ve anlamak temel arayışlarımdandır ve bu konuda duygusal dürüstlük benim için önemlidir.",
    "order": 61,
    "personalityType": 4,
    "language":"tr"
}, {
    "text": "Şüpheli, öngörülemeyen veya yolunda gitmeyen durumlar hemen dikkatimi çeker. Bu durumda tedirgin ve endişeli olurum.",
    "order": 62,
    "personalityType": 6,
    "language":"tr"
}, {
    "text": "Hayatı anlamanın ancak bilgiyle mümkün olacağına inanırım.",
    "order": 63,
    "personalityType": 5,
    "language":"tr"
}];

models.question.count().then(c=>{
    if(c<=0)
    {
        models.question.bulkCreate(shuffled)
        .then(r=>{
            console.log("questions created");
        })
        .catch(err=>{
            console.log("question creation failure")
        })
    }
    else{
        console.log("question already there")
    }
});


let user=models.user.build({
    email:"kcakar",
    name:"Keremcan Çakar",
    password:"kerempass",
    title:"Web Developer",
    testDate:null,
    personalityType:"-1",
    wingType:"-1",
    role:"admin"
});

models.user.getHashPassword(user.password)
.then(hashedPassword=>{
    user.password=hashedPassword;
    return user;
})
.then(user=>user.save())
.catch(err=>{console.log("couldntsavefirstuser")});

