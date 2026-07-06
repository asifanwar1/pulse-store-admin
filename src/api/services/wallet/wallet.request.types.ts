export type TAttachPaymentMethodBody = {
    payment_method_id?: string | number | null;
    type?: string | null;
    token?: string | null;
    provider?: string | null;
    [key: string]: unknown;
};

export type TPayOrderRequest = {
    order_id: number;
    payment_method_id?: string | number | null;
    amount?: number | null;
    currency?: string | null;
    [key: string]: unknown;
};
