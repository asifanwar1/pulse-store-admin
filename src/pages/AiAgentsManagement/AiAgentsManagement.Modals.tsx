import type { ChangeEvent, FormEvent } from "react";

import { CustomModal } from "@/components/custom/CustomModal";
import CustomButton from "@/components/custom/CustomButton/CustomButton";
import TextareaInput from "@/components/custom/Inputs/TextareaInput/TextareaInput";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { TAvailableModel } from "@/api/services/aiAgents/aiAgents.response.types";
import type { TAgentEditFormValues } from "./AiAgentsManagement.Container";

const PROVIDER_DEFAULT_VALUE = "__provider_default__";

type TEditAgentModalProps = {
    open: boolean;
    agentName?: string;
    values: TAgentEditFormValues;
    availableModels: TAvailableModel[];
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
    availableModels,
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
                <label
                    className="text-sm font-normal"
                    htmlFor="agent-model-select"
                >
                    Model
                </label>
                <Select
                    value={values.model_name || PROVIDER_DEFAULT_VALUE}
                    onValueChange={(value) =>
                        onChange(
                            "model_name",
                            value === PROVIDER_DEFAULT_VALUE ? "" : value,
                        )
                    }
                >
                    <SelectTrigger id="agent-model-select" className="w-full">
                        <SelectValue placeholder="Provider default" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={PROVIDER_DEFAULT_VALUE}>
                            Use provider default
                        </SelectItem>
                        {availableModels.map((model) => (
                            <SelectItem
                                key={model.model}
                                value={model.model}
                                disabled={!model.available}
                            >
                                {model.label}
                                {!model.available
                                    ? " (needs API key)"
                                    : ""} — {model.note}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
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
