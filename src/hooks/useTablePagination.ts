export const withPageReset =
    <T>(setValue: (value: T) => void, setPage: (page: number) => void) =>
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
