import { request } from "@/api/client/request";
import { HTTP_METHODS } from "@/constants";
import type { TUploadMediaBody } from "./media.request";
import type { TMediaUploadResponse } from "./media.response";
import { MEDIA_QUERY_KEYS } from "./queryKeys";

export const UploadMedia = async (body: TUploadMediaBody) => {
    return request<TMediaUploadResponse, TUploadMediaBody>({
        method: HTTP_METHODS.POST,
        url: "/media/upload",
        body,
    });
};

export { MEDIA_QUERY_KEYS };
export type { TUploadMediaBody } from "./media.request";
export type { TMediaUploadResponse } from "./media.response";
