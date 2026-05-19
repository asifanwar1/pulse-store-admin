import { request } from "@/api/client/request";
import type { TApiArgs, TQueryParams, WithSignal } from "@/api/types/common";
import { HTTP_METHODS } from "@/constants";
import type {
    TCreateOrderBody,
    TGetOrdersParams,
    TUpdateOrderStatusBody,
} from "./orders.request.types";
import type {
    TCreateOrderResponse,
    TGetOrderResponse,
    TGetOrdersResponse,
    TUpdateOrderStatusResponse,
} from "./orders.response.types";
import { ORDER_QUERY_KEYS } from "./queryKeys";

export const GetOrders = async (params?: WithSignal<TGetOrdersParams>) => {
    const { signal, ...urlParams } = params || {};
    const abortSignal = signal;

    return request<TGetOrdersResponse, TGetOrdersParams>({
        method: HTTP_METHODS.GET,
        url: "/orders",
        params: urlParams as TQueryParams,
        signal: abortSignal,
    });
};

export const CreateOrder = async (body: TCreateOrderBody) => {
    return request<TCreateOrderResponse, TCreateOrderBody>({
        method: HTTP_METHODS.POST,
        url: "/orders",
        body,
    });
};

export const GetOrder = async ({ id }: TApiArgs) => {
    return request<TGetOrderResponse, undefined>({
        method: HTTP_METHODS.GET,
        url: `/orders/${id}`,
    });
};

export const UpdateOrderStatus = async ({
    id,
    body,
}: TApiArgs<TUpdateOrderStatusBody>) => {
    return request<TUpdateOrderStatusResponse, TUpdateOrderStatusBody>({
        method: HTTP_METHODS.PATCH,
        url: `/orders/${id}/status`,
        body,
    });
};

export { ORDER_QUERY_KEYS };
