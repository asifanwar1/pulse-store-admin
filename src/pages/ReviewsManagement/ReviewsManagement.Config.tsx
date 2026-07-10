import { MessageSquareText, Boxes, ThumbsDown, ThumbsUp, Star, Eye, EyeOff } from "lucide-react";

import type { TReviewResponse } from "@/api/services/reviews/reviews.response.types";
import { type TDataColumnDef } from "@/components/custom/DataTable";
import { cn } from "@/lib/utils";
import { getInitialsFromName } from "@/utils/common.utils";
import { getFormattedDate } from "@/utils/dateTime.utils";
import { ReviewVisibilityWithHelpers } from "@/constants/review-visibility.constants";

export const REVIEW_STAT_CONFIG = [
    {
        key: "total_reviews" as const,
        title: "Total Reviews",
        icon: <MessageSquareText className="w-5 h-5" />,
        iconBgClass: "bg-pulse-cream-dark",
        iconColorClass: "text-pulse-green",
        subtitle: "All time reviews",
    },
    {
        key: "total_products_reviewed" as const,
        title: "Products Reviewed",
        icon: <Boxes className="w-5 h-5" />,
        iconBgClass: "bg-pulse-cream-dark",
        iconColorClass: "text-pulse-green",
        subtitle: "Products with feedback",
    },
    {
        key: "products_with_good_reviews" as const,
        title: "Well Rated Products",
        icon: <ThumbsUp className="w-5 h-5" />,
        iconBgClass: "bg-pulse-cream-dark",
        iconColorClass: "text-pulse-green",
        subtitle: "Average rating above 3",
    },
    {
        key: "products_with_bad_reviews" as const,
        title: "Poorly Rated Products",
        icon: <ThumbsDown className="w-5 h-5" />,
        iconBgClass: "bg-pulse-cream-dark",
        iconColorClass: "text-pulse-green",
        subtitle: "Average rating 3 or below",
    },
] as const;

type ReviewsTableColumnsParams = {
    togglingReviewId: number | null;
    onToggleVisibility: (review: TReviewResponse) => void;
};

export const getReviewsManagementTableColumns = ({
    togglingReviewId,
    onToggleVisibility,
}: ReviewsTableColumnsParams): TDataColumnDef<TReviewResponse>[] => [
    {
        id: "id",
        accessorKey: "id",
        header: "ID",
        meta: {
            label: "ID",
            cellRenderer: (value) => (
                <span className="font-semibold text-pulse-green-dark whitespace-nowrap text-xs">
                    {value as string}
                </span>
            ),
        },
    },
    {
        id: "product_name",
        accessorKey: "product_name",
        header: "Product",
        meta: {
            label: "Product",
            cellRenderer: (_value, row) => {
                const review = row.original;
                return (
                    <div className="flex items-center gap-2.5 whitespace-nowrap">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xss font-bold shrink-0 bg-pulse-cream-dark">
                            {getInitialsFromName(review.product_name)}
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-pulse-green-dark text-xs">
                                {review.product_name}
                            </span>
                            <span className="text-xss text-pulse-green leading-tight">
                                ID: #{review.product_id}
                            </span>
                        </div>
                    </div>
                );
            },
        },
    },
    {
        id: "customer_name",
        accessorKey: "customer_name",
        header: "Customer",
        meta: {
            label: "Customer",
            cellRenderer: (_value, row) => {
                const review = row.original;
                return (
                    <div className="flex items-center gap-2.5 whitespace-nowrap">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xss font-bold shrink-0 bg-pulse-cream-dark">
                            {getInitialsFromName(review.customer_name)}
                        </div>
                        <span className="font-medium text-pulse-green-dark text-xs">
                            {review.customer_name}
                        </span>
                    </div>
                );
            },
        },
    },
    {
        id: "rating",
        accessorKey: "rating",
        header: "Rating",
        meta: {
            label: "Rating",
            cellRenderer: (value) => {
                const rating = value as number;
                return (
                    <div className="flex items-center gap-1 whitespace-nowrap">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                className={cn(
                                    "w-3 h-3",
                                    i < rating
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-pulse-cream-dark fill-pulse-cream-dark",
                                )}
                            />
                        ))}
                    </div>
                );
            },
        },
    },
    {
        id: "comment",
        accessorKey: "comment",
        header: "Comment",
        meta: {
            label: "Comment",
            cellRenderer: (value) => {
                const comment = value as string | null;
                return (
                    <span
                        title={comment ?? undefined}
                        className={cn(
                            "block max-w-xs truncate text-xs text-pulse-green-dark",
                            !comment && "italic text-pulse-green/70",
                        )}
                    >
                        {comment || "No comment provided"}
                    </span>
                );
            },
        },
    },
    {
        id: "created_at",
        accessorKey: "created_at",
        header: "Date",
        meta: {
            label: "Date",
            cellRenderer: (value) => (
                <span className="text-pulse-green-dark text-xs whitespace-nowrap">
                    {getFormattedDate(value as string)}
                </span>
            ),
        },
    },
    {
        id: "is_hidden",
        accessorKey: "is_hidden",
        header: "Visibility",
        meta: {
            label: "Visibility",
            align: "center",
            cellRenderer: (_value, row) => {
                const review = row.original;
                const isToggling = togglingReviewId === review.id;
                const visibilityKey = review.is_hidden ? "HIDDEN" : "VISIBLE";

                return (
                    <div className="flex items-center justify-center gap-2 whitespace-nowrap">
                        <span
                            className={cn(
                                "inline-flex items-center rounded-full px-2.5 py-0.5 font-semibold text-xs",
                                ReviewVisibilityWithHelpers.getLabelClass(
                                    visibilityKey,
                                ),
                            )}
                        >
                            {ReviewVisibilityWithHelpers.getDisplayTextKey(
                                visibilityKey,
                            )}
                        </span>
                        <button
                            type="button"
                            onClick={() => onToggleVisibility(review)}
                            disabled={isToggling}
                            className={cn(
                                "rounded-full p-1.5 transition-colors hover:bg-white disabled:opacity-50",
                                review.is_hidden
                                    ? "text-gray-400 hover:text-pulse-green-dark"
                                    : "text-pulse-green hover:text-pulse-green-dark",
                            )}
                            aria-label={
                                review.is_hidden
                                    ? `Show review from ${review.customer_name}`
                                    : `Hide review from ${review.customer_name}`
                            }
                            title={review.is_hidden ? "Show review" : "Hide review"}
                        >
                            {review.is_hidden ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                );
            },
        },
    },
];
