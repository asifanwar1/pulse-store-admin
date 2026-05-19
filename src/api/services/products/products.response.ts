import type {
    TProductCategory,
    TProductStatus,
} from "./products.request.types";

export type TProductMedia = {
    id: string;
    url: string;
};

export type TProductResponse = {
    id: number;
    name: string;
    sku: string;
    brand: string;
    description: string;
    retail_price: string;
    cost_price: string;
    stock_quantity: number;
    tags: string[];
    media: TProductMedia[];
    slug: string;
    category_id: number;
    category_name: TProductCategory | string;
    status: TProductStatus | string;
    created_at: string;
    updated_at: string;
};

export type TGetProductsResponse = {
    data: TProductResponse[];
    count: number;
};
