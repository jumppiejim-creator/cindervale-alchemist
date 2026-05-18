# Spellweaver Planar Attunement — Combined Recon + Design-Lock

**Read-only. No files changed.** Output = locked design for staged build.

---

## Part A: Per-effect integration recon

### Integration sites established from code

The doEnchant handler (`index.html:3205-3283`) contains every site needed:

| Site | Line | What's there |
|---|---|---|
| Material cost calculation | 3216-3223 | `cost{}` map built from `ench.ingr` + quality `extraIngr`; consumed via `modInv(id,-q)` at 3228 |
| Material save (Wardkeeper L6 / L10 `enchantMatSave`) | 3226-3229 | Existing aggregator pattern; success suppresses material consumption |
| DC computation | 3231-3238 | `adjDC = Math.max(5, ench.dc + qualDCMod + ... - customLibDCReduc)` — sum-of-contributors style |
| Inscription roll | 3239 | `ch = doCheck('inscription', adjDC)` |
| Bonus aggregation (arcB, focB, csb, efb, esf, **cefb, cesf** = categorical) | 3240-3247 | All summed into `ch.total` at line 3256; **`getCategoricalBonus('enchant', ench.cat, 'enchantBonus')` is the per-category pattern Spellweaver/Wardkeeper/Runesmith already use** |
| Auto-success below DC (Wardkeeper L10 pattern) | 3248, 3256 | `autoEnchDC = getFeatureVal('autoEnchantDC')` — line 3256: `\|\|(autoEnchDC>0 && adjDC<=autoEnchDC)`. **Exactly the pattern Dreamweave's `autoSuccessDC:12` needs.** |
| Crit range (existing) | 3249 | `critRange = 20 - getFeatureVal('enchantCritRange')` — aggregator pattern |
| Reroll-on-fail (existing) | 3258-3267 | `checkReroll` flag, dayFlag-gated |
| **Success-branch gold formula** | 3268-3272 | `Math.floor((baseGR + critGold) * (1 + enchGoldB + custPayB + debtPenalty) * customSellMult * eqT.sellMult * GOLD_MULT)`. Existing additive-then-multiplicative composition. |
| Success-branch bonus-on-success (Arcane Recycler pattern) | 3275 | `enchantBonusScroll`: `if(ebsChance>0 && Math.random()<ebsChance){const scrollGold=...; setGold(g=>g+scrollGold);}` — **exact template for Wild Magic's `bonusEnchantChance:0.25`** |
| **Failure-branch material recovery** (Wardkeeper L3 `failEnchantReturn`) | 3278-3281 | Existing aggregator. `failDestroyMats` could override `fer` to 0. |
| Customer-removal | 3282 | `setEnchQ(p=>p.filter(c=>c!==cust))` — unconditional after success OR failure. **Customer leaves immediately; no post-enchant persistent state on customer items.** |

Other integration data confirmed:
- ENCHANTMENTS have `cat: 'weapon'|'armor'|'other'` (game-data.js:1407+). Categorical-bonus aggregator (`getCategoricalBonus`) already supports per-category modifiers.
- Customer (cust) objects do **NOT** carry a `faction` field — names come from `CUST_NAMES`, with title from `CUST_DATA[name]`. **There is no customer→faction tie in the data.** This blocks any "anger the customer's faction" interpretation; rep penalties would need a synthetic mapping.
- newDay handler at `index.html:4453` is the day-tick hook (spoilage, shelf sales, threats decay, etc.) — the only place per-day processing happens.
- **No persistent state for enchanted-customer-items exists.** Once an enchant succeeds or fails, the customer is removed from `enchQ`; their "item" (a string in `cust.name`) is not stored anywhere. Adding a "fade overnight" system requires a new persistent state object (pending-enchants array) + a new newDay branch.

### Convergence stacking — code-structure finding

Code structure has both `getActivePlanes()` (line 3623, returns the plane id list) and `getPlanarCombo()` (line 3627, returns the combo or null). Neither is consumed by any effect-application code, so the code is **silent on stacking intent**.

Two interpretations both supportable from data:
- **Combo REPLACES** plane effects (only combo applies when converged).
- **Combo STACKS** with plane effects (both apply when converged).

