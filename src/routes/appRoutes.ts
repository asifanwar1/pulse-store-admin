export enum APP_ROUTES {
    ROOT = "/",
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

    CHATS = "/chats",

    CUSTOMERS = "/customers",
    CUSTOMERS_DETAILS = "/customers/:id",

    PRODUCTS = "/products",
    PRODUCTS_DETAILS = "/products/:id",
    PRODUCTS_ADD = "/products/add",
    PRODUCTS_UPDATE = "/products/update/:id",

    ORDERS = "/orders",
    ORDERS_DETAILS = "/orders/:id",
    ORDERS_CREATE = "/orders/create",
    ORDERS_UPDATE = "/orders/update/:id",

    SHIPMENTS = "/shipments",
    SHIPMENTS_DETAILS = "/shipments/:id",
    SHIPMENTS_CREATE = "/shipments/create/order/:id",
    SHIPMENTS_UPDATE = "/shipments/update/:id",

    CATEGORIES = "/categories",

    OFFERS = "/offers",
    OFFERS_ADD = "/offers/add",
    OFFERS_UPDATE = "/offers/update/:id",

    REVENUE = "/revenue",
    REVENUE_DETAILS = "/revenue/:id",

    REVIEWS = "/reviews",

    BANNERS = "/banners",
    BANNERS_ADD = "/banners/add",
    BANNERS_UPDATE = "/banners/update/:id",

    AI_AGENTS = "/ai-agents",
    AI_AGENT_TICKETS = "/ai-support/tickets",

    NOTIFICATIONS = "/notifications",
}
