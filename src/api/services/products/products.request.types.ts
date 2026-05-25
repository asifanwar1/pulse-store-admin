import type { BaseQueryType } from "@/api/models";

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

export type TGetProductsParams = BaseQueryType & {
    search?: string;
    status?: TProductStatus;
    category?: TProductCategory;
    category_id?: number;
};

export type TCreateProductMedia = {
    id: string;
    url: string;
};

export type TCreateProductBody = {
    name: string;
    sku: string;
    brand: string;
    description: string;
    retail_price: number;
    cost_price: number;
    stock_quantity: number;
    tags: string[];
    media: TCreateProductMedia[];
    category: TProductCategory;
    status: TProductStatus;
};

export type TUpdateProductBody = TCreateProductBody;
