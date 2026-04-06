import { Link, useLocation } from "react-router-dom";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { getRouteDisplayName } from "@/utils/breadcrumbUtils";
import { defaultRouteNames } from "@/constants/page-title.constants";

import { useStore } from "@/store";
import { ChevronDown } from "lucide-react";
import { Avatar } from "@/components/custom/Avatar";

interface ITopbarProps {
    user: {
        image: string;
    };
    routeNames?: Record<string, string>;
    children?: React.ReactNode;
    profileMenuItems?: React.ReactNode;
}

const Topbar: React.FC<ITopbarProps> = ({
    user,
    routeNames = defaultRouteNames,
    children,
    profileMenuItems,
}) => {
    const location = useLocation();
    const { state, isMobile } = useSidebar();
    const currentRouteName = getRouteDisplayName(location.pathname, routeNames);
    const userData = useStore((state) => state.user);
    return (
        <div
            className={cn(
                "bg-pulse-cream shadow-sm p-4 flex justify-between items-center fixed top-0 z-30 transition-all duration-300",
                isMobile
                    ? "w-full left-0"
                    : state === "expanded"
                      ? "w-[calc(100%-16rem)] left-64"
                      : "w-[calc(100%-4rem)] left-16",
            )}
        >
            <div className="flex items-center">
                <SidebarTrigger className="mr-4 text-pulse-green" />
                <span className="text-lg font-semibold text-pulse-green">
                    {currentRouteName}
                </span>
            </div>
            <div className="flex items-center gap-2">
                {children}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex items-center justify-center gap-4 cursor-pointer">
                            <Avatar
                                src={user.image}
                                alt={userData?.fullName || "Admin"}
                                className="w-14 h-14 "
                                fallBackClassName="bg-pulse-cream-dark text-pulse-green hover:bg-pulse-green/10 z-10"
                            />
                            <ChevronDown
                                size={16}
                                className="ml-1 text-pulse-green"
                            />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        className="bg-white border-muted "
                    >
                        {profileMenuItems ? (
                            profileMenuItems
                        ) : (
                            <DropdownMenuItem asChild>
                                <Link to="/profile">My Profile</Link>
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default Topbar;
