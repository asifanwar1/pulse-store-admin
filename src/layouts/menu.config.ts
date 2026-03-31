import { APP_ROUTES } from "@/routes/appRoutes";

export type SidebarContainerType = {
    label: string;
    inactiveIcon: string;
    activeIcon: string;
    path: Array<APP_ROUTES>;
};
export const menuItems: Array<SidebarContainerType> = [
    {
        label: "Dashboard",
        inactiveIcon: "",
        activeIcon: "",
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
