const CACHE_NAME = "maymeow-cv-v8";
const OFFLINE_URLS = [
    "/",
    "/manifest.webmanifest",
    "assets/540B352E-C8D9-4875-A75A-55CE892E5017.png",
    "assets/250p_540B352E-C8D9-4875-A75A-55CE892E5017.png",
    "assets/Screenshot_20251120_232810_Chrome.jpg",
    "assets/sq540B352E-C8D9-4875-A75A-55CE892E5017.jpg"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(OFFLINE_URLS))
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
        Promise.all(
            keys.map((key) => {
            if (key !== CACHE_NAME) {
                return caches.delete(key);
            }
            return undefined;
            })
        )
        )
    );
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    const { request } = event;
    if (request.method !== "GET") {
        return;
    }

    event.respondWith(
        caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
            return cachedResponse;
        }
        return fetch(request).then((networkResponse) => {
            const clonedResponse = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, clonedResponse);
            });
            return networkResponse;
        }).catch(() => caches.match("/"));
        })
    );
});
