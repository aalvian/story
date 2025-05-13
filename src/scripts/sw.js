// self.addEventListener('push', (event) => {
//   console.log('Service worker pushing...');
 
//   async function chainPromise() {
//     await self.registration.showNotification('Ada catatan baru untuk Anda!', {
//       body: 'Semangat untuk belajar!',
//     });
//   }
 
//   event.waitUntil(chainPromise());
// });

self.addEventListener('push', (event) => {
  const payload = event.data?.json() || {
    title: 'Story Notification',
    options: {
      body: 'Anda memiliki notifikasi baru'
    }
  };

  event.waitUntil(
    self.registration.showNotification(
      payload.title,
      payload.options
    )
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data?.url || '/')
  );
});