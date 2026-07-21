import { useState, type SyntheticEvent } from "react";

import {
    useGetAgentConfigs,
    useGetAvailableModels,
    useUpdateAgentConfig,
    useUpdateAgentStatus,
} from "@/hooks/api/aiAgents.queries";
import type { TAgentConfigResponse } from "@/api/services/aiAgents/aiAgents.response.types";
import { showToast } from "@/lib/toast";
import type { SelectOption } from "@/components/custom/Select";
import type { TAgentEditFormValues } from "./AiAgentsManagement.types";

const PROVIDER_DEFAULT_VALUE = "__provider_default__";

const INITIAL_FORM_VALUES: TAgentEditFormValues = {
    model_name: "",
    system_prompt_override: "",
};

export const useAiAgentsManagement = () => {
    const { data, isPending: isAgentsLoading } = useGetAgentConfigs();
    const agents = data?.data ?? [];

    const { data: availableModelsData } = useGetAvailableModels();
    const availableModels = availableModelsData?.data ?? [];

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedAgent, setSelectedAgent] =
        useState<TAgentConfigResponse | null>(null);
    const [formValues, setFormValues] =
        useState<TAgentEditFormValues>(INITIAL_FORM_VALUES);
    const [togglingAgentKey, setTogglingAgentKey] = useState<string | null>(
        null,
    );

    const { mutateAsync: updateAgentConfig, isPending: isSaving } =
        useUpdateAgentConfig();
    const { mutateAsync: updateAgentStatus, isPending: isUpdatingStatus } =
        useUpdateAgentStatus();

    const openEditModal = (agent: TAgentConfigResponse) => {
        setSelectedAgent(agent);
        setFormValues({
            model_name: agent.model_name ?? "",
            // Show the agent's built-in prompt when there's no override yet, so the
            // admin sees what's actually running instead of a blank box.
            system_prompt_override:
                agent.system_prompt_override ??
                agent.default_system_prompt ??
                "",
        });
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        if (isSaving) return;
        setIsEditModalOpen(false);
        setSelectedAgent(null);
        setFormValues(INITIAL_FORM_VALUES);
    };

    const handleFormChange = <K extends keyof TAgentEditFormValues>(
        field: K,
        value: TAgentEditFormValues[K],
    ) => {
        setFormValues((prev) => ({ ...prev, [field]: value }));
    };

    const handleModelChange = (
        value: SelectOption | SelectOption[] | null,
    ) => {
        const selected = Array.isArray(value) ? value[0] : value;
        const isProviderDefault =
            !selected || selected.value === PROVIDER_DEFAULT_VALUE;
        handleFormChange("model_name", isProviderDefault ? "" : selected.value);
    };

    const handleFormSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!selectedAgent) return;

        const trimmedPrompt = formValues.system_prompt_override.trim();
        const defaultPrompt = (
            selectedAgent.default_system_prompt ?? ""
        ).trim();
        const promptOverride =
            trimmedPrompt && trimmedPrompt !== defaultPrompt
                ? trimmedPrompt
                : null;

        try {
            await updateAgentConfig({
                agentKey: selectedAgent.agent_key,
                body: {
                    model_name: formValues.model_name.trim() || null,
                    system_prompt_override: promptOverride,
                },
            });
            showToast.success("Agent settings updated successfully");
            setIsEditModalOpen(false);
            setSelectedAgent(null);
            setFormValues(INITIAL_FORM_VALUES);
        } catch (error) {
            console.error("Failed to update agent settings:", error);
            showToast.error("Failed to update agent settings");
        }
    };

    const handleToggleActive = async (agent: TAgentConfigResponse) => {
        setTogglingAgentKey(agent.agent_key);
        try {
            await updateAgentStatus({
                agentKey: agent.agent_key,
                body: { is_enabled: !agent.is_enabled },
            });
            showToast.success(
                agent.is_enabled
                    ? `${agent.display_name} disabled`
                    : `${agent.display_name} enabled`,
            );
        } catch (error) {
            console.error("Failed to update agent status:", error);
            showToast.error("Failed to update agent status");
        } finally {
            setTogglingAgentKey(null);
        }
    };

    const modelOptions: SelectOption[] = [
        {
            value: PROVIDER_DEFAULT_VALUE,
            label: "Use provider default",
        },
        ...availableModels.map((model) => ({
            value: model.model,
            label: `${model.label}${!model.available ? " (needs API key)" : ""}`,
            subtitle: model.note,
            disabled: !model.available,
        })),
    ];

    const selectedModel =
        modelOptions.find(
            (option) =>
                option.value ===
                (formValues.model_name || PROVIDER_DEFAULT_VALUE),
        ) ?? null;

    return {
        agents,
        isAgentsLoading,
        availableModels,
        isEditModalOpen,
        selectedAgent,
        formValues,
        isSaving,
        togglingAgentKey,
        isUpdatingStatus,
        modelOptions,
        selectedModel,
        openEditModal,
        closeEditModal,
        handleFormChange,
        handleModelChange,
        handleFormSubmit,
        handleToggleActive,
    };
};
