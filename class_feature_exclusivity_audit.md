# Class Feature Exclusivity Audit

_Generated 2026-05-13. Read-only audit of all 140 class/spec/prestige features for **exclusivity** — does each feature give the character something they wouldn't have without it?_

_Updated 2026-05-13 (close-out pass): Cartographer L3, Diplomat L1, Diplomat L2 redesigned to flip from 🔓 partial → 🔓 exclusive. Antiquarian L2 investigation confirmed exclusive. **Diplomat L4 (Grand Alliance) legendary vendor stock built** — closes the last partial feature. **Audit closed: 140/140 🔓 exclusive.**_

This audit is a methodology supplement to `class_feature_audit.md`, which verified handbook ↔ code accuracy but not whether the feature's described benefit is **gated** to feature-owners (the "unique to me" property a player expects from a class pick). All 140 features stay at their existing accuracy verdict; this audit layers a parallel exclusivity verdict on top.

## Summary

- **Total features audited:** 140
- 🔓 exclusive: **140** (✓ closed)
- 🔓 partial: **0**
- 🔄 redundant: **0**
- ❓ needs verification: **0**

> **Audit closed.** All 140 class/spec/prestige features now both **✓ accurate** and **🔓 exclusive** — every feature gives its owner a benefit that non-owners genuinely don't get.

**The audit is fundamentally healthy.** The vast majority of class features are exclusive by construction — they grant stat bonuses, unlock new actions, install new daily mechanics, or otherwise give the owner something a non-owner can't get. The original accuracy-pass cleanup (Phases A-D, the dead-flag sweep) caught the worst offenders during accuracy work; this audit found only 3 genuine partial-redundancies and 2 cases needing in-game verification.

Notably: **zero features are fully redundant.** Even the most ambiguous cases (Cartographer's Insight, Diplomat Embassy) deliver some genuinely exclusive benefit alongside the redundant half.

## Resolved on 2026-05-13 (redesigned to exclusive)

### Cartographer L3 — Cartographer's Insight → 🔓 exclusive

**Original partial finding:** Tile ingredient preview was redundant (same info one click away in detail panel and zone popup); only +10% XP was exclusive.

**Resolution:** Added **Familiar Territory** mechanic — forage checks at regions visited 5+ times get −1 DC (gated on `prestigeLevels.cartographer>=3` AND `regionVisits[reg.id]>=5`). New `regionVisits` state introduced, persisted via gatherState/restoreState, incremented in `doHarvest` on expedition entry, read in `_executeForageRoll`. Tile ingredient preview retained as a secondary affordance, now honestly described as a convenience. Description rewritten to lead with Familiar Territory as the exclusive benefit.

**New exclusive mechanics:**
- −1 forage DC at well-trodden regions (depth-rewarding, fits cartography theme)
- +10% XP from all sources (unchanged)
- Tile ingredient preview (now framed honestly as a UX shortcut, not the headline benefit)

---

### Diplomat L1 — Embassy → 🔓 exclusive

**Original partial finding:** "Unique NPC dialogue" claim had no code path; only doubleRep + questRepBonus were exclusive.

**Resolution:** Added **passive embassy rep tick** — each morning, every faction at Friendly+ (rep ≥ 150) gains +1 reputation, gated on `prestigeLevels.diplomat>=1`. Wired in `newDay` with a new 🤝 Embassy Network section in the morning report. Description rewritten to drop the unimplemented dialogue claim; passive rep replaces it.

**New exclusive mechanics:**
- +1 daily rep at each Friendly+ faction (passive diplomatic infrastructure)
- doubleRep (unchanged)
- questRepBonus:10 (unchanged)

---

### Diplomat L2 — Trade Agreements → 🔓 exclusive

**Original partial finding:** "Exclusive faction vendors" and "cross-faction quests" claims had no code path; only shopRestockBonus + questGoldBonus were exclusive.

**Resolution:** Added **faction-signature restock** — each day, the shop's procureItems list now includes one signature ingredient (FACTIONS[fid].res) from a random Friendly+ faction, on top of the standard +3 restock slots. Gated on `prestigeLevels.diplomat>=2`. Uses existing faction data (each faction's `res` field — `sand_merchant_seal`, `diver_token`, etc.). Description rewritten to drop "exclusive vendors" and "cross-faction quests" framings; the daily faction-signature ingredient replaces both claims.

