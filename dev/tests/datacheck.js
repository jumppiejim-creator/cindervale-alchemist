#!/usr/bin/env node
// Cindervale data integrity / regression check.
// Usage:  node dev/tests/datacheck.js [--repo DIR] [--verbose] [--no-dead]
//   --verbose   print every failing item (default caps at 12 per check)
//   --no-dead   skip the informational dead-data scan
// Exit code: 0 = all checks pass, 1 = at least one FAIL. WARN/INFO lines never affect the exit code.
'use strict';
const vm = require('vm');
const fs = require('fs');
const path = require('path');

const argv = process.argv.slice(2);
const argVal = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d; };
const REPO = path.resolve(argVal('--repo', path.resolve(__dirname, '..', '..')));
const VERBOSE = argv.includes('--verbose');
const DEAD = !argv.includes('--no-dead');
const CAP = VERBOSE ? Infinity : 12;

const rd = f => fs.readFileSync(path.join(REPO, f), 'utf8');
const DATA_FILES = ['portraits.js', 'location-images.js', 'game-data.js', 'npc-portraits.js']; // index.html load order
const INDEX = rd('index.html');
const APP = rd('game.jsx').replace(/\r\n/g, '\n'); // the app source (index.html loads its build, game.js)

// ───────────── load data in a sandbox (same order as index.html <script> tags) ─────────────
const ctx = { console: { log() {}, warn() {}, error() {} } };
vm.createContext(ctx);
const MERGE_STMT = 'Object.assign(INGR,HIDDEN_INGR);';
let mergeFound = false;
for (const f of DATA_FILES) {
  let src = rd(f);
  // snapshot INGR keys right before game-data.js merges HIDDEN_INGR into it, so collisions are detectable
  if (f === 'game-data.js' && src.includes(MERGE_STMT)) { mergeFound = true; src = src.replace(MERGE_STMT, 'var __INGR_PRE_MERGE=Object.keys(INGR);' + MERGE_STMT); }
  try { vm.runInContext(src, ctx, { filename: f }); }
  catch (e) { console.log(`FAIL  load ${f}: ${e.message}`); process.exit(1); }
}
const G = ctx;

// ───────────── tiny check framework ─────────────
const results = [];
function check(name, fn) {
  let fails = [];
  try { fails = fn() || []; } catch (e) { fails = ['check threw: ' + (e.stack || e).toString().split('\n').slice(0, 2).join(' | ')]; }
  results.push({ name, fails });
}
const warns = [];
const warn = (name, items) => { if (items.length) warns.push({ name, items }); };

const arr = v => (Array.isArray(v) ? v : v == null ? [] : [v]);
const keys = o => Object.keys(o || {});
const missing = (set, ids, where) => arr(ids).filter(id => !set.has(id)).map(id => `${where}: '${id}'`);
const dupIds = (list, label) => {
  const seen = Object.create(null), out = [];
  for (const x of list) { if (!x || x.id == null) continue; if (seen[x.id]) out.push(`${label}: duplicate id '${x.id}'`); seen[x.id] = 1; }
  return out;
};

// ───────────── id spaces ─────────────
const ZONES = new Set(keys(G.LOCATIONS));
const INGR_IDS = new Set(G.__INGR_PRE_MERGE || keys(G.INGR)); // INGR before HIDDEN_INGR is merged in
const HING_IDS = new Set(keys(G.HIDDEN_INGR));
const ING = new Set([...keys(G.INGR), ...HING_IDS]);
const isPlaceholder = id => /^_any/.test(id); // fieldOnly recipes use _any* slots (any N fresh ingredients)
const ALL_RECIPES = G.RECIPES; // game-data.js pushes MARCH_RECIPES into RECIPES
const RECIPE = new Set(ALL_RECIPES.map(r => r.id));
const ENCH = new Set(G.ENCHANTMENTS.map(e => e.id));
const REGION = new Set(G.REGIONS.map(r => r.id));
const FACTION = new Set(keys(G.FACTIONS));
const THREAT = new Set(keys(G.THREAT_FACTIONS));
const CLASS = new Set(keys(G.CLASSES));
const SKILL = new Set(keys(G.SKILLS));
const STAT = new Set(keys(G.STATS));
const FEAT = new Set(keys(G.FEATS));
const UPG = new Set(keys(G.UPGRADES));
const PRESTIGE = new Set(keys(G.PRESTIGE_CLASSES));
const NPC_NAMES = new Set(Object.values(G.NPCS).map(n => n.name));
const QUEST_IDS = new Set(G.QUESTS.map(q => q.id));
const ROUTES = new Set(G.CARAVAN_ROUTES.map(r => r.id));
const BUFFS = new Set(keys(G.ELIXIR_BUFFS));
const QUEST_LOCS = new Set(['market', 'tavern', 'chapel']);
const RANKS = new Set(['trained', 'expert', 'master']);

const REMOVED_STATS = ['com'];
const REMOVED_SKILLS = ['commerce', 'aesthetics', 'haggling', 'stockpiling', 'efficiency', 'lore', 'appraisal', 'procurement'];
const REMOVED_CLASSES = ['merchant'];
const REMOVED_SPECS = ['guildmaster', 'trader'];
const REMOVED_ALL = new Set([...REMOVED_STATS, ...REMOVED_SKILLS, ...REMOVED_CLASSES, ...REMOVED_SPECS]);

// zone of a quest — mirrors index.html locQuests filter
const questZone = id => {
  if (id.startsWith('aq')) return 'ashfall';
  if (id.startsWith('tq')) return 'tidecrest';
  if (id.startsWith('sr_')) return 'skyreach';
  if (/^fc_(sm|fk|dw)/.test(id)) return 'ashfall';
  if (/^fc_(hg|pd|tk|mm)/.test(id)) return 'tidecrest';
  return 'cindervale';
};

const grantPool = g => (g == null ? [] : Array.isArray(g) ? g : arr(g.pool)); // grantRecipes/grantEnchants = {pool:[ids],count}

// ═════════════════════════ CHECKS ═════════════════════════

check('Data files load and core globals defined', () =>
  ['INGR', 'HIDDEN_INGR', 'RECIPES', 'ENCHANTMENTS', 'REGIONS', 'HIDDEN_REGIONS', 'QUESTS', 'NPCS', 'FACTIONS', 'THREAT_FACTIONS',
    'CLASSES', 'SKILLS', 'STATS', 'FEATS', 'PRESTIGE_CLASSES', 'SEASONS', 'RANGER_COMPANIONS', 'ZONE_IMGS', 'ROOM_IMGS', 'TOWN_IMGS',
    'NPC_PORTRAIT_IMGS', 'PORTRAITS', 'DEF'].filter(n => G[n] === undefined).map(n => `missing global ${n}`));

