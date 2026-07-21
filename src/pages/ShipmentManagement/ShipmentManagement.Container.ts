import Config from "@/Config";
import {
    useGetShipmentAnalytics,
    useGetShipments,
} from "@/hooks/api/shipment.queries";
import { useQueryState } from "nuqs";
import { useTablePagination, withPageReset } from "@/hooks/useTablePagination";

export const useShipmentManagement = () => {
    const [search, setSearchRaw] = useQueryState("search", {
        defaultValue: "",
    });
    const [pageSize, setPageSizeRaw] = useQueryState("pageSize", {
        defaultValue: Config.LIMIT,
        parse: Number,
        serialize: String,
    });

    const {
        data: shipments,
        count: shipmentsTotalCount,
        isPending: isShipmentLoading,
        page,
        setPage,
    } = useGetShipments({
        search,
        limit: pageSize,
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

    return {
        shipments,
        shipmentsTotalCount,
        isShipmentsDataLoading,
        shipmentAnalyticsData,
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
