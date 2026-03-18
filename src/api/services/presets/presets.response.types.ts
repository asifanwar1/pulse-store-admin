import type { IPreset } from "@/pages/PresetManagement/PresetManagement.types";

export type TPresetResponse = IPreset;

export type TCreatePresetResponse = TPresetResponse;

export type TUpdatePresetResponse = {
    data: boolean;
};

export type TDeletePresetResponse = {
    data: boolean;
};

export type TGetPresetByIdResponse = TPresetResponse;

export type TGetPresetsResponse = {
    data: TPresetResponse[];
    count: number;
};
