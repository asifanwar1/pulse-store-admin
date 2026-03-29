import { APP_ROUTES } from "@/routes/appRoutes";

export const defaultRouteNames: Record<string, string> = {
    // Root and Dashboard
    [APP_ROUTES.ROOT]: "Dashboard",
    [APP_ROUTES.DASHBOARD]: "Dashboard",

    // Customer Management
    [APP_ROUTES.CUSTOMER_MANAGEMENT]: "Customer Management",
    [APP_ROUTES.CUSTOMER_MANAGEMENT_DETAILS]: "Customer Management",

    // Installer Management
    [APP_ROUTES.INSTALLER_MANAGEMENT]: "Installer Management",
    [APP_ROUTES.INSTALLER_MANAGEMENT_DETAILS]: "Installer Management",

    // Preset Management
    [APP_ROUTES.PRESET_MANAGEMENT]: "Preset Management",
    [APP_ROUTES.ADD_PRESET]: "Preset Management",
    [APP_ROUTES.EDIT_PRESET]: "Preset Management",
    [APP_ROUTES.PRESET_DETAILS]: "Preset Management",

    // Portfolio Management
    [APP_ROUTES.PORTFOLIO_MANAGEMENT]: "Portfolio Management",
    [APP_ROUTES.ADD_PORTFOLIO]: "Portfolio Management",
    [APP_ROUTES.EDIT_PORTFOLIO]: "Portfolio Management",
    [APP_ROUTES.PORTFOLIO_DETAILS]: "Portfolio Management",

    // Reviews Management
    [APP_ROUTES.REVIEWS_MANAGEMENT]: "Reviews Management",
    [APP_ROUTES.REVIEW_MANAGEMENT]: "Review Management",

    // Account Management
    [APP_ROUTES.ACCOUNT]: "Account",
    [APP_ROUTES.ACCOUNT_PROFILE]: "Profile",
    [APP_ROUTES.ACCOUNT_CHANGE_PASSWORD]: "Change Password",

    // Quote Management
    [APP_ROUTES.QUOTE_MANAGEMENT]: "Quote Management",
    [APP_ROUTES.QUOTE_MANAGEMENT_DETAILS]: "Quote Management",

    // Deals Management
    [APP_ROUTES.DEALS_MANAGEMENT]: "Deals Management",
    [APP_ROUTES.DEALS_MANAGEMENT_DETAILS]: "Deals Management",
    [APP_ROUTES.DEALS_MANAGEMENT_EDIT]: "Deals Management",
    [APP_ROUTES.DEALS_MANAGEMENT_ADD]: "Deals Management",

    // Renovation Management
    [APP_ROUTES.RENOVATION_MANAGEMENT]: "Renovation Management",
    [APP_ROUTES.RENOVATION_MANAGEMENT_DETAILS]: "Renovation Management",

    // Authentication Routes
    [APP_ROUTES.LOGIN]: "Login",
    [APP_ROUTES.FORGOT_PASSWORD]: "Forgot Password",
    [APP_ROUTES.OTP_VERIFICATION]: "OTP Verification",
    [APP_ROUTES.RESET_PASSWORD]: "Reset Password",

    // Chat Management
    [APP_ROUTES.CHATS]: "Chat",
};
