export type TGetNotificationsParams = {
    page?: number;
    limit?: number;
    is_read?: boolean | null;
};

export type TDeviceTokenPlatform = "web" | "android" | "ios";

export type TRegisterDeviceTokenBody = {
    token: string;
    platform: TDeviceTokenPlatform;
};

export type TUnregisterDeviceTokenBody = {
    token: string;
};
