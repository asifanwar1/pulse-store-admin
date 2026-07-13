import type { TLinkType, TPlacement } from "./banners.request.types";

export type TBannerResponse = {
    id: number;
    title: string;
    image_url: string;
    image_url_mobile?: string | null;
    design_json: Record<string, unknown>;
    link_type: TLinkType;
    link_value?: string | null;
    placement: TPlacement;
    position: number;
    is_active: boolean;
    start_date?: string | null;
    end_date?: string | null;
    created_at: string;
    updated_at?: string | null;
    created_by?: number | null;
};

export type TGetBannersResponse = {
    data: TBannerResponse[];
    count: number;
};

export type TCreateBannerResponse = TBannerResponse;
export type TGetBannerResponse = TBannerResponse;
export type TUpdateBannerResponse = TBannerResponse;
export type TUpdateBannerStatusResponse = TBannerResponse;
export type TDeleteBannerResponse = void;
