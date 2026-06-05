import {
    ArrowLeft,
    Mail,
    Phone,
    MapPin,
    ShoppingBag,
    Calendar,
    Hash,
} from "lucide-react";

import ChartCard from "@/components/custom/CustomCards/ChartCard";
import { DataTable } from "@/components/custom/DataTable";
import { cn } from "@/lib/utils";
import { customerOrderColumns } from "./CustomerDetails.Config";
import InfoCard from "@/components/custom/CustomCards/InfoCard";
import Button from "@/components/custom/CustomButton/CustomButton";
import StatChipCard from "@/components/custom/CustomCards/StatChipCard";
import { useCustomerDetails } from "./CustomerDetails.Container";
import { getInitialsFromName } from "@/utils/common.utils";
import {
    UserStatusWithHelpers,
    type UserStatusType,
} from "@/constants/user-status.constants";
import { getFormattedDate } from "@/utils/dateTime.utils";
import { formatAddress } from "@/utils/stringUtils";
import CustomerDetailsSkeleton from "./CustomerDetails.Skeleton";

const CustomerDetails = () => {
    const {
        customer,
        isCustomerDetailsLoading,
        customerOrders,
        handelNavigateBack,
    } = useCustomerDetails();

    if (isCustomerDetailsLoading) {
        return <CustomerDetailsSkeleton />;
    }

    if (!customer) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <p className="text-lg font-semibold text-pulse-green-dark">
                    Customer not found
                </p>
                <Button onClick={handelNavigateBack} variant="ghost" size="sm">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Customers
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 p-4 sm:p-6 min-h-0">
            <div className="flex">
                <Button onClick={handelNavigateBack} variant="ghost" size="sm">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Customers
                </Button>
            </div>

            <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-pulse-cream-dark text-pulse-green font-bold text-xl shrink-0">
                        {getInitialsFromName(customer.fullName!)}
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <h2 className="text-lg font-bold text-pulse-green-dark">
                                {customer.fullName}
                            </h2>
                            <span
                                className={cn(
                                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
                                    UserStatusWithHelpers.getLabelClass(
                                        customer.status as UserStatusType,
                                    ),
                                )}
                            >
                                {UserStatusWithHelpers.getDisplayTextKey(
                                    customer.status as UserStatusType,
                                )}
                            </span>
                        </div>
                        <p className="text-sm text-app-secondary">
                            {customer.email}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-pulse-green">
                            <span className="flex items-center gap-1">
                                <Hash className="w-3 h-3" />
                                {customer.id}
                            </span>
                            <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {formatAddress(customer.address!)}
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                Joined {getFormattedDate(customer.createdAt)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                <StatChipCard
                    icon={<ShoppingBag className="w-4 h-4" />}
                    label="Total Orders"
                    value={customer.total_orders.toString()}
                />
                <StatChipCard
                    icon={<Calendar className="w-4 h-4" />}
                    label="Last Order"
                    value={getFormattedDate(customer.last_order)}
                />
                <StatChipCard
                    icon={<Calendar className="w-4 h-4" />}
                    label="Member since"
                    value={getFormattedDate(customer.createdAt)}
                />
            </div>

            <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-5 flex flex-col gap-4">
                <h3 className="text-sm font-semibold text-pulse-green-dark border-b border-pulse-cream-dark pb-3">
                    Contact Information
                </h3>
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <InfoCard
                        icon={<Mail className="w-4 h-4" />}
                        label="Email"
                        value={customer.email}
                    />
                    <InfoCard
                        icon={<Phone className="w-4 h-4" />}
                        label="Phone"
                        value={customer.phone!}
                    />
                    <InfoCard
                        icon={<MapPin className="w-4 h-4" />}
                        label="Location"
                        value={formatAddress(customer.address!)}
                    />
                    <InfoCard
                        icon={<Calendar className="w-4 h-4" />}
                        label="Member since"
                        value={getFormattedDate(customer.createdAt)}
                    />
                </div>
            </div>

            <ChartCard
                title="Order History"
                subtitle="All orders placed by this customer"
                className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card py-1"
                bodyClassName="px-0 py-0"
            >
                <DataTable
                    id="customer-orders"
                    data={customerOrders || []}
                    columns={customerOrderColumns}
                    features={{
                        rowSelection: false,
                        pagination: true,
                        sorting: true,
                        filtering: false,
                        columnVisibility: false,
                        globalSearch: false,
                    }}
                />
            </ChartCard>
        </div>
    );
};

export default CustomerDetails;
