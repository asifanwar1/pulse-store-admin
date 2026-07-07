import {
    CreateOffer,
    DeleteOffer,
    GetActiveOffers,
    GetOffer,
    GetOffers,
    OFFER_QUERY_KEYS,
    UpdateOffer,
} from "@/api";
import type {
    TCreateOfferBody,
    TGetOffersParams,
    TUpdateOfferBody,
} from "@/api/services/offers/offers.request.types";
import Config from "@/Config";
import { queryClient } from "@/lib/queryClient";
import { useStore } from "@/store/store";
import { invalidateMultiple } from "@/utils/common.utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDataTableQuery } from "../useDataTableQuery";
import { usePaginatedQuery } from "../usePaginatedQuery";

export const useGetOffers = (props: TGetOffersParams, enabled?: boolean) => {
    const isAuthenticated = useStore((state) => state.isAuthenticated);
    const {
        limit = Config.LIMIT,
        search = "",
        page = 1,
        scope,
        is_active,
        status,
        column,
    } = props;

    const { data, count, ...rest } = useDataTableQuery({
        queryKey: [
            OFFER_QUERY_KEYS.OFFERS,
            search,
            scope,
            is_active,
            status,
            column,
            String(page),
            String(limit),
        ],
        limit,
        enabled: enabled !== false && isAuthenticated,
        queryFn: async (params) => ({
            status: 200,
            data: await GetOffers({
                ...params,
                ...(search && { search }),
                ...(scope && { scope }),
                ...(is_active !== undefined && { is_active }),
                ...(status && { status }),
                ...(column && { column }),
                ...(page && { page }),
                ...(limit && { limit }),
            }),
        }),
    });

    return { data, count, ...rest };
};

export const useGetOffersPaginated = (
    props?: Omit<TGetOffersParams, "page">,
    enabled?: boolean,
) => {
    const isAuthenticated = useStore((state) => state.isAuthenticated);
    const { limit = Config.LIMIT, search = "" } = props || {};

    return usePaginatedQuery({
        queryKey: [OFFER_QUERY_KEYS.OFFERS, "paginated", search],
        limit,
        enabled: enabled !== false && isAuthenticated,
        queryFn: async (params, signal) =>
            GetOffers({
                ...params,
                search,
                signal,
            }),
    });
};

export const useGetOffer = (id?: number) => {
    return useQuery({
        queryKey: [OFFER_QUERY_KEYS.OFFER, id],
        queryFn: () => GetOffer({ id }),
        enabled: !!id,
    });
};

export const useCreateOffer = () => {
    return useMutation({
        mutationFn: (body: TCreateOfferBody) => CreateOffer(body),
        onSuccess: async () => {
            await invalidateMultiple(queryClient, [
                [OFFER_QUERY_KEYS.OFFERS],
                [OFFER_QUERY_KEYS.OFFER],
            ]);
        },
    });
};

export const useUpdateOffer = () => {
    return useMutation({
        mutationFn: ({ id, body }: { id: number; body: TUpdateOfferBody }) =>
            UpdateOffer({ id, body }),
        onSuccess: async () => {
            await invalidateMultiple(queryClient, [
                [OFFER_QUERY_KEYS.OFFERS],
                [OFFER_QUERY_KEYS.OFFER],
                [OFFER_QUERY_KEYS.ACTIVE_OFFERS],
            ]);
        },
    });
};

export const useDeleteOffer = () => {
    return useMutation({
        mutationFn: (id: number) => DeleteOffer({ id }),
        onSuccess: async () => {
            await invalidateMultiple(queryClient, [
                [OFFER_QUERY_KEYS.OFFERS],
                [OFFER_QUERY_KEYS.OFFER],
                [OFFER_QUERY_KEYS.ACTIVE_OFFERS],
            ]);
        },
    });
};

export const useGetActiveOffers = () => {
    return useQuery({
        queryKey: [OFFER_QUERY_KEYS.ACTIVE_OFFERS],
        queryFn: () => GetActiveOffers(),
    });
};
