import { APP_ROUTES } from "@/routes/appRoutes";

import dashboardIconActive from "@/assets/icons/dashboard-icon.svg";
import dashboardIconInactive from "@/assets/icons/dashboard-icon-inactive.svg";
import customerIconActive from "@/assets/icons/customers-icon-active.svg";
import customerIconInactive from "@/assets/icons/customers-icon.svg";

import productIconActive from "@/assets/icons/product-icon-active.svg";
import productIconInactive from "@/assets/icons/product-icon.svg";

export type SidebarContainerType = {
    label: string;
    inactiveIcon: string;
    activeIcon: string;
    path: Array<APP_ROUTES>;
};
export const menuItems: Array<SidebarContainerType> = [
    {
        label: "Dashboard",
        inactiveIcon: dashboardIconInactive,
        activeIcon: dashboardIconActive,
        path: [APP_ROUTES.ROOT, APP_ROUTES.DASHBOARD],
    },
    {
        label: "Customer Management",
        inactiveIcon: customerIconInactive,
        activeIcon: customerIconActive,
        path: [APP_ROUTES.CUSTOMER_MANAGEMENT],
    },

    {
        label: "Product Management",
        inactiveIcon: productIconInactive,
        activeIcon: productIconActive,
        path: [APP_ROUTES.PRODUCT_MANAGEMENT],
    },
];
