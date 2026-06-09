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
import { useGetProductsPaginated } from "@/hooks/api/products.queries";
import type { OrderLineItem } from "../OrderManagement.types";
import { mapOptionsToSelectedProducts } from "../OrderManagement.Utils";

export const useManageOrder = ({ mode = ACTION_MODES.ADD }: formModesType) => {
    const navigate = useNavigate();
    const formRef = useRef<FormBuilderRef<ManageOrderFormValues>>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [customerSearch, setCustomerSearch] = useState("");
    const [productSearch, setProductSearch] = useState("");
    const [selectedProducts, setSelectedProducts] = useState<OrderLineItem[]>(
        [],
    );

    const {
        data: customers = [],
        fetchNextPage: fetchNextPageCustomers,
        hasNextPage: hasNextPageCustomers,
        isFetchingNextPage: isFetchingNextPageCustomers,
        isPending: isCustomersLoading,
    } = useGetUsersPaginated({
        search: customerSearch,
        limit: 20,
    });

    const {
        data: products = [],
        fetchNextPage: fetchNextPageProducts,
        hasNextPage: hasNextPageProducts,
        isFetchingNextPage: isFetchingNextPageProducts,
        isPending: isProductsLoading,
    } = useGetProductsPaginated({
        search: productSearch,
        limit: 20,
    });

    const customerOptions = customers.map((customer) => ({
        label: customer.fullName,
        value: String(customer.id),
    }));

    const productsOptions = products.map((product) => ({
        label: product.name,
        value: String(product.id),
    }));

    const handleProductsChange = (value: any) => {
        const selectedOptions = Array.isArray(value) ? value : [];

        const nextSelectedProducts = mapOptionsToSelectedProducts(
            selectedOptions,
            selectedProducts,
        );

        setSelectedProducts(nextSelectedProducts);
    };

    const formConfig = getCreateOrderFormConfig({
        customerOptions,
        onCustomerSearch: setCustomerSearch,
        onCustomerScroll: hasNextPageCustomers
            ? () => fetchNextPageCustomers()
            : undefined,
        hasMoreCustomers: !!hasNextPageCustomers,
        isFetchingMoreCustomers: isFetchingNextPageCustomers,
        isCustomersLoading,
        productsOptions,
        onProductSearch: setProductSearch,
        onProductScroll: hasNextPageProducts
            ? () => fetchNextPageProducts()
            : undefined,
        hasMoreProducts: !!hasNextPageProducts,
        isFetchingMoreProducts: isFetchingNextPageProducts,
        isProductsLoading,
        handleProductsChange,
    });

    const handleCancel = () => {
        navigate(APP_ROUTES.ORDERS);
    };

    const handleSubmit = async (values: ManageOrderFormValues) => {
        setIsSubmitting(true);
        try {
            console.log("New order payload:", {
                ...values,
            });
            navigate(APP_ROUTES.ORDERS);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleQuantityChange = (productId: string, quantity: number) => {
        setSelectedProducts((prev) =>
            prev.map((item) =>
                item.id === productId ? { ...item, quantity } : item,
            ),
        );
    };

    const handleRemoveProduct = (productId: string) => {
        setSelectedProducts((prev) => {
            const next = prev.filter((item) => item.id !== productId);

            const selectValue = next.map((p) => ({
                value: p.id,
                label: p.productName,
            }));

            formRef.current?.setValue("products" as any, selectValue, {
                shouldValidate: true,
                shouldDirty: true,
            });

            return next;
        });
    };

    return {
        formRef,
        ManageOrderSchema,
        isSubmitting,
        formConfig,
        selectedProducts,
        handleQuantityChange,
        handleRemoveProduct,
        handleCancel,
        handleSubmit,
    };
};
