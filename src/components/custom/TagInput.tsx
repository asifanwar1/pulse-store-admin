import React, { useState, type KeyboardEvent, type ChangeEvent } from "react";
import { X } from "lucide-react";

import { Input } from "./Input";
import Button from "./CustomButton/CustomButton";

export interface TagInputProps {
    value: string[];
    onChange: (tags: string[]) => void;
    placeholder?: string;
    maxTags?: number;
    disabled?: boolean;
    label?: string;
    error?: string;
    maxTagLength?: number;
    required?: boolean;
}

const TagInput: React.FC<TagInputProps> = ({
    value = [],
    onChange,
    placeholder,
    maxTags,
    disabled = false,
    label,
    error,
    maxTagLength,
    required = false,
}) => {
    const [inputValue, setInputValue] = useState<string>("");

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addTag();
        } else if (
            e.key === "Backspace" &&
            inputValue === "" &&
            value.length > 0
        ) {
            removeTag(value.length - 1);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        const nextValue = maxTagLength
            ? newValue.slice(0, maxTagLength)
            : newValue;

        // Check if we've reached max tags
        if (maxTags && value.length >= maxTags) {
            return;
        }

        setInputValue(nextValue);
    };

    const addTag = () => {
        const trimmedValue = inputValue.trim();

        if (
            trimmedValue &&
            (!maxTagLength || trimmedValue.length <= maxTagLength) &&
            !value.includes(trimmedValue)
        ) {
            if (!maxTags || value.length < maxTags) {
                onChange([...value, trimmedValue]);
                setInputValue("");
            }
        }
    };

    const removeTag = (indexToRemove: number) => {
        const newTags = value.filter((_, index) => index !== indexToRemove);
        onChange(newTags);
    };

    const isMaxReached = maxTags ? value.length >= maxTags : false;

    return (
        <div className="flex flex-col w-full">
            {label && (
                <label className="mb-0 text-sm font-500">
                    {label} {required && <span className="text-danger">*</span>}
                </label>
            )}

            <Input
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={
                    isMaxReached
                        ? `Maximum ${maxTags} tags reached`
                        : placeholder
                }
                disabled={disabled || isMaxReached}
                error={error}
                maxLength={maxTagLength}
                className="mt-[10px] w-full"
            />
            {value.length > 0 && (
                <div className="flex flex-wrap gap-2 my-2">
                    {value.map((tag, index) => (
                        <div
                            key={index}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-primary/15 font-medium  text-primary rounded-full text-sm"
                        >
                            <span>{tag}</span>
                            <Button
                                type="button"
                                variant="link"
                                size="icon"
                                className={
                                    "h-4 w-4 p-0 hover:bg-background-primary/80 rounded-full !text-secondary"
                                }
                                onClick={() => removeTag(index)}
                                disabled={disabled}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </div>
                    ))}
                </div>
            )}

            {/* Helper Text */}
            {maxTags && (
                <p className="text-xs text-text-secondary mt-2">
                    {value.length}/{maxTags} {label}
                </p>
            )}
        </div>
    );
};

export default TagInput;
