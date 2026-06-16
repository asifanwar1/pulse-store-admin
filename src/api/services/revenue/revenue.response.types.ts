export type TOrderCustomer = {
    id: number;
    name: string;
    email: string;
    phone: string;
};

export type TOrderStatus =
    | "PENDING"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED";

export type TPaymentMethodEnum =
    | "CARD"
    | "BANK_TRANSFER"
    | "CASH_ON_DELIVERY"
    | "PAYPAL";

export type TCompletedOrder = {
    id: number;
    user_id: number;
    status: TOrderStatus;
    payment_method: TPaymentMethodEnum | string;
    notes?: string;
    total_amount: string;
    totalOrderedItems: number;
    created_at: string;
    updated_at: string;
    customer: TOrderCustomer;
};

export type TOrderItemDetail = {
    id: number;
    product_id: number;
    product_name: string;
    product_sku: string;
    product_category: string;
    quantity: number;
    retail_price: string;
    cost_price: string;
    total_amount: string;
    profit: string;
};

export type TShipmentMethod =
    | "STANDARD"
    | "EXPRESS"
    | "OVERNIGHT"
    | "INTERNATIONAL";

export type TShipmentStatusEnum =
    | "PENDING"
    | "PROCESSING"
    | "IN_TRANSIT"
    | "DELIVERED"
    | "CANCELLED"
    | "RETURNED";

export type TShipmentDetail = {
    id: number;
    order_id: number;
    tracking_id: string;
    shipment_method: TShipmentMethod | string;
    courier: string;
    status: TShipmentStatusEnum | string;
    estimated_delivery_date: string;
    shipped_at: string;
    delivered_at?: string;
    notes?: string;
    created_at: string;
    updated_at: string;
};

export type TRevenueListItem = {
    id: number;
    order_id: number;
    revenue_amount: string;
    profit: string;
    completed_order: TCompletedOrder;
    order_items: TOrderItemDetail[];
    shipment_details: TShipmentDetail[];
};

export type TGetRevenuesListResponse = {
    data: TRevenueListItem[];
    count: number;
};

export type TRevenueAnalyticsMetric = {
    value: number;
    change_percentage: string;
};

export type TRevenuesAnalyticsResponse = {
    completedOrders: TRevenueAnalyticsMetric;
    totalRevenue: TRevenueAnalyticsMetric;
    totalProfit: TRevenueAnalyticsMetric;
};

export type TGetRevenuesAnalyticsResponse = TRevenuesAnalyticsResponse;
export type TGetRevenueResponse = TRevenueListItem;
export type TGetRevenuesResponse = TGetRevenuesListResponse;
