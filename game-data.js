// Cindervale Alchemist - Game Data Constants
// Extracted from index.html to reduce context window size
// All game content data: ingredients, recipes, classes, quests, NPCs, etc.

var TH={bg:'#0d0b08',panel:'#14110c',panelAlt:'#1a1610',panelLight:'#201c15',
  border:'#332c22',borderLight:'#4a4030',borderGold:'#9a7a20',
  text:'#c0b088',textDim:'#6a6050',textBright:'#e0d0a8',
  gold:'#d4a420',goldDim:'#7a5a10',goldBright:'#ffe848',
  red:'#c44030',redDim:'#5a2018',green:'#48a038',greenDim:'#204a18',
  blue:'#3868b0',blueDim:'#182848',purple:'#8848c0',purpleDim:'#381858',
  orange:'#d08028',cyan:'#40a0c0',teal:'#309080',
  lava:'#d04818',ember:'#ff6830',
  fAsh:'#c06838',fHearth:'#d0a030',fVeil:'#6848b0',fCinder:'#808890',
  statCre:'#e06890',statInu:'#60b0d0',statAcu:'#50b060',statTec:'#d0a040',statCom:'#d07840',statDis:'#9080c0',
};

// ═══ RACES ═══
var RACES={
  human:{id:'human',name:'Human',icon:'👤',desc:'Versatile and adaptable. Humans thrive in any discipline.',
    skillBonus:{persuasion:1,networking:1},
    tip:'"Humans can talk their way into — or out of — just about anything. Centuries of living alongside every other race tends to sharpen the social instincts."'},
  halfling:{id:'halfling',name:'Halfling',icon:'🧑‍🌾',desc:'Small but resourceful, with a supernatural knack for commerce.',
    skillBonus:{haggling:2},
    tip:'"Something about those big, earnest eyes makes even the most hardened merchant drop their prices. Halflings have elevated the art of the deal to a cultural institution."'},
  elf:{id:'elf',name:'Elf',icon:'🧝',desc:'Ancient and perceptive, with centuries of accumulated knowledge.',
    skillBonus:{research:2},
    tip:'"When you\'ve had four hundred years to read, you develop an instinct for where the answers hide. Elven scholars don\'t just study — they remember."'},
  dwarf:{id:'dwarf',name:'Dwarf',icon:'⛏️',desc:'Stout and industrious. Master crafters of stone, metal, and reagent.',
    skillBonus:{precision:2},
    tip:'"Dwarven hands were made for delicate work — a paradox their thick fingers seem to defy. Every measurement exact, every cut clean. It\'s in the blood."'},
  goliath:{id:'goliath',name:'Goliath',icon:'🗿',desc:'Towering and tireless. Built like a mountain and twice as stubborn.',
    skillBonus:{endurance:2},
    tip:'"Goliaths simply don\'t tire. Where others flag by afternoon, a Goliath is just getting warmed up. More hours, more work, more everything."'},
  dragonborn:{id:'dragonborn',name:'Dragonborn',icon:'🐉',desc:'Draconic heritage carries an innate affinity for runic magic.',
    skillBonus:{inscription:2},
    tip:'"The old draconic tongue is the root language of all enchantment runes. Dragonborn don\'t learn inscription — they remember it, the way you remember how to breathe."'},
};
var RACE_IDS=Object.keys(RACES);
var GENDERS=[{id:'male',name:'Male',icon:'♂'},{id:'female',name:'Female',icon:'♀'}];

// ═══ STATS & SKILLS ═══
var STATS={cre:{id:'cre',name:'Creativity',icon:'🎨',color:TH.statCre},inu:{id:'inu',name:'Intuition',icon:'🔮',color:TH.statInu},acu:{id:'acu',name:'Acumen',icon:'📚',color:TH.statAcu},tec:{id:'tec',name:'Technique',icon:'🔧',color:TH.statTec},com:{id:'com',name:'Commerce',icon:'💬',color:TH.statCom},dis:{id:'dis',name:'Discipline',icon:'📋',color:TH.statDis}};
var STAT_IDS=Object.keys(STATS);

var SKILLS={
  improvisation:{id:'improvisation',name:'Improvisation',stat:'cre',icon:'💡',uses:'Craft check for Creativity-based recipes',
    mech:'Adds to your d20 craft roll for CRE-based recipes (Spore Bomb, Forge Catalyst, etc). Each rank adds your proficiency bonus to the check.'},
  aesthetics:{id:'aesthetics',name:'Aesthetics',stat:'cre',icon:'✨',uses:'+sell price, +XP per brew, +enchant reward',
    mech:'+2g per rank to potion sell & shelf price. +2 XP per rank when brewing. +3g per rank on enchanting customer rewards.'},
  innovation:{id:'innovation',name:'Innovation',stat:'cre',icon:'🌟',uses:'Boosts Research study discovery chance',
    mech:'+6% per rank to Research study discovery chance (base 20%, cap 65%). Stack with Research skill for maximum discovery rate.'},
  adaptation:{id:'adaptation',name:'Adaptation',stat:'cre',icon:'🔄',uses:'Bonus to unfamiliar recipes & experiments',
    mech:'+rank bonus to craft checks on recipes you\'ve brewed 5 or fewer times. Also +rank to Experiment Bench checks. Rewards trying new recipes.'},
  attunement:{id:'attunement',name:'Attunement',stat:'inu',icon:'🌿',uses:'Craft check for Intuition-based recipes',
    mech:'Adds to your d20 craft roll for INU-based recipes (Healing Salve, Ashveil Tonic, Celestial Balm, etc). Each rank adds your proficiency bonus.'},
  danger_sense:{id:'danger_sense',name:'Danger Sense',stat:'inu',icon:'⚠️',uses:'Avoid expedition injuries and pack loss',
    mech:'Rank×12% chance to completely avoid negative expedition events (item loss, time loss). The event still narrates but you dodge the penalty.'},
  arcane_sense:{id:'arcane_sense',name:'Arcane Sensitivity',stat:'inu',icon:'🔮',uses:'Bonus to enchanting checks',
    mech:'Full rank modifier added to your Inscription check when enchanting customer items. Stacks with Focus and Inscription skill.'},
  divination:{id:'divination',name:'Divination',stat:'inu',icon:'👁️',uses:'Bonus ingredients from foraging',
    mech:'Rank×8% chance per successful foraging hour to find +1 bonus ingredient from the region\'s full ingredient list (ignoring the normal pick-3 limit).'},
  lore:{id:'lore',name:'Lore',stat:'acu',icon:'📖',uses:'+XP on quests, faster Research',
    mech:'+rank×4 bonus XP on every quest and board request turn-in. At rank 4+, Research study sessions cost 1 hour instead of 2.'},
  research:{id:'research',name:'Research',stat:'acu',icon:'🔬',uses:'Craft check for Acumen-based recipes, +discovery chance',
    mech:'Adds to d20 craft roll for ACU-based recipes. +4% per rank to Research discovery chance. +20 bonus XP on experiments at rank 2+.'},
  appraisal:{id:'appraisal',name:'Appraisal',stat:'acu',icon:'⚖️',uses:'+enchant reward, +ingredient sell price',
    mech:'+rank×2g on enchanting customer rewards. +rank to ingredient sell price. Stacks with Haggling (which helps buy prices and potion sales).'},
  analysis:{id:'analysis',name:'Analysis',stat:'acu',icon:'🧮',uses:'Chance to auto-succeed craft checks',
    mech:'Rank×5% chance per craft check to auto-succeed (treated as natural 20 for double-batch purposes). At rank 3: 15% of crafts auto-succeed.'},
  precision:{id:'precision',name:'Precision',stat:'tec',icon:'🎯',uses:'Craft check for Technique-based recipes',
    mech:'Adds to your d20 craft roll for TEC-based recipes (Firebrew, Embersteel Oil, etc). Each rank adds your proficiency bonus to the check.'},
  inscription:{id:'inscription',name:'Inscription',stat:'tec',icon:'✍️',uses:'Enchanting dice roll — main enchant skill',
    mech:'THE enchanting skill — this is your d20 roll when inscribing enchantments on customer items. Higher ranks directly increase success rate.'},
  extraction:{id:'extraction',name:'Extraction',stat:'tec',icon:'⛏️',uses:'Foraging dice roll — determines harvest quality',
    mech:'THE foraging skill — this is your d20 roll each expedition hour. Determines whether you find resources. Higher ranks dramatically increase yield.'},
  refinement:{id:'refinement',name:'Refinement',stat:'tec',icon:'💎',uses:'Chance for bonus potions when crafting',
    mech:'Rank×6% chance when crafting any potion to produce a bonus extra at no additional ingredient cost. At rank 3: 18% free potion chance.'},
  haggling:{id:'haggling',name:'Haggling',stat:'com',icon:'🤝',uses:'-buy prices, +sell prices, +shelf sales',
    mech:'-rank/2 off shop buy prices. +rank to potion sell & shelf price. +2% per rank to overnight shelf sale chance.'},
  persuasion:{id:'persuasion',name:'Persuasion',stat:'com',icon:'🗣️',uses:'Boosts faction reputation gains',
    mech:'All faction reputation gains multiplied by (1 + rank×4%). At rank 5: +20% to all rep gains from quests and events.'},
  networking:{id:'networking',name:'Networking',stat:'com',icon:'🌐',uses:'Attracts more customers',
    mech:'Increases the number of potion orders and enchantment customers generated each morning. More customers = more gold opportunities.'},
  procurement:{id:'procurement',name:'Procurement',stat:'com',icon:'📦',uses:'Rare ingredients appear in shop daily',
    mech:'Each morning, rank×5% chance per rare ingredient (from tier 3+ regions) to appear in the shop at 2× base price. Pay premium to skip expeditions.'},
  endurance:{id:'endurance',name:'Endurance',stat:'dis',icon:'💪',uses:'Chance to save Energy on actions',
    mech:'Rank×5% chance that any action costs 0 Energy. At rank 3: also +1 Energy/day. Rewards investment in stamina without breaking the economy.'},
  efficiency:{id:'efficiency',name:'Efficiency',stat:'dis',icon:'⏱️',uses:'-travel time, bonus gather hours',
    mech:'-1 expedition travel hour at rank 2+ (minimum 1h). Additionally rank×3% chance per foraging hour to gain a bonus gathering hour.'},
  stockpiling:{id:'stockpiling',name:'Stockpiling',stat:'dis',icon:'🏗️',uses:'+shelf capacity, saves ingredients on failure',
    mech:'+rank×2 to max shop shelf capacity. Rank×10% chance to recover all ingredients on a failed craft. Pairs well with risky high-DC recipes.'},
  focus:{id:'focus',name:'Focus',stat:'dis',icon:'🧘',uses:'Bonus to enchanting checks',
    mech:'+rank/2 (rounded down) added to Inscription enchanting check. Stacks with Arcane Sense and Inscription skill.'},
};
var SK_IDS=Object.keys(SKILLS);

// ═══ CLASSES (6 — one per stat) ═══
var CLASSES={
  alchemist:{id:'alchemist',name:'Alchemist',icon:'⚗️',color:TH.green,primaryStat:'inu',
    profSkills:['attunement','improvisation'],
    desc:'Sense ingredient harmony intuitively, producing better potions more reliably.',
    shortDesc:'Brew potions, the core craft loop',
    features:[
      {classLv:1,name:'Potion Crafting',desc:'Begin your alchemical journey. +1 craft bonus and 10% ingredient save chance.',effects:{craftBonus:1,saveIngredientChance:0.10}},
      {classLv:2,name:'Ingredient Sense',desc:'+1 to all craft checks. +1 extraction bonus from heightened reagent awareness.',effects:{craftBonus:1,extractionBonus:1}},
      {classLv:3,name:'Specialization',desc:'Choose a specialization path. +5% ingredient save chance.',effects:{saveIngredientChance:0.05}},
      {classLv:4,name:'Efficient Brewing',desc:'15% chance to save one ingredient per brew.',effects:{saveIngredientChance:0.15}},
      {classLv:5,name:'Double Batch',desc:'25% chance to produce 2× potions on success.',effects:{doubleBatchChance:0.25}},
      {classLv:6,name:'Intuitive DC',desc:'Craft checks can\'t roll below 5. 10% lucky brew chance for bonus potions.',effects:{craftFloor:5,luckyBrewChance:0.10}},
      {classLv:7,name:'Master Brewer',desc:'+2 to all craft checks (stacks). Unlock one legendary recipe.',effects:{craftBonus:2,discoveryChanceBonus:0.15}},
      {classLv:8,name:'Reagent Attunement',desc:'Foraging may yield bonus ingredients attuned to your most-brewed recipe. +15% ingredient efficiency on all crafts.',effects:{attunedForaging:true,ingredientEfficiency:0.15}},
      {classLv:9,name:'Perfected Art',desc:'Craft failures on recipes brewed 10+ times produce a lesser version instead. Once per day, reroll a failed craft.',effects:{lesserOnFail:true,craftReroll:1}},
      {classLv:10,name:'Magnum Opus',desc:'Once per day, auto-succeed any craft check with double-batch quality.',effects:{freeCraft:1,doubleBatchChance:0.50}},
    ],
    specs:{
      apothecary:{id:'apothecary',name:'Apothecary',icon:'💊',color:'#50c070',bStat:'inu',bSkills:['attunement','divination'],
        features:[
          {classLv:3,name:"Healer's Touch",desc:'Healing potions are 2× value/XP. Healing recipes -2 DC.',effects:{craftBonus:1,sellBonus:0.20}},
          {classLv:6,name:'Panacea',desc:'Unlock multi-cure recipes. Healing potions also restore morale to staff.',effects:{healMorale:true,customerBonus:1,freeHealBrew:1}},
          {classLv:10,name:'Miracle Worker',desc:'One free healing brew per day, no ingredients needed.',effects:{freeHealBrew:1}},
        ]},
      transmuter:{id:'transmuter',name:'Transmuter',icon:'🔄',color:'#d090e0',bStat:'cre',bSkills:['improvisation','innovation'],
        features:[
          {classLv:3,name:'Efficient Transmutation',desc:'Can convert ingredients at 2:1 ratio. Unlock transmutation recipes.',effects:{transmuteRatio:2,canTransmute:true}},
          {classLv:6,name:'Lead to Gold',desc:'Transmute faction-specific ingredients. Convert potions between types.',effects:{factionTransmute:true,ingredientEfficiency:0.25}},
          {classLv:10,name:"Philosopher's Stone",desc:'1:1 ingredient conversion. Transmutations cost 0 hours.',effects:{transmuteRatio:1,freeTransmute:true}},
        ]},
      venomist:{id:'venomist',name:'Venomist',icon:'☠️',color:'#a0d040',bStat:'tec',bSkills:['precision','extraction'],
        features:[
          {classLv:3,name:'Volatile Mixtures',desc:'Unlock offensive/volatile recipes. Poisons sell 2× to Ashwardens. +2 craft bonus on volatile recipes.',effects:{sellBonus:0.30,craftBonus:2}},
          {classLv:6,name:'Concentrated Dose',desc:'Brew with deadly precision. +20% double batch chance. +2 craft bonus.',effects:{doubleBatchChance:0.20,craftBonus:2}},
          {classLv:10,name:'Plague Doctor',desc:'Legendary venom recipes. +3 craft bonus. 30% double batch on volatile brews. Craft failures produce lesser venoms.',effects:{craftBonus:3,doubleBatchChance:0.30,lesserOnFail:true}},
        ]},
    }},
  enchanter:{id:'enchanter',name:'Enchanter',icon:'✨',color:TH.purple,primaryStat:'cre',
    profSkills:['inscription','arcane_sense'],
    desc:'Turn mundane items into treasures with runes and inscriptions.',
    shortDesc:'Inscribe runes, premium gold from customers',
    features:[
      {classLv:1,name:'Inscribe Enchantment',desc:'Can enchant customer items. Gain proficiency in Inscription and Arcane Sensitivity. +1 inscription, material cost -1.',effects:{enchantBonus:1,enchantMatDiscount:1}},
      {classLv:2,name:'Mana Flow',desc:'+1 to all inscription checks. Enchanting material cost reduced by 1 (min 1).',effects:{enchantBonus:1,enchantMatDiscount:1}},
      {classLv:3,name:'Specialization',desc:'Choose a specialization path. +5 inscription bonus.',effects:{enchantSuccessFlat:5}},
      {classLv:4,name:'Arcane Mastery',desc:'+8% enchant success chance. See customer satisfaction hints.',effects:{enchantSuccessFlat:8,showCustHints:true}},
      {classLv:5,name:'Dual Inscription',desc:'Apply 2 enchantments to a single customer item (second at +3 DC).',effects:{dualInscription:true}},
      {classLv:6,name:'Resonance',desc:'Enchanting customers pay 25% more gold. Unlock 2 new enchantment patterns.',effects:{enchantGoldBonus:0.25,enchantMatSave:0.20}},
      {classLv:7,name:'Overcharge',desc:'Natural 20 inscription = "Masterwork" enchantment worth 3× gold.',effects:{masterworkOnCrit:true}},
      {classLv:8,name:'Archmage',desc:'DC 12 and below enchantments auto-succeed. +2 inscription (stacks).',effects:{autoEnchantDC:12,enchantBonus:2}},
      {classLv:9,name:'Rune Library',desc:'Know all enchantment patterns regardless of faction requirements.',effects:{discoveryChanceBonus:0.25,xpMultiplier:0.10}},
      {classLv:10,name:'Reality Weaver',desc:'Inscription mastery: +12 flat bonus, +50% gold from enchanting. Crits on 17+.',effects:{enchantSuccessFlat:12,enchantGoldBonus:0.50,enchantCritRange:17}},
    ],
    specs:{
      runesmith:{id:'runesmith',name:'Runesmith',icon:'⚔️',color:'#d08040',bStat:'tec',bSkills:['inscription','refinement'],
        features:[
          {classLv:3,name:'Battle Runes',desc:'Weapon/martial enchantments +25% value. -1 DC on weapon runes.',effects:{enchantBonus:1,enchantGoldBonus:0.15}},
          {classLv:6,name:'Runic Mastery',desc:'All enchantment material costs -1. Can re-enchant failed items same day.',effects:{enchantMatDiscount:1,enchantCritRange:19,craftReroll:1}},
          {classLv:10,name:'Legendary Arms',desc:'Artifact-grade weapon enchantments. Martial enchants worth 3× gold.',effects:{enchantGoldBonus:0.50,masterworkOnCrit:true,autoEnchantDC:14}},
        ]},
      wardkeeper:{id:'wardkeeper',name:'Wardkeeper',icon:'🛡️',color:'#4080d0',bStat:'dis',bSkills:['focus','endurance'],
        features:[
          {classLv:3,name:'Wards',desc:'Defensive enchantments +50% value. +2 to defensive inscription checks.',effects:{enchantBonus:1,failEnchantReturn:0.50}},
          {classLv:6,name:'Layered Wards',desc:'Can apply 3 enchantments to armor items. 40% chance to save materials on enchant success.',effects:{enchantMatSave:0.40,dualInscription:true}},
          {classLv:10,name:'Unbreakable',desc:'Permanent wards that never fade. Defensive enchants auto-succeed DC 15.',effects:{autoEnchantDC:15,enchantSuccessFlat:10,enchantMatSave:0.60}},
        ]},
      spellweaver:{id:'spellweaver',name:'Spellweaver',icon:'🌀',color:'#a060e0',bStat:'inu',bSkills:['arcane_sense','divination'],
        features:[
          {classLv:3,name:'Exotic Inscriptions',desc:'Utility/exotic enchantments unlocked. +2 to exotic inscription checks.',effects:{discoveryChanceBonus:0.15,enchantBonus:1}},
          {classLv:6,name:'Planar Weave',desc:'Extraplanar power sources. Exotic enchants worth 2× and attract special customers.',effects:{enchantGoldBonus:0.35,customerBonus:1}},
          {classLv:10,name:'Planar Convergence',desc:'Impossible enchantments. Can combine two enchant types into one inscription.',effects:{enchantCritRange:17,enchantGoldBonus:0.50,customerPayBonus:0.30}},
        ]},
    }},
  artificer:{id:'artificer',name:'Artificer',icon:'⚙️',color:TH.orange,primaryStat:'tec',
    profSkills:['precision','refinement'],
    desc:'Precision engineers who optimize crafting speed, material usage, and workshop efficiency.',
    shortDesc:'Optimize everything, salvage failures',
    features:[
      {classLv:1,name:'Technical Crafting',desc:'+1 to TEC-based craft checks. Gain proficiency in Precision and Refinement.',effects:{craftBonus:1,salvagePercent:0.15}},
      {classLv:2,name:'Salvage',desc:'Recover 50% of ingredients on craft failure (rounded up).',effects:{salvagePercent:0.5}},
      {classLv:3,name:'Specialization',desc:'Choose a specialization path. +10% salvage on failures.',effects:{salvagePercent:0.10}},
      {classLv:4,name:'Calibration',desc:'-1 DC for recipes you\'ve brewed 3+ times. Auto-succeed DC 8 and below.',effects:{craftFloor:4,craftBonus:1}},
      {classLv:5,name:'Overclock',desc:'Workshop upgrades provide 50% more of their numerical bonuses.',effects:{upgradeCostReduction:0.20,batchSizeBonus:1}},
      {classLv:6,name:'Production Line',desc:'Batch brew: +10% success rate per item after the first.',effects:{batchSuccessBonus:0.10}},
      {classLv:7,name:'Prototype',desc:'Once per day, reroll a failed craft. +15% discovery chance from research.',effects:{craftReroll:1,discoveryChanceBonus:0.15}},
      {classLv:8,name:'Grand Artificer',desc:'Unlock legendary device recipes. Workshop upgrade costs -25%.',effects:{craftFloor:8,upgradeCostReduction:0.25}},
      {classLv:9,name:'Systematic Mastery',desc:'Batch brew cap +3. All batch brews show individual roll results.',effects:{batchSizeBonus:3,batchSuccessBonus:0.15}},
      {classLv:10,name:'Masterwork Engine',desc:'Two free 0-hour crafting actions per day. Batch size +2. 100% salvage on failures. Workshop upgrades cost -30%.',effects:{freeCraft:2,batchSizeBonus:2,salvagePercent:1.0,upgradeCostReduction:0.30}},
    ],
    specs:{
      tinkerer:{id:'tinkerer',name:'Tinkerer',icon:'🔩',color:'#c0a040',bStat:'acu',bSkills:['analysis','research'],
        features:[
          {classLv:3,name:'Gadgeteer',desc:'Craft utility gadgets for passive bonuses. +2 to ACU-based checks.',effects:{craftBonus:1,bonusSkillPerLevel:1}},
          {classLv:6,name:'Swiss Army',desc:'Gadgets provide multiple benefits. +15% batch brew success. Workshop upgrades cost -15%.',effects:{batchSuccessBonus:0.15,upgradeCostReduction:0.15}},
          {classLv:10,name:'Masterwork Tools',desc:'Legendary utility tools. All craft DCs -2 permanently. 90% salvage on failure.',effects:{craftBonus:3,salvagePercent:0.90}},
        ]},
      constructor:{id:'constructor',name:'Constructor',icon:'🏗️',color:'#8090a0',bStat:'dis',bSkills:['stockpiling','endurance'],
        features:[
          {classLv:3,name:'Workshop Pro',desc:'Workshop upgrades cost 50% less gold. +2 to DIS checks.',effects:{upgradeCostReduction:0.5,staffEfficiencyBonus:0.15}},
          {classLv:6,name:'Assembly Floor',desc:'Can batch craft 2 different recipes simultaneously. Staff efficiency +20%.',effects:{batchSizeBonus:2,staffEfficiencyBonus:0.20}},
          {classLv:10,name:'Master Builder',desc:'Unique legendary structures. Workshop runs partially automated overnight.',effects:{passiveIncomeMulti:3,overnightCraft:true}},
        ]},
      reclaimer:{id:'reclaimer',name:'Reclaimer',icon:'♻️',color:'#60a080',bStat:'com',bSkills:['procurement','haggling'],
        features:[
          {classLv:3,name:'Zero Waste',desc:'75% salvage on failure. Break down potions. 50% of spoiled ingredients become Alchemical Residue.',effects:{salvagePercent:0.75,ingredientEfficiency:0.25,spoilSalvage:0.50}},
          {classLv:6,name:'Deconstruct',desc:'Break any item into component ingredients. Failed enchants return all materials.',effects:{failEnchantReturn:1.0,saveIngredientChance:0.30}},
          {classLv:10,name:'Perfect Reclamation',desc:'One free craft per day (no ingredients consumed). Deconstruction yields 150%.',effects:{freeCraft:1,salvagePercent:1.0}},
        ]},
    }},
  scholar:{id:'scholar',name:'Scholar',icon:'📚',color:TH.cyan,primaryStat:'acu',
    profSkills:['research','lore'],
    desc:'Discover recipes faster, earn more XP, and turn experiments from gambles into science.',
    shortDesc:'Research, discovery, XP acceleration',
    features:[
      {classLv:1,name:'Research Study',desc:'Can conduct research studies to discover recipes. Gain proficiency in Research and Lore. +5% discovery chance.',effects:{discoveryChanceBonus:0.05,xpMultiplier:0.05}},
      {classLv:2,name:'Speed Reader',desc:'One free research study per day (no hour cost). +10% base discovery chance.',effects:{freeResearchPerDay:1,discoveryChanceBonus:0.10}},
      {classLv:3,name:'Specialization',desc:'Choose a specialization path. +5% discovery chance.',effects:{discoveryChanceBonus:0.05}},
      {classLv:4,name:'Eureka!',desc:'Experiments: +15% discovery chance. On discovery, show recipe stat/DC info.',effects:{experimentBonus:0.15,showRecipeInfo:true}},
      {classLv:5,name:'Academic Network',desc:'+15% XP from all sources. +1 free research study per day (2 total).',effects:{xpMultiplier:0.15,freeResearchPerDay:1}},
      {classLv:6,name:'Cross-Reference',desc:'Experiment Bench shows hints based on how close your combination is.',effects:{experimentHints:true}},
      {classLv:7,name:'Thesis Defense',desc:'+3 to all ACU-based checks. Research can discover enchantment patterns too. +1 bonus skill point per level.',effects:{craftBonus:1,bonusSkillPerLevel:1,xpMultiplier:0.10}},
      {classLv:8,name:'Grand Theorem',desc:'+25% discovery chance from all sources. See full ingredient tables for explored regions.',effects:{discoveryChanceBonus:0.25,showIngredients:true}},
      {classLv:9,name:'Polymath',desc:'+1 rank in every skill where you have 0 ranks. Baseline competence in everything.',effects:{bonusSkillPerLevel:2,craftBonus:1}},
      {classLv:10,name:'Omniscience',desc:'Know all recipes. Experiment Bench shows exact results. +2 craft bonus from deep knowledge. +30% XP from all sources. Publish theoretical papers for passive gold.',effects:{xpMultiplier:0.30,discoveryChanceBonus:0.40,craftBonus:2,publishPapers:true}},
    ],
    specs:{
      theorist:{id:'theorist',name:'Theorist',icon:'🧪',color:'#40c0c0',bStat:'acu',bSkills:['analysis','innovation'],
        features:[
          {classLv:3,name:'Published Research',desc:'2× XP from research and experiments. Can publish papers for passive gold.',effects:{researchXPMulti:2,publishPapers:true}},
          {classLv:6,name:'Peer Review',desc:'Research studies have +20% discovery chance. Papers earn more over time.',effects:{discoveryChanceBonus:0.20,paperScaling:true}},
          {classLv:10,name:'Grand Unified Theory',desc:'All research auto-discovers. Papers generate substantial passive income.',effects:{discoveryChanceBonus:0.35,grandPapers:true}},
        ]},
      naturalist:{id:'naturalist',name:'Naturalist',icon:'🌿',color:'#60b060',bStat:'inu',bSkills:['divination','extraction'],
        features:[
          {classLv:3,name:'Field Guide',desc:'See full ingredient tables for explored regions. Experiments with foraged ingredients get +15% discovery.',effects:{showIngredients:true,experimentBonus:0.15}},
          {classLv:6,name:'Ecological Insight',desc:'Research discovers region-specific recipes. +20% XP from foraging and experiments.',effects:{xpMultiplier:0.20,discoveryChanceBonus:0.15}},
          {classLv:10,name:'Nature\'s Library',desc:'Foraging expeditions have a 30% chance to also discover a recipe using gathered ingredients. +25% XP from foraging.',effects:{discoveryChanceBonus:0.30,xpMultiplier:0.25}},
        ]},
      archivist:{id:'archivist',name:'Archivist',icon:'📜',color:'#c0a060',bStat:'dis',bSkills:['lore','focus'],
        features:[
          {classLv:3,name:'Deep Records',desc:'Quest log shows hidden objectives. +30% quest XP.',effects:{questRepBonus:5,questXPBonus:0.30}},
          {classLv:6,name:'Master Index',desc:'Board quests refresh twice daily. Quest chains unlock earlier.',effects:{doubleQuestRefresh:true,questGoldBonus:0.25}},
          {classLv:10,name:'Living Archive',desc:'Legendary quest chain. All quests reward double reputation.',effects:{questXPBonus:0.50,doubleRep:true}},
        ]},
    }},
  merchant:{id:'merchant',name:'Merchant',icon:'💰',color:TH.gold,primaryStat:'com',
    profSkills:['haggling','networking'],
    desc:'Maximize income from every angle — prices, customers, staff, and trade connections.',
    shortDesc:'Gold generation, staff, shop mastery',
    features:[
      {classLv:1,name:'Shopkeeping',desc:'Enhanced shop front. Shelf sale chance +10%. Gain proficiency in Haggling and Networking.',effects:{shelfSaleBonus:0.10}},
      {classLv:2,name:'Bargain Hunter',desc:'Shop buy prices -15%. Sell prices +10%.',effects:{buyDiscount:0.15,sellBonus:0.10}},
      {classLv:3,name:'Specialization',desc:'Choose a specialization path. +5% sell bonus.',effects:{sellBonus:0.05}},
      {classLv:4,name:'Staff Manager',desc:'+1 max apprentice slot. Staff gain +10% efficiency.',effects:{maxApprenticeBonus:1,staffEfficiencyBonus:0.10}},
      {classLv:5,name:'Trade Routes',desc:'Passive income doubled. Shop restocks 2 additional rare items daily. +25% shelf capacity.',effects:{passiveIncomeMulti:2,shopRestockBonus:2,shelfCapacityBonus:0.25}},
      {classLv:6,name:'Reputation Precedes You',desc:'All faction reputation gains +25%. Faction vendors offer 10% discount.',effects:{repGainBonus:0.25,buyDiscount:0.10}},
      {classLv:7,name:'Golden Tongue',desc:'Enchanting/potion customers pay 20% more. +1 customer per morning.',effects:{customerPayBonus:0.20,customerBonus:1}},
      {classLv:8,name:'Trade Empire',desc:'Staff efficiency +30% (stacks). +1 max apprentice. Payroll -25%.',effects:{staffEfficiencyBonus:0.30,maxApprenticeBonus:1,payrollDiscount:0.25}},
      {classLv:9,name:'Connections',desc:'Commission 1 specific rare ingredient per day at 3× price (guaranteed).',effects:{commissionAccess:1}},
      {classLv:10,name:'Tycoon',desc:'All gold income +50%. Staff can perform 2 tasks simultaneously.',effects:{goldIncomeBonus:0.50,dualStaffTasks:true}},
    ],
    specs:{
      guildmaster:{id:'guildmaster',name:'Guildmaster',icon:'👑',color:'#d0a030',bStat:'com',bSkills:['networking','persuasion'],
        features:[
          {classLv:3,name:'Training Program',desc:'Staff gain XP 50% faster. Can assign staff to skill training.',effects:{staffXPBonus:0.50,staffEfficiencyBonus:0.15}},
          {classLv:6,name:'Guild Network',desc:'Hire from expanded pool. Staff have higher base stats.',effects:{expandedHirePool:true,betterStaffStats:true}},
          {classLv:10,name:'Grand Guildmaster',desc:'Staff can handle legendary tasks. Staff salary costs halved.',effects:{staffForageBonus:0.30,halfPayroll:true}},
        ]},
      diplomat:{id:'diplomat',name:'Diplomat',icon:'🤝',color:'#4090c0',bStat:'inu',bSkills:['persuasion','lore'],
        features:[
          {classLv:3,name:'Embassy',desc:'Double faction rep gains. Faction NPCs offer unique dialogue and quests.',effects:{doubleRep:true,questRepBonus:10}},
          {classLv:6,name:'Trade Agreements',desc:'Exclusive faction vendors with rare stock. Cross-faction quests.',effects:{shopRestockBonus:3,questGoldBonus:0.30}},
          {classLv:10,name:'Grand Alliance',desc:'Allied with all factions simultaneously. Faction vendors stock legendary items.',effects:{repGainBonus:0.50,buyDiscount:0.25,shopRestockBonus:5}},
        ]},
      fence:{id:'fence',name:'Fence',icon:'🗝️',color:'#808060',bStat:'cre',bSkills:['haggling','procurement'],
        features:[
          {classLv:3,name:'Black Market',desc:'Sell potions/enchantments at 2× price with risk of confiscation.',effects:{blackMarket:true,blackMarketMulti:2}},
          {classLv:6,name:'Underground Network',desc:'Special black market customers. Reduced confiscation risk.',effects:{customerBonus:1,reducedRisk:true}},
          {classLv:10,name:'Untouchable',desc:'Zero confiscation risk. Black market prices 3×. Smuggling side-quests.',effects:{noRisk:true,blackMarketMulti:3,sellBonus:0.25}},
        ]},
    }},
  warden:{id:'warden',name:'Warden',icon:'🛡️',color:TH.teal,primaryStat:'dis',
    profSkills:['extraction','endurance'],
    desc:'Masters of wilderness and expedition. Make foraging dramatically more productive.',
    shortDesc:'Foraging mastery, energy efficiency, endurance',
    features:[
      {classLv:1,name:'Trailblazer',desc:'-1 travel time to all regions (min 0). Gain proficiency in Extraction and Endurance.',effects:{travelReduction:1}},
      {classLv:2,name:'Enduring Spirit',desc:'+1 Energy per day. Weather penalties halved.',effects:{bonusEnergyPerDay:1,weatherReduction:0.5}},
      {classLv:3,name:'Specialization',desc:'Choose a specialization path. +1 extraction bonus.',effects:{extractionBonus:1}},
      {classLv:4,name:'Iron Constitution',desc:'Immune to expedition events that cost time. Power through danger.',effects:{immuneTimeLossEvents:true}},
      {classLv:5,name:'Expert Forager',desc:'Critical extraction (nat 20) yields 3× ingredients. Successes yield +1 bonus.',effects:{critExtractionMulti:3,bonusPerSuccess:1}},
      {classLv:6,name:'Deep Mapping',desc:'Forage a second region in same expedition at -2 hours.',effects:{bonusRegionSlot:true}},
      {classLv:7,name:'Wilderness Mastery',desc:'+2 extraction bonus. Positive expedition events 2× more likely. 15% chance of bonus rare find per hour.',effects:{extractionBonus:2,positiveEventMulti:2,luckyFindChance:0.15}},
      {classLv:8,name:'Expedition Commander',desc:'Staff foraging yields +40%. Staff gain XP 25% faster.',effects:{staffForageBonus:0.40,staffXPBonus:0.25}},
      {classLv:9,name:'Indomitable',desc:'+3 extraction bonus. +1 bonus ingredient per successful extraction. Failed extractions still yield 1 common ingredient.',effects:{extractionBonus:3,bonusPerSuccess:1}},
      {classLv:10,name:'Legend of the Wild',desc:'All travel times become 0. +50% foraging yields. Overnight foraging.',effects:{travelReduction:3,yieldMultiplier:0.5,forageOnRest:true}},
    ],
    specs:{
      ranger:{id:'ranger',name:'Ranger',icon:'🏹',color:'#40a060',bStat:'inu',bSkills:['danger_sense','divination'],
        features:[
          {classLv:3,name:'Tracker',desc:'Target ingredients without yield penalty. Befriend wild creatures.',effects:{luckyFindChance:0.20,extractionBonus:2,targetNoYieldPenalty:true}},
          {classLv:6,name:'Pathfinder',desc:'Discover hidden sub-regions with unique ingredients. Creature bonuses grow.',effects:{yieldMultiplier:0.50,critExtractionMulti:2}},
          {classLv:10,name:'Apex Predator',desc:'Legendary expedition zones. Guaranteed rare finds. Companions perform a second daily action.',effects:{companionDualAction:true,guaranteedRare:true}},
        ]},
      quartermaster:{id:'quartermaster',name:'Quartermaster',icon:'📋',color:'#6080a0',bStat:'dis',bSkills:['stockpiling','efficiency'],
        features:[
          {classLv:3,name:'Supply Chain',desc:'Workshop storage doubled. Ingredient efficiency +25%. Spoilage threshold +4.',effects:{doubleStorage:true,ingredientEfficiency:0.25,spoilThreshold:4}},
          {classLv:6,name:'Logistics Master',desc:'Auto-sort ingredients. Batch foraging. Free supply chain maintenance. Supply chain deliveries exempt from spoilage.',effects:{staffForageBonus:0.25,freeSupplyMaint:true,supplyChainNoSpoil:true}},
          {classLv:10,name:'War Room',desc:'Fully automated ingredient management. Foraging yield +100%. Spoilage threshold +8.',effects:{staffEfficiencyBonus:0.30,yieldMultiplier:1,spoilThreshold:8}},
        ]},
      sentinel:{id:'sentinel',name:'Sentinel',icon:'🗼',color:'#a07040',bStat:'tec',bSkills:['extraction','precision'],
        features:[
          {classLv:3,name:'Night Watch',desc:'Night expeditions: +4 bonus gathering hours, increased danger.',effects:{nightExpeditions:true,nightBonusHours:4}},
          {classLv:6,name:'Trap Setter',desc:'Set traps for guaranteed rare ingredient finds. Night danger reduced.',effects:{guaranteedRare:true,nightDangerReduction:true}},
          {classLv:10,name:'Fortified Outpost',desc:'Build permanent outposts at regions for daily passive ingredient income. +1 night hour.',effects:{forageOnRest:true,nightBonusHours:1,staffForageBonus:0.20}},
        ]},
    }},
};

// ═══ FEATS ═══
var FEAT_CATEGORIES={
  crafting:{name:'Crafting',icon:'⚗️',color:TH.green},
  foraging:{name:'Foraging',icon:'⛏️',color:TH.teal},
  enchanting:{name:'Enchanting',icon:'✨',color:TH.purple},
  commerce:{name:'Commerce',icon:'💰',color:TH.gold},
  general:{name:'General',icon:'🌟',color:TH.textBright},
};
var FEATS={
  // ── Crafting ──
  careful_hands:{id:'careful_hands',name:'Careful Hands',icon:'🤲',cat:'crafting',desc:'Once per day, reroll a failed craft check.',effects:{craftReroll:1}},
  bulk_processor:{id:'bulk_processor',name:'Bulk Processor',icon:'📦',cat:'crafting',desc:'Max batch brew size +2.',effects:{batchSizeBonus:2}},
  recipe_intuition:{id:'recipe_intuition',name:'Recipe Intuition',icon:'💡',cat:'crafting',desc:'+10% experiment discovery chance. Experiments cost 0 hours on failure.',effects:{experimentBonus:0.10,freeFailExperiment:true}},
  quality_assurance:{id:'quality_assurance',name:'Quality Assurance',icon:'✅',cat:'crafting',desc:'Brewed potions worth +20% when sold or shelved.',effects:{potionValueBonus:0.20}},
  rapid_infusion:{id:'rapid_infusion',name:'Rapid Infusion',icon:'⚡',cat:'crafting',desc:'The first brew each day costs 0 hours.',effects:{firstBrewFree:true}},
  lucky_brew:{id:'lucky_brew',name:'Lucky Brew',icon:'🍀',cat:'crafting',desc:'10% chance any craft produces a random bonus potion alongside.',effects:{luckyBrewChance:0.10}},
  // ── Foraging ──
  trailblazer_boots:{id:'trailblazer_boots',name:"Trailblazer's Boots",icon:'🥾',cat:'foraging',desc:'-1 travel time to all regions (stacks with Warden).',effects:{travelReduction:1}},
  lucky_find:{id:'lucky_find',name:'Lucky Find',icon:'🔎',cat:'foraging',desc:'10% chance per hour to find a random rare ingredient from any unlocked region.',effects:{luckyFindChance:0.10}},
  herbalist_eye:{id:'herbalist_eye',name:"Herbalist's Eye",icon:'👁️',cat:'foraging',desc:'See full ingredient tables for explored regions.',effects:{showIngredients:true}},
  seasoned_explorer:{id:'seasoned_explorer',name:'Seasoned Explorer',icon:'🧭',cat:'foraging',desc:'+2 to all extraction checks.',effects:{extractionBonus:2}},
  pack_mule:{id:'pack_mule',name:'Pack Mule',icon:'🎒',cat:'foraging',desc:'+50% ingredient yield from foraging.',effects:{yieldMultiplier:0.5}},
  danger_magnet:{id:'danger_magnet',name:'Danger Magnet',icon:'⚡',cat:'foraging',desc:'Events 2× more likely, positive events 3× more likely. High risk, high reward.',effects:{bonusPerSuccess:1,positiveEventMulti:3}},
  // ── Enchanting ──
  runelord:{id:'runelord',name:'Runelord',icon:'🔮',cat:'enchanting',desc:'+2 to all inscription checks.',effects:{enchantBonus:2}},
  mana_efficient:{id:'mana_efficient',name:'Mana Efficient',icon:'💎',cat:'enchanting',desc:'25% chance to save all enchanting materials on success.',effects:{enchantMatSave:0.25}},
  arcane_recycler:{id:'arcane_recycler',name:'Arcane Recycler',icon:'♻️',cat:'enchanting',desc:'Failed enchants return 75% of ingredients.',effects:{failEnchantReturn:0.75}},
  runic_savant:{id:'runic_savant',name:'Runic Savant',icon:'📖',cat:'enchanting',desc:'Learn 3 new enchantment patterns immediately.',effects:{enchantSuccessFlat:5,enchantBonus:1}},
  masterwork_focus:{id:'masterwork_focus',name:'Masterwork Focus',icon:'💫',cat:'enchanting',desc:'Natural 18-20 on inscription = critical (3× reward).',effects:{enchantCritRange:18}},
  // ── Commerce ──
  silver_tongue:{id:'silver_tongue',name:'Silver Tongue',icon:'🗣️',cat:'commerce',desc:'+15% shelf sale chance. +10% all sell prices.',effects:{shelfSaleBonus:0.15,sellBonus:0.10}},
  talent_scout:{id:'talent_scout',name:'Talent Scout',icon:'🔍',cat:'commerce',desc:'+2 hire candidates. All candidates have +2 to highest stat.',effects:{hireBonusCandidates:2,hireBonusStat:2}},
  patron:{id:'patron',name:'Patron of the Arts',icon:'🎭',cat:'commerce',desc:'Customer orders pay 25% more. +1 customer per morning.',effects:{customerPayBonus:0.25,customerBonus:1}},
  supply_lines:{id:'supply_lines',name:'Supply Lines',icon:'🚚',cat:'commerce',desc:'Procurement finds 2× rare items. +2 shelf capacity. Shop restock is cheaper.',effects:{shopRestockBonus:1,buyDiscount:0.10,shelfCapacity:2}},
  penny_pincher:{id:'penny_pincher',name:'Penny Pincher',icon:'🪙',cat:'commerce',desc:'All gold costs (purchases, upgrades, hiring, payroll) -10%.',effects:{upgradeCostReduction:0.15,buyDiscount:0.10}},
  // ── General ──
  early_riser:{id:'early_riser',name:'Early Riser',icon:'🌅',cat:'general',desc:'First action each day costs 0 Energy.',effects:{firstActionFree:true}},
  multitasker:{id:'multitasker',name:'Multitasker',icon:'🔀',cat:'general',desc:'One free 0-hour action per day.',effects:{freeAction:1}},
  jack_of_all:{id:'jack_of_all',name:'Jack of All Trades',icon:'🃏',cat:'general',desc:'+1 to all skill checks where you have 0 ranks.',effects:{bonusSkillPerLevel:1,xpMultiplier:0.05}},
  prodigy:{id:'prodigy',name:'Prodigy',icon:'⭐',cat:'general',desc:'+1 to all six stats (can exceed soft cap).',effects:{craftBonus:1,enchantBonus:1,extractionBonus:1,sellBonus:0.10,xpMultiplier:0.05}},
  tough:{id:'tough',name:'Tough',icon:'💪',cat:'general',desc:'Once per day, reroll a failed check. Negative town events halved.',effects:{eventDamageReduction:0.5,checkReroll:1}},
  focused_mind:{id:'focused_mind',name:'Focused Mind',icon:'🧠',cat:'general',desc:'+1 skill point per level (retroactive).',effects:{bonusSkillPerLevel:1}},
  lorekeeper:{id:'lorekeeper',name:'Lorekeeper',icon:'📚',cat:'general',desc:'+25% XP from quests/board requests. Quest completion +5 faction rep.',effects:{questXPBonus:0.25,questRepBonus:5}},
  relentless:{id:'relentless',name:'Relentless',icon:'🔥',cat:'general',desc:'After a failed check, +2 to next check of same type. Stacks to +6.',effects:{failStreakBonus:2,failStreakCap:6}},
};
var FEAT_IDS=Object.keys(FEATS);

// ═══ ASI LEVELS ═══
var ASI_LEVELS=[4,8,12];
var FEAT_LEVELS=[2,4,6,8,10,12,14,16];


// ═══ UPGRADES ═══
var UPGRADES={
  cauldron_2:{id:'cauldron_2',name:'Reinforced Cauldron',icon:'🫕',cat:'Crafting',desc:'Fine brew DC -1.',cost:{gold:50,ashite:3},effect:{fineDCBonus:-1},tier:1,req:null},
  cauldron_3:{id:'cauldron_3',name:'Master\'s Cauldron',icon:'⚗️',cat:'Crafting',desc:'Masterwork DC -1, +10% double.',cost:{gold:150,embervein:3,ashite:5},effect:{mwDCBonus:-1,doubleBatch:0.1},tier:2,req:'cauldron_2'},
  bench_1:{id:'bench_1',name:'Enchanting Bench',icon:'✨',cat:'Crafting',desc:'Fine inscription DC -1.',cost:{gold:60,ironroot_bark:5,hearthstone:2},effect:{fineEnchDC:-1},tier:1,req:null},
  bench_2:{id:'bench_2',name:'Arcane Nexus',icon:'🔮',cat:'Crafting',desc:'Masterwork inscription DC -1.',cost:{gold:200,veil_shard:2,hearthstone:5},effect:{mwEnchDC:-1},tier:2,req:'bench_1'},
  mortar:{id:'mortar',name:'Precision Mortar',icon:'⚙️',cat:'Crafting',desc:'15% save ingredient.',cost:{gold:35,ashite:2},effect:{saveIngredient:0.15},tier:1,req:null},
  runic_tools:{id:'runic_tools',name:'Runic Tools',icon:'🔧',cat:'Crafting',desc:'+1 craft checks.',cost:{gold:80,warden_sigil:1,embervein:2},effect:{craftSkillBonus:1},tier:1,req:null},
  shelves:{id:'shelves',name:'Shelves',icon:'📦',cat:'Storage',desc:'Stockpiling +2.',cost:{gold:25,ironroot_bark:3},effect:{stockBonus:2},tier:1,req:null},
  cellar:{id:'cellar',name:'Cellar',icon:'🏚️',cat:'Storage',desc:'Spoilage threshold +2.',cost:{gold:80,ashite:5},effect:{spoilThreshold:2},tier:1,req:'shelves'},
  preserveJars:{id:'preserveJars',name:'Preservation Jars',icon:'🫙',cat:'Storage',desc:'Spoilage threshold +2.',cost:{gold:60,ironroot_bark:4,gloomcap:2},effect:{spoilThreshold:2},tier:1,req:null},
  vault:{id:'vault',name:'Vault',icon:'🔐',cat:'Storage',desc:'Double capacity.',cost:{gold:200,deep_crystal:1,ashite:8},effect:{doubleStorage:true},tier:2,req:'cellar'},
  shopfront:{id:'shopfront',name:'Shop Front',icon:'🪟',cat:'Business',desc:'+5g/day passive.',cost:{gold:40,ironroot_bark:4},effect:{passiveIncome:5},tier:1,req:null},
  signage:{id:'signage',name:'Signage',icon:'🪧',cat:'Business',desc:'+1 enchant customer.',cost:{gold:30},effect:{extraCustomers:1},tier:1,req:'shopfront'},
  display:{id:'display',name:'Display Cases',icon:'🏪',cat:'Business',desc:'+15% sell.',cost:{gold:70,hearthstone:2},effect:{sellBonus:0.15},tier:1,req:'shopfront'},
  rep_board:{id:'rep_board',name:'Rep Board',icon:'📋',cat:'Business',desc:'+5 all rep/day.',cost:{gold:50},effect:{dailyRep:5},tier:1,req:'signage'},
  ledger:{id:'ledger',name:'Ledger',icon:'📒',cat:'Business',desc:'+1 staff, +20% eff.',cost:{gold:40},effect:{apprenticeEff:0.2},tier:1,req:null},
  quarters:{id:'quarters',name:'Beds',icon:'🛏️',cat:'Comfort',desc:'+1 Energy/day. Upgrade from bedrolls.',cost:{gold:35,ironroot_bark:3},effect:{bonusEnergy:1},tier:1,req:null},
  hearth:{id:'hearth',name:'Hearth',icon:'🔥',cat:'Comfort',desc:'+1 Energy, +morale.',cost:{gold:100,hearthstone:3},effect:{bonusEnergy:1,morale:10},tier:2,req:'quarters'},
  garden:{id:'garden',name:'Garden',icon:'🌱',cat:'Comfort',desc:'Free daily herbs.',cost:{gold:45,ashbloom:5},effect:{dailyHerbs:true},tier:1,req:null},
  garden_2:{id:'garden_2',name:'Greenhouse',icon:'🌿',cat:'Comfort',desc:'Free rare herbs.',cost:{gold:150,moonpetal:3,sacred_ember:1},effect:{dailyRareHerbs:true},tier:2,req:'garden'},
  library:{id:'library',name:'Library',icon:'📚',cat:'Advanced',desc:'Research/Lore +2.',cost:{gold:120,veil_shard:1},effect:{researchBonus:2},tier:2,req:null},
  forge:{id:'forge',name:'Forge',icon:'🔨',cat:'Advanced',desc:'+2 craft bonus, +1 daily enchant customer, +5% double batch chance.',cost:{gold:180,embervein:5,ashite:8},effect:{craftSkillBonus:2,extraCustomers:1,doubleBatch:0.05},tier:2,req:'runic_tools'},
  leyline:{id:'leyline',name:'Ley Line Tap',icon:'⚡',cat:'Advanced',desc:'+1 free research/day, daily veil shard.',cost:{gold:300,veil_shard:3,deep_crystal:2},effect:{freeResearchPerDay:1,dailyVeil:true},tier:3,req:'library'},
};

// ═══ APPRENTICES ═══
// ═══ WORKSHOP VISUAL LAYOUT ═══
// viewBox 600×350, cells 80×46, 6px gap
var WS_ZONES=[
  {id:'Advanced',label:'🔮 Advanced',x:6,y:4,w:588,h:74,color:'#6a5a9a'},
  {id:'Crafting',label:'⚗️ Brewing',x:6,y:84,w:190,h:176,color:'#4a6a3a'},
  {id:'Storage',label:'📦 Storage',x:202,y:84,w:190,h:176,color:'#5a4a3a'},
  {id:'Business',label:'💰 Shopfront',x:398,y:84,w:190,h:176,color:'#6a5a2a'},
  {id:'Comfort',label:'🏠 Living',x:6,y:266,w:588,h:76,color:'#5a3a3a'},
];
var WS_POS={
  // Advanced — centered row of 3
  library:{x:173,y:22},forge:{x:259,y:22},leyline:{x:345,y:22},
  // Crafting — 2 cols × 3 rows
  cauldron_2:{x:16,y:104},cauldron_3:{x:102,y:104},
  mortar:{x:16,y:154},runic_tools:{x:102,y:154},
  bench_1:{x:16,y:204},bench_2:{x:102,y:204},
  // Storage — 2 cols × 2 rows (vault centered)
  shelves:{x:212,y:104},cellar:{x:298,y:104},
  vault:{x:255,y:154},
  // Business — 2 cols × 3 rows (ledger centered)
  shopfront:{x:408,y:104},signage:{x:494,y:104},
  display:{x:408,y:154},rep_board:{x:494,y:154},
  ledger:{x:451,y:204},
  // Comfort — centered row of 4
  quarters:{x:121,y:284},hearth:{x:207,y:284},garden:{x:293,y:284},garden_2:{x:379,y:284},
};

// ═══ TRAIT EFFECTS ═══
var TRAIT_FX={
  'Quick Learner':{xpMult:0.25,desc:'+25% XP gain'},
  'Clumsy':{effMult:-0.10,desc:'-10% task efficiency'},
  'Keen Senses':{forageEff:0.12,desc:'+12% foraging efficiency'},
  'Shy':{shopEff:-0.08,desc:'-8% shopkeeping efficiency'},
  'Tireless':{moraleDelta:2,desc:'+2 morale/day'},
  'Gruff':{moraleDelta:-1,desc:'-1 morale/day'},
  'Creative':{enchantEff:0.12,desc:'+12% enchanting efficiency'},
  'Distracted':{effMult:-0.06,desc:'-6% task efficiency'},
  'Organized':{effMult:0.08,desc:'+8% task efficiency'},
  'By-the-Book':{researchEff:-0.10,desc:'-10% research efficiency'},
  'Arcane Gifted':{enchantEff:0.15,researchEff:0.10,desc:'+15% enchant, +10% research efficiency'},
  'Fragile':{forageEff:-0.12,desc:'-12% foraging efficiency'},
  'Experienced':{effMult:0.10,desc:'+10% task efficiency'},
  'Slow':{effMult:-0.08,desc:'-8% task efficiency'},
  'Silver Tongue':{shopEff:0.20,desc:'+20% shopkeeping efficiency'},
  'Unreliable':{moraleDelta:-2,desc:'-2 morale/day'},
  'Methodical':{researchEff:0.15,desc:'+15% research efficiency'},
  'Absent-Minded':{effMult:-0.05,desc:'-5% task efficiency'},
  'Curious':{researchEff:0.10,xpMult:0.10,desc:'+10% research eff, +10% XP'},
  'Impatient':{moraleDelta:-1,desc:'-1 morale/day'},
  'Master Brewer':{brewEff:0.18,desc:'+18% brewing efficiency'},
  'Set in Ways':{researchEff:-0.12,desc:'-12% research efficiency'},
  'Fleet-Footed':{forageEff:0.10,desc:'+10% foraging efficiency'},
  'Restless':{moraleDelta:-1,effMult:0.04,desc:'-1 morale/day, +4% efficiency'},
  'Inventive':{brewEff:0.10,researchEff:0.08,desc:'+10% brew, +8% research efficiency'},
  'Perfectionist':{effMult:0.06,moraleDelta:-1,desc:'+6% efficiency, -1 morale/day'},
  'Numerate':{shopEff:0.12,desc:'+12% shopkeeping efficiency'},
  'Cautious':{forageEff:-0.06,desc:'-6% foraging efficiency'},
  'Insightful':{researchEff:0.18,desc:'+18% research efficiency'},
  'Eccentric':{moraleDelta:-1,researchEff:0.08,desc:'-1 morale/day, +8% research'},
  'Strong':{forageEff:0.12,desc:'+12% foraging efficiency'},
  'Blunt':{shopEff:-0.10,desc:'-10% shopkeeping efficiency'},
  'Vigilant':{patrolEff:0.20,desc:'+20% patrol efficiency'},
  'Night Owl':{patrolEff:0.12,forageEff:-0.06,desc:'+12% patrol, -6% foraging efficiency'},
  'Watchful':{patrolEff:0.10,shopEff:0.06,desc:'+10% patrol, +6% shopkeeping efficiency'},
};
var SPEC_MATCH={forage:'foraging',brew:'brewing',shopkeep:'shopkeeping',research_task:'research',construct:'building',patrol:'patrolling'};

var AP_POOL=[
  {id:'ap_korrin',name:'Korrin Ashfoot',icon:'👦',personality:'Eager dwarf, steady hands.',baseStat:{tec:12,dis:11,inu:9},specialty:'brewing',salary:5,traits:['Quick Learner','Clumsy']},
  {id:'ap_syla',name:'Syla Thornweave',icon:'👧',personality:'Quiet half-elf, herb nose.',baseStat:{inu:13,tec:10,dis:9},specialty:'foraging',salary:5,traits:['Keen Senses','Shy']},
  {id:'ap_borik',name:'Borik Ironjaw',icon:'👨',personality:'Retired miner.',baseStat:{tec:11,dis:13,inu:8},specialty:'foraging',salary:6,traits:['Tireless','Gruff']},
  {id:'ap_wren',name:'Wren Candlewick',icon:'👩',personality:'Marta\'s niece. Nimble.',baseStat:{inu:12,cre:12,dis:8},specialty:'enchanting',salary:5,traits:['Creative','Distracted']},
  {id:'ap_dag',name:'Dag the Steady',icon:'🧑',personality:'Former Ashwarden.',baseStat:{dis:14,tec:11,inu:9},specialty:'shopkeeping',salary:7,traits:['Organized','By-the-Book']},
  {id:'ap_fenna',name:'Fenna Moonbright',icon:'👱‍♀️',personality:'Veilwalker initiate.',baseStat:{inu:14,acu:12,tec:8},specialty:'enchanting',salary:8,traits:['Arcane Gifted','Fragile']},
  {id:'ap_grum',name:'Grum Sootbeard',icon:'🧔',personality:'Old assistant.',baseStat:{acu:12,tec:12,dis:10},specialty:'brewing',salary:7,traits:['Experienced','Slow']},
  {id:'ap_pip',name:'Pip Quickfingers',icon:'🧒',personality:'Street-smart haggler.',baseStat:{com:14,cre:11,dis:8},specialty:'shopkeeping',salary:4,traits:['Silver Tongue','Unreliable']},
  {id:'ap_miriel',name:'Miriel Inkwell',icon:'👩‍🔬',personality:'Bookish gnome, always scribbling notes.',baseStat:{acu:14,inu:11,tec:9},specialty:'research',salary:7,traits:['Methodical','Absent-Minded']},
  {id:'ap_theron',name:'Theron Ashvale',icon:'🧑‍🎓',personality:'Former university student, seeking practical experience.',baseStat:{acu:13,cre:11,dis:10},specialty:'research',salary:6,traits:['Curious','Impatient']},
  {id:'ap_olga',name:'Olga Stonebrew',icon:'👵',personality:'Retired alchemist from the capital.',baseStat:{tec:13,inu:12,acu:11},specialty:'brewing',salary:9,traits:['Master Brewer','Set in Ways']},
  {id:'ap_ren',name:'Ren Swiftfoot',icon:'🧝',personality:'Elven courier turned forager.',baseStat:{dis:12,inu:13,tec:10},specialty:'foraging',salary:6,traits:['Fleet-Footed','Restless']},
  {id:'ap_vex',name:'Vex Copperhand',icon:'🧑‍🔧',personality:'Tinkerer who fixes anything.',baseStat:{tec:14,acu:11,dis:9},specialty:'brewing',salary:7,traits:['Inventive','Perfectionist']},
  {id:'ap_luma',name:'Luma Brightquill',icon:'👩‍💼',personality:'Former merchant guild clerk.',baseStat:{com:13,dis:12,acu:10},specialty:'shopkeeping',salary:6,traits:['Numerate','Cautious']},
  {id:'ap_zara',name:'Zara Veilsight',icon:'🧙‍♀️',personality:'Mystic with a talent for pattern-reading.',baseStat:{acu:13,inu:13,cre:10},specialty:'research',salary:8,traits:['Insightful','Eccentric']},
  // ═══ ASHFALL CROSSING APPRENTICES ═══
  {id:'ap_rashid',name:'Rashid Sandborn',icon:'👳',personality:'Desert-raised trader with a nose for rare ingredients.',loc:'ashfall',baseStat:{com:13,dis:12,inu:10},specialty:'shopkeeping',salary:6,traits:['Haggler','Restless']},
  {id:'ap_keva',name:'Keva Flamedaughter',icon:'👩‍🦰',personality:'Flamekeeper acolyte who chose alchemy over prayer.',loc:'ashfall',baseStat:{inu:13,acu:12,tec:10},specialty:'brewing',salary:7,traits:['Devout','Perfectionist']},
  {id:'ap_torq',name:'Torq Duststrider',icon:'🧑‍🦲',personality:'Former Dustwalker scout, knows every trail.',loc:'ashfall',baseStat:{dis:14,inu:11,tec:10},specialty:'foraging',salary:6,traits:['Tireless','Stubborn']},
  {id:'ap_yara',name:'Yara the Quick',icon:'👧',personality:'Street kid from the Crossing. Fast learner.',loc:'ashfall',baseStat:{tec:12,com:13,dis:9},specialty:'brewing',salary:4,traits:['Quick Learner','Unreliable']},
  {id:'ap_naveen',name:'Naveen Crystaleye',icon:'🧑‍🔬',personality:'Salt Cavern researcher with encyclopedic mineral knowledge.',loc:'ashfall',baseStat:{acu:14,tec:12,inu:9},specialty:'research',salary:8,traits:['Methodical','Fragile']},
  {id:'ap_duri',name:'Duri Ironvein',icon:'🧔',personality:'Obsidian miner turned alchemist\'s assistant.',loc:'ashfall',baseStat:{tec:13,dis:13,inu:8},specialty:'foraging',salary:7,traits:['Experienced','Slow']},
  {id:'ap_lira',name:'Lira Miragecatcher',icon:'🧝‍♀️',personality:'Half-elf drawn to the Mirage Bazaar\'s mysteries.',loc:'ashfall',baseStat:{inu:14,acu:12,cre:11},specialty:'enchanting',salary:8,traits:['Arcane Gifted','Eccentric']},
  {id:'ap_baz',name:'Baz Saltbeard',icon:'🧔‍♂️',personality:'Grizzled dwarf who ran a competing shop that failed.',loc:'ashfall',baseStat:{tec:12,com:12,dis:11},specialty:'shopkeeping',salary:7,traits:['Experienced','Set in Ways']},
  {id:'ap_holt',name:'Holt Cinderforge',icon:'👷',personality:'Blacksmith\'s son looking for a change.',baseStat:{tec:13,dis:12,com:9},specialty:'foraging',salary:5,traits:['Strong','Blunt']},
  // ═══ PATROL SPECIALISTS ═══
  {id:'ap_garren',name:'Garren Shieldwall',icon:'💂',personality:'Former town guard captain, retired but restless.',baseStat:{dis:14,tec:11,com:10},specialty:'patrolling',salary:8,traits:['Vigilant','Tireless']},
  {id:'ap_nell',name:'Nell Hawkeye',icon:'🧝‍♀️',personality:'Half-elf ranger who patrols the forest road.',baseStat:{dis:13,inu:12,tec:10},specialty:'patrolling',salary:7,traits:['Watchful','Fleet-Footed']},
  {id:'ap_soraya',name:'Soraya Dustblade',icon:'⚔️',personality:'Dustwalker veteran turned freelance guard.',loc:'ashfall',baseStat:{dis:14,tec:12,inu:10},specialty:'patrolling',salary:8,traits:['Vigilant','Experienced']},
  {id:'ap_malik',name:'Malik Ashwatch',icon:'🛡️',personality:'Night watchman from the Crossing, knows every shadow.',loc:'ashfall',baseStat:{dis:13,inu:13,com:9},specialty:'patrolling',salary:7,traits:['Night Owl','Keen Senses']},
];
var TASK_TYPES={
  forage:{name:'Forage',icon:'⛏️',stat:'tec',desc:'Sends staff to gather ingredients from a region overnight. Higher TEC = more items found.'},
  brew:{name:'Brew',icon:'⚗️',stat:'tec',desc:'Attempts to brew a potion from your ingredients. ~50% base success, TEC improves odds. Failed brews may lose ingredients.'},
  shopkeep:{name:'Shop',icon:'🏪',stat:'com',desc:'Tends the shop counter, earning gold based on level and COM stat. Reliable daily income.'},
  research_task:{name:'Research',icon:'📚',stat:'acu',desc:'Studies texts overnight. Chance to discover new recipes or enchantments. Higher ACU = better discovery odds.'},
  construct:{name:'Construct',icon:'🔨',stat:'dis',desc:'Preps a workshop upgrade overnight. Higher DIS = faster progress. When complete, gold cost -40% and one material requirement waived.'},
  patrol:{name:'Patrol',icon:'🛡️',stat:'dis',desc:'Patrols against a rival faction threat overnight. Higher DIS = more threat reduced. Vigilant staff excel at this.'},
};

// ═══ GAME DATA ═══
var INGR={ashbloom:{name:'Ashbloom',icon:'🌿',val:5},embercap:{name:'Embercap',icon:'🍄',val:8},hearthstone:{name:'Hearthstone',icon:'💎',val:14},volcanic_essence:{name:'Volcanic Ess.',icon:'🔥',val:20},moonpetal:{name:'Moonpetal',icon:'🌸',val:16},ironroot_bark:{name:'Ironroot',icon:'🪵',val:7},gloomcap:{name:'Gloomcap',icon:'🫧',val:12},embervein:{name:'Embervein',icon:'🔶',val:18},starwort:{name:'Starwort',icon:'⭐',val:15},ashite:{name:'Ashite',icon:'🪨',val:10},warden_sigil:{name:'Warden Sigil',icon:'🔰',val:22},sacred_ember:{name:'Sacred Ember',icon:'🕯️',val:25},veil_shard:{name:'Veil Shard',icon:'🔮',val:30},deep_crystal:{name:'Deep Crystal',icon:'💠',val:35},
  // New region ingredients
  ash_salt:{name:'Ash Salt',icon:'🧂',val:4},cinder_moss:{name:'Cinder Moss',icon:'🌱',val:5},
  ironwood_sap:{name:'Ironwood Sap',icon:'🫗',val:7},thornvine:{name:'Thornvine',icon:'🌾',val:8},
  spore_dust:{name:'Spore Dust',icon:'💨',val:10},cave_lichen:{name:'Cave Lichen',icon:'🟢',val:9},
  crystal_shard:{name:'Crystal Shard',icon:'🔷',val:13},mineral_clay:{name:'Mineral Clay',icon:'🟤',val:11},
  nightdew:{name:'Nightdew',icon:'💧',val:14},lunar_moss:{name:'Lunar Moss',icon:'🌑',val:15},
  sulfur_bloom:{name:'Sulfur Bloom',icon:'💛',val:18},magma_salt:{name:'Magma Salt',icon:'🧡',val:19},
  deep_iron:{name:'Deep Iron',icon:'⬛',val:20},shadow_quartz:{name:'Shadow Quartz',icon:'🖤',val:22},
  forge_scale:{name:'Forge Scale',icon:'🔶',val:28},primordial_ash:{name:'Primordial Ash',icon:'⚫',val:32},
  // New region-specific resources
  char_root:{name:'Char Root',icon:'🫚',val:3},wind_dust:{name:'Wind Dust',icon:'💨',val:4},
  bark_resin:{name:'Bark Resin',icon:'🫗',val:6},moss_amber:{name:'Moss Amber',icon:'🟡',val:7},
  biolumen_gel:{name:'Biolumen Gel',icon:'💚',val:9},mycelium_thread:{name:'Mycelium Thread',icon:'🧵',val:10},
  geode_dust:{name:'Geode Dust',icon:'🔹',val:12},resonance_ore:{name:'Resonance Ore',icon:'🔔',val:13},
  dew_crystal:{name:'Dew Crystal',icon:'💎',val:15},silver_lichen:{name:'Silver Lichen',icon:'🪨',val:14},
  obsidian_flake:{name:'Obsidian Flake',icon:'♦️',val:17},thermal_clay:{name:'Thermal Clay',icon:'🟠',val:18},
  echo_stone:{name:'Echo Stone',icon:'🔊',val:21},dark_amber:{name:'Dark Amber',icon:'🟤',val:20},
  phoenix_ash:{name:'Phoenix Ash',icon:'🔥',val:30},runespark:{name:'Runespark',icon:'✨',val:28},
  // Expansion wave 2 — 2 per region
  ember_petal:{name:'Ember Petal',icon:'🌺',val:3},soot_crystal:{name:'Soot Crystal',icon:'🔸',val:4},
  amber_sap:{name:'Amber Sap',icon:'🍯',val:6},beetle_shell:{name:'Beetle Shell',icon:'🪲',val:7},
  echo_fungus:{name:'Echo Fungus',icon:'🔉',val:9},ghost_silk:{name:'Ghost Silk',icon:'🕸️',val:11},
  singing_quartz:{name:'Singing Quartz',icon:'🎵',val:13},copper_vein:{name:'Copper Vein',icon:'🟫',val:12},
  moth_scale:{name:'Moth Scale',icon:'🦋',val:15},dream_pollen:{name:'Dream Pollen',icon:'💤',val:16},
  lava_pearl:{name:'Lava Pearl',icon:'🔴',val:19},pyrestone:{name:'Pyrestone',icon:'🟧',val:20},
  mithril_dust:{name:'Mithril Dust',icon:'⬜',val:22},void_salt:{name:'Void Salt',icon:'🟪',val:21},
  heartstone_sliver:{name:'Heartstone Sliver',icon:'❤️',val:32},titan_bone:{name:'Titan Bone',icon:'🦴',val:31},
};


var SCREEN_BG={
  map:'map',market:'market',tavern:'tavern',
  workshop:'workshop',research:'workshop',enchant:'workshop',transmute:'workshop',upgrades:'workshop',
  staff:'workshop',quests:'tavern',factions:'chapel',character:'map',worldmap:'wilds',
};
var weightedPick=(weights,n)=>{
  const entries=Object.entries(weights);
  const picked=[];let remaining=[...entries];
  for(let i=0;i<n&&remaining.length>0;i++){
    const totalW=remaining.reduce((s,[,w])=>s+w,0);
    let r=Math.random()*totalW;
    for(let j=0;j<remaining.length;j++){
      r-=remaining[j][1];
      if(r<=0){picked.push(remaining[j][0]);remaining.splice(j,1);break;}
    }
  }
  return picked;
};

var REGIONS=[
  {id:'ashfields',loc:'cindervale',name:'Ashfields',icon:'🏜️',color:'#5a4a3a',ingr:['ashbloom','ironroot_bark','ash_salt','cinder_moss','char_root','wind_dust','ember_petal','soot_crystal','warden_sigil'],pick:3,sites:[
      {id:'old_road',name:'The Old Road',icon:'🛤️',desc:'Cracked flagstones where ashbloom grows thick between broken cartwheel ruts.',
        weights:{ashbloom:26,ironroot_bark:20,ash_salt:8,cinder_moss:8,char_root:9,wind_dust:9,ember_petal:8,soot_crystal:7,warden_sigil:5}},
      {id:'ember_drifts',name:'Ember Drifts',icon:'🌬️',desc:'Wind-sculpted ash dunes that catch ember seeds and crystallized dust.',
        weights:{ashbloom:7,ironroot_bark:7,ash_salt:7,cinder_moss:7,char_root:7,wind_dust:23,ember_petal:27,soot_crystal:12,warden_sigil:3}},
      {id:'scorched_basin',name:'Scorched Basin',icon:'🕳️',desc:'A shallow crater where mineral salts and crystals form on the baked surface.',
        weights:{ashbloom:7,ironroot_bark:7,ash_salt:24,cinder_moss:8,char_root:8,wind_dust:7,ember_petal:8,soot_crystal:27,warden_sigil:4}},
    ],diff:1,unlock:0,time:1,yield:[2,4],dc:8,
    flavor:['Grey ash crunches underfoot as pale blooms peek through the drifts.','Wind scatters ash like snow across the barren expanse.','A familiar trail — Ashbloom grows thick along the old road.']},
  {id:'ironwood',loc:'cindervale',name:'Ironwood',icon:'🌲',color:'#2a3a2a',ingr:['ironroot_bark','ashbloom','embercap','ironwood_sap','thornvine','bark_resin','moss_amber','amber_sap','beetle_shell','warden_sigil'],pick:3,sites:[
      {id:'root_halls',name:'The Root Halls',icon:'🌳',desc:'Massive exposed root systems form natural hallways beneath ancient trees.',
        weights:{ironroot_bark:24,ashbloom:7,embercap:7,ironwood_sap:22,thornvine:7,bark_resin:10,moss_amber:7,amber_sap:7,beetle_shell:5,warden_sigil:4}},
      {id:'amber_hollow',name:'Amber Hollow',icon:'🟡',desc:'A sheltered depression where golden sap pools and slowly hardens into amber.',
        weights:{ironroot_bark:6,ashbloom:6,embercap:7,ironwood_sap:8,thornvine:6,bark_resin:8,moss_amber:22,amber_sap:26,beetle_shell:7,warden_sigil:4}},
      {id:'thornveil_edge',name:'Thornveil Edge',icon:'🌿',desc:'Dense thorny undergrowth at the forest border — fungi thrive in the decay.',
        weights:{ironroot_bark:7,ashbloom:7,embercap:23,ironwood_sap:6,thornvine:24,bark_resin:7,moss_amber:6,amber_sap:6,beetle_shell:9,warden_sigil:5}},
    ],diff:2,unlock:1,time:1,yield:[2,4],dc:10,
    flavor:['Ancient trees with bark like hammered iron loom overhead.','The forest floor is soft with decay — perfect for Embercap.','Ironwood roots grip stone like fingers. Good harvesting here.']},
  {id:'fungal_caves',loc:'cindervale',name:'Fungal Caves',icon:'🍄',color:'#3a2a3a',ingr:['embercap','gloomcap','spore_dust','cave_lichen','biolumen_gel','mycelium_thread','echo_fungus','ghost_silk'],pick:3,sites:[
      {id:'spore_gallery',name:'Spore Gallery',icon:'💨',desc:'An open cavern thick with airborne spores and dense mushroom colonies.',
        weights:{embercap:22,gloomcap:8,spore_dust:28,cave_lichen:8,biolumen_gel:9,mycelium_thread:9,echo_fungus:8,ghost_silk:8}},
      {id:'gloom_deep',name:'The Gloom Deep',icon:'🖤',desc:'The deepest accessible chamber, where light has never touched the stone.',
        weights:{embercap:8,gloomcap:28,spore_dust:8,cave_lichen:9,biolumen_gel:8,mycelium_thread:7,echo_fungus:25,ghost_silk:7}},
      {id:'silk_cavern',name:'Silk Cavern',icon:'🕸️',desc:'Gossamer fungal threads hang ceiling to floor like luminous curtains.',
        weights:{embercap:7,gloomcap:7,spore_dust:7,cave_lichen:8,biolumen_gel:12,mycelium_thread:24,echo_fungus:7,ghost_silk:28}},
    ],diff:2,unlock:2,time:2,yield:[2,4],dc:11,
    flavor:['Bioluminescent fungi paint the cave walls in ghostly blue.','The air is thick with spores. You tie a cloth over your nose.','Dripping water echoes off stone — and strange mushrooms glow in the dark.']},
  {id:'crystal_hollow',loc:'cindervale',name:'Crystal Hollows',icon:'💎',color:'#2a3a4a',ingr:['hearthstone','ashite','crystal_shard','mineral_clay','geode_dust','resonance_ore','singing_quartz','copper_vein'],pick:3,sites:[
      {id:'geode_chamber',name:'Geode Chamber',icon:'🪨',desc:'A hollow dome encrusted with split geodes revealing sparkling crystal interiors.',
        weights:{hearthstone:8,ashite:8,crystal_shard:24,mineral_clay:9,geode_dust:27,resonance_ore:8,singing_quartz:9,copper_vein:7}},
      {id:'resonance_vein',name:'Resonance Vein',icon:'🔔',desc:'A deep fissure where ore hums with harmonic energy that you can feel in your chest.',
        weights:{hearthstone:7,ashite:8,crystal_shard:8,mineral_clay:7,geode_dust:8,resonance_ore:28,singing_quartz:24,copper_vein:10}},
      {id:'copper_grotto',name:'Copper Grotto',icon:'🟤',desc:'Warm-toned cavern rich with copper deposits and hearthstone seams.',
        weights:{hearthstone:24,ashite:9,crystal_shard:7,mineral_clay:10,geode_dust:7,resonance_ore:7,singing_quartz:8,copper_vein:28}},
    ],diff:3,unlock:3,time:2,yield:[2,4],dc:13,
    flavor:['Crystals hum with deep resonance as you descend into the hollow.','Hearthstone veins glitter in your lantern light like trapped stars.','The Cinderfolk carved these paths long ago. Their pick-marks still show.']},
  {id:'moonlit_glade',loc:'cindervale',name:'Moonlit Glade',icon:'🌙',color:'#2a2a4a',ingr:['moonpetal','starwort','nightdew','lunar_moss','dew_crystal','silver_lichen','moth_scale','dream_pollen','veil_shard'],pick:3,sites:[
      {id:'moonpool',name:'The Moonpool',icon:'🪷',desc:'A still reflecting pool surrounded by luminous moonpetal blooms.',
        weights:{moonpetal:26,starwort:7,nightdew:22,lunar_moss:8,dew_crystal:8,silver_lichen:7,moth_scale:7,dream_pollen:7,veil_shard:8}},
      {id:'silver_grove',name:'Silver Grove',icon:'🌿',desc:'Ancient trees wrapped in silvery lichen under perpetual moonlight.',
        weights:{moonpetal:7,starwort:11,nightdew:7,lunar_moss:22,dew_crystal:7,silver_lichen:25,moth_scale:7,dream_pollen:7,veil_shard:7}},
      {id:'moth_sanctuary',name:'Moth Sanctuary',icon:'🦋',desc:'Where giant lunar moths gather by thousands, shedding iridescent scales.',
        weights:{moonpetal:7,starwort:8,nightdew:7,lunar_moss:7,dew_crystal:7,silver_lichen:7,moth_scale:27,dream_pollen:23,veil_shard:7}},
    ],diff:3,unlock:4,time:2,yield:[2,4],dc:14,
    flavor:['Silver light filters through canopy gaps where Moonpetals bloom.','The glade feels outside of time — quiet, luminous, sacred.','Starwort grows only where moonlight touches earth directly.']},
  {id:'volcanic_vents',loc:'cindervale',name:'Volcanic Vents',icon:'🌋',color:'#4a2a1a',ingr:['volcanic_essence','embervein','sulfur_bloom','magma_salt','obsidian_flake','thermal_clay','lava_pearl','pyrestone','sacred_ember'],pick:3,sites:[
      {id:'sulfur_flats',name:'Sulfur Flats',icon:'🟡',desc:'Flat crusted ground painted yellow with sulfur deposits and steaming clay.',
        weights:{volcanic_essence:7,embervein:7,sulfur_bloom:26,magma_salt:9,obsidian_flake:7,thermal_clay:22,lava_pearl:8,pyrestone:8,sacred_ember:6}},
      {id:'magma_wells',name:'Magma Wells',icon:'🔴',desc:'Deep pools of cooling magma where rare minerals condense at the edges.',
        weights:{volcanic_essence:23,embervein:11,sulfur_bloom:7,magma_salt:20,obsidian_flake:7,thermal_clay:7,lava_pearl:9,pyrestone:8,sacred_ember:8}},
      {id:'obsidian_ridge',name:'Obsidian Ridge',icon:'🖤',desc:'Sharp black glass formations with embedded pyrestones glowing like trapped embers.',
        weights:{volcanic_essence:7,embervein:8,sulfur_bloom:7,obsidian_flake:26,thermal_clay:7,magma_salt:7,lava_pearl:7,pyrestone:25,sacred_ember:6}},
    ],diff:4,unlock:5,time:3,yield:[2,4],dc:15,
    flavor:['Sulfurous heat blasts from cracks in the scorched earth.','Embervein ore glows cherry-red near the active vents.','The ground trembles. You work quickly, gathering what you can.']},
  {id:'deep_mines',loc:'cindervale',name:'Deep Mines',icon:'⛏️',color:'#3a3a40',ingr:['ashite','hearthstone','embervein','deep_iron','shadow_quartz','echo_stone','dark_amber','mithril_dust','void_salt','deep_crystal'],pick:3,sites:[
      {id:'upper_shafts',name:'Upper Shafts',icon:'⛏️',desc:'Well-mapped tunnels near the surface with common but reliable mineral veins.',
        weights:{ashite:24,hearthstone:22,embervein:9,deep_iron:9,shadow_quartz:7,echo_stone:8,dark_amber:8,mithril_dust:6,void_salt:5,deep_crystal:2}},
      {id:'shadow_gallery',name:'Shadow Gallery',icon:'👁️',desc:'A vast gallery where quartz formations cast eerie, shifting shadows.',
        weights:{ashite:7,hearthstone:7,embervein:7,deep_iron:7,shadow_quartz:26,echo_stone:22,dark_amber:8,mithril_dust:5,void_salt:5,deep_crystal:6}},
      {id:'mithril_seam',name:'Mithril Seam',icon:'💎',desc:'A rare exposed seam of mithril-bearing ore in the deepest accessible shaft.',
        weights:{ashite:6,hearthstone:5,embervein:7,deep_iron:20,shadow_quartz:6,echo_stone:5,dark_amber:7,mithril_dust:26,void_salt:7,deep_crystal:11}},
    ],diff:4,unlock:6,time:3,yield:[2,4],dc:16,faction:'cinderfolk',fReq:2,
    flavor:['Cinderfolk lanterns guide you through forgotten shafts.','The deep mines hold treasures — and dangers — in equal measure.','Pickaxe rings on stone. The miners nod as you pass.']},
  {id:'heartforge_rim',loc:'cindervale',name:'Heartforge Rim',icon:'⚡',color:'#4a3a0a',ingr:['volcanic_essence','hearthstone','embervein','starwort','forge_scale','primordial_ash','phoenix_ash','runespark','heartstone_sliver','titan_bone'],pick:3,sites:[
      {id:'titans_boneyard',name:"Titan's Boneyard",icon:'🦴',desc:'Ancient titan remains jut from the caldera wall like petrified mountains.',
        weights:{volcanic_essence:6,hearthstone:7,embervein:7,starwort:5,forge_scale:7,primordial_ash:22,phoenix_ash:7,runespark:5,heartstone_sliver:6,titan_bone:28}},
      {id:'phoenix_nesting',name:'Phoenix Nesting',icon:'🔥',desc:'Scorched alcoves where phoenixes once roosted — still crackling with residual energy.',
        weights:{volcanic_essence:7,hearthstone:6,embervein:7,starwort:6,forge_scale:6,primordial_ash:7,phoenix_ash:28,runespark:24,heartstone_sliver:5,titan_bone:4}},
      {id:'forge_gate',name:'The Forge Gate',icon:'🚪',desc:'The massive entrance to the Heartforge itself, encrusted with impossibly rare deposits.',
        weights:{volcanic_essence:6,hearthstone:9,embervein:6,starwort:6,forge_scale:24,primordial_ash:6,phoenix_ash:5,runespark:7,heartstone_sliver:26,titan_bone:5}},
    ],diff:5,unlock:8,time:4,yield:[2,4],dc:18,
    flavor:['The air crackles with dormant power this close to the Heartforge.','Even cold, the Heartforge radiates something ancient and immense.','The rim is treacherous — but the rarest materials gather here.']},
  // ═══ ASHFALL CROSSING REGIONS ═══
  {id:'sunscorch_flats',loc:'ashfall',name:'Sunscorch Flats',icon:'☀️',color:'#8a7a3a',
    ingr:['sunpetal','dustite','scorchroot','ashbloom','ash_salt','wind_dust'],pick:3,sites:[
      {id:'af_nomad_trail',name:'Nomad Trail',icon:'🐪',desc:'Ancient caravan path with hardy desert plants.',
        weights:{sunpetal:30,dustite:25,scorchroot:20,ashbloom:10,ash_salt:8,wind_dust:7}},
      {id:'af_dust_bowl',name:'Dust Bowl',icon:'🌪️',desc:'Windswept depression where dustite concentrates.',
        weights:{dustite:35,scorchroot:20,sunpetal:15,wind_dust:15,ash_salt:10,ashbloom:5}},
    ],diff:1,unlock:0,time:1,yield:[2,4],dc:8,
    flavor:['The relentless sun beats down on cracked earth.','Heat shimmers rise from the flats like liquid glass.']},
  {id:'salt_caverns',loc:'ashfall',name:'Salt Caverns',icon:'🧂',color:'#6a7a8a',
    ingr:['crystal_salt','brine_moss','echo_fungus','gloomcap','ashite','mineral_clay'],pick:3,sites:[
      {id:'af_brine_pools',name:'Brine Pools',icon:'💧',desc:'Underground pools crusted with crystallized salt.',
        weights:{crystal_salt:30,brine_moss:28,echo_fungus:15,gloomcap:12,ashite:8,mineral_clay:7}},
    ],diff:2,unlock:1,time:1,yield:[2,4],dc:10,
    flavor:['Salt crystals catch your torchlight, scattering rainbows across damp walls.']},
  {id:'obsidian_wastes',loc:'ashfall',name:'Obsidian Wastes',icon:'🖤',color:'#2a2a3a',
    ingr:['obsidian_shard','ashite','embervein','scorchroot','dustite','volcanic_essence'],pick:3,sites:[
      {id:'af_glass_fields',name:'Glass Fields',icon:'🔮',desc:'Vast plains of razor-sharp volcanic glass.',
        weights:{obsidian_shard:30,ashite:22,embervein:18,scorchroot:12,dustite:10,volcanic_essence:8}},
    ],diff:2,unlock:2,time:2,yield:[2,4],dc:11,
    flavor:['Black glass crunches underfoot. One wrong step and you bleed.']},
  {id:'sandworm_tunnels',loc:'ashfall',name:'Sandworm Tunnels',icon:'🪱',color:'#7a6a3a',
    ingr:['sandsilk','venomgland','thornvine','scorchroot','brine_moss','obsidian_shard'],pick:3,sites:[
      {id:'af_silk_nests',name:'Silk Nests',icon:'🕸️',desc:'Abandoned sandworm cocoons lined with precious silk.',
        weights:{sandsilk:32,venomgland:22,thornvine:16,scorchroot:12,brine_moss:10,obsidian_shard:8}},
    ],diff:3,unlock:3,time:2,yield:[2,4],dc:13,
    flavor:['The tunnels vibrate with distant movement. Something very large lives down here.']},
  {id:'oasis_grove',loc:'ashfall',name:'Oasis Grove',icon:'🌴',color:'#3a6a4a',
    ingr:['dewdrop_lily','moonpetal','sacred_ember','sunpetal','starwort','dream_pollen'],pick:3,sites:[
      {id:'af_spring',name:'Hidden Spring',icon:'💧',desc:'Crystal-clear water surrounded by rare blooms.',
        weights:{dewdrop_lily:30,moonpetal:25,sacred_ember:15,sunpetal:12,starwort:10,dream_pollen:8}},
    ],diff:3,unlock:4,time:2,yield:[2,4],dc:14,faction:'flamekeepers',fReq:2,
    flavor:['Water. Actual flowing water, in the middle of the desert. Impossibly lush.']},
  {id:'molten_vents',loc:'ashfall',name:'Molten Vents',icon:'🌋',color:'#6a2a2a',
    ingr:['magma_diamond','living_ember','forge_heart_shard','volcanic_essence','embervein','obsidian_shard'],pick:3,sites:[
      {id:'af_caldera',name:'The Caldera',icon:'🔥',desc:'Active volcanic crater. Incredibly dangerous.',
        weights:{magma_diamond:25,living_ember:25,forge_heart_shard:15,volcanic_essence:15,embervein:12,obsidian_shard:8}},
    ],diff:4,unlock:5,time:3,yield:[2,4],dc:15,
    flavor:['The heat is beyond anything you have experienced. Lava glows through cracks.']},
  {id:'mirage_bazaar',loc:'ashfall',name:'Mirage Bazaar',icon:'🏜️',color:'#5a3a6a',
    ingr:['mirage_dust','veil_shard','prismatic_ash','crystal_salt','sandsilk','deep_crystal'],pick:3,sites:[
      {id:'af_phantom_stalls',name:'Phantom Stalls',icon:'👻',desc:'Ghostly market stalls that fade in and out of existence.',
        weights:{mirage_dust:30,veil_shard:22,prismatic_ash:18,crystal_salt:12,sandsilk:10,deep_crystal:8}},
    ],diff:4,unlock:6,time:3,yield:[2,4],dc:16,faction:'dustwalkers',fReq:2,
    flavor:['The bazaar shimmers into existence around you.']},
  {id:'buried_temple',loc:'ashfall',name:'Buried Temple',icon:'🏛️',color:'#4a3a2a',
    ingr:['ancient_resin','temple_gold','deep_crystal','mirage_dust','sacred_ember','veil_shard'],pick:3,sites:[
      {id:'af_sanctum',name:'Inner Sanctum',icon:'⚱️',desc:'The heart of the temple. Untouched for millennia.',
        weights:{temple_gold:25,ancient_resin:25,deep_crystal:18,mirage_dust:12,sacred_ember:12,veil_shard:8}},
    ],diff:5,unlock:8,time:4,yield:[2,4],dc:18,
    flavor:['Stone doors grind open on hinges that have not moved in a thousand years.']},
];
var RECIPES=[
  {id:'healing_salve',name:'Healing Salve',icon:'🧴',ingr:['ashbloom','hearthstone'],xp:30,unlock:0,dc:8,stat:'inu',desc:'A soothing balm that knits flesh and eases pain — the backbone of any apothecary.'},
  {id:'ash_poultice',name:'Ash Poultice',icon:'🩹',ingr:['ash_salt','cinder_moss'],xp:25,unlock:0,dc:7,stat:'inu',desc:'A rough but effective field dressing. Cinder moss draws toxins while ash salt seals wounds.'},
  {id:'firebrew',name:'Firebrew',icon:'🧪',ingr:['embercap','volcanic_essence'],xp:45,unlock:2,dc:11,stat:'tec',desc:'Liquid courage that burns going down and burns coming out. The Ashwardens swear by it.'},
  {id:'enchanters_ink',name:"Enchanter's Ink",icon:'✒️',ingr:['moonpetal','hearthstone'],xp:50,unlock:3,dc:12,stat:'acu',desc:'Silvery ink that holds arcane charge — essential for inscribing runes and wards.'},
  {id:'ironhide',name:'Ironhide Potion',icon:'🛡️',ingr:['ironroot_bark','volcanic_essence'],xp:50,unlock:3,dc:12,stat:'tec',desc:'Toughens skin to leather. Miners drink it before entering unstable shafts.'},
  {id:'ashveil',name:'Ashveil Tonic',icon:'👁️',ingr:['ashbloom','moonpetal'],xp:40,unlock:2,dc:10,stat:'inu',desc:'Sharpens sight through ash and darkness. Scouts pay well for this.'},
  {id:'thornbark_tonic',name:'Thornbark Tonic',icon:'🌿',ingr:['thornvine','ironwood_sap'],xp:40,unlock:2,dc:10,stat:'tec',desc:'Ironwood sap mixed with thornvine creates a bark-like layer on the skin. Short-lived but effective.'},
  {id:'spore_bomb',name:'Spore Bomb',icon:'💣',ingr:['spore_dust','embercap'],xp:45,unlock:2,dc:11,stat:'cre',desc:'A volatile mixture that erupts in a cloud of disorienting spores. Scouts use them to cover retreats.'},
  {id:'gloom_draught',name:'Gloom Draught',icon:'🫧',ingr:['gloomcap','moonpetal'],xp:55,unlock:4,dc:13,stat:'inu',desc:'Distilled shadows that let the drinker pass unseen through the wilds.'},
  {id:'crystal_lens',name:'Crystal Lens Elixir',icon:'🔷',ingr:['crystal_shard','mineral_clay'],xp:55,unlock:3,dc:12,stat:'acu',desc:'Sharpens perception to an unnatural degree. Users report seeing the weave of magic itself.'},
  {id:'moonweave',name:'Moonweave Elixir',icon:'💧',ingr:['nightdew','lunar_moss'],xp:60,unlock:4,dc:13,stat:'inu',desc:'Brewed under moonlight, it amplifies arcane potential. Enchanters covet this.'},
  {id:'magma_flask',name:'Magma Flask',icon:'🧨',ingr:['sulfur_bloom','magma_salt'],xp:70,unlock:5,dc:14,stat:'tec',desc:'Concentrated volcanic fury in a bottle. Shatters on impact with devastating heat.'},
  {id:'embersteel_oil',name:'Embersteel Oil',icon:'⚙️',ingr:['embervein','ironroot_bark','ashite'],xp:75,unlock:6,dc:15,stat:'tec',desc:'Applied to weapons, it makes steel burn with the heat of the deep earth.'},
  {id:'shadow_draught',name:'Shadow Draught',icon:'🖤',ingr:['shadow_quartz','deep_iron'],xp:75,unlock:6,dc:15,stat:'inu',desc:'Distilled from deep mine darkness. The drinker becomes one with shadow.'},
  {id:'deepsteel_polish',name:'Deepsteel Polish',icon:'⬛',ingr:['deep_iron','embervein','mineral_clay'],xp:80,unlock:6,dc:16,stat:'tec',desc:'A weapon treated with this polish cuts through armor as if it were cloth.'},
  {id:'celestial_balm',name:'Celestial Balm',icon:'✨',ingr:['starwort','moonpetal','hearthstone'],xp:90,unlock:7,dc:17,stat:'inu',desc:'Rare and precious — this balm can cure ailments beyond mortal medicine.'},
  {id:'forgeheart_tincture',name:'Forgeheart Tincture',icon:'💜',ingr:['forge_scale','primordial_ash','hearthstone'],xp:110,unlock:8,dc:19,stat:'cre',desc:'Essence of the Heartforge itself. Grants brief but immense resistance to all harm.'},
  {id:'forge_catalyst',name:'Forge Catalyst',icon:'⚡',ingr:['embercap','hearthstone','volcanic_essence'],xp:120,unlock:9,dc:20,stat:'cre',desc:'The legendary compound that could reignite the Heartforge itself.'},
  {id:'warden_ward',name:'Warden\'s Ward',icon:'🔰',ingr:['warden_sigil','ironroot_bark','hearthstone'],xp:100,unlock:6,dc:15,stat:'dis',faction:'ashwardens',fReq:2,desc:'Ashwarden patrol wards — planted along roads to repel creatures from the vents.'},
  {id:'holy_flame',name:'Holy Flame',icon:'🕯️',ingr:['sacred_ember','ashbloom','starwort'],xp:100,unlock:6,dc:15,stat:'inu',faction:'hearthkeepers',fReq:3,desc:'A sacred fire that purifies corruption and lights the way for the faithful.'},
  {id:'veil_sight',name:'Veil Sight',icon:'🔮',ingr:['veil_shard','moonpetal','gloomcap'],xp:100,unlock:6,dc:15,stat:'inu',faction:'veilwalkers',fReq:3,desc:'Opens the drinker\'s eyes to things hidden between the folds of reality.'},
  // New recipes using expanded ingredients
  {id:'windwalk_salve',name:'Windwalk Salve',icon:'🌬️',ingr:['wind_dust','char_root'],xp:20,unlock:0,dc:7,stat:'inu',desc:'A light balm that eases breathing in ash-heavy air. Popular with field workers.'},
  {id:'bark_shield',name:'Barkskin Paste',icon:'🛡️',ingr:['bark_resin','moss_amber'],xp:35,unlock:1,dc:9,stat:'tec',desc:'Ironwood resin hardens into a temporary armor layer when spread on skin.'},
  {id:'glow_vial',name:'Glow Vial',icon:'💚',ingr:['biolumen_gel','cave_lichen'],xp:40,unlock:2,dc:10,stat:'cre',desc:'Bottled bioluminescence. Sheds soft green light for hours without flame or heat.'},
  {id:'mycelium_wrap',name:'Mycelium Bandage',icon:'🩹',ingr:['mycelium_thread','spore_dust'],xp:38,unlock:2,dc:10,stat:'tec',desc:'Living fungal fibers that bond with flesh, sealing wounds and fighting infection.'},
  {id:'geode_tonic',name:'Geode Tonic',icon:'🔹',ingr:['geode_dust','resonance_ore'],xp:52,unlock:3,dc:12,stat:'acu',desc:'Crystalline mineral water that sharpens the mind to a razor edge.'},
  {id:'resonance_oil',name:'Resonance Oil',icon:'🔔',ingr:['resonance_ore','crystal_shard'],xp:55,unlock:3,dc:13,stat:'tec',desc:'Vibrating oil that reveals stress fractures in metal. Blacksmiths covet this.'},
  {id:'moonmist',name:'Moonmist Elixir',icon:'🌙',ingr:['dew_crystal','silver_lichen'],xp:58,unlock:4,dc:13,stat:'inu',desc:'Captures moonlight in liquid form. Grants ethereal calm and sharpened senses.'},
  {id:'silver_salve',name:'Silver Salve',icon:'🤍',ingr:['silver_lichen','nightdew'],xp:55,unlock:4,dc:12,stat:'inu',desc:'A pale ointment with mild anti-corruption properties. The Hearthkeepers approve.'},
  {id:'obsidian_bomb',name:'Obsidian Bomb',icon:'💣',ingr:['obsidian_flake','thermal_clay'],xp:68,unlock:5,dc:14,stat:'cre',desc:'Volcanic glass packed in heat-retaining clay. Shatters into a storm of razor shards.'},
  {id:'thermal_potion',name:'Thermal Draught',icon:'🟠',ingr:['thermal_clay','sulfur_bloom'],xp:65,unlock:5,dc:14,stat:'tec',desc:'Heats the drinker from within. Essential for survival in the frozen deep mines.'},
  {id:'echo_elixir',name:'Echo Elixir',icon:'🔊',ingr:['echo_stone','dark_amber'],xp:78,unlock:6,dc:15,stat:'acu',desc:'Grants echolocation-like perception. Users can sense movement through solid stone.'},
  {id:'dark_ward',name:'Dark Ward Oil',icon:'🟤',ingr:['dark_amber','shadow_quartz'],xp:80,unlock:6,dc:16,stat:'dis',desc:'Wards against creatures of the deep. Miners won\'t enter Shaft Nine without it.'},
  {id:'phoenix_draught',name:'Phoenix Draught',icon:'🔥',ingr:['phoenix_ash','primordial_ash','hearthstone'],xp:115,unlock:8,dc:19,stat:'cre',desc:'Legend says this draught can pull the drinker back from the brink of death itself.'},
  {id:'runespark_ink',name:'Runespark Ink',icon:'✨',ingr:['runespark','forge_scale','moonpetal'],xp:120,unlock:8,dc:19,stat:'acu',desc:'Living ink that writes itself into runes of immense power. The finest enchanting medium.'},
  // Wave 2 recipes — using expansion ingredients
  {id:'soot_candle',name:'Soot Candle',icon:'🕯️',ingr:['soot_crystal','ember_petal'],xp:20,unlock:0,dc:7,stat:'cre',desc:'A slow-burning candle that purifies ash-heavy air. Every Cindervale home has one.'},
  {id:'amber_varnish',name:'Amber Varnish',icon:'🍯',ingr:['amber_sap','beetle_shell'],xp:35,unlock:1,dc:9,stat:'tec',desc:'Golden lacquer from Ironwood sap and ground beetle shell. Protects against corrosion.'},
  {id:'spectral_tincture',name:'Spectral Tincture',icon:'👻',ingr:['ghost_silk','echo_fungus'],xp:42,unlock:2,dc:11,stat:'inu',desc:'Distilled cave spider silk and echo fungus. Allows the drinker to perceive spirits briefly.'},
  {id:'resonance_draught',name:'Resonance Draught',icon:'🎵',ingr:['singing_quartz','copper_vein'],xp:55,unlock:3,dc:12,stat:'acu',desc:'Crystal vibrations in liquid form. Heightens awareness to detect hidden doors and traps.'},
  {id:'dream_dust',name:'Dream Dust',icon:'💤',ingr:['dream_pollen','moth_scale'],xp:60,unlock:4,dc:13,stat:'inu',desc:'Powdered moonlit moth scales mixed with narcotic pollen. Induces vivid prophetic dreams.'},
  {id:'pyrestone_flask',name:'Pyrestone Flask',icon:'🟧',ingr:['pyrestone','lava_pearl'],xp:70,unlock:5,dc:14,stat:'tec',desc:'Concentrated volcanic heat in crystal form. Can melt through locked iron gates.'},
  {id:'void_essence',name:'Void Essence',icon:'🟪',ingr:['void_salt','mithril_dust'],xp:82,unlock:6,dc:16,stat:'dis',desc:'Distilled absence. Renders the drinker undetectable to magical scrying for a full day.'},
  {id:'titan_elixir',name:'Titan\'s Elixir',icon:'🦴',ingr:['titan_bone','heartstone_sliver','forge_scale'],xp:115,unlock:8,dc:19,stat:'cre',desc:'Ground bones of ancient creatures mixed with Heartforge fragments. Grants immense but temporary strength.'},
  // ═══ CARTOGRAPHER ELIXIRS — require hidden ingredients, grant multi-day buffs ═══
  {id:'prismatic_elixir',name:'Prismatic Elixir',icon:'🌈',ingr:['prismatic_ash','thermal_bloom','ashbloom'],xp:80,unlock:5,dc:14,stat:'inu',desc:'Shimmering brew from Ash Geyser reagents. Enhances all crafting for 3 days.',buff:'prismatic_elixir'},
  {id:'canopy_draught',name:'Canopy Draught',icon:'🍃',ingr:['canopy_moss','sky_amber','ironroot_bark'],xp:80,unlock:5,dc:14,stat:'inu',desc:'Distilled sunlight from the forest crown. Boosts foraging for 3 days.',buff:'canopy_draught'},
  {id:'deep_pearl_tonic',name:'Deep Pearl Tonic',icon:'🫧',ingr:['crystal_mycelium','deep_pearl','embercap'],xp:90,unlock:5,dc:15,stat:'acu',desc:'Iridescent cave pearl liquid. Sharpens discovery and learning for 3 days.',buff:'deep_pearl_tonic'},
  {id:'harmonic_infusion',name:'Harmonic Infusion',icon:'🔔',ingr:['harmonic_crystal','resonance_dust','hearthstone'],xp:90,unlock:6,dc:15,stat:'cre',desc:'Crystal resonance in liquid form. Massively boosts enchanting for 3 days.',buff:'harmonic_infusion'},
  {id:'moonlight_philter',name:'Moonlight Philter',icon:'🌙',ingr:['liquid_moonlight','silver_lotus','moonpetal'],xp:95,unlock:6,dc:16,stat:'inu',desc:'Bottled moonbeams. Everything you sell is worth more for 4 days.',buff:'moonlight_philter'},
  {id:'magma_essence',name:'Magma Essence',icon:'🔥',ingr:['magma_diamond','living_ember','volcanic_essence'],xp:100,unlock:7,dc:17,stat:'tec',desc:'Liquid fire. Incredibly potent but short-lived crafting power for 2 days.',buff:'magma_essence'},
  {id:'mithril_draught',name:'Mithril Draught',icon:'⚪',ingr:['deep_mithril','shadow_ore','embervein'],xp:100,unlock:7,dc:17,stat:'tec',desc:'The rarest metal dissolved. Your hands become instruments of precision for 3 days.',buff:'mithril_draught'},
  {id:'primordial_elixir',name:'Primordial Elixir',icon:'⚡',ingr:['primordial_spark','forge_heart_shard','phoenix_ash'],xp:150,unlock:8,dc:20,stat:'inu',desc:'Creation energy in a flask. The ultimate elixir — boosts everything for 5 days.',buff:'primordial_elixir'},
  // ═══ ASHFALL CROSSING RECIPES ═══
  {id:'sunstroke_tonic',name:'Sunstroke Tonic',icon:'☀️',ingr:['sunpetal','crystal_salt'],dc:8,xp:40,stat:'inu',unlock:0,desc:'Restores energy sapped by desert heat.'},
  {id:'sandveil_draught',name:'Sandveil Draught',icon:'🏜️',ingr:['dustite','sunpetal','scorchroot'],dc:10,xp:55,stat:'tec',unlock:1,desc:'Renders the drinker nearly invisible in sandstorms.'},
  {id:'obsidian_edge_oil',name:'Obsidian Edge Oil',icon:'🖤',ingr:['obsidian_shard','scorchroot'],dc:11,xp:60,stat:'tec',unlock:2,desc:'Weapon oil that gives blades a volcanic glass edge.'},
  {id:'brine_poultice',name:'Brine Poultice',icon:'🧂',ingr:['crystal_salt','brine_moss','sunpetal'],dc:10,xp:50,stat:'inu',unlock:1,desc:'Salt-based wound treatment.'},
  {id:'sandsilk_salve',name:'Sandsilk Salve',icon:'🕸️',ingr:['sandsilk','dewdrop_lily'],dc:13,xp:75,stat:'inu',unlock:3,desc:'Luxurious healing cream prized by nobles.'},
  {id:'venom_antidote',name:'Venom Antidote',icon:'🐍',ingr:['venomgland','dewdrop_lily','crystal_salt'],dc:14,xp:80,stat:'acu',unlock:3,desc:'Neutralizes the deadliest desert venoms.'},
  {id:'mirage_elixir',name:'Mirage Elixir',icon:'✨',ingr:['mirage_dust','dewdrop_lily','sandsilk'],dc:16,xp:100,stat:'inu',unlock:5,desc:'Grants brief glimpses of hidden things.'},
  {id:'desert_iron_flask',name:'Desert Iron Flask',icon:'⚱️',ingr:['obsidian_shard','ancient_resin','crystal_salt'],dc:15,xp:90,stat:'tec',unlock:4,desc:'Unbreakable container that preserves any liquid.'},
  {id:'temple_restoration',name:'Temple Restoration',icon:'🏛️',ingr:['temple_gold','ancient_resin','sacred_ember'],dc:18,xp:140,stat:'acu',unlock:7,desc:'Repairs ancient artifacts. Immensely valuable.'},
  {id:'oasis_blessing',name:'Oasis Blessing',icon:'💧',ingr:['dewdrop_lily','sacred_ember','moonpetal','mirage_dust'],dc:20,xp:180,stat:'inu',unlock:8,desc:'Legendary desert restorative.'},

  // ═══ ASHFALL EXPANSION RECIPES ═══
  {id:'dust_shield',name:'Dust Shield Potion',icon:'☕',ingr:['dustite','ashbloom'],dc:8,xp:40,stat:'tec',unlock:0,desc:'Coats the skin in hardened dust. Blocks minor abrasions.'},
  {id:'salt_tonic',name:'Salt Tonic',icon:'🧂',ingr:['crystal_salt','sunpetal'],dc:9,xp:45,stat:'inu',unlock:0,desc:'Restores electrolytes lost in desert heat.'},
  {id:'scorchroot_tea',name:'Scorchroot Tea',icon:'🫖',ingr:['scorchroot','ashbloom'],dc:9,xp:45,stat:'inu',unlock:1,desc:'Bitter brew that sharpens the mind in scorching conditions.'},
  {id:'ember_ink',name:'Ember Ink',icon:'🩶',ingr:['embervein','dustite'],dc:11,xp:55,stat:'tec',unlock:2,desc:'Heat-resistant ink used for inscription and tattooing.'},
  {id:'desert_balm',name:'Desert Balm',icon:'🩹',ingr:['sunpetal','brine_moss','crystal_salt'],dc:11,xp:60,stat:'inu',unlock:2,desc:'Soothes cracked skin and sun damage. Popular with travelers.'},
  {id:'sandstorm_flask',name:'Sandstorm Flask',icon:'🌪️',ingr:['wind_dust','dustite','ashbloom'],dc:10,xp:50,stat:'cre',unlock:1,desc:'Release the cork and a localized sandstorm erupts. Useful distraction.'},
  {id:'cave_salt_elixir',name:'Cave Salt Elixir',icon:'💎',ingr:['crystal_salt','echo_fungus','mineral_clay'],dc:12,xp:65,stat:'acu',unlock:2,desc:'Resonant salts amplify magical sensitivity.'},
  {id:'obsidian_varnish',name:'Obsidian Varnish',icon:'✨',ingr:['obsidian_shard','ashite'],dc:12,xp:65,stat:'tec',unlock:3,desc:'Protective coating that makes surfaces virtually indestructible.'},
  {id:'thornwine',name:'Thornwine',icon:'🍷',ingr:['thornvine','sunpetal','scorchroot'],dc:11,xp:55,stat:'cre',unlock:2,desc:'Fermented desert brew. Burns going down, heals from within.'},
  {id:'silk_bandage_kit',name:'Silk Bandage Kit',icon:'🧵',ingr:['sandsilk','brine_moss'],dc:13,xp:70,stat:'tec',unlock:3,desc:'Sandsilk bandages that promote rapid healing.'},
  {id:'venom_oil',name:'Venom Oil',icon:'☠️',ingr:['venomgland','scorchroot'],dc:14,xp:80,stat:'tec',unlock:4,desc:'Concentrated weapon poison. Handle with extreme caution.'},
  {id:'mirage_bomb',name:'Mirage Bomb',icon:'💥',ingr:['mirage_dust','wind_dust','dustite'],dc:14,xp:80,stat:'cre',unlock:4,desc:'Creates a blinding flash of illusory images on detonation.'},
  {id:'oasis_draught',name:'Oasis Draught',icon:'🌴',ingr:['dewdrop_lily','moonpetal'],dc:13,xp:75,stat:'inu',unlock:4,desc:'Restores vitality as if spending a day at the oasis.'},
  {id:'crystal_resonance',name:'Crystal Resonance Tonic',icon:'🔔',ingr:['crystal_salt','deep_crystal','echo_fungus'],dc:16,xp:100,stat:'acu',unlock:5,desc:'Attunes the drinker to magical frequencies.'},
  {id:'volcanic_salve',name:'Volcanic Salve',icon:'🌋',ingr:['volcanic_essence','obsidian_shard','scorchroot'],dc:15,xp:90,stat:'tec',unlock:5,desc:'Burns like fire but heals like nothing else.'},
  {id:'dream_draught',name:'Dream Draught',icon:'💭',ingr:['dream_pollen','dewdrop_lily','mirage_dust'],dc:17,xp:120,stat:'inu',unlock:6,desc:'Induces prophetic visions. Not for the faint of heart.'},
  {id:'temple_incense',name:'Temple Incense',icon:'🧯',ingr:['ancient_resin','sacred_ember'],dc:16,xp:110,stat:'inu',unlock:6,faction:'flamekeepers',fReq:2,desc:'Sacred incense that purifies spaces and calms the mind.'},
  {id:'sandworm_antitoxin',name:'Sandworm Antitoxin',icon:'🧪',ingr:['venomgland','sandsilk','crystal_salt'],dc:15,xp:95,stat:'acu',unlock:5,desc:'Broad-spectrum antitoxin effective against all desert venoms.'},
  {id:'dust_diamond',name:'Dust Diamond Elixir',icon:'💎',ingr:['deep_crystal','dustite','temple_gold'],dc:19,xp:160,stat:'acu',unlock:7,desc:'Crystallized time. Said to slow aging.'},
  {id:'forge_ember_tonic',name:'Forge Ember Tonic',icon:'🔥',ingr:['volcanic_essence','embervein','ancient_resin'],dc:18,xp:140,stat:'tec',unlock:7,desc:'Liquid fire that tempers the body like steel.'},

  // ═══ ASHFALL CARTOGRAPHER HIDDEN INGREDIENT RECIPES ═══
  {id:'oasis_bloom_tonic',name:'Oasis Bloom Tonic',icon:'🌵',ingr:['desert_bloom','sunpetal','crystal_salt'],xp:80,unlock:5,dc:14,stat:'inu',
    desc:'Distilled from the Buried Oasis bloom. Boosts commerce and customer relations for 3 days.',buff:'oasis_bloom_tonic'},
  {id:'singing_salt_brew',name:'Singing Salt Brew',icon:'🎵',ingr:['singing_salt','crystal_salt','brine_moss'],xp:85,unlock:5,dc:14,stat:'acu',
    desc:'Harmonic salt crystals dissolved into a resonant tonic. Sharpens enchanting for 3 days.',buff:'singing_salt_brew'},
  {id:'glass_bloom_elixir',name:'Glass Bloom Elixir',icon:'🖤',ingr:['glass_bloom','obsidian_shard','scorchroot'],xp:90,unlock:6,dc:15,stat:'tec',
    desc:'Volcanic glass essence — grants incredible precision for 3 days.',buff:'glass_bloom_elixir'},
  {id:'queen_silk_draught',name:'Queen Silk Draught',icon:'👑',ingr:['queen_silk','venomgland','sandsilk'],xp:95,unlock:6,dc:16,stat:'tec',
    desc:'Woven sandworm silk dissolved into liquid armor. Reduces ingredient loss for 3 days.',buff:'queen_silk_draught'},
  {id:'moonwell_philter',name:'Moonwell Philter',icon:'🌙',ingr:['moonwell_water','dewdrop_lily','moonpetal'],xp:95,unlock:6,dc:16,stat:'inu',
    desc:'Water from the hidden moonwell. Massively boosts research and discovery for 4 days.',buff:'moonwell_philter'},
  {id:'dragon_fire_flask',name:'Dragon Fire Flask',icon:'🐉',ingr:['dragon_ash','living_ember','volcanic_essence'],xp:110,unlock:7,dc:18,stat:'tec',
    desc:'Primordial fire from a dragon nesting site. The ultimate crafting accelerant for 2 days.',buff:'dragon_fire_flask'},
  {id:'spirit_draught',name:'Spirit Draught',icon:'👻',ingr:['spirit_essence','mirage_dust','sandsilk'],xp:100,unlock:7,dc:17,stat:'inu',
    desc:'Concentrated mirage essence. Grants spectral perception — boosts all skills for 3 days.',buff:'spirit_draught'},
  {id:'vault_elixir',name:'Vault Gold Elixir',icon:'🏆',ingr:['vault_gold','ancient_resin','deep_crystal'],xp:160,unlock:8,dc:20,stat:'acu',
    desc:'Alchemically perfect gold in liquid form. The Ashfall equivalent of the Primordial Elixir.',buff:'vault_elixir'},

  // ═══ FIELD-ONLY RECIPES (Wildcrafter) ═══
  {id:'vitality_draught',name:'Vitality Draught',icon:'🌿',ingr:['_any_herb','_any_herb2','_any_herb3'],dc:13,xp:70,stat:'inu',unlock:0,fieldOnly:true,
    desc:'Heals 1 staff injury immediately. Must be brewed from fresh ingredients in the field.'},
  {id:'trailblazer_tonic',name:'Trailblazer Tonic',icon:'🥾',ingr:['_any_herb','_any_herb2','_any_mineral'],dc:14,xp:80,stat:'tec',unlock:0,fieldOnly:true,
    desc:'Next expedition travel time -1 hour. Brewed from whatever the land provides.'},
  {id:'wilderness_elixir',name:'Wilderness Elixir',icon:'🍃',ingr:['_any1','_any2','_any3','_any4'],dc:16,xp:100,stat:'inu',unlock:0,fieldOnly:true,
    desc:'3-day buff: +2 extraction, +1 forage yield. Requires 4 different fresh ingredients.',buff:'wilderness_elixir'},
  {id:'essence_wild',name:'Essence of the Wild',icon:'🌍',ingr:['_any1','_any2','_any3','_any4','_any5'],dc:19,xp:160,stat:'inu',unlock:0,fieldOnly:true,fieldLegendary:true,
    desc:'5-day buff: +3 extraction, +2 yield, +1 Energy/day. Requires 5 different ingredients from a dangerous region.',buff:'essence_wild'},
  // ── Seasonal Recipes (Cindervale) ──
  {id:'frostbrew',name:'Frostbrew Tonic',icon:'❄️',ingr:['frostbloom','moonpetal'],xp:55,unlock:3,dc:12,stat:'inu',
    desc:'A shimmering cold tonic that sharpens the mind. Only brewable in winter when Frostbloom is available.'},
  {id:'ice_ward_potion',name:'Ice Ward Potion',icon:'🧊',ingr:['ice_crystal','hearthstone'],xp:65,unlock:4,dc:14,stat:'tec',
    desc:'Liquid warmth that protects against the deepest cold. Sells at a premium in winter.'},
  {id:'winter_fortifier',name:'Winter Fortifier',icon:'🫖',ingr:['frostbloom','ice_crystal','ironroot_bark'],xp:80,unlock:5,dc:15,stat:'dis',
    desc:'A thick warming brew that sustains body and spirit through the harshest season.'},
  {id:'autumn_preserve',name:'Autumn Preserve',icon:'🍂',ingr:['amber_leaf','harvest_root'],xp:50,unlock:2,dc:11,stat:'tec',
    desc:'Concentrated harvest essence. Extends ingredient storage and sells well to travelers stocking up.'},
  {id:'harvest_elixir',name:'Harvest Elixir',icon:'🥕',ingr:['harvest_root','amber_leaf','ashbloom'],xp:65,unlock:4,dc:13,stat:'inu',
    desc:'A golden elixir that embodies autumn abundance. Grants the drinker renewed vigor.'},
  {id:'spring_tonic',name:'Spring Tonic',icon:'💧',ingr:['spring_dewdrop','ashbloom'],xp:45,unlock:1,dc:10,stat:'inu',
    desc:'Fresh morning dew distilled into a revitalizing tonic. A seasonal favorite.'},
  {id:'renewal_draught',name:'Renewal Draught',icon:'🌱',ingr:['spring_dewdrop','moonpetal','embercap'],xp:70,unlock:4,dc:14,stat:'cre',
    desc:'Captures the essence of spring regrowth. Potent healing properties.'},
  // ── Seasonal Recipes (Ashfall) ──
  {id:'bloom_nectar',name:'Bloom Nectar',icon:'🌺',ingr:['desert_rain_lily','sunpetal'],xp:55,unlock:3,dc:12,stat:'inu',
    desc:'Nectar from the rare desert bloom. Extraordinarily fragrant and alchemically potent.'},
  {id:'monsoon_elixir',name:'Monsoon Elixir',icon:'🌧️',ingr:['desert_rain_lily','wet_sand_crystal'],xp:75,unlock:5,dc:15,stat:'cre',
    desc:'Captures the power of the desert rains. Drinkers feel the rush of a flash flood coursing through their veins.'},
  {id:'sand_crystal_salve',name:'Sand Crystal Salve',icon:'💎',ingr:['wet_sand_crystal','crystal_salt'],xp:60,unlock:3,dc:13,stat:'tec',
    desc:'Ground sand crystals form a protective salve against desert heat and abrasion.'},
  {id:'dust_shield_potion',name:'Dust Shield Potion',icon:'💨',ingr:['dust_amber','scorchroot'],xp:50,unlock:2,dc:11,stat:'dis',
    desc:'Coating the skin with this potion repels dust and sand. Essential during dust season.'},
  {id:'sandstorm_brew',name:'Sandstorm Brew',icon:'🌪️',ingr:['dust_amber','obsidian_shard','dustite'],xp:70,unlock:4,dc:14,stat:'tec',
    desc:'Infused with the fury of the sandstorms. Grants resistance to wind and abrasion.'},
];
// Enchantment categories: weapon, armor, other (jewelry/clothing/accessories)
var ENCHANTMENTS=[
  // WEAPON enchantments
  {id:'e_flame',name:'Flame Tongue',icon:'🔥',cat:'weapon',ingr:['embervein','volcanic_essence'],xp:60,dc:12,desc:'Channels volcanic heat through the blade, wreathing it in living flame.'},
  {id:'e_sharp',name:'Keen Edge',icon:'⚔️',cat:'weapon',ingr:['ashite','ironroot_bark'],xp:50,dc:10,desc:'Mineral resonance keeps the edge perpetually honed to razor sharpness.'},
  {id:'e_venom',name:'Venomcoat',icon:'🐍',cat:'weapon',ingr:['spore_dust','gloomcap'],xp:55,dc:11,desc:'A fungal toxin that coats the blade, weakening foes on contact.'},
  {id:'e_thunder',name:'Thunderstrike',icon:'⚡',cat:'weapon',ingr:['crystal_shard','embervein'],xp:70,dc:14,desc:'Crystal resonance channels lightning through each blow.'},
  {id:'e_deep',name:'Deepsteel Hone',icon:'⬛',cat:'weapon',ingr:['deep_iron','magma_salt'],xp:75,dc:15,desc:'Deep mine iron infused with volcanic heat — cuts through anything.'},
  {id:'e_holy',name:'Holy Smite',icon:'✝️',cat:'weapon',ingr:['sacred_ember','starwort'],xp:90,dc:15,faction:'hearthkeepers',fReq:3,desc:'The Hearthkeepers\' sacred flame burns corruption on contact.'},
  // ARMOR enchantments
  {id:'e_frost',name:'Frost Ward',icon:'❄️',cat:'armor',ingr:['moonpetal','hearthstone'],xp:55,dc:11,desc:'Moonlight crystallizes into a protective frost barrier on contact.'},
  {id:'e_shield',name:'Shielding Rune',icon:'🛡️',cat:'armor',ingr:['hearthstone','ironroot_bark','warden_sigil'],xp:100,dc:16,faction:'ashwardens',fReq:4,desc:'Ancient Ashwarden runes form a barrier that absorbs blows.'},
  {id:'e_ironbark',name:'Ironbark Shell',icon:'🪵',cat:'armor',ingr:['ironwood_sap','thornvine'],xp:50,dc:10,desc:'Living wood fibers reinforce the armor, hardening on impact.'},
  {id:'e_spelldrinker',name:'Spelldrinker',icon:'🟣',cat:'armor',ingr:['nightdew','veil_shard'],xp:85,dc:15,faction:'veilwalkers',fReq:3,desc:'Veilwalker runes absorb hostile magic and convert it to protection.'},
  {id:'e_forge',name:'Forgeblessed',icon:'🔶',cat:'armor',ingr:['forge_scale','primordial_ash'],xp:100,dc:18,desc:'Heartforge energy makes the armor nearly indestructible.'},
  // OTHER enchantments (rings, cloaks, accessories)
  {id:'e_glow',name:'Arcane Glow',icon:'💡',cat:'other',ingr:['moonpetal','gloomcap'],xp:40,dc:9,desc:'A soft luminescence that reveals hidden things and never fades.'},
  {id:'e_nightsight',name:'Nightsight',icon:'👁️',cat:'other',ingr:['cave_lichen','nightdew'],xp:50,dc:11,desc:'Grants perfect vision in total darkness. Popular with miners and scouts.'},
  {id:'e_feather',name:'Featherfall',icon:'🪶',cat:'other',ingr:['lunar_moss','ash_salt'],xp:45,dc:10,desc:'The wearer drifts like a feather when falling. Saves lives in the mines.'},
  {id:'e_beast',name:'Beastward',icon:'🐺',cat:'other',ingr:['cinder_moss','sulfur_bloom'],xp:55,dc:12,desc:'Emits a scent that repels ash drakes and cave creatures.'},
  {id:'e_shadow',name:'Shadowcloak',icon:'🌑',cat:'other',ingr:['shadow_quartz','lunar_moss'],xp:70,dc:14,desc:'Bends light around the wearer, granting near-invisibility in dim light.'},
  {id:'e_fortune',name:'Fortune\'s Favor',icon:'🍀',cat:'other',ingr:['starwort','crystal_shard','mineral_clay'],xp:80,dc:16,desc:'Woven luck — the wearer finds themselves consistently, improbably fortunate.'},
  // New enchantments using expanded resources
  {id:'e_rootbind',name:'Rootbind',icon:'🫚',cat:'weapon',ingr:['char_root','bark_resin'],xp:35,dc:8,desc:'Gnarled root fibers ensnare the target on impact, slowing their movement.'},
  {id:'e_amber_edge',name:'Amber Edge',icon:'🟡',cat:'weapon',ingr:['moss_amber','ironwood_sap'],xp:45,dc:10,desc:'Fossilized resin gives the blade a sticky, rending quality that tears at armor.'},
  {id:'e_echo_strike',name:'Echo Strike',icon:'🔊',cat:'weapon',ingr:['echo_stone','resonance_ore'],xp:75,dc:14,desc:'Each blow reverberates with sonic force, stunning the target momentarily.'},
  {id:'e_phoenix_brand',name:'Phoenix Brand',icon:'🔥',cat:'weapon',ingr:['phoenix_ash','obsidian_flake'],xp:95,dc:17,desc:'The blade burns with immortal fire. Wounds it inflicts cannot be magically healed.'},
  {id:'e_biolumen',name:'Biolumen Coat',icon:'💚',cat:'armor',ingr:['biolumen_gel','mycelium_thread'],xp:40,dc:9,desc:'Living fungal coating that repairs minor damage overnight and glows softly.'},
  {id:'e_geode',name:'Geode Shell',icon:'🔹',cat:'armor',ingr:['geode_dust','mineral_clay'],xp:55,dc:12,desc:'Crystalline minerals fuse with the armor surface, deflecting blunt force.'},
  {id:'e_thermal',name:'Heatward',icon:'🟠',cat:'armor',ingr:['thermal_clay','obsidian_flake'],xp:65,dc:13,desc:'Volcanic clay absorbs fire and redirects heat away from the wearer.'},
  {id:'e_dark_ward',name:'Deepward',icon:'⬛',cat:'armor',ingr:['dark_amber','echo_stone','deep_iron'],xp:85,dc:16,desc:'Ancient mine wards carved from deep materials. Repels creatures of the dark.'},
  {id:'e_windwalk',name:'Windwalker',icon:'💨',cat:'other',ingr:['wind_dust','char_root'],xp:30,dc:7,desc:'The wearer moves silently as the wind across ash plains.'},
  {id:'e_mycelium',name:'Mycelium Bond',icon:'🧵',cat:'other',ingr:['mycelium_thread','cave_lichen'],xp:45,dc:10,desc:'Fungal threads form a living bandage, slowly healing the wearer over time.'},
  {id:'e_moonmist',name:'Moonmist Veil',icon:'🌙',cat:'other',ingr:['dew_crystal','lunar_moss'],xp:65,dc:13,desc:'A shimmering veil of moonlight that deflects scrying and magical detection.'},
  {id:'e_runespark',name:'Runespark Array',icon:'✨',cat:'other',ingr:['runespark','phoenix_ash','starwort'],xp:100,dc:18,desc:'A constellation of living runes that amplify ALL enchantments on the wearer.'},
  // Wave 2 enchantments
  {id:'e_copper',name:'Copper Bite',icon:'🟫',cat:'weapon',ingr:['copper_vein','beetle_shell'],xp:55,dc:12,desc:'Copper-treated edge that corrodes armor on contact, weakening defenses with each strike.'},
  {id:'e_pyro',name:'Pyrestone Edge',icon:'🟧',cat:'weapon',ingr:['pyrestone','lava_pearl'],xp:72,dc:14,desc:'Volcanic stone fused to the blade. Strikes leave molten scars that continue burning.'},
  {id:'e_ghost',name:'Ghost Weave',icon:'🕸️',cat:'armor',ingr:['ghost_silk','echo_fungus'],xp:45,dc:10,desc:'Cave spider silk woven with echo fungus. Partially phases the wearer when struck.'},
  {id:'e_void',name:'Void Barrier',icon:'🟪',cat:'armor',ingr:['void_salt','mithril_dust'],xp:80,dc:16,desc:'A shimmering barrier of nothingness. Magic and projectiles pass through the wearer harmlessly.'},
  {id:'e_moth',name:'Moth Charm',icon:'🦋',cat:'other',ingr:['moth_scale','dream_pollen'],xp:60,dc:13,desc:'Moonlit moth essence grants the wearer prophetic flashes — a split-second of foresight in danger.'},
  {id:'e_titan',name:'Titan\'s Mark',icon:'🦴',cat:'other',ingr:['titan_bone','heartstone_sliver'],xp:95,dc:18,desc:'Ancient power courses through the wearer. Strength and endurance far exceed mortal limits.'},

  // ═══ ASHFALL CROSSING ENCHANTMENTS ═══
  {id:'e_sandward',name:'Sand Ward',icon:'🏜️',cat:'armor',ingr:['dustite','crystal_salt'],xp:50,dc:10,desc:'Woven desert winds deflect sand and debris. Reduces environmental damage.'},
  {id:'e_heatresist',name:'Heat Resistance',icon:'🌡️',cat:'armor',ingr:['scorchroot','sunpetal'],xp:55,dc:11,desc:'Volcanic fibers insulate against extreme heat. Essential for desert expeditions.'},
  {id:'e_obsidian_edge',name:'Obsidian Edge',icon:'🖤',cat:'weapon',ingr:['obsidian_shard','scorchroot'],xp:65,dc:12,desc:'Volcanic glass fragments embedded in the blade. Devastating on first strike.'},
  {id:'e_venom_coat',name:'Venom Coating',icon:'🐍',cat:'weapon',ingr:['venomgland','brine_moss'],xp:70,dc:13,desc:'Sandworm venom seeps into wounds, weakening the target over time.'},
  {id:'e_mirage_cloak',name:'Mirage Cloak',icon:'✨',cat:'armor',ingr:['mirage_dust','sandsilk'],xp:85,dc:15,desc:'Light bends around the wearer, making them difficult to target.'},
  {id:'e_oasis_touch',name:'Oasis Touch',icon:'💧',cat:'other',ingr:['dewdrop_lily','crystal_salt'],xp:60,dc:11,desc:'The enchanted item draws moisture from the air. Prevents dehydration.'},
  {id:'e_temple_seal',name:'Temple Seal',icon:'🏛️',cat:'other',ingr:['ancient_resin','temple_gold'],xp:100,dc:17,desc:'Ancient protective magic. Wards against curses and magical effects.'},
  {id:'e_sandsilk_weave',name:'Sandsilk Weave',icon:'🕸️',cat:'armor',ingr:['sandsilk','sunpetal'],xp:75,dc:14,desc:'Impossibly light yet strong. Armor moves like cloth without sacrificing protection.'},

  // ═══ ASHFALL EXPANSION ENCHANTMENTS ═══
  {id:'e_dust_shield',name:'Dust Shield',icon:'🛡️',cat:'armor',ingr:['dustite','ashbloom'],xp:45,dc:9,desc:'Fine dust hardens into a protective shell on impact.'},
  {id:'e_scorchguard',name:'Scorchguard',icon:'🔥',cat:'armor',ingr:['scorchroot','ashite'],xp:55,dc:11,desc:'Volcanic root fibers absorb and dissipate heat.'},
  {id:'e_salt_edge',name:'Salt Edge',icon:'🧂',cat:'weapon',ingr:['crystal_salt','obsidian_shard'],xp:60,dc:12,desc:'Crystallized salt sharpens the blade and cauterizes wounds.'},
  {id:'e_brine_ward',name:'Brine Ward',icon:'💧',cat:'armor',ingr:['brine_moss','crystal_salt'],xp:50,dc:10,desc:'Salt-crusted armor resists corrosion and decay.'},
  {id:'e_silk_lining',name:'Silk Lining',icon:'🧵',cat:'armor',ingr:['sandsilk','dewdrop_lily'],xp:70,dc:13,desc:'Sandsilk inner lining absorbs shock and keeps the wearer cool.'},
  {id:'e_desert_wind',name:'Desert Wind',icon:'🌬️',cat:'weapon',ingr:['wind_dust','dustite'],xp:55,dc:11,desc:'The blade trails sand that blinds opponents.'},
  {id:'e_echo_rune',name:'Echo Rune',icon:'🔔',cat:'other',ingr:['echo_fungus','crystal_salt'],xp:60,dc:12,desc:'Sounds a magical alarm when danger approaches.'},
  {id:'e_dream_ward',name:'Dream Ward',icon:'💭',cat:'other',ingr:['dream_pollen','moonpetal'],xp:65,dc:13,desc:'Protects the wearer from mental intrusion and nightmares.'},
  {id:'e_volcanic_brand',name:'Volcanic Brand',icon:'🌋',cat:'weapon',ingr:['volcanic_essence','obsidian_shard'],xp:80,dc:15,desc:'The weapon glows with inner heat, searing on contact.'},
  {id:'e_mirage_step',name:'Mirage Step',icon:'✨',cat:'other',ingr:['mirage_dust','dustite'],xp:75,dc:14,desc:'Footsteps leave illusory duplicates, confusing pursuers.'},
  {id:'e_deep_crystal',name:'Deep Crystal Focus',icon:'💠',cat:'other',ingr:['deep_crystal','crystal_salt'],xp:90,dc:16,desc:'Amplifies magical resonance. Spells cast through it hit harder.'},
  {id:'e_resin_coat',name:'Ancient Resin Coat',icon:'🪵',cat:'armor',ingr:['ancient_resin','sandsilk'],xp:85,dc:15,desc:'Fossilized resin creates an amber-like protective layer.'},
  // ═══ CARTOGRAPHER HIDDEN INGREDIENT ENCHANTMENTS ═══
  {id:'e_prismatic',name:'Prismatic Edge',icon:'🌈',cat:'weapon',ingr:['prismatic_ash','thermal_bloom'],xp:95,dc:16,desc:'Refracts light along the blade — strikes shimmer with disorienting color. Cartographer-exclusive.'},
  {id:'e_canopy_ward',name:'Canopy Ward',icon:'🍃',cat:'armor',ingr:['canopy_moss','sky_amber'],xp:90,dc:15,desc:'Armor wrapped in sky-moss grows lighter and deflects arrows. Cartographer-exclusive.'},
  {id:'e_deep_pearl',name:'Abyssal Luster',icon:'🫧',cat:'other',ingr:['deep_pearl','crystal_mycelium'],xp:95,dc:16,desc:'Jewelry polished with cave pearl. The wearer sees clearly in total darkness. Cartographer-exclusive.'},
  {id:'e_harmonic',name:'Harmonic Resonance',icon:'🔔',cat:'weapon',ingr:['harmonic_crystal','resonance_dust'],xp:100,dc:17,desc:'The weapon vibrates at frequencies that shatter wards and barriers. Cartographer-exclusive.'},
  {id:'e_moonlight',name:'Moonlight Shroud',icon:'🌙',cat:'armor',ingr:['liquid_moonlight','silver_lotus'],xp:100,dc:17,desc:'Armor draped in liquid moonlight. The wearer becomes harder to see at night. Cartographer-exclusive.'},
  {id:'e_magma_core',name:'Magma Core',icon:'🔥',cat:'weapon',ingr:['magma_diamond','living_ember'],xp:110,dc:18,desc:'A diamond of liquid fire set into the weapon. Burns hotter than dragonfire. Cartographer-exclusive.'},
  {id:'e_mithril_thread',name:'Mithril Threading',icon:'⚪',cat:'armor',ingr:['deep_mithril','shadow_ore'],xp:110,dc:18,desc:'Mithril woven through every seam. Lighter than silk, stronger than steel. Cartographer-exclusive.'},
  {id:'e_primordial',name:'Primordial Inscription',icon:'⚡',cat:'other',ingr:['primordial_spark','forge_heart_shard'],xp:150,dc:20,desc:'The rune language of creation itself. The ultimate enchantment. Cartographer-exclusive.'},
  // ═══ ASHFALL CARTOGRAPHER HIDDEN INGREDIENT ENCHANTMENTS ═══
  {id:'e_oasis_bloom',name:'Oasis Bloom',icon:'🌵',cat:'other',ingr:['desert_bloom','sunpetal'],xp:85,dc:14,desc:'Jewelry blooms with desert flowers. The wearer radiates charisma. Cartographer-exclusive.'},
  {id:'e_singing_edge',name:'Singing Edge',icon:'🎵',cat:'weapon',ingr:['singing_salt','crystal_salt'],xp:90,dc:15,desc:'The blade hums at a frequency that disrupts magical shields. Cartographer-exclusive.'},
  {id:'e_glass_guard',name:'Glass Guard',icon:'🖤',cat:'armor',ingr:['glass_bloom','obsidian_shard'],xp:95,dc:16,desc:'Obsidian glass fragments embedded in armor shatter on impact, cutting attackers. Cartographer-exclusive.'},
  {id:'e_queen_weave',name:'Queen\'s Weave',icon:'👑',cat:'armor',ingr:['queen_silk','venomgland'],xp:100,dc:17,desc:'Sandworm queen silk woven into armor. Lighter, stronger, and mildly venomous. Cartographer-exclusive.'},
  {id:'e_moonwell',name:'Moonwell Blessing',icon:'🌙',cat:'other',ingr:['moonwell_water','dewdrop_lily'],xp:100,dc:17,desc:'Starlit water consecrates the item. The wearer heals slowly in moonlight. Cartographer-exclusive.'},
  {id:'e_dragon_brand',name:'Dragon Brand',icon:'🐉',cat:'weapon',ingr:['dragon_ash','living_ember'],xp:115,dc:18,desc:'Branded with primordial dragonfire. The weapon cannot be quenched. Cartographer-exclusive.'},
  {id:'e_spirit_veil',name:'Spirit Veil',icon:'👻',cat:'armor',ingr:['spirit_essence','mirage_dust'],xp:110,dc:18,desc:'Armor phases between real and mirage. Attacks sometimes pass through. Cartographer-exclusive.'},
  {id:'e_vault_seal',name:'Vault Seal',icon:'🏆',cat:'other',ingr:['vault_gold','ancient_resin'],xp:155,dc:20,desc:'The seal of the Buried Temple. The ultimate Ashfall enchantment. Cartographer-exclusive.'},
];
// ═══ LOCATIONS ═══
var LOCATIONS={
  cindervale:{id:'cindervale',name:'Cindervale',icon:'🔥',desc:'A quiet mountain village built atop the ancient Heartforge. Rich forests and deep caves surround you.',
    startGold:15,startInv:{ashbloom:3,hearthstone:1,embercap:1},startRecipes:['healing_salve'],
    bgColor:'#1a2a1a',themeAccent:'#d4a420',
    intro:'You arrive in Cindervale with little more than a pack and a dream. The workshop is dusty, the shelves are bare, and the villagers eye you with cautious hope. Time to prove yourself.'},
  ashfall:{id:'ashfall',name:'Ashfall Crossing',icon:'☀️',desc:'A bustling desert trading post at the crossroads of three caravan routes. Harsh terrain, fierce competition, but unmatched trade access.',
    startGold:25,startInv:{sunpetal:3,crystal_salt:2,dustite:1},startRecipes:['sunstroke_tonic'],
    bgColor:'#2a1a0a',themeAccent:'#c0a040',
    intro:'The Crossing hits you like a wall of heat. Merchants haggle, camels bray, and the smell of spice and sand fills the air. Your mentor\'s name opens a few doors — but out here, reputation is earned daily.'},
};

// ═══ RELICS (Antiquarian) ═══
var RELIC_CATS=[
  {id:'pottery',name:'Pottery',icon:'🏺',set:'Hearth Collection',
    names:{common:['Cracked Bowl','Clay Shard','Simple Jug'],uncommon:['Glazed Ritual Bowl','Painted Urn','Fired Censer'],rare:['Ancient Amphora','Ceremonial Chalice','Oracle Vessel'],legendary:['Heartforge Crucible','Primordial Kiln Fragment']}},
  {id:'tablets',name:'Tablets',icon:'📜',set:'Lore Collection',
    names:{common:['Scratched Stone','Worn Tablet','Faded Parchment'],uncommon:['Runic Fragment','Inscription Stone','Sealed Scroll'],rare:['Cipher Tablet','Prophecy Scroll','Arcane Codex Page'],legendary:['Heartforge Blueprint','Primordial Rune Slab']}},
  {id:'jewelry',name:'Jewelry',icon:'💍',set:'Adornment Collection',
    names:{common:['Corroded Ring','Tarnished Bead','Bent Pin'],uncommon:['Jade Pendant','Silver Circlet','Crystal Brooch'],rare:['Enchanted Amulet','Moonstone Ring','Filigree Crown'],legendary:['Heartforge Signet','Primordial Gem']}},
  {id:'mechanisms',name:'Mechanisms',icon:'⚙️',set:'Artifice Collection',
    names:{common:['Rusty Gear','Broken Spring','Worn Cog'],uncommon:['Clockwork Piece','Arcane Lens','Precision Bearing'],rare:['Automaton Core','Enchanted Gyroscope','Harmonic Resonator'],legendary:['Heartforge Regulator','Primordial Engine']}},
  {id:'weapons',name:'Weapons',icon:'🗡️',set:'Arsenal Collection',
    names:{common:['Rusted Blade','Broken Arrowhead','Dented Shield Boss'],uncommon:['Ceremonial Dagger','Warden\'s Badge','Etched Spearhead'],rare:['Enchanted Shortsword','Captain\'s Sigil','Runic Waraxe'],legendary:['Heartforge Hammer','Primordial Blade']}},
];
var RELIC_RARITIES=['common','uncommon','rare','legendary'];
var RELIC_VALUES={common:[15,40],uncommon:[25,60],rare:[40,100],legendary:[80,200]};
var RELIC_APPRAISE_DC={common:8,uncommon:11,rare:14,legendary:17};
var RELIC_SETS={
  pottery:{name:'Hearth Collection',icon:'🏺',needed:4,bonus:{customerBonus:1,sellBonus:0.05},desc:'+1 daily customer, +5% sell prices'},
  tablets:{name:'Lore Collection',icon:'📜',needed:4,bonus:{researchBonus:2,xpMultiplier:0.10},desc:'+2 research, +10% XP'},
  jewelry:{name:'Adornment Collection',icon:'💍',needed:4,bonus:{bonusEnergyPerDay:1,repGainBonus:5},desc:'+1 Energy/day, +5 rep per quest'},
  mechanisms:{name:'Artifice Collection',icon:'⚙️',needed:4,bonus:{enchantBonus:1},desc:'+1 enchant bonus'},
  weapons:{name:'Arsenal Collection',icon:'🗡️',needed:4,bonus:{extractionBonus:2},desc:'+2 extraction'},
};
var generateRelic=(regionDiff,regionName)=>{
  const cat=RELIC_CATS[Math.floor(Math.random()*RELIC_CATS.length)];
  let rarity;
  const roll=Math.random();
  if(regionDiff>=5)rarity=roll<0.3?'legendary':roll<0.7?'rare':'uncommon';
  else if(regionDiff>=3)rarity=roll<0.05?'legendary':roll<0.35?'rare':roll<0.7?'uncommon':'common';
  else rarity=roll<0.3?'uncommon':'common';
  const names=cat.names[rarity]||cat.names.common;
  const name=names[Math.floor(Math.random()*names.length)];
  const [minV,maxV]=RELIC_VALUES[rarity];
  const value=minV+Math.floor(Math.random()*(maxV-minV+1));
  return{id:'relic_'+Date.now()+'_'+Math.random().toString(36).slice(2,6),category:cat.id,rarity,name,value,appraised:false,displayed:false,region:regionName};
};

// ═══ EXTERNAL THREATS ═══
var THREAT_FACTIONS={
  reavers:{id:'reavers',name:'Ashland Reavers',icon:'🏴',color:'#cc4444',
    desc:'Bandits preying on trade routes and foraging expeditions.',
    penalties:{
      rising:{expDangerMult:1.10,staffYieldMult:0.90},
      dangerous:{expDangerMult:1.25,staffYieldMult:0.75,shelfTheftChance:0.10},
      critical:{expDangerMult:1.40,staffYieldMult:0.60,shelfTheftChance:0.20},
    }},
  blight:{id:'blight',name:'The Blight',icon:'🦠',color:'#60a040',
    desc:'Creeping fungal corruption from the deep caves.',
    penalties:{
      rising:{spoilMult:1.25},
      dangerous:{spoilMult:1.50,contaminateChance:0.10},
      critical:{spoilMult:2.0,contaminateChance:0.20,ingrLossChance:0.10},
    }},
  veilbreakers:{id:'veilbreakers',name:'Veilbreakers',icon:'💜',color:'#9060c0',
    desc:'Rogue mages destabilizing the magical fabric around Cindervale.',
    penalties:{
      rising:{enchDCBonus:1,discoveryMult:0.95},
      dangerous:{enchDCBonus:2,discoveryMult:0.85,enchPayMult:0.85},
      critical:{enchDCBonus:3,discoveryMult:0.75,enchPayMult:0.75,custDropChance:0.10},
    }},
};
var getThreatTier=(val)=>val>=75?'critical':val>=50?'dangerous':val>=25?'rising':'calm';
var getThreatColor=(val)=>val>=75?'#cc2020':val>=50?'#d08020':val>=25?'#c0c020':'#40a040';
var getThreatLabel=(val)=>val>=75?'Critical':val>=50?'Dangerous':val>=25?'Rising':'Calm';
var THREAT_IDS=['reavers','blight','veilbreakers'];
var FORTRESS_TYPES={
  reaver_watchtower:{id:'reaver_watchtower',name:'Reaver Watchtower',icon:'🏰',threat:'reavers',cap:50,cost:200,desc:'Permanently caps Reaver threat at 50.'},
  blight_purifier:{id:'blight_purifier',name:'Blight Purifier',icon:'🧪',threat:'blight',cap:50,cost:200,desc:'Permanently caps Blight threat at 50.'},
  veil_anchor:{id:'veil_anchor',name:'Veil Anchor',icon:'⚓',threat:'veilbreakers',cap:50,cost:200,desc:'Permanently caps Veilbreaker threat at 50.'},
};

// ═══ SEASONS ═══
var SEASON_LENGTH=7; // days per season
var GOLD_MULT=0.5; // Global gold economy multiplier — applies to all income sources
var SEASONS={
  cindervale:[
    {id:'spring',name:'Spring',img:'https://jumppiejim-creator.github.io/cindervale-alchemist/season-spring.png',icon:'🌱',color:'#60c060',
      desc:'Renewal season. Flora ingredients bloom across the Ashfields and Ironwood.',
      yieldMod:1,floraYieldBonus:1,travelMod:0,customerMod:0,spoilMod:0,dangerMod:0,
      threatMod:{blight:-1},moraleMod:0,
      flavor:['Fresh shoots push through the ash. The air smells of rain and renewal.','Birdsong fills the Ironwood canopy. A good season for gathering.','The ashbloom carpets entire hillsides in pale green.']},
    {id:'summer',name:'Summer',img:'https://jumppiejim-creator.github.io/cindervale-alchemist/season-summer.png',icon:'☀️',color:'#d0a030',
      desc:'Peak season. Best weather, most customers, but Reavers raid more aggressively.',
      yieldMod:0,floraYieldBonus:0,travelMod:0,customerMod:1,spoilMod:0,dangerMod:0,
      threatMod:{reavers:1},moraleMod:0,
      flavor:['Long hot days under a copper sky. The village hums with activity.','Caravans arrive daily. Trade is booming.','The volcanic vents shimmer in the summer heat.']},
    {id:'autumn',name:'Autumn',img:'https://jumppiejim-creator.github.io/cindervale-alchemist/season-autumn.png',icon:'🍂',color:'#c08030',
      desc:'Harvest pressure. Spoilage worsens but quest rewards increase. Unique autumn ingredients appear.',
      yieldMod:0,floraYieldBonus:0,travelMod:0,customerMod:0,spoilMod:-2,dangerMod:0,
      threatMod:{},moraleMod:0,questGoldMod:0.25,
      flavor:['Amber leaves drift across the workshop roof. Time to stockpile.','The air carries the smell of wood smoke and dried herbs.','Frost edges the morning puddles. Winter approaches.']},
    {id:'winter',name:'Winter',img:'https://jumppiejim-creator.github.io/cindervale-alchemist/season-winter.png',icon:'❄️',color:'#6090c0',
      desc:'Survival. High-diff regions cost more Energy. Yields drop. Veilbreakers peak. Unique winter ingredients.',
      yieldMod:-1,floraYieldBonus:0,travelMod:1,travelMinDiff:4,customerMod:0,spoilMod:0,dangerMod:5,
      threatMod:{veilbreakers:1},moraleMod:-5,
      flavor:['Snow dusts the ash fields. The Heartforge rim glows warmer than ever.','Ice crystals form on the workshop windows. A hard season for foraging.','The village draws together around the hearths. Cindervale endures.']},
  ],
  ashfall:[
    {id:'cool',name:'Cool Season',img:'https://jumppiejim-creator.github.io/cindervale-alchemist/season-cool.png',icon:'🌙',color:'#6090c0',
      desc:'Best travel conditions. Caravans run fast. Trade flourishes.',
      yieldMod:0,floraYieldBonus:0,travelMod:-1,customerMod:1,spoilMod:0,dangerMod:-5,
      threatMod:{},moraleMod:0,
      flavor:['Cool desert nights make the days bearable. Caravans roll freely.','The stars blaze overhead. Perfect weather for the Crossing.','A welcome respite from the heat. The bazaar overflows with travelers.']},
    {id:'bloom',name:'Bloom Season',img:'https://jumppiejim-creator.github.io/cindervale-alchemist/season-bloom.png',icon:'🌺',color:'#60c060',
      desc:'Rare desert rains. Oasis and Sunscorch yields surge. Sandworms surface.',
      yieldMod:0,floraYieldBonus:2,travelMod:0,customerMod:0,spoilMod:0,dangerMod:5,
      threatMod:{},moraleMod:0,
      flavor:['Rain! Actual rain! The desert transforms overnight into a carpet of flowers.','Puddles form in the dunes. Desert creatures emerge to drink.','The oasis overflows its banks. Herbs grow wild along the waterline.']},
    {id:'scorching',name:'Scorching Season',img:'https://jumppiejim-creator.github.io/cindervale-alchemist/season-scorching.png',icon:'🔥',color:'#d06030',
      desc:'Extreme heat. Surface regions cost more. Underground regions thrive. Reavers raid.',
      yieldMod:0,floraYieldBonus:0,travelMod:1,travelMinDiff:3,customerMod:0,spoilMod:-1,dangerMod:5,
      threatMod:{reavers:1},moraleMod:-3,
      flavor:['The sand burns through boot leather. Only fools travel at midday.','Heat mirages dance on the horizon. The Molten Vents feel almost cool by comparison.','The Flamekeepers stoke the sacred fire higher. It barely competes with the sun.']},
    {id:'dust',name:'Dust Season',img:'https://jumppiejim-creator.github.io/cindervale-alchemist/season-dust.png',icon:'💨',color:'#a08040',
      desc:'Constant sandstorms. All expeditions more dangerous. Spoilage worsens. Mirage Bazaar thrives.',
      yieldMod:0,floraYieldBonus:0,travelMod:0,customerMod:0,spoilMod:-2,dangerMod:15,
      threatMod:{veilbreakers:1},moraleMod:0,
      flavor:['The wind never stops. Sand finds its way into everything.','Dust clouds blot out the sun for hours at a time.','The Dustwalkers tie ropes between buildings. Visibility is measured in arm lengths.']},
  ],
};
var getSeason=(day,loc)=>{const seasons=SEASONS[loc||'cindervale']||SEASONS.cindervale;var idx=Math.floor(((day-1)%28)/SEASON_LENGTH);return seasons[idx]||seasons[0];};
// Seasonal ingredients
INGR.frostbloom={id:'frostbloom',name:'Frostbloom',icon:'❄️',val:14,desc:'Delicate ice flower that only blooms in winter cold.'};
INGR.ice_crystal={id:'ice_crystal',name:'Ice Crystal',icon:'🧊',val:16,desc:'Naturally formed crystal of pure frozen water with alchemical resonance.'};
INGR.amber_leaf={id:'amber_leaf',name:'Amber Leaf',icon:'🍂',val:12,desc:'Autumn leaf that crystallizes into an alchemically active amber.'};
INGR.harvest_root={id:'harvest_root',name:'Harvest Root',icon:'🥕',val:10,desc:'Deep taproots exposed by autumn frost. Rich in concentrated nutrients.'};
INGR.spring_dewdrop={id:'spring_dewdrop',name:'Spring Dewdrop',icon:'💧',val:11,desc:'Morning dew collected during the first spring rains. Magically potent.'};
INGR.desert_rain_lily={id:'desert_rain_lily',name:'Desert Rain Lily',icon:'🌺',val:14,desc:'Extraordinarily rare lily that only blooms during desert rains.'};
INGR.wet_sand_crystal={id:'wet_sand_crystal',name:'Wet Sand Crystal',icon:'💎',val:16,desc:'Sand crystal formed by rapid evaporation of rare desert rain.'};
INGR.dust_amber={id:'dust_amber',name:'Dust Amber',icon:'💨',val:12,desc:'Amber-like resin formed from compressed dust during sandstorms.'};
// Seasonal ingredient availability function
var getSeasonalIngr=(season,loc)=>{
  if(loc==='cindervale'){
    if(season.id==='winter')return['frostbloom','ice_crystal'];
    if(season.id==='autumn')return['amber_leaf','harvest_root'];
    if(season.id==='spring')return['spring_dewdrop'];
  }
  if(loc==='ashfall'){
    if(season.id==='bloom')return['desert_rain_lily','wet_sand_crystal'];
    if(season.id==='dust')return['dust_amber'];
  }
  return[];
};

// ═══ BRANDS (Brand Master) ═══
var BRAND_LEVELS=[
  {name:'New',icon:'🏷️',minSold:0,sellBonus:0.10,repeatCust:0},
  {name:'Known',icon:'⭐',minSold:15,sellBonus:0.25,repeatCust:1},
  {name:'Popular',icon:'⭐⭐',minSold:40,sellBonus:0.40,repeatCust:2},
  {name:'Famous',icon:'⭐⭐⭐',minSold:80,sellBonus:0.60,repeatCust:3},
];
var getBrandLevel=(sold)=>{let lv=0;for(let i=0;i<BRAND_LEVELS.length;i++)if(sold>=BRAND_LEVELS[i].minSold)lv=i;return lv;};
var BRAND_ICONS=['🏷️','🛡️','⚗️','🌿','💎','🔥','⭐','🌙','❤️','⚡','👑','🎯'];

// ═══ INFUSIONS (Spellbrewer) ═══
var INFUSIONS={
  vigor:{id:'vigor',name:'Vigor',icon:'🔴',color:'#c04040',dcMod:2,suffix:'_iv',unlockLv:1,
    desc:'+1 Energy next morning',sellMult:1.2},
  clarity:{id:'clarity',name:'Clarity',icon:'🔵',color:'#4060c0',dcMod:2,suffix:'_ic',unlockLv:1,
    desc:'+2 next craft/enchant check',sellMult:1.2},
  fortify:{id:'fortify',name:'Fortify',icon:'🟢',color:'#40a040',dcMod:3,suffix:'_if',unlockLv:2,
    desc:'-1 expedition injury severity 2 days',sellMult:1.3},
  prosperity:{id:'prosperity',name:'Prosperity',icon:'🟡',color:'#c0a020',dcMod:3,suffix:'_ip',unlockLv:3,
    desc:'+50% sell price',sellMult:1.5},
  lingering:{id:'lingering',name:'Lingering',icon:'🟣',color:'#8040c0',dcMod:4,suffix:'_il',unlockLv:4,
    desc:'Elixir buff +1 day duration',sellMult:1.3},
};
var INFUSION_SUFFIXES=Object.values(INFUSIONS).map(inf=>inf.suffix);
var getInfusion=(potId)=>{for(const inf of Object.values(INFUSIONS)){if(potId.includes(inf.suffix))return inf.id;}return null;};
var stripInfusion=(potId)=>{let id=potId;for(const s of INFUSION_SUFFIXES)id=id.replace(s,'');return id;};
var potDisplayName=(potId)=>{
  const baseId=getBaseRecipeId(potId);
  const r=RECIPES.find(x=>x.id===baseId);if(!r)return potId;
  const pq=getPotQuality(stripInfusion(potId));var qT=QUALITY[pq]||QUALITY.std;
  const infId=getInfusion(potId);var inf=infId?INFUSIONS[infId]:null;
  return r.icon+(inf?inf.icon:'')+r.name+(qT.icon?' '+qT.icon:'')+(inf?' ['+inf.name+']':'');
};

// ═══ QUALITY TIERS ═══
var QUALITY={
  std:{id:'std',name:'Standard',icon:'',color:'#aaaaaa',dcMod:0,sellMult:1,xpMult:1,extraIngr:0},
  fine:{id:'fine',name:'Fine',icon:'★',color:'#50c070',dcMod:3,sellMult:1.5,xpMult:1.5,extraIngr:1},
  mw:{id:'mw',name:'Masterwork',icon:'★★',color:'#d4a420',dcMod:6,sellMult:3,xpMult:2.5,extraIngr:2},
  gm:{id:'gm',name:'Grandmaster',icon:'★★★',color:'#c050e0',dcMod:10,sellMult:5,xpMult:4,extraIngr:3},
};
var getBaseRecipeId=(potId)=>{let id=potId.replace(/_fresh/,'');for(const s of INFUSION_SUFFIXES)id=id.replace(s,'');return id.replace(/_[FMG]$/,'');};
var getPotQuality=(potId)=>{const stripped=stripInfusion(potId);return stripped.endsWith('_G')?'gm':stripped.endsWith('_M')?'mw':stripped.endsWith('_F')?'fine':'std';};
var qualPotId=(recipeId,q)=>q==='fine'?recipeId+'_F':q==='mw'?recipeId+'_M':q==='gm'?recipeId+'_G':recipeId;
var getMasteryDiscount=(brewCounts,recipeId)=>{const bc=brewCounts[recipeId]||0;return bc>=25?2:bc>=10?1:0;};

// Spoilage color coding for inventory display
var getSpoilColor=(qty,threshold)=>qty>16?'#c04040':qty>12?'#d08030':qty>8?'#c0a040':'';
var getSpoilLabel=(qty,threshold)=>qty>threshold+8?'Spoils imminent':qty>threshold+4?'Spoilage likely':qty>threshold?'Getting full':'';

var ENCH_CATS={weapon:{name:'Weapon',icon:'⚔️'},armor:{name:'Armor',icon:'🛡️'},other:{name:'Accessory',icon:'💍'}};
var CUST_ITEMS=[
  {name:'Iron Sword',icon:'⚔️',tier:1,cat:'weapon'},{name:'Steel Axe',icon:'🪓',tier:2,cat:'weapon'},{name:'Warhammer',icon:'🔨',tier:3,cat:'weapon'},{name:'Hunting Bow',icon:'🏹',tier:1,cat:'weapon'},{name:'Mithril Blade',icon:'🗡️',tier:3,cat:'weapon'},
  {name:'Leather Armor',icon:'🦺',tier:1,cat:'armor'},{name:'Chain Mail',icon:'⛓️',tier:2,cat:'armor'},{name:'Shield',icon:'🛡️',tier:1,cat:'armor'},{name:'Mithril Plate',icon:'🛡️',tier:3,cat:'armor'},{name:'Brigandine',icon:'🧥',tier:2,cat:'armor'},
  {name:'Silver Ring',icon:'💍',tier:2,cat:'other'},{name:'Traveler\'s Cloak',icon:'🧣',tier:1,cat:'other'},{name:'Pendant',icon:'📿',tier:1,cat:'other'},{name:'Jeweled Circlet',icon:'👑',tier:3,cat:'other'},{name:'Leather Boots',icon:'👢',tier:1,cat:'other'},
];
var CUST_DATA={
  'Thorek':{title:'Cinderfolk Miner',portrait:{bg:['#555','#333'],ring:'#aa8866'},lines:['"This pick has seen better days. Can you make it bite deeper?"','"The deep veins don\'t yield to dull steel."','"My grandfather carried this. Treat it well."']},
  'Fiona':{title:'Traveling Merchant',portrait:{bg:['#4a3060','#2a1840'],ring:'#c090e0'},lines:['"I\'ve heard Cindervale enchantments fetch top coin in the capital."','"Something eye-catching, if you please — my customers love a good glow."','"Make it memorable. I have a reputation to uphold."']},
  'Barret':{title:'Ashwarden Scout',portrait:{bg:['#5c2020','#3a1515'],ring:'#cc5544'},lines:['"Vents are getting worse. I need every edge I can get."','"Don\'t need it fancy — just need it to keep me alive."','"Lost two blades this season already. Make this one last."']},
  'Mama Grinn':{title:'Tavern Keeper',portrait:{bg:['#704020','#4a2a15'],ring:'#e88840'},portrait:{bg:['#704020','#4a2a15'],ring:'#e88840',accent:'#e88840'},
    lines:['"Don\'t ask why I need a enchanted cleaver. Just do it."','"My late husband always said a good blade needs good magic."','"I\'ll pay fair, and throw in a meal besides."']},
  'Jax':{title:'Young Apprentice',portrait:{bg:['#2a4060','#1a2a40'],ring:'#6090c0'},lines:['"I saved up for weeks for this! Please be careful with it."','"My master says only Cindervale enchanters are worth the coin."','"Will it really glow? That would be so incredible!"']},
  'Sister Venna':{title:'Hearthkeeper Priestess',portrait:{bg:['#704020','#4a2a15'],ring:'#e88840'},lines:['"The sacred flame asks much of those who carry it."','"Bless this steel, enchanter. The wards along the eastern road are failing."','"I trust your craft. The Hearthkeepers remember Cindervale\'s legacy."']},
  'Rorik':{title:'Retired Soldier',portrait:{bg:['#444','#2a2a2a'],ring:'#888'},lines:['"One more fight in this old blade, that\'s all I ask."','"Enchantments weren\'t around in my day. Interesting times."','"Steady hands, steady work. I can respect that."']},
  'Anya':{title:'Herbalist',portrait:{bg:['#3a5530','#243820'],ring:'#7aaa60'},lines:['"Even gatherers need protection in the wilds these days."','"I brought moonpetals as thanks — oh, you probably have plenty."','"The glade creatures are getting bolder. I need something with teeth."']},
  'Gorrik':{title:'Cinderfolk Foreman',portrait:{bg:['#555','#333'],ring:'#aa8866'},lines:['"Regulation says all deep-mine gear gets enchanted now."','"After what happened in Shaft Nine, we\'re not taking chances."','"Strong and practical. That\'s all the lads need."']},
  'Sera':{title:'Veilwalker Adept',portrait:{bg:['#2d2450','#1a1535'],ring:'#7b68c4'},lines:['"The Veil thins near the Heartforge. Mundane steel won\'t suffice."','"I sense potential in your workshop. The old magic lingers here."','"Careful with arcane resonance — I\'ll know if you cut corners."']},
};
var CUST_NAMES=Object.keys(CUST_DATA);

// ═══ APOTHECARY CLINIC SYSTEM ═══
var CLINIC_AILMENTS=[
  {id:'miners_cough',name:"Miner's Cough",icon:'🫁',desc:'"Been working the deep shafts... can\'t stop coughing up black dust."',
    category:'respiratory',tier:1,great:['ashveil'],good:['healing_salve','ash_poultice'],
    hints:{fail:'The symptoms are unclear.',partial:'This looks respiratory — something soothing or cleansing.',full:"Classic miner's lung. An Ashveil Tonic would clear it right up."}},
  {id:'forge_burns',name:'Forge Burns',icon:'🔥',desc:'"Splashed with molten slag yesterday. Hurts something fierce."',
    category:'injury',tier:1,great:['healing_salve'],good:['ash_poultice','bark_shield'],
    hints:{fail:'Hard to tell how deep the damage goes.',partial:'Clearly a burn injury — needs something restorative or protective.',full:'Surface burns with minor tissue damage. A Healing Salve is exactly what this needs.'}},
  {id:'venom_bite',name:'Venom Bite',icon:'🐍',desc:'"Something bit me in the Ironwood. My arm\'s gone numb and purple."',
    category:'poison',tier:1,great:['ash_poultice'],good:['healing_salve','thornbark_tonic'],
    hints:{fail:'The wound looks angry but you can\'t identify the venom.',partial:'Definitely a toxin — needs something that draws poison or neutralizes venom.',full:'Ironwood asp venom. An Ash Poultice will draw it right out.'}},
  {id:'cave_chills',name:'Cave Chills',icon:'🥶',desc:'"Spent too long in the Crystal Hollows. Can\'t get warm no matter what."',
    category:'exposure',tier:1,great:['firebrew'],good:['healing_salve','thermal_potion'],
    hints:{fail:'They\'re shivering but you\'re not sure why.',partial:'Exposure to deep cold — they need warming from the inside.',full:'Mineral cold from the Hollows. A Firebrew will thaw them to the bone.'}},
  {id:'ashlung',name:'Ashlung',icon:'💨',desc:'"The ash storms last week... now everything tastes like cinder."',
    category:'respiratory',tier:2,great:['ashveil'],good:['healing_salve','celestial_balm'],
    hints:{fail:'Respiratory distress of some kind.',partial:'Ash particle damage to the lungs. Needs a cleansing tonic.',full:'Ashlung — the Ashveil Tonic was practically invented for this.'}},
  {id:'veil_sickness',name:'Veil Sickness',icon:'🌀',desc:'"I see things... shapes at the edge of my vision. The whispers won\'t stop."',
    category:'arcane',tier:2,great:['celestial_balm'],good:['moonweave','veil_sight'],
    hints:{fail:'Something is deeply wrong but mundane medicine won\'t help.',partial:'Arcane exposure — this person needs something with celestial or lunar properties.',full:'Veil Sickness — exposure to raw magical energy. A Celestial Balm will restore their senses.'}},
  {id:'iron_rot',name:'Iron Rot',icon:'🦴',desc:'"My joints creak like old hinges. The Cinderfolk say it\'s the minerals."',
    category:'chronic',tier:2,great:['ironhide'],good:['healing_salve','geode_tonic','embersteel_oil'],
    hints:{fail:'Chronic joint condition — difficult to diagnose precisely.',partial:'Mineral buildup in the joints. Needs something fortifying or mineral-based.',full:'Iron Rot from deep mine exposure. An Ironhide Potion will reinforce the joints from within.'}},
  {id:'spore_fever',name:'Spore Fever',icon:'🍄',desc:'"Went into the Fungal Caves for mushrooms... now I\'m seeing colors and burning up."',
    category:'poison',tier:2,great:['gloom_draught'],good:['ashveil','healing_salve'],
    hints:{fail:'High fever with unusual symptoms.',partial:'Fungal toxin infection — needs something that combats spore-based ailments.',full:'Gloomcap spore fever. A Gloom Draught will neutralize the fungal toxins.'}},
  {id:'ember_madness',name:'Ember Madness',icon:'🧠',desc:'"The Heartforge calls to me in my sleep. I can feel the heat in my skull."',
    category:'arcane',tier:3,great:['celestial_balm'],good:['moonweave','silver_salve'],
    hints:{fail:'Something profoundly unnatural. You sense danger.',partial:'Deep arcane corruption — only the most potent restorative magic will help.',full:'Ember Madness — the Heartforge\'s dormant magic is leaking. Only a Celestial Balm can silence it.'}},
  {id:'phantom_limb',name:'Phantom Pain',icon:'👻',desc:'"Lost my hand in Shaft Nine. But I still feel it burning. Every night."',
    category:'chronic',tier:3,great:['celestial_balm'],good:['moonweave','silver_salve','echo_elixir'],
    hints:{fail:'The pain is real but has no physical source.',partial:'Residual nerve damage with possible arcane component. Needs powerful restoration.',full:'Phantom nerve fire — the Heartforge energy fused with the wound. A Celestial Balm can quiet the echoes.'}},
];

// ═══ VENOMIST CONTRACTS SYSTEM ═══
var VENOM_CONTRACTS=[
  {id:'vc_ash_drakes',name:'Ash Drake Nest',icon:'🐉',desc:'"The vents are crawling with drakes. We need something that burns."',
    tier:1,weakness:'fire',faction:'ashwardens',basePay:25,baseXp:40,
    ingredients:['embercap','volcanic_essence'],ingredientQty:[2,0]},
  {id:'vc_cave_spiders',name:'Cave Spider Infestation',icon:'🕷️',desc:'"The Fungal Caves are webbed shut. Miners can\'t get through."',
    tier:1,weakness:'fungal',faction:'cinderfolk',basePay:25,baseXp:40,
    ingredients:['gloomcap','embercap'],ingredientQty:[2,0]},
  {id:'vc_tunnel_rats',name:'Giant Tunnel Rats',icon:'🐀',desc:'"They\'re eating through the grain stores. Fast-acting poison needed."',
    tier:1,weakness:'quick',faction:'hearthkeepers',basePay:20,baseXp:35,
    ingredients:['ashbloom','ironroot_bark'],ingredientQty:[2,0]},
  {id:'vc_ash_wasps',name:'Ash Wasp Swarm',icon:'🐝',desc:'"A nest built in the watchtower rafters. Soldiers are getting stung daily."',
    tier:1,weakness:'smoke',faction:'ashwardens',basePay:22,baseXp:35,
    ingredients:['ashbloom','embercap'],ingredientQty:[2,0]},
  {id:'vc_veil_stalker',name:'Veil Stalker',icon:'👁️',desc:'"Something is hunting near the Moonlit Glade. It phases through wards."',
    tier:2,weakness:'arcane',faction:'veilwalkers',basePay:45,baseXp:70,
    ingredients:['moonpetal','starwort'],ingredientQty:[2,1]},
  {id:'vc_iron_wurm',name:'Iron Wurm',icon:'🪱',desc:'"A wurm in the deep mines. Regular weapons bounce off its hide."',
    tier:2,weakness:'corrosive',faction:'cinderfolk',basePay:50,baseXp:75,
    ingredients:['volcanic_essence','ashite'],ingredientQty:[1,2]},
  {id:'vc_ember_golem',name:'Rogue Ember Golem',icon:'🗿',desc:'"A Heartforge construct wandering the Rim. It\'s destroying everything."',
    tier:2,weakness:'cold',faction:'ashwardens',basePay:55,baseXp:80,
    ingredients:['moonpetal','hearthstone'],ingredientQty:[2,1]},
  {id:'vc_shadow_beast',name:'Shadow Beast',icon:'🦇',desc:'"It comes at night. We\'ve lost two patrols. Whatever it is, it fears light."',
    tier:2,weakness:'radiant',faction:'ashwardens',basePay:50,baseXp:70,
    ingredients:['starwort','hearthstone'],ingredientQty:[2,1]},
  {id:'vc_heartforge_horror',name:'Heartforge Horror',icon:'💀',desc:'"Something ancient stirred in the deep. The Wardens need your deadliest brew."',
    tier:3,weakness:'primordial',faction:'ashwardens',basePay:100,baseXp:150,
    ingredients:['volcanic_essence','deep_crystal','sacred_ember'],ingredientQty:[2,1,1]},
  {id:'vc_veil_abomination',name:'Veil Abomination',icon:'🌀',desc:'"The Veil tore open near the Glade. What came through... we need to put it down."',
    tier:3,weakness:'veil-rend',faction:'veilwalkers',basePay:110,baseXp:160,
    ingredients:['veil_shard','moonpetal','starwort'],ingredientQty:[1,2,1]},
];
var POTENCY_LEVELS=[
  {id:'standard',name:'Standard',dc:10,payMult:1,icon:'⚗️'},
  {id:'concentrated',name:'Concentrated',dc:14,payMult:2,icon:'💧'},
  {id:'lethal',name:'Lethal',dc:18,payMult:3,icon:'💀'},
  {id:'legendary',name:'Legendary',dc:22,payMult:5,icon:'☠️'},
];

// ═══ RUNESMITH WEAPON FORGING SYSTEM ═══
var FORGE_WEAPONS=[
  {id:'fw_sword',name:'Sword',icon:'⚔️',tier:1,forgeDC:10,matCost:{ironroot_bark:2,hearthstone:1},desc:'A sturdy blade ready for inscription.'},
  {id:'fw_dagger',name:'Dagger',icon:'🗡️',tier:1,forgeDC:8,matCost:{ironroot_bark:1,hearthstone:1},desc:'A swift blade — light and precise.'},
  {id:'fw_axe',name:'Axe',icon:'🪓',tier:1,forgeDC:11,matCost:{ironroot_bark:2,bark_resin:1},desc:'A heavy chopping weapon with a broad head.'},
  {id:'fw_mace',name:'Mace',icon:'🔨',tier:2,forgeDC:13,matCost:{ashite:2,hearthstone:1},desc:'A crushing weapon of hardened ore.'},
  {id:'fw_bow',name:'Bow',icon:'🏹',tier:2,forgeDC:12,matCost:{ironroot_bark:2,moonpetal:1},desc:'A recurve bow strung with alchemically-treated sinew.'},
  {id:'fw_greatsword',name:'Greatsword',icon:'⚔️',tier:2,forgeDC:15,matCost:{ashite:2,embervein:1,ironroot_bark:1},desc:'A massive two-handed blade of forge-tempered steel.'},
  {id:'fw_runic_blade',name:'Runic Blade',icon:'✨',tier:3,forgeDC:18,matCost:{embervein:2,deep_crystal:1,ashite:1},desc:'A blade forged with channels for runic energy.'},
  {id:'fw_heartforge_arm',name:'Heartforge Arm',icon:'🔥',tier:3,forgeDC:20,matCost:{volcanic_essence:2,embervein:1,hearthstone:2},desc:'A weapon infused with the Heartforge\'s dormant power.'},
];
var WEAPON_PREFIXES=['Cinder','Ash','Iron','Ember','Deep','Forge','Rune','Storm','Dawn','Dusk','Shadow','Flame','Frost','Thunder','Void','Star','Moon','Blood','Stone','Drake'];
var WEAPON_SUFFIXES=['fang','ward','bite','edge','bane','song','strike','cleaver','reaper','caller','render','keeper','guard','breaker','heart','brand','fury','wrath','maw','spike'];
var genWeaponName=()=>WEAPON_PREFIXES[Math.floor(Math.random()*WEAPON_PREFIXES.length)]+WEAPON_SUFFIXES[Math.floor(Math.random()*WEAPON_SUFFIXES.length)];

// ═══ WARDKEEPER SHIELD COMMISSIONS ═══
var SHIELD_COMMISSIONS=[
  {id:'sc_mine_patrol',name:'Mine Patrol Gear',icon:'⛏️',desc:'"My squad works Shaft Nine. We need armor that shrugs off falling rock and resists the heat."',
    tier:1,layers:['e_ironbark','e_frost'],faction:'cinderfolk',wardTarget:'reavers',baseGold:35,baseXp:40},
  {id:'sc_gate_guard',name:'Gate Guard Kit',icon:'🏰',desc:'"Standing watch all night in ash storms. I need wards against wind and fire."',
    tier:1,layers:['e_ironbark','e_shield'],faction:'ashwardens',wardTarget:'reavers',baseGold:40,baseXp:45},
  {id:'sc_pilgrim_cloak',name:'Pilgrim\'s Cloak',icon:'🧥',desc:'"The road to the shrine is dangerous. Protect me from beasts and the cold."',
    tier:1,layers:['e_beast','e_frost'],faction:'hearthkeepers',wardTarget:'blight',baseGold:32,baseXp:38},
  {id:'sc_scout_leather',name:'Scout\'s Leather',icon:'🦊',desc:'"I need to move fast and quiet, but still survive an ambush."',
    tier:2,layers:['e_feather','e_shadow','e_shield'],faction:'ashwardens',wardTarget:'reavers',baseGold:65,baseXp:70},
  {id:'sc_forge_apron',name:'Forgemaster\'s Apron',icon:'🔥',desc:'"Working near the vents. One splash of magma and I\'m done without good wards."',
    tier:2,layers:['e_ironbark','e_forge','e_shield'],faction:'cinderfolk',wardTarget:'blight',baseGold:70,baseXp:75},
  {id:'sc_veil_robe',name:'Veilwalker Robe',icon:'🌀',desc:'"The Veil tears at unprotected minds. Layer every ward you know on this."',
    tier:2,layers:['e_spelldrinker','e_shadow','e_shield'],faction:'veilwalkers',wardTarget:'veilbreakers',baseGold:75,baseXp:80},
  {id:'sc_captain_plate',name:'Captain\'s Plate',icon:'⚔️',desc:'"I lead from the front. This armor needs to stop everything — blade, fire, and magic."',
    tier:3,layers:['e_ironbark','e_forge','e_spelldrinker'],faction:'ashwardens',wardTarget:'reavers',baseGold:120,baseXp:130},
  {id:'sc_heartforge_ward',name:'Heartforge Expedition Suit',icon:'💎',desc:'"We\'re going deeper than anyone has in decades. Every layer of protection could save a life."',
    tier:3,layers:['e_ironbark','e_forge','e_spelldrinker'],faction:'veilwalkers',wardTarget:'veilbreakers',baseGold:140,baseXp:150},
  // ── Threat Ward Commissions (appear at Rising+ threat levels) ──
  {id:'sc_tw_reavers',name:'Reaver Barricade Wards',icon:'🏴',desc:'"The Reavers are at our gates. We need every barrier warded — NOW."',
    tier:2,layers:['e_ironbark','e_shield','e_beast','e_forge'],faction:'ashwardens',wardTarget:'reavers',threatReq:'reavers',baseGold:100,baseXp:120,threatReduction:12},
  {id:'sc_tw_blight',name:'Blight Purification Wards',icon:'🦠',desc:'"The Blight is spreading. Sacred wards on every well, every storehouse, every hearth."',
    tier:2,layers:['e_frost','e_spelldrinker','e_shield','e_glow'],faction:'hearthkeepers',wardTarget:'blight',threatReq:'blight',baseGold:100,baseXp:120,threatReduction:12},
  {id:'sc_tw_veilbreakers',name:'Veil Anchor Wards',icon:'💜',desc:'"Reality frays at the edges. Only layered wards can hold the Veil together."',
    tier:2,layers:['e_spelldrinker','e_shadow','e_shield','e_glow'],faction:'veilwalkers',wardTarget:'veilbreakers',threatReq:'veilbreakers',baseGold:100,baseXp:120,threatReduction:12},
  {id:'sc_tw_reavers_hard',name:'Siege Warding',icon:'🏴',desc:'"Critical threat. Every wall, every gate, every weapon needs your strongest wards. The Crossing depends on it."',
    tier:3,layers:['e_ironbark','e_shield','e_beast','e_forge','e_spelldrinker'],faction:'ashwardens',wardTarget:'reavers',threatReq:'reavers',threatMin:50,baseGold:180,baseXp:200,threatReduction:20},
  {id:'sc_tw_blight_hard',name:'Sacred Cleansing Wards',icon:'🦠',desc:'"The Blight is at Dangerous levels. We need a full purification circuit — every building, every field."',
    tier:3,layers:['e_frost','e_spelldrinker','e_shield','e_glow','e_forge'],faction:'hearthkeepers',wardTarget:'blight',threatReq:'blight',threatMin:50,baseGold:180,baseXp:200,threatReduction:20},
  {id:'sc_tw_veilbreakers_hard',name:'Grand Veil Seal',icon:'💜',desc:'"The Veil is tearing open. We need a master wardkeeper to inscribe a five-layer seal. This is existential."',
    tier:3,layers:['e_spelldrinker','e_shadow','e_shield','e_glow','e_forge'],faction:'veilwalkers',wardTarget:'veilbreakers',threatReq:'veilbreakers',threatMin:50,baseGold:180,baseXp:200,threatReduction:20},
];

// ═══ SPELLWEAVER PLANAR ATTUNEMENT ═══
var PLANAR_FOCUSES=[
  {id:'feywild',name:'Feywild',icon:'🧚',color:'#60d080',
    desc:'Enchantments shimmer with illusory beauty. Utility enchants earn more, but some enchantments fade overnight.',
    effects:{utilityGoldMult:1.3,fadeChance:0.10},
    flavor:'The air shimmers with motes of golden light. Reality feels thin, playful, alive.'},
  {id:'shadowfell',name:'Shadowfell',icon:'🌑',color:'#6040a0',
    desc:'Dark energy empowers defenses but destabilizes offensive magic.',
    effects:{defensiveBonus:2,offensiveDCPenalty:3},
    flavor:'Shadows deepen. The inscriptions drink darkness and grow stronger.'},
  {id:'elemental_chaos',name:'Elemental Chaos',icon:'🌪️',color:'#d06040',
    desc:'Raw elemental power surges through your work. Double-inscription chance rises, but failures destroy materials.',
    effects:{dualChanceBonus:0.20,failDestroyMats:true},
    flavor:'Fire, ice, lightning, stone — the elements war at your fingertips, barely contained.'},
  {id:'astral_sea',name:'Astral Sea',icon:'✨',color:'#4080d0',
    desc:'Pure cosmic precision. Lower DCs on everything, but customers pay less for the understated work.',
    effects:{dcReduction:2,goldPenalty:0.15},
    flavor:'Time slows. Your hands move with impossible precision, guided by starlight.'},
];
var PLANAR_COMBOS={
  'feywild+shadowfell':{name:'Twilight Veil',icon:'🌆',desc:'Illusion and shadow merge. Enchantments are invisible until activated — customers pay +50% for the mystery.',effects:{allGoldMult:1.5}},
  'feywild+elemental_chaos':{name:'Wild Magic',icon:'🎆',desc:'Chaotic fey energy. Every enchant has a 25% chance to randomly apply a bonus enchantment for free.',effects:{bonusEnchantChance:0.25}},
  'feywild+astral_sea':{name:'Dreamweave',icon:'💫',desc:'Dreamy precision. All enchantments auto-succeed DC 12 or below. +20% gold from utility enchants.',effects:{autoSuccessDC:12,utilityGoldMult:1.2}},
  'shadowfell+elemental_chaos':{name:'Void Storm',icon:'⚫',desc:'Destructive shadow energy. +4 inscription bonus, but crit failures (nat 1) destroy the customer\'s item.',effects:{inscriptionBonus:4,critFailDestroy:true}},
  'shadowfell+astral_sea':{name:'Null Space',icon:'🕳️',desc:'Perfect stillness. All DCs reduced by 3. Defensive enchants worth double.',effects:{dcReduction:3,defensiveGoldMult:2.0}},
  'elemental_chaos+astral_sea':{name:'Primordial Order',icon:'⚛️',desc:'Chaos contained by cosmic law. +3 inscription, +25% gold, no material destruction on failure.',effects:{inscriptionBonus:3,allGoldMult:1.25}},
};

// ═══ TINKERER GADGET CRAFTING ═══
var GADGET_BLUEPRINTS=[
  {id:'gd_compass',name:'Ingredient Compass',icon:'🧭',tier:1,dc:10,
    matCost:{hearthstone:2,ironroot_bark:1},desc:'A magnetized crystal vial that pulses near alchemical reagents.',
    effect:'forageBonus',values:[1,2,3],effectDesc:['+1 forage ingredient','+2 forage ingredients','+3 forage ingredients']},
  {id:'gd_stirrer',name:'Auto-Stirrer',icon:'🌀',tier:1,dc:10,
    matCost:{ironroot_bark:2,bark_resin:1},desc:'A clockwork arm that maintains perfect brew rotation.',
    effect:'craftBonus',values:[1,2,3],effectDesc:['+1 craft bonus','+2 craft bonus','+3 craft bonus']},
  {id:'gd_furnace',name:'Pocket Furnace',icon:'🔥',tier:1,dc:12,
    matCost:{embercap:2,hearthstone:1},desc:'A palm-sized crucible that burns with alchemical fire.',
    effect:'freeBrewsPerDay',values:[1,2,3],effectDesc:['1 free brew/day','2 free brews/day','3 free brews/day']},
  {id:'gd_assistant',name:'Clockwork Assistant',icon:'🤖',tier:2,dc:14,
    matCost:{ashite:2,ironroot_bark:2,hearthstone:1},desc:'A mechanical helper that follows simple instructions.',
    effect:'clockworkStaff',values:[0,1,2],effectDesc:['Staff member (no stars)','Staff member (★)','Staff member (★★)']},
  {id:'gd_salvager',name:'Salvage Reclaimer',icon:'♻️',tier:2,dc:13,
    matCost:{ashite:1,embervein:1,bark_resin:1},desc:'A filter that recovers usable reagents from failed experiments.',
    effect:'salvageBonus',values:[0.25,0.50,0.75],effectDesc:['+25% salvage','+50% salvage','+75% salvage']},
  {id:'gd_detector',name:'Resonance Detector',icon:'📡',tier:2,dc:14,
    matCost:{moonpetal:2,hearthstone:1},desc:'A tuning fork that hums near rare mineral deposits.',
    effect:'rareForageBonus',values:[0.10,0.20,0.30],effectDesc:['+10% rare finds','+20% rare finds','+30% rare finds']},
  {id:'gd_regulator',name:'Efficiency Regulator',icon:'⚙️',tier:1,dc:11,
    matCost:{ironroot_bark:2,ashbloom:2},desc:'A timing mechanism that optimizes staff workflow.',
    effect:'staffEffBonus',values:[0.15,0.30,0.45],effectDesc:['+15% staff efficiency','+30% staff efficiency','+45% staff efficiency']},
  {id:'gd_perpetual',name:'Perpetual Motion Engine',icon:'♾️',tier:3,dc:20,legendary:true,
    matCost:{embervein:3,deep_crystal:2,volcanic_essence:1},desc:'A device that defies natural law — self-sustaining energy.',
    effect:'perpetual',values:[null,null,[3,2]],effectDesc:['—','—','+3 Energy/day AND 2 free crafts']},
  {id:'gd_probability',name:'Probability Manipulator',icon:'🎲',tier:3,dc:20,legendary:true,
    matCost:{starwort:2,deep_crystal:2,moonpetal:2},desc:'A crystalline device that nudges fate in your favor.',
    effect:'rerollsPerDay',values:[null,null,2],effectDesc:['—','—','Reroll 2 failed checks/day']},
];

// ═══ CONSTRUCTOR BLUEPRINT WORKSHOP ═══
var CONSTRUCTOR_BPS=[
  {id:'bp_training',name:'Training Room',icon:'🎓',tier:1,draftDC:10,buildSessions:2,
    matCost:{ironroot_bark:3,bark_resin:2},desc:'A dedicated space for staff development with practice stations.',
    effect:'staffXPMult',value:2,effectDesc:'All apprentices gain 2× XP from tasks'},
  {id:'bp_rain',name:'Rain Collector',icon:'💧',tier:1,draftDC:10,buildSessions:3,
    matCost:{ironroot_bark:2,hearthstone:2},desc:'An alchemical condensation array that extracts reagents from morning dew.',
    effect:'freeIngredients',value:2,effectDesc:'Gain 2 free common ingredients each morning'},
  {id:'bp_shelves',name:'Reinforced Shelves',icon:'📦',tier:1,draftDC:11,buildSessions:2,
    matCost:{ironroot_bark:4,bark_resin:2},desc:'Heavy-duty shelving with alchemical preservation coatings.',
    effect:'shelfDouble',value:true,effectDesc:'Potion shelf capacity doubled'},
  {id:'bp_cauldron',name:'Second Cauldron',icon:'⚗️',tier:2,draftDC:14,buildSessions:4,
    matCost:{ashite:3,embervein:1,hearthstone:2},desc:'A fully independent brewing station for parallel production.',
    effect:'dualBrew',value:true,effectDesc:'Brew 2 different recipes in the same hour'},
  {id:'bp_deck',name:'Observation Deck',icon:'🔭',tier:2,draftDC:13,buildSessions:4,
    matCost:{ironroot_bark:4,moonpetal:2,hearthstone:1},desc:'A rooftop perch with a spyglass — see who approaches Cindervale.',
    effect:'previewCustomers',value:true,effectDesc:'See tomorrow\'s customer list in the evening'},
  {id:'bp_tunnel',name:'Supply Tunnel',icon:'🚇',tier:2,draftDC:15,buildSessions:5,
    matCost:{ashite:4,ironroot_bark:3,embervein:1},desc:'A concealed passage connecting to the Cinderfolk supply network.',
    effect:'freeRestock',value:3,effectDesc:'3 free random ingredients restocked each morning'},
  {id:'bp_automaton',name:'Automaton Forge',icon:'🤖',tier:3,draftDC:18,buildSessions:7,legendary:true,
    matCost:{embervein:3,deep_crystal:2,ashite:3,volcanic_essence:1},desc:'A self-operating brewing apparatus that works while you sleep.',
    effect:'overnightBrew',value:true,effectDesc:'Workshop produces 1 random potion overnight'},
  {id:'bp_sanctum',name:'Architect\'s Sanctum',icon:'🏛️',tier:3,draftDC:20,buildSessions:8,legendary:true,
    matCost:{deep_crystal:3,embervein:2,volcanic_essence:2,starwort:2},desc:'A master architect\'s study that enhances all your other constructions.',
    effect:'reinforceAll',value:true,effectDesc:'All blueprints get +50% effect, future build time halved'},
];

// ═══ NATURALIST FIELD JOURNAL ═══
var FIELD_DISCOVERIES={
  ashfields:[
    {id:'fd_ash_bloom_cycle',name:'Ashbloom Bloom Cycle',icon:'🌸',type:'flora',desc:'The ashbloom only opens its petals during thermal updrafts — timing your harvest to these windows yields stronger specimens.',bonus:{ingredient:'ashbloom',extraYield:1}},
    {id:'fd_cinder_beetle',name:'Cinder Beetle Colony',icon:'🪲',type:'fauna',desc:'These beetles process ash into nutrient-rich soil. Their tunnels mark where the healthiest plants grow.',bonus:{dangerReduce:0.15}},
    {id:'fd_thermal_vents',name:'Thermal Vent Mapping',icon:'🌡️',type:'geological',desc:'The vent patterns follow the old Heartforge conduits. Knowing the map reveals hidden mineral deposits.',bonus:{ingredient:'ash_salt',extraYield:1}},
  ],
  ironwood:[
    {id:'fd_ironwood_rings',name:'Ironwood Growth Rings',icon:'🌲',type:'flora',desc:'The rings contain compressed iron — older trees yield bark with higher mineral content.',bonus:{ingredient:'ironroot_bark',extraYield:1}},
    {id:'fd_moss_fox',name:'Moss Fox Den',icon:'🦊',type:'fauna',desc:'These foxes cache amber sap in their dens. Following their trails leads to the richest groves.',bonus:{dangerReduce:0.15}},
    {id:'fd_amber_seep',name:'Amber Seep Formation',icon:'💛',type:'geological',desc:'Ancient tree resin fossilized into alchemically-active amber. Found only where bedrock meets root systems.',bonus:{ingredient:'amber_sap',extraYield:1}},
  ],
  fungal_caves:[
    {id:'fd_biolum_network',name:'Bioluminescent Network',icon:'✨',type:'flora',desc:'The glowing fungi communicate through underground mycelium threads. Harvesting at pulse-peaks yields potent specimens.',bonus:{ingredient:'embercap',extraYield:1}},
    {id:'fd_cave_bat_roost',name:'Cave Bat Roost',icon:'🦇',type:'fauna',desc:'Bat guano enriches the cave floor, creating pockets of hyper-productive fungal growth.',bonus:{dangerReduce:0.15}},
    {id:'fd_spore_geode',name:'Spore Geode Formation',icon:'💎',type:'geological',desc:'Hollow geodes that incubate rare spore colonies. Cracking one open carefully yields concentrated alchemical material.',bonus:{ingredient:'echo_fungus',extraYield:1}},
  ],
  crystal_hollow:[
    {id:'fd_singing_crystals',name:'Singing Crystal Harmonics',icon:'🎵',type:'flora',desc:'Certain crystals resonate at frequencies that attract mineral growth. The singing ones are always richer.',bonus:{ingredient:'hearthstone',extraYield:1}},
    {id:'fd_crystal_worm',name:'Crystal Worm Tunnels',icon:'🪱',type:'fauna',desc:'Worms that digest rock and excrete crystalline waste. Their tunnels are veins of pure mineral.',bonus:{dangerReduce:0.15}},
    {id:'fd_resonance_chamber',name:'Resonance Chamber',icon:'🔔',type:'geological',desc:'A natural acoustic chamber where crystal growth is accelerated by vibration. Rare minerals concentrate here.',bonus:{ingredient:'resonance_ore',extraYield:1}},
  ],
  moonlit_glade:[
    {id:'fd_lunar_bloom',name:'Lunar Bloom Timing',icon:'🌙',type:'flora',desc:'Moonpetals are 3× more potent when harvested under specific lunar phases.',bonus:{ingredient:'moonpetal',extraYield:1}},
    {id:'fd_moth_migration',name:'Silver Moth Migration',icon:'🦋',type:'fauna',desc:'Moths that pollinate moonpetals. Their scales contain concentrated lunar essence.',bonus:{dangerReduce:0.15}},
    {id:'fd_dewstone',name:'Dewstone Deposits',icon:'💧',type:'geological',desc:'Stones that condense magical moisture. Alchemically active water that enhances any lunar ingredient.',bonus:{ingredient:'dew_crystal',extraYield:1}},
  ],
  volcanic_vents:[
    {id:'fd_magma_lily',name:'Magma Lily Root System',icon:'🌺',type:'flora',desc:'Heat-resistant flowers whose roots tap directly into magma channels. Incredibly potent alchemical reagents.',bonus:{ingredient:'volcanic_essence',extraYield:1}},
    {id:'fd_fire_salamander',name:'Fire Salamander Nests',icon:'🦎',type:'fauna',desc:'Salamanders that thrive in extreme heat. Their shed skins are natural fire-proofing agents.',bonus:{dangerReduce:0.20}},
    {id:'fd_obsidian_flow',name:'Obsidian Flow Pattern',icon:'⬛',type:'geological',desc:'Volcanic glass forms in predictable patterns. Reading the flow reveals where rare minerals crystallize.',bonus:{ingredient:'obsidian_flake',extraYield:1}},
  ],
  deep_mines:[
    {id:'fd_echo_crystal',name:'Echo Crystal Veins',icon:'🔮',type:'flora',desc:'Crystals that amplify sound — miners use them to detect cave-ins, but alchemists know their true value.',bonus:{ingredient:'echo_stone',extraYield:1}},
    {id:'fd_mine_spider',name:'Mine Spider Silk',icon:'🕸️',type:'fauna',desc:'Spiders that spin threads stronger than steel. Their webs mark safe passages through unstable shafts.',bonus:{dangerReduce:0.20}},
    {id:'fd_dark_vein',name:'Dark Amber Vein',icon:'🟤',type:'geological',desc:'Veins of compressed organic material from before the Heartforge was built. Ancient and powerful.',bonus:{ingredient:'dark_amber',extraYield:1}},
  ],
  heartforge_rim:[
    {id:'fd_phoenix_nest',name:'Phoenix Ash Deposit',icon:'🔥',type:'flora',desc:'Where phoenix ash settles, the most potent fire reagents grow. The ash itself is alchemical gold.',bonus:{ingredient:'phoenix_ash',extraYield:2}},
    {id:'fd_forge_spirit',name:'Forge Spirit Traces',icon:'👻',type:'fauna',desc:'Echoes of the workers who built the Heartforge. Their spiritual residue calms the volatile energies.',bonus:{dangerReduce:0.25}},
    {id:'fd_primordial_seam',name:'Primordial Seam',icon:'⚡',type:'geological',desc:'A crack in reality where raw creation energy leaks through. The rarest geological find in Cindervale.',bonus:{ingredient:'primordial_ash',extraYield:2}},
  ],
  // ── Ashfall Crossing ──
  sunscorch_flats:[
    {id:'fd_af_sunpetal_cycle',name:'Sunpetal Bloom Window',icon:'🌻',type:'flora',desc:'Sunpetals open only during the brief morning twilight. Harvesting in this window yields specimens twice as potent.',bonus:{ingredient:'sunpetal',extraYield:1}},
    {id:'fd_af_sand_lizard',name:'Sand Lizard Burrows',icon:'🦎',type:'fauna',desc:'These heat-resistant lizards dig cooling burrows that create microhabitats for rare desert plants.',bonus:{dangerReduce:0.15}},
    {id:'fd_af_salt_crust',name:'Salt Crust Deposits',icon:'🧂',type:'geological',desc:'Ancient dried lakebeds where mineral-rich salt crusts contain concentrated alchemical compounds.',bonus:{ingredient:'ash_salt',extraYield:1}},
  ],
  salt_caverns:[
    {id:'fd_af_brine_algae',name:'Brine Algae Colonies',icon:'🟢',type:'flora',desc:'Photosynthetic algae that thrive in supersaturated brine. Their cell walls contain crystallized minerals.',bonus:{ingredient:'crystal_salt',extraYield:1}},
    {id:'fd_af_cave_crab',name:'Salt Crab Colony',icon:'🦀',type:'fauna',desc:'Translucent crabs that filter mineral deposits from brine pools. Their presence marks the richest veins.',bonus:{dangerReduce:0.15}},
    {id:'fd_af_echo_chamber',name:'Salt Echo Chamber',icon:'🔊',type:'geological',desc:'Natural acoustic chambers where salt crystals amplify sound. The resonance reveals hidden mineral seams.',bonus:{ingredient:'echo_fungus',extraYield:1}},
  ],
  obsidian_wastes:[
    {id:'fd_af_glass_bloom',name:'Glass Flower Formation',icon:'🖤',type:'flora',desc:'Volcanic glass cools into flower-like formations that trap rare mineral gases inside their petals.',bonus:{ingredient:'obsidian_shard',extraYield:1}},
    {id:'fd_af_ash_hawk',name:'Ash Hawk Nesting Ground',icon:'🦅',type:'fauna',desc:'Hawks that nest in obsidian spires use thermal updrafts to hunt. Their guano fertilizes rare desert growth.',bonus:{dangerReduce:0.20}},
    {id:'fd_af_lava_tube',name:'Ancient Lava Tubes',icon:'🕳️',type:'geological',desc:'Hollow tubes left by ancient lava flows. Their walls are lined with mineral deposits from millennia of seepage.',bonus:{ingredient:'embervein',extraYield:1}},
  ],
  sandworm_tunnels:[
    {id:'fd_af_silk_web',name:'Fossilized Silk Veins',icon:'🕸️',type:'flora',desc:'Ancient sandworm silk hardened into fiber-rich mineral veins. Alchemically active and incredibly strong.',bonus:{ingredient:'sandsilk',extraYield:1}},
    {id:'fd_af_tunnel_bat',name:'Tunnel Bat Roost',icon:'🦇',type:'fauna',desc:'Desert bats that navigate sandworm tunnels by echolocation. Their droppings enrich the tunnel soil.',bonus:{dangerReduce:0.20}},
    {id:'fd_af_venom_pool',name:'Venom Seep Pool',icon:'☠️',type:'geological',desc:'Pools where sandworm venom has seeped into the rock over centuries, creating concentrated alchemical reservoirs.',bonus:{ingredient:'venomgland',extraYield:1}},
  ],
  oasis_grove:[
    {id:'fd_af_lily_timing',name:'Dewdrop Lily Cycle',icon:'💧',type:'flora',desc:'These lilies only produce alchemical nectar at dawn when dew condenses on their petals. Timing is everything.',bonus:{ingredient:'dewdrop_lily',extraYield:1}},
    {id:'fd_af_oasis_frog',name:'Golden Oasis Frog',icon:'🐸',type:'fauna',desc:'Tiny golden frogs whose skin secretions purify water. Their presence indicates the purest water sources.',bonus:{dangerReduce:0.15}},
    {id:'fd_af_spring_mineral',name:'Sacred Spring Minerals',icon:'💎',type:'geological',desc:'The oasis spring carries dissolved minerals from deep underground. Evaporation pools concentrate rare compounds.',bonus:{ingredient:'sacred_ember',extraYield:1}},
  ],
  molten_vents:[
    {id:'fd_af_living_ember',name:'Living Ember Colony',icon:'🔥',type:'flora',desc:'Fire-adapted organisms that feed on volcanic gases. Each ember is a living alchemical reactor.',bonus:{ingredient:'living_ember',extraYield:1}},
    {id:'fd_af_magma_drake',name:'Magma Drake Territory',icon:'🐉',type:'fauna',desc:'Territorial drakes that guard the richest vents. Mapping their patrol routes reveals safe harvesting windows.',bonus:{dangerReduce:0.25}},
    {id:'fd_af_diamond_seam',name:'Pressure Diamond Seam',icon:'💎',type:'geological',desc:'Extreme heat and pressure create diamonds infused with volcanic magic. Found only in the deepest vents.',bonus:{ingredient:'magma_diamond',extraYield:1}},
  ],
  mirage_bazaar:[
    {id:'fd_af_phantom_herb',name:'Phase-Shifting Herbs',icon:'👻',type:'flora',desc:'Plants that flicker between reality and the mirage realm. Harvesting requires precise timing as they shift.',bonus:{ingredient:'mirage_dust',extraYield:1}},
    {id:'fd_af_mirage_moth',name:'Prismatic Moth Swarm',icon:'🦋',type:'fauna',desc:'Moths that feed on mirage energy. Their wing-dust refracts light into alchemically useful spectra.',bonus:{dangerReduce:0.15}},
    {id:'fd_af_crystal_node',name:'Reality Anchor Crystal',icon:'🔮',type:'geological',desc:'Crystals that stabilize the mirage field. Mining them carefully yields materials that bridge reality and illusion.',bonus:{ingredient:'prismatic_ash',extraYield:1}},
  ],
  buried_temple:[
    {id:'fd_af_temple_vine',name:'Ancient Temple Vines',icon:'🌿',type:'flora',desc:'Roots that have grown through temple stonework for millennia, absorbing ancient alchemical residues.',bonus:{ingredient:'ancient_resin',extraYield:2}},
    {id:'fd_af_temple_guardian',name:'Stone Guardian Traces',icon:'🗿',type:'fauna',desc:'Remnants of animated stone guardians. Their dormant energy calms the temple\'s volatile magical traps.',bonus:{dangerReduce:0.25}},
    {id:'fd_af_gold_vein',name:'Ritual Gold Veins',icon:'🏆',type:'geological',desc:'Veins of alchemically pure gold woven into the temple walls by ancient priests. Impossibly refined.',bonus:{ingredient:'temple_gold',extraYield:2}},
  ],
};

// ═══ ARCHIVIST LORE ARCHIVE ═══
var LORE_CHAINS={
  heartforge:{id:'heartforge',name:'Heartforge History',icon:'🔥',color:'#d08040',
    desc:'The rise and fall of Cindervale\'s great forge — and the secret of what silenced it.',
    fragments:[
      {id:'lf_hf1',name:'The First Flame',desc:'The Heartforge was lit by a coalition of all four factions working together — a feat never repeated.',factions:['cinderfolk','ashwardens']},
      {id:'lf_hf2',name:'The Master Alchemist',desc:'A legendary alchemist named Edden created the Forge Catalyst that kept the Heartforge burning for centuries.',factions:['hearthkeepers']},
      {id:'lf_hf3',name:'The Day It Died',desc:'The Heartforge didn\'t simply go cold — something inside it chose to sleep. The last Forgekeeper heard it whisper.',factions:['cinderfolk','veilwalkers']},
      {id:'lf_hf4',name:'The Rekindling Prophecy',desc:'Tarn\'s oldest texts speak of a catalyst — not a potion, but a person. Someone who can hear the Forge\'s dreams.',factions:['veilwalkers']},
    ],
    reward:{xpMultiplier:0.10},rewardDesc:'+10% XP from all sources permanently'},
  veilwalker:{id:'veilwalker',name:'Veilwalker Secrets',icon:'🌀',color:'#7b68c4',
    desc:'The truth behind the Veil — and why Cindervale sits at its thinnest point.',
    fragments:[
      {id:'lf_vw1',name:'The Thin Place',desc:'Cindervale was built here deliberately. The Veil is thin because the Heartforge punched through it.',factions:['veilwalkers']},
      {id:'lf_vw2',name:'The Other Side',desc:'The Veilwalkers don\'t just watch the Veil — some have crossed it. What they found changed them forever.',factions:['veilwalkers','hearthkeepers']},
      {id:'lf_vw3',name:'The Warding Song',desc:'The original wards around Cindervale aren\'t runes — they\'re a song, hummed by the stones themselves.',factions:['veilwalkers','cinderfolk']},
    ],
    reward:{discoveryChanceBonus:0.15},rewardDesc:'+15% discovery chance permanently'},
  cinderfolk:{id:'cinderfolk',loc:'cindervale',name:'Cinderfolk Legends',icon:'⛏️',color:'#aa8866',
    desc:'Stories passed down through generations of miners — the deep history written in stone.',
    fragments:[
      {id:'lf_cf1',name:'The Deep King',desc:'Before Cindervale, the Cinderfolk served an underground king. His throne room lies beneath Shaft Nine.',factions:['cinderfolk']},
      {id:'lf_cf2',name:'Living Stone',desc:'The deepest mines aren\'t carved — they grew. The stone down there moves on its own, slowly.',factions:['cinderfolk','ashwardens']},
      {id:'lf_cf3',name:'The Ore That Sings',desc:'Miners report hearing music from certain veins. It\'s not madness — it\'s resonance ore responding to the Heartforge.',factions:['cinderfolk']},
      {id:'lf_cf4',name:'The Pact',desc:'The Cinderfolk didn\'t discover the mines. Something down there invited them in — and they made a deal.',factions:['cinderfolk','veilwalkers']},
      {id:'lf_cf5',name:'Return of the Deep',desc:'The tremors aren\'t random. The Deep King is turning in his sleep. When the Heartforge relights, he\'ll wake.',factions:['cinderfolk','ashwardens','veilwalkers']},
    ],
    reward:{forageYieldBonus:1},rewardDesc:'+1 forage yield in all regions permanently'},
  ashwarden:{id:'ashwarden',name:'Ashwarden Chronicles',icon:'⚔️',color:'#cc5544',
    desc:'The military history of Cindervale\'s protectors — and the threats they\'ve kept secret.',
    fragments:[
      {id:'lf_aw1',name:'The First Watch',desc:'The Ashwardens weren\'t formed to protect against beasts. They were formed to guard the Heartforge from people.',factions:['ashwardens']},
      {id:'lf_aw2',name:'The Siege of Ash',desc:'Cindervale was attacked once — an army from the coast. The Heartforge defended itself. No one speaks of how.',factions:['ashwardens','hearthkeepers']},
      {id:'lf_aw3',name:'Holst\'s Secret',desc:'Captain Holst knows what\'s in the deep tunnels. He\'s seen it. That\'s why he never sleeps.',factions:['ashwardens']},
      {id:'lf_aw4',name:'The Last Order',desc:'If the Heartforge relights, the Ashwardens have a sealed order from the founder. No one alive knows what it says.',factions:['ashwardens','veilwalkers']},
    ],
    reward:{questGoldBonus:0.20,questRepBonus:5},rewardDesc:'+20% quest gold and +5 rep permanently'},
  // ── Ashfall Crossing ──
  buried_temple_history:{id:'buried_temple_history',name:'Temple of the Sands',icon:'🏛️',color:'#c0a060',
    desc:'The buried temple predates the desert itself — who built it, and why was it sealed?',
    fragments:[
      {id:'lf_bt1',name:'Before the Sand',desc:'The temple was built on fertile grasslands. The desert came after — punishment or protection, depending on who you ask.',factions:['flamekeepers','dustwalkers']},
      {id:'lf_bt2',name:'The Sealing Ritual',desc:'The temple was sealed by its own priests. Whatever they locked inside was too dangerous to destroy.',factions:['flamekeepers']},
      {id:'lf_bt3',name:'The Sand Merchants\' Secret',desc:'The Guild was founded by temple refugees who carried alchemical knowledge out before the sealing.',factions:['sand_merchants']},
      {id:'lf_bt4',name:'The Inner Vault',desc:'The deepest chamber holds a twin to Cindervale\'s Heartforge — dormant but not dead.',factions:['flamekeepers','dustwalkers']},
    ],
    reward:{discoveryChanceBonus:0.15},rewardDesc:'+15% discovery chance permanently'},
  desert_crossing:{id:'desert_crossing',name:'Crossing Legends',icon:'🏜️',color:'#c09040',
    desc:'The stories of Ashfall Crossing — how a barren wasteland became a thriving settlement.',
    fragments:[
      {id:'lf_dc1',name:'The First Oasis',desc:'The oasis wasn\'t natural. A wandering alchemist created it by accident, trying to brew water from sand.',factions:['sand_merchants','dustwalkers']},
      {id:'lf_dc2',name:'The Sandworm Pact',desc:'The early settlers didn\'t fight the sandworms — they bargained. Silk and safe passage in exchange for leaving the deep tunnels alone.',factions:['dustwalkers']},
      {id:'lf_dc3',name:'The Merchant\'s Gambit',desc:'The Sand Merchants Guild was founded when three rival traders agreed to share the oasis rather than fight over it.',factions:['sand_merchants']},
    ],
    reward:{sellBonus:0.10},rewardDesc:'+10% sell prices permanently'},
  flamekeeper_chronicles:{id:'flamekeeper_chronicles',name:'Flamekeeper Chronicles',icon:'🔥',color:'#d06030',
    desc:'The sacred order that tends the eternal flames — and the truth about what they guard.',
    fragments:[
      {id:'lf_fk1',name:'The Eternal Flame',desc:'The Flamekeepers\' sacred fire wasn\'t lit by mortals. It\'s a shard of the same energy that powers the Heartforge.',factions:['flamekeepers']},
      {id:'lf_fk2',name:'The Desert\'s Memory',desc:'The Flamekeepers believe the desert itself is alive and dreaming. Their rituals are lullabies to keep it sleeping.',factions:['flamekeepers','dustwalkers']},
      {id:'lf_fk3',name:'The Bridge Between',desc:'Ashfall Crossing and Cindervale are connected by underground channels. The Flamekeepers and Hearthkeepers once shared a single order.',factions:['flamekeepers','sand_merchants']},
      {id:'lf_fk4',name:'The Awakening Price',desc:'If both the Heartforge and the Temple Forge are relit simultaneously, something buried between them will wake.',factions:['flamekeepers','dustwalkers']},
    ],
    reward:{extractionBonus:2},rewardDesc:'+2 extraction bonus permanently'},
};
var ALL_LORE_FRAGMENTS=Object.values(LORE_CHAINS).flatMap(c=>c.fragments.map(f=>({...f,chainId:c.id})));

// ═══ RANGER COMPANION SYSTEM ═══
var RANGER_COMPANIONS=[
  {id:'rc_fox',name:'Cinder Fox',icon:'🦊',region:'ashfields',role:'gatherer',color:'#d08040',
    desc:'A rust-furred fox that thrives in the ash. Knows every hidden bloom.',
    primary:{type:'gather',ingr:['ashbloom','char_root','ash_salt','ember_petal'],baseYield:[1,1,2,2,3]},
    secondary:{type:'scout_gather',desc:'Also gathers from adjacent regions',unlockLv:3},
    legendary:'Once/day: bring back a rare ingredient from any region'},
  {id:'rc_monkey',name:'Cave Monkey',icon:'🐒',region:'fungal_caves',role:'shopkeeper',color:'#a07050',
    desc:'A clever primate that mimics your movements. Surprisingly good with shelves.',
    primary:{type:'shop',baseGold:[3,5,8,12,18]},
    secondary:{type:'organize',desc:'+1 potion shelf capacity per loyalty level',unlockLv:3},
    legendary:'Automatically stocks shelves from your potion supply each morning'},
  {id:'rc_hawk',name:'Ash Hawk',icon:'🦅',region:'ironwood',role:'scout',color:'#6090c0',
    desc:'A keen-eyed raptor that rides the thermal updrafts above the canopy.',
    primary:{type:'danger_reduce',values:[0.25,0.40,0.50,0.60,0.75]},
    secondary:{type:'travel_reduce',desc:'-1 travel time to scouted region',unlockLv:3},
    legendary:'Once/day: instant travel (0 Energy) to any region'},
  {id:'rc_hound',name:'Ridge Hound',icon:'🐕',region:'crystal_hollow',role:'greeter',color:'#c09040',
    desc:'A loyal hound with crystalline eyes. Customers love petting it at the door.',
    primary:{type:'customers',values:[0,0,1,1,2]},
    secondary:{type:'morale_aura',desc:'+5 staff morale per morning',unlockLv:3},
    legendary:'Premium customers pay 15% more (charmed by the hound)'},
  {id:'rc_salamander',name:'Fire Salamander',icon:'🦎',region:'volcanic_vents',role:'guardian',color:'#d04040',
    desc:'A heat-resistant lizard that glows with inner fire. Protective and watchful.',
    primary:{type:'staff_morale',values:[5,8,10,12,15]},
    secondary:{type:'guard',desc:'Prevents negative morning events that cost gold',unlockLv:3},
    legendary:'Staff never drop below 50% morale while guardian is active'},
  {id:'rc_moth',name:'Silver Moth',icon:'🦋',region:'moonlit_glade',role:'muse',color:'#9080c0',
    desc:'A luminous moth drawn to magical resonance. Its presence sharpens the mind.',
    primary:{type:'research',values:[0.05,0.08,0.10,0.13,0.15]},
    secondary:{type:'xp_aura',desc:'+5% XP from all sources',unlockLv:3},
    legendary:'Research auto-discovers on first attempt each day'},
  {id:'rc_phoenix',name:'Phoenix Hatchling',icon:'🔥',region:'heartforge_rim',role:'legendary',color:'#d4a420',legendary_only:true,
    desc:'A newborn phoenix, impossibly rare. Its feathers contain primordial fire.',
    primary:{type:'gather',ingr:['phoenix_ash','volcanic_essence','primordial_ash','forge_scale'],baseYield:[1,1,2,2,3]},
    secondary:{type:'resurrect',desc:'Once/day: retry a failed craft check',unlockLv:3},
    legendary:'Passively generates 1 Heartforge ingredient every morning'},
  // Ashfall companions
  {id:'rc_sandcat',name:'Dune Cat',icon:'🐈',region:'sunscorch_flats',role:'gatherer',color:'#c0a060',
    desc:'A sand-colored feline that vanishes into the dunes. Brings back desert treasures.',
    primary:{type:'gather',ingr:['sunpetal','dustite','scorchroot','ash_salt'],baseYield:[1,1,2,2,3]},
    secondary:{type:'scout_gather',desc:'Also gathers from adjacent desert regions',unlockLv:3},
    legendary:'Once/day: bring back a rare ingredient from any Ashfall region'},
  {id:'rc_scorpion',name:'Crystal Scorpion',icon:'🦂',region:'salt_caverns',role:'guardian',color:'#60a0a0',
    desc:'A translucent scorpion whose stinger glows with salt crystal energy. Fiercely loyal.',
    primary:{type:'staff_morale',values:[5,8,10,12,15]},
    secondary:{type:'guard',desc:'Prevents negative morning events that cost gold',unlockLv:3},
    legendary:'Staff never drop below 50% morale while guardian is active'},
  {id:'rc_vulture',name:'Obsidian Vulture',icon:'🦅',region:'obsidian_wastes',role:'scout',color:'#404040',
    desc:'A massive black bird that circles the wastes. Nothing escapes its gaze.',
    primary:{type:'danger_reduce',values:[0.25,0.40,0.50,0.60,0.75]},
    secondary:{type:'travel_reduce',desc:'-1 travel time to scouted region',unlockLv:3},
    legendary:'Once/day: instant travel (0 Energy) to any Ashfall region'},
  {id:'rc_sandworm',name:'Burrowing Grub',icon:'🪱',region:'sandworm_tunnels',role:'shopkeeper',color:'#a08060',
    desc:'A juvenile sandworm that tunnels through soft earth. Surprisingly useful around the shop.',
    primary:{type:'shop',baseGold:[3,5,8,12,18]},
    secondary:{type:'organize',desc:'+1 potion shelf capacity per loyalty level',unlockLv:3},
    legendary:'Automatically stocks shelves from your potion supply each morning'},
  {id:'rc_gecko',name:'Oasis Gecko',icon:'🦎',region:'oasis_grove',role:'greeter',color:'#40a060',
    desc:'A vibrantly colored gecko found only near desert oases. Customers find it charming.',
    primary:{type:'customers',values:[0,0,1,1,2]},
    secondary:{type:'morale_aura',desc:'+5 staff morale per morning',unlockLv:3},
    legendary:'Premium customers pay 15% more (charmed by the gecko)'},
  {id:'rc_firebeetle',name:'Molten Beetle',icon:'🪲',region:'molten_vents',role:'muse',color:'#d06020',
    desc:'A heat-resistant beetle whose shell shimmers with volcanic energy. Inspires creativity.',
    primary:{type:'research',values:[0.05,0.08,0.10,0.13,0.15]},
    secondary:{type:'xp_boost',desc:'+5% XP from all sources per loyalty level',unlockLv:3},
    legendary:'Research auto-discovers at Soulbound loyalty'},
  {id:'rc_sphinx',name:'Desert Sphinx',icon:'🐱',region:'buried_temple',role:'legendary',color:'#d4a420',legendary_only:true,
    desc:'An ancient creature of myth guarding the Buried Temple. Speaks in riddles.',
    primary:{type:'gather',ingr:['ancient_resin','temple_gold','deep_crystal','mirage_dust'],baseYield:[1,1,2,2,3]},
    secondary:{type:'resurrect',desc:'Once/day: retry a failed craft check',unlockLv:3},
    legendary:'Passively generates 1 Buried Temple ingredient every morning'},
];

// ═══ QUARTERMASTER SUPPLY CHAIN NETWORK ═══
var CARAVAN_ROUTES=[
  {id:'cr_ashfield',name:'Ashfield Road',icon:'🏜️',region:'ashfields',loc:'cindervale',tier:1,roundTrip:3,dc:10,
    desc:'A well-trodden path through the ash flats. Safe but modest returns.',
    tradeIngr:['ashbloom','char_root','ash_salt'],tradeGold:15},
  {id:'cr_ironwood',name:'Ironwood Trail',icon:'🌲',region:'ironwood',loc:'cindervale',tier:1,roundTrip:3,dc:11,
    desc:'Winding forest paths where bark and resin traders gather.',
    tradeIngr:['ironroot_bark','bark_resin','amber_sap'],tradeGold:18},
  {id:'cr_fungal',name:'Cavern Run',icon:'🍄',region:'fungal_caves',loc:'cindervale',tier:1,roundTrip:3,dc:11,
    desc:'A damp tunnel route favored by fungal foragers.',
    tradeIngr:['embercap','gloomcap','echo_fungus'],tradeGold:18},
  {id:'cr_crystal',name:'Crystal Pass',icon:'💎',region:'crystal_hollow',loc:'cindervale',tier:2,roundTrip:2,dc:14,
    desc:'A dangerous mountain pass where mineral traders hawk rare geodes.',
    tradeIngr:['hearthstone','ashite','crystal_shard'],tradeGold:30},
  {id:'cr_moonlit',name:'Moonlit Path',icon:'🌙',region:'moonlit_glade',loc:'cindervale',tier:2,roundTrip:2,dc:13,
    desc:'A silvery trail that only experienced traders can navigate safely.',
    tradeIngr:['moonpetal','starwort','nightdew'],tradeGold:28},
  {id:'cr_volcanic',name:'Volcanic Corridor',icon:'🌋',region:'volcanic_vents',loc:'cindervale',tier:3,roundTrip:2,dc:17,
    desc:'A scorching path through active vents. Only the bravest caravans attempt it.',
    tradeIngr:['volcanic_essence','embervein','magma_salt'],tradeGold:50},
  // Ashfall Crossing
  {id:'cr_af_dunes',name:'Dune Road',icon:'☀️',region:'sunscorch_flats',loc:'ashfall',tier:1,roundTrip:3,dc:10,
    desc:'A wind-scoured trail between desert settlements. Sandy but safe.',
    tradeIngr:['sunpetal','dustite','scorchroot'],tradeGold:15},
  {id:'cr_af_salt',name:'Salt Tunnel Route',icon:'🧂',region:'salt_caverns',loc:'ashfall',tier:1,roundTrip:3,dc:11,
    desc:'Underground passages connecting salt mining communities.',
    tradeIngr:['crystal_salt','brine_moss','mineral_clay'],tradeGold:18},
  {id:'cr_af_obsidian',name:'Glass Road',icon:'🖤',region:'obsidian_wastes',loc:'ashfall',tier:2,roundTrip:2,dc:14,
    desc:'A treacherous path across razor-sharp obsidian fields.',
    tradeIngr:['obsidian_shard','embervein','dustite'],tradeGold:30},
  {id:'cr_af_oasis',name:'Oasis Circuit',icon:'🌴',region:'oasis_grove',loc:'ashfall',tier:2,roundTrip:2,dc:13,
    desc:'A loop connecting the hidden oases where rare desert herbs grow.',
    tradeIngr:['dewdrop_lily','sunpetal','sacred_ember'],tradeGold:28},
  {id:'cr_af_worm',name:'Worm Tunnels Express',icon:'🪱',region:'sandworm_tunnels',loc:'ashfall',tier:2,roundTrip:2,dc:15,
    desc:'Fast but dangerous — through abandoned sandworm tunnels.',
    tradeIngr:['sandsilk','venomgland','scorchroot'],tradeGold:35},
  {id:'cr_af_molten',name:'Lava Passage',icon:'🌋',region:'molten_vents',loc:'ashfall',tier:3,roundTrip:2,dc:17,
    desc:'Through the heart of the volcanic zone. Extremely profitable if you survive.',
    tradeIngr:['magma_diamond','living_ember','volcanic_essence'],tradeGold:50},
];
var SUPPLY_PARTNERS=[
  {id:'sp_hunters',name:'Boarback Hunters',icon:'🐗',color:'#8a6040',loc:'cindervale',
    route:'cr_ironwood',runsNeeded:3,setupCost:50,maint:3,
    desc:'Hardy hunters who provide animal by-products from the deep forest.',
    output:{t1:['ironroot_bark','bark_resin'],t2:['ironroot_bark','bark_resin','amber_sap'],t3:['ironroot_bark','bark_resin','amber_sap','moss_amber']},
    outputQty:{t1:[1,1],t2:[1,1,1],t3:[2,1,1,1]},goldOutput:{t1:0,t2:3,t3:8}},
  {id:'sp_miners',name:'Deep Drift Miners',icon:'⛏️',color:'#607090',loc:'cindervale',
    route:'cr_crystal',runsNeeded:3,setupCost:75,maint:5,
    desc:'An independent mining crew working seams the Cinderfolk don\'t claim.',
    output:{t1:['hearthstone','ashite'],t2:['hearthstone','ashite','crystal_shard'],t3:['hearthstone','ashite','crystal_shard','resonance_ore']},
    outputQty:{t1:[1,1],t2:[1,1,1],t3:[2,1,1,1]},goldOutput:{t1:0,t2:5,t3:12}},
  {id:'sp_herbalists',name:'Glade Herbalists',icon:'🌿',color:'#60a060',loc:'cindervale',
    route:'cr_moonlit',runsNeeded:3,setupCost:60,maint:4,
    desc:'A circle of herb-women who tend secret moonlit gardens.',
    output:{t1:['moonpetal','starwort'],t2:['moonpetal','starwort','nightdew'],t3:['moonpetal','starwort','nightdew','dew_crystal']},
    outputQty:{t1:[1,1],t2:[1,1,1],t3:[2,1,1,1]},goldOutput:{t1:0,t2:4,t3:10}},
  {id:'sp_nomads',name:'Ashwalker Nomads',icon:'🔥',color:'#c06040',loc:'cindervale',
    route:'cr_volcanic',runsNeeded:3,setupCost:100,maint:6,
    desc:'Fire-resistant wanderers who harvest from active volcanic vents.',
    output:{t1:['volcanic_essence','embervein'],t2:['volcanic_essence','embervein','magma_salt'],t3:['volcanic_essence','embervein','magma_salt','obsidian_flake']},
    outputQty:{t1:[1,1],t2:[1,1,1],t3:[2,1,1,1]},goldOutput:{t1:0,t2:6,t3:15}},
  {id:'sp_traders',name:'Coastal Traders',icon:'📦',color:'#5080a0',loc:'cindervale',
    route:'cr_ashfield',runsNeeded:3,setupCost:80,maint:5,
    desc:'Merchants from the coast with exotic goods unavailable in Cindervale.',
    output:{t1:['ghost_silk','beetle_shell'],t2:['ghost_silk','beetle_shell','moth_scale'],t3:['ghost_silk','beetle_shell','moth_scale','dream_pollen']},
    outputQty:{t1:[1,1],t2:[1,1,1],t3:[2,1,1,1]},goldOutput:{t1:2,t2:8,t3:18}},
  {id:'sp_hermits',name:'Mountain Hermits',icon:'🏔️',color:'#8090a0',legendary:true,loc:'cindervale',
    route:'cr_volcanic',runsNeeded:5,setupCost:120,maint:8,
    desc:'Reclusive sages who trade in materials found nowhere else.',
    output:{t1:['deep_crystal','embervein'],t2:['deep_crystal','embervein','mithril_dust'],t3:['deep_crystal','embervein','mithril_dust','void_salt']},
    outputQty:{t1:[1,1],t2:[1,1,1],t3:[2,2,1,1]},goldOutput:{t1:0,t2:10,t3:25}},
  // Ashfall Crossing
  {id:'sp_af_salt_guild',name:'Salt Merchants Guild',icon:'🧂',color:'#6a7a8a',loc:'ashfall',
    route:'cr_af_salt',runsNeeded:3,setupCost:50,maint:3,
    desc:'Organized salt traders who control the underground mineral routes.',
    output:{t1:['crystal_salt','brine_moss'],t2:['crystal_salt','brine_moss','mineral_clay'],t3:['crystal_salt','brine_moss','mineral_clay','echo_fungus']},
    outputQty:{t1:[1,1],t2:[1,1,1],t3:[2,1,1,1]},goldOutput:{t1:0,t2:3,t3:8}},
  {id:'sp_af_glass_cutters',name:'Obsidian Cutters',icon:'🖤',color:'#404050',loc:'ashfall',
    route:'cr_af_obsidian',runsNeeded:3,setupCost:75,maint:5,
    desc:'Artisans who harvest and shape volcanic glass into alchemical components.',
    output:{t1:['obsidian_shard','dustite'],t2:['obsidian_shard','dustite','embervein'],t3:['obsidian_shard','dustite','embervein','volcanic_essence']},
    outputQty:{t1:[1,1],t2:[1,1,1],t3:[2,1,1,1]},goldOutput:{t1:0,t2:5,t3:12}},
  {id:'sp_af_oasis_keepers',name:'Oasis Keepers',icon:'🌴',color:'#3a6a4a',loc:'ashfall',
    route:'cr_af_oasis',runsNeeded:3,setupCost:60,maint:4,
    desc:'Guardians of the hidden oases who tend rare desert gardens.',
    output:{t1:['dewdrop_lily','sunpetal'],t2:['dewdrop_lily','sunpetal','sacred_ember'],t3:['dewdrop_lily','sunpetal','sacred_ember','starwort']},
    outputQty:{t1:[1,1],t2:[1,1,1],t3:[2,1,1,1]},goldOutput:{t1:0,t2:4,t3:10}},
  {id:'sp_af_worm_riders',name:'Worm Riders',icon:'🪱',color:'#7a6a3a',loc:'ashfall',
    route:'cr_af_worm',runsNeeded:3,setupCost:100,maint:6,
    desc:'Daring riders who tame juvenile sandworms to harvest silk and venom.',
    output:{t1:['sandsilk','venomgland'],t2:['sandsilk','venomgland','scorchroot'],t3:['sandsilk','venomgland','scorchroot','thornvine']},
    outputQty:{t1:[1,1],t2:[1,1,1],t3:[2,1,1,1]},goldOutput:{t1:0,t2:6,t3:15}},
  {id:'sp_af_caravan_kings',name:'Desert Caravan Kings',icon:'🐪',color:'#c0a060',loc:'ashfall',
    route:'cr_af_dunes',runsNeeded:3,setupCost:80,maint:5,
    desc:'Wealthy merchants who control the major trade routes across the desert.',
    output:{t1:['sunpetal','scorchroot'],t2:['sunpetal','scorchroot','ashbloom'],t3:['sunpetal','scorchroot','ashbloom','wind_dust']},
    outputQty:{t1:[1,1],t2:[1,1,1],t3:[2,1,1,1]},goldOutput:{t1:2,t2:8,t3:18}},
  {id:'sp_af_temple_scholars',name:'Temple Scholars',icon:'🏛️',color:'#4a3a2a',legendary:true,loc:'ashfall',
    route:'cr_af_molten',runsNeeded:5,setupCost:120,maint:8,
    desc:'Reclusive academics studying the Buried Temple who trade in ancient materials.',
    output:{t1:['ancient_resin','temple_gold'],t2:['ancient_resin','temple_gold','deep_crystal'],t3:['ancient_resin','temple_gold','deep_crystal','veil_shard']},
    outputQty:{t1:[1,1],t2:[1,1,1],t3:[2,2,1,1]},goldOutput:{t1:0,t2:10,t3:25}},
];

// ═══ GUILDMASTER ACADEMY ═══
var TRAINABLE_STATS=['tec','inu','acu','com','dis','cre'];
var TEACHABLE_TRAITS=['Quick Learner','Keen Senses','Tireless','Organized','Creative','Methodical','Inventive','Insightful','Numerate','Fleet-Footed'];

// ═══ DIPLOMAT EMBASSY & ENVOY SYSTEM ═══
var FACTION_PAIRS=[
  {id:'fp_ash_cind',loc:'cindervale',factions:['ashwardens','cinderfolk'],name:'Ashwardens ↔ Cinderfolk',icon:'⚔️⛏️',dc:11,
    desc:'The soldiers and the miners — united by the mountain but divided by pride.',
    rewards:['Both shops +2 items','Cross-faction quests, 15% vendor discount','Merged recipes: Forgeheart Tincture bonus, +25% rep both']},
  {id:'fp_ash_hk',loc:'cindervale',factions:['ashwardens','hearthkeepers'],name:'Ashwardens ↔ Hearthkeepers',icon:'⚔️🕯️',dc:10,
    desc:'The protectors and the healers — natural allies who sometimes forget it.',
    rewards:['Both shops +2 items','Cross-faction quests, 15% vendor discount','Healing potions worth 2× to Ashwardens, +25% rep both']},
  {id:'fp_ash_vw',loc:'cindervale',factions:['ashwardens','veilwalkers'],name:'Ashwardens ↔ Veilwalkers',icon:'⚔️🌀',dc:13,
    desc:'Steel and sorcery — the hardest alliance to forge, but the most powerful.',
    rewards:['Both shops +2 items','Cross-faction quests, 15% vendor discount','Enchanted weapons sell 2×, +25% rep both']},
  {id:'fp_cind_hk',loc:'cindervale',factions:['cinderfolk','hearthkeepers'],name:'Cinderfolk ↔ Hearthkeepers',icon:'⛏️🕯️',dc:10,
    desc:'The workers and the community — the backbone of Cindervale.',
    rewards:['Both shops +2 items','Cross-faction quests, 15% vendor discount','Forage yield +1 in mines/ashfields, +25% rep both']},
  {id:'fp_cind_vw',loc:'cindervale',factions:['cinderfolk','veilwalkers'],name:'Cinderfolk ↔ Veilwalkers',icon:'⛏️🌀',dc:12,
    desc:'Deep stone and deep magic — the miners distrust what they can\'t dig.',
    rewards:['Both shops +2 items','Cross-faction quests, 15% vendor discount','Research discovers mine recipes, +25% rep both']},
  {id:'fp_hk_vw',factions:['hearthkeepers','veilwalkers'],name:'Hearthkeepers ↔ Veilwalkers',icon:'🕯️🌀',dc:11,loc:'cindervale',
    desc:'Faith and arcana — two paths to the same truth about the Heartforge.',
    rewards:['Both shops +2 items','Cross-faction quests, 15% vendor discount','Celestial Balm brews at -2 DC, +25% rep both']},
  // Ashfall Crossing
  {id:'fp_af_sm_fk',factions:['sand_merchants','flamekeepers'],name:'Sand Merchants ↔ Flamekeepers',icon:'🏪🔥',dc:10,loc:'ashfall',
    desc:'Commerce and devotion — the merchants fund the temple, the temple blesses the caravans.',
    rewards:['Both shops +2 items','Cross-faction quests, 15% vendor discount','Sell prices +10% to both factions, +25% rep both']},
  {id:'fp_af_sm_dw',factions:['sand_merchants','dustwalkers'],name:'Sand Merchants ↔ Dustwalkers',icon:'🏪🧭',dc:12,loc:'ashfall',
    desc:'Profit and exploration — the walkers find new routes, the merchants make them profitable.',
    rewards:['Both shops +2 items','Cross-faction quests, 15% vendor discount','Caravan routes -1 day, +25% rep both']},
  {id:'fp_af_fk_dw',factions:['flamekeepers','dustwalkers'],name:'Flamekeepers ↔ Dustwalkers',icon:'🔥🧭',dc:11,loc:'ashfall',
    desc:'Sacred fire and wandering wind — the keepers guard what the walkers discover.',
    rewards:['Both shops +2 items','Cross-faction quests, 15% vendor discount','Expedition danger -10%, +25% rep both']},
];

// ═══ PRESTIGE CLASSES ═══
var PRESTIGE_CLASSES={
  cartographer:{id:'cartographer',name:'Cartographer',icon:'🗺️',color:'#50a0a0',
    req:{warden:3,scholar:3},maxLv:5,
    desc:'Explorer-scholar who maps hidden regions containing unique ingredients.',
    features:[
      {lv:1,name:'Hidden Paths',desc:'Discover secret sub-areas within known regions with unique ingredients. 25% chance per forage hour.',legacyEffects:{extractionBonus:1,luckyFindChance:0.05}},
      {lv:2,name:'Detailed Maps',desc:'Hidden area discovery chance +15%. Mapped areas yield +1 bonus ingredient.',legacyEffects:{extractionBonus:1,yieldMultiplier:0.15}},
      {lv:3,name:'Cartographer\'s Insight',desc:'See all ingredients in a region before committing to forage. +10% XP from foraging.',legacyEffects:{showIngredients:true,xpMultiplier:0.10}},
      {lv:4,name:'Pathfinder\'s Network',desc:'Staff foraging uses your mapped paths: +25% staff forage yield.',legacyEffects:{staffForageBonus:0.25,extractionBonus:1}},
      {lv:5,name:'Legendary Atlas',desc:'Discover the Heartforge\'s hidden chambers. Unique legendary ingredients only you can access.',legacyEffects:{extractionBonus:2,luckyFindChance:0.15,yieldMultiplier:0.20}},
    ]},
  spellbrewer:{id:'spellbrewer',name:'Spellbrewer',icon:'⚗️',color:'#9060c0',
    req:{alchemist:3,enchanter:3},maxLv:5,
    desc:'Creates infused potions that combine brewing and enchanting effects.',
    features:[
      {lv:1,name:'Infusion Novice',desc:'Unlock Vigor and Clarity infusions. 2 infusions per day. Catalyst: any ingredient with 5+ stock.',effects:{infusionSlots:2}},
      {lv:2,name:'Resonant Brew',desc:'Unlock Fortify infusion. Infusion DC penalty reduced by 1. 3 infusions per day.',effects:{infusionSlots:3,infusionDCReduce:1}},
      {lv:3,name:'Essence Weaver',desc:'Unlock Prosperity infusion. 25% chance catalyst is preserved. 4 infusions per day.',effects:{infusionSlots:4,catalystPreserve:0.25}},
      {lv:4,name:'Arcane Distiller',desc:'Unlock Lingering infusion. Catalyst always preserved on Masterwork+ brews. 5 infusions per day.',effects:{infusionSlots:5,mwCatalystPreserve:true}},
      {lv:5,name:'Grand Spellbrewer',desc:'Stack two infusions on one brew (double catalyst). Infused shelf potions attract +1 daily customer.',effects:{infusionSlots:6,doubleInfusion:true,infusedCustomerBonus:1}},
    ]},
  magitech:{id:'magitech',name:'Magitech Engineer',icon:'🔧',color:'#a0a060',
    req:{artificer:3,enchanter:3},maxLv:5,
    desc:'Builds magical automata that perform workshop tasks autonomously.',
    features:[
      {lv:1,name:'Automaton Frame',desc:'Build a basic automaton (1 active). Performs one task per day at 60% efficiency.',legacyEffects:{craftBonus:1}},
      {lv:2,name:'Improved Servos',desc:'Automaton efficiency +20%. Can assign to brew, forage, or shopkeep.',legacyEffects:{craftBonus:1,staffEfficiencyBonus:0.10}},
      {lv:3,name:'Second Automaton',desc:'+1 automaton slot (2 total). Automata gain XP and level up like staff.',legacyEffects:{craftBonus:1,staffXPBonus:0.25}},
      {lv:4,name:'Enchanted Core',desc:'Automata can perform enchanting tasks. Efficiency +20% (total 100%).',legacyEffects:{enchantBonus:1,craftBonus:2}},
      {lv:5,name:'Master Construct',desc:'+1 automaton (3 total). Automata can perform prestige tasks. Self-repairing.',legacyEffects:{craftBonus:2,staffEfficiencyBonus:0.20,enchantBonus:1}},
    ]},
  brandmaster:{id:'brandmaster',name:'Brand Master',icon:'🏷️',color:'#d0a060',
    req:{merchant:3,alchemist:3},maxLv:5,
    desc:'Creates named product lines that build customer loyalty and premium pricing.',
    features:[
      {lv:1,name:'First Label',desc:'Create 1 brand with up to 2 recipes. Branded potions +10% sell. Brand levels up with sales.',effects:{brandSlots:1,maxRecipes:2}},
      {lv:2,name:'Brand Recognition',desc:'Brands hold 3 recipes. +5 aligned faction rep per 10 branded sales. Sales tracker UI.',effects:{brandSlots:1,maxRecipes:3,brandRepPer10:5}},
      {lv:3,name:'Product Line',desc:'2nd brand slot. Brand orders appear (2× price). Branded shelf potions +10% sell chance.',effects:{brandSlots:2,maxRecipes:3,brandOrders:true,brandShelfBonus:0.10}},
      {lv:4,name:'Premium Label',desc:'Brands hold 4 recipes. Famous tier unlocks (+60% sell). Branded MW+ potions extra +25%.',effects:{brandSlots:2,maxRecipes:4,famousTier:true,brandMWBonus:0.25}},
      {lv:5,name:'Legendary Brand',desc:'3rd brand slot. Famous brands attract collectors trading rare ingredients. 25% brand rep carries through torch.',effects:{brandSlots:3,maxRecipes:4,collectors:true,torchBrandRep:0.25}},
    ]},
  wildcrafter:{id:'wildcrafter',name:'Wildcrafter',icon:'🌿',color:'#60a040',
    req:{warden:3,alchemist:3},maxLv:5,
    desc:'Brews potions in the field using fresh ingredients for bonus potency.',
    features:[
      {lv:1,name:'Field Alchemy',desc:'1 field brew per expedition from your haul. Fresh potions sell at 1.2×. Standard quality only.',effects:{fieldBrews:1,freshMult:1.2}},
      {lv:2,name:'Fresh Reagents',desc:'2 field brews. Fresh 1.3×. Fine quality field brewing. +1 bonus ingredient per expedition.',effects:{fieldBrews:2,freshMult:1.3,fieldFine:true,bonusForageIngr:1}},
      {lv:3,name:'Wilderness Recipes',desc:'3 field brews. Fresh 1.4×. Unlock 3 field-only recipes (Vitality Draught, Trailblazer Tonic, Wilderness Elixir).',effects:{fieldBrews:3,freshMult:1.4,fieldRecipes:true}},
      {lv:4,name:'Master Fieldcrafter',desc:'3 field brews. Fresh 1.5×. Masterwork field brewing. 15% double batch chance.',effects:{fieldBrews:3,freshMult:1.5,fieldMW:true,fieldDoubleBatch:0.15}},
      {lv:5,name:'Living Apothecary',desc:'4 field brews. Auto-suggests best potion. Legendary field-only recipe: Essence of the Wild.',effects:{fieldBrews:4,freshMult:1.5,fieldLegendary:true}},
    ]},
  antiquarian:{id:'antiquarian',name:'Antiquarian',icon:'📖',color:'#c0a080',
    req:{scholar:3,merchant:3},maxLv:5,
    desc:'Discovers and appraises mysterious relics for massive profit or permanent bonuses.',
    features:[
      {lv:1,name:'Relic Sense',desc:'15% relic find chance per expedition hour. Appraise interface unlocked (1 Energy, Acumen check).',effects:{relicChance:0.15}},
      {lv:2,name:'Keen Appraisal',desc:'25% find chance. +3 appraisal bonus. See relic rarity before appraising.',effects:{relicChance:0.25,appraisalBonus:3,showRarity:true}},
      {lv:3,name:'Collector\'s Network',desc:'Sell appraised relics at 3× value. Museum display unlocked. Collection set bonuses active.',effects:{relicChance:0.25,collectorSell:3,museum:true}},
      {lv:4,name:'Relic Expertise',desc:'35% find chance. Auto-identify (no check). Staff can do Relic Hunt tasks.',effects:{relicChance:0.35,autoAppraise:true}},
      {lv:5,name:'Grand Collection',desc:'Complete all 5 sets for +10g/morning museum income. Legendary relics in diff 4+. Set bonuses doubled.',effects:{relicChance:0.35,legendaryRelics:true,museumIncome:10,doubleSetBonus:true}},
    ]},
  siegeengineer:{id:'siegeengineer',name:'Siege Engineer',icon:'🏗️',color:'#808060',
    req:{warden:3,artificer:3},maxLv:5,
    desc:'Builds outposts that gather ingredients and suppress external threats.',
    features:[
      {lv:1,name:'Field Outpost',desc:'1 outpost slot. Gathers 2 ingredients/morning. Suppresses nearby threats (-3/day).',effects:{outpostSlots:1,outpostGather:2,outpostSuppress:3}},
      {lv:2,name:'Fortified Outpost',desc:'2 slots. Gathering +1 (3/morning). -4 suppression. +1 forage yield at outpost regions.',effects:{outpostSlots:2,outpostGather:3,outpostSuppress:4,outpostForageBonus:1}},
      {lv:3,name:'Processing Station',desc:'3 slots. Assign 1 auto-brew recipe per outpost from stored ingredients.',effects:{outpostSlots:3,outpostGather:3,outpostSuppress:4,outpostAutoBrew:true}},
      {lv:4,name:'Supply Depot',desc:'3 slots. Gathering +1 (4/morning). -5 suppression. Auto-brewed potions stock to shelves.',effects:{outpostSlots:3,outpostGather:4,outpostSuppress:5,outpostAutoShelf:true}},
      {lv:5,name:'Fortress Network',desc:'4 slots. Upgrade one outpost to a fortress (caps one threat at 50). Outposts share storage.',effects:{outpostSlots:4,outpostGather:4,outpostSuppress:5,fortressUpgrade:true,outpostShareStorage:true}},
    ]},
  arcanist:{id:'arcanist',name:'Arcanist',icon:'✨',color:'#8060c0',
    req:{scholar:3,enchanter:3},maxLv:5,
    desc:'Researches and designs entirely new custom enchantment patterns.',
    features:[
      {lv:1,name:'Pattern Research',desc:'Spend 2h to research a new enchantment pattern. Choose effect type and power level.',legacyEffects:{enchantBonus:1}},
      {lv:2,name:'Refined Patterns',desc:'Custom enchantments get +2 inscription bonus. Can name your creations.',legacyEffects:{enchantBonus:2}},
      {lv:3,name:'Dual-Effect Patterns',desc:'Design enchantments with two effects. Custom patterns sell at 2× value.',legacyEffects:{enchantBonus:2,sellBonus:0.10}},
      {lv:4,name:'Pattern Library',desc:'Store up to 10 custom patterns. Share patterns with staff for automated inscribing.',legacyEffects:{enchantBonus:2,staffEfficiencyBonus:0.15}},
      {lv:5,name:'Grand Theorem',desc:'Design legendary enchantments. Custom patterns can have 3 effects. Named masterworks.',legacyEffects:{enchantBonus:3,discoveryChanceBonus:0.15}},
    ]},
};

// ═══ ARCANIST CUSTOM PATTERNS ═══
var PATTERN_EFFECTS=[
  {id:'pe_dmg_fire',name:'Searing',icon:'🔥',cat:'weapon',desc:'+fire damage',power:[10,18,28],xpBase:30},
  {id:'pe_dmg_ice',name:'Frostbite',icon:'❄️',cat:'weapon',desc:'+cold damage',power:[10,18,28],xpBase:30},
  {id:'pe_dmg_shock',name:'Voltaic',icon:'⚡',cat:'weapon',desc:'+lightning damage',power:[10,18,28],xpBase:30},
  {id:'pe_dmg_venom',name:'Toxic',icon:'☠️',cat:'weapon',desc:'+poison damage',power:[10,18,28],xpBase:30},
  {id:'pe_lifesteal',name:'Vampiric',icon:'🩸',cat:'weapon',desc:'heals wielder on hit',power:[12,22,35],xpBase:40},
  {id:'pe_armor',name:'Warding',icon:'🛡️',cat:'armor',desc:'+defense rating',power:[10,18,28],xpBase:30},
  {id:'pe_regen',name:'Mending',icon:'💚',cat:'armor',desc:'passive regeneration',power:[12,22,35],xpBase:35},
  {id:'pe_reflect',name:'Retaliation',icon:'🔄',cat:'armor',desc:'reflects damage to attacker',power:[14,24,38],xpBase:40},
  {id:'pe_stealth',name:'Obscuring',icon:'🌑',cat:'armor',desc:'harder to detect',power:[10,18,28],xpBase:30},
  {id:'pe_resist',name:'Warding Aura',icon:'✨',cat:'armor',desc:'magic resistance',power:[14,24,38],xpBase:40},
  {id:'pe_speed',name:'Swiftness',icon:'💨',cat:'other',desc:'+movement speed',power:[8,16,24],xpBase:25},
  {id:'pe_luck',name:'Fortune',icon:'🍀',cat:'other',desc:'+luck in all endeavors',power:[10,18,28],xpBase:30},
  {id:'pe_sight',name:'Truesight',icon:'👁️',cat:'other',desc:'see hidden things',power:[12,22,35],xpBase:35},
  {id:'pe_charisma',name:'Alluring',icon:'💎',cat:'other',desc:'+social influence',power:[10,18,28],xpBase:30},
  {id:'pe_wisdom',name:'Sagacity',icon:'📖',cat:'other',desc:'+knowledge and insight',power:[10,18,28],xpBase:30},
];
var PATTERN_POWER_NAMES=['Minor','Greater','Supreme'];
var PATTERN_PREFIXES=['Arcane','Ethereal','Prismatic','Resonant','Celestial','Abyssal','Runic','Eldritch','Mythic','Astral','Primordial','Radiant'];
var PATTERN_SUFFIXES=['Pattern','Sigil','Glyph','Theorem','Formula','Matrix','Cipher','Weave','Array','Schema'];

// ═══ CARTOGRAPHER HIDDEN REGIONS ═══
var HIDDEN_REGIONS=[
  {id:'hr_ash_geysers',region:'ashfields',name:'Ash Geysers',icon:'💨',dc:10,
    desc:'Hidden thermal vents that periodically erupt, leaving rare mineral deposits in the cooling ash.',
    ingr:['prismatic_ash','thermal_bloom'],yieldRange:[2,4]},
  {id:'hr_iron_canopy',region:'ironwood',name:'Ironwood Canopy',icon:'🌿',dc:11,
    desc:'The forest crown — a network of branches so dense you can walk across them. Rare epiphytes grow here.',
    ingr:['canopy_moss','sky_amber'],yieldRange:[2,4]},
  {id:'hr_crystal_lake',region:'fungal_caves',name:'Crystal Lake',icon:'💎',dc:12,
    desc:'An underground lake with crystallized fungal colonies growing from the shallows. Beautiful and dangerous.',
    ingr:['crystal_mycelium','deep_pearl'],yieldRange:[2,3]},
  {id:'hr_singing_cave',region:'crystal_hollow',name:'Singing Cavern',icon:'🎵',dc:13,
    desc:'A natural cathedral where crystal formations vibrate in harmony. The resonance creates unique mineral growth.',
    ingr:['harmonic_crystal','resonance_dust'],yieldRange:[2,3]},
  {id:'hr_silver_pool',region:'moonlit_glade',name:'Silver Pools',icon:'🌊',dc:13,
    desc:'Moon-fed pools that collect liquid moonlight. The water itself is alchemically active.',
    ingr:['liquid_moonlight','silver_lotus'],yieldRange:[1,3]},
  {id:'hr_magma_heart',region:'volcanic_vents',name:'Magma Heart',icon:'🔥',dc:15,
    desc:'The central magma chamber where temperatures forge impossible minerals. Extremely dangerous.',
    ingr:['magma_diamond','living_ember'],yieldRange:[1,3]},
  {id:'hr_lost_shaft',region:'deep_mines',name:'Lost Shaft Nine',icon:'⛏️',dc:15,
    desc:'A collapsed mine shaft recently reopened. The Cinderfolk whisper about what sleeps below.',
    ingr:['deep_mithril','shadow_ore'],yieldRange:[1,3]},
  {id:'hr_forge_sanctum',region:'heartforge_rim',name:'Forge Sanctum',icon:'⚡',dc:18,legendary:true,
    desc:'The innermost chamber of the Heartforge — where creation energy still pulses. Only a master cartographer can find the path.',
    ingr:['primordial_spark','forge_heart_shard'],yieldRange:[1,2]},
  // ── Ashfall Crossing Hidden Regions ──
  {id:'hr_af_buried_oasis',region:'sunscorch_flats',name:'Buried Oasis',icon:'💧',dc:10,
    desc:'Beneath the scorching sand, a hidden spring feeds a pocket of lush growth invisible from the surface.',
    ingr:['desert_bloom','sunpetal'],yieldRange:[2,4]},
  {id:'hr_af_crystal_grotto',region:'salt_caverns',name:'Crystal Grotto',icon:'💎',dc:12,
    desc:'A hidden chamber where salt crystals have grown to enormous size over millennia, humming with energy.',
    ingr:['singing_salt','crystal_salt'],yieldRange:[2,4]},
  {id:'hr_af_glass_garden',region:'obsidian_wastes',name:'Glass Garden',icon:'🖤',dc:13,
    desc:'A sheltered hollow where volcanic glass has formed into impossibly delicate structures resembling flowers.',
    ingr:['glass_bloom','obsidian_shard'],yieldRange:[2,3]},
  {id:'hr_af_queen_chamber',region:'sandworm_tunnels',name:'Queen\'s Chamber',icon:'👑',dc:14,
    desc:'The enormous chamber of a sandworm queen. The walls are coated in concentrated alchemical secretions.',
    ingr:['queen_silk','venomgland'],yieldRange:[2,3]},
  {id:'hr_af_moonwell',region:'oasis_grove',name:'Moonwell',icon:'🌙',dc:13,
    desc:'A pool that reflects starlight even at noon. The water has properties that defy natural law.',
    ingr:['moonwell_water','dewdrop_lily'],yieldRange:[2,4]},
  {id:'hr_af_dragon_nest',region:'molten_vents',name:'Dragon\'s Cradle',icon:'🐉',dc:16,
    desc:'An ancient dragon nesting site deep in the vents. Eggshell fragments contain primordial fire essence.',
    ingr:['dragon_ash','living_ember'],yieldRange:[1,3]},
  {id:'hr_af_spirit_market',region:'mirage_bazaar',name:'Spirit Market',icon:'👻',dc:15,
    desc:'A layer of the bazaar that exists fully in the mirage realm. Ghost merchants trade in pure essence.',
    ingr:['spirit_essence','mirage_dust'],yieldRange:[2,3]},
  {id:'hr_af_inner_vault',region:'buried_temple',name:'Temple Vault',icon:'🏛️',dc:18,legendary:true,
    desc:'The sealed inner vault of the Buried Temple. Contains artifacts from the age before the desert.',
    ingr:['vault_gold','ancient_resin'],yieldRange:[1,2]},
];
// Register hidden ingredients
var HIDDEN_INGR={
  // Cindervale
  prismatic_ash:{id:'prismatic_ash',name:'Prismatic Ash',icon:'🌈',val:12,desc:'Rainbow-hued ash from thermal eruptions'},
  thermal_bloom:{id:'thermal_bloom',name:'Thermal Bloom',icon:'🌺',val:10,desc:'Heat-loving flower that blooms in seconds'},
  canopy_moss:{id:'canopy_moss',name:'Canopy Moss',icon:'🍃',val:12,desc:'Sky-high moss infused with pure sunlight'},
  sky_amber:{id:'sky_amber',name:'Sky Amber',icon:'☀️',val:14,desc:'Amber formed in the canopy, lighter than air'},
  crystal_mycelium:{id:'crystal_mycelium',name:'Crystal Mycelium',icon:'💠',val:14,desc:'Crystallized fungal network'},
  deep_pearl:{id:'deep_pearl',name:'Deep Pearl',icon:'🫧',val:16,desc:'Pearl grown in underground fungal lakes'},
  harmonic_crystal:{id:'harmonic_crystal',name:'Harmonic Crystal',icon:'🔔',val:14,desc:'Vibrating crystal that hums with power'},
  resonance_dust:{id:'resonance_dust',name:'Resonance Dust',icon:'✨',val:12,desc:'Powdered crystal attuned to magical frequencies'},
  liquid_moonlight:{id:'liquid_moonlight',name:'Liquid Moonlight',icon:'🌙',val:16,desc:'Bottled moonbeam in liquid form'},
  silver_lotus:{id:'silver_lotus',name:'Silver Lotus',icon:'🪷',val:14,desc:'Rare lotus that only grows in moon-fed pools'},
  magma_diamond:{id:'magma_diamond',name:'Magma Diamond',icon:'💎',val:20,desc:'Diamond forged in living magma'},
  living_ember:{id:'living_ember',name:'Living Ember',icon:'🔥',val:18,desc:'A flame that burns without fuel'},
  deep_mithril:{id:'deep_mithril',name:'Deep Mithril',icon:'⚪',val:20,desc:'Ultra-rare metallic ore from below Shaft Nine'},
  shadow_ore:{id:'shadow_ore',name:'Shadow Ore',icon:'⬛',val:18,desc:'Ore that absorbs light and radiates cold'},
  primordial_spark:{id:'primordial_spark',name:'Primordial Spark',icon:'⚡',val:30,desc:'A shard of creation energy from the Heartforge'},
  forge_heart_shard:{id:'forge_heart_shard',name:'Forge Heart Shard',icon:'💛',val:28,desc:'Fragment of the Heartforge core itself'},
  // Ashfall
  desert_bloom:{id:'desert_bloom',name:'Desert Bloom',icon:'🌵',val:12,desc:'Rare flower from a buried oasis, blooms only underground.'},
  singing_salt:{id:'singing_salt',name:'Singing Salt',icon:'🎵',val:14,desc:'Salt crystals that hum with stored energy.'},
  glass_bloom:{id:'glass_bloom',name:'Glass Bloom',icon:'🖤',val:14,desc:'Delicate obsidian glass in the shape of a flower.'},
  queen_silk:{id:'queen_silk',name:'Queen Silk',icon:'👑',val:18,desc:'Silk from a sandworm queen — strongest natural fiber known.'},
  moonwell_water:{id:'moonwell_water',name:'Moonwell Water',icon:'🌙',val:16,desc:'Water that glows with captured starlight.'},
  dragon_ash:{id:'dragon_ash',name:'Dragon Ash',icon:'🐉',val:20,desc:'Ash from an ancient dragon nest, infused with primordial fire.'},
  spirit_essence:{id:'spirit_essence',name:'Spirit Essence',icon:'👻',val:18,desc:'Concentrated mirage energy in liquid form.'},
  vault_gold:{id:'vault_gold',name:'Vault Gold',icon:'🏆',val:30,desc:'Alchemically perfect gold from the Buried Temple vault.'},
};
// Merge hidden ingredients into INGR at runtime
Object.assign(INGR,HIDDEN_INGR);
// ═══ ASHFALL CROSSING INGREDIENTS ═══
INGR.sunpetal={id:'sunpetal',name:'Sunpetal',icon:'🌻',val:5,desc:'Hardy desert flower that blooms at high noon.'};
INGR.dustite={id:'dustite',name:'Dustite',icon:'⏳',val:7,desc:'Compressed sandite with time-distortion properties.'};
INGR.scorchroot={id:'scorchroot',name:'Scorchroot',icon:'🫚',val:6,desc:'Heat-resistant root that grows near volcanic vents.'};
INGR.crystal_salt={id:'crystal_salt',name:'Crystal Salt',icon:'🧂',val:8,desc:'Salt crystals with preserved magical resonance.'};
INGR.brine_moss={id:'brine_moss',name:'Brine Moss',icon:'🌊',val:10,desc:'Salt-saturated moss from underground caverns.'};
INGR.obsidian_shard={id:'obsidian_shard',name:'Obsidian Shard',icon:'🖤',val:12,desc:'Razor-sharp volcanic glass with alchemical potential.'};
INGR.sandsilk={id:'sandsilk',name:'Sandsilk',icon:'🕸️',val:14,desc:'Incredibly strong threads spun by desert sandworms.'};
INGR.venomgland={id:'venomgland',name:'Venomgland',icon:'🐍',val:16,desc:'Potent venom sac from desert predators.'};
INGR.dewdrop_lily={id:'dewdrop_lily',name:'Dewdrop Lily',icon:'💧',val:15,desc:'Rare oasis flower that condenses water from air.'};
INGR.mirage_dust={id:'mirage_dust',name:'Mirage Dust',icon:'✨',val:22,desc:'Shimmering particles from collapsed illusions.'};
INGR.ancient_resin={id:'ancient_resin',name:'Ancient Resin',icon:'🪵',val:28,desc:'Fossilized tree sap from the Buried Temple era.'};
INGR.temple_gold={id:'temple_gold',name:'Temple Gold',icon:'🏆',val:35,desc:'Alchemically pure gold from ancient ritual vessels.'};
INGR.sand_merchant_seal={id:'sand_merchant_seal',name:'Merchant Seal',icon:'📜',val:22,desc:'Official seal of the Sand Merchants Guild.'};
INGR.flamekeeper_ember={id:'flamekeeper_ember',name:'Sacred Flame',icon:'🕯️',val:25,desc:'Eternal flame fragment from the Flamekeeper shrine.'};
INGR.dustwalker_compass={id:'dustwalker_compass',name:'Wayfinder',icon:'🧭',val:22,desc:'Enchanted compass crafted by Dustwalker navigators.'};

INGR.alchemical_residue={id:'alchemical_residue',name:'Alchemical Residue',icon:'♻️',val:3,desc:'Salvaged essence from spoiled ingredients. Can substitute for common reagents.'};

// ═══ CARTOGRAPHER ELIXIRS — Multi-day buff potions ═══
var ELIXIR_BUFFS={
  prismatic_elixir:{id:'prismatic_elixir',name:'Prismatic Elixir',icon:'🌈',duration:3,
    desc:'Shimmering liquid refracts inner light. All craft checks enhanced.',
    effects:{craftBonus:3},buffDesc:'+3 craft bonus for 3 days'},
  canopy_draught:{id:'canopy_draught',name:'Canopy Draught',icon:'🍃',duration:3,
    desc:'Distilled sunlight from the forest crown. Foraging becomes effortless.',
    effects:{extractionBonus:3,yieldMultiplier:0.25},buffDesc:'+3 extraction, +25% yield for 3 days'},
  deep_pearl_tonic:{id:'deep_pearl_tonic',name:'Deep Pearl Tonic',icon:'🫧',duration:3,
    desc:'Iridescent liquid that sharpens the mind to a razor edge.',
    effects:{discoveryChanceBonus:0.25,xpMultiplier:0.20},buffDesc:'+25% discovery, +20% XP for 3 days'},
  harmonic_infusion:{id:'harmonic_infusion',name:'Harmonic Infusion',icon:'🔔',duration:3,
    desc:'Crystal vibrations attune your hands to perfection.',
    effects:{enchantBonus:3,enchantSuccessFlat:8},buffDesc:'+3 inscription, +8 flat bonus for 3 days'},
  moonlight_philter:{id:'moonlight_philter',name:'Moonlight Philter',icon:'🌙',duration:4,
    desc:'Bottled moonbeams suffuse you with lunar grace. Everything you touch turns to gold.',
    effects:{sellBonus:0.30,customerPayBonus:0.20},buffDesc:'+30% sell, +20% customer pay for 4 days'},
  magma_essence:{id:'magma_essence',name:'Magma Essence',icon:'🔥',duration:2,
    desc:'Liquid fire courses through your veins. Dangerous but incredibly potent.',
    effects:{craftBonus:5,doubleBatchChance:0.30},buffDesc:'+5 craft, +30% double batch for 2 days'},
  mithril_draught:{id:'mithril_draught',name:'Mithril Draught',icon:'⚪',duration:3,
    desc:'The rarest metal in liquid form. Your body becomes a precision instrument.',
    effects:{craftFloor:8,salvagePercent:0.50},buffDesc:'Min roll 8, +50% salvage for 3 days'},
  primordial_elixir:{id:'primordial_elixir',name:'Primordial Elixir',icon:'⚡',duration:5,legendary:true,
    desc:'Creation energy in a flask. The most powerful consumable in Cindervale.',
    effects:{craftBonus:4,xpMultiplier:0.30,sellBonus:0.25,discoveryChanceBonus:0.20,enchantBonus:3},buffDesc:'+4 craft, +30% XP, +25% sell, +20% discovery, +3 inscription for 5 days'},
  wilderness_elixir:{id:'wilderness_elixir',name:'Wilderness Elixir',icon:'🍃',duration:3,
    desc:'+2 extraction, +1 forage yield for 3 days.',
    effects:{extractionBonus:2,forageYieldBonus:1},buffDesc:'+2 extraction, +1 yield for 3 days'},
  essence_wild:{id:'essence_wild',name:'Essence of the Wild',icon:'🌍',duration:5,
    desc:'+3 extraction, +2 yield, +1 Energy/day for 5 days.',
    effects:{extractionBonus:3,forageYieldBonus:2,bonusEnergyPerDay:1},buffDesc:'+3 extraction, +2 yield, +1 Energy for 5 days'},
  // ═══ ASHFALL CARTOGRAPHER ELIXIR BUFFS ═══
  oasis_bloom_tonic:{id:'oasis_bloom_tonic',name:'Oasis Bloom Tonic',icon:'🌵',duration:3,
    desc:'Desert bloom fragrance charms customers and sharpens negotiation.',
    effects:{customerPayBonus:0.25,customerBonus:1,sellBonus:0.15},buffDesc:'+25% customer pay, +1 customer, +15% sell for 3 days'},
  singing_salt_brew:{id:'singing_salt_brew',name:'Singing Salt Brew',icon:'🎵',duration:3,
    desc:'Harmonic resonance attunes your hands to magical frequencies.',
    effects:{enchantBonus:3,enchantSuccessFlat:6},buffDesc:'+3 inscription, +6 enchant bonus for 3 days'},
  glass_bloom_elixir:{id:'glass_bloom_elixir',name:'Glass Bloom Elixir',icon:'🖤',duration:3,
    desc:'Volcanic glass precision flows through your fingers.',
    effects:{craftBonus:3,craftFloor:6},buffDesc:'+3 craft, min roll 6 for 3 days'},
  queen_silk_draught:{id:'queen_silk_draught',name:'Queen Silk Draught',icon:'👑',duration:3,
    desc:'Sandworm silk coats your workspace — nothing sticks, nothing is wasted.',
    effects:{salvagePercent:0.75,saveIngredientChance:0.30},buffDesc:'+75% salvage, +30% ingredient save for 3 days'},
  moonwell_philter:{id:'moonwell_philter',name:'Moonwell Philter',icon:'🌙',duration:4,
    desc:'Starlit water clarifies the mind beyond mortal limits.',
    effects:{discoveryChanceBonus:0.30,xpMultiplier:0.25,freeResearchPerDay:1},buffDesc:'+30% discovery, +25% XP, +1 free research for 4 days'},
  dragon_fire_flask:{id:'dragon_fire_flask',name:'Dragon Fire Flask',icon:'🐉',duration:2,
    desc:'Primordial dragon fire. Dangerous, unstoppable, magnificent.',
    effects:{craftBonus:6,doubleBatchChance:0.35,firstBrewFree:true},buffDesc:'+6 craft, +35% double batch, free first brew for 2 days'},
  spirit_draught:{id:'spirit_draught',name:'Spirit Draught',icon:'👻',duration:3,
    desc:'The mirage realm bleeds through. You see everything more clearly.',
    effects:{extractionBonus:2,craftBonus:2,enchantBonus:2,discoveryChanceBonus:0.10},buffDesc:'+2 to extraction/craft/enchant, +10% discovery for 3 days'},
  vault_elixir:{id:'vault_elixir',name:'Vault Gold Elixir',icon:'🏆',duration:5,legendary:true,
    desc:'Temple gold in liquid form. The ultimate Ashfall consumable.',
    effects:{craftBonus:4,xpMultiplier:0.30,sellBonus:0.30,customerPayBonus:0.25,enchantBonus:3},buffDesc:'+4 craft, +30% XP, +30% sell, +25% pay, +3 enchant for 5 days'},
};

var POT_LINES={
  'Thorek':['"The boys in Shaft Nine need salves after every shift. I\'m buying."','"Something for sore muscles and worse. Whatever you recommend."'],
  'Fiona':['"I\'ll take whatever you have. Potions sell for triple in the capital."','"My caravan leaves at dawn — what\'s ready?"'],
  'Barret':['"The patrol needs field supplies. What have you got?"','"Burns, cuts, poison — we see it all. Give me your best."'],
  'Mama Grinn':['"Old Dorek\'s been asking for something for his joints."','"A few bottles of whatever helps travelers. I keep some under the bar."'],
  'Jax':['"My master sent me to pick up an order. He said you\'d know what."','"Is it true Ironhide Potions can stop a cave-in? I want one!"'],
  'Sister Venna':['"The temple infirmary runs through salves faster than you\'d believe."','"The pilgrims who come through need tending. Do you have Ashveil Tonics?"'],
  'Rorik':['"At my age, a good healing salve is worth more than gold."','"The knees, the back, the shoulder — pick a joint and it aches."'],
  'Anya':['"I handle herbs but brewing isn\'t my skill. What have you got?"','"The glade folk could use Ashveil Tonics for the pollen season."'],
  'Gorrik':['"Regulation orders: three potions per shift team. Fill the order."','"Safety first in the mines. The guild pays fair."'],
  'Sera':['"Celestial Balm, if you have it. The Veilwalkers pay generously."','"Mundane remedies have their place. I\'ll take what you can spare."'],
};
var REP_LVS=['Stranger','Neutral','Friendly','Trusted','Honored','Revered'];
var REP_TH=[0,50,150,350,650,1100];
var getRepLvl=rep=>{let l=0;for(let i=0;i<REP_TH.length;i++)if(rep>=REP_TH[i])l=i;return l;};
var FACTIONS={ashwardens:{id:'ashwardens',loc:'cindervale',name:'Ashwardens',icon:'🛡️',color:TH.fAsh,res:'warden_sigil',
  alignBonus:{name:'Ashwarden Defender',desc:'+20% forage yield, +1 craft bonus, protection enchants cost -1 ingredient.',effects:{yieldMultiplier:0.20,craftBonus:1}},
  tierBonuses:[
    {name:'Guarded Zones',desc:'Unlock Ashwarden-guarded foraging zones.',effects:{}},
    {name:'Protection Recipes',desc:'Unlock Ashwarden protection recipes.',effects:{}},
    {name:'Warden Sigils',desc:'Quests occasionally reward bonus Warden Sigils.',effects:{factionBonusDrop_warden_sigil:0.25}},
    {name:'Elite Contracts',desc:'+20% gold from all quest rewards.',effects:{questGoldBonus:0.20}},
    {name:'Defender',desc:'+1 to all craft checks. Protection enchants cost -1 ingredient.',effects:{craftBonus:1}},
  ]},hearthkeepers:{id:'hearthkeepers',loc:'cindervale',name:'Hearthkeepers',icon:'🔥',color:TH.fHearth,res:'sacred_ember',
  alignBonus:{name:'Hearthkeeper Devotee',desc:'+15% potion value, +15% XP from all sources, +15% staff efficiency.',effects:{potionValueBonus:0.15,xpMultiplier:0.15,staffEfficiencyBonus:0.15}},
  tierBonuses:[
    {name:'Purification',desc:'+10% potion sale value.',effects:{potionValueBonus:0.10}},
    {name:'Holy Recipes',desc:'Unlock Hearthkeeper holy recipes.',effects:{}},
    {name:'Sacred Embers',desc:'Quests occasionally reward bonus Sacred Embers.',effects:{factionBonusDrop_sacred_ember:0.25}},
    {name:'Temple Healing',desc:'Restore 1 Energy when completing a quest.',effects:{questEnergyRestore:1}},
    {name:'Keeper',desc:'+10% XP from all sources.',effects:{xpMultiplier:0.10}},
  ]},veilwalkers:{id:'veilwalkers',loc:'cindervale',name:'Veilwalkers',icon:'👁️',color:TH.fVeil,res:'veil_shard',
  alignBonus:{name:'Veilseer',desc:'+25% enchant success, +20% discovery chance, research -1h.',effects:{enchantSuccessFlat:25,discoveryChanceBonus:0.20,researchCostReduction:1}},
  tierBonuses:[
    {name:'Arcane ID',desc:'+5% enchantment success chance.',effects:{enchantSuccessFlat:5}},
    {name:'Rare Formulas',desc:'Unlock Veilwalker rare formulas.',effects:{}},
    {name:'Veil Shards',desc:'Quests occasionally reward bonus Veil Shards.',effects:{factionBonusDrop_veil_shard:0.25}},
    {name:'Library',desc:'+15% recipe & enchantment discovery chance.',effects:{discoveryChanceBonus:0.15}},
    {name:'Veilseer',desc:'Research studies cost 1 fewer hour. See enchant success %.',effects:{researchCostReduction:1}},
  ]},cinderfolk:{id:'cinderfolk',name:'Cinderfolk',icon:'⛏️',color:TH.fCinder,res:'deep_crystal',
  alignBonus:{name:'Stone Sibling',desc:'-20% shop prices, +2 forage yield, +40% rare find chance.',effects:{buyDiscount:0.20,forageYieldBonus:2,rareForageBonus:0.40}},
  tierBonuses:[
    {name:'Ore Discounts',desc:'-10% on all shop purchases.',effects:{buyDiscount:0.10}},
    {name:'Rare Minerals',desc:'Unlock Cinderfolk rare mineral recipes.',effects:{}},
    {name:'Deep Crystals',desc:'Quests occasionally reward bonus Deep Crystals.',effects:{factionBonusDrop_deep_crystal:0.25}},
    {name:'Mining Crew',desc:'Foraging expeditions yield +1 extra item.',effects:{forageYieldBonus:1}},
    {name:'Stone Sibling',desc:'+25% rare find chance on expeditions.',effects:{rareForageBonus:0.25}},
  ]},
  // ═══ ASHFALL CROSSING FACTIONS ═══
  sand_merchants:{id:'sand_merchants',loc:'ashfall',name:'Sand Merchants Guild',icon:'📜',color:'#c0a040',res:'sand_merchant_seal',
    alignBonus:{name:'Guild Merchant',desc:'+20% sell, rare procurement.',effects:{sellBonus:0.20,shopRestockBonus:2}},
    tierBonuses:[
      {name:'Trade License',desc:'Guild wholesale prices.',effects:{buyDiscount:0.15}},
      {name:'Caravan Routes',desc:'Exotic ingredients in shop.',effects:{shopRestockBonus:3}},
      {name:'Master Trader',desc:'+10% potion value, +15% customer pay.',effects:{potionValueBonus:0.10,customerPayBonus:0.15}},
    ]},
  flamekeepers:{id:'flamekeepers',loc:'ashfall',name:'Flamekeepers',icon:'🕯️',color:'#d06030',res:'flamekeeper_ember',
    alignBonus:{name:'Flamekeeper Acolyte',desc:'+15% XP, free herbs, +1 Energy.',effects:{xpMultiplier:0.15,dailyHerbs:true,bonusEnergyPerDay:1}},
    tierBonuses:[
      {name:'Temple Access',desc:'Oasis Grove unlocked early.',effects:{}},
      {name:'Sacred Rites',desc:'+2 research, +1 craft.',effects:{researchBonus:2,craftBonus:1}},
      {name:'Eternal Flame',desc:'All checks +1. +1 Energy on quest.',effects:{craftBonus:1,enchantBonus:1,extractionBonus:1,questEnergyRestore:1}},
    ]},
  dustwalkers:{id:'dustwalkers',loc:'ashfall',name:'Dustwalkers',icon:'🧭',color:'#8a7050',res:'dustwalker_compass',
    alignBonus:{name:'Dustwalker Scout',desc:'+2 extraction, danger reduced, +1 Energy.',effects:{extractionBonus:2,reducedRisk:0.25,bonusEnergyPerDay:1}},
    tierBonuses:[
      {name:'Trail Knowledge',desc:'Travel time -1 Ashfall regions.',effects:{}},
      {name:'Desert Sense',desc:'+30% danger reduction. Mirage Bazaar access.',effects:{reducedRisk:0.30}},
      {name:'Pathfinder',desc:'Target no yield penalty. +50% discovery.',effects:{targetNoYieldPenalty:true,discoveryChanceBonus:0.50}},
    ]},
};
var getFactionEffects=(fRepState,alignment)=>{const effs={};for(const [fid,f] of Object.entries(FACTIONS)){const rl=getRepLvl(fRepState[fid]||0);for(let i=0;i<Math.min(rl,f.tierBonuses.length);i++){const tb=f.tierBonuses[i];for(const [k,v] of Object.entries(tb.effects)){effs[k]=(effs[k]||0)+(typeof v==='number'?v:v===true?1:0);}}if(alignment===fid&&f.alignBonus){for(const [k,v] of Object.entries(f.alignBonus.effects)){effs[k]=(effs[k]||0)+(typeof v==='number'?v:v===true?1:0);}}}return effs;};
var QUESTS=[
  {id:'q1',name:'Brenna\'s Request',giver:'Brenna',loc:'market',type:'deliver',target:'healing_salve',count:1,xp:80,gold:15,items:['moonpetal','moonpetal'],unlock:0,faction:null,fRep:0,
    desc:'Brenna needs a Healing Salve for an injured traveler.',hint:'Brew a Healing Salve (🌿 Ashbloom + 💎 Hearthstone) and return to Brenna.',
    offer:['"You\'re the new alchemist, aren\'t you? Good — I was hoping you\'d come by."','"There\'s a traveler resting in the back room. Took a nasty fall on the eastern trail. Broken ribs, I think, and the wound\'s going sour."','"I don\'t have the skill for potions, but I know what helps — a Healing Salve. Ashbloom and Hearthstone, ground together. Can you manage it?"'],
    onAccept:'"Thank you. He\'s in real pain. Don\'t take too long — and here, take these Moonpetal cuttings. You\'ll need them later, I think."',
    turnIn:['"Let me see... yes, this is good work. Better than I expected from someone so new."','"The color is right, the consistency... you have a feel for this. The traveler will be walking by tomorrow."','"Here\'s your pay, and my thanks. Come back when you\'re ready — there\'s always more work in Cindervale."']},
  {id:'q1b',name:'Stocking the Shelves',giver:'Brenna',loc:'market',type:'gather',target:'ashbloom',count:8,xp:60,gold:12,items:[],unlock:1,faction:'hearthkeepers',fRep:15,
    desc:'Brenna\'s herb stores are running dangerously low.',hint:'Gather 8 Ashbloom from the Ashfields and return to Brenna.',
    offer:['"My herb jars are nearly empty. Traders haven\'t come through in weeks — the roads are bad."','"I need Ashbloom, at least eight bundles. The Ashfields should have plenty if you know where to look."'],
    onAccept:'"Be careful out there. The fields look peaceful but the ash storms come fast."',
    turnIn:['"Eight bundles! That\'ll keep me stocked for a while. Good quality too."','"The Hearthkeepers take notice when someone helps keep the village supplied.  Here\'s your pay."']},
  {id:'q1c',name:'Marta\'s Traveler\'s Aid',giver:'Marta',loc:'tavern',type:'deliver',target:'healing_salve',count:2,xp:70,gold:18,items:['embercap','embercap'],unlock:1,faction:'hearthkeepers',fRep:20,
    desc:'Marta keeps salves on hand for weary travelers at the inn.',hint:'Brew 2 Healing Salves and bring them to Marta at the Ember & Anvil.',
    offer:['"Travelers come through here bruised, burned, half-starved. I do what I can, but I\'m no healer."','"Two Healing Salves would let me help the worst cases. People remember kindness — it\'s good for the village."'],
    onAccept:'"I knew you\'d help. Here — take these Embercap from behind the bar. Someone left them as payment."',
    turnIn:['"*tucks the salves under the counter carefully* These could save a life someday. Thank you, truly."','"Word spreads when a village takes care of its own.  The Hearthkeepers are grateful."']},
  {id:'q1d',name:'Warden Woodstock',giver:'Holst',loc:'chapel',type:'gather',target:'ironroot_bark',count:6,xp:65,gold:14,items:[],unlock:1,faction:'ashwardens',fRep:15,
    desc:'The Ashwardens need Ironroot Bark to reinforce their watchtower.',hint:'Gather 6 Ironroot Bark from the Ironwood and return to Holst.',
    offer:['"The eastern watchtower\'s rotting through. Ironroot Bark is the only wood that holds up in the ash."','"Six pieces, decent size. The Ironwood\'s not far — just stay on the paths."'],
    onAccept:'"Quick work means the tower gets fixed before the next storm. Move fast."',
    turnIn:['"Solid bark. This\'ll hold for a season at least."','"The Ashwardens appreciate practical help.  Here\'s your share."']},
  {id:'q2',name:'Fortify the Watch',giver:'Holst',loc:'chapel',type:'deliver',target:'firebrew',count:2,xp:150,gold:30,items:['embervein'],unlock:2,faction:'ashwardens',fRep:30,
    desc:'Captain Holst needs Firebrew Elixirs for the night watch.',hint:'Brew 2 Firebrew Elixirs (🍄 Embercap + 🔥 Volcanic Ess.) and return to Holst.',
    offer:['"Sit down, alchemist. I\'ll be direct — the vents are getting worse."','"Last week we lost two patrols to creatures that came up through the ash. My soldiers are brave, but bravery doesn\'t stop venom."','"I need Firebrew — two flasks. The kind that burns hot enough to make those things think twice about crossing our line."'],
    onAccept:'"Good. I don\'t say this lightly — the safety of this village may depend on your cauldron as much as our swords."',
    turnIn:['"Let me test this... *uncorks, sniffs* ...by the forge, that\'ll strip paint off a shield. Perfect."','"The watch will carry these on every patrol. You\'ve given my people a fighting chance."','"Take this Embervein — pulled it from a vent creature myself. And the Ashwardens remember those who help us."']},
  {id:'q2b',name:'Tarn\'s Fungal Study',giver:'Tarn',loc:'chapel',type:'gather',target:'embercap',count:6,xp:90,gold:18,items:['moonpetal'],unlock:2,faction:'veilwalkers',fRep:15,
    desc:'Tarn is researching fungal properties near the Veil.',hint:'Gather 6 Embercap from the Fungal Caves and return to Tarn.',
    offer:['"The fungi near the Veil have unusual properties. I need samples — six good Embercap should suffice."','"The Fungal Caves are damp and dark.  Take care near the deeper chambers."'],
    onAccept:'"Your willingness to aid research speaks well of you. The Veilwalkers notice such things."',
    turnIn:['"*examines each specimen carefully* These are excellent. The luminescence is strong — just what I need."','"Take this Moonpetal — it grew in the research glade. You\'ve earned it."']},
  {id:'q2c',name:'Festival Brew',giver:'Marta',loc:'tavern',type:'deliver',target:'healing_salve',count:3,xp:100,gold:22,items:[],unlock:2,faction:'hearthkeepers',fRep:25,
    desc:'The seasonal festival needs healing supplies on hand.',hint:'Brew 3 Healing Salves and bring them to Marta.',
    offer:['"Festival\'s coming up. Last year someone fell off the bonfire stage and we had nothing for the burns."','"Three Healing Salves should cover us. I don\'t want anyone leaving Cindervale with a bad memory."'],
    onAccept:'"You\'re becoming a real part of this community. That matters more than you know."',
    turnIn:['"Three salves, ready for the festival.  Perfect."','"The Hearthkeepers will make sure everyone knows who provided these."']},
  {id:'q3',name:'Runekeeper\'s Need',giver:'Tarn',loc:'chapel',type:'deliver',target:'enchanters_ink',count:1,xp:120,gold:20,items:['starwort'],unlock:3,faction:'veilwalkers',fRep:25,
    desc:'Tarn\'s protective wards are fading and need Enchanter\'s Ink.',hint:'Brew Enchanter\'s Ink (🌸 Moonpetal + 💎 Hearthstone) and return to Tarn.',
    offer:['"Come closer. Do you see those marks along the doorframe? Those are wards — or they were."','"The ink is fading. Without it, the things that press against the Veil will find cracks. Small ones at first, then..."','"I need Enchanter\'s Ink. Moonpetal and Hearthstone, carefully combined. The old formula. Can you do this?"'],
    onAccept:'"The Veilwalkers will note your willingness. Not many would help with work they don\'t understand."',
    turnIn:['"*holds the vial to candlelight* The silver threads are stable. This is properly made."','"With this, the wards will hold another season. You may have saved lives today without knowing it."','"Take this Starwort — it grew in the glade where the Veil is thinnest. And know that the Veilwalkers consider you a friend."']},
  {id:'q4',name:'Ore for Guild',giver:'Gretta',loc:'chapel',type:'gather',target:'ashite',count:5,xp:130,gold:35,items:[],unlock:3,faction:'cinderfolk',fRep:30,
    desc:'The Cinderfolk need smelting-grade Ashite.',hint:'Gather 5 Ashite Ore — found in Crystal Hollows or Deep Mines. Return to Gretta.',
    offer:['"You look like someone who knows their way around a pick. Or at least around ingredients."','"The Cinderfolk are running low on Ashite — the smelting grade, not that crumbly surface stuff. We need five good pieces."','"Crystal Hollows is your best bet. Watch your footing — the Hollows don\'t forgive clumsiness."'],
    onAccept:'"Solid. Bring them to me here — I\'ll make sure the miners know who helped keep the forges lit."',
    turnIn:['"*weighs each piece* Good density. Clean fracture lines. You\'ve got an eye for ore, alchemist."','"This will keep the smelters running for another week. The Cinderfolk don\'t forget a good turn."','"Payment as promised. And if you ever need access to the deeper veins, you\'re building the right reputation."']},
  {id:'q3b',name:'Night Patrol Refill',giver:'Holst',loc:'chapel',type:'deliver',target:'firebrew',count:1,xp:80,gold:18,items:[],unlock:3,faction:'ashwardens',fRep:15,
    desc:'The night patrol used their last Firebrew.',hint:'Brew 1 Firebrew and return to Holst.',
    offer:['"Quick job. The night patrol used their last flask driving off ash drakes."','"One Firebrew. Standard potency is fine."'],
    onAccept:'"Fast work earns fast pay. The watch appreciates it."',
    turnIn:['"Good.  Patrol goes out at dusk. This\'ll keep them safe."','"Here\'s your coin.  Reliable suppliers are hard to find."']},
  {id:'q3c',name:'Gretta\'s Salve Order',giver:'Gretta',loc:'chapel',type:'deliver',target:'healing_salve',count:3,xp:110,gold:28,items:['ashite'],unlock:3,faction:'cinderfolk',fRep:20,
    desc:'Miners keep getting injured. Gretta needs salves in bulk.',hint:'Brew 3 Healing Salves and return to Gretta.',
    offer:['"Three salves.  Shaft Seven had a rockslide and half my crew is limping."','"The miners respect an alchemist who keeps them working. Three flasks, soon as you can."'],
    onAccept:'"Good.  Every hour matters when people are hurt."',
    turnIn:['"Three salves delivered. That\'s miners back on their feet tomorrow."','"Here — premium Ashite from the deep vein. You\'ve earned it."']},
  {id:'q4b',name:'Veil Ink Surplus',giver:'Tarn',loc:'chapel',type:'deliver',target:'enchanters_ink',count:2,xp:140,gold:30,items:['moonpetal','starwort'],unlock:4,faction:'veilwalkers',fRep:30,
    desc:'The outer wards need reinforcing — Tarn needs more ink.',hint:'Brew 2 Enchanter\'s Ink and return to Tarn.',
    offer:['"The outer wards are weaker than I thought. I need two more flasks of Enchanter\'s Ink."','"The Veil presses harder each season. Without these wards, the village is exposed."'],
    onAccept:'"Every flask of ink is another season of safety. The Veilwalkers are in your debt."',
    turnIn:['"Two flasks. The silver is bright — excellent craftsmanship."','"These Moonpetal and Starwort are from the sacred grove. Take them with our gratitude."']},
  {id:'q4c',name:'Marta\'s Tonic Order',giver:'Marta',loc:'tavern',type:'deliver',target:'ashveil',count:1,xp:100,gold:25,items:[],unlock:4,faction:'hearthkeepers',fRep:20,
    desc:'A regular at the tavern has ash-blindness. Marta needs an Ashveil Tonic.',hint:'Brew 1 Ashveil Tonic (🌿 Ashbloom + 🌸 Moonpetal) and bring it to Marta.',
    offer:['"Old Dorek\'s going ash-blind. Spent too many years near the vents without protection."','"An Ashveil Tonic would clear his sight. He\'s a stubborn man but a good one."'],
    onAccept:'"He\'d never ask for help himself.  This is between us."',
    turnIn:['"*smiles* Dorek will see sunrises again.  You\'ve done a kind thing."','"The Hearthkeepers remember kindness above all else."']},
  {id:'q5',name:'Armor Miners',giver:'Brenna',loc:'market',type:'deliver',target:'ironhide',count:2,xp:160,gold:35,items:['ashite','ashite'],unlock:4,faction:'cinderfolk',fRep:20,
    desc:'Brenna is collecting Ironhide Potions for the mining crews.',hint:'Brew 2 Ironhide Potions (🪵 Ironroot + 🔥 Volcanic Ess.) and return to Brenna.',
    offer:['"Have you heard about the cave-ins? Three this season alone. Gorrik\'s losing people."','"Ironhide Potions — they won\'t stop a collapse, but they\'ll give a miner time to crawl out. I\'m collecting them for the crews."','"Two flasks would make a real difference. Those miners have families, you know."'],
    onAccept:'"You\'re good people. The Cinderfolk won\'t forget this — and neither will I."',
    turnIn:['"Two flasks, just as promised. *packs them carefully* These go straight to Shaft Nine tomorrow morning."','"Gorrik asked me to give you these Ashite chunks as thanks. Good quality — deep mine stock."','"You\'re making a name for yourself, alchemist. The kind of name Cindervale needs."']},
  {id:'q5b',name:'Warden Field Supplies',giver:'Holst',loc:'chapel',type:'deliver',target:'healing_salve',count:4,xp:140,gold:40,items:['embervein'],unlock:5,faction:'ashwardens',fRep:30,
    desc:'Holst needs salves for a multi-day patrol.',hint:'Brew 4 Healing Salves and return to Holst.',
    offer:['"Five-day patrol into the deep ash.  My squad needs four Healing Salves minimum."','"The vents are worse than last season.  We\'re losing ground."'],
    onAccept:'"Four salves, quality work. That\'s all I ask."',
    turnIn:['"Four salves, packed and ready.  My squad leaves at dawn."','"Take this Embervein.  The deep ash gives up its treasures to those who earn them."']},
  {id:'q5c',name:'Cinderfolk Bulk Order',giver:'Gretta',loc:'chapel',type:'deliver',target:'ironhide',count:3,xp:180,gold:50,items:['deep_crystal'],unlock:5,faction:'cinderfolk',fRep:35,
    desc:'The deep mining teams need a full supply of Ironhide Potions.',hint:'Brew 3 Ironhide Potions and return to Gretta.',
    offer:['"We\'re sending crews deeper than ever.  The ore is rich but the rock is unstable."','"Three Ironhide Potions.  One for each team leader.  Non-negotiable safety requirement."'],
    onAccept:'"The Cinderfolk guild takes safety seriously.  You\'re helping us prove it."',
    turnIn:['"Three flasks, all up to standard.  The crews ship out tomorrow."','"A Deep Crystal — the miners found it in a new vein.  Thought you should have the first one."']},
  {id:'q6',name:'Patrol Kit',giver:'Holst',loc:'chapel',type:'multi',targets:['healing_salve','firebrew','ironhide'],xp:250,gold:60,items:['warden_sigil','warden_sigil'],unlock:5,faction:'ashwardens',fRep:50,
    desc:'Holst needs a complete patrol kit for the Ashwardens.',hint:'Deliver 1 Healing Salve + 1 Firebrew + 1 Ironhide Potion to Holst.',
    offer:['"The Ashwardens have been watching you, alchemist. Your work is reliable — and right now, reliable is worth its weight in gold."','"I need a complete kit for my elite patrol: Healing Salve for wounds, Firebrew for offense, Ironhide for protection."','"One of each. My best squad goes into the deep vents next week. I want them coming back."'],
    onAccept:'"You\'ll have the full trust of the Ashwardens if you pull this off. That means something in Cindervale."',
    turnIn:['"*inspects each vial carefully* Salve is clean. Firebrew is potent. Ironhide... solid. This is a proper kit."','"My squad will carry your work into the darkness, alchemist. If they come home alive, it\'s because of you."','"Take these Warden Sigils. You\'ve earned them — and everything that comes with them."']},
  {id:'q6b',name:'Deep Expedition Gear',giver:'Gretta',loc:'chapel',type:'multi',targets:['ironhide','healing_salve'],xp:200,gold:55,items:['embervein','ashite'],unlock:6,faction:'cinderfolk',fRep:40,
    desc:'A deep mining expedition needs potions before they descend.',hint:'Deliver 1 Ironhide Potion + 1 Healing Salve to Gretta.',
    offer:['"Gorrik\'s taking a team into the lower shafts.  Uncharted territory."','"They need an Ironhide and a Salve at minimum.  We don\'t send people into the dark unprepared."'],
    onAccept:'"This expedition could open new veins that keep Cindervale alive for decades."',
    turnIn:['"Gear checked and packed.  The team leaves at first light."','"Here — Embervein and Ashite from the last expedition.  Payment and gratitude."']},
  {id:'q6c',name:'Moonpetal Harvest',giver:'Tarn',loc:'chapel',type:'gather',target:'moonpetal',count:6,xp:160,gold:35,items:['veil_shard'],unlock:6,faction:'veilwalkers',fRep:35,
    desc:'The Moonlit Glade is blooming — Tarn needs specimens.',hint:'Gather 6 Moonpetal from the Moonlit Glade and return to Tarn.',
    offer:['"The Glade is in full bloom — it only happens twice a year.  I need six Moonpetal, carefully harvested."','"The bloom is fragile.  Rough handling destroys the essence."'],
    onAccept:'"A delicate task for skilled hands.  Be gentle in the Glade."',
    turnIn:['"*cradles the petals* Still warm with moonlight.  Exquisite work."','"A Veil Shard — given freely by the Glade itself.  It trusts you now."']},
  {id:'q6d',name:'Festival of Embers',giver:'Marta',loc:'tavern',type:'deliver',target:'firebrew',count:3,xp:170,gold:45,items:[],unlock:6,faction:'hearthkeepers',fRep:35,
    desc:'The Festival of Embers needs traditional Firebrew for the ceremony.',hint:'Brew 3 Firebrew and bring them to Marta.',
    offer:['"The Festival of Embers is Cindervale\'s oldest tradition. We drink Firebrew at sunset to honor the Heartforge."','"Three flasks for the ceremony.  It has to be the real thing — the elders can tell."'],
    onAccept:'"This festival brings the whole village together.  You\'re helping make that happen."',
    turnIn:['"Three flasks of genuine Firebrew.  The festival will be remembered."','"The Hearthkeepers consider you family now.  That\'s the highest honor we give."']},
  {id:'q7',name:'Celestial Remedy',giver:'Tarn',loc:'chapel',type:'deliver',target:'celestial_balm',count:1,xp:300,gold:100,items:['veil_shard','veil_shard'],unlock:7,faction:'veilwalkers',fRep:50,
    desc:'An elder Veilwalker is gravely ill with vein-blight.',hint:'Brew Celestial Balm (⭐ Starwort + 🌸 Moonpetal + 💎 Hearthstone) and return to Tarn.',
    offer:['"I need to ask something difficult of you. Elder Mireth is dying."','"Vein-blight — it runs through the blood like black ice. No ordinary medicine can touch it. But a Celestial Balm might."','"Starwort, Moonpetal, Hearthstone — combined with skill and intention. This is advanced work. The hardest thing I\'ve ever asked of anyone."','"She taught me everything I know. Please."'],
    onAccept:'"*voice breaks slightly* Thank you. The Veilwalkers will owe you a debt beyond gold."',
    turnIn:['"*hands trembling as he takes the vial* The light in it... I can feel the warmth. This is remarkable work."','"I\'m going to her now. If this works — when this works — you will have saved someone irreplaceable."','"These Veil Shards are from Elder Mireth\'s own collection. She would want you to have them. Everything changes now."']},
  {id:'q7b',name:'Warden Elite Kit',giver:'Holst',loc:'chapel',type:'multi',targets:['firebrew','ironhide','ashveil'],xp:280,gold:75,items:['warden_sigil'],unlock:7,faction:'ashwardens',fRep:45,
    desc:'The Ashwarden elite unit needs specialized potions.',hint:'Deliver 1 Firebrew + 1 Ironhide + 1 Ashveil Tonic to Holst.',
    offer:['"My elite unit is going deeper than any patrol before.  They need specialized gear."','"Firebrew for offense, Ironhide for defense, Ashveil for visibility in the deep ash.  One each."'],
    onAccept:'"This squad is the best I have.  Your potions could make the difference."',
    turnIn:['"Elite kit, combat-ready.  My best soldiers carry your work with pride."','"Another Warden Sigil.  You\'re practically one of us now."']},
  {id:'q7c',name:'Guild Master\'s Alloy',giver:'Gretta',loc:'chapel',type:'gather',target:'deep_crystal',count:3,xp:250,gold:80,items:['sacred_ember'],unlock:7,faction:'cinderfolk',fRep:45,
    desc:'The Guild Master needs Deep Crystal for an experimental alloy.',hint:'Gather 3 Deep Crystal from the Deep Mines and return to Gretta.',
    offer:['"The Guild Master wants to forge a new alloy.  Needs Deep Crystal — three pieces, minimum."','"The Deep Mines are dangerous but the crystal there is unlike anything on the surface."'],
    onAccept:'"This alloy could change everything for the Cinderfolk.  We\'re counting on you."',
    turnIn:['"Three crystals, flawless structure.  The Guild Master will be pleased."','"A Sacred Ember — the Guild\'s highest gift.  You\'re part of the Cinderfolk story now."']},
  {id:'q8b',name:'Veil Ward Restoration',giver:'Tarn',loc:'chapel',type:'deliver',target:'enchanters_ink',count:3,xp:280,gold:90,items:['sacred_ember'],unlock:8,faction:'veilwalkers',fRep:50,
    desc:'The ancient wards around Cindervale need complete restoration.',hint:'Brew 3 Enchanter\'s Ink and return to Tarn.',
    offer:['"The wards I\'ve been patching for years... they need full restoration.  Three flasks of ink."','"This is the most important work I\'ve asked of you.  If the wards fail completely..."'],
    onAccept:'"The Veil presses harder every day.  We have weeks, not months."',
    turnIn:['"Three flasks of perfect ink.  The restoration begins tonight."','"A Sacred Ember.  The Veilwalkers\' most treasured offering.  You\'ve earned it."']},
  {id:'q8c',name:'Cindervale Defense',giver:'Holst',loc:'chapel',type:'deliver',target:'firebrew',count:4,xp:300,gold:90,items:['warden_sigil','warden_sigil'],unlock:8,faction:'ashwardens',fRep:55,
    desc:'Ash drakes are massing. Holst needs maximum Firebrew stockpile.',hint:'Brew 4 Firebrew and return to Holst.',
    offer:['"Something\'s stirring in the deep vents.  More ash drakes than I\'ve ever seen."','"Four Firebrew.  Every patrol, every watchtower, fully armed.  This is not a drill."'],
    onAccept:'"Cindervale may be under attack within days.  Brew fast."',
    turnIn:['"Four flasks.  The full garrison is armed.  Whatever\'s coming, we\'ll be ready."','"Two more Warden Sigils.  If we survive this, the Ashwardens owe you everything."']},
  {id:'q8d',name:'Hearthkeeper\'s Blessing',giver:'Marta',loc:'tavern',type:'multi',targets:['healing_salve','ashveil','celestial_balm'],xp:320,gold:100,items:['sacred_ember'],unlock:8,faction:'hearthkeepers',fRep:50,
    desc:'Marta needs potions for the Hearthkeepers\' blessing ceremony.',hint:'Deliver 1 Healing Salve + 1 Ashveil Tonic + 1 Celestial Balm to Marta.',
    offer:['"The Hearthkeepers\' Blessing — the most sacred ceremony in Cindervale."','"We need a Healing Salve for mending, Ashveil for clarity, and Celestial Balm for hope.  One each."','"This ceremony hasn\'t been performed in a generation.  Not since the Heartforge went cold."'],
    onAccept:'"You\'re the reason we can do this again.  Don\'t you see?  Cindervale is coming alive."',
    turnIn:['"*tears in her eyes* A complete offering. The ceremony can begin."','"A Sacred Ember from the Hearthkeepers\' vault. The last one. It belongs with you now."']},
  {id:'q8',name:'Rekindle Heartforge',giver:'Tarn',loc:'chapel',type:'deliver',target:'forge_catalyst',count:1,xp:500,gold:200,items:[],unlock:9,faction:null,fRep:0,
    desc:'The ancient Heartforge has been cold for a generation. A Forge Catalyst could reignite it.',hint:'Brew the legendary Forge Catalyst (🍄 Embercap + 💎 Hearthstone + 🔥 Volcanic Ess.) — DC 20. Return to Tarn.',
    offer:['"Sit down. What I\'m about to tell you, I\'ve never told anyone outside the Veilwalkers."','"The Heartforge — the one beneath the village, the one everyone thinks is dead — it isn\'t dead. It\'s sleeping."','"A Forge Catalyst, brewed with enough skill and power, could wake it. The legends say it was the source of everything Cindervale ever was."','"This is the work you were brought here for, alchemist. I believe that now. Will you try?"'],
    onAccept:'"Then the fate of Cindervale rests in your hands. No pressure. *almost smiles* Go. Brew something legendary."',
    turnIn:['"*takes the Catalyst with both hands* It pulses. Can you feel that? The ground is humming."','"All these years, waiting for someone with the skill and the heart to make this. You did it."','"Come. We go to the Heartforge now. Together. Cindervale\'s story isn\'t ending — it\'s beginning again."']},

  // ═══ FACTION CHAIN QUESTS ═══
  // — Ashwardens Chain (Holst) —
  {id:'fc_ash1',name:'The Outer Perimeter',giver:'Holst',loc:'chapel',type:'deliver',target:'warden_ward',count:2,xp:200,gold:45,items:['warden_sigil'],unlock:4,faction:'ashwardens',fRep:40,chain:'ashwardens',fReq:2,reqQuest:null,
    desc:'Holst wants to extend the Ashwarden patrol route but needs protective wards for the new perimeter.',hint:'Brew 2 Warden\'s Wards and return to Holst.',
    offer:['"I\'ve been watching you, alchemist. You\'ve done right by the Wardens more than once."','"There\'s a stretch of road between the eastern vents and the Moonlit Glade. Unprotected. Creatures slip through at night."','"Two Warden\'s Wards, properly made, and I can secure that whole stretch."','"This is the Ashwardens asking for your help directly. Will you answer?"'],
    onAccept:'"Good. The patrol teams will feel safer knowing you\'re on this. Take this Sigil."',
    turnIn:['"*plants the first ward, watches it pulse with light* Perfect resonance."','"The eastern road is secure. For the first time in three years."','"You\'ve earned the respect of every Warden who walks that route."']},
  {id:'fc_ash2',name:'Something in the Deep',giver:'Holst',loc:'chapel',type:'multi',targets:['ironhide','firebrew','firebrew'],xp:350,gold:90,items:['warden_sigil','warden_sigil'],unlock:6,faction:'ashwardens',fRep:65,chain:'ashwardens',fReq:3,reqQuest:'fc_ash1',
    desc:'Ashwarden scouts found something unsettling in deep tunnels. Holst needs supplies for an investigation team.',hint:'Deliver 1 Ironhide Potion and 2 Firebrews to Holst.',
    offer:['"Sit down. Close the door."','"My scouts found something in the tunnels below Shaft Twelve. Markings on the walls. Older than Cindervale."','"I\'m sending a team down. An Ironhide for the lead scout, two Firebrews to keep the cold at bay."','"The Ashwardens don\'t leave unknowns at their backs."'],
    onAccept:'"The team moves at first light. Have the potions ready."',
    turnIn:['"The team\'s back. Alive, thanks to your potions."','"What they found... it changes things. It changes what the Wardens need to protect."','"Take these Sigils. You\'ve proven yourself more than a supplier."']},
  {id:'fc_ash3',name:'The Warden\'s Oath',giver:'Holst',loc:'chapel',type:'multi',targets:['warden_ward','warden_ward','ironhide','ironhide'],xp:500,gold:160,items:['warden_sigil','warden_sigil','warden_sigil'],unlock:7,faction:'ashwardens',fRep:100,chain:'ashwardens',fReq:4,reqQuest:'fc_ash2',
    desc:'Holst is fortifying Cindervale\'s defenses. He needs a full field kit: wards and armor potions.',hint:'Deliver 2 Warden\'s Wards and 2 Ironhide Potions to Holst.',
    offer:['"What the scouts found below Shaft Twelve is a sealed passage. Something behind it. Something old."','"I\'m preparing. Every Warden station needs full supplies."','"Two Warden\'s Wards for the posts. Two Ironhide potions for the sentries."','"After this, I\'d trust you with the Warden\'s Oath itself."'],
    onAccept:'"For Cindervale. For the people who sleep safely because we don\'t."',
    turnIn:['"*lines up the wards and potions* A full field kit. Professional-grade."','"You carry the Ashwarden mark now. When the time comes, we stand together."']},
  // — Hearthkeepers Chain (Marta) —
  {id:'fc_hk1',name:'The Pilgrim\'s Remedy',giver:'Marta',loc:'tavern',type:'deliver',target:'healing_salve',count:3,xp:180,gold:40,items:['sacred_ember'],unlock:4,faction:'hearthkeepers',fRep:40,chain:'hearthkeepers',fReq:2,reqQuest:null,
    desc:'A group of sick pilgrims has arrived. Marta needs healing salves urgently.',hint:'Brew 3 Healing Salves and bring them to Marta.',
    offer:['"A caravan arrived this morning. Pilgrims, heading for the old shrine."','"Three of them are sick. The kind that gets worse before it gets better."','"Three Healing Salves should pull them through. Will you help?"'],
    onAccept:'"Bless you. The youngest one reminds me of my daughter. Please hurry."',
    turnIn:['"*applies the salve* The fever\'s already breaking."','"The pilgrims are asking for the name of the alchemist who saved them."','"Take this Sacred Ember. The Hearthkeepers give these to those who tend the flame of kindness."']},
  {id:'fc_hk2',name:'The Sacred Flame',giver:'Marta',loc:'tavern',type:'deliver',target:'holy_flame',count:1,xp:320,gold:80,items:['sacred_ember','sacred_ember'],unlock:6,faction:'hearthkeepers',fRep:65,chain:'hearthkeepers',fReq:3,reqQuest:'fc_hk1',
    desc:'The eternal flame in the chapel has been dimming. A Holy Flame could restore it.',hint:'Brew a Holy Flame and bring it to Marta.',
    offer:['"Have you seen the chapel flame lately? It used to light the whole square."','"It\'s been dimming for months. The elders say it mirrors the village\'s health."','"A Holy Flame, brewed with Sacred Ember, could restore it. This is sacred work."'],
    onAccept:'"The recipe is old, but you have the skill. The flame believes in you."',
    turnIn:['"*carries the flame to the chapel, places it at the base of the eternal fire*"','"The whole square is glowing again. The children came running."','"*wipes eyes* Thank you, alchemist. Truly."']},
  {id:'fc_hk3',name:'Keeper\'s Devotion',giver:'Marta',loc:'tavern',type:'multi',targets:['holy_flame','holy_flame','celestial_balm'],xp:500,gold:160,items:['sacred_ember','sacred_ember','sacred_ember'],unlock:7,faction:'hearthkeepers',fRep:100,chain:'hearthkeepers',fReq:4,reqQuest:'fc_hk2',
    desc:'Marta wants to establish a permanent healing station in Cindervale.',hint:'Deliver 2 Holy Flames and 1 Celestial Balm to Marta.',
    offer:['"Since you restored the chapel flame, people have been coming to me. Asking for help."','"I want to build a healing station. Right here at the tavern. Medicine for anyone who needs it."','"Two Holy Flames to keep it purified. One Celestial Balm for the most desperate cases."','"If you do this, the Hearthkeepers will name you one of their own."'],
    onAccept:'"The Hearthkeepers don\'t ask for miracles. But you\'ve been making them anyway."',
    turnIn:['"*arranges the flames on either side of the new healing station*"','"Cindervale has a proper healing station for the first time in twenty years. Because of you."','"You are a Keeper now. In name, in truth, in every way that matters."']},
  // — Veilwalkers Chain (Tarn) —
  {id:'fc_vw1',name:'The Thinning Veil',giver:'Tarn',loc:'chapel',type:'deliver',target:'enchanters_ink',count:2,xp:180,gold:40,items:['veil_shard'],unlock:4,faction:'veilwalkers',fRep:40,chain:'veilwalkers',fReq:2,reqQuest:null,
    desc:'Tarn has detected weak points in the protective wards around Cindervale.',hint:'Brew 2 Enchanter\'s Ink and bring them to Tarn.',
    offer:['"Come closer. Do you feel that? A draft, but not from any window."','"The Veil is thinning. The wards around Cindervale are cracking."','"I need Enchanter\'s Ink to reinforce them. Two flasks, properly made."','"If the wards fail completely... let\'s make sure they don\'t."'],
    onAccept:'"You have steady hands and a clear mind. Don\'t rush it."',
    turnIn:['"*holds the ink to candlelight, watches silver threads spiral* Good. Very good."','"I\'ll begin repairs tonight. By morning, the wards will hold another season."','"Take this Veil Shard. Consider it a token of trust."']},
  {id:'fc_vw2',name:'Eyes Beyond',giver:'Tarn',loc:'chapel',type:'deliver',target:'veil_sight',count:1,xp:320,gold:80,items:['veil_shard','veil_shard'],unlock:6,faction:'veilwalkers',fRep:65,chain:'veilwalkers',fReq:3,reqQuest:'fc_vw1',
    desc:'Tarn needs a Veil Sight potion to investigate something he sensed beyond the wards.',hint:'Brew a Veil Sight potion and bring it to Tarn.',
    offer:['"When I repaired the wards, I saw something. Through the cracks, before they closed."','"Something watching. Something old. Not hostile, but curious."','"A Veil Sight potion would open my eyes to what lies beyond."','"This is Veilwalker business. Dangerous business. But I trust you."'],
    onAccept:'"Veil Shard, Moonpetal, Gloomcap. Brew it true."',
    turnIn:['"*drinks the potion, closes eyes*"','"I see it. A presence, vast and ancient, dreaming beneath the mountain."','"These Shards are from the deep Veil. You\'ve earned the right to see what we see."']},
  {id:'fc_vw3',name:'The Veilseer\'s Trial',giver:'Tarn',loc:'chapel',type:'multi',targets:['veil_sight','veil_sight','enchanters_ink','enchanters_ink'],xp:500,gold:160,items:['veil_shard','veil_shard','veil_shard'],unlock:7,faction:'veilwalkers',fRep:100,chain:'veilwalkers',fReq:4,reqQuest:'fc_vw2',
    desc:'Tarn is preparing a ritual to strengthen the ancient wards permanently.',hint:'Deliver 2 Veil Sight potions and 2 Enchanter\'s Ink to Tarn.',
    offer:['"There\'s a ritual that can bind the wards permanently."','"Two Veil Sight potions to open the way, two Enchanter\'s Ink to seal it."','"If this works, the Veil around Cindervale will hold for a hundred years."','"You\'d be the first non-Veilwalker to participate in a binding ritual."'],
    onAccept:'"Prepare the potions with care. When the ritual begins, there\'s no stopping it."',
    turnIn:['"*the ritual circle glows silver-white*"','"The wards are permanent now. The ancient presence watches respectfully from a distance."','"You are Veilseer now. The old ones would be proud."']},
  // — Cinderfolk Chain (Gretta) —
  {id:'fc_cf1',name:'Shaft Nine Rescue',giver:'Gretta',loc:'chapel',type:'deliver',target:'ironhide',count:2,xp:180,gold:45,items:['deep_crystal'],unlock:4,faction:'cinderfolk',fRep:40,chain:'cinderfolk',fReq:2,reqQuest:null,
    desc:'Miners in Shaft Nine are trapped. Ironhide potions will protect the rescue team.',hint:'Brew 2 Ironhide Potions and bring them to Gretta.',
    offer:['"Bad news from the mines. Shaft Nine collapsed. Three miners trapped."','"The rescue team is ready but the tunnel\'s unstable."','"Ironhide potions. Two of them. Enough to keep the rescuers alive."','"Every minute counts. Can you do this?"'],
    onAccept:'"Fast as you can. The air down there won\'t last forever."',
    turnIn:['"*hands the potions to the rescue team, who disappear into the shaft*"','"They\'re out. All three. The Ironhide held when the second collapse hit."','"You saved three lives. The Cinderfolk pay their debts. Take this Deep Crystal."']},
  {id:'fc_cf2',name:'The Deep Crystal Vein',giver:'Gretta',loc:'chapel',type:'gather',target:'deep_crystal',count:4,xp:320,gold:80,items:['deep_crystal','deep_crystal'],unlock:6,faction:'cinderfolk',fRep:65,chain:'cinderfolk',fReq:3,reqQuest:'fc_cf1',
    desc:'A new Deep Crystal vein needs an alchemist\'s careful hands to extract safely.',hint:'Gather 4 Deep Crystals from Crystal Hollow and return to Gretta.',
    offer:['"The rescue opened up something unexpected. A new vein. Deep Crystals, pure as starlight."','"Regular miners would shatter them. An alchemist\'s touch is what we need."','"Four crystals. Enough to prove the vein is viable."','"The Cinderfolk don\'t share their veins with outsiders. You\'re the exception."'],
    onAccept:'"Crystal Hollow. The deep tunnels. Be careful."',
    turnIn:['"*holds each crystal to the light* Flawless. Every one."','"The guild is going to lose their minds. Richest vein in a generation."','"Take these crystals. Your finder\'s share."']},
  {id:'fc_cf3',name:'Stone Sibling\'s Forge',giver:'Gretta',loc:'chapel',type:'multi',targets:['ironhide','ironhide','ironhide','forge_catalyst'],xp:550,gold:180,items:['deep_crystal','deep_crystal','deep_crystal'],unlock:8,faction:'cinderfolk',fRep:100,chain:'cinderfolk',fReq:4,reqQuest:'fc_cf2',
    desc:'Gretta wants to reopen the old Cinderfolk forge. She needs heavy-duty supplies.',hint:'Deliver 3 Ironhide Potions and 1 Forge Catalyst to Gretta.',
    offer:['"The old Cinderfolk forge. Not the Heartforge. Where we used to shape the mountain itself."','"It\'s been sealed since my grandfather\'s time. But with the new vein, we have reason to reopen it."','"Three Ironhide for the crew. One Forge Catalyst to restart the furnace."','"This is the biggest thing to happen to the Cinderfolk in a lifetime."'],
    onAccept:'"When that forge lights up, the whole mountain will know."',
    turnIn:['"*the furnace roars to life, orange light flooding the chamber*"','"Listen. The mountain is singing. It\'s been waiting for this."','"Stone Sibling. That\'s what we call those who share the mountain\'s fire. That\'s you now."']},

  // ═══ ASHFALL CROSSING QUESTS ═══
  {id:'aq1',name:'Sola\'s Sunburn',giver:'Sola',loc:'market',type:'deliver',target:'sunstroke_tonic',count:1,xp:80,gold:20,items:['dustite','dustite'],unlock:0,faction:null,fRep:0,
    desc:'Sola needs relief from desert sickness.',hint:'Brew a Sunstroke Tonic and return to Sola.',
    offer:['"The sun out here doesn\'t just burn \u2014 it breaks you down."','"I need something for heat sickness. Can you manage it?"'],
    turnIn:['"*drinks deeply* Oh, that\'s good. I can feel my head clearing."']},
  {id:'aq2',name:'Obsidian Arms',giver:'Razak',loc:'market',type:'deliver',target:'obsidian_edge_oil',count:2,xp:120,gold:40,items:['obsidian_shard','obsidian_shard','obsidian_shard'],unlock:2,faction:'sand_merchants',fRep:15,
    desc:'Razak needs Obsidian Edge Oil for a guild contract.',hint:'Brew 2 Obsidian Edge Oil.',
    offer:['"The Guild has a contract \u2014 fifty blades, all obsidian-edged."','"Two flasks. Can you deliver?"'],
    turnIn:['"Perfect viscosity. The Guild will be pleased."']},
  {id:'aq3',name:'Oasis Pilgrimage',giver:'Amara',loc:'chapel',type:'deliver',target:'brine_poultice',count:3,xp:150,gold:35,items:['dewdrop_lily','dewdrop_lily'],unlock:2,faction:'flamekeepers',fRep:20,
    desc:'Keeper Amara needs poultices for injured pilgrims.',hint:'Brew 3 Brine Poultices.',
    offer:['"The pilgrims arrive sunburned, blistered, half-dead."','"Three Brine Poultices. The Flamekeepers remember those who serve."'],
    turnIn:['"See? Already the swelling recedes. The Flamekeepers are grateful."']},
  {id:'aq4',name:'Desert Navigation',giver:'Tarek',loc:'tavern',type:'deliver',target:'sandveil_draught',count:2,xp:130,gold:45,items:['sandsilk'],unlock:3,faction:'dustwalkers',fRep:20,
    desc:'Scout Tarek needs Sandveil Draughts for scouting.',hint:'Brew 2 Sandveil Draughts.',
    offer:['"There\'s a sandstorm belt between here and the old temple."','"Two Sandveil Draughts and my scouts can slip through."'],
    turnIn:['"Clear as morning. This will do perfectly."']},
  {id:'aq5',name:'Antivenom Supply',giver:'Sola',loc:'market',type:'deliver',target:'venom_antidote',count:3,xp:200,gold:80,items:['venomgland','venomgland'],unlock:4,faction:null,fRep:0,reqQuest:'aq1',
    desc:'Sola needs antidotes \u2014 sandworm attacks increasing.',hint:'Brew 3 Venom Antidotes.',
    offer:['"The worms are getting bolder. Three guards bitten last week."'],
    turnIn:['"Three antidotes. Three lives saved."']},

  // ═══ ASHFALL EXPANSION QUESTS ═══
  {id:'aq6',name:'Market Day Supply',giver:'Razak',loc:'market',type:'deliver',target:'obsidian_varnish',count:2,xp:140,gold:50,items:['obsidian_shard','obsidian_shard'],unlock:3,faction:'sand_merchants',fRep:20,
    desc:'Razak needs Obsidian Varnish for the market day weapon display.',hint:'Brew 2 Obsidian Varnish.',
    offer:['"Market day is coming. Every blade on display needs to shine."','"Two flasks of Obsidian Varnish. The Guild pays well for presentation."'],
    turnIn:['"*applies varnish to a blade, which gleams like black mirror* Perfect."']},
  {id:'aq7',name:'Pilgrim Relief',giver:'Amara',loc:'chapel',type:'deliver',target:'desert_balm',count:4,xp:180,gold:45,items:['dewdrop_lily','dewdrop_lily','dewdrop_lily'],unlock:3,faction:'flamekeepers',fRep:25,
    desc:'Keeper Amara needs Desert Balm for the next pilgrim caravan.',hint:'Brew 4 Desert Balm.',
    offer:['"The summer caravan is due in three days. Forty pilgrims, all sun-beaten."','"Four Desert Balms. We cannot turn them away empty-handed."'],
    turnIn:['"The pilgrims will remember your kindness, alchemist."']},
  {id:'aq8',name:'Scout Supplies',giver:'Tarek',loc:'tavern',type:'deliver',target:'salt_tonic',count:3,xp:120,gold:40,items:['crystal_salt','crystal_salt','crystal_salt'],unlock:2,faction:'dustwalkers',fRep:15,
    desc:'Scout Tarek needs Salt Tonics for a deep desert patrol.',hint:'Brew 3 Salt Tonics.',
    offer:['"My scouts are heading into the deep dunes. Three days, no shade."','"Salt Tonics keep them functional. Three flasks."'],
    turnIn:['"My scouts will drink well. The desert won\'t claim them today."']},
  {id:'aq9',name:'The Silk Merchant',giver:'Razak',loc:'market',type:'deliver',target:'silk_bandage_kit',count:3,xp:200,gold:80,items:['sandsilk','sandsilk'],unlock:4,faction:'sand_merchants',fRep:30,reqQuest:'aq2',
    desc:'A wealthy merchant wants Silk Bandage Kits for an expedition.',hint:'Brew 3 Silk Bandage Kits.',
    offer:['"A caravan master is outfitting a deep desert expedition."','"Three Silk Bandage Kits. He\'ll pay triple for quality."'],
    turnIn:['"The caravan master sends his regards. And his gold."']},
  {id:'aq10',name:'Sacred Incense',giver:'Amara',loc:'chapel',type:'deliver',target:'temple_incense',count:2,xp:220,gold:70,items:['ancient_resin','ancient_resin'],unlock:6,faction:'flamekeepers',fRep:35,reqQuest:'aq3',
    desc:'The Flamekeepers need Temple Incense for the Solstice Rite.',hint:'Brew 2 Temple Incense.',
    offer:['"The Solstice approaches. Without proper incense, the rite cannot proceed."','"Two flasks of Temple Incense. The fate of our tradition rests on this."'],
    turnIn:['"*lights the incense, golden smoke spirals upward* The flame burns eternal."']},
  {id:'aq11',name:'Mirage Defense',giver:'Tarek',loc:'tavern',type:'deliver',target:'mirage_bomb',count:2,xp:200,gold:75,items:['mirage_dust','mirage_dust'],unlock:5,faction:'dustwalkers',fRep:30,reqQuest:'aq4',
    desc:'Scout Tarek needs Mirage Bombs to defend against raiders.',hint:'Brew 2 Mirage Bombs.',
    offer:['"Raiders from the east have been hitting our supply lines."','"Two Mirage Bombs will buy my scouts the confusion they need to escape."'],
    turnIn:['"These will save lives. The Dustwalkers remember their debts."']},
  {id:'aq12',name:'Deep Desert Cache',giver:'Sola',loc:'market',type:'deliver',target:'sandworm_antitoxin',count:4,xp:280,gold:100,items:['venomgland','venomgland','venomgland'],unlock:6,faction:null,fRep:0,reqQuest:'aq5',
    desc:'Sola is stocking emergency caches along the caravan routes.',hint:'Brew 4 Sandworm Antitoxins.',
    offer:['"I\'m placing emergency caches every ten leagues along the southern route."','"Four Antitoxins per cache. This is the first one."'],
    turnIn:['"Cache Alpha is stocked. You just made the southern route survivable."']},
  {id:'aq13',name:'Temple Restoration',giver:'Amara',loc:'chapel',type:'deliver',target:'temple_restoration',count:1,xp:300,gold:120,items:['temple_gold','temple_gold'],unlock:8,faction:'flamekeepers',fRep:50,reqQuest:'aq10',
    desc:'The Flamekeepers have found a damaged shrine deep in the Buried Temple.',hint:'Brew 1 Temple Restoration Elixir.',
    offer:['"Our scouts found something in the Buried Temple. A shrine, older than the crossing itself."','"One Temple Restoration Elixir could bring it back to life."','"This is the most important thing I have ever asked of anyone."'],
    turnIn:['"*the shrine glows with renewed light* ...it\'s beautiful. The ancient flame still burns."','"You have done what no alchemist in a thousand years could do."']},
  {id:'aq14',name:'The Oasis Blessing',giver:'Amara',loc:'chapel',type:'deliver',target:'oasis_blessing',count:1,xp:400,gold:200,items:['temple_gold','deep_crystal','deep_crystal'],unlock:9,faction:'flamekeepers',fRep:60,reqQuest:'aq13',
    desc:'The ultimate Flamekeeper quest: brew the legendary Oasis Blessing.',hint:'Brew 1 Oasis Blessing.',
    offer:['"There is one recipe spoken of only in whispers. The Oasis Blessing."','"They say it can create water from nothing. Heal any wound. Restore any ruin."','"If anyone can brew it, alchemist... it\'s you."'],
    turnIn:['"*holds the flask, tears streaming* Do you understand what you\'ve done?"','"You\'ve given the desert hope. True, liquid, impossible hope."','"The Flamekeepers will sing your name for a thousand years."']},
];
var NPCS={
  brenna:{name:'Brenna',loc:'market',icon:'🧑‍🌾',title:'Market Keeper',
    portrait:{bg:['#5a7247','#3d5230'],ring:'#8aaa70',accent:'#c4956a'},
    lines:['"Cindervale used to be something, you know. Before the Heartforge went cold. I still remember the light from the vents."','"Ashbloom and Hearthstone — that\'s how every good alchemist starts. Simple ingredients, simple cures, honest work."','"The Cinderfolk bring ore, the Ashwardens keep watch, and I keep everyone fed and supplied. That\'s how a village works."','"My grandmother ran this stall before me. Said the Market was the heart of Cindervale, even more than the Forge."','"You\'re different from the last alchemist who came through. They didn\'t stay. I have a feeling you will."']},
  tarn:{name:'Tarn',loc:'chapel',icon:'🧙',title:'Runekeeper · Veilwalker Elder',
    portrait:{bg:['#2d2450','#1a1535'],ring:'#7b68c4',accent:'#9b7fc4'},
    lines:['"The Heartforge sleeps, but it dreams. I can feel it through the stone some nights."','"The Veilwalkers have kept watch for three generations. Waiting for someone who could brew the Catalyst."','"Knowledge is fragile. One lost recipe, one forgotten technique, and the whole chain breaks."','"The Veil between worlds is thinner here than anywhere else. That\'s what makes Cindervale special — and dangerous."','"I\'ve read every text in the archive. The answer is always the same: the Heartforge must burn again."']},
  holst:{name:'Holst',loc:'chapel',icon:'⚔️',title:'Captain of the Ashwardens',
    portrait:{bg:['#5c2020','#3a1515'],ring:'#cc5544',accent:'#cc5544'},
    lines:['"The vents are more active every season. Something down there is waking up, and my soldiers are the only thing between it and this village."','"Ironhide saves lives. I\'ve seen a potion turn a killing blow into a bad bruise. Never underestimate good alchemy."','"The Ashwardens don\'t give trust easily. We earn it in blood and ash. But those who earn it find us loyal to the last."','"I was born in Cindervale. I\'ll die here too, if that\'s what it takes. But I\'d rather live to see it bloom again."']},
  marta:{name:'Marta',loc:'tavern',icon:'🍺',title:'Tavern Keeper · Hearthkeeper',
    lines:['"Part tavern, part chapel — that\'s how we do things in Cindervale. A warm drink and a warm prayer go hand in hand."','"My niece Wren has nimble fingers. If you need help in the workshop, she\'d love the work."','"The Ember & Anvil has stood since before the Heartforge went cold. These walls have stories in them."','"Keep the faith, alchemist. Cindervale has survived worse than this. Probably."']},
  gretta:{name:'Gretta',loc:'chapel',icon:'⛏️',title:'Cinderfolk Guild Representative',
    portrait:{bg:['#4a4040','#2e2828'],ring:'#aa8866',accent:'#aa8866'},
    lines:['"The deep mines hold more than ore. There are crystals down there that sing if you listen right."','"Earn the Cinderfolk\'s trust and we\'ll show you veins that haven\'t been touched in fifty years."','"Mining is honest work. You put in effort, the stone gives back. Simple as that."','"My crew pulled a Deep Crystal last week — first one in months. The deep veins are coming alive again."']},
  // ═══ ASHFALL CROSSING NPCs ═══
  sola:{name:'Sola',loc:'market',icon:'💂',title:'Caravan Guard Captain',
    portrait:{bg:['#6a5a30','#4a3a20'],ring:'#c0a040',accent:'#d0b060'},
    lines:['"The desert takes everything that isn\'t bolted down. Including people, if you\'re not careful."','"I\'ve run caravans across the Scorchlands for fifteen years. Lost count of the sandstorms."','"A good alchemist is worth ten guards out here. Potions keep my people alive."','"Ashfall Crossing is rough, but it\'s honest. Everyone here earned their place."']},
  razak:{name:'Razak',loc:'market',icon:'⚒️',title:'Guild Weaponsmith',
    portrait:{bg:['#4a3a3a','#2e2020'],ring:'#c06040',accent:'#d08060'},
    lines:['"Obsidian-edged blades. That\'s what the Guild wants. That\'s what I make."','"Your oils make the difference between a blade that cuts and a blade that shatters."','"The Sand Merchants Guild controls every trade route through the crossing. Best to stay on their good side."','"I\'ve been smithing since before you were born, alchemist. But I can\'t do it without good reagents."']},
  amara:{name:'Keeper Amara',loc:'chapel',icon:'🕯️',title:'Flamekeeper High Priestess',
    portrait:{bg:['#5a2a1a','#3a1a0a'],ring:'#d06030',accent:'#ff8040'},
    lines:['"The Sacred Flame has burned since the founding. It will burn long after we are dust."','"Pilgrims come from across the desert seeking healing. We turn no one away."','"The Flamekeepers remember. We remember the old ways, the old recipes, the old promises."','"Your craft serves the flame, alchemist. Every potion you brew is a prayer answered."']},
  tarek:{name:'Scout Tarek',loc:'tavern',icon:'🧭',title:'Dustwalker Pathfinder',
    portrait:{bg:['#4a4030','#2e2a1a'],ring:'#8a7050',accent:'#a09060'},
    lines:['"The desert has paths. You just need to know where to look."','"My scouts mapped every dune, every canyon, every oasis within fifty leagues."','"The Dustwalkers don\'t fight the desert. We move with it. That\'s how we survive."','"There are ruins out there older than any kingdom. The Buried Temple is just the beginning."']},
};var SHOP_I=[
  // Ashfall ingredients
  {id:'sunpetal',price:5},{id:'dustite',price:7},{id:'scorchroot',price:6},{id:'crystal_salt',price:8},{id:'brine_moss',price:10},{id:'obsidian_shard',price:12},
  // Cindervale ingredients
  {id:'ashbloom',price:5},{id:'embercap',price:8},{id:'hearthstone',price:14},{id:'ironroot_bark',price:7},{id:'moonpetal',price:16},{id:'gloomcap',price:12},{id:'volcanic_essence',price:20},{id:'char_root',price:3},{id:'wind_dust',price:4},{id:'bark_resin',price:6},{id:'ash_salt',price:4},{id:'cinder_moss',price:5},{id:'ember_petal',price:3},{id:'soot_crystal',price:4},{id:'amber_sap',price:6},{id:'beetle_shell',price:7},{id:'echo_fungus',price:9},{id:'ghost_silk',price:11}];
var H_EVENTS=[
  // Simple events (no check) — generic
  {prob:0.025,text:'You stumble upon a hidden cache beneath a fallen log — someone\'s forgotten stash!',effect:'bonus',good:true},
  // Cindervale faction events
  {prob:0.012,text:'A Cinderfolk prospector shares their water and points out a rich vein nearby.',effect:'bonus',good:true,loc:'cindervale'},
  {prob:0.01,text:'Cinderfolk miners wave you over — they\'ve found specimens they can\'t use but you can.',effect:'bonus',good:true,loc:'cindervale'},
  {prob:0.01,text:'You discover a small shrine to Moradin nestled among the roots. You pause to pay respects.',effect:'rep',good:true,faction:'hearthkeepers',loc:'cindervale'},
  {prob:0.01,text:'An Ashwarden patrol recognizes you and nods in approval. "Good to see civilians contributing."',effect:'rep',good:true,faction:'ashwardens',loc:'cindervale'},
  {prob:0.01,text:'Veilwalker runes on a nearby stone pulse faintly as you pass. The Veil is thin here.',effect:'rep',good:true,faction:'veilwalkers',loc:'cindervale'},
  {prob:0.008,text:'A rare ember salamander crosses your path — they\'re considered good luck in Cindervale.',effect:'bonus_xp',good:true,loc:'cindervale'},
  // Ashfall faction events
  {prob:0.012,text:'A Sand Merchant caravan guard shares dried fruit and tips about nearby ingredient caches.',effect:'bonus',good:true,loc:'ashfall'},
  {prob:0.01,text:'Dustwalker scouts mark a safe path through the dunes for you. Their markers lead to a rich vein.',effect:'bonus',good:true,loc:'ashfall'},
  {prob:0.01,text:'You find a Flamekeeper prayer stone glowing with warmth. You pause to rest beside it.',effect:'rep',good:true,faction:'flamekeepers',loc:'ashfall'},
  {prob:0.01,text:'A Sand Merchant drops a pouch of rare samples as thanks for your trade reputation.',effect:'rep',good:true,faction:'sand_merchants',loc:'ashfall'},
  {prob:0.01,text:'Dustwalker trail signs lead you to a hidden spring. Their wayfinding saves you hours.',effect:'rep',good:true,faction:'dustwalkers',loc:'ashfall'},
  {prob:0.008,text:'A golden desert scarab scurries past — the Flamekeepers say it\'s a sign of blessing.',effect:'bonus_xp',good:true,loc:'ashfall'},
  // Skill check events
  {prob:0.025,text:'An ash drake bursts from the undergrowth!',check:{skill:'endurance',dc:10},
    successText:'You hold your ground and the creature retreats, scattering ingredients in its wake.',successEffect:'bonus',
    failText:'You scramble to safety, dropping gathered materials in the panic.',failEffect:'lose_some'},
  {prob:0.02,text:'A sudden ash storm rolls in, reducing visibility to nothing.',check:{skill:'endurance',dc:11},
    successText:'You hunker down and wait it out — your supplies stay dry.',successEffect:'none',
    failText:'The wind scatters your gathered materials across the ash.',failEffect:'lose_some'},
  {prob:0.015,text:'Toxic fumes seep from a crack in the ground ahead.',check:{skill:'endurance',dc:12},
    successText:'You hold your breath and push through safely — and spot rare specimens on the other side!',successEffect:'bonus',
    failText:'The fumes sting your eyes. You retreat, losing precious time.',failEffect:'lose_time'},
  {prob:0.012,text:'You spot something glinting inside a narrow crevice.',check:{skill:'precision',dc:11},
    successText:'Careful fingers extract a hidden cache of ingredients!',successEffect:'bonus',
    failText:'Your hand slips and the cache tumbles deeper. Nothing gained.',failEffect:'none'},
  {prob:0.012,text:'An old herbalist\'s trail marker points toward an overgrown path.',check:{skill:'research',dc:10},
    successText:'You decipher the marks — they lead to a bountiful patch! You learn something too.',successEffect:'bonus_xp',
    failText:'The markings are too faded. You follow the path but find nothing special.',failEffect:'none'},
  {prob:0.012,text:'You notice strange patterns in the rock face — could be a vein of rare material.',check:{skill:'attunement',dc:12},
    successText:'Your intuition was right! A hidden vein yields extra material.',successEffect:'bonus',
    failText:'Just an odd coloring. Nothing useful here.',failEffect:'none'},
  {prob:0.01,text:'A collapsed tunnel blocks your usual path.',check:{skill:'endurance',dc:13},
    successText:'You muscle through the debris and find untouched specimens beyond.',successEffect:'bonus',
    failText:'You\'re forced to find a way around, losing an hour.',failEffect:'lose_time'},
  {prob:0.01,text:'You discover ancient alchemical carvings on a cave wall.',check:{skill:'research',dc:11},
    successText:'You study the carvings carefully — the knowledge within is invaluable!',successEffect:'bonus_xp',
    failText:'Fascinating, but you can\'t quite decipher their meaning.',failEffect:'none'},
  // ─── DANGEROUS EVENTS (scale with region diff) ───
  {prob:0.02,text:'A rockslide cascades down the passage!',check:{skill:'endurance',dc:14},minDiff:3,
    successText:'You dodge the falling rocks — close call!',successEffect:'none',
    failText:'Rocks slam into your pack. You\'re bruised and bleeding, but alive.',failEffect:'injury_light',failLoot:'lose_pack'},
  {prob:0.015,text:'You disturb a nest of ash vipers coiled among the stones.',check:{skill:'danger_sense',dc:13},minDiff:2,
    successText:'You sense the danger and back away slowly. The vipers settle.',successEffect:'none',
    failText:'A viper strikes! The venom burns. You\'ll feel this tomorrow.',failEffect:'injury_light'},
  {prob:0.012,text:'The ground gives way beneath you — a sinkhole!',check:{skill:'endurance',dc:15},minDiff:4,
    successText:'You catch the edge and haul yourself up. Heart pounding, but safe.',successEffect:'bonus_xp',
    failText:'You tumble hard. Your pack scatters and your body aches. This will set you back.',failEffect:'injury_heavy',failLoot:'lose_pack'},
  {prob:0.01,text:'A territorial cave troll blocks the passage, bellowing with rage.',check:{skill:'endurance',dc:16},minDiff:4,
    successText:'You stand your ground and the troll backs off, impressed by your nerve.',successEffect:'bonus_xp',
    failText:'The troll charges! You escape, but not unscathed. Several items are crushed.',failEffect:'injury_heavy',failLoot:'lose_pack'},
  {prob:0.015,text:'Toxic crystalline dust fills the air as you disturb a mineral vein.',check:{skill:'endurance',dc:12},minDiff:3,
    successText:'You cover your face quickly — no ill effects.',successEffect:'none',
    failText:'You inhale the dust. Your lungs burn and your hands tremble. Working tomorrow will be difficult.',failEffect:'injury_light'},
  {prob:0.01,text:'An unstable ledge collapses as you cross. Your equipment takes the hit.',check:{skill:'precision',dc:14},minDiff:3,
    successText:'Quick reflexes save your gear.',successEffect:'none',
    failText:'Your pack catches on the rubble. Some equipment is damaged.',failEffect:'gadget_damage'},
];

// ═══ MILESTONES ═══
var MILESTONES={
  first_brew:{id:'first_brew',name:'First Brew',icon:'⚗️',desc:'Brewed your first potion. Every master starts somewhere.'},
  heartforge:{id:'heartforge',name:'The Heartforge Burns Again',icon:'⚡',desc:'You rekindled the ancient Heartforge. Cindervale will never be the same.'},
  all_quests:{id:'all_quests',name:'Pillar of the Community',icon:'🏛️',desc:'Completed every quest. Cindervale depends on you.'},
  all_factions:{id:'all_factions',name:'Trusted by All',icon:'🤝',desc:'Reached Trusted status with every faction.'},
  ash_chain:{id:'ash_chain',name:'Ashwarden Champion',icon:'🛡️',desc:'Completed the Ashwarden quest chain.'},
  hk_chain:{id:'hk_chain',name:'Hearthkeeper Devotee',icon:'🔥',desc:'Completed the Hearthkeeper quest chain.'},
  vw_chain:{id:'vw_chain',name:'Veilseer Initiate',icon:'👁️',desc:'Completed the Veilwalker quest chain.'},
  cf_chain:{id:'cf_chain',name:'Stone Sibling',icon:'⛏️',desc:'Completed the Cinderfolk quest chain.'},
  faction_aligned:{id:'faction_aligned',name:'Sworn Allegiance',icon:'⚔️',desc:'Aligned with a faction. Your path is chosen.'},
  master_alch:{id:'master_alch',name:'Grand Alchemist',icon:'🧪',desc:'Reached Level 10. Your name is known beyond Cindervale.'},
  all_recipes:{id:'all_recipes',name:'Living Encyclopedia',icon:'📚',desc:'Discovered every recipe in your craft.'},
  full_workshop:{id:'full_workshop',name:'Master Builder',icon:'🏗️',desc:'Built every upgrade. Your workshop is legendary.'},
  wealthy:{id:'wealthy',name:'Golden Touch',icon:'💰',desc:'Accumulated 500 gold. Prosperity follows your work.'},
  mentor:{id:'mentor',name:'Mentor',icon:'👥',desc:'Hired 4 apprentices. You are shaping the next generation.'},
  legend:{id:'legend',name:'Living Legend',icon:'⭐',desc:'Reached Level 15. Songs are sung about you in the Ember & Anvil.'},
  board_veteran:{id:'board_veteran',name:'Board Veteran',icon:'📌',desc:'Completed 20 board requests. You\'re the village\'s go-to problem solver.'},
};

// ═══ TOWN EVENTS — random daily occurrences ═══
var TOWN_EVENTS=[
  {id:'te_merchant',vibe:'trade',prob:.15,minLv:0,text:'A traveling merchant arrives with a cart full of rare herbs.',
    effect:(s)=>{const picks=['moonpetal','starwort','gloomcap','embervein'];var id=picks[Math.floor(Math.random()*picks.length)];return{items:{[id]:2},msg:`You barter for 2× ${INGR[id]?.icon}${INGR[id]?.name}.`};}},
  {id:'te_tax',vibe:'official',prob:.06,minLv:3,text:'The village council levies a small tax to fund road repairs.',
    effect:(s)=>{const amt=Math.min(s.gold,5+s.level*2);return{gold:-amt,msg:`You contribute ${amt}g to the village fund. (+5 rep with all factions)`,rep_all:5};}},
  {id:'te_demand',vibe:'trade',prob:.10,minLv:2,text:'Word of your craft is spreading. A courier arrives with advance payment!',
    effect:(s)=>{const g=10+s.level*3;return{gold:g,xp:20,msg:`+${g}g advance payment, +20 XP from the reputation boost.`};}},
  {id:'te_bargain',loc:'cindervale',vibe:'trade',prob:.08,minLv:1,text:'Brenna has surplus stock — she\'s selling ingredients at half price today.',
    effect:()=>({flag:'bargain_day',msg:'Brenna\'s shop prices halved today! Visit the market.'})},
  {id:'te_donation',vibe:'trade',prob:.05,minLv:4,text:'An anonymous benefactor leaves a pouch of gold at your workshop door.',
    effect:(s)=>{const g=15+s.level*2;return{gold:g,msg:`+${g}g found in the pouch.`};}},
  {id:'te_ashstorm',vibe:'danger',prob:.08,minLv:0,text:'A heavy ash storm blankets Cindervale. The wilds will be treacherous today.',
    effect:()=>({flag:'ash_storm',msg:'Expedition travel times +1h today. Plan accordingly.'})},
  {id:'te_clearsky',vibe:'nature',prob:.08,minLv:0,text:'Crystal-clear skies — perfect foraging weather.',
    effect:()=>({flag:'clear_sky',msg:'Extraction DCs reduced by 2 today!'})},
  {id:'te_bloom',loc:'cindervale',vibe:'nature',prob:.06,minLv:2,text:'An unusual bloom event — wildflowers burst across the Ashfields overnight.',
    effect:()=>({items:{ashbloom:3,moonpetal:1},msg:`Free harvest: 3× 🌿Ashbloom + 1× 🌸Moonpetal`})},
  {id:'te_feast',loc:'cindervale',vibe:'social',prob:.05,minLv:3,text:'The Hearthkeepers hold a communal feast in the village square.',
    effect:()=>({rep:{hearthkeepers:10},xp:30,msg:'+10 Hearthkeeper rep, +30 XP. Good food, good company.'})},
  {id:'te_patrol',loc:'cindervale',vibe:'military',prob:.06,minLv:2,text:'Ashwarden patrols report all-clear — the village feels safer today.',
    effect:()=>({rep:{ashwardens:8},msg:'+8 Ashwarden rep. The wardens appreciate your ongoing contributions.'})},
  {id:'te_ritual',loc:'cindervale',vibe:'mystical',prob:.05,minLv:4,text:'Veilwalkers perform a dawn ritual at the standing stones. You observe quietly.',
    effect:()=>({rep:{veilwalkers:10},xp:25,msg:'+10 Veilwalker rep, +25 XP from the mystical insight.'})},
  {id:'te_miners',loc:'cindervale',vibe:'social',prob:.05,minLv:3,text:'Cinderfolk miners celebrate a new seam discovery with ale and song.',
    effect:()=>({rep:{cinderfolk:10},msg:'+10 Cinderfolk rep. You\'re invited to share a drink.'})},
  {id:'te_gossip',loc:'cindervale',vibe:'gossip',prob:.18,minLv:0,text:'Marta shares village gossip over morning tea.',
    flavor:['Apparently old Grum once blew up his workshop three times in one week.','The Ashwardens are debating whether to expand patrols eastward.','There\'s talk of a festival if the Heartforge is ever relit.','Someone saw strange lights near the Moonlit Glade.','Brenna says ingredient prices are rising across the region.','The Cinderfolk have been unusually quiet about their deep mine finds.','A pack of ash drakes was spotted near the Ironwood. Stay sharp.','They say a master alchemist once lived in your workshop. Wonder what happened to them.'],
    effect:()=>({msg:''})},
  {id:'te_apprentice_v',vibe:'trade',prob:.04,minLv:3,text:'A young alchemist passes through, eager to trade knowledge.',
    effect:(s)=>{return{xp:40+s.level*5,msg:`+${40+s.level*5} XP from the exchange of techniques.`};}},
  {id:'te_refugee',loc:'cindervale',vibe:'social',prob:.05,minLv:2,text:'Refugees from a distant village arrive seeking healing supplies.',
    effect:(s)=>{if((s.pots.healing_salve||0)>0)return{pots:{healing_salve:-1},gold:20,xp:50,rep:{hearthkeepers:15},msg:'You donate a Healing Salve. +20g, +50 XP, +15 Hearthkeeper rep.'};return{msg:'They need healing salves, but you have none to spare. Perhaps tomorrow.'};}},
  {id:'te_inspector',vibe:'official',prob:.04,minLv:5,text:'A guild inspector from the capital evaluates your workshop.',
    effect:(s)=>{const score=s.upgrades.length*5+s.level*3;if(score>=40)return{gold:30,xp:60,msg:`Rating: Excellent! +30g bonus, +60 XP. "Impressive operation."`};return{xp:20,msg:`Rating: Adequate. +20 XP. "Room for improvement."`};}},
  {id:'te_thief',vibe:'danger',prob:.04,minLv:3,text:'You catch someone rifling through your ingredient stores!',
    effect:(s)=>{const picks=Object.keys(s.inv).filter(k=>s.inv[k]>1);if(picks.length===0)return{msg:'Lucky — your stores are too bare to steal from.'};var id=picks[Math.floor(Math.random()*picks.length)];return{items:{[id]:-2},msg:`Lost 2× ${INGR[id]?.icon}${INGR[id]?.name}! You chase them off before they take more.`};}},
  {id:'te_oldrecipe',vibe:'mystical',prob:.03,minLv:4,text:'You find a faded recipe card stuck between the workshop floorboards.',
    effect:()=>({xp:50,msg:'+50 XP. The handwriting is ancient — but the techniques are sound.'})},
  {id:'te_ventsurge',loc:'cindervale',vibe:'danger',prob:.05,minLv:5,text:'The volcanic vents rumble ominously. Tremors shake the village.',
    effect:()=>({items:{volcanic_essence:1,embervein:1},msg:'Shaken loose by the tremors: 1× 🔥Volcanic Ess. + 1× 🔶Embervein'})},
  {id:'te_moonfull',loc:'cindervale',vibe:'mystical',prob:.04,minLv:4,text:'A rare full moon over Cindervale — moonlit herbs glow with extra potency.',
    effect:()=>({items:{moonpetal:2,starwort:1},msg:'Moonlit harvest: 2× 🌸Moonpetal + 1× ⭐Starwort'})},
  // Ashfall Crossing town events
  {id:'te_af_bargain',vibe:'trade',loc:'ashfall',prob:.08,minLv:1,text:'Sola has surplus desert stock — half-price ingredients at the Desert Bazaar today.',
    effect:()=>({flag:'bargain_day',msg:'Sola\'s shop prices halved today! Visit the market.'})},
  {id:'te_af_bloom',vibe:'nature',loc:'ashfall',prob:.06,minLv:2,text:'An unexpected rain shower brings a burst of desert wildflowers across the Sunscorch Flats.',
    effect:()=>({items:{sunpetal:3,dewdrop_lily:1},msg:'Free harvest: 3× 🌻Sunpetal + 1× 💧Dewdrop Lily'})},
  {id:'te_af_feast',vibe:'social',loc:'ashfall',prob:.05,minLv:3,text:'The Flamekeepers host a fire ceremony at the central shrine. The whole crossing gathers.',
    effect:()=>({rep:{flamekeepers:10},xp:30,msg:'+10 Flamekeeper rep, +30 XP. The sacred flames warm your spirit.'})},
  {id:'te_af_patrol',vibe:'military',loc:'ashfall',prob:.06,minLv:2,text:'Dustwalker scouts return with good news \u2014 the desert routes are clear today.',
    effect:()=>({rep:{dustwalkers:8},msg:'+8 Dustwalker rep. Safe travels thanks to the wayfinders.'})},
  {id:'te_af_trade',vibe:'social',loc:'ashfall',prob:.05,minLv:3,text:'The Sand Merchants Guild opens their monthly exchange. Rare goods flow freely.',
    effect:()=>({rep:{sand_merchants:10},msg:'+10 Sand Merchant rep. Good business builds trust.'})},
  {id:'te_af_gossip',vibe:'gossip',loc:'ashfall',prob:.18,minLv:0,text:'Amara shares crossing gossip over spiced tea at the Oasis Cantina.',
    flavor:['The Dustwalkers found ancient footprints in the deep desert \u2014 bigger than any sandworm.','Razak says ingredient prices from the coast have doubled.','A Flamekeeper acolyte claims the sacred fire changed color last night.','Someone tried to dig into the Buried Temple from the surface. They didn\'t come back.','The Sand Merchants are negotiating a new route through the Obsidian Wastes.','Sola swears she saw a mirage that looked back at her.'],
    effect:()=>({msg:''})},
  {id:'te_af_sandstorm',vibe:'danger',loc:'ashfall',prob:.08,minLv:0,text:'A massive sandstorm sweeps across Ashfall Crossing. The desert is impassable today.',
    effect:()=>({flag:'ash_storm',msg:'Expedition travel times +1h today. The sand stings your eyes.'})},
  {id:'te_af_refugee',vibe:'social',loc:'ashfall',prob:.05,minLv:2,text:'Desert nomads arrive at the crossing, dehydrated and sunburnt. They need healing.',
    effect:(s)=>{if((s.pots.healing_salve||0)>0)return{pots:{healing_salve:-1},gold:20,xp:50,rep:{flamekeepers:15},msg:'You donate a Healing Salve. +20g, +50 XP, +15 Flamekeeper rep.'};return{msg:'They need healing salves, but you have none to spare.'};}},
  {id:'te_af_ventsurge',vibe:'danger',loc:'ashfall',prob:.05,minLv:5,text:'The Molten Vents erupt violently. Ash and heat wash over the crossing.',
    effect:()=>({items:{volcanic_essence:1,living_ember:1},msg:'Shaken loose by the eruption: 1× 🌋Volcanic Ess. + 1× 🔥Living Ember'})},
];

// ═══ BOARD QUEST TEMPLATES — repeatable daily quests ═══
// ═══ EVENT VIBE THEMES ═══
var EVENT_VIBES={
  danger:{icon:'🔥',title:'Danger in Cindervale',bg:'linear-gradient(180deg,#2a0a0a 0%,#4a1010 30%,#8a2020 60%,#c03020 100%)',
    scene:'🐉',sceneSize:80,border:'#ff4030',text:'#ff8060',
    particles:['🔥','💨','🌋','⚡'],ambiance:'The air crackles with tension...'},
  nature:{icon:'☀️',title:'A Beautiful Day',bg:'linear-gradient(180deg,#0a1a2a 0%,#1a3a5a 20%,#4a8ab0 50%,#8ac0e0 80%,#c0e0f0 100%)',
    scene:'🌄',sceneSize:80,border:'#60c0ff',text:'#90d0ff',
    particles:['🌿','🌸','☀️','🦋'],ambiance:'The morning light sparkles across Cindervale...'},
  trade:{icon:'💰',title:'Commerce & Trade',bg:'linear-gradient(180deg,#1a1808 0%,#2a2810 30%,#4a4020 50%,#6a5830 80%,#8a7040 100%)',
    scene:'🏪',sceneSize:70,border:'#d0a040',text:'#e0c060',
    particles:['💰','📦','🪙','⚖️'],ambiance:'The clatter of coins and rustle of goods...'},
  social:{icon:'🎉',title:'Village Life',bg:'linear-gradient(180deg,#0a0a1a 0%,#1a1a3a 25%,#2a2a5a 50%,#4a3a6a 75%,#6a4a7a 100%)',
    scene:'🏘️',sceneSize:70,border:'#a070c0',text:'#c090e0',
    particles:['🍺','🎶','🤝','❤️'],ambiance:'Laughter and warmth fill the village square...'},
  mystical:{icon:'✨',title:'Mystical Occurrence',bg:'linear-gradient(180deg,#0a0818 0%,#150a30 25%,#200a50 50%,#301070 75%,#401a90 100%)',
    scene:'🌙',sceneSize:80,border:'#8060c0',text:'#b090ff',
    particles:['✨','🌙','🔮','⭐'],ambiance:'The Veil shimmers at the edges of perception...'},
  military:{icon:'⚔️',title:'Ashwarden Report',bg:'linear-gradient(180deg,#0a0a0a 0%,#1a1010 25%,#2a1818 50%,#3a2020 75%,#4a2828 100%)',
    scene:'🛡️',sceneSize:70,border:'#c05040',text:'#e07060',
    particles:['⚔️','🛡️','🏹','🗡️'],ambiance:'The wardens stand vigilant at the gates...'},
  official:{icon:'📋',title:'Official Business',bg:'linear-gradient(180deg,#0a0a10 0%,#141420 25%,#1e1e30 50%,#282840 75%,#323250 100%)',
    scene:'📜',sceneSize:70,border:'#6080a0',text:'#80a0c0',
    particles:['📋','🏛️','⚖️','📜'],ambiance:'A knock at the workshop door — official business...'},
  gossip:{icon:'💬',title:'Village Whispers',bg:'linear-gradient(180deg,#100a08 0%,#201810 25%,#302820 50%,#403830 75%,#504840 100%)',
    scene:'☕',sceneSize:60,border:'#a08060',text:'#c0a080',
    particles:['💬','☕','👀','🤫'],ambiance:'Marta leans in conspiratorially...'},
  hollow_march:{icon:'💀',title:'The Hollow March',bg:'linear-gradient(180deg,#0a0008 0%,#180818 25%,#281030 50%,#381848 75%,#482060 100%)',
    scene:'💀',sceneSize:80,border:'#a040c0',text:'#c060e0',
    particles:['💀','⚔️','🔮','🌑'],ambiance:'The earth trembles. The Hollow March advances...'},
  hollow_victory:{icon:'🏆',title:'Victory!',bg:'linear-gradient(180deg,#0a1008 0%,#1a2818 25%,#2a4028 50%,#3a5838 75%,#4a7048 100%)',
    scene:'🏆',sceneSize:80,border:'#d4a420',text:'#ffe848',
    particles:['🏆','⭐','🎉','✨'],ambiance:'The defenders cheer! Cindervale stands!'},
  hollow_final:{icon:'👑',title:'The Final Stand',bg:'linear-gradient(180deg,#1a0a00 0%,#2a1a08 25%,#4a2a10 50%,#6a3a18 75%,#8a4a20 100%)',
    scene:'👑',sceneSize:90,border:'#ffd700',text:'#ffe848',
    particles:['👑','⚡','🔥','💎'],ambiance:'This is the end. Everything you\'ve built comes down to this moment.'},
};

// ═══ THE HOLLOW MARCH — Endgame Invasion Event ═══
var HOLLOW_MARCH={
  triggerLevel:10, // displayLevel 11 (internal 10)
  wavesForTorch:5, // must clear 5 waves before Pass the Torch
  finalStandWave:10, // unlocks after wave 10
  waveIntervalMin:5,waveIntervalMax:7,
  // Demand types: potions, ingredients, enchantments, gold, staff assignment
  demandPools:{
    potion:{label:'Supply',icon:'⚗️',scaling:(wave)=>({qty:Math.ceil(wave*0.8)+1,reward:{xp:40+wave*15,gold:20+wave*8}})},
    ingredient:{label:'Gather',icon:'🌿',scaling:(wave)=>({qty:Math.ceil(wave*1.5)+3,reward:{xp:25+wave*10,gold:15+wave*5}})},
    enchantment:{label:'Enchant',icon:'✨',scaling:(wave)=>({qty:Math.ceil(wave*0.5)+1,reward:{xp:50+wave*20,gold:25+wave*10}})},
    gold:{label:'Fund',icon:'💰',scaling:(wave)=>({qty:30+wave*15,reward:{xp:30+wave*12,threatReduc:8+wave*2}})},
    staff:{label:'Deploy',icon:'👥',scaling:(wave)=>({qty:1+Math.floor(wave/3),reward:{xp:35+wave*10,threatReduc:10+wave*3}})},
  },
  // Wave flavor text
  waveFlavor:[
    'Scouts report movement beyond the Veil. Something is coming.',
    'The ground trembles with distant footsteps. The March begins.',
    'Ashwarden patrols have gone silent on the eastern road.',
    'Villagers whisper of shadows massing at the forest edge.',
    'The sky darkens. The Hollow March draws nearer.',
    'Bells toll across the valley. Cindervale braces for impact.',
    'The Veil tears open in shimmering gashes. They pour through.',
    'Every faction rallies. This wave will test everything you\'ve built.',
    'The earth itself groans under the weight of the advancing horde.',
    'This is the crucible. Everything you\'ve done leads to this moment.',
    'The final wave crashes against Cindervale\'s defenses. Hold the line.',
  ],
  // Failure consequences per unmet demand
  failurePenalties:{threatSpike:8,staffInjuryChance:0.25,ingrLossCount:3},
  // Victory rewards per wave (beyond individual demand rewards)
  waveRewards:(wave)=>({
    xp:100+wave*50,
    gold:50+wave*25,
    threatReduc:5, // -5 to all threats
    // Every 3rd wave: unique recipe unlock
    recipeUnlock:wave%3===0,
  }),
  // Unique recipes unlocked every 3rd wave
  marchRecipes:['march_fortify','march_veilseal','march_rallying_cry','march_ironwall'],
  // Final Stand rewards
  finalStandRewards:{xp:2000,gold:500,title:'Defender of the Vale',threatCap:25},
};
// March-exclusive recipes (added to RECIPES pool when unlocked)
var MARCH_RECIPES=[
  {id:'march_fortify',name:'Fortification Draught',icon:'🏰',ingr:['ironroot_bark','hearthstone','volcanic_essence'],xp:120,unlock:10,dc:16,stat:'tec',
    desc:'A legendary potion that hardens walls and wards. Reduces all threats by 10 when brewed during the March.',marchEffect:{threatReduc:10}},
  {id:'march_veilseal',name:'Veilseal Elixir',icon:'🔮',ingr:['moonpetal','echo_stone','ghost_silk'],xp:130,unlock:10,dc:17,stat:'inu',
    desc:'Seals tears in the Veil. Reduces Veilbreaker threat by 20 when brewed during the March.',marchEffect:{threatReduc:20,threat:'veilbreakers'}},
  {id:'march_rallying_cry',name:'Rallying Cry Tonic',icon:'📯',ingr:['embervein','starwort','ironwood_sap'],xp:110,unlock:10,dc:15,stat:'com',
    desc:'Inspires defenders to fight harder. Grants +2 Energy next day and reduces Reaver threat by 15.',marchEffect:{threatReduc:15,threat:'reavers',bonusEnergy:2}},
  {id:'march_ironwall',name:'Ironwall Concentrate',icon:'🛡️',ingr:['deep_iron','forge_scale','thermal_clay'],xp:140,unlock:10,dc:18,stat:'tec',
    desc:'Coats fortifications in alchemical iron. Reduces Blight threat by 20 and grants staff injury immunity for 3 days.',marchEffect:{threatReduc:20,threat:'blight',staffShield:3}},
];
// Append March recipes to main RECIPES array (gated by known[] — learned during Hollow March waves)
MARCH_RECIPES.forEach(r=>RECIPES.push(r));

var BQ_GIVERS=['Farmer Aldric','Widow Maren','Trader Osric','Healer Senna','Guard Brennick','Smith Torva','Elder Yara','Prospector Jax','Herbalist Neve','Cook Brindle','Captain Voss','Pilgrim Elowen','Shepherd Grynn','Scribe Felton','Chandler Rue'];
var BQ_TEMPLATES=[
  {type:'deliver',tier:1,pool:['healing_salve','windwalk_salve'],qtyR:[1,2],gPer:12,xPer:18,minLv:0,
    descs:['"Wounded travelers need salves. Can you supply {qty}?"','"The clinic is running low. We need {qty} salve{s}."']},
  {type:'deliver',tier:1,pool:['ashveil','bark_shield'],qtyR:[1,2],gPer:14,xPer:22,minLv:2,
    descs:['"The ashfall is bad this season. We need {qty} protective potion{s}."','"Miners keep getting ash-lung. {qty} tonic{s} would help."']},
  {type:'deliver',tier:2,pool:['firebrew','glow_vial'],qtyR:[1,3],gPer:16,xPer:25,minLv:2,
    descs:['"The night watch needs supplies to stay sharp. {qty} flask{s}, please."','"Heading into vent territory. Need {qty} flask{s} for the expedition."']},
  {type:'deliver',tier:2,pool:['ironhide','geode_tonic'],qtyR:[1,2],gPer:18,xPer:28,minLv:3,
    descs:['"Border skirmishes. The wardens want {qty} potion{s}."','"I\'m escorting a caravan. {qty} potion{s} could save my life."']},
  {type:'deliver',tier:2,pool:['enchanters_ink'],qtyR:[1,2],gPer:16,xPer:24,minLv:3,
    descs:['"The ward-stones need refreshing. {qty} Enchanter\'s Ink{s}, if you have them."','"My inscription work is backed up. {qty} Ink{s} would get me through the week."']},
  {type:'deliver',tier:3,pool:['gloom_draught'],qtyR:[1,2],gPer:22,xPer:35,minLv:4,
    descs:['"Something stirs in the caves. We need {qty} Gloom Draught{s} to see in the dark."','"Veilwalker business. {qty} Gloom Draught{s}. Don\'t ask questions."']},
  {type:'deliver',tier:3,pool:['embersteel_oil','holy_flame','celestial_balm','echo_elixir','obsidian_bomb'],qtyR:[1,2],gPer:28,xPer:40,minLv:6,
    descs:['"High-grade alchemy only. {qty} {itemName}{s} for the guild order."','"The captain specifically requested {qty} {itemName}{s}. Top quality."']},
  {type:'gather',tier:1,pool:['ashbloom','ironroot_bark','char_root','wind_dust'],qtyR:[5,10],gPer:3,xPer:5,minLv:0,
    descs:['"I need {qty} {itemName}. Simple work, fair pay."','"Stock the village stores: {qty} {itemName} from the wilds."']},
  {type:'gather',tier:1,pool:['embercap','gloomcap','bark_resin','moss_amber'],qtyR:[4,8],gPer:4,xPer:7,minLv:1,
    descs:['"Materials for the healers. {qty} {itemName}, fresh as you can manage."','"The apothecary needs {qty} {itemName}. Careful handling, please."']},
  {type:'gather',tier:2,pool:['hearthstone','ashite','moonpetal','biolumen_gel','geode_dust'],qtyR:[3,6],gPer:5,xPer:8,minLv:2,
    descs:['"Crafting supply run: {qty} {itemName} from the deep trails."','"The builders need {qty} {itemName}. Higher quality than market stock."']},
  {type:'gather',tier:2,pool:['starwort','volcanic_essence','dew_crystal','resonance_ore'],qtyR:[2,5],gPer:7,xPer:10,minLv:4,
    descs:['"Dangerous gathering, but the pay matches. {qty} {itemName}."','"Research materials: {qty} {itemName} from the remote regions."']},
  {type:'gather',tier:3,pool:['embervein','volcanic_essence','obsidian_flake','echo_stone'],qtyR:[2,4],gPer:9,xPer:14,minLv:5,
    descs:['"Rare minerals for the forge. {qty} {itemName} — vent-fresh."','"Guild-grade {itemName}, {qty} pieces. Only skilled gatherers need apply."']},
  {type:'deliver',tier:1,pool:['healing_salve','firebrew'],qtyR:[2,4],gPer:14,xPer:20,minLv:2,
    descs:['"A caravan is departing. They need {qty} {itemName}{s} for the road."','"Field medics requisition: {qty} {itemName}{s}, combat-ready."']},
  // Wave 2 templates
  {type:'deliver',tier:1,pool:['soot_candle','windwalk_salve'],qtyR:[2,4],gPer:10,xPer:15,minLv:0,
    descs:['"Every household needs {qty} {itemName}{s}. Basic stuff, but vital."','"Stock the village stores with {qty} {itemName}{s}, if you would."']},
  {type:'deliver',tier:2,pool:['amber_varnish','spectral_tincture','resonance_draught'],qtyR:[1,3],gPer:16,xPer:24,minLv:2,
    descs:['"Specialist work — {qty} {itemName}{s} for a private buyer."','"The guild has standing orders. {qty} {itemName}{s}, please."']},
  {type:'deliver',tier:3,pool:['dream_dust','pyrestone_flask','void_essence'],qtyR:[1,2],gPer:26,xPer:38,minLv:5,
    descs:['"High-value alchemy. {qty} {itemName}{s}, handled with care."','"This order comes from the capital itself. {qty} {itemName}{s}."']},
  {type:'gather',tier:1,pool:['ember_petal','soot_crystal','beetle_shell','amber_sap'],qtyR:[4,8],gPer:3,xPer:5,minLv:0,
    descs:['"Simple gathering work. {qty} {itemName}, fair pay."','"Fetch {qty} {itemName} from the wilds. I need them by sundown."']},
  {type:'gather',tier:2,pool:['echo_fungus','ghost_silk','singing_quartz','copper_vein','moth_scale'],qtyR:[3,6],gPer:5,xPer:8,minLv:2,
    descs:['"Specialty materials: {qty} {itemName}. Handle with care."','"These aren\'t easy to find. {qty} {itemName}, and I\'ll make it worth your while."']},
  {type:'gather',tier:3,pool:['lava_pearl','pyrestone','mithril_dust','void_salt'],qtyR:[2,4],gPer:9,xPer:14,minLv:5,
    descs:['"Dangerous territory, premium materials. {qty} {itemName}."','"Only experienced gatherers. {qty} {itemName}, deep region quality."']},
];

var genBoardQuests=(level,day,bonusQuests=0)=>{
  const n=2+Math.floor(Math.random()*2)+bonusQuests; // 2-3 quests + bonus
  const avail=BQ_TEMPLATES.filter(t=>level>=t.minLv);
  if(avail.length===0)return[];
  const quests=[];var usedGivers=[];
  for(let i=0;i<n;i++){
    const tmpl=avail[Math.floor(Math.random()*avail.length)];
    let giver;do{giver=BQ_GIVERS[Math.floor(Math.random()*BQ_GIVERS.length)];}while(usedGivers.includes(giver));
    usedGivers.push(giver);
    const itemId=tmpl.pool[Math.floor(Math.random()*tmpl.pool.length)];
    const qty=tmpl.qtyR[0]+Math.floor(Math.random()*(tmpl.qtyR[1]-tmpl.qtyR[0]+1))+Math.floor(level/5);
    const isPotion=tmpl.type==='deliver';
    const r=isPotion?RECIPES.find(x=>x.id===itemId):null;
    const ing=!isPotion?INGR[itemId]:null;
    const itemName=r?r.name:ing?.name||itemId;
    const itemIcon=r?r.icon:ing?.icon||'';
    const gold=qty*tmpl.gPer+Math.floor(level*1.5);
    const xpR=qty*tmpl.xPer+level*3;
    const faction=['hearthkeepers','ashwardens','veilwalkers','cinderfolk'][Math.floor(Math.random()*4)];
    const fRep=5+tmpl.tier*3;
    const desc=tmpl.descs[Math.floor(Math.random()*tmpl.descs.length)]
      .replace(/\{qty\}/g,qty).replace(/\{itemName\}/g,itemName).replace(/\{s\}/g,qty>1?'s':'');
    quests.push({id:'bq_'+day+'_'+i,type:tmpl.type,target:itemId,count:qty,giver,
      name:giver+': '+qty+'× '+itemIcon+itemName,desc,gold,xp:xpR,faction,fRep,
      itemName,itemIcon,tier:tmpl.tier});
  }
  return quests;
};

var DEF={phase:'identity',charName:'',charRace:null,charGender:null,stats:{cre:10,inu:10,acu:10,tec:10,com:10,dis:10},ptsLeft:12,skRanks:{},skPts:0,classLevels:{},specs:{},playerFeats:[],asiSpent:[],startingClass:null,screen:'map',day:1,hours:4,gameLocation:'cindervale',xp:0,gold:15,inv:{ashbloom:3,hearthstone:1,embercap:1},pots:{},known:['healing_salve'],aQ:[],doneQ:[],log:[],milestones:[],fRep:{ashwardens:0,hearthkeepers:0,veilwalkers:0,cinderfolk:0},upgrades:[],hiredAppr:[],apprTasks:{},apprXP:{},boardQ:[],activeBQ:[],doneBQCount:0,dayFlags:[],knownEnch:['e_sharp','e_glow','e_ironbark','e_feather','e_windwalk','e_rootbind'],constructProgress:{},hollowMarch:{active:false,wave:0,nextWaveDay:0,demands:[],history:[],finalStandAvailable:false,finalStandComplete:false,marchRecipesUnlocked:[]}};
