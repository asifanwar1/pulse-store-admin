import type { BaseResponseModel } from "./base.model";
import type {
    Quote,
    QuoteFormData,
    QuoteListResponse,
    QuoteStats
} from "@/pages/QuoteManagement/QuoteManagement.types";

export type QuoteModel = Quote;

export type QuoteFormModel = QuoteFormData;

export type QuoteListResponseModel = QuoteListResponse;

export type QuoteStatsModel = QuoteStats;

export interface CreateQuoteRequest {
    data: QuoteFormModel;
}

export interface UpdateQuoteRequest {
    id: number;
    data: QuoteFormModel;
}

export interface DeleteQuoteRequest {
    id: number;
}

export interface GetQuoteRequest {
    id: number;
}

export interface GetQuotesRequest {
    page?: number;
    limit?: number;
    status?: string[];
    priority?: string[];
    type?: string[];
    customer?: string;
    installer?: string;
    amountRange?: {
        min: number;
        max: number;
    };
}

export type CreateQuoteResponse = BaseResponseModel<QuoteModel>;

export type UpdateQuoteResponse = BaseResponseModel<QuoteModel>;

export type DeleteQuoteResponse = BaseResponseModel<{ success: boolean }>;

export type GetQuoteResponse = BaseResponseModel<QuoteModel>;

export type GetQuotesResponse = BaseResponseModel<QuoteListResponseModel>;

export type GetQuoteStatsResponse = BaseResponseModel<QuoteStatsModel>;
