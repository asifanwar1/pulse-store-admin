export type TGetUsersParams = {
    page?: number;
    limit?: number;
    column?: string;
    direction?: "ASC" | "DESC";
    search?: string;
    type?: "ADMIN" | "CUSTOMER" | "INSTALLER" | "GUEST";
    status?: string;
};

export type TUpdateUserBody = {
    firstName?: string;
    lastName?: string;
    gender?: "MALE" | "FEMALE";
    address?: string;
    country?: string;
    state?: string;
    city?: string;
    zipCode?: string;
    longitude?: number;
    latitude?: number;
    profilePictureId?: number;
    phone?: string;
    customerDetails?: Record<string, unknown>;
    installerDetails?: {
        certificates?: Array<{
            name: string;
            issuedBy: string;
            issuedOn: string;
            expiresOn: string;
            credentialId: string;
            id?: number;
        }>;
        totalExperience?: number;
    };
    sendForApproval?: boolean;
};

export type TUpdateUserStatusBody = {
    status: "REGISTERING" | "ACTIVE" | "INACTIVE" | "SUSPENDED";
    reason?: string;
};

export type TInstallerInviteBody = {
    email: string;
};

export type TCustomerOnboardBody = {
    password: string;
    phone: string;
    state: string;
    city: string;
    address: string;
};

export type TUpdateFcmTokenBody = {
    fcmToken: string;
    voipToken: string;
};

export type TExportUsersParams = {
    page?: number;
    limit?: number;
    column?: string;
    direction?: string;
    search?: string;
    type?: "ADMIN" | "CUSTOMER" | "INSTALLER" | "GUEST";
    status?: string[];
};
