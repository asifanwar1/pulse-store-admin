import { useCallback } from "react";
import {
    flexRender,
    type HeaderGroup,
    type Row,
    type Cell,
    type Table as TableType,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import DataTableEmpty from "./DataTableEmpty";

import type {
    IDataColumnMeta,
    IDataTableFeatures,
    TDataColumnDef,
    IDataTableCallbacks,
} from "../TableTypes";
import { Avatar } from "@/components/custom/Avatar";

type DataTableContentProps<TData> = {
    table: TableType<TData>;
    selectedRows: Row<TData>[];
    features: IDataTableFeatures;
    columns: TDataColumnDef<TData>[];
    callbacks: IDataTableCallbacks<TData>;
};

const DataTableContent = <TData,>({
    table,
    features,
    columns,
    callbacks,
}: DataTableContentProps<TData>) => {
    // const { config, state } = useDataTableContext<TData>();
    // const { table } = state;
    // const { features, styling } = config;

    const handleRowClick = useCallback(
        (row: Row<TData>) => {
            if (callbacks?.onRowClick) {
                callbacks.onRowClick(row);
            }
        },
        [callbacks],
    );

    const handleCellClick = useCallback(
        (cell: Cell<TData, unknown>, row: Row<TData>) => {
            if (callbacks?.onCellClick) {
                callbacks.onCellClick(cell, row);
            }
        },
        [callbacks],
    );

    const getColumnMeta = useCallback(
        (columnId: string): IDataColumnMeta<TData> | undefined => {
            const column = columns.find((col) => col.id === columnId);
            return column?.meta;
        },
        [columns],
    );

    const renderCellContent = useCallback(
        (cell: Cell<TData, unknown>, row: Row<TData>) => {
            const meta = getColumnMeta(cell.column.id);
            if (cell.column.id === "select" && features?.rowSelection) {
                return (
                    <div className="ml-4">
                        <Checkbox
                            checked={row.getIsSelected()}
                            onCheckedChange={(value) =>
                                row.toggleSelected(!!value)
                            }
                            aria-label="Select row"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                );
            }

            if (meta?.showImage) {
                let imageUrl: string | undefined;
                if (typeof meta.imageKey === "function") {
                    if (meta.imageKey !== undefined) {
                        imageUrl = (
                            meta.imageKey as (row: TData) => string | undefined
                        )(row.original as TData);
                    } else {
                        imageUrl = undefined;
                    }
                } else if (typeof meta.imageKey === "string") {
                    imageUrl = (row.original as any)[meta.imageKey];
                } else {
                    imageUrl = (row.original as any)["avatar"];
                }
                const altText = meta.imageAltKey
                    ? (row.original as any)[meta.imageAltKey]
                    : String(cell.getValue());
                if (meta.imageRenderer) {
                    return meta.imageRenderer(imageUrl ?? "", row);
                }
                return (
                    <div className="flex items-center gap-2">
                        <Avatar
                            alt={altText}
                            src={imageUrl}
                            className={
                                meta.imageClassName ||
                                "w-[38px] h-[38px] rounded-full object-cover border-none"
                            }
                            // style={meta.imageStyle}
                        />
                        <span>{String(cell.getValue())}</span>
                    </div>
                );
            }

            if (meta?.cellRenderer) {
                try {
                    return meta.cellRenderer(cell.getValue(), row);
                } catch (error) {
                    console.error("Error in cell renderer:", error);
                    return <span className="text-red-500">Error</span>;
                }
            }

            return flexRender(cell.column.columnDef.cell, cell.getContext());
        },
        [features?.rowSelection, getColumnMeta],
    );

    return (
        <div className="border overflow-hidden border-none">
            <div className="min-h-[30vh] max-h-[60vh] flex flex-col">
                <div className="flex-1 overflow-y-auto">
                    <Table className="w-full">
                        <TableHeader
                            className={cn(
                                "sticky top-0 z-10",
                                "[&_tr:last-child]:border-0",
                            )}
                        >
                            {table
                                .getHeaderGroups()
                                .map((headerGroup: HeaderGroup<TData>) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map(
                                            (header: any) => {
                                                const meta = getColumnMeta(
                                                    header.column.id,
                                                );

                                                return (
                                                    <TableHead
                                                        key={header.id}
                                                        colSpan={header.colSpan}
                                                        className={cn(
                                                            "h-12 px-4 pl-2 text-left align-middle font-medium text-[13px] text-primary bg-table-header border-r border-border",
                                                        )}
                                                        style={{
                                                            width: meta?.width,
                                                            minWidth:
                                                                meta?.minWidth,
                                                            maxWidth:
                                                                meta?.maxWidth,
                                                            borderRight:
                                                                "1px solid var(--White, #FFFFFF)",
                                                        }}
                                                    >
                                                        {header.isPlaceholder ? null : (
                                                            <div
                                                                className={cn(
                                                                    "flex items-center w-full justify-between text-[13px] text-data-table-text [&>*]:flex [&>*]:w-full [&>*]:justify-between",
                                                                    meta?.align ===
                                                                        "center" &&
                                                                        "justify-center",
                                                                    meta?.align ===
                                                                        "right" &&
                                                                        "justify-end",
                                                                )}
                                                            >
                                                                {header.id ===
                                                                    "select" &&
                                                                features?.rowSelection ? (
                                                                    <div className="flex flex-col mt-2">
                                                                        <Checkbox
                                                                            checked={
                                                                                table.getIsAllPageRowsSelected() ||
                                                                                (table.getIsSomePageRowsSelected() &&
                                                                                    "indeterminate")
                                                                            }
                                                                            className="self-center mx-2 !bg-white"
                                                                            onCheckedChange={(
                                                                                value,
                                                                            ) =>
                                                                                table.toggleAllPageRowsSelected(
                                                                                    !!value,
                                                                                )
                                                                            }
                                                                            aria-label="Select all"
                                                                        />
                                                                    </div>
                                                                ) : (
                                                                    flexRender(
                                                                        header
                                                                            .column
                                                                            .columnDef
                                                                            .header,
                                                                        header.getContext(),
                                                                    )
                                                                )}
                                                            </div>
                                                        )}
                                                    </TableHead>
                                                );
                                            },
                                        )}
                                    </TableRow>
                                ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table
                                    .getRowModel()
                                    .rows.map((row: Row<TData>) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={
                                                row.getIsSelected() &&
                                                "selected"
                                            }
                                            className={cn(
                                                "hover:bg-muted/50 text-data-table-text text-[13px] data-[state=selected]:bg-border/60 border-b-2 border-white",

                                                "cursor-pointer",
                                            )}
                                            onClick={() => handleRowClick(row)}
                                        >
                                            {row
                                                .getVisibleCells()
                                                .map((cell: any) => {
                                                    const meta = getColumnMeta(
                                                        cell.column.id,
                                                    );

                                                    return (
                                                        <TableCell
                                                            key={cell.id}
                                                            className={cn(
                                                                "pr-1 py-3",
                                                                meta?.className,
                                                            )}
                                                            style={{
                                                                width: meta?.width,
                                                                minWidth:
                                                                    meta?.minWidth,
                                                                maxWidth:
                                                                    meta?.maxWidth,
                                                                borderBottom:
                                                                    "1px",
                                                            }}
                                                            onClick={() => {
                                                                // e.stopPropagation();
                                                                handleCellClick(
                                                                    cell,
                                                                    row,
                                                                );
                                                            }}
                                                        >
                                                            <div
                                                                className={cn(
                                                                    "flex items-center  text-text-secondary text-[14px] font-medium",
                                                                    meta?.align ===
                                                                        "center" &&
                                                                        "justify-center",
                                                                    meta?.align ===
                                                                        "right" &&
                                                                        "justify-end",
                                                                    meta?.truncate &&
                                                                        "truncate",
                                                                )}
                                                            >
                                                                {renderCellContent(
                                                                    cell,
                                                                    row,
                                                                )}
                                                            </div>
                                                        </TableCell>
                                                    );
                                                })}
                                        </TableRow>
                                    ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={table.getAllColumns().length}
                                        className="h-24 text-center"
                                    >
                                        <DataTableEmpty />
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};
export default DataTableContent;
