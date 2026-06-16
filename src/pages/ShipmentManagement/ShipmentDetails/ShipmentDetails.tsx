import {
    ArrowLeft,
    Hash,
    Calendar,
    MapPin,
    Package,
    Truck,
    StickyNote,
    DollarSign,
    OctagonAlert,
} from "lucide-react";

import { cn } from "@/lib/utils";
import Button from "@/components/custom/CustomButton/CustomButton";
import StatChipCard from "@/components/custom/CustomCards/StatChipCard";
import { Select } from "@/components/custom/Select";
import {
    SHIPMENT_STATUS_OPTIONS,
    ShipmentStatusWithHelpers,
    type ShipmentStatusType,
} from "@/constants/shipment-status.constants";
import { useShimentDetails } from "./ShipmentDetails.Container";
import ShipmentDetailsSkeleton from "./ShipmentDetails.Skeleton";
import {
    formatNumberCurrency,
    getInitialsFromName,
} from "@/utils/common.utils";
import { getFormattedDate } from "@/utils/dateTime.utils";
import ProductOrderCard from "@/components/custom/CustomCards/ProductOrderCard";
import ConfirmationModal from "@/components/custom/Modals/ConfirmationModal";

const BoxURL =
    "https://dftybolqcutmxzqcsogd.supabase.co/storage/v1/object/public/pulsestore/products/beige-box.jpg";

const ShipmentDetails = () => {
    const {
        NO_VALUE,
        shipment,
        isShipmentDataLoading,
        statusModalOpen,
        selectedStatusOption,
        isUpdatingShipmentStatus,
        handleNavigateBack,
        handleShipmentStatusModalOpen,
        handleShipmentStatusModalClose,
        handleStatusChange,
        handleNavigateToProduct,
    } = useShimentDetails();

    if (isShipmentDataLoading) {
        return <ShipmentDetailsSkeleton />;
    }

    if (!shipment) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <p className="text-lg font-semibold text-pulse-green-dark">
                    Shipment not found
                </p>
                <Button onClick={handleNavigateBack} variant="ghost" size="sm">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Shipments
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 p-4 sm:p-6 min-h-0">
            <div className="flex">
                <Button onClick={handleNavigateBack} variant="ghost" size="sm">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Shipments
                </Button>
            </div>

            <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-pulse-cream-dark text-pulse-green font-bold text-xl shrink-0">
                        {getInitialsFromName(shipment.customer.name)}
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <h2 className="text-lg font-bold text-pulse-green-dark">
                                {shipment.customer.name}
                            </h2>
                            <span
                                className={cn(
                                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
                                    ShipmentStatusWithHelpers.getLabelClass(
                                        shipment.status as ShipmentStatusType,
                                    ),
                                )}
                            >
                                {ShipmentStatusWithHelpers.getDisplayTextKey(
                                    shipment.status as ShipmentStatusType,
                                )}
                            </span>
                        </div>
                        <p className="text-sm text-app-secondary">
                            {shipment.customer.email}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-pulse-green">
                            <span className="flex items-center gap-1">
                                <Hash className="w-3 h-3" />
                                {shipment.id}
                            </span>
                            <span className="flex items-center gap-1">
                                <Package className="w-3 h-3" />
                                {shipment.order_id}
                            </span>
                            <span className="flex items-center gap-1">
                                <Truck className="w-3 h-3" />
                                {shipment.courier}
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {getFormattedDate(shipment.shipped_at)}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5 shrink-0 w-full sm:w-48">
                        <span className="text-xs font-medium text-pulse-green">
                            Update Status
                        </span>
                        <Select
                            options={SHIPMENT_STATUS_OPTIONS}
                            value={selectedStatusOption}
                            onChange={(opt) => {
                                if (opt && !Array.isArray(opt)) {
                                    handleShipmentStatusModalOpen(
                                        opt.value as ShipmentStatusType,
                                    );
                                }
                            }}
                            size="sm"
                            disabled={isUpdatingShipmentStatus}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <StatChipCard
                    icon={<Package className="w-4 h-4" />}
                    label="Items"
                    value={`${shipment.ordered_items.length} item${shipment.ordered_items.length !== 1 ? "s" : ""}`}
                />
                <StatChipCard
                    icon={<DollarSign className="w-4 h-4" />}
                    label="Total Amount"
                    value={formatNumberCurrency(shipment.order.total_amount)}
                />
                <StatChipCard
                    icon={<Truck className="w-4 h-4" />}
                    label="Carrier"
                    value={shipment.courier}
                />
                <StatChipCard
                    icon={<Calendar className="w-4 h-4" />}
                    label="Est. Delivery"
                    value={getFormattedDate(shipment.estimated_delivery_date)}
                />
            </div>

            <div className="flex flex-wrap gap-4">
                <div className="flex-1 bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card px-5 py-4 flex items-center gap-3">
                    <Truck className="w-4 h-4 text-pulse-green shrink-0" />
                    <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-medium text-pulse-green">
                            Tracking Number
                        </span>
                        <span className="text-sm font-mono font-semibold text-pulse-green-dark">
                            {shipment.tracking_id}
                        </span>
                    </div>
                </div>
                <div className="flex-1 bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card px-5 py-4 flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-pulse-green shrink-0" />
                    <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-medium text-pulse-green">
                            Destination Address
                        </span>
                        <div className="flex flex-col gap-4">
                            <p className="text-xs text-pulse-green-dark leading-relaxed">
                                {shipment.shipment_address.street}{" "}
                                {shipment.shipment_address.city},{" "}
                                {shipment.shipment_address.state}{" "}
                                {shipment.shipment_address.zip}{" "}
                                {shipment.shipment_address.country}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-5 flex flex-col gap-4">
                {shipment?.notes && (
                    <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-1 text-xs text-pulse-green font-medium">
                            <StickyNote className="w-3 h-3" />
                            Notes
                        </span>
                        <p className="text-xs text-pulse-green-dark leading-relaxed">
                            {shipment.notes}
                        </p>
                    </div>
                )}
            </div>

            {shipment.ordered_items &&
                shipment.ordered_items?.length > NO_VALUE && (
                    <div className="flex flex-col gap-0.5">
                        <h3 className="text-lg font-semibold text-pulse-green-dark">
                            Shipped Items
                        </h3>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {shipment.ordered_items.map((item) => (
                                <ProductOrderCard
                                    key={item.id}
                                    image={BoxURL}
                                    title={item.product_name || "-"}
                                    category={item.product_category}
                                    unitPrice={item.unit_price}
                                    totalAmount={item.total_amount}
                                    quantity={item.quantity}
                                    sku={item.product_sku}
                                    onClick={() =>
                                        handleNavigateToProduct(item.id)
                                    }
                                />
                            ))}
                        </div>
                    </div>
                )}

            {statusModalOpen && (
                <ConfirmationModal
                    open={statusModalOpen}
                    icon={<OctagonAlert size={18} />}
                    title="Shipment Status"
                    description="Are you sure you want to change the shipment status?"
                    confirmText="Confirm"
                    cancelText="Cancel"
                    onSuccess={handleStatusChange}
                    onClose={handleShipmentStatusModalClose}
                    isLoading={isUpdatingShipmentStatus}
                />
            )}
        </div>
    );
};

export default ShipmentDetails;
