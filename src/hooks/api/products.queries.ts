import {
    CreateProduct,
    DeleteProduct,
    GetProduct,
    GetProductAnalytics,
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
import { invalidateMultiple } from "@/utils/common.utils";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetProducts = (params?: TGetProductsParams) => {
    return useQuery({
        queryKey: [PRODUCT_QUERY_KEYS.PRODUCTS, params],
        queryFn: () => GetProducts(params),
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
