import { request } from "@/api/client/request";
import type { TApiArgs, TQueryParams, WithSignal } from "@/api/types/common";
import { HTTP_METHODS } from "@/constants";
import type {
    TGetReviewsParams,
    TUpdateReviewVisibilityBody,
} from "./reviews.request.types";
import type {
    TGetReviewsAnalyticsResponse,
    TGetReviewsResponse,
    TUpdateReviewVisibilityResponse,
} from "./reviews.response.types";
import { REVIEW_QUERY_KEYS } from "./queryKeys";

export const GetReviews = async (params?: WithSignal<TGetReviewsParams>) => {
    const { signal, ...urlParams } = params || {};
    const abortSignal = signal;

    return request<TGetReviewsResponse, TGetReviewsParams>({
        method: HTTP_METHODS.GET,
        url: "/reviews/",
        params: urlParams as TQueryParams,
        signal: abortSignal,
    });
};

export const UpdateReviewVisibility = async ({
    id,
    body,
}: TApiArgs<TUpdateReviewVisibilityBody>) => {
    return request<TUpdateReviewVisibilityResponse, TUpdateReviewVisibilityBody>({
        method: HTTP_METHODS.PATCH,
        url: `/reviews/${id}/visibility`,
        body,
    });
};

export const GetReviewsAnalytics = async (params?: WithSignal<{}>) => {
    const { signal } = params || {};

    return request<TGetReviewsAnalyticsResponse>({
        method: HTTP_METHODS.GET,
        url: "/reviews/analytics",
        signal,
    });
};

export { REVIEW_QUERY_KEYS };
