// The Garden of the Stars — static game data
// Lifted from TENDER_DESIGN.md. Use `var` so these are accessible as browser globals.

var SAVE_VERSION = 5;
var OFFLINE_TICK_CAP_SECONDS = 8 * 60 * 60;

// Active Presence — efficiency tiers and active-play cadences.
var PRESENCE_TENDED    = 1.00;
var PRESENCE_ABOARD    = 0.25;
var PRESENCE_AWAY      = 0.10;
var CREW_TASK_MIN_MS   = 3 * 60 * 1000;
var CREW_TASK_MAX_MS   = 5 * 60 * 1000;
var CREW_TASK_LIFETIME = 120 * 1000;
var CREW_TASK_EXPIRING_WARN_MS = 5 * 1000; // last N ms: text dims, button becomes "(too late)"
var WEATHER_MIN_MS     = 4 * 60 * 1000;
var WEATHER_MAX_MS     = 8 * 60 * 1000;
var HARVEST_WINDOW_S   = 30;
var HARVEST_COOLDOWN_S = 60;

// Fuel + Chemistry — Harbor trickle rate scales with Rocky terraform stage at Harbor.
var HARBOR_TRICKLE_LOW  = 0.002;  // Rocky stage 0–2
var HARBOR_TRICKLE_HIGH = 0.005;  // Rocky stage 3+
var BASE_CRAFT_TIME_MS  = 5 * 60 * 1000;
var RUSH_CRAFT_TIME_MS  = 2 * 60 * 1000;
var RUSH_INPUT_MULTIPLIER = 2;
var PROBE_TRAVEL_MS_PER_HOP = 3 * 60 * 1000;
var ENGINE_CRAFT_REDUCTION_MS = { 0: 0, 1: 30 * 1000, 2: 60 * 1000, 3: 90 * 1000 };
var GREENHOUSE_QUEUE_SIZE     = { 0: 2, 1: 3, 2: 4, 3: 5 };
var REFUND_QUEUED       = 1.00; // un-started jobs refund 100%
var REFUND_IN_PROGRESS  = 0.75; // crafting jobs refund 75% (matches deconstruct)
var FERTILITY_BLOOM_DURATION_MS = 2 * 60 * 60 * 1000;
var FERTILITY_BLOOM_MULT = 1.25;

var SHIP_ROOMS = [
  { id: "bridge",       name: "Bridge",            desc: "A wraparound viewport, three soft chairs, and a chart table that hums when it's thinking.",
    zone: { left: "5%", top: "15%", width: "15%", height: "70%" } },
  { id: "engine",       name: "Engine Room",       desc: "Warm, humming, faintly oily. The drive coils tick as they cool.",
    zone: { left: "20%", top: "15%", width: "15%", height: "70%" } },
  { id: "galley",       name: "Galley",            desc: "Mismatched mugs, a kettle that whistles slightly off-key, jars accumulating along the shelf.",
    zone: { left: "35%", top: "15%", width: "15%", height: "70%" } },
  { id: "greenhouse",   name: "Greenhouse / Lab",  desc: "Grow lights, an empty seed rack waiting to be filled, and a microscope under a soft cloth.",
    zone: { left: "50%", top: "15%", width: "15%", height: "70%" } },
  { id: "quarters",     name: "Crew Quarters",     desc: "Four bunks, four small shelves, four lives folded into a single corridor.",
    zone: { left: "65%", top: "15%", width: "15%", height: "70%" } },
  { id: "observation",  name: "Observation Deck",  desc: "A dome of glass and a single bench. The best place to watch a star you'll never visit.",
    zone: { left: "80%", top: "15%", width: "15%", height: "70%" } }
];

var CREW_ROLES = [
  {
    id: "botanist",
    label: "Botanist",
    domain: "Flora & fauna stages",
    defaultRoom: "greenhouse",
    candidates: [
      { id: "yuki",  name: "Yuki Tanaka",      blurb: "Quiet, methodical. Keeps a private notebook of leaf shapes." },
      { id: "mira",  name: "Dr. Mira Okonkwo", blurb: "Sharp, academic. Will correct you, gently, in three languages." },
      { id: "fern",  name: "Fern Reyes",       blurb: "Warm and irreverent. Names every sprout something embarrassing." }
    ]
  },
  {
    id: "engineer",
    label: "Engineer",
    domain: "Ship & machine upgrades",
    defaultRoom: "engine",
    candidates: [
      { id: "holly", name: "Hollis \"Holly\" Vance", blurb: "Gruff veteran. Has opinions about every weld in the hull." },
      { id: "kiran", name: "Kiran Bhatt",            blurb: "Eager prodigy. Sleeps with a wrench under the pillow." },
      { id: "tov",   name: "Old Tov",                blurb: "Quiet, mysterious past. Doesn't say where he learned the trade." }
    ]
  },
  {
    id: "cartographer",
    label: "Cartographer / Xenologist",
    domain: "Chart & discovery",
    defaultRoom: "bridge",
    candidates: [
      { id: "ines",  name: "Ines Vidal",           blurb: "Obsessive mapper. Every blank space on a chart is a personal insult." },
      { id: "reza",  name: "Captain Reza Anvari",  blurb: "Paternal storyteller. Knows the name of every star you'll never reach." },
      { id: "echo",  name: "\"Echo\"",             blurb: "Minimal, watchful, hidden history. Goes by one word." }
    ]
  },
  {
    id: "cook",
    label: "Cook / Morale Officer",
    domain: "Heart of the ship, downtime scenes",
    defaultRoom: "galley",
    candidates: [
      { id: "babu",     name: "Babu Okafor",        blurb: "Booming, fatherly. The galley is louder when he's in it." },
      { id: "saoirse",  name: "Saoirse Malley",     blurb: "Dry ex-medic. Makes a stew that tastes like an apology." },
      { id: "wren",     name: "Wren Castellanos",   blurb: "Anxious young baker. Bread is her language for everything." }
    ]
  }
];

var PLANET_TYPES = [
  { id: "frozen",   name: "Frozen",         puzzle: "Warm it carefully without flashing the ice. Vapor first, then meltwater, then moss." },
  { id: "desert",   name: "Desert",         puzzle: "Find water before atmosphere can hold it. Filter the dust, then condense the air, then seed hardy life." },
  { id: "rocky",    name: "Rocky / Barren", puzzle: "Build everything from nothing. The blank canvas." },
  { id: "volcanic", name: "Volcanic",       puzzle: "Cool instead of warm. Collect the vents, condense the steam, settle the land." },
  { id: "toxic",    name: "Toxic",          puzzle: "Skip the atmosphere puzzle — scrub what's already there. Purify, then replant." },
  { id: "oceanic",  name: "Oceanic",        puzzle: "Already wet. Stabilize the air, raise the coral, wake the reefs." }
];

var TERRAFORM_STAGES = [
  { id: 0, name: "Barren",      desc: "Untouched. The way you found it." },
  { id: 1, name: "Atmosphere",  desc: "A thin shell of breathable air." },
  { id: 2, name: "Hydrosphere", desc: "Water — running, pooling, raining." },
  { id: 3, name: "Flora",       desc: "First green. The longest stage." },
  { id: 4, name: "Fauna",       desc: "Movement returns. Quiet at first." },
  { id: 5, name: "Paradise",    desc: "Self-sustaining. A trickle of every signature resource." }
];

var MACHINES = [
  { id: "gas_extractor", name: "Gas Extractor", tier: 1, stage: "Atmosphere", desc: "Pulls usable gases out of the regolith.", pps: 1.5, activeStages: [0], cost: { common_ore: 10 },
    typeFlavor: {
      frozen:   { name: "Vapor Collector",      desc: "Captures what little atmosphere the ice releases as it thaws." },
      desert:   { name: "Dust Filter",          desc: "Sifts breathable gases from the constant particulate haze." },
      rocky:    { name: "Gas Extractor",        desc: "Pulls usable gases out of the regolith." },
      volcanic: { name: "Vent Tap",             desc: "Siphons gases directly from geothermal vents." },
      toxic:    { name: "Atmosphere Scrubber",   desc: "Filters poisons from the existing atmosphere, a molecule at a time." },
      oceanic:  { name: "Surface Harvester",    desc: "Draws dissolved gases from the ocean's skin." }
    }},
  { id: "pressure_regulator", name: "Pressure Regulator", tier: 2, stage: "Atmosphere", desc: "Holds the new air down.", pps: 2.5, activeStages: [0], cost: { common_ore: 20, rare_metals: 10 },
    typeFlavor: {
      frozen:   { name: "Cryo-Pressure Regulator", desc: "Holds the new atmosphere down before it can boil off into space." },
      desert:   { name: "Convection Dampener",     desc: "Keeps day-night temperature swings from tearing the atmosphere apart." },
      rocky:    { name: "Pressure Regulator",      desc: "Holds the new air down." },
      volcanic: { name: "Vent Stabilizer",         desc: "Balances atmospheric outgassing against orbital pressure." },
      toxic:    { name: "Containment Baffler",     desc: "Maintains the scrubbed atmosphere at livable pressure." },
      oceanic:  { name: "Pressure Equalizer",      desc: "Balances the air against the weight of the ocean below." }
    }},
  { id: "ice_melter", name: "Ice Melter / Condenser", tier: 1, stage: "Hydrosphere", desc: "Releases trapped water; condenses vapor.", pps: 1.5, activeStages: [1], cost: { common_ore: 20 },
    typeFlavor: {
      frozen:   { name: "Ice Melter",                  desc: "Releases water trapped in the ice, carefully, without flashing it." },
      desert:   { name: "Atmospheric Water Generator", desc: "Condenses moisture from air that insists it has none." },
      rocky:    { name: "Moisture Extractor",          desc: "Draws water from hydrated minerals in the rock." },
      volcanic: { name: "Steam Condenser",             desc: "Collects water vapor from cooling volcanic plumes." },
      toxic:    { name: "Purification Still",          desc: "Distills clean water out of whatever's in the existing liquid." },
      oceanic:  { name: "Desalination Plant",          desc: "The planet's already wet. Just make it drinkable." }
    }},
  { id: "water_pump", name: "Water Pump", tier: 2, stage: "Hydrosphere", desc: "Moves water into the places it should be.", pps: 2.5, activeStages: [1], cost: { common_ore: 24, geothermal_cores: 12 },
    typeFlavor: {
      frozen:   { name: "Meltwater Channeler", desc: "Routes thawed streams before they refreeze." },
      desert:   { name: "Aquifer Pump",        desc: "Pulls deep groundwater to the surface where it can do some good." },
      rocky:    { name: "Water Pump",          desc: "Moves water into the places it should be." },
      volcanic: { name: "Lava Tube Irrigator", desc: "Threads water through cooled lava tubes to spread it underground." },
      toxic:    { name: "Filtered Irrigator",  desc: "Distributes purified water while keeping the old stuff out." },
      oceanic:  { name: "Current Director",    desc: "Shapes the ocean's own currents to build fertile shallows." }
    }},
  { id: "seed_disperser", name: "Seed Disperser", tier: 1, stage: "Flora", desc: "Scatters hardy starter species.", pps: 1.5, activeStages: [2], cost: { common_ore: 24 },
    typeFlavor: {
      frozen:   { name: "Tundra Seeder",           desc: "Drops cold-hardy mosses and lichens across the thawing ground." },
      desert:   { name: "Cactus Disperser",        desc: "Plants drought-resistant succulents that anchor the new soil." },
      rocky:    { name: "Lichen Scatter",           desc: "Seeds pioneer lichens that break rock into dirt." },
      volcanic: { name: "Volcanic Pioneer Seeder",  desc: "Drops heat-tolerant ferns into fresh volcanic soil." },
      toxic:    { name: "Adapted Spore Disperser",  desc: "Releases bio-engineered spores that thrive in residual toxins." },
      oceanic:  { name: "Mangrove Seeder",          desc: "Plants salt-tolerant roots along the new coastlines." }
    }},
  { id: "greenhouse", name: "Greenhouse", tier: 2, stage: "Flora", desc: "Local nursery for the slow-to-take.", pps: 2.5, activeStages: [2], cost: { common_ore: 30, catalysts: 16, biomatter: 6 },
    typeFlavor: {
      frozen:   { name: "Alpine Nursery",    desc: "A heated enclosure that coaxes temperate plants through frozen nights." },
      desert:   { name: "Oasis Nursery",     desc: "A shaded, humid shelter where seedlings forget the desert outside." },
      rocky:    { name: "Greenhouse",        desc: "Local nursery for the slow-to-take." },
      volcanic: { name: "Volcanic Nursery",  desc: "A cooled dome that shields young plants from ash and heat." },
      toxic:    { name: "Contained Nursery", desc: "A sealed grow-chamber where nothing toxic can reach the roots." },
      oceanic:  { name: "Tide-Pool Nursery", desc: "A sheltered basin that lets marine flora establish in calm water." }
    }},
  { id: "bio_incubator", name: "Bio-Incubator", tier: 2, stage: "Fauna", desc: "First small things, carefully.", pps: 2.0, activeStages: [3], cost: { common_ore: 30, biomatter: 16, rare_metals: 10 },
    typeFlavor: {
      frozen:   { name: "Hibernation Chamber",  desc: "Warms dormant organisms to life in controlled thermal cycles." },
      desert:   { name: "Burrow Incubator",     desc: "Breeds heat-adapted insects and lizards in cool underground nests." },
      rocky:    { name: "Bio-Incubator",        desc: "First small things, carefully." },
      volcanic: { name: "Thermal Hatchery",     desc: "Uses geothermal warmth to incubate heat-loving organisms." },
      toxic:    { name: "Detox Incubator",      desc: "Raises organisms pre-adapted to trace toxins in the soil." },
      oceanic:  { name: "Reef Spawner",         desc: "Cultivates coral polyps and small marine creatures in sheltered tanks." }
    }},
  { id: "ecosystem_stabilizer", name: "Ecosystem Stabilizer", tier: 3, stage: "Fauna", desc: "Holds a young ecosystem together until it can stand. Keeps working through Paradise.", pps: 3.0, activeStages: [3, 4], cost: { common_ore: 40, biomatter: 24, catalysts: 16, rare_metals: 10 },
    typeFlavor: {
      frozen:   { name: "Permafrost Balancer",    desc: "Manages freeze-thaw cycles so the young tundra ecology survives winter. Keeps working through Paradise." },
      desert:   { name: "Oasis Network",          desc: "Links water sources and shade corridors into a self-sustaining web. Keeps working through Paradise." },
      rocky:    { name: "Ecosystem Stabilizer",   desc: "Holds a young ecosystem together until it can stand. Keeps working through Paradise." },
      volcanic: { name: "Caldera Regulator",      desc: "Buffers eruptions and gas surges to protect the fragile new biome. Keeps working through Paradise." },
      toxic:    { name: "Biome Purifier",         desc: "Continuously scrubs residual toxins so the ecosystem doesn't backslide. Keeps working through Paradise." },
      oceanic:  { name: "Marine Equilibrium Array", desc: "Balances currents, salinity, and temperature across the living ocean. Keeps working through Paradise." }
    }},
  { id: "harmony_beacon", name: "Harmony Beacon", tier: 3, stage: "Paradise", desc: "Broadcasts the frequencies of a balanced world. The final push.", pps: 4.5, activeStages: [4], cost: { common_ore: 60, biomatter: 30, catalysts: 20, rare_metals: 16 },
    typeFlavor: {
      frozen:   { name: "Aurora Beacon",          desc: "Pulses light patterns that guide migratory species across the thawed tundra." },
      desert:   { name: "Dune Harmonizer",        desc: "Broadcasts wind patterns that distribute seeds and moisture across the sands." },
      rocky:    { name: "Harmony Beacon",         desc: "Broadcasts the frequencies of a balanced world. The final push." },
      volcanic: { name: "Magma Tuner",            desc: "Synchronizes geological rhythms so life above can settle permanently." },
      toxic:    { name: "Purity Beacon",          desc: "Emits resonance patterns that accelerate the last traces of toxin breakdown." },
      oceanic:  { name: "Tidal Beacon",           desc: "Coordinates ocean currents into patterns that sustain every living layer." }
    }},
  { id: "solar_array",         name: "Solar Array",            tier: 1, stage: "Universal",   desc: "Boosts all terraforming and extraction machines in the 8 adjacent tiles by +15% each. Place next to the machines you want to enhance.", pps: 0, activeStages: [], adjacencyBoost: 0.15, cost: { common_ore: 6 } },
  { id: "storage_silo",        name: "Storage Silo",           tier: 1, stage: "Universal",   desc: "Multiplies resource output of extraction machines in the 8 adjacent tiles by 1.20× each. Stacks multiplicatively. Place next to Mining Drills and Harvesters.", pps: 0, activeStages: [], adjacencyMult: 1.20, cost: { common_ore: 16 } },
  { id: "mining_drill",        name: "Mining Drill",           tier: 1, stage: "Extraction",  desc: "Pulls the planet's signature resource from the ground.",       pps: 0,   activeStages: [],          extractionRate: 0.05, extractionMinStage: 0, cost: { common_ore: 20 } },
  { id: "harvester",           name: "Harvester",              tier: 2, stage: "Extraction",  desc: "Efficient extractor. Needs living ground to work.",            pps: 0,   activeStages: [],          extractionRate: 0.15, extractionMinStage: 3, cost: { common_ore: 30, rare_metals: 10 } },
  { id: "deep_driller",        name: "Deep Driller",           tier: 3, stage: "Extraction",  desc: "Reaches deep deposits. Requires a mature ecosystem above.",    pps: 0,   activeStages: [],          extractionRate: 0.40, extractionMinStage: 4, cost: { common_ore: 50, rare_metals: 20, geothermal_cores: 10 } }
];

