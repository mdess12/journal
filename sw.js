const C="journal-v1";
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(["./","index.html","manifest.json","icon-192.png","icon-512.png"])))});
self.addEventListener("activate",e=>e.waitUntil(clients.claim()));
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  e.respondWith(caches.match(e.request).then(r=>{
    const net=fetch(e.request).then(n=>{
      if(n.ok&&e.request.url.startsWith(self.location.origin)){const c=n.clone();caches.open(C).then(x=>x.put(e.request,c))}
      return n}).catch(()=>r);
    return r||net}))});
