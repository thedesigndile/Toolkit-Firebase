const CACHE_NAME = 'offline-toolkit-v1.0.0';
const STATIC_CACHE = 'offline-toolkit-static-v1.0.0';
const DYNAMIC_CACHE = 'offline-toolkit-dynamic-v1.0.0';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/favicon.ico',
  '/manifest.json',
  '/offline.html',
  // Add other critical assets
];

// API endpoints that should be cached
const API_CACHE_PATTERNS = [
  /\/api\//,
  /\/_next\/static\//,
  /\/fonts\//,
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Install event');

  event.waitUntil(
    (async () => {
      const cache = await caches.open(STATIC_CACHE);
      console.log('[SW] Caching static assets');

      try {
        await cache.addAll(STATIC_ASSETS);
        console.log('[SW] Static assets cached successfully');
      } catch (error) {
        console.error('[SW] Failed to cache static assets:', error);
        // Continue with installation even if some assets fail
      }

      // Skip waiting to activate immediately
      self.skipWaiting();
    })()
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activate event');

  event.waitUntil(
    (async () => {
      // Clean up old caches
      const cacheNames = await caches.keys();
      const oldCaches = cacheNames.filter(name =>
        name !== STATIC_CACHE &&
        name !== DYNAMIC_CACHE &&
        name.startsWith('offline-toolkit')
      );

      await Promise.all(
        oldCaches.map(cacheName => {
          console.log('[SW] Deleting old cache:', cacheName);
          return caches.delete(cacheName);
        })
      );

      // Take control of all clients
      await self.clients.claim();
      console.log('[SW] Service worker activated and controlling clients');
    })()
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip Chrome extension requests
  if (url.protocol === 'chrome-extension:') return;

  // Handle API requests
  if (API_CACHE_PATTERNS.some(pattern => pattern.test(url.pathname))) {
    event.respondWith(handleApiRequest(request));
    return;
  }

  // Handle static assets
  if (url.pathname.match(/\.(css|js|png|jpg|jpeg|svg|ico|woff|woff2)$/)) {
    event.respondWith(handleStaticAsset(request));
    return;
  }

  // Handle navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(handleNavigationRequest(request));
    return;
  }

  // Default fetch strategy
  event.respondWith(
    caches.match(request)
      .then(response => response || fetch(request))
  );
});

// Handle API requests with network-first strategy
async function handleApiRequest(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      // Cache successful responses
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
  } catch (error) {
    console.log('[SW] Network failed for API request, trying cache');
  }

  // Fallback to cache
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  // Return offline response for API calls
  return new Response(
    JSON.stringify({
      error: 'Offline',
      message: 'This feature requires an internet connection'
    }),
    {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'application/json' }
    }
  );
}

// Handle static assets with cache-first strategy
async function handleStaticAsset(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('[SW] Failed to fetch static asset:', error);
    return new Response('Asset not available offline', { status: 404 });
  }
}

// Handle navigation requests
async function handleNavigationRequest(request) {
  try {
    // Try network first for navigation
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      return networkResponse;
    }
  } catch (error) {
    console.log('[SW] Network failed for navigation, serving offline page');
  }

  // Serve cached page or offline fallback
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  // Serve offline page
  const offlineResponse = await caches.match('/offline.html');
  if (offlineResponse) {
    return offlineResponse;
  }

  // Ultimate fallback
  return new Response(
    `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Offline - Offline Toolkit</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        body {
          font-family: system-ui, -apple-system, sans-serif;
          text-align: center;
          padding: 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .container {
          max-width: 500px;
          background: rgba(255, 255, 255, 0.1);
          padding: 2rem;
          border-radius: 20px;
          backdrop-filter: blur(10px);
        }
        h1 { margin-bottom: 1rem; }
        p { opacity: 0.9; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>You're Offline</h1>
        <p>Please check your internet connection and try again.</p>
        <p>Some features may not be available offline.</p>
      </div>
    </body>
    </html>
    `,
    {
      headers: { 'Content-Type': 'text/html' }
    }
  );
}

// Background sync for failed requests
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync triggered:', event.tag);

  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Implement background sync logic here
  console.log('[SW] Performing background sync');
}

// Push notifications (if needed in the future)
self.addEventListener('push', (event) => {
  console.log('[SW] Push message received:', event);

  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/icon-192x192.png',
      badge: '/icon-192x192.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification click received');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('/')
  );
});

// Message handler for communication with the main thread
self.addEventListener('message', (event) => {
  console.log('[SW] Message received:', event.data);

  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'GET_CACHE_INFO') {
    getCacheInfo().then(cacheInfo => {
      event.ports[0].postMessage(cacheInfo);
    });
  }
});

// Get cache information
async function getCacheInfo() {
  const cacheNames = await caches.keys();
  const cacheInfo = {};

  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    cacheInfo[cacheName] = {
      name: cacheName,
      count: keys.length,
      size: 'Unknown' // Would need to calculate actual size
    };
  }

  return cacheInfo;
}

// Periodic cleanup
setInterval(async () => {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    const keys = await cache.keys();

    // Remove old entries (older than 1 hour)
    const oneHourAgo = Date.now() - (60 * 60 * 1000);
    const oldEntries = keys.filter(request => {
      const response = cache.match(request);
      // This is a simplified check - in reality you'd need to check response headers
      return true; // Placeholder
    });

    await Promise.all(
      oldEntries.map(request => cache.delete(request))
    );

    if (oldEntries.length > 0) {
      console.log(`[SW] Cleaned up ${oldEntries.length} old cache entries`);
    }
  } catch (error) {
    console.error('[SW] Cache cleanup failed:', error);
  }
}, 30 * 60 * 1000); // Run every 30 minutes