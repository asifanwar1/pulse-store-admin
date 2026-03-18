import type { UserStatusType } from "@/constants/UserStatus";

export type TProfilePicture = {
    id?: number;
    name?: string;
    extension?: string;
    type?: "IMAGE";
    access?: "PUBLIC" | "PRIVATE";
    size?: number;
    path?: string;
    thumbPath?: string;
    status?: "UPLOADING" | "UPLOADED" | "FAILED";
    userId?: number;
    meta?: Record<string, unknown>;
};

export type TUserSettings = {
    notificationsEnabled: boolean;
};

export type TUserLocation = {
    address: string;
    country: string;
    city: string;
    state: string;
    zipCode: string;
};

export type TUserInfo = {
    userId: number;
};

export type TCertificate = {
    name: string;
    issuedBy: string;
    issuedOn: string;
    expiresOn: string;
    credentialId: string;
    id: number;
};

export type TInstallerDetails = {
    certificates: TCertificate[];
    totalExperience: number;
};

export type TUserResponse = {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    lastEventId?: number;
    type: "ADMIN" | "CUSTOMER" | "INSTALLER" | "GUEST";
    email: string;
    contact: string;
    countryCodeContact?: string;
    status: UserStatusType;
    gender?: "MALE" | "FEMALE";
    profilePictureId?: number;
    locationId?: number;
    isOnline?: boolean;
    lastSeenAt?: string;
    profilePicture?: TProfilePicture;
    settings?: TUserSettings;
    location?: TUserLocation;
    userInfo?: TUserInfo;
    installerCertificates?: TCertificate[];
    totalExperience?: number;
    totalReviewsCount?: number;
    averageRating?: number;
    isSelected?: boolean;
    phone?: string;
};

export type TGetCurrentUserResponse = {
    user: TUserResponse;
};

export type TGetUsersResponse = {
    data: TUserResponse[];
    count: number;
};

export type TGetUserByIdResponse = TUserResponse;

export type TUpdateUserResponse = {
    data: boolean;
};

export type TDeleteUserResponse = {
    data: boolean;
};

export type TUpdateUserStatusResponse = {
    data: boolean;
};

export type TInstallerInviteResponse = {
    data: boolean;
};

export type TCustomerOnboardResponse = {
    data: boolean;
};

export type TUpdateFcmTokenResponse = {
    data: boolean;
};

export type TExportUsersResponse = string;

export type TInstallerReinviteResponse = {
    data: boolean;
};
