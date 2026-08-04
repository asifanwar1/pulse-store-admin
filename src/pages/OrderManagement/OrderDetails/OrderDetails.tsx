import {
    ArrowLeft,
    Hash,
    Calendar,
    CreditCard,
    Package,
    DollarSign,
    Truck,
    OctagonAlert,
    Plus,
} from "lucide-react";

import ChartCard from "@/components/custom/CustomCards/ChartCard";
import { DataTable } from "@/components/custom/DataTable";
import { orderItemColumns } from "./OrderDetails.Config";
import Button from "@/components/custom/CustomButton/CustomButton";
import StatChipCard from "@/components/custom/CustomCards/StatChipCard";
import {
    PaymentMethodsWithHelpers,
    type PaymentMethodsType,
} from "@/constants/payment-method.constant";
import { useOrderDetails } from "./OrderDetails.Container";
import {
    formatNumberCurrency,
    getInitialsFromName,
} from "@/utils/common.utils";
import { getFormattedDate } from "@/utils/dateTime.utils";
import OrderDetailsSkeleton from "./OrderDetails.Skeleton";
import {
    ORDER_STATUS_OPTIONS,
    OrderStatus,
    OrderStatusWithHelpers,
    type OrderStatusType,
} from "@/constants/order-status.constants";
import { cn } from "@/lib/utils";
import type { TOrderStatus } from "@/api/services/orders/orders.request.types";
import { Select } from "@/components/custom/Select";
import ConfirmationModal from "@/components/custom/Modals/ConfirmationModal";
import Timeline from "@/components/custom/Timeline/Timeline";

export default function OrderDetails() {
    const {
        order,
        isOrderDataLoading,
        isUpdatingOrderStatus,
        statusModalOpen,
        selectedStatusOption,
        handleStatusChange,
        handleNavigateBack,
        handleOrderStatusModalClose,
        handleOrderStatusModalOpen,
        handleNavigateToShipmentCreate,
    } = useOrderDetails();

    if (isOrderDataLoading) {
        return <OrderDetailsSkeleton />;
    }
    if (!order) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <p className="text-lg font-semibold text-pulse-green-dark">
                    Order not found
                </p>
                <Button onClick={handleNavigateBack} variant="ghost" size="sm">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Orders
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 p-4 sm:p-6 min-h-0">
            <div className="flex items-center justify-between">
                <Button onClick={handleNavigateBack} variant="ghost" size="sm">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Orders
                </Button>
                {order?.status === OrderStatus.PENDING ||
                    (order?.status === OrderStatus.PROCESSING && (
                        <Button
                            size="sm"
                            onClick={handleNavigateToShipmentCreate}
                        >
                            <Plus className="w-4 h-4" />
                            Create Shipment
                        </Button>
                    ))}
            </div>

            <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-pulse-cream-dark text-pulse-green font-bold text-xl shrink-0">
                        {getInitialsFromName(order.user.name)}
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <h2 className="text-lg font-bold text-pulse-green-dark">
                                {order.user.name}
                            </h2>
                            <span
                                className={cn(
                                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
                                    OrderStatusWithHelpers.getLabelClass(
                                        order?.status as OrderStatusType,
                                    ),
                                )}
                            >
                                {OrderStatusWithHelpers.getDisplayTextKey(
                                    order?.status as OrderStatusType,
                                )}
                            </span>
                        </div>
                        <p className="text-sm text-app-secondary">
                            {order.user.email}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-pulse-green">
                            <span className="flex items-center gap-1">
                                <Hash className="w-3 h-3" />
                                {order.id}
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {getFormattedDate(order.created_at!)}
                            </span>
                            <span className="flex items-center gap-1">
                                <CreditCard className="w-3 h-3" />

                                {PaymentMethodsWithHelpers.getDisplayTextKey(
                                    order?.payment_method as PaymentMethodsType,
                                )}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5 shrink-0 w-full sm:w-48">
                        <span className="text-xs font-medium text-pulse-green">
                            Update Status
                        </span>
                        <Select
                            options={ORDER_STATUS_OPTIONS}
                            value={selectedStatusOption}
                            onChange={(opt) => {
                                if (opt && !Array.isArray(opt)) {
                                    handleOrderStatusModalOpen(
                                        opt.value as TOrderStatus,
                                    );
                                }
                            }}
                            size="sm"
                            disabled={isUpdatingOrderStatus}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <StatChipCard
                    icon={<Package className="w-4 h-4" />}
                    label="Items"
                    value={`${order.totalOrderedItems} item${order.totalOrderedItems !== 1 ? "s" : ""}`}
                />
                <StatChipCard
                    icon={<DollarSign className="w-4 h-4" />}
                    label="Order Total"
                    value={formatNumberCurrency(order.total_amount)}
                />
                <StatChipCard
                    icon={<Truck className="w-4 h-4" />}
                    label="Shipping"
                    value={getFormattedDate(order.shipped_at!)}
                />
                <StatChipCard
                    icon={<Calendar className="w-4 h-4" />}
                    label="Est. Delivery"
                    value={getFormattedDate(order.estimated_delivery_date!)}
                />
            </div>

            {/* Order items table */}
            <ChartCard
                title="Order Items"
                subtitle={`${order.items.length} item${order.items.length !== 1 ? "s" : ""} in this order`}
                className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card py-1"
                bodyClassName="px-0 py-0"
            >
                <DataTable
                    id="order-items"
                    data={order.items}
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

            {/* Order tracking timeline */}
            <ChartCard
                title="Order Tracking"
                subtitle="Status history for this order"
                className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card py-1"
                bodyClassName="px-5 py-4"
            >
                <Timeline
                    items={order.tracking ?? []}
                    getStatusLabel={(status) =>
                        OrderStatusWithHelpers.getDisplayTextKey(
                            status as OrderStatusType,
                        )
                    }
                    getStatusClass={(status) =>
                        OrderStatusWithHelpers.getLabelClass(
                            status as OrderStatusType,
                        )
                    }
                    emptyMessage="No status history yet."
                />
            </ChartCard>

            {statusModalOpen && (
                <ConfirmationModal
                    open={statusModalOpen}
                    icon={<OctagonAlert size={18} />}
                    title="Order Status"
                    description="Are you sure you want to change the order status?"
                    confirmText="Confirm"
                    cancelText="Cancel"
                    onSuccess={handleStatusChange}
                    onClose={handleOrderStatusModalClose}
                    isLoading={isUpdatingOrderStatus}
                />
            )}
        </div>
    );
}
