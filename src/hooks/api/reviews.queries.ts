import { useMutation, useQuery } from "@tanstack/react-query";

import {
    GetReviews,
    GetReviewsAnalytics,
    REVIEW_QUERY_KEYS,
    UpdateReviewVisibility,
} from "@/api";
import type {
    TGetReviewsParams,
    TUpdateReviewVisibilityBody,
} from "@/api/services/reviews/reviews.request.types";
import { queryClient } from "@/lib/queryClient";
import { useStore } from "@/store/store";
import { invalidateMultiple } from "@/utils/common.utils";
import Config from "@/Config";
import { useDataTableQuery } from "../useDataTableQuery";

export const useGetReviews = (props: TGetReviewsParams, enabled?: boolean) => {
    const isAuthenticated = useStore((state) => state.isAuthenticated);
    const { limit = Config.LIMIT, product_id, rating, is_hidden } = props;

    const { data, count, ...rest } = useDataTableQuery({
        queryKey: [
            REVIEW_QUERY_KEYS.REVIEWS,
            String(product_id),
            String(rating),
            String(is_hidden),
        ],
        limit,
        enabled: enabled !== false && isAuthenticated,
        queryFn: async (params) => ({
            status: 200,
            data: await GetReviews({
                ...params,
                ...(product_id !== undefined && { product_id }),
                ...(rating !== undefined && { rating }),
                ...(is_hidden !== undefined && { is_hidden }),
            }),
        }),
    });
    return { data, count, ...rest };
};

export const useGetReviewsAnalytics = () => {
    return useQuery({
        queryKey: [REVIEW_QUERY_KEYS.ANALYTICS],
        queryFn: () => GetReviewsAnalytics(),
    });
};

export const useUpdateReviewVisibility = () => {
    return useMutation({
        mutationFn: ({
            id,
            body,
        }: {
            id: number;
            body: TUpdateReviewVisibilityBody;
        }) => UpdateReviewVisibility({ id, body }),
        onSuccess: async () => {
            await invalidateMultiple(queryClient, [
                [REVIEW_QUERY_KEYS.REVIEWS],
                [REVIEW_QUERY_KEYS.ANALYTICS],
            ]);
        },
    });
};
