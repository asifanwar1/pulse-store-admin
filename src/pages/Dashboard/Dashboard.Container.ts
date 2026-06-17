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

export interface OrdersByCategoryChartItem {
    category: string;
    orders: number;
    color: string;
}

export interface SalesDistributionChartItem {
    name: string;
    value: number;
    color: string;
}

export interface CustomerGrowthChartItem {
    month: string;
    newCustomers: number;
}

export interface WeeklySalesChartItem {
    day: string;
    sales: number;
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

export interface TopProductItem {
    id: string;
    name: string;
    sales: number;
    revenue: number;
    stock?: number;
    initials: string;
}

export interface LowStockAlertItem {
    id: string;
    name: string;
    stock: number;
    threshold: number;
}

const emptyStat = (
    value = 0,
    options?: Pick<DashboardStatItem, "prefix" | "suffix">,
): DashboardStatItem => ({
    value,
    trend: 0,
    trendDirection: "up",
    ...options,
});

const formatMonth = (month: string) => {
    const parsed = new Date(`${month}-01T00:00:00`);
    if (!Number.isNaN(parsed.getTime())) {
        return parsed.toLocaleString("en-US", { month: "short" });
    }
    return month;
};

const formatDay = (date: string) => {
    const parsed = new Date(date);
    if (!Number.isNaN(parsed.getTime())) {
        return parsed.toLocaleString("en-US", { weekday: "short" });
    }
    return date;
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

    const avgOrderValue =
        dashboardStats?.totalOrders && dashboardStats.totalOrders > 0
            ? dashboardStats.totalRevenue / dashboardStats.totalOrders
            : 0;

    const dashboardStatsViewModel: DashboardStatsViewModel = {
        totalRevenue: emptyStat(dashboardStats?.totalRevenue ?? 0, {
            prefix: "$",
        }),
        totalOrders: emptyStat(dashboardStats?.totalOrders ?? 0),
        totalCustomers: emptyStat(dashboardStats?.totalCustomers ?? 0),
        totalProducts: emptyStat(dashboardStats?.totalProducts ?? 0),
        avgOrderValue: emptyStat(avgOrderValue, { prefix: "$" }),
        conversionRate: emptyStat(0, { suffix: "%" }),
    };

    const revenueOverviewChartData: RevenueOverviewChartItem[] =
        revenueOverview?.data?.map((item) => ({
            month: formatMonth(item.month),
            revenue: item.revenue,
        })) ?? [];

    const ordersByCategoryChartData: OrdersByCategoryChartItem[] =
        ordersByCategory?.categories?.map((item, index) => ({
            category: item.category,
            orders: item.orders,
            color: CHART_COLORS[index % CHART_COLORS.length],
        })) ?? [];

    const salesDistributionChartData: SalesDistributionChartItem[] =
        salesDistribution?.distribution?.map((item, index) => ({
            name: item.label,
            value: item.value,
            color: CHART_COLORS[index % CHART_COLORS.length],
        })) ?? [];

    const customerGrowthChartData: CustomerGrowthChartItem[] =
        customerGrowth?.data?.map((item) => ({
            month: formatMonth(item.month),
            newCustomers: item.newCustomers,
        })) ?? [];

    const weeklySalesChartData: WeeklySalesChartItem[] =
        weeklySales?.data?.map((item) => ({
            day: formatDay(item.date),
            sales: item.sales,
        })) ?? [];

    const topProductsData: TopProductItem[] =
        topProducts?.products?.map((product) => ({
            id: String(product.id),
            name: product.name,
            sales: product.sold,
            revenue: toNumber(product.revenue),
            stock:
                product.stock !== undefined ? toNumber(product.stock) : undefined,
            initials: getInitialsFromName(product.name),
        })) ?? [];

    const lowStockAlertsData: LowStockAlertItem[] =
        lowStockAlerts?.products?.map((product) => ({
            id: String(product.id),
            name: product.name,
            stock: product.stock,
            threshold: Math.max(product.reorderThreshold ?? 1, 1),
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
                status: (
                    [
                        "delivered",
                        "pending",
                        "processing",
                        "cancelled",
                        "shipped",
                    ].includes(status)
                        ? status
                        : "pending"
                ) as RecentOrderStatus,
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
        dashboardStats: dashboardStatsViewModel,
        revenueOverview: revenueOverviewChartData,
        ordersByCategory: ordersByCategoryChartData,
        salesDistribution: salesDistributionChartData,
        customerGrowth: customerGrowthChartData,
        weeklySales: weeklySalesChartData,
        recentOrders: recentOrdersData,
        topProducts: topProductsData,
        lowStockAlerts: lowStockAlertsData,
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
