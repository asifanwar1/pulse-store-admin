import React from "react";

import { Toggle } from "@/components/ui/toggle";
import type { TCustomToggleProps } from "./CustomToggle.types";

const CustomToggle: React.FC<TCustomToggleProps> = ({
    value = "active",
    label = "Status",
    isLabel = false,
    labelClass = "",
    isError = false,
    errorMessage = "",
    onChange,
    onLabel = "Activate",
    offLabel = "Deactivate",
    readonly = false,
    disabled = false,
    className = "",
    onCircleClass = "",
    offCircleClass = "",
    onLabelClass = "",
    offLabelClass = ""
}) => {
    const isActive = value === "active";

    const handleToggle = () => {
        if (!disabled && !readonly) {
            onChange?.(isActive ? "inactive" : "active");
        }
    };

    const toggleStyle = `bg-white flex items-center justify-between border w-[5.3rem] h-8 rounded-full transition-all duration-200 border-muted cursor-pointer focus:outline-none focus:ring-0 ${className} ${
        disabled || readonly ? "bg-white cursor-not-allowed" : "hover:shadow-none hover:bg-white"
    }`;

    return (
        <>
            <div>
                {isLabel && (
                    <div className="mb-2">
                        <label className={`text-sm font-normal text-app-primary ${labelClass}`}>
                            {label}
                        </label>
                    </div>
                )}
                <Toggle
                    pressed={isActive}
                    onPressedChange={handleToggle}
                    disabled={disabled}
                    aria-label={isActive ? onLabel : offLabel}
                    className={toggleStyle}
                    tabIndex={0}
                >
                    <div className="flex items-center justify-between w-full px-2 relative">
                        <div>
                            <span
                                className={`text-xs font-normal text-app-primary select-none transition-all duration-200 ${onLabelClass}  ${
                                    isActive ? "opacity-100" : "opacity-0"
                                }`}
                            >
                                {onLabel}
                            </span>
                        </div>
                        <div
                            className={`absolute w-5 h-5 rounded-full border transition-transform duration-300 ease-in-out ${
                                isActive
                                    ? `bg-[#698a63] border-[#698a63] transform translate-x-[3.5rem] ${onCircleClass}`
                                    : `bg-gray-200 ml-[-0.5rem] border-gray-200 transform translate-x-0 ${offCircleClass}`
                            }`}
                        />
                        <div>
                            <span
                                className={`absolute bottom-[0px] right-[0px] top-[2px]  text-xs font-normal text-app-primary select-none transition-all duration-200 ${offLabelClass} ${
                                    isActive ? "opacity-0" : "opacity-100"
                                }`}
                            >
                                {offLabel}
                            </span>
                        </div>
                    </div>
                </Toggle>

                {isError && (
                    <div className="mt-1">
                        <span className="text-sm text-red-500">{errorMessage}</span>
                    </div>
                )}
            </div>
        </>
    );
};

export default CustomToggle;
