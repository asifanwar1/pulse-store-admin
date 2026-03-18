import { HTTP_METHODS } from "@/constants";
import type { TGetReviewsParams, TCreateReviewBody } from "./reviews.request.types";
import type {
    TRatingDetailResponse,
    TCreateReviewResponse,
    TGetReviewsResponse,
    TGetReviewByIdResponse,
    TUpdateReviewResponse
} from "./reviews.response.types";
import { request } from "@/api/client/request";
import type { TQueryParams, WithSignal } from "@/api/types/common";
import { REVIEW_QUERY_KEYS } from "./queryKeys";
import type { ApiArgs } from "@/api";

export const GetRatingDetail = async ({ id }: ApiArgs) => {
    return request<TRatingDetailResponse, undefined>({
        method: HTTP_METHODS.GET,
        url: `/review/rating-detail/user/${id}`
    });
};

export const CreateReview = async ({ body }: ApiArgs<TCreateReviewBody>) => {
    return request<TCreateReviewResponse, TCreateReviewBody>({
        method: HTTP_METHODS.POST,
        url: "/review",
        body
    });
};

export const GetReviews = async (params?: WithSignal<TGetReviewsParams>) => {
    const { signal, ...urlParams } = params || {};
    const abortSignal = signal;

    return request<TGetReviewsResponse, TGetReviewsParams>({
        method: HTTP_METHODS.GET,
        url: "/review",
        params: urlParams as TQueryParams,
        signal: abortSignal
    });
};

export const GetReviewById = async ({ id }: ApiArgs) => {
    return request<TGetReviewByIdResponse, undefined>({
        method: HTTP_METHODS.GET,
        url: `/review/${id}`
    });
};

export const UpdateReview = async ({ id }: ApiArgs) => {
    return request<TUpdateReviewResponse, undefined>({
        method: HTTP_METHODS.PATCH,
        url: `/review/${id}`
    });
};

export { REVIEW_QUERY_KEYS };