check('Unique ids in id-bearing arrays', () => [
  ...dupIds(ALL_RECIPES, 'RECIPES+MARCH_RECIPES'), ...dupIds(G.ENCHANTMENTS, 'ENCHANTMENTS'), ...dupIds(G.REGIONS, 'REGIONS'),
  ...dupIds(G.HIDDEN_REGIONS, 'HIDDEN_REGIONS'), ...dupIds(G.QUESTS, 'QUESTS'), ...dupIds(G.RANGER_COMPANIONS, 'RANGER_COMPANIONS'),
  ...dupIds(G.CARAVAN_ROUTES, 'CARAVAN_ROUTES'), ...dupIds(G.SUPPLY_PARTNERS, 'SUPPLY_PARTNERS'), ...dupIds(G.FACTION_PAIRS, 'FACTION_PAIRS'),
  ...dupIds(G.SETTLEMENT_PROJECTS, 'SETTLEMENT_PROJECTS'), ...dupIds(G.CLINIC_AILMENTS, 'CLINIC_AILMENTS'), ...dupIds(G.TOWN_EVENTS, 'TOWN_EVENTS'),
  ...dupIds(G.AP_POOL, 'AP_POOL'), ...dupIds(Object.values(G.FIELD_DISCOVERIES).flat(), 'FIELD_DISCOVERIES'),
  ...dupIds(G.ALL_LORE_FRAGMENTS || [], 'LORE fragments'), ...dupIds(G.GADGET_BLUEPRINTS, 'GADGET_BLUEPRINTS'),
  ...dupIds(G.CONSTRUCTOR_BPS, 'CONSTRUCTOR_BPS'), ...dupIds(G.SHIELD_COMMISSIONS, 'SHIELD_COMMISSIONS'), ...dupIds(G.VENOM_CONTRACTS, 'VENOM_CONTRACTS'),
  ...[...RECIPE].filter(id => ENCH.has(id)).map(id => `id '${id}' is both a recipe and an enchantment`),
]);

check('Object keys match embedded .id fields', () => {
  const out = [];
  for (const [n, o] of Object.entries({ INGR: G.INGR, HIDDEN_INGR: G.HIDDEN_INGR, CLASSES: G.CLASSES, SKILLS: G.SKILLS, FEATS: G.FEATS, UPGRADES: G.UPGRADES,
    PRESTIGE_CLASSES: G.PRESTIGE_CLASSES, FACTIONS: G.FACTIONS, THREAT_FACTIONS: G.THREAT_FACTIONS, ELIXIR_BUFFS: G.ELIXIR_BUFFS, MILESTONES: G.MILESTONES,
    LOCATIONS: G.LOCATIONS, NPCS: G.NPCS, INFUSIONS: G.INFUSIONS, FORTRESS_TYPES: G.FORTRESS_TYPES, LORE_CHAINS: G.LORE_CHAINS, WILDCRAFTS: G.WILDCRAFTS }))
    for (const [k, v] of Object.entries(o)) if (v && v.id !== undefined && v.id !== k) out.push(`${n}.${k}.id = '${v.id}'`);
  for (const [cid, c] of Object.entries(G.CLASSES)) for (const [sid, s] of Object.entries(c.specs || {})) if (s.id !== sid) out.push(`CLASSES.${cid}.specs.${sid}.id='${s.id}'`);
  return out;
});

check('HIDDEN_INGR ids do not collide with INGR (Object.assign overwrite)', () => {
  if (!mergeFound) return [`'${MERGE_STMT}' not found in game-data.js — update datacheck.js snapshot logic`];
  return [...HING_IDS].filter(id => INGR_IDS.has(id)).map(id => `HIDDEN_INGR '${id}' overwrites INGR '${id}'`);
});

check('MARCH_RECIPES are all present in RECIPES (pushed at load)', () =>
  (G.MARCH_RECIPES || []).filter(r => !G.RECIPES.includes(r)).map(r => `MARCH_RECIPES ${r.id} not in RECIPES`));

check('Recipe ingredients exist (RECIPES, MARCH_RECIPES)', () => {
  const out = [];
  for (const r of ALL_RECIPES) {
    out.push(...missing(ING, r.ingr.filter(i => !(r.fieldOnly && isPlaceholder(i))), `recipe ${r.id}.ingr`));
    if (!STAT.has(r.stat)) out.push(`recipe ${r.id}.stat '${r.stat}'`);
    if (r.faction && !FACTION.has(r.faction)) out.push(`recipe ${r.id}.faction '${r.faction}'`);
    if (r.buff && !BUFFS.has(r.buff)) out.push(`recipe ${r.id}.buff '${r.buff}' not in ELIXIR_BUFFS`);
  }
  for (const id of G.HOLLOW_MARCH?.marchRecipes || []) if (!RECIPE.has(id)) out.push(`HOLLOW_MARCH.marchRecipes '${id}'`);
  return out;
});

check('Enchantment ingredients / categories exist', () => {
  const out = [];
  for (const e of G.ENCHANTMENTS) {
    out.push(...missing(ING, e.ingr, `ench ${e.id}.ingr`));
    if (!G.ENCH_CATS[e.cat]) out.push(`ench ${e.id}.cat '${e.cat}'`);
    if (e.faction && !FACTION.has(e.faction)) out.push(`ench ${e.id}.faction '${e.faction}'`);
  }
  return out;
});

check('INGR_SUBS / INGR.skyreach targets exist', () => {
  const out = [];
  for (const [base, m] of Object.entries(G.INGR_SUBS)) {
    if (!ING.has(base)) out.push(`INGR_SUBS key '${base}' not an ingredient`);
    for (const [z, t] of Object.entries(m)) {
      if (!ZONES.has(z)) out.push(`INGR_SUBS.${base} zone '${z}'`);
      if (!ING.has(t)) out.push(`INGR_SUBS.${base}.${z} -> '${t}'`);
    }
  }
  for (const [id, i] of Object.entries(G.INGR)) if (i.skyreach && !ING.has(i.skyreach)) out.push(`INGR.${id}.skyreach -> '${i.skyreach}'`);
  return out;
});

check('FACTION_SUBS / THREAT_SUBS targets exist and are in the target zone', () => {
  const out = [];
  for (const [base, m] of Object.entries(G.FACTION_SUBS)) {
    if (!FACTION.has(base)) out.push(`FACTION_SUBS key '${base}'`);
    for (const [z, t] of Object.entries(m)) {
      if (!FACTION.has(t)) out.push(`FACTION_SUBS.${base}.${z} -> '${t}'`);
      else if (G.FACTIONS[t].loc && G.FACTIONS[t].loc !== z) out.push(`FACTION_SUBS.${base}.${z} -> '${t}' (loc ${G.FACTIONS[t].loc})`);
    }
  }
  for (const [base, m] of Object.entries(G.THREAT_SUBS)) {
    if (!THREAT.has(base)) out.push(`THREAT_SUBS key '${base}'`);
    for (const [z, t] of Object.entries(m)) {
      if (!THREAT.has(t)) out.push(`THREAT_SUBS.${base}.${z} -> '${t}'`);
      else if (G.THREAT_FACTIONS[t].loc !== z) out.push(`THREAT_SUBS.${base}.${z} -> '${t}' (loc ${G.THREAT_FACTIONS[t].loc})`);
    }
  }
  return out;
});

check('Quests: giver is an NPC display name, loc is market/tavern/chapel', () => {
  const out = [];
  for (const q of G.QUESTS) {
    if (!NPC_NAMES.has(q.giver)) out.push(`quest ${q.id}.giver '${q.giver}' is not an NPCS[].name`);
    if (!QUEST_LOCS.has(q.loc)) out.push(`quest ${q.id}.loc '${q.loc}'`);
  }
  return out;
});

check("Quests: giver NPC's loc matches quest loc", () => {
  const byName = Object.fromEntries(Object.values(G.NPCS).map(n => [n.name, n]));
  return G.QUESTS.filter(q => byName[q.giver] && byName[q.giver].loc !== q.loc)
    .map(q => `quest ${q.id} loc '${q.loc}' but ${q.giver} is in '${byName[q.giver].loc}'`);
});

