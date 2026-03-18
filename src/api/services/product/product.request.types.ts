export type TCreateColorBody = {
    name: string;
    hexCode: string;
    status: "ACTIVE" | "INACTIVE";
};

export type TUpdateColorBody = {
    name: string;
    hexCode: string;
    status: "ACTIVE" | "INACTIVE";
};

export type TGetColorsParams = {
    page?: number;
    limit?: number;
    column?: string;
    direction?: "ASC" | "DESC";
    search?: string;
    status?: string;
};

export type TCreateStainBody = {
    name: string;
    pictureId: number;
    assetId: number;
    status: "ACTIVE" | "INACTIVE";
};

export type TUpdateStainBody = {
    name?: string;
    pictureId?: number;
    assetId?: number;
    status?: "ACTIVE" | "INACTIVE";
};

export type TGetStainsParams = {
    page?: number;
    limit?: number;
    column?: string;
    direction?: "ASC" | "DESC";
    search?: string;
    status?: string;
};

export type TCreateHandleStyleBody = {
    name: string;
    pictureId: number;
    frontViewAssetId: number;
    sideViewAssetId: number;
    status: "ACTIVE" | "INACTIVE";
};

export type TUpdateHandleStyleBody = {
    name?: string;
    pictureId?: number;
    frontViewAssetId?: number;
    sideViewAssetId?: number;
    status?: "ACTIVE" | "INACTIVE";
};

export type TGetHandleStylesParams = {
    page?: number;
    limit?: number;
    column?: string;
    direction?: "ASC" | "DESC";
    search?: string;
    status?: string;
};

export type TCreateCabinetDoorBody = {
    name: string;
    mediaId: number;
    colors: Array<{
        colorId: number;
        doorAssetId: number;
        drawerAssetId: number;
    }>;
    stains: Array<{
        stainId: number;
        doorAssetId: number;
        drawerAssetId: number;
    }>;
    isGlass: boolean;
    status: "ACTIVE" | "INACTIVE";
};

export type TUpdateCabinetDoorBody = {
    status?: "ACTIVE" | "INACTIVE";
    name?: string;
    mediaId?: number;
    colors?: Array<{
        colorId: number;
        doorAssetId: number;
        drawerAssetId: number;
        id?: number;
    }>;
    stains?: Array<{
        stainId: number;
        doorAssetId: number;
        drawerAssetId: number;
        id?: number;
    }>;
    isGlass?: boolean;
};

export type TGetCabinetDoorsParams = {
    page?: number;
    limit?: number;
    column?: string;
    direction?: "ASC" | "DESC";
    search?: string;
    isGlass?: boolean;
    status?: string;
    colorIds?: number[];
    stainIds?: number[];
};

export type TCreateHandleBody = {
    name: string;
    status: "ACTIVE" | "INACTIVE";
    mediaId: number;
    textures: Array<{
        textureId: number;
        assetId: number;
    }>;
};

export type TUpdateHandleBody = {
    status?: "ACTIVE" | "INACTIVE";
    name?: string;
    mediaId?: number;
    textures?: Array<{
        textureId: number;
        assetId: number;
        id: number;
    }>;
};

export type TGetHandlesParams = {
    page?: number;
    limit?: number;
    column?: string;
    direction?: "ASC" | "DESC";
    search?: string;
    status?: string;
    textureIds?: number[];
};

export type TCreatePriceBody = {
    productType: "CABINET_DOOR";
    price: number;
};

export type TUpdatePriceBody = {
    price: number;
};

export type TGetPricesParams = {
    page?: number;
    limit?: number;
    column?: string;
    direction?: "ASC" | "DESC";
    search?: string;
    productType?: string;
};
