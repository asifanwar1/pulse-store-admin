import { Package, PackageCheck, PackageX, DollarSign } from "lucide-react";
import type { TProductResponse } from "@/api/services/products/products.response";
import { type TDataColumnDef } from "@/components/custom/DataTable";
import { cn } from "@/lib/utils";
import {
    ProductStatusWithHelpers,
    type ProductStatusType,
} from "@/constants/product-status.constants";

export const PRODUCT_STAT_CONFIG = [
    {
        key: "totalProducts" as const,
        title: "Total Products",
        icon: <Package className="w-5 h-5" />,
        iconBgClass: "bg-pulse-cream-dark",
        iconColorClass: "text-pulse-green",
        subtitle: "All listed products",
    },
    {
        key: "activeProducts" as const,
        title: "Active Products",
        icon: <PackageCheck className="w-5 h-5" />,
        iconBgClass: "bg-pulse-cream-dark",
        iconColorClass: "text-pulse-green",
        subtitle: "Currently on sale",
    },
    {
        key: "outOfStock" as const,
        title: "Out of Stock",
        icon: <PackageX className="w-5 h-5" />,
        iconBgClass: "bg-pulse-cream-dark",
        iconColorClass: "text-pulse-green",
        subtitle: "Needs restocking",
    },
    {
        key: "avgPrice" as const,
        title: "Avg. Price",
        icon: <DollarSign className="w-5 h-5" />,
        iconBgClass: "bg-pulse-cream-dark",
        iconColorClass: "text-pulse-green",
        subtitle: "Across all products",
    },
] as const;

export const productManagementTableColumns: TDataColumnDef<TProductResponse>[] =
    [
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
            header: "Product",
            meta: {
                label: "Product",
                cellRenderer: (_value, row) => {
                    const product = row.original;
                    const initials = product.name
                        .split(" ")
                        .slice(0, 2)
                        .map((w) => w[0])
                        .join("")
                        .toUpperCase();

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
                                    {product.name}
                                </span>
                                <span className="text-xss text-pulse-green leading-tight">
                                    {product.sku}
                                </span>
                            </div>
                        </div>
                    );
                },
            },
        },
        {
            id: "category_name",
            accessorKey: "category_name",
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
            id: "brand",
            accessorKey: "brand",
            header: "Brand",
            meta: {
                label: "Brand",
                cellRenderer: (value) => (
                    <span className="text-pulse-green-dark text-xs whitespace-nowrap">
                        {value as string}
                    </span>
                ),
            },
        },
        {
            id: "retail_price",
            accessorKey: "retail_price",
            header: "Price",
            meta: {
                label: "Price",
                align: "right",
                cellRenderer: (value) => (
                    <span className="font-semibold text-pulse-green-dark text-xs whitespace-nowrap">
                        ${parseFloat(value as string).toLocaleString()}
                    </span>
                ),
            },
        },
        {
            id: "stock_quantity",
            accessorKey: "stock_quantity",
            header: "Stock",
            meta: {
                label: "Stock",
                align: "center",
                cellRenderer: (value) => {
                    const qty = value as number;
                    const isLow = qty > 0 && qty <= 10;
                    const isOut = qty === 0;

                    return (
                        <span
                            className={cn(
                                "font-medium text-xs",
                                isOut
                                    ? "text-status-cancelled"
                                    : isLow
                                      ? "text-status-pending"
                                      : "text-pulse-green-dark",
                            )}
                        >
                            {isOut ? "0" : qty}
                        </span>
                    );
                },
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
                                ProductStatusWithHelpers.getLabelClass(
                                    value as ProductStatusType,
                                ),
                            )}
                        >
                            {ProductStatusWithHelpers.getDisplayTextKey(
                                value as ProductStatusType,
                            )}
                        </span>
                    );
                },
            },
        },
    ];
