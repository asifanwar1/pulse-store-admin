import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "@/routes/appRoutes";
import {
    type FormBuilderRef,
    type formModesType,
} from "@/components/custom/Form";
import {
    ManageOrderSchema,
    type ManageOrderFormValues,
} from "./ManageOrder.schema";
import { ACTION_MODES } from "@/constants/action-modes.constants";
import { getCreateOrderFormConfig } from "./ManageOrder.config";
import { useGetUsersPaginated } from "@/hooks/api/user.queries";

export interface OrderLineItem {
    id: string;
    productName: string;
    sku: string;
    quantity: number;
    unitPrice: number;
}

const createEmptyItem = (): OrderLineItem => ({
    id: crypto.randomUUID(),
    productName: "",
    sku: "",
    quantity: 1,
    unitPrice: 0,
});

export const useManageOrder = ({ mode = ACTION_MODES.ADD }: formModesType) => {
    const navigate = useNavigate();
    const formRef = useRef<FormBuilderRef<ManageOrderFormValues>>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [items, setItems] = useState<OrderLineItem[]>([createEmptyItem()]);
    const [itemErrors, setItemErrors] = useState<string | null>(null);
    const [customerSearch, setCustomerSearch] = useState("");

    const {
        data: customers = [],
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isPending: isCustomersLoading,
    } = useGetUsersPaginated({
        search: customerSearch,
        limit: 20,
    });

    const customerOptions = customers.map((customer) => ({
        label: `${customer.firstName} ${customer.lastName}`,
        value: String(customer.id),
    }));

    const formConfig = getCreateOrderFormConfig({
        customerOptions,
        onCustomerSearch: setCustomerSearch,
        onCustomerScroll: hasNextPage ? () => fetchNextPage() : undefined,
        hasMoreCustomers: !!hasNextPage,
        isFetchingMoreCustomers: isFetchingNextPage,
        isCustomersLoading,
        productsOptions,
        onProductSearch,
        onProductScroll,
        hasMoreProducts = false,
        isFetchingMoreProducts = false,
        isProductsLoading = false,
    });

    const handleCancel = () => {
        navigate(APP_ROUTES.ORDERS);
    };

    const addItem = () => {
        setItems((prev) => [...prev, createEmptyItem()]);
    };

    const removeItem = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const updateItem = (
        id: string,
        field: keyof Omit<OrderLineItem, "id">,
        value: string | number,
    ) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, [field]: value } : item,
            ),
        );
    };

    const validateItems = (): boolean => {
        const hasEmpty = items.some(
            (item) => !item.productName.trim() || item.quantity < 1,
        );
        if (hasEmpty) {
            setItemErrors(
                "All items must have a product name and a quantity of at least 1.",
            );
            return false;
        }
        setItemErrors(null);
        return true;
    };

    const handleSubmit = async (values: ManageOrderFormValues) => {
        if (!validateItems()) return;
        setIsSubmitting(true);
        try {
            console.log("New order payload:", {
                ...values,
                items,
                mode,
            });
            navigate(APP_ROUTES.ORDERS);
        } finally {
            setIsSubmitting(false);
        }
    };

    const triggerSubmit = () => {
        if (!validateItems()) return;
        formRef.current?.handleSubmit(handleSubmit)();
    };

    return {
        formRef,
        ManageOrderSchema,
        isSubmitting,
        items,
        itemErrors,
        formConfig,
        handleCancel,
        handleSubmit,
        triggerSubmit,
        addItem,
        removeItem,
        updateItem,
    };
};
