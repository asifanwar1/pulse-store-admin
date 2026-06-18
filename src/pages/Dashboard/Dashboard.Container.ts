import {
    useGetDashboardStats,
    useGetRevenueOverview,
    useGetOrdersByCategory,
    useGetSalesDistribution,
    useGetCustomerGrowth,
    useGetWeeklySales,
    useGetTopProducts,
    useGetLowStockAlerts,
} from "@/hooks/api/dashboard.queries";
import { useGetOrders } from "@/hooks/api/orders.queries";
import { getInitialsFromName } from "@/utils/common.utils";

const CHART_COLORS = [
    "#3B82F6",
    "#8B5CF6",
    "#2A5C42",
    "#F59E0B",
    "#EC4899",
    "#14B8A6",
    "#F97316",
    "#6366F1",
    "#9DA5B4",
];

type TrendDirection = "up" | "down";

export interface DashboardStatItem {
    value: number;
    trend: number;
    trendDirection: TrendDirection;
    prefix?: string;
    suffix?: string;
}

export interface DashboardStatsViewModel {
    totalRevenue: DashboardStatItem;
    totalOrders: DashboardStatItem;
    totalCustomers: DashboardStatItem;
    totalProducts: DashboardStatItem;
    avgOrderValue: DashboardStatItem;
    conversionRate: DashboardStatItem;
}

export interface RevenueOverviewChartItem {
    month: string;
    revenue: number;
}

export interface CustomerGrowthChartItem {
    month: string;
    newCustomers: number;
}

export type RecentOrderStatus =
    | "delivered"
    | "pending"
    | "processing"
    | "cancelled"
    | "shipped";

export interface RecentOrderItem {
    id: string;
    customer: string;
    initials: string;
    product: string;
    category: string;
    amount: number;
    status: RecentOrderStatus;
    date: string;
}

const formatMonth = (month: string) => {
    const parsed = new Date(`${month}-01T00:00:00`);
    if (!Number.isNaN(parsed.getTime())) {
        return parsed.toLocaleString("en-US", { month: "short" });
    }
    return month;
};

const toNumber = (value: unknown) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
};

export const useDashboard = () => {
    const { data: dashboardStats, isPending: isDashboardStatsLoading } =
        useGetDashboardStats();

    const { data: revenueOverview, isPending: isRevenueOverviewLoading } =
        useGetRevenueOverview();

    const { data: ordersByCategory, isPending: isOrdersByCategoryLoading } =
        useGetOrdersByCategory();

    const { data: salesDistribution, isPending: isSalesDistributionLoading } =
        useGetSalesDistribution();

    const { data: customerGrowth, isPending: isCustomerGrowthLoading } =
        useGetCustomerGrowth();

    const { data: weeklySales, isPending: isWeeklySalesLoading } =
        useGetWeeklySales();

    const { data: topProducts, isPending: isTopProductsLoading } =
        useGetTopProducts();

    const { data: lowStockAlerts, isPending: isLowStockAlertsLoading } =
        useGetLowStockAlerts();

    const { data: recentOrders, isPending: isRecentOrdersLoading } =
        useGetOrders({
            page: 1,
            limit: 8,
            column: "created_at",
        });

    const revenueOverviewChartData: RevenueOverviewChartItem[] =
        revenueOverview?.data?.map((item) => ({
            month: formatMonth(item.month),
            revenue: item.revenue,
        })) ?? [];

    const ordersByCategoryChartData =
        ordersByCategory?.data?.map((item, index) => ({
            category: item.category,
            orders: item.orders,
            color: CHART_COLORS[index % CHART_COLORS.length],
        })) ?? [];

    const salesDistributionChartData =
        salesDistribution?.data?.map((item, index) => ({
            category: item.category,
            revenue: item.revenue,
            percentage: item.percentage,
            color: CHART_COLORS[index % CHART_COLORS.length],
        })) ?? [];

    const customerGrowthChartData: CustomerGrowthChartItem[] =
        customerGrowth?.data?.map((item) => ({
            month: formatMonth(item.month),
            newCustomers: item.newCustomers,
        })) ?? [];

    const weeklySalesChartData =
        weeklySales?.data?.map((item) => ({
            day: item.day,
            revenue: item.revenue,
            order: item.order,
        })) ?? [];

    const topProductsData =
        topProducts?.data?.map((product) => ({
            product_id: product.product_id,
            name: product.name,
            sales: product.sales,
            revenue: String(product.revenue),
            stock: toNumber(product.stock ?? 0),
            change_percentage: product.change_percentage,
            category: product.category,
            rank: product.rank,
            sku: product.sku,
        })) ?? [];

    const lowStockAlertsData =
        lowStockAlerts?.data?.map((product) => ({
            product_id: product.product_id,
            category: product.category,
            name: product.name,
            reorderThreshold: product.reorderThreshold,
            severity: product.severity,
            sku: product.sku,
            stock: toNumber(product.stock ?? 0),
            stockPercentage: product.stockPercentage,
        })) ?? [];

    const recentOrdersData: RecentOrderItem[] =
        recentOrders?.map((order) => {
            const firstItem = order.items?.[0];
            const status = String(order.status).toLowerCase();
            return {
                id: String(order.id),
                customer: order.user?.name ?? "Unknown Customer",
                initials: getInitialsFromName(order.user?.name ?? ""),
                product: firstItem?.product_name ?? "Multiple products",
                category: firstItem?.product_category ?? "-",
                amount: toNumber(order.total_amount ?? order.total),
                status: ([
                    "delivered",
                    "pending",
                    "processing",
                    "cancelled",
                    "shipped",
                ].includes(status)
                    ? status
                    : "pending") as RecentOrderStatus,
                date: order.created_at
                    ? new Date(order.created_at).toLocaleDateString("en-US")
                    : "-",
            };
        }) ?? [];

    const isLoading =
        isDashboardStatsLoading ||
        isRevenueOverviewLoading ||
        isOrdersByCategoryLoading ||
        isSalesDistributionLoading ||
        isCustomerGrowthLoading ||
        isWeeklySalesLoading ||
        isTopProductsLoading ||
        isLowStockAlertsLoading ||
        isRecentOrdersLoading;

    return {
        dashboardStats,
        revenueOverview: revenueOverviewChartData,
        ordersByCategoryChartData,
        salesDistributionChartData,
        customerGrowth: customerGrowthChartData,
        weeklySalesChartData,
        recentOrders: recentOrdersData,
        topProductsData,
        lowStockAlertsData,
        isLoading,
        isDashboardStatsLoading,
        isRevenueOverviewLoading,
        isOrdersByCategoryLoading,
        isSalesDistributionLoading,
        isCustomerGrowthLoading,
        isWeeklySalesLoading,
        isTopProductsLoading,
        isLowStockAlertsLoading,
        isRecentOrdersLoading,
    };
};
