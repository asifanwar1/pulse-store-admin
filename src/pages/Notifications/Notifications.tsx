import React from "react";

import { Button } from "@/components/ui/button";
import NotificationCard from "@/components/custom/NotificationDropDown/NotificationCard";
import NotificationSkeleton from "@/components/custom/NotificationDropDown/NotificationSkeleton";
import { useNotifications } from "./Notifications.Container";

const Notifications: React.FC = () => {
    const {
        notifications,
        totalCount,
        isPending,
        hasNextPage,
        hasPreviousPage,
        goToNextPage,
        goToPreviousPage,
        markAsRead,
        markAllAsRead,
        isMarkingAllAsRead,
    } = useNotifications();

    return (
        <div className="flex flex-col gap-6 p-4 sm:p-6 min-h-0">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">Notifications</h1>
                {totalCount > 0 && (
                    <Button
                        variant="ghost"
                        disabled={isMarkingAllAsRead}
                        onClick={() => markAllAsRead()}
                    >
                        Mark all as read
                    </Button>
                )}
            </div>

            {isPending ? (
                <NotificationSkeleton />
            ) : notifications.length === 0 ? (
                <div className="flex items-center justify-center text-gray-400 py-12">
                    No notifications yet
                </div>
            ) : (
                <div className="flex flex-col rounded-2xl border border-muted/30 bg-white p-2">
                    {notifications.map((notification) => (
                        <NotificationCard
                            key={notification.id}
                            notification={notification}
                            onMarkAsRead={markAsRead}
                        />
                    ))}
                </div>
            )}

            {(hasNextPage || hasPreviousPage) && (
                <div className="flex items-center justify-center gap-4">
                    <Button
                        variant="outline"
                        disabled={!hasPreviousPage}
                        onClick={goToPreviousPage}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        disabled={!hasNextPage}
                        onClick={goToNextPage}
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Notifications;
