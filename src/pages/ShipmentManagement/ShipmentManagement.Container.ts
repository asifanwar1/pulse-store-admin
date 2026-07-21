import { useState } from "react";
import Config from "@/Config";
import {
    useGetShipmentAnalytics,
    useGetShipments,
} from "@/hooks/api/shipment.queries";
import { useQueryState } from "nuqs";
import { useTablePagination, withPageReset } from "@/hooks/useTablePagination";
import { SHIPMENT_STATUS_OPTIONS } from "@/constants/shipment-status.constants";
import type { FilterItem } from "@/components/custom/FilterBar";

export const useShipmentManagement = () => {
    const [search, setSearchRaw] = useQueryState("search", {
        defaultValue: "",
    });
    const [pageSize, setPageSizeRaw] = useQueryState("pageSize", {
        defaultValue: Config.LIMIT,
        parse: Number,
        serialize: String,
    });
    const [status, setStatusRaw] = useState<string | null>(null);

    const {
        data: shipments,
        count: shipmentsTotalCount,
        isPending: isShipmentLoading,
        page,
        setPage,
    } = useGetShipments({
        search,
        limit: pageSize,
        status: status as never,
    });

    const {
        data: shipmentAnalyticsData,
        isPending: isShipmentAnalyticsLoading,
    } = useGetShipmentAnalytics();

    const isShipmentsDataLoading =
        isShipmentAnalyticsLoading || isShipmentLoading;

    const { pageCount, setPageSize, onPaginationChange } = useTablePagination({
        pageSize,
        setPage,
        setPageSize: setPageSizeRaw,
        totalCount: shipmentsTotalCount,
    });

    const setSearch = withPageReset(setSearchRaw, setPage);
    const setStatus = withPageReset(setStatusRaw, setPage);

    const filterItems: FilterItem[] = [
        {
            type: "search",
            key: "search",
            placeholder: "Search shipments...",
            onSearch: setSearch,
        },
        {
            type: "select",
            key: "status",
            placeholder: "All Statuses",
            value: status
                ? SHIPMENT_STATUS_OPTIONS.find((opt) => opt.value === status)
                : null,
            options: SHIPMENT_STATUS_OPTIONS,
            onChange: (value) =>
                setStatus(value && !Array.isArray(value) ? value.value : null),
            clearable: true,
        },
    ];

    return {
        shipments,
        shipmentsTotalCount,
        isShipmentsDataLoading,
        shipmentAnalyticsData,
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
