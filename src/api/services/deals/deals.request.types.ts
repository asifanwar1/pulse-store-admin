import type { IPaginatedQueryParams } from "@/hooks/hooks.types";

export type TCreateDealBody = {
    name: string;
    code: string;
    discountType: "Percentage" | "Fixed";
    discountValue: number;
    minimumOrderValue: number;
    startDate: string;
    expiryDate: string;
    usageLimit: number;
    status?: string;
};

export type TUpdateDealBody = Partial<TCreateDealBody>;

export type TGetDealsParams = IPaginatedQueryParams & {
    search?: string;
    status?: string;
    discountType?: string;
    startDate?: string;
    endDate?: string;
};

export type TUpdateDealStatusParams = {
    id: number;
    status: "ACTIVE" | "INACTIVE";
};
