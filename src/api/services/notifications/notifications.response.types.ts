import type { NotificationModel } from "@/api/models/notification.model";

export type TNotificationResponse = NotificationModel;

export type TGetNotificationsResponse = {
    data: TNotificationResponse[];
    count: number;
};

export type TGetUnreadCountResponse = {
    count: number;
};

export type TMarkNotificationReadResponse = TNotificationResponse;
export type TMarkAllNotificationsReadResponse = void;
export type TDeleteNotificationResponse = void;
export type TRegisterDeviceTokenResponse = { status: string };
export type TUnregisterDeviceTokenResponse = void;
