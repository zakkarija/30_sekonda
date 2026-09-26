// Turns the single-page Expo web export into one self-contained HTML file
// that runs inside the artifact viewer: bundle inlined, icon font inlined as
// a data URI, dark background painted before the JS loads.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const [dist, out] = process.argv.slice(2);
const jsDir = join(dist, '_expo/static/js/web');
const bundleFile = readdirSync(jsDir).find((f) => f.endsWith('.js'));
let js = readFileSync(join(jsDir, bundleFile), 'utf8');

// Inline every font the bundle references and that the export produced.
let inlined = 0;
js = js.replace(/"(\/assets\/[^"]+\.ttf)"/g, (m, p) => {
  try {
    const b64 = readFileSync(join(dist, p)).toString('base64');
    // Only Ionicons is used by the app; skip the rest to keep the page small.
    if (!/Ionicons/.test(p)) return m;
    inlined++;
    return `"data:font/ttf;base64,${b64}"`;
  } catch {
    return m;
  }
});
if (inlined === 0) throw new Error('Ionicons font reference not found in bundle');

// A literal </script> inside the bundle would end the inline script early.
js = js.replace(/<\/script/gi, '<\\/script');

const html = `<title>30 Sekonda</title>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover">
<meta name="theme-color" content="#1A1A2E">
<style>
  /* Single dark look by design: the game is played on a dark table. */
  :root { color-scheme: dark; background: #1A1A2E; }
  html, body { height: 100%; background: #1A1A2E; }
  body { margin: 0; overflow: hidden; overscroll-behavior: none;
         -webkit-tap-highlight-color: transparent; }
  * { touch-action: manipulation; }
  #root { display: flex; height: 100%; flex: 1; }
</style>
<noscript>30 Sekonda needs JavaScript to run.</noscript>
<div id="root"></div>
<script>${js}</script>
`;
writeFileSync(out, html);
console.log(`wrote ${out}: ${(html.length / 1024 / 1024).toFixed(2)} MB, ${inlined} font(s) inlined`);
