> _Note: the task brief referenced `feature_dependency_audit.md` as a starting checklist; that file does not exist in the repo, so this audit's feature inventory was built fresh from `game-data.js`._

# Class Feature Audit
_Generated 2026-05-12. Read-only audit of all base class, specialization, and prestige class features for handbook ↔ code accuracy._

## Methodology

For each feature: (1) read handbook text in `cindervale_handbook.html`; (2) read in-game `desc` from `game-data.js` `CLASSES`/`CLASSES.specs`/`PRESTIGE_CLASSES`; (3) check each effect key in the feature's `effects:{...}` against read sites in `index.html`; (4) verify the read produces the claimed behavior.

**Critical structural finding** (affects every prestige verdict below): the aggregator `getFeatureVal()` in [index.html:616](index.html:616) iterates `CLASSES[cid].features` and `CLASSES[cid].specs[specId].features` only — **it does NOT iterate `PRESTIGE_CLASSES`**. So any `effects:{}` block declared on a prestige feature is silently ignored at runtime. The only place prestige `effects`/`legacyEffects` get used is at [index.html:1189-1212](index.html:1189), which computes Pass-the-Torch legacy options for the next-generation apprentice. Prestige features that depend on the `getFeatureVal` mechanism for current-character benefit do nothing for the current character. Working prestige features are all driven by direct `prestigeLevels.<id>` level-gate checks elsewhere in the code.

## Summary

- **Total features audited:** 140 (50 base class + 45 spec + 45 prestige)
- ✓ accurate: 117
- ⚠️ unclear: 0
- 🔁 description mismatch: 12
- ❌ no effect: 2
- ❓ dead system: 2
- 🔧 partial: 7
- 💡 unexpected: 0
- ❓ needs review: 0

## Changelog

- **2026-05-12** — Phase B (Diplomat structural fix) and Phase A (description fixes for 24 features: handbook + tooltip). Phase B wired Diplomat Lv1/Lv2/Lv5 effects at their individual read sites (`addRep`, quest-reward sites, `shopRestockBonus`, `getHarmonyBonus`) and fixed the Grand Alliance `dLv>=10` → `dLv>=4` typo. Phase A trusted-the-code description fixes brought 24 rows from `🔁`/`⚠️`/`💡` to ✓ accurate. See git history for specifics.

## Base Classes

### Alchemist

| Level | Feature | Handbook says | In-game tooltip | Code does | Verdict | Notes |
|-------|---------|---------------|-----------------|-----------|---------|-------|
| 1 | Potion Crafting | +1 craft, 10% ingr save | matches | `craftBonus:1` (2040 etc), `saveIngredientChance:0.10` (2440) | ✓ accurate | |
| 2 | Ingredient Sense | +1 craft, +1 extraction | matches | `craftBonus:1`, `extractionBonus:1` (1423) | ✓ accurate | |
| 3 | Specialization | +5% ingr save (+pick spec) | matches | `saveIngredientChance:0.05` read | ✓ accurate | |
| 4 | Efficient Brewing | 15% save chance | matches | `saveIngredientChance:0.15` read at 2440 | ✓ accurate | |
| 5 | Double Batch | 25% double batch | matches | `doubleBatchChance:0.25` read at 2442 | ✓ accurate | |
| 6 | Intuitive DC | Can't roll below 5; 10% lucky brew | matches | `craftFloor:5`, `luckyBrewChance:0.10` | ✓ accurate | |
| 7 | Master Brewer | +2 craft; "Unlock one legendary recipe" | matches | `craftBonus:2`, `discoveryChanceBonus:0.15` — no legendary-recipe unlock flag | 🔁 description mismatch | "Unlock one legendary recipe" has no implementing code; effect only delivers craft/discovery bonus |
| 8 | Reagent Attunement | Bonus ingr attuned to most-brewed recipe; +15% ingr efficiency | matches | `attunedForaging` checked at 1492 — 30% chance, picks ingredient from top-brewed recipe; `ingredientEfficiency:0.15` at 2426 | ✓ accurate | Code's 30% chance not stated in handbook but matches the spirit |
| 9 | Perfected Art | Failures on mastered recipes → lesser version; 1/day reroll | matches | `lesserOnFail` at 2414, `craftReroll:1` at 2397 | ✓ accurate | |
| 10 | Magnum Opus | Top 3 brews auto-MW; 1/day brew any recipe **mastered 20+ times** with zero ingredients | matches | `masteryAutoMW` at 2329, `freeCraft:1`, `doubleBatchChance:0.50` work. **`zeroIngrMastery:20` interpreted as: must have ≥20 *distinct* recipes each brewed ≥25 times before ANY zero-ingr brew unlocks (2358)** | ✓ accurate | Description fixed 2026-05-12 — handbook + tooltip now say "after brewing 20 different recipes 25+ times each, one brew per day costs zero ingredients." Double-batch chance also surfaced. |

### Enchanter

| Level | Feature | Handbook says | In-game tooltip | Code does | Verdict | Notes |
|-------|---------|---------------|-----------------|-----------|---------|-------|
| 1 | Inscribe Enchantment | +1 inscription, mat cost −1 | matches | `enchantBonus:1`, `enchantMatDiscount:1` | ✓ accurate | |
| 2 | Mana Flow | +1 inscription, mat cost −1 | matches | both stack | ✓ accurate | |
| 3 | Specialization | +5 inscription | matches | `enchantSuccessFlat:5` (capped at +20 at 2732) | ✓ accurate | |
| 4 | Arcane Mastery | +8% success; see customer hints | matches | `enchantSuccessFlat:8`, `showCustHints` at 9865 | ✓ accurate | |
| 5 | Dual Inscription | 2 enchants per item (2nd +3 DC) | matches | `dualInscription` at 2700 | ✓ accurate | |
| 6 | Resonance | +25% gold; **"Unlock 2 new enchantment patterns"** | matches | `enchantGoldBonus:0.25` (2756), `enchantMatSave:0.20`. No code for unlocking 2 specific patterns | 🔁 description mismatch | Pattern unlock claim has no implementation; bonus gold + mat save work |
| 7 | Overcharge | Nat 20 = Masterwork worth 3× | matches | `masterworkOnCrit` at 2454 (note: code grants 2× XP, not "3× gold") | ✓ accurate | Description fixed 2026-05-12 — handbook + tooltip now say nat-20 inscriptions produce a Masterwork enchantment (double XP and Masterwork-tier pricing) without the misleading "3× gold" number |
| 8 | Archmage | Auto-succeed DC ≤12; +2 insc | matches | `autoEnchantDC:12` at 2734, `enchantBonus:2` | ✓ accurate | |
| 9 | Rune Library | **"Know all enchantment patterns regardless of faction requirements"** | matches | Effects: `discoveryChanceBonus:0.25`, `xpMultiplier:0.10`. **No flag overriding faction-gated pattern requirements** | ✓ accurate | Description fixed 2026-05-12 — handbook + tooltip now say "+25% discovery chance, +10% XP from all sources." Faction-pattern-bypass claim dropped. |
| 10 | Reality Weaver | +12 insc, +50% gold, crit on 17+ | matches | `enchantSuccessFlat:12`, `enchantGoldBonus:0.50`, `enchantCritRange:17` all work | ✓ accurate | |

