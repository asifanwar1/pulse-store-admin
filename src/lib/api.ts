import { HTTP_STATUS } from "@/constants";

import { showToast } from "./toast";
import {
    initialAuthState,
    type AuthStateType,
} from "../api/models/storage.model";
import type { ErrorResponseBody } from "./types";
import { queryClient } from "@/services/QueryClient";
import type { TApiErrorBody } from "@/api/types/common";
import { resetAllSlices } from "@/store";
import { AUTH_QUERY_KEYS } from "@/api/services/auth/queryKeys";

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

// API response handling utilities
export const handleApiResponse = <T>(response: T): T => {
    return response;
};

// Error response interface for better type safety

export const errorHandler = (
    status: number,
    body: ErrorResponseBody,
): never => {
    // Show error toast for all errors except unauthorized
    if (status !== HTTP_STATUS.UNAUTHORIZED) {
        showToast.error(body.message || "An error occurred");
    }

    // Handle unauthorized errors (logout user)
    if (status === HTTP_STATUS.UNAUTHORIZED) {
        // Clear auth state from query cache
        queryClient.setQueryData<AuthStateType>(
            [AUTH_QUERY_KEYS.AUTH],
            () => initialAuthState as AuthStateType,
        );

        // Clear localStorage if in browser
        if (typeof window !== "undefined") {
            localStorage.clear();
        }
    }

    // Create and throw API error
    const apiError: TApiErrorBody = {
        message: body.message || "An error occurred",
        error: body.error,
    };

    throw apiError;
};
