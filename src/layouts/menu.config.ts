import { APP_ROUTES } from "@/routes/appRoutes";

import dashboardIconActive from "@/assets/icons/dashboard-icon.svg";
import dashboardIconInactive from "@/assets/icons/dashboard-icon-inactive.svg";
import customerIconActive from "@/assets/icons/customers-icon-active.svg";
import customerIconInactive from "@/assets/icons/customers-icon.svg";
import installerIconActive from "@/assets/icons/installer-manage-icon-active.svg";
import installerIconInactive from "@/assets/icons/installer-manage-icon.svg";
import projectIconActive from "@/assets/icons/projects-icon-active.svg";
import projectIconInactive from "@/assets/icons/projects-icon.svg";
import renovationIconActive from "@/assets/icons/renovation-icon-active.svg";
import renovationIconInactive from "@/assets/icons/renovation-icon.svg";
import quoteIconActive from "@/assets/icons/quote-icon-active.svg";
import quoteIconInactive from "@/assets/icons/quote-icon.svg";
import productIconActive from "@/assets/icons/product-icon-active.svg";
import productIconInactive from "@/assets/icons/product-icon.svg";
import presetIconActive from "@/assets/icons/preset-icon-active.svg";
import presetIconInactive from "@/assets/icons/preset-icon.svg";
import dealsIconActive from "@/assets/icons/deal-icon-active.svg";
import dealsIconInactive from "@/assets/icons/deal-icon.svg";
import portfolioIconActive from "@/assets/icons/portfolio-icon-active.svg";
import portfolioIconInactive from "@/assets/icons/portfolio-icon.svg";
import reviewsIconActive from "@/assets/icons/review-icon-active.svg";
import reviewsIconInactive from "@/assets/icons/review-icon.svg";

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
