import {
    Package,
    Truck,
    CheckCircle,
    AlertCircle,
} from "lucide-react";
import { type Shipment, type ShipmentStatus } from "@/mock/shipment.mock";
import { type TDataColumnDef } from "@/components/custom/DataTable";
import { cn } from "@/lib/utils";
import { CARRIER_OPTIONS } from "@/constants/shipment-status.constants";

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

export const SHIPMENT_STATUS_CONFIG: Record<
    ShipmentStatus,
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
    in_transit: {
        label: "In Transit",
        textColor: "text-status-processing",
        bgColor: "bg-status-processing-bg",
    },
    out_for_delivery: {
        label: "Out for Delivery",
        textColor: "text-status-shipped",
        bgColor: "bg-status-shipped-bg",
    },
    failed: {
        label: "Failed",
        textColor: "text-status-cancelled",
        bgColor: "bg-status-cancelled-bg",
    },
    returned: {
        label: "Returned",
        textColor: "text-status-cancelled",
        bgColor: "bg-status-cancelled-bg",
    },
};

const carrierLabelMap = Object.fromEntries(
    CARRIER_OPTIONS.map((o) => [o.value, o.label]),
);

export const shipmentManagementTableColumns: TDataColumnDef<Shipment>[] = [
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
        id: "orderId",
        accessorKey: "orderId",
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
                const shipment = row.original;
                return (
                    <div className="flex items-center gap-2.5 whitespace-nowrap">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xss font-bold shrink-0 bg-pulse-cream-dark">
                            {shipment.initials}
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-pulse-green-dark text-xs">
                                {shipment.customer}
                            </span>
                            <span className="text-xss text-pulse-green leading-tight">
                                {shipment.email}
                            </span>
                        </div>
                    </div>
                );
            },
        },
    },
    {
        id: "carrier",
        accessorKey: "carrier",
        header: "Carrier",
        meta: {
            label: "Carrier",
            cellRenderer: (value) => (
                <span className="text-pulse-green-dark text-xs whitespace-nowrap">
                    {carrierLabelMap[value as string] ?? (value as string)}
                </span>
            ),
        },
    },
    {
        id: "trackingNumber",
        accessorKey: "trackingNumber",
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
    {
        id: "destination",
        accessorKey: "destination",
        header: "Destination",
        meta: {
            label: "Destination",
            cellRenderer: (value) => (
                <span className="text-pulse-green-dark text-xs whitespace-nowrap">
                    {value as string}
                </span>
            ),
        },
    },
    {
        id: "estimatedDelivery",
        accessorKey: "estimatedDelivery",
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
                const cfg = SHIPMENT_STATUS_CONFIG[value as ShipmentStatus];
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
