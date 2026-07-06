import type { TOfferScope, TOfferStatus } from "./offers.request.types";

export type TOfferResponse = {
    id: number;
    title?: string | null;
    name?: string | null;
    description?: string | null;
    code?: string | null;
    discount_type?: string | null;
    discount_value?: number | null;
    scope?: TOfferScope | null;
    is_active?: boolean | null;
    status?: TOfferStatus | null;
    starts_at?: string | null;
    ends_at?: string | null;
    created_at?: string;
    updated_at?: string;
    [key: string]: unknown;
};

export type TGetOffersResponse = {
    data: TOfferResponse[];
    count: number;
};

export type TCreateOfferResponse = TOfferResponse;
export type TGetOfferResponse = TOfferResponse;
export type TUpdateOfferResponse = TOfferResponse;

export type TDeleteOfferResponse = {
    data: boolean;
};

export type TGetActiveOffersResponse = {
    data: TOfferResponse[];
    count?: number;
};
