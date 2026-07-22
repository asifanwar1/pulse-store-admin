import React from "react";
import { useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";
import { getRouteWithId } from "@/utils/common.utils";
import { APP_ROUTES } from "@/routes/appRoutes";
import { GetDayTimeDifference } from "@/utils/dateTime.utils";
import { NotificationEntityType } from "@/constants/notification.constants";
import type { NotificationCardProps } from "./Notification.types";

const NotificationCard: React.FC<NotificationCardProps> = React.memo(
    ({ notification, onMarkAsRead, onClose }) => {
        const { id, is_read, title, body, entity_type, entity_id, created_at } =
            notification;
        const navigate = useNavigate();

        const handleClick = () => {
            if (!is_read) {
                onMarkAsRead?.(id);
            }

            switch (entity_type) {
                case NotificationEntityType.ORDER:
                    if (entity_id) {
                        navigate(
                            getRouteWithId({
                                route: APP_ROUTES.ORDERS_DETAILS,
                                id: entity_id,
                            }),
                        );
                    }
                    break;
                case NotificationEntityType.SUPPORT_TICKET:
                    navigate(APP_ROUTES.AI_AGENT_TICKETS);
                    break;
                default:
                    break;
            }

            onClose?.();
        };

        return (
            <div
                className={cn(
                    "flex items-start gap-3 rounded-xl px-4 py-3 mb-2 hover:bg-text-placeholder/10 transition-all cursor-pointer",
                    !is_read ? "bg-muted/12" : "bg-transparent",
                )}
                onClick={handleClick}
            >
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                        <span className="font-medium text-[14px]">
                            {title || "-"}
                        </span>
                        <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">
                            {GetDayTimeDifference(created_at)}
                        </span>
                    </div>
                    <div className="text-[12px] text-gray-600 mt-0.5">
                        {body || "-"}
                    </div>
                </div>
            </div>
        );
    },
);

export default NotificationCard;
