import type { TShipmentListResponse } from "@/api/services/shipment/shipment.response";

export type ManageShipmentFormProps = {
    mode: "add" | "update";
};

export type ShipmentTableProps = {
    shipmentListData: TShipmentListResponse["data"];
};
