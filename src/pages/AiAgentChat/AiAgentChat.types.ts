import type { TAgentKey } from "@/api/services/aiAgents/aiAgents.request.types";

export type TChatMessageRole = "user" | "assistant" | "error";

export type TChatMessage = {
    id: string;
    role: TChatMessageRole;
    text: string;
};

export type TAgentConversationState = {
    conversationId?: number;
    messages: TChatMessage[];
    draft: string;
};

export type TAgentConversations = Record<TAgentKey, TAgentConversationState>;
