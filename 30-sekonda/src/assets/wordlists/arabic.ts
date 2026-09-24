/**
 * Arabic word list (Modern Standard Arabic).
 *
 * Kept to vocabulary and references that travel across the Arab world rather
 * than one dialect or country. Right-to-left: see isRTL in ./index.ts.
 */
export const arabicWords: string[] = [
  // طعام وشراب
  'فلافل',           // falafel
  'حمص',             // hummus
  'شاورما',          // shawarma
  'كنافة',           // kunafa
  'تبولة',           // tabbouleh
  'منسف',            // mansaf
  'مقلوبة',          // maqluba
  'بقلاوة',          // baklava
  'تمر',             // dates
  'قهوة عربية',      // arabic coffee
  'شاي بالنعناع',    // mint tea
  'خبز طازج',        // fresh bread
  'مشاوي',           // grilled meats
  'عصير ليمون',      // lemonade
  'فول',             // fava beans
  'أرز بالحليب',     // rice pudding

  // عادات ومناسبات
  'رمضان',           // Ramadan
  'عيد الفطر',       // Eid al-Fitr
  'سحور',            // pre-dawn meal
  'إفطار',           // breaking the fast
  'عرس',             // wedding
  'دبكة',            // dabke dance
  'زغاريد',          // ululation
  'مجلس',            // sitting room gathering
  'ضيافة',           // hospitality
  'سوق',             // market
  'عيدية',           // eid money for children
  'حناء',            // henna

  // الحياة اليومية
  'زحمة سير',        // traffic jam
  'فصال',            // haggling
  'انقطاع الكهرباء', // power cut
  'قيلولة',          // afternoon nap
  'طابور',           // queue
  'سطح البيت',       // rooftop
  'جيران فضوليون',   // nosy neighbours
  'نقل أثاث',        // moving house
  'مفتاح ضائع',      // lost key
  'مقهى',            // cafe

  // أشخاص
  'جدة',             // grandmother
  'حلاق',            // barber
  'طبيب أسنان',      // dentist
  'حكم',             // referee
  'إطفائي',          // firefighter
  'ساعي البريد',     // postman
  'ساحر',            // magician
  'مرشد سياحي',      // tour guide
  'سباك',            // plumber
  'مهرج',            // clown
  'حارس',            // guard
  'خباز',            // baker

  // حيوانات
  'جمل',             // camel
  'صقر',             // falcon
  'بطريق',           // penguin
  'أخطبوط',          // octopus
  'قنفذ',            // hedgehog
  'خفاش',            // bat
  'سنجاب',           // squirrel
  'نورس',            // seagull
  'حوت',             // whale
  'فراشة',           // butterfly
  'نملة',            // ant
  'طاووس',           // peacock

  // أماكن
  'صحراء',           // desert
  'واحة',            // oasis
  'منارة',           // lighthouse
  'بركان',           // volcano
  'جزيرة مهجورة',    // desert island
  'بيت مسكون',       // haunted house
  'شلال',            // waterfall
  'متحف',            // museum
  'أفعوانية',        // rollercoaster
  'شاطئ',            // beach
  'قلعة',            // fortress
  'زقاق',            // alley
  'محطة قطار',       // train station
  'حديقة عامة',      // public park

  // مواقف
  'دوار السفر',      // travel sickness
  'فواق',            // hiccups
  'عطسة',            // sneeze
  'شخير',            // snoring
  'ضياع المفاتيح',   // losing keys
  'النوم الزائد',    // oversleeping
  'تغليف هدية',      // wrapping a present
  'مقابلة عمل',      // job interview
  'امتحان القيادة',  // driving test
  'حفلة مفاجئة',     // surprise party
  'عالق في المصعد',  // stuck in a lift
  'المطر المفاجئ',   // sudden rain

  // مشاعر
  'حنين',            // nostalgia
  'الشوق للوطن',     // homesickness
  'قشعريرة',         // goosebumps
  'فراشات في المعدة', // butterflies
  'حروق الشمس',      // sunburn
  'تنميل',           // pins and needles
  'ديجا فو',         // deja vu
  'رهبة المسرح',     // stage fright
  'نوبة ضحك',        // fit of laughter
  'اشتهاء الحلويات', // sweet craving

  // رياضة وهوايات
  'كرة القدم',       // football
  'ماراثون',         // marathon
  'يوغا',            // yoga
  'كاراتيه',         // karate
  'سباحة',           // swimming
  'غوص',             // diving
  'شطرنج',           // chess
  'طاولة',           // backgammon
  'كاريوكي',         // karaoke
  'صيد السمك',       // fishing
  'بستنة',           // gardening
  'الغميضة',         // hide and seek
  'ركوب الدراجة',    // cycling

  // تقنية
  'سيلفي',           // selfie
  'بودكاست',         // podcast
  'إيموجي',          // emoji
  'كلمة سر الواي فاي', // wifi password
  'محادثة جماعية',   // group chat
  'البطارية فارغة',  // dead battery
  'لقطة شاشة',       // screenshot
  'مكالمة فيديو',    // video call
  'بريد مزعج',       // spam
  'وضع الطيران',     // airplane mode
  'رمز الاستجابة',   // QR code
  'التصحيح التلقائي', // autocorrect

  // طقس وطبيعة
  'برق',             // lightning
  'إعصار',           // tornado
  'قوس قزح',         // rainbow
  'موجة حر',         // heatwave
  'عاصفة رملية',     // sandstorm
  'ضباب',            // fog
  'قمر مكتمل',       // full moon
  'شهاب',            // shooting star
  'بركة ماء',        // puddle
  'رجل الثلج',       // snowman

  // أشياء
  'مظلة',            // umbrella
  'منبه',            // alarm clock
  'حقيبة سفر',       // suitcase
  'نظارة شمسية',     // sunglasses
  'علكة',            // chewing gum
  'جهاز التحكم',     // remote control
  'مكنسة',           // broom
  'فرشاة أسنان',     // toothbrush
  'حصالة',           // piggy bank
  'غلاية',           // kettle
  'سلم',             // ladder
  'ألعاب نارية',     // fireworks
  'قلعة رملية',      // sandcastle
  'شارب',            // moustache
  'وشم',             // tattoo
  'خريطة كنز',       // treasure map
  'آلة الزمن',       // time machine
];
