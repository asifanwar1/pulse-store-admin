export type TCartItemResponse = {
    id: number;
    product_id: number;
    product_name: string;
    quantity: number;
    price: number;
    subtotal: number;
    created_at: string;
    updated_at: string;
};

export type TCartResponse = {
    id: number;
    user_id: number;
    items: TCartItemResponse[];
    total_items: number;
    total_price: number;
    created_at: string;
    updated_at: string;
};

export type TClearCartResponse = void;

export type TRemoveCartItemResponse = TCartResponse;

export type TAddCartItemResponse = TCartResponse;

export type TUpdateCartItemResponse = TCartResponse;

export type TGetCartResponse = TCartResponse;
