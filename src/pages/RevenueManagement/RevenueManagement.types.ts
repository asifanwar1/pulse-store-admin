import type { TGetRevenuesListResponse } from "@/api/services/revenue/revenue.response.types";

export type RevenueTableProps = {
    revenueListData: TGetRevenuesListResponse["data"];
    totalCount?: number;
    pageCount: number;
    page: number;
    pageSize: number;
    onSearch: (value: string) => void;
    onPaginationChange: (pagination: {
        pageIndex: number;
        pageSize: number;
    }) => void;
};
