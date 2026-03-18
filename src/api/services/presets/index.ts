import { HTTP_METHODS } from "@/constants";
import type {
    TCreatePresetBody,
    TUpdatePresetBody,
    TGetPresetsParams
} from "./presets.request.types";
import type {
    TCreatePresetResponse,
    TUpdatePresetResponse,
    TDeletePresetResponse,
    TGetPresetsResponse,
    TGetPresetByIdResponse
} from "./presets.response.types";
import { request } from "@/api/client/request";
import type { TQueryParams, WithSignal } from "@/api/types/common";
import { QUERY_KEYS } from "./queryKeys";

export type ApiArgs<TBody = unknown, TParams = unknown> = {
    id?: number;
    body?: TBody;
    params?: TParams;
};

export const CreatePreset = async ({ body }: ApiArgs<TCreatePresetBody>) => {
    return request<TCreatePresetResponse, TCreatePresetBody>({
        method: HTTP_METHODS.POST,
        url: "/preset",
        body
    });
};

export const UpdatePreset = async ({ id, body }: ApiArgs<TUpdatePresetBody>) => {
    return request<TUpdatePresetResponse, TUpdatePresetBody>({
        method: HTTP_METHODS.PATCH,
        url: `/preset/edit/${id}`,
        body
    });
};

export const DeletePreset = async ({ id }: ApiArgs) => {
    return request<TDeletePresetResponse, undefined>({
        method: HTTP_METHODS.DELETE,
        url: `/preset/${id}`
    });
};

export const GetPresets = async (params?: WithSignal<TGetPresetsParams>) => {
    const { signal, ...urlParams } = params || {};
    const abortSignal = signal;
    return request<TGetPresetsResponse, TGetPresetsParams>({
        method: HTTP_METHODS.GET,
        url: "/preset",
        params: urlParams as TQueryParams,
        signal: abortSignal
    });
};

export const GetPresetById = async ({ id }: ApiArgs, signal?: AbortSignal) => {
    return request<TGetPresetByIdResponse, undefined>({
        method: HTTP_METHODS.GET,
        url: `/preset/${id}`,
        signal
    });
};

export { QUERY_KEYS };
