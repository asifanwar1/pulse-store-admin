import type {
    TShipmentCarrier,
    TShipmentStatus,
} from "./shipment.request.types";

export type TShipmentAddressResponse = {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
};

export type TShipmentItemResponse = {
    id: string;
    product_name: string;
    sku: string;
    quantity: number;
    weight: number;
};

export type TShipmentTrackingEvent = {
    id: number;
    status: TShipmentStatus | string | null;
    description: string | null;
    location: string | null;
    created_at: string;
};

export type TShipmentResponse = {
    id: number;
    order_id: number;
    customer_name: string;
    customer_email: string;
    courier: TShipmentCarrier | string;
    tracking_id: string;
    status: TShipmentStatus | string;
    weight: number;
    shipment_address: TShipmentAddressResponse;
    notes?: string;
    created_at: string;
    updated_at: string;
    estimated_delivery_date: string;
    shipped_at: string;
    customer: {
        name: string;
        email: string;
        phone: string;
    };
    order: {
        total_amount: string;
        id: number;
        user_id: number;
        status: string;
    };
    ordered_items: Array<{
        id: number;
        product_id: number;
        product_name: string;
        product_sku: string;
        product_category: string;
        quantity: number;
        unit_price: string;
        total_amount: string;
    }>;
    tracking?: TShipmentTrackingEvent[];
};

export type TShipmentListResponse = {
    data: TShipmentResponse[];
    count: number;
};

export type TShipmentAnalyticsMetric = {
    value: number;
    change_percentage: string;
};

export type TShipmentAnalyticsResponse = {
    totalShipments: TShipmentAnalyticsMetric;
    inTransit: TShipmentAnalyticsMetric;
    delivered: TShipmentAnalyticsMetric;
    failed: TShipmentAnalyticsMetric;
};

export type TGetShipmentsAnalyticsResponse = TShipmentAnalyticsResponse;
export type TGetShipmentsResponse = TShipmentListResponse;
export type TCreateShipmentResponse = TShipmentResponse;
export type TGetShipmentResponse = TShipmentResponse;
export type TUpdateShipmentResponse = TShipmentResponse;
export type TUpdateShipmentStatusResponse = TShipmentResponse;
export type TAddShipmentTrackingResponse = TShipmentResponse;

export type TShipmentTrackingByNumberResponse = {
    tracking_id: string;
    status: TShipmentStatus | string;
    courier: string;
    shipment_method: string;
    estimated_delivery_date: string | null;
    shipped_at: string | null;
    delivered_at: string | null;
    tracking: TShipmentTrackingEvent[];
};
