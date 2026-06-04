import type { TOrderStatus, TPaymentMethod } from "./orders.request.types";

export type TOrderAddressResponse = {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
};

export type TOrderItemResponse = {
    id: string;
    productId?: string;
    productName: string;
    sku: string;
    category?: string;
    initials?: string;
    quantity: number;
    unitPrice: number;
    total: number;
};

export type TOrderResponse = {
    id: number | string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    paymentMethod: TPaymentMethod | string;
    status: TOrderStatus | string;
    items: TOrderItemResponse[];
    shippingAddress: TOrderAddressResponse;
    billingAddress?: TOrderAddressResponse;
    subtotal?: number;
    shippingCost?: number;
    tax?: number;
    discount?: number;
    total?: number;
    notes?: string;
    trackingNumber?: string;
    estimatedDelivery?: string;
    createdAt?: string;
    updatedAt?: string;
};

export type TGetOrdersResponse = {
    data: TOrderResponse[];
    count: number;
};

export type TOrderAnalyticsResponse = {
    totalOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
    ordersByStatus: {
        [key in TOrderStatus]?: number;
    };
    ordersByPaymentMethod: {
        [key in TPaymentMethod]?: number;
    };
    recentOrders: TOrderResponse[];
    topProducts?: Array<{
        productId: string;
        productName: string;
        totalSold: number;
        revenue: number;
    }>;
};

export type TCreateOrderResponse = TOrderResponse;

export type TGetOrderResponse = TOrderResponse;

export type TUpdateOrderStatusResponse = TOrderResponse;

export type TGetOrdersAnalyticsResponse = TOrderAnalyticsResponse;
