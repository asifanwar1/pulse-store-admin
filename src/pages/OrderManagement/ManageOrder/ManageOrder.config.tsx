import { Select } from "@/components/custom/Select";
import TextareaInput from "@/components/custom/Inputs/TextareaInput/TextareaInput";
import { type FieldType } from "@/components/custom/Form";
import { type ManageOrderFormValues } from "./ManageOrder.schema";
import {
    PAYMENT_METHOD_OPTIONS,
    COUNTRY_OPTIONS,
} from "@/constants/order-status.constants";
import type { TManageOrderFormConfigProps } from "../OrderManagement.types";

export const getCreateOrderFormConfig = ({
    userOptions,
    onUserSearch,
    onUserScroll,
    hasMoreUsers = false,
    isFetchingMoreUsers = false,
    isUsersLoading = false,
}: TManageOrderFormConfigProps): FieldType<ManageOrderFormValues>[] => [
    {
        name: "user",
        label: "User",
        component: Select,
        placeholder: "Select a user",
        required: true,
        className: "col-span-12 md:col-span-6",
        componentProps: {
            options: userOptions,
            labelRequired: true,
            labelClass: "font-normal",
            autoComplete: true,
            onSearch: onUserSearch,
            onScroll: onUserScroll,
            hasMore: hasMoreUsers,
            isFetchingNextPage: isFetchingMoreUsers,
            loading: isUsersLoading,
        },
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
        name: "shippingStreet",
        label: "Street Address",
        type: "text",
        placeholder: "e.g. 142 Maple Drive",
        required: true,
        className: "col-span-12",
        labelClass: "font-normal",
    },
    {
        name: "shippingCity",
        label: "City",
        type: "text",
        placeholder: "e.g. San Francisco",
        required: true,
        className: "col-span-12 md:col-span-6",
        labelClass: "font-normal",
    },
    {
        name: "shippingZip",
        label: "ZIP / Postal Code",
        type: "text",
        placeholder: "e.g. 94105",
        required: true,
        className: "col-span-12 md:col-span-6",
        labelClass: "font-normal",
    },
    {
        name: "shippingState",
        label: "State / Province",
        type: "text",
        placeholder: "e.g. CA",
        required: true,
        className: "col-span-12 md:col-span-6",
        labelClass: "font-normal",
    },

    {
        name: "shippingCountry",
        label: "Country",
        component: Select,
        placeholder: "Select country",
        required: true,
        className: "col-span-12 md:col-span-6",
        componentProps: {
            options: COUNTRY_OPTIONS,
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
