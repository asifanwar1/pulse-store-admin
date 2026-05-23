import {
    CATEGORY_QUERY_KEYS,
    CreateCategory,
    DeleteCategory,
    GetCategories,
    GetCategory,
    UpdateCategory,
} from "@/api";
import type {
    TCreateCategoryBody,
    TGetCategoriesParams,
    TUpdateCategoryBody,
} from "@/api/services/categories/categories.request";
import Config from "@/Config";
import { queryClient } from "@/lib/queryClient";
import { useStore } from "@/store/store";
import { invalidateMultiple } from "@/utils/common.utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDataTableQuery } from "@/hooks/useDataTableQuery";
import { usePaginatedQuery } from "@/hooks/usePaginatedQuery";

export const useGetCategories = (
    props: TGetCategoriesParams,
    enabled?: boolean,
) => {
    const isAuthenticated = useStore((state) => state.isAuthenticated);
    const { limit = Config.LIMIT, search = "", page } = props;

    const { data, count, ...rest } = useDataTableQuery({
        queryKey: [
            CATEGORY_QUERY_KEYS.CATEGORIES,
            search,
            String(page ?? 1),
            String(limit),
        ],
        limit,
        enabled: enabled !== false && isAuthenticated,
        queryFn: async (params) => ({
            status: 200,
            data: await GetCategories({
                ...params,
                search,
            }),
        }),
    });
    return { data, count, ...rest };
};

export const useGetCategoriesPaginated = (
    props?: Omit<TGetCategoriesParams, "page">,
    enabled?: boolean,
) => {
    const isAuthenticated = useStore((state) => state.isAuthenticated);
    const { limit = Config.LIMIT, search = "" } = props || {};

    return usePaginatedQuery({
        queryKey: [CATEGORY_QUERY_KEYS.CATEGORIES, "paginated", search],
        limit,
        enabled: enabled !== false && isAuthenticated,
        queryFn: async (params, signal) =>
            GetCategories({
                ...params,
                search,
                signal,
            }),
    });
};

export const useGetCategory = (id?: number) => {
    return useQuery({
        queryKey: [CATEGORY_QUERY_KEYS.CATEGORY, id],
        queryFn: () => GetCategory({ id }),
        enabled: !!id,
    });
};

export const useCreateCategory = () => {
    return useMutation({
        mutationFn: (body: TCreateCategoryBody) => CreateCategory(body),
        onSuccess: async () => {
            await invalidateMultiple(queryClient, [
                [CATEGORY_QUERY_KEYS.CATEGORIES],
                [CATEGORY_QUERY_KEYS.CATEGORY],
            ]);
        },
    });
};

export const useUpdateCategory = () => {
    return useMutation({
        mutationFn: ({ id, body }: { id: number; body: TUpdateCategoryBody }) =>
            UpdateCategory({ id, body }),
        onSuccess: async () => {
            await invalidateMultiple(queryClient, [
                [CATEGORY_QUERY_KEYS.CATEGORIES],
                [CATEGORY_QUERY_KEYS.CATEGORY],
            ]);
        },
    });
};

export const useDeleteCategory = () => {
    return useMutation({
        mutationFn: (id: number) => DeleteCategory({ id }),
        onSuccess: async () => {
            await invalidateMultiple(queryClient, [
                [CATEGORY_QUERY_KEYS.CATEGORIES],
                [CATEGORY_QUERY_KEYS.CATEGORY],
            ]);
        },
    });
};