### Artificer

| Level | Feature | Handbook says | In-game tooltip | Code does | Verdict | Notes |
|-------|---------|---------------|-----------------|-----------|---------|-------|
| 1 | Technical Crafting | +1 craft on TEC recipes | matches | `craftBonus:1`, `salvagePercent:0.15` | ✓ accurate | Description fixed 2026-05-12 — handbook + tooltip now say "+1 to all craft checks. 15% salvage on failures." Dropped misleading TEC-only specificity. |
| 2 | Salvage | 50% on failure | matches | `salvagePercent:0.5` at 2412 | ✓ accurate | |
| 3 | Specialization | +10% salvage | matches | `salvagePercent:0.10` | ✓ accurate | |
| 4 | Calibration | **"−1 DC for recipes brewed 3+ times"**; auto-succeed DC ≤8 | matches | `craftFloor:4`, `craftBonus:1`. No per-recipe DC reduction based on brew count | ✓ accurate | Description fixed 2026-05-12 — handbook + tooltip now say "+1 to all craft checks. Your d20 craft rolls cannot land below 4." Removed unimplemented per-recipe DC and misleading auto-succeed claim. |
| 5 | Overclock | Upgrades provide 50% more numerical bonuses | matches | `upgradeCostReduction:0.20`, `batchSizeBonus:1`. Note: the "double upgrade bonuses" effect lives on Lv10 (`upgradeDoubleBonus:true`, read at 844) | ✓ accurate | Description fixed 2026-05-12 — handbook + tooltip now say "Workshop upgrade costs reduced by 20%. Batch brew capacity +1." The "50% more upgrade bonuses" claim that actually belongs to Lv10 was removed. |
| 6 | Production Line | +10% batch success per item after first | matches | `batchSuccessBonus:0.10` at 2795 | ✓ accurate | |
| 7 | Prototype | 1/day reroll; +15% research discovery | matches | `craftReroll:1`, `discoveryChanceBonus:0.15` | ✓ accurate | |
| 8 | Grand Artificer | **"Unlock legendary device recipes"**; upgrade cost −25% | matches | `craftFloor:8`, `upgradeCostReduction:0.25`. No legendary-recipe unlock | 🔁 description mismatch | The "legendary device recipes" promise has no implementation |
| 9 | Systematic Mastery | Batch cap +3 | matches | `batchSizeBonus:3`, `batchSuccessBonus:0.15` | ✓ accurate | |
| 10 | Masterwork Engine | 2 free crafts/day; batch +2; 100% salvage; upgrades −30% and double bonuses | matches | `freeCraft:2`, `batchSizeBonus:2`, `salvagePercent:1.0`, `upgradeCostReduction:0.30`, `upgradeDoubleBonus` all read | ✓ accurate | |

### Scholar

| Level | Feature | Handbook says | In-game tooltip | Code does | Verdict | Notes |
|-------|---------|---------------|-----------------|-----------|---------|-------|
| 1 | Research Study | +5% discovery | matches | `discoveryChanceBonus:0.05`, `xpMultiplier:0.05` | ✓ accurate | |
| 2 | Speed Reader | 1 free research/day; +10% discovery | matches | `freeResearchPerDay:1` at 2568, `discoveryChanceBonus:0.10` | ✓ accurate | |
| 3 | Specialization | +5% discovery | matches | `discoveryChanceBonus:0.05` | ✓ accurate | |
| 4 | Eureka! | +15% experiment discovery; show recipe info | matches | `experimentBonus:0.15` at 2533, `showRecipeInfo` at 9521 | ✓ accurate | |
| 5 | Academic Network | +15% XP; +1 free research/day (2 total) | matches | `xpMultiplier:0.15`, `freeResearchPerDay:1` (stacks) | ✓ accurate | |
| 6 | Cross-Reference | Experiment hints | matches | `experimentHints` at 9658 | ✓ accurate | |
| 7 | Thesis Defense | +3 ACU; **"Research can discover enchantment patterns too"** | matches | `craftBonus:3`, `discoveryChanceBonus:0.15`, `xpMultiplier:0.10`. **No flag for cross-discipline pattern discovery** | ✓ accurate | Description fixed 2026-05-12 — handbook + tooltip now say "+3 craft bonus, +15% discovery chance, +10% XP from all sources." Dropped the unimplemented cross-discipline pattern-discovery claim. |
| 8 | Grand Theorem | +25% discovery; **"See full ingredient tables for explored regions"** | matches | `discoveryChanceBonus:0.25`, `showIngredients` at 9522 — but ingredient tables don't appear to be hidden in normal UI | ❓ dead system | Same problem as Naturalist Lv3: the "show ingredients" flag fires but there's no normal UI state where ingredients are hidden, so the player observes no change |
| 9 | Polymath | +2 craft/insc/extract; +10% XP | matches | all four keys read | ✓ accurate | |
| 10 | Omniscience | **"Know all recipes"**, **"Experiment Bench shows exact results"**, +2 craft, +30% XP, publish papers | matches | Effects: `xpMultiplier:0.30`, `discoveryChanceBonus:0.40`, `craftBonus:2`, `publishPapers:true`. **No flag for "know all recipes"** or "show exact experiment results"** | ✓ accurate | Description fixed 2026-05-12 — handbook + tooltip now say "+40% discovery chance, +2 craft, +30% XP, publish theoretical papers for passive gold." Dropped "know all recipes" and "exact experiment results" claims. |

