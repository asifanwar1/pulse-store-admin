import { useState } from "react";
import type { RowData } from "@tanstack/react-table";
import {
    getCoreRowModel,
    getFacetedMinMaxValues,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import Config from "@/Config";
import type { IDataTableProps } from "./TableTypes";
import DataTableError from "./TableComponents/DataTableError";
import DataTableContent from "./TableComponents/DataTableContent";
import DataTableSkeleton from "./TableComponents/DataTableSkeleton";
import DataTablePagination from "./TableComponents/DataTablePagination";

const INITIAL_PAGE_STATE = 0;
const DataTable = <TData extends RowData>({
    data,
    columns,
    initialState = {},
    features = {},
    callbacks = {},
    pageCount = -1,
    totalCount,
    isLoading = false,
    error = null,
}: IDataTableProps<TData>) => {
    const [internalRowSelection, setInternalRowSelection] = useState(
        initialState.rowSelection ?? {},
    );

    // Use controlled state if callback is provided
    const rowSelection = callbacks.onRowSelectionChange
        ? internalRowSelection
        : (initialState.rowSelection ?? {});

    // Process columns to hide those with hideable: true
    const processedColumns = columns.map((column) => ({
        ...column,
        enableHiding: column.hideable ? true : column.enableHiding,
    }));

    // Create initial column visibility state
    const initialColumnVisibility = { ...initialState.columnVisibility };
    columns.forEach((column) => {
        if (
            column.hideable &&
            column.id &&
            !(column.id in initialColumnVisibility)
        ) {
            initialColumnVisibility[column.id] = false;
        }
    });

    // Create table directly with TanStack Table
    const table = useReactTable({
        data,
        columns: processedColumns,
        pageCount,
        initialState: {
            pagination: {
                pageIndex:
                    initialState.pagination?.pageIndex ?? INITIAL_PAGE_STATE,
                pageSize: initialState.pagination?.pageSize ?? Config.LIMIT,
            },
            sorting: initialState.sorting
                ? initialState.sorting.map((sort) => ({
                      id: String(sort.id),
                      desc: sort.desc,
                  }))
                : [],
            columnVisibility: initialColumnVisibility,
            rowSelection: initialState.rowSelection ?? {},
            columnFilters: initialState.columnFilters ?? [],
            globalFilter: initialState.globalSearch ?? "",
            ...(callbacks.onRowSelectionChange ? {} : { rowSelection }),
        },
        state: {
            ...(callbacks.onRowSelectionChange && { rowSelection }),
            pagination: {
                pageIndex:
                    initialState.pagination?.pageIndex ?? INITIAL_PAGE_STATE,
                pageSize: initialState.pagination?.pageSize ?? Config.LIMIT,
            },
            sorting: initialState.sorting
                ? initialState.sorting.map((sort) => ({
                      id: String(sort.id),
                      desc: sort.desc,
                  }))
                : [],
        },
        enableRowSelection: features.rowSelection ?? true,
        enableSorting: features.sorting ?? true,
        enableColumnFilters: features.filtering ?? true,

        enableHiding: features.columnVisibility ?? true,
        enableColumnResizing: features.columnResizing ?? false,
        enableColumnPinning: features.columnPinning ?? false,
        manualPagination: pageCount > 0,
        manualSorting: true,
        manualFiltering: false,

        ...(callbacks.onRowSelectionChange && {
            onRowSelectionChange: (updater) => {
                const newSelection =
                    typeof updater === "function"
                        ? updater(rowSelection)
                        : updater;

                setInternalRowSelection(newSelection);

                // Get selected row data and send to callback
                setTimeout(() => {
                    const selectedRowIds = Object.keys(newSelection).filter(
                        (key) => newSelection[key],
                    );
                    const selectedRows = table
                        .getRowModel()
                        .rows.filter((row) => selectedRowIds.includes(row.id));
                    callbacks.onRowSelectionChange?.(selectedRows);
                }, 0);
            },
        }),

        ...(callbacks.onSortingChange && {
            onSortingChange: (updater) => {
                const currentSorting = initialState.sorting
                    ? initialState.sorting.map((sort) => ({
                          id: String(sort.id),
                          desc: sort.desc,
                      }))
                    : [];
                const newSorting =
                    typeof updater === "function"
                        ? updater(currentSorting)
                        : updater;
                callbacks.onSortingChange?.(newSorting);
            },
        }),

        onColumnFiltersChange: (updater) => {
            if (callbacks.onFilteringChange) {
                const newFilters =
                    typeof updater === "function"
                        ? updater(table.getState().columnFilters)
                        : updater;

                const filterConfigs = newFilters.map((filter) => ({
                    id: filter.id,
                    columnId: filter.id,
                    operator: "contains" as const,
                    value: filter.value,
                    variant: "text" as const,
                }));
                callbacks.onFilteringChange(filterConfigs);
            }
        },

        ...(callbacks.onPaginationChange && {
            onPaginationChange: (updater) => {
                const currentState = table.getState().pagination;
                const newPagination =
                    typeof updater === "function"
                        ? updater(currentState)
                        : updater;
                callbacks.onPaginationChange?.(newPagination);
            },
        }),
        onColumnVisibilityChange: (updater) => {
            if (callbacks.onColumnVisibilityChange) {
                const newVisibility =
                    typeof updater === "function"
                        ? updater(table.getState().columnVisibility)
                        : updater;
                callbacks.onColumnVisibilityChange(newVisibility);
            }
        },
        onGlobalFilterChange: callbacks.onGlobalSearch,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
        defaultColumn: {
            enableColumnFilter: false,
            enableSorting: true,
            enableHiding: true,
        },
    });

    if (error) {
        return <DataTableError error={error} onRetry={() => {}} />;
    }

    if (isLoading) {
        return (
            <DataTableSkeleton
                columnCount={columns.length}
                rowCount={initialState?.pagination?.pageSize || 10}
            />
        );
    }

    return (
        <>
            <div className="flex w-full flex-col gap-2">
                <DataTableContent<TData>
                    table={table}
                    selectedRows={table.getFilteredSelectedRowModel().rows}
                    features={features}
                    columns={columns}
                    callbacks={callbacks}
                />

                {Boolean(features?.pagination) && (
                    <DataTablePagination
                        table={table}
                        totalCount={totalCount}
                    />
                )}
            </div>
        </>
    );
};

export default DataTable;