var STARTING_INVENTORY = { common_ore: 50, fuel: 5 };

var SIGNATURE_RESOURCES = [
  { id: "cryocrystals",    name: "Cryocrystals",     from: "frozen",   used_for: "Cooling volcanic worlds." },
  { id: "rare_metals",     name: "Rare Metals",      from: "desert",   used_for: "Advanced machine tiers." },
  { id: "geothermal_cores",name: "Geothermal Cores", from: "volcanic", used_for: "Energy on cold worlds." },
  { id: "catalysts",       name: "Catalysts",        from: "toxic",    used_for: "Accelerating flora." },
  { id: "biomatter",       name: "Biomatter",        from: "oceanic",  used_for: "Fauna stage anywhere." },
  { id: "common_ore",      name: "Common Ore",       from: "rocky",    used_for: "Universal currency." }
];

// Star chart — 18 systems. Harbor is the start at the outer edge.
// Inner systems (reachable at Drive tier 1) form a connected core via direct lanes.
// Outer systems require 2+ hop jumps (Drive tier 2+) to reach from Harbor.
var STAR_NAMES = [
  { id: "harbor",    name: "Harbor",    desc: "The dock. A single yellow star and the rust-colored world you launched from." },
  { id: "promise",   name: "Promise",   desc: "Flagged 'promising' on the chart you inherited. Four worlds and a quiet star." },
  { id: "veil",      name: "Veil",      desc: "A pale star wrapped in dust. Something old left a footprint here." },
  { id: "crucible",  name: "Crucible",  desc: "Hot inner worlds orbit a restless orange star." },
  { id: "drift",     name: "Drift",     desc: "A lazy system. Worlds spread wide, orbits slow." },
  { id: "cairn",     name: "Cairn",     desc: "Stone and silence. Whoever came before stacked something here." },
  { id: "bloom",     name: "Bloom",     desc: "Faint organic signatures — the instruments can't agree on what." },
  { id: "threshold", name: "Threshold", desc: "The edge of the dense cluster. Beyond here, stars thin out." },
  { id: "anvil",     name: "Anvil",     desc: "A dense binary pair, worlds squeezed between two suns." },
  { id: "loom",      name: "Loom",      desc: "Threads of dust weave between five small worlds." },
  { id: "hush",      name: "Hush",      desc: "The quietest system on the chart. Even the star seems dim." },
  { id: "sunder",    name: "Sunder",    desc: "A shattered ring of debris and two surviving planets." },
  { id: "pyre",      name: "Pyre",      desc: "An old red giant. The inner worlds are baked and beautiful." },
  { id: "wellspring",name: "Wellspring", desc: "Water everywhere. Three oceanic worlds and a frozen moon." },
  { id: "cloister",  name: "Cloister",  desc: "Tucked behind a dust lane. Hard to reach, worth the trip." },
  { id: "ember",     name: "Ember",     desc: "A dying star's last warmth. Quiet, distant, still worth tending." },
  { id: "kestrel",   name: "Kestrel",   desc: "A fast-spinning star throwing light in pulses. Two hardy worlds cling close." },
  { id: "solace",    name: "Solace",    desc: "The farthest point on the chart. Calm, cold, untouched." }
];

var STAR_KINDS = [
  { color: "#f4c46d", kind: "Yellow dwarf" },
  { color: "#fde3a0", kind: "Pale main-sequence" },
  { color: "#cfd8ea", kind: "Dust-shrouded giant" },
  { color: "#f5a040", kind: "Orange subgiant" },
  { color: "#e87060", kind: "Red giant" },
  { color: "#aac8f0", kind: "Blue-white dwarf" }
];

var PLANET_TYPE_IDS = ["frozen", "desert", "rocky", "volcanic", "toxic", "oceanic"];

// Deterministic seeded random for reproducible galaxy layout. The galaxy seed threads a per-
// save random source through buildGalaxy — passed in at save load, so two saves can have the
// same map when the seed matches, different otherwise.
var _starSeed = 42;
function starRng() { _starSeed = (_starSeed * 16807 + 0) % 2147483647; return (_starSeed & 0x7fffffff) / 0x7fffffff; }
function seedStarRng(seed) { _starSeed = seed || 42; }

// Build the galaxy from a seed. Call buildGalaxy(savedGalaxySeed) on load to reproduce the
// exact same systems + planet fertility + landmarks as when the save was created. The default
// `var STUB_SYSTEMS = buildGalaxy(42)` line below runs at module load so the game has a
// galaxy before any save is touched; it gets reassigned once a save's seed is known.
function buildGalaxy(galaxySeed) {
  seedStarRng(galaxySeed || 42);
  // Positions: hand-placed for visual appeal. Denser middle, sparser edges.
  // Canvas is 1500x750. Harbor at the left edge as the starting system.
  var positions = [
    /* harbor    */ { x: 100,  y: 500 },
    /* promise   */ { x: 280,  y: 380 },
    /* veil      */ { x: 480,  y: 460 },
    /* crucible  */ { x: 440,  y: 240 },
    /* drift     */ { x: 650,  y: 310 },
    /* cairn     */ { x: 240,  y: 210 },
    /* bloom     */ { x: 620,  y: 490 },
    /* threshold */ { x: 820,  y: 400 },
    /* anvil     */ { x: 380,  y: 380 },
    /* loom      */ { x: 700,  y: 170 },
    /* hush      */ { x: 900,  y: 240 },
    /* sunder    */ { x: 180,  y: 580 },
    /* pyre      */ { x: 540,  y: 110 },
    /* wellspring*/ { x: 900,  y: 540 },
    /* cloister  */ { x: 960,  y: 100 },
    /* ember     */ { x: 80,   y: 260 },
    /* kestrel   */ { x: 1100, y: 320 },
    /* solace    */ { x: 1260, y: 200 }
  ];

  // Jump lanes — an irregular web. Core is well-connected; edges sparser.
  var laneMap = {
    harbor:    ["promise", "sunder"],
    promise:   ["harbor", "veil", "cairn", "anvil"],
    veil:      ["promise", "anvil", "bloom"],
    crucible:  ["cairn", "drift", "pyre", "anvil"],
    drift:     ["crucible", "threshold", "loom"],
    cairn:     ["promise", "crucible", "ember"],
    bloom:     ["veil", "threshold", "wellspring"],
    threshold: ["drift", "bloom", "hush", "kestrel", "wellspring"],
    anvil:     ["promise", "veil", "crucible"],
    loom:      ["drift", "pyre", "hush"],
    hush:      ["threshold", "loom", "cloister", "kestrel"],
    sunder:    ["harbor", "ember"],
    pyre:      ["crucible", "loom", "cloister"],
    wellspring:["bloom", "threshold", "kestrel"],
    cloister:  ["hush", "pyre", "solace"],
    ember:     ["sunder", "cairn"],
    kestrel:   ["threshold", "hush", "wellspring", "solace"],
    solace:    ["kestrel", "cloister"]
  };

  // Planet mixes — each system gets 2–6 planets with varied types.
  // Rocky and Frozen weighted heavier (easier early worlds).
  var planetMixes = [
    /* harbor    */ ["rocky", "desert", "frozen"],
    /* promise   */ ["volcanic", "desert", "oceanic", "frozen"],
    /* veil      */ ["toxic", "rocky", "volcanic", "oceanic", "frozen"],
    /* crucible  */ ["volcanic", "volcanic", "desert"],
    /* drift     */ ["frozen", "rocky", "oceanic"],
    /* cairn     */ ["rocky", "rocky", "toxic"],
    /* bloom     */ ["oceanic", "toxic", "desert", "frozen"],
    /* threshold */ ["desert", "volcanic", "frozen", "rocky"],
    /* anvil     */ ["volcanic", "desert", "rocky", "toxic"],
    /* loom      */ ["frozen", "oceanic", "toxic", "desert", "rocky"],
    /* hush      */ ["frozen", "frozen", "rocky"],
    /* sunder    */ ["rocky", "volcanic"],
    /* pyre      */ ["volcanic", "desert", "toxic", "oceanic"],
    /* wellspring*/ ["oceanic", "oceanic", "oceanic", "frozen"],
    /* cloister  */ ["toxic", "oceanic", "desert"],
    /* ember     */ ["frozen", "rocky", "desert"],
    /* kestrel   */ ["rocky", "frozen", "desert", "volcanic"],
    /* solace    */ ["frozen", "frozen", "rocky", "oceanic", "toxic"]
  ];

  // Tender Ruin assignments: 10 ruins spread across different systems.
  // Key: planet_id -> ruin data. Weighted toward mid/outer systems.
  var tenderRuins = {
    "veil_b":      { ruinName: "The Listening Array",  activationStage: 3, fragment: "They built this to hear something. The array points outward, past the cluster's edge, toward a silence that answered them. Whatever they heard, they turned it off and left." },
    "crucible_a":  { ruinName: "The Ember Library",    activationStage: 4, fragment: "Books made of stone that release information when heated. Most are catalogues of species. The last shelf holds a single volume titled — as near as we can translate — 'Us.'" },
    "bloom_c":     { ruinName: "The Seed Vault",       activationStage: 2, fragment: "A library of seeds from worlds that no longer exist. Some are labeled in a script no one reads. The viable ones would grow in soil we haven't made yet." },
    "threshold_d": { ruinName: "The Root Cathedral",   activationStage: 5, fragment: "Underground. The roots of a tree that died ten thousand years ago still hold the ceiling up. Something is carved into every root: a name, maybe. Millions of names." },
    "loom_a":      { ruinName: "The Frozen Archive",   activationStage: 3, fragment: "Temperature-sealed records. What we can decode describes a debate: whether to stay and tend, or leave and trust the garden. The final entry is one word. We think it means 'go.'" },
    "hush_c":      { ruinName: "The Silent Nursery",   activationStage: 4, fragment: "Rows of empty cradles. Not abandoned — completed. Every one held something that grew and was released. The last cradle has a note that translates roughly to 'enough.'" },
    "pyre_b":      { ruinName: "The Star Cradle",      activationStage: 5, fragment: "A device pointed at the system's star. As near as we can tell, it was designed to keep the star alive longer. It worked. This star should have died a billion years ago." },
    "wellspring_b":{ ruinName: "The Tidal Clock",      activationStage: 2, fragment: "A mechanism that tracks the tides of a moon that orbits nothing. It's still running. It will always be running." },
    "cloister_a":  { ruinName: "The Glass Garden",     activationStage: 4, fragment: "A garden made entirely of glass. Every flower is a perfect replica of something that once grew here. The craftsmanship is beyond anything we could do. It is the most beautiful and saddest place I have ever seen." },
    "solace_c":    { ruinName: "The Last Record",      activationStage: 5, fragment: "A single message, repeated on every frequency, in every medium, buried in every ruin we've found. We finally translated it: 'We were here. We tended. It was good. Tend after us.'" }
  };

  return STAR_NAMES.map(function(s, si) {
    var pos = positions[si];
    var starKind = STAR_KINDS[si % STAR_KINDS.length];
    var mix = planetMixes[si];
    var planets = mix.map(function(type, pi) {
      var pid = s.id + "_" + String.fromCharCode(97 + pi);
      // Seeded fertility: 0.5–2.0, weighted distribution.
      var fRng = starRng();
      var fertility;
      if (fRng < 0.20) fertility = 0.5 + fRng / 0.20 * 0.2;         // Poor: 0.5–0.7
      else if (fRng < 0.60) fertility = 0.8 + (fRng - 0.20) / 0.40 * 0.4; // Average: 0.8–1.2
      else if (fRng < 0.90) fertility = 1.3 + (fRng - 0.60) / 0.30 * 0.3; // Good: 1.3–1.6
      else fertility = 1.7 + (fRng - 0.90) / 0.10 * 0.3;            // Exceptional: 1.7–2.0
      fertility = Math.round(fertility * 100) / 100;
      var planet = {
        id: pid,
        name: s.name + " " + (["I","II","III","IV","V"])[pi],
        type: type,
        stage: 0,
        orbit: pi,
        fertility: fertility
      };
      if (tenderRuins[pid]) planet.tenderRuin = tenderRuins[pid];
      // Deterministic landmarks per planet from a hash of (galaxySeed, planet.id), so fertility
      // variation and landmark placement don't share an RNG stream.
      planet.landmarks = generatePlanetLandmarks(planet, galaxySeed);
      return planet;
    });
    return {
      id: s.id,
      name: s.name,
      x: pos.x, y: pos.y,
      description: s.desc,
      star: { name: s.name, color: starKind.color, kind: starKind.kind },
      planets: planets,
      connections: laneMap[s.id] || []
    };
  });
}

// Visual palette for the System Map — one color per planet type.
var PLANET_COLORS = {
  frozen:   "#b8d8ea",
  desert:   "#e4b877",
  rocky:    "#8a7a6a",
  volcanic: "#c9543a",
  toxic:    "#8fc27a",
  oceanic:  "#3a7ac9"
};

// Planet surface grid dimensions (Phase 2).
var SURFACE_GRID_COLS = 12;
var SURFACE_GRID_ROWS = 8;

// Landmarks — multi-tile surface features that boost specific machines when built on top.
// Each planet type has three candidates; generatePlanetLandmarks picks 2–3 per planet and
// places them with deterministic positions from the galaxy seed.
//
// Affinity schema (exactly one per landmark):
//   affinityMachines: ["id", "id"] — lists the exact machine IDs boosted. Planet-specific
//     flavor names are used for display via formatLandmarkEffect.
//   affinityCategory: "extraction" — any machine with extractionRate, once its min stage is met.
//   affinityCategory: "terraforming_current_stage" — any pps machine active at the world's
//     current stage. Relevant throughout progression, so gets a smaller bonus (0.20).
//
// `desc` is pure flavor; the mechanical "Boosts X" line is computed at render time.
var LANDMARKS = {
  frozen: [
    { id: "geothermal_hotspot", name: "Geothermal Hotspot", size: [2, 2],
      affinityCategory: "terraforming_current_stage", bonus: 0.20,
      color: "#f08060", desc: "Rare warmth on a frozen world." },
    { id: "ancient_glacier_face", name: "Ancient Glacier Face", size: [3, 2],
      affinityMachines: ["ice_melter", "water_pump"], bonus: 0.50,
      color: "#a8d8f0", desc: "Locked water, waiting." },
    { id: "cryo_crystal_seam", name: "Cryo-Crystal Seam", size: [2, 2],
      affinityCategory: "extraction", bonus: 0.20,
      color: "#b8d8ea", desc: "Visible Cryocrystals in the ice." }
  ],
  desert: [
    { id: "ancient_riverbed", name: "Ancient Riverbed", size: [3, 2],
      affinityMachines: ["ice_melter", "water_pump"], bonus: 0.50,
      color: "#a8d8f0", desc: "Dry but remembered." },
    { id: "rare_metal_outcrop", name: "Rare Metal Outcrop", size: [2, 2],
      affinityCategory: "extraction", bonus: 0.20,
      color: "#e4b877", desc: "Surface-exposed metals." },
    { id: "sheltered_oasis", name: "Sheltered Oasis", size: [2, 2],
      affinityMachines: ["seed_disperser", "greenhouse"], bonus: 0.50,
      color: "#6fbf73", desc: "Already trying to grow." }
  ],
  rocky: [
    { id: "mineral_vein", name: "Mineral Vein", size: [3, 2],
      affinityCategory: "extraction", bonus: 0.20,
      color: "#c6a55a", desc: "The seam you were hoping for." },
    { id: "meteor_crater", name: "Meteor Crater", size: [2, 2],
      affinityCategory: "terraforming_current_stage", bonus: 0.20,
      color: "#8a7a6a", desc: "A shortcut to bedrock." },
    { id: "exposed_aquifer", name: "Exposed Aquifer", size: [2, 2],
      affinityMachines: ["ice_melter", "water_pump"], bonus: 0.50,
      color: "#a8d8f0", desc: "Underground water near the surface." }
  ],
  volcanic: [
    { id: "lava_tube_network", name: "Lava Tube Network", size: [3, 3],
      affinityCategory: "extraction", bonus: 0.20,
      color: "#c9543a", desc: "Natural tunnels concentrate geothermal energy." },
    { id: "cooled_vent_field", name: "Cooled Vent Field", size: [3, 2],
      affinityCategory: "terraforming_current_stage", bonus: 0.20,
      color: "#8a7a6a", desc: "Stable ground on an unstable world." },
    { id: "obsidian_deposit", name: "Obsidian Deposit", size: [2, 2],
      affinityCategory: "extraction", bonus: 0.20,
      color: "#3a2a4a", desc: "Glass-rich pocket." }
  ],
  toxic: [
    { id: "stable_pocket", name: "Stable Pocket", size: [3, 2],
      affinityCategory: "terraforming_current_stage", bonus: 0.20,
      color: "#8fc27a", desc: "A clean zone the planet forgot it had." },
    { id: "catalyst_pool", name: "Catalyst Pool", size: [2, 2],
      affinityCategory: "extraction", bonus: 0.20,
      color: "#aac878", desc: "Natural catalyst concentration." },
    { id: "scrubber_ready_ridge", name: "Scrubber-Ready Ridge", size: [2, 2],
      affinityMachines: ["gas_extractor", "pressure_regulator"], bonus: 0.50,
      color: "#a8d8f0", desc: "Wind patterns favor filtration." }
  ],
  oceanic: [
    { id: "reef_nucleus", name: "Reef Nucleus", size: [3, 2],
      affinityMachines: ["bio_incubator", "ecosystem_stabilizer"], bonus: 0.50,
      color: "#d9a66a", desc: "Life wants to happen here." },
    { id: "thermal_spring", name: "Thermal Spring", size: [2, 2],
      affinityMachines: ["seed_disperser", "greenhouse"], bonus: 0.50,
      color: "#6fbf73", desc: "Warm nutrient-rich water." },
    { id: "deep_current_access", name: "Deep Current Access", size: [2, 2],
      affinityCategory: "extraction", bonus: 0.20,
      color: "#3a7ac9", desc: "Upwelling nutrients." }
  ]
};

