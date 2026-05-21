import { request } from "@/api/client/request";
import type { TApiArgs, TQueryParams, WithSignal } from "@/api/types/common";
import { HTTP_METHODS } from "@/constants";
import type {
    TCreateCategoryBody,
    TGetCategoriesParams,
    TUpdateCategoryBody,
} from "./categories.request";
import type {
    TCreateCategoryResponse,
    TDeleteCategoryResponse,
    TGetCategoriesResponse,
    TGetCategoryResponse,
    TUpdateCategoryResponse,
} from "./categories.response";
import { CATEGORY_QUERY_KEYS } from "./queryKeys";

export const GetCategories = async (
    params?: WithSignal<TGetCategoriesParams>,
) => {
    const { signal, ...urlParams } = params || {};
    const abortSignal = signal;

    return request<TGetCategoriesResponse, TGetCategoriesParams>({
        method: HTTP_METHODS.GET,
        url: "/categories/",
        params: urlParams as TQueryParams,
        signal: abortSignal,
    });
};

export const CreateCategory = async (body: TCreateCategoryBody) => {
    return request<TCreateCategoryResponse, TCreateCategoryBody>({
        method: HTTP_METHODS.POST,
        url: "/categories/",
        body,
    });
};

export const GetCategory = async ({ id }: TApiArgs) => {
    return request<TGetCategoryResponse, undefined>({
        method: HTTP_METHODS.GET,
        url: `/categories/${id}`,
    });
};

export const UpdateCategory = async ({
    id,
    body,
}: TApiArgs<TUpdateCategoryBody>) => {
    return request<TUpdateCategoryResponse, TUpdateCategoryBody>({
        method: HTTP_METHODS.PUT,
        url: `/categories/${id}`,
        body,
    });
};

export const DeleteCategory = async ({ id }: TApiArgs) => {
    return request<TDeleteCategoryResponse, undefined>({
        method: HTTP_METHODS.DELETE,
        url: `/categories/${id}`,
    });
};

export { CATEGORY_QUERY_KEYS };
