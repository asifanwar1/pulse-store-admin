import { useQueryState } from "nuqs";

import Config from "@/Config";
import {
    useGetOrders,
    useGetOrdersAnalytics,
} from "@/hooks/api/orders.queries";
import { useTablePagination, withPageReset } from "@/hooks/useTablePagination";

export const useOrderManagement = () => {
    const [search, setSearchRaw] = useQueryState("search", {
        defaultValue: "",
    });
    const [pageSize, setPageSizeRaw] = useQueryState("pageSize", {
        defaultValue: Config.LIMIT,
        parse: Number,
        serialize: String,
    });

    const {
        data: orders,
        count: ordersTotalCount,
        isPending: isOrdersDataLoading,
        page,
        setPage,
    } = useGetOrders({
        search,
        limit: pageSize,
    });

    const { data: ordersAnalyticsData, isPending: isOrdersAnalyticsLoading } =
        useGetOrdersAnalytics();

    const isOrdersLoading = isOrdersAnalyticsLoading || isOrdersDataLoading;

    const { pageCount, setPageSize, onPaginationChange } = useTablePagination({
        pageSize,
        setPage,
        setPageSize: setPageSizeRaw,
        totalCount: ordersTotalCount,
    });

    return {
        orders,
        ordersTotalCount,
        isOrdersLoading,
        ordersAnalyticsData,
        page,
        search,
        pageSize,
        pageCount,
        setPage,
        setSearch: withPageReset(setSearchRaw, setPage),
        setPageSize,
        onPaginationChange,
    };
};
