import { HTTP_METHODS } from "@/constants";
import { request } from "@/api/client/request";
import type { TQueryParams, WithSignal, TApiArgs } from "@/api/types/common";
import { REPORT_QUERY_KEYS } from "./queryKeys";
import type { TGetReportsParams, TCreateReportBody } from "./reports.request.types";
import type {
    TGetReportsResponse,
    TCreateReportResponse,
    TDeleteReportResponse
} from "./reports.response.types";

export const CreateReport = async ({ body }: TApiArgs<TCreateReportBody>) => {
    return request<TCreateReportResponse, TCreateReportBody>({
        method: HTTP_METHODS.POST,
        url: "/reports",
        body
    });
};

export const GetReports = async (params?: WithSignal<TGetReportsParams>) => {
    const { signal, ...urlParams } = params || {};
    const abortSignal = signal;

    return request<TGetReportsResponse, TGetReportsParams>({
        method: HTTP_METHODS.GET,
        url: "/reports",
        params: urlParams as TQueryParams,
        signal: abortSignal
    });
};

export const DeleteReport = async ({ id }: TApiArgs) => {
    return request<TDeleteReportResponse, undefined>({
        method: HTTP_METHODS.DELETE,
        url: `/reports/${id}`
    });
};

export { REPORT_QUERY_KEYS };
