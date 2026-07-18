import type { ChangeEvent, FormEvent } from "react";

import { CustomModal } from "@/components/custom/CustomModal";
import CustomButton from "@/components/custom/CustomButton/CustomButton";
import { Input } from "@/components/custom/Input";
import TextareaInput from "@/components/custom/Inputs/TextareaInput/TextareaInput";
import type { TAgentEditFormValues } from "./AiAgentsManagement.Container";

type TEditAgentModalProps = {
    open: boolean;
    agentName?: string;
    values: TAgentEditFormValues;
    isSubmitting: boolean;
    onClose: () => void;
    onChange: <K extends keyof TAgentEditFormValues>(
        field: K,
        value: TAgentEditFormValues[K],
    ) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export const EditAgentModal = ({
    open,
    agentName,
    values,
    isSubmitting,
    onClose,
    onChange,
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
            contentClassName="px-8 py-2"
            titleClassName="text-pulse-green-dark"
        >
            <form
                id="agent-edit-form"
                onSubmit={onSubmit}
                className="flex flex-col gap-1"
            >
                <Input
                    label="Model"
                    value={values.model_name}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        onChange("model_name", event.target.value)
                    }
                    placeholder="e.g. openai:gpt-4o-mini (blank = provider default)"
                    labelClass="font-normal"
                />
                <TextareaInput
                    name="system_prompt_override"
                    label="System Prompt Override"
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
            </form>
        </CustomModal>
    );
};
