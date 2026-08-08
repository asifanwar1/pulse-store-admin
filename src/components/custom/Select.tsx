import * as React from "react";
import { cn } from "@/lib/utils";
import Button from "@/components/custom/CustomButton/CustomButton";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import Spinner from "@/components/custom/Spinner";

import { ChevronDown } from "lucide-react";
import { X } from "lucide-react";

export type SelectOption = {
    value: string;
    label: React.ReactNode;
    subtitle?: string;
    disabled?: boolean;
};

export interface SelectProps {
    options: readonly SelectOption[];
    value: SelectOption | SelectOption[] | null;
    onChange: (value: SelectOption | SelectOption[] | null) => void;
    multiple?: boolean;
    disabled?: boolean;
    loading?: boolean;
    async?: boolean;
    onSearch?: (query: string) => void;
    onScroll?: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
    hasMore?: boolean;
    isFetchingNextPage?: boolean;
    clearable?: boolean;
    placeholder?: string;
    maxSelections?: number;
    renderOption?: (option: SelectOption, selected: boolean) => React.ReactNode;
    className?: string;
    popoverClassName?: string;
    optionClassName?: string;
    chipClassName?: string;
    autoComplete?: boolean;
    error?: string;
    size?: "sm" | "default" | "lg" | "icon";
    getOptionClassName?: (value: string, selected: boolean) => string;
    label?: string;
    labelWeight?: string | number;
    containerClass?: string;
    placeholderClassName?: string;
    valueClassName?: string;
    labelRequired?: boolean;
    labelRequiredClass?: string;
    labelClass?: string;
    selectBoxContainerClass?: string;
    closeOnSelect?: string[];
    maxDisplayedSelections?: number;
    useApiData?: boolean;
    apiOptions?: Record<string, any>[];
    labelKey?: string;
    valueKey?: string;
    selectedValue?: string | string[];
}

