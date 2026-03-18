import type { TProfilePicture } from "../users/users.response.types";

export type TRatingData = {
    rating: number;
    count: number;
    percentage: number;
};

export type TRatingDetailResponse = {
    ratingData: TRatingData[];
    totalReviews: number;
    avgRating: number;
};

export type TReviewUser = {
    id: number;
    fullName: string;
    email: string;
    profilePicture?: TProfilePicture;
};

export type TReview = {
    id: number;
    rating: number;
    remarks: string;
    reviewerId: number;
    revieweeId: number;
    isActive: boolean;
    projectId: number;
    reviewer: TReviewUser;
    reviewee: TReviewUser;
    createdAt: string;
    updatedAt: string;
};

export type TCreateReviewResponse = TReview;

export type TGetReviewsResponse = {
    data: TReview[];
    count: number;
};

export type TGetReviewByIdResponse = TReview;

export type TUpdateReviewResponse = {
    data: boolean;
};
