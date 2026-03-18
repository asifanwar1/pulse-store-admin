import { HTTP_METHODS } from "@/constants";
import type {
    TCreateColorBody,
    TGetStainsParams,
    TUpdateStainBody,
    TCreateStainBody,
    TGetColorsParams,
    TUpdateColorBody,
    TCreateHandleStyleBody,
    TUpdateHandleStyleBody,
    TGetHandleStylesParams,
    TCreateCabinetDoorBody,
    TUpdateCabinetDoorBody,
    TGetCabinetDoorsParams,
    TCreateHandleBody,
    TUpdateHandleBody,
    TGetHandlesParams,
    TGetPricesParams,
    TCreatePriceBody,
    TUpdatePriceBody
} from "./product.request.types";
import type {
    TCreateStainResponse,
    TDeleteStainResponse,
    TUpdateColorResponse,
    TUpdateStainResponse,
    TGetStainsResponse,
    TDeleteColorResponse,
    TStainResponse,
    TGetColorsResponse,
    TCreateColorResponse,
    TCreateHandleStyleResponse,
    TUpdateHandleStyleResponse,
    TDeleteHandleStyleResponse,
    TGetHandleStylesResponse,
    THandleStyleResponse,
    TCreateCabinetDoorResponse,
    TUpdateCabinetDoorResponse,
    TDeleteCabinetDoorResponse,
    TGetCabinetDoorsResponse,
    TGetCabinetDoorByIdResponse,
    TCreateHandleResponse,
    TUpdateHandleResponse,
    TDeleteHandleResponse,
    TGetHandlesResponse,
    TGetHandleByIdResponse,
    TGetPriceByIdResponse,
    TGetPricesResponse,
    TCreatePriceResponse,
    TUpdatePriceResponse,
    TDeletePriceResponse
} from "./product.response.types";
import { request } from "@/api/client/request";
import type { TQueryParams, WithSignal } from "@/api/types/common";
import { QUERY_KEYS } from "./queryKeys";

export type ApiArgs<TBody = unknown, TParams = unknown> = {
    id?: number;
    body?: TBody;
    params?: TParams;
};

export const CreateColor = async ({ body }: ApiArgs<TCreateColorBody>) => {
    return request<TCreateColorResponse, TCreateColorBody>({
        method: HTTP_METHODS.POST,
        url: "/colors",
        body
    });
};

export const UpdateColor = async ({ id, body }: ApiArgs<TUpdateColorBody>) => {
    return request<TUpdateColorResponse, TUpdateColorBody>({
        method: HTTP_METHODS.PUT,
        url: `/colors/${id}`,
        body
    });
};

export const DeleteColor = async ({ id }: ApiArgs) => {
    return request<TDeleteColorResponse, undefined>({
        method: HTTP_METHODS.DELETE,
        url: `/colors/${id}`
    });
};

export const GetColors = async (params?: WithSignal<TGetColorsParams>) => {
    const { signal, ...urlParams } = params || {};
    const abortSignal = signal;
    return request<TGetColorsResponse, TGetColorsParams>({
        method: HTTP_METHODS.GET,
        url: "/colors",
        params: urlParams as TQueryParams,
        signal: abortSignal
    });
};

export const GetColorById = async ({ id }: ApiArgs) => {
    return request<TCreateColorResponse, undefined>({
        method: HTTP_METHODS.GET,
        url: `/colors/${id}`
    });
};

export const CreateStain = async ({ body }: ApiArgs<TCreateStainBody>) => {
    return request<TCreateStainResponse, TCreateStainBody>({
        method: HTTP_METHODS.POST,
        url: "/stains",
        body
    });
};
export const UpdateStain = async ({ id, body }: ApiArgs<TUpdateStainBody>) => {
    return request<TUpdateStainResponse, TUpdateStainBody>({
        method: HTTP_METHODS.PUT,
        url: `/stains/${id}`,
        body
    });
};

export const DeleteStain = async ({ id }: ApiArgs) => {
    return request<TDeleteStainResponse, undefined>({
        method: HTTP_METHODS.DELETE,
        url: `/stains/${id}`
    });
};

export const GetStains = async (params?: WithSignal<TGetColorsParams>) => {
    const { signal, ...urlParams } = params || {};
    const abortSignal = signal;
    return request<TGetStainsResponse, TGetStainsParams>({
        method: HTTP_METHODS.GET,
        url: "/stains",
        params: urlParams as TQueryParams,
        signal: abortSignal
    });
};

export const GetStainById = async ({ id }: ApiArgs) => {
    return request<TStainResponse, undefined>({
        method: HTTP_METHODS.GET,
        url: `/stains/${id}`
    });
};

export const CreateHandleStyle = async ({ body }: ApiArgs<TCreateHandleStyleBody>) => {
    return request<TCreateHandleStyleResponse, TCreateHandleStyleBody>({
        method: HTTP_METHODS.POST,
        url: "/handle-styles",
        body
    });
};

export const UpdateHandleStyle = async ({ id, body }: ApiArgs<TUpdateHandleStyleBody>) => {
    return request<TUpdateHandleStyleResponse, TUpdateHandleStyleBody>({
        method: HTTP_METHODS.PUT,
        url: `/handle-styles/${id}`,
        body
    });
};

