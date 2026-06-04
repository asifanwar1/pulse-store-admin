import type { TGetUsersResponse } from "@/api/services/users/users.response.types";

export type UsersTableProps = {
    usersListData: TGetUsersResponse["data"];
};
