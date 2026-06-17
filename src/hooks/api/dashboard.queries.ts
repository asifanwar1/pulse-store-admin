import {
    GetDashboardStats,
    GetRevenueOverview,
    GetOrdersByCategory,
    GetSalesDistribution,
    GetCustomerGrowth,
    GetWeeklySales,
    GetTopProducts,
    GetLowStockAlerts,
} from "@/api";
import type {
    TGetYearParam,
    TGetTargetDateParam,
    TGetLimitParam,
    TGetLowStockParams,
} from "@/api/services/dashboard/dashboard.request.types";
import DASHBOARD_QUERY_KEYS from "@/api/services/dashboard/queryKeys";
import { useStore } from "@/store/store";
import { useQuery } from "@tanstack/react-query";

export const useGetDashboardStats = (enabled?: boolean) => {
    const isAuthenticated = useStore((state) => state.isAuthenticated);

    return useQuery({
        queryKey: [DASHBOARD_QUERY_KEYS.STATS],
        queryFn: () => GetDashboardStats(),
        enabled: enabled !== false && isAuthenticated,
    });
};

export const useGetRevenueOverview = (
    params?: TGetYearParam,
    enabled?: boolean,
) => {
    const isAuthenticated = useStore((state) => state.isAuthenticated);
    const year = params?.year;

    return useQuery({
        queryKey: [DASHBOARD_QUERY_KEYS.REVENUE_OVERVIEW, year],
        queryFn: () => GetRevenueOverview({ ...params }),
        enabled: enabled !== false && isAuthenticated,
    });
};

export const useGetOrdersByCategory = (
    params?: TGetYearParam,
    enabled?: boolean,
) => {
    const isAuthenticated = useStore((state) => state.isAuthenticated);
    const year = params?.year;

    return useQuery({
        queryKey: [DASHBOARD_QUERY_KEYS.ORDERS_BY_CATEGORY, year],
        queryFn: () => GetOrdersByCategory({ ...params }),
        enabled: enabled !== false && isAuthenticated,
    });
};

export const useGetSalesDistribution = (
    params?: TGetYearParam,
    enabled?: boolean,
) => {
    const isAuthenticated = useStore((state) => state.isAuthenticated);
    const year = params?.year;

    return useQuery({
        queryKey: [DASHBOARD_QUERY_KEYS.SALES_DISTRIBUTION, year],
        queryFn: () => GetSalesDistribution({ ...params }),
        enabled: enabled !== false && isAuthenticated,
    });
};

export const useGetCustomerGrowth = (
    params?: TGetYearParam,
    enabled?: boolean,
) => {
    const isAuthenticated = useStore((state) => state.isAuthenticated);
    const year = params?.year;

    return useQuery({
        queryKey: [DASHBOARD_QUERY_KEYS.CUSTOMER_GROWTH, year],
        queryFn: () => GetCustomerGrowth({ ...params }),
        enabled: enabled !== false && isAuthenticated,
    });
};

export const useGetWeeklySales = (
    params?: TGetTargetDateParam,
    enabled?: boolean,
) => {
    const isAuthenticated = useStore((state) => state.isAuthenticated);
    const targetDate = params?.target_date;

    return useQuery({
        queryKey: [DASHBOARD_QUERY_KEYS.WEEKLY_SALES, targetDate],
        queryFn: () => GetWeeklySales({ ...params }),
        enabled: enabled !== false && isAuthenticated,
    });
};

export const useGetTopProducts = (
    params?: TGetLimitParam,
    enabled?: boolean,
) => {
    const isAuthenticated = useStore((state) => state.isAuthenticated);
    const limit = params?.limit;

    return useQuery({
        queryKey: [DASHBOARD_QUERY_KEYS.TOP_PRODUCTS, limit],
        queryFn: () => GetTopProducts({ ...params }),
        enabled: enabled !== false && isAuthenticated,
    });
};

export const useGetLowStockAlerts = (
    params?: TGetLowStockParams,
    enabled?: boolean,
) => {
    const isAuthenticated = useStore((state) => state.isAuthenticated);
    const threshold = params?.reorder_threshold;
    const limit = params?.limit;

    return useQuery({
        queryKey: [DASHBOARD_QUERY_KEYS.LOW_STOCK_ALERTS, threshold, limit],
        queryFn: () => GetLowStockAlerts({ ...params }),
        enabled: enabled !== false && isAuthenticated,
    });
};
