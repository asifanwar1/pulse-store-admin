import { Package, Truck, CheckCircle, AlertCircle } from "lucide-react";
import { type TDataColumnDef } from "@/components/custom/DataTable";
import { cn } from "@/lib/utils";
import {
    ShipmentStatusWithHelpers,
    type ShipmentStatusType,
} from "@/constants/shipment-status.constants";
import type { TShipmentResponse } from "@/api/services/shipment/shipment.response";
import { getInitialsFromName } from "@/utils/common.utils";

export const SHIPMENT_STAT_CONFIG = [
    {
        key: "totalShipments" as const,
        title: "Total Shipments",
        icon: <Package className="w-5 h-5" />,
        iconBgClass: "bg-pulse-cream-dark",
        iconColorClass: "text-pulse-green",
        subtitle: "All time shipments",
    },
    {
        key: "inTransit" as const,
        title: "In Transit",
        icon: <Truck className="w-5 h-5" />,
        iconBgClass: "bg-pulse-cream-dark",
        iconColorClass: "text-pulse-green",
        subtitle: "Currently moving",
    },
    {
        key: "delivered" as const,
        title: "Delivered",
        icon: <CheckCircle className="w-5 h-5" />,
        iconBgClass: "bg-pulse-cream-dark",
        iconColorClass: "text-pulse-green",
        subtitle: "Successfully delivered",
    },
    {
        key: "failed" as const,
        title: "Failed / Returned",
        icon: <AlertCircle className="w-5 h-5" />,
        iconBgClass: "bg-pulse-cream-dark",
        iconColorClass: "text-pulse-green",
        subtitle: "Delivery issues",
    },
] as const;

export const shipmentManagementTableColumns: TDataColumnDef<TShipmentResponse>[] =
    [
        {
            id: "id",
            accessorKey: "id",
            header: "Shipment ID",
            meta: {
                label: "Shipment ID",
                cellRenderer: (value) => (
                    <span className="font-semibold text-pulse-green-dark whitespace-nowrap text-xs">
                        {value as string}
                    </span>
                ),
            },
        },
        {
            id: "order_id",
            accessorKey: "order_id",
            header: "Order ID",
            meta: {
                label: "Order ID",
                cellRenderer: (value) => (
                    <span className="text-pulse-green-dark text-xs whitespace-nowrap">
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
                    const customer = row.original.customer;
                    return (
                        <div className="flex items-center gap-2.5 whitespace-nowrap">
                            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xss font-bold shrink-0 bg-pulse-cream-dark">
                                {getInitialsFromName(customer.name)}
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
            id: "courier",
            accessorKey: "courier",
            header: "Courier",
            meta: {
                label: "Carrier",
                cellRenderer: (value) => (
                    <span className="text-pulse-green-dark text-xs whitespace-nowrap">
                        {value as string}
                    </span>
                ),
            },
        },
        {
            id: "tracking_id",
            accessorKey: "tracking_id",
            header: "Tracking No.",
            meta: {
                label: "Tracking No.",
                cellRenderer: (value) => (
                    <span className="text-pulse-green-dark text-xs font-mono whitespace-nowrap">
                        {value as string}
                    </span>
                ),
            },
        },
        // {
        //     id: "shipment_address",
        //     accessorKey: "shipment_address",
        //     header: "Destination",
        //     meta: {
        //         label: "Destination",
        //         cellRenderer: (value) => (
        //             <span className="text-pulse-green-dark text-xs whitespace-nowrap">
        //                 {value as string}
        //             </span>
        //         ),
        //     },
        // },
        {
            id: "estimated_delivery_date",
            accessorKey: "estimated_delivery_date",
            header: "Est. Delivery",
            meta: {
                label: "Est. Delivery",
                cellRenderer: (value) => (
                    <span className="text-pulse-green-dark text-xs whitespace-nowrap">
                        {value as string}
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
                                ShipmentStatusWithHelpers.getLabelClass(
                                    value as ShipmentStatusType,
                                ),
                            )}
                        >
                            {ShipmentStatusWithHelpers.getDisplayTextKey(
                                value as ShipmentStatusType,
                            )}
                        </span>
                    );
                },
            },
        },
    ];
