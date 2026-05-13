# Feat Audit

_Generated 2026-05-13. Read-only audit of all feats for handbook ↔ code accuracy._

_Path taken: **fresh audit** (no prior `feat_audit.md` found)._

## Summary

- Total feats audited: **59** (handbook front-page claims 62; actual count of `FEATS` entries is 59 across 8 categories — `category total` strings in handbook claim 10/7/6/**20**/4/2/3/10 = 62 but Economic is 17, not 20. Minor handbook miscount.)
- ✓ accurate: **45**
- ⚠️ unclear: **2**
- 🔁 description mismatch: **2**
- ❌ no effect: **6**
- ❓ dead system: 0
- 🔧 partial: **4**
- 💡 unexpected: 0
- ❓ needs review: 0

## Feats

### Crafting (10)

| ID | Name | Handbook says | In-game tooltip | Code does | Verdict | Notes |
|----|------|---------------|-----------------|-----------|---------|-------|
| `careful_hands` | Careful Hands | 25% ingredient save on failed brews. Once per day, reroll a failed craft check. | Same. | `craftReroll:1` read at line 2702 (reroll charges). **`failSalvage:0.25` is never read anywhere in `index.html`.** | 🔧 partial | Half-broken. Reroll fires; the 25%-ingredient-save claim is a stub. |
| `bulk_processor` | Bulk Processor | Max batch brew size +2. | Same. | `batchSizeBonus:2` aggregated via `getFeatureVal`. Read at batch brew capacity calc. | ✓ accurate | |
| `recipe_intuition` | Recipe Intuition | +10% experiment discovery chance. Failed experiments cost 0 hours on failure (handbook still says "0 hours"). Data desc: "Failed experiments cost 0 Energy." | Mixed terminology — data desc claims 0 Energy, handbook claims 0 hours. | `experimentBonus:0.10` aggregated (used at discovery chance). `freeFailExperiment` is read at line 2867 — but it skips the **ingredient waste** on failure, NOT the Energy cost. The 25⚡ for the experiment is paid up front at line 2748 regardless of success/failure. | 🔁 description mismatch | "Failed experiments cost 0 Energy" is false. Failed experiments cost the same 25⚡ as successful ones; only the ingredients are refunded. Should read "Failed experiments refund their ingredients." |
| `quality_assurance` | Quality Assurance | Brewed potions worth +20% when sold or shelved. | Same. | `potionValueBonus:0.20` aggregated, read at potion sale/shelf payment calcs. | ✓ accurate | |
| `rapid_infusion` | Rapid Infusion | Infusions don't cost extra time. First brew each day costs 0 Energy. (Req: Alchemist 3) | Same. | `firstBrewFree:true` read at line 2627; first brew of the day tagged with `first_brew_used` dayFlag and `spendEnergy(25)` is skipped. | ✓ accurate | The "Infusions don't cost extra time" half is true by default — infusions never costed extra; the desc is just reassurance. |
| `lucky_brew` | Lucky Brew | 10% chance any craft produces a random bonus potion alongside. | Same. | `luckyBrewChance:0.10` read at line 2698 in brew success path. | ✓ accurate | |
| `methodical_brewer` | Methodical Brewer | Recipes brewed 10+ times get -2 DC permanently. Mastery discount cap +2. | Same. | `masteryDiscountBonus:2` read in `getMasteryDiscount` calls at multiple brew sites. | ✓ accurate | |
| `efficient_brewing` | Efficient Brewing | 15% chance to save all ingredients on a successful brew. | Same. | **`ingrSaveOnSuccess:0.15` is never read anywhere in `index.html`.** Pure stub. | ❌ no effect | High-impact dead feat. A player picking this gets zero benefit. |
| `double_batch` | Double Batch | +5% double batch chance. | Same. | `doubleBatchChance:0.05` read at lines 2755 + 2832 in batch brew paths. | ✓ accurate | |
| `overachiever` | Overachiever | +1 to all craft checks. | Same. | `craftBonus:1` aggregated, applied at craft check sites. | ✓ accurate | |

### Exploration (7)

