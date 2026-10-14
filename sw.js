const CACHE_NAME = 'cindervale-v3'; // bump to force-clear old caches on the next visit
const ASSETS = [
  './',
  './index.html',
  './game-data.js',
  './game.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './portraits.js',
  './location-images.js',
  './npc-portraits.js'
];

// CDN resources to cache for offline play
const CDN_ASSETS = [
  'https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.js',
  'https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth-compat.js',
  'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.all([
        cache.addAll(ASSETS),
        // CDN assets: fetch individually so one failure doesn't block install
        ...CDN_ASSETS.map(url =>
          fetch(url, { mode: 'cors' })
            .then(r => r.ok ? cache.put(url, r) : null)
            .catch(() => null)
        )
      ])
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Let Firebase auth/firestore API calls go straight to network
  if (url.hostname.includes('googleapis.com') ||
      url.hostname.includes('firebaseio.com') ||
      url.hostname.includes('firestore.googleapis.com') ||
      url.hostname.includes('identitytoolkit.googleapis.com') ||
      url.hostname.includes('securetoken.googleapis.com')) {
    return;
  }

  // Network-first for the page and all of our own scripts/data (get latest, fall back to cache offline).
  // Cache-first here would pin returning players to stale portraits.js / npc-portraits.js etc.
  if (e.request.destination === 'document' ||
      (url.origin === self.location.origin && /\.(html|js|json)$/.test(url.pathname))) {
    e.respondWith(
      fetch(e.request)
        .then(r => {
          const clone = r.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
          return r;
        })
        // offline: exact URL first, else the precached copy (pages ask for game.js?v=..., the precache holds ./game.js)
        .catch(() => caches.match(e.request).then(r => r || caches.match(e.request, { ignoreSearch: true })))
    );
    return;
  }

  // Cache-first for everything else (icons, CDN libs, fonts)
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(r => {
        if (r.ok && (url.protocol === 'https:')) {
          const clone = r.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        }
        return r;
      });
    }).catch(() => new Response('Offline', { status: 503 }))
  );
});
