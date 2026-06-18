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
import { useDashboard } from "./Dashboard.Container";
import { mapAnalyticsMetricToStat } from "@/utils/analytics.utils";

export default function Dashboard() {
    const {
        dashboardStats,
        revenueOverview,
        ordersByCategoryChartData,
        salesDistributionChartData,
        customerGrowth,
        weeklySalesChartData,
        recentOrders,
        topProductsData,
        lowStockAlertsData,
    } = useDashboard();

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
                        const stat = mapAnalyticsMetricToStat(
                            dashboardStats?.[key],
                        );
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

            <RevenueAreaChart data={revenueOverview} />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                <div className="lg:col-span-3">
                    <OrdersByCategoryChart data={ordersByCategoryChartData} />
                </div>
                <div className="lg:col-span-2">
                    <SalesDistributionChart data={salesDistributionChartData} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <CustomerGrowthChart data={customerGrowth} />
                <WeeklySalesChart data={weeklySalesChartData} />
            </div>

            <RecentOrders data={recentOrders} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <TopProducts data={topProductsData} />
                <LowStockAlert data={lowStockAlertsData} />
            </div>
        </div>
    );
}
