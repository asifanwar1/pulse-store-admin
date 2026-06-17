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

    const isLoading =
        isDashboardStatsLoading ||
        isRevenueOverviewLoading ||
        isOrdersByCategoryLoading ||
        isSalesDistributionLoading ||
        isCustomerGrowthLoading ||
        isWeeklySalesLoading ||
        isTopProductsLoading ||
        isLowStockAlertsLoading;

    return {
        dashboardStats,
        revenueOverview,
        ordersByCategory,
        salesDistribution,
        customerGrowth,
        weeklySales,
        topProducts,
        lowStockAlerts,
        isLoading,
        isDashboardStatsLoading,
        isRevenueOverviewLoading,
        isOrdersByCategoryLoading,
        isSalesDistributionLoading,
        isCustomerGrowthLoading,
        isWeeklySalesLoading,
        isTopProductsLoading,
        isLowStockAlertsLoading,
    };
};
