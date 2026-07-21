import type { TGetProductsResponse } from "@/api/services/products/products.response";

export type ManageProductFormProps = {
    mode: "add" | "update";
};

export type ProductTableProps = {
    productsListData: TGetProductsResponse["data"];
    totalCount?: number;
    pageCount: number;
    page: number;
    pageSize: number;
    onSearch: (value: string) => void;
    onPaginationChange: (pagination: {
        pageIndex: number;
        pageSize: number;
    }) => void;
};

export type TManageProductFormConfigProps = {
    categoryOptions: any;
    onCategorySearch: (value: string) => void;
    onCategoryScroll?: () => void;
    hasMoreCategories?: boolean;
    isFetchingMoreCategories?: boolean;
    isCategoriesLoading?: boolean;
};
