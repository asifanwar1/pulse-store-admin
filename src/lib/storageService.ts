import type { StorageKey } from "../constants/storage.constants";

export const setItem = <T>(key: StorageKey, value: T): void => {
    try {
        if (typeof window === "undefined") return;
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Error setting item ${key}:`, error);
    }
};

export const removeItem = (key: StorageKey): void => {
    try {
        if (typeof window === "undefined") return;
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`Error removing item ${key}:`, error);
    }
};

export const clearStorage = (): void => {
    try {
        if (typeof window === "undefined") return;
        localStorage.clear();
    } catch (error) {
        console.error("Error clearing storage:", error);
    }
};
