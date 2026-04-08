import {
    ShoppingCart,
    Clock,
    Truck,
    DollarSign,
} from "lucide-react";
import { type Order, type OrderStatus } from "@/mock/order.mock";
import { type TDataColumnDef } from "@/components/custom/DataTable";
import { cn } from "@/lib/utils";
import { PAYMENT_METHOD_OPTIONS } from "@/constants/order-status.constants";

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
] as const;

export const ORDER_STATUS_CONFIG: Record<
    OrderStatus,
    { label: string; textColor: string; bgColor: string }
> = {
    delivered: {
        label: "Delivered",
        textColor: "text-status-delivered",
        bgColor: "bg-status-delivered-bg",
    },
    pending: {
        label: "Pending",
        textColor: "text-status-pending",
        bgColor: "bg-status-pending-bg",
    },
    processing: {
        label: "Processing",
        textColor: "text-status-processing",
        bgColor: "bg-status-processing-bg",
    },
    shipped: {
        label: "Shipped",
        textColor: "text-status-shipped",
        bgColor: "bg-status-shipped-bg",
    },
    cancelled: {
        label: "Cancelled",
        textColor: "text-status-cancelled",
        bgColor: "bg-status-cancelled-bg",
    },
};

const paymentLabelMap = Object.fromEntries(
    PAYMENT_METHOD_OPTIONS.map((o) => [o.value, o.label]),
);

export const orderManagementTableColumns: TDataColumnDef<Order>[] = [
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
        id: "customer",
        accessorKey: "customer",
        header: "Customer",
        meta: {
            label: "Customer",
            cellRenderer: (_value, row) => {
                const order = row.original;
                return (
                    <div className="flex items-center gap-2.5 whitespace-nowrap">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xss font-bold shrink-0 bg-pulse-cream-dark">
                            {order.initials}
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-pulse-green-dark text-xs">
                                {order.customer}
                            </span>
                            <span className="text-xss text-pulse-green leading-tight">
                                {order.email}
                            </span>
                        </div>
                    </div>
                );
            },
        },
    },
    {
        id: "date",
        accessorKey: "date",
        header: "Date",
        meta: {
            label: "Date",
            cellRenderer: (value) => (
                <span className="text-pulse-green-dark text-xs whitespace-nowrap">
                    {value as string}
                </span>
            ),
        },
    },
    {
        id: "itemCount",
        accessorKey: "itemCount",
        header: "Items",
        meta: {
            label: "Items",
            align: "center",
            cellRenderer: (value) => (
                <span className="text-pulse-green-dark text-xs font-medium">
                    {value as number}
                </span>
            ),
        },
    },
    {
        id: "paymentMethod",
        accessorKey: "paymentMethod",
        header: "Payment",
        meta: {
            label: "Payment",
            cellRenderer: (value) => (
                <span className="text-pulse-green-dark text-xs whitespace-nowrap">
                    {paymentLabelMap[value as string] ?? (value as string)}
                </span>
            ),
        },
    },
    {
        id: "total",
        accessorKey: "total",
        header: "Total",
        meta: {
            label: "Total",
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
                const cfg = ORDER_STATUS_CONFIG[value as OrderStatus];
                return (
                    <span
                        className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-0.5 font-semibold text-xs whitespace-nowrap",
                            cfg.textColor,
                            cfg.bgColor,
                        )}
                    >
                        {cfg.label}
                    </span>
                );
            },
        },
    },
];
