# Money System Recon — Denominated Display (Option A)

_Generated 2026-07-21. Read-only recon for the approved currency project: platinum/gold/silver denominations over the existing single-integer wallet, via the **silver reinterpretation** (existing numbers are declared to have been silver all along). No files changed._

## Locked design decisions (from the approval conversation)

1. **One integer, denominated display** (the WoW model). The internal wallet, all math, all bonuses, all saves stay exactly as-is. Only rendering changes.
2. **Silver reinterpretation:** current values are silver. Apprentice salary 7 → **7s**; potion sale ~30 → **3g**; workshop upgrade 2000 → **20pp / 200g**. No data migration, no save migration, no rebalance.
3. **Ratios:** classic 1pp = 10g, 1g = 10s. **Copper is flavor-reserved** — nothing prices below 1s today (min-price floors are 1), so no sub-silver granularity is needed mechanically. If it's ever wanted, that's a separate ×10 base-unit migration project.
4. **The Firestore/save field stays named `gold`.** It's an internal key; renaming would orphan every cloud save. The reinterpretation is purely presentational.

## Formatter spec

One helper, defined near the top of index.html's script (available everywhere):

```js
// n is in silver (the base unit). 1g = 10s, 1pp = 10g.
const fmtMoney=(n)=>{
  const neg=n<0?'-':'';n=Math.abs(Math.floor(n));
  const pp=Math.floor(n/100),g=Math.floor(n%100/10),s=n%10;
  if(pp>0)return neg+pp+'pp'+(g?' '+g+'g':'');
  if(g>0)return neg+g+'g'+(s?' '+s+'s':'');
  return neg+s+'s';
};
```

- Shows the two largest non-zero denominations (`12pp 5g`, `3g 4s`, `7s`) — compact enough for buttons and log lines.
- Negative amounts carry the sign through (debt, losses).
- Display-convention choice (two-denomination vs. full triple) is a one-function tune later.

## Site inventory

### index.html — the sweep target (~170 display sites)

| Pattern family | Count | Examples |
|---|---|---|
| JSX / template `}g` interpolations | 74 | `{sp}g ea`, `` `${price}g` `` |
| String-concat `+'g'` | 63 | `'(+'+sp+'g)'` in addLog/showResult |
| Suffix variants (`g ea`, `g/day`, `g)`…) | 32 | morning report lines, tooltips |

Every one becomes `fmtMoney(x)` (or keeps its label with the formatted value). The overlap between families is small; **plan for ~150-170 distinct edits**, spread across: shop buy/sell, potion/enchant customers, quests & board quests, staff payroll & morning report, shelves, caravans & supply chains, clinic, forge & shield commissions, venom contracts, brand orders, debt, settlement projects, museum/relics, Hollow March, town events, lineage summary, character sheet.

### index.html — explicitly UNCHANGED (math layer)

- **79 `setGold` mutations** and **24 affordability checks** (`gold>=x`) — untouched; same integer, same meaning.
- **`GOLD_MULT`** — a multiplier on amounts; display-agnostic; untouched.
- **Special systems verified same-unit integer math, display-only exposure:** debt, lineage gold-percentage transfer, brand orders, forged-weapon `goldValue`, shelf income, settlement costs, museum income (92 lineage/debt references checked by shape — no division-for-display anywhere).
- **19 💰 icons** — stay (generic money icon).

### game-data.js — 25 literal amount strings

Feat descs (`+2g per potion sale`), upgrade descs (`+5g/day passive`), town-event messages (`+20g, +50 XP`), the `wealthy` milestone (`500 gold`), settlement effectDescs (`+50g/morning`). Under reinterpretation these become `s` — **mechanical suffix swaps** since each literal matches its numeric effect 1:1. Numeric fields (`price`, `val`, `cost`, `salary`, `gPer`) are untouched.

Percent-phrasings ("+30% gold from quests") and generic prose uses of "gold" stay — in a silver-standard economy "gold" as slang for money is period-authentic; rewording ~dozens of flavor strings to "coin" is optional polish, not correctness.

### cindervale_handbook.html — 48 gold mentions

Editorial pass: amount suffixes to match, plus a new short **"Coinage of the Realm"** sidebar (1pp = 10g = 100s) — the natural home for the diegetic switchover note ("the Cindervale mint standardizes coinage"). Existing players' balances keep their value; only the label changes.

## Build plan (phased, each phase shippable)

1. **Core:** `fmtMoney` helper + the header wallet display + the top surfaces (market buy/sell, morning report, quest rewards). Highest-visibility, ~40 sites.
2. **The long sweep:** remaining ~120 sites, system by system, grep-audited per family as each system completes.
3. **game-data text pass:** the 25 suffix swaps (+ cache bump).
4. **Handbook pass** + Coinage sidebar.
5. **Verification:** residual-pattern grep lint must return zero (`\}g[\s<)'"·,.]`, `\+'g`, suffix variants); `node -c`; full browser walkthrough of shop → quests → staff → morning report → clinic/forge panels; cache bumps per convention.

**Estimate:** 1–2 sessions. **Risk: low** — every edit is a display substitution; a missed site shows a raw number with a stale "g" suffix (reads 10× wrong), which is exactly what the grep lint exists to catch. **Zero save-compat risk** by construction.

