import { useNavigate } from "react-router-dom";
import ChartCard from "@/components/custom/CustomCards/ChartCard";
import { DataTable } from "@/components/custom/DataTable";
import { APP_ROUTES } from "@/routes/appRoutes";
import { getRouteWithId } from "@/utils/common.utils";
import { customerManagementTablecolumns } from "./CustomerManagement.Config";
import type { UsersTableProps } from "./CustomerManagement.types";

const CustomerTable: React.FC<UsersTableProps> = ({ usersListData }) => {
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
                features={{
                    rowSelection: false,
                    pagination: true,
                    sorting: true,
                    filtering: false,
                    columnVisibility: false,
                    globalSearch: false,
                }}
                callbacks={{
                    onRowClick: (row) =>
                        navigate(
                            getRouteWithId({
                                route: APP_ROUTES.CUSTOMERS_DETAILS,
                                id: row.original.id,
                            }),
                        ),
                }}
            />
        </ChartCard>
    );
};

export default CustomerTable;