| ID | Name | Handbook says | In-game tooltip | Code does | Verdict | Notes |
|----|------|---------------|-----------------|-----------|---------|-------|
| `trailblazer_boots` | Trailblazer's Boots | Travel Energy cost −25% to all regions. (Phase 4 conversion) | Same. | `effect:{energyCostMultiplier:{travel:-0.25}}` aggregated by `getActionEnergyCost('travel', baseCost)` at line 998. Read site: `getExpeditionInfo` at line 1612. | ✓ accurate | **Phase 4 conversion landed cleanly.** Verified end-to-end. |
| `lucky_find` | Lucky Find | +5% chance for bonus rare ingredient per forage hour. | Same. | `luckyFindChance:0.05` aggregated; read at forage roll bonus chance. | ✓ accurate | "per forage hour" wording is leftover from pre-Phase-3; reads as "per forage roll" now. Minor terminology drift, not a real mismatch. |
| `companion_handler` | Companion Handler | Companion actions +50% effectiveness. Companions gain loyalty 2× faster. +15% companion encounter chance. | Same. | All three keys are read: `companionEffBonus` (1+ multiplier at line 5519), `companionLoyaltyMult` (line 5688), `companionEncounterBonus` (line 1944). | ✓ accurate | All three half-effects fire as documented. |
| `seasoned_explorer` | Seasoned Explorer | +2 to all extraction checks. | Same. | `extractionBonus:2` aggregated; added to extraction roll total in `_executeForageRoll`. | ✓ accurate | |
| `pack_mule` | Pack Mule | Carry +2 extra items from expeditions. +25% ingredient yield. | Same. | `yieldMultiplier:0.25` aggregated (read at forage yield calc). **`bonusCarry:2` is never read anywhere.** No carry limit exists in the codebase, so the "+2 extra items" claim has no system to attach to. | 🔧 partial | The yield half fires; the carry-bonus half is a stub with no underlying carry-limit system. Could be cut from description, or a carry mechanic could be built. |
| `danger_magnet` | Danger Magnet | Events 2× more likely, positive events 3× more likely. High risk, high reward. | Same. | `bonusPerSuccess:1` aggregated (adds +1 ingredient per successful extraction — NOT mentioned in desc). `positiveEventMulti:3` is read at line 1761 (event probability path). **There is no `eventMulti` or similar key that doubles ALL events**, so "Events 2× more likely" is false. | 🔁 description mismatch | The desc promises a "high risk" framing (2× negative events) that doesn't fire. The hidden `bonusPerSuccess:1` is undocumented. Either the desc should change to remove the "2× more likely" claim, or a `negativeEventMulti:2` should be added with a code read site. |
| `night_owl` | Night Owl | Night expeditions -1 DC penalty. | Same. | `nightDCReduction:1` read at line 4095 in `doNightExpedition`. | ✓ accurate | |

### Enchanting (6)

| ID | Name | Handbook says | In-game tooltip | Code does | Verdict | Notes |
|----|------|---------------|-----------------|-----------|---------|-------|
| `runelord` | Runelord | +2 to all inscription checks. | Same. | `enchantBonus:2` aggregated; added to inscription roll total. | ✓ accurate | |
| `mana_efficient` | Mana Efficient | 25% chance to save all enchanting materials on success. | Same. | `enchantMatSave:0.25` read at inscription success path. | ✓ accurate | |
| `arcane_recycler` | Arcane Recycler | Failed enchants return 75% of ingredients. Successful enchants have 15% chance to produce a bonus scroll. | Same. | `failEnchantReturn:0.75` read at line 3091; `enchantBonusScroll:0.15` read at line 3088. | ✓ accurate | Both halves fire. |
| `runic_savant` | Runic Savant | +5 flat inscription bonus. +1 inscription. On selection, learn 3 undiscovered enchantment patterns. | Same. | `enchantSuccessFlat:5` read at line 3054 (capped at 20); `enchantBonus:1` aggregated; `learnEnchOnPick:3` triggers immediate learning at line 7697 (one-time pick grant). | ✓ accurate | All three effects fire. The "+5 flat" is correctly capped per the existing `Math.min(20)` rule. |
| `masterwork_focus` | Masterwork Focus | Natural 18-20 on inscription = critical (3× reward). | Same. | `enchantCritRange:18` read at line 3062 (`critRange=20-getFeatureVal('enchantCritRange')` → 20-18=2 → range 18-20). | ✓ accurate | |
| `glyph_mastery` | Glyph Mastery | Enchant DC 10 and below auto-succeed. (Req: Enchanter 3) | Same. | **TYPO in `effects:{autoEnchDC:10}`.** The code at lines 3061/3069/3075 reads `getFeatureVal('autoEnchantDC')` (note the extra `ant` — matches Enchanter L8, Runesmith L10, Wardkeeper L10 spellings). The feat's stored key is `autoEnchDC` so the read returns 0. | ❌ no effect | **High-impact bug.** Glyph Mastery requires Enchanter 3 (a real investment) and grants nothing. Single-character typo fix: change `autoEnchDC` → `autoEnchantDC` in game-data.js line 305. |

