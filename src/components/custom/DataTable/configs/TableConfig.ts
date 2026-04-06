import type {
    IDataTableConfig,
    TDataColumnDef,
    IFilterConfig,
    IDataTableFeatures,
    IDataTableStyling,
    IDataTableCallbacks,
} from "../TableTypes";
import type { Row, RowData, SortingState } from "@tanstack/react-table";

interface CreateTableConfigParams<TData> {
    id: string;
    title: string;
    description?: string;
    data: TData[];
    columns: TDataColumnDef<TData>[];
    pageCount?: number;
    totalCount?: number;
    // Optional overrides
    features?: Partial<IDataTableFeatures>;
    styling?: Partial<IDataTableStyling>;
    callbacks?: Partial<IDataTableCallbacks<TData>>;
    initialState?: Partial<typeof defaultInitialState>;
}

// Default configuration that works for ALL tables
const defaultFeatures = {
    rowSelection: true,
    sorting: true,
    filtering: true,
    pagination: true,
    columnVisibility: true,
    globalSearch: true,
    export: true,
    rowActions: true,
    rowReorder: false,
};

const defaultStyling = {
    variant: "default" as const,
    size: "md" as const,
    className: "w-full",
    header: { sticky: true },
    row: { hover: true, selectable: true },
};

const defaultInitialState = {
    pagination: { pageIndex: 0, pageSize: 10 },
    sorting: [] as Array<{ id: string; desc: boolean }>,
};

const defaultCallbacks = {
    onRowSelectionChange: <TData>(selectedRows: Row<TData>[]) => {
        console.log("Selected rows:", selectedRows);
    },
    onRowClick: <TData>(_row: Row<TData>) => {
        // console.log("Row clicked:", row.original);
    },
    onExport: <TData>(data: TData[], format: string) => {
        console.log("Export:", format, data);
    },
    onFilteringChange: (filters: IFilterConfig[]) => {
        console.log("Filters changed:", filters);
    },
    onPaginationChange: (pagination: {
        pageIndex: number;
        pageSize: number;
    }) => {
        console.log("Pagination changed:", pagination);
    },
    onSortingChange: (sorting: SortingState) => {
        console.log("Sorting changed:", sorting);
    },
    onRowReorder: <TData>(_args: {
        activeIndex: number;
        overIndex: number;
        activeItem: TData;
        overItem: TData;
        newOrder: TData[];
    }) => {},
};

// UNIVERSAL FUNCTION FOR ALL DATA TYPES
const createTableConfig = <TData extends RowData>({
    id,
    title,
    description,
    data,
    columns,
    pageCount = -1,
    totalCount,
    features = {},
    styling = {},
    callbacks = {},
    initialState = {},
}: CreateTableConfigParams<TData>): IDataTableConfig<TData> => {
    return {
        id,
        title,
        description,
        data,
        columns,
        pageCount,
        totalCount,
        features: { ...defaultFeatures, ...features },
        styling: { ...defaultStyling, ...styling },
        callbacks: { ...(defaultCallbacks as any), ...(callbacks as any) },
        initialState: { ...defaultInitialState, ...initialState },
    };
};

export { createTableConfig };
