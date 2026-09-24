#!/usr/bin/env node
/**
 * Rebuilds the third-party word lists in src/assets/wordlists/sources/.
 *
 * Usage:
 *   node scripts/build-imported-wordlists.mjs <dir-with-cloned-repos>
 *
 * Expects these clones inside <dir>:
 *   30-seconds-game-online  https://github.com/joost/30-seconds-game-online
 *   42seconds               https://github.com/jellea/42seconds
 *   game-words              https://github.com/nick-aschenbach/game-words
 *
 * Every curation decision lives in this file (categories kept, typo fixes,
 * blocklist), so the imported lists can be regenerated and audited. Do not
 * hand-edit the generated files; change the rules here and re-run.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import YAML from 'yaml';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, '..', 'src', 'assets', 'wordlists', 'sources');
const srcRoot = process.argv[2];
if (!srcRoot) {
  console.error('Usage: node scripts/build-imported-wordlists.mjs <dir-with-cloned-repos>');
  process.exit(1);
}

const MAX_LEN = 28; // matches check-wordlists.mjs

/**
 * Party-game safety: nothing about violence, war, disasters, extremism,
 * scandal or adult content. Matched case-insensitively as whole entries.
 */
const BLOCK = new Set(
  [
    // war, extremism, disasters
    'De Fuhrer', 'De swastika', 'Mein Kampf', 'De Bijlmerramp',
    'Het World Trade Center', 'Pearl Harbor', 'Eerste Wereldoorlog',
    'Musket', 'Het Pentagon', 'Air Force base', 'Luchtmachtbasis',
    'World War I', 'Bomb',
    'American Revolution', 'crime', 'Blade', 'Lemmet', 'Sword',
    // scandal, adult, disgraced
    'Monica Lewinsky', 'Playboy', 'Bill Cosby', 'Charlie Sheen',
    'Lance Armstrong', 'Dommelsch',
    // meaningless out of context
    'you', 'standard', 'defect', 'Sinds een dag of twee', 'Gordon',
    'Linda', 'Venz', 'Brainpower', 'Delilah',
  ].map((s) => s.toLowerCase())
);

/**
 * US-only references that would stall a table in Malta, the Netherlands or
 * anywhere outside the US. Globally famous Americans stay.
 */
const US_NICHE = new Set(
  [
    'Sacajawea', 'James Madison', 'Walter Cronkite', 'Betsy Ross',
    'Herbert Hoover', 'Eli Whitney', 'Susan B. Anthony', 'Ulysses S. Grant',
    'Dwight D. Eisenhower', 'Samuel Adams', 'John Hancock', 'John Adams',
    'Thomas Paine', 'Patrick Henry', 'Davy Crockett', 'Regis Philbin',
    'Jonathan Taylor Thomas', 'Andy Griffith', 'Dick Van Dyke',
    'Peyton Manning', 'Alex Rodriguez', 'Shel Silverstein', 'Mr. Rogers',
    'Gilligan', "Cap'n Crunch", 'Inigo Montoya', 'George W. Carver',
    'Nathaniel Hawthorne', 'Doris Day', 'Jimmy Stewart', 'Lucille Ball',
    'Mary-Kate and Ashley Olsen', 'Amanda Bynes', 'Dakota Fanning',
    'Matthew Broderick', 'James Taylor', 'Buddy Holly', 'Norman Rockwell',
    'Theodore Roosevelt', 'Eleanor Roosevelt', 'Franklin D. Roosevelt',
    'Richard Nixon', 'Ronald Regan', 'Thomas Jefferson', 'Ben Franklin',
    'Benjamin Franklin', 'Lewis and Clark', 'Billy the Kid',
    'the Sundance Kid', 'King George', 'Samuel Morse', 'Babe Ruth',
    'George of the Jungle', 'Newsies', 'Air Bud', 'Remember the Titans',
    'The Sandlot', 'Little Giants', 'Angels in the Outfield',
    'Mr. Smith Goes to Washington', 'Indian in the Cupboard',
    'Mighty Joe Young', 'The Mighty Ducks', 'Pete\'s Dragon',
    'Swiss Family Robinson', 'The Brave Little Toaster', 'Milo and Otis',
    'Clifford the Big Red Dog', 'Big Bird', 'Oscar the Grouch', 'Waldo',
    'Weird Al', 'Weird Al Yankovick', 'San Diego Zoo',
    'Madison Square Garden', 'Denali', 'Mount Denali', 'Florida',
    'Albert Heijn', 'Kapsalon (Dutch dish)', 'Jan Smit', 'Temse (België)',
  ].map((s) => s.toLowerCase())
);