check('Quests: targets / items / faction / prereq ids resolve', () => {
  const out = [];
  for (const q of G.QUESTS) {
    if (q.type === 'deliver') { if (!RECIPE.has(q.target) && !ENCH.has(q.target)) out.push(`quest ${q.id} deliver target '${q.target}'`); }
    else if (q.type === 'gather') { if (!ING.has(q.target)) out.push(`quest ${q.id} gather target '${q.target}'`); }
    else if (q.type === 'multi') { for (const t of arr(q.targets)) if (!RECIPE.has(t) && !ENCH.has(t)) out.push(`quest ${q.id} multi target '${t}'`); }
    else out.push(`quest ${q.id} unknown type '${q.type}'`);
    out.push(...missing(ING, q.items, `quest ${q.id}.items`));
    if (q.faction && !FACTION.has(q.faction)) out.push(`quest ${q.id}.faction '${q.faction}'`);
    if (q.chain && !FACTION.has(q.chain)) out.push(`quest ${q.id}.chain '${q.chain}'`);
    for (const r of arr(q.reqQuest)) if (!QUEST_IDS.has(r)) out.push(`quest ${q.id}.reqQuest '${r}'`);
  }
  return out;
});

check("Quests: faction belongs to the quest's zone", () =>
  G.QUESTS.filter(q => q.faction && G.FACTIONS[q.faction] && G.FACTIONS[q.faction].loc !== questZone(q.id))
    .map(q => `quest ${q.id} (zone ${questZone(q.id)}) faction '${q.faction}' is ${G.FACTIONS[q.faction].loc}`));

check('NPCS have lines[] / title / portrait', () => {
  const out = [];
  for (const [id, n] of Object.entries(G.NPCS)) {
    if (!Array.isArray(n.lines) || !n.lines.length) out.push(`NPCS.${id} missing lines[]`);
    if (n.dialogue) out.push(`NPCS.${id} uses 'dialogue' (should be lines)`);
    if (!n.title) out.push(`NPCS.${id} missing title`);
    if (!n.portrait) out.push(`NPCS.${id} (${n.name}) missing portrait`);
    if (!QUEST_LOCS.has(n.loc)) out.push(`NPCS.${id}.loc '${n.loc}'`);
  }
  return out;
});

check('Regions: ingredient drops / site weights / loc / faction resolve', () => {
  const out = [];
  for (const r of G.REGIONS) {
    out.push(...missing(ING, r.ingr, `region ${r.id}.ingr`));
    if (!ZONES.has(r.loc)) out.push(`region ${r.id}.loc '${r.loc}'`);
    if (r.faction && !FACTION.has(r.faction)) out.push(`region ${r.id}.faction '${r.faction}'`);
    for (const s of r.sites || []) for (const k of keys(s.weights)) {
      if (!ING.has(k)) out.push(`region ${r.id} site ${s.id} weight '${k}'`);
      else if (!r.ingr.includes(k)) out.push(`region ${r.id} site ${s.id} weight '${k}' not in region.ingr`);
    }
  }
  for (const h of G.HIDDEN_REGIONS) {
    if (!REGION.has(h.region)) out.push(`hidden region ${h.id}.region '${h.region}'`);
    out.push(...missing(ING, h.ingr, `hidden region ${h.id}.ingr`));
  }
  for (const [rid, list] of Object.entries(G.FIELD_DISCOVERIES)) {
    if (!REGION.has(rid)) out.push(`FIELD_DISCOVERIES key '${rid}'`);
    for (const d of list) if (d.bonus?.ingredient && !ING.has(d.bonus.ingredient)) out.push(`FIELD_DISCOVERIES ${d.id}.bonus.ingredient '${d.bonus.ingredient}'`);
  }
  return out;
});

check('Every INGR / HIDDEN_INGR ingredient is obtainable somewhere', () => {
  // obtainable = region/hidden-region drop, shop, caravan, supply partner, companion, quest reward, start inv, faction res, field discovery
  const src = new Set();
  const add = a => arr(a).forEach(x => src.add(x));
  G.REGIONS.forEach(r => add(r.ingr)); G.HIDDEN_REGIONS.forEach(h => add(h.ingr)); G.SHOP_I.forEach(s => add(s.id));
  G.CARAVAN_ROUTES.forEach(c => add(c.tradeIngr)); G.SUPPLY_PARTNERS.forEach(s => Object.values(s.output || {}).forEach(add));
  G.RANGER_COMPANIONS.forEach(c => add(c.primary?.ingr)); G.QUESTS.forEach(q => add(q.items));
  Object.values(G.LOCATIONS).forEach(l => add(keys(l.startInv))); Object.values(G.FACTIONS).forEach(f => add(f.res));
  Object.values(G.SEASONS).flat().forEach(s => add(s.ingr));
  for (const z of ZONES) add(G.getSeasonalIngr(null, z, true));
  Object.values(G.FIELD_DISCOVERIES).flat().forEach(d => add(d.bonus?.ingredient));
  // hard-coded drop tables in index.html (e.g. salvage-auction rare trades) count as sources
  for (const m of APP.matchAll(/'([a-z][a-z0-9_]+)'|\.([a-z][a-z0-9_]+)\s*=/g)) { const id = m[1] || m[2]; if (ING.has(id)) src.add(id); }
  const unobt = [...ING].filter(i => !src.has(i));
  // only report the ones some recipe/enchant actually needs (otherwise it is dead data, reported in INFO)
  const needed = new Set([...ALL_RECIPES, ...G.ENCHANTMENTS].flatMap(r => r.ingr));
  const neededBy = i => [...ALL_RECIPES, ...G.ENCHANTMENTS].filter(r => r.ingr.includes(i)).map(r => r.id).join(',');
  warn('Ingredients defined but never obtainable AND never used by any recipe/enchant (dead INGR entries)', unobt.filter(i => !needed.has(i)));
  return unobt.filter(i => needed.has(i)).map(i => `ingredient '${i}' has no source (region/hidden/season/shop/caravan/partner/companion/quest/index.html) but is required by ${neededBy(i)}`);
});

check('Skills / classes / specs reference valid stats, skills, recipes, enchants', () => {
  const out = [];
  for (const s of Object.values(G.SKILLS)) if (!STAT.has(s.stat)) out.push(`skill ${s.id}.stat '${s.stat}'`);
  for (const [cid, c] of Object.entries(G.CLASSES)) {
    if (!STAT.has(c.primaryStat)) out.push(`class ${cid}.primaryStat '${c.primaryStat}'`);
    out.push(...missing(SKILL, c.profSkills, `class ${cid}.profSkills`));
    const feats = [...(c.features || []).map(f => ['feature', f])];
    for (const [sid, s] of Object.entries(c.specs || {})) {
      if (s.bStat && !STAT.has(s.bStat)) out.push(`spec ${cid}.${sid}.bStat '${s.bStat}'`);
      out.push(...missing(SKILL, s.bSkills, `spec ${cid}.${sid}.bSkills`));
      (s.features || []).forEach(f => feats.push([`spec ${sid}`, f]));
    }
    for (const [w, f] of feats) {
      out.push(...missing(RECIPE, grantPool(f.grantRecipes), `class ${cid} ${w} '${f.name}'.grantRecipes`));
      out.push(...missing(ENCH, grantPool(f.grantEnchants), `class ${cid} ${w} '${f.name}'.grantEnchants`));
      for (const cat of keys(f.categoricalBrewBonus)) if (!ALL_RECIPES.some(r => r.cat === cat)) out.push(`class ${cid} ${w} '${f.name}' categoricalBrewBonus cat '${cat}' matches no recipe`);
    }
  }
  return out;
});

