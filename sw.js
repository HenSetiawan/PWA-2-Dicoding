const CACHE_NAME="balbalanku2";
const urlToCache=[
    '/',
    // html
    'index.html',
    '/pages/nav.html',
    '/pages/classement.html',
    '/pages/favorite.html',
    '/pages/schedule.html',
    // img
    '/img/icon-144x144.png',
    '/img/loader.gif',
    '/img/juniorplayer.svg',
    '/img/grade.svg',
    // css
    '/css/style.css',
    '/css/classement.css',
    '/css/materialize.min.css',
    '/css/favorite.css',
    '/css/detailPage.css',
    // js
    '/js/app.js',
    '/js/classement.js',
    '/js/detailTeam.js',
    '/js/favorite.js',
    '/js/idb.js',
    '/js/materialize.min.js',
    '/js/registerSw.js',
    'js/schedule.js',
    'manifest.json',
];


// simpan data ke cache
self.addEventListener("install",function(event){
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache=>{
      return cache.addAll(urlToCache);
    })
    .catch(err=>{
      console.log(err);
    })
  )
})



self.addEventListener("fetch", function (event) {
  if (event.request.url.includes("football-data.org")) {
    event.respondWith(async function () {
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = await cache.match(event.request);
      if (cachedResponse) return cachedResponse;
      const networkResponse = await fetch(event.request);
      event.waitUntil(
        cache.put(event.request, networkResponse.clone())
      );
      return networkResponse;
    }());
  } else {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        return response || fetch(event.request);
      })
    )
  }
});




self.addEventListener('activate',function(event){
  event.waitUntil(
    caches.keys()
    .then(cacheNames=>{
      return Promise.all(
        cacheNames.map(cacheName=>{
          if(!cacheName===CACHE_NAME){
            return caches.delete(cacheName);
          }
        })
      )
    })
  )
})


self.addEventListener('push',event=>{
  const options={
      body:event.data.text()
  }

  event.waitUntil(
      self.registration.showNotification('Push Notification', options)
  )
})