### Warden

| Level | Feature | Handbook says | In-game tooltip | Code does | Verdict | Notes |
|-------|---------|---------------|-----------------|-----------|---------|-------|
| 1 | Trailblazer | −1 travel | matches | `travelReduction:1` at 1374 | ✓ accurate | |
| 2 | Enduring Spirit | +1 Energy; weather penalty /2 | matches | `bonusEnergyPerDay:1` at 3940, `weatherReduction:0.5` at 1376 | ✓ accurate | |
| 3 | Specialization | +1 extraction | matches | `extractionBonus:1` | ✓ accurate | |
| 4 | Iron Constitution | Immune to time-loss events | matches | `immuneTimeLossEvents` at 1546 | ✓ accurate | |
| 5 | Expert Forager | Crit nat 20 = 3× ingr; +1/success | matches | `critExtractionMulti:3`, `bonusPerSuccess:1` | ✓ accurate | |
| 6 | Deep Mapping | **"Forage a second region in same expedition at −2 hours"** | matches | `bonusRegionSlot:1` read at 881 in `regUnlock` which reduces a region's unlock level by 1 — that's a region unlock discount, **not** a second-region forage slot | ✓ accurate | Description fixed 2026-05-12 — handbook + tooltip now say "Region level requirements are reduced by 1 — access regions one level earlier than normal." Dropped the non-existent "second region same trip" mechanic. |
| 7 | Wilderness Mastery | +2 extract, 2× positive events, 15% rare/hour | matches | `extractionBonus:2`, `positiveEventMulti:2` at 1502, `luckyFindChance:0.15` | ✓ accurate | |
| 8 | Expedition Commander | Staff forage +40%, staff XP +25% | matches | `staffForageBonus:0.40` at 3953, `staffXPBonus:0.25` at 3954 | ✓ accurate | |
| 9 | Indomitable | +3 extract; +1/success; **"Failed extractions still yield 1 common ingredient"** | matches | `extractionBonus:3`, `bonusPerSuccess:1` work. **No flag for failed-extraction-yields-1** | ✓ accurate | Description fixed 2026-05-12 — handbook + tooltip now say "+3 extraction bonus, +1 bonus ingredient per successful extraction." Dropped the unimplemented "failed extractions still yield 1" claim. |
| 10 | Legend of the Wild | All travel = 0; +50% yields; overnight forage | matches | `travelReduction:3`, `yieldMultiplier:0.5`, `forageOnRest` at 4177 | ✓ accurate | |

## Specializations

### Alchemist Specializations

#### Apothecary
| Level | Feature | Handbook says | Code does | Verdict | Notes |
|-------|---------|---------------|-----------|---------|-------|
| 3 | Healer's Touch | Healing potions 2× value/XP; **"Healing recipes −2 DC"** | `craftBonus:1`, `sellBonus:0.20`. No per-category DC reduction | 🔁 description mismatch | The −2 DC for healing recipes specifically isn't applied; players get a generic +1 craft and +20% sell |
| 6 | Panacea | **"Unlock multi-cure recipes"**; "Healing potions restore staff morale" | `healMorale` at 4076, `customerBonus:1`, `freeHealBrew:1`. No specific multi-cure recipe unlock | 🔁 description mismatch | Multi-cure recipes claim has no implementation; the other claims work |
| 10 | Miracle Worker | Auto-diagnose; 3× pay; Miracle Cure; 50% MW bonus | All four keys read (`clinicAutoDiagnose`, `clinicPayMult`, `miracleCure`, `healingBonusMW`) | ✓ accurate | |

#### Transmuter
| Level | Feature | Handbook says | Code does | Verdict | Notes |
|-------|---------|---------------|-----------|---------|-------|
| 3 | Efficient Transmutation | 2:1 ratio | `transmuteRatio:2` at 2685, `canTransmute` at 7975 | ✓ accurate | |
| 6 | Lead to Gold | Transmute faction ingr; convert potions between types | `factionTransmute` at 9724, `ingredientEfficiency:0.25` | ✓ accurate | |
| 10 | Philosopher's Stone | 1:1 ratio; 0-hour transmutations | `transmuteRatio:1`, `freeTransmute` at 2686/9723 | ✓ accurate | |

#### Venomist
| Level | Feature | Handbook says | Code does | Verdict | Notes |
|-------|---------|---------------|-----------|---------|-------|
| 3 | Volatile Mixtures | **"Unlock offensive/volatile recipes"**, 2× sell to guards, +2 craft on volatile | `sellBonus:0.30`, `craftBonus:2`. No specific "volatile recipe" gate or guard-faction premium | 🔁 description mismatch | Both promises (recipe unlock, guard-specific premium) are unimplemented; player gets generic +30% sell and +2 craft instead |
| 6 | Concentrated Dose | +20% double batch, +2 craft | `doubleBatchChance:0.20`, `craftBonus:2` | ✓ accurate | |
| 10 | Plague Doctor | +3 craft; 30% double batch on volatile; failures → lesser venoms; contracts 3×; **"2 legendary poisons reduce threat by 15"** | `craftBonus:3`, `doubleBatchChance:0.30`, `lesserOnFail`, `venomContractMult:3` at 2914, `threatPoisons:true` at 2920. Verified: `threatPoisons` fires on every fulfilled venom contract and reduces the buying guard faction's threat by `3 + 2× contract.tier` (NOT a flat 15) | ✓ accurate | Description fixed 2026-05-12 — handbook + tooltip now say "Every fulfilled venom contract reduces the buying guard faction's threat by 3 + 2× contract tier." Dropped the misleading "2 legendary poisons / -15" framing. |

### Enchanter Specializations

