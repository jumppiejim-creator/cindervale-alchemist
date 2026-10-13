// Shared test harness: launches headless Chromium, serves the repo at http://game.test/, serves the CDN libraries
// (React, Babel, Tone) from node_modules and stubs Firebase, so tests run offline and never touch real saves.
const { chromium } = require('playwright');
const os = require('os');
const fs = require('fs');
const path = require('path');
const NM = path.join(__dirname, 'node_modules');
const CDN = {
  'react.production.min.js': NM + '/react/umd/react.production.min.js',
  'react-dom.production.min.js': NM + '/react-dom/umd/react-dom.production.min.js',
  'babel.min.js': NM + '/@babel/standalone/babel.min.js',
  'Tone.js': NM + '/tone/build/Tone.js',
};
const MIME = { '.js': 'application/javascript', '.html': 'text/html', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.css': 'text/css' };

async function open(repoDir, opts = {}) {
  // Use a preinstalled Chromium if CHROMIUM_PATH is set (or the cloud workspace's copy exists), else Playwright's own.
  const pre = process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
  const browser = await chromium.launch({ ...(fs.existsSync(pre) ? { executablePath: pre } : {}), args: ['--disable-background-networking', '--disable-component-update', '--disable-sync', '--no-default-browser-check'] });
  const ctx = await browser.newContext({ viewport: opts.mobile ? { width: 390, height: 844 } : { width: 1280, height: 900 }, isMobile: !!opts.mobile, hasTouch: !!opts.mobile, serviceWorkers: 'block' });
  const errors = [];
  const page = await ctx.newPage();
  page.on('pageerror', e => errors.push('PAGEERROR: ' + (e.stack || e.message).split('\n').slice(0, 12).join(' | ')));
  page.on('console', m => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text().slice(0, 400)); });
  await ctx.route('**/*', async route => {
    const u = new URL(route.request().url());
    if (u.hostname === 'game.test') {
      let p = decodeURIComponent(u.pathname); if (p === '/') p = '/index.html';
      const f = path.join(repoDir, p);
      if (fs.existsSync(f) && fs.statSync(f).isFile()) {
        if (opts.skipImages && /\.(png|jpe?g)$/i.test(f)) return route.fulfill({ status: 200, contentType: 'image/png', body: Buffer.alloc(0) });
        return route.fulfill({ status: 200, contentType: MIME[path.extname(f)] || 'application/octet-stream', body: fs.readFileSync(f) });
      }
      return route.fulfill({ status: 404, body: 'nf' });
    }
    if (u.hostname === 'www.gstatic.com' && u.pathname.includes('firebase')) {
      return route.fulfill({ status: 200, contentType: 'application/javascript', body: u.pathname.endsWith('app-compat.js') ? fs.readFileSync(__dirname + '/fbstub.js') : '' });
    }
    const base = path.basename(u.pathname);
    if (CDN[base]) return route.fulfill({ status: 200, contentType: 'application/javascript', body: fs.readFileSync(CDN[base]) });
    return route.fulfill({ status: 404, body: '' });
  });
  await page.goto('http://game.test/index.html');
  return { browser, ctx, page, errors };
}
module.exports = { open };
