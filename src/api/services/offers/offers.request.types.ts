import type { BaseQueryType } from "@/api/models";

export type TOfferScope = "GLOBAL" | "CATEGORY" | "PRODUCT" | "USER" | string;
export type TOfferStatus =
    | "DRAFT"
    | "ACTIVE"
    | "PAUSED"
    | "EXPIRED"
    | "INACTIVE"
    | string;

export type TGetOffersParams = BaseQueryType & {
    search?: string;
    scope?: TOfferScope | null;
    is_active?: boolean | null;
    status?: TOfferStatus | null;
};

export type TCreateOfferBody = {
    title?: string;
    name?: string;
    description?: string | null;
    code?: string | null;
    discount_type?: string | null;
    discount_value?: number | null;
    scope?: TOfferScope | null;
    is_active?: boolean | null;
    status?: TOfferStatus | null;
    starts_at?: string | null;
    ends_at?: string | null;
    [key: string]: unknown;
};

export type TUpdateOfferBody = Partial<TCreateOfferBody>;