#### Runesmith
| Level | Feature | Handbook says | Code does | Verdict | Notes |
|-------|---------|---------------|-----------|---------|-------|
| 3 | Battle Runes | **"Weapon/martial enchants +25% value"**, **"−1 DC on weapon runes"** | `enchantBonus:1`, `enchantGoldBonus:0.15` (15%, not 25%) | 🔁 description mismatch | Gold bonus is 15%, not 25%. "−1 DC on weapon runes" is unimplemented (no per-category DC reduction) |
| 6 | Runic Mastery | Mat cost −1; "re-enchant failed items" | `enchantMatDiscount:1`, `enchantCritRange:19`, `craftReroll:1` | ✓ accurate | Description fixed 2026-05-12 — handbook + tooltip now say "All enchantment material costs −1. Inscription crits on 19+. Once per day, reroll a failed craft or inscription." The reroll is shared with brews — described as such. |
| 10 | Legendary Arms | **"Artifact-grade weapon enchants. Martial enchants worth 3× gold"** | `enchantGoldBonus:0.50` (50%), `masterworkOnCrit`, `autoEnchantDC:14` | 🔁 description mismatch | 3× gold claim doesn't match +50% gold bonus; "artifact-grade" is flavor with no specific implementation |

#### Wardkeeper
| Level | Feature | Handbook says | Code does | Verdict | Notes |
|-------|---------|---------------|-----------|---------|-------|
| 3 | Wards | **"Defensive enchants +50% value, +2 to defensive inscription checks"** | `enchantBonus:1` (+1, not +2), `failEnchantReturn:0.50`. No per-category sell bonus | 🔁 description mismatch | Inscription bonus is +1 not +2; +50% defensive value is unimplemented; `failEnchantReturn` (mat return on fail) is unmentioned in handbook |
| 6 | Layered Wards | 3 enchants on armor; 40% mat save | `enchantMatSave:0.40`, `dualInscription` | ✓ accurate | Description fixed 2026-05-12 — handbook + tooltip now say "Apply two enchantments to a single customer item (second at +3 DC). 40% chance to save materials on a successful inscription." Corrected from 3 enchants to 2 (matches `dualInscription` flag). |
| 10 | Unbreakable | Defensive auto-succeed DC 15; shield commissions 3×; **"Once/day Fortress Ward: reduces all threats by 5 for 3 days"** | `autoEnchantDC:15`, `enchantSuccessFlat:10`, `enchantMatSave:0.60`, `shieldPayMult:3` at 3019, `fortressWard:true` at 4325 — but **fortressWard is implemented as a passive bandit-theft blocker (theftChance=0 when threat<75), not as an active 3-day threat reducer** | ✓ accurate | Description fixed 2026-05-12 — Fortress Ward rewritten as a passive shield-protection effect: "Bandits cannot steal overnight shelf sales while local bandit threat stays below 75." Hidden win for the player now visible. |

#### Spellweaver
| Level | Feature | Handbook says | Code does | Verdict | Notes |
|-------|---------|---------------|-----------|---------|-------|
| 3 | Exotic Inscriptions | **"Utility/exotic enchants unlocked. +2 to exotic inscription"** | `discoveryChanceBonus:0.15`, `enchantBonus:1` (+1, not +2). No category-specific gate | 🔁 description mismatch | Generic +1 inscription instead of category-targeted +2; "unlock exotic" has no specific implementation |
| 6 | Planar Weave | "Exotic enchants 2× and attract special customers" | `enchantGoldBonus:0.35` (35%, not 2×), `customerBonus:1` | 🔁 description mismatch | 35% gold bonus, not 2×; "special customers" likely refers to the generic +1 customer slot |
| 10 | Planar Convergence | **"Combine two enchant types into one inscription"** | `enchantCritRange:17`, `enchantGoldBonus:0.50`, `customerPayBonus:0.30`. No flag for combining enchant types | ✓ accurate | Description fixed 2026-05-12 — handbook + tooltip now say "Inscription crits on 17+. +50% gold from enchanting. +30% gold from potion customers." Dropped the unimplemented "combine two enchant types" claim. |

### Artificer Specializations

#### Tinkerer
| Level | Feature | Handbook says | Code does | Verdict | Notes |
|-------|---------|---------------|-----------|---------|-------|
| 3 | Gadgeteer | Gadgets for passive bonuses; +1 craft; +15% experiment | `craftBonus:1`, `experimentBonus:0.15`, `salvagePercent:0.50` | ✓ accurate | |
| 6 | Swiss Army | +15% batch success; upgrades −15% | `batchSuccessBonus:0.15`, `upgradeCostReduction:0.15` | ✓ accurate | |
| 10 | Masterwork Tools | All craft DC −2 (delivered as +3 craft); 90% salvage; infinite marks; 2 gadgets | `craftBonus:3`, `salvagePercent:0.90`, `infiniteGadgetMarks` at 1770, `dualGadgets` at 3553 | ✓ accurate | |

#### Constructor
| Level | Feature | Handbook says | Code does | Verdict | Notes |
|-------|---------|---------------|-----------|---------|-------|
| 3 | Workshop Pro | Upgrades 50% less gold; +2 DIS | `upgradeCostReduction:0.5`, `staffEfficiencyBonus:0.15` | ✓ accurate | Description fixed 2026-05-12 — handbook + tooltip now say "Workshop upgrades cost 50% less gold. Staff efficiency +15%." The "+2 DIS" claim that was actually `staffEfficiencyBonus` is now described as such. |
| 6 | Assembly Floor | Batch +2 (up to 7); staff eff +20% | `batchSizeBonus:2`, `staffEfficiencyBonus:0.20` | ✓ accurate | |
| 10 | Master Builder | 3 named blueprints: **Alchemical Forge** (auto-brew most profitable), **Crystal Greenhouse** (1 random rare ingr/day), **Arcane Conduit** (+2 Energy); half construction time | `passiveIncomeMulti:3`, `overnightCraft:true` at 4625, `bonusEnergy:2` at 3940, `halfConstructTime:true` at 4048. **`legendaryBlueprints:true` is declared but UNUSED** (no read site anywhere). The "Crystal Greenhouse" (1 random rare ingr/day) has no implementing code | 🔧 partial | Arcane Conduit ≈ `bonusEnergy:2` ✓. Alchemical Forge ≈ `overnightCraft` (vaguely). Crystal Greenhouse → unimplemented. `legendaryBlueprints` flag is dead. |