Data hint suggesting REPLACES: `utilityGoldMult` appears as **Feywild plane at 1.3** AND **Dreamweave combo at 1.2**. If they stacked, the combo value being weaker than the plane value makes no sense (combo "downgrades" the player's existing buff). If combo replaces, the trade is "lose 0.10 utility gold, gain auto-success-below-12 + (no Astral Sea goldPenalty)" — coherent.

UI structure also implies REPLACES: when converged, the UI shows the combo name + desc, hiding the individual planes' descs. Reads as combo being the operative state.

**Recommended lock (Part B § "convergence rule"): combo REPLACES.** Rationale below.

### Per-effect table

| # | Effect | Plane/Combo | Site(s) needed | Pattern exists? | **Tier** | Cross-system blast |
|---|---|---|---|---|---|---|
| 1 | `utilityGoldMult:1.3` | Feywild plane | doEnchant:3272 (gold formula; gate on `ench.cat==='other'`) | ✓ (gold-mult chain) | **Tier 1** | None |
| 2 | `fadeChance:0.10` | Feywild plane | New persistent state + newDay tick OR new success-branch immediate roll | ✗ — no existing surface | **Tier 3** (or Tier 2 if reinterpreted — see Part B) | Customer queue + rep/gold rollback |
| 3 | `defensiveBonus:2` | Shadowfell plane | doEnchant:3245 (bonus aggregation; gate on `ench.cat==='armor'`) | ✓ (categorical bonus pattern) | **Tier 1** | None |
| 4 | `offensiveDCPenalty:3` | Shadowfell plane | doEnchant:3238 (adjDC sum; gate on `ench.cat==='weapon'`) | ✓ (DC contributor pattern; existing `debtPenalty` shows negative-modifier precedent) | **Tier 1** | None |
| 5 | `dualChanceBonus:0.20` | Elem Chaos plane | doEnchant success branch (3268+); new bonus-pay roll mirroring `enchantBonusScroll` at 3275 | ✓ (enchantBonusScroll pattern is the exact template) | **Tier 1** (with Part B reinterpretation) | None |
| 6 | `failDestroyMats:true` | Elem Chaos plane | doEnchant:3278-3280 (suppress `fer` when flag is active) | ✓ (override existing aggregator) | **Tier 1** | None |
| 7 | `dcReduction:2` | Astral Sea plane | doEnchant:3238 (adjDC sum, negative contributor) | ✓ | **Tier 1** | None |
| 8 | `goldPenalty:0.15` | Astral Sea plane | doEnchant:3272 (multiplicative; existing `debtPenalty:-0.20` is the negative-contributor precedent) | ✓ | **Tier 1** | None |
| 9 | `allGoldMult:1.5` | Twilight Veil combo | doEnchant:3272 (extra mult factor) | ✓ | **Tier 1** | None |
| 10 | `bonusEnchantChance:0.25` | Wild Magic combo | doEnchant success branch — mirror `enchantBonusScroll` at 3275 | ✓ | **Tier 1** (with Part B reinterpretation) | None |
| 11 | `autoSuccessDC:12` | Dreamweave combo | doEnchant:3256 — feed into existing `autoEnchantDC` aggregator OR add parallel check | ✓ (Wardkeeper L10's `autoEnchantDC:15` is the exact template) | **Tier 1** | None |
| 12 | `utilityGoldMult:1.2` | Dreamweave combo | doEnchant:3272 (same site as #1, different value) | ✓ | **Tier 1** | Stacking interaction with #1 — resolved by convergence rule (replaces) |
| 13 | `inscriptionBonus:4` | Void Storm combo | doEnchant:3245 (bonus aggregation, flat contributor) | ✓ | **Tier 1** | None |
| 14 | `critFailDestroy:true` | Void Storm combo | doEnchant:3257+ (nat-1 branch). With no cust.faction, blast radius = whatever penalty mechanic is chosen | ✓ if reinterpreted (existing addRep/setGold) | **Tier 1** (with Part B reinterpretation) | Reputation **only if** synthetic customer→faction mapping built; without that, penalty must be flat |
| 15 | `dcReduction:3` | Null Space combo | doEnchant:3238 (same site as #7, different value) | ✓ | **Tier 1** | Stacking — resolved by combo replaces |
| 16 | `defensiveGoldMult:2.0` | Null Space combo | doEnchant:3272 (gate on `ench.cat==='armor'`) | ✓ | **Tier 1** | None |
| 17 | `inscriptionBonus:3` | Primordial Order | doEnchant:3245 (same as #13, different value) | ✓ | **Tier 1** | None |
| 18 | `allGoldMult:1.25` | Primordial Order | doEnchant:3272 (same as #9, different value) | ✓ | **Tier 1** | None |

**16 unique effect keys (per spec's count) across 18 effect-instances** (4 keys appear in multiple effects: `utilityGoldMult` twice, `dcReduction` twice, `inscriptionBonus` twice, `allGoldMult` twice). Almost everything is Tier 1; only `fadeChance` is genuinely Tier 3 if left literal.

### `fadeChance` subsystem sizing (the single biggest decision)

**Literal interpretation** ("enchant fades overnight, customer demands refund"): requires:
- New persistent state: `pendingEnchants[]` carrying customer reference, gold paid, day-applied, planar context, fade-roll outcome.
- New newDay branch processing the array — for each, if fade-roll triggered → refund the gold, log "{customer}'s enchant has faded; they came back for a refund," remove from pending.
- Customer queue interaction: the customer is already gone from `enchQ` after the original transaction. Refund happens automatically without re-summoning them; they just "didn't really stay enchanted."
- Anti-exploit: player can't earn faction rep / XP and then have it refunded retroactively; rollback also needs XP and rep handling.
- ~80-150 lines of new code, none of which exists today.

**Reinterpretation A** ("10% chance the customer is unhappy at the moment of enchanting"): requires:
- A roll in doEnchant's success branch — if fade rolls, apply a flat penalty (e.g., -10g compensation paid back; -1 to player's currently-aligned faction's rep).
- ~5-10 lines, plugs into existing setGold + addRep.
- Tier 1.

**Reinterpretation B** ("10% chance the enchant fails despite the success roll"): requires:
- Convert success → fail post-roll with the gold/XP/rep all cancelled.
- ~10-15 lines, all in success branch.
- Tier 1, but feels weird — the player saw "Enchanted!" and then gets a "actually no" message. Confusing UX.

**Recommendation: Reinterpretation A.** Reasoning below.

---

## Part B: Per-effect design-lock

### LOCKED: Convergence stacking rule = COMBO REPLACES PLANE EFFECTS

When two planes are attuned (Lv10 convergence), **only the combo's effects apply**. Individual planes' effects are suppressed while the combo is active. Rationale:
1. The data has **`utilityGoldMult:1.3` on Feywild plane AND `utilityGoldMult:1.2` on Dreamweave combo** — stacking would give 1.3 + 1.2 OR 1.3 × 1.2, both nonsensical (combo is "weaker"); replacement (combo = 1.2, planes = 0) reads cleanly as a deliberate combo tradeoff.
2. The UI already presents combos as a headline state ("Convergence Active" banner replaces the plane descs).
3. Combos can be tuned independently of plane combinations — designers can balance the 6 combos as discrete states rather than "plane A + plane B + bonus" with N×N interactions.
4. Lock is reversible — when the build land, the effect-iteration loop trivially supports either model (`if(combo) applyCombo; else for(plane) applyPlane;`); future change requires only ~5 lines.

This means: **at 2-plane convergence, the player gets ONLY the combo effects** (no plane-level utilityGoldMult, no plane-level downsides like goldPenalty). Combos are deliberately their own states.

### Penalty effects (locked)

**KEEP penalties as real downsides.** `offensiveDCPenalty:3` (Shadowfell), `goldPenalty:0.15` (Astral Sea), `failDestroyMats:true` (Elemental Chaos) — all stay. A Spellweaver attuning a plane chooses a tradeoff, not a pure buff. This is the spec's intended feel; pure-buff planes would flatten the system to "always attune the strongest plane." Penalty effects use existing aggregator patterns (negative contributors fine in DC/gold sums per existing `debtPenalty` precedent).

**Exception: `critFailDestroy` (Void Storm) reinterpreted.** Without a customer→faction link in the data, "destroy the customer's item" cannot map to a clean reputation penalty. Lock: **on nat-1 with Void Storm active, the player pays -25g compensation AND the failure receives no material recovery** (overrides any active `failEnchantReturn`). Both penalties use existing setGold + the failure branch. Real downside, no new infrastructure.

### `fadeChance` LOCKED to Reinterpretation A

**`fadeChance:0.10` (Feywild plane)** = on enchant success with Feywild attuned, 10% chance the customer is unhappy: -10g compensation refunded from the gold reward + -1 to player's currently-aligned faction rep. **Tier 1**, no new persistent state, plugs into existing setGold + addRep.

Rationale: the literal "fades overnight" interpretation is 10-15× more expensive than every other effect combined. The flavor ("enchantments shimmer with illusory beauty... some enchantments fade overnight") survives in narrative — the fade-roll message at enchant-time can read "*the customer returns shortly, dissatisfied — the inscription was beautiful but unstable. You refund a portion of their payment.*" The mechanical cost lands.

**Logged design question for Jim:** if you ever want literal overnight-fade with rollback, that's a real net-new subsystem (~80-150 lines, persistent state, day-tick hook). Reinterpretation A delivers the design intent (a real downside that hurts) at a fraction of the build cost.

### `bonusEnchantChance:0.25` (Wild Magic combo) LOCKED

The literal interpretation ("apply a second enchant to the customer's item for free") is also subsystem-heavy: requires applying an additional enchant in code (pool selection, second roll, second gold/XP calc). Reinterpret: **25% chance on success to gain +50% bonus gold and +50% bonus XP from the enchant** (the residual fey energy becomes alchemical scrap the player can sell). Tier 1, mirrors the existing `enchantBonusScroll` pattern at line 3275. Narrative supports it ("Wild Magic: the inscription detonates into rainbow shards — you gather them, +X gold, +Y XP").

### Per-effect locked decisions

| # | Effect | Plane/Combo | Tier | Declared | **LOCKED Decision** | Rationale |
|---|---|---|---|---|---|---|
| 1 | `utilityGoldMult:1.3` | Feywild | 1 | 1.3 | **KEEP 1.3** | +30% gold on "other" enchants; balanced by fadeChance Tier-1 reinterpretation. Standard Spellweaver Lv6 +35% other-gold stacks with this — at Lv10 + Feywild, "other" enchants pay ~3× base. Strong but Feywild costs you reputation; tradeoff intact. |
| 2 | `fadeChance:0.10` | Feywild | 1 (was 3) | 0.10 | **REINTERPRET**: 10% chance on success → -10g compensation + -1 aligned-faction rep | Literal subsystem is 10× more expensive than the rest of the project combined; reinterpretation captures the design intent at Tier 1 cost. Logged design question if Jim wants the literal version later. |
| 3 | `defensiveBonus:2` | Shadowfell | 1 | +2 | **KEEP +2** (on armor enchants) | +2 inscription on armor; pairs with the offensive penalty as a clean weapon→armor tradeoff. |
| 4 | `offensiveDCPenalty:3` | Shadowfell | 1 | +3 DC | **KEEP +3 DC** (on weapon enchants) | Real downside makes Shadowfell a defensive specialty. |
| 5 | `dualChanceBonus:0.20` | Elem Chaos | 1 | 0.20 | **REINTERPRET**: 20% chance on success → +50% bonus gold + +50% bonus XP for that enchant | Literal "double inscribe" is subsystem-heavy; this delivers double-payout-effect via existing patterns. Mirrors `enchantBonusScroll`. |
| 6 | `failDestroyMats:true` | Elem Chaos | 1 | true | **KEEP** — override `failEnchantReturn` to 0 when Elemental Chaos is attuned and the inscription fails | Pairs with #5 as the chaos tradeoff (high-variance gambling: more upside on success, total loss on fail). |
| 7 | `dcReduction:2` | Astral Sea | 1 | -2 DC | **KEEP -2 DC** (all enchants) | Steady DC reduction; balanced by goldPenalty. |
| 8 | `goldPenalty:0.15` | Astral Sea | 1 | -0.15 | **KEEP -15% gold** (all enchants) | Multiplicative penalty in the existing gold formula; clean tradeoff with #7. |
| 9 | `allGoldMult:1.5` | Twilight Veil | 1 | 1.5 | **KEEP 1.5** | +50% on ALL enchants is large but Twilight Veil is a 2-day Lv10 convergence state — earned. With Lv10 stat bonuses, weapon/armor enchants pay ~2.7× base; "other" pays ~3.2× base. Power-fantasy capstone for the spec. |
| 10 | `bonusEnchantChance:0.25` | Wild Magic | 1 | 0.25 | **REINTERPRET**: 25% chance on success → +50% bonus gold + +50% bonus XP (same formula as #5) | Same reinterpretation as `dualChanceBonus`. Combo-version is a 25% trigger (vs 20% for the plane); plane is a steady earner, combo is the same effect at a higher rate. Coherent. |
| 11 | `autoSuccessDC:12` | Dreamweave | 1 | 12 | **KEEP 12** — feed into existing `autoEnchantDC` aggregator (Wardkeeper L10's `autoEnchantDC:15` is the same key/pattern) | Auto-success at DC≤12 trivializes low-DC enchants. Pairs with utilityGoldMult:1.2. Existing pattern. |
| 12 | `utilityGoldMult:1.2` | Dreamweave | 1 | 1.2 | **KEEP 1.2** (combo replaces plane, so the Feywild 1.3 → Dreamweave 1.2 is a deliberate trade: lose 0.1 on "other" gold, gain auto-success-at-12 + lose Astral Sea's goldPenalty) | Convergence rule (REPLACES) makes the values coherent. |
| 13 | `inscriptionBonus:4` | Void Storm | 1 | +4 | **KEEP +4** | Strong flat inscription bonus; pairs with critFailDestroy as the storm tradeoff. |
| 14 | `critFailDestroy:true` | Void Storm | 1 | true | **REINTERPRET**: on nat-1 with Void Storm, -25g compensation + override `failEnchantReturn` to 0 | No customer→faction link in data; rep penalty isn't cleanly available. Flat gold + zero-material-recovery is real and uses existing handlers. |
| 15 | `dcReduction:3` | Null Space | 1 | -3 DC | **KEEP -3 DC** (all enchants — combo is stronger than Astral Sea's -2 alone) | Coherent under combo-replaces rule. |
| 16 | `defensiveGoldMult:2.0` | Null Space | 1 | 2.0 | **KEEP 2.0** | +100% on armor enchants; pairs with #15 for the defensive-specialist combo. Combos are earned. |
| 17 | `inscriptionBonus:3` | Primordial Order | 1 | +3 | **KEEP +3** | Solid mid-tier bonus. Pairs with #18. |
| 18 | `allGoldMult:1.25` | Primordial Order | 1 | 1.25 | **KEEP 1.25** | +25% gold on all; smaller version of Twilight Veil's 1.5 (no defensive specialization, no specific enchant-class skew). |

**Decision summary:**
- 14 effects: KEEP as declared (including 2 honest penalties)
- 3 effects REINTERPRETED to Tier 1 to avoid Tier 3 subsystem builds: `fadeChance`, `dualChanceBonus`, `bonusEnchantChance`, plus `critFailDestroy` softened from "destroy item" to "flat gold/material penalty"
- 1 LOCKED design rule: convergence REPLACES (combo effects exclusive when 2 planes attuned)

**Logged design question:** if Jim ever wants the literal `fadeChance` overnight-rollback subsystem OR the literal "bonus second enchant on customer item" mechanic, both are real net-new builds (Tier 3 each). Reinterpretations deliver design intent at Tier 1 cost; this is the same Spellweaver-class trade pattern logged in prior corrections.

---

## Part C: Staged build plan

**Stage 1 — Tier 1 effects** (all 18 effect-instances after Part B reinterpretations).

Single coherent build:
1. Add a planar-effects helper: given the active planar state (`getActivePlanes()` + `getPlanarCombo()`), return a flattened effect map keyed by the effect names. Implements **combo-replaces** rule: if 2 planes attuned, return combo effects; if 1 plane attuned, return that plane's effects; else empty.
2. Wire each effect into its established doEnchant integration site (per Part A's table).
3. UI: add per-plane and per-combo effect TEXT to the Planar Focus interface (the in-game guidance that was the original task) — drawn from the locked values, not from `mechDesc`.
4. Update Spellweaver `mechDesc` + handbook entry to match what now fires post-Stage-1.

**"Done + verifiable in play" for Stage 1:**
- Attune Feywild → enchant an "other"-cat item → gold paid is 1.3× the unfocused baseline; 10% of attempts roll a -10g compensation + -1 aligned-faction rep.
- Attune Shadowfell → enchant an armor item → roll +2 to inscription; enchant a weapon → DC +3.
- Attune Elemental Chaos → 20% of successes pay +50% gold/XP; failures destroy materials with no recovery.
- Attune Astral Sea → all enchants -2 DC, -15% gold.
- Lv10 convergence (Feywild + Astral Sea = Dreamweave) → DC ≤12 auto-succeeds, "other" enchants 1.2× gold, no goldPenalty, no fadeChance.
- All 6 combos similarly verifiable each by their effects.

**Text-truth for Stage 1:** Spellweaver `mechDesc` updates to honestly describe what the planar effects do (the locked values). Handbook entry updates to match. **In-game guidance** added to Planar Focus interface (the original task) now shows real values.

**No Stage 2 or Stage 3 needed in the locked design.** All effects collapsed to Tier 1 via Part B reinterpretations. The most expensive single piece (`fadeChance`) was the design call that determined this — Tier 3 was avoided by Reinterpretation A.

**Optional later Stage:** if Jim ever wants literal `fadeChance` overnight-rollback OR literal "bonus second enchant on customer item," that's a separate post-Stage-1 add (now optional, since Stage 1 already makes Spellweaver work).

---

## Scope flags

1. **fadeChance's literal interpretation is the single biggest cost lever.** Reinterpretation A collapses ~80-150 lines of new code (persistent state + day-tick + rollback logic) to ~5 lines (success-branch roll). Without that reinterpretation, the whole project is Tier 3 instead of Tier 1. Logging this prominently because future "is fadeChance really doing what was promised?" reviews need to know the trade was made deliberately.

2. **Customer→faction link is absent.** Any future effect that wants to interact with the customer's faction (`critFailDestroy`'s natural interpretation, customer-loyalty mechanics, etc.) needs a synthetic mapping built first. Out of scope here; flag for future.

3. **The `enchantBonusScroll` pattern at line 3275 is the secret weapon.** Three of the four reinterpretations (#2, #5, #10) ride this exact template. Whoever wrote it left the door open for exactly this kind of effect-stacking. Worth surfacing because it's the structural reason the Tier 3 → Tier 1 collapse works cleanly.

4. **Standard-feature gold stacking with planar gold mults.** At Lv10 Spellweaver + Feywild attuned + "other" enchant: `Base × (1 + 0.35 + 0.50 + 0.30) × 1.3 = ~3× base`. That's the deliberate Lv10 + planar power fantasy. Twilight Veil convergence on "other": `Base × 2.15 × 1.5 = ~3.2× base`. These are large but the player invested heavily (Lv10 capstone + active attunement) — flagging for playtest tuning but the values are internally coherent.

5. **Effect data file remains untouched in this pass.** Part B's locked values match the declared values in 14 of 18 cases. The 4 reinterpretations don't change the effect KEYS in `PLANAR_FOCUSES`/`PLANAR_COMBOS` data — the build stage adds CONSUMERS that read those keys with the locked semantics. If a future audit wants the declared data to reflect the consumed semantics, that's a separate data-correction pass (e.g., add `fadeChance: { type: 'immediate-rep-penalty', gold: -10, rep: -1 }` if the data should self-describe).

---

**No code changed.** Output = this locked design. Build stage 1 generates the commit; this artifact is the spec it's written against.
