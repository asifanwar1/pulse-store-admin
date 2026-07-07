import { Select } from "@/components/custom/Select";
import TextareaInput from "@/components/custom/Inputs/TextareaInput/TextareaInput";
import { DatePicker } from "@/components/custom/DatePicker";
import { type FieldType } from "@/components/custom/Form";
import { OfferScope, OFFER_SCOPE_OPTIONS } from "@/constants/offer-scope.constants";
import type { ManageOfferFormValues } from "./ManageOffer.schema";
import type { TManageOfferFormConfigProps } from "../OffersManagement.types";

const isSpecificScope = (scope: unknown) => {
    const resolved =
        typeof scope === "string"
            ? scope
            : ((scope as { value?: string } | null | undefined)?.value ?? "");
    return resolved === OfferScope.SPECIFIC_CATEGORIES;
};

type ActiveToggleProps = {
    value?: boolean;
    onChange: (value: boolean) => void;
    label?: string;
    disabled?: boolean;
};

const ActiveToggle: React.FC<ActiveToggleProps> = ({
    value,
    onChange,
    label,
    disabled,
}) => (
    <div>
        {label && (
            <p className="mb-2 text-sm font-500 text-pulse-green">{label}</p>
        )}
        <div className="flex items-center gap-3">
            <button
                type="button"
                role="switch"
                aria-checked={!!value}
                disabled={disabled}
                onClick={() => onChange(!value)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                    value ? "bg-pulse-green" : "bg-pulse-cream-dark"
                } disabled:opacity-50`}
            >
                <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                        value ? "translate-x-5" : "translate-x-0.5"
                    }`}
                />
            </button>
            <span className="text-sm text-pulse-green-dark">
                {value ? "Offer is active" : "Offer is inactive"}
            </span>
        </div>
    </div>
);

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
        component: ActiveToggle,
        className: "col-span-12",
        labelClass: "font-normal",
    },
];
