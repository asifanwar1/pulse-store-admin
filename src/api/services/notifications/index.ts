import { request } from "@/api/client/request";
import type { TApiArgs, TQueryParams, WithSignal } from "@/api/types/common";
import { HTTP_METHODS } from "@/constants";
import type {
    TGetNotificationsParams,
    TRegisterDeviceTokenBody,
    TUnregisterDeviceTokenBody,
} from "./notifications.request.types";
import type {
    TDeleteNotificationResponse,
    TGetNotificationsResponse,
    TGetUnreadCountResponse,
    TMarkAllNotificationsReadResponse,
    TMarkNotificationReadResponse,
    TRegisterDeviceTokenResponse,
    TUnregisterDeviceTokenResponse,
} from "./notifications.response.types";
import { NOTIFICATION_QUERY_KEYS } from "./queryKeys";

export const GetNotifications = async (
    params?: WithSignal<TGetNotificationsParams>,
) => {
    const { signal, ...urlParams } = params || {};

    return request<TGetNotificationsResponse, TGetNotificationsParams>({
        method: HTTP_METHODS.GET,
        url: "/notifications/",
        params: urlParams as TQueryParams,
        signal,
    });
};

export const GetNotificationsUnreadCount = async () => {
    return request<TGetUnreadCountResponse, undefined>({
        method: HTTP_METHODS.GET,
        url: "/notifications/unread-count",
    });
};

export const MarkNotificationRead = async ({ id }: TApiArgs) => {
    return request<TMarkNotificationReadResponse, undefined>({
        method: HTTP_METHODS.PATCH,
        url: `/notifications/${id}/read`,
    });
};

export const MarkAllNotificationsRead = async () => {
    return request<TMarkAllNotificationsReadResponse, undefined>({
        method: HTTP_METHODS.PATCH,
        url: "/notifications/read-all",
    });
};

export const DeleteNotification = async ({ id }: TApiArgs) => {
    return request<TDeleteNotificationResponse, undefined>({
        method: HTTP_METHODS.DELETE,
        url: `/notifications/${id}`,
    });
};

export const RegisterDeviceToken = async (body: TRegisterDeviceTokenBody) => {
    return request<TRegisterDeviceTokenResponse, TRegisterDeviceTokenBody>({
        method: HTTP_METHODS.POST,
        url: "/notifications/device-tokens",
        body,
    });
};

export const UnregisterDeviceToken = async (
    body: TUnregisterDeviceTokenBody,
) => {
    return request<TUnregisterDeviceTokenResponse, TUnregisterDeviceTokenBody>(
        {
            method: HTTP_METHODS.DELETE,
            url: "/notifications/device-tokens",
            body,
        },
    );
};

export { NOTIFICATION_QUERY_KEYS };
export type {
    TDeviceTokenPlatform,
    TGetNotificationsParams,
    TRegisterDeviceTokenBody,
    TUnregisterDeviceTokenBody,
} from "./notifications.request.types";
export type {
    TDeleteNotificationResponse,
    TGetNotificationsResponse,
    TGetUnreadCountResponse,
    TMarkAllNotificationsReadResponse,
    TMarkNotificationReadResponse,
    TNotificationResponse,
    TRegisterDeviceTokenResponse,
    TUnregisterDeviceTokenResponse,
} from "./notifications.response.types";
