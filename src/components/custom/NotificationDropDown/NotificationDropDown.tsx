import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
// import Spinner from "@/components/custom/Spinner";
import { Button } from "@/components/ui/button";
// import { handleScroll } from "@/utils/handleScroll";
// import NotificationSkeleton from "./NotificationSkeleton";
import NotificationCard from "./NotificationSkeleton";
import { Bell } from "lucide-react";

// const NO_NOTIFICATION_COUNT: number = 0;
const MAX_UNREAD_COUNT: number = 99;

export const NotificationDropdown: React.FC = () => {
    // const {
    //     data: notifications,
    //     isPending: notificationIsPending,
    //     isFetchingNextPage: notificationIsFetchingNextPage,
    //     fetchNextPage: notificationFetchNextPage,
    //     hasNextPage: notificationHasNextPage,
    //     open,
    //     handleClose,
    //     handleOpenChange
    // } = useGetNotificationsListings({
    //     page: 1,
    //     limit: 10,
    //     enabled: true
    // });

    const unreadCount = 0;

    return (
        <>
            <DropdownMenu open={false} onOpenChange={() => {}}>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="relative flex items-center cursor-pointer w-14 h-14 bg-pulse-cream-dark rounded-full focus-visible:ring-[0px] !ring=[0px] hover:bg-pulse-green/10"
                    >
                        <Bell className="h-6 w-6 text-pulse-green" />
                        {Boolean(unreadCount > 0) && (
                            <span className=" absolute top-2 right-3 inline-flex items-center justify-center text-white bg-[#B00020] font-semibold rounded-full min-w-[1.8em] min-h-[1.8em] text-[10px] p-[1px]">
                                {unreadCount > MAX_UNREAD_COUNT
                                    ? `${MAX_UNREAD_COUNT}+`
                                    : `${unreadCount}`}
                            </span>
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[300px] md:w-[400px] p-0 rounded-2xl shadow-xl px-4 pb-4 bg-white border-muted/30">
                    <DropdownMenuLabel className="font-semibold text-lg pt-4">
                        Notifications
                    </DropdownMenuLabel>
                    <div
                        className="h-[300px] max-h-[300px] overflow-y-auto pb-2"
                        // onScroll={(e: any) =>
                        //     handleScroll(
                        //         e,
                        //         notifications,
                        //         notificationIsPending,
                        //         notificationHasNextPage,
                        //         notificationFetchNextPage
                        //     )
                        // }
                    >
                        {/* {notifications?.map((notification) => (
                            <DropdownMenuItem
                                asChild
                                key={notification.id}
                                className="p-2 bg-transparent hover:bg-gray-50"
                            >
                                <NotificationCard
                                    notification={notification}
                                    onClose={handleClose}
                                />
                            </DropdownMenuItem>
                        ))}
                        {notificationIsFetchingNextPage ? (
                            <div className="flex justify-center items-center py-4">
                                <Spinner />
                            </div>
                        ) : notificationIsPending ? (
                            <NotificationSkeleton />
                        ) : (
                            notifications?.length === NO_NOTIFICATION_COUNT && (
                                <div className="text-center text-gray-400 py-8">
                                    No notifications
                                </div>
                            )
                        )} */}
                        <DropdownMenuItem className="p-2 bg-transparent hover:bg-gray-50">
                            <NotificationCard />
                        </DropdownMenuItem>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default NotificationDropdown;
