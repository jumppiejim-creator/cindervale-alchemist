# FACTION_PAIRS Recon — Diplomat Embassy & Faction Harmony

_Generated 2026-07-21. Read-only recon of the FACTION_PAIRS / Faction Harmony system, resolving open design question #6 ("FACTION_PAIRS gap — OPEN, UNDIAGNOSED") in `_migration/open_design_questions.md`. No files changed._

## Changelog

- **2026-07-21 — Fixes A + B + F applied** (same session as the recon; line refs below are pre-fix):
  - **A (variant):** instead of wiring `getHarmonyBonus` at 4 individual read sites, the function was **moved next to `getFeatureVal` and called from inside it** (single integration point). Every read of `shopRestockBonus` / `buyDiscount` / `repGainBonus` / `sellBonus` — including all ~10 sellBonus sites and the character-sheet displays — now picks up harmony automatically. `getFeatureVal`'s useCallback deps extended with `factionHarmony, gameLocation, prestigeLevels`.
  - **B:** `pairs.length>0 &&` guards added to all four `.every()` sites (inside the relocated `getHarmonyBonus`, the envoy Grand-Alliance check, the legendary-restock check, and the Embassy banner). The stale code comment documenting the free-legendary-stock behavior was rewritten.
  - **F:** `dLv>=6` → `dLv>=3` (success popup + Embassy header note); lock label corrected to "Diplomat Lv3/Lv5"; stale `energy>=25` gate removed from the envoy button.
  - **Smoke-tested:** full new game started in Skyreach (a zero-pair zone) — Babel compiles clean, game boots and runs with the new `getFeatureVal` path executing; no console errors.
  - **⚠️ Balance flag (new open question):** the newly-live designed numbers stack per pair with no cap. Full Cindervale harmony (6 pairs) at Diplomat Lv5: buyDiscount 6×0.15×2 = **180%** (everything floors to 1g), repGainBonus (6×0.25+0.5)×2 = **+400%**, shopRestockBonus 6×2×2 = **+24 items**. These are the function's designed values, wired faithfully — a tuning/cap pass is Jim's call (natural home: the E text/tuning pass).
  - **Still open:** C (author the 12 missing Tidecrest/Skyreach pairs), D (cross-zone envoy decision), E (reward-string truth pass).
