# Word lists

One file per language, plus `index.ts` which registers them all.

## Adding a language

1. Create `<language>.ts` exporting a `string[]` (see any existing file).
2. Add one entry to `LANGUAGES` in `index.ts`.

Nothing else needs changing. The setup screen and the game screen both read
from the registry, so a new language appears in the picker automatically.

## What makes a good word

The deck is the game. A list of flat nouns ("Apple", "Car", "House") makes for
a dull round; the words below are what people actually enjoy describing.

**Do:**

- **Be describable in seconds** by gesture, synonym or association.
- **Prefer evocative over generic.** "Hangover", "Karaoke" and "Losing your
  keys" all beat "Apple".
- **Spread across categories.** Each list aims for roughly even coverage of:
  people and roles, animals, food and drink, places, everyday objects,
  actions and situations, feelings and states, festivals and customs, sport
  and hobbies, technology and modern life, weather and nature.
- **Mix difficulty.** Some gimmes, some that need real work.
- **Include short phrases,** not just single words. "Stuck in a lift" is more
  fun than "Lift".

**Don't:**

- **No grammar words.** Prepositions, pronouns and conjunctions ("above",
  "between", "себя") cannot be acted out. This was the single biggest problem
  with the original Maltese list.
- **No duplicates,** including case variants. `npm run check:wordlists` catches
  these.
- **Nothing distressing.** No violence, illness, disasters or politics. A party
  game is not the place.
- **No in-jokes or hyper-local brands** that half the table will not know.

## Localise, do not translate

The lists are deliberately **not** translations of each other. A word that
lands in one culture can be meaningless in another, so each list is written
from inside its own culture:

| Language   | Native references it leans on                        |
|------------|------------------------------------------------------|
| Maltese    | festa, pastizzi, luzzu, il-Majjistral                |
| Dutch      | fiets, gezellig, borrel, tegenwind                   |
| Spanish    | sobremesa, chancla, piñata, Día de Muertos           |
| French     | la bise, la grève, l'apéro, la rentrée               |
| Chinese    | 广场舞, 红包, 春运, 扫码支付                          |
| Hindi      | जुगाड़, बारात, ऑटो रिक्शा, बिजली कटौती                 |
| Arabic     | سحور, دبكة, مجلس, عاصفة رملية                        |
| Bengali    | আড্ডা, ইলিশ, দুর্গা পূজা, লোডশেডিং                     |
| Portuguese | saudade, chinelo, festa junina, churrasco            |
| Russian    | дача, баня, ёлка, субботник                          |
| Urdu       | بسنت, مشاعرہ, نہاری, لوڈ شیڈنگ                        |

Only genuinely international items (Wi-Fi password, selfie, marathon) appear
across most lists, and even then in the local form.

## Scripts and rendering

Chinese, Hindi, Bengali, Arabic, Russian and Urdu use non-Latin scripts and
rely on the system font covering them. This is fine on current iOS and Android.
Arabic and Urdu are marked `isRTL` in the registry so word cards align right.

Romanisation appears in `//` comments for maintainers and is never shown in the
game.

## Provenance

These lists are original work written for this app. They are deliberately not
copied from any published word game: a curated deck from a commercial title is
protectable as a compilation, and shipping a copy of one would put an App Store
release at risk.