**New exclusive mechanics:**
- Daily faction-signature ingredient in shop restock
- shopRestockBonus:3 (unchanged)
- questGoldBonus:0.30 (unchanged)

### Diplomat L4 — Grand Alliance → 🔓 exclusive (redesigned 2026-05-13)

**Original partial finding:** "Legendary vendor stock" claim had no code path; only the +50% rep / +25% sell from `getHarmonyBonus` were exclusive.

**Resolution:** Built the **legendary shop stock** mechanic per Jim's design call. New `grandAllianceLegendaryStock:true` flag; `restockShop` now appends one random `val>=25` ingredient to `procureItems` when `prestigeLevels.diplomat>=4` AND `FACTION_PAIRS.filter(fp=>(!fp.loc||fp.loc===gameLocation)).every(fp=>(factionHarmony[fp.id]||0)>=3)` — same allMax check the existing `getHarmonyBonus` already uses. Pricing: `Math.ceil(val * 2.0)` (double base value). Pool: ~20 legendary ingredients across all 4 locations' endgame zones (Heartforge Rim, Buried Temple, Drowned Sanctum, Observatory Summit). Dedup against base shop + existing procList prevents duplicates. Wired right after the Diplomat L2 faction-restock block so L2 + L4 stack additively (L2 player gets faction-signature item; L4 player gets that PLUS a legendary item).

**New exclusive mechanic:**
- Daily legendary-tier ingredient in shop restock (when all harmony pairs maxed)
- +50% rep / +25% sell from `getHarmonyBonus` (unchanged)

## Resolved on 2026-05-13 (verification: exclusive)

### Antiquarian L2 — Keen Appraisal → 🔓 exclusive

**Investigation result:** Confirmed exclusive at `index.html:9777`:
```jsx
<span>{cat?.icon||'❔'} Mystery Object {aqLv>=2?<span ...>({relic.rarity})</span>:''} ...</span>
```
The rarity tag on UNAPPRAISED relics is gated specifically on `aqLv>=2`. Antiquarian L1 players see "Mystery Object"; Antiquarian L2 players see "Mystery Object (rare)" before appraising. The pre-appraisal rarity peek is the genuinely exclusive benefit. No action needed.

## Patterns / Cross-Cutting Issues

