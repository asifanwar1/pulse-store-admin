import type { IPaginatedQueryParams } from "@/hooks/hooks.types";

export type TCreatePresetBody = {
    presetName: string;
    cabinetDoorId: number;
    type: string;
    stainId: number;
    colorId: number;
    handleId: number;
    textureId: number;
    mediaId: number;
};

export type TUpdatePresetBody = Partial<TCreatePresetBody>;

export type TGetPresetsParams = IPaginatedQueryParams & {
    type?: string;
    cabinetDoorId?: number;
    handleId?: number;
};
