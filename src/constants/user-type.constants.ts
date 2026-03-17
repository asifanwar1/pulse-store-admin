export enum USER_TYPE {
    ADMIN = "ADMIN",
    CUSTOMER = "CUSTOMER",
    VENDOR = "VENDOR",
}

export const UserDisplayText = {
    [USER_TYPE.ADMIN]: "Admin",
    [USER_TYPE.CUSTOMER]: "Customer",
    [USER_TYPE.VENDOR]: "Vendor",
};

export type UserType = `${USER_TYPE}`;
