/**
 * Russian word list.
 *
 * Written natively: дача, баня, ёлка and the winter rituals a Russian-speaking
 * table recognises instantly. Transliteration in comments is for maintainers.
 */
export const russianWords: string[] = [
  // Еда и напитки
  'Борщ',            // borscht
  'Пельмени',        // dumplings
  'Блины',           // pancakes
  'Оливье',          // olivier salad
  'Шашлык',          // shashlik
  'Солёные огурцы',  // pickled cucumbers
  'Сгущёнка',        // condensed milk
  'Квас',            // kvass
  'Сырники',         // curd pancakes
  'Селёдка под шубой', // herring under a fur coat
  'Гречка',          // buckwheat
  'Пирожки',         // pies
  'Варенье',         // fruit preserve
  'Чай с лимоном',   // tea with lemon
  'Мороженое',       // ice cream
  'Самовар',         // samovar

  // Традиции и быт
  'Дача',            // country cottage
  'Баня',            // bathhouse
  'Ёлка',            // new year tree
  'Дед Мороз',       // Father Frost
  'Масленица',       // Maslenitsa
  'Субботник',       // community clean-up day
  'Очередь',         // queue
  'Тапочки',         // house slippers
  'Валенки',         // felt boots
  'Матрёшка',        // nesting doll
  'Балалайка',       // balalaika
  'Гармошка',        // accordion
  'Сервант',         // display cabinet
  'Ковёр на стене',  // carpet on the wall

  // Люди
  'Бабушка',         // grandmother
  'Сосед сверху',    // upstairs neighbour
  'Вахтёр',          // doorman
  'Стоматолог',      // dentist
  'Судья на поле',   // referee
  'Парикмахер',      // hairdresser
  'Пожарный',        // firefighter
  'Почтальон',       // postman
  'Фокусник',        // magician
  'Экскурсовод',     // tour guide
  'Сантехник',       // plumber
  'Клоун',           // clown

  // Животные
  'Медведь',         // bear
  'Пингвин',         // penguin
  'Осьминог',        // octopus
  'Ленивец',         // sloth
  'Ёжик',            // hedgehog
  'Летучая мышь',    // bat
  'Белка',           // squirrel
  'Чайка',           // seagull
  'Кит',             // whale
  'Бабочка',         // butterfly
  'Муравей',         // ant
  'Лиса',            // fox

  // Места
  'Маяк',            // lighthouse
  'Вулкан',          // volcano
  'Необитаемый остров', // desert island
  'Дом с привидениями', // haunted house
  'Водопад',         // waterfall
  'Музей',           // museum
  'Американские горки', // rollercoaster
  'Рынок',           // market
  'Пляж',            // beach
  'Пустыня',         // desert
  'Метро',           // metro
  'Чердак',          // attic
  'Гараж',           // garage
  'Подъезд',         // stairwell entrance

  // Ситуации
  'Похмелье',        // hangover
  'Джетлаг',         // jet lag
  'Икота',           // hiccups
  'Чихание',         // sneezing
  'Храп',            // snoring
  'Потерять ключи',  // losing keys
  'Проспать',        // oversleeping
  'Стоять в пробке', // sitting in traffic
  'Парковка задним ходом', // reverse parking
  'Упаковать подарок', // wrapping a present
  'Свидание вслепую', // blind date
  'Собеседование',   // job interview
  'Переезд',         // moving house
  'Экзамен по вождению', // driving test
  'Сюрприз на день рождения', // birthday surprise
  'Застрять в лифте', // stuck in a lift

  // Ощущения
  'Ностальгия',      // nostalgia
  'Тоска по дому',   // homesickness
  'Мурашки',         // goosebumps
  'Бабочки в животе', // butterflies
  'Солнечный ожог',  // sunburn
  'Затекла нога',    // pins and needles
  'Дежавю',          // deja vu
  'Страх сцены',     // stage fright
  'Смех сквозь слёзы', // laughing through tears
  'Хочется сладкого', // sweet craving

  // Спорт и хобби
  'Хоккей',          // hockey
  'Футбол',          // football
  'Марафон',         // marathon
  'Йога',            // yoga
  'Карате',          // karate
  'Шахматы',         // chess
  'Караоке',         // karaoke
  'Рыбалка',         // fishing
  'Грибы собирать',  // mushroom picking
  'Вязание',         // knitting
  'Коньки',          // ice skates
  'Лыжи',            // skis
  'Дартс',           // darts
  'Прятки',          // hide and seek

  // Техника
  'Селфи',           // selfie
  'Подкаст',         // podcast
  'Эмодзи',          // emoji
  'Пароль от вайфая', // wifi password
  'Общий чат',       // group chat
  'Разрядился телефон', // dead battery
  'Скриншот',        // screenshot
  'Видеозвонок',     // video call
  'Спам',            // spam
  'Режим полёта',    // airplane mode
  'QR-код',          // QR code
  'Автозамена',      // autocorrect

  // Погода и природа
  'Молния',          // lightning
  'Торнадо',         // tornado
  'Радуга',          // rainbow
  'Снеговик',        // snowman
  'Жара',            // heatwave
  'Гололёд',         // black ice
  'Полнолуние',      // full moon
  'Падающая звезда', // shooting star
  'Лужа',            // puddle
  'Туман',           // fog
  'Метель',          // blizzard

  // Вещи
  'Зонт',            // umbrella
  'Будильник',       // alarm clock
  'Чемодан',         // suitcase
  'Солнечные очки',  // sunglasses
  'Жвачка',          // chewing gum
  'Пульт',           // remote control
  'Пылесос',         // vacuum cleaner
  'Зубная щётка',    // toothbrush
  'Копилка',         // piggy bank
  'Чайник',          // kettle
  'Батут',           // trampoline
  'Пузырчатая плёнка', // bubble wrap
  'Лестница',        // ladder
  'Фейерверк',       // fireworks
  'Песочный замок',  // sandcastle
  'Усы',             // moustache
  'Татуировка',      // tattoo
  'Карта сокровищ',  // treasure map
  'Машина времени',  // time machine
];
