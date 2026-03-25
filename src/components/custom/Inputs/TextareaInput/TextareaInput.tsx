import { forwardRef } from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { ITextareaInputProps } from "./types";

const TextareaInput = forwardRef<HTMLTextAreaElement, ITextareaInputProps>(
    (
        {
            name,
            label,
            value,
            onChange,
            placeholder,
            containerClasses = "",
            textareaClasses = "",
            labelClass = "",
            error,
            rows = 4,
            maxLength,
            showCharacterCount = false,
            characterCountClass = "",
            ...rest
        },
        ref
    ) => {
        const characterCount = typeof value === "string" ? value.length : 0;
        const baseClasses =
            "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[1px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";

        return (
            <div className={cn(containerClasses)}>
                {label && (
                    <Label
                        htmlFor={name}
                        className={cn("text-base text-app-primary font-normal", labelClass)}
                    >
                        {label}
                    </Label>
                )}
                <div className="relative">
                    <textarea
                        ref={ref}
                        id={name}
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        rows={rows}
                        maxLength={maxLength}
                        className={cn(baseClasses, textareaClasses)}
                        {...rest}
                    />
                </div>
                {showCharacterCount && maxLength && (
                    <div className={cn("text-xs text-gray-500 text-right", characterCountClass)}>
                        {characterCount}/{maxLength}
                    </div>
                )}
                {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
            </div>
        );
    }
);

export default TextareaInput;
