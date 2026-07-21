import {
    CreateOrder,
    GetOrder,
    GetOrders,
    GetOrdersAnalytics,
    ORDER_QUERY_KEYS,
    UpdateOrderStatus,
} from "@/api";
import type {
    TCreateOrderBody,
    TGetOrdersParams,
    TUpdateOrderStatusBody,
} from "@/api/services/orders/orders.request.types";
import Config from "@/Config";
import { queryClient } from "@/lib/queryClient";
import { useStore } from "@/store/store";
import { invalidateMultiple } from "@/utils/common.utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDataTableQuery } from "../useDataTableQuery";
import { showToast } from "@/lib/toast";

export const useGetOrders = (props: TGetOrdersParams, enabled?: boolean) => {
    const isAuthenticated = useStore((state) => state.isAuthenticated);
    const { limit = Config.LIMIT, search = "", status, user_id } = props;

    const { data, count, ...rest } = useDataTableQuery({
        queryKey: [ORDER_QUERY_KEYS.ORDERS, search, status, user_id],
        limit,
        enabled: enabled !== false && isAuthenticated,
        queryFn: async (params) => ({
            status: 200,
            data: await GetOrders({
                ...params,
                ...(search && { search }),
                ...(status && { status }),
                ...(user_id && { user_id }),
            }),
        }),
    });
    return { data, count, ...rest };
};

export const useGetOrder = (id?: number) => {
    return useQuery({
        queryKey: [ORDER_QUERY_KEYS.ORDER, id],
        queryFn: () => GetOrder({ id }),
        enabled: !!id,
    });
};

export const useCreateOrder = () => {
    return useMutation({
        mutationFn: (body: TCreateOrderBody) => CreateOrder(body),
        onSuccess: async () => {
            await invalidateMultiple(queryClient, [
                [ORDER_QUERY_KEYS.ORDERS],
                [ORDER_QUERY_KEYS.ORDER],
            ]);
        },
    });
};

export const useUpdateOrderStatus = () => {
    return useMutation({
        mutationFn: ({
            id,
            body,
        }: {
            id: number;
            body: TUpdateOrderStatusBody;
        }) => UpdateOrderStatus({ id, body }),
        onSuccess: async () => {
            await invalidateMultiple(queryClient, [
                [ORDER_QUERY_KEYS.ORDERS],
                [ORDER_QUERY_KEYS.ORDER],
            ]);
            showToast.success("Status updated successfully");
        },
    });
};

export const useGetOrdersAnalytics = (enabled?: boolean) => {
    const isAuthenticated = useStore((state) => state.isAuthenticated);

    return useQuery({
        queryKey: [ORDER_QUERY_KEYS.ORDER_ANALYTICS],
        queryFn: () => GetOrdersAnalytics(),
        enabled: enabled !== false && isAuthenticated,
    });
};
