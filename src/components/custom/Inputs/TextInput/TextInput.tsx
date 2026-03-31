import type { ChangeEvent } from "react";
import { forwardRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { TextInputProps } from "./types";

import { Eye, EyeOff } from "lucide-react";

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
    (
        {
            name,
            label,
            value,
            onChange,
            placeholder,
            icon,
            rightElement,
            containerClasses = "",
            className = "",
            labelClass = "",
            iconClass = "",
            rightElementClass = "",
            wholeNumbers = false,
            error,
            type = "text",
            ...rest
        },
        ref,
    ) => {
        const [showPassword, setShowPassword] = useState(false);
        const isPasswordType = type === "password";
        const displayType = isPasswordType && showPassword ? "text" : type;

        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;
            if (type === "number" && wholeNumbers) {
                if (newValue.trim() === "" || Number(newValue) > 0) {
                    onChange?.(e);
                }
            } else {
                onChange?.(e);
            }
        };

        const handlePasswordToggle = () => {
            setShowPassword(!showPassword);
        };

        const baseInputClasses = cn(
            "file:text-foreground placeholder:text-muted selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-1 border-[#DBDBDB] flex h-9 w-full min-w-0 rounded-md  bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-70 md:text-sm",
            "focus:outline-none focus-visible:ring-0",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            rightElement ? "pr-10" : "",
            className,
        );

        return (
            <div className={cn(containerClasses)}>
                {label && (
                    <Label
                        htmlFor={name}
                        className={cn(
                            "text-base text-app-primary mb-1.5  font-normal",
                            labelClass,
                        )}
                    >
                        {label}
                    </Label>
                )}
                <div className="relative my-0">
                    {icon && (
                        <span
                            className={cn(
                                "absolute inset-y-0 left-3 flex items-center text-gray-400",
                                iconClass,
                            )}
                        >
                            {icon}
                        </span>
                    )}
                    <Input
                        ref={ref}
                        id={name}
                        name={name}
                        type={displayType}
                        value={value}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className={baseInputClasses}
                        {...rest}
                    />
                    {isPasswordType ? (
                        <div
                            onClick={handlePasswordToggle}
                            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                        >
                            {/* <img
                                src={showPassword ? eyeIcon : eyeOffIcon}
                                alt={showPassword ? "Hide password" : "Show password"}
                                className="w-5 h-5"
                            /> */}
                            {showPassword ? (
                                <Eye size={20} />
                            ) : (
                                <EyeOff size={20} />
                            )}
                        </div>
                    ) : rightElement ? (
                        <span
                            className={cn(
                                "absolute inset-y-[0.7px] right-[0.5px] px-3 flex items-center text-muted-foreground pointer-events-none  rounded-r-md",
                                rightElementClass,
                            )}
                        >
                            {rightElement}
                        </span>
                    ) : null}
                </div>
                {error && (
                    <span className="text-red-500 text-xs ">{error}</span>
                )}
            </div>
        );
    },
);

TextInput.displayName = "TextInput";

export default TextInput;
