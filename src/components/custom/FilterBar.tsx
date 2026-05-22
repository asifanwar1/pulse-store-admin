import React from "react";

import SearchInput from "./Inputs/SearchInput";
import { Select } from "./Select";
import { DatePicker } from "./DatePicker";

export type FilterItem =
    | {
          type: "search";
          key: string;
          placeholder?: string;
          onSearch: (value: string) => void;
          label?: string;
      }
    | {
          type: "select";
          key: string;
          placeholder?: string;
          value: any;
          options: readonly any[];
          onChange: (value: any) => void;
          clearable?: boolean;
          containerClass?: string;
          label?: string;
          autoComplete?: boolean;
          hasMore?: boolean;
          isFetchingNextPage?: boolean;
          onScroll?: () => void;
          useApiData?: boolean;
          apiOptions?: Record<string, any>[];
          labelKey?: string;
          valueKey?: string;
          selectedValue?: string | string[];
      }
    | {
          type: "date";
          key: string;
          value?: Date | null | string;
          onChange: (date: Date | undefined) => void;
          placeholder?: string;
          clearable?: boolean;
          minDate?: Date;
          maxDate?: Date;
          label?: string;
          labelWeight?: string | number;
          required?: boolean;
          containerClass?: string;
      }
    | {
          type: "custom";
          key: string;
          component: React.ReactNode;
      };

export type FilterBarProps = {
    items: FilterItem[];
    className?: string;
};

const FilterBar: React.FC<FilterBarProps> = ({ items, className }) => {
    return (
        <div
            className={`flex flex-wrap items-center gap-2.5 rounded-[10px] ${className}`}
        >
            {items.map((item) => {
                switch (item.type) {
                    case "search":
                        return (
                            <SearchInput
                                key={item.key}
                                placeholder={item.placeholder || "Search..."}
                                onSearch={item.onSearch}
                                className="flex-1 !border !border-app-border !shadow-search !h-[36px] focus-within:!border-blue focus-within:!border-[1.4px] transition-all "
                                label={item.label}
                                labelClass="font-normal !text-[#020817]"
                            />
                        );
                    case "select":
                        return (
                            <Select
                                key={item.key}
                                value={item.value}
                                options={item.options}
                                onChange={item.onChange}
                                placeholder={item.placeholder}
                                clearable={item.clearable ?? false}
                                className="!border !border-app-border !shadow-search !h-[36px] focus-within:!border-blue focus-within:!border-[1.4px]"
                                containerClass={
                                    item.containerClass || "w-[155px]"
                                }
                                label={item.label}
                                labelClass="font-normal !text-[#020817]"
                                autoComplete={item.autoComplete}
                                hasMore={item.hasMore}
                                isFetchingNextPage={item.isFetchingNextPage}
                                onScroll={
                                    item.onScroll &&
                                    !item.isFetchingNextPage &&
                                    item.hasMore
                                        ? () => item.onScroll!()
                                        : undefined
                                }
                                useApiData={item.useApiData}
                                apiOptions={item.apiOptions}
                                labelKey={item.labelKey}
                                valueKey={item.valueKey}
                                selectedValue={item.selectedValue}
                            />
                        );
                    case "date":
                        return (
                            <div
                                key={item.key}
                                className={item.containerClass || "w-[180px]"}
                            >
                                <DatePicker
                                    value={item.value}
                                    onChange={item.onChange}
                                    placeholder={item.placeholder}
                                    clearable={item.clearable}
                                    minDate={item.minDate}
                                    maxDate={item.maxDate}
                                    label={item.label}
                                    labelWeight={item.labelWeight}
                                    required={item.required}
                                />
                            </div>
                        );
                    case "custom":
                        return <div key={item.key}>{item.component}</div>;
                    default:
                        return null;
                }
            })}
        </div>
    );
};

export default FilterBar;
