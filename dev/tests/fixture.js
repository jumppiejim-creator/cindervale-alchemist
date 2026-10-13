// Builds a "kitchen sink" late-game save in-page (using the game's own globals), loads it via Continue.
// Variant picks which class gets specs; all prestige classes at Lv5 so every panel renders.
async function loadRichSave(page, { variant = 0 } = {}) {
  await page.evaluate((variant) => {
    const raw = localStorage.getItem('cindervale-save:auto');
    const s = JSON.parse(raw);
    const loc = s.gameLocation;
    const clsIds = Object.keys(CLASSES);
    s.classLevels = {}; s.specs = {};
    clsIds.forEach((c, i) => { s.classLevels[c] = 10; const sp = Object.keys(CLASSES[c].specs || {}); if (sp.length) s.specs[c] = sp[(i + variant) % sp.length]; });
    s.xp = 345000;
    s.prestigeLevels = {}; Object.keys(PRESTIGE_CLASSES).forEach(p => { s.prestigeLevels[p] = 5; });
    s.playerFeats = Object.keys(FEATS);
    s.skRanks = {}; Object.keys(SKILLS).forEach(k => { s.skRanks[k] = 3; });
    s.gold = 500000; s.energy = 100; s.day = 40;
    s.inv = {}; Object.keys(INGR).forEach(id => { s.inv[id] = 12; });
    s.pots = {}; RECIPES.forEach(r => { s.pots[r.id] = 3; s.pots[r.id + '_M'] = 1; });
    s.known = RECIPES.map(r => r.id);
    s.upgrades = Object.keys(UPGRADES);
    const pool = AP_POOL.filter(a => !a.loc || a.loc === loc).slice(0, 3);
    s.hiredAppr = pool.map(a => ({ ...a, morale: 60 }));
    s.staffInjuries = pool.length ? { [pool[0].id]: { daysLeft: 2 } } : {};
    s.apprXP = {}; pool.forEach(a => s.apprXP[a.id] = 250);
    const comps = RANGER_COMPANIONS.filter(c => !c.loc || c.loc === loc).slice(0, 3);
    s.companions = comps.map(c => ({ compId: c.id, loyalty: 5, active: true, tamedDay: 10 }));
    Object.keys(s.fRep || {}).forEach(f => s.fRep[f] = 120);
    s.threats = s.threats || {}; Object.keys(s.threats).forEach(t => s.threats[t] = 60);
    s.knownEnch = ENCHANTMENTS.map(e => e.id);
    s.pendingLevelUp = null; s.pendingLevelUpQueue = [];
    localStorage.setItem('cindervale-save:auto', JSON.stringify(s));
  }, variant);
  await page.reload();
  await page.waitForSelector('text=Continue', { timeout: 40000 });
  await page.getByText('Continue').first().click();
  await page.waitForTimeout(800);
}
module.exports = { loadRichSave };
