if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
        
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('New content is available; please refresh.');
                if (confirm('发现新版本，是否立即刷新？')) {
                  window.location.reload();
                }
              }
            });
          }
        });

        setInterval(() => {
          registration.update();
        }, 60000);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
}
