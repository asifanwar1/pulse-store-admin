import { APP_ROUTES } from "@/routes/appRoutes";

export const defaultRouteNames: Record<string, string> = {
    // Root and Dashboard
    [APP_ROUTES.ROOT]: "Dashboard",
    [APP_ROUTES.DASHBOARD]: "Dashboard",

    // Customer Management
    [APP_ROUTES.CUSTOMER_MANAGEMENT]: "Customer Management",
    [APP_ROUTES.CUSTOMER_MANAGEMENT_DETAILS]: "Customer Management",

    // Account Management
    [APP_ROUTES.ACCOUNT]: "Account",
    [APP_ROUTES.ACCOUNT_PROFILE]: "Profile",
    [APP_ROUTES.ACCOUNT_CHANGE_PASSWORD]: "Change Password",

    // Authentication Routes
    [APP_ROUTES.LOGIN]: "Login",
    [APP_ROUTES.FORGOT_PASSWORD]: "Forgot Password",
    [APP_ROUTES.OTP_VERIFICATION]: "OTP Verification",
    [APP_ROUTES.RESET_PASSWORD]: "Reset Password",

    // Chat Management
    [APP_ROUTES.CHATS]: "Chat",
};
