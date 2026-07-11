import type { TCategoryImage } from "./categories.response";

export type TGetCategoriesParams = {
    page?: number;
    limit?: number;
    search?: string;
};

export type TCreateCategoryBody = {
    name: string;
    description?: string | null;
    image?: TCategoryImage | null;
};

export type TUpdateCategoryBody = TCreateCategoryBody;
