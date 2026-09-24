import { englishWords } from './english';
import { malteseWords } from './maltese';
import { dutchWords } from './dutch';
import { spanishWords } from './spanish';
import { frenchWords } from './french';
import { portugueseWords } from './portuguese';
import { chineseWords } from './chinese';
import { hindiWords } from './hindi';
import { arabicWords } from './arabic';
import { bengaliWords } from './bengali';
import { russianWords } from './russian';
import { urduWords } from './urdu';

/** ISO 639-1 code identifying a playable language. */
export type LanguageCode =
  | 'en'
  | 'mt'
  | 'nl'
  | 'es'
  | 'fr'
  | 'pt'
  | 'zh'
  | 'hi'
  | 'ar'
  | 'bn'
  | 'ru'
  | 'ur';

export interface Language {
  code: LanguageCode;
  /** English name, used in menus and analytics. */
  name: string;
  /** Endonym shown to players in the language picker. */
  nativeName: string;
  /** Right-to-left script, so word cards align accordingly. */
  isRTL: boolean;
  words: string[];
}

/**
 * Every playable language. Order is what the setup screen renders:
 * English first, then Maltese (the app's home language), then the rest
 * roughly by number of speakers.
 *
 * To add a language: create `<language>.ts` next to this file following the
 * rules in ./README.md, then add one entry here. Nothing else needs changing.
 */
export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', isRTL: false, words: englishWords },
  { code: 'mt', name: 'Maltese', nativeName: 'Malti', isRTL: false, words: malteseWords },
  { code: 'zh', name: 'Chinese', nativeName: '中文', isRTL: false, words: chineseWords },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', isRTL: false, words: hindiWords },
  { code: 'es', name: 'Spanish', nativeName: 'Español', isRTL: false, words: spanishWords },
  { code: 'fr', name: 'French', nativeName: 'Français', isRTL: false, words: frenchWords },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', isRTL: true, words: arabicWords },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', isRTL: false, words: bengaliWords },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', isRTL: false, words: portugueseWords },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', isRTL: false, words: russianWords },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', isRTL: true, words: urduWords },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', isRTL: false, words: dutchWords },
];

export const DEFAULT_LANGUAGE: LanguageCode = 'en';

const BY_CODE: Record<string, Language> = LANGUAGES.reduce(
  (acc, language) => {
    acc[language.code] = language;
    return acc;
  },
  {} as Record<string, Language>
);

/**
 * Look up a language by code, falling back to English for anything unknown
 * (a missing navigation param, or a code from an older build).
 */
export const getLanguage = (code?: string | null): Language =>
  (code && BY_CODE[code]) || BY_CODE[DEFAULT_LANGUAGE];

export { englishWords, malteseWords };
