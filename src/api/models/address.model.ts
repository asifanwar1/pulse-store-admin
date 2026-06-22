import type { BaseModel } from "./base.model";

export type AddressModel = BaseModel & {
    address: string;
    street_address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    latitude: number;
    longitude: number;
};
