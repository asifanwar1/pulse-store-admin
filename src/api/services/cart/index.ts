import { request } from "@/api/client/request";
import type { TApiArgs, WithSignal } from "@/api/types/common";
import { HTTP_METHODS } from "@/constants";
import type {
    TCartItemAdd,
    TCartItemUpdate,
} from "./cart.request.types";
import type {
    TAddCartItemResponse,
    TClearCartResponse,
    TGetCartResponse,
    TRemoveCartItemResponse,
    TUpdateCartItemResponse,
} from "./cart.response.types";

export const GetCart = async (params?: WithSignal<{}>) => {
    const { signal } = params || {};
    const abortSignal = signal;

    return request<TGetCartResponse, undefined>({
        method: HTTP_METHODS.GET,
        url: "/cart",
        signal: abortSignal,
    });
};

export const ClearCart = async () => {
    return request<TClearCartResponse, undefined>({
        method: HTTP_METHODS.DELETE,
        url: "/cart",
    });
};

export const AddCartItem = async (body: TCartItemAdd) => {
    return request<TAddCartItemResponse, TCartItemAdd>({
        method: HTTP_METHODS.POST,
        url: "/cart/items",
        body,
    });
};

export const UpdateCartItem = async ({
    id,
    body,
}: TApiArgs<TCartItemUpdate>) => {
    return request<TUpdateCartItemResponse, TCartItemUpdate>({
        method: HTTP_METHODS.PUT,
        url: `/cart/items/${id}`,
        body,
    });
};

export const RemoveCartItem = async ({ id }: TApiArgs) => {
    return request<TRemoveCartItemResponse, undefined>({
        method: HTTP_METHODS.DELETE,
        url: `/cart/items/${id}`,
    });
};
