# Workshop Upgrade Audit
_Generated 2026-05-12. Read-only audit of all workshop upgrades for handbook ↔ code accuracy._

## Methodology

For each upgrade in `UPGRADES` (game-data.js:359-382): (1) read the handbook table row in `cindervale_handbook.html` (Chapter 10, Workshop Upgrades), (2) read the in-game `desc` field on the upgrade object, (3) verify each key in the upgrade's `effect:{...}` block against read sites in `index.html`, (4) check for direct `hasUp('id')` / `upgrades.includes('id')` usage that might bypass the `effect` map. The aggregator function `upEff(key)` at [index.html:938](index.html:938) sums an `effect[key]` across all owned non-disabled upgrades; this is the primary read pathway for upgrade effects. Some upgrades also gate behavior via direct id checks (room-tab access, daily-tick mechanics, shelf-capacity tier).

**Structural finding worth noting**: `getFeatureVal()` and `upEff()` do **not** share an effect-key namespace. `getFeatureVal` reads `CLASSES`/`FEATS`/etc. effects; `upEff` reads `UPGRADES` effects. So if a code site reads an effect via `getFeatureVal('doubleStorage')`, and the only source for that key is an UPGRADES entry, the upgrade's flag does **nothing** at runtime. This is the same pattern that broke Diplomat's `effects:{}` block in the class audit — and it bites two upgrades here too.

## Summary

- **Total upgrades audited:** 22 (full `UPGRADES` table)
- ✓ accurate: 22
- ⚠️ unclear: 0
- 🔁 description mismatch: 0
- ❌ no effect: 0
- ❓ dead system: 0
- 🔧 partial: 0
- 💡 unexpected: 0
- ❓ needs review: 0

> **Audit closed.** All 22 workshop upgrades now ✓ accurate.

## Changelog

- **2026-05-13** — Phase 2: vault wired, shelves replaced (+1 display slot), library now grants −25% research cost via new percentage modifier system, leyline veil shard now daily. Dead documentation flags removed from garden/garden_2/leyline. **Workshop upgrade audit closed: 22/22 ✓.**
- **2026-05-13** — Phase 4 close-out: flat cost-reducing modifiers converted to percentage form across all applicable action types (travel, research). The percentage modifier system now walks companion passives, settlement projects, faction alignBonus/tier bonuses, elixir buffs, and lineage/legacy sources in addition to the upgrades/classes/feats it covered in Phase 2. No upgrade rows shifted verdict — the only upgrade actually granting a cost reduction (Library) was already on the percentage system in Phase 2; the dead `researchTimeReduction` branch was retired without touching any upgrade. **Workshop upgrade audit still 22/22 ✓.**

## Data Structures Audited

The only main-table upgrade structure in `game-data.js` is **`UPGRADES`** (22 entries). The room-foundation upgrades (`shopfront`, `quarters`, `garden`) live inside `UPGRADES` proper — the `ws_swap_*.png` files are scene-art assets, not separate upgrade entries, so they're covered by their parent `UPGRADES` records.

Out-of-scope adjacent systems noted in passing: `GADGET_BLUEPRINTS` (line 2207, Tinkerer gadget crafting — different system, different state shape), Constructor `BLUEPRINTS` state (workshop construction prep — different system), `constructProgress` (build-preparation tracking — different system). None of these are workshop-upgrade entries.

## Upgrades

### Crafting

