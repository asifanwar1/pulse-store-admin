import type { TProfilePicture } from "../users/users.response.types";

export type TReportMedia = {
    id: number;
    reportId: number;
    mediaId: number;
    media: TProfilePicture;
};

export type TReportUser = {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    phone: string;
    type: "ADMIN" | "CUSTOMER" | "INSTALLER" | "GUEST";
    status: "REGISTERING" | "ACTIVE" | "INACTIVE" | "SUSPENDED";
    gender: "MALE" | "FEMALE";
    profilePictureId: number;
    locationId: number;
    isOnline: boolean;
    lastSeenAt: string;
    profilePicture: TProfilePicture;
    settings: {
        notificationsEnabled: boolean;
    };
    location: {
        address: string;
        country: string;
        city: string;
        state: string;
        zipCode: string;
    };
    userInfo: {
        userId: number;
    };
};

export type TReport = {
    id: number;
    title: string;
    description: string;
    type: "GENERAL" | "USER" | "PROJECT" | "QUOTE";
    reason: "SCAM" | "SPAM" | "INAPPROPRIATE" | "OTHER";
    reporterId: number;
    reporter: TReportUser;
    reportedUserId: number;
    reportedUser: TReportUser;
    medias: TReportMedia[];
};

export type TGetReportsResponse = {
    data: TReport[];
    count: number;
};

export type TCreateReportResponse = {
    data: boolean;
};

export type TDeleteReportResponse = {
    data: boolean;
};
