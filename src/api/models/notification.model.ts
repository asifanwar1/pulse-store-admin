import type {
    NotificationEntityType,
    NotificationType,
} from "@/constants/notification.constants";

export interface NotificationModel {
    id: number;
    type: NotificationType;
    title: string;
    body: string;
    entity_type: NotificationEntityType | null;
    entity_id: number | null;
    data: Record<string, unknown> | null;
    is_read: boolean;
    created_at: string;
    updated_at: string | null;
}
