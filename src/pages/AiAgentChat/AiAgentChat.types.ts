import type {
    TAgentKey,
    TChatMedia,
} from "@/api/services/aiAgents/aiAgents.request.types";
import type { FileUploaderValue } from "@/components/custom/Inputs/FileUploader/types";

export type TChatMessageRole = "user" | "assistant" | "error";

export type TChatMessage = {
    id: string;
    role: TChatMessageRole;
    text: string;
    media?: TChatMedia[];
};

export type TAgentConversationState = {
    conversationId?: number;
    messages: TChatMessage[];
    draft: string;
    attachments: FileUploaderValue[];
};

export type TAgentConversations = Record<TAgentKey, TAgentConversationState>;
