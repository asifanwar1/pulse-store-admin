import {
    ArrowLeft,
    Hash,
    Calendar,
    Package,
    DollarSign,
    CreditCard,
} from "lucide-react";

import Button from "@/components/custom/CustomButton/CustomButton";
import StatChipCard from "@/components/custom/CustomCards/StatChipCard";

import {
    formatNumberCurrency,
    getInitialsFromName,
} from "@/utils/common.utils";
import { getFormattedDate } from "@/utils/dateTime.utils";
import RevenueDetailsSkeleton from "./RevenueDetails.Skeleton";
import { useRevenueDetails } from "./RevenueDetails.Container";
import {
    PaymentMethodsWithHelpers,
    type PaymentMethodsType,
} from "@/constants/payment-method.constant";
import OrderRevenueCard from "@/components/custom/CustomCards/OrderRevenueCard";

const RevenueDetails = () => {
    const {
        revenue,
        isRevenueLoading,
        handleNavigateToOrder,
        handleNavigateToShipment,
        handleNavigateBack,
        handleNavigateToProduct,
        NO_VALUE,
    } = useRevenueDetails();

    if (isRevenueLoading) {
        return <RevenueDetailsSkeleton />;
    }

    if (!revenue) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <p className="text-lg font-semibold text-pulse-green-dark">
                    Revenue not found
                </p>
                <Button onClick={handleNavigateBack} variant="ghost" size="sm">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Revenue
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 p-4 sm:p-6 min-h-0">
            <div className="flex">
                <Button onClick={handleNavigateBack} variant="ghost" size="sm">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Revenues
                </Button>
            </div>

            <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-pulse-cream-dark text-pulse-green font-bold text-xl shrink-0">
                        {getInitialsFromName(
                            revenue.completed_order.customer.name,
                        )}
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <h2 className="text-lg font-bold text-pulse-green-dark">
                                {revenue.completed_order.customer.name}
                            </h2>
                        </div>
                        <p className="text-sm text-app-secondary">
                            {revenue.completed_order.customer.email}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-pulse-green">
                            <span className="flex items-center gap-1">
                                <Hash className="w-3 h-3" />
                                {revenue.id}
                            </span>
                            {revenue.shipment_details?.length > NO_VALUE && (
                                <span className="flex items-center gap-1">
                                    <Package className="w-3 h-3" />
                                    Shipment ID:{" "}
                                    <span
                                        onClick={() =>
                                            handleNavigateToShipment(
                                                revenue.shipment_details[0].id,
                                            )
                                        }
                                        className="cursor-pointer underline"
                                    >
                                        {revenue.shipment_details[0].id}
                                    </span>
                                </span>
                            )}
                            <span className="flex items-center gap-1">
                                <DollarSign className="w-3 h-3" />
                                {revenue.revenue_amount}
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {getFormattedDate(revenue.created_at)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <StatChipCard
                    icon={<Package className="w-4 h-4" />}
                    label="Items"
                    value={`${revenue.completed_order.totalOrderedItems} item${revenue.completed_order.totalOrderedItems !== 1 ? "s" : ""}`}
                />
                <StatChipCard
                    icon={<DollarSign className="w-4 h-4" />}
                    label="Total Amount"
                    value={formatNumberCurrency(
                        revenue.completed_order.total_amount,
                    )}
                />
                <StatChipCard
                    icon={<DollarSign className="w-4 h-4" />}
                    label="Revenue Amount"
                    value={formatNumberCurrency(revenue.revenue_amount)}
                />
                <StatChipCard
                    icon={<DollarSign className="w-4 h-4" />}
                    label="Profit"
                    value={formatNumberCurrency(revenue.profit)}
                />
                <StatChipCard
                    icon={<CreditCard className="w-4 h-4" />}
                    label="Payment Method"
                    value={PaymentMethodsWithHelpers.getDisplayTextKey(
                        revenue.completed_order
                            .payment_method as PaymentMethodsType,
                    )}
                />
            </div>

            <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-6">
                {revenue.order_items.map((item) => (
                    <OrderRevenueCard
                        orderId={item.id}
                        productId={item.product_id}
                        productName={item.product_name}
                        productSku={item.product_sku}
                        productCategory={item.product_category}
                        quantity={item.quantity}
                        retailPrice={item.retail_price}
                        costPrice={item.cost_price}
                        totalAmount={item.total_amount}
                        profit={item.profit}
                        onProductIdClick={() =>
                            handleNavigateToProduct(item.product_id)
                        }
                        onOrderIdClick={() => handleNavigateToOrder(item.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default RevenueDetails;
