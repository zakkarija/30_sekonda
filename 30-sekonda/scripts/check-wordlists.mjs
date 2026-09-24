#!/usr/bin/env node
/**
 * Validates every word list in src/assets/wordlists.
 *
 * Catches the problems the original lists had: duplicates that differ only by
 * case, near-empty lists, stray whitespace, and entries too long to fit on a
 * word card. Run with `npm run check:wordlists`.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const listDir = join(here, '..', 'src', 'assets', 'wordlists');

/** Minimum words for a list to be playable without obvious repetition. */
const MIN_WORDS = 100;
/** Longer than this and the word card text starts wrapping badly. */
const MAX_WORD_LENGTH = 28;

// Top-level language files plus generated third-party lists in sources/.
// Source files are named <language>-<source>.ts and count toward that
// language's minimum; duplicates across files are merged at runtime.
const sourceDir = join(listDir, 'sources');
const files = [
  ...readdirSync(listDir).filter((f) => f.endsWith('.ts') && f !== 'index.ts'),
  ...readdirSync(sourceDir).filter((f) => f.endsWith('.ts')).map((f) => join('sources', f)),
].sort();
const languageOf = (file) => file.replace(/^sources\//, '').replace(/\.ts$/, '').split('-')[0];
const totals = new Map();

let failures = 0;
const summary = [];

for (const file of files) {
  const source = readFileSync(join(listDir, file), 'utf8');
  const problems = [];

  // Pull the quoted string literals out of the exported array, ignoring
  // anything inside a // comment (that's where romanisation lives).
  const withoutComments = source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/[^\n]*/g, '');
  const words = [...withoutComments.matchAll(/'((?:[^'\\]|\\.)*)'/g)]
    .map((m) => m[1].replace(/\\'/g, "'"))
    .filter((w) => w.length > 0);

  const lang = languageOf(file);
  if (!totals.has(lang)) totals.set(lang, new Set());
  for (const w of words) totals.get(lang).add(w.toLocaleLowerCase());

  const seen = new Map();
  const duplicates = new Set();
  for (const word of words) {
    const key = word.toLocaleLowerCase();
    if (seen.has(key)) duplicates.add(seen.get(key));
    else seen.set(key, word);
  }
  if (duplicates.size > 0) {
    problems.push(`duplicates: ${[...duplicates].join(', ')}`);
  }

  const untrimmed = words.filter((w) => w !== w.trim());
  if (untrimmed.length > 0) {
    problems.push(`leading/trailing whitespace: ${untrimmed.join(', ')}`);
  }

  const tooLong = words.filter((w) => w.length > MAX_WORD_LENGTH);
  if (tooLong.length > 0) {
    problems.push(`longer than ${MAX_WORD_LENGTH} chars: ${tooLong.join(', ')}`);
  }

  const language = file.replace(/\.ts$/, '');
  if (problems.length > 0) {
    failures += 1;
    console.error(`FAIL  ${language}`);
    for (const p of problems) console.error(`      - ${p}`);
  } else {
    summary.push(`  ${language.padEnd(12)} ${String(words.length).padStart(4)} words`);
  }
}

if (summary.length > 0) {
  console.log(`Checked ${files.length} word list files:`);
  console.log(summary.join('\n'));
}

console.log('\nPlayable words per language (after merging and de-duplication):');
for (const [lang, set] of [...totals].sort()) {
  const ok = set.size >= MIN_WORDS;
  if (!ok) failures += 1;
  console.log(`  ${ok ? ' ' : '!'} ${lang.padEnd(12)} ${String(set.size).padStart(5)}${ok ? '' : `  (want at least ${MIN_WORDS})`}`);
}

if (failures > 0) {
  console.error(`\n${failures} word list(s) failed validation.`);
  process.exit(1);
}
console.log('\nAll word lists valid.');
