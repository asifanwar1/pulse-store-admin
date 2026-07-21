import { useQueryState } from "nuqs";

import Config from "@/Config";
import {
    useGetRevenueAnalytics,
    useGetRevenues,
} from "@/hooks/api/revenue.queries";
import { useTablePagination, withPageReset } from "@/hooks/useTablePagination";

export const useRevenueManagement = () => {
    const [search, setSearchRaw] = useQueryState("search", {
        defaultValue: "",
    });
    const [pageSize, setPageSizeRaw] = useQueryState("pageSize", {
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
        limit: pageSize,
    });

    const { data: revenueAnalyticsData, isPending: isRevenueAnalyticsLoading } =
        useGetRevenueAnalytics();

    const isRevenueLoading = isRevenueAnalyticsLoading || isRevenueDataLoading;

    const { pageCount, setPageSize, onPaginationChange } = useTablePagination({
        pageSize,
        setPage,
        setPageSize: setPageSizeRaw,
        totalCount: revenueTotalCount,
    });

    return {
        isRevenueLoading,
        page,
        pageSize,
        pageCount,
        revenue,
        revenueTotalCount,
        revenueAnalyticsData,
        setPage,
        setSearch: withPageReset(setSearchRaw, setPage),
        setPageSize,
        onPaginationChange,
    };
};
