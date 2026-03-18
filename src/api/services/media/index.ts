import { HTTP_METHODS, MediaAccess } from "@/constants";
import type { TFinalizeMediaBody, TInitMediaBody } from "./media.request.types";
import type { TUploadMediaBody } from "./media.request.types";
import type {
    TMediaFinalizeResponse,
    TMediaInitResponse,
    TMediaUploadResponse
} from "./media.response.types";
import { request } from "@/api/client/request";

export const InitPublicMedia = async (body: TInitMediaBody) => {
    return request<TMediaInitResponse, TInitMediaBody>({
        method: HTTP_METHODS.POST,
        url: "/media/public/init",
        body
    });
};

export const InitMedia = async (mediaAccess: MediaAccess, body: TInitMediaBody) => {
    return request<TMediaInitResponse, TInitMediaBody>({
        method: HTTP_METHODS.POST,
        url: `/media/${mediaAccess === MediaAccess.PUBLIC ? "public/" : ""}init`,
        body
    });
};

export const FinalizeMedia = async (body: TFinalizeMediaBody) => {
    return request<TMediaFinalizeResponse, TFinalizeMediaBody>({
        method: HTTP_METHODS.POST,
        url: "/media/finalize",
        body
    });
};

export const UploadMedia = async (body: TUploadMediaBody) => {
    return request<TMediaUploadResponse, TUploadMediaBody>({
        method: HTTP_METHODS.POST,
        url: "/media/upload",
        body
    });
};
