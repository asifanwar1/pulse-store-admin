import { useStore } from "@/store";
import axiosInstance from "./axiosInstance";
import { networkRequestErrorHandler } from "@/lib/errorHandlerUtils";

axiosInstance.interceptors.request.use((config) => {
    const customConfig = config as typeof config & { skipAuth?: boolean };

    if (customConfig.skipAuth) {
        return config;
    }
    const token = useStore.getState().token;
    if (token && config.headers) {
        config.headers.Authorization = token;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (
            error &&
            typeof error === "object" &&
            "name" in error &&
            (error.name === "CanceledError" || error.name === "AbortError")
        ) {
            return Promise.reject(error);
        }
        networkRequestErrorHandler(error);
        return Promise.reject(error);
    }
);

export default axiosInstance;
