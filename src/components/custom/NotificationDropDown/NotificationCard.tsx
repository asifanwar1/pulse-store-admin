import React from "react";
import { useNavigate } from "react-router-dom";

import { cn, getParamsAttachedRoute } from "@/lib/utils";
import { APP_ROUTES } from "@/routes";
import { GetDayTimeDifference } from "@/utils/dateTimeUtil";
import { NotificationEntityType, NotificationStatus } from "@/constants/Notification";
import { useReadSingleNotification } from "./NotificationContainer";
import type { NotificationCardProps } from "./Notification.types";
import { PROJECT_TYPE } from "@/constants/Project";

const getProjectRoute = (projectType: string, projectId: number) => {
    if (projectType === PROJECT_TYPE.REIMAGINE || projectType === PROJECT_TYPE.POPULAR) {
        return getParamsAttachedRoute(APP_ROUTES.PROJECT_MANAGEMENT_DETAILS, {
            id: projectId
        });
    } else {
        return getParamsAttachedRoute(APP_ROUTES.RENOVATION_MANAGEMENT_DETAILS, {
            id: projectId
        });
    }
};

const NotificationCard: React.FC<NotificationCardProps> = React.memo(
    ({ notification, onClose }) => {
        const { readStatus, title } = notification;
        const navigate = useNavigate();
        const { mutate: markAsRead } = useReadSingleNotification();

        const onNotificationClick = (entityType: NotificationEntityType) => {
            if (readStatus === NotificationStatus.UNREAD) {
                markAsRead({
                    id: notification.id
                });
            }

            const projectType = notification?.data?.type as string;
            const projectId = notification?.data?.project_id;
            const installerId = notification?.data?.installerId;

            switch (entityType) {
                case NotificationEntityType.NewProject:
                    return navigate(getProjectRoute(projectType, projectId!));

                case NotificationEntityType.InstallationComplete:
                    return navigate(getProjectRoute(projectType, projectId!));
                case NotificationEntityType.ExperienceUpdated:
                    return navigate(
                        getParamsAttachedRoute(APP_ROUTES.INSTALLER_MANAGEMENT_DETAILS, {
                            id: installerId as number
                        })
                    );
                case NotificationEntityType.CertificationUpdated:
                    return navigate(
                        getParamsAttachedRoute(APP_ROUTES.INSTALLER_MANAGEMENT_DETAILS, {
                            id: installerId as number
                        })
                    );
                case NotificationEntityType.QuoteAccepted:
                    return navigate(
                        getParamsAttachedRoute(APP_ROUTES.QUOTE_MANAGEMENT_DETAILS, {
                            id: projectId!
                        })
                    );
                case NotificationEntityType.QuoteRejected:
                    return navigate(
                        getParamsAttachedRoute(APP_ROUTES.QUOTE_MANAGEMENT_DETAILS, {
                            id: projectId!
                        })
                    );
                default:
                    return null;
            }
        };

        const handleNotificationClick = (entityType: NotificationEntityType) => {
            onNotificationClick(entityType);
            if (onClose) onClose();
        };

        return (
            <div
                className={cn(
                    "flex items-start gap-3 rounded-xl px-4 py-3 mb-2 hover:bg-text-placeholder/10 transition-all cursor-pointer",
                    readStatus === NotificationStatus.UNREAD ? "bg-muted/12" : "bg-transparent"
                )}
                onClick={() =>
                    handleNotificationClick(notification?.type as NotificationEntityType)
                }
            >
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                        <span className="font-medium text-[14px]">{title || "-"}</span>
                        <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">
                            {GetDayTimeDifference(notification?.createdAt)}
                        </span>
                    </div>
                    <div className="text-[12px] text-gray-600 mt-0.5">
                        {notification?.body || "-"}
                    </div>
                </div>
            </div>
        );
    }
);

export default NotificationCard;
