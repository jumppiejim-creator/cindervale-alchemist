// Targeted state tests: Title→Continue freshness, Undo correctness, Rest clears undo, shelf sales pay out.
const { open } = require('./lib'); const { newGame } = require('./newgame'); const { loadRichSave } = require('./fixture');
const repo = process.argv[2] || require('path').resolve(__dirname, '..', '..');
const autoSave = page => page.evaluate(() => JSON.parse(localStorage.getItem('cindervale-save:auto')));
const dismissModals = async page => { for (let i = 0; i < 30; i++) { const n = await page.evaluate(() => { const ov = [...document.querySelectorAll('div')].filter(d => getComputedStyle(d).position === 'fixed' && d.offsetWidth > 300 && d.offsetHeight > 300); for (const o of ov) { const b = [...o.querySelectorAll('button')].find(b => /continue|close|ok\b|got it|dismiss|begin|start|next event|done|→|✕/i.test(b.innerText)); if (b) { b.click(); return 1; } } return 0; }); if (!n) break; await page.waitForTimeout(300); } };
const fails = []; const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails.push(m); };
(async () => {
  const { browser, page, errors } = await open(repo, { skipImages: true });
  page.on('dialog', d => d.dismiss().catch(() => {}));
  await newGame(page); await page.waitForTimeout(1000);
  await loadRichSave(page);
  // put potions on shelves directly via save edit, then reload & continue
  await page.evaluate(() => { const s = JSON.parse(localStorage.getItem('cindervale-save:auto')); s.shelves = { healing_salve: 10 }; s.debt = 0; s.brands = [{ id: 'b1', name: 'Test Brand', icon: '🏷️', recipes: ['healing_salve'], sold: 3 }]; s.relics = [{ id: 'r1', category: 'pottery', rarity: 'common', name: 'Pot', value: 5, appraised: true }]; s.museum = { pottery: 1, tablets: 0, jewelry: 0, mechanisms: 0, weapons: 0 }; localStorage.setItem('cindervale-save:auto', JSON.stringify(s)); localStorage.setItem('cindervale-save:roundtrip', JSON.stringify(s)); });
  await page.reload(); await page.waitForSelector('text=Continue'); await page.getByText('Continue').first().click(); await page.waitForTimeout(800);
  await page.waitForTimeout(1200);
  const before = await autoSave(page);
  // Round trip: everything we saved must come back after load (autosave re-gathers it)
  {const injected = await page.evaluate(() => window.__injected || null);}
  const rt = await page.evaluate(() => JSON.parse(localStorage.getItem('cindervale-save:roundtrip')));
  if (rt) { const skip = ['_at', 'log', 'screen', 'dailyReport', '_v', 'saveVersion', 'expedition', 'lineage'];
    const diff = Object.keys(rt).filter(k => !skip.includes(k) && JSON.stringify(rt[k] ?? null) !== JSON.stringify(before[k] ?? null));
    ok(diff.length === 0, 'save→load round trip; differing keys: ' + diff.join(',')); }
  // Rest
  await page.locator('button', { hasText: 'Rest' }).first().click(); await page.getByText('Yes, Rest').first().click(); await page.waitForTimeout(1500);
  const after = await autoSave(page);
  // Morning report Earnings "net" must equal the real change in coin
  {const parse=t=>{const m=t.match(/([+-]?)\s*((?:\d+pp)?\s*(?:\d+g)?\s*(?:\d+s)?)\s*net/);if(!m)return null;let v=0;const pp=m[2].match(/(\d+)pp/),g=m[2].match(/(\d+)g/),sv=m[2].match(/(\d+)s/);v=(pp?+pp[1]*100:0)+(g?+g[1]*10:0)+(sv?+sv[1]:0);return m[1]==='-'?-v:v;};
   const net=parse(await page.innerText('body'));const chg=after.gold-before.gold;ok(net!==null&&Math.abs(net-chg)<(Math.abs(chg)>=100?10:1),`earnings net ${net} matches coin change ${chg} (display hides silver once it reaches pp)`);}
  await dismissModals(page);
  ok(after.day === before.day + 1, `rest advanced day ${before.day}->${after.day}`);
  const shelfLeft = Object.values(after.shelves || {}).reduce((a, b) => a + b, 0);
  const sold = 10 - shelfLeft;
  const report = JSON.stringify(after.dailyReport || []);
  ok(sold === 0 || /Shelf Sales/.test(report), `shelf sold ${sold}; report mentions Shelf Sales: ${/Shelf Sales/.test(report)}`);
  ok(await page.locator('button', { hasText: 'Undo' }).count() === 0, 'no Undo after Rest');
  await dismissModals(page);
  // Title -> Continue keeps latest day
  await page.locator('button', { hasText: '💾' }).first().click({ timeout: 3000 }).catch(() => {});await page.waitForTimeout(300);
  await page.getByText('🚪 Title').first().click({ timeout: 3000 }).catch(() => {});
  await page.waitForTimeout(500);
  await page.getByText('▶ Continue').first().click({ timeout: 5000 }); await page.waitForTimeout(800);
  const cont = await autoSave(page);
  ok(cont.day === after.day, `Title→Continue day ${cont.day} == ${after.day}`);
  ok(await page.locator('button', { hasText: 'Undo' }).count() === 0, 'no Undo right after Continue');
  // Undo: sell something at the market, then undo
  await page.locator('button', { hasText: '⚗️' }).first().click(); await page.waitForTimeout(300);
  for (let pass = 0; pass < 3; pass++) { await page.evaluate(() => { [...document.querySelectorAll('[style*="cursor: pointer"]')].filter(e => e.offsetParent && /▼/.test(e.innerText || '') && (e.innerText || '').length < 120).forEach(e => e.click()); }); await page.waitForTimeout(250); }
  const strip = o => { const c = { ...o }; delete c._at; delete c.log; delete c.screen; delete c.dailyReport; delete c._v; return JSON.stringify(c); };
  const s0 = await autoSave(page);
  const brewBtn = page.locator('button', { hasText: /Brew Standard/ }).first();
  if (await brewBtn.count()) {
    await brewBtn.click(); await page.waitForTimeout(1500); await dismissModals(page);
    const s1 = await autoSave(page);
    ok(strip(s1) !== strip(s0), 'brew changed state (energy/pots/xp)');
    await page.locator('button', { hasText: 'Undo' }).first().click({ timeout: 5000 }); await page.waitForTimeout(1500);
    const s2 = await autoSave(page);
    const a0 = JSON.parse(strip(s0)), a2 = JSON.parse(strip(s2));
    const diff = Object.keys(a0).filter(k => JSON.stringify(a0[k]) !== JSON.stringify(a2[k]));
    ok(diff.length === 0, 'undo restored full state; differing keys: ' + diff.join(','));
  } else ok(false, 'no Brew button found');
  const bad = errors.filter(e => !e.includes('deoptimised') && !e.includes('404') && !e.includes('Failed to load resource'));
  ok(bad.length === 0, 'no page errors ' + JSON.stringify(bad).slice(0, 500));
  await browser.close();
  process.exit(fails.length ? 1 : 0);
})();
