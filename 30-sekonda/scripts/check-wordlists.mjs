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

const files = readdirSync(listDir)
  .filter((f) => f.endsWith('.ts') && f !== 'index.ts')
  .sort();

let failures = 0;
const summary = [];

for (const file of files) {
  const source = readFileSync(join(listDir, file), 'utf8');
  const problems = [];

  // Pull the quoted string literals out of the exported array, ignoring
  // anything inside a // comment (that's where romanisation lives).
  const withoutComments = source.replace(/\/\/[^\n]*/g, '');
  const words = [...withoutComments.matchAll(/'((?:[^'\\]|\\.)*)'/g)]
    .map((m) => m[1].replace(/\\'/g, "'"))
    .filter((w) => w.length > 0);

  if (words.length < MIN_WORDS) {
    problems.push(`only ${words.length} words (want at least ${MIN_WORDS})`);
  }

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
  console.log(`Checked ${files.length} word lists:`);
  console.log(summary.join('\n'));
}

if (failures > 0) {
  console.error(`\n${failures} word list(s) failed validation.`);
  process.exit(1);
}
console.log('\nAll word lists valid.');
