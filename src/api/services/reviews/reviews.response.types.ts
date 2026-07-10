export type TReviewResponse = {
    id: number;
    product_id: number;
    product_name: string;
    user_id: number;
    customer_name: string;
    rating: number;
    comment: string | null;
    is_hidden: boolean;
    created_at: string;
    updated_at: string | null;
};

export type TGetReviewsResponse = {
    data: TReviewResponse[];
    count: number;
};

export type TUpdateReviewVisibilityResponse = TReviewResponse;

export type TReviewAnalyticsMetric = {
    value: number;
    change_percentage: string;
};

export type TGetReviewsAnalyticsResponse = {
    total_reviews: TReviewAnalyticsMetric;
    total_products_reviewed: TReviewAnalyticsMetric;
    products_with_bad_reviews: TReviewAnalyticsMetric;
    products_with_good_reviews: TReviewAnalyticsMetric;
};
