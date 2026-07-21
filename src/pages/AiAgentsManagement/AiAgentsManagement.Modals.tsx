import type { ChangeEvent } from "react";

import { CustomModal } from "@/components/custom/CustomModal";
import CustomButton from "@/components/custom/CustomButton/CustomButton";
import TextareaInput from "@/components/custom/Inputs/TextareaInput/TextareaInput";
import { Select } from "@/components/custom/Select";
import type { TEditAgentModalProps } from "./AiAgentsManagement.types";

export const EditAgentModal = ({
    open,
    agentName,
    values,
    isSubmitting,
    modelOptions,
    selectedModel,
    onClose,
    onChange,
    onModelChange,
    onSubmit,
}: TEditAgentModalProps) => {
    const footer = (
        <div className="flex w-full justify-end gap-3">
            <CustomButton
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
            >
                Cancel
            </CustomButton>
            <CustomButton
                type="submit"
                form="agent-edit-form"
                isLoading={isSubmitting}
            >
                Save Changes
            </CustomButton>
        </div>
    );

    return (
        <CustomModal
            isOpen={open}
            onClose={onClose}
            title={agentName ? `Edit ${agentName}` : "Edit Agent"}
            size="md"
            footer={footer}
            showCloseButton
            closeOnOverlayClick={!isSubmitting}
            closeOnEscape={!isSubmitting}
            className="flex max-h-[90vh] flex-col overflow-hidden"
            cardClassName="min-h-0 flex-1"
            headerClassName="shrink-0"
            contentClassName="px-8 py-2 min-h-0 flex-1 overflow-y-auto"
            titleClassName="text-pulse-green-dark"
        >
            <form
                id="agent-edit-form"
                onSubmit={onSubmit}
                className="flex flex-col gap-1"
            >
                <label className="text-sm font-normal">Model</label>
                <Select
                    options={modelOptions}
                    value={selectedModel}
                    onChange={onModelChange}
                    clearable={false}
                    placeholder="Use provider default"
                    selectBoxContainerClass="!my-1"
                />
                <p className="mb-2 text-xs text-muted-foreground">
                    Grayed-out models need an API key added on the backend
                    before they can be used.
                </p>
                <TextareaInput
                    name="system_prompt_override"
                    label="System Prompt"
                    value={values.system_prompt_override}
                    onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                        onChange("system_prompt_override", event.target.value)
                    }
                    placeholder="Leave blank to use the agent's default instructions"
                    labelClass="font-normal"
                    rows={8}
                    containerClasses="mt-1"
                    textareaClasses="min-h-[180px]"
                />
                <p className="text-xs text-muted-foreground">
                    Pre-filled with this agent's current instructions. Edit and
                    save to customize them, or clear the box to reset to the
                    built-in default.
                </p>
            </form>
        </CustomModal>
    );
};
