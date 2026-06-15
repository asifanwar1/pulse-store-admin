import React from "react";
import { Calendar } from "../ui/calendar";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon, X } from "lucide-react";

import { Input } from "./Input";
import Button from "./CustomButton/CustomButton";
import { convertDateTime, dateTimeFormat } from "@/utils/dateTime.utils";
import { cn } from "@/lib/utils";

export interface DatePickerProps {
    value?: Date | null | string;
    onChange?: (date: Date | undefined) => void;
    placeholder?: string;
    disabled?: boolean;
    name?: string;
    error?: string;
    className?: string;
    disabledDays?: (date: Date) => boolean;
    label?: string;
    labelWeight?: string | number;
    minDate?: Date;
    maxDate?: Date;
    clearable?: boolean;
    captionLayout?: "dropdown" | "label";
    defaultMonth?: Date;
    required?: boolean;
    showIcon?: boolean;
    onMonthChange?: (month: Date) => void;
}

function stripTime(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isDateDisabled(
    dateToCheck: Date,
    disabled: boolean,
    minDate?: Date,
    maxDate?: Date,
    disabledDays?: (date: Date) => boolean,
): boolean {
    if (disabled) return true;
    const check = stripTime(dateToCheck);
    if (minDate && check < stripTime(minDate)) return true;
    if (maxDate && check > stripTime(maxDate)) return true;
    if (typeof disabledDays === "function" && disabledDays(check)) return true;
    return false;
}

export const DatePicker: React.FC<DatePickerProps> = (props) => {
    const {
        value,
        onChange,
        placeholder = "Pick a date",
        disabled = false,
        name,
        error,
        disabledDays,
        label = "",
        labelWeight,
        clearable = true,
        captionLayout = "label",
        defaultMonth,
        required = false,
        showIcon = false,
        minDate,
        maxDate,
        onMonthChange,
    } = props;

    const getDateValue = (
        val: Date | null | string | undefined,
    ): Date | undefined => {
        if (val instanceof Date) return val;
        if (typeof val === "string" && val.trim() !== "") {
            const parsed = new Date(val);
            return isNaN(parsed.getTime()) ? undefined : parsed;
        }
        return undefined;
    };

    const date = getDateValue(value);

    const handleSelect = (selected: Date | undefined) => {
        if (onChange) {
            onChange(selected);
        }
    };

    return (
        <div className="flex flex-col justify-center w-full">
            {label && (
                <label
                    style={
                        labelWeight ? { fontWeight: labelWeight } : undefined
                    }
                    className="mb-0 text-sm font-400 text-pulse-green"
                >
                    {label}{" "}
                    {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <Popover>
                <PopoverTrigger asChild>
                    <div className="relative">
                        <Input
                            placeholder={placeholder}
                            value={
                                date
                                    ? (convertDateTime({
                                          date: date,
                                          customFormat:
                                              dateTimeFormat.americanFormat,
                                      }) as string)
                                    : ""
                            }
                            disabled={disabled}
                            autoComplete="off"
                            className={cn(
                                "data-[empty=true]:text-pulse-green border border-app-border h-[36px] shadow-search flex justify-between w-[inherit] text-left font-[400] text-black hover:bg-white bg-white placeholder:text-pulse-green/60 hover:ring-none !text-sm !my-2.5 cursor-pointer",
                                error && "",
                            )}
                            name={name}
                        />
                        {showIcon && (
                            <CalendarIcon className="h-4 w-4 text-pulse-green/60 absolute right-3 top-[22px] text-right cursor-pointer" />
                        )}
                        {!!date && clearable && (
                            <Button
                                variant="link"
                                size="icon"
                                className="absolute right-8  top-[22px] h-4 w-4 right-8 pt-0 hover:bg-background-primary/80 rounded-full !text-secondary"
                                onClick={(e) => {
                                    handleSelect(undefined);
                                    e.stopPropagation();
                                }}
                            >
                                {!disabled && <X className="h-3 w-3" />}
                            </Button>
                        )}
                    </div>
                </PopoverTrigger>
                {/* start from end right aligned */}
                <PopoverContent
                    align="end"
                    className="w-auto p-0 -mt-3 !rounded-md overflow-hidden border-neutral-200 h-[285px]"
                >
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleSelect}
                        onMonthChange={onMonthChange}
                        disabled={(dateToCheck: Date) =>
                            isDateDisabled(
                                dateToCheck,
                                disabled,
                                minDate,
                                maxDate,
                                disabledDays,
                            )
                        }
                        className="h-auto"
                        captionLayout={captionLayout}
                        defaultMonth={defaultMonth || date || new Date()}
                    />
                </PopoverContent>
            </Popover>
            {error && (
                <div className="text-danger font-normal text-sm -mt-1">
                    {error}
                </div>
            )}
        </div>
    );
};
