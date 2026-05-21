export type TCategoryResponse = {
    id: number;
    name: string;
    description?: string | null;
    created_at?: string;
    updated_at?: string;
};

export type TGetCategoriesResponse = {
    data: TCategoryResponse[];
    count: number;
};

export type TCreateCategoryResponse = TCategoryResponse;

export type TGetCategoryResponse = TCategoryResponse;

export type TUpdateCategoryResponse = TCategoryResponse;

export type TDeleteCategoryResponse = void;
