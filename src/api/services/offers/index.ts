import { request } from "@/api/client/request";
import type { TApiArgs, TQueryParams, WithSignal } from "@/api/types/common";
import { HTTP_METHODS } from "@/constants";
import type {
    TCreateOfferBody,
    TGetOffersParams,
    TUpdateOfferBody,
} from "./offers.request";
import type {
    TCreateOfferResponse,
    TDeleteOfferResponse,
    TGetActiveOffersResponse,
    TGetOfferResponse,
    TGetOffersResponse,
    TUpdateOfferResponse,
} from "./offers.response";
import { OFFER_QUERY_KEYS } from "./queryKeys";

export const GetOffers = async (params?: WithSignal<TGetOffersParams>) => {
    const { signal, ...urlParams } = params || {};
    const abortSignal = signal;

    return request<TGetOffersResponse, TGetOffersParams>({
        method: HTTP_METHODS.GET,
        url: "/offers/",
        params: urlParams as TQueryParams,
        signal: abortSignal,
    });
};

export const CreateOffer = async (body: TCreateOfferBody) => {
    return request<TCreateOfferResponse, TCreateOfferBody>({
        method: HTTP_METHODS.POST,
        url: "/offers/",
        body,
    });
};

export const GetOffer = async ({ id }: TApiArgs) => {
    return request<TGetOfferResponse, undefined>({
        method: HTTP_METHODS.GET,
        url: `/offers/${id}`,
    });
};

export const UpdateOffer = async ({
    id,
    body,
}: TApiArgs<TUpdateOfferBody>) => {
    return request<TUpdateOfferResponse, TUpdateOfferBody>({
        method: HTTP_METHODS.PATCH,
        url: `/offers/${id}`,
        body,
    });
};

export const DeleteOffer = async ({ id }: TApiArgs) => {
    return request<TDeleteOfferResponse, undefined>({
        method: HTTP_METHODS.DELETE,
        url: `/offers/${id}`,
    });
};

export const GetActiveOffers = async (params?: WithSignal<{}>) => {
    const { signal } = params || {};

    return request<TGetActiveOffersResponse>({
        method: HTTP_METHODS.GET,
        url: "/offers/active",
        signal,
    });
};

export { OFFER_QUERY_KEYS };