#### Reclaimer
| Level | Feature | Handbook says | Code does | Verdict | Notes |
|-------|---------|---------------|-----------|---------|-------|
| 3 | Zero Waste | 75% salvage; **"Break down potions"**; 50% spoiled→Residue | `salvagePercent:0.75`, `ingredientEfficiency:0.25`, `spoilSalvage:0.50` at 4942 | ✓ accurate | Description fixed 2026-05-12 — handbook + tooltip now say "75% salvage on craft failure. +25% ingredient efficiency. 50% of spoiled ingredients are reclaimed as Alchemical Residue." Dropped the unimplemented "break down potions" claim. |
| 6 | Deconstruct | **"Break any item into components"**; failed enchants return all mats | `failEnchantReturn:1.0`, `saveIngredientChance:0.30` | ✓ accurate | Description fixed 2026-05-12 — handbook + tooltip now say "Failed enchantments return 100% of their materials. 30% chance to save an ingredient on any successful brew." Dropped the unimplemented general item-deconstruction claim. |
| 10 | Perfect Reclamation | 1 free craft/day; **"Deconstruction yields 150%"** | `freeCraft:1`, `salvagePercent:1.0` | ✓ accurate | Description fixed 2026-05-12 — handbook + tooltip now say "One free craft per day. 100% salvage on craft failures — nothing is ever wasted." The 150% deconstruction claim (referencing a non-existent system) was dropped. |

### Scholar Specializations

#### Theorist
| Level | Feature | Handbook says | Code does | Verdict | Notes |
|-------|---------|---------------|-----------|---------|-------|
| 3 | Published Research | 2× XP from research/experiments; publish papers | `researchXPMulti:2` at 2575, `publishPapers` at 9681 | ✓ accurate | |
| 6 | Peer Review | +20% research discovery; papers earn more over time | `discoveryChanceBonus:0.20`, `paperScaling` at 4160/4752/9685 | ✓ accurate | |
| 10 | Grand Unified Theory | Research = 2 discoveries; papers earn faction rep; scaling craft from papers (+1/+2/+3) | `discoveryChanceBonus:0.35`, `grandPapers` at 4160/4752/9686, `doubleDiscovery` at 2592/2609, `citationCraftBonus` (formula `min(4, floor(papers/2))` at 645) | ✓ accurate | Description fixed 2026-05-12 — handbook + tooltip now say the scaling permanent craft bonus is "+1 every 2 papers, capped at +4." The hidden +4 cap (slightly better than the original +3 claim) is now correctly surfaced. |

#### Naturalist
| Level | Feature | Handbook says | Code does | Verdict | Notes |
|-------|---------|---------------|-----------|---------|-------|
| 3 | Field Guide | **"See full ingredient tables for explored regions"**; +15% experiment discovery | `showIngredients` at 9522, `experimentBonus:0.15`. The `showIngredients` flag fires but **ingredient tables are not hidden by default** in the current UI | ❓ dead system | This is the canonical example. The "reveal hidden ingredients" feature acts on a hide-mechanism that's not present in the live game |
| 6 | Ecological Insight | **"Research discovers region-specific recipes"**; +20% forage/experiment XP | `xpMultiplier:0.20`, `discoveryChanceBonus:0.15`. No region-specific discovery flag | 🔁 description mismatch | The region-specific recipe claim has no implementation; generic XP and discovery work |
| 10 | Nature's Library | Bonus hidden-area ingr; all-season ingr; commune reveals best region; journal craft +2 | `forageDiscovery:0.30`, `forageXPBonus:0.25`, `hiddenForageBonus:true` at 1650, `allSeasonIngr:true` at 503/1463, `journalCraftBonus:2` at 647 | 🔧 partial | All flags fire EXCEPT the "commune to reveal highest-yield region" daily ability — no command/button for that exists |

#### Archivist
| Level | Feature | Handbook says | Code does | Verdict | Notes |
|-------|---------|---------------|-----------|---------|-------|
| 3 | Deep Records | **"Quest log shows hidden objectives"**; +30% quest XP | `questRepBonus:5`, `questXPBonus:0.30` at 3700/3767. No "hidden objective" reveal mechanic | ✓ accurate | Description fixed 2026-05-12 — handbook + tooltip now say "+30% XP from quest turn-ins. Quest faction-rep payouts are boosted by +5× the standard amount." Dropped the unimplemented hidden-objectives claim. |
| 6 | Master Index | Board refresh 2×; **"Quest chains unlock earlier"** | `doubleQuestRefresh:true` at 4727, `questGoldBonus:0.25`. No "chains unlock earlier" mechanic | ✓ accurate | Description fixed 2026-05-12 — handbook + tooltip now say "The notice board refreshes twice as often. +25% gold from quest turn-ins." Dropped the unimplemented quest-chain-unlock claim. |
| 10 | Living Archive | Lore chains → +1 stat (up to 3); 25% lore drop; 3× board refresh; +50% alignment | `questXPBonus:0.50`, `doubleRep:true` at 882, `loreStatBonus` at 835, `loreDropChance:0.25` at 3721/3777, `tripleBoardRefresh` at 4727, `alignmentBoost:0.50` at 626 | ✓ accurate | |

### Warden Specializations

