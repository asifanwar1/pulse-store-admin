import { HTTP_STATUS } from "@/constants";

import { showToast } from "./toast";
import {
    initialAuthState,
    type AuthStateType,
} from "../api/models/storage.model";
import { queryClient } from "./queryClient";
import type { TApiErrorBody } from "@/api/types/common";
import { resetAllSlices } from "@/store";
import { AUTH_QUERY_KEYS } from "@/api/services/auth/queryKeys";

export interface ErrorResponseBody {
    message?: string;
    error?: Record<string, string>;
}

export const clearQueryCache = () => {
    queryClient.clear();
    resetAllSlices();
    if (typeof window !== "undefined") {
        localStorage.clear();
    }
};

export const invalidateQueries = (queryKey: string[]): void => {
    queryClient.invalidateQueries({ queryKey });
};

export const removeQueries = (queryKey: string[]): void => {
    queryClient.removeQueries({ queryKey });
};

export const resetQueries = (queryKey: string[]): void => {
    queryClient.resetQueries({ queryKey });
};

export const handleApiResponse = <T>(response: T): T => {
    return response;
};

export const errorHandler = (
    status: number,
    body: ErrorResponseBody,
): never => {
    if (status !== HTTP_STATUS.UNAUTHORIZED) {
        showToast.error(body.message || "An error occurred");
    }

    if (status === HTTP_STATUS.UNAUTHORIZED) {
        queryClient.setQueryData<AuthStateType>(
            [AUTH_QUERY_KEYS.AUTH],
            () => initialAuthState as AuthStateType,
        );

        if (typeof window !== "undefined") {
            localStorage.clear();
        }
    }

    const apiError: TApiErrorBody = {
        message: body.message || "An error occurred",
        error: body.error,
    };

    throw apiError;
};
