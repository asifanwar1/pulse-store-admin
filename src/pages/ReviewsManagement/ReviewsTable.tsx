import ChartCard from "@/components/custom/CustomCards/ChartCard";
import { DataTable } from "@/components/custom/DataTable";
import { getReviewsManagementTableColumns } from "./ReviewsManagement.Config";
import type { ReviewsTableProps } from "./ReviewsManagement.types";

const ReviewsTable: React.FC<ReviewsTableProps> = ({
    reviewsListData,
    togglingReviewId,
    totalCount,
    pageCount,
    page,
    pageSize,
    onToggleVisibility,
    onPaginationChange,
}) => {
    return (
        <ChartCard
            title="All Reviews"
            subtitle="Customer feedback across products with rating and visibility details"
            className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card py-1"
            bodyClassName="px-0 py-0"
        >
            <DataTable
                id="reviews-list"
                data={reviewsListData}
                columns={getReviewsManagementTableColumns({
                    togglingReviewId,
                    onToggleVisibility,
                })}
                pageCount={pageCount}
                totalCount={totalCount}
                initialState={{
                    pagination: { pageIndex: page - 1, pageSize },
                }}
                features={{
                    rowSelection: false,
                    pagination: true,
                    sorting: true,
                    filtering: false,
                    columnVisibility: false,
                    globalSearch: false,
                }}
                callbacks={{
                    onPaginationChange,
                }}
            />
        </ChartCard>
    );
};

export default ReviewsTable;
