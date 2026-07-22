import type { NotificationModel } from "@/api/models/notification.model";

export interface NotificationCardProps {
    notification: NotificationModel;
    onMarkAsRead?: (id: number) => void;
    onClose?: () => void;
}
