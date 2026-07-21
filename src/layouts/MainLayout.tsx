import React, { Suspense, useCallback, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { useStore } from "@/store";
import { APP_ROUTES } from "@/routes/appRoutes";

import { cn } from "@/lib/utils";

import Topbar from "./Topbar";
import SidebarContainer from "./SidebarContianer";

import ConfirmationModal from "@/components/custom/Modals/ConfirmationModal";
import Loading from "@/components/custom/Loading";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";

import { LogOut, Bell, BotMessageSquare } from "lucide-react";
import CustomButton from "@/components/custom/CustomButton/CustomButton";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
// import NotificationDropdown from "@/components/custom/NotificationDropDown";
import { useLogout, useGetMe } from "@/hooks/api/auth.queries";

const MainLayoutWrapper: React.FC = () => {
    const { state, isMobile } = useSidebar();
    const isAuthenticated = useStore((state) => state.isAuthenticated);
    const navigate = useNavigate();
    const [showLogout, setShowLogout] = useState<boolean>(false);
    const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
    const { mutateAsync: logout } = useLogout();
    const clearAuth = useStore((state) => state.clearAuth);
    const userData = useStore((state) => state.user);
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
    }, [clearAuth, navigate]);
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
                        image: userData?.profilePicture?.path || "",
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
                        className="relative flex items-center cursor-pointer w-14 h-14 bg-pulse-cream-dark rounded-full focus-visible:ring-[0px] !ring=[0px] hover:bg-pulse-green/10"
                        onClick={() => navigate(APP_ROUTES.CHATS)}
                    >
                        <BotMessageSquare className="text-pulse-green !w-[20px] !h-[20px]" />
                    </CustomButton>
                    <CustomButton
                        variant="ghost"
                        type="button"
                        className="relative flex items-center cursor-pointer w-14 h-14 bg-pulse-cream-dark rounded-full focus-visible:ring-[0px] !ring=[0px] hover:bg-pulse-green/10"
                        onClick={() => navigate(APP_ROUTES.NOTIFICATIONS)}
                    >
                        <Bell className="text-pulse-green !w-[20px] !h-[20px]" />
                    </CustomButton>
                    {/* <NotificationDropdown /> */}
                </Topbar>
                <main
                    className={cn(
                        "relative transition-all duration-300 overflow-y-auto box-border overflow-x-hidden mt-[88px] min-h-[calc(100vh-88px)] bg-pulse-cream/50",
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
                        icon={<LogOut size={18} />}
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
