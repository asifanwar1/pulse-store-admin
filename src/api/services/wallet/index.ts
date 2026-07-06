import { request } from "@/api/client/request";
import type { TApiArgs } from "@/api/types/common";
import { HTTP_METHODS } from "@/constants";
import type {
    TAttachPaymentMethodBody,
    TPayOrderRequest,
} from "./wallet.request.types";
import type {
    TDeletePaymentMethodResponse,
    TPayOrderResponse,
    TSetupIntentResponse,
    TWalletConfigResponse,
    TWalletPaymentMethodListResponse,
    TWalletPaymentMethodResponse,
} from "./wallet.response.types";
import { WALLET_QUERY_KEYS } from "./queryKeys";

export const GetWalletConfig = async () => {
    return request<TWalletConfigResponse>({
        method: HTTP_METHODS.GET,
        url: "/wallet/config",
    });
};

export const CreateSetupIntent = async () => {
    return request<TSetupIntentResponse>({
        method: HTTP_METHODS.POST,
        url: "/wallet/setup-intent",
    });
};

export const AttachPaymentMethod = async (body: TAttachPaymentMethodBody) => {
    return request<TWalletPaymentMethodResponse, TAttachPaymentMethodBody>({
        method: HTTP_METHODS.POST,
        url: "/wallet/payment-methods",
        body,
    });
};

export const ListPaymentMethods = async () => {
    return request<TWalletPaymentMethodListResponse>({
        method: HTTP_METHODS.GET,
        url: "/wallet/payment-methods",
    });
};

export const SetDefaultPaymentMethod = async ({ id }: TApiArgs) => {
    return request<TWalletPaymentMethodResponse, undefined>({
        method: HTTP_METHODS.PATCH,
        url: `/wallet/payment-methods/${id}/default`,
    });
};

export const DeletePaymentMethod = async ({ id }: TApiArgs) => {
    return request<TDeletePaymentMethodResponse, undefined>({
        method: HTTP_METHODS.DELETE,
        url: `/wallet/payment-methods/${id}`,
    });
};

export const PayForOrder = async (body: TPayOrderRequest) => {
    return request<TPayOrderResponse, TPayOrderRequest>({
        method: HTTP_METHODS.POST,
        url: "/wallet/pay",
        body,
    });
};

export { WALLET_QUERY_KEYS };