/**
 * Too dull for the game: generic nouns, cooking verbs, moods, months, and
 * everyday objects nobody enjoys describing. The bar is "would a table
 * groan or laugh?", not "is it a real word?". Removed from every English
 * source; see the word list README for the rules.
 */
const DULL = new Set(
  [
    // generic or collective nouns, and a slur
    'Human', 'Bird', 'Flock', 'Herd', 'Cub', 'Doe', 'Ewe', 'Joey', 'Calf',
    'Chick', 'Hen', 'Ram', 'Lamb', 'Kitten', 'Puppy', 'Housecat', 'Duckling',
    'Gypsy', 'Meal', 'Food', 'Dinner', 'Breakfast', 'Snack', 'Produce',
    'Dairy', 'Poultry', 'Meat', 'Beef', 'Pork', 'Low-fat', 'Appetizer',
    // obscure animals and fish
    'Mole', 'Crane', 'Partridge', 'Trout', 'Bass', 'Clam', 'Clams', 'Lark',
    'Groundhog', 'Finch', 'Flounder', 'Elk', 'Mallard', 'Gopher', 'Shrew',
    'Mink', 'Gnu', 'Inchworm', 'Earthworm', 'Worm', 'Worms', 'Mule',
    'Cougar', 'Coyote', 'Jackalope', 'Barracuda', 'Weasel', 'Bluebird',
    'Fly', 'Rat', 'Ox', 'Hare', 'Toad', 'Robin', 'Raven', 'Crow', 'Moth',
    // cooking verbs and kitchen tools
    'Broil', 'Dredge', 'Simmer', 'Poach', 'Blanch', 'Melt', 'Freeze', 'Bake',
    'Zest', 'Grill', 'Deep-fry', 'Marinade', 'Sifter', 'Colander', 'Whisk',
    'Spatula', 'Fork', 'Spoon', 'Napkin', 'Wok', 'Blender', 'Toaster',
    // plain staples and obscure produce
    'Salt', 'Flour', 'Rice', 'Corn', 'Barley', 'Cornmeal', 'Grits', 'Broth',
    'Egg', 'Milk', 'Bread', 'Toast', 'Rolls', 'Soup', 'Jam', 'Jelly',
    'Pea', 'Yam', 'Okra', 'Kale', 'Leek', 'Beet', 'Turnip', 'Parsnip',
    'Radish', 'Celery', 'Lettuce', 'Cabbage', 'Squash', 'Gourd', 'Lentils',
    'Soybean', 'Chickpea', 'Venison', 'Liver', 'Kumquat', 'Honeydew',
    'Date', 'Fig', 'Raisin', 'Plum', 'Pear', 'Apricot', 'Tangerine',
    'Clementine', 'Cantaloupe', 'Nutmeg', 'Basil', 'Cinnamon', 'Mustard',
    'Horseradish', 'Croutons', 'Crackers', 'Flatbread', 'Pita', 'Granola',
    'Oatmeal', 'Cereal', 'Candy', 'Sweets', 'Cookies', 'Pancakes',
    'Waffles', 'Noodles', 'Snickerdoodle', 'Kool-aid', 'Twinkies',
    'Jell-o', 'Corndog', 'Gumdrops', 'Wassail', 'Garlic', 'Carrot',
    'Cherry', 'Salad', 'Tomato', 'Onion', 'Potato', 'Cucumber',
    // US states, places and months
    'Oregon', 'Delaware', 'Maine', 'Sacramento', 'Arizona', 'Colorado',
    'Guam', 'Texas', 'California', 'Boston', 'Orlando', 'Yellowstone',
    'Condo', 'January', 'April', 'June', 'July', 'December',
    // abstract or mood words
    'Summer', 'Autumn', 'Fall', 'Relax', 'Scenery', 'Stroll', 'Packing',
    'Customs', 'Layover', 'Party', 'Parties', 'Music', 'Speech',
    'Celebration', 'Traditions', 'Wishes', 'Resolutions', 'Toasts',
    'Horror', 'Eerie', 'Spooky', 'Spooks', 'Creepy', 'Scary', 'Afraid',
    'Frightened', 'Dark', 'Black', 'Green', 'Nighttime', 'Midnight',
    'Boo', 'Spells', 'Igor', 'Chains', 'Mess', 'Stain', 'Leak', 'Mold',
    'Crumb', 'Bedtime', 'Homework', 'Dance/dancing', 'Fence-sitter',
    // flat household objects
    'Floor', 'Ceiling', 'Door', 'Window', 'Table', 'Chair', 'Bed', 'Box',
    'Bag', 'Glass', 'Jar', 'Block', 'Handle', 'Paper', 'Tape', 'Ink',
    'Thread', 'Wick', 'Lace', 'Sash', 'Plastic', 'Weed', 'Picture',
    'Books', 'Book', 'Shoe', 'Shoes', 'Boot', 'Shirt', 'Pants', 'Coat',
    'Dress', 'Skirt', 'Vest', 'Socks', 'Towel', 'Tissue', 'Key', 'Mail',
    'Stamp', 'Stamps', 'Penny', 'Quarter', 'Dollar', 'Cash', 'Money',
    'Coin', 'Paint', 'Ribbon', 'Ice', 'Telephone', 'Television', 'TV',
    'Computer', 'CD', 'IPod', 'Windex', 'Yardstick', 'Loveseat',
    'Banister', 'Baseboards', 'Stationery', 'Markers', 'Crayons', 'Eraser',
    'Pencil', 'Paperclip', 'Stapler', 'Bench', 'Stairs', 'Driveway',
    'Doorway', 'Garage', 'Kitchen', 'Bedroom', 'Bathroom', 'Pantry',
    'Silverware', 'Magnets', 'Bottle', 'Basket', 'Bucket', 'Sponge',
    'Speakers', 'Wheel', 'Brother', 'Garbage', 'Mirror', 'Printer',
    'Keyboard', 'Microwave', 'Refrigerator', 'Calculator', 'Agenda',
    'Diary', 'Iron', 'Fan', 'Brick', 'Safe', 'Canvas', 'Helmet',
    // plain nature words from the joost deck and the spring list
    'Tree', 'Trees', 'Sun', 'Rain', 'Snow', 'Mud', 'Dew', 'Pollen',
    'Flower', 'Flowers', 'Seeds', 'Rose', 'Shell', 'Lake', 'River',
    'Island', 'Park', 'Star', 'Lights', 'Bells', 'Stable', 'Angel',
    'Toys', 'Gifts', 'Decorations', 'Feast', 'Concerts',
    // plain animals and vehicles from the joost deck
    'Cow', 'Duck', 'Sheep', 'Ant', 'Bat', 'Seal', 'Snail', 'Turtle',
    'Farm', 'Bus', 'Intersection', 'Slide', 'Courier', 'Whistleblower',
    'Laptop stand', 'Stork', 'Manger', 'Shepherds', 'Costume',
    // plain produce and baking; iconic foods (avocado, pineapple,
    // watermelon, coconut, banana, chili pepper, pumpkin) are kept
    'Lemon', 'Lime', 'Olive', 'Peach', 'Grape', 'Grapefruit', 'Papaya',
    'Kiwi', 'Pomegranate', 'Cranberry', 'Blueberry', 'Blackberry',
    'Raspberry', 'Pecan', 'Almond', 'Cashew', 'Walnuts', 'Peanut',
    'Pistachio', 'Ginger', 'Curry', 'Caramel', 'Custard', 'Pudding',
    'Cupcakes', 'Muffin', 'Scone', 'Biscuit', 'Bagel', 'Cookie', 'Cake',
    'Tofu', 'Ham', 'Tuna', 'Salmon', 'Sardines', 'Asparagus', 'Broccoli',
    'Cauliflower', 'Spinach', 'Zucchini', 'Eggplant', 'Artichoke',
    'Mushroom', 'Bok choy', 'Baking soda', 'Baking powder', 'Muffin tin',
    'Soup de jour', 'Chestnut', 'Chestnuts', 'Tangerines', 'Soda',
    'Yogurt', 'Cheese', 'Mozzarella cheese', 'Black beans', 'Pinto beans',
    'Green beans', 'Brown sugar', 'Sour cream', 'Cream cheese', 'Butter',
    'Pepper', 'Sugar', 'Vinegar', 'Balsamic vinegar', 'Olive oil',
  ].map((s) => s.toLowerCase())
);

