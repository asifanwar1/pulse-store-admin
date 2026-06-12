import { useGetShipments } from "@/hooks/api/shipment.queries";

export const useShipmentManagement = () => {
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
