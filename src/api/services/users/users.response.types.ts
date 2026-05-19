import type { AddressModel } from "@/api/models/address.model";
import type { MediaModel } from "@/api/models/media.model";
import type { UserModel } from "@/api/models/user.model";

export type TUserLocation = AddressModel;

export type TUserSettings = {
    notificationsEnabled?: boolean;
};

export type TUserInfo = {
    userId?: number;
    [key: string]: unknown;
};

export type TUserResponse = UserModel & {
    profilePicture?: MediaModel;
    location?: TUserLocation;
    settings?: TUserSettings;
    userInfo?: TUserInfo;
};

export type TGetCurrentUserResponse = TUserResponse;

export type TUpdateMeResponse = TUserResponse;

export type TGetUsersResponse = {
    data: TUserResponse[];
    count: number;
};

export type TGetUserByIdResponse = TUserResponse;

export type TDeleteUserResponse = void;

export type TUpdateUserStatusResponse = TUserResponse;
