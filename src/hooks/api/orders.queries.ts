import {
    CreateOrder,
    GetOrder,
    GetOrders,
    ORDER_QUERY_KEYS,
    UpdateOrderStatus,
} from "@/api";
import type {
    TCreateOrderBody,
    TGetOrdersParams,
    TUpdateOrderStatusBody,
} from "@/api/services/orders/orders.request.types";
import { queryClient } from "@/lib/queryClient";
import { invalidateMultiple } from "@/utils/common.utils";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetOrders = (params?: TGetOrdersParams) => {
    return useQuery({
        queryKey: [ORDER_QUERY_KEYS.ORDERS, params],
        queryFn: () => GetOrders(params),
    });
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
        },
    });
};
