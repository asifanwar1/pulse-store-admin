import { request } from "@/api/client/request";
import type { TQueryParams, WithSignal } from "@/api/types/common";
import { HTTP_METHODS } from "@/constants";
import type {
    TAgentKey,
    TGetSupportTicketsParams,
    TUpdateAgentConfigBody,
    TUpdateAgentStatusBody,
    TUpdateTicketStatusBody,
} from "./aiAgents.request.types";
import type {
    TGetAgentConfigsResponse,
    TGetSupportTicketsResponse,
    TUpdateAgentConfigResponse,
    TUpdateAgentStatusResponse,
    TUpdateTicketStatusResponse,
} from "./aiAgents.response.types";
import { AI_AGENT_QUERY_KEYS } from "./queryKeys";

export const GetAgentConfigs = async () => {
    return request<TGetAgentConfigsResponse, undefined>({
        method: HTTP_METHODS.GET,
        url: "/ai-agents/",
    });
};

export const UpdateAgentConfig = async ({
    agentKey,
    body,
}: {
    agentKey: TAgentKey;
    body: TUpdateAgentConfigBody;
}) => {
    return request<TUpdateAgentConfigResponse, TUpdateAgentConfigBody>({
        method: HTTP_METHODS.PATCH,
        url: `/ai-agents/${agentKey}`,
        body,
    });
};

export const UpdateAgentStatus = async ({
    agentKey,
    body,
}: {
    agentKey: TAgentKey;
    body: TUpdateAgentStatusBody;
}) => {
    return request<TUpdateAgentStatusResponse, TUpdateAgentStatusBody>({
        method: HTTP_METHODS.PATCH,
        url: `/ai-agents/${agentKey}/status`,
        body,
    });
};

export const GetSupportTickets = async (
    params?: WithSignal<TGetSupportTicketsParams>,
) => {
    const { signal, is_resolved, ...rest } = params || {};

    return request<TGetSupportTicketsResponse, TGetSupportTicketsParams>({
        method: HTTP_METHODS.GET,
        url: "/ai-agents/tickets",
        params: {
            ...rest,
            ...(is_resolved !== undefined &&
                is_resolved !== null && { is_resolved }),
        } as TQueryParams,
        signal,
    });
};

export const UpdateTicketStatus = async ({
    id,
    body,
}: {
    id: number;
    body: TUpdateTicketStatusBody;
}) => {
    return request<TUpdateTicketStatusResponse, TUpdateTicketStatusBody>({
        method: HTTP_METHODS.PATCH,
        url: `/ai-agents/tickets/${id}/status`,
        body,
    });
};

export { AI_AGENT_QUERY_KEYS };
export { streamAgentChat } from "./streamChat";
export type { TAgentChatEvent } from "./streamChat";
export type {
    TAgentKey,
    TChatBody,
    TGetSupportTicketsParams,
    TUpdateAgentConfigBody,
    TUpdateAgentStatusBody,
    TUpdateTicketStatusBody,
} from "./aiAgents.request.types";
export type {
    TAgentConfigResponse,
    TGetAgentConfigsResponse,
    TGetSupportTicketsResponse,
    TSupportTicketResponse,
    TUpdateAgentConfigResponse,
    TUpdateAgentStatusResponse,
    TUpdateTicketStatusResponse,
} from "./aiAgents.response.types";
