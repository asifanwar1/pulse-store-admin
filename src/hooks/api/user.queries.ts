import {
    DeleteUser,
    GetCurrentUser,
    GetUserById,
    GetUsers,
    GetUsersAnalytics,
    UpdateMe,
    UpdateUserStatus,
    USER_QUERY_KEYS,
} from "@/api";
import type {
    TGetUsersParams,
    TUpdateMeBody,
    TUpdateUserStatusBody,
} from "@/api/services/users/users.request.types";
import Config from "@/Config";
import { queryClient } from "@/lib/queryClient";
import { useStore } from "@/store/store";
import { invalidateMultiple } from "@/utils/common.utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDataTableQuery } from "../useDataTableQuery";
import { usePaginatedQuery } from "../usePaginatedQuery";

export const useGetUsers = (props: TGetUsersParams, enabled?: boolean) => {
    const isAuthenticated = useStore((state) => state.isAuthenticated);
    const { limit = Config.LIMIT, search = "", status, user_type } = props;

    const { data, count, ...rest } = useDataTableQuery({
        queryKey: [USER_QUERY_KEYS.USERS, search, status, user_type],
        limit,
        enabled: enabled !== false && isAuthenticated,
        queryFn: async (params) => ({
            status: 200,
            data: await GetUsers({
                ...params,
                ...(search && { search }),
                ...(status && { status }),
                ...(user_type && { user_type }),
            }),
        }),
    });
    return { data, count, ...rest };
};

export const useGetUsersPaginated = (
    props?: Omit<TGetUsersParams, "page">,
    enabled?: boolean,
) => {
    const isAuthenticated = useStore((state) => state.isAuthenticated);
    const { limit = Config.LIMIT, search = "" } = props || {};

    return usePaginatedQuery({
        queryKey: [USER_QUERY_KEYS.USERS, "paginated", search],
        limit,
        enabled: enabled !== false && isAuthenticated,
        queryFn: async (params, signal) =>
            GetUsers({
                ...params,
                search,
                limit,
                user_type: "CUSTOMER",
                column: "createdAt",
                signal,
            }),
    });
};

export const useGetCurrentUser = () => {
    return useQuery({
        queryKey: [USER_QUERY_KEYS.CURRENT_USER],
        queryFn: () => GetCurrentUser(),
    });
};

export const useUpdateMe = () => {
    return useMutation({
        mutationFn: (body: TUpdateMeBody) => UpdateMe(body),
        onSuccess: async () => {
            await invalidateMultiple(queryClient, [
                [USER_QUERY_KEYS.CURRENT_USER],
                [USER_QUERY_KEYS.USERS],
                [USER_QUERY_KEYS.USER],
            ]);
        },
    });
};

export const useGetUserById = (id?: number) => {
    return useQuery({
        queryKey: [USER_QUERY_KEYS.USER, id],
        queryFn: () => GetUserById({ id }),
        enabled: !!id,
    });
};

export const useDeleteUser = () => {
    return useMutation({
        mutationFn: (id: number) => DeleteUser({ id }),
        onSuccess: async () => {
            await invalidateMultiple(queryClient, [
                [USER_QUERY_KEYS.CURRENT_USER],
                [USER_QUERY_KEYS.USERS],
                [USER_QUERY_KEYS.USER],
            ]);
        },
    });
};

export const useUpdateUserStatus = () => {
    return useMutation({
        mutationFn: ({
            id,
            body,
        }: {
            id: number;
            body: TUpdateUserStatusBody;
        }) => UpdateUserStatus({ id, body }),
        onSuccess: async () => {
            await invalidateMultiple(queryClient, [
                [USER_QUERY_KEYS.CURRENT_USER],
                [USER_QUERY_KEYS.USERS],
                [USER_QUERY_KEYS.USER],
            ]);
        },
    });
};

export const useGetUsersAnalytics = () => {
    return useQuery({
        queryKey: [USER_QUERY_KEYS.USER_ANALYTICS],
        queryFn: () => GetUsersAnalytics(),
    });
};
