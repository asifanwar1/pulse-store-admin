import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input as BaseInput } from "@/components/ui/input";

export interface InputProps extends React.ComponentProps<typeof BaseInput> {
    required?: boolean;
    label?: string;
    labelWeight?: string | number;
    error?: string;
    icon?: React.ReactNode | string | null;
    showSearchIcon?: boolean;
    rightIcon?: React.ReactNode | string | null;
    containerClass?: string;
    rightIconClass?: string;
    labelClass?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            required = false,
            label,
            labelWeight,
            error,
            icon = null,
            showSearchIcon = false,
            className,
            type = "text",
            onChange,
            rightIcon = null,
            containerClass = "",
            rightIconClass = "",
            labelClass = "",
            ...props
        },
        ref,
    ) => {
        const [showPassword, setShowPassword] = React.useState<boolean>(false);
        const inputType = type === "password" && showPassword ? "text" : type;

        return (
            <div className={`flex flex-col ${containerClass}`}>
                {label && (
                    <p
                        style={
                            labelWeight
                                ? { fontWeight: labelWeight }
                                : undefined
                        }
                        className={`mb-0 text-sm font-500 text-text ${labelClass}`}
                    >
                        {label}{" "}
                        {required && <span className="text-red-500">*</span>}
                    </p>
                )}
                <div className="relative w-full text-text ">
                    {icon && (
                        <span className="absolute text-[#64748B] left-3 top-1/2 -translate-y-1/2 text-icon">
                            {icon}
                        </span>
                    )}
                    <BaseInput
                        ref={ref}
                        type={inputType}
                        aria-label={label}
                        data-slot="input"
                        aria-invalid={!!error}
                        autoComplete="off"
                        data-lpignore="true"
                        data-form-type="other"
                        onChange={(e) => {
                            const trimmedValue = e.target.value.replace(
                                /^\s+/,
                                "",
                            );
                            if (trimmedValue !== e.target.value) {
                                const event = {
                                    ...e,
                                    target: {
                                        ...e.target,
                                        value: trimmedValue,
                                    },
                                };
                                onChange?.(
                                    event as React.ChangeEvent<HTMLInputElement>,
                                );
                            } else {
                                onChange?.(e);
                            }
                        }}
                        className={cn(
                            "!bg-white",
                            "text-sm shadow-none border-[#e2e8f0] rounded-[6px] !font-normal transition-all placeholder:text-pulse-green/60 my-2.5",
                            icon && "pr-12",
                            error && "border-red-500",
                            type === "password" && "pr-8",
                            showSearchIcon && "pl-10",
                            icon && "pl-10",
                            className,
                        )}
                        {...props}
                    />
                    {type === "password" && (
                        <button
                            type="button"
                            onClick={() => setShowPassword((v) => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center"
                            tabIndex={-1}
                        >
                            {showPassword ? (
                                <EyeOff className="w-4 h-4 text-tertiary" />
                            ) : (
                                <Eye className="w-4 h-4 text-tertiary" />
                            )}
                        </button>
                    )}
                    {rightIcon && (
                        <span
                            className={`absolute text-[#64748B] right-3 top-1/2 -translate-y-1/2 text-icon ${rightIconClass}`}
                        >
                            {rightIcon}
                        </span>
                    )}
                </div>
                {error && (
                    <p className="text-sm text-red-500 font-normal -mt-1">
                        {error}
                    </p>
                )}
            </div>
        );
    },
);

Input.displayName = "Input";
