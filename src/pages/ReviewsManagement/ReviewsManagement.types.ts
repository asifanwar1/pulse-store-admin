import type { TReviewResponse } from "@/api/services/reviews/reviews.response.types";

export type ReviewsTableProps = {
    reviewsListData: TReviewResponse[];
    togglingReviewId: number | null;
    totalCount?: number;
    pageCount: number;
    page: number;
    pageSize: number;
    onToggleVisibility: (review: TReviewResponse) => void;
    onPaginationChange: (pagination: {
        pageIndex: number;
        pageSize: number;
    }) => void;
};
