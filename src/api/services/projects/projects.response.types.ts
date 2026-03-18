export type TCertificate = {
    id: number;
    name: string;
    issuedBy: string;
    issuedOn: string;
    expiresOn: string;
    credentialId: string;
};

export type TMedia = {
    id: number;
    name: string;
    extension: string;
    type: "IMAGE";
    access: "PUBLIC" | "PRIVATE";
    size: number;
    path: string;
    thumbPath: string;
    status: "UPLOADING" | "UPLOADED" | "FAILED";
    userId: number;
    meta: Record<string, unknown>;
};

export type TLocation = {
    address: string;
    country: string;
    city: string;
    state: string;
    zipCode: string;
};

export type TUserSettings = {
    notificationsEnabled: boolean;
};

export type TUserInfo = {
    userId: number;
};

export type TUser = {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    type: "ADMIN";
    email: string;
    contact: string;
    status: "REGISTERING";
    gender: "MALE";
    profilePictureId: number;
    locationId: number;
    isOnline: boolean;
    lastSeenAt: string;
    profilePicture: TMedia;
    settings: TUserSettings;
    location: TLocation;
    userInfo: TUserInfo;
    experience?: string;
    totalExperience?: number;
    certifications?: string;
    installerCertificates?: TCertificate[];
    rating?: string;
};

export type TStain = {
    id: number;
    name: string;
    status: string;
};

export type TColor = {
    id: number;
    name: string;
    status: string;
};

export type TCabinet = {
    id: number;
    name: string;
    status: string;
};

export type TCabinetDoor = {
    id: number;
    name: string;
    cabinetDoor: TCabinet;
    stain: TStain;
    color: TColor;
};

export type THandle = {
    id: number;
    name: string;
    status?: string;
    handleId?: number;
    handle?: {
        id: number;
        name: string;
        mediaId: number;
        status: string;
    };
    texture?: {
        id: number;
        name: string;
    };
};

export type TOrderItem = {
    id: number;
    coloredCabinetId: number | null;
    stainedCabinetId: number | null;
    handleId: number | null;
    productType: "CABINET_DOOR" | "DRAWER" | "HANDLE" | "WALL";
    productSubType: "UPPER_CABINET_DOOR";
    quantity: number;
    currentQuantity: number;
    price: number;
    coloredCabinet: TColoredCabinet | null;
    stainedCabinet: TStainedCabinet | null;
    handle: THandle | null;
};

export type TMeasurement = {
    id: number;
    objectType: "UPPER_CABINET";
    length: number;
    width: number;
    height: number;
    media: TMedia;
};

export type TProject = {
    id: number;
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
    type: "REIMAGINE" | "RENOVATION" | "POPULAR";
    userId: number;
    installerId: number | null;
    deliveryDate: string;
    surface: string;
    boxFinish: boolean;
    quote: number;
    quoteStatus: string;
    quoteUpdatedAt: string;
    createdAt: string;
    updatedAt: string;
    user: TUser;
    installer: TUser | null;
    orderItems: TOrderItem[];
    measurements: TMeasurement[];
    discountAmount: number | null;
    totalAmount: number | null;
    dealId: number | null;
    deal: TDeal[];
    projectMedia: TProjectMedia[];
    kitchenRequirements: TProjectKitchenRequirement[];
    projectInstallerVisits: TProjectInstallerVisit[];
    reviews: TReview[];
    adminRevenue: number | null;
};

export type TDeal = {
    id: number;
    name: string;
    code: string;
    discountType: string;
    discountValue: number;
    minimumOrderValue: number;
    startDate: string;
    expiryDate: string;
    usageLimit: number;
    status: string;
};

export type TProjectMedia = {
    id: number;
    category: string;
    projectId: number;
    mediaId: number;
    media: TMedia;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
};

export type TProjectKitchenRequirement = {
    id: number;
    projectId: number;
    kitchenRequirementId: number;
    kitchenRequirement: TKitchenRequirement;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
};

export type TProjectInstallerVisit = {
    id: number;
    visitSlots: string[];
    notes: string;
    projectId: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
};

export type TReview = {
    id: number;
    rating: number;
    remarks: string;
    reviewer: Record<string, unknown>;
    reviewee: Record<string, unknown>;
    isActive: boolean;
    projectId: number;
};

export type TColoredCabinet = {
    id: number;
    cabinetDoorId: number;
    colorId: number;
    doorAssetId: number;
    drawerAssetId: number;
    cabinetDoor: TCabinetDoor;
    color: TColor;
};

export type TStainedCabinet = {
    id: number;
    cabinetDoorId: number;
    stainId: number;
    doorAssetId: number;
    drawerAssetId: number;
    cabinetDoor: TCabinetDoor;
    stain: TStain;
};

export type TGetProjectsResponse = {
    data: TProject[];
    count: number;
};

export type TGetInstallerVisitsResponse = {
    data: string[];
    total: number;
};

export type TUpdateInstallerVisitsResponse = {
    data: boolean;
};

export type TCreateProjectResponse = TProject;
export type TGetProjectByIdResponse = TProject;
export type TUpdateProjectResponse = TProject;
export type TDeleteProjectResponse = {
    data: boolean;
};
export type TUpdateProjectStatusResponse = TProject;
export type TAssignInstallerResponse = {
    data: boolean;
};
export type TUpdateQuoteStatusResponse = {
    data: boolean;
};
export type TCreateInstallerVisitResponse = {
    data: boolean;
};
export type TUpdateInstallerVisitSlotStatusResponse = {
    data: boolean;
};

export type TKitchenRequirement = {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
};

export type TGetKitchenRequirementsResponse = {
    data: TKitchenRequirement[];
};
