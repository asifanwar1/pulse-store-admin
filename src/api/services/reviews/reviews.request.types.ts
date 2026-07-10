import type { BaseQueryType } from "@/api/models";

export type TGetReviewsParams = BaseQueryType & {
    product_id?: number;
    rating?: number;
    is_hidden?: boolean;
};

export type TUpdateReviewVisibilityBody = {
    is_hidden: boolean;
};
