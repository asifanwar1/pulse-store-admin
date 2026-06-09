export type TOrderSortDirection = "ASC" | "DESC";

export type TOrderStatus =
    | "PENDING"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED";

export type TPaymentMethod =
    | "CREDIT_CARD"
    | "DEBIT_CARD"
    | "PAYPAL"
    | "BANK_TRANSFER"
    | "CASH_ON_DELIVERY";

export type TGetOrdersParams = {
    page?: number;
    limit?: number;
    column?: string;
    direction?: TOrderSortDirection;
    search?: string;
    user_id?: number;
    status?: TOrderStatus;
};

export type TCreateOrderItemBody = {
    productName: string;
    sku: string;
    quantity: number;
    unitPrice: number;
};

export type TCreateOrderAddressBody = {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
};

export type TCreateOrderBody = {
    user_id: number;
    items: {
        product_id: number;
        quantity: number;
    }[];
    payment_method: string;
    notes: string;
};

export type TUpdateOrderStatusBody = {
    status: TOrderStatus;
};
