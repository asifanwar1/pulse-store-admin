import type { TReviewResponse } from "@/api/services/reviews/reviews.response.types";

export type ReviewsTableProps = {
    reviewsListData: TReviewResponse[];
    togglingReviewId: number | null;
    onToggleVisibility: (review: TReviewResponse) => void;
};