// Mix galaxy seed and planet id into a deterministic 31-bit hash, then drive a local RNG
// for that planet. Keeps landmarks stable even if other seeded systems (fertility) get
// reshuffled later.
function planetLandmarkSeed(galaxySeed, planetId) {
  var hash = galaxySeed || 42;
  for (var i = 0; i < planetId.length; i++) {
    hash = ((hash * 31) + planetId.charCodeAt(i)) % 2147483647;
  }
  return hash & 0x7fffffff;
}

function generatePlanetLandmarks(planet, galaxySeed) {
  var pool = LANDMARKS[planet.type] || [];
  if (pool.length === 0) return [];
  var seed = planetLandmarkSeed(galaxySeed, planet.id);
  function rand() { seed = (seed * 16807 + 0) % 2147483647; return (seed & 0x7fffffff) / 0x7fffffff; }

  // 60% chance of 2 landmarks, 40% chance of 3.
  var count = rand() < 0.6 ? 2 : 3;
  count = Math.min(count, pool.length);

  // Draw without replacement so a planet never gets two of the same landmark.
  var available = pool.slice();
  var chosen = [];
  for (var i = 0; i < count; i++) {
    var idx = Math.floor(rand() * available.length);
    chosen.push(available.splice(idx, 1)[0]);
  }

  // Place each with a few random attempts — accept the first non-overlapping fit. If nothing
  // works in 20 tries, silently drop that landmark rather than forcing a bad layout.
  var placed = [];
  var cols = SURFACE_GRID_COLS, rows = SURFACE_GRID_ROWS;
  chosen.forEach(function(lm) {
    var w = lm.size[0], h = lm.size[1];
    if (w > cols || h > rows) return;
    for (var attempt = 0; attempt < 20; attempt++) {
      var x = Math.floor(rand() * (cols - w + 1));
      var y = Math.floor(rand() * (rows - h + 1));
      var overlaps = placed.some(function(p) {
        return !(x + w <= p.x || p.x + p.size[0] <= x || y + h <= p.y || p.y + p.size[1] <= y);
      });
      if (!overlaps) {
        placed.push({ id: lm.id, x: x, y: y, size: lm.size });
        return;
      }
    }
  });
  return placed;
}

// Look up a landmark definition by id for a given planet type.
function findLandmarkDef(planetType, landmarkId) {
  var pool = LANDMARKS[planetType] || [];
  return pool.find(function(l) { return l.id === landmarkId; }) || null;
}

// Produce the player-facing "Boosts X" line for a landmark. Uses planet-specific flavor names
// for any affinityMachines list. Category landmarks get a canned description.
function formatLandmarkEffect(landmarkDef, planetType) {
  if (!landmarkDef) return "";
  if (landmarkDef.affinityMachines) {
    var names = landmarkDef.affinityMachines.map(function(mid) {
      var md = MACHINES.find(function(m) { return m.id === mid; });
      if (!md) return mid;
      var flavor = md.typeFlavor && md.typeFlavor[planetType];
      return (flavor && flavor.name) || md.name;
    });
    if (names.length === 1) return "Boosts " + names[0];
    if (names.length === 2) return "Boosts " + names[0] + " and " + names[1];
    return "Boosts " + names.slice(0, -1).join(", ") + ", and " + names[names.length - 1];
  }
  if (landmarkDef.affinityCategory === "extraction") {
    return "Boosts Mining Drill, Harvester, and Deep Driller";
  }
  if (landmarkDef.affinityCategory === "terraforming_current_stage") {
    return "Boosts currently-active terraforming machines";
  }
  return "";
}

// Return the landmark (if any) covering a tile on a given planet.
function landmarkAtTile(planet, x, y) {
  if (!planet || !planet.landmarks) return null;
  for (var i = 0; i < planet.landmarks.length; i++) {
    var lm = planet.landmarks[i];
    if (x >= lm.x && x < lm.x + lm.size[0] && y >= lm.y && y < lm.y + lm.size[1]) return lm;
  }
  return null;
}

// Default galaxy at module load — reassigned from the save's seed in continueGame and
// startNewGame. Nothing rendered before then would notice the swap.
var STUB_SYSTEMS = buildGalaxy(42);

// Freeze the current galaxy's per-planet data (fertility + landmark placements) into a plain
// object keyed by planet id. Called once at new-game time; the result is stored in the save so
// future code changes to buildGalaxy / generatePlanetLandmarks / fertility RNG can't shift
// landmarks or fertility out from under an existing run.
function capturePlanetData() {
  var out = {};
  STUB_SYSTEMS.forEach(function(sys) {
    sys.planets.forEach(function(p) {
      out[p.id] = {
        fertility: p.fertility,
        landmarks: p.landmarks ? p.landmarks.map(function(lm) { return Object.assign({}, lm); }) : []
      };
    });
  });
  return out;
}

// Overlay a persistedPlanets snapshot onto the current STUB_SYSTEMS, replacing each planet's
// fertility and landmarks with the saved values. Call after buildGalaxy(seed) on load so the
// rebuilt skeleton (systems, star positions, connections, ids) stays intact but the
// per-planet generated data comes from the save.
function applyPersistedPlanets(persistedPlanets) {
  if (!persistedPlanets) return;
  STUB_SYSTEMS.forEach(function(sys) {
    sys.planets.forEach(function(p) {
      var saved = persistedPlanets[p.id];
      if (!saved) return;
      if (saved.fertility != null) p.fertility = saved.fertility;
      if (saved.landmarks) p.landmarks = saved.landmarks.map(function(lm) { return Object.assign({}, lm); });
    });
  });
}

// Points required to advance each terraforming stage. Indexed by current stage.
var STAGE_THRESHOLDS = [
  900,     // Stage 0→1 Atmosphere
  2700,    // Stage 1→2 Hydrosphere
  5400,    // Stage 2→3 Flora
  10800,   // Stage 3→4 Fauna
  21600    // Stage 4→5 Paradise
];
// Helper for backward compat — returns threshold for a given stage.
function stageThreshold(stage) {
  return STAGE_THRESHOLDS[stage] || 21600;
}

// Stage index to human-readable stage name for machine UI.
var ACTIVE_STAGE_NAMES = {
  0: "Barren → Atmosphere",
  1: "Atmosphere → Hydrosphere",
  2: "Hydrosphere → Flora",
  3: "Flora → Fauna",
  4: "Fauna → Paradise"
};

// Color per machine category — drives the pip on the surface grid and the sidebar swatch.
var MACHINE_CATEGORY_COLORS = {
  Atmosphere:  "#a8d8f0",
  Hydrosphere: "#3a7ac9",
  Flora:       "#6fbf73",
  Fauna:       "#d9a66a",
  Paradise:    "#e8c8f0",
  Universal:   "#f4c46d",
  Extraction:  "#c9a0e0"
};

// Resource production — passive baseline trickle. Extraction machines are the primary driver.
var PRODUCTION_PER_STAGE = {
  3: 0.015,
  4: 0.04,
  5: 0.10
};

// Rocky worlds produce Common Ore from stage 0.
var ROCKY_PRODUCTION_PER_STAGE = {
  0: 0.005,
  1: 0.01,
  2: 0.02,
  3: 0.04,
  4: 0.08,
  5: 0.12
};

// Non-Rocky worlds produce a base trickle of Common Ore at stages 0–2.
var BASE_ORE_TRICKLE = 0.005;

// Planet type -> signature resource id. Mirrors SIGNATURE_RESOURCES for quick lookup.
var PLANET_TYPE_RESOURCE = {
  frozen:   "cryocrystals",
  desert:   "rare_metals",
  volcanic: "geothermal_cores",
  toxic:    "catalysts",
  oceanic:  "biomatter",
  rocky:    "common_ore"
};

// Ship upgrade tracks — 5 tiers each. Tier 1 is the starting state (no cost).
// Cost maps are { resourceId: amount }.
var UPGRADE_TRACKS = [
  {
    id: "hull",
    label: "Hull",
    desc: "Cargo capacity and tending focus.",
    tiers: [
      { tier: 1, cost: null, effect: "Tending Focus: 2 worlds · Cargo cap: 200" },
      { tier: 2, cost: { common_ore: 16 },                                                          effect: "Tending Focus: 3 worlds · Cargo cap: 300" },
      { tier: 3, cost: { common_ore: 32, rare_metals: 16 },                                         effect: "Tending Focus: 4 worlds · Cargo cap: 450" },
      { tier: 4, cost: { common_ore: 64, rare_metals: 32, cryocrystals: 16 },                       effect: "Tending Focus: 5 worlds · Cargo cap: 650" },
      { tier: 5, cost: { common_ore: 128, rare_metals: 64, cryocrystals: 32, biomatter: 16 },       effect: "Tending Focus: 6 worlds · Cargo cap: 900" }
    ]
  },
  {
    id: "drive",
    label: "Drive",
    desc: "Jump range and system scanning.",
    tiers: [
      { tier: 1, cost: null, effect: "1-hop jumps" },
      { tier: 2, cost: { geothermal_cores: 20 },                                                    effect: "2-hop jumps · Scan: planet types" },
      { tier: 3, cost: { geothermal_cores: 40, cryocrystals: 20 },                                  effect: "3-hop jumps · Scan: planet stages" },
      { tier: 4, cost: { geothermal_cores: 80, cryocrystals: 40, catalysts: 20 },                   effect: "4-hop jumps · Scan: star type" },
      { tier: 5, cost: { geothermal_cores: 160, cryocrystals: 80, catalysts: 40, biomatter: 20 },   effect: "Chart-wide jumps · Full scan" }
    ]
  },
  {
    id: "lab",
    label: "Lab",
    desc: "Surface readouts and production analysis.",
    tiers: [
      { tier: 1, cost: null, effect: "Basic readouts" },
      { tier: 2, cost: { catalysts: 20 },                                                           effect: "Resource previews" },
      { tier: 3, cost: { catalysts: 40, rare_metals: 20 },                                          effect: "Production breakdown" },
      { tier: 4, cost: { catalysts: 80, rare_metals: 40, biomatter: 20 },                           effect: "Efficiency formulas" },
      { tier: 5, cost: { catalysts: 160, rare_metals: 80, biomatter: 40, cryocrystals: 20 },        effect: "Paradise projections" }
    ]
  }
];

// Hull tier -> max number of worlds with machines placed that haven't reached Paradise.
function hullWorldLimit(hullTier) {
  return 1 + (hullTier || 1);
}

// Hull tier -> cargo cap per resource.
var HULL_CARGO_CAP = { 1: 200, 2: 300, 3: 450, 4: 650, 5: 900 };
function cargoCap(hullTier) {
  return HULL_CARGO_CAP[hullTier || 1] || 200;
}

// Fertility category from multiplier value.
function fertilityCategory(f) {
  if (f >= 1.7) return "Exceptional";
  if (f >= 1.3) return "Good";
  if (f >= 0.8) return "Average";
  return "Poor";
}

// Flourishing bonus for a system. Returns multiplier (1.0, 1.25, or 1.50).
function flourishingBonus(systemId, worlds) {
  var sys = STUB_SYSTEMS.find(function(s) { return s.id === systemId; });
  if (!sys) return 1.0;
  var total = sys.planets.length;
  var paradise = 0;
  sys.planets.forEach(function(p) {
    var w = worlds && worlds[p.id];
    if (w && w.stage >= 5) paradise++;
  });
  if (paradise >= total && total > 0) return 1.50;
  if (paradise >= 3) return 1.25;
  return 1.0;
}

// Graduated Paradise passive production rate per second for a planet's signature resource.
var PARADISE_PASSIVE_RATE = 0.15;

// Crew congratulations when a stage threshold is crossed. Keyed by the newly entered stage.
// Botanist speaks for Flora/Fauna/Paradise; Engineer speaks for Atmosphere/Hydrosphere.
var STAGE_CONGRATS = {
  1: { role: "engineer", line: "\"Atmosphere holds. Breathable, mostly. That's the hard part done.\"" },
  2: { role: "engineer", line: "\"Rain. Actual rain. Listen to it for a second, captain.\"" },
  3: { role: "botanist", line: "\"First green. I wasn't sure it'd take. It took.\"" },
  4: { role: "botanist", line: "\"Something moved out there. Something small. Something alive.\"" },
  5: { role: "botanist", line: "\"It's a paradise now. Whatever we were trying to do — we did it.\"" }
};

// Contextual advice system, voiced by the Cartographer. Keyed by context, then candidate_id.
var CARTOGRAPHER_ADVICE = {
  ship_no_worlds: {
    reza: "We have systems within reach, captain. I'd start with Harbor — the world you launched from has Rocky terrain, and Rocky worlds produce Common Ore from the very first stage. Every other machine we build will need it.",
    ines: "Harbor is mapped. Promise is flagged. We should start where the ore is — Rocky world, Harbor system. Open the star chart.",
    echo: "Harbor. Start there."
  },
  ship_worlds_below_flora: {
    reza: "These things take time, captain. Let the machines work — a world doesn't change in an afternoon. We have other systems to visit while this one grows. Check back tomorrow.",
    ines: "The chart is waiting. Your world won't stop growing while you're gone. Scout, map, come back later. That's the rhythm.",
    echo: "It's growing. Slowly. Go do something else."
  },
  ship_world_at_flora: {
    reza: "It's producing resources now. That's the feeling I hoped you'd see. We can spend them on a Hull upgrade, a Drive upgrade, or a second world. Your choice, captain.",
    ines: "Resources flowing. Upgrade the Drive — more systems, more charts to fill. Or the Hull, if you'd rather spread wider first.",
    echo: "It produces now. Spend it."
  },
  ship_multiple_worlds: {
    reza: "Your worlds are ticking along, but slowly, captain. Aboard, everything runs at a quarter speed. Visit the ones that need attention most — your presence makes all the difference. And keep an eye on the cargo cap.",
    ines: "All aboard means 25% efficiency across the board. Prioritize. Visit the world you want to move fastest; the others will keep their slow pace. Watch the cap.",
    echo: "They're slow without you. Go see one."
  },
  ship_low_fuel: {
    reza: "Fuel's running thin, captain. We should head back to Harbor to top off, or start refining more from the stockpile. A stranded ship is a slow ship.",
    ines: "Fuel count's low. Harbor trickles replenish, chemistry refines. Pick one before you're grounded.",
    echo: "Low fuel. Dock. Or craft."
  },
  ship_chemistry_idle: {
    reza: "The greenhouse is quiet, captain. The still could be running on something. Fuel, a probe, anything — it pays to keep the line busy.",
    ines: "Chemistry queue empty. You have the resources for at least one recipe, probably more. The queue earns while you work.",
    echo: "Empty queue. Run something."
  },
  ship_probe_in_flight: {
    reza: "There's a probe out there somewhere, captain. It'll arrive when it arrives. The galaxy is larger than it looks from a chart.",
    ines: "Probe in transit. Three minutes per hop. Patience is the price of reach.",
    echo: "It travels. It arrives. Wait."
  },
  ship_paradise_exists: {
    reza: "You've brought a world to Paradise, captain. That's no small thing. The galaxy is large and there are harder worlds out there — Volcanic, Toxic. But there's no rush. Tend what calls to you.",
    ines: "Paradise achieved. The chart still has blanks. Drive upgrades open the outer ring. More worlds, more data.",
    echo: "One done. More to do. Or not. Your call."
  },
  chart_never_jumped: {
    reza: "Tap any reachable system to see what's there. Promise has been flagged as promising — four worlds and a quiet star. Tap it, then tap Jump.",
    ines: "Every system is a hypothesis, captain. Jump to Promise — it's the obvious first. Then map everything.",
    echo: "Jump. Anywhere. We'll see."
  },
  chart_has_unreachable: {
    reza: "The greyed-out systems are beyond our Drive range. A Drive upgrade would open the next ring outward. Geothermal Cores from Volcanic worlds are what we'd need. Worth saving for.",
    ines: "More chart waiting behind that grey wall. Drive upgrade. The cost is Geothermal Cores — find a Volcanic world or check your stockpiles.",
    echo: "Can't reach those. Drive. Upgrade."
  },
  chart_explored: {
    reza: "We've seen a good portion of the chart now. If there are worlds still growing, tend them. If the Drive can reach further, there's always more to find.",
    ines: "Chart's filling in. Keep terraforming — resources fund the next Drive tier, and the next tier funds more chart.",
    echo: "Keep going."
  },
  system_no_landed: {
    reza: "Tap a planet to see what it is. Rocky worlds are the easiest start — Common Ore from day one. Volcanic and Toxic are harder puzzles, worthy but not first.",
    ines: "Land somewhere. Anywhere. Rocky first if you're being smart about it. Start cataloguing.",
    echo: "Pick one."
  },
  system_has_worlds: {
    reza: "You have worlds here already. Tap one to check its progress, or land on a new planet to start it fresh. Every world you tend makes the next one easier.",
    ines: "Existing work here. Check progress or expand. More worlds, more resources, more options.",
    echo: "Check them. Or start another."
  },
  surface_no_machines: {
    reza: "Tap the Build button, pick a machine, then tap a tile to place it. For a fresh world, start with a few Gas Extractors and a Solar Array. Basic but reliable. The stages come in order — atmosphere first.",
    ines: "Gas Extractors first. Atmosphere first. The stages come in order. Solar Arrays boost them. Place and wait.",
    echo: "Extractors. Place them."
  },
  surface_machines_active: {
    reza: "Stay a while, captain. The crew will find things to do — and the machines run better with eyes on them. An idle surface loses its edge. Tap an active extractor to harvest a burst while you're here.",
    ines: "Don't leave yet. On-surface is 100%; aboard is 25%. The crew proposes tasks when you linger — act on them. Harvest tap works on active extractors.",
    echo: "Stay. The machines prefer it."
  },
  surface_machines_idle: {
    reza: "Some machines went idle — they're from the previous stage. Tap them to deconstruct and recover 75% of their resources. Then build the next stage's machines to keep progressing.",
    ines: "Deconstruct the idle ones. Recycle. Build forward. Don't leave dead weight on the surface.",
    echo: "Idle now. Take them down. Rebuild."
  },
  surface_paradise: {
    reza: "This world tends itself now, captain. It produces its signature resource forever. The machines were deconstructed and their materials returned to you. Beautiful work.",
    ines: "Graduated. Producing passively. Materials recovered. Move on to the next chart entry.",
    echo: "Done. It gives back now. Go."
  },
  ship_has_no_fragments: {
    reza: "There are old things out there, captain. Ruins from whoever came before us. We'll need a better Lab to find them — tier 4 at least. But they're worth looking for.",
    ines: "The instruments detect anomalies we can't resolve. Lab upgrade. Tier 4 minimum. Then we'll see what's hidden.",
    echo: "Something old. Can't see it yet. Lab."
  },
  ship_has_some_fragments: {
    reza: "We've found fragments of their story — the ones who tended before us. There are more ruins out there. Keep exploring, keep terraforming. Some only reveal themselves to worlds that have fully grown.",
    ines: "Fragments collected. More out there. Some ruins need higher stage worlds to activate. Keep pushing.",
    echo: "More. Keep looking."
  },
  chart_flourishing_possible: {
    reza: "If we finished all the worlds in one of these systems, the whole system would flourish — a production bonus for everything there. Worth concentrating our efforts.",
    ines: "Three Paradise worlds in one system triggers Flourishing. All of them triggers the full bonus. Cluster your completed worlds.",
    echo: "Focus one system. Finish it."
  }
};