export const Select: React.FC<SelectProps> = (props) => {
    const {
        options,
        value,
        onChange,
        multiple = false,
        disabled = false,
        loading = false,
        onSearch,
        onScroll,
        hasMore = false,
        isFetchingNextPage = false,
        clearable = true,
        placeholder = "Select...",
        maxSelections,
        renderOption,
        className,
        popoverClassName,
        optionClassName,
        chipClassName,
        autoComplete = false,
        error,
        getOptionClassName,
        size = "default",
        label,
        containerClass,
        placeholderClassName,
        valueClassName = " ",
        labelRequired = false,
        labelRequiredClass,
        labelClass,
        selectBoxContainerClass = "",
        closeOnSelect,
        maxDisplayedSelections,
        useApiData = false,
        apiOptions = [],
        labelKey = "label",
        valueKey = "value",
        selectedValue,
    } = props;
    const [open, setOpen] = React.useState<boolean>(false);
    const [search, setSearch] = React.useState<string>("");
    const listRef = React.useRef<HTMLDivElement>(null);

    const normalizedOptions = React.useMemo((): readonly SelectOption[] => {
        if (!useApiData) return options;
        return (apiOptions ?? []).map((item) => ({
            label: item[labelKey] as React.ReactNode,
            value: String(item[valueKey]),
            disabled: item["disabled"] ?? false,
            subtitle: item["subtitle"],
        }));
    }, [useApiData, apiOptions, labelKey, valueKey, options]);

    const resolvedValue = React.useMemo(() => {
        if (!useApiData) return value;
        if (!selectedValue) return null;
        if (Array.isArray(selectedValue)) {
            return normalizedOptions.filter((o) =>
                selectedValue.includes(o.value),
            );
        }
        return normalizedOptions.find((o) => o.value === selectedValue) ?? null;
    }, [useApiData, selectedValue, normalizedOptions, value]);

    const selectedOptions = React.useMemo(() => {
        if (multiple) {
            return Array.isArray(resolvedValue) ? resolvedValue : [];
        } else {
            return resolvedValue && !Array.isArray(resolvedValue)
                ? [resolvedValue]
                : [];
        }
    }, [resolvedValue, multiple]);

    const selectedValues = React.useMemo(
        () => selectedOptions.map((option) => option.value),
        [selectedOptions],
    );

    const handleSelect = (option: SelectOption) => {
        if (option.disabled) return;
        if (multiple) {
            const currentOptions = Array.isArray(value) ? value : [];
            let newOptions = currentOptions.some(
                (o) => o.value === option.value,
            )
                ? currentOptions.filter((o) => o.value !== option.value)
                : [...currentOptions, option];
            if (maxSelections && newOptions.length > maxSelections) return;
            onChange(newOptions);

            if (closeOnSelect) {
                setOpen(false);
            }
        } else {
            onChange(option);
            setOpen(false);
        }
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (useApiData) {
            onChange(null);
            return;
        }
        onChange(multiple ? [] : null);
    };

    const handleRemoveChip = (val: string) => {
        if (multiple) {
            const currentOptions = Array.isArray(resolvedValue)
                ? resolvedValue
                : [];
            onChange(currentOptions.filter((o) => o.value !== val));
        }
    };

    const showClear =
        clearable &&
        ((multiple && selectedOptions.length > 0) ||
            (!multiple && resolvedValue && !Array.isArray(resolvedValue)));

    const filteredOptions = React.useMemo((): readonly SelectOption[] => {
        if (!search) return normalizedOptions;
        const loweredSearch = search.toLowerCase();
        return normalizedOptions.filter((opt) => {
            const labelText =
                typeof opt.label === "string" ? opt.label.toLowerCase() : "";
            const valueText = opt.value?.toLowerCase?.() ?? "";
            return (
                labelText.includes(loweredSearch) ||
                valueText.includes(loweredSearch)
            );
        });
    }, [normalizedOptions, search]);

    const handleListScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        if (!onScroll || !hasMore || isFetchingNextPage) return;

        const target = e.target as HTMLDivElement;
        const isNearBottom =
            target.scrollHeight - target.scrollTop - target.clientHeight < 32;

        if (isNearBottom) {
            onScroll(e);
        }
    };

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    return (
        <>
            <div className={cn("flex flex-col w-full ", containerClass)}>
                {label && (
                    <p
                        className={`mb-0 text-sm text-pulse-green font-500 ${labelClass}`}
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
                <div className={`!my-2.5 ${selectBoxContainerClass}`}>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                size={size}
                                aria-expanded={open}
                                // disabled={disabled}
                                onClick={() => {}}
                                className={cn(
                                    "border !placeholder:text-pulse-green/60 !rounded-sm text-sm w-full justify-between flex items-center bg-white hover:bg-white ",
                                    error && "border-danger",
                                    className,
                                    disabled &&
                                        "pointer-events-none bg-[#f8fafc] !text-black !cursor-not-allowed",
                                    size === "sm" && " text-sm",
                                    size === "default" && " ",
                                    size === "lg" && "text-lg",
                                )}
                            >
                                <div
                                    className={`flex flex-wrap gap-1 items-center w-[calc(100%-28px)]  ${
                                        // size == "default"
                                        //     ? "max-h-[24px]"
                                        //     : size == "sm"
                                        //       ? "min-h-[14px]"
                                        //       : "min-h-[28px]"
                                        ""
                                    }`}
                                >
                                    {multiple && selectedOptions.length > 0 ? (
                                        <>
                                            {(maxDisplayedSelections
                                                ? selectedOptions.slice(
                                                      0,
                                                      maxDisplayedSelections,
                                                  )
                                                : selectedOptions
                                            ).map((option) => (
                                                <span
                                                    key={option.value}
                                                    className={cn(
                                                        "inline-flex items-center px-1 py-0.5 rounded bg-primary/10 text-xs mr-1 ",
                                                        chipClassName,
                                                        valueClassName,
                                                        getOptionClassName &&
                                                            getOptionClassName(
                                                                option.value,
                                                                true,
                                                            ), // Apply color to selected chips
                                                    )}
                                                >
                                                    {option.label}
                                                    <span
                                                        className="ml-1 text-[10px] cursor-pointer hover:text-red-500 font-bold"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleRemoveChip(
                                                                option.value,
                                                            );
                                                        }}
                                                    >
                                                        x
                                                    </span>
                                                </span>
                                            ))}
                                            {maxDisplayedSelections &&
                                                selectedOptions.length >
                                                    maxDisplayedSelections && (
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger
                                                                asChild
                                                            >
                                                                <span
                                                                    className={cn(
                                                                        "inline-flex items-center p-1 rounded bg-primary/10 text-xs cursor-default",
                                                                        chipClassName,
                                                                    )}
                                                                    onClick={(
                                                                        e,
                                                                    ) =>
                                                                        e.stopPropagation()
                                                                    }
                                                                >
                                                                    +
                                                                    {selectedOptions.length -
                                                                        maxDisplayedSelections}
                                                                </span>
                                                            </TooltipTrigger>
                                                            <TooltipContent
                                                                side="top"
                                                                className="max-w-[250px] !bg-black text-white"
                                                            >
                                                                <div className="flex flex-col gap-1">
                                                                    {selectedOptions
                                                                        .slice(
                                                                            maxDisplayedSelections,
                                                                        )
                                                                        .map(
                                                                            (
                                                                                option,
                                                                            ) => (
                                                                                <span
                                                                                    key={
                                                                                        option.value
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        option.label
                                                                                    }
                                                                                </span>
                                                                            ),
                                                                        )}
                                                                </div>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                )}
                                        </>
                                    ) : !multiple &&
                                      resolvedValue &&
                                      !Array.isArray(resolvedValue) ? (
                                        <span
                                            className={cn(
                                                "text-pulse-green-dark truncate text-left w-[100%] font-normal ",
                                                getOptionClassName &&
                                                    getOptionClassName(
                                                        resolvedValue.value,
                                                        true,
                                                    ),
                                                valueClassName,
                                            )}
                                        >
                                            {resolvedValue.label}
                                        </span>
                                    ) : (
                                        <span
                                            className={cn(
                                                "!text-pulse-green/60 font-normal ",
                                                placeholderClassName,
                                            )}
                                        >
                                            {placeholder}
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-1">
                                    {loading && <Spinner />}
                                    {showClear && !disabled && (
                                        <span
                                            className="cursor-pointer text-[10px] font-bold"
                                            onClick={handleClear}
                                        >
                                            <X className="h-4 w-4 text-pulse-green-dark" />
                                        </span>
                                    )}

                                    <ChevronDown className="h-5 w-4 shrink-0 opacity-50" />
                                </div>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            className={cn("p-0", popoverClassName)}
                            align="start"
                            sideOffset={4}
                            style={{
                                width: "var(--radix-popover-trigger-width)",
                            }}
                        >
                            {" "}
                            <Command shouldFilter={false}>
                                {autoComplete && (
                                    <CommandInput
                                        placeholder="Search..."
                                        value={search}
                                        onValueChange={(val) => {
                                            setSearch(val);
                                            onSearch?.(val);
                                        }}
                                        disabled={loading}
                                        className="h-9"
                                    />
                                )}
                                <CommandList
                                    ref={listRef}
                                    onScroll={handleListScroll}
                                    onWheel={handleWheel}
                                    style={{
                                        maxHeight: 240,
                                        overflowY: "auto",
                                    }}
                                >
                                    {loading &&
                                        filteredOptions.length === 0 && (
                                            <div className="flex items-center justify-center py-4">
                                                <Spinner />
                                            </div>
                                        )}
                                    <CommandEmpty>
                                        No options found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                        {filteredOptions?.map((option) => {
                                            const selected =
                                                selectedValues.includes(
                                                    option.value,
                                                );
                                            return (
                                                <CommandItem
                                                    key={option.value}
                                                    value={option.value}
                                                    disabled={option.disabled}
                                                    onSelect={() =>
                                                        handleSelect(option)
                                                    }
                                                    className={cn(
                                                        "font-normal hover:!bg-[#f1f5f9]",
                                                        optionClassName,
                                                        option.disabled &&
                                                            "opacity-50 pointer-events-none",
                                                        "pl-5 my-1 font-500",
                                                        selected &&
                                                            "data-[selected=true]:bg-[#f1f5f9] bg-[#f1f5f9] py-2 ",
                                                        getOptionClassName &&
                                                            getOptionClassName(
                                                                option.value,
                                                                selected,
                                                            ), // Apply color to dropdown options
                                                    )}
                                                >
                                                    <div className="flex flex-col font-normal">
                                                        <p>
                                                            {renderOption
                                                                ? renderOption(
                                                                      option,
                                                                      selected,
                                                                  )
                                                                : option.label}
                                                        </p>
                                                        {option.subtitle && (
                                                            <p className="text-xs font-normal text-text-secondary mt-1">
                                                                {
                                                                    option.subtitle
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                </CommandItem>
                                            );
                                        })}
                                    </CommandGroup>
                                    {(isFetchingNextPage ||
                                        (loading &&
                                            filteredOptions.length > 0)) && (
                                        <div className="flex justify-center items-center py-4">
                                            <Spinner />
                                        </div>
                                    )}
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    {error && (
                        <div className="text-red-500 font-normal text-sm mt-1">
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
