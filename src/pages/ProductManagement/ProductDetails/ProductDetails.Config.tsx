import type { ProductReview, ProductSalesTrend } from "@/mock/product.mock";
import { cn } from "@/lib/utils";
import { type TDataColumnDef } from "@/components/custom/DataTable";
import { Star } from "lucide-react";

export const productSalesTrendColumns: TDataColumnDef<ProductSalesTrend>[] = [
    {
        id: "month",
        accessorKey: "month",
        header: "Month",
        meta: {
            label: "Month",
            cellRenderer: (value) => (
                <span className="font-medium text-pulse-green-dark text-xs whitespace-nowrap">
                    {value as string}
                </span>
            ),
        },
    },
    {
        id: "sales",
        accessorKey: "sales",
        header: "Units Sold",
        meta: {
            label: "Units Sold",
            align: "center",
            cellRenderer: (value) => (
                <span className="font-medium text-pulse-green-dark text-xs">
                    {(value as number).toLocaleString()}
                </span>
            ),
        },
    },
    {
        id: "revenue",
        accessorKey: "revenue",
        header: "Revenue",
        meta: {
            label: "Revenue",
            align: "right",
            cellRenderer: (value) => (
                <span className="font-semibold text-pulse-green-dark text-xs whitespace-nowrap">
                    ${(value as number).toLocaleString()}
                </span>
            ),
        },
    },
];

export const productReviewColumns: TDataColumnDef<ProductReview>[] = [
    {
        id: "customer",
        accessorKey: "customer",
        header: "Customer",
        meta: {
            label: "Customer",
            cellRenderer: (_value, row) => {
                const review = row.original;
                return (
                    <div className="flex items-center gap-2.5 whitespace-nowrap">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xss font-bold shrink-0 bg-pulse-cream-dark">
                            {review.initials}
                        </div>
                        <span className="font-medium text-pulse-green-dark text-xs">
                            {review.customer}
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
                    <div className="flex items-center gap-1">
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
                        <span className="text-xs text-pulse-green ml-1">
                            {rating}.0
                        </span>
                    </div>
                );
            },
        },
    },
    {
        id: "comment",
        accessorKey: "comment",
        header: "Review",
        meta: {
            label: "Review",
            cellRenderer: (value) => (
                <span className="text-pulse-green-dark text-xs truncate block max-w-[320px]">
                    {value as string}
                </span>
            ),
        },
    },
    {
        id: "date",
        accessorKey: "date",
        header: "Date",
        meta: {
            label: "Date",
            align: "right",
            cellRenderer: (value) => (
                <span className="text-xs text-pulse-green-dark whitespace-nowrap">
                    {value as string}
                </span>
            ),
        },
    },
];
