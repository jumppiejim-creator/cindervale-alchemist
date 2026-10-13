// Finds references to block-scoped variables that execute during render BEFORE the declaration
// (same function scope, not inside a nested function) — Babel turns these into silent `undefined` reads.
const espree=require('espree');const eslintScope=require('eslint-scope');const fs=require('fs');
const code=fs.readFileSync(process.argv[2],'utf8');
const ast=espree.parse(code,{ecmaVersion:2022,sourceType:'script',ecmaFeatures:{jsx:true},range:true,loc:true});
const sm=eslintScope.analyze(ast,{ecmaVersion:2022,sourceType:'script'});
const out=[];
for(const scope of sm.scopes){
  for(const v of scope.variables){
    const def=v.defs[0];if(!def||def.type!=='Variable'||def.parent.kind==='var')continue;
    const declStart=def.name.range[0];
    for(const ref of v.references){
      if(ref.identifier.range[0]>=declStart)continue;
      // only flag when the reference's function scope is the same as the declaration's function scope
      let rs=ref.from;while(rs.type!=='function'&&rs.type!=='global'&&rs.upper)rs=rs.upper;
      let ds=scope;while(ds.type!=='function'&&ds.type!=='global'&&ds.upper)ds=ds.upper;
      if(rs===ds)out.push(`${ref.identifier.loc.start.line}: '${v.name}' used before its declaration at line ${def.name.loc.start.line}`);
    }
  }
}
console.log(out.join('\n')||'no TDZ reads');
