import Config from "@/Config";
import {
    useGetShipmentAnalytics,
    useGetShipments,
} from "@/hooks/api/shipment.queries";
import { useQueryState } from "nuqs";

export const useShipmentManagement = () => {
    const [search, setSearch] = useQueryState("search", { defaultValue: "" });
    const [pageSize, setPageSize] = useQueryState("pageSize", {
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
        page: 1,
        limit: pageSize,
    });

    const {
        data: shipmentAnalyticsData,
        isPending: isShipmentAnalyticsLoading,
    } = useGetShipmentAnalytics();

    const isShipmentsDataLoading =
        isShipmentAnalyticsLoading || isShipmentLoading;

    return {
        shipments,
        shipmentsTotalCount,
        isShipmentsDataLoading,
        shipmentAnalyticsData,
        page,
        setPage,
        setSearch,
        setPageSize,
    };
};
