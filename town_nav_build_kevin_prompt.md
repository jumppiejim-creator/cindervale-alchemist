# Kevin Task: Build the Town / Navigation IA Redesign

## Read first

The authoritative spec is `town_nav_design_lock.md` (provided alongside this prompt). This build implements it. Where this prompt and the design lock ever differ, **the design lock wins** — flag the discrepancy rather than guessing. The prior read-only recon already mapped the plumbing; this is the build pass.

All 25 art images are generated and will live at `https://jumppiejim-creator.github.io/cindervale-alchemist/<filename>`. The build does **not** wait on art deployment — the `onError`-hide + gradient fallback means the UI works fully against missing images and the art populates independently once Jim pushes it.

## What you're building (4 pieces)

1. A populated `TOWN_IMGS` table.
2. One unified art resolver, used for both hub-tile art and screen backdrops.
3. The art-driven town hub (9 tiles) + a thin always-visible icon stub bar replacing the redundant 10-tab header.
4. A working back-to-town affordance via the dormant `BackBar` `back` prop.

Do these in order. After each, sanity-check before moving on.

---

## Piece 1: Populate `TOWN_IMGS`

`TOWN_IMGS` is referenced in code (nav-bar thumbnails ~line 6928, screen-background ~line 6950) but never defined; both sites already fall back gracefully. Define it in `location-images.js` (alongside `ZONE_IMGS`/`ROOM_IMGS`, same convention). Exactly these 25 entries — base URL `https://jumppiejim-creator.github.io/cindervale-alchemist/`:

Region-specific (key `<region>_<screenkey>` → file `town_<region>_<screenkey>.jpg`), for each of `cindervale ashfall tidecrest skyreach` × `market tavern worldmap quests staff factions` = 24 entries.

Agnostic (1): key `threats` → `town_threats.jpg`.

**Do NOT add `workshop` or `character` keys** — those resolve via room-hero art, not `TOWN_IMGS` (see Piece 2).

Verify count = 25. Verify every filename is exactly lowercase, underscores, `.jpg`, matching the convention above.

---

## Piece 2: One unified art resolver

Build a single helper used for BOTH each hub tile's image AND the screen backdrop — the "one image, two contexts" principle. Resolution order (from design lock §4):

```
resolveArt(screen, gameLocation, season):
  if screen in [market,tavern,worldmap,quests,staff,factions]:
      return TOWN_IMGS[gameLocation+'_'+screen] || TOWN_IMGS[screen] || seasonal() || null
  if screen === 'workshop':  return workshopDefaultRoomHero()  || seasonal() || null
  if screen === 'character': return livingQuartersRoomHero()   || seasonal() || null
  if screen === 'threats':   return TOWN_IMGS['threats']       || seasonal() || null
  return seasonal() || null     // map / workshop sub-tools / anything else
  where seasonal() = (typeof ZONE_IMGS!=='undefined' &&
                      (ZONE_IMGS[reg.id+'_'+curSeason.id] || ZONE_IMGS[reg.id])) || null
```

- `workshopDefaultRoomHero()` = the exact image the workshop screen already shows as its hero when opened (same room + current tier it defaults to — reuse the existing room-hero resolution, do not invent a new default).
- `livingQuartersRoomHero()` = the Living Quarters room-hero (the room driven by the quarters/hearth upgrades) at its current tier, via the same existing room-hero resolution.
- `null` return → caller applies the existing gradient fallback. Never throw on missing art.
- Keep this as ONE helper. Do not scatter the branching across call sites.

---

## Piece 3: Art-driven hub + thin stub bar

### 3a. The hub (`screen==='map'`)

- Replace the current emoji-glyph flexbox tiles (the `MapB` tiles) with **9 art tiles**, one per destination: `workshop, market, tavern, worldmap (Gates), quests (Quest Board), staff (Staff Hall), character (Quarters), factions (Faction Hall), threats (NEW 9th tile)`.
- Each tile's image = `resolveArt(tile.targetScreen, …)`. Tile shows the art with its label; clicking it navigates to that screen.
- Threats is now a real hub tile (it was nav-bar-only before — promote it).
- The hub screen's own backdrop = the seasonal region ambient (the resolver's default branch — `screen==='map'` falls through to `seasonal()`). So: seasonal region landscape behind the grid of 9 location tiles.
- **Preserve the click side-effects** the current `MapB` handler does: `setScreen(scr); setDlgNpc(null); setShowShop(false); setConfirmRest(false); setQuestDlg(null);` — every tile click still clears modals. (Do NOT introduce a central `navigate()` router — out of scope per design lock §8; replicate the modal-clear inline in the new nav paths instead.)
- The Settlement Skyline SVG (~lines 8007-8025) is a separate progress system — leave it intact.

### 3b. The app-level layered backdrop

- Establish a single full-viewport fixed background layer behind the entire app/UI chrome. Its image = `resolveArt(currentScreen, …)`.
- Apply a legibility scrim (darkening gradient) between the backdrop and content — reuse the existing codebase recipe (the `heroImg ? 'url(...)' : 'linear-gradient(...)'` + content-over pattern from the expedition view). UI panels render on top with their own surfaces.
- Result: hub & sub-tools show the seasonal region ambient; a specific location screen shows that location's town image; workshop/character show their room-hero; threats shows the guard tower. All via the one resolver.

### 3c. The thin stub bar (express route)

