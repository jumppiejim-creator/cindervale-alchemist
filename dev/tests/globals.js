// Collects the top-level names declared by the data scripts (they are globals for index.html's app script).
// usage: node globals.js <repoDir>  -> writes globals.json next to this file
const espree = require('espree'); const fs = require('fs'); const path = require('path');
const repo = process.argv[2] || path.resolve(__dirname, '..', '..');
const out = {};
for (const f of ['game-data.js', 'location-images.js', 'portraits.js', 'npc-portraits.js']) {
  const ast = espree.parse(fs.readFileSync(path.join(repo, f), 'utf8'), { ecmaVersion: 2022, sourceType: 'script' });
  for (const n of ast.body) {
    if (n.type === 'VariableDeclaration') for (const d of n.declarations) { if (d.id.name) out[d.id.name] = f; }
    else if (n.type === 'FunctionDeclaration') out[n.id.name] = f;
  }
}
fs.writeFileSync(path.join(__dirname, 'globals.json'), JSON.stringify(out, null, 1));
