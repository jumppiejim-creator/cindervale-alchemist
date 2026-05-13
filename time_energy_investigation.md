# Time/Energy System Investigation

_Generated 2026-05-12. Read-only mapping of the current time/energy mechanics ahead of a potential refactor to a continuous energy resolution._

> **Headline finding**: `hours` and `energy` are the **same variable**. The internal name is `hours` (React state, integer). The player-facing label is "Energy" with a ⚡ icon. There is no separate `energy` state anywhere in `index.html` or `game-data.js`. The ⚡ icon in the header bar (`🌙 Rest (⚡{hours})`) literally interpolates the `hours` integer — so the icon is misleading only in that "Energy" and "hours" are the same number under two names.

## 1. Variable Inventory

### Primary
| Name | Type | Scope | Default | Mutated at | Read at | Notes |
|------|------|-------|---------|-----------|---------|-------|
| `hours` | integer | React state, save-persisted | `4` | [index.html:341, 778, 906, 1505, 2135, 2583, 2776, 2885, 3319, 3832, 3898, 4068, 5464, 5469, 7985, ...] | dozens of read sites — see Section 3 | The single resource governing daily action capacity. The variable is named "hours" but the UI shows "⚡ Energy". 1 hour = 1 energy by convention; an action that "costs 1 hour" and one that "costs 1 energy" are the same thing. |

### Day cadence
| Name | Type | Scope | Default | Mutated at | Read at | Notes |
|------|------|-------|---------|-----------|---------|-------|
| `day` | integer | React state, save-persisted | `1` | [index.html:341, 778, 906, 4068] | many | Increments by 1 each newDay(). |
| `dayFlags` | string[] | React state, save-persisted | `[]` | [557, 786, 1820, 2308, 2370, 2465, 2512, 2537, 2538, 2690, 2774, 2875, 2885, 3075, 3354, 3657, 4839, 5431, 5474, 8111, 8804, 10374] | many | Per-day boolean-flag tokens (e.g. `'first_brew_used'`, `'free_research_used'`, `'craft_rerolled'`, `'dual_inscribed'`, `'envoy_sent'`, `'forge_used'`, `'solo_exp_used'`, plus weather tokens `'clear_sky'`, `'ash_storm'`, `'bargain_day'`). Reset on newDay at [4839] to a fresh `newFlags=[]` (only weather/event flags carry forward into the new day). |
| `infusionsUsedToday` | integer | React state, save-persisted | `0` | [360, 2553, 4065, 2920] | [2446, 9606] | Per-day counter of Spellbrewer infusions consumed. Reset at [4065] in newDay. |
| `wildcraftsUsedToday` | integer | React state, save-persisted | `0` | [362, 4065] | (Wildcrafter daily-budget check) | Per-day counter of Wildcrafter wildcrafts consumed. Reset at [4065]. |

### Derived / computed (NOT stored)
| Name | Computed where | Inputs | Purpose |
|------|---------------|--------|---------|
| `baseH` | [index.html:4067] | `4 + upEff('bonusEnergy') + getFeatureVal('bonusEnergyPerDay') + getFeatureVal('bonusEnergy') + conduitE + enduranceBonus + (getFeatureVal('freeAction')?1:0) - injPen`, floor of 3 | The starting hours value at newDay(). |
| `info.travelTime` / `info.gatherHours` | [index.html:1466-1478] `getExpeditionInfo(reg)` | `reg.time`, `getFeatureVal('travelReduction')`, `dayFlags` (trailblazer_tonic, ash_storm), `getFeatureVal('weatherReduction')`, seasonal `travelMod` | Travel cost (consumed at forage start) and remaining gather hours. |
| `freeResPerDay` | [index.html:2685, 6672, 9748] | `getFeatureVal('freeResearchPerDay') + upEff('freeResearchPerDay') + getFeatureVal('researchSlotBonus')` | How many free research actions are allowed today. Compared against `dayFlags.filter(f=>f==='free_research_used').length`. |

