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
import { queryClient } from "@/lib/queryClient";
import { invalidateMultiple } from "@/utils/common.utils";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetCategories = (params?: TGetCategoriesParams) => {
    return useQuery({
        queryKey: [CATEGORY_QUERY_KEYS.CATEGORIES, params],
        queryFn: () => GetCategories(params),
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
        mutationFn: ({
            id,
            body,
        }: {
            id: number;
            body: TUpdateCategoryBody;
        }) => UpdateCategory({ id, body }),
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
