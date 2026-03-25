import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IQuantitySelectorProps } from "./types";

const QuantitySelector = React.forwardRef<HTMLDivElement, IQuantitySelectorProps>(
    (
        {
            value: controlledValue,
            onChange: controlledOnChange,

            name,
            register,
            setValue,
            watch,
            error,

            min = 0,
            max = 999,
            step = 1,
            disabled = false,
            className,
            size = "md",
            showLabel = false,
            label,
            defaultValue = 0,
            ...props
        },
        ref
    ) => {
        const isControlled = controlledValue !== undefined && controlledOnChange !== undefined;
        const isFormControlled = name && setValue && watch;

        const getCurrentValue = (): number => {
            if (isControlled) {
                return controlledValue;
            }
            if (isFormControlled) {
                return watch(name) || defaultValue;
            }
            return defaultValue;
        };

        const currentValue = getCurrentValue();

        const handleValueChange = (newValue: number): void => {
            if (isControlled) {
                controlledOnChange?.(newValue);
            } else if (isFormControlled) {
                setValue(name, newValue, { shouldValidate: true });
            }
        };

        const handleDecrement = (): void => {
            if (disabled) return;
            const newValue = Math.max(min, currentValue - step);
            handleValueChange(newValue);
        };

        const handleIncrement = (): void => {
            if (disabled) return;
            const newValue = Math.min(max, currentValue + step);
            handleValueChange(newValue);
        };

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
            if (disabled) return;
            const inputValue = parseInt(e.target.value, 10);
            if (!isNaN(inputValue)) {
                const clampedValue = Math.max(min, Math.min(max, inputValue));
                handleValueChange(clampedValue);
            }
        };

        const sizeClasses = {
            sm: "h-8 text-sm",
            md: "h-10 text-base",
            lg: "h-12 text-lg"
        };

        const buttonSizeClasses = {
            sm: "w-8",
            md: "w-10",
            lg: "w-12"
        };

        const errorMessage = typeof error === "string" ? error : error?.message;

        return (
            <div ref={ref} className={cn("flex flex-col gap-1", className)} {...props}>
                {showLabel && label && (
                    <label className="text-sm font-medium text-gray-700 capitalize">{label}</label>
                )}
                <div
                    className={cn(
                        "flex items-center border border-gray-300 rounded-md bg-white overflow-hidden",
                        sizeClasses[size],
                        disabled && "opacity-50 cursor-not-allowed"
                    )}
                >
                    <button
                        type="button"
                        onClick={handleDecrement}
                        disabled={disabled || currentValue <= min}
                        className={cn(
                            "flex items-center justify-center border-r border-gray-300 bg-transparent hover:bg-transparent transition-colors duration-200 cursor-pointer",
                            buttonSizeClasses[size],
                            (disabled || currentValue <= min) && "opacity-50 cursor-not-allowed"
                        )}
                        aria-label="Decrease quantity"
                    >
                        <Minus className="w-4 h-4 text-gray-600" />
                    </button>

                    <div className="flex-1 flex items-center justify-center">
                        <input
                            type="number"
                            value={currentValue}
                            min={min}
                            max={max}
                            step={step}
                            disabled={disabled}
                            tabIndex={-1}
                            className={cn(
                                "w-full text-center bg-transparent border-none outline-none focus:ring-0",
                                "text-gray-900 font-medium",
                                size === "sm" && "text-sm",
                                size === "md" && "text-base",
                                size === "lg" && "text-lg"
                            )}
                            aria-label="Quantity"
                            {...(register && name
                                ? { ...register(name), onChange: handleInputChange }
                                : { onChange: handleInputChange })}
                        />
                    </div>

                    <button
                        type="button"
                        onClick={handleIncrement}
                        disabled={disabled || currentValue >= max}
                        className={cn(
                            "flex items-center justify-center border-l border-gray-300 bg-transparent hover:bg-transparent transition-colors duration-200 cursor-pointer",
                            buttonSizeClasses[size],
                            (disabled || currentValue >= max) && "opacity-50 cursor-not-allowed"
                        )}
                        aria-label="Increase quantity"
                    >
                        <Plus className="w-4 h-4 text-gray-600" />
                    </button>
                </div>
                {errorMessage && <p className="text-xs text-red-500">{errorMessage}</p>}
            </div>
        );
    }
);

export { QuantitySelector };
