import React, { useRef } from "react";

import { Input } from "../../Input";
import { Search } from "lucide-react";
import type { SearchInputProps } from "./types";
import { cn } from "@/lib/utils";

export const SearchInput: React.FC<SearchInputProps> = (props) => {
    const {
        onSearch,
        placeholder = "Search...",
        debounceMs = 1000,
        className,
        size,
        label,
        labelClass,
        labelRequired = false,
        labelRequiredClass,
    } = props;
    const timerRef = useRef<number | null>(null);

    const handleDebounce = (value: string) => {
        onSearch(value);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = window.setTimeout(() => {
            handleDebounce(event.target.value);
        }, debounceMs);
    };

    return (
        <div className="relative w-auto flex-1 ">
            <div className="flex flex-col">
                {label && (
                    <label className={`mb-0 text-sm font-500 ${labelClass}`}>
                        {label}{" "}
                        {labelRequired && (
                            <span
                                className={`text-danger ${labelRequiredClass}`}
                            >
                                *
                            </span>
                        )}
                    </label>
                )}
                <Input
                    type="search"
                    onChange={handleChange}
                    placeholder={placeholder}
                    icon={<Search className="h-4 w-4 !text-text" />}
                    className={cn(
                        "w-full border !rounded-sm shadow-sm bg-transparent text-sm !outline-none !focus:outline-none !focus:ring-0 !focus:shadow-none !truncate ",
                        size === "sm" &&
                            "text-xs !py-0 rounded-sm !text-[13px]",
                        size === "lg" && "text-lg !py-6",
                        size === "md" && "text-base !py-[6px] rounded ",
                        className,
                    )}
                    aria-label={placeholder}
                />
            </div>
        </div>
    );
};

export default SearchInput;
