import { useEffect, useState } from "react";

import {
    useGetNotifications,
    useGetNotificationsUnreadCount,
    useMarkAllNotificationsRead,
    useMarkNotificationRead,
    useRegisterDeviceToken,
} from "@/hooks/api/notifications.queries";
import { onForegroundPushMessage, requestPushToken } from "@/lib/firebase";
import { showToast } from "@/lib/toast";
import { useStore } from "@/store/store";

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

    // Registers this browser for push once per authenticated session, and
    // surfaces foreground pushes as a toast (FCM only shows the OS
    // notification itself for background/closed tabs).
    useEffect(() => {
        if (!isAuthenticated) return;

        requestPushToken().then((token) => {
            if (token) registerDeviceToken({ token, platform: "web" });
        });

        let unsubscribe: (() => void) | undefined;
        onForegroundPushMessage(({ title, body }) => {
            showToast.info([title, body].filter(Boolean).join(": "));
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
