const CACHE_NAME = 'cindervale-v3';
const STATIC_ASSETS = [
  '/portraits.js',
  '/location-images.js',
  '/npc-portraits.js',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
];

// Install: cache static assets only (not index.html — that uses network-first)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate: clean up ALL old caches immediately
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => {
          console.log('[SW] Removing old cache:', key);
          return caches.delete(key);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch strategy:
// - HTML/navigation: NETWORK-FIRST (always get latest deploy)
// - Static assets (.js, .png, .json): cache-first (they change rarely)
// - External: network-first with cache fallback
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // External requests: network-first
  if (!url.href.startsWith(self.location.origin)) {
    event.respondWith(
      fetch(event.request).then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => caches.match(event.request))
    );
    return;
  }

  // HTML / navigation requests: NETWORK-FIRST (critical for updates!)
  if (event.request.mode === 'navigate' || url.pathname === '/' || url.pathname.endsWith('.html')) {
    event.respondWith(
      fetch(event.request).then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // Offline: serve cached HTML
        return caches.match(event.request) || caches.match('/index.html');
      })
    );
    return;
  }

  // Static assets: cache-first (portraits.js, images, etc.)
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200) return response;
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      });
    }).catch(() => null)
  );
});
