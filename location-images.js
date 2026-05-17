// Region images for zone popup headers — all 3 locations
var ZONE_IMGS={
  // Cindervale
  "ashfields":"https://jumppiejim-creator.github.io/cindervale-alchemist/ashfields.jpg",
  "ironwood":"https://jumppiejim-creator.github.io/cindervale-alchemist/ironwood.jpg",
  "fungal_caves":"https://jumppiejim-creator.github.io/cindervale-alchemist/fungal_caves.jpg",
  "crystal_hollow":"https://jumppiejim-creator.github.io/cindervale-alchemist/crystal_hollow.jpg",
  "moonlit_glade":"https://jumppiejim-creator.github.io/cindervale-alchemist/moonlit_glade.jpg",
  "volcanic_vents":"https://jumppiejim-creator.github.io/cindervale-alchemist/volcanic_vents.jpg",
  "deep_mines":"https://jumppiejim-creator.github.io/cindervale-alchemist/deep_mines.jpg",
  "heartforge_rim":"https://jumppiejim-creator.github.io/cindervale-alchemist/heartforge_rim.jpg",
  // Ashfall Crossing
  "sunscorch_flats":"https://jumppiejim-creator.github.io/cindervale-alchemist/sunscorch_flats.jpg",
  "salt_caverns":"https://jumppiejim-creator.github.io/cindervale-alchemist/salt_caverns.jpg",
  "obsidian_wastes":"https://jumppiejim-creator.github.io/cindervale-alchemist/obsidian_wastes.jpg",
  "sandworm_tunnels":"https://jumppiejim-creator.github.io/cindervale-alchemist/sandworm_tunnels.jpg",
  "oasis_grove":"https://jumppiejim-creator.github.io/cindervale-alchemist/oasis_grove.jpg",
  "molten_vents":"https://jumppiejim-creator.github.io/cindervale-alchemist/molten_vents.jpg",
  "mirage_bazaar":"https://jumppiejim-creator.github.io/cindervale-alchemist/mirage_bazaar.jpg",
  "buried_temple":"https://jumppiejim-creator.github.io/cindervale-alchemist/buried_temple.jpg",
  // Tidecrest Harbor
  "driftwood_shores":"https://jumppiejim-creator.github.io/cindervale-alchemist/driftwood_shores.jpg",
  "tidal_pools":"https://jumppiejim-creator.github.io/cindervale-alchemist/tidal_pools.jpg",
  "kelp_forest":"https://jumppiejim-creator.github.io/cindervale-alchemist/kelp_forest.jpg",
  "fog_hollows":"https://jumppiejim-creator.github.io/cindervale-alchemist/fog_hollows.jpg",
  "coral_labyrinth":"https://jumppiejim-creator.github.io/cindervale-alchemist/coral_labyrinth.jpg",
  "shipwreck_graveyard":"https://jumppiejim-creator.github.io/cindervale-alchemist/shipwreck_graveyard.jpg",
  "abyssal_trench":"https://jumppiejim-creator.github.io/cindervale-alchemist/abyssal_trench.jpg",
  "drowned_sanctum":"https://jumppiejim-creator.github.io/cindervale-alchemist/drowned_sanctum.jpg",
};

// ═══ WORKSHOP ROOM SHOWCASE ART ═══
// Mirrors the ZONE_IMGS pattern. Keys: 'room_<roomid>_t<tier>' (e.g.
// 'room_laboratory_t1'). Lookup in index.html builds the key as
// 'room_'+room.id+'_t'+tier — matches the keys below exactly. 8 rooms × 3
// tiers = 24 entries, listed in tour order (laboratory → forge → enchanting
// → vault → storefront → greenhouse → quarters → library). If a key is
// missing the viewer falls back to a gradient + watermark — that path is
// intentional design, not a bug.
var ROOM_IMGS={
  // Laboratory
  "room_laboratory_t1":"https://jumppiejim-creator.github.io/cindervale-alchemist/room_laboratory_t1.jpg",
  "room_laboratory_t2":"https://jumppiejim-creator.github.io/cindervale-alchemist/room_laboratory_t2.jpg",
  "room_laboratory_t3":"https://jumppiejim-creator.github.io/cindervale-alchemist/room_laboratory_t3.jpg",
  // The Forge
  "room_forge_t1":"https://jumppiejim-creator.github.io/cindervale-alchemist/room_forge_t1.jpg",
  "room_forge_t2":"https://jumppiejim-creator.github.io/cindervale-alchemist/room_forge_t2.jpg",
  "room_forge_t3":"https://jumppiejim-creator.github.io/cindervale-alchemist/room_forge_t3.jpg",
  // Enchanting Sanctum
  "room_enchanting_t1":"https://jumppiejim-creator.github.io/cindervale-alchemist/room_enchanting_t1.jpg",
  "room_enchanting_t2":"https://jumppiejim-creator.github.io/cindervale-alchemist/room_enchanting_t2.jpg",
  "room_enchanting_t3":"https://jumppiejim-creator.github.io/cindervale-alchemist/room_enchanting_t3.jpg",
  // The Vault
  "room_vault_t1":"https://jumppiejim-creator.github.io/cindervale-alchemist/room_vault_t1.jpg",
  "room_vault_t2":"https://jumppiejim-creator.github.io/cindervale-alchemist/room_vault_t2.jpg",
  "room_vault_t3":"https://jumppiejim-creator.github.io/cindervale-alchemist/room_vault_t3.jpg",
  // The Storefront
  "room_storefront_t1":"https://jumppiejim-creator.github.io/cindervale-alchemist/room_storefront_t1.jpg",
  "room_storefront_t2":"https://jumppiejim-creator.github.io/cindervale-alchemist/room_storefront_t2.jpg",
  "room_storefront_t3":"https://jumppiejim-creator.github.io/cindervale-alchemist/room_storefront_t3.jpg",
  // The Greenhouse
  "room_greenhouse_t1":"https://jumppiejim-creator.github.io/cindervale-alchemist/room_greenhouse_t1.jpg",
  "room_greenhouse_t2":"https://jumppiejim-creator.github.io/cindervale-alchemist/room_greenhouse_t2.jpg",
  "room_greenhouse_t3":"https://jumppiejim-creator.github.io/cindervale-alchemist/room_greenhouse_t3.jpg",
  // Living Quarters
  "room_quarters_t1":"https://jumppiejim-creator.github.io/cindervale-alchemist/room_quarters_t1.jpg",
  "room_quarters_t2":"https://jumppiejim-creator.github.io/cindervale-alchemist/room_quarters_t2.jpg",
  "room_quarters_t3":"https://jumppiejim-creator.github.io/cindervale-alchemist/room_quarters_t3.jpg",
  // Library & Leyline Sanctum
  "room_library_t1":"https://jumppiejim-creator.github.io/cindervale-alchemist/room_library_t1.jpg",
  "room_library_t2":"https://jumppiejim-creator.github.io/cindervale-alchemist/room_library_t2.jpg",
  "room_library_t3":"https://jumppiejim-creator.github.io/cindervale-alchemist/room_library_t3.jpg",
};