check('Feat prereqs resolve (req.feat / req.<classId>)', () => {
  const out = [];
  for (const f of Object.values(G.FEATS)) {
    if (!G.FEAT_CATEGORIES[f.cat]) out.push(`feat ${f.id}.cat '${f.cat}'`);
    for (const [k, v] of Object.entries(f.req || {})) {
      if (k === 'feat') { out.push(...missing(FEAT, v, `feat ${f.id}.req.feat`)); if (Array.isArray(v)) out.push(`feat ${f.id}.req.feat is an array; FEATS UI (index.html f.req.feat) only handles a single id`); }
      else if (!CLASS.has(k)) out.push(`feat ${f.id}.req key '${k}' is not a class/feat`);
    }
  }
  return out;
});

check('Prestige prereqs resolve (classes / feat / skillRank / anyTwoClasses)', () => {
  const out = [];
  for (const p of Object.values(G.PRESTIGE_CLASSES)) {
    for (const [k, v] of Object.entries(p.req || {})) {
      if (k === 'skillRank') { for (const [sk, rank] of Object.entries(v)) { if (!SKILL.has(sk)) out.push(`prestige ${p.id}.req.skillRank '${sk}'`); if (!RANKS.has(rank)) out.push(`prestige ${p.id}.req.skillRank.${sk} rank '${rank}'`); } }
      else if (k === 'feat') out.push(...missing(FEAT, v, `prestige ${p.id}.req.feat`));
      else if (k === 'anyTwoClasses') { if (typeof v !== 'number') out.push(`prestige ${p.id}.req.anyTwoClasses not a number`); }
      else if (!CLASS.has(k)) out.push(`prestige ${p.id}.req key '${k}' unknown (removed class?)`);
    }
    for (const f of p.features || []) {
      out.push(...missing(RECIPE, grantPool(f.grantRecipes), `prestige ${p.id} '${f.name}'.grantRecipes`));
      out.push(...missing(ENCH, grantPool(f.grantEnchants), `prestige ${p.id} '${f.name}'.grantEnchants`));
    }
  }
  return out;
});

check('THREAT_FACTIONS use penalties{rising,dangerous,critical}; threat ids resolve', () => {
  const out = [];
  for (const [id, t] of Object.entries(G.THREAT_FACTIONS)) {
    if (t.penalty) out.push(`threat ${id} has singular 'penalty'`);
    if (!t.penalties) { out.push(`threat ${id} missing 'penalties'`); continue; }
    for (const tier of ['rising', 'dangerous', 'critical']) if (!t.penalties[tier]) out.push(`threat ${id}.penalties.${tier} missing`);
    for (const k of keys(t.penalties)) if (!['rising', 'dangerous', 'critical'].includes(k)) out.push(`threat ${id}.penalties unknown tier '${k}'`);
    if (!ZONES.has(t.loc)) out.push(`threat ${id}.loc '${t.loc}'`);
  }
  for (const [z, ids] of Object.entries(G.THREAT_IDS_BY_LOC)) for (const id of ids) {
    if (!THREAT.has(id)) out.push(`THREAT_IDS_BY_LOC.${z} '${id}'`); else if (G.THREAT_FACTIONS[id].loc !== z) out.push(`THREAT_IDS_BY_LOC.${z} '${id}' has loc ${G.THREAT_FACTIONS[id].loc}`);
  }
  for (const f of Object.values(G.FORTRESS_TYPES)) {
    if (!THREAT.has(f.threat)) out.push(`FORTRESS ${f.id}.threat '${f.threat}'`); else if (G.THREAT_FACTIONS[f.threat].loc !== f.loc) out.push(`FORTRESS ${f.id} loc ${f.loc} vs threat loc ${G.THREAT_FACTIONS[f.threat].loc}`);
  }
  for (const s of G.SHIELD_COMMISSIONS) if (s.wardTarget && !THREAT.has(s.wardTarget)) out.push(`SHIELD_COMMISSIONS ${s.id}.wardTarget '${s.wardTarget}'`);
  return out;
});

check('Seasons: per-zone, img present, threatMod keys are threats of that zone', () => {
  const out = [];
  for (const [z, list] of Object.entries(G.SEASONS)) {
    if (!ZONES.has(z)) out.push(`SEASONS key '${z}'`);
    if (list.length !== 4) out.push(`SEASONS.${z} has ${list.length} seasons (getSeason assumes 4)`);
    for (const s of list) {
      if (!s.img) out.push(`season ${z}.${s.id} missing img`);
      for (const t of keys(s.threatMod)) {
        if (!THREAT.has(t)) out.push(`season ${z}.${s.id}.threatMod '${t}'`);
        else if (G.THREAT_FACTIONS[t].loc !== z) out.push(`season ${z}.${s.id}.threatMod '${t}' belongs to ${G.THREAT_FACTIONS[t].loc} (no effect in ${z})`);
      }
      out.push(...missing(ING, s.ingr, `season ${z}.${s.id}.ingr`));
    }
  }
  return out;
});

check('Companions: region/ingredients resolve, img field present', () => {
  const out = [];
  for (const c of G.RANGER_COMPANIONS) {
    if (!REGION.has(c.region)) out.push(`companion ${c.id}.region '${c.region}'`);
    out.push(...missing(ING, c.primary?.ingr, `companion ${c.id}.primary.ingr`));
    if (!c.img) out.push(`companion ${c.id} has no img (file ${fs.existsSync(path.join(REPO, 'companion_' + c.id + '.jpg')) ? 'companion_' + c.id + '.jpg EXISTS in repo, unused' : 'not in repo'})`);
  }
  return out;
});

check('Factions / pairs / lore / misc faction refs resolve', () => {
  const out = [];
  for (const f of Object.values(G.FACTIONS)) { if (!ING.has(f.res)) out.push(`faction ${f.id}.res '${f.res}'`); if (!ZONES.has(f.loc)) out.push(`faction ${f.id}.loc '${f.loc}'`); }
  for (const p of G.FACTION_PAIRS) {
    for (const fid of p.factions) { if (!FACTION.has(fid)) out.push(`pair ${p.id} faction '${fid}'`); else if (G.FACTIONS[fid].loc !== p.loc) out.push(`pair ${p.id} faction '${fid}' not in ${p.loc}`); }
    for (const k of keys(p.effect)) {
      let m;
      if ((m = k.match(/^recipeBonus_(.+)$/)) && !RECIPE.has(m[1])) out.push(`pair ${p.id}.effect '${k}' recipe missing`);
      if ((m = k.match(/^regionForage_(.+)$/)) && !REGION.has(m[1])) out.push(`pair ${p.id}.effect '${k}' region missing`);
    }
  }
  for (const c of Object.values(G.LORE_CHAINS)) for (const fr of c.fragments) out.push(...missing(FACTION, fr.factions, `lore ${fr.id}.factions`));
  for (const v of G.VENOM_CONTRACTS) { if (v.faction && !FACTION.has(v.faction)) out.push(`venom ${v.id}.faction '${v.faction}'`); out.push(...missing(ING, v.ingredients, `venom ${v.id}.ingredients`)); }
  for (const s of G.SHIELD_COMMISSIONS) { if (s.faction && !FACTION.has(s.faction)) out.push(`shield ${s.id}.faction '${s.faction}'`); out.push(...missing(ENCH, s.layers, `shield ${s.id}.layers`)); }
  for (const k of keys(G.DEF.fRep)) if (!FACTION.has(k)) out.push(`DEF.fRep '${k}'`);
  return out;
});

