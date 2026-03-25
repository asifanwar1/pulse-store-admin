import type { TextareaHTMLAttributes } from "react";

export interface ITextareaInputProps
    extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
    name?: string;
    label?: string;
    containerClasses?: string;
    textareaClasses?: string;
    labelClass?: string;
    error?: string;
    rows?: number;
    maxLength?: number;
    showCharacterCount?: boolean;
    characterCountClass?: string;
}
