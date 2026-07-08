import type { ComponentProps } from "react";
import type { Toggle } from "@/components/ui/toggle";

export type TCustomToggleProps = {
    value?: string;
    label?: string;
    isLabel?: boolean;
    labelClass?: string;
    isError?: boolean;
    errorMessage?: string;
    onChange?: (value: string) => void;
    active?: boolean;
    componentProps?: ComponentProps<typeof Toggle>;
    onToggle?: (value: boolean) => void;
    onLabel?: string;
    offLabel?: string;
    disabled?: boolean;
    readonly?: boolean;
    className?: string;
    onCircleClass?: string;
    offCircleClass?: string;
    onLabelClass?: string;
    offLabelClass?: string;
};
