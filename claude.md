# Cindervale Alchemist — Project Primer

## Workflow (READ THIS FIRST)

**Local repository path:** `C:\Users\jumpp\cindervale-alchemist-fresh`

This is the only folder you should read from or write to. Do **not** read from or write to any sibling folder — including any `tender/` folder, any legacy `cindervale-alchemist/` folder, or anything else outside this path. If a task would require touching a path outside this folder, stop and ask Jim before proceeding.

**Version control is Jim's job, not yours.** Jim handles all git operations via GitHub Desktop.

- Do **not** run `git commit`, `git push`, `git add`, `git stash`, or any other git command.
- Make changes to local files only. Do not delete files unless explicitly told to.
- When you finish a task, end your summary with a one-line suggested commit message Jim can paste into GitHub Desktop. Format: a verb-led short summary, e.g. `Add Skyreach apprentice training quest` or `Fix giver name lookup for sr_kael`.
- Jim reviews every diff in GitHub Desktop before committing. This is the safety net — don't try to be helpful by committing for him.

**File integrity rules:**

- Never rewrite `index.html` or `game-data.js` wholesale. Targeted edits only.
- `game-data.js` must stay above 4,700 lines. If an edit would shrink it below that, stop and report.
- After any edit to `game-data.js`, run `node -c game-data.js` from the repo folder to verify syntax before reporting success.
- After significant edits to `index.html`, do a quick visual sanity check on the surrounding lines — don't rely on syntax tools for JSX-in-script-tags, since Babel-in-browser will surface syntax errors at runtime.

## What It Is

Browser-based single-player RPG. Run an alchemy shop across 4 zones. Brew potions, enchant items, forage ingredients, manage staff, build your workshop. D20-based skill checks. Prestige multiclassing. Generational "Pass the Torch" mechanic.

## Architecture

- **index.html** — Full game UI and logic. Single-file React app via Babel (inline JSX in script tags). ~12,100 lines.
- **game-data.js** — All game data (ingredients, recipes, enchantments, regions, quests, NPCs, factions, threats, companions, etc). ~4,955 lines.
- **Hosted on GitHub Pages** at https://jumppiejim-creator.github.io/cindervale-alchemist/
- **Images** hosted in the same GitHub repo. Leonardo AI generated.
- **Cloud saves** via Firebase Firestore + Google Sign-In. Config is in `index.html` script tags (CDN, not npm).
- **PWA** enabled (`manifest.json` + `sw.js` for offline play).
- **No build step.** Files are served as-is to the browser. That means asset paths must be relative (e.g. `./game-data.js`, not `/game-data.js`) because GitHub Pages serves under a subpath.

## 4 Zones

| Zone | Theme | Icon | Quest prefix |
|------|-------|------|-------------|
| Cindervale | Volcanic | 🌋 | `q` (e.g. q1, q2) |
| Ashfall | Desert | 🏜️ | `aq` |
| Tidecrest | Coastal | 🌊 | `tq` |
| Skyreach | Alpine | 🗻 | `sr_` |

Each zone has: 8 regions (diff 1-5), 8 hidden regions, 4 factions (5 tiers each), 3 threats, 4 seasons, 5 NPCs, ~36 quests, 7 companions (Ranger spec), ~30 shop items, field discoveries.

## Workshop Building System

Players build out a workshop with swappable rooms, furnishings, and stations. Asset filenames follow a `ws_` convention:

- **Base shells:** `ws_base_grounds`, `ws_base_quarters`, `ws_base_storefront`, `ws_base_workshop`
- **Swappable rooms:** `ws_swap_shopfront`, `ws_swap_beds`, `ws_swap_garden`
- **Stations and furnishings:** `ws_bench_*`, `ws_cauldron_*`, `ws_cellar`, `ws_display`, `ws_forge`, `ws_greenhouse`, `ws_hearth`, `ws_ledger`, `ws_leyline`, `ws_library`, `ws_mortar`, `ws_rep_board`, `ws_runic_tools`, `ws_shelves`, `ws_signage`, `ws_vault`

