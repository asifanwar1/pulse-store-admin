import type { TGetRevenuesParams } from "@/api/services/revenue/revenue.request.types";
import Config from "@/Config";
import { useStore } from "@/store/store";
import { useDataTableQuery } from "../useDataTableQuery";
import {
    GetRevenue,
    GetRevenues,
    GetRevenuesAnalytics,
    REVENUE_QUERY_KEYS,
} from "@/api/services/revenue";
import { useQuery } from "@tanstack/react-query";

export const useGetRevenues = (
    props: TGetRevenuesParams,
    enabled?: boolean,
) => {
    const isAuthenticated = useStore((state) => state.isAuthenticated);
    const {
        limit = Config.LIMIT,
        search = "",
        user_id,
        order_id,
        shipment_id,
        payment_method,
        shipment_status,
        date_from,
        date_to,
    } = props;

    const { data, count, ...rest } = useDataTableQuery({
        queryKey: [
            REVENUE_QUERY_KEYS.REVENUES,
            search,
            user_id,
            order_id,
            shipment_id,
            payment_method,
            shipment_status,
            date_from,
            date_to,
        ],
        limit,
        enabled: enabled !== false && isAuthenticated,
        queryFn: async (params) => ({
            status: 200,
            data: await GetRevenues({
                ...params,
                ...(search && { search }),
                ...(user_id && { user_id }),
                ...(order_id && { order_id }),
                ...(shipment_id && { shipment_id }),
                ...(payment_method && { payment_method }),
                ...(shipment_status && { shipment_status }),
                ...(date_from && { date_from }),
                ...(date_to && { date_to }),
            }),
        }),
    });
    return { data, count, ...rest };
};

export const useGetRevenue = (id?: number) => {
    return useQuery({
        queryKey: [REVENUE_QUERY_KEYS.REVENUE, id],
        queryFn: () => GetRevenue({ id }),
        enabled: !!id,
    });
};

export const useGetRevenueAnalytics = () => {
    return useQuery({
        queryKey: [REVENUE_QUERY_KEYS.ANALYTICS],
        queryFn: () => GetRevenuesAnalytics(),
    });
};
