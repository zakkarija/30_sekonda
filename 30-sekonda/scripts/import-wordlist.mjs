#!/usr/bin/env node
/**
 * Imports a licensed word deck into a word list file.
 *
 * Usage:
 *   node scripts/import-wordlist.mjs <input> <language> [--source "..."]
 *
 *   <input>     .txt  one term per line, or
 *               .csv  any number of terms per row (e.g. five per card side)
 *   <language>  file name under src/assets/wordlists, e.g. english or dutch
 *   --source    who supplied the deck and under what license; written into
 *               the file header so provenance travels with the words
 *
 * Example:
 *   node scripts/import-wordlist.mjs ~/decks/30s-nl.csv dutch \
 *     --source "999 Games, 30 Seconds NL deck, licensed to Ziko Games 2026"
 *
 * The output replaces src/assets/wordlists/<language>.ts. Duplicates
 * (case-insensitive) and blank cells are dropped. Run
 * `npm run check:wordlists` afterwards.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const listDir = join(here, '..', 'src', 'assets', 'wordlists');

const args = process.argv.slice(2);
const sourceFlag = args.indexOf('--source');
const source = sourceFlag >= 0 ? args[sourceFlag + 1] : null;
const [input, language] = args.filter(
  (_, i) => sourceFlag < 0 || (i !== sourceFlag && i !== sourceFlag + 1)
);

if (!input || !language) {
  console.error('Usage: node scripts/import-wordlist.mjs <input.txt|csv> <language> [--source "..."]');
  process.exit(1);
}
if (!existsSync(input)) {
  console.error(`Input not found: ${input}`);
  process.exit(1);
}
const target = join(listDir, `${language}.ts`);
if (!existsSync(target)) {
  console.error(`No existing list at ${target}. Create it and register it in index.ts first.`);
  process.exit(1);
}

/** Minimal CSV cell splitter that honours double-quoted cells. */
const splitCsvRow = (row) => {
  const cells = [];
  let cur = '';
  let quoted = false;
  for (let i = 0; i < row.length; i++) {
    const ch = row[i];
    if (ch === '"' && row[i + 1] === '"') { cur += '"'; i++; }
    else if (ch === '"') quoted = !quoted;
    else if ((ch === ',' || ch === ';' || ch === '\t') && !quoted) { cells.push(cur); cur = ''; }
    else cur += ch;
  }
  cells.push(cur);
  return cells;
};

const raw = readFileSync(input, 'utf8').replace(/^﻿/, '');
const lines = raw.split(/\r?\n/);
const isCsv = extname(input).toLowerCase() === '.csv';
const terms = (isCsv ? lines.flatMap(splitCsvRow) : lines)
  .map((t) => t.trim().replace(/\s+/g, ' '))
  .filter(Boolean);

const seen = new Set();
const unique = [];
for (const t of terms) {
  const key = t.toLocaleLowerCase();
  if (!seen.has(key)) { seen.add(key); unique.push(t); }
}

// Keep the existing export name so index.ts needs no change.
const existing = readFileSync(target, 'utf8');
const exportName = existing.match(/export const (\w+)\s*:/)?.[1];
if (!exportName) {
  console.error(`Could not find the export name in ${target}.`);
  process.exit(1);
}

const escape = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
const header = [
  '/**',
  ` * ${language} word list — imported from a licensed deck.`,
  source ? ` * Source: ${source}` : ' * Source: (not recorded — pass --source when importing)',
  ` * Imported: ${new Date().toISOString().slice(0, 10)} via scripts/import-wordlist.mjs`,
  ' * Do not hand-edit; re-run the importer with the updated deck instead.',
  ' */',
].join('\n');

writeFileSync(
  target,
  `${header}\nexport const ${exportName}: string[] = [\n${unique.map((w) => `  '${escape(w)}',`).join('\n')}\n];\n`
);

console.log(`Wrote ${unique.length} terms to ${target} (${terms.length - unique.length} duplicates dropped).`);
