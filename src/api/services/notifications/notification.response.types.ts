import type { NotificationModel } from "@/api/models/notification.model";

export type TNotification = {
    data: NotificationModel[];
    count: number;
};
export type TReadSingleNotificationBodyType = {
    message: string;
    [key: string]: unknown;
};
