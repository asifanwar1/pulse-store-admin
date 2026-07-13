export type TLinkType = "product" | "category" | "url" | "none";

export type TPlacement = "home_top" | "home_mid" | "category_page";

export type TGetBannersParams = {
    page?: number;
    limit?: number;
    placement?: TPlacement | null;
    is_active?: boolean | null;
};

export type TCreateBannerBody = {
    title: string;
    image_url: string;
    image_url_mobile?: string | null;
    design_json: Record<string, unknown>;
    link_type: TLinkType;
    link_value?: string | null;
    placement: TPlacement;
    position?: number;
    is_active?: boolean;
    start_date?: string | null;
    end_date?: string | null;
};

export type TUpdateBannerBody = Partial<TCreateBannerBody>;

export type TUpdateBannerStatusBody = {
    is_active: boolean;
};
