import { HTTP_METHODS } from "@/constants";
import type {
    TGetUsersParams,
    TUpdateUserBody,
    TUpdateUserStatusBody,
    TInstallerInviteBody,
    TCustomerOnboardBody,
    TUpdateFcmTokenBody,
    TExportUsersParams
} from "./users.request.types";
import type {
    TGetCurrentUserResponse,
    TGetUsersResponse,
    TGetUserByIdResponse,
    TUpdateUserResponse,
    TDeleteUserResponse,
    TUpdateUserStatusResponse,
    TInstallerInviteResponse,
    TCustomerOnboardResponse,
    TUpdateFcmTokenResponse,
    TExportUsersResponse,
    TInstallerReinviteResponse
} from "./users.response.types";
import { request } from "@/api/client/request";
import type { TQueryParams, WithSignal } from "@/api/types/common";
import { USER_QUERY_KEYS } from "./queryKeys";

export type UserApiArgs<TBody = unknown, TParams = unknown> = {
    id?: number;
    body?: TBody;
    params?: TParams;
};

export const GetCurrentUser = async () => {
    return request<TGetCurrentUserResponse, undefined>({
        method: HTTP_METHODS.GET,
        url: "/user/me"
    });
};

export const GetUsers = async (params?: WithSignal<TGetUsersParams>) => {
    const { signal, ...urlParams } = params || {};
    const abortSignal = signal;
    return request<TGetUsersResponse, TGetUsersParams>({
        method: HTTP_METHODS.GET,
        url: "/users",
        params: urlParams as TQueryParams,
        signal: abortSignal
    });
};

export const GetUserById = async ({ id }: UserApiArgs) => {
    return request<TGetUserByIdResponse, undefined>({
        method: HTTP_METHODS.GET,
        url: `/users/${id}`
    });
};

export const UpdateUser = async ({ id, body }: UserApiArgs<TUpdateUserBody>) => {
    return request<TUpdateUserResponse, TUpdateUserBody>({
        method: HTTP_METHODS.PATCH,
        url: `/users/${id}`,
        body
    });
};

export const DeleteUser = async ({ id }: UserApiArgs) => {
    return request<TDeleteUserResponse, undefined>({
        method: HTTP_METHODS.DELETE,
        url: `/users/${id}`
    });
};

export const UpdateUserStatus = async ({ id, body }: UserApiArgs<TUpdateUserStatusBody>) => {
    return request<TUpdateUserStatusResponse, TUpdateUserStatusBody>({
        method: HTTP_METHODS.PUT,
        url: `/users/${id}/status`,
        body
    });
};

export const InstallerInvite = async ({ body }: UserApiArgs<TInstallerInviteBody>) => {
    return request<TInstallerInviteResponse, TInstallerInviteBody>({
        method: HTTP_METHODS.POST,
        url: "/users/installer-invite",
        body
    });
};

export const InstallerReinvite = async ({ id }: UserApiArgs) => {
    return request<TInstallerReinviteResponse, undefined>({
        method: HTTP_METHODS.POST,
        url: `/users/${id}/installer-reinvite`
    });
};

export const CustomerOnboard = async ({ body }: UserApiArgs<TCustomerOnboardBody>) => {
    return request<TCustomerOnboardResponse, TCustomerOnboardBody>({
        method: HTTP_METHODS.POST,
        url: "/users/customer-onboard",
        body
    });
};

export const UpdateFcmToken = async ({ body }: UserApiArgs<TUpdateFcmTokenBody>) => {
    return request<TUpdateFcmTokenResponse, TUpdateFcmTokenBody>({
        method: HTTP_METHODS.PUT,
        url: "/users/fcm",
        body
    });
};

export const ExportUsers = async (params?: WithSignal<TExportUsersParams>) => {
    const { signal, ...urlParams } = params || {};
    const abortSignal = signal;
    return request<TExportUsersResponse, TExportUsersParams>({
        method: HTTP_METHODS.GET,
        url: "/users/export",
        params: urlParams as TQueryParams,
        signal: abortSignal
    });
};

export { USER_QUERY_KEYS };
