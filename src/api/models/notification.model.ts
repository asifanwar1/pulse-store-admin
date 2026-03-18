export interface NotificationModel {
    id: number;
    userId: number;
    entityId: number | null;
    entityType: string | null;
    type: string;
    title: string;
    body: string;
    data: {
        project_id?: number;
        [key: string]: unknown;
    };
    readStatus: string;
    visibilityStatus: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}
