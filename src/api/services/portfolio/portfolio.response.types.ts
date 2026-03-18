import type { TMediaUploadResponse } from "../media/media.response.types";

export type TPortfolio = {
    id: number;
    name: string;
    description: string;
    mediaId: number;
    media: TMediaUploadResponse;
};

export type TGetPortfoliosResponse = {
    data: TPortfolio[];
    count: number;
};

export type TGetRandomPortfoliosResponse = {
    data: TPortfolio[];
}[];

export type TCreatePortfolioResponse = TPortfolio;

export type TUpdatePortfolioResponse = {
    data: boolean;
};

export type TDeletePortfolioResponse = {
    data: boolean;
};

export type TGetPortfolioByIdResponse = TPortfolio;
