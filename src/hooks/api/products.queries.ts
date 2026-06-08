import {
    CreateProduct,
    DeleteProduct,
    GetProduct,
    GetProductAnalytics,
    GetProductCustomerReviews,
    GetProductMonthlySales,
    GetProducts,
    PRODUCT_QUERY_KEYS,
    UpdateProduct,
} from "@/api";
import type {
    TCreateProductBody,
    TGetProductsParams,
    TUpdateProductBody,
} from "@/api/services/products/products.request.types";
import { queryClient } from "@/lib/queryClient";
import { useStore } from "@/store/store";
import { invalidateMultiple } from "@/utils/common.utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDataTableQuery } from "../useDataTableQuery";
import Config from "@/Config";
import { usePaginatedQuery } from "../usePaginatedQuery";

export const useGetProducts = (
    props: TGetProductsParams,
    enabled?: boolean,
) => {
    const isAuthenticated = useStore((state) => state.isAuthenticated);
    const {
        limit = Config.LIMIT,
        search = "",
        page = 1,
        status,
        category,
        column,
    } = props;

    const { data, count, ...rest } = useDataTableQuery({
        queryKey: [
            PRODUCT_QUERY_KEYS.PRODUCTS,
            search,
            status,
            category,
            column,
            String(page),
            String(limit),
        ],
        limit,
        enabled: enabled !== false && isAuthenticated,
        queryFn: async (params) => ({
            status: 200,
            data: await GetProducts({
                ...params,
                ...(search && { search }),
                ...(status && { status }),
                ...(category && { category }),
                ...(column && { column }),
                ...(page && { page }),
                ...(limit && { limit }),
            }),
        }),
    });
    return { data, count, ...rest };
};

export const useGetProductsPaginated = (
    props?: Omit<TGetProductsParams, "page">,
    enabled?: boolean,
) => {
    const isAuthenticated = useStore((state) => state.isAuthenticated);
    const { limit = Config.LIMIT, search = "" } = props || {};

    return usePaginatedQuery({
        queryKey: [PRODUCT_QUERY_KEYS.PRODUCTS, "paginated", search],
        limit,
        enabled: enabled !== false && isAuthenticated,
        queryFn: async (params, signal) =>
            GetProducts({
                ...params,
                search,
                signal,
            }),
    });
};

export const useGetProduct = (id?: number) => {
    return useQuery({
        queryKey: [PRODUCT_QUERY_KEYS.PRODUCT, id],
        queryFn: () => GetProduct({ id }),
        enabled: !!id,
    });
};

export const useCreateProduct = () => {
    return useMutation({
        mutationFn: (body: TCreateProductBody) => CreateProduct(body),
        onSuccess: async () => {
            await invalidateMultiple(queryClient, [
                [PRODUCT_QUERY_KEYS.PRODUCTS],
                [PRODUCT_QUERY_KEYS.PRODUCT],
            ]);
        },
    });
};

export const useUpdateProduct = () => {
    return useMutation({
        mutationFn: ({ id, body }: { id: number; body: TUpdateProductBody }) =>
            UpdateProduct({ id, body }),
        onSuccess: async () => {
            await invalidateMultiple(queryClient, [
                [PRODUCT_QUERY_KEYS.PRODUCTS],
                [PRODUCT_QUERY_KEYS.PRODUCT],
                [PRODUCT_QUERY_KEYS.ANALYTICS],
            ]);
        },
    });
};

export const useDeleteProduct = () => {
    return useMutation({
        mutationFn: (id: number) => DeleteProduct({ id }),
        onSuccess: async () => {
            await invalidateMultiple(queryClient, [
                [PRODUCT_QUERY_KEYS.PRODUCTS],
                [PRODUCT_QUERY_KEYS.PRODUCT],
                [PRODUCT_QUERY_KEYS.ANALYTICS],
            ]);
        },
    });
};

export const useGetProductAnalytics = () => {
    return useQuery({
        queryKey: [PRODUCT_QUERY_KEYS.ANALYTICS],
        queryFn: () => GetProductAnalytics(),
    });
};

export const useGetProductMonthlySales = (id?: number) => {
    return useQuery({
        queryKey: [PRODUCT_QUERY_KEYS.PRODUCT_MONTHLY_SALES, id],
        queryFn: () => GetProductMonthlySales({ id }),
        enabled: !!id,
    });
};

export const useGetProductCustomerReviews = (id?: number) => {
    return useQuery({
        queryKey: [PRODUCT_QUERY_KEYS.PRODUCT_CUSTOMER_REVIEWS, id],
        queryFn: () => GetProductCustomerReviews({ id }),
        enabled: !!id,
    });
};
