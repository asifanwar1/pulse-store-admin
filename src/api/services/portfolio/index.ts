import { HTTP_METHODS } from "@/constants";
import type {
    TGetPortfoliosParams,
    TGetRandomPortfoliosParams,
    TCreatePortfolioBody,
    TUpdatePortfolioBody
} from "./portfolio.request.types";
import type {
    TGetPortfoliosResponse,
    TGetRandomPortfoliosResponse,
    TCreatePortfolioResponse,
    TUpdatePortfolioResponse,
    TDeletePortfolioResponse,
    TGetPortfolioByIdResponse
} from "./portfolio.response.types";
import { request } from "@/api/client/request";
import type { TQueryParams, WithSignal } from "@/api/types/common";
import { PORTFOLIO_QUERY_KEYS } from "./queryKeys";
import type { ApiArgs } from "@/api";

export const GetPortfolios = async (params?: WithSignal<TGetPortfoliosParams>) => {
    const { signal, ...urlParams } = params || {};
    const abortSignal = signal;

    return request<TGetPortfoliosResponse, TGetPortfoliosParams>({
        method: HTTP_METHODS.GET,
        url: "/portfolio",
        params: urlParams as TQueryParams,
        signal: abortSignal
    });
};

export const GetRandomPortfolios = async (params?: WithSignal<TGetRandomPortfoliosParams>) => {
    const { signal, ...urlParams } = params || {};
    const abortSignal = signal;

    return request<TGetRandomPortfoliosResponse, TGetRandomPortfoliosParams>({
        method: HTTP_METHODS.GET,
        url: "/portfolio/random",
        params: urlParams as TQueryParams,
        signal: abortSignal
    });
};

export const GetPortfolioById = async ({ id }: ApiArgs) => {
    return request<TGetPortfolioByIdResponse, undefined>({
        method: HTTP_METHODS.GET,
        url: `/portfolio/${id}`
    });
};

export const CreatePortfolio = async ({ body }: ApiArgs<TCreatePortfolioBody>) => {
    return request<TCreatePortfolioResponse, TCreatePortfolioBody>({
        method: HTTP_METHODS.POST,
        url: "/portfolio",
        body
    });
};

export const UpdatePortfolio = async ({ id, body }: ApiArgs<TUpdatePortfolioBody>) => {
    return request<TUpdatePortfolioResponse, TUpdatePortfolioBody>({
        method: HTTP_METHODS.PATCH,
        url: `/portfolio/${id}`,
        body
    });
};

export const DeletePortfolio = async ({ id }: ApiArgs) => {
    return request<TDeletePortfolioResponse, undefined>({
        method: HTTP_METHODS.DELETE,
        url: `/portfolio/${id}`
    });
};

export { PORTFOLIO_QUERY_KEYS };
