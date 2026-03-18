import type { BaseModel } from "@/api/models";
import type { TUser } from "../projects/projects.response.types";

export type TDealModel = BaseModel & {
    name: string;
    code: string;
    discountType: "Percentage" | "Fixed";
    discountValue: number;
    minimumOrderValue: number;
    startDate: string;
    expiryDate: string;
    usageLimit: number;
    status: "ACTIVE" | "INACTIVE";
    project: Array<TDealProject>;
};

export type TDealResponse = TDealModel;

export type TCreateDealResponse = TDealModel;
export type TUpdateDealResponse = TDealModel;
export type TDeleteDealResponse = {
    success: boolean;
    message: string;
};

export type TGetDealByIdResponse = TDealResponse;

export type TGetDealsResponse = {
    data: TDealResponse[];
    count: number;
};
export type TDealProject = {
    quote: number;
    totalAmount: number;
    discountAmount: number;
    user: TUser;
};

export type TUpdateDealStatusResponse = {
    status: "ACTIVE" | "INACTIVE";
};
