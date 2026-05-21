import axiosInstance from "./interceptors";
import type { THttpMethod, TRequestHeaders, TQueryParams } from "../types/common";

interface IRequestConfig<TBody = unknown> {
    method: THttpMethod;
    url: string;
    headers?: TRequestHeaders;
    params?: TQueryParams;
    body?: TBody;
    signal?: AbortSignal;
    skipAuth?: boolean;
    token?: string;
}

export const request = async <TResponse = unknown, TBody = unknown>(
    config: IRequestConfig<TBody>
): Promise<TResponse> => {
    if (config.signal?.aborted) {
        const abortError = new Error("Request aborted");
        (abortError as { name?: string }).name = "AbortError";
        throw abortError;
    }

    try {
        const hasBody =
            config.body instanceof FormData ||
            (!!config.body && Object.keys(config.body).length > 0);

        const axiosConfig = {
            skipAuth: config.skipAuth,
            method: config.method,
            url: config.url,
            headers: config.headers,
            params: config.params,
            ...(hasBody && { data: config.body }),
            ...(config.signal && { signal: config.signal })
        };

        const response = await axiosInstance(axiosConfig);
        return response.data as TResponse;
    } catch (error: unknown) {
        console.error(error);
        throw error;
    }
};
