import { useState } from "react";
import { useQueryState } from "nuqs";

import Config from "@/Config";
import {
    useGetOrders,
    useGetOrdersAnalytics,
} from "@/hooks/api/orders.queries";
import { useGetUsersPaginated } from "@/hooks/api/user.queries";
import { useTablePagination, withPageReset } from "@/hooks/useTablePagination";
import { ORDER_STATUS_OPTIONS } from "@/constants/order-status.constants";
import type { FilterItem } from "@/components/custom/FilterBar";

export const useOrderManagement = () => {
    const [search, setSearchRaw] = useQueryState("search", {
        defaultValue: "",
    });
    const [pageSize, setPageSizeRaw] = useQueryState("pageSize", {
        defaultValue: Config.LIMIT,
        parse: Number,
        serialize: String,
    });
    const [status, setStatusRaw] = useState<string | null>(null);
    const [customerId, setCustomerIdRaw] = useState<string | null>(null);
    const [customerSearch, setCustomerSearch] = useState("");

    const {
        data: orders,
        count: ordersTotalCount,
        isPending: isOrdersDataLoading,
        page,
        setPage,
    } = useGetOrders({
        search,
        limit: pageSize,
        status: status as never,
        user_id: customerId ? Number(customerId) : undefined,
    });

    const { data: ordersAnalyticsData, isPending: isOrdersAnalyticsLoading } =
        useGetOrdersAnalytics();

    const {
        data: customers = [],
        fetchNextPage: fetchNextCustomersPage,
        hasNextPage: hasMoreCustomers,
        isFetchingNextPage: isFetchingMoreCustomers,
    } = useGetUsersPaginated({ search: customerSearch, limit: 20 });

    const customerOptions = customers.map((customer) => ({
        label: customer.fullName,
        value: String(customer.id),
    }));

    const isOrdersLoading = isOrdersAnalyticsLoading || isOrdersDataLoading;

    const { pageCount, setPageSize, onPaginationChange } = useTablePagination({
        pageSize,
        setPage,
        setPageSize: setPageSizeRaw,
        totalCount: ordersTotalCount,
    });

    const setSearch = withPageReset(setSearchRaw, setPage);
    const setStatus = withPageReset(setStatusRaw, setPage);
    const setCustomerId = withPageReset(setCustomerIdRaw, setPage);

    const filterItems: FilterItem[] = [
        {
            type: "search",
            key: "search",
            placeholder: "Search orders...",
            onSearch: setSearch,
        },
        {
            type: "select",
            key: "status",
            placeholder: "All Statuses",
            value: status
                ? ORDER_STATUS_OPTIONS.find((opt) => opt.value === status)
                : null,
            options: ORDER_STATUS_OPTIONS,
            onChange: (value) =>
                setStatus(value && !Array.isArray(value) ? value.value : null),
            clearable: true,
        },
        {
            type: "select",
            key: "customer",
            placeholder: "All Customers",
            value: customerId
                ? customerOptions.find((opt) => opt.value === customerId)
                : null,
            options: customerOptions,
            onChange: (value) =>
                setCustomerId(
                    value && !Array.isArray(value) ? value.value : null,
                ),
            clearable: true,
            autoComplete: true,
            onSearch: setCustomerSearch,
            hasMore: hasMoreCustomers,
            isFetchingNextPage: isFetchingMoreCustomers,
            onScroll: fetchNextCustomersPage,
        },
    ];

    return {
        orders,
        ordersTotalCount,
        isOrdersLoading,
        ordersAnalyticsData,
        page,
        search,
        pageSize,
        pageCount,
        filterItems,
        setPage,
        setSearch,
        setPageSize,
        onPaginationChange,
    };
};
