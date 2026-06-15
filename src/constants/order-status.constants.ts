import { injectBaseConstantMethods } from "./base.constants";

export const OrderStatus = {
    PENDING: "PENDING",
    PROCESSING: "PROCESSING",
    SHIPPED: "SHIPPED",
    DELIVERED: "DELIVERED",
    CANCELLED: "CANCELLED",
};

const displayStatusTextKeys = {
    [OrderStatus.PENDING]: "Pending",
    [OrderStatus.PROCESSING]: "Processing",
    [OrderStatus.SHIPPED]: "Shipped",
    [OrderStatus.DELIVERED]: "Delivered",
    [OrderStatus.CANCELLED]: "Cancelled",
};

const statusLabelClasses = {
    [OrderStatus.PENDING]: "bg-status-pending-bg text-status-pending",
    [OrderStatus.PROCESSING]: "bg-status-processing-bg text-status-processing",
    [OrderStatus.SHIPPED]: "bg-status-shipped-bg text-status-shipped",
    [OrderStatus.DELIVERED]: "bg-status-delivered-bg text-status-delivered",
    [OrderStatus.CANCELLED]: "bg-status-cancelled-bg text-status-cancelled",
};

export const OrderStatusWithHelpers = injectBaseConstantMethods(
    OrderStatus,
    displayStatusTextKeys,
    statusLabelClasses,
);

export type OrderStatusType = (typeof OrderStatus)[keyof typeof OrderStatus];

export const ORDER_STATUS_OPTIONS = [
    { value: "PENDING", label: "Pending" },
    { value: "PROCESSING", label: "Processing" },
    { value: "SHIPPED", label: "Shipped" },
    { value: "DELIVERED", label: "Delivered" },
    { value: "CANCELLED", label: "Cancelled" },
];
