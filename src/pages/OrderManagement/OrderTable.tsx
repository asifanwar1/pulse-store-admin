import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { ordersListData } from "@/mock/order.mock";
import ChartCard from "@/components/custom/CustomCards/ChartCard";
import { DataTable } from "@/components/custom/DataTable";
import { APP_ROUTES } from "@/routes/appRoutes";
import { getRouteWithId } from "@/utils/common.utils";
import Button from "@/components/custom/CustomButton/CustomButton";
import { orderManagementTableColumns } from "./OrderManagement.Config";

export default function OrderTable() {
    const navigate = useNavigate();

    return (
        <ChartCard
            title="All Orders"
            subtitle="Complete order history with customer, payment and status details"
            className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card py-1"
            bodyClassName="px-0 py-0"
            action={
                <Button
                    size="sm"
                    onClick={() => navigate(APP_ROUTES.ORDERS_CREATE)}
                >
                    <Plus className="w-4 h-4" />
                    Create Order
                </Button>
            }
        >
            <DataTable
                id="orders-list"
                data={ordersListData}
                columns={orderManagementTableColumns}
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
                                route: APP_ROUTES.ORDERS_DETAILS,
                                id: row.original.id,
                            }),
                        ),
                }}
            />
        </ChartCard>
    );
}
