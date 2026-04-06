import { dashboardStatsData } from "@/mock/dashboard.mock";
import { StatCard } from "@/components/custom/CustomCards";
import RevenueAreaChart from "./components/RevenueAreaChart";
import OrdersByCategoryChart from "./components/OrdersByCategoryChart";
import SalesDistributionChart from "./components/SalesDistributionChart";
import CustomerGrowthChart from "./components/CustomerGrowthChart";
import WeeklySalesChart from "./components/WeeklySalesChart";
import TopProducts from "./components/TopProducts";
import RecentOrders from "./components/RecentOrders";
import LowStockAlert from "./components/LowStockAlert";
import { formatStatValue } from "@/utils/common.utils";
import { STAT_CONFIG } from "./Dashboard.Config";

export default function Dashboard() {
    return (
        <div className="flex flex-col gap-6 p-4 sm:p-6 min-h-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {STAT_CONFIG.map(
                    ({
                        key,
                        title,
                        icon,
                        iconBgClass,
                        iconColorClass,
                        subtitle,
                    }) => {
                        const stat = dashboardStatsData[key];
                        return (
                            <StatCard
                                key={key}
                                title={title}
                                value={formatStatValue(stat)}
                                trend={stat.trend}
                                trendDirection={stat.trendDirection}
                                icon={icon}
                                iconBgClass={iconBgClass}
                                iconColorClass={iconColorClass}
                                subtitle={subtitle}
                            />
                        );
                    },
                )}
            </div>

            {/* ── Revenue Area Chart (full width) ── */}
            <RevenueAreaChart />

            {/* ── Middle row: Orders by Category + Sales Distribution ── */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                <div className="lg:col-span-3">
                    <OrdersByCategoryChart />
                </div>
                <div className="lg:col-span-2">
                    <SalesDistributionChart />
                </div>
            </div>

            {/* ── Customer Growth + Weekly Sales ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <CustomerGrowthChart />
                <WeeklySalesChart />
            </div>

            {/* ── Recent Orders (full width) ── */}
            <RecentOrders />

            {/* ── Bottom: Top Products + Low Stock ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <TopProducts />
                <LowStockAlert />
            </div>
        </div>
    );
}
