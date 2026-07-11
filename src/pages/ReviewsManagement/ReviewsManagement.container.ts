import { useState } from "react";
import { useQueryState } from "nuqs";

import Config from "@/Config";
import {
    useGetReviews,
    useGetReviewsAnalytics,
    useUpdateReviewVisibility,
} from "@/hooks/api/reviews.queries";
import { useGetProductsPaginated } from "@/hooks/api/products.queries";
import type { TReviewResponse } from "@/api/services/reviews/reviews.response.types";
import type { FilterItem } from "@/components/custom/FilterBar";
import { showToast } from "@/lib/toast";

const RATING_FILTER_OPTIONS = [
    { value: "5", label: "5 Stars" },
    { value: "4", label: "4 Stars" },
    { value: "3", label: "3 Stars" },
    { value: "2", label: "2 Stars" },
    { value: "1", label: "1 Star" },
];

const VISIBILITY_FILTER_OPTIONS = [
    { value: "false", label: "Visible" },
    { value: "true", label: "Hidden" },
];

export const useReviewsManagement = () => {
    const [pageSize, setPageSize] = useQueryState("pageSize", {
        defaultValue: Config.LIMIT,
        parse: Number,
        serialize: String,
    });

    const [productId, setProductId] = useState<number | null>(null);
    const [rating, setRating] = useState<number | null>(null);
    const [isHidden, setIsHidden] = useState<boolean | null>(null);
    const [togglingReviewId, setTogglingReviewId] = useState<number | null>(
        null,
    );

    const {
        data: reviews,
        count: reviewsTotalCount,
        isPending: isReviewsDataLoading,
        page,
        setPage,
    } = useGetReviews({
        page: 1,
        limit: pageSize,
        product_id: productId ?? undefined,
        rating: rating ?? undefined,
        is_hidden: isHidden ?? undefined,
    });

    const {
        data: reviewsAnalyticsData,
        isPending: isReviewsAnalyticsLoading,
    } = useGetReviewsAnalytics();

    const {
        data: products = [],
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useGetProductsPaginated({ limit: 20 });

    const productOptions = products.map((product) => ({
        label: product.name,
        value: String(product.id),
    }));

    const { mutateAsync: updateReviewVisibility } =
        useUpdateReviewVisibility();

    const isReviewsLoading = isReviewsDataLoading || isReviewsAnalyticsLoading;

    const handleToggleVisibility = async (review: TReviewResponse) => {
        setTogglingReviewId(review.id);
        try {
            await updateReviewVisibility({
                id: review.id,
                body: { is_hidden: !review.is_hidden },
            });
            showToast.success(
                review.is_hidden
                    ? "Review is now visible to customers"
                    : "Review hidden from customers",
            );
        } catch (error) {
            console.error("Failed to update review visibility:", error);
            showToast.error("Failed to update review visibility");
        } finally {
            setTogglingReviewId(null);
        }
    };

    const filterItems: FilterItem[] = [
        {
            type: "select",
            key: "product",
            placeholder: "All Products",
            value: productId
                ? productOptions.find(
                      (opt) => opt.value === String(productId),
                  ) ?? null
                : null,
            options: productOptions,
            onChange: (value) =>
                setProductId(
                    value && !Array.isArray(value)
                        ? Number(value.value)
                        : null,
                ),
            clearable: true,
            autoComplete: true,
            hasMore: hasNextPage,
            isFetchingNextPage,
            onScroll: () => fetchNextPage(),
        },
        {
            type: "select",
            key: "rating",
            placeholder: "All Ratings",
            value: rating
                ? RATING_FILTER_OPTIONS.find(
                      (opt) => opt.value === String(rating),
                  ) ?? null
                : null,
            options: RATING_FILTER_OPTIONS,
            onChange: (value) =>
                setRating(
                    value && !Array.isArray(value)
                        ? Number(value.value)
                        : null,
                ),
            clearable: true,
        },
        {
            type: "select",
            key: "visibility",
            placeholder: "All Statuses",
            value:
                isHidden === null
                    ? null
                    : VISIBILITY_FILTER_OPTIONS.find(
                          (opt) => opt.value === String(isHidden),
                      ) ?? null,
            options: VISIBILITY_FILTER_OPTIONS,
            onChange: (value) =>
                setIsHidden(
                    value && !Array.isArray(value)
                        ? value.value === "true"
                        : null,
                ),
            clearable: true,
        },
    ];

    return {
        reviews: reviews ?? [],
        reviewsTotalCount: reviewsTotalCount ?? 0,
        reviewsAnalyticsData,
        isReviewsLoading,
        togglingReviewId,
        page,
        pageSize,
        filterItems,
        setPage,
        setPageSize,
        handleToggleVisibility,
    };
};
