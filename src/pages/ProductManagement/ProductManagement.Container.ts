import { useState } from "react";
import { useQueryState } from "nuqs";

import Config from "@/Config";
import {
    useGetProductAnalytics,
    useGetProducts,
} from "@/hooks/api/products.queries";
import { useGetCategoriesPaginated } from "@/hooks/api/categories.queries";
import { useTablePagination, withPageReset } from "@/hooks/useTablePagination";
import { STATUS_OPTIONS as PRODUCT_STATUS_OPTIONS } from "@/constants/product-status.constants";
import type { FilterItem } from "@/components/custom/FilterBar";

export const useProductManagement = () => {
    const [search, setSearchRaw] = useQueryState("search", {
        defaultValue: "",
    });
    const [pageSize, setPageSizeRaw] = useQueryState("pageSize", {
        defaultValue: Config.LIMIT,
        parse: Number,
        serialize: String,
    });
    const [status, setStatusRaw] = useState<string | null>(null);
    const [categoryId, setCategoryIdRaw] = useState<string | null>(null);
    const [categorySearch, setCategorySearch] = useState("");

    const {
        data: products,
        count: productsTotalCount,
        isPending: isProductsDataLoading,
        page,
        setPage,
    } = useGetProducts({
        search,
        limit: pageSize,
        status: status as never,
        category_id: categoryId ? Number(categoryId) : undefined,
    });

    const {
        data: productsAnalyticsData,
        isPending: isProductsAnalyticsLoading,
    } = useGetProductAnalytics();

    const {
        data: categories = [],
        fetchNextPage: fetchNextCategoriesPage,
        hasNextPage: hasMoreCategories,
        isFetchingNextPage: isFetchingMoreCategories,
    } = useGetCategoriesPaginated({ search: categorySearch, limit: 20 });

    const categoryOptions = categories.map((category) => ({
        label: category.name,
        value: String(category.id),
    }));

    const isProductsLoading =
        isProductsAnalyticsLoading || isProductsDataLoading;

    const { pageCount, setPageSize, onPaginationChange } = useTablePagination({
        pageSize,
        setPage,
        setPageSize: setPageSizeRaw,
        totalCount: productsTotalCount,
    });

    const setSearch = withPageReset(setSearchRaw, setPage);
    const setStatus = withPageReset(setStatusRaw, setPage);
    const setCategoryId = withPageReset(setCategoryIdRaw, setPage);

    const filterItems: FilterItem[] = [
        {
            type: "search",
            key: "search",
            placeholder: "Search products...",
            onSearch: setSearch,
        },
        {
            type: "select",
            key: "status",
            placeholder: "All Statuses",
            value: status
                ? PRODUCT_STATUS_OPTIONS.find((opt) => opt.value === status)
                : null,
            options: PRODUCT_STATUS_OPTIONS,
            onChange: (value) =>
                setStatus(value && !Array.isArray(value) ? value.value : null),
            clearable: true,
        },
        {
            type: "select",
            key: "category",
            placeholder: "All Categories",
            value: categoryId
                ? categoryOptions.find((opt) => opt.value === categoryId)
                : null,
            options: categoryOptions,
            onChange: (value) =>
                setCategoryId(
                    value && !Array.isArray(value) ? value.value : null,
                ),
            clearable: true,
            autoComplete: true,
            onSearch: setCategorySearch,
            hasMore: hasMoreCategories,
            isFetchingNextPage: isFetchingMoreCategories,
            onScroll: fetchNextCategoriesPage,
        },
    ];

    return {
        products,
        productsTotalCount,
        isProductsLoading,
        productsAnalyticsData,
        page,
        search,
        pageSize,
        pageCount,
        filterItems,
        setPage,
        setSearch,
        setPageSize,
        onPaginationChange,
    };
};
