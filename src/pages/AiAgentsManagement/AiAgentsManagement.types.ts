import type { TAgentConfigResponse } from "@/api/services/aiAgents/aiAgents.response.types";

export type AgentCardProps = {
    agent: TAgentConfigResponse;
    onEdit: (agent: TAgentConfigResponse) => void;
    onToggleActive: (agent: TAgentConfigResponse) => void;
    isTogglingActive?: boolean;
};