check('Material costs / shop / caravans / supply partners / projects / upgrades resolve', () => {
  const out = [];
  const matCost = (o, w) => { for (const k of keys(o)) if (k !== 'gold' && !ING.has(k)) out.push(`${w} cost '${k}'`); };
  for (const u of Object.values(G.UPGRADES)) { matCost(u.cost, `upgrade ${u.id}`); if (u.req && !UPG.has(u.req)) out.push(`upgrade ${u.id}.req '${u.req}'`); }
  { const seen = {}; for (const r of G.ROOM_DEFS) for (const u of r.upgrades) { if (!UPG.has(u)) out.push(`ROOM_DEFS.${r.id} upgrade '${u}'`); seen[u] = (seen[u] || 0) + 1; } for (const u of UPG) if (seen[u] !== 1) out.push(`upgrade '${u}' in ${seen[u] || 0} rooms`); }
  for (const r of G.ROOM_DEFS) out.push(...missing(UPG, r.upgrades, `ROOM_DEFS ${r.id}.upgrades`));
  const inRooms = G.ROOM_DEFS.flatMap(r => r.upgrades);
  for (const u of UPG) { const n = inRooms.filter(x => x === u).length; if (n !== 1) out.push(`upgrade '${u}' appears in ${n} ROOM_DEFS rooms (expected 1)`); }
  for (const x of [...G.FORGE_WEAPONS, ...G.GADGET_BLUEPRINTS, ...G.CONSTRUCTOR_BPS]) matCost(x.matCost, x.id);
  for (const p of G.SETTLEMENT_PROJECTS) {
    for (const [z, c] of Object.entries(p.matCost || {})) { if (!ZONES.has(z)) out.push(`project ${p.id}.matCost zone '${z}'`); matCost(c, `project ${p.id}.${z}`); }
    if (p.req && !G.SETTLEMENT_PROJECTS.some(x => x.id === p.req)) out.push(`project ${p.id}.req '${p.req}'`);
  }
  for (const s of G.SHOP_I) { if (!ING.has(s.id)) out.push(`SHOP_I '${s.id}'`); if (s.loc && !ZONES.has(s.loc)) out.push(`SHOP_I ${s.id}.loc '${s.loc}'`); }
  for (const c of G.CARAVAN_ROUTES) { if (!REGION.has(c.region)) out.push(`caravan ${c.id}.region '${c.region}'`); out.push(...missing(ING, c.tradeIngr, `caravan ${c.id}.tradeIngr`)); }
  for (const s of G.SUPPLY_PARTNERS) { if (!ROUTES.has(s.route)) out.push(`supply ${s.id}.route '${s.route}'`); for (const [t, l] of Object.entries(s.output || {})) out.push(...missing(ING, l, `supply ${s.id}.output.${t}`)); }
  for (const [z, l] of Object.entries(G.LOCATIONS)) {
    for (const k of keys(l.startInv)) if (!ING.has(k)) out.push(`LOCATIONS.${z}.startInv '${k}'`);
    out.push(...missing(RECIPE, l.startRecipes, `LOCATIONS.${z}.startRecipes`)); out.push(...missing(ENCH, l.startEnch, `LOCATIONS.${z}.startEnch`));
  }
  for (const k of keys(G.DEF.inv)) if (!ING.has(k)) out.push(`DEF.inv '${k}'`);
  out.push(...missing(RECIPE, G.DEF.known, 'DEF.known'), ...missing(ENCH, G.DEF.knownEnch, 'DEF.knownEnch'));
  return out;
});

check('Clinic / board-quest / crisis / staff refs resolve', () => {
  const out = [];
  for (const a of G.CLINIC_AILMENTS) {
    out.push(...missing(RECIPE, [...arr(a.great), ...arr(a.good)], `ailment ${a.id}`));
    // index.html clinic: CLINIC_AILMENTS.filter(a=>a.tier<=maxTier...) then uses great/good/hints/category
    for (const k of ['tier', 'great', 'good', 'hints', 'category']) if (a[k] === undefined) out.push(`ailment ${a.id} (${a.loc}) missing '${k}'${k === 'tier' ? ' -> never offered (undefined<=maxTier is false)' : ''}`);
    if (a.loc && !ZONES.has(a.loc)) out.push(`ailment ${a.id}.loc '${a.loc}'`);
  }
  for (const t of G.BQ_TEMPLATES) {
    const set = t.type === 'gather' ? ING : new Set([...RECIPE, ...ENCH]);
    out.push(...missing(set, t.pool, `BQ_TEMPLATE ${t.type}/t${t.tier}${t.loc ? '/' + t.loc : ''}.pool`));
    if (t.loc && !ZONES.has(t.loc)) out.push(`BQ_TEMPLATE loc '${t.loc}'`);
  }
  for (const c of G.CRISIS_TEMPLATES) for (const s of c.solutions || []) {
    if (s.skill && !SKILL.has(s.skill)) out.push(`crisis ${c.id}/${s.id}.skill '${s.skill}'`);
    if (s.stat && !STAT.has(s.stat)) out.push(`crisis ${c.id}/${s.id}.stat '${s.stat}'`);
  }
  for (const [k, t] of Object.entries(G.TASK_TYPES)) if (!STAT.has(t.stat)) out.push(`TASK_TYPES.${k}.stat '${t.stat}'`);
  for (const a of G.AP_POOL) {
    for (const s of keys(a.baseStat)) if (!STAT.has(s)) out.push(`AP_POOL ${a.id}.baseStat '${s}'`);
    for (const t of arr(a.traits)) if (!G.TRAIT_FX[t]) out.push(`AP_POOL ${a.id}.trait '${t}' not in TRAIT_FX`);
    if (a.loc && !ZONES.has(a.loc)) out.push(`AP_POOL ${a.id}.loc '${a.loc}'`);
  }
  for (const t of G.TEACHABLE_TRAITS) if (!G.TRAIT_FX[t]) out.push(`TEACHABLE_TRAITS '${t}'`);
  out.push(...missing(STAT, G.TRAINABLE_STATS, 'TRAINABLE_STATS'));
  for (const s of keys(G.DEF.stats)) if (!STAT.has(s)) out.push(`DEF.stats '${s}'`);
  for (const s of STAT) if (!(s in G.DEF.stats)) out.push(`DEF.stats missing '${s}'`);
  for (const e of G.TOWN_EVENTS) { if (e.vibe && !G.EVENT_VIBES[e.vibe]) out.push(`TOWN_EVENT ${e.id}.vibe '${e.vibe}'`); if (e.loc && !ZONES.has(e.loc)) out.push(`TOWN_EVENT ${e.id}.loc '${e.loc}'`); }
  for (const k of keys(G.POT_LINES)) if (!G.CUST_DATA[k]) out.push(`POT_LINES '${k}' not a CUST_DATA customer`);
  for (const z of keys(G.BQ_GIVERS_BY_LOC)) if (!ZONES.has(z)) out.push(`BQ_GIVERS_BY_LOC '${z}'`);
  return out;
});