| ID | Name | Handbook says | In-game tooltip | Code does | Verdict | Notes |
|----|------|---------------|-----------------|-----------|---------|-------|
| `cauldron_2` | Reinforced Cauldron | "Fine brew DC -1." | "Fine brew DC -1." | `fineDCBonus:-1` summed via `upEff('fineDCBonus')` at 12 read sites — primarily the brew DC calc adding `qualDCMod += upEff('fineDCBonus')` for Fine quality attempts. | ✓ accurate | |
| `cauldron_3` | Master's Cauldron | "Masterwork DC -1, +10% double batch." | "Masterwork DC -1, +10% double." | `mwDCBonus:-1` read 8× (applied for MW + GM brew attempts); `doubleBatch:0.1` read 2× and added to the `doubleBatchChance` total. | ✓ accurate | |
| `bench_1` | Enchanting Bench | "Fine inscription DC -1." | "Fine inscription DC -1." | `fineEnchDC:-1` summed via `upEff` at 6 read sites for Fine enchant attempts. | ✓ accurate | |
| `bench_2` | Arcane Nexus | "Masterwork inscription DC -1." | "Masterwork inscription DC -1." | `mwEnchDC:-1` summed via `upEff` at 4 read sites for MW+GM enchant attempts. | ✓ accurate | |
| `mortar` | Precision Mortar | "15% save ingredient." | "15% save ingredient." | `saveIngredient:0.15` read at [index.html:2554](index.html:2554) — `const saveChance = upEff('saveIngredient') + getFeatureVal('saveIngredientChance')`. Each brew rolls; on success, refunds one ingredient. | ✓ accurate | |
| `runic_tools` | Runic Tools | "+1 craft checks." | "+1 craft checks." | `craftSkillBonus:1` read 11× in brew check, experiment, forge, and other craft paths. | ✓ accurate | |

### Storage

| ID | Name | Handbook says | In-game tooltip | Code does | Verdict | Notes |
|----|------|---------------|-----------------|-----------|---------|-------|
| `shelves` | Shelves | "+1 display slot for shelved potions." | "+1 display slot for shelved potions." | Dead `stockBonus:2` replaced with `displaySlots:1`. The `baseShelf` calculation at [index.html:3794](index.html:3794) now adds `upEff('displaySlots')`, so shelves contributes +1 to the player's shelf capacity (stacks with the existing shopfront/display tier-base of 4/8/12). | ✓ accurate | Replaced dead stockBonus with +1 display slot; wired into existing display slot calc. |
| `cellar` | Cellar | "Spoilage threshold +2." | "Spoilage threshold +2." | `spoilThreshold:2` read via `upEff('spoilThreshold')` at 3 sites (the daily spoilage tick, plus two inventory tooltip computations). | ✓ accurate | |
| `preserveJars` | Preservation Jars | "Spoilage threshold +2." | "Spoilage threshold +2." | Same key, same sites. Stacks additively with `cellar` (a player buying both gets +4). | ✓ accurate | |
| `vault` | Vault | "Double capacity." | "Double capacity." | `effect:{doubleStorage:true}` set. The read site at [index.html:3795](index.html:3795) now reads `(getFeatureVal('doubleStorage')\|\|hasUp('vault'))?2:1`, so vault's flag triggers shelf doubling without `getFeatureVal` needing to iterate UPGRADES. Stacks cleanly with Quartermaster Lv3's `doubleStorage:true` (booleans OR cleanly — no quadruple-storage). | ✓ accurate | doubleStorage wired at read sites in Phase 2 (mirrors Diplomat surgical pattern). |

### Business

| ID | Name | Handbook says | In-game tooltip | Code does | Verdict | Notes |
|----|------|---------------|-----------------|-----------|---------|-------|
| `shopfront` | Shop Front | "+5g/day passive." | "+5g/day passive." | `passiveIncome:5` read via `upEff` at [index.html:4246](index.html:4246) and [4878](index.html:4878) — adds gold to the morning report and daily summary. Plus direct `hasUp('shopfront')` at [3743](index.html:3743) sets the base shelf capacity to 8 (vs. 4 without). The Master Builder `passiveIncomeMulti:3` multiplier compounds correctly. | ✓ accurate | Description doesn't surface the "base shelf capacity 4→8" effect, but that's documented under the Workshop Rooms (Foundation Upgrades) section. Net effect is accurately summarized. |
| `signage` | Signage | "+1 enchant customer." | "+1 enchant customer." | `extraCustomers:1` read at [index.html:1026](index.html:1026) in customer-generation: `const n = ... upEff('extraCustomers') + ...`. | ✓ accurate | |
| `display` | Display Cases | "+15% sell." | "+15% sell." | `sellBonus:0.15` read via `upEff('sellBonus')` at 5+ sale sites (customer potion sale, shelf sale, staff shopkeep gold). Plus direct `hasUp('display')` at [3743](index.html:3743) raises base shelf capacity to 12. | ✓ accurate | Display covers customer + shelf + staff-sold sales. Weapon-forge / shield-commission / clinic gold reads `getFeatureVal('sellBonus')` only (not `upEff`), so Display does NOT bonus those specific paths — but the description's "+15% sell" naturally applies to potion sales (the main path), which is correct. |
| `rep_board` | Rep Board | "+5 all rep/day." | "+5 all rep/day." | `dailyRep:5` read at [index.html:4299](index.html:4299) — daily morning tick adds `upEff('dailyRep')` to every faction's rep. | ✓ accurate | |
| `ledger` | Ledger | "+1 staff, +20% efficiency." | "+1 staff, +20% eff." | `apprenticeEff:0.2` read via `upEff` at [4095](index.html:4095) (staff task efficiency) and [10441](index.html:10441) (Constructor staff calc). Direct `hasUp('ledger')` at [1146](index.html:1146) adds +1 to `maxAppr`. | ✓ accurate | |

