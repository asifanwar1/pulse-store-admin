export type TGetCardsAnalyticsResponse = {
    totalCustomers: number;
    totalInstallers: number;
    totalPendingQuotes: number;
    totalActiveProjects: number;
};

export type TGetProjectStatusAnalyticsResponse = {
    completed: number;
    completedPercentage: number;
    inProgress: number;
    inprogressPercentage: number;
};

export type TGetQuotesAnalyticsResponse = {
    data: Array<{
        month?: string;
        day?: string;
        total: number;
    }>;
};
