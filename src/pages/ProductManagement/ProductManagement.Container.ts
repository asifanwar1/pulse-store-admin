import { useQueryState } from "nuqs";

import Config from "@/Config";
import {
    useGetProductAnalytics,
    useGetProducts,
} from "@/hooks/api/products.queries";
import { useTablePagination, withPageReset } from "@/hooks/useTablePagination";

export const useProductManagement = () => {
    const [search, setSearchRaw] = useQueryState("search", {
        defaultValue: "",
    });
    const [pageSize, setPageSizeRaw] = useQueryState("pageSize", {
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
        limit: pageSize,
    });

    const {
        data: productsAnalyticsData,
        isPending: isProductsAnalyticsLoading,
    } = useGetProductAnalytics();

    const isProductsLoading =
        isProductsAnalyticsLoading || isProductsDataLoading;

    const { pageCount, setPageSize, onPaginationChange } = useTablePagination({
        pageSize,
        setPage,
        setPageSize: setPageSizeRaw,
        totalCount: productsTotalCount,
    });

    return {
        products,
        productsTotalCount,
        isProductsLoading,
        productsAnalyticsData,
        page,
        search,
        pageSize,
        pageCount,
        setPage,
        setSearch: withPageReset(setSearchRaw, setPage),
        setPageSize,
        onPaginationChange,
    };
};
