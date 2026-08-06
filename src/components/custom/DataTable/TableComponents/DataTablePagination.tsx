import Button from "@/components/custom/CustomButton/CustomButton";
import { Select } from "@/components/custom/Select";
import type { Table } from "@tanstack/react-table";

import { ChevronLeft, ChevronRight } from "lucide-react";

type DataTablePaginationProps<TData> = {
    table: Table<TData>;
    totalCount?: number;
};

const pageSizeOptions = [10, 20, 30, 50, 100];

const DataTablePagination = <TData,>({
    table,
    totalCount,
}: DataTablePaginationProps<TData>) => {
    const isManualPagination = table.options.manualPagination;
    const currentPage = table.getState().pagination.pageIndex + 1;
    const pageSize = table.getState().pagination.pageSize;

    const totalRows = isManualPagination
        ? (totalCount ?? table.getFilteredRowModel().rows.length)
        : table.getFilteredRowModel().rows.length;

    const startRow = totalRows === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const endRow =
        totalRows === 0 ? 0 : Math.min(currentPage * pageSize, totalRows);

    const pageSizeSelectOptions = pageSizeOptions.map((size) => ({
        value: size.toString(),
        label: size.toString(),
    }));

    const selectedPageSize =
        pageSizeSelectOptions.find(
            (option) => option.value === pageSize.toString(),
        ) || pageSizeSelectOptions[0];

    return (
        <div className="flex items-center justify-end gap-5 p-4 w-full">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-4">
                    <p className="text-sm font-medium text-[#687082] leading-[1.5] tracking-[0.2px]">
                        Items per page:
                    </p>
                    <div className="w-[90px]">
                        <Select
                            options={pageSizeSelectOptions}
                            value={selectedPageSize}
                            onChange={(value) => {
                                if (value && !Array.isArray(value)) {
                                    table.setPageSize(Number(value.value));
                                }
                            }}
                            clearable={false}
                            className="h-6 text-sm"
                            popoverClassName="min-w-[80px]"
                            placeholder=""
                        />
                    </div>
                </div>

                <p className="text-sm font-medium text-[#687082] leading-[1.5] tracking-[0.2px]">
                    {startRow} - {endRow} of {totalRows}
                </p>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 rounded-md border border-[#f2f2f2] hover:bg-gray-50"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeft className="w-3 h-3" />
                    </Button>

                    <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 rounded-md border border-[#f2f2f2] hover:bg-gray-50"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronRight className="w-3 h-3" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DataTablePagination;
