import { HTTP_METHODS } from "@/constants";
import { request } from "@/api/client/request";
import type { WithSignal } from "@/api/types/common";
import type * as T from "./dashboard.response.types";
import type * as R from "./dashboard.request.types";
import type { TQueryParams } from "@/api/types/common";

export const GetDashboardStats = async (params?: WithSignal<{}>) => {
    const { signal } = params || {};
    return request<T.TDashboardAnalyticsResponse>({
        method: HTTP_METHODS.GET,
        url: "/dashboard/stats",
        signal,
    });
};

export const GetRevenueOverview = async (
    params?: WithSignal<R.TGetYearParam>,
) => {
    const { signal, ...urlParams } = params || {};
    return request<T.RevenueOverviewResponse>({
        method: HTTP_METHODS.GET,
        url: "/dashboard/charts/revenue-overview",
        params: urlParams as R.TGetYearParam,
        signal,
    });
};

export const GetOrdersByCategory = async (
    params?: WithSignal<R.TGetYearParam>,
) => {
    const { signal, ...urlParams } = params || {};
    return request<T.OrdersByCategoryResponse>({
        method: HTTP_METHODS.GET,
        url: "/dashboard/charts/orders-by-category",
        params: urlParams as R.TGetYearParam,
        signal,
    });
};

export const GetSalesDistribution = async (
    params?: WithSignal<R.TGetYearParam>,
) => {
    const { signal, ...urlParams } = params || {};
    return request<T.SalesDistributionResponse>({
        method: HTTP_METHODS.GET,
        url: "/dashboard/charts/sales-distribution",
        params: urlParams as R.TGetYearParam,
        signal,
    });
};

export const GetCustomerGrowth = async (
    params?: WithSignal<R.TGetYearParam>,
) => {
    const { signal, ...urlParams } = params || {};
    return request<T.CustomerGrowthResponse>({
        method: HTTP_METHODS.GET,
        url: "/dashboard/charts/customer-growth",
        params: urlParams as R.TGetYearParam,
        signal,
    });
};

export const GetWeeklySales = async (
    params?: WithSignal<R.TGetTargetDateParam>,
) => {
    const { signal, ...urlParams } = params || {};
    const filteredParams = Object.fromEntries(
        Object.entries(urlParams).filter(
            ([_, v]) => v !== null && v !== undefined,
        ),
    ) as TQueryParams;

    return request<T.WeeklySalesResponse>({
        method: HTTP_METHODS.GET,
        url: "/dashboard/charts/weekly-sales",
        params: filteredParams,
        signal,
    });
};

export const GetTopProducts = async (params?: WithSignal<R.TGetLimitParam>) => {
    const { signal, ...urlParams } = params || {};
    return request<T.TopProductsResponse>({
        method: HTTP_METHODS.GET,
        url: "/dashboard/charts/top-products",
        params: urlParams as R.TGetLimitParam,
        signal,
    });
};

export const GetLowStockAlerts = async (
    params?: WithSignal<R.TGetLowStockParams>,
) => {
    const { signal, ...urlParams } = params || {};
    return request<T.LowStockAlertsResponse>({
        method: HTTP_METHODS.GET,
        url: "/dashboard/charts/low-stock-alerts",
        params: urlParams as R.TGetLowStockParams,
        signal,
    });
};
