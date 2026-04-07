import { Users, UserCheck, UserPlus, DollarSign } from "lucide-react";
import { type Customer, type CustomerStatus } from "@/mock/customer.mock";
import { type TDataColumnDef } from "@/components/custom/DataTable";
import { cn } from "@/lib/utils";

export const CUSTOMER_STAT_CONFIG = [
    {
        key: "totalCustomers" as const,
        title: "Total Customers",
        icon: <Users className="w-5 h-5" />,
        iconBgClass: "bg-pulse-cream-dark",
        iconColorClass: "text-pulse-green",
        subtitle: "All registered accounts",
    },
    {
        key: "activeCustomers" as const,
        title: "Active Customers",
        icon: <UserCheck className="w-5 h-5" />,
        iconBgClass: "bg-pulse-cream-dark",
        iconColorClass: "text-pulse-green",
        subtitle: "Ordered in last 90 days",
    },
    {
        key: "newThisMonth" as const,
        title: "New This Month",
        icon: <UserPlus className="w-5 h-5" />,
        iconBgClass: "bg-pulse-cream-dark",
        iconColorClass: "text-pulse-green",
        subtitle: "Joined in April 2026",
    },
    {
        key: "avgLifetimeValue" as const,
        title: "Avg. Lifetime Value",
        icon: <DollarSign className="w-5 h-5" />,
        iconBgClass: "bg-pulse-cream-dark",
        iconColorClass: "text-pulse-green",
        subtitle: "Per customer spend",
    },
] as const;

export const STATUS_CONFIG: Record<
    CustomerStatus,
    { label: string; textColor: string; bgColor: string }
> = {
    active: {
        label: "Active",
        textColor: "text-status-delivered",
        bgColor: "bg-status-delivered-bg",
    },
    inactive: {
        label: "Inactive",
        textColor: "text-status-pending",
        bgColor: "bg-status-pending-bg",
    },
    blocked: {
        label: "Blocked",
        textColor: "text-status-cancelled",
        bgColor: "bg-status-cancelled-bg",
    },
};

export const customerManagementTablecolumns: TDataColumnDef<Customer>[] = [
    {
        id: "id",
        accessorKey: "id",
        header: "ID",
        meta: {
            label: "ID",
            cellRenderer: (value) => (
                <span className="font-semibold text-pulse-green-dark whitespace-nowrap text-xs">
                    {value as string}
                </span>
            ),
        },
    },
    {
        id: "name",
        accessorKey: "name",
        header: "Customer",
        meta: {
            label: "Customer",
            cellRenderer: (_value, row) => {
                const customer = row.original;

                return (
                    <div className="flex items-center gap-2.5 whitespace-nowrap">
                        <div
                            className={cn(
                                "w-7 h-7 rounded-full flex items-center justify-center text-xss font-bold shrink-0",
                                "bg-pulse-cream-dark",
                            )}
                        >
                            {customer.initials}
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
        id: "location",
        accessorKey: "location",
        header: "Location",
        meta: {
            label: "Location",
            cellRenderer: (value) => (
                <span className="text-pulse-green-dark text-xs whitespace-nowrap">
                    {value as string}
                </span>
            ),
        },
    },
    {
        id: "totalOrders",
        accessorKey: "totalOrders",
        header: "Orders",
        meta: {
            label: "Orders",
            align: "center",
            cellRenderer: (value) => (
                <span className="font-medium text-pulse-green-dark text-xs">
                    {(value as number).toLocaleString()}
                </span>
            ),
        },
    },
    {
        id: "totalSpend",
        accessorKey: "totalSpend",
        header: "Total Spend",
        meta: {
            label: "Total Spend",
            align: "right",
            cellRenderer: (value) => (
                <span className="font-semibold text-pulse-green-dark text-xs whitespace-nowrap">
                    ${(value as number).toLocaleString()}
                </span>
            ),
        },
    },
    {
        id: "avgOrderValue",
        accessorKey: "avgOrderValue",
        header: "Avg. Order",
        meta: {
            label: "Avg. Order",
            align: "right",
            cellRenderer: (value) => (
                <span className="font-medium text-pulse-green-dark text-xs whitespace-nowrap">
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
                const status = STATUS_CONFIG[value as CustomerStatus];
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
        id: "lastOrderDate",
        accessorKey: "lastOrderDate",
        header: "Last Order",
        meta: {
            label: "Last Order",
            align: "right",
            cellRenderer: (value) => (
                <span className="text-xs text-pulse-green-dark whitespace-nowrap">
                    {value as string}
                </span>
            ),
        },
    },
];
