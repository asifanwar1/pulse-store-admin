import type { TGetUsersResponse } from "@/api/services/users/users.response.types";

export type UsersTableProps = {
    usersListData: TGetUsersResponse["data"];
    totalCount?: number;
    pageCount: number;
    page: number;
    pageSize: number;
    onSearch: (value: string) => void;
    onPaginationChange: (pagination: {
        pageIndex: number;
        pageSize: number;
    }) => void;
};
