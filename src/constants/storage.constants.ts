export const STORAGE_KEYS = {
    AUTH: "auth",
    USER_INFO: "user_info",
    DEVICE_INFO: "device_info",
    REACT_QUERY: "reactQuery"
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