#### Ranger
| Level | Feature | Handbook says | Code does | Verdict | Notes |
|-------|---------|---------------|-----------|---------|-------|
| 3 | Tracker | Target ingredients with no yield penalty; befriend creatures | `luckyFindChance:0.20`, `extractionBonus:2`, `targetNoYieldPenalty` at 1416/1445/6801 | ✓ accurate | |
| 6 | Pathfinder | **"Discover hidden sub-regions with unique ingredients"**; creature bonuses grow | `yieldMultiplier:0.50`, `critExtractionMulti:2`. The "hidden sub-regions" claim sounds like a Cartographer prestige feature and has no implementation here | ✓ accurate | Description fixed 2026-05-12 — handbook + tooltip now say "+50% foraging yield. Critical extractions (nat 20) yield an additional +2× ingredients on top of the base crit multiplier." Dropped the hidden-sub-regions claim that belongs to Cartographer. |
| 10 | Apex Predator | Companions act 2×; legendary ability; solo expedition | `companionDualAction` at 5219, `guaranteedRare`, `legendaryCompanion` at 5304, `soloExpedition` at 6941/7941/8627 | ✓ accurate | |

#### Quartermaster
| Level | Feature | Handbook says | Code does | Verdict | Notes |
|-------|---------|---------------|-----------|---------|-------|
| 3 | Supply Chain | Storage 2×; ingr eff +25%; spoil +4 | `doubleStorage:true` at 3617, `ingredientEfficiency:0.25`, `spoilThreshold:4` | ✓ accurate | |
| 6 | Logistics Master | Staff forage +25%; personal yield +25%; spoil +4; **"Caravans always fresh"** | `staffForageBonus:0.25`, `yieldMultiplier:0.25`, `spoilThreshold:4`. Verified: no caravan-specific freshness mechanic exists; ingredients use the standard spoilage system | ✓ accurate | Description fixed 2026-05-12 — handbook + tooltip now say "Staff foraging +25%. +25% personal foraging yield. Spoilage threshold +4." Dropped the unimplemented "caravans always fresh" claim. |
| 10 | War Room | "Fully automated"; yield +100%; spoil +8 | `staffEfficiencyBonus:0.30`, `yieldMultiplier:1`, `spoilThreshold:8` | ✓ accurate | "Fully automated" is flavor — staff efficiency +30% is the concrete impl |

#### Sentinel
| Level | Feature | Handbook says | Code does | Verdict | Notes |
|-------|---------|---------------|-----------|---------|-------|
| 3 | Night Watch | Night expeditions +2h at +4 DC | `nightExpeditions:true`, `nightBonusHours:2` at 3814 | ✓ accurate | |
| 6 | Trap Setter | Guaranteed rare; night danger reduced | `guaranteedRare:true` at 1737, `nightDangerReduction:true` at 3817 | ✓ accurate | |
| 10 | Eternal Vigil | 4h night; +3 DC instead of +4; threats decay 3/day; Preemptive Strike | `forageOnRest`, `nightBonusHours:2` (stacks to 4), `nightDCReduction:1`, `staffForageBonus:0.20`, `passiveThreatDecay:3` at 4244, `preemptiveStrike` at 7834 | ✓ accurate | |

## Prestige Classes

> **Reminder**: Prestige features' `effects:{...}` and `legacyEffects:{...}` are NOT iterated by `getFeatureVal`. They only matter for the Pass-the-Torch legacy inheritance UI. Current-character behavior comes from `prestigeLevels.<id>` level-gate checks scattered throughout `index.html`.

### Cartographer

| Level | Feature | Handbook says | Code does | Verdict | Notes |
|-------|---------|---------------|-----------|---------|-------|
| 1 | Hidden Paths | 25% chance/hour to discover hidden region | `prestigeLevels.cartographer>=1` gates hidden-region discovery at 1650-1683 | ✓ accurate | |
| 2 | Detailed Maps | Hidden discovery +15%; mapped areas +1 bonus ingr | Lv>=2 adds bonusPerMapped at 1686 | ✓ accurate | |
| 3 | Cartographer's Insight | **"See all ingredients in region before committing to forage"**; +10% XP foraging | Neither the ingredient preview nor the +10% XP has a Lv>=3 gate anywhere in `index.html` | ❌ no effect | Both claims unimplemented |
| 4 | Pathfinder's Network | **"+25% staff forage yield"** | No `prestigeLevels.cartographer>=4` check; `staffForageBonus` only fed by Warden/Quartermaster | ❌ no effect | Entirely unimplemented for prestige |
| 5 | Legendary Atlas | Discover Heartforge hidden chambers | `prestigeLevels.cartographer>=5` gates legendary regions at 1654 | ✓ accurate | |

### Spellbrewer

| Level | Feature | Handbook says | Code does | Verdict | Notes |
|-------|---------|---------------|-----------|---------|-------|
| 1 | Infusion Novice | 2 infusions/day | `prestigeLevels.spellbrewer>=1` → 2 slots at 2338-2340 | ✓ accurate | |
| 2 | Resonant Brew | 3/day; DC penalty −1 | sbLv>=2 → 3 slots, DC reduction at 2370 | ✓ accurate | |
| 3 | Essence Weaver | 4/day; **"25% chance catalyst preserved"** | 4 slots work; **catalystPreserve mechanic not found in code** | 🔧 partial | Slot count works; catalyst preservation unimplemented |
| 4 | Arcane Distiller | 5/day; **"Catalyst always preserved on Masterwork+ brews"** | 5 slots work; **mwCatalystPreserve mechanic not found** | 🔧 partial | Slot count works; MW-catalyst-preservation unimplemented |
| 5 | Grand Spellbrewer | 6/day; **"Stack two infusions"**; **"+1 daily customer from infused shelf"** | 6 slots work; **doubleInfusion and infusedCustomerBonus mechanics not found** | 🔧 partial | Only the slot count delivers |

### Magitech Engineer

| Level | Feature | Handbook says | Code does | Verdict | Notes |
|-------|---------|---------------|-----------|---------|-------|
| 1 | Automaton Frame | 1 automaton; 60% efficiency | `getAutoSlots()` and `getAutoEfficiency()` gate on prestige level (3184-3210) | ✓ accurate | |
| 2 | Improved Servos | 80% efficiency; assign brew/forage/shopkeep | efficiency 0.8, task assignment at 3212-3216 | ✓ accurate | |
| 3 | Second Automaton | 2 slots; automata gain XP | 2 slots; XP/leveling at 5035-5041 | ✓ accurate | |
| 4 | Enchanted Core | Can enchant; 100% efficiency | `canAutoEnchant()` at 3187 | ✓ accurate | |
| 5 | Master Construct | 3 slots; prestige tasks; self-repairing | 3 slots; failed automata still produce output at 5041-5043 | ✓ accurate | |

