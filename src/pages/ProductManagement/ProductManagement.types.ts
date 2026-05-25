import type { TGetProductsResponse } from "@/api/services/products/products.response";

export type ManageProductFormProps = {
    mode: "add" | "update";
};

export type ProductTableProps = {
    productsListData: TGetProductsResponse["data"];
};
