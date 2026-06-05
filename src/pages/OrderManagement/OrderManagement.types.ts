import { type TOrderResponse } from "@/api/services/orders/orders.response.types";

export type ManageOrderFormProps = {
    mode: "add" | "update";
};

export type OrderTableProps = {
    ordersLIstData: TOrderResponse[];
};