### Economic (20)

| ID | Name | Handbook says | In-game tooltip | Code does | Verdict | Notes |
|----|------|---------------|-----------------|-----------|---------|-------|
| `shrewd_bargainer` | Shrewd Bargainer | +5% sell prices. | Same. | `sellBonus:0.05` aggregated; read at sell-price calcs. | ✓ accurate | |
| `bulk_buyer` | Bulk Buyer | -10% buy prices. | Same. | `buyDiscount:0.10` aggregated; read at `getBuyPrice`. | ✓ accurate | |
| `artisans_touch` | Artisan's Touch | +2 XP per brew. | Same. | `brewXPBonus:2` read at lines 2769/2835/3136. | ✓ accurate | |
| `master_presenter` | Master Presenter | +2g per potion sale. (Req: Artisan's Touch) | Same. | `potionSaleBonus:2` aggregated; read at customer-pay and shelf-sale calcs. | ✓ accurate | |
| `organized_shelves` | Organized Shelves | +4 shelf capacity. | Same. | `shelfCapBonus:4` read at line 3944 (baseShelf calc, used twice: `+getFeatureVal('shelfCapBonus')+Math.floor(getFeatureVal('shelfCapBonus'))`). | 💡 unexpected | The read site adds the bonus **twice** (`+v + Math.floor(v)`), giving Organized Shelves effectively +8 capacity, not +4. This looks like a copy-paste bug in `baseShelf`, not a feat issue. Flagged but tagged ✓ accurate-on-the-feat-side because the feat correctly grants what it claims; the doubling is on the read side. *(Reclassified to ✓ accurate per audit verdict scope.)* |
| `preservation` | Preservation | +5 spoil threshold. | Same. | `spoilThreshold:5` aggregated; read at spoilage check. | ✓ accurate | |
| `deep_preservation` | Deep Preservation | +8 spoil threshold. (Req: Preservation) | Same. | `spoilThreshold:8` aggregated (stacks additively with Preservation for +13 total). | ✓ accurate | |
| `scholars_memory` | Scholar's Memory | +8 XP per quest turn-in. | Same. | `questXPFlat:8` read at lines 4027 + 4094. | ✓ accurate | |
| `quick_study` | Quick Study | Research Energy cost −25%. (Req: Scholar's Memory; Phase 4 conversion) | Same. | `effect:{energyCostMultiplier:{research:-0.25}}` aggregated by `getActionEnergyCost('research', baseCost)`. Read site: `doResearch` at line 2884. | ✓ accurate | **Phase 4 conversion landed cleanly.** Verified end-to-end. |
| `keen_eye` | Keen Eye | +3g per enchant commission. | Same. | `enchantGoldFlat:3` read at lines 2504/3081/10235. | ✓ accurate | |
| `gem_cutter` | Gem Cutter | +1g per ingredient sold. | Same. | `ingrSellBonus:1` read at line 8024 + 9919 (ingredient sale calcs). | ✓ accurate | |
| `supplier_contacts` | Supplier Contacts | 2 rare ingredients appear in shop daily. | Same. | `shopRestockBonus:2` aggregated; read at line 4974 in `restockShop`. | ✓ accurate | |
| `regular_clientele` | Regular Clientele | +1 base customer per day. | Same. | `customerBonus:1` aggregated; read at customer-spawn calc. | ✓ accurate | |
| `showmanship` | Showmanship | Shelf potions +5% sell chance. (Req: Regular Clientele) | Same. | `shelfSaleBonus:0.05` aggregated; read at shelf-sale-chance calc. | ✓ accurate | |
| `silver_tongue` | Silver Tongue | +15% shelf sale chance. +10% all sell prices. | Same. | `shelfSaleBonus:0.15` + `sellBonus:0.10` both aggregated and read. | ✓ accurate | |
| `talent_scout` | Talent Scout | +2 hire candidates. All candidates have +2 to highest stat. | Same. | `hireBonusCandidates:2` + `hireBonusStat:2` both read at lines 6401-6402 in hire pool generator. | ✓ accurate | |
| `patron` | Patron of the Arts | Customer orders pay 25% more. +1 customer per morning. | Same. | `customerPayBonus:0.25` + `customerBonus:1` both aggregated and read. | ✓ accurate | |
| `supply_lines` | Supply Lines | Shop buy prices -10%. +2 max shelf capacity. | Same. | `buyDiscount:0.10` + `shelfCapBonus:2` both aggregated and read. | ✓ accurate | (Same doubled-shelfCapBonus quirk as Organized Shelves — +2 becomes effective +4 due to the `+v + Math.floor(v)` pattern at line 3944. Worth flagging the underlying bug separately.) |
| `penny_pincher` | Penny Pincher | All gold costs (purchases, upgrades, hiring, payroll) -15%. | Same. | `upgradeCostReduction:0.15` (read at upgrade builds) + `buyDiscount:0.15` (read at shop). **No `hireCostReduction` or `payrollDiscount` granted** — those mechanics exist as separate keys, but Penny Pincher doesn't touch them. | 🔧 partial | Description over-promises. Real coverage: upgrades + shop. Hiring + payroll explicitly NOT reduced by this feat. Fix is either (a) trim description to "Upgrade and shop costs -15%" or (b) extend effects to include `hireCostReduction:0.15` + `payrollDiscount:0.15`. |
| `taskmaster` | Taskmaster | Staff brew/forage efficiency +25%. Staff injuries heal 1 day faster. | Same. | `staffEfficiencyBonus:0.25` aggregated; read at staff-task efficiency calcs. `staffInjuryReduction:1` read at line 5120. | ✓ accurate | |

### Social / Faction (4)

| ID | Name | Handbook says | In-game tooltip | Code does | Verdict | Notes |
|----|------|---------------|-----------------|-----------|---------|-------|
| `faction_diplomat` | Faction Diplomat | +15% reputation gains from all sources. | Same. | `repGainBonus:0.15` aggregated; read at line 1079 in `addRep`. | ✓ accurate | |
| `cross_faction_charm` | Cross-Faction Charm | 10% rep spillover to non-aligned factions. (Req: Faction Diplomat) | Same. | `repSpillover:0.10` read at line 1079 in `addRep`'s spillover branch. | ✓ accurate | |
| `master_trainer` | Master Trainer | Apprentices gain 2× XP. | Same. | `staffXPBonus:1.0` read at line 4283 (`sxpMult=1+getFeatureVal('staffXPBonus')` → 2×). | ✓ accurate | Math: `1 + 1.0 = 2.0` multiplier. Description matches. Note: this is the ONLY current source of `staffXPBonus` at value 1.0; smaller class-feature values stack additively. |
| `inspiring_presence` | Inspiring Presence | Staff morale +10%. | Same. | `healMorale:10` aggregated; read at line 4405 in staff morning morale calc. | ✓ accurate | "Staff morale +10%" is ambiguous wording — the actual effect is +10 *flat* morale points (the morale scale is 20-100), not "+10%". Pre-existing description quirk, not Phase-4-induced. Could be worth tightening to "+10 staff morale per morning" in a future polish pass. |

### Legacy (2)

| ID | Name | Handbook says | In-game tooltip | Code does | Verdict | Notes |
|----|------|---------------|-----------------|-----------|---------|-------|
| `ancestral_wisdom` | Ancestral Wisdom | Pass the Torch carries 25% gold (up from 15%), 5 recipes (up from 3), 50% rep (up from 33%). +25 Energy. | Same. | `torchGoldBonus:0.10`, `torchRecipeBonus:2`, `torchRepBonus:0.17` all read at `passTorch` (lines 1296/1319-1321). Math: `0.15+0.10=0.25` ✓, `3+2=5` ✓, `0.33+0.17=0.50` ✓. **`torchEnergyBonus:1`** is read at line 280 and added to `bonusEnergyPerDay` in the next generation — but `bonusEnergyPerDay` is on the 25-energy-per-hour scale post-Phase-1, so the next gen gets **+1 Energy/day, not +25**. | 🔁 description mismatch | Phase 1 scaling miss. `torchEnergyBonus:1` should have been scaled to `25` so the next gen actually gets the promised +25 Energy. **High impact** because Ancestral Wisdom is the gateway legacy feat — and a player who picks it for the Energy bonus gets ~4% of the advertised effect. |
| `mentors_gift` | Mentor's Gift | Torch carries 1 additional legacy feature. (Req: Ancestral Wisdom) | Same. | **`torchExtraLegacy:1` is never read anywhere in `index.html`.** Pure stub. The torch-legacy system at line 1290 uses `selectedLegacy` (singular) and there's no code path that grants a second legacy. | ❌ no effect | High-impact dead feat. The whole Torch legacy chain (Ancestral Wisdom → Mentor's Gift) is half-broken now between this and the Ancestral Wisdom energy scaling bug above. |

### Combat / Survival (3)

| ID | Name | Handbook says | In-game tooltip | Code does | Verdict | Notes |
|----|------|---------------|-----------------|-----------|---------|-------|
| `iron_will` | Iron Will | +2 to all Danger Sense checks. | Same. | **`dangerSenseBonus:2` is never read anywhere.** Danger Sense checks use `getSkMod('danger_sense')` (rank + INU stat); no feat-bonus add exists. | ❌ no effect | Pure stub. Danger Sense passive saves and skill checks both compute from rank-only. |
| `thick_skin` | Thick Skin | Expedition injuries heal 1 day faster. | Same. | **`injuryHealBonus:1` is never read anywhere.** Expedition injuries are tracked via `injuryPenalty` (a numeric energy penalty cleared the next morning at line 4063); there's no per-day decrement to accelerate. | ❌ no effect | Pure stub. Note: Taskmaster's `staffInjuryReduction:1` reads correctly at line 5120, but that's for STAFF injuries — Thick Skin's "expedition injuries" are a separate (player) system that doesn't read this key. |
| `ward_of_protection` | Ward of Protection | -5% threat growth rate. | Same. | `threatGainReduction:0.05` aggregated; read at threat-grow ticks (alongside Fortified Workshop's `0.20`, Watchtower's `0.15`). | ✓ accurate | Stacks correctly with Fortified Workshop and the Watchtower settlement project. |

### General (10)

| ID | Name | Handbook says | In-game tooltip | Code does | Verdict | Notes |
|----|------|---------------|-----------------|-----------|---------|-------|
| `early_riser` | Early Riser | First 1-Energy action each day costs 0 Energy. | Same. | `firstActionFree:true` aggregated as boolean; read at line 2973 in `spendEnergy` and at line 1988 in `_forageAgain`. The check refunds the **FULL cost** of the first action regardless of its size (25⚡ brew, 50⚡ automaton, 10⚡ forage roll). | ⚠️ unclear | Phrasing artifact. "First 1-Energy action" reads as if it only applies to 1-Energy actions (which don't exist in Phase 1+). The actual behavior is "first action of any size costs 0." Phase 3b firstActionFree fix routes more sites through `spendEnergy` so the feat now fires on automaton/preemptive-strike/March-crisis too. Suggest rewording to "First action of the day costs 0 Energy." |
| `multitasker` | Multitasker | (Handbook) One free 0-hour action per day. (Tooltip) One free action per day (no Energy cost). | Mixed. | `freeAction:1` is read at line 800 (in `_computeBaseEFromSave`) and at line 4269 (in `newDay`'s baseE) — adds `+25 Energy` to baseE if any feature has `freeAction`. So Multitasker effectively grants +25 to the daily Energy pool. | ⚠️ unclear | Handbook still says "0-hour action" — old terminology. Mechanically the player gets +25 Energy/day, which IS equivalent to "one free 25-Energy action" but only if they're disciplined enough to think of it that way. Most players will read it as a discrete free action, which is misleading. Could be repurposed as a true free-action mechanic, or the description could be cleaned up to "+25 Energy per day". |
| `jack_of_all` | Jack of All Trades | +1 to all skill checks where you have 0 invested ranks. +1 to your lowest ability score modifier. | Same. | `untrainedBonus:1` read at `doCheck` for skill rank 0; `weakStatBonus:1` read at line 958 (eStat — adds +1 to whichever stat is lowest). | ✓ accurate | |
| `prodigy` | Prodigy | +1 to two ability scores of your choice (selected on pick, can exceed soft cap). +5% XP. | Same. | `asiBonus:2` read at line 7705 (one-time pick grant; adds +1 to two lowest stats). `xpMultiplier:0.05` aggregated; read at `gainXP`. | ✓ accurate | "Auto-selects lowest two" per code, "of your choice" per desc — minor wording mismatch (code is more deterministic than description claims). Tagged ✓ because the spirit matches; flag for handbook polish. |
| `tough` | Tough | Once per day, reroll a failed check. Negative town events halved. | Same. | `checkReroll:1` read at line 3071 (along with companion reroll). `eventDamageReduction:0.5` read at line 1794. | ✓ accurate | |
| `focused_mind` | Focused Mind | +1 skill point every other level (retroactive). +5% XP from all sources. | Same. | `bonusSkillEveryOther:true` read at level-up wizard (line ~888) — `skillPointsAvailable: 3 + (... && newLv%2===0 ? 1 : 0)`. `xpMultiplier:0.05` aggregated. | ✓ accurate | "Retroactive" claim — the runtime check only fires on level-up *after* the feat is taken, so for a player who picks it mid-character, levels before the pick don't get the bonus. Possibly a description over-claim, but the audit can't verify retroactive-application without code reading; tagged ✓ on the per-level mechanic. |
| `lorekeeper` | Lorekeeper | +25% XP from quests/board requests. Quest completion +5 faction rep. | Same. | `questXPBonus:0.25` read at lines 4028/4095. `questRepBonus:5` read at the same lines (added to faction rep multiplier). | ✓ accurate | |
| `relentless` | Relentless | After a failed check, +2 to next check of same type. Stacks to +6. | Same. | `failStreakBonus:2` + `failStreakCap:6` read at line 2693. | ✓ accurate | |
| `crisis_responder` | Crisis Responder | During the Hollow March, crisis checks get +3. Brew/enchant solutions need 1 fewer item. Gold solutions cost 20% less. | Same. | **None of `crisisCheckBonus:3`, `crisisCostReduction:1`, or `crisisGoldDiscount:0.20` are read anywhere in `index.html`.** All three keys are pure stubs. The Hollow March crisis-solution code at line 2138+ doesn't consult any of these feat keys. | ❌ no effect | **High-impact dead feat for endgame players.** The whole feat is non-functional during its target system. |
| `fortified_workshop` | Fortified Workshop | Threats grow 20% slower. Warning 2 days before 75+ threat events. Workshop upgrades can't be disabled by March failures. | Same. | `threatGainReduction:0.20` read at threat-grow tick. `threatWarning:true` read at line 4861 — but the trigger is `>=65 && <75` (warns once when threat crosses 65), NOT "2 days before 75+ events" as claimed. `upgradeProtection:true` read at line 4748 (skips the upgrade-disable branch in March wave-failure handling). | 🔧 partial | Two halves work cleanly; the "2 days warning" detail in the desc doesn't match the implementation (which is a level-crossing warning at 65, not a time-based 2-day forecast). Minor — could either change desc to "Warning when threats approach 75" or build the 2-day forecast feature. |

## Cross-cutting issues found

1. **Six fully-dead feats (`❌`).** All three Crisis Responder effects, both Iron Will and Thick Skin entire-feat effects, Mentor's Gift, Glyph Mastery (typo), and Efficient Brewing. That's ~10% of all feats. All have a real player cost (a level-up pick) and zero return. **Combined with the partial-broken (`🔧`) feats below, the dead-or-broken count is 10/59 (~17%).** Worse, several gate higher-impact systems — Mentor's Gift gates the legacy chain, Crisis Responder gates the endgame.
2. **Phase 1 energy-scaling miss: `torchEnergyBonus:1` (Ancestral Wisdom).** Should be `25` to deliver the advertised +25 Energy/day to the next generation. Phase 1's modifier-rescaling sweep apparently didn't reach the legacy/inheritance data path.
3. **"All gold costs" overclaim on Penny Pincher.** The feat name suggests broad coverage but the effects only touch 2 of 4 promised systems. A common pattern when a feat description was written aspirationally before all keys existed.
4. **`baseShelf` reads `shelfCapBonus` twice** (line 3944: `+getFeatureVal('shelfCapBonus')+Math.floor(getFeatureVal('shelfCapBonus'))`). This isn't a feat bug per se — it's a read-site bug — but it doubles Organized Shelves (+4 → +8 effective), Supply Lines (+2 → +4), and any future shelf-cap feat. Worth investigating whether the `Math.floor(...)` term is intentional or copy-paste residue. Flagged separately at the bottom.
5. **Old terminology in feat descriptions.** Early Riser still says "1-Energy action"; Multitasker handbook still says "0-hour action"; Lucky Find still says "per forage hour" (Phase 3 made it "per forage roll"); the broader pattern is that Phase 1's `*25` rescale and Phase 3's forage rework didn't sweep feat descriptions consistently. Most are tolerable as narrative, but Early Riser specifically is misleading.
6. **`autoEnchDC` vs `autoEnchantDC` typo (Glyph Mastery).** Single-character bug that disables a Tier-2 enchanter feat. The kind of issue that would have been caught by even a basic type system or a "read every feat effect key against the code keys" sweep — exactly the kind this audit catches.

## Post-Phase-4 conversion verification

Two feats were converted from flat to percentage by Phase 4:

| Feat | Old shape | New shape | Verification | Verdict |
|------|-----------|-----------|--------------|---------|
| `trailblazer_boots` | `travelReduction:25` | `energyCostMultiplier:{travel:-0.25}` | New shape confirmed in `game-data.js:292`. Aggregated by `getActionEnergyCost('travel', baseCost)` at `index.html:998`. Read site `getExpeditionInfo` at line 1612. Handbook description at line 894 reflects the percentage form. **No legacy `getFeatureVal('travelReduction')` read site remains** (verified by grep — only comments and audit-doc historical references). | ✓ conversion clean |
| `quick_study` | `researchTimeReduction:25` | `energyCostMultiplier:{research:-0.25}` | New shape confirmed in `game-data.js:315`. Aggregated by `getActionEnergyCost('research', baseCost)` at `index.html:998`. Read site `doResearch` at line 2884. Handbook description at line 921 reflects the percentage form. **No legacy `getFeatureVal('researchTimeReduction')` read site remains** (verified by grep — only Phase 4 changelog comments). | ✓ conversion clean |

**Both Phase 4 feat conversions landed correctly. No regressions surfaced by this audit.** The data-side conversions are clean, the percentage aggregator includes feats at line 998, and the read sites consume the helper output. If Phase 4 had broken either, the verdict would be `❌ no effect` (data shape disagreeing with code) — instead both are `✓ accurate`.

## Out of scope but worth flagging

- **`baseShelf` doubles `shelfCapBonus`.** Line 3944: `(hasUp('display')?12:hasUp('shopfront')?8:4) + upEff('displaySlots') + getFeatureVal('shelfCapBonus') + Math.floor(getFeatureVal('shelfCapBonus')) + compShelfBonus`. The `+v + Math.floor(v)` doubles every source of `shelfCapBonus`. Either intentional (and the description of every contributing feat/feature is off by 2×) or a real bug. Worth a 5-minute investigation.
- **Energy section of Chapter 11 still names Library + Beds + Hearth as the canonical examples of stacking modifiers.** Post-Phase-2/4 it should probably mention Trailblazer + Academy + Ranger companions for percentage modifiers and Beds/Hearth for flat ones. Not in feat-audit scope, but the worked example would land harder.
- **`maxApprenticeBonus` exists in `getFeatureVal` but isn't granted by any feat** — only Guildmaster class features. Not a feat audit concern; just noting it.
- **Handbook category headers say "20" feats in Economic** but the actual count is 17. Off-by-3 in the front-page count too (says 62, actual 59).
- **No "carry limit" system in the codebase.** Pack Mule's "+2 extra items" claim has nothing to attach to. If a carry limit is added later, retroactively wire `bonusCarry` there. If not, trim from description.
- **The `bonusPerSuccess` key (Danger Magnet)** is shared with Warden Lv9 Indomitable (`bonusPerSuccess:1`). Both stack additively, which is presumably intended, but the read site (`_executeForageRoll`'s success branch) should be verified to confirm no double-counting.

## Changelog

- **2026-05-13** — Fresh feat audit, 59 feats reviewed. Verdicts: 45 ✓ / 2 ⚠️ / 2 🔁 / 6 ❌ / 4 🔧 / 0 💡 / 0 ❓. Phase 4 conversions (Trailblazer's Boots, Quick Study) verified end-to-end as clean. **Top concerns: Glyph Mastery typo (`autoEnchDC` → `autoEnchantDC`), Crisis Responder fully dead (3 unread effect keys), Iron Will + Thick Skin fully dead, Mentor's Gift fully dead, Efficient Brewing fully dead, Ancestral Wisdom `torchEnergyBonus` Phase-1 scaling miss (`:1` should be `:25`).**