/** Spelling fixes, applied before filtering and de-duplication. */
const FIX = new Map(
  Object.entries({
    'Freddy Mercury': 'Freddie Mercury',
    'Steven Hawking': 'Stephen Hawking',
    'George Cloney': 'George Clooney',
    'Justin Beiber': 'Justin Bieber',
    'Pablo Piccaso': 'Pablo Picasso',
    'Edgar Allen Poe': 'Edgar Allan Poe',
    'Jacqueline Kennedy Onasis': 'Jacqueline Kennedy Onassis',
    'Lewis Carrol': 'Lewis Carroll',
    'Stephanie Meyer': 'Stephenie Meyer',
    'Mohammad Ali': 'Muhammad Ali',
    'Alice (in Wonderland)': 'Alice in Wonderland',
    'Electriciteitskabel': 'Elektriciteitskabel',
    'Machupicchu': 'Machu Picchu',
    'Beatrix (queen)': 'Queen Beatrix',
    'Beatrix (koningin)': 'Koningin Beatrix',
    'Christ the Redeemer (Rio)': 'Christ the Redeemer',
    'Hongkong': 'Hong Kong',
    'Het WNF': 'Het Wereld Natuur Fonds',
    'De Bermuda Driehoek': 'De Bermudadriehoek',
    'Snow White and the Seven Dwarves': 'Snow White',
    'State of Liberty': 'Statue of Liberty',
    'the Statue of Liberty': 'Statue of Liberty',
  })
);

