import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { shipmentsListData } from "@/mock/shipment.mock";
import ChartCard from "@/components/custom/CustomCards/ChartCard";
import { DataTable } from "@/components/custom/DataTable";
import { APP_ROUTES } from "@/routes/appRoutes";
import { getRouteWithId } from "@/utils/common.utils";
import Button from "@/components/custom/CustomButton/CustomButton";
import { shipmentManagementTableColumns } from "./ShipmentManagement.Config";

export default function ShipmentTable() {
    const navigate = useNavigate();

    return (
        <ChartCard
            title="All Shipments"
            subtitle="Complete shipment history with carrier, tracking and status details"
            className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card py-1"
            bodyClassName="px-0 py-0"
            action={
                <Button
                    size="sm"
                    onClick={() => navigate(APP_ROUTES.SHIPMENTS_CREATE)}
                >
                    <Plus className="w-4 h-4" />
                    Create Shipment
                </Button>
            }
        >
            <DataTable
                id="shipments-list"
                data={shipmentsListData}
                columns={shipmentManagementTableColumns}
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
                }}
            />
        </ChartCard>
    );
}
