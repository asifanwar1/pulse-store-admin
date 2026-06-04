import { useQueryState } from "nuqs";

import Config from "@/Config";

import type { TProductAnalyticsMetric } from "@/api/services/products/products.response";
import { useGetUsers, useGetUsersAnalytics } from "@/hooks/api/user.queries";

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

export const useCustomerManagement = () => {
    const [search, setSearch] = useQueryState("search", { defaultValue: "" });
    const [pageSize, setPageSize] = useQueryState("pageSize", {
        defaultValue: Config.LIMIT,
        parse: Number,
        serialize: String,
    });

    const {
        data: users,
        count: usersTotalCount,
        isPending: isUsersDataLoading,
        page,
        setPage,
    } = useGetUsers({
        search,
        page: 1,
        limit: pageSize,
        column: "created_at",
        user_type: "CUSTOMER",
    });

    const { data: usersAnalyticsData, isPending: isUsersAnalyticsLoading } =
        useGetUsersAnalytics();

    const isUserDataLoading = isUsersAnalyticsLoading || isUsersDataLoading;

    return {
        users,
        usersTotalCount,
        isUserDataLoading,
        usersAnalyticsData,
        page,
        search,
        pageSize,
        setPage,
        setSearch,
        setPageSize,
        mapAnalyticsMetricToStat,
    };
};
