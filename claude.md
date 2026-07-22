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

- **index.html** — Full game UI and logic. Single-file React app via Babel (inline JSX in script tags). ~12,850 lines.
- **game-data.js** — All game data (ingredients, recipes, enchantments, regions, quests, NPCs, factions, threats, companions, etc). ~4,970 lines.
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
- Faction Harmony flows through `getHarmonyBonus(key)`, called from inside `getFeatureVal` — per-pair tier bonuses (capped by `HARMONY_CAPS` in game-data.js, doubled at Diplomat Lv5) plus pair-specific `pair.effect` tier-3 rewards (uncapped, undoubled). Categorical pair effects flow through `getCategoricalBonus`. Flattened targeted keys (`recipeBonus_<recipeId>`, `regionForage_<regionId>`) follow the `factionBonusDrop_<id>` convention.
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

## Current State (as of July 2026)

- V1 is fully playable across all 4 zones. Firebase cloud saves working. PWA enabled.
- **Handbook ↔ code audit sweeps (May 2026) are all closed:**
  - Class features 140/140 ✓ (`class_feature_audit.md`) — includes the Diplomat structural fix and the Phase C recipe-grant / category-routing builds.
  - Feats 57/57 ✓ (`feat_audit.md`) — Thick Skin and Mentor's Gift were cut.
  - Workshop upgrades 22/22 ✓ (`workshop_upgrade_audit.md`) — flat cost reductions converted to a percentage-modifier system that walks upgrades, classes, feats, companions, settlement projects, faction bonuses, elixir buffs, and lineage sources.
  - Spec/prestige description sufficiency audited and fixed (`_migration/spec_prestige_sufficiency_audit.md`); mechDesc correctness audited (`_migration/mechdesc_correctness_audit_phase1.md`).
  - Per-level base-class feature sufficiency 50/50 ✓ (`per_level_feature_sufficiency_audit.md`, July 2026) — 7 sub-bar descs fixed in game-data + handbook, including two literal `&mdash;` entities that JSX rendered as raw text.
- **Town/Navigation redesign shipped:** 9 art-driven hub tiles, always-visible stub bar, back-to-town via `BackBar`, unified `resolveArt()` backdrop resolver (index.html ~6720). `TOWN_IMGS` populated in `location-images.js`; all 25 town art images are in the repo. Locked spec: `town_nav_design_lock.md`.
- **Spellweaver Planar Attunement Stage-1 shipped:** planar/combo effect keys wired into `doEnchant` (index.html ~3289); `fadeChance` / `dualChanceBonus` / `bonusEnchantChance` use the locked Tier-1 reinterpretations. Design lock: `_migration/spellweaver_planar_designlock.md`.
- **Faction Harmony / FACTION_PAIRS system completed (July 21, 2026)** — full arc in `faction_pairs_recon.md` (recon → fixes → content, all in one day):
  - Recon found the Diplomat's harmony system was largely dead: `getHarmonyBonus` defined but never called, Tidecrest/Skyreach had zero pairs, `.every()`-on-empty granted vacuous Grand Alliance, the Embassy list leaked cross-zone, and reward strings promised unbuilt mechanics.
  - All fixed: harmony bonuses wired via a `getHarmonyBonus` call inside `getFeatureVal`; vacuous-empty guards; Embassy loc-filtered and envoys local-only; reward strings made truthful; dead `dLv>=6` gates fixed.
  - `FACTION_PAIRS` is now 21 pairs (6/3/6/6 per zone — Ashfall genuinely has only 3 factions) and **every pair carries a unique tier-3 `effect:{}` bonus** (recipe/region/caravan/categorical/flat keys). Pair effects are exempt from the Lv5 doubling and from `HARMONY_CAPS` (the tunable zone-total ceilings in game-data.js: restock 8 / discount 45% / rep +100% / sell +25%).
  - Grand Alliance is achievable in all four zones and all zones converge on identical capped maxima.
- **Denominated money system shipped (July 21, 2026)** — full arc in `money_system_recon.md`. One integer wallet displayed as **1pp = 10g = 100s** via the silver reinterpretation (old values were declared silver; zero data/save migration — the Firestore `gold` field keeps its name). `fmtMoney(n)` (index.html ~172) renders the two largest non-zero denominations at every display site (~250 converted across 4 phases); game-data literal amount strings were hand-denominated (e.g. `+20g` → `+2g`); generic "gold" prose became "coin" per Jim's decision (thematic uses like "Lead to Gold" kept); the handbook gained a "Coinage of the Realm" sidebar with the diegetic mint-standardization note. Copper is flavor-only. **When adding ANY money display, use `fmtMoney` — never a raw `Xg` suffix** (raw units are silver and would read 10× wrong).
- **Open design questions** are consolidated in `_migration/open_design_questions.md` — only the literal Tier-3 planar interpretations and the customer→faction mapping remain open. Closed July 21: guidance polish (#5), FACTION_PAIRS (#6), per-level sufficiency expansion (#7), and #9 (Tinkerer capstone reworked into `masterworkCalibration` — Mk III gadgets at 150% output + damage immunity; Runesmith named weapons gained a Sell-from-display-case tradeoff that finally pays their stored `goldValue`).
- **Time/energy:** the `hours` → `energy` refactor HAS shipped since the investigation doc (`time_energy_investigation.md`, May 2026) was written — the state variable is now `energy` (index.html ~346) on a 100-per-day base scale (1 old hour = 25 energy), spent via `spendEnergy`/`getActionEnergyCost` with percentage `energyCostMultiplier` modifiers (see the workshop audit's Phase 4 changelog). The investigation doc describes the pre-refactor system; treat it as historical.
- **Torch rework (`torchClassLevels` → `torchFeature`): NOT implemented.** `eCL()`/`torchClassLevels` remain the live mechanism. Its design doc (`feature_dependency_audit.md`) is no longer in the repo, and `torchSkillRanks` is likewise designed-only, never built.
- The old `v2_balance_patch_spec.md` is no longer in the repo. Of its open questions: the Diplomat prestige rename happened (`diplomat` in `PRESTIGE_CLASSES`); whether Brand Master should be reachable without multiclassing remains undecided.

## Common Pitfalls (Bugs We've Hit)

- Skyreach NPC IDs use `sr_` prefix (`sr_kael`, `sr_lira`) but quest giver matching uses display names. `openNpc()` has a reverse lookup fallback for giver-name-to-NPC-ID resolution.
- `ZONE_IMGS` for Skyreach are defined in `game-data.js` (not the external `location-images.js`).
- Companion portraits use the `img` property on `RANGER_COMPANIONS` entries.
- Season images use the `img` property on `SEASONS` entries.
- `HIDDEN_INGR` ingredients can silently overwrite main `INGR` entries via `Object.assign`. Use unique IDs (`hr_` prefix) for hidden ingredients.
- `game-data.js` must stay above 4,700 lines — never rewrite the full file, only targeted edits.
- Firestore paths must match rules: `users/{userId}/slots/{key}`.
- **Cache-busting:** `game-data.js` and `location-images.js` are loaded with `?v=YYYYMMDDx` query params in `index.html`. Browsers cache by that URL — after editing either file, bump its `?v=` param or players (and local testing) keep the stale copy.
- **Cross-repo file pollution (May 2026):** Tender's `game-data.js` was accidentally placed in this repo and pushed, breaking the deploy because none of `FACTIONS`, `CLASSES`, or `RECIPES` were defined. The fix took ~30 minutes. **Never read from or write to a sibling repo folder.** Always work in the path declared at the top of this file. If a task seems to require pulling files from another project, stop and ask.
