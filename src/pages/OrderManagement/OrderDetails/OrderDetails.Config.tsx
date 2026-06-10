import type { TOrderItemResponse } from "@/api/services/orders/orders.response.types";
import { type TDataColumnDef } from "@/components/custom/DataTable";
import { getInitialsFromName } from "@/utils/common.utils";

export const orderItemColumns: TDataColumnDef<TOrderItemResponse>[] = [
    {
        id: "product_name",
        accessorKey: "product_name",
        header: "Product",
        meta: {
            label: "Product",
            cellRenderer: (_value, row) => {
                const item = row.original;
                return (
                    <div className="flex items-center gap-2.5 whitespace-nowrap">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xss font-bold shrink-0 bg-pulse-cream-dark">
                            {getInitialsFromName(item.product_name)}
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-pulse-green-dark text-xs">
                                {item.product_name}
                            </span>
                            <span className="text-xss text-pulse-green leading-tight">
                                {item.product_sku}
                            </span>
                        </div>
                    </div>
                );
            },
        },
    },
    {
        id: "product_category",
        accessorKey: "product_category",
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
        id: "quantity",
        accessorKey: "quantity",
        header: "Qty",
        meta: {
            label: "Qty",
            align: "center",
            cellRenderer: (value) => (
                <span className="font-medium text-pulse-green-dark text-xs">
                    {value as number}
                </span>
            ),
        },
    },
    {
        id: "unit_price",
        accessorKey: "unit_price",
        header: "Unit Price",
        meta: {
            label: "Unit Price",
            align: "right",
            cellRenderer: (value) => (
                <span className="text-pulse-green-dark text-xs whitespace-nowrap">
                    ${(value as number).toLocaleString()}
                </span>
            ),
        },
    },
    {
        id: "total_amount",
        accessorKey: "total_amount",
        header: "Line Total",
        meta: {
            label: "Line Total",
            align: "right",
            cellRenderer: (value) => (
                <span className="font-semibold text-pulse-green-dark text-xs whitespace-nowrap">
                    ${(value as number).toLocaleString()}
                </span>
            ),
        },
    },
];