// Pick contextual advice for a cartographer candidate.
function pickAdvice(contextId, candidateId) {
  var ctx = CARTOGRAPHER_ADVICE[contextId];
  if (!ctx) return null;
  return ctx[candidateId] || ctx.reza || null;
}

// Placeholder lines so clicking a crewmate does something in Phase 0.
var PLACEHOLDER_LINES = {
  botanist:     "\"The greenhouse is empty. It won't be for long.\"",
  engineer:     "\"Drive's warm. Say the word.\"",
  cartographer: "\"Whenever you're ready, captain.\"",
  cook:         "\"Sit. Eat first. The galaxy will wait.\""
};

// Reactive crew comment system. Keyed by candidate_id, then event type.
// Event types: stage_advance, first_paradise, paradise, upgrade_hull, upgrade_drive,
//   upgrade_lab, new_system, drive_unlock, cargo_cap, offline_return, tenth_machine, deconstruct
var CREW_REACTIONS = {
  // ---------- Botanists ----------
  yuki: {
    stage_advance: [
      "Another threshold crossed. I've been sketching the leaf shapes — they're changing already.",
      "Quiet progress. The best kind.",
      "The readings shifted. It's working, captain."
    ],
    first_paradise: [
      "I didn't think it would take. It took. Look at it, captain.",
      "I filled a whole notebook on this one. Every page, every stage.",
      "Self-sustaining. The numbers say so. I believe the numbers."
    ],
    paradise: [
      "Another world standing on its own. I'll never get used to that.",
      "Paradise. The word feels earned this time.",
      "I've started a new notebook."
    ],
    deconstruct: [
      "Careful with the roots around that one.",
      "The soil will fill in. Give it time.",
      "Good. It was in the way of something better."
    ]
  },
  mira: {
    stage_advance: [
      "Textbook transition. Well — the textbook I'm writing, anyway.",
      "The biome shift is within expected parameters. Excellent.",
      "Note: stage transition confirmed. Proceeding."
    ],
    first_paradise: [
      "The stabilization curve is textbook. Frame this world, captain.",
      "Self-sustaining equilibrium achieved. Publication-worthy, frankly.",
      "I will allow myself one moment of satisfaction. There. Done."
    ],
    paradise: [
      "Another data point for the model. A beautiful one.",
      "Consistent results. The methodology holds.",
      "Paradise confirmed. Adjusting projections for the next candidate."
    ],
    deconstruct: [
      "Reclaiming materials is efficient. I approve.",
      "Document the removal. We may want the data later."
    ]
  },
  fern: {
    stage_advance: [
      "Look at her go! I'm so proud I could cry. I won't, but I could.",
      "She's growing up! Someone get me a tissue.",
      "Named the first sprout Gerald. Gerald's doing great."
    ],
    first_paradise: [
      "She's alive. God, look at her.",
      "I promised I wouldn't name an entire planet but I'm going to name this entire planet.",
      "Every embarrassing sprout name was worth it. Every single one."
    ],
    paradise: [
      "Another baby all grown up. They grow so fast.",
      "I'm running out of embarrassing names. Just kidding, I'll never run out.",
      "She's perfect. Don't tell the other planets I said that."
    ],
    deconstruct: [
      "Bye bye, little friend. You did good.",
      "Ripping things out of the ground. My least favorite part."
    ]
  },
  // ---------- Engineers ----------
  holly: {
    stage_advance: [
      "Machines are holding. That's my weld work, captain.",
      "Another stage. The hull's complaining about the load, but she'll manage.",
      "Pressure's good. Temperature's good. I'm satisfied."
    ],
    upgrade_hull: [
      "Better. The old configuration was going to fail within the year.",
      "New plating's in. Don't scratch it.",
      "Cargo holds are reinforced. Try not to fill them with junk."
    ],
    upgrade_drive: [
      "Drive coils are singing. She can reach further now.",
      "Calibrated. Don't ask how long it took.",
      "More range. Try not to strand us."
    ],
    drive_unlock: [
      "New systems in range. About time we stretched our legs.",
      "Drive's warmed up. Those stars aren't going to visit themselves."
    ],
    tenth_machine: [
      "Ten machines on one world. That's a proper operation now.",
      "Starting to look like a real build site. Good.",
      "Ten. Keep it tight or I'll come down there and rewire the lot."
    ],
    deconstruct: [
      "Good steel back in the hold. Nothing wasted.",
      "Pulling her apart clean. I hate sloppy teardowns.",
      "Recycled. That's how it's done."
    ]
  },
  kiran: {
    stage_advance: [
      "YES! Did you see that? The gauges just — captain, it WORKED!",
      "I stayed up all night watching the readouts and it was WORTH IT!",
      "The machines are humming perfectly. I tuned them myself!"
    ],
    upgrade_hull: [
      "New hull panels! Can I name them? I want to name them.",
      "More room! More worlds! This is the best day!",
      "I already have ideas for what to do with the extra space."
    ],
    upgrade_drive: [
      "Wait — we can actually get THERE now? Captain, we can actually get there!",
      "I rewired the coils THREE TIMES to get this right!",
      "The drive sounds different. Better. I can hear it from my bunk."
    ],
    drive_unlock: [
      "New stars! NEW STARS! I'm not crying, the ventilation is just — okay I'm crying.",
      "Captain! Captain! Look at the chart! LOOK AT IT!"
    ],
    tenth_machine: [
      "Ten machines! That's more than some stations have!",
      "I calibrated every single one of them myself. Well, Holly helped.",
      "Can we get to twenty? Please say we can get to twenty."
    ],
    deconstruct: [
      "I'll salvage the good parts. Nothing goes to waste on my watch!",
      "Taking her apart is harder than putting her together. I hate this part."
    ]
  },
  tov: {
    stage_advance: [
      "Good.",
      "Stable. That's what matters.",
      "It holds. Move on."
    ],
    upgrade_hull: [
      "Good.",
      "Stronger now. Good enough.",
      "Done."
    ],
    upgrade_drive: [
      "Farther, then.",
      "The old drives were better built. But these are faster.",
      "Calibrated."
    ],
    drive_unlock: [
      "New reach. Use it wisely.",
      "More sky. Same crew. We'll manage."
    ],
    tenth_machine: [
      "Solid build.",
      "Ten. That's enough to hold."
    ],
    deconstruct: [
      "Clean work.",
      "Done. Next.",
      "Waste nothing."
    ]
  },
  // ---------- Cartographers ----------
  ines: {
    stage_advance: [
      "Updating the chart. Stage transitions get their own color in my system.",
      "Another data point. The map grows richer.",
      "Noted, plotted, annotated. This is what I live for."
    ],
    new_system: [
      "A new system to map! Every blank space on this chart is a personal insult.",
      "Uncharted. Not for long. Give me an hour with the instruments.",
      "Oh, this one has interesting orbital mechanics. Let me just — give me a minute.",
      "Coordinates locked. Adding to the master chart NOW."
    ],
    upgrade_lab: [
      "Better instruments. Better data. Better maps. This is how it should be.",
      "The new scanners are already showing things the old ones missed.",
      "Finally. I've been working with children's toys until now."
    ],
    deconstruct: [
      "Removing it from the surface map. Noted.",
      "Fewer machines. Simpler layout. I can work with that."
    ]
  },
  reza: {
    stage_advance: [
      "I've seen a hundred worlds turn. It never gets old, captain.",
      "There's a story in every stage. This one's chapter just changed.",
      "My old captain would have loved to see this."
    ],
    new_system: [
      "A new star. I used to dream about these when I was young.",
      "There are stories here. I can feel them in the light.",
      "I knew the name before we arrived. Don't ask me how.",
      "Another star that someone, somewhere, made a wish on. Now we're standing in it."
    ],
    upgrade_lab: [
      "Better eyes for an old stargazer. Thank you, captain.",
      "The new instruments show me things I'd only guessed at. Beautiful things.",
      "Knowledge is the only cargo that gets lighter as you carry more of it."
    ],
    deconstruct: [
      "Everything has its season. That machine's season is done.",
      "We leave lighter than we arrived. That's not always a loss."
    ]
  },
  echo: {
    stage_advance: [
      "...noted.",
      "Mm.",
      "Good."
    ],
    new_system: [
      "...interesting.",
      "New light.",
      "Hm."
    ],
    upgrade_lab: [
      "Better.",
      "...good instruments. Finally.",
      "Mm. This will do."
    ],
    deconstruct: [
      "...",
      "Clean."
    ]
  },
  // ---------- Cooks ----------
  babu: {
    stage_advance: [
      "Another stage! This calls for the good plates!",
      "I made something special for this. Come eat before it gets cold.",
      "Progress! The universe is kinder when your belly's full."
    ],
    first_paradise: [
      "PARADISE! I'm making a feast. Everyone to the galley. NOW.",
      "Little star, you've done it. The biggest pot. The longest table.",
      "Tears in the stew tonight. The happy kind."
    ],
    paradise: [
      "Another paradise means another feast. I don't make the rules.",
      "The good plates again! I just washed them!",
      "I'm going to need a bigger galley at this rate."
    ],
    upgrade_hull: [
      "More cargo space? More room for spices. I know my priorities.",
      "Good. I was running out of shelf space for the jars."
    ],
    upgrade_drive: [
      "Faster travel means the bread is still warm when we arrive!",
      "New stars, new ingredients. I'm already planning the menu."
    ],
    new_system: [
      "New system! I wonder what grows there. I wonder what it tastes like.",
      "Another star to cook under. The light changes the flavor, you know."
    ],
    cargo_cap: [
      "Overflowing! This is what happens when you don't cook often enough.",
      "Too much of a good thing. We need to USE some of this, captain!",
      "The shelves are full. Time to build something. Or eat something."
    ],
    offline_return: [
      "There you are, little star. I kept the kettle warm.",
      "Back! Good. The stew's been waiting. Sit.",
      "I was starting to worry. But the bread kept rising, so I kept baking.",
      "Welcome home, captain. You look hungry."
    ],
    deconstruct: [
      "Recycling. Very practical. Now come eat.",
      "One less machine, one more helping of stew. Balance."
    ],
    drive_unlock: [
      "New places! New flavors! The spice rack is READY!"
    ],
    tenth_machine: [
      "Ten machines means ten hungry workers. Metaphorically. I'm still cooking."
    ]
  },
  saoirse: {
    stage_advance: [
      "Another stage. I'd celebrate, but the stew won't stir itself.",
      "Good. One less thing to worry about.",
      "The readings are healthy. So is dinner, if anyone's asking."
    ],
    first_paradise: [
      "Paradise. First time it's not a euphemism. Well done, captain.",
      "Self-sustaining. I used to say that about field hospitals. This is better.",
      "I'll make something that doesn't taste like an apology. Just this once."
    ],
    paradise: [
      "Another one. I'm almost getting used to miracles.",
      "Paradise again. The stew's getting better too. Coincidence.",
      "Good work, everyone. Now eat before it gets cold."
    ],
    upgrade_hull: [
      "More room. I could set up a proper medical bay. Not that anyone asks.",
      "Reinforced. Good. Less rattling in the pots."
    ],
    upgrade_drive: [
      "Faster. Good. I was tired of reheating the soup.",
      "New range. New worlds. Same dry rations until I get better ingredients."
    ],
    new_system: [
      "Another system. I'll keep the med kit ready. Old habit.",
      "New stars. Same crew. I'll manage."
    ],
    cargo_cap: [
      "You're overflowing. I hope you brought bowls.",
      "Full stores. In the field, that meant trouble was coming. Here it just means upgrade your hull.",
      "Cap's hit. Spend or waste. Your call, captain."
    ],
    offline_return: [
      "Wondered when you'd be back. The ship didn't burn down.",
      "You were gone a while. Everything's fine. I checked.",
      "Back. Good. The bread went stale but the stew survived."
    ],
    deconstruct: [
      "Efficient. I respect that.",
      "Clean removal. No waste."
    ],
    drive_unlock: [
      "New range. Pack bandages."
    ],
    tenth_machine: [
      "Ten machines on one world. That's a proper deployment."
    ]
  },
  wren: {
    stage_advance: [
      "Oh! It changed! Did everyone see? It changed!",
      "I made a little cake to celebrate. It's lopsided but it's — it's from the heart.",
      "The bread rose at the exact same time the stage turned. That's a sign. Right?"
    ],
    first_paradise: [
      "Paradise! Oh — oh no, I'm going to cry. I'm going to cry and the soufflé is going to collapse.",
      "It's beautiful. I baked a world-shaped loaf. It's not round enough but — look!",
      "We did it. WE DID IT. I need to sit down. And bake. Both."
    ],
    paradise: [
      "Another paradise! Another celebration loaf! ...I need more flour.",
      "Every time a world turns paradise I add a new recipe to the book.",
      "I'm going to run out of cake eventually. But not today!"
    ],
    upgrade_hull: [
      "More room! For — for more baking supplies! Right? That's what it's for?",
      "Oh good, the flour won't be crammed against the bulkhead anymore."
    ],
    upgrade_drive: [
      "We can go further! That's — that's exciting and terrifying!",
      "New stars to bake under. Each one changes the crust differently. I read that somewhere."
    ],
    new_system: [
      "A new system! What if they have — what if there are NEW GRAINS?",
      "Oh — oh, it's beautiful. The light is different here. The bread will be different."
    ],
    cargo_cap: [
      "Oh no — we should spend some of this. We should — we should build something.",
      "The pantry's overflowing! That's — that's good? That's good. But also overwhelming!",
      "Too much! Too much in the stores! I get anxious when things pile up!"
    ],
    offline_return: [
      "Captain! I made rolls! They're a little burnt but I was worried and — you're here!",
      "Oh thank goodness. I started stress-baking an hour ago. There's bread everywhere.",
      "You're back! The sourdough missed you. I missed you. The sourdough missed you more.",
      "I saved you a plate! It's cold now but — you're HERE!"
    ],
    deconstruct: [
      "Oh — is it broken? Are we recycling? I hate watching things come apart.",
      "That was — that was a good machine. Goodbye, machine."
    ],
    drive_unlock: [
      "New places! I wonder if they have butter — do you think they have butter?"
    ],
    tenth_machine: [
      "Ten! Ten whole machines! That's — that's a lot of responsibility!"
    ]
  }
};

