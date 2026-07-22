import { useMutation, useQuery } from "@tanstack/react-query";

import {
    DeleteNotification,
    GetNotifications,
    GetNotificationsUnreadCount,
    MarkAllNotificationsRead,
    MarkNotificationRead,
    NOTIFICATION_QUERY_KEYS,
    RegisterDeviceToken,
} from "@/api";
import type {
    TGetNotificationsParams,
    TRegisterDeviceTokenBody,
} from "@/api/services/notifications/notifications.request.types";
import { queryClient } from "@/lib/queryClient";
import { useStore } from "@/store/store";
import { invalidateMultiple } from "@/utils/common.utils";

const UNREAD_COUNT_POLL_INTERVAL_MS = 25_000;

export const useGetNotifications = (params: TGetNotificationsParams = {}) => {
    const isAuthenticated = useStore((state) => state.isAuthenticated);
    const { page = 1, limit = 20, is_read } = params;

    return useQuery({
        queryKey: [NOTIFICATION_QUERY_KEYS.NOTIFICATIONS, page, limit, is_read],
        enabled: isAuthenticated,
        queryFn: () =>
            GetNotifications({
                page,
                limit,
                ...(is_read !== undefined && is_read !== null && { is_read }),
            }),
    });
};

export const useGetNotificationsUnreadCount = () => {
    const isAuthenticated = useStore((state) => state.isAuthenticated);

    return useQuery({
        queryKey: [NOTIFICATION_QUERY_KEYS.UNREAD_COUNT],
        enabled: isAuthenticated,
        refetchInterval: UNREAD_COUNT_POLL_INTERVAL_MS,
        refetchIntervalInBackground: true,
        queryFn: () => GetNotificationsUnreadCount(),
    });
};

export const useMarkNotificationRead = () => {
    return useMutation({
        mutationFn: (id: number) => MarkNotificationRead({ id }),
        onSuccess: async () => {
            await invalidateMultiple(queryClient, [
                [NOTIFICATION_QUERY_KEYS.NOTIFICATIONS],
                [NOTIFICATION_QUERY_KEYS.UNREAD_COUNT],
            ]);
        },
    });
};

export const useMarkAllNotificationsRead = () => {
    return useMutation({
        mutationFn: () => MarkAllNotificationsRead(),
        onSuccess: async () => {
            await invalidateMultiple(queryClient, [
                [NOTIFICATION_QUERY_KEYS.NOTIFICATIONS],
                [NOTIFICATION_QUERY_KEYS.UNREAD_COUNT],
            ]);
        },
    });
};

export const useDeleteNotification = () => {
    return useMutation({
        mutationFn: (id: number) => DeleteNotification({ id }),
        onSuccess: async () => {
            await invalidateMultiple(queryClient, [
                [NOTIFICATION_QUERY_KEYS.NOTIFICATIONS],
                [NOTIFICATION_QUERY_KEYS.UNREAD_COUNT],
            ]);
        },
    });
};

export const useRegisterDeviceToken = () => {
    return useMutation({
        mutationFn: (body: TRegisterDeviceTokenBody) =>
            RegisterDeviceToken(body),
    });
};
