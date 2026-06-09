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
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
] as const;

export const COUNTRY_OPTIONS = [
    { value: "United States", label: "United States" },
    { value: "United Kingdom", label: "United Kingdom" },
    { value: "Canada", label: "Canada" },
    { value: "Australia", label: "Australia" },
    { value: "Germany", label: "Germany" },
    { value: "France", label: "France" },
    { value: "Japan", label: "Japan" },
    { value: "India", label: "India" },
    { value: "Brazil", label: "Brazil" },
    { value: "Mexico", label: "Mexico" },
] as const;
