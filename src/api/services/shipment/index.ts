import { request } from "@/api/client/request";
import type { TApiArgs, TQueryParams, WithSignal } from "@/api/types/common";
import { HTTP_METHODS } from "@/constants";
import type {
    TCreateShipmentBody,
    TGetShipmentsParams,
    TUpdateShipmentBody,
    TUpdateShipmentStatusBody,
} from "./shipment.request.types";
import type {
    TCreateShipmentResponse,
    TGetShipmentResponse,
    TGetShipmentsResponse,
    TUpdateShipmentResponse,
    TUpdateShipmentStatusResponse,
} from "./shipment.response";
import { SHIPMENT_QUERY_KEYS } from "./queryKeys";

export const GetShipments = async (
    params?: WithSignal<TGetShipmentsParams>,
) => {
    const { signal, ...urlParams } = params || {};
    const abortSignal = signal;

    return request<TGetShipmentsResponse, TGetShipmentsParams>({
        method: HTTP_METHODS.GET,
        url: "/shipments",
        params: urlParams as TQueryParams,
        signal: abortSignal,
    });
};

export const CreateShipment = async (body: TCreateShipmentBody) => {
    return request<TCreateShipmentResponse, TCreateShipmentBody>({
        method: HTTP_METHODS.POST,
        url: "/shipments",
        body,
    });
};

export const GetShipment = async ({ id }: TApiArgs) => {
    return request<TGetShipmentResponse, undefined>({
        method: HTTP_METHODS.GET,
        url: `/shipments/${id}`,
    });
};

export const UpdateShipment = async ({
    id,
    body,
}: TApiArgs<TUpdateShipmentBody>) => {
    return request<TUpdateShipmentResponse, TUpdateShipmentBody>({
        method: HTTP_METHODS.PATCH,
        url: `/shipments/${id}`,
        body,
    });
};

export const UpdateShipmentStatus = async ({
    id,
    body,
}: TApiArgs<TUpdateShipmentStatusBody>) => {
    return request<TUpdateShipmentStatusResponse, TUpdateShipmentStatusBody>({
        method: HTTP_METHODS.PATCH,
        url: `/shipments/${id}/status`,
        body,
    });
};

export { SHIPMENT_QUERY_KEYS };
