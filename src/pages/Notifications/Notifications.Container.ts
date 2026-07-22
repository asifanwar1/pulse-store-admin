import { useState } from "react";

import {
    useGetNotifications,
    useMarkAllNotificationsRead,
    useMarkNotificationRead,
} from "@/hooks/api/notifications.queries";

const PAGE_LIMIT = 20;

export const useNotifications = () => {
    const [page, setPage] = useState(1);

    const { data, isPending } = useGetNotifications({
        page,
        limit: PAGE_LIMIT,
    });
    const { mutate: markAsRead } = useMarkNotificationRead();
    const { mutate: markAllAsRead, isPending: isMarkingAllAsRead } =
        useMarkAllNotificationsRead();

    const notifications = data?.data ?? [];
    const totalCount = data?.count ?? 0;
    const hasNextPage = page * PAGE_LIMIT < totalCount;
    const hasPreviousPage = page > 1;

    return {
        notifications,
        totalCount,
        isPending,
        page,
        hasNextPage,
        hasPreviousPage,
        goToNextPage: () => setPage((prev) => prev + 1),
        goToPreviousPage: () => setPage((prev) => Math.max(1, prev - 1)),
        markAsRead,
        markAllAsRead,
        isMarkingAllAsRead,
    };
};