### Not-quite-time but adjacent
- `injuryPenalty` ([4064]) — temporary numeric subtraction from `baseH` on the day after a staff/expedition injury. Cleared after applying.
- `lastCheck` — UI-only state for the last d20 roll display. Not time-related.

## 2. Daily Cycle Mechanics

### What triggers a new day
- **Player-driven only.** Rest button (header bar [index.html:6517] → `setConfirmRest(true)` → confirmation card → "Yes, Rest" calls `newDay()` at [6705]).
- A "Rest & Night Forage" branch ([6704]) defers the newDay() call until after a night expedition; same end result.
- Foraging consumes all remaining hours but does **not** auto-trigger newDay — the player has to press Rest after a forage trip too.
- No automatic / scripted day advancement. There's no "out of time, day ends" path.

### What resets at day-start (`newDay()` at [4061-4845])
1. `hours` ← `baseH` (recomputed each newDay, see Section 4 for the modifier sources).
2. `day` ← `day + 1`.
3. `infusionsUsedToday` ← `0`, `wildcraftsUsedToday` ← `0`.
4. `injuryPenalty` ← `0` (after being applied to `baseH`).
5. `dayFlags` ← fresh `newFlags` array (only weather/event flags survive into the new day).
6. Many other systems tick: staff tasks resolve, payroll/upkeep deducted, shelf sales process, threats grow, brand orders generate, settlement construction progresses, Hollow March waves advance, etc.

### Rest action behavior
The Rest button is the **only** way to advance the day. It calls `newDay()` which executes the entire end-of-day pipeline. Mechanically:
- Player confirms intent (modal at [6655]).
- Unused `hours` are discarded — there is no "carry over" mechanic.
- If `nightExpeditions` feature is active (Sentinel Lv3+), a "Rest & Night Forage" option appears; that path runs a special expedition with bonus hours/danger BEFORE newDay() fires.

### Multi-day actions
Several systems track multi-day progress in **separate state**, not in `hours`:
- `constructProgress: {upgradeId: percent}` — workshop upgrade construction prep (Constructor staff `construct` task). Progresses overnight when staff work on it; once 100%, the upgrade is built at a 40% gold discount + one material waived.
- `settlementConstruction: {projectId, daysLeft}` — settlement projects (paved roads, market square, etc.) build over 3–15 days.
- `activeBuffs: {buffId: daysLeft}` — multi-day elixir/buff durations (e.g., Prismatic Elixir is +crafting for 3 days).
- `hollowMarch.nextWaveDay`, `caravanRuns`, `defenseQuests`, `brandOrders`, etc. — each has its own day-counter or expiry.
- `staffInjuries: {apprId: {daysLeft}}` — staff recover over days.

### "Out of hours" lockouts
At individual action sites, `hours < N` checks block execution and show error logs:
- `hours < 1`: brewing ([2429]), experimenting ([2592]), enchanting ([2818]), breakdown ([3618]), training ([3409]).
- `hours < 2`: automaton creation ([3315]), preemptive strike ([7980]).
- `hours < resCost`: research ([2685], where `resCost` is 1 or 2 depending on `researchCostReduction` and Lore — note: Lore is a removed skill).
- `info.gatherHours < 1`: forage blocked at [1502] inside `doHarvest`; in the picker UI, the tile shows `Need ${reg.time+1}+`.
- No global "all actions locked at 0" gate — each action site checks independently. Free-action paths (e.g., `firstActionFree`, Endurance save) can let actions through at low energy.

## 3. Action Cost Inventory

