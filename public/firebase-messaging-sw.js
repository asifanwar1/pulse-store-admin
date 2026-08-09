importScripts(
    "https://www.gstatic.com/firebasejs/12.16.0/firebase-app-compat.js",
);
importScripts(
    "https://www.gstatic.com/firebasejs/12.16.0/firebase-messaging-compat.js",
);

firebase.initializeApp({
    apiKey: "AIzaSyDm09cGPFfScShVk1ZnLEhM-5e6Sh7RICk",
    projectId: "pulse-store-8804a",
    messagingSenderId: "359553618908",
    appId: "1:359553618908:web:692c7084e6443347ae3519",
});

const messaging = firebase.messaging();

// Background/tab-closed pushes: show the OS notification ourselves.
// Foreground pushes are handled in-app instead (see src/lib/firebase.ts).
messaging.onBackgroundMessage((payload) => {
    const { title, body } = payload.notification || {};
    self.registration.showNotification(title || "Pulse Store", {
        body,
        // icon: "/your-icon.png", -- add once a real app icon exists in public/
    });
});