export const DeleteHandleStyle = async ({ id }: ApiArgs) => {
    return request<TDeleteHandleStyleResponse, undefined>({
        method: HTTP_METHODS.DELETE,
        url: `/handle-styles/${id}`
    });
};

export const GetHandleStyles = async (params?: WithSignal<TGetHandleStylesParams>) => {
    const { signal, ...urlParams } = params || {};
    const abortSignal = signal;
    return request<TGetHandleStylesResponse, TGetHandleStylesParams>({
        method: HTTP_METHODS.GET,
        url: "/handle-styles",
        params: urlParams as TQueryParams,
        signal: abortSignal
    });
};

export const GetHandleStyleById = async ({ id }: ApiArgs) => {
    return request<THandleStyleResponse, undefined>({
        method: HTTP_METHODS.GET,
        url: `/handle-styles/${id}`
    });
};

export const CreateCabinetDoor = async ({ body }: ApiArgs<TCreateCabinetDoorBody>) => {
    return request<TCreateCabinetDoorResponse, TCreateCabinetDoorBody>({
        method: HTTP_METHODS.POST,
        url: "/cabinet-doors",
        body
    });
};

export const UpdateCabinetDoor = async ({ id, body }: ApiArgs<TUpdateCabinetDoorBody>) => {
    return request<TUpdateCabinetDoorResponse, TUpdateCabinetDoorBody>({
        method: HTTP_METHODS.PATCH,
        url: `/cabinet-doors/${id}`,
        body
    });
};

export const DeleteCabinetDoor = async ({ id }: ApiArgs) => {
    return request<TDeleteCabinetDoorResponse, undefined>({
        method: HTTP_METHODS.DELETE,
        url: `/cabinet-doors/${id}`
    });
};

export const GetCabinetDoors = async (params?: WithSignal<TGetCabinetDoorsParams>) => {
    const { signal, ...urlParams } = params || {};
    const abortSignal = signal;
    return request<TGetCabinetDoorsResponse, TGetCabinetDoorsParams>({
        method: HTTP_METHODS.GET,
        url: "/cabinet-doors",
        params: urlParams as TQueryParams,
        signal: abortSignal
    });
};

export const GetCabinetDoorById = async ({ id }: ApiArgs) => {
    return request<TGetCabinetDoorByIdResponse, undefined>({
        method: HTTP_METHODS.GET,
        url: `/cabinet-doors/${id}`
    });
};

export const CreateHandle = async ({ body }: ApiArgs<TCreateHandleBody>) => {
    return request<TCreateHandleResponse, TCreateHandleBody>({
        method: HTTP_METHODS.POST,
        url: "/handles",
        body
    });
};

export const UpdateHandle = async ({ id, body }: ApiArgs<TUpdateHandleBody>) => {
    return request<TUpdateHandleResponse, TUpdateHandleBody>({
        method: HTTP_METHODS.PATCH,
        url: `/handles/${id}`,
        body
    });
};

export const DeleteHandle = async ({ id }: ApiArgs) => {
    return request<TDeleteHandleResponse, undefined>({
        method: HTTP_METHODS.DELETE,
        url: `/handles/${id}`
    });
};

export const GetHandles = async (params?: WithSignal<TGetHandlesParams>) => {
    const { signal, ...urlParams } = params || {};
    const abortSignal = signal;
    return request<TGetHandlesResponse, TGetHandlesParams>({
        method: HTTP_METHODS.GET,
        url: "/handles",
        params: urlParams as TQueryParams,
        signal: abortSignal
    });
};

export const GetHandleById = async ({ id }: ApiArgs) => {
    return request<TGetHandleByIdResponse, undefined>({
        method: HTTP_METHODS.GET,
        url: `/handles/${id}`
    });
};

export const CreatePrice = async ({ body }: ApiArgs<TCreatePriceBody>) => {
    return request<TCreatePriceResponse, TCreatePriceBody>({
        method: HTTP_METHODS.POST,
        url: "/prices",
        body
    });
};

export const UpdatePrice = async ({ id, body }: ApiArgs<TUpdatePriceBody>) => {
    return request<TUpdatePriceResponse, TUpdatePriceBody>({
        method: HTTP_METHODS.PUT,
        url: `/prices/${id}`,
        body
    });
};

export const DeletePrice = async ({ id }: ApiArgs) => {
    return request<TDeletePriceResponse, undefined>({
        method: HTTP_METHODS.DELETE,
        url: `/prices/${id}`
    });
};

export const GetPrices = async (params?: WithSignal<TGetPricesParams>) => {
    const { signal, ...urlParams } = params || {};
    const abortSignal = signal;
    return request<TGetPricesResponse, TGetPricesParams>({
        method: HTTP_METHODS.GET,
        url: "/prices",
        params: urlParams as TQueryParams,
        signal: abortSignal
    });
};

export const GetPriceById = async ({ id }: ApiArgs) => {
    return request<TGetPriceByIdResponse, undefined>({
        method: HTTP_METHODS.GET,
        url: `/prices/${id}`
    });
};

export { QUERY_KEYS };
