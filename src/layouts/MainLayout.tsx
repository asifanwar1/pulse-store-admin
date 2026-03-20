import React, { Suspense, useCallback, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { useStore } from "@/store";
import { APP_ROUTES } from "@/routes";

import { cn } from "@/lib/utils";

import Topbar from "./Topbar";
import SidebarContainer from "./SidebarContainer";

import ConfirmationModal from "@/components/shared/Modals/ConfirmationModal";
import { Image } from "@/components/ui/Image";
import Loading from "@/components/ui/Loading";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";

import commentIcon from "@/assets/icons/comment-icon.svg";
import profilePlaceholderImage from "@/assets/images/profile-gray-image.png";
import logoutIcon from "@/assets/icons/logout-black-icon.svg";
import { CustomButton } from "@/components/shared/CustomButton";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import NotificationDropdown from "@/components/shared/NotificationDropDown";
import {
    useLogout,
    useGetMe,
} from "@/pages/Authentication/Authentication.Container";
import { useGetNotificationsUnreadCount } from "@/components/shared/NotificationDropDown/NotificationContainer";

const MainLayoutWrapper: React.FC = () => {
    const { state, isMobile } = useSidebar();
    const isAuthenticated = useStore((state) => state.isAuthenticated);
    const navigate = useNavigate();
    const [showLogout, setShowLogout] = useState<boolean>(false);
    const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
    const { mutateAsync: logout } = useLogout();
    const clearAuth = useStore((state) => state.clearAuth);
    const userData = useStore((state) => state.user);
    useGetNotificationsUnreadCount();
    useGetMe();
    const handleLogout = useCallback(async (): Promise<void> => {
        setIsLoggingOut(true);
        try {
            await logout();
            clearAuth();
            navigate(APP_ROUTES.LOGIN, { replace: true });
        } finally {
            setIsLoggingOut(false);
            setShowLogout(false);
        }
    }, [logout, clearAuth, navigate]);
    const onLogoutClick = () => setShowLogout((prev) => !prev);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate(APP_ROUTES.LOGIN);
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
        return null;
    }
    return (
        <>
            <div className="relative flex h-screen w-full overflow-hidden overflow-x-hidden">
                <SidebarContainer onLogoutClick={onLogoutClick} />
                <Topbar
                    user={{
                        image:
                            userData?.profilePicture?.path ||
                            profilePlaceholderImage,
                    }}
                    profileMenuItems={
                        <>
                            <DropdownMenuItem
                                asChild
                                className="hover:!bg-muted/50 cursor-pointer w-full h-[40px] text-app-branding"
                            >
                                <Link to={APP_ROUTES.ACCOUNT}>My Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                asChild
                                className="hover:!bg-muted/50 cursor-pointer w-full h-[40px] text-app-branding"
                            >
                                <button
                                    type="button"
                                    onClick={onLogoutClick}
                                    className="text-left bg-transparent "
                                >
                                    Logout
                                </button>
                            </DropdownMenuItem>
                        </>
                    }
                >
                    <CustomButton
                        variant="ghost"
                        type="button"
                        className="relative flex items-center cursor-pointer w-14 h-14 bg-muted/12 rounded-full focus-visible:ring-[0px] !ring=[0px] hover:bg-muted/30"
                    >
                        <img
                            src={commentIcon}
                            alt="Comments"
                            className="h-6 w-6"
                            onClick={() => navigate(APP_ROUTES.CUSTOMER_CHATS)}
                        />
                    </CustomButton>
                    <NotificationDropdown />
                </Topbar>
                <main
                    className={cn(
                        "relative transition-all duration-300 overflow-y-auto box-border overflow-x-hidden mt-[88px] min-h-[calc(100vh-88px)] bg-app-gray",
                        isMobile
                            ? "ml-0 w-full"
                            : state === "expanded"
                              ? "ml-[0px] w-[calc(100vw-260px)]"
                              : "ml-2 w-[calc(100%-4rem)]",
                    )}
                >
                    <Suspense fallback={<Loading />}>
                        <div className="relative p-4 overflow-x-hidden">
                            <Outlet />
                        </div>
                    </Suspense>
                </main>
                {showLogout && (
                    <ConfirmationModal
                        open={showLogout}
                        icon={<Image src={logoutIcon} alt="Logout" />}
                        title="Logout"
                        description="Are you sure you want to logout?"
                        confirmText="Logout"
                        cancelText="Cancel"
                        onSuccess={handleLogout}
                        onClose={() => setShowLogout(false)}
                        isLoading={isLoggingOut}
                    />
                )}
            </div>
        </>
    );
};

const MainLayout: React.FC = () => {
    return (
        <SidebarProvider>
            <MainLayoutWrapper />
        </SidebarProvider>
    );
};

export default MainLayout;
