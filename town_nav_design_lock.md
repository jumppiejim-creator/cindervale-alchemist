# Town / Navigation IA — Design Lock

_Authoritative spec. The Kevin build prompt and the art prompt set are both written against this. Locked unless explicitly revised._

## 1. The model

- The **Town hub** (`screen==='map'`) becomes an art-driven hub: 9 tiles, each a real image (replacing the current emoji-glyph buttons — there were never location SVGs; that was a recon correction).
- Each location screen gets a **region-specific or agnostic background** (same image as its hub tile — one image, two contexts via cover/center crop, exactly like `ZONE_IMGS`/`ROOM_IMGS`).
- A **thin always-visible icon stub bar** replaces the redundant 10-tab nav-header. One tap to any destination, never hidden — the express route. The hub is the scenic route; both always available, so the hub's extra clicks are opt-in.
- Every location screen gets a **back-to-town** affordance (via the existing dormant `BackBar` `back` prop — see §6).
- Navigation flow: **town → place → back to town → place**. Stub bar shortcuts any hop.

## 2. The 9 tiles

| # | Tile (display varies by region where regional) | screen key | Region-specific? |
|---|---|---|---|
| 1 | Workshop | `workshop` | **Agnostic** (player-personal) |
| 2 | Market / Harbor Market / Bazaar | `market` | Region-specific |
| 3 | Tavern (Ember & Anvil / Driftwood / Oasis Cantina) | `tavern` | Region-specific |
| 4 | Gates (Village Gates / Harbor Docks / Desert Gates) | `worldmap` | Region-specific |
| 5 | Quest Board | `quests` | Region-specific |
| 6 | Staff Hall | `staff` | Region-specific |
| 7 | Your Quarters | `character` | **Agnostic** (player-personal) |
| 8 | Faction Hall | `factions` | Region-specific |
| 9 | **Threats (NEW tile)** | `threats` | **Agnostic** (guard tower, "sufficient for now") |

Split B locked. Threats promoted from nav-bar-orphan to a real 9th hub tile **and** kept on the stub bar.

## 3. The image manifest — 25 generated + 2 reused

Regions: `cindervale`, `ashfall`, `tidecrest`, `skyreach`.

**Region-specific, generated (6 locations × 4 regions = 24):** `market`, `tavern`, `worldmap`, `quests`, `staff`, `factions`
**Agnostic, generated (1):** `threats`
**Agnostic, REUSED from existing `ROOM_IMGS` (2 — not generated):** `workshop`, `character`

Each generated image is used as **both** the hub tile art and that screen's background. The two reused tiles likewise serve both contexts via the existing room-image lookup.

### Workshop & Quarters reuse existing room art (decision locked)

Rather than bespoke static exteriors, the two player-personal agnostic tiles reuse the workshop room-hero art already built (`ROOM_IMGS`), so they evolve with upgrades owned and match what the player sees on entry — no redundant art, no jarring tile→screen art jump.

- **`workshop`** → the workshop screen's **default room-hero at current tier** (whatever the workshop screen shows on open — exact continuity). Kevin: use the same room/tier the workshop screen defaults its hero to.
- **`character`** (Quarters) → the **Living Quarters room-hero** (`ROOM_IMGS`, driven by quarters/hearth upgrades) **at current tier**. Note: the tile routes to the character/stats screen; the Living Quarters room art is a deliberate visual stand-in for the player-personal space. (Override path: if a bespoke Quarters exterior is wanted later, add `town_character.jpg` + a region/flat key — the lookup already supports it.)

Principle: **player-personal agnostic tiles reuse the rooms the player built; region-specific tiles get bespoke establishing art.**

### Filenames (generated only)

- Region-specific: `town_<region>_<screenkey>.jpg`
  e.g. `town_tidecrest_market.jpg`, `town_cindervale_factions.jpg`
- Agnostic generated: `town_threats.jpg`
- `workshop` / `character`: **no file** — resolved via room-image lookup (see below).

