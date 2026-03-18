import type { MediaAccess, MediaStatus, MediaTypes } from "@/constants";

export type TMediaInitResponse = {
    accessKeyId: string;
    secretAccessKey: string;
    sessionToken: string;
    mediaId: number;
    location: string;
    bucket: string;
    region: string;
};

export type TMediaFinalizeResponse = {
    mediaId: number;
    name: string;
    extension: string;
    type: MediaTypes;
    access: MediaAccess;
    size: number;
    path: string;
    thumbPath: string;
    status: MediaStatus;
    userId: number;
    meta: Record<string, unknown>;
};

export type TMediaUploadResponse = {
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
