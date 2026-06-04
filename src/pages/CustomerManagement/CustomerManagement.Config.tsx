import { Users, UserCheck, UserPlus, DollarSign } from "lucide-react";
import { type TDataColumnDef } from "@/components/custom/DataTable";
import { cn } from "@/lib/utils";
import type { TUserResponse } from "@/api/services/users/users.response.types";
import { getInitialsFromName } from "@/utils/common.utils";
import type { UserStatusType } from "@/constants/user-status.constants";
import { UserStatusWithHelpers } from "@/constants/user-status.constants";
import { getFormattedDate } from "@/utils/dateTime.utils";

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
        subtitle: "Ordered in last 30 days",
    },
    {
        key: "InactiveCustomer" as const,
        title: "Inactive Customers",
        icon: <UserPlus className="w-5 h-5" />,
        iconBgClass: "bg-pulse-cream-dark",
        iconColorClass: "text-pulse-green",
        subtitle: "Not ordered in last 30 days",
    },
    {
        key: "blockedCustomer" as const,
        title: "Blocked Customers",
        icon: <DollarSign className="w-5 h-5" />,
        iconBgClass: "bg-pulse-cream-dark",
        iconColorClass: "text-pulse-green",
        subtitle: "Blocked by admin",
    },
] as const;

export const customerManagementTablecolumns: TDataColumnDef<TUserResponse>[] = [
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
        id: "fullName",
        accessorKey: "fullName",
        header: "Customer Name",
        meta: {
            label: "Customer Name",
            cellRenderer: (_value, row) => {
                const customer = row.original;
                const initials = getInitialsFromName(customer.fullName!);

                return (
                    <div className="flex items-center gap-2.5 whitespace-nowrap">
                        <div
                            className={cn(
                                "w-7 h-7 rounded-full flex items-center justify-center text-xss font-bold shrink-0",
                                "bg-pulse-cream-dark",
                            )}
                        >
                            {initials}
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-pulse-green-dark text-xs">
                                {customer.fullName}
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
        id: "address.city",
        accessorKey: "address.city",
        header: "City",
        meta: {
            label: "City",
            cellRenderer: (value) => (
                <span className="text-pulse-green-dark text-xs whitespace-nowrap">
                    {(value as string) || "-"}
                </span>
            ),
        },
    },
    {
        id: "total_orders",
        accessorKey: "total_orders",
        header: "Total Orders",
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
                            UserStatusWithHelpers.getLabelClass(
                                value as UserStatusType,
                            ),
                        )}
                    >
                        {UserStatusWithHelpers.getDisplayTextKey(
                            value as UserStatusType,
                        )}
                    </span>
                );
            },
        },
    },
    {
        id: "last_order",
        accessorKey: "last_order",
        header: "Last Order",
        meta: {
            label: "Last Order",
            align: "right",
            cellRenderer: (value) => (
                <span className="text-xs text-pulse-green-dark whitespace-nowrap">
                    {getFormattedDate(value as string)}
                </span>
            ),
        },
    },
];
