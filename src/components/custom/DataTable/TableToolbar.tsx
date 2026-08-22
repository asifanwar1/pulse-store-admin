import { useState, type ReactNode } from "react";
import { Search, Filter } from "lucide-react";

import Button from "@/components/custom/CustomButton/CustomButton";
import { Input } from "@/components/custom/Input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export interface IToolbarAction {
    id: string;
    label: string;
    icon?: ReactNode;
    variant?:
        | "primary"
        | "outline"
        | "secondary"
        | "destructive"
        | "ghost"
        | "success"
        | "secondary";
    size?: "md" | "sm" | "lg" | "icon";
    className?: string;
    disabled?: boolean;
    onClick: () => void;
}

export interface IFilterConfig {
    options: Array<{ value: string; label: string }>;
    selectedValue?: string;
}

export interface IToolbarActionGroup {
    id: string;
    actions: IToolbarAction[];
    className?: string;
}

interface IDataTableToolbarProps {
    onSearchChange?: (searchTerm: string) => void;
    searchValue?: string;
    searchPlaceholder?: string;
    showSearch?: boolean;
    searchClassName?: string;
    searchWidth?: string;

    showFilter?: boolean;
    filterConfig?: IFilterConfig;

    onFilterChange?: (filters: string) => void;

    leftActions?: IToolbarAction[];
    rightActions?: IToolbarAction[];
    actionGroups?: IToolbarActionGroup[];

    className?: string;

    customLeftContent?: ReactNode;
    customCenterContent?: ReactNode;
    customRightContent?: ReactNode;

    // Title and description
    title?: string;
    description?: string;
}

const TableToolbar = ({
    onSearchChange,
    searchValue = "",
    searchPlaceholder = "Search",
    showSearch = true,
    searchClassName = "",
    searchWidth = "w-80",
    showFilter = false,
    filterConfig,

    onFilterChange,
    leftActions = [],
    rightActions = [],
    actionGroups = [],
    className = "",
    customLeftContent,
    customCenterContent,
    customRightContent,
    title,
    description,
}: IDataTableToolbarProps) => {
    const [internalSearchTerm, setInternalSearchTerm] =
        useState<string>(searchValue);

    const handleSearchChange = (value: string) => {
        setInternalSearchTerm(value);
        onSearchChange?.(value);
    };

    const renderActions = (actions: IToolbarAction[]) => (
        <>
            {actions.map((action) => (
                <Button
                    key={action.id}
                    variant={"default"}
                    size={"default"}
                    className={action.className || ""}
                    disabled={action.disabled}
                    onClick={action.onClick}
                >
                    {action.icon && <span className="mr-2">{action.icon}</span>}
                    {action.label}
                </Button>
            ))}
        </>
    );

    const renderActionGroups = (groups: IToolbarActionGroup[]) => (
        <>
            {groups.map((group) => (
                <div
                    key={group.id}
                    className={`flex items-center gap-2 ${group.className || ""}`}
                >
                    {renderActions(group.actions)}
                </div>
            ))}
        </>
    );

    return (
        <div className={`space-y-4 ${className}`}>
            <div>
                {title && <h2 className="text-2xl font-bold">{title}</h2>}
                {description && <p className="text-gray-600">{description}</p>}
            </div>

            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    {customLeftContent}

                    {showSearch && (
                        <div className={`relative ${searchWidth}`}>
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder={searchPlaceholder}
                                value={searchValue || internalSearchTerm}
                                onChange={(e) =>
                                    handleSearchChange(e.target.value)
                                }
                                className={`pl-10 border-gray-200 focus:border-blue-500 ${searchClassName}`}
                            />
                        </div>
                    )}

                    {leftActions.length > 0 ? renderActions(leftActions) : null}

                    {showFilter && filterConfig && (
                        <Select
                            value={filterConfig?.selectedValue || ""}
                            onValueChange={(value: string) => {
                                onFilterChange?.(value);
                            }}
                        >
                            <SelectTrigger className="w-[120px]">
                                <Filter className="h-4 w-4 mr-2" />
                                <SelectValue placeholder="Filter" />
                            </SelectTrigger>
                            <SelectContent>
                                {filterConfig?.options?.map(
                                    (option: {
                                        value: string;
                                        label: string;
                                    }) => (
                                        <SelectItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ),
                                ) || (
                                    <>
                                        <SelectItem value="active">
                                            Active
                                        </SelectItem>
                                        <SelectItem value="inactive">
                                            Inactive
                                        </SelectItem>
                                    </>
                                )}
                            </SelectContent>
                        </Select>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    {customCenterContent}
                </div>

                <div className="flex items-center gap-2">
                    {customRightContent}

                    {actionGroups.length > 0
                        ? renderActionGroups(actionGroups)
                        : null}

                    {rightActions.length > 0
                        ? renderActions(rightActions)
                        : null}
                </div>
            </div>
        </div>
    );
};
export default TableToolbar;
