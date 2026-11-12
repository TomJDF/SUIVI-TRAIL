// Hors ligne : la page et le renfo d'abord depuis le réseau (sans passer par le cache du navigateur, pour avoir tout de suite la dernière version), sinon depuis le cache.
const C = 'saison-v40';
const FILES = ['./', 'index.html', 'plan.js', 'renfo.html', 'manifest.json', 'icon-192.png', 'icon-512.png', 'icon-180.png', 'logo.svg', 'fonts/archivo.woff2'];
self.addEventListener('install', e => { e.waitUntil(caches.open(C).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request, { cache: 'no-cache' }).then(r => { const copy = r.clone(); caches.open(C).then(c => c.put(e.request, copy)); return r; })
    .catch(() => caches.match(e.request, { ignoreSearch: true })));
});
