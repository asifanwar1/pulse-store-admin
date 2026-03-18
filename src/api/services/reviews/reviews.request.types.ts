export type TGetReviewsParams = {
    page?: number;
    limit?: number;
    column?: string;
    direction?: "ASC" | "DESC";
    search?: string;
    status?: "true" | "false" | boolean;
    rating?: number;
    revieweeId?: number;
    reviewerId?: number;
};

export type TCreateReviewBody = {
    rating: number;
    remarks: string;
    projectId: number;
};
