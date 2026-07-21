# Per-Level Base-Class Feature Sufficiency Audit

_Generated 2026-07-21. The trigger-fired expansion of the Specialization & Prestige Description-Sufficiency Audit (open design question #7). Bar: "Could a player who has never played this class read ONLY this text and understand what the mechanic concretely does, well enough to make an informed choice?" Scope: the 50 base-class features (5 classes × 10 levels). Spec/prestige features were covered by the prior audit._

## Surfaces

Unlike the spec audit (which found `mechDesc` orphaned by the picker), base-class features have **one text source — `f.desc`** — rendered at every surface, so a desc fix propagates everywhere:

1. Level-up wizard class card (index.html ~7783): `Lv{n}: {name} — {desc}` — the decision surface.
2. Wizard inline "View Full Progression" (~7798): all features with descs.
3. Wizard confirm step (~8087): `Gained: {name} — {desc}`.
4. Class-detail modal (~6663): desc + auto-generated effect tags.
5. Handbook class chapters (hand-authored HTML, separately maintained — fixes must be mirrored).

## Summary

- **Audited: 50/50.** PASS: **43**. Sub-bar: **7** (plus 1 out-of-scope display bug found in a spec feature).
- The 2026-05 accuracy sweeps left these descs in strong shape — most carry concrete numbers. The sub-bar residue is: 2 stale/wrong mechanic claims, 1 phantom skill name, 1 omitted wired effect, 1 unquantified chance, 1 pre-energy-refactor terminology leftover, and 2 literal `&mdash;` entities (JSX renders JS-string HTML entities as raw text — the handbook's copy is fine because it IS HTML).

## Verdicts

| Class | Lv | Feature | Verdict | Issue |
|---|---|---|---|---|
| Alchemist | 1 | Potion Crafting | PASS | |
| Alchemist | 2 | Ingredient Sense | PASS | |
| Alchemist | 3 | Specialization | PASS | |
| Alchemist | 4 | Efficient Brewing | PASS | |
| Alchemist | 5 | Double Batch | PASS | |
| Alchemist | 6 | Intuitive DC | **FAIL** | "10% lucky brew chance for bonus potions" — the wired mechanic (index.html ~2888) converts a **failed** brew (non-nat-1) into a success 10% of the time. Nothing grants bonus potions. |
| Alchemist | 7 | Master Brewer | PASS | |
| Alchemist | 8 | Reagent Attunement | **THIN** | "may yield" hides the actual rate: 30% per successful forage roll (~1878), +1 ingredient from your most-brewed recipe when it grows in the region. |
| Alchemist | 9 | Perfected Art | PASS | |
| Alchemist | 10 | Magnum Opus | PASS | |
| Enchanter | 1 | Inscribe Enchantment | PASS | |
| Enchanter | 2 | Mana Flow | PASS | |
| Enchanter | 3 | Specialization | PASS | "+5 inscription bonus" matches the key's real behavior |
| Enchanter | 4 | Arcane Mastery | **FAIL** | "+8% enchant success chance" — `enchantSuccessFlat` is a **flat check bonus** added to the d20 total (capped at +20, index.html ~3294), not a percentage. Same key is phrased correctly as "flat bonus" at Enchanter Lv10, Wardkeeper Lv10, and the character sheet. |
| Enchanter | 5 | Dual Inscription | PASS | |
| Enchanter | 6 | Resonance | PASS | |
| Enchanter | 7 | Overcharge | PASS | |
| Enchanter | 8 | Archmage | PASS | |
| Enchanter | 9 | Rune Library | PASS | |
| Enchanter | 10 | Reality Weaver | PASS | |
| Artificer | 1 | Technical Crafting | PASS | |
| Artificer | 2 | Salvage | PASS | |
| Artificer | 3 | Specialization | PASS | |
| Artificer | 4 | Calibration | **FAIL (display)** | Desc contains literal `&mdash;` — JSX renders it as raw text in all 4 in-game surfaces. (Handbook copy renders fine.) |
| Artificer | 5 | Overclock | PASS | |
| Artificer | 6 | Production Line | PASS | |
| Artificer | 7 | Prototype | PASS | |
| Artificer | 8 | Grand Artificer | PASS | |
| Artificer | 9 | Systematic Mastery | **THIN** | Desc omits the wired `batchSuccessBonus:0.15` — a real +15% batch success the player is never told about (visible only as an effect tag in one modal). |
| Artificer | 10 | Masterwork Engine | PASS | |
| Scholar | 1 | Research Study | **FAIL** | Claims proficiency in "Research and Lore" — there is no Lore skill; actual profSkills are Research and **Analysis**. Also omits the wired +5% XP. |
| Scholar | 2 | Speed Reader | PASS | |
| Scholar | 3 | Specialization | PASS | |
| Scholar | 4 | Eureka! | PASS | |
| Scholar | 5 | Academic Network | PASS | |
| Scholar | 6 | Cross-Reference | PASS | |
| Scholar | 7 | Thesis Defense | PASS | |
| Scholar | 8 | Grand Theorem | PASS | |
| Scholar | 9 | Polymath | PASS | |
| Scholar | 10 | Omniscience | PASS | |
| Warden | 1 | Trailblazer | PASS | |
| Warden | 2 | Enduring Spirit | PASS | |
| Warden | 3 | Specialization | PASS | |
| Warden | 4 | Iron Constitution | **THIN** | "events that cost time" — stale pre-energy-refactor terminology; the Phase 4 sweep converted this phrasing elsewhere but missed this desc. |
| Warden | 5 | Expert Forager | PASS | |
| Warden | 6 | Deep Mapping | PASS | |
| Warden | 7 | Wilderness Mastery | PASS | |
| Warden | 8 | Expedition Commander | PASS | |
| Warden | 9 | Indomitable | PASS | |
| Warden | 10 | Legend of the Wild | PASS | |

**Out-of-scope find:** Reclaimer Lv10 (spec feature) also carries a literal `&mdash;` — same one-character fix, included in the fix pass.

## Fix pass (applied same day)

All 7 sub-bar descs rewritten in `game-data.js`; the 5 affected handbook rows mirrored (`cindervale_handbook.html`); both `&mdash;` entities replaced with literal em-dashes. Ground truth for each rewrite verified at the read site before wording (luckyBrewChance ~2888, attunedForaging ~1878, enchantSuccessFlat ~3294). Handbook's own `&mdash;` left alone (valid HTML there).

## Changelog

- **2026-07-21** — Audit run and closed in one pass: 50/50 audited, 43 PASS, 7 fixed (+1 spec-side display fix). Open design question #7 closed.
