import { injectBaseConstantMethods } from "./base.constants";

export const PaymentMethod = {
    CARD: "CARD",
    COD: "COD",
    BANK_TRANSFER: "BANK_TRANSFER",
};

const displayStatusTextKeys = {
    [PaymentMethod.CARD]: "Credit / Debit Card",
    [PaymentMethod.COD]: "Cash on Delivery",
    [PaymentMethod.BANK_TRANSFER]: "Bank Transfer",
};

const statusLabelClasses = {
    [PaymentMethod.CARD]: "bg-status-shipped-bg text-status-shipped",
    [PaymentMethod.COD]: "bg-status-shipped-bg text-status-shipped",
    [PaymentMethod.BANK_TRANSFER]: "bg-status-shipped-bg text-status-shipped",
};

export const PaymentMethodsWithHelpers = injectBaseConstantMethods(
    PaymentMethod,
    displayStatusTextKeys,
    statusLabelClasses,
);

export const PAYMENT_METHOD_OPTIONS = [
    { value: "CARD", label: "Credit / Debit Card", disabled: true },
    { value: "COD", label: "Cash on Delivery" },
    { value: "BANK_TRANSFER", label: "Bank Transfer" },
] as const;

export type PaymentMethodsType =
    (typeof PaymentMethod)[keyof typeof PaymentMethod];
