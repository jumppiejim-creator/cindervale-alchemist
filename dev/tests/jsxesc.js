// Lists JSX text nodes containing backslash escapes (rendered literally by JSX)
const espree=require('espree');const fs=require('fs');
const code=fs.readFileSync(process.argv[2],'utf8');
const ast=espree.parse(code,{ecmaVersion:2022,ecmaFeatures:{jsx:true},loc:true,range:true});
const out=[];
(function walk(n){if(!n||typeof n.type!=='string')return;if(n.type==='JSXText'&&n.value.includes('\\'))out.push(n.loc.start.line+': '+JSON.stringify(n.value.trim()).slice(0,120));
for(const k in n){const v=n[k];if(k==='parent')continue;if(Array.isArray(v))v.forEach(walk);else if(v&&typeof v.type==='string')walk(v);}})(ast);
console.log(out.join('\n')||'none');
