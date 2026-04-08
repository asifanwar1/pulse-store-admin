import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Hash,
    Calendar,
    MapPin,
    Package,
    Truck,
    StickyNote,
    Weight,
} from "lucide-react";

import { shipmentsListData, shipmentDetailsMap } from "@/mock/shipment.mock";
import type { ShipmentStatus } from "@/mock/shipment.mock";
import ChartCard from "@/components/custom/CustomCards/ChartCard";
import { DataTable } from "@/components/custom/DataTable";
import { cn } from "@/lib/utils";
import { APP_ROUTES } from "@/routes/appRoutes";
import { shipmentItemColumns } from "./ShipmentDetails.Config";
import { SHIPMENT_STATUS_CONFIG } from "../ShipmentManagement.Config";
import InfoCard from "@/components/custom/CustomCards/InfoCard";
import Button from "@/components/custom/CustomButton/CustomButton";
import StatChipCard from "@/components/custom/CustomCards/StatChipCard";
import { Select } from "@/components/custom/Select";
import {
    SHIPMENT_STATUS_OPTIONS,
    CARRIER_OPTIONS,
} from "@/constants/shipment-status.constants";

const STATUS_SELECT_OPTIONS = SHIPMENT_STATUS_OPTIONS.map((o) => ({
    value: o.value,
    label: o.label,
}));

const carrierLabelMap = Object.fromEntries(
    CARRIER_OPTIONS.map((o) => [o.value, o.label]),
);

