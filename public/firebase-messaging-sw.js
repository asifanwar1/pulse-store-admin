// Firebase Web Push service worker. Must be served from the site root
// (public/firebase-messaging-sw.js -> /firebase-messaging-sw.js) so its scope
// covers the whole app -- this is how the Firebase Messaging SDK finds it.
//
// These values are the public Firebase *web app* config (not secrets -- see
// https://firebase.google.com/docs/projects/api-keys). REPLACE with your
// project's values from the Firebase Console (Project settings > General).
// This file can't read Vite's import.meta.env, so the config is duplicated
// here from .env's VITE_FIREBASE_* values.
importScripts("https://www.gstatic.com/firebasejs/12.16.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.16.0/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "REPLACE_WITH_VITE_FIREBASE_API_KEY",
    projectId: "REPLACE_WITH_VITE_FIREBASE_PROJECT_ID",
    messagingSenderId: "REPLACE_WITH_VITE_FIREBASE_MESSAGING_SENDER_ID",
    appId: "REPLACE_WITH_VITE_FIREBASE_APP_ID",
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
