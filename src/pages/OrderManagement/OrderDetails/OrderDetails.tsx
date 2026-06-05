import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Hash,
    Calendar,
    CreditCard,
    MapPin,
    Package,
    DollarSign,
    Percent,
    Truck,
    StickyNote,
} from "lucide-react";

import { ordersListData, orderDetailsMap } from "@/mock/order.mock";
import type { OrderStatus } from "@/mock/order.mock";
import ChartCard from "@/components/custom/CustomCards/ChartCard";
import { DataTable } from "@/components/custom/DataTable";
import { cn } from "@/lib/utils";
import { APP_ROUTES } from "@/routes/appRoutes";
import { orderItemColumns } from "./OrderDetails.Config";
// import { ORDER_STATUS_CONFIG } from "../OrderManagement.Config";
import InfoCard from "@/components/custom/CustomCards/InfoCard";
import Button from "@/components/custom/CustomButton/CustomButton";
import StatChipCard from "@/components/custom/CustomCards/StatChipCard";
import { Select } from "@/components/custom/Select";
import {
    ORDER_STATUS_OPTIONS,
    PAYMENT_METHOD_OPTIONS,
} from "@/constants/order-status.constants";

const STATUS_SELECT_OPTIONS = ORDER_STATUS_OPTIONS.map((o) => ({
    value: o.value,
    label: o.label,
}));

const paymentLabelMap = Object.fromEntries(
    PAYMENT_METHOD_OPTIONS.map((o) => [o.value, o.label]),
);

