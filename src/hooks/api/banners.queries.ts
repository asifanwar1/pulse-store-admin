import { useMutation, useQuery } from "@tanstack/react-query";

import {
    BANNER_QUERY_KEYS,
    CreateBanner,
    DeleteBanner,
    GetBanner,
    GetBanners,
    UpdateBanner,
    UpdateBannerStatus,
} from "@/api";
import type {
    TCreateBannerBody,
    TGetBannersParams,
    TUpdateBannerBody,
    TUpdateBannerStatusBody,
} from "@/api/services/banners/banners.request.types";
import Config from "@/Config";
import { queryClient } from "@/lib/queryClient";
import { useStore } from "@/store/store";
import { invalidateMultiple } from "@/utils/common.utils";
import { useDataTableQuery } from "../useDataTableQuery";

export const useGetBanners = (
    props: TGetBannersParams,
    enabled?: boolean,
) => {
    const isAuthenticated = useStore((state) => state.isAuthenticated);
    const { limit = Config.LIMIT, placement, is_active } = props;

    const { data, count, ...rest } = useDataTableQuery({
        queryKey: [
            BANNER_QUERY_KEYS.BANNERS,
            placement,
            is_active,
            String(limit),
        ],
        limit,
        enabled: enabled !== false && isAuthenticated,
        queryFn: async (params) => ({
            status: 200,
            data: await GetBanners({
                page: params.page,
                limit: params.limit,
                ...(placement && { placement }),
                ...(is_active !== undefined &&
                    is_active !== null && { is_active }),
            }),
        }),
    });

    return { data, count, ...rest };
};

export const useGetBanner = (id?: number) => {
    return useQuery({
        queryKey: [BANNER_QUERY_KEYS.BANNER, id],
        queryFn: () => GetBanner({ id }),
        enabled: !!id,
    });
};

export const useCreateBanner = () => {
    return useMutation({
        mutationFn: (body: TCreateBannerBody) => CreateBanner(body),
        onSuccess: async () => {
            await invalidateMultiple(queryClient, [
                [BANNER_QUERY_KEYS.BANNERS],
                [BANNER_QUERY_KEYS.BANNER],
            ]);
        },
    });
};

export const useUpdateBanner = () => {
    return useMutation({
        mutationFn: ({ id, body }: { id: number; body: TUpdateBannerBody }) =>
            UpdateBanner({ id, body }),
        onSuccess: async () => {
            await invalidateMultiple(queryClient, [
                [BANNER_QUERY_KEYS.BANNERS],
                [BANNER_QUERY_KEYS.BANNER],
            ]);
        },
    });
};

// Hard delete — permanently removes the row. For deactivate/reactivate, use
// useUpdateBannerStatus instead.
export const useDeleteBanner = () => {
    return useMutation({
        mutationFn: (id: number) => DeleteBanner({ id }),
        onSuccess: async () => {
            await invalidateMultiple(queryClient, [
                [BANNER_QUERY_KEYS.BANNERS],
                [BANNER_QUERY_KEYS.BANNER],
            ]);
        },
    });
};

export const useUpdateBannerStatus = () => {
    return useMutation({
        mutationFn: ({
            id,
            body,
        }: {
            id: number;
            body: TUpdateBannerStatusBody;
        }) => UpdateBannerStatus({ id, body }),
        onSuccess: async () => {
            await invalidateMultiple(queryClient, [
                [BANNER_QUERY_KEYS.BANNERS],
                [BANNER_QUERY_KEYS.BANNER],
            ]);
        },
    });
};
