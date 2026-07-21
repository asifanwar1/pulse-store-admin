import type { TShipmentListResponse } from "@/api/services/shipment/shipment.response";

export type ManageShipmentFormProps = {
    mode: "add" | "update";
};

export type ShipmentTableProps = {
    shipmentListData: TShipmentListResponse["data"];
    totalCount?: number;
    pageCount: number;
    page: number;
    pageSize: number;
    onSearch: (value: string) => void;
    onPaginationChange: (pagination: {
        pageIndex: number;
        pageSize: number;
    }) => void;
};
