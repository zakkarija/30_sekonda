/**
 * Hindi word list (Devanagari).
 *
 * Written natively: चाय, जुगाड़, बारात and the everyday references an Indian
 * table gets at once. Romanisation in comments is for maintainers.
 */
export const hindiWords: string[] = [
  // खाना-पीना
  'समोसा',           // samosa
  'चाय',             // chai
  'बिरयानी',         // biryani
  'गोलगप्पा',        // pani puri
  'जलेबी',           // jalebi
  'पकौड़ा',           // pakora
  'लस्सी',           // lassi
  'दाल चावल',        // dal rice
  'छोले भटूरे',      // chole bhature
  'गुलाब जामुन',     // gulab jamun
  'अचार',            // pickle
  'पराठा',           // paratha
  'कुल्फ़ी',          // kulfi
  'नारियल पानी',     // coconut water
  'चटनी',            // chutney
  'टिफ़िन',           // tiffin box

  // त्योहार और रिवाज़
  'दिवाली',          // Diwali
  'होली',            // Holi
  'राखी',            // Rakhi
  'बारात',           // wedding procession
  'मेहंदी',          // henna
  'पतंगबाज़ी',        // kite flying
  'गरबा',            // garba dance
  'आरती',            // aarti
  'ईद',              // Eid
  'दशहरा',           // Dussehra
  'शादी का खाना',    // wedding feast
  'नज़र उतारना',      // warding off the evil eye

  // रोज़मर्रा की ज़िंदगी
  'जुगाड़',           // improvised fix
  'ऑटो रिक्शा',      // auto rickshaw
  'लोकल ट्रेन',      // local train
  'मोलभाव',          // haggling
  'बिजली कटौती',     // power cut
  'ट्रैफ़िक जाम',     // traffic jam
  'लाइन में लगना',   // standing in a queue
  'छत पर सोना',      // sleeping on the roof
  'प्रेस वाला',       // ironing man
  'सब्ज़ी मंडी',      // vegetable market
  'दोपहर की नींद',   // afternoon nap
  'घर बदलना',        // moving house

  // लोग
  'दादी',            // grandmother
  'पड़ोसी आंटी',      // nosy neighbour aunty
  'चौकीदार',         // watchman
  'डॉक्टर',          // doctor
  'अंपायर',          // umpire
  'नाई',             // barber
  'फ़ायरमैन',         // firefighter
  'डाकिया',          // postman
  'जादूगर',          // magician
  'गाइड',            // tour guide
  'प्लंबर',          // plumber
  'जोकर',            // clown

  // जानवर
  'हाथी',            // elephant
  'बंदर',            // monkey
  'मोर',             // peacock
  'ऊँट',             // camel
  'पेंगुइन',         // penguin
  'ऑक्टोपस',         // octopus
  'गिलहरी',          // squirrel
  'चमगादड़',          // bat
  'तितली',           // butterfly
  'चींटी',           // ant
  'मगरमच्छ',         // crocodile
  'कबूतर',           // pigeon

  // जगहें
  'ताजमहल',          // Taj Mahal
  'हिमालय',          // Himalayas
  'लाइटहाउस',        // lighthouse
  'ज्वालामुखी',      // volcano
  'सुनसान द्वीप',    // desert island
  'भूतिया घर',       // haunted house
  'झरना',            // waterfall
  'म्यूज़ियम',        // museum
  'रोलर कोस्टर',     // rollercoaster
  'समुद्र तट',       // beach
  'रेगिस्तान',       // desert
  'गली',             // narrow lane
  'छत',              // rooftop
  'रेलवे स्टेशन',    // railway station

  // हालात
  'हैंगओवर',         // hangover
  'जेट लैग',         // jet lag
  'हिचकी',           // hiccups
  'छींक',            // sneeze
  'खर्राटे',         // snoring
  'चाबी खोना',       // losing keys
  'देर तक सोना',     // oversleeping
  'गिफ़्ट लपेटना',    // wrapping a present
  'इंटरव्यू',         // job interview
  'ड्राइविंग टेस्ट',  // driving test
  'सरप्राइज़ पार्टी', // surprise party
  'लिफ़्ट में फँसना',  // stuck in a lift
  'बारिश में भीगना', // getting soaked in the rain

  // एहसास
  'नॉस्टैल्जिया',    // nostalgia
  'घर की याद',       // homesickness
  'रोंगटे खड़े होना', // goosebumps
  'पेट में तितलियाँ', // butterflies
  'धूप से जलना',     // sunburn
  'पैर सुन्न होना',  // pins and needles
  'डेजा वू',         // deja vu
  'स्टेज का डर',     // stage fright
  'हँसी का दौरा',    // fit of laughter
  'मीठे की तलब',     // sweet craving

  // खेल और शौक
  'क्रिकेट',         // cricket
  'कबड्डी',          // kabaddi
  'हॉकी',            // hockey
  'योग',             // yoga
  'मैराथन',          // marathon
  'शतरंज',           // chess
  'कैरम',            // carrom
  'लूडो',            // ludo
  'कराओके',          // karaoke
  'बागवानी',         // gardening
  'तैराकी',          // swimming
  'छुपन छुपाई',      // hide and seek
  'साइकिल चलाना',    // cycling

  // तकनीक
  'सेल्फ़ी',          // selfie
  'पॉडकास्ट',        // podcast
  'इमोजी',           // emoji
  'वाईफ़ाई पासवर्ड',  // wifi password
  'ग्रुप चैट',       // group chat
  'बैटरी ख़त्म',      // dead battery
  'स्क्रीनशॉट',      // screenshot
  'वीडियो कॉल',      // video call
  'स्पैम',           // spam
  'फ़्लाइट मोड',      // airplane mode
  'क्यूआर कोड',      // QR code
  'ऑटोकरेक्ट',       // autocorrect

  // मौसम और प्रकृति
  'मानसून',          // monsoon
  'बिजली',           // lightning
  'इंद्रधनुष',       // rainbow
  'लू',              // heatwave
  'कोहरा',           // fog
  'पूर्णिमा',        // full moon
  'टूटता तारा',      // shooting star
  'कीचड़',            // mud
  'ओले',             // hailstones

  // चीज़ें
  'छाता',            // umbrella
  'अलार्म घड़ी',      // alarm clock
  'सूटकेस',          // suitcase
  'धूप का चश्मा',    // sunglasses
  'च्युइंग गम',      // chewing gum
  'रिमोट',           // remote control
  'झाड़ू',            // broom
  'टूथब्रश',         // toothbrush
  'गुल्लक',          // piggy bank
  'केतली',           // kettle
  'सीढ़ी',            // ladder
  'पटाखे',           // fireworks
  'रेत का महल',      // sandcastle
  'मूँछ',             // moustache
  'टैटू',            // tattoo
  'ख़ज़ाने का नक्शा',  // treasure map
  'टाइम मशीन',       // time machine
];
