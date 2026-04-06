import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface DataTableSkeletonProps {
    columnCount: number;
    rowCount?: number;
}

const DataTableSkeleton = ({
    columnCount,
    rowCount = 10,
}: DataTableSkeletonProps) => {
    return (
        <div className="rounded-md border overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        {Array.from({ length: columnCount }).map((_, index) => (
                            <TableHead key={index} className="h-12 px-4">
                                <Skeleton className="h-4 w-24" />
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: rowCount }).map((_, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {Array.from({ length: columnCount }).map(
                                (_, colIndex) => (
                                    <TableCell
                                        key={colIndex}
                                        className="px-4 py-3"
                                    >
                                        <Skeleton className="h-4 w-full" />
                                    </TableCell>
                                ),
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default DataTableSkeleton;
