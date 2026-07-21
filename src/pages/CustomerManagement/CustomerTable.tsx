import { useNavigate } from "react-router-dom";
import ChartCard from "@/components/custom/CustomCards/ChartCard";
import { DataTable } from "@/components/custom/DataTable";
import { APP_ROUTES } from "@/routes/appRoutes";
import { getRouteWithId } from "@/utils/common.utils";
import { customerManagementTablecolumns } from "./CustomerManagement.Config";
import type { UsersTableProps } from "./CustomerManagement.types";

const CustomerTable: React.FC<UsersTableProps> = ({
    usersListData,
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
            title="All Customers"
            subtitle="Complete customer directory with spend and activity details"
            className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card py-1"
            bodyClassName="px-0 py-0"
        >
            <DataTable
                id="customers-list"
                data={usersListData}
                columns={customerManagementTablecolumns}
                pageCount={pageCount}
                totalCount={totalCount}
                initialState={{
                    pagination: { pageIndex: page - 1, pageSize },
                }}
                searchPlaceholder="Search customers..."
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
                                route: APP_ROUTES.CUSTOMERS_DETAILS,
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

export default CustomerTable;
