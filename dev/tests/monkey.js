// Monkey test: new game, then N seeded random clicks on visible clickable elements.
// usage: node monkey.js <repoDir> <seed> <clicks> <zoneIdx> <classIdx> [mobile]
const { open } = require('./lib'); const { newGame } = require('./newgame'); const { loadRichSave } = require('./fixture');
const [repo = require('path').resolve(__dirname, '..', '..'), seedS = '1', nS = '300', zS = '0', cS = '0', mob] = process.argv.slice(2);
const ZONES = ['A quiet mountain village', 'A bustling desert trading post', 'A weathered port town', 'A high-altitude settlement'];
const CLS = ['Brew potions, the core', 'Inscribe runes', 'Optimize everything', 'Research, discovery', 'Foraging mastery'];
let seed = +seedS; const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
const AVOID = /sign (in|out)|delete|erase|reset|new game|retire|pass the torch|export|import|transfer|copy|download|print|handbook|cancel run|title/i;
(async () => {
  const { browser, page, errors } = await open(repo, { skipImages: true, mobile: !!mob });
  page.on('dialog', d => d.dismiss().catch(() => {}));
  await page.addInitScript((sd) => { window.open = () => null; let a = sd >>> 0; Math.random = () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }, +seedS * 7919);
  await newGame(page, { zone: ZONES[+zS], cls: CLS[+cS] });
  if (process.env.RICH) { await page.waitForTimeout(1000); await loadRichSave(page, { variant: +cS % 3 }); }
  const trail = [];
  for (let i = 0; i < +nS; i++) {
    const r = rnd();
    const t = await page.evaluate(([r, avoid]) => {
      const re = new RegExp(avoid, 'i');
      const els = [...document.querySelectorAll('button, [style*="cursor: pointer"]')]
        .filter(e => e.offsetParent && !e.disabled && e.getBoundingClientRect().width > 0)
        .filter(e => !re.test((e.innerText || e.title || '').slice(0, 80)));
      if (!els.length) return null;
      const e = els[Math.floor(r * els.length)]; const txt = (e.innerText || e.title || '').replace(/\s+/g, ' ').slice(0, 50);
      e.click(); return txt;
    }, [r, AVOID.source]);
    if (t === null) { console.log('STUCK at', i, trail.slice(-5), (await page.innerText('body')).slice(0, 800)); break; }
    trail.push(t);
    await page.waitForTimeout(30);
    const crashed = await page.getByText('Cindervale crashed').count();
    const errs = errors.filter(e => !e.includes('deoptimised') && !e.includes('404') && !e.includes('Failed to load resource'));
    if (crashed || errs.length) {
      const body = crashed ? (await page.innerText('body')).slice(0, 1500) : '';
      console.log(JSON.stringify({ seed: seedS, zone: zS, cls: cS, step: i, last: trail.slice(-12), errs, body }, null, 1));
      await browser.close(); process.exit(1);
    }
  }
  if (process.env.DUMP) {
    await page.waitForTimeout(1500);
    const st = await page.evaluate(() => { const o = {}; for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); o[k] = localStorage.getItem(k); } return o; });
    const body = await page.innerText('body');
    require('fs').writeFileSync(`${process.env.DUMP}/s${seedS}_z${zS}_c${cS}.json`, JSON.stringify({ trail, st, body }, null, 1));
  }
  console.log(`OK seed=${seedS} zone=${zS} cls=${cS} clicks=${trail.length}`);
  await browser.close();
})();
