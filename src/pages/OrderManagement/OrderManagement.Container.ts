import { useQueryState } from "nuqs";

import Config from "@/Config";
import {
    useGetOrders,
    useGetOrdersAnalytics,
} from "@/hooks/api/orders.queries";

export const useOrderManagement = () => {
    const [search, setSearch] = useQueryState("search", { defaultValue: "" });
    const [pageSize, setPageSize] = useQueryState("pageSize", {
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
        page: 1,
        limit: pageSize,
    });

    const { data: ordersAnalyticsData, isPending: isOrdersAnalyticsLoading } =
        useGetOrdersAnalytics();

    const isOrdersLoading = isOrdersAnalyticsLoading || isOrdersDataLoading;

    return {
        orders,
        ordersTotalCount,
        isOrdersLoading,
        ordersAnalyticsData,
        page,
        search,
        pageSize,
        setPage,
        setSearch,
        setPageSize,
    };
};
