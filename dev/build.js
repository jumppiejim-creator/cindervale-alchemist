#!/usr/bin/env node
// Compiles game.jsx (the app source) into game.js, the plain script index.html loads, so players' browsers
// don't have to compile ~1MB of JSX on every visit. Same Babel settings the old in-browser compile used.
//   node dev/build.js          build game.js and stamp its hash into index.html (game.js?v=...)
//   node dev/build.js --check  exit 1 if game.js / index.html are out of date with game.jsx (tests, CI)
// Needs the test tooling installed once:  cd dev/tests && npm install
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const ROOT = path.resolve(__dirname, '..');
const Babel = require(require.resolve('@babel/standalone', { paths: [path.join(__dirname, 'tests'), ROOT] }));
const rd = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const nl = s => s.replace(/\r\n/g, '\n'); // Windows checkouts have CRLF; build from the same text either way

const src = nl(rd('game.jsx'));
const hash = crypto.createHash('sha1').update(src).digest('hex').slice(0, 10);
const code = Babel.transform(src, {
  filename: 'game.jsx',
  presets: ['react', ['env', { targets: { esmodules: true }, modules: false }]],
  plugins: ['transform-class-properties', 'transform-object-rest-spread', 'transform-flow-strip-types'],
  compact: false, retainLines: true, // game.js line N = game.jsx line N, so crash-screen stack traces point at the source
}).code;
// One private scope (as the old <script type="module"> had); stands down when index.html?src compiles game.jsx itself.
const out = `/* GENERATED from game.jsx by dev/build.js — do not edit; edit game.jsx and rebuild. source ${hash} */` +
  `(function(){"use strict";if(/[?&]src\\b/.test(location.search))return;` + code + '\n})();\n';

const idx = rd('index.html');
const tagRe = /<script src="game\.js\?v=[^"]*"><\/script>/;
if (!tagRe.test(idx)) { console.error('index.html has no <script src="game.js?v=..."> tag'); process.exit(1); }
const idxOut = idx.replace(tagRe, `<script src="game.js?v=${hash}"></script>`);

if (process.argv.includes('--check')) {
  const cur = fs.existsSync(path.join(ROOT, 'game.js')) ? nl(rd('game.js')) : '';
  const stale = [cur !== out && 'game.js', nl(idx) !== nl(idxOut) && 'index.html game.js?v='].filter(Boolean);
  if (stale.length) { console.log('STALE: ' + stale.join(', ') + ' — run: node dev/build.js'); process.exit(1); }
  console.log('build up to date (' + hash + ')'); process.exit(0);
}
fs.writeFileSync(path.join(ROOT, 'game.js'), out);
if (idxOut !== idx) fs.writeFileSync(path.join(ROOT, 'index.html'), idxOut);
console.log(`game.js built from game.jsx (${hash}, ${(out.length / 1024).toFixed(0)} KB)`);
