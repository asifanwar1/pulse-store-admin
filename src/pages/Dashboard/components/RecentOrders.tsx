import {
    recentOrdersData,
    type RecentOrder,
    type OrderStatus,
} from "@/mock/dashboard.mock";
import ChartCard from "../../../components/custom/CustomCards/ChartCard";
import { DataTable, type TDataColumnDef } from "@/components/custom/DataTable";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<
    OrderStatus,
    { label: string; textColor: string; bgColor: string }
> = {
    delivered: {
        label: "Delivered",
        textColor: "text-status-delivered",
        bgColor: "bg-status-delivered-bg",
    },
    shipped: {
        label: "Shipped",
        textColor: "text-status-shipped",
        bgColor: "bg-status-shipped-bg",
    },
    processing: {
        label: "Processing",
        textColor: "text-status-processing",
        bgColor: "bg-status-processing-bg",
    },
    pending: {
        label: "Pending",
        textColor: "text-status-pending",
        bgColor: "bg-status-pending-bg",
    },
    cancelled: {
        label: "Cancelled",
        textColor: "text-status-cancelled",
        bgColor: "bg-status-cancelled-bg",
    },
};

const AVATAR_COLORS = [
    "bg-dash-blue-light text-dash-blue",
    "bg-dash-purple-light text-dash-purple",
    "bg-pulse-green-light text-pulse-green",
    "bg-dash-amber-light text-dash-amber",
    "bg-dash-pink-light text-dash-pink",
    "bg-dash-teal-light text-dash-teal",
    "bg-dash-indigo-light text-dash-indigo",
    "bg-dash-orange-light text-dash-orange",
];

const columns: TDataColumnDef<RecentOrder>[] = [
    {
        id: "id",
        accessorKey: "id",
        header: "Order",
        meta: {
            label: "Order",
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
                const idx = recentOrdersData.findIndex(
                    (o) => o.id === order.id,
                );
                const avatarColor = AVATAR_COLORS[idx % AVATAR_COLORS.length];
                return (
                    <div className="flex items-center gap-2.5 whitespace-nowrap">
                        <div
                            className={cn(
                                "w-7 h-7 rounded-full flex items-center justify-center text-xss font-bold shrink-0",
                                avatarColor,
                            )}
                        >
                            {order.initials}
                        </div>
                        <span className="font-medium text-pulse-green-dark text-xs">
                            {order.customer}
                        </span>
                    </div>
                );
            },
        },
    },
    {
        id: "product",
        accessorKey: "product",
        header: "Product",
        meta: {
            label: "Product",
            truncate: true,
            className: "max-w-[160px]",
            cellRenderer: (value) => (
                <span className="text-pulse-green-dark text-xs truncate block max-w-[160px]">
                    {value as string}
                </span>
            ),
        },
    },
    {
        id: "category",
        accessorKey: "category",
        header: "Category",
        meta: {
            label: "Category",
            cellRenderer: (value) => (
                <span className="text-pulse-green-dark text-xs whitespace-nowrap">
                    {value as string}
                </span>
            ),
        },
    },
    {
        id: "amount",
        accessorKey: "amount",
        header: "Amount",
        meta: {
            label: "Amount",
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
                const status = STATUS_CONFIG[value as OrderStatus];
                return (
                    <span
                        className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-0.5 font-semibold text-xs whitespace-nowrap",
                            status.textColor,
                            status.bgColor,
                        )}
                    >
                        {status.label}
                    </span>
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
            align: "right",
            cellRenderer: (value) => (
                <div className="flex items-center justify-end gap-1 text-xs whitespace-nowrap text-pulse-green-dark">
                    {value as string}
                </div>
            ),
        },
    },
];

export default function RecentOrders() {
    return (
        <ChartCard
            title="Recent Orders"
            subtitle="Latest customer orders across all categories"
            className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card py-1"
            bodyClassName="px-0 py-0"
        >
            <DataTable
                id="recent-orders"
                data={recentOrdersData}
                columns={columns}
                features={{
                    rowSelection: false,
                    pagination: false,
                    sorting: true,
                    filtering: false,
                    columnVisibility: false,
                    globalSearch: false,
                }}
            />
        </ChartCard>
    );
}
