// Region images for zone popup headers — all 3 locations
var ZONE_IMGS={
  // Cindervale (restored Oct 2026 from the March copies in git history)
  "ashfields":"ashfields.jpg",
  "ironwood":"ironwood.jpg",
  "fungal_caves":"fungal_caves.jpg",
  "crystal_hollow":"crystal_hollow.jpg",
  "moonlit_glade":"moonlit_glade.jpg",
  "volcanic_vents":"volcanic_vents.jpg",
  "deep_mines":"deep_mines.jpg",
  "heartforge_rim":"heartforge_rim.jpg",
  // Ashfall Crossing
  "sunscorch_flats":"sunscorch_flats.png",
  "salt_caverns":"salt_caverns.png",
  "obsidian_wastes":"obsidian_wastes.png",
  "sandworm_tunnels":"sandworm_tunnels.png",
  "oasis_grove":"oasis_grove.png",
  "molten_vents":"molten_vents.png",
  "mirage_bazaar":"mirage_bazaar.png",
  "buried_temple":"buried_temple.png",
  // Tidecrest Harbor
  "driftwood_shores":"driftwood_shores.jpg",
  "tidal_pools":"tidal_pools.jpg",
  "kelp_forest":"kelp_forest.jpg",
  "fog_hollows":"fog_hollows.jpg",
  "coral_labyrinth":"coral_labyrinth.jpg",
  "shipwreck_graveyard":"shipwreck_graveyard.jpg",
  "abyssal_trench":"abyssal_trench.jpg",
  "drowned_sanctum":"drowned_sanctum.jpg",
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
  "room_laboratory_t1":"room_laboratory_t1.jpg",
  "room_laboratory_t2":"room_laboratory_t2.jpg",
  "room_laboratory_t3":"room_laboratory_t3.jpg",
  // The Forge
  "room_forge_t1":"room_forge_t1.jpg",
  "room_forge_t2":"room_forge_t2.jpg",
  "room_forge_t3":"room_forge_t3.jpg",
  // Enchanting Sanctum
  "room_enchanting_t1":"room_enchanting_t1.jpg",
  "room_enchanting_t2":"room_enchanting_t2.jpg",
  "room_enchanting_t3":"room_enchanting_t3.jpg",
  // The Vault
  "room_vault_t1":"room_vault_t1.jpg",
  "room_vault_t2":"room_vault_t2.jpg",
  "room_vault_t3":"room_vault_t3.jpg",
  // The Storefront
  "room_storefront_t1":"room_storefront_t1.jpg",
  "room_storefront_t2":"room_storefront_t2.jpg",
  "room_storefront_t3":"room_storefront_t3.jpg",
  // The Greenhouse
  "room_greenhouse_t1":"room_greenhouse_t1.jpg",
  "room_greenhouse_t2":"room_greenhouse_t2.jpg",
  "room_greenhouse_t3":"room_greenhouse_t3.jpg",
  // Living Quarters
  "room_quarters_t1":"room_quarters_t1.jpg",
  "room_quarters_t2":"room_quarters_t2.jpg",
  "room_quarters_t3":"room_quarters_t3.jpg",
  // Library & Leyline Sanctum
  "room_library_t1":"room_library_t1.jpg",
  "room_library_t2":"room_library_t2.jpg",
  "room_library_t3":"room_library_t3.jpg",
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
  "cindervale_market":"town_cindervale_market.jpg",
  "cindervale_tavern":"town_cindervale_tavern.jpg",
  "cindervale_worldmap":"town_cindervale_worldmap.jpg",
  "cindervale_quests":"town_cindervale_quests.jpg",
  "cindervale_staff":"town_cindervale_staff.jpg",
  "cindervale_factions":"town_cindervale_factions.jpg",
  // ── Ashfall Crossing ──
  "ashfall_market":"town_ashfall_market.jpg",
  "ashfall_tavern":"town_ashfall_tavern.jpg",
  "ashfall_worldmap":"town_ashfall_worldmap.jpg",
  "ashfall_quests":"town_ashfall_quests.jpg",
  "ashfall_staff":"town_ashfall_staff.jpg",
  "ashfall_factions":"town_ashfall_factions.jpg",
  // ── Tidecrest Harbor ──
  "tidecrest_market":"town_tidecrest_market.jpg",
  "tidecrest_tavern":"town_tidecrest_tavern.jpg",
  "tidecrest_worldmap":"town_tidecrest_worldmap.jpg",
  "tidecrest_quests":"town_tidecrest_quests.jpg",
  "tidecrest_staff":"town_tidecrest_staff.jpg",
  "tidecrest_factions":"town_tidecrest_factions.jpg",
  // ── Skyreach ──
  "skyreach_market":"town_skyreach_market.jpg",
  "skyreach_tavern":"town_skyreach_tavern.jpg",
  "skyreach_worldmap":"town_skyreach_worldmap.jpg",
  "skyreach_quests":"town_skyreach_quests.jpg",
  "skyreach_staff":"town_skyreach_staff.jpg",
  "skyreach_factions":"town_skyreach_factions.jpg",
  // ── Agnostic (Threats: guard tower) ──
  "threats":"town_threats.jpg",
};
