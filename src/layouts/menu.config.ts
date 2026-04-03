import { type ReactNode } from "react";
import { APP_ROUTES } from "@/routes/appRoutes";
import { LayoutDashboard } from "lucide-react";

export type SidebarContainerType = {
    label: string;
    inactiveIcon: ReactNode;
    activeIcon: ReactNode;
    path: Array<APP_ROUTES>;
};
export const menuItems: Array<SidebarContainerType> = [
    {
        label: "Dashboard",
        inactiveIcon: <LayoutDashboard />,
        activeIcon: <LayoutDashboard />,
        path: [APP_ROUTES.ROOT, APP_ROUTES.DASHBOARD],
    },
    {
        label: "Customer Management",
        inactiveIcon: "",
        activeIcon: "",
        path: [APP_ROUTES.CUSTOMER_MANAGEMENT],
    },

    {
        label: "Product Management",
        inactiveIcon: "",
        activeIcon: "",
        path: [APP_ROUTES.DASHBOARD],
    },
];