### Discrete-cost actions (consume integer hours via `spendEnergy` or direct `setHours`)
| Action | Base cost | Variability | Read site |
|--------|-----------|-------------|-----------|
| **Brewing (single)** | 1 hour | First-brew-of-day free if `firstBrewFree` feat (`fbf`) | [index.html:2465] `spendEnergy(1)` |
| **Brewing (batch)** | `batchEnergyCost` hours | Variable, scaled by batch size + `batchSizeBonus` features | [index.html:2910] `spendEnergy(batchEnergyCost)` |
| **Inscription / Enchanting** | 1 hour | None | [index.html:2836] `spendEnergy(1)` |
| **Experiment** | 1 hour | None | [index.html:2598] `spendEnergy(1)` |
| **Research** | 1–2 hours | `resCost = Math.max(1, (loreMod >= 4 ? 1 : 2) - scholarReduc)` at [2654]. **Note**: `loreMod` is `getFeatureVal('researchTimeReduction')` — Lore skill was removed, so `loreMod` is effectively always 0; `scholarReduc` is `researchCostReduction`. | [index.html:2690] `spendEnergy(resCost)` |
| **Wildcraft (Wildcrafter)** | 2 hours | None | [index.html:2204] `spendEnergy(2)` |
| **Automaton creation (Magitech)** | 2 hours | None | [index.html:3319] `setHours(h=>h-2)` (bypasses Endurance/firstAction) |
| **Preemptive Strike (Sentinel)** | 2 hours | None | [index.html:7985] `setHours(h=>h-2)` (bypasses save) |
| **Breakdown Potion (Reclaimer)** | 1 hour | None | [index.html:3619] `spendEnergy(1)` |
| **Training (staff)** | 0 hours | Hardcoded `hourCost=0` at [3412]; the `hours<1` guard at [3409] still requires +1 hour available, even though nothing is consumed. Effectively free but has a 1-hour entry gate. | [index.html:3415] |
| **Hollow March crisis solution** | `cost.qty` hours | Variable per crisis | [index.html:2135] `setHours(h=>h-cost.qty)` |

### Travel-then-consume actions
| Action | Cost shape | Notes |
|--------|-----------|-------|
| **Foraging expedition** | Consumes ALL remaining hours (`setHours(0)` at [1505]) after deducting `travelTime` (1–4h per region, modified). Expedition runs `gatherHours = hours - travelTime` per-hour cycles. | A 4-hour day with 1h travel = 3h gathering, all hours gone after. This is the largest single-action cost in the game. |
| **Night Forage (Sentinel)** | All remaining hours + `nightBonusHours` bonus pool (default 3) | `travelTime` is set to 0 for night expeditions [3996]; the bonus hours come from `getFeatureVal('nightBonusHours')`. |
| **Solo Expedition (Apex Predator)** | Daily-once, consumes hours similar to forage | Gated by `solo_exp_used` dayFlag [8111, 8804]. |

### Hour-additive sources (refunds, bonuses applied mid-day)
| Source | Trigger | Amount |
|--------|---------|--------|
| Dual Inscription (Enchanter L5) | After a customer enchant if not already used today | `+1` at [2885] |
| Temple Healing quest turn-in | `questEnergyRestore` feature | `+questER` at [3832], [3898] |
| Hollow March recipe consumption (e.g. march_rallying_cry) | After brewing/applying | `+me.bonusEnergy` at [2583] |
| Companion legendary — Guardian | Triggered on day-end via legendary trigger | `+1` at [5464] |
| Companion legendary — Muse | Triggered on day-end via legendary trigger | `+1` at [5469] |

### Endurance save / free-action paths (skip consumption entirely)
- **Endurance skill save** at [2772-2775]: `Math.min(0.40, endRank*0.10 + getMod(eStat('dis'))*0.02)` chance per spendEnergy call to refund the cost entirely. Caps at 40%.
- **`firstActionFree` feat (Early Riser)** at [2774]: first action of the day costs 0. Tracked via `first_action_used` dayFlag.

## 4. Modifier Inventory

This section catalogs every source that modifies time/energy. The "Form" column is the critical one for refactor planning — almost everything is **discrete** (whole hours added/subtracted); only a couple of percentage-style modifiers exist, and those are buried inside specific calculations (Endurance save chance, `passiveIncomeMulti`, etc.). No modifier currently uses "−25% travel time" semantics.

