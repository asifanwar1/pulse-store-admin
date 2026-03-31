import { Link, useLocation } from "react-router-dom";

import { CustomButton } from "@/components/custom/CustomButton";
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
                "bg-white shadow-md p-4 flex justify-between items-center fixed top-0 z-30 transition-all duration-300",
                isMobile
                    ? "w-full left-0"
                    : state === "expanded"
                      ? "w-[calc(100%-16rem)] left-64"
                      : "w-[calc(100%-4rem)] left-16",
            )}
        >
            <div className="flex items-center">
                <SidebarTrigger className="mr-4" />
                <span className="text-lg font-semibold">
                    {currentRouteName}
                </span>
            </div>
            <div className="flex items-center gap-2">
                {children}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <CustomButton
                            type="button"
                            variant="profile"
                            aria-label="Open profile menu"
                        >
                            <img
                                src={user.image}
                                alt="Profile"
                                className="w-8 h-8 rounded-full object-cover"
                            />
                            <div className="flex flex-col items-start">
                                <span className="text-[15px] font-medium text-[#5B6B57]">
                                    {userData?.fullName}
                                </span>
                                <span className="text-xs text-[#9DA5B4]">
                                    "ADMIN"
                                </span>
                            </div>
                            <ChevronDown size={16} className="ml-1" />
                        </CustomButton>
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