check('No references to removed stats/skills/classes/specs in game data', () => {
  const out = [];
  const walk = (v, p, depth) => {
    if (depth > 12 || v == null) return;
    if (typeof v === 'string') { if (REMOVED_ALL.has(v)) out.push(`${p} = '${v}'`); return; }
    if (typeof v !== 'object') return;
    for (const [k, x] of Object.entries(v)) {
      if (REMOVED_ALL.has(k)) out.push(`${p}.${k} (key)`);
      walk(x, Array.isArray(v) ? `${p}[${k}]` : `${p}.${k}`, depth + 1);
    }
  };
  for (const n of ['STATS', 'SKILLS', 'CLASSES', 'FEATS', 'PRESTIGE_CLASSES', 'AP_POOL', 'TASK_TYPES', 'CRISIS_TEMPLATES', 'DEF', 'RECIPES',
    'TRAINABLE_STATS', 'TRAIT_FX', 'SPEC_MATCH', 'ELIXIR_BUFFS', 'UPGRADES', 'FACTIONS', 'RANGER_COMPANIONS', 'SETTLEMENT_PROJECTS', 'MILESTONES'])
    walk(G[n], n, 0);
  if (CLASS.has('merchant')) out.push('CLASSES.merchant exists');
  for (const c of Object.values(G.CLASSES)) for (const s of REMOVED_SPECS) if (c.specs?.[s]) out.push(`CLASSES.${c.id}.specs.${s}`);
  return out;
});

check('No live references to removed stats/skills/classes in game.jsx (migration code excluded)', () => {
  const out = [];
  const lines = APP.split('\n');
  const ids = [...REMOVED_SKILLS, ...REMOVED_SPECS, 'merchant'].join('|');
  const reQuoted = new RegExp(`['"\`](${ids})['"\`]`);
  const reKey = new RegExp(`[{,]\\s*(com|${ids})\\s*:`);
  const reAccess = new RegExp(`\\.(com|merchant|${REMOVED_SKILLS.join('|')})\\b(?![.\\/'"\\w-])`);
  const reCall = new RegExp(`(eCL|eSpec|getSkMod|doCheck|pureCheck|getMod)\\(\\s*['"](com|${ids})['"]`);
  const allow = /V2 migration|_removedSkills|s\.stats\?\.com|s\.specs\?\.merchant/;
  lines.forEach((l, i) => {
    if (allow.test(l)) return;
    for (const re of [reCall, reQuoted, reKey, reAccess]) {
      const m = l.match(re);
      if (m) { out.push(`game.jsx:${i + 1}: …${l.slice(Math.max(0, m.index - 40), m.index + 50).trim()}…`); break; }
    }
  });
  return out;
});

