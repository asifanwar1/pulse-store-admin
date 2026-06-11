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

export type TShipmentResponse = {
    id: number;
    order_id: number;
    customer_name: string;
    customer_email: string;
    carrier: TShipmentCarrier | string;
    tracking_number: string;
    status: TShipmentStatus | string;
    weight: number;
    origin_address: TShipmentAddressResponse;
    destination_address: TShipmentAddressResponse;
    notes?: string;
    created_at: string;
    updated_at: string;
};

export type TShipmentListResponse = {
    data: TShipmentResponse[];
    count: number;
};

export type TGetShipmentsResponse = TShipmentListResponse;
export type TCreateShipmentResponse = TShipmentResponse;
export type TGetShipmentResponse = TShipmentResponse;
export type TUpdateShipmentResponse = TShipmentResponse;
export type TUpdateShipmentStatusResponse = TShipmentResponse;