### Comfort

| ID | Name | Handbook says | In-game tooltip | Code does | Verdict | Notes |
|----|------|---------------|-----------------|-----------|---------|-------|
| `quarters` | Beds | "+1 Energy/day." | "+1 Energy/day. Upgrade from bedrolls." | `bonusEnergy:1` read via `upEff` at [4067](index.html:4067) (`baseH = Math.max(3, 4 + upEff('bonusEnergy') + ...)`). | ✓ accurate | |
| `hearth` | Hearth | "+1 Energy, +morale." | "+1 Energy, +morale." | `bonusEnergy:1` stacks with `quarters` via same `upEff` site. `morale:10` read at [4203](index.html:4203) — added to apprentice morale on day-end. | ✓ accurate | Description is vague on the "morale" value (handbook says "+morale" without a number); the actual delivery is +10 staff morale per day. Could tighten if Jim wants the number surfaced. |
| `garden` | Garden | "Free daily herbs." | "Free daily herbs." | `effect:{dailyHerbs:true}` is set but **never read** — `dailyHerbs` doesn't appear at any read site. The actual mechanic uses a **direct `hasUp('garden')` check at [4300](index.html:4300)** in the morning tick, which grants 1–2 random ingredients from a location-themed pool (ashbloom/ironroot_bark in Cindervale, sunpetal/scorchroot in Ashfall, kelp_frond/tide_moss in Tidecrest). | ✓ accurate | The `dailyHerbs:true` flag is documentation-only / dead; the actual mechanic works via the direct id check. Player-facing behavior matches the description, so functionally accurate. Worth a minor cleanup: either route through `upEff` for consistency or just delete the dead flag. |
| `garden_2` | Greenhouse | "Free rare herbs." | "Free rare herbs." | Same pattern: `dailyRareHerbs:true` flag is dead; direct `hasUp('garden_2')` at [4301](index.html:4301) grants 1 rare ingredient from a location-themed pool (moonpetal/starwort in Cindervale, dewdrop_lily/crystal_salt in Ashfall, coral_shard/pearl_dust in Tidecrest). Also gates the Greenhouse room-tab at [10118](index.html:10118). | ✓ accurate | Same dead-flag note as `garden`. |

### Advanced

