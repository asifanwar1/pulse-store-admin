import { APP_ROUTES } from "@/routes/appRoutes";

export const defaultRouteNames: Record<string, string> = {
    // Root and Dashboard
    [APP_ROUTES.ROOT]: "Dashboard",
    [APP_ROUTES.DASHBOARD]: "Dashboard",

    // Customer Management
    [APP_ROUTES.CUSTOMERS]: "Customer Management",
    [APP_ROUTES.CUSTOMERS_DETAILS]: "Customer Details",

    // Account Management
    [APP_ROUTES.ACCOUNT]: "Account",
    [APP_ROUTES.ACCOUNT_PROFILE]: "Profile",
    [APP_ROUTES.ACCOUNT_CHANGE_PASSWORD]: "Change Password",

    // Authentication Routes
    [APP_ROUTES.LOGIN]: "Login",
    [APP_ROUTES.FORGOT_PASSWORD]: "Forgot Password",
    [APP_ROUTES.OTP_VERIFICATION]: "OTP Verification",
    [APP_ROUTES.RESET_PASSWORD]: "Reset Password",

    // Product Management
    [APP_ROUTES.PRODUCTS]: "Product Management",
    [APP_ROUTES.PRODUCTS_DETAILS]: "Product Details",
    [APP_ROUTES.PRODUCTS_ADD]: "Add New Product",
    [APP_ROUTES.PRODUCTS_UPDATE]: "Update Product",

    // Offers Management
    [APP_ROUTES.OFFERS]: "Offers Management",
    [APP_ROUTES.OFFERS_ADD]: "Add New Offer",
    [APP_ROUTES.OFFERS_UPDATE]: "Update Offer",

    // Order Management
    [APP_ROUTES.ORDERS]: "Order Management",
    [APP_ROUTES.ORDERS_DETAILS]: "Order Details",
    [APP_ROUTES.ORDERS_CREATE]: "Create Order",
    [APP_ROUTES.ORDERS_UPDATE]: "Update Order",

    // Reviews Management
    [APP_ROUTES.REVIEWS]: "Reviews Management",

    // Chat Management
    [APP_ROUTES.CHATS]: "AI Chat Assistant",

    // AI Agents
    [APP_ROUTES.AI_AGENTS]: "AI Agents",
    [APP_ROUTES.AI_AGENT_TICKETS]: "Support Tickets",

    // Notifications Management
    [APP_ROUTES.NOTIFICATIONS]: "Notifications",

    // Settings
    [APP_ROUTES.SETTINGS]: "Settings",
};