- Restyle the existing always-rendered nav array (~lines 6912-6944) into a **thin, always-visible, icon-only strip**, compact height, persistent on every screen.
- Entries: Town/home (→ `map`) + the 9 destinations (`workshop, market, tavern, worldmap, quests, staff, character, factions, threats`). This is a restyle + dedupe of the existing 10-entry header, not a new system — reuse the existing entry array; ensure `threats` is present.
- Never hidden, never collapsed-by-default — one tap to anywhere from any screen. This is the load-bearing principle: if it's ever not one tap from anywhere, the redesign has failed.
- Stub clicks must also do the modal-clear side-effect.
- Remove the redundant **header location-name → `setScreen('map')` click path** (~line 6845) — back-to-town is now the stub home icon + the per-screen back control (Piece 4). Deduplicate; don't leave two competing back paths.

---

## Piece 4: Back-to-town via `BackBar`

- `BackBar` (~line 6562) receives a `back` prop it currently ignores (dead code). Make it render a back control when `back` is set; default `back='map'`. Placement: **just above the screen's hero/backdrop art** (per Jim's "back to town button, just above the art").
- The back control navigates to `back` and does the modal-clear side-effect.
- **Critical — preserve Workshop 2-level nesting (design lock §7):** from a workshop sub-tool (`research`/`transmute`/`enchant`/`upgrades`) the back control goes to `workshop` (the workshop hub), NOT `map`. From the workshop hub itself and from every other top-level location screen, back goes to `map`. So: workshop sub-screen call sites pass `back='workshop'`; all other location screen call sites pass `back='map'` (or rely on the default). Do not flatten the hierarchy; do not send sub-tools straight to town.
- ~9 of 13 `BackBar` call sites need `back` passed (the 4 workshop sub-screens already pass it — point those at `'workshop'`; the rest rely on the `'map'` default or pass it explicitly). Audit all 13; report the final mapping.

---

## Preserved behaviors — do not regress (design lock §7)

- Modal-clearing on EVERY navigation path (tiles, stub, back control): `setDlgNpc(null); setShowShop(false); setConfirmRest(false); setQuestDlg(null);`
- Workshop 2-level nesting: Town → Workshop → sub-tool. Sub-tool back → Workshop, not Town.
- The already-shipped quest-accept fix — untouched.
- Settlement Skyline SVG — untouched.
- The hidden right-sidebar per-screen blocks (~11870-12013, `display:'none'`) — leave as-is, out of scope.
- Do NOT introduce a central router. Tactical: replicate the modal-clear inline in new nav paths. (Design lock §8.)
- Existing save/restore of `screen` state — unaffected; no save migration.

## Verification

- `node --check game-data.js` clean; if `location-images.js` is JS, syntax-check it too.
- `TOWN_IMGS` has exactly 25 entries, all URLs well-formed, no `workshop`/`character` keys.
- Walk-through:
  - Hub: 9 art tiles (incl. Threats) over the seasonal region backdrop; each tile shows correct art (or gradient if image absent — no broken-image icons, no thrown errors).
  - Click each tile → correct screen; that screen's backdrop is correct per the resolver (location screens = their town image; workshop = its room-hero; character = Living Quarters room-hero; threats = guard tower; sub-tools = seasonal ambient).
  - Stub bar: visible on every screen, thin/icon-only, one tap to any of the 9 + home, modal-clear fires.
  - Back control: present just above the art on location screens; from a workshop sub-tool it returns to the Workshop hub (NOT town); from a location it returns to town.
  - Old header location-name back path is gone; no duplicate back affordances.
  - Modals (NPC dialog, shop, rest confirm, quest dialog) all clear on every nav path.
  - Workshop drill-down still 2-level (Town → Workshop → research/transmute/enchant/upgrades), upgrades sub-screen (the room-hero screen) still works.
  - Missing-art behaviour: with images not yet deployed, every screen shows the gradient fallback cleanly — no broken images, no console errors. (Then it "just works" once Jim pushes the art.)
  - No unrelated screen regressed.

## Reporting

Send Jim:

1. **What changed** per piece, with file + line deltas (expect `location-images.js` +the table; `index.html` the hub/stub/BackBar/backdrop changes; possibly `game-data.js` if `SCREEN_BG` is touched).
2. **The `BackBar` call-site audit** — all 13 sites and the `back` value each got (especially confirming the 4 workshop sub-tools → `'workshop'`).
3. **The resolver** — confirm it's a single helper, used by both tile art and backdrop, with the exact priority order.
4. **Verification** — `node --check`, the walk-through, explicit confirmation of the preserved behaviors (modal-clear, 2-level nesting, no central router introduced).
5. Anything that diverged from the design lock and why (flag, don't silently deviate).
6. Suggested commit message: `Town/nav IA: art-driven hub + thin stub bar + back-to-town + layered seasonal/location backgrounds`.

## Reminders

- Local repo: `C:\Users\jumpp\cindervale-alchemist-fresh`. Don't run git. Don't touch sibling folders.
- The design lock (`town_nav_design_lock.md`) is authoritative; this prompt implements it; flag conflicts.
- Build against the fallback — do not block on art being deployed.
- One resolver, no scattered branching, no central router, no save migration.
- Preserve every behavior in the "do not regress" list. The 2-level workshop nesting and the universal modal-clear are the two most likely things to break — verify them explicitly.

## What this is NOT

- Not a central-router refactor (explicitly out of scope; tactical inline modal-clear instead).
- Not a change to quest logic, the shipped quest-accept fix, the Settlement Skyline, or the hidden sidebar.
- Not new art — all 25 images exist; `workshop`/`character` reuse room-hero art; the global backdrop reuses existing seasonal `ZONE_IMGS`.
- Not a flattening of the Workshop hierarchy.
- Not a git/deploy step — Jim pushes code and art.
