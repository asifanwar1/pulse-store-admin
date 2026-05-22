import {
    Pagination as Root,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
} from "../ui/pagination";
import { Select } from "./Select";

export type PaginationProps = {
    page: number; // 1-based
    pageSize: number;
    total: number;
    onPageChange: (p: number) => void;
    onPageSizeChange: (s: number) => void;
    limits?: number[];
    hidePageButtons?: boolean;
};

const DEFAULT_LIMITS = [5, 10, 20, 50, 100, -1];

export default function Pagination({
    page,
    pageSize,
    total,
    onPageChange,
    onPageSizeChange,
    limits = DEFAULT_LIMITS,
    hidePageButtons = false,
}: PaginationProps) {
    const totalPages = Math.max(1, Math.ceil(total / Math.max(pageSize, 1)));
    const canPrev = page > 1;
    const canNext = page < totalPages;

    return (
        <div className="flex text-nowrap items-center gap-4 mb-2">
            <div className="w-full flex items-center gap-2 text-xs md:text-sm text-text-secondary">
                <span className="text-text-secondary">Items per page:</span>
                <Select
                    className="h-8 w-[4.3rem] rounded-md border bg-white px-2 text-sm"
                    valueClassName="text-text-secondary"
                    options={limits.map((l) => ({
                        value: l.toString(),
                        label: l === -1 ? "All" : l.toString(),
                    }))}
                    clearable={false}
                    value={{
                        label: pageSize === -1 ? "All" : pageSize.toString(),
                        value: pageSize.toString(),
                    }}
                    onChange={(opt) =>
                        onPageSizeChange(
                            Number(
                                Array.isArray(opt)
                                    ? opt[0]?.value
                                    : (opt as { value?: string })?.value,
                            ),
                        )
                    }
                />
            </div>

            <div className="text-xs md:text-sm text-text-secondary">
                {total > 0
                    ? pageSize === -1
                        ? `1 - All of ${total}`
                        : `${Math.min(
                              (page - 1) * pageSize + 1,
                              total,
                          )} - ${Math.min(page * pageSize, total)} of ${total}`
                    : `0 of 0`}
            </div>
            {!hidePageButtons && (
                <Root className="!mx-0">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (canPrev) onPageChange(page - 1);
                                }}
                                className="h-8 px-2 pagination-previous text-text-secondary"
                                aria-disabled={!canPrev}
                            />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (canNext) onPageChange(page + 1);
                                }}
                                className="h-8 px-2 pagination-next text-text-secondary"
                                aria-disabled={!canNext}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Root>
            )}
        </div>
    );
}