/** English leftovers in the Dutch joost deck, each with a Dutch twin already present. */
const NOT_DUTCH = new Set(
  ['Hammock', 'Hairdryer', 'Arctic Circle', 'Niagara Falls', 'Mount Etna',
   'Mount Vesuvius', 'Mount Olympus', 'Mount Kilimanjaro', 'Mount Fuji']
    .map((s) => s.toLowerCase())
);

const capitalise = (s) => (/^[a-z]/.test(s) && !/^the /.test(s) ? s[0].toUpperCase() + s.slice(1) : s);
const theCase = (s) => s.replace(/^the /, 'The ');

/** Normalise, filter and de-duplicate one source's terms. */
const curate = (terms, { extraBlock, dull } = {}) => {
  const seen = new Set();
  const kept = [];
  const dropped = { blocked: 0, niche: 0, dull: 0, long: 0, dup: 0 };
  for (let t of terms) {
    t = String(t).trim().replace(/\s+/g, ' ');
    if (!t) continue;
    t = FIX.get(t) ?? t;
    t = theCase(capitalise(t));
    const key = t.toLowerCase();
    if (BLOCK.has(key) || extraBlock?.has(key)) { dropped.blocked++; continue; }
    if (US_NICHE.has(key)) { dropped.niche++; continue; }
    if (dull?.has(key)) { dropped.dull++; continue; }
    if (t.length > MAX_LEN) { dropped.long++; continue; }
    if (seen.has(key)) { dropped.dup++; continue; }
    seen.add(key);
    kept.push(t);
  }
  return { kept, dropped };
};

const escape = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

const write = (file, exportName, words, header) => {
  const body = `${header}\nexport const ${exportName}: string[] = [\n${words.map((w) => `  '${escape(w)}',`).join('\n')}\n];\n`;
  writeFileSync(join(outDir, file), body);
};

const headerFor = ({ title, repo, license, notes }) =>
  [
    '/**',
    ` * ${title}`,
    ' *',
    ` * Source:  ${repo}`,
    ` * License: ${license}`,
    ...notes.map((n) => ` * ${n}`),
    ' *',
    ' * GENERATED by scripts/build-imported-wordlists.mjs — do not hand-edit.',
    ' * Change the curation rules in that script and re-run it instead.',
    ' */',
  ].join('\n');

