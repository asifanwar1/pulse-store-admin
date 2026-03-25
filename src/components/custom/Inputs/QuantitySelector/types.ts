import type { UseFormRegister, UseFormSetValue, UseFormWatch, FieldError } from "react-hook-form";

export interface IQuantitySelectorProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
    value?: number;
    onChange?: (value: number) => void;

    name?: string;
    register?: UseFormRegister<any>;
    setValue?: UseFormSetValue<any>;
    watch?: UseFormWatch<any>;
    error?: FieldError | string;

    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    className?: string;
    size?: "sm" | "md" | "lg";
    showLabel?: boolean;
    label?: string;
    defaultValue?: number;
}
