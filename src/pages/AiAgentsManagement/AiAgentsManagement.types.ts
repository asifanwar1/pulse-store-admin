import type { TAgentConfigResponse } from "@/api/services/aiAgents/aiAgents.response.types";
import type { TAvailableModel } from "@/api/services/aiAgents/aiAgents.response.types";
import type { SelectOption } from "@/components/custom/Select";
import type { ReactEventHandler } from "react";

export type AgentCardProps = {
    agent: TAgentConfigResponse;
    onEdit: (agent: TAgentConfigResponse) => void;
    onToggleActive: (agent: TAgentConfigResponse) => void;
    isTogglingActive?: boolean;
};

export type TEditAgentModalProps = {
    open: boolean;
    agentName?: string;
    values: TAgentEditFormValues;
    availableModels: TAvailableModel[];
    isSubmitting: boolean;
    modelOptions: SelectOption[];
    selectedModel: SelectOption | null;
    onClose: () => void;
    onChange: <K extends keyof TAgentEditFormValues>(
        field: K,
        value: TAgentEditFormValues[K],
    ) => void;
    onModelChange: (value: SelectOption | SelectOption[] | null) => void;
    onSubmit: ReactEventHandler<HTMLFormElement>;
};

export type TAgentEditFormValues = {
    model_name: string;
    system_prompt_override: string;
};
