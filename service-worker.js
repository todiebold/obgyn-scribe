// OB/GYN Scribe — Service Worker
// Caches the app shell for offline access and faster loads
const CACHE = 'obgynscribe-v1';

const PRECACHE = [
  '/obgyn-scribe/',
  '/obgyn-scribe/index.html',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=DM+Mono:wght@500&display=swap'
];

// Install — cache app shell
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(PRECACHE);
    }).then(function() {
      return self.skipWaiting();
    })
  );
});

// Activate — clean old caches
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE; })
            .map(function(k) { return caches.delete(k); })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

// Fetch — serve from cache when offline, network first when online
self.addEventListener('fetch', function(e) {
  // Never intercept GAS API calls — always need live network
  if (e.request.url.includes('script.google.com')) {
    return;
  }

  e.respondWith(
    fetch(e.request)
      .then(function(response) {
        // Cache successful GET responses for app shell
        if (e.request.method === 'GET' && response.status === 200) {
          var clone = response.clone();
          caches.open(CACHE).then(function(cache) {
            cache.put(e.request, clone);
          });
        }
        return response;
      })
      .catch(function() {
        // Offline fallback — serve from cache
        return caches.match(e.request).then(function(cached) {
          return cached || caches.match('/obgyn-scribe/index.html');
        });
      })
  );
});
