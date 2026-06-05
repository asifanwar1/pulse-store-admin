import { ShoppingCart, Clock, Truck, DollarSign } from "lucide-react";
import { type TDataColumnDef } from "@/components/custom/DataTable";
import { cn } from "@/lib/utils";
import {
    OrderStatusWithHelpers,
    // PAYMENT_METHOD_OPTIONS,
    type OrderStatusType,
} from "@/constants/order-status.constants";
import type { TOrderResponse } from "@/api/services/orders/orders.response.types";
import { getInitialsFromName } from "@/utils/common.utils";
import { getFormattedDate } from "@/utils/dateTime.utils";

export const ORDER_STAT_CONFIG = [
    {
        key: "totalOrders" as const,
        title: "Total Orders",
        icon: <ShoppingCart className="w-5 h-5" />,
        iconBgClass: "bg-pulse-cream-dark",
        iconColorClass: "text-pulse-green",
        subtitle: "All time orders",
    },
    {
        key: "pendingOrders" as const,
        title: "Pending Orders",
        icon: <Clock className="w-5 h-5" />,
        iconBgClass: "bg-pulse-cream-dark",
        iconColorClass: "text-pulse-green",
        subtitle: "Awaiting fulfilment",
    },
    {
        key: "shippedOrders" as const,
        title: "Shipped Orders",
        icon: <Truck className="w-5 h-5" />,
        iconBgClass: "bg-pulse-cream-dark",
        iconColorClass: "text-pulse-green",
        subtitle: "Currently in transit",
    },
    {
        key: "revenue" as const,
        title: "Total Revenue",
        icon: <DollarSign className="w-5 h-5" />,
        iconBgClass: "bg-pulse-cream-dark",
        iconColorClass: "text-pulse-green",
        subtitle: "Gross order revenue",
    },
];

export const orderManagementTableColumns: TDataColumnDef<TOrderResponse>[] = [
    {
        id: "id",
        accessorKey: "id",
        header: "Order ID",
        meta: {
            label: "Order ID",
            cellRenderer: (value) => (
                <span className="font-semibold text-pulse-green-dark whitespace-nowrap text-xs">
                    {value as string}
                </span>
            ),
        },
    },
    {
        id: "user",
        accessorKey: "user",
        header: "Customer",
        meta: {
            label: "Customer",
            cellRenderer: (_value, row) => {
                const order = row.original;
                return (
                    <div className="flex items-center gap-2.5 whitespace-nowrap">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xss font-bold shrink-0 bg-pulse-cream-dark">
                            {getInitialsFromName(order.user.name)}
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-pulse-green-dark text-xs">
                                {order.user.name}
                            </span>
                            <span className="text-xss text-pulse-green leading-tight">
                                {order.user.email}
                            </span>
                        </div>
                    </div>
                );
            },
        },
    },
    {
        id: "created_at",
        accessorKey: "created_at",
        header: "Date",
        meta: {
            label: "Date",
            cellRenderer: (value) => (
                <span className="text-pulse-green-dark text-xs whitespace-nowrap">
                    {getFormattedDate(value as string)}
                </span>
            ),
        },
    },
    {
        id: "items",
        accessorKey: "items",
        header: "Total Items",
        meta: {
            label: "Total Items",
            cellRenderer: (_value, row) => {
                const order = row.original;
                return (
                    <div className="flex items-center gap-2.5 whitespace-nowrap">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xss font-bold shrink-0 bg-pulse-cream-dark">
                            {order.items.length}
                        </div>
                    </div>
                );
            },
        },
    },
    {
        id: "payment_method",
        accessorKey: "payment_method",
        header: "Payment",
        meta: {
            label: "Payment",
            cellRenderer: (value) => (
                <span className="text-pulse-green-dark text-xs whitespace-nowrap">
                    {value as string}
                </span>
            ),
        },
    },
    {
        id: "total_amount",
        accessorKey: "total_amount",
        header: "Total Amount",
        meta: {
            label: "Total Amount",
            align: "right",
            cellRenderer: (value) => (
                <span className="font-semibold text-pulse-green-dark text-xs whitespace-nowrap">
                    ${(value as number).toLocaleString()}
                </span>
            ),
        },
    },
    {
        id: "status",
        accessorKey: "status",
        header: "Status",
        meta: {
            label: "Status",
            align: "center",
            cellRenderer: (value) => {
                return (
                    <span
                        className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-0.5 font-semibold text-xs whitespace-nowrap",
                            OrderStatusWithHelpers.getLabelClass(
                                value as OrderStatusType,
                            ),
                        )}
                    >
                        {OrderStatusWithHelpers.getDisplayTextKey(
                            value as OrderStatusType,
                        )}
                    </span>
                );
            },
        },
    },
];
