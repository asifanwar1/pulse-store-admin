import { injectBaseConstantMethods } from "./base.constants";

export const ShipmentStatus = {
    PENDING: "PENDING",
    PROCESSING: "PROCESSING",
    SHIPPED: "SHIPPED",
    IN_TRANSIT: "IN_TRANSIT",
    OUT_FOR_DELIVERY: "OUT_FOR_DELIVERY",
    DELIVERED: "DELIVERED",
    CANCELLED: "CANCELLED",
    RETURNED: "RETURNED",
};

export const SHIPMENT_STATUS_OPTIONS = [
    { value: "PENDING", label: "Pending" },
    { value: "PROCESSING", label: "Processing" },
    { value: "SHIPPED", label: "Shipped" },
    { value: "IN_TRANSIT", label: "In Transit" },
    { value: "OUT_FOR_DELIVERY", label: "Out For Delivery" },
    { value: "DELIVERED", label: "Delivered" },
    { value: "CANCELLED", label: "Cancelled" },
    { value: "RETURNED", label: "Returned" },
];

const shipmentStatusTextKeys = {
    [ShipmentStatus.PENDING]: "Pending",
    [ShipmentStatus.PROCESSING]: "Processing",
    [ShipmentStatus.SHIPPED]: "Shipped",
    [ShipmentStatus.IN_TRANSIT]: "In Transit",
    [ShipmentStatus.OUT_FOR_DELIVERY]: "Out For Delivery",
    [ShipmentStatus.DELIVERED]: "Delivered",
    [ShipmentStatus.CANCELLED]: "Cancelled",
    [ShipmentStatus.RETURNED]: "Returned",
};

const shipmentLabelClasses = {
    [ShipmentStatus.PENDING]: "bg-yellow-100 text-yellow-800",
    [ShipmentStatus.PROCESSING]: "bg-yellow-100 text-yellow-800",
    [ShipmentStatus.SHIPPED]: "bg-green-100 text-green-800",
    [ShipmentStatus.IN_TRANSIT]: "bg-yellow-100 text-yellow-800",
    [ShipmentStatus.OUT_FOR_DELIVERY]: "bg-green-100 text-green-800",
    [ShipmentStatus.DELIVERED]: "bg-green-100 text-green-800",
    [ShipmentStatus.CANCELLED]: "bg-red-100 text-red-800",
    [ShipmentStatus.RETURNED]: "bg-red-100 text-red-800",
};

export const ShipmentStatusWithHelpers = injectBaseConstantMethods(
    ShipmentStatus,
    shipmentStatusTextKeys,
    shipmentLabelClasses,
);

export type ShipmentStatusType =
    (typeof ShipmentStatus)[keyof typeof ShipmentStatus];
