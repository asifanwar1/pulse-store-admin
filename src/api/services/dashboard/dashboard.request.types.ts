export enum AnalyticsRangeType {
    WEEK = "week",
    MONTH = "month",
    YEAR = "year"
}

export type TGetAnalyticsParams = {
    type: AnalyticsRangeType;
    startDate: string;
    endDate: string;
};