// ═══ TOWN HUB / LOCATION ART ═══
// Mirrors ZONE_IMGS / ROOM_IMGS pattern. Used by the art-driven town hub tiles
// AND the global per-screen backdrop, via the single resolveArt() helper in
// index.html. Keys: '<region>_<screenkey>' for region-specific locations,
// '<screenkey>' (flat) for agnostic ones. 24 region-specific (4 regions × 6
// locations) + 1 agnostic (threats) = 25 entries. `workshop` and `character`
// are intentionally NOT here — they resolve via ROOM_IMGS (room-hero reuse).
var TOWN_IMGS={
  // ── Cindervale ──
  "cindervale_market":"https://jumppiejim-creator.github.io/cindervale-alchemist/town_cindervale_market.jpg",
  "cindervale_tavern":"https://jumppiejim-creator.github.io/cindervale-alchemist/town_cindervale_tavern.jpg",
  "cindervale_worldmap":"https://jumppiejim-creator.github.io/cindervale-alchemist/town_cindervale_worldmap.jpg",
  "cindervale_quests":"https://jumppiejim-creator.github.io/cindervale-alchemist/town_cindervale_quests.jpg",
  "cindervale_staff":"https://jumppiejim-creator.github.io/cindervale-alchemist/town_cindervale_staff.jpg",
  "cindervale_factions":"https://jumppiejim-creator.github.io/cindervale-alchemist/town_cindervale_factions.jpg",
  // ── Ashfall Crossing ──
  "ashfall_market":"https://jumppiejim-creator.github.io/cindervale-alchemist/town_ashfall_market.jpg",
  "ashfall_tavern":"https://jumppiejim-creator.github.io/cindervale-alchemist/town_ashfall_tavern.jpg",
  "ashfall_worldmap":"https://jumppiejim-creator.github.io/cindervale-alchemist/town_ashfall_worldmap.jpg",
  "ashfall_quests":"https://jumppiejim-creator.github.io/cindervale-alchemist/town_ashfall_quests.jpg",
  "ashfall_staff":"https://jumppiejim-creator.github.io/cindervale-alchemist/town_ashfall_staff.jpg",
  "ashfall_factions":"https://jumppiejim-creator.github.io/cindervale-alchemist/town_ashfall_factions.jpg",
  // ── Tidecrest Harbor ──
  "tidecrest_market":"https://jumppiejim-creator.github.io/cindervale-alchemist/town_tidecrest_market.jpg",
  "tidecrest_tavern":"https://jumppiejim-creator.github.io/cindervale-alchemist/town_tidecrest_tavern.jpg",
  "tidecrest_worldmap":"https://jumppiejim-creator.github.io/cindervale-alchemist/town_tidecrest_worldmap.jpg",
  "tidecrest_quests":"https://jumppiejim-creator.github.io/cindervale-alchemist/town_tidecrest_quests.jpg",
  "tidecrest_staff":"https://jumppiejim-creator.github.io/cindervale-alchemist/town_tidecrest_staff.jpg",
  "tidecrest_factions":"https://jumppiejim-creator.github.io/cindervale-alchemist/town_tidecrest_factions.jpg",
  // ── Skyreach ──
  "skyreach_market":"https://jumppiejim-creator.github.io/cindervale-alchemist/town_skyreach_market.jpg",
  "skyreach_tavern":"https://jumppiejim-creator.github.io/cindervale-alchemist/town_skyreach_tavern.jpg",
  "skyreach_worldmap":"https://jumppiejim-creator.github.io/cindervale-alchemist/town_skyreach_worldmap.jpg",
  "skyreach_quests":"https://jumppiejim-creator.github.io/cindervale-alchemist/town_skyreach_quests.jpg",
  "skyreach_staff":"https://jumppiejim-creator.github.io/cindervale-alchemist/town_skyreach_staff.jpg",
  "skyreach_factions":"https://jumppiejim-creator.github.io/cindervale-alchemist/town_skyreach_factions.jpg",
  // ── Agnostic (Threats: guard tower) ──
  "threats":"https://jumppiejim-creator.github.io/cindervale-alchemist/town_threats.jpg",
};
