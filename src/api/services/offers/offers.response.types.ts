import type { TOfferScope, TOfferStatus } from "./offers.request.types";

export type TOfferCategorySummary = {
    id: number;
    name: string;
};

export type TOfferProductSummary = {
    id: number;
    name: string;
};

export type TOfferResponse = {
    id: number;
    name: string;
    description?: string | null;
    discount_percentage: string;
    scope: TOfferScope;
    start_date: string;
    end_date: string;
    is_active: boolean;
    status: TOfferStatus;
    categories: TOfferCategorySummary[];
    included_products: TOfferProductSummary[];
    excluded_products: TOfferProductSummary[];
    created_at: string;
    updated_at?: string | null;
};

export type TGetOffersResponse = {
    data: TOfferResponse[];
    count: number;
};

export type TCreateOfferResponse = TOfferResponse;
export type TGetOfferResponse = TOfferResponse;
export type TUpdateOfferResponse = TOfferResponse;

export type TDeleteOfferResponse = void;

export type TActiveOfferResponse = {
    id: number;
    name: string;
    description?: string | null;
    discount_percentage: string;
    scope: TOfferScope;
    end_date: string;
};

export type TGetActiveOffersResponse = {
    data: TActiveOfferResponse[];
    count: number;
};
