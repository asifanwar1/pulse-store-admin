import { useNavigate } from "react-router-dom";
import ChartCard from "@/components/custom/CustomCards/ChartCard";
import { DataTable } from "@/components/custom/DataTable";
import { APP_ROUTES } from "@/routes/appRoutes";
import { getRouteWithId } from "@/utils/common.utils";
import { shipmentManagementTableColumns } from "./ShipmentManagement.Config";
import type { ShipmentTableProps } from "./ShipmentManagement.types";

const ShipmentTable: React.FC<ShipmentTableProps> = ({
    shipmentListData,
    totalCount,
    pageCount,
    page,
    pageSize,
    onPaginationChange,
}) => {
    const navigate = useNavigate();

    return (
        <ChartCard
            title="All Shipments"
            subtitle="Complete shipment history with carrier, tracking and status details"
            className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card py-1"
            bodyClassName="px-0 py-0"
        >
            <DataTable
                id="shipments-list"
                data={shipmentListData}
                columns={shipmentManagementTableColumns}
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
                    onRowClick: (row) =>
                        navigate(
                            getRouteWithId({
                                route: APP_ROUTES.SHIPMENTS_DETAILS,
                                id: row.original.id,
                            }),
                        ),
                    onPaginationChange,
                }}
            />
        </ChartCard>
    );
};

export default ShipmentTable;
