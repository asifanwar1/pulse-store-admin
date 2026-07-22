import { initializeApp, type FirebaseApp } from "firebase/app";
import {
    getMessaging,
    getToken,
    isSupported,
    onMessage,
    type Messaging,
} from "firebase/messaging";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let app: FirebaseApp | null = null;
let messaging: Messaging | null = null;

const getFirebaseMessaging = async (): Promise<Messaging | null> => {
    if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
        // Firebase isn't configured yet -- in-app notifications still work,
        // this only disables browser push until VITE_FIREBASE_* is set.
        return null;
    }
    if (!(await isSupported())) {
        return null;
    }
    if (!app) {
        app = initializeApp(firebaseConfig);
    }
    if (!messaging) {
        messaging = getMessaging(app);
    }
    return messaging;
};

// Requests browser notification permission and returns an FCM registration
// token, or null if push isn't configured/supported/denied. Never throws --
// callers register the token when present and no-op otherwise.
export const requestPushToken = async (): Promise<string | null> => {
    try {
        const messagingInstance = await getFirebaseMessaging();
        if (!messagingInstance) return null;

        if (Notification.permission === "default") {
            const permission = await Notification.requestPermission();
            if (permission !== "granted") return null;
        }
        if (Notification.permission !== "granted") return null;

        return await getToken(messagingInstance, {
            vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
        });
    } catch (error) {
        console.error("Failed to get push notification token:", error);
        return null;
    }
};

// Foreground pushes don't show a native OS notification by design (that's
// FCM's behavior for app-in-focus tabs), so we surface them as a toast instead.
// Returns an unsubscribe function (or undefined if push isn't available) so
// callers can clean up in a useEffect.
export const onForegroundPushMessage = async (
    callback: (payload: { title?: string; body?: string }) => void,
): Promise<(() => void) | undefined> => {
    const messagingInstance = await getFirebaseMessaging();
    if (!messagingInstance) return undefined;

    return onMessage(messagingInstance, (payload) => {
        callback({
            title: payload.notification?.title,
            body: payload.notification?.body,
        });
    });
};