1. **"Information visibility" features are inherently exclusivity-fragile.** Three of the five flagged features (Cartographer L3, Diplomat L1 dialogue claim, Diplomat L2 "exclusive vendors") describe something *visible* that isn't actually gated in the UI, or is shadowed by a universal display path. **High-risk pattern**: any time a feature description uses words like "see," "show," "reveal," or names a UI element ("vendor," "dialogue"), audit the UI code path — does removing the feature flag remove the visibility, or does the info appear anyway via a different code path?
2. **"Flavor-mechanic" overpromising.** Both Diplomat L1 and L2 describe features as having narrative/social benefits ("unique dialogue," "cross-faction quests," "exclusive vendors") that the underlying mechanics — flat rep multipliers and shop restock bonuses — don't actually deliver. The pattern: handbook copy reaches for flavor that the code can't back up. Description trims are the conservative fix; building actual gated content is the design-expansion fix.
3. **The original accuracy pass mostly cleaned this up.** Phase A's description-trim work (24 features) caught most "claims X mechanic that doesn't exist" cases. The handful that remained — Cartographer L3 (added in Phase D, not subject to the Phase A sweep), Diplomat L1/L2 (description survived Phase B's structural fixes because they involved real wiring, not the description-mismatch path) — were exactly the kind that slip through code-focused audits.
4. **Most "see/show/reveal" features are exclusive.** showRecipeInfo (Scholar L4), experimentHints (Scholar L6), showCustHints (Enchanter L4), revealHighestYieldRegion (Naturalist L10) — verified via code grep. All four are properly gated; non-owners genuinely see less information. The pattern that worked: each is a *new visibility surface* (information not shown anywhere by default), rather than a *shortcut to existing universal info* (Cartographer L3's failure mode).
5. **No daily-cooldown abilities turned up redundant.** Scholar L10 publish, Wardkeeper L10 fortressWard, Apothecary L10 Miracle Cure, Wildcrafter Lv2+ wildcrafts, Sentinel Eternal Vigil preemptive strike, Apex Predator solo expedition, etc. — every "1/day" or "unlocks system X" mechanic gates the entire system behind the feature flag. Healthy.

## Spot Notes on Feats and Workshop Upgrades

Per the spec, feats (60) and workshop upgrades (22) were not deep-audited. During the class-feature work I spot-checked a few that seemed risky.

**Feats:**
- Lucky Find (+5% bonus rare per forage roll), Talent Scout (+2 hire candidates + +2 to highest stat), Master Trainer (apprentices gain 2× XP) — all exclusive by construction; the displayed effect only fires for owners.
- The "show/see" feats class is small — `showRecipeInfo`/`showCustHints`/etc. are class features, not feats. No feat surface for redundancy.
- **`Companion Handler`** (companions +50% effective, gain loyalty 2× faster, +15% encounter): companions only exist if the player is Ranger spec (which has its own mechanics). So Companion Handler benefit is genuinely exclusive — non-Rangers can't pick the feat usefully, but that's a *prerequisite* issue, not redundancy. Healthy.

**Workshop upgrades:**
- All 22 upgrades grant either stat bonuses (`bonusEnergy`, `shelfCapBonus`), structural unlocks (Library room access, Ley Line freeResearch slot), or mechanics (vault doubleStorage). None describe "information visibility" or "UI affordance" — the surface most prone to redundancy. Healthy.
- One borderline: **Library** ("unlocks the Library room and reduces research Energy cost by 25%"). The room itself is gated, but the +25% research reduction stacks with other research-cost reducers (Academy settlement, Scholar specs). Functionally fine; the stacking is intentional per Phase 2.

Nothing flagged for follow-up in either category.

## Changelog

- **2026-05-13** — Fresh exclusivity audit, all 140 features reviewed. 135 ✓ exclusive / 3 🔓 partial / 0 🔄 redundant / 2 ❓ needs verification. **Top concerns: Cartographer L3 inline ingredient preview is shadowed by the always-visible detail-panel ingredient list; Diplomat L1 "unique dialogue" and L2 "exclusive vendors / cross-faction quests" claim mechanics that don't exist in code.** Two cases need in-game verification (Antiquarian L2 "see rarity," Diplomat L4 "legendary items").
- **2026-05-13** — Exclusivity audit follow-up. Cartographer L3, Diplomat L1, and Diplomat L2 redesigned to grant exclusive mechanics replacing aspirational/redundant descriptions: Familiar Territory (−1 DC at 5+-visited regions), passive embassy rep tick, daily faction-signature restock. Antiquarian L2 investigated and confirmed exclusive (rarity peek gated on aqLv>=2). Diplomat L4 investigated and demoted to 🔓 partial (no harmony-gated legendary stock mechanism exists) — flagged for Jim's decision. Counts: 138 ✓ exclusive / 1 🔓 partial / 0 🔄 redundant / 0 ❓ needs verification.
- **2026-05-13** — Diplomat L4 (Grand Alliance) legendary vendor stock mechanic built. All harmonies maxed → daily shop restock includes a legendary-tier ingredient (`val>=25` at 2× base price). Closes the last partial feature from the exclusivity audit. **Class feature work fully closed: 140/140 ✓ accurate AND 140/140 🔓 exclusive.**
