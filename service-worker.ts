import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';


declare global {
  interface Window {
    __WB_MANIFEST: {
      [key: string]: string;
    };
  }
}

// Obtén el manifiesto
const manifest = self.__WB_MANIFEST;

// Convierte el objeto __WB_MANIFEST en un array de cadenas
const precacheResources = Object.keys(manifest).map((key) => manifest[key]);

// Configura el precaching para los recursos necesarios
precacheAndRoute(precacheResources);

// Registra una ruta para el manejo de solicitudes
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({
    cacheName: 'page-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// Registra una ruta para el manejo de recursos estáticos
registerRoute(
  ({ request }) => request.destination === 'style' || request.destination === 'script',
  new StaleWhileRevalidate({
    cacheName: 'asset-cache',
  })
);