- **2026-07-21 — Fix E (cheap path) applied:**
  - All 9 pairs' `rewards` arrays rewritten to the three real, wired effects: `['Shop stocks +2 extra items daily','15% vendor discount','+25% all reputation gains']`. The unimplemented promises ("Cross-faction quests", the 9 pair-specific tier-3 bonuses) are removed from player-facing text; they remain catalogued in §6 above if Jim ever wants to build them for real. Pair flavor `desc` lines untouched.
  - Grand Alliance envoy popup: "All vendors stock everything" replaced with the real benefits (+25% sell prices, daily legendary shop ingredient).
  - Diplomat Lv4 `desc` (game-data.js) rescoped so the "+50% rep / +25% sell" claims are correctly conditional on the all-pairs-maxed state (they come from `getHarmonyBonus`'s Grand Alliance branch, not an unconditional Lv4 effect — the feature's own `effects:{}` block is prestige-dead per the class audit's structural finding).
  - A side effect of the tier-2 rewrite: the Embassy tier chips (which display the first comma-segment of each reward string) previously showed the fake "Cross-faction quests" as the tier-2 chip; they now show "15% vendor discount".
  - Verified: `node -c game-data.js` clean, line count 4,902 (unchanged), game boots in browser with no console errors. Handbook checked — it never carried the fake pair-reward claims, so no handbook edits needed.
  - **Still open:** C (missing Tidecrest/Skyreach pairs), D (cross-zone envoy decision), the balance flag above.
- **2026-07-21 — Fix C applied: the 12 missing pairs authored.**
  - 6 Tidecrest pairs (`fp_tc_*`) + 6 Skyreach pairs (`fp_sr_*`) added to `FACTION_PAIRS`, following the Ashfall id convention, two-emoji icons from the faction records, one-line antithesis flavor descs grounded in each faction's tier-bonus lore, and the truthful E-pass reward strings. DC spread per zone is {10,10,11,11,12,13} — the same distribution as Cindervale, with each zone's "hardest alliance" (DC 13) mirroring the steel-vs-mysticism / faith-vs-commerce tensions of the original set (Tidekeepers ↔ Merchant Marine; Skywardens ↔ Windrunners).
  - Verified live: `FACTION_PAIRS.length === 21` (6/3/6/6 by zone), no duplicate ids, every faction reference valid and loc-consistent, all rewards arrays complete. `node -c` clean; game-data.js now 4,940 lines.
  - **Cache-bust discovery:** game-data.js is loaded as `game-data.js?v=YYYYMMDDx` in index.html — the browser caches by that URL, so data edits are invisible until the param is bumped (this recon's browser test initially served the stale March data). Bumped to `?v=20260721a`. Convention noted in CLAUDE.md.
  - Grand Alliance is now achievable in all four zones. Ashfall's 3-pair alliance remains the easiest (3 factions); that asymmetry is inherent to the faction roster, not a bug.
  - **D just got more pressing:** the Embassy panel's unfiltered pair list now renders all 21 pairs in every zone. Recommend the loc filter (D) as the next fix.
  - **Still open:** D (cross-zone envoy decision + loc-filter the Embassy list), the balance flag above.
- **2026-07-21 — Fix D applied: envoys are local-only.**
  - Embassy panel now renders `uiPairs` (the loc-filtered list already computed for the Grand Alliance banner) instead of the full unfiltered `FACTION_PAIRS` — each zone shows only its own pairs (6, or 3 in Ashfall).
  - `dispatchEnvoy` gained a defense-in-depth loc guard: dispatching a non-local pair logs "`{pair.name}` is a `{loc}` matter — travel there to send an envoy." (unreachable via the filtered UI, but protects any future call path).
  - Sidebar harmony section's outer gate is now loc-aware, matching its inner list — no more empty "🤝 Faction Harmony" header when all your harmony lives in another zone.
  - Harmony built cross-zone before this fix is untouched in state and simply becomes visible/active again when the player travels to that pair's zone — no migration needed, since every bonus read site was already loc-filtered.
  - Verified: JSX compiles (Babel clean), game boots with no console errors; `uiPairs` scope confirmed within the Embassy IIFE.
  - **Recon fix menu now fully closed: A, B, C, D, E-cheap, F all applied 2026-07-21.** The only open thread is the balance flag (uncapped per-pair stacking — Jim's tuning call), plus the §6 table's cut pair-specific bonus ideas if they're ever wanted as real mechanics.
- **2026-07-21 — Balance flag resolved: `HARMONY_CAPS` zone-total ceilings.**
  - New tunable table in game-data.js (directly below `FACTION_PAIRS`): `HARMONY_CAPS={shopRestockBonus:8,buyDiscount:0.45,repGainBonus:1.0,sellBonus:0.25}`. One clamp line in `getHarmonyBonus`, applied **after** the Lv5 Ambassador doubling — the caps are absolute ceilings, so the doubling accelerates reaching a cap rather than raising it. Tuning is a one-line data edit; logic never needs touching.
  - Before → after at full harmony + Diplomat Lv5 (6-pair zones): buy discount 180% → **45%**; rep gains +400% → **+100%**; restock +24 → **+8**; sell +50% → **+25%** (now matching the Grand Alliance banner text exactly).
  - Deliberate side effect: all four zones (3-pair Ashfall included) reach identical capped maxima — zone parity for the Diplomat regardless of roster size.
  - Ambassador Lv5 desc updated: "Faction harmony bonuses doubled (up to zone caps)." Cache-bust bumped to `?v=20260721b`.
  - Verified: `node -c` clean (4,944 lines); console simulation of the exact `getHarmonyBonus` math confirms all four zones converge on the capped values at full harmony + Lv5; game boots with no errors.
  - **All recon threads now closed.** Remaining ideas (§6 pair-specific bonuses) are future content, not defects.
- **2026-07-21 — §6 pair-specific bonuses BUILT: all 9 original tier-3 rewards are now real mechanics.**
  - Each of the 9 original pairs gained an `effect:{}` block (tier-3 / Harmony 3 gated): Forgeheart Tincture +2 brew checks (`recipeBonus_forgeheart_tincture`), healing potions +25% value (`categoricalBrewBonus`), weapon enchants +25% gold (`categoricalEnchantBonus`), +1 forage yield in Ashfields & Deep Mines (`regionForage_<id>`), +10% research discovery, Celestial Balm +2 brew checks, +10% sell prices, caravan routes −1 day (`caravanSpeedBonus`), 10% fewer expedition dangers (`reducedRisk`). Tier-3 reward strings updated to advertise them (specific bonus leads, so the Embassy chips show it).
  - **Infrastructure:** `getHarmonyBonus` walks `pair.effect` at h≥3 into a separate accumulator — pair effects are **exempt from the Lv5 doubling and HARMONY_CAPS** (each exists on exactly one pair; no stacking risk). `getCategoricalBonus` now also walks local pairs' categorical blocks (deps extended). Flattened keys follow the `factionBonusDrop_<id>` house convention.
  - **New read sites:** brew-check `recipeBonus_<recipeId>` (with 🤝 Harmony roll-breakdown label); forage-loop `regionForage_<regionId>` (+N random region ingredient per successful roll); caravan `caravanSpeedBonus` at dispatch calc + route display (floor 1 day); categorical `potionValueBonus` at the 4 potion-price sites (customer gen ×2, shelf-sale calc, morning-report display). `discoveryChanceBonus` / `sellBonus` / `reducedRisk` needed zero new sites — they flow through existing `getFeatureVal` reads.
  - Values moderated from the original 2× strings (25% / +2 checks / flat 10%) to fit the capped post-balance economy; original intent preserved, magnitudes sane.
  - Verified: `node -c` clean (4,957 lines); browser console sim confirms all 9 effects resolve to designed values in their home zones and 0 cross-zone; game boots clean. Cache-bust → `?v=20260721c`.
  - **Open (minor):** the 12 Tidecrest/Skyreach pairs still have generic tier-3 rewards — designing 12 new pair-specific bonuses for them is future content authoring (needs Jim's flavor direction).

> **Headline**: the flagged gap is real but it is the *smaller* of two problems. (1) Tidecrest and Skyreach have **zero** harmony pairs, so the Diplomat's signature mechanic doesn't exist in half the game and `.every()`-on-empty makes Grand Alliance vacuously "achieved" there. (2) Worse: **`getHarmonyBonus()` is defined but never called** — every percentage bonus the harmony system promises (shop stock, vendor discount, rep gains, Grand Alliance, the Lv5 Ambassador doubling) is dead code. The class feature audit verified the function's internals but never verified a call site.

## 1. System map

| Piece | Where | What it is |
|---|---|---|
| `FACTION_PAIRS` | game-data.js:2821-2850 | 9 pair records: id, loc, factions[2], name, icon, dc, desc, rewards[3] (display strings — **no effects field**) |
| `factionHarmony` | index.html:554 | `{pairId: 0-3}` state, save/undo persisted |
| `getMaxEnvoys` / `getHarmonyCap` | index.html:3813-3814 | Diplomat Lv1/3/5 → 1/2/3 envoys per day, harmony cap 1/2/3 |
| `dispatchEnvoy(pairId)` | index.html:3815-3855 | Free action, Persuasion check vs `dc + harmony×2` (+Networking mod), success → harmony+1, XP, Lv3+ rep |
| `getHarmonyBonus(effectKey)` | index.html:3856-3873 | **DEAD — never called.** Would grant per-pair shopRestockBonus+2 (h≥1), buyDiscount+0.15 (h≥2), repGainBonus+0.25 (h≥3), Grand Alliance repGainBonus+0.50 / sellBonus+0.25, Lv5 ×2 |
| Legendary restock | index.html:5270-5284 | Diplomat Lv4+ and all local pairs at harmony 3 → one `val≥25` ingredient in daily shop at 2× price. **Live.** |
| Embassy UI panel | index.html:9704-9756 | Pair list, envoy buttons, Grand Alliance banner |
| Sidebar harmony display | index.html:12009-12021 | Per-pair stars + first reward string |

## 2. The data gap (the original flag — CONFIRMED)

Faction rosters (`FACTIONS`, game-data.js:3377-3510) vs. defined pairs:

| Zone | Factions | Possible pairs | Defined | Status |
|---|---|---|---|---|
| Cindervale | 4 (ashwardens, hearthkeepers, veilwalkers, cinderfolk) | 6 | **6** | ✓ complete |
| Ashfall | **3** (sand_merchants, flamekeepers, dustwalkers) | 3 | **3** | ✓ complete |
| Tidecrest | 4 (harbormasters, pearl_divers, tidekeepers, merchant_marine) | 6 | **0** | ✗ **missing** |
| Skyreach | 4 (skywardens, starcallers, cloud_traders, windrunners) | 6 | **0** | ✗ **missing** |

- `FACTION_SUBS`/`locFaction` (game-data.js:665-686) is never applied to FACTION_PAIRS — no substitution mechanism rescues the missing zones.
- Side-note for CLAUDE.md accuracy: the zone table says each zone has 4 factions — **Ashfall actually has 3** (its FACTION_SUBS rows map two Cindervale factions onto flamekeepers).

## 3. The dead bonus engine (NEW finding — bigger than the flag)

`getHarmonyBonus` appears exactly twice in index.html: its definition (3856) and a comment (5272). **No call site exists.** Cross-checked: `getFeatureVal` (index.html:689-750) walks classes/specs/feats/factions/lore/buffs/museum/mentor/legacy — it never touches `factionHarmony` and never calls `getHarmonyBonus`. The natural read sites are all harmony-blind:

- Shop restock count (5243) reads `getFeatureVal('shopRestockBonus')` + a direct Diplomat-Lv2 gate — no harmony term.
- `getBuyPrice` (1189) reads `getFeatureVal('buyDiscount')` — no harmony term.
- `addRep` (1191) reads `getFeatureVal('repGainBonus')` — no harmony term.
- No sell-price site reads a harmony `sellBonus`.

**What harmony actually does today**: envoy XP (`20+10×harmony`, 3833); +5 rep to both factions per successful envoy at Diplomat Lv3+ (3832); the Lv4 legendary restock item at all-maxed (5275-5284); star displays in the Embassy panel and sidebar. Everything else the UI promises is inert.

How the class feature audit missed it: Diplomat rows 3-5 in `class_feature_audit.md` cite "`getHarmonyBonus()` at 3262-3277" as the wiring and verified the function's *internals* (including the Lv5 `total*=2`), but a call-site check was never performed. The audit's ✓ for Diplomat Lv3/Lv4/Lv5 harmony bonuses is therefore wrong in effect (the Lv4 legendary-stock redesign and Lv5 repSpillover parts ARE live).

## 4. Vacuous Grand Alliance in pairless zones (CONFIRMED, partially known)

`FACTION_PAIRS.filter(fp=>(!fp.loc||fp.loc===gameLocation)).every(...)` on an empty list returns `true`. In Tidecrest/Skyreach:

- **Embassy banner** (9711-9719): any Diplomat Lv1+ permanently sees "🏛️ Grand Alliance Active! … +50% rep gains, +25% sell bonus" — doubly false (vacuously earned, and the bonuses are dead per §3).
- **Legendary restock** (5275-5284): Diplomat Lv4+ gets the daily legendary item with zero harmony work. Known — documented in the code comment at 5270-5274 as a pre-existing gap.
- The same vacuous `allMax` exists inside `getHarmonyBonus` (3865) — moot while dead.

## 5. Cross-zone leakage (NEW finding)

The Embassy pair list at **9721 renders `FACTION_PAIRS.map(...)` unfiltered** — all 9 pairs are visible and dispatchable from any zone, and `dispatchEnvoy` (3816) has no loc guard. Every other harmony site filters by `gameLocation` (3842, 3858, 3865, 5276, 9711, 12013). Consequences:

- A Diplomat in Tidecrest sees (only) Cindervale + Ashfall pairs and can build their harmony remotely.
- A Cindervale Diplomat can max Ashfall pairs that then count toward *nothing* locally (loc-filtered out of Grand Alliance and the legendary restock).
- Sidebar cosmetic: the outer gate (12010) checks harmony globally but the list (12013) filters by loc — build harmony in zone A, travel to zone B, and an empty "🤝 Faction Harmony" header box renders.

## 6. Reward-string drift (display promises with no implementation)

Pair records have no effects field; rewards are prose. Cross-checked each promise:

| Promise (tier) | Where | Reality |
|---|---|---|
| "Both shops +2 items" (h1) | all 9 pairs | Dead — only via uncalled `getHarmonyBonus` |
| "Cross-faction quests" (h2) | all 9 pairs | **No such system exists anywhere.** (The Diplomat Lv2 *class-feature* version of this claim was already dropped in the 2026-05-13 redesign — the pair strings still make it) |
| "15% vendor discount" (h2) | all 9 pairs | Dead — uncalled `getHarmonyBonus` |
| "+25% rep both" (h3) | all 9 pairs | Dead — uncalled `getHarmonyBonus` (and it would be global rep, not both-factions) |
| Pair-specific h3 bonuses (9 unique: Forgeheart Tincture bonus, healing 2× to Ashwardens, enchanted weapons 2×, forage +1 mines/ashfields, mine-recipe research, Celestial Balm −2 DC, sell +10% both, caravans −1 day, expedition danger −10%) | one per pair | **Zero wiring for any of them** — no data field, no read site |
| "All vendors stock everything" (Grand Alliance popup, 3845) | envoy success path | Not implemented — actual benefit is the single legendary restock item |

The handbook's Diplomat entries repeat the harmony-bonus promises (e.g. cindervale_handbook.html:868 "Faction harmony bonuses doubled") — same drift by inheritance.

## 7. Minor gate/UI bugs found in passing

- **3838**: success popup appends "+5 rep with both factions" only when `dLv>=6` — impossible (Diplomat `maxLv:5`). The rep IS granted at `dLv>=3` (3832); the message just never shows. Same bug family as the fixed `dLv>=10` typo.
- **9715**: "· +5 rep per successful envoy" header note gated `dLv>=6` — never shows.
- **9736**: cap-locked pairs show "🔒 Lv6/Lv10 to advance" — the real thresholds are Diplomat Lv3/Lv5 (`getHarmonyCap`). Looks like leftovers from a pre-prestige level scheme.
- **9724**: `canSend` requires `energy>=25`, but the envoy is a free action (3821-3822, and the button's own title says so) — stale precondition from when envoys presumably cost 25 energy; greys the button out for no reason at low energy.

## 8. Fix menu (costed, for Jim to pick — nothing built)

Ordered by value-per-line; A-D are independent of each other:

- **A. Un-dead the bonus engine (~4 lines, high value):** call `getHarmonyBonus('shopRestockBonus')` at 5243, `getHarmonyBonus('buyDiscount')` inside getBuyPrice (1189), `getHarmonyBonus('repGainBonus')` inside addRep (1191), and `getHarmonyBonus('sellBonus')` at the sell-price site. Instantly makes tiers 1-3 + Grand Alliance + Lv5 doubling real, exactly as the UI already advertises.
- **B. Guard the vacuous `.every()` (~3 one-line edits):** prefix `pairs.length>0 &&` at 9711, 5276 (and 3865 if A lands). Kills the false banner and the free legendary stock in pairless zones. Cheap, worth doing even if C lands later.
- **C. Author the missing 12 pairs (~40 data lines + reward design):** 6 Tidecrest + 6 Skyreach entries following the existing shape. Pure content authoring; makes the Diplomat whole in all zones and organically fixes §4. Needs Jim for names/DCs/flavor.
- **D. Fix the leakage (~2 edits):** add the loc filter to 9721's map; add a loc guard (or an explicit "remote envoy" decision) to `dispatchEnvoy`. Also tighten the sidebar outer gate (12010) to the loc-filtered list.
- **E. Reward-string truth pass (~10 string edits OR a large build):** cheap path — reword tier-2/tier-3 strings and the Grand Alliance popup down to what's real (post-A: restock/discount/rep are real; strike "Cross-faction quests" and the 9 pair-specific bonuses, or move them to "future"). Expensive path — actually build the 9 pair-specific bonuses (each is its own read-site integration; Spellweaver-effects-class work, ~10-30 lines each).
- **F. Minor gates (~4 one-line fixes):** `dLv>=6`→`>=3` at 3838 and 9715; correct 9736's labels to Diplomat Lv3/Lv5; drop the `energy>=25` term at 9724.

**Recommended sequence if all are wanted: A + B + F (small, immediate truth/function wins) → E-cheap (text honesty) → C (content) → D (behavior decision: block cross-zone envoys or embrace them).**