All generated `.jpg`, authored 1344×768 (16:9) — same as region/room art, same vertical-center safe zone (top/bottom ~22% may crop in the screen-background context).

### TOWN_IMGS table + lookup

`TOWN_IMGS` is already referenced in code (nav-bar thumbnails, screen-background) but never defined — both sites fall back gracefully today. We populate it for the 25 generated images.

- Keys: region-specific `<region>_<screenkey>` (e.g. `tidecrest_market`); agnostic generated `threats`.
- Base lookup (mirrors `heroImg`/`roomImg` two-tier):
  ```js
  const locImg = (typeof TOWN_IMGS!=='undefined' &&
    (TOWN_IMGS[gameLocation+'_'+screenKey] || TOWN_IMGS[screenKey])) || null;
  ```
  Region key first, agnostic fallback.
- **Special-case `workshop` and `character`:** these two keys do **not** resolve through `TOWN_IMGS`. Before the base lookup, if `screenKey==='workshop'` use the workshop screen's default room-hero image; if `screenKey==='character'` use the Living Quarters room-hero image (current tier in both cases) — i.e. reuse the existing `roomImg`-style resolution. Gradient fallback still applies if the room image is missing. Kevin captures this as a small branch in the shared tile/background image resolver, not scattered.
- **Forward-compatible bonus:** an agnostic generated location (Threats) can become region-specific later by just adding `town_<region>_threats.jpg` entries — zero code change. The `workshop`/`character` special-case can likewise be removed later if bespoke art is ever wanted.
- URL base: `https://jumppiejim-creator.github.io/cindervale-alchemist/<filename>` (identical to `ZONE_IMGS`/`ROOM_IMGS`).
- Fallback: existing `onError`-hide + gradient recipe. Hub + screens build and ship against placeholders; art populates later. Same decoupled parallel track as the workshop.

## 4. Backgrounds — layered model (locked)

Two layers, decided together:

**Layer 1 — global ambient backdrop (behind the whole UI, every screen):** the **seasonal region image**, via the existing proven lookup `ZONE_IMGS[reg.id+'_'+curSeason.id] || ZONE_IMGS[reg.id]` (same resolution the expedition hero uses — zero new art, reuses working seasonal infra). This is the persistent wallpaper; it changes by region and by season for free.

**Layer 2 — per-screen override:** specific screens replace the ambient backdrop with their own image:
- Specific town locations (`market`, `tavern`, `worldmap`, `quests`, `staff`, `factions`) → that location's town image (`TOWN_IMGS[gameLocation+'_'+screenKey] || TOWN_IMGS[screenKey]`).
- `workshop` → workshop screen's default room-hero (current tier).
- `character` → Living Quarters room-hero (current tier).
- `threats` → `TOWN_IMGS['threats']`.
- The hub (`screen==='map'`), workshop sub-tools (`research`/`transmute`/`enchant`), and anything else → **no override; show the Layer-1 seasonal region ambient.** (So the town hub shows the seasonal region landscape behind the 9 tiles — region + season set the mood; the tiles are the places within it.)

### Single unified resolver (one helper, two uses)

Kevin builds **one** resolver, used both for each hub tile's art and for the screen backdrop (the "one image, two contexts" principle). Resolution order:

```
resolveArt(screen, gameLocation, season):
  if screen in [market,tavern,worldmap,quests,staff,factions]:
      return TOWN_IMGS[gameLocation+'_'+screen] || TOWN_IMGS[screen] || seasonal() || gradient
  if screen === 'workshop':  return workshopDefaultRoomHero()   || seasonal() || gradient
  if screen === 'character': return livingQuartersRoomHero()    || seasonal() || gradient
  if screen === 'threats':   return TOWN_IMGS['threats']        || seasonal() || gradient
  return seasonal() || gradient        // map / sub-tools / anything else
  where seasonal() = ZONE_IMGS[reg.id+'_'+curSeason.id] || ZONE_IMGS[reg.id]
```

