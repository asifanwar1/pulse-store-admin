import { cn } from "@/lib/utils";
import { type TDataColumnDef } from "@/components/custom/DataTable";
import type { TOrderResponse } from "@/api/services/orders/orders.response.types";
import {
    OrderStatusWithHelpers,
    type OrderStatusType,
} from "@/constants/order-status.constants";
import { getFormattedDate } from "@/utils/dateTime.utils";

export const customerOrderColumns: TDataColumnDef<TOrderResponse>[] = [
    {
        id: "id",
        accessorKey: "id",
        header: "Order",
        meta: {
            label: "Order",
            cellRenderer: (value) => (
                <span className="font-semibold text-pulse-green-dark text-xs whitespace-nowrap">
                    {value as string}
                </span>
            ),
        },
    },
    {
        id: "product",
        accessorKey: "items",
        header: "Product",
        meta: {
            label: "Product",
            cellRenderer: (_value, row) => {
                const items = row.original.items ?? [];
                const firstItem = items[0];
                return (
                    <span className="text-pulse-green-dark text-xs truncate block max-w-[200px]">
                        {firstItem
                            ? `${firstItem.product_name}${
                                  items.length > 1
                                      ? ` +${items.length - 1} more`
                                      : ""
                              }`
                            : "-"}
                    </span>
                );
            },
        },
    },
    {
        id: "category",
        accessorKey: "items",
        header: "Category",
        meta: {
            label: "Category",
            cellRenderer: (_value, row) => (
                <span className="text-pulse-green-dark text-xs whitespace-nowrap">
                    {row.original.items?.[0]?.product_category ?? "-"}
                </span>
            ),
        },
    },
    {
        id: "items",
        accessorKey: "items",
        header: "Items",
        meta: {
            label: "Items",
            align: "center",
            cellRenderer: (_value, row) => (
                <span className="font-medium text-pulse-green-dark text-xs">
                    {row.original.items?.length ?? 0}
                </span>
            ),
        },
    },
    {
        id: "amount",
        accessorKey: "total_amount",
        header: "Amount",
        meta: {
            label: "Amount",
            align: "right",
            cellRenderer: (value) => (
                <span className="font-semibold text-pulse-green-dark text-xs whitespace-nowrap">
                    ${Number(value ?? 0).toLocaleString()}
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
    {
        id: "date",
        accessorKey: "created_at",
        header: "Date",
        meta: {
            label: "Date",
            align: "right",
            cellRenderer: (value) => (
                <span className="text-xs text-pulse-green-dark whitespace-nowrap">
                    {getFormattedDate(value as string)}
                </span>
            ),
        },
    },
];
