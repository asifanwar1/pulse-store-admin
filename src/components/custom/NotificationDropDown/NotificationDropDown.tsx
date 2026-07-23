import { Link } from "react-router-dom";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/routes/appRoutes";
import NotificationSkeleton from "./NotificationSkeleton";
import NotificationCard from "./NotificationCard";
import { Bell } from "lucide-react";
import { useNotificationDropdown } from "./NotificationContainer";

const MAX_UNREAD_COUNT: number = 99;

export const NotificationDropdown: React.FC = () => {
    const {
        notifications,
        isPending,
        unreadCount,
        open,
        handleOpenChange,
        handleClose,
        markAsRead,
        markAllAsRead,
        isMarkingAllAsRead,
    } = useNotificationDropdown();

    return (
        <DropdownMenu open={open} onOpenChange={handleOpenChange}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative flex items-center cursor-pointer w-14 h-14 !bg-pulse-cream-dark rounded-full focus-visible:ring-[0px] !ring=[0px] hover:bg-pulse-green/10"
                >
                    <Bell className="h-6 w-6 text-pulse-green" />
                    {unreadCount > 0 && (
                        <span className=" absolute top-2 right-3 inline-flex items-center justify-center text-white bg-[#B00020] font-semibold rounded-full min-w-[1.8em] min-h-[1.8em] text-[10px] p-[1px]">
                            {unreadCount > MAX_UNREAD_COUNT
                                ? `${MAX_UNREAD_COUNT}+`
                                : `${unreadCount}`}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[300px] md:w-[400px] p-0 rounded-2xl shadow-xl px-4 pb-4 bg-pulse-cream border-muted/30">
                <div className="flex items-center justify-between pt-4">
                    <DropdownMenuLabel className="font-semibold text-lg p-0">
                        Notifications
                    </DropdownMenuLabel>
                    {unreadCount > 0 && (
                        <button
                            type="button"
                            className="text-xs text-pulse-green hover:underline disabled:opacity-50"
                            disabled={isMarkingAllAsRead}
                            onClick={() => markAllAsRead()}
                        >
                            Mark all as read
                        </button>
                    )}
                </div>
                <div className="h-[300px] max-h-[300px] overflow-y-auto pb-2">
                    {isPending ? (
                        <NotificationSkeleton />
                    ) : notifications.length === 0 ? (
                        <div className="text-center text-gray-400 py-8">
                            No notifications
                        </div>
                    ) : (
                        notifications.map((notification) => (
                            <DropdownMenuItem
                                asChild
                                key={notification.id}
                                className="p-2 bg-transparent hover:bg-gray-50"
                            >
                                <NotificationCard
                                    notification={notification}
                                    onMarkAsRead={markAsRead}
                                    onClose={handleClose}
                                />
                            </DropdownMenuItem>
                        ))
                    )}
                </div>
                <div className="pt-2 text-center">
                    <Link
                        to={APP_ROUTES.NOTIFICATIONS}
                        onClick={handleClose}
                        className="text-sm text-pulse-green hover:underline"
                    >
                        View all
                    </Link>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default NotificationDropdown;
