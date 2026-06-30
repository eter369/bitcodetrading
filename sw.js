/* Service worker — Omraam · Patrimonio Cripto */
const VERSION = 'v3';
const CACHE = 'omraam-' + VERSION;
const ASSETS = ['/', '/index.html', '/favicon-v2.png', '/icon-192.png', '/og-cover.jpg', '/poster.jpg', '/manifest.json'];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS).catch(() => {})).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Never intercept live market data (Binance REST/WS)
  if (url.hostname.indexOf('binance') > -1) return;

  if (req.mode === 'navigate') {
    // network-first for the page so updates show; fall back to cached shell offline
    e.respondWith(
      fetch(req).then((r) => { const cp = r.clone(); caches.open(CACHE).then((c) => c.put(req, cp)); return r; })
                .catch(() => caches.match(req).then((m) => m || caches.match('/index.html')))
    );
    return;
  }
  if (url.origin === location.origin) {
    // stale-while-revalidate: serve cache instantly, refresh in background; on miss go to network
    e.respondWith(
      caches.match(req).then((m) => {
        const net = fetch(req).then((r) => {
          if (r && r.ok) { const cp = r.clone(); caches.open(CACHE).then((c) => c.put(req, cp)); }
          return r;
        }).catch(() => m);
        return m || net;
      })
    );
  }
});