- Hub tile art = `resolveArt(tile.targetScreen, …)` per tile.
- Screen backdrop = `resolveArt(currentScreen, …)`.
- **Legibility scrim:** a darkening gradient overlay sits between the backdrop and UI content so text stays readable over any image — the codebase already does this (`heroImg ? 'url(...)' : 'linear-gradient(...)'` with content layered over, in the expedition view). Reuse that recipe; apply consistently to the app-level backdrop.
- The app-level backdrop is a single full-viewport fixed layer behind all UI chrome; panels render on top with their own surfaces.
- **Forward-compatible:** Threats → region-specific later = add `town_<region>_threats.jpg`, zero code change. `workshop`/`character` special-case removable if bespoke art ever wanted.
- URL base: `https://jumppiejim-creator.github.io/cindervale-alchemist/<filename>`. Fallback: existing `onError`-hide + gradient. Build ships against placeholders; art populates independently.

## 5. Stub bar (the express route)

- **Form: thin always-visible icon strip.** Icon-only, compact height, persistent on every screen. Locked default; override only if Jim says so.
- Contains all 9 hub destinations + Threats (Threats is both a hub tile and a stub entry) + any cross-cutting destination that isn't a hub tile.
- Replaces the current 10-entry tab-header. The current header's "Town" tab (index 0) and the duplicate header-location-name back path both collapse into: stub bar (jump anywhere) + per-screen back-to-town (§6). Pick the stub's "home/town" icon as canonical; remove the redundant header-name click path.
- Never hidden, never collapsed-by-default. If it's ever not one tap from anywhere, the design has failed its core principle.

## 6. Back-to-town affordance

- Use the **existing dormant `BackBar` `back` prop** (recon: defined, received, currently ignored — dead code).
- Make `BackBar` render a back control when `back` is set; default `back='map'`.
- ~9 of 13 `BackBar` call sites need `back` passed (or rely on the `'map'` default). Placement: just above the screen's hero/background art, per Jim's "back to town button, just above the art."
- Canonical back-to-town = this per-screen control + the stub bar's home icon. The old header-name click path is removed (deduplicated).

## 7. Preserved behaviors (do not regress)

- **Modal-clearing on navigation.** Every screen change currently also clears open modals (`setDlgNpc(null); setShowShop(false); setConfirmRest(false); setQuestDlg(null);`). Any new nav path must preserve this.
- **Workshop 2-level nesting.** Workshop tile → workshop hub → drill into research / transmute / enchant / upgrades sub-tools. The IA stays hierarchical: Town → Workshop → sub-tool. Do **not** flatten workshop sub-tools into hub tiles. (The upgrades sub-screen is the room-hero screen already built — it lives inside Workshop, reached by drilling in.)
- **The already-shipped quest-accept fix** stays; don't touch it.
- The Settlement Skyline SVG (line 8007-8025) is a separate progress system — leave it.

## 8. Loose ends — resolved

- **Threats orphan** → resolved: 9th hub tile (agnostic guard tower) + stub entry.
- **Two back-to-town paths** → resolved: keep per-screen back + stub home; remove header-name click.
- **Right sidebar's 8 hidden per-screen blocks** (display:'none', invisible to most): out of scope for v1; leave as-is. Flag as potential dead-code cleanup later, not now.
- **20 scattered setScreen sites / no central router**: tactical for now (work alongside). A `navigate()` helper centralizing screen change + modal-clear is the strategic option — flagged for a possible later refactor, NOT in this redesign's scope.

## 9. Sequence

1. **Art prompt set** (separate doc, ready now) — pilot the 4 Markets first, acceptance-gate, then mass-produce the other 23.
2. **Kevin build** (prompt written after pilot passes, like the workshop) — hub tiles + thin stub bar + back-to-town via `BackBar` + region-aware `SCREEN_BG`, built against placeholders. Decoupled from art production.
3. Jim generates art → drop into `TOWN_IMGS` → push → live.

The build and the art generation run in parallel (placeholder fallback already wired), same as the workshop.