export default function ShipmentDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const shipment = shipmentsListData.find((s) => s.id === id);
    const details = id ? shipmentDetailsMap[id] : undefined;

    const [status, setStatus] = useState<ShipmentStatus>(
        shipment?.status ?? "pending",
    );

    if (!shipment) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <p className="text-lg font-semibold text-pulse-green-dark">
                    Shipment not found
                </p>
                <button
                    onClick={() => navigate(APP_ROUTES.SHIPMENTS)}
                    className="flex items-center gap-2 text-sm text-pulse-green hover:text-pulse-green-dark transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Shipments
                </button>
            </div>
        );
    }

    const statusBadge = SHIPMENT_STATUS_CONFIG[status];
    const selectedStatusOption =
        STATUS_SELECT_OPTIONS.find((o) => o.value === status) ?? null;

    const detailItems = details?.items ?? [];

    return (
        <div className="flex flex-col gap-6 p-4 sm:p-6 min-h-0">
            {/* Back nav */}
            <div className="flex">
                <Button
                    onClick={() => navigate(APP_ROUTES.SHIPMENTS)}
                    variant="ghost"
                    size="sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Shipments
                </Button>
            </div>

            {/* Header card */}
            <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-pulse-cream-dark text-pulse-green font-bold text-xl shrink-0">
                        {shipment.initials}
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <h2 className="text-lg font-bold text-pulse-green-dark">
                                {shipment.customer}
                            </h2>
                            <span
                                className={cn(
                                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
                                    statusBadge.textColor,
                                    statusBadge.bgColor,
                                )}
                            >
                                {statusBadge.label}
                            </span>
                        </div>
                        <p className="text-sm text-app-secondary">
                            {shipment.email}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-pulse-green">
                            <span className="flex items-center gap-1">
                                <Hash className="w-3 h-3" />
                                {shipment.id}
                            </span>
                            <span className="flex items-center gap-1">
                                <Package className="w-3 h-3" />
                                {shipment.orderId}
                            </span>
                            <span className="flex items-center gap-1">
                                <Truck className="w-3 h-3" />
                                {carrierLabelMap[shipment.carrier] ??
                                    shipment.carrier}
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {shipment.createdAt}
                            </span>
                        </div>
                    </div>

                    {/* Status selector */}
                    <div className="flex flex-col gap-1.5 shrink-0 w-full sm:w-48">
                        <span className="text-xs font-medium text-pulse-green">
                            Update Status
                        </span>
                        <Select
                            options={STATUS_SELECT_OPTIONS}
                            value={selectedStatusOption}
                            onChange={(opt) => {
                                if (opt && !Array.isArray(opt)) {
                                    setStatus(opt.value as ShipmentStatus);
                                }
                            }}
                            size="sm"
                        />
                    </div>
                </div>
            </div>

            {/* Stats chips */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <StatChipCard
                    icon={<Package className="w-4 h-4" />}
                    label="Items"
                    value={`${detailItems.length} item${detailItems.length !== 1 ? "s" : ""}`}
                />
                <StatChipCard
                    icon={<Weight className="w-4 h-4" />}
                    label="Total Weight"
                    value={`${shipment.weight.toFixed(2)} kg`}
                />
                <StatChipCard
                    icon={<Truck className="w-4 h-4" />}
                    label="Carrier"
                    value={
                        carrierLabelMap[shipment.carrier] ?? shipment.carrier
                    }
                />
                <StatChipCard
                    icon={<Calendar className="w-4 h-4" />}
                    label="Est. Delivery"
                    value={shipment.estimatedDelivery}
                />
            </div>

            {/* Tracking number banner */}
            <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card px-5 py-4 flex items-center gap-3">
                <Truck className="w-4 h-4 text-pulse-green shrink-0" />
                <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-medium text-pulse-green">
                        Tracking Number
                    </span>
                    <span className="text-sm font-mono font-semibold text-pulse-green-dark">
                        {shipment.trackingNumber}
                    </span>
                </div>
            </div>

            {/* Shipment items table */}
            {detailItems.length > 0 && (
                <ChartCard
                    title="Shipment Items"
                    subtitle={`${detailItems.length} item${detailItems.length !== 1 ? "s" : ""} in this shipment`}
                    className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card py-1"
                    bodyClassName="px-0 py-0"
                >
                    <DataTable
                        id="shipment-items"
                        data={detailItems}
                        columns={shipmentItemColumns}
                        features={{
                            rowSelection: false,
                            pagination: false,
                            sorting: false,
                            filtering: false,
                            columnVisibility: false,
                            globalSearch: false,
                        }}
                    />
                </ChartCard>
            )}

            {/* Summary + Addresses */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Shipment summary */}
                <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-5 flex flex-col gap-4">
                    <h3 className="text-sm font-semibold text-pulse-green-dark border-b border-pulse-cream-dark pb-3">
                        Shipment Summary
                    </h3>
                    <div className="flex flex-col gap-3">
                        <InfoCard
                            icon={<Truck className="w-4 h-4" />}
                            label="Carrier"
                            value={
                                carrierLabelMap[shipment.carrier] ??
                                shipment.carrier
                            }
                        />
                        <InfoCard
                            icon={<Weight className="w-4 h-4" />}
                            label="Weight"
                            value={`${shipment.weight.toFixed(2)} kg`}
                        />
                        {details?.dimensions && (
                            <InfoCard
                                icon={<Package className="w-4 h-4" />}
                                label="Dimensions"
                                value={details.dimensions}
                            />
                        )}
                        {details?.shippingCost !== undefined && (
                            <InfoCard
                                icon={<Truck className="w-4 h-4" />}
                                label="Shipping Cost"
                                value={
                                    details.shippingCost === 0
                                        ? "Free"
                                        : `$${details.shippingCost.toFixed(2)}`
                                }
                            />
                        )}
                        {details?.deliveredAt && (
                            <InfoCard
                                icon={<Calendar className="w-4 h-4" />}
                                label="Delivered At"
                                value={details.deliveredAt}
                            />
                        )}
                    </div>
                    {details?.notes && (
                        <div className="flex flex-col gap-1 pt-3 border-t border-pulse-cream-dark">
                            <span className="flex items-center gap-1 text-xs text-pulse-green font-medium">
                                <StickyNote className="w-3 h-3" />
                                Notes
                            </span>
                            <p className="text-xs text-pulse-green-dark leading-relaxed">
                                {details.notes}
                            </p>
                        </div>
                    )}
                </div>

                {/* Addresses */}
                <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-5 flex flex-col gap-4">
                    <h3 className="text-sm font-semibold text-pulse-green-dark border-b border-pulse-cream-dark pb-3">
                        Addresses
                    </h3>
                    <div className="flex flex-col gap-4">
                        {details?.originAddress && (
                            <div className="flex flex-col gap-1.5">
                                <span className="flex items-center gap-1 text-xs font-medium text-pulse-green">
                                    <MapPin className="w-3 h-3" />
                                    Origin Address
                                </span>
                                <p className="text-xs text-pulse-green-dark leading-relaxed">
                                    {details.originAddress.street}
                                    <br />
                                    {details.originAddress.city},{" "}
                                    {details.originAddress.state}{" "}
                                    {details.originAddress.zip}
                                    <br />
                                    {details.originAddress.country}
                                </p>
                            </div>
                        )}
                        {details?.destinationAddress && (
                            <div className="flex flex-col gap-1.5 pt-3 border-t border-pulse-cream-dark">
                                <span className="flex items-center gap-1 text-xs font-medium text-pulse-green">
                                    <MapPin className="w-3 h-3" />
                                    Destination Address
                                </span>
                                <p className="text-xs text-pulse-green-dark leading-relaxed">
                                    {details.destinationAddress.street}
                                    <br />
                                    {details.destinationAddress.city},{" "}
                                    {details.destinationAddress.state}{" "}
                                    {details.destinationAddress.zip}
                                    <br />
                                    {details.destinationAddress.country}
                                </p>
                            </div>
                        )}
                        {!details && (
                            <p className="text-xs text-pulse-green">
                                No address details available.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
