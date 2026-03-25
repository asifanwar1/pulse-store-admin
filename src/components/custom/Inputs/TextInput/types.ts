import type { InputHTMLAttributes, ReactNode } from "react";

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
    name?: string;
    label?: string;
    icon?: ReactNode;
    rightElement?: ReactNode;
    containerClasses?: string;
    inputClasses?: string;
    labelClass?: string;
    iconClass?: string;
    rightElementClass?: string;
    wholeNumbers?: boolean;
    error?: string;
}