// Resolve a crew reaction line. Returns { name, candidateId, line } or null.
function pickCrewReaction(crew, eventType) {
  // Determine which role speaks for this event.
  var roleForEvent = {
    stage_advance_early: "engineer",
    stage_advance_late: "botanist",
    first_paradise: "botanist",
    paradise: "botanist",
    upgrade_hull: "engineer",
    upgrade_drive: "engineer",
    upgrade_lab: "cartographer",
    new_system: "cartographer",
    drive_unlock: "engineer",
    cargo_cap: "cook",
    offline_return: "cook",
    tenth_machine: "engineer",
    deconstruct: null // round-robin, caller picks
  };
  var role = roleForEvent[eventType];
  if (!role) return null;
  var candidateId = crew[role];
  if (!candidateId) return null;
  var reactions = CREW_REACTIONS[candidateId];
  // Normalize event type for lookup (stage_advance_early/late → stage_advance).
  var lookupKey = eventType.replace(/_early$|_late$/, "");
  var lines = reactions && reactions[lookupKey];
  if (!lines || lines.length === 0) return null;
  var roleDef = CREW_ROLES.find(function(r) { return r.id === role; });
  var cand = roleDef && roleDef.candidates.find(function(c) { return c.id === candidateId; });
  return {
    name: cand ? cand.name : candidateId,
    candidateId: candidateId,
    line: lines[Math.floor(Math.random() * lines.length)]
  };
}

// Pick a reaction from any crewmate (for round-robin events like deconstruct).
function pickAnyCrewReaction(crew, eventType) {
  var roles = ["botanist", "engineer", "cartographer", "cook"];
  var idx = Math.floor(Math.random() * roles.length);
  var role = roles[idx];
  var candidateId = crew[role];
  if (!candidateId) return null;
  var reactions = CREW_REACTIONS[candidateId];
  var lines = reactions && reactions[eventType];
  if (!lines || lines.length === 0) return null;
  var roleDef = CREW_ROLES.find(function(r) { return r.id === role; });
  var cand = roleDef && roleDef.candidates.find(function(c) { return c.id === candidateId; });
  return {
    name: cand ? cand.name : candidateId,
    candidateId: candidateId,
    line: lines[Math.floor(Math.random() * lines.length)]
  };
}

// Small ship icon, rendered above the current system's dot on the Star Chart so the player
// can find themselves at a glance among the decorated systems.
var SHIP_ICON_SVG = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><path d="M12 3 L8 13 L12 11 L16 13 Z" fill="#f4c46d" stroke="#1a1408" stroke-width="1"/><path d="M10 13 L10 17 L14 17 L14 13" fill="#f4c46d" stroke="#1a1408" stroke-width="0.8"/><circle cx="12" cy="15" r="0.8" fill="#1a1408"/></svg>';

// Inline SVG icons for machines — blueprint-style silhouettes.
// Each is a 24×24 viewBox SVG string. Rendered inside the tile pip.
var MACHINE_ICONS = {
  gas_extractor: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8 18h8v-4a4 4 0 00-8 0v4z" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="14" x2="12" y2="5" stroke="currentColor" stroke-width="1.5"/><line x1="10" y1="7" x2="14" y2="7" stroke="currentColor" stroke-width="1"/><line x1="11" y1="4" x2="13" y2="4" stroke="currentColor" stroke-width="1"/></svg>',
  pressure_regulator: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="7" y="6" width="10" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="11" r="2.5" fill="none" stroke="currentColor" stroke-width="1"/><line x1="12" y1="11" x2="14" y2="9.5" stroke="currentColor" stroke-width="1"/><line x1="9" y1="17" x2="15" y2="17" stroke="currentColor" stroke-width="1"/></svg>',
  ice_melter: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8 16c0 0 1-3 4-3s4 3 4 3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 13c0 0 1-3 4-3s4 3 4 3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 7l0.5-2M12 7l0-2.5M14 7l-0.5-2" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg>',
  water_pump: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 9l-2.5 3.5h5L12 9z" fill="none" stroke="currentColor" stroke-width="1.2"/><line x1="12" y1="17" x2="12" y2="20" stroke="currentColor" stroke-width="1.5"/><line x1="10" y1="19" x2="14" y2="19" stroke="currentColor" stroke-width="1"/></svg>',
  seed_disperser: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="1.2"/><line x1="12" y1="5" x2="12" y2="9" stroke="currentColor" stroke-width="1" stroke-linecap="round"/><line x1="12" y1="15" x2="12" y2="19" stroke="currentColor" stroke-width="1" stroke-linecap="round"/><line x1="5" y1="12" x2="9" y2="12" stroke="currentColor" stroke-width="1" stroke-linecap="round"/><line x1="15" y1="12" x2="19" y2="12" stroke="currentColor" stroke-width="1" stroke-linecap="round"/><line x1="7" y1="7" x2="9.5" y2="9.5" stroke="currentColor" stroke-width="1" stroke-linecap="round"/><line x1="14.5" y1="14.5" x2="17" y2="17" stroke="currentColor" stroke-width="1" stroke-linecap="round"/><line x1="17" y1="7" x2="14.5" y2="9.5" stroke="currentColor" stroke-width="1" stroke-linecap="round"/><line x1="9.5" y1="14.5" x2="7" y2="17" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg>',
  greenhouse: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5 18a7 7 0 0114 0" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="5" y1="18" x2="19" y2="18" stroke="currentColor" stroke-width="1.5"/><path d="M12 15c-1-2 0-4 1.5-5s2 0 1.5 1.5-2 2.5-3 3.5" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg>',
  bio_incubator: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><ellipse cx="12" cy="12" rx="4.5" ry="6" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="1.5" fill="currentColor" opacity="0.5"/><line x1="7.5" y1="10" x2="16.5" y2="10" stroke="currentColor" stroke-width="0.8" stroke-dasharray="1.5 1"/></svg>',
  ecosystem_stabilizer: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="20" x2="12" y2="8" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="7" r="2" fill="none" stroke="currentColor" stroke-width="1.2"/><circle cx="12" cy="7" r="5" fill="none" stroke="currentColor" stroke-width="0.8" stroke-dasharray="2 2"/><circle cx="12" cy="7" r="8" fill="none" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2 2"/><line x1="10" y1="20" x2="14" y2="20" stroke="currentColor" stroke-width="1.5"/></svg>',
  solar_array: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="8" width="14" height="9" rx="1" fill="none" stroke="currentColor" stroke-width="1.5" transform="rotate(-15 12 12)"/><line x1="5.5" y1="12.5" x2="18.5" y2="9.5" stroke="currentColor" stroke-width="0.8"/><line x1="6.5" y1="16" x2="19.5" y2="13" stroke="currentColor" stroke-width="0.8"/><line x1="3" y1="5" x2="5" y2="7" stroke="currentColor" stroke-width="1" stroke-linecap="round"/><line x1="7" y1="3" x2="7.5" y2="6" stroke="currentColor" stroke-width="1" stroke-linecap="round"/><line x1="11" y1="2.5" x2="10" y2="5.5" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg>',
  storage_silo: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7 8l5-3 5 3v8l-5 3-5-3z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><line x1="7" y1="8" x2="12" y2="11" stroke="currentColor" stroke-width="1"/><line x1="17" y1="8" x2="12" y2="11" stroke="currentColor" stroke-width="1"/><line x1="12" y1="11" x2="12" y2="19" stroke="currentColor" stroke-width="1"/></svg>',
  mining_drill: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 5h6l-1 8h-4l-1-8z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 13l2 7 2-7" fill="none" stroke="currentColor" stroke-width="1.2"/><line x1="8" y1="5" x2="16" y2="5" stroke="currentColor" stroke-width="1.5"/><line x1="10.5" y1="8" x2="13.5" y2="8" stroke="currentColor" stroke-width="0.8"/></svg>',
  harvester: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6 16c0-5 3-9 6-11 3 2 6 6 6 11" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 16a4 4 0 018 0" fill="none" stroke="currentColor" stroke-width="1"/><line x1="6" y1="16" x2="18" y2="16" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="10" x2="12" y2="16" stroke="currentColor" stroke-width="0.8" stroke-dasharray="1.5 1"/></svg>',
  deep_driller: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="3" width="6" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="9" x2="12" y2="15" stroke="currentColor" stroke-width="1.5"/><path d="M10 15l2 5 2-5" fill="none" stroke="currentColor" stroke-width="1.2"/><line x1="8" y1="12" x2="10" y2="12" stroke="currentColor" stroke-width="0.8"/><line x1="14" y1="12" x2="16" y2="12" stroke="currentColor" stroke-width="0.8"/><line x1="8" y1="14" x2="10" y2="14" stroke="currentColor" stroke-width="0.8"/><line x1="14" y1="14" x2="16" y2="14" stroke="currentColor" stroke-width="0.8"/></svg>',
  harmony_beacon: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="10" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="10" r="6" fill="none" stroke="currentColor" stroke-width="0.8" stroke-dasharray="2.5 1.5"/><circle cx="12" cy="10" r="9" fill="none" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2 2"/><line x1="12" y1="13" x2="12" y2="20" stroke="currentColor" stroke-width="1.5"/><line x1="9" y1="20" x2="15" y2="20" stroke="currentColor" stroke-width="1.5"/></svg>'
};

