export type TProductSortDirection = "ASC" | "DESC";

export type TProductStatus = "ACTIVE" | "DRAFT" | "OUT_OF_STOCK";

export type TProductCategory =
    | "ELECTRONICS"
    | "SPORTS"
    | "CLOTHING"
    | "BEAUTY"
    | "BOOKS"
    | "HOME"
    | "GARDEN"
    | "TOYS"
    | "FOOD";

export type TGetProductsParams = {
    page?: number;
    limit?: number;
    column?: string;
    direction?: TProductSortDirection;
    search?: string;
    status?: TProductStatus;
    category?: TProductCategory;
    category_id?: number;
};
