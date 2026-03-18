export type TGetPortfoliosParams = {
    page?: number;
    limit?: number;
    column?: string;
    direction?: "ASC" | "DESC";
};

export type TGetRandomPortfoliosParams = {
    limit: number;
};

export type TCreatePortfolioBody = {
    name: string;
    description: string;
    mediaId: number;
};

export type TUpdatePortfolioBody = {
    name: string;
    description: string;
    mediaId: number;
};
