import { useEffect, useState } from "react";

import {
    useGetNotifications,
    useGetNotificationsUnreadCount,
    useMarkAllNotificationsRead,
    useMarkNotificationRead,
    useRegisterDeviceToken,
} from "@/hooks/api/notifications.queries";
import { NOTIFICATION_QUERY_KEYS } from "@/api";
import { onForegroundPushMessage, requestPushToken } from "@/lib/firebase";
import { showToast } from "@/lib/toast";
import { queryClient } from "@/lib/queryClient";
import { useStore } from "@/store/store";
import { invalidateMultiple } from "@/utils/common.utils";

const DROPDOWN_PREVIEW_LIMIT = 10;

export const useNotificationDropdown = () => {
    const [open, setOpen] = useState(false);
    const isAuthenticated = useStore((state) => state.isAuthenticated);

    const { data: unreadData } = useGetNotificationsUnreadCount();
    const { data: notificationsData, isPending } = useGetNotifications({
        page: 1,
        limit: DROPDOWN_PREVIEW_LIMIT,
    });
    const { mutate: markAsRead } = useMarkNotificationRead();
    const { mutate: markAllAsRead, isPending: isMarkingAllAsRead } =
        useMarkAllNotificationsRead();
    const { mutate: registerDeviceToken } = useRegisterDeviceToken();

    useEffect(() => {
        if (!isAuthenticated) return;

        requestPushToken().then((token) => {
            if (token) registerDeviceToken({ token, platform: "web" });
        });

        let unsubscribe: (() => void) | undefined;
        onForegroundPushMessage(({ title, body }) => {
            showToast.info([title, body].filter(Boolean).join(": "));
            invalidateMultiple(queryClient, [
                [NOTIFICATION_QUERY_KEYS.NOTIFICATIONS],
                [NOTIFICATION_QUERY_KEYS.UNREAD_COUNT],
            ]);
        }).then((unsub) => {
            unsubscribe = unsub;
        });

        return () => unsubscribe?.();
    }, [isAuthenticated, registerDeviceToken]);

    const handleOpenChange = (newOpen: boolean) => setOpen(newOpen);
    const handleClose = () => setOpen(false);

    return {
        notifications: notificationsData?.data ?? [],
        isPending,
        unreadCount: unreadData?.count ?? 0,
        open,
        handleOpenChange,
        handleClose,
        markAsRead,
        markAllAsRead,
        isMarkingAllAsRead,
    };
};
