/**
 * Wraps a state setter so that setting it also resets the page back to 1.
 * Use for search, filters, and page-size changes — any change that can
 * invalidate the current page's results.
 */
export const withPageReset =
    <T,>(setValue: (value: T) => void, setPage: (page: number) => void) =>
    (value: T) => {
        setValue(value);
        setPage(1);
    };

type UseTablePaginationParams = {
    pageSize: number;
    setPage: (page: number) => void;
    setPageSize: (size: number) => void;
    totalCount?: number;
};

/**
 * Derives DataTable's server-pagination props (`pageCount`, `onPaginationChange`)
 * from the page-size/page state a container already owns. Only needed by
 * modules using the `DataTable` component — card-grid + `Pagination` modules
 * don't need `pageCount` (that component computes it internally) and can use
 * `withPageReset` directly instead.
 */
export const useTablePagination = ({
    pageSize,
    setPage,
    setPageSize: setPageSizeRaw,
    totalCount,
}: UseTablePaginationParams) => {
    const pageCount = Math.max(1, Math.ceil((totalCount ?? 0) / pageSize));
    const setPageSize = withPageReset(setPageSizeRaw, setPage);

    const onPaginationChange = (pagination: {
        pageIndex: number;
        pageSize: number;
    }) => {
        if (pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize);
        } else {
            setPage(pagination.pageIndex + 1);
        }
    };

    return { pageCount, setPageSize, onPaginationChange };
};
