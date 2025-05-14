self.addEventListener("push", (event) => {
  let data = {};

  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = {
        title: "Notifikasi",
        options: {
          body: event.data.text(),
        },
      };
    }
  }

  const title = data.title || "Story berhasil dibuat";
  const options = {
    body: data.options?.body || "Anda telah membuat story baru.",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
