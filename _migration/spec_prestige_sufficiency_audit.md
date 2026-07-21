# Specialization & Prestige Description-Sufficiency Audit

_Read-only audit. Methodology: for each specialization and prestige class, applied the bar "Could a player who has never played this spec read ONLY this text and understand what the unique mechanic actually does — mechanically, concretely — well enough to make an informed choice?" Surfaces audited: the level-up picker (irreversible-choice surface) AND the Handbook entry. Distinct from the prior accuracy/exclusivity sweep — this is **sufficiency** (explained well enough), not accuracy (text matches code)._

## Surface Source-Shape (Overarching Finding)

**Picker (single render block for all 15 specs):** `index.html:7720-7748`. Iterates `Object.values(CLASSES[...].specs)`. For each spec, shows ONLY: spec name + icon, bonus stat (+2), bonus skills, per-feature `desc` lines (`Lv{n}: {name} — {desc}` at line 7736-7738). **It does NOT show `sp.desc` (the spec's one-line summary) and does NOT show `sp.mechDesc` (the mechanical description) — both fields exist in `game-data.js` but are orphaned by the UI.**

**Prestige picker (single render block for all 9 prestige):** `index.html:7642-7691`. Shows `pc.icon + pc.name`, level progression, `pc.desc` (line 7653), next-feature inline (`Lv{n}: {name} — {desc}` at line 7655), and an optional View-Progression expansion (lines 7686-7690) showing all features.

**Handbook (separate HTML strings per spec/prestige):** `cindervale_handbook.html:455-721` (specs) and `:729-871` (prestige). Each entry: name + bonus-stat header + flavor `<p>` + per-feature table. The handbook text is **hand-written and separately maintained** from the game-data — it duplicates feature text in many places but isn't auto-generated.

**Source pattern: SEPARATE — picker and handbook draw from different sources.** Picker reads game-data live; handbook is hand-authored HTML. Worse: the game-data has a `mechDesc` field on every spec that explains the unique mechanic concretely — and nothing reads it. This is the root cause of the audit's findings.

> **2026-07-21 addendum — third orphaned surface found and fixed (Jim's catch):** the fix sweep wired `sp.mechDesc` into the level-up spec picker, but the **character-selection class-detail modal** ("View Full Progression", index.html ~6690-6711) had the same orphan: spec cards showed icon/stat/skills/features but never `sp.desc` or `sp.mechDesc` — so a new player choosing their starting class never learned what the Clinic, Venom Contracts, Forge, etc. actually were. Both fields now render in each spec card (desc as the identity line, mechDesc in the mechanic box), mirroring the wizard's pattern. In passing, the markdown `**bold**` markers inside the Spellweaver/Naturalist mechDesc strings and the Naturalist Lv10 feature desc were removed — JSX rendered them as literal asterisks on every surface. Verified live in the modal (Clinic text renders at character selection). Cache-bust → `?v=20260721g`.

---

## Per-Entry Ratings

### 15 Specializations (3 per base class × 5 base classes)

| # | Spec/Prestige | Base class | Unique mechanic (ground truth) | Picker text source | Picker rating | Handbook line | Handbook rating | Notes |
|---|---|---|---|---|---|---|---|---|
| 1 | **Apothecary** | Alchemist | **Clinic system:** patients arrive daily with ailments → diagnose via Acumen check → treat with right healing potion → gold/XP/rep. UI panel on workshop screen. | `index.html:7736` (feature desc only) | **FAIL** — "Healer's Touch: +1 craft bonus on healing recipes" never explains what a "clinic" or "patient" is | `handbook:460` | **THIN** — desc says "patients arrive daily with ailments… diagnosed and treated" but no cadence/failure-mode/check details | mechDesc exists but unused; clinic UI is genuinely a separate workshop surface |
| 2 | **Transmuter** | Alchemist | Convert ingredients at 2:1 ratio (1:1 at Lv10), unlocking transmutation recipes; faction-transmute and potion-conversion at higher tiers. | `7736` | **PASS** — "Can convert ingredients at 2:1 ratio" is the mechanic, stated | `handbook:471` | **PASS** — same |  |
| 3 | **Venomist** | Alchemist | **Venom Contracts:** shady NPC clients post contracts offering premium gold for specific volatile brews; deadlines + tier-scaling rewards; fulfilled contracts reduce target faction threat. | `7736` | **FAIL** — Lv3/Lv6 don't mention contracts at all; Lv10 namechecks "venom contracts pay 3× base" with no prior explanation | `handbook:482` | **THIN** — "Sell deadly wares to guard factions for premium gold" + Lv10 mention; contract system itself never described | mechDesc has full explanation, unused |
| 4 | **Runesmith** | Enchanter | **Runesmith Forge:** dedicated forging station on workshop screen; 1→3 daily forge uses scaling with level; forged weapons sell at premium; +bonus on weapon-category enchants. | `7736` | **FAIL** — "+1 inscription bonus and +15% gold on weapon enchantments" — never mentions the Forge UI or the daily-uses mechanic | `handbook:517` | **THIN** — desc adds "Forge powerful weapon enchantments" flavor but no Forge UI/daily-uses explanation | mechDesc explains it fully, unused |
| 5 | **Wardkeeper** | Enchanter | **Shield Commissions:** defensive enchantment orders arrive from clients needing warded armor and shields, with deadlines; commission UI tracks active orders; +3× gold at Lv10. | `7736` | **FAIL** (calibration anchor) — "Wards: +1 inscription bonus on armor enchantments specifically." Lv10 mentions "Shield commissions pay 3× gold" with no prior explanation | `handbook:528` | **FAIL** — desc says "Layer protective wards for lucrative shield commissions" naming the mechanic without explaining it; features never describe what a shield commission is | The exact bug Jim flagged; mechDesc has full explanation, unused |
| 6 | **Spellweaver** | Enchanter | **Planar Attunement / Planar Focus:** attune to extraplanar power sources that modify enchantments with exotic effects; Planar Focus UI selects active plane. | `7736` | **FAIL** — Lv3/Lv6/Lv10 names ("Exotic Inscriptions", "Planar Weave", "Planar Convergence") suggest a system but never explain attunement or the Planar Focus interface | `handbook:539` | **FAIL** — same content; "tap into planar power sources" flavor but no mechanical surface explanation | **⚠ Correctness flag:** mechDesc claims "Lv10 Planar Convergence lets you combine two enchantment types into a single inscription" but Lv10 effects (`enchantCritRange:17, enchantGoldBonus:0.50, customerPayBonus:0.30`) have no dual-type combination — mechDesc is wrong |
| 7 | **Tinkerer** | Artificer | **Gadget Workshop:** craft utility gadgets from blueprints providing passive bonuses when equipped; gadgets upgrade via Marks (Mk I, Mk II); gadget panel shows active devices and bonuses. | `7736` | **THIN** — "Craft utility gadgets for passive bonuses" gives the shape, but "gadget", "blueprint", and "mark" mechanics aren't unpacked | `handbook:575` | **THIN** — same content + brief desc | mechDesc has full explanation, unused |
| 8 | **Constructor** | Artificer | **Blueprint Drafting:** draft custom workshop structures from blueprints; each = drafting (research) + construction (staff) phase; completed blueprints unlock unique workshop bonuses unavailable through normal upgrades. | `7736` | **FAIL** — Lv3 "Workshop Pro: upgrades cost 50% less" + Lv6/Lv10 never mention the Blueprint Drafting system; player would assume this is just a discount spec | `handbook:586` | **THIN** — desc says "legendary blueprints reshape production" naming but not explaining; Lv10 mentions construction time | mechDesc has full explanation, unused |
| 9 | **Reclaimer** | Artificer | Salvage system: failed brews/enchants return % of materials (75%→100%); Lv6 deconstruct potions back to ingredients; spoiled ingredients → Alchemical Residue. | `7736` | **PASS** — "75% salvage on craft failure" + "50% of spoiled ingredients are reclaimed as Alchemical Residue" + Lv6 deconstruct are all stated mechanically | `handbook:597` | **PASS** — same |  |
| 10 | **Theorist** | Scholar | **Published Papers:** spend research Energy writing academic papers that generate passive gold; papers earn more as citations accumulate; Lv10 grants scaling permanent craft bonus per paper count. | `7736` | **THIN** — "Can publish papers for passive gold" gives the shape but no cost, no how-to-publish, no citation mechanics | `handbook:633` | **THIN** — same content | mechDesc has more, unused |
| 11 | **Naturalist** | Scholar | **Field Journal:** documents ecological observations during foraging; entries accumulate per region/ingredient; completed sets unlock discovery bonuses and region recipes; Lv10 grants +2 craft per documented ingredient. | `7736` | **THIN** — Lv10 mentions "Field Journal entries grant permanent +2 craft bonus for documented ingredients" but the journaling system (when entries are made, how to view, set completion) is never described | `handbook:644` | **THIN** — desc "Document flora and geology in a Field Journal" names but doesn't explain | mechDesc has full explanation, unused |
| 12 | **Archivist** | Scholar | **Lore Fragments:** discovered during quests/research; fragments form chains; completing chains grants permanent passive bonuses (e.g., +1 stat); Lore Archive UI tracks collection. Board quests refresh more often. | `7736` | **FAIL** — Lv10 first mentions "Completed lore chains grant permanent +1 to a stat" but no prior text describes what fragments are, how chains work, or where to find them | `handbook:655` | **THIN** — desc "Pursue lore fragments and quest chains" gives slight context; the system itself uncovered | mechDesc has full explanation, unused |
| 13 | **Ranger** | Warden | **Wild Companions:** befriend wild creatures during expeditions; companions perform daily actions (gather/sell/scout/greet/guard/inspire); loyalty grows over time; Lv10 grants dual actions + legendary role abilities + solo expeditions. | `7736` | **THIN** — Lv3 "Befriend wild creatures" is pithy; Lv10 lists the 6 role legendary abilities (which implies the role taxonomy exists), but the day-to-day companion system (how to befriend, loyalty, role choice) isn't described until partial Lv10 mention | `handbook:691` | **THIN** — desc "Tame wild companions that gather, sell, scout, and fight" lists actions but the loyalty/role/befriending mechanics aren't unpacked | mechDesc has full explanation, unused |
| 14 | **Quartermaster** | Warden | **Supply Chains:** trade partnerships with ingredient suppliers deliver goods automatically on a schedule; manage caravan runs to regions; partners level up through completed runs, improving quantity and adding rare ingredients. | `7736` | **FAIL** — Lv3-Lv10 only mention storage doubled, yield bonuses, and spoilage threshold; the entire Supply Chain / caravan system invisible in this surface | `handbook:702` | **THIN** — desc "Master of logistics. … Establish supply chain caravans" names the mechanic without explaining | mechDesc has full explanation, unused |
| 15 | **Sentinel** | Warden | **Night Expeditions:** after resting, send the character on a bonus night forage run with extra gathering hours but increased danger; Lv6 trap setting; Lv10 passive threat decay + once-per-day Preemptive Strike. | `7736` | **PASS** — "Night expeditions: 2 bonus gathering hours at +4 DC, increased danger" is the mechanic stated; Lv6 traps + Lv10 Preemptive Strike both stated | `handbook:713` | **PASS** — same | **⚠ Correctness flag:** mechDesc claims "At Lv10, build permanent outposts" but Lv10's actual effects have no outposts — outposts are the **Siege Engineer prestige class's** mechanic, not Sentinel's. mechDesc misattributes |

### 9 Prestige Classes

| # | Spec/Prestige | Base class | Unique mechanic (ground truth) | Picker text source | Picker rating | Handbook line | Handbook rating | Notes |
|---|---|---|---|---|---|---|---|---|
| 16 | **Cartographer** | Prestige (Warden 3 + skill) | Hidden region/sub-area discovery (25% per forage roll); Lv3 familiar-territory −1 DC at 5+-visited regions; Lv5 legendary Heartforge chambers. | `index.html:7655` (next feature) + 7687 (View Progression) | **PASS** — pc.desc names the mechanic + Lv1 feature explains discovery chance | `handbook:750` | **PASS** — same |  |
| 17 | **Spellbrewer** | Prestige (skill-gated) | Infusions (Vigor/Clarity/Fortify/Prosperity/Lingering): 2-6 per day; catalyst = ingredient with 5+ stock; infused potions sell at higher multipliers. | `7655 + 7687` | **PASS** — Lv1 "Unlock Vigor and Clarity infusions. 2 infusions per day. Catalyst: any ingredient with 5+ stock" is concrete | `handbook:762` | **PASS** — same |  |
| 18 | **Magitech Engineer** | Prestige (Artificer + Enchanter) | Automata: build magical autonomous workshop assistants; 1→3 over levels; can be assigned to brew/forage/shopkeep/enchant; gain XP like staff. | `7655 + 7687` | **PASS** — "Build a basic automaton (1 active). Performs one task per day at 60% efficiency" | `handbook:774` | **PASS** — same |  |
| 19 | **Brand Master** | Prestige (Alchemist + feats) | Named product lines: 1→3 brands, each holds 2→4 recipes; branded potions +10%→+25%+ sell; brand levels up via sales; brand orders at 2× price. | `7655 + 7687` | **PASS** — "Create 1 brand with up to 2 recipes. Branded potions +10% sell. Brand levels up with sales" | `handbook:788` | **PASS** — same |  |
| 20 | **Wildcrafter** | Prestige (Warden 3 + skills) | Field brews during expeditions (1→4 per trip) + **Wildcrafts** at Lv2+: outward-facing brews that affect the world (Seasonal Bypass, Wild Ally, Threat Suppression). | `7655 + 7687` | **THIN** — Lv1 "Field Alchemy — 1 field brew per expedition…" is clear, but the wildcrafts system (the BIG mechanic) is mentioned in Lv2-5 features only as "Unlock Seasonal Bypass wildcraft (1/day)" — wildcrafts themselves never defined | `handbook:799 + 811` | **PASS** — handbook has a dedicated "Wildcrafts" table at line 812 explaining all three wildcrafts |  |
| 21 | **Antiquarian** | Prestige (Scholar 3 + feat) | Relic find chance per forage roll (15%→35%); Appraise interface (Acumen check); Collector's Network 3× sell; Museum + set bonuses; Lv5 legendary relics. | `7655 + 7687` | **PASS** — "15% relic find chance per forage roll. Appraise interface unlocked (free action, Acumen check)" is concrete | `handbook:823` | **PASS** — same |  |
| 22 | **Siege Engineer** | Prestige (Warden + Artificer) | Outposts: 1→4 slots; gather 2→4 ingredients/morning per outpost; suppress nearby threats by 3-5/day; Lv3 auto-brew per outpost; Lv5 fortress upgrade caps a threat at 50. | `7655 + 7687` | **PASS** — "1 outpost slot. Gathers 2 ingredients/morning. Suppresses nearby threats (-3/day)" | `handbook:835` | **PASS** — same |  |
| 23 | **Arcanist** | Prestige (Scholar 3 + skill) | Custom enchantment patterns: research new ones (free action); choose effect type + power; dual-effect at Lv3; library of 10 patterns; legendary Lv5. | `7655 + 7687` | **PASS** — "Research a new enchantment pattern (free action). Choose effect type and power level" | `handbook:847` | **PASS** — same |  |
| 24 | **Diplomat** | Prestige (any 2 base @ 3 + skill) | Doubled faction rep + passive embassy rep + trade agreements (faction-restock) + harmony pairs + grand alliance legendary stock. | `7655 + 7687` | **PASS** — Lv1 Embassy explains the rep multiplier + the passive morning rep mechanic concretely | `handbook:860` | **PASS** — same |  |

---

## Severity Summary

### Counts per surface (out of 24)

| Surface | PASS | THIN | FAIL |
|---|---|---|---|
| **Picker** | 11 (46%) | 5 (21%) | **8 (33%)** |
| **Handbook** | 12 (50%) | 10 (42%) | **2 (8%)** |

### Entries failing at least one surface

**13 of 24 entries (54%)** fail on at least one surface (FAIL or THIN). Only **11 of 24 (46%)** pass both surfaces cleanly.

### Prevalence statement

**This is widespread, not isolated.** Wardkeeper is the calibration FAIL, but the same shape repeats across ~half the catalog. The expansion trigger Jim set was "more than ~1/3 fail on at least one surface" — we hit it at **54%** counting FAIL+THIN, and **33% picker FAIL alone**. Specifically:

- **Picker is the worse surface by far.** 8/24 = 33% straight FAIL, plus 5 more THIN — so 13/24 = 54% of all entries are below the bar in the surface where the player makes the irreversible choice.
- **Handbook is mostly THIN.** Only Wardkeeper and Spellweaver outright FAIL, but 10 more are THIN — the handbook has just enough flavor to gesture at the mechanic without unpacking it.

---

## Prioritized Fix Queue (Worst First)

### Tier A — Picker FAIL + Handbook FAIL (deepest blackouts; player has no path to the mechanic from either surface)
1. **Wardkeeper** (Enchanter) — Shield Commissions
2. **Spellweaver** (Enchanter) — Planar Attunement (also has a mechDesc correctness bug)

### Tier B — Picker FAIL + Handbook THIN (mechanic invisible at picker, only gestured at in handbook)
3. **Apothecary** (Alchemist) — Clinic / patient diagnosis
4. **Venomist** (Alchemist) — Venom Contracts
5. **Runesmith** (Enchanter) — Runesmith Forge
6. **Constructor** (Artificer) — Blueprint Drafting
7. **Archivist** (Scholar) — Lore Fragments / chains
8. **Quartermaster** (Warden) — Supply Chains / caravans

### Tier C — Picker THIN + Handbook THIN (both surfaces undershoot but reader gets a gist)
9. **Tinkerer** (Artificer) — Gadget Workshop
10. **Theorist** (Scholar) — Published Papers
11. **Naturalist** (Scholar) — Field Journal
12. **Ranger** (Warden) — Wild Companions

### Tier D — Picker THIN + Handbook PASS (handbook covers the gap; picker is the only weak surface)
13. **Wildcrafter** (Prestige) — Wildcrafts

---

## Shared-vs-Separate-Source Pattern

**SEPARATE.** Picker reads `game-data.js` `CLASSES[x].specs[y].features[].desc` live; handbook is independently authored HTML in `cindervale_handbook.html`. **Critically: the `mechDesc` field that already exists in `game-data.js` for every spec — and that contains exactly the mechanical explanation needed — is read by neither surface.** It's orphaned data.

This makes the fix shape:
- **Cheap shared option:** wire `sp.mechDesc` into the picker render block (single line edit at `index.html:7720-7748`), and the handbook gets a parallel pass to bring its `<p>` summaries up to the same level. One data-side authoring effort feeds both surfaces (with the handbook either re-using mechDesc text or staying hand-authored but updated).
- **The 8 picker FAILs primarily need mechDesc surfaced.** Wardkeeper's mechDesc — `"Shield Commissions. Defensive enchantment orders arrive from clients needing warded armor and shields. The commission system tracks your active orders with deadlines. Inscription bonuses stack for defensive work, and at Lv10 permanent wards auto-succeed at DC 15."` — would single-handedly move Wardkeeper from FAIL → PASS on the picker.

---

## Correctness Flags (Code/Data Disagreements — Separate from Sufficiency)

Reported separately during the audit, not as a fix recommendation:

1. **Spellweaver mechDesc misstates Lv10:** claims "Planar Convergence lets you combine two enchantment types into a single inscription" but `Lv10 effects` are `{enchantCritRange:17, enchantGoldBonus:0.50, customerPayBonus:0.30}` — no dual-type combination mechanic exists. The mechDesc would need to be rewritten to match what Lv10 actually does (or Lv10 redesigned to match the promise). _Subsequent finding: the dual-plane Planar Convergence mechanic DOES exist via `canDual=swLv>=10`, but the planar effects themselves are unwired — separate full Spellweaver design-lock document covers this._

2. **Sentinel mechDesc misattributes Lv10:** claims "At Lv10, build permanent outposts for daily passive ingredient income and threat suppression" — but Sentinel Lv10's actual effects (`forageOnRest, nightBonusHours, passiveThreatDecay, preemptiveStrike`) have no outposts. Outposts are the **Siege Engineer prestige class's** mechanic. The Sentinel mechDesc appears to have been confused with Siege Engineer.

3. **`mechDesc` field unused everywhere.** Grepping the codebase, `mechDesc` appears only in its own definitions in `game-data.js` (lines 102, 108, 114, 138, 144, 150, 174, 180, 186, 210, 216, 222, 247, 253, 259). Not referenced in `index.html` or `cindervale_handbook.html`. This is the structural root cause of the audit's findings.

---

## Status After Subsequent Fix Sweep

The fix sweep that followed this audit:
- **Wired `mechDesc` into the spec picker** (`index.html:7736-7741` — single new render block). Closed the structural root cause.
- **Rewrote 12 handbook entries** to match the corrected/expanded `mechDesc` text mechanically.
- **Corrected 3 `mechDesc` bugs** in the same pass (Sentinel outposts misattribution; Spellweaver dual-type-claim removed [later restored as dual-plane]; Theorist Lv10 "auto-discover" claim).
- **Expanded Wildcrafter `pc.desc`** to cover the wildcrafts mechanic for the prestige picker.
- All 13 sub-bar entries verified PASS both surfaces after the fix.

Final shippable state post-fix-sweep: 24/24 entries pass the sufficiency bar on both picker and handbook surfaces.
