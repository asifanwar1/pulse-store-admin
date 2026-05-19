import { request } from "@/api/client/request";
import type { TQueryParams, WithSignal } from "@/api/types/common";
import { HTTP_METHODS } from "@/constants";
import type { TGetProductsParams } from "./products.request.types";
import type { TGetProductsResponse } from "./products.response";
import { PRODUCT_QUERY_KEYS } from "./queryKeys";

export const GetProducts = async (params?: WithSignal<TGetProductsParams>) => {
    const { signal, ...urlParams } = params || {};
    const abortSignal = signal;

    return request<TGetProductsResponse, TGetProductsParams>({
        method: HTTP_METHODS.GET,
        url: "/products",
        params: urlParams as TQueryParams,
        signal: abortSignal,
    });
};

export { PRODUCT_QUERY_KEYS };
