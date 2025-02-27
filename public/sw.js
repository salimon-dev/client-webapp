self.addEventListener("install", () => {
  console.log("installed");
});

self.addEventListener("activate", () => {
  console.log("activated");
});

self.addEventListener("push", function (e) {
  const data = e.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
  });
});
