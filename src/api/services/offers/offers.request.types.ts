import type { BaseQueryType } from "@/api/models";

export type TOfferScope = "ALL_CATEGORIES" | "SPECIFIC_CATEGORIES";
export type TOfferStatus = "UPCOMING" | "ACTIVE" | "EXPIRED" | "DISABLED";

export type TGetOffersParams = BaseQueryType & {
    search?: string;
    scope?: TOfferScope | null;
    is_active?: boolean | null;
    status?: TOfferStatus | null;
};

export type TCreateOfferBody = {
    name: string;
    description?: string | null;
    discount_percentage: number;
    scope: TOfferScope;
    start_date: string;
    end_date: string;
    is_active?: boolean;
    category_ids?: number[];
    included_product_ids?: number[];
    excluded_product_ids?: number[];
};

export type TUpdateOfferBody = Partial<TCreateOfferBody>;
