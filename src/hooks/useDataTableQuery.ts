import { useQuery } from "@tanstack/react-query";

import { useQueryState } from "nuqs";
import type { BaseQueryType } from "../api/models";
import type { ResponseType } from "../api/types/common";
import Config from "../Config";
import { SortOrder } from "../constants";

type DataTableQueryParams<T> = {
    queryKey: string[];
    queryFn: (
        params: BaseQueryType,
        signal: AbortSignal | undefined,
    ) => Promise<ResponseType<{ data: T[]; count: number }>>;
    limit?: number;
    defaultSortColumn?: string;
    defaultSortDirection?: SortOrder;
    enabled?: boolean;
    staleTime?: number;
    gcTime?: number;
    namespace?: string;
};

const useDataTableQuery = <T>({
    queryKey,
    queryFn,
    limit = Config.LIMIT,
    defaultSortColumn = "createdAt",
    defaultSortDirection = SortOrder.DESC,
    enabled = true,
    staleTime = 5 * 60 * 1000,
    gcTime = 0,
    namespace,
}: DataTableQueryParams<T>) => {
    const prefix = namespace ? `${namespace}_` : "";

    const [page, setPage] = useQueryState<number>(`${prefix}page`, {
        defaultValue: 1,
        parse: (value) => Number(value),
        serialize: (value) => String(value),
    });

    const [column, setColumn] = useQueryState<string>(`${prefix}column`, {
        defaultValue: defaultSortColumn,
        parse: (value) => value,
        serialize: (value) => value,
    });
    const [direction, setDirection] = useQueryState<SortOrder>(
        `${prefix}direction`,
        {
            defaultValue: defaultSortDirection,
            parse: (value) => value as SortOrder,
            serialize: (value) => value as SortOrder,
        },
    );

    const { data, ...rest } = useQuery({
        queryKey: [...queryKey, page, limit, column, direction],
        enabled: enabled,
        staleTime: staleTime,
        gcTime: gcTime,
        queryFn: async ({ signal }) => {
            const { data } = await queryFn(
                {
                    page,
                    limit,
                    column,
                    direction,
                },
                signal,
            );
            return {
                data: data?.data as T[],
                count: data?.count as number,
            };
        },
    });
    return {
        data: data?.data as T[],
        count: data?.count as number,
        page,
        setPage,
        limit,
        column,
        setColumn,
        direction,
        setDirection,
        ...rest,
    };
};

export { useDataTableQuery };
