import { HTTP_METHODS } from "@/constants";
import { request } from "@/api/client/request";
import type { WithSignal } from "@/api/types/common";
import type {
    TGetCardsAnalyticsResponse,
    TGetProjectStatusAnalyticsResponse,
    TGetQuotesAnalyticsResponse
} from "./dashboard.types";
import type { TGetAnalyticsParams } from "./dashboard.request.types";

export const GetCardsAnalytics = async (params?: WithSignal<{}>) => {
    const { signal } = params || {};
    const abortSignal = signal;
    return request<TGetCardsAnalyticsResponse>({
        method: HTTP_METHODS.GET,
        url: "/analytics/counts",
        signal: abortSignal
    });
};

export const GetProjectStatusAnalytics = async (params: WithSignal<TGetAnalyticsParams>) => {
    const { signal, ...urlParams } = params || {};
    const abortSignal = signal;
    return request<TGetProjectStatusAnalyticsResponse>({
        method: HTTP_METHODS.GET,
        url: "/analytics/pie-chart",
        params: urlParams as TGetAnalyticsParams,
        signal: abortSignal
    });
};

export const GetQuotesAnalytics = async (params: WithSignal<TGetAnalyticsParams>) => {
    const { signal, ...urlParams } = params || {};
    const abortSignal = signal;
    return request<TGetQuotesAnalyticsResponse>({
        method: HTTP_METHODS.GET,
        url: "/analytics/graph",
        params: urlParams as TGetAnalyticsParams,
        signal: abortSignal
    });
};
