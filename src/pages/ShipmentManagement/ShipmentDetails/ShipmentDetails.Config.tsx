import { type ShipmentItem } from "@/mock/shipment.mock";
import { type TDataColumnDef } from "@/components/custom/DataTable";

export const shipmentItemColumns: TDataColumnDef<ShipmentItem>[] = [
    {
        id: "productName",
        accessorKey: "productName",
        header: "Product",
        meta: {
            label: "Product",
            cellRenderer: (_value, row) => {
                const item = row.original;
                return (
                    <div className="flex items-center gap-2.5 whitespace-nowrap">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xss font-bold shrink-0 bg-pulse-cream-dark">
                            {item.initials}
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-pulse-green-dark text-xs">
                                {item.productName}
                            </span>
                            <span className="text-xss text-pulse-green leading-tight">
                                {item.sku}
                            </span>
                        </div>
                    </div>
                );
            },
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
        id: "weight",
        accessorKey: "weight",
        header: "Weight (kg)",
        meta: {
            label: "Weight (kg)",
            align: "right",
            cellRenderer: (value) => (
                <span className="text-pulse-green-dark text-xs whitespace-nowrap">
                    {(value as number).toFixed(2)} kg
                </span>
            ),
        },
    },
];
