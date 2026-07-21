import { useNavigate } from "react-router-dom";
import ChartCard from "@/components/custom/CustomCards/ChartCard";
import { DataTable } from "@/components/custom/DataTable";
import { APP_ROUTES } from "@/routes/appRoutes";
import { getRouteWithId } from "@/utils/common.utils";
import type { RevenueTableProps } from "./RevenueManagement.types";
import { revenueManagementTableColumns } from "./RevenueManagement.Config";

const RevenueTable: React.FC<RevenueTableProps> = ({
    revenueListData,
    totalCount,
    pageCount,
    page,
    pageSize,
    onSearch,
    onPaginationChange,
}) => {
    const navigate = useNavigate();

    return (
        <ChartCard
            title="All Revenue"
            subtitle="Complete revenue history with details"
            className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card py-1"
            bodyClassName="px-0 py-0"
        >
            <DataTable
                id="revenue-list"
                data={revenueListData}
                columns={revenueManagementTableColumns}
                pageCount={pageCount}
                totalCount={totalCount}
                initialState={{
                    pagination: { pageIndex: page - 1, pageSize },
                }}
                searchPlaceholder="Search revenue..."
                features={{
                    rowSelection: false,
                    pagination: true,
                    sorting: true,
                    filtering: false,
                    columnVisibility: false,
                    globalSearch: true,
                }}
                callbacks={{
                    onRowClick: (row) =>
                        navigate(
                            getRouteWithId({
                                route: APP_ROUTES.REVENUE_DETAILS,
                                id: row.original.id,
                            }),
                        ),
                    onGlobalSearch: onSearch,
                    onPaginationChange,
                }}
            />
        </ChartCard>
    );
};

export default RevenueTable;
