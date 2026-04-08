import { forwardRef } from "react";

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
            labelRequired = false,
            labelRequiredClass = "",
            error,
            rows = 4,
            maxLength,
            showCharacterCount = false,
            characterCountClass = "",
            ...rest
        },
        ref,
    ) => {
        const characterCount = typeof value === "string" ? value.length : 0;
        const baseClasses =
            "focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-20 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[1px] disabled:cursor-not-allowed disabled:opacity-50";

        return (
            <div className={cn(containerClasses)}>
                {label && (
                    <p
                        className={`mb-0 text-sm text-pulse-green font-500 mb-2 ${labelClass}`}
                    >
                        {label}{" "}
                        {labelRequired && (
                            <span
                                className={`text-red-500 ${labelRequiredClass}`}
                            >
                                *
                            </span>
                        )}
                    </p>
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
                        className={cn(
                            baseClasses,
                            textareaClasses,
                            "text-sm shadow-sm border-[#e2e8f0] rounded-6 !font-normal transition-all placeholder:text-pulse-green/60 bg-white",
                            error && "",
                        )}
                        {...rest}
                    />
                </div>
                {showCharacterCount && maxLength && (
                    <div
                        className={cn(
                            "text-xs text-gray-500 text-right",
                            characterCountClass,
                        )}
                    >
                        {characterCount}/{maxLength}
                    </div>
                )}
                {error && <p className="text-red-500 text-sm -mt-2">{error}</p>}
            </div>
        );
    },
);

export default TextareaInput;
