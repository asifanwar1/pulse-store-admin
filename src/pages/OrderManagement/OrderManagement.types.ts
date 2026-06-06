import { type TOrderResponse } from "@/api/services/orders/orders.response.types";

export type ManageOrderFormProps = {
    mode: "add" | "update";
};

export type OrderTableProps = {
    ordersLIstData: TOrderResponse[];
};

export type TManageOrderFormConfigProps = {
    userOptions: any;
    onUserSearch: (value: string) => void;
    onUserScroll?: () => void;
    hasMoreUsers?: boolean;
    isFetchingMoreUsers?: boolean;
    isUsersLoading?: boolean;
};
