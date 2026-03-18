export type TCreateColorResponse = {
    id: number;
    name: string;
    hexCode: string;
    status: "ACTIVE" | "INACTIVE";
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
};

export type TUpdateColorResponse = {
    id: number;
    name: string;
    hexCode: string;
    status: "ACTIVE" | "INACTIVE";
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
};

export type TDeleteColorResponse = {
    data: boolean;
};

export type TGetColorsResponse = {
    data: TCreateColorResponse[];
    count: number;
};

export type TPicture = {
    id: number;
    name: string;
    extension: string;
    type: "IMAGE";
    access: "PUBLIC";
    size: number;
    path: string;
    thumbPath: string;
    status: "UPLOADING" | "UPLOADED" | "FAILED";
    userId: number;
    meta: Record<string, unknown>;
};

export type TAsset = {
    id: number;
    name: string;
    extension: string;
    type: "IMAGE";
    access: "PUBLIC";
    size: number;
    path: string;
    thumbPath: string;
    status: "UPLOADING" | "UPLOADED" | "FAILED";
    userId: number;
    meta: Record<string, unknown>;
};

export type TStainResponse = {
    id: number;
    name: string;
    status: "ACTIVE" | "INACTIVE";
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    picture: TPicture;
    asset: TAsset;
};

export type TCreateStainResponse = TStainResponse;
export type TUpdateStainResponse = TStainResponse;
export type TDeleteStainResponse = {
    data: boolean;
};

export type TGetStainsResponse = {
    data: TStainResponse[];
    count: number;
};

export type THandleStyleResponse = {
    id: number;
    name: string;
    status: "ACTIVE" | "INACTIVE";
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    picture: TPicture;
    frontViewAsset: TAsset;
    sideViewAsset: TAsset;
};

export type TCreateHandleStyleResponse = THandleStyleResponse;
export type TUpdateHandleStyleResponse = THandleStyleResponse;
export type TDeleteHandleStyleResponse = {
    data: boolean;
};

export type TGetHandleStylesResponse = {
    data: THandleStyleResponse[];
    count: number;
};

export type TCabinetDoorColor = {
    id: number;
    colorId: number;
    cabinetDoorId: number;
    doorAssetId: number;
    sameDrawerAssetId: number;
    flatDrawerAssetId: number;
    createdAt: string;
    updatedAt: string;
    color: TCreateColorResponse;
    cabinetDoor: TCabinetDoorResponse;
    doorAsset: TAsset;
    sameDrawerAsset: TAsset;
    flatDrawerAsset: TAsset;
};

export type TCabinetDoorStain = {
    id: number;
    stainId: number;
    doorAssetId: number;
    sameDrawerAssetId: number;
    flatDrawerAssetId: number;
    createdAt: string;
    updatedAt: string;
    stain: TStainResponse;
    cabinetDoor: TCabinetDoorResponse;
    doorAsset: TAsset;
    sameDrawerAsset: TAsset;
    flatDrawerAsset: TAsset;
};

export type TCabinetDoorResponse = {
    id: number;
    name: string;
    mediaId: number;
    isGlass: boolean;
    status: "ACTIVE" | "INACTIVE";
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    colors: TCabinetDoorColor[];
    stains: TCabinetDoorStain[];
    media: TAsset;
};

export type TCreateCabinetDoorResponse = TCabinetDoorResponse;
export type TUpdateCabinetDoorResponse = TCabinetDoorResponse;
export type TDeleteCabinetDoorResponse = TCabinetDoorResponse;
export type TGetCabinetDoorByIdResponse = TCabinetDoorResponse;

export type TGetCabinetDoorsResponse = {
    data: TCabinetDoorResponse[];
    count: number;
};

export type TTexture = {
    id: number;
    name: string;
    status: "ACTIVE" | "INACTIVE";
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    picture: TPicture;
    frontViewAsset: TAsset;
    sideViewAsset: TAsset;
};

export type THandleTexture = {
    id: number;
    textureId: number;
    assetId: number;
    frontViewAssetId: number;
    sideViewAssetId: number;
    handleId: number;
    createdAt: string;
    updatedAt: string;
    texture: TTexture;
    handle: THandleResponse;
    asset: TAsset;
    frontViewAsset: TAsset;
    sideViewAsset: TAsset;
};

export type THandleResponse = {
    id: number;
    name: string;
    mediaId: number;
    status: "ACTIVE" | "INACTIVE";
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    textures: THandleTexture[];
    media: TAsset;
    asset: TAsset;
    texture: TTexture;
};

export type TCreateHandleResponse = THandleResponse;
export type TUpdateHandleResponse = THandleResponse;
export type TDeleteHandleResponse = THandleResponse;
export type TGetHandleByIdResponse = THandleResponse;

export type TGetHandlesResponse = {
    data: THandleResponse[];
    count: number;
};

export type TTextureResponse = {
    id: number;
    name: string;
    status: "ACTIVE" | "INACTIVE";
};

export type TPriceResponse = {
    id: number;
    productType: "CABINET_DOOR";
    price: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
};

export type TCreatePriceResponse = TPriceResponse;

export type TUpdatePriceResponse = TPriceResponse;

export type TGetPriceByIdResponse = TPriceResponse;

export type TDeletePriceResponse = {
    data: boolean;
};

export type TGetPricesResponse = {
    data: TPriceResponse[];
    count: number;
};
