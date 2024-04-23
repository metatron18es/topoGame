// registerServiceWorker.ts

// Comprueba si el navegador es compatible con Service Workers
if ('serviceWorker' in navigator) {
  // Espera a que la carga de la página esté terminada
  window.addEventListener('load', async () => {
    try {
      // Registra el Service Worker
      const registration = await navigator.serviceWorker.register('./sw.js')
      console.log('Service Worker registrado correctamente:', registration)
    } catch (error) {
      console.error('Error al registrar el Service Worker:', error)
    }
  })
} else {
  console.log('Tu navegador no soporta Service Workers.')
}
