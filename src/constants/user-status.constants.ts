import { injectBaseConstantMethods } from "./BaseConstant";

export const UserStatus = {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
    PENDING: "PENDING",
    BLOCKED: "BLOCKED",
    REGISTERING: "REGISTERING",
    INVITED: "INVITED",
};

const displayStatusTextKeys = {
    [UserStatus.ACTIVE]: "Active",
    [UserStatus.INACTIVE]: "Inactive",
    [UserStatus.PENDING]: "Pending",
    [UserStatus.BLOCKED]: "Blocked",
    [UserStatus.REGISTERING]: "Registering",
    [UserStatus.INVITED]: "Invited",
};

const statusLabelClasses = {
    [UserStatus.ACTIVE]: "bg-green-100 text-green-800",
    [UserStatus.INACTIVE]: "bg-gray-100 text-gray-800",
    [UserStatus.PENDING]: "bg-yellow-100 text-yellow-800",
    [UserStatus.BLOCKED]: "bg-red-100 text-red-800",
    [UserStatus.REGISTERING]: "bg-gray-100 text-gray-800",
};

export const UserStatusWithHelpers = injectBaseConstantMethods(
    UserStatus,
    displayStatusTextKeys,
    statusLabelClasses,
);

export type UserStatusType = (typeof UserStatus)[keyof typeof UserStatus];
