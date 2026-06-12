import { useGetShipments } from "@/hooks/api/shipment.queries";
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
        isPending: isShipmentsDataLoading,
        page,
        setPage,
    } = useGetShipments({
        search,
        page: 1,
        limit: pageSize,
    });

    return { shipments, shipmentsTotalCountm, isShipmentsDataLoading };
};
