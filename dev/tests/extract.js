// Extracts the inline <script type="text/babel"> app from index.html into a .jsx file, padded with blank lines
// so line numbers match index.html. usage: node extract.js <repoDir> <out.jsx>
const fs = require('fs'); const path = require('path');
const [repo, out] = process.argv.slice(2);
const src = fs.readFileSync(path.join(repo, 'index.html'), 'utf8');
const tag = '<script type="text/babel" data-type="module">';
const start = src.indexOf(tag) + tag.length; const end = src.indexOf('</script>', start);
fs.writeFileSync(out, '\n'.repeat(src.slice(0, start).split('\n').length - 1) + src.slice(start, end));
