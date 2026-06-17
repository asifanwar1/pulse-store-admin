import { APP_ROUTES } from "@/routes/appRoutes";
import {
    LayoutDashboardIcon,
    Store,
    User,
    Van,
    Container,
    type LucideIcon,
    Tag,
    CircleDollarSign,
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
        path: [APP_ROUTES.CUSTOMERS],
    },
    {
        label: "Product Management",
        inactiveIcon: Store,
        activeIcon: Store,
        path: [APP_ROUTES.PRODUCTS],
    },
    {
        label: "Categories Management",
        inactiveIcon: Tag,
        activeIcon: Tag,
        path: [APP_ROUTES.CATEGORIES],
    },
    {
        label: "Order Management",
        inactiveIcon: Container,
        activeIcon: Container,
        path: [APP_ROUTES.ORDERS],
    },
    {
        label: "Shipment Management",
        inactiveIcon: Van,
        activeIcon: Van,
        path: [APP_ROUTES.SHIPMENTS],
    },
    {
        label: "Revenue Management",
        inactiveIcon: CircleDollarSign,
        activeIcon: CircleDollarSign,
        path: [APP_ROUTES.REVENUE],
    },
];
