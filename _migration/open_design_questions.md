# Open Design Questions — Consolidated

_All still-open logged design questions across the project as of session end. Closed questions are listed at the bottom for traceability. Each entry: what it is, what the open decision is, where it was raised, and the rough cost / blast radius of the "real" build if Jim picks that path._

---

## 1. Literal `fadeChance` overnight-rollback subsystem (Feywild plane)

**Raised:** Spellweaver Planar Attunement combined recon + design-lock pass.

**Current state in code:** the `fadeChance:0.10` Feywild effect key is declared in `game-data.js:2205`, never read. Locked-in design takes Reinterpretation A — 10% chance on enchant success → -10g compensation + -1 aligned-faction rep (Tier 1, ~5-10 lines, plugs into existing setGold + addRep).

**Open decision:** if Jim ever wants the **literal** Feywild flavor ("enchantments fade overnight, customer comes back for a refund"), that's a net-new subsystem build:
- New persistent state: `pendingEnchants[]` carrying customer reference, gold paid, day-applied, planar context, fade-roll outcome.
- New newDay branch processing the array — fade roll → refund gold, log "{customer}'s enchant has faded; they came back for a refund," remove from pending.
- Customer queue interaction: customer is already gone from `enchQ` after the original transaction. Refund happens without re-summoning; they "didn't really stay enchanted."
- Anti-exploit: player can't earn faction rep / XP and then have it refunded retroactively; rollback also needs XP + rep handling.
- **Cost: ~80-150 lines of new code, none of which exists today.**

**Why not built now:** the literal subsystem is 10-15× more expensive than every other Spellweaver effect combined. Reinterpretation A captures the design intent (a real downside that hurts) at Tier 1 cost. The narrative flavor ("the customer returns shortly, dissatisfied — the inscription was beautiful but unstable") survives in the result message.

**Status: OPEN.** Decision to escalate beyond Reinterpretation A is purely a future-feature question, not blocking anything currently shipped.

---

## 2. Literal `bonusEnchantChance` second-enchant-on-customer-item (Wild Magic combo)

**Raised:** Spellweaver Planar Attunement combined recon + design-lock pass.

**Current state in code:** the `bonusEnchantChance:0.25` Wild Magic combo effect key is declared in `game-data.js:2222`, never read. Locked-in design: 25% chance on success → +50% bonus gold and +50% bonus XP from the enchant (Tier 1, mirrors existing `enchantBonusScroll` pattern at `index.html:3275`).