## Key Code Patterns

- NPC quests use `giver` (NPC display name, **not** id) and `loc` (`'market'`, `'tavern'`, or `'chapel'` — **not** the zone name).
- NPC data needs `lines` array (not `dialogue`), `title`, and `portrait` fields.
- Zone-specific UI uses ternary chains in market/tavern button lists. New zone NPCs must be added **into the ternary chain**, not appended after the default branch.
- `eCL(classId)` returns effective class level (max of `classLevels` and `torchClassLevels`).
- `eSpec(classId)` returns effective spec (own spec or torch spec).
- `getFeatureVal(key)` aggregates all passive bonuses from class features, specs, feats, upgrades, factions, etc. This is the single source of truth for stacked bonuses.
- `getSkMod(skillId)` returns stat mod + rank bonus + race bonus.
- `doCheck(skillId, dc)` and `pureCheck(skillId, dc)` perform d20 roll + modifier vs DC. Nat 1 auto-fails, nat 20 auto-succeeds.
- `INGR_SUBS` maps base-zone ingredients to local equivalents for cross-zone recipe craftability. `FACTION_SUBS` and `THREAT_SUBS` do the same for factions and threats.
- Threat factions need `penalties` object (plural) with `rising`, `dangerous`, and `critical` tiers — **not** singular `penalty`.

## Pass the Torch (New Game+)

When a character retires, they pass:

- Gold (percentage), top recipes, heirloom upgrade, faction rep (percentage)
- `torchClassLevels` — mentor's class levels count toward prestige prereqs
- `torchSpecs` — mentor's specializations unlock spec-gated UI panels
- `allSpecs` — full spec object saved in lineage gen record
- Legacy feature — one spec or prestige feature chain with merged effects
- Museum collection carries forward

## Current State (as of May 2026)

- V1 is fully playable across all 4 zones.
- **V2 balance patch:** Phase 1 (data layer) and Phase 2 (logic) complete. Phase 3 (content cleanup — quests, events, NPC dialog, tutorial text referencing removed Merchant/COM/deleted skills) and Phase 4 (testing) pending.
- **V2 open questions** still unresolved (see `v2_balance_patch_spec.md`):
  - `torchSkillRanks` for skill-gated prestige inheritance — designed, not implemented
  - Diplomat prestige rename (no longer Merchant-flavored)
  - Whether Brand Master prestige should be reachable without multiclassing
- **Torch rework** (`torchClassLevels` → `torchFeature`) is designed in `feature_dependency_audit.md`. Recommendation: keep the chain-merge approach to preserve all 140 features.
- **Workshop swap system** is in active development. `ws_swap_shopfront` was the most recent piece wired in.
- Firebase cloud saves working. PWA enabled.

## Common Pitfalls (Bugs We've Hit)

- Skyreach NPC IDs use `sr_` prefix (`sr_kael`, `sr_lira`) but quest giver matching uses display names. `openNpc()` has a reverse lookup fallback for giver-name-to-NPC-ID resolution.
- `ZONE_IMGS` for Skyreach are defined in `game-data.js` (not the external `location-images.js`).
- Companion portraits use the `img` property on `RANGER_COMPANIONS` entries.
- Season images use the `img` property on `SEASONS` entries.
- `HIDDEN_INGR` ingredients can silently overwrite main `INGR` entries via `Object.assign`. Use unique IDs (`hr_` prefix) for hidden ingredients.
- `game-data.js` must stay above 4,700 lines — never rewrite the full file, only targeted edits.
- Firestore paths must match rules: `users/{userId}/slots/{key}`.
- **Cross-repo file pollution (May 2026):** Tender's `game-data.js` was accidentally placed in this repo and pushed, breaking the deploy because none of `FACTIONS`, `CLASSES`, or `RECIPES` were defined. The fix took ~30 minutes. **Never read from or write to a sibling repo folder.** Always work in the path declared at the top of this file. If a task seems to require pulling files from another project, stop and ask.
