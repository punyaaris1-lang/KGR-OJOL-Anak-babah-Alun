const CACHE_NAME = 'kgr-pwa-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/login.html',
  '/anggota.html',
  '/donatur.html',
  '/pengajuan.html',
  '/laporan.html',
  '/superadmin.html',
  '/profil.html',
  '/manifest.json',
  '/icon.png' // Pastikan lu punya file gambar icon.png di folder lu
];

// 1. INSTALL: Simpan file-file penting ke Cache HP
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
  // Langsung paksa service worker baru buat jalan
  self.skipWaiting();
});

// 2. ACTIVATE: Bersihkan Cache lama kalau ada update versi
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 3. FETCH: Strategi "Network First, fallback to Cache"
// Biar data Firebase tetep realtime, tapi kalau sinyal jelek tetep bisa buka kerangka webnya.
self.addEventListener('fetch', (event) => {
  // Hanya proses request GET (bukan POST dari Firebase API)
  if (event.request.method !== 'GET') return;
  // Abaikan request dari luar (seperti API font atau gstatic)
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Kalau internet jalan, update cache-nya
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      })
      .catch(() => {
        // Kalau internet mati, ambil dari Cache
        return caches.match(event.request);
      })
  );
});