**Open decision:** if Jim wants the **literal** Wild Magic flavor ("Every enchant has a 25% chance to randomly apply a bonus enchantment for free" — i.e., the customer's item gets a second enchant), that requires:
- Pool selection for the bonus enchant (random known? same category? new pool?).
- Second roll execution + second gold/XP calc.
- Display logic for "customer received 2 enchants on their item" (the customer is currently a string in `cust.name`; no persistent item state to attach a second enchant to).
- **Cost: similar to fadeChance — net-new subsystem with no clean hook.**

**Why not built now:** the bonus-gold-and-XP reinterpretation delivers the design payoff via existing patterns. The "second enchant on customer item" interpretation needs the same kind of persistent customer-item state that fadeChance does, which doesn't exist.

**Status: OPEN.** Same shape as #1 — Tier 1 reinterpretation in production; literal Tier 3 build is a future option.

---

## 3. Literal `dualChanceBonus` double-inscribe (Elemental Chaos plane)

**Raised:** Spellweaver Planar Attunement combined recon + design-lock pass.

**Current state in code:** the `dualChanceBonus:0.20` Elemental Chaos effect key is declared in `game-data.js:2213`, never read. Locked-in design: 20% chance on success → +50% bonus gold + +50% bonus XP for that enchant (Tier 1, mirrors `enchantBonusScroll`).

**Open decision:** if Jim wants the literal "double-inscribe" interpretation (e.g., apply TWO enchants to the customer's item from a single roll), same subsystem cost as #2 above.

**Why not built now:** same reasoning as #2 — Tier 1 reinterpretation captures intent without needing customer-item persistent state.

**Status: OPEN.** Same shape; future option.

---

## 4. Customer → faction synthetic mapping (for `critFailDestroy` literal interpretation + future customer-faction interactions)

**Raised:** Spellweaver Planar Attunement combined recon (specifically while sizing `critFailDestroy:true` for Void Storm combo).

**Current state in code:** customer (cust) objects do **NOT** carry a `faction` field. Names come from `CUST_NAMES`, with title from `CUST_DATA[name]`. There is no customer→faction tie anywhere in the data.

**Open decision:** any future effect that wants to interact with the customer's faction (the literal `critFailDestroy` "destroy the customer's item, anger their faction" interpretation; potential customer-loyalty mechanics; faction-specific clientele systems) requires building a synthetic mapping first — e.g., assign each `CUST_NAMES` entry a primary faction, or attach a `faction` field to spawned customer queue entries via `genCust()` at `index.html:1194`.

**Why not built now:** the locked `critFailDestroy` design (nat-1 with Void Storm → -25g compensation + override `failEnchantReturn` to 0) uses existing setGold + failure-branch handlers. No mapping needed for the locked interpretation.

**Status: OPEN.** Prerequisite for several potential future features; no immediate dependent.

---

## 5. Runesmith / Tinkerer / Apothecary in-game-guidance polish (systemic-signal flag)

**Raised:** Spellweaver Phase 1 ground-truth report (systemic-signal check per task spec).

**Current state in code:** these three interface-driven specs are **mechanically real** (effects fire correctly — unlike Spellweaver pre-build) but have in-game-guidance opacity at varying degrees:

- **Runesmith Forge** (`index.html:8694-8740` area): the forge daily-uses gate is visible inline in the forge panel UI (`{max-used}/{max} forges remaining`), but per-forge-use cost, what happens to the forged weapon (where it goes, how/when it sells), and the relationship between forge uses and the weapon-category inscription bonus aren't surfaced in-screen. The mechDesc has the full explanation; the player operating the Forge in-game has the bare minimum.
- **Tinkerer Gadget Bench** (`index.html:9085-9135`): gadget marks (Mk I/II/III) are visible on each gadget; effectDesc strings are visible. The "infinite marks at Lv10" + "dual gadgets" Lv10 unlocks (`infiniteGadgetMarks`, `dualGadgets`) aren't called out prominently when achieved. Less urgent than Runesmith — Tinkerer's per-gadget UI is reasonably self-documenting.
- **Apothecary Clinic** (mechDesc strengthened in prior sweep; in-game UI surfaces patient ailments and prescribe action). DC scaling with ailment tier (DC = 8 + tier*3) and the Attunement-check basis aren't visible to the player at examination time. Less urgent — prior correctness pass strengthened the descriptions.

**Open decision:** whether to do a small polish pass on each (in-screen affordances that match Spellweaver's expected post-build guidance: per-action effect text visible at the moment of action, threshold/cost numbers shown, capstone-unlocked-state callouts). Scope: probably ~50-100 lines across the three, low risk, no mechanic changes.

**Why not built now:** scoped out of the Spellweaver guidance task (which was Spellweaver-only). No urgency — these systems work; players just learn them from play rather than from the screen.

**Status: OPEN. Captured here for the first time.** This was previously only in conversation as a "flag for possible future pass" — the consolidated list is the right home for it.

---

## 6. FACTION_PAIRS gap

**Raised:** mentioned multiple times across the session as "out of scope, separate" (e.g., in the dead-code housekeeping task, the mechDesc correctness pass, the Naturalist Region Mastery build).

**Current state in code:** FACTION_PAIRS exists (referenced by the Diplomat L3+ Faction Harmony mechanic — `factionHarmony` state, `getHarmonyBonus()`, etc.). The "gap" was flagged but never specifically diagnosed in any recon during this session.

**Open decision:** unconfirmed — Jim has flagged FACTION_PAIRS as needing investigation but the specific issue (drift, sufficiency, or behavior bug) was never traced. A read-only recon would be the first step.

**Why not built now:** scope was deliberately not pulled in during any session work — flagged for separate future attention.

**Status: DIAGNOSED 2026-07-21 — see `faction_pairs_recon.md` (repo root). Fixes A + B + F + E-cheap applied same day** (harmony bonuses wired via `getFeatureVal`; vacuous `.every()` guarded; dead gates fixed; all reward strings and the Grand Alliance popup reworded to the real wired effects — see the recon doc's changelog). **Still open:** C (author the 12 missing Tidecrest/Skyreach pairs — the recon's §6 table preserves the cut pair-specific bonus ideas if C wants to revive them as real mechanics), D (cross-zone envoy decision), and a **balance flag** — the newly-live per-pair bonuses stack uncapped (full Cindervale harmony at Diplomat Lv5 = 180% buy discount); tuning is Jim's call.

---

## 7. Per-level-feature sufficiency expansion

**Raised:** Specialization & Prestige Description-Sufficiency Audit ("Expansion trigger: if the audit finds the insufficiency is widespread (rough guide: more than ~1/3 of specs/prestige fail on at least one surface), flag that explicitly with the count — that's the signal Jim set for expanding the sweep to all per-level class features later.")

**Current state:** the trigger fired. The sufficiency audit found 33% picker FAIL alone (8 of 24 entries) and 54% sub-bar (FAIL or THIN) on at least one surface. The fix sweep addressed all 13 sub-bar entries among specs/prestige, but per-level features (the individual Lv1-Lv10 feature descriptions for each base class, not just the spec/prestige choices) were **not audited**.

**Open decision:** whether to run the same sufficiency methodology against per-level features across all 5 base classes (Alchemist, Enchanter, Artificer, Scholar, Warden) × 10 levels each = 50 feature entries per class × 5 = 250 entries. Plus base-class feature/spec feature distinction adds complexity. Likely scope: 1-2 day audit + 1-2 day fix pass.

**Why not built now:** scoped as the trigger-fired expansion; Jim's call on whether/when to run.

**Status: OPEN.** Audit methodology already proven on the specs/prestige set; the expansion is a known-good multiplier of the same approach.

---

## 8. Spellweaver Stage-1 build

**Raised:** Spellweaver Planar Attunement combined recon + design-lock pass (just-completed).

**Current state in code:** UI + state + duration + convergence merging all exist; **none of the 16 declared planar effect keys are read anywhere**. System is 75% built, 0% mechanically wired.

**Open decision:** locked design exists (see `spellweaver_planar_designlock.md`). Stage 1 build implements all 18 effect-instances (14 keep-as-declared + 4 reinterpreted) at Tier 1, wires them into doEnchant integration sites per Part A's table, adds in-game guidance to the Planar Focus interface, updates mechDesc/handbook for text-truth.

**Why not built now:** waiting for Jim's review of the design-lock document. Stage 1 build is the next handoff after that review.

**Status: OPEN, AWAITING JIM'S REVIEW.** Build prompt generates the commit after lock is reviewed.

---

## Closed (for traceability)

These were live design questions earlier in the session and are now resolved:

| # | Question | Resolution |
|---|---|---|
| C1 | **Spellweaver Lv10 dual-type-combination capstone** (original orphaned mechDesc claim) | CLOSED: mechDesc correctness pass discovered `canDual=swLv>=10` code exists (the dual-plane mechanic is real). Reframed as "the effect keys aren't wired" — now tracked as #8. |
| C2 | **Transmuter Lv6 "Convert potions between types"** | CLOSED by the Transmuter rework build: capstone moved to Lv10 with full Potion Transmutation feature + P1+F1+I1 preservation policy (drop quality, drop freshness, drop infusion on output) + 2:1 ratio + cross-family-only target picker. |
| C3 | **Naturalist set-completion rewards** (mechDesc claimed "Completed journal sets unlock discovery bonuses and region-specific recipes" but no implementation) | CLOSED by the Naturalist Region Mastery build (T4 energy scaling): fully-documented zone = +1 max Energy/day; fully-documented region (all 8 zones of a location) = +5 max Energy/day. Full mastery ceiling = +52. |
| C4 | **Skyreach/Tidecrest FIELD_DISCOVERIES per-zone-targeted bonuses** (declared yieldMultiplier/discoveryChanceBonus/etc. were never read) | CLOSED by the Naturalist Region Mastery + FIELD_DISCOVERIES cleanup: 32 dead-shape entries converted to the engine's working shapes (`{ingredient, extraYield}` for flora/geological; `{dangerReduce}` for fauna). |
| C5 | **`doTransmute` energy-cost defect** (UI showed "Costs 25 Energy" but handler never called `spendEnergy`) | CLOSED by the Transmuter design lock §1a: accepted as intended-free design. Descriptions corrected down to reality; `freeTransmute` Lv10 effect vacated and repurposed to `canPotionTransmute`. |
| C6 | **Workshop room taxonomy "thin rooms" question** (4 of 7 rooms had ≤2 upgrades — tiering on per-room owned count wouldn't work for thin rooms) | CLOSED by the 8-room locked taxonomy: redistributed upgrades so each room has ≥2 upgrades; tier thresholds (t2, t3) tuned per room size. |
| C7 | **Workshop misfit cluster** (6 upgrades — shopfront/signage/display/ledger/quarters/hearth — had no clean home in the original 7-room model) | CLOSED by Jim's locked 8-room taxonomy: Storefront room (5 upgrades) + Living Quarters room (2 upgrades) absorb all misfits. |
| C8 | **Town/Nav layered backdrop design** (one image, two contexts via `resolveArt` for both tiles and screen backdrop) | CLOSED by the Town/Nav IA build: single resolver, layered fixed-position backdrop, region-aware and per-screen overrides. |
| C9 | **Spellweaver mechDesc "downgrade" (first correction)** (the first mechDesc correction wrongly removed the dual-plane convergence claim, thinking it was unbuilt) | CLOSED by the mechDesc correctness re-correction: dual-plane Planar Convergence text restored accurately (planes not enchantment-types). |
| C10 | **Region count derivation: 32 zones vs 4 locations** (Naturalist Region Mastery's "regions mastered" ambiguity) | CLOSED by Jim's locked T4 design: BOTH counts matter — per-zone mastery grants +1 each (32 max), per-location completion grants +5 each (4 max), additive. |
| C11 | **Spellweaver "downgrade" logged design question** (after first correction wrongly removed the capstone) | RE-SUPERSEDED: my own re-correction restored the dual-plane mechanic. Then re-superseded again by Spellweaver Phase 1 finding that the EFFECTS themselves are unwired — now tracked as #8 above. |

---

_File created at session end to consolidate open design questions for resumption in a future session. Cross-reference: `spellweaver_planar_designlock.md` for the Spellweaver Stage-1 build spec, `mechdesc_correctness_audit_phase1.md` for the mechDesc audit basis, `spec_prestige_sufficiency_audit.md` for the per-level expansion-trigger evidence._
