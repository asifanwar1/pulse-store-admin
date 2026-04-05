import { APP_ROUTES } from "@/routes/appRoutes";
import {
    LayoutDashboardIcon,
    Store,
    User,
    type LucideIcon,
} from "lucide-react";

export type SidebarContainerType = {
    label: string;
    inactiveIcon: LucideIcon;
    activeIcon: LucideIcon;
    path: Array<APP_ROUTES>;
};
export const menuItems: Array<SidebarContainerType> = [
    {
        label: "Dashboard",
        inactiveIcon: LayoutDashboardIcon,
        activeIcon: LayoutDashboardIcon,
        path: [APP_ROUTES.ROOT, APP_ROUTES.DASHBOARD],
    },
    {
        label: "Customer Management",
        inactiveIcon: User,
        activeIcon: User,
        path: [APP_ROUTES.CUSTOMER_MANAGEMENT],
    },
    {
        label: "Product Management",
        inactiveIcon: Store,
        activeIcon: Store,
        path: [APP_ROUTES.PRODUCTS],
    },
    {
        label: "Product Management",
        inactiveIcon: Store,
        activeIcon: Store,
        path: [APP_ROUTES.PRODUCTS],
    },
];
