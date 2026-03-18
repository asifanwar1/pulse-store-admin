import { HTTP_METHODS } from "@/constants";
import { request } from "@/api/client/request";
import type { TApiArgs, TQueryParams, WithSignal } from "@/api/types/common";
import { PROJECT_QUERY_KEYS } from "./queryKeys";
import type {
    TCreateProjectBody,
    TGetProjectsParams,
    TGetInstallerVisitsParams,
    TUpdateProjectBody,
    TUpdateInstallerVisitsBody,
    TUpdateProjectStatusParams,
    TUpdateQuoteStatusParams,
    TUpdateInstallerVisitSlotStatusParams,
    TCreateInstallerVisitBody,
    TGetKitchenRequirementsParams
} from "./projects.request.types";
import type {
    TCreateProjectResponse,
    TGetInstallerVisitsResponse,
    TUpdateInstallerVisitsResponse,
    TGetProjectByIdResponse,
    TUpdateProjectResponse,
    TDeleteProjectResponse,
    TUpdateProjectStatusResponse,
    TAssignInstallerResponse,
    TUpdateQuoteStatusResponse,
    TCreateInstallerVisitResponse,
    TUpdateInstallerVisitSlotStatusResponse,
    TGetProjectsResponse,
    TGetKitchenRequirementsResponse
} from "./projects.response.types";

export const GetProjects = async (params?: WithSignal<TGetProjectsParams>) => {
    const { signal, ...urlParams } = params || {};
    const abortSignal = signal;

    return request<TGetProjectsResponse, TGetProjectsParams>({
        method: HTTP_METHODS.GET,
        url: "/projects",
        params: urlParams as TQueryParams,
        signal: abortSignal
    });
};

export const GetProjectById = async ({ id }: TApiArgs) => {
    return request<TGetProjectByIdResponse, undefined>({
        method: HTTP_METHODS.GET,
        url: `/projects/${id}`
    });
};

export const CreateProject = async ({ body }: TApiArgs<TCreateProjectBody>) => {
    return request<TCreateProjectResponse, TCreateProjectBody>({
        method: HTTP_METHODS.POST,
        url: "/projects",
        body
    });
};

export const UpdateProject = async ({ id, body }: TApiArgs<TUpdateProjectBody>) => {
    return request<TUpdateProjectResponse, TUpdateProjectBody>({
        method: HTTP_METHODS.PATCH,
        url: `/projects/${id}`,
        body
    });
};

export const DeleteProject = async ({ id }: TApiArgs) => {
    return request<TDeleteProjectResponse, undefined>({
        method: HTTP_METHODS.DELETE,
        url: `/projects/${id}`
    });
};

export const UpdateProjectStatus = async ({
    id,
    params
}: TApiArgs<undefined, TUpdateProjectStatusParams>) => {
    return request<TUpdateProjectStatusResponse, TUpdateProjectStatusParams>({
        method: HTTP_METHODS.PATCH,
        url: `/projects/${id}/status`,
        params: params as TQueryParams
    });
};

export const AssignInstaller = async ({ id, installerId }: { id: number; installerId: number }) => {
    return request<TAssignInstallerResponse, undefined>({
        method: HTTP_METHODS.PATCH,
        url: `/projects/${id}/assign-installer/${installerId}`
    });
};

export const UpdateQuoteStatus = async ({
    id,
    params
}: TApiArgs<undefined, TUpdateQuoteStatusParams>) => {
    return request<TUpdateQuoteStatusResponse, TUpdateQuoteStatusParams>({
        method: HTTP_METHODS.PATCH,
        url: `/projects/${id}/quote-status`,
        params: params as TQueryParams
    });
};

export const CreateInstallerVisit = async ({ id, body }: TApiArgs<TCreateInstallerVisitBody>) => {
    return request<TCreateInstallerVisitResponse, TCreateInstallerVisitBody>({
        method: HTTP_METHODS.POST,
        url: `/projects/${id}/installer-visits`,
        body
    });
};

export const GetInstallerVisits = async (params?: WithSignal<TGetInstallerVisitsParams>) => {
    const { signal, ...urlParams } = params || {};
    const abortSignal = signal;
    return request<TGetInstallerVisitsResponse, TGetInstallerVisitsParams>({
        method: HTTP_METHODS.GET,
        url: "/projects/installer-visits",
        params: urlParams as TQueryParams,
        signal: abortSignal
    });
};

export const UpdateInstallerVisits = async ({ body }: TApiArgs<TUpdateInstallerVisitsBody>) => {
    return request<TUpdateInstallerVisitsResponse, TUpdateInstallerVisitsBody>({
        method: HTTP_METHODS.PATCH,
        url: "/projects/installer-visits",
        body
    });
};

export const UpdateInstallerVisitSlotStatus = async ({
    id,
    params
}: TApiArgs<undefined, TUpdateInstallerVisitSlotStatusParams>) => {
    return request<TUpdateInstallerVisitSlotStatusResponse, TUpdateInstallerVisitSlotStatusParams>({
        method: HTTP_METHODS.PATCH,
        url: `/projects/installer-visits/slot/${id}/status`,
        params: params as TQueryParams
    });
};

export const GetKitchenRequirements = async (
    params?: WithSignal<TGetKitchenRequirementsParams>
) => {
    const { signal, ...urlParams } = params || {};
    const abortSignal = signal;

    return request<TGetKitchenRequirementsResponse, TGetKitchenRequirementsParams>({
        method: HTTP_METHODS.GET,
        url: "/projects/kitchen-requirements",
        params: urlParams as TQueryParams,
        signal: abortSignal
    });
};

export { PROJECT_QUERY_KEYS };