// Inline SVG illustrations for each landmark id. 100×100 viewBox; all strokes/fills use
// currentColor so the landmark's accent color propagates via CSS color inheritance on the
// rendering <div>. Compositions are centered so a stretched footprint still reads okay.
var LANDMARK_ART = {
  // --- Single-shape landmarks ---
  geothermal_hotspot: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="ghg" cx="50%" cy="55%" r="45%"><stop offset="0%" stop-color="currentColor" stop-opacity="0.9"/><stop offset="60%" stop-color="currentColor" stop-opacity="0.3"/><stop offset="100%" stop-color="currentColor" stop-opacity="0"/></radialGradient></defs><circle cx="50" cy="55" r="35" fill="url(#ghg)"/><path d="M50 30 Q45 40 50 50 Q55 60 50 70" stroke="currentColor" stroke-width="2" fill="none" opacity="0.7"/><path d="M40 35 Q37 45 42 55" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.5"/><path d="M60 35 Q63 45 58 55" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.5"/></svg>',
  meteor_crater: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="mc" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="currentColor" stop-opacity="0"/><stop offset="60%" stop-color="currentColor" stop-opacity="0.15"/><stop offset="85%" stop-color="currentColor" stop-opacity="0.6"/><stop offset="100%" stop-color="currentColor" stop-opacity="0.9"/></radialGradient></defs><ellipse cx="50" cy="50" rx="42" ry="40" fill="url(#mc)"/><ellipse cx="50" cy="50" rx="28" ry="26" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5"/><circle cx="50" cy="50" r="12" fill="currentColor" opacity="0.3"/></svg>',
  sheltered_oasis: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="60" rx="30" ry="18" fill="currentColor" opacity="0.5"/><ellipse cx="50" cy="60" rx="20" ry="12" fill="currentColor" opacity="0.3"/><path d="M35 55 Q30 40 35 30 M40 55 Q38 35 45 25 M55 55 Q58 35 65 30 M65 55 Q70 42 72 32" stroke="currentColor" stroke-width="2" fill="none" opacity="0.8"/><circle cx="35" cy="30" r="3" fill="currentColor" opacity="0.7"/><circle cx="45" cy="25" r="3" fill="currentColor" opacity="0.7"/><circle cx="65" cy="30" r="3" fill="currentColor" opacity="0.7"/><circle cx="72" cy="32" r="3" fill="currentColor" opacity="0.7"/></svg>',
  exposed_aquifer: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M15 45 Q30 35 50 45 T85 45" stroke="currentColor" stroke-width="2.5" fill="none" opacity="0.8"/><path d="M15 58 Q32 48 50 58 T85 58" stroke="currentColor" stroke-width="2" fill="none" opacity="0.6"/><path d="M15 70 Q30 62 50 70 T85 70" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.4"/><circle cx="30" cy="30" r="2" fill="currentColor" opacity="0.7"/><circle cx="55" cy="25" r="2" fill="currentColor" opacity="0.7"/><circle cx="70" cy="32" r="2" fill="currentColor" opacity="0.7"/></svg>',
  cooled_vent_field: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="25" cy="35" r="8" fill="currentColor" opacity="0.6"/><circle cx="60" cy="30" r="10" fill="currentColor" opacity="0.6"/><circle cx="40" cy="60" r="7" fill="currentColor" opacity="0.6"/><circle cx="75" cy="65" r="9" fill="currentColor" opacity="0.6"/><circle cx="25" cy="35" r="4" fill="currentColor" opacity="0.9"/><circle cx="60" cy="30" r="5" fill="currentColor" opacity="0.9"/><circle cx="40" cy="60" r="3" fill="currentColor" opacity="0.9"/><circle cx="75" cy="65" r="4" fill="currentColor" opacity="0.9"/></svg>',
  stable_pocket: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="sp" cx="50%" cy="50%" r="45%"><stop offset="0%" stop-color="currentColor" stop-opacity="0.7"/><stop offset="70%" stop-color="currentColor" stop-opacity="0.3"/><stop offset="100%" stop-color="currentColor" stop-opacity="0"/></radialGradient></defs><polygon points="50,20 78,35 78,65 50,80 22,65 22,35" fill="url(#sp)"/><polygon points="50,20 78,35 78,65 50,80 22,65 22,35" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.7"/><circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.4"/></svg>',
  scrubber_ready_ridge: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M10 70 L25 45 L40 60 L55 35 L70 55 L85 40 L95 60" stroke="currentColor" stroke-width="2.5" fill="none" opacity="0.8"/><path d="M10 80 L25 60 L40 72 L55 52 L70 68 L85 55 L95 72" stroke="currentColor" stroke-width="2" fill="none" opacity="0.5"/><path d="M30 30 Q35 20 40 30 M55 25 Q60 15 65 25 M75 28 Q80 18 85 28" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.6" stroke-dasharray="2,2"/></svg>',
  reef_nucleus: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="35" fill="currentColor" opacity="0.15"/><g opacity="0.7"><path d="M50 50 L40 30 M50 50 L60 28 M50 50 L70 45 M50 50 L65 65 M50 50 L45 72 M50 50 L30 60 M50 50 L28 45" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="40" cy="30" r="3" fill="currentColor"/><circle cx="60" cy="28" r="3" fill="currentColor"/><circle cx="70" cy="45" r="3" fill="currentColor"/><circle cx="65" cy="65" r="3" fill="currentColor"/><circle cx="45" cy="72" r="3" fill="currentColor"/><circle cx="30" cy="60" r="3" fill="currentColor"/><circle cx="28" cy="45" r="3" fill="currentColor"/></g><circle cx="50" cy="50" r="5" fill="currentColor" opacity="0.9"/></svg>',
  thermal_spring: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="60" r="22" fill="currentColor" opacity="0.4"/><circle cx="50" cy="60" r="15" fill="currentColor" opacity="0.25"/><circle cx="50" cy="60" r="8" fill="currentColor" opacity="0.8"/><path d="M45 35 Q42 28 45 22 M50 32 Q47 25 52 18 M55 35 Q58 28 55 22" stroke="currentColor" stroke-width="2" fill="none" opacity="0.6"/></svg>',

  // --- Texture / pattern landmarks ---
  ancient_glacier_face: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="agf" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse"><path d="M0 12 L12 5 L25 12 L12 20 Z" fill="currentColor" opacity="0.3" stroke="currentColor" stroke-width="0.5" stroke-opacity="0.5"/></pattern></defs><rect width="100" height="100" fill="url(#agf)"/></svg>',
  cryo_crystal_seam: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="ccs" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><polygon points="10,2 13,8 10,14 7,8" fill="currentColor" opacity="0.5"/><polygon points="10,2 13,8 10,14 7,8" fill="none" stroke="currentColor" stroke-width="0.5" stroke-opacity="0.8"/></pattern></defs><rect width="100" height="100" fill="url(#ccs)"/></svg>',
  ancient_riverbed: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M0 30 Q25 20 50 35 T100 30" stroke="currentColor" stroke-width="4" fill="none" opacity="0.5"/><path d="M0 50 Q25 40 50 55 T100 50" stroke="currentColor" stroke-width="5" fill="none" opacity="0.7"/><path d="M0 72 Q25 62 50 75 T100 70" stroke="currentColor" stroke-width="4" fill="none" opacity="0.5"/><path d="M10 50 L8 45 M30 55 L32 48 M60 53 L58 46 M85 50 L87 44" stroke="currentColor" stroke-width="1" opacity="0.4"/></svg>',
  rare_metal_outcrop: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="rmo" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse"><polygon points="11,3 17,8 14,15 8,15 5,8" fill="currentColor" opacity="0.45"/><polygon points="11,3 17,8 14,15 8,15 5,8" fill="none" stroke="currentColor" stroke-width="0.5" stroke-opacity="0.7"/></pattern></defs><rect width="100" height="100" fill="url(#rmo)"/></svg>',
  mineral_vein: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M0 25 L30 30 L45 20 L70 35 L100 28" stroke="currentColor" stroke-width="3.5" fill="none" opacity="0.7"/><path d="M0 55 L25 50 L50 60 L75 48 L100 55" stroke="currentColor" stroke-width="4" fill="none" opacity="0.8"/><path d="M0 78 L28 82 L52 72 L78 80 L100 75" stroke="currentColor" stroke-width="3" fill="none" opacity="0.6"/><circle cx="45" cy="20" r="2" fill="currentColor"/><circle cx="50" cy="60" r="2.5" fill="currentColor"/><circle cx="75" cy="48" r="2" fill="currentColor"/></svg>',
  lava_tube_network: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="25" cy="30" r="6" fill="currentColor" opacity="0.8"/><circle cx="25" cy="30" r="3" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="65" cy="25" r="7" fill="currentColor" opacity="0.8"/><circle cx="65" cy="25" r="3.5" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="40" cy="60" r="5" fill="currentColor" opacity="0.8"/><circle cx="40" cy="60" r="2.5" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="75" cy="65" r="8" fill="currentColor" opacity="0.8"/><circle cx="75" cy="65" r="4" fill="none" stroke="currentColor" stroke-width="1"/><circle cx="20" cy="75" r="5" fill="currentColor" opacity="0.8"/><circle cx="20" cy="75" r="2.5" fill="none" stroke="currentColor" stroke-width="1"/><path d="M25 30 Q45 45 40 60 M65 25 Q70 45 75 65 M40 60 Q30 68 20 75" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.4" stroke-dasharray="3,3"/></svg>',
  obsidian_deposit: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="od" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><polygon points="10,2 16,6 16,14 10,18 4,14 4,6" fill="currentColor" opacity="0.55"/><polygon points="10,2 16,6 16,14 10,18 4,14 4,6" fill="none" stroke="currentColor" stroke-width="0.6" stroke-opacity="0.9"/></pattern></defs><rect width="100" height="100" fill="url(#od)"/></svg>',
  catalyst_pool: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="35" cy="40" rx="15" ry="10" fill="currentColor" opacity="0.5"/><ellipse cx="65" cy="55" rx="18" ry="12" fill="currentColor" opacity="0.5"/><ellipse cx="45" cy="70" rx="12" ry="8" fill="currentColor" opacity="0.5"/><ellipse cx="35" cy="40" rx="8" ry="5" fill="currentColor" opacity="0.8"/><ellipse cx="65" cy="55" rx="10" ry="6" fill="currentColor" opacity="0.8"/><ellipse cx="45" cy="70" rx="6" ry="4" fill="currentColor" opacity="0.8"/></svg>',
  deep_current_access: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M10 50 Q30 30 50 50 T90 50" stroke="currentColor" stroke-width="3" fill="none" opacity="0.8"/><path d="M10 65 Q30 45 50 65 T90 65" stroke="currentColor" stroke-width="2.5" fill="none" opacity="0.6"/><path d="M10 35 Q30 15 50 35 T90 35" stroke="currentColor" stroke-width="2.5" fill="none" opacity="0.6"/><polygon points="85,48 92,50 85,52" fill="currentColor" opacity="0.8"/><polygon points="85,63 92,65 85,67" fill="currentColor" opacity="0.8"/><polygon points="85,33 92,35 85,37" fill="currentColor" opacity="0.8"/></svg>'
};

// Active Presence — Crew tasks. Each task has a role, min world stage to offer, a prompt,
// an action label, a reward label, and one or more declarative effects resolved by the
// App-level action handler. Effects:
//   { kind: "boost", type, multiplier, stageIndex?, durationS, label }
//   { kind: "instant_progress", amount }
//   { kind: "instant_stage_progress_pct", pct }   // fraction of current stage threshold
//   { kind: "instant_resource", resourceId, amount }
//   { kind: "codex_note", text }                  // ef.text unused; handler picks from CARTOGRAPHER_SCAN_NOTES
var CREW_TASKS = [
  // ---------- Botanist (min Hydrosphere stage). ----------
  {
    id: "bot_unusual_growth",
    role: "botanist",
    minStage: 2,
    weight: 1.0,
    prompt: function(name) { return "I'm seeing an unusual growth pattern in sector 4. Want me to study it?"; },
    actionLabel: "Study it",
    rewardLabel: "+20% pps for 3 min",
    effects: [
      { kind: "boost", type: "all_pps", multiplier: 0.20, durationS: 180, label: "Botanist study: +20% pps" }
    ]
  },
  {
    id: "bot_cross_pollinate",
    role: "botanist",
    minStage: 2,
    weight: 0.9,
    prompt: function(name) { return "These root structures are remarkable. If I cross-pollinate samples from two worlds, we could shortcut a stage here."; },
    actionLabel: "Go ahead",
    rewardLabel: "+10 points toward current stage",
    effects: [
      { kind: "instant_progress", amount: 10 }
    ]
  },
  {
    id: "bot_variant_disperse",
    role: "botanist",
    minStage: 2,
    weight: 0.8,
    prompt: function(name) { return "I found a variant that thrives here. Permission to disperse?"; },
    actionLabel: "Disperse",
    rewardLabel: "+0.5 pts/s for 5 min",
    effects: [
      { kind: "boost", type: "flat_pps", multiplier: 0.5, durationS: 300, label: "Botanist variant: +0.5 pts/s" }
    ]
  },
  {
    id: "bot_fauna_watch",
    role: "botanist",
    minStage: 3,
    weight: 0.7,
    prompt: function(name) { return "There's something small moving at the edge of the flora. Should I go sit with it for a while?"; },
    actionLabel: "Go sit",
    rewardLabel: "+25% Fauna-stage pps for 3 min",
    effects: [
      { kind: "boost", type: "stage_pps", stageIndex: 4, multiplier: 0.25, durationS: 180, label: "Fauna watch: +25% Fauna pps" }
    ]
  },

  // ---------- Engineer (all stages). ----------
  {
    id: "eng_running_hot",
    role: "engineer",
    minStage: 0,
    weight: 1.0,
    prompt: function(name) { return "Machine three is running hot. I can recalibrate if you give me a minute."; },
    actionLabel: "Recalibrate",
    rewardLabel: "+15% pps for 2 min",
    effects: [
      { kind: "boost", type: "all_pps", multiplier: 0.15, durationS: 120, label: "Recalibration: +15% pps" }
    ]
  },
  {
    id: "eng_power_grid",
    role: "engineer",
    minStage: 0,
    weight: 0.9,
    prompt: function(name) { return "I've been thinking about the power grid layout. Want me to optimize?"; },
    actionLabel: "Optimize",
    rewardLabel: "Solar bonus doubled for 3 min",
    effects: [
      { kind: "boost", type: "solar_adjacency", multiplier: 1.0, durationS: 180, label: "Grid optimization: Solar bonus ×2" }
    ]
  },
  {
    id: "eng_salvage_scrap",
    role: "engineer",
    minStage: 0,
    weight: 0.8,
    prompt: function(name) { return "Found some salvageable parts in the soil. Scrap metal, mostly."; },
    actionLabel: "Collect",
    rewardLabel: "+5 Common Ore",
    effects: [
      { kind: "instant_resource", resourceId: "common_ore", amount: 5 }
    ]
  },
  {
    id: "eng_tuneup",
    role: "engineer",
    minStage: 2,
    weight: 0.7,
    prompt: function(name) { return "The extractors are grinding. Quick tune-up and they'll pull cleaner."; },
    actionLabel: "Tune them",
    rewardLabel: "+25% extraction for 2 min",
    effects: [
      { kind: "boost", type: "extraction_rate", multiplier: 0.25, durationS: 120, label: "Extractor tune-up: +25%" }
    ]
  },

  // ---------- Cartographer (all stages, rarer). ----------
  {
    id: "cart_subsurface_scan",
    role: "cartographer",
    minStage: 0,
    weight: 0.5,
    prompt: function(name) { return "I'm picking up subsurface readings. Could be interesting."; },
    actionLabel: "Scan",
    rewardLabel: "+2% stage progress + codex entry",
    effects: [
      { kind: "instant_stage_progress_pct", pct: 0.02 },
      { kind: "codex_note", text: "Subsurface layers whisper of the First Tenders. Nothing actionable — just old weight." }
    ]
  },
  {
    id: "cart_chart_record",
    role: "cartographer",
    minStage: 0,
    weight: 0.5,
    prompt: function(name) { return "The star chart data from this position is unusually clear. Let me record it."; },
    actionLabel: "Record",
    rewardLabel: "+3% stage progress + codex entry",
    effects: [
      { kind: "instant_stage_progress_pct", pct: 0.03 },
      { kind: "codex_note", text: "A neighboring system resolved cleanly on the scope. One of its planets is greener than expected." }
    ]
  },

  // ---------- Cook (all stages, rarest, warmest). ----------
  {
    id: "cook_lunch_break",
    role: "cook",
    minStage: 0,
    weight: 0.4,
    prompt: function(name) { return "I brought everyone lunch. Take a break?"; },
    actionLabel: "Eat together",
    rewardLabel: "+25% pps for 5 min",
    effects: [
      { kind: "boost", type: "all_pps", multiplier: 0.25, durationS: 300, label: "Shared lunch: +25% pps" }
    ]
  },
  {
    id: "cook_paradise_ingredients",
    role: "cook",
    minStage: 0,
    weight: 0.3,
    requiresParadise: true,
    prompt: function(name, ctx) {
      var pName = (ctx && ctx.paradiseWorldName) || "somewhere warm";
      return "Made something with ingredients from " + pName + ". Want to try?";
    },
    actionLabel: "Try it",
    rewardLabel: "+10% extraction for 5 min",
    effects: [
      { kind: "boost", type: "extraction_rate", multiplier: 0.10, durationS: 300, label: "A taste of Paradise: +10% extraction" }
    ]
  },
  {
    id: "cook_warm_drink",
    role: "cook",
    minStage: 0,
    weight: 0.3,
    prompt: function(name) { return "I've got something warm. The crew could use it. You too, captain."; },
    actionLabel: "Share it",
    rewardLabel: "+15% pps for 3 min",
    effects: [
      { kind: "boost", type: "all_pps", multiplier: 0.15, durationS: 180, label: "A warm drink: +15% pps" }
    ]
  }
];

// Active Presence — Weather / environmental events per planet type. Time-limited events set
// state.weather and add a boost in getEffectiveMultipliers for the duration; instant events
// drop a resource (or a fragment) on fire and do not set state.weather.
// Stage indices: Barren=0, Atmosphere=1, Hydrosphere=2, Flora=3, Fauna=4, Paradise=5.
var WEATHER_EVENTS = {
  // ================ FROZEN ================
  frozen: [
    // --- Stage 1 (Atmosphere) ---
    { id: "frozen_s1_aurora", name: "Aurora Surge", desc: "Northern lights shimmer across the ice. The atmosphere grows richer.",
      stage: 1, weight: 1.0, durationS: 150, type: "stage_pps", stageIndex: 1, multiplier: 0.40, tileClass: "wx-aurora" },
    { id: "frozen_s1_solar_flare", name: "Solar Flare", desc: "The distant sun's rays punch through the thin atmosphere, energizing every panel below.",
      stage: 1, weight: 0.9, durationS: 120, type: "solar_adjacency", multiplier: 0.75, tileClass: "wx-solar" },
    { id: "frozen_s1_blizzard", name: "Methane Blizzard", desc: "A snowstorm of frozen methane grounds surface operations.",
      stage: 1, weight: 1.0, durationS: 90, type: "all_pps", multiplier: -0.25, tileClass: "wx-dust" },

    // --- Stage 2 (Hydrosphere) ---
    { id: "frozen_s2_melt", name: "Ice Melt Pulse", desc: "A subsurface heat spike loosens the frost. Meltwater spreads.",
      stage: 2, weight: 1.0, durationS: 150, type: "stage_pps", stageIndex: 2, multiplier: 0.45, tileClass: "wx-melt" },
    { id: "frozen_s2_crystal", name: "Crystal Formation", desc: "Rare minerals surface near the tidelines.",
      stage: 2, weight: 0.7, instant: { resourceId: "cryocrystals", amount: 20 }, tileClass: "wx-crystal" },
    { id: "frozen_s2_refreeze", name: "Flash Refreeze", desc: "Temperatures plummet. The new water locks up overnight.",
      stage: 2, weight: 1.0, durationS: 120, type: "stage_pps", stageIndex: 2, multiplier: -0.30, tileClass: "wx-crystal" },

    // --- Stage 3 (Flora) ---
    { id: "frozen_s3_thaw", name: "Spring Thaw", desc: "The tundra remembers what growing is. Lichens spread across the rock.",
      stage: 3, weight: 1.0, durationS: 150, type: "stage_pps", stageIndex: 3, multiplier: 0.40, tileClass: "wx-oasis" },
    { id: "frozen_s3_fertile_snow", name: "Fertile Snowfall", desc: "Snow dusted with organic compounds enriches the topsoil.",
      stage: 3, weight: 0.9, durationS: 150, type: "extraction_rate", multiplier: 0.25, tileClass: "wx-aurora" },
    { id: "frozen_s3_deep_freeze", name: "Deep Freeze", desc: "An unseasonable cold snap halts growth for a while.",
      stage: 3, weight: 1.0, durationS: 90, type: "all_pps", multiplier: -0.25, tileClass: "wx-crystal" },

    // --- Stage 4 (Fauna) ---
    { id: "frozen_s4_migration", name: "First Migration", desc: "Something moves across the ice. Your botanist cries quietly.",
      stage: 4, weight: 1.0, durationS: 150, type: "stage_pps", stageIndex: 4, multiplier: 0.40, tileClass: "wx-aurora" },
    { id: "frozen_s4_aurora_bright", name: "Brilliant Aurora", desc: "The sky erupts in color. Everything works better under it.",
      stage: 4, weight: 0.9, durationS: 180, type: "all_pps", multiplier: 0.20, tileClass: "wx-aurora" },
    { id: "frozen_s4_whiteout", name: "Whiteout", desc: "Visibility drops to zero. The drills idle.",
      stage: 4, weight: 1.0, durationS: 90, type: "extraction_rate", multiplier: -0.30, tileClass: "wx-dust" },

    // --- Stage 5 (Paradise) ---
    { id: "frozen_s5_perfect_dawn", name: "Perfect Dawn", desc: "The sunrise crosses an ecosystem at rest. Everything hums.",
      stage: 5, weight: 1.0, durationS: 180, type: "all_pps", multiplier: 0.30, tileClass: "wx-aurora" },
    { id: "frozen_s5_crystal_bloom", name: "Crystal Bloom", desc: "The paradise-mature mineralization reaches the surface.",
      stage: 5, weight: 0.9, instant: { resourceId: "cryocrystals", amount: 35 }, tileClass: "wx-crystal" },
    { id: "frozen_s5_ice_storm", name: "Ice Storm", desc: "Even a paradise has its days. The weather is not cooperating.",
      stage: 5, weight: 1.0, durationS: 120, type: "extraction_rate", multiplier: -0.20, tileClass: "wx-crystal" }
  ],

  // ================ DESERT ================
  desert: [
    // --- Stage 1 (Atmosphere) ---
    { id: "desert_s1_dust_settle", name: "Dust Settling", desc: "A rare calm lets the filters catch cleaner air.",
      stage: 1, weight: 1.0, durationS: 150, type: "stage_pps", stageIndex: 1, multiplier: 0.40, tileClass: "wx-dust" },
    { id: "desert_s1_solar_peak", name: "Solar Peak", desc: "Intense sunlight charges every panel on the surface.",
      stage: 1, weight: 0.9, durationS: 180, type: "solar_adjacency", multiplier: 1.0, tileClass: "wx-solar" },
    { id: "desert_s1_dust_storm", name: "Dust Storm", desc: "The filters clog faster than they can clean.",
      stage: 1, weight: 1.0, durationS: 120, type: "stage_pps", stageIndex: 1, multiplier: -0.30, tileClass: "wx-dust" },

    // --- Stage 2 (Hydrosphere) ---
    { id: "desert_s2_condensation", name: "Dawn Condensation", desc: "Morning moisture clings to every surface. The generators drink deep.",
      stage: 2, weight: 1.0, durationS: 150, type: "stage_pps", stageIndex: 2, multiplier: 0.45, tileClass: "wx-rain" },
    { id: "desert_s2_flash_flood", name: "Flash Flood", desc: "A rare downpour floods the dry riverbeds. Water everywhere.",
      stage: 2, weight: 0.8, durationS: 120, type: "stage_pps", stageIndex: 2, multiplier: 0.35, tileClass: "wx-rain" },
    { id: "desert_s2_heat_wave", name: "Heat Wave", desc: "The new moisture boils away before it can settle.",
      stage: 2, weight: 1.0, durationS: 90, type: "stage_pps", stageIndex: 2, multiplier: -0.35, tileClass: "wx-solar" },

    // --- Stage 3 (Flora) ---
    { id: "desert_s3_oasis", name: "Oasis Bloom", desc: "A brief moisture surge cools the air. Something is growing.",
      stage: 3, weight: 1.0, durationS: 150, type: "stage_pps", stageIndex: 3, multiplier: 0.40, tileClass: "wx-oasis" },
    { id: "desert_s3_metal_surface", name: "Surface Metals", desc: "Wind exposes veins of rare metals at the surface.",
      stage: 3, weight: 0.8, instant: { resourceId: "rare_metals", amount: 20 }, tileClass: "wx-dust" },
    { id: "desert_s3_drought", name: "Drought Snap", desc: "The new moisture evaporates. The young plants wilt.",
      stage: 3, weight: 1.0, durationS: 120, type: "stage_pps", stageIndex: 3, multiplier: -0.30, tileClass: "wx-solar" },

    // --- Stage 4 (Fauna) ---
    { id: "desert_s4_migration", name: "Creature Migration", desc: "Adapted lizards and insects find each other across the sands.",
      stage: 4, weight: 1.0, durationS: 150, type: "stage_pps", stageIndex: 4, multiplier: 0.40, tileClass: "wx-oasis" },
    { id: "desert_s4_cool_night", name: "Perfect Cool Night", desc: "The desert is at its most alive after dark tonight.",
      stage: 4, weight: 0.9, durationS: 180, type: "all_pps", multiplier: 0.20, tileClass: "wx-aurora" },
    { id: "desert_s4_sandstorm", name: "Sandstorm", desc: "The creatures burrow. The extractors idle.",
      stage: 4, weight: 1.0, durationS: 90, type: "extraction_rate", multiplier: -0.30, tileClass: "wx-dust" },

    // --- Stage 5 (Paradise) ---
    { id: "desert_s5_golden_hour", name: "Golden Hour", desc: "The paradise desert catches the light perfectly. Everything is beautiful.",
      stage: 5, weight: 1.0, durationS: 180, type: "all_pps", multiplier: 0.30, tileClass: "wx-solar" },
    { id: "desert_s5_metal_bloom", name: "Metal Vein Exposed", desc: "A deep deposit surfaces from the mature soil dynamics.",
      stage: 5, weight: 0.9, instant: { resourceId: "rare_metals", amount: 35 }, tileClass: "wx-dust" },
    { id: "desert_s5_dust_devil", name: "Dust Devil", desc: "A small funnel of sand crosses the plain. The drills pause.",
      stage: 5, weight: 1.0, durationS: 120, type: "extraction_rate", multiplier: -0.20, tileClass: "wx-dust" }
  ],

  // ================ ROCKY ================
  rocky: [
    // --- Stage 1 (Atmosphere) ---
    { id: "rocky_s1_volcanic_vent", name: "Outgassing Vent", desc: "A small vent releases usable gases from the rock.",
      stage: 1, weight: 1.0, durationS: 150, type: "stage_pps", stageIndex: 1, multiplier: 0.40, tileClass: "wx-geo" },
    { id: "rocky_s1_seismic", name: "Seismic Shift", desc: "New mineral veins crack open at the surface.",
      stage: 1, weight: 0.9, instant: { resourceId: "common_ore", amount: 15 }, tileClass: "wx-seismic" },
    { id: "rocky_s1_thin_air", name: "Atmospheric Leak", desc: "The new air vents into space faster than it can accumulate.",
      stage: 1, weight: 1.0, durationS: 90, type: "stage_pps", stageIndex: 1, multiplier: -0.30, tileClass: "wx-dust" },

    // --- Stage 2 (Hydrosphere) ---
    { id: "rocky_s2_rain", name: "Rain Squall", desc: "A brief, unexpected rain. The rocks drink.",
      stage: 2, weight: 1.0, durationS: 150, type: "stage_pps", stageIndex: 2, multiplier: 0.40, tileClass: "wx-rain" },
    { id: "rocky_s2_aquifer", name: "Hidden Aquifer", desc: "The drills strike a deep water source.",
      stage: 2, weight: 0.8, durationS: 120, type: "extraction_rate", multiplier: 0.30, tileClass: "wx-rain" },
    { id: "rocky_s2_runoff", name: "Runoff Loss", desc: "Rain washes off the bare rock before it can settle.",
      stage: 2, weight: 1.0, durationS: 90, type: "stage_pps", stageIndex: 2, multiplier: -0.25, tileClass: "wx-rain" },

    // --- Stage 3 (Flora) ---
    { id: "rocky_s3_fossil", name: "Fossil Discovery", desc: "Something ancient surfaces. Your botanist wants to dig.",
      stage: 3, weight: 0.8, instant: { resourceId: "common_ore", amount: 10 }, tileClass: "wx-fossil" },
    { id: "rocky_s3_lichen", name: "Lichen Bloom", desc: "Pioneer species break the rock into proper soil.",
      stage: 3, weight: 1.0, durationS: 150, type: "stage_pps", stageIndex: 3, multiplier: 0.40, tileClass: "wx-oasis" },
    { id: "rocky_s3_rockslide", name: "Rockslide", desc: "Unstable terrain disrupts surface work briefly.",
      stage: 3, weight: 1.0, durationS: 90, type: "all_pps", multiplier: -0.25, tileClass: "wx-seismic" },

    // --- Stage 4 (Fauna) ---
    { id: "rocky_s4_first_movement", name: "First Movement", desc: "Burrowing creatures appear among the mosses.",
      stage: 4, weight: 1.0, durationS: 150, type: "stage_pps", stageIndex: 4, multiplier: 0.40, tileClass: "wx-oasis" },
    { id: "rocky_s4_pollination", name: "Pollination Wave", desc: "The ecosystem begins to do its own work.",
      stage: 4, weight: 0.9, durationS: 180, type: "all_pps", multiplier: 0.20, tileClass: "wx-oasis" },
    { id: "rocky_s4_quake", name: "Minor Quake", desc: "A small tremor. Nothing damaged, just interrupted.",
      stage: 4, weight: 1.0, durationS: 90, type: "extraction_rate", multiplier: -0.25, tileClass: "wx-seismic" },

    // --- Stage 5 (Paradise) ---
    { id: "rocky_s5_stable_day", name: "Stable Day", desc: "The mature ecosystem hits every rhythm at once. Production climbs.",
      stage: 5, weight: 1.0, durationS: 180, type: "all_pps", multiplier: 0.30, tileClass: "wx-oasis" },
    { id: "rocky_s5_ore_surge", name: "Deep Ore Surge", desc: "Tectonic maturity pushes a deep vein to the surface.",
      stage: 5, weight: 0.9, instant: { resourceId: "common_ore", amount: 40 }, tileClass: "wx-seismic" },
    { id: "rocky_s5_tremor", name: "Distant Tremor", desc: "Something shifts deep below. The drills pause, briefly.",
      stage: 5, weight: 1.0, durationS: 120, type: "extraction_rate", multiplier: -0.20, tileClass: "wx-seismic" }
  ],

  // ================ VOLCANIC ================
  volcanic: [
    // --- Stage 1 (Atmosphere) ---
    { id: "volcanic_s1_vent_calm", name: "Vent Lull", desc: "The vents settle. The atmosphere has a chance to gather.",
      stage: 1, weight: 1.0, durationS: 150, type: "stage_pps", stageIndex: 1, multiplier: 0.40, tileClass: "wx-geo" },
    { id: "volcanic_s1_geo_surge", name: "Geothermal Surge", desc: "The vents intensify — extractors drink it in.",
      stage: 1, weight: 0.9, durationS: 120, type: "extraction_rate", multiplier: 0.30, tileClass: "wx-geo" },
    { id: "volcanic_s1_eruption", name: "Eruption Plume", desc: "Ash chokes the atmosphere processors.",
      stage: 1, weight: 1.0, durationS: 90, type: "stage_pps", stageIndex: 1, multiplier: -0.30, tileClass: "wx-eruption" },

    // --- Stage 2 (Hydrosphere) ---
    { id: "volcanic_s2_steam", name: "Steam Condensation", desc: "Cooling volcanic plumes become rain. Pure, if warm.",
      stage: 2, weight: 1.0, durationS: 150, type: "stage_pps", stageIndex: 2, multiplier: 0.45, tileClass: "wx-rain" },
    { id: "volcanic_s2_obsidian", name: "Obsidian Formation", desc: "A rare crystal deposit cools to glass.",
      stage: 2, weight: 0.7, instant: { resourceId: "geothermal_cores", amount: 15 }, tileClass: "wx-obsidian" },
    { id: "volcanic_s2_flash_boil", name: "Flash Boil", desc: "The new water vaporizes on contact with the hot ground.",
      stage: 2, weight: 1.0, durationS: 90, type: "stage_pps", stageIndex: 2, multiplier: -0.35, tileClass: "wx-eruption" },

    // --- Stage 3 (Flora) ---
    { id: "volcanic_s3_ash_fertile", name: "Fertile Ash", desc: "Mineral-rich ash settles into the soil. Everything grows.",
      stage: 3, weight: 1.0, durationS: 150, type: "stage_pps", stageIndex: 3, multiplier: 0.40, tileClass: "wx-oasis" },
    { id: "volcanic_s3_geo_bloom", name: "Geothermal Bloom", desc: "Heat-loving ferns surge across the cooled flows.",
      stage: 3, weight: 0.9, durationS: 150, type: "extraction_rate", multiplier: 0.25, tileClass: "wx-oasis" },
    { id: "volcanic_s3_lava_flow", name: "Fresh Lava Flow", desc: "A new flow buries some of the young growth.",
      stage: 3, weight: 1.0, durationS: 90, type: "stage_pps", stageIndex: 3, multiplier: -0.30, tileClass: "wx-eruption" },

    // --- Stage 4 (Fauna) ---
    { id: "volcanic_s4_warm_springs", name: "Warm Springs", desc: "Hot pools attract the first adapted creatures.",
      stage: 4, weight: 1.0, durationS: 150, type: "stage_pps", stageIndex: 4, multiplier: 0.40, tileClass: "wx-geo" },
    { id: "volcanic_s4_thermal_high", name: "Thermal Peak", desc: "Every thermal gradient peaks at once. The ecosystem hums.",
      stage: 4, weight: 0.9, durationS: 180, type: "all_pps", multiplier: 0.20, tileClass: "wx-geo" },
    { id: "volcanic_s4_sulfur", name: "Sulfur Venting", desc: "A sulfur plume drives the creatures underground.",
      stage: 4, weight: 1.0, durationS: 90, type: "extraction_rate", multiplier: -0.30, tileClass: "wx-eruption" },

    // --- Stage 5 (Paradise) ---
    { id: "volcanic_s5_calm_heat", name: "Calm Heat", desc: "The mature volcanic paradise pulses with steady warmth.",
      stage: 5, weight: 1.0, durationS: 180, type: "all_pps", multiplier: 0.30, tileClass: "wx-geo" },
    { id: "volcanic_s5_core_surface", name: "Core Exposure", desc: "Tectonic stability exposes a deep geothermal deposit.",
      stage: 5, weight: 0.9, instant: { resourceId: "geothermal_cores", amount: 35 }, tileClass: "wx-obsidian" },
    { id: "volcanic_s5_minor_eruption", name: "Minor Eruption", desc: "Even paradise has its moods. Brief disruption.",
      stage: 5, weight: 1.0, durationS: 120, type: "all_pps", multiplier: -0.20, tileClass: "wx-eruption" }
  ],

  // ================ TOXIC ================
  toxic: [
    // --- Stage 1 (Atmosphere) ---
    { id: "toxic_s1_acid_breakdown", name: "Acid Breakdown", desc: "Atmospheric acids break down into usable components.",
      stage: 1, weight: 1.0, durationS: 150, type: "stage_pps", stageIndex: 1, multiplier: 0.40, tileClass: "wx-chemical" },
    { id: "toxic_s1_catalyst_rain", name: "Catalyst Rain", desc: "A rare rain speeds every chemical process on the surface.",
      stage: 1, weight: 0.9, durationS: 120, type: "all_pps", multiplier: 0.20, tileClass: "wx-catalyst" },
    { id: "toxic_s1_toxic_fog", name: "Toxic Fog Thickening", desc: "A dense fog rolls in. Scrubbers are overwhelmed.",
      stage: 1, weight: 1.0, durationS: 90, type: "stage_pps", stageIndex: 1, multiplier: -0.30, tileClass: "wx-chemical" },

    // --- Stage 2 (Hydrosphere) ---
    { id: "toxic_s2_filtered_rain", name: "Filtered Rainfall", desc: "The scrubbers finally win — clean rain falls.",
      stage: 2, weight: 1.0, durationS: 150, type: "stage_pps", stageIndex: 2, multiplier: 0.45, tileClass: "wx-rain" },
    { id: "toxic_s2_catalyst_pool", name: "Catalyst Bloom", desc: "Natural catalysts surface in the clearing pools.",
      stage: 2, weight: 0.8, instant: { resourceId: "catalysts", amount: 15 }, tileClass: "wx-catalyst" },
    { id: "toxic_s2_acid_upwelling", name: "Acid Upwelling", desc: "A buried pocket of acid contaminates the new water.",
      stage: 2, weight: 1.0, durationS: 120, type: "stage_pps", stageIndex: 2, multiplier: -0.30, tileClass: "wx-chemical" },

    // --- Stage 3 (Flora) ---
    { id: "toxic_s3_adapted_bloom", name: "Adapted Bloom", desc: "The first plants to love what's left thrive here.",
      stage: 3, weight: 1.0, durationS: 150, type: "stage_pps", stageIndex: 3, multiplier: 0.40, tileClass: "wx-catalyst" },
    { id: "toxic_s3_detox_surge", name: "Detoxification Surge", desc: "Every scrubber and catalyst aligns. The air clears.",
      stage: 3, weight: 0.9, durationS: 180, type: "all_pps", multiplier: 0.20, tileClass: "wx-catalyst" },
    { id: "toxic_s3_chem_leak", name: "Chemical Leak", desc: "An old contaminant pocket opens. The scrubbers work overtime.",
      stage: 3, weight: 1.0, durationS: 90, type: "stage_pps", stageIndex: 3, multiplier: -0.30, tileClass: "wx-chemical" },

    // --- Stage 4 (Fauna) ---
    { id: "toxic_s4_spore", name: "Spore Burst", desc: "Adapted organisms surge across the plains.",
      stage: 4, weight: 1.0, durationS: 150, type: "stage_pps", stageIndex: 4, multiplier: 0.40, tileClass: "wx-spore" },
    { id: "toxic_s4_symbiosis", name: "Symbiotic Wave", desc: "Flora and fauna find a working balance. The ecosystem accelerates.",
      stage: 4, weight: 0.9, durationS: 180, type: "all_pps", multiplier: 0.25, tileClass: "wx-spore" },
    { id: "toxic_s4_toxic_retreat", name: "Toxic Retreat", desc: "Lingering pockets drive the new creatures to cover.",
      stage: 4, weight: 1.0, durationS: 90, type: "extraction_rate", multiplier: -0.30, tileClass: "wx-chemical" },

    // --- Stage 5 (Paradise) ---
    { id: "toxic_s5_pure_day", name: "Pure Day", desc: "The scrubbers don't need to run today. The air is just air.",
      stage: 5, weight: 1.0, durationS: 180, type: "all_pps", multiplier: 0.30, tileClass: "wx-catalyst" },
    { id: "toxic_s5_catalyst_surge", name: "Catalyst Surge", desc: "Mature biochemistry concentrates catalysts in easy pools.",
      stage: 5, weight: 0.9, instant: { resourceId: "catalysts", amount: 35 }, tileClass: "wx-catalyst" },
    { id: "toxic_s5_memory_fog", name: "Memory Fog", desc: "A trace of the old atmosphere returns, briefly. Unsettling.",
      stage: 5, weight: 1.0, durationS: 120, type: "all_pps", multiplier: -0.20, tileClass: "wx-chemical" }
  ],

  // ================ OCEANIC ================
  oceanic: [
    // --- Stage 1 (Atmosphere) ---
    { id: "oceanic_s1_sea_breeze", name: "Sea Breeze", desc: "Ocean currents release dissolved gases into the forming atmosphere.",
      stage: 1, weight: 1.0, durationS: 150, type: "stage_pps", stageIndex: 1, multiplier: 0.40, tileClass: "wx-tidal" },
    { id: "oceanic_s1_bright_surface", name: "Mirror Surface", desc: "The ocean is perfectly still. Light bounces everywhere.",
      stage: 1, weight: 0.9, durationS: 150, type: "solar_adjacency", multiplier: 0.75, tileClass: "wx-solar" },
    { id: "oceanic_s1_storm_front", name: "Storm Front", desc: "Heavy cloud cover smothers the forming atmosphere.",
      stage: 1, weight: 1.0, durationS: 90, type: "stage_pps", stageIndex: 1, multiplier: -0.30, tileClass: "wx-tidal" },

    // --- Stage 2 (Hydrosphere) ---
    { id: "oceanic_s2_tidal", name: "Tidal Surge", desc: "Strong currents churn nutrients upward.",
      stage: 2, weight: 1.0, durationS: 150, type: "stage_pps", stageIndex: 2, multiplier: 0.35, tileClass: "wx-tidal" },
    { id: "oceanic_s2_deep_current", name: "Deep Current", desc: "A deep current brings rare materials to the shallows.",
      stage: 2, weight: 0.8, instant: { resourceId: "biomatter", amount: 15 }, tileClass: "wx-deep" },
    { id: "oceanic_s2_red_tide", name: "Red Tide", desc: "A bloom of the wrong kind clouds the water.",
      stage: 2, weight: 1.0, durationS: 90, type: "stage_pps", stageIndex: 2, multiplier: -0.25, tileClass: "wx-tidal" },

    // --- Stage 3 (Flora) ---
    { id: "oceanic_s3_coral_start", name: "Coral Foundation", desc: "The first reefs find their anchor points.",
      stage: 3, weight: 1.0, durationS: 150, type: "stage_pps", stageIndex: 3, multiplier: 0.40, tileClass: "wx-coral" },
    { id: "oceanic_s3_kelp", name: "Kelp Forest Surge", desc: "Giant kelp unfurls across the shallows. Everything photosynthesizes.",
      stage: 3, weight: 0.9, durationS: 150, type: "extraction_rate", multiplier: 0.25, tileClass: "wx-coral" },
    { id: "oceanic_s3_acidify", name: "Acidification Spike", desc: "The young reefs struggle against a chemistry shift.",
      stage: 3, weight: 1.0, durationS: 120, type: "stage_pps", stageIndex: 3, multiplier: -0.30, tileClass: "wx-tidal" },

    // --- Stage 4 (Fauna) ---
    { id: "oceanic_s4_coral", name: "Coral Bloom", desc: "A rapid reef-growth event. Fish appear where there were none.",
      stage: 4, weight: 1.0, durationS: 150, type: "stage_pps", stageIndex: 4, multiplier: 0.40, tileClass: "wx-coral" },
    { id: "oceanic_s4_migration", name: "First Migration", desc: "Schooling creatures move together for the first time.",
      stage: 4, weight: 0.9, durationS: 180, type: "all_pps", multiplier: 0.20, tileClass: "wx-coral" },
    { id: "oceanic_s4_dead_zone", name: "Dead Zone Drift", desc: "An oxygen-poor patch drifts through, scattering the new life.",
      stage: 4, weight: 1.0, durationS: 90, type: "extraction_rate", multiplier: -0.30, tileClass: "wx-deep" },

    // --- Stage 5 (Paradise) ---
    { id: "oceanic_s5_reef_song", name: "Reef Chorus", desc: "The mature reef pulses with life at every scale. Production climbs.",
      stage: 5, weight: 1.0, durationS: 180, type: "all_pps", multiplier: 0.30, tileClass: "wx-coral" },
    { id: "oceanic_s5_bio_upwelling", name: "Biomatter Upwelling", desc: "Deep currents push nutrient-rich mass to the surface.",
      stage: 5, weight: 0.9, instant: { resourceId: "biomatter", amount: 35 }, tileClass: "wx-deep" },
    { id: "oceanic_s5_gale", name: "Ocean Gale", desc: "A storm crosses the paradise. Beautiful, inconvenient.",
      stage: 5, weight: 1.0, durationS: 120, type: "extraction_rate", multiplier: -0.20, tileClass: "wx-tidal" }
  ]
};

// Pick a weighted-random weather event for a planet type at its current terraform stage.
// No events on Barren (stage 0); events are stage-pinned via the entry's top-level `stage` field.
function pickWeatherEvent(planetType, currentStage) {
  if (currentStage === 0) return null;
  var list = (WEATHER_EVENTS && WEATHER_EVENTS[planetType]) || [];
  if (list.length === 0) return null;
  var eligible = list.filter(function(e) { return e.stage === currentStage; });
  if (eligible.length === 0) return null;
  var total = eligible.reduce(function(sum, e) { return sum + (e.weight || 1); }, 0);
  var roll = Math.random() * total;
  for (var i = 0; i < eligible.length; i++) {
    roll -= eligible[i].weight || 1;
    if (roll <= 0) return eligible[i];
  }
  return eligible[eligible.length - 1];
}

// Pick an eligible crew task for the given world + crew selection. Returns null if nothing applies.
function pickCrewTask(crew, world, inventory, worldsMap) {
  if (!crew || !world) return null;
  var stage = world.stage || 0;
  var hasParadise = false;
  var paradiseName = null;
  if (worldsMap) {
    for (var pid in worldsMap) {
      if (worldsMap[pid] && worldsMap[pid].stage >= 5) {
        hasParadise = true;
        // Find the planet name for prompt substitution.
        if (typeof findPlanet === "function") {
          var fp = findPlanet(pid);
          if (fp) { paradiseName = fp.planet.name; break; }
        }
      }
    }
  }
  var eligible = CREW_TASKS.filter(function(t) {
    if (!crew[t.role]) return false;
    if ((t.minStage || 0) > stage) return false;
    if (t.requiresParadise && !hasParadise) return false;
    return true;
  });
  if (eligible.length === 0) return null;
  var total = eligible.reduce(function(sum, t) { return sum + (t.weight || 1); }, 0);
  var roll = Math.random() * total;
  var pick = null;
  for (var i = 0; i < eligible.length; i++) {
    roll -= eligible[i].weight || 1;
    if (roll <= 0) { pick = eligible[i]; break; }
  }
  if (!pick) pick = eligible[eligible.length - 1];
  var candId = crew[pick.role];
  var roleDef = CREW_ROLES.find(function(r) { return r.id === pick.role; });
  var cand = roleDef && roleDef.candidates.find(function(c) { return c.id === candId; });
  var name = cand ? cand.name : pick.role;
  var ctx = { paradiseWorldName: paradiseName };
  return {
    task: pick,
    name: name,
    candidateId: candId,
    line: pick.prompt(name, ctx)
  };
}

// Chemistry — recipes crafted in the Greenhouse/Lab. Fuels land in inventory; probes
// travel to a chosen planet and apply an effect on arrival.
var CHEMISTRY_RECIPES = [
  { id: "refined_fuel",  kind: "fuel",  name: "Refined Fuel",
    inputs: { common_ore: 20, rare_metals: 10 }, output: { fuel: 2 },
    desc: "Slow but reliable. Two common resources, two units of fuel." },
  { id: "thermal_fuel",  kind: "fuel",  name: "Thermal Fuel",
    inputs: { geothermal_cores: 20, cryocrystals: 20 }, output: { fuel: 5 },
    desc: "Hot and cold together. Volatile, efficient, satisfying." },
  { id: "bio_fuel",      kind: "fuel",  name: "Bio-Fuel",
    inputs: { biomatter: 40, catalysts: 30 }, output: { fuel: 8 },
    desc: "Endgame fuel. A single batch carries you across the chart." },
  { id: "accelerator_probe", kind: "probe", name: "Accelerator Probe",
    inputs: { catalysts: 15, rare_metals: 10 }, effect: "accelerate",
    effectAmount: 0.05, // +5% of target's current stage threshold
    desc: "Dropped on arrival. Pushes a distant world toward its next stage." },
  { id: "seed_bomb", kind: "probe", name: "Seed Bomb",
    inputs: { common_ore: 20, biomatter: 15 }, effect: "seed_bomb",
    effectAmount: 30, // +30 of target's signature resource
    desc: "Returns 30 of the target planet's signature resource. Paradise worlds accepted." },
  { id: "fertility_bloom", kind: "probe", name: "Fertility Bloom",
    inputs: { catalysts: 25, biomatter: 20, cryocrystals: 10 }, effect: "fertility_bloom",
    effectAmount: FERTILITY_BLOOM_MULT, effectDurationMs: FERTILITY_BLOOM_DURATION_MS,
    desc: "Target world's fertility ×1.25 for 2 hours. Ends if the world graduates." }
];

// Ship room flavor — 4 entries per room, indexed 0–3 by shipRoomTiers[roomId].
// Cards render flavor + an optional mechanical line + a "next threshold" hint.
var SHIP_ROOM_FLAVOR = {
  bridge: [
    "Three soft chairs and a chart table that hums when it's thinking. Most of the chart is still blank.",
    "The chart table has warmed up. Five systems logged, each with a small annotation in your cartographer's handwriting.",
    "Half the chart is yours now. The table keeps a rotating display of recent jumps, like a quiet brag.",
    "The chart is complete. Someone has taped a handwritten note to the edge: 'we saw it all.' No signature."
  ],
  engine: [
    "Warm, humming, faintly oily. The drive coils tick as they cool. Your engineer keeps a single wrench on a magnetic strip, lined up with nothing.",
    "A second wrench has joined the first. The coils sound a little cleaner.",
    "The toolboard has filled in. Spare parts are labeled in three different handwritings. The drive sings instead of hums.",
    "The engine room is a cathedral now. Everything that could be tuned has been tuned twice. Your engineer says the ship has opinions."
  ],
  galley: [
    "Mismatched mugs, a kettle that whistles slightly off-key, a shelf with three jars on it.",
    "The shelf has seven jars. One is labeled in a language none of the crew speaks.",
    "The jar shelf has become the jar wall. The kettle has been replaced — the new one whistles on-key, which no one likes as much.",
    "Your cook has started a cookbook. The first entry is undated. The last entry is a sketch of a meal that hasn't happened yet."
  ],
  greenhouse: [
    "Grow lights over an empty seed rack. A microscope under a soft cloth. The still in the corner hasn't been used yet.",
    "The seed rack holds its first samples, each in a labeled vial. Your botanist checks them every morning. The still has been lit.",
    "The bench is crowded with cross-sections, notebooks, and a half-built apparatus no one will explain. The air smells faintly green.",
    "The greenhouse is alive. Leaves from six worlds coexist along one wall. Your botanist walks through it slowly, twice a day, and doesn't talk to anyone during."
  ],
  quarters: [
    "Four bunks, four small shelves, four lives folded into a single corridor.",
    "Small decorations have appeared above the bunks. A pressed leaf. A photograph face-down. A single good mug. A postcard from a place that doesn't exist.",
    "The corridor has softened. Someone has hung a string of lights no one admits to putting up.",
    "The quarters have become a home. You realize you've stopped thinking of it as the ship."
  ],
  observation: [
    "A dome of glass and a single bench. The best place to watch a star you'll never visit.",
    "Someone has added a second bench. Tonight, someone will use it.",
    "A small log sits on the bench, filling with entries. Most are dated. A few are just a sentence long. 'Tonight the green came in.' 'I am trying to remember what quiet sounds like.'",
    "The deck holds the log, the bench, and a view of a galaxy you helped remake. The log's final entry, so far, reads: 'We were here. We tended. It was good.'"
  ]
};

// Next-tier hint for a ship room, given current state. Returns a short human string or null
// if the room is already maxed. Relied on by the Ship Room tier cards on ShipView.
function shipRoomProgressHint(roomId, state) {
  var worlds = state.worlds || {};
  var tiers = state.shipRoomTiers || {};
  var current = tiers[roomId] || 0;
  if (current >= 3) return null;

  if (roomId === "bridge") {
    var visited = Object.keys(state.visitedSystems || {}).length;
    var thresholds = [5, 10, STUB_SYSTEMS.length];
    return visited + " / " + thresholds[current] + " systems visited";
  }
  if (roomId === "engine") {
    var up = state.upgrades || {};
    var maxT = Math.max(up.hull || 1, up.drive || 1, up.lab || 1);
    if (current === 0) return "Purchase any ship upgrade";
    if (current === 1) return "Reach Tier 3 on any track (current max: T" + maxT + ")";
    return "Reach Tier 5 on any track (current max: T" + maxT + ")";
  }
  if (roomId === "galley") {
    var hours = ((state.totalPlaySeconds || 0) / 3600).toFixed(1);
    var thresholds = [5, 15, 30];
    return hours + " / " + thresholds[current] + " hours played";
  }
  if (roomId === "greenhouse") {
    var flora = 0, paradise = 0;
    for (var id in worlds) {
      if (worlds[id].stage >= 3) flora++;
      if (worlds[id].stage >= 5) paradise++;
    }
    if (current === 0) return flora + " / 1 Flora worlds tended";
    if (current === 1) return flora + " / 3 Flora worlds tended";
    return paradise + " / 1 Paradise worlds tended";
  }
  if (roomId === "quarters") {
    var pops = state.totalPopoutsFired || 0;
    var thresholds = [3, 15, 40];
    return pops + " / " + thresholds[current] + " crew interactions";
  }
  if (roomId === "observation") {
    var paradise = 0;
    for (var qid in worlds) if (worlds[qid].stage >= 5) paradise++;
    var frags = (state.fragmentsFound || []).length;
    var thresholds = [1, 5, 10];
    return paradise + " Paradise or " + frags + " / " + thresholds[current] + " fragments";
  }
  return null;
}

// ================ Codex content pools ================
// Entries added to state.codexEntries accumulate as the player explores. Keyed by stable ids
// so the same event on the same target never double-adds.

// Cartographer scan tasks (crew_tasks.cart_subsurface_scan, cart_chart_record) pull a random
// note from this pool rather than showing a floater with hardcoded text.
var CARTOGRAPHER_SCAN_NOTES = [
  { id: "cart_scan_subsurface", title: "Subsurface Whispers",
    text: "Subsurface layers whisper of the First Tenders. Nothing actionable — just old weight." },
  { id: "cart_scan_neighbor", title: "Neighboring System",
    text: "A neighboring system resolved cleanly on the scope. One of its planets is greener than expected." },
  { id: "cart_scan_pulse", title: "Stellar Pulse",
    text: "The star above this world has a faint regular pulse. Every forty-seven minutes. Origin unknown." },
  { id: "cart_scan_orbits", title: "Orbital Anomaly",
    text: "Orbital mechanics here don't quite match our models. Someone tuned them, long ago, by a small amount." },
  { id: "cart_scan_signal", title: "Edge Signal",
    text: "A signal at the edge of detection. It repeats. We can't decode it yet. Maybe never." },
  { id: "cart_scan_dust", title: "Ancient Dust",
    text: "The dust between stars remembers things. I can feel it on the instruments." }
];

// First time the player lands on a planet of each type, add the matching entry.
var PLANET_FIRST_VISIT_NOTES = {
  frozen:   { title: "First Frozen World", text: "Cold enough to hurt. The silence has texture here." },
  desert:   { title: "First Desert World", text: "The wind moves constantly. There is nothing alive yet to notice it." },
  rocky:    { title: "First Rocky World", text: "Older than most. The rocks have been waiting a long time for something to happen." },
  volcanic: { title: "First Volcanic World", text: "Heat rising through every surface. The planet is awake, just not alive." },
  toxic:    { title: "First Toxic World", text: "The atmosphere is lying to us. The scrubbers are working anyway." },
  oceanic:  { title: "First Oceanic World", text: "An ocean without shores. Light passes through kilometers before it stops." }
};

// First time the player enters a system, add the matching entry.
var SYSTEM_FIRST_ENTRY_NOTES = {
  harbor:    { title: "Harbor", text: "The dock we launched from. Still here. Still patient. The light on the rust-colored world looks different coming back than it did going out." },
  promise:   { title: "Promise", text: "Flagged 'promising' on the chart we inherited. Whoever flagged it didn't live to see why. We are trying to see for them." },
  veil:      { title: "Veil", text: "The dust around this star doesn't belong to this star. It came from somewhere else, and it has been here a long time." },
  crucible:  { title: "Crucible", text: "The inner worlds glow in the thermal scopes. This is a star that has killed things, and is still trying." },
  drift:     { title: "Drift", text: "The orbits are lazy here. Worlds take their time. Nothing in this system has been in a hurry for a billion years." },
  cairn:     { title: "Cairn", text: "A stack of stones around a sun. Someone made this arrangement. Not us. Not recently." },
  bloom:     { title: "Bloom", text: "The instruments pick up organic traces at the edge of resolution. The instruments cannot agree on what. Neither can we." },
  threshold: { title: "Threshold", text: "The cluster thins past here. Stars get lonelier. The silence gets bigger." },
  anvil:     { title: "Anvil", text: "Two suns, close together. The planets between them have been hammered into shapes that shouldn't exist." },
  loom:      { title: "Loom", text: "Dust threads weave between five worlds. The patterns are almost regular. Almost means something, out here." },
  hush:      { title: "Hush", text: "Our instruments register less here than they should. The star is dim. The worlds are dim. Something is absorbing." },
  sunder:    { title: "Sunder", text: "A ring of debris where a planet used to be. Something broke here. Long before us." },
  pyre:      { title: "Pyre", text: "The red giant should have died long ago. It hasn't. Nothing in this system has aged correctly." },
  wellspring:{ title: "Wellspring", text: "Three oceanic worlds and a frozen moon. Water everywhere. We will be back here often." },
  cloister:  { title: "Cloister", text: "Tucked behind a dust lane. The approach is difficult. Whoever built here wanted it that way." },
  ember:     { title: "Ember", text: "The star is dying, quietly. It will outlast us. It will outlast most things." },
  kestrel:   { title: "Kestrel", text: "The star pulses. Light arrives in waves. Our two hardy worlds here have learned to live by the beat." },
  solace:    { title: "Solace", text: "The farthest point on the chart. Cold. Calm. Untouched by us or anything. The stars this far out are older than most." }
};

// Fired from milestones in the live tick / placeMachine / etc.
var MILESTONE_NOTES = {
  first_flora:    { title: "First Flora", source: "Botanist", text: "Green before. Green now. Something on this world has chosen to keep trying." },
  first_fauna:    { title: "First Fauna", source: "Botanist", text: "Something moved at the edge of the sensors. Something small. Something alive." },
  first_paradise: { title: "First Paradise", source: "Botanist", text: "A world finished. They are out there, all of them, waiting for the attention we will learn to give." },
  first_flourishing: { title: "First Flourishing System", source: "Cartographer", text: "The system is remembering itself. Three worlds speaking to each other across vacuum. We call that flourishing." },
  first_fully_flourishing: { title: "Fully Flourishing", source: "Cartographer", text: "Every world in this system is alive. They talk to each other now, in the small ways that worlds talk." },
  tenth_machine:  { title: "A Proper Operation", source: "Engineer", text: "Ten machines on one world. It stops being a camp and starts being a place." }
};

// Keyed by weather event id when that event carries a codexNote flag.
var DISCOVERY_NOTES = {
  fossil_find: { title: "Fossil Discovery", source: "Discovery",
    text: "A fossil surfaced near the drill sites today. Pre-Tender, as near as we can date it. Unclassified. We are not the first to wonder about the shape of time." }
};
