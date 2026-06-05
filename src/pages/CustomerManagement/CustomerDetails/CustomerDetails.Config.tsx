import { cn } from "@/lib/utils";
import { type TDataColumnDef } from "@/components/custom/DataTable";
import type { TOrderResponse } from "@/api/services/orders/orders.response.types";
import {
    OrderStatusWithHelpers,
    type OrderStatusType,
} from "@/constants/order-status.constants";

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
        accessorKey: "product",
        header: "Product",
        meta: {
            label: "Product",
            cellRenderer: (value) => (
                <span className="text-pulse-green-dark text-xs truncate block max-w-[200px]">
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
        id: "items",
        accessorKey: "items",
        header: "Items",
        meta: {
            label: "Items",
            align: "center",
            cellRenderer: (value) => (
                <span className="font-medium text-pulse-green-dark text-xs">
                    {value as number}
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
        accessorKey: "date",
        header: "Date",
        meta: {
            label: "Date",
            align: "right",
            cellRenderer: (value) => (
                <span className="text-xs text-pulse-green-dark whitespace-nowrap">
                    {value as string}
                </span>
            ),
        },
    },
];
