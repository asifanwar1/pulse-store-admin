import React, { useState } from "react";

type InputWithChipsProps = {
    label?: string;
    value?: string[];
    onChange?: (chips: string[]) => void;
    placeholder?: string;
    required?: boolean;
    error?: string;
    addButtonLabel?: string;
    disabled?: boolean;
    className?: string;
    maxChips?: number;
    maxChipLength?: number;
};

const InputWithChips: React.FC<InputWithChipsProps> = ({
    label = "Tags",
    value = [],
    onChange,
    placeholder = "Add tags (press Enter)",
    required = false,
    error,
    addButtonLabel = "Add",
    disabled = false,
    className = "",
    maxChips = 10,
    maxChipLength = 15,
}) => {
    const [inputValue, setInputValue] = useState("");

    const isChipLengthExceeded =
        maxChipLength !== undefined && inputValue.length > maxChipLength;

    const handleAddChip = () => {
        if (value.length >= maxChips) return;
        if (isChipLengthExceeded) return;
        const trimmed = inputValue.trim();
        if (trimmed && !value.includes(trimmed)) {
            onChange?.([...value, trimmed]);
            setInputValue("");
        }
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (value.length < maxChips && !isChipLengthExceeded) {
                handleAddChip();
            }
        }
    };

    const handleRemoveChip = (chip: string) => {
        onChange?.(value.filter((c) => c !== chip));
    };

    return (
        <div className={`flex flex-col w-full ${className}`}>
            {label && (
                <label className="mb-0 text-sm text-pulse-green font-normal">
                    {label} {required && <span className="text-danger">*</span>}
                </label>
            )}
            <div className="flex flex-wrap items-center gap-2 flex-1">
                <div className="flex flex-col flex-1 relative">
                    <input
                        type="text"
                        value={inputValue}
                        maxLength={maxChipLength}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        placeholder={placeholder}
                        disabled={disabled}
                        className="w-full bg-white !h-[36px] px-3 text-sm text-pulse-green-dark shadow-sm border rounded-[6px] !font-normal transition-all placeholder:text-pulse-green/60 my-2.5 shadow-md shadow-search focus-within:!border-[#2A5C42] focus-within:!ring-[0.8px]"
                    />
                    {maxChipLength !== undefined && inputValue.length > 0 && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-pulse-green">
                            {inputValue.length}/{maxChipLength}
                        </span>
                    )}
                </div>
                <button
                    type="button"
                    onClick={handleAddChip}
                    disabled={
                        disabled ||
                        !inputValue.trim() ||
                        value.length >= maxChips
                    }
                    className="!font-normal !w-[60px] !text-pulse-green-dark flex-shrink-0 !h-[36px] !rounded-[6px] !border !border-1 !border-app-border !shadow-search cursor-pointer transition-all bg-white hover:!bg-placeholder/10 !text-sm disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {addButtonLabel}
                </button>
            </div>
            <div className="flex flex-wrap gap-2">
                {value.map((chip) => (
                    <div
                        key={chip}
                        className="flex items-center gap-1 px-3 py-1 bg-pulse-green/20 rounded-sm font-600 text-[12px]"
                    >
                        {chip}
                        <button
                            type="button"
                            onClick={() => handleRemoveChip(chip)}
                            className="ml-1 text-pulse-green-dark hover:text-danger font-bold text-[14px] cursor-pointer"
                            aria-label={`Remove ${chip}`}
                            disabled={disabled}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
            {error && <div className="text-danger text-sm mt-1">{error}</div>}
        </div>
    );
};

export default InputWithChips;
