import type { AddressModel } from "./address.model";
import type { BaseModel } from "./base.model";
import type { UserType } from "@/constants/user-type.constants";
import type { UserStatusType } from "@/constants/user-status.constants";
import type { MediaModel } from "./media.model";

export type UserModel = BaseModel & {
    email: string;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    phoneNumber?: string;
    type?: UserType;
    status?: UserStatusType;
    profilePictureId?: number;
    isOnline?: boolean;
    lastSeenAt?: string;
    settings?: UserSettingsModel;
    profilePicture?: MediaModel;
    locationId?: number;
    adminDetails?: AdminDetailsModel;
    address?: AddressModel;
    userInfo?: UserInfoModel;
};

type AdminDetailsModel = {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    revenueShare?: number;
};
type UserInfoModel = AdminDetailsModel & {
    userId?: number;
};

type UserSettingsModel = {
    notificationsEnabled?: boolean;
};
