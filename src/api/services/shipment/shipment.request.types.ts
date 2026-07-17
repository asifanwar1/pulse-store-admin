import type { BaseQueryType } from "@/api/models";

export type TShipmentSortDirection = "ASC" | "DESC";

export type TShipmentStatus =
    | "PENDING"
    | "PROCESSING"
    | "SHIPPED"
    | "IN_TRANSIT"
    | "OUT_FOR_DELIVERY"
    | "DELIVERED"
    | "CANCELLED"
    | "RETURNED";

export type TShipmentCarrier = "fedex" | "ups" | "dhl" | "usps" | "blue_dart";

export type TGetShipmentsParams = BaseQueryType & {
    search?: string | null;
    status?: TShipmentStatus | null;
    order_id?: number | null;
};

export type TCreateShipmentBody = {
    order_id: number;
    tracking_id: string;
    shipment_method: string;
    courier: string;
    estimated_delivery_date: string;
    shipped_at?: string;
    delivered_at?: string;
    notes?: string;
    status?: string;
};

export type TUpdateShipmentBody = {
    customer_name?: string;
    customer_email?: string;
    carrier?: TShipmentCarrier | string;
    tracking_number?: string;
    weight?: number;
    origin_address?: {
        street?: string;
        city?: string;
        state?: string;
        zip?: string;
        country?: string;
    };
    destination_address?: {
        street?: string;
        city?: string;
        state?: string;
        zip?: string;
        country?: string;
    };
    notes?: string;
};

export type TUpdateShipmentStatusBody = {
    status: TShipmentStatus | string;
};

export type TAddShipmentTrackingBody = {
    description: string;
    location?: string;
    status?: TShipmentStatus | string;
};
