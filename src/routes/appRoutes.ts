export enum APP_ROUTES {
    ROOT = "/",
    // auth
    LOGIN = "/login",
    FORGOT_PASSWORD = "/forgot-password",
    OTP_VERIFICATION = "/otp-verification/:token",
    RESET_PASSWORD = "/reset-password/:token",

    // public pages
    PRIVACY_POLICY = "/privacy-policy",
    DATA_DELETION = "/data-deletion",
    TERMS_AND_CONDITIONS = "/terms-and-conditions",

    // layout
    DASHBOARD = "/dashboard",

    ACCOUNT = "/account",
    ACCOUNT_PROFILE = "/account/profile",
    ACCOUNT_CHANGE_PASSWORD = "/account/change-password",

    //Chat Management
    CHATS = "/chats",

    CUSTOMER_MANAGEMENT = "/customers",
    CUSTOMER_MANAGEMENT_DETAILS = "/customers/:id",

    PRODUCTS = "/products",
    PRODUCTS_DETAILS = "/products/:id",

    ORDERS = "/orders",
    ORDERS_DETAILS = "/orders/:id",

    SHIPMENTS = "/shipments",
    SHIPMENTS_DETAILS = "/shipments/:id",
}
