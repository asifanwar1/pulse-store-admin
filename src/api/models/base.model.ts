import type { SortOrder } from "@/constants/SortOrder";

export interface BaseModel {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: null | string;
}

export interface PaginationModel {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface BaseResponseModel<T> {
    success: boolean;
    message: string;
    data: T;
    pagination?: PaginationModel;
}

export interface BaseQueryType {
    page?: number;
    limit?: number;
    column?: string;
    direction?: SortOrder;
}