## Small decisions for Jim (none blocking Phase 1)

1. Display convention: two largest denominations (recommended, spec'd above) vs. always-full `Xpp Yg Zs`. **DECIDED: recommended.**
2. Whether "Gold" section labels (morning report, stats) become "Coin"/"Earnings" or stay colloquial. **DECIDED: "Earnings" for the report section; "Coin" for stat labels.**
3. Whether to eventually re-flavor generic "gold" prose to "coin" (optional polish pass). **DECIDED: yes — apply during the sweep phases.**
4. Copper: stays flavor-only unless a future feature wants sub-silver pricing. **DECIDED: flavor-only.**

## Changelog

- **2026-07-21 — Phase 1 complete (~55 sites).** `fmtMoney` defined top-level next to `volToDb` (silver base, two largest non-zero denominations, sign-aware). Converted: header wallet + debt chip, character summary line, save-slot summaries, the full Market screen (buy rows, sell rows incl. Sell All / Safe-trim buttons and their logs, black market), the workshop Sell panel rows, the complete morning-report family (Earnings section title + net line + every goldLines/report.push/qmLines/autoLines/clockLines/procurement/what's-new money value), quest cards + board-quest cards + quest dialogs + the enchant-customer reward line, and the "Daily Gold"→"Daily Coin" stat label. Verified live: save slot renders `2g` from stored 20; Market shows `6s` herbs, `1g 1s` reagents, `1s ea` sell rows; clean boot. Residual display sites for Phase 2: **~84** (pattern-family grep 86 minus the formatter's own 2 lines).
  - **⚠️ Coupling found for Phase 2:** the Earnings section *parses* staff shopkeeping report strings with `/\+(\d+)g/` (index.html ~5443) to extract amounts — those source strings must stay raw-suffixed until the parser and the string builders are converted together (or the source switches to a numeric field).
- **2026-07-21 — Phase 2 complete (~75 sites): index.html display sweep DONE.** Every remaining money display converted across: relics (appraise/sell/museum), outposts & fortresses, Hollow March (crisis costs, wave/final rewards, looting), brew/enchant result popups, planar surge & Feywild/Void-Storm compensation lines, potion orders, venom contracts, forge & shield commissions, supply chains & caravan contracts (setup/maint/upgrade), bulk sell, quest/board completion logs, workshop sell panel (all button variants + logs), black market (prices, fines, commissions), debt banner & crisis threshold, staff hiring/salaries (cards, tooltips, sidebar), settlement projects, companion & wild-ally income lines, brand orders, dev cheat buttons, and hardcoded literals (base upkeep −5, museum +10/morning). **Coupling resolved properly:** the staff shop report entry now carries a numeric `gold` field; the Earnings section reads it directly — the `/\+(\d+)g/` regex is gone. **Decision-3 prose pass applied** to index.html: generic "gold" → "coin" in ~20 player-facing strings (task descs, tooltips, role descs, risk warnings, the forge guidance strip); scenic/poetic uses left alone.
  - **Verification:** full-pattern residual lint returns ZERO player-facing sites (only the formatter, the cache-bust URL, and 3 code comments). Live walkthrough: title 2g wallet, customer queue "Pays 1g 2s + 7 XP", enchant requests "+7g 7s" / "+6g 2s", clean boot, no console errors.
  - **Remaining:** Phase 3 (game-data's 25 literal suffix strings + cache bump), Phase 4 (handbook pass + "Coinage of the Realm" sidebar).
- **2026-07-21 — Phase 3 complete: game-data text conversion DONE.**
  - **All 25 literal amount strings hand-converted to true denominated form** — since the strings are static data (no formatter available), each was re-expressed in coins: `+2g per potion sale` → `+2s`, `+20g` donations → `+2g`, `+10g/morning` museum → `+1g/morning`, `+15g` climber win → `+1g 5s`, `+50g/morning` settlement → `+5g/morning`, the Spellweaver Feywild `−10g refund` → `−1g refund`, and the Golden Touch milestone `Accumulated 500 gold` → `Accumulated 50 gold` (500 units = 50g exactly — the threshold code is unchanged). Numeric effect/threshold fields untouched throughout.
  - **Decision-3 word pass applied to game-data:** ~49 mechanics-generic "gold" phrasings converted to "coin" via targeted phrase replace-alls (`% gold`, `premium gold`, `quest gold`, `pay 3× gold`, `passive gold`, `less gold`, `that cost gold`, etc.). The 31 remaining "gold" mentions are deliberate keeps: literal-gold ingredient flavor (Cursed gold, alchemically pure gold), NPC idioms ("worth its weight in gold", "Keep the gold"), scenic text (golden sap, golden scarab), "gold coins on the beach" (literally correct), and code fields/comments. "Lead to Gold" and "Golden Touch" names preserved.
  - Verified: `node -c` clean (4,969 lines); cache-bust → `?v=20260721h`; in-browser check confirms converted strings loaded and a programmatic scan of FEATS/UPGRADES/CLASSES/specs/mechDescs/FACTION_PAIRS/TOWN_EVENTS finds zero stale multi-digit `g` literals.
  - **Remaining: Phase 4 only** — handbook pass (48 mentions) + the "Coinage of the Realm" sidebar with the diegetic mint-standardization note.
