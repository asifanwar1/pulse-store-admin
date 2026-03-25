import type { ChangeEvent } from "react";

export interface CheckboxProps {
    id: string;
    title: string;
    checked: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    withMargin?: boolean;
    classes?: string;
    inputClasses?: string;
    isDisabled?: boolean;
}
