import type { NotificationModel } from "@/api/models/notification.model";

export type Notification = {
    id: string;
    avatarUrl: string;
    title: string;
    message: string;
    time: string;
    read?: boolean;
};

export interface NotificationCardProps {
    notification: NotificationModel;
    onClose?: () => void;
}