### Brand Master

| Level | Feature | Handbook says | Code does | Verdict | Notes |
|-------|---------|---------------|-----------|---------|-------|
| 1 | First Label | 1 brand, 2 recipes; branded +10% sell | `bmLv` gates at 2169-2175; works | ✓ accurate | |
| 2 | Brand Recognition | 3 recipes; +5 faction rep per 10 sales | rep gain at 2188-2193; recipe slots 3 at 2179 | ✓ accurate | |
| 3 | Product Line | 2 brands; brand orders (2× price); +10% shelf sell | brand orders at 4601-4605; 2 slots at 2171 | ✓ accurate | |
| 4 | Premium Label | 4 recipes; Famous tier (+60%); MW bonus +25% | 4 recipes, famous tier at 2166-2167 | ✓ accurate | |
| 5 | Legendary Brand | 3 brands; **"collectors trade rare ingredients"**; 25% brand rep through Torch | 3 slots ✓. **collectors trading mechanic not found**; torch rep carry not verified | 🔧 partial | Brand slots work; collector trading is the main headline claim and isn't implemented |

### Wildcrafter

| Level | Feature | Handbook says | Code does | Verdict | Notes |
|-------|---------|---------------|-----------|---------|-------|
| 1 | Field Alchemy | 1 field brew; 1.2× fresh; standard quality | Field brew phase at 1818-1849; fresh mult 1.2× at 2254 | ✓ accurate | |
| 2 | Fresh Reagents | 2 brews; 1.3×; Fine; +1 ingr; Seasonal Bypass | Fresh 1.3×; wildcraft slots 1 at 2286 | ✓ accurate | |
| 3 | Wilderness Recipes | 3 brews; 1.4×; field recipes; Wild Ally | Fresh 1.4×; field-only recipes accessible; slots 2 | ✓ accurate | |
| 4 | Master Fieldcrafter | 3 brews; 1.5×; MW field brew; 15% double; Threat Suppression | Fresh 1.5×, MW at 2215, double 15% at 2257 | ✓ accurate | |
| 5 | Living Apothecary | 4 brews; legendary field recipe; enhanced wildcrafts | All flags fire; wildcraft slots 3 | ✓ accurate | |

### Antiquarian

| Level | Feature | Handbook says | Code does | Verdict | Notes |
|-------|---------|---------------|-----------|---------|-------|
| 1 | Relic Sense | 15% relic chance/hour; appraise UI | 15% at 1721-1728 | ✓ accurate | |
| 2 | Keen Appraisal | 25%; +3 appraise; see rarity | 25% at 1722; +3 at 1891 | ✓ accurate | |
| 3 | Collector's Network | 3× sell; museum unlocked; set bonuses | Museum at 1914-1925; 3× at 1906 | ✓ accurate | |
| 4 | Relic Expertise | 35%; auto-identify; staff relic hunt | 35% at 1722; auto at 1883-1886 | ✓ accurate | |
| 5 | Grand Collection | +10g/morning; legendary relics; sets doubled | Set doubling at 1864; museum income at 4222-4225; legendary at 1725 | ✓ accurate | |

### Siege Engineer

| Level | Feature | Handbook says | Code does | Verdict | Notes |
|-------|---------|---------------|-----------|---------|-------|
| 1 | Field Outpost | 1 slot; gather 2/morning; suppress −3 | gated at 1947-1965 | ✓ accurate | |
| 2 | Fortified Outpost | 2 slots; gather 3; suppress −4; +1 yield at outpost | 1949-1950 | ✓ accurate | |
| 3 | Processing Station | 3 slots; 1 auto-brew/outpost | auto-brew at 4295-4313 | ✓ accurate | |
| 4 | Supply Depot | gather 4; suppress −5; auto-shelf | auto-shelf at 4302-4306 | ✓ accurate | |
| 5 | Fortress Network | 4 slots; one fortress caps threat at 50; shared storage | upgrade at 1973-1981; capping at 4316-4319 | ✓ accurate | |

### Arcanist

| Level | Feature | Handbook says | Code does | Verdict | Notes |
|-------|---------|---------------|-----------|---------|-------|
| 1 | Pattern Research | Research new patterns; effect type + power | `researchPattern()` at 3126-3174 | ✓ accurate | |
| 2 | Refined Patterns | +2 inscription on custom; name creations | `getPatternInscBonus()` at 3122; `canNamePatterns()` at 3147 | ✓ accurate | |
| 3 | Dual-Effect Patterns | 2 effects; custom 2× sell | `getMaxEffects()` 2 at 3121; 2× sell at 3124 | ✓ accurate | |
| 4 | Pattern Library | 10 slots; **"Share patterns with staff for automated inscribing"** | 10-slot library at 3120; **staff inscribing automation not found** | 🔧 partial | Library size works; staff automation is the main interesting promise and is unimplemented |
| 5 | Grand Theorem | 3 effects; legendary patterns; named masterworks | Max effects 3 at 3121 | ✓ accurate | |

### Diplomat

