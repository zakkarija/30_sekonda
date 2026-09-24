/**
 * Urdu word list.
 *
 * Distinct from the Hindi list rather than a transliteration of it: the script
 * differs, and so do many of the everyday references. Right-to-left: see isRTL
 * in ./index.ts.
 */
export const urduWords: string[] = [
  // کھانا پینا
  'بریانی',          // biryani
  'چائے',            // chai
  'سموسہ',           // samosa
  'نہاری',           // nihari
  'حلیم',            // haleem
  'گول گپے',         // pani puri
  'جلیبی',           // jalebi
  'پکوڑے',           // pakoras
  'لسی',             // lassi
  'کباب',            // kebab
  'نان',             // naan
  'کھیر',            // rice pudding
  'اچار',            // pickle
  'پراٹھا',          // paratha
  'قلفی',            // kulfi
  'چٹنی',            // chutney

  // تہوار اور رسمیں
  'عید',             // Eid
  'رمضان',           // Ramadan
  'سحری',            // pre-dawn meal
  'افطاری',          // breaking the fast
  'بارات',           // wedding procession
  'مہندی',           // henna ceremony
  'عیدی',            // eid money
  'پتنگ بازی',       // kite flying
  'بسنت',            // spring kite festival
  'ڈھول',            // dhol drum
  'مشاعرہ',          // poetry gathering
  'قوالی',           // qawwali

  // روزمرہ زندگی
  'رکشہ',            // rickshaw
  'ٹریفک جام',       // traffic jam
  'لوڈ شیڈنگ',       // power cut
  'مول تول',         // haggling
  'قطار',            // queue
  'چھت پر سونا',     // sleeping on the roof
  'دوپہر کی نیند',   // afternoon nap
  'سبزی منڈی',       // vegetable market
  'گھر بدلنا',       // moving house
  'پڑوسن آنٹی',      // nosy neighbour aunty
  'درزی',            // tailor
  'چوکیدار',         // watchman

  // لوگ
  'دادی',            // grandmother
  'حجام',            // barber
  'دانتوں کا ڈاکٹر', // dentist
  'امپائر',          // umpire
  'فائر مین',        // firefighter
  'ڈاکیا',           // postman
  'جادوگر',          // magician
  'گائیڈ',           // tour guide
  'پلمبر',           // plumber
  'مسخرہ',           // clown
  'استاد',           // teacher
  'نانبائی',         // baker

  // جانور
  'اونٹ',            // camel
  'ہاتھی',           // elephant
  'مور',             // peacock
  'بندر',            // monkey
  'پینگوئن',         // penguin
  'آکٹوپس',          // octopus
  'گلہری',           // squirrel
  'چمگادڑ',          // bat
  'تتلی',            // butterfly
  'چیونٹی',          // ant
  'مگرمچھ',          // crocodile
  'کبوتر',           // pigeon

  // جگہیں
  'کے ٹو',           // K2
  'بادشاہی مسجد',    // Badshahi Mosque
  'لائٹ ہاؤس',       // lighthouse
  'آتش فشاں',        // volcano
  'ویران جزیرہ',     // desert island
  'بھوت بنگلہ',      // haunted house
  'آبشار',           // waterfall
  'عجائب گھر',       // museum
  'رولر کوسٹر',      // rollercoaster
  'ساحل سمندر',      // beach
  'صحرا',            // desert
  'گلی',             // alley
  'ریلوے اسٹیشن',    // railway station
  'باغ',             // garden

  // حالات
  'ہچکی',            // hiccups
  'چھینک',           // sneeze
  'خراٹے',           // snoring
  'چابی گم ہونا',    // losing keys
  'دیر تک سونا',     // oversleeping
  'تحفہ لپیٹنا',     // wrapping a present
  'انٹرویو',         // job interview
  'ڈرائیونگ ٹیسٹ',   // driving test
  'سرپرائز پارٹی',   // surprise party
  'لفٹ میں پھنسنا',  // stuck in a lift
  'بارش میں بھیگنا', // getting soaked
  'جیٹ لیگ',         // jet lag

  // احساسات
  'پرانی یادیں',     // nostalgia
  'گھر کی یاد',      // homesickness
  'رونگٹے کھڑے ہونا', // goosebumps
  'پیٹ میں تتلیاں',  // butterflies
  'دھوپ سے جلنا',    // sunburn
  'پاؤں سن ہونا',    // pins and needles
  'ڈیجا وو',         // deja vu
  'اسٹیج کا خوف',    // stage fright
  'ہنسی کا دورہ',    // fit of laughter
  'میٹھے کی طلب',    // sweet craving

  // کھیل اور مشاغل
  'کرکٹ',            // cricket
  'ہاکی',            // hockey
  'کبڈی',            // kabaddi
  'اسکواش',          // squash
  'شطرنج',           // chess
  'کیرم',            // carrom
  'لڈو',             // ludo
  'میراتھن',         // marathon
  'یوگا',            // yoga
  'تیراکی',          // swimming
  'کراوکے',          // karaoke
  'باغبانی',         // gardening
  'چھپن چھپائی',     // hide and seek
  'سائیکل چلانا',    // cycling

  // ٹیکنالوجی
  'سیلفی',           // selfie
  'پوڈکاسٹ',         // podcast
  'ایموجی',          // emoji
  'وائی فائی پاس ورڈ', // wifi password
  'گروپ چیٹ',        // group chat
  'بیٹری ختم',       // dead battery
  'اسکرین شاٹ',      // screenshot
  'ویڈیو کال',       // video call
  'اسپیم',           // spam
  'فلائٹ موڈ',       // airplane mode
  'کیو آر کوڈ',      // QR code
  'آٹو کریکٹ',       // autocorrect

  // موسم اور قدرت
  'مون سون',         // monsoon
  'بجلی',            // lightning
  'دھنک',            // rainbow
  'لو',              // heatwave
  'دھند',            // fog
  'چاند رات',        // night before Eid
  'ٹوٹتا تارا',      // shooting star
  'کیچڑ',            // mud
  'ژالہ باری',       // hailstorm

  // چیزیں
  'چھتری',           // umbrella
  'الارم گھڑی',      // alarm clock
  'سوٹ کیس',         // suitcase
  'دھوپ کا چشمہ',    // sunglasses
  'چیونگم',          // chewing gum
  'ریموٹ',           // remote control
  'جھاڑو',           // broom
  'ٹوتھ برش',        // toothbrush
  'گلک',             // piggy bank
  'کیتلی',           // kettle
  'سیڑھی',           // ladder
  'آتش بازی',        // fireworks
  'ریت کا قلعہ',     // sandcastle
  'مونچھ',           // moustache
  'ٹیٹو',            // tattoo
  'خزانے کا نقشہ',   // treasure map
  'ٹائم مشین',       // time machine
];
