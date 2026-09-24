/**
 * Bengali word list.
 *
 * Written for both Bangladesh and West Bengal: আড্ডা, ইলিশ, দুর্গা পূজা and the
 * shared references a Bengali table recognises at once.
 */
export const bengaliWords: string[] = [
  // খাবার ও পানীয়
  'চা',              // tea
  'রসগোল্লা',        // rosogolla
  'ইলিশ মাছ',        // hilsa fish
  'বিরিয়ানি',        // biryani
  'সিঙাড়া',          // singara
  'মিষ্টি দই',        // sweet yoghurt
  'পান্তা ভাত',      // fermented rice
  'ফুচকা',           // fuchka
  'ভর্তা',           // mashed side dish
  'সন্দেশ',          // sondesh
  'খিচুড়ি',          // khichuri
  'পিঠা',            // rice cake
  'ডাল ভাত',         // dal and rice
  'আমের আচার',       // mango pickle
  'ঝালমুড়ি',         // spicy puffed rice
  'নারকেল',          // coconut

  // উৎসব ও রীতি
  'দুর্গা পূজা',     // Durga Puja
  'পহেলা বৈশাখ',     // Bengali new year
  'ঈদ',              // Eid
  'বিয়ের সানাই',     // wedding shehnai
  'গায়ে হলুদ',       // turmeric ceremony
  'আলপনা',           // floor art
  'ঢাকের বাদ্য',     // dhak drumming
  'মেলা',            // fair
  'নববর্ষের শোভাযাত্রা', // new year procession
  'সরস্বতী পূজা',    // Saraswati Puja
  'বইমেলা',          // book fair

  // দৈনন্দিন জীবন
  'আড্ডা',           // long friendly chat
  'রিকশা',           // rickshaw
  'লোকাল বাস',       // local bus
  'দরদাম',           // haggling
  'লোডশেডিং',        // power cut
  'যানজট',           // traffic jam
  'লাইনে দাঁড়ানো',   // queueing
  'ছাদে আড্ডা',      // rooftop hangout
  'দুপুরের ঘুম',      // afternoon nap
  'বাজার করা',       // going to market
  'বাড়ি বদল',        // moving house
  'কৌতূহলী প্রতিবেশী', // nosy neighbour

  // মানুষ
  'ঠাকুমা',          // grandmother
  'নাপিত',           // barber
  'দাঁতের ডাক্তার',  // dentist
  'রেফারি',          // referee
  'দমকলকর্মী',       // firefighter
  'ডাকপিয়ন',         // postman
  'জাদুকর',          // magician
  'গাইড',            // tour guide
  'মিস্ত্রি',        // plumber
  'জোকার',           // clown
  'দারোয়ান',         // watchman
  'শিক্ষক',          // teacher

  // প্রাণী
  'রয়েল বেঙ্গল টাইগার', // royal bengal tiger
  'হাতি',            // elephant
  'ময়ূর',            // peacock
  'পেঙ্গুইন',         // penguin
  'অক্টোপাস',        // octopus
  'কাঠবিড়ালি',       // squirrel
  'বাদুড়',           // bat
  'গাঙচিল',          // seagull
  'তিমি',            // whale
  'প্রজাপতি',        // butterfly
  'পিঁপড়া',          // ant
  'কুমির',           // crocodile

  // জায়গা
  'সুন্দরবন',        // Sundarbans
  'কক্সবাজার',       // Cox's Bazar
  'বাতিঘর',          // lighthouse
  'আগ্নেয়গিরি',      // volcano
  'নির্জন দ্বীপ',    // desert island
  'ভূতের বাড়ি',      // haunted house
  'ঝরনা',            // waterfall
  'জাদুঘর',          // museum
  'রোলার কোস্টার',   // rollercoaster
  'সমুদ্র সৈকত',     // beach
  'মরুভূমি',         // desert
  'গলি',             // alley
  'রেলস্টেশন',       // railway station
  'নদীর ঘাট',        // river ghat

  // পরিস্থিতি
  'হিক্কা',          // hiccups
  'হাঁচি',           // sneeze
  'নাক ডাকা',        // snoring
  'চাবি হারানো',     // losing keys
  'দেরি করে ঘুম',    // oversleeping
  'উপহার মোড়ানো',    // wrapping a present
  'চাকরির ইন্টারভিউ', // job interview
  'ড্রাইভিং টেস্ট',  // driving test
  'সারপ্রাইজ পার্টি', // surprise party
  'লিফটে আটকে যাওয়া', // stuck in a lift
  'বৃষ্টিতে ভেজা',   // getting soaked
  'জেট ল্যাগ',       // jet lag

  // অনুভূতি
  'নস্টালজিয়া',      // nostalgia
  'বাড়ির জন্য মন খারাপ', // homesickness
  'গায়ে কাঁটা দেওয়া', // goosebumps
  'পেটে প্রজাপতি',   // butterflies
  'রোদে পোড়া',       // sunburn
  'পা ঝিনঝিন',       // pins and needles
  'দেজা ভু',         // deja vu
  'মঞ্চভীতি',        // stage fright
  'হাসির দমক',       // fit of laughter
  'মিষ্টি খেতে ইচ্ছে', // sweet craving

  // খেলা ও শখ
  'ক্রিকেট',         // cricket
  'ফুটবল',           // football
  'কাবাডি',          // kabaddi
  'দাবা',            // chess
  'ক্যারম',          // carrom
  'লুডো',            // ludo
  'ম্যারাথন',        // marathon
  'যোগব্যায়াম',      // yoga
  'সাঁতার',          // swimming
  'কারাওকে',         // karaoke
  'বাগান করা',       // gardening
  'লুকোচুরি',        // hide and seek
  'সাইকেল চালানো',   // cycling
  'ঘুড়ি ওড়ানো',      // kite flying

  // প্রযুক্তি
  'সেলফি',           // selfie
  'পডকাস্ট',         // podcast
  'ইমোজি',           // emoji
  'ওয়াইফাই পাসওয়ার্ড', // wifi password
  'গ্রুপ চ্যাট',     // group chat
  'ব্যাটারি শেষ',    // dead battery
  'স্ক্রিনশট',       // screenshot
  'ভিডিও কল',        // video call
  'স্প্যাম',         // spam
  'ফ্লাইট মোড',      // airplane mode
  'কিউআর কোড',       // QR code
  'অটোকারেক্ট',      // autocorrect

  // আবহাওয়া ও প্রকৃতি
  'বর্ষা',           // monsoon
  'বজ্রপাত',         // lightning
  'রংধনু',           // rainbow
  'ঘূর্ণিঝড়',        // cyclone
  'কুয়াশা',          // fog
  'পূর্ণিমা',        // full moon
  'উল্কা',           // shooting star
  'কাদা',            // mud
  'তাপপ্রবাহ',       // heatwave

  // জিনিসপত্র
  'ছাতা',            // umbrella
  'অ্যালার্ম ঘড়ি',   // alarm clock
  'সুটকেস',          // suitcase
  'রোদচশমা',         // sunglasses
  'চুইংগাম',         // chewing gum
  'রিমোট',           // remote control
  'ঝাড়ু',            // broom
  'টুথব্রাশ',        // toothbrush
  'মাটির ব্যাংক',    // piggy bank
  'কেটলি',           // kettle
  'মই',              // ladder
  'আতশবাজি',         // fireworks
  'বালির দুর্গ',     // sandcastle
  'গোঁফ',            // moustache
  'ট্যাটু',          // tattoo
  'গুপ্তধনের নকশা',   // treasure map
  'টাইম মেশিন',      // time machine
];
