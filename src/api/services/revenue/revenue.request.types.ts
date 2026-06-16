export type TRevenueSortDirection = "ASC" | "DESC";

export type TPaymentMethod =
    | "CREDIT_CARD"
    | "DEBIT_CARD"
    | "PAYPAL"
    | "BANK_TRANSFER"
    | "CASH_ON_DELIVERY";

export type TShipmentStatus =
    | "PENDING"
    | "PROCESSING"
    | "IN_TRANSIT"
    | "DELIVERED"
    | "CANCELLED"
    | "RETURNED";

export type TGetRevenuesParams = {
    page?: number;
    limit?: number;
    column?: string;
    direction?: TRevenueSortDirection;
    search?: string;
    user_id?: number;
    order_id?: number;
    shipment_id?: number;
    payment_method?: TPaymentMethod;
    shipment_status?: TShipmentStatus;
    date_from?: string;
    date_to?: string;
};
