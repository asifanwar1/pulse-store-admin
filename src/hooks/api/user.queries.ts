import {
    DeleteUser,
    GetCurrentUser,
    GetUserById,
    GetUsers,
    UpdateMe,
    UpdateUserStatus,
    USER_QUERY_KEYS,
} from "@/api";
import type {
    TGetUsersParams,
    TUpdateMeBody,
    TUpdateUserStatusBody,
} from "@/api/services/users/users.request.types";
import { queryClient } from "@/lib/queryClient";
import { invalidateMultiple } from "@/utils/common.utils";
import { useMutation, useQuery } from "@tanstack/react-query";

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

export const useGetUsers = (params?: TGetUsersParams) => {
    return useQuery({
        queryKey: [USER_QUERY_KEYS.USERS, params],
        queryFn: () => GetUsers(params),
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
