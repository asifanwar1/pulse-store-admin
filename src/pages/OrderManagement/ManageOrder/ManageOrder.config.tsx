import { Select } from "@/components/custom/Select";
import TextareaInput from "@/components/custom/Inputs/TextareaInput/TextareaInput";
import { type FieldType } from "@/components/custom/Form";
import { type ManageOrderFormValues } from "./ManageOrder.schema";
import { PAYMENT_METHOD_OPTIONS } from "@/constants/order-status.constants";
import type { TManageOrderFormConfigProps } from "../OrderManagement.types";

export const getCreateOrderFormConfig = ({
    customerOptions,
    onCustomerSearch,
    onCustomerScroll,
    hasMoreCustomers = false,
    isFetchingMoreCustomers = false,
    isCustomersLoading = false,
    productsOptions,
    onProductSearch,
    onProductScroll,
    hasMoreProducts = false,
    isFetchingMoreProducts = false,
    isProductsLoading = false,
    handleProductsChange,
}: TManageOrderFormConfigProps): FieldType<ManageOrderFormValues>[] => [
    {
        name: "customer",
        label: "Customer",
        component: Select,
        placeholder: "Select a customer",
        required: true,
        className: "col-span-12 md:col-span-6",
        componentProps: {
            options: customerOptions,
            labelRequired: true,
            labelClass: "font-normal",
            autoComplete: true,
            onSearch: onCustomerSearch,
            onScroll: onCustomerScroll,
            hasMore: hasMoreCustomers,
            isFetchingNextPage: isFetchingMoreCustomers,
            loading: isCustomersLoading,
        },
    },
    {
        name: "products",
        label: "Products",
        component: Select,
        placeholder: "Select products",
        required: true,
        className: "col-span-12 md:col-span-6",
        componentProps: {
            multiple: true,
            options: productsOptions,
            labelRequired: true,
            labelClass: "font-normal",
            autoComplete: true,
            onSearch: onProductSearch,
            onScroll: onProductScroll,
            hasMore: hasMoreProducts,
            isFetchingNextPage: isFetchingMoreProducts,
            loading: isProductsLoading,
        },
        onValueChange: handleProductsChange,
    },
    {
        name: "paymentMethod",
        label: "Payment Method",
        component: Select,
        placeholder: "Select payment method",
        required: true,
        className: "col-span-12 md:col-span-6",
        componentProps: {
            options: PAYMENT_METHOD_OPTIONS,
            labelRequired: true,
            labelClass: "font-normal",
        },
    },
    {
        name: "notes",
        label: "Order Notes",
        component: TextareaInput,
        placeholder: "Any special instructions or notes for this order…",
        required: false,
        className: "col-span-12",
        componentProps: {
            rows: 3,
            maxLength: 500,
            showCharacterCount: true,
        },
    },
];