check('Hard-coded id literals in game.jsx resolve against game-data', () => {
  const out = new Set();
  const lines = APP.split('\n');
  const SPEC = cid => new Set(keys(G.CLASSES[cid]?.specs));
  const MIL = new Set(keys(G.MILESTONES));
  const rules = [
    [/eSpec\('([a-z_]+)'\)\s*[!=]==?\s*'([a-z_]+)'/g, m => (!CLASS.has(m[1]) ? `class '${m[1]}'` : !SPEC(m[1]).has(m[2]) ? `spec '${m[1]}.${m[2]}'` : null)],
    [/specs(?:\?\.|\.)([a-z_]+)\s*[!=]==?\s*'([a-z_]+)'/g, m => (CLASS.has(m[1]) && !SPEC(m[1]).has(m[2]) ? `spec '${m[1]}.${m[2]}'` : null)],
    [/\beCL\('([a-z_]+)'\)/g, m => (CLASS.has(m[1]) ? null : `class '${m[1]}'`)],
    [/\bclassLevels(?:\?\.|\.)([a-z_]+)/g, m => (CLASS.has(m[1]) ? null : `class '${m[1]}'`)],
    [/\bprestigeLevels(?:\?\.|\.)([a-z_]+)/g, m => (PRESTIGE.has(m[1]) ? null : `prestige '${m[1]}'`)],
    [/\b(?:getSkMod|doCheck|pureCheck)\('([a-z_]+)'/g, m => (SKILL.has(m[1]) ? null : `skill '${m[1]}'`)],
    [/\bskRanks(?:\?\.|\.)([a-z_]+)/g, m => (SKILL.has(m[1]) ? null : `skill '${m[1]}'`)],
    [/\bhasUp\('([a-z_0-9]+)'\)/g, m => (UPG.has(m[1]) ? null : `upgrade '${m[1]}'`)],
    [/\bupgrades\.includes\('([a-z_0-9]+)'\)/g, m => (UPG.has(m[1]) ? null : `upgrade '${m[1]}'`)],
    [/\bplayerFeats\.includes\('([a-z_]+)'\)/g, m => (FEAT.has(m[1]) ? null : `feat '${m[1]}'`)],
    [/\bearnMilestone\('([a-z_0-9]+)'\)/g, m => (MIL.has(m[1]) ? null : `milestone '${m[1]}'`)],
    [/\bgetRL\('([a-z_]+)'\)/g, m => (FACTION.has(m[1]) ? null : `faction '${m[1]}'`)],
    [/\bmodInv\('([a-z_]+)'/g, m => (ING.has(m[1]) ? null : `ingredient '${m[1]}'`)],
    [/\bknown\.includes\('([a-z_]+)'\)/g, m => (RECIPE.has(m[1]) ? null : `recipe '${m[1]}'`)],
    [/\bknownEnch\.includes\('([a-z_]+)'\)/g, m => (ENCH.has(m[1]) ? null : `enchant '${m[1]}'`)],
    [/\bINGR(?:\?\.|\.)([a-z_]+)\b(?!\s*=)/g, m => (ING.has(m[1]) ? null : `ingredient '${m[1]}'`)],
    [/\bSTATS(?:\?\.|\.)([a-z]+)\b/g, m => (STAT.has(m[1]) ? null : `stat '${m[1]}'`)],
    [/\b(?:eStat|getMod\(eStat)\('([a-z]+)'\)/g, m => (STAT.has(m[1]) ? null : `stat '${m[1]}'`)],
    [/\bstats(?:\?\.|\.)([a-z]+)\b/g, m => (STAT.has(m[1]) ? null : `stat '${m[1]}'`)],
  ];
  const allow = /V2 migration|_removedSkills|s\.stats\?\.com|s\.specs\?\.merchant/;
  lines.forEach((l, i) => {
    if (allow.test(l) || /^\s*\/\//.test(l)) return;
    for (const [re, f] of rules) for (const m of l.matchAll(re)) { const r = f(m); if (r) out.add(`game.jsx:${i + 1} unknown ${r}`); }
  });
  return [...out];
});

// ───────────── images / files ─────────────
const IMG_RE = /\.(png|jpe?g|webp|gif|svg)(\?.*)?$/i;
const BASE_URL = 'https://jumppiejim-creator.github.io/cindervale-alchemist/';
const toLocal = s => {
  if (s.startsWith('data:')) return null;
  if (s.startsWith(BASE_URL)) return s.slice(BASE_URL.length).replace(/\?.*$/, '');
  if (/^https?:/.test(s)) return { external: s };
  return s.replace(/^\.\//, '').replace(/\?.*$/, '');
};
function collectImgs(v, p, out, depth = 0) {
  if (depth > 12 || v == null) return;
  if (typeof v === 'string') { if (IMG_RE.test(v.replace(/\?.*$/, '')) && !v.startsWith('data:')) out.push([p, v]); return; }
  if (typeof v !== 'object') return;
  for (const [k, x] of Object.entries(v)) collectImgs(x, Array.isArray(v) ? `${p}[${k}]` : `${p}.${k}`, out, depth + 1);
}

check('Image files referenced by data files exist in repo', () => {
  const refs = [];
  const names = new Set();
  for (const f of ['location-images.js', 'game-data.js', 'npc-portraits.js']) {
    const src = rd(f);
    for (const m of src.matchAll(/^\s*var\s+([A-Za-z_$][\w$]*)/gm)) names.add(m[1]);
  }
  names.delete('PORTRAITS');
  for (const n of names) collectImgs(G[n], n, refs);
  const out = [];
  for (const [p, s] of refs) {
    const l = toLocal(s);
    if (l && l.external) out.push(`${p} -> external URL ${s}`);
    else if (l && !fs.existsSync(path.join(REPO, l))) {
      const alt = ['.png', '.jpg', '.jpeg'].map(e => l.replace(/\.[a-z]+$/i, e)).find(a => a !== l && fs.existsSync(path.join(REPO, a)));
      out.push(`${p} -> ${l} missing${alt ? ` (but ${alt} exists)` : ''}`);
    }
  }
  return out;
});

check('Companion / season img fields point to existing files', () => {
  const out = [];
  for (const c of G.RANGER_COMPANIONS) if (c.img) { const l = toLocal(c.img); if (!l || l.external || !fs.existsSync(path.join(REPO, l))) out.push(`companion ${c.id}.img ${c.img}`); }
  for (const [z, l] of Object.entries(G.SEASONS)) for (const s of l) if (s.img) { const f = toLocal(s.img); if (!f || f.external || !fs.existsSync(path.join(REPO, f))) out.push(`season ${z}.${s.id}.img ${s.img}`); }
  return out;
});

check('NPC portrait map (npc-portraits.js + game.jsx NPC_PORTRAITS builder) points to existing files', () => {
  const out = [];
  const map = { ...(G.NPC_PORTRAIT_IMGS || {}) };
  for (const m of APP.matchAll(/\[([^\]]+)\]\.forEach\(k=>\{if\(!NPC_PORTRAITS\[k\]\)NPC_PORTRAITS\[k\]=(.+?);\}\);/g)) {
    const ks = m[1].split(',').map(s => s.trim().replace(/^'|'$/g, ''));
    const fn = new Function('k', 'return ' + m[2]);
    for (const k of ks) if (!map[k]) map[k] = fn(k);
  }
  for (const [k, f] of Object.entries(map)) if (!fs.existsSync(path.join(REPO, toLocal(f)))) out.push(`portrait ${k} -> ${f} missing`);
  // every quest-giving NPC should resolve to a portrait image (NpcPortrait looks up npc.id || lowercased name)
  for (const [id, n] of Object.entries(G.NPCS)) {
    const key = n.id || n.name.toLowerCase().replace(/\s+/g, '_');
    if (!map[key] && !map[n.name] && !map[n.name.toLowerCase()]) out.push(`NPCS.${id} (${n.name}) has no portrait image (key '${key}') -> CSS fallback`);
  }
  return out;
});

check('Image filename literals in game.jsx exist in repo', () => {
  const out = new Set();
  for (const m of APP.matchAll(/['"`(]((?:\.\/)?[\w\-./]+\.(?:png|jpe?g|webp))['"`)]/gi)) {
    const f = m[1].replace(/^\.\//, '');
    if (/^https?:/.test(f) || f.includes('${')) continue;
    if (!fs.existsSync(path.join(REPO, f))) out.add(`game.jsx references '${f}' (missing)`);
  }
  return [...out];
});

const warnSw = [];
check('sw.js precache list, manifest icons and index.html <script src> files exist / are cache-safe', () => {
  const out = [];
  const sw = rd('sw.js');
  const assets = (sw.match(/const ASSETS\s*=\s*\[([\s\S]*?)\]/) || [])[1] || '';
  for (const m of assets.matchAll(/'([^']+)'/g)) { const f = m[1].replace(/^\.\//, ''); if (f && !fs.existsSync(path.join(REPO, f))) out.push(`sw.js ASSETS '${m[1]}' missing`); }
  // sw.js caches by exact request URL; index.html loads versioned URLs (?v=) so those entries never match cache-first lookups
  for (const m of INDEX.matchAll(/<script src="([^"]+)"/g)) {
    const src = m[1];
    if (/^https?:/.test(src)) { if (!sw.includes(src)) out.push(`index.html CDN script ${src} not in sw.js CDN_ASSETS`); continue; }
    const f = src.replace(/\?.*$/, '');
    if (!fs.existsSync(path.join(REPO, f))) out.push(`index.html <script src="${src}"> missing`);
    // sw.js serves everything except documents and game-data.js cache-first, and CACHE_NAME is a constant,
    // so an unversioned local script is frozen for returning players after its first fetch.
    const networkFirst = new RegExp(`endsWith\\('${f.replace('.', '\\.')}'\\)`).test(sw) || /html\|js\|json/.test(sw);
    if (!networkFirst && !src.includes('?v=')) out.push(`index.html loads '${src}' unversioned but sw.js serves it cache-first under fixed CACHE_NAME -> edits never reach returning players`);
    if (src.includes('?') && assets.includes(`'./${f}'`) && !/ignoreSearch/.test(sw)) warnSw.push(`sw.js precaches './${f}' but index.html requests '${src}' (exact-URL cache match) -> precache entry never used`);
  }
  let man; try { man = JSON.parse(rd('manifest.json')); } catch (e) { return [...out, 'manifest.json invalid JSON: ' + e.message]; }
  for (const i of man.icons || []) if (!fs.existsSync(path.join(REPO, i.src))) out.push(`manifest icon ${i.src} missing`);
  if (man.start_url && !fs.existsSync(path.join(REPO, man.start_url.replace(/^\.\//, '')))) out.push(`manifest start_url ${man.start_url} missing`);
  if (!/rel="manifest"/.test(INDEX)) out.push('index.html has no <link rel="manifest">');
  if (!/serviceWorker\.register/.test(INDEX)) out.push('index.html never registers the service worker');
  return out;
});

check('No duplicate keys in object literals (game-data.js, location-images.js, npc-portraits.js)', () => {
  let espree;
  try { espree = require(path.join(__dirname, 'node_modules', 'espree')); } catch (e) { try { espree = require('espree'); } catch (e2) { return []; } }
  const out = [];
  for (const f of ['game-data.js', 'location-images.js', 'npc-portraits.js']) {
    const ast = espree.parse(rd(f), { ecmaVersion: 2022, sourceType: 'script', loc: true });
    const visit = n => {
      if (!n || typeof n.type !== 'string') return;
      if (n.type === 'ObjectExpression') {
        const seen = Object.create(null);
        for (const p of n.properties) {
          if (p.type !== 'Property' || p.computed) continue;
          const k = p.key.type === 'Identifier' ? p.key.name : String(p.key.value);
          if (seen[k]) out.push(`${f}:${p.loc.start.line} duplicate key '${k}' (first at line ${seen[k]})`);
          else seen[k] = p.loc.start.line;
        }
      }
      for (const k in n) { if (k === 'loc' || k === 'range') continue; const c = n[k]; if (Array.isArray(c)) c.forEach(visit); else if (c && typeof c.type === 'string') visit(c); }
    };
    visit(ast);
  }
  return out;
});

// ───────────── dead-data scan (informational) ─────────────
if (DEAD) {
  const topNames = [];
  for (const f of ['game-data.js', 'location-images.js', 'npc-portraits.js', 'portraits.js']) {
    const s = rd(f);
    for (const m of s.matchAll(/^(?:var|const|let|function)\s+([A-Za-z_$][\w$]*)/gm)) topNames.push([m[1], f, s.slice(0, m.index).split('\n').length]);
  }
  const strip = s => s.replace(/\/\/[^\n]*/g, '');
  const IDX = strip(APP);
  const allData = Object.fromEntries(['game-data.js', 'location-images.js', 'npc-portraits.js'].map(f => [f, strip(rd(f))]));
  const countRefs = (src, name) => (src.match(new RegExp(`(?:^|[^\\w$.]|\\.\\.\\.)${name.replace(/\$/g, '\\$')}(?![\\w$])`, 'g')) || []).length;
  const dead = [], dataOnly = [];
  for (const [n, f, line] of topNames) {
    if (countRefs(IDX, n) > 0) continue;
    const otherRefs = Object.entries(allData).reduce((a, [ff, s]) => a + countRefs(s, n) - (ff === f ? 1 : 0), 0);
    (otherRefs > 0 ? dataOnly : dead).push(`${n}  (${f}:${line})`);
  }
  warn('Top-level data names never referenced by game.jsx nor any other data file (dead)', dead);
  warn('Top-level data names used only inside the data files (not by game.jsx directly)', dataOnly);

  // per-field usage: fields on entries of big collections that index.html never mentions
  const coll = {
    RECIPES: G.RECIPES, ENCHANTMENTS: G.ENCHANTMENTS, REGIONS: G.REGIONS, HIDDEN_REGIONS: G.HIDDEN_REGIONS, QUESTS: G.QUESTS,
    NPCS: Object.values(G.NPCS), INGR: Object.values(G.INGR), HIDDEN_INGR: Object.values(G.HIDDEN_INGR), RANGER_COMPANIONS: G.RANGER_COMPANIONS,
    SEASONS: Object.values(G.SEASONS).flat(), FACTIONS: Object.values(G.FACTIONS), THREAT_FACTIONS: Object.values(G.THREAT_FACTIONS),
    CLASSES: Object.values(G.CLASSES), SPECS: Object.values(G.CLASSES).flatMap(c => Object.values(c.specs)), FEATS: Object.values(G.FEATS),
    PRESTIGE_CLASSES: Object.values(G.PRESTIGE_CLASSES), UPGRADES: Object.values(G.UPGRADES), CARAVAN_ROUTES: G.CARAVAN_ROUTES,
    SUPPLY_PARTNERS: G.SUPPLY_PARTNERS, LOCATIONS: Object.values(G.LOCATIONS), SETTLEMENT_PROJECTS: G.SETTLEMENT_PROJECTS,
    CLINIC_AILMENTS: G.CLINIC_AILMENTS, AP_POOL: G.AP_POOL, SKILLS: Object.values(G.SKILLS), TOWN_EVENTS: G.TOWN_EVENTS, H_EVENTS: G.H_EVENTS,
    CUST_DATA: Object.values(G.CUST_DATA), ELIXIR_BUFFS: Object.values(G.ELIXIR_BUFFS), GADGET_BLUEPRINTS: G.GADGET_BLUEPRINTS,
    CONSTRUCTOR_BPS: G.CONSTRUCTOR_BPS, FIELD_DISCOVERIES: Object.values(G.FIELD_DISCOVERIES).flat(), LORE_FRAGMENTS: G.ALL_LORE_FRAGMENTS || [],
    VENOM_CONTRACTS: G.VENOM_CONTRACTS, SHIELD_COMMISSIONS: G.SHIELD_COMMISSIONS, FACTION_PAIRS: G.FACTION_PAIRS, CRISIS_TEMPLATES: G.CRISIS_TEMPLATES,
  };
  const unusedFields = [];
  for (const [n, list] of Object.entries(coll)) {
    const cnt = {};
    for (const o of list) if (o && typeof o === 'object') for (const k of keys(o)) cnt[k] = (cnt[k] || 0) + 1;
    for (const [k, c] of Object.entries(cnt)) if (!new RegExp(`(\\.|\\?\\.)${k}\\b|\\[['"]${k}['"]\\]|\\{[^}]*\\b${k}\\b[^}]*\\}\\s*=`).test(IDX)) unusedFields.push(`${n}[].${k}  (on ${c}/${list.length} entries)`);
  }
  warn('Entry fields never read by game.jsx (heuristic: no .field / [\'field\'] / destructure)', unusedFields);
}

warn('sw.js precache notes', warnSw);

// schema drift: entries missing a field that >=75% of their siblings have (catches copy-from-wrong-template zones)
{
  const coll = {
    CLINIC_AILMENTS: G.CLINIC_AILMENTS, VENOM_CONTRACTS: G.VENOM_CONTRACTS, SHIELD_COMMISSIONS: G.SHIELD_COMMISSIONS, CARAVAN_ROUTES: G.CARAVAN_ROUTES,
    SUPPLY_PARTNERS: G.SUPPLY_PARTNERS, FACTION_PAIRS: G.FACTION_PAIRS, AP_POOL: G.AP_POOL, TOWN_EVENTS: G.TOWN_EVENTS, RANGER_COMPANIONS: G.RANGER_COMPANIONS,
    REGIONS: G.REGIONS, HIDDEN_REGIONS: G.HIDDEN_REGIONS, FACTIONS: Object.values(G.FACTIONS), NPCS: Object.values(G.NPCS), HIDDEN_INGR: Object.values(G.HIDDEN_INGR),
    GADGET_BLUEPRINTS: G.GADGET_BLUEPRINTS, CONSTRUCTOR_BPS: G.CONSTRUCTOR_BPS, SETTLEMENT_PROJECTS: G.SETTLEMENT_PROJECTS, CUST_DATA: Object.entries(G.CUST_DATA).map(([k, v]) => ({ id: k, ...v })),
    FIELD_DISCOVERIES: Object.values(G.FIELD_DISCOVERIES).flat(), ELIXIR_BUFFS: Object.values(G.ELIXIR_BUFFS), SEASONS: Object.values(G.SEASONS).flat(),
  };
  const drift = [];
  for (const [n, list] of Object.entries(coll)) {
    const cnt = {};
    for (const o of list) for (const k of keys(o)) cnt[k] = (cnt[k] || 0) + 1;
    for (const [k, c] of Object.entries(cnt)) {
      if (c === list.length || c < list.length * 0.75) continue;
      const miss = list.filter(o => !(k in o)).map(o => o.id || o.name || '?');
      drift.push(`${n}: ${miss.length} entr${miss.length > 1 ? 'ies' : 'y'} lack '${k}' (${c}/${list.length} have it): ${miss.slice(0, 8).join(', ')}${miss.length > 8 ? ', …' : ''}`);
    }
  }
  warn('Schema drift (entries missing a field most siblings have)', drift);
}

// ───────────── report ─────────────
let nFail = 0;
const pad = s => (s + ' '.repeat(6)).slice(0, 6);
for (const r of results) {
  if (!r.fails.length) { console.log(`${pad('PASS')}${r.name}`); continue; }
  nFail++;
  console.log(`${pad('FAIL')}${r.name}  [${r.fails.length}]`);
  r.fails.slice(0, CAP).forEach(f => console.log(`        - ${f}`));
  if (r.fails.length > CAP) console.log(`        … ${r.fails.length - CAP} more (use --verbose)`);
}
for (const w of warns) {
  console.log(`${pad('INFO')}${w.name}  [${w.items.length}]`);
  w.items.slice(0, VERBOSE ? Infinity : 40).forEach(x => console.log(`        - ${x}`));
  if (!VERBOSE && w.items.length > 40) console.log(`        … ${w.items.length - 40} more (use --verbose)`);
}
console.log(`\n${results.length - nFail}/${results.length} checks passed${nFail ? `, ${nFail} FAILED` : ''}.`);
process.exit(nFail ? 1 : 0);
