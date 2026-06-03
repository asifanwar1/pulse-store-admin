import { injectBaseConstantMethods } from "./base.constants";

export const ProductStatus = {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
    DRAFT: "DRAFT",
    OUT_OF_STOCK: "OUT_OF_STOCK",
};

export const STATUS_OPTIONS = [
    { value: "ACTIVE", label: "Active" },
    { value: "DRAFT", label: "Draft" },
    { value: "OUT_OF_STOCK", label: "Out of Stock" },
    { value: "INACTIVE", label: "Inactive" },
];

const productStatusTextKeys = {
    [ProductStatus.ACTIVE]: "Active",
    [ProductStatus.INACTIVE]: "Inactive",
    [ProductStatus.DRAFT]: "Draft",
    [ProductStatus.OUT_OF_STOCK]: "Out of Stock",
};

const productLabelClasses = {
    [ProductStatus.ACTIVE]: "bg-green-100 text-green-800",
    [ProductStatus.INACTIVE]: "bg-red-100 text-red-800",
    [ProductStatus.DRAFT]: "bg-yellow-100 text-yellow-800",
    [ProductStatus.OUT_OF_STOCK]: "bg-red-100 text-red-800",
};

export const ProductStatusWithHelpers = injectBaseConstantMethods(
    ProductStatus,
    productStatusTextKeys,
    productLabelClasses,
);

export type ProductStatusType =
    (typeof ProductStatus)[keyof typeof ProductStatus];
