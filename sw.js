const CACHE_NAME = 'cindervale-v2';
const ASSETS = [
  '/',
  '/index.html',
  '/portraits.js',
  '/location-images.js',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  // Workshop images
  '/ws_base_workshop.png',
  '/ws_base_grounds.png',
  '/ws_base_storefront.png',
  '/ws_base_quarters.png',
  '/ws_swap_shopfront.png',
  '/ws_swap_beds.png',
  '/ws_swap_garden.png',
  '/ws_cauldron_2.png',
  '/ws_cauldron_3.png',
  '/ws_mortar.png',
  '/ws_runic_tools.png',
  '/ws_bench_1.png',
  '/ws_bench_2.png',
  '/ws_shelves.png',
  '/ws_cellar.png',
  '/ws_vault.png',
  '/ws_ledger.png',
  '/ws_signage.png',
  '/ws_display.png',
  '/ws_rep_board.png',
  '/ws_hearth.png',
  '/ws_library.png',
  '/ws_forge.png',
  '/ws_leyline.png',
  '/ws_greenhouse.png',
  // NPC portraits
  '/npc_brenna.png',
  '/npc_tarn.png',
  '/npc_holst.png',
  '/npc_marta.png',
  '/npc_gretta.png',
  '/npc_thorek.png',
  '/npc_fiona.png',
  '/npc_barret.png',
  '/npc_mama_grinn.png',
  '/npc_jax.png',
  '/npc_sister_venna.png',
  '/npc_rorik.png',
  '/npc_anya.png',
  '/npc_gorrik.png',
  '/npc_sera.png'
];

// Install: cache all static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Caching app assets');
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate: clean up old caches
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

// Fetch: serve from cache first, fall back to network
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip external requests (Google Fonts, CDNs)
  if (!event.request.url.startsWith(self.location.origin)) {
    // For external resources, try network first, cache as fallback
    event.respondWith(
      fetch(event.request).then(response => {
        // Cache a copy of external resources too
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      }).catch(() => caches.match(event.request))
    );
    return;
  }

  // For local assets: cache-first strategy
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Don't cache bad responses
        if (!response || response.status !== 200) return response;
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      });
    }).catch(() => {
      // Offline fallback for navigation requests
      if (event.request.mode === 'navigate') {
        return caches.match('/index.html');
      }
    })
  );
});
