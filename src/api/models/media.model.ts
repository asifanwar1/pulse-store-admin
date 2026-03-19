import {
    MediaAccess,
    MediaStatus,
    MediaTypes,
} from "@/constants/media.constants";
import { type BaseModel } from "./base.model";

export type MediaModel = BaseModel & {
    name?: string;
    extension?: string;
    type?: MediaTypes;
    access?: MediaAccess;
    size?: number;
    path: string;
    thumbPath?: string;
    status?: MediaStatus;
    userId?: number;
    meta?: Record<any, any>;
};
