export type TGetCategoriesParams = {
    page?: number;
    limit?: number;
    search?: string;
};

export type TCreateCategoryBody = {
    name: string;
    description?: string | null;
};

export type TUpdateCategoryBody = TCreateCategoryBody;
