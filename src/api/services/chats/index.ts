import { request } from "@/api/client/request";
import type { TQueryParams, WithSignal } from "@/api/types/common";
import { HTTP_METHODS } from "@/constants";
import type { TCreateChatBody, TGetChatsListingParams } from "./chats.request.types";
import type {
    TCreateChatResponse,
    TGetChatsListingResponse,
    TGetChatEventsResponse
} from "./chats.response.types";

export type ApiArgs<TBody = unknown, TParams = unknown> = {
    id?: number;
    body?: TBody;
    params?: TParams;
};

export const CreateChat = async ({ body }: ApiArgs<TCreateChatBody>) => {
    return request<TCreateChatResponse, TCreateChatBody>({
        method: HTTP_METHODS.POST,
        url: "/chats",
        body
    });
};
export const GetChatById = async (id: number) => {
    return request<TCreateChatResponse, TCreateChatBody>({
        method: HTTP_METHODS.GET,
        url: `/chats/${id}`
    });
};

export const GetChatsListing = async (params?: WithSignal<TGetChatsListingParams>) => {
    const { signal, ...urlParams } = params || {};
    const abortSignal = signal;

    return request<TGetChatsListingResponse, TGetChatsListingParams>({
        method: HTTP_METHODS.GET,
        url: "/chats",
        params: urlParams as TQueryParams,
        signal: abortSignal
    });
};

export const getChatEventByChatId = (id: number, params?: WithSignal<TGetChatsListingParams>) => {
    const { signal, ...urlParams } = params || {};
    const abortSignal = signal;
    return request<TGetChatEventsResponse, TGetChatsListingParams>({
        method: HTTP_METHODS.GET,
        url: `/chats/${id}/events`,
        params: urlParams as TQueryParams,
        signal: abortSignal
    });
};
