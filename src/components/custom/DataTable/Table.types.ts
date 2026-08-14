import type { ColumnDef, Row, RowData, Table } from "@tanstack/react-table";
import type { ReactNode } from "react";

export interface IDataTableConfig<TData extends RowData> {
    id: string;
    title?: string;
    description?: string;
    columns: TDataColumnDef<TData>[];
    data: TData[];
    pageCount?: number;
    features?: IDataTableFeatures;
    styling?: IDataTableStyling;
    callbacks?: IDataTableCallbacks<TData>;
    initialState?: IDataTableInitialState<TData>;
}

export type TDataColumnDef<TData extends RowData> = ColumnDef<TData> & {
    meta?: IDataColumnMeta<TData>;
    filterable?: boolean;
    sortable?: boolean;
    hideable?: boolean;
    resizable?: boolean;
    pinnable?: boolean;
    selectable?: boolean;
};

export interface IDataColumnMeta<TData extends RowData> {
    label?: string;
    placeholder?: string;
    filterVariant?: TFilterVariant;
    filterOptions?: IFilterOption[];
    range?: [number, number];
    unit?: string;
    icon?: React.ComponentType<{ className?: string }>;
    cellRenderer?: (value: unknown, row: Row<TData>) => ReactNode;
    headerRenderer?: (column: unknown) => ReactNode;
    width?: string | number;
    minWidth?: string | number;
    maxWidth?: string | number;
    align?: "left" | "center" | "right";
    truncate?: boolean;
    className?: string;
    showImage?: boolean;
    imageKey?: any;
    imageClassName?: string;
    imageStyle?: React.CSSProperties;
}

export type TFilterVariant =
    | "text"
    | "number"
    | "range"
    | "date"
    | "dateRange"
    | "boolean"
    | "select"
    | "multiSelect";

export interface IFilterOption {
    label: string;
    value: string;
    count?: number;
    icon?: React.ComponentType<{ className?: string }>;
}

export type TFilterOperator =
    | "contains"
    | "notContains"
    | "equals"
    | "notEquals"
    | "startsWith"
    | "endsWith"
    | "isEmpty"
    | "isNotEmpty"
    | "greaterThan"
    | "greaterThanOrEqual"
    | "lessThan"
    | "lessThanOrEqual"
    | "between"
    | "in"
    | "notIn";

export interface IFilterConfig {
    id: string;
    columnId: string;
    operator: TFilterOperator;
    value: unknown;
    variant: TFilterVariant;
}

// FEATURES CONFIGURATION

export interface IDataTableFeatures {
    rowSelection?: boolean;
    sorting?: boolean;
    filtering?: boolean;
    pagination?: boolean;
    columnVisibility?: boolean;
    columnResizing?: boolean;
    columnPinning?: boolean;
    globalSearch?: boolean;
    export?: boolean;
    // bulkActions?: boolean;
    rowActions?: boolean;
    loading?: boolean;
    empty?: boolean;
    error?: boolean;
}

// STYLING CONFIGURATION

export interface IDataTableStyling {
    variant?: "default" | "bordered" | "striped" | "compact";
    size?: "sm" | "md" | "lg";
    className?: string;
    header?: {
        className?: string;
        sticky?: boolean;
    };
    row?: {
        className?: string;
        hover?: boolean;
        selectable?: boolean;
    };
    cell?: {
        className?: string;
        padding?: "none" | "sm" | "md" | "lg";
    };
    pagination?: {
        className?: string;
        position?: "top" | "bottom" | "both";
    };
    toolbar?: {
        className?: string;
        position?: "top" | "bottom" | "both";
    };
}

// CALLBACKS

export interface IDataTableCallbacks<TData extends RowData> {
    onRowSelectionChange?: (selectedRows: Row<TData>[]) => void;

    onSortingChange?: (sorting: unknown[]) => void;

    onFilteringChange?: (filters: IFilterConfig[]) => void;

    onPaginationChange?: (pagination: {
        pageIndex: number;
        pageSize: number;
    }) => void;

    onColumnVisibilityChange?: (
        columnVisibility: Record<string, boolean>,
    ) => void;

    onRowClick?: (row: Row<TData>) => void;

    onCellClick?: (cell: unknown, row: Row<TData>) => void;

    onExport?: (data: TData[], format: "csv" | "excel" | "pdf") => void;

    // onBulkAction?: (action: string, selectedRows: Row<TData>[]) => void;

    onRowAction?: (action: string, row: Row<TData>) => void;

    onGlobalSearch?: (searchTerm: string) => void;
}

// INITIAL STATE

export interface IDataTableInitialState<TData extends RowData> {
    sorting?: Array<{
        id: keyof TData;
        desc: boolean;
    }>;

    pagination?: {
        pageIndex: number;
        pageSize: number;
    };

    columnVisibility?: Record<string, boolean>;
    rowSelection?: Record<string, boolean>;
    columnFilters?: IFilterConfig[];
    globalSearch?: string;
}

export interface IRowAction<TData extends RowData = RowData> {
    id: string;
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
    variant?:
        | "default"
        | "destructive"
        | "outline"
        | "secondary"
        | "ghost"
        | "link";
    disabled?: boolean | ((row: Row<TData>) => boolean);
    onClick: (row: Row<TData>) => void;
}

// EXPORT TYPES

export interface IExportConfig<TData extends RowData = RowData> {
    formats?: Array<"csv" | "excel" | "pdf">;
    filename?: string;
    selectedOnly?: boolean;
    customExport?: (data: TData[], format: string) => void;
}

// UTILITY TYPES

export interface IDataTableProps<
    TData extends RowData,
> extends IDataTableConfig<TData> {
    isLoading?: boolean;
    error?: Error | null;
}

export interface IDataTableState<TData extends RowData> {
    table: Table<TData>;
    selectedRows: Row<TData>[];
    isLoading: boolean;
    error: Error | null;
}
