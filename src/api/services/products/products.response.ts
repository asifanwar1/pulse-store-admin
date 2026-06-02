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
    total_sales: number;
    rating: number;
    created_at: string;
    updated_at: string;
};

export type TGetProductsResponse = {
    data: TProductResponse[];
    count: number;
};

export type TCreateProductResponse = TProductResponse;

export type TGetProductResponse = TProductResponse;

export type TUpdateProductResponse = {
    name: string;
    sku: string;
    brand: string;
    description: string;
    retail_price: number;
    cost_price: number;
    stock_quantity: number;
    category_id: number;
    category: TProductCategory | string;
    status: TProductStatus | string;
    tags: string[];
    media: TProductMedia[];
};

export type TDeleteProductResponse = {
    data: boolean;
};

export type TProductAnalyticsMetric = {
    value: number;
    change_percentage: string;
};

export type TGetProductAnalyticsResponse = {
    total_products: TProductAnalyticsMetric;
    active_products: TProductAnalyticsMetric;
    out_of_stock_products: TProductAnalyticsMetric;
    average_price: TProductAnalyticsMetric;
};

export type TProductMonthlySalesItem = {
    month: string;
    sales: number;
    revenue: number;
};

export type TGetProductMonthlySalesResponse = TProductMonthlySalesItem[];

export type TProductReview = {
    id: string;
    customer: string;
    initials: string;
    rating: number;
    comment: string;
    date: string;
};

export type TGetProductReviewsResponse = TProductReview[];