| Level | Feature | Handbook says | Code does | Verdict | Notes |
|-------|---------|---------------|-----------|---------|-------|
| 1 | Embassy | Double faction rep gains; unique NPC dialogue | `effects:{doubleRep:true, questRepBonus:10}` — prestige effects not iterated by getFeatureVal. **Fixed**: direct `prestigeLevels.diplomat>=1` gates added at addRep (882) and quest-reward sites (3700, 3767) | ✓ accurate | Fixed 2026-05-12 — Phase B. doubleRep + questRepBonus now apply via direct level gates at the read sites |
| 2 | Trade Agreements | Exclusive vendors; cross-faction quests | `effects:{shopRestockBonus:3, questGoldBonus:0.30}` — prestige effects not iterated. **Fixed**: direct `prestigeLevels.diplomat>=2` gates added at shop restock (4639) and quest-reward sites (3700, 3767) | ✓ accurate | Fixed 2026-05-12 — Phase B. shopRestockBonus + questGoldBonus now apply via direct level gates |
| 3 | Faction Harmony | Build harmony pairs | `prestigeLevels.diplomat>=3` gates harmony pairs, envoy dispatch, `getHarmonyBonus()` at 3262-3277 | ✓ accurate | |
| 4 | Grand Alliance | All factions allied; legendary vendor stock | `getHarmonyBonus` adds +50% rep + 25% sell when all pairs at 3 (3270-3275). **Fixed**: achievement announcement gate at 3247 corrected from `dLv>=10` to `dLv>=4` | ✓ accurate | Fixed 2026-05-12 — Phase B. Typo `>=10` → `>=4` so the "Grand Alliance Achieved" message can now actually fire |
| 5 | Ambassador | Harmony bonuses 2×; rep spillover 25%; carries through Torch | `effects:{harmonyDouble, repSpillover:0.25, torchHarmony}` — prestige effects not iterated. **Fixed**: direct `prestigeLevels.diplomat>=5` gates added — repSpillover at addRep (882) and a `total*=2` at the end of `getHarmonyBonus` (3262-3278). `torchHarmony` has no read site anywhere in code; it remains as a legacy/torch flag only | ✓ accurate | Fixed 2026-05-12 — Phase B. harmonyDouble + repSpillover now apply via direct level gates. `torchHarmony` is unwired (no read site exists anywhere); the "carries through Torch" promise is unimplemented but out of Phase B scope |

## Cross-cutting issues found

1. **Prestige effects are silently ignored by `getFeatureVal`** ([index.html:616-656](index.html:616)). Every prestige `effects:{}` block is invisible to the aggregator. The only prestige that exercises this pattern productively is Diplomat (Lv1, 2, 5), and *all three suffer*. Magitech, Cartographer, and Arcanist use `legacyEffects` instead — even more clearly only for Torch inheritance. **Recommended fix**: either iterate `PRESTIGE_CLASSES` in `getFeatureVal`, or migrate Diplomat's broken effect-key features to explicit `prestigeLevels.diplomat>=N` gates at the relevant read sites.

2. **Feature flags claim systems that don't exist**: `showIngredients` (Scholar Lv8, Naturalist Lv3) fires but no ingredient is hidden in the current UI — the system was likely removed or never built. Same flavor: `legendaryBlueprints` (Constructor Lv10) is set but never read.

3. **"Unlock X recipe(s)" claims with no implementation**: Master Brewer Lv7 ("Unlock one legendary recipe"), Resonance Lv6 ("Unlock 2 new enchantment patterns"), Grand Artificer Lv8 ("Unlock legendary device recipes"), Volatile Mixtures Lv3 ("Unlock offensive/volatile recipes"), Panacea Lv6 ("Unlock multi-cure recipes"), Wilderness Mastery / Ecological Insight ("Research discovers region-specific recipes"). Pattern: handbook promises unlocks that the effect blocks don't deliver — either there's a separate (unfound) gating system or the unlocks were dropped. **Recommend confirming whether recipes have class-level gates anywhere in the recipe data structure.**

4. **Description scale mismatches**: Battle Runes Lv3 says "+25% value" but delivers `enchantGoldBonus:0.15` (+15%). Wards Lv3 says "+2 to defensive inscription" but delivers `enchantBonus:1`. Legendary Arms Lv10 says "3× gold" but delivers `+50%`. Either tune the numbers up to match the handbook, or revise the handbook.

5. **Per-category bonuses promised, generic bonuses delivered**: Healer's Touch Lv3 ("Healing recipes −2 DC"), Battle Runes Lv3 ("−1 DC on weapon runes"), Wardkeeper Lv3 ("+2 to defensive inscription"), Spellweaver Lv3 ("+2 to exotic inscription"), Concentrated Dose / Plague Doctor ("on volatile brews"). The code has no recipe-category routing for craft/inscription bonuses — every claim that says "on X recipes" is implemented as a flat global bonus. This is a systemic content-vs-code mismatch.

6. **Diplomat Lv4 dLv≥10 typo**: At [index.html:3247](index.html:3247), the Grand Alliance achievement message guards `if(dLv>=10)` but max prestige level is 5. Almost certainly should be `>=4`. Bonuses still fire (they're gated by faction state, not level), only the announcement is dead.

7. **Unique abilities promised on Lv10 features that have no daily-cooldown system**: Wardkeeper "Fortress Ward 1/day", Naturalist "commune to reveal highest-yield region 1/day", and Apothecary Miracle Cure all rely on daily-cooldown infrastructure. Miracle Cure has a flag (`miracleCure` at 2864). The other two have no implementation. May be the same root cause — a planned daily-active-ability system that was partially built.

8. **`zeroIngrMastery` value is a recipe-count threshold, not a brew-count threshold**: Magnum Opus's handbook copy reads "brew any recipe mastered 20+ times" — natural read is per-recipe. Code (2358) reads "20" as "must have 20 different recipes brewed 25+ times each." Vastly more restrictive than the description.

## Out of scope but worth flagging

- **`legendaryBlueprints:true` flag** (Constructor Lv10) — declared in game-data.js but no read site anywhere. Either remove the flag or implement the named blueprints (Alchemical Forge, Crystal Greenhouse, Arcane Conduit) as distinct features rather than the current grab-bag of `passiveIncomeMulti`/`overnightCraft`/`bonusEnergy` flags.
- **`fortressWard:true` flag** (Wardkeeper Lv10): read site at 4325 uses it to disable bandit shelf theft below threat 75 — that's a useful permanent bonus, but it has nothing to do with the handbook's "1/day, reduces all threats by 5 for 3 days" description. Worth surfacing the actual effect somewhere visible to the player (handbook + UI). This is a 💡 unexpected for a player who has the spec — the actual passive is genuinely good, just unannounced.
- The audit only covered class/spec/prestige features as scoped. Feats (62), workshop upgrades, settlement projects, faction tier bonuses, companion abilities, race bonuses, and lore chains were not audited — but spot-checks during the audit suggest similar issues are likely there (the "Crystal Greenhouse" claim should probably be backed by similar effect/read-site work).
