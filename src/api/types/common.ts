export type THttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type TQueryParams = {
    [key: string]: string | number | boolean | Array<string | number | boolean>;
};

export type TApiErrorBody = {
    message: string;
    error?: Record<string, string>;
    status?: number;
};

export type TApiResponseBody<T> = {
    status: number;
    data: T | null;
    error?: TApiErrorBody;
};

export type TRequestHeaders = {
    [key: string]: string;
};

export interface TApiRequestParams<B> {
    method: THttpMethod;
    url: string;
    body?: B;
    params?: Record<string, unknown>;
    token?: string | null;
    formData?: boolean;
    signal?: AbortSignal;
    requireAuth?: boolean;
}
export type TApiArgs<TBody = unknown, TParams = unknown> = {
    id?: number;
    body?: TBody;
    params?: TParams;
};

export type WithSignal<T> = T & { signal?: AbortSignal };