export default function OrderDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const order = ordersListData.find((o) => o.id === id);
    const details = id ? orderDetailsMap[id] : undefined;

    const [status, setStatus] = useState<OrderStatus>(
        order?.status ?? "pending",
    );

    if (!order || !details) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <p className="text-lg font-semibold text-pulse-green-dark">
                    Order not found
                </p>
                <button
                    onClick={() => navigate(APP_ROUTES.ORDERS)}
                    className="flex items-center gap-2 text-sm text-pulse-green hover:text-pulse-green-dark transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Orders
                </button>
            </div>
        );
    }

    // const statusBadge = ORDER_STATUS_CONFIG[status];
    const selectedStatusOption =
        STATUS_SELECT_OPTIONS.find((o) => o.value === status) ?? null;

    const grandTotal =
        details.subtotal +
        details.shippingCost +
        details.tax -
        details.discount;

    return (
        <div className="flex flex-col gap-6 p-4 sm:p-6 min-h-0">
            {/* Back nav */}
            <div className="flex">
                <Button
                    onClick={() => navigate(APP_ROUTES.ORDERS)}
                    variant="ghost"
                    size="sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Orders
                </Button>
            </div>

            {/* Header card */}
            <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-pulse-cream-dark text-pulse-green font-bold text-xl shrink-0">
                        {order.initials}
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <h2 className="text-lg font-bold text-pulse-green-dark">
                                {order.customer}
                            </h2>
                            {/* <span
                                className={cn(
                                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
                                    statusBadge.textColor,
                                    statusBadge.bgColor,
                                )}
                            >
                                {statusBadge.label}
                            </span> */}
                        </div>
                        <p className="text-sm text-app-secondary">
                            {order.email}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-pulse-green">
                            <span className="flex items-center gap-1">
                                <Hash className="w-3 h-3" />
                                {order.id}
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {order.date}
                            </span>
                            <span className="flex items-center gap-1">
                                <CreditCard className="w-3 h-3" />
                                {paymentLabelMap[order.paymentMethod] ??
                                    order.paymentMethod}
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
                                    setStatus(opt.value as OrderStatus);
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
                    value={`${order.itemCount} item${order.itemCount !== 1 ? "s" : ""}`}
                />
                <StatChipCard
                    icon={<DollarSign className="w-4 h-4" />}
                    label="Order Total"
                    value={`$${grandTotal.toFixed(2)}`}
                />
                <StatChipCard
                    icon={<Truck className="w-4 h-4" />}
                    label="Shipping"
                    value={
                        details.shippingCost === 0
                            ? "Free"
                            : `$${details.shippingCost.toFixed(2)}`
                    }
                />
                <StatChipCard
                    icon={<Calendar className="w-4 h-4" />}
                    label="Est. Delivery"
                    value={details.estimatedDelivery ?? "—"}
                />
            </div>

            {/* Order items table */}
            <ChartCard
                title="Order Items"
                subtitle={`${details.items.length} item${details.items.length !== 1 ? "s" : ""} in this order`}
                className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card py-1"
                bodyClassName="px-0 py-0"
            >
                <DataTable
                    id="order-items"
                    data={details.items}
                    columns={orderItemColumns}
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

            {/* Order summary + addresses */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Price breakdown */}
                <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-5 flex flex-col gap-4">
                    <h3 className="text-sm font-semibold text-pulse-green-dark border-b border-pulse-cream-dark pb-3">
                        Order Summary
                    </h3>
                    <div className="flex flex-col gap-3">
                        <InfoCard
                            icon={<DollarSign className="w-4 h-4" />}
                            label="Subtotal"
                            value={`$${details.subtotal.toLocaleString()}`}
                        />
                        <InfoCard
                            icon={<Truck className="w-4 h-4" />}
                            label="Shipping"
                            value={
                                details.shippingCost === 0
                                    ? "Free"
                                    : `$${details.shippingCost.toFixed(2)}`
                            }
                        />
                        <InfoCard
                            icon={<Percent className="w-4 h-4" />}
                            label="Tax"
                            value={`$${details.tax.toFixed(2)}`}
                        />
                        {details.discount > 0 && (
                            <InfoCard
                                icon={<Percent className="w-4 h-4" />}
                                label="Discount"
                                value={`-$${details.discount.toFixed(2)}`}
                            />
                        )}
                        <div className="flex items-center justify-between pt-3 border-t border-pulse-cream-dark">
                            <span className="text-xs font-semibold text-pulse-green-dark">
                                Grand Total
                            </span>
                            <span className="text-sm font-bold text-pulse-green-dark">
                                ${grandTotal.toFixed(2)}
                            </span>
                        </div>
                    </div>
                    {details.trackingNumber && (
                        <div className="flex flex-col gap-1 pt-3 border-t border-pulse-cream-dark">
                            <span className="text-xs text-pulse-green font-medium">
                                Tracking Number
                            </span>
                            <span className="text-xs text-pulse-green-dark font-mono">
                                {details.trackingNumber}
                            </span>
                        </div>
                    )}
                    {details.notes && (
                        <div className="flex flex-col gap-1 pt-1 border-t border-pulse-cream-dark">
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
                        <div className="flex flex-col gap-1.5">
                            <span className="flex items-center gap-1 text-xs font-medium text-pulse-green">
                                <MapPin className="w-3 h-3" />
                                Shipping Address
                            </span>
                            <p className="text-xs text-pulse-green-dark leading-relaxed">
                                {details.shippingAddress.street}
                                <br />
                                {details.shippingAddress.city},{" "}
                                {details.shippingAddress.state}{" "}
                                {details.shippingAddress.zip}
                                <br />
                                {details.shippingAddress.country}
                            </p>
                        </div>
                        <div className="flex flex-col gap-1.5 pt-3 border-t border-pulse-cream-dark">
                            <span className="flex items-center gap-1 text-xs font-medium text-pulse-green">
                                <CreditCard className="w-3 h-3" />
                                Billing Address
                            </span>
                            <p className="text-xs text-pulse-green-dark leading-relaxed">
                                {details.billingAddress.street}
                                <br />
                                {details.billingAddress.city},{" "}
                                {details.billingAddress.state}{" "}
                                {details.billingAddress.zip}
                                <br />
                                {details.billingAddress.country}
                            </p>
                        </div>
                        <div className="flex flex-col gap-1.5 pt-3 border-t border-pulse-cream-dark">
                            <span className="text-xs font-medium text-pulse-green">
                                Customer Contact
                            </span>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-xs text-pulse-green-dark">
                                    {order.email}
                                </span>
                                <span className="text-xs text-pulse-green-dark">
                                    {order.phone}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
