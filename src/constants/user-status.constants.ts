import { injectBaseConstantMethods } from "./base.constants";

export const UserStatus = {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
    BLOCKED: "BLOCKED",
    INVITED: "INVITED",
};

const displayStatusTextKeys = {
    [UserStatus.ACTIVE]: "Active",
    [UserStatus.INACTIVE]: "Inactive",
    [UserStatus.BLOCKED]: "Blocked",
    [UserStatus.INVITED]: "Invited",
};

const statusLabelClasses = {
    [UserStatus.ACTIVE]: "bg-green-100 text-green-800",
    [UserStatus.INACTIVE]: "bg-gray-100 text-gray-800",
    [UserStatus.BLOCKED]: "bg-red-100 text-red-800",
};

export const UserStatusWithHelpers = injectBaseConstantMethods(
    UserStatus,
    displayStatusTextKeys,
    statusLabelClasses,
);

export type UserStatusType = (typeof UserStatus)[keyof typeof UserStatus];
