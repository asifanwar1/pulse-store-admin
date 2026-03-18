import { request } from "@/api/client/request";

import type {
    IGetNotificationListingsParams,
    IReadNotificationsBodyType,
    ListingResponseType,
    ReadNotificationsResponseType,
    NotificationUnreadCountResponseType
} from "@/api/models/request.types";

import type { TQueryParams } from "@/api/types/common";
import { HTTP_METHODS } from "@/constants";
import type { NotificationModel } from "@/api/models/notification.model";
import type { TReadSingleNotificationResponseType } from "./notifications.request.types";
import { NOTIFICATION_QUERY_KEYS } from "./queryKeys";

export const GetNotificationsListings = async (params?: IGetNotificationListingsParams) => {
    return request<ListingResponseType<NotificationModel>, IGetNotificationListingsParams>({
        method: HTTP_METHODS.GET,
        url: "/notification",
        params: params as TQueryParams
    });
};

export const ReadNotifications = async (body: IReadNotificationsBodyType) => {
    return request<ReadNotificationsResponseType, IReadNotificationsBodyType>({
        method: HTTP_METHODS.POST,
        url: "/notifications/read",
        body
    });
};

export const GetNotificationsUnreadCount = async () => {
    return request<NotificationUnreadCountResponseType, undefined>({
        method: HTTP_METHODS.GET,
        url: "/notifications/unread-count"
    });
};

export const ReadSingleNotification = async (id: number) => {
    return request<TReadSingleNotificationResponseType, undefined>({
        method: HTTP_METHODS.PATCH,
        url: `/notification/${id}/read`
    });
};

export { NOTIFICATION_QUERY_KEYS };
