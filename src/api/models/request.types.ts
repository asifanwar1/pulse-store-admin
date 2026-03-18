export interface IGetCustomersParams {
    Page?: number;
    Limit?: number;
    Column?: string;
    Direction?: "ASC" | "DESC";
}

export interface IUpdateCustomerStatusBodyType {
    status: "active" | "inactive";
}

export interface IUpdateCustomerStatusBodyType {
    status: "active" | "inactive";
    [key: string]: unknown;
}

export interface ICustomerFilters {
    status?: string;
    search?: string;
    city?: string;
}

export interface IGetNotificationListingsParams {
    page?: number;
    limit?: number;
    readStatus?: string;
    [key: string]: unknown;
}

export interface IReadNotificationsBodyType {
    notificationIds: number[];
    [key: string]: unknown;
}

export interface ListingResponseType<T> {
    data: T[];
    total: number;
}

export interface ReadNotificationsResponseType {
    data: {
        data: number;
    };
}

export interface NotificationUnreadCountResponseType {
    data: number;
}
