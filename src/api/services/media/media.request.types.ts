export type TInitMediaBody = {
    name: string;
    size: number;
    type: "IMAGE";
};

export type TFinalizeMediaBody = {
    id: number;
};

export type TUploadMediaBody = {
    mediaType: string;
    accessType: string;
    file: File;
};
