import { Package, Truck, CheckCircle } from "lucide-react";
import { type TDataColumnDef } from "@/components/custom/DataTable";
import { getInitialsFromName } from "@/utils/common.utils";
import type { TRevenueListItem } from "@/api/services/revenue/revenue.response.types";
import {
    PaymentMethodsWithHelpers,
    type PaymentMethodsType,
} from "@/constants/payment-method.constant";

export const REVENUE_STAT_CONFIG = [
    {
        key: "completedOrders" as const,
        title: "Completed Orders",
        icon: <Package className="w-5 h-5" />,
        iconBgClass: "bg-pulse-cream-dark",
        iconColorClass: "text-pulse-green",
        subtitle: "All Completed Orders",
    },
    {
        key: "totalRevenue" as const,
        title: "Total Revenue",
        icon: <Truck className="w-5 h-5" />,
        iconBgClass: "bg-pulse-cream-dark",
        iconColorClass: "text-pulse-green",
        subtitle: "Total calculated revenue",
    },
    {
        key: "totalProfit" as const,
        title: "Total Profit",
        icon: <CheckCircle className="w-5 h-5" />,
        iconBgClass: "bg-pulse-cream-dark",
        iconColorClass: "text-pulse-green",
        subtitle: "Total calculated profit",
    },
] as const;

export const revenueManagementTableColumns: TDataColumnDef<TRevenueListItem>[] =
    [
        {
            id: "id",
            accessorKey: "id",
            header: "Shipment ID",
            meta: {
                label: "Shipment ID",
                cellRenderer: (value) => (
                    <span className="font-semibold text-pulse-green-dark whitespace-nowrap text-xs">
                        {value as string}
                    </span>
                ),
            },
        },
        {
            id: "completed_order.customer",
            accessorKey: "completed_order.customer",
            header: "Customer",
            meta: {
                label: "Customer",
                cellRenderer: (_value, row) => {
                    const customer = row.original.completed_order.customer;
                    return (
                        <div className="flex items-center gap-2.5 whitespace-nowrap">
                            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xss font-bold shrink-0 bg-pulse-cream-dark">
                                {getInitialsFromName(customer.name)}
                            </div>
                            <div className="flex flex-col">
                                <span className="font-medium text-pulse-green-dark text-xs">
                                    {customer.name}
                                </span>
                                <span className="text-xss text-pulse-green leading-tight">
                                    {customer.email}
                                </span>
                            </div>
                        </div>
                    );
                },
            },
        },
        {
            id: "completed_order.totalOrderedItems",
            accessorKey: "completed_order.totalOrderedItems",
            header: "Ordered Items",
            meta: {
                label: "Ordered Items",
                cellRenderer: (value) => (
                    <span className="text-pulse-green-dark text-xs whitespace-nowrap">
                        {value as string}
                    </span>
                ),
            },
        },
        {
            id: "revenue_amount",
            accessorKey: "revenue_amount",
            header: "Revenue Amount",
            meta: {
                label: "Revenue Amount",
                cellRenderer: (value) => (
                    <span className="text-pulse-green-dark text-xs whitespace-nowrap">
                        {value as string}
                    </span>
                ),
            },
        },
        {
            id: "profit",
            accessorKey: "profit",
            header: "Profit",
            meta: {
                label: "Profit",
                cellRenderer: (value) => (
                    <span className="text-pulse-green-dark text-xs font-mono whitespace-nowrap">
                        {value as string}
                    </span>
                ),
            },
        },
        {
            id: "completed_order.payment_method",
            accessorKey: "completed_order.payment_method",
            header: "Payment Method",
            meta: {
                label: "Payment Method",
                cellRenderer: (value) => (
                    <span className="text-pulse-green-dark text-xs font-mono whitespace-nowrap">
                        {PaymentMethodsWithHelpers.getDisplayTextKey(
                            value as PaymentMethodsType,
                        )}
                    </span>
                ),
            },
        },
    ];
