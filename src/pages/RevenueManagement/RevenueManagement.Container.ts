import { useQueryState } from "nuqs";

import Config from "@/Config";
import {
    useGetRevenueAnalytics,
    useGetRevenues,
} from "@/hooks/api/revenue.queries";

export const useRevenueManagement = () => {
    const [search, setSearch] = useQueryState("search", { defaultValue: "" });
    const [pageSize, setPageSize] = useQueryState("pageSize", {
        defaultValue: Config.LIMIT,
        parse: Number,
        serialize: String,
    });

    const {
        data: revenue,
        count: revenueTotalCount,
        isPending: isRevenueDataLoading,
        page,
        setPage,
    } = useGetRevenues({
        search,
        page: 1,
        limit: pageSize,
    });

    const { data: revenueAnalyticsData, isPending: isRevenueAnalyticsLoading } =
        useGetRevenueAnalytics();

    const isRevenueLoading = isRevenueAnalyticsLoading || isRevenueDataLoading;

    return {
        isRevenueLoading,
        page,
        revenue,
        revenueTotalCount,
        revenueAnalyticsData,
        setPage,
        setSearch,
        setPageSize,
    };
};
