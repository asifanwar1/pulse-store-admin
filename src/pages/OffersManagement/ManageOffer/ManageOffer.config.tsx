import { Select } from "@/components/custom/Select";
import TextareaInput from "@/components/custom/Inputs/TextareaInput/TextareaInput";
import { DatePicker } from "@/components/custom/DatePicker";
import { type FieldType } from "@/components/custom/Form";
import {
    OfferScope,
    OFFER_SCOPE_OPTIONS,
} from "@/constants/offer-scope.constants";
import type { ManageOfferFormValues } from "./ManageOffer.schema";
import type { TManageOfferFormConfigProps } from "../OffersManagement.types";
import CustomToggle from "@/components/custom/CustomToggle/CustomToggle";

const isSpecificScope = (scope: unknown) => {
    const resolved =
        typeof scope === "string"
            ? scope
            : ((scope as { value?: string } | null | undefined)?.value ?? "");
    return resolved === OfferScope.SPECIFIC_CATEGORIES;
};

export const getManageOfferFormConfig = ({
    categoryOptions,
    onCategorySearch,
    onCategoryScroll,
    hasMoreCategories = false,
    isFetchingMoreCategories = false,
    isCategoriesLoading = false,
    productOptions,
    onProductSearch,
    onProductScroll,
    hasMoreProducts = false,
    isFetchingMoreProducts = false,
    isProductsLoading = false,
}: TManageOfferFormConfigProps): FieldType<ManageOfferFormValues>[] => [
    {
        name: "name",
        label: "Offer Name",
        type: "text",
        placeholder: "e.g. Summer Sale",
        required: true,
        className: "col-span-12 md:col-span-6",
        labelClass: "font-normal",
    },
    {
        name: "discountPercentage",
        label: "Discount (%)",
        type: "number",
        placeholder: "e.g. 25",
        required: true,
        className: "col-span-12 md:col-span-6",
        labelClass: "font-normal",
        componentProps: { min: 0, max: 100, step: "0.01" },
    },
    {
        name: "startDate",
        label: "Start Date",
        component: DatePicker,
        required: true,
        className: "col-span-12 md:col-span-6",
        labelClass: "font-normal",
        componentProps: { showIcon: true },
    },
    {
        name: "endDate",
        label: "End Date",
        component: DatePicker,
        required: true,
        className: "col-span-12 md:col-span-6",
        labelClass: "font-normal",
        componentProps: { showIcon: true },
    },
    {
        name: "scope",
        label: "Offer Scope",
        component: Select,
        placeholder: "Select a scope",
        required: true,
        className: "col-span-12",
        componentProps: {
            options: OFFER_SCOPE_OPTIONS,
            labelRequired: true,
            labelClass: "font-normal",
        },
    },
    {
        name: "categoryIds",
        label: "Categories",
        component: Select,
        placeholder: "Select categories",
        className: "col-span-12 md:col-span-6",
        shouldDisplay: (form) => isSpecificScope(form.watch("scope")),
        componentProps: {
            options: categoryOptions,
            multiple: true,
            labelClass: "font-normal",
            autoComplete: true,
            onSearch: onCategorySearch,
            onScroll: onCategoryScroll,
            hasMore: hasMoreCategories,
            isFetchingNextPage: isFetchingMoreCategories,
            loading: isCategoriesLoading,
        },
    },
    {
        name: "includedProductIds",
        label: "Additional Products",
        component: Select,
        placeholder: "Select products to also include",
        className: "col-span-12 md:col-span-6",
        shouldDisplay: (form) => isSpecificScope(form.watch("scope")),
        componentProps: {
            options: productOptions,
            multiple: true,
            labelClass: "font-normal",
            autoComplete: true,
            onSearch: onProductSearch,
            onScroll: onProductScroll,
            hasMore: hasMoreProducts,
            isFetchingNextPage: isFetchingMoreProducts,
            loading: isProductsLoading,
        },
    },
    {
        name: "excludedProductIds",
        label: "Excluded Products",
        component: Select,
        placeholder: "Select products to exclude from this offer",
        className: "col-span-12",
        helperText:
            "These products will never receive this offer's discount, even if they belong to the selected categories.",
        componentProps: {
            options: productOptions,
            multiple: true,
            labelClass: "font-normal",
            autoComplete: true,
            onSearch: onProductSearch,
            onScroll: onProductScroll,
            hasMore: hasMoreProducts,
            isFetchingNextPage: isFetchingMoreProducts,
            loading: isProductsLoading,
        },
    },
    {
        name: "description",
        label: "Description",
        component: TextareaInput,
        placeholder: "Enter a short offer description",
        className: "col-span-12",
        componentProps: {
            rows: 3,
            maxLength: 500,
            showCharacterCount: true,
        },
    },
    {
        name: "isActive",
        label: "Status",
        component: CustomToggle,
        componentProps: {
            isLabel: true,
            onLabel: "Active",
            offLabel: "Inactive",
            offLabelClass: "mr-[0rem]",
            onCircleClass: "ml-[-1rem]",
        },
    },
];
