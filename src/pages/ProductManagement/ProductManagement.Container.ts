import { useQueryState } from "nuqs";

import Config from "@/Config";
import {
    useGetProductAnalytics,
    useGetProducts,
} from "@/hooks/api/products.queries";

export const useProductManagement = () => {
    const [search, setSearch] = useQueryState("search", { defaultValue: "" });
    const [pageSize, setPageSize] = useQueryState("pageSize", {
        defaultValue: Config.LIMIT,
        parse: Number,
        serialize: String,
    });

    const {
        data: products,
        count: productsTotalCount,
        isPending: isProductsDataLoading,
        page,
        setPage,
    } = useGetProducts({
        search,
        page: 1,
        limit: pageSize,
    });

    const {
        data: productsAnalyticsData,
        isPending: isProductsAnalyticsLoading,
    } = useGetProductAnalytics();

    const isProductsLoading =
        isProductsAnalyticsLoading || isProductsDataLoading;

    return {
        products,
        productsTotalCount,
        isProductsLoading,
        productsAnalyticsData,
        page,
        search,
        pageSize,
        setPage,
        setSearch,
        setPageSize,
    };
};
