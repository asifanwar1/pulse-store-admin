import { useQueryState } from "nuqs";

import Config from "@/Config";
import {
    useGetProductAnalytics,
    useGetProducts,
} from "@/hooks/api/products.queries";

import type { TProductAnalyticsMetric } from "@/api/services/products/products.response";

const mapAnalyticsMetricToStat = (metric?: TProductAnalyticsMetric) => {
    const raw = metric?.change_percentage ?? "0";
    const parsed = parseFloat(String(raw).replace("%", ""));

    const trendingValue = Number.isFinite(parsed) ? Math.abs(parsed) : 0;
    const trendDirection: "up" | "down" = parsed >= 0 ? "up" : "down";

    return {
        value: metric?.value ?? 0,
        trend: trendingValue,
        trendDirection,
        prefix: "",
        suffix: "",
    };
};

export const useProductManagement = () => {
    const [search, setSearch] = useQueryState("search", { defaultValue: "" });
    const [pageSize, setPageSize] = useQueryState("pageSize", {
        defaultValue: Config.LIMIT,
        parse: Number,
        serialize: String,
    });

    const {
        data: products,
        count: productsTotalCount,
        isPending: isProductsDataLoading,
        page,
        setPage,
    } = useGetProducts({
        search,
        page: 1,
        limit: pageSize,
    });

    const {
        data: productsAnalyticsData,
        isPending: isProductsAnalyticsLoading,
    } = useGetProductAnalytics();

    const isProductsLoading =
        isProductsAnalyticsLoading || isProductsDataLoading;

    return {
        products,
        productsTotalCount,
        isProductsLoading,
        productsAnalyticsData,
        page,
        search,
        pageSize,
        setPage,
        setSearch,
        setPageSize,
        mapAnalyticsMetricToStat,
    };
};
