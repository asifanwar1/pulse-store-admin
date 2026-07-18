export type TAgentKey = "product_listing" | "order_tracking" | "customer_query";

export type TUpdateAgentConfigBody = {
    model_name?: string | null;
    system_prompt_override?: string | null;
};

export type TUpdateAgentStatusBody = {
    is_enabled: boolean;
};

export type TGetSupportTicketsParams = {
    page?: number;
    limit?: number;
    is_resolved?: boolean | null;
};

export type TUpdateTicketStatusBody = {
    is_resolved: boolean;
};

export type TChatBody = {
    message: string;
    conversation_id?: number;
};
