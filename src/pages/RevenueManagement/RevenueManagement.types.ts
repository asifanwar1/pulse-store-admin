import type { TGetRevenuesListResponse } from "@/api/services/revenue/revenue.response.types";

export type RevenueTableProps = {
    revenueListData: TGetRevenuesListResponse["data"];
};
