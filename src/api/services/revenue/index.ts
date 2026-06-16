import { request } from "@/api/client/request";
import type { TApiArgs, TQueryParams, WithSignal } from "@/api/types/common";
import { HTTP_METHODS } from "@/constants";
import type { TGetRevenuesParams } from "./revenue.request.types.ts";
import type {
    TGetRevenuesResponse,
    TGetRevenueResponse,
    TGetRevenuesAnalyticsResponse,
} from "./revenue.response.types.ts";
import { REVENUE_QUERY_KEYS } from "./queryKeys";

export const GetRevenues = async (params?: WithSignal<TGetRevenuesParams>) => {
    const { signal, ...urlParams } = params || {};
    const abortSignal = signal;

    return request<TGetRevenuesResponse, TGetRevenuesParams>({
        method: HTTP_METHODS.GET,
        url: "/revenue",
        params: urlParams as TQueryParams,
        signal: abortSignal,
    });
};

export const GetRevenue = async ({ id }: TApiArgs) => {
    return request<TGetRevenueResponse, undefined>({
        method: HTTP_METHODS.GET,
        url: `/revenue/${id}`,
    });
};

export const GetRevenuesAnalytics = async (params?: WithSignal<{}>) => {
    const { signal } = params || {};

    return request<TGetRevenuesAnalyticsResponse>({
        method: HTTP_METHODS.GET,
        url: "/revenue/analytics",
        signal,
    });
};

export { REVENUE_QUERY_KEYS };
