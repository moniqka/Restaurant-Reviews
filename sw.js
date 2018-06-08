/**
 * Help Resources:
 * https://developers.google.com/web/fundamentals/primers/service-workers/
 * Lesson 13: Introducing to service worker
 */

const staticCacheName = 'restaurant-v1';
const urlsToCache = [
    './',
    './index.html',
    './restaurant.html',
    './restaurant.html?id=1',
    './restaurant.html?id=2',
    './restaurant.html?id=3',
    './restaurant.html?id=4',
    './restaurant.html?id=5',
    './restaurant.html?id=6',
    './restaurant.html?id=7',
    './restaurant.html?id=8',
    './restaurant.html?id=9',
    './restaurant.html?id=10',
    './js/main.js',
    './js/dbhelper.js',
    './js/restaurant_info.js',
    './css/styles.css',
    './css/responsive.css',
    './data/restaurants.json',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
    './img/10.jpg'
];

/**
 * Install and cache files
 */
self.addEventListener('install', event => {
    //console.log('installing');
    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
            //console.log("cashing");
            return cache.addAll(urlsToCache)
        })
    );
});

/**
 * Delete old cache and activate new service worker
 */
self.addEventListener('activate', (event) => {
    //console.log('activating');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => {
                    return cacheName.startsWith('restaurant-') &&
                           cacheName != staticCacheName;
                }).map(cacheName => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

/**
 * Fetch cached files
 */
self.addEventListener('fetch', event => {
    //console.log('fetching');
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                return response;
            }
            return fetch(event.request)
        })
    );
});