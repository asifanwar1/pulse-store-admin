import { type TOrderResponse } from "@/api/services/orders/orders.response.types";

export type ManageOrderFormProps = {
    mode: "add" | "update";
};

export type OrderTableProps = {
    ordersLIstData: TOrderResponse[];
    totalCount?: number;
    pageCount: number;
    page: number;
    pageSize: number;
    onPaginationChange: (pagination: {
        pageIndex: number;
        pageSize: number;
    }) => void;
};

export type TManageOrderFormConfigProps = {
    customerOptions: any;
    onCustomerSearch: (value: string) => void;
    onCustomerScroll?: () => void;
    hasMoreCustomers?: boolean;
    isFetchingMoreCustomers?: boolean;
    isCustomersLoading?: boolean;

    productsOptions: any;
    onProductSearch: (value: string) => void;
    onProductScroll?: () => void;
    hasMoreProducts?: boolean;
    isFetchingMoreProducts?: boolean;
    isProductsLoading?: boolean;

    handleProductsChange?: (products: any) => void;
};

export interface OrderLineItem {
    id: string;
    productName: string;
    quantity: number;
    unitPrice: number;
}

export type SelectedOption = { value: string; label: string };
