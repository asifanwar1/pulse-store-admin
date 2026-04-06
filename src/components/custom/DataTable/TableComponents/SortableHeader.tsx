import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import Button from "@/components/custom/CustomButton/CustomButton";
import { cn } from "@/lib/utils";
import type { Column } from "@tanstack/react-table";

interface SortableHeaderProps<TData> {
    column: Column<TData>;
    title: string;
    className?: string;
}

const SortableHeader = <TData,>({
    column,
    title,
    className,
}: SortableHeaderProps<TData>) => {
    const sortDirection = column.getIsSorted();

    return (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(sortDirection === "asc")}
            className={cn(
                "h-auto p-0 text-left justify-start hover:bg-transparent  text-data-table-text hover:text-data-table-text  text-[13px]",
                className,
            )}
        >
            {title}
            <div className="ml-2 h-4 w-4 flex-shrink-0">
                {sortDirection === "asc" ? (
                    <ArrowUp className="h-4 w-4" />
                ) : sortDirection === "desc" ? (
                    <ArrowDown className="h-4 w-4" />
                ) : (
                    <ArrowUpDown className="h-4 w-4 opacity-50" />
                )}
            </div>
        </Button>
    );
};

export default SortableHeader;
