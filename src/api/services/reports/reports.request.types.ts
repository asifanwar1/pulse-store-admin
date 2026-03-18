export type TCreateReportBody = {
    title: string;
    description: string;
    reason: "SCAM" | "SPAM" | "INAPPROPRIATE" | "OTHER";
    userId: number;
    mediaIds: number[];
};

export type TGetReportsParams = {
    page?: number;
    limit?: number;
    column?: string;
    direction?: "ASC" | "DESC";
    search?: string;
    type?: "GENERAL" | "USER" | "PROJECT" | "QUOTE";
};