### Class features (base + spec)
| Source | Effect | Form | Read site |
|--------|--------|------|-----------|
| Alchemist L6 (Intuitive DC) | None directly. (Lucky brew chance modifies craft outcome, not hours.) | — | — |
| Warden L1 (Trailblazer) | `travelReduction:1` | discrete (−1h travel) | [1468] via `getFeatureVal` |
| Warden L2 (Enduring Spirit) | `bonusEnergyPerDay:1` | discrete (+1h baseH) | [4067] |
| Warden L9 (Indomitable) | `bonusPerSuccess:1` | discrete (+1 ingredient/success, not hours) | — |
| Warden L10 (Legend of the Wild) | `travelReduction:3` (total -3 with L1) | discrete | [1468] |
| Sentinel L3 (Night Watch) | `nightExpeditions:true`, `nightBonusHours:2` | discrete (+2 night-only hours) | [3996, 8072] |
| Sentinel L6 (Trap Setter) | `nightDangerReduction:true` | n/a (affects danger, not hours) | — |
| Sentinel L10 (Eternal Vigil) | `nightBonusHours:2` (stacks to 4), `nightDCReduction:1`, `forageOnRest`, `preemptiveStrike` | discrete | [3996, 7980] |
| Apothecary L6 (Panacea) | `freeHealBrew:1` (1 free Healing Salve/morning) | discrete (1 free brew/day) | morning tick |
| Constructor L3 (Workshop Pro) | None hour-related | — | — |
| Constructor L10 (Master Builder) | `bonusEnergy:2` (getFeatureVal), `overnightCraft:true`, `halfConstructTime:true` | discrete | [4067] |
| Theorist L10 (Grand Unified Theory) | None hour-related | — | — |
| Naturalist L10 (Nature's Library) | `revealHighestYieldRegion:true` | n/a (UI affordance) | — |
| Scholar L2 (Speed Reader) | `freeResearchPerDay:1` | discrete (+1 free research/day) | [2685] |
| Scholar L5 (Academic Network) | `freeResearchPerDay:1` (stacks to 2 total) | discrete | [2685] |
| Scholar L8 (Grand Theorem) | `researchSlotBonus:1` | discrete (+1 free research/day) | [2685] |
| Scholar (Specs in general) | `researchCostReduction` (varies) | discrete (−1 to resCost) | [2654] |
| Enchanter L5 (Dual Inscription) | `dualInscription:true` | discrete (+1h after first enchant) | [2885] |
| Spellbrewer (prestige) Lv1+ | infusionSlots/day | discrete (daily counter, not hours) | — |
| Wildcrafter (prestige) Lv1+ | wildcraft slots/day | discrete (daily counter, not hours) | — |

### Workshop upgrades
| Source | Effect | Form | Read site |
|--------|--------|------|-----------|
| **`quarters` (Beds)** | `bonusEnergy:1` | discrete (+1h baseH) | [4067] via `upEff('bonusEnergy')` |
| **`hearth` (Hearth)** | `bonusEnergy:1` (stacks with quarters), `morale:10` | discrete | [4067] |
| **`leyline` (Ley Line Tap)** | `freeResearchPerDay:1` | discrete (+1 free research/day) | [2685] via `upEff` |

No workshop upgrade currently grants travel reduction, batch-cost reduction, or percentage-based hour modifiers.

### Feats (selected; full list in `FEATS`)
| Source | Effect | Form |
|--------|--------|------|
| Trailblazer's Boots | `travelReduction:1` | discrete |
| Early Riser (firstActionFree) | First action of day costs 0 | discrete (1 free action/day) |
| Endurance skill (not a feat, but mechanically similar) | Up to 40% chance to refund any `spendEnergy` call | **probabilistic** (not discrete or percentage in the modifier sense — it's a per-action coin flip) |

### Race bonuses
None directly modify hours/energy. Race bonuses are all skill-rank additions (+1 Persuasion, +2 Research, etc.) which feed into `getSkMod` indirectly affecting checks but not action cost.

### Companion abilities
| Source | Effect | Form |
|--------|--------|------|
| Legendary Guardian companion | `+1` hours at day-end | discrete |
| Legendary Muse companion | `+1` hours at day-end | discrete |
| Various companions | `companionDualAction` (Ranger Lv10 acts companion twice), but doesn't directly modify hours | — |
| Hawk companion (danger reduction) | `riskReduc` affects event probability, not hours | — |

### Faction tier bonuses
- **Dustwalkers Tier 1** (Ashfall): travel time reduction within Ashfall regions (location-specific). Form: discrete.
- **Pearl Divers Tier 2** (Tidecrest): travel reduction within Tidecrest. Form: discrete.
- (Other faction tier bonuses surveyed: none directly modify hours.)

### Settlement bonuses
- **Paved Roads**: −1 travel time to all regions (settlement project). Form: discrete.
- (Other settlement projects don't directly affect hours.)

### Items / consumables / temporary effects
| Source | Effect | Form |
|--------|--------|------|
| Trailblazer Tonic (potion buff via dayFlag) | `travelTime -= 1` for that day | discrete |
| Hollow March recipes (march_rallying_cry etc.) | `bonusEnergy: 2` or similar | discrete |
| Wilderness Elixir (Wildcrafter) | Active buff grants +1 Energy | discrete |
| Essence of the Wild (Wildcrafter legendary) | +1 Energy/day for 5 days | discrete |

### Weather / season
- **Ash Storm** dayFlag: `+1` to travelTime, reducible by `weatherReduction`. Form: discrete with conditional reducer.
- **Clear Sky** dayFlag: `-2` to extraction DC, no hour effect. Form: discrete (DC, not hours).
- Seasonal `travelMod`: discrete `+1` or `-1` to travelTime depending on season.

### Hollow March (endgame)
- Crisis solutions have `cost.qty` hour costs (variable per crisis). Form: discrete.
- March-specific recipes refund hours via `marchEffect.bonusEnergy`. Form: discrete.

### Summary of forms
- **Discrete (whole-number) modifiers**: ~95% of all modifiers.
- **Percentage / multiplier modifiers**: 0 affecting hours directly. (Some affect derived values like sell price or XP, but not action cost.)
- **Probabilistic save modifiers**: 1 (Endurance skill, 0–40% per-action refund chance).
- **Daily-counter modifiers**: 5–6 (freeResearchPerDay, freeCraft, firstActionFree, infusion slots, wildcraft slots) — these are "N actions per day" gates, separate from the `hours` pool.

## 5. UI Representation

### Header bar (always visible)
- **Title screen Rest button** at [6517]: `🌙 Rest (⚡{hours})` — moon icon for Rest action, ⚡ icon prefixing the hours number.
- **In-game stat strip** at [6561]: `📅{day} {season.icon}{season.name} ⚡{hours} Lv{level} 💰{gold}g [debt]`.
- **Debug panel** at [6446]: `Day {day} · ⚡{hours} · Lv{level} · {gold}g · {xp}xp`.

The ⚡ icon is consistent throughout — it always means "current hours / energy."

### Rest confirmation modal ([6655])
- Body line at [6664]: `You'll lose your remaining ⚡{hours} Energy.` (only shown if hours > 0)
- Buttons: "Yes, Rest" → `newDay()`, "Cancel", and optionally "🌙 Rest & Night Forage" if Sentinel feature active.

### Region picker tile ([7026, 7030, 8100])
- Travel/gather summary: `{info.travelTime}h travel · {info.gatherHours}h gather`
- Disabled state messages: `⚡ No Energy` / `Need ${reg.time+1}+ (have ⚡${hours})`
- Footer note: `⚠️ This uses all remaining ⚡{hours} Energy`

### Expedition detail panel ([8029, 8095])
- Header: `Expeditions — ⚡{hours} Energy remaining`
- Plan box: `🚶 Travel: {travelTime}h · ⛏️ Gathering: {gatherHours}h · 📦 ~{3*gatherHours} items`

### Workshop action confirmations
- Brewing: error log `'Not enough Energy to brew. Rest and try tomorrow.'` [2429]
- Inscription: same pattern [2818]
- Research: `Research takes ⚡{resCost} Energy.` [2658]
- Automaton: `Need 2 Energy to build an automaton.` [3315]
- Preemptive Strike button label includes `(⚡2 Energy)` [7981]
- Training: `Training takes ⚡1 Energy.` [3409]

### Map hub flavor text ([7606])
Status-line flavor varies by hours remaining:
- `hours > 4`: "The day stretches ahead."
- `hours > 1`: "Shadows lengthen across the village."
- `hours > 0`: "The last light fades."
- `hours == 0`: "Night has fallen."

### Icon convention
**Universal**: ⚡ for energy/hours. 🌙 for the Rest action. There is no 🕐 / 🕒 / clock-face icon anywhere in the UI — the game uses energy framing exclusively, even though the underlying variable is named `hours`.

## 6. Save Data Structure

### Persisted in `gatherState` ([674-749])
```js
{
  day, hours,           // primary day-cycle state
  dayFlags,             // per-day flag tokens
  infusionsUsedToday,   // *not in gatherState? — let me verify*
  wildcraftsUsedToday,  // *not in gatherState? — let me verify*
  // ... many other fields unrelated to time
}
```

Looking at the actual gatherState fields list at [747-749]: `day, hours, dayFlags` are all persisted. **`infusionsUsedToday` and `wildcraftsUsedToday` do NOT appear in gatherState** — those reset to 0 on save reload. Same for `activeBuffs.daysLeft` counters (those ARE in gatherState).

| Field | Type | Stored | Notes |
|-------|------|--------|-------|
| `day` | integer | yes | |
| `hours` | integer (0 to ~12+) | yes | Default `4` on first save load if missing. |
| `dayFlags` | string[] | yes | Default `[]`. |
| `infusionsUsedToday` | integer | **no** | Resets to 0 on save reload — could be a save-state bug (player could reload mid-day to reset their infusion budget). |
| `wildcraftsUsedToday` | integer | **no** | Same potential bug. |
| `activeBuffs` | object | yes | Multi-day buff durations preserved. |
| `constructProgress` | object | yes | Workshop construction prep persists. |
| `staffInjuries` | object | yes | Multi-day staff recovery persists. |

### Restore behavior
[index.html:778] `setDay(s.day||1); setHours(s.hours!=null?s.hours:4);`

Hours default of 4 on load — interesting because the actual baseH could be higher than 4 once class/upgrade bonuses are active. A first save load for an existing character with `bonusEnergy:2` from Master Builder would start them at 4 hours instead of 6+ if `s.hours` happened to be undefined. But normal saves always include hours, so this default only applies to corrupted/legacy data.

### Migration implications
- Any refactor changing `hours: int 0-12` to `energy: int 0-100` (or similar continuous scale) needs a save-migration shim that reads old `s.hours` and converts. The math is straightforward — `energy = s.hours * 25` for a 4→100 scale, or `energy = Math.round(s.hours / baseH * 100)` for proportional remapping.
- `dayFlags` is fully forward-compatible — adding new flag names doesn't break old saves (they just have shorter arrays).
- The two unpersisted daily counters (`infusionsUsedToday`, `wildcraftsUsedToday`) are already in an unstable state — a refactor could either persist them or accept the existing reload-resets-them behavior.

## 7. Refactor Complexity Assessment

### Surface area
- **1 primary variable** (`hours`).
- **~20 spendEnergy/setHours call sites** (Section 3 enumerates them).
- **~30 modifier sources** (Section 4), though heavily clustered: ~10 of them feed through `upEff('bonusEnergy')` or `getFeatureVal('bonusEnergyPerDay')`, so the modifier *read sites* are concentrated at [4067] and a few others.
- **~15 UI display sites** showing `⚡{hours}` (Section 5).
- **3 fields in save data** with predictable types (Section 6).

This is **moderate restructuring**, not surgical. The action-cost call sites are the bulk of the work but they're mechanically simple — each is `spendEnergy(N)` or `setHours(h => h - N)` where N is a small integer. Changing N from 1 to 25 (for a 100-point energy scale where current actions cost 25) is find-and-replace plus careful checking of the variable-cost sites (research's `resCost`, batch's `batchEnergyCost`, March's `cost.qty`, forage's "all remaining").

### What's tractable
- **Action cost scaling**: change a constant. ~15 sites, mostly `spendEnergy(1)` → `spendEnergy(25)`. The few variable-cost sites have their formulas in one place each.
- **UI substitution**: `⚡{hours}` → `⚡{energy}` if you rename the variable, or `⚡{Math.round(hours/baseH*100)}%` if you keep the underlying variable. Or change format entirely.
- **Save migration**: trivial shim in `restoreState` to convert old `s.hours` to new `s.energy`. One line.
- **Modifier conversion**: discrete `+1 hour` becomes discrete `+25 energy` (or whatever new scale). One-by-one update of class-feature / upgrade `effect:{...}` blocks. The class-feature audit gives us the full list — it's not enormous.

### Where it gets tricky
1. **Forage's "consume all remaining" semantics.** A 4-hour day with 1h travel currently gives 3 ingredient-extraction cycles. If energy is 100 and travel costs 25, gather = 75/N per-cycle... where N is what? Is each forage cycle still a discrete hour-equivalent, or does it become continuous? This decision ripples into the forage UI (the per-hour gathering loop at [1818-1870] structurally assumes integer hour counts) and the night expedition path.
2. **Percentage-based modifiers don't exist yet.** The whole *reason* for the refactor (per the context) is to enable percentage modifiers. So we need a design call on how to express them — does a feature say `travelEnergyReduction: 0.25` (25% of travel cost refunded)? `travelEnergyFlat: -10` (flat 10-energy reduction regardless of base)? Or some hybrid? The shape determines the read-site changes at [1468] and similar.
3. **The Endurance probabilistic save** at [2772-2775] is a 0–40% per-action refund. With smaller-percent energy increments (e.g., 1-energy actions in a 100-energy day), a 40% refund chance becomes nearly free-actions. The save semantics probably need to shift from "refund the whole cost" to "refund 25% of the cost" or similar. Same with `firstActionFree` — "first action free" is much more powerful when actions are 1-energy than when they're 1-hour-of-4.
4. **Multi-day systems intersect awkwardly.** `infusionsUsedToday`, `freeResearchPerDay`, `wildcraftsUsedToday`, daily-once gates like `solo_exp_used`/`forge_used`/`envoy_sent` — these are "N times per day" semantics, not "N energy per day." They don't need to change at all, but they coexist with the new energy system and the player needs to understand both.
5. **Description-text drift.** Per the class feature audit, descriptions have already drifted from code several times. A refactor changes the implementation; every class feature, upgrade, feat, and handbook entry that mentions "Energy", "hours", "+1 hour", "−1 travel", etc. needs a sweep. The closing audit hit 140 features; figure roughly half mention hours/energy.
6. **The `hours` name itself.** If the refactor keeps the variable named `hours` for back-compat, the dual naming ("hours" internally, "Energy" externally) will keep biting. Renaming the variable to `energy` would clean this up but adds ~50+ find-and-replace sites and a more involved save migration.

### Gameplay invariants at risk
- **Lockout thresholds**: every `hours < N` check assumes integer hour math. At a 100-energy scale these become `energy < N*scale`, but the player intuition for "I can't do this until tomorrow" relies on small integer math. Need to keep error messages crisp.
- **Endurance save 40% cap**: at fine-grained energy, this cap probably needs revisiting. A 40% chance to refund 1 energy in a 100-energy day is qualitatively different from a 40% chance to refund 1 hour in a 4-hour day.
- **`firstActionFree` (Early Riser)**: same problem inverted — gives more value when actions are small.
- **Forage's "all-remaining" sink**: if a player can pre-spend some energy and then forage, "all remaining" becomes a fuzzier value than the current 0-4 range.

### Migration approach recommendation
- **Best case (additive)**: introduce `energy` alongside `hours`. New code reads `energy`; old code reads `hours`. Update one subsystem at a time (research first — it's the system the user motivated this from). Deprecate `hours` after every subsystem migrates. Save migration is a one-time `if (s.hours !== undefined && s.energy === undefined) s.energy = s.hours * 25;` shim. Downside: temporary duplication.
- **Worst case (full swap)**: rename `hours` → `energy` throughout, change all costs in one PR, ship a save migration that converts every existing save. ~150 file:line changes. Higher risk of regression, but cleaner end state.
- **My recommendation**: **additive**, scoped to one subsystem at a time. Start with research (the original motivator). Get the new percentage-modifier semantics nailed down there, validate the modifier shape works for the class-feature audit, then expand. Forage is the trickiest subsystem and should be migrated last (or kept on the discrete model indefinitely if "all remaining hours" is a beloved mechanic).

### Rough effort estimate
- **Additive incremental refactor**: 2–4 days of focused work per subsystem, with research as the pilot. Full migration of all action sites probably 2–3 weeks calendar time given the audit-style verify-each-feature work that will follow each subsystem change.
- **Full swap**: 1 week heads-down work + 1 week regression-hunting. High risk; not recommended without a strong test harness.

## 8. Open Questions / Anomalies

1. **`infusionsUsedToday` and `wildcraftsUsedToday` not persisted in saves.** Players can reload a save to reset their daily infusion/wildcraft budgets. Could be intentional (escape hatch for misclicks) or could be a bug. Worth surfacing for Jim's call.
2. **`hours` default on load is 4, not `baseH`.** [778] does `setHours(s.hours != null ? s.hours : 4)`. For a character with `bonusEnergy` upgrades/features, the default-4 is below their actual cap. Only triggers on corrupted/legacy data, but worth a note.
3. **The variable is named `hours` but displayed as "Energy".** This is mostly cosmetic, but it's a real linguistic mismatch — error messages, log lines, and UI all say "Energy" while the code internals say "hours." A refactor is a natural moment to align these.
4. **`researchTimeReduction` reads `getFeatureVal('researchTimeReduction')` at [2654]** but I don't see any feature that grants that key. It was probably tied to the removed Lore skill. The `loreMod >= 4 ? 1 : 2` ternary is effectively always taking the `2` branch for everyone today. Worth confirming and either removing or wiring up.
5. **Training has a 1-hour entry gate but 0-hour cost.** [3409] requires `hours >= 1` to enter training; [3412] sets `hourCost = 0`; [3413] guards re-entry with the same `hours < hourCost` (which is `hours < 0` and never fires). The 0-hour cost is intentional ("Training: free (feat feature)" comment at [3411]), but the 1-hour gate is leftover from an earlier non-free design. Bug or intended?
6. **The Master Builder `passiveIncomeMulti:3` doesn't intersect with hours at all** but it's listed near hours-related effects. Cleaned up just by Section 4's grouping — flagging in case future readers wonder why it's not there.
7. **Foundation upgrades shopfront/quarters/garden** use direct `hasUp` checks for some effects (per the workshop audit) — none of them affect hours, but worth noting that "upgrade effect" isn't one consistent mechanism in this codebase. Refactor planning needs to account for both `upEff` aggregation AND direct `hasUp` short-circuits.
8. **`firstActionFree` semantics**: it's described as "first action free," but `spendEnergy` is the only function it hooks. Setters that bypass spendEnergy (automaton, preemptive strike, foraging's `setHours(0)`, March crisis solutions) don't honor the free-action. So players with Early Riser don't get the free action if they use it for "free actions" that already bypass spendEnergy. Minor consistency issue.
9. **`dayFlags` is a flat array of strings**, not an object — so collision-prone if two distinct mechanics ever pick the same flag string. Not a current issue; worth noting as a maintainability watchpoint.
10. **No "energy" key in `getFeatureVal`** — there's `bonusEnergy`, `bonusEnergyPerDay`, `energyCost`, `questEnergyRestore` etc., but no canonical "energy" namespace. New features wanting to modify energy have to pick which prefix to follow. A refactor could canonicalize this.
