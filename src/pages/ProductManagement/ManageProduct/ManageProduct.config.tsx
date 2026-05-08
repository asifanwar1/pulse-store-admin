import { Select } from "@/components/custom/Select";
import TextareaInput from "@/components/custom/Inputs/TextareaInput/TextareaInput";
import FileUploader from "@/components/custom/Inputs/FileUploader";
import { type FieldType } from "@/components/custom/Form";
import { type ManageProductFormValues } from "./ManageProduct.schema";
import { CATEGORY_OPTIONS } from "@/constants/product-categories.constants";
import { STATUS_OPTIONS } from "@/constants/product-status.constants";
import InputWithChips from "@/components/custom/InputWithChips";

export const ADD_PRODUCT_FORM_CONFIG: FieldType<ManageProductFormValues>[] = [
    {
        name: "name",
        label: "Product Name",
        type: "text",
        placeholder: "e.g. Sony WH-1000XM5",
        required: true,
        className: "col-span-12 md:col-span-6",
        labelClass: "font-normal",
    },
    {
        name: "sku",
        label: "SKU",
        type: "text",
        placeholder: "e.g. SNY-WH1000XM5",
        required: true,
        className: "col-span-12 md:col-span-6",
        labelClass: "font-normal",
    },
    {
        name: "brand",
        label: "Brand",
        type: "text",
        placeholder: "e.g. Sony",
        required: true,
        className: "col-span-12 md:col-span-6",
        labelClass: "font-normal",
    },
    {
        name: "category",
        label: "Category",
        component: Select,
        placeholder: "Select a category",
        required: true,
        className: "col-span-12 md:col-span-6",
        componentProps: {
            options: CATEGORY_OPTIONS,
            labelRequired: true,
            labelClass: "font-normal",
        },
    },
    {
        name: "status",
        label: "Status",
        component: Select,
        placeholder: "Select a status",
        required: true,
        className: "col-span-12 md:col-span-6",
        componentProps: {
            options: STATUS_OPTIONS,
            labelRequired: true,
            labelClass: "font-normal",
        },
    },
    {
        name: "price",
        label: "Retail Price ($)",
        type: "number",
        placeholder: "e.g. 349",
        required: true,
        className: "col-span-12 md:col-span-6",
        labelClass: "font-normal",
        componentProps: { min: 0, step: "0.01" },
    },
    {
        name: "costPrice",
        label: "Cost Price ($)",
        type: "number",
        placeholder: "e.g. 220",
        required: true,
        className: "col-span-12 md:col-span-6",
        labelClass: "font-normal",
        componentProps: { min: 0, step: "0.01" },
    },
    {
        name: "stock",
        label: "Stock Quantity",
        type: "number",
        placeholder: "e.g. 100",
        required: true,
        className: "col-span-12 md:col-span-6",
        labelClass: "font-normal",
        componentProps: { min: 0, step: "1" },
    },
    {
        name: "tags",
        label: "Tags",
        component: InputWithChips,
        required: false,
        placeholder: "Add tags (press Enter)",
        className: "col-span-12 -mt-2",
    },
    {
        name: "description",
        label: "Description",
        component: TextareaInput,
        placeholder: "Enter a short product description…",
        required: true,
        className: "col-span-12",
        componentProps: {
            rows: 4,
            maxLength: 500,
            showCharacterCount: true,
            labelRequired: true,
        },
    },
    {
        name: "images",
        label: "Product Images",
        component: FileUploader,
        required: true,
        placeholder: "Drag & drop images here, or click to browse",
        className: "col-span-12",
        componentProps: {
            multiple: true,
            accept: "image/*",
            maxSize: 5 * 1024 * 1024,
            maxFiles: 8,
            previewSize: "md",
        },
    },
];
