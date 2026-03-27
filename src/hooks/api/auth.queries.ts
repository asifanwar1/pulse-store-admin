import {
    ChangePassword,
    ForgetPasswordApi,
    ForgetPasswordVerification,
    GetMe,
    LoginApi,
    LogoutUser,
    ResetPassword,
} from "@/api";
import { useStore } from "@/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AUTH_QUERY_KEYS } from "@/api/services/auth/queryKeys";
import { clearQueryCache } from "@/lib/api";
import type { UserModel } from "@/api/models/user.model";

export const useGetMe = () => {
    const setAuth = useStore((state) => state.setAuth);

    const handleGetMe = async () => {
        const currentState = useStore.getState();
        if (!currentState.isAuthenticated || !currentState.token) return;

        try {
            const data = await GetMe();
            const user = data;
            setAuth({ user: user });
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    return useQuery({
        queryKey: [AUTH_QUERY_KEYS.GET_ME],
        queryFn: handleGetMe,
        enabled: true,
        retry: false,
        staleTime: 5 * 60 * 1000,
    });
};

export const useLogin = () => {
    const setAuth = useStore((state) => state.setAuth);

    return useMutation({
        mutationFn: LoginApi,
        onSuccess: async (response) => {
            const token = response?.token;
            if (token) {
                setAuth({ token });
                const data = await GetMe(token);
                const user = data;
                if (user) {
                    setAuth({
                        user: data as unknown as UserModel,
                        isAuthenticated: true,
                    });
                }
            }
        },
    });
};

export const useLogout = () => {
    const clearAuth = useStore((state) => state.clearAuth);
    return useMutation({
        mutationFn: LogoutUser,
        onSuccess: async () => {
            clearQueryCache();
            clearAuth();
        },
        onError: () => {
            clearAuth();
        },
    });
};

export const useForgetPassword = () => {
    return useMutation({
        mutationFn: ForgetPasswordApi,
    });
};

export const useForgetPasswordVerification = () => {
    return useMutation({
        mutationFn: ForgetPasswordVerification,
    });
};

export const useResetPassword = () => {
    return useMutation({
        mutationFn: ResetPassword,
    });
};

export const useChangePassword = () => {
    const setAuth = useStore((state) => state.setAuth);

    return useMutation({
        mutationFn: ChangePassword,
        onSuccess: async (response) => {
            const token = response?.token;
            if (token) {
                setAuth({ token });
            }
        },
    });
};
