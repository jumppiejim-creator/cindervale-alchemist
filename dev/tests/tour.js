// Tour: load rich save in a zone, visit every nav screen, expand every collapsible section, report errors.
// usage: node tour.js <repo> <zoneIdx> <variant> [mobile]
const { open } = require('./lib'); const { newGame } = require('./newgame'); const { loadRichSave } = require('./fixture');
const ZONES = ['A quiet mountain village', 'A bustling desert trading post', 'A weathered port town', 'A high-altitude settlement'];
(async () => {
  const [repo = require('path').resolve(__dirname, '..', '..'), z = '0', v = '0', mob] = process.argv.slice(2);
  const { browser, page, errors } = await open(repo, { skipImages: true, mobile: !!mob });
  page.on('dialog', d => d.dismiss().catch(() => {}));
  await newGame(page, { zone: ZONES[+z] }); await page.waitForTimeout(1000);
  await loadRichSave(page, { variant: +v });
  const bad = () => errors.filter(e => !e.includes('deoptimised') && !e.includes('404') && !e.includes('Failed to load resource'));
  // nav icons are the first row of short emoji buttons after the header
  const navs = await page.$$eval('button', bs => bs.map((b, i) => ({ i, t: b.innerText.trim() })).filter(x => x.t.length <= 3 && /\p{Extended_Pictographic}/u.test(x.t)).map(x => x.t));
  const uniq = [...new Set(navs)].filter(t => !['💾', '🎵'].includes(t));
  const report = [];
  for (const n of uniq) {
    await page.locator('button', { hasText: n }).first().click({ timeout: 3000 }).catch(() => {});
    await page.waitForTimeout(300);
    // expand all collapsed sections (▼ markers) — up to 3 passes for nested ones
    for (let pass = 0; pass < 3; pass++) {
      const n2 = await page.evaluate(() => { let c = 0; [...document.querySelectorAll('[style*="cursor: pointer"]')].filter(e => e.offsetParent && /▼/.test(e.innerText || '') && (e.innerText || '').length < 120).forEach(e => { e.click(); c++; }); return c; });
      await page.waitForTimeout(250);
      if (!n2) break;
    }
    const crashed = await page.getByText('Cindervale crashed').count();
    const len = (await page.innerText('body')).length;
    report.push(`${n}:${len}`);
    if (crashed || bad().length) {
      console.log('FAIL at screen', n, JSON.stringify(bad()), crashed ? (await page.innerText('body')).slice(0, 1200) : '');
      await browser.close(); process.exit(1);
    }
  }
  console.log(`OK tour zone=${z} variant=${v} screens=${report.join(' ')}`);
  await browser.close();
})();
