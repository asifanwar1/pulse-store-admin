import {
    AddShipmentTracking,
    CreateShipment,
    GetShipment,
    GetShipments,
    GetShipmentsAnalytics,
    GetShipmentTrackingByNumber,
    ORDER_QUERY_KEYS,
    SHIPMENT_QUERY_KEYS,
    UpdateShipment,
    UpdateShipmentStatus,
} from "@/api";
import type {
    TAddShipmentTrackingBody,
    TCreateShipmentBody,
    TGetShipmentsParams,
    TUpdateShipmentBody,
    TUpdateShipmentStatusBody,
} from "@/api/services/shipment/shipment.request.types";
import { queryClient } from "@/lib/queryClient";
import { useStore } from "@/store/store";
import { invalidateMultiple } from "@/utils/common.utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDataTableQuery } from "../useDataTableQuery";
import Config from "@/Config";
import { usePaginatedQuery } from "../usePaginatedQuery";
import { showToast } from "@/lib/toast";

export const useGetShipments = (
    props: TGetShipmentsParams,
    enabled?: boolean,
) => {
    const isAuthenticated = useStore((state) => state.isAuthenticated);
    const { limit = Config.LIMIT, search = "", status, order_id } = props;

    const { data, count, ...rest } = useDataTableQuery({
        queryKey: [SHIPMENT_QUERY_KEYS.SHIPMENTS, search, status, order_id],
        limit,
        enabled: enabled !== false && isAuthenticated,
        queryFn: async (params) => ({
            status: 200,
            data: await GetShipments({
                ...params,
                ...(search && { search }),
                ...(status && { status }),
                ...(order_id && { order_id }),
            }),
        }),
    });

    return { data, count, ...rest };
};

export const useGetShipmentsPaginated = (
    props?: Omit<TGetShipmentsParams, "page">,
    enabled?: boolean,
) => {
    const isAuthenticated = useStore((state) => state.isAuthenticated);
    const { limit = Config.LIMIT, search = "", status, order_id } = props || {};

    return usePaginatedQuery({
        queryKey: [SHIPMENT_QUERY_KEYS.SHIPMENTS, "paginated", search ?? ""],
        limit,
        enabled: enabled !== false && isAuthenticated,
        queryFn: async (params, signal) =>
            GetShipments({
                ...params,
                search,
                status,
                order_id,
                signal,
            }),
    });
};

export const useGetShipment = (id?: number) => {
    return useQuery({
        queryKey: [SHIPMENT_QUERY_KEYS.SHIPMENT, id],
        queryFn: () => GetShipment({ id }),
        enabled: !!id,
    });
};

export const useCreateShipment = () => {
    return useMutation({
        mutationFn: (body: TCreateShipmentBody) => CreateShipment(body),
        onSuccess: async () => {
            await invalidateMultiple(queryClient, [
                [SHIPMENT_QUERY_KEYS.SHIPMENTS],
                [SHIPMENT_QUERY_KEYS.SHIPMENT],
            ]);
        },
    });
};

export const useUpdateShipment = () => {
    return useMutation({
        mutationFn: ({ id, body }: { id: number; body: TUpdateShipmentBody }) =>
            UpdateShipment({ id, body }),
        onSuccess: async () => {
            await invalidateMultiple(queryClient, [
                [SHIPMENT_QUERY_KEYS.SHIPMENTS],
                [SHIPMENT_QUERY_KEYS.SHIPMENT],
            ]);
        },
    });
};

export const useUpdateShipmentStatus = () => {
    return useMutation({
        mutationFn: ({
            id,
            body,
        }: {
            id: number;
            body: TUpdateShipmentStatusBody;
        }) => UpdateShipmentStatus({ id, body }),
        onSuccess: async () => {
            await invalidateMultiple(queryClient, [
                [SHIPMENT_QUERY_KEYS.SHIPMENTS],
                [SHIPMENT_QUERY_KEYS.SHIPMENT],
            ]);
        },
    });
};

export const useAddShipmentTracking = () => {
    return useMutation({
        mutationFn: ({
            id,
            body,
        }: {
            id: number;
            body: TAddShipmentTrackingBody;
        }) => AddShipmentTracking({ id, body }),
        onSuccess: async () => {
            await invalidateMultiple(queryClient, [
                [SHIPMENT_QUERY_KEYS.SHIPMENTS],
                [SHIPMENT_QUERY_KEYS.SHIPMENT],
                [ORDER_QUERY_KEYS.ORDERS],
                [ORDER_QUERY_KEYS.ORDER],
            ]);
            showToast.success("Tracking update added successfully");
        },
    });
};

export const useTrackShipmentByNumber = () => {
    return useMutation({
        mutationFn: async (trackingId: string) => {
            const [trackingDetails, matchingShipments] = await Promise.all([
                GetShipmentTrackingByNumber(trackingId),
                GetShipments({ search: trackingId, limit: 5 }),
            ]);

            const matchedShipment = matchingShipments.data.find(
                (shipment) =>
                    shipment.tracking_id.toLowerCase() ===
                    trackingId.trim().toLowerCase(),
            );

            return {
                trackingDetails,
                shipmentId: matchedShipment?.id,
            };
        },
    });
};

export const useGetShipmentAnalytics = () => {
    return useQuery({
        queryKey: [SHIPMENT_QUERY_KEYS.ANALYTICS],
        queryFn: () => GetShipmentsAnalytics(),
    });
};
