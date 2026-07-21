import type { TAgentKey } from "./aiAgents.request.types";

export type TAgentConfigResponse = {
    id: number;
    agent_key: TAgentKey;
    display_name: string;
    is_enabled: boolean;
    model_name?: string | null;
    system_prompt_override?: string | null;
    default_system_prompt?: string | null;
    updated_by?: number | null;
    created_at: string;
    updated_at?: string | null;
};

export type TGetAgentConfigsResponse = {
    data: TAgentConfigResponse[];
    count: number;
};

export type TUpdateAgentConfigResponse = TAgentConfigResponse;
export type TUpdateAgentStatusResponse = TAgentConfigResponse;

export type TAvailableModel = {
    model: string;
    provider: string;
    label: string;
    note: string;
    available: boolean;
};

export type TGetAvailableModelsResponse = {
    data: TAvailableModel[];
};

export type TSupportTicketResponse = {
    id: number;
    conversation_id: number;
    user_id: number;
    subject: string;
    message: string;
    is_resolved: boolean;
    created_at: string;
    resolved_at?: string | null;
    resolved_by?: number | null;
};

export type TGetSupportTicketsResponse = {
    data: TSupportTicketResponse[];
    count: number;
};

export type TUpdateTicketStatusResponse = TSupportTicketResponse;

export type TSupportTicketAnalyticsMetric = {
    value: number;
    change_percentage: string;
};

export type TGetSupportTicketAnalyticsResponse = {
    totalTickets: TSupportTicketAnalyticsMetric;
    resolvedTickets: TSupportTicketAnalyticsMetric;
    unresolvedTickets: TSupportTicketAnalyticsMetric;
    resolutionRate: TSupportTicketAnalyticsMetric;
};
