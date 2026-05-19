import { request } from "@/api/client/request";
import type { TApiArgs, TQueryParams, WithSignal } from "@/api/types/common";
import { HTTP_METHODS } from "@/constants";
import type {
    TCreateProductBody,
    TGetProductsParams,
    TUpdateProductBody,
} from "./products.request.types";
import type {
    TCreateProductResponse,
    TDeleteProductResponse,
    TGetProductAnalyticsResponse,
    TGetProductResponse,
    TGetProductsResponse,
    TUpdateProductResponse,
} from "./products.response";
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

export const CreateProduct = async (body: TCreateProductBody) => {
    return request<TCreateProductResponse, TCreateProductBody>({
        method: HTTP_METHODS.POST,
        url: "/products",
        body,
    });
};

export const GetProduct = async ({ id }: TApiArgs) => {
    return request<TGetProductResponse, undefined>({
        method: HTTP_METHODS.GET,
        url: `/products/${id}`,
    });
};

export const UpdateProduct = async ({
    id,
    body,
}: TApiArgs<TUpdateProductBody>) => {
    return request<TUpdateProductResponse, TUpdateProductBody>({
        method: HTTP_METHODS.PUT,
        url: `/products/${id}`,
        body,
    });
};

export const DeleteProduct = async ({ id }: TApiArgs) => {
    return request<TDeleteProductResponse, undefined>({
        method: HTTP_METHODS.DELETE,
        url: `/products/${id}`,
    });
};

export const GetProductAnalytics = async (params?: WithSignal<{}>) => {
    const { signal } = params || {};
    const abortSignal = signal;

    return request<TGetProductAnalyticsResponse>({
        method: HTTP_METHODS.GET,
        url: "/products/analytics",
        signal: abortSignal,
    });
};

export { PRODUCT_QUERY_KEYS };
