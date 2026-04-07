import { useParams, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Mail,
    Phone,
    MapPin,
    ShoppingBag,
    DollarSign,
    Calendar,
    TrendingUp,
    Hash,
} from "lucide-react";

import { customersListData, customerDetailsMap } from "@/mock/customer.mock";
import ChartCard from "@/components/custom/CustomCards/ChartCard";
import { DataTable } from "@/components/custom/DataTable";
import { cn } from "@/lib/utils";
import { APP_ROUTES } from "@/routes/appRoutes";
import { customerOrderColumns } from "./CustomerDetails.Config";
import { STATUS_CONFIG } from "../CustomerManagement.Config";
import InfoCard from "@/components/custom/CustomCards/InfoCard";
import Button from "@/components/custom/CustomButton/CustomButton";

function StatChip({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-pulse-cream-dark shadow-dash-card flex-1 min-w-0">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-pulse-cream-dark shrink-0 text-pulse-green">
                {icon}
            </div>
            <div className="min-w-0">
                <p className="text-xss text-app-secondary truncate">{label}</p>
                <p className="text-sm font-bold text-pulse-green-dark truncate">
                    {value}
                </p>
            </div>
        </div>
    );
}

// ─── Info row ─────────────────────────────────────────────────────────────────

// ─── Orders table columns ─────────────────────────────────────────────────────

// ─── Main component ───────────────────────────────────────────────────────────

export default function CustomerDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const customer = customersListData.find((c) => c.id === id);
    const details = id ? customerDetailsMap[id] : undefined;

    if (!customer || !details) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <p className="text-lg font-semibold text-pulse-green-dark">
                    Customer not found
                </p>
                <button
                    onClick={() => navigate(APP_ROUTES.CUSTOMERS)}
                    className="flex items-center gap-2 text-sm text-pulse-green hover:text-pulse-green-dark transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Customers
                </button>
            </div>
        );
    }

    const statusBadge = STATUS_CONFIG[customer.status];

    return (
        <div className="flex flex-col gap-6 p-4 sm:p-6 min-h-0">
            <div className="flex">
                <Button
                    onClick={() => navigate(APP_ROUTES.CUSTOMERS)}
                    variant="ghost"
                    size="sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Customers
                </Button>
            </div>

            {/* Profile header */}
            <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-pulse-cream-dark text-pulse-green font-bold text-xl shrink-0">
                        {customer.initials}
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <h2 className="text-lg font-bold text-pulse-green-dark">
                                {customer.name}
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
                            {customer.email}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-pulse-green">
                            <span className="flex items-center gap-1">
                                <Hash className="w-3 h-3" />
                                {customer.id}
                            </span>
                            <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {customer.location}
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                Joined {customer.joinedDate}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stat chips */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <StatChip
                    icon={<ShoppingBag className="w-4 h-4" />}
                    label="Total Orders"
                    value={customer.totalOrders.toString()}
                />
                <StatChip
                    icon={<DollarSign className="w-4 h-4" />}
                    label="Total Spend"
                    value={`$${customer.totalSpend.toLocaleString()}`}
                />
                <StatChip
                    icon={<TrendingUp className="w-4 h-4" />}
                    label="Avg. Order Value"
                    value={`$${customer.avgOrderValue.toLocaleString()}`}
                />
                <StatChip
                    icon={<Calendar className="w-4 h-4" />}
                    label="Last Order"
                    value={customer.lastOrderDate}
                />
            </div>

            {/* Contact info + Spend overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-5 flex flex-col gap-4">
                    <h3 className="text-sm font-semibold text-pulse-green-dark border-b border-pulse-cream-dark pb-3">
                        Contact Information
                    </h3>
                    <div className="flex flex-col gap-3.5">
                        <InfoCard
                            icon={<Mail className="w-4 h-4" />}
                            label="Email"
                            value={customer.email}
                        />
                        <InfoCard
                            icon={<Phone className="w-4 h-4" />}
                            label="Phone"
                            value={customer.phone}
                        />
                        <InfoCard
                            icon={<MapPin className="w-4 h-4" />}
                            label="Location"
                            value={customer.location}
                        />
                        <InfoCard
                            icon={<Calendar className="w-4 h-4" />}
                            label="Member since"
                            value={customer.joinedDate}
                        />
                    </div>
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
                    data={details.recentOrders}
                    columns={customerOrderColumns}
                    features={{
                        rowSelection: false,
                        pagination: false,
                        sorting: true,
                        filtering: false,
                        columnVisibility: false,
                        globalSearch: false,
                    }}
                />
            </ChartCard>
        </div>
    );
}
