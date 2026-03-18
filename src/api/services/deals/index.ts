import { HTTP_METHODS } from "@/constants";
import type {
    TCreateDealBody,
    TUpdateDealBody,
    TGetDealsParams,
    TUpdateDealStatusParams
} from "./deals.request.types";
import type {
    TCreateDealResponse,
    TUpdateDealResponse,
    TDeleteDealResponse,
    TGetDealsResponse,
    TGetDealByIdResponse,
    TUpdateDealStatusResponse
} from "./deals.response.types";
import { request } from "@/api/client/request";
import type { TQueryParams, WithSignal } from "@/api/types/common";
import { QUERY_KEYS } from "./queryKeys";

export type ApiArgs<TBody = unknown, TParams = unknown> = {
    id?: number;
    body?: TBody;
    params?: TParams;
};

export const CreateDeal = async ({ body }: ApiArgs<TCreateDealBody>) => {
    return request<TCreateDealResponse, TCreateDealBody>({
        method: HTTP_METHODS.POST,
        url: "/deal",
        body
    });
};

export const UpdateDeal = async ({ id, body }: ApiArgs<TUpdateDealBody>) => {
    return request<TUpdateDealResponse, TUpdateDealBody>({
        method: HTTP_METHODS.PATCH,
        url: `/deal/${id}`,
        body
    });
};

export const DeleteDeal = async ({ id }: ApiArgs) => {
    return request<TDeleteDealResponse, undefined>({
        method: HTTP_METHODS.DELETE,
        url: `/deal/${id}`
    });
};

export const GetDeals = async (params?: WithSignal<TGetDealsParams>) => {
    const { signal, ...urlParams } = params || {};
    const abortSignal = signal;
    return request<TGetDealsResponse, TGetDealsParams>({
        method: HTTP_METHODS.GET,
        url: "/deal",
        params: urlParams as TQueryParams,
        signal: abortSignal
    });
};

export const GetDealById = async ({ id }: ApiArgs) => {
    return request<TGetDealByIdResponse, undefined>({
        method: HTTP_METHODS.GET,
        url: `/deal/${id}`
    });
};

export const UpdateDealStatus = async ({
    id,
    status
}: {
    id: number;
    status: "ACTIVE" | "INACTIVE";
}) => {
    return request<TUpdateDealStatusResponse, TUpdateDealStatusParams>({
        method: HTTP_METHODS.PATCH,
        url: `/deal/${id}/status`,
        params: { status } as TQueryParams
    });
};

export { QUERY_KEYS };
