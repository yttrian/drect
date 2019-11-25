self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open('drect').then(function (cache) {
            return cache.addAll([
                '/', 'drect.js', 'drect.css', 'favicon.ico'
            ]);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});