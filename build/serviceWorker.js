const cacheShell = 'app-shell';
const cacheData = 'app-data';
/*não está salvando no cache Storage - VER */
const filesToCache = [//modifiquei
  '/',
  "/index.html",
  "/favicon.ico",
  "../src/App.css",
  "/src/App.js",
  "/src/index.js",
  "/src/index.css"
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== cacheShell && key !== cacheData) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

// network, then cache
// para cada request é realizado um fetch, e a cache é atualizada com o resultado, que é retornado
// caso o request falhe (caso o app esteja offline, por exemplo), o resultado armazenado na cache é retornado

self.addEventListener('fetch', e => {
  console.log('[Service Worker] Fetch', e.request.url);
  e.respondWith(
    caches.open(cacheData).then(function(cache) {
      return fetch(e.request).then(response => {
        cache.put(e.request.url, response.clone());
        return response;
      })
    }).catch(() => caches.match(e.request))
  )
})