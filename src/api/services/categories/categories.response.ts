export type TCategoryImage = {
    id: string;
    url: string;
    file_name?: string | null;
};

export type TCategoryResponse = {
    id: number;
    name: string;
    description?: string | null;
    parent_id?: number | null;
    image?: TCategoryImage | null;
    slug?: string;
    created_at?: string;
    updated_at?: string;
};

export type TGetCategoriesData = {
    data: TCategoryResponse[];
    count: number;
};

export type TGetCategoriesResponse = TGetCategoriesData;

export type TCreateCategoryResponse = TCategoryResponse;

export type TGetCategoryResponse = TCategoryResponse;

export type TUpdateCategoryResponse = TCategoryResponse;

export type TDeleteCategoryResponse = void;
