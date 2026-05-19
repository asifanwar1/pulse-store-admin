import type { UserModel } from "@/api/models/user.model";
import type { UserStatusType } from "@/constants/user-status.constants";
import type { UserType } from "@/constants/user-type.constants";

export type TUserSortDirection = "ASC" | "DESC";

export type TGetUsersParams = {
    page?: number;
    limit?: number;
    column?: string;
    direction?: TUserSortDirection;
    search?: string;
    status?: UserStatusType;
    user_type?: UserType;
};

export type TUpdateMeBody = Partial<UserModel> & {
    [key: string]: unknown;
};

export type TUpdateUserStatusBody = {
    status: UserStatusType;
};
