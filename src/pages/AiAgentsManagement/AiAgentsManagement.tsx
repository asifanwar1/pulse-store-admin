import { Bot } from "lucide-react";

import AgentCard from "./AgentCard";
import { EditAgentModal } from "./AiAgentsManagement.Modals";
import AiAgentsManagementSkeleton from "./AiAgentsManagementSkeleton";
import { useAiAgentsManagement } from "./AiAgentsManagement.Container";
import EmptyState from "@/components/custom/EmptyState/EmptyState";

const MIN_VALUE = 0;

const AiAgentsManagement = () => {
    const {
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
    } = useAiAgentsManagement();

    return (
        <>
            <div className="flex min-h-0 flex-col gap-6 p-4 sm:p-6">
                {isAgentsLoading && <AiAgentsManagementSkeleton />}

                {!isAgentsLoading && agents.length > MIN_VALUE && (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {agents.map((agent) => (
                            <AgentCard
                                key={agent.id}
                                agent={agent}
                                onEdit={openEditModal}
                                onToggleActive={handleToggleActive}
                                isTogglingActive={
                                    isUpdatingStatus &&
                                    togglingAgentKey === agent.agent_key
                                }
                            />
                        ))}
                    </div>
                )}

                {!isAgentsLoading && agents.length === MIN_VALUE && (
                    <div className="rounded-2xl border border-dashed border-pulse-cream-dark bg-pulse-cream-dark/20 shadow-dash-card">
                        <EmptyState
                            icon={<Bot className="h-5 w-5" />}
                            title="No AI agents configured"
                            description="Agents register themselves automatically the first time this list loads."
                        />
                    </div>
                )}
            </div>

            <EditAgentModal
                open={isEditModalOpen}
                agentName={selectedAgent?.display_name}
                values={formValues}
                availableModels={availableModels}
                isSubmitting={isSaving}
                modelOptions={modelOptions}
                selectedModel={selectedModel}
                onClose={closeEditModal}
                onChange={handleFormChange}
                onModelChange={handleModelChange}
                onSubmit={handleFormSubmit}
            />
        </>
    );
};

export default AiAgentsManagement;
