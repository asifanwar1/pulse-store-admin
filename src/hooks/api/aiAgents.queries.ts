import { useMutation, useQuery } from "@tanstack/react-query";

import {
    AI_AGENT_QUERY_KEYS,
    GetAgentConfigs,
    GetAvailableModels,
    GetSupportTickets,
    UpdateAgentConfig,
    UpdateAgentStatus,
    UpdateTicketStatus,
} from "@/api";
import type {
    TAgentKey,
    TGetSupportTicketsParams,
    TUpdateAgentConfigBody,
    TUpdateAgentStatusBody,
    TUpdateTicketStatusBody,
} from "@/api/services/aiAgents/aiAgents.request.types";
import Config from "@/Config";
import { queryClient } from "@/lib/queryClient";
import { useStore } from "@/store/store";
import { invalidateMultiple } from "@/utils/common.utils";
import { useDataTableQuery } from "../useDataTableQuery";

export const useGetAgentConfigs = () => {
    const isAuthenticated = useStore((state) => state.isAuthenticated);

    return useQuery({
        queryKey: [AI_AGENT_QUERY_KEYS.AGENTS],
        queryFn: () => GetAgentConfigs(),
        enabled: isAuthenticated,
    });
};

export const useGetAvailableModels = () => {
    const isAuthenticated = useStore((state) => state.isAuthenticated);

    return useQuery({
        queryKey: [AI_AGENT_QUERY_KEYS.AVAILABLE_MODELS],
        queryFn: () => GetAvailableModels(),
        enabled: isAuthenticated,
    });
};

export const useUpdateAgentConfig = () => {
    return useMutation({
        mutationFn: ({
            agentKey,
            body,
        }: {
            agentKey: TAgentKey;
            body: TUpdateAgentConfigBody;
        }) => UpdateAgentConfig({ agentKey, body }),
        onSuccess: async () => {
            await invalidateMultiple(queryClient, [
                [AI_AGENT_QUERY_KEYS.AGENTS],
            ]);
        },
    });
};

export const useUpdateAgentStatus = () => {
    return useMutation({
        mutationFn: ({
            agentKey,
            body,
        }: {
            agentKey: TAgentKey;
            body: TUpdateAgentStatusBody;
        }) => UpdateAgentStatus({ agentKey, body }),
        onSuccess: async () => {
            await invalidateMultiple(queryClient, [
                [AI_AGENT_QUERY_KEYS.AGENTS],
            ]);
        },
    });
};

export const useGetSupportTickets = (
    props: TGetSupportTicketsParams,
    enabled?: boolean,
) => {
    const isAuthenticated = useStore((state) => state.isAuthenticated);
    const { limit = Config.LIMIT, is_resolved } = props;

    const { data, count, ...rest } = useDataTableQuery({
        queryKey: [AI_AGENT_QUERY_KEYS.TICKETS, String(is_resolved), String(limit)],
        limit,
        enabled: enabled !== false && isAuthenticated,
        queryFn: async (params) => ({
            status: 200,
            data: await GetSupportTickets({
                page: params.page,
                limit: params.limit,
                ...(is_resolved !== undefined &&
                    is_resolved !== null && { is_resolved }),
            }),
        }),
    });

    return { data, count, ...rest };
};

export const useUpdateTicketStatus = () => {
    return useMutation({
        mutationFn: ({
            id,
            body,
        }: {
            id: number;
            body: TUpdateTicketStatusBody;
        }) => UpdateTicketStatus({ id, body }),
        onSuccess: async () => {
            await invalidateMultiple(queryClient, [
                [AI_AGENT_QUERY_KEYS.TICKETS],
            ]);
        },
    });
};
