import { request } from "@/api/client/request";
import type { TApiArgs, TQueryParams, WithSignal } from "@/api/types/common";
import { HTTP_METHODS } from "@/constants";
import type {
    TGetUsersParams,
    TUpdateMeBody,
    TUpdateUserStatusBody,
} from "./users.request.types";
import type {
    TDeleteUserResponse,
    TGetCurrentUserResponse,
    TGetUserByIdResponse,
    TGetUsersAnalyticsResponse,
    TGetUsersResponse,
    TUpdateMeResponse,
    TUpdateUserStatusResponse,
} from "./users.response.types";
import { USER_QUERY_KEYS } from "./queryKeys";

export const GetCurrentUser = async (token?: string) => {
    return request<TGetCurrentUserResponse, undefined>({
        method: HTTP_METHODS.GET,
        url: "/users/me",
        token,
    });
};

export const UpdateMe = async (body: TUpdateMeBody) => {
    return request<TUpdateMeResponse, TUpdateMeBody>({
        method: HTTP_METHODS.PATCH,
        url: "/users/me",
        body,
    });
};

export const GetUsers = async (params?: WithSignal<TGetUsersParams>) => {
    const { signal, ...urlParams } = params || {};
    const abortSignal = signal;

    return request<TGetUsersResponse, TGetUsersParams>({
        method: HTTP_METHODS.GET,
        url: "/users",
        params: urlParams as TQueryParams,
        signal: abortSignal,
    });
};

export const GetUserById = async ({ id }: TApiArgs) => {
    return request<TGetUserByIdResponse, undefined>({
        method: HTTP_METHODS.GET,
        url: `/users/${id}`,
    });
};

export const DeleteUser = async ({ id }: TApiArgs) => {
    return request<TDeleteUserResponse, undefined>({
        method: HTTP_METHODS.DELETE,
        url: `/users/${id}`,
    });
};

export const UpdateUserStatus = async ({
    id,
    body,
}: TApiArgs<TUpdateUserStatusBody>) => {
    return request<TUpdateUserStatusResponse, TUpdateUserStatusBody>({
        method: HTTP_METHODS.PATCH,
        url: `/users/${id}/status`,
        body,
    });
};

export const GetUsersAnalytics = async (params?: WithSignal<{}>) => {
    const { signal, ...urlParams } = params || {};
    const abortSignal = signal;

    return request<TGetUsersAnalyticsResponse>({
        method: HTTP_METHODS.GET,
        url: "/users/analytics",
        params: urlParams as TQueryParams,
        signal: abortSignal,
    });
};

export { USER_QUERY_KEYS };
