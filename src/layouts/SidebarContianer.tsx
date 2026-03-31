import { Link, useLocation } from "react-router-dom";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

import type { APP_ROUTES } from "@/routes/appRoutes";

import { Image } from "@/components/custom/Image";
import { LogOut } from "lucide-react";
import sidebarHeaderImage from "@/assets/images/pulse-store-black.png";
import mobileSidebarHeaderImage from "@/assets/images/pulse-store-black.png";
import { menuItems, type SidebarContainerType } from "./menu.config";
import "./style.css";

type SidebarContainerProps = {
    onLogoutClick?: () => void;
};

const FIRST_ROUTE_INDEX = 0;

const SidebarContainer: React.FC<SidebarContainerProps> = (props) => {
    const { onLogoutClick = () => {} } = props;
    const location = useLocation();

    const isRouteActive = (
        menuPaths: Array<APP_ROUTES>,
        currentPath: string,
    ): boolean => {
        return menuPaths.some((menuPath) => {
            if (menuPath === "/") {
                return currentPath === "/";
            }
            return currentPath.startsWith(menuPath);
        });
    };

    return (
        <Sidebar
            className="bg-app-branding h-screen fixed top-0 left-0 w-64 z-40 group-data-[collapsible=icon]:w-16 md:block"
            collapsible="icon"
        >
            <SidebarHeader>
                <div className="p-2 flex justify-center items-center group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:mb-2 group-data-[collapsible=icon]:mt-2 group-data-[collapsible=icon]:p-0 mb-4">
                    <Image
                        src={sidebarHeaderImage}
                        alt="Logo"
                        className="h-14 w-auto group-data-[collapsible=icon]:hidden"
                    />
                    <Image
                        src={mobileSidebarHeaderImage}
                        alt="Logo"
                        className="hidden group-data-[collapsible=icon]:block h-8 w-8"
                    />
                </div>
            </SidebarHeader>
            <SidebarContent className="flex-1 overflow-y-auto min-h-0">
                <SidebarMenu>
                    {" "}
                    {menuItems.map((item: SidebarContainerType) => {
                        const isActive = isRouteActive(
                            item.path,
                            location.pathname,
                        );
                        return (
                            <SidebarMenuItem
                                key={item.label}
                                className="ml-5 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:m-1"
                            >
                                <SidebarMenuButton
                                    asChild
                                    tooltip={item.label}
                                    isActive={isActive}
                                    className={cn(
                                        "flex items-center text-white text-sm gap-4 w-full group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:rounded group-data-[collapsible=icon]:p-3",
                                        isActive &&
                                            "bg-link-active/40 rounded-l-md rounded-r-none",
                                    )}
                                >
                                    <Link
                                        to={item.path[FIRST_ROUTE_INDEX]}
                                        className="d-flex items-center gap-4 py-6"
                                    >
                                        <Image
                                            src={
                                                isActive
                                                    ? item.activeIcon
                                                    : item.inactiveIcon
                                            }
                                            alt={item.label}
                                            className="group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:w-5 group-data-[collapsible=icon]:h-5 h-6 w-6"
                                        />
                                        <span className="group-data-[collapsible=icon]:hidden">
                                            {item.label}
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="mt-auto h-5 relative group-data-[collapsible=icon]:hidden" />
            <SidebarMenuButton
                className="flex ml-5 group-data-[collapsible=icon]:ml-4 mb-2 items-center h-10 text-white text-sm gap-4 w-59 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:rounded group-data-[collapsible=icon]:p-3 cursor-pointer "
                onClick={onLogoutClick}
            >
                <LogOut
                    size={18}
                    className="group-data-[collapsible=icon]:mx-auto"
                />
                <span className="group-data-[collapsible=icon]:hidden">
                    Logout
                </span>
            </SidebarMenuButton>
            <div className="p-0 absolute bottom-0 left-0 right-0"></div>
        </Sidebar>
    );
};

export default SidebarContainer;
