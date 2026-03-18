export type TGetProjectsParams = {
    page?: number;
    limit?: number;
    column?: string;
    direction?: "ASC" | "DESC";
    search?: string;
    status?: string;
    type?: string | string[];
    customerId?: number;
    installerId?: number;
    startDate?: string;
    endDate?: string;
};

export type TGetInstallerVisitsParams = {
    page?: number;
    limit?: number;
    column?: string;
    direction?: "ASC" | "DESC";
    search?: string;
    status?: "PENDING" | "APPROVED" | "REJECTED";
    startDate?: string;
    endDate?: string;
};

export type TCreateProjectBody = {
    type: "REIMAGINE" | "RENOVATION" | "POPULAR";
    deliveryDate: string;
    surface: "INSIDE" | "OUTSIDE" | "BOTH";
    boxFinish: boolean;
    orderItems: Array<{
        coloredCabinetId: number;
        stainedCabinetId: number;
        handleId: number;
        quantity: number;
        currentQuantity: number;
        productType: "CABINET_DOOR";
        productSubType: "UPPER_CABINET_DOOR";
    }>;
    measurements: Array<{
        objectType: "UPPER_CABINET";
        length: number;
        width: number;
        height: number;
        mediaId: number;
    }>;
    projectMedia: Array<{
        mediaId: number;
        category: "INSPIRATION";
    }>;
    kitchenRequirements: number[];
};

export type TUpdateProjectBody = {
    status?:
        | "DRAFT"
        | "PENDING"
        | "REJECTED"
        | "INSTALLER_ASSIGNED"
        | "READY_FOR_MANUFACTURING"
        | "CABINET_BOXES_COMPLETE"
        | "CABINET_DOORS_ASSEMBLED"
        | "PLC_COMPLETE"
        | "QUALITY_CONTROL_COMPLETE"
        | "READY_FOR_INSTALLATION"
        | "COMPLETED"
        | "CANCELLED";
    type?: "REIMAGINE" | "RENOVATION" | "POPULAR";
    deliveryDate?: string;
    surface?: "INSIDE" | "OUTSIDE" | "BOTH";
    boxFinish?: boolean;
    orderItems?: Array<{
        coloredCabinetId?: number;
        stainedCabinetId?: number;
        handleId?: number;
        quantity?: number;
        currentQuantity?: number;
        productType: "CABINET_DOOR" | "DRAWER" | "HANDLE" | "WALL";
        productSubType?: string;
        id: number;
    }>;
    measurements?: Array<{
        objectType: "UPPER_CABINET";
        length: number;
        width: number;
        height: number;
        mediaId: number;
        id: number;
    }>;
    projectMedia?: Array<{
        mediaId: number;
        category: "INSPIRATION";
    }>;
    kitchenRequirements?: number[];
};

export type TUpdateInstallerVisitsBody = {
    id: number;
    visitSlots: Array<{
        id: number;
        slot: string;
    }>;
    notes: string;
};

export type TUpdateProjectStatusParams = {
    status:
        | "DRAFT"
        | "PENDING"
        | "REJECTED"
        | "INSTALLER_ASSIGNED"
        | "READY_FOR_MANUFACTURING"
        | "CABINET_BOXES_COMPLETE"
        | "CABINET_DOORS_ASSEMBLED"
        | "PLC_COMPLETE"
        | "QUALITY_CONTROL_COMPLETE"
        | "READY_FOR_INSTALLATION"
        | "COMPLETED"
        | "CANCELLED";
};

export type TUpdateQuoteStatusParams = {
    status: "PENDING" | "APPROVED" | "DEACTIVATED" | "SENT_BACK";
};

export type TUpdateInstallerVisitSlotStatusParams = {
    status: "PENDING" | "APPROVED" | "REJECTED";
};

export type TCreateInstallerVisitBody = {
    id: number;
    visitSlots: Array<{
        id: number;
        slot: string;
    }>;
    notes: string;
};

export type TGetKitchenRequirementsParams = {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: "ASC" | "DESC";
};
