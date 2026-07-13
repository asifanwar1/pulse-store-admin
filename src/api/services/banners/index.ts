import { request } from "@/api/client/request";
import type { TApiArgs, TQueryParams, WithSignal } from "@/api/types/common";
import { HTTP_METHODS } from "@/constants";
import type {
    TCreateBannerBody,
    TGetBannersParams,
    TUpdateBannerBody,
    TUpdateBannerStatusBody,
} from "./banners.request.types";
import type {
    TCreateBannerResponse,
    TDeleteBannerResponse,
    TGetBannerResponse,
    TGetBannersResponse,
    TUpdateBannerResponse,
    TUpdateBannerStatusResponse,
} from "./banners.response.types";
import { BANNER_QUERY_KEYS } from "./queryKeys";

export const GetBanners = async (params?: WithSignal<TGetBannersParams>) => {
    const { signal, ...urlParams } = params || {};

    return request<TGetBannersResponse, TGetBannersParams>({
        method: HTTP_METHODS.GET,
        url: "/banners/",
        params: urlParams as TQueryParams,
        signal,
    });
};

export const CreateBanner = async (body: TCreateBannerBody) => {
    return request<TCreateBannerResponse, TCreateBannerBody>({
        method: HTTP_METHODS.POST,
        url: "/banners/",
        body,
    });
};

export const GetBanner = async ({ id }: TApiArgs) => {
    return request<TGetBannerResponse, undefined>({
        method: HTTP_METHODS.GET,
        url: `/banners/${id}`,
    });
};

export const UpdateBanner = async ({
    id,
    body,
}: TApiArgs<TUpdateBannerBody>) => {
    return request<TUpdateBannerResponse, TUpdateBannerBody>({
        method: HTTP_METHODS.PUT,
        url: `/banners/${id}`,
        body,
    });
};

// Hard delete — the row is permanently removed. Use UpdateBannerStatus to
// deactivate/reactivate a banner instead of calling this for a toggle.
export const DeleteBanner = async ({ id }: TApiArgs) => {
    return request<TDeleteBannerResponse, undefined>({
        method: HTTP_METHODS.DELETE,
        url: `/banners/${id}`,
    });
};

export const UpdateBannerStatus = async ({
    id,
    body,
}: TApiArgs<TUpdateBannerStatusBody>) => {
    return request<TUpdateBannerStatusResponse, TUpdateBannerStatusBody>({
        method: HTTP_METHODS.PATCH,
        url: `/banners/${id}/status`,
        body,
    });
};

export { BANNER_QUERY_KEYS };
export type {
    TCreateBannerBody,
    TGetBannersParams,
    TLinkType,
    TPlacement,
    TUpdateBannerBody,
    TUpdateBannerStatusBody,
} from "./banners.request.types";
export type {
    TBannerResponse,
    TCreateBannerResponse,
    TDeleteBannerResponse,
    TGetBannerResponse,
    TGetBannersResponse,
    TUpdateBannerResponse,
    TUpdateBannerStatusResponse,
} from "./banners.response.types";