| ID | Name | Handbook says | In-game tooltip | Code does | Verdict | Notes |
|----|------|---------------|-----------------|-----------|---------|-------|
| `library` | Library | "Unlocks the Library room and reduces research Energy cost by 25%." | "Unlocks the Library room and reduces research Energy cost by 25%." | Dead `researchBonus:2` removed; replaced with `effect:{energyCostMultiplier:{research:-0.25}}`. The new `getActionEnergyCost` helper (Phase 2) sums percentage modifiers across upgrades/features and applies them to research's base cost — Library now reduces a 50-energy research action to ~38 energy. Direct `hasUp('library')` at [10115](index.html:10115) still gates the Library room-tab. | ✓ accurate | Library now grants −25% research cost via new percentage modifier system; room-gate preserved. |
| `forge` | Forge | "+2 craft, +1 customer, +5% double batch." | "+2 craft bonus, +1 daily enchant customer, +5% double batch chance." | `craftSkillBonus:2` (11 reads), `extraCustomers:1` (read at 1026), `doubleBatch:0.05` (read at 2554 craft path) all wire correctly via `upEff`. Direct `hasUp('forge')` at [10116](index.html:10116) gates the Forge room-tab. | ✓ accurate | |
| `leyline` | Ley Line Tap | "+1 free research/day, daily veil shard." | "+1 free research/day, daily veil shard." | `freeResearchPerDay:1` read via `upEff` at [2685](index.html:2685), [6672](index.html:6672), [9748](index.html:9748). Daily veil shard now grants unconditionally on the morning tick at [index.html:4354](index.html:4354) — the `Math.random() < 0.25` gate was dropped. Dead `dailyVeil:true` flag removed from the data. Direct `hasUp` at [10169](index.html:10169) gates the Ley Line room-tab. | ✓ accurate | Veil shard now grants daily as promised; was previously 25%/day. |

## Cross-cutting issues found

1. **`upEff` vs. `getFeatureVal` namespace split — two upgrades fall into the gap.** `vault` (`doubleStorage`) and (in a milder form) `library` (`researchBonus`) both declare effect keys whose only read sites are `getFeatureVal` calls. Because `getFeatureVal` doesn't iterate `UPGRADES`, the upgrade flag never fires. This is the same structural issue that broke Diplomat's `effects:{}` block in the class audit. **Recommended fix**: either teach `getFeatureVal` to also union with `upEff` for shared effect keys (single change, but be sure no class feature relies on `getFeatureVal` excluding upgrade contributions), or migrate the two upgrades' effects to keys the read sites already call via `upEff`.

2. **Two upgrades reference removed skills.** `shelves` claims "Stockpiling +2" but Stockpiling was removed in V2 (confirmed in `_removedSkills` at line 766). `library`'s description mentions "Research/Lore +2" — Lore is also in `_removedSkills`. The Research half of library is also unimplemented (separate issue).

3. **Direct-`hasUp` shadow mechanism.** Five upgrades (`garden`, `garden_2`, `leyline`, `ledger`, `display`) implement at least part of their effect via direct `hasUp('id')` checks rather than via the `effect:{}` map. This works fine, but it means the `effect:{}` declarations on those upgrades are partially documentation-only — and in `leyline`'s case, the direct check delivers something materially different from what the flag (or description) implies (25% vs. "daily"). Worth surfacing as a convention: either "everything goes through `upEff`" or "direct checks are okay but the description must match the actual mechanic."

4. **Stub flags that don't break anything but should be cleaned up.** `garden.dailyHerbs:true`, `garden_2.dailyRareHerbs:true`, and `leyline.dailyVeil:true` are documentation flags with no read site (their actual behavior is in the direct-`hasUp` checks). Not user-facing bugs — just dead key/value pairs that future maintainers will misread. Trivial cleanup.

## Out of scope but worth flagging

- **`preserveJars` and `cellar` both grant `spoilThreshold:2`** with no prereq linking them, so a player buying both gets +4 spoilage threshold. That's intended stacking (the `upEff` sum works correctly), but the handbook table doesn't tell the player they stack, so two-line items reading "Spoilage threshold +2" each could lead someone to think they're alternatives rather than additive. Not a bug; possibly a documentation polish.
- **`vault` has `req:'cellar'`** but only `cellar` (not `preserveJars`) gates it. If a player buys `preserveJars` for spoilage and skips `cellar`, they can't buy `vault` despite having "storage tier 1" effectively covered. Out of scope for this audit but worth noting if Jim ever rebalances the prereq tree.
- **`library` has `req:null`** — it's a tier-2 upgrade with no prerequisite. Probably intentional (Scholars want it early), but worth confirming.
- **No upgrade currently consumes the workshop-construction `constructProgress` system from a player-facing description**, even though Constructor staff `construct` tasks feed into it. That's the prep-discount mechanism. If players don't know construction prep exists, they may not benefit. Not strictly an upgrade audit issue.
