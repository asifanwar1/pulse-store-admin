export type TWalletConfigResponse = {
    publishable_key?: string | null;
    currency?: string | null;
    country?: string | null;
    [key: string]: unknown;
};

export type TSetupIntentResponse = {
    id?: string | null;
    client_secret?: string | null;
    payment_intent_id?: string | null;
    [key: string]: unknown;
};

export type TWalletPaymentMethodResponse = {
    id?: number | string | null;
    brand?: string | null;
    last4?: string | null;
    is_default?: boolean | null;
    [key: string]: unknown;
};

export type TWalletPaymentMethodListResponse = {
    data: TWalletPaymentMethodResponse[];
    count?: number;
    [key: string]: unknown;
};

export type TPayOrderResponse = {
    success?: boolean;
    message?: string | null;
    order_id?: number | string | null;
    [key: string]: unknown;
};

export type TDeletePaymentMethodResponse = {
    data: boolean;
};
