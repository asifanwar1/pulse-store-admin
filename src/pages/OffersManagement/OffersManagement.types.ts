import type { TOfferResponse } from "@/api/services/offers/offers.response.types";

export type ManageOfferFormProps = {
    mode: "add" | "update";
};

export type OfferCardProps = {
    offer: TOfferResponse;
    onEdit: (offer: TOfferResponse) => void;
    onDelete: (offer: TOfferResponse) => void;
    onToggleActive: (offer: TOfferResponse) => void;
    isTogglingActive?: boolean;
};

export type TManageOfferFormConfigProps = {
    categoryOptions: any;
    onCategorySearch: (value: string) => void;
    onCategoryScroll?: () => void;
    hasMoreCategories?: boolean;
    isFetchingMoreCategories?: boolean;
    isCategoriesLoading?: boolean;
    productOptions: any;
    onProductSearch: (value: string) => void;
    onProductScroll?: () => void;
    hasMoreProducts?: boolean;
    isFetchingMoreProducts?: boolean;
    isProductsLoading?: boolean;
};
