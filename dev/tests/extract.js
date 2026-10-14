// Copies the app source (game.jsx) to <out.jsx> for the lint tools. usage: node extract.js <repoDir> <out.jsx>
// (The app used to be inline in index.html and had to be cut out; it now lives in its own file.)
const fs = require('fs'); const path = require('path');
const [repo, out] = process.argv.slice(2);
fs.writeFileSync(out, fs.readFileSync(path.join(repo, 'game.jsx'), 'utf8').replace(/\r\n/g, '\n'));