mkdirSync(outDir, { recursive: true });
const report = [];

// --- joost/30-seconds-game-online: English and Dutch 30 Seconds-style cards
const joostNote = [
  'Five-term cards in the 30 Seconds format: people, places and objects.',
  'The repository states no license. Used at the app owner\'s direction;',
  'written permission from the author is recommended before release.',
];
for (const [lang, exportName, file, extraBlock, dull] of [
  ['en', 'english30sOnlineWords', 'english-30s-online.ts', null, DULL],
  ['nl', 'dutch30sOnlineWords', 'dutch-30s-online.ts', NOT_DUTCH, null],
]) {
  const cards = JSON.parse(readFileSync(join(srcRoot, '30-seconds-game-online', `cards-${lang}.json`), 'utf8')).cards;
  const { kept, dropped } = curate(cards.flat(), { extraBlock, dull });
  write(file, exportName, kept, headerFor({
    title: `${lang === 'en' ? 'English' : 'Dutch'} — 30 Seconds online deck`,
    repo: 'https://github.com/joost/30-seconds-game-online',
    license: 'none stated (all rights reserved by default)',
    notes: joostNote,
  }));
  report.push([file, kept.length, dropped]);
}

// --- jellea/42seconds: Dutch pop culture, built at Startup Weekend 2012
{
  const raw = readFileSync(join(srcRoot, '42seconds', 'answers', 'answers.txt'), 'utf8').split(/\r?\n/);
  const { kept, dropped } = curate(raw);
  write('dutch-42seconds.ts', 'dutch42SecondsWords', kept, headerFor({
    title: 'Dutch — 42seconds answers',
    repo: 'https://github.com/jellea/42seconds',
    license: 'none stated (all rights reserved by default)',
    notes: [
      'Dutch pop culture circa 2012; the README says content was scraped',
      'from Wikipedia. Used at the app owner\'s direction. Entries about',
      'war, extremism, disasters and scandal are removed by the blocklist.',
    ],
  }));
  report.push(['dutch-42seconds.ts', kept.length, dropped]);
}

// --- nick-aschenbach/game-words: MIT, ~5,000 party-game terms
{
  const data = YAML.parse(readFileSync(join(srcRoot, 'game-words', 'assets', 'game_words', 'game_words.yaml'), 'utf8'));
  // Themed categories only: they give 30 Seconds-style people, places and
  // things. Skipped: the generic difficulty tiers (easy/medium/difficult/
  // hard), which are mostly flat single words like "Last", "Snap", "Oval";
  // "household", which is almost all plain objects (Floor, Box, Stain);
  // the spring and new year lists (Rain, Mud, Wishes); and US-specific
  // holidays (Independence Day, Thanksgiving, Valentine songs and sayings).
  // What survives still passes through the DULL filter.
  const KEEP = [
    ['catchphrase', ['animals', 'food', 'travel', 'people']],
    ['pictionary', ['idioms', 'characters', 'movies']],
    ['charades', ['actions']],
    ['holidays', ['christmas', 'halloween', 'christmassong']],
  ];
  const terms = KEEP.flatMap(([group, cats]) => cats.flatMap((c) => data[group][c] ?? []));
  const { kept, dropped } = curate(terms, { dull: DULL });
  write('english-game-words.ts', 'englishGameWords', kept, headerFor({
    title: 'English — game-words party deck',
    repo: 'https://github.com/nick-aschenbach/game-words',
    license: 'MIT, Copyright (c) 2014 Nick Aschenbach (see ../THIRD_PARTY_NOTICES.md)',
    notes: [
      'Curated from the Catchphrase, Pictionary, Charades and holiday lists.',
      'Abstract "hard" tiers and US-only holidays are excluded.',
    ],
  }));
  report.push(['english-game-words.ts', kept.length, dropped]);
}

for (const [file, n, d] of report) {
  console.log(`${file.padEnd(24)} kept ${String(n).padStart(5)}  dropped: ${d.blocked} blocked, ${d.niche} US-niche, ${d.dull} dull, ${d.long} too long, ${d.dup} duplicate`);
}
