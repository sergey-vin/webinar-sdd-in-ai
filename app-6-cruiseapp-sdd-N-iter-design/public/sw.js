// CUThere Service Worker — basic offline support
const CACHE_NAME = "cuthere-v1";
const OFFLINE_URL = "/offline.html";

const PRECACHE_URLS = [OFFLINE_URL];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key)),
      ),
    ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Only handle GET requests
  if (event.request.method !== "GET") return;

  // Skip Supabase API calls and next.js internals
  const url = new URL(event.request.url);
  if (url.pathname.startsWith("/rest/") || url.pathname.startsWith("/_next/")) {
    return;
  }

  event.respondWith(
    fetch(event.request).catch(() => {
      // If it's a navigation request, show offline page
      if (event.request.mode === "navigate") {
        return caches.match(OFFLINE_URL);
      }
      return new Response("Offline", { status: 503 });
    }),
  );
});
