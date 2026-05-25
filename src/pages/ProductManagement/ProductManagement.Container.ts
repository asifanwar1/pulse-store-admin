import Config from "@/Config";
import { useGetProducts } from "@/hooks/api/products.queries";
import { useQueryState } from "nuqs";

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
        isPending: isProductsLoading,
        page,
        setPage,
    } = useGetProducts({
        search,
        page: 1,
        limit: pageSize,
    });
    return {
        products,
        productsTotalCount,
        isProductsLoading,
        page,
        search,
        pageSize,
        setPage,
        setSearch,
        setPageSize,
    };
